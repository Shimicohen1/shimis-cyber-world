---
title: "ShinyHunters Defaces Canvas Login Portals in Mass Extortion Campaign"
date: 2026-05-07 22:36:54 +0000
source: RSS
source_name: "BleepingComputer"
channel: "BleepingComputer"
tags: [threat-intel, data-breach, malware, vulnerability]
excerpt: "The ShinyHunters extortion gang has once again breached Instructure, the education technology giant behind Canvas. BleepingComputer reports that the attackers exploited a new vulne"
summary: "The ShinyHunters extortion gang has once again breached Instructure, the education technology giant behind Canvas. BleepingComputer reports that the attackers exploited a new vulnerability to deface login portals for hundreds of colleges and universities utilizing the Canvas platform, leveraging thi"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 75
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-039.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-039.png"
source_url: "https://www.bleepingcomputer.com/news/security/canvas-login-portals-hacked-in-mass-shinyhunters-extortion-campaign/"
tlp: "TLP:CLEAR"
event_type: "defacement"
organizations:
  - name: "Instructure"
    domain: "instructure.com"
    role: "vendor"
  - name: "ShinyHunters"
    role: "threat-actor"
threat_actors:
  - "ShinyHunters"
link_preview:
  url: "https://www.bleepingcomputer.com/news/security/canvas-login-portals-hacked-in-mass-shinyhunters-extortion-campaign/"
  title: "Canvas login portals hacked in mass ShinyHunters extortion campaign"
  domain: "bleepingcomputer.com"
  image: "https://www.bleepstatic.com/content/hl-images/2026/05/07/canvas-logo.jpg"
iocs:
  - id: "ShinyHunters-Canvas-Defacement"
    type: "Defacement"
    indicator: "Instructure Canvas login portals"
  - id: "ShinyHunters-Canvas-Defacement"
    type: "Exploitation"
    indicator: "Vulnerability in Instructure Canvas"
mitre_attack:
  - id: "T1190"
    name: "Exploit Public-Facing Application"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1190/"
  - id: "T1566.002"
    name: "Phishing: Spearphishing Link"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1566/002/"
  - id: "T1491.001"
    name: "Defacement: Internal Defacement"
    tactic: "Impact"
    url: "https://attack.mitre.org/techniques/T1491/001/"
why_it_matters:
  - "If your institution uses Canvas, assume your login portals were targeted. Immediately check for any signs of tampering, unauthorized access, or unusual activity on your Canvas instances. Prioritize patching any newly released updates from Instructure and review your incident response plan for portal defacement and extortion scenarios."
bot_cta_title: "Track ShinyHunters Attacks"
bot_cta_description: "Use /actor ShinyHunters to see related threats and their historical activity."
---

The ShinyHunters extortion gang has once again breached Instructure, the education technology giant behind Canvas. BleepingComputer reports that the attackers exploited a new vulnerability to deface login portals for hundreds of colleges and universities utilizing the Canvas platform, leveraging this access for an extortion campaign.

This isn't ShinyHunters' first rodeo with Instructure; they previously targeted the company. The current campaign impacts a vast swathe of the education sector, specifically higher education institutions that rely on Canvas for their learning management systems. The defacement of login portals is a direct attack on trust and operational continuity, forcing institutions into a reactive scramble.

For defenders in education, this means immediate action is required. While the primary goal appears to be extortion, the access gained to defface login portals raises serious questions about potential lateral movement or data exfiltration that may not be immediately apparent. Institutions must assume compromise and conduct thorough forensics.
