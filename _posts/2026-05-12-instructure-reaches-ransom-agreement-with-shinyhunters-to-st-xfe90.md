---
title: "Instructure Reaches Ransom Agreement with ShinyHunters to Stop Canvas Leak"
date: 2026-05-12 07:37:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, ransomware, data-breach, microsoft]
excerpt: "American educational technology firm Instructure, parent company of Canvas, has reportedly reached an \"agreement\" with the cybercrime group ShinyHunters following a breach. The Hac"
summary: "American educational technology firm Instructure, parent company of Canvas, has reportedly reached an \"agreement\" with the cybercrime group ShinyHunters following a breach. The Hacker News reports that ShinyHunters threatened to leak 3.65TB of stolen data from thousands of schools and universities a"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 75
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-030.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-030.png"
source_url: "https://thehackernews.com/2026/05/instructure-reaches-ransom-agreement.html"
tlp: "TLP:CLEAR"
event_type: "ransomware"
organizations:
  - name: "Instructure"
    domain: "instructure.com"
    role: "victim"
  - name: "Canvas"
    domain: "instructure.com"
    role: "vendor"
threat_actors:
  - "ShinyHunters"
countries: [US]
malware_families:
  - "Leverage"
  - "STOP"
link_preview:
  url: "https://thehackernews.com/2026/05/instructure-reaches-ransom-agreement.html"
  title: "Instructure Reaches Ransom Agreement with ShinyHunters to Stop 3.65TB Canvas Leak"
  domain: "thehackernews.com"
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiq_FVhPeK2Y77CmHxc0azDelzWwpgSb4m8GZPLeJlsr2QvCZU5ChGQK37bJ_2XsGQRaNszalreV1iNyYDzeLt1I8iqafNTvFCPFQ0czKwX3Q6Q23TqdavunyJJsy6X8vxG_jSz__X5BnFZc4AIIqr-kd0XiNcYgx3UnYaahiViFKAywuQ98a7bbtCPnwgo/s1600/ransom-breach.jpg"
iocs:
  - id: "Instructure-Canvas-Breach-2026-05"
    type: "Information Disclosure"
    indicator: "Instructure Canvas platform"
  - id: "Instructure-Canvas-Breach-2026-05"
    type: "Data Breach"
    indicator: "3.65TB of stolen data"
  - id: "Instructure-Canvas-Breach-2026-05"
    type: "Extortion"
    indicator: "ShinyHunters cybercrime group"
mitre_attack:
  - id: "T1048"
    name: "Exfiltration Over Alternative Protocol"
    tactic: "Exfiltration"
    url: "https://attack.mitre.org/techniques/T1048/"
  - id: "T1537"
    name: "Transfer Data to Cloud Account"
    tactic: "Exfiltration"
    url: "https://attack.mitre.org/techniques/T1537/"
  - id: "T1078.004"
    name: "Cloud Accounts"
    tactic: "Persistence"
    url: "https://attack.mitre.org/techniques/T1078/004/"
sigma_rules:
  count: 3
  free_count: 1
  paid_count: 2
  preview_title: "Instructure Data Exfiltration via ShinyHunters Threat"
  preview_level: "critical"
  preview_technique: "T1041"
  preview_tactic: "Exfiltration"
  preview_yaml_b64: "dGl0bGU6IEluc3RydWN0dXJlIERhdGEgRXhmaWx0cmF0aW9uIHZpYSBTaGlueUh1bnRlcnMgVGhyZWF0CmlkOiBzY3ctMjAyNi0wNS0xMi1haS0xCnN0YXR1czogZXhwZXJpbWVudGFsCmxldmVsOiBjcml0aWNhbApkZXNjcmlwdGlvbjogfAogIFRoaXMgcnVsZSBkZXRlY3RzIHRoZSB1c2Ugb2YgUG93ZXJTaGVsbCB0byBkb3dubG9hZCBhbmQgZXhlY3V0ZSBzY3JpcHRzLCBhIGNvbW1vbiB0YWN0aWMgZm9yIGRhdGEgZXhmaWx0cmF0aW9uLiBJbiB0aGUgY29udGV4dCBvZiB0aGUgSW5zdHJ1Y3R1cmUvU2hpbnlIdW50ZXJzIGluY2lkZW50LCB0aGlzIGNvdWxkIHJlcHJlc2VudCB0aGUgZXhmaWx0cmF0aW9uIG9mIHRoZSAzLjY1VEIgb2Ygc3RvbGVuIGRhdGEuCmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChBSS1nZW5lcmF0ZWQpCmRhdGU6IDIwMjYtMDUtMTIKcmVmZXJlbmNlczoKICAtIGh0dHBzOi8vc2hpbWlzY3liZXJ3b3JsZC5jb20vX3Bvc3RzLzIwMjYtMDUtMTItaW5zdHJ1Y3R1cmUtcmVhY2hlcy1yYW5zb20tYWdyZWVtZW50LXdpdGgtc2hpbnlodW50ZXJzLXRvLXN0LXhmZTkwCnRhZ3M6CiAgLSBhdHRhY2suZXhmaWx0cmF0aW9uCiAgLSBhdHRhY2sudDEwNDEKbG9nc291cmNlOgogICAgY2F0ZWdvcnk6IHByb2Nlc3NfY3JlYXRpb24KZGV0ZWN0aW9uOgogIHNlbGVjdGlvbjoKICAgICAgSW1hZ2V8ZW5kc3dpdGg6CiAgICAgICAgICAtICdwb3dlcnNoZWxsLmV4ZScKICAgICAgQ29tbWFuZExpbmV8Y29udGFpbnM6CiAgICAgICAgICAtICdpZXggKE5ldy1PYmplY3QgTmV0LldlYkNsaWVudCkuRG93bmxvYWRTdHJpbmcnCiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uCmZhbHNlcG9zaXRpdmVzOgogIC0gTGVnaXRpbWF0ZSBhZG1pbmlzdHJhdGl2ZSBhY3Rpdml0eQ=="
  all_rules_b64: "W3sidGl0bGUiOiJJbnN0cnVjdHVyZSBEYXRhIEV4ZmlsdHJhdGlvbiB2aWEgU2hpbnlIdW50ZXJzIFRocmVhdCIsImxldmVsIjoiY3JpdGljYWwiLCJ0ZWNobmlxdWUiOiJUMTA0MSIsInRhY3RpYyI6IkV4ZmlsdHJhdGlvbiIsInRpZXIiOiJmcmVlIiwieWFtbCI6InRpdGxlOiBJbnN0cnVjdHVyZSBEYXRhIEV4ZmlsdHJhdGlvbiB2aWEgU2hpbnlIdW50ZXJzIFRocmVhdFxuaWQ6IHNjdy0yMDI2LTA1LTEyLWFpLTFcbnN0YXR1czogZXhwZXJpbWVudGFsXG5sZXZlbDogY3JpdGljYWxcbmRlc2NyaXB0aW9uOiB8XG4gIFRoaXMgcnVsZSBkZXRlY3RzIHRoZSB1c2Ugb2YgUG93ZXJTaGVsbCB0byBkb3dubG9hZCBhbmQgZXhlY3V0ZSBzY3JpcHRzLCBhIGNvbW1vbiB0YWN0aWMgZm9yIGRhdGEgZXhmaWx0cmF0aW9uLiBJbiB0aGUgY29udGV4dCBvZiB0aGUgSW5zdHJ1Y3R1cmUvU2hpbnlIdW50ZXJzIGluY2lkZW50LCB0aGlzIGNvdWxkIHJlcHJlc2VudCB0aGUgZXhmaWx0cmF0aW9uIG9mIHRoZSAzLjY1VEIgb2Ygc3RvbGVuIGRhdGEuXG5hdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNS0xMlxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTEyLWluc3RydWN0dXJlLXJlYWNoZXMtcmFuc29tLWFncmVlbWVudC13aXRoLXNoaW55aHVudGVycy10by1zdC14ZmU5MFxudGFnczpcbiAgLSBhdHRhY2suZXhmaWx0cmF0aW9uXG4gIC0gYXR0YWNrLnQxMDQxXG5sb2dzb3VyY2U6XG4gICAgY2F0ZWdvcnk6IHByb2Nlc3NfY3JlYXRpb25cbmRldGVjdGlvbjpcbiAgc2VsZWN0aW9uOlxuICAgICAgSW1hZ2V8ZW5kc3dpdGg6XG4gICAgICAgICAgLSAncG93ZXJzaGVsbC5leGUnXG4gICAgICBDb21tYW5kTGluZXxjb250YWluczpcbiAgICAgICAgICAtICdpZXggKE5ldy1PYmplY3QgTmV0LldlYkNsaWVudCkuRG93bmxvYWRTdHJpbmcnXG4gICAgICBjb25kaXRpb246IHNlbGVjdGlvblxuZmFsc2Vwb3NpdGl2ZXM6XG4gIC0gTGVnaXRpbWF0ZSBhZG1pbmlzdHJhdGl2ZSBhY3Rpdml0eSJ9LHsidGl0bGUiOiJJbnN0cnVjdHVyZSBVbnVzdWFsIE5ldHdvcmsgVHJhZmZpYyAtIExhcmdlIERhdGEgVHJhbnNmZXIiLCJsZXZlbCI6ImhpZ2giLCJ0ZWNobmlxdWUiOiJUMTA0OCIsInRhY3RpYyI6IkV4ZmlsdHJhdGlvbiIsInRpZXIiOiJwYWlkIiwieWFtbCI6InRpdGxlOiBJbnN0cnVjdHVyZSBVbnVzdWFsIE5ldHdvcmsgVHJhZmZpYyAtIExhcmdlIERhdGEgVHJhbnNmZXJcbmlkOiBzY3ctMjAyNi0wNS0xMi1haS0yXG5zdGF0dXM6IGV4cGVyaW1lbnRhbFxubGV2ZWw6IGhpZ2hcbmRlc2NyaXB0aW9uOiB8XG4gIFRoaXMgcnVsZSBkZXRlY3RzIHBvdGVudGlhbCBsYXJnZSBkYXRhIHRyYW5zZmVycyB0byBleHRlcm5hbCBzZXJ2ZXJzLCBpbmRpY2F0ZWQgYnkgSFRUUCBzdGF0dXMgY29kZXMgaW4gdGhlIDJ4eCByYW5nZSBhbmQgJ3VwbG9hZCcgaW4gdGhlIFVSSSBxdWVyeS4gVGhpcyBjb3VsZCBiZSBpbmRpY2F0aXZlIG9mIHRoZSBleGZpbHRyYXRpb24gb2YgdGhlIDMuNjVUQiBvZiBkYXRhIHN0b2xlbiBmcm9tIEluc3RydWN0dXJlLlxuYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKEFJLWdlbmVyYXRlZClcbmRhdGU6IDIwMjYtMDUtMTJcbnJlZmVyZW5jZXM6XG4gIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNS0xMi1pbnN0cnVjdHVyZS1yZWFjaGVzLXJhbnNvbS1hZ3JlZW1lbnQtd2l0aC1zaGlueWh1bnRlcnMtdG8tc3QteGZlOTBcbnRhZ3M6XG4gIC0gYXR0YWNrLmV4ZmlsdHJhdGlvblxuICAtIGF0dGFjay50MTA0OFxubG9nc291cmNlOlxuICAgIGNhdGVnb3J5OiBwcm94eVxuZGV0ZWN0aW9uOlxuICBzZWxlY3Rpb25fYmFzZTpcbiAgICAgIHNjLXN0YXR1c3xzdGFydHN3aXRoOlxuICAgICAgICAgIC0gJzInXG4gIHNlbGVjdGlvbl9pbmRpY2F0b3JzOlxuICAgICAgZHN0X3BvcnQ6XG4gICAgICAgICAgLSAnODAnXG4gICAgICAgICAgLSAnNDQzJ1xuICAgICAgY3MtdXJpLXF1ZXJ5fGNvbnRhaW5zOlxuICAgICAgICAgIC0gJ3VwbG9hZCdcbiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uX2Jhc2UgQU5EIHNlbGVjdGlvbl9pbmRpY2F0b3JzXG5mYWxzZXBvc2l0aXZlczpcbiAgLSBMZWdpdGltYXRlIGFkbWluaXN0cmF0aXZlIGFjdGl2aXR5In0seyJ0aXRsZSI6Ikluc3RydWN0dXJlIFN1c3BpY2lvdXMgUHJvY2VzcyBFeGVjdXRpb24gLSBEYXRhIFN0YWdpbmciLCJsZXZlbCI6Im1lZGl1bSIsInRlY2huaXF1ZSI6IlQxMDc0IiwidGFjdGljIjoiQ29sbGVjdGlvbiIsInRpZXIiOiJwYWlkIiwieWFtbCI6InRpdGxlOiBJbnN0cnVjdHVyZSBTdXNwaWNpb3VzIFByb2Nlc3MgRXhlY3V0aW9uIC0gRGF0YSBTdGFnaW5nXG5pZDogc2N3LTIwMjYtMDUtMTItYWktM1xuc3RhdHVzOiBleHBlcmltZW50YWxcbmxldmVsOiBtZWRpdW1cbmRlc2NyaXB0aW9uOiB8XG4gIFRoaXMgcnVsZSBkZXRlY3RzIHRoZSB1c2Ugb2YgJ2RpciAvcyAvYicgd2l0aGluIGEgY29tbWFuZCBwcm9tcHQsIHdoaWNoIGlzIG9mdGVuIHVzZWQgdG8gc3RhZ2UgZmlsZXMgZm9yIGV4ZmlsdHJhdGlvbi4gVGhpcyBiZWhhdmlvciBjb3VsZCBiZSBvYnNlcnZlZCBkdXJpbmcgdGhlIGNvbGxlY3Rpb24gcGhhc2Ugb2YgdGhlIGF0dGFjayB0aGF0IGxlZCB0byB0aGUgSW5zdHJ1Y3R1cmUgZGF0YSBicmVhY2guXG5hdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNS0xMlxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTEyLWluc3RydWN0dXJlLXJlYWNoZXMtcmFuc29tLWFncmVlbWVudC13aXRoLXNoaW55aHVudGVycy10by1zdC14ZmU5MFxudGFnczpcbiAgLSBhdHRhY2suY29sbGVjdGlvblxuICAtIGF0dGFjay50MTA3NFxubG9nc291cmNlOlxuICAgIGNhdGVnb3J5OiBwcm9jZXNzX2NyZWF0aW9uXG5kZXRlY3Rpb246XG4gIHNlbGVjdGlvbjpcbiAgICAgIEltYWdlfGNvbnRhaW5zOlxuICAgICAgICAgIC0gJ2NtZC5leGUnXG4gICAgICBDb21tYW5kTGluZXxjb250YWluczpcbiAgICAgICAgICAtICcvYyBkaXIgL3MgL2InXG4gICAgICBjb25kaXRpb246IHNlbGVjdGlvblxuZmFsc2Vwb3NpdGl2ZXM6XG4gIC0gTGVnaXRpbWF0ZSBhZG1pbmlzdHJhdGl2ZSBhY3Rpdml0eSJ9XQ=="
why_it_matters:
  - "If your organization uses Canvas or any Instructure product, you need to assume your data was part of this exfiltration. Demand full transparency from Instructure on the scope of the breach and specific data types affected. Immediately review your data retention policies for any information stored on their platforms. Prepare for potential compliance investigations and communicate proactively with your stakeholders."
bot_cta_title: "Check Instructure Breach Impact"
bot_cta_description: "Use /org instructure.com to check for related breach intelligence and threat actor activity."
---

American educational technology firm Instructure, parent company of Canvas, has reportedly reached an "agreement" with the cybercrime group ShinyHunters following a breach. The Hacker News reports that ShinyHunters threatened to leak 3.65TB of stolen data from thousands of schools and universities after compromising Instructure's network. This incident highlights the increasing pressure on organizations to pay ransoms when faced with data exfiltration and public exposure threats.

Instructure confirmed the "agreement" with the "unauthorized actor" but did not disclose details of the arrangement or confirm if a ransom was paid. The scale of the threatened data leak — impacting thousands of educational institutions — underscores the catastrophic potential for student and faculty data exposure. This incident serves as a stark reminder of the critical importance of robust data protection and incident response strategies, especially for entities holding sensitive personal information.

Attackers like ShinyHunters are not just after encryption; they're after leverage. The attacker's calculus here is clear: hit a target with high-value, sensitive data, exfiltrate it, and then extort. They know the reputational damage and regulatory fines associated with a massive educational data leak often outweigh the cost of a ransom payment. This strategy is highly effective and will continue as long as organizations remain vulnerable to exfiltration.
