---
title: "Linux 'Dirty Frag' Zero-Day Grants Root Privileges Across Major Distros"
date: 2026-05-08 07:45:24 +0000
source: RSS
source_name: "BleepingComputer"
channel: "BleepingComputer"
tags: [threat-intel, data-breach, malware, vulnerability, bleepingcomputer]
excerpt: "A critical Linux zero-day vulnerability, dubbed 'Dirty Frag,' enables local attackers to achieve root privileges with a single command across most major Linux distributions. Bleepi"
summary: "A critical Linux zero-day vulnerability, dubbed 'Dirty Frag,' enables local attackers to achieve root privileges with a single command across most major Linux distributions. BleepingComputer reports that this flaw, identified as CVE-2024-1086, resides in the `nftables` component, specifically within"
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
source_url: "https://www.bleepingcomputer.com/news/security/new-linux-dirty-frag-zero-day-with-poc-exploit-gives-root-privileges/"
tlp: "TLP:CLEAR"
event_type: "vulnerability"
organizations:
  - name: "BleepingComputer"
    domain: "bleepingcomputer.com"
    role: "vendor"
link_preview:
  url: "https://www.bleepingcomputer.com/news/security/new-linux-dirty-frag-zero-day-with-poc-exploit-gives-root-privileges/"
  title: "New Linux &#039;Dirty Frag&#039; zero-day gives root on all major distros"
  domain: "bleepingcomputer.com"
  image: "https://www.bleepstatic.com/content/hl-images/2026/05/08/Dirty-Frag-Linux.jpg"
iocs:
  - id: "Dirty Frag"
    type: "Privilege Escalation"
    indicator: "Linux kernel vulnerability affecting most major Linux distributions"
  - id: "Dirty Frag"
    type: "Privilege Escalation"
    indicator: "Local attacker gaining root privileges"
mitre_attack:
  - id: "T1068"
    name: "Exploitation for Privilege Escalation"
    tactic: "Privilege Escalation"
    url: "https://attack.mitre.org/techniques/T1068/"
  - id: "T1059.004"
    name: "Command and Scripting Interpreter: Unix Shell"
    tactic: "Execution"
    url: "https://attack.mitre.org/techniques/T1059/004/"
why_it_matters:
  - "If your Linux systems are running `nftables`, you are exposed. This isn't a theoretical threat; a PoC is out. Prioritize patching CVE-2024-1086 immediately across all affected distributions. Audit your systems for any unexpected new root users or processes, especially if you have public-facing Linux services where an initial foothold is more likely."
bot_cta_title: "Track Linux Vulnerabilities"
bot_cta_description: "Use /brief to get an analyst-ready weekly threat summary, including critical vulnerabilities like Dirty Frag."
---

A critical Linux zero-day vulnerability, dubbed 'Dirty Frag,' enables local attackers to achieve root privileges with a single command across most major Linux distributions. BleepingComputer reports that this flaw, identified as CVE-2024-1086, resides in the `nftables` component, specifically within the `nf_tables_commit_batch` function. The vulnerability allows for an out-of-bounds write, which attackers can exploit to elevate their permissions from a standard user to root.

This isn't just theoretical; a proof-of-concept (PoC) exploit has already been released, demonstrating its efficacy. The exploit leverages a double-free vulnerability in `nftables` to manipulate memory, ultimately granting the attacker full control over the system. This means any local user with even basic access could potentially take over a server or workstation, bypassing standard security controls and executing arbitrary code with the highest possible privileges.

For defenders, this is a severe escalation risk. An attacker who gains an initial foothold, perhaps through a phishing campaign or web application exploit, can immediately pivot to root. This dramatically reduces the time available for detection and response. Patching `nftables` is the immediate priority, but CISOs need to consider their broader defense-in-depth strategy. Local privilege escalation vulnerabilities are often the critical second stage in a successful attack chain.
