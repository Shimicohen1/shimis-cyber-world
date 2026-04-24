---
title: "Fake Crypto Wallets Flood App Store, Targeting User Seed Phrases"
date: 2026-04-24 11:48:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, malware]
excerpt: "The Apple App Store is hosting at least 26 fake cryptocurrency wallet applications designed to steal users' recovery phrases and private keys. The Hacker News reports that these ma"
summary: "The Apple App Store is hosting at least 26 fake cryptocurrency wallet applications designed to steal users' recovery phrases and private keys. The Hacker News reports that these malicious apps, active since at least fall 2025, impersonate legitimate wallet software. Once installed, they redirect use"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-043.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-043.png"
source_url: "https://thehackernews.com/2026/04/26-fakewallet-apps-found-on-apple-app.html"
tlp: "TLP:CLEAR"
event_type: "fraud"
mitre_attack:
  - id: "T1190"
    name: "Exploit Public-Facing Application"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1190/"
  - id: "T1598.003"
    name: "Phishing for Information"
    tactic: "Reconnaissance"
    url: "https://attack.mitre.org/techniques/T1598/003/"
  - id: "T1204.002"
    name: "Malicious File"
    tactic: "Execution"
    url: "https://attack.mitre.org/techniques/T1204/002/"
why_it_matters:
  - "If your users or stakeholders manage cryptocurrency, inform them immediately about this threat. They must audit their installed applications and be wary of any crypto wallet app not directly downloaded from the official developer's site. Advise them to revoke any seed phrases or private keys entered into suspicious applications and consider moving assets to a hardware wallet."
bot_cta_title: "Check for crypto wallet threats"
bot_cta_description: "Use /brief to get a summary of the latest threat intelligence."
---

The Apple App Store is hosting at least 26 fake cryptocurrency wallet applications designed to steal users' recovery phrases and private keys. The Hacker News reports that these malicious apps, active since at least fall 2025, impersonate legitimate wallet software. Once installed, they redirect users to fake browser pages mimicking the App Store, where they trick users into downloading trojanized versions of trusted wallets. This tactic exploits user trust and the desire for convenient crypto management.

Defenders must recognize that even curated app stores are not immune to sophisticated social engineering. Attackers are leveraging the growth of the cryptocurrency market to distribute malware disguised as essential tools. For individuals, this means extreme vigilance is required; never download wallet apps outside of direct verification from official project websites. For organizations, it's a reminder that user education on digital hygiene, especially concerning high-value assets like cryptocurrency, remains a critical, often overlooked, defense layer.
