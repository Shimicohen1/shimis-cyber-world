---
layout: page
title: IOC Scanner
permalink: /ioc-scanner/
---

<div class="page-head">
  <div class="label label--cyan page-head__label">SCW TOOLS</div>
  <h1 class="page-head__title">IOC Scanner</h1>
  <p class="page-head__desc">Paste indicators of compromise — IPs, domains, hashes, URLs, emails — and instantly get lookup links across 15+ threat intelligence platforms. No API keys. No signup. Just paste and investigate.</p>
</div>

<section class="cs-intro reveal">
  <p>Bulk-process indicators in seconds. The scanner <strong>auto-detects</strong> indicator types, deduplicates, defangs for safe sharing, and generates direct links to VirusTotal, AbuseIPDB, Shodan, OTX, MalwareBazaar, and more.</p>
  <div class="cs-intro__actions">
    <a href="#scanner" class="btn btn--primary">Start Scanning</a>
    <a href="{{ '/detections/' | relative_url }}" class="btn btn--ghost">Detection Library →</a>
  </div>
</section>

<hr class="section-break">

<!-- Scanner -->
<section id="scanner" class="ioc-scanner reveal">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--cyan">SCAN</span> &nbsp;Paste Indicators</h2>
  </div>

  <div class="ioc-input-area">
    <textarea id="iocInput" class="ioc-textarea" rows="8" placeholder="Paste IOCs here — one per line or comma-separated.&#10;&#10;Examples:&#10;  8.8.8.8&#10;  evil-domain.com&#10;  44d88612fea8a8f36de82e1278abb02f&#10;  https://malicious-site.xyz/payload&#10;  attacker@evil.com&#10;&#10;Supports: IPv4, IPv6, domains, MD5, SHA1, SHA256, URLs, emails" spellcheck="false"></textarea>
    <div class="ioc-input-actions">
      <button id="iocScanBtn" class="btn btn--primary">🔍 Scan IOCs</button>
      <button id="iocClearBtn" class="btn btn--ghost">Clear</button>
      <label class="ioc-toggle">
        <input type="checkbox" id="iocDefang" checked>
        <span>Defang output</span>
      </label>
    </div>
  </div>

  <!-- Stats -->
  <div id="iocStats" class="ioc-stats" style="display:none;">
    <div class="dl-stats__grid">
      <div class="dl-stat">
        <span class="dl-stat__number" id="iocTotalCount">0</span>
        <span class="dl-stat__label">Total IOCs</span>
      </div>
      <div class="dl-stat">
        <span class="dl-stat__number" id="iocUniqueCount">0</span>
        <span class="dl-stat__label">Unique</span>
      </div>
      <div class="dl-stat">
        <span class="dl-stat__number" id="iocTypeCount">0</span>
        <span class="dl-stat__label">Types Found</span>
      </div>
      <div class="dl-stat">
        <span class="dl-stat__number" id="iocDupeCount">0</span>
        <span class="dl-stat__label">Duplicates</span>
      </div>
    </div>
  </div>

  <!-- Type filter -->
  <div id="iocFilters" class="vault-filters ioc-filters" style="display:none;">
    <button class="vault-filter active" data-type="all">All</button>
  </div>

  <!-- Results -->
  <div id="iocResults" class="ioc-results"></div>

  <!-- Export -->
  <div id="iocExport" class="ioc-export" style="display:none;">
    <button id="iocExportCsv" class="btn btn--ghost">📄 Export CSV</button>
    <button id="iocExportTxt" class="btn btn--ghost">📋 Export TXT (Defanged)</button>
    <button id="iocCopyAll" class="btn btn--ghost">📋 Copy All</button>
  </div>
</section>

<hr class="section-break">

<!-- Supported Sources -->
<section class="ioc-sources-section reveal">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--amber">SOURCES</span> &nbsp;Threat Intel Platforms</h2>
  </div>
  <div class="ioc-sources-grid">
    {% for src in site.data.ioc_sources.sources %}
    <div class="ioc-source-chip">
      <span class="ioc-source-chip__icon">{{ src.icon }}</span>
      <span class="ioc-source-chip__name">{{ src.name }}</span>
      <span class="ioc-source-chip__types">{{ src.types | join: ", " }}</span>
    </div>
    {% endfor %}
  </div>
</section>

<hr class="section-break">

<!-- CTA -->
<section class="cs-cta reveal">
  <div class="cs-cta__box">
    <h2 class="cs-cta__title">Built for SOC analysts.</h2>
    <p class="cs-cta__text">Paste IOCs from alerts, threat reports, or incident tickets. Get instant lookup links. No context switching, no API rate limits.</p>
    <div class="cs-cta__actions">
      <a href="{{ '/playbooks/' | relative_url }}" class="btn btn--primary">Incident Playbooks →</a>
      <a href="{{ '/premium/' | relative_url }}" class="btn btn--ghost">All SCW Tools</a>
    </div>
  </div>
</section>

<link rel="stylesheet" href="/assets/css/premium-tools.css?v=3">

<!-- Source data for JS -->
<script>
window.IOC_SOURCES = [
{% for src in site.data.ioc_sources.sources %}
  {
    name: {{ src.name | jsonify }},
    icon: {{ src.icon | jsonify }},
    types: {{ src.types | jsonify }},
    urls: {
      {% for pair in src.urls %}{{ pair[0] | jsonify }}: {{ pair[1] | jsonify }}{% unless forloop.last %},{% endunless %}
      {% endfor %}
    }
  }{% unless forloop.last %},{% endunless %}
{% endfor %}
];
</script>
<script src="/assets/js/ioc-scanner.js" defer></script>
