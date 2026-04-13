---
title: "OpenAI Urges Mac Users to Update After Supply Chain Hack"
date: +058252-09-29 10:16:40 +0000
source: Telegram
source_name: "CyberScoop"
source_url: ""
channel: "CyberScoop"
channel_id: "rss-cyberscoop"
telegram_message_id: rss-cyberscoop-g5chc9
tags: [malware, phishing, ai-security, threat-intel, tools]
excerpt: "OpenAI is forcing macOS users to update their applications following a supply chain attack that compromised an open-source library. The company stated in a blog post that while the"
summary: "OpenAI is forcing macOS users to update their applications following a supply chain attack that compromised an open-source library. The company stated in a blog post that while there's no evidence of user data compromise or system intrusion, a GitHub workflow used for signing certificates was briefl"
layout: post
section: live-feed
score: HIGH
curated: false
featured: false
priority: 75
hidden: false
cover_image: "https://images.unsplash.com/photo-1771061863061-8ffdddb28098?w=800&h=400&fit=crop&auto=format&q=80"
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://images.unsplash.com/photo-1771061863061-8ffdddb28098?w=800&h=400&fit=crop&auto=format&q=80"
telegram_url: "https://t.me/c/rss-cyberscoop/rss-cyberscoop-g5chc9"
tlp: "TLP:CLEAR"
event_type: "supply-chain"
organizations:
  - name: "OpenAI"
    domain: "openai.com"
    role: "vendor"
  - name: "Axios"
    domain: "axios.com"
    role: "tool"
  - name: "GitHub"
    domain: "github.com"
    role: "platform"
  - name: "Google"
    domain: "google.com"
    role: "research"
  - name: "Apple"
    domain: "apple.com"
    role: "platform"
threat_actors:
  - "UNC1069"
  - "TeamPCP"
  - "APT41"
countries: [KP]
malware_families:
  - "jason"
link_preview:
  url: "https://cyberscoop.com/openai-axios-supply-chain-attack/"
  title: "OpenAI&#039;s Mac apps needs an update thanks to the Axios hack"
  domain: "cyberscoop.com"
  image: "https://cyberscoop.com/wp-content/uploads/sites/3/2026/04/GettyImages-2268817047.jpg"
why_it_matters:
  - "If you are a macOS user running any OpenAI applications, update them immediately. Older versions will cease to function by May 8th. This incident underscores the pervasive risk of supply chain attacks, even impacting AI firms, so verify the legitimacy of all software you download and run."
bot_cta_title: "Track Supply Chain Risks"
bot_cta_description: "Use /actor UNC1069 to see related threats targeting open-source software."
---

OpenAI is forcing macOS users to update their applications following a supply chain attack that compromised an open-source library. The company stated in a blog post that while there's no evidence of user data compromise or system intrusion, a GitHub workflow used for signing certificates was briefly infected with malware. This led to the company treating the certificate as compromised, necessitating the update.

The attack, attributed to a North Korean hacking group tracked as UNC1069 by Google Threat Intelligence, involved injecting malicious code into two versions of the popular open-source JavaScript library Axios. The tainted versions were live for about three hours before being removed. Axios is a critical component, with its libraries flowing into millions of downstream software downloads weekly, highlighting the broad potential impact of such attacks.

While OpenAI maintains its signing certificate wasn't successfully exfiltrated due to timing and other mitigating factors, they are taking a 'better safe than sorry' approach. The compromised certificate is being revoked and rotated, and older versions of OpenAI's macOS apps will lose functionality and support by May 8th. OpenAI has identified a misconfiguration in its GitHub workflow as the root cause and has since corrected it.
