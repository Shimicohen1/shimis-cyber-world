---
layout: page
title: Detection Library
permalink: /detections/
---

<div class="page-head">
  <div class="label label--cyan page-head__label">SCW TOOLS</div>
  <h1 class="page-head__title">Detection Library</h1>
  <p class="page-head__desc">Production-ready detection rules for real SOC environments. KQL, Sigma, and Splunk — mapped to MITRE ATT&CK. Copy, paste, detect.</p>
</div>

<section class="cs-intro reveal">
  <p>Every rule in this library is <strong>battle-tested</strong>. Written by security operators, validated in production environments, and mapped to MITRE ATT&CK techniques. All rules are <strong>free and open</strong> — use them in your SIEM today.</p>
  <div class="cs-intro__actions">
    <a href="#rules" class="btn btn--primary">Browse Rules</a>
    <a href="{{ '/playbooks/' | relative_url }}" class="btn btn--ghost">Incident Playbooks →</a>
  </div>
</section>

<hr class="section-break">

<!-- Stats bar -->
<section class="dl-stats reveal">
  <div class="dl-stats__grid">
    <div class="dl-stat">
      <span class="dl-stat__number">{{ site.data.detections.rules | size }}</span>
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
        <button class="dl-copy-btn" title="Copy to clipboard">📋</button>
        <pre><code>{{ rule.query | strip | xml_escape }}</code></pre>
      </div>

      {% if rule.notes %}
      <p class="dl-rule__notes"><strong>💡 Note:</strong> {{ rule.notes }}</p>
      {% endif %}
    </div>
    {% endfor %}
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
    <p class="cs-cta__text">{{ site.data.detections.rules | size }} production-ready queries and growing. Subscribe to get notified when new detection rules drop.</p>
    <div class="cs-cta__actions">
      <a href="{{ '/playbooks/' | relative_url }}" class="btn btn--primary">Incident Playbooks →</a>
      <a href="{{ '/' | relative_url }}" class="btn btn--ghost">Back to Feed</a>
    </div>
  </div>
</section>

<link rel="stylesheet" href="{{ '/assets/css/premium-tools.css' | relative_url }}">
<script src="{{ '/assets/js/detections.js' | relative_url }}" defer></script>
