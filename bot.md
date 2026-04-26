---
layout: page
title: "SCW Intel Bot — Free CVE, Breach & Detection Rule Search on Telegram"
permalink: /bot/
description: "Free Telegram bot for security teams: search CVEs, check vendor exposure, get Sigma detection rules, and watchlist any organization for breach alerts. Built by a working CISO."
---

<div class="page-head">
  <div class="label label--electric page-head__label">FREE TOOL</div>
  <h1 class="page-head__title">SCW Intel Bot</h1>
  <p class="page-head__desc">A Telegram bot for security teams — free CVE search, vendor exposure checks, Sigma detection rules, and instant breach alerts.</p>
  <p class="post-cta-row">
    <a href="https://t.me/Shimiscyberworldbot?start=detect" target="_blank" rel="noopener" class="btn btn--accent">Open in Telegram →</a>
  </p>
</div>

<section class="page-section reveal prose">
  <h2>What it does</h2>
  <ul>
    <li><strong>/detect &lt;CVE-ID&gt;</strong> — Look up any CVE and get a free Sigma detection rule mapped to MITRE ATT&CK.</li>
    <li><strong>/org &lt;company&gt;</strong> — Check breaches, IOCs, and vendor exposure for any organization.</li>
    <li><strong>/watch &lt;domain&gt;</strong> — Free watchlist slot — get notified instantly when a vendor is breached.</li>
    <li><strong>/actor &lt;APT name&gt;</strong> — Pull the latest activity for known threat actors (LockBit, Scattered Spider, APT28…).</li>
    <li><strong>/brief</strong> — Daily security brief with curated CVEs and incidents.</li>
    <li><strong>SIEM rule conversion</strong> — Convert detection rules to Splunk SPL, Sentinel KQL, Elastic, QRadar, and Wazuh formats.</li>
  </ul>

  <h2>Who is it for?</h2>
  <p>Built for SOC analysts, threat hunters, blue teamers, CISOs, and security engineers who need fast, accurate intel without leaving Telegram.</p>

  <h2>Why Telegram?</h2>
  <p>Most security pros already live there. No new app, no signup, no cookies. Open the chat — get answers in seconds.</p>

  <h2>How is this different from NVD / Tenable / Rapid7?</h2>
  <p>Those are databases. SCW Intel Bot is an analyst layer on top of them — context, MITRE mapping, ready-to-use Sigma rules, organization-level enrichment, and a free watchlist. All curated by a working CISO.</p>
</section>

<section class="page-section reveal">
  <h2 class="page-section__title">Frequently Asked Questions</h2>
  <div class="prose">
    <h3>Is the bot free?</h3>
    <p>Yes. Search, watchlists, threat actor lookups, organization enrichment, and Sigma detection rules are free. Open the bot in Telegram to see the full list of available commands.</p>

    <h3>Do I need a Telegram account?</h3>
    <p>Yes — Telegram is free on iOS, Android, web, and desktop. Once installed, click <a href="https://t.me/Shimiscyberworldbot?start=detect" target="_blank" rel="noopener">this link</a> to open the bot.</p>

    <h3>Where does the data come from?</h3>
    <p>NVD, CISA KEV, INCD advisories, vendor security feeds, dark-web monitoring sources, and curated intelligence from Shimi Cohen — a working CISO and security community leader.</p>

    <h3>Is this affiliated with a SIEM vendor?</h3>
    <p>No. SCW is independent. We support Splunk, Microsoft Sentinel, Elastic, IBM QRadar, and Wazuh equally.</p>

    <h3>Can my company use it?</h3>
    <p>Yes — individual use is free. For team deployments or monitoring multiple organizations, contact us at <a href="mailto:admin@shimiscyberworld.com">admin@shimiscyberworld.com</a>.</p>

    <h3>Where can I report a bug or request a feature?</h3>
    <p>Reply directly inside the bot or email <a href="mailto:admin@shimiscyberworld.com">admin@shimiscyberworld.com</a>.</p>
  </div>
</section>

<section class="page-section reveal" style="text-align:center;">
  <h2 class="page-section__title">Open the bot</h2>
  <p><a href="https://t.me/Shimiscyberworldbot?start=detect" target="_blank" rel="noopener" class="btn btn--accent btn--lg">Launch SCW Intel Bot →</a></p>
</section>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SCW Intel Bot",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "iOS, Android, Web (via Telegram)",
  "description": "Free Telegram bot for security teams — CVE lookup, vendor exposure checks, Sigma detection rules, MITRE ATT&CK mapping, and breach watchlists.",
  "url": "https://shimiscyberworld.com/bot/",
  "downloadUrl": "https://t.me/Shimiscyberworldbot",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Shimi's Cyber World",
    "url": "https://shimiscyberworld.com"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is the SCW Intel Bot free?",
      "acceptedAnswer": {"@type": "Answer", "text": "Yes. Search, watchlists, threat actor lookups, organization enrichment, and Sigma detection rules are free. Open the bot in Telegram to see all available commands."}
    },
    {
      "@type": "Question",
      "name": "Do I need a Telegram account?",
      "acceptedAnswer": {"@type": "Answer", "text": "Yes — Telegram is free on iOS, Android, web, and desktop. Once installed, you can open the SCW Intel Bot via t.me/Shimiscyberworldbot."}
    },
    {
      "@type": "Question",
      "name": "Where does the bot's data come from?",
      "acceptedAnswer": {"@type": "Answer", "text": "NVD, CISA KEV, INCD advisories, vendor security feeds, dark-web monitoring sources, and curated intelligence from Shimi Cohen, a working CISO."}
    },
    {
      "@type": "Question",
      "name": "Is the bot affiliated with a SIEM vendor?",
      "acceptedAnswer": {"@type": "Answer", "text": "No. SCW is independent. We support Splunk, Microsoft Sentinel, Elastic, IBM QRadar, and Wazuh equally."}
    },
    {
      "@type": "Question",
      "name": "Can my company use the SCW Intel Bot?",
      "acceptedAnswer": {"@type": "Answer", "text": "Yes — individual use is free. For team deployments or monitoring multiple organizations, contact admin@shimiscyberworld.com."}
    }
  ]
}
</script>
