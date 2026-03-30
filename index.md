---
layout: default
title: Home
---

{% assign hero = site.data.homepage.hero %}

<!-- HERO -->
<section class="hero">
  <div class="hero-orb hero-orb-1"></div>
  <div class="hero-orb hero-orb-2"></div>
  <div class="hero-orb hero-orb-3"></div>

  <img src="{{ '/assets/img/logos/logo-full.png' | relative_url }}" alt="SCW Logo" class="hero-logo">
  <h1>{{ hero.title }}</h1>
  <p class="tagline">{{ hero.tagline }}</p>

  <div class="hero-actions">
    <a href="{{ '/posts/' | relative_url }}" class="cta-button cta-primary">Explore Posts</a>
    <a href="{{ '/library/' | relative_url }}" class="cta-button cta-ghost">Enter the Library</a>
  </div>

  <div class="hero-tags">
    {% for tag in hero.floating_tags %}
    <span class="hero-tag">{{ tag }}</span>
    {% endfor %}
  </div>
</section>

<!-- FEATURED STRIP -->
{% assign featured_post = site.posts | where: "featured", true | first %}
{% unless featured_post %}{% assign featured_post = site.posts.first %}{% endunless %}
<section class="reveal">
  <div class="featured-strip">
    {% if featured_post %}
    <a href="{{ featured_post.url | relative_url }}" class="featured-strip-card card-glow">
      <span class="section-label featured-strip-label">Featured Post</span>
      <h3>{{ featured_post.title }}</h3>
      <p>{{ featured_post.excerpt | strip_html | truncate: 100 }}</p>
    </a>
    {% endif %}
    {% assign fr = site.data.homepage.featured_resources | first %}
    {% if fr %}
    <a href="{{ fr.url }}" class="featured-strip-card card-glow" target="_blank" rel="noopener">
      <span class="section-label featured-strip-label">Featured Resource</span>
      <h3>{{ fr.title }}</h3>
      <p>{{ fr.description | truncate: 100 }}</p>
    </a>
    {% endif %}
    {% assign ft = site.data.homepage.featured_tools | first %}
    {% if ft %}
    <a href="{{ ft.url }}" class="featured-strip-card card-glow" target="_blank" rel="noopener">
      <span class="section-label featured-strip-label">Featured Tool</span>
      <h3>{{ ft.title }}</h3>
      <p>{{ ft.description | truncate: 100 }}</p>
    </a>
    {% endif %}
  </div>
</section>

<!-- LATEST POSTS -->
{% if site.posts.size > 0 %}
<section class="section reveal">
  <div class="section-header">
    <span class="section-label">From the Blog</span>
    <h2 class="section-title">Latest Posts</h2>
  </div>
  <div class="card-grid">
    {% for post in site.posts limit:3 %}
      {% include post-card.html post=post %}
    {% endfor %}
  </div>
  {% if site.posts.size > 3 %}
  <p class="section-more"><a href="{{ '/posts/' | relative_url }}" class="cta-button cta-ghost">All Posts &rarr;</a></p>
  {% endif %}
</section>
{% endif %}

<!-- LIBRARY PREVIEW -->
<section class="section reveal">
  <div class="section-header">
    <span class="section-label">Knowledge Vault</span>
    <h2 class="section-title">Library Picks</h2>
  </div>
  <div class="card-grid">
    {% for item in site.data.homepage.featured_resources %}
      {% include resource-card.html item=item %}
    {% endfor %}
  </div>
  <p class="section-more"><a href="{{ '/library/' | relative_url }}" class="cta-button cta-ghost">Full Library &rarr;</a></p>
</section>

<!-- TOOLS SPOTLIGHT -->
<section class="section reveal">
  <div class="section-header">
    <span class="section-label">Cyber Arsenal</span>
    <h2 class="section-title">Tools Spotlight</h2>
  </div>
  <div class="card-grid card-grid-4">
    {% for item in site.data.homepage.featured_tools %}
      {% include tool-card.html item=item %}
    {% endfor %}
  </div>
  <p class="section-more"><a href="{{ '/tools/' | relative_url }}" class="cta-button cta-ghost">All Tools &rarr;</a></p>
</section>

<!-- CYBER WORLD DNA -->
<section class="dna-section reveal">
  <div class="section-header" style="text-align:center; margin-bottom:2rem;">
    <span class="section-label">The DNA</span>
    <h2 class="section-title">Cyber World Pillars</h2>
  </div>
  <div class="dna-grid">
    <div class="dna-card glass-panel">
      <span class="dna-icon">&#x1F50D;</span>
      <h3 class="gradient-text">Insights</h3>
      <p>Real-world write-ups, threat analysis, and hands-on security research from the trenches.</p>
    </div>
    <div class="dna-card glass-panel">
      <span class="dna-icon">&#x1F4DA;</span>
      <h3 class="gradient-text">Resources</h3>
      <p>Curated frameworks, training platforms, and references that actually matter.</p>
    </div>
    <div class="dna-card glass-panel">
      <span class="dna-icon">&#x26A1;</span>
      <h3 class="gradient-text">Tools</h3>
      <p>Open-source utilities and original tools built for security professionals.</p>
    </div>
  </div>
</section>
