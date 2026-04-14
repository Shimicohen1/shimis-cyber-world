---
title: "ShowDoc RCE Flaw CVE-2025-0520 Under Active Exploitation"
date: 2026-04-14 05:50:00 +0000
source: Telegram
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [vulnerability]
excerpt: "A critical remote code execution (RCE) vulnerability in ShowDoc, a document management and collaboration service widely used in China, is currently under active exploitation. The f"
summary: "A critical remote code execution (RCE) vulnerability in ShowDoc, a document management and collaboration service widely used in China, is currently under active exploitation. The flaw, identified as CVE-2025-0520 (also tracked as CNVD-2020-26585), boasts a severe CVSS score of 9.4, indicating its hi"
layout: post
section: vulnerabilities
score: HIGH
curated: false
featured: false
priority: 80
hidden: false
cover_image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop&auto=format&q=80"
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop&auto=format&q=80"
telegram_url: "https://t.me/c/rss-thehackernews/rss-thehackernews-xhtvge"
tlp: "TLP:CLEAR"
event_type: "vulnerability"
organizations:
  - name: "ShowDoc"
    domain: "showdoc.com.cn"
    role: "vendor"
countries: [CN]
why_it_matters:
  - "If your organization utilizes ShowDoc, especially on internet-facing servers, you need to verify your patch status for CVE-2025-0520 immediately. This isn't a theoretical threat; it's actively being exploited. Prioritize patching, review access logs for suspicious file uploads, and scan your environments for any signs of compromise related to this RCE."
bot_cta_title: "ShowDoc Vulnerability Intel"
bot_cta_description: "Use /brief for an analyst-ready summary of critical vulnerabilities like CVE-2025-0520."
iocs:
  - id: "CVE-2025-0520"
    type: "RCE"
    indicator: "ShowDoc document management platform — unrestricted file upload leading to remote code execution"
  - id: "CVE-2025-0520"
    type: "Unrestricted File Upload"
    indicator: "ShowDoc improper file type validation allows malicious file upload and execution (CVSS 9.4)"
  - id: "CVE-2025-0520"
    type: "Affected Product"
    indicator: "ShowDoc (also tracked as CNVD-2020-26585) — under active exploitation"
mitre_attack:
  - id: "T1190"
    name: "Exploit Public-Facing Application"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1190/"
  - id: "T1505.003"
    name: "Web Shell"
    tactic: "Persistence"
    url: "https://attack.mitre.org/techniques/T1505/003/"
sigma_rules:
  count: 6
  free_count: 3
  paid_count: 3
  preview_title: "Web Application Exploitation Attempt — ShowDoc"
  preview_level: "high"
  preview_technique: "T1190"
  preview_tactic: "Initial Access"
  formats:
    sigma: "dGl0bGU6IFdlYiBBcHBsaWNhdGlvbiBFeHBsb2l0YXRpb24gQXR0ZW1wdCDigJQgU2hvd0RvYwppZDogc2N3LTIwMjYtMDQtMTQtMQpzdGF0dXM6IGV4cGVyaW1lbnRhbApsZXZlbDogaGlnaApkZXNjcmlwdGlvbjogfAogIERldGVjdHMgY29tbW9uIGV4cGxvaXRhdGlvbiBwYXR0ZXJucyB0YXJnZXRpbmcgd2ViIGFwcGxpY2F0aW9ucy4gUmV2aWV3IFNob3dEb2MgYWR2aXNvcmllcyBmb3Igc3BlY2lmaWMgaW5kaWNhdG9ycy4KYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKGF1dG8tZ2VuZXJhdGVkKQpkYXRlOiAyMDI2LTA0LTE0CnJlZmVyZW5jZXM6CiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA0LTE0LXRlbGVncmFtLXJzc3RoZWhhY2tlcm5ld3MtcnNzdGhlaGFja2VybmV3c3hodHZnZQp0YWdzOgogIC0gYXR0YWNrLmluaXRpYWxfYWNjZXNzCiAgLSBhdHRhY2sudDExOTAKbG9nc291cmNlOgogICAgY2F0ZWdvcnk6IHdlYnNlcnZlcgpkZXRlY3Rpb246CiAgc2VsZWN0aW9uOgogICAgICBjcy11cmktcXVlcnl8Y29udGFpbnM6CiAgICAgICAgLSAnLi4nCiAgICAgICAgLSAnU0VMRUNUJwogICAgICAgIC0gJ1VOSU9OJwogICAgICAgIC0gJzxzY3JpcHQnCiAgICAgICAgLSAnY21kPScKICAgICAgICAtICcvZXRjL3Bhc3N3ZCcKICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb24KZmFsc2Vwb3NpdGl2ZXM6CiAgLSBMZWdpdGltYXRlIGFjdGl2aXR5IGZyb20gU2hvd0RvYw=="
---

A critical remote code execution (RCE) vulnerability in ShowDoc, a document management and collaboration service widely used in China, is currently under active exploitation. The flaw, identified as CVE-2025-0520 (also tracked as CNVD-2020-26585), boasts a severe CVSS score of 9.4, indicating its high potential for impact.

According to The Hacker News, this vulnerability stems from an unrestricted file upload issue. Essentially, ShowDoc's improper validation of file types allows attackers to upload malicious files, which can then be executed on unpatched servers. This kind of flaw is a dream for threat actors, providing a direct avenue for initial access and subsequent system compromise. Once an attacker can run arbitrary code, the game is pretty much over for the target organization.
