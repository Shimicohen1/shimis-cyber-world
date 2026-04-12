---
layout: page
title: ThreatLens
permalink: /ioc-scanner/
---

<div class="tool-hero tool-hero--intel">
  <div class="tool-hero__badge tool-hero__badge--purple">SCW INTEL</div>
  <h1 class="tool-hero__title">Threat<span class="tool-hero__accent tool-hero__accent--purple">Lens</span></h1>
  <p class="tool-hero__tagline">IOC Investigation Accelerator</p>
  <p class="tool-hero__desc">Paste any indicator — IP, hash, domain, URL, or email — and instantly get <strong>targeted lookup links</strong> across <strong>26 threat intelligence platforms</strong>. ThreatLens identifies the IOC type and routes you to the right tool with context on what to look for.</p>
  <div class="tool-hero__note"><span class="scw-icon" data-icon="zap"></span> <strong>How it works:</strong> ThreatLens doesn't query databases — it <em>identifies</em> your IOC type and generates direct investigation links to VirusTotal, Shodan, AbuseIPDB, and 23 more platforms. You click, they analyze.</div>
</div>

<section class="cs-intro reveal">
  <div class="tool-steps tool-steps--purple">
    <div class="tool-step"><span class="tool-step__num">1</span><div class="tool-step__body"><strong>Paste your IOCs</strong><span class="tool-step__detail">Raw indicators from alerts, reports, or tickets — bulk paste supported</span></div></div>
    <div class="tool-step"><span class="tool-step__num">2</span><div class="tool-step__body"><strong>Auto-classify</strong><span class="tool-step__detail">Engine detects IPv4, IPv6, MD5, SHA1, SHA256, domains, URLs, and emails</span></div></div>
    <div class="tool-step"><span class="tool-step__num">3</span><div class="tool-step__body"><strong>Investigate everywhere</strong><span class="tool-step__detail">Get platform-specific links with descriptions of what each source checks</span></div></div>
  </div>
  <div class="cs-intro__actions">
    <a href="{{ '/premium/' | relative_url }}" class="btn btn--ghost">All SCW Tools →</a>
  </div>
</section>

<hr class="section-break">

<!-- Scanner -->
<section id="scanner" class="ioc-scanner reveal">
  <div class="feed__header">
    <h2 class=\"feed__title\"><span class=\"label label--purple\">SCAN</span> &nbsp;Paste Indicators</h2>
  </div>

  <div class="ioc-input-area">
    <textarea id="iocInput" class="ioc-textarea" rows="8" placeholder="Paste IOCs here — one per line or comma-separated.&#10;&#10;Examples:&#10;  8.8.8.8&#10;  evil-domain.com&#10;  44d88612fea8a8f36de82e1278abb02f&#10;  https://malicious-site.xyz/payload&#10;  attacker@evil.com&#10;&#10;Supports: IPv4, IPv6, domains, MD5, SHA1, SHA256, URLs, emails" spellcheck="false"></textarea>
    <div class="ioc-input-actions">
      <button id="iocScanBtn" class="btn btn--primary"><span class="scw-icon" data-icon="search"></span> Scan</button>
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
        <span class="dl-stat__label">Total Scanned</span>
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
    <button id="iocExportCsv" class="btn btn--ghost"><span class="scw-icon" data-icon="file"></span> Export CSV</button>
    <button id="iocExportTxt" class="btn btn--ghost"><span class="scw-icon" data-icon="clipboard"></span> Export TXT (Defanged)</button>
    <button id="iocCopyAll" class="btn btn--ghost"><span class="scw-icon" data-icon="clipboard"></span> Copy All</button>
  </div>
</section>

<hr class="section-break">

<!-- Supported Sources -->
<section class="ioc-sources-section reveal">
  <div class="feed__header">
    <h2 class=\"feed__title\"><span class=\"label label--purple\">SOURCES</span> &nbsp;Threat Intel Platforms</h2>
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
    <h2 class="cs-cta__title">Save hours per investigation.</h2>
    <p class="cs-cta__text">Instead of opening 10 tabs and manually pasting each IOC — paste once, get all your investigation links in one view. Built for SOC analysts, IR teams, and threat hunters.</p>
    <div class="cs-cta__actions">
      <a href="{{ '/breach-radar/' | relative_url }}" class="btn btn--primary"><span class="scw-icon" data-icon="radar"></span> BreachRadar — Dark Web Intel →</a>
      <a href="{{ '/gofish/' | relative_url }}" class="btn btn--ghost"><span class="scw-icon" data-icon="anchor"></span> GoFish — Detect Phishing →</a>
    </div>
  </div>
</section>

<link rel="stylesheet" href="/assets/css/premium-tools.css?v=12">

<!-- Source data for JS -->
<script>
window.IOC_SOURCES = [
{% for src in site.data.ioc_sources.sources %}
  {
    name: {{ src.name | jsonify }},
    icon: {{ src.icon | jsonify }},
    types: {{ src.types | jsonify }},
    descs: {
      {% for pair in src.descs %}{{ pair[0] | jsonify }}: {{ pair[1] | jsonify }}{% unless forloop.last %},{% endunless %}
      {% endfor %}
    },
    urls: {
      {% for pair in src.urls %}{{ pair[0] | jsonify }}: {{ pair[1] | jsonify }}{% unless forloop.last %},{% endunless %}
      {% endfor %}
    }
  }{% unless forloop.last %},{% endunless %}
{% endfor %}
];

/* Tool-embedded product recommendations (data-driven from monetization.yml) */
window.IOC_TOOL_RECS = [
{% for rec in site.data.monetization.tool_recommendations %}
  { name: {{ rec.name | jsonify }}, desc: {{ rec.desc | jsonify }}, url: {{ rec.url | jsonify }}, badge: {{ rec.badge | jsonify }}, types: {{ rec.types | jsonify }} }{% unless forloop.last %},{% endunless %}
{% endfor %}
];
</script>
<script src="/assets/js/ioc-scanner.js?v=7" defer></script>
