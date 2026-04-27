---
title: "73 Malicious VS Code Extensions Push GlassWorm v2 Malware"
date: 2026-04-27 11:23:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, malware, microsoft]
excerpt: "Researchers have identified a significant campaign, dubbed GlassWorm, targeting developers through the Open VSX repository. According to The Hacker News, 73 Visual Studio Code exte"
summary: "Researchers have identified a significant campaign, dubbed GlassWorm, targeting developers through the Open VSX repository. According to The Hacker News, 73 Visual Studio Code extensions were found to be cloned versions of legitimate tools, with six confirmed to be actively malicious. These extensio"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-014.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-014.png"
source_url: "https://thehackernews.com/2026/04/researchers-uncover-73-fake-vs-code.html"
tlp: "TLP:CLEAR"
event_type: "malware"
organizations:
  - name: "Microsoft"
    domain: "microsoft.com"
    role: "vendor"
malware_families:
  - "GlassWorm"
iocs:
  - id: "GlassWorm-v2-Campaign"
    type: "Information Disclosure"
    indicator: "Fake VS Code Extensions delivering GlassWorm v2 Malware"
  - id: "GlassWorm-v2-Campaign"
    type: "Misconfiguration"
    indicator: "Open VSX repository hosting malicious VS Code extensions"
  - id: "GlassWorm-v2-Campaign"
    type: "Code Injection"
    indicator: "Malicious VS Code extensions (6 confirmed malicious out of 73 identified)"
mitre_attack:
  - id: "T1189"
    name: "Drive-by Compromise"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1189/"
  - id: "T1071.004"
    name: "Web Protocols: DNS"
    tactic: "Command and Control"
    url: "https://attack.mitre.org/techniques/T1071/004/"
  - id: "T1041"
    name: "Exfiltration Over C2 Channel"
    tactic: "Exfiltration"
    url: "https://attack.mitre.org/techniques/T1041/"
why_it_matters:
  - "If your developers use VS Code, immediately audit all installed extensions, especially those from less-known or unofficial repositories like Open VSX. Remove any extensions that are not verified or are suspected clones. Ensure developers understand the risks of installing untrusted plugins and implement strict policies around IDE tool usage."
bot_cta_title: "Track VS Code malware threats"
bot_cta_description: "Use /brief to get a weekly summary of top threats, including malware campaigns."
---

Researchers have identified a significant campaign, dubbed GlassWorm, targeting developers through the Open VSX repository. According to The Hacker News, 73 Visual Studio Code extensions were found to be cloned versions of legitimate tools, with six confirmed to be actively malicious. These extensions are designed to steal information from unsuspecting developers, compromising sensitive code and credentials.

The attack vector relies on the trust developers place in integrated development environment (IDE) tools. By masquerading as popular extensions, these malicious packages can gain access to a developer's local machine and potentially their organization's network. The widespread use of VS Code makes this a particularly potent threat, potentially impacting a large number of software development professionals and the organizations they work for.
