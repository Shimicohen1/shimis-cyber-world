/**
 * INCD Scraper — GitHub Actions script
 *
 * Uses Playwright to bypass Cloudflare and fetch publications from
 * Israel National Cyber Directorate (INCD) via gov.il.
 * Translates Hebrew → English via Gemini, builds Jekyll posts.
 *
 * Run: node .github/scripts/incd-scraper.mjs
 */

import { chromium as playwrightChromium } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Apply stealth plugin to bypass Cloudflare
playwrightChromium.use(StealthPlugin());

// ── Sigma Rule Generation (inline, mirrors sigma-generator.js logic) ──
const sigmaTemplates = JSON.parse(fs.readFileSync(path.join(__dirname, "sigma-templates.json"), "utf-8"));

function interpolateSigma(str, vars) {
  if (!str) return str;
  return str
    .replace(/\{org_name\}/g, vars.org_name || "Target System")
    .replace(/\{org_domain\}/g, vars.org_domain || "target.local")
    .replace(/\{cve_id\}/g, vars.cve_id || "CVE-XXXX-XXXXX")
    .replace(/\{indicator\}/g, vars.indicator || "")
    .replace(/\{event_type\}/g, vars.event_type || "incident");
}

function buildSigmaYaml(rule, vars, postUrl) {
  const title = interpolateSigma(rule.title, vars);
  const description = interpolateSigma(rule.description, vars);
  const detection = interpolateSigma(rule.detection, vars);
  const ls = rule.logsource || {};
  const logsourceParts = [];
  if (ls.category) logsourceParts.push(`    category: ${ls.category}`);
  if (ls.product) logsourceParts.push(`    product: ${ls.product}`);
  if (ls.service) logsourceParts.push(`    service: ${ls.service}`);
  const tags = [];
  if (vars.tactic) tags.push(`  - attack.${vars.tactic.toLowerCase().replace(/ /g, "_")}`);
  if (vars.technique_id) tags.push(`  - attack.${vars.technique_id.toLowerCase()}`);
  return [
    `title: ${title}`, `id: scw-${vars.rule_id}`, `status: experimental`, `level: ${rule.level}`,
    `description: |\n  ${description}`, `author: SCW Feed Engine (auto-generated)`,
    `date: ${vars.post_date || new Date().toISOString().split("T")[0]}`,
    `references:\n  - ${postUrl || "https://shimiscyberworld.com"}`,
    tags.length > 0 ? `tags:\n${tags.join("\n")}` : null,
    `logsource:\n${logsourceParts.join("\n")}`,
    `detection:\n  ${detection.split("\n").join("\n  ")}`,
    `falsepositives:\n  - Legitimate activity from ${vars.org_name || "the affected organization"}`,
  ].filter(Boolean).join("\n");
}

function generateSigmaForIncd(postData, postUrl) {
  const mitreList = postData.mitre_attack || [];
  const primaryIoc = (postData.iocs || [])[0] || {};
  const postDate = postData.date || new Date().toISOString().split("T")[0];
  const orgName = postData.title?.replace(/^["🚨⚠️🔴]+\s*/g, "").substring(0, 60) || "INCD Advisory";
  const baseVars = {
    org_name: orgName, org_domain: "", cve_id: primaryIoc.id || "",
    indicator: primaryIoc.indicator || primaryIoc.id || "",
    event_type: "vulnerability", post_date: postDate,
  };
  const rules = [];
  let counter = 0;
  for (const mitre of mitreList) {
    const techId = mitre.id || "";
    const techTemplates = sigmaTemplates.techniques[techId];
    if (!techTemplates) continue;
    for (const rule of techTemplates.rules) {
      counter++;
      const vars = { ...baseVars, tactic: mitre.tactic || techTemplates.tactic, technique_id: techId, rule_id: `${postDate}-${counter}` };
      const yaml = buildSigmaYaml(rule, vars, postUrl);
      rules.push({ title: interpolateSigma(rule.title, vars), level: rule.level, tier: rule.tier, technique: techId, tactic: mitre.tactic || techTemplates.tactic, yaml });
    }
  }
  return rules;
}

function sigmaFrontmatter(rules, slug) {
  if (!rules || rules.length === 0) return "";
  const freeRule = rules.find(r => r.tier === "free");
  let yaml = "sigma_rules:\n";
  yaml += `  count: ${rules.length}\n`;
  yaml += `  free_count: ${rules.filter(r => r.tier === "free").length}\n`;
  yaml += `  paid_count: ${rules.filter(r => r.tier === "paid").length}\n`;
  if (freeRule) {
    yaml += `  preview_title: "${yamlSafe(freeRule.title)}"\n`;
    yaml += `  preview_level: "${freeRule.level}"\n`;
    yaml += `  preview_technique: "${yamlSafe(freeRule.technique)}"\n`;
    yaml += `  preview_tactic: "${yamlSafe(freeRule.tactic)}"\n`;
    if (freeRule.yaml) {
      yaml += `  preview_yaml_b64: "${Buffer.from(freeRule.yaml, "utf-8").toString("base64")}"\n`;
    }
  }
  return yaml;
}

// ── Constants ────────────────────────────────────────────
const INCD_PAGE_URL =
  "https://www.gov.il/he/collectors/publications?officeId=4bcc13f5-fed6-4b8c-b8ee-7bf4a6bc81c8";
const INCD_API_URL =
  "https://www.gov.il/CollectorsWebApi/api/DataCollector/GetResults?" +
  "CollectorType=reports&CollectorType=rfp&CollectorType=drushim&CollectorType=publicsharing" +
  "&officeId=4bcc13f5-fed6-4b8c-b8ee-7bf4a6bc81c8&culture=he";
const INCD_BASE_URL = "https://www.gov.il";

const STATE_FILE = path.join(process.cwd(), ".github", "incd-state.json");
const POSTS_DIR = path.join(process.cwd(), "_posts");
const MAX_NEW_PER_RUN = 5;
const CVE_RE = /CVE-\d{4}-\d{4,}/gi;

// ── Image Pool — AI-generated (from scw-post-images repo) + Unsplash fallback ──

const IMAGES_REPO_API = "https://api.github.com/repos/Shimicohen1/scw-post-images/contents/linkedin";
const IMAGES_BASE_URL = "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/linkedin";
const AI_IMAGE_THRESHOLD = 50; // Use only AI images once we have this many

const UNSPLASH_BASE = "https://images.unsplash.com";
const UNSPLASH_PARAMS = "w=800&h=400&fit=crop&auto=format&q=80";

// AI image list — populated at startup by loadAiImagePool()
let aiImagePool = [];

const imagePools = {
  threats: [
    "photo-1770159116807-9b2a7bb82294", "photo-1771061863061-8ffdddb28098",
    "photo-1596457233038-45a990575b2e", "photo-1562813733-b31f71025d54",
    "photo-1760199789455-49098afd02f0", "photo-1591439657848-9f4b9ce436b9",
    "photo-1760199789463-b523db55dd8b", "photo-1765299856473-abaac2f1aa70",
    "photo-1666615435088-4865bf5ed3fd", "photo-1519575706483-221027bfbb31",
    "photo-1614064641938-3bbee52942c7", "photo-1618060932014-4deda4932554",
    "photo-1620825937374-87fc7d6bddc2", "photo-1582266255765-fa5cf1a1d501",
    "photo-1642783327704-2500e96fe3d9", "photo-1678811326980-ea1b88cd9e8c",
    "photo-1510511459019-5dda7724fd87", "photo-1489875347897-49f64b51c1f8",
  ],
  intelligence: [
    "photo-1680992046626-418f7e910589", "photo-1691435828932-911a7801adfb",
    "photo-1680992044138-ce4864c2b962", "photo-1680992046615-065f58bcb4d8",
    "photo-1680992045563-2ab442f3feee", "photo-1573164713988-8665fc963095",
    "photo-1558494949-ef010cbdcc31", "photo-1555949963-ff9fe0c870eb",
    "photo-1580106815433-a5b1d1d53d85", "photo-1683322499436-f4383dd59f5a",
    "photo-1695668548342-c0c1ad479aee", "photo-1682559736721-c2e77ff4c650",
    "photo-1506399558188-acca6f8cbf41",
  ],
  news: [
    "photo-1608742213509-815b97c30b36", "photo-1550751827-4bd374c3f58b",
    "photo-1487058792275-0ad4aaf24ca7", "photo-1579397256979-cc326aefe273",
    "photo-1642133516482-e99ea85011b3", "photo-1558459654-c430be5b0a44",
    "photo-1548092372-0d1bd40894a3", "photo-1614064548237-096f735f344f",
    "photo-1632910138458-5bf601f3835e", "photo-1597733336794-12d05021d510",
    "photo-1542903660-eedba2cda473", "photo-1653387137517-fbc54d488ed8",
    "photo-1653387300291-bfa1eeb90e16", "photo-1542831371-29b0f74f9713",
    "photo-1563206767-5b18f218e8de", "photo-1504639725590-34d0984388bd",
    "photo-1523961131990-5ea7c61b2107", "photo-1451187580459-43490279c0fa",
  ],
};

async function loadAiImagePool() {
  try {
    const res = await fetch(IMAGES_REPO_API);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const files = await res.json();
    aiImagePool = files
      .filter(f => f.name.endsWith('.png'))
      .map(f => `${IMAGES_BASE_URL}/${f.name}`);
    console.log(`🖼️  AI image pool: ${aiImagePool.length} images (threshold: ${AI_IMAGE_THRESHOLD})`);
  } catch (err) {
    console.warn(`⚠️  Could not load AI image pool: ${err.message} — using Unsplash`);
    aiImagePool = [];
  }
}

function pickCoverImage(tags) {
  // If we have enough AI images, use them exclusively
  if (aiImagePool.length >= AI_IMAGE_THRESHOLD) {
    return aiImagePool[Math.floor(Math.random() * aiImagePool.length)];
  }

  // Fallback to Unsplash pools by tag category
  const tagStr = tags.join(" ");
  let pool;
  if (/vulnerability|cve|exploit|zero.?day/.test(tagStr)) pool = imagePools.threats;
  else if (/threat-intel|advisory|alert|israel/.test(tagStr)) pool = imagePools.intelligence;
  else pool = imagePools.news;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  return `${UNSPLASH_BASE}/${pick}?${UNSPLASH_PARAMS}`;
}

// ── State Management ────────────────────────────────────

function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
    }
  } catch (err) {
    console.error(`[STATE] Failed to load: ${err.message}`);
  }
  return { publishedUrls: [], lastChecked: null };
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n");
}

// ── Gemini Translation ──────────────────────────────────

let lastGeminiCall = 0;

async function translateAndRewrite(hebrewTitle, hebrewDescription, sourceUrl, pubType) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log("[GEMINI] No API key — skipping translation");
    return null;
  }

  const model = "gemini-2.5-flash-lite";

  const prompt = `You are the editorial voice of Shimi's Cyber World — a sharp cybersecurity publication.

Translate this Hebrew cybersecurity advisory from the Israel National Cyber Directorate (INCD) into English, and rewrite it as a professional advisory article.

RULES:
- Output MUST be entirely in English
- Write from SCW's third-person editorial perspective
- Attribute findings to "Israel National Cyber Directorate (INCD)"
- Be concise, precise, and actionable
- Never invent facts
- Never use emojis in the body text
- Keep the title punchy (max 12 words)

HEBREW TITLE: ${hebrewTitle}

HEBREW DESCRIPTION: ${hebrewDescription}

SOURCE TYPE: ${pubType}
SOURCE URL: ${sourceUrl}

Return ONLY valid JSON:
{
  "title": "Short punchy English title (max 12 words)",
  "body": "The rewritten article body (2-4 paragraphs, markdown allowed)",
  "why_it_matters": "One specific, actionable recommendation for security professionals"
}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const requestBody = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 4096,
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 0 },
    },
  };

  try {
    // Throttle
    const elapsed = Date.now() - lastGeminiCall;
    if (elapsed < 1200) await new Promise((r) => setTimeout(r, 1200 - elapsed));
    lastGeminiCall = Date.now();

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!response.ok) {
      console.warn(`[GEMINI] Error ${response.status}`);
      return null;
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;

    const parsed = JSON.parse(text);
    if (!parsed.title || !parsed.body) return null;
    return parsed;
  } catch (err) {
    console.error(`[GEMINI] Translation failed: ${err.message}`);
    return null;
  }
}

// ── IOC Extraction via Gemini ───────────────────────────

async function extractIOCs(text) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !text || text.length < 50) return [];

  const prompt = `You are a CVE/vulnerability analyst. Extract IOCs from this cybersecurity advisory.

Return ONLY valid JSON:
{
  "iocs": [
    { "id": "CVE-XXXX-XXXXX or advisory-id", "type": "vulnerability category", "indicator": "specific technical indicator" }
  ]
}

Rules:
- "type": RCE, XSS, SQLi, Path Traversal, SSRF, Auth Bypass, Privilege Escalation, DoS, Buffer Overflow, Deserialization, or similar
- "indicator": affected software, version, CWE, vulnerable component
- Max 5 entries. Do not guess.

TEXT:
${text.substring(0, 2000)}`;

  try {
    const elapsed = Date.now() - lastGeminiCall;
    if (elapsed < 1200) await new Promise((r) => setTimeout(r, 1200 - elapsed));
    lastGeminiCall = Date.now();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 1024, responseMimeType: "application/json", thinkingConfig: { thinkingBudget: 0 } },
        }),
      }
    );

    if (!response.ok) return [];
    const data = await response.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return (parsed.iocs || []).filter((i) => i.id && i.type && i.indicator);
  } catch {
    return [];
  }
}

// ── MITRE ATT&CK Mapping via Gemini ─────────────────────

async function mapToMitreAttack(text, tags = []) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !text || text.trim().length < 20) return [];

  const prompt = `You are a MITRE ATT&CK analyst. Given the following cybersecurity advisory description, identify the most relevant MITRE ATT&CK Enterprise techniques.

RULES:
- Return 1 to 3 techniques maximum — only the most directly relevant
- Each technique must be a real ATT&CK technique with correct ID (e.g., T1190, T1059.001)
- Use the correct tactic name (e.g., Initial Access, Execution, Privilege Escalation, etc.)
- The URL must follow the pattern: https://attack.mitre.org/techniques/TXXXX/ (with /XXX/ for sub-techniques)
- If no technique clearly applies, return an empty array
- Do NOT guess or hallucinate technique IDs

DESCRIPTION:
${text.substring(0, 2000)}

TAGS: ${tags.join(", ")}

Return ONLY valid JSON array:
[
  { "id": "T1190", "name": "Exploit Public-Facing Application", "tactic": "Initial Access", "url": "https://attack.mitre.org/techniques/T1190/" }
]`;

  try {
    const elapsed = Date.now() - lastGeminiCall;
    if (elapsed < 1200) await new Promise((r) => setTimeout(r, 1200 - elapsed));
    lastGeminiCall = Date.now();

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 1024, responseMimeType: "application/json", thinkingConfig: { thinkingBudget: 0 } },
        }),
        signal: controller.signal,
      }
    );
    clearTimeout(timer);

    if (!response.ok) return [];
    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return [];

    const parsed = JSON.parse(rawText);
    if (!Array.isArray(parsed)) return [];

    const TECHNIQUE_RE = /^T\d{4}(\.\d{3})?$/;
    return parsed
      .filter((t) => t.id && t.name && t.tactic && TECHNIQUE_RE.test(t.id))
      .slice(0, 3)
      .map((t) => {
        const idParts = t.id.split(".");
        const url = idParts.length === 2
          ? `https://attack.mitre.org/techniques/${idParts[0]}/${idParts[1]}/`
          : `https://attack.mitre.org/techniques/${t.id}/`;
        return { id: t.id, name: String(t.name).substring(0, 100), tactic: String(t.tactic).substring(0, 50), url };
      });
  } catch {
    return [];
  }
}

// ── Classification ──────────────────────────────────────

function classifyPublication(title, description, pubType) {
  const combined = `${title} ${description}`;
  const cves = combined.match(CVE_RE) || [];

  if (cves.length > 0) {
    return { section: "vulnerability", score: "HIGH", cves };
  }

  const vulnKeywords = /פגיעות|פגיעויות|vulnerability|exploit|RCE|zero.?day|עדכון.*אבטחה|security update/i;
  if (pubType === "התרעות" && vulnKeywords.test(combined)) {
    return { section: "vulnerability", score: "HIGH", cves: [] };
  }

  return { section: "advisory", score: "MEDIUM", cves: [] };
}

// ── Attachment Fetching ─────────────────────────────────

async function fetchAttachments(page, pageUrl) {
  try {
    await page.goto(pageUrl, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.waitForTimeout(3000);

    return await page.evaluate(() => {
      return Array.from(document.querySelectorAll("a"))
        .filter((a) => a.href.includes("BlobFolder"))
        .map((a) => ({
          text: a.innerText.trim() || a.href.split(".").pop().toUpperCase(),
          href: a.href,
        }));
    });
  } catch (err) {
    console.warn(`[ATTACH] Failed for ${pageUrl}: ${err.message}`);
    return [];
  }
}

// ── Post Builder ────────────────────────────────────────

function yamlSafe(str) {
  if (!str) return "";
  return String(str)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ")
    .replace(/\r/g, "")
    .trim();
}

function buildPostMarkdown(pub, translated, attachments, iocs, mitreAttack) {
  const pubType = pub.tags?.promotedMetaData?.["סוג"]?.[0]?.title || "unknown";
  const dateStr = pub.tags?.metaData?.["תאריך פרסום"]?.[0]?.title || "";
  const sourceUrl = INCD_BASE_URL + pub.url;

  // Parse DD.MM.YYYY
  const dp = dateStr.match(/(\d{2})\.(\d{2})\.(\d{4})/);
  const pubDate = dp ? new Date(`${dp[3]}-${dp[2]}-${dp[1]}T12:00:00Z`) : new Date();
  const yyyy = pubDate.getFullYear();
  const mm = String(pubDate.getMonth() + 1).padStart(2, "0");
  const dd = String(pubDate.getDate()).padStart(2, "0");
  const isoDate = pubDate.toISOString().replace("T", " ").replace(/\.\d+Z/, " +0000");

  const title = translated?.title || pub.title;
  const body = translated?.body || pub.description;
  const whyItMatters = translated?.why_it_matters || "Review this advisory and assess your organization's exposure.";

  const classification = classifyPublication(pub.title, pub.description || "", pubType);
  const isVuln = classification.section === "vulnerability";

  // Tags
  const tags = ["incd", "israel"];
  if (isVuln) tags.push("vulnerability", "advisory");
  else tags.push("advisory");

  const typeMap = { "התרעות": "alert", "המלצות": "recommendation", "הנחיות": "guideline", "מדריכים": "guide" };
  const engType = typeMap[pubType] || "advisory";
  if (!tags.includes(engType)) tags.push(engType);

  if (classification.cves.length > 0 && !tags.includes("cve")) tags.push("cve");

  // Attachments section
  let attachmentSection = "";
  if (attachments.length > 0) {
    attachmentSection =
      "\n\n---\n\n**Attached Files:**\n" +
      attachments.map((a) => `- [${a.text}](${a.href})`).join("\n");
  }

  const fullBody =
    body + attachmentSection + `\n\n*Source: [Israel National Cyber Directorate (INCD)](${sourceUrl})*`;

  const slug = pub.url.split("/").pop() || `incd-${Date.now()}`;
  const msgId = slug.replace(/[^0-9]/g, "") || String(Date.now());

  // IOCs YAML
  let iocsYaml = "";
  if (iocs.length > 0) {
    iocsYaml =
      "iocs:\n" +
      iocs
        .map(
          (ioc) =>
            `  - id: "${yamlSafe(ioc.id)}"\n    type: "${yamlSafe(ioc.type)}"\n    indicator: "${yamlSafe(ioc.indicator)}"`
        )
        .join("\n") +
      "\n";
  }

  // Cover image — AI-generated pool or Unsplash fallback
  const coverImage = pickCoverImage(tags);

  // MITRE ATT&CK YAML
  let mitreYaml = "";
  if (mitreAttack && mitreAttack.length > 0) {
    mitreYaml =
      "mitre_attack:\n" +
      mitreAttack
        .map(
          (t) =>
            `  - id: "${yamlSafe(t.id)}"\n    name: "${yamlSafe(t.name)}"\n    tactic: "${yamlSafe(t.tactic)}"\n    url: "${yamlSafe(t.url)}"`
        )
        .join("\n") +
      "\n";
  }

  // Sigma detection rules
  let sigmaYaml = "";
  if (mitreAttack && mitreAttack.length > 0 && (iocs.length > 0 || isVuln)) {
    const postUrl = `https://shimiscyberworld.com/posts/incd-${slug}/`;
    const sigmaData = { title, iocs, mitre_attack: mitreAttack, date: `${yyyy}-${mm}-${dd}` };
    const allRules = generateSigmaForIncd(sigmaData, postUrl);
    if (allRules.length > 0) {
      sigmaYaml = sigmaFrontmatter(allRules, slug);
      console.log(`[INCD] 🛡️  Sigma: ${allRules.length} rules for ${slug} (${allRules.filter(r => r.tier === "free").length} free)`);
    }
  }

  const markdown = [
    "---",
    `title: "${yamlSafe(title)}"`,
    `date: ${isoDate}`,
    `source: INCD`,
    `source_name: "Israel National Cyber Directorate"`,
    `source_url: "${yamlSafe(sourceUrl)}"`,
    `channel: "INCD"`,
    `channel_id: "incd"`,
    `telegram_message_id: ${msgId}`,
    `tags: [${tags.join(", ")}]`,
    `excerpt: "${yamlSafe(title.substring(0, 180))}"`,
    `summary: "${yamlSafe((body || title).substring(0, 300))}"`,
    `layout: post`,
    `section: live-feed`,
    `score: ${classification.score}`,
    `curated: true`,
    `featured: false`,
    `priority: ${isVuln ? 85 : 70}`,
    `hidden: false`,
    `cover_image: "${coverImage}"`,
    `image: "${coverImage}"`,
    translated ? `ai_rewritten: true` : "",
    iocsYaml,
    mitreYaml,
    sigmaYaml,
    `why_it_matters:`,
    `  - "${yamlSafe(whyItMatters)}"`,
    "---",
    "",
    fullBody,
  ]
    .filter((l) => l !== "")
    .join("\n");

  const filename = `${yyyy}-${mm}-${dd}-incd-${slug}.md`;
  return { markdown, filename, title, slug, classification };
}

// ── Main ────────────────────────────────────────────────

async function main() {
  console.log("[INCD] Starting INCD publications scraper...");

  // Load AI image pool from scw-post-images repo
  await loadAiImagePool();

  const state = loadState();
  const publishedSet = new Set(state.publishedUrls || []);

  console.log(`[INCD] State: ${publishedSet.size} previously published`);

  // Launch Playwright browser with stealth to bypass Cloudflare
  const browser = await playwrightChromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    locale: "he-IL",
  });
  const page = await context.newPage();

  try {
    // Navigate to INCD publications page
    console.log("[INCD] Navigating to gov.il publications page...");
    await page.goto(INCD_PAGE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });

    // Wait for Cloudflare challenge to resolve (if any)
    console.log("[INCD] Waiting for page to fully load...");
    try {
      await page.waitForSelector('a[href*="/he/pages/"]', { timeout: 30000 });
    } catch {
      // Maybe Cloudflare challenge is showing — wait longer
      console.log("[INCD] Content not found yet, waiting for Cloudflare challenge...");
      await page.waitForTimeout(10000);
      // Check again
      const hasContent = await page.$('a[href*="/he/pages/"]');
      if (!hasContent) {
        const pageContent = await page.content();
        if (pageContent.includes("Cloudflare") || pageContent.includes("cf-error")) {
          console.warn("[INCD] Blocked by Cloudflare — will retry next run");
          await browser.close();
          return;
        }
        console.warn("[INCD] Page loaded but no publication links found — will retry next run");
        await browser.close();
        return;
      }
    }
    await page.waitForTimeout(3000);

    // Try the API first (from browser context, may work after Cloudflare challenge)
    let results = [];
    try {
      const apiData = await page.evaluate(async (apiUrl) => {
        const res = await fetch(apiUrl + "&skip=0&limit=20");
        if (!res.ok) return null;
        return await res.json();
      }, INCD_API_URL);

      if (apiData && apiData.results) {
        results = apiData.results;
        console.log(`[INCD] API returned ${results.length} publications (total: ${apiData.total})`);
      }
    } catch {
      console.log("[INCD] API call failed, falling back to DOM scraping");
    }

    // Fallback: extract publications from the rendered DOM
    if (results.length === 0) {
      console.log("[INCD] Scraping publications from DOM...");
      results = await page.evaluate(() => {
        const items = [];
        // Each publication is a link with h3 title + description + metadata
        const containers = document.querySelectorAll('a[href*="/he/pages/"]');
        for (const link of containers) {
          const h3 = link.querySelector("h3");
          if (!h3) continue;

          const title = h3.innerText.trim();
          // Get description text (text node after h3)
          const descParts = [];
          for (const node of link.childNodes) {
            if (node.nodeType === 3 && node.textContent.trim()) {
              descParts.push(node.textContent.trim());
            }
          }
          const description = descParts.join(" ").trim();

          // Extract metadata: type and date from sibling elements
          const metaContainer = link.nextElementSibling || link.parentElement;
          const allText = metaContainer ? metaContainer.innerText : "";
          
          // Parse date DD.MM.YYYY
          const dateMatch = allText.match(/(\d{2}\.\d{2}\.\d{4})/);
          // Parse type
          let pubType = "unknown";
          if (allText.includes("התרעות")) pubType = "התרעות";
          else if (allText.includes("המלצות")) pubType = "המלצות";
          else if (allText.includes("הנחיות")) pubType = "הנחיות";

          items.push({
            title,
            description: description || title,
            url: new URL(link.href).pathname,
            tags: {
              promotedMetaData: { "סוג": [{ title: pubType }] },
              metaData: { "תאריך פרסום": [{ title: dateMatch ? dateMatch[1] : "" }] },
            },
          });
        }
        return items;
      });
      console.log(`[INCD] Scraped ${results.length} publications from DOM`);
    }

    // Filter new entries — only process publications from the last 30 days
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30);

    const newEntries = results.filter((r) => {
      if (publishedSet.has(r.url)) return false;

      // Parse publication date (DD.MM.YYYY)
      const dateStr = r.tags?.metaData?.["תאריך פרסום"]?.[0]?.title || "";
      const dp = dateStr.match(/(\d{2})\.(\d{2})\.(\d{4})/);
      if (dp) {
        const pubDate = new Date(`${dp[3]}-${dp[2]}-${dp[1]}`);
        if (pubDate < cutoffDate) {
          return false; // Skip old publications
        }
      }
      return true;
    });
    console.log(`[INCD] New (last 30 days): ${newEntries.length}`);

    if (newEntries.length === 0) {
      console.log("[INCD] No new publications. Done.");
      state.lastChecked = new Date().toISOString();
      saveState(state);
      await browser.close();
      return;
    }

    const batch = newEntries.slice(0, MAX_NEW_PER_RUN);
    let published = 0;

    for (const entry of batch) {
      try {
        const pubType = entry.tags?.promotedMetaData?.["סוג"]?.[0]?.title || "";
        const sourceUrl = INCD_BASE_URL + entry.url;

        console.log(`\n[INCD] Processing: ${entry.title.substring(0, 60)}...`);

        // Translate via Gemini
        const translated = await translateAndRewrite(
          entry.title,
          entry.description || "",
          sourceUrl,
          pubType
        );

        if (translated) {
          console.log(`[INCD] Translated → "${translated.title}"`);
        } else {
          console.warn("[INCD] Translation failed, using original Hebrew");
        }

        // Fetch attachments from individual page
        const attachments = await fetchAttachments(page, sourceUrl);
        if (attachments.length > 0) {
          console.log(`[INCD] Found ${attachments.length} attachments`);
        }

        // Extract IOCs
        const combinedText = `${translated?.title || entry.title} ${translated?.body || entry.description}`;
        const iocs = await extractIOCs(combinedText);
        if (iocs.length > 0) {
          console.log(`[INCD] Extracted ${iocs.length} IOCs`);
        }

        // Map to MITRE ATT&CK techniques
        const mitreAttack = await mapToMitreAttack(combinedText, []);
        if (mitreAttack.length > 0) {
          console.log(`[INCD] Mapped to ${mitreAttack.length} ATT&CK techniques: ${mitreAttack.map(t => t.id).join(", ")}`);
        }

        // Build post
        const post = buildPostMarkdown(entry, translated, attachments, iocs, mitreAttack);
        const filePath = path.join(POSTS_DIR, post.filename);

        // Check if file already exists
        if (fs.existsSync(filePath)) {
          console.log(`[INCD] SKIP ${post.filename} — file already exists`);
          publishedSet.add(entry.url);
          continue;
        }

        // Write post file
        fs.writeFileSync(filePath, post.markdown);
        console.log(
          `[INCD] ✅ Created ${post.filename} [${post.classification.section}/${post.classification.score}]`
        );
        publishedSet.add(entry.url);
        published++;

        // Small delay between entries
        await new Promise((r) => setTimeout(r, 2000));
      } catch (err) {
        console.error(`[INCD] ERROR: ${err.message}`);
      }
    }

    // Save state
    state.publishedUrls = [...publishedSet];
    state.lastChecked = new Date().toISOString();
    saveState(state);

    console.log(`\n[INCD] Done — published: ${published}`);
  } catch (err) {
    console.error(`[INCD] Fatal error: ${err.message}`);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

main();
