---
layout: page
title: BreachRadar
permalink: /breach-radar/
---

<div class="page-head">
  <div class="label label--signal page-head__label">SCW ELITE</div>
  <h1 class="page-head__title">BreachRadar</h1>
  <p class="page-head__desc">Search if a company or domain has been claimed by ransomware groups or appeared on dark web leak sites. Live data from 558 tracked threat actors.</p>
</div>

<section class="cs-intro reveal">
  <div class="ioc-how-it-works">
    <div class="ioc-step"><span class="ioc-step__num">1</span><span class="ioc-step__text">Enter a company name or domain</span></div>
    <div class="ioc-step"><span class="ioc-step__num">2</span><span class="ioc-step__text">BreachRadar queries ransomware leak site databases in real-time</span></div>
    <div class="ioc-step"><span class="ioc-step__num">3</span><span class="ioc-step__text">Get a threat dossier — timeline, groups, evidence, and action items</span></div>
  </div>
  <div class="cs-intro__actions">
    <a href="{{ '/premium/' | relative_url }}" class="btn btn--ghost">All SCW Tools →</a>
  </div>
</section>

<hr class="section-break">

<!-- Scanner -->
<section id="scanner" class="br-scanner reveal">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--signal">SCAN</span> &nbsp;Search Domain or Company</h2>
  </div>

  <div class="br-input-area">
    <div class="br-input-wrap">
      <span class="br-input-icon">📡</span>
      <input id="brInput" type="text" class="br-input" placeholder="Enter domain (e.g. acme.com) or company name…" spellcheck="false" autocomplete="off">
      <button id="brScanBtn" class="btn btn--primary br-scan-btn">Scan</button>
    </div>
    <div class="br-input-hints">
      <span>Try: <button class="br-hint" data-q="microsoft">microsoft</button></span>
      <span><button class="br-hint" data-q="boeing">boeing</button></span>
      <span><button class="br-hint" data-q="toyota">toyota</button></span>
      <span><button class="br-hint" data-q="hospital">hospital</button></span>
    </div>
  </div>

  <!-- Loading -->
  <div id="brLoading" class="br-loading" style="display:none">
    <div class="br-radar">
      <div class="br-radar__ring br-radar__ring--1"></div>
      <div class="br-radar__ring br-radar__ring--2"></div>
      <div class="br-radar__ring br-radar__ring--3"></div>
      <div class="br-radar__dot"></div>
      <div class="br-radar__sweep"></div>
    </div>
    <p class="br-loading__text">Scanning dark web leak sites…</p>
  </div>

  <!-- Results -->
  <div id="brResults" class="br-results"></div>
</section>

<hr class="section-break">

<!-- Disclaimer -->
<section class="br-disclaimer reveal">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--ghost">LEGAL</span> &nbsp;Disclaimer</h2>
  </div>
  <div class="br-disclaimer__box">
    <p><strong>⚖️ Important:</strong> BreachRadar aggregates publicly available data from ransomware group leak sites and open-source threat intelligence feeds. This tool does <strong>not</strong> access, interact with, or host any data from the dark web. All data is sourced through legitimate third-party APIs.</p>
    <p>Results may include <strong>unverified claims</strong> made by threat actors. Inclusion in this database does not confirm a breach occurred. We do not guarantee the accuracy, completeness, or reliability of any result. Organizations should conduct their own forensic investigation if a match is found.</p>
    <p>This tool is intended for <strong>security research and awareness purposes only</strong>. By using BreachRadar, you agree to our <a href="/terms/">Terms of Service</a>.</p>
  </div>
</section>

<hr class="section-break">

<!-- How it works / Sources -->
<section class="br-sources reveal">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--cyan">SOURCES</span> &nbsp;Intelligence Sources</h2>
  </div>
  <div class="br-sources__grid">
    <div class="br-source-card">
      <span class="br-source-card__icon">🕸️</span>
      <strong>Ransomware Leak Sites</strong>
      <p>558 ransomware and extortion groups tracked across .onion and clearnet leak sites via RansomLook. Over 30,000 victim posts indexed.</p>
    </div>
    <div class="br-source-card">
      <span class="br-source-card__icon">💧</span>
      <strong>Data Leak Monitoring</strong>
      <p>4,400+ documented data leaks cross-referenced with victim claims. Includes leak size, record counts, and exposure timelines.</p>
    </div>
    <div class="br-source-card">
      <span class="br-source-card__icon">🔗</span>
      <strong>Threat Actor Intelligence</strong>
      <p>29 threat actors profiled with crypto addresses, ransom notes, and relay status. Group profiles link directly to RansomLook.</p>
    </div>
    <div class="br-source-card">
      <span class="br-source-card__icon">🔍</span>
      <strong>External Investigation Links</strong>
      <p>Each scan result includes direct links to Have I Been Pwned, Shodan, VirusTotal, IntelX, and Telegram monitoring channels for deeper investigation.</p>
    </div>
  </div>
</section>

<hr class="section-break">

<!-- CTA -->
<section class="cs-cta reveal">
  <div class="cs-cta__box">
    <h2 class="cs-cta__title">Knowledge is your first line of defense.</h2>
    <p class="cs-cta__text">BreachRadar is powered by <a href="https://www.ransomlook.io" target="_blank" rel="noopener noreferrer">RansomLook</a> — open-source ransomware intelligence tracking 558 groups and 30,000+ victim posts. Data is refreshed continuously.</p>
    <div class="cs-cta__actions">
      <a href="{{ '/ioc-scanner/' | relative_url }}" class="btn btn--primary">ThreatLens →</a>
      <a href="{{ '/gofish/' | relative_url }}" class="btn btn--ghost">GoFish →</a>
    </div>
  </div>
</section>

<link rel="stylesheet" href="/assets/css/premium-tools.css?v=11">
<script>
window.IOC_TOOL_RECS = [
  {% for rec in site.data.monetization.tool_recommendations %}
  { name: {{ rec.name | jsonify }}, desc: {{ rec.desc | jsonify }}, url: {{ rec.url | jsonify }}, badge: {{ rec.badge | jsonify }}, types: {{ rec.types | jsonify }} }{% unless forloop.last %},{% endunless %}
  {% endfor %}
];
</script>
<script src="/assets/js/breach-radar.js?v=4" defer></script>
