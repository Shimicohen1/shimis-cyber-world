---
layout: page
title: Lockdown Lab
permalink: /lockdown-lab/
description: "Daily, vendor-specific hardening tips from Shimi Cohen. One practical lockdown step every day — across cloud, identity, network, endpoint and AI security."
---

<div class="page-head">
  <div class="label label--acid page-head__label">DAILY SERIES</div>
  <h1 class="page-head__title">Lockdown Lab</h1>
  <p class="page-head__desc">A daily, vendor-specific hardening tip from the field. One practical lockdown step you can apply today — published every day at 10:00 Israel time across the website, LinkedIn and Telegram.</p>
</div>

<div class="feed-controls">
  <div class="feed-search">
    <span class="feed-search__icon">&#128269;</span>
    <input type="text" class="feed-search__input" placeholder="Search lockdown tips..." id="feed-search">
    <span class="feed-search__count" id="feed-count"></span>
  </div>
</div>

{% assign lockdowns = site.posts | where: "section", "lockdown" %}

<div class="archive">
  <div class="archive__list" id="feed-list">
    {% for post in lockdowns %}
    <div class="feed-entry" data-title="{{ post.title | downcase | escape }}" data-tags="{{ post.tags | join: ' ' | downcase }}" data-excerpt="{{ post.excerpt | strip_html | truncatewords: 20 | downcase | escape }}">
      {% include post-card.html %}
    </div>
    {% endfor %}
  </div>

  {% if lockdowns.size == 0 %}
  <div class="empty-state" style="margin-top: 2rem;">
    <p>The first Lockdown Lab tips are landing — check back tomorrow at 10:00 Israel time.</p>
    <p><a href="{{ '/hardening/' | relative_url }}">Or jump straight to the interactive hardening matrix →</a></p>
  </div>
  {% endif %}

  <nav class="pagination" id="pagination" aria-label="Page navigation"></nav>
</div>
