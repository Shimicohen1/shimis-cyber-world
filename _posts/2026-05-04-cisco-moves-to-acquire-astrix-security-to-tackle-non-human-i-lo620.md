---
title: "Cisco Acquires Astrix Security to Secure Non-Human Identities"
date: 2026-05-04 19:00:26 +0000
source: RSS
source_name: "SecurityWeek"
channel: "SecurityWeek"
tags: [threat-intel, vulnerability, identity, ai-security]
excerpt: "Cisco has announced its intent to acquire Astrix Security, a startup specializing in the security of non-human identities (NHIs). These include critical elements like API keys, ser"
summary: "Cisco has announced its intent to acquire Astrix Security, a startup specializing in the security of non-human identities (NHIs). These include critical elements like API keys, service accounts, and OAuth tokens that are increasingly powering applications and AI agents. SecurityWeek reports that thi"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-018.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-018.png"
source_url: "https://www.securityweek.com/cisco-moves-to-acquire-astrix-security-to-tackle-non-human-identity-risks/"
tlp: "TLP:CLEAR"
event_type: "acquisition"
organizations:
  - name: "Cisco"
    domain: "cisco.com"
    role: "vendor"
  - name: "Astrix Security"
    domain: "astrix.security"
    role: "vendor"
link_preview:
  url: "https://www.securityweek.com/cisco-moves-to-acquire-astrix-security-to-tackle-non-human-identity-risks/"
  title: "Cisco Moves to Acquire Astrix Security to Tackle Non-Human Identity Risks"
  domain: "securityweek.com"
  image: "https://www.securityweek.com/wp-content/uploads/2023/01/Cybersecurity_News-SecurityWeek.jpg"
mitre_attack:
  - id: "T1558.003"
    name: "Steal or Forge Kerberos Tickets"
    tactic: "Credential Access"
    url: "https://attack.mitre.org/techniques/T1558/003/"
  - id: "T1078.004"
    name: "Cloud Accounts"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1078/004/"
  - id: "T1539"
    name: "Steal Web Data"
    tactic: "Credential Access"
    url: "https://attack.mitre.org/techniques/T1539/"
why_it_matters:
  - "If your organization relies on APIs, service accounts, or is integrating AI agents, you must prioritize securing these non-human identities. Review your current inventory of API keys and service accounts. Implement strict access controls, rotation policies, and monitoring for anomalous usage patterns before these become a vector for compromise."
bot_cta_title: "Secure your non-human identities"
bot_cta_description: "Use /brief to get the latest analyst-ready threat summaries."
---

Cisco has announced its intent to acquire Astrix Security, a startup specializing in the security of non-human identities (NHIs). These include critical elements like API keys, service accounts, and OAuth tokens that are increasingly powering applications and AI agents. SecurityWeek reports that this move aims to extend zero trust principles to the burgeoning "agentic workforce" where AI agents operate autonomously.

This acquisition signals a significant shift in how major vendors are approaching identity security. The rapid proliferation of AI and automated systems means that traditional human-centric identity management is no longer sufficient. Securing these machine-to-machine interactions is becoming paramount to preventing unauthorized access and data exfiltration.
