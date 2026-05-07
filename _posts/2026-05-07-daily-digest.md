---
layout: digest
title: "Daily Security Digest — 2026-05-07"
date: 2026-05-07 23:00:00 +0300
channel: "Daily Digest"
score: "CRITICAL"
source_name: "SCW"
ai_rewritten: true
author: digest
featured: true
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-019.png"
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-019.png"
summary: "32 vulnerability disclosures (8 Critical, 24 High) and 16 curated intelligence stories from 8 sources."
tags:
  - daily-digest
  - vulnerability
  - cve
  - critical
  - high-severity
  - cwe-346
  - cross-site-scripting-xss
  - cwe-79
  - denial-of-service
  - cwe-476
source_count: 8
vulns:
  - cveId: "CVE-2026-6508"
    title: "CVE-2026-6508: Liderahenk Origin Validation Error Allows Critical Access"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6508/"
  - cveId: "CVE-2026-7414"
    title: "Yarbo Firmware v2.3.9 Critical Hardcoded Credential Vulnerability"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-7414/"
  - cveId: "CVE-2026-7415"
    title: "CVE-2026-7415: Yarbo Robot Firmware Exposes Sensitive Data via Anonymous MQTT"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-7415/"
  - cveId: "CVE-2026-37709"
    title: "Snipe-IT CVE-2026-37709: Critical RCE via Insecure Permissions"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-37709/"
  - cveId: "CVE-2026-5791"
    title: "DivvyDrive Critical CSRF Vulnerability: CVE-2026-5791 Poses Remote Attack Risk"
    cvss: 9.6
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-5791/"
  - cveId: "CVE-2026-41589"
    title: "CVE-2026-41589: Critical Path Traversal in Wish SSH Server SCP Middleware"
    cvss: 9.6
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41589/"
  - cveId: "CVE-2026-6795"
    title: "DivvyDrive Open Redirect Vulnerability CVE-2026-6795 Rated Critical"
    cvss: 9.6
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6795/"
  - cveId: "CVE-2026-41902"
    title: "CVE-2026-41902: FreeScout Invite Hash Vulnerability Allows Permanent Account Takeover"
    cvss: 9.1
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41902/"
  - cveId: "CVE-2026-3953"
    title: "CVE-2026-3953: Gosoft Proticaret E-Commerce XSS Vulnerability"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-3953/"
  - cveId: "CVE-2026-5784"
    title: "DivvyDrive Stored XSS Vulnerability (CVE-2026-5784) Poses High Risk"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-5784/"
  - cveId: "CVE-2026-6002"
    title: "DivvyDrive XSS Vulnerability (CVE-2026-6002) Poses High Risk"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6002/"
  - cveId: "CVE-2026-42215"
    title: "CVE-2026-42215: GitPython Arbitrary Command Execution Vulnerability"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42215/"
  - cveId: "CVE-2026-41505"
    title: "CVE-2026-41505: RELATE Courseware Package Suffers Predictable Token Generation Flaw"
    cvss: 8.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41505/"
  - cveId: "CVE-2025-14341"
    title: "CVE-2025-14341: DivvyDrive Vulnerability Allows Excessive Allocation, Flooding"
    cvss: 8.3
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2025-14341/"
  - cveId: "CVE-2026-41490"
    title: "Dagster Orchestration Platform Vulnerable to SQL Injection via Dynamic Partitions"
    cvss: 8.3
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41490/"
  - cveId: "CVE-2026-41422"
    title: "Daptin Headless CMS SQLi Puts Data at High Risk"
    cvss: 8.3
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41422/"
  - cveId: "CVE-2026-42284"
    title: "CVE-2026-42284: GitPython Vulnerability Allows Remote Code Execution Via Malicious Clones"
    cvss: 8.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42284/"
  - cveId: "CVE-2026-42214"
    title: "NotepadNext CVE-2026-42214: Arbitrary Command Execution via Malicious Extensions"
    cvss: 7.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42214/"
  - cveId: "CVE-2026-44244"
    title: "GitPython CVE-2026-44244 Allows Remote Code Execution via HooksPath Injection"
    cvss: 7.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44244/"
  - cveId: "CVE-2026-41688"
    title: "CVE-2026-41688: Wallos SSRF Bypass via DNS Rebinding"
    cvss: 7.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41688/"
  - cveId: "CVE-2026-41905"
    title: "FreeScout CVE-2026-41905: Server-Side Request Forgery via Redirect Logic"
    cvss: 7.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41905/"
  - cveId: "CVE-2026-41904"
    title: "CVE-2026-41904: FreeScout XSS Delivers Payloads via Auto-Reply"
    cvss: 7.6
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41904/"
  - cveId: "CVE-2026-41642"
    title: "GoBGP DoS Vulnerability (CVE-2026-41642) Patched in Version 4.4.0"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41642/"
  - cveId: "CVE-2026-41643"
    title: "CVE-2026-41643: GoBGP Remote DoS Vulnerability Exposes Network Infrastructure"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41643/"
  - cveId: "CVE-2026-42285"
    title: "CVE-2026-42285: Critical GoBGP Flaw Allows Remote Crash via Malformed UPDATE"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42285/"
  - cveId: "CVE-2026-42011"
    title: "gnutls CVE-2026-42011: Certificate Validation Bypass Poses MITM Risk"
    cvss: 7.4
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42011/"
  - cveId: "CVE-2026-8083"
    title: "CVE-2026-8083: SQL Injection in SourceCodester Pharmacy System"
    cvss: 7.3
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-8083/"
  - cveId: "CVE-2026-7413"
    title: "CVE-2026-7413: Hidden Backdoor Found in Yarbo Firmware"
    cvss: 7.2
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-7413/"
  - cveId: "CVE-2026-44742"
    title: "CVE-2026-44742: Postorius HTML Injection Exploited In The Wild"
    cvss: 7.2
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44742/"
  - cveId: "CVE-2026-42010"
    title: "CVE-2026-42010: GnuTLS RSA-PSK NUL Byte Authentication Bypass"
    cvss: 7.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42010/"
  - cveId: "CVE-2026-41554"
    title: "Bricks Builder Flaw: CVE-2026-41554 Exposes Websites to Reflected XSS"
    cvss: 7.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41554/"
  - cveId: "CVE-2026-41906"
    title: "FreeScout CVE-2026-41906: Agent Can Expose Hidden Customer Data"
    cvss: 7.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41906/"
feed_posts:
  - title: "Gemini CLI Vulnerability: Prompt Injection Leads to Code Execution"
    tags: "vulnerability, ai-security, tools"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/gemini-cli-vulnerability-could-have-led-to-code-execution-s-ite2y/"
  - title: "Ivanti EPMM RCE Vulnerability Exploited in Zero-Day Attacks"
    tags: "vulnerability, ivanti"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/ivanti-warns-of-new-epmm-flaw-exploited-in-zero-day-attacks-rm9dt/"
  - title: "MedusaLocker Ransomware Group Details Financial Motivation, Operational Shifts"
    tags: "cyber, security, medusalocker, blackrouter"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1427288221-8889/"
  - title: "Old-School Attacks Still Win: Credential Dumps and Weak Defenses Plague 2026"
    tags: "vulnerability, plague"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/threatsday-bulletin-edge-plaintext-passwords-ics-0-days-p-7p25i/"
  - title: "Incident Response Retainers Aren't Readiness: The Operational Gap"
    tags: "cyber, security"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/day-zero-readiness-the-operational-gaps-that-break-incident-h2q7a/"
  - title: "Polish Intelligence Warns of Attacks on Water Treatment Systems"
    tags: "cyber, security"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/polish-intelligence-warns-hackers-attacked-water-treatment-c-ctbni/"
  - title: "AI Coding Agents Fuel Next Supply Chain Crisis with 'TrustFall' Attacks"
    tags: "cyber, security, crisis, apt41"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/ai-coding-agents-could-fuel-next-supply-chain-crisis-fmgkw/"
  - title: "Cisco Researchers Expose Pixel-Level Attacks on AI Vision Models"
    tags: "vulnerability, ai-security, cisco, securityweek"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/attackers-could-exploit-ai-vision-models-using-imperceptible-h4msp/"
  - title: "AI-Powered Phishing: The 'Patient Zero' Threat to Enterprise Security"
    tags: "data-breach, threat-intel, stop"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/one-click-total-shutdown-the-patient-zero-webinar-on-kil-imnwl/"
  - title: "Claude Code OAuth Tokens Vulnerable to Stealthy MCP Hijacking"
    tags: "identity, mitiga, claude-code, interception"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/claude-code-oauth-tokens-can-be-stolen-through-stealthy-mcp-1mzs9/"
  - title: "Ransomware Groups Aggressively Target Healthcare Sector Globally"
    tags: "malware, ransomware, safepay, medusa, akira, qilin"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1373735086-5020/"
  - title: "North Carolina Man Pleads Guilty to Doxxing Supreme Court Justices"
    tags: "cyber, security, supreme-court, leverage"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/north-carolina-man-pleads-guilty-to-doxxing-supreme-court-ju-ur6p9/"
  - title: "Palo Alto Networks Zero-Day Exploited by Suspected Chinese State Actor"
    tags: "vulnerability, threat-intel, palo-alto-networks"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/palo-alto-zero-day-exploited-in-campaign-bearing-hallmarks-o-23gll/"
  - title: "Tom Parker Tipped for CISA Leadership Role"
    tags: "cyber, security, cisa, dark"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/has-cisa-finally-found-its-new-leader-in-tom-parker-5seag/"
  - title: "Anonymous Claims Control Over Three Chinese Satellites"
    tags: "cyber, security, anonymous"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1542954397-4572/"
trending_tags:
  - "vulnerability"
  - "cve"
  - "critical"
  - "high-severity"
  - "cwe-346"
  - "cross-site-scripting-xss"
  - "cwe-79"
  - "denial-of-service"
  - "cwe-476"
  - "cwe-129"
  - "authentication-bypass"
  - "cwe-352"
---

Today's automated security digest covering **32** vulnerability disclosures and **16** curated intelligence stories.
