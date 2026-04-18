---
layout: page
title: Posts
permalink: /posts/
---

<div class="page-head">
  <div class="label label--acid page-head__label">FEED</div>
  <h1 class="page-head__title">Posts</h1>
  <p class="page-head__desc">Field notes, deep dives, and raw cybersecurity intelligence — delivered as they land.</p>
</div>

<div class="feed-controls">
  <div class="feed-search">
    <span class="feed-search__icon">&#128269;</span>
    <input type="text" class="feed-search__input" placeholder="Search posts..." id="feed-search">
    <span class="feed-search__count" id="feed-count"></span>
  </div>
  <div class="feed-filters" id="feed-filters">
    <button class="filter-pill filter-pill--active" data-filter="all">All</button>
    <button class="filter-pill" data-filter="malware">Malware</button>
    <button class="filter-pill" data-filter="ransomware">Ransomware</button>
    <button class="filter-pill" data-filter="data-breach">Data Breach</button>
    <button class="filter-pill" data-filter="vulnerability">Vulnerability</button>
    <button class="filter-pill" data-filter="red-team">Red Team</button>
    <button class="filter-pill" data-filter="tools">Tools</button>
    <button class="filter-pill" data-filter="cloud">Cloud</button>
    <button class="filter-pill" data-filter="ai-security">AI Security</button>
    <button class="filter-pill" data-filter="daily-digest">Daily Digest</button>
  </div>
</div>

<div class="archive">
  <div class="archive__list" id="feed-list">
    {% assign non_cve = site.posts | where_exp: "post", "post.channel != 'CVE Notify'" | where_exp: "post", "post.channel != 'NVD'" | where_exp: "post", "post.channel != 'CISA KEV'" | where_exp: "post", "post.channel != 'INCD'" | where_exp: "post", "post.section != 'vulnerabilities'" %}
    {% assign ad_freq = site.data.monetization.feed_ads.frequency | default: 6 %}
    {% assign ad_items = site.data.monetization.feed_ads.items %}
    {% assign ad_count = ad_items | size %}
    {% for post in non_cve %}
    <div class="feed-entry" data-title="{{ post.title | downcase | escape }}" data-tags="{{ post.tags | join: ' ' | downcase }}" data-excerpt="{{ post.excerpt | strip_html | truncatewords: 20 | downcase | escape }}">
      {% include post-card.html %}
    </div>
    {% assign loop_idx = forloop.index | modulo: ad_freq %}
    {% if loop_idx == 0 and ad_count > 0 %}
      {% assign ad_idx = forloop.index | divided_by: ad_freq | minus: 1 | modulo: ad_count %}
      {% assign ad = ad_items[ad_idx] %}
      {% include ad-slot.html type="feed-native" title=ad.title desc=ad.desc url=ad.url sponsor=ad.sponsor badge=ad.badge button=ad.button %}
    {% endif %}
    {% endfor %}
  </div>

  {% if non_cve.size == 0 %}
  <div class="empty-state" style="margin-top: 2rem;">
    <p>Posts are incoming. The feed is warming up.</p>
  </div>
  {% endif %}

  <nav class="pagination" id="pagination" aria-label="Page navigation"></nav>
</div>

<div data-feed-pagination="feed-list,feed-search,feed-count,pagination,20" style="display:none"></div>
