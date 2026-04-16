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
  count: 2
  free_count: 1
  paid_count: 1
  preview_title: "Monitor Authentication from Breached Vendor — Cookeville Regional Medical Center"
  preview_level: "high"
  preview_technique: "data-breach"
  preview_tactic: "event-type"
  preview_yaml_b64: "dGl0bGU6IE1vbml0b3IgQXV0aGVudGljYXRpb24gZnJvbSBCcmVhY2hlZCBWZW5kb3Ig4oCUIENvb2tldmlsbGUgUmVnaW9uYWwgTWVkaWNhbCBDZW50ZXIKaWQ6IHNjdy0yMDI2LTA0LTE2LWV2dC0xCnN0YXR1czogZXhwZXJpbWVudGFsCmxldmVsOiBoaWdoCmRlc2NyaXB0aW9uOiB8CiAgRm9sbG93aW5nIHRoZSBDb29rZXZpbGxlIFJlZ2lvbmFsIE1lZGljYWwgQ2VudGVyIGRhdGEgYnJlYWNoLCBtb25pdG9yIGZvciBsb2dpbiBhdHRlbXB0cyB1c2luZyBwb3RlbnRpYWxseSBjb21wcm9taXNlZCBjcmVkZW50aWFscy4gQWxlcnQgb24gYW55IGF1dGhlbnRpY2F0aW9uIGZyb20gY3JtY2hlYWx0aC5vcmcgYWNjb3VudHMgYW5kIGNyZWRlbnRpYWwgc3R1ZmZpbmcgcGF0dGVybnMuCmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChhdXRvLWdlbmVyYXRlZCkKZGF0ZTogMjAyNi0wNC0xNgpyZWZlcmVuY2VzOgogIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNC0xNi1kYXRhLWJyZWFjaC1hdC10ZW5uZXNzZWUtaG9zcGl0YWwtYWZmZWN0cy0zMzctMDAwLTJoMWhsCnRhZ3M6CiAgLSBhdHRhY2suZ2VuZXJhbAogIC0gYXR0YWNrLmRhdGEtYnJlYWNoCmxvZ3NvdXJjZToKICAgIGNhdGVnb3J5OiBhdXRoZW50aWNhdGlvbgpkZXRlY3Rpb246CiAgc2VsZWN0aW9uX2RvbWFpbjoKICAgICAgVXNlcnxlbmRzd2l0aDoKICAgICAgICAtICdAY3JtY2hlYWx0aC5vcmcnCiAgICBzZWxlY3Rpb25fZmFpbHVyZToKICAgICAgRXZlbnRUeXBlOiAnbG9naW5fZmFpbHVyZScKICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb25fZG9tYWluIG9yIHNlbGVjdGlvbl9mYWlsdXJlIHwgY291bnQoVXNlcikgYnkgc3JjX2lwID4gMTAKZmFsc2Vwb3NpdGl2ZXM6CiAgLSBMZWdpdGltYXRlIGFjdGl2aXR5IGZyb20gQ29va2V2aWxsZSBSZWdpb25hbCBNZWRpY2FsIENlbnRlcg=="
why_it_matters:
  - "If your organization is in the healthcare sector, this isn't just another headline; it's a direct warning. Rhysida is relentless. You need to review your data exfiltration monitoring, endpoint detection and response (EDR) capabilities, and incident response plans *now*. Assume breach and validate your backups, especially off-network ones."
bot_cta_title: "Track Latest Healthcare Breaches"
bot_cta_description: "Use /breach to see the latest ransomware and data breach events, including those targeting the healthcare sector."
---

Cookeville Regional Medical Center, a Tennessee-based hospital, fell victim to a significant data breach last year, as reported by SecurityWeek. The notorious Rhysida ransomware group claimed responsibility for the attack, which resulted in the exfiltration of a staggering 500GB of sensitive data. This incident highlights the persistent and aggressive targeting of critical healthcare infrastructure by ransomware operators.

SecurityWeek further detailed that the breach ultimately impacted 337,000 individuals. This kind of widespread exposure is a harsh reminder of the downstream effects of these attacks, moving beyond just operational disruption to direct patient data compromise. The healthcare sector remains a prime target, largely due to the critical nature of its services and the invaluable, often irreplaceable, patient information it holds.
