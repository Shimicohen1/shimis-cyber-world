---
layout: page
title: Vulnerabilities
permalink: /vulnerabilities/
---

<div class="page-head">
  <div class="label label--red page-head__label">CVE</div>
  <h1 class="page-head__title">Vulnerabilities</h1>
  <p class="page-head__desc">Live CVE feed — high and critical vulnerability disclosures tracked as they drop.</p>
</div>

<div class="feed-controls">
  <div class="feed-search">
    <span class="feed-search__icon">&#128269;</span>
    <input type="text" class="feed-search__input" placeholder="Search CVEs..." id="vuln-search">
    <span class="feed-search__count" id="vuln-count"></span>
  </div>
</div>

<div class="archive">
  <div class="archive__list" id="vuln-list">
    {% for post in site.posts %}
    {% if post.channel == "CVE Notify" or post.channel == "CISA KEV" %}
    {% if post.score == "HIGH" or post.score == "CRITICAL" %}
    <div class="feed-entry" data-title="{{ post.title | downcase | escape }}" data-tags="{{ post.tags | join: ' ' | downcase }}" data-excerpt="{{ post.excerpt | strip_html | truncatewords: 20 | downcase | escape }}">
          {% include post-card.html %}
    </div>
    {% endif %}
    {% endif %}
    {% endfor %}
  </div>

  {% assign high_cve = site.posts | where: "channel", "CVE Notify" | where: "score", "HIGH" %}
  {% assign critical_cve = site.posts | where: "channel", "CVE Notify" | where: "score", "CRITICAL" %}
  {% assign high_kev = site.posts | where: "channel", "CISA KEV" | where: "score", "HIGH" %}
  {% assign critical_kev = site.posts | where: "channel", "CISA KEV" | where: "score", "CRITICAL" %}
  {% assign cve_total = high_cve.size | plus: critical_cve.size | plus: high_kev.size | plus: critical_kev.size %}
  {% if cve_total == 0 %}
  <div class="empty-state" style="margin-top: 2rem;">
    <p>No vulnerabilities tracked yet. The CVE feed is warming up.</p>
  </div>
  {% endif %}

  <nav class="pagination" id="vuln-pagination" aria-label="Page navigation"></nav>
</div>

<div data-feed-pagination="vuln-list,vuln-search,vuln-count,vuln-pagination,20" style="display:none"></div>
