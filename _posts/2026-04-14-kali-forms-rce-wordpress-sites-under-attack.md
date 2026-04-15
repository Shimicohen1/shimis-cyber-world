---
title: "Kali Forms RCE: WordPress Sites Under Attack"
date: 2026-04-14 07:36:53 +0000
source: Telegram
source_name: "The Cyber Express"
channel: "The Cyber Express"
tags: [vulnerability, identity, threat-intel, tools]
excerpt: "A critical Remote Code Execution (RCE) vulnerability in the Kali Forms WordPress plugin has escalated into an active threat, allowing unauthenticated attackers to compromise sites."
summary: "A critical Remote Code Execution (RCE) vulnerability in the Kali Forms WordPress plugin has escalated into an active threat, allowing unauthenticated attackers to compromise sites. According to The Cyber Express, this flaw, impacting a drag-and-drop form builder with over 10,000 active installations"
layout: post
section: vulnerabilities
score: HIGH
curated: false
featured: false
priority: 80
hidden: false
cover_image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop&auto=format&q=80"
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop&auto=format&q=80"
telegram_url: "https://t.me/c/rss-thecyberexpress/rss-thecyberexpress-jlx98e"
tlp: "TLP:CLEAR"
event_type: "vulnerability"
organizations:
  - name: "Kali Forms"
    domain: "kaliforms.com"
    role: "vendor"
  - name: "WordPress"
    domain: "wordpress.org"
    role: "vendor"
  - name: "Wordfence"
    domain: "wordfence.com"
    role: "vendor"
link_preview:
  url: "https://thecyberexpress.com/kali-forms-vulnerability-wordpress-plugin/"
  title: "Hackers Exploit Kali Forms Vulnerability to Take Over WordPress Sites"
  domain: "thecyberexpress.com"
  image: "https://thecyberexpress.com/wp-content/uploads/Kali-Forms-vulnerability.webp"
why_it_matters:
  - "If your WordPress site uses the Kali Forms plugin, you need to check its version *right now*. If it's anything before 2.4.10, you are vulnerable. Patch immediately to version 2.4.10 or later. Audit your web server logs for any suspicious activity around March 20, 2026, and especially between April 4–10, 2026, for signs of exploitation."
bot_cta_title: "Check WordPress Vulnerabilities with SCW Intel Bot"
bot_cta_description: "Use /brief to get an analyst-ready weekly threat summary that includes new vulnerabilities like this one."
iocs:
  - id: "Kali-Forms-RCE"
    type: "RCE"
    indicator: "Kali Forms WordPress plugin versions <= 2.4.9 — unauthenticated Remote Code Execution"
  - id: "Kali-Forms-RCE"
    type: "Affected Product"
    indicator: "Kali Forms WordPress plugin — 10,000+ active installations, patched in v2.4.10 (March 20, 2026)"
  - id: "Kali-Forms-RCE"
    type: "Code Injection"
    indicator: "form_process → prepare_post_data() → call_user_func() in _save_data() allows arbitrary PHP function execution"
mitre_attack:
  - id: "T1190"
    name: "Exploit Public-Facing Application"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1190/"
  - id: "T1059.001"
    name: "PowerShell"
    tactic: "Execution"
    url: "https://attack.mitre.org/techniques/T1059/001/"
sigma_rules:
  count: 6
  free_count: 3
  paid_count: 3
  preview_title: "Web Application Exploitation Attempt — Kali Forms"
  preview_level: "high"
  preview_technique: "T1190"
  preview_tactic: "Initial Access"
  preview_yaml_b64: "dGl0bGU6IFdlYiBBcHBsaWNhdGlvbiBFeHBsb2l0YXRpb24gQXR0ZW1wdCDigJQgS2FsaSBGb3JtcwppZDogc2N3LTIwMjYtMDQtMTQtMQpzdGF0dXM6IGV4cGVyaW1lbnRhbApsZXZlbDogaGlnaApkZXNjcmlwdGlvbjogfAogIERldGVjdHMgY29tbW9uIGV4cGxvaXRhdGlvbiBwYXR0ZXJucyB0YXJnZXRpbmcgd2ViIGFwcGxpY2F0aW9ucy4gUmV2aWV3IEthbGkgRm9ybXMgYWR2aXNvcmllcyBmb3Igc3BlY2lmaWMgaW5kaWNhdG9ycy4KYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKGF1dG8tZ2VuZXJhdGVkKQpkYXRlOiAyMDI2LTA0LTE0CnJlZmVyZW5jZXM6CiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tLzIwMjYtMDQtMTQta2FsaS1mb3Jtcy1yY2Utd29yZHByZXNzLXNpdGVzLXVuZGVyLWF0dGFjawp0YWdzOgogIC0gYXR0YWNrLmluaXRpYWxfYWNjZXNzCiAgLSBhdHRhY2sudDExOTAKbG9nc291cmNlOgogICAgY2F0ZWdvcnk6IHdlYnNlcnZlcgpkZXRlY3Rpb246CiAgc2VsZWN0aW9uOgogICAgICBjcy11cmktcXVlcnl8Y29udGFpbnM6CiAgICAgICAgLSAnLi4nCiAgICAgICAgLSAnU0VMRUNUJwogICAgICAgIC0gJ1VOSU9OJwogICAgICAgIC0gJzxzY3JpcHQnCiAgICAgICAgLSAnY21kPScKICAgICAgICAtICcvZXRjL3Bhc3N3ZCcKICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb24KZmFsc2Vwb3NpdGl2ZXM6CiAgLSBMZWdpdGltYXRlIGFjdGl2aXR5IGZyb20gS2FsaSBGb3Jtcw=="
---

A critical Remote Code Execution (RCE) vulnerability in the Kali Forms WordPress plugin has escalated into an active threat, allowing unauthenticated attackers to compromise sites. According to The Cyber Express, this flaw, impacting a drag-and-drop form builder with over 10,000 active installations, was exploited in the wild almost immediately after its public disclosure.

The vulnerability, initially reported on March 2, 2026, through a bug bounty program, saw a patched version (2.4.10) released on March 20, 2026. However, the same day saw attackers initiating widespread exploitation campaigns. The Cyber Express detailed a rapid disclosure-to-exploitation cycle, with peak activity observed between April 4–10, 2026, targeting all versions up to and including 2.4.9.

The technical root cause lies within the `form_process` flow and the `prepare_post_data()` function. This function improperly maps attacker-controlled input into internal placeholder storage without adequate validation, allowing arbitrary PHP function names to be injected and subsequently executed via `call_user_func()` in the `_save_data()` method. This lack of input restriction makes exploitation relatively trivial, enabling full Remote Code Execution for unauthenticated users.
