---
title: "China-Linked UAT-8302 APT Targets Governments in South America and Europe"
date: 2026-05-05 14:19:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, malware, the-hacker-news]
excerpt: "A China-nexus advanced persistent threat (APT) group, tracked by Cisco Talos as UAT-8302, is actively targeting government entities. The Hacker News reports that attacks have hit S"
summary: "A China-nexus advanced persistent threat (APT) group, tracked by Cisco Talos as UAT-8302, is actively targeting government entities. The Hacker News reports that attacks have hit South American government entities since late 2024, extending to government agencies in southeastern Europe in 2025. This"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 70
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-011.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-011.png"
source_url: "https://thehackernews.com/2026/05/china-linked-uat-8302-targets.html"
tlp: "TLP:CLEAR"
event_type: "espionage"
organizations:
  - name: "The Hacker News"
    domain: "thehackernews.com"
    role: "vendor"
threat_actors:
  - "UAT-8302"
countries: [AR, BO, BR, CL, CO, EC, GY, PY, PE, SR, UY, VE, AL, BA, BG, GR, HR, ME, MK, RO, RS, SI]
malware_families:
  - "Leverage"
  - "Nexus"
link_preview:
  url: "https://thehackernews.com/2026/05/china-linked-uat-8302-targets.html"
  title: "China-Linked UAT-8302 Targets Governments Using Shared APT Malware Across Regions"
  domain: "thehackernews.com"
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhcz8_PjYKknoot4F_PnjDZ7F1HhyphenhyphenIATFohYVF1OQYLSUFwiOPknnFF3ShgQKtKtfOEUbwUcfB-xhQAbi3dBsUvKki_ooKqYmQR3KfzcC1U443sR89JlLu5oPDJcEz9GXfEo5GwtMNj8s7HGg5-qsaR0sqqkSOUBsNFcqrz9NPDPyU6lQNl2RRtADTFzK0f/s1600/chinese-hackers-2.jpg"
iocs:
  - id: "UAT-8302"
    type: "APT Activity"
    indicator: "China-nexus APT group UAT-8302"
  - id: "UAT-8302"
    type: "Targeted Attack"
    indicator: "Government entities in South America (late 2024)"
  - id: "UAT-8302"
    type: "Targeted Attack"
    indicator: "Government agencies in southeastern Europe (2025)"
  - id: "UAT-8302"
    type: "Malware Deployment"
    indicator: "Custom-made malware families"
why_it_matters:
  - "If your government organization operates in South America or southeastern Europe, you are a primary target. Assume compromise and hunt for UAT-8302's custom malware. Focus on detecting post-exploitation activity, not just initial access. Review network logs for unusual outbound connections and anomalous user behavior, especially from systems that handle sensitive government data. Your adversaries are patient and well-resourced."
bot_cta_title: "Track UAT-8302 APT Activity"
bot_cta_description: "Use /actor UAT-8302 to see related threats and intelligence on this China-linked APT group."
---

A China-nexus advanced persistent threat (APT) group, tracked by Cisco Talos as UAT-8302, is actively targeting government entities. The Hacker News reports that attacks have hit South American government entities since late 2024, extending to government agencies in southeastern Europe in 2025. This group demonstrates a persistent, geographically diverse targeting strategy.

Post-exploitation, UAT-8302 deploys custom-made malware families, indicating a tailored approach rather than off-the-shelf tools. The use of shared APT malware across regions suggests a centralized development and operational structure, allowing the group to leverage proven tactics and tools against varied targets. This efficiency reduces development overhead and increases the speed of deployment.

This campaign underscores the persistent threat of state-sponsored espionage. Targeting government agencies in distinct geopolitical regions suggests intelligence gathering is the primary objective, rather than financial gain. The long-term nature of these campaigns, spanning across years, highlights the strategic patience and resourcefulness of such actors.
