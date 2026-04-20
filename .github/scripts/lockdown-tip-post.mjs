/**
 * SCW Lockdown Tip of the Day — LinkedIn + Telegram Auto-Poster
 * 
 * Picks the next hardening tip from _data/hardening.yml and publishes
 * a "Lockdown Tip of the Day #N" post to LinkedIn and Telegram.
 * Sequential order, round-robin through all 912 tips with vendor variety.
 * 
 * Runs daily via GitHub Actions at 10:00 Israel time.
 * 
 * Required secrets:
 *   LINKEDIN_ACCESS_TOKEN — OAuth 2.0 token with w_member_social
 *   LINKEDIN_PERSON_URN   — e.g. "urn:li:person:AbCdEf123"
 * Optional:
 *   GEMINI_API_KEY        — Gemini AI for natural post generation (falls back to template)
 *   GH_IMAGES_PAT         — For lockdown cover image from scw-post-images repo
 *   TELEGRAM_BOT_TOKEN    — Telegram Bot API token for channel posting
 *   TELEGRAM_CHANNEL_ID   — Telegram channel ID (e.g. @shimiscyberworld)
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const PERSON_URN = process.env.LINKEDIN_PERSON_URN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GH_IMAGES_PAT = process.env.GH_IMAGES_PAT || '';
const TG_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TG_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID || '';
// Feature flag: set LOCKDOWN_PUBLISH_TO_SITE=false to skip the website publish
// step (LinkedIn + Telegram still publish using /hardening/#tip-X as primary link).
const PUBLISH_TO_SITE = (process.env.LOCKDOWN_PUBLISH_TO_SITE || 'true').toLowerCase() !== 'false';
const DRY_RUN = process.argv.includes('--dry-run');
const FORCE_ID = process.argv.find(a => a.startsWith('--force-id='))?.split('=')[1] || '';
const PREVIEW = process.argv.includes('--preview');
const SKIP_SITE = process.argv.includes('--no-site'); // override flag, useful for manual reruns
const ROOT = process.cwd();
const STATE_FILE = path.join(ROOT, '.github', 'lockdown-tip-state.json');
const HARDENING_YML = path.join(ROOT, '_data', 'hardening.yml');
const POSTS_DIR = path.join(ROOT, '_posts');
const SITE_URL = 'https://shimiscyberworld.com';
const IMAGES_REPO = 'Shimicohen1/scw-post-images';
const IMAGES_BASE_URL = `https://raw.githubusercontent.com/${IMAGES_REPO}/main`;

/* ═══════════════════════════════════════════════════════════
 *  STATE
 * ═══════════════════════════════════════════════════════════ */

function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); }
  catch { return { tipNumber: 0, usedIds: [], round: 1, history: [] }; }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

/* ═══════════════════════════════════════════════════════════
 *  PARSE HARDENING YAML (minimal parser — no dependency)
 * ═══════════════════════════════════════════════════════════ */

function parseHardeningYml() {
  const raw = fs.readFileSync(HARDENING_YML, 'utf8');
  const lines = raw.split('\n');

  // Extract platforms map
  const platforms = {};
  const categories = {};
  let inPlatforms = false, inCategories = false, inItems = false;
  let currentPlatform = null, currentCategory = null;

  // First pass: extract platforms and categories
  for (const line of lines) {
    if (line.match(/^platforms:/)) { inPlatforms = true; inCategories = false; inItems = false; continue; }
    if (line.match(/^categories:/)) { inPlatforms = false; inCategories = true; inItems = false; continue; }
    if (line.match(/^items:/)) { inPlatforms = false; inCategories = false; inItems = true; break; }

    if (inPlatforms) {
      const idMatch = line.match(/^-\s+id:\s+(.+)/) || line.match(/^\s+-\s+id:\s+(.+)/);
      const nameMatch = line.match(/^\s+name:\s+(.+)/);
      const iconMatch = line.match(/^\s+icon:\s+(.+)/);
      if (idMatch) currentPlatform = idMatch[1].trim();
      if (nameMatch && currentPlatform) platforms[currentPlatform] = { name: nameMatch[1].trim(), icon: '' };
      if (iconMatch && currentPlatform && platforms[currentPlatform]) platforms[currentPlatform].icon = iconMatch[1].trim();
    }
    if (inCategories) {
      const idMatch = line.match(/^-\s+id:\s+(.+)/) || line.match(/^\s+-\s+id:\s+(.+)/);
      const nameMatch = line.match(/^\s+name:\s+(.+)/);
      if (idMatch) currentCategory = idMatch[1].trim();
      if (nameMatch && currentCategory) categories[currentCategory] = nameMatch[1].trim();
    }
  }

  // Second pass: extract items
  const items = [];
  let item = null;
  let currentField = null;
  let multiLineValue = '';
  let inBlockScalar = false;
  let blockIndent = 0;
  let inPremium = false;
  let premiumField = null;
  let premiumValue = '';
  inItems = false;

  for (const line of lines) {
    if (line.match(/^items:/)) { inItems = true; continue; }
    if (!inItems) continue;

    // New item
    if (line.match(/^-\s+id:/) || line.match(/^\s+-\s+id:/)) {
      // Save previous item
      if (item) {
        if (currentField && multiLineValue) {
          item[currentField] = inBlockScalar
            ? multiLineValue.replace(/\n+$/, '')
            : multiLineValue.trim();
        }
        if (inPremium && premiumField && premiumValue) {
          if (!item.premium) item.premium = {};
          item.premium[premiumField] = premiumValue.trim();
        }
        items.push(item);
      }
      const idVal = (line.match(/id:\s+(.+)/))[1].trim();
      item = { id: idVal };
      currentField = null;
      multiLineValue = '';
      inBlockScalar = false;
      inPremium = false;
      premiumField = null;
      premiumValue = '';
      continue;
    }

    if (!item) continue;

    // Premium block
    if (line.match(/^\s+premium:/)) {
      if (currentField && multiLineValue) {
        item[currentField] = inBlockScalar
          ? multiLineValue.replace(/\n+$/, '')
          : multiLineValue.trim();
        currentField = null;
        multiLineValue = '';
        inBlockScalar = false;
      }
      inPremium = true;
      item.premium = {};
      continue;
    }

    if (inPremium) {
      const premKeyMatch = line.match(/^\s{4}(\w+):\s*(.*)$/);
      if (premKeyMatch) {
        if (premiumField && premiumValue) item.premium[premiumField] = premiumValue.trim();
        premiumField = premKeyMatch[1];
        premiumValue = premKeyMatch[2].replace(/^['"]|['"]$/g, '');
        continue;
      }
      // Continuation of premium multiline
      if (premiumField && line.match(/^\s{6}/)) {
        premiumValue += '\n' + line.trim();
        continue;
      }
    }

    // YAML literal block scalar start: e.g. "  command: |" — content lines
    // are indented MORE than the key. Handles | |- |+ (we strip trailing newlines).
    const blockStart = line.match(/^(\s+)(\w+):\s*\|[+-]?\s*$/);
    if (blockStart && !inPremium) {
      if (currentField && multiLineValue) item[currentField] = multiLineValue.replace(/\n+$/, '');
      currentField = blockStart[2];
      multiLineValue = '';
      blockIndent = blockStart[1].length + 2; // content is at least 2 more spaces
      inBlockScalar = true;
      continue;
    }

    // Inside a block scalar: collect lines until we hit a less-indented line
    if (inBlockScalar) {
      if (line.trim() === '') {
        multiLineValue += (multiLineValue ? '\n' : '');
        continue;
      }
      const indent = (line.match(/^(\s*)/)[1] || '').length;
      if (indent >= blockIndent) {
        multiLineValue += (multiLineValue ? '\n' : '') + line.slice(blockIndent);
        continue;
      }
      // Block scalar ended — flush and fall through to normal processing
      item[currentField] = multiLineValue.replace(/\n+$/, '');
      currentField = null;
      multiLineValue = '';
      inBlockScalar = false;
      // do NOT continue — re-process this line below
    }

    // Multi-line field start (e.g. command: '...) — check BEFORE simple fields
    const multiStart = line.match(/^\s+(\w+):\s*'(.*)$/);
    if (multiStart && !inPremium && !multiStart[2].endsWith("'")) {
      if (currentField && multiLineValue) item[currentField] = multiLineValue.trim();
      currentField = multiStart[1];
      multiLineValue = multiStart[2];
      continue;
    }

    // Simple fields (including single-line quoted: key: 'value')
    const fieldMatch = line.match(/^\s+(\w+):\s*(.+)$/);
    if (fieldMatch && !inPremium) {
      if (currentField && multiLineValue) item[currentField] = multiLineValue.trim();
      currentField = null;
      multiLineValue = '';

      const key = fieldMatch[1];
      let val = fieldMatch[2].replace(/^['"]|['"]$/g, '').trim();
      item[key] = val;
      continue;
    }

    // Multi-line continuation
    if (currentField && !inPremium) {
      const trimmed = line.replace(/^\s{4}/, '');
      if (trimmed.endsWith("'")) {
        multiLineValue += '\n' + trimmed.slice(0, -1);
        item[currentField] = multiLineValue.trim();
        currentField = null;
        multiLineValue = '';
      } else {
        multiLineValue += '\n' + trimmed;
      }
    }
  }

  // Push last item
  if (item) {
    if (currentField && multiLineValue) {
      item[currentField] = inBlockScalar
        ? multiLineValue.replace(/\n+$/, '')
        : multiLineValue.trim();
    }
    if (inPremium && premiumField && premiumValue) {
      if (!item.premium) item.premium = {};
      item.premium[premiumField] = premiumValue.trim();
    }
    items.push(item);
  }

  return { platforms, categories, items };
}

/* ═══════════════════════════════════════════════════════════
 *  TIP PICKER — sequential with vendor variety
 * ═══════════════════════════════════════════════════════════ */

function pickNextTip(items, state) {
  // --force-id override
  if (FORCE_ID) {
    const forced = items.find(i => i.id === FORCE_ID);
    if (!forced) { console.error(`❌ Tip ID "${FORCE_ID}" not found`); process.exit(1); }
    return forced;
  }

  // Filter out already used tips in this round, AND tips that are not publishable
  // (must have a non-empty `command` so "The fix" code block is never empty).
  const isPublishable = (i) => typeof i.command === 'string' && i.command.trim().length > 0;
  const available = items.filter(i => !state.usedIds.includes(i.id) && isPublishable(i));

  if (available.length === 0) {
    // Safety: if no publishable tips exist at all, abort instead of looping forever
    const totalPublishable = items.filter(isPublishable).length;
    if (totalPublishable === 0) {
      console.error('❌ No publishable tips found (all items lack a non-empty `command` field). Aborting.');
      process.exit(1);
    }
    // New round
    console.log(`🔄 Round ${state.round} complete (${state.usedIds.length} tips). Starting round ${state.round + 1}`);
    state.usedIds = [];
    state.round++;
    return pickNextTip(items, state);
  }

  // Vendor variety: avoid same platform as last 3 tips
  const recentPlatforms = state.history.slice(-3).map(h => h.platform);
  const varied = available.filter(i => !recentPlatforms.includes(i.platform));
  const pool = varied.length > 0 ? varied : available;

  // Pick first from pool (sequential order from YAML)
  return pool[0];
}

/* ═══════════════════════════════════════════════════════════
 *  GEMINI AI — Generate LinkedIn Lockdown Tip post
 * ═══════════════════════════════════════════════════════════ */

async function generateWithGemini(tip, tipNumber, platforms, categories) {
  if (!GEMINI_API_KEY) return null;

  const platformName = platforms[tip.platform]?.name || tip.platform;
  const categoryName = categories[tip.category] || tip.category;
  const deepLink = `${SITE_URL}/hardening/#tip-${tip.id}`;

  // Extract the actual command (strip comments)
  const command = (tip.command || '').split('\n')
    .filter(l => l.trim() && !l.trim().startsWith('#'))
    .slice(0, 3)
    .join('\n');

  const attackPerspective = tip.premium?.attackPerspective || '';

  const prompt = `You are Shimi — a CISO with 20+ years in cybersecurity. You run Shimi's Cyber World (SCW), a threat intelligence community.

Write a LinkedIn "Lockdown Tip of the Day #${tipNumber}" post about this hardening recommendation.

═══ TIP DATA ═══
ID: ${tip.id}
Platform: ${platformName}
Category: ${categoryName}
Severity: ${tip.severity}
Title: ${tip.title}
Description: ${tip.description}
Reference: ${tip.reference || 'N/A'}
Command: ${command || 'N/A'}
Attack Perspective: ${attackPerspective}

═══ YOUR VOICE ═══
Write exactly like the posts on shimiscyberworld.com — you're a senior CISO sharing hard-won insight with your network.
- Open with a strong, specific hook. NOT generic ("here's a tip"). Start with WHY this matters — a real-world scenario, a breach it would have prevented, or a pattern you've seen.
- Short, punchy paragraphs. 1-3 sentences each. Break ideas with line breaks.
- Be opinionated and direct. Say "this is basic but most organizations still miss it" or "if you're not doing this, you're leaving the door open." Have a position.
- Include the actual command or configuration step — practitioners want to see the real action, not just theory.
- End with a clear, specific call to action pointing to the full check.
- Tone: confident, sharp, practical. Like a senior security pro briefing peers — not a vendor pitch.

═══ STRUCTURE ═══
Lockdown Tip of the Day #${tipNumber} — ${tip.title}

[Hook: 1-2 punchy lines about WHY this matters]

[2-3 short paragraphs: the problem, the fix, the impact. Include the actual command.]

[One clear action line]

Full check + implementation guide: ${deepLink}

📡 https://t.me/shimiscyberworld
#ShimisCyberWorld #cybersecurity #hardening

═══ HARD RULES ═══
1. First line MUST be exactly: Lockdown Tip of the Day #${tipNumber} — ${tip.title}
2. ZERO emojis ANYWHERE except the 📡 footer marker.
3. EXACTLY 3 hashtags on the last line: #ShimisCyberWorld #cybersecurity #hardening
4. Include the actual command/config — not just "configure this setting."
5. Plain text only — no markdown, no bold, no formatting.
6. NO "Bottom line", "TL;DR", "Key takeaway" labels.
7. NO product recommendations or affiliate links.
8. NEVER fabricate breach details or specific incidents you didn't witness.
9. You CAN reference general experience: "I've seen environments where...", "In my experience..."
10. Keep between 900-1400 characters total.
11. Do NOT start with "Hey network" or "Fellow CISOs" or any greeting.`;

  const RETRIES = 3;
  const DELAYS = [3000, 8000, 15000];

  for (let attempt = 0; attempt <= RETRIES; attempt++) {
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
              maxOutputTokens: 1200,
              thinkingConfig: { thinkingBudget: 0 },
            }
          })
        }
      );

      if (!res.ok) {
        if ([429, 500, 502, 503, 504].includes(res.status) && attempt < RETRIES) {
          console.warn(`⚠️  Gemini ${res.status} — retrying in ${DELAYS[attempt] / 1000}s (${attempt + 1}/${RETRIES})`);
          await new Promise(r => setTimeout(r, DELAYS[attempt]));
          continue;
        }
        console.warn(`⚠️  Gemini API ${res.status} — falling back to template`);
        return null;
      }

      const data = await res.json();
      const parts = data?.candidates?.[0]?.content?.parts || [];
      const generated = parts
        .filter(p => !p.thought && p.text)
        .map(p => p.text)
        .join('')
        .trim();

      if (!generated || generated.length < 200) {
        console.warn('⚠️  Gemini returned empty/short — falling back to template');
        return null;
      }

      let text = generated.trim();

      // Strip ALL emojis, then restore footer marker
      text = text.replace(/[\p{Extended_Pictographic}]/gu, '');
      text = text.replace(/^[ \t]*(Daily updates:?\s*)?(?=https?:\/\/t\.me)/m, '📡 ');

      // Ensure footer links
      if (!text.includes('t.me/shimiscyberworld')) {
        text += `\n📡 https://t.me/shimiscyberworld`;
      }
      if (!text.includes(deepLink)) {
        text = text.replace(/📡/, `Full check + implementation guide: ${deepLink}\n\n📡`);
      }
      if (!text.includes('#ShimisCyberWorld')) {
        text += '\n#ShimisCyberWorld #cybersecurity #hardening';
      }

      // Ensure first line is the series title
      const expectedTitle = `Lockdown Tip of the Day #${tipNumber}`;
      if (!text.startsWith(expectedTitle)) {
        text = `${expectedTitle} — ${tip.title}\n\n${text}`;
      }

      // Clean up
      text = text.replace(/\n{3,}/g, '\n\n').trim();

      // Enforce max length
      if (text.length > 1800) {
        const lines = text.split('\n');
        const footerIdx = lines.findIndex(l => l.includes('Full check') || l.startsWith('📡'));
        if (footerIdx > 2) {
          const header = lines.slice(0, 2).join('\n');
          const footer = lines.slice(footerIdx).join('\n');
          let body = lines.slice(2, footerIdx).filter(l => l.trim());
          while (body.length > 1 && (header + '\n\n' + body.join('\n\n') + '\n\n' + footer).length > 1600) {
            body.pop();
          }
          text = header + '\n\n' + body.join('\n\n') + '\n\n' + footer;
        }
      }

      return text;
    } catch (err) {
      if (attempt < RETRIES) {
        console.warn(`⚠️  Gemini error: ${err.message} — retrying (${attempt + 1}/${RETRIES})`);
        await new Promise(r => setTimeout(r, DELAYS[attempt]));
        continue;
      }
      console.warn(`⚠️  Gemini failed after retries: ${err.message}`);
      return null;
    }
  }
  return null;
}

/* ═══════════════════════════════════════════════════════════
 *  TEMPLATE FALLBACK — deterministic, no AI needed
 * ═══════════════════════════════════════════════════════════ */

function formatTemplateTip(tip, tipNumber, platforms, categories) {
  const platformName = platforms[tip.platform]?.name || tip.platform;
  const deepLink = `${SITE_URL}/hardening/#tip-${tip.id}`;

  // Extract clean command
  const command = (tip.command || '').split('\n')
    .filter(l => l.trim() && !l.trim().startsWith('#'))
    .slice(0, 4)
    .join('\n');

  const severity = (tip.severity || 'medium').toUpperCase();
  const severityNote = severity === 'CRITICAL' ? 'This is a critical check.' : '';

  let text = `Lockdown Tip of the Day #${tipNumber} — ${tip.title}

${tip.description}${severityNote ? ' ' + severityNote : ''}`;

  if (command) {
    text += `\n\n${command}`;
  }

  if (tip.reference) {
    text += `\n\nReference: ${tip.reference}`;
  }

  text += `\n\nFull check + implementation guide: ${deepLink}`;
  text += `\n\n📡 https://t.me/shimiscyberworld`;
  text += `\n#ShimisCyberWorld #cybersecurity #hardening`;

  return text.replace(/\n{3,}/g, '\n\n').trim();
}

/* ═══════════════════════════════════════════════════════════
 *  LOCKDOWN IMAGE — pick from dedicated folder
 * ═══════════════════════════════════════════════════════════ */

async function pickLockdownImage() {
  const dir = 'pool/lockdown';
  try {
    // Try with auth first; fall back to no-auth (repo is public)
    const headers = { 'User-Agent': 'SCW-Lockdown' };
    if (GH_IMAGES_PAT) headers.Authorization = `token ${GH_IMAGES_PAT}`;

    let res = await fetch(`https://api.github.com/repos/${IMAGES_REPO}/contents/${dir}`, { headers });
    if (!res.ok && GH_IMAGES_PAT) {
      console.warn(`⚠️  Auth token returned ${res.status} — retrying without auth`);
      delete headers.Authorization;
      res = await fetch(`https://api.github.com/repos/${IMAGES_REPO}/contents/${dir}`, { headers });
    }
    if (!res.ok) {
      console.warn(`⚠️  No lockdown image folder (${res.status}) — text-only post`);
      return null;
    }
    const files = await res.json();
    const images = files.filter(f => f.name.endsWith('.png') || f.name.endsWith('.jpg'));
    if (images.length === 0) {
      console.warn('⚠️  No images in pool/lockdown/ — text-only post');
      return null;
    }

    // Pick first image (single fixed image for the series)
    const pick = images[0];
    const imageUrl = `${IMAGES_BASE_URL}/${dir}/${pick.name}`;
    console.log(`🖼️  Lockdown image: ${dir}/${pick.name}`);

    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) return null;
    const arrayBuf = await imgRes.arrayBuffer();
    return { buffer: Buffer.from(arrayBuf), mimeType: 'image/png', filename: pick.name, url: imageUrl };
  } catch (err) {
    console.warn(`⚠️  Image fetch error: ${err.message}`);
    return null;
  }
}

/* ═══════════════════════════════════════════════════════════
 *  LINKEDIN API
 * ═══════════════════════════════════════════════════════════ */

async function uploadImageToLinkedIn(imageBuffer, mimeType) {
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

  if (!uploadUrl || !asset) throw new Error('Missing uploadUrl or asset');

  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': mimeType },
    body: imageBuffer,
  });

  if (!uploadRes.ok && uploadRes.status !== 201) {
    const err = await uploadRes.text();
    throw new Error(`LinkedIn image upload ${uploadRes.status}: ${err}`);
  }

  console.log(`📤 Image uploaded: ${asset}`);
  return asset;
}

async function postToLinkedIn(text, imageAsset) {
  const shareContent = { shareCommentary: { text } };

  if (imageAsset) {
    shareContent.shareMediaCategory = 'IMAGE';
    shareContent.media = [{ status: 'READY', media: imageAsset }];
  } else {
    shareContent.shareMediaCategory = 'NONE';
  }

  const payload = {
    author: PERSON_URN,
    lifecycleState: 'PUBLISHED',
    specificContent: { 'com.linkedin.ugc.ShareContent': shareContent },
    visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
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

  return (await res.json()).id;
}

/* ═══════════════════════════════════════════════════════════
 *  TELEGRAM — Post to channel
 * ═══════════════════════════════════════════════════════════ */

async function postToTelegram(text, imageUrl) {
  if (!TG_BOT_TOKEN || !TG_CHANNEL_ID) {
    console.log('⏭️  No TELEGRAM_BOT_TOKEN/CHANNEL_ID — skipping Telegram.');
    return null;
  }

  const baseUrl = `https://api.telegram.org/bot${TG_BOT_TOKEN}`;

  // Strip the redundant "📡 https://t.me/shimiscyberworld" channel-self link —
  // pointless inside a message that IS in that channel (clicking just reopens it).
  text = text
    .replace(/\n+📡 https?:\/\/t\.me\/shimiscyberworld\s*/gi, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  try {
    if (imageUrl) {
      // Build caption — Telegram sendPhoto limit is 1024 chars.
      // If text is too long, keep the link block + footer and trim the body middle.
      let caption = text;
      if (caption.length > 1024) {
        // Footer = link block (━━━…━━━ … ━━━…━━━) + channel + hashtags
        const footerMatch = caption.match(/\n+━{5,}[\s\S]*$/) || caption.match(/\n+📡 https?:\/\/t\.me\/[\s\S]*$/);
        const footer = footerMatch ? footerMatch[0] : '';
        const body = footer ? caption.slice(0, caption.length - footer.length) : caption;
        const maxBody = 1024 - footer.length - 4; // 4 for "\n..."
        caption = body.substring(0, maxBody) + '\n...' + footer;
      }

      // Send photo with caption (plain text — Telegram auto-linkifies URLs/hashtags)
      const res = await fetch(`${baseUrl}/sendPhoto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TG_CHANNEL_ID,
          photo: imageUrl,
          caption,
          disable_web_page_preview: false,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        // Photo caption too long — fall back to text-only with image as link
        console.warn(`⚠️  Telegram sendPhoto failed: ${data.description} — trying sendMessage`);
        return await sendTelegramText(baseUrl, text);
      }
      return data.result?.message_id;
    } else {
      return await sendTelegramText(baseUrl, text);
    }
  } catch (err) {
    console.warn(`⚠️  Telegram error: ${err.message}`);
    return null;
  }
}

async function sendTelegramText(baseUrl, text) {
  const res = await fetch(`${baseUrl}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TG_CHANNEL_ID,
      text,
      disable_web_page_preview: false,
    }),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.description);
  return data.result?.message_id;
}

/* ═══════════════════════════════════════════════════════════
 *  SITE PUBLISH — write _posts markdown, smoke-test, commit, push
 * ═══════════════════════════════════════════════════════════ */

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 60)
    .replace(/-+$/g, '');
}

function escapeYamlString(s) {
  // Wrap in double quotes and escape backslashes + double quotes
  return '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

function buildSitePostMarkdown({ tip, tipNumber, platforms, categories, aiText, imageUrl, isoDate }) {
  const platformName = platforms[tip.platform]?.name || tip.platform;
  const categoryName = categories[tip.category] || tip.category || '';
  const slug = `lockdown-${tip.id}`;
  const permalink = `/lockdown-lab/${slug}/`;
  const deepLink = `${SITE_URL}/hardening/#tip-${tip.id}`;

  // Convert the social post text into Markdown body.
  // Strip the trailing footer (deep-link line, channel link, hashtags) so the
  // page renders cleanly — those are presented separately by the layout.
  let body = (aiText || '').trim();
  body = body
    .replace(/\n+Full check[^\n]*\n?/i, '\n')
    .replace(/\n+📡 https?:\/\/t\.me\/[^\s]+\n?/g, '\n')
    .replace(/\n+#ShimisCyberWorld[^\n]*$/i, '')
    .trim();

  // Drop the duplicated H1 (first line is "Lockdown Tip of the Day #N — Title")
  // — the layout already renders the title.
  const lines = body.split('\n');
  if (lines[0] && /^Lockdown Tip of the Day/i.test(lines[0])) {
    lines.shift();
    while (lines.length && lines[0].trim() === '') lines.shift();
  }
  body = lines.join('\n').trim();

  // Build the markdown body with tip metadata and command block
  let md = body + '\n';

  if (tip.command) {
    const command = String(tip.command).trim();
    md += `\n## The fix\n\n\`\`\`\n${command}\n\`\`\`\n`;
  }

  if (tip.reference) {
    // Wrap URLs in `<...>` so kramdown autolinks them as clickable links.
    const refStr = String(tip.reference).trim();
    const refRendered = /^https?:\/\//.test(refStr) ? `<${refStr}>` : refStr;
    md += `\n**Reference:** ${refRendered}\n`;
  }

  // Front matter
  const fm = [];
  fm.push('---');
  fm.push(`title: ${escapeYamlString(tip.title)}`);
  fm.push(`date: ${isoDate}`);
  fm.push(`permalink: ${permalink}`);
  fm.push(`layout: lockdown`);
  fm.push(`section: lockdown`);
  fm.push(`channel: "Lockdown Lab"`);
  fm.push(`author: shimi-cohen`);
  fm.push(`lockdown_id: ${tip.id}`);
  fm.push(`lockdown_number: ${tipNumber}`);
  fm.push(`platform: ${escapeYamlString(tip.platform || '')}`);
  fm.push(`platform_name: ${escapeYamlString(platformName)}`);
  fm.push(`category: ${escapeYamlString(tip.category || '')}`);
  fm.push(`category_name: ${escapeYamlString(categoryName)}`);
  fm.push(`severity: ${escapeYamlString(tip.severity || 'medium')}`);
  fm.push(`tags: [lockdown-lab, hardening, ${tip.platform || 'security'}, ${tip.category || 'security'}]`);
  if (imageUrl) fm.push(`image: ${escapeYamlString(imageUrl)}`);

  // Build a clean summary from the body (first 200 chars, no markdown)
  const summarySrc = body.replace(/```[\s\S]*?```/g, '').replace(/[#*_`>]/g, '').replace(/\s+/g, ' ').trim();
  const summary = summarySrc.length > 220 ? summarySrc.substring(0, 217) + '...' : summarySrc;
  fm.push(`summary: ${escapeYamlString(summary)}`);
  fm.push(`hardening_url: ${escapeYamlString(deepLink)}`);
  fm.push('---');
  fm.push('');

  return fm.join('\n') + md;
}

function writeSitePost({ tip, tipNumber, platforms, categories, aiText, imageUrl }) {
  const now = new Date();
  const isoDate = now.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, ' +0000');
  const dateStr = now.toISOString().substring(0, 10);
  const filename = `${dateStr}-lockdown-${tip.id}.md`;
  const filepath = path.join(POSTS_DIR, filename);
  const content = buildSitePostMarkdown({ tip, tipNumber, platforms, categories, aiText, imageUrl, isoDate });
  fs.writeFileSync(filepath, content, 'utf8');
  return { filepath, filename, slug: `lockdown-${tip.id}`, postUrl: `${SITE_URL}/lockdown-lab/lockdown-${tip.id}/` };
}

function jekyllSmokeTest() {
  console.log('🧪 Running Jekyll smoke test...');
  try {
    execSync('bundle exec jekyll build --quiet', { stdio: 'inherit', cwd: ROOT });
    console.log('✅ Jekyll build OK');
    return true;
  } catch (err) {
    console.error(`❌ Jekyll build FAILED: ${err.message}`);
    return false;
  }
}

function commitAndPushSitePost(filepath, tip, tipNumber) {
  console.log('📝 Committing site post...');
  try {
    // Configure git identity if missing (CI safety)
    try { execSync('git config user.name', { stdio: 'pipe', cwd: ROOT }); }
    catch { execSync('git config user.name "SCW Feed Bot"', { cwd: ROOT }); }
    try { execSync('git config user.email', { stdio: 'pipe', cwd: ROOT }); }
    catch { execSync('git config user.email "shimicyberworld@gmail.com"', { cwd: ROOT }); }

    execSync(`git add "${filepath}"`, { stdio: 'inherit', cwd: ROOT });
    const msg = `feat(lockdown-lab): publish #${tipNumber} ${tip.id} — ${tip.title.replace(/"/g, "'")}`;
    execSync(`git commit -m "${msg}"`, { stdio: 'inherit', cwd: ROOT });
    execSync('git pull --rebase --autostash origin main || true', { stdio: 'inherit', cwd: ROOT });
    execSync('git push origin HEAD:main', { stdio: 'inherit', cwd: ROOT });
    console.log('✅ Pushed to main');
    return true;
  } catch (err) {
    console.error(`❌ git commit/push failed: ${err.message}`);
    return false;
  }
}

async function waitForLive(url, { maxSeconds = 300, intervalSeconds = 15 } = {}) {
  console.log(`⏳ Waiting for ${url} to go live...`);
  const deadline = Date.now() + maxSeconds * 1000;
  let attempt = 0;
  while (Date.now() < deadline) {
    attempt++;
    try {
      const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
      if (res.ok) {
        console.log(`✅ Live after ${attempt} check(s) (status ${res.status})`);
        return true;
      }
      console.log(`   [${attempt}] status=${res.status}, retrying in ${intervalSeconds}s`);
    } catch (err) {
      console.log(`   [${attempt}] fetch error: ${err.message}`);
    }
    await new Promise(r => setTimeout(r, intervalSeconds * 1000));
  }
  console.warn(`⚠️  Timeout: ${url} did not return 200 within ${maxSeconds}s — proceeding anyway`);
  return false;
}

function rewriteTextWithSitePostUrl(text, postUrl) {
  // Replace the AI-generated "Full check + implementation guide: <hardening-deeplink>"
  // line with a single, verified site-post URL. Drop the secondary "interactive checklist"
  // link — the site post page IS the breakdown, and the old `/hardening/#tip-X` anchor
  // does not exist on the page (causes silent broken links in social posts).
  if (!postUrl) return text;
  const fullCheckRegex = /Full check \+ implementation guide:\s*\S+/i;
  const block = `━━━━━━━━━━━━━━━━━━━━\n🌐 Full breakdown:\n${postUrl}\n━━━━━━━━━━━━━━━━━━━━`;
  if (fullCheckRegex.test(text)) {
    text = text.replace(fullCheckRegex, block);
  } else {
    const channelIdx = text.indexOf('📡 https://t.me');
    if (channelIdx >= 0) {
      text = text.slice(0, channelIdx) + block + '\n\n' + text.slice(channelIdx);
    } else {
      text += `\n\n${block}`;
    }
  }
  // Defense-in-depth: strip any remaining /hardening/#tip-* deep links that AI may have re-injected
  text = text.replace(/https?:\/\/[^\s)]*\/hardening\/#tip-[^\s)]+/gi, postUrl);
  return text;
}

/* ═══════════════════════════════════════════════════════════
 *  LINK VALIDATOR — abort post if any URL is broken
 * ═══════════════════════════════════════════════════════════ */

async function validateLinks(text, { context = 'post' } = {}) {
  const urls = Array.from(new Set(
    (text.match(/https?:\/\/[^\s)\]<>"']+/g) || [])
      .map(u => u.replace(/[.,;:!?]+$/, '')) // strip trailing punctuation
  ));
  if (urls.length === 0) return { ok: true, broken: [] };

  console.log(`🔗 Validating ${urls.length} link(s) in ${context}...`);
  const broken = [];
  for (const url of urls) {
    try {
      const u = new URL(url);
      const fragment = u.hash ? u.hash.slice(1) : '';
      const baseUrl = u.origin + u.pathname + u.search;

      // HEAD first; if 405/403, fall back to GET
      let res = await fetch(baseUrl, { method: 'HEAD', redirect: 'follow' });
      if (!res.ok && [403, 405, 501].includes(res.status)) {
        res = await fetch(baseUrl, { method: 'GET', redirect: 'follow' });
      }
      if (!res.ok) {
        broken.push({ url, reason: `HTTP ${res.status}` });
        continue;
      }

      // Anchor check: if URL has #fragment, fetch HTML and verify id="<fragment>" exists
      if (fragment) {
        const htmlRes = await fetch(baseUrl, { redirect: 'follow' });
        const html = await htmlRes.text();
        const anchorRegex = new RegExp(`(?:id|name)=["']${fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i');
        if (!anchorRegex.test(html)) {
          broken.push({ url, reason: `anchor #${fragment} not found on page` });
          continue;
        }
      }
      console.log(`   ✓ ${url}`);
    } catch (err) {
      broken.push({ url, reason: err.message });
    }
  }

  if (broken.length > 0) {
    console.error(`❌ ${broken.length} broken link(s) detected:`);
    broken.forEach(b => console.error(`   ✗ ${b.url} — ${b.reason}`));
    return { ok: false, broken };
  }
  console.log(`✅ All ${urls.length} link(s) valid`);
  return { ok: true, broken: [] };
}

/* ═══════════════════════════════════════════════════════════
 *  MAIN
 * ═══════════════════════════════════════════════════════════ */

async function main() {
  if (!DRY_RUN && !PREVIEW && (!TOKEN || !PERSON_URN)) {
    console.error('❌ Missing LINKEDIN_ACCESS_TOKEN or LINKEDIN_PERSON_URN');
    process.exit(1);
  }

  console.log('📦 Loading hardening data...');
  const { platforms, categories, items } = parseHardeningYml();
  console.log(`   ${items.length} tips, ${Object.keys(platforms).length} platforms`);

  const state = loadState();
  const tip = pickNextTip(items, state);
  const tipNumber = state.tipNumber + 1;
  const platformName = platforms[tip.platform]?.name || tip.platform;

  console.log(`🎯 Tip #${tipNumber}: [${tip.id}] ${tip.title} (${platformName}, ${tip.severity})`);

  // Generate post text
  let text;
  const aiText = await generateWithGemini(tip, tipNumber, platforms, categories);
  if (aiText) {
    text = aiText;
    console.log('🤖 Using Gemini-generated post');
  } else {
    text = formatTemplateTip(tip, tipNumber, platforms, categories);
    console.log('📋 Using template fallback');
  }

  console.log(`\n--- Lockdown Tip Preview (${text.length} chars) ---\n${text}\n---\n`);

  if (PREVIEW) {
    console.log('👀 Preview mode — not posting.');
    process.exit(0);
  }

  if (DRY_RUN) {
    console.log('🧪 Dry run — not posting. State would update to:');
    console.log(`   tipNumber: ${tipNumber}, usedIds: +${tip.id}, round: ${state.round}`);
    process.exit(0);
  }

  // Pick image FIRST — needed for both the site post front matter and LinkedIn upload
  const imageData = await pickLockdownImage();

  // ── SITE PUBLISH (site-first flow) ───────────────────────
  // Write _posts/ markdown → Jekyll smoke test → commit & push → wait for live.
  // If anything fails AND PUBLISH_TO_SITE is true, abort before social posts so
  // we don't end up with broken "Read the full breakdown" links.
  let siteUrl = null;
  const wantSite = PUBLISH_TO_SITE && !SKIP_SITE;
  if (wantSite) {
    console.log('\n📝 Publishing to website (site-first flow)...');
    const sitePost = writeSitePost({
      tip, tipNumber, platforms, categories, aiText: text, imageUrl: imageData?.url || null,
    });
    console.log(`   wrote ${sitePost.filename}`);

    if (!jekyllSmokeTest()) {
      console.error('❌ Jekyll smoke test failed — removing site post and aborting');
      try { fs.unlinkSync(sitePost.filepath); } catch {}
      process.exit(1);
    }
    console.log('   ✓ Jekyll build OK');

    if (!commitAndPushSitePost(sitePost.filepath, tip, tipNumber)) {
      console.error('❌ Git commit/push failed — aborting before social posts');
      process.exit(1);
    }
    console.log('   ✓ committed & pushed');

    const live = await waitForLive(sitePost.postUrl);
    if (!live) {
      console.error(`❌ Site post never went live: ${sitePost.postUrl} — aborting`);
      process.exit(1);
    }
    siteUrl = sitePost.postUrl;
    console.log(`   ✓ live at ${siteUrl}`);

    // Rewrite the social text so the primary CTA points at the site post,
    // with the hardening checklist as the secondary deep-link.
    text = rewriteTextWithSitePostUrl(text, siteUrl);
    console.log('   ✓ rewrote social text with site URL as primary CTA');
  } else {
    // No site publish — at minimum strip the broken /hardening/#tip-X deep link
    text = text.replace(/https?:\/\/[^\s)]*\/hardening\/#tip-[^\s)]+/gi, `${SITE_URL}/lockdown-lab/`);
  }

  // ── LINK VALIDATION (gate before any social post) ──
  const linkCheck = await validateLinks(text, { context: 'social post' });
  if (!linkCheck.ok) {
    console.error('❌ Aborting social posts — broken links detected. Fix the post template or content.');
    if (siteUrl) {
      console.error(`   ℹ️  Site post is already live at ${siteUrl} — only social posting was skipped.`);
    }
    process.exit(1);
  }

  // Upload image to LinkedIn (after site post so the social text is final)
  let imageAsset = null;
  if (imageData) {
    try {
      imageAsset = await uploadImageToLinkedIn(imageData.buffer, imageData.mimeType);
    } catch (err) {
      console.warn(`⚠️  Image upload failed: ${err.message} — posting text-only`);
    }
  }

  // Post to LinkedIn
  const postId = await postToLinkedIn(text, imageAsset);
  console.log(`✅ Posted Lockdown Tip #${tipNumber}${imageAsset ? ' (with image)' : ' (text-only)'}: ${postId}`);

  // Post to Telegram
  const tgMsgId = await postToTelegram(text, imageData?.url || null);
  if (tgMsgId) {
    console.log(`✅ Telegram message: ${tgMsgId}`);
  }

  // Update state
  state.tipNumber = tipNumber;
  state.usedIds.push(tip.id);
  state.history.push({
    tipNumber,
    id: tip.id,
    platform: tip.platform,
    title: tip.title,
    date: new Date().toISOString(),
    linkedInId: postId,
    telegramMsgId: tgMsgId || null,
    siteUrl: siteUrl || null,
  });
  // Keep history manageable
  if (state.history.length > 100) {
    state.history = state.history.slice(-100);
  }
  saveState(state);

  console.log('📊 State updated.');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
