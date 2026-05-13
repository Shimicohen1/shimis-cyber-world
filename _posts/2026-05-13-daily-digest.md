---
layout: digest
title: "Daily Security Digest — 2026-05-13"
date: 2026-05-13 23:00:00 +0300
channel: "Daily Digest"
score: "CRITICAL"
source_name: "SCW"
ai_rewritten: true
author: digest
featured: true
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-004.png"
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-004.png"
summary: "41 vulnerability disclosures (10 Critical, 31 High) and 10 curated intelligence stories from 6 sources."
tags:
  - daily-digest
  - vulnerability
  - cve
  - critical
  - high-severity
  - cwe-328
  - cwe-648
  - remote-code-execution
  - cwe-502
  - cwe-88
source_count: 6
vulns:
  - cveId: "CVE-2026-43997"
    title: "vm2 Sandbox Escape (CVE-2026-43997) Exposes Node.js Hosts"
    cvss: 10
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-43997/"
  - cveId: "CVE-2026-44005"
    title: "CVE-2026-44005: Critical vm2 Sandbox Escape Threatens Node.js Applications"
    cvss: 10
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44005/"
  - cveId: "CVE-2026-44006"
    title: "vm2 Sandbox Escape (CVE-2026-44006) Poses Critical Threat to Node.js"
    cvss: 10
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44006/"
  - cveId: "CVE-2026-43999"
    title: "CVE-2026-43999: Critical vm2 Sandbox Bypass Leads to RCE"
    cvss: 9.9
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-43999/"
  - cveId: "CVE-2020-37168"
    title: "Ecommerce Systempay 1.0 Critical Weak Crypto Vulnerability (CVE-2020-37168)"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2020-37168/"
  - cveId: "CVE-2026-44008"
    title: "CVE-2026-44008: Critical vm2 Sandbox Escape in Node.js"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44008/"
  - cveId: "CVE-2026-44009"
    title: "CVE-2026-44009: Critical vm2 Sandbox Escape Threatens Node.js Apps"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44009/"
  - cveId: "CVE-2026-45411"
    title: "vm2 Sandbox Escape (CVE-2026-45411) Poses Critical RCE Risk"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-45411/"
  - cveId: "CVE-2026-41225"
    title: "CVE-2026-41225: Critical iControl REST Vulnerability Allows Arbitrary Command Execution"
    cvss: 9.1
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41225/"
  - cveId: "CVE-2026-44007"
    title: "vm2 Sandbox Escape (CVE-2026-44007) Allows Arbitrary OS Commands"
    cvss: 9.1
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44007/"
  - cveId: "CVE-2026-41957"
    title: "BIG-IP, BIG-IQ Configuration Utility RCE via Authenticated Access"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41957/"
  - cveId: "CVE-2026-42266"
    title: "JupyterLab CVE-2026-42266: PyPI Extension Manager Bypass"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42266/"
  - cveId: "CVE-2026-6281"
    title: "Lenovo Personal Cloud Storage RCE Vulnerability (CVE-2026-6281)"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6281/"
  - cveId: "CVE-2026-32643"
    title: "F5 BIG-IP/BIG-IQ CVE-2026-32643: High-Privilege RCE"
    cvss: 8.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-32643/"
  - cveId: "CVE-2026-32673"
    title: "F5 BIG-IP Scripted Monitors Allow High-Privilege Command Execution (CVE-2026-32673)"
    cvss: 8.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-32673/"
  - cveId: "CVE-2026-34176"
    title: "CVE-2026-34176: High-Severity Command Injection in iControl REST Endpoint"
    cvss: 8.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-34176/"
  - cveId: "CVE-2026-40061"
    title: "F5 BIG-IP DNS Vulnerability Allows Privilege Escalation"
    cvss: 8.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-40061/"
  - cveId: "CVE-2026-40631"
    title: "CVE-2026-40631: F5 iControl SOAP Privilege Escalation"
    cvss: 8.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-40631/"
  - cveId: "CVE-2026-40698"
    title: "F5 BIG-IP, BIG-IQ Privilege Escalation: CVE-2026-40698"
    cvss: 8.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-40698/"
  - cveId: "CVE-2026-41953"
    title: "BIG-IP Privilege Escalation: CVE-2026-41953 Allows Resource Admin to Root"
    cvss: 8.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41953/"
  - cveId: "CVE-2026-42406"
    title: "F5 BIG-IP, BIG-IQ CVE-2026-42406: Critical RCE for Privileged Attackers"
    cvss: 8.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42406/"
  - cveId: "CVE-2026-42924"
    title: "CVE-2026-42924: F5 iControl SOAP Privilege Escalation"
    cvss: 8.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42924/"
  - cveId: "CVE-2026-42930"
    title: "BIG-IP Appliance Mode Bypass Vulnerability (CVE-2026-42930)"
    cvss: 8.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42930/"
  - cveId: "CVE-2026-33583"
    title: "Arqit Symmetric Key Agreement Platform Exposes Critical Keys via HTTP GET"
    cvss: 8.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-33583/"
  - cveId: "CVE-2026-44001"
    title: "vm2 Sandbox Escape (CVE-2026-44001) Allows Host Node.js Process Crash"
    cvss: 8.6
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44001/"
  - cveId: "CVE-2026-44578"
    title: "Next.js SSRF via Crafted WebSocket Requests (CVE-2026-44578)"
    cvss: 8.6
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44578/"
  - cveId: "CVE-2026-43998"
    title: "CVE-2026-43998: vm2 Sandbox Bypass Leads to RCE in Node.js"
    cvss: 8.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-43998/"
  - cveId: "CVE-2026-44574"
    title: "Next.js Middleware Bypass (CVE-2026-44574) Exposes Dynamic Routes"
    cvss: 8.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44574/"
  - cveId: "CVE-2026-30905"
    title: "Zoom Workplace VDI Plugin Vulnerability Allows Local Privilege Escalation"
    cvss: 7.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-30905/"
  - cveId: "CVE-2026-30906"
    title: "Zoom Rooms Installer: High-Severity Privilege Escalation via Untrusted Path"
    cvss: 7.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-30906/"
  - cveId: "CVE-2026-44573"
    title: "Next.js Vulnerability Exposes Protected Data via Pages Router"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44573/"
  - cveId: "CVE-2026-44575"
    title: "Next.js App Router Flaw Bypasses Middleware Authorization"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44575/"
  - cveId: "CVE-2026-44004"
    title: "CVE-2026-44004: vm2 Sandbox Vulnerability Leads to Host Memory Exhaustion"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44004/"
  - cveId: "CVE-2026-44579"
    title: "Next.js Partial Prerendering Vulnerability: DoS via Connection Exhaustion"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44579/"
  - cveId: "CVE-2026-45109"
    title: "Next.js CVE-2026-45109: Middleware Bypass Via Turbopack"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-45109/"
  - cveId: "CVE-2026-42577"
    title: "Netty CVE-2026-42577: Stale Connections Lead to 100% CPU Busy-Loops"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42577/"
  - cveId: "CVE-2026-42579"
    title: "Netty DNS Codec Vulnerability (CVE-2026-42579) Exposes Systems to High-Severity Attacks"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42579/"
  - cveId: "CVE-2026-42582"
    title: "CVE-2026-42582: Netty QpackDecoder Vulnerability Exposes Apps to DoS"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42582/"
  - cveId: "CVE-2026-42583"
    title: "CVE-2026-42583: Netty Lz4FrameDecoder Vulnerability Exposes Apps to DoS"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42583/"
  - cveId: "CVE-2026-42587"
    title: "Netty DoS Vulnerability (CVE-2026-42587) Bypasses Decompression Limits"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42587/"
  - cveId: "CVE-2026-42584"
    title: "CVE-2026-42584: Netty HTTP/2 Handling Vulnerability Exposes Data Corruption"
    cvss: 7.3
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42584/"
feed_posts:
  - title: "Microsoft BitLocker Bypass, Privilege Escalation Exploits Released on Patch Tuesday"
    tags: "malware, vulnerability, microsoft"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/telegram-1542954397-4583/"
  - title: "Microsoft BitLocker Zero-Day Exposes Protected Drives"
    tags: "vulnerability, microsoft, tools"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/windows-bitlocker-zero-day-gives-access-to-protected-drives-ee66q/"
  - title: "Google Documents First AI-Assisted 0-Day Exploit in the Wild"
    tags: "vulnerability, google"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/telegram-1542954397-4584/"
  - title: "Israeli Cybersecurity Startups Dominate Global 'Rising In Cyber 2026' List"
    tags: "cyber, security, notable-capital, cyera, grip-security, island, noma-security, oligo-security, orca-security, token-security"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1427288221-8924/"
  - title: "Microsoft MDASH AI System Discovers 16 Windows Vulnerabilities"
    tags: "vulnerability, cloud, microsoft, ai-security"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/microsoft-s-mdash-ai-system-finds-16-windows-flaws-fixed-in-xcu3c/"
  - title: "FamousSparrow Expands Targeting, Hits Azerbaijani Energy Firm via Exchange"
    tags: "vulnerability, microsoft, threat-intel, bitdefender, ghostemperor"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/azerbaijani-energy-firm-hit-by-repeated-microsoft-exchange-e-ljhot/"
  - title: "Microsoft Autopatch Bug Deployed Restricted Drivers in EU"
    tags: "vulnerability, microsoft"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/microsoft-fixes-windows-autopatch-bug-installing-restricted-jcyhx/"
  - title: "The Gentleman Leads Ransomware Surge: 46 Attacks in 24 Hours"
    tags: "malware, ransomware, data-breach, akira, qilin"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1373735086-5030/"
  - title: "European Commission Pushes New Law to Delay Teen Social Media Access"
    tags: "cyber, security, european-commission, the-record-by-recorded-future"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/european-commission-head-pushes-creation-of-new-law-delaying-tx0e1/"
  - title: "Dream Market Admin Arrested in Germany After US Indictment"
    tags: "cyber, security, dream-market, dark"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/alleged-dream-market-admin-arrested-in-germany-after-us-indi-6dx3x/"
trending_tags:
  - "vulnerability"
  - "cve"
  - "critical"
  - "high-severity"
  - "cwe-328"
  - "cwe-648"
  - "remote-code-execution"
  - "cwe-502"
  - "cwe-88"
  - "cwe-602"
  - "cwe-78"
  - "cwe-250"
---

Today's automated security digest covering **41** vulnerability disclosures and **10** curated intelligence stories.
