(function() {
  const searchInput = document.getElementById('vaultSearch');
  const countEl = document.getElementById('vaultCount');
  const filterBtns = document.querySelectorAll('.vault-filter');
  const categories = document.querySelectorAll('.vault-category');
  const resources = document.querySelectorAll('.vault-resource');
  let activeFilter = 'all';

  // Category collapse/expand toggle
  document.querySelectorAll('.vault-category__header').forEach(function(header) {
    header.addEventListener('click', function() {
      this.parentElement.classList.toggle('collapsed');
    });
  });

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
