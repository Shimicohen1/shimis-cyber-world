/**
 * SCW LinkedIn Auto-Poster
 * 
 * Picks the best post from today's _posts/ and publishes
 * a formatted update to LinkedIn via the REST API.
 * 
 * Runs daily via GitHub Actions at 10:00 Israel time.
 * 
 * Required secrets:
 *   LINKEDIN_ACCESS_TOKEN — OAuth 2.0 token with w_member_social scope
 *   LINKEDIN_PERSON_URN   — e.g. "urn:li:person:AbCdEf123"
 */

import fs from 'fs';
import path from 'path';

const TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const PERSON_URN = process.env.LINKEDIN_PERSON_URN;
const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, '_posts');
const STATE_FILE = path.join(ROOT, '.github', 'linkedin-state.json');
const SITE_URL = 'https://shimiscyberworld.com';

/* ═══════════════════════════════════════════════════════════
 *  STATE — track posted articles to avoid duplicates
 * ═══════════════════════════════════════════════════════════ */

function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); }
  catch { return { postedFiles: [], lastPostDate: null }; }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

/* ═══════════════════════════════════════════════════════════
 *  PARSE POST FRONT MATTER
 * ═══════════════════════════════════════════════════════════ */

function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const meta = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const kv = line.match(/^(\w[\w_]*)\s*:\s*(.+)$/);
    if (kv) {
      let val = kv[2].trim();
      // Strip surrounding quotes
      if ((val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      meta[kv[1]] = val;
    }
  }
  meta._body = match[2].trim();
  return meta;
}

/* ═══════════════════════════════════════════════════════════
 *  SELECT BEST POST
 * ═══════════════════════════════════════════════════════════ */

function selectBestPost(state) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const files = fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md') && f.startsWith(today));

  if (files.length === 0) {
    // Fall back to yesterday if no posts today
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const yFiles = fs.readdirSync(POSTS_DIR)
      .filter(f => f.endsWith('.md') && f.startsWith(yesterday));
    files.push(...yFiles);
  }

  if (files.length === 0) {
    console.log('No posts found for today or yesterday.');
    return null;
  }

  // Parse all candidates
  const candidates = [];
  for (const file of files) {
    if (state.postedFiles.includes(file)) continue; // Already posted
    const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const meta = parseFrontMatter(content);
    if (!meta || meta.hidden === 'true') continue;
    candidates.push({ file, meta });
  }

  if (candidates.length === 0) {
    console.log('All eligible posts already shared.');
    return null;
  }

  // Score: priority (higher = better), score field, featured flag
  const scoreMap = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
  candidates.sort((a, b) => {
    const aFeat = a.meta.featured === 'true' ? 100 : 0;
    const bFeat = b.meta.featured === 'true' ? 100 : 0;
    const aPrio = parseInt(a.meta.priority || '50');
    const bPrio = parseInt(b.meta.priority || '50');
    const aScore = scoreMap[a.meta.score] || 2;
    const bScore = scoreMap[b.meta.score] || 2;
    return (bFeat + bPrio + bScore * 10) - (aFeat + aPrio + aScore * 10);
  });

  return candidates[0];
}

/* ═══════════════════════════════════════════════════════════
 *  FORMAT FOR LINKEDIN
 * ═══════════════════════════════════════════════════════════ */

function formatLinkedInPost(meta, fileName) {
  const title = meta.title || 'Security Update';
  const body = meta._body || '';
  
  // Take first 2 paragraphs (LinkedIn has ~3000 char limit for good engagement)
  const paragraphs = body.split('\n\n').filter(p => p.trim());
  const preview = paragraphs.slice(0, 2).join('\n\n');

  // Build post URL from filename
  // 2026-04-08-telegram-1323386230-248498.md → /2026/04/08/telegram-1323386230-248498
  const slug = fileName.replace(/\.md$/, '').replace(/^(\d{4})-(\d{2})-(\d{2})-/, '$1/$2/$3/');
  const postUrl = `${SITE_URL}/${slug}`;

  // Extract tags for hashtags
  const tagMatch = meta.tags || '';
  const tags = tagMatch.replace(/[\[\]]/g, '').split(',')
    .map(t => t.trim())
    .filter(t => t)
    .slice(0, 5)
    .map(t => `#${t.replace(/[- ]/g, '').replace(/^#/, '')}`);

  // Truncate preview to ~1200 chars to leave room for title + hashtags
  let truncatedPreview = preview;
  if (truncatedPreview.length > 1200) {
    truncatedPreview = truncatedPreview.slice(0, 1197) + '...';
  }

  const text = `🔒 ${title}

${truncatedPreview}

📖 Read more on Shimi's Cyber World:
${postUrl}

${tags.join(' ')}
#cybersecurity #infosec`;

  return { text, postUrl, title };
}

/* ═══════════════════════════════════════════════════════════
 *  LINKEDIN API
 * ═══════════════════════════════════════════════════════════ */

async function postToLinkedIn(text, articleUrl, articleTitle) {
  // LinkedIn UGC Post API (v2)
  const payload = {
    author: PERSON_URN,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text },
        shareMediaCategory: 'ARTICLE',
        media: [
          {
            status: 'READY',
            originalUrl: articleUrl,
            title: { text: articleTitle },
          }
        ]
      }
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
    }
  };

  const res = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`LinkedIn API ${res.status}: ${errBody}`);
  }

  const data = await res.json();
  console.log(`✅ Posted to LinkedIn: ${data.id}`);
  return data.id;
}

/* ═══════════════════════════════════════════════════════════
 *  MAIN
 * ═══════════════════════════════════════════════════════════ */

async function main() {
  if (!TOKEN || !PERSON_URN) {
    console.error('❌ Missing LINKEDIN_ACCESS_TOKEN or LINKEDIN_PERSON_URN');
    process.exit(1);
  }

  const state = loadState();
  const best = selectBestPost(state);

  if (!best) {
    console.log('ℹ️  Nothing to post today.');
    process.exit(0);
  }

  console.log(`📝 Selected: "${best.meta.title}" (${best.file})`);
  
  const { text, postUrl, title } = formatLinkedInPost(best.meta, best.file);
  console.log(`\n--- LinkedIn Post Preview ---\n${text}\n---\n`);

  await postToLinkedIn(text, postUrl, title);

  // Update state
  state.postedFiles.push(best.file);
  // Keep only last 90 days of posted files to avoid unbounded growth
  if (state.postedFiles.length > 90) {
    state.postedFiles = state.postedFiles.slice(-90);
  }
  state.lastPostDate = new Date().toISOString();
  saveState(state);

  console.log('📊 State updated.');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
