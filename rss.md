---
layout: page
title: RSS Feed
permalink: /rss/
---

<div class="rss-page">

<div class="rss-hero">
  <div class="rss-hero__icon" data-icon="radar"></div>
  <h1 class="rss-hero__title">Subscribe via RSS</h1>
  <p class="rss-hero__desc">Get every SCW post delivered to your favorite feed reader — no algorithms, no missed updates.</p>
</div>

<div class="rss-feed-url">
  <label class="rss-feed-url__label">Feed URL</label>
  <div class="rss-feed-url__row">
    <input type="text" id="rssFeedUrl" class="rss-feed-url__input" value="{{ '/feed.xml' | absolute_url }}" readonly>
    <button id="rssCopyBtn" class="btn btn--primary rss-feed-url__btn" onclick="navigator.clipboard.writeText(document.getElementById('rssFeedUrl').value).then(function(){var b=document.getElementById('rssCopyBtn');b.textContent='Copied!';setTimeout(function(){b.textContent='Copy URL'},1500)})">Copy URL</button>
  </div>
</div>

<div class="rss-readers">
  <h2 class="rss-readers__title">Open in a feed reader</h2>
  <div class="rss-readers__grid">
    <a href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fshimiscyberworld.com%2Ffeed.xml" target="_blank" rel="noopener noreferrer" class="rss-reader-card">
      <span class="rss-reader-card__icon" style="color:#34d399;">&#9679;</span>
      <strong>Feedly</strong>
      <span>Most popular feed reader</span>
    </a>
    <a href="https://www.inoreader.com/?add_feed={{ '/feed.xml' | absolute_url | url_encode }}" target="_blank" rel="noopener noreferrer" class="rss-reader-card">
      <span class="rss-reader-card__icon" style="color:#3b82f6;">&#9679;</span>
      <strong>Inoreader</strong>
      <span>Power-user features</span>
    </a>
    <a href="https://newsblur.com/?url={{ '/feed.xml' | absolute_url | url_encode }}" target="_blank" rel="noopener noreferrer" class="rss-reader-card">
      <span class="rss-reader-card__icon" style="color:#eab308;">&#9679;</span>
      <strong>NewsBlur</strong>
      <span>Open source reader</span>
    </a>
    <a href="{{ '/feed.xml' | absolute_url }}" class="rss-reader-card">
      <span class="rss-reader-card__icon" data-icon="file"></span>
      <strong>Raw Feed</strong>
      <span>Copy URL into any reader</span>
    </a>
  </div>
</div>

<div class="rss-what">
  <h2 class="rss-what__title">What is RSS?</h2>
  <p>RSS lets you subscribe to websites and get new posts delivered automatically — like email, but without the spam. You choose a feed reader app, add our feed URL, and every new SCW post appears there instantly.</p>
  <p><strong>No account needed on our site. No tracking. No algorithms deciding what you see.</strong></p>
</div>

<div class="rss-also">
  <h2 class="rss-also__title">Other ways to follow SCW</h2>
  <div class="rss-also__grid">
    <a href="https://t.me/shimiscyberworld" target="_blank" rel="noopener" class="rss-also__link rss-also__link--telegram">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0 12 12 0 0 0 11.944 0Zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
      Telegram Channel
    </a>
    <a href="https://www.linkedin.com/company/112773961" target="_blank" rel="noopener" class="rss-also__link rss-also__link--linkedin">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      LinkedIn
    </a>
    <a href="#newsletter" class="rss-also__link rss-also__link--email">
      <svg class="scw-icon" style="width:14px;height:14px;vertical-align:-1px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Email Newsletter
    </a>
  </div>
</div>

<!-- ── Schema Documentation ── -->
<div id="schema" class="rss-schema">
  <h2 class="rss-schema__title">Feed Schema for Integrators</h2>
  <p class="rss-schema__desc">SCW uses the <code>scw:</code> XML namespace (<code>https://shimiscyberworld.com/ns/1.0</code>) to expose structured threat intelligence alongside standard Atom fields. All fields are consistent across post types.</p>

  <div class="rss-schema__section">
    <h3>Classification</h3>
    <table class="rss-schema__table">
      <tr><th>Element</th><th>Values</th><th>Always Present</th></tr>
      <tr><td><code>&lt;scw:severity&gt;</code></td><td>CRITICAL, HIGH, MEDIUM, LOW</td><td>Yes</td></tr>
      <tr><td><code>&lt;scw:cvss&gt;</code></td><td>Attributes: <code>score</code> (float), <code>severity</code>, <code>vector</code></td><td>NVD posts only</td></tr>
      <tr><td><code>&lt;scw:event_type&gt;</code></td><td>vulnerability, data-breach, ransomware, espionage, fraud, supply-chain, defacement, advisory, tool-release, research, other</td><td>Yes</td></tr>
      <tr><td><code>&lt;scw:section&gt;</code></td><td>vulnerabilities, live-feed</td><td>Yes</td></tr>
      <tr><td><code>&lt;scw:tlp&gt;</code></td><td>TLP:CLEAR (default), TLP:GREEN, TLP:AMBER</td><td>Yes</td></tr>
    </table>
  </div>

  <div class="rss-schema__section">
    <h3>Source Attribution</h3>
    <table class="rss-schema__table">
      <tr><th>Element</th><th>Attributes</th></tr>
      <tr><td><code>&lt;scw:source&gt;</code></td><td><code>name</code> — source name (e.g., "National Vulnerability Database", "Cyber Threat Intelligence")<br><code>channel</code> — feed channel identifier<br><code>url</code> — original source URL (if external)<br><code>telegram_url</code> — Telegram message link (if applicable)</td></tr>
    </table>
  </div>

  <div class="rss-schema__section">
    <h3>Vulnerability Data</h3>
    <table class="rss-schema__table">
      <tr><th>Element</th><th>Description</th></tr>
      <tr><td><code>&lt;scw:cwe&gt;</code></td><td>CWE weakness identifier (e.g., CWE-79, CWE-89). Multiple elements per entry.</td></tr>
    </table>
  </div>

  <div class="rss-schema__section">
    <h3>Entities</h3>
    <table class="rss-schema__table">
      <tr><th>Element</th><th>Attributes / Values</th></tr>
      <tr><td><code>&lt;scw:organization&gt;</code></td><td><code>name</code> — organization name<br><code>domain</code> — domain name (when known)<br><code>role</code> — <strong>victim</strong>, <strong>vendor</strong>, <strong>threat-actor</strong>, or <strong>other</strong></td></tr>
      <tr><td><code>&lt;scw:threat_actor&gt;</code></td><td>Named threat group (e.g., APT28, LockBit, Handala)</td></tr>
      <tr><td><code>&lt;scw:malware&gt;</code></td><td>Malware family name (e.g., BlackCat, QakBot)</td></tr>
      <tr><td><code>&lt;scw:country&gt;</code></td><td>ISO 3166-1 alpha-2 code (e.g., US, IL, CN)</td></tr>
    </table>
  </div>

  <div class="rss-schema__section">
    <h3>Indicators of Compromise</h3>
    <table class="rss-schema__table">
      <tr><th>Element</th><th>Attributes</th></tr>
      <tr><td><code>&lt;scw:ioc&gt;</code></td><td><code>type</code> — ipv4, ipv6, domain, url, md5, sha1, sha256, email, affected-product<br><code>indicator</code> — the IOC value</td></tr>
    </table>
    <p class="rss-schema__note">Note: Generic stub IOCs (CVE IDs and CWE IDs repeated as indicators) are excluded from the feed. Only actionable IOCs are emitted.</p>
  </div>

  <div class="rss-schema__section">
    <h3>MITRE ATT&CK</h3>
    <table class="rss-schema__table">
      <tr><th>Element</th><th>Attributes</th></tr>
      <tr><td><code>&lt;scw:mitre&gt;</code></td><td><code>id</code> — technique ID (e.g., T1190, T1059.001)<br><code>name</code> — technique name<br><code>tactic</code> — tactic name (e.g., Initial Access, Execution)</td></tr>
    </table>
  </div>

  <div class="rss-schema__section">
    <h3>Detection</h3>
    <table class="rss-schema__table">
      <tr><th>Element</th><th>Attributes</th></tr>
      <tr><td><code>&lt;scw:detection&gt;</code></td><td><code>rules</code> — total detection rule count<br><code>free</code> — number of free/open rules</td></tr>
    </table>
  </div>

  <div class="rss-schema__section">
    <h3>Tags (Atom <code>&lt;category&gt;</code>)</h3>
    <p>Standard Atom <code>&lt;category term="..."&gt;</code> elements. Tags follow a controlled vocabulary:</p>
    <table class="rss-schema__table">
      <tr><th>Category</th><th>Tags</th></tr>
      <tr><td>Severity</td><td><code>critical</code>, <code>high-severity</code>, <code>medium-severity</code></td></tr>
      <tr><td>Type</td><td><code>vulnerability</code>, <code>cve</code>, <code>malware</code>, <code>ransomware</code>, <code>data-breach</code>, <code>phishing</code>, <code>threat-intel</code></td></tr>
      <tr><td>Domain</td><td><code>cloud</code>, <code>microsoft</code>, <code>identity</code>, <code>ai-security</code>, <code>tools</code></td></tr>
      <tr><td>Weakness</td><td><code>cwe-79</code>, <code>cwe-89</code>, etc.</td></tr>
      <tr><td>Vendor</td><td>Slugified vendor names from affected products (e.g., <code>wordpress</code>, <code>cisco</code>)</td></tr>
    </table>
  </div>

  <div class="rss-schema__example">
    <h3>Example Entry</h3>
    <pre><code>&lt;entry&gt;
  &lt;title&gt;Critical RCE in Apache Struts&lt;/title&gt;
  &lt;published&gt;2026-04-16T08:00:00Z&lt;/published&gt;
  &lt;category term="vulnerability" /&gt;
  &lt;category term="cve" /&gt;
  &lt;category term="critical" /&gt;
  &lt;category term="cwe-94" /&gt;
  &lt;category term="apache" /&gt;
  &lt;scw:severity&gt;CRITICAL&lt;/scw:severity&gt;
  &lt;scw:cvss score="9.8" severity="CRITICAL" vector="CVSS:3.1/..." /&gt;
  &lt;scw:event_type&gt;vulnerability&lt;/scw:event_type&gt;
  &lt;scw:section&gt;vulnerabilities&lt;/scw:section&gt;
  &lt;scw:tlp&gt;TLP:CLEAR&lt;/scw:tlp&gt;
  &lt;scw:source name="National Vulnerability Database" channel="NVD" /&gt;
  &lt;scw:cwe&gt;CWE-94&lt;/scw:cwe&gt;
  &lt;scw:organization name="Apache" domain="apache.org" role="vendor" /&gt;
  &lt;scw:mitre id="T1190" name="Exploit Public-Facing Application" tactic="Initial Access" /&gt;
  &lt;scw:detection rules="3" free="1" /&gt;
&lt;/entry&gt;</code></pre>
  </div>
</div>

</div>

<style>
.rss-page { max-width: 640px; margin: 0 auto; }
.rss-hero { text-align: center; padding: 2rem 0 1.5rem; }
.rss-hero__icon { font-size: 3rem; margin-bottom: .5rem; display: block; }
.rss-hero__title { font-family: var(--f-display); font-size: 1.6rem; font-weight: 700; color: var(--white); margin: 0 0 .5rem; }
.rss-hero__desc { color: var(--gray); font-size: .9rem; margin: 0; }

.rss-feed-url { background: rgba(255,255,255,.04); border: 1px solid var(--border); border-radius: var(--r-md); padding: 1.2rem; margin-bottom: 1.5rem; }
.rss-feed-url__label { display: block; font-family: var(--f-mono); font-size: .65rem; letter-spacing: .1em; text-transform: uppercase; color: var(--dim); margin-bottom: .5rem; }
.rss-feed-url__row { display: flex; gap: .5rem; }
.rss-feed-url__input { flex: 1; background: rgba(0,0,0,.3); border: 1px solid var(--border); border-radius: var(--r-sm); padding: .5rem .75rem; color: var(--white); font-family: var(--f-mono); font-size: .8rem; outline: none; }
.rss-feed-url__btn { white-space: nowrap; }

.rss-readers { margin-bottom: 1.5rem; }
.rss-readers__title { font-family: var(--f-mono); font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; color: var(--dim); margin: 0 0 .8rem; }
.rss-readers__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: .75rem; }
.rss-reader-card { display: flex; flex-direction: column; gap: .2rem; padding: 1rem; background: rgba(255,255,255,.03); border: 1px solid var(--border); border-radius: var(--r-md); text-decoration: none; transition: border-color .15s, background .15s; }
.rss-reader-card:hover { border-color: var(--cyan); background: rgba(6,182,212,.05); }
.rss-reader-card__icon { font-size: 1.4rem; margin-bottom: .2rem; }
.rss-reader-card strong { color: var(--white); font-size: .9rem; }
.rss-reader-card span:last-child { color: var(--dim); font-size: .75rem; }

.rss-what { background: rgba(255,255,255,.03); border: 1px solid var(--border); border-radius: var(--r-md); padding: 1.2rem; margin-bottom: 1.5rem; }
.rss-what__title { font-family: var(--f-mono); font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; color: var(--dim); margin: 0 0 .6rem; }
.rss-what p { color: var(--gray); font-size: .85rem; line-height: 1.6; margin: 0 0 .6rem; }
.rss-what p:last-child { margin-bottom: 0; }

.rss-also { margin-bottom: 2rem; }
.rss-also__title { font-family: var(--f-mono); font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; color: var(--dim); margin: 0 0 .8rem; }
.rss-also__grid { display: flex; flex-wrap: wrap; gap: .6rem; }
.rss-also__link { display: inline-flex; align-items: center; gap: .5rem; padding: .5rem 1rem; border-radius: var(--r-sm); color: #fff; text-decoration: none; font-size: .85rem; font-weight: 500; transition: opacity .15s; }
.rss-also__link:hover { opacity: .85; color: #fff; }
.rss-also__link--telegram { background: #26a5e4; }
.rss-also__link--linkedin { background: #0a66c2; }
.rss-also__link--email { background: rgba(255,255,255,.1); color: var(--white); border: 1px solid var(--border); }

[data-theme="light"] .rss-hero__title { color: var(--fg); }
[data-theme="light"] .rss-feed-url { background: rgba(0,0,0,.02); }
[data-theme="light"] .rss-feed-url__input { background: #fff; color: var(--fg); }
[data-theme="light"] .rss-reader-card { background: rgba(0,0,0,.02); }
[data-theme="light"] .rss-reader-card strong { color: var(--fg); }
[data-theme="light"] .rss-what { background: rgba(0,0,0,.02); }
[data-theme="light"] .rss-also__link--email { background: rgba(0,0,0,.05); color: var(--fg); }

@media (max-width: 480px) {
  .rss-readers__grid { grid-template-columns: 1fr; }
  .rss-feed-url__row { flex-direction: column; }
}

.rss-schema { margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid var(--border); }
.rss-schema__title { font-family: var(--f-display); font-size: 1.2rem; font-weight: 700; color: var(--white); margin: 0 0 .5rem; }
.rss-schema__desc { color: var(--gray); font-size: .85rem; line-height: 1.6; margin: 0 0 1.5rem; }
.rss-schema__desc code { background: rgba(255,255,255,.06); padding: .15rem .4rem; border-radius: 3px; font-size: .78rem; }
.rss-schema__section { margin-bottom: 1.5rem; }
.rss-schema__section h3 { font-family: var(--f-mono); font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; color: var(--cyan); margin: 0 0 .6rem; }
.rss-schema__table { width: 100%; border-collapse: collapse; font-size: .8rem; }
.rss-schema__table th { text-align: left; padding: .5rem .6rem; background: rgba(255,255,255,.04); border: 1px solid var(--border); color: var(--dim); font-weight: 600; font-size: .72rem; text-transform: uppercase; letter-spacing: .05em; }
.rss-schema__table td { padding: .5rem .6rem; border: 1px solid var(--border); color: var(--gray); vertical-align: top; line-height: 1.5; }
.rss-schema__table td code { background: rgba(6,182,212,.08); color: var(--cyan); padding: .1rem .35rem; border-radius: 3px; font-size: .75rem; white-space: nowrap; }
.rss-schema__note { color: var(--dim); font-size: .75rem; font-style: italic; margin: .5rem 0 0; }
.rss-schema__example { margin-top: 1.5rem; }
.rss-schema__example h3 { font-family: var(--f-mono); font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; color: var(--cyan); margin: 0 0 .6rem; }
.rss-schema__example pre { background: rgba(0,0,0,.3); border: 1px solid var(--border); border-radius: var(--r-md); padding: 1rem; overflow-x: auto; }
.rss-schema__example code { color: var(--gray); font-size: .75rem; line-height: 1.7; }

[data-theme="light"] .rss-schema__title { color: var(--fg); }
[data-theme="light"] .rss-schema__table th { background: rgba(0,0,0,.03); }
[data-theme="light"] .rss-schema__table td code { background: rgba(6,182,212,.08); }
[data-theme="light"] .rss-schema__example pre { background: rgba(0,0,0,.03); }
</style>
