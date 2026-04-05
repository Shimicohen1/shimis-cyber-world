/* SCW Community Stage — search, filter, FAQ, modal */
(function () {
  /* ── Search & Filter ── */
  var search = document.getElementById('communitySearch');
  var count  = document.getElementById('communityCount');
  var grid   = document.getElementById('communityGrid');
  var empty  = document.getElementById('communityEmpty');
  var filters = document.querySelectorAll('#communityFilters .vault-filter');

  var cards = grid ? Array.from(grid.querySelectorAll('.tool-card')) : [];
  var activeFilter = 'all';

  function applyFilters() {
    var q = (search ? search.value : '').toLowerCase().trim();
    var visible = 0;

    cards.forEach(function (card) {
      var cat     = card.dataset.category || '';
      var name    = card.dataset.name || '';
      var tagline = card.dataset.tagline || '';
      var tags    = card.dataset.tags || '';

      var matchFilter = activeFilter === 'all' || cat === activeFilter;
      var haystack = name + ' ' + tagline + ' ' + tags;
      var matchSearch = !q || haystack.indexOf(q) !== -1;

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

  if (search) search.addEventListener('input', applyFilters);

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  /* ── FAQ Accordion ── */
  var faqItems = document.querySelectorAll('.cs-faq__q');
  faqItems.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var isOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.cs-faq__item').forEach(function (el) {
        el.classList.remove('open');
        el.querySelector('.cs-faq__q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Modal ── */
  var modal = document.getElementById('csModal');
  if (!modal) return;

  var backdrop = document.getElementById('csModalBackdrop');
  var closeBtn = document.getElementById('csModalClose');
  var closeBtn2 = document.getElementById('csModalCloseBtn');

  function openModal(card) {
    var name = (card.querySelector('.tool-card__head h4') || {}).textContent || '';
    var stage = (card.querySelector('.badge') || {}).textContent || '';
    var tagline = (card.querySelector('.community-card__tagline') || {}).textContent || '';
    var desc = '';
    var ps = card.querySelectorAll('p');
    if (ps.length >= 3) desc = ps[2].textContent;
    else if (ps.length >= 2) desc = ps[1].textContent;
    var tags = card.querySelectorAll('.tag');
    var meta = (card.querySelector('.community-card__meta') || {}).textContent || '';
    var url = '';
    var link = card.querySelector('.tool-card__action a');
    if (link) url = link.href;

    // data attrs for insight/why
    var insight = card.dataset.insight || '';
    var why = card.dataset.why || '';

    document.getElementById('modalName').textContent = name;
    document.getElementById('modalStage').textContent = stage;
    var stageEl = document.getElementById('modalStage');
    stageEl.className = 'badge ' + ((card.querySelector('.badge') || {}).className || '').replace('badge', '').trim();

    document.getElementById('modalTagline').textContent = tagline;
    document.getElementById('modalDesc').textContent = desc;

    var tagsContainer = document.getElementById('modalTags');
    tagsContainer.innerHTML = '';
    tags.forEach(function (t) {
      var span = document.createElement('span');
      span.className = 'tag';
      span.textContent = t.textContent;
      tagsContainer.appendChild(span);
    });

    var insightBlock = document.getElementById('modalInsightBlock');
    var whyBlock = document.getElementById('modalWhyBlock');
    if (insight) {
      document.getElementById('modalInsight').textContent = insight;
      insightBlock.style.display = '';
    } else {
      insightBlock.style.display = 'none';
    }
    if (why) {
      document.getElementById('modalWhy').textContent = why;
      whyBlock.style.display = '';
    } else {
      whyBlock.style.display = 'none';
    }

    document.getElementById('modalMeta').textContent = meta;

    var websiteBtn = document.getElementById('modalWebsite');
    if (url) {
      websiteBtn.href = url;
      websiteBtn.style.display = '';
    } else {
      websiteBtn.style.display = 'none';
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Click on cards
  document.querySelectorAll('.cs-clickable').forEach(function (card) {
    card.addEventListener('click', function (e) {
      // Don't open modal if clicking a link
      if (e.target.closest('a')) return;
      openModal(card);
    });
  });

  if (backdrop) backdrop.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeBtn2) closeBtn2.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
})();
