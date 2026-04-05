---
layout: page
title: SCW Community Stage
permalink: /community/
---

<div class="page-head">
  <div class="label label--cyan page-head__label">LAUNCHPAD</div>
  <h1 class="page-head__title">SCW Community Stage</h1>
  <p class="page-head__desc">A curated space for cybersecurity startups, founders, and innovation from the community.</p>
</div>

<!-- Intro -->
<section class="cs-intro reveal">
  <p>This is not a generic directory. <strong>SCW Community Stage</strong> is a curated platform for serious cybersecurity innovation &mdash; startups, tools, community-built projects, and early-stage companies that are pushing the field forward.</p>
  <p>Every entry is reviewed for quality and relevance. Visitors can discover emerging companies, practical tools, and community-driven projects &mdash; all hand-picked by the SCW ecosystem.</p>
  <div class="cs-intro__actions">
    <a href="#startups" class="btn btn--primary">Explore Startups</a>
    <a href="{{ '/submit-startup/' | relative_url }}" class="btn btn--ghost">Submit Your Startup</a>
  </div>
</section>

<hr class="section-break">

<!-- Featured Startups -->
<section class="page-section reveal" id="featured-section">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--cyan">FEATURED</span> &nbsp;Startups</h2>
  </div>
  <p class="cs-section__subtitle">Hand-picked by the SCW community for quality and innovation.</p>
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
  <p class="cs-section__subtitle">Explore the full directory of community-curated cybersecurity innovation.</p>

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
    <p>No matching startups found. Try adjusting your filters or <a href="{{ '/submit-startup/' | relative_url }}">submit a startup</a>.</p>
  </div>
</section>

<hr class="section-break">

<!-- Why Community Stage -->
<section class="page-section reveal">
  <div class="feed__header">
    <h2 class="feed__title"><span class="label label--acid">WHY</span> &nbsp;Community Stage?</h2>
  </div>
  <p class="cs-section__subtitle">The benefits of being featured in the SCW ecosystem.</p>
  <div class="cs-why__grid">
    <div class="tool-card reveal">
      <div class="tool-card__head">
        <h4>Visibility to the Cyber Community</h4>
        <span class="badge badge--signal">reach</span>
      </div>
      <p>Get discovered by security professionals, researchers, and decision-makers who actively follow the SCW ecosystem for the latest in cybersecurity.</p>
    </div>
    <div class="tool-card reveal">
      <div class="tool-card__head">
        <h4>Credibility Through Curated Exposure</h4>
        <span class="badge badge--drop">trust</span>
      </div>
      <p>Being featured on Community Stage signals quality. Every listing is reviewed &mdash; this isn't a generic ad board, it's a trusted recommendation.</p>
    </div>
    <div class="tool-card reveal">
      <div class="tool-card__head">
        <h4>Access to Customers, Partners &amp; Talent</h4>
        <span class="badge badge--partner">connect</span>
      </div>
      <p>Connect with the people who matter &mdash; potential customers, integration partners, and cybersecurity talent looking for innovative teams to join.</p>
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
        <p>Anyone building in the cybersecurity space &mdash; founders, solo builders, open-source maintainers, security teams with internal tools, and community contributors. You don't need to be a funded startup to apply.</p>
      </div>
    </div>
    <div class="cs-faq__item">
      <button class="cs-faq__q" aria-expanded="false">
        Is this only for startups?
        <svg class="cs-faq__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="cs-faq__a">
        <p>No. Community Stage welcomes startups, established companies with innovative products, community-built open-source tools, research projects, and any cyber-relevant initiative that delivers real value.</p>
      </div>
    </div>
    <div class="cs-faq__item">
      <button class="cs-faq__q" aria-expanded="false">
        Does every submission get published?
        <svg class="cs-faq__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="cs-faq__a">
        <p>No. Submissions are curated for quality and relevance. Not every submission will be published &mdash; we review each one to ensure it meets the standards of the SCW community. This is what makes Community Stage trustworthy.</p>
      </div>
    </div>
    <div class="cs-faq__item">
      <button class="cs-faq__q" aria-expanded="false">
        How do I submit?
        <svg class="cs-faq__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="cs-faq__a">
        <p>Click the "Submit Your Startup" button to fill out the submission form. Provide accurate details about your company, tool, or project. Our team will review your submission and get back to you if it's selected.</p>
      </div>
    </div>
  </div>
</section>

<hr class="section-break">

<!-- CTA -->
<section class="cs-cta reveal">
  <div class="cs-cta__box">
    <h2 class="cs-cta__title">Want to be featured on Community Stage?</h2>
    <p class="cs-cta__text">Whether you're a startup founder, a builder shipping cyber tools, or a community project pushing innovation &mdash; we want to hear from you.</p>
    <div class="cs-cta__actions">
      <a href="{{ '/submit-startup/' | relative_url }}" class="btn btn--primary">Submit a Startup</a>
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
