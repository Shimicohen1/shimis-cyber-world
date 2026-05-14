---
title: "Stealer Backdoor Found in 3 Node-IPC Versions Targeting Developer Secrets"
date: 2026-05-14 17:22:43 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, malware]
excerpt: "Cybersecurity researchers are sounding the alarm about \"malicious activity\" found in newly published versions of `node-ipc`. According to The Hacker News, citing Socket and StepSec"
summary: "Cybersecurity researchers are sounding the alarm about \"malicious activity\" found in newly published versions of `node-ipc`. According to The Hacker News, citing Socket and StepSecurity, three specific versions of the npm package have been confirmed as malicious: `node-ipc@9.1.6`, `node-ipc@9.2.3`,"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-002.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-002.png"
source_url: "https://thehackernews.com/2026/05/stealer-backdoor-found-in-3-node-ipc.html"
tlp: "TLP:CLEAR"
event_type: "supply-chain"
organizations:
  - name: "Socket"
    domain: "socket.dev"
    role: "research"
  - name: "StepSecurity"
    domain: "stepsecurity.io"
    role: "research"
link_preview:
  url: "https://thehackernews.com/2026/05/stealer-backdoor-found-in-3-node-ipc.html"
  title: "Stealer Backdoor Found in 3 Node-IPC Versions Targeting Developer Secrets"
  domain: "thehackernews.com"
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhTj2m9-HHmDEDzKIsalsJ_HJcwcUsIFajvcpTLP9QMyqS9F_JroTH7lXeOGZFuO6j6F-RzbIo1kBIQ0udSFQGzjN2hxO8ZfyFeHM5557BPI1sjiJ7cEMJJE62t11e07Wt1CsmAntpLHSM0XbnQDvVYNBfNdAOsob9kN6G6-mQjKX68fEE1nzy_Bn4TvxyK/s1600/node.jpg"
iocs:
  - id: "node-ipc-backdoor"
    type: "Backdoor"
    indicator: "npm package: node-ipc@9.1.6"
  - id: "node-ipc-backdoor"
    type: "Backdoor"
    indicator: "npm package: node-ipc@9.2.3"
  - id: "node-ipc-backdoor"
    type: "Backdoor"
    indicator: "npm package: node-ipc@12.0.1"
  - id: "node-ipc-backdoor"
    type: "Information Disclosure"
    indicator: "Stealer Backdoor targeting developer secrets"
mitre_attack:
  - id: "T1195.002"
    name: "Compromise Software Supply Chain"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1195/002/"
  - id: "T1071.001"
    name: "Web Protocols"
    tactic: "Command and Control"
    url: "https://attack.mitre.org/techniques/T1071/001/"
  - id: "T1041"
    name: "Exfiltration Over C2 Channel"
    tactic: "Exfiltration"
    url: "https://attack.mitre.org/techniques/T1041/"
sigma_rules:
  count: 3
  free_count: 1
  paid_count: 2
  preview_title: "Suspicious node-ipc Package Installation - Supply Chain Compromise"
  preview_level: "critical"
  preview_technique: "T1071.001"
  preview_tactic: "Execution"
  preview_yaml_b64: "dGl0bGU6IFN1c3BpY2lvdXMgbm9kZS1pcGMgUGFja2FnZSBJbnN0YWxsYXRpb24gLSBTdXBwbHkgQ2hhaW4gQ29tcHJvbWlzZQppZDogc2N3LTIwMjYtMDUtMTQtYWktMQpzdGF0dXM6IGV4cGVyaW1lbnRhbApsZXZlbDogY3JpdGljYWwKZGVzY3JpcHRpb246IHwKICBEZXRlY3RzIHRoZSBpbnN0YWxsYXRpb24gb2Yga25vd24gbWFsaWNpb3VzIHZlcnNpb25zIG9mIHRoZSBub2RlLWlwYyBwYWNrYWdlICg5LjEuNiwgOS4yLjMsIDEyLjAuMSkgdmlhIG5wbS4gVGhpcyBpbmRpY2F0ZXMgYSBkaXJlY3Qgc3VwcGx5IGNoYWluIGNvbXByb21pc2UgdGFyZ2V0aW5nIGRldmVsb3BlciBzZWNyZXRzLgphdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKQpkYXRlOiAyMDI2LTA1LTE0CnJlZmVyZW5jZXM6CiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTE0LXN0ZWFsZXItYmFja2Rvb3ItZm91bmQtaW4tMy1ub2RlLWlwYy12ZXJzaW9ucy10YXJnZXRpbmctZGV2ZS1oODJzNwp0YWdzOgogIC0gYXR0YWNrLmV4ZWN1dGlvbgogIC0gYXR0YWNrLnQxMDcxLjAwMQpsb2dzb3VyY2U6CiAgICBjYXRlZ29yeTogcHJvY2Vzc19jcmVhdGlvbgpkZXRlY3Rpb246CiAgc2VsZWN0aW9uOgogICAgICBJbWFnZXxlbmRzd2l0aDoKICAgICAgICAgIC0gJ25wbS5leGUnCiAgICAgICAgICAtICducG0nCiAgICAgIENvbW1hbmRMaW5lfGNvbnRhaW5zOgogICAgICAgICAgLSAnaW5zdGFsbCBub2RlLWlwY0A5LjEuNicKICAgICAgICAgIC0gJ2luc3RhbGwgbm9kZS1pcGNAOS4yLjMnCiAgICAgICAgICAtICdpbnN0YWxsIG5vZGUtaXBjQDEyLjAuMScKICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb24KZmFsc2Vwb3NpdGl2ZXM6CiAgLSBMZWdpdGltYXRlIGFkbWluaXN0cmF0aXZlIGFjdGl2aXR5"
  all_rules_b64: "W3sidGl0bGUiOiJTdXNwaWNpb3VzIG5vZGUtaXBjIFBhY2thZ2UgSW5zdGFsbGF0aW9uIC0gU3VwcGx5IENoYWluIENvbXByb21pc2UiLCJsZXZlbCI6ImNyaXRpY2FsIiwidGVjaG5pcXVlIjoiVDEwNzEuMDAxIiwidGFjdGljIjoiRXhlY3V0aW9uIiwidGllciI6ImZyZWUiLCJ5YW1sIjoidGl0bGU6IFN1c3BpY2lvdXMgbm9kZS1pcGMgUGFja2FnZSBJbnN0YWxsYXRpb24gLSBTdXBwbHkgQ2hhaW4gQ29tcHJvbWlzZVxuaWQ6IHNjdy0yMDI2LTA1LTE0LWFpLTFcbnN0YXR1czogZXhwZXJpbWVudGFsXG5sZXZlbDogY3JpdGljYWxcbmRlc2NyaXB0aW9uOiB8XG4gIERldGVjdHMgdGhlIGluc3RhbGxhdGlvbiBvZiBrbm93biBtYWxpY2lvdXMgdmVyc2lvbnMgb2YgdGhlIG5vZGUtaXBjIHBhY2thZ2UgKDkuMS42LCA5LjIuMywgMTIuMC4xKSB2aWEgbnBtLiBUaGlzIGluZGljYXRlcyBhIGRpcmVjdCBzdXBwbHkgY2hhaW4gY29tcHJvbWlzZSB0YXJnZXRpbmcgZGV2ZWxvcGVyIHNlY3JldHMuXG5hdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNS0xNFxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTE0LXN0ZWFsZXItYmFja2Rvb3ItZm91bmQtaW4tMy1ub2RlLWlwYy12ZXJzaW9ucy10YXJnZXRpbmctZGV2ZS1oODJzN1xudGFnczpcbiAgLSBhdHRhY2suZXhlY3V0aW9uXG4gIC0gYXR0YWNrLnQxMDcxLjAwMVxubG9nc291cmNlOlxuICAgIGNhdGVnb3J5OiBwcm9jZXNzX2NyZWF0aW9uXG5kZXRlY3Rpb246XG4gIHNlbGVjdGlvbjpcbiAgICAgIEltYWdlfGVuZHN3aXRoOlxuICAgICAgICAgIC0gJ25wbS5leGUnXG4gICAgICAgICAgLSAnbnBtJ1xuICAgICAgQ29tbWFuZExpbmV8Y29udGFpbnM6XG4gICAgICAgICAgLSAnaW5zdGFsbCBub2RlLWlwY0A5LjEuNidcbiAgICAgICAgICAtICdpbnN0YWxsIG5vZGUtaXBjQDkuMi4zJ1xuICAgICAgICAgIC0gJ2luc3RhbGwgbm9kZS1pcGNAMTIuMC4xJ1xuICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb25cbmZhbHNlcG9zaXRpdmVzOlxuICAtIExlZ2l0aW1hdGUgYWRtaW5pc3RyYXRpdmUgYWN0aXZpdHkifSx7InRpdGxlIjoibm9kZS1pcGMgTWFsaWNpb3VzIEFjdGl2aXR5IC0gUG90ZW50aWFsIERhdGEgRXhmaWx0cmF0aW9uIiwibGV2ZWwiOiJoaWdoIiwidGVjaG5pcXVlIjoiVDEwNDEiLCJ0YWN0aWMiOiJFeGZpbHRyYXRpb24iLCJ0aWVyIjoicGFpZCIsInlhbWwiOiJ0aXRsZTogbm9kZS1pcGMgTWFsaWNpb3VzIEFjdGl2aXR5IC0gUG90ZW50aWFsIERhdGEgRXhmaWx0cmF0aW9uXG5pZDogc2N3LTIwMjYtMDUtMTQtYWktMlxuc3RhdHVzOiBleHBlcmltZW50YWxcbmxldmVsOiBoaWdoXG5kZXNjcmlwdGlvbjogfFxuICBEZXRlY3RzIHN1c3BpY2lvdXMgJ25vZGUnIHByb2Nlc3NlcyB0aGF0IGFyZSBsaWtlbHkgcGFydCBvZiB0aGUgY29tcHJvbWlzZWQgbm9kZS1pcGMgcGFja2FnZSwgZXNwZWNpYWxseSB3aGVuIHNwYXduZWQgYnkgbnBtLiBUaGlzIGNvdWxkIGluZGljYXRlIHRoZSBleGVjdXRpb24gb2YgdGhlIHN0ZWFsZXIgYmFja2Rvb3IgYXR0ZW1wdGluZyB0byBleGZpbHRyYXRlIGRhdGEuXG5hdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNS0xNFxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTE0LXN0ZWFsZXItYmFja2Rvb3ItZm91bmQtaW4tMy1ub2RlLWlwYy12ZXJzaW9ucy10YXJnZXRpbmctZGV2ZS1oODJzN1xudGFnczpcbiAgLSBhdHRhY2suZXhmaWx0cmF0aW9uXG4gIC0gYXR0YWNrLnQxMDQxXG5sb2dzb3VyY2U6XG4gICAgY2F0ZWdvcnk6IHByb2Nlc3NfY3JlYXRpb25cbmRldGVjdGlvbjpcbiAgc2VsZWN0aW9uOlxuICAgICAgSW1hZ2V8Y29udGFpbnM6XG4gICAgICAgICAgLSAnbm9kZSdcbiAgICAgIENvbW1hbmRMaW5lfGNvbnRhaW5zOlxuICAgICAgICAgIC0gJ2lwYydcbiAgICAgIFBhcmVudEltYWdlfGNvbnRhaW5zOlxuICAgICAgICAgIC0gJ25wbS5leGUnXG4gICAgICAgICAgLSAnbnBtJ1xuICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb25cbmZhbHNlcG9zaXRpdmVzOlxuICAtIExlZ2l0aW1hdGUgYWRtaW5pc3RyYXRpdmUgYWN0aXZpdHkifSx7InRpdGxlIjoibm9kZS1pcGMgTWFsaWNpb3VzIEFjdGl2aXR5IC0gTmV0d29yayBDb25uZWN0aW9uIHRvIFN1c3BpY2lvdXMgRG9tYWlucyIsImxldmVsIjoiaGlnaCIsInRlY2huaXF1ZSI6IlQxMDcxLjAwNCIsInRhY3RpYyI6IkNvbW1hbmQgYW5kIENvbnRyb2wiLCJ0aWVyIjoicGFpZCIsInlhbWwiOiJ0aXRsZTogbm9kZS1pcGMgTWFsaWNpb3VzIEFjdGl2aXR5IC0gTmV0d29yayBDb25uZWN0aW9uIHRvIFN1c3BpY2lvdXMgRG9tYWluc1xuaWQ6IHNjdy0yMDI2LTA1LTE0LWFpLTNcbnN0YXR1czogZXhwZXJpbWVudGFsXG5sZXZlbDogaGlnaFxuZGVzY3JpcHRpb246IHxcbiAgRGV0ZWN0cyBETlMgcXVlcmllcyB0byBHaXRIdWIgZG9tYWlucywgd2hpY2ggaGF2ZSBiZWVuIG9ic2VydmVkIGluIHRoZSBjb250ZXh0IG9mIHRoZSBtYWxpY2lvdXMgbm9kZS1pcGMgdmVyc2lvbnMgZm9yIHBvdGVudGlhbCBjb21tYW5kIGFuZCBjb250cm9sIG9yIGRhdGEgZXhmaWx0cmF0aW9uLiBUaGlzIHJ1bGUgYWltcyB0byBjYXRjaCB0aGUgc3RlYWxlciBiYWNrZG9vciBjb21tdW5pY2F0aW5nIHdpdGggaXRzIEMyIGluZnJhc3RydWN0dXJlLlxuYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKEFJLWdlbmVyYXRlZClcbmRhdGU6IDIwMjYtMDUtMTRcbnJlZmVyZW5jZXM6XG4gIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNS0xNC1zdGVhbGVyLWJhY2tkb29yLWZvdW5kLWluLTMtbm9kZS1pcGMtdmVyc2lvbnMtdGFyZ2V0aW5nLWRldmUtaDgyczdcbnRhZ3M6XG4gIC0gYXR0YWNrLmNvbW1hbmRfYW5kX2NvbnRyb2xcbiAgLSBhdHRhY2sudDEwNzEuMDA0XG5sb2dzb3VyY2U6XG4gICAgY2F0ZWdvcnk6IGRuc1xuZGV0ZWN0aW9uOlxuICBzZWxlY3Rpb246XG4gICAgICBxdWVyeXxjb250YWluczpcbiAgICAgICAgICAtICdnaXRodWIuY29tJ1xuICAgICAgICAgIC0gJ2FwaS5naXRodWIuY29tJ1xuICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb25cbmZhbHNlcG9zaXRpdmVzOlxuICAtIExlZ2l0aW1hdGUgYWRtaW5pc3RyYXRpdmUgYWN0aXZpdHkifV0="
why_it_matters:
  - "If your development teams use `node-ipc`, immediately audit your projects for versions `9.1.6`, `9.2.3`, and `12.0.1`. Remove or downgrade these packages. Then, assume compromise and rotate all developer credentials, API keys, and secrets that might have been present on machines that used these infected packages. This is a direct threat to your intellectual property and build environment."
bot_cta_title: "Check Supply Chain Threats"
bot_cta_description: "Use /brief for an analyst-ready weekly threat summary including critical supply chain vulnerabilities."
---

Cybersecurity researchers are sounding the alarm about "malicious activity" found in newly published versions of `node-ipc`. According to The Hacker News, citing Socket and StepSecurity, three specific versions of the npm package have been confirmed as malicious: `node-ipc@9.1.6`, `node-ipc@9.2.3`, and `node-ipc@12.0.1`. Early analysis indicates these versions contain a stealer backdoor.

This is a critical supply chain threat, directly targeting developers. An infected `node-ipc` package in a project means an attacker gains a foothold to exfiltrate sensitive data. Think about the impact: developer secrets, API keys, intellectual property, and even source code could be siphoned off, leading to broader organizational compromise. The attacker's calculus here is clear – compromise the builder, compromise everything they build and touch.

Defenders need to move quickly. This isn't just about a single vulnerability; it's about the integrity of your development pipeline. CISOs must ensure their teams are auditing dependencies, verifying package integrity, and implementing strict supply chain security controls. This incident underscores why reliance on open-source components demands rigorous vetting and continuous monitoring.
