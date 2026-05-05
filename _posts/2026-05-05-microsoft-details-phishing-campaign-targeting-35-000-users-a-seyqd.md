---
title: "Microsoft Details Phishing Campaign Targeting 35,000 Users in 26 Countries"
date: 2026-05-05 06:35:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, microsoft, identity, phishing]
excerpt: "Microsoft has revealed details of a substantial credential theft operation, observed between April 14 and 16, 2026. This multi-stage campaign, as reported by The Hacker News, lever"
summary: "Microsoft has revealed details of a substantial credential theft operation, observed between April 14 and 16, 2026. This multi-stage campaign, as reported by The Hacker News, leveraged \"code of conduct\" themed lures and legitimate email services to trick users. The objective was to direct victims to"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-026.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/vulnerability/vulnerability-026.png"
source_url: "https://thehackernews.com/2026/05/microsoft-details-phishing-campaign.html"
tlp: "TLP:CLEAR"
event_type: "phishing"
organizations:
  - name: "Microsoft"
    domain: "microsoft.com"
    role: "vendor"
link_preview:
  url: "https://thehackernews.com/2026/05/microsoft-details-phishing-campaign.html"
  title: "Microsoft Details Phishing Campaign Targeting 35,000 Users Across 26 Countries"
  domain: "thehackernews.com"
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiAfU-GpnCdjg1P2f40nj2Y7eLLpsjWNa1TnSlNm3m9F7VkOryT5etD2BouMGxbfatdzukMzeCPXsDagasXWNbcwUPJNkDY-sBox3DkrA0bTYjAEOk4JV8OySSD1_Ni2DgEnoWih83X65e9K1foEaEUetNxoyXFJnGx4Np8VQWrZSnxo2UMmR0Y68L-qf0y/s1600/ms-hook.jpg"
iocs:
  - id: "Microsoft-Phishing-2026-04"
    type: "Phishing"
    indicator: "Credential theft campaign observed between April 14 and 16, 2026"
  - id: "Microsoft-Phishing-2026-04"
    type: "Phishing"
    indicator: "Lures themed as 'code of conduct'"
  - id: "Microsoft-Phishing-2026-04"
    type: "Phishing"
    indicator: "Leveraging legitimate email services for delivery"
  - id: "Microsoft-Phishing-2026-04"
    type: "Phishing"
    indicator: "Directing users to attacker-controlled domains"
  - id: "Microsoft-Phishing-2026-04"
    type: "Phishing"
    indicator: "Stealing authentication tokens"
mitre_attack:
  - id: "T1566.002"
    name: "Phishing: Spearphishing Attachment"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1566/002/"
  - id: "T1078.004"
    name: "Cloud Accounts"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1078/004/"
  - id: "T1539"
    name: "Steal Web Session Cookie"
    tactic: "Credential Access"
    url: "https://attack.mitre.org/techniques/T1539/"
why_it_matters:
  - "If your organization's users were active between April 14-16, 2026, you need to audit email logs for inbound messages with \"code of conduct\" themes, especially those originating from legitimate-looking but ultimately malicious domains. Prioritize MFA enforcement and review session token validity. Attackers are going for tokens precisely because MFA can be bypassed once a valid session token is captured. Educate users on the evolving nature of phishing beyond simple password prompts."
bot_cta_title: "Identify Global Phishing Campaigns"
bot_cta_description: "Use /country to see threats targeting specific nations, or /brief for analyst-ready summaries."
---

Microsoft has revealed details of a substantial credential theft operation, observed between April 14 and 16, 2026. This multi-stage campaign, as reported by The Hacker News, leveraged "code of conduct" themed lures and legitimate email services to trick users. The objective was to direct victims to attacker-controlled domains and subsequently steal authentication tokens.

This sophisticated attack impacted over 35,000 users across more than 13,000 organizations in 26 different countries. The broad scope indicates a well-resourced actor, aiming for maximum reach and credential harvesting. The use of legitimate email services also makes these phishing attempts harder to detect with traditional email security gateways.

Attackers are consistently refining their social engineering tactics. This campaign highlights their shift towards abusing trusted platforms and employing contextually relevant lures to bypass defenses and gain initial access. The focus on authentication tokens, not just passwords, points to a more advanced post-compromise strategy, aiming for persistent access and session hijacking.
