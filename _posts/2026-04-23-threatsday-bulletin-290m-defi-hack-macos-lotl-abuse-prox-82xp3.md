---
title: "Supply Chain Exploits & DeFi Hacks: Old Bugs, New Targets"
date: 2026-04-23 13:17:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, malware]
excerpt: "The cybersecurity landscape continues to see a troubling recurrence of familiar vulnerabilities, despite their long-standing presence. According to The Hacker News, incidents frequ"
summary: "The cybersecurity landscape continues to see a troubling recurrence of familiar vulnerabilities, despite their long-standing presence. According to The Hacker News, incidents frequently surface that leverage 'same bugs, same mistakes,' indicating a persistent failure to address fundamental security"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 70
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-050.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-050.png"
source_url: "https://thehackernews.com/2026/04/threatsday-bulletin-290m-defi-hack.html"
tlp: "TLP:CLEAR"
event_type: "supply-chain"
malware_families:
  - "Leverage"
iocs:
  - id: "ThreatsDay-Bulletin-2026-04"
    type: "Information Disclosure"
    indicator: "Supply chain compromise leading to data theft"
  - id: "ThreatsDay-Bulletin-2026-04"
    type: "Code Injection"
    indicator: "Supply chain compromise leading to backdoor insertion"
  - id: "ThreatsDay-Bulletin-2026-04"
    type: "Misconfiguration"
    indicator: "Unchecked packages in software supply chain"
mitre_attack:
  - id: "T1195"
    name: "Supply Chain Compromise"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1195/"
  - id: "T1078"
    name: "Valid Accounts"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1078/"
  - id: "T1595"
    name: "Vulnerability Scanning"
    tactic: "Reconnaissance"
    url: "https://attack.mitre.org/techniques/T1595/"
why_it_matters:
  - "If your organization relies on third-party software or open-source packages, assume they are potential vectors. Immediately audit your software supply chain for unchecked dependencies and ensure robust vulnerability management is in place. Review your incident response plans for DeFi-related attacks and macOS LotL abuse, as these are actively exploited."
bot_cta_title: "Track Supply Chain & DeFi Threats"
bot_cta_description: "Use /brief to get an analyst-ready weekly threat summary covering supply chain attacks and financial sector threats."
---

The cybersecurity landscape continues to see a troubling recurrence of familiar vulnerabilities, despite their long-standing presence. According to The Hacker News, incidents frequently surface that leverage 'same bugs, same mistakes,' indicating a persistent failure to address fundamental security hygiene. This includes the widespread abuse of the supply chain, where unchecked packages are exploited to steal data, implant backdoors, and propagate malware. This pattern underscores that attackers often find it more efficient to target the underlying systems supporting applications rather than directly attacking the applications themselves.

This trend highlights a critical challenge for defenders: the exploitation of simple, yet effective, vulnerabilities. The Hacker News bulletin emphasizes that these exploits remain viable because they often go unaddressed, or are only patched superficially. This allows attackers to achieve significant impact, as demonstrated by a reported $290 million DeFi hack, alongside abuses like macOS LotL (Living off the Land) techniques and ProxySmart SIM farms. The attacker's calculus is clear: low-effort exploits against poorly secured infrastructure yield high returns, making the software supply chain a prime vector.

For CISOs, this means a renewed focus on foundational security and supply chain integrity is non-negotiable. The sheer volume of incidents, including 25 new stories detailed by The Hacker News, points to an environment where basic security gaps are continually leveraged. Prioritizing robust vendor security assessments, scrutinizing third-party code dependencies, and implementing comprehensive vulnerability management are not just best practices; they are critical survival strategies against these persistent and evolving threats.
