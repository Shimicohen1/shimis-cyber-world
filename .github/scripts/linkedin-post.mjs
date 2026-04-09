/**
 * SCW LinkedIn Auto-Poster
 * 
 * Picks the best post from today's _posts/ and publishes
 * a formatted update to LinkedIn via the REST API.
 * Posts to personal profile, and optionally to Company Page.
 * 
 * Runs daily via GitHub Actions at 10:00 Israel time.
 * 
 * Required secrets:
 *   LINKEDIN_ACCESS_TOKEN — OAuth 2.0 token with w_member_social (+ w_organization_social for company)
 *   LINKEDIN_PERSON_URN   — e.g. "urn:li:person:AbCdEf123"
 * Optional:
 *   LINKEDIN_ORG_URN      — e.g. "REDACTED_ORG_URN" (Company Page)
 */

import fs from 'fs';
import path from 'path';

const TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const PERSON_URN = process.env.LINKEDIN_PERSON_URN;
const ORG_URN = process.env.LINKEDIN_ORG_URN || '';
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

/* ── Hook generators — conversational, opinion-driven, question-based ── */
/* LinkedIn rewards: personal voice, curiosity gaps, questions, hot takes */
const HOOK_PATTERNS = [
  (t, score) => `${score === 'CRITICAL' ? '🔴' : ''} ${t}\n\nHere's what most people are missing about this one:`,
  (t, score) => `${t}\n\nThis caught my attention today — and it should catch yours too.`,
  (t, score) => `${t}\n\nI just reviewed the technical details. Here's my take:`,
  (t, score) => `${score === 'CRITICAL' ? '🔴 ' : ''}${t}\n\nThis one makes me uncomfortable. Let me explain:`,
  (t, score) => `${t}\n\nAre you affected? Let me break it down:`,
  (t, score) => `${t}\n\nI see this pattern over and over again. Here's why it matters:`,
  (t, score) => `${score === 'CRITICAL' ? '🔴 ' : ''}${t}\n\nMost teams won't catch this until it's too late.`,
];

/* ── Tag → SCW Elite tool recommendation (our tools) ── */
const TOOL_RECOMMENDATIONS = {
  'ransomware':       { text: '🔎 Check if your org is exposed → BreachRadar (free)', url: '/breach-radar/' },
  'darkweb':          { text: '🔎 Dark web exposure check → BreachRadar', url: '/breach-radar/' },
  'malware':          { text: '🔎 Scan your IOCs across 22 platforms → ThreatLens (free)', url: '/ioc-scanner/' },
  'phishing':         { text: '🎣 Suspicious link? Check it instantly → GoFish (free)', url: '/gofish/' },
  'vulnerability':    { text: '🛡️ Hardening checks for 18 platforms → LockDown (free)', url: '/hardening/' },
  'cve':              { text: '🛡️ 847 hardening checks across 18 platforms → LockDown', url: '/hardening/' },
  'detection':        { text: '📋 KQL, Sigma & Splunk rules → Detection Vault', url: '/detections/' },
  'incident-response':{ text: '🚨 Step-by-step IR playbooks → WarRoom', url: '/playbooks/' },
};
const DEFAULT_TOOL = { text: '🛡️ Free security tools → BreachRadar, ThreatLens, LockDown, GoFish', url: '/tools/' };

/* ── Tag → MONETIZED product recommendation (affiliate / revenue) ── */
/* Only shown when tags naturally match — never forced.              */
/* Topics without a natural affiliate fit (malware, APT, CVE, etc.) */
/* fall through to SCW Elite — no irrelevant recs.                   */
const MONETIZED_RECS = [
  { tags: ['credentials','password','identity','brute-force','authentication','mfa','2fa','iam','okta','active-directory','kerberos','ldap'],
    text: '🔑 Secure your credentials → Proton Pass (encrypted password manager)',
    url: 'https://www.kqzyfj.com/click-101720928-15831601' },
  { tags: ['vpn','privacy','network','surveillance','tracking','proxy','tor','encryption','data-leak','data-breach','exposure'],
    text: '🔐 Stay private online → Surfshark VPN',
    url: 'https://www.kqzyfj.com/click-101720928-15438560' },
  { tags: ['osint','reconnaissance','discovery'],
    text: '🔐 Stay anonymous during research → NordVPN',
    url: 'https://www.anrdoezrs.net/click-101720928-13756265' },
  { tags: ['pentest','ctf','red-team','offensive','training','labs','oscp','certification','learning','career','blue-team','soc','dfir','detection'],
    text: '🎯 Level up your skills → Hack The Box (10-20% off)',
    url: 'https://hacktheboxltd.sjv.io/DWLa2a' },
];

/* ── SCW Elite — promoted when no monetized partner fits ── */
const SCW_ELITE_REC = { text: '⭐ Get premium threat intel, IOC exports & deep-dive reports → SCW Elite', url: 'https://t.me/Shimiscyberworldbot?start=elite' };

function getToolRecommendation(tags) {
  const tagList = (tags || '').replace(/[\[\]]/g, '').split(',').map(t => t.trim().toLowerCase());
  for (const tag of tagList) {
    if (TOOL_RECOMMENDATIONS[tag]) return TOOL_RECOMMENDATIONS[tag];
  }
  return DEFAULT_TOOL;
}

function getMonetizedRecommendation(tags) {
  const tagList = (tags || '').replace(/[\[\]]/g, '').split(',').map(t => t.trim().toLowerCase());
  // Only return affiliate rec if tags naturally match
  for (const rec of MONETIZED_RECS) {
    if (tagList.some(t => rec.tags.includes(t))) return rec;
  }
  // No natural fit → promote SCW Elite instead of forcing an affiliate
  return SCW_ELITE_REC;
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

  // Build post URL — must match Jekyll permalink: /posts/:title/
  const slug = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  const postUrl = `${SITE_URL}/posts/${slug}/`;

  // ── 1. HOOK (first 2 lines — must create curiosity before "...see more") ──
  const hookIdx = Math.floor(Math.random() * HOOK_PATTERNS.length);
  const hook = HOOK_PATTERNS[hookIdx](title, score);

  // ── 2. PLAIN-LANGUAGE SUMMARY (conversational, no jargon dump) ──
  const paragraphs = body.split('\n\n').filter(p => p.trim().length > 40);
  let analysis = paragraphs[0] || '';
  // Trim to ~350 chars — shorter = more readable on mobile
  if (analysis.length > 400) {
    analysis = analysis.slice(0, 397).replace(/\s+\S*$/, '') + '...';
  }

  // ── 3. WHY IT MATTERS (short, punchy) ──
  let whySection = '';
  if (meta.why_it_matters) {
    const whyRaw = meta.why_it_matters;
    const whyClean = whyRaw.length > 250 ? whyRaw.slice(0, 247).replace(/\s+\S*$/, '') + '...' : whyRaw;
    whySection = `\n🎯 Bottom line:\n${whyClean}`;
  } else if (meta.excerpt) {
    const ex = meta.excerpt.length > 180 ? meta.excerpt.slice(0, 177) + '...' : meta.excerpt;
    whySection = `\n🎯 Bottom line:\n${ex}`;
  }

  // ── 4. ENGAGEMENT QUESTION — drives comments ──
  const QUESTIONS = [
    'Have you seen this in your environment?',
    'Is your team prepared for this?',
    'How would your org handle this?',
    'What\'s your take — overhyped or underestimated?',
    'Are you patched? Drop a 👍 if yes.',
    'What\'s the first thing you\'d check?',
  ];
  const question = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];

  // ── 5. SINGLE RECOMMENDATION (only if affiliate matches) ──
  const monRec = getMonetizedRecommendation(meta.tags);
  let recLine = '';
  if (monRec !== SCW_ELITE_REC) {
    recLine = `\n${monRec.text}\n${monRec.url}`;
  }
  // If no affiliate match — skip the rec entirely. Keeps it clean.

  // ── 6. FOOTER — article link + Telegram (compact, no divider) ──
  const footer = `📄 Full analysis: ${postUrl}\n📡 Daily updates: https://t.me/shimiscyberworld`;

  // ── 7. HASHTAGS (max 4 — fewer = better reach) ──
  const hashtags = '#ShimisCyberWorld ' + buildHashtags(meta).split(' ').slice(0, 3).join(' ');

  // ── ASSEMBLE ──
  let text = `${hook}

${analysis}
${whySection}

${question}
${recLine}

${footer}

${hashtags}`;

  // Clean up excessive blank lines  
  text = text.replace(/\n{3,}/g, '\n\n').trim();

  // Safety: LinkedIn has a 3000 char limit. Keep under 2500 for clean rendering
  if (text.length > 2500) {
    const overflow = text.length - 2400;
    analysis = analysis.slice(0, Math.max(100, analysis.length - overflow)) + '...';
    text = `${hook}\n\n${analysis}\n${whySection}\n\n${question}\n${recLine}\n\n${footer}\n\n${hashtags}`;
    text = text.replace(/\n{3,}/g, '\n\n').trim();
  }

  return { text, postUrl, title, image: meta.image || meta.cover_image || '' };
}

/* ═══════════════════════════════════════════════════════════
 *  LINKEDIN API
 * ═══════════════════════════════════════════════════════════ */

async function postToLinkedIn(authorUrn, text, articleUrl, articleTitle, thumbnailUrl) {
  /* TEXT-ONLY post — no link preview card.
   * LinkedIn algorithm suppresses posts with ARTICLE media (external links).
   * Text-only posts get 2-3x more reach. The article URL is in the text body. */
  const payload = {
    author: authorUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text },
        shareMediaCategory: 'NONE',
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
  
  const { text, postUrl, title, image } = formatLinkedInPost(best.meta, best.file);
  console.log(`\n--- LinkedIn Post Preview ---\n${text}\n---\n`);

  // Post to personal profile
  const personalId = await postToLinkedIn(PERSON_URN, text, postUrl, title, image);
  console.log(`✅ Posted to personal profile: ${personalId}`);

  // Post to Company Page (if configured)
  if (ORG_URN) {
    try {
      const orgId = await postToLinkedIn(ORG_URN, text, postUrl, title, image);
      console.log(`✅ Posted to Company Page: ${orgId}`);
    } catch (err) {
      // Don't fail the whole run if company post fails
      console.error(`⚠️  Company Page post failed (continuing): ${err.message}`);
    }
  } else {
    console.log('ℹ️  No LINKEDIN_ORG_URN — skipping Company Page post.');
  }

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
