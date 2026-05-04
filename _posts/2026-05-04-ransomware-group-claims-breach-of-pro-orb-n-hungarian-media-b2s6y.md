---
title: "Ransomware Group Claims Breach of Hungarian Media Firm Mediaworks"
date: 2026-05-04 15:23:00 +0000
source: RSS
source_name: "The Record by Recorded Future"
channel: "The Record by Recorded Future"
tags: [threat-intel, data-breach, government, malware, ransomware]
excerpt: "A ransomware group has claimed a breach against Mediaworks, a prominent pro-Orbán Hungarian media firm. The Record by Recorded Future reports that Mediaworks confirmed the incident"
summary: "A ransomware group has claimed a breach against Mediaworks, a prominent pro-Orbán Hungarian media firm. The Record by Recorded Future reports that Mediaworks confirmed the incident, acknowledging that a \"significant amount of illegally obtained data may have come into the possession of unauthorized"
layout: post
section: live-feed
score: MEDIUM
curated: false
featured: false
priority: 75
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-019.png"
author: research
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-019.png"
source_url: "https://therecord.media/ransomware-group-claims-breach-of-pro-orban-media-firm"
tlp: "TLP:CLEAR"
event_type: "ransomware"
organizations:
  - name: "Mediaworks"
    domain: "mediaworks.hu"
    role: "victim"
  - name: "The Record by Recorded Future"
    domain: "therecord.media"
    role: "vendor"
countries: [HU]
malware_families:
  - "Leverage"
link_preview:
  url: "https://therecord.media/ransomware-group-claims-breach-of-pro-orban-media-firm"
  title: "Ransomware group claims breach of pro-Orbán Hungarian media firm"
  domain: "therecord.media"
  image: "https://cms.therecord.media/uploads/orban_8bd6acb1a9.jpg"
sigma_rules:
  count: 2
  free_count: 1
  paid_count: 1
  preview_title: "Ransomware Indicators — Mediaworks Supply Chain"
  preview_level: "critical"
  preview_technique: "ransomware"
  preview_tactic: "event-type"
  preview_yaml_b64: "dGl0bGU6IFJhbnNvbXdhcmUgSW5kaWNhdG9ycyDigJQgTWVkaWF3b3JrcyBTdXBwbHkgQ2hhaW4KaWQ6IHNjdy0yMDI2LTA1LTA0LWV2dC0xCnN0YXR1czogZXhwZXJpbWVudGFsCmxldmVsOiBjcml0aWNhbApkZXNjcmlwdGlvbjogfAogIEZvbGxvd2luZyB0aGUgTWVkaWF3b3JrcyByYW5zb213YXJlIGF0dGFjaywgbW9uaXRvciBmb3IgcmFuc29td2FyZSBwcmVjdXJzb3IgYWN0aXZpdGllczogc2hhZG93IGNvcHkgZGVsZXRpb24sIHJlY292ZXJ5IGRpc2FibGluZywgYW5kIHNlY3VyZSBmaWxlIHdpcGluZy4KYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKGF1dG8tZ2VuZXJhdGVkKQpkYXRlOiAyMDI2LTA1LTA0CnJlZmVyZW5jZXM6CiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTA0LXJhbnNvbXdhcmUtZ3JvdXAtY2xhaW1zLWJyZWFjaC1vZi1wcm8tb3JiLW4taHVuZ2FyaWFuLW1lZGlhLWIyczZ5CnRhZ3M6CiAgLSBhdHRhY2suZ2VuZXJhbAogIC0gYXR0YWNrLnJhbnNvbXdhcmUKbG9nc291cmNlOgogICAgY2F0ZWdvcnk6IHByb2Nlc3NfY3JlYXRpb24KICAgIHByb2R1Y3Q6IHdpbmRvd3MKZGV0ZWN0aW9uOgogIHNlbGVjdGlvbjoKICAgICAgQ29tbWFuZExpbmV8Y29udGFpbnM6CiAgICAgICAgLSAndnNzYWRtaW4gZGVsZXRlJwogICAgICAgIC0gJ3dtaWMgc2hhZG93Y29weScKICAgICAgICAtICdiY2RlZGl0LipyZWNvdmVyeWVuYWJsZWQuKm5vJwogICAgICAgIC0gJ2NpcGhlciAvdycKICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb24KZmFsc2Vwb3NpdGl2ZXM6CiAgLSBMZWdpdGltYXRlIGFjdGl2aXR5IGZyb20gTWVkaWF3b3Jrcw=="
  all_rules_b64: "W3sidGl0bGUiOiJSYW5zb213YXJlIEluZGljYXRvcnMg4oCUIE1lZGlhd29ya3MgU3VwcGx5IENoYWluIiwibGV2ZWwiOiJjcml0aWNhbCIsInRlY2huaXF1ZSI6InJhbnNvbXdhcmUiLCJ0YWN0aWMiOiJldmVudC10eXBlIiwidGllciI6ImZyZWUiLCJ5YW1sIjoidGl0bGU6IFJhbnNvbXdhcmUgSW5kaWNhdG9ycyDigJQgTWVkaWF3b3JrcyBTdXBwbHkgQ2hhaW5cbmlkOiBzY3ctMjAyNi0wNS0wNC1ldnQtMVxuc3RhdHVzOiBleHBlcmltZW50YWxcbmxldmVsOiBjcml0aWNhbFxuZGVzY3JpcHRpb246IHxcbiAgRm9sbG93aW5nIHRoZSBNZWRpYXdvcmtzIHJhbnNvbXdhcmUgYXR0YWNrLCBtb25pdG9yIGZvciByYW5zb213YXJlIHByZWN1cnNvciBhY3Rpdml0aWVzOiBzaGFkb3cgY29weSBkZWxldGlvbiwgcmVjb3ZlcnkgZGlzYWJsaW5nLCBhbmQgc2VjdXJlIGZpbGUgd2lwaW5nLlxuYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKGF1dG8tZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNS0wNFxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTA0LXJhbnNvbXdhcmUtZ3JvdXAtY2xhaW1zLWJyZWFjaC1vZi1wcm8tb3JiLW4taHVuZ2FyaWFuLW1lZGlhLWIyczZ5XG50YWdzOlxuICAtIGF0dGFjay5nZW5lcmFsXG4gIC0gYXR0YWNrLnJhbnNvbXdhcmVcbmxvZ3NvdXJjZTpcbiAgICBjYXRlZ29yeTogcHJvY2Vzc19jcmVhdGlvblxuICAgIHByb2R1Y3Q6IHdpbmRvd3NcbmRldGVjdGlvbjpcbiAgc2VsZWN0aW9uOlxuICAgICAgQ29tbWFuZExpbmV8Y29udGFpbnM6XG4gICAgICAgIC0gJ3Zzc2FkbWluIGRlbGV0ZSdcbiAgICAgICAgLSAnd21pYyBzaGFkb3djb3B5J1xuICAgICAgICAtICdiY2RlZGl0LipyZWNvdmVyeWVuYWJsZWQuKm5vJ1xuICAgICAgICAtICdjaXBoZXIgL3cnXG4gICAgICBjb25kaXRpb246IHNlbGVjdGlvblxuZmFsc2Vwb3NpdGl2ZXM6XG4gIC0gTGVnaXRpbWF0ZSBhY3Rpdml0eSBmcm9tIE1lZGlhd29ya3MifSx7InRpdGxlIjoiTmV0d29yayBTaGFyZSBFbnVtZXJhdGlvbiDigJQgTGF0ZXJhbCBNb3ZlbWVudCBSaXNrIiwibGV2ZWwiOiJoaWdoIiwidGVjaG5pcXVlIjoicmFuc29td2FyZSIsInRhY3RpYyI6ImV2ZW50LXR5cGUiLCJ0aWVyIjoicGFpZCIsInlhbWwiOiJ0aXRsZTogTmV0d29yayBTaGFyZSBFbnVtZXJhdGlvbiDigJQgTGF0ZXJhbCBNb3ZlbWVudCBSaXNrXG5pZDogc2N3LTIwMjYtMDUtMDQtZXZ0LTJcbnN0YXR1czogZXhwZXJpbWVudGFsXG5sZXZlbDogaGlnaFxuZGVzY3JpcHRpb246IHxcbiAgRGV0ZWN0cyBuZXR3b3JrIHNoYXJlIGVudW1lcmF0aW9uIHR5cGljYWxseSBwZXJmb3JtZWQgYmVmb3JlIHJhbnNvbXdhcmUgcHJvcGFnYXRpb24gYWNyb3NzIHRoZSBuZXR3b3JrLlxuYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKGF1dG8tZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNS0wNFxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTA0LXJhbnNvbXdhcmUtZ3JvdXAtY2xhaW1zLWJyZWFjaC1vZi1wcm8tb3JiLW4taHVuZ2FyaWFuLW1lZGlhLWIyczZ5XG50YWdzOlxuICAtIGF0dGFjay5nZW5lcmFsXG4gIC0gYXR0YWNrLnJhbnNvbXdhcmVcbmxvZ3NvdXJjZTpcbiAgICBjYXRlZ29yeTogcHJvY2Vzc19jcmVhdGlvblxuICAgIHByb2R1Y3Q6IHdpbmRvd3NcbmRldGVjdGlvbjpcbiAgc2VsZWN0aW9uOlxuICAgICAgQ29tbWFuZExpbmV8Y29udGFpbnM6XG4gICAgICAgIC0gJ25ldCB2aWV3J1xuICAgICAgICAtICduZXQgc2hhcmUnXG4gICAgICAgIC0gJ0dldC1TbWJTaGFyZSdcbiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uXG5mYWxzZXBvc2l0aXZlczpcbiAgLSBMZWdpdGltYXRlIGFjdGl2aXR5IGZyb20gTWVkaWF3b3JrcyJ9XQ=="
why_it_matters:
  - "If your organization is a media outlet, holds politically sensitive data, or has any public profile, you are a target. This isn't theoretical. Immediately review your data classification, access controls, and incident response plans for data exfiltration. Assume external threat actors are actively probing your perimeter, looking for any weakness to exploit for both financial and strategic gain."
bot_cta_title: "Track Latest Breaches and Ransomware Events"
bot_cta_description: "Use /breach to get the latest intelligence on confirmed breaches and ransomware attacks worldwide."
---

A ransomware group has claimed a breach against Mediaworks, a prominent pro-Orbán Hungarian media firm. The Record by Recorded Future reports that Mediaworks confirmed the incident, acknowledging that a "significant amount of illegally obtained data may have come into the possession of unauthorized persons." This isn't just a data leak; it's a direct shot at a politically sensitive target, underscoring the escalating convergence of cybercrime and geopolitical agendas.

Attackers targeting media organizations often seek more than just financial gain. The exfiltration of data from a politically aligned media outlet suggests potential for information warfare, propaganda, or extortion beyond typical ransomware demands. Defenders need to recognize that media firms are critical infrastructure for information dissemination, making them high-value targets for groups looking to sow discord or influence public perception.

This incident highlights a critical vulnerability for any organization holding sensitive information, especially those with public-facing roles or political affiliations. The attacker's calculus here is clear: hit a high-profile target, maximize disruption, and potentially leverage the stolen data for broader influence. CISOs must assume their organizations are in the crosshairs, regardless of industry, if they possess data that can be weaponized.
