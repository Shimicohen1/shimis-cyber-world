---
title: "TCLBANKER Banking Trojan Targets 59 Financial Platforms via WhatsApp, Outlook Worms"
date: 2026-05-08 18:12:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, malware]
excerpt: "The Hacker News reports on a newly identified Brazilian banking trojan, TCLBANKER, which is actively targeting 59 distinct banking, fintech, and cryptocurrency platforms. Elastic S"
summary: "The Hacker News reports on a newly identified Brazilian banking trojan, TCLBANKER, which is actively targeting 59 distinct banking, fintech, and cryptocurrency platforms. Elastic Security Labs is tracking this activity under the moniker REF3076. This isn't some minor variant; The Hacker News indicat"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-018.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-018.png"
source_url: "https://thehackernews.com/2026/05/tclbanker-banking-trojan-targets.html"
tlp: "TLP:CLEAR"
event_type: "malware"
organizations:
  - name: "Elastic Security Labs"
    domain: "elastic.co"
    role: "researcher"
countries: [BR]
malware_families:
  - "Leverage"
  - "Global"
link_preview:
  url: "https://thehackernews.com/2026/05/tclbanker-banking-trojan-targets.html"
  title: "TCLBANKER Banking Trojan Targets Financial Platforms via WhatsApp and Outlook Worms"
  domain: "thehackernews.com"
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiWchpptUYeW4vXSUXfGq-uMzB1mr_dzsvX8XIWssIKzaWa4_eYbaLwec5Zos3xCoD0s8-LDcGI7Vj8DjFq6RtUY68HP21YudHYdsFS2xdyzQE7OPyuTlqyO2X9uwlSCRuVl9tAUwq0mvGuXlYkxjdmC7ynyAcIDpbejkR45ucf_L3VCDupSZMteOby7BUp/s1600/banking.jpg"
iocs:
  - id: "REF3076"
    type: "Banking Trojan"
    indicator: "TCLBANKER malware family"
  - id: "REF3076"
    type: "Malware Spreading Mechanism"
    indicator: "WhatsApp worm"
  - id: "REF3076"
    type: "Malware Spreading Mechanism"
    indicator: "Outlook worm"
  - id: "REF3076"
    type: "Malware Family"
    indicator: "Maverick (predecessor to TCLBANKER)"
  - id: "REF3076"
    type: "Malware Component"
    indicator: "SORVEPOTEL worm"
mitre_attack:
  - id: "T1189"
    name: "Drive-by Compromise"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1189/"
  - id: "T1071.001"
    name: "Web Protocols"
    tactic: "Command and Control"
    url: "https://attack.mitre.org/techniques/T1071/001/"
  - id: "T1566.001"
    name: "Phishing: Spearphishing Attachment"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1566/001/"
why_it_matters:
  - "If your organization operates in banking, fintech, or cryptocurrency, you are a direct target. Immediately reinforce user awareness campaigns against suspicious links and attachments, particularly those arriving via WhatsApp and Outlook. Review your endpoint detection and response (EDR) telemetry for any signs of SORVEPOTEL worm activity or unusual process execution related to communication apps. This isn't a future threat; it's active now."
bot_cta_title: "Track TCLBANKER's Impact on Your Sector"
bot_cta_description: "Use /breach to see the latest financial sector compromises or /brief for an analyst-ready summary of current threats."
---

The Hacker News reports on a newly identified Brazilian banking trojan, TCLBANKER, which is actively targeting 59 distinct banking, fintech, and cryptocurrency platforms. Elastic Security Labs is tracking this activity under the moniker REF3076. This isn't some minor variant; The Hacker News indicates TCLBANKER is a significant evolution of the Maverick malware family.

What makes TCLBANKER particularly nasty is its propagation method. According to The Hacker News, it leverages a worm, previously known as SORVEPOTEL, to spread aggressively. This worm utilizes both WhatsApp and Outlook, turning user communication channels into infection vectors. This means the threat isn't just about direct compromises but also about lateral movement through trusted social and business platforms.

This isn't just a Brazilian problem. While the origin is noted, banking trojans like this quickly go global, especially when they hit cryptocurrency platforms. Defenders need to recognize that the attacker's calculus here is pure financial gain, and they're willing to weaponize everyday communication tools to get it. This puts the onus on user education and robust endpoint protection.
