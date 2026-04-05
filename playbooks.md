---
layout: page
title: Incident Playbooks
permalink: /playbooks/
---

<div class="page-head">
  <div class="label label--amber page-head__label">PREMIUM</div>
  <h1 class="page-head__title">Incident Playbooks</h1>
  <p class="page-head__desc">Step-by-step response playbooks for every attack type. Built for SOC teams, IR leads, and security managers — ready to execute when it matters most.</p>
</div>

<section class="cs-intro reveal">
  <p>When an incident hits, you don't have time to Google. These playbooks give you <strong>phase-by-phase actions</strong> — from detection through containment, eradication, recovery, and post-incident review. Every step is concrete, every role is assigned.</p>
  <p>Free playbooks are fully accessible. Premium playbooks show the overview — <strong>unlock all phases with SCW Premium</strong>.</p>
  <div class="cs-intro__actions">
    <a href="#playbooks" class="btn btn--primary">Browse Playbooks</a>
    <a href="{{ '/premium/' | relative_url }}" class="btn btn--ghost">Get Premium Access</a>
  </div>
</section>

<hr class="section-break">

<!-- Stats bar -->
<section class="pb-stats reveal">
  <div class="dl-stats__grid">
    <div class="dl-stat">
      <span class="dl-stat__number">{{ site.data.playbooks.playbooks | size }}</span>
      <span class="dl-stat__label">Playbooks</span>
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
    <h2 class="feed__title"><span class="label label--cyan">PLAYBOOKS</span> &nbsp;By Attack Type</h2>
  </div>

  <div class="vault-controls">
    <div class="vault-search">
      <svg class="vault-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="text" id="pbSearch" class="vault-search__input" placeholder="Search playbooks..." autocomplete="off">
      <span id="pbCount" class="vault-search__count">{{ site.data.playbooks.playbooks | size }}</span>
    </div>
    <div class="vault-filters" id="pbCategoryFilters">
      <button class="vault-filter active" data-filter="all">All</button>
      {% for cat in site.data.playbooks.categories %}
      <button class="vault-filter" data-filter="{{ cat | slugify }}">{{ cat }}</button>
      {% endfor %}
    </div>
  </div>

  <!-- Playbooks Grid -->
  <div class="toolkit__grid" id="pbGrid">
    {% for pb in site.data.playbooks.playbooks %}
    <div class="tool-card pb-card reveal{% if pb.premium %} pb-card--premium{% endif %}" data-category="{{ pb.category | slugify }}" data-name="{{ pb.name | downcase }}" data-tags="{{ pb.tags | join: ' ' | downcase }}" data-mitre="{{ pb.mitre | downcase }}">
      <div class="tool-card__head">
        <h4>{{ pb.name }}</h4>
        {% if pb.premium %}
        <span class="badge badge--soon">🔒 PRO</span>
        {% else %}
        <span class="badge badge--new">FREE</span>
        {% endif %}
      </div>
      <p class="community-card__tagline">{{ pb.mitre }}</p>
      <p>{{ pb.description }}</p>

      <div class="dl-rule__meta">
        <span class="badge badge--{% if pb.severity == 'critical' %}live{% elsif pb.severity == 'high' %}signal{% elsif pb.severity == 'medium' %}drop{% else %}vault{% endif %}">{{ pb.severity }}</span>
        <span class="tag">⏱ {{ pb.estimated_time }}</span>
        {% for role in pb.roles %}<span class="tag">{{ role }}</span>{% endfor %}
      </div>

      {% if pb.tags %}
      <div class="tool-card__tags">
        {% for tag in pb.tags %}<span class="tag">{{ tag }}</span>{% endfor %}
      </div>
      {% endif %}

      <!-- Phases accordion -->
      <div class="pb-phases{% if pb.premium %} pb-phases--locked{% endif %}">
        {% if pb.premium %}
        <div class="pb-phases__lock">
          <span>🔒</span>
          <p>Unlock all 5 phases with <a href="{{ '/premium/' | relative_url }}">SCW Premium</a></p>
        </div>
        {% else %}
        {% for phase in pb.phases %}
        <div class="pb-phase">
          <button class="pb-phase__toggle" aria-expanded="false">
            <span class="pb-phase__icon">{% if phase.name == 'Detect' %}🔍{% elsif phase.name == 'Contain' %}🛑{% elsif phase.name == 'Eradicate' %}🧹{% elsif phase.name == 'Recover' %}🔄{% elsif phase.name == 'Post-Incident' %}📝{% else %}▶{% endif %}</span>
            <span class="pb-phase__name">{{ phase.name }}</span>
            <span class="pb-phase__arrow">▸</span>
          </button>
          <div class="pb-phase__content" hidden>
            <ol class="pb-phase__steps">
              {% for step in phase.steps %}
              <li>{{ step }}</li>
              {% endfor %}
            </ol>
          </div>
        </div>
        {% endfor %}
        {% endif %}
      </div>
    </div>
    {% endfor %}
  </div>

  <div class="empty-state" id="pbEmpty" style="display:none; margin-top: 2rem;">
    <p>No matching playbooks found. Try adjusting your filters.</p>
  </div>
</section>

<hr class="section-break">

<!-- CTA -->
<section class="cs-cta reveal">
  <div class="cs-cta__box">
    <h2 class="cs-cta__title">Respond faster. Respond smarter.</h2>
    <p class="cs-cta__text">Unlock all {{ site.data.playbooks.playbooks | size }} incident playbooks — with full phase-by-phase response steps your team can execute immediately.</p>
    <div class="cs-cta__actions">
      <a href="{{ '/premium/' | relative_url }}" class="btn btn--primary">Get Premium</a>
      <a href="{{ '/detections/' | relative_url }}" class="btn btn--ghost">Detection Library →</a>
    </div>
  </div>
</section>

<link rel="stylesheet" href="{{ '/assets/css/premium-tools.css' | relative_url }}">
<script src="{{ '/assets/js/playbooks.js' | relative_url }}" defer></script>
