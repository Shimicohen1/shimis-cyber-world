---
layout: digest
title: "Daily Security Digest — 2026-05-09"
date: 2026-05-09 23:00:00 +0300
channel: "Daily Digest"
score: "CRITICAL"
source_name: "SCW"
ai_rewritten: true
author: digest
featured: true
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-009.png"
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-009.png"
summary: "23 vulnerability disclosures (7 Critical, 16 High) and 2 curated intelligence stories from 2 sources."
tags:
  - daily-digest
  - vulnerability
  - cve
  - critical
  - high-severity
  - cwe-347
  - privilege-escalation
  - cwe-284
  - cwe-639
  - cwe-94
source_count: 2
vulns:
  - cveId: "CVE-2026-42298"
    title: "CVE-2026-42298: Critical RCE in Postiz AI Scheduling Tool"
    cvss: 10
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42298/"
  - cveId: "CVE-2026-42454"
    title: "Termix RCE via Container ID Injection (CVE-2026-42454)"
    cvss: 9.9
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42454/"
  - cveId: "CVE-2026-42302"
    title: "CVE-2026-42302: FastGPT Agent Sandbox RCE"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42302/"
  - cveId: "CVE-2026-42193"
    title: "CVE-2026-42193: Plunk Email Platform Critical Unauthenticated Webhook Forgery"
    cvss: 9.1
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42193/"
  - cveId: "CVE-2026-42354"
    title: "Sentry SAML SSO Critical Vulnerability Allows Account Takeover (CVE-2026-42354)"
    cvss: 9.1
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42354/"
  - cveId: "CVE-2026-44313"
    title: "Linkwarden SSRF Vulnerability (CVE-2026-44313) Allows Internal Network Access"
    cvss: 9.1
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44313/"
  - cveId: "CVE-2026-42560"
    title: "CVE-2026-42560: Critical Patreon OAuth Flaw Merges User Identities"
    cvss: 9.1
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42560/"
  - cveId: "CVE-2026-42556"
    title: "CVE-2026-42556: Postiz AI Tool Vulnerability Allows Stored XSS"
    cvss: 8.9
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42556/"
  - cveId: "CVE-2026-42205"
    title: "CVE-2026-42205: Avo Framework Privilege Escalation in Ruby on Rails Admin Panels"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42205/"
  - cveId: "CVE-2026-42352"
    title: "pygeoapi RCE: OGC API Vulnerability Exposes Internal Services"
    cvss: 8.6
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42352/"
  - cveId: "CVE-2026-41705"
    title: "CVE-2026-41705: Spring AI MilvusVectorStore Vulnerable to Filter Injection"
    cvss: 8.6
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41705/"
  - cveId: "CVE-2026-42452"
    title: "Termix CVE-2026-42452 Bypasses 2FA with Temporary JWT"
    cvss: 8.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42452/"
  - cveId: "CVE-2026-6665"
    title: "PgBouncer SCRAM Vulnerability (CVE-2026-6665) Allows Stack Overflow"
    cvss: 8.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6665/"
  - cveId: "CVE-2026-42296"
    title: "CVE-2026-42296: Argo Workflows Bypass Grants Host Network Access"
    cvss: 8.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42296/"
  - cveId: "CVE-2026-41520"
    title: "CVE-2026-41520: Cilium Bugtool Leaks Sensitive WireGuard Data"
    cvss: 7.9
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41520/"
  - cveId: "CVE-2026-42301"
    title: "CVE-2026-42301: Malicious Code Execution Via pyp2spec RPM Generation"
    cvss: 7.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42301/"
  - cveId: "CVE-2026-42345"
    title: "FastGPT Vulnerability: Cloud Metadata Bypass via URL Encoding (CVE-2026-42345)"
    cvss: 7.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42345/"
  - cveId: "CVE-2026-42224"
    title: "CVE-2026-42224: ipl/web XSS Vulnerability Impacts Icinga Web"
    cvss: 7.6
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42224/"
  - cveId: "CVE-2026-42351"
    title: "CVE-2026-42351: pygeoapi Path Traversal Exposes Directories"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42351/"
  - cveId: "CVE-2026-6664"
    title: "PgBouncer Integer Overflow (CVE-2026-6664) Leads to Remote Crash"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6664/"
  - cveId: "CVE-2026-41311"
    title: "LiquidJS CVE-2026-41311: DoS Vulnerability in Template Engine"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41311/"
  - cveId: "CVE-2026-3828"
    title: "Hikvision Switches: Authenticated RCE in Discontinued Products"
    cvss: 7.2
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-3828/"
  - cveId: "CVE-2026-41432"
    title: "CVE-2026-41432: LLM Gateway Stripe Webhook Flaw Allows Quota Forgery"
    cvss: 7.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41432/"
feed_posts:
  - title: "cPanel, WHM Patch Three New Vulnerabilities: Privilege Escalation, RCE Risks"
    tags: "vulnerability, tools, cpanel, web-host-manager"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/cpanel-whm-release-fixes-for-three-new-vulnerabilities-pa-2ycdm/"
  - title: "JDownloader Site Compromised, Distributes Python RAT Malware"
    tags: "malware, microsoft, jdownloader"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/jdownloader-site-hacked-to-replace-installers-with-python-ra-mdbd4/"
trending_tags:
  - "vulnerability"
  - "cve"
  - "critical"
  - "high-severity"
  - "cwe-347"
  - "privilege-escalation"
  - "cwe-284"
  - "cwe-639"
  - "cwe-94"
  - "remote-code-execution"
  - "cwe-78"
  - "cwe-306"
---

Today's automated security digest covering **23** vulnerability disclosures and **2** curated intelligence stories.
