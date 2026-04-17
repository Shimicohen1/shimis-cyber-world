/**
 * SCW Weekly Content Enrichment Engine
 * 
 * Runs weekly via GitHub Actions to:
 * 1. Generate new hardening checks (10/week) via Gemini Flash
 * 2. Generate new detection rules (5/week) via Gemini Flash
 * 3. Generate new playbooks (1 every 2 weeks) via Gemini Flash
 * 4. Sync BreachRadar threat group metadata from RansomLook
 * 5. Reconcile all tool counts across pages
 *
 * Cost estimate: ~$0.30–0.50/month with Gemini Flash
 */

import fs from 'fs';
import path from 'path';

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const ROOT = process.cwd();
const DATA = path.join(ROOT, '_data');

/* ═══════════════════════════════════════════════════════════
 *  GEMINI API
 * ═══════════════════════════════════════════════════════════ */

async function gemini(prompt, temperature = 0.7) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature, maxOutputTokens: 16000 }
    })
  });
  if (!res.ok) throw new Error(`Gemini API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

function extractYaml(text) {
  // Strip markdown code fences if present
  const m = text.match(/```(?:ya?ml)?\s*\n([\s\S]*?)```/);
  return m ? m[1].trim() : text.trim();
}

/* ═══════════════════════════════════════════════════════════
 *  STATE — track what was already generated to avoid dupes
 * ═══════════════════════════════════════════════════════════ */

const STATE_FILE = path.join(ROOT, '.github', 'enrich-state.json');

function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); }
  catch { return { generatedHardeningIds: [], generatedRuleNames: [], generatedPlaybooks: [], lastRun: null, weekCount: 0 }; }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

/* ═══════════════════════════════════════════════════════════
 *  1. HARDENING CHECKS GENERATOR (10/week)
 * ═══════════════════════════════════════════════════════════ */

async function generateHardeningChecks(state) {
  console.log('\n🛡️  Generating hardening checks...');
  
  const yml = fs.readFileSync(path.join(DATA, 'hardening.yml'), 'utf8');
  
  // Extract existing platforms and last IDs per platform
  const platformIds = {};
  const idMatches = yml.matchAll(/^- id: (\w+)-(\d+)$/gm);
  for (const m of idMatches) {
    const prefix = m[1];
    const num = parseInt(m[2]);
    if (!platformIds[prefix] || num > platformIds[prefix]) {
      platformIds[prefix] = num;
    }
  }

  // Pick 2-3 platforms to enrich this week (rotate)
  const allPrefixes = Object.keys(platformIds);
  const weekOffset = state.weekCount % allPrefixes.length;
  const selectedPrefixes = [];
  for (let i = 0; i < 3 && i < allPrefixes.length; i++) {
    selectedPrefixes.push(allPrefixes[(weekOffset + i) % allPrefixes.length]);
  }

  // Map prefixes to platform names
  const platformMap = {
    lin: 'Linux (Ubuntu/RHEL)', windows: 'Windows Server', aws: 'AWS',
    gcp: 'Google Cloud', 'm365': 'Microsoft 365', azure: 'Azure',
    cs: 'CrowdStrike Falcon', pa: 'Palo Alto Networks', iron: 'Cisco Secure Email',
    fg: 'Fortinet FortiGate', okta: 'Okta IAM', k8s: 'Kubernetes',
    cicd: 'GitHub & CI/CD Pipeline',
  };

  const categories = ['identity', 'network', 'logging', 'encryption', 'services', 'patching'];

  const prompt = `You are an expert security hardening engineer. Generate exactly 10 NEW hardening checks in YAML format.

PLATFORMS TO TARGET (generate 3-4 checks each):
${selectedPrefixes.map(p => `- ${p} (${platformMap[p] || p}), last ID: ${p}-${String(platformIds[p]).padStart(3, '0')}`).join('\n')}

CATEGORIES (vary across these): ${categories.join(', ')}

EXISTING IDs TO AVOID (do NOT duplicate these):
${state.generatedHardeningIds.slice(-50).join(', ')}

OUTPUT FORMAT — produce ONLY the YAML items array, no headers:
\`\`\`yaml
- id: ${selectedPrefixes[0]}-${String(platformIds[selectedPrefixes[0]] + 1).padStart(3, '0')}
  platform: ${selectedPrefixes[0]}
  category: <category>
  severity: <critical|high|medium>
  title: <short imperative title>
  description: <one sentence explaining what and why>
  reference: <real CIS Benchmark / vendor doc reference>
  command: '<real CLI command or console steps — multi-line OK>'
  premium:
    attackPerspective: <2-3 sentences from the attacker viewpoint — WHY this misconfiguration is exploited and real-world examples>
    implementationNotes: '<numbered step-by-step implementation guide, 4-6 steps>'
    validationNotes: '<CLI commands or console steps to verify the check is properly applied>'
    tuningNotes: <1-2 sentences on tuning and edge cases to watch for>
    advancedDetection: '<SIEM query or detection rule to detect violations — Splunk, KQL, or Sigma format>'
    relatedIds:
    - <related check ID 1>
    - <related check ID 2>
  tags:
  - tag1
  - tag2
  commandLanguage: <bash|powershell|yaml|cli>
  commandFull: '<extended version of command with full implementation steps>'
\`\`\`

RULES:
1. Each check must have a REAL, working command (CLI, PowerShell, PAN-OS, ESA CLI, etc.)
2. Reference a real benchmark or vendor doc — do NOT invent reference numbers
3. Vary severity (mix of critical, high, and medium)
4. Focus on actionable security hardening — not theoretical advice
5. Do NOT duplicate any check that already exists in the file
6. Start IDs from ${selectedPrefixes[0]}-${String(platformIds[selectedPrefixes[0]] + 1).padStart(3, '0')}
7. EVERY check MUST include a full premium block with attackPerspective, implementationNotes, validationNotes, tuningNotes, advancedDetection, and relatedIds
8. attackPerspective must reference real-world attacks or threat actors when possible
9. advancedDetection must be a working SIEM query (Splunk SPL, KQL, or Sigma)
10. commandFull must be a complete implementation guide`;

  const response = await gemini(prompt, 0.8);
  const yamlText = extractYaml(response);
  
  // Validate we got proper YAML items
  const newIds = [...yamlText.matchAll(/^- id: (\S+)/gm)].map(m => m[1]);
  if (newIds.length === 0) {
    console.log('  ⚠️  No valid checks generated, skipping');
    return 0;
  }

  // Append to hardening.yml
  fs.appendFileSync(path.join(DATA, 'hardening.yml'), '\n' + yamlText + '\n');
  state.generatedHardeningIds.push(...newIds);
  
  console.log(`  ✅ Generated ${newIds.length} checks: ${newIds.join(', ')}`);
  return newIds.length;
}

/* ═══════════════════════════════════════════════════════════
 *  2. DETECTION RULES GENERATOR (5/week)
 * ═══════════════════════════════════════════════════════════ */

async function generateDetectionRules(state) {
  console.log('\n🎯 Generating detection rules...');

  const yml = fs.readFileSync(path.join(DATA, 'detections.yml'), 'utf8');
  const existingNames = [...yml.matchAll(/- name: "([^"]+)"/g)].map(m => m[1]);

  const platforms = ['KQL (Sentinel)', 'Sigma', 'Splunk SPL'];
  const categories = [
    'Brute Force', 'Credential Access', 'Defense Evasion', 'Lateral Movement',
    'Persistence', 'Privilege Escalation', 'Data Exfiltration', 'Ransomware',
    'Phishing', 'Cloud Security', 'Command and Control', 'Discovery',
    'Execution', 'Initial Access', 'Impact'
  ];

  // Rotate platform focus
  const platIdx = state.weekCount % platforms.length;
  const focusPlatform = platforms[platIdx];
  const mixPlatforms = platforms.filter((_, i) => i !== platIdx);

  const prompt = `You are an expert detection engineer. Generate exactly 5 NEW detection rules in YAML format.

PLATFORM FOCUS: Generate 3 rules for "${focusPlatform}" and 1 each for "${mixPlatforms[0]}" and "${mixPlatforms[1]}".

CATEGORIES TO TARGET (pick different ones): ${categories.join(', ')}

EXISTING RULE NAMES TO AVOID:
${existingNames.concat(state.generatedRuleNames).slice(-30).map(n => `- "${n}"`).join('\n')}

OUTPUT FORMAT — produce ONLY the YAML rules, no file headers:
\`\`\`yaml
  - name: "Rule Name Here"
    description: "What this detects and why it matters."
    category: "Category"
    platform: "KQL (Sentinel)"
    mitre: "T1234.001"
    mitre_name: "Technique: Sub-Technique"
    severity: "high"
    query: |
      <actual working query>
    tags: [tag1, tag2, tag3]
    notes: "Tuning guidance."
\`\`\`

RULES:
1. Queries must be REAL, production-ready — not pseudo-code
2. Each rule must reference a valid MITRE ATT&CK technique ID
3. Include practical tuning notes
4. KQL must use real Sentinel table names (SigninLogs, DeviceProcessEvents, SecurityEvent, etc.)
5. Sigma must follow official Sigma format with logsource, detection, condition
6. Splunk must use valid SPL with index, sourcetype, stats/eval
7. Vary severity (mix of critical, high, medium)
8. Include 2-4 relevant tags per rule`;

  const response = await gemini(prompt, 0.8);
  const yamlText = extractYaml(response);

  const newNames = [...yamlText.matchAll(/- name: "([^"]+)"/g)].map(m => m[1]);
  if (newNames.length === 0) {
    console.log('  ⚠️  No valid rules generated, skipping');
    return 0;
  }

  // Append to rules section in detections.yml (before any trailing whitespace)
  const content = fs.readFileSync(path.join(DATA, 'detections.yml'), 'utf8');
  fs.writeFileSync(path.join(DATA, 'detections.yml'), content.trimEnd() + '\n\n' + yamlText + '\n');
  state.generatedRuleNames.push(...newNames);

  console.log(`  ✅ Generated ${newNames.length} rules: ${newNames.join(', ')}`);
  return newNames.length;
}

/* ═══════════════════════════════════════════════════════════
 *  3. PLAYBOOK GENERATOR (1 every 2 weeks)
 * ═══════════════════════════════════════════════════════════ */

async function generatePlaybook(state) {
  // Only generate every 2 weeks
  if (state.weekCount % 2 !== 0) {
    console.log('\n📋 Playbook generation: skipping (runs every 2 weeks)');
    return 0;
  }

  console.log('\n📋 Generating playbook...');

  const yml = fs.readFileSync(path.join(DATA, 'playbooks.yml'), 'utf8');
  const existingNames = [...yml.matchAll(/- name: "([^"]+)"/g)].map(m => m[1]);
  const allExisting = existingNames.concat(state.generatedPlaybooks);

  // Topics to fill gaps
  const candidateTopics = [
    'OT/ICS Cyber Incident Response', 'GDPR Breach Notification Compliance',
    'Wiper Malware Response', 'SIM Swap / MFA Bypass Response',
    'Cloud Container Escape Response', 'DNS Hijacking Response',
    'Deepfake / AI Social Engineering Response', 'Third-Party SaaS Compromise',
    'Firmware / UEFI Rootkit Response', 'Rogue Employee Sabotage',
    'Election / Critical Infrastructure Disruption', 'Medical Device Compromise',
    'Cryptocurrency Theft Response', 'Watering Hole Attack Response',
    'Mobile Device Compromise (iOS/Android)', 'Database Breach Response',
    'CI/CD Pipeline Compromise', 'BGP Hijacking Response',
    'Physical Security Breach (Tailgating + Cyber)', 'Credential Marketplace Exposure'
  ];

  // Pick first topic not already generated
  const topic = candidateTopics.find(t => !allExisting.some(e => e.toLowerCase().includes(t.split(' ')[0].toLowerCase())));
  if (!topic) {
    console.log('  ⚠️  All candidate topics exhausted');
    return 0;
  }

  const prompt = `You are a senior incident response manager. Generate ONE comprehensive incident response playbook in YAML format.

TOPIC: "${topic}"

MODEL THIS AFTER THE EXISTING PLAYBOOK FORMAT — include ALL of these fields:
\`\`\`yaml
  - name: "${topic}"
    description: "..."
    category: "..."
    mitre: "T1234 — Technique Name"
    severity: "critical"
    premium: false
    estimated_time: "X-Y hours"
    roles: ["Incident Commander", "SOC Analyst L2/L3", ...]
    tags: [tag1, tag2, tag3]
    escalation:
      p1_sla: "..."
      p1_notify: [...]
      war_room: "..."
      external: [...]
    metrics:
      mttd: "..."
      mttc: "..."
      mttr: "..."
      benchmark: "..."
    phases:
      - name: "Detect"
        steps: [...]
        decision_tree:
          - condition: "..."
            action: "..."
      - name: "Contain"
        steps: [...]
        decision_tree: [...]
      - name: "Eradicate"
        steps: [...]
      - name: "Recover"
        steps: [...]
        decision_tree: [...]
      - name: "Post-Incident"
        steps: [...]
    evidence_checklist: [...]
    comms_templates:
      internal: |
        ...
      external: |
        ...
\`\`\`

RULES:
1. Include REAL tool commands (CrowdStrike, Sentinel KQL, Splunk, AWS CLI, PowerShell, PAN-OS)
2. Decision trees must be practical — real conditions and actions
3. Include industry benchmark metrics (IBM X-Force, CrowdStrike, etc.)
4. Evidence checklist must be forensically sound
5. Communication templates must be professional and legal-reviewed style
6. Steps should be detailed — not generic advice`;

  const response = await gemini(prompt, 0.7);
  const yamlText = extractYaml(response);

  if (!yamlText.includes('name:') || !yamlText.includes('phases:')) {
    console.log('  ⚠️  Invalid playbook output, skipping');
    return 0;
  }

  // Append to playbooks.yml
  const content = fs.readFileSync(path.join(DATA, 'playbooks.yml'), 'utf8');
  fs.writeFileSync(path.join(DATA, 'playbooks.yml'), content.trimEnd() + '\n\n  # ══════════════════════════════════════════════════════════\n  # AUTO-GENERATED — ' + topic.toUpperCase() + '\n  # ══════════════════════════════════════════════════════════\n' + yamlText + '\n');
  state.generatedPlaybooks.push(topic);

  console.log(`  ✅ Generated playbook: "${topic}"`);
  return 1;
}

/* ═══════════════════════════════════════════════════════════
 *  4. BREACHRADAR THREAT GROUP SYNC (free — no AI)
 * ═══════════════════════════════════════════════════════════ */

async function syncThreatGroups() {
  console.log('\n📡 Syncing BreachRadar threat groups...');

  const jsFile = path.join(ROOT, 'assets', 'js', 'breach-radar.js');
  const js = fs.readFileSync(jsFile, 'utf8');

  // Extract existing groups from GROUP_META
  const existingGroups = new Set();
  const metaMatches = js.matchAll(/^\s{4}['"]?([\w$\s]+?)['"]?\s*:/gm);
  for (const m of metaMatches) {
    existingGroups.add(m[1].trim().toLowerCase());
  }

  // Fetch active groups from RansomLook
  let apiGroups = [];
  try {
    const res = await fetch('https://www.ransomlook.io/api/groups');
    if (res.ok) {
      apiGroups = await res.json();
    }
  } catch (e) {
    console.log(`  ⚠️  Failed to fetch RansomLook groups: ${e.message}`);
    return 0;
  }

  if (!Array.isArray(apiGroups) || apiGroups.length === 0) {
    console.log('  ⚠️  No groups from API, skipping');
    return 0;
  }

  // Find new groups not in our metadata
  const newGroups = apiGroups
    .filter(g => g.name && !existingGroups.has(g.name.toLowerCase()))
    .slice(0, 10); // Cap at 10 new per week

  if (newGroups.length === 0) {
    console.log('  ✅ All tracked groups are up to date');
    return 0;
  }

  // Build new entries
  const newEntries = newGroups.map(g => {
    const key = g.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `    ${key.includes(' ') ? "'" + key + "'" : key}: { tier: 'medium', aka: '${g.name}', type: 'Unknown' }`;
  });

  // Insert before the closing };
  const updated = js.replace(
    /(\s+};\s*\n\s*\/\* ═+ \*\/\s*\n\s*\/\*\s*UTILITIES)/,
    ',\n' + newEntries.join(',\n') + '\n  };\n\n\n  /* ════════════════════════════════════════════════════════════\n   *  UTILITIES'
  );

  if (updated !== js) {
    fs.writeFileSync(jsFile, updated);
    console.log(`  ✅ Added ${newGroups.length} new groups: ${newGroups.map(g => g.name).join(', ')}`);
  } else {
    // Fallback: simpler insertion
    console.log(`  ⚠️  Could not auto-insert groups (pattern changed). Manual review needed.`);
  }

  return newGroups.length;
}

/* ═══════════════════════════════════════════════════════════
 *  5. COUNT RECONCILIATION (free — no AI)
 * ═══════════════════════════════════════════════════════════ */

function reconcileCounts() {
  console.log('\n🔢 Reconciling tool counts...');
  let changes = 0;

  // Count hardening items
  const hYml = fs.readFileSync(path.join(DATA, 'hardening.yml'), 'utf8');
  const hCount = (hYml.match(/^- id: /gm) || []).length;
  const platforms = new Set();
  for (const m of hYml.matchAll(/^\s+platform: (\S+)/gm)) platforms.add(m[1]);
  const pCount = platforms.size;

  // Count detection rules
  const dYml = fs.readFileSync(path.join(DATA, 'detections.yml'), 'utf8');
  const dCount = (dYml.match(/^\s+- name: "/gm) || []).length;

  // Count playbooks
  const pbYml = fs.readFileSync(path.join(DATA, 'playbooks.yml'), 'utf8');
  const pbCount = (pbYml.match(/^\s+- name: "/gm) || []).length;

  // Count IOC sources
  const iocYml = fs.readFileSync(path.join(DATA, 'ioc_sources.yml'), 'utf8');
  const srcCount = (iocYml.match(/^\s+- name: /gm) || []).length;

  console.log(`  Hardening: ${hCount} checks, ${pCount} platforms`);
  console.log(`  Detections: ${dCount} rules`);
  console.log(`  Playbooks: ${pbCount}`);
  console.log(`  IOC Sources: ${srcCount}`);

  // Update hardening.md
  const hardeningMd = path.join(ROOT, 'hardening.md');
  let hMd = fs.readFileSync(hardeningMd, 'utf8');
  hMd = hMd.replace(/(\d+) hardening checks across (\d+) platforms/g, `${hCount} hardening checks across ${pCount} platforms`);
  hMd = hMd.replace(/(harden-hero-stat__num">)\d+(<\/span><span class="harden-hero-stat__label">Checks)/g, `$1${hCount}$2`);
  hMd = hMd.replace(/(harden-hero-stat__num">)\d+(<\/span><span class="harden-hero-stat__label">Platforms)/g, `$1${pCount}$2`);
  fs.writeFileSync(hardeningMd, hMd);

  // Update premium.md
  const premiumMd = path.join(ROOT, 'premium.md');
  let pMd = fs.readFileSync(premiumMd, 'utf8');
  pMd = pMd.replace(/(elite-stat__num">)\d+(<\/span>\s*\n<span class="elite-stat__label">Hardening Checks)/g, `$1${hCount}$2`);
  pMd = pMd.replace(/(elite-stat__num">)\d+(<\/span>\s*\n<span class="elite-stat__label">Platforms)/g, `$1${pCount}$2`);
  pMd = pMd.replace(/(elite-stat__num">)\d+\+?(<\/span>\s*\n<span class="elite-stat__label">Detection Rules)/g, `$1${dCount}$2`);
  pMd = pMd.replace(/(elite-stat__num">)\d+\+?(<\/span>\s*\n<span class="elite-stat__label">Threat Intel Sources)/g, `$1${srcCount}$2`);
  // Update LockDown card
  pMd = pMd.replace(/\d+ security hardening checks\. \d+ platforms/g, `${hCount} security hardening checks. ${pCount} platforms`);
  pMd = pMd.replace(/<span>\d+ platforms<\/span>\s*\n<span>\d+ items<\/span>/g, `<span>${pCount} platforms</span>\n<span>${hCount} items</span>`);
  // Update ThreatLens card
  pMd = pMd.replace(/across \d+ threat intel/g, `across ${srcCount} threat intel`);
  pMd = pMd.replace(/<span>\d+ sources<\/span>/g, `<span>${srcCount} sources</span>`);
  fs.writeFileSync(premiumMd, pMd);

  // Update ioc-scanner.md
  const iocMd = path.join(ROOT, 'ioc-scanner.md');
  let iMd = fs.readFileSync(iocMd, 'utf8');
  iMd = iMd.replace(/across \d+ threat intelligence platforms/g, `across ${srcCount} threat intelligence platforms`);
  fs.writeFileSync(iocMd, iMd);

  console.log('  ✅ All page counts reconciled');
  changes++;
  return changes;
}

/* ═══════════════════════════════════════════════════════════
 *  MAIN
 * ═══════════════════════════════════════════════════════════ */

async function main() {
  console.log('═══════════════════════════════════════════');
  console.log('  SCW Weekly Content Enrichment Engine');
  console.log('═══════════════════════════════════════════');
  console.log(`Date: ${new Date().toISOString()}`);

  if (!GEMINI_KEY) {
    console.error('❌ GEMINI_API_KEY not set');
    process.exit(1);
  }

  const state = loadState();
  state.weekCount = (state.weekCount || 0) + 1;
  state.lastRun = new Date().toISOString();

  const stats = { hardening: 0, detections: 0, playbooks: 0, groups: 0 };

  try {
    stats.hardening = await generateHardeningChecks(state);
  } catch (e) {
    console.error('  ❌ Hardening generation failed:', e.message);
  }

  try {
    stats.detections = await generateDetectionRules(state);
  } catch (e) {
    console.error('  ❌ Detection generation failed:', e.message);
  }

  try {
    stats.playbooks = await generatePlaybook(state);
  } catch (e) {
    console.error('  ❌ Playbook generation failed:', e.message);
  }

  try {
    stats.groups = await syncThreatGroups();
  } catch (e) {
    console.error('  ❌ Threat group sync failed:', e.message);
  }

  try {
    reconcileCounts();
  } catch (e) {
    console.error('  ❌ Count reconciliation failed:', e.message);
  }

  saveState(state);

  console.log('\n═══════════════════════════════════════════');
  console.log('  WEEKLY SUMMARY');
  console.log('═══════════════════════════════════════════');
  console.log(`  Hardening checks added:  ${stats.hardening}`);
  console.log(`  Detection rules added:   ${stats.detections}`);
  console.log(`  Playbooks added:         ${stats.playbooks}`);
  console.log(`  Threat groups synced:    ${stats.groups}`);
  console.log(`  Week #${state.weekCount} complete`);
  console.log('═══════════════════════════════════════════\n');
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
