---
layout: page
title: "Topics — All Cybersecurity Tags"
permalink: /topics/
description: "Browse every cybersecurity topic covered on Shimi's Cyber World — CVEs, threat actors, ransomware families, MITRE ATT&CK techniques, vendors, and more."
---

<style>
.topic-cloud{display:flex;flex-wrap:wrap;gap:.4rem;margin:1.5rem 0}
.topic-cloud a{display:inline-flex;align-items:center;gap:.3rem;padding:.35rem .65rem;background:var(--card);border:1px solid var(--border);border-radius:6px;color:var(--white);text-decoration:none;font-size:.85rem;transition:all .15s}
.topic-cloud a:hover{border-color:var(--accent);color:var(--accent)}
.topic-cloud .count{color:var(--gray);font-size:.75rem;font-family:var(--f-mono)}
.topic-section{margin:2rem 0}
.topic-section h2{font-size:1.1rem;margin-bottom:.5rem;color:var(--accent)}
</style>

<p class="lead">Every topic covered on Shimi's Cyber World, grouped by category. Click any tag to see all related posts.</p>

{% assign all_tags = "" | split: "" %}
{% for post in site.posts %}{% unless post.hidden %}{% for t in post.tags %}{% assign all_tags = all_tags | push: t %}{% endfor %}{% endunless %}{% endfor %}
{% assign tag_freq = all_tags | group_by: nil | sort: 'size' | reverse %}

{% comment %}── Group by category ──{% endcomment %}
{% assign cve_tags = "" | split: "" %}
{% assign mitre_tags = "" | split: "" %}
{% assign other_tags = "" | split: "" %}
{% for grp in tag_freq %}
  {% assign tag = grp.name %}
  {% if tag contains 'CVE-' or tag contains 'cve-' %}{% assign cve_tags = cve_tags | push: grp %}
  {% elsif tag contains 'attack.' or tag contains 'mitre' %}{% assign mitre_tags = mitre_tags | push: grp %}
  {% else %}{% assign other_tags = other_tags | push: grp %}
  {% endif %}
{% endfor %}

<div class="topic-section">
  <h2>General topics ({{ other_tags | size }})</h2>
  <div class="topic-cloud">
    {% for grp in other_tags limit: 200 %}
      <a href="/posts/?tag={{ grp.name | url_encode }}" rel="nofollow">{{ grp.name }} <span class="count">{{ grp.size }}</span></a>
    {% endfor %}
  </div>
</div>

<div class="topic-section">
  <h2>MITRE ATT&CK techniques ({{ mitre_tags | size }})</h2>
  <div class="topic-cloud">
    {% for grp in mitre_tags limit: 150 %}
      <a href="/posts/?tag={{ grp.name | url_encode }}" rel="nofollow">{{ grp.name }} <span class="count">{{ grp.size }}</span></a>
    {% endfor %}
  </div>
</div>

<div class="topic-section">
  <h2>Tracked CVEs ({{ cve_tags | size }})</h2>
  <div class="topic-cloud">
    {% for grp in cve_tags limit: 300 %}
      <a href="/posts/?tag={{ grp.name | url_encode }}" rel="nofollow">{{ grp.name }} <span class="count">{{ grp.size }}</span></a>
    {% endfor %}
  </div>
</div>
