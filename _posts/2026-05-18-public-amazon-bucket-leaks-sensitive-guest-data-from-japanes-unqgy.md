---
title: "Tabiq Hotel Platform Leaks 1 Million Passports and IDs via AWS S3"
date: 2026-05-18 13:02:16 +0000
source: RSS
source_name: "Security Affairs"
channel: "Security Affairs"
tags: [threat-intel, data-breach, malware, cloud, identity]
excerpt: "A critical misconfiguration in the Reqrea's Tabiq hotel check-in system has exposed over one million sensitive guest documents, including passports, driver's licenses, and selfie v"
summary: "A critical misconfiguration in the Reqrea's Tabiq hotel check-in system has exposed over one million sensitive guest documents, including passports, driver's licenses, and selfie verification photos. According to Security Affairs, the data was left publicly accessible in an Amazon S3 cloud storage b"
layout: post
section: live-feed
score: HIGH
curated: false
featured: false
priority: 80
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-046.png"
author: research
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-046.png"
source_url: "https://securityaffairs.com/192302/data-breach/public-amazon-bucket-leaks-sensitive-guest-data-from-japanese-hotel-platform-tabiq.html"
tlp: "TLP:CLEAR"
event_type: "data-breach"
organizations:
  - name: "Reqrea"
    role: "victim"
  - name: "Tabiq"
    role: "victim"
  - name: "Amazon"
    domain: "amazon.com"
    role: "vendor"
  - name: "JPCERT"
    domain: "jpcert.or.jp"
    role: "other"
link_preview:
  url: "https://securityaffairs.com/192302/data-breach/public-amazon-bucket-leaks-sensitive-guest-data-from-japanese-hotel-platform-tabiq.html"
  title: "Public Amazon bucket leaks sensitive guest data from Japanese hotel platform Tabiq"
  domain: "securityaffairs.com"
  image: "https://securityaffairs.com/wp-content/uploads/2019/10/data-leak-US-Government.jpg"
sigma_rules:
  count: 2
  free_count: 1
  paid_count: 1
  preview_title: "Monitor Authentication from Breached Vendor — Reqrea"
  preview_level: "high"
  preview_technique: "data-breach"
  preview_tactic: "event-type"
  preview_yaml_b64: "dGl0bGU6IE1vbml0b3IgQXV0aGVudGljYXRpb24gZnJvbSBCcmVhY2hlZCBWZW5kb3Ig4oCUIFJlcXJlYQppZDogc2N3LTIwMjYtMDUtMTgtZXZ0LTEKc3RhdHVzOiBleHBlcmltZW50YWwKbGV2ZWw6IGhpZ2gKZGVzY3JpcHRpb246IHwKICBGb2xsb3dpbmcgdGhlIFJlcXJlYSBkYXRhIGJyZWFjaCwgbW9uaXRvciBmb3IgbG9naW4gYXR0ZW1wdHMgdXNpbmcgcG90ZW50aWFsbHkgY29tcHJvbWlzZWQgY3JlZGVudGlhbHMuIEFsZXJ0IG9uIGFueSBhdXRoZW50aWNhdGlvbiBmcm9tIHRhcmdldC5sb2NhbCBhY2NvdW50cyBhbmQgY3JlZGVudGlhbCBzdHVmZmluZyBwYXR0ZXJucy4KYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKGF1dG8tZ2VuZXJhdGVkKQpkYXRlOiAyMDI2LTA1LTE4CnJlZmVyZW5jZXM6CiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTE4LXB1YmxpYy1hbWF6b24tYnVja2V0LWxlYWtzLXNlbnNpdGl2ZS1ndWVzdC1kYXRhLWZyb20tamFwYW5lcy11bnFneQp0YWdzOgogIC0gYXR0YWNrLmdlbmVyYWwKICAtIGF0dGFjay5kYXRhLWJyZWFjaApsb2dzb3VyY2U6CiAgICBjYXRlZ29yeTogYXV0aGVudGljYXRpb24KZGV0ZWN0aW9uOgogIHNlbGVjdGlvbl9kb21haW46CiAgICAgIFVzZXJ8ZW5kc3dpdGg6CiAgICAgICAgLSAnQHRhcmdldC5sb2NhbCcKICAgIHNlbGVjdGlvbl9mYWlsdXJlOgogICAgICBFdmVudFR5cGU6ICdsb2dpbl9mYWlsdXJlJwogICAgICBjb25kaXRpb246IHNlbGVjdGlvbl9kb21haW4gb3Igc2VsZWN0aW9uX2ZhaWx1cmUgfCBjb3VudChVc2VyKSBieSBzcmNfaXAgPiAxMApmYWxzZXBvc2l0aXZlczoKICAtIExlZ2l0aW1hdGUgYWN0aXZpdHkgZnJvbSBSZXFyZWE="
  all_rules_b64: "W3sidGl0bGUiOiJNb25pdG9yIEF1dGhlbnRpY2F0aW9uIGZyb20gQnJlYWNoZWQgVmVuZG9yIOKAlCBSZXFyZWEiLCJsZXZlbCI6ImhpZ2giLCJ0ZWNobmlxdWUiOiJkYXRhLWJyZWFjaCIsInRhY3RpYyI6ImV2ZW50LXR5cGUiLCJ0aWVyIjoiZnJlZSIsInlhbWwiOiJ0aXRsZTogTW9uaXRvciBBdXRoZW50aWNhdGlvbiBmcm9tIEJyZWFjaGVkIFZlbmRvciDigJQgUmVxcmVhXG5pZDogc2N3LTIwMjYtMDUtMTgtZXZ0LTFcbnN0YXR1czogZXhwZXJpbWVudGFsXG5sZXZlbDogaGlnaFxuZGVzY3JpcHRpb246IHxcbiAgRm9sbG93aW5nIHRoZSBSZXFyZWEgZGF0YSBicmVhY2gsIG1vbml0b3IgZm9yIGxvZ2luIGF0dGVtcHRzIHVzaW5nIHBvdGVudGlhbGx5IGNvbXByb21pc2VkIGNyZWRlbnRpYWxzLiBBbGVydCBvbiBhbnkgYXV0aGVudGljYXRpb24gZnJvbSB0YXJnZXQubG9jYWwgYWNjb3VudHMgYW5kIGNyZWRlbnRpYWwgc3R1ZmZpbmcgcGF0dGVybnMuXG5hdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoYXV0by1nZW5lcmF0ZWQpXG5kYXRlOiAyMDI2LTA1LTE4XG5yZWZlcmVuY2VzOlxuICAtIGh0dHBzOi8vc2hpbWlzY3liZXJ3b3JsZC5jb20vX3Bvc3RzLzIwMjYtMDUtMTgtcHVibGljLWFtYXpvbi1idWNrZXQtbGVha3Mtc2Vuc2l0aXZlLWd1ZXN0LWRhdGEtZnJvbS1qYXBhbmVzLXVucWd5XG50YWdzOlxuICAtIGF0dGFjay5nZW5lcmFsXG4gIC0gYXR0YWNrLmRhdGEtYnJlYWNoXG5sb2dzb3VyY2U6XG4gICAgY2F0ZWdvcnk6IGF1dGhlbnRpY2F0aW9uXG5kZXRlY3Rpb246XG4gIHNlbGVjdGlvbl9kb21haW46XG4gICAgICBVc2VyfGVuZHN3aXRoOlxuICAgICAgICAtICdAdGFyZ2V0LmxvY2FsJ1xuICAgIHNlbGVjdGlvbl9mYWlsdXJlOlxuICAgICAgRXZlbnRUeXBlOiAnbG9naW5fZmFpbHVyZSdcbiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uX2RvbWFpbiBvciBzZWxlY3Rpb25fZmFpbHVyZSB8IGNvdW50KFVzZXIpIGJ5IHNyY19pcCA+IDEwXG5mYWxzZXBvc2l0aXZlczpcbiAgLSBMZWdpdGltYXRlIGFjdGl2aXR5IGZyb20gUmVxcmVhIn0seyJ0aXRsZSI6IkVtYWlsIGZyb20gQnJlYWNoZWQgUmVxcmVhIERvbWFpbiDigJQgUGhpc2hpbmcgUmlzayIsImxldmVsIjoibWVkaXVtIiwidGVjaG5pcXVlIjoiZGF0YS1icmVhY2giLCJ0YWN0aWMiOiJldmVudC10eXBlIiwidGllciI6InBhaWQiLCJ5YW1sIjoidGl0bGU6IEVtYWlsIGZyb20gQnJlYWNoZWQgUmVxcmVhIERvbWFpbiDigJQgUGhpc2hpbmcgUmlza1xuaWQ6IHNjdy0yMDI2LTA1LTE4LWV2dC0yXG5zdGF0dXM6IGV4cGVyaW1lbnRhbFxubGV2ZWw6IG1lZGl1bVxuZGVzY3JpcHRpb246IHxcbiAgRmxhZyBlbWFpbHMgd2l0aCBhdHRhY2htZW50cyBmcm9tIHRhcmdldC5sb2NhbC4gQnJlYWNoZWQgb3JnYW5pemF0aW9ucyBhcmUgZnJlcXVlbnRseSBpbXBlcnNvbmF0ZWQgaW4gZm9sbG93LXVwIHBoaXNoaW5nIGNhbXBhaWducy5cbmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChhdXRvLWdlbmVyYXRlZClcbmRhdGU6IDIwMjYtMDUtMThcbnJlZmVyZW5jZXM6XG4gIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNS0xOC1wdWJsaWMtYW1hem9uLWJ1Y2tldC1sZWFrcy1zZW5zaXRpdmUtZ3Vlc3QtZGF0YS1mcm9tLWphcGFuZXMtdW5xZ3lcbnRhZ3M6XG4gIC0gYXR0YWNrLmdlbmVyYWxcbiAgLSBhdHRhY2suZGF0YS1icmVhY2hcbmxvZ3NvdXJjZTpcbiAgICBjYXRlZ29yeTogZW1haWxcbmRldGVjdGlvbjpcbiAgc2VsZWN0aW9uOlxuICAgICAgc2VuZGVyX2RvbWFpbjogJ3RhcmdldC5sb2NhbCdcbiAgICAgIGF0dGFjaG1lbnRzfGd0OiAwXG4gICAgICBjb25kaXRpb246IHNlbGVjdGlvblxuZmFsc2Vwb3NpdGl2ZXM6XG4gIC0gTGVnaXRpbWF0ZSBhY3Rpdml0eSBmcm9tIFJlcXJlYSJ9XQ=="
why_it_matters:
  - "If your organization handles any form of personally identifiable information (PII) or identity documents, this incident is a stark reminder to audit your cloud storage configurations immediately. Verify that all S3 buckets, Azure Blobs, or Google Cloud Storage buckets are private by default and enforce strict access controls. Don't assume default settings are sufficient. Implement automated scanning for public buckets and ensure robust developer training on secure cloud practices."
bot_cta_title: "Track Data Breaches and Cloud Exposures"
bot_cta_description: "Use /breach to get the latest intelligence on data breaches and misconfigured cloud assets."
---

A critical misconfiguration in the Reqrea's Tabiq hotel check-in system has exposed over one million sensitive guest documents, including passports, driver's licenses, and selfie verification photos. According to Security Affairs, the data was left publicly accessible in an Amazon S3 cloud storage bucket. Anyone with knowledge of the bucket name, "tabiq," could access this data without authentication.

Security Affairs reports that cybersecurity researcher Anurag Sen discovered the exposure, which spanned from early 2020 until recently, affecting hotel guests worldwide. Following notification to Reqrea and Japan's JPCERT, the bucket was secured. Reqrea states that Amazon S3 buckets are private by default and is investigating how the public exposure occurred, with plans to notify affected users after a full review.

This isn't just a simple slip-up; it's a fundamental failure in cloud security posture. Leaving a bucket publicly readable, especially one containing identity documents, is inexcusable. Attackers don't need sophisticated exploits when basic configuration errors hand them the keys to the kingdom.
