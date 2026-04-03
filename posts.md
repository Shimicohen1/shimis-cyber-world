---
layout: page
title: Drops
permalink: /posts/
---

<div class="page-head">
  <div class="label label--acid page-head__label">FEED</div>
  <h1 class="page-head__title">Drops</h1>
  <p class="page-head__desc">Field notes, deep dives, and raw cybersecurity intelligence — delivered as they land.</p>
</div>

<div class="feed-controls">
  <div class="feed-search">
    <span class="feed-search__icon">&#128269;</span>
    <input type="text" class="feed-search__input" placeholder="Search drops..." id="feed-search">
    <span class="feed-search__count" id="feed-count"></span>
  </div>
</div>

<div class="archive">
  <div class="archive__list" id="feed-list">
    {% assign non_cve = site.posts | where_exp: "post", "post.channel != 'CVE Notify'" %}
    {% for post in non_cve %}
    <div class="feed-entry" data-title="{{ post.title | downcase | escape }}" data-tags="{{ post.tags | join: ' ' | downcase }}" data-excerpt="{{ post.excerpt | strip_html | truncatewords: 20 | downcase | escape }}">
      {% include post-card.html %}
    </div>
    {% endfor %}
  </div>

  {% if non_cve.size == 0 %}
  <div class="empty-state" style="margin-top: 2rem;">
    <p>Drops are incoming. The feed is warming up.</p>
  </div>
  {% endif %}

  <nav class="pagination" id="pagination" aria-label="Page navigation"></nav>
</div>

<div data-feed-pagination="feed-list,feed-search,feed-count,pagination,20" style="display:none"></div>
