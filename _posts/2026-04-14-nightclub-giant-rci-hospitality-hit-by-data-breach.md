---
title: "Nightclub Giant RCI Hospitality Hit by Data Breach"
date: 2026-04-14 09:35:06 +0000
source: Telegram
source_name: "SecurityWeek"
channel: "SecurityWeek"
tags: [vulnerability, data-breach, threat-intel]
excerpt: "Nightclub conglomerate RCI Hospitality recently disclosed a data breach stemming from an Insecure Direct Object Reference (IDOR) vulnerability. According to SecurityWeek, the compa"
summary: "Nightclub conglomerate RCI Hospitality recently disclosed a data breach stemming from an Insecure Direct Object Reference (IDOR) vulnerability. According to SecurityWeek, the company detailed the incident in an SEC filing, confirming that the flaw in RCI Internet Services led to the exposure of cont"
layout: post
section: vulnerabilities
score: HIGH
curated: false
featured: false
priority: 85
hidden: false
cover_image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=400&fit=crop&auto=format&q=80"
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=400&fit=crop&auto=format&q=80"
telegram_url: "https://t.me/c/rss-securityweek/rss-securityweek-bwsq00"
tlp: "TLP:CLEAR"
event_type: "data-breach"
organizations:
  - name: "RCI Hospitality"
    domain: "rcihospitality.com"
    role: "victim"
  - name: "RCI Internet Services"
    domain: "rcihospitality.com"
    role: "vendor"
malware_families:
  - "NightClub"
why_it_matters:
  - "If your organization handles sensitive contractor or third-party data, this RCI Hospitality breach is a wake-up call. Immediately audit your web applications for IDOR vulnerabilities, especially in areas where user input dictates resource access. Implement robust authorization checks on all object references to ensure users can only access data they are explicitly permitted to see."
bot_cta_title: "Track Breaches: RCI Hospitality"
bot_cta_description: "Use /breach to view the latest data breaches and ransomware events, including this incident."
iocs:
  - id: "RCI-IDOR-2026"
    type: "IDOR"
    indicator: "RCI Internet Services — Insecure Direct Object Reference exposing contractor data"
  - id: "RCI-IDOR-2026"
    type: "Data Breach"
    indicator: "RCI Hospitality contractor data exposed via IDOR vulnerability"
mitre_attack:
  - id: "T1530"
    name: "Data from Cloud Storage"
    tactic: "Collection"
    url: "https://attack.mitre.org/techniques/T1530/"
sigma_rules:
  count: 2
  free_count: 1
  paid_count: 1
  preview_title: "Monitor Authentication from Breached Vendor — RCI Hospitality"
  preview_level: "high"
  preview_technique: "data-breach"
  preview_tactic: "event-type"
  preview_yaml_b64: "dGl0bGU6IE1vbml0b3IgQXV0aGVudGljYXRpb24gZnJvbSBCcmVhY2hlZCBWZW5kb3Ig4oCUIFJDSSBIb3NwaXRhbGl0eQppZDogc2N3LTIwMjYtMDQtMTQtZXZ0LTEKc3RhdHVzOiBleHBlcmltZW50YWwKbGV2ZWw6IGhpZ2gKZGVzY3JpcHRpb246IHwKICBGb2xsb3dpbmcgdGhlIFJDSSBIb3NwaXRhbGl0eSBkYXRhIGJyZWFjaCwgbW9uaXRvciBmb3IgbG9naW4gYXR0ZW1wdHMgdXNpbmcgcG90ZW50aWFsbHkgY29tcHJvbWlzZWQgY3JlZGVudGlhbHMuIEFsZXJ0IG9uIGFueSBhdXRoZW50aWNhdGlvbiBmcm9tIHJjaWhvc3BpdGFsaXR5LmNvbSBhY2NvdW50cyBhbmQgY3JlZGVudGlhbCBzdHVmZmluZyBwYXR0ZXJucy4KYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKGF1dG8tZ2VuZXJhdGVkKQpkYXRlOiAyMDI2LTA0LTE0CnJlZmVyZW5jZXM6CiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tLzIwMjYtMDQtMTQtbmlnaHRjbHViLWdpYW50LXJjaS1ob3NwaXRhbGl0eS1oaXQtYnktZGF0YS1icmVhY2gKdGFnczoKICAtIGF0dGFjay5nZW5lcmFsCiAgLSBhdHRhY2suZGF0YS1icmVhY2gKbG9nc291cmNlOgogICAgY2F0ZWdvcnk6IGF1dGhlbnRpY2F0aW9uCmRldGVjdGlvbjoKICBzZWxlY3Rpb25fZG9tYWluOgogICAgICBVc2VyfGVuZHN3aXRoOgogICAgICAgIC0gJ0ByY2lob3NwaXRhbGl0eS5jb20nCiAgICBzZWxlY3Rpb25fZmFpbHVyZToKICAgICAgRXZlbnRUeXBlOiAnbG9naW5fZmFpbHVyZScKICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb25fZG9tYWluIG9yIHNlbGVjdGlvbl9mYWlsdXJlIHwgY291bnQoVXNlcikgYnkgc3JjX2lwID4gMTAKZmFsc2Vwb3NpdGl2ZXM6CiAgLSBMZWdpdGltYXRlIGFjdGl2aXR5IGZyb20gUkNJIEhvc3BpdGFsaXR5"
---

Nightclub conglomerate RCI Hospitality recently disclosed a data breach stemming from an Insecure Direct Object Reference (IDOR) vulnerability. According to SecurityWeek, the company detailed the incident in an SEC filing, confirming that the flaw in RCI Internet Services led to the exposure of contractor data.

IDOR vulnerabilities are a classic but persistent issue, allowing attackers to access resources by manipulating object IDs in requests. In this case, it seems RCI's implementation failed to properly validate user permissions, granting unauthorized access to sensitive contractor information. This serves as a stark reminder that even seemingly simple flaws can have significant data exposure consequences.
