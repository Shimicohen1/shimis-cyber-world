---
layout: page
title: Lockdown Lab
permalink: /lockdown-lab/
description: "Daily, vendor-specific hardening tips from Shimi Cohen. One practical lockdown step every day — across cloud, identity, network, endpoint and AI security."
---

<div class="page-head">
  <div class="label label--acid page-head__label">DAILY SERIES</div>
  <h1 class="page-head__title">Lockdown Lab</h1>
  <p class="page-head__desc">A daily, vendor-specific hardening tip from the field. One practical lockdown step you can apply today — published across the website, LinkedIn and Telegram.</p>
</div>

<div class="feed-controls">
  <div class="feed-search">
    <span class="feed-search__icon">&#128269;</span>
    <input type="text" class="feed-search__input" placeholder="Search lockdown tips..." id="feed-search">
    <span class="feed-search__count" id="feed-count"></span>
  </div>
</div>

{% assign lockdowns = site.posts | where: "section", "lockdown" %}

{% comment %}── Build distinct platform + severity sets for filter chips ──{% endcomment %}
{% assign _platforms = lockdowns | map: "platform_name" | uniq | sort %}
{% assign _severities = lockdowns | map: "severity" | uniq %}

{% if lockdowns.size > 0 %}
<div class="lockdown-filter-bar">
  <div class="lockdown-filter-bar__group">
    <span class="lockdown-filter-bar__label">Severity</span>
    <div class="feed-filters">
      <button type="button" class="filter-pill filter-pill--active" data-filter-type="severity" data-filter-value="">All</button>
      {% for sev in _severities %}{% if sev and sev != "" %}
      <button type="button" class="filter-pill" data-filter-type="severity" data-filter-value="{{ sev | downcase }}">{{ sev | upcase }}</button>
      {% endif %}{% endfor %}
    </div>
  </div>
  <div class="lockdown-filter-bar__group">
    <span class="lockdown-filter-bar__label">Platform</span>
    <div class="feed-filters">
      <button type="button" class="filter-pill filter-pill--active" data-filter-type="platform" data-filter-value="">All</button>
      {% for plat in _platforms %}{% if plat and plat != "" %}
      <button type="button" class="filter-pill" data-filter-type="platform" data-filter-value="{{ plat | downcase }}">{{ plat }}</button>
      {% endif %}{% endfor %}
    </div>
  </div>
</div>
{% endif %}

<div class="archive">
  <div class="archive__list" id="feed-list">
    {% for post in lockdowns %}
    <div class="feed-entry"
         data-title="{{ post.title | downcase | escape }}"
         data-tags="{{ post.tags | join: ' ' | downcase }}"
         data-excerpt="{{ post.excerpt | strip_html | truncatewords: 20 | downcase | escape }}"
         data-severity="{{ post.severity | downcase }}"
         data-platform="{{ post.platform_name | downcase }}">
      {% include post-card.html %}
    </div>
    {% endfor %}
  </div>

  {% if lockdowns.size == 0 %}
  <div class="empty-state" style="margin-top: 2rem;">
    <p>The first Lockdown Lab tips are landing — check back soon.</p>
    <p><a href="{{ '/hardening/' | relative_url }}">Or jump straight to the interactive hardening matrix →</a></p>
  </div>
  {% endif %}

  <nav class="pagination" id="pagination" aria-label="Page navigation"></nav>
</div>

<script>
(function () {
  // Lockdown Lab filter chips — applied on top of the existing search filter.
  const chips = document.querySelectorAll('.filter-pill');
  const entries = document.querySelectorAll('#feed-list .feed-entry');
  const searchInput = document.getElementById('feed-search');
  const countEl = document.getElementById('feed-count');
  const state = { severity: '', platform: '', q: '' };

  function applyFilters() {
    let visible = 0;
    entries.forEach(el => {
      const matchSev = !state.severity || (el.dataset.severity || '') === state.severity;
      const matchPlat = !state.platform || (el.dataset.platform || '') === state.platform;
      const haystack = (el.dataset.title || '') + ' ' + (el.dataset.tags || '') + ' ' + (el.dataset.excerpt || '');
      const matchQ = !state.q || haystack.indexOf(state.q) !== -1;
      const show = matchSev && matchPlat && matchQ;
      el.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (countEl) countEl.textContent = visible + ' tip' + (visible === 1 ? '' : 's');
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const type = chip.dataset.filterType;
      const value = chip.dataset.filterValue || '';
      state[type] = value;
      // Toggle active class within same group
      chip.parentElement.querySelectorAll('.filter-pill').forEach(c => c.classList.remove('filter-pill--active'));
      chip.classList.add('filter-pill--active');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      state.q = (e.target.value || '').toLowerCase().trim();
      applyFilters();
    });
  }

  applyFilters();
})();
</script>
