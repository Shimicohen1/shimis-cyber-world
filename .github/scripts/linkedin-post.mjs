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
  let currentKey = null;
  let currentArray = null;

  for (const line of lines) {
    // YAML array item (  - "value")
    const arrayItem = line.match(/^\s+-\s+"?([^"]*)"?\s*$/);
    if (arrayItem && currentKey) {
      currentArray.push(arrayItem[1]);
      continue;
    }

    // Flush any accumulated array
    if (currentKey && currentArray.length) {
      meta[currentKey] = currentArray.join('\n');
      currentKey = null;
      currentArray = null;
    }

    // Key with no inline value → start of array/block
    const blockStart = line.match(/^(\w[\w_]*)\s*:\s*$/);
    if (blockStart) {
      currentKey = blockStart[1];
      currentArray = [];
      continue;
    }

    // Regular key: value
    const kv = line.match(/^(\w[\w_]*)\s*:\s*(.+)$/);
    if (kv) {
      currentKey = null;
      currentArray = null;
      let val = kv[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      meta[kv[1]] = val;
    }
  }
  // Flush final array if any
  if (currentKey && currentArray && currentArray.length) {
    meta[currentKey] = currentArray.join('\n');
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
 *  LINKEDIN POST FORMATTING — THOUGHT LEADERSHIP STYLE
 *
 *  Structure (optimized for LinkedIn algorithm + engagement):
 *    1. Hook (first 2 lines — visible before "...see more")
 *    2. Expert analysis (2-3 short paragraphs, scannable)
 *    3. Why It Matters (actionable insight)
 *    4. Contextual tool/resource recommendation
 *    5. CTAs — Telegram follow + site tools
 *    6. Hashtags (3-5, mix of broad + niche)
 *
 *  Key rules:
 *    - Keep ≤ 2,800 chars total (sweet spot for engagement)
 *    - Short paragraphs (1-2 sentences each)
 *    - Line breaks between sections (scannable)
 *    - Strategic emoji (section headers only, not spam)
 *    - No Markdown (doesn't render on LinkedIn)
 * ═══════════════════════════════════════════════════════════ */

/* ── Hook generators — rotate patterns to keep feed fresh ── */
const HOOK_PATTERNS = [
  (t, score) => `${score === 'CRITICAL' ? '🔴' : '🚨'} ${t}\n\nThis is what you need to know right now.`,
  (t, score) => `${score === 'CRITICAL' ? '🔴' : '⚡'} ${t}\n\nHere's why your security team should pay attention.`,
  (t, score) => `${score === 'CRITICAL' ? '🔴' : '🛡️'} ${t}\n\nA quick breakdown for defenders and decision-makers.`,
  (t, score) => `${score === 'CRITICAL' ? '🔴' : '🔍'} ${t}\n\nThe details most people will miss — but shouldn't.`,
  (t, score) => `${score === 'CRITICAL' ? '🔴' : '📡'} ${t}\n\nFresh from our threat intelligence feed.`,
];

/* ── Tag → contextual tool/resource recommendation mapping ── */
const TAG_RECOMMENDATIONS = {
  // Internal tools
  'ransomware':  { text: '🔎 Check if your org is exposed → BreachRadar (free)', url: '/breach-radar/' },
  'darkweb':     { text: '🔎 Dark web exposure check → BreachRadar', url: '/breach-radar/' },
  'threat-intel':{ text: '📡 Real-time threat feeds → shimiscyberworld.com', url: '/' },
  'malware':     { text: '🔎 Scan your IOCs across 22 platforms → ThreatLens (free)', url: '/ioc-scanner/' },
  'phishing':    { text: '🎣 Suspicious link? Check it instantly → GoFish (free)', url: '/gofish/' },
  'vulnerability':{ text: '🛡️ Hardening checks for 18 platforms → LockDown (free)', url: '/hardening/' },
  'cve':         { text: '🛡️ 847 hardening checks across 18 platforms → LockDown', url: '/hardening/' },
  'detection':   { text: '📋 KQL, Sigma & Splunk rules → Detection Vault', url: '/detections/' },
  'incident-response': { text: '🚨 Step-by-step IR playbooks → WarRoom', url: '/playbooks/' },
  // Affiliate tools (CJ)
  'vpn':         { text: '🔐 Protect your traffic → NordVPN (recommended)', url: 'https://www.anrdoezrs.net/click-101720928-13756265' },
  'privacy':     { text: '🔐 Privacy-first browsing → Proton VPN', url: 'https://www.jdoqocy.com/click-101720928-15834536' },
  'password':    { text: '🔑 Upgrade your password manager → Proton Pass', url: 'https://www.kqzyfj.com/click-101720928-15831601' },
  'credentials': { text: '🔑 Credential theft? Get a real password manager → Proton Pass', url: 'https://www.kqzyfj.com/click-101720928-15831601' },
};

/* ── Default recommendation when no tag matches ── */
const DEFAULT_REC = { text: '🛡️ Free tools for defenders → BreachRadar, ThreatLens, LockDown', url: '/tools/' };

function getRecommendation(tags) {
  const tagList = (tags || '').replace(/[\[\]]/g, '').split(',').map(t => t.trim().toLowerCase());
  for (const tag of tagList) {
    if (TAG_RECOMMENDATIONS[tag]) return TAG_RECOMMENDATIONS[tag];
  }
  return DEFAULT_REC;
}

function buildHashtags(meta) {
  const tagList = (meta.tags || '').replace(/[\[\]]/g, '').split(',')
    .map(t => t.trim()).filter(Boolean);

  // Map raw tags to clean LinkedIn hashtags
  const mapped = tagList
    .map(t => t.replace(/[- ]/g, '').replace(/^#/, ''))
    .filter(t => t.length > 2 && t.length < 25);

  // Always include core hashtags, then add from post tags
  const core = ['cybersecurity', 'infosec', 'threatintelligence'];
  const all = [...new Set([...mapped.slice(0, 3), ...core])];
  return all.slice(0, 6).map(h => `#${h}`).join(' ');
}

function stripMarkdown(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')   // [text](url) → text
    .replace(/\*\*([^*]+)\*\*/g, '$1')          // **bold** → bold
    .replace(/\*([^*]+)\*/g, '$1')              // *italic* → italic
    .replace(/^#+\s*/gm, '')                     // ## heading → heading
    .replace(/^[-*]\s+/gm, '• ')                // - item → • item
    .replace(/`([^`]+)`/g, '$1')                // `code` → code
    .trim();
}

function formatLinkedInPost(meta, fileName) {
  const title = meta.title || 'Security Update';
  const body = stripMarkdown(meta._body || '');
  const score = (meta.score || 'MEDIUM').toUpperCase();

  // Build post URL
  const slug = fileName.replace(/\.md$/, '').replace(/^(\d{4})-(\d{2})-(\d{2})-/, '$1/$2/$3/');
  const postUrl = `${SITE_URL}/${slug}`;

  // ── 1. HOOK (first 2 lines — critical for "see more" click) ──
  const hookIdx = Math.floor(Math.random() * HOOK_PATTERNS.length);
  const hook = HOOK_PATTERNS[hookIdx](title, score);

  // ── 2. EXPERT ANALYSIS (2-3 short paragraphs) ──
  const paragraphs = body.split('\n\n').filter(p => p.trim().length > 40);
  // Take first paragraph, trim to ~400 chars for a tight read
  let analysis = paragraphs[0] || '';
  if (analysis.length > 500) {
    analysis = analysis.slice(0, 497).replace(/\s+\S*$/, '') + '...';
  }

  // ── 3. WHY IT MATTERS ──
  let whySection = '';
  if (meta.why_it_matters) {
    // Parse YAML array-like string
    const whyRaw = meta.why_it_matters;
    whySection = `\n🎯 Why This Matters:\n${whyRaw}`;
  } else if (meta.excerpt) {
    // Fallback: use excerpt as the "why"
    const ex = meta.excerpt.length > 200 ? meta.excerpt.slice(0, 197) + '...' : meta.excerpt;
    whySection = `\n🎯 Key Takeaway:\n${ex}`;
  }
  // Trim why section
  if (whySection.length > 350) {
    whySection = whySection.slice(0, 347).replace(/\s+\S*$/, '') + '...';
  }

  // ── 4. CONTEXTUAL RECOMMENDATION ──
  const rec = getRecommendation(meta.tags);
  const recUrl = rec.url.startsWith('http') ? rec.url : `${SITE_URL}${rec.url}`;
  const recLine = `${rec.text}\n${recUrl}`;

  // ── 5. CTAs ──
  const cta = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📡 Join 2,000+ security pros on our Telegram channel → https://t.me/shimiscyberworld
💻 Free tools: BreachRadar · ThreatLens · LockDown · GoFish → ${SITE_URL}/tools/`;

  // ── 6. HASHTAGS ──
  const hashtags = buildHashtags(meta);

  // ── ASSEMBLE ──
  let text = `${hook}

${analysis}
${whySection}

${recLine}

${cta}

${hashtags}`;

  // Safety: LinkedIn has a 3000 char limit. Keep under 2800 for clean rendering
  if (text.length > 2800) {
    // Trim analysis to fit
    const overflow = text.length - 2700;
    analysis = analysis.slice(0, Math.max(100, analysis.length - overflow)) + '...';
    text = `${hook}\n\n${analysis}\n${whySection}\n\n${recLine}\n\n${cta}\n\n${hashtags}`;
  }

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
