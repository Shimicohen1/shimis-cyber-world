---
title: "Linux Rootkit, macOS Crypto Stealer, WebSocket Skimmers Emerge"
date: 2026-05-11 12:36:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, malware, cloud]
excerpt: "The Hacker News reports a concerning week for defenders, highlighting a Linux rootkit, a macOS crypto stealer, and the persistent threat of WebSocket skimmers. This recap underscor"
summary: "The Hacker News reports a concerning week for defenders, highlighting a Linux rootkit, a macOS crypto stealer, and the persistent threat of WebSocket skimmers. This recap underscores a recurring theme: attackers are leveraging both novel techniques and exploiting long-standing, unpatched vulnerabili"
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
source_url: "https://thehackernews.com/2026/05/weekly-recap-linux-rootkit-macos-crypto.html"
tlp: "TLP:CLEAR"
event_type: "malware"
organizations:
  - name: "The Hacker News"
    domain: "thehackernews.com"
    role: "vendor"
link_preview:
  url: "https://thehackernews.com/2026/05/weekly-recap-linux-rootkit-macos-crypto.html"
  title: "⚡ Weekly Recap: Linux Rootkit, macOS Crypto Stealer, WebSocket Skimmers and More"
  domain: "thehackernews.com"
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiD4a3gzeAEAv4Bs5FqWbHG1cRyNqIOjygeSxxpNoChwyyMUWlbZHzkG0n8ysGpoAYuKqklfMtTKRct0OeYktaKLhdXpRH5pKH94tVaMX7iPeNDf7vZjFky3myBkFPJPl1xIdsWDlIYP30IeR7IZGhQZ5p82yHRdRO1OGkpAtTWgZcQSG3zXqh9tLbSSrgP/s1600/cyber-recap.jpg"
iocs:
  - id: "Weekly-Recap-2026-05"
    type: "Rootkit"
    indicator: "Linux Rootkit"
  - id: "Weekly-Recap-2026-05"
    type: "Information Disclosure"
    indicator: "macOS Crypto Stealer"
  - id: "Weekly-Recap-2026-05"
    type: "Code Injection"
    indicator: "WebSocket Skimmers"
mitre_attack:
  - id: "T1190"
    name: "Exploit Public-Facing Application"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1190/"
  - id: "T1608.001"
    name: "Stage Capabilities: Upload Malware"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1608/001/"
  - id: "T1204.002"
    name: "Malicious File"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1204/002/"
why_it_matters:
  - "If your organization relies on Linux or macOS systems, assume they are targets. Immediately audit your patch levels for all operating systems and critical software. Prioritize patching vulnerabilities that have been known for years; these are still actively exploited. Review cloud server configurations for unintended public access and ensure proper segmentation. For web applications, implement strict Content Security Policies (CSPs) to mitigate client-side skimming risks and regularly audit third-party scripts."
bot_cta_title: "Weekly Threat Briefing"
bot_cta_description: "Use /brief to get an analyst-ready weekly threat summary with severity rankings and key IOCs."
---

The Hacker News reports a concerning week for defenders, highlighting a Linux rootkit, a macOS crypto stealer, and the persistent threat of WebSocket skimmers. This recap underscores a recurring theme: attackers are leveraging both novel techniques and exploiting long-standing, unpatched vulnerabilities. The report details instances of poisoned trusted downloads and cloud servers being compromised, indicating a broad attack surface and a lack of fundamental security hygiene.

Attackers are clearly finding success by targeting known weaknesses and supply chain vectors. The mention of "bugs that should’ve died years ago" speaks volumes about the industry's struggle with basic patch management and configuration. The attacker's calculus remains simple: exploit the path of least resistance. Whether it's a zero-day or a decade-old CVE, if it grants access, they'll use it.

This isn't sophisticated nation-state tradecraft in every case; sometimes it's simply an opportunistic attacker stumbling into root access. The common thread is that these opportunities exist because organizations fail to implement foundational security controls and maintain their infrastructure. The consequence is predictable: compromised systems, data theft, and the ongoing erosion of trust.
