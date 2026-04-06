---
layout: page
title: GoFish
permalink: /gofish/
---

<div class="page-head">
  <div class="label label--cyan page-head__label">SCW TOOLS</div>
  <h1 class="page-head__title">GoFish</h1>
  <p class="page-head__desc">Paste a suspicious URL or SMS message — get an instant phishing risk analysis with detailed breakdown, red flags, and external verification links.</p>
</div>

<section class="cs-intro reveal">
  <div class="ioc-how-it-works">
    <div class="ioc-step"><span class="ioc-step__num">1</span><span class="ioc-step__text">Paste a suspicious URL or SMS message</span></div>
    <div class="ioc-step"><span class="ioc-step__num">2</span><span class="ioc-step__text">GoFish analyzes 20+ phishing indicators in real-time</span></div>
    <div class="ioc-step"><span class="ioc-step__num">3</span><span class="ioc-step__text">Get a risk score, red flags, and verification links</span></div>
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
    <textarea id="gofishInput" class="ioc-textarea gofish-textarea" rows="5" placeholder="Paste a suspicious URL or SMS text here…&#10;&#10;Examples:&#10;  https://amaz0n-security.xyz/verify?id=839201&#10;  Your account has been locked! Verify now: bit.ly/3xK9mQ2&#10;  הודעה מהבנק: החשבון שלך ייחסם. לחץ כאן: https://leumi-secure.tk/login" spellcheck="false"></textarea>
    <div class="gofish-input-actions">
      <button id="gofishScanBtn" class="btn btn--primary">🎣 Analyze for Phishing</button>
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
      <span class="gofish-detect-card__icon">🔗</span>
      <strong>URL Manipulation</strong>
      <p>Suspicious TLDs, URL shorteners, IP-based URLs, excessive subdomains, homograph attacks, encoded characters</p>
    </div>
    <div class="gofish-detect-card">
      <span class="gofish-detect-card__icon">🏦</span>
      <strong>Brand Impersonation</strong>
      <p>Lookalike domains mimicking banks, tech companies, payment services, delivery companies, and government agencies</p>
    </div>
    <div class="gofish-detect-card">
      <span class="gofish-detect-card__icon">⚡</span>
      <strong>Urgency & Pressure</strong>
      <p>Threatening language, account suspension claims, "act now" pressure, time-limited offers, scare tactics</p>
    </div>
    <div class="gofish-detect-card">
      <span class="gofish-detect-card__icon">📱</span>
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
    <p class="cs-cta__text">GoFish is a client-side heuristic scanner — it analyzes patterns without sending your data anywhere. For deeper analysis, use the external verification links provided.</p>
    <div class="cs-cta__actions">
      <a href="{{ '/ioc-scanner/' | relative_url }}" class="btn btn--primary">ThreatLens →</a>
      <a href="{{ '/premium/' | relative_url }}" class="btn btn--ghost">All SCW Tools</a>
    </div>
  </div>
</section>

<link rel="stylesheet" href="/assets/css/premium-tools.css?v=8">
<script src="/assets/js/gofish.js?v=1" defer></script>
