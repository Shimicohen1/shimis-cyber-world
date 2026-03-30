---
layout: default
title: Library
permalink: /library/
---

<div class="section-header" style="margin-bottom:1.8rem;">
  <span class="section-label">Knowledge Vault</span>
  <h1 class="page-title">Resource Library</h1>
  <p class="page-desc">Curated cybersecurity resources — frameworks, training platforms, references, and learning paths.</p>
</div>

{% for category in site.data.resources.categories %}
<section class="section reveal">
  <h2 class="section-title">{{ category.name }}</h2>
  <div class="card-grid">
    {% for item in category.items %}
      {% include resource-card.html item=item %}
    {% endfor %}
  </div>
</section>
{% endfor %}
