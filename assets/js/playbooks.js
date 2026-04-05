/* SCW Incident Playbooks — search, filter, accordion */
(function () {
  'use strict';

  var search = document.getElementById('pbSearch');
  var count  = document.getElementById('pbCount');
  var grid   = document.getElementById('pbGrid');
  var empty  = document.getElementById('pbEmpty');
  if (!grid) return;

  var cards = Array.from(grid.querySelectorAll('.pb-card'));
  var catFilters = document.getElementById('pbCategoryFilters');

  var activeCat = 'all';

  function applyFilters() {
    var q = (search ? search.value : '').toLowerCase().trim();
    var visible = 0;

    cards.forEach(function (c) {
      var matchCat = activeCat === 'all' || c.dataset.category === activeCat;
      var matchText = !q ||
        c.dataset.name.indexOf(q) !== -1 ||
        (c.dataset.tags && c.dataset.tags.indexOf(q) !== -1) ||
        (c.dataset.mitre && c.dataset.mitre.indexOf(q) !== -1);

      if (matchCat && matchText) {
        c.style.display = '';
        visible++;
      } else {
        c.style.display = 'none';
      }
    });

    if (count) count.textContent = visible;
    if (empty) empty.style.display = visible === 0 ? '' : 'none';
  }

  if (catFilters) {
    catFilters.addEventListener('click', function (e) {
      var btn = e.target.closest('.vault-filter');
      if (!btn) return;
      catFilters.querySelectorAll('.vault-filter').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeCat = btn.dataset.filter;
      applyFilters();
    });
  }

  if (search) {
    search.addEventListener('input', applyFilters);
  }

  /* Phase accordion */
  grid.addEventListener('click', function (e) {
    var toggle = e.target.closest('.pb-phase__toggle');
    if (!toggle) return;

    var phase = toggle.parentElement;
    var content = phase.querySelector('.pb-phase__content');
    if (!content) return;

    var isOpen = phase.classList.contains('open');

    if (isOpen) {
      phase.classList.remove('open');
      content.hidden = true;
    } else {
      phase.classList.add('open');
      content.hidden = false;
    }
  });
})();
