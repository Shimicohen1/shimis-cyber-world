---
title: "Malware Campaign Hits Ukrainian Clinics, Government Agencies"
date: 2026-04-16 06:20:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, malware]
excerpt: "Cybersecurity researchers are sounding the alarm on a new malware campaign, dubbed UAC-0247, that has been actively targeting Ukrainian government entities and critical healthcare"
summary: "Cybersecurity researchers are sounding the alarm on a new malware campaign, dubbed UAC-0247, that has been actively targeting Ukrainian government entities and critical healthcare infrastructure. According to The Hacker News, the campaign, observed between March and April, focused on municipal healt"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://images.unsplash.com/photo-1760199789463-b523db55dd8b?w=800&h=400&fit=crop&auto=format&q=80"
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://images.unsplash.com/photo-1760199789463-b523db55dd8b?w=800&h=400&fit=crop&auto=format&q=80"
source_url: "https://thehackernews.com/2026/04/uac-0247-targets-ukrainian-clinics-and.html"
tlp: "TLP:CLEAR"
event_type: "espionage"
threat_actors:
  - "UAC-0247"
  - "Earth Lusca"
countries: [UA]
iocs:
  - id: "UAC-0247"
    type: "Information Disclosure"
    indicator: "Malware targeting Chromium-based web browsers for data theft"
  - id: "UAC-0247"
    type: "Information Disclosure"
    indicator: "Malware targeting WhatsApp for data theft"
  - id: "UAC-0247"
    type: "Targeted Attack"
    indicator: "Ukrainian government institutions"
  - id: "UAC-0247"
    type: "Targeted Attack"
    indicator: "Ukrainian municipal healthcare institutions (clinics, emergency hospitals)"
mitre_attack:
  - id: "T1041"
    name: "Exfiltration Over C2 Channel"
    tactic: "Exfiltration"
    url: "https://attack.mitre.org/techniques/T1041/"
  - id: "T1555"
    name: "Credentials from Password Stores"
    tactic: "Credential Access"
    url: "https://attack.mitre.org/techniques/T1555/"
why_it_matters:
  - "If your organization handles sensitive data in Chromium-based browsers or uses WhatsApp for communication, and you have operations or connections to Ukraine, you need to immediately review your endpoint security posture. Ensure all systems are patched, conduct an audit of browser data access logs, and verify WhatsApp usage policies and security controls."
bot_cta_title: "Track threats targeting Ukraine and healthcare"
bot_cta_description: "Use /country UA to see threats targeting Ukraine, or /org [clinic/gov domain] for specific entities."
---

Cybersecurity researchers are sounding the alarm on a new malware campaign, dubbed UAC-0247, that has been actively targeting Ukrainian government entities and critical healthcare infrastructure. According to The Hacker News, the campaign, observed between March and April, focused on municipal healthcare institutions, including clinics and emergency hospitals.

The primary objective of this operation appears to be data theft. The deployed malware is specifically designed to exfiltrate sensitive information from Chromium-based web browsers, which power popular browsers like Chrome and Edge, and from WhatsApp communications. This suggests a deliberate effort to gain access to personal health information, internal government communications, and potentially user credentials.

The Hacker News reports that CERT-UA, Ukraine's Computer Emergencies Response Team, has been instrumental in uncovering and detailing the specifics of this sophisticated attack. The campaign's focus on healthcare and government sectors underscores the ongoing threats faced by vital public services in the region.
