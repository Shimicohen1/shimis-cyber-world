/* BreachRadar v3 — Company/Domain Exposure Intelligence Engine
 *
 * Architecture: client-side JS (Jekyll/GitHub Pages — no server).
 * Primary source: RansomLook (ransomlook.io/api/search)
 * CORS handled via proxy fallback chain.
 *
 * Internal modules (sections within IIFE):
 *   normalize  — query parsing, domain/org extraction
 *   match      — confidence scoring, false-positive guards
 *   source     — API calls, CORS proxy chain, response transform
 *   dossier    — result aggregation and dossier building
 *   render     — HTML output
 *   init       — DOM bindings
 */
(function () {
  'use strict';

  /* ════════════════════════════════════════════════════════════
   *  CONSTANTS
   * ════════════════════════════════════════════════════════════ */

  var PROXY_BASE = 'https://scw-newsletter.azurewebsites.net';
  var API_TIMEOUT = 25000;

  var CORS_PROXIES = [
    function (term) { return PROXY_BASE + '/ransomlook?q=' + encodeURIComponent(term); }
  ];

  /* Words too generic to match alone — guard against false positives */
  var GENERIC_WORDS = [
    'bank','core','global','group','systems','tech','solutions','holdings',
    'services','data','digital','network','cloud','security','consulting',
    'international','associates','partners','industries','enterprises',
    'management','software','labs','media','health','energy','capital',
    'financial','medical','logistics','communications','engineering',
    'insurance','construction','education','technology','research'
  ];

  var DISCLAIMER_TEXT = 'This result may reflect an unverified claim published by a threat actor or leak-tracking source. Presence in the dataset does not independently confirm a breach.';

  /* ── Known threat actor metadata ── */
  var GROUP_META = {
    lockbit:      { tier: 'critical', aka: 'LockBit 3.0',         type: 'RaaS' },
    clop:         { tier: 'critical', aka: 'Cl0p / TA505',        type: 'Extortion' },
    alphv:        { tier: 'critical', aka: 'ALPHV / BlackCat',     type: 'RaaS' },
    blackcat:     { tier: 'critical', aka: 'ALPHV / BlackCat',     type: 'RaaS' },
    blackbasta:   { tier: 'critical', aka: 'Black Basta',          type: 'RaaS' },
    'lapsus$':    { tier: 'critical', aka: 'Lapsus$',              type: 'Extortion' },
    play:         { tier: 'high', aka: 'Play',                     type: 'Extortion' },
    akira:        { tier: 'high', aka: 'Akira',                    type: 'RaaS' },
    rhysida:      { tier: 'high', aka: 'Rhysida',                  type: 'RaaS' },
    bianlian:     { tier: 'high', aka: 'BianLian',                 type: 'Extortion' },
    medusa:       { tier: 'high', aka: 'Medusa',                   type: 'RaaS' },
    hunters:      { tier: 'high', aka: 'Hunters International',    type: 'RaaS' },
    qilin:        { tier: 'high', aka: 'Qilin / Agenda',           type: 'RaaS' },
    ransomhub:    { tier: 'high', aka: 'RansomHub',                type: 'RaaS' },
    '8base':      { tier: 'high', aka: '8Base',                    type: 'Extortion' },
    royal:        { tier: 'high', aka: 'Royal',                    type: 'RaaS' },
    blacksuit:    { tier: 'high', aka: 'BlackSuit',                type: 'RaaS' },
    handala:      { tier: 'high', aka: 'Handala Hack',             type: 'Hacktivism' },
    toufan:       { tier: 'high', aka: 'Toufan',                   type: 'Hacktivism' },
    dragonforce:  { tier: 'medium', aka: 'DragonForce',            type: 'Extortion' },
    incransom:    { tier: 'medium', aka: 'Incransom',              type: 'Extortion' },
    anubis:       { tier: 'medium', aka: 'Anubis',                 type: 'Extortion' },
    ransomhouse:  { tier: 'medium', aka: 'RansomHouse',            type: 'Extortion' },
    cactus:       { tier: 'medium', aka: 'Cactus',                 type: 'RaaS' },
    snatch:       { tier: 'medium', aka: 'Snatch',                 type: 'Extortion' },
    trigona:      { tier: 'medium', aka: 'Trigona',                type: 'RaaS' },
    nokoyawa:     { tier: 'medium', aka: 'Nokoyawa',               type: 'RaaS' },
    fog:          { tier: 'medium', aka: 'Fog',                    type: 'RaaS' },
    cicada3301:   { tier: 'high',   aka: 'Cicada3301',             type: 'RaaS' },
    embargo:      { tier: 'high',   aka: 'Embargo',                type: 'RaaS' },
    incransom:    { tier: 'medium', aka: 'INC Ransom',             type: 'RaaS' },
    lynx:         { tier: 'medium', aka: 'Lynx',                   type: 'Extortion' },
    scattered:    { tier: 'high',   aka: 'Scattered Spider',       type: 'Extortion' },
    'scattered spider': { tier: 'high', aka: 'Scattered Spider',   type: 'Extortion' },
    killsec:      { tier: 'medium', aka: 'KillSec',                type: 'Extortion' },
    termite:      { tier: 'medium', aka: 'Termite',                type: 'RaaS' },
    safepay:      { tier: 'medium', aka: 'SafePay',                type: 'RaaS' },
    meow:         { tier: 'medium', aka: 'Meow',                   type: 'Extortion' }
  };


  /* ════════════════════════════════════════════════════════════
   *  UTILITIES
   * ════════════════════════════════════════════════════════════ */

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

  function fmtDate(dateStr) {
    if (!dateStr) return 'Unknown';
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    var m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return m[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
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

  function groupInfo(name) {
    var key = (name || '').toLowerCase().replace(/[\s_-]+/g, '');
    return GROUP_META[key] || null;
  }

  function tierClass(tier) {
    return 'br-tier--' + (tier || 'unknown');
  }


  /* ════════════════════════════════════════════════════════════
   *  MODULE: normalize — query parsing & candidate extraction
   * ════════════════════════════════════════════════════════════ */

  function normalizeQuery(raw) {
    var q = (raw || '').trim();
    if (!q) return null;

    /* Strip protocol and www */
    var cleaned = q.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
    /* Remove trailing slashes / paths */
    cleaned = cleaned.replace(/\/.*$/, '').toLowerCase();

    var isDomain = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z]{2,})+$/.test(cleaned);

    /* Org name candidate: take domain base or use full query */
    var orgName = q.toLowerCase().trim();
    var domainBase = '';
    if (isDomain) {
      domainBase = cleaned.replace(/\.[a-z]{2,}(\.[a-z]{2,})?$/, '');
      orgName = domainBase;
    }

    return {
      original: q,
      normalized: cleaned,
      isDomain: isDomain,
      domain: isDomain ? cleaned : '',
      orgName: orgName,
      domainBase: domainBase,
      searchTerm: isDomain ? domainBase : cleaned
    };
  }


  /* ════════════════════════════════════════════════════════════
   *  MODULE: match — confidence scoring & false-positive guard
   * ════════════════════════════════════════════════════════════ */

  function isGenericOnly(query) {
    var w = query.normalized.replace(/[^a-z0-9]/g, '');
    return GENERIC_WORDS.indexOf(w) !== -1;
  }

  function scoreResult(parsed, victim) {
    var victimLower = (victim.victim || '').toLowerCase();
    var score = 0;
    var reason = '';
    var matchType = 'fuzzy';

    if (parsed.isDomain && parsed.domain) {
      var desc = (victim.description || '').toLowerCase();
      if (victimLower.indexOf(parsed.domain) !== -1 || desc.indexOf(parsed.domain) !== -1) {
        score += 60;
        reason = 'Exact domain match in victim record';
        matchType = 'domain';
      } else if (victimLower.indexOf(parsed.domainBase) !== -1) {
        score += 40;
        reason = 'Organization name derived from domain';
        matchType = 'org-name';
      }
    } else {
      if (victimLower === parsed.normalized) {
        score += 50;
        reason = 'Exact name match';
        matchType = 'exact-name';
      } else if (victimLower.indexOf(parsed.normalized) !== -1) {
        score += 35;
        reason = 'Name contained in victim record';
        matchType = 'org-name';
      } else {
        score += 15;
        reason = 'Keyword match via search API';
        matchType = 'fuzzy';
      }
    }

    /* Boost for known threat actor */
    if (groupInfo(victim.group)) score += 5;

    /* Cap fuzzy matches */
    if (matchType === 'fuzzy' && score > 55) score = 55;

    if (score > 100) score = 100;
    if (score < 1) score = 1;

    return {
      score: score,
      reason: reason,
      matchType: matchType,
      level: score >= 75 ? 'high' : score >= 45 ? 'medium' : 'low'
    };
  }


  /* ════════════════════════════════════════════════════════════
   *  MODULE: source — RansomLook API + CORS proxy chain
   * ════════════════════════════════════════════════════════════ */

  function fetchFromRansomLook(searchTerm) {

    function tryProxy(idx, retryCount) {
      retryCount = retryCount || 0;
      if (idx >= CORS_PROXIES.length) {
        return Promise.reject(new Error('Cannot reach the intelligence API. All connection methods failed. Try the external investigation links below.'));
      }
      var url = CORS_PROXIES[idx](searchTerm);
      var controller = new AbortController();
      var timer = setTimeout(function () { controller.abort(); }, API_TIMEOUT);

      return fetch(url, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      })
      .then(function (res) {
        clearTimeout(timer);
        if (res.status === 429) throw new Error('Rate limit exceeded. Please wait a moment before searching again.');
        if (!res.ok) {
          /* Azure cold-start: retry once after a brief pause */
          if (retryCount < 2) {
            return new Promise(function (resolve) { setTimeout(resolve, 1500); })
              .then(function () { return tryProxy(idx, retryCount + 1); });
          }
          throw new Error('proxy-fail');
        }
        return res.json();
      })
      .then(function (data) {
        return transformRansomLookResponse(data);
      })
      .catch(function (err) {
        clearTimeout(timer);
        if (err.message.indexOf('Rate limit') !== -1) throw err;
        /* Azure cold-start: retry on network errors too */
        if (retryCount < 2) {
          return new Promise(function (resolve) { setTimeout(resolve, 1500); })
            .then(function () { return tryProxy(idx, retryCount + 1); });
        }
        return tryProxy(idx + 1, 0);
      });
    }

    return tryProxy(0, 0);
  }

  function transformRansomLookResponse(data) {
    if (!data || typeof data !== 'object') return [];
    var results = [];

    (data.posts || []).forEach(function (p) {
      results.push({
        source: 'ransomlook',
        raw_type: 'ransomware_post',
        victim: p.post_title || 'Unknown',
        group: p.group_name || 'Unknown',
        discovered: p.discovered || '',
        description: p.description || '',
        website: null,
        screenshot: p.screen ? 'https://www.ransomlook.io/' + p.screen : null,
        source_link: p.link && p.link.startsWith('/') ? 'https://www.ransomlook.io' + p.link : null,
        onion_link: p.link && p.link.indexOf('.onion') !== -1 ? p.link : null,
        isLeak: false,
        confidence: null
      });
    });

    /* Groups — extract threat actor intel that mentions the search term */
    (data.groups || []).forEach(function (g) {
      if (!g.name && !g.meta) return;
      results.push({
        source: 'ransomlook',
        raw_type: 'threat_actor_intel',
        victim: 'Mentioned in threat actor profile',
        group: g.name || 'Unknown',
        discovered: '',
        description: g.meta || '',
        website: null,
        screenshot: null,
        source_link: g.name ? 'https://www.ransomlook.io/group/' + encodeURIComponent(g.name) : null,
        onion_link: null,
        isLeak: false,
        confidence: null
      });
    });

    (data.leaks || []).forEach(function (l) {
      results.push({
        source: 'ransomlook',
        raw_type: 'data_leak',
        victim: l.name || 'Unknown Breach',
        group: 'Data Leak',
        discovered: l.date || '',
        description: (l.description || '') + (l.records ? ' (' + l.records.toLocaleString() + ' records)' : ''),
        website: l.domain || null,
        screenshot: null,
        source_link: null,
        isLeak: true,
        confidence: null
      });
    });

    return results;
  }

  /*
   * Future integration point: ransomware.live
   * When/if their API comes back or Pro key is obtained:
   *   function fetchFromRansomwareLive(searchTerm) { ... }
   *   function transformRansomwareLiveResponse(data) { ... }
   * Merge in buildDossier() with source='ransomware.live'
   * and add +20 confidence when both sources corroborate.
   */


  /* ════════════════════════════════════════════════════════════
   *  MODULE: dossier — result aggregation & dossier building
   * ════════════════════════════════════════════════════════════ */

  function buildDossier(parsed, rawResults) {
    var scored = rawResults.map(function (r) {
      r.confidence = scoreResult(parsed, r);
      return r;
    });

    scored.sort(function (a, b) {
      if (b.confidence.score !== a.confidence.score) return b.confidence.score - a.confidence.score;
      return new Date(b.discovered || 0) - new Date(a.discovered || 0);
    });

    var groups = {};
    var earliest = null;
    var latest = null;
    var leakCount = 0;
    var highestConf = scored.length > 0 ? scored[0].confidence : null;

    scored.forEach(function (r) {
      var g = r.group || 'Unknown';
      groups[g] = (groups[g] || 0) + 1;
      if (r.isLeak) leakCount++;
      var dt = new Date(r.discovered);
      if (!isNaN(dt.getTime())) {
        if (!earliest || dt < earliest) earliest = dt;
        if (!latest || dt > latest) latest = dt;
      }
    });

    return {
      query: parsed,
      incidents: scored,
      summary: {
        total: scored.length,
        uniqueGroups: Object.keys(groups).length,
        groupBreakdown: groups,
        leakCount: leakCount,
        earliest: earliest,
        latest: latest,
        topConfidence: highestConf
      },
      isGenericQuery: isGenericOnly(parsed)
    };
  }


  /* ════════════════════════════════════════════════════════════
   *  MODULE: render — HTML output
   * ════════════════════════════════════════════════════════════ */

  function buildExternalLinks(query, isDomain) {
    var links = [
      { name: 'RansomLook', icon: '🕸️', href: 'https://www.ransomlook.io/recent', desc: 'Browse recent ransomware victim posts, group profiles, and threat intelligence' }
    ];
    if (isDomain) {
      links.push({ name: 'Have I Been Pwned', icon: '🔐', href: 'https://haveibeenpwned.com/DomainSearch', desc: 'Check if employee emails from this domain appeared in known data breaches (requires login)' });
      links.push({ name: 'Shodan', icon: '🌐', href: 'https://www.shodan.io/search?query=hostname%3A' + encodeURIComponent(query), desc: 'Discover exposed services, open ports, and infrastructure for this domain' });
      links.push({ name: 'VirusTotal', icon: '🦠', href: 'https://www.virustotal.com/gui/domain/' + encodeURIComponent(query), desc: 'Domain reputation, DNS history, and associated malware detections' });
      links.push({ name: 'URLScan', icon: '📸', href: 'https://urlscan.io/search/#domain%3A' + encodeURIComponent(query), desc: 'Visual page snapshots and infrastructure analysis for this domain' });
    } else {
      links.push({ name: 'Shodan', icon: '🌐', href: 'https://www.shodan.io/search?query=org%3A%22' + encodeURIComponent(query) + '%22', desc: 'Discover exposed infrastructure associated with this organization' });
    }
    links.push({ name: 'Google Dorking', icon: '🔍', href: 'https://www.google.com/search?q=%22' + encodeURIComponent(query) + '%22+ransomware+OR+breach+OR+leak', desc: 'Search for public breach reports, news articles, and CERT advisories' });
    return links;
  }

  function renderExternalLinks(query, isDomain) {
    var links = buildExternalLinks(query, isDomain);
    var h = '<div class="br-externals">';
    h += '<div class="br-externals__title">🔍 Dig deeper — external investigation</div>';
    h += '<div class="br-externals__grid">';
    links.forEach(function (l) {
      h += '<a href="' + escAttr(l.href) + '" target="_blank" rel="noopener noreferrer" class="ioc-link">';
      h += '<div class="ioc-link__header"><span class="ioc-link__icon">' + l.icon + '</span>';
      h += '<span class="ioc-link__name">' + esc(l.name) + '</span><span class="ioc-link__arrow">↗</span></div>';
      h += '<p class="ioc-link__desc">' + esc(l.desc) + '</p></a>';
    });
    h += '</div></div>';
    return h;
  }

  function renderRecommendations() {
    var recs = (window.IOC_TOOL_RECS || []).filter(function (r) {
      return r.types.indexOf('breach') !== -1;
    });
    if (!recs.length) return '';
    var h = '<div class="ioc-card__recs"><div class="ioc-card__recs-title">🛡️ Protect your organization</div>';
    recs.forEach(function (r) {
      h += '<a href="' + escAttr(r.url) + '" target="_blank" rel="noopener noreferrer" class="ioc-rec">';
      h += '<div class="ioc-rec__header"><strong class="ioc-rec__name">' + esc(r.name) + '</strong>';
      if (r.badge) h += '<span class="ioc-rec__badge">' + esc(r.badge) + '</span>';
      h += '</div><p class="ioc-rec__desc">' + esc(r.desc) + '</p></a>';
    });
    h += '</div>';
    return h;
  }

  function renderConfBadge(conf) {
    if (!conf) return '';
    var cls = 'br-conf--' + conf.level;
    var label = conf.level === 'high' ? 'High Confidence' : conf.level === 'medium' ? 'Medium Confidence' : 'Low Confidence';
    return '<span class="br-conf ' + cls + '" title="Score: ' + conf.score + '/100 — ' + escAttr(conf.reason) + '">' + label + ' (' + conf.score + ')</span>';
  }

  function renderMatchBadge(conf) {
    if (!conf) return '';
    var labels = {
      'domain': '🎯 Domain Match',
      'exact-name': '🎯 Exact Name',
      'org-name': '🏢 Org Name Match',
      'fuzzy': '🔍 Keyword Match'
    };
    return '<span class="br-match-type br-match-type--' + conf.matchType + '">' + (labels[conf.matchType] || 'Match') + '</span>';
  }

  function renderNoResults(query, isDomain) {
    var h = '<div class="br-empty">';
    h += '<div class="br-empty__icon">✅</div>';
    h += '<h3 class="br-empty__title">No exposure found</h3>';
    h += '<p class="br-empty__text">No ransomware victim claims found for "<strong>' + esc(query) + '</strong>". ';
    h += 'This does not guarantee the organization is safe — only that no tracked threat actor has publicly claimed them.</p>';
    h += '</div>';
    h += renderExternalLinks(query, isDomain);
    h += renderRecommendations();
    return h;
  }

  function renderError(query, message, isDomain) {
    var h = '<div class="br-error">';
    h += '<div class="br-error__icon">⚠️</div>';
    h += '<h3 class="br-error__title">Intelligence Feed Unavailable</h3>';
    h += '<p class="br-error__text">' + esc(message) + '</p>';
    h += '<p class="br-error__hint">You can still investigate manually using the links below.</p>';
    h += '</div>';
    h += renderExternalLinks(query, isDomain);
    h += renderRecommendations();
    return h;
  }

  function renderActions() {
    var actions = [
      { icon: '🔑', text: 'Review SSO & identity provider logs for unauthorized access' },
      { icon: '🌐', text: 'Check VPN and remote access logs for anomalous sessions' },
      { icon: '📧', text: 'Audit email telemetry for phishing or BEC indicators' },
      { icon: '🖥️', text: 'Query endpoint/EDR for known ransomware IOCs' },
      { icon: '🔐', text: 'Check credential exposure on Have I Been Pwned' },
      { icon: '📞', text: 'Engage IR team or MSSP if exposure is confirmed' },
      { icon: '📋', text: 'Assess regulatory disclosure obligations' }
    ];
    var h = '<div class="br-actions">';
    h += '<div class="br-section-title">🚨 Recommended Actions</div>';
    h += '<div class="br-actions__list">';
    actions.forEach(function (a) {
      h += '<div class="br-action-item"><span class="br-action-item__icon">' + a.icon + '</span>';
      h += '<span class="br-action-item__text">' + esc(a.text) + '</span></div>';
    });
    h += '</div></div>';
    return h;
  }

  /* ── Full dossier output ── */
  function renderDossier(dossier) {
    var q = dossier.query;
    var incidents = dossier.incidents;
    var summary = dossier.summary;

    if (!incidents.length) return renderNoResults(q.original, q.isDomain);

    var topConf = summary.topConfidence;
    var h = '';

    /* A. Assessment Banner */
    var threatCls = 'detected';
    var threatLabel = 'EXPOSURE DETECTED';
    var threatEmoji = '⚠️';
    var threatDesc = 'At least one threat actor has claimed this entity.';

    if (summary.total >= 5) {
      threatCls = 'critical'; threatLabel = 'CRITICAL EXPOSURE'; threatEmoji = '🚨';
      threatDesc = 'This entity has been targeted by multiple threat actors. Immediate investigation recommended.';
    } else if (summary.total >= 3) {
      threatCls = 'high'; threatLabel = 'HIGH EXPOSURE'; threatEmoji = '🔴';
      threatDesc = 'Multiple ransomware incidents detected. This entity is a recurring target.';
    } else if (summary.total >= 2) {
      threatCls = 'medium'; threatLabel = 'ELEVATED RISK'; threatEmoji = '🟡';
      threatDesc = 'Multiple breach claims found. Verify each incident independently.';
    }

    h += '<div class="br-assessment br-assessment--' + threatCls + '">';
    h += '<div class="br-assessment__header">';
    h += '<span class="br-assessment__emoji">' + threatEmoji + '</span>';
    h += '<div class="br-assessment__info">';
    h += '<span class="br-assessment__label">' + threatLabel + '</span>';
    h += '<span class="br-assessment__query">Searched: <strong>' + esc(q.original) + '</strong></span>';
    h += '</div>';
    if (topConf) h += renderConfBadge(topConf);
    h += '</div>';
    h += '<p class="br-assessment__desc">' + esc(threatDesc) + '</p>';
    h += '</div>';

    /* Disclaimer */
    h += '<div class="br-disclaimer-inline">';
    h += '<span class="br-disclaimer-inline__icon">⚖️</span>';
    h += '<span>' + esc(DISCLAIMER_TEXT) + '</span>';
    h += '</div>';

    /* Generic query warning */
    if (dossier.isGenericQuery) {
      h += '<div class="br-warning">';
      h += '<span class="br-warning__icon">⚡</span>';
      h += '<span>This is a generic/common term. Results may include unrelated organizations. Use a specific company name or domain for accurate results.</span>';
      h += '</div>';
    }

    /* Summary Stats */
    h += '<div class="br-summary">';
    h += '<div class="br-stat"><span class="br-stat__num">' + summary.total + '</span><span class="br-stat__label">Incidents</span></div>';
    h += '<div class="br-stat"><span class="br-stat__num">' + summary.uniqueGroups + '</span><span class="br-stat__label">Threat Groups</span></div>';
    h += '<div class="br-stat"><span class="br-stat__num">' + (summary.latest ? fmtDate(summary.latest.toISOString()) : 'N/A') + '</span><span class="br-stat__label">Latest</span></div>';
    h += '<div class="br-stat"><span class="br-stat__num">' + (summary.earliest ? fmtDate(summary.earliest.toISOString()) : 'N/A') + '</span><span class="br-stat__label">Earliest</span></div>';
    h += '</div>';

    /* B. Threat Actor Breakdown */
    h += '<div class="br-groups">';
    h += '<div class="br-section-title">⚔️ Threat Actor Attribution</div>';
    h += '<div class="br-groups__grid">';
    var sortedGroups = Object.keys(summary.groupBreakdown).sort(function (a, b) {
      return summary.groupBreakdown[b] - summary.groupBreakdown[a];
    });
    sortedGroups.forEach(function (g) {
      var info = groupInfo(g);
      var tier = info ? info.tier : 'unknown';
      h += '<div class="br-group-chip ' + tierClass(tier) + '">';
      h += '<span class="br-group-chip__name">' + esc(g) + '</span>';
      h += '<span class="br-group-chip__count">' + summary.groupBreakdown[g] + '</span>';
      if (info) h += '<span class="br-group-chip__type">' + esc(info.type) + '</span>';
      h += '</div>';
    });
    h += '</div></div>';

    /* C. Incident Timeline */
    h += '<div class="br-timeline">';
    h += '<div class="br-section-title">📋 Incident Timeline</div>';

    incidents.forEach(function (v) {
      var date = v.discovered || '';
      var info = groupInfo(v.group);
      var tier = info ? info.tier : 'unknown';

      h += '<div class="br-incident ' + tierClass(tier) + '">';
      h += '<div class="br-incident__header">';
      h += '<div class="br-incident__dot"></div>';
      h += '<div class="br-incident__meta">';
      h += '<span class="br-incident__date">' + fmtDate(date) + '</span>';
      if (date) h += '<span class="br-incident__ago">' + daysAgo(date) + '</span>';
      h += '</div>';
      if (v.confidence) h += renderMatchBadge(v.confidence);
      h += '</div>';

      h += '<div class="br-incident__body">';
      h += '<h3 class="br-incident__victim">' + esc(v.victim || 'Unknown Victim') + '</h3>';

      h += '<div class="br-incident__attrib">';
      if (v.isLeak) {
        h += '<span class="br-incident__group"><span class="br-incident__group-icon">💧</span><span>Data Leak</span></span>';
      } else if (v.raw_type === 'threat_actor_intel') {
        h += '<a href="https://www.ransomlook.io/group/' + escAttr((v.group || '').toLowerCase()) + '" target="_blank" rel="noopener noreferrer" class="br-incident__group">';
        h += '<span class="br-incident__group-icon">🧠</span><span>' + esc(v.group || 'Unknown') + '</span></a>';
        if (info) h += '<span class="br-incident__aka">aka ' + esc(info.aka) + '</span>';
        h += '<span class="br-incident__type-tag" style="background:var(--accent-purple,#9b59b6);color:#fff;padding:2px 8px;border-radius:4px;font-size:.75rem;margin-left:6px">Threat Actor Intel</span>';
      } else {
        h += '<a href="https://www.ransomlook.io/group/' + escAttr((v.group || '').toLowerCase()) + '" target="_blank" rel="noopener noreferrer" class="br-incident__group">';
        h += '<span class="br-incident__group-icon">⚔️</span><span>' + esc(v.group || 'Unknown') + '</span></a>';
        if (info) h += '<span class="br-incident__aka">aka ' + esc(info.aka) + '</span>';
      }
      h += '<span class="br-incident__source">via RansomLook</span>';
      h += '</div>';

      if (v.description) {
        var desc = v.description;
        if (desc.length > 300) desc = desc.substring(0, 300) + '…';
        h += '<p class="br-incident__desc">' + esc(desc) + '</p>';
      }

      if (v.confidence && v.confidence.level === 'low') {
        h += '<div class="br-incident__note">⚡ <em>Low-confidence match. ' + esc(v.confidence.reason) + '. Manual validation recommended.</em></div>';
      }

      h += '<div class="br-incident__evidence">';
      if (v.website) {
        var href = /^https?:\/\//.test(v.website) ? v.website : 'https://' + v.website;
        h += '<a href="' + escAttr(href) + '" target="_blank" rel="noopener noreferrer" class="br-evidence-btn br-evidence-btn--website">🌐 Website</a>';
      }
      if (v.screenshot) {
        h += '<a href="' + escAttr(v.screenshot) + '" target="_blank" rel="noopener noreferrer" class="br-evidence-btn br-evidence-btn--evidence">📸 Screenshot</a>';
      }
      if (v.source_link) {
        h += '<a href="' + escAttr(v.source_link) + '" target="_blank" rel="noopener noreferrer" class="br-evidence-btn br-evidence-btn--evidence">🔗 Source</a>';
      }
      if (v.onion_link) {
        h += '<span class="br-evidence-btn br-evidence-btn--onion" title="' + escAttr(v.onion_link) + '">🧅 .onion (Tor only)</span>';
      }
      if (v.group && !v.isLeak) {
        h += '<a href="https://www.ransomlook.io/group/' + escAttr((v.group || '').toLowerCase()) + '" target="_blank" rel="noopener noreferrer" class="br-evidence-btn br-evidence-btn--group">⚔️ Group Profile</a>';
      }
      h += '</div>';

      h += '</div>';
      h += '</div>';
    });
    h += '</div>';

    /* D. Recommended Actions */
    h += renderActions();

    /* E. External investigation */
    h += renderExternalLinks(q.original, q.isDomain);

    /* F. Product recommendations */
    h += renderRecommendations();

    return h;
  }


  /* ════════════════════════════════════════════════════════════
   *  MODULE: init — main scan handler & DOM bindings
   * ════════════════════════════════════════════════════════════ */

  function doScan(rawQuery) {
    var resultsEl = document.getElementById('brResults');
    var loadingEl = document.getElementById('brLoading');

    var parsed = normalizeQuery(rawQuery);
    if (!parsed || parsed.normalized.length < 2) {
      resultsEl.innerHTML = '<div class="br-error"><p class="br-error__text">Enter at least 2 characters — a company name or domain.</p></div>';
      return;
    }

    resultsEl.innerHTML = '';
    loadingEl.style.display = '';

    fetchFromRansomLook(parsed.searchTerm)
      .then(function (rawResults) {
        loadingEl.style.display = 'none';
        var dossier = buildDossier(parsed, rawResults);
        resultsEl.innerHTML = renderDossier(dossier);
      })
      .catch(function (err) {
        loadingEl.style.display = 'none';
        resultsEl.innerHTML = renderError(parsed.original, err.message || 'An unexpected error occurred.', parsed.isDomain);
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var scanBtn = document.getElementById('brScanBtn');
    var input = document.getElementById('brInput');
    if (!scanBtn || !input) return;

    scanBtn.addEventListener('click', function () {
      doScan(input.value.trim());
      input.select();
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); scanBtn.click(); }
    });

    document.querySelectorAll('.br-hint').forEach(function (btn) {
      btn.addEventListener('click', function () {
        input.value = btn.getAttribute('data-q');
        scanBtn.click();
      });
    });
  });
})();
