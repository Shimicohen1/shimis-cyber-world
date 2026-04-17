---
layout: page
title: Detection Vault
permalink: /detections/
---

{% comment %}── Compute breach intel rule count (deduplicated, INCD immediate + others 14-day aged) ──{% endcomment %}
{% assign vault_age_secs = 1209600 %}
{% assign now_epoch = site.time | date: '%s' | plus: 0 %}
{% assign vault_cutoff = now_epoch | minus: vault_age_secs %}
{% assign breach_intel_count = 0 %}
{% assign incd_count = 0 %}
{% assign counted_titles = "" %}
{% for post in site.posts %}
  {% if post.sigma_rules %}
    {% assign pe = post.date | date: '%s' | plus: 0 %}
    {% assign is_incd = false %}
    {% if post.channel == "INCD" %}{% assign is_incd = true %}{% endif %}
    {% comment %}INCD = immediate, others = 14-day gate{% endcomment %}
    {% if is_incd or pe < vault_cutoff %}
      {% assign ctkey = post.sigma_rules.preview_technique | downcase | strip | append: "~" | append: post.sigma_rules.preview_title | downcase | strip %}
      {% assign ctcheck = "||" | append: ctkey | append: "||" %}
      {% unless counted_titles contains ctcheck %}
        {% assign counted_titles = counted_titles | append: ctcheck %}
        {% assign breach_intel_count = breach_intel_count | plus: 1 %}
        {% if is_incd %}{% assign incd_count = incd_count | plus: 1 %}{% endif %}
      {% endunless %}
    {% endif %}
  {% endif %}
{% endfor %}
{% assign total_rules = site.data.detections.rules | size | plus: breach_intel_count %}

<div class="page-head">
  <div class="label label--cyan page-head__label">SCW TOOLS</div>
  <h1 class="page-head__title">Detection Vault</h1>
  <p class="page-head__desc">Production-ready detection rules for real SOC environments. KQL, Sigma, Splunk, and Wazuh — mapped to MITRE ATT&CK. Copy, paste, detect.</p>
</div>

<section class="cs-intro reveal">
  <p>Every rule in this library is <strong>battle-tested</strong>. Written by security operators, validated in production environments, and mapped to MITRE ATT&CK techniques. Sigma rules are free — SIEM exports (Splunk, Sentinel, Elastic, QRadar, Wazuh) available via the <a href="https://t.me/Shimiscyberworldbot?start=detect">Intel Bot</a>.</p>
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
    <div class="tool-card dl-rule reveal{% if rule.showcase %} dl-rule--showcase{% endif %}" data-category="{{ rule.category | slugify }}" data-platform="{{ rule.platform | slugify }}" data-name="{{ rule.name | downcase }}" data-tags="{{ rule.tags | join: ' ' | downcase }}" data-mitre="{{ rule.mitre | downcase }}">
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
      <div class="dl-rule__export-cta">
        <a href="https://t.me/Shimiscyberworldbot?start=detect" target="_blank" rel="noopener">
          <span class="dl-export-icon">⚡</span> Get this for every breach — <code>/detect</code> in the Intel Bot
        </a>
      </div>
      {% else %}
      <!-- Standard rule: only Sigma queries visible, all others locked -->
      {% assign plat_slug = rule.platform | downcase %}
      {% if plat_slug contains "sigma" %}
      <div class="dl-rule__code">
        <button class="dl-copy-btn" title="Copy to clipboard"><span class="scw-icon" data-icon="clipboard"></span></button>
        <pre><code>{{ rule.query | strip | xml_escape }}</code></pre>
      </div>
      {% else %}
      <div class="dl-rule__code dl-rule__code--locked">
        <div class="dl-locked-overlay">
          <span>🔒</span>
          <p>This {{ rule.platform }} query is available via the Intel Bot</p>
          <a href="https://t.me/Shimiscyberworldbot?start=detect" class="btn btn--accent btn--sm" target="_blank" rel="noopener">Unlock via Bot →</a>
        </div>
      </div>
      {% endif %}

      <div class="sigma-siem-locked sigma-siem-locked--static">
        <span class="sigma-gated__chip sigma-gated__chip--free">✓ Sigma</span>
        <span class="sigma-gated__chip sigma-gated__chip--locked">🔒 Splunk SPL</span>
        <span class="sigma-gated__chip sigma-gated__chip--locked">🔒 Sentinel KQL</span>
        <span class="sigma-gated__chip sigma-gated__chip--locked">🔒 Elastic</span>
        <span class="sigma-gated__chip sigma-gated__chip--locked">🔒 QRadar AQL</span>
        <span class="sigma-gated__chip sigma-gated__chip--locked">🔒 Wazuh</span>
      </div>
      <div class="dl-rule__export-cta">
        <a href="https://t.me/Shimiscyberworldbot?start=detect" target="_blank" rel="noopener">
          <span class="dl-export-icon">⚡</span> Export to all 6 SIEM formats instantly — try <code>/detect</code>
        </a>
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
      {% if post.channel == "INCD" %}{% assign is_incd = true %}{% endif %}
      {% if is_incd or pe < vault_cutoff %}
        {% assign rule_key = post.sigma_rules.preview_technique | downcase | strip | append: "~" | append: post.sigma_rules.preview_title | downcase | strip %}
        {% assign rule_check = "||" | append: rule_key | append: "||" %}
        {% unless seen_titles contains rule_check %}
          {% assign seen_titles = seen_titles | append: rule_check %}
          {% assign unique_breach_count = unique_breach_count | plus: 1 %}
      {% assign sev = post.sigma_rules.preview_level | default: 'medium' %}
      {% assign extra_cat = "" %}
      {% if is_incd %}{% assign extra_cat = " incd" %}{% endif %}
      <div class="tool-card dl-rule dl-rule--breach reveal"
           data-category="{{ post.sigma_rules.preview_tactic | slugify }}{{ extra_cat }}"
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
          {% if is_incd %}<span class="dl-breach-badge dl-breach-badge--incd">🇮🇱 INCD Intel</span>{% else %}<span class="dl-breach-badge">Breach Intel</span>{% endif %}
        </div>
        <p class="community-card__tagline">{{ post.sigma_rules.preview_technique }} — {{ post.sigma_rules.preview_tactic }}</p>
        <p>Auto-generated from <a href="{{ post.url | relative_url }}">{{ post.title | truncate: 60 }}</a></p>
        <div class="dl-rule__meta">
          <span class="badge badge--{% if sev == 'critical' %}live{% elsif sev == 'high' %}signal{% elsif sev == 'medium' %}drop{% else %}vault{% endif %}">{{ sev }}</span>
          <span class="tag">Sigma</span>
          {% if is_incd %}<span class="tag tag--incd">INCD</span>{% endif %}
          <span class="tag">{{ post.date | date: "%b %d, %Y" }}</span>
        </div>
        {% if post.sigma_rules.formats or post.sigma_rules.preview_yaml_b64 %}
        <div class="dl-rule__code">
          <button class="dl-copy-btn" title="Copy to clipboard"><span class="scw-icon" data-icon="clipboard"></span></button>
          <pre><code class="dl-siem-code"></code></pre>
        </div>
        {% endif %}
        <div class="sigma-export-strip">
          <span class="sigma-export-strip__free">✓ Sigma</span>
          <span class="sigma-export-strip__sep">·</span>
          <span class="sigma-export-strip__fmt">Splunk SPL</span>
          <span class="sigma-export-strip__fmt">Sentinel KQL</span>
          <span class="sigma-export-strip__fmt">Elastic</span>
          <span class="sigma-export-strip__fmt">QRadar AQL</span>
          <span class="sigma-export-strip__fmt">Wazuh</span>
          <a href="https://t.me/Shimiscyberworldbot?start=detect" class="sigma-export-strip__btn" target="_blank" rel="noopener">Export via Bot →</a>
        </div>
        {% if post.sigma_rules.paid_count and post.sigma_rules.paid_count > 0 %}
        <p class="dl-rule__notes"><strong>🛡️</strong> {{ post.sigma_rules.paid_count }} more rules — type <code>/detect</code> in <a href="https://t.me/Shimiscyberworldbot?start=detect" target="_blank" rel="noopener">Intel Bot</a></p>
        {% endif %}
      </div>
        {% endunless %}
      {% endif %}
      {% endif %}
    {% endfor %}
    {% if unique_breach_count > 0 %}
    <div class="dl-section-divider" style="order: -1;">
      <span class="dl-section-divider__label">🔥 Breach Intelligence — {{ unique_breach_count }} unique rules auto-generated from real incidents{% if incd_count > 0 %} ({{ incd_count }} 🇮🇱 INCD){% endif %}</span>
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

/* SIEM lock chips on static rules */
.sigma-siem-locked--static{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.75rem;padding:0 .25rem}
.sigma-siem-locked--static .sigma-gated__chip{font-size:.7rem;padding:.2rem .5rem;border-radius:4px;border:1px solid var(--border)}
.sigma-siem-locked--static .sigma-gated__chip--locked{opacity:.55}

/* Export CTA per rule */
.dl-rule__export-cta{margin-top:.6rem;padding:.5rem .75rem;background:linear-gradient(135deg,rgba(0,200,255,.04) 0%,rgba(0,200,255,.08) 100%);border-radius:6px;border:1px solid rgba(0,200,255,.12)}
.dl-rule__export-cta a{color:var(--accent);text-decoration:none;font-size:.8rem;display:flex;align-items:center;gap:.4rem;transition:color .2s}
.dl-rule__export-cta a:hover{color:#fff}
.dl-rule__export-cta code{font-size:.75rem;background:rgba(0,200,255,.1);padding:.1rem .35rem;border-radius:3px}
.dl-export-icon{font-size:.9rem}

/* INCD badge */
.dl-breach-badge--incd{background:rgba(0,100,200,.15);color:#4da6ff;border-color:rgba(0,100,200,.3)}
.tag--incd{background:rgba(0,100,200,.12);color:#4da6ff;border-color:rgba(0,100,200,.2)}

/* Locked query overlay */
.dl-rule__code--locked{position:relative;min-height:80px;background:rgba(0,0,0,.2);border-radius:6px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center}
.dl-locked-overlay{text-align:center;padding:1rem}
.dl-locked-overlay span{font-size:1.5rem}
.dl-locked-overlay p{color:var(--text-muted);font-size:.8rem;margin:.5rem 0}
.dl-locked-overlay .btn{font-size:.75rem;padding:.3rem .8rem}
</style>
<link rel="stylesheet" href="/assets/css/premium-tools.css?v=4">
<script src="{{ '/assets/js/detections.js' | relative_url }}" defer></script>
