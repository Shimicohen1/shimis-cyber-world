/* GoFish v2 — URL & SMS Phishing Scanner (rewritten engine) */
(function () {
  'use strict';

  /* ── Suspicious TLDs ── */
  var SUSPECT_TLDS = [
    'tk', 'ml', 'ga', 'cf', 'gq', 'xyz', 'top', 'club', 'buzz', 'wang',
    'work', 'date', 'racing', 'win', 'bid', 'stream', 'download', 'loan',
    'icu', 'monster', 'rest', 'sbs', 'cfd', 'quest', 'pw', 'cc', 'su',
    'cn', 'ru', 'ws', 'info', 'click', 'link', 'online', 'site', 'fun',
    'store', 'life', 'live', 'tech', 'space', 'press', 'uno', 'gg',
    'vip', 'cam', 'bar', 'lol'
  ];

  /* ── Known URL shorteners ── */
  var SHORTENERS = [
    'bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly', 'is.gd', 'buff.ly',
    'cutt.ly', 'rb.gy', 'short.io', 'bl.ink', 'tiny.cc', 'lnkd.in', 'v.gd',
    'shorturl.at', 't.ly', 'clck.ru', 'rebrand.ly', 'u.to', 'rb.gy',
    'shrtco.de', 'shorturl.asia', 'trib.al', 'x.co', 'surl.li', 'shortcm.li'
  ];

  /* ── Brand keywords ── */
  var BRAND_KEYWORDS = [
    'paypal', 'chase', 'wellsfargo', 'bankofamerica', 'citibank', 'hsbc',
    'barclays', 'santander', 'leumi', 'hapoalim', 'discount', 'mizrahi',
    'binance', 'coinbase', 'stripe', 'venmo', 'zelle', 'mastercard', 'visa',
    'microsoft', 'apple', 'google', 'amazon', 'facebook', 'meta', 'netflix',
    'spotify', 'dropbox', 'adobe', 'zoom', 'slack', 'github', 'linkedin',
    'whatsapp', 'telegram', 'instagram', 'tiktok', 'twitter', 'x.com',
    'wix', 'fiverr', 'shopify', 'docusign', 'notion', 'openai', 'chatgpt',
    'fedex', 'ups', 'dhl', 'usps', 'royalmail', 'dpd', 'hermes',
    'irs', 'hmrc', 'gov'
  ];

  /* ── Israeli brand keywords (domain matching) ── */
  var IL_BRAND_KEYWORDS = [
    'leumi', 'hapoalim', 'discount', 'mizrahi', 'fibi', 'isracard', 'cal',
    'paybox', 'pepper', 'one-zero', 'kvish6',
    'derech-eretz', 'israelpost', 'doarisrael'
  ];

  /* ── English urgency patterns ── */
  var URGENCY_EN = [
    'urgent', 'immediately', 'suspended', 'locked', 'blocked', 'verify now',
    'confirm your', 'update your', 'act now', 'expire', 'limited time',
    'unauthorized', 'unusual activity', 'security alert', 'action required',
    'account will be', 'within 24 hours', 'within 48 hours', 'click here',
    'your account has been', 'failure to', 'will be terminated', 'deactivated',
    'won', 'prize', 'congratulations', 'selected', 'reward', 'gift card',
    'free', 'claim', 'winner', 'penalty', 'fine', 'overdue', 'collection',
    'legal action', 'court', 'arrest warrant', 'pay now', 'final notice',
    'debt', 'unpaid', 'invoice'
  ];

  /* ── Hebrew urgency + scam patterns ── */
  var URGENCY_HE = [
    /* Urgency / pressure */
    'דחוף', 'מיידי', 'חשבונך', 'ייחסם', 'נחסם', 'אמת עכשיו', 'לחץ כאן',
    'עדכן את', 'פעולה נדרשת', 'תוקף', 'הגבלה', 'חשד', 'פעילות חשודה',
    'אבטחה', 'אישור נדרש', 'תוך 24 שעות',
    /* Financial / debt threats */
    'חוב', 'תשלום', 'הוצאה לפועל', 'קנס', 'חיוב', 'יתרה', 'חשבון בנק',
    'כרטיס אשראי', 'עיקול', 'גבייה', 'פיגור', 'אי תשלום', 'דמי', 'חשבונית',
    'סכום', 'להסדיר', 'להסדרת', 'לתשלום',
    /* Click-the-link patterns */
    'היכנסו לקישור', 'לחצו כאן', 'לחץ על הקישור', 'הקישור הבא',
    'לחצו על', 'היכנס לקישור', 'היכנסו ל', 'לחץ לאישור',
    /* Prize / gift scams */
    'זכית', 'פרס', 'מתנה', 'בחינם', 'הזדמנות', 'מבצע מיוחד',
    /* Package scams */
    'חבילה', 'משלוח', 'הזמנה', 'מכס', 'חבילתך', 'המשלוח שלך',
    /* Account / identity */
    'אימות', 'זהות', 'אימות דו', 'סיסמה', 'סיסמא', 'שם משתמש',
    'חשבונך ננעל', 'חשבונך הוגבל', 'חשבונך יושעה'
  ];

  /* ── Israeli-specific scam templates ── */
  var IL_SCAM_PATTERNS = [
    { regex: /כביש\s*6|כביש\s*שש|דרך\s*ארץ|kvish/i, label: 'Highway 6 (כביש 6) toll scam', points: 30, desc: 'Classic Israeli smishing — fake Highway 6 toll debt. The real company NEVER sends SMS with payment links.' },
    { regex: /דואר\s*ישראל|israel\s*post|חבילה\s*ממתינה|חבילתך/i, label: 'Israel Post package scam', points: 25, desc: 'Fake package delivery. Israel Post uses the official app or postal.co.il — not random SMS links.' },
    { regex: /ביטוח\s*לאומי|ביטוח\s*הלאומי|bituach/i, label: 'Bituach Leumi scam', points: 30, desc: 'Impersonating National Insurance. They send notices through their official portal, never via SMS links.' },
    { regex: /מס\s*הכנסה|רשות\s*המסים|tax\s*authority/i, label: 'Tax Authority scam', points: 30, desc: 'Impersonating the Israel Tax Authority. They communicate through gov.il — never SMS.' },
    { regex: /משטר[הת]|police|שוטר/i, label: 'Police impersonation scam', points: 30, desc: 'Fake police alert. Israel Police does NOT send SMS with links.' },
    { regex: /בנק\s*לאומי|leumi/i, label: 'Bank Leumi impersonation', points: 25, desc: 'Banks never send SMS asking you to click a link to verify or pay.' },
    { regex: /בנק\s*הפועלים|hapoalim/i, label: 'Bank Hapoalim impersonation', points: 25, desc: 'Verify by calling the bank directly (*2407) — never click SMS links.' },
    { regex: /בנק\s*דיסקונט|discount\s*bank/i, label: 'Discount Bank impersonation', points: 25, desc: 'Banks never request action through SMS links.' },
    { regex: /בנק\s*מזרחי|mizrahi|טפחות/i, label: 'Mizrahi-Tefahot impersonation', points: 25, desc: 'Never share banking details through SMS links.' },
    { regex: /כאל|cal|ישראכרט|isracard|מקס|max\s*card/i, label: 'Credit card company scam', points: 25, desc: 'Impersonating an Israeli credit card company. Use their official apps.' },
    { regex: /חברת\s*חשמל|electric\s*company|חשמל/i, label: 'Electric company scam', points: 20, desc: 'Fake electric bill. Israel Electric uses their official website — never SMS links.' },
    { regex: /עירייה|municipality|ארנונה/i, label: 'Municipality / Arnona scam', points: 20, desc: 'Impersonating a municipality. Contact your local city hall directly.' }
  ];

  /* ── Extract URLs from text ── */
  function extractUrls(text) {
    var urlRegex = /https?:\/\/[^\s<>"')\]،]+/gi;
    var matches = text.match(urlRegex) || [];
    /* Also catch data: and javascript: URIs */
    var dangerousRegex = /(?:data|javascript):[^\s<>"')\]]+/gi;
    var dangerous = text.match(dangerousRegex) || [];
    return matches.concat(dangerous);
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
    var parts = host.split('.');

    /* Handle compound TLDs: .co.il, .gov.il, .org.il, .ac.il, .co.uk, .com.au etc. */
    var COMPOUND_TLDS = ['co.il','gov.il','org.il','ac.il','net.il','muni.il','idf.il','co.uk','org.uk','ac.uk','gov.uk','com.au','com.br','co.nz','co.za','co.in','com.sg'];
    var tld = parts[parts.length - 1];
    var effectiveTld = tld;
    var sld = parts.length >= 2 ? parts[parts.length - 2] : '';
    if (parts.length >= 3) {
      var compoundCandidate = parts[parts.length - 2] + '.' + parts[parts.length - 1];
      if (COMPOUND_TLDS.indexOf(compoundCandidate) !== -1) {
        effectiveTld = compoundCandidate;
        sld = parts.length >= 3 ? parts[parts.length - 3] : '';
      }
    }
    var domain = sld + '.' + effectiveTld;
    var effectiveParts = host.replace('.' + effectiveTld, '').split('.');

    /* 1. IP address instead of domain */
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host)) {
      findings.push({ severity: 'high', text: 'URL uses a raw IP address (' + host + ') instead of a domain — phishing sites use IPs to avoid domain takedowns', points: 25 });
      score += 25;
    }

    /* 2. Suspicious TLD */
    if (SUSPECT_TLDS.indexOf(tld) !== -1) {
      findings.push({ severity: 'high', text: 'Suspicious TLD: .' + tld + ' — this extension is heavily abused for phishing and costs almost nothing to register', points: 25 });
      score += 25;
    }

    /* 3. Short disposable domain — very suspicious (skip compound TLDs like .co.il) */
    var isCompound = effectiveTld !== tld;
    if (!isCompound && sld.length <= 3 && SUSPECT_TLDS.indexOf(tld) !== -1) {
      findings.push({ severity: 'critical', text: 'Throwaway domain: "' + domain + '" — extremely short domain on a suspicious TLD, classic phishing infrastructure', points: 30 });
      score += 30;
    } else if (!isCompound && sld.length <= 3 && tld.length <= 3) {
      findings.push({ severity: 'high', text: 'Suspiciously short domain: "' + domain + '" — short domains on cheap TLDs are commonly used by attackers', points: 15 });
      score += 15;
    }

    /* 4. URL shortener */
    var isShortener = SHORTENERS.some(function (s) { return host === s || host.endsWith('.' + s); });
    if (isShortener) {
      findings.push({ severity: 'medium', text: 'URL shortener (' + host + ') — the real destination is hidden', points: 15 });
      score += 15;
    }

    /* 5. Short path that looks like shortener */
    var pathClean = parsed.pathname.replace(/^\//, '');
    if (sld.length <= 4 && pathClean.length > 0 && pathClean.length <= 8 && pathClean.indexOf('/') === -1 && !isShortener) {
      findings.push({ severity: 'high', text: 'Looks like a custom URL shortener: short domain + short path code ("/' + pathClean + '") — likely redirects to the real phishing page', points: 20 });
      score += 20;
    }

    /* 6. Excessive subdomains (3+, adjusted for compound TLDs) */
    var subdomainCount = effectiveParts.length - 1; /* minus the SLD */
    if (subdomainCount >= 2) {
      findings.push({ severity: 'medium', text: 'Excessive subdomains (' + (subdomainCount + 1) + ' levels: ' + host + ') — used to disguise the real domain', points: 15 });
      score += 15;
    }

    /* 7. Brand impersonation in domain */
    BRAND_KEYWORDS.forEach(function (brand) {
      if (host.indexOf(brand) !== -1 && host !== brand + '.com' && host !== 'www.' + brand + '.com') {
        findings.push({ severity: 'high', text: 'Brand impersonation: "' + brand + '" appears in the domain but this is NOT the official site', points: 25 });
        score += 25;
      }
    });
    IL_BRAND_KEYWORDS.forEach(function (brand) {
      if (host.indexOf(brand) !== -1 && !host.endsWith('.co.il') && !host.endsWith('.gov.il')) {
        findings.push({ severity: 'high', text: 'Israeli brand impersonation: "' + brand + '" in domain but not an official .co.il site', points: 25 });
        score += 25;
      }
    });

    /* 8. Homograph / look-alike characters */
    if (/[а-яёА-ЯЁ]/.test(host) || host !== host.normalize('NFC')) {
      findings.push({ severity: 'critical', text: 'Homograph attack — domain uses non-Latin characters that look like English letters', points: 30 });
      score += 30;
    }

    /* 9. @ in URL */
    if (fullLower.indexOf('@') !== -1 && fullLower.indexOf('mailto:') === -1) {
      findings.push({ severity: 'high', text: 'URL contains "@" — tricks browsers into connecting to a different domain', points: 25 });
      score += 25;
    }

    /* 10. Suspicious path keywords */
    var pathLower = (parsed.pathname + parsed.search).toLowerCase();
    var suspectPaths = ['login', 'signin', 'verify', 'confirm', 'secure', 'account', 'update', 'banking', 'password', 'credential', 'authenticate', 'wallet', 'recover', 'payment', 'pay', 'invoice', 'billing'];
    var foundPaths = suspectPaths.filter(function (p) { return pathLower.indexOf(p) !== -1; });
    if (foundPaths.length > 0) {
      findings.push({ severity: 'medium', text: 'Credential-harvesting keywords in URL path: ' + foundPaths.join(', '), points: 10 });
      score += 10;
    }

    /* 11. Heavy encoding */
    var encodedCount = (urlStr.match(/%[0-9a-f]{2}/gi) || []).length;
    if (encodedCount > 3) {
      findings.push({ severity: 'medium', text: 'Obfuscated URL — ' + encodedCount + ' encoded characters hiding the real content', points: 10 });
      score += 10;
    }

    /* 12. Non-standard port */
    if (parsed.port && parsed.port !== '80' && parsed.port !== '443') {
      findings.push({ severity: 'medium', text: 'Non-standard port :' + parsed.port + ' — legitimate websites almost never use unusual ports', points: 10 });
      score += 10;
    }

    /* 13. HTTP (no TLS) */
    if (parsed.protocol === 'http:') {
      findings.push({ severity: 'medium', text: 'No HTTPS encryption — data you enter can be intercepted in transit', points: 10 });
      score += 10;
    }

    /* 14. Nested URLs / redirects */
    var innerUrls = urlStr.match(/https?%3A%2F%2F|https?:\/\//gi) || [];
    if (innerUrls.length > 1) {
      findings.push({ severity: 'high', text: 'Redirect chain — URL contains another URL inside it', points: 20 });
      score += 20;
    }

    /* 15. Data URI or javascript: */
    if (/^(data:|javascript:)/i.test(urlStr)) {
      findings.push({ severity: 'critical', text: 'Dangerous URI scheme — executes code instead of navigating to a website', points: 40 });
      score += 40;
    }

    /* 16. Hyphens abuse in domain */
    if ((host.match(/-/g) || []).length >= 2) {
      findings.push({ severity: 'low', text: 'Multiple hyphens in domain ("' + domain + '") — commonly used in phishing lookalikes', points: 5 });
      score += 5;
    }

    /* 17. Very long URL */
    if (urlStr.length > 150) {
      findings.push({ severity: 'low', text: 'Long URL (' + urlStr.length + ' chars) — may contain tracking or obfuscation', points: 5 });
      score += 5;
    }

    score = Math.min(score, 100);

    if (findings.length === 0) {
      findings.push({ severity: 'clean', text: 'No structural phishing indicators detected in this URL', points: 0 });
    }

    return { url: urlStr, findings: findings, score: score, parsed: parsed };
  }

  /* ── Analyze SMS/message text ── */
  function analyzeSmsText(text) {
    var findings = [];
    var score = 0;

    /* Israeli scam template matching — highest priority */
    IL_SCAM_PATTERNS.forEach(function (pattern) {
      if (pattern.regex.test(text)) {
        findings.push({ severity: 'critical', text: '🇮🇱 ' + pattern.label + ' — ' + pattern.desc, points: pattern.points });
        score += pattern.points;
      }
    });

    /* Urgency — English */
    var urgencyFound = [];
    URGENCY_EN.forEach(function (phrase) {
      if (text.toLowerCase().indexOf(phrase) !== -1) urgencyFound.push(phrase);
    });
    if (urgencyFound.length > 0) {
      var pts = Math.min(urgencyFound.length * 7, 25);
      findings.push({
        severity: urgencyFound.length >= 3 ? 'high' : 'medium',
        text: 'Pressure/urgency tactics: "' + urgencyFound.slice(0, 5).join('", "') + '"' + (urgencyFound.length > 5 ? ' (+' + (urgencyFound.length - 5) + ' more)' : ''),
        points: pts
      });
      score += pts;
    }

    /* Urgency — Hebrew */
    var urgencyHeFound = [];
    URGENCY_HE.forEach(function (phrase) {
      if (text.indexOf(phrase) !== -1) urgencyHeFound.push(phrase);
    });
    if (urgencyHeFound.length > 0) {
      var ptsHe = Math.min(urgencyHeFound.length * 7, 25);
      findings.push({
        severity: urgencyHeFound.length >= 3 ? 'high' : 'medium',
        text: 'Hebrew pressure tactics: "' + urgencyHeFound.slice(0, 5).join('", "') + '"' + (urgencyHeFound.length > 5 ? ' (+' + (urgencyHeFound.length - 5) + ' more)' : ''),
        points: ptsHe
      });
      score += ptsHe;
    }

    /* Short message with URL = classic smishing (but not if input is just a bare URL) */
    var urls = extractUrls(text);
    var textWithoutUrls = text;
    urls.forEach(function (u) { textWithoutUrls = textWithoutUrls.replace(u, ''); });
    var hasRealText = textWithoutUrls.trim().length > 10;
    if (urls.length > 0 && hasRealText && text.length < 300) {
      findings.push({ severity: 'medium', text: 'Short message containing a link — the #1 smishing pattern: brief text + urgency + click this link', points: 10 });
      score += 10;
    }

    /* Money / financial lure */
    if (/\$\d|₪\d|€\d|£\d|\d+\s*(?:dollars?|shekels?|euros?|pounds?|ש"ח|שקל)/i.test(text)) {
      findings.push({ severity: 'medium', text: 'Financial amounts mentioned — creates urgency around money', points: 10 });
      score += 10;
    }

    /* "בכבוד רב" / formal sign-off in SMS */
    if (/בכבוד\s*רב|sincerely|regards/i.test(text) && urls.length > 0) {
      findings.push({ severity: 'low', text: 'Formal sign-off in SMS — phishing messages add formality to appear legitimate', points: 5 });
      score += 5;
    }

    score = Math.min(score, 100);
    return { findings: findings, score: score };
  }

  /* ── Risk level from score ── */
  function riskLevel(score) {
    if (score >= 70) return {
      label: 'PHISHING DETECTED', cls: 'critical', emoji: '🚨',
      advice: 'This is almost certainly a phishing/smishing attack. Do NOT click any links. Do NOT enter any information. Delete the message and report the sender. If you already clicked — change your passwords immediately and monitor your accounts.'
    };
    if (score >= 40) return {
      label: 'HIGH RISK', cls: 'high', emoji: '🔴',
      advice: 'Multiple phishing indicators detected. Do not click any links. If this claims to be from a company, open their official website directly (not through this link) or call them.'
    };
    if (score >= 20) return {
      label: 'SUSPICIOUS', cls: 'medium', emoji: '🟡',
      advice: 'Some suspicious patterns found. Verify the sender through official channels before interacting. When in doubt, go directly to the official website — never through a link in a message.'
    };
    if (score > 0) return {
      label: 'LOW RISK', cls: 'low', emoji: '🟢',
      advice: 'Minor indicators found. Probably safe, but always verify links from unknown senders.'
    };
    return {
      label: 'CLEAN', cls: 'clean', emoji: '✅',
      advice: 'No phishing indicators detected. Standard caution applies.'
    };
  }

  /* ── Build external verification links ── */
  function buildVerifyLinks(urlStr) {
    return [
      { name: 'VirusTotal', icon: '🦠', href: 'https://www.virustotal.com/gui/url/' + encodeURIComponent(urlStr), desc: 'Scan across 90+ security engines for malware & phishing' },
      { name: 'URLScan.io', icon: '📸', href: 'https://urlscan.io/search/#' + encodeURIComponent(urlStr), desc: 'Safe visual preview — see the page without visiting it' },
      { name: 'Google Safe Browsing', icon: '🛡️', href: 'https://transparencyreport.google.com/safe-browsing/search?url=' + encodeURIComponent(urlStr), desc: "Google's phishing & malware blocklist" },
      { name: 'PhishTank', icon: '🎣', href: 'https://phishtank.org/phish_search.php?verified=u&active=y', desc: 'Community-verified phishing database' },
      { name: 'URLVoid', icon: '🌐', href: 'https://www.urlvoid.com/scan/' + encodeURIComponent(urlStr), desc: 'Check 30+ website reputation engines' }
    ];
  }

  /* ── Escape HTML ── */
  function esc(s) {
    if (!s) return '';
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  /* ── Escape for HTML attributes (prevents attribute injection) ── */
  function escapeAttr(s) {
    if (!s) return '';
    return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

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

    /* Combined score — SMS + highest URL score */
    var maxUrlScore = 0;
    urlAnalyses.forEach(function (a) { if (a.score > maxUrlScore) maxUrlScore = a.score; });
    var totalScore = Math.min(smsAnalysis.score + maxUrlScore, 100);
    var risk = riskLevel(totalScore);

    /* Collect ALL findings count */
    var totalFindings = smsAnalysis.findings.length;
    urlAnalyses.forEach(function (a) { totalFindings += a.findings.length; });

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
    html += '      <span class="gofish-verdict__sublabel">' + totalFindings + ' indicators found</span>';
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
      html += '  <div class="gofish-verify-title">🔍 Verify with external scanners</div>';
      html += '  <div class="gofish-verify-links">';
      verifyLinks.forEach(function (l) {
        html += '<a href="' + escapeAttr(l.href) + '" target="_blank" rel="noopener noreferrer" class="ioc-link">';
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
      html += '  <p class="gofish-no-url">No URLs or suspicious patterns found. Try pasting a URL or the full SMS message text.</p>';
      html += '</div>';
    }

    /* ── Contextual product recommendations (data-driven) ── */
    var recs = (window.IOC_TOOL_RECS || []).filter(function (r) {
      return r.types.indexOf('phishing') !== -1;
    });
    if (recs.length > 0 && totalScore > 0) {
      html += '<div class="ioc-card__recs">';
      html += '  <div class="ioc-card__recs-title">🛡️ Protect yourself</div>';
      recs.forEach(function (r) {
        html += '<a href="' + escapeAttr(r.url) + '" target="_blank" rel="noopener noreferrer" class="ioc-rec">';
        html += '  <div class="ioc-rec__header">';
        html += '    <strong class="ioc-rec__name">' + esc(r.name) + '</strong>';
        if (r.badge) html += '    <span class="ioc-rec__badge">' + esc(r.badge) + '</span>';
        html += '  </div>';
        html += '  <p class="ioc-rec__desc">' + esc(r.desc) + '</p>';
        html += '</a>';
      });
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
      /* Auto-select input text so user can immediately type a new query */
      input.select();
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        input.value = '';
        document.getElementById('gofishResults').innerHTML = '';
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
  });
})();
