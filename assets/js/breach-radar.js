/* BreachRadar v1 — Dark Web Breach Intelligence Scanner */
(function () {
  'use strict';

  var API_BASE = 'https://api.ransomware.live/v2';
  var API_TIMEOUT = 20000;

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
      { name: 'Ransomware.live', icon: '🕸️', href: 'https://www.ransomware.live/search?q=' + encodeURIComponent(query), desc: 'Full victim database with screenshots and negotiation tracking' },
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
    var countries = {};
    var earliest = null;
    var latest = null;
    var hasInfostealer = false;
    var hasPress = false;
    var totalUpdates = 0;

    victims.forEach(function (v) {
      var g = v.group || 'Unknown';
      groups[g] = (groups[g] || 0) + 1;

      if (v.country) countries[v.country] = (countries[v.country] || 0) + 1;

      var d = v.attackdate || v.discovered;
      if (d) {
        var dt = new Date(d);
        if (!isNaN(dt.getTime())) {
          if (!earliest || dt < earliest) earliest = dt;
          if (!latest || dt > latest) latest = dt;
        }
      }

      if (v.infostealer && typeof v.infostealer === 'object' && Object.keys(v.infostealer).length > 0) {
        hasInfostealer = true;
      }
      if (v.press && v.press.length > 0) hasPress = true;
      if (v.updates && v.updates.length > 0) totalUpdates += v.updates.length;
    });

    return {
      totalIncidents: victims.length,
      uniqueGroups: Object.keys(groups).length,
      groupBreakdown: groups,
      countriesAffected: Object.keys(countries).length,
      countries: countries,
      earliest: earliest,
      latest: latest,
      hasInfostealer: hasInfostealer,
      hasPress: hasPress,
      totalUpdates: totalUpdates
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
      var da = new Date(a.attackdate || a.discovered || 0);
      var db = new Date(b.attackdate || b.discovered || 0);
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
    html += '    <span class="br-stat__num">' + summary.countriesAffected + '</span>';
    html += '    <span class="br-stat__label">Countries</span>';
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
      var date = v.attackdate || v.discovered || '';
      var tier = groupTier(v.group);
      var clsT = tierClass(tier);
      var victimId = v.victim ? btoa(unescape(encodeURIComponent(v.victim + '@' + (v.group || '').toLowerCase()))) : '';

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
      html += '      <a href="https://www.ransomware.live/group/' + escAttr((v.group || '').toLowerCase()) + '" target="_blank" rel="noopener noreferrer" class="br-incident__group">';
      html += '        <span class="br-incident__group-icon">⚔️</span>';
      html += '        <span>' + esc(v.group || 'Unknown') + '</span>';
      html += '      </a>';
      if (v.country) {
        html += '    <span class="br-incident__country" title="' + escAttr(v.country) + '">';
        html += '      🌍 ' + esc(v.country);
        html += '    </span>';
      }
      if (v.activity) {
        html += '    <span class="br-incident__sector">' + esc(v.activity) + '</span>';
      }
      html += '    </div>';

      /* Description */
      if (v.description) {
        var desc = v.description;
        if (desc.length > 300) desc = desc.substring(0, 300) + '…';
        html += '    <p class="br-incident__desc">' + esc(desc) + '</p>';
      }

      /* Infostealer data */
      if (v.infostealer && typeof v.infostealer === 'object') {
        var iKeys = Object.keys(v.infostealer);
        if (iKeys.length > 0) {
          html += '    <div class="br-incident__infostealer">';
          html += '      <span class="br-incident__infostealer-icon">💀</span>';
          html += '      <span>Infostealer data detected: ';
          var iLabels = [];
          iKeys.forEach(function (k) {
            var val = v.infostealer[k];
            if (val && val > 0) iLabels.push(esc(k) + ': ' + val);
          });
          html += iLabels.join(', ') || 'present';
          html += '</span>';
          html += '    </div>';
        }
      }

      /* Press / media coverage */
      if (v.press && v.press.length > 0) {
        html += '    <div class="br-incident__press">';
        html += '      <span class="br-incident__press-title">📰 Press Coverage:</span>';
        v.press.slice(0, 3).forEach(function (p) {
          var title = p.title || p.url || 'Article';
          var url = p.url || '#';
          html += '      <a href="' + escAttr(url) + '" target="_blank" rel="noopener noreferrer" class="br-incident__press-link">' + esc(title) + ' ↗</a>';
        });
        if (v.press.length > 3) {
          html += '      <span class="br-incident__press-more">+' + (v.press.length - 3) + ' more</span>';
        }
        html += '    </div>';
      }

      /* Updates (ransom timeline) */
      if (v.updates && v.updates.length > 0) {
        html += '    <div class="br-incident__updates">';
        html += '      <span class="br-incident__updates-title">📝 Ransom Updates:</span>';
        v.updates.slice(0, 3).forEach(function (u) {
          html += '      <div class="br-incident__update">';
          if (u.date) html += '<span class="br-incident__update-date">' + fmtDate(u.date) + '</span>';
          if (u.title) html += '<span>' + esc(u.title) + '</span>';
          html += '      </div>';
        });
        html += '    </div>';
      }

      /* Evidence links */
      html += '    <div class="br-incident__evidence">';
      if (v.website) {
        html += '      <a href="' + escAttr(v.website) + '" target="_blank" rel="noopener noreferrer" class="br-evidence-btn br-evidence-btn--website">🌐 Website</a>';
      }
      var rlSlug = v.victim ? encodeURIComponent(v.victim) : '';
      html += '      <a href="https://www.ransomware.live/search?q=' + escAttr(rlSlug) + '" target="_blank" rel="noopener noreferrer" class="br-evidence-btn br-evidence-btn--evidence">📸 Screenshots & Evidence</a>';
      if (v.group) {
        html += '    <a href="https://www.ransomware.live/group/' + escAttr((v.group || '').toLowerCase()) + '" target="_blank" rel="noopener noreferrer" class="br-evidence-btn br-evidence-btn--group">⚔️ Group Profile</a>';
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

  /* ── API call ── */
  function searchVictims(query) {
    return new Promise(function (resolve, reject) {
      var controller = new AbortController();
      var timer = setTimeout(function () {
        controller.abort();
        reject(new Error('Request timed out. The intelligence server may be temporarily unavailable.'));
      }, API_TIMEOUT);

      fetch(API_BASE + '/searchvictims/' + encodeURIComponent(query), {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      })
      .then(function (res) {
        clearTimeout(timer);
        if (res.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment before searching again.');
        }
        if (!res.ok) {
          throw new Error('Server returned ' + res.status + '. Try again shortly.');
        }
        return res.json();
      })
      .then(function (data) {
        resolve(Array.isArray(data) ? data : []);
      })
      .catch(function (err) {
        clearTimeout(timer);
        reject(err);
      });
    });
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
        if (err.name === 'AbortError') {
          msg = 'Request timed out. The intelligence server may be temporarily unavailable.';
        }
        /* CORS fallback: if the API doesn't support CORS, direct user to manual investigation */
        if (msg.indexOf('NetworkError') !== -1 || msg.indexOf('Failed to fetch') !== -1 || msg.indexOf('CORS') !== -1) {
          msg = 'Cannot reach the intelligence API from your browser. This may be due to network restrictions or the API not supporting browser requests.';
        }
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
