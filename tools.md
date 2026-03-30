---
layout: page
title: Toolkit
permalink: /tools/
---

<div class="page-head">
  <div class="label label--lime page-head__label">FIELD OPERATIONS</div>
  <h1 class="page-head__title">The Toolkit</h1>
  <p class="page-head__desc">Reconnaissance, exploitation, defense, and custom SCW tools — battle-tested and operator-approved.</p>
</div>

{% for category in site.data.tools.categories %}
<section class="page-section reveal">
  <h2 class="page-section__title">{{ category.name }}</h2>
  <div class="toolkit__grid">
    {% for tool in category.items %}
    <div class="tool-card">
      <div class="tool-card__head">
        <h4>{{ tool.title }}</h4>
        {% if tool.status == "essential" or tool.status == "Open" %}
          <span class="badge badge--signal">{{ tool.status }}</span>
        {% elsif tool.status == "recommended" %}
          <span class="badge badge--new">recommended</span>
        {% elsif tool.status == "beta" or tool.status == "Beta" %}
          <span class="badge badge--beta">beta</span>
        {% elsif tool.status == "coming-soon" or tool.status == "Coming Soon" %}
          <span class="badge badge--soon">coming soon</span>
        {% else %}
          {% if tool.status %}<span class="badge badge--signal">{{ tool.status }}</span>{% endif %}
        {% endif %}
      </div>
      <p>{{ tool.description }}</p>
      {% if tool.tags %}
      <div class="tool-card__tags">
        {% for tag in tool.tags %}<span class="tag">{{ tag }}</span>{% endfor %}
      </div>
      {% endif %}
      {% if tool.url %}
      <div class="tool-card__action">
        <a href="{{ tool.url }}" target="_blank" rel="noopener" class="btn btn--ghost btn--sm">{{ tool.button | default: "Open Tool" }} &rarr;</a>
      </div>
      {% endif %}
    </div>
    {% endfor %}
  </div>
</section>
{% endfor %}
