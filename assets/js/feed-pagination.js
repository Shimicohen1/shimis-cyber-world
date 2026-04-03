// Feed Pagination + Search — Shimi's Cyber World
(function () {
  'use strict';

  function initFeedPagination(listId, searchId, countId, paginationId, perPage) {
    var list = document.getElementById(listId);
    var searchInput = document.getElementById(searchId);
    var countEl = document.getElementById(countId);
    var paginationEl = document.getElementById(paginationId);
    if (!list) return;

    var allItems = Array.from(list.querySelectorAll('.feed-entry'));
    var filtered = allItems.slice();
    var currentPage = 1;
    var totalPages = 1;

    function updateCount(n) {
      if (countEl) countEl.textContent = n + ' results';
    }

    function showPage(page) {
      currentPage = page;
      totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
      if (currentPage > totalPages) currentPage = totalPages;

      var start = (currentPage - 1) * perPage;
      var end = start + perPage;

      allItems.forEach(function (el) { el.style.display = 'none'; });
      filtered.forEach(function (el, i) {
        el.style.display = (i >= start && i < end) ? '' : 'none';
      });

      renderPagination();
      updateCount(filtered.length);

      // Scroll to top of list on page change (not on initial load)
      if (page > 1 || filtered.length !== allItems.length) {
        var target = list.closest('.archive') || list;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    function renderPagination() {
      if (!paginationEl) return;
      if (totalPages <= 1) { paginationEl.innerHTML = ''; return; }

      var html = '';

      // Prev
      if (currentPage > 1) {
        html += '<button class="page-btn" data-page="' + (currentPage - 1) + '">&laquo;</button>';
      } else {
        html += '<button class="page-btn page-btn--disabled" disabled>&laquo;</button>';
      }

      // Page numbers with ellipsis
      var pages = getPageRange(currentPage, totalPages);
      for (var i = 0; i < pages.length; i++) {
        if (pages[i] === '...') {
          html += '<span class="page-ellipsis">…</span>';
        } else {
          var active = pages[i] === currentPage ? ' page-btn--active' : '';
          html += '<button class="page-btn' + active + '" data-page="' + pages[i] + '">' + pages[i] + '</button>';
        }
      }

      // Next
      if (currentPage < totalPages) {
        html += '<button class="page-btn" data-page="' + (currentPage + 1) + '">&raquo;</button>';
      } else {
        html += '<button class="page-btn page-btn--disabled" disabled>&raquo;</button>';
      }

      paginationEl.innerHTML = html;

      // Bind clicks
      paginationEl.querySelectorAll('.page-btn[data-page]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          showPage(parseInt(btn.getAttribute('data-page'), 10));
        });
      });
    }

    function getPageRange(current, total) {
      if (total <= 7) {
        var arr = [];
        for (var i = 1; i <= total; i++) arr.push(i);
        return arr;
      }
      var pages = [1];
      if (current > 3) pages.push('...');
      var start = Math.max(2, current - 1);
      var end = Math.min(total - 1, current + 1);
      for (var j = start; j <= end; j++) pages.push(j);
      if (current < total - 2) pages.push('...');
      pages.push(total);
      return pages;
    }

    // Search
    if (searchInput) {
      var debounceTimer;
      searchInput.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
          var query = searchInput.value.trim().toLowerCase();
          if (!query) {
            filtered = allItems.slice();
          } else {
            filtered = allItems.filter(function (el) {
              var title = el.getAttribute('data-title') || '';
              var tags = el.getAttribute('data-tags') || '';
              var excerpt = el.getAttribute('data-excerpt') || '';
              var text = title + ' ' + tags + ' ' + excerpt;
              return text.indexOf(query) !== -1;
            });
          }
          showPage(1);
        }, 200);
      });
    }

    // Init
    showPage(1);
  }

  // Auto-init from data-feed-pagination containers
  document.querySelectorAll('[data-feed-pagination]').forEach(function (el) {
    var cfg = el.getAttribute('data-feed-pagination').split(',');
    initFeedPagination(cfg[0], cfg[1], cfg[2], cfg[3], parseInt(cfg[4], 10) || 20);
  });
})();
