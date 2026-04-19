/* LockDown v5 — global category filters across all platforms
   Preserves: platform tabs, filters, checkboxes, localStorage, progress, export */
(function () {
  'use strict';

  var activePlatform = null;
  var globalCategoryMode = false;   /* true when viewing cross-platform category */
  var searchMode = false;           /* true when search results are shown */
  var STORAGE_KEY = 'scw_harden_checked';

  /* ── Premium data cache (keyed by platform) ── */
  var premiumCache = {};

  function fetchPremiumData(platform) {
    if (!/^[a-z0-9-]+$/.test(platform)) return Promise.resolve({});
    if (premiumCache[platform]) return Promise.resolve(premiumCache[platform]);
    return fetch('/assets/data/premium-' + platform + '.json')
      .then(function (r) { return r.ok ? r.json() : {}; })
      .then(function (data) { premiumCache[platform] = data; return data; })
      .catch(function () { premiumCache[platform] = {}; return {}; });
  }

  /* Attach premium data to items after fetch */
  function attachPremium(platform, premData) {
    (window.HARDEN_ITEMS || []).forEach(function (item) {
      if (item.platform === platform && premData[item.id]) {
        item.premium = premData[item.id];
      }
    });
  }

  /* ── Persistence ── */
  function getChecked() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveChecked(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
  }

  /* ── Severity badge class ── */
  function sevBadge(sev) {
    if (sev === 'critical') return 'live';
    if (sev === 'high') return 'signal';
    return 'drop';
  }

  /* ── Escape HTML ── */
  function esc(s) {
    if (!s) return '';
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function escapeAttr(s) {
    if (!s) return '';
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ── Build premium section HTML ── */
  function buildPremiumSection(item) {
    if (!item.hasPremium) return '';
    var html = '<div class="harden-premium">';
    html += '<button class="harden-premium__toggle" data-id="' + item.id + '">';
    html += '<span class="harden-premium__toggle-icon">▸</span>';
    html += '<span>Elite Guidance</span>';
    html += '</button>';
    html += '<div class="harden-premium__body" data-premium-id="' + item.id + '" style="display:none;"></div>';
    html += '</div>';
    return html;
  }

  /* ── Render premium body content ── */
  function renderPremiumBody(item) {
    var p = item.premium;
    if (!p) return '<p style="padding:1rem;opacity:.7;">No advanced guidance available yet.</p>';
    var html = '';

    if (p.attackPerspective) {
      html += '<div class="harden-premium__block">';
      html += '<h4 class="harden-premium__heading">' + (typeof scwIcon === 'function' ? scwIcon('swords') : '') + ' Real-World Exposure</h4>';
      html += '<p class="harden-premium__text">' + esc(p.attackPerspective) + '</p>';
      html += '</div>';
    }
    if (p.implementationNotes) {
      html += '<div class="harden-premium__block">';
      html += '<h4 class="harden-premium__heading">' + (typeof scwIcon === 'function' ? scwIcon('settings') : '') + ' Practical Execution</h4>';
      html += '<pre class="harden-premium__code"><code>' + esc(p.implementationNotes) + '</code></pre>';
      html += '</div>';
    }
    if (p.validationNotes) {
      html += '<div class="harden-premium__block">';
      html += '<h4 class="harden-premium__heading">' + (typeof scwIcon === 'function' ? scwIcon('check') : '') + ' Verification</h4>';
      html += '<pre class="harden-premium__code"><code>' + esc(p.validationNotes) + '</code></pre>';
      html += '</div>';
    }
    if (p.tuningNotes) {
      html += '<div class="harden-premium__block">';
      html += '<h4 class="harden-premium__heading">' + (typeof scwIcon === 'function' ? scwIcon('crosshair') : '') + ' Considerations</h4>';
      html += '<p class="harden-premium__text">' + esc(p.tuningNotes) + '</p>';
      html += '</div>';
    }
    if (p.advancedDetection) {
      html += '<div class="harden-premium__block">';
      html += '<h4 class="harden-premium__heading">' + (typeof scwIcon === 'function' ? scwIcon('search') : '') + ' Operational Signals</h4>';
      html += '<pre class="harden-premium__code"><code>' + esc(p.advancedDetection) + '</code></pre>';
      html += '</div>';
    }
    if (p.relatedIds && p.relatedIds.length) {
      html += '<div class="harden-premium__block">';
      html += '<h4 class="harden-premium__heading">' + (typeof scwIcon === 'function' ? scwIcon('link') : '') + ' Related Items</h4>';
      html += '<div class="harden-premium__related">';
      p.relatedIds.forEach(function (rid) {
        var rel = (window.HARDEN_ITEMS || []).find(function (r) { return r.id === rid; });
        if (rel) {
          html += '<span class="harden-premium__related-tag" data-goto="' + rid + '">' + esc(rel.id) + ': ' + esc(rel.title) + '</span>';
        }
      });
      html += '</div></div>';
    }

    html += '<div class="harden-premium__actions">';
    html += '<button class="btn btn--ghost btn--sm harden-premium__copy" data-id="' + item.id + '">' + (typeof scwIcon === 'function' ? scwIcon('clipboard') : '') + ' Copy Elite Guidance</button>';
    html += '<button class="btn btn--ghost btn--sm harden-premium__export" data-id="' + item.id + '">' + (typeof scwIcon === 'function' ? scwIcon('file') : '') + ' Export Full Playbook</button>';
    html += '</div>';

    html += '<p class="harden-premium__disclaimer">Built from real-world security experience. Always validate before production use.</p>';

    return html;
  }

  /* ── Search across all platforms ── */
  function searchAll(query) {
    var q = query.trim().toLowerCase();
    if (!q || q.length < 2) {
      exitSearch();
      return;
    }
    searchMode = true;
    globalCategoryMode = false;
    var tokens = q.split(/\s+/);
    var items = (window.HARDEN_ITEMS || []).filter(function (i) {
      var haystack = (i.title + ' ' + i.description + ' ' + i.platform + ' ' + i.category + ' ' + (i.command || '') + ' ' + (i.tags || []).join(' ')).toLowerCase();
      return tokens.every(function (t) { return haystack.indexOf(t) !== -1; });
    });
    renderItems(items, null);

    /* Show search info */
    var info = document.getElementById('hardenSearchInfo');
    if (info) {
      info.style.display = '';
      info.textContent = items.length + ' result' + (items.length !== 1 ? 's' : '') + ' for "' + query.trim() + '" across all platforms';
    }

    /* Deselect platform buttons */
    document.querySelectorAll('.harden-platform-btn').forEach(function (btn) {
      btn.classList.remove('active');
    });
  }

  function exitSearch() {
    searchMode = false;
    var info = document.getElementById('hardenSearchInfo');
    if (info) info.style.display = 'none';
    var clearBtn = document.getElementById('hardenSearchClear');
    if (clearBtn) clearBtn.style.display = 'none';
    if (activePlatform) {
      renderChecklist(activePlatform);
    } else {
      /* Reset to initial state */
      var list = document.getElementById('hardenList');
      if (list) list.innerHTML = '';
      document.getElementById('hardenCatFilters').style.display = 'none';
      document.getElementById('hardenSevFilters').style.display = 'none';
      document.getElementById('hardenProgress').style.display = 'none';
      document.getElementById('hardenStats').style.display = 'none';
      document.getElementById('hardenBreak').style.display = 'none';
      document.getElementById('hardenExport').style.display = 'none';
    }
  }

  /* ── Render checklist ── */
  function renderChecklist(platform) {
    activePlatform = platform;
    globalCategoryMode = false;
    var items = (window.HARDEN_ITEMS || []).filter(function (i) { return i.platform === platform; });
    renderItems(items, platform);
  }

  /* ── Render cross-platform category ── */
  function renderGlobalCategory(category) {
    globalCategoryMode = true;
    var items = (window.HARDEN_ITEMS || []).filter(function (i) { return i.category === category; });
    renderItems(items, null);

    /* Deselect platform buttons when in global mode */
    document.querySelectorAll('.harden-platform-btn').forEach(function (btn) {
      btn.classList.remove('active');
    });
  }

  /* ── Shared render logic ── */
  function renderItems(items, platform) {
    var checked = getChecked();

    /* Show controls */
    document.getElementById('hardenCatFilters').style.display = '';
    document.getElementById('hardenSevFilters').style.display = '';
    document.getElementById('hardenProgress').style.display = '';
    document.getElementById('hardenStats').style.display = '';
    document.getElementById('hardenBreak').style.display = '';
    document.getElementById('hardenExport').style.display = '';

    /* Auth banner — hidden (all content is open) */
    var banner = document.getElementById('hardenAuthBanner');
    if (banner) banner.style.display = 'none';

    /* Stats */
    var critCount = items.filter(function (i) { return i.severity === 'critical'; }).length;
    var highCount = items.filter(function (i) { return i.severity === 'high'; }).length;
    document.getElementById('hardenTotal').textContent = items.length;
    document.getElementById('hardenCritical').textContent = critCount;
    document.getElementById('hardenHigh').textContent = highCount;

    /* Active platform button — only when not global */
    if (platform) {
      document.querySelectorAll('.harden-platform-btn').forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.platform === platform);
      });
    }

    /* Reset severity filter */
    document.querySelectorAll('#hardenSevFilters .vault-filter').forEach(function (b) {
      b.classList.toggle('active', b.dataset.sev === 'all');
    });

    /* Build cards */
    var list = document.getElementById('hardenList');
    var html = '';
    items.forEach(function (item) {
      var isChecked = checked[item.id] ? 'checked' : '';
      html += '<div class="harden-item' + (checked[item.id] ? ' harden-item--done' : '') + (item.hasPremium ? ' harden-item--has-premium' : '') + '" id="tip-' + escapeAttr(item.id) + '" data-id="' + escapeAttr(item.id) + '" data-cat="' + escapeAttr(item.category) + '" data-sev="' + escapeAttr(item.severity) + '">';
      html += '  <div class="harden-item__header">';
      html += '    <label class="harden-item__check"><input type="checkbox" ' + isChecked + ' data-id="' + escapeAttr(item.id) + '"><span class="harden-item__title">' + esc(item.title) + '</span></label>';
      html += '    <div class="harden-item__badges">';
      html += '      <span class="badge badge--' + sevBadge(item.severity) + '">' + esc(item.severity) + '</span>';
      html += '      <span class="tag">' + esc(item.category) + '</span>';
      /* Show platform badge in global category mode */
      if (globalCategoryMode) {
        html += '      <span class="badge badge--vault">' + esc(item.platform.toUpperCase()) + '</span>';
      }
      if (item.hasPremium) {
        html += '      <span class="badge badge--premium" title="Elite Guidance available">★</span>';
      }
      html += '    </div>';
      html += '  </div>';
      html += '  <p class="harden-item__desc">' + esc(item.description) + '</p>';
      html += '  <p class="harden-item__ref">' + (typeof scwIcon === 'function' ? scwIcon('paperclip') : '') + ' ' + esc(item.reference) + '</p>';
      if (item.command) {
        html += '  <div class="dl-rule__code harden-item__code">';
        html += '    <button class="dl-copy-btn" title="Copy command">' + (typeof scwIcon === 'function' ? scwIcon('clipboard') : '') + '</button>';
        html += '    <pre><code>' + esc(item.command.trim()) + '</code></pre>';
        html += '  </div>';
      }
      if (item.commandFull) {
        html += '  <div class="dl-rule__code harden-item__code harden-item__code--full">';
        html += '    <span class="harden-item__code-label">Full Command</span>';
        html += '    <button class="dl-copy-btn" title="Copy full command">' + (typeof scwIcon === 'function' ? scwIcon('clipboard') : '') + '</button>';
        html += '    <pre><code>' + esc(item.commandFull.trim()) + '</code></pre>';
        html += '  </div>';
      }
      if (item.tags && item.tags.length) {
        html += '  <div class="harden-item__tags">';
        item.tags.forEach(function (t) { html += '<span class="harden-item__tag">' + esc(t) + '</span>'; });
        html += '  </div>';
      }
      html += buildPremiumSection(item);
      html += '</div>';
    });
    list.innerHTML = html;

    updateProgress(items, checked);
  }

  /* ── Progress ── */
  function updateProgress(items, checked) {
    if (!items) {
      if (globalCategoryMode) {
        /* In global mode, get items from current displayed cards */
        var activeCat = 'all';
        document.querySelectorAll('#hardenCatFilters .vault-filter.active').forEach(function (b) { activeCat = b.dataset.cat; });
        items = (window.HARDEN_ITEMS || []).filter(function (i) { return i.category === activeCat; });
      } else {
        items = (window.HARDEN_ITEMS || []).filter(function (i) { return i.platform === activePlatform; });
      }
    }
    if (!checked) checked = getChecked();

    var done = items.filter(function (i) { return checked[i.id]; }).length;
    var pct = items.length ? Math.round((done / items.length) * 100) : 0;

    document.getElementById('hardenProgressFill').style.width = pct + '%';
    document.getElementById('hardenProgressText').textContent = done + ' / ' + items.length + ' completed (' + pct + '%)';
    document.getElementById('hardenDone').textContent = done;
  }

  /* ── Filter (severity only — category triggers full re-render) ── */
  function applyFilters() {
    var activeSev = 'all';
    document.querySelectorAll('#hardenSevFilters .vault-filter.active').forEach(function (b) { activeSev = b.dataset.sev; });

    document.querySelectorAll('.harden-item').forEach(function (item) {
      var sevMatch = activeSev === 'all' || item.dataset.sev === activeSev;
      item.style.display = sevMatch ? '' : 'none';
    });
  }

  /* ── Export ── */
  function exportMarkdown() {
    var items;
    var label;
    if (globalCategoryMode) {
      var activeCat = 'all';
      document.querySelectorAll('#hardenCatFilters .vault-filter.active').forEach(function (b) { activeCat = b.dataset.cat; });
      items = (window.HARDEN_ITEMS || []).filter(function (i) { return i.category === activeCat; });
      label = activeCat.toUpperCase() + ' (All Platforms)';
    } else {
      if (!activePlatform) return Promise.resolve('');
      items = (window.HARDEN_ITEMS || []).filter(function (i) { return i.platform === activePlatform; });
      label = activePlatform.toUpperCase() + ' Hardening';
    }

    /* Fetch premium for all relevant platforms */
    var platforms = {};
    items.forEach(function (i) { platforms[i.platform] = true; });
    var fetches = Object.keys(platforms).map(function (p) {
      return fetchPremiumData(p).then(function (data) { attachPremium(p, data); });
    });

    return Promise.all(fetches).then(function () {
      var checked = getChecked();
      var lines = ['# LockDown — ' + label, ''];
      lines.push('Generated by [SCW LockDown](https://shimiscyberworld.com/hardening/)', '');

      items.forEach(function (item) {
        var mark = checked[item.id] ? 'x' : ' ';
        lines.push('- [' + mark + '] **[' + item.severity.toUpperCase() + ']** ' + item.title);
        lines.push('  - ' + item.description);
        lines.push('  - Ref: ' + item.reference);
        if (item.command) {
          lines.push('  ```');
          lines.push('  ' + item.command.trim().split('\n').join('\n  '));
          lines.push('  ```');
        }
        if (item.hasPremium && item.premium) {
          var p = item.premium;
          if (p.attackPerspective) lines.push('  **Real-World Exposure:** ' + p.attackPerspective);
          if (p.implementationNotes) {
            lines.push('  **Practical Execution:**');
            lines.push('  ```');
            lines.push('  ' + p.implementationNotes.split('\n').join('\n  '));
            lines.push('  ```');
          }
          if (p.validationNotes) {
            lines.push('  **Verification:**');
            lines.push('  ```');
            lines.push('  ' + p.validationNotes.split('\n').join('\n  '));
            lines.push('  ```');
          }
          if (p.tuningNotes) lines.push('  **Considerations:** ' + p.tuningNotes);
          if (p.advancedDetection) {
            lines.push('  **Operational Signals:**');
            lines.push('  ```');
            lines.push('  ' + p.advancedDetection.split('\n').join('\n  '));
            lines.push('  ```');
          }
        }
        lines.push('');
      });

      return lines.join('\n');
    });
  }

  function downloadMd() {
    exportMarkdown().then(function (md) {
      if (!md) return;
      var blob = new Blob([md], { type: 'text/markdown' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'lockdown-' + (globalCategoryMode ? 'category' : activePlatform) + '.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  function copyMd() {
    exportMarkdown().then(function (md) {
      if (!md) return;
      navigator.clipboard.writeText(md).then(function () {
        var btn = document.getElementById('hardenCopyMd');
        btn.innerHTML = (typeof scwIcon === 'function' ? scwIcon('check') : '') + ' Copied!';
        setTimeout(function () { btn.innerHTML = (typeof scwIcon === 'function' ? scwIcon('clipboard') : '') + ' Copy as Markdown'; }, 1500);
      });
    });
  }

  /* ── Export single item playbook ── */
  function exportItemPlaybook(itemId) {
    var item = (window.HARDEN_ITEMS || []).find(function (i) { return i.id === itemId; });
    if (!item) return;
    fetchPremiumData(item.platform).then(function (data) {
      attachPremium(item.platform, data);
      var p = item.premium;
      if (!p) return;
      var lines = [
        '# LockDown Playbook: ' + item.title, '',
        '**Severity:** ' + item.severity.toUpperCase(),
        '**Category:** ' + item.category,
        '**Platform:** ' + item.platform,
        '**Reference:** ' + (item.reference || 'N/A'), '',
        '## Summary', item.description, ''
      ];
      if (item.command) lines.push('## Command', '```', item.command.trim(), '```', '');
      if (p.attackPerspective) lines.push('## Real-World Exposure', p.attackPerspective, '');
      if (p.implementationNotes) lines.push('## Practical Execution', '```', p.implementationNotes, '```', '');
      if (p.validationNotes) lines.push('## Verification', '```', p.validationNotes, '```', '');
      if (p.tuningNotes) lines.push('## Considerations', p.tuningNotes, '');
      if (p.advancedDetection) lines.push('## Operational Signals', '```', p.advancedDetection, '```', '');
      lines.push('---', 'Generated by [SCW LockDown](https://shimiscyberworld.com/hardening/)');
      var md = lines.join('\n');
      var blob = new Blob([md], { type: 'text/markdown' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = 'playbook-' + itemId + '.md';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  /* ── Copy premium content ── */
  function copyPremiumContent(itemId) {
    var item = (window.HARDEN_ITEMS || []).find(function (i) { return i.id === itemId; });
    if (!item || !item.premium) return;
    var p = item.premium;
    var parts = [item.title + ' — Elite Guidance\n'];
    if (p.attackPerspective) parts.push('Real-World Exposure:\n' + p.attackPerspective + '\n');
    if (p.implementationNotes) parts.push('Practical Execution:\n' + p.implementationNotes + '\n');
    if (p.validationNotes) parts.push('Verification:\n' + p.validationNotes + '\n');
    if (p.tuningNotes) parts.push('Considerations:\n' + p.tuningNotes + '\n');
    if (p.advancedDetection) parts.push('Operational Signals:\n' + p.advancedDetection + '\n');
    navigator.clipboard.writeText(parts.join('\n'));
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    var platforms = document.getElementById('hardenPlatforms');
    if (!platforms) return;

    /* Search input with debounce */
    var searchInput = document.getElementById('hardenSearch');
    var searchClear = document.getElementById('hardenSearchClear');
    var searchTimer = null;
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        clearTimeout(searchTimer);
        var val = this.value;
        if (searchClear) searchClear.style.display = val.length > 0 ? '' : 'none';
        searchTimer = setTimeout(function () { searchAll(val); }, 250);
      });
      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          this.value = '';
          exitSearch();
        }
      });
    }
    if (searchClear) {
      searchClear.addEventListener('click', function () {
        if (searchInput) searchInput.value = '';
        exitSearch();
      });
    }

    /* Platform select */
    platforms.addEventListener('click', function (e) {
      var btn = e.target.closest('.harden-platform-btn');
      if (!btn) return;
      /* Clear search and exit search mode */
      if (searchInput) searchInput.value = '';
      searchMode = false;
      var info = document.getElementById('hardenSearchInfo');
      if (info) info.style.display = 'none';
      if (searchClear) searchClear.style.display = 'none';
      /* Reset category filter to "All" when switching platforms */
      document.querySelectorAll('#hardenCatFilters .vault-filter').forEach(function (b) {
        b.classList.toggle('active', b.dataset.cat === 'all');
      });
      renderChecklist(btn.dataset.platform);
    });

    /* Checkbox toggle */
    document.getElementById('hardenList').addEventListener('change', function (e) {
      if (e.target.type !== 'checkbox') return;
      var id = e.target.dataset.id;
      var checked = getChecked();
      if (e.target.checked) {
        checked[id] = true;
      } else {
        delete checked[id];
      }
      saveChecked(checked);

      var card = e.target.closest('.harden-item');
      if (card) card.classList.toggle('harden-item--done', e.target.checked);

      updateProgress();
    });

    /* Delegated click handler for the list */
    document.getElementById('hardenList').addEventListener('click', function (e) {
      /* Copy command */
      var copyBtn = e.target.closest('.dl-copy-btn');
      if (copyBtn) {
        var code = copyBtn.parentElement.querySelector('code');
        if (!code) return;
        navigator.clipboard.writeText(code.textContent).then(function () {
          copyBtn.innerHTML = typeof scwIcon === 'function' ? scwIcon('check') : '✓';
          setTimeout(function () { copyBtn.innerHTML = typeof scwIcon === 'function' ? scwIcon('clipboard') : ''; }, 1200);
        });
        return;
      }

      /* Premium toggle — lazy load */
      var toggleBtn = e.target.closest('.harden-premium__toggle');
      if (toggleBtn) {
        var tid = toggleBtn.dataset.id;
        var body = document.querySelector('[data-premium-id="' + CSS.escape(tid) + '"]');
        if (!body) return;
        var isOpen = body.style.display !== 'none';
        if (isOpen) {
          body.style.display = 'none';
          var icon = toggleBtn.querySelector('.harden-premium__toggle-icon');
          if (icon) icon.textContent = '▸';
          return;
        }
        /* Lazy load: fetch premium if not yet attached */
        var item = (window.HARDEN_ITEMS || []).find(function (i) { return i.id === tid; });
        if (!item) return;
        if (!item.premium) {
          body.innerHTML = '<p style="padding:1rem;opacity:.7;">Loading…</p>';
          body.style.display = '';
          var icon2 = toggleBtn.querySelector('.harden-premium__toggle-icon');
          if (icon2) icon2.textContent = '▾';
          fetchPremiumData(item.platform).then(function (data) {
            attachPremium(item.platform, data);
            body.innerHTML = renderPremiumBody(item);
          });
        } else {
          if (!body.innerHTML) body.innerHTML = renderPremiumBody(item);
          body.style.display = '';
          var icon3 = toggleBtn.querySelector('.harden-premium__toggle-icon');
          if (icon3) icon3.textContent = '▾';
        }
        return;
      }

      /* Premium copy */
      var premCopy = e.target.closest('.harden-premium__copy');
      if (premCopy) {
        copyPremiumContent(premCopy.dataset.id);
        premCopy.innerHTML = (typeof scwIcon === 'function' ? scwIcon('check') : '') + ' Copied!';
        setTimeout(function () { premCopy.innerHTML = (typeof scwIcon === 'function' ? scwIcon('clipboard') : '') + ' Copy Elite Guidance'; }, 1500);
        return;
      }

      /* Premium export */
      var premExport = e.target.closest('.harden-premium__export');
      if (premExport) {
        exportItemPlaybook(premExport.dataset.id);
        return;
      }

      /* Related item navigation */
      var relTag = e.target.closest('.harden-premium__related-tag');
      if (relTag) {
        var targetId = relTag.dataset.goto;
        var targetEl = document.querySelector('[data-id="' + CSS.escape(targetId) + '"]');
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetEl.classList.add('harden-item--highlight');
          setTimeout(function () { targetEl.classList.remove('harden-item--highlight'); }, 2000);
        }
        return;
      }
    });

    /* Category filter — global across all platforms */
    document.getElementById('hardenCatFilters').addEventListener('click', function (e) {
      var btn = e.target.closest('.vault-filter');
      if (!btn) return;
      this.querySelectorAll('.vault-filter').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var cat = btn.dataset.cat;
      if (cat === 'all') {
        /* "All Categories" → go back to platform view if one was selected */
        if (activePlatform) {
          renderChecklist(activePlatform);
        }
      } else {
        /* Specific category → show items from ALL platforms */
        renderGlobalCategory(cat);
        /* Then apply severity filter on top */
        applyFilters();
      }
    });

    /* Severity filter */
    document.getElementById('hardenSevFilters').addEventListener('click', function (e) {
      var btn = e.target.closest('.vault-filter');
      if (!btn) return;
      this.querySelectorAll('.vault-filter').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilters();
    });

    /* Export */
    document.getElementById('hardenExportMd').addEventListener('click', downloadMd);
    document.getElementById('hardenCopyMd').addEventListener('click', copyMd);
    document.getElementById('hardenReset').addEventListener('click', function () {
      var checked = getChecked();
      var items;
      if (globalCategoryMode) {
        var activeCat = 'all';
        document.querySelectorAll('#hardenCatFilters .vault-filter.active').forEach(function (b) { activeCat = b.dataset.cat; });
        items = (window.HARDEN_ITEMS || []).filter(function (i) { return i.category === activeCat; });
        items.forEach(function (i) { delete checked[i.id]; });
        saveChecked(checked);
        renderGlobalCategory(activeCat);
      } else {
        if (!activePlatform) return;
        items = (window.HARDEN_ITEMS || []).filter(function (i) { return i.platform === activePlatform; });
        items.forEach(function (i) { delete checked[i.id]; });
        saveChecked(checked);
        renderChecklist(activePlatform);
      }
    });

    /* ── Deep-link handler: #tip-<id> ── */
    function handleTipDeepLink() {
      var hash = window.location.hash;
      if (!hash || !hash.startsWith('#tip-')) return;
      var tipId = hash.slice(1).replace(/^tip-/, '');
      var item = (window.HARDEN_ITEMS || []).find(function (i) { return i.id === tipId; });
      if (!item) return;

      /* Auto-select the platform to render the checklist */
      activePlatform = item.platform;
      globalCategoryMode = false;
      renderChecklist(item.platform);

      /* Wait for DOM update, then scroll and highlight */
      setTimeout(function () {
        var el = document.getElementById('tip-' + tipId);
        if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('harden-item--highlight');
        setTimeout(function () { el.classList.remove('harden-item--highlight'); }, 3000);
      }, 150);
    }

    handleTipDeepLink();
    window.addEventListener('hashchange', handleTipDeepLink);

  });
})();
