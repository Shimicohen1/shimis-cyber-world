---
layout: page
title: Vulnerabilities
permalink: /vulnerabilities/
---

<div class="page-head">
  <div class="label label--red page-head__label">CVE</div>
  <h1 class="page-head__title">Vulnerabilities</h1>
  <p class="page-head__desc">Live CVE feed — vulnerability disclosures tracked and scored as they drop.</p>
</div>

<div class="archive">
  <div class="archive__list">
    {% assign cve_posts = site.posts | where: "channel", "CVE Notify" %}
    {% for post in cve_posts %}
    {% include post-card.html %}
    {% endfor %}
  </div>

  {% assign cve_count = site.posts | where: "channel", "CVE Notify" | size %}
  {% if cve_count == 0 %}
  <div class="empty-state" style="margin-top: 2rem;">
    <p>No vulnerabilities tracked yet. The CVE feed is warming up.</p>
  </div>
  {% endif %}
</div>
