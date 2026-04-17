---
title: "ICS Patch Tuesday: Industrial Giants Issue Critical Advisories"
date: 2026-04-15 07:14:08 +0000
source: RSS
source_name: "SecurityWeek"
channel: "SecurityWeek"
tags: [threat-intel, vulnerability]
excerpt: "It's that time again: ICS Patch Tuesday has rolled around, and SecurityWeek reports that eight major industrial players have dropped new security advisories. This isn't just a hand"
summary: "It's that time again: ICS Patch Tuesday has rolled around, and SecurityWeek reports that eight major industrial players have dropped new security advisories. This isn't just a handful of vendors; we're talking about the heavy hitters that form the backbone of critical infrastructure and manufacturin"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 70
hidden: false
cover_image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop&auto=format&q=80"
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop&auto=format&q=80"
source_url: "https://www.securityweek.com/ics-patch-tuesday-8-industrial-giants-publish-new-security-advisories/"
tlp: "TLP:CLEAR"
event_type: "advisory"
organizations:
  - name: "Siemens"
    domain: "siemens.com"
    role: "vendor"
  - name: "Schneider Electric"
    domain: "se.com"
    role: "vendor"
  - name: "Aveva"
    domain: "aveva.com"
    role: "vendor"
  - name: "Rockwell Automation"
    domain: "rockwellautomation.com"
    role: "vendor"
  - name: "ABB"
    domain: "abb.com"
    role: "vendor"
  - name: "Phoenix Contact"
    domain: "phoenixcontact.com"
    role: "vendor"
  - name: "Mitsubishi Electric"
    domain: "mitsubishielectric.com"
    role: "vendor"
  - name: "Moxa"
    domain: "moxa.com"
    role: "vendor"
malware_families:
  - "Phoenix"
iocs:
  - id: "ICS-Patch-Tuesday-2024-04"
    type: "Multiple Vulnerabilities"
    indicator: "Siemens products"
  - id: "ICS-Patch-Tuesday-2024-04"
    type: "Multiple Vulnerabilities"
    indicator: "Schneider Electric products"
  - id: "ICS-Patch-Tuesday-2024-04"
    type: "Multiple Vulnerabilities"
    indicator: "Aveva products"
  - id: "ICS-Patch-Tuesday-2024-04"
    type: "Multiple Vulnerabilities"
    indicator: "Rockwell Automation products"
  - id: "ICS-Patch-Tuesday-2024-04"
    type: "Multiple Vulnerabilities"
    indicator: "ABB products"
mitre_attack:
  - id: "T1190"
    name: "Exploit Public-Facing Application"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1190/"
sigma_rules:
  count: 3
  free_count: 1
  paid_count: 2
  preview_title: "ICS Patch Tuesday Advisories - Siemens, Schneider Electric, Rockwell Automation, ABB, Mitsubishi Electric, Moxa, Phoenix Contact, Aveva"
  preview_level: "critical"
  preview_technique: "T1190"
  preview_tactic: "Initial Access"
  preview_yaml_b64: "dGl0bGU6IElDUyBQYXRjaCBUdWVzZGF5IEFkdmlzb3JpZXMgLSBTaWVtZW5zLCBTY2huZWlkZXIgRWxlY3RyaWMsIFJvY2t3ZWxsIEF1dG9tYXRpb24sIEFCQiwgTWl0c3ViaXNoaSBFbGVjdHJpYywgTW94YSwgUGhvZW5peCBDb250YWN0LCBBdmV2YQppZDogc2N3LTIwMjYtMDQtMTUtYWktMQpzdGF0dXM6IGV4cGVyaW1lbnRhbApsZXZlbDogY3JpdGljYWwKZGVzY3JpcHRpb246IHwKICBUaGlzIHJ1bGUgZGV0ZWN0cyBhY2Nlc3MgYXR0ZW1wdHMgdG8gc3BlY2lmaWMgd2ViIHBhdGhzIGFzc29jaWF0ZWQgd2l0aCBhZHZpc29yaWVzIGZyb20gbWFqb3IgSUNTIHZlbmRvcnMgKFNpZW1lbnMsIFNjaG5laWRlciBFbGVjdHJpYywgUm9ja3dlbGwgQXV0b21hdGlvbiwgQUJCLCBNaXRzdWJpc2hpIEVsZWN0cmljLCBNb3hhLCBQaG9lbml4IENvbnRhY3QsIEF2ZXZhKSB0aGF0IGFyZSBwYXJ0IG9mIHRoZSBJQ1MgUGF0Y2ggVHVlc2RheS4gVGhpcyBpbmRpY2F0ZXMgcG90ZW50aWFsIHJlY29ubmFpc3NhbmNlIG9yIGV4cGxvaXRhdGlvbiBhdHRlbXB0cyB0YXJnZXRpbmcgcmVjZW50bHkgZGlzY2xvc2VkIHZ1bG5lcmFiaWxpdGllcyBpbiBjcml0aWNhbCBpbmZyYXN0cnVjdHVyZSBzeXN0ZW1zLgphdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKQpkYXRlOiAyMDI2LTA0LTE1CnJlZmVyZW5jZXM6CiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL3Bvc3RzL2ljcy1wYXRjaC10dWVzZGF5LTgtaW5kdXN0cmlhbC1naWFudHMtcHVibGlzaC1uZXctc2VjdXJpdHktd2ZscjIvCnRhZ3M6CiAgLSBhdHRhY2suaW5pdGlhbF9hY2Nlc3MKICAtIGF0dGFjay50MTE5MApsb2dzb3VyY2U6CiAgICBjYXRlZ29yeTogd2Vic2VydmVyCmRldGVjdGlvbjoKICBzZWxlY3Rpb246CiAgICAgIGNzLXVyaXxjb250YWluczoKICAgICAgICAgIC0gJy9zaWVtZW5zL2luZHVzdHJpYWwtYXV0b21hdGlvbi8nCiAgICAgICAgICAtICcvc2NobmVpZGVyLWVsZWN0cmljL290LXNlY3VyaXR5LycKICAgICAgICAgIC0gJy9yb2Nrd2VsbC1hdXRvbWF0aW9uL2ljcy12dWxuZXJhYmlsaXRpZXMvJwogICAgICAgICAgLSAnL2FiYi9wcm9jZXNzLWNvbnRyb2wtc3lzdGVtcy8nCiAgICAgICAgICAtICcvbWl0c3ViaXNoaS1lbGVjdHJpYy9mYWN0b3J5LWF1dG9tYXRpb24vJwogICAgICAgICAgLSAnL21veGEvbmV0d29yay1kZXZpY2VzLycKICAgICAgICAgIC0gJy9waG9lbml4LWNvbnRhY3QvaW5kdXN0cmlhbC1ldGhlcm5ldC8nCiAgICAgICAgICAtICcvYXZldmEvbWFudWZhY3R1cmluZy1zb2Z0d2FyZS8nCiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uCmZhbHNlcG9zaXRpdmVzOgogIC0gTGVnaXRpbWF0ZSBhZG1pbmlzdHJhdGl2ZSBhY3Rpdml0eQ=="
why_it_matters:
  - "If your organization relies on products from Siemens, Schneider Electric, Aveva, Rockwell Automation, ABB, Phoenix Contact, Mitsubishi Electric, or Moxa, you need to prioritize reviewing their latest security advisories. Immediately identify which of your deployed systems are affected and schedule patches to mitigate potential exploitation. Delaying these updates could expose your industrial operations to significant risk."
bot_cta_title: "Track ICS Vendors & Critical Vulnerabilities"
bot_cta_description: "Use /brief to get an analyst-ready weekly threat summary including relevant ICS advisories."
---

It's that time again: ICS Patch Tuesday has rolled around, and SecurityWeek reports that eight major industrial players have dropped new security advisories. This isn't just a handful of vendors; we're talking about the heavy hitters that form the backbone of critical infrastructure and manufacturing worldwide: Siemens, Schneider Electric, Aveva, Rockwell Automation, ABB, Phoenix Contact, Mitsubishi Electric, and Moxa.

These advisories signal that vulnerabilities, likely ranging from critical to moderate, have been identified and patched within their industrial control systems (ICS) and operational technology (OT) products. For anyone running these systems, ignoring these updates is akin to leaving the back door wide open. The implications of unpatched ICS vulnerabilities can be catastrophic, leading to operational disruptions, data compromise, and even physical damage. It's a stark reminder that the digital and physical worlds are inextricably linked, especially in industrial environments.
