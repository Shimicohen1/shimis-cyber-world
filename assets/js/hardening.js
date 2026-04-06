/* Hardening Checklist Generator — interactive checklist with localStorage persistence */
(function () {
  'use strict';

  var activePlatform = null;
  var STORAGE_KEY = 'scw_harden_checked';

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
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  /* ── Render checklist ── */
  function renderChecklist(platform) {
    activePlatform = platform;
    var items = (window.HARDEN_ITEMS || []).filter(function (i) { return i.platform === platform; });
    var checked = getChecked();

    /* Show controls */
    document.getElementById('hardenCatFilters').style.display = '';
    document.getElementById('hardenSevFilters').style.display = '';
    document.getElementById('hardenProgress').style.display = '';
    document.getElementById('hardenStats').style.display = '';
    document.getElementById('hardenBreak').style.display = '';
    document.getElementById('hardenExport').style.display = '';

    /* Stats */
    var critCount = items.filter(function (i) { return i.severity === 'critical'; }).length;
    var highCount = items.filter(function (i) { return i.severity === 'high'; }).length;
    document.getElementById('hardenTotal').textContent = items.length;
    document.getElementById('hardenCritical').textContent = critCount;
    document.getElementById('hardenHigh').textContent = highCount;

    /* Active platform button */
    document.querySelectorAll('.harden-platform-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.platform === platform);
    });

    /* Reset filters */
    document.querySelectorAll('#hardenCatFilters .vault-filter, #hardenSevFilters .vault-filter').forEach(function (b) {
      b.classList.toggle('active', b.dataset.cat === 'all' || b.dataset.sev === 'all');
    });

    /* Build cards */
    var list = document.getElementById('hardenList');
    var html = '';
    items.forEach(function (item) {
      var isChecked = checked[item.id] ? 'checked' : '';
      html += '<div class="harden-item' + (checked[item.id] ? ' harden-item--done' : '') + '" data-id="' + item.id + '" data-cat="' + item.category + '" data-sev="' + item.severity + '">';
      html += '  <div class="harden-item__header">';
      html += '    <label class="harden-item__check"><input type="checkbox" ' + isChecked + ' data-id="' + item.id + '"><span class="harden-item__title">' + esc(item.title) + '</span></label>';
      html += '    <div class="harden-item__badges">';
      html += '      <span class="badge badge--' + sevBadge(item.severity) + '">' + item.severity + '</span>';
      html += '      <span class="tag">' + esc(item.category) + '</span>';
      html += '    </div>';
      html += '  </div>';
      html += '  <p class="harden-item__desc">' + esc(item.description) + '</p>';
      html += '  <p class="harden-item__ref">📎 ' + esc(item.reference) + '</p>';
      if (item.command) {
        html += '  <div class="dl-rule__code harden-item__code">';
        html += '    <button class="dl-copy-btn" title="Copy command">📋</button>';
        html += '    <pre><code>' + esc(item.command.trim()) + '</code></pre>';
        html += '  </div>';
      }
      html += '</div>';
    });
    list.innerHTML = html;

    updateProgress(items, checked);
  }

  /* ── Progress ── */
  function updateProgress(items, checked) {
    if (!items) {
      items = (window.HARDEN_ITEMS || []).filter(function (i) { return i.platform === activePlatform; });
    }
    if (!checked) checked = getChecked();

    var done = items.filter(function (i) { return checked[i.id]; }).length;
    var pct = items.length ? Math.round((done / items.length) * 100) : 0;

    document.getElementById('hardenProgressFill').style.width = pct + '%';
    document.getElementById('hardenProgressText').textContent = done + ' / ' + items.length + ' completed (' + pct + '%)';
    document.getElementById('hardenDone').textContent = done;
  }

  /* ── Filter ── */
  function applyFilters() {
    var activeCat = 'all';
    var activeSev = 'all';
    document.querySelectorAll('#hardenCatFilters .vault-filter.active').forEach(function (b) { activeCat = b.dataset.cat; });
    document.querySelectorAll('#hardenSevFilters .vault-filter.active').forEach(function (b) { activeSev = b.dataset.sev; });

    document.querySelectorAll('.harden-item').forEach(function (item) {
      var catMatch = activeCat === 'all' || item.dataset.cat === activeCat;
      var sevMatch = activeSev === 'all' || item.dataset.sev === activeSev;
      item.style.display = (catMatch && sevMatch) ? '' : 'none';
    });
  }

  /* ── Export ── */
  function exportMarkdown() {
    if (!activePlatform) return;
    var items = (window.HARDEN_ITEMS || []).filter(function (i) { return i.platform === activePlatform; });
    var checked = getChecked();
    var lines = ['# Security Hardening Checklist — ' + activePlatform.toUpperCase(), ''];
    lines.push('Generated by [Shimi\'s Cyber World](https://shimiscyberworld.com/hardening/)', '');

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
      lines.push('');
    });

    return lines.join('\n');
  }

  function downloadMd() {
    var md = exportMarkdown();
    if (!md) return;
    var blob = new Blob([md], { type: 'text/markdown' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'hardening-checklist-' + activePlatform + '.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function copyMd() {
    var md = exportMarkdown();
    if (!md) return;
    navigator.clipboard.writeText(md).then(function () {
      var btn = document.getElementById('hardenCopyMd');
      btn.textContent = '✅ Copied!';
      setTimeout(function () { btn.textContent = '📋 Copy as Markdown'; }, 1500);
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    var platforms = document.getElementById('hardenPlatforms');
    if (!platforms) return;

    /* Platform select */
    platforms.addEventListener('click', function (e) {
      var btn = e.target.closest('.harden-platform-btn');
      if (!btn) return;
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

    /* Copy command */
    document.getElementById('hardenList').addEventListener('click', function (e) {
      var btn = e.target.closest('.dl-copy-btn');
      if (!btn) return;
      var code = btn.parentElement.querySelector('code');
      if (!code) return;
      navigator.clipboard.writeText(code.textContent).then(function () {
        btn.textContent = '✅';
        setTimeout(function () { btn.textContent = '📋'; }, 1200);
      });
    });

    /* Category filter */
    document.getElementById('hardenCatFilters').addEventListener('click', function (e) {
      var btn = e.target.closest('.vault-filter');
      if (!btn) return;
      this.querySelectorAll('.vault-filter').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilters();
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
      if (!activePlatform) return;
      var checked = getChecked();
      var items = (window.HARDEN_ITEMS || []).filter(function (i) { return i.platform === activePlatform; });
      items.forEach(function (i) { delete checked[i.id]; });
      saveChecked(checked);
      renderChecklist(activePlatform);
    });
  });
})();
