---
layout: default
title: Library
permalink: /library/
---

<h1 class="page-title">Resource Library</h1>
<p class="page-desc">Curated cybersecurity resources — frameworks, training platforms, and reference materials.</p>

{% for category in site.data.resources.categories %}
<section class="section">
  <h2 class="section-title">{{ category.name }}</h2>
  <div class="card-grid">
    {% for item in category.items %}
      {% include resource-card.html item=item %}
    {% endfor %}
  </div>
</section>
{% endfor %}
