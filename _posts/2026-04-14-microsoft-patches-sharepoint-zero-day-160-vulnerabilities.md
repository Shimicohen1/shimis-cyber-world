---
title: "Microsoft Patches SharePoint Zero-Day, 160 Vulnerabilities"
date: 2026-04-14 18:14:37 +0000
source: RSS
source_name: "SecurityWeek"
channel: "SecurityWeek"
tags: [threat-intel, vulnerability, microsoft]
excerpt: "Microsoft's latest Patch Tuesday was a big one, addressing a staggering 161 vulnerabilities. According to SecurityWeek, this makes it the second-largest Patch Tuesday ever, based p"
summary: "Microsoft's latest Patch Tuesday was a big one, addressing a staggering 161 vulnerabilities. According to SecurityWeek, this makes it the second-largest Patch Tuesday ever, based purely on the Common Vulnerabilities and Exposures (CVE) count. This isn't just about volume, though; it includes a criti"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 70
hidden: false
cover_image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop&auto=format&q=80"
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop&auto=format&q=80"
source_url: "https://www.securityweek.com/microsoft-patches-exploited-sharepoint-zero-day-and-160-other-vulnerabilities/"
tlp: "TLP:CLEAR"
event_type: "vulnerability"
organizations:
  - name: "Microsoft"
    domain: "microsoft.com"
    role: "vendor"
  - name: "SharePoint"
    domain: "sharepoint.com"
    role: "vendor"
iocs:
  - id: "Microsoft-Patch-Tuesday-Zero-Day"
    type: "RCE"
    indicator: "Microsoft SharePoint zero-day vulnerability"
  - id: "Microsoft-Patch-Tuesday-Zero-Day"
    type: "Multiple Vulnerabilities"
    indicator: "160 other vulnerabilities patched by Microsoft"
mitre_attack:
  - id: "T1190"
    name: "Exploit Public-Facing Application"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1190/"
sigma_rules:
  count: 1
  free_count: 1
  paid_count: 0
  preview_title: "Exploitation Attempt — Microsoft"
  preview_level: "high"
  preview_technique: "vulnerability"
  preview_tactic: "event-type"
  preview_yaml_b64: "dGl0bGU6IFdlYiBBcHBsaWNhdGlvbiBFeHBsb2l0YXRpb24gQXR0ZW1wdCDigJQgTWljcm9zb2Z0CmlkOiBzY3ctMjAyNi0wNC0xNC0xCnN0YXR1czogZXhwZXJpbWVudGFsCmxldmVsOiBoaWdoCmRlc2NyaXB0aW9uOiB8CiAgRGV0ZWN0cyBjb21tb24gZXhwbG9pdGF0aW9uIHBhdHRlcm5zIHRhcmdldGluZyB3ZWIgYXBwbGljYXRpb25zLiBSZXZpZXcgTWljcm9zb2Z0IGFkdmlzb3JpZXMgZm9yIHNwZWNpZmljIGluZGljYXRvcnMuCmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChhdXRvLWdlbmVyYXRlZCkKZGF0ZTogMjAyNi0wNC0xNApyZWZlcmVuY2VzOgogIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS8yMDI2LTA0LTE0LW1pY3Jvc29mdC1wYXRjaGVzLXNoYXJlcG9pbnQtemVyby1kYXktMTYwLXZ1bG5lcmFiaWxpdGllcwp0YWdzOgogIC0gYXR0YWNrLmluaXRpYWxfYWNjZXNzCiAgLSBhdHRhY2sudDExOTAKbG9nc291cmNlOgogICAgY2F0ZWdvcnk6IHdlYnNlcnZlcgpkZXRlY3Rpb246CiAgc2VsZWN0aW9uOgogICAgICBjcy11cmktcXVlcnl8Y29udGFpbnM6CiAgICAgICAgLSAnLi4nCiAgICAgICAgLSAnU0VMRUNUJwogICAgICAgIC0gJ1VOSU9OJwogICAgICAgIC0gJzxzY3JpcHQnCiAgICAgICAgLSAnY21kPScKICAgICAgICAtICcvZXRjL3Bhc3N3ZCcKICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb24KZmFsc2Vwb3NpdGl2ZXM6CiAgLSBMZWdpdGltYXRlIGFjdGl2aXR5IGZyb20gTWljcm9zb2Z0"
why_it_matters:
  - "If your organization leverages Microsoft SharePoint, immediately prioritize patching against the exploited zero-day and all other critical vulnerabilities addressed in this Patch Tuesday. Delaying these updates leaves a gaping hole for attackers who are already aware of and actively exploiting this flaw. Verify that your patching cycles are up to date and consider an immediate audit of your SharePoint environments for any signs of compromise."
bot_cta_title: "Stay Ahead of Microsoft Vulnerabilities"
bot_cta_description: "Use /brief to get an analyst-ready weekly summary of critical vulnerabilities and IOCs."
---

Microsoft's latest Patch Tuesday was a big one, addressing a staggering 161 vulnerabilities. According to SecurityWeek, this makes it the second-largest Patch Tuesday ever, based purely on the Common Vulnerabilities and Exposures (CVE) count. This isn't just about volume, though; it includes a critical, actively exploited zero-day flaw in SharePoint.

The SharePoint zero-day is the standout here. When a vulnerability is already being weaponized in the wild, it elevates the risk significantly. It means attackers have found a way in, and if you're running unpatched SharePoint instances, you're a prime target. While SecurityWeek didn't detail the specifics of the exploitation, the mere fact that it's in the wild should set off alarm bells for any organization relying on SharePoint for collaboration and content management.
