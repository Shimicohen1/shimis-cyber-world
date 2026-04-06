/* IOC Scanner — client-side indicator parser + threat intel link generator */
(function () {
  'use strict';

  /* ── Type detection ── */
  var PATTERNS = {
    ipv4:   /^(\d{1,3}\.){3}\d{1,3}$/,
    ipv6:   /^([0-9a-f]{1,4}:){2,7}[0-9a-f]{1,4}$/i,
    md5:    /^[a-f0-9]{32}$/i,
    sha1:   /^[a-f0-9]{40}$/i,
    sha256: /^[a-f0-9]{64}$/i,
    email:  /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i,
    url:    /^https?:\/\/.+/i,
    domain: /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z]{2,})+$/i
  };

  /* Map specific hash/ip types to generic lookup type */
  var TYPE_MAP = {
    ipv4: 'ip', ipv6: 'ip',
    md5: 'hash', sha1: 'hash', sha256: 'hash',
    domain: 'domain', url: 'url', email: 'email'
  };

  var TYPE_LABELS = {
    ip: '🌐 IP', hash: '#️⃣ Hash', domain: '🔗 Domain',
    url: '🔗 URL', email: '📧 Email'
  };

  var TYPE_BADGE = {
    ip: 'signal', hash: 'live', domain: 'drop',
    url: 'vault', email: 'signal'
  };

  /* ── Defang / refang ── */
  function defang(val, type) {
    if (type === 'ip' || type === 'domain') {
      return val.replace(/\./g, '[.]');
    }
    if (type === 'url') {
      return val.replace(/^https?/i, function (m) { return m.replace('t', 'x'); })
                .replace(/:\/\//, '[://]')
                .replace(/\./g, '[.]');
    }
    return val;
  }

  function refang(val) {
    return val.replace(/\[\.\]/g, '.').replace(/\[:\/\/\]/g, '://').replace(/^hxxp/i, function (m) { return m.replace('x', 't'); });
  }

  /* ── Detect type ── */
  function detectType(raw) {
    var val = raw.trim();
    if (!val) return null;

    /* Order matters: check hashes first (could look like hex domain) */
    if (PATTERNS.sha256.test(val)) return { raw: val, type: 'sha256', lookup: 'hash' };
    if (PATTERNS.sha1.test(val))   return { raw: val, type: 'sha1',   lookup: 'hash' };
    if (PATTERNS.md5.test(val))    return { raw: val, type: 'md5',    lookup: 'hash' };
    if (PATTERNS.email.test(val))  return { raw: val, type: 'email',  lookup: 'email' };
    if (PATTERNS.url.test(val))    return { raw: val, type: 'url',    lookup: 'url' };
    if (PATTERNS.ipv4.test(val)) {
      /* Validate octets */
      var octets = val.split('.');
      var valid = octets.every(function (o) { return parseInt(o, 10) <= 255; });
      if (valid) return { raw: val, type: 'ipv4', lookup: 'ip' };
    }
    if (PATTERNS.ipv6.test(val))   return { raw: val, type: 'ipv6',   lookup: 'ip' };
    if (PATTERNS.domain.test(val)) return { raw: val, type: 'domain', lookup: 'domain' };

    return null;
  }

  /* ── Parse input ── */
  function parseInput(text) {
    /* Split on newlines, commas, semicolons, spaces, tabs */
    var tokens = text.split(/[\n\r,;\t ]+/).map(function (t) { return refang(t.trim()); }).filter(Boolean);
    var seen = {};
    var results = [];
    var dupes = 0;

    tokens.forEach(function (token) {
      var info = detectType(token);
      if (!info) return;
      var key = info.raw.toLowerCase();
      if (seen[key]) { dupes++; return; }
      seen[key] = true;
      results.push(info);
    });

    return { iocs: results, dupes: dupes, total: tokens.length };
  }

  /* ── Build lookup links ── */
  function buildLinks(ioc) {
    var sources = window.IOC_SOURCES || [];
    var links = [];
    sources.forEach(function (src) {
      if (src.types.indexOf(ioc.lookup) === -1) return;
      var template = src.urls[ioc.lookup];
      if (!template) return;
      var href = template.replace('{value}', encodeURIComponent(ioc.raw));
      links.push({ name: src.name, icon: src.icon, href: href });
    });
    return links;
  }

  /* ── Render ── */
  function render(parsed) {
    var results = document.getElementById('iocResults');
    var stats = document.getElementById('iocStats');
    var filters = document.getElementById('iocFilters');
    var exportDiv = document.getElementById('iocExport');
    var shouldDefang = document.getElementById('iocDefang').checked;

    if (!parsed.iocs.length) {
      results.innerHTML = '<div class="empty-state"><p>No valid indicators found. Paste IPs, domains, hashes, URLs, or emails.</p></div>';
      stats.style.display = 'none';
      filters.style.display = 'none';
      exportDiv.style.display = 'none';
      return;
    }

    /* Stats */
    var types = {};
    parsed.iocs.forEach(function (i) { types[i.lookup] = true; });
    document.getElementById('iocTotalCount').textContent = parsed.total;
    document.getElementById('iocUniqueCount').textContent = parsed.iocs.length;
    document.getElementById('iocTypeCount').textContent = Object.keys(types).length;
    document.getElementById('iocDupeCount').textContent = parsed.dupes;
    stats.style.display = '';

    /* Type filters */
    var filterHtml = '<button class="vault-filter active" data-type="all">All (' + parsed.iocs.length + ')</button>';
    Object.keys(types).forEach(function (t) {
      var count = parsed.iocs.filter(function (i) { return i.lookup === t; }).length;
      filterHtml += '<button class="vault-filter" data-type="' + t + '">' + (TYPE_LABELS[t] || t) + ' (' + count + ')</button>';
    });
    filters.innerHTML = filterHtml;
    filters.style.display = '';

    /* IOC cards */
    var html = '';
    parsed.iocs.forEach(function (ioc) {
      var display = shouldDefang ? defang(ioc.raw, ioc.lookup) : ioc.raw;
      var links = buildLinks(ioc);
      var badgeClass = TYPE_BADGE[ioc.lookup] || 'vault';
      var typeLabel = ioc.type.toUpperCase();

      html += '<div class="ioc-card" data-type="' + ioc.lookup + '">';
      html += '  <div class="ioc-card__header">';
      html += '    <code class="ioc-card__value">' + escapeHtml(display) + '</code>';
      html += '    <div class="ioc-card__badges">';
      html += '      <span class="badge badge--' + badgeClass + '">' + typeLabel + '</span>';
      html += '      <span class="tag">' + (TYPE_LABELS[ioc.lookup] || ioc.lookup) + '</span>';
      html += '    </div>';
      html += '  </div>';
      html += '  <div class="ioc-card__links">';
      links.forEach(function (l) {
        html += '    <a href="' + escapeAttr(l.href) + '" target="_blank" rel="noopener noreferrer" class="ioc-link">';
        html += '      <span class="ioc-link__icon">' + l.icon + '</span>';
        html += '      <span class="ioc-link__name">' + escapeHtml(l.name) + '</span>';
        html += '      <span class="ioc-link__arrow">↗</span>';
        html += '    </a>';
      });
      html += '  </div>';
      html += '</div>';
    });

    results.innerHTML = html;
    exportDiv.style.display = '';

    /* Store for export */
    window._iocParsed = parsed;
  }

  /* ── Filter ── */
  function handleFilter(e) {
    var btn = e.target.closest('.vault-filter');
    if (!btn) return;
    var container = btn.parentElement;
    container.querySelectorAll('.vault-filter').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');

    var type = btn.dataset.type;
    document.querySelectorAll('.ioc-card').forEach(function (card) {
      card.style.display = (type === 'all' || card.dataset.type === type) ? '' : 'none';
    });
  }

  /* ── Export ── */
  function exportCsv() {
    if (!window._iocParsed) return;
    var rows = ['Type,Value,Defanged'];
    window._iocParsed.iocs.forEach(function (ioc) {
      rows.push(ioc.type + ',' + ioc.raw + ',' + defang(ioc.raw, ioc.lookup));
    });
    downloadFile(rows.join('\n'), 'ioc-scan-results.csv', 'text/csv');
  }

  function exportTxt() {
    if (!window._iocParsed) return;
    var lines = window._iocParsed.iocs.map(function (ioc) {
      return defang(ioc.raw, ioc.lookup);
    });
    downloadFile(lines.join('\n'), 'ioc-defanged.txt', 'text/plain');
  }

  function copyAll() {
    if (!window._iocParsed) return;
    var shouldDefang = document.getElementById('iocDefang').checked;
    var lines = window._iocParsed.iocs.map(function (ioc) {
      return shouldDefang ? defang(ioc.raw, ioc.lookup) : ioc.raw;
    });
    navigator.clipboard.writeText(lines.join('\n')).then(function () {
      var btn = document.getElementById('iocCopyAll');
      btn.textContent = '✅ Copied!';
      setTimeout(function () { btn.textContent = '📋 Copy All'; }, 1500);
    });
  }

  function downloadFile(content, filename, mime) {
    var blob = new Blob([content], { type: mime });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ── Util ── */
  function escapeHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function escapeAttr(s) {
    return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    var scanBtn = document.getElementById('iocScanBtn');
    var clearBtn = document.getElementById('iocClearBtn');
    var input = document.getElementById('iocInput');
    var filtersEl = document.getElementById('iocFilters');

    if (!scanBtn || !input) return;

    scanBtn.addEventListener('click', function () {
      var text = input.value.trim();
      if (!text) return;
      var parsed = parseInput(text);
      render(parsed);
    });

    clearBtn.addEventListener('click', function () {
      input.value = '';
      document.getElementById('iocResults').innerHTML = '';
      document.getElementById('iocStats').style.display = 'none';
      document.getElementById('iocFilters').style.display = 'none';
      document.getElementById('iocExport').style.display = 'none';
    });

    /* Enter key triggers scan */
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        scanBtn.click();
      }
    });

    filtersEl.addEventListener('click', handleFilter);

    document.getElementById('iocExportCsv').addEventListener('click', exportCsv);
    document.getElementById('iocExportTxt').addEventListener('click', exportTxt);
    document.getElementById('iocCopyAll').addEventListener('click', copyAll);
  });
})();
