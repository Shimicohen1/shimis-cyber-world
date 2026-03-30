---
layout: page
title: Vault
permalink: /library/
---

<div class="page-head">
  <div class="label label--pink page-head__label">CURATED INTELLIGENCE</div>
  <h1 class="page-head__title">The Vault</h1>
  <p class="page-head__desc">Handpicked resources, references, and learning paths — organized by an operator, for operators.</p>
</div>

{% for category in site.data.resources.categories %}
<section class="page-section reveal">
  <h2 class="page-section__title">{{ category.name }}</h2>
  <div class="vault__grid">
    {% for resource in category.items %}
    <a href="{{ resource.url }}" target="_blank" rel="noopener" class="vault-card">
      <div class="vault-card__head">
        <h4>{{ resource.title }}</h4>
        {% if resource.badge %}<span class="badge badge--vault">{{ resource.badge }}</span>{% endif %}
      </div>
      <p>{{ resource.description }}</p>
    </a>
    {% endfor %}
  </div>
</section>
{% endfor %}
