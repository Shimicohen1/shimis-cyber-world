---
layout: digest
title: "Daily Security Digest — 2026-04-21"
date: 2026-04-21 23:00:00 +0300
channel: "Daily Digest"
score: "CRITICAL"
source_name: "SCW"
ai_rewritten: true
author: digest
featured: true
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-030.png"
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-030.png"
summary: "21 vulnerability disclosures (5 Critical, 16 High) and 4 curated intelligence stories from 3 sources."
tags:
  - daily-digest
  - vulnerability
  - cve
  - critical
  - high-severity
  - path-traversal
  - cwe-22
  - cwe-306
  - cross-site-scripting-xss
  - cwe-284
source_count: 3
vulns:
  - cveId: "CVE-2026-40050"
    title: "Critical Unauthenticated Path Traversal in CrowdStrike LogScale"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-40050/"
  - cveId: "CVE-2026-40576"
    title: "Excel-MCP-Server Path Traversal: Critical Flaw Exposes File System"
    cvss: 9.4
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-40576/"
  - cveId: "CVE-2026-41193"
    title: "FreeScout Vulnerability: Unrestricted File Write via ZIP Upload"
    cvss: 9.1
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41193/"
  - cveId: "CVE-2026-40569"
    title: "FreeScout Vulnerability Allows Silent Email Exfiltration and Hijacking"
    cvss: 9
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-40569/"
  - cveId: "CVE-2026-5652"
    title: "Critical IODR Vulnerability in Crafty Controller Puts Servers at Risk"
    cvss: 9
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-5652/"
  - cveId: "CVE-2026-40611"
    title: "Lego ACME Client Vulnerable to Path Traversal, Arbitrary File Write"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-40611/"
  - cveId: "CVE-2026-40568"
    title: "FreeScout XSS Flaw Allows Session Hijacking and Data Exfiltration"
    cvss: 8.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-40568/"
  - cveId: "CVE-2026-24189"
    title: "NVIDIA CUDA-Q Vulnerability Poses DoS, Info Disclosure Risk"
    cvss: 8.2
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-24189/"
  - cveId: "CVE-2026-40588"
    title: "BlueprintUE Vulnerability Allows Permanent Account Takeover"
    cvss: 8.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-40588/"
  - cveId: "CVE-2026-40868"
    title: "Kyverno Policy Engine Flaw Leaks Service Account Tokens"
    cvss: 8.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-40868/"
  - cveId: "CVE-2026-24177"
    title: "NVIDIA KAI Scheduler Flaw: Unauthorized API Access Poses Data Risk"
    cvss: 7.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-24177/"
  - cveId: "CVE-2026-40161"
    title: "Tekton Pipelines Git Resolver Leaks API Tokens"
    cvss: 7.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-40161/"
  - cveId: "CVE-2026-40589"
    title: "FreeScout Vulnerability Exposes Hidden Customer Data"
    cvss: 7.6
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-40589/"
  - cveId: "CVE-2026-40586"
    title: "Unreal Engine Tool's Login Flaw Exposes Developers to Brute-Force Attacks"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-40586/"
  - cveId: "CVE-2026-40613"
    title: "Coturn ARM64 Crash: Unauthenticated DoS via Crafted STUN Message"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-40613/"
  - cveId: "CVE-2026-40585"
    title: "Unreal Engine Dev Tool Vulnerability Allows Indefinite Password Reset Token Validity"
    cvss: 7.4
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-40585/"
  - cveId: "CVE-2026-40591"
    title: "FreeScout Vulnerability Allows Low-Privilege Agents to Expose Hidden Customer Data"
    cvss: 7.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-40591/"
  - cveId: "CVE-2026-41189"
    title: "FreeScout Vulnerability Lets Unauthorized Users Edit Support Threads"
    cvss: 7.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41189/"
  - cveId: "CVE-2026-41190"
    title: "FreeScout Help Desk Vulnerability Exposes Hidden Conversation Drafts"
    cvss: 7.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41190/"
  - cveId: "CVE-2026-41191"
    title: "FreeScout Vulnerability Allows Unauthorized Chat Setting Changes"
    cvss: 7.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41191/"
  - cveId: "CVE-2026-41192"
    title: "FreeScout Attachment Flaw Allows Data Deletion"
    cvss: 7.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41192/"
feed_posts:
  - title: "Bomgar RMM Exploitation: A Supply Chain Wake-Up Call"
    tags: "malware, ransomware, vulnerability, tools, bomgar, dark"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/surge-in-bomgar-rmm-exploitation-demonstrates-supply-chain-r-8u4il/"
  - title: "UK Regulator Eyes Telegram for Child Safety Violations"
    tags: "tools, ofcom, canadian-centre-for-child-protection, telegram, global"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/uk-regulator-to-probe-telegram-teen-chat-sites-for-potentia-liksh/"
  - title: "Israel's Cyber Power: A Look at Its Strengths and Challenges"
    tags: "cyber, security, global"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1427288221-8797/"
  - title: "Exploits Weaponize Windows Defender Against Its Users"
    tags: "vulnerability, microsoft, tools, dark, stop"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/exploits-turn-windows-defender-into-attacker-tool-i1q82/"
trending_tags:
  - "vulnerability"
  - "cve"
  - "critical"
  - "high-severity"
  - "path-traversal"
  - "cwe-22"
  - "cwe-306"
  - "cross-site-scripting-xss"
  - "cwe-284"
  - "cwe-915"
  - "cwe-639"
  - "cwe-79"
---

Today's automated security digest covering **21** vulnerability disclosures and **4** curated intelligence stories.
