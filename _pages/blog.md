---
layout: default
title: Blog
permalink: /blog/
---

<h1>Blog</h1>

<div class="card-grid">
  {% for post in site.posts %}
  <a href="{{ post.url | relative_url }}" class="card" style="text-decoration:none;color:inherit;">
    <h3>{{ post.title }}</h3>
    <p>{{ post.excerpt | strip_html | truncate: 200 }}</p>
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
  </a>
  {% endfor %}

  {% if site.posts.size == 0 %}
  <div class="card">
    <h3>No posts yet</h3>
    <p>New cybersecurity content is coming soon. Check back later!</p>
  </div>
  {% endif %}
</div>
