---
layout: page
title: Community Stage
permalink: /community/
---

<div class="page-head">
  <div class="label label--cyan page-head__label">COMMUNITY STAGE</div>
  <h1 class="page-head__title">SCW Community Stage</h1>
  <p class="page-head__desc">The spotlight platform for cybersecurity startups. Get seen by thousands of security professionals, founders, and decision-makers.</p>
</div>

<!-- Intro -->
<section class="cs-intro reveal">
  <p><strong>SCW Community Stage</strong> puts your startup in front of the people who matter. Backed by one of the largest cybersecurity communities online, this is where startups &mdash; from seed to scale &mdash; showcase what they've built to an audience of security professionals, CISOs, investors, and builders.</p>
  <p>Every listing is curated. Every company is reviewed. If you're here, you earned it &mdash; and thousands of eyes in the cyber industry will see it.</p>
  <div class="cs-intro__actions">
    <a href="#startups" class="btn btn--primary">Explore Startups</a>
    <a href="{{ '/submit-startup.html' | relative_url }}" class="btn btn--ghost">Get Featured</a>
  </div>
</section>

<hr class="section-break">

<!-- Featured Startups -->
<section class="page-section reveal" id="featured-section">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--cyan">FEATURED</span> &nbsp;Startups</h2>
  </div>
  <p class="cs-section__subtitle">Handpicked by SCW. Trusted by the community.</p>
  <div class="cs-featured__grid">
    {% for startup in site.data.community.startups %}
    {% if startup.featured %}
    <div class="tool-card tool-card--featured cs-clickable reveal" data-name="{{ startup.name }}"{% if startup.insight %} data-insight="{{ startup.insight }}"{% endif %}{% if startup.why_it_matters %} data-why="{{ startup.why_it_matters }}"{% endif %}>
      <div class="tool-card__head">
        <h4>{{ startup.name }}</h4>
        {% if startup.stage == "seed" %}
          <span class="badge badge--new">seed</span>
        {% elsif startup.stage == "series-a" %}
          <span class="badge badge--signal">series A</span>
        {% elsif startup.stage == "series-b" %}
          <span class="badge badge--drop">series B</span>
        {% elsif startup.stage == "growth" %}
          <span class="badge badge--partner">growth</span>
        {% elsif startup.stage == "public" %}
          <span class="badge badge--vault">public</span>
        {% elsif startup.stage == "enterprise" %}
          <span class="badge badge--live">enterprise</span>
        {% endif %}
      </div>
      <p class="community-card__tagline">{{ startup.tagline }}</p>
      <p>{{ startup.description }}</p>
      {% if startup.tags %}
      <div class="tool-card__tags">
        {% for tag in startup.tags %}<span class="tag">{{ tag }}</span>{% endfor %}
      </div>
      {% endif %}
      <div class="community-card__meta">
        <span>{{ startup.location }}</span>
        <span class="feed-item__sep">/</span>
        <span>{{ startup.founded }}</span>
      </div>
      {% if startup.url %}
      <div class="tool-card__action">
        <a href="{{ startup.url }}" target="_blank" rel="noopener" class="btn btn--ghost btn--sm">Visit &rarr;</a>
      </div>
      {% endif %}
    </div>
    {% endif %}
    {% endfor %}
  </div>
</section>

<hr class="section-break">

<!-- Search & Filter -->
<section id="startups">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--cyan">DIRECTORY</span> &nbsp;All Startups</h2>
  </div>
  <p class="cs-section__subtitle">Browse every startup featured on Community Stage. Curated, not crowded.</p>

  <div class="vault-controls">
    <div class="vault-search">
      <svg class="vault-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="text" id="communitySearch" class="vault-search__input" placeholder="Search startups, categories, or keywords..." autocomplete="off">
      <span id="communityCount" class="vault-search__count">{{ site.data.community.startups | size }}</span>
    </div>
    <div class="vault-filters" id="communityFilters">
      <button class="vault-filter active" data-filter="all">All</button>
      {% for cat in site.data.community.categories %}
      <button class="vault-filter" data-filter="{{ cat | slugify }}">{{ cat }}</button>
      {% endfor %}
    </div>
  </div>

  <!-- Startup Grid -->
  <div class="toolkit__grid" id="communityGrid">
    {% for startup in site.data.community.startups %}
    <div class="tool-card cs-clickable reveal" data-category="{{ startup.category | slugify }}" data-name="{{ startup.name | downcase }}" data-tagline="{{ startup.tagline | downcase }}" data-tags="{{ startup.tags | join: ' ' | downcase }}"{% if startup.insight %} data-insight="{{ startup.insight }}"{% endif %}{% if startup.why_it_matters %} data-why="{{ startup.why_it_matters }}"{% endif %}>
      <div class="tool-card__head">
        <h4>{{ startup.name }}</h4>
        {% if startup.stage == "seed" %}
          <span class="badge badge--new">seed</span>
        {% elsif startup.stage == "series-a" %}
          <span class="badge badge--signal">series A</span>
        {% elsif startup.stage == "series-b" %}
          <span class="badge badge--drop">series B</span>
        {% elsif startup.stage == "growth" %}
          <span class="badge badge--partner">growth</span>
        {% elsif startup.stage == "public" %}
          <span class="badge badge--vault">public</span>
        {% elsif startup.stage == "enterprise" %}
          <span class="badge badge--live">enterprise</span>
        {% endif %}
      </div>
      <p class="community-card__tagline">{{ startup.tagline }}</p>
      <p>{{ startup.description }}</p>
      {% if startup.tags %}
      <div class="tool-card__tags">
        {% for tag in startup.tags %}<span class="tag">{{ tag }}</span>{% endfor %}
      </div>
      {% endif %}
      <div class="community-card__meta">
        <span>{{ startup.location }}</span>
        <span class="feed-item__sep">/</span>
        <span>{{ startup.founded }}</span>
      </div>
      {% if startup.url %}
      <div class="tool-card__action">
        <a href="{{ startup.url }}" target="_blank" rel="noopener" class="btn btn--ghost btn--sm">Visit &rarr;</a>
      </div>
      {% endif %}
    </div>
    {% endfor %}
  </div>

  <div class="empty-state" id="communityEmpty" style="display:none; margin-top: 2rem;">
    <p>No matching startups found. Try adjusting your filters or <a href="{{ '/submit-startup.html' | relative_url }}">get featured</a>.</p>
  </div>
</section>

<hr class="section-break">

<!-- Why Community Stage -->
<section class="page-section reveal">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--acid">WHY</span> &nbsp;Community Stage?</h2>
  </div>
  <p class="cs-section__subtitle">Why startups choose to showcase on SCW.</p>
  <div class="cs-why__grid">
    <div class="tool-card reveal">
      <div class="tool-card__head">
        <h4>Thousands of Eyes, Zero Noise</h4>
        <span class="badge badge--signal">reach</span>
      </div>
      <p>SCW's community includes thousands of security professionals, CISOs, researchers, and investors. Your startup gets seen by the right people &mdash; not lost in a generic directory.</p>
    </div>
    <div class="tool-card reveal">
      <div class="tool-card__head">
        <h4>Curated Means Credible</h4>
        <span class="badge badge--drop">trust</span>
      </div>
      <p>Not everyone gets listed. Every startup is reviewed for quality and relevance. Being on Community Stage is a signal &mdash; it tells the industry you're worth paying attention to.</p>
    </div>
    <div class="tool-card reveal">
      <div class="tool-card__head">
        <h4>Direct Access to the Ecosystem</h4>
        <span class="badge badge--partner">connect</span>
      </div>
      <p>This isn't a static listing. It's a front door to SCW's active ecosystem &mdash; potential customers, partners, talent, and the kind of exposure money can't always buy.</p>
    </div>
  </div>
</section>

<hr class="section-break">

<!-- FAQ -->
<section class="page-section reveal">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--lime">FAQ</span> &nbsp;Common Questions</h2>
  </div>
  <div class="cs-faq" id="csFaq">
    <div class="cs-faq__item">
      <button class="cs-faq__q" aria-expanded="false">
        Who can apply?
        <svg class="cs-faq__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="cs-faq__a">
        <p>Any cybersecurity startup &mdash; from pre-seed to growth stage. Whether you're a two-person team with a working prototype or a scaling company with enterprise clients, Community Stage is built for you. We also welcome established companies launching innovative new products.</p>
      </div>
    </div>
    <div class="cs-faq__item">
      <button class="cs-faq__q" aria-expanded="false">
        Is this only for startups?
        <svg class="cs-faq__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="cs-faq__a">
        <p>Community Stage is primarily for startups, but we also feature established companies with innovative products and community-built tools that bring real value to the cybersecurity space. If it's worth the community's attention, it belongs here.</p>
      </div>
    </div>
    <div class="cs-faq__item">
      <button class="cs-faq__q" aria-expanded="false">
        Does every submission get published?
        <svg class="cs-faq__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="cs-faq__a">
        <p>No. Every submission goes through a review process. We evaluate product quality, relevance, and real-world impact. This selectivity is what makes a Community Stage listing meaningful &mdash; it's a stamp of credibility, not a form submission.</p>
      </div>
    </div>
    <div class="cs-faq__item">
      <button class="cs-faq__q" aria-expanded="false">
        How do I submit?
        <svg class="cs-faq__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="cs-faq__a">
        <p>Click "Get Featured" and fill out the submission form. Provide accurate details about your startup &mdash; what you do, why it matters, and where you are in your journey. Our team reviews every submission and will reach out if your startup is selected.</p>
      </div>
    </div>
  </div>
</section>

<hr class="section-break">

<!-- CTA -->
<section class="cs-cta reveal">
  <div class="cs-cta__box">
    <h2 class="cs-cta__title">Your startup deserves to be seen.</h2>
    <p class="cs-cta__text">Join the startups already showcased in front of SCW's community of thousands &mdash; security leaders, investors, and builders who are actively looking for what's next in cyber.</p>
    <div class="cs-cta__actions">
      <a href="{{ '/submit-startup.html' | relative_url }}" class="btn btn--primary">Get Featured</a>
      <a href="{{ '/' | relative_url }}" class="btn btn--ghost">Back to SCW</a>
    </div>
  </div>
</section>

<!-- Startup Modal -->
<div class="cs-modal" id="csModal" role="dialog" aria-hidden="true">
  <div class="cs-modal__backdrop" id="csModalBackdrop"></div>
  <div class="cs-modal__content">
    <button class="cs-modal__close" id="csModalClose" aria-label="Close">&times;</button>
    <div class="cs-modal__header">
      <h3 class="cs-modal__name" id="modalName"></h3>
      <span class="cs-modal__stage" id="modalStage"></span>
    </div>
    <p class="community-card__tagline" id="modalTagline"></p>
    <p class="cs-modal__desc" id="modalDesc"></p>
    <div class="cs-modal__tags" id="modalTags"></div>
    <div class="cs-modal__block" id="modalInsightBlock" style="display:none;">
      <div class="cs-modal__block-label">SCW Insight</div>
      <p id="modalInsight"></p>
    </div>
    <div class="cs-modal__block" id="modalWhyBlock" style="display:none;">
      <div class="cs-modal__block-label">Why It Matters</div>
      <p id="modalWhy"></p>
    </div>
    <div class="community-card__meta" id="modalMeta"></div>
    <div class="cs-modal__actions">
      <a href="#" class="btn btn--primary btn--sm" id="modalWebsite" target="_blank" rel="noopener">Visit Website &rarr;</a>
      <button class="btn btn--ghost btn--sm" id="modalCloseBtn">Close</button>
    </div>
  </div>
</div>

<script src="{{ '/assets/js/community.js' | relative_url }}" defer></script>
<link rel="stylesheet" href="{{ '/assets/css/community.css' | relative_url }}">
