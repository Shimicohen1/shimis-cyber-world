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
  <div class="vault-category__header" onclick="this.parentElement.classList.toggle('collapsed')">
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
        <div class="vault-resource" data-title="{{ resource.title | downcase }}">
          <div class="vault-resource__info">
            <span class="vault-resource__type">{{ resource.type }}</span>
            <span class="vault-resource__title">{{ resource.title }}</span>
          </div>
        </div>
        {% endfor %}
      </div>
    </div>
    {% endfor %}
  </div>
</section>
{% endfor %}

<!-- Vault JS: search + filter -->
<script>
(function() {
  const searchInput = document.getElementById('vaultSearch');
  const countEl = document.getElementById('vaultCount');
  const filterBtns = document.querySelectorAll('.vault-filter');
  const categories = document.querySelectorAll('.vault-category');
  const resources = document.querySelectorAll('.vault-resource');
  let activeFilter = 'all';

  function update() {
    const q = searchInput.value.toLowerCase().trim();
    let visible = 0;

    categories.forEach(cat => {
      const catSlug = cat.dataset.category;
      const matchFilter = activeFilter === 'all' || catSlug === activeFilter;
      let catVisible = 0;

      cat.querySelectorAll('.vault-resource').forEach(r => {
        const title = r.dataset.title;
        const matchSearch = !q || title.includes(q);
        const show = matchFilter && matchSearch;
        r.style.display = show ? '' : 'none';
        if (show) { catVisible++; visible++; }
      });

      cat.style.display = catVisible > 0 ? '' : 'none';
      if (catVisible > 0) cat.classList.remove('collapsed');
      else cat.classList.add('collapsed');

      // Update subcategory visibility
      cat.querySelectorAll('.vault-subcategory').forEach(sub => {
        const subVisible = sub.querySelectorAll('.vault-resource:not([style*="display: none"])').length;
        sub.style.display = subVisible > 0 ? '' : 'none';
      });
    });

    countEl.textContent = visible;
  }

  searchInput.addEventListener('input', update);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      update();
    });
  });
})();
</script>
