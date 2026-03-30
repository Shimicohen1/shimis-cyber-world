------



















{% endfor %}</section>  </div>    {% endfor %}      {% include tool-card.html item=item %}    {% for item in category.items %}  <div class="card-grid">  <h2 class="section-title">{{ category.name }}</h2><section class="section">{% for category in site.data.tools.categories %}<p class="page-desc">Essential cybersecurity tools organized by use case — from recon to defense.</p><h1 class="page-title">Security Tools</h1>---permalink: /tools/title: Toolslayout: defaultlayout: default
title: Tools
permalink: /tools/
---

<h1 class="page-title">Cybersecurity Tools</h1>
<p class="page-desc">Essential tools for reconnaissance, exploitation, defense, and analysis.</p>

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
