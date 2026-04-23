#!/usr/bin/env node
/**
 * hn-picker.mjs — Pick best post from last 7 days for Hacker News submission
 *
 * Scoring favors deep technical analysis:
 *  +50  ai_rewritten=true (original SCW analysis, not aggregated)
 *  +30  has mitre_attack mappings
 *  +30  has sigma_rules.count > 0
 *  +20  score == CRITICAL
 *  +15  score == HIGH
 *  +15  cvss_score >= 9.0
 *  +10  event_type in [data-breach, ransomware, supply-chain, vulnerability]
 *   +5  body length > 1500 chars
 *  -50  channel == "NVD" with no AI rewrite (boilerplate CVE)
 *
 * Output: JSON object {title, url, score, hnSubmitUrl, breakdown}
 */

import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = path.resolve("_posts");
const SITE_URL = "https://shimiscyberworld.com";
const DAYS_BACK = 7;

function parseFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { fm: {}, body: content };
  const fm = {};
  const lines = m[1].split(/\r?\n/);
  let key = null;
  for (const line of lines) {
    const kv = line.match(/^([a-z_][a-z0-9_]*):\s*(.*)$/i);
    if (kv) {
      key = kv[1];
      fm[key] = kv[2].trim();
    }
  }
  return { fm, body: content.slice(m[0].length) };
}

function unquote(s) {
  if (!s) return s;
  return String(s).replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
}

function postUrlFromFilename(filename) {
  // Jekyll permalink: /posts/:slug/
  const base = filename.replace(/\.md$/, "");
  // strip date prefix YYYY-MM-DD-
  const slug = base.replace(/^\d{4}-\d{2}-\d{2}-/, "");
  return `${SITE_URL}/posts/${slug}/`;
}

function scorePost(fm, body, filename) {
  let s = 0;
  const b = {};

  if (unquote(fm.ai_rewritten) === "true") { s += 50; b.ai_rewrite = 50; }
  if (/mitre_attack:/i.test(body) || fm.mitre_attack) { s += 30; b.mitre = 30; }
  if (/sigma_rules:/i.test(body) || /sigma_rules:/i.test(JSON.stringify(fm))) { s += 30; b.sigma = 30; }

  const score = unquote(fm.score);
  if (score === "CRITICAL") { s += 20; b.critical = 20; }
  else if (score === "HIGH") { s += 15; b.high = 15; }

  const cvss = parseFloat(unquote(fm.cvss_score));
  if (!isNaN(cvss) && cvss >= 9.0) { s += 15; b.cvss9 = 15; }

  const et = unquote(fm.event_type);
  if (["data-breach", "ransomware", "supply-chain", "vulnerability"].includes(et)) {
    s += 10; b.event_type = 10;
  }

  if (body.length > 1500) { s += 5; b.long_body = 5; }

  // Penalize boilerplate NVD
  if (unquote(fm.channel) === "NVD" && unquote(fm.ai_rewritten) !== "true") {
    s -= 50; b.nvd_boilerplate = -50;
  }

  return { score: s, breakdown: b };
}

function isWithinDays(filename, days) {
  const m = filename.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return false;
  const postDate = new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00Z`);
  const ageMs = Date.now() - postDate.getTime();
  return ageMs >= 0 && ageMs <= days * 86400000;
}

function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`No posts dir: ${POSTS_DIR}`);
    process.exit(1);
  }
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".md") && isWithinDays(f, DAYS_BACK));
  if (files.length === 0) {
    console.log(JSON.stringify({ ok: false, reason: "no_recent_posts" }));
    return;
  }

  const ranked = [];
  for (const f of files) {
    try {
      const content = fs.readFileSync(path.join(POSTS_DIR, f), "utf-8");
      const { fm, body } = parseFrontmatter(content);
      if (unquote(fm.hidden) === "true") continue;
      const { score, breakdown } = scorePost(fm, body, f);
      const title = unquote(fm.title) || f;
      const url = postUrlFromFilename(f);
      ranked.push({ filename: f, title, url, score, breakdown, channel: unquote(fm.channel) || "" });
    } catch {}
  }

  ranked.sort((a, b) => b.score - a.score);
  const top = ranked[0];
  if (!top || top.score < 30) {
    console.log(JSON.stringify({ ok: false, reason: "no_strong_picks", best_score: top?.score || 0 }));
    return;
  }

  // HN submit URL — pre-fills title + URL, user clicks once to submit
  const hnTitle = top.title.replace(/^"|"$/g, "").substring(0, 80);
  const hnSubmitUrl = `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(top.url)}&t=${encodeURIComponent(hnTitle)}`;

  console.log(JSON.stringify({
    ok: true,
    pick: { title: hnTitle, url: top.url, score: top.score, breakdown: top.breakdown, channel: top.channel },
    hnSubmitUrl,
    runners_up: ranked.slice(1, 4).map(r => ({ title: r.title.substring(0, 80), score: r.score, url: r.url })),
  }, null, 2));
}

main();
