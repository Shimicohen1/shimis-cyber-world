---
layout: page
title: GoFish
permalink: /gofish/
---

<div class="tool-hero tool-hero--phish">
  <div class="tool-hero__badge tool-hero__badge--amber">SCW SHIELD</div>
  <h1 class="tool-hero__title">Go<span class="tool-hero__accent tool-hero__accent--amber">Fish</span></h1>
  <p class="tool-hero__tagline">Phishing & Smishing Detection Engine</p>
  <p class="tool-hero__desc">Got a sus link or sketchy SMS? Paste it here. GoFish runs <strong>25+ heuristic checks</strong> — URL manipulation, brand impersonation, urgency patterns, and Israeli scam templates — all <strong>client-side, zero data sent anywhere</strong>.</p>
  <div class="tool-hero__note"><span class="scw-icon" data-icon="shield"></span> <strong>Your data stays local:</strong> GoFish runs entirely in your browser. Nothing is sent to any server — ever. Perfect for checking links you're not sure about.</div>
</div>

<section class="cs-intro reveal">
  <div class="tool-steps tool-steps--amber">
    <div class="tool-step"><span class="tool-step__num">1</span><div class="tool-step__body"><strong>Paste the suspect</strong><span class="tool-step__detail">A URL, an SMS, a WhatsApp message — anything with a link</span></div></div>
    <div class="tool-step"><span class="tool-step__num">2</span><div class="tool-step__body"><strong>Instant analysis</strong><span class="tool-step__detail">25+ checks including URL tricks, brand spoofing, Hebrew/English urgency patterns</span></div></div>
    <div class="tool-step"><span class="tool-step__num">3</span><div class="tool-step__body"><strong>Verdict + proof</strong><span class="tool-step__detail">Risk score, every red flag explained, and external verification links</span></div></div>
  </div>
  <div class="cs-intro__actions">
    <a href="{{ '/premium/' | relative_url }}" class="btn btn--ghost">All SCW Tools →</a>
  </div>
</section>

<hr class="section-break">

<!-- Scanner -->
<section id="scanner" class="gofish-scanner reveal">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--amber">SCAN</span> &nbsp;Paste URL or SMS</h2>
  </div>

  <div class="gofish-input-area">
    <textarea id="gofishInput" class="ioc-textarea gofish-textarea" rows="4" placeholder="Paste a suspicious URL or SMS text here… (Enter to scan, Shift+Enter for new line)&#10;&#10;Examples:&#10;  https://amaz0n-security.xyz/verify?id=839201&#10;  ברצוננו ליידע כי קיים חוב עבור נסיעות בכביש 6: https://m-r.pw/axIa" spellcheck="false"></textarea>
    <div class="gofish-input-actions">
      <button id="gofishScanBtn" class="btn btn--primary"><span class="scw-icon" data-icon="anchor"></span> Analyze for Phishing</button>
      <button id="gofishClearBtn" class="btn btn--ghost">Clear</button>
    </div>
  </div>

  <!-- Results -->
  <div id="gofishResults" class="gofish-results"></div>
</section>

<hr class="section-break">

<!-- Info -->
<section class="gofish-info reveal">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--cyan">INFO</span> &nbsp;What GoFish Detects</h2>
  </div>
  <div class="gofish-detect-grid">
    <div class="gofish-detect-card">
      <span class="gofish-detect-card__icon" data-icon="link"></span>
      <strong>URL Manipulation</strong>
      <p>Suspicious TLDs, URL shorteners, IP-based URLs, excessive subdomains, homograph attacks, encoded characters</p>
    </div>
    <div class="gofish-detect-card">
      <span class="gofish-detect-card__icon" data-icon="shield"></span>
      <strong>Brand Impersonation</strong>
      <p>Lookalike domains mimicking banks, tech companies, payment services, delivery companies, and government agencies</p>
    </div>
    <div class="gofish-detect-card">
      <span class="gofish-detect-card__icon" data-icon="zap"></span>
      <strong>Urgency & Pressure</strong>
      <p>Threatening language, account suspension claims, "act now" pressure, time-limited offers, scare tactics</p>
    </div>
    <div class="gofish-detect-card">
      <span class="gofish-detect-card__icon" data-icon="file"></span>
      <strong>SMS Patterns</strong>
      <p>Smishing templates, delivery scams, verification code lures, prize/lottery messages, Hebrew phishing patterns</p>
    </div>
  </div>
</section>

<hr class="section-break">

<!-- CTA -->
<section class="cs-cta reveal">
  <div class="cs-cta__box">
    <h2 class="cs-cta__title">Think before you click.</h2>
    <p class="cs-cta__text">GoFish catches phishing patterns that bypass spam filters. It analyzes entirely in your browser — zero data leaves your device. For deeper investigation, use the external verification links provided with each result.</p>
    <div class="cs-cta__actions">
      <a href="{{ '/breach-radar/' | relative_url }}" class="btn btn--primary"><span class="scw-icon" data-icon="radar"></span> BreachRadar — Dark Web Intel →</a>
      <a href="{{ '/ioc-scanner/' | relative_url }}" class="btn btn--ghost"><span class="scw-icon" data-icon="search"></span> ThreatLens — Investigate IOCs →</a>
    </div>
  </div>
</section>

<link rel="stylesheet" href="/assets/css/premium-tools.css?v=12">
<script>
window.IOC_TOOL_RECS = [
  {% for rec in site.data.monetization.tool_recommendations %}
  { name: {{ rec.name | jsonify }}, desc: {{ rec.desc | jsonify }}, url: {{ rec.url | jsonify }}, badge: {{ rec.badge | jsonify }}, types: {{ rec.types | jsonify }} }{% unless forloop.last %},{% endunless %}
  {% endfor %}
];
</script>
<script src="/assets/js/gofish.js?v=6" defer></script>
