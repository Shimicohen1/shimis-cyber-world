---
layout: page
title: Vulnerabilities
permalink: /vulnerabilities/
---

<div class="page-head">
  <div class="label label--red page-head__label">CVE</div>
  <h1 class="page-head__title">Vulnerabilities</h1>
  <p class="page-head__desc">Live CVE feed — vulnerability disclosures tracked as they drop, sourced directly from the National Vulnerability Database.</p>
</div>

<div class="feed-controls">
  <div class="feed-search">
    <span class="feed-search__icon">&#128269;</span>
    <input type="text" class="feed-search__input" placeholder="Search CVEs..." id="vuln-search">
    <span class="feed-search__count" id="vuln-count"></span>
  </div>
  <div class="feed-filters" style="margin-top: 0.5rem; display: flex; gap: 0.5rem;">
    <button class="btn btn--sm btn--active" id="filter-all" onclick="filterVulns('all')">All</button>
    <button class="btn btn--sm" id="filter-high" onclick="filterVulns('high')">HIGH+ Only</button>
  </div>
</div>

<div class="archive">
  <div class="archive__list" id="vuln-list">
    {% for post in site.posts %}
    {% if post.channel == "CVE Notify" or post.channel == "CISA KEV" or post.channel == "INCD" or post.channel == "NVD" or post.section == "vulnerabilities" %}
    {% if post.score == "HIGH" or post.score == "CRITICAL" or post.score == "MEDIUM" %}
    <div class="feed-entry" data-title="{{ post.title | downcase | escape }}" data-tags="{{ post.tags | join: ' ' | downcase }}" data-excerpt="{{ post.excerpt | strip_html | truncatewords: 20 | downcase | escape }}" data-score="{{ post.score }}">
          {% include post-card.html %}
    </div>
    {% endif %}
    {% endif %}
    {% endfor %}
  </div>

  {% assign high_cve = site.posts | where: "channel", "CVE Notify" | where: "score", "HIGH" %}
  {% assign critical_cve = site.posts | where: "channel", "CVE Notify" | where: "score", "CRITICAL" %}
  {% assign high_kev = site.posts | where: "channel", "CISA KEV" | where: "score", "HIGH" %}
  {% assign critical_kev = site.posts | where: "channel", "CISA KEV" | where: "score", "CRITICAL" %}
  {% assign high_incd = site.posts | where: "channel", "INCD" | where: "score", "HIGH" %}
  {% assign critical_incd = site.posts | where: "channel", "INCD" | where: "score", "CRITICAL" %}
  {% assign nvd_all = site.posts | where: "channel", "NVD" %}
  {% assign cve_total = high_cve.size | plus: critical_cve.size | plus: high_kev.size | plus: critical_kev.size | plus: high_incd.size | plus: critical_incd.size | plus: nvd_all.size %}
  {% if cve_total == 0 %}
  <div class="empty-state" style="margin-top: 2rem;">
    <p>No vulnerabilities tracked yet. The CVE feed is warming up.</p>
  </div>
  {% endif %}

  <nav class="pagination" id="vuln-pagination" aria-label="Page navigation"></nav>
</div>

<div data-feed-pagination="vuln-list,vuln-search,vuln-count,vuln-pagination,20" style="display:none"></div>

<script>
function filterVulns(mode) {
  var entries = document.querySelectorAll('#vuln-list .feed-entry');
  var allBtn = document.getElementById('filter-all');
  var highBtn = document.getElementById('filter-high');
  entries.forEach(function(el) {
    if (mode === 'high') {
      var score = (el.getAttribute('data-score') || '').toUpperCase();
      el.style.display = (score === 'HIGH' || score === 'CRITICAL') ? '' : 'none';
    } else {
      el.style.display = '';
    }
  });
  if (mode === 'high') {
    highBtn.classList.add('btn--active');
    allBtn.classList.remove('btn--active');
  } else {
    allBtn.classList.add('btn--active');
    highBtn.classList.remove('btn--active');
  }
  // Re-trigger pagination count update
  var countEl = document.getElementById('vuln-count');
  var visible = document.querySelectorAll('#vuln-list .feed-entry:not([style*="display: none"])').length;
  if (countEl) countEl.textContent = visible + ' vulnerabilities';
}
</script>

{% include newsletter.html %}
