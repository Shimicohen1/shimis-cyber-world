---
layout: digest
title: "Daily Security Digest — 2026-04-12"
date: 2026-04-12 23:00:00 +0300
channel: "Daily Digest"
score: "CRITICAL"
source_name: "SCW"
ai_rewritten: true
featured: true
summary: "22 vulnerability disclosures (5 Critical, 17 High) and 15 curated intelligence stories from 9 sources."
cover_image: "/assets/images/covers/threat-intel.svg"
image: "/assets/images/covers/threat-intel.svg"
tags:
  - daily-digest
  - vulnerability
  - cve
  - buffer-overflow
  - command-injection
  - data-breach
  - apt
  - osint
  - threat-intel
  - ransomware
source_count: 9
vulns:
  - cveId: "CVE-2019-25709"
    title: "CF Image Hosting Script 1.6.5 allows unauthenticated access"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2019-25709/"
  - cveId: "CVE-2026-6115"
    title: "Totolink A7100RU Command Injection"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6115/"
  - cveId: "CVE-2026-6116"
    title: "Totolink A7100RU Command Injection"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6116/"
  - cveId: "CVE-2026-6131"
    title: "Critical RCE Flaw Hits Totolink Routers"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6131/"
  - cveId: "CVE-2026-6132"
    title: "Critical RCE Found in Totolink A7100RU Routers"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6132/"
  - cveId: "CVE-2026-6120"
    title: "Tenda F451 Router Remote Buffer Overflow"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6120/"
  - cveId: "CVE-2026-6121"
    title: "Tenda F451 Router Buffer Overflow"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6121/"
  - cveId: "CVE-2026-6122"
    title: "Tenda F451 Router High-Severity Buffer Overflow"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6122/"
  - cveId: "CVE-2026-6123"
    title: "Tenda F451 Router Remote Buffer Overflow"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6123/"
  - cveId: "CVE-2026-6124"
    title: "SafeMacFilter Buffer Overflow"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6124/"
  - cveId: "CVE-2026-6133"
    title: "Tenda Router Stack Buffer Overflow"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6133/"
  - cveId: "CVE-2026-6134"
    title: "Tenda F451 Router Remote Buffer Overflow"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6134/"
  - cveId: "CVE-2018-25258"
    title: "GUI Preferences Dialog Code Execution"
    cvss: 8.4
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2018-25258/"
  - cveId: "CVE-2019-25689"
    title: "Code Execution"
    cvss: 8.4
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2019-25689/"
  - cveId: "CVE-2019-25691"
    title: "Faleemi Desktop Software Buffer Overflow Bypasses DEP"
    cvss: 8.4
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2019-25691/"
  - cveId: "CVE-2019-25695"
    title: "R 3.4.4 Local Buffer Overflow: Arbitrary Code Execution via GUI"
    cvss: 8.4
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2019-25695/"
  - cveId: "CVE-2019-25701"
    title: "Easy Video to iPod Converter Buffer Overflow"
    cvss: 8.4
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2019-25701/"
  - cveId: "CVE-2019-25705"
    title: "Buffer Overflow"
    cvss: 8.4
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2019-25705/"
  - cveId: "CVE-2019-25697"
    title: "Unauthenticated SQLi Threatens CMSsite 1.0"
    cvss: 8.2
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2019-25697/"
  - cveId: "CVE-2026-40393"
    title: "Mesa WebGPU Bug Allows Out-of-Bounds Memory Access"
    cvss: 8.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-40393/"
  - cveId: "CVE-2026-6130"
    title: "New Chatbox AI Flaw: Remote OS Command Injection"
    cvss: 7.3
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6130/"
  - cveId: "CVE-2026-6129"
    title: "ChatGPT-on-WeChat Agent Mode Vulnerability Exposes Users"
    cvss: 7.3
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6129/"
feed_posts:
  - title: "Adobe Patches Actively Exploited Acrobat Reader Flaw"
    tags: "threat-intel, vulnerability"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/telegram-1323386230-248654/"
  - title: "Linux Kernel BPF Bug Forks Verifier, Allows OOB Map Access"
    tags: "vulnerability, cve"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/telegram-1129491012-158939/"
  - title: "Hallmark Suffers Alleged Breach, 1.7M Accounts Exposed"
    tags: "data-breach, data-leak"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/telegram-1390175645-418/"
  - title: "Iranian APTs Target Exposed Rockwell PLCs: 5,219 Devices at Risk"
    tags: "red-team, threat-intel"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1233397458-73842/"
  - title: "Weekly Threat Roundup: APTs, Zero-Days, and IoT Botnets"
    tags: "threat-intel"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1323386230-248657/"
  - title: "BLACKWATER: New Threat Actor Emerges on the Cyber Landscape"
    tags: "darkweb, ransomware"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1373735086-4975/"
  - title: "Critical Marimo pre-auth RCE flaw now under active exploitation"
    tags: "threat-intel, vulnerability"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1323386230-248662/"
  - title: "Hackers Claim Control Over Venice Anti-Flood System"
    tags: "threat-intel"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1323386230-248661/"
  - title: "Malware Roundup: Iranian APTs, Zero-Days, and Developer Tool Exploits"
    tags: "threat-intel, malware"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1323386230-248660/"
  - title: "Iranian Group Ababil of Minab Hits US GPS Provider Vyncs"
    tags: "threat-intel, apt"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1427288221-8758/"
  - title: "Signal Messages Recovered by FBI via iPhone Notifications"
    tags: "privacy"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1427288221-8752/"
  - title: "Stalkie: OSINT Tool for Social Media Account Discovery"
    tags: "osint, tools"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1597138777-3456/"
  - title: "Tax Authority Phishing Scams Target Compensation Claims"
    tags: "phishing"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1707304340-2265/"
  - title: "PS5 Scam: When Digital Dreams Meet Paper Reality"
    tags: "scam"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1542954397-4505/"
  - title: "International Identity Management Day: A Critical Look at Identity Theft"
    tags: "identity, awareness"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1427288221-8754/"
trending_tags:
  - "vulnerability"
  - "buffer-overflow"
  - "command-injection"
  - "data-breach"
  - "apt"
  - "osint"
  - "threat-intel"
  - "ransomware"
  - "code-execution"
  - "sql-injection"
  - "cwe-787"
  - "cwe-78"
---
