---
title: "Orphaned Identities Fueling Cloud Breaches: The Unseen Threat"
date: 2026-04-16 11:55:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, data-breach, cloud, identity, phishing, ai-security]
excerpt: "Forget phishing and weak passwords for a moment. According to The Hacker News, a staggering 68% of cloud breaches in 2024 were directly linked to compromised service accounts and f"
summary: "Forget phishing and weak passwords for a moment. According to The Hacker News, a staggering 68% of cloud breaches in 2024 were directly linked to compromised service accounts and forgotten API keys. This highlights a critical, often overlooked vulnerability: unmanaged non-human identities. These aut"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 70
hidden: false
cover_image: "https://images.unsplash.com/photo-1666615435088-4865bf5ed3fd?w=800&h=400&fit=crop&auto=format&q=80"
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://images.unsplash.com/photo-1666615435088-4865bf5ed3fd?w=800&h=400&fit=crop&auto=format&q=80"
source_url: "https://thehackernews.com/2026/04/webinar-find-and-eliminate-orphaned-non.html"
tlp: "TLP:CLEAR"
event_type: "data-breach"
mitre_attack:
  - id: "T1550"
    name: "Use Alternate Authentication Material"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1550/"
  - id: "T1539"
    name: "Steal Application Access Token"
    tactic: "Credential Access"
    url: "https://attack.mitre.org/techniques/T1539/"
  - id: "T1078.004"
    name: "Cloud Accounts"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1078/004/"
sigma_rules:
  count: 3
  free_count: 1
  paid_count: 2
  preview_title: "Suspicious Service Account Activity - Orphaned Identity Threat"
  preview_level: "critical"
  preview_technique: "T1550"
  preview_tactic: "Credential Access"
  preview_yaml_b64: "dGl0bGU6IFN1c3BpY2lvdXMgU2VydmljZSBBY2NvdW50IEFjdGl2aXR5IC0gT3JwaGFuZWQgSWRlbnRpdHkgVGhyZWF0CmlkOiBzY3ctMjAyNi0wNC0xNi1haS0xCnN0YXR1czogZXhwZXJpbWVudGFsCmxldmVsOiBjcml0aWNhbApkZXNjcmlwdGlvbjogfAogIERldGVjdHMgYXV0aGVudGljYXRpb24gZXZlbnRzIGludm9sdmluZyBhY2NvdW50cyBjb21tb25seSB1c2VkIGZvciBzZXJ2aWNlIGFjY291bnRzLCBBUEkga2V5cywgb3IgYXV0b21hdGlvbi4gVGhpcyBydWxlIGFpbXMgdG8gaWRlbnRpZnkgcG90ZW50aWFsIGV4cGxvaXRhdGlvbiBvZiBvcnBoYW5lZCBub24taHVtYW4gaWRlbnRpdGllcywgd2hpY2ggYXJlIGEgcHJpbWFyeSB2ZWN0b3IgZm9yIGNsb3VkIGJyZWFjaGVzIGFzIGRlc2NyaWJlZCBpbiB0aGUgJ09ycGhhbmVkIElkZW50aXRpZXMgRnVlbGluZyBDbG91ZCBCcmVhY2hlcycgdGhyZWF0LgphdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKQpkYXRlOiAyMDI2LTA0LTE2CnJlZmVyZW5jZXM6CiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL3Bvc3RzL3dlYmluYXItZmluZC1hbmQtZWxpbWluYXRlLW9ycGhhbmVkLW5vbi1odW1hbi1pZGVudGl0aWVzLWktbXlxbmUvCnRhZ3M6CiAgLSBhdHRhY2suY3JlZGVudGlhbF9hY2Nlc3MKICAtIGF0dGFjay50MTU1MApsb2dzb3VyY2U6CiAgICBjYXRlZ29yeTogYXV0aGVudGljYXRpb24KZGV0ZWN0aW9uOgogIHNlbGVjdGlvbjoKICAgICAgVXNlcnxjb250YWluczoKICAgICAgICAgIC0gJ3NlcnZpY2VfYWNjb3VudCcKICAgICAgICAgIC0gJ2F1dG9tYXRpb25fdXNlcicKICAgICAgICAgIC0gJ2FwaV9rZXlfdXNlcicKICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb24KZmFsc2Vwb3NpdGl2ZXM6CiAgLSBMZWdpdGltYXRlIGFkbWluaXN0cmF0aXZlIGFjdGl2aXR5"
why_it_matters:
  - "If your organization relies heavily on cloud services and automated processes, audit your environment immediately for orphaned service accounts and API keys. Revoke any credentials not actively tied to a current, verified business function. Prioritize discovering and eliminating these forgotten digital assets before they are discovered and exploited by threat actors."
bot_cta_title: "Find Orphaned Cloud Credentials"
bot_cta_description: "Use /brief to get a weekly summary of key threats and IOCs."
---

Forget phishing and weak passwords for a moment. According to The Hacker News, a staggering 68% of cloud breaches in 2024 were directly linked to compromised service accounts and forgotten API keys. This highlights a critical, often overlooked vulnerability: unmanaged non-human identities. These automated credentials, including service accounts, API tokens, AI agent connections, and OAuth grants, vastly outnumber human employees – often by a factor of 40 to 50 per person.

The problem escalates when projects wrap up or employees depart. These automated identities, no longer tied to active personnel or projects, can become orphaned. Without proper oversight, they linger in the environment, providing potential entry points for attackers. The Hacker News points out that these forgotten digital keys are a prime target, often left unmonitored and ripe for exploitation.
