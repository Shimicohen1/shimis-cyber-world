---
title: "Obsidian Plugin Abuse Unleashes Novel PHANTOMPULSE RAT"
date: 2026-04-16 11:02:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, malware, microsoft, phishing]
excerpt: "The Hacker News is flagging a sophisticated social engineering campaign that's weaponizing Obsidian, the popular note-taking app, as an entry point. Attackers are exploiting Obsidi"
summary: "The Hacker News is flagging a sophisticated social engineering campaign that's weaponizing Obsidian, the popular note-taking app, as an entry point. Attackers are exploiting Obsidian plugins to deliver a previously unknown Windows remote access trojan dubbed PHANTOMPULSE. This campaign, identified b"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://images.unsplash.com/photo-1618060932014-4deda4932554?w=800&h=400&fit=crop&auto=format&q=80"
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://images.unsplash.com/photo-1618060932014-4deda4932554?w=800&h=400&fit=crop&auto=format&q=80"
source_url: "https://thehackernews.com/2026/04/obsidian-plugin-abuse-delivers.html"
tlp: "TLP:CLEAR"
event_type: "tool_release"
organizations:
  - name: "Elastic"
    domain: "elastic.co"
    role: "vendor"
malware_families:
  - "Leverage"
mitre_attack:
  - id: "T1190"
    name: "Exploit Public-Facing Application"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1190/"
  - id: "T1204.002"
    name: "Malicious File"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1204/002/"
  - id: "T1588.002"
    name: "Tool"
    tactic: "Resource Development"
    url: "https://attack.mitre.org/techniques/T1588/002/"
sigma_rules:
  count: 3
  free_count: 1
  paid_count: 2
  preview_title: "PHANTOMPULSE RAT - Malicious Obsidian Plugin Installation"
  preview_level: "critical"
  preview_technique: "T1190"
  preview_tactic: "Initial Access"
  preview_yaml_b64: "dGl0bGU6IFBIQU5UT01QVUxTRSBSQVQgLSBNYWxpY2lvdXMgT2JzaWRpYW4gUGx1Z2luIEluc3RhbGxhdGlvbgppZDogc2N3LTIwMjYtMDQtMTYtYWktMQpzdGF0dXM6IGV4cGVyaW1lbnRhbApsZXZlbDogY3JpdGljYWwKZGVzY3JpcHRpb246IHwKICBEZXRlY3RzIHRoZSBpbnN0YWxsYXRpb24gb2YgbWFsaWNpb3VzIE9ic2lkaWFuIHBsdWdpbnMsIHdoaWNoIGlzIHRoZSBwcmltYXJ5IGluaXRpYWwgYWNjZXNzIHZlY3RvciBmb3IgdGhlIFBIQU5UT01QVUxTRSBSQVQuIFRoaXMgcnVsZSBsb29rcyBmb3IgdGhlIE9ic2lkaWFuIGV4ZWN1dGFibGUgYmVpbmcgbGF1bmNoZWQgd2l0aCBjb21tYW5kcyByZWxhdGVkIHRvIHBsdWdpbiBpbnN0YWxsYXRpb24sIHBvdGVudGlhbGx5IGluaXRpYXRlZCBieSBjb21tYW5kLWxpbmUgaW50ZXJwcmV0ZXJzLgphdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKQpkYXRlOiAyMDI2LTA0LTE2CnJlZmVyZW5jZXM6CiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL3Bvc3RzL29ic2lkaWFuLXBsdWdpbi1hYnVzZS1kZWxpdmVycy1waGFudG9tcHVsc2UtcmF0LWluLXRhcmdldGVkLXZsdTVvLwp0YWdzOgogIC0gYXR0YWNrLmluaXRpYWxfYWNjZXNzCiAgLSBhdHRhY2sudDExOTAKbG9nc291cmNlOgogICAgY2F0ZWdvcnk6IHByb2Nlc3NfY3JlYXRpb24KZGV0ZWN0aW9uOgogIHNlbGVjdGlvbjoKICAgICAgSW1hZ2V8ZW5kc3dpdGg6CiAgICAgICAgICAtICdvYnNpZGlhbi5leGUnCiAgICAgIFBhcmVudEltYWdlfGNvbnRhaW5zOgogICAgICAgICAgLSAnY21kLmV4ZScKICAgICAgICAgIC0gJ3Bvd2Vyc2hlbGwuZXhlJwogICAgICBDb21tYW5kTGluZXxjb250YWluczoKICAgICAgICAgIC0gJ2luc3RhbGwtcGx1Z2luJwogICAgICAgICAgLSAnb2JzaWRpYW46Ly9zaG93LXBsdWdpbicKICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb24KZmFsc2Vwb3NpdGl2ZXM6CiAgLSBMZWdpdGltYXRlIGFkbWluaXN0cmF0aXZlIGFjdGl2aXR5"
why_it_matters:
  - "If your organization uses Obsidian, audit all installed plugins immediately. Remove any plugins from untrusted sources or those you can't verify the legitimacy of. Educate your finance and crypto teams about sophisticated social engineering targeting their sector, especially regarding software plugins and extensions."
bot_cta_title: "Track Obsidian-related threats?"
bot_cta_description: "Use /brief to get the latest threat intelligence."
---

The Hacker News is flagging a sophisticated social engineering campaign that's weaponizing Obsidian, the popular note-taking app, as an entry point. Attackers are exploiting Obsidian plugins to deliver a previously unknown Windows remote access trojan dubbed PHANTOMPULSE. This campaign, identified by Elastic Security Labs as REF6598, appears to be highly targeted, focusing on individuals within the finance and cryptocurrency sectors.

The TTPs (tactics, techniques, and procedures) involve tricking users into installing malicious Obsidian plugins, which then serve as the conduit for deploying the PHANTOMPULSE RAT. This novel approach bypasses traditional defenses by leveraging a trusted application's extensibility features, a tactic that security pros know can be particularly nasty.
