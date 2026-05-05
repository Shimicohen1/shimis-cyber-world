---
title: "OAuth Tokens: The Persistent Backdoor Most Teams Miss"
date: 2026-05-05 11:58:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, microsoft, identity, tools]
excerpt: "The Hacker News highlights a critical oversight in modern identity management: persistent OAuth tokens. Every AI tool, workflow automation, and productivity app employees connect t"
summary: "The Hacker News highlights a critical oversight in modern identity management: persistent OAuth tokens. Every AI tool, workflow automation, and productivity app employees connect to Google or Microsoft 365 services leaves behind a non-expiring OAuth token. These tokens bypass traditional perimeter c"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-028.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-028.png"
source_url: "https://thehackernews.com/2026/05/the-back-door-attackers-know-about-and.html"
tlp: "TLP:CLEAR"
event_type: "vulnerability"
organizations:
  - name: "Google"
    domain: "google.com"
    role: "vendor"
  - name: "Microsoft"
    domain: "microsoft.com"
    role: "vendor"
malware_families:
  - "Broomstick"
  - "STOP"
link_preview:
  url: "https://thehackernews.com/2026/05/the-back-door-attackers-know-about-and.html"
  title: "The Back Door Attackers Know About — and Most Security Teams Still Haven’t Closed"
  domain: "thehackernews.com"
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMhaEkMCxALglRWDFwTHVYgZ0KrRmAuzdwfh0zbL5Ml163rakQSv8yRVQ8yTQ4xIAtcwdqvGyVXeZXgXGNYKoyStckJv2xzjH3f1O7oICND5cWbnIBGYkSVJbpDRYHH9XqNfFQNk1qWIVwd43UuJv2vozhpndzCMS789h026IKgX1t7pgp01AtI6i9wKE/s1600/material.jpg"
iocs:
  - id: "THN-2026-05-OAuth-Tokens"
    type: "Auth Bypass"
    indicator: "Persistent OAuth tokens for Google/Microsoft services"
  - id: "THN-2026-05-OAuth-Tokens"
    type: "Information Disclosure"
    indicator: "OAuth tokens with no expiration date"
  - id: "THN-2026-05-OAuth-Tokens"
    type: "Misconfiguration"
    indicator: "Lack of automatic cleanup for OAuth tokens"
mitre_attack:
  - id: "T1539"
    name: "OAuth Access Token"
    tactic: "Persistence"
    url: "https://attack.mitre.org/techniques/T1539/"
  - id: "T1078.004"
    name: "Cloud Accounts"
    tactic: "Persistence"
    url: "https://attack.mitre.org/techniques/T1078/004/"
  - id: "T1078.004"
    name: "Cloud Accounts"
    tactic: "Defense Evasion"
    url: "https://attack.mitre.org/techniques/T1078/004/"
sigma_rules:
  count: 1
  free_count: 1
  paid_count: 0
  preview_title: "Exploitation Attempt — Google"
  preview_level: "high"
  preview_technique: "vulnerability"
  preview_tactic: "event-type"
  preview_yaml_b64: "dGl0bGU6IEV4cGxvaXRhdGlvbiBBdHRlbXB0IOKAlCBHb29nbGUKaWQ6IHNjdy0yMDI2LTA1LTA1LWV2dC0xCnN0YXR1czogZXhwZXJpbWVudGFsCmxldmVsOiBoaWdoCmRlc2NyaXB0aW9uOiB8CiAgTW9uaXRvciBmb3IgZXhwbG9pdGF0aW9uIGF0dGVtcHRzIHRhcmdldGluZyBDVkUtWFhYWC1YWFhYWC4gUGF0Y2ggaW1tZWRpYXRlbHkgaWYgcnVubmluZyBhZmZlY3RlZCBHb29nbGUgcHJvZHVjdHMuCmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChhdXRvLWdlbmVyYXRlZCkKZGF0ZTogMjAyNi0wNS0wNQpyZWZlcmVuY2VzOgogIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNS0wNS10aGUtYmFjay1kb29yLWF0dGFja2Vycy1rbm93LWFib3V0LWFuZC1tb3N0LXNlY3VyaXR5LXRlYW1zLTdhbGNxCnRhZ3M6CiAgLSBhdHRhY2suZ2VuZXJhbAogIC0gYXR0YWNrLnZ1bG5lcmFiaWxpdHkKbG9nc291cmNlOgogICAgY2F0ZWdvcnk6IHdlYnNlcnZlcgpkZXRlY3Rpb246CiAgc2VsZWN0aW9uOgogICAgICBjcy11cmktcXVlcnl8Y29udGFpbnM6CiAgICAgICAgLSAnJwogICAgICBzYy1zdGF0dXM6CiAgICAgICAgLSAyMDAKICAgICAgICAtIDUwMAogICAgICBjb25kaXRpb246IHNlbGVjdGlvbgpmYWxzZXBvc2l0aXZlczoKICAtIExlZ2l0aW1hdGUgYWN0aXZpdHkgZnJvbSBHb29nbGU="
  all_rules_b64: "W3sidGl0bGUiOiJFeHBsb2l0YXRpb24gQXR0ZW1wdCDigJQgR29vZ2xlIiwibGV2ZWwiOiJoaWdoIiwidGVjaG5pcXVlIjoidnVsbmVyYWJpbGl0eSIsInRhY3RpYyI6ImV2ZW50LXR5cGUiLCJ0aWVyIjoiZnJlZSIsInlhbWwiOiJ0aXRsZTogRXhwbG9pdGF0aW9uIEF0dGVtcHQg4oCUIEdvb2dsZVxuaWQ6IHNjdy0yMDI2LTA1LTA1LWV2dC0xXG5zdGF0dXM6IGV4cGVyaW1lbnRhbFxubGV2ZWw6IGhpZ2hcbmRlc2NyaXB0aW9uOiB8XG4gIE1vbml0b3IgZm9yIGV4cGxvaXRhdGlvbiBhdHRlbXB0cyB0YXJnZXRpbmcgQ1ZFLVhYWFgtWFhYWFguIFBhdGNoIGltbWVkaWF0ZWx5IGlmIHJ1bm5pbmcgYWZmZWN0ZWQgR29vZ2xlIHByb2R1Y3RzLlxuYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKGF1dG8tZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNS0wNVxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTA1LXRoZS1iYWNrLWRvb3ItYXR0YWNrZXJzLWtub3ctYWJvdXQtYW5kLW1vc3Qtc2VjdXJpdHktdGVhbXMtN2FsY3FcbnRhZ3M6XG4gIC0gYXR0YWNrLmdlbmVyYWxcbiAgLSBhdHRhY2sudnVsbmVyYWJpbGl0eVxubG9nc291cmNlOlxuICAgIGNhdGVnb3J5OiB3ZWJzZXJ2ZXJcbmRldGVjdGlvbjpcbiAgc2VsZWN0aW9uOlxuICAgICAgY3MtdXJpLXF1ZXJ5fGNvbnRhaW5zOlxuICAgICAgICAtICcnXG4gICAgICBzYy1zdGF0dXM6XG4gICAgICAgIC0gMjAwXG4gICAgICAgIC0gNTAwXG4gICAgICBjb25kaXRpb246IHNlbGVjdGlvblxuZmFsc2Vwb3NpdGl2ZXM6XG4gIC0gTGVnaXRpbWF0ZSBhY3Rpdml0eSBmcm9tIEdvb2dsZSJ9XQ=="
why_it_matters:
  - "If your organization's employees connect third-party apps to Google Workspace or Microsoft 365, you have persistent OAuth tokens floating around. Immediately audit all third-party application consents and revoke any unnecessary or suspicious grants. Implement continuous monitoring for OAuth token usage and unusual application access patterns. Don't assume MFA protects against this; it doesn't."
bot_cta_title: "Identify OAuth-Related Threats"
bot_cta_description: "Use /brief for an analyst-ready weekly threat summary, including identity-related attack vectors."
---

The Hacker News highlights a critical oversight in modern identity management: persistent OAuth tokens. Every AI tool, workflow automation, and productivity app employees connect to Google or Microsoft 365 services leaves behind a non-expiring OAuth token. These tokens bypass traditional perimeter controls and even multi-factor authentication (MFA), making them a prime target for attackers.

Once an attacker compromises an endpoint or a user's session, these tokens provide a direct, password-less route back into an organization's cloud services. The problem is exacerbated by the lack of automatic cleanup and the prevalent blind spot among security teams, who often lack visibility into these persistent authorizations. This creates a significant, unmonitored backdoor that attackers are well aware of and actively exploiting.

CISOs need to recognize that their existing MFA and perimeter defenses are insufficient against this vector. Attackers aren't always going for passwords anymore; they're going for the persistent session tokens that grant unfettered access. This shifts the focus from initial access to post-compromise persistence and lateral movement within the cloud identity fabric.
