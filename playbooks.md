---
layout: page
title: Incident Playbooks
permalink: /playbooks/
---

<div class="page-head">
  <div class="label label--cyan page-head__label">SCW TOOLS</div>
  <h1 class="page-head__title">Incident Playbooks</h1>
  <p class="page-head__desc">Operational runbooks for every major attack type. Real tool commands, decision trees, escalation procedures, and communication templates — ready to execute when it matters.</p>
</div>

<section class="cs-intro reveal">
  <p>These aren't checklists — they're <strong>operational runbooks</strong> built for SOC teams, IR leads, and security managers. Every phase has real tool commands (CrowdStrike, Sentinel KQL, Splunk, AWS CLI), decision trees for branching scenarios, escalation matrices with SLAs, and copy-paste communication templates.</p>
  <p>All playbooks are <strong>free and open</strong>. Use them in your IR process today.</p>
  <div class="cs-intro__actions">
    <a href="#playbooks" class="btn btn--primary">Browse Runbooks</a>
    <a href="{{ '/detections/' | relative_url }}" class="btn btn--ghost">Detection Library →</a>
  </div>
</section>

<hr class="section-break">

<!-- Stats bar -->
<section class="pb-stats reveal">
  <div class="dl-stats__grid">
    <div class="dl-stat">
      <span class="dl-stat__number">{{ site.data.playbooks.playbooks | size }}</span>
      <span class="dl-stat__label">Runbooks</span>
    </div>
    <div class="dl-stat">
      <span class="dl-stat__number">{{ site.data.playbooks.categories | size }}</span>
      <span class="dl-stat__label">Attack Types</span>
    </div>
    <div class="dl-stat">
      <span class="dl-stat__number">5</span>
      <span class="dl-stat__label">Response Phases</span>
    </div>
  </div>
</section>

<hr class="section-break">

<!-- Filter -->
<section id="playbooks">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--cyan">RUNBOOKS</span> &nbsp;By Attack Type</h2>
  </div>

  <div class="vault-controls">
    <div class="vault-search">
      <svg class="vault-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="text" id="pbSearch" class="vault-search__input" placeholder="Search runbooks, techniques, or tools..." autocomplete="off">
      <span id="pbCount" class="vault-search__count">{{ site.data.playbooks.playbooks | size }}</span>
    </div>
    <div class="vault-filters" id="pbCategoryFilters">
      <button class="vault-filter active" data-filter="all">All</button>
      {% for cat in site.data.playbooks.categories %}
      <button class="vault-filter" data-filter="{{ cat | slugify }}">{{ cat }}</button>
      {% endfor %}
    </div>
  </div>

  <!-- Runbooks -->
  <div class="rb-list" id="pbGrid">
    {% for pb in site.data.playbooks.playbooks %}
    <div class="rb-card reveal" data-category="{{ pb.category | slugify }}" data-name="{{ pb.name | downcase }}" data-tags="{{ pb.tags | join: ' ' | downcase }}" data-mitre="{{ pb.mitre | downcase }}">

      <!-- Header -->
      <div class="rb-card__header">
        <div class="rb-card__title-row">
          <h3 class="rb-card__title">{{ pb.name }}</h3>
          <span class="badge badge--{% if pb.severity == 'critical' %}live{% elsif pb.severity == 'high' %}signal{% else %}drop{% endif %}">{{ pb.severity }}</span>
        </div>
        <p class="community-card__tagline">{{ pb.mitre }}</p>
        <p class="rb-card__desc">{{ pb.description }}</p>

        <div class="rb-card__meta">
          <span class="tag">⏱ {{ pb.estimated_time }}</span>
          {% for role in pb.roles %}<span class="tag">{{ role }}</span>{% endfor %}
        </div>

        {% if pb.tags %}
        <div class="tool-card__tags">
          {% for tag in pb.tags %}<span class="tag">{{ tag }}</span>{% endfor %}
        </div>
        {% endif %}
      </div>

      <!-- Escalation Matrix -->
      {% if pb.escalation %}
      <div class="rb-section rb-escalation">
        <button class="rb-section__toggle" aria-expanded="false">
          <span class="rb-section__icon">🚨</span>
          <span class="rb-section__name">Escalation Matrix</span>
          <span class="rb-section__arrow">▸</span>
        </button>
        <div class="rb-section__content">
          <div class="rb-kv-grid">
            {% if pb.escalation.p1_sla %}<div class="rb-kv"><span class="rb-kv__key">P1 SLA</span><span class="rb-kv__val">{{ pb.escalation.p1_sla }}</span></div>{% endif %}
            {% if pb.escalation.p2_sla %}<div class="rb-kv"><span class="rb-kv__key">P2 SLA</span><span class="rb-kv__val">{{ pb.escalation.p2_sla }}</span></div>{% endif %}
            {% if pb.escalation.war_room %}<div class="rb-kv"><span class="rb-kv__key">War Room</span><span class="rb-kv__val"><code>{{ pb.escalation.war_room }}</code></span></div>{% endif %}
            {% if pb.escalation.escalate_to_p1 %}<div class="rb-kv"><span class="rb-kv__key">Escalate to P1</span><span class="rb-kv__val">{{ pb.escalation.escalate_to_p1 }}</span></div>{% endif %}
          </div>
          {% if pb.escalation.p1_notify %}
          <p class="rb-label">Notify:</p>
          <ul class="rb-list-inline">{% for n in pb.escalation.p1_notify %}<li>{{ n }}</li>{% endfor %}</ul>
          {% endif %}
          {% if pb.escalation.p2_notify %}
          <p class="rb-label">Notify:</p>
          <ul class="rb-list-inline">{% for n in pb.escalation.p2_notify %}<li>{{ n }}</li>{% endfor %}</ul>
          {% endif %}
          {% if pb.escalation.external %}
          <p class="rb-label">External Contacts:</p>
          <ul class="rb-list-plain">{% for ext in pb.escalation.external %}<li>{{ ext }}</li>{% endfor %}</ul>
          {% endif %}
        </div>
      </div>
      {% endif %}

      <!-- Response Metrics -->
      {% if pb.metrics %}
      <div class="rb-section rb-metrics">
        <button class="rb-section__toggle" aria-expanded="false">
          <span class="rb-section__icon">📊</span>
          <span class="rb-section__name">Response Metrics & SLAs</span>
          <span class="rb-section__arrow">▸</span>
        </button>
        <div class="rb-section__content">
          <div class="rb-kv-grid">
            {% if pb.metrics.mttd %}<div class="rb-kv"><span class="rb-kv__key">MTTD (Mean Time to Detect)</span><span class="rb-kv__val">{{ pb.metrics.mttd }}</span></div>{% endif %}
            {% if pb.metrics.mttc %}<div class="rb-kv"><span class="rb-kv__key">MTTC (Mean Time to Contain)</span><span class="rb-kv__val">{{ pb.metrics.mttc }}</span></div>{% endif %}
            {% if pb.metrics.mttr %}<div class="rb-kv"><span class="rb-kv__key">MTTR (Mean Time to Recover)</span><span class="rb-kv__val">{{ pb.metrics.mttr }}</span></div>{% endif %}
            {% if pb.metrics.notification_sla %}<div class="rb-kv"><span class="rb-kv__key">Notification SLA</span><span class="rb-kv__val">{{ pb.metrics.notification_sla }}</span></div>{% endif %}
            {% if pb.metrics.benchmark %}<div class="rb-kv rb-kv--highlight"><span class="rb-kv__key">Industry Benchmark</span><span class="rb-kv__val">{{ pb.metrics.benchmark }}</span></div>{% endif %}
          </div>
        </div>
      </div>
      {% endif %}

      <!-- Response Phases -->
      {% for phase in pb.phases %}
      <div class="rb-section rb-phase">
        <button class="rb-section__toggle" aria-expanded="false">
          <span class="rb-section__icon">{% if phase.name == 'Detect' %}🔍{% elsif phase.name == 'Contain' %}🛑{% elsif phase.name == 'Eradicate' %}🧹{% elsif phase.name == 'Recover' %}🔄{% elsif phase.name == 'Post-Incident' %}📝{% else %}▶{% endif %}</span>
          <span class="rb-section__name">{{ phase.name }}</span>
          <span class="rb-section__count">{{ phase.steps | size }} steps</span>
          <span class="rb-section__arrow">▸</span>
        </button>
        <div class="rb-section__content">
          <div class="rb-steps">
            {% for step in phase.steps %}
            {% assign trimmed = step | strip %}
            {% if trimmed contains "`" or trimmed contains ":" and trimmed contains "  " %}
            <div class="rb-step rb-step--cmd"><code>{{ step | strip | xml_escape }}</code></div>
            {% else %}
            <div class="rb-step">{{ step | xml_escape }}</div>
            {% endif %}
            {% endfor %}
          </div>

          {% if phase.decision_tree %}
          <div class="rb-decision-tree">
            <p class="rb-label">⚡ Decision Tree</p>
            {% for d in phase.decision_tree %}
            <div class="rb-decision">
              <div class="rb-decision__if"><strong>IF:</strong> {{ d.condition }}</div>
              <div class="rb-decision__then"><strong>THEN:</strong> {{ d.action }}</div>
            </div>
            {% endfor %}
          </div>
          {% endif %}
        </div>
      </div>
      {% endfor %}

      <!-- Evidence Checklist -->
      {% if pb.evidence_checklist %}
      <div class="rb-section rb-evidence">
        <button class="rb-section__toggle" aria-expanded="false">
          <span class="rb-section__icon">📎</span>
          <span class="rb-section__name">Evidence Checklist</span>
          <span class="rb-section__count">{{ pb.evidence_checklist | size }} items</span>
          <span class="rb-section__arrow">▸</span>
        </button>
        <div class="rb-section__content">
          <ul class="rb-checklist">
            {% for item in pb.evidence_checklist %}
            <li><label><input type="checkbox"> {{ item }}</label></li>
            {% endfor %}
          </ul>
        </div>
      </div>
      {% endif %}

      <!-- Communication Templates -->
      {% if pb.comms_templates %}
      <div class="rb-section rb-comms">
        <button class="rb-section__toggle" aria-expanded="false">
          <span class="rb-section__icon">📨</span>
          <span class="rb-section__name">Communication Templates</span>
          <span class="rb-section__arrow">▸</span>
        </button>
        <div class="rb-section__content">
          {% if pb.comms_templates.internal %}
          <div class="rb-comms__block">
            <p class="rb-label">Internal Notification</p>
            <div class="rb-template">
              <button class="dl-copy-btn" title="Copy template">📋</button>
              <pre><code>{{ pb.comms_templates.internal | strip | xml_escape }}</code></pre>
            </div>
          </div>
          {% endif %}
          {% if pb.comms_templates.external %}
          <div class="rb-comms__block">
            <p class="rb-label">External / Customer Notification</p>
            <div class="rb-template">
              <button class="dl-copy-btn" title="Copy template">📋</button>
              <pre><code>{{ pb.comms_templates.external | strip | xml_escape }}</code></pre>
            </div>
          </div>
          {% endif %}
          {% if pb.comms_templates.affected_individuals %}
          <div class="rb-comms__block">
            <p class="rb-label">Affected Individuals Notification</p>
            <div class="rb-template">
              <button class="dl-copy-btn" title="Copy template">📋</button>
              <pre><code>{{ pb.comms_templates.affected_individuals | strip | xml_escape }}</code></pre>
            </div>
          </div>
          {% endif %}
        </div>
      </div>
      {% endif %}

    </div>
    {% endfor %}
  </div>

  <div class="empty-state" id="pbEmpty" style="display:none; margin-top: 2rem;">
    <p>No matching runbooks found. Try adjusting your filters.</p>
  </div>
</section>

<hr class="section-break">

<!-- CTA -->
<section class="cs-cta reveal">
  <div class="cs-cta__box">
    <h2 class="cs-cta__title">New runbooks ship regularly.</h2>
    <p class="cs-cta__text">{{ site.data.playbooks.playbooks | size }} operational runbooks and growing. Built for real incident response teams.</p>
    <div class="cs-cta__actions">
      <a href="{{ '/detections/' | relative_url }}" class="btn btn--primary">Detection Library →</a>
      <a href="{{ '/' | relative_url }}" class="btn btn--ghost">Back to Feed</a>
    </div>
  </div>
</section>

<link rel="stylesheet" href="{{ '/assets/css/premium-tools.css' | relative_url }}">
<script src="{{ '/assets/js/playbooks.js' | relative_url }}" defer></script>
