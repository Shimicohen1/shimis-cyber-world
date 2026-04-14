---
layout: default
title: Intel Bot — Full Guide
permalink: /intel-bot/
---

<div class="container">

<div class="bot-guide-hero reveal">
  <div class="label label--cyan">SCW INTEL BOT</div>
  <h1>Full Command Reference</h1>
  <p class="bot-guide-hero__sub">Real threat intelligence from Telegram. No dashboards, no noise — search, detect, monitor, export. Here's everything the bot can do.</p>
  <a href="https://t.me/Shimiscyberworldbot" target="_blank" rel="noopener" class="btn btn--accent btn--lg">Open Intel Bot →</a>
</div>

<hr class="section-break">

<!-- ── Quick Start ── -->
<section class="bot-guide-section reveal">
  <h2>⚡ Quick Start</h2>
  <div class="bot-guide-steps">
    <div class="bot-guide-step">
      <span class="bot-guide-step__num">1</span>
      <div>
        <strong>Open the bot</strong>
        <p>Click <a href="https://t.me/Shimiscyberworldbot" target="_blank" rel="noopener">@Shimiscyberworldbot</a> in Telegram and press <strong>Start</strong>.</p>
      </div>
    </div>
    <div class="bot-guide-step">
      <span class="bot-guide-step__num">2</span>
      <div>
        <strong>Try a free command</strong>
        <p>Type <code>/latest</code> to see today's threats, or <code>/sample</code> for a weekly teaser.</p>
      </div>
    </div>
    <div class="bot-guide-step">
      <span class="bot-guide-step__num">3</span>
      <div>
        <strong>Search & detect</strong>
        <p>Type <code>/org microsoft</code> or <code>/detect stryker</code> to search threats and generate detection rules.</p>
      </div>
    </div>
  </div>
</section>

<hr class="section-break">

<!-- ── Free Commands ── -->
<section class="bot-guide-section reveal">
  <h2>🆓 Free Commands</h2>
  <p>Available to everyone — no subscription needed.</p>

  <div class="bot-guide-cmd">
    <div class="bot-guide-cmd__header">
      <code class="bot-guide-cmd__name">/latest</code>
      <span class="badge badge--vault">Free</span>
    </div>
    <p>See the latest threats from the last 24 hours. Shows titles, severity scores, event types, and direct links to full reports.</p>
    <div class="bot-guide-example">
      <span class="bot-guide-example__label">Example</span>
      <pre>/latest</pre>
      <p class="bot-guide-example__result">→ Returns 5-10 most recent posts with severity badges and links</p>
    </div>
  </div>

  <div class="bot-guide-cmd">
    <div class="bot-guide-cmd__header">
      <code class="bot-guide-cmd__name">/sample</code>
      <span class="badge badge--vault">Free</span>
    </div>
    <p>Get a weekly threat teaser — a curated preview of what Pro/Elite subscribers receive.</p>
    <div class="bot-guide-example">
      <span class="bot-guide-example__label">Example</span>
      <pre>/sample</pre>
      <p class="bot-guide-example__result">→ Returns a formatted threat brief with top incidents from the past week</p>
    </div>
  </div>
</section>

<hr class="section-break">

<!-- ── Search Commands ── -->
<section class="bot-guide-section reveal">
  <h2>🔎 Threat Search</h2>
  <p>Search the SCW threat database by organization, domain, breach type, threat actor, malware, or country. Requires <strong>Pro</strong> or <strong>Elite</strong> access.</p>

  <div class="bot-guide-cmd">
    <div class="bot-guide-cmd__header">
      <code class="bot-guide-cmd__name">/org [name or domain]</code>
      <span class="badge badge--signal">Pro+</span>
    </div>
    <p>Search by organization name or domain. Returns all matching threat posts with severity, event type, and IOC count.</p>
    <div class="bot-guide-example">
      <span class="bot-guide-example__label">Examples</span>
      <pre>/org microsoft
/org stryker.com
/org "Bank of America"</pre>
      <p class="bot-guide-example__result">→ Returns matching posts with severity scores, event types, dates, and direct links. Includes IOC count per post.</p>
    </div>
  </div>

  <div class="bot-guide-cmd">
    <div class="bot-guide-cmd__header">
      <code class="bot-guide-cmd__name">/breach</code>
      <span class="badge badge--signal">Pro+</span>
    </div>
    <p>List recent data breaches and ransomware events. No arguments needed — returns the latest breach activity.</p>
    <div class="bot-guide-example">
      <span class="bot-guide-example__label">Example</span>
      <pre>/breach</pre>
      <p class="bot-guide-example__result">→ Returns recent breach posts with affected organizations, event types, and severity</p>
    </div>
  </div>

  <div class="bot-guide-cmd">
    <div class="bot-guide-cmd__header">
      <code class="bot-guide-cmd__name">/actor [name]</code>
      <span class="badge badge--signal">Pro+</span>
    </div>
    <p>Search by threat actor or APT group name. Returns all related threat posts.</p>
    <div class="bot-guide-example">
      <span class="bot-guide-example__label">Examples</span>
      <pre>/actor lazarus
/actor APT29
/actor lockbit</pre>
      <p class="bot-guide-example__result">→ Returns posts related to the threat actor, including techniques, targets, and timelines</p>
    </div>
  </div>

  <div class="bot-guide-cmd">
    <div class="bot-guide-cmd__header">
      <code class="bot-guide-cmd__name">/malware [name]</code>
      <span class="badge badge--signal">Pro+</span>
    </div>
    <p>Search by malware family or tool name.</p>
    <div class="bot-guide-example">
      <span class="bot-guide-example__label">Examples</span>
      <pre>/malware emotet
/malware cobalt strike
/malware asyncrat</pre>
    </div>
  </div>

  <div class="bot-guide-cmd">
    <div class="bot-guide-cmd__header">
      <code class="bot-guide-cmd__name">/country [code]</code>
      <span class="badge badge--signal">Pro+</span>
    </div>
    <p>Search threats by country code (ISO 2-letter). Useful for geopolitical threat monitoring.</p>
    <div class="bot-guide-example">
      <span class="bot-guide-example__label">Examples</span>
      <pre>/country IL
/country US
/country CN</pre>
      <p class="bot-guide-example__result">→ Returns threat posts related to the specified country</p>
    </div>
  </div>
</section>

<hr class="section-break">

<!-- ── Detection Rules ── -->
<section class="bot-guide-section reveal">
  <h2>🛡️ Detection Rules</h2>
  <p>Generate SIEM-ready detection rules from real breach data. The bot creates Sigma rules from MITRE ATT&CK techniques found in threat posts, then converts them to your SIEM's native query language.</p>

  <div class="bot-guide-cmd">
    <div class="bot-guide-cmd__header">
      <code class="bot-guide-cmd__name">/detect [org name or domain]</code>
      <span class="badge badge--vault">1 Free</span>
      <span class="badge badge--drop">Full: 250 ⭐</span>
    </div>
    <p>Search for an organization and generate detection rules based on the MITRE ATT&CK techniques found in related breach posts. Rules are auto-generated in <strong>5 SIEM formats</strong>.</p>
    <div class="bot-guide-example">
      <span class="bot-guide-example__label">Examples</span>
      <pre>/detect stryker
/detect microsoft.com
/detect bludit</pre>
      <p class="bot-guide-example__result">→ Returns detection rules with severity, MITRE technique, and tactic. Click format buttons to get the rule in your SIEM's language:</p>
    </div>
    <div class="bot-guide-formats">
      <span class="bot-guide-format">Sigma YAML</span>
      <span class="bot-guide-format">Splunk SPL</span>
      <span class="bot-guide-format">Microsoft Sentinel KQL</span>
      <span class="bot-guide-format">Elastic Lucene</span>
      <span class="bot-guide-format">QRadar AQL</span>
    </div>
    <div class="bot-guide-pricing">
      <p><strong>🆓 Free:</strong> 1 preview rule per search (any format)</p>
      <p><strong>🛡️ Full pack:</strong> 3-5 rules per incident — 250 ⭐ (~$5)</p>
      <p><strong>✅ Pro / Elite:</strong> All detection packs included free</p>
    </div>
  </div>

  <div class="bot-guide-cmd">
    <div class="bot-guide-cmd__header">
      <code class="bot-guide-cmd__name">/siem [format]</code>
      <span class="badge badge--signal">Pro+</span>
    </div>
    <p>Set your preferred SIEM format. All <code>/detect</code> results and weekly digests will default to this format.</p>
    <div class="bot-guide-example">
      <span class="bot-guide-example__label">Examples</span>
      <pre>/siem splunk
/siem sentinel
/siem elastic
/siem qradar
/siem sigma</pre>
    </div>
  </div>

  <div class="bot-guide-cmd">
    <div class="bot-guide-cmd__header">
      <code class="bot-guide-cmd__name">/siem digest on</code>
      <span class="badge badge--signal">Pro+</span>
    </div>
    <p>Enable a <strong>weekly threat digest</strong> delivered every Sunday. The digest matches your watchlist organizations against the past week's posts, and includes detection rule previews converted to your chosen SIEM format.</p>
    <div class="bot-guide-example">
      <span class="bot-guide-example__label">Examples</span>
      <pre>/siem digest on   — Enable weekly summary
/siem digest off  — Disable
/siem             — View current settings</pre>
    </div>
  </div>
</section>

<hr class="section-break">

<!-- ── Watchlist ── -->
<section class="bot-guide-section reveal">
  <h2>🔔 Watchlist & Monitoring</h2>
  <p>Track organizations and get real-time alerts when they appear in new threat posts. Your watchlist also powers the weekly SIEM digest.</p>

  <div class="bot-guide-cmd">
    <div class="bot-guide-cmd__header">
      <code class="bot-guide-cmd__name">/watch [domain or org name]</code>
      <span class="badge badge--signal">Pro+</span>
    </div>
    <p>Add an organization to your watchlist. You'll get an instant Telegram alert whenever this org appears in a new threat post — breaches, ransomware, vulnerabilities, or advisories.</p>
    <div class="bot-guide-example">
      <span class="bot-guide-example__label">Examples</span>
      <pre>/watch microsoft.com
/watch stryker
/watch "Bank Hapoalim"</pre>
      <p class="bot-guide-example__result">→ Org added to watchlist. You'll receive alerts in real-time.</p>
    </div>
    <div class="bot-guide-pricing">
      <p><strong>Pro:</strong> Up to 5 organizations</p>
      <p><strong>Elite:</strong> Up to 25 organizations</p>
    </div>
  </div>

  <div class="bot-guide-cmd">
    <div class="bot-guide-cmd__header">
      <code class="bot-guide-cmd__name">/unwatch [domain]</code>
      <span class="badge badge--signal">Pro+</span>
    </div>
    <p>Remove an organization from your watchlist.</p>
    <div class="bot-guide-example">
      <span class="bot-guide-example__label">Example</span>
      <pre>/unwatch stryker</pre>
    </div>
  </div>

  <div class="bot-guide-cmd">
    <div class="bot-guide-cmd__header">
      <code class="bot-guide-cmd__name">/watchlist</code>
      <span class="badge badge--signal">Pro+</span>
    </div>
    <p>View all organizations you're currently tracking, with slot usage.</p>
  </div>
</section>

<hr class="section-break">

<!-- ── Intel Generation ── -->
<section class="bot-guide-section reveal">
  <h2>📦 Generate Intel</h2>
  <p>On-demand, analyst-ready outputs you can use immediately.</p>

  <div class="bot-guide-cmd">
    <div class="bot-guide-cmd__header">
      <code class="bot-guide-cmd__name">/brief</code>
      <span class="badge badge--drop">500 ⭐</span>
    </div>
    <p>Generate a full analyst-ready threat brief. Includes top incidents ranked by severity, IOCs, MITRE ATT&CK mappings, and actionable recommendations.</p>
    <div class="bot-guide-pricing">
      <p><strong>One-time:</strong> 500 ⭐ (~$10)</p>
      <p><strong>Pro / Elite:</strong> Included free</p>
    </div>
  </div>

  <div class="bot-guide-cmd">
    <div class="bot-guide-cmd__header">
      <code class="bot-guide-cmd__name">/export</code>
      <span class="badge badge--live">1,000 ⭐</span>
    </div>
    <p>Generate a SIEM-ready IOC export pack. Structured data (CVEs, domains, IPs, hashes) ready to import into your security tools.</p>
    <div class="bot-guide-pricing">
      <p><strong>One-time:</strong> 1,000 ⭐ (~$20)</p>
      <p><strong>Elite:</strong> Included free</p>
    </div>
  </div>
</section>

<hr class="section-break">

<!-- ── Use Cases ── -->
<section class="bot-guide-section reveal">
  <h2>💡 Use Cases</h2>

  <div class="bot-guide-usecase">
    <h3>SOC Analyst — Morning Shift</h3>
    <ol>
      <li>Open bot → <code>/latest</code> to check overnight threats</li>
      <li>See a breach affecting a vendor → <code>/detect vendorname</code></li>
      <li>Click <strong>Splunk</strong> → copy-paste the detection rule into your SIEM</li>
      <li>Set up ongoing monitoring → <code>/watch vendorname.com</code></li>
    </ol>
  </div>

  <div class="bot-guide-usecase">
    <h3>Security Manager — Third-Party Risk</h3>
    <ol>
      <li>Add your key vendors → <code>/watch vendor1.com</code>, <code>/watch vendor2.com</code></li>
      <li>Set your SIEM → <code>/siem sentinel</code></li>
      <li>Enable weekly digest → <code>/siem digest on</code></li>
      <li>Every Sunday: get a summary of vendor threats + Sentinel KQL rules</li>
    </ol>
  </div>

  <div class="bot-guide-usecase">
    <h3>Threat Hunter — Investigating an Incident</h3>
    <ol>
      <li>Search the org → <code>/org targetcompany</code></li>
      <li>Check related actors → <code>/actor apt29</code></li>
      <li>Generate detection rules → <code>/detect targetcompany</code></li>
      <li>Export IOCs for your tools → <code>/export</code></li>
    </ol>
  </div>
</section>

<hr class="section-break">

<!-- ── Pricing ── -->
<section class="bot-guide-section reveal">
  <h2>💳 Pricing</h2>
  <p>Pay with Telegram Stars (⭐). No credit card, no signup, no subscription page — payment happens inside the chat.</p>

  <div class="bot-guide-pricing-table">
    <div class="bot-guide-tier">
      <h3>🆓 Free</h3>
      <ul>
        <li><code>/latest</code> — daily feed preview</li>
        <li><code>/sample</code> — weekly teaser</li>
        <li><code>/detect</code> — 1 free preview rule per search</li>
      </ul>
    </div>
    <div class="bot-guide-tier bot-guide-tier--pro">
      <h3>⭐ Pro</h3>
      <p class="bot-guide-tier__price">1,500 ⭐/month (~$30)</p>
      <ul>
        <li>All free features</li>
        <li>Full threat search (<code>/org</code>, <code>/breach</code>, <code>/actor</code>, <code>/malware</code>, <code>/country</code>)</li>
        <li>Watchlist — 5 orgs with real-time alerts</li>
        <li>Weekly threat brief (<code>/brief</code>)</li>
        <li>All detection packs included</li>
        <li>SIEM preferences + weekly digest</li>
      </ul>
    </div>
    <div class="bot-guide-tier bot-guide-tier--elite">
      <h3>🛡️ Elite</h3>
      <p class="bot-guide-tier__price">3,000 ⭐/month (~$60)</p>
      <ul>
        <li>Everything in Pro</li>
        <li>Watchlist — 25 orgs</li>
        <li>IOC export packs (<code>/export</code>)</li>
        <li>Priority alerts before public channel</li>
      </ul>
    </div>
  </div>
</section>

<hr class="section-break">

<!-- ── CTA ── -->
<section class="bot-guide-cta reveal">
  <div class="cs-cta__box">
    <h2 class="cs-cta__title">Ready to start?</h2>
    <p class="cs-cta__text">Open the bot in Telegram and type <code>/latest</code> to see today's threats. No signup needed.</p>
    <div class="cs-cta__actions">
      <a href="https://t.me/Shimiscyberworldbot" target="_blank" rel="noopener" class="btn btn--accent btn--lg">Open Intel Bot →</a>
      <a href="{{ '/premium/' | relative_url }}" class="btn btn--ghost">View Plans →</a>
    </div>
  </div>
</section>

</div>

<link rel="stylesheet" href="/assets/css/premium-tools.css?v=5">
<link rel="stylesheet" href="/assets/css/bot-guide.css?v=1">
