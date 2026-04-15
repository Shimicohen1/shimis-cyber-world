---
layout: page
title: Detection Vault
permalink: /detections/
---

{% comment %}── Compute breach intel rule count (posts > 14 days with sigma_rules, deduplicated) ──{% endcomment %}
{% assign vault_age_secs = 1209600 %}
{% assign now_epoch = site.time | date: '%s' | plus: 0 %}
{% assign vault_cutoff = now_epoch | minus: vault_age_secs %}
{% assign breach_intel_count = 0 %}
{% assign counted_titles = "" %}
{% for post in site.posts %}
  {% assign pe = post.date | date: '%s' | plus: 0 %}
  {% if post.sigma_rules and pe < vault_cutoff %}
    {% assign ctkey = post.sigma_rules.preview_title | downcase | strip %}
    {% assign ctcheck = "||" | append: ctkey | append: "||" %}
    {% unless counted_titles contains ctcheck %}
      {% assign counted_titles = counted_titles | append: ctcheck %}
      {% assign breach_intel_count = breach_intel_count | plus: 1 %}
    {% endunless %}
  {% endif %}
{% endfor %}
{% assign total_rules = site.data.detections.rules | size | plus: breach_intel_count %}

<div class="page-head">
  <div class="label label--cyan page-head__label">SCW TOOLS</div>
  <h1 class="page-head__title">Detection Vault</h1>
  <p class="page-head__desc">Production-ready detection rules for real SOC environments. KQL, Sigma, Splunk, and Wazuh — mapped to MITRE ATT&CK. Copy, paste, detect.</p>
</div>

<section class="cs-intro reveal">
  <p>Every rule in this library is <strong>battle-tested</strong>. Written by security operators, validated in production environments, and mapped to MITRE ATT&CK techniques. All rules are <strong>free and open</strong> — use them in your SIEM today.</p>
  <div class="cs-intro__actions">
    <a href="#rules" class="btn btn--primary">Browse Rules</a>
    <a href="{{ '/playbooks/' | relative_url }}" class="btn btn--ghost">WarRoom →</a>
  </div>
</section>

<!-- Breach-specific CTA -->
<section class="cs-cta reveal" style="margin: 2rem 0;">
  <div class="cs-cta__box" style="background: linear-gradient(135deg, var(--bg-card) 0%, rgba(0,200,255,0.05) 100%); border-left: 3px solid var(--accent);">
    <h3 style="margin-top:0;">🛡️ Need rules for a specific breach?</h3>
    <p>The rules below are generic detection patterns. Our Intel Bot generates <strong>Sigma rules tailored to real breaches</strong> — mapped to the exact ATT&CK techniques observed in each incident. Pick your SIEM and get a ready-to-paste query.</p>
    <div class="cs-cta__actions">
      <a href="https://t.me/Shimiscyberworldbot?start=detect" class="btn btn--accent btn--sm" target="_blank" rel="noopener">Generate Breach Rules →</a>
      <span style="color: var(--text-muted); font-size: 0.85rem;">Free: 1 rule per breach · Full pack: 250 ⭐ · Included with Pro/Elite</span>
    </div>
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

    {% comment %}── Breach Intel Rules (auto-generated, 14+ days old, deduplicated) ──{% endcomment %}
    {% assign seen_titles = "" %}
    {% assign unique_breach_count = 0 %}
    {% for post in site.posts %}
      {% assign pe = post.date | date: '%s' | plus: 0 %}
      {% if post.sigma_rules and pe < vault_cutoff %}
        {% assign rule_key = post.sigma_rules.preview_title | downcase | strip %}
        {% assign rule_check = "||" | append: rule_key | append: "||" %}
        {% unless seen_titles contains rule_check %}
          {% assign seen_titles = seen_titles | append: rule_check %}
          {% assign unique_breach_count = unique_breach_count | plus: 1 %}
      {% assign sev = post.sigma_rules.preview_level | default: 'medium' %}
      <div class="tool-card dl-rule dl-rule--breach reveal"
           data-category="{{ post.sigma_rules.preview_tactic | slugify }}"
           data-platform="multi-siem"
           data-name="{{ post.sigma_rules.preview_title | downcase }}"
           data-tags="{{ post.tags | join: ' ' | downcase }}"
           data-mitre="{{ post.sigma_rules.preview_technique | downcase }}"
           {% if post.sigma_rules.formats %}
           data-fmt-sigma="{{ post.sigma_rules.formats.sigma }}"
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
          <span class="tag">Sigma</span>
          <span class="tag">{{ post.date | date: "%b %d, %Y" }}</span>
        </div>
        <div class="dl-rule__code">
          <button class="dl-copy-btn" title="Copy to clipboard"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code class="dl-siem-code"></code></pre>
        </div>
        <div class="sigma-siem-locked sigma-siem-locked--vault">
          <span class="sigma-gated__chip sigma-gated__chip--locked">🔒 Splunk SPL</span>
          <span class="sigma-gated__chip sigma-gated__chip--locked">🔒 Sentinel KQL</span>
          <span class="sigma-gated__chip sigma-gated__chip--locked">🔒 Elastic</span>
          <span class="sigma-gated__chip sigma-gated__chip--locked">🔒 QRadar AQL</span>
          <span class="sigma-gated__chip sigma-gated__chip--locked">🔒 Wazuh</span>
          <a href="https://t.me/Shimiscyberworldbot?start=detect" class="sigma-gated__unlock" target="_blank" rel="noopener">Unlock SIEM Formats →</a>
        </div>
        {% if post.sigma_rules.paid_count and post.sigma_rules.paid_count > 0 %}
        <p class="dl-rule__notes"><strong>🛡️</strong> {{ post.sigma_rules.paid_count }} more rules — type <code>/detect</code> in <a href="https://t.me/Shimiscyberworldbot?start=detect" target="_blank" rel="noopener">Intel Bot</a></p>
        {% endif %}
      </div>
        {% endunless %}
      {% endif %}
    {% endfor %}
    {% if unique_breach_count > 0 %}
    <div class="dl-section-divider" style="order: -1;">
      <span class="dl-section-divider__label">🔥 Breach Intelligence — {{ unique_breach_count }} unique rules auto-generated from real incidents</span>
    </div>
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
    <h2 class="cs-cta__title">New rules ship with every breach.</h2>
    <p class="cs-cta__text">{{ total_rules }} detection rules and growing. Use <code>/detect</code> in the Intel Bot to generate Sigma rules for any breach — converted to your SIEM format instantly.</p>
    <div class="cs-cta__actions">
      <a href="https://t.me/Shimiscyberworldbot?start=detect" class="btn btn--primary" target="_blank" rel="noopener">Open Intel Bot →</a>
      <a href="{{ '/' | relative_url }}" class="btn btn--ghost">Back to Feed</a>
    </div>
  </div>
</section>

<link rel="stylesheet" href="/assets/css/premium-tools.css?v=4">
<script src="{{ '/assets/js/detections.js' | relative_url }}" defer></script>
