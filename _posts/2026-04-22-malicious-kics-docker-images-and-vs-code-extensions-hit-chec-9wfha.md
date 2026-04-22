---
title: "Malicious KICS Docker Images and VS Code Extensions Hijack Checkmarx Supply Chain"
date: 2026-04-22 17:55:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, tools]
excerpt: "The Hacker News reports a critical software supply chain attack targeting Checkmarx's KICS (Key Infrastructure as Code Security) product. Malicious images were pushed to the offici"
summary: "The Hacker News reports a critical software supply chain attack targeting Checkmarx's KICS (Key Infrastructure as Code Security) product. Malicious images were pushed to the official \"checkmarx/kics\" Docker Hub repository. Threat actors reportedly overwrote existing tags, including `v2.1.20` and `al"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-043.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-043.png"
source_url: "https://thehackernews.com/2026/04/malicious-kics-docker-images-and-vs.html"
tlp: "TLP:CLEAR"
event_type: "supply-chain"
organizations:
  - name: "Checkmarx"
    domain: "checkmarx.com"
    role: "vendor"
  - name: "Docker Hub"
    domain: "docker.com"
    role: "vendor"
  - name: "Socket"
    domain: "socket.dev"
    role: "vendor"
malware_families:
  - "Dark Shades"
iocs:
  - id: "Checkmarx-KICS-SupplyChain"
    type: "Supply Chain Attack"
    indicator: "Malicious Docker images in 'checkmarx/kics' Docker Hub repository"
  - id: "Checkmarx-KICS-SupplyChain"
    type: "Supply Chain Attack"
    indicator: "Overwritten Docker image tags: v2.1.20, alpine"
  - id: "Checkmarx-KICS-SupplyChain"
    type: "Supply Chain Attack"
    indicator: "New unofficial Docker image tag: v2.1.21"
  - id: "Checkmarx-KICS-SupplyChain"
    type: "Supply Chain Attack"
    indicator: "Malicious VS Code Extensions related to KICS"
mitre_attack:
  - id: "T1195.002"
    name: "Compromise Software Supply Chain"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1195/002/"
  - id: "T1078.004"
    name: "Cloud Accounts"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1078/004/"
  - id: "T1588.002"
    name: "Obtain Capabilities: Malware"
    tactic: "Resource Development"
    url: "https://attack.mitre.org/techniques/T1588/002/"
sigma_rules:
  count: 3
  free_count: 1
  paid_count: 2
  preview_title: "Malicious KICS Docker Image Pull"
  preview_level: "critical"
  preview_technique: "T1588"
  preview_tactic: "Reconnaissance"
  preview_yaml_b64: "dGl0bGU6IE1hbGljaW91cyBLSUNTIERvY2tlciBJbWFnZSBQdWxsCmlkOiBzY3ctMjAyNi0wNC0yMi1haS0xCnN0YXR1czogZXhwZXJpbWVudGFsCmxldmVsOiBjcml0aWNhbApkZXNjcmlwdGlvbjogfAogIERldGVjdHMgdGhlIHB1bGxpbmcgb2Ygc3BlY2lmaWMgbWFsaWNpb3VzIG9yIHBvdGVudGlhbGx5IGNvbXByb21pc2VkIEtJQ1MgRG9ja2VyIGltYWdlIHRhZ3MgKCd2Mi4xLjIxJywgJ2FscGluZScsICd2Mi4xLjIwJykgZnJvbSBEb2NrZXIgSHViLCBhcyBkZXNjcmliZWQgaW4gdGhlIHN1cHBseSBjaGFpbiBhdHRhY2sgdGFyZ2V0aW5nIENoZWNrbWFyeCBLSUNTLiBUaGlzIGluZGljYXRlcyBhbiBhdHRlbXB0IHRvIGludHJvZHVjZSBjb21wcm9taXNlZCBjb2RlIGludG8gdGhlIGRldmVsb3BtZW50IGVudmlyb25tZW50LgphdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKQpkYXRlOiAyMDI2LTA0LTIyCnJlZmVyZW5jZXM6CiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA0LTIyLW1hbGljaW91cy1raWNzLWRvY2tlci1pbWFnZXMtYW5kLXZzLWNvZGUtZXh0ZW5zaW9ucy1oaXQtY2hlYy05d2ZoYQp0YWdzOgogIC0gYXR0YWNrLnJlY29ubmFpc3NhbmNlCiAgLSBhdHRhY2sudDE1ODgKbG9nc291cmNlOgogICAgY2F0ZWdvcnk6IHByb2Nlc3NfY3JlYXRpb24KZGV0ZWN0aW9uOgogIHNlbGVjdGlvbjoKICAgICAgSW1hZ2V8Y29udGFpbnM6CiAgICAgICAgICAtICdjaGVja21hcngva2ljczp2LjIuMS4yMScKICAgICAgICAgIC0gJ2NoZWNrbWFyeC9raWNzOnYyLjEuMjEnCiAgICAgICAgICAtICdjaGVja21hcngva2ljczphbHBpbmUnCiAgICAgICAgICAtICdjaGVja21hcngva2ljczp2Mi4xLjIwJwogICAgICBjb25kaXRpb246IHNlbGVjdGlvbgpmYWxzZXBvc2l0aXZlczoKICAtIExlZ2l0aW1hdGUgYWRtaW5pc3RyYXRpdmUgYWN0aXZpdHk="
  all_rules_b64: "W3sidGl0bGUiOiJNYWxpY2lvdXMgS0lDUyBEb2NrZXIgSW1hZ2UgUHVsbCIsImxldmVsIjoiY3JpdGljYWwiLCJ0ZWNobmlxdWUiOiJUMTU4OCIsInRhY3RpYyI6IlJlY29ubmFpc3NhbmNlIiwidGllciI6ImZyZWUiLCJ5YW1sIjoidGl0bGU6IE1hbGljaW91cyBLSUNTIERvY2tlciBJbWFnZSBQdWxsXG5pZDogc2N3LTIwMjYtMDQtMjItYWktMVxuc3RhdHVzOiBleHBlcmltZW50YWxcbmxldmVsOiBjcml0aWNhbFxuZGVzY3JpcHRpb246IHxcbiAgRGV0ZWN0cyB0aGUgcHVsbGluZyBvZiBzcGVjaWZpYyBtYWxpY2lvdXMgb3IgcG90ZW50aWFsbHkgY29tcHJvbWlzZWQgS0lDUyBEb2NrZXIgaW1hZ2UgdGFncyAoJ3YyLjEuMjEnLCAnYWxwaW5lJywgJ3YyLjEuMjAnKSBmcm9tIERvY2tlciBIdWIsIGFzIGRlc2NyaWJlZCBpbiB0aGUgc3VwcGx5IGNoYWluIGF0dGFjayB0YXJnZXRpbmcgQ2hlY2ttYXJ4IEtJQ1MuIFRoaXMgaW5kaWNhdGVzIGFuIGF0dGVtcHQgdG8gaW50cm9kdWNlIGNvbXByb21pc2VkIGNvZGUgaW50byB0aGUgZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnQuXG5hdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNC0yMlxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA0LTIyLW1hbGljaW91cy1raWNzLWRvY2tlci1pbWFnZXMtYW5kLXZzLWNvZGUtZXh0ZW5zaW9ucy1oaXQtY2hlYy05d2ZoYVxudGFnczpcbiAgLSBhdHRhY2sucmVjb25uYWlzc2FuY2VcbiAgLSBhdHRhY2sudDE1ODhcbmxvZ3NvdXJjZTpcbiAgICBjYXRlZ29yeTogcHJvY2Vzc19jcmVhdGlvblxuZGV0ZWN0aW9uOlxuICBzZWxlY3Rpb246XG4gICAgICBJbWFnZXxjb250YWluczpcbiAgICAgICAgICAtICdjaGVja21hcngva2ljczp2LjIuMS4yMSdcbiAgICAgICAgICAtICdjaGVja21hcngva2ljczp2Mi4xLjIxJ1xuICAgICAgICAgIC0gJ2NoZWNrbWFyeC9raWNzOmFscGluZSdcbiAgICAgICAgICAtICdjaGVja21hcngva2ljczp2Mi4xLjIwJ1xuICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb25cbmZhbHNlcG9zaXRpdmVzOlxuICAtIExlZ2l0aW1hdGUgYWRtaW5pc3RyYXRpdmUgYWN0aXZpdHkifSx7InRpdGxlIjoiU3VzcGljaW91cyBWUyBDb2RlIEV4dGVuc2lvbiBJbnN0YWxsYXRpb24iLCJsZXZlbCI6ImhpZ2giLCJ0ZWNobmlxdWUiOiJUMTU4OCIsInRhY3RpYyI6IlJlY29ubmFpc3NhbmNlIiwidGllciI6InBhaWQiLCJ5YW1sIjoidGl0bGU6IFN1c3BpY2lvdXMgVlMgQ29kZSBFeHRlbnNpb24gSW5zdGFsbGF0aW9uXG5pZDogc2N3LTIwMjYtMDQtMjItYWktMlxuc3RhdHVzOiBleHBlcmltZW50YWxcbmxldmVsOiBoaWdoXG5kZXNjcmlwdGlvbjogfFxuICBEZXRlY3RzIHRoZSBpbnN0YWxsYXRpb24gb2YgVlMgQ29kZSBleHRlbnNpb25zLCBzcGVjaWZpY2FsbHkgbG9va2luZyBmb3IgdGhvc2UgcmVsYXRlZCB0byBDaGVja21hcngsIHdoaWNoIGNvdWxkIGJlIGEgdmVjdG9yIGZvciB0aGUgc3VwcGx5IGNoYWluIGF0dGFjayBkZXNjcmliZWQuIFRoaXMgcnVsZSBpcyBkZXNpZ25lZCB0byBmbGFnIHRoZSBpbnN0YWxsYXRpb24gb2YgcG90ZW50aWFsbHkgbWFsaWNpb3VzIFZTIENvZGUgZXh0ZW5zaW9ucyB0aGF0IHdlcmUgcGFydCBvZiB0aGUgYnJvYWRlciBhdHRhY2suXG5hdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNC0yMlxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA0LTIyLW1hbGljaW91cy1raWNzLWRvY2tlci1pbWFnZXMtYW5kLXZzLWNvZGUtZXh0ZW5zaW9ucy1oaXQtY2hlYy05d2ZoYVxudGFnczpcbiAgLSBhdHRhY2sucmVjb25uYWlzc2FuY2VcbiAgLSBhdHRhY2sudDE1ODhcbmxvZ3NvdXJjZTpcbiAgICBjYXRlZ29yeTogcHJvY2Vzc19jcmVhdGlvblxuZGV0ZWN0aW9uOlxuICBzZWxlY3Rpb246XG4gICAgICBDb21tYW5kTGluZXxjb250YWluczpcbiAgICAgICAgICAtICdjb2RlIC0taW5zdGFsbC1leHRlbnNpb24nXG4gICAgICAgICAgLSAnY29kZSAtLWluc3RhbGwtZXh0ZW5zaW9uIGNoZWNrbWFyeCdcbiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uXG5mYWxzZXBvc2l0aXZlczpcbiAgLSBMZWdpdGltYXRlIGFkbWluaXN0cmF0aXZlIGFjdGl2aXR5In0seyJ0aXRsZSI6IlJvZ3VlIEtJQ1MgRG9ja2VyIEltYWdlIFRhZyBQdXNoIiwibGV2ZWwiOiJjcml0aWNhbCIsInRlY2huaXF1ZSI6IlQxNTg4IiwidGFjdGljIjoiUmVjb25uYWlzc2FuY2UiLCJ0aWVyIjoicGFpZCIsInlhbWwiOiJ0aXRsZTogUm9ndWUgS0lDUyBEb2NrZXIgSW1hZ2UgVGFnIFB1c2hcbmlkOiBzY3ctMjAyNi0wNC0yMi1haS0zXG5zdGF0dXM6IGV4cGVyaW1lbnRhbFxubGV2ZWw6IGNyaXRpY2FsXG5kZXNjcmlwdGlvbjogfFxuICBEZXRlY3RzIHRoZSBzcGVjaWZpYyBjb21tYW5kIHVzZWQgdG8gcHVzaCBhIHJvZ3VlICd2Mi4xLjIxJyB0YWcgdG8gdGhlICdjaGVja21hcngva2ljcycgRG9ja2VyIEh1YiByZXBvc2l0b3J5LiBUaGlzIGRpcmVjdGx5IGluZGljYXRlcyB0aGUgY29tcHJvbWlzZSBhbmQgbWFsaWNpb3VzIGFjdGl2aXR5IHdpdGhpbiB0aGUgc3VwcGx5IGNoYWluIGFzIGRlc2NyaWJlZCBpbiB0aGUgaW5jaWRlbnQuXG5hdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNC0yMlxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA0LTIyLW1hbGljaW91cy1raWNzLWRvY2tlci1pbWFnZXMtYW5kLXZzLWNvZGUtZXh0ZW5zaW9ucy1oaXQtY2hlYy05d2ZoYVxudGFnczpcbiAgLSBhdHRhY2sucmVjb25uYWlzc2FuY2VcbiAgLSBhdHRhY2sudDE1ODhcbmxvZ3NvdXJjZTpcbiAgICBjYXRlZ29yeTogcHJvY2Vzc19jcmVhdGlvblxuZGV0ZWN0aW9uOlxuICBzZWxlY3Rpb246XG4gICAgICBDb21tYW5kTGluZXxjb250YWluczpcbiAgICAgICAgICAtICdkb2NrZXIgcHVzaCBjaGVja21hcngva2ljczp2LjIuMS4yMSdcbiAgICAgICAgICAtICdkb2NrZXIgcHVzaCBjaGVja21hcngva2ljczp2Mi4xLjIxJ1xuICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb25cbmZhbHNlcG9zaXRpdmVzOlxuICAtIExlZ2l0aW1hdGUgYWRtaW5pc3RyYXRpdmUgYWN0aXZpdHkifV0="
why_it_matters:
  - "If your organization uses Checkmarx KICS Docker images or related VS Code extensions, you must immediately audit your build environments and developer workstations. Verify the integrity of all `checkmarx/kics` Docker images against official Checkmarx checksums. Revoke any API keys or credentials exposed to potentially compromised build systems. This isn't a drill; malicious code could already be embedded in your software artifacts."
bot_cta_title: "Checkmarx Supply Chain Exposure"
bot_cta_description: "Use /org checkmarx.com to see related threat intelligence and advisories."
---

The Hacker News reports a critical software supply chain attack targeting Checkmarx's KICS (Key Infrastructure as Code Security) product. Malicious images were pushed to the official "checkmarx/kics" Docker Hub repository. Threat actors reportedly overwrote existing tags, including `v2.1.20` and `alpine`, and introduced a rogue `v2.1.21` tag that does not correspond to any legitimate release. This indicates a compromise of Checkmarx's Docker Hub account or their CI/CD pipeline.

This incident extends beyond Docker images, with The Hacker News also highlighting malicious VS Code extensions. This dual-pronged attack vector demonstrates a sophisticated approach to poisoning development environments and build processes. Developers pulling these compromised images or installing the malicious extensions would unknowingly integrate backdoors or data exfiltration capabilities directly into their projects, potentially leading to widespread compromise across their organizations.

For defenders, this is a stark reminder that even trusted software supply chains are under constant assault. The attacker's calculus here is clear: compromise a widely used security tool to gain a foothold in hundreds, if not thousands, of downstream development environments. This isn't just about a single vulnerability; it's about subverting the very tools meant to secure our code.
