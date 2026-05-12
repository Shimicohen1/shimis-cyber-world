---
title: "Microsoft Releases Windows 10 KB5087544 Extended Security Update"
date: 2026-05-12 18:58:34 +0000
source: RSS
source_name: "BleepingComputer"
channel: "BleepingComputer"
tags: [threat-intel, data-breach, malware, vulnerability, microsoft, tools]
excerpt: "Microsoft has rolled out the Windows 10 KB5087544 extended security update. BleepingComputer reports this update addresses vulnerabilities from May 2026 Patch Tuesday. It also incl"
summary: "Microsoft has rolled out the Windows 10 KB5087544 extended security update. BleepingComputer reports this update addresses vulnerabilities from May 2026 Patch Tuesday. It also includes a fix for issues related to new Remote Desktop warnings. This update is critical for organizations still running Wi"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 70
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-019.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-019.png"
source_url: "https://www.bleepingcomputer.com/news/microsoft/microsoft-releases-windows-10-kb5087544-extended-security-update/"
tlp: "TLP:CLEAR"
event_type: "advisory"
organizations:
  - name: "Microsoft"
    domain: "microsoft.com"
    role: "vendor"
link_preview:
  url: "https://www.bleepingcomputer.com/news/microsoft/microsoft-releases-windows-10-kb5087544-extended-security-update/"
  title: "Microsoft releases Windows 10 KB5087544 extended security update"
  domain: "bleepingcomputer.com"
  image: "https://www.bleepstatic.com/content/hl-images/2024/09/10/windows-10-gradient.jpg"
iocs:
  - id: "KB5087544"
    type: "Patch"
    indicator: "Windows 10 KB5087544 extended security update"
  - id: "KB5087544"
    type: "Vulnerability Fix"
    indicator: "May 2026 Patch Tuesday vulnerabilities"
  - id: "KB5087544"
    type: "Remote Desktop Issue"
    indicator: "Remote Desktop warnings"
mitre_attack:
  - id: "T1190"
    name: "Exploit Public-Facing Application"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1190/"
  - id: "T1200"
    name: "Hardware Additions"
    tactic: "Persistence"
    url: "https://attack.mitre.org/techniques/T1200/"
  - id: "T1021.001"
    name: "Remote Services: Remote Desktop Protocol"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1021/001/"
why_it_matters:
  - "If your organization has Windows 10 systems, especially those under extended security update programs, you must deploy KB5087544 immediately. Prioritize this patch. Failing to do so leaves your endpoints vulnerable to known, exploitable flaws and could expose your network to initial access via insecure RDP configurations."
bot_cta_title: "Track Microsoft Vulnerabilities"
bot_cta_description: "Use /org microsoft.com to see the latest threats and advisories related to Microsoft products."
---

Microsoft has rolled out the Windows 10 KB5087544 extended security update. BleepingComputer reports this update addresses vulnerabilities from May 2026 Patch Tuesday. It also includes a fix for issues related to new Remote Desktop warnings.

This update is critical for organizations still running Windows 10, especially those relying on extended security updates. Neglecting these patches leaves significant attack surface open. Attackers are relentless; they don't care about your upgrade roadmap. They care about unpatched systems they can exploit.

SCW advises immediate deployment of KB5087544. The inclusion of a fix for Remote Desktop warnings suggests ongoing attention to common remote access vectors, which are frequently abused by threat actors for initial access and lateral movement. Don't let your RDP endpoints become an easy entry point.
