---
title: "JDownloader Installer Compromised, Delivering Python RAT via Unpatched CMS"
date: 2026-05-15 12:45:47 +0000
source: RSS
source_name: "Malwarebytes Blog"
channel: "Malwarebytes Blog"
tags: [malware, threat-intel, ransomware, vulnerability, data-breach, microsoft, identity]
excerpt: "Attackers compromised the JDownloader website between May 6-7, affecting the Windows \"Download Alternative Installer\" links and the Linux shell installer. Malwarebytes Blog reports"
summary: "Attackers compromised the JDownloader website between May 6-7, affecting the Windows \"Download Alternative Installer\" links and the Linux shell installer. Malwarebytes Blog reports that during this window, users downloading these installers received a Python-based Remote Access Trojan (RAT) instead"
layout: post
section: vulnerabilities
score: HIGH
curated: false
featured: false
priority: 75
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-030.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-030.png"
source_url: "https://www.malwarebytes.com/blog/news/2026/05/attackers-replaced-jdownloader-installer-downloads-with-malware"
tlp: "TLP:CLEAR"
event_type: "supply-chain"
organizations:
  - name: "JDownloader"
    domain: "jdownloader.org"
    role: "victim"
  - name: "AppWork GmbH"
    domain: "appwork.org"
    role: "vendor"
link_preview:
  url: "https://www.malwarebytes.com/blog/news/2026/05/attackers-replaced-jdownloader-installer-downloads-with-malware"
  title: "Attackers replaced JDownloader installer downloads with malware"
  domain: "malwarebytes.com"
  image: "https://www.malwarebytes.com/wp-content/uploads/sites/2/2026/05/JDownloader_logo.png"
iocs:
  - id: "JDownloader-Compromise-2026-05"
    type: "Code Injection"
    indicator: "JDownloader installer downloads for Windows ('Download Alternative Installer' links) and Linux (shell installer) compromised between May 6-7, 2026."
  - id: "JDownloader-Compromise-2026-05"
    type: "Misconfiguration"
    indicator: "Unpatched CMS security bug allowing modification of access control lists without authentication on JDownloader website."
  - id: "JDownloader-Compromise-2026-05"
    type: "Information Disclosure"
    indicator: "Malicious JDownloader Windows installers deployed a Python-based remote access Trojan (RAT)."
  - id: "JDownloader-Compromise-2026-05"
    type: "Malware"
    indicator: "Malicious JDownloader installers lacked digital signatures from 'AppWork GmbH'."
  - id: "JDownloader-Compromise-2026-05"
    type: "Malware"
    indicator: "Domains contacted by RAT: parkspringhotel[.]com"
mitre_attack:
  - id: "T1190"
    name: "Exploit Public-Facing Application"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1190/"
  - id: "T1608.001"
    name: "Stage Capabilities: Upload Malware"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1608/001/"
  - id: "T1071.001"
    name: "Web Protocols: Web Protocols"
    tactic: "Command and Control"
    url: "https://attack.mitre.org/techniques/T1071/001/"
sigma_rules:
  count: 2
  free_count: 1
  paid_count: 1
  preview_title: "Traffic to Compromised Vendor — JDownloader"
  preview_level: "high"
  preview_technique: "supply-chain"
  preview_tactic: "event-type"
  preview_yaml_b64: "dGl0bGU6IFRyYWZmaWMgdG8gQ29tcHJvbWlzZWQgVmVuZG9yIOKAlCBKRG93bmxvYWRlcgppZDogc2N3LTIwMjYtMDUtMTUtZXZ0LTEKc3RhdHVzOiBleHBlcmltZW50YWwKbGV2ZWw6IGhpZ2gKZGVzY3JpcHRpb246IHwKICBNb25pdG9yIGFsbCB0cmFmZmljIHRvIGpkb3dubG9hZGVyLm9yZyBmb2xsb3dpbmcgdGhlIHN1cHBseSBjaGFpbiBjb21wcm9taXNlLiBSZXZpZXcgZm9yIHVuZXhwZWN0ZWQgZG93bmxvYWRzLCB1cGRhdGVzLCBvciBiZWFjb24gcGF0dGVybnMuCmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChhdXRvLWdlbmVyYXRlZCkKZGF0ZTogMjAyNi0wNS0xNQpyZWZlcmVuY2VzOgogIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNS0xNS1hdHRhY2tlcnMtcmVwbGFjZWQtamRvd25sb2FkZXItaW5zdGFsbGVyLWRvd25sb2Fkcy13aXRoLW1hbHctbmU3eXAKdGFnczoKICAtIGF0dGFjay5nZW5lcmFsCiAgLSBhdHRhY2suc3VwcGx5LWNoYWluCmxvZ3NvdXJjZToKICAgIGNhdGVnb3J5OiBwcm94eQpkZXRlY3Rpb246CiAgc2VsZWN0aW9uOgogICAgICBkc3RfZG9tYWlufGVuZHN3aXRoOgogICAgICAgIC0gJ2pkb3dubG9hZGVyLm9yZycKICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb24KZmFsc2Vwb3NpdGl2ZXM6CiAgLSBMZWdpdGltYXRlIGFjdGl2aXR5IGZyb20gSkRvd25sb2FkZXI="
  all_rules_b64: "W3sidGl0bGUiOiJUcmFmZmljIHRvIENvbXByb21pc2VkIFZlbmRvciDigJQgSkRvd25sb2FkZXIiLCJsZXZlbCI6ImhpZ2giLCJ0ZWNobmlxdWUiOiJzdXBwbHktY2hhaW4iLCJ0YWN0aWMiOiJldmVudC10eXBlIiwidGllciI6ImZyZWUiLCJ5YW1sIjoidGl0bGU6IFRyYWZmaWMgdG8gQ29tcHJvbWlzZWQgVmVuZG9yIOKAlCBKRG93bmxvYWRlclxuaWQ6IHNjdy0yMDI2LTA1LTE1LWV2dC0xXG5zdGF0dXM6IGV4cGVyaW1lbnRhbFxubGV2ZWw6IGhpZ2hcbmRlc2NyaXB0aW9uOiB8XG4gIE1vbml0b3IgYWxsIHRyYWZmaWMgdG8gamRvd25sb2FkZXIub3JnIGZvbGxvd2luZyB0aGUgc3VwcGx5IGNoYWluIGNvbXByb21pc2UuIFJldmlldyBmb3IgdW5leHBlY3RlZCBkb3dubG9hZHMsIHVwZGF0ZXMsIG9yIGJlYWNvbiBwYXR0ZXJucy5cbmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChhdXRvLWdlbmVyYXRlZClcbmRhdGU6IDIwMjYtMDUtMTVcbnJlZmVyZW5jZXM6XG4gIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNS0xNS1hdHRhY2tlcnMtcmVwbGFjZWQtamRvd25sb2FkZXItaW5zdGFsbGVyLWRvd25sb2Fkcy13aXRoLW1hbHctbmU3eXBcbnRhZ3M6XG4gIC0gYXR0YWNrLmdlbmVyYWxcbiAgLSBhdHRhY2suc3VwcGx5LWNoYWluXG5sb2dzb3VyY2U6XG4gICAgY2F0ZWdvcnk6IHByb3h5XG5kZXRlY3Rpb246XG4gIHNlbGVjdGlvbjpcbiAgICAgIGRzdF9kb21haW58ZW5kc3dpdGg6XG4gICAgICAgIC0gJ2pkb3dubG9hZGVyLm9yZydcbiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uXG5mYWxzZXBvc2l0aXZlczpcbiAgLSBMZWdpdGltYXRlIGFjdGl2aXR5IGZyb20gSkRvd25sb2FkZXIifSx7InRpdGxlIjoiU29mdHdhcmUgVXBkYXRlIGZyb20gSkRvd25sb2FkZXIg4oCUIEludGVncml0eSBDaGVjayIsImxldmVsIjoiaGlnaCIsInRlY2huaXF1ZSI6InN1cHBseS1jaGFpbiIsInRhY3RpYyI6ImV2ZW50LXR5cGUiLCJ0aWVyIjoicGFpZCIsInlhbWwiOiJ0aXRsZTogU29mdHdhcmUgVXBkYXRlIGZyb20gSkRvd25sb2FkZXIg4oCUIEludGVncml0eSBDaGVja1xuaWQ6IHNjdy0yMDI2LTA1LTE1LWV2dC0yXG5zdGF0dXM6IGV4cGVyaW1lbnRhbFxubGV2ZWw6IGhpZ2hcbmRlc2NyaXB0aW9uOiB8XG4gIERldGVjdHMgc29mdHdhcmUgdXBkYXRlcyBvcmlnaW5hdGluZyBmcm9tIEpEb3dubG9hZGVyLiBWZXJpZnkgdXBkYXRlIGludGVncml0eSBhbmQgY29uc2lkZXIgYmxvY2tpbmcgYXV0b21hdGljIHVwZGF0ZXMgdW50aWwgdGhlIHZlbmRvciBjb25maXJtcyB0aGUgc3VwcGx5IGNoYWluIGlzIHNlY3VyZWQuXG5hdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoYXV0by1nZW5lcmF0ZWQpXG5kYXRlOiAyMDI2LTA1LTE1XG5yZWZlcmVuY2VzOlxuICAtIGh0dHBzOi8vc2hpbWlzY3liZXJ3b3JsZC5jb20vX3Bvc3RzLzIwMjYtMDUtMTUtYXR0YWNrZXJzLXJlcGxhY2VkLWpkb3dubG9hZGVyLWluc3RhbGxlci1kb3dubG9hZHMtd2l0aC1tYWx3LW5lN3lwXG50YWdzOlxuICAtIGF0dGFjay5nZW5lcmFsXG4gIC0gYXR0YWNrLnN1cHBseS1jaGFpblxubG9nc291cmNlOlxuICAgIGNhdGVnb3J5OiBwcm9jZXNzX2NyZWF0aW9uXG5kZXRlY3Rpb246XG4gIHNlbGVjdGlvbjpcbiAgICAgIENvbW1hbmRMaW5lfGNvbnRhaW5zOlxuICAgICAgICAtICdqZG93bmxvYWRlci5vcmcnXG4gICAgICAgIC0gJ3VwZGF0ZSdcbiAgICAgICAgLSAnaW5zdGFsbCdcbiAgICAgIFBhcmVudEltYWdlfGVuZHN3aXRoOlxuICAgICAgICAtICdcXHNlcnZpY2VzLmV4ZSdcbiAgICAgICAgLSAnXFxzdmNob3N0LmV4ZSdcbiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uXG5mYWxzZXBvc2l0aXZlczpcbiAgLSBMZWdpdGltYXRlIGFjdGl2aXR5IGZyb20gSkRvd25sb2FkZXIifV0="
why_it_matters:
  - "If your organization uses JDownloader, specifically the Windows alternative or Linux shell installer, and downloaded it between May 6-7, 2026, you must assume compromise. Immediately verify the digital signature of the installed JDownloader executable. If it lacks a valid \"AppWork GmbH\" signature, perform a full system scan with a trusted EDR solution and initiate incident response procedures. This is a classic supply chain attack leveraging a vulnerable CMS; ensure your public-facing web infrastructure is patched and hardened against known vulnerabilities, especially in CMS platforms."
bot_cta_title: "Check Latest Supply Chain Threats"
bot_cta_description: "Use /brief to get an analyst-ready weekly threat summary, including critical supply chain vulnerabilities and IOCs."
---

Attackers compromised the JDownloader website between May 6-7, affecting the Windows "Download Alternative Installer" links and the Linux shell installer. Malwarebytes Blog reports that during this window, users downloading these installers received a Python-based Remote Access Trojan (RAT) instead of the legitimate software. This supply chain attack did not impact macOS, JAR files, Flatpak, Winget, or Snap packages, nor did it affect users applying updates during the period.

The breach vector was an unpatched Content Management System (CMS) security bug, which allowed unauthorized modification of access control lists. Malwarebytes Blog notes that the JDownloader developers swiftly took the site offline on May 7, restoring it with verified clean installers and hardened server configurations by May 8-9. Users are advised to verify their installer's digital signature from "AppWork GmbH," as the malicious versions lacked this.
