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

  // File extensions that should NOT be treated as domains
  var FILE_EXTENSIONS = /\.(php|html|htm|asp|aspx|jsp|cgi|js|css|py|rb|pl|exe|dll|bat|cmd|sh|ps1|vbs|msi|doc|docx|xls|xlsx|pdf|zip|rar|7z|tar|gz|iso|img|txt|csv|xml|json|log|bak|tmp|swp|sql|db|conf|cfg|ini|yml|yaml|env|jar|war|class)$/i;

  var TYPE_LABELS = {
    ip: 'IP Address', hash: 'File Hash', domain: 'Domain',
    url: 'URL', email: 'Email Address'
  };

  var TYPE_ICONS = (function() {
    var _i = function(n) { return typeof scwIcon === 'function' ? scwIcon(n) : ''; };
    return { ip: _i('cloud'), hash: '#', domain: _i('link'), url: _i('link'), email: _i('file') };
  })();

  var TYPE_BADGE = {
    ip: 'signal', hash: 'live', domain: 'drop',
    url: 'vault', email: 'signal'
  };

  /* ── Smart analysis — IOC-specific intelligence ── */

  // Private/reserved IP ranges
  var PRIVATE_RANGES = [
    { prefix: '10.', desc: 'RFC 1918 Private Network (Class A)' },
    { prefix: '192.168.', desc: 'RFC 1918 Private Network (Class C)' },
    { prefix: '127.', desc: 'Loopback Address' },
    { prefix: '0.', desc: 'Current Network (invalid)' },
    { prefix: '169.254.', desc: 'Link-Local (APIPA — no DHCP)' },
    { prefix: '224.', desc: 'Multicast' },
    { prefix: '240.', desc: 'Reserved (Class E)' },
    { prefix: '255.', desc: 'Broadcast' }
  ];
  function isPrivateRange(ip) {
    // 172.16.0.0 – 172.31.255.255
    var m172 = ip.match(/^172\.(\d+)\./);
    if (m172 && parseInt(m172[1], 10) >= 16 && parseInt(m172[1], 10) <= 31) {
      return 'RFC 1918 Private Network (Class B)';
    }
    for (var i = 0; i < PRIVATE_RANGES.length; i++) {
      if (ip.indexOf(PRIVATE_RANGES[i].prefix) === 0) return PRIVATE_RANGES[i].desc;
    }
    return null;
  }

  // Known cloud/CDN/service IP ranges (first two octets)
  var CLOUD_RANGES = [
    { prefixes: ['13.', '20.', '40.', '52.', '104.'], name: 'Microsoft Azure', risk: 'Cloud infrastructure — could be legitimate or attacker-hosted' },
    { prefixes: ['3.', '18.', '34.', '35.', '54.', '99.'], name: 'Amazon AWS', risk: 'Cloud infrastructure — C2 servers frequently use AWS' },
    { prefixes: ['34.', '35.', '130.211.', '142.250.', '172.217.', '216.58.', '216.239.'], name: 'Google Cloud / Google', risk: 'Google infrastructure — rarely malicious but used for redirects' },
    { prefixes: ['104.16.', '104.17.', '104.18.', '104.19.', '104.20.', '104.21.', '104.22.', '104.23.', '104.24.', '104.25.', '104.26.', '104.27.', '172.67.', '173.245.', '198.41.'], name: 'Cloudflare', risk: 'CDN/WAF — domain behind Cloudflare, real origin IP hidden' },
    { prefixes: ['185.199.'], name: 'GitHub Pages', risk: 'GitHub hosting — typically benign' },
    { prefixes: ['151.101.'], name: 'Fastly CDN', risk: 'CDN provider — hosts many legitimate sites' },
    { prefixes: ['23.', '2.16.', '184.'], name: 'Akamai CDN', risk: 'Major CDN provider' },
    { prefixes: ['157.240.', '31.13.', '179.60.'], name: 'Meta (Facebook)', risk: 'Facebook/Instagram/WhatsApp infrastructure' },
    { prefixes: ['91.108.', '149.154.'], name: 'Telegram', risk: 'Telegram infrastructure — check if used as C2 channel' },
    { prefixes: ['162.125.'], name: 'Dropbox', risk: 'Dropbox — sometimes abused for payload hosting' },
    { prefixes: ['198.51.100.'], name: 'Documentation (TEST-NET-2)', risk: 'Reserved for documentation — should not appear in real traffic' },
    { prefixes: ['203.0.113.'], name: 'Documentation (TEST-NET-3)', risk: 'Reserved for documentation — should not appear in real traffic' }
  ];
  function identifyCloudProvider(ip) {
    for (var i = 0; i < CLOUD_RANGES.length; i++) {
      var cr = CLOUD_RANGES[i];
      for (var j = 0; j < cr.prefixes.length; j++) {
        if (ip.indexOf(cr.prefixes[j]) === 0) {
          return { name: cr.name, risk: cr.risk };
        }
      }
    }
    return null;
  }

  // Suspicious TLDs commonly used in phishing/malware
  var SUSPICIOUS_TLDS = {
    'tk': 'Free TLD — extremely common in phishing',
    'ml': 'Free TLD — high abuse rate',
    'ga': 'Free TLD — high abuse rate',
    'cf': 'Free TLD — high abuse rate',
    'gq': 'Free TLD — high abuse rate',
    'top': 'Cheap TLD — frequently used in scams',
    'xyz': 'Cheap TLD — high spam/phishing volume',
    'work': 'Cheap TLD — commonly used in phishing',
    'click': 'Suspicious TLD — used in malvertising',
    'link': 'Suspicious TLD — used in redirects',
    'info': 'Budget TLD — moderate abuse rate',
    'buzz': 'Cheap TLD — very high abuse rate',
    'surf': 'Cheap TLD — commonly used in spam',
    'cam': 'Suspicious TLD — used in phishing',
    'icu': 'Cheap TLD — extremely high abuse rate',
    'rest': 'Cheap TLD — high abuse rate',
    'sbs': 'Cheap TLD — high abuse rate',
    'mobi': 'Moderate risk — used in mobile phishing campaigns',
    'onion': 'Tor hidden service — dark web',
    'bit': 'Namecoin — used for decentralized dark web',
    'ru': 'Russian TLD — common in cybercrime campaigns',
    'cn': 'Chinese TLD — frequently seen in scanning/attacks',
    'su': 'Soviet Union TLD — used by Russian cybercriminal groups'
  };

  // Known legitimate domains that should not trigger alerts
  var KNOWN_SAFE_DOMAINS = [
    'google.com', 'youtube.com', 'facebook.com', 'twitter.com', 'x.com',
    'microsoft.com', 'apple.com', 'amazon.com', 'github.com', 'linkedin.com',
    'cloudflare.com', 'akamai.com', 'fastly.com', 'amazonaws.com', 'azure.com',
    'office365.com', 'outlook.com', 'live.com', 'hotmail.com', 'gmail.com',
    'yahoo.com', 'wikipedia.org', 'mozilla.org', 'wordpress.com', 'shopify.com',
    'stripe.com', 'paypal.com', 'dropbox.com', 'slack.com', 'zoom.us',
    'telegram.org', 'whatsapp.com', 'signal.org', 'reddit.com', 'stackoverflow.com'
  ];

  // Disposable email providers
  var DISPOSABLE_EMAIL_DOMAINS = [
    'tempmail.com', 'guerrillamail.com', 'throwaway.email', 'yopmail.com',
    'mailinator.com', 'sharklasers.com', 'guerrillamailblock.com', 'grr.la',
    'dispostable.com', '10minutemail.com', 'trashmail.com', 'fakeinbox.com',
    'temp-mail.org', 'maildrop.cc', 'harakirimail.com', 'tempail.com',
    'getairmail.com', 'mohmal.com', 'burnermail.io', 'discard.email'
  ];

  // DGA detection — domains with high entropy / random-looking patterns
  function calcEntropy(str) {
    var freq = {};
    for (var i = 0; i < str.length; i++) {
      var c = str[i];
      freq[c] = (freq[c] || 0) + 1;
    }
    var entropy = 0;
    var len = str.length;
    for (var ch in freq) {
      var p = freq[ch] / len;
      entropy -= p * Math.log2(p);
    }
    return entropy;
  }

  function analyzeIP(ip) {
    var findings = [];
    var riskLevel = 'medium'; // default

    // Check private/reserved
    var priv = isPrivateRange(ip);
    if (priv) {
      findings.push({ icon: '🏠', label: 'Internal Address', detail: priv + ' — this IP is not routable on the public internet. If found in external logs, it may indicate NAT, VPN, or log corruption.', severity: 'info' });
      riskLevel = 'low';
    }

    // Check cloud provider
    var cloud = identifyCloudProvider(ip);
    if (cloud) {
      findings.push({ icon: '☁️', label: 'Infrastructure: ' + cloud.name, detail: cloud.risk, severity: 'info' });
    }

    // Check common ports hint
    var octets = ip.split('.').map(function(o) { return parseInt(o, 10); });
    if (octets[0] >= 1 && octets[0] <= 126 && !priv) {
      findings.push({ icon: '🌍', label: 'Class A Public IP', detail: 'Large allocation — typically ISPs or large enterprises. Check Shodan for exposed services and AbuseIPDB for reports.', severity: 'medium' });
    }
    if (octets[0] >= 128 && octets[0] <= 191 && !priv && !cloud) {
      findings.push({ icon: '🌐', label: 'Class B Public IP', detail: 'Mid-size allocation — could be organization or hosting provider. Check reverse DNS and WHOIS for ownership.', severity: 'medium' });
    }
    if (octets[0] >= 192 && octets[0] <= 223 && !priv && !cloud) {
      findings.push({ icon: '🔍', label: 'Class C Public IP', detail: 'Smaller allocation — often a specific server or small network. Good target for Shodan port scan and GreyNoise reputation check.', severity: 'medium' });
    }

    // Recommend priority sources
    var priority = [];
    if (!priv) {
      priority.push({ name: 'AbuseIPDB', reason: 'Check if this IP has been reported for abuse (scanning, brute force, spam)' });
      priority.push({ name: 'Shodan', reason: 'See open ports, services, and vulnerabilities on this IP' });
      priority.push({ name: 'GreyNoise', reason: 'Check if this IP is part of mass scanning infrastructure' });
      if (cloud) priority.push({ name: 'VirusTotal', reason: 'Check domain history and file associations for this IP' });
    }

    return { findings: findings, riskLevel: riskLevel, priority: priority };
  }

  function analyzeDomain(domain) {
    var findings = [];
    var priority = [];
    var riskLevel = 'medium';
    var parts = domain.split('.');
    var tld = parts[parts.length - 1].toLowerCase();
    var sld = parts.length >= 2 ? parts[parts.length - 2] : '';
    var domainBase = parts.length >= 2 ? parts.slice(-2).join('.') : domain;

    // Check if known safe
    if (KNOWN_SAFE_DOMAINS.indexOf(domainBase) !== -1) {
      findings.push({ icon: '✅', label: 'Known Legitimate Domain', detail: domain + ' belongs to a well-known, trusted service. Unlikely to be malicious unless this is a subdomain used for phishing.', severity: 'low' });
      riskLevel = 'low';
      if (parts.length > 2) {
        findings.push({ icon: '⚠️', label: 'Subdomain of Trusted Domain', detail: 'While the base domain is trusted, subdomains can be abused. Verify this specific subdomain is legitimate.', severity: 'medium' });
        riskLevel = 'medium';
      }
    }

    // Check suspicious TLD
    if (SUSPICIOUS_TLDS[tld]) {
      findings.push({ icon: '🚩', label: 'Suspicious TLD: .' + tld, detail: SUSPICIOUS_TLDS[tld] + '. Domains with this TLD are blocked or flagged by many security tools.', severity: 'high' });
      riskLevel = 'high';
    }

    // Check entropy (DGA detection)
    var entropy = calcEntropy(sld);
    if (sld.length > 8 && entropy > 3.5) {
      findings.push({ icon: '🤖', label: 'Possible DGA Domain', detail: 'The domain name "' + sld + '" has high randomness (entropy: ' + entropy.toFixed(1) + '). This pattern is common in Domain Generation Algorithms used by malware botnets like Necurs, Conficker, or Emotet.', severity: 'high' });
      riskLevel = 'high';
    } else if (sld.length > 12 && entropy > 3.0) {
      findings.push({ icon: '🔎', label: 'Unusual Domain Pattern', detail: 'Long domain with moderate randomness. Could be DGA, could be legitimate. Cross-reference with VirusTotal.', severity: 'medium' });
    }

    // Check for lookalike (typosquatting patterns)
    var lookalikes = ['goog1e', 'g00gle', 'micros0ft', 'amaz0n', 'paypa1', 'faceb00k', 'linkedln', 'app1e', 'dropb0x', 'netfl1x', 'microsofr', 'gogle', 'goggle'];
    for (var i = 0; i < lookalikes.length; i++) {
      if (sld.toLowerCase().indexOf(lookalikes[i]) !== -1) {
        findings.push({ icon: '🎣', label: 'Possible Typosquatting', detail: 'Domain contains "' + lookalikes[i] + '" — a common misspelling used in phishing. This is very likely a malicious domain impersonating a legitimate brand.', severity: 'critical' });
        riskLevel = 'critical';
        break;
      }
    }

    // Domain length analysis
    if (domain.length > 40) {
      findings.push({ icon: '📏', label: 'Unusually Long Domain', detail: 'At ' + domain.length + ' characters, this domain is abnormally long. Long domains are often used to hide the real destination in URL bars.', severity: 'medium' });
    }

    // Hyphen count
    var hyphens = (domain.match(/-/g) || []).length;
    if (hyphens >= 3) {
      findings.push({ icon: '➖', label: 'Multiple Hyphens (' + hyphens + ')', detail: 'Legitimate domains rarely have ' + hyphens + ' hyphens. This is a common pattern in phishing domains like "secure-login-bank-verify.com".', severity: 'high' });
      if (riskLevel !== 'critical') riskLevel = 'high';
    }

    // Subdomain depth
    if (parts.length > 3) {
      findings.push({ icon: '🔗', label: 'Deep Subdomain (' + (parts.length - 2) + ' levels)', detail: 'Multiple subdomain levels can be used to make URLs look legitimate (e.g., "login.secure.bankname.evil.com").', severity: 'medium' });
    }

    priority.push({ name: 'VirusTotal', reason: 'Check detection rate across 70+ security engines' });
    priority.push({ name: 'URLhaus', reason: 'Check if this domain is distributing malware' });
    priority.push({ name: 'SecurityTrails', reason: 'See DNS history, subdomains, and associated IPs' });

    return { findings: findings, riskLevel: riskLevel, priority: priority };
  }

  function analyzeHash(type, hash) {
    var findings = [];
    var priority = [];

    findings.push({ icon: '🔑', label: type.toUpperCase() + ' Hash (' + hash.length + ' chars)', detail: type === 'md5' ? 'MD5 hashes can have collisions — if possible, verify with SHA256. Most platforms support all hash types.' : type === 'sha1' ? 'SHA-1 hash detected. More reliable than MD5, but SHA-256 is preferred for unique identification.' : 'SHA-256 hash — the gold standard for file identification. Most reliable hash type.', severity: 'info' });

    // Check for known test hashes
    if (hash.toLowerCase() === '44d88612fea8a8f36de82e1278abb02f' || hash.toLowerCase() === '275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f') {
      findings.push({ icon: '🧪', label: 'EICAR Test File', detail: 'This is the EICAR anti-malware test file hash — it\'s not really malware, just a test pattern used to verify AV scanners are working.', severity: 'info' });
    }

    // All zeros check
    if (/^0+$/.test(hash)) {
      findings.push({ icon: '❌', label: 'Null Hash', detail: 'This is a null/empty hash. It typically indicates an error in hash computation or an empty file.', severity: 'info' });
    }

    priority.push({ name: 'VirusTotal', reason: 'Check detection by 70+ AV engines — the most comprehensive source' });
    priority.push({ name: 'MalwareBazaar', reason: 'Check if this hash matches a known malware sample with family classification' });
    priority.push({ name: 'Hybrid Analysis', reason: 'See sandbox execution results — behavior, network connections, dropped files' });

    return { findings: findings, riskLevel: 'medium', priority: priority };
  }

  function analyzeURL(url) {
    var findings = [];
    var priority = [];
    var riskLevel = 'medium';

    try {
      var parsed = new URL(url);

      // Protocol check
      if (parsed.protocol === 'http:') {
        findings.push({ icon: '🔓', label: 'No HTTPS', detail: 'This URL uses unencrypted HTTP. Legitimate login pages and payment forms always use HTTPS. Unencrypted connections can be intercepted.', severity: 'high' });
        riskLevel = 'high';
      }

      // Port check
      if (parsed.port && parsed.port !== '80' && parsed.port !== '443') {
        findings.push({ icon: '🔌', label: 'Non-standard Port: ' + parsed.port, detail: 'This URL uses port ' + parsed.port + '. Non-standard ports are common in C2 callbacks, web shells, and malware delivery infrastructure.', severity: 'high' });
        riskLevel = 'high';
      }

      // IP-based URL
      if (PATTERNS.ipv4.test(parsed.hostname)) {
        findings.push({ icon: '🚨', label: 'IP-based URL', detail: 'This URL points to an IP address instead of a domain name. Legitimate services almost always use domain names. IP-based URLs are a strong indicator of phishing or malware hosting.', severity: 'high' });
        riskLevel = 'high';
        // Also run IP analysis
        var ipAnalysis = analyzeIP(parsed.hostname);
        findings = findings.concat(ipAnalysis.findings);
      } else {
        // Run domain analysis on the hostname
        var domainAnalysis = analyzeDomain(parsed.hostname);
        findings = findings.concat(domainAnalysis.findings);
        if (domainAnalysis.riskLevel === 'critical') riskLevel = 'critical';
        else if (domainAnalysis.riskLevel === 'high' && riskLevel !== 'critical') riskLevel = 'high';
      }

      // Path analysis
      var path = parsed.pathname;
      if (path.match(/\.(exe|dll|bat|cmd|ps1|vbs|js|scr|msi|hta|wsf|jar|py|sh)$/i)) {
        findings.push({ icon: '💀', label: 'Executable File Download', detail: 'URL path ends with an executable extension. This is likely a malware delivery URL. DO NOT download or execute.', severity: 'critical' });
        riskLevel = 'critical';
      }
      if (path.match(/\.(zip|rar|7z|tar|gz|iso|img)$/i)) {
        findings.push({ icon: '📦', label: 'Archive/Image File', detail: 'URL points to an archive or disk image. Threat actors commonly use archives to bypass email security gateways and deliver malware.', severity: 'high' });
        if (riskLevel !== 'critical') riskLevel = 'high';
      }
      if (path.match(/\.(doc|docx|xls|xlsx|ppt|pdf)$/i)) {
        findings.push({ icon: '📄', label: 'Document File', detail: 'URL points to a document. Malicious documents may contain macros, exploits, or embedded payloads. Open in a sandbox only.', severity: 'medium' });
      }

      // Query parameter analysis
      if (parsed.search) {
        var params = parsed.searchParams;
        var suspiciousParams = ['cmd', 'exec', 'command', 'shell', 'eval', 'system', 'passthru', 'base64'];
        suspiciousParams.forEach(function(p) {
          if (params.has(p)) {
            findings.push({ icon: '🐚', label: 'Suspicious Parameter: ' + p, detail: 'URL contains a "' + p + '" query parameter. This pattern is associated with web shells and command injection.', severity: 'critical' });
            riskLevel = 'critical';
          }
        });

        // Base64 in URL
        var fullUrl = url;
        if (fullUrl.match(/[A-Za-z0-9+/]{40,}={0,2}/)) {
          findings.push({ icon: '🔐', label: 'Possible Base64 Payload', detail: 'URL contains what appears to be Base64-encoded data. Attackers encode payloads in URLs to evade detection.', severity: 'high' });
          if (riskLevel !== 'critical') riskLevel = 'high';
        }
      }

      // Redirect patterns
      if (parsed.search && (parsed.search.indexOf('redirect=') !== -1 || parsed.search.indexOf('url=') !== -1 || parsed.search.indexOf('next=') !== -1 || parsed.search.indexOf('return=') !== -1)) {
        findings.push({ icon: '↪️', label: 'Redirect Parameter Detected', detail: 'URL contains a redirect parameter. This is commonly used in open redirect attacks to route victims from legitimate domains to phishing sites.', severity: 'high' });
      }

      // URL length
      if (url.length > 200) {
        findings.push({ icon: '📏', label: 'Very Long URL (' + url.length + ' chars)', detail: 'Extremely long URLs may be used to hide the real destination or embed encoded payloads.', severity: 'medium' });
      }

    } catch(e) {
      findings.push({ icon: '⚠️', label: 'Invalid URL Format', detail: 'Could not parse this URL. It may be malformed or obfuscated.', severity: 'medium' });
    }

    priority.push({ name: 'VirusTotal', reason: 'Scan this URL across 70+ security engines for known threats' });
    priority.push({ name: 'URLhaus', reason: 'Check if this URL is actively distributing malware' });
    priority.push({ name: 'URLScan.io', reason: 'Get a safe screenshot and detailed page analysis' });

    return { findings: findings, riskLevel: riskLevel, priority: priority };
  }

  function analyzeEmail(email) {
    var findings = [];
    var priority = [];
    var riskLevel = 'medium';
    var parts = email.split('@');
    var localPart = parts[0];
    var emailDomain = parts[1].toLowerCase();

    // Disposable email check
    if (DISPOSABLE_EMAIL_DOMAINS.indexOf(emailDomain) !== -1) {
      findings.push({ icon: '🗑️', label: 'Disposable Email Provider', detail: emailDomain + ' is a known throwaway email service. Accounts using disposable emails are highly suspicious — likely created for spam, fraud, or anonymous abuse.', severity: 'high' });
      riskLevel = 'high';
    }

    // Well-known provider
    var knownProviders = { 'gmail.com': 'Google Gmail', 'outlook.com': 'Microsoft Outlook', 'hotmail.com': 'Microsoft Hotmail', 'yahoo.com': 'Yahoo Mail', 'proton.me': 'Proton Mail (encrypted)', 'protonmail.com': 'Proton Mail (encrypted)', 'tutanota.com': 'Tutanota (encrypted)', 'icloud.com': 'Apple iCloud' };
    if (knownProviders[emailDomain]) {
      findings.push({ icon: '📧', label: 'Provider: ' + knownProviders[emailDomain], detail: 'This email uses ' + knownProviders[emailDomain] + '. ' + (emailDomain === 'proton.me' || emailDomain === 'protonmail.com' || emailDomain === 'tutanota.com' ? 'Encrypted email providers are preferred by both privacy-conscious users AND threat actors.' : 'Mainstream provider — difficult to trace sender identity without legal process.'), severity: 'info' });
    } else {
      // Corporate/custom domain
      var domainAnalysis = analyzeDomain(emailDomain);
      if (domainAnalysis.findings.length > 0) {
        findings.push({ icon: '🏢', label: 'Custom Domain: ' + emailDomain, detail: 'This email uses a custom domain. Check the domain reputation below — if the domain is malicious, all emails from it should be blocked.', severity: 'medium' });
        findings = findings.concat(domainAnalysis.findings);
      }
    }

    // Local part patterns
    if (localPart.match(/^(admin|root|info|support|help|noreply|no-reply|postmaster|webmaster|abuse|security)$/i)) {
      findings.push({ icon: '👤', label: 'Generic Account Name', detail: '"' + localPart + '" is a common role-based email. Attackers impersonate these addresses in phishing campaigns (e.g., "security@yourbank.com").', severity: 'medium' });
    }

    if (localPart.length > 30 || calcEntropy(localPart) > 3.5) {
      findings.push({ icon: '🤖', label: 'Possibly Auto-generated', detail: 'The local part "' + localPart + '" appears random or auto-generated. This pattern is common in bot-created accounts and spam operations.', severity: 'high' });
      riskLevel = 'high';
    }

    priority.push({ name: 'Have I Been Pwned', reason: 'Check which data breaches contain this exact email' });
    priority.push({ name: 'EmailRep', reason: 'Get reputation score — account age, social profiles, breach history' });
    priority.push({ name: 'Hunter.io', reason: 'Verify if this email is deliverable and discover associated accounts' });

    return { findings: findings, riskLevel: riskLevel, priority: priority };
  }

  // Main analysis dispatcher
  function analyzeIOC(ioc) {
    switch (ioc.lookup) {
      case 'ip': return analyzeIP(ioc.raw);
      case 'domain': return analyzeDomain(ioc.raw);
      case 'hash': return analyzeHash(ioc.type, ioc.raw);
      case 'url': return analyzeURL(ioc.raw);
      case 'email': return analyzeEmail(ioc.raw);
      default: return { findings: [], riskLevel: 'medium', priority: [] };
    }
  }

  var RISK_LABELS = {
    critical: { text: 'CRITICAL RISK', color: '#ff2d2d', bg: 'rgba(255,45,45,.12)' },
    high:     { text: 'HIGH RISK', color: '#ff8c00', bg: 'rgba(255,140,0,.12)' },
    medium:   { text: 'MEDIUM RISK', color: '#ffd700', bg: 'rgba(255,215,0,.10)' },
    low:      { text: 'LOW RISK', color: '#00ff87', bg: 'rgba(0,255,135,.10)' },
    info:     { text: 'INFORMATIONAL', color: '#7aa2f7', bg: 'rgba(122,162,247,.10)' }
  };

  var SEVERITY_COLORS = {
    critical: '#ff2d2d', high: '#ff8c00', medium: '#ffd700', low: '#00ff87', info: '#7aa2f7'
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
    if (PATTERNS.domain.test(val) && !FILE_EXTENSIONS.test(val)) return { raw: val, type: 'domain', lookup: 'domain' };

    return null;
  }

  /* ── Parse input ── */
  function parseInput(text) {
    var tokens = text.split(/[\n\r,;\t ]+/).map(function (t) { return refang(t.trim()); }).filter(Boolean);
    var seen = {};
    var results = [];
    var dupes = 0;
    var unrecognized = 0;

    tokens.forEach(function (token) {
      var info = detectType(token);
      if (!info) { unrecognized++; return; }
      var key = info.raw.toLowerCase();
      if (seen[key]) { dupes++; return; }
      seen[key] = true;
      results.push(info);
    });

    return { iocs: results, dupes: dupes, total: results.length + dupes, recognized: results.length, unrecognized: unrecognized };
  }

  /* ── Build lookup links ── */
  function buildLinks(ioc) {
    var sources = window.IOC_SOURCES || [];
    var links = [];
    sources.forEach(function (src) {
      if (src.types.indexOf(ioc.lookup) === -1) return;
      var template = src.urls[ioc.lookup];
      if (!template) return;
      /* Email: use raw value for path-based URLs (e.g. emailrep.io/user@x.com).
         The email regex already blocks dangerous chars (", <, >, spaces). */
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
    document.getElementById('iocTotalCount').textContent = parsed.recognized;
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

    /* IOC cards — focused: threat assessment + priority sources only */
    var html = '';
    var allNonPriorityLinks = {}; // keyed by source name to deduplicate
    parsed.iocs.forEach(function (ioc) {
      var display = shouldDefang ? defang(ioc.raw, ioc.lookup) : ioc.raw;
      var links = buildLinks(ioc);
      var badgeClass = TYPE_BADGE[ioc.lookup] || 'vault';
      var typeLabel = ioc.type.toUpperCase();
      var analysis = analyzeIOC(ioc);
      var risk = RISK_LABELS[analysis.riskLevel] || RISK_LABELS.medium;

      html += '<div class="ioc-card" data-type="' + ioc.lookup + '">';

      /* ── Header: type + value + risk level ── */
      html += '<div class="ioc-card__header">';
      html += '  <div class="ioc-card__type-row">';
      html += '    <span class="ioc-card__type-icon">' + (TYPE_ICONS[ioc.lookup] || '') + '</span>';
      html += '    <span class="badge badge--' + badgeClass + '">' + typeLabel + '</span>';
      html += '    <span class="ioc-card__label">' + (TYPE_LABELS[ioc.lookup] || ioc.lookup) + '</span>';
      html += '    <span class="ioc-card__risk-badge" style="background:' + risk.bg + ';color:' + risk.color + ';border:1px solid ' + risk.color + '">' + risk.text + '</span>';
      html += '  </div>';
      html += '  <code class="ioc-card__value">' + escapeHtml(display) + '</code>';
      html += '</div>';

      /* ── Smart analysis findings ── */
      if (analysis.findings.length > 0) {
        html += '<div class="ioc-card__analysis">';
        html += '  <div class="ioc-card__section-title">' + (typeof scwIcon === 'function' ? scwIcon('crosshair') : '') + ' Threat Assessment</div>';
        analysis.findings.forEach(function (f) {
          var sColor = SEVERITY_COLORS[f.severity] || SEVERITY_COLORS.info;
          html += '<div class="ioc-finding" style="border-left:3px solid ' + sColor + '">';
          html += '  <div class="ioc-finding__header"><span class="ioc-finding__icon">' + f.icon + '</span><strong>' + escapeHtml(f.label) + '</strong></div>';
          html += '  <p class="ioc-finding__detail">' + escapeHtml(f.detail) + '</p>';
          html += '</div>';
        });
        html += '</div>';
      }

      /* ── Priority sources — "Start here" (max 3) ── */
      if (analysis.priority.length > 0) {
        html += '<div class="ioc-card__priority">';
        html += '  <div class="ioc-card__section-title">' + (typeof scwIcon === 'function' ? scwIcon('zap') : '') + ' Start Investigation Here</div>';
        analysis.priority.forEach(function (p) {
          var matchedLink = links.find(function(l) { return l.name === p.name; });
          if (matchedLink) {
            html += '<a href="' + escapeAttr(matchedLink.href) + '" target="_blank" rel="noopener noreferrer" class="ioc-priority-link">';
            html += '  <div class="ioc-priority-link__header">';
            html += '    <span class="ioc-priority-link__icon">' + matchedLink.icon + '</span>';
            html += '    <strong>' + escapeHtml(p.name) + '</strong>';
            html += '    <span class="ioc-priority-link__badge">RECOMMENDED</span>';
            html += '    <span class="ioc-link__arrow">↗</span>';
            html += '  </div>';
            html += '  <p class="ioc-priority-link__reason">' + escapeHtml(p.reason) + '</p>';
            html += '</a>';
          }
        });
        html += '</div>';
      }

      /* Collect non-priority links for consolidated section */
      var priorityNames = analysis.priority.map(function(p) { return p.name; });
      links.forEach(function(l) {
        if (priorityNames.indexOf(l.name) === -1 && !allNonPriorityLinks[l.name]) {
          allNonPriorityLinks[l.name] = l;
        }
      });

      html += '</div>'; // end ioc-card
    });

    /* ── Consolidated: Additional Sources (once at bottom) ── */
    var extraLinks = Object.keys(allNonPriorityLinks).map(function(k) { return allNonPriorityLinks[k]; });
    if (extraLinks.length > 0) {
      html += '<div class="ioc-consolidated">';
      html += '  <div class="ioc-card__section-title">' + (typeof scwIcon === 'function' ? scwIcon('search') : '') + ' All Investigation Sources (' + extraLinks.length + ')</div>';
      html += '  <div class="ioc-card__links ioc-card__links--grid">';
      extraLinks.forEach(function (l) {
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
      html += '  </div>';
      html += '</div>';
    }

    /* ── Consolidated: Product recommendations (once at bottom) ── */
    var allTypes = Object.keys(types);
    var recs = (window.IOC_TOOL_RECS || []).filter(function (r) {
      return allTypes.some(function(t) { return r.types.indexOf(t) !== -1; });
    });
    if (recs.length > 0) {
      html += '<div class="ioc-consolidated ioc-consolidated--recs">';
      html += '  <div class="ioc-card__recs-title">' + (typeof scwIcon === 'function' ? scwIcon('shield') : '') + ' Protect Yourself</div>';
      recs.forEach(function (r) {
        html += '<a href="' + escapeAttr(r.url) + '" target="_blank" rel="noopener noreferrer" class="ioc-rec">';
        html += '  <div class="ioc-rec__header">';
        html += '    <strong class="ioc-rec__name">' + escapeHtml(r.name) + '</strong>';
        if (r.badge) html += '    <span class="ioc-rec__badge">' + escapeHtml(r.badge) + '</span>';
        html += '  </div>';
        html += '  <p class="ioc-rec__desc">' + escapeHtml(r.desc) + '</p>';
        html += '</a>';
      });
      html += '</div>';
    }

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

  /* ── CSV Escape (prevent formula injection) ── */
  function csvEscape(val) {
    if (!val) return '';
    var s = String(val);
    if (/[,"\n\r]/.test(s) || /^[=+\-@\t\r]/.test(s)) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  }

  /* ── Export ── */
  function exportCsv() {
    if (!window._iocParsed) return;
    var rows = ['Type,SubType,Value,Defanged,Sources'];
    window._iocParsed.iocs.forEach(function (ioc) {
      var links = buildLinks(ioc);
      var sourceNames = links.map(function(l) { return l.name; }).join('; ');
      rows.push([csvEscape(ioc.lookup), csvEscape(ioc.type), csvEscape(ioc.raw), csvEscape(defang(ioc.raw, ioc.lookup)), csvEscape(sourceNames)].join(','));
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
      btn.innerHTML = (typeof scwIcon === 'function' ? scwIcon('check') : '') + ' Copied!';
      setTimeout(function () { btn.innerHTML = (typeof scwIcon === 'function' ? scwIcon('clipboard') : '') + ' Copy All'; }, 1500);
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
      /* Auto-select input text so user can immediately type a new query */
      input.select();
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
