---
layout: digest
title: "Daily Security Digest — 2026-05-04"
date: 2026-05-04 23:00:00 +0300
channel: "Daily Digest"
score: "CRITICAL"
source_name: "SCW"
ai_rewritten: true
author: digest
featured: true
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-028.png"
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-028.png"
summary: "31 vulnerability disclosures (20 Critical, 11 High) and 12 curated intelligence stories from 6 sources."
tags:
  - daily-digest
  - vulnerability
  - cve
  - high-severity
  - command-injection
  - cwe-94
  - critical
  - out-of-bounds-1
  - cwe-125
  - privilege-escalation
source_count: 6
vulns:
  - cveId: "CVE-2026-42809"
    title: "CVE-2026-42809: Apache Polaris Critical Credential Vulnerability"
    cvss: 9.9
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42809/"
  - cveId: "CVE-2026-42810"
    title: "CVE-2026-42810: Apache Polaris S3 Wildcard Vulnerability Creates Critical Data Risk"
    cvss: 9.9
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42810/"
  - cveId: "CVE-2026-42811"
    title: "CVE-2026-42811: Apache Polaris Credential Bypass Exposes Cloud Storage"
    cvss: 9.9
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42811/"
  - cveId: "CVE-2026-42812"
    title: "Apache Iceberg CVE-2026-42812 Bypasses Metadata Location Validation"
    cvss: 9.9
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42812/"
  - cveId: "CVE-2026-24118"
    title: "VM2 Sandbox Breakout Vulnerability: Critical Flaw Exposes Node.js Applications"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-24118/"
  - cveId: "CVE-2026-24120"
    title: "CVE-2026-24120: vm2 Sandbox Escape Allows Host Command Execution"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-24120/"
  - cveId: "CVE-2026-24781"
    title: "VM2 Sandbox Escape Vulnerability (CVE-2026-24781) Exposes Node.js Applications"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-24781/"
  - cveId: "CVE-2026-26332"
    title: "vm2 Sandbox Escape (CVE-2026-26332) Exposes Node.js Apps to RCE"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-26332/"
  - cveId: "CVE-2026-26956"
    title: "vm2 Sandbox Escape Vulnerability (CVE-2026-26956) Allows Critical Code Execution"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-26956/"
  - cveId: "CVE-2026-42076"
    title: "CVE-2026-42076: Evolver Engine RCE Puts AI Agents at Risk"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42076/"
  - cveId: "CVE-2026-42373"
    title: "D-Link DIR-605L EOL Router Hit by Critical Telnet Backdoor"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42373/"
  - cveId: "CVE-2026-42374"
    title: "D-Link DIR-600L EOL Router Has Hardcoded Telnet Backdoor"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42374/"
  - cveId: "CVE-2026-42375"
    title: "D-Link DIR-600L EOL Router Exposes Critical Telnet Backdoor"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42375/"
  - cveId: "CVE-2026-42376"
    title: "CVE-2026-42376: D-Link DIR-456U EOL Router Exposes Critical Backdoor"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42376/"
  - cveId: "CVE-2026-42796"
    title: "Arelle RCE: Unauthenticated Remote Code Execution in REST Endpoint"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42796/"
  - cveId: "CVE-2026-25293"
    title: "CVE-2026-25293: Critical PLC Buffer Overflow Puts Industrial Control Systems at Risk"
    cvss: 9.6
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-25293/"
  - cveId: "CVE-2026-42087"
    title: "OpenC3 COSMOS TSDB SQL Injection Flaw Exposes Critical Systems"
    cvss: 9.6
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42087/"
  - cveId: "CVE-2026-42088"
    title: "OpenC3 COSMOS Critical Script Runner Bypass (CVE-2026-42088)"
    cvss: 9.6
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42088/"
  - cveId: "CVE-2026-41571"
    title: "CVE-2026-41571: Note Mark Critical Auth Bypass"
    cvss: 9.4
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41571/"
  - cveId: "CVE-2026-7482"
    title: "CVE-2026-7482: Critical Ollama Heap Out-of-Bounds Read Exposes Sensitive AI Data"
    cvss: 9.1
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-7482/"
  - cveId: "CVE-2025-58074"
    title: "Norton Secure VPN Privilege Escalation via Microsoft Store (CVE-2025-58074)"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2025-58074/"
  - cveId: "CVE-2026-6266"
    title: "CVE-2026-6266: AAP Gateway Email Auto-Link Flaw Allows Account Hijack"
    cvss: 8.3
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6266/"
  - cveId: "CVE-2026-29004"
    title: "BusyBox udhcpc6 Heap Overflow (CVE-2026-29004) Exposes Embedded Systems"
    cvss: 8.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-29004/"
  - cveId: "CVE-2026-42084"
    title: "CVE-2026-42084: OpenC3 COSMOS Allows Password Change Without Old Password"
    cvss: 8.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42084/"
  - cveId: "CVE-2026-32834"
    title: "CVE-2026-32834: WordPress Easy PayPal Plugin Authentication Bypass"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-32834/"
  - cveId: "CVE-2026-41471"
    title: "CVE-2026-41471: PayPal Events WordPress Plugin Exposes All Customer Orders"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41471/"
  - cveId: "CVE-2026-25863"
    title: "CVE-2026-25863: WordPress Plugin DoS Vulnerability Hits Contact Form 7"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-25863/"
  - cveId: "CVE-2026-42151"
    title: "Prometheus Azure AD OAuth Secret Exposed via Plaintext Config"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42151/"
  - cveId: "CVE-2026-42154"
    title: "Prometheus CVE-2026-42154: Unauthenticated Memory Exhaustion Vulnerability"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42154/"
  - cveId: "CVE-2026-3120"
    title: "SambaBox CVE-2026-3120: High-Severity OS Command Injection"
    cvss: 7.2
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-3120/"
  - cveId: "CVE-2026-43616"
    title: "Detect-It-Easy Path Traversal Allows Arbitrary File Writes, Code Execution"
    cvss: 7.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-43616/"
feed_posts:
  - title: "CISA Warns: 'Copy Fail' Linux Root Vulnerability Actively Exploited"
    tags: "vulnerability, threat-intel, cisa, theori"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/cisa-says-copy-fail-flaw-now-exploited-to-root-linux-syste-6jlid/"
  - title: "AI Phishing, Android Spyware, Linux Exploit, GitHub RCE Headline Weekly Threats"
    tags: "vulnerability, data-breach, phishing, tools, github"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/weekly-recap-ai-powered-phishing-android-spying-tool-li-y3gu1/"
  - title: "cPanel Authentication Bypass Vulnerability Exploited in the Wild"
    tags: "vulnerability, identity, cpanel, dark, apt41"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/exploit-cyber-frenzy-threatens-millions-via-critical-cpanel-9twsz/"
  - title: "Kaikatsu Club Breach: 17-Year-Old Exposes 7 Million Users for Pokémon Cards"
    tags: "cyber, security, kaikatsu-club"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/2026-the-year-of-ai-assisted-attacks-izhod/"
  - title: "Silver Fox Deploys ABCDoor Malware via Tax Phishing in India and Russia"
    tags: "malware, phishing, threat-intel, income-tax-department-of-india, play, void-arachne"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/silver-fox-deploys-abcdoor-malware-via-tax-themed-phishing-i-vmto2/"
  - title: "MOVEit Automation Critical Auth Bypass Flaw Requires Immediate Patch"
    tags: "vulnerability, identity, progress-software, bleepingcomputer"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/progress-warns-of-critical-moveit-automation-auth-bypass-fla-unrgi/"
  - title: "Cisco Acquires Israeli Startup Astrix for $400M to Combat Non-Human Identities"
    tags: "cyber, security, cisco, astrix, leverage"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1427288221-8874/"
  - title: "Ransomware Group Claims Breach of Hungarian Media Firm Mediaworks"
    tags: "malware, ransomware, data-breach, mediaworks, the-record-by-recorded-future, leverage"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/ransomware-group-claims-breach-of-pro-orb-n-hungarian-media-b2s6y/"
  - title: "Forbes Agrees to $10 Million Settlement in Wiretapping Lawsuit"
    tags: "cloud, tools, forbes"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/forbes-preliminarily-agrees-to-pay-10-million-to-settle-cal-hnn8u/"
  - title: "Infrastructure Education Company Reports Cyber Incident, User Data Exposed"
    tags: "microsoft, infrastructure"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/educational-company-infrastructure-reports-cyber-incident-6eypo/"
  - title: "Phishing Campaign Leverages SimpleHelp, ScreenConnect RMM to Hit 80+ Orgs"
    tags: "phishing, threat-intel, tools, venomous"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/phishing-campaign-hits-80-orgs-using-simplehelp-and-screenc-gxd4y/"
  - title: "Cisco Acquires Astrix Security to Secure Non-Human Identities"
    tags: "identity, ai-security, cisco, astrix-security"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/cisco-moves-to-acquire-astrix-security-to-tackle-non-human-i-lo620/"
trending_tags:
  - "vulnerability"
  - "cve"
  - "high-severity"
  - "command-injection"
  - "cwe-94"
  - "critical"
  - "out-of-bounds-1"
  - "cwe-125"
  - "privilege-escalation"
  - "cwe-1386"
  - "cwe-305"
  - "cwe-20"
---

Today's automated security digest covering **31** vulnerability disclosures and **12** curated intelligence stories.
