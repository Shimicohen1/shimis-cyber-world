/* SCW Detection Vault — search, filter, copy */
(function () {
  'use strict';

  var search = document.getElementById('dlSearch');
  var count  = document.getElementById('dlCount');
  var grid   = document.getElementById('dlGrid');
  var empty  = document.getElementById('dlEmpty');
  if (!grid) return;

  var cards = Array.from(grid.querySelectorAll('.dl-rule'));
  var catFilters  = document.getElementById('dlCategoryFilters');
  var platFilters = document.getElementById('dlPlatformFilters');

  var activeCat  = 'all';
  var activePlat = 'all';

  function applyFilters() {
    var q = (search ? search.value : '').toLowerCase().trim();
    var visible = 0;

    cards.forEach(function (c) {
      var matchCat  = activeCat  === 'all' || c.dataset.category === activeCat;
      var matchPlat = activePlat === 'all' || c.dataset.platform === activePlat;
      var matchText = !q ||
        c.dataset.name.indexOf(q) !== -1 ||
        (c.dataset.tags && c.dataset.tags.indexOf(q) !== -1) ||
        (c.dataset.mitre && c.dataset.mitre.indexOf(q) !== -1);

      if (matchCat && matchPlat && matchText) {
        c.style.display = '';
        visible++;
      } else {
        c.style.display = 'none';
      }
    });

    if (count) count.textContent = visible;
    if (empty) empty.style.display = visible === 0 ? '' : 'none';
  }

  function bindFilterGroup(container, setter) {
    if (!container) return;
    container.addEventListener('click', function (e) {
      var btn = e.target.closest('.vault-filter');
      if (!btn) return;
      container.querySelectorAll('.vault-filter').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      setter(btn.dataset.filter);
      applyFilters();
    });
  }

  bindFilterGroup(catFilters, function (v) { activeCat = v; });
  bindFilterGroup(platFilters, function (v) { activePlat = v; });

  if (search) {
    search.addEventListener('input', applyFilters);
  }

  /* Copy-to-clipboard */
  grid.addEventListener('click', function (e) {
    var btn = e.target.closest('.dl-copy-btn');
    if (!btn) return;
    var code = btn.parentElement.querySelector('code');
    if (!code) return;

    var text = code.textContent;
    navigator.clipboard.writeText(text).then(function () {
      btn.innerHTML = typeof scwIcon === 'function' ? scwIcon('check') : '✓';
      btn.classList.add('copied');
      setTimeout(function () {
        btn.innerHTML = typeof scwIcon === 'function' ? scwIcon('clipboard') : '';
        btn.classList.remove('copied');
      }, 1500);
    });
  });
})();
