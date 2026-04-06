/* GoFish — URL & SMS Phishing Scanner */
(function () {
  'use strict';

  /* ── Suspicious TLDs commonly used in phishing ── */
  var SUSPECT_TLDS = [
    'tk', 'ml', 'ga', 'cf', 'gq', 'xyz', 'top', 'club', 'buzz', 'wang',
    'work', 'date', 'racing', 'win', 'bid', 'stream', 'download', 'loan',
    'icu', 'monster', 'rest', 'sbs', 'cfd', 'quest'
  ];

  /* ── Known URL shorteners ── */
  var SHORTENERS = [
    'bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly', 'is.gd', 'buff.ly',
    'cutt.ly', 'rb.gy', 'short.io', 'bl.ink', 'tiny.cc', 'lnkd.in', 'v.gd',
    'shorturl.at', 't.ly', 'clck.ru', 'rebrand.ly', 'u.to'
  ];

  /* ── Brand keywords for impersonation detection ── */
  var BRAND_KEYWORDS = [
    /* Banks & Finance */
    'paypal', 'chase', 'wells fargo', 'bank of america', 'citibank', 'hsbc',
    'barclays', 'santander', 'leumi', 'hapoalim', 'discount', 'mizrahi',
    'binance', 'coinbase', 'stripe', 'venmo', 'zelle',
    /* Tech */
    'microsoft', 'apple', 'google', 'amazon', 'facebook', 'meta', 'netflix',
    'spotify', 'dropbox', 'adobe', 'zoom', 'slack', 'github', 'linkedin',
    /* Delivery */
    'fedex', 'ups', 'dhl', 'usps', 'royal mail', 'dpd', 'hermes',
    'israel post', 'חבילה',
    /* Government */
    'irs', 'hmrc', 'ato', 'מס הכנסה', 'ביטוח לאומי', 'משטרה'
  ];

  /* ── Urgency keywords (EN + HE) ── */
  var URGENCY_EN = [
    'urgent', 'immediately', 'suspended', 'locked', 'blocked', 'verify now',
    'confirm your', 'update your', 'act now', 'expire', 'limited time',
    'unauthorized', 'unusual activity', 'security alert', 'action required',
    'account will be', 'within 24 hours', 'within 48 hours', 'click here',
    'your account has been', 'failure to', 'will be terminated', 'deactivated',
    'won', 'prize', 'congratulations', 'selected', 'reward', 'gift card',
    'free', 'claim', 'winner'
  ];

  var URGENCY_HE = [
    'דחוף', 'מיידי', 'חשבונך', 'ייחסם', 'נחסם', 'אמת עכשיו', 'לחץ כאן',
    'עדכן את', 'פעולה נדרשת', 'תוקף', 'הגבלה', 'חשד', 'פעילות חשודה',
    'אבטחה', 'הזדמנות', 'זכית', 'פרס', 'מתנה', 'בחינם', 'אישור נדרש',
    'תוך 24 שעות', 'חשבון הבנק', 'כרטיס אשראי'
  ];

  /* ── Extract URLs from text ── */
  function extractUrls(text) {
    var urlRegex = /https?:\/\/[^\s<>"')\]]+/gi;
    var matches = text.match(urlRegex) || [];
    /* Also try bare domain patterns */
    var bareRegex = /(?:^|\s)((?:[a-z0-9][-a-z0-9]*\.)+[a-z]{2,}(?:\/[^\s]*)?)/gi;
    var bare;
    while ((bare = bareRegex.exec(text)) !== null) {
      var candidate = bare[1].trim();
      if (candidate.indexOf('.') !== -1 && matches.indexOf('http://' + candidate) === -1 && matches.indexOf('https://' + candidate) === -1) {
        matches.push('https://' + candidate);
      }
    }
    return matches;
  }

  /* ── Parse URL parts safely ── */
  function parseUrl(urlStr) {
    try {
      var u = new URL(urlStr);
      return {
        full: urlStr,
        hostname: u.hostname,
        pathname: u.pathname,
        search: u.search,
        protocol: u.protocol,
        port: u.port
      };
    } catch (e) {
      return null;
    }
  }

  /* ── Analyze a single URL ── */
  function analyzeUrl(urlStr) {
    var findings = [];
    var score = 0;
    var parsed = parseUrl(urlStr);
    if (!parsed) {
      findings.push({ severity: 'info', text: 'Could not parse URL structure', points: 0 });
      return { url: urlStr, findings: findings, score: 0 };
    }

    var host = parsed.hostname.toLowerCase();
    var fullLower = urlStr.toLowerCase();

    /* 1. IP address instead of domain */
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host)) {
      findings.push({ severity: 'high', text: 'URL uses an IP address instead of a domain name — common in phishing', points: 25 });
      score += 25;
    }

    /* 2. Suspicious TLD */
    var tld = host.split('.').pop();
    if (SUSPECT_TLDS.indexOf(tld) !== -1) {
      findings.push({ severity: 'high', text: 'Suspicious TLD: .' + tld + ' — frequently abused for phishing', points: 20 });
      score += 20;
    }

    /* 3. URL shortener */
    var isShortener = SHORTENERS.some(function (s) { return host === s || host.endsWith('.' + s); });
    if (isShortener) {
      findings.push({ severity: 'medium', text: 'URL shortener detected — hides the real destination', points: 15 });
      score += 15;
    }

    /* 4. Excessive subdomains (3+) */
    var parts = host.split('.');
    if (parts.length > 3) {
      findings.push({ severity: 'medium', text: 'Excessive subdomains (' + parts.length + ' levels) — used to disguise the real domain', points: 15 });
      score += 15;
    }

    /* 5. Brand impersonation in domain */
    BRAND_KEYWORDS.forEach(function (brand) {
      var brandClean = brand.replace(/\s/g, '');
      if (host.indexOf(brandClean) !== -1) {
        /* Check if it's the actual legitimate domain */
        var legit = brandClean + '.com';
        var legit2 = brandClean + '.co.il';
        if (host !== legit && host !== 'www.' + legit && host !== legit2 && host !== 'www.' + legit2) {
          findings.push({ severity: 'high', text: 'Possible brand impersonation: "' + brand + '" in domain but not the official site', points: 25 });
          score += 25;
        }
      }
    });

    /* 6. Homograph / look-alike characters */
    if (/[а-яёА-ЯЁ]/.test(host) || host !== host.normalize('NFC')) {
      findings.push({ severity: 'critical', text: 'Homograph attack — domain contains non-Latin characters that look like English letters', points: 30 });
      score += 30;
    }

    /* 7. @ in URL (credential phishing trick) */
    if (fullLower.indexOf('@') !== -1 && fullLower.indexOf('mailto:') === -1) {
      findings.push({ severity: 'high', text: 'URL contains "@" — this can redirect to a different domain than displayed', points: 25 });
      score += 25;
    }

    /* 8. Suspicious path keywords */
    var pathLower = (parsed.pathname + parsed.search).toLowerCase();
    var suspectPaths = ['login', 'signin', 'verify', 'confirm', 'secure', 'account', 'update', 'banking', 'password', 'credential', 'authenticate', 'wallet', 'recover'];
    var foundPaths = suspectPaths.filter(function (p) { return pathLower.indexOf(p) !== -1; });
    if (foundPaths.length > 0) {
      findings.push({ severity: 'medium', text: 'Sensitive path keywords: ' + foundPaths.join(', ') + ' — often used in credential harvesting pages', points: 10 });
      score += 10;
    }

    /* 9. Encoded characters in URL */
    var encodedCount = (urlStr.match(/%[0-9a-f]{2}/gi) || []).length;
    if (encodedCount > 3) {
      findings.push({ severity: 'medium', text: 'Heavy URL encoding (' + encodedCount + ' encoded characters) — may be hiding the real content', points: 10 });
      score += 10;
    }

    /* 10. Non-standard port */
    if (parsed.port && parsed.port !== '80' && parsed.port !== '443') {
      findings.push({ severity: 'medium', text: 'Non-standard port :' + parsed.port + ' — legitimate sites rarely use unusual ports', points: 10 });
      score += 10;
    }

    /* 11. HTTP (no TLS) */
    if (parsed.protocol === 'http:') {
      findings.push({ severity: 'medium', text: 'No HTTPS — connection is unencrypted, data can be intercepted', points: 10 });
      score += 10;
    }

    /* 12. Very long URL */
    if (urlStr.length > 200) {
      findings.push({ severity: 'low', text: 'Unusually long URL (' + urlStr.length + ' chars) — may be obfuscating the destination', points: 5 });
      score += 5;
    }

    /* 13. Multiple redirects / double URLs */
    var innerUrls = urlStr.match(/https?%3A%2F%2F|https?:\/\//gi) || [];
    if (innerUrls.length > 1) {
      findings.push({ severity: 'high', text: 'Nested URL detected — possible redirect chain or open redirect abuse', points: 20 });
      score += 20;
    }

    /* 14. Hyphens in domain */
    if ((host.match(/-/g) || []).length >= 3) {
      findings.push({ severity: 'low', text: 'Multiple hyphens in domain — commonly used in phishing lookalikes', points: 5 });
      score += 5;
    }

    /* 15. Data URI or javascript: */
    if (/^(data:|javascript:)/i.test(urlStr)) {
      findings.push({ severity: 'critical', text: 'Dangerous URI scheme — this is not a real URL, it executes code', points: 40 });
      score += 40;
    }

    /* Cap at 100 */
    score = Math.min(score, 100);

    /* If no findings, it's clean */
    if (findings.length === 0) {
      findings.push({ severity: 'clean', text: 'No obvious phishing indicators detected in the URL structure', points: 0 });
    }

    return { url: urlStr, findings: findings, score: score, parsed: parsed };
  }

  /* ── Analyze SMS text ── */
  function analyzeSmsText(text) {
    var findings = [];
    var score = 0;
    var lower = text.toLowerCase();

    /* Urgency — English */
    var urgencyFound = [];
    URGENCY_EN.forEach(function (phrase) {
      if (lower.indexOf(phrase) !== -1) urgencyFound.push(phrase);
    });
    if (urgencyFound.length > 0) {
      var pts = Math.min(urgencyFound.length * 8, 30);
      findings.push({ severity: urgencyFound.length >= 3 ? 'high' : 'medium', text: 'Urgency/pressure keywords: "' + urgencyFound.slice(0, 5).join('", "') + '"', points: pts });
      score += pts;
    }

    /* Urgency — Hebrew */
    var urgencyHeFound = [];
    URGENCY_HE.forEach(function (phrase) {
      if (lower.indexOf(phrase) !== -1) urgencyHeFound.push(phrase);
    });
    if (urgencyHeFound.length > 0) {
      var ptsHe = Math.min(urgencyHeFound.length * 8, 30);
      findings.push({ severity: urgencyHeFound.length >= 3 ? 'high' : 'medium', text: 'Hebrew urgency keywords: "' + urgencyHeFound.slice(0, 5).join('", "') + '"', points: ptsHe });
      score += ptsHe;
    }

    /* Short message with URL = suspicious */
    var urls = extractUrls(text);
    if (urls.length > 0 && text.length < 200) {
      findings.push({ severity: 'medium', text: 'Short message with link — classic smishing pattern', points: 10 });
      score += 10;
    }

    /* Phone number request */
    if (/(?:call|phone|dial|text|sms|WhatsApp)\s*:?\s*[\d+\-()\s]{7,}/i.test(text)) {
      findings.push({ severity: 'medium', text: 'Contains a phone number in a suspicious context', points: 10 });
      score += 10;
    }

    /* Money / financial lure */
    if (/\$\d+|₪\d+|€\d+|£\d+|\d+\s*(?:dollars?|shekels?|euros?|pounds?)/i.test(text)) {
      findings.push({ severity: 'medium', text: 'Financial amounts mentioned — possible money-based lure', points: 10 });
      score += 10;
    }

    score = Math.min(score, 100);
    return { findings: findings, score: score };
  }

  /* ── Risk level from score ── */
  function riskLevel(score) {
    if (score >= 70) return { label: 'CRITICAL RISK', cls: 'critical', emoji: '🔴', advice: 'This is almost certainly a phishing attempt. Do NOT click any links. Report it and delete the message.' };
    if (score >= 40) return { label: 'HIGH RISK', cls: 'high', emoji: '🟠', advice: 'Multiple phishing indicators detected. Proceed with extreme caution. Verify through official channels before interacting.' };
    if (score >= 20) return { label: 'SUSPICIOUS', cls: 'medium', emoji: '🟡', advice: 'Some suspicious patterns found. Verify the sender and destination before clicking. When in doubt, go directly to the official website.' };
    if (score > 0) return { label: 'LOW RISK', cls: 'low', emoji: '🟢', advice: 'Minor indicators found. Probably safe, but always verify links from unknown senders.' };
    return { label: 'CLEAN', cls: 'clean', emoji: '✅', advice: 'No phishing indicators detected. Still exercise standard caution with links from unknown sources.' };
  }

  /* ── Build external verification links ── */
  function buildVerifyLinks(urlStr) {
    return [
      { name: 'VirusTotal', icon: '🦠', href: 'https://www.virustotal.com/gui/url/' + encodeURIComponent(urlStr), desc: 'Scan across 90+ security engines' },
      { name: 'URLScan.io', icon: '📸', href: 'https://urlscan.io/search/#' + encodeURIComponent(urlStr), desc: 'Visual scan — see what the page looks like' },
      { name: 'Google Safe Browsing', icon: '🛡️', href: 'https://transparencyreport.google.com/safe-browsing/search?url=' + encodeURIComponent(urlStr), desc: 'Check Google\'s phishing & malware verdict' },
      { name: 'PhishTank', icon: '🎣', href: 'https://phishtank.org/phish_search.php?verified=u&active=y', desc: 'Community-reported phishing database' },
      { name: 'URLVoid', icon: '🌐', href: 'https://www.urlvoid.com/scan/' + encodeURIComponent(urlStr), desc: 'Multi-engine URL reputation check' }
    ];
  }

  /* ── Escape HTML ── */
  function esc(s) {
    if (!s) return '';
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  /* ── Severity badge class ── */
  function sevBadge(sev) {
    if (sev === 'critical') return 'live';
    if (sev === 'high') return 'signal';
    if (sev === 'medium') return 'drop';
    if (sev === 'clean') return 'vault';
    return 'ghost';
  }

  /* ── Render results ── */
  function render(text) {
    var results = document.getElementById('gofishResults');
    if (!text.trim()) { results.innerHTML = ''; return; }

    var urls = extractUrls(text);
    var smsAnalysis = analyzeSmsText(text);
    var urlAnalyses = urls.map(function (u) { return analyzeUrl(u); });

    /* Combined score */
    var totalScore = smsAnalysis.score;
    urlAnalyses.forEach(function (a) { totalScore = Math.max(totalScore, totalScore + a.score); });
    totalScore = Math.min(totalScore, 100);
    var risk = riskLevel(totalScore);

    var html = '';

    /* ── Overall verdict ── */
    html += '<div class="gofish-verdict gofish-verdict--' + risk.cls + '">';
    html += '  <div class="gofish-verdict__header">';
    html += '    <span class="gofish-verdict__emoji">' + risk.emoji + '</span>';
    html += '    <div class="gofish-verdict__score-ring">';
    html += '      <svg viewBox="0 0 100 100" class="gofish-ring">';
    html += '        <circle cx="50" cy="50" r="42" class="gofish-ring__bg"/>';
    html += '        <circle cx="50" cy="50" r="42" class="gofish-ring__fill gofish-ring__fill--' + risk.cls + '" style="stroke-dasharray: ' + Math.round(totalScore * 2.64) + ' 264"/>';
    html += '      </svg>';
    html += '      <span class="gofish-verdict__score-num">' + totalScore + '</span>';
    html += '    </div>';
    html += '    <div class="gofish-verdict__text">';
    html += '      <span class="gofish-verdict__label">' + risk.label + '</span>';
    html += '      <span class="gofish-verdict__sublabel">Phishing Risk Score</span>';
    html += '    </div>';
    html += '  </div>';
    html += '  <p class="gofish-verdict__advice">' + esc(risk.advice) + '</p>';
    html += '</div>';

    /* ── SMS text analysis ── */
    if (smsAnalysis.findings.length > 0) {
      html += '<div class="gofish-section">';
      html += '  <div class="gofish-section__title">📱 Message Analysis</div>';
      html += '  <div class="gofish-findings">';
      smsAnalysis.findings.forEach(function (f) {
        html += '<div class="gofish-finding gofish-finding--' + f.severity + '">';
        html += '  <span class="badge badge--' + sevBadge(f.severity) + '">' + f.severity.toUpperCase() + '</span>';
        html += '  <span class="gofish-finding__text">' + esc(f.text) + '</span>';
        html += '  <span class="gofish-finding__pts">+' + f.points + '</span>';
        html += '</div>';
      });
      html += '  </div>';
      html += '</div>';
    }

    /* ── URL analyses ── */
    urlAnalyses.forEach(function (analysis) {
      html += '<div class="gofish-section">';
      html += '  <div class="gofish-section__title">🔗 URL Analysis</div>';
      html += '  <code class="gofish-url">' + esc(analysis.url) + '</code>';

      /* Findings */
      html += '  <div class="gofish-findings">';
      analysis.findings.forEach(function (f) {
        html += '<div class="gofish-finding gofish-finding--' + f.severity + '">';
        html += '  <span class="badge badge--' + sevBadge(f.severity) + '">' + f.severity.toUpperCase() + '</span>';
        html += '  <span class="gofish-finding__text">' + esc(f.text) + '</span>';
        if (f.points > 0) html += '  <span class="gofish-finding__pts">+' + f.points + '</span>';
        html += '</div>';
      });
      html += '  </div>';

      /* Verification links */
      var verifyLinks = buildVerifyLinks(analysis.url);
      html += '  <div class="gofish-verify-title">🔍 Verify externally</div>';
      html += '  <div class="gofish-verify-links">';
      verifyLinks.forEach(function (l) {
        html += '<a href="' + esc(l.href) + '" target="_blank" rel="noopener noreferrer" class="ioc-link">';
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
    });

    /* No URLs found */
    if (urls.length === 0 && smsAnalysis.findings.length > 0) {
      html += '<div class="gofish-section">';
      html += '  <p class="gofish-no-url">No URLs found in the text. The analysis above is based on message patterns only. If you received a link, paste the full URL for deeper analysis.</p>';
      html += '</div>';
    }

    if (urls.length === 0 && smsAnalysis.findings.length === 0) {
      html += '<div class="gofish-section">';
      html += '  <p class="gofish-no-url">No URLs or suspicious patterns found. Try pasting a URL or SMS message that you want to check.</p>';
      html += '</div>';
    }

    results.innerHTML = html;
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    var scanBtn = document.getElementById('gofishScanBtn');
    var clearBtn = document.getElementById('gofishClearBtn');
    var input = document.getElementById('gofishInput');

    if (!scanBtn || !input) return;

    scanBtn.addEventListener('click', function () {
      render(input.value);
    });

    clearBtn.addEventListener('click', function () {
      input.value = '';
      document.getElementById('gofishResults').innerHTML = '';
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        scanBtn.click();
      }
    });
  });
})();
