---
title: "Microsoft BitLocker Zero-Day Exposes Protected Drives"
date: 2026-05-13 16:37:49 +0000
source: RSS
source_name: "BleepingComputer"
channel: "BleepingComputer"
tags: [threat-intel, data-breach, malware, vulnerability, microsoft, tools]
excerpt: "A cybersecurity researcher has publicly released proof-of-concept (PoC) exploits for two unpatched Microsoft Windows vulnerabilities, dubbed YellowKey and GreenPlasma. BleepingComp"
summary: "A cybersecurity researcher has publicly released proof-of-concept (PoC) exploits for two unpatched Microsoft Windows vulnerabilities, dubbed YellowKey and GreenPlasma. BleepingComputer reports that these flaws include a BitLocker bypass and a privilege-escalation vulnerability, respectively. The rel"
layout: post
section: vulnerabilities
score: HIGH
curated: false
featured: false
priority: 80
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-014.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-014.png"
source_url: "https://www.bleepingcomputer.com/news/security/windows-bitlocker-zero-day-gives-access-to-protected-drives-poc-released/"
tlp: "TLP:CLEAR"
event_type: "vulnerability"
organizations:
  - name: "Microsoft"
    domain: "microsoft.com"
    role: "vendor"
link_preview:
  url: "https://www.bleepingcomputer.com/news/security/windows-bitlocker-zero-day-gives-access-to-protected-drives-poc-released/"
  title: "Windows BitLocker zero-day gives access to protected drives, PoC released"
  domain: "bleepingcomputer.com"
  image: "https://www.bleepstatic.com/content/hl-images/2026/02/13/Windows-headpic.jpg"
iocs:
  - id: "YellowKey"
    type: "Auth Bypass"
    indicator: "Microsoft Windows BitLocker bypass vulnerability"
  - id: "GreenPlasma"
    type: "Privilege Escalation"
    indicator: "Microsoft Windows privilege-escalation flaw"
sigma_rules:
  count: 1
  free_count: 1
  paid_count: 0
  preview_title: "Exploitation Attempt — Microsoft"
  preview_level: "high"
  preview_technique: "vulnerability"
  preview_tactic: "event-type"
  preview_yaml_b64: "dGl0bGU6IEV4cGxvaXRhdGlvbiBBdHRlbXB0IOKAlCBNaWNyb3NvZnQKaWQ6IHNjdy0yMDI2LTA1LTEzLWV2dC0xCnN0YXR1czogZXhwZXJpbWVudGFsCmxldmVsOiBoaWdoCmRlc2NyaXB0aW9uOiB8CiAgTW9uaXRvciBmb3IgZXhwbG9pdGF0aW9uIGF0dGVtcHRzIHRhcmdldGluZyBDVkUtWFhYWC1YWFhYWC4gUGF0Y2ggaW1tZWRpYXRlbHkgaWYgcnVubmluZyBhZmZlY3RlZCBNaWNyb3NvZnQgcHJvZHVjdHMuCmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChhdXRvLWdlbmVyYXRlZCkKZGF0ZTogMjAyNi0wNS0xMwpyZWZlcmVuY2VzOgogIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNS0xMy13aW5kb3dzLWJpdGxvY2tlci16ZXJvLWRheS1naXZlcy1hY2Nlc3MtdG8tcHJvdGVjdGVkLWRyaXZlcy1lZTY2cQp0YWdzOgogIC0gYXR0YWNrLmdlbmVyYWwKICAtIGF0dGFjay52dWxuZXJhYmlsaXR5CmxvZ3NvdXJjZToKICAgIGNhdGVnb3J5OiB3ZWJzZXJ2ZXIKZGV0ZWN0aW9uOgogIHNlbGVjdGlvbjoKICAgICAgY3MtdXJpLXF1ZXJ5fGNvbnRhaW5zOgogICAgICAgIC0gJycKICAgICAgc2Mtc3RhdHVzOgogICAgICAgIC0gMjAwCiAgICAgICAgLSA1MDAKICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb24KZmFsc2Vwb3NpdGl2ZXM6CiAgLSBMZWdpdGltYXRlIGFjdGl2aXR5IGZyb20gTWljcm9zb2Z0"
  all_rules_b64: "W3sidGl0bGUiOiJFeHBsb2l0YXRpb24gQXR0ZW1wdCDigJQgTWljcm9zb2Z0IiwibGV2ZWwiOiJoaWdoIiwidGVjaG5pcXVlIjoidnVsbmVyYWJpbGl0eSIsInRhY3RpYyI6ImV2ZW50LXR5cGUiLCJ0aWVyIjoiZnJlZSIsInlhbWwiOiJ0aXRsZTogRXhwbG9pdGF0aW9uIEF0dGVtcHQg4oCUIE1pY3Jvc29mdFxuaWQ6IHNjdy0yMDI2LTA1LTEzLWV2dC0xXG5zdGF0dXM6IGV4cGVyaW1lbnRhbFxubGV2ZWw6IGhpZ2hcbmRlc2NyaXB0aW9uOiB8XG4gIE1vbml0b3IgZm9yIGV4cGxvaXRhdGlvbiBhdHRlbXB0cyB0YXJnZXRpbmcgQ1ZFLVhYWFgtWFhYWFguIFBhdGNoIGltbWVkaWF0ZWx5IGlmIHJ1bm5pbmcgYWZmZWN0ZWQgTWljcm9zb2Z0IHByb2R1Y3RzLlxuYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKGF1dG8tZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNS0xM1xucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTEzLXdpbmRvd3MtYml0bG9ja2VyLXplcm8tZGF5LWdpdmVzLWFjY2Vzcy10by1wcm90ZWN0ZWQtZHJpdmVzLWVlNjZxXG50YWdzOlxuICAtIGF0dGFjay5nZW5lcmFsXG4gIC0gYXR0YWNrLnZ1bG5lcmFiaWxpdHlcbmxvZ3NvdXJjZTpcbiAgICBjYXRlZ29yeTogd2Vic2VydmVyXG5kZXRlY3Rpb246XG4gIHNlbGVjdGlvbjpcbiAgICAgIGNzLXVyaS1xdWVyeXxjb250YWluczpcbiAgICAgICAgLSAnJ1xuICAgICAgc2Mtc3RhdHVzOlxuICAgICAgICAtIDIwMFxuICAgICAgICAtIDUwMFxuICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb25cbmZhbHNlcG9zaXRpdmVzOlxuICAtIExlZ2l0aW1hdGUgYWN0aXZpdHkgZnJvbSBNaWNyb3NvZnQifV0="
why_it_matters:
  - "If your organization relies on BitLocker for data protection, this zero-day demands immediate attention. While there's no patch yet, you must evaluate alternative or supplementary data protection strategies for critical systems. Assess the physical security of your endpoints and servers, as these bypasses often require physical access or specific boot conditions. Consider implementing layered encryption or strong access controls on top of BitLocker until a fix is available."
bot_cta_title: "Track Microsoft Vulnerabilities"
bot_cta_description: "Use /brief to get an analyst-ready weekly threat summary including major vulnerabilities like this one."
---

A cybersecurity researcher has publicly released proof-of-concept (PoC) exploits for two unpatched Microsoft Windows vulnerabilities, dubbed YellowKey and GreenPlasma. BleepingComputer reports that these flaws include a BitLocker bypass and a privilege-escalation vulnerability, respectively. The release of these PoCs significantly lowers the bar for attackers to develop functional exploits.

The YellowKey vulnerability specifically targets BitLocker, allowing an attacker to gain access to drives supposedly protected by Microsoft's full-disk encryption. This is not a theoretical threat; it's a direct bypass of a core security control. The GreenPlasma flaw, a privilege escalation vulnerability, would likely be chained with YellowKey to achieve persistent, elevated access to compromised systems.

This development is critical because it undermines the fundamental assumption that BitLocker provides robust data protection. For organizations relying on BitLocker for sensitive data, this zero-day represents a severe risk of unauthorized data access and potential exfiltration. The attacker's calculus here is straightforward: target systems with BitLocker, exploit YellowKey, and gain access to encrypted data.
