---
title: "Fake Claude AI Installer Delivers PlugX via DLL Sideloading"
date: 2026-04-14 07:19:57 +0000
source: Telegram
source_name: "Security Affairs"
channel: "Security Affairs"
tags: [malware, vulnerability, cloud, microsoft, identity, phishing]
excerpt: "Cybercriminals are leveraging the buzz around AI chatbots to lure unsuspecting users into malware traps. Security Affairs reports that a fake website, masquerading as Anthropic's p"
summary: "Cybercriminals are leveraging the buzz around AI chatbots to lure unsuspecting users into malware traps. Security Affairs reports that a fake website, masquerading as Anthropic's popular Claude AI service, has been caught distributing the notorious PlugX remote access trojan (RAT). The attackers are"
layout: post
section: vulnerabilities
score: HIGH
curated: false
featured: false
priority: 80
hidden: false
cover_image: "https://images.unsplash.com/photo-1678811326980-ea1b88cd9e8c?w=800&h=400&fit=crop&auto=format&q=80"
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://images.unsplash.com/photo-1678811326980-ea1b88cd9e8c?w=800&h=400&fit=crop&auto=format&q=80"
telegram_url: "https://t.me/c/rss-securityaffairs/rss-securityaffairs-lpkyjp"
tlp: "TLP:CLEAR"
event_type: "malware"
organizations:
  - name: "Anthropic"
    domain: "claude.ai"
    role: "vendor"
  - name: "G DATA"
    domain: "gdata.de"
    role: "vendor"
threat_actors:
  - "PlugX"
  - "Cleaver"
malware_families:
  - "Dark Shades"
  - "PlugX"
link_preview:
  url: "https://securityaffairs.com/190754/malware/fake-claude-ai-installer-abuses-dll-sideloading-to-deploy-plugx.html"
  title: "Fake Claude AI installer abuses DLL sideloading to deploy PlugX"
  domain: "securityaffairs.com"
  image: "https://securityaffairs.com/wp-content/uploads/2026/04/image-43.png"
why_it_matters:
  - "If your organization uses AI tools or downloads software from unofficial sources, scrutinize all installers. Verify the authenticity of download sites and ensure your endpoint detection and response (EDR) solutions are up-to-date to catch DLL sideloading attempts and known malware families like PlugX."
bot_cta_title: "Track PlugX and AI-themed threats"
bot_cta_description: "Use /actor PlugX to see related threats and intelligence."
iocs:
  - id: "PlugX-Claude-Fake"
    type: "Malware"
    indicator: "PlugX RAT deployed via fake Anthropic Claude AI installer"
  - id: "PlugX-Claude-Fake"
    type: "DLL Sideloading"
    indicator: "NOVUpdate.exe (legitimate G DATA updater) loads malicious avk.dll (T1574.002)"
  - id: "PlugX-Claude-Fake"
    type: "Indicator"
    indicator: "Dropped files: NOVUpdate.exe, avk.dll, encrypted .dat payload in Windows Startup folder"
  - id: "PlugX-Claude-Fake"
    type: "C2 Infrastructure"
    indicator: "Command-and-control server hosted on Alibaba Cloud"
mitre_attack:
  - id: "T1574.002"
    name: "DLL Side-Loading"
    tactic: "Persistence"
    url: "https://attack.mitre.org/techniques/T1574/002/"
  - id: "T1204.002"
    name: "Malicious File"
    tactic: "Execution"
    url: "https://attack.mitre.org/techniques/T1204/002/"
  - id: "T1036"
    name: "Masquerading"
    tactic: "Defense Evasion"
    url: "https://attack.mitre.org/techniques/T1036/"
sigma_rules:
  count: 2
  free_count: 2
  paid_count: 0
  preview_title: "DLL Side-Loading Detection"
  preview_level: "high"
  preview_technique: "T1574.002"
  preview_tactic: "Persistence"
  preview_yaml_b64: "dGl0bGU6IERMTCBTaWRlLUxvYWRpbmcgRGV0ZWN0aW9uCmlkOiBzY3ctMjAyNi0wNC0xNC0xCnN0YXR1czogZXhwZXJpbWVudGFsCmxldmVsOiBoaWdoCmRlc2NyaXB0aW9uOiB8CiAgRGV0ZWN0cyB1bnNpZ25lZCBETExzIGxvYWRlZCBieSBsZWdpdGltYXRlIGV4ZWN1dGFibGVzLCBhIGNvbW1vbiB0ZWNobmlxdWUgZm9yIHBlcnNpc3RlbmNlIGFuZCBkZWZlbnNlIGV2YXNpb24uCmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChhdXRvLWdlbmVyYXRlZCkKZGF0ZTogMjAyNi0wNC0xNApyZWZlcmVuY2VzOgogIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS8yMDI2LTA0LTE0LWZha2UtY2xhdWRlLWFpLWluc3RhbGxlci1kZWxpdmVycy1wbHVneC12aWEtZGxsLXNpZGVsb2FkaW5nCnRhZ3M6CiAgLSBhdHRhY2sucGVyc2lzdGVuY2UKICAtIGF0dGFjay50MTU3NC4wMDIKbG9nc291cmNlOgogICAgY2F0ZWdvcnk6IGltYWdlX2xvYWQKICAgIHByb2R1Y3Q6IHdpbmRvd3MKZGV0ZWN0aW9uOgogIHNlbGVjdGlvbjoKICAgICAgSW1hZ2VMb2FkZWR8ZW5kc3dpdGg6CiAgICAgICAgLSAnLmRsbCcKICAgICAgSW1hZ2V8ZW5kc3dpdGg6CiAgICAgICAgLSAnLmV4ZScKICAgICAgc2lnbmVkOiAnZmFsc2UnCiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uCmZhbHNlcG9zaXRpdmVzOgogIC0gTGVnaXRpbWF0ZSBhY3Rpdml0eSBmcm9tIEFudGhyb3BpYw=="
---

Cybercriminals are leveraging the buzz around AI chatbots to lure unsuspecting users into malware traps. Security Affairs reports that a fake website, masquerading as Anthropic's popular Claude AI service, has been caught distributing the notorious PlugX remote access trojan (RAT). The attackers are pushing a ZIP archive, falsely advertised as a "pro version" installer, which silently deploys the PlugX payload.

According to Security Affairs, the malicious site mimics Claude's official appearance, tricking visitors into downloading what appears to be a legitimate installer. Once executed, the fake Claude application runs as expected, but in the background, it initiates a PlugX infection chain. The initial dropper script drops essential components—NOVUpdate.exe, avk.dll, and an encrypted .dat file—into the Windows Startup folder. The real trick lies in the execution of NOVUpdate.exe, a legitimate, signed updater from G DATA. This trusted executable is manipulated to load a malicious DLL, avk.dll, from the same directory—a classic DLL sideloading technique (MITRE T1574.002). This tactic bypasses security scrutiny by using a seemingly benign, signed parent process.

Once loaded, the malicious avk.dll decrypts and executes the final payload from the .dat file, granting attackers unfettered remote access. This multi-stage approach, featuring a signed executable, a trojanized DLL, and an encrypted payload, is a hallmark of PlugX, a malware family frequently employed in sophisticated cyber-espionage operations. Security Affairs noted that within seconds of execution, the malware establishes communication with a command-and-control server hosted on Alibaba Cloud infrastructure, signaling an immediate compromise and potential data exfiltration.
