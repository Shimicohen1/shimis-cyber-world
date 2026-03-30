---
layout: default
title: Tools
permalink: /tools/
---

<div class="section-header" style="margin-bottom:1.8rem;">
  <span class="section-label">Cyber Arsenal</span>
  <h1 class="page-title">Security Tools</h1>
  <p class="page-desc">Curated tools and original utilities for cybersecurity work — from recon to defense.</p>
</div>

{% for category in site.data.tools.categories %}
<section class="section reveal">
  <h2 class="section-title">{{ category.name }}</h2>
  <div class="card-grid card-grid-4">
    {% for item in category.items %}
      {% include tool-card.html item=item %}
    {% endfor %}
  </div>
</section>
{% endfor %}
