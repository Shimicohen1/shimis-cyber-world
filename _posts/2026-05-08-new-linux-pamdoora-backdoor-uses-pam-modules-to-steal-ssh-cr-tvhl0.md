---
title: "PamDOORa Linux Backdoor Leverages PAM for Persistent SSH Access"
date: 2026-05-08 08:41:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, malware, identity, tools, the-hacker-news]
excerpt: "The Hacker News reports on a new Linux backdoor named PamDOORa, currently being peddled on the Russian cybercrime forum Rehub for $1,600 by a threat actor known as \"darkworm.\" This"
summary: "The Hacker News reports on a new Linux backdoor named PamDOORa, currently being peddled on the Russian cybercrime forum Rehub for $1,600 by a threat actor known as \"darkworm.\" This isn't just another piece of malware; it's a post-exploitation toolkit designed around Pluggable Authentication Modules"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 70
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-018.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-018.png"
source_url: "https://thehackernews.com/2026/05/new-linux-pamdoora-backdoor-uses-pam.html"
tlp: "TLP:CLEAR"
event_type: "tool-release"
organizations:
  - name: "The Hacker News"
    domain: "thehackernews.com"
    role: "vendor"
threat_actors:
  - "darkworm"
link_preview:
  url: "https://thehackernews.com/2026/05/new-linux-pamdoora-backdoor-uses-pam.html"
  title: "New Linux PamDOORa Backdoor Uses PAM Modules to Steal SSH Credentials"
  domain: "thehackernews.com"
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEixNgyNI9ObZi3Il87CVXhEWyWgcK-O1IKhQKRs7NPrNVqTMBZRw7AZpmbk5RdsPxNPmO9IyXaq6QzYBN691HBgfE8HpwnyJuE4-vaCAwHPpb6UfeSRcrMI-GRjcX53cELs31s7ps6YkGx5bAAB67w4m9GQ7ZVWjSdnaPOFczjHlsS3967ZvBh-4ZvTBWEJ/s1600/linux-pam.jpg"
iocs:
  - id: "PamDOORa-Backdoor"
    type: "Auth Bypass"
    indicator: "Linux systems with PamDOORa backdoor installed, allowing SSH access via magic password and specific TCP port"
  - id: "PamDOORa-Backdoor"
    type: "Information Disclosure"
    indicator: "Linux systems with PamDOORa backdoor installed, designed to steal SSH credentials"
  - id: "PamDOORa-Backdoor"
    type: "Persistence"
    indicator: "Linux systems utilizing PAM modules for post-exploitation persistence via PamDOORa"
mitre_attack:
  - id: "T1078.001"
    name: "Default Accounts"
    tactic: "Persistence"
    url: "https://attack.mitre.org/techniques/T1078/001/"
  - id: "T1547.001"
    name: "Registry Run Keys / Startup Folder"
    tactic: "Persistence"
    url: "https://attack.mitre.org/techniques/T1547/001/"
  - id: "T1098.005"
    name: "SSH Authorized Keys"
    tactic: "Persistence"
    url: "https://attack.mitre.org/techniques/T1098/005/"
why_it_matters:
  - "If your Linux systems are exposed or have been compromised, PamDOORa is a significant threat. This backdoor, leveraging PAM, could grant persistent SSH access with a 'magic password' that bypasses your standard authentication. You need to immediately audit your PAM configurations for unauthorized modifications and review SSH logs for unusual login patterns, especially on non-standard ports."
bot_cta_title: "Track Linux Threats and Backdoors"
bot_cta_description: "Use /brief to get an analyst-ready weekly threat summary that includes Linux-specific malware and backdoor analysis."
---

The Hacker News reports on a new Linux backdoor named PamDOORa, currently being peddled on the Russian cybercrime forum Rehub for $1,600 by a threat actor known as "darkworm." This isn't just another piece of malware; it's a post-exploitation toolkit designed around Pluggable Authentication Modules (PAM).

PamDOORa’s core functionality revolves around establishing persistent SSH access. It achieves this by combining a "magic password" with a specific TCP port. This method allows attackers to maintain stealthy access even after initial compromise, bypassing standard authentication mechanisms by manipulating a critical system component.

For defenders, this is a clear signal to scrutinize PAM configurations and SSH access logs. Attackers are weaponizing legitimate system functionalities to maintain persistence. Relying solely on perimeter defenses is insufficient when internal components become the attack vector. This backdoor underscores the need for robust internal network monitoring and strict PAM module integrity checks.
