---
layout: page
title: LockDown
permalink: /hardening/
---

{% assign harden_total = site.data.hardening.items | size %}
{% assign harden_platforms = site.data.hardening.items | map: "platform" | uniq | size %}
{% assign harden_categories = site.data.hardening.items | map: "category" | uniq | size %}

<div class="page-head">
  <div class="label label--elite page-head__label">SCW ELITE</div>
  <h1 class="page-head__title">LockDown</h1>
  <p class="page-head__desc">{{ harden_total }} hardening checks across {{ harden_platforms }} platforms. Pick your stack, get real commands, check them off, export the report.</p>
</div>

<section class="cs-intro reveal">
  <p>CIS Benchmarks, AWS Well-Architected, and real production hardening — distilled into copy-paste commands. Select a platform, work through the list, track your progress.</p>
  <div class="harden-hero-stats">
    <div class="harden-hero-stat"><span class="harden-hero-stat__num">{{ harden_total }}</span><span class="harden-hero-stat__label">Checks</span></div>
    <div class="harden-hero-stat"><span class="harden-hero-stat__num">{{ harden_platforms }}</span><span class="harden-hero-stat__label">Platforms</span></div>
    <div class="harden-hero-stat"><span class="harden-hero-stat__num">{{ harden_categories }}</span><span class="harden-hero-stat__label">Categories</span></div>
  </div>
  <div class="cs-intro__actions">
    <a href="#generator" class="btn btn--primary">Generate Checklist</a>
    <a href="{{ '/ioc-scanner/' | relative_url }}" class="btn btn--ghost">ThreatLens →</a>
  </div>
</section>

<hr class="section-break">

<!-- Search -->
<section class="harden-search reveal">
  <div class="harden-search__box">
    <svg class="harden-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <input type="text" id="hardenSearch" class="harden-search__input" placeholder="Search all {{ harden_total }} checks across {{ harden_platforms }} platforms…" autocomplete="off" spellcheck="false">
    <button id="hardenSearchClear" class="harden-search__clear" style="display:none;" title="Clear search">&times;</button>
  </div>
  <div id="hardenSearchInfo" class="harden-search__info" style="display:none;"></div>
</section>

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
    <button class="vault-filter" data-sev="critical"><span style="color:#ef4444;">&#9679;</span> Critical</button>
    <button class="vault-filter" data-sev="high"><span style="color:#f97316;">&#9679;</span> High</button>
    <button class="vault-filter" data-sev="medium"><span style="color:#eab308;">&#9679;</span> Medium</button>
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
  <button id="hardenExportMd" class="btn btn--ghost"><span class="scw-icon" data-icon="file"></span> Export Markdown</button>
  <button id="hardenCopyMd" class="btn btn--ghost"><span class="scw-icon" data-icon="clipboard"></span> Copy as Markdown</button>
  <button id="hardenReset" class="btn btn--ghost"><span class="scw-icon" data-icon="refresh"></span> Reset Checkmarks</button>
</div>

<hr class="section-break">

<!-- CTA -->
<section class="cs-cta reveal">
  <div class="cs-cta__box">
    <h2 class="cs-cta__title">Harden. Verify. Repeat.</h2>
    <p class="cs-cta__text">These checklists are aligned to CIS Benchmarks and real-world hardening procedures. New platforms and items ship regularly.</p>
    <div class="cs-cta__actions">
      <a href="{{ '/detections/' | relative_url }}" class="btn btn--primary">Detection Vault →</a>
      <a href="{{ '/premium/' | relative_url }}" class="btn btn--ghost">Explore SCW Elite</a>
    </div>
  </div>
</section>

<link rel="stylesheet" href="/assets/css/premium-tools.css?v=6">

<!-- Elite guidance info banner -->
<div id="hardenAuthBanner" class="harden-auth-banner" style="display:none;">
  <div class="harden-auth-banner__inner">
    <span class="harden-auth-banner__icon" data-icon="shield"></span>
    <div class="harden-auth-banner__text">
      <strong>Elite Guidance Available</strong>
      <span>Items marked with ★ include deeper context — attack perspectives, validation steps, detection logic, and tuning notes.</span>
    </div>
    <a href="{{ '/premium/' | relative_url }}" class="btn btn--ghost btn--sm harden-auth-banner__btn">Explore SCW Elite</a>
  </div>
</div>

<!-- Checklist data for JS (base data only — premium loaded lazily) -->
<script>
window.HARDEN_ITEMS = [
{% for item in site.data.hardening.items %}
  {
    id: {{ item.id | jsonify | replace: "</", "<\\/" }},
    platform: {{ item.platform | jsonify }},
    category: {{ item.category | jsonify }},
    severity: {{ item.severity | jsonify }},
    title: {{ item.title | jsonify | replace: "</", "<\\/" }},
    description: {{ item.description | jsonify | replace: "</", "<\\/" }},
    reference: {{ item.reference | jsonify | replace: "</", "<\\/" }},
    command: {{ item.command | jsonify | replace: "</", "<\\/" }},
    commandFull: {{ item.commandFull | jsonify | replace: "</", "<\\/" }},
    commandLanguage: {{ item.commandLanguage | jsonify | default: '"bash"' }},
    tags: {{ item.tags | jsonify | default: '[]' }},
    hasPremium: {% if item.premium %}true{% else %}false{% endif %}
  }{% unless forloop.last %},{% endunless %}
{% endfor %}
];
</script>
<script src="/assets/js/hardening.js?v=10" defer></script>
