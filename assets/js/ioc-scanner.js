/* ThreatLens — client-side indicator parser + threat intel link generator */
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

  var TYPE_LABELS = {
    ip: 'IP Address', hash: 'File Hash', domain: 'Domain',
    url: 'URL', email: 'Email Address'
  };

  var TYPE_ICONS = {
    ip: '🌐', hash: '#️⃣', domain: '🔗', url: '🔗', email: '📧'
  };

  var TYPE_BADGE = {
    ip: 'signal', hash: 'live', domain: 'drop',
    url: 'vault', email: 'signal'
  };

  /* Risk context per IOC type */
  var TYPE_RISK = {
    ip: 'Malicious IPs may indicate C2 servers, compromised hosts, or scanning infrastructure. If this IP appears in your logs, investigate all connections to and from it and check for lateral movement.',
    hash: 'A file hash matching known malware is a confirmed threat indicator. If this hash was found on your systems, the associated file should be quarantined immediately and incident response initiated.',
    domain: 'Malicious domains may host phishing pages, deliver malware payloads, or serve as C2 infrastructure. If users accessed this domain, check for downloaded files and credential exposure.',
    url: 'Malicious URLs deliver payloads, harvest credentials, or redirect to exploit kits. DO NOT visit this URL directly — use the sandboxed analysis tools below to inspect it safely.',
    email: 'If this email appeared in any breach, attackers already have it. They use leaked emails to attempt password reuse (credential stuffing) across hundreds of sites, craft targeted phishing emails that look legitimate, and sell the data on darknet markets. The more breaches an email appears in, the higher the risk — each breach may have leaked different data: passwords, phone numbers, home addresses, IP addresses, or financial information.'
  };

  /* Recommended actions per IOC type */
  var TYPE_ACTIONS = {
    ip: 'Block at firewall/proxy • Search SIEM for historical connections • Check for lateral movement • Add to watchlist • Notify affected users if internal IP',
    hash: 'Quarantine the file • Run full endpoint scan • Check for persistence mechanisms (run keys, scheduled tasks) • Search for the hash across all endpoints • Preserve evidence',
    domain: 'Block in DNS/proxy • Check who accessed it and when • Scan endpoints that connected • Look for downloaded payloads • Review email logs for phishing links to this domain',
    url: 'Block the URL in proxy/email gateway • Identify users who clicked • Check endpoints for downloads • Review browser history • Reset credentials if it was a phishing page',
    email: 'Reset ALL passwords associated with this email immediately • Enable MFA on every account • Check for unauthorized email forwarding rules • Search for this email on Have I Been Pwned to see exact breaches • Monitor for phishing emails targeting this address • Audit recent login activity • Consider using a password manager to generate unique passwords per site'
  };

  /* What could be exposed — shown for email type */
  var EMAIL_EXPOSURE_ITEMS = [
    { icon: '🔑', label: 'Passwords', desc: 'Plaintext or hashed passwords from breached databases' },
    { icon: '📱', label: 'Phone numbers', desc: 'Mobile/home numbers linked to accounts' },
    { icon: '🏠', label: 'Physical address', desc: 'Home or work addresses from account profiles' },
    { icon: '🌐', label: 'IP addresses', desc: 'Login IPs revealing your location and ISP' },
    { icon: '💳', label: 'Financial data', desc: 'Partial credit cards, bank details, purchase history' },
    { icon: '👤', label: 'Personal info', desc: 'Full name, date of birth, gender, employer' },
    { icon: '💬', label: 'Private messages', desc: 'DMs, chat logs, forum posts, support tickets' },
    { icon: '🔗', label: 'Connected accounts', desc: 'Other services linked via this email (OAuth, SSO)' }
  ];

  /* Known major breach databases — shown for email type to give context */
  var KNOWN_BREACHES = [
    { name: 'LinkedIn', year: 2021, records: '700M', data: 'Email, name, phone, job title, employer, location, profile URL', icon: '💼' },
    { name: 'Facebook', year: 2021, records: '533M', data: 'Email, phone, name, DOB, location, relationship status', icon: '📘' },
    { name: 'Twitter / X', year: 2023, records: '200M', data: 'Email, name, username, phone, profile data, followers', icon: '🐦' },
    { name: 'Adobe', year: 2013, records: '153M', data: 'Email, encrypted passwords, password hints, usernames', icon: '🎨' },
    { name: 'Canva', year: 2019, records: '137M', data: 'Email, username, name, city, country, bcrypt password hash', icon: '🖼️' },
    { name: 'Dropbox', year: 2012, records: '68M', data: 'Email, bcrypt/SHA-1 password hashes', icon: '📦' },
    { name: 'Telegram', year: 2024, records: '41M', data: 'Phone numbers, usernames, user IDs', icon: '✈️' },
    { name: 'Deezer', year: 2019, records: '229M', data: 'Email, name, DOB, gender, city, country, IP', icon: '🎵' },
    { name: 'MyFitnessPal', year: 2018, records: '144M', data: 'Email, username, IP, SHA-1 password hashes', icon: '💪' },
    { name: 'Dubsmash', year: 2018, records: '162M', data: 'Email, username, bcrypt password hash, phone, DOB', icon: '🎤' },
    { name: 'Wattpad', year: 2020, records: '271M', data: 'Email, username, name, DOB, bcrypt password hash, IP', icon: '📖' },
    { name: 'Zynga', year: 2019, records: '173M', data: 'Email, username, phone, SHA-1 password hashes', icon: '🎮' },
    { name: 'MGM Resorts', year: 2020, records: '142M', data: 'Name, email, phone, DOB, home address, driver license', icon: '🏨' },
    { name: 'Exactis', year: 2018, records: '340M', data: 'Name, email, phone, address, interests, family details, habits', icon: '📊' },
    { name: 'Collection #1-5', year: 2019, records: '2.2B', data: 'Email + password combos aggregated from thousands of breaches', icon: '📁' },
    { name: 'COMB', year: 2021, records: '3.2B', data: 'Largest credential compilation — email + plaintext passwords from many breaches', icon: '💀' }
  ];

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

    if (PATTERNS.sha256.test(val)) return { raw: val, type: 'sha256', lookup: 'hash' };
    if (PATTERNS.sha1.test(val))   return { raw: val, type: 'sha1',   lookup: 'hash' };
    if (PATTERNS.md5.test(val))    return { raw: val, type: 'md5',    lookup: 'hash' };
    if (PATTERNS.email.test(val))  return { raw: val, type: 'email',  lookup: 'email' };
    if (PATTERNS.url.test(val))    return { raw: val, type: 'url',    lookup: 'url' };
    if (PATTERNS.ipv4.test(val)) {
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
      var encoded = ioc.lookup === 'email' ? ioc.raw : encodeURIComponent(ioc.raw);
      var href = template.replace('{value}', encoded);
      var desc = (src.descs && src.descs[ioc.lookup]) || '';
      links.push({ name: src.name, icon: src.icon, href: href, desc: desc });
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
      results.innerHTML = '<div class="empty-state"><p>No valid indicators found. Paste IPs, domains, hashes, URLs, or emails — one per line.</p></div>';
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
      filterHtml += '<button class="vault-filter" data-type="' + t + '">' + (TYPE_ICONS[t] || '') + ' ' + (TYPE_LABELS[t] || t) + ' (' + count + ')</button>';
    });
    filters.innerHTML = filterHtml;
    filters.style.display = '';

    /* IOC cards — rich intelligence layout */
    var html = '';
    parsed.iocs.forEach(function (ioc) {
      var display = shouldDefang ? defang(ioc.raw, ioc.lookup) : ioc.raw;
      var links = buildLinks(ioc);
      var badgeClass = TYPE_BADGE[ioc.lookup] || 'vault';
      var typeLabel = ioc.type.toUpperCase();
      var riskText = TYPE_RISK[ioc.lookup] || '';
      var actionsText = TYPE_ACTIONS[ioc.lookup] || '';

      html += '<div class="ioc-card" data-type="' + ioc.lookup + '">';

      /* ── Header: type + value ── */
      html += '<div class="ioc-card__header">';
      html += '  <div class="ioc-card__type-row">';
      html += '    <span class="ioc-card__type-icon">' + (TYPE_ICONS[ioc.lookup] || '') + '</span>';
      html += '    <span class="badge badge--' + badgeClass + '">' + typeLabel + '</span>';
      html += '    <span class="ioc-card__label">' + (TYPE_LABELS[ioc.lookup] || ioc.lookup) + '</span>';
      html += '    <span class="ioc-card__source-count">' + links.length + ' sources</span>';
      html += '  </div>';
      html += '  <code class="ioc-card__value">' + escapeHtml(display) + '</code>';
      html += '</div>';

      /* ── Risk context ── */
      if (riskText) {
        html += '<div class="ioc-card__risk">';
        html += '  <div class="ioc-card__risk-title">⚠️ Why this matters</div>';
        html += '  <p class="ioc-card__risk-text">' + escapeHtml(riskText) + '</p>';
        html += '</div>';
      }

      /* ── Email-specific: What could be exposed ── */
      if (ioc.lookup === 'email') {
        html += '<div class="ioc-card__section-title">🚨 What could be exposed</div>';
        html += '<div class="ioc-card__exposure-grid">';
        EMAIL_EXPOSURE_ITEMS.forEach(function (item) {
          html += '<div class="ioc-exposure-item">';
          html += '  <span class="ioc-exposure-item__icon">' + item.icon + '</span>';
          html += '  <div class="ioc-exposure-item__text">';
          html += '    <strong>' + escapeHtml(item.label) + '</strong>';
          html += '    <span>' + escapeHtml(item.desc) + '</span>';
          html += '  </div>';
          html += '</div>';
        });
        html += '</div>';

        /* Domain analysis for email */
        var emailDomain = ioc.raw.split('@')[1];
        if (emailDomain) {
          html += '<div class="ioc-card__domain-note">';
          html += '  <span class="ioc-card__domain-note-icon">🏢</span>';
          html += '  <span>Domain <strong>' + escapeHtml(emailDomain) + '</strong> — ';
          html += 'all accounts registered under this domain may share the same breach exposure. ';
          html += 'Check if other employees or personal accounts use the same domain.</span>';
          html += '</div>';
        }

        /* Known breach databases */
        html += '<div class="ioc-card__section-title">🗄️ Known major breaches (check if this email appears)</div>';
        html += '<div class="ioc-card__breach-note">These are the largest known data breaches. Use <strong>Have I Been Pwned</strong> above to check exactly which ones contain this email.</div>';
        html += '<div class="ioc-card__breach-grid">';
        KNOWN_BREACHES.forEach(function (b) {
          html += '<div class="ioc-breach-item">';
          html += '  <div class="ioc-breach-item__header">';
          html += '    <span class="ioc-breach-item__icon">' + b.icon + '</span>';
          html += '    <strong class="ioc-breach-item__name">' + escapeHtml(b.name) + '</strong>';
          html += '    <span class="ioc-breach-item__meta">' + b.year + ' · ' + b.records + ' records</span>';
          html += '  </div>';
          html += '  <div class="ioc-breach-item__data">Leaked: ' + escapeHtml(b.data) + '</div>';
          html += '</div>';
        });
        html += '</div>';
      }

      /* ── Source links with descriptions ── */
      html += '<div class="ioc-card__section-title">🔍 What each source checks</div>';
      html += '<div class="ioc-card__links">';
      links.forEach(function (l) {
        html += '<a href="' + escapeAttr(l.href) + '" target="_blank" rel="noopener noreferrer" class="ioc-link">';
        html += '  <div class="ioc-link__header">';
        html += '    <span class="ioc-link__icon">' + l.icon + '</span>';
        html += '    <span class="ioc-link__name">' + escapeHtml(l.name) + '</span>';
        html += '    <span class="ioc-link__arrow">↗</span>';
        html += '  </div>';
        if (l.desc) {
          html += '  <p class="ioc-link__desc">' + escapeHtml(l.desc) + '</p>';
        }
        html += '</a>';
      });
      html += '</div>';

      /* ── Next steps ── */
      if (actionsText) {
        html += '<div class="ioc-card__actions">';
        html += '  <div class="ioc-card__actions-title">💡 Recommended actions</div>';
        html += '  <p class="ioc-card__actions-text">' + escapeHtml(actionsText) + '</p>';
        html += '</div>';
      }

      html += '</div>';
    });

    results.innerHTML = html;
    exportDiv.style.display = '';

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
    var rows = ['Type,SubType,Value,Defanged,Sources'];
    window._iocParsed.iocs.forEach(function (ioc) {
      var links = buildLinks(ioc);
      var sourceNames = links.map(function(l) { return l.name; }).join('; ');
      rows.push(ioc.lookup + ',' + ioc.type + ',' + ioc.raw + ',' + defang(ioc.raw, ioc.lookup) + ',"' + sourceNames + '"');
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

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        input.value = '';
        document.getElementById('iocResults').innerHTML = '';
        document.getElementById('iocStats').style.display = 'none';
        document.getElementById('iocFilters').style.display = 'none';
        document.getElementById('iocExport').style.display = 'none';
        input.focus();
      });
    }

    /* Enter = scan immediately (Shift+Enter = newline) */
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        scanBtn.click();
      }
    });

    filtersEl.addEventListener('click', handleFilter);

    document.getElementById('iocExportCsv').addEventListener('click', exportCsv);
    document.getElementById('iocExportTxt').addEventListener('click', exportTxt);
    document.getElementById('iocCopyAll').addEventListener('click', copyAll);
  });
})();
