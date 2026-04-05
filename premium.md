---
layout: default
title: Premium Toolkit
permalink: /premium/
---

<div class="container">
<div class="premium-hero reveal">
<span class="premium-hero__icon">🔒</span>
<h1 class="premium-hero__title"><span>Premium</span> Toolkit</h1>
<p class="premium-hero__desc">Custom-built tools for real-world cybersecurity operations. Exclusive automations, scanners, and field utilities — developed by SCW for premium members.</p>
</div>

{% comment %}
=== PRICING SECTION (hidden until tools are ready) ===
{% endcomment %}
{% if false %}
<section class="premium-pricing reveal">
<div class="premium-pricing__box">
<span class="premium-pricing__badge">Membership Plans</span>
<div class="premium-pricing__plans">
<div class="premium-plan">
<h3 class="premium-plan__name">Pro</h3>
<div class="premium-plan__price"><span class="premium-plan__amount">$29</span><span class="premium-plan__period">/mo</span></div>
<p class="premium-plan__detail">All 6 tools, labs, priority updates</p>
<div class="premium-plan__annual">or <strong>$279/yr</strong> <span class="premium-plan__save">save 20%</span></div>
</div>
<div class="premium-plan premium-plan--highlight">
<span class="premium-plan__popular">FOR TEAMS</span>
<h3 class="premium-plan__name">Team</h3>
<div class="premium-plan__price"><span class="premium-plan__amount">$79</span><span class="premium-plan__period">/mo</span></div>
<p class="premium-plan__detail">Pro + 5 seats, shared workspace</p>
<div class="premium-plan__annual">or <strong>$749/yr</strong> <span class="premium-plan__save">save 21%</span></div>
</div>
</div>
<p class="premium-pricing__note">Launching soon — join the waitlist to lock in early-access pricing.</p>
</div>
</section>
{% endif %}

<section class="premium-tools-live">
<div class="feed__header">
<h2 class="feed__title"><span class="label label--cyan">LIVE</span> &nbsp;Available Now</h2>
</div>
<div class="premium-tools__grid">

<a href="/detections/" class="premium-tool-card premium-tool-card--live reveal" style="text-decoration:none;">
<div class="premium-tool-card__content">
<span class="premium-tool-card__icon">🎯</span>
<h4>Detection Library</h4>
<p>Production-ready detection rules for KQL, Sigma, and Splunk — mapped to MITRE ATT&CK. Copy, paste, detect.</p>
<span class="premium-tool-card__tag">Detection</span>
</div>
</a>

<a href="/playbooks/" class="premium-tool-card premium-tool-card--live reveal" style="text-decoration:none;">
<div class="premium-tool-card__content">
<span class="premium-tool-card__icon">📋</span>
<h4>Incident Playbooks</h4>
<p>Step-by-step response playbooks for every attack type. Phase-by-phase actions from detection to recovery.</p>
<span class="premium-tool-card__tag">Incident Response</span>
</div>
</a>

</div>
</section>

<section class="premium-tools">
<div class="feed__header">
<h2 class="feed__title"><span class="label label--amber">COMING SOON</span> &nbsp;In Development</h2>
</div>
<div class="premium-tools__grid">

<div class="premium-tool-card premium-tool-card--locked reveal">
<div class="premium-tool-card__lock"><span>🔒</span></div>
<div class="premium-tool-card__content">
<span class="premium-tool-card__icon">🛡️</span>
<h4>SCW Recon Suite</h4>
<p>Automated recon pipeline — chains subdomain enum, port scanning, tech fingerprinting into one command.</p>
<span class="premium-tool-card__tag">Automation</span>
</div>
</div>

<div class="premium-tool-card premium-tool-card--locked reveal">
<div class="premium-tool-card__lock"><span>🔒</span></div>
<div class="premium-tool-card__content">
<span class="premium-tool-card__icon">⚡</span>
<h4>API Vuln Scanner</h4>
<p>Targeted API security scanner — tests auth bypass, IDOR, rate limiting, injection across REST and GraphQL endpoints.</p>
<span class="premium-tool-card__tag">Scanner</span>
</div>
</div>

<div class="premium-tool-card premium-tool-card--locked reveal">
<div class="premium-tool-card__lock"><span>🔒</span></div>
<div class="premium-tool-card__content">
<span class="premium-tool-card__icon">🔧</span>
<h4>Payload Forge</h4>
<p>Quick payload builder for XSS, SQLi, SSTI, and command injection — with encoding, obfuscation, and WAF bypass options.</p>
<span class="premium-tool-card__tag">Utility</span>
</div>
</div>

<div class="premium-tool-card premium-tool-card--locked reveal">
<div class="premium-tool-card__lock"><span>🔒</span></div>
<div class="premium-tool-card__content">
<span class="premium-tool-card__icon">📊</span>
<h4>Report Generator</h4>
<p>Turn raw findings into professional, client-ready security reports. Markdown in, styled PDF out.</p>
<span class="premium-tool-card__tag">Reporting</span>
</div>
</div>

<div class="premium-tool-card premium-tool-card--locked reveal">
<div class="premium-tool-card__lock"><span>🔒</span></div>
<div class="premium-tool-card__content">
<span class="premium-tool-card__icon">🧪</span>
<h4>SCW Labs</h4>
<p>Pre-built vulnerable environments with guided challenges. Practice real attack techniques in a safe sandbox.</p>
<span class="premium-tool-card__tag">Training</span>
</div>
</div>

<div class="premium-tool-card premium-tool-card--locked reveal">
<div class="premium-tool-card__lock"><span>🔒</span></div>
<div class="premium-tool-card__content">
<span class="premium-tool-card__icon">🔍</span>
<h4>Cloud Config Auditor</h4>
<p>Scan AWS, Azure, and GCP configs for misconfigurations, exposed storage, and IAM privilege escalation paths.</p>
<span class="premium-tool-card__tag">Cloud Security</span>
</div>
</div>

</div>
</section>

<section class="premium-includes reveal">
<div class="feed__header">
<h2 class="feed__title">What Members Get</h2>
</div>
<div class="premium-includes__grid">
<div class="premium-include">
<span class="premium-include__icon">🔓</span>
<h4>Full Tool Access</h4>
<p>Unlock all premium tools — current and future releases.</p>
</div>
<div class="premium-include">
<span class="premium-include__icon">🚀</span>
<h4>Priority Updates</h4>
<p>Get new tools and features before anyone else.</p>
</div>
<div class="premium-include">
<span class="premium-include__icon">💬</span>
<h4>Members-Only Channel</h4>
<p>Direct access to the SCW dev team for support and requests.</p>
</div>
<div class="premium-include">
<span class="premium-include__icon">🔄</span>
<h4>Continuous Development</h4>
<p>New tools ship regularly. Your membership funds the pipeline.</p>
</div>
</div>
</section>

<section class="premium-cta reveal">
<div class="premium-cta__box">
<span class="premium-cta__badge">Early Access</span>
<h3 class="premium-cta__title">Premium launches soon.</h3>
<p class="premium-cta__text">The first batch of tools is in development. Join the waitlist now and lock in early-access pricing when we go live.</p>
<a href="#" class="btn btn--premium btn--disabled" data-track="premium">Join Waitlist</a>
</div>
</section>
</div>

<link rel="stylesheet" href="{{ '/assets/css/premium-tools.css' | relative_url }}">
