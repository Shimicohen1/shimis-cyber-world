/* =====================================================
   Community Stage — Main JS
   Shimi's Cyber World
   ===================================================== */

(function () {
  'use strict';

  /* ---------- State ---------- */
  var allStartups = [];
  var activeCategory = 'all';
  var activeSort = 'featured';
  var searchQuery = '';

  /* ---------- DOM Refs ---------- */
  var featuredGrid   = document.getElementById('featured-grid');
  var startupGrid    = document.getElementById('startup-grid');
  var emptyState     = document.getElementById('empty-state');
  var searchInput    = document.getElementById('cs-search');
  var modalOverlay   = document.getElementById('modal-overlay');
  var modalClose     = document.getElementById('modal-close');
  var modalCloseBtn  = document.getElementById('modal-close-btn');
  var lastFocused    = null;

  /* ---------- Category color map ---------- */
  var catColors = {
    'AI Security': '',
    'Cloud Security': 'cs-tag--acid',
    'Identity': 'cs-tag--pink',
    'SOC': 'cs-tag--orange',
    'Threat Intelligence': '',
    'AppSec': 'cs-tag--lime',
    'Community Projects': 'cs-tag--acid'
  };

  /* ---------- Init ---------- */
  loadData();
  initFilters();
  initSearch();
  initFAQ();
  initModal();

  /* ---------- Data Loading ---------- */
  function loadData() {
    // Future: replace fetch with API call — GET /api/startups
    fetch('./assets/data/community-startups.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        // Merge with approved local submissions
        var approved = getApprovedSubmissions();
        allStartups = data.concat(approved);
        render();
      })
      .catch(function () {
        // Fallback: just use approved local submissions
        allStartups = getApprovedSubmissions();
        render();
      });
  }

  /* ---------- Rendering ---------- */
  function render() {
    var filtered = filterAndSort();
    renderFeatured();
    renderGrid(filtered);
  }

  function filterAndSort() {
    var list = allStartups.slice();

    // Category filter
    if (activeCategory !== 'all') {
      list = list.filter(function (s) {
        return s.categories && s.categories.indexOf(activeCategory) !== -1;
      });
    }

    // Search
    if (searchQuery) {
      var q = searchQuery.toLowerCase();
      list = list.filter(function (s) {
        return (s.name && s.name.toLowerCase().indexOf(q) !== -1) ||
               (s.description && s.description.toLowerCase().indexOf(q) !== -1) ||
               (s.categories && s.categories.join(' ').toLowerCase().indexOf(q) !== -1) ||
               (s.tags && s.tags.join(' ').toLowerCase().indexOf(q) !== -1) ||
               (s.insight && s.insight.toLowerCase().indexOf(q) !== -1) ||
               (s.whyItMatters && s.whyItMatters.toLowerCase().indexOf(q) !== -1);
      });
    }

    // Sort
    if (activeSort === 'featured') {
      list.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
    } else if (activeSort === 'newest') {
      list.sort(function (a, b) { return (b.createdAt || '').localeCompare(a.createdAt || ''); });
    } else if (activeSort === 'az') {
      list.sort(function (a, b) { return (a.name || '').localeCompare(b.name || ''); });
    }

    return list;
  }

  function renderFeatured() {
    var featured = allStartups.filter(function (s) { return s.featured; }).slice(0, 3);
    var featuredSection = document.getElementById('featured-section');

    if (featured.length === 0) {
      featuredSection.style.display = 'none';
      return;
    }
    featuredSection.style.display = '';
    featuredGrid.innerHTML = featured.map(function (s) {
      return featuredCardHTML(s);
    }).join('');
  }

  function renderGrid(list) {
    if (list.length === 0) {
      startupGrid.style.display = 'none';
      emptyState.style.display = '';
      return;
    }
    startupGrid.style.display = '';
    emptyState.style.display = 'none';
    startupGrid.innerHTML = list.map(function (s) {
      return gridCardHTML(s);
    }).join('');
  }

  /* ---------- Card HTML Builders ---------- */
  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function logoInitials(name) {
    return (name || '??').split(/\s+/).map(function (w) { return w[0]; }).join('').substring(0, 2).toUpperCase();
  }

  function tagsHTML(cats) {
    if (!cats || !cats.length) return '';
    return cats.map(function (c) {
      var cls = catColors[c] || '';
      return '<span class="cs-tag ' + cls + '">' + escapeHtml(c) + '</span>';
    }).join('');
  }

  function labelClass(label) {
    if (!label) return '';
    var l = label.toLowerCase();
    if (l === 'featured') return 'cs-card__label--featured';
    if (l === 'community pick') return 'cs-card__label--pick';
    if (l === 'early stage') return 'cs-card__label--early';
    return 'cs-card__label--featured';
  }

  function featuredCardHTML(s) {
    return '' +
      '<div class="cs-fcard cs-animate">' +
        '<div class="cs-fcard__header">' +
          '<div class="cs-fcard__logo">' + logoInitials(s.name) + '</div>' +
          '<div class="cs-fcard__name">' + escapeHtml(s.name) + '</div>' +
        '</div>' +
        '<p class="cs-fcard__desc">' + escapeHtml(s.description) + '</p>' +
        '<div class="cs-fcard__tags">' + tagsHTML(s.categories) + '</div>' +
        (s.whyItMatters ? '<div class="cs-fcard__why"><strong>Why it matters</strong>' + escapeHtml(s.whyItMatters) + '</div>' : '') +
        '<div class="cs-fcard__actions">' +
          '<button class="cs-btn cs-btn--primary cs-btn--sm" onclick="window.__csOpenModal(\'' + escapeHtml(s.id) + '\')">View Profile</button>' +
          '<a href="' + escapeHtml(s.website || '#') + '" class="cs-btn cs-btn--secondary cs-btn--sm" target="_blank" rel="noopener">Visit Website</a>' +
        '</div>' +
      '</div>';
  }

  function gridCardHTML(s) {
    var labelHTML = s.label ? '<span class="cs-card__label ' + labelClass(s.label) + '">' + escapeHtml(s.label) + '</span>' : '';
    return '' +
      '<div class="cs-card cs-animate">' +
        labelHTML +
        '<div class="cs-card__header">' +
          '<div class="cs-card__logo">' + logoInitials(s.name) + '</div>' +
          '<div class="cs-card__name">' + escapeHtml(s.name) + '</div>' +
        '</div>' +
        '<p class="cs-card__desc">' + escapeHtml(s.description) + '</p>' +
        '<div class="cs-card__tags">' + tagsHTML(s.categories) + '</div>' +
        (s.insight ? '<div class="cs-card__insight"><strong>SCW Insight:</strong> ' + escapeHtml(s.insight) + '</div>' : '') +
        '<div class="cs-card__actions">' +
          '<button class="cs-btn cs-btn--primary cs-btn--sm" onclick="window.__csOpenModal(\'' + escapeHtml(s.id) + '\')">View Profile</button>' +
          '<a href="' + escapeHtml(s.website || '#') + '" class="cs-btn cs-btn--ghost cs-btn--sm" target="_blank" rel="noopener">Website</a>' +
        '</div>' +
      '</div>';
  }

  /* ---------- Filters ---------- */
  function initFilters() {
    document.querySelectorAll('.cs-pill[data-category]').forEach(function (pill) {
      pill.addEventListener('click', function () {
        document.querySelectorAll('.cs-pill[data-category]').forEach(function (p) { p.classList.remove('cs-pill--active'); });
        pill.classList.add('cs-pill--active');
        activeCategory = pill.getAttribute('data-category');
        render();
      });
    });

    document.querySelectorAll('.cs-pill[data-sort]').forEach(function (pill) {
      pill.addEventListener('click', function () {
        document.querySelectorAll('.cs-pill[data-sort]').forEach(function (p) { p.classList.remove('cs-pill--active'); });
        pill.classList.add('cs-pill--active');
        activeSort = pill.getAttribute('data-sort');
        render();
      });
    });
  }

  /* ---------- Search ---------- */
  function initSearch() {
    var timer;
    searchInput.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        searchQuery = searchInput.value.trim();
        render();
      }, 200);
    });
  }

  /* ---------- FAQ Accordion ---------- */
  function initFAQ() {
    document.querySelectorAll('.cs-faq__q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.cs-faq__item');
        var isOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.cs-faq__item').forEach(function (el) {
          el.classList.remove('open');
          el.querySelector('.cs-faq__q').setAttribute('aria-expanded', 'false');
        });
        // Toggle this
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---------- Modal ---------- */
  function initModal() {
    modalClose.addEventListener('click', closeModal);
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
    });
  }

  function openModal(id) {
    var s = allStartups.find(function (x) { return x.id === id; });
    if (!s) return;

    lastFocused = document.activeElement;

    document.getElementById('modal-logo').textContent = logoInitials(s.name);
    document.getElementById('modal-name').textContent = s.name || '';
    document.getElementById('modal-label').textContent = s.label || '';
    document.getElementById('modal-label').style.display = s.label ? '' : 'none';
    document.getElementById('modal-desc').textContent = s.description || '';
    document.getElementById('modal-tags').innerHTML = tagsHTML(s.categories);
    document.getElementById('modal-insight').textContent = s.insight || '';
    document.getElementById('modal-insight-block').style.display = s.insight ? '' : 'none';
    document.getElementById('modal-why').textContent = s.whyItMatters || '';
    document.getElementById('modal-why-block').style.display = s.whyItMatters ? '' : 'none';
    document.getElementById('modal-website').href = s.website || '#';

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  // Expose openModal globally for onclick handlers
  window.__csOpenModal = openModal;

})();
