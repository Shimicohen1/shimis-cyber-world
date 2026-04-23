---
title: "UNC6692 Impersonates IT Helpdesk via Microsoft Teams with SNOW Malware"
date: 2026-04-23 18:16:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, malware, microsoft, phishing]
excerpt: "SCW notes a new threat cluster, UNC6692, is actively deploying custom malware named SNOW. The Hacker News reports that UNC6692 employs social engineering via Microsoft Teams, imper"
summary: "SCW notes a new threat cluster, UNC6692, is actively deploying custom malware named SNOW. The Hacker News reports that UNC6692 employs social engineering via Microsoft Teams, impersonating IT helpdesk personnel. This tactic convinces victims to accept chat invitations and subsequently deploy the mal"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-031.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-031.png"
source_url: "https://thehackernews.com/2026/04/unc6692-impersonates-it-helpdesk-via.html"
tlp: "TLP:CLEAR"
event_type: "malware"
organizations:
  - name: "Microsoft"
    domain: "microsoft.com"
    role: "vendor"
threat_actors:
  - "UNC6692"
malware_families:
  - "Leverage"
iocs:
  - id: "UNC6692-SNOW-Malware"
    type: "Social Engineering"
    indicator: "Impersonation of IT helpdesk employees via Microsoft Teams"
  - id: "UNC6692-SNOW-Malware"
    type: "Malware Deployment"
    indicator: "Custom malware suite named 'SNOW'"
  - id: "UNC6692-SNOW-Malware"
    type: "Initial Access"
    indicator: "Microsoft Teams chat invitation from a malicious account"
mitre_attack:
  - id: "T1598"
    name: "Phishing for Information"
    tactic: "Reconnaissance"
    url: "https://attack.mitre.org/techniques/T1598/"
  - id: "T1598.003"
    name: "Spearphishing for Information"
    tactic: "Reconnaissance"
    url: "https://attack.mitre.org/techniques/T1598/003/"
  - id: "T1566"
    name: "Phishing"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1566/"
why_it_matters:
  - "If your organization uses Microsoft Teams, immediately reinforce user training on social engineering tactics, especially those impersonating IT helpdesk. Implement strict policies for verifying identity before accepting any unsolicited requests or downloads, even from internal accounts. Audit your Teams environment for suspicious chat invitations and unexpected file transfers."
bot_cta_title: "Track UNC6692 Tactics"
bot_cta_description: "Use /actor UNC6692 to see related threats and attack patterns."
---

SCW notes a new threat cluster, UNC6692, is actively deploying custom malware named SNOW. The Hacker News reports that UNC6692 employs social engineering via Microsoft Teams, impersonating IT helpdesk personnel. This tactic convinces victims to accept chat invitations and subsequently deploy the malware.

The attack vector is straightforward: an attacker, posing as internal IT, initiates a Teams chat. Once the victim accepts, the social engineering begins, leading to the deployment of the SNOW malware. This highlights a persistent vulnerability in enterprise communication platforms where trust in internal identities is often exploited.

For defenders, this underscores the critical need for enhanced scrutiny of internal communications, even from seemingly legitimate sources. The attacker's calculus is clear: leverage inherent trust in IT to bypass technical controls. This isn't a complex zero-day; it's a social attack that exploits human factors, making it highly effective.
