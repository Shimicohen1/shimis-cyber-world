---
layout: page
title: Vault
permalink: /library/
---

<div class="page-head">
  <div class="label label--pink page-head__label">RESOURCE LIBRARY</div>
  <h1 class="page-head__title">The Vault</h1>
  <p class="page-head__desc">525 curated cybersecurity resources — reports, frameworks, cheat sheets, and field guides. Organized by the community, for the community.</p>
</div>

<!-- Search & Filter Bar -->
<div class="vault-controls">
  <div class="vault-search">
    <svg class="vault-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <input type="text" id="vaultSearch" class="vault-search__input" placeholder="Search 525 resources..." autocomplete="off">
    <span id="vaultCount" class="vault-search__count">525</span>
  </div>
  <div class="vault-filters" id="vaultFilters">
    <button class="vault-filter active" data-filter="all">All</button>
    {% for category in site.data.resources.categories %}
    <button class="vault-filter" data-filter="{{ category.name | slugify }}">{{ category.icon }} {{ category.name }}</button>
    {% endfor %}
  </div>
</div>

<!-- Resource Categories -->
{% for category in site.data.resources.categories %}
<section class="vault-category reveal collapsed" data-category="{{ category.name | slugify }}">
  <div class="vault-category__header">
    <div class="vault-category__info">
      <span class="vault-category__icon">{{ category.icon }}</span>
      <h2 class="vault-category__title">{{ category.name }}</h2>
      <span class="vault-category__count">{{ category.count }}</span>
    </div>
    <svg class="vault-category__chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
  </div>
  <div class="vault-category__body">
    {% for subcategory in category.subcategories %}
    <div class="vault-subcategory">
      <h3 class="vault-subcategory__title">{{ subcategory.name }}</h3>
      <div class="vault-subcategory__grid">
        {% for resource in subcategory.resources %}
        <a href="{{ resource.url }}" target="_blank" rel="noopener" class="vault-resource" data-title="{{ resource.title | downcase }}">
          <div class="vault-resource__info">
            <span class="vault-resource__type">{{ resource.type }}</span>
            <span class="vault-resource__title">{{ resource.title }}</span>
            {% assign resource_age = resource.added | date: "%s" %}
            {% assign now_ts = "now" | date: "%s" %}
            {% assign diff = now_ts | minus: resource_age %}
            {% if diff < 604800 %}<span class="vault-resource__new">NEW</span>{% endif %}
          </div>
          <svg class="vault-resource__open" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
        {% endfor %}
      </div>
    </div>
    {% endfor %}
  </div>
</section>
{% endfor %}

<!-- Vault JS: search + filter -->
<script src="{{ '/assets/js/vault.js' | relative_url }}" defer></script>
