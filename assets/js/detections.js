/* SCW Detection Vault — search, filter, copy, SIEM tabs */
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
  var PAGE_SIZE = 30;
  var visibleLimit = PAGE_SIZE;

  /* Update initial count to include breach intel cards */
  if (count) count.textContent = cards.length;

  /* Show-more button */
  var showMoreBtn = document.getElementById('dlShowMore');

  function applyFilters() {
    var q = (search ? search.value : '').toLowerCase().trim();
    var matched = 0;
    var shown = 0;

    cards.forEach(function (c) {
      var matchCat  = activeCat  === 'all' || (c.dataset.category && (' ' + c.dataset.category + ' ').indexOf(' ' + activeCat + ' ') !== -1);
      var matchPlat = activePlat === 'all' || c.dataset.platform === activePlat;
      var matchText = !q ||
        c.dataset.name.indexOf(q) !== -1 ||
        (c.dataset.tags && c.dataset.tags.indexOf(q) !== -1) ||
        (c.dataset.mitre && c.dataset.mitre.indexOf(q) !== -1);

      if (matchCat && matchPlat && matchText) {
        matched++;
        if (matched <= visibleLimit) {
          c.style.display = '';
          shown++;
        } else {
          c.style.display = 'none';
        }
      } else {
        c.style.display = 'none';
      }
    });

    if (count) count.textContent = matched;
    if (empty) empty.style.display = matched === 0 ? '' : 'none';
    if (showMoreBtn) {
      showMoreBtn.style.display = matched > shown ? '' : 'none';
      showMoreBtn.textContent = 'Show More (' + (matched - shown) + ' remaining)';
    }
  }

  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function () {
      visibleLimit += PAGE_SIZE;
      applyFilters();
    });
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

  bindFilterGroup(catFilters, function (v) { activeCat = v; visibleLimit = PAGE_SIZE; });
  bindFilterGroup(platFilters, function (v) { activePlat = v; visibleLimit = PAGE_SIZE; });

  if (search) {
    search.addEventListener('input', function () { visibleLimit = PAGE_SIZE; applyFilters(); });
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

  /* ── Breach Intel SIEM tabs ── */
  function b64decode(s) {
    try { return atob(s); } catch (e) { return 'Format not available'; }
  }

  /* Initialize breach intel cards — decode Sigma YAML only */
  var breachCards = grid.querySelectorAll('.dl-rule--breach');
  breachCards.forEach(function (card) {
    var codeEl = card.querySelector('.dl-siem-code');
    if (!codeEl) return;
    var sigmaB64 = card.dataset.fmtSigma;
    if (sigmaB64) {
      codeEl.textContent = b64decode(sigmaB64);
    }
  });

  /* ── Showcase SIEM format tabs ── */
  var showcaseTabs = document.querySelectorAll('.showcase-tabs');
  showcaseTabs.forEach(function (tabBar) {
    tabBar.addEventListener('click', function (e) {
      var tab = e.target.closest('.showcase-tab');
      if (!tab) return;
      var panels = tabBar.nextElementSibling;
      var fmt = tab.dataset.fmt;
      tabBar.querySelectorAll('.showcase-tab').forEach(function (t) {
        t.classList.toggle('active', t === tab);
      });
      panels.querySelectorAll('.showcase-panel').forEach(function (p) {
        p.classList.toggle('active', p.dataset.fmt === fmt);
      });
    });
  });

  /* Initial pagination — show first page only */
  applyFilters();
})();
