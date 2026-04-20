---
title: "Bluesky Hit by 'Sophisticated' DDoS Attack"
date: 2026-04-20 13:57:00 +0000
source: RSS
source_name: "The Record by Recorded Future"
channel: "The Record by Recorded Future"
tags: [threat-intel, data-breach, government, microsoft]
excerpt: "The decentralized social network Bluesky experienced intermittent outages starting April 15, which The Record by Recorded Future attributed to a \"sophisticated\" Distributed Denial"
summary: "The decentralized social network Bluesky experienced intermittent outages starting April 15, which The Record by Recorded Future attributed to a \"sophisticated\" Distributed Denial of Service (DDoS) attack. The incident disrupted access for users on the platform. DDoS attacks, even against seemingly"
layout: post
section: live-feed
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-016.png"
author: research
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-016.png"
source_url: "https://therecord.media/bluesky-blames-app-outage-on-ddos"
tlp: "TLP:CLEAR"
event_type: "advisory"
organizations:
  - name: "Bluesky"
    domain: "bsky.app"
    role: "victim"
malware_families:
  - "BlueSky"
link_preview:
  url: "https://therecord.media/bluesky-blames-app-outage-on-ddos"
  title: "Bluesky blames app outage on ‘sophisticated’ DDoS attack"
  domain: "therecord.media"
  image: "https://cms.therecord.media/uploads/ave_calvar_yfoorpcm_WE_unsplash_d6fadfbf2e.jpg"
why_it_matters:
  - "If your organization relies on cloud-based services or maintains public-facing applications, this incident is a clear warning. Review your DDoS mitigation strategy immediately. Verify your upstream providers' capabilities and your own application-layer protections. Ensure your incident response plan specifically addresses high-volume DDoS scenarios, including communication protocols during outages."
bot_cta_title: "Latest Breaches and Cyber Events"
bot_cta_description: "Use /breach to see the latest breaches and ransomware events."
---

The decentralized social network Bluesky experienced intermittent outages starting April 15, which The Record by Recorded Future attributed to a "sophisticated" Distributed Denial of Service (DDoS) attack. The incident disrupted access for users on the platform.

DDoS attacks, even against seemingly resilient decentralized systems, highlight critical infrastructure vulnerabilities. While Bluesky's architecture aims for distributed resilience, the attack's success points to either a significant scale of attack or exploitable weaknesses in their edge protection or underlying infrastructure.

For defenders, this underscores that no online service is immune to volumetric attacks. It's a reminder to continuously evaluate and strengthen DDoS mitigation strategies, focusing on both network-layer and application-layer protections, and ensuring sufficient upstream capacity to absorb large-scale assaults. The attacker's calculus here is simple: disrupt service, cause reputational damage, and potentially probe for further weaknesses while defenders are occupied.
