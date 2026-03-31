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

    {% assign posts = site.posts | slice: 0, 6 %}
    {% if posts.size > 0 %}
    <div class="feed__list reveal">
      {% for post in posts %}
      <a href="{{ post.url | relative_url }}" class="feed-item{% if forloop.first %} feed-item--hero{% endif %}"{% if post.lang == 'he' %} dir="rtl" lang="he"{% endif %}>
        {% if post.image %}
        <div class="feed-item__img">
          <img src="{{ post.image | relative_url }}" alt="" loading="lazy">
        </div>
        {% else %}
        <div class="feed-item__img feed-item__img--placeholder">
          <span>{{ post.tags.first | upcase | truncate: 3, '' }}</span>
        </div>
        {% endif %}
        <div class="feed-item__body">
          <h3>{{ post.title }}</h3>
          <p>{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
          <div class="feed-item__meta">
            <time>{{ post.date | date: "%b %d, %Y" }}</time>
            {% if post.channel %}<span class="feed-item__sep">/</span><span>{{ post.channel }}</span>{% endif %}
            {% if post.score %}<span class="feed-item__sep">/</span><span class="feed-item__score feed-item__score--{{ post.score | downcase }}">{{ post.score }}</span>{% endif %}
            {% for tag in post.tags limit:2 %}<span class="feed-item__sep">/</span><span>{{ tag }}</span>{% endfor %}
          </div>
        </div>
      </a>
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
      <div class="signal-card reveal" tabindex="0">
        <div class="signal-card__top">
          <span class="badge badge--{{ signal.badge }}">{{ signal.badge }}</span>
          <span class="signal-card__toggle">&#9660;</span>
        </div>
        <h4>{{ signal.title }}</h4>
        <p class="signal-card__summary">{{ signal.text }}</p>
        <div class="signal-card__detail">
          <p>{{ signal.detail }}</p>
          {% if signal.link %}
          <a href="{{ signal.link }}" class="signal-card__link" target="_blank" rel="noopener noreferrer">{{ signal.link_label | default: 'Learn more' }} &rarr;</a>
          {% endif %}
        </div>
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

<!-- VAULT — RECENTLY ADDED -->
<section class="vault">
  <div class="container">
    <div class="feed__header">
      <h2 class="feed__title"><span class="label label--pink">VAULT</span> &nbsp;Recently Added</h2>
      <a href="{{ '/library/' | relative_url }}" class="feed__link">Open Vault &rarr;</a>
    </div>

    {% comment %}Collect all resources with dates, sort by added date{% endcomment %}
    {% assign all_resources = "" | split: "" %}
    {% for cat in site.data.resources.categories %}
      {% for sub in cat.subcategories %}
        {% for res in sub.resources %}
          {% assign r = res | map: "title" %}
          {% assign all_resources = all_resources | push: res %}
        {% endfor %}
      {% endfor %}
    {% endfor %}
    {% assign recent = all_resources | sort: "added" | reverse %}

    <div class="vault__grid">
      {% for resource in recent limit:6 %}
      <a href="{{ resource.url }}" target="_blank" rel="noopener" class="vault-card reveal">
        <div class="vault-card__head">
          <h4>{{ resource.title }}</h4>
          <span class="badge badge--vault">{{ resource.type }}</span>
        </div>
        <p class="vault-card__meta">Added {{ resource.added }}</p>
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
<section class="scw-manifesto">
  <div class="container">
    <div class="scw-manifesto-inner reveal">

      <div class="manifesto-line">
        What started as a community…
      </div>

      <div class="manifesto-line">
        became a place where people, companies, and startups connect,
        share, and stay ahead.
      </div>

      <div class="manifesto-grid">
        <div class="manifesto-item">real updates</div>
        <div class="manifesto-item">real discussions</div>
        <div class="manifesto-item">tools &amp; resources</div>
        <div class="manifesto-item">field insights</div>
        <div class="manifesto-item">what you won't find elsewhere</div>
      </div>

      <div class="manifesto-final">
        No noise. No marketing. Just real cyber.
      </div>

      <div class="manifesto-tag">
        Built from the community. Growing into much more.
      </div>

      <a href="{{ '/about/' | relative_url }}" class="manifesto-link">Read the full manifesto &rarr;</a>

      <div class="founder-sig">
        <img src="{{ '/assets/img/logos/logo.jpg' | relative_url }}" alt="SCW" class="founder-sig__logo">
        <span class="founder-sig__text">Founded by Shimi &middot; Driven by the community</span>
      </div>

    </div>
  </div>
</section>
