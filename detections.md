---
layout: page
title: Detection Vault
permalink: /detections/
---

{% comment %}── Compute breach intel rule count (posts > 14 days with sigma_rules, deduplicated) ──{% endcomment %}
{% assign vault_age_secs = 1209600 %}
{% assign now_epoch = site.time | date: '%s' | plus: 0 %}
{% assign vault_cutoff = now_epoch | minus: vault_age_secs %}
{% assign breach_intel_count = 0 %}
{% assign counted_titles = "" %}
{% for post in site.posts %}
  {% assign pe = post.date | date: '%s' | plus: 0 %}
  {% if post.sigma_rules and pe < vault_cutoff %}
    {% assign ctkey = post.sigma_rules.preview_title | downcase | strip %}
    {% assign ctcheck = "||" | append: ctkey | append: "||" %}
    {% unless counted_titles contains ctcheck %}
      {% assign counted_titles = counted_titles | append: ctcheck %}
      {% assign breach_intel_count = breach_intel_count | plus: 1 %}
    {% endunless %}
  {% endif %}
{% endfor %}
{% assign total_rules = site.data.detections.rules | size | plus: breach_intel_count %}

<div class="page-head">
  <div class="label label--cyan page-head__label">SCW TOOLS</div>
  <h1 class="page-head__title">Detection Vault</h1>
  <p class="page-head__desc">Production-ready detection rules for real SOC environments. KQL, Sigma, Splunk, and Wazuh — mapped to MITRE ATT&CK. Copy, paste, detect.</p>
</div>

<section class="cs-intro reveal">
  <p>Every rule in this library is <strong>battle-tested</strong>. Written by security operators, validated in production environments, and mapped to MITRE ATT&CK techniques. All rules are <strong>free and open</strong> — use them in your SIEM today.</p>
  <div class="cs-intro__actions">
    <a href="#rules" class="btn btn--primary">Browse Rules</a>
    <a href="{{ '/playbooks/' | relative_url }}" class="btn btn--ghost">WarRoom →</a>
  </div>
</section>

<!-- Breach-specific CTA -->
<section class="cs-cta reveal" style="margin: 2rem 0;">
  <div class="cs-cta__box" style="background: linear-gradient(135deg, var(--bg-card) 0%, rgba(0,200,255,0.05) 100%); border-left: 3px solid var(--accent);">
    <h3 style="margin-top:0;">🛡️ Need rules for a specific breach?</h3>
    <p>The rules below are generic detection patterns. Our Intel Bot generates <strong>Sigma rules tailored to real breaches</strong> — mapped to the exact ATT&CK techniques observed in each incident. Pick your SIEM and get a ready-to-paste query.</p>
    <div class="cs-cta__actions">
      <a href="https://t.me/Shimiscyberworldbot?start=detect" class="btn btn--accent btn--sm" target="_blank" rel="noopener">Generate Breach Rules →</a>
      <span style="color: var(--text-muted); font-size: 0.85rem;">Free: 1 rule per breach · Full pack: 250 ⭐ · Included with Pro/Elite</span>
    </div>
  </div>
</section>

<!-- SIEM Export Showcase — trust-building samples -->
<section class="cs-showcase reveal" id="showcase">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--signal">PREVIEW</span> &nbsp;See What You Get — Full SIEM Export</h2>
  </div>
  <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Every breach on this site gets auto-generated detection rules exported to <strong>6 SIEM formats</strong>. Below are two real production-ready rules — <strong>copy any format</strong> directly into your SIEM.</p>

  <div class="showcase-rules">
    <!-- Sample Rule 1: PowerShell Download Cradle -->
    <div class="showcase-rule">
      <div class="showcase-rule__header">
        <h4 style="margin:0;">Suspicious PowerShell Download Cradle</h4>
        <div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;">
          <span class="badge badge--signal">high</span>
          <span class="sigma-technique">T1059.001 · T1105</span>
        </div>
      </div>
      <div class="showcase-tabs">
        <button class="showcase-tab active" data-fmt="sigma">Sigma</button>
        <button class="showcase-tab" data-fmt="splunk">Splunk SPL</button>
        <button class="showcase-tab" data-fmt="kql">Sentinel KQL</button>
        <button class="showcase-tab" data-fmt="elastic">Elastic</button>
        <button class="showcase-tab" data-fmt="qradar">QRadar AQL</button>
        <button class="showcase-tab" data-fmt="wazuh">Wazuh XML</button>
      </div>
      <div class="showcase-panels">
        <div class="showcase-panel active" data-fmt="sigma">
          <button class="dl-copy-btn" title="Copy"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code>title: Suspicious PowerShell Download Cradle
status: stable
level: high
description: Detects PowerShell download cradles used in malware delivery
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    Image|endswith: '\powershell.exe'
    CommandLine|contains:
      - 'Invoke-WebRequest'
      - 'Net.WebClient'
      - 'DownloadString'
      - 'DownloadFile'
      - 'Start-BitsTransfer'
  condition: selection
tags:
  - attack.execution
  - attack.t1059.001
  - attack.t1105</code></pre>
        </div>
        <div class="showcase-panel" data-fmt="splunk">
          <button class="dl-copy-btn" title="Copy"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code>index=windows sourcetype=sysmon EventCode=1
  Image="*\\powershell.exe"
  (CommandLine="*Invoke-WebRequest*"
   OR CommandLine="*Net.WebClient*"
   OR CommandLine="*DownloadString*"
   OR CommandLine="*DownloadFile*"
   OR CommandLine="*Start-BitsTransfer*")
| table _time host user Image CommandLine</code></pre>
        </div>
        <div class="showcase-panel" data-fmt="kql">
          <button class="dl-copy-btn" title="Copy"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code>DeviceProcessEvents
| where FileName =~ "powershell.exe"
| where ProcessCommandLine has_any (
    "Invoke-WebRequest", "Net.WebClient",
    "DownloadString", "DownloadFile",
    "Start-BitsTransfer")
| project Timestamp, DeviceName, AccountName,
    ProcessCommandLine</code></pre>
        </div>
        <div class="showcase-panel" data-fmt="elastic">
          <button class="dl-copy-btn" title="Copy"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code>process.executable:*\\powershell.exe AND
process.command_line:(
  *Invoke-WebRequest* OR *Net.WebClient* OR
  *DownloadString* OR *DownloadFile* OR
  *Start-BitsTransfer*)</code></pre>
        </div>
        <div class="showcase-panel" data-fmt="qradar">
          <button class="dl-copy-btn" title="Copy"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code>SELECT DATEFORMAT(starttime,'yyyy-MM-dd HH:mm') AS date,
  sourceip, "Image", "CommandLine"
FROM events
WHERE "Image" ILIKE '%\powershell.exe'
  AND ("CommandLine" ILIKE '%Invoke-WebRequest%'
   OR "CommandLine" ILIKE '%Net.WebClient%'
   OR "CommandLine" ILIKE '%DownloadString%'
   OR "CommandLine" ILIKE '%DownloadFile%'
   OR "CommandLine" ILIKE '%Start-BitsTransfer%')</code></pre>
        </div>
        <div class="showcase-panel" data-fmt="wazuh">
          <button class="dl-copy-btn" title="Copy"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code>&lt;rule id="100200" level="12"&gt;
  &lt;if_group&gt;sysmon_event1&lt;/if_group&gt;
  &lt;field name="win.eventdata.image" type="pcre2"&gt;
    (?i)\\powershell\.exe$&lt;/field&gt;
  &lt;field name="win.eventdata.commandLine" type="pcre2"&gt;
    (?i)(Invoke-WebRequest|Net\.WebClient|DownloadString|DownloadFile|Start-BitsTransfer)&lt;/field&gt;
  &lt;description&gt;Suspicious PowerShell Download Cradle&lt;/description&gt;
  &lt;mitre&gt;
    &lt;id&gt;T1059.001&lt;/id&gt;
    &lt;id&gt;T1105&lt;/id&gt;
  &lt;/mitre&gt;
  &lt;group&gt;sysmon,process_creation,&lt;/group&gt;
&lt;/rule&gt;</code></pre>
        </div>
      </div>
    </div>

    <!-- Sample Rule 2: LSASS Credential Dumping -->
    <div class="showcase-rule">
      <div class="showcase-rule__header">
        <h4 style="margin:0;">LSASS Memory Access — Credential Dumping</h4>
        <div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;">
          <span class="badge badge--live">critical</span>
          <span class="sigma-technique">T1003.001</span>
        </div>
      </div>
      <div class="showcase-tabs">
        <button class="showcase-tab active" data-fmt="sigma">Sigma</button>
        <button class="showcase-tab" data-fmt="splunk">Splunk SPL</button>
        <button class="showcase-tab" data-fmt="kql">Sentinel KQL</button>
        <button class="showcase-tab" data-fmt="elastic">Elastic</button>
        <button class="showcase-tab" data-fmt="qradar">QRadar AQL</button>
        <button class="showcase-tab" data-fmt="wazuh">Wazuh XML</button>
      </div>
      <div class="showcase-panels">
        <div class="showcase-panel active" data-fmt="sigma">
          <button class="dl-copy-btn" title="Copy"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code>title: LSASS Memory Access — Credential Dumping
status: stable
level: critical
description: Detects suspicious access to LSASS process memory
logsource:
  category: process_access
  product: windows
detection:
  selection:
    TargetImage|endswith: '\lsass.exe'
    GrantedAccess|contains:
      - '0x1010'
      - '0x1038'
      - '0x1fffff'
  filter:
    SourceImage|endswith:
      - '\wmiprvse.exe'
      - '\taskmgr.exe'
      - '\MsMpEng.exe'
  condition: selection and not filter
tags:
  - attack.credential_access
  - attack.t1003.001</code></pre>
        </div>
        <div class="showcase-panel" data-fmt="splunk">
          <button class="dl-copy-btn" title="Copy"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code>index=windows sourcetype=sysmon EventCode=10
  TargetImage="*\\lsass.exe"
  (GrantedAccess="0x1010" OR GrantedAccess="0x1038"
   OR GrantedAccess="0x1fffff")
  NOT (SourceImage="*\\wmiprvse.exe"
   OR SourceImage="*\\taskmgr.exe"
   OR SourceImage="*\\MsMpEng.exe")
| table _time host user SourceImage GrantedAccess</code></pre>
        </div>
        <div class="showcase-panel" data-fmt="kql">
          <button class="dl-copy-btn" title="Copy"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code>DeviceEvents
| where ActionType == "OpenProcessApiCall"
| where FileName =~ "lsass.exe"
| where InitiatingProcessFileName !in~
    ("wmiprvse.exe","taskmgr.exe","MsMpEng.exe")
| project Timestamp, DeviceName,
    InitiatingProcessFileName,
    InitiatingProcessCommandLine</code></pre>
        </div>
        <div class="showcase-panel" data-fmt="elastic">
          <button class="dl-copy-btn" title="Copy"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code>winlog.event_data.TargetImage:*\\lsass.exe AND
winlog.event_data.GrantedAccess:(
  "0x1010" OR "0x1038" OR "0x1fffff")
AND NOT process.executable:(
  *\\wmiprvse.exe OR *\\taskmgr.exe
  OR *\\MsMpEng.exe)</code></pre>
        </div>
        <div class="showcase-panel" data-fmt="qradar">
          <button class="dl-copy-btn" title="Copy"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code>SELECT DATEFORMAT(starttime,'yyyy-MM-dd HH:mm') AS date,
  sourceip, "SourceImage", "TargetImage", "GrantedAccess"
FROM events
WHERE "TargetImage" ILIKE '%\lsass.exe'
  AND "GrantedAccess" IN ('0x1010','0x1038','0x1fffff')
  AND "SourceImage" NOT ILIKE '%\wmiprvse.exe'
  AND "SourceImage" NOT ILIKE '%\taskmgr.exe'
  AND "SourceImage" NOT ILIKE '%\MsMpEng.exe'</code></pre>
        </div>
        <div class="showcase-panel" data-fmt="wazuh">
          <button class="dl-copy-btn" title="Copy"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code>&lt;rule id="100201" level="14"&gt;
  &lt;if_group&gt;sysmon_event10&lt;/if_group&gt;
  &lt;field name="win.eventdata.targetImage" type="pcre2"&gt;
    (?i)\\lsass\.exe$&lt;/field&gt;
  &lt;field name="win.eventdata.grantedAccess" type="pcre2"&gt;
    (0x1010|0x1038|0x1fffff)&lt;/field&gt;
  &lt;description&gt;LSASS Memory Access — Credential Dumping&lt;/description&gt;
  &lt;mitre&gt;
    &lt;id&gt;T1003.001&lt;/id&gt;
  &lt;/mitre&gt;
  &lt;group&gt;sysmon,credential_access,&lt;/group&gt;
&lt;/rule&gt;</code></pre>
        </div>
      </div>
    </div>
  </div>

  <!-- Bot CTA after showcase -->
  <div class="cs-cta__box" style="background: linear-gradient(135deg, var(--bg-card) 0%, rgba(0,200,255,0.05) 100%); border-left: 3px solid var(--accent); margin-top: 1.5rem; padding: 1.25rem 1.5rem;">
    <h3 style="margin-top:0;">🔎 Get this for every breach — automatically</h3>
    <p style="margin-bottom:0.75rem;">The Intel Bot generates detection rules for <strong>every breach we track</strong> and converts them to all 6 SIEM formats instantly. Type <code>/detect</code> to get started.</p>
    <div class="cs-cta__actions">
      <a href="https://t.me/Shimiscyberworldbot?start=detect" class="btn btn--accent btn--sm" target="_blank" rel="noopener">Open Intel Bot →</a>
      <span style="color: var(--text-muted); font-size: 0.85rem;">Free: Sigma YAML · Full SIEM pack: 250 ⭐ · Included with Pro/Elite</span>
    </div>
  </div>
</section>

<hr class="section-break">

<!-- Stats bar -->
<section class="dl-stats reveal">
  <div class="dl-stats__grid">
    <div class="dl-stat">
      <span class="dl-stat__number">{{ total_rules }}</span>
      <span class="dl-stat__label">Detection Rules</span>
    </div>
    <div class="dl-stat">
      <span class="dl-stat__number">{{ site.data.detections.platforms | size }}</span>
      <span class="dl-stat__label">Platforms</span>
    </div>
    <div class="dl-stat">
      <span class="dl-stat__number">{{ site.data.detections.categories | size }}</span>
      <span class="dl-stat__label">ATT&CK Categories</span>
    </div>
  </div>
</section>

<hr class="section-break">

<!-- Search & Filter -->
<section id="rules">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--cyan">RULES</span> &nbsp;Detection Rules</h2>
  </div>

  <div class="vault-controls">
    <div class="vault-search">
      <svg class="vault-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="text" id="dlSearch" class="vault-search__input" placeholder="Search rules, techniques, or keywords..." autocomplete="off">
      <span id="dlCount" class="vault-search__count">{{ site.data.detections.rules | size }}</span>
    </div>
    <div class="vault-filters" id="dlCategoryFilters">
      <button class="vault-filter active" data-filter="all">All</button>
      {% for cat in site.data.detections.categories %}
      <button class="vault-filter" data-filter="{{ cat | slugify }}">{{ cat }}</button>
      {% endfor %}
    </div>
    <div class="vault-filters dl-platform-filters" id="dlPlatformFilters">
      <button class="vault-filter active" data-filter="all">All Platforms</button>
      {% for plat in site.data.detections.platforms %}
      <button class="vault-filter" data-filter="{{ plat | slugify }}">{{ plat }}</button>
      {% endfor %}
    </div>
  </div>

  <!-- Rules Grid -->
  <div class="toolkit__grid" id="dlGrid">
    {% for rule in site.data.detections.rules %}
    <div class="tool-card dl-rule reveal" data-category="{{ rule.category | slugify }}" data-platform="{{ rule.platform | slugify }}" data-name="{{ rule.name | downcase }}" data-tags="{{ rule.tags | join: ' ' | downcase }}" data-mitre="{{ rule.mitre | downcase }}">
      <div class="tool-card__head">
        <h4>{{ rule.name }}</h4>
      </div>
      <p class="community-card__tagline">{{ rule.mitre }} — {{ rule.mitre_name }}</p>
      <p>{{ rule.description }}</p>
      <div class="dl-rule__meta">
        <span class="badge badge--{% if rule.severity == 'critical' %}live{% elsif rule.severity == 'high' %}signal{% elsif rule.severity == 'medium' %}drop{% else %}vault{% endif %}">{{ rule.severity }}</span>
        <span class="tag">{{ rule.platform }}</span>
      </div>
      {% if rule.tags %}
      <div class="tool-card__tags">
        {% for tag in rule.tags %}<span class="tag">{{ tag }}</span>{% endfor %}
      </div>
      {% endif %}

      <div class="dl-rule__code">
        <button class="dl-copy-btn" title="Copy to clipboard"><span class="scw-icon" data-icon="clipboard"></span></button>
        <pre><code>{{ rule.query | strip | xml_escape }}</code></pre>
      </div>

      {% if rule.notes %}
      <p class="dl-rule__notes"><strong><span class="scw-icon" data-icon="zap"></span> Note:</strong> {{ rule.notes }}</p>
      {% endif %}
    </div>
    {% endfor %}

    {% comment %}── Breach Intel Rules (auto-generated, 14+ days old, deduplicated) ──{% endcomment %}
    {% assign seen_titles = "" %}
    {% assign unique_breach_count = 0 %}
    {% for post in site.posts %}
      {% assign pe = post.date | date: '%s' | plus: 0 %}
      {% if post.sigma_rules and pe < vault_cutoff %}
        {% assign rule_key = post.sigma_rules.preview_title | downcase | strip %}
        {% assign rule_check = "||" | append: rule_key | append: "||" %}
        {% unless seen_titles contains rule_check %}
          {% assign seen_titles = seen_titles | append: rule_check %}
          {% assign unique_breach_count = unique_breach_count | plus: 1 %}
      {% assign sev = post.sigma_rules.preview_level | default: 'medium' %}
      <div class="tool-card dl-rule dl-rule--breach reveal"
           data-category="{{ post.sigma_rules.preview_tactic | slugify }}"
           data-platform="multi-siem"
           data-name="{{ post.sigma_rules.preview_title | downcase }}"
           data-tags="{{ post.tags | join: ' ' | downcase }}"
           data-mitre="{{ post.sigma_rules.preview_technique | downcase }}"
           {% if post.sigma_rules.formats %}
           data-fmt-sigma="{{ post.sigma_rules.formats.sigma }}"
           {% elsif post.sigma_rules.preview_yaml_b64 %}
           data-fmt-sigma="{{ post.sigma_rules.preview_yaml_b64 }}"
           {% endif %}>
        <div class="tool-card__head">
          <h4>{{ post.sigma_rules.preview_title }}</h4>
          <span class="dl-breach-badge">Breach Intel</span>
        </div>
        <p class="community-card__tagline">{{ post.sigma_rules.preview_technique }} — {{ post.sigma_rules.preview_tactic }}</p>
        <p>Auto-generated from <a href="{{ post.url | relative_url }}">{{ post.title | truncate: 60 }}</a></p>
        <div class="dl-rule__meta">
          <span class="badge badge--{% if sev == 'critical' %}live{% elsif sev == 'high' %}signal{% elsif sev == 'medium' %}drop{% else %}vault{% endif %}">{{ sev }}</span>
          <span class="tag">Sigma</span>
          <span class="tag">{{ post.date | date: "%b %d, %Y" }}</span>
        </div>
        {% if post.sigma_rules.formats or post.sigma_rules.preview_yaml_b64 %}
        <div class="dl-rule__code">
          <button class="dl-copy-btn" title="Copy to clipboard"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code class="dl-siem-code"></code></pre>
        </div>
        {% endif %}
        <div class="sigma-siem-locked sigma-siem-locked--vault">
          <span class="sigma-gated__chip sigma-gated__chip--free">✓ Sigma</span>
          <span class="sigma-gated__chip sigma-gated__chip--locked">🔒 Splunk SPL</span>
          <span class="sigma-gated__chip sigma-gated__chip--locked">🔒 Sentinel KQL</span>
          <span class="sigma-gated__chip sigma-gated__chip--locked">🔒 Elastic</span>
          <span class="sigma-gated__chip sigma-gated__chip--locked">🔒 QRadar AQL</span>
          <span class="sigma-gated__chip sigma-gated__chip--locked">🔒 Wazuh</span>
          <a href="https://t.me/Shimiscyberworldbot?start=detect" class="sigma-gated__unlock" target="_blank" rel="noopener">Unlock SIEM Formats →</a>
        </div>
        {% if post.sigma_rules.paid_count and post.sigma_rules.paid_count > 0 %}
        <p class="dl-rule__notes"><strong>🛡️</strong> {{ post.sigma_rules.paid_count }} more rules — type <code>/detect</code> in <a href="https://t.me/Shimiscyberworldbot?start=detect" target="_blank" rel="noopener">Intel Bot</a></p>
        {% endif %}
      </div>
        {% endunless %}
      {% endif %}
    {% endfor %}
    {% if unique_breach_count > 0 %}
    <div class="dl-section-divider" style="order: -1;">
      <span class="dl-section-divider__label">🔥 Breach Intelligence — {{ unique_breach_count }} unique rules auto-generated from real incidents</span>
    </div>
    {% endif %}
  </div>

  <div class="empty-state" id="dlEmpty" style="display:none; margin-top: 2rem;">
    <p>No matching rules found. Try adjusting your filters.</p>
  </div>
</section>

<hr class="section-break">

<!-- CTA -->
<section class="cs-cta reveal">
  <div class="cs-cta__box">
    <h2 class="cs-cta__title">New rules ship with every breach.</h2>
    <p class="cs-cta__text">{{ total_rules }} detection rules and growing. Use <code>/detect</code> in the Intel Bot to generate Sigma rules for any breach — converted to your SIEM format instantly.</p>
    <div class="cs-cta__actions">
      <a href="https://t.me/Shimiscyberworldbot?start=detect" class="btn btn--primary" target="_blank" rel="noopener">Open Intel Bot →</a>
      <a href="{{ '/' | relative_url }}" class="btn btn--ghost">Back to Feed</a>
    </div>
  </div>
</section>

<style>
/* Showcase SIEM tabs */
.showcase-rules{display:flex;flex-direction:column;gap:1.5rem;margin-bottom:0}
.showcase-rule{background:var(--bg-card);border:1px solid var(--border);border-radius:8px;overflow:hidden}
.showcase-rule__header{display:flex;justify-content:space-between;align-items:center;padding:1rem 1.25rem;border-bottom:1px solid var(--border);flex-wrap:wrap;gap:.5rem}
.showcase-tabs{display:flex;gap:0;border-bottom:1px solid var(--border);overflow-x:auto;-webkit-overflow-scrolling:touch}
.showcase-tab{padding:.5rem 1rem;background:none;border:none;color:var(--text-muted);font-size:.8rem;cursor:pointer;white-space:nowrap;border-bottom:2px solid transparent;transition:color .2s,border-color .2s}
.showcase-tab:hover{color:var(--text)}
.showcase-tab.active{color:var(--accent);border-bottom-color:var(--accent)}
.showcase-panel{display:none;position:relative}
.showcase-panel.active{display:block}
.showcase-panel pre{margin:0;padding:1rem 1.25rem;background:rgba(0,0,0,.3);overflow-x:auto;font-size:.8rem;line-height:1.5}
.showcase-panel .dl-copy-btn{position:absolute;top:.5rem;right:.5rem}
.sigma-gated__chip--free{background:rgba(0,200,100,.12);color:#00c864;border-color:rgba(0,200,100,.3)}
</style>
<link rel="stylesheet" href="/assets/css/premium-tools.css?v=4">
<script src="{{ '/assets/js/detections.js' | relative_url }}" defer></script>
