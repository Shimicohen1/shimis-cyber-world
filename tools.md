---
layout: default
title: Tools
permalink: /tools/
---

<h1 class="page-title">Security Tools</h1>
<p class="page-desc">Curated tools and original utilities for cybersecurity work — from recon to defense.</p>

{% for category in site.data.tools.categories %}
<section class="section">
  <h2 class="section-title">{{ category.name }}</h2>
  <div class="card-grid">
    {% for item in category.items %}
      {% include tool-card.html item=item %}
    {% endfor %}
  </div>
</section>
{% endfor %}
