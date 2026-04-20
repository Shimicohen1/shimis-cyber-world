---
title: "Old Scams, New Tricks: From Fake Shipments to Zero-Days"
date: 2026-04-20 07:02:00 +0000
source: RSS
source_name: "Malwarebytes Blog"
channel: "Malwarebytes Blog"
tags: [malware, threat-intel, ransomware, vulnerability, data-breach, cloud, microsoft, ai-security]
excerpt: "Malwarebytes Blog highlighted a relentless wave of attacks, demonstrating that even 'old-school' scams still net victims. Phishing emails disguised as shipment notifications or iCl"
summary: "Malwarebytes Blog highlighted a relentless wave of attacks, demonstrating that even 'old-school' scams still net victims. Phishing emails disguised as shipment notifications or iCloud storage alerts now deliver remote access tools and demand payment details, respectively. This underscores a critical"
layout: post
section: vulnerabilities
score: HIGH
curated: false
featured: false
priority: 75
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-009.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-009.png"
source_url: "https://www.malwarebytes.com/blog/news/2026/04/a-week-in-security-april-13-april-19"
tlp: "TLP:CLEAR"
event_type: "advisory"
organizations:
  - name: "Malwarebytes"
    domain: "malwarebytes.com"
    role: "vendor"
  - name: "Booking.com"
    domain: "booking.com"
    role: "victim"
  - name: "Proton VPN"
    domain: "protonvpn.com"
    role: "vendor"
  - name: "Slack"
    domain: "slack.com"
    role: "vendor"
  - name: "iCloud"
    domain: "apple.com"
    role: "vendor"
  - name: "Adobe"
    domain: "adobe.com"
    role: "vendor"
  - name: "Google"
    domain: "google.com"
    role: "vendor"
  - name: "Microsoft"
    domain: "microsoft.com"
    role: "vendor"
malware_families:
  - "Guard"
link_preview:
  url: "https://www.malwarebytes.com/blog/news/2026/04/a-week-in-security-april-13-april-19"
  title: "A week in security (April 13 - April 19)"
  domain: "malwarebytes.com"
  image: "https://www.malwarebytes.com/wp-content/uploads/sites/2/2023/11/Week_in_Security.jpg"
iocs:
  - id: "Adobe-Reader-Zero-Day"
    type: "Code Injection"
    indicator: "Adobe Reader vulnerable to zero-day via PDF file"
  - id: "Windows-Infostealer"
    type: "Information Disclosure"
    indicator: "Windows infostealer distributed via fake Proton VPN sites and gaming mods"
  - id: "Omnistealer"
    type: "Information Disclosure"
    indicator: "Omnistealer uses blockchain to steal data"
  - id: "Fake-Slack-Download"
    type: "RCE"
    indicator: "Fake Slack download installs remote access software"
  - id: "Booking.com-Breach"
    type: "Information Disclosure"
    indicator: "Booking.com breach exposes guest data for scam targeting"
mitre_attack:
  - id: "T1566"
    name: "Phishing"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1566/"
  - id: "T1204.001"
    name: "Malicious Link"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1204/001/"
  - id: "T1190"
    name: "Exploit Public-Facing Application"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1190/"
why_it_matters:
  - "If your organization's users are susceptible to phishing, they are likely clicking on these 'shipment arrived' or 'iCloud full' scams, potentially installing remote access software or handing over credentials. Ensure your security awareness training directly addresses these common social engineering tactics. For your IT teams, immediately prioritize April's Patch Tuesday updates, especially for the actively exploited zero-day, and verify all Adobe Reader installations are patched against the PDF-related zero-day. Audit for any unauthorized remote access tools or suspicious Slack client installations."
bot_cta_title: "Track the Latest Vulnerabilities and Breaches"
bot_cta_description: "Use /brief to get an analyst-ready weekly threat summary with severity rankings and key IOCs."
---

Malwarebytes Blog highlighted a relentless wave of attacks, demonstrating that even 'old-school' scams still net victims. Phishing emails disguised as shipment notifications or iCloud storage alerts now deliver remote access tools and demand payment details, respectively. This underscores a critical reality: social engineering remains a primary attack vector, often preceding more sophisticated malware deployments.

Beyond phishing, the report pointed to several significant threats. Fake Slack downloads are handing attackers hidden desktops, and a Booking.com breach is arming scammers with guest data. Furthermore, a Windows infostealer is spreading via fake Proton VPN sites and gaming mods, demonstrating broad targeting. Critically, April's Patch Tuesday addressed two zero-days, one of which was under active attack, with another Adobe Reader zero-day capable of triggering merely by opening a PDF.

This landscape demands a multi-layered defense. Attackers are leveraging everything from AI clickbait to blockchain-based infostealers like Omnistealer. Defenders must prioritize user education against social engineering, implement robust endpoint protection, and, most importantly, maintain a rigorous patching cadence. The ubiquity of these threats means every unpatched vulnerability or uneducated click is a potential entry point.
