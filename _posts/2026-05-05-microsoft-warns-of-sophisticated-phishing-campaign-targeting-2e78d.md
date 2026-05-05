---
title: "Microsoft Warns of Sophisticated AitM Phishing Campaign Targeting US Organizations"
date: 2026-05-05 14:45:04 +0000
source: RSS
source_name: "SecurityWeek"
channel: "SecurityWeek"
tags: [threat-intel, vulnerability, microsoft, phishing]
excerpt: "Microsoft has issued a warning regarding a sophisticated phishing campaign actively targeting organizations in the United States. According to SecurityWeek, the attack vector invol"
summary: "Microsoft has issued a warning regarding a sophisticated phishing campaign actively targeting organizations in the United States. According to SecurityWeek, the attack vector involves malicious emails designed to appear as conduct reports, luring unsuspecting victims to a meticulously crafted Micros"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-021.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-021.png"
source_url: "https://www.securityweek.com/microsoft-warns-of-sophisticated-phishing-campaign-targeting-us-organizations/"
tlp: "TLP:CLEAR"
event_type: "phishing"
organizations:
  - name: "Microsoft"
    domain: "microsoft.com"
    role: "vendor"
countries: [US]
link_preview:
  url: "https://www.securityweek.com/microsoft-warns-of-sophisticated-phishing-campaign-targeting-us-organizations/"
  title: "Microsoft Warns of Sophisticated Phishing Campaign Targeting US Organizations"
  domain: "securityweek.com"
  image: "https://www.securityweek.com/wp-content/uploads/2026/05/conduct-review-phishing.jpg"
iocs:
  - id: "Microsoft-Phishing-Campaign-2024"
    type: "Phishing"
    indicator: "Malicious emails claiming to contain a 'conduct report'"
  - id: "Microsoft-Phishing-Campaign-2024"
    type: "Phishing"
    indicator: "Microsoft phishing website leveraging Adversary-in-the-Middle (AitM) techniques"
mitre_attack:
  - id: "T1566.002"
    name: "Phishing: Spearphishing Link"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1566/002/"
  - id: "T1539"
    name: "Steal Application Access Token"
    tactic: "Credential Access"
    url: "https://attack.mitre.org/techniques/T1539/"
why_it_matters:
  - "If your organization is operating in the US, you are a direct target. Beyond user education, you must implement phishing-resistant MFA like FIDO2/passkeys wherever possible. Review your Conditional Access policies in Azure AD to block legacy authentication and enforce strict device compliance. Audit for suspicious sign-ins, especially those originating from unusual locations or devices, and hunt for session cookie reuse."
bot_cta_title: "US Phishing Threats & Microsoft Advisories"
bot_cta_description: "Use /country US to see the latest threats targeting US organizations, including Microsoft advisories."
---

Microsoft has issued a warning regarding a sophisticated phishing campaign actively targeting organizations in the United States. According to SecurityWeek, the attack vector involves malicious emails designed to appear as conduct reports, luring unsuspecting victims to a meticulously crafted Microsoft phishing website. This isn't just a simple credential grab; the campaign leverages Adversary-in-the-Middle (AitM) techniques, significantly escalating its danger.

AitM attacks are a game-changer for attackers because they bypass traditional multi-factor authentication (MFA) mechanisms. By acting as a proxy between the user and the legitimate service, the attackers can intercept and replay session cookies, effectively authenticating as the user without needing their password or MFA token. This makes the phishing site far more convincing and the resulting compromise much deeper, granting persistent access.

For defenders, this means relying solely on user vigilance against phishing links is insufficient. The attacker's calculus here is clear: target high-value US organizations with a technique that circumvents a critical layer of modern security. The focus on 'conduct reports' suggests a social engineering angle designed to induce immediate action and fear, further increasing the likelihood of compromise.
