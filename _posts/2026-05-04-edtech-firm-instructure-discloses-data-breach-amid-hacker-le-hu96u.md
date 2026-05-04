---
title: "Instructure Data Breach: Student Data Stolen, Services Disrupted"
date: 2026-05-04 07:02:51 +0000
source: RSS
source_name: "SecurityWeek"
channel: "SecurityWeek"
tags: [threat-intel, vulnerability, data-breach]
excerpt: "Edtech firm Instructure, known for its Canvas learning management system, has disclosed a data breach following threats of a leak from hackers. SecurityWeek reports that the attack"
summary: "Edtech firm Instructure, known for its Canvas learning management system, has disclosed a data breach following threats of a leak from hackers. SecurityWeek reports that the attackers not only disrupted services but also exfiltrated sensitive user data. This isn't just a nuisance; it's a direct hit"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 70
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-003.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-003.png"
source_url: "https://www.securityweek.com/edtech-firm-instructure-discloses-data-breach/"
tlp: "TLP:CLEAR"
event_type: "data-breach"
organizations:
  - name: "Instructure"
    domain: "instructure.com"
    role: "victim"
link_preview:
  url: "https://www.securityweek.com/edtech-firm-instructure-discloses-data-breach/"
  title: "Edtech Firm Instructure Discloses Data Breach Amid Hacker Leak Threats"
  domain: "securityweek.com"
  image: "https://www.securityweek.com/wp-content/uploads/2025/12/university.jpg"
iocs:
  - id: "Instructure-Data-Breach-2024"
    type: "Information Disclosure"
    indicator: "Instructure services"
  - id: "Instructure-Data-Breach-2024"
    type: "Information Disclosure"
    indicator: "Stolen data: names"
  - id: "Instructure-Data-Breach-2024"
    type: "Information Disclosure"
    indicator: "Stolen data: email addresses"
  - id: "Instructure-Data-Breach-2024"
    type: "Information Disclosure"
    indicator: "Stolen data: student ID numbers"
  - id: "Instructure-Data-Breach-2024"
    type: "Information Disclosure"
    indicator: "Stolen data: user messages"
mitre_attack:
  - id: "T1537"
    name: "Cloud Storage"
    tactic: "Collection"
    url: "https://attack.mitre.org/techniques/T1537/"
  - id: "T1078.004"
    name: "Cloud Accounts"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1078/004/"
  - id: "T1005"
    name: "Data from Local System"
    tactic: "Collection"
    url: "https://attack.mitre.org/techniques/T1005/"
sigma_rules:
  count: 3
  free_count: 1
  paid_count: 2
  preview_title: "Instructure Data Breach - Suspicious Web Request Pattern"
  preview_level: "critical"
  preview_technique: "T1190"
  preview_tactic: "Initial Access"
  preview_yaml_b64: "dGl0bGU6IEluc3RydWN0dXJlIERhdGEgQnJlYWNoIC0gU3VzcGljaW91cyBXZWIgUmVxdWVzdCBQYXR0ZXJuCmlkOiBzY3ctMjAyNi0wNS0wNC1haS0xCnN0YXR1czogZXhwZXJpbWVudGFsCmxldmVsOiBjcml0aWNhbApkZXNjcmlwdGlvbjogfAogIFRoaXMgcnVsZSBkZXRlY3RzIHN1c3BpY2lvdXMgUE9TVCByZXF1ZXN0cyB0byB0aGUgL2NhbnZhcy9hcGkvdjEvdXNlcnMgZW5kcG9pbnQsIHdoaWNoIGNvdWxkIGluZGljYXRlIGFuIGF0dGVtcHQgdG8gZW51bWVyYXRlIG9yIGV4ZmlsdHJhdGUgdXNlciBkYXRhLCBhIGtleSBjb21wb25lbnQgb2YgdGhlIEluc3RydWN0dXJlIGRhdGEgYnJlYWNoLiBUaGUgc3BlY2lmaWMgVVJJIGFuZCBtZXRob2QgYXJlIGluZGljYXRpdmUgb2YgcG90ZW50aWFsIGFidXNlIG9mIHRoZSBDYW52YXMgQVBJLgphdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKQpkYXRlOiAyMDI2LTA1LTA0CnJlZmVyZW5jZXM6CiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTA0LWVkdGVjaC1maXJtLWluc3RydWN0dXJlLWRpc2Nsb3Nlcy1kYXRhLWJyZWFjaC1hbWlkLWhhY2tlci1sZS1odTk2dQp0YWdzOgogIC0gYXR0YWNrLmluaXRpYWxfYWNjZXNzCiAgLSBhdHRhY2sudDExOTAKbG9nc291cmNlOgogICAgY2F0ZWdvcnk6IHdlYnNlcnZlcgpkZXRlY3Rpb246CiAgc2VsZWN0aW9uOgogICAgICBjcy11cml8Y29udGFpbnM6CiAgICAgICAgICAtICcvY2FudmFzL2FwaS92MS91c2VycycKICAgICAgY3MtbWV0aG9kOgogICAgICAgICAgLSAnUE9TVCcKICAgICAgc2Mtc3RhdHVzOgogICAgICAgICAgLSAnMjAwJwogICAgICBjb25kaXRpb246IHNlbGVjdGlvbgpmYWxzZXBvc2l0aXZlczoKICAtIExlZ2l0aW1hdGUgYWRtaW5pc3RyYXRpdmUgYWN0aXZpdHk="
  all_rules_b64: "W3sidGl0bGUiOiJJbnN0cnVjdHVyZSBEYXRhIEJyZWFjaCAtIFN1c3BpY2lvdXMgV2ViIFJlcXVlc3QgUGF0dGVybiIsImxldmVsIjoiY3JpdGljYWwiLCJ0ZWNobmlxdWUiOiJUMTE5MCIsInRhY3RpYyI6IkluaXRpYWwgQWNjZXNzIiwidGllciI6ImZyZWUiLCJ5YW1sIjoidGl0bGU6IEluc3RydWN0dXJlIERhdGEgQnJlYWNoIC0gU3VzcGljaW91cyBXZWIgUmVxdWVzdCBQYXR0ZXJuXG5pZDogc2N3LTIwMjYtMDUtMDQtYWktMVxuc3RhdHVzOiBleHBlcmltZW50YWxcbmxldmVsOiBjcml0aWNhbFxuZGVzY3JpcHRpb246IHxcbiAgVGhpcyBydWxlIGRldGVjdHMgc3VzcGljaW91cyBQT1NUIHJlcXVlc3RzIHRvIHRoZSAvY2FudmFzL2FwaS92MS91c2VycyBlbmRwb2ludCwgd2hpY2ggY291bGQgaW5kaWNhdGUgYW4gYXR0ZW1wdCB0byBlbnVtZXJhdGUgb3IgZXhmaWx0cmF0ZSB1c2VyIGRhdGEsIGEga2V5IGNvbXBvbmVudCBvZiB0aGUgSW5zdHJ1Y3R1cmUgZGF0YSBicmVhY2guIFRoZSBzcGVjaWZpYyBVUkkgYW5kIG1ldGhvZCBhcmUgaW5kaWNhdGl2ZSBvZiBwb3RlbnRpYWwgYWJ1c2Ugb2YgdGhlIENhbnZhcyBBUEkuXG5hdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNS0wNFxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTA0LWVkdGVjaC1maXJtLWluc3RydWN0dXJlLWRpc2Nsb3Nlcy1kYXRhLWJyZWFjaC1hbWlkLWhhY2tlci1sZS1odTk2dVxudGFnczpcbiAgLSBhdHRhY2suaW5pdGlhbF9hY2Nlc3NcbiAgLSBhdHRhY2sudDExOTBcbmxvZ3NvdXJjZTpcbiAgICBjYXRlZ29yeTogd2Vic2VydmVyXG5kZXRlY3Rpb246XG4gIHNlbGVjdGlvbjpcbiAgICAgIGNzLXVyaXxjb250YWluczpcbiAgICAgICAgICAtICcvY2FudmFzL2FwaS92MS91c2VycydcbiAgICAgIGNzLW1ldGhvZDpcbiAgICAgICAgICAtICdQT1NUJ1xuICAgICAgc2Mtc3RhdHVzOlxuICAgICAgICAgIC0gJzIwMCdcbiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uXG5mYWxzZXBvc2l0aXZlczpcbiAgLSBMZWdpdGltYXRlIGFkbWluaXN0cmF0aXZlIGFjdGl2aXR5In0seyJ0aXRsZSI6Ikluc3RydWN0dXJlIERhdGEgQnJlYWNoIC0gUG90ZW50aWFsIERhdGEgRXhmaWx0cmF0aW9uIHZpYSBBUEkiLCJsZXZlbCI6ImhpZ2giLCJ0ZWNobmlxdWUiOiJUMTA0MSIsInRhY3RpYyI6IkV4ZmlsdHJhdGlvbiIsInRpZXIiOiJwYWlkIiwieWFtbCI6InRpdGxlOiBJbnN0cnVjdHVyZSBEYXRhIEJyZWFjaCAtIFBvdGVudGlhbCBEYXRhIEV4ZmlsdHJhdGlvbiB2aWEgQVBJXG5pZDogc2N3LTIwMjYtMDUtMDQtYWktMlxuc3RhdHVzOiBleHBlcmltZW50YWxcbmxldmVsOiBoaWdoXG5kZXNjcmlwdGlvbjogfFxuICBUaGlzIHJ1bGUgbW9uaXRvcnMgZm9yIEdFVCByZXF1ZXN0cyB0byB0aGUgL2NhbnZhcy9hcGkvdjEvbWVzc2FnZXMgZW5kcG9pbnQuIEF0dGFja2VycyBpbiB0aGUgSW5zdHJ1Y3R1cmUgYnJlYWNoIGV4ZmlsdHJhdGVkIHVzZXIgbWVzc2FnZXMsIGFuZCB0aGlzIHBhdHRlcm4gY291bGQgcmVwcmVzZW50IGFuIGF0dGVtcHQgdG8gYWNjZXNzIG9yIGRvd25sb2FkIGludGVybmFsIGNvbW11bmljYXRpb25zLCBpbmRpY2F0aW5nIGRhdGEgZXhmaWx0cmF0aW9uLlxuYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKEFJLWdlbmVyYXRlZClcbmRhdGU6IDIwMjYtMDUtMDRcbnJlZmVyZW5jZXM6XG4gIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNS0wNC1lZHRlY2gtZmlybS1pbnN0cnVjdHVyZS1kaXNjbG9zZXMtZGF0YS1icmVhY2gtYW1pZC1oYWNrZXItbGUtaHU5NnVcbnRhZ3M6XG4gIC0gYXR0YWNrLmV4ZmlsdHJhdGlvblxuICAtIGF0dGFjay50MTA0MVxubG9nc291cmNlOlxuICAgIGNhdGVnb3J5OiB3ZWJzZXJ2ZXJcbmRldGVjdGlvbjpcbiAgc2VsZWN0aW9uOlxuICAgICAgY3MtdXJpfGNvbnRhaW5zOlxuICAgICAgICAgIC0gJy9jYW52YXMvYXBpL3YxL21lc3NhZ2VzJ1xuICAgICAgY3MtbWV0aG9kOlxuICAgICAgICAgIC0gJ0dFVCdcbiAgICAgIHNjLXN0YXR1czpcbiAgICAgICAgICAtICcyMDAnXG4gICAgICBjb25kaXRpb246IHNlbGVjdGlvblxuZmFsc2Vwb3NpdGl2ZXM6XG4gIC0gTGVnaXRpbWF0ZSBhZG1pbmlzdHJhdGl2ZSBhY3Rpdml0eSJ9LHsidGl0bGUiOiJJbnN0cnVjdHVyZSBEYXRhIEJyZWFjaCAtIEFub21hbG91cyBVc2VyIEFjY2VzcyB0byBTdHVkZW50IERhdGEiLCJsZXZlbCI6Im1lZGl1bSIsInRlY2huaXF1ZSI6IlQxMDc4LjAwNCIsInRhY3RpYyI6IkRlZmVuc2UgRXZhc2lvbiIsInRpZXIiOiJwYWlkIiwieWFtbCI6InRpdGxlOiBJbnN0cnVjdHVyZSBEYXRhIEJyZWFjaCAtIEFub21hbG91cyBVc2VyIEFjY2VzcyB0byBTdHVkZW50IERhdGFcbmlkOiBzY3ctMjAyNi0wNS0wNC1haS0zXG5zdGF0dXM6IGV4cGVyaW1lbnRhbFxubGV2ZWw6IG1lZGl1bVxuZGVzY3JpcHRpb246IHxcbiAgVGhpcyBydWxlIGZsYWdzIGZpbGUgYWNjZXNzIGV2ZW50cyB3aGVyZSAnc3R1ZGVudF9pZCcgaXMgcHJlc2VudCBpbiB0aGUgYWNjZXNzZWQgZmlsZW5hbWUgYW5kIHRoZSB1c2VyIGlzICdhbm9ueW1vdXMnLiBUaGlzIGNvdWxkIHJlcHJlc2VudCB1bmF1dGhvcml6ZWQgYWNjZXNzIG9yIGVudW1lcmF0aW9uIG9mIHN0dWRlbnQgZGF0YSwgYSBjcml0aWNhbCBhc3BlY3Qgb2YgdGhlIEluc3RydWN0dXJlIGJyZWFjaCwgcG90ZW50aWFsbHkgYnkgdW5hdXRoZW50aWNhdGVkIG9yIGRpc2d1aXNlZCBhY3RvcnMuXG5hdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNS0wNFxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTA0LWVkdGVjaC1maXJtLWluc3RydWN0dXJlLWRpc2Nsb3Nlcy1kYXRhLWJyZWFjaC1hbWlkLWhhY2tlci1sZS1odTk2dVxudGFnczpcbiAgLSBhdHRhY2suZGVmZW5zZV9ldmFzaW9uXG4gIC0gYXR0YWNrLnQxMDc4LjAwNFxubG9nc291cmNlOlxuICAgIGNhdGVnb3J5OiBmaWxlX2FjY2Vzc1xuZGV0ZWN0aW9uOlxuICBzZWxlY3Rpb246XG4gICAgICBUYXJnZXRGaWxlbmFtZXxjb250YWluczpcbiAgICAgICAgICAtICdzdHVkZW50X2lkJ1xuICAgICAgVXNlcnxjb250YWluczpcbiAgICAgICAgICAtICdhbm9ueW1vdXMnXG4gICAgICBjb25kaXRpb246IHNlbGVjdGlvblxuZmFsc2Vwb3NpdGl2ZXM6XG4gIC0gTGVnaXRpbWF0ZSBhZG1pbmlzdHJhdGl2ZSBhY3Rpdml0eSJ9XQ=="
why_it_matters:
  - "If your organization uses Instructure or similar edtech platforms, assume student and staff data is now compromised. Immediately initiate password resets for affected users, especially if they reuse credentials. Audit any connected systems for unusual login attempts or data access. This isn't just about Instructure; it's a wake-up call to reassess the security posture of all third-party services handling sensitive educational data."
bot_cta_title: "Check Recent Breaches"
bot_cta_description: "Use /breach to see the latest reported data breaches and ransomware events."
---

Edtech firm Instructure, known for its Canvas learning management system, has disclosed a data breach following threats of a leak from hackers. SecurityWeek reports that the attackers not only disrupted services but also exfiltrated sensitive user data. This isn't just a nuisance; it's a direct hit on the privacy of students and educators.

The stolen data includes names, email addresses, student ID numbers, and user messages. This combination is particularly potent for follow-on attacks. Student IDs are often used as unique identifiers across systems, making them valuable for credential stuffing or spear-phishing campaigns targeting the academic community. The inclusion of user messages suggests potential access to internal communications, which could reveal further vulnerabilities or sensitive information.

This incident underscores the critical need for robust security in the education sector. Edtech platforms hold a treasure trove of personal data, making them prime targets. Organizations must assume that any data entrusted to third-party services is a potential liability and build their defensive strategies accordingly, focusing on data segmentation, strong authentication, and continuous monitoring for anomalous access patterns.
