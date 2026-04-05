/* Community Stage — search + filter */
(function () {
  const search = document.getElementById('communitySearch');
  const count  = document.getElementById('communityCount');
  const grid   = document.getElementById('communityGrid');
  const empty  = document.getElementById('communityEmpty');
  const filters = document.querySelectorAll('#communityFilters .vault-filter');

  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.tool-card'));
  let activeFilter = 'all';

  function applyFilters() {
    const q = (search ? search.value : '').toLowerCase().trim();
    let visible = 0;

    cards.forEach(function (card) {
      const cat     = card.dataset.category || '';
      const name    = card.dataset.name || '';
      const tagline = card.dataset.tagline || '';
      const tags    = card.dataset.tags || '';

      const matchFilter = activeFilter === 'all' || cat === activeFilter;
      const haystack = name + ' ' + tagline + ' ' + tags;
      const matchSearch = !q || haystack.indexOf(q) !== -1;

      if (matchFilter && matchSearch) {
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    if (count) count.textContent = visible;
    if (empty) empty.style.display = visible === 0 ? '' : 'none';
  }

  if (search) {
    search.addEventListener('input', applyFilters);
  }

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });
})();
