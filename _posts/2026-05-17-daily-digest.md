---
layout: digest
title: "Daily Security Digest — 2026-05-17"
date: 2026-05-17 23:00:00 +0300
channel: "Daily Digest"
score: "CRITICAL"
source_name: "SCW"
ai_rewritten: true
author: digest
featured: true
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-047.png"
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-047.png"
summary: "23 vulnerability disclosures (3 Critical, 20 High) and 7 curated intelligence stories from 3 sources."
tags:
  - daily-digest
  - vulnerability
  - cve
  - high-severity
  - cwe-346
  - server-side-request-forgery
  - cwe-918
  - privilege-escalation
  - cwe-269
  - sql-injection
source_count: 3
vulns:
  - cveId: "CVE-2018-25320"
    title: "ACL Analytics RCE: Critical Arbitrary Code Execution via EXECUTE Function"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2018-25320/"
  - cveId: "CVE-2018-25332"
    title: "CVE-2018-25332: GitBucket RCE Exposes Unauthenticated Command Execution"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2018-25332/"
  - cveId: "CVE-2018-25335"
    title: "WordPress Plugin Peugeot Music 1.0 Critical Arbitrary File Upload"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2018-25335/"
  - cveId: "CVE-2026-8719"
    title: "CVE-2026-8719: WordPress AI Engine Plugin Privilege Escalation"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-8719/"
  - cveId: "CVE-2018-25322"
    title: "CVE-2018-25322: Allok Fast AVI MPEG Splitter Stack Buffer Overflow"
    cvss: 8.4
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2018-25322/"
  - cveId: "CVE-2018-25323"
    title: "CVE-2018-25323: Allok AVI DivX MPEG Converter SEH Buffer Overflow"
    cvss: 8.4
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2018-25323/"
  - cveId: "CVE-2018-25328"
    title: "CVE-2018-25328: VX Search Buffer Overflow Allows Code Execution"
    cvss: 8.4
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2018-25328/"
  - cveId: "CVE-2026-46728"
    title: "CVE-2026-46728: Das U-Boot Signature Bypass Flaw"
    cvss: 8.2
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-46728/"
  - cveId: "CVE-2018-25330"
    title: "Joomla! EkRishta XSS and SQLi Flaws Pose High Risk (CVE-2018-25330)"
    cvss: 8.2
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2018-25330/"
  - cveId: "CVE-2018-25333"
    title: "Nordex N149/4.0-4.5 Wind Turbine Web Server Vulnerability: Unauthenticated SQLi"
    cvss: 8.2
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2018-25333/"
  - cveId: "CVE-2018-25338"
    title: "CVE-2018-25338: Zechat SQLi Allows Unauthenticated Database Extraction"
    cvss: 8.2
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2018-25338/"
  - cveId: "CVE-2018-25339"
    title: "Zechat 1.5 SQL Injection Allows Unauthenticated Database Extraction"
    cvss: 8.2
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2018-25339/"
  - cveId: "CVE-2018-25325"
    title: "WooCommerce CSV Importer Path Traversal Allows Arbitrary File Deletion"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2018-25325/"
  - cveId: "CVE-2018-25326"
    title: "Google Drive for WordPress Path Traversal Allows Unauthenticated File Read"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2018-25326/"
  - cveId: "CVE-2018-25329"
    title: "WordPress Plugin WP with Spritz RFI Allows Arbitrary File Access"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2018-25329/"
  - cveId: "CVE-2026-8725"
    title: "CVE-2026-8725: CoreWorxLab CAAL SSRF Vulnerability Publicly Exploitable"
    cvss: 7.3
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-8725/"
  - cveId: "CVE-2026-8734"
    title: "Oinone Pamirs SQL Injection (CVE-2026-8734) Poses Remote Threat"
    cvss: 7.3
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-8734/"
  - cveId: "CVE-2026-8751"
    title: "CVE-2026-8751: h2oai h2o-3 Insecure Deserialization Vulnerability (HIGH)"
    cvss: 7.3
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-8751/"
  - cveId: "CVE-2026-8755"
    title: "CVE-2026-8755: fishaudio Bert-VITS2 Path Traversal Vulnerability"
    cvss: 7.3
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-8755/"
  - cveId: "CVE-2026-8756"
    title: "CVE-2026-8756: fishaudio Bert-VITS2 Path Traversal Vulnerability Publicly Disclosed"
    cvss: 7.3
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-8756/"
  - cveId: "CVE-2026-8757"
    title: "CVE-2026-8757: adenhq hive Path Traversal Vulnerability Publicly Disclosed"
    cvss: 7.3
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-8757/"
  - cveId: "CVE-2026-8758"
    title: "CVE-2026-8758: Metasoft MetaCRM Unrestricted File Upload Exposes Systems"
    cvss: 7.3
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-8758/"
  - cveId: "CVE-2026-8759"
    title: "CVE-2026-8759: xiandafu beetl SpEL Injection Vulnerability"
    cvss: 7.3
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-8759/"
feed_posts:
  - title: "node-ipc Supply Chain Attack: Malicious Code Steals Passwords"
    tags: "cyber, security"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1427288221-8932/"
  - title: "Pwn2Own Berlin 2026 Concludes: 47 Zero-Days, $1.3 Million Awarded"
    tags: "vulnerability, devcore, starlabs-sg, out-of-bounds, summoning-team, viettel-cyber-security, ikotas-labs-inc, offensivecon, red-hat, microsoft"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1427288221-8933/"
  - title: "Microsoft Rejects Critical Azure Vulnerability Report, No CVE"
    tags: "vulnerability, cloud, microsoft, bleepingcomputer, dark"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/microsoft-rejects-critical-azure-vulnerability-report-no-cv-1p00z/"
  - title: "Grafana Labs Hit by Ransomware, Source Code Repositories Exfiltrated"
    tags: "cyber, security, grafana-labs, coinbase-cartel"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1427288221-8934/"
  - title: "THORChain Suffers $10 Million Crypto Theft"
    tags: "cyber, security, thorchain"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1427288221-8936/"
  - title: "Grafana GitHub Token Breach Led to Codebase Download"
    tags: "data-breach, tools, grafana, github"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/grafana-github-token-breach-led-to-codebase-download-and-ext-y4qqy/"
  - title: "Deepfake Phishing Campaign Targets Israeli Public with Fake Endorsements"
    tags: "cyber, security"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1427288221-8938/"
trending_tags:
  - "vulnerability"
  - "cve"
  - "high-severity"
  - "cwe-346"
  - "server-side-request-forgery"
  - "cwe-918"
  - "privilege-escalation"
  - "cwe-269"
  - "sql-injection"
  - "cwe-74"
  - "cwe-89"
  - "insecure-deserialization"
---

Today's automated security digest covering **23** vulnerability disclosures and **7** curated intelligence stories.
