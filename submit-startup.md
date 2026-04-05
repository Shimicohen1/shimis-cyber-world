---
layout: page
title: Get Featured
permalink: /submit-startup/
---

<div class="page-head">
  <div class="label label--cyan page-head__label">COMMUNITY STAGE</div>
  <h1 class="page-head__title">Get Featured</h1>
  <p class="page-head__desc">Submit your startup to be showcased in front of SCW's community of thousands. Every listing is reviewed &mdash; only quality gets in.</p>
</div>

<form class="community-form" id="submitForm" novalidate>
  <div class="community-form__group">
    <label class="community-form__label" for="sf-name">Startup Name *</label>
    <input class="community-form__input" type="text" id="sf-name" name="name" required placeholder="e.g. ThreatNova">
  </div>

  <div class="community-form__group">
    <label class="community-form__label" for="sf-tagline">Tagline *</label>
    <input class="community-form__input" type="text" id="sf-tagline" name="tagline" required placeholder="One-liner — what do they do?">
    <p class="community-form__hint">Keep it short. 10 words max.</p>
  </div>

  <div class="community-form__group">
    <label class="community-form__label" for="sf-description">Description *</label>
    <textarea class="community-form__textarea" id="sf-description" name="description" required placeholder="What problem do they solve? What makes them different?"></textarea>
  </div>

  <div class="community-form__group">
    <label class="community-form__label" for="sf-category">Category *</label>
    <select class="community-form__select" id="sf-category" name="category" required>
      <option value="" disabled selected>Select a category</option>
      {% for cat in site.data.community.categories %}
      <option value="{{ cat }}">{{ cat }}</option>
      {% endfor %}
    </select>
  </div>

  <div class="community-form__group">
    <label class="community-form__label" for="sf-stage">Stage *</label>
    <select class="community-form__select" id="sf-stage" name="stage" required>
      <option value="" disabled selected>Select stage</option>
      {% for s in site.data.community.stages %}
      <option value="{{ s }}">{{ s | replace: '-', ' ' | capitalize }}</option>
      {% endfor %}
    </select>
  </div>

  <div class="community-form__group">
    <label class="community-form__label" for="sf-url">Website</label>
    <input class="community-form__input" type="url" id="sf-url" name="url" placeholder="https://...">
  </div>

  <div class="community-form__group">
    <label class="community-form__label" for="sf-location">Location</label>
    <input class="community-form__input" type="text" id="sf-location" name="location" placeholder="e.g. Tel Aviv, IL">
  </div>

  <div class="community-form__group">
    <label class="community-form__label" for="sf-tags">Tags</label>
    <input class="community-form__input" type="text" id="sf-tags" name="tags" placeholder="e.g. EDR, forensics, telemetry">
    <p class="community-form__hint">Comma-separated. Max 5 tags.</p>
  </div>

  <div class="community-form__group">
    <label class="community-form__label" for="sf-contact">Your Email</label>
    <input class="community-form__input" type="email" id="sf-contact" name="contact" placeholder="Optional — for follow-ups only">
  </div>

  <button type="submit" class="btn btn--primary" style="margin-top: .5rem;">Submit for Review</button>
</form>

<div class="community-form__success" id="submitSuccess" style="display: none;">
  <h3>Submission Received.</h3>
  <p>Our team will review your startup. If selected, you'll be featured on Community Stage &mdash; in front of thousands of cyber professionals.</p>
  <a href="{{ '/community/' | relative_url }}" class="btn btn--ghost btn--sm" style="margin-top: 1rem;">Back to Community Stage &rarr;</a>
</div>

<script src="{{ '/assets/js/submit-startup.js' | relative_url }}" defer></script>
<link rel="stylesheet" href="{{ '/assets/css/community.css' | relative_url }}">
