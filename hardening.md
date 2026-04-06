---
layout: page
title: Hardening Checklist Generator
permalink: /hardening/
---

<div class="page-head">
  <div class="label label--cyan page-head__label">SCW TOOLS</div>
  <h1 class="page-head__title">Hardening Checklist Generator</h1>
  <p class="page-head__desc">Select your platform — get an actionable, CIS-aligned security hardening checklist with real commands. Check items off as you go and export your progress.</p>
</div>

<section class="cs-intro reveal">
  <p>Built from <strong>CIS Benchmarks</strong>, AWS Well-Architected, and production hardening experience. Each item includes severity, reference, and copy-paste commands. Select a platform below to generate your checklist.</p>
  <div class="cs-intro__actions">
    <a href="#generator" class="btn btn--primary">Generate Checklist</a>
    <a href="{{ '/ioc-scanner/' | relative_url }}" class="btn btn--ghost">IOC Scanner →</a>
  </div>
</section>

<hr class="section-break">

<!-- Generator -->
<section id="generator" class="harden-generator reveal">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--cyan">SELECT</span> &nbsp;Choose Platform</h2>
  </div>

  <div class="harden-platforms" id="hardenPlatforms">
    {% for p in site.data.hardening.platforms %}
    <button class="harden-platform-btn" data-platform="{{ p.id }}">
      <span class="harden-platform-btn__icon">{{ p.icon }}</span>
      <span class="harden-platform-btn__name">{{ p.name }}</span>
      <span class="harden-platform-btn__count">
        {{ site.data.hardening.items | where: "platform", p.id | size }} items
      </span>
    </button>
    {% endfor %}
  </div>

  <!-- Category filter -->
  <div id="hardenCatFilters" class="vault-filters harden-cat-filters" style="display:none;">
    <button class="vault-filter active" data-cat="all">All Categories</button>
    {% for cat in site.data.hardening.categories %}
    <button class="vault-filter" data-cat="{{ cat.id }}">{{ cat.icon }} {{ cat.name }}</button>
    {% endfor %}
  </div>

  <!-- Severity filter -->
  <div id="hardenSevFilters" class="vault-filters harden-sev-filters" style="display:none;">
    <button class="vault-filter active" data-sev="all">All Severities</button>
    <button class="vault-filter" data-sev="critical">🔴 Critical</button>
    <button class="vault-filter" data-sev="high">🟠 High</button>
    <button class="vault-filter" data-sev="medium">🟡 Medium</button>
  </div>

  <!-- Progress bar -->
  <div id="hardenProgress" class="harden-progress" style="display:none;">
    <div class="harden-progress__bar">
      <div class="harden-progress__fill" id="hardenProgressFill"></div>
    </div>
    <span class="harden-progress__text" id="hardenProgressText">0 / 0 completed</span>
  </div>

  <!-- Stats -->
  <div id="hardenStats" class="ioc-stats" style="display:none;">
    <div class="dl-stats__grid">
      <div class="dl-stat">
        <span class="dl-stat__number" id="hardenTotal">0</span>
        <span class="dl-stat__label">Total Items</span>
      </div>
      <div class="dl-stat">
        <span class="dl-stat__number" id="hardenCritical">0</span>
        <span class="dl-stat__label">Critical</span>
      </div>
      <div class="dl-stat">
        <span class="dl-stat__number" id="hardenHigh">0</span>
        <span class="dl-stat__label">High</span>
      </div>
      <div class="dl-stat">
        <span class="dl-stat__number" id="hardenDone">0</span>
        <span class="dl-stat__label">Completed</span>
      </div>
    </div>
  </div>
</section>

<hr class="section-break" id="hardenBreak" style="display:none;">

<!-- Checklist items -->
<section id="hardenList" class="harden-list"></section>

<!-- Export -->
<div id="hardenExport" class="ioc-export" style="display:none;">
  <button id="hardenExportMd" class="btn btn--ghost">📄 Export Markdown</button>
  <button id="hardenCopyMd" class="btn btn--ghost">📋 Copy as Markdown</button>
  <button id="hardenReset" class="btn btn--ghost">🔄 Reset Checkmarks</button>
</div>

<hr class="section-break">

<!-- CTA -->
<section class="cs-cta reveal">
  <div class="cs-cta__box">
    <h2 class="cs-cta__title">Harden. Verify. Repeat.</h2>
    <p class="cs-cta__text">These checklists are aligned to CIS Benchmarks and real-world hardening procedures. New platforms and items ship regularly.</p>
    <div class="cs-cta__actions">
      <a href="{{ '/detections/' | relative_url }}" class="btn btn--primary">Detection Library →</a>
      <a href="{{ '/premium/' | relative_url }}" class="btn btn--ghost">All SCW Tools</a>
    </div>
  </div>
</section>

<link rel="stylesheet" href="/assets/css/premium-tools.css?v=3">

<!-- Checklist data for JS -->
<script>
window.HARDEN_ITEMS = [
{% for item in site.data.hardening.items %}
  {
    id: {{ item.id | jsonify }},
    platform: {{ item.platform | jsonify }},
    category: {{ item.category | jsonify }},
    severity: {{ item.severity | jsonify }},
    title: {{ item.title | jsonify }},
    description: {{ item.description | jsonify }},
    reference: {{ item.reference | jsonify }},
    command: {{ item.command | jsonify }}
  }{% unless forloop.last %},{% endunless %}
{% endfor %}
];
</script>
<script src="/assets/js/hardening.js" defer></script>
