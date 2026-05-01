---
title: "Cordial Spider, Snarky Spider Leverage Vishing and SSO Abuse in SaaS Extortion"
date: 2026-05-01 14:26:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, identity, the-hacker-news]
excerpt: "Cybersecurity researchers are sounding the alarm on two cybercrime groups, Cordial Spider (also known as BlackFile, CL-CRI-1116, O-UNC-045, and UNC6671) and Snarky Spider (O-UNC-02"
summary: "Cybersecurity researchers are sounding the alarm on two cybercrime groups, Cordial Spider (also known as BlackFile, CL-CRI-1116, O-UNC-045, and UNC6671) and Snarky Spider (O-UNC-025 and UNC6661). According to The Hacker News, these groups are executing \"rapid, high-impact attacks\" primarily within S"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-047.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-047.png"
source_url: "https://thehackernews.com/2026/05/cybercrime-groups-using-vishing-and-sso.html"
tlp: "TLP:CLEAR"
event_type: "fraud"
organizations:
  - name: "The Hacker News"
    domain: "thehackernews.com"
    role: "vendor"
threat_actors:
  - "Cordial Spider"
  - "BlackFile"
  - "CL-CRI-1116"
  - "O-UNC-045"
  - "UNC6671"
  - "Snarky Spider"
  - "O-UNC-025"
  - "UNC6661"
malware_families:
  - "Leverage"
link_preview:
  url: "https://thehackernews.com/2026/05/cybercrime-groups-using-vishing-and-sso.html"
  title: "Cybercrime Groups Using Vishing and SSO Abuse in Rapid SaaS Extortion Attacks"
  domain: "thehackernews.com"
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi4FSyjacFNJX32YMLQvN6jUeVwGJfoAHPLMIhtU6aNS6hrkIUokynaWWzqxOjr1JsP0lIooaL0ppYM-iQ_rEH2ruoqMw1UAb_bq4FNjI16P6P7CpTaYSkJtp-TpCFKOce9ODtmzskcTZnuWFLYyUdfA0UeHqmRVVNB1P6Mw28a5Yuc7T1kgEx4Pcyxbcsr/s1600/vishing.jpg"
iocs:
  - id: "SaaS-Extortion-Attack"
    type: "Auth Bypass"
    indicator: "SSO Abuse"
  - id: "SaaS-Extortion-Attack"
    type: "Information Disclosure"
    indicator: "High-speed data theft from SaaS environments"
  - id: "SaaS-Extortion-Attack"
    type: "Social Engineering"
    indicator: "Vishing"
mitre_attack:
  - id: "T1133"
    name: "External Remote Services"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1133/"
  - id: "T1539"
    name: "Steal Web Session Cookie"
    tactic: "Credential Access"
    url: "https://attack.mitre.org/techniques/T1539/"
  - id: "T1078.004"
    name: "Cloud Accounts"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1078/004/"
why_it_matters:
  - "If your organization relies heavily on SaaS applications and SSO, you are a prime target. Immediately review your SSO configurations for any potential misconfigurations or excessive permissions. Reinforce security awareness training to educate users about vishing attacks, as initial access often hinges on social engineering. Implement robust MFA for all SaaS access and ensure comprehensive logging is enabled and monitored within your SaaS environments for anomalous activity."
bot_cta_title: "Identify Threats from Cordial Spider and Snarky Spider"
bot_cta_description: "Use /actor Cordial Spider or /actor Snarky Spider to see related threats and attack patterns."
---

Cybersecurity researchers are sounding the alarm on two cybercrime groups, Cordial Spider (also known as BlackFile, CL-CRI-1116, O-UNC-045, and UNC6671) and Snarky Spider (O-UNC-025 and UNC6661). According to The Hacker News, these groups are executing "rapid, high-impact attacks" primarily within SaaS environments, leaving minimal forensic traces. Their tactics involve high-speed data theft followed by extortion attempts.

The Hacker News highlights that these groups are particularly adept at abusing Single Sign-On (SSO) mechanisms and employing vishing techniques. This combination allows them to bypass traditional security controls, gain unauthorized access to SaaS applications, and exfiltrate sensitive data quickly. The focus on SaaS environments means they are targeting the very heart of modern enterprise operations, where critical data and applications reside.

The operational methodology of Cordial Spider and Snarky Spider underscores a shift towards more stealthy, cloud-native attack vectors. By leveraging vishing for initial access and then exploiting SSO misconfigurations or stolen credentials, they can achieve deep penetration with a low footprint. This makes detection incredibly challenging for organizations relying solely on endpoint or network-centric security solutions, necessitating a strong focus on identity and access management (IAM) within SaaS ecosystems.
