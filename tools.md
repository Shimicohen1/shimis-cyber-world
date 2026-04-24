---
layout: page
title: Toolkit
permalink: /tools/
---

<div class="page-head">
  <div class="label label--lime page-head__label">FIELD OPERATIONS</div>
  <h1 class="page-head__title">The Toolkit</h1>
  <p class="page-head__desc">Reconnaissance, exploitation, defense, and security tools — battle-tested and operator-approved.</p>
</div>

{% for category in site.data.tools.categories %}
<section class="page-section reveal">
  <h2 class="page-section__title">{{ category.name }}</h2>
  <div class="toolkit__grid">
    {% for tool in category.items %}
    {% assign _slug = tool.title | slugify %}
    {% assign _internal = "/tools/" | append: _slug | append: "/" %}
    <a href="{{ _internal | relative_url }}" class="tool-card{% if tool.sponsored %} tool-card--sponsored{% endif %}" data-track="tool-page">
      <div class="tool-card__head">
        <h4>{{ tool.title }}</h4>
        {% if tool.sponsored %}
          <span class="badge badge--partner">Recommended</span>
        {% elsif tool.status == "Essential" %}
          <span class="badge badge--signal">essential</span>
        {% elsif tool.status == "Recommended" %}
          <span class="badge badge--new">recommended</span>
        {% elsif tool.status == "beta" or tool.status == "Beta" %}
          <span class="badge badge--beta">beta</span>
        {% elsif tool.status == "coming-soon" or tool.status == "Coming Soon" %}
          <span class="badge badge--soon">coming soon</span>
        {% elsif tool.status == "Open" %}
          <span class="badge badge--signal">open</span>
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
      <div class="tool-card__action">
        <span class="btn btn--ghost btn--sm">Read more &rarr;</span>
      </div>
    </a>
    {% endfor %}
  </div>
</section>

{% comment %}── Toolkit Ad Banners between categories ──{% endcomment %}
{% for banner in site.data.monetization.toolkit_banners %}
  {% if banner.after_category == category.name %}
    {% if banner.type == "premium-cta" %}
      {% include ad-slot.html type="premium-cta" title=banner.title desc=banner.desc url=banner.url button=banner.button %}
    {% else %}
      {% include ad-slot.html type="toolkit-banner" title=banner.title desc=banner.desc products=banner.products url=banner.url button=banner.button %}
    {% endif %}
  {% endif %}
{% endfor %}

{% endfor %}
