---
layout: default
title: Home
---

<section class="hero">
  <img src="{{ site.data.homepage.hero.image | relative_url }}" alt="{{ site.title }} Banner" class="hero-banner">
  <h1>{{ site.data.homepage.hero.title }}</h1>
  <p class="tagline">{{ site.data.homepage.hero.tagline }}</p>
  <a href="{{ site.data.homepage.hero.cta_url | relative_url }}" class="btn">{{ site.data.homepage.hero.cta_text }}</a>
</section>

<section class="features">
  <div class="feature-grid">
    {% for feature in site.data.homepage.features %}
    <div class="feature-card">
      <span class="feature-icon">{{ feature.icon }}</span>
      <h3>{{ feature.title }}</h3>
      <p>{{ feature.description }}</p>
    </div>
    {% endfor %}
  </div>
</section>

<section class="section">
  <h2 class="section-title">Latest Posts</h2>
  <div class="card-grid">
    {% for post in site.posts limit:6 %}
      {% include post-card.html post=post %}
    {% endfor %}
    {% if site.posts.size == 0 %}
    <div class="card">
      <div class="card-body">
        <h3>Coming Soon</h3>
        <p>New cybersecurity content is on the way. Stay tuned for articles, tutorials, and tools.</p>
      </div>
    </div>
    {% endif %}
  </div>
</section>
