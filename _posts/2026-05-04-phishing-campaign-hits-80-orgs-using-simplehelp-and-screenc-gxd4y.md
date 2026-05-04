---
title: "Phishing Campaign Leverages SimpleHelp, ScreenConnect RMM to Hit 80+ Orgs"
date: 2026-05-04 18:06:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, phishing, tools, the-hacker-news]
excerpt: "An active phishing campaign, codenamed VENOMOUS#HELPER, has been observed since at least April 2025, according to The Hacker News. This operation targets organizations by leveragin"
summary: "An active phishing campaign, codenamed VENOMOUS#HELPER, has been observed since at least April 2025, according to The Hacker News. This operation targets organizations by leveraging legitimate Remote Monitoring and Management (RMM) software, specifically SimpleHelp and ScreenConnect, to establish pe"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-042.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-042.png"
source_url: "https://thehackernews.com/2026/05/phishing-campaign-hits-80-orgs-using.html"
tlp: "TLP:CLEAR"
event_type: "phishing"
organizations:
  - name: "The Hacker News"
    domain: "thehackernews.com"
    role: "vendor"
countries: [US]
malware_families:
  - "Venomous"
link_preview:
  url: "https://thehackernews.com/2026/05/phishing-campaign-hits-80-orgs-using.html"
  title: "Phishing Campaign Hits 80+ Orgs Using SimpleHelp and ScreenConnect RMM Tools"
  domain: "thehackernews.com"
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjqa_ifaDYXI_GirxdHpZgSiE6fjnNdCmviv3QO9JsRvy1ddAWCRfoNd032ANB7pNfFMS4hLEwkfNHPHC5MNwkhK6XRjbe_y8qzWGpXRsdqhMnnUMGguScuIYtcUNQqQlmZkY4BUXy-ue6fAlor8LOfvEZNZrOq0JrIbOc2jXXAUBarqlodfdsIshRq7dXi/s1600/phishing-org.jpg"
iocs:
  - id: "VENOMOUS#HELPER"
    type: "Phishing"
    indicator: "Active phishing campaign targeting organizations since April 2025"
  - id: "VENOMOUS#HELPER"
    type: "Initial Access"
    indicator: "Use of legitimate SimpleHelp RMM software for remote access"
  - id: "VENOMOUS#HELPER"
    type: "Initial Access"
    indicator: "Use of legitimate ScreenConnect RMM software for remote access"
mitre_attack:
  - id: "T1566.002"
    name: "Phishing: Spearphishing Attachment"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1566/002/"
  - id: "T1204.002"
    name: "Malicious File: User Execution"
    tactic: "Execution"
    url: "https://attack.mitre.org/techniques/T1204/002/"
  - id: "T1071.004"
    name: "Application Layer Protocol: DNS"
    tactic: "Command and Control"
    url: "https://attack.mitre.org/techniques/T1071/004/"
why_it_matters:
  - "If your organization uses SimpleHelp or ScreenConnect, you need to audit access logs immediately for any unauthorized connections or suspicious installations. Implement strict MFA for all RMM access and ensure your phishing awareness training specifically covers social engineering tactics that trick users into installing legitimate remote access software. This isn't a vulnerability to patch; it's a TTP to detect."
bot_cta_title: "Check RMM-related threats"
bot_cta_description: "Use /brief to get an analyst-ready summary of similar threats and key IOCs."
---

An active phishing campaign, codenamed VENOMOUS#HELPER, has been observed since at least April 2025, according to The Hacker News. This operation targets organizations by leveraging legitimate Remote Monitoring and Management (RMM) software, specifically SimpleHelp and ScreenConnect, to establish persistent remote access on compromised systems.

The Hacker News reports that over 80 organizations have been impacted, with the majority located in the U.S. The use of trusted RMM tools is a classic attacker move: it blends in, making detection harder. This isn't about exploiting a vulnerability in the RMM itself, but rather tricking users into installing or approving legitimate software that then becomes an adversary's foothold.

This campaign underscores a critical blind spot for many defenders. It's not always about zero-days; often, it's about weaponizing legitimate tools through social engineering. Attackers aren't just looking for a way in; they're looking for a way to stay in, unnoticed, and RMM tools fit that bill perfectly by providing a backdoor that looks like business as usual.
