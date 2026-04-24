---
layout: page
title: "Detection Vault — Free Sigma Rules & SIEM Detections for SOC Teams"
permalink: /detections/
description: "Free Sigma detection rules library for SOC analysts and threat hunters. 1,200+ production-ready rules covering CVEs, MITRE ATT&CK techniques and active threats. Splunk SPL, Sentinel KQL, Elastic, QRadar and Wazuh exports via the SCW Intel Bot."
---

{% comment %}── Compute breach intel rule count (deduplicated, INCD immediate + others 14-day aged) ──{% endcomment %}
{% assign vault_age_secs = 1209600 %}
{% assign now_epoch = site.time | date: '%s' | plus: 0 %}
{% assign vault_cutoff = now_epoch | minus: vault_age_secs %}
{% assign breach_intel_count = 0 %}
{% assign incd_count = 0 %}
{% assign nvd_count = 0 %}
{% assign counted_titles = "" %}
{% for post in site.posts %}
  {% if post.sigma_rules %}
    {% assign pe = post.date | date: '%s' | plus: 0 %}
    {% assign is_incd = false %}
    {% assign is_nvd = false %}
    {% if post.channel == "INCD" %}{% assign is_incd = true %}{% endif %}
    {% if post.channel == "NVD" %}{% assign is_nvd = true %}{% endif %}
    {% comment %}INCD & NVD = immediate, others = 14-day gate. NVD: HIGH+CRITICAL only{% endcomment %}
    {% if is_nvd and post.score != "HIGH" and post.score != "CRITICAL" %}{% continue %}{% endif %}
    {% if is_incd or is_nvd or pe < vault_cutoff %}
      {% assign ctkey = post.sigma_rules.preview_technique | downcase | strip | append: "~" | append: post.sigma_rules.preview_title | downcase | strip %}
      {% assign ctcheck = "||" | append: ctkey | append: "||" %}
      {% unless counted_titles contains ctcheck %}
        {% assign counted_titles = counted_titles | append: ctcheck %}
        {% assign breach_intel_count = breach_intel_count | plus: 1 %}
        {% if is_incd %}{% assign incd_count = incd_count | plus: 1 %}{% endif %}
        {% if is_nvd %}{% assign nvd_count = nvd_count | plus: 1 %}{% endif %}
      {% endunless %}
    {% endif %}
  {% endif %}
{% endfor %}
{% assign total_rules = site.data.detections.rules | size | plus: breach_intel_count %}

<div class="page-head">
  <div class="label label--cyan page-head__label">SCW TOOLS</div>
  <h1 class="page-head__title">Detection Vault — Free Sigma Detection Rules</h1>
  <p class="page-head__desc">Production-ready detection rules for real SOC environments. Sigma, KQL, SPL and Wazuh — mapped to MITRE ATT&CK. Free Sigma; SIEM-native exports (Splunk, Sentinel, Elastic, QRadar, Wazuh) via the SCW Intel Bot.</p>
</div>

<section class="cs-intro reveal">
  <p>The SCW Detection Vault is a free, continuously updated library of <strong>Sigma detection rules</strong> for SOC analysts, threat hunters and detection engineers. Every rule is battle-tested, validated in production, and mapped to <a href="https://attack.mitre.org/" target="_blank" rel="noopener">MITRE ATT&CK</a>. Rules are auto-generated from breaking CVEs (NVD), Israeli National Cyber Directorate (INCD) advisories, and curated SOC use-cases. Sigma format is free for everyone; if you need a SIEM-native version (Splunk SPL, Microsoft Sentinel KQL, Elastic ES|QL, IBM QRadar AQL, Wazuh) the <a href="https://t.me/Shimiscyberworldbot?start=detect">SCW Intel Bot</a> auto-converts on demand.</p>
  <div class="cs-intro__actions">
    <a href="#rules" class="btn btn--primary">Browse Rules</a>
    <a href="{{ '/playbooks/' | relative_url }}" class="btn btn--ghost">WarRoom →</a>
  </div>
</section>

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
      {% if incd_count > 0 %}<button class="vault-filter" data-filter="incd">🇮🇱 INCD</button>{% endif %}
      {% if nvd_count > 0 %}<button class="vault-filter" data-filter="nvd">🌐 NVD</button>{% endif %}
    </div>
    <div class="vault-filters vault-filters--cvss" id="dlCvssFilters" style="margin-top: 0.4rem;">
      <button class="vault-filter vault-filter--cvss active" data-cvss="all">All Severity</button>
      <button class="vault-filter vault-filter--cvss vault-filter--critical" data-cvss="critical">Critical</button>
      <button class="vault-filter vault-filter--cvss vault-filter--high" data-cvss="high">High</button>
      <button class="vault-filter vault-filter--cvss vault-filter--medium" data-cvss="medium">Medium</button>
    </div>

  </div>

  <!-- Rules Grid -->
  <div class="toolkit__grid" id="dlGrid">
    {% for rule in site.data.detections.rules %}
    <div class="tool-card dl-rule reveal{% if rule.showcase %} dl-rule--showcase{% endif %}" data-category="{{ rule.category | slugify }}" data-platform="{{ rule.platform | slugify }}" data-name="{{ rule.name | downcase }}" data-tags="{{ rule.tags | join: ' ' | downcase }}" data-mitre="{{ rule.mitre | downcase }}" data-severity="{{ rule.severity }}">
      <div class="tool-card__head">
        <h4>{{ rule.name }}</h4>
        {% if rule.showcase %}<span class="dl-breach-badge" style="background:rgba(0,200,255,.12);color:var(--accent);border:1px solid rgba(0,200,255,.25);">SIEM Preview</span>{% endif %}
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

      {% if rule.showcase %}
      <!-- Showcase: full SIEM tabs -->
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
          <pre><code>{{ rule.query | strip | xml_escape }}</code></pre>
        </div>
        <div class="showcase-panel" data-fmt="splunk">
          <button class="dl-copy-btn" title="Copy"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code>{{ rule.siem_splunk | strip | xml_escape }}</code></pre>
        </div>
        <div class="showcase-panel" data-fmt="kql">
          <button class="dl-copy-btn" title="Copy"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code>{{ rule.siem_kql | strip | xml_escape }}</code></pre>
        </div>
        <div class="showcase-panel" data-fmt="elastic">
          <button class="dl-copy-btn" title="Copy"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code>{{ rule.siem_elastic | strip | xml_escape }}</code></pre>
        </div>
        <div class="showcase-panel" data-fmt="qradar">
          <button class="dl-copy-btn" title="Copy"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code>{{ rule.siem_qradar | strip | xml_escape }}</code></pre>
        </div>
        <div class="showcase-panel" data-fmt="wazuh">
          <button class="dl-copy-btn" title="Copy"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code>{{ rule.siem_wazuh | strip | xml_escape }}</code></pre>
        </div>
      </div>
      <!-- Rule Tester: simulate detection -->
      {% if rule.sample_log %}
      <div class="dl-rule-tester">
        <button class="dl-rule-tester__btn" onclick="this.parentElement.classList.toggle('open')">
          🧪 Test This Rule — See What It Detects
        </button>
        <div class="dl-rule-tester__panel">
          <div class="dl-rule-tester__step">
            <span class="dl-rule-tester__num">1</span>
            <span>Sample log entry (would trigger this rule):</span>
          </div>
          <div class="dl-rule-tester__log">
            <pre><code>{{ rule.sample_log | strip | xml_escape }}</code></pre>
          </div>
          <div class="dl-rule-tester__step">
            <span class="dl-rule-tester__num">2</span>
            <span>Detection fields matched:</span>
          </div>
          <div class="dl-rule-tester__matches">
            {% for match in rule.sample_matches %}
            <div class="dl-rule-tester__match">
              <span class="dl-rule-tester__field">{{ match.field }}</span>
              <span class="dl-rule-tester__op">{{ match.op }}</span>
              <span class="dl-rule-tester__value">"{{ match.value }}"</span>
              <span class="dl-rule-tester__status">✅ HIT</span>
            </div>
            {% endfor %}
          </div>
          <div class="dl-rule-tester__result">
            <span class="dl-rule-tester__result-icon">🚨</span>
            <span><strong>ALERT FIRED</strong> — {{ rule.name }} — Severity: {{ rule.severity | upcase }}</span>
          </div>
          <p class="dl-rule-tester__note">This is a simulated detection. In a real SIEM, this log entry would trigger an alert with the rule above.</p>
        </div>
      </div>
      {% endif %}
      {% else %}
      <!-- Standard Sigma rule -->
      <div class="dl-rule__code">
        <button class="dl-copy-btn" title="Copy to clipboard"><span class="scw-icon" data-icon="clipboard"></span></button>
        <pre><code>{{ rule.query | strip | xml_escape }}</code></pre>
      </div>
      <div class="dl-siem-strip">
        <span class="dl-siem-strip__free">✓ Sigma</span>
        <span class="dl-siem-strip__sep">·</span>
        <span class="dl-siem-strip__fmts">Splunk · KQL · Elastic · QRadar · Wazuh</span>
        <a href="https://t.me/Shimiscyberworldbot?start=detect" class="dl-siem-strip__cta" target="_blank" rel="noopener">Export via Bot →</a>
      </div>
      {% endif %}

      {% if rule.notes %}
      <p class="dl-rule__notes"><strong><span class="scw-icon" data-icon="zap"></span> Note:</strong> {{ rule.notes }}</p>
      {% endif %}
    </div>
    {% endfor %}

    {% comment %}── Breach Intel Rules (auto-generated, deduplicated: INCD immediate + others 14-day aged) ──{% endcomment %}
    {% assign seen_titles = "" %}
    {% assign unique_breach_count = 0 %}
    {% for post in site.posts %}
      {% if post.sigma_rules %}
      {% assign pe = post.date | date: '%s' | plus: 0 %}
      {% assign is_incd = false %}
      {% assign is_nvd = false %}
      {% if post.channel == "INCD" %}{% assign is_incd = true %}{% endif %}
      {% if post.channel == "NVD" %}{% assign is_nvd = true %}{% endif %}
      {% if is_nvd and post.score != "HIGH" and post.score != "CRITICAL" %}{% continue %}{% endif %}
      {% if is_incd or is_nvd or pe < vault_cutoff %}
        {% assign rule_key = post.sigma_rules.preview_technique | downcase | strip | append: "~" | append: post.sigma_rules.preview_title | downcase | strip %}
        {% assign rule_check = "||" | append: rule_key | append: "||" %}
        {% unless seen_titles contains rule_check %}
          {% assign seen_titles = seen_titles | append: rule_check %}
          {% assign unique_breach_count = unique_breach_count | plus: 1 %}
      {% assign sev = post.sigma_rules.preview_level | default: 'medium' %}
      {% assign extra_cat = "" %}
      {% if is_incd %}{% assign extra_cat = " incd" %}{% endif %}
      {% if is_nvd %}{% assign extra_cat = extra_cat | append: " nvd" %}{% endif %}
      {% comment %}Build deeplink query: first CVE ID, or INCD alert number, or post slug{% endcomment %}
      {% assign detect_q = "" %}
      {% for ioc in post.iocs %}
        {% if detect_q == "" %}
          {% assign ioc_id_lower = ioc.id | downcase %}
          {% if ioc_id_lower contains "cve-" %}{% assign detect_q = ioc.id %}{% endif %}
        {% endif %}
      {% endfor %}
      {% if detect_q == "" %}
        {% assign fn_slug = post.path | split: "/" | last | remove: ".md" %}
        {% assign detect_q = fn_slug %}
      {% endif %}
      <div class="tool-card dl-rule dl-rule--breach reveal"
           data-category="{{ post.sigma_rules.preview_tactic | slugify }}{{ extra_cat }}"
           data-platform="multi-siem"
           data-name="{{ post.sigma_rules.preview_title | downcase }}"
           data-tags="{{ post.tags | join: ' ' | downcase }}"
           data-mitre="{{ post.sigma_rules.preview_technique | downcase }}"
           data-severity="{{ sev }}"
           data-cvss-score="{{ post.cvss_score }}"
           {% if post.sigma_rules.formats %}
           data-fmt-sigma="{{ post.sigma_rules.formats.sigma }}"
           {% elsif post.sigma_rules.preview_yaml_b64 %}
           data-fmt-sigma="{{ post.sigma_rules.preview_yaml_b64 }}"
           {% endif %}>
        <div class="tool-card__head">
          <h4>{{ post.sigma_rules.preview_title }}</h4>
          {% if is_incd %}<span class="dl-breach-badge dl-breach-badge--incd">🇮🇱 INCD Intel</span>{% elsif is_nvd %}<span class="dl-breach-badge dl-breach-badge--nvd">🌐 NVD</span>{% else %}<span class="dl-breach-badge">Breach Intel</span>{% endif %}
        </div>
        <p class="community-card__tagline">{{ post.sigma_rules.preview_technique }} — {{ post.sigma_rules.preview_tactic }}</p>
        <p>Auto-generated from <a href="{{ post.url | relative_url }}">{{ post.title | truncate: 60 }}</a></p>
        <div class="dl-rule__meta">
          <span class="badge badge--{% if sev == 'critical' %}live{% elsif sev == 'high' %}signal{% elsif sev == 'medium' %}drop{% else %}vault{% endif %}">{{ sev }}</span>
          {% if post.cvss_score %}<span class="badge badge--cvss" style="background:{% if post.cvss_score >= 9.0 %}rgba(220,38,38,.15);color:#ef4444;border:1px solid rgba(220,38,38,.3){% elsif post.cvss_score >= 7.0 %}rgba(245,158,11,.15);color:#f59e0b;border:1px solid rgba(245,158,11,.3){% else %}rgba(59,130,246,.15);color:#60a5fa;border:1px solid rgba(59,130,246,.3){% endif %}">CVSS {{ post.cvss_score }}/10</span>{% endif %}
          <span class="tag">Sigma</span>
          {% if is_incd %}<span class="tag tag--incd">INCD</span>{% endif %}
          {% if is_nvd %}<span class="tag tag--nvd">NVD</span>{% endif %}
          <span class="tag">{{ post.date | date: "%b %d, %Y" }}</span>
        </div>
        {% if post.sigma_rules.formats or post.sigma_rules.preview_yaml_b64 %}
        <div class="dl-rule__code">
          <button class="dl-copy-btn" title="Copy to clipboard"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code class="dl-siem-code"></code></pre>
        </div>
        {% endif %}
        <div class="dl-siem-strip">
          <span class="dl-siem-strip__free">✓ Sigma</span>
          <span class="dl-siem-strip__sep">·</span>
          <span class="dl-siem-strip__fmts">Splunk · KQL · Elastic · QRadar · Wazuh</span>
          <a href="https://t.me/Shimiscyberworldbot?start=detect_{{ detect_q | url_encode }}" class="dl-siem-strip__cta" target="_blank" rel="noopener">Export via Bot →</a>
        </div>
        {% if post.sigma_rules.paid_count and post.sigma_rules.paid_count > 0 %}
        <p class="dl-rule__notes"><strong>🛡️</strong> {{ post.sigma_rules.paid_count }} more rules via <a href="https://t.me/Shimiscyberworldbot?start=detect_{{ detect_q | url_encode }}" target="_blank" rel="noopener">/detect</a></p>
        {% endif %}
      </div>
        {% endunless %}
      {% endif %}
      {% endif %}
    {% endfor %}
    {% if unique_breach_count > 0 %}
    <div class="dl-section-divider" style="order: -1;">
      <span class="dl-section-divider__label">🔥 Breach Intelligence — Auto-generated from real-world incidents</span>
    </div>
    {% endif %}
  </div>

  <div style="text-align:center; margin-top:1.5rem;">
    <button class="btn btn--ghost" id="dlShowMore" style="display:none;">Show More</button>
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
    <p class="cs-cta__text">{{ total_rules }} detection rules and growing. Use <code>/detect</code> to generate Sigma rules for any breach — converted to your SIEM format instantly.</p>
    <div class="cs-cta__actions">
      <a href="https://t.me/Shimiscyberworldbot?start=detect" class="btn btn--primary" target="_blank" rel="noopener">Open Intel Bot →</a>
      <a href="{{ '/' | relative_url }}" class="btn btn--ghost">Back to Feed</a>
    </div>
  </div>
</section>

<style>
/* Showcase SIEM tabs */
.showcase-tabs{display:flex;gap:0;border-bottom:1px solid var(--border);overflow-x:auto;-webkit-overflow-scrolling:touch}
.showcase-tab{padding:.5rem 1rem;background:none;border:none;color:var(--text-muted);font-size:.8rem;cursor:pointer;white-space:nowrap;border-bottom:2px solid transparent;transition:color .2s,border-color .2s}
.showcase-tab:hover{color:var(--text)}
.showcase-tab.active{color:var(--accent);border-bottom-color:var(--accent)}
.showcase-panel{display:none;position:relative}
.showcase-panel.active{display:block}
.showcase-panel pre{margin:0;padding:1rem 1.25rem;background:rgba(0,0,0,.3);overflow-x:auto;font-size:.8rem;line-height:1.5}
.showcase-panel .dl-copy-btn{position:absolute;top:.5rem;right:.5rem}

/* INCD badge */
.dl-breach-badge--incd{background:rgba(0,100,200,.15);color:#4da6ff;border-color:rgba(0,100,200,.3)}
.tag--incd{background:rgba(0,100,200,.12);color:#4da6ff;border-color:rgba(0,100,200,.2)}

/* NVD badge */
.dl-breach-badge--nvd{background:rgba(200,160,0,.15);color:#e0b030;border-color:rgba(200,160,0,.3)}
.tag--nvd{background:rgba(200,160,0,.12);color:#e0b030;border-color:rgba(200,160,0,.2)}

/* CVSS severity filter buttons */
.vault-filters--cvss{display:flex;gap:.35rem;flex-wrap:wrap}
.vault-filter--cvss{font-size:.75rem;padding:.3rem .7rem;border-radius:12px}
.vault-filter--critical.active{background:rgba(220,38,38,.18);color:#ef4444;border-color:rgba(220,38,38,.4)}
.vault-filter--high.active{background:rgba(245,158,11,.18);color:#f59e0b;border-color:rgba(245,158,11,.4)}
.vault-filter--medium.active{background:rgba(59,130,246,.18);color:#60a5fa;border-color:rgba(59,130,246,.4)}

/* ── Unified SIEM strip (replaces all old CTA / lock / chip blocks) ── */
.dl-siem-strip{display:flex;align-items:center;flex-wrap:wrap;gap:.4rem .7rem;margin-top:.75rem;padding:.55rem .85rem;background:rgba(0,200,255,.04);border:1px solid rgba(0,200,255,.10);border-radius:6px;font-size:.78rem;line-height:1.4}
.dl-siem-strip__free{color:#00c864;font-weight:600}
.dl-siem-strip__sep{color:var(--border);user-select:none}
.dl-siem-strip__fmts{color:var(--text-muted)}
.dl-siem-strip__cta{margin-left:auto;color:var(--accent);text-decoration:none;font-weight:600;white-space:nowrap;transition:color .2s}
.dl-siem-strip__cta:hover{color:#fff}

/* Gated variant — not used currently, kept for future */

/* Rule Tester widget */
.dl-rule-tester{margin-top:.75rem;border:1px solid var(--border);border-radius:8px;overflow:hidden}
.dl-rule-tester__btn{width:100%;padding:.65rem 1rem;background:linear-gradient(135deg,rgba(0,200,100,.06),rgba(0,200,255,.06));border:none;color:var(--accent);font-size:.85rem;font-weight:600;cursor:pointer;text-align:left;transition:background .2s}
.dl-rule-tester__btn:hover{background:linear-gradient(135deg,rgba(0,200,100,.12),rgba(0,200,255,.12))}
.dl-rule-tester__panel{display:none;padding:1rem 1.25rem;background:rgba(0,0,0,.2)}
.dl-rule-tester.open .dl-rule-tester__panel{display:block}
.dl-rule-tester__step{display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem;color:var(--text-muted);font-size:.8rem}
.dl-rule-tester__num{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:var(--accent);color:#000;font-size:.7rem;font-weight:700;flex-shrink:0}
.dl-rule-tester__log{margin-bottom:1rem}
.dl-rule-tester__log pre{margin:0;padding:.75rem 1rem;background:rgba(0,0,0,.3);border-radius:6px;overflow-x:auto;font-size:.75rem;line-height:1.5;border-left:3px solid var(--accent)}
.dl-rule-tester__matches{display:flex;flex-direction:column;gap:.35rem;margin-bottom:1rem}
.dl-rule-tester__match{display:flex;align-items:center;gap:.5rem;padding:.35rem .6rem;background:rgba(0,200,100,.05);border-radius:4px;font-size:.78rem;flex-wrap:wrap}
.dl-rule-tester__field{color:var(--accent);font-family:var(--font-mono);font-weight:600}
.dl-rule-tester__op{color:var(--text-muted)}
.dl-rule-tester__value{color:#f0c674;font-family:var(--font-mono)}
.dl-rule-tester__status{color:#00c864;font-weight:700;margin-left:auto}
.dl-rule-tester__result{display:flex;align-items:center;gap:.6rem;padding:.65rem 1rem;background:linear-gradient(135deg,rgba(255,60,60,.08),rgba(255,60,60,.15));border:1px solid rgba(255,60,60,.25);border-radius:6px;color:#ff6b6b;font-size:.85rem;margin-bottom:.5rem}
.dl-rule-tester__result-icon{font-size:1.3rem}
.dl-rule-tester__note{color:var(--text-muted);font-size:.72rem;margin:0;font-style:italic}
</style>
<link rel="stylesheet" href="/assets/css/premium-tools.css?v=4">
<script src="{{ '/assets/js/detections.js' | relative_url }}" defer></script>

<section class="cs-intro reveal" style="margin-top:2.5rem;">
  <h2>Detection Vault FAQ</h2>
  <details><summary><strong>What is Sigma and why use it?</strong></summary>
  <p>Sigma is a generic, vendor-neutral signature format for SIEM systems \u2014 the YAML equivalent of Snort/YARA for log-based detections. Write a detection once in Sigma, then convert to your platform (Splunk SPL, Sentinel KQL, Elastic, QRadar AQL, Wazuh). Every rule in the SCW Detection Vault ships in Sigma format for free.</p></details>

  <details><summary><strong>Are these detection rules really free?</strong></summary>
  <p>Yes. All Sigma rules in the Detection Vault are free to copy, paste and use \u2014 commercial or non-commercial. SIEM-native exports (Splunk SPL, Sentinel KQL, Elastic ES|QL, QRadar AQL, Wazuh) are gated behind the SCW Intel Bot's Elite tier (75 Telegram Stars/month) only because converting and validating across five SIEM dialects has a real GPU and validation cost.</p></details>

  <details><summary><strong>How often is the vault updated?</strong></summary>
  <p>New detection rules are auto-generated within minutes of new CVE publications on the National Vulnerability Database (NVD), Israeli INCD advisories, and major breach disclosures. Curated rules from real-world SOC engagements are added on a rolling basis.</p></details>

  <details><summary><strong>Can I convert these rules to KQL, SPL or my SIEM?</strong></summary>
  <p>Yes \u2014 message the <a href="https://t.me/Shimiscyberworldbot?start=detect" target="_blank" rel="noopener">SCW Intel Bot</a> on Telegram with the rule title or CVE ID. The bot returns the rule in your chosen SIEM dialect (Splunk SPL, Microsoft Sentinel KQL, Elastic ES|QL, IBM QRadar AQL, Wazuh) on the Elite tier.</p></details>

  <details><summary><strong>Are rules mapped to MITRE ATT&CK?</strong></summary>
  <p>Every rule includes the relevant MITRE ATT&CK technique IDs (e.g. T1190, T1059) so you can align coverage gaps to your existing detection engineering roadmap and the ATT&CK Navigator.</p></details>
</section>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "SCW Detection Vault",
  "headline": "Free Sigma Detection Rules for SOC Teams",
  "description": "Free Sigma detection rules library for SOC analysts and threat hunters. 1,200+ production-ready rules covering CVEs, MITRE ATT&CK techniques and active threats.",
  "url": "{{ site.url }}/detections/",
  "isAccessibleForFree": true,
  "keywords": "sigma rules, sigma detection, siem rules, soc detection, threat hunting, mitre att&ck, kql rules, splunk detection",
  "publisher": {
    "@type": "Organization",
    "name": "Shimi's Cyber World",
    "url": "{{ site.url }}"
  },
  "about": [
    {"@type":"Thing","name":"Sigma Detection Rules"},
    {"@type":"Thing","name":"SIEM Detection"},
    {"@type":"Thing","name":"MITRE ATT&CK"},
    {"@type":"Thing","name":"Threat Hunting"}
  ]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"What is Sigma and why use it?","acceptedAnswer":{"@type":"Answer","text":"Sigma is a generic, vendor-neutral signature format for SIEM systems. Write a detection once in Sigma, then convert to your platform (Splunk SPL, Sentinel KQL, Elastic, QRadar, Wazuh)."}},
    {"@type":"Question","name":"Are these detection rules really free?","acceptedAnswer":{"@type":"Answer","text":"Yes. All Sigma rules in the Detection Vault are free to copy, paste and use - commercial or non-commercial."}},
    {"@type":"Question","name":"How often is the vault updated?","acceptedAnswer":{"@type":"Answer","text":"New detection rules are auto-generated within minutes of new CVE publications on the NVD, Israeli INCD advisories, and major breach disclosures."}},
    {"@type":"Question","name":"Can I convert these rules to KQL, SPL or my SIEM?","acceptedAnswer":{"@type":"Answer","text":"Yes - message the SCW Intel Bot on Telegram with the rule title or CVE ID. The bot returns the rule in your chosen SIEM dialect on the Elite tier."}},
    {"@type":"Question","name":"Are rules mapped to MITRE ATT&CK?","acceptedAnswer":{"@type":"Answer","text":"Every rule includes the relevant MITRE ATT&CK technique IDs so you can align coverage gaps to your existing detection engineering roadmap."}}
  ]
}
</script>
