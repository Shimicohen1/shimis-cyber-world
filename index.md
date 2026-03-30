---
layout: default
title: Home
---

{% include signal-bar.html %}

<!-- IDENTITY BLOCK -->
<section class="identity">
  <div class="container">
    <div class="identity__inner reveal">
      <img src="{{ '/assets/img/logos/logo.jpg' | relative_url }}" alt="SCW" class="identity__logo">
      <div class="identity__text">
        <h1 class="identity__title">{{ site.data.homepage.identity.title }}</h1>
        <p class="identity__tagline">{{ site.data.homepage.identity.tagline }}</p>
        <div class="identity__actions">
          <a href="{{ site.data.homepage.identity.cta_primary.url | relative_url }}" class="btn btn--primary">{{ site.data.homepage.identity.cta_primary.text }}</a>
          <a href="{{ site.data.homepage.identity.cta_secondary.url | relative_url }}" class="btn btn--ghost">{{ site.data.homepage.identity.cta_secondary.text }}</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- LIVE FEED -->
<section class="feed">
  <div class="container">
    <div class="feed__header">
      <h2 class="feed__title"><span class="label label--electric">LATEST</span> &nbsp;Drops</h2>
      <a href="{{ '/posts/' | relative_url }}" class="feed__link">View all &rarr;</a>
    </div>

    {% assign posts = site.posts | slice: 0, 4 %}
    {% if posts.size > 0 %}
    <div class="feed__grid reveal">
      {% for post in posts %}
      {% if forloop.first %}
      <a href="{{ post.url | relative_url }}" class="feed__hero">
        <span class="badge badge--drop">Latest Drop</span>
        <h3>{{ post.title }}</h3>
        <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
        <span class="feed__meta">{{ post.date | date: "%b %d, %Y" }}{% if post.author %} / {{ post.author }}{% endif %}</span>
      </a>
      {% else %}
      <a href="{{ post.url | relative_url }}" class="feed__card">
        <span class="badge badge--signal">Drop</span>
        <h4>{{ post.title }}</h4>
        <p>{{ post.excerpt | strip_html | truncatewords: 15 }}</p>
      </a>
      {% endif %}
      {% endfor %}
    </div>
    {% else %}
    <div class="empty-state reveal">
      <p>Drops incoming. The feed is warming up.</p>
    </div>
    {% endif %}
  </div>
</section>

<hr class="section-break">

<!-- QUICK SIGNALS -->
<section class="signals">
  <div class="container">
    <div class="feed__header">
      <h2 class="feed__title"><span class="label label--acid">SIGNALS</span> &nbsp;Quick Intel</h2>
    </div>
    <div class="signals__grid">
      {% for signal in site.data.homepage.quick_signals %}
      <div class="signal-card reveal">
        <div class="signal-card__top">
          <span class="badge badge--{{ signal.badge }}">{{ signal.badge }}</span>
        </div>
        <h4>{{ signal.title }}</h4>
        <p>{{ signal.text }}</p>
        {% if signal.tags %}
        <div class="signal-card__tags">
          {% for tag in signal.tags %}<span class="tag">{{ tag }}</span>{% endfor %}
        </div>
        {% endif %}
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<hr class="section-break">

<!-- VAULT PICKS -->
<section class="vault">
  <div class="container">
    <div class="feed__header">
      <h2 class="feed__title"><span class="label label--pink">VAULT</span> &nbsp;Curated Intel</h2>
      <a href="{{ '/library/' | relative_url }}" class="feed__link">Open Vault &rarr;</a>
    </div>
    <div class="vault__grid">
      {% for resource in site.data.homepage.vault_picks %}
      <a href="{{ resource.url }}" target="_blank" rel="noopener" class="vault-card reveal">
        <div class="vault-card__head">
          <h4>{{ resource.name }}</h4>
          {% if resource.badge %}<span class="badge badge--vault">{{ resource.badge }}</span>{% endif %}
        </div>
        <p>{{ resource.description }}</p>
      </a>
      {% endfor %}
    </div>
  </div>
</section>

<hr class="section-break">

<!-- TOOLS TEASER -->
<section class="toolkit">
  <div class="container">
    <div class="feed__header">
      <h2 class="feed__title"><span class="label label--lime">TOOLKIT</span> &nbsp;Field Tools</h2>
      <a href="{{ '/tools/' | relative_url }}" class="feed__link">Full Toolkit &rarr;</a>
    </div>
    <div class="toolkit__grid">
      {% for tool in site.data.homepage.tools_teaser %}
      <div class="tool-card reveal">
        <div class="tool-card__head">
          <h4>{{ tool.name }}</h4>
          {% if tool.status == "essential" %}
            <span class="badge badge--signal">essential</span>
          {% elsif tool.status == "recommended" %}
            <span class="badge badge--new">recommended</span>
          {% endif %}
        </div>
        <p>{{ tool.description }}</p>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<hr class="section-break">

<!-- MANIFESTO -->
<section class="manifesto">
  <div class="container">
    <div class="manifesto__inner reveal">
      <div class="label label--acid manifesto__label">{{ site.data.homepage.manifesto.label }}</div>
      <p class="manifesto__text">{{ site.data.homepage.manifesto.text }}</p>
      <p class="manifesto__sub">{{ site.data.homepage.manifesto.sub }}</p>
      <a href="{{ site.data.homepage.manifesto.link_url | relative_url }}" class="manifesto__link">{{ site.data.homepage.manifesto.link_text }} &rarr;</a>
    </div>
  </div>
</section>
