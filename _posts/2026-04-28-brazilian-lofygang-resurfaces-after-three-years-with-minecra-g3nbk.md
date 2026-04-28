---
title: "LofyGang Resurfaces, Targets Minecraft Players with LofyStealer Malware"
date: 2026-04-28 17:39:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, malware]
excerpt: "The Brazilian cybercrime group LofyGang has re-emerged after a three-year hiatus, launching a new campaign aimed at Minecraft players. According to The Hacker News, the group is de"
summary: "The Brazilian cybercrime group LofyGang has re-emerged after a three-year hiatus, launching a new campaign aimed at Minecraft players. According to The Hacker News, the group is deploying a novel information stealer dubbed LofyStealer (also known as GrabBot). This malware is meticulously disguised a"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-002.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-002.png"
source_url: "https://thehackernews.com/2026/04/brazilian-lofygang-resurfaces-after.html"
tlp: "TLP:CLEAR"
event_type: "malware"
threat_actors:
  - "LofyGang"
countries: [BR]
malware_families:
  - "GrabBot"
iocs:
  - id: "LofyGang-LofyStealer"
    type: "Information Disclosure"
    indicator: "Malware: LofyStealer (aka GrabBot)"
  - id: "LofyGang-LofyStealer"
    type: "Information Disclosure"
    indicator: "Targeted Software: Minecraft"
  - id: "LofyGang-LofyStealer"
    type: "Information Disclosure"
    indicator: "Malware Disguise: 'Slinky' Minecraft hack"
mitre_attack:
  - id: "T1566.002"
    name: "Spearphishing Attachment"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1566/002/"
  - id: "T1204.002"
    name: "Malicious File"
    tactic: "Execution"
    url: "https://attack.mitre.org/techniques/T1204/002/"
  - id: "T1056.001"
    name: "Keylogging"
    tactic: "Collection"
    url: "https://attack.mitre.org/techniques/T1056/001/"
why_it_matters:
  - "If you or your organization uses Minecraft, or if your network includes devices used for gaming, you need to be acutely aware of this threat. Educate users about the dangers of downloading unofficial game modifications or 'hacks.' Implement application whitelisting where possible, and ensure endpoint detection and response (EDR) solutions are actively monitoring for suspicious processes, especially those mimicking legitimate applications like Minecraft."
bot_cta_title: "Track LofyGang's latest activities"
bot_cta_description: "Use /actor LofyGang to see related threats and indicators of compromise."
---

The Brazilian cybercrime group LofyGang has re-emerged after a three-year hiatus, launching a new campaign aimed at Minecraft players. According to The Hacker News, the group is deploying a novel information stealer dubbed LofyStealer (also known as GrabBot). This malware is meticulously disguised as a Minecraft hack called 'Slinky,' leveraging the official game icon to trick users into executing it voluntarily.

This isn't just a simple game hack; it's a sophisticated play for credentials and sensitive data. The Hacker News reports that LofyStealer focuses on exfiltrating credentials, potentially from gaming accounts, social media, and other services linked to the compromised device. The re-emergence of LofyGang underscores a persistent threat where attackers exploit popular platforms and user trust to achieve their objectives.

Attackers consistently target widely-used platforms, especially those with younger user bases who might be less security-aware. The attacker's calculus here is clear: high volume, low friction. Disguising malware as a game utility is a classic social engineering tactic that continues to yield results. Defenders, particularly parents and IT professionals in educational settings, need to recognize that gaming platforms are not immune from serious threats.
