---
title: "Microsoft Servers Hit by April Patch Causing Domain Controller Reboot Loops"
date: 2026-04-17 07:59:47 +0000
source: RSS
source_name: "BleepingComputer"
channel: "BleepingComputer"
tags: [threat-intel, data-breach, malware, vulnerability, microsoft]
excerpt: "Microsoft has issued a warning that recent April security updates have caused critical Windows domain controllers to enter persistent reboot loops. This issue primarily affects ser"
summary: "Microsoft has issued a warning that recent April security updates have caused critical Windows domain controllers to enter persistent reboot loops. This issue primarily affects servers acting as domain controllers, which are essential for managing user access and network resources in Windows environ"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 70
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-007.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-007.png"
source_url: "https://www.bleepingcomputer.com/news/microsoft/microsoft-warns-of-reboot-loops-affecting-some-domain-controllers/"
tlp: "TLP:CLEAR"
event_type: "vulnerability"
organizations:
  - name: "Microsoft"
    domain: "microsoft.com"
    role: "vendor"
threat_actors:
  - "APT41"
link_preview:
  url: "https://www.bleepingcomputer.com/news/microsoft/microsoft-warns-of-reboot-loops-affecting-some-domain-controllers/"
  title: "Microsoft: Some Windows servers enter reboot loops after April patches"
  domain: "bleepingcomputer.com"
  image: "https://www.bleepstatic.com/content/hl-images/2026/04/17/Windows_Server.jpg"
iocs:
  - id: "Advisory"
    type: "Security Patch"
    indicator: "April"
mitre_attack:
  - id: "T1499"
    name: "Endpoint Denial of Service"
    tactic: "Impact"
    url: "https://attack.mitre.org/techniques/T1499/"
  - id: "T1561"
    name: "Disk Wipe"
    tactic: "Impact"
    url: "https://attack.mitre.org/techniques/T1561/"
sigma_rules:
  count: 3
  free_count: 1
  paid_count: 2
  preview_title: "Domain Controller Reboot Loop due to April Patch"
  preview_level: "critical"
  preview_technique: "T1499"
  preview_tactic: "Impact"
  preview_yaml_b64: "dGl0bGU6IERvbWFpbiBDb250cm9sbGVyIFJlYm9vdCBMb29wIGR1ZSB0byBBcHJpbCBQYXRjaAppZDogc2N3LTIwMjYtMDQtMTctYWktMQpzdGF0dXM6IGV4cGVyaW1lbnRhbApsZXZlbDogY3JpdGljYWwKZGVzY3JpcHRpb246IHwKICBUaGlzIHJ1bGUgZGV0ZWN0cyB0aGUgc3BlY2lmaWMgYmVoYXZpb3Igb2YgYSBzeXN0ZW0gc2h1dGRvd24gY29tbWFuZCBiZWluZyBpbml0aWF0ZWQgYnkgd2luaW5pdC5leGUsIHdoaWNoIGlzIG9mdGVuIGEgcHJlY3Vyc29yIG9yIGluZGljYXRvciBvZiB0aGUgcmVib290IGxvb3AgaXNzdWUgY2F1c2VkIGJ5IHRoZSBwcm9ibGVtYXRpYyBBcHJpbCAyMDI2IHNlY3VyaXR5IHVwZGF0ZXMgYWZmZWN0aW5nIERvbWFpbiBDb250cm9sbGVycy4gVGhlIHVzZSBvZiAnbHNhc3MuZXhlJyBpbiB0aGUgSW1hZ2UgZmllbGQgaXMgYSBjb21tb24gY2hhcmFjdGVyaXN0aWMgb2YgcHJvY2Vzc2VzIGludm9sdmVkIGluIGNyaXRpY2FsIHN5c3RlbSBvcGVyYXRpb25zIHRoYXQgbWlnaHQgYmUgaW5kaXJlY3RseSBhZmZlY3RlZCBvciB0cmlnZ2VyIHN1Y2ggbG9vcHMuCmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChBSS1nZW5lcmF0ZWQpCmRhdGU6IDIwMjYtMDQtMTcKcmVmZXJlbmNlczoKICAtIGh0dHBzOi8vc2hpbWlzY3liZXJ3b3JsZC5jb20vcG9zdHMvbWljcm9zb2Z0LXNvbWUtd2luZG93cy1zZXJ2ZXJzLWVudGVyLXJlYm9vdC1sb29wcy1hZnRlci1hcHIteHM3ZHovCnRhZ3M6CiAgLSBhdHRhY2suaW1wYWN0CiAgLSBhdHRhY2sudDE0OTkKbG9nc291cmNlOgogICAgY2F0ZWdvcnk6IHByb2Nlc3NfY3JlYXRpb24KZGV0ZWN0aW9uOgogIHNlbGVjdGlvbjoKICAgICAgSW1hZ2V8Y29udGFpbnM6CiAgICAgICAgICAtICdsc2Fzcy5leGUnCiAgICAgIFBhcmVudEltYWdlfGNvbnRhaW5zOgogICAgICAgICAgLSAnd2luaW5pdC5leGUnCiAgICAgIENvbW1hbmRMaW5lfGNvbnRhaW5zOgogICAgICAgICAgLSAnL3N5c3RlbXJvb3Rcc3lzdGVtMzJcc2h1dGRvd24uZXhlIC9yIC90IDAgL2YnCiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uCmZhbHNlcG9zaXRpdmVzOgogIC0gTGVnaXRpbWF0ZSBhZG1pbmlzdHJhdGl2ZSBhY3Rpdml0eQ=="
why_it_matters:
  - "If your organization installed the April 2026 Windows security updates and is experiencing domain controller instability or reboot loops, you need to immediately investigate rolling back the affected patches. Monitor critical servers closely for unexpected restarts and be ready to isolate or revert systems that exhibit this behavior to restore service."
bot_cta_title: "Check Microsoft patch impact on your org"
bot_cta_description: "Use /org microsoft.com to see related advisories and vulnerabilities."
---

Microsoft has issued a warning that recent April security updates have caused critical Windows domain controllers to enter persistent reboot loops. This issue primarily affects servers acting as domain controllers, which are essential for managing user access and network resources in Windows environments. The unexpected restarts can lead to significant downtime and operational disruption for organizations relying on these services.

BleepingComputer reports that the problematic patches are linked to the April 2026 security updates. While Microsoft is investigating, the immediate impact is a loss of critical infrastructure availability. Defenders must be prepared to troubleshoot and potentially roll back these updates if their domain controllers exhibit this behavior. The calculus for attackers here is simple: if they can exploit vulnerabilities that lead to instability or denial of service, even indirectly through faulty patches, they can disrupt target operations.
