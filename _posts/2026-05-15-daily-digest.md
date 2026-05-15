---
layout: digest
title: "Daily Security Digest — 2026-05-15"
date: 2026-05-15 23:00:00 +0300
channel: "Daily Digest"
score: "CRITICAL"
source_name: "SCW"
ai_rewritten: true
author: digest
featured: true
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-019.png"
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-019.png"
summary: "31 vulnerability disclosures (7 Critical, 24 High) and 16 curated intelligence stories from 8 sources."
tags:
  - daily-digest
  - vulnerability
  - cve
  - high-severity
  - authentication-bypass
  - cwe-305
  - information-disclosure
  - cwe-352
  - cwe-862
  - cwe-367
source_count: 8
vulns:
  - cveId: "CVE-2026-5229"
    title: "WordPress Form Notify Plugin: Critical Authentication Bypass (CVE-2026-5229)"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-5229/"
  - cveId: "CVE-2026-8398"
    title: "CVE-2026-8398: DAEMON Tools Lite Supply Chain Compromise"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-8398/"
  - cveId: "CVE-2026-44717"
    title: "CVE-2026-44717: Critical RCE in MCP Calculate Server Due to `eval()`"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44717/"
  - cveId: "CVE-2021-47965"
    title: "WordPress Plugin WP Super Edit RCE via Unrestricted File Upload"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2021-47965/"
  - cveId: "CVE-2026-46364"
    title: "CVE-2026-46364: Critical SQL Injection in phpMyFAQ Unauthenticated API Access"
    cvss: 9.8
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-46364/"
  - cveId: "CVE-2026-41258"
    title: "OpenMRS RCE: Critical Vulnerability Allows Unrestricted Java Reflection"
    cvss: 9.1
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41258/"
  - cveId: "CVE-2026-45010"
    title: "CVE-2026-45010: phpMyFAQ 2FA Bypass Grants Admin Access"
    cvss: 9.1
    severity: "CRITICAL"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-45010/"
  - cveId: "CVE-2026-6228"
    title: "CVE-2026-6228: WordPress Frontend Admin Plugin Privilege Escalation"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6228/"
  - cveId: "CVE-2021-47964"
    title: "Schlix CMS RCE (CVE-2021-47964) Exposes Servers to Authenticated Attackers"
    cvss: 8.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2021-47964/"
  - cveId: "CVE-2026-2652"
    title: "mlflow Unauthenticated Access: FastAPI Routes Exposed in Versions < 3.10.0"
    cvss: 8.6
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-2652/"
  - cveId: "CVE-2026-41964"
    title: "CVE-2026-41964: High-Severity Web Permission Control Vulnerability Disclosed"
    cvss: 8.4
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41964/"
  - cveId: "CVE-2021-47966"
    title: "CVE-2021-47966: PHP Timeclock SQLi Exposes Employee Data"
    cvss: 8.2
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2021-47966/"
  - cveId: "CVE-2026-28761"
    title: "Musetheque V4 CSRF Vulnerability (CVE-2026-28761) Poses High Risk"
    cvss: 8.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-28761/"
  - cveId: "CVE-2026-4094"
    title: "CVE-2026-4094: WooCommerce Currency Switcher Plugin Vulnerable to Data Loss"
    cvss: 8.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-4094/"
  - cveId: "CVE-2026-46407"
    title: "Vvveb CMS API Token Disclosure (CVE-2026-46407) High Severity"
    cvss: 8.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-46407/"
  - cveId: "CVE-2026-41702"
    title: "VMware Fusion TOCTOU Flaw Grants Root Privileges"
    cvss: 7.8
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-41702/"
  - cveId: "CVE-2026-46367"
    title: "phpMyFAQ Stored XSS: Authenticated Users Can Steal Admin Sessions"
    cvss: 7.6
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-46367/"
  - cveId: "CVE-2026-46408"
    title: "Vvveb CMS Vulnerability (CVE-2026-46408) Allows Cart Hijacking"
    cvss: 7.6
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-46408/"
  - cveId: "CVE-2026-6403"
    title: "WordPress Quick Playground Plugin Path Traversal (CVE-2026-6403)"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-6403/"
  - cveId: "CVE-2026-44714"
    title: "CVE-2026-44714: bitcoinj Library Flaw Allows Arbitrary P2PKH/P2WPKH Spends"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44714/"
  - cveId: "CVE-2026-8695"
    title: "CVE-2026-8695: radare2 Use-After-Free Allows Remote Code Execution"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-8695/"
  - cveId: "CVE-2021-47959"
    title: "WordPress WPGraphQL DoS: Unauthenticated Attackers Can Crash Servers"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2021-47959/"
  - cveId: "CVE-2026-44826"
    title: "Vvveb CMS CVE-2026-44826 Allows Negative Order Totals, Exposing Merchants to Financial Fraud"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44826/"
  - cveId: "CVE-2026-46359"
    title: "CVE-2026-46359: phpMyFAQ SQL Injection via OAuth Token Claims"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-46359/"
  - cveId: "CVE-2026-46366"
    title: "phpMyFAQ Information Disclosure (CVE-2026-46366) Exposes Restricted Content"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-46366/"
  - cveId: "CVE-2026-8686"
    title: "coreMQTT CVE-2026-8686: DoS via Crafted MQTT v5.0 Packet"
    cvss: 7.5
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-8686/"
  - cveId: "CVE-2026-45539"
    title: "Microsoft APM Vulnerability CVE-2026-45539 Exposes AI Agent Files"
    cvss: 7.4
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-45539/"
  - cveId: "CVE-2021-47963"
    title: "Anote 1.0 RCE via Persistent XSS (CVE-2021-47963)"
    cvss: 7.2
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2021-47963/"
  - cveId: "CVE-2026-44641"
    title: "CVE-2026-44641: Microsoft APM Plugin Path Traversal Vulnerability"
    cvss: 7.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-44641/"
  - cveId: "CVE-2026-45037"
    title: "Tabby Terminal Vulnerability CVE-2026-45037 Allows OS Protocol Handler Hijack"
    cvss: 7.1
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-45037/"
  - cveId: "CVE-2026-45036"
    title: "CVE-2026-45036: Tabby Terminal ZMODEM Flaw Enables Code Execution"
    cvss: 7
    severity: "HIGH"
    url: "https://shimiscyberworld.com/posts/nvd-CVE-2026-45036/"
feed_posts:
  - title: "TeamPCP Releases Shai-Hulud Worm Source Code, Incentivizes Supply Chain Attacks"
    tags: "malware, tools, teampcp, shai-hulud, leverage, agendacrypt, apt3"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/teampcp-ups-the-game-releases-shai-hulud-worm-s-source-code-cpe3q/"
  - title: "American Lending Center Data Breach Exposes 123,000 Individuals"
    tags: "malware, ransomware, data-breach, american-lending-center, leverage"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/american-lending-center-data-breach-affects-123-000-individu-m967u/"
  - title: "JDownloader Installer Compromised, Delivering Python RAT via Unpatched CMS"
    tags: "malware, vulnerability, data-breach, microsoft, identity, jdownloader, appwork-gmbh"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/attackers-replaced-jdownloader-installer-downloads-with-malw-ne7yp/"
  - title: "CISA Mandates Cisco SD-WAN Patch for Federal Agencies"
    tags: "vulnerability, identity, tools, cisco, cisa, dyepack"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/cisa-orders-all-federal-agencies-to-patch-exploited-bug-in-c-dxy9y/"
  - title: "Nvidia, Android, Audi, Canvas: Security Week Highlights Key Flaws"
    tags: "data-breach, cloud, ai-security, nvidia, canvas, audi, cisco"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/in-other-news-big-tech-vs-canada-encryption-bill-cisco-s-f-iomva/"
  - title: "node-ipc npm Package Compromised to Steal Credentials"
    tags: "malware, identity, npm, inter"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/popular-node-ipc-npm-package-compromised-to-steal-credential-x3md6/"
  - title: "Turla Transforms Kazuar Backdoor into Modular P2P Botnet"
    tags: "malware, u-s-cybersecurity-and-infrastructure-security-agency, federal-security-service, leverage, kazuar"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/turla-turns-kazuar-backdoor-into-modular-p2p-botnet-for-pers-tljha/"
  - title: "Funnel Builder WordPress Plugin Exploited to Steal Credit Cards"
    tags: "vulnerability, wordpress, woocommerce"
    score: "HIGH"
    url: "https://shimiscyberworld.com/posts/funnel-builder-wordpress-plugin-bug-exploited-to-steal-credi-uvfof/"
  - title: "Chrome 148 Update Patches Critical Vulnerabilities"
    tags: "vulnerability, google"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/chrome-148-update-patches-critical-vulnerabilities-yx1wy/"
  - title: "Google Pixel Contextual Suggestions Raise Privacy Concerns"
    tags: "cyber, security, google"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1542954397-4588/"
  - title: "Microsoft Exchange Zero-Day Exploited via XSS in Outlook on the web"
    tags: "vulnerability, microsoft, threat-intel"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/microsoft-warns-of-exchange-zero-day-flaw-exploited-in-attac-obplf/"
  - title: "Gremlin Stealer Evolves with Advanced Obfuscation, Crypto Clipping"
    tags: "malware, gremlin"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/gremlin-stealer-s-evolved-tactics-hiding-in-plain-sight-wit-271z9/"
  - title: "Trusted Tools: The Silent Threat in Your Attack Surface"
    tags: "malware, threat-intel, tools, bitdefender"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/what-45-days-of-watching-your-own-tools-will-tell-you-about-5do30/"
  - title: "Robotic Lawn Mower Vulnerability: Remote Control Exposes Physical Risk"
    tags: "cyber, security, leverage"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/telegram-1427288221-8931/"
  - title: "OpenClaw Flaws Chained for Data Theft, Persistence"
    tags: "malware, cloud, cyera, leverage"
    score: "MEDIUM"
    url: "https://shimiscyberworld.com/posts/four-openclaw-flaws-enable-data-theft-privilege-escalation-a7v6t/"
trending_tags:
  - "vulnerability"
  - "cve"
  - "high-severity"
  - "authentication-bypass"
  - "cwe-305"
  - "information-disclosure"
  - "cwe-352"
  - "cwe-862"
  - "cwe-367"
  - "critical"
  - "cwe-287"
  - "cwe-506"
---

Today's automated security digest covering **31** vulnerability disclosures and **16** curated intelligence stories.
