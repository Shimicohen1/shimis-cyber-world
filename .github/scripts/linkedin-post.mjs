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
const GH_IMAGES_PAT = process.env.GH_IMAGES_PAT || '';
const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, '_posts');
const STATE_FILE = path.join(ROOT, '.github', 'linkedin-state.json');
const SITE_URL = 'https://shimiscyberworld.com';
const IMAGES_REPO = 'Shimicohen1/scw-post-images';
const IMAGES_BASE_URL = `https://raw.githubusercontent.com/${IMAGES_REPO}/main`;

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

// Channels to EXCLUDE from LinkedIn (boring CVE bulletins, low engagement)
const LINKEDIN_EXCLUDED_CHANNELS = [
  '1129491012', // CVE Notify — raw CVE disclosures for obscure software
];

// Tags that boost LinkedIn score (real-world impact stories)
const LINKEDIN_BOOST_TAGS = [
  'data-breach', 'ransomware', 'apt', 'espionage', 'supply-chain',
  'darkweb', 'threat-intel', 'incident-response', 'fraud',
];

// Tags that reduce LinkedIn score (dry, technical, low engagement)
const LINKEDIN_PENALTY_TAGS = [
  'cve', 'vulnerability', 'hardening',
];

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

    // Exclude boring channels by filename (format: YYYY-MM-DD-telegram-CHANNELID-MSGID.md)
    const channelMatch = file.match(/telegram-(\d+)-/);
    if (channelMatch && LINKEDIN_EXCLUDED_CHANNELS.includes(channelMatch[1])) continue;

    const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const meta = parseFrontMatter(content);
    if (!meta || meta.hidden === 'true') continue;
    candidates.push({ file, meta });
  }

  if (candidates.length === 0) {
    console.log('All eligible posts already shared.');
    return null;
  }

  // LinkedIn-optimized scoring: prefer real-world impact stories over dry CVEs
  const scoreMap = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
  candidates.sort((a, b) => {
    const aFeat = a.meta.featured === 'true' ? 100 : 0;
    const bFeat = b.meta.featured === 'true' ? 100 : 0;
    const aScore = scoreMap[a.meta.score] || 2;
    const bScore = scoreMap[b.meta.score] || 2;

    // Tag-based boost/penalty for LinkedIn engagement
    const aTags = (a.meta.tags || '').replace(/[\[\]]/g, '').split(',').map(t => t.trim().toLowerCase());
    const bTags = (b.meta.tags || '').replace(/[\[\]]/g, '').split(',').map(t => t.trim().toLowerCase());
    const aBoost = aTags.some(t => LINKEDIN_BOOST_TAGS.includes(t)) ? 30 : 0;
    const bBoost = bTags.some(t => LINKEDIN_BOOST_TAGS.includes(t)) ? 30 : 0;
    const aPenalty = aTags.some(t => LINKEDIN_PENALTY_TAGS.includes(t)) ? 20 : 0;
    const bPenalty = bTags.some(t => LINKEDIN_PENALTY_TAGS.includes(t)) ? 20 : 0;

    // AI-rewritten content gets a boost (better quality)
    const aAi = a.meta.ai_rewritten === 'true' ? 10 : 0;
    const bAi = b.meta.ai_rewritten === 'true' ? 10 : 0;

    const aTotal = aFeat + aScore * 10 + aBoost - aPenalty + aAi;
    const bTotal = bFeat + bScore * 10 + bBoost - bPenalty + bAi;
    return bTotal - aTotal;
  });

  console.log(`📊 LinkedIn candidates: ${candidates.length} posts (top pick: "${candidates[0].meta.title?.slice(0, 60)}")`);
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
  'training':         { text: '🎓 Hands-on cyber labs from beginner to advanced → TryHackMe', url: 'https://tryhackme.sjv.io/GbDW09' },
  'blue-team':        { text: '🎓 Practice real defense scenarios → TryHackMe', url: 'https://tryhackme.sjv.io/GbDW09' },
  'red-team':         { text: '🎓 Sharpen your offensive skills → TryHackMe', url: 'https://tryhackme.sjv.io/GbDW09' },
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
  const body = stripMarkdown(meta._body || '').slice(0, 2000);
  const score = (meta.score || 'MEDIUM').toUpperCase();
  const tags = (meta.tags || '').replace(/[\[\]]/g, '');
  const source = meta.source_name || meta.channel || 'a threat intelligence source';
  const category = meta.event_type || (tags.includes('vulnerability') ? 'vulnerability' : 'incident');

  // Load persona config
  let persona = {};
  try {
    const personaPath = path.join(ROOT, '.github', 'config', 'persona.json');
    persona = JSON.parse(fs.readFileSync(personaPath, 'utf8'));
  } catch { /* fallback to inline rules */ }

  const prompt = `You are Shimi — a CISO with 20+ years in cybersecurity, intelligence, OSINT, and ethical hacking. Based in Israel. You run Shimi's Cyber World (SCW), a threat intelligence community.

Write a LinkedIn post about this news. Your voice: a seasoned CISO sharing a real take with his professional network — not a news anchor reading a teleprompter.

═══ ARTICLE ═══
Title: ${title}
Source: ${source}
Category: ${category}
Severity: ${score}
Tags: ${tags}
Content:
${body}

═══ YOUR VOICE ═══
- Write as yourself — a CISO who's seen 20+ years of threats. Be direct, opinionated, practical.
- Open with a strong hook (1-2 lines) that makes people stop scrolling. State the news fact, then add YOUR angle.
- Give 2-3 short paragraphs of analysis. What does this REALLY mean? Why should a security leader care? What would YOU tell your team?
- End with a question that sparks real discussion — not generic "thoughts?" but something specific to the topic.
- Tone: confident, sharp, occasionally blunt. You can say "this is bad" or "this is overhyped" — have an opinion.

═══ HARD RULES — NEVER BREAK THESE ═══
1. NEVER claim you attended, visited, or experienced anything from the source article. You are REPORTING news you found — you were NOT there.
2. NEVER write "I was at", "I just came back from", "At this week's conference", "I reviewed this firsthand". These are BANNED phrases.
3. NEVER fabricate personal anecdotes. No "this reminds me of the time we responded to..." with specific made-up details.
4. You CAN reference general experience: "In 20+ years of doing this...", "As someone who manages security operations...", "I've seen this pattern enough times to know..."
5. You CAN give your professional opinion: "This is exactly what keeps CISOs up at night", "Here's what I'd tell my team Monday morning"
6. NEVER mention your employer or company name.
7. Attribute findings to the source: "According to ${source}..." or "${source} reported..."
8. ZERO emojis ANYWHERE in the post except the two footer markers (📄 📡). Not even 🔴 or 🔍 or 👆.
9. EXACTLY 3 hashtags on the last line: #ShimisCyberWorld #cybersecurity #[one topic tag]
10. NO product recommendations, NO affiliate links, NO "protect yourself with..." plugs.
11. NO sections labeled "Bottom line", "Key takeaway", "TL;DR" — just flow naturally.
12. Plain text only — no markdown, no bold, no formatting.

═══ FORMAT ═══
[Hook: 1-2 punchy lines — the news fact + your angle]

[2-3 short paragraphs, 1-3 sentences each — your CISO analysis]

[1 specific question to drive comments]

📄 ${postUrl}
📡 https://t.me/shimiscyberworld
#ShimisCyberWorld #cybersecurity #[topic]

═══ LENGTH ═══
Target 1000-1500 characters. LinkedIn rewards longer, thoughtful posts. Don't pad — but don't cut short either. Say what needs to be said.`;

  const TEXT_MAX_RETRIES = 3;
  const TEXT_RETRY_DELAYS = [3000, 8000, 15000];

  for (let attempt = 0; attempt <= TEXT_MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 1500,
              thinkingConfig: { thinkingBudget: 0 },
            }
          })
        }
      );

      if (!res.ok) {
        if ([429, 500, 502, 503, 504].includes(res.status) && attempt < TEXT_MAX_RETRIES) {
          const delay = TEXT_RETRY_DELAYS[attempt];
          console.warn(`⚠️  Gemini text API ${res.status} — retrying in ${delay / 1000}s (attempt ${attempt + 1}/${TEXT_MAX_RETRIES})`);
          await new Promise(r => setTimeout(r, delay));
          continue;
        }
        console.warn(`⚠️  Gemini API ${res.status} — falling back to template`);
        return null;
      }

    const data = await res.json();
    // Extract text, skipping any thinking/reasoning parts
    const parts = data?.candidates?.[0]?.content?.parts || [];
    const generated = parts
      .filter(p => !p.thought && p.text)
      .map(p => p.text)
      .join('')
      .trim();
    
    if (!generated || generated.length < 200) {
      console.warn('⚠️  Gemini returned empty/short response — falling back to template');
      return null;
    }

    // Clean up and validate
    let text = generated.trim();

    // Strip ALL emojis, then restore only the footer markers
    text = text.replace(/[\p{Extended_Pictographic}]/gu, '');
    // Restore footer emoji markers — match various Gemini formats
    text = text.replace(/^[ \t]*(Full analysis:?\s*)?(?=https?:\/\/shimiscyberworld\.com)/m, '📄 ');
    text = text.replace(/^[ \t]*(Daily updates:?\s*)?(?=https?:\/\/t\.me)/m, '📡 ');
    
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

    // Enforce max length — LinkedIn limit is 3000, keep under 2000 for readability
    if (text.length > 2000) {
      const lines = text.split('\n');
      const footerIdx = lines.findIndex(l => l.startsWith('📄'));
      if (footerIdx > 2) {
        const hook = lines.slice(0, 2).join('\n');
        const footer = lines.slice(footerIdx).join('\n');
        let body = lines.slice(2, footerIdx).filter(l => l.trim());
        while (body.length > 1 && (hook + '\n\n' + body.join('\n\n') + '\n\n' + footer).length > 2000) {
          body.pop();
        }
        text = hook + '\n\n' + body.join('\n\n') + '\n\n' + footer;
      }
    }

    return text;
    } catch (err) {
      if (attempt < TEXT_MAX_RETRIES) {
        const delay = TEXT_RETRY_DELAYS[attempt];
        console.warn(`⚠️  Gemini text error: ${err.message} — retrying in ${delay / 1000}s (attempt ${attempt + 1}/${TEXT_MAX_RETRIES})`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      console.warn(`⚠️  Gemini error after retries: ${err.message} — falling back to template`);
      return null;
    }
  }
  return null;
}

/* ═══════════════════════════════════════════════════════════
 *  GEMINI IMAGE GENERATION — contextual LinkedIn visual
 * ═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
 *  POOL IMAGE PICKER — pick from scw-post-images repo
 *  (replaces per-post Gemini image generation to save costs)
 * ═══════════════════════════════════════════════════════════ */

const TAG_TO_CATEGORY = {
  ransomware: 'threats', 'data-breach': 'threats', darkweb: 'threats',
  apt: 'threats', espionage: 'threats', malware: 'threats',
  vulnerability: 'vulnerability', cve: 'vulnerability', exploit: 'vulnerability',
  tools: 'tools', 'red-team': 'tools', pentest: 'tools', osint: 'tools',
  'threat-intel': 'news', 'ai-security': 'news', cloud: 'news',
  phishing: 'news', 'supply-chain': 'news',
};

function resolveCategory(tags) {
  const tagList = (tags || '').replace(/[\[\]]/g, '').split(',').map(t => t.trim().toLowerCase());
  for (const t of tagList) {
    if (TAG_TO_CATEGORY[t]) return TAG_TO_CATEGORY[t];
  }
  return 'news';
}

async function pickPoolImage(tags) {
  if (!GH_IMAGES_PAT) {
    console.warn('⚠️  No GH_IMAGES_PAT — cannot fetch pool images');
    return null;
  }

  const category = resolveCategory(tags);
  const dirs = [`pool/${category}`, 'pool/news']; // fallback to news

  for (const dir of dirs) {
    try {
      const res = await fetch(`https://api.github.com/repos/${IMAGES_REPO}/contents/${dir}`, {
        headers: { Authorization: `token ${GH_IMAGES_PAT}`, 'User-Agent': 'SCW-LinkedIn' },
      });
      if (!res.ok) continue;
      const files = await res.json();
      const images = files.filter(f => f.name.endsWith('.png') || f.name.endsWith('.jpg'));
      if (images.length === 0) continue;

      const pick = images[Math.floor(Math.random() * images.length)];
      const imageUrl = `${IMAGES_BASE_URL}/${dir}/${pick.name}`;
      console.log(`🖼️  Pool image: ${dir}/${pick.name} (from ${images.length} available)`);

      // Download the image buffer for LinkedIn upload
      const imgRes = await fetch(imageUrl);
      if (!imgRes.ok) {
        console.warn(`⚠️  Failed to download pool image: ${imgRes.status}`);
        return null;
      }
      const arrayBuf = await imgRes.arrayBuffer();
      return {
        buffer: Buffer.from(arrayBuf),
        mimeType: 'image/png',
        repoUrl: imageUrl,
      };
    } catch (err) {
      console.warn(`⚠️  Pool fetch error for ${dir}: ${err.message}`);
    }
  }
  return null;
}

/* ═══════════════════════════════════════════════════════════
 *  LINKEDIN IMAGE UPLOAD — register + upload binary
 * ═══════════════════════════════════════════════════════════ */

async function uploadImageToLinkedIn(imageBuffer, mimeType) {
  // Step 1: Register upload
  const registerRes = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      registerUploadRequest: {
        owner: PERSON_URN,
        recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
        serviceRelationships: [{
          identifier: 'urn:li:userGeneratedContent',
          relationshipType: 'OWNER',
        }],
      }
    })
  });

  if (!registerRes.ok) {
    const err = await registerRes.text();
    throw new Error(`LinkedIn register upload ${registerRes.status}: ${err}`);
  }

  const registerData = await registerRes.json();
  const uploadUrl = registerData.value
    ?.uploadMechanism?.['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest']
    ?.uploadUrl;
  const asset = registerData.value?.asset;

  if (!uploadUrl || !asset) {
    throw new Error('LinkedIn register upload: missing uploadUrl or asset');
  }

  // Step 2: Upload binary
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': mimeType,
    },
    body: imageBuffer,
  });

  if (!uploadRes.ok && uploadRes.status !== 201) {
    const err = await uploadRes.text();
    throw new Error(`LinkedIn image upload ${uploadRes.status}: ${err}`);
  }

  console.log(`📤 Image uploaded to LinkedIn: ${asset}`);
  return asset;
}

/* ═══════════════════════════════════════════════════════════
 *  PUSH IMAGE TO SCW-POST-IMAGES REPO
 * ═══════════════════════════════════════════════════════════ */

async function pushImageToRepo(imageBuffer, slug) {
  if (!GH_IMAGES_PAT) {
    console.warn('⚠️  No GH_IMAGES_PAT — skipping image repo push');
    return null;
  }

  const filePath = `linkedin/${slug}.png`;
  const b64Content = imageBuffer.toString('base64');

  // Check if file already exists (to get its SHA for update)
  let sha;
  try {
    const checkRes = await fetch(
      `https://api.github.com/repos/${IMAGES_REPO}/contents/${filePath}`,
      { headers: { 'Authorization': `token ${GH_IMAGES_PAT}` } }
    );
    if (checkRes.ok) {
      const existing = await checkRes.json();
      sha = existing.sha;
    }
  } catch { /* file doesn't exist — that's fine */ }

  const body = {
    message: `Add image: ${slug}`,
    content: b64Content,
  };
  if (sha) body.sha = sha;

  const res = await fetch(
    `https://api.github.com/repos/${IMAGES_REPO}/contents/${filePath}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GH_IMAGES_PAT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.warn(`⚠️  GitHub image push failed ${res.status}: ${err.slice(0, 200)}`);
    return null;
  }

  const imageUrl = `${IMAGES_BASE_URL}/${filePath}`;
  console.log(`📦 Image pushed to repo: ${imageUrl}`);
  return imageUrl;
}

/* ═══════════════════════════════════════════════════════════
 *  LINKEDIN API
 * ═══════════════════════════════════════════════════════════ */

async function postToLinkedIn(authorUrn, text, imageAsset) {
  /* IMAGE post when asset available, TEXT-ONLY otherwise.
   * Native image posts get ~18% more engagement than text-only.
   * Article/link posts are suppressed — URL stays in text body. */
  const shareContent = {
    shareCommentary: { text },
  };

  if (imageAsset) {
    shareContent.shareMediaCategory = 'IMAGE';
    shareContent.media = [{
      status: 'READY',
      media: imageAsset,
    }];
  } else {
    shareContent.shareMediaCategory = 'NONE';
  }

  const payload = {
    author: authorUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': shareContent,
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
 *  UPDATE POST FRONT MATTER — swap Unsplash → AI image
 * ═══════════════════════════════════════════════════════════ */

function updatePostImage(fileName, imageUrl) {
  const filePath = path.join(POSTS_DIR, fileName);
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace image: and cover_image: values in front matter
    content = content.replace(
      /^(image:\s*)"[^"]*"/m,
      `$1"${imageUrl}"`
    );
    content = content.replace(
      /^(cover_image:\s*)"[^"]*"/m,
      `$1"${imageUrl}"`
    );
    // Mark as AI-generated image (suppresses credit line)
    content = content.replace(
      /^(image_pool_used:\s*).*/m,
      '$1true'
    );

    fs.writeFileSync(filePath, content);
    console.log(`🔄 Post image updated to AI image: ${fileName}`);
  } catch (err) {
    console.warn(`⚠️  Could not update post image: ${err.message}`);
  }
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

  // Pick image from pool (no Gemini API call — uses pre-generated pool)
  let imageAsset = null;
  let repoImageUrl = null;
  const imageData = await pickPoolImage(best.meta.tags);
  if (imageData) {
    try {
      imageAsset = await uploadImageToLinkedIn(imageData.buffer, imageData.mimeType);
    } catch (err) {
      console.warn(`⚠️  Image upload failed: ${err.message} — posting text-only`);
    }

    // Pool images are already in the repo — use the URL directly
    repoImageUrl = imageData.repoUrl;

    // Update post front matter to use pool image instead of Unsplash
    if (repoImageUrl) {
      updatePostImage(best.file, repoImageUrl);
    }
  }

  // Post to personal profile
  const personalId = await postToLinkedIn(PERSON_URN, text, imageAsset);
  console.log(`✅ Posted to personal profile${imageAsset ? ' (with image)' : ' (text-only)'}: ${personalId}`);

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
