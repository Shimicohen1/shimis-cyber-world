---
layout: default
title: Home
---

{% assign hero = site.data.homepage.hero %}
{% assign about = site.data.homepage.about_block %}

<!-- 1. Hero -->
<section class="hero">
  <img src="{{ hero.image | relative_url }}" alt="{{ site.title }} Banner" class="hero-banner">
  <h1>{{ hero.title }}</h1>
  <p class="tagline">{{ hero.tagline }}</p>
  <div class="hero-actions">
    {% for btn in hero.cta %}
    <a href="{{ btn.url | relative_url }}" class="btn{% if btn.style == 'ghost' %} btn-ghost{% endif %}">{{ btn.text }}</a>
    {% endfor %}
  </div>
</section>

<!-- 2. Featured Post -->
{% assign featured = site.posts | where: "featured", true | first %}
{% unless featured %}{% assign featured = site.posts.first %}{% endunless %}
{% if featured %}
<section class="section">
  <h2 class="section-title">Featured Post</h2>
  <a href="{{ featured.url | relative_url }}" class="featured-post-card">
    {% if featured.image %}
    <div class="featured-post-image" style="background-image:url('{{ featured.image | relative_url }}')"></div>
    {% endif %}
    <div class="featured-post-body">
      <h3>{{ featured.title }}</h3>
      <p>{{ featured.excerpt | strip_html | truncate: 220 }}</p>
      <span class="card-meta">
        <time datetime="{{ featured.date | date_to_xmlschema }}">{{ featured.date | date: "%B %d, %Y" }}</time>
        {% for tag in featured.tags limit:3 %}<span class="tag tag-sm">{{ tag }}</span>{% endfor %}
      </span>
    </div>
  </a>
</section>
{% endif %}

<!-- 3. Latest Posts -->
{% if site.posts.size > 0 %}
<section class="section">
  <h2 class="section-title">Latest Posts</h2>
  <div class="card-grid">
    {% for post in site.posts limit:3 %}
      {% include post-card.html post=post %}
    {% endfor %}
  </div>
  {% if site.posts.size > 3 %}
  <p class="section-more"><a href="{{ '/posts/' | relative_url }}" class="btn btn-ghost">All posts &rarr;</a></p>
  {% endif %}
</section>
{% endif %}

<!-- 4. Featured Library Resources -->
<section class="section">
  <h2 class="section-title">Library Picks</h2>
  <div class="card-grid">
    {% for item in site.data.homepage.featured_resources %}
      {% include resource-card.html item=item %}
    {% endfor %}
  </div>
  <p class="section-more"><a href="{{ '/library/' | relative_url }}" class="btn btn-ghost">Full library &rarr;</a></p>
</section>

<!-- 5. Tools Preview -->
<section class="section">
  <h2 class="section-title">Tools Spotlight</h2>
  <div class="card-grid card-grid-4">
    {% for item in site.data.homepage.featured_tools %}
      {% include tool-card.html item=item %}
    {% endfor %}
  </div>
  <p class="section-more"><a href="{{ '/tools/' | relative_url }}" class="btn btn-ghost">All tools &rarr;</a></p>
</section>

<!-- 6. What is Cyber World -->
<section class="about-block">
  <h2>{{ about.heading }}</h2>
  <p>{{ about.body }}</p>
  <a href="{{ about.cta_url | relative_url }}" class="btn btn-ghost">{{ about.cta_text }}</a>
</section>
