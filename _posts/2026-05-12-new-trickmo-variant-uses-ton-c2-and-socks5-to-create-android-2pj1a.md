---
title: "TrickMo Android Trojan Leverages TON for C2 and SOCKS5 Pivots"
date: 2026-05-12 12:50:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, malware]
excerpt: "A new variant of the TrickMo Android banking trojan has emerged, actively exploiting The Open Network (TON) for its command-and-control (C2) infrastructure. According to The Hacker"
summary: "A new variant of the TrickMo Android banking trojan has emerged, actively exploiting The Open Network (TON) for its command-and-control (C2) infrastructure. According to The Hacker News, citing observations by ThreatFabric between January and February 2026, this advanced version also utilizes SOCKS5"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-011.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-011.png"
source_url: "https://thehackernews.com/2026/05/new-trickmo-variant-uses-ton-c2-and.html"
tlp: "TLP:CLEAR"
event_type: "malware"
organizations:
  - name: "ThreatFabric"
    domain: "threatfabric.com"
    role: "vendor"
countries: [FR, IT, AT]
malware_families:
  - "TrickMo"
link_preview:
  url: "https://thehackernews.com/2026/05/new-trickmo-variant-uses-ton-c2-and.html"
  title: "New TrickMo Variant Uses TON C2 and SOCKS5 to Create Android Network Pivots"
  domain: "thehackernews.com"
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjbBy7H5qvorFUmJqREACqqxVC0ogVq88dP8wLyKyUPF9fCowpUSkb7foEsEPDALt0ccCpcJc6PXCJjFmQo0oX3furU-cYPULBa0-pjpiLGV04JD6kr4G0VIrvFoJo54WmgjU1YocsquA15N3hxDmwt4i82QpYdil7F4fI0SMFVv9YCkbqqGKjIi-dEmcIx/s1600/tricks.jpg"
iocs:
  - id: "TrickMo-TON-C2"
    type: "Information Disclosure"
    indicator: "TrickMo Android banking trojan"
  - id: "TrickMo-TON-C2"
    type: "Misconfiguration"
    indicator: "The Open Network (TON) for command-and-control (C2)"
  - id: "TrickMo-TON-C2"
    type: "Code Injection"
    indicator: "runtime-loaded APK (dex.module)"
mitre_attack:
  - id: "T1071.004"
    name: "Application Layer Protocol: DNS"
    tactic: "Command and Control"
    url: "https://attack.mitre.org/techniques/T1071/004/"
  - id: "T1572"
    name: "Protocol Tunneling"
    tactic: "Command and Control"
    url: "https://attack.mitre.org/techniques/T1572/"
  - id: "T1095"
    name: "Non-Application Layer Protocol"
    tactic: "Command and Control"
    url: "https://attack.mitre.org/techniques/T1095/"
why_it_matters:
  - "If your organization's employees use personal devices for work (BYOD) or access corporate resources, this TrickMo variant poses a direct risk. Advise users in France, Italy, and Austria, especially those with banking or crypto apps, to scrutinize app permissions and avoid sideloading. Implement robust mobile device management (MDM) policies and consider app attestation to prevent the installation of untrusted applications."
bot_cta_title: "Track Android banking threats"
bot_cta_description: "Use /country FR, /country IT, or /country AT to monitor threats targeting these regions."
---

A new variant of the TrickMo Android banking trojan has emerged, actively exploiting The Open Network (TON) for its command-and-control (C2) infrastructure. According to The Hacker News, citing observations by ThreatFabric between January and February 2026, this advanced version also utilizes SOCKS5 proxies to establish network pivots, enhancing its stealth and resilience.

This updated TrickMo variant is specifically targeting users of banking and cryptocurrency applications across France, Italy, and Austria. The Hacker News notes that the trojan's operational sophistication is elevated by its reliance on a runtime-loaded APK module (`dex.module`), a technique that complicates detection and analysis. This approach allows the malware to dynamically load malicious components, adapting its attack surface post-infection.

The use of TON for C2 is a significant shift, providing attackers with a decentralized and encrypted communication channel that is inherently more resistant to traditional takedowns and surveillance. Coupled with SOCKS5 for network pivoting, this variant presents a formidable threat, enabling attackers to route traffic through compromised devices and evade direct attribution. It's a clear move to harden infrastructure against law enforcement and security industry efforts.
