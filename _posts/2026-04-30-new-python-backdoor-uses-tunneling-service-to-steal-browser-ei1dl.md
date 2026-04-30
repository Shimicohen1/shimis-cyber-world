---
title: "DEEP#DOOR Python Backdoor Disables Security Controls for Credential Theft"
date: 2026-04-30 12:36:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, malware, cloud, microsoft, identity, tools]
excerpt: "The Hacker News reports on DEEP#DOOR, a new Python-based backdoor framework that can disable Windows security features to gain persistent access and steal sensitive data. The attac"
summary: "The Hacker News reports on DEEP#DOOR, a new Python-based backdoor framework that can disable Windows security features to gain persistent access and steal sensitive data. The attack chain begins with a batch script that compromises defenses, allowing the backdoor to operate stealthily. This tool spe"
layout: post
section: vulnerabilities
score: HIGH
curated: false
featured: false
priority: 75
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-030.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-030.png"
source_url: "https://thehackernews.com/2026/04/new-python-backdoor-uses-tunneling.html"
tlp: "TLP:CLEAR"
event_type: "tool_release"
iocs:
  - id: "DEEP#DOOR-Backdoor"
    type: "Backdoor"
    indicator: "Python-based backdoor framework DEEP#DOOR"
  - id: "DEEP#DOOR-Backdoor"
    type: "Initial Access"
    indicator: "install_obf.bat (batch script)"
  - id: "DEEP#DOOR-Backdoor"
    type: "Defense Evasion"
    indicator: "Disables Windows security controls"
  - id: "DEEP#DOOR-Backdoor"
    type: "Information Disclosure"
    indicator: "Steals browser credentials"
  - id: "DEEP#DOOR-Backdoor"
    type: "Information Disclosure"
    indicator: "Steals cloud credentials"
mitre_attack:
  - id: "T1562"
    name: "Impair Defenses"
    tactic: "Defense Evasion"
    url: "https://attack.mitre.org/techniques/T1562/"
  - id: "T1041"
    name: "Exfiltration Over C2 Channel"
    tactic: "Exfiltration"
    url: "https://attack.mitre.org/techniques/T1041/"
  - id: "T1555"
    name: "Credentials from Password Stores"
    tactic: "Credential Access"
    url: "https://attack.mitre.org/techniques/T1555/"
why_it_matters:
  - "If your organization uses Windows endpoints and relies on cloud services or stores credentials in browsers, you need to urgently review your endpoint security posture. Ensure EDR solutions are up-to-date and configured to detect script-based security control bypasses. Audit access logs for unusual activity, especially around the execution of batch files, and reinforce MFA across all cloud access."
bot_cta_title: "Track DEEP#DOOR and similar malware threats"
bot_cta_description: "Use /brief to get the latest threat intelligence summaries."
---

The Hacker News reports on DEEP#DOOR, a new Python-based backdoor framework that can disable Windows security features to gain persistent access and steal sensitive data. The attack chain begins with a batch script that compromises defenses, allowing the backdoor to operate stealthily. This tool specifically targets browser and cloud credentials, posing a significant risk to organizations relying on these platforms for data storage and access.

This framework's ability to bypass security controls and exfiltrate credentials highlights a sophisticated approach by attackers. Defenders must prioritize robust endpoint detection and response (EDR) solutions and continuous monitoring to identify and neutralize such stealthy threats before they can establish a foothold. Organizations should also implement strong authentication measures, including multi-factor authentication (MFA), to mitigate the impact of stolen credentials.
