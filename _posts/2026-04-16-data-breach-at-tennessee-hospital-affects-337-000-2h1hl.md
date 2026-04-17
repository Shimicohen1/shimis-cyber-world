---
title: "Rhysida Ransomware Hits Tennessee Hospital, Leaks 500GB Data"
date: 2026-04-16 12:40:36 +0000
source: RSS
source_name: "SecurityWeek"
channel: "SecurityWeek"
tags: [threat-intel, vulnerability, malware, ransomware, data-breach]
excerpt: "Cookeville Regional Medical Center, a Tennessee-based hospital, fell victim to a significant data breach last year, as reported by SecurityWeek. The notorious Rhysida ransomware gr"
summary: "Cookeville Regional Medical Center, a Tennessee-based hospital, fell victim to a significant data breach last year, as reported by SecurityWeek. The notorious Rhysida ransomware group claimed responsibility for the attack, which resulted in the exfiltration of a staggering 500GB of sensitive data. T"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 75
hidden: false
cover_image: "https://images.unsplash.com/photo-1596457233038-45a990575b2e?w=800&h=400&fit=crop&auto=format&q=80"
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://images.unsplash.com/photo-1596457233038-45a990575b2e?w=800&h=400&fit=crop&auto=format&q=80"
source_url: "https://www.securityweek.com/data-breach-at-tennessee-hospital-affects-337000/"
tlp: "TLP:CLEAR"
event_type: "data-breach"
organizations:
  - name: "Cookeville Regional Medical Center"
    domain: "crmchealth.org"
    role: "victim"
threat_actors:
  - "Rhysida"
countries: [US]
malware_families:
  - "Rhysida"
iocs:
  - id: "Rhysida-Ransomware-2023"
    type: "Information Disclosure"
    indicator: "Data exfiltration of 500GB by Rhysida ransomware group"
  - id: "Rhysida-Ransomware-2023"
    type: "Ransomware"
    indicator: "Rhysida ransomware group activity"
  - id: "Rhysida-Ransomware-2023"
    type: "Targeted Attack"
    indicator: "Cookeville Regional Medical Center"
mitre_attack:
  - id: "T1486"
    name: "Data Encrypted for Impact"
    tactic: "Impact"
    url: "https://attack.mitre.org/techniques/T1486/"
  - id: "T1071.004"
    name: "Web Protocols"
    tactic: "Command and Control"
    url: "https://attack.mitre.org/techniques/T1071/004/"
  - id: "T1041"
    name: "Exfiltration Over C2 Channel"
    tactic: "Exfiltration"
    url: "https://attack.mitre.org/techniques/T1041/"
sigma_rules:
  count: 3
  free_count: 1
  paid_count: 2
  preview_title: "Rhysida Ransomware Data Exfiltration - UNC Path Access"
  preview_level: "critical"
  preview_technique: "T1486"
  preview_tactic: "Impact"
  preview_yaml_b64: "dGl0bGU6IFJoeXNpZGEgUmFuc29td2FyZSBEYXRhIEV4ZmlsdHJhdGlvbiAtIFVOQyBQYXRoIEFjY2VzcwppZDogc2N3LTIwMjYtMDQtMTYtYWktMQpzdGF0dXM6IGV4cGVyaW1lbnRhbApsZXZlbDogY3JpdGljYWwKZGVzY3JpcHRpb246IHwKICBEZXRlY3RzIGFjY2VzcyB0byBuZXR3b3JrIHNoYXJlcyAoVU5DIHBhdGhzKSB3aGljaCBpcyBhIGNvbW1vbiBtZXRob2QgZm9yIHJhbnNvbXdhcmUgbGlrZSBSaHlzaWRhIHRvIGFjY2VzcyBhbmQgZXhmaWx0cmF0ZSBsYXJnZSB2b2x1bWVzIG9mIGRhdGEgZnJvbSB2aWN0aW0gZW52aXJvbm1lbnRzLiBUaGlzIHJ1bGUgc3BlY2lmaWNhbGx5IHRhcmdldHMgdGhlIGV4ZmlsdHJhdGlvbiBwaGFzZSBvZiB0aGUgUmh5c2lkYSByYW5zb213YXJlIGF0dGFjaywgYXMgZXZpZGVuY2VkIGJ5IHRoZSBsYXJnZSBkYXRhIGxlYWsgcmVwb3J0ZWQgZnJvbSBDb29rZXZpbGxlIFJlZ2lvbmFsIE1lZGljYWwgQ2VudGVyLgphdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKQpkYXRlOiAyMDI2LTA0LTE2CnJlZmVyZW5jZXM6CiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL3Bvc3RzL2RhdGEtYnJlYWNoLWF0LXRlbm5lc3NlZS1ob3NwaXRhbC1hZmZlY3RzLTMzNy0wMDAtMmgxaGwvCnRhZ3M6CiAgLSBhdHRhY2suaW1wYWN0CiAgLSBhdHRhY2sudDE0ODYKbG9nc291cmNlOgogICAgY2F0ZWdvcnk6IGZpbGVfYWNjZXNzCmRldGVjdGlvbjoKICBzZWxlY3Rpb246CiAgICAgIFRhcmdldE9iamVjdHxzdGFydHN3aXRoOgogICAgICAgICAgLSAnXFwnCiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uCmZhbHNlcG9zaXRpdmVzOgogIC0gTGVnaXRpbWF0ZSBhZG1pbmlzdHJhdGl2ZSBhY3Rpdml0eQ=="
why_it_matters:
  - "If your organization is in the healthcare sector, this isn't just another headline; it's a direct warning. Rhysida is relentless. You need to review your data exfiltration monitoring, endpoint detection and response (EDR) capabilities, and incident response plans *now*. Assume breach and validate your backups, especially off-network ones."
bot_cta_title: "Track Latest Healthcare Breaches"
bot_cta_description: "Use /breach to see the latest ransomware and data breach events, including those targeting the healthcare sector."
---

Cookeville Regional Medical Center, a Tennessee-based hospital, fell victim to a significant data breach last year, as reported by SecurityWeek. The notorious Rhysida ransomware group claimed responsibility for the attack, which resulted in the exfiltration of a staggering 500GB of sensitive data. This incident highlights the persistent and aggressive targeting of critical healthcare infrastructure by ransomware operators.

SecurityWeek further detailed that the breach ultimately impacted 337,000 individuals. This kind of widespread exposure is a harsh reminder of the downstream effects of these attacks, moving beyond just operational disruption to direct patient data compromise. The healthcare sector remains a prime target, largely due to the critical nature of its services and the invaluable, often irreplaceable, patient information it holds.
