---
layout: digest
title: "Daily Security Digest — 2026-05-06"
date: 2026-05-06 23:00:00 +0300
channel: "Daily Digest"
score: "CRITICAL"
source_name: "SCW"
ai_rewritten: true
author: digest
featured: true
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-013.png"
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-013.png"
summary: "25 vulnerability disclosures (1 Critical, 24 High) and 16 curated intelligence stories from 7 sources."
tags:
  - daily-digest
  - vulnerability
  - cve
  - high-severity
  - denial-of-service
  - remote-code-execution
  - cwe-94
  - cross-site-scripting-xss
  - cwe-79
  - sql-injection
source_count: 7
vulns:
  - cveId: "CVE-2026-41930"
    title: "CVE-2026-41930: Vvveb Docker Hard-Coded Credentials Lead to Critical Database Access"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41930/"
  - cveId: "CVE-2026-7841"
    title: "GeoVision GV-ASWeb RCE: High-Severity Flaw Affects Notification Settings"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-7841/"
  - cveId: "CVE-2025-31951"
    title: "HCL BigFix RunBookAI Vulnerability Allows Command Smuggling"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2025-31951/"
  - cveId: "CVE-2026-20034"
    title: "Cisco Unity Connection: Authenticated RCE Via Web Management Interface"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-20034/"
  - cveId: "CVE-2026-42503"
    title: "CVE-2026-42503: gopls Vulnerability Exposes Dev Environments to RCE"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-42503/"
  - cveId: "CVE-2026-7875"
    title: "NanoClaw Container Vulnerability Allows Arbitrary File Access, Recursive Deletion"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-7875/"
  - cveId: "CVE-2026-41934"
    title: "Vvveb RCE: Authenticated Users Can Achieve Unauthenticated Code Execution"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41934/"
  - cveId: "CVE-2026-41938"
    title: "CVE-2026-41938: Vvveb Unrestricted File Upload Leads to RCE"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41938/"
  - cveId: "CVE-2024-30151"
    title: "HCL BigFix Service Management Privilege Escalation (CVE-2024-30151)"
    cvss: 8.3
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2024-30151/"
  - cveId: "CVE-2026-41936"
    title: "CVE-2026-41936: Vvveb XXE Allows File Disclosure, Privilege Escalation"
    cvss: 8.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41936/"
  - cveId: "CVE-2026-6691"
    title: "CVE-2026-6691: MongoDB C Driver Heap Overflow via GSSAPI Username"
    cvss: 7.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6691/"
  - cveId: "CVE-2026-20167"
    title: "Cisco IoT FND DoS Vulnerability (CVE-2026-20167) Allows Remote Router Reloads"
    cvss: 7.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-20167/"
  - cveId: "CVE-2026-20185"
    title: "CVE-2026-20185: Cisco SG350/SG350X SNMP DoS Vulnerability"
    cvss: 7.7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-20185/"
  - cveId: "CVE-2025-71251"
    title: "CVE-2025-71251: IMS DoS Vulnerability Poses High Risk"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2025-71251/"
  - cveId: "CVE-2025-71252"
    title: "CVE-2025-71252: Modem IMS Vulnerability Exposes Remote DoS Risk"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2025-71252/"
  - cveId: "CVE-2025-71253"
    title: "Modem IMS Vulnerability (CVE-2025-71253) Allows Remote DoS"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2025-71253/"
  - cveId: "CVE-2025-71254"
    title: "Modem IMS DoS Vulnerability (CVE-2025-71254) Poses Remote Threat"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2025-71254/"
  - cveId: "CVE-2025-71255"
    title: "CVE-2025-71255: Modem IMS Vulnerability Exposes Devices to Remote DoS"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2025-71255/"
  - cveId: "CVE-2025-71256"
    title: "CVE-2025-71256: nr Modem DoS Vulnerability Poses High Risk"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2025-71256/"
  - cveId: "CVE-2026-1719"
    title: "WordPress Gravity Bookings Plugin Vulnerable to SQL Injection (CVE-2026-1719)"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-1719/"
  - cveId: "CVE-2026-20188"
    title: "Cisco Crosswork, NSO DoS Vulnerability (CVE-2026-20188)"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-20188/"
  - cveId: "CVE-2026-23870"
    title: "CVE-2026-23870: High-Severity DoS Flaw in React Server Components"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-23870/"
  - cveId: "CVE-2026-7332"
    title: "CVE-2026-7332: WordPress LatePoint Plugin XSS Flaw Exposes Unauthenticated Attackers"
    cvss: 7.2
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-7332/"
  - cveId: "CVE-2026-7448"
    title: "CVE-2026-7448: WordPress LatePoint Plugin Open to Unauthenticated Stored XSS"
    cvss: 7.2
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-7448/"
  - cveId: "CVE-2026-20035"
    title: "Cisco Unity Connection Web Inbox SSRF Vulnerability (CVE-2026-20035)"
    cvss: 7.2
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-20035/"
feed_posts:
  - title: "Palo Alto Networks Zero-Day Exploited to Hack Firewalls"
    tags: "vulnerability, threat-intel, palo-alto-networks"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/palo-alto-networks-to-patch-zero-day-exploited-to-hack-firew-awpvq/"
  - title: "LegionProxy Breach Exposes 10,000 Accounts"
    tags: "data-breach, legionproxy"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/legionproxy-10-144-breached-accounts-5jdcb/"
  - title: "DAEMON Tools Supply Chain Attack Confirmed, Malware-Free Version Released"
    tags: "malware, data-breach, tools, disc-soft-limited, bleepingcomputer"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/daemon-tools-devs-confirm-breach-release-malware-free-versi-mz2xg/"
  - title: "North Korean APT37 Targets Ethnic Koreans in China with BirdCall Malware"
    tags: "malware, threat-intel, eset, sqgame, iot-reaper, guard"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/north-korean-hackers-targeted-ethnic-koreans-in-china-with-a-941im/"
  - title: "UK Age Verification Flaws Exploit Social Engineering, Parental Aid"
    tags: "phishing, leverage"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1542954397-4568/"
  - title: "Oracle to Issue Monthly Critical Security Patch Updates"
    tags: "vulnerability, oracle"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/oracle-debuts-monthly-critical-security-patch-updates-a19et/"
  - title: "Cyber News: Basic Security Hygiene Gaps Plague Most Organizations"
    tags: "cyber, security, plague"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1427288221-8884/"
  - title: "Google Expands Android Binary Transparency to Counter Supply Chain Attacks"
    tags: "cyber, security, google, stop"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/google-s-android-apps-get-public-verification-to-stop-supply-uxtb6/"
  - title: "CloudZ RAT and Pheno Plugin Target Windows Phone Link for Credential Theft"
    tags: "vulnerability, cloud, microsoft, identity, tools"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/windows-phone-link-exploited-by-cloudz-rat-to-steal-credenti-oy75b/"
  - title: "CISA Mandates Isolation, Recovery for Critical Infrastructure Against Foreign Cyber Threats"
    tags: "threat-intel, cybersecurity-and-infrastructure-security-agency"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/cisa-critical-infrastructure-must-master-isolation-recover-cncgj/"
  - title: "The Hacker News Launches 'Cybersecurity Stars Awards 2026'"
    tags: "cyber, security, the-hacker-news"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/the-hacker-news-launches-cybersecurity-stars-awards-2026-a8nz8/"
  - title: "AI Agents Proliferating Faster Than Enterprise Governance"
    tags: "identity, ai-security, gartner, dark-shades"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/your-ai-agents-are-already-inside-the-perimeter-do-you-know-va5k8/"
  - title: "MuddyWater Uses Chaos Ransomware as Decoy for Microsoft Teams Attacks"
    tags: "malware, ransomware, microsoft, phishing, chaos"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/muddywater-hackers-use-chaos-ransomware-as-a-decoy-in-attack-btsl8/"
  - title: "Ransomware Attacks Succeed by Destroying Backups First, Not Just Encrypting"
    tags: "malware, ransomware"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/why-ransomware-attacks-succeed-even-when-backups-exist-s6wwb/"
  - title: "Cisco DoS Flaw Hits Network Controllers, Requires Manual Reboot"
    tags: "vulnerability, cisco, revive, chaos"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/new-cisco-dos-flaw-requires-manual-reboot-to-revive-devices-bcyha/"
trending_tags:
  - "vulnerability"
  - "cve"
  - "high-severity"
  - "denial-of-service"
  - "remote-code-execution"
  - "cwe-94"
  - "cross-site-scripting-xss"
  - "cwe-79"
  - "sql-injection"
  - "cwe-89"
  - "cwe-77"
  - "cwe-351"
---

Today's automated security digest covering **25** vulnerability disclosures and **16** curated intelligence stories.
