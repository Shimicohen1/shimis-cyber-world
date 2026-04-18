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
  <div class="feed-filters" style="margin-top: 0.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
    <button class="btn btn--sm btn--active" data-cvss-filter="all" onclick="filterVulns('all')">All</button>
    <button class="btn btn--sm btn--cvss-critical" data-cvss-filter="critical" onclick="filterVulns('critical')">Critical (9.0+)</button>
    <button class="btn btn--sm btn--cvss-high" data-cvss-filter="high" onclick="filterVulns('high')">High (7.0–8.9)</button>
    <button class="btn btn--sm btn--cvss-medium" data-cvss-filter="medium" onclick="filterVulns('medium')">Medium (4.0–6.9)</button>
    <button class="btn btn--sm btn--cvss-low" data-cvss-filter="low" onclick="filterVulns('low')">Low (&lt;4.0)</button>
  </div>
</div>

<div class="archive">
  <div class="archive__list" id="vuln-list">
    {% for post in site.posts %}
    {% if post.channel == "CVE Notify" or post.channel == "CISA KEV" or post.channel == "INCD" or post.channel == "NVD" or post.section == "vulnerabilities" %}
    {% if post.score == "HIGH" or post.score == "CRITICAL" or post.score == "MEDIUM" %}
    <div class="feed-entry" data-title="{{ post.title | downcase | escape }}" data-tags="{{ post.tags | join: ' ' | downcase }}" data-excerpt="{{ post.excerpt | strip_html | truncatewords: 20 | downcase | escape }}" data-score="{{ post.score }}" data-cvss="{{ post.cvss_score }}">
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
  var btns = document.querySelectorAll('[data-cvss-filter]');
  entries.forEach(function(el) {
    var score = parseFloat(el.getAttribute('data-cvss')) || 0;
    var sev = (el.getAttribute('data-score') || '').toUpperCase();
    var show = true;
    if (mode === 'critical') show = score >= 9.0 || sev === 'CRITICAL';
    else if (mode === 'high') show = (score >= 7.0 && score < 9.0) || (sev === 'HIGH' && score === 0);
    else if (mode === 'medium') show = (score >= 4.0 && score < 7.0) || (sev === 'MEDIUM' && score === 0);
    else if (mode === 'low') show = score > 0 && score < 4.0;
    el.style.display = show ? '' : 'none';
  });
  btns.forEach(function(b) {
    b.classList.toggle('btn--active', b.getAttribute('data-cvss-filter') === mode);
  });
  var countEl = document.getElementById('vuln-count');
  var visible = document.querySelectorAll('#vuln-list .feed-entry:not([style*="display: none"])').length;
  if (countEl) countEl.textContent = visible + ' vulnerabilities';
}
</script>

{% include newsletter.html %}
