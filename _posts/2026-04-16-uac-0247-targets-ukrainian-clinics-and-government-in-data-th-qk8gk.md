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
sigma_rules:
  count: 3
  free_count: 1
  paid_count: 2
  preview_title: "UAC-0247 Malware Exfiltrating Chromium Browser Data"
  preview_level: "critical"
  preview_technique: "T1041"
  preview_tactic: "Exfiltration"
  preview_yaml_b64: "dGl0bGU6IFVBQy0wMjQ3IE1hbHdhcmUgRXhmaWx0cmF0aW5nIENocm9taXVtIEJyb3dzZXIgRGF0YQppZDogc2N3LTIwMjYtMDQtMTYtYWktMQpzdGF0dXM6IGV4cGVyaW1lbnRhbApsZXZlbDogY3JpdGljYWwKZGVzY3JpcHRpb246IHwKICBEZXRlY3RzIHRoZSBwb3RlbnRpYWwgZXhmaWx0cmF0aW9uIG9mIHNhdmVkIGxvZ2luIGRhdGEgZnJvbSBDaHJvbWl1bS1iYXNlZCBicm93c2VycyAoQ2hyb21lLCBFZGdlKSBieSB0aGUgVUFDLTAyNDcgbWFsd2FyZS4gVGhpcyBydWxlIHNwZWNpZmljYWxseSB0YXJnZXRzIHRoZSAnTG9naW4gRGF0YScgZmlsZSwgd2hpY2ggY29udGFpbnMgc2Vuc2l0aXZlIHVzZXIgY3JlZGVudGlhbHMuCmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChBSS1nZW5lcmF0ZWQpCmRhdGU6IDIwMjYtMDQtMTYKcmVmZXJlbmNlczoKICAtIGh0dHBzOi8vc2hpbWlzY3liZXJ3b3JsZC5jb20vcG9zdHMvdWFjLTAyNDctdGFyZ2V0cy11a3JhaW5pYW4tY2xpbmljcy1hbmQtZ292ZXJubWVudC1pbi1kYXRhLXRoLXFrOGdrLwp0YWdzOgogIC0gYXR0YWNrLmV4ZmlsdHJhdGlvbgogIC0gYXR0YWNrLnQxMDQxCmxvZ3NvdXJjZToKICAgIGNhdGVnb3J5OiBmaWxlX2V2ZW50CmRldGVjdGlvbjoKICBzZWxlY3Rpb246CiAgICAgIFRhcmdldEZpbGVuYW1lfGNvbnRhaW5zOgogICAgICAgICAgLSAnXEFwcERhdGFcTG9jYWxcR29vZ2xlXENocm9tZVxVc2VyIERhdGFcRGVmYXVsdFxMb2dpbiBEYXRhJwogICAgICAgICAgLSAnXEFwcERhdGFcTG9jYWxcTWljcm9zb2Z0XEVkZ2VcVXNlciBEYXRhXERlZmF1bHRcTG9naW4gRGF0YScKICAgICAgICAgIC0gJ0M6XFVzZXJzXCpcQXBwRGF0YVxMb2NhbFxHb29nbGVcQ2hyb21lXFVzZXIgRGF0YVxEZWZhdWx0XExvZ2luIERhdGEnCiAgICAgICAgICAtICdDOlxVc2Vyc1wqXEFwcERhdGFcTG9jYWxcTWljcm9zb2Z0XEVkZ2VcVXNlciBEYXRhXERlZmF1bHRcTG9naW4gRGF0YScKICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb24KZmFsc2Vwb3NpdGl2ZXM6CiAgLSBMZWdpdGltYXRlIGFkbWluaXN0cmF0aXZlIGFjdGl2aXR5"
why_it_matters:
  - "If your organization handles sensitive data in Chromium-based browsers or uses WhatsApp for communication, and you have operations or connections to Ukraine, you need to immediately review your endpoint security posture. Ensure all systems are patched, conduct an audit of browser data access logs, and verify WhatsApp usage policies and security controls."
bot_cta_title: "Track threats targeting Ukraine and healthcare"
bot_cta_description: "Use /country UA to see threats targeting Ukraine, or /org [clinic/gov domain] for specific entities."
---

Cybersecurity researchers are sounding the alarm on a new malware campaign, dubbed UAC-0247, that has been actively targeting Ukrainian government entities and critical healthcare infrastructure. According to The Hacker News, the campaign, observed between March and April, focused on municipal healthcare institutions, including clinics and emergency hospitals.

The primary objective of this operation appears to be data theft. The deployed malware is specifically designed to exfiltrate sensitive information from Chromium-based web browsers, which power popular browsers like Chrome and Edge, and from WhatsApp communications. This suggests a deliberate effort to gain access to personal health information, internal government communications, and potentially user credentials.

The Hacker News reports that CERT-UA, Ukraine's Computer Emergencies Response Team, has been instrumental in uncovering and detailing the specifics of this sophisticated attack. The campaign's focus on healthcare and government sectors underscores the ongoing threats faced by vital public services in the region.
