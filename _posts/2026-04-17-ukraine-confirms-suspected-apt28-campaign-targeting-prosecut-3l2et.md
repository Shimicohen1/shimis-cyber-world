---
title: "APT28 Exploits Roundcube for Ukraine Cyber Espionage"
date: 2026-04-17 14:12:00 +0000
source: RSS
source_name: "The Record by Recorded Future"
channel: "The Record by Recorded Future"
tags: [threat-intel, data-breach, government, vulnerability]
excerpt: "The Record by Recorded Future reports that Ukraine has confirmed a campaign by the threat actor APT28 targeting its prosecutors and anti-corruption agencies. This operation leverag"
summary: "The Record by Recorded Future reports that Ukraine has confirmed a campaign by the threat actor APT28 targeting its prosecutors and anti-corruption agencies. This operation leveraged vulnerabilities within the open-source Roundcube webmail platform. The attack vector is particularly insidious, requi"
layout: post
section: vulnerabilities
score: HIGH
curated: false
featured: false
priority: 80
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-018.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-018.png"
source_url: "https://therecord.media/ukraine-confirms-suspected-apt28-campaign-targeting-prosecutors"
tlp: "TLP:CLEAR"
event_type: "espionage"
organizations:
  - name: "Ukraine"
    role: "victim"
  - name: "Roundcube"
    domain: "roundcube.net"
    role: "vendor"
threat_actors:
  - "APT28"
countries: [UA]
link_preview:
  url: "https://therecord.media/ukraine-confirms-suspected-apt28-campaign-targeting-prosecutors"
  title: "Ukraine confirms suspected APT28 campaign targeting prosecutors, anti-corruption agencies"
  domain: "therecord.media"
  image: "https://cms.therecord.media/uploads/irina_grotkjaer_8_Sm_Djh_Oym_HA_unsplash_195fcf3066.jpg"
iocs:
  - id: "Advisory"
    type: "Security Patch"
    indicator: "See advisory"
mitre_attack:
  - id: "T1190"
    name: "Exploit Public-Facing Application"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1190/"
  - id: "T1566.001"
    name: "Phishing: Spearphishing Attachment"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1566/001/"
  - id: "T1204.002"
    name: "Malicious Link"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1204/002/"
sigma_rules:
  count: 1
  free_count: 1
  paid_count: 0
  preview_title: "Data Staging for Exfiltration"
  preview_level: "high"
  preview_technique: "espionage"
  preview_tactic: "event-type"
  preview_yaml_b64: "dGl0bGU6IERhdGEgU3RhZ2luZyBmb3IgRXhmaWx0cmF0aW9uCmlkOiBzY3ctMjAyNi0wNC0xNy1ldnQtMQpzdGF0dXM6IGV4cGVyaW1lbnRhbApsZXZlbDogaGlnaApkZXNjcmlwdGlvbjogfAogIERldGVjdHMgZmlsZSBjb21wcmVzc2lvbiBhbmQgYXJjaGl2aW5nIHRoYXQgbWF5IGluZGljYXRlIGRhdGEgc3RhZ2luZyBmb3IgZXhmaWx0cmF0aW9uLCBhIGNvbW1vbiBlc3Bpb25hZ2UgdGVjaG5pcXVlLgphdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoYXV0by1nZW5lcmF0ZWQpCmRhdGU6IDIwMjYtMDQtMTcKcmVmZXJlbmNlczoKICAtIGh0dHBzOi8vc2hpbWlzY3liZXJ3b3JsZC5jb20vX3Bvc3RzLzIwMjYtMDQtMTctdWtyYWluZS1jb25maXJtcy1zdXNwZWN0ZWQtYXB0MjgtY2FtcGFpZ24tdGFyZ2V0aW5nLXByb3NlY3V0LTNsMmV0CnRhZ3M6CiAgLSBhdHRhY2suZ2VuZXJhbAogIC0gYXR0YWNrLmVzcGlvbmFnZQpsb2dzb3VyY2U6CiAgICBjYXRlZ29yeTogcHJvY2Vzc19jcmVhdGlvbgogICAgcHJvZHVjdDogd2luZG93cwpkZXRlY3Rpb246CiAgc2VsZWN0aW9uOgogICAgICBDb21tYW5kTGluZXxjb250YWluczoKICAgICAgICAtICc3eiBhJwogICAgICAgIC0gJ3JhciBhJwogICAgICAgIC0gJ3RhciAtY3pmJwogICAgICAgIC0gJ3ppcCAtcicKICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb24KZmFsc2Vwb3NpdGl2ZXM6CiAgLSBMZWdpdGltYXRlIGFjdGl2aXR5IGZyb20gVWtyYWluZQ=="
why_it_matters:
  - "If your organization uses the Roundcube webmail platform, immediately audit your environment for signs of compromise and prioritize patching any known vulnerabilities. Pay close attention to email traffic logs for suspicious activity and ensure endpoint detection and response (EDR) solutions are configured to detect and block remote code execution attempts originating from email clients."
bot_cta_title: "Track APT28 and related cyber threats"
bot_cta_description: "Use /actor APT28 to see related threats."
---

The Record by Recorded Future reports that Ukraine has confirmed a campaign by the threat actor APT28 targeting its prosecutors and anti-corruption agencies. This operation leveraged vulnerabilities within the open-source Roundcube webmail platform. The attack vector is particularly insidious, requiring only that a victim opens an email in their inbox to trigger malicious code execution.

This campaign underscores a persistent threat to government and sensitive sectors. By targeting email infrastructure, APT28 gains a direct pathway into an organization's internal communications and sensitive data. The use of a widely deployed open-source product like Roundcube suggests a broad potential attack surface, not just for Ukraine but for any organization relying on it.
