---
layout: page
title: Detection Vault
permalink: /detections/
---

{% comment %}── Compute breach intel rule count (posts > 7 days with sigma_rules) ──{% endcomment %}
{% comment %}── TODO: Change back to 1209600 (14 days) after April 28 ──{% endcomment %}
{% assign vault_age_secs = 604800 %}
{% assign now_epoch = site.time | date: '%s' | plus: 0 %}
{% assign vault_cutoff = now_epoch | minus: vault_age_secs %}
{% assign breach_intel_count = 0 %}
{% for post in site.posts %}
  {% assign pe = post.date | date: '%s' | plus: 0 %}
  {% if post.sigma_rules and pe < vault_cutoff %}
    {% assign breach_intel_count = breach_intel_count | plus: 1 %}
  {% endif %}
{% endfor %}
{% assign total_rules = site.data.detections.rules | size | plus: breach_intel_count %}

<div class="page-head">
  <div class="label label--cyan page-head__label">SCW TOOLS</div>
  <h1 class="page-head__title">Detection Vault</h1>
  <p class="page-head__desc">Production-ready detection rules for real SOC environments. KQL, Sigma, and Splunk — mapped to MITRE ATT&CK. Copy, paste, detect.</p>
</div>

<section class="cs-intro reveal">
  <p>Every rule in this library is <strong>battle-tested</strong>. Written by security operators, validated in production environments, and mapped to MITRE ATT&CK techniques. All rules are <strong>free and open</strong> — use them in your SIEM today.</p>
  <div class="cs-intro__actions">
    <a href="#rules" class="btn btn--primary">Browse Rules</a>
    <a href="{{ '/playbooks/' | relative_url }}" class="btn btn--ghost">WarRoom →</a>
  </div>
</section>

<hr class="section-break">

<!-- Stats bar -->
<section class="dl-stats reveal">
  <div class="dl-stats__grid">
    <div class="dl-stat">
      <span class="dl-stat__number">{{ total_rules }}</span>
      <span class="dl-stat__label">Detection Rules</span>
    </div>
    <div class="dl-stat">
      <span class="dl-stat__number">{{ site.data.detections.platforms | size }}</span>
      <span class="dl-stat__label">Platforms</span>
    </div>
    <div class="dl-stat">
      <span class="dl-stat__number">{{ site.data.detections.categories | size }}</span>
      <span class="dl-stat__label">ATT&CK Categories</span>
    </div>
  </div>
</section>

<hr class="section-break">

<!-- Search & Filter -->
<section id="rules">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--cyan">RULES</span> &nbsp;Detection Rules</h2>
  </div>

  <div class="vault-controls">
    <div class="vault-search">
      <svg class="vault-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="text" id="dlSearch" class="vault-search__input" placeholder="Search rules, techniques, or keywords..." autocomplete="off">
      <span id="dlCount" class="vault-search__count">{{ site.data.detections.rules | size }}</span>
    </div>
    <div class="vault-filters" id="dlCategoryFilters">
      <button class="vault-filter active" data-filter="all">All</button>
      {% for cat in site.data.detections.categories %}
      <button class="vault-filter" data-filter="{{ cat | slugify }}">{{ cat }}</button>
      {% endfor %}
    </div>
    <div class="vault-filters dl-platform-filters" id="dlPlatformFilters">
      <button class="vault-filter active" data-filter="all">All Platforms</button>
      {% for plat in site.data.detections.platforms %}
      <button class="vault-filter" data-filter="{{ plat | slugify }}">{{ plat }}</button>
      {% endfor %}
    </div>
  </div>

  <!-- Rules Grid -->
  <div class="toolkit__grid" id="dlGrid">
    {% for rule in site.data.detections.rules %}
    <div class="tool-card dl-rule reveal" data-category="{{ rule.category | slugify }}" data-platform="{{ rule.platform | slugify }}" data-name="{{ rule.name | downcase }}" data-tags="{{ rule.tags | join: ' ' | downcase }}" data-mitre="{{ rule.mitre | downcase }}">
      <div class="tool-card__head">
        <h4>{{ rule.name }}</h4>
      </div>
      <p class="community-card__tagline">{{ rule.mitre }} — {{ rule.mitre_name }}</p>
      <p>{{ rule.description }}</p>
      <div class="dl-rule__meta">
        <span class="badge badge--{% if rule.severity == 'critical' %}live{% elsif rule.severity == 'high' %}signal{% elsif rule.severity == 'medium' %}drop{% else %}vault{% endif %}">{{ rule.severity }}</span>
        <span class="tag">{{ rule.platform }}</span>
      </div>
      {% if rule.tags %}
      <div class="tool-card__tags">
        {% for tag in rule.tags %}<span class="tag">{{ tag }}</span>{% endfor %}
      </div>
      {% endif %}

      <div class="dl-rule__code">
        <button class="dl-copy-btn" title="Copy to clipboard"><span class="scw-icon" data-icon="clipboard"></span></button>
        <pre><code>{{ rule.query | strip | xml_escape }}</code></pre>
      </div>

      {% if rule.notes %}
      <p class="dl-rule__notes"><strong><span class="scw-icon" data-icon="zap"></span> Note:</strong> {{ rule.notes }}</p>
      {% endif %}
    </div>
    {% endfor %}

    {% comment %}── Breach Intel Rules (auto-generated, 14+ days old) ──{% endcomment %}
    {% if breach_intel_count > 0 %}
    <div class="dl-section-divider">
      <span class="dl-section-divider__label">🔥 Breach Intelligence — auto-generated from real incidents</span>
    </div>
    {% for post in site.posts %}
      {% assign pe = post.date | date: '%s' | plus: 0 %}
      {% if post.sigma_rules and pe < vault_cutoff %}
      {% assign sev = post.sigma_rules.preview_level | default: 'medium' %}
      <div class="tool-card dl-rule dl-rule--breach reveal"
           data-category="{{ post.sigma_rules.preview_tactic | slugify }}"
           data-platform="multi-siem"
           data-name="{{ post.sigma_rules.preview_title | downcase }}"
           data-tags="{{ post.tags | join: ' ' | downcase }}"
           data-mitre="{{ post.sigma_rules.preview_technique | downcase }}"
           {% if post.sigma_rules.formats %}
           data-fmt-sigma="{{ post.sigma_rules.formats.sigma }}"
           data-fmt-splunk="{{ post.sigma_rules.formats.splunk }}"
           data-fmt-sentinel="{{ post.sigma_rules.formats.sentinel }}"
           data-fmt-elastic="{{ post.sigma_rules.formats.elastic }}"
           data-fmt-qradar="{{ post.sigma_rules.formats.qradar }}"
           {% elsif post.sigma_rules.preview_yaml_b64 %}
           data-fmt-sigma="{{ post.sigma_rules.preview_yaml_b64 }}"
           {% endif %}>
        <div class="tool-card__head">
          <h4>{{ post.sigma_rules.preview_title }}</h4>
          <span class="dl-breach-badge">Breach Intel</span>
        </div>
        <p class="community-card__tagline">{{ post.sigma_rules.preview_technique }} — {{ post.sigma_rules.preview_tactic }}</p>
        <p>Auto-generated from <a href="{{ post.url | relative_url }}">{{ post.title | truncate: 60 }}</a></p>
        <div class="dl-rule__meta">
          <span class="badge badge--{% if sev == 'critical' %}live{% elsif sev == 'high' %}signal{% elsif sev == 'medium' %}drop{% else %}vault{% endif %}">{{ sev }}</span>
          <span class="tag">Multi-SIEM</span>
          <span class="tag">{{ post.date | date: "%b %d, %Y" }}</span>
        </div>
        {% if post.sigma_rules.formats %}
        <div class="dl-siem-tabs">
          <button class="dl-siem-tab dl-siem-tab--active" data-fmt="sigma">Sigma</button>
          <button class="dl-siem-tab" data-fmt="splunk">Splunk</button>
          <button class="dl-siem-tab" data-fmt="sentinel">Sentinel</button>
          <button class="dl-siem-tab" data-fmt="elastic">Elastic</button>
          <button class="dl-siem-tab" data-fmt="qradar">QRadar</button>
        </div>
        {% endif %}
        <div class="dl-rule__code">
          <button class="dl-copy-btn" title="Copy to clipboard"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code class="dl-siem-code"></code></pre>
        </div>
        {% if post.sigma_rules.paid_count and post.sigma_rules.paid_count > 0 %}
        <p class="dl-rule__notes"><strong>🛡️</strong> {{ post.sigma_rules.paid_count }} more rules available via <a href="https://t.me/Shimiscyberworldbot?start=detect" target="_blank" rel="noopener">Intel Bot</a></p>
        {% endif %}
      </div>
      {% endif %}
    {% endfor %}
    {% endif %}
  </div>

  <div class="empty-state" id="dlEmpty" style="display:none; margin-top: 2rem;">
    <p>No matching rules found. Try adjusting your filters.</p>
  </div>
</section>

<hr class="section-break">

<!-- CTA -->
<section class="cs-cta reveal">
  <div class="cs-cta__box">
    <h2 class="cs-cta__title">New rules ship regularly.</h2>
    <p class="cs-cta__text">{{ total_rules }} production-ready queries and growing. Subscribe to get notified when new detection rules drop.</p>
    <div class="cs-cta__actions">
      <a href="{{ '/playbooks/' | relative_url }}" class="btn btn--primary">WarRoom →</a>
      <a href="{{ '/' | relative_url }}" class="btn btn--ghost">Back to Feed</a>
    </div>
  </div>
</section>

<link rel="stylesheet" href="/assets/css/premium-tools.css?v=4">
<script src="{{ '/assets/js/detections.js' | relative_url }}" defer></script>
