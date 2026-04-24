#!/usr/bin/env node
// Auto-sync _data/tools.yml -> _tools/{slug}.md (one Jekyll page per tool)
// Idempotent: only writes files for tools currently in tools.yml; deletes orphans.
// Run: node scripts/sync-tool-pages.mjs
// Triggers: GitHub Action on _data/tools.yml change, or manually.

import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
// Script lives at .github/scripts/sync-tool-pages.mjs — repo root is two levels up.
const ROOT = path.resolve(path.dirname(__filename), "..", "..");
const SRC = path.join(ROOT, "_data", "tools.yml");
const DEST = path.join(ROOT, "_tools");

function slugify(s) {
  return String(s)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function yamlSafe(s) {
  if (s == null) return "";
  return String(s).replace(/"/g, '\\"').replace(/\n/g, " ").trim();
}

function buildFrontMatter(tool, category) {
  const slug = slugify(tool.title);
  const fm = [
    "---",
    `title: "${yamlSafe(tool.title)} — ${yamlSafe(category)} | SCW Toolkit"`,
    `tool_title: "${yamlSafe(tool.title)}"`,
    `slug: "${slug}"`,
    `category: "${yamlSafe(category)}"`,
    `description: "${yamlSafe(tool.description)}"`,
    tool.url ? `url_external: "${yamlSafe(tool.url)}"` : "",
    tool.button ? `button: "${yamlSafe(tool.button)}"` : "",
    tool.status ? `status: "${yamlSafe(tool.status)}"` : "",
    tool.sponsored ? `sponsored: true` : "",
    tool.tags && tool.tags.length > 0 ? `tags: [${tool.tags.map(t => `"${yamlSafe(t)}"`).join(", ")}]` : "",
    `auto_generated: true`,
    "---",
    "",
  ].filter(Boolean).join("\n");
  return { slug, fm };
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`tools.yml not found at ${SRC}`);
    process.exit(1);
  }
  const data = yaml.load(fs.readFileSync(SRC, "utf-8"));
  if (!data || !Array.isArray(data.categories)) {
    console.error("tools.yml has no `categories:` array");
    process.exit(1);
  }
  fs.mkdirSync(DEST, { recursive: true });

  const wantedSlugs = new Set();
  let written = 0;
  for (const cat of data.categories) {
    if (!cat.items) continue;
    for (const tool of cat.items) {
      const { slug, fm } = buildFrontMatter(tool, cat.name);
      wantedSlugs.add(slug);
      const filePath = path.join(DEST, `${slug}.md`);
      const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf-8") : null;
      if (existing !== fm) {
        fs.writeFileSync(filePath, fm, "utf-8");
        written++;
      }
    }
  }

  // Remove stale files
  let removed = 0;
  for (const f of fs.readdirSync(DEST)) {
    if (!f.endsWith(".md")) continue;
    const slug = f.replace(/\.md$/, "");
    if (!wantedSlugs.has(slug)) {
      fs.unlinkSync(path.join(DEST, f));
      removed++;
    }
  }

  console.log(`Synced: ${wantedSlugs.size} tool pages (${written} written, ${removed} removed)`);
}

main();
