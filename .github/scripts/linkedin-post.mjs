/**
 * SCW LinkedIn Auto-Poster
 * 
 * Picks the best post from today's _posts/ and publishes
 * a formatted update to LinkedIn via the REST API.
 * Posts to personal profile only.
 * 
 * Runs daily via GitHub Actions at 10:00 Israel time.
 * 
 * Required secrets:
 *   LINKEDIN_ACCESS_TOKEN — OAuth 2.0 token with w_member_social
 *   LINKEDIN_PERSON_URN   — e.g. "urn:li:person:AbCdEf123"
 * Optional:
 *   GEMINI_API_KEY        — Gemini AI for natural post generation (falls back to template if missing)
 */

import fs from 'fs';
import path from 'path';

const TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const PERSON_URN = process.env.LINKEDIN_PERSON_URN;
const ORG_URN = process.env.LINKEDIN_ORG_URN || '';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
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
  (t, score) => `${score === 'CRITICAL' ? '🔴 ' : ''}${t}\n\nHere's what security teams need to know:`,
  (t, score) => `${t}\n\nThis just surfaced — and it deserves attention.`,
  (t, score) => `${t}\n\nThe technical details reveal a bigger problem:`,
  (t, score) => `${score === 'CRITICAL' ? '🔴 ' : ''}${t}\n\nThis one is worth a closer look.`,
  (t, score) => `${t}\n\nAre organizations affected? Here's the breakdown:`,
  (t, score) => `${t}\n\nA growing pattern that keeps surfacing:`,
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



function getToolRecommendation(tags) {
  const tagList = (tags || '').replace(/[\[\]]/g, '').split(',').map(t => t.trim().toLowerCase());
  for (const tag of tagList) {
    if (TOOL_RECOMMENDATIONS[tag]) return TOOL_RECOMMENDATIONS[tag];
  }
  return DEFAULT_TOOL;
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
    whySection = `\n${whyClean}`;
  } else if (meta.excerpt) {
    const ex = meta.excerpt.length > 180 ? meta.excerpt.slice(0, 177) + '...' : meta.excerpt;
    whySection = `\n${ex}`;
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

  // ── 5. SCW TOOL RECOMMENDATION (only when topically relevant) ──
  const toolRec = getToolRecommendation(meta.tags);
  const toolLine = toolRec !== DEFAULT_TOOL
    ? `\n${toolRec.text}: ${SITE_URL}${toolRec.url}`
    : '';

  // ── 6. FOOTER — article link + Telegram (compact, no divider) ──
  const footer = `📄 Full analysis: ${postUrl}\n📡 Daily updates: https://t.me/shimiscyberworld`;

  // ── 7. HASHTAGS (exactly 3) ──
  const tagList = (meta.tags || '').replace(/[\[\]]/g, '').split(',')
    .map(t => t.trim().replace(/[- ]/g, '').replace(/^#/, ''))
    .filter(t => t.length > 2 && t.length < 25);
  const topicTag = tagList[0] || 'infosec';
  const hashtags = `#ShimisCyberWorld #cybersecurity #${topicTag}`;

  // ── ASSEMBLE ──
  let text = `${hook}

${analysis}
${whySection}

${question}
${toolLine}

${footer}

${hashtags}`;

  // Clean up excessive blank lines  
  text = text.replace(/\n{3,}/g, '\n\n').trim();

  // Safety: LinkedIn has a 3000 char limit. Keep under 2500 for clean rendering
  if (text.length > 2500) {
    const overflow = text.length - 2400;
    analysis = analysis.slice(0, Math.max(100, analysis.length - overflow)) + '...';
    text = `${hook}\n\n${analysis}\n${whySection}\n\n${question}\n${toolLine}\n\n${footer}\n\n${hashtags}`;
    text = text.replace(/\n{3,}/g, '\n\n').trim();
  }

  return { text, postUrl, title, image: meta.image || meta.cover_image || '' };
}

/* ═══════════════════════════════════════════════════════════
 *  GEMINI AI — Generate natural LinkedIn post
 * ═══════════════════════════════════════════════════════════ */

async function generateWithGemini(meta, fileName, postUrl) {
  if (!GEMINI_API_KEY) return null;

  const title = meta.title || 'Security Update';
  const body = stripMarkdown(meta._body || '').slice(0, 1500);
  const score = (meta.score || 'MEDIUM').toUpperCase();
  const tags = (meta.tags || '').replace(/[\[\]]/g, '');

  const prompt = `Write a LinkedIn post for Shimi's Cyber World — a cyber threat intelligence community. Shimi REPORTS news he found. He was NOT at any event and did NOT experience anything personally.

ARTICLE: ${title}
CONTENT:
${body}

FORMAT (follow exactly):
[Hook — 1-2 lines, state the news fact in third person]

[2-3 short paragraphs, 1-2 sentences each, reporter style]

[1 question to spark comments]

📄 ${postUrl}
📡 https://t.me/shimiscyberworld
#ShimisCyberWorld #cybersecurity #[one topic tag]

HARD RULES:
- NEVER write "I just reviewed", "I was at", "Here's my take", "I see this pattern", "Bottom line". Write in third person about the news
- ZERO emojis anywhere except the two footer markers (📄 📡). No 🎯 🔐 👍 or any other emoji
- EXACTLY 3 hashtags on the last line. Not 4, not 5 — exactly 3
- Total post MUST be 500-700 characters. Count carefully. If over 700, remove content
- NO product recommendations, NO affiliate links, NO "stay private" or "protect yourself" product plugs
- NO sections labeled "Bottom line" or "Key takeaway" — just flow naturally
- If the topic involves breach/ransomware/exposure, you may add ONE line before the footer: "Check your exposure free: ${SITE_URL}/breach-radar/"
- Plain text only, no formatting`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 350,
          }
        })
      }
    );

    if (!res.ok) {
      console.warn(`⚠️  Gemini API ${res.status} — falling back to template`);
      return null;
    }

    const data = await res.json();
    const generated = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generated || generated.length < 200) {
      console.warn('⚠️  Gemini returned empty/short response — falling back to template');
      return null;
    }

    // Clean up and validate
    let text = generated.trim();

    // Strip ALL emojis, then restore only the footer markers
    text = text.replace(/[\p{Extended_Pictographic}]/gu, '');
    // Restore footer emoji markers
    text = text.replace(/(\s*)Full analysis:/m, '\n📄 Full analysis:');
    text = text.replace(/(\s*)(Daily updates:|https:\/\/t\.me)/m, '\n📡 $2');
    
    // Ensure footer links are present (add if AI forgot them)
    if (!text.includes('t.me/shimiscyberworld')) {
      text += `\n📡 https://t.me/shimiscyberworld`;
    }
    if (!text.includes(postUrl)) {
      text = text.replace(/📡/, `📄 ${postUrl}\n📡`);
    }
    if (!text.includes('#ShimisCyberWorld')) {
      text += '\n#ShimisCyberWorld #cybersecurity #infosec';
    }

    // Remove affiliate/product lines that Gemini might inject
    text = text.replace(/.*(?:stay private|protect yourself|surfshark|proton pass|nordvpn|kqzyfj\.com|tkqlhce\.com).*/gi, '');
    // Clean up double blank lines from removals
    text = text.replace(/\n{3,}/g, '\n\n');

    // Enforce max length — trim body paragraphs if over 900 chars (keep hook + footer)
    if (text.length > 900) {
      const lines = text.split('\n');
      // Find footer start (📄 line)
      const footerIdx = lines.findIndex(l => l.startsWith('📄'));
      if (footerIdx > 2) {
        const hook = lines.slice(0, 2).join('\n');
        const footer = lines.slice(footerIdx).join('\n');
        let body = lines.slice(2, footerIdx).filter(l => l.trim());
        // Remove paragraphs from the end until under limit
        while (body.length > 1 && (hook + '\n\n' + body.join('\n\n') + '\n\n' + footer).length > 900) {
          body.pop();
        }
        text = hook + '\n\n' + body.join('\n\n') + '\n\n' + footer;
      }
    }

    return text;
  } catch (err) {
    console.warn(`⚠️  Gemini error: ${err.message} — falling back to template`);
    return null;
  }
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
  
  const { text: templateText, postUrl, title, image } = formatLinkedInPost(best.meta, best.file);

  // Try Gemini AI first, fall back to template
  let text;
  const aiText = await generateWithGemini(best.meta, best.file, postUrl);
  if (aiText) {
    text = aiText;
    console.log('🤖 Using Gemini-generated post');
  } else {
    text = templateText;
    console.log('📋 Using template-generated post');
  }

  console.log(`\n--- LinkedIn Post Preview (${text.length} chars) ---\n${text}\n---\n`);

  // Post to personal profile
  const personalId = await postToLinkedIn(PERSON_URN, text, postUrl, title, image);
  console.log(`✅ Posted to personal profile: ${personalId}`);

  // Company Page posting disabled — personal profile only.
  // Will be handled by a separate workflow once Community Management API is approved.

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
