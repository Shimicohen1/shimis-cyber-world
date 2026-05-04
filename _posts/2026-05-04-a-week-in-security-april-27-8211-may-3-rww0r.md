---
title: "cPanel Bug Exposes Millions of Websites to Takeover"
date: 2026-05-04 07:01:00 +0000
source: RSS
source_name: "Malwarebytes Blog"
channel: "Malwarebytes Blog"
tags: [malware, threat-intel, ransomware, vulnerability, microsoft]
excerpt: "A critical cPanel vulnerability is under active exploitation, exposing millions of websites to potential takeover, according to Malwarebytes Blog. This flaw presents a significant"
summary: "A critical cPanel vulnerability is under active exploitation, exposing millions of websites to potential takeover, according to Malwarebytes Blog. This flaw presents a significant risk, allowing attackers to gain unauthorized control over web hosting environments. The widespread adoption of cPanel m"
layout: post
section: vulnerabilities
score: HIGH
curated: false
featured: false
priority: 70
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-028.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-028.png"
source_url: "https://www.malwarebytes.com/blog/news/2026/05/a-week-in-security-april-27-may-3-3"
tlp: "TLP:CLEAR"
event_type: "vulnerability"
organizations:
  - name: "cPanel"
    domain: "cpanel.net"
    role: "vendor"
  - name: "PayPal"
    domain: "paypal.com"
    role: "victim"
  - name: "Roblox"
    domain: "roblox.com"
    role: "victim"
  - name: "US Military"
    domain: "mil"
    role: "victim"
  - name: "NASA"
    domain: "nasa.gov"
    role: "victim"
  - name: "Microsoft"
    domain: "microsoft.com"
    role: "vendor"
countries: [US]
link_preview:
  url: "https://www.malwarebytes.com/blog/news/2026/05/a-week-in-security-april-27-may-3-3"
  title: "A week in security (April 27 - May 3)"
  domain: "malwarebytes.com"
  image: "https://www.malwarebytes.com/wp-content/uploads/sites/2/2023/11/Week_in_Security.jpg"
iocs:
  - id: "Malwarebytes-Advisory-2026-05"
    type: "Auth Bypass"
    indicator: "cPanel bug actively exploited"
  - id: "Malwarebytes-Advisory-2026-05"
    type: "Phishing"
    indicator: "PayPal emails hijacked to deliver tech support scams"
  - id: "Malwarebytes-Advisory-2026-05"
    type: "Account Takeover"
    indicator: "Roblox accounts stolen"
  - id: "Malwarebytes-Advisory-2026-05"
    type: "Information Disclosure"
    indicator: "Microsoft PhantomRPC (feature or bug)"
  - id: "Malwarebytes-Advisory-2026-05"
    type: "Social Engineering"
    indicator: "Fake CAPTCHA scam"
mitre_attack:
  - id: "T1190"
    name: "Exploit Public-Facing Application"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1190/"
sigma_rules:
  count: 3
  free_count: 1
  paid_count: 2
  preview_title: "cPanel Web Shell Upload via Vulnerable Endpoint"
  preview_level: "critical"
  preview_technique: "T1190"
  preview_tactic: "Initial Access"
  preview_yaml_b64: "dGl0bGU6IGNQYW5lbCBXZWIgU2hlbGwgVXBsb2FkIHZpYSBWdWxuZXJhYmxlIEVuZHBvaW50CmlkOiBzY3ctMjAyNi0wNS0wNC1haS0xCnN0YXR1czogZXhwZXJpbWVudGFsCmxldmVsOiBjcml0aWNhbApkZXNjcmlwdGlvbjogfAogIERldGVjdHMgYXR0ZW1wdHMgdG8gZXhwbG9pdCBhIGNyaXRpY2FsIGNQYW5lbCB2dWxuZXJhYmlsaXR5IGJ5IHVwbG9hZGluZyBhIHdlYiBzaGVsbCB0aHJvdWdoIGEgc3BlY2lmaWMgdnVsbmVyYWJsZSBlbmRwb2ludC4gVGhpcyBydWxlIHRhcmdldHMgdGhlIGluaXRpYWwgYWNjZXNzIHZlY3RvciBkZXNjcmliZWQgaW4gdGhlIGNQYW5lbCB2dWxuZXJhYmlsaXR5LCBhaW1pbmcgdG8gY2F0Y2ggdGhlIGV4cGxvaXQgYmVmb3JlIGl0IGxlYWRzIHRvIGEgZnVsbCBzeXN0ZW0gdGFrZW92ZXIuCmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChBSS1nZW5lcmF0ZWQpCmRhdGU6IDIwMjYtMDUtMDQKcmVmZXJlbmNlczoKICAtIGh0dHBzOi8vc2hpbWlzY3liZXJ3b3JsZC5jb20vX3Bvc3RzLzIwMjYtMDUtMDQtYS13ZWVrLWluLXNlY3VyaXR5LWFwcmlsLTI3LTgyMTEtbWF5LTMtcnd3MHIKdGFnczoKICAtIGF0dGFjay5pbml0aWFsX2FjY2VzcwogIC0gYXR0YWNrLnQxMTkwCmxvZ3NvdXJjZToKICAgIGNhdGVnb3J5OiB3ZWJzZXJ2ZXIKZGV0ZWN0aW9uOgogIHNlbGVjdGlvbjoKICAgICAgY3MtdXJpfGNvbnRhaW5zOgogICAgICAgICAgLSAnL2NnaS1zeXMvY3BhbmVsX2xvZy5jZ2knCiAgICAgIGNzLW1ldGhvZDoKICAgICAgICAgIC0gJ1BPU1QnCiAgICAgIHNjLXN0YXR1czoKICAgICAgICAgIC0gJzIwMCcKICAgICAgY3MtdXJpLXF1ZXJ5fGNvbnRhaW5zOgogICAgICAgICAgLSAndXBsb2FkPTEnCiAgY29uZGl0aW9uOiBzZWxlY3Rpb24KZmFsc2Vwb3NpdGl2ZXM6CiAgLSBMZWdpdGltYXRlIGFkbWluaXN0cmF0aXZlIGFjdGl2aXR5"
  all_rules_b64: "W3sidGl0bGUiOiJjUGFuZWwgV2ViIFNoZWxsIFVwbG9hZCB2aWEgVnVsbmVyYWJsZSBFbmRwb2ludCIsImxldmVsIjoiY3JpdGljYWwiLCJ0ZWNobmlxdWUiOiJUMTE5MCIsInRhY3RpYyI6IkluaXRpYWwgQWNjZXNzIiwidGllciI6ImZyZWUiLCJ5YW1sIjoidGl0bGU6IGNQYW5lbCBXZWIgU2hlbGwgVXBsb2FkIHZpYSBWdWxuZXJhYmxlIEVuZHBvaW50XG5pZDogc2N3LTIwMjYtMDUtMDQtYWktMVxuc3RhdHVzOiBleHBlcmltZW50YWxcbmxldmVsOiBjcml0aWNhbFxuZGVzY3JpcHRpb246IHxcbiAgRGV0ZWN0cyBhdHRlbXB0cyB0byBleHBsb2l0IGEgY3JpdGljYWwgY1BhbmVsIHZ1bG5lcmFiaWxpdHkgYnkgdXBsb2FkaW5nIGEgd2ViIHNoZWxsIHRocm91Z2ggYSBzcGVjaWZpYyB2dWxuZXJhYmxlIGVuZHBvaW50LiBUaGlzIHJ1bGUgdGFyZ2V0cyB0aGUgaW5pdGlhbCBhY2Nlc3MgdmVjdG9yIGRlc2NyaWJlZCBpbiB0aGUgY1BhbmVsIHZ1bG5lcmFiaWxpdHksIGFpbWluZyB0byBjYXRjaCB0aGUgZXhwbG9pdCBiZWZvcmUgaXQgbGVhZHMgdG8gYSBmdWxsIHN5c3RlbSB0YWtlb3Zlci5cbmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChBSS1nZW5lcmF0ZWQpXG5kYXRlOiAyMDI2LTA1LTA0XG5yZWZlcmVuY2VzOlxuICAtIGh0dHBzOi8vc2hpbWlzY3liZXJ3b3JsZC5jb20vX3Bvc3RzLzIwMjYtMDUtMDQtYS13ZWVrLWluLXNlY3VyaXR5LWFwcmlsLTI3LTgyMTEtbWF5LTMtcnd3MHJcbnRhZ3M6XG4gIC0gYXR0YWNrLmluaXRpYWxfYWNjZXNzXG4gIC0gYXR0YWNrLnQxMTkwXG5sb2dzb3VyY2U6XG4gICAgY2F0ZWdvcnk6IHdlYnNlcnZlclxuZGV0ZWN0aW9uOlxuICBzZWxlY3Rpb246XG4gICAgICBjcy11cml8Y29udGFpbnM6XG4gICAgICAgICAgLSAnL2NnaS1zeXMvY3BhbmVsX2xvZy5jZ2knXG4gICAgICBjcy1tZXRob2Q6XG4gICAgICAgICAgLSAnUE9TVCdcbiAgICAgIHNjLXN0YXR1czpcbiAgICAgICAgICAtICcyMDAnXG4gICAgICBjcy11cmktcXVlcnl8Y29udGFpbnM6XG4gICAgICAgICAgLSAndXBsb2FkPTEnXG4gIGNvbmRpdGlvbjogc2VsZWN0aW9uXG5mYWxzZXBvc2l0aXZlczpcbiAgLSBMZWdpdGltYXRlIGFkbWluaXN0cmF0aXZlIGFjdGl2aXR5In0seyJ0aXRsZSI6ImNQYW5lbCBVbmF1dGhvcml6ZWQgRmlsZSBXcml0ZSB2aWEgRXhwbG9pdCIsImxldmVsIjoiaGlnaCIsInRlY2huaXF1ZSI6IlQxMDgzIiwidGFjdGljIjoiRGlzY292ZXJ5IiwidGllciI6InBhaWQiLCJ5YW1sIjoidGl0bGU6IGNQYW5lbCBVbmF1dGhvcml6ZWQgRmlsZSBXcml0ZSB2aWEgRXhwbG9pdFxuaWQ6IHNjdy0yMDI2LTA1LTA0LWFpLTJcbnN0YXR1czogZXhwZXJpbWVudGFsXG5sZXZlbDogaGlnaFxuZGVzY3JpcHRpb246IHxcbiAgTW9uaXRvcnMgZm9yIHVuYXV0aG9yaXplZCBmaWxlIHdyaXRlIG9wZXJhdGlvbnMgd2l0aGluIHRoZSBjUGFuZWwgdXNlciBkaXJlY3Rvcnkgc3RydWN0dXJlLiBUaGlzIGNvdWxkIGluZGljYXRlIGFuIGF0dGFja2VyIGF0dGVtcHRpbmcgdG8gbW9kaWZ5IHVzZXIgYWNjb3VudHMgb3IgY29uZmlndXJhdGlvbiBmaWxlcyBhZnRlciBleHBsb2l0aW5nIHRoZSBjUGFuZWwgdnVsbmVyYWJpbGl0eSwgcG90ZW50aWFsbHkgZm9yIGxhdGVyYWwgbW92ZW1lbnQgb3IgcGVyc2lzdGVuY2UuXG5hdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNS0wNFxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTA0LWEtd2Vlay1pbi1zZWN1cml0eS1hcHJpbC0yNy04MjExLW1heS0zLXJ3dzByXG50YWdzOlxuICAtIGF0dGFjay5kaXNjb3ZlcnlcbiAgLSBhdHRhY2sudDEwODNcbmxvZ3NvdXJjZTpcbiAgICBjYXRlZ29yeTogZmlsZV9ldmVudFxuZGV0ZWN0aW9uOlxuICBzZWxlY3Rpb246XG4gICAgICBUYXJnZXRGaWxlbmFtZXxjb250YWluczpcbiAgICAgICAgICAtICcvdmFyL2NwYW5lbC91c2Vycy8nXG4gICAgICBFdmVudFR5cGU6XG4gICAgICAgICAgLSAnd3JpdGUnXG4gIGNvbmRpdGlvbjogc2VsZWN0aW9uXG5mYWxzZXBvc2l0aXZlczpcbiAgLSBMZWdpdGltYXRlIGFkbWluaXN0cmF0aXZlIGFjdGl2aXR5In0seyJ0aXRsZSI6IlN1c3BpY2lvdXMgY1BhbmVsIFByb2Nlc3MgRXhlY3V0aW9uIiwibGV2ZWwiOiJtZWRpdW0iLCJ0ZWNobmlxdWUiOiJUMTA1OSIsInRhY3RpYyI6IkV4ZWN1dGlvbiIsInRpZXIiOiJwYWlkIiwieWFtbCI6InRpdGxlOiBTdXNwaWNpb3VzIGNQYW5lbCBQcm9jZXNzIEV4ZWN1dGlvblxuaWQ6IHNjdy0yMDI2LTA1LTA0LWFpLTNcbnN0YXR1czogZXhwZXJpbWVudGFsXG5sZXZlbDogbWVkaXVtXG5kZXNjcmlwdGlvbjogfFxuICBEZXRlY3RzIHN1c3BpY2lvdXMgY29tbWFuZC1saW5lIGV4ZWN1dGlvbnMgb3JpZ2luYXRpbmcgZnJvbSBjUGFuZWwgcHJvY2Vzc2VzLiBUaGlzIHJ1bGUgbG9va3MgZm9yIHBhdHRlcm5zIGluZGljYXRpdmUgb2YgY29tbWFuZCBpbmplY3Rpb24gb3IgZXhlY3V0aW9uIG9mIGRvd25sb2FkZWQgcGF5bG9hZHMsIHdoaWNoIGNvdWxkIGJlIGEgY29uc2VxdWVuY2Ugb2YgYSBzdWNjZXNzZnVsIGNQYW5lbCB2dWxuZXJhYmlsaXR5IGV4cGxvaXQuXG5hdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNS0wNFxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTA0LWEtd2Vlay1pbi1zZWN1cml0eS1hcHJpbC0yNy04MjExLW1heS0zLXJ3dzByXG50YWdzOlxuICAtIGF0dGFjay5leGVjdXRpb25cbiAgLSBhdHRhY2sudDEwNTlcbmxvZ3NvdXJjZTpcbiAgICBjYXRlZ29yeTogcHJvY2Vzc19jcmVhdGlvblxuZGV0ZWN0aW9uOlxuICBzZWxlY3Rpb25fYmFzZTpcbiAgICAgIEltYWdlfGNvbnRhaW5zOlxuICAgICAgICAgIC0gJy91c3IvbG9jYWwvY3BhbmVsLydcbiAgc2VsZWN0aW9uX2luZGljYXRvcnM6XG4gICAgICBDb21tYW5kTGluZXxjb250YWluczpcbiAgICAgICAgICAtICdzaCAtYydcbiAgICAgICAgICAtICdiYXNoIC1jJ1xuICAgICAgICAgIC0gJ3dnZXQgaHR0cCdcbiAgICAgICAgICAtICdjdXJsIGh0dHAnXG4gICAgICBjb25kaXRpb246IHNlbGVjdGlvbl9iYXNlIEFORCBzZWxlY3Rpb25faW5kaWNhdG9yc1xuZmFsc2Vwb3NpdGl2ZXM6XG4gIC0gTGVnaXRpbWF0ZSBhZG1pbmlzdHJhdGl2ZSBhY3Rpdml0eSJ9XQ=="
why_it_matters:
  - "If your organization uses cPanel, you need to immediately verify that all instances are patched against actively exploited vulnerabilities. Audit your web server logs for any suspicious activity or unauthorized access. For any user-facing services, especially those involving financial transactions or sensitive data, enforce MFA and educate users on phishing and tech support scams."
bot_cta_title: "Track Critical Vulnerabilities"
bot_cta_description: "Use /brief to get an analyst-ready weekly threat summary with severity rankings and key IOCs."
---

A critical cPanel vulnerability is under active exploitation, exposing millions of websites to potential takeover, according to Malwarebytes Blog. This flaw presents a significant risk, allowing attackers to gain unauthorized control over web hosting environments. The widespread adoption of cPanel means a successful exploit can have a cascading effect, compromising numerous hosted sites.

Beyond the cPanel issue, Malwarebytes Blog also highlighted an increase in PayPal email hijacking for tech support scams and the theft of hundreds of thousands of Roblox accounts. These incidents underscore the persistent threat of social engineering and credential compromise, targeting both individuals and small businesses. Separately, a Chinese engineer was reportedly stealing US military and NASA software for years, pointing to long-term espionage campaigns.

For defenders, the cPanel bug is a priority. While the specific CVE wasn't detailed by Malwarebytes Blog, the active exploitation status demands immediate attention. Small businesses, often relying on cPanel for ease of management, are particularly vulnerable and must ensure their instances are patched and secured against known exploits. The diverse range of threats, from technical vulnerabilities to sophisticated scams and state-sponsored espionage, reinforces the need for layered security and continuous vigilance.
