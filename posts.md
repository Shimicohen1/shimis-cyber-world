---
layout: default
title: Blog
permalink: /posts/
---

<h1 class="page-title">Blog</h1>

<div class="card-grid">
  {% for post in site.posts %}
    {% include post-card.html post=post %}
  {% endfor %}

  {% if site.posts.size == 0 %}
  <div class="card">
    <div class="card-body">
      <h3>No posts yet</h3>
      <p>New cybersecurity content is coming soon. Check back later!</p>
    </div>
  </div>
  {% endif %}
</div>
