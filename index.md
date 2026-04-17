---
layout: default
title: Home
description: "Shimi's Cyber World — A security intelligence hub powered by AI and human expertise. Real-time cyber threat feeds, curated tools, vulnerability alerts, and field-driven insights for the cybersecurity community."
---

{% include signal-bar.html %}

<!-- Affiliate verification -->
<div aria-hidden="true" class="sr-only">Impact-Site-Verification: ff92b508-81a2-4f2e-a96e-bbac08a8bbc9</div>

<!-- IDENTITY BLOCK -->
<section class="identity">
  <div class="container">
    <div class="identity__inner reveal">
      <div class="identity__left">
        <img src="{{ '/assets/img/logos/logo.jpg' | relative_url }}" alt="SCW" class="identity__logo" width="80" height="80" fetchpriority="high">
        <div class="identity__text">
          <h1 class="identity__title">{{ site.data.homepage.identity.title }}</h1>
          <p class="identity__tagline">{{ site.data.homepage.identity.tagline }}</p>
        </div>
      </div>
      <a href="{{ site.data.homepage.identity.cta_link.url | relative_url }}" class="identity__link">{{ site.data.homepage.identity.cta_link.text }}</a>
    </div>
  </div>
</section>

<!-- LIVE FEED -->
<section class="feed">
  <div class="container">
    <div class="feed__header">
      <h2 class="feed__title"><span class="label label--electric">LATEST</span> &nbsp;Posts</h2>
      <a href="{{ '/posts/' | relative_url }}" class="feed__link">View all &rarr;</a>
    </div>

    <div class="feed-filters feed-filters--compact" id="home-filters">
      <button class="filter-pill filter-pill--active" data-filter="all">All</button>
      <button class="filter-pill" data-filter="threat-intel">Threat Intel</button>
      <button class="filter-pill" data-filter="malware">Malware</button>
      <button class="filter-pill" data-filter="ransomware">Ransomware</button>
      <button class="filter-pill" data-filter="red-team">Red Team</button>
      <button class="filter-pill" data-filter="osint">OSINT</button>
      <button class="filter-pill" data-filter="tools">Tools</button>
      <button class="filter-pill" data-filter="data-breach">Data Breach</button>
    </div>

    {% assign non_cve_posts = site.posts | where_exp: "post", "post.channel != 'CVE Notify'" | where_exp: "post", "post.channel != 'NVD'" | where_exp: "post", "post.channel != 'INCD'" | where_exp: "post", "post.section != 'vulnerabilities'" %}
    {% assign posts = non_cve_posts | slice: 0, 30 %}
    {% assign ad_items = site.data.monetization.feed_ads.items %}
    {% assign ad_count = ad_items | size %}
    {% assign ad_shown = false %}
    {% if posts.size > 0 %}
    <div class="feed__list reveal" id="home-drops-list">
      {% for post in posts %}
      {% if forloop.index <= 3 %}{% assign img_loading = "eager" %}{% else %}{% assign img_loading = "lazy" %}{% endif %}
      <a href="{{ post.url | relative_url }}" class="feed-item home-drop{% if forloop.index > 6 %} home-drop--hidden{% endif %}" data-tags="{{ post.tags | join: ' ' | downcase }}"{% if post.lang == 'he' %} dir="rtl" lang="he"{% endif %}>
        {% if post.image %}
        <div class="feed-item__img">
          <img src="{{ post.image | relative_url }}" alt="" loading="{{ img_loading }}">
        </div>
        {% elsif post.cover_image %}
        <div class="feed-item__img feed-item__img--cover">
          <img src="{{ post.cover_image | relative_url }}" alt="" loading="{{ img_loading }}">
        </div>
        {% else %}
        <div class="feed-item__img feed-item__img--placeholder">
          <span>{{ post.tags.first | upcase | truncate: 3, '' }}</span>
        </div>
        {% endif %}
        <div class="feed-item__body">
          {% if post.featured %}<span class="badge badge--featured-sm">Featured</span>{% endif %}
          <h3>{{ post.title }}</h3>
          <p>{{ post.summary | default: post.excerpt | strip_html | truncatewords: 25 }}</p>
          <div class="feed-item__tags">
            {% for tag in post.tags %}{% unless tag == 'telegram' or tag == 'cyber' or tag == 'live-feed' or tag == 'security' or tag == 'news' %}<span class="tag tag--xs">{{ tag }}</span>{% endunless %}{% endfor %}
          </div>
          <div class="feed-item__meta">
            <time>{{ post.date | date: "%b %d, %Y %H:%M" }}</time>
            {% if post.author %}{% for a in site.data.authors %}{% if a.slug == post.author %}<span class="feed-item__sep">/</span><span class="feed-item__author">{{ a.name }}</span>{% endif %}{% endfor %}{% endif %}
            {% if post.score %}<span class="feed-item__sep">/</span><span class="feed-item__score feed-item__score--{{ post.score | downcase }}">{{ post.score }}</span>{% endif %}
          </div>
        </div>
      </a>
      {% comment %}── Single in-feed affiliate ad after 6th post ──{% endcomment %}
      {% if forloop.index == 6 and ad_shown == false and ad_count > 0 %}
        {% assign ad_shown = true %}
        {% assign ad_rand = "now" | date: "%S" | modulo: ad_count %}
        {% assign ad = ad_items[ad_rand] %}
        {% if ad.type == "premium-cta" %}
          {% include ad-slot.html type="feed-native" title=ad.title desc=ad.desc url=ad.url badge=ad.badge button="Explore SCW Elite →" %}
        {% else %}
          {% include ad-slot.html type="feed-native" title=ad.title desc=ad.desc url=ad.url badge=ad.badge %}
        {% endif %}
      {% endif %}
      {% endfor %}
    </div>
    {% else %}
    <div class="empty-state reveal">
      <p>Posts incoming. The feed is warming up.</p>
    </div>
    {% endif %}
  </div>
</section>

<!-- LATEST VULNERABILITIES -->
<section class="feed">
  <div class="container">
    <div class="feed__header">
      <h2 class="feed__title"><span class="label label--red">CVE</span> &nbsp;Latest Vulnerabilities</h2>
      <a href="{{ '/vulnerabilities/' | relative_url }}" class="feed__link">View all &rarr;</a>
    </div>

    {% assign cve_shown = 0 %}
    {% assign has_cve = false %}
    {% for post in site.posts %}
      {% if post.channel == "CVE Notify" or post.channel == "CISA KEV" or post.channel == "NVD" or post.channel == "INCD" or post.section == "vulnerabilities" %}
      {% if post.score == "HIGH" or post.score == "CRITICAL" %}
        {% if has_cve == false %}
          {% assign has_cve = true %}
    <div class="feed__list reveal">
        {% endif %}
        {% if cve_shown < 6 %}
      <a href="{{ post.url | relative_url }}" class="feed-item"{% if post.lang == 'he' %} dir="rtl" lang="he"{% endif %}>
        {% if post.image %}
        <div class="feed-item__img">
          <img src="{{ post.image | relative_url }}" alt="" loading="lazy">
        </div>
        {% elsif post.cover_image %}
        <div class="feed-item__img feed-item__img--cover">
          <img src="{{ post.cover_image | relative_url }}" alt="" loading="lazy">
        </div>
        {% else %}
        <div class="feed-item__img feed-item__img--placeholder">
          <span>CVE</span>
        </div>
        {% endif %}
        <div class="feed-item__body">
          <h3>{{ post.title }}</h3>
          <p>{{ post.summary | default: post.excerpt | strip_html | truncatewords: 25 }}</p>
          <div class="feed-item__tags">
            {% for tag in post.tags %}{% unless tag == 'telegram' or tag == 'cyber' or tag == 'live-feed' or tag == 'security' or tag == 'news' %}<span class="tag tag--xs">{{ tag }}</span>{% endunless %}{% endfor %}
          </div>
          <div class="feed-item__meta">
            <time>{{ post.date | date: "%b %d, %Y %H:%M" }}</time>
            {% if post.author %}{% for a in site.data.authors %}{% if a.slug == post.author %}<span class="feed-item__sep">/</span><span class="feed-item__author">{{ a.name }}</span>{% endif %}{% endfor %}{% endif %}
            {% if post.score %}<span class="feed-item__sep">/</span><span class="feed-item__score feed-item__score--{{ post.score | downcase }}">{{ post.score }}</span>{% endif %}
            {% if post.iocs and post.iocs.size > 0 %}<span class="feed-item__sep">/</span><span class="feed-item__ioc-badge" title="{{ post.iocs.size }} indicators">&#9873; {{ post.iocs.size }} IOC{% if post.iocs.size > 1 %}s{% endif %}</span>{% endif %}
          </div>
        </div>
      </a>
          {% assign cve_shown = cve_shown | plus: 1 %}
        {% endif %}
      {% endif %}
      {% endif %}
    {% endfor %}
    {% if has_cve %}
    </div>
    {% else %}
    <div class="empty-state reveal">
      <p>No vulnerabilities tracked yet.</p>
    </div>
    {% endif %}
  </div>
</section>

<hr class="section-break">

<!-- AdSense slot — between CVEs and Vault (activates when approved) -->
{% include ad-slot.html type="adsense" slot="home-mid" %}

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

<!-- TOOLS TEASER — 4 rotating sponsored tools -->
<section class="toolkit">
  <div class="container">
    <div class="feed__header">
      <h2 class="feed__title"><span class="label label--lime">TOOLKIT</span> &nbsp;Field Tools</h2>
      <a href="{{ '/tools/' | relative_url }}" class="feed__link">Full Toolkit &rarr;</a>
    </div>
    {% assign sponsored_tools = site.data.homepage.tools_teaser | where: "sponsored", true %}
    {% assign tool_seed = "now" | date: "%j" | plus: 0 %}
    {% assign tool_count = sponsored_tools | size %}
    {% assign tool_offset = tool_seed | modulo: tool_count %}
    <div class="toolkit__grid">
      {% for i in (0..3) %}
        {% assign idx = i | plus: tool_offset | modulo: tool_count %}
        {% assign tool = sponsored_tools[idx] %}
      <a href="{{ tool.url }}" target="_blank" rel="noopener noreferrer" class="tool-card tool-card--sponsored reveal" data-track="affiliate">
        <div class="tool-card__head">
          <h4>{{ tool.name }}</h4>
          {% if tool.status == "essential" %}
            <span class="badge badge--signal">essential</span>
          {% elsif tool.status == "recommended" %}
            <span class="badge badge--new">recommended</span>
          {% endif %}
        </div>
        <p>{{ tool.description }}</p>
      </a>
      {% endfor %}
    </div>
  </div>
</section>

<hr class="section-break">

<!-- MANIFESTO — compact -->
<section class="scw-manifesto scw-manifesto--compact">
  <div class="container">
    <div class="scw-manifesto-inner reveal">
      <p class="manifesto-oneliner">Where machines detect and humans decide. <a href="{{ '/about/' | relative_url }}" class="manifesto-link">Read the manifesto &rarr;</a></p>
    </div>
  </div>
</section>
