---
layout: page
title: SCW Community Stage
permalink: /community/
---

<div class="page-head">
  <div class="label label--cyan page-head__label">LAUNCHPAD</div>
  <h1 class="page-head__title">SCW Community Stage</h1>
  <p class="page-head__desc">Cyber startups building the next layer of defense — scouted, tagged, and tracked by the community.</p>
</div>

<!-- Search & Filter -->
<div class="vault-controls">
  <div class="vault-search">
    <svg class="vault-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <input type="text" id="communitySearch" class="vault-search__input" placeholder="Search startups..." autocomplete="off">
    <span id="communityCount" class="vault-search__count">{{ site.data.community.startups | size }}</span>
  </div>
  <div class="vault-filters" id="communityFilters">
    <button class="vault-filter active" data-filter="all">All</button>
    {% for cat in site.data.community.categories %}
    <button class="vault-filter" data-filter="{{ cat | slugify }}">{{ cat }}</button>
    {% endfor %}
  </div>
</div>

<!-- Startup Grid -->
<div class="toolkit__grid" id="communityGrid">
  {% for startup in site.data.community.startups %}
  <div class="tool-card reveal" data-category="{{ startup.category | slugify }}" data-name="{{ startup.name | downcase }}" data-tagline="{{ startup.tagline | downcase }}" data-tags="{{ startup.tags | join: ' ' | downcase }}">
    <div class="tool-card__head">
      <h4>{{ startup.name }}</h4>
      {% if startup.stage == "seed" %}
        <span class="badge badge--new">seed</span>
      {% elsif startup.stage == "series-a" %}
        <span class="badge badge--signal">series A</span>
      {% elsif startup.stage == "series-b" %}
        <span class="badge badge--drop">series B</span>
      {% elsif startup.stage == "growth" %}
        <span class="badge badge--partner">growth</span>
      {% elsif startup.stage == "public" %}
        <span class="badge badge--vault">public</span>
      {% endif %}
    </div>
    <p class="community-card__tagline">{{ startup.tagline }}</p>
    <p>{{ startup.description }}</p>
    {% if startup.tags %}
    <div class="tool-card__tags">
      {% for tag in startup.tags %}<span class="tag">{{ tag }}</span>{% endfor %}
    </div>
    {% endif %}
    <div class="community-card__meta">
      <span>{{ startup.location }}</span>
      <span class="feed-item__sep">/</span>
      <span>{{ startup.founded }}</span>
    </div>
    {% if startup.url %}
    <div class="tool-card__action">
      <a href="{{ startup.url }}" target="_blank" rel="noopener" class="btn btn--ghost btn--sm">Visit &rarr;</a>
    </div>
    {% endif %}
  </div>
  {% endfor %}
</div>

<div class="empty-state" id="communityEmpty" style="display:none; margin-top: 2rem;">
  <p>No startups match your search.</p>
</div>

<!-- Submit CTA -->
<div class="community-submit reveal" style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border);">
  <p style="font-size: .82rem; color: var(--gray); margin-bottom: .6rem;">Building something in cyber? Get listed.</p>
  <a href="{{ '/submit-startup/' | relative_url }}" class="btn btn--ghost btn--sm">Submit a Startup &rarr;</a>
</div>

<script src="{{ '/assets/js/community.js' | relative_url }}" defer></script>
<link rel="stylesheet" href="{{ '/assets/css/community.css' | relative_url }}">
