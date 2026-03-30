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

<div class="archive">
  <div class="archive__list">
    {% for post in site.posts %}
    {% include post-card.html %}
    {% endfor %}
  </div>

  {% if site.posts.size == 0 %}
  <div class="empty-state" style="margin-top: 2rem;">
    <p>Drops are incoming. The feed is warming up.</p>
  </div>
  {% endif %}
</div>
