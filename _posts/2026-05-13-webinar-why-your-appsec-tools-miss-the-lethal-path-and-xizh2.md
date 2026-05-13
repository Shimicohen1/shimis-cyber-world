---
title: "AppSec Tools Miss 'Lethal Paths' to Data, Say Wiz and Okta/GitLab"
date: 2026-05-13 11:52:43 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, cloud, tools]
excerpt: "The Hacker News highlights a critical flaw in traditional Application Security (AppSec) approaches: the overwhelming volume of 'toast' alerts that desensitize security teams. Accor"
summary: "The Hacker News highlights a critical flaw in traditional Application Security (AppSec) approaches: the overwhelming volume of 'toast' alerts that desensitize security teams. According to The Hacker News, this alert fatigue means defenders often miss the actual 'Lethal Chain' — the interconnected, s"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-039.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-039.png"
source_url: "https://thehackernews.com/2026/05/webinar-why-your-appsec-tools-miss.html"
tlp: "TLP:CLEAR"
event_type: "advisory"
organizations:
  - name: "Wiz"
    domain: "wiz.io"
    role: "vendor"
  - name: "Okta"
    domain: "okta.com"
    role: "vendor"
  - name: "GitLab"
    domain: "gitlab.com"
    role: "vendor"
malware_families:
  - "SmokeLoader"
  - "STOP"
link_preview:
  url: "https://thehackernews.com/2026/05/webinar-why-your-appsec-tools-miss.html"
  title: "[Webinar] Why Your AppSec Tools Miss the"
  domain: "thehackernews.com"
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh-X1ZWS1wjhotRXh44H3uH6bxJmz3fwKA9tFIuYxCVV_b_BhzNKscxBa_St0ybBNSIpHYTlgBf0YvsuY1B2FUJebmGwtpkgeDh7DutT4ERpurg_iRTfDNbyWWzFOt5Z8PLGDu-kywwNTPdNVK_UDcAC8ZzdFCry5xDvx8c8l9QtNJKk6J4ZQVRIpvAfzwf/s1600/wiz.jpg"
mitre_attack:
  - id: "T1496"
    name: "Resource Hijacking"
    tactic: "Defense Evasion"
    url: "https://attack.mitre.org/techniques/T1496/"
  - id: "T1595.002"
    name: "Scanning IP Blocks"
    tactic: "Reconnaissance"
    url: "https://attack.mitre.org/techniques/T1595/002/"
  - id: "T1071.001"
    name: "Web Protocols"
    tactic: "Command and Control"
    url: "https://attack.mitre.org/techniques/T1071/001/"
why_it_matters:
  - "If your AppSec program is drowning in alerts, you're likely missing the real threats. Stop focusing solely on individual vulnerability counts. Shift your strategy to analyze how minor flaws can be chained together to form a 'Lethal Path' to your critical assets. Prioritize fixing vulnerabilities that are part of a demonstrated or potential attack chain, rather than just the highest CVSS score. This requires a deeper understanding of attacker methodologies and how your various security tools contribute to a holistic view of risk."
bot_cta_title: "Understand AppSec Gaps"
bot_cta_description: "Use /brief to get an analyst-ready weekly threat summary that includes strategic context and severity rankings."
---

The Hacker News highlights a critical flaw in traditional Application Security (AppSec) approaches: the overwhelming volume of 'toast' alerts that desensitize security teams. According to The Hacker News, this alert fatigue means defenders often miss the actual 'Lethal Chain' — the interconnected, seemingly minor vulnerabilities that attackers string together to achieve a breach.

The publication emphasizes that security tools frequently operate like smoke alarms, generating noise for every small issue rather than identifying how these issues combine into an exploitable attack path. This disconnect between individual vulnerability detection and understanding the full attack chain is a significant blind spot for many organizations. Experts from Wiz and Okta/GitLab are cited by The Hacker News as advocating for a shift in focus, urging defenders to look beyond isolated flaws and understand the attacker's calculus in connecting these dots to reach sensitive data.

This isn't about finding more vulnerabilities; it's about understanding their strategic relevance. Attackers don't just exploit single CVEs; they chain them. If your AppSec tools aren't mapping these kill chains, you're only seeing fragments of the real threat landscape. The Hacker News points to a need for tools and strategies that contextualize vulnerabilities within potential attack flows, moving beyond a simple count of findings.
