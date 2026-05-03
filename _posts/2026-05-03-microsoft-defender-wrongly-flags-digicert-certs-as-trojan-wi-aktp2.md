---
title: "Microsoft Defender Flags DigiCert Certificates as Trojan"
date: 2026-05-03 18:11:25 +0000
source: RSS
source_name: "BleepingComputer"
channel: "BleepingComputer"
tags: [threat-intel, data-breach, malware, microsoft]
excerpt: "Microsoft Defender is currently flagging legitimate DigiCert root certificates as `Trojan:Win32/Cerdigent.A!dha`. BleepingComputer reports that this false positive is not only gene"
summary: "Microsoft Defender is currently flagging legitimate DigiCert root certificates as `Trojan:Win32/Cerdigent.A!dha`. BleepingComputer reports that this false positive is not only generating widespread alerts but, in some instances, is also leading to the removal of these critical certificates from Wind"
layout: post
section: live-feed
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-024.png"
author: research
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-024.png"
source_url: "https://www.bleepingcomputer.com/news/security/microsoft-defender-wrongly-flags-digicert-certs-as-trojan-win32-cerdigentadha/"
tlp: "TLP:CLEAR"
event_type: "advisory"
organizations:
  - name: "Microsoft"
    domain: "microsoft.com"
    role: "vendor"
  - name: "DigiCert"
    domain: "digicert.com"
    role: "vendor"
malware_families:
  - "Chaos"
link_preview:
  url: "https://www.bleepingcomputer.com/news/security/microsoft-defender-wrongly-flags-digicert-certs-as-trojan-win32-cerdigentadha/"
  title: "Microsoft Defender wrongly flags DigiCert certs as Trojan:Win32/Cerdigent.A!dha"
  domain: "bleepingcomputer.com"
  image: "https://www.bleepstatic.com/content/hl-images/2024/01/26/microsoft-red-header.jpg"
why_it_matters:
  - "If your organization uses Windows systems with Microsoft Defender, you need to be checking for `Trojan:Win32/Cerdigent.A!dha` alerts. Prioritize validating if these detections are indeed false positives targeting DigiCert certificates. Do not automatically quarantine or remove, as this will break critical system functionality. Be ready to restore certificates and implement exclusions if Microsoft doesn't push a fix rapidly."
bot_cta_title: "Stay Ahead of Critical Advisories"
bot_cta_description: "Use /brief to get analyst-ready weekly threat summaries with severity rankings and key IOCs."
---

Microsoft Defender is currently flagging legitimate DigiCert root certificates as `Trojan:Win32/Cerdigent.A!dha`. BleepingComputer reports that this false positive is not only generating widespread alerts but, in some instances, is also leading to the removal of these critical certificates from Windows systems.

This isn't a minor annoyance; it's a critical operational disruption. When legitimate root certificates are removed, it breaks trust chains, impacting everything from secure website access to application functionality and internal network communications. Organizations relying on these certificates for their infrastructure or applications are seeing unexpected outages and security warnings.

Attackers thrive on chaos and weakened trust. While this is a false positive, the disruption it causes for defenders is very real. It wastes SOC time, introduces uncertainty, and creates an environment where actual threats could be missed amidst the noise.
