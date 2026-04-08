/* BreachRadar v2 — Dark Web Breach Intelligence Scanner */
(function () {
  'use strict';

  var API_BASE = 'https://www.ransomlook.io/api';
  var API_TIMEOUT = 25000;
  var CORS_PROXIES = [
    function (u) { return u; }, /* direct first — works if CORS ever enabled */
    function (u) { return 'https://corsproxy.io/?' + encodeURIComponent(u); },
    function (u) { return 'https://api.allorigins.win/raw?url=' + encodeURIComponent(u); }
  ];

  /* ── Known ransomware group metadata ── */
  var GROUP_META = {
    lockbit:    { tier: 'critical', aka: 'LockBit 3.0', type: 'RaaS' },
    clop:       { tier: 'critical', aka: 'Cl0p / TA505', type: 'Extortion' },
    alphv:      { tier: 'critical', aka: 'ALPHV / BlackCat', type: 'RaaS' },
    blackbasta: { tier: 'critical', aka: 'Black Basta', type: 'RaaS' },
    play:       { tier: 'high', aka: 'Play', type: 'Extortion' },
    akira:      { tier: 'high', aka: 'Akira', type: 'RaaS' },
    rhysida:    { tier: 'high', aka: 'Rhysida', type: 'RaaS' },
    bianlian:   { tier: 'high', aka: 'BianLian', type: 'Extortion' },
    medusa:     { tier: 'high', aka: 'Medusa', type: 'RaaS' },
    hunters:    { tier: 'high', aka: 'Hunters International', type: 'RaaS' },
    qilin:      { tier: 'high', aka: 'Qilin / Agenda', type: 'RaaS' },
    dragonforce:{ tier: 'medium', aka: 'DragonForce', type: 'Extortion' },
    'lapsus$':  { tier: 'critical', aka: 'Lapsus$', type: 'Extortion' },
    handala:    { tier: 'high', aka: 'Handala Hack', type: 'Hacktivism' },
    incransom:  { tier: 'medium', aka: 'Incransom', type: 'Extortion' },
    anubis:     { tier: 'medium', aka: 'Anubis', type: 'Extortion' }
  };

  /* ── Escape HTML ── */
  function esc(s) {
    if (!s) return '';
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function escAttr(s) {
    if (!s) return '';
    return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ── Date formatting ── */
  function fmtDate(dateStr) {
    if (!dateStr) return 'Unknown';
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  function daysAgo(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    var diff = Math.floor((Date.now() - d.getTime()) / 86400000);
    if (diff === 0) return 'today';
    if (diff === 1) return 'yesterday';
    if (diff < 30) return diff + ' days ago';
    if (diff < 365) return Math.floor(diff / 30) + ' months ago';
    return Math.floor(diff / 365) + ' years ago';
  }

  /* ── Group tier badge ── */
  function groupTier(groupName) {
    var key = (groupName || '').toLowerCase().replace(/[\s_-]+/g, '');
    var meta = GROUP_META[key];
    if (meta) return meta.tier;
    return 'unknown';
  }

  function groupInfo(groupName) {
    var key = (groupName || '').toLowerCase().replace(/[\s_-]+/g, '');
    return GROUP_META[key] || null;
  }

  /* ── Severity color class ── */
  function tierClass(tier) {
    if (tier === 'critical') return 'br-tier--critical';
    if (tier === 'high') return 'br-tier--high';
    if (tier === 'medium') return 'br-tier--medium';
    return 'br-tier--unknown';
  }

  /* ── Build external investigation links ── */
  function buildExternalLinks(query) {
    return [
      { name: 'RansomLook', icon: '🕸️', href: 'https://www.ransomlook.io/search?q=' + encodeURIComponent(query), desc: 'Full victim database with screenshots, group profiles, and threat intelligence' },
      { name: 'Have I Been Pwned', icon: '🔐', href: 'https://haveibeenpwned.com/DomainSearch?d=' + encodeURIComponent(query), desc: 'Check if employee emails from this domain appeared in data breaches' },
      { name: 'IntelX', icon: '🔎', href: 'https://intelx.io/?s=' + encodeURIComponent(query), desc: 'Search leaked databases, paste sites, and dark web forums' },
      { name: 'Shodan', icon: '🌐', href: 'https://www.shodan.io/search?query=hostname%3A' + encodeURIComponent(query), desc: 'Discover exposed services and infrastructure for this domain' },
      { name: 'VirusTotal', icon: '🦠', href: 'https://www.virustotal.com/gui/domain/' + encodeURIComponent(query), desc: 'Domain reputation, DNS history, and associated malware' },
      { name: 'TG: BreachDetect', icon: '📡', href: 'https://t.me/breachdetect', desc: 'Telegram channel monitoring real-time breach announcements' },
      { name: 'TG: Venarix', icon: '📡', href: 'https://t.me/venarix', desc: 'Dark web monitoring and threat actor intelligence channel' },
      { name: 'URLScan', icon: '📸', href: 'https://urlscan.io/search/#domain%3A' + encodeURIComponent(query), desc: 'Visual snapshots and infrastructure analysis' }
    ];
  }

  /* ── Compute threat summary ── */
  function computeSummary(victims) {
    var groups = {};
    var earliest = null;
    var latest = null;
    var leakCount = 0;

    victims.forEach(function (v) {
      var g = v.group || 'Unknown';
      groups[g] = (groups[g] || 0) + 1;

      if (v.isLeak) leakCount++;

      var d = v.discovered;
      if (d) {
        var dt = new Date(d);
        if (!isNaN(dt.getTime())) {
          if (!earliest || dt < earliest) earliest = dt;
          if (!latest || dt > latest) latest = dt;
        }
      }
    });

    return {
      totalIncidents: victims.length,
      uniqueGroups: Object.keys(groups).length,
      groupBreakdown: groups,
      leakCount: leakCount,
      earliest: earliest,
      latest: latest
    };
  }

  /* ── Threat level from summary ── */
  function threatLevel(summary) {
    var s = summary.totalIncidents;
    if (s >= 5) return { label: 'CRITICAL EXPOSURE', cls: 'critical', emoji: '🚨', desc: 'This entity has been targeted by multiple threat actors. Immediate investigation recommended.' };
    if (s >= 3) return { label: 'HIGH EXPOSURE', cls: 'high', emoji: '🔴', desc: 'Multiple ransomware incidents detected. This entity is a recurring target.' };
    if (s >= 2) return { label: 'ELEVATED RISK', cls: 'medium', emoji: '🟡', desc: 'Multiple breach claims found. Verify each incident independently.' };
    if (s >= 1) return { label: 'BREACH DETECTED', cls: 'detected', emoji: '⚠️', desc: 'At least one ransomware group has claimed this entity as a victim.' };
    return { label: 'NO RESULTS', cls: 'clean', emoji: '✅', desc: 'No ransomware victim claims found for this query.' };
  }

  /* ── Render: No results ── */
  function renderNoResults(query) {
    var links = buildExternalLinks(query);
    var html = '';

    html += '<div class="br-empty">';
    html += '  <div class="br-empty__icon">✅</div>';
    html += '  <h3 class="br-empty__title">No ransomware victim claims found</h3>';
    html += '  <p class="br-empty__text">No results for "<strong>' + esc(query) + '</strong>" in the ransomware leak site database. This doesn\'t guarantee the organization hasn\'t been breached — only that no tracked ransomware group has publicly claimed them.</p>';
    html += '</div>';

    html += renderExternalLinks(query);
    html += renderRecommendations();

    return html;
  }

  /* ── Render: External links block ── */
  function renderExternalLinks(query) {
    var links = buildExternalLinks(query);
    var html = '';
    html += '<div class="br-externals">';
    html += '  <div class="br-externals__title">🔍 Dig deeper — external investigation</div>';
    html += '  <div class="br-externals__grid">';
    links.forEach(function (l) {
      html += '<a href="' + escAttr(l.href) + '" target="_blank" rel="noopener noreferrer" class="ioc-link">';
      html += '  <div class="ioc-link__header">';
      html += '    <span class="ioc-link__icon">' + l.icon + '</span>';
      html += '    <span class="ioc-link__name">' + esc(l.name) + '</span>';
      html += '    <span class="ioc-link__arrow">↗</span>';
      html += '  </div>';
      html += '  <p class="ioc-link__desc">' + esc(l.desc) + '</p>';
      html += '</a>';
    });
    html += '  </div>';
    html += '</div>';
    return html;
  }

  /* ── Render: Monetization recommendations ── */
  function renderRecommendations() {
    var recs = (window.IOC_TOOL_RECS || []).filter(function (r) {
      return r.types.indexOf('breach') !== -1;
    });
    if (recs.length === 0) return '';

    var html = '<div class="ioc-card__recs">';
    html += '  <div class="ioc-card__recs-title">🛡️ Protect your organization</div>';
    recs.forEach(function (r) {
      html += '<a href="' + escAttr(r.url) + '" target="_blank" rel="noopener noreferrer" class="ioc-rec">';
      html += '  <div class="ioc-rec__header">';
      html += '    <strong class="ioc-rec__name">' + esc(r.name) + '</strong>';
      if (r.badge) html += '    <span class="ioc-rec__badge">' + esc(r.badge) + '</span>';
      html += '  </div>';
      html += '  <p class="ioc-rec__desc">' + esc(r.desc) + '</p>';
      html += '</a>';
    });
    html += '</div>';
    return html;
  }

  /* ── Render: Main results ── */
  function renderResults(query, victims) {
    if (!victims || victims.length === 0) return renderNoResults(query);

    var summary = computeSummary(victims);
    var threat = threatLevel(summary);

    /* Sort by date desc */
    victims.sort(function (a, b) {
      var da = new Date(a.discovered || 0);
      var db = new Date(b.discovered || 0);
      return db - da;
    });

    var html = '';

    /* ── Threat Assessment Banner ── */
    html += '<div class="br-assessment br-assessment--' + threat.cls + '">';
    html += '  <div class="br-assessment__header">';
    html += '    <span class="br-assessment__emoji">' + threat.emoji + '</span>';
    html += '    <div class="br-assessment__info">';
    html += '      <span class="br-assessment__label">' + threat.label + '</span>';
    html += '      <span class="br-assessment__query">Results for: <strong>' + esc(query) + '</strong></span>';
    html += '    </div>';
    html += '  </div>';
    html += '  <p class="br-assessment__desc">' + esc(threat.desc) + '</p>';
    html += '</div>';

    /* ── Summary Stats ── */
    html += '<div class="br-summary">';
    html += '  <div class="br-stat">';
    html += '    <span class="br-stat__num">' + summary.totalIncidents + '</span>';
    html += '    <span class="br-stat__label">Incidents</span>';
    html += '  </div>';
    html += '  <div class="br-stat">';
    html += '    <span class="br-stat__num">' + summary.uniqueGroups + '</span>';
    html += '    <span class="br-stat__label">Threat Groups</span>';
    html += '  </div>';
    html += '  <div class="br-stat">';
    if (summary.leakCount > 0) {
      html += '    <span class="br-stat__num">' + summary.leakCount + '</span>';
      html += '    <span class="br-stat__label">Data Leaks</span>';
    } else {
      html += '    <span class="br-stat__num">' + (summary.latest ? fmtDate(summary.latest.toISOString()) : 'N/A') + '</span>';
      html += '    <span class="br-stat__label">Latest</span>';
    }
    html += '  </div>';
    html += '  <div class="br-stat">';
    html += '    <span class="br-stat__num">' + (summary.earliest ? fmtDate(summary.earliest.toISOString()) : 'N/A') + '</span>';
    html += '    <span class="br-stat__label">Earliest</span>';
    html += '  </div>';
    html += '</div>';

    /* ── Group Breakdown ── */
    html += '<div class="br-groups">';
    html += '  <div class="br-section-title">⚔️ Threat Actor Attribution</div>';
    html += '  <div class="br-groups__grid">';
    var sortedGroups = Object.keys(summary.groupBreakdown).sort(function (a, b) {
      return summary.groupBreakdown[b] - summary.groupBreakdown[a];
    });
    sortedGroups.forEach(function (g) {
      var info = groupInfo(g);
      var tier = info ? info.tier : 'unknown';
      html += '<div class="br-group-chip ' + tierClass(tier) + '">';
      html += '  <span class="br-group-chip__name">' + esc(g) + '</span>';
      html += '  <span class="br-group-chip__count">' + summary.groupBreakdown[g] + '</span>';
      if (info) {
        html += '<span class="br-group-chip__type">' + esc(info.type) + '</span>';
      }
      html += '</div>';
    });
    html += '  </div>';
    html += '</div>';

    /* ── Timeline / Incident Cards ── */
    html += '<div class="br-timeline">';
    html += '  <div class="br-section-title">📋 Incident Timeline</div>';

    victims.forEach(function (v, i) {
      var date = v.discovered || '';
      var tier = groupTier(v.group);
      var clsT = tierClass(tier);

      html += '<div class="br-incident ' + clsT + '">';

      /* Header */
      html += '  <div class="br-incident__header">';
      html += '    <div class="br-incident__dot"></div>';
      html += '    <div class="br-incident__meta">';
      html += '      <span class="br-incident__date">' + fmtDate(date) + '</span>';
      if (date) html += '      <span class="br-incident__ago">' + daysAgo(date) + '</span>';
      html += '    </div>';
      html += '  </div>';

      /* Body */
      html += '  <div class="br-incident__body">';

      /* Victim name */
      html += '    <h3 class="br-incident__victim">' + esc(v.victim || 'Unknown Victim') + '</h3>';

      /* Attribution */
      html += '    <div class="br-incident__attrib">';
      if (v.isLeak) {
        html += '      <span class="br-incident__group"><span class="br-incident__group-icon">💧</span><span>Data Leak</span></span>';
      } else {
        html += '      <a href="https://www.ransomlook.io/group/' + escAttr((v.group || '').toLowerCase()) + '" target="_blank" rel="noopener noreferrer" class="br-incident__group">';
        html += '        <span class="br-incident__group-icon">⚔️</span>';
        html += '        <span>' + esc(v.group || 'Unknown') + '</span>';
        html += '      </a>';
      }
      html += '    </div>';

      /* Description */
      if (v.description) {
        var desc = v.description;
        if (desc.length > 300) desc = desc.substring(0, 300) + '…';
        html += '    <p class="br-incident__desc">' + esc(desc) + '</p>';
      }

      /* Evidence links */
      html += '    <div class="br-incident__evidence">';
      if (v.website) {
        html += '      <a href="' + escAttr(/^https?:\/\//.test(v.website) ? v.website : 'https://' + v.website) + '" target="_blank" rel="noopener noreferrer" class="br-evidence-btn br-evidence-btn--website">🌐 Website</a>';
      }
      if (v.screenshot) {
        html += '      <a href="' + escAttr(v.screenshot) + '" target="_blank" rel="noopener noreferrer" class="br-evidence-btn br-evidence-btn--evidence">📸 Screenshot</a>';
      }
      if (v.group && !v.isLeak) {
        html += '    <a href="https://www.ransomlook.io/group/' + escAttr((v.group || '').toLowerCase()) + '" target="_blank" rel="noopener noreferrer" class="br-evidence-btn br-evidence-btn--group">⚔️ Group Profile</a>';
      }
      html += '    </div>';

      html += '  </div>'; /* body */
      html += '</div>'; /* incident */
    });

    html += '</div>'; /* timeline */

    /* ── External investigation links ── */
    html += renderExternalLinks(query);

    /* ── Product recommendations ── */
    html += renderRecommendations();

    return html;
  }

  /* ── API call with CORS proxy fallback ── */
  function searchVictims(query) {
    var apiUrl = API_BASE + '/search?q=' + encodeURIComponent(query);

    function tryProxy(idx) {
      if (idx >= CORS_PROXIES.length) {
        return Promise.reject(new Error('Cannot reach the intelligence API from your browser. All proxy methods failed.'));
      }
      var url = CORS_PROXIES[idx](apiUrl);
      var controller = new AbortController();
      var timer = setTimeout(function () {
        controller.abort();
      }, API_TIMEOUT);

      return fetch(url, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      })
      .then(function (res) {
        clearTimeout(timer);
        if (res.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment before searching again.');
        }
        if (!res.ok) throw new Error('proxy-fail');
        return res.json();
      })
      .then(function (data) {
        /* Transform RansomLook response → unified victim array */
        return transformResults(data);
      })
      .catch(function (err) {
        clearTimeout(timer);
        if (err.message === 'Rate limit exceeded. Please wait a moment before searching again.') {
          throw err; /* don't retry rate limits */
        }
        /* Try next proxy */
        return tryProxy(idx + 1);
      });
    }

    return tryProxy(0);
  }

  /* ── Transform RansomLook API response to unified format ── */
  function transformResults(data) {
    if (!data || typeof data !== 'object') return [];
    var victims = [];
    var posts = data.posts || [];
    posts.forEach(function (p) {
      victims.push({
        victim: p.post_title || 'Unknown',
        group: p.group_name || 'Unknown',
        discovered: p.discovered || '',
        description: p.description || '',
        website: null,
        screenshot: p.screen ? 'https://www.ransomlook.io/static/' + p.screen : null,
        rl_link: p.link || null
      });
    });
    /* Also include leak results */
    var leaks = data.leaks || [];
    leaks.forEach(function (l) {
      victims.push({
        victim: l.name || 'Unknown Breach',
        group: 'Data Leak',
        discovered: l.date || '',
        description: (l.description || '') + (l.records ? ' (' + l.records.toLocaleString() + ' records)' : ''),
        website: l.domain || null,
        isLeak: true
      });
    });
    return victims;
  }

  /* ── Render error state ── */
  function renderError(query, message) {
    var html = '';
    html += '<div class="br-error">';
    html += '  <div class="br-error__icon">⚠️</div>';
    html += '  <h3 class="br-error__title">Intelligence Feed Unavailable</h3>';
    html += '  <p class="br-error__text">' + esc(message) + '</p>';
    html += '  <p class="br-error__hint">The ransomware intelligence API may be experiencing high load. You can still investigate manually using the links below.</p>';
    html += '</div>';

    html += renderExternalLinks(query);
    html += renderRecommendations();

    return html;
  }

  /* ── Main scan handler ── */
  function doScan(query) {
    var resultsEl = document.getElementById('brResults');
    var loadingEl = document.getElementById('brLoading');

    if (!query || query.length < 2) {
      resultsEl.innerHTML = '<div class="br-error"><p class="br-error__text">Please enter at least 2 characters.</p></div>';
      return;
    }

    resultsEl.innerHTML = '';
    loadingEl.style.display = '';

    searchVictims(query)
      .then(function (victims) {
        loadingEl.style.display = 'none';
        resultsEl.innerHTML = renderResults(query, victims);
      })
      .catch(function (err) {
        loadingEl.style.display = 'none';
        var msg = err.message || 'An unexpected error occurred.';
        resultsEl.innerHTML = renderError(query, msg);
      });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    var scanBtn = document.getElementById('brScanBtn');
    var input = document.getElementById('brInput');

    if (!scanBtn || !input) return;

    scanBtn.addEventListener('click', function () {
      var q = input.value.trim();
      doScan(q);
      input.select();
    });

    /* Enter to scan */
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        scanBtn.click();
      }
    });

    /* Hint buttons */
    document.querySelectorAll('.br-hint').forEach(function (btn) {
      btn.addEventListener('click', function () {
        input.value = btn.getAttribute('data-q');
        scanBtn.click();
      });
    });
  });
})();
