---
title: "Exchange 0-Day, npm Worm, and Cisco Exploits Highlight Supply Chain Risks"
date: 2026-05-18 13:50:17 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, malware, ransomware, data-breach, cloud, microsoft]
excerpt: "The Hacker News's weekly recap highlights a critical convergence of attack vectors, underscoring systemic trust issues across the digital infrastructure. Active exploitation of an"
summary: "The Hacker News's weekly recap highlights a critical convergence of attack vectors, underscoring systemic trust issues across the digital infrastructure. Active exploitation of an Exchange 0-Day vulnerability is a stark reminder that even core enterprise services remain high-value targets, with atta"
layout: post
section: vulnerabilities
score: HIGH
curated: false
featured: false
priority: 90
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-020.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-020.png"
source_url: "https://thehackernews.com/2026/05/weekly-recap-exchange-0-day-npm-worm.html"
tlp: "TLP:CLEAR"
event_type: "vulnerability"
organizations:
  - name: "Microsoft Exchange"
    domain: "microsoft.com"
    role: "vendor"
  - name: "Cisco"
    domain: "cisco.com"
    role: "vendor"
link_preview:
  url: "https://thehackernews.com/2026/05/weekly-recap-exchange-0-day-npm-worm.html"
  title: "⚡ Weekly Recap: Exchange 0-Day, npm Worm, Fake AI Repo, Cisco Exploit and More"
  domain: "thehackernews.com"
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFzN7ITW3vwaWKn1m-BGZGI1JicT1T8d5v4LZbTvOTe7m1Xj4pk1pFECjAOvxey4XzXg7vGiU5Xzifs4qkzr9cbg2iPboHfPAHHBmi3O8OIAArhJlbr52gwKMkdqrIuIK77Pq8EzCTQM1hV5MsLuTbV4GXbXzr7miv0jA6o0Bn35RgBjc2cnd6qPq2-0Di/s1600/recapss.jpg"
iocs:
  - id: "Exchange-0-Day"
    type: "RCE"
    indicator: "Microsoft Exchange Server 0-day vulnerability"
  - id: "npm-Worm"
    type: "Code Injection"
    indicator: "Poisoned npm packages"
  - id: "Fake-AI-Repo"
    type: "Information Disclosure"
    indicator: "Fake AI model page distributing stealer malware"
  - id: "Cisco-Exploit"
    type: "RCE"
    indicator: "Cisco network control system exploit"
mitre_attack:
  - id: "T1190"
    name: "Exploit Public-Facing Application"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1190/"
  - id: "T1195.002"
    name: "Compromise Software Supply Chain"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1195/002/"
  - id: "T1078.004"
    name: "Cloud Accounts"
    tactic: "Persistence"
    url: "https://attack.mitre.org/techniques/T1078/004/"
sigma_rules:
  count: 1
  free_count: 1
  paid_count: 0
  preview_title: "Exploitation Attempt — Microsoft Exchange"
  preview_level: "high"
  preview_technique: "vulnerability"
  preview_tactic: "event-type"
  preview_yaml_b64: "dGl0bGU6IEV4cGxvaXRhdGlvbiBBdHRlbXB0IOKAlCBNaWNyb3NvZnQgRXhjaGFuZ2UKaWQ6IHNjdy0yMDI2LTA1LTE4LWV2dC0xCnN0YXR1czogZXhwZXJpbWVudGFsCmxldmVsOiBoaWdoCmRlc2NyaXB0aW9uOiB8CiAgTW9uaXRvciBmb3IgZXhwbG9pdGF0aW9uIGF0dGVtcHRzIHRhcmdldGluZyBDVkUtWFhYWC1YWFhYWC4gUGF0Y2ggaW1tZWRpYXRlbHkgaWYgcnVubmluZyBhZmZlY3RlZCBNaWNyb3NvZnQgRXhjaGFuZ2UgcHJvZHVjdHMuCmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChhdXRvLWdlbmVyYXRlZCkKZGF0ZTogMjAyNi0wNS0xOApyZWZlcmVuY2VzOgogIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNS0xOC13ZWVrbHktcmVjYXAtZXhjaGFuZ2UtMC1kYXktbnBtLXdvcm0tZmFrZS1haS1yZXBvLWNpc2MtYWhnYXEKdGFnczoKICAtIGF0dGFjay5nZW5lcmFsCiAgLSBhdHRhY2sudnVsbmVyYWJpbGl0eQpsb2dzb3VyY2U6CiAgICBjYXRlZ29yeTogd2Vic2VydmVyCmRldGVjdGlvbjoKICBzZWxlY3Rpb246CiAgICAgIGNzLXVyaS1xdWVyeXxjb250YWluczoKICAgICAgICAtICcnCiAgICAgIHNjLXN0YXR1czoKICAgICAgICAtIDIwMAogICAgICAgIC0gNTAwCiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uCmZhbHNlcG9zaXRpdmVzOgogIC0gTGVnaXRpbWF0ZSBhY3Rpdml0eSBmcm9tIE1pY3Jvc29mdCBFeGNoYW5nZQ=="
  all_rules_b64: "W3sidGl0bGUiOiJFeHBsb2l0YXRpb24gQXR0ZW1wdCDigJQgTWljcm9zb2Z0IEV4Y2hhbmdlIiwibGV2ZWwiOiJoaWdoIiwidGVjaG5pcXVlIjoidnVsbmVyYWJpbGl0eSIsInRhY3RpYyI6ImV2ZW50LXR5cGUiLCJ0aWVyIjoiZnJlZSIsInlhbWwiOiJ0aXRsZTogRXhwbG9pdGF0aW9uIEF0dGVtcHQg4oCUIE1pY3Jvc29mdCBFeGNoYW5nZVxuaWQ6IHNjdy0yMDI2LTA1LTE4LWV2dC0xXG5zdGF0dXM6IGV4cGVyaW1lbnRhbFxubGV2ZWw6IGhpZ2hcbmRlc2NyaXB0aW9uOiB8XG4gIE1vbml0b3IgZm9yIGV4cGxvaXRhdGlvbiBhdHRlbXB0cyB0YXJnZXRpbmcgQ1ZFLVhYWFgtWFhYWFguIFBhdGNoIGltbWVkaWF0ZWx5IGlmIHJ1bm5pbmcgYWZmZWN0ZWQgTWljcm9zb2Z0IEV4Y2hhbmdlIHByb2R1Y3RzLlxuYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKGF1dG8tZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNS0xOFxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTE4LXdlZWtseS1yZWNhcC1leGNoYW5nZS0wLWRheS1ucG0td29ybS1mYWtlLWFpLXJlcG8tY2lzYy1haGdhcVxudGFnczpcbiAgLSBhdHRhY2suZ2VuZXJhbFxuICAtIGF0dGFjay52dWxuZXJhYmlsaXR5XG5sb2dzb3VyY2U6XG4gICAgY2F0ZWdvcnk6IHdlYnNlcnZlclxuZGV0ZWN0aW9uOlxuICBzZWxlY3Rpb246XG4gICAgICBjcy11cmktcXVlcnl8Y29udGFpbnM6XG4gICAgICAgIC0gJydcbiAgICAgIHNjLXN0YXR1czpcbiAgICAgICAgLSAyMDBcbiAgICAgICAgLSA1MDBcbiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uXG5mYWxzZXBvc2l0aXZlczpcbiAgLSBMZWdpdGltYXRlIGFjdGl2aXR5IGZyb20gTWljcm9zb2Z0IEV4Y2hhbmdlIn1d"
why_it_matters:
  - "If your organization relies on public code repositories or uses Microsoft Exchange, prioritize immediate audits of your software supply chain dependencies and ensure Exchange servers are patched and monitored for suspicious activity. Assume compromise in critical network control systems and implement robust segmentation and anomaly detection. Revoke any leaked keys immediately and rotate credentials regularly."
bot_cta_title: "Track the Latest Vulnerabilities and Breaches"
bot_cta_description: "Use /breach to see the latest ransomware events and data breaches impacting organizations."
---

The Hacker News's weekly recap highlights a critical convergence of attack vectors, underscoring systemic trust issues across the digital infrastructure. Active exploitation of an Exchange 0-Day vulnerability is a stark reminder that even core enterprise services remain high-value targets, with attackers constantly probing for unpatched flaws. This is compounded by targeted attacks on network control systems, indicating a focus on critical infrastructure and operational technology environments that often have extended patch cycles.

Further compounding the threat landscape, The Hacker News points to poisoned npm packages and fake AI model repositories pushing stealers. These incidents exemplify the escalating supply chain risk. Developers, often under pressure, pull dependencies and models from public repositories without sufficient vetting, creating a fertile ground for adversaries to inject malicious code. One compromised dependency can propagate malware across countless applications, leading to data exfiltration or broader system compromise.

This pattern culminates in familiar ransomware claims, where data is allegedly returned and deleted. The underlying issue is clear: a single weak dependency can leak critical keys, granting cloud access that can quickly escalate into full production environment compromise. Defenders must recognize that the perimeter is dead; trust boundaries are now within the supply chain and every dependency imported.
