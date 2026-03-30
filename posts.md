---
layout: default
title: Posts
permalink: /posts/
---

<h1 class="page-title">Posts</h1>
<p class="page-desc">Cybersecurity write-ups, tutorials, and field notes — newest first.</p>

{% assign posts = site.posts %}
{% if posts.size > 0 %}
<div class="post-list">
  {% for post in posts %}
  <a href="{{ post.url | relative_url }}" class="post-list-item card-glow">
    <div class="post-list-body">
      <h3>{{ post.title }}</h3>
      <p>{{ post.excerpt | strip_html | truncate: 180 }}</p>
      <div class="card-meta">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
        {% if post.tags.size > 0 %}
        <span class="card-tags">{% for tag in post.tags limit:4 %}<span class="tag tag-sm">{{ tag }}</span>{% endfor %}</span>
        {% endif %}
      </div>
    </div>
    <span class="post-list-arrow">&rarr;</span>
  </a>
  {% endfor %}
</div>
{% else %}
<div class="empty-state">
  <p>No posts yet — new content is on the way. Check back soon.</p>
</div>
{% endif %}
