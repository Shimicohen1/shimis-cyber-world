---
title: "Amtrak Data Breach: 2M Accounts Exposed by ShinyHunters"
date: 2026-04-17 04:54:48 +0000
source: RSS
source_name: "Have I Been Pwned"
channel: "Have I Been Pwned"
tags: [data-breach, ransomware]
excerpt: "The threat actor group ShinyHunters has claimed responsibility for breaching Amtrak, a major US passenger railroad service. Have I Been Pwned reports that over 2.1 million accounts"
summary: "The threat actor group ShinyHunters has claimed responsibility for breaching Amtrak, a major US passenger railroad service. Have I Been Pwned reports that over 2.1 million accounts were compromised. This incident, which surfaced in April 2026, highlights a common attack vector targeting customer dat"
layout: post
section: live-feed
score: HIGH
curated: false
featured: false
priority: 85
hidden: false
cover_image: "https://images.unsplash.com/photo-1771061863061-8ffdddb28098?w=800&h=400&fit=crop&auto=format&q=80"
author: research
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://images.unsplash.com/photo-1771061863061-8ffdddb28098?w=800&h=400&fit=crop&auto=format&q=80"
source_url: "https://haveibeenpwned.com/Breach/Amtrak"
tlp: "TLP:CLEAR"
event_type: "data-breach"
organizations:
  - name: "Amtrak"
    domain: "amtrak.com"
    role: "victim"
threat_actors:
  - "ShinyHunters"
countries: [US]
malware_families:
  - "Dark"
link_preview:
  url: "https://haveibeenpwned.com/Breach/Amtrak"
  title: "Have I Been Pwned: Amtrak Data Breach"
  domain: "haveibeenpwned.com"
  image: "https://haveibeenpwned.com/Images/OG/Amtrak"
sigma_rules:
  count: 2
  free_count: 1
  paid_count: 1
  preview_title: "Monitor Authentication from Breached Vendor — Amtrak"
  preview_level: "high"
  preview_technique: "data-breach"
  preview_tactic: "event-type"
  preview_yaml_b64: "dGl0bGU6IE1vbml0b3IgQXV0aGVudGljYXRpb24gZnJvbSBCcmVhY2hlZCBWZW5kb3Ig4oCUIEFtdHJhawppZDogc2N3LTIwMjYtMDQtMTctZXZ0LTEKc3RhdHVzOiBleHBlcmltZW50YWwKbGV2ZWw6IGhpZ2gKZGVzY3JpcHRpb246IHwKICBGb2xsb3dpbmcgdGhlIEFtdHJhayBkYXRhIGJyZWFjaCwgbW9uaXRvciBmb3IgbG9naW4gYXR0ZW1wdHMgdXNpbmcgcG90ZW50aWFsbHkgY29tcHJvbWlzZWQgY3JlZGVudGlhbHMuIEFsZXJ0IG9uIGFueSBhdXRoZW50aWNhdGlvbiBmcm9tIGFtdHJhay5jb20gYWNjb3VudHMgYW5kIGNyZWRlbnRpYWwgc3R1ZmZpbmcgcGF0dGVybnMuCmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChhdXRvLWdlbmVyYXRlZCkKZGF0ZTogMjAyNi0wNC0xNwpyZWZlcmVuY2VzOgogIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNC0xNy1hbXRyYWstMi0xNDctNjc5LWJyZWFjaGVkLWFjY291bnRzLTlvY3dhCnRhZ3M6CiAgLSBhdHRhY2suZ2VuZXJhbAogIC0gYXR0YWNrLmRhdGEtYnJlYWNoCmxvZ3NvdXJjZToKICAgIGNhdGVnb3J5OiBhdXRoZW50aWNhdGlvbgpkZXRlY3Rpb246CiAgc2VsZWN0aW9uX2RvbWFpbjoKICAgICAgVXNlcnxlbmRzd2l0aDoKICAgICAgICAtICdAYW10cmFrLmNvbScKICAgIHNlbGVjdGlvbl9mYWlsdXJlOgogICAgICBFdmVudFR5cGU6ICdsb2dpbl9mYWlsdXJlJwogICAgICBjb25kaXRpb246IHNlbGVjdGlvbl9kb21haW4gb3Igc2VsZWN0aW9uX2ZhaWx1cmUgfCBjb3VudChVc2VyKSBieSBzcmNfaXAgPiAxMApmYWxzZXBvc2l0aXZlczoKICAtIExlZ2l0aW1hdGUgYWN0aXZpdHkgZnJvbSBBbXRyYWs="
why_it_matters:
  - "If your organization utilizes third-party platforms for customer data management, such as Salesforce, immediately review your access controls and audit logs. Ensure multi-factor authentication is enforced for all administrative and user accounts. Conduct an immediate risk assessment to understand what sensitive customer data is stored and how it is protected against unauthorized access."
bot_cta_title: "Check Amtrak data breach exposure"
bot_cta_description: "Use /org amtrak.com to check if your supply chain is exposed."
---

The threat actor group ShinyHunters has claimed responsibility for breaching Amtrak, a major US passenger railroad service. Have I Been Pwned reports that over 2.1 million accounts were compromised. This incident, which surfaced in April 2026, highlights a common attack vector targeting customer data.

ShinyHunters is known for exploiting customer relationship management (CRM) systems, particularly Salesforce instances. Their modus operandi involves gaining unauthorized access, attempting to extort a ransom from the victim organization, and then publicly leaking the stolen data if demands are not met. This tactic often results in sensitive customer information falling into the wrong hands.

The compromised Amtrak data reportedly includes a substantial amount of personally identifiable information (PII). Specifically, Have I Been Pwned indicates that the breach encompasses over 2 million unique email addresses, alongside customer names, physical addresses, and details from customer support interactions. This depth of information poses significant risks for both the affected individuals and Amtrak.

For defenders, this breach underscores the critical need for robust security around customer-facing platforms, especially those managed by third-party vendors like Salesforce. Organizations must implement stringent access controls, regular security audits, and continuous monitoring for suspicious activity within these systems. The sheer volume of PII exposed means that a coordinated response is essential, focusing on immediate mitigation and long-term data protection strategies.

The attacker's calculus here is clear: customer databases are treasure troves of valuable data. Email addresses can be used for phishing campaigns, credential stuffing attacks, or sold on the dark web. Physical addresses and support records add further context for more sophisticated social engineering attempts, or can be used to craft highly targeted attacks against individuals or the organization itself. This makes securing such data a top priority for any business.
