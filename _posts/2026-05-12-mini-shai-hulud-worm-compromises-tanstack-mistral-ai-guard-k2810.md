---
title: "Mini Shai-Hulud Worm Hits TanStack, Mistral AI, Guardrails AI Packages"
date: 2026-05-12 08:50:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, malware]
excerpt: "The threat actor TeamPCP is reportedly behind a new supply chain attack campaign, dubbed Mini Shai-Hulud. The Hacker News reports that popular npm and PyPI packages from organizati"
summary: "The threat actor TeamPCP is reportedly behind a new supply chain attack campaign, dubbed Mini Shai-Hulud. The Hacker News reports that popular npm and PyPI packages from organizations including TanStack, UiPath, Mistral AI, OpenSearch, and Guardrails AI have been compromised. These packages were mod"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-044.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-044.png"
source_url: "https://thehackernews.com/2026/05/mini-shai-hulud-worm-compromises.html"
tlp: "TLP:CLEAR"
event_type: "supply-chain"
organizations:
  - name: "TanStack"
    domain: "tanstack.com"
    role: "victim"
  - name: "UiPath"
    domain: "uipath.com"
    role: "victim"
  - name: "Mistral AI"
    domain: "mistral.ai"
    role: "victim"
  - name: "OpenSearch"
    domain: "opensearch.org"
    role: "victim"
  - name: "Guardrails AI"
    domain: "guardrails.ai"
    role: "victim"
threat_actors:
  - "TeamPCP"
malware_families:
  - "Shai-Hulud"
link_preview:
  url: "https://thehackernews.com/2026/05/mini-shai-hulud-worm-compromises.html"
  title: "Mini Shai-Hulud Worm Compromises TanStack, Mistral AI, Guardrails AI & More Packages"
  domain: "thehackernews.com"
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhXIhs2kZt0YGdDcd-Io67mq1GIN_iI_71LYhuin4qqmlgUgCuZ3fGUvglg_5nh5DK8kfPP8RHki86yMyqh4rTE27PGgPBh4RQjkh91-QGoB8cav5NUsYAwcV3ZJ7aEf-uEoH3pLGQ2eWuCh8lZSWAlTIa2U5I6eeB3HZmYMn4q-YoV7Ytmkpr1tN0lC2rG/s1600/mistral.jpg"
iocs:
  - id: "Mini-Shai-Hulud-Worm"
    type: "Supply Chain Attack"
    indicator: "Compromised npm packages from TanStack, UiPath, Mistral AI, OpenSearch, Guardrails AI"
  - id: "Mini-Shai-Hulud-Worm"
    type: "Code Injection"
    indicator: "Modified npm packages containing 'router_init.js' (obfuscated JavaScript file)"
  - id: "Mini-Shai-Hulud-Worm"
    type: "Supply Chain Attack"
    indicator: "Compromised PyPI packages from TanStack, UiPath, Mistral AI, OpenSearch, Guardrails AI"
mitre_attack:
  - id: "T1195"
    name: "Compromise Software Supply Chain"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1195/"
  - id: "T1027"
    name: "Obfuscated Files or Information"
    tactic: "Defense Evasion"
    url: "https://attack.mitre.org/techniques/T1027/"
sigma_rules:
  count: 3
  free_count: 1
  paid_count: 2
  preview_title: "Supply Chain Compromise: Mini Shai-Hulud Worm - router_init.js"
  preview_level: "critical"
  preview_technique: "T1190"
  preview_tactic: "Initial Access"
  preview_yaml_b64: "dGl0bGU6IFN1cHBseSBDaGFpbiBDb21wcm9taXNlOiBNaW5pIFNoYWktSHVsdWQgV29ybSAtIHJvdXRlcl9pbml0LmpzCmlkOiBzY3ctMjAyNi0wNS0xMi1haS0xCnN0YXR1czogZXhwZXJpbWVudGFsCmxldmVsOiBjcml0aWNhbApkZXNjcmlwdGlvbjogfAogIERldGVjdHMgdGhlIHByZXNlbmNlIG9mICdyb3V0ZXJfaW5pdC5qcycsIGFuIG9iZnVzY2F0ZWQgSmF2YVNjcmlwdCBmaWxlIHNwZWNpZmljYWxseSBtZW50aW9uZWQgYXMgcGFydCBvZiB0aGUgTWluaSBTaGFpLUh1bHVkIHdvcm0gY2FtcGFpZ24gdGFyZ2V0aW5nIHBvcHVsYXIgbnBtIGFuZCBQeVBJIHBhY2thZ2VzLiBUaGlzIGZpbGUgaXMgdXNlZCB0byBwcm9maWxlIHRoZSBleGVjdXRpb24gZW52aXJvbm1lbnQuCmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChBSS1nZW5lcmF0ZWQpCmRhdGU6IDIwMjYtMDUtMTIKcmVmZXJlbmNlczoKICAtIGh0dHBzOi8vc2hpbWlzY3liZXJ3b3JsZC5jb20vX3Bvc3RzLzIwMjYtMDUtMTItbWluaS1zaGFpLWh1bHVkLXdvcm0tY29tcHJvbWlzZXMtdGFuc3RhY2stbWlzdHJhbC1haS1ndWFyZC1rMjgxMAp0YWdzOgogIC0gYXR0YWNrLmluaXRpYWxfYWNjZXNzCiAgLSBhdHRhY2sudDExOTAKbG9nc291cmNlOgogICAgY2F0ZWdvcnk6IGZpbGVfZXZlbnQKZGV0ZWN0aW9uOgogIHNlbGVjdGlvbjoKICAgICAgVGFyZ2V0RmlsZW5hbWV8Y29udGFpbnM6CiAgICAgICAgICAtICcvcm91dGVyX2luaXQuanMnCiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uCmZhbHNlcG9zaXRpdmVzOgogIC0gTGVnaXRpbWF0ZSBhZG1pbmlzdHJhdGl2ZSBhY3Rpdml0eQ=="
  all_rules_b64: "W3sidGl0bGUiOiJTdXBwbHkgQ2hhaW4gQ29tcHJvbWlzZTogTWluaSBTaGFpLUh1bHVkIFdvcm0gLSByb3V0ZXJfaW5pdC5qcyIsImxldmVsIjoiY3JpdGljYWwiLCJ0ZWNobmlxdWUiOiJUMTE5MCIsInRhY3RpYyI6IkluaXRpYWwgQWNjZXNzIiwidGllciI6ImZyZWUiLCJ5YW1sIjoidGl0bGU6IFN1cHBseSBDaGFpbiBDb21wcm9taXNlOiBNaW5pIFNoYWktSHVsdWQgV29ybSAtIHJvdXRlcl9pbml0LmpzXG5pZDogc2N3LTIwMjYtMDUtMTItYWktMVxuc3RhdHVzOiBleHBlcmltZW50YWxcbmxldmVsOiBjcml0aWNhbFxuZGVzY3JpcHRpb246IHxcbiAgRGV0ZWN0cyB0aGUgcHJlc2VuY2Ugb2YgJ3JvdXRlcl9pbml0LmpzJywgYW4gb2JmdXNjYXRlZCBKYXZhU2NyaXB0IGZpbGUgc3BlY2lmaWNhbGx5IG1lbnRpb25lZCBhcyBwYXJ0IG9mIHRoZSBNaW5pIFNoYWktSHVsdWQgd29ybSBjYW1wYWlnbiB0YXJnZXRpbmcgcG9wdWxhciBucG0gYW5kIFB5UEkgcGFja2FnZXMuIFRoaXMgZmlsZSBpcyB1c2VkIHRvIHByb2ZpbGUgdGhlIGV4ZWN1dGlvbiBlbnZpcm9ubWVudC5cbmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChBSS1nZW5lcmF0ZWQpXG5kYXRlOiAyMDI2LTA1LTEyXG5yZWZlcmVuY2VzOlxuICAtIGh0dHBzOi8vc2hpbWlzY3liZXJ3b3JsZC5jb20vX3Bvc3RzLzIwMjYtMDUtMTItbWluaS1zaGFpLWh1bHVkLXdvcm0tY29tcHJvbWlzZXMtdGFuc3RhY2stbWlzdHJhbC1haS1ndWFyZC1rMjgxMFxudGFnczpcbiAgLSBhdHRhY2suaW5pdGlhbF9hY2Nlc3NcbiAgLSBhdHRhY2sudDExOTBcbmxvZ3NvdXJjZTpcbiAgICBjYXRlZ29yeTogZmlsZV9ldmVudFxuZGV0ZWN0aW9uOlxuICBzZWxlY3Rpb246XG4gICAgICBUYXJnZXRGaWxlbmFtZXxjb250YWluczpcbiAgICAgICAgICAtICcvcm91dGVyX2luaXQuanMnXG4gICAgICBjb25kaXRpb246IHNlbGVjdGlvblxuZmFsc2Vwb3NpdGl2ZXM6XG4gIC0gTGVnaXRpbWF0ZSBhZG1pbmlzdHJhdGl2ZSBhY3Rpdml0eSJ9LHsidGl0bGUiOiJTdXBwbHkgQ2hhaW4gQ29tcHJvbWlzZTogTWluaSBTaGFpLUh1bHVkIFdvcm0gLSBTdXNwaWNpb3VzIEZpbGUgQWNjZXNzIiwibGV2ZWwiOiJoaWdoIiwidGVjaG5pcXVlIjoiVDEwODMiLCJ0YWN0aWMiOiJEaXNjb3ZlcnkiLCJ0aWVyIjoicGFpZCIsInlhbWwiOiJ0aXRsZTogU3VwcGx5IENoYWluIENvbXByb21pc2U6IE1pbmkgU2hhaS1IdWx1ZCBXb3JtIC0gU3VzcGljaW91cyBGaWxlIEFjY2Vzc1xuaWQ6IHNjdy0yMDI2LTA1LTEyLWFpLTJcbnN0YXR1czogZXhwZXJpbWVudGFsXG5sZXZlbDogaGlnaFxuZGVzY3JpcHRpb246IHxcbiAgRGV0ZWN0cyBhY2Nlc3MgdG8gdGhlIG1hbGljaW91cyAncm91dGVyX2luaXQuanMnIGZpbGUsIHBhcnRpY3VsYXJseSB3aGVuIGluaXRpYXRlZCBieSBwYWNrYWdlIG1hbmFnZW1lbnQgdG9vbHMgbGlrZSBucG0sIHlhcm4sIG9yIHBpcC4gVGhpcyBpbmRpY2F0ZXMgcG90ZW50aWFsIGNvbXByb21pc2Ugb3IgYXR0ZW1wdGVkIGV4ZWN1dGlvbiBvZiBtYWxpY2lvdXMgY29kZSB3aXRoaW4gdGhlIHNvZnR3YXJlIHN1cHBseSBjaGFpbi5cbmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChBSS1nZW5lcmF0ZWQpXG5kYXRlOiAyMDI2LTA1LTEyXG5yZWZlcmVuY2VzOlxuICAtIGh0dHBzOi8vc2hpbWlzY3liZXJ3b3JsZC5jb20vX3Bvc3RzLzIwMjYtMDUtMTItbWluaS1zaGFpLWh1bHVkLXdvcm0tY29tcHJvbWlzZXMtdGFuc3RhY2stbWlzdHJhbC1haS1ndWFyZC1rMjgxMFxudGFnczpcbiAgLSBhdHRhY2suZGlzY292ZXJ5XG4gIC0gYXR0YWNrLnQxMDgzXG5sb2dzb3VyY2U6XG4gICAgY2F0ZWdvcnk6IGZpbGVfYWNjZXNzXG5kZXRlY3Rpb246XG4gIHNlbGVjdGlvbl9iYXNlOlxuICAgICAgVGFyZ2V0RmlsZW5hbWV8Y29udGFpbnM6XG4gICAgICAgICAgLSAnL3JvdXRlcl9pbml0LmpzJ1xuICBzZWxlY3Rpb25faW5kaWNhdG9yczpcbiAgICAgIFVzZXJ8Y29udGFpbnM6XG4gICAgICAgICAgLSAnbnBtJ1xuICAgICAgICAgIC0gJ3lhcm4nXG4gICAgICAgICAgLSAncGlwJ1xuICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb25fYmFzZSBBTkQgc2VsZWN0aW9uX2luZGljYXRvcnNcbmZhbHNlcG9zaXRpdmVzOlxuICAtIExlZ2l0aW1hdGUgYWRtaW5pc3RyYXRpdmUgYWN0aXZpdHkifSx7InRpdGxlIjoiU3VwcGx5IENoYWluIENvbXByb21pc2U6IE1pbmkgU2hhaS1IdWx1ZCBXb3JtIC0gU3VzcGljaW91cyBQcm9jZXNzIEV4ZWN1dGlvbiIsImxldmVsIjoiaGlnaCIsInRlY2huaXF1ZSI6IlQxMDU5IiwidGFjdGljIjoiRXhlY3V0aW9uIiwidGllciI6InBhaWQiLCJ5YW1sIjoidGl0bGU6IFN1cHBseSBDaGFpbiBDb21wcm9taXNlOiBNaW5pIFNoYWktSHVsdWQgV29ybSAtIFN1c3BpY2lvdXMgUHJvY2VzcyBFeGVjdXRpb25cbmlkOiBzY3ctMjAyNi0wNS0xMi1haS0zXG5zdGF0dXM6IGV4cGVyaW1lbnRhbFxubGV2ZWw6IGhpZ2hcbmRlc2NyaXB0aW9uOiB8XG4gIERldGVjdHMgdGhlIGV4ZWN1dGlvbiBvZiBOb2RlLmpzICgnbm9kZScpIHByb2Nlc3NlcyB0aGF0IGludm9sdmUgdGhlICdyb3V0ZXJfaW5pdC5qcycgZmlsZSBpbiB0aGVpciBjb21tYW5kIGxpbmUgYXJndW1lbnRzLiBUaGlzIGlzIGEgc3Ryb25nIGluZGljYXRvciBvZiB0aGUgTWluaSBTaGFpLUh1bHVkIHdvcm0gYXR0ZW1wdGluZyB0byBleGVjdXRlIGl0cyBwcm9maWxpbmcgc2NyaXB0IGFmdGVyIGEgcGFja2FnZSBjb21wcm9taXNlLlxuYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKEFJLWdlbmVyYXRlZClcbmRhdGU6IDIwMjYtMDUtMTJcbnJlZmVyZW5jZXM6XG4gIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNS0xMi1taW5pLXNoYWktaHVsdWQtd29ybS1jb21wcm9taXNlcy10YW5zdGFjay1taXN0cmFsLWFpLWd1YXJkLWsyODEwXG50YWdzOlxuICAtIGF0dGFjay5leGVjdXRpb25cbiAgLSBhdHRhY2sudDEwNTlcbmxvZ3NvdXJjZTpcbiAgICBjYXRlZ29yeTogcHJvY2Vzc19jcmVhdGlvblxuZGV0ZWN0aW9uOlxuICBzZWxlY3Rpb25fYmFzZTpcbiAgICAgIEltYWdlfGNvbnRhaW5zOlxuICAgICAgICAgIC0gJ25vZGUnXG4gIHNlbGVjdGlvbl9pbmRpY2F0b3JzOlxuICAgICAgQ29tbWFuZExpbmV8Y29udGFpbnM6XG4gICAgICAgICAgLSAncm91dGVyX2luaXQuanMnXG4gICAgICBjb25kaXRpb246IHNlbGVjdGlvbl9iYXNlIEFORCBzZWxlY3Rpb25faW5kaWNhdG9yc1xuZmFsc2Vwb3NpdGl2ZXM6XG4gIC0gTGVnaXRpbWF0ZSBhZG1pbmlzdHJhdGl2ZSBhY3Rpdml0eSJ9XQ=="
why_it_matters:
  - "If your organization uses any TanStack, UiPath, Mistral AI, OpenSearch, or Guardrails AI packages, immediately review your dependency tree. Audit your build pipelines and deployed applications for the presence of 'router_init.js' or any other suspicious files within these packages. Consider temporarily pinning to known good versions while further investigation occurs."
bot_cta_title: "Check supply chain risks for impacted vendors"
bot_cta_description: "Use /org tanstack.com to check exposure related to this supply chain attack."
---

The threat actor TeamPCP is reportedly behind a new supply chain attack campaign, dubbed Mini Shai-Hulud. The Hacker News reports that popular npm and PyPI packages from organizations including TanStack, UiPath, Mistral AI, OpenSearch, and Guardrails AI have been compromised. These packages were modified to include an obfuscated JavaScript file, 'router_init.js', designed to profile the execution environment.

This campaign highlights the persistent threat to the software supply chain. By compromising widely used libraries, attackers can gain a broad foothold, potentially impacting numerous downstream projects and organizations that rely on these packages. The obfuscation technique used suggests an effort to evade detection by security tools.

Defenders should prioritize auditing their dependencies for signs of compromise. Implementing robust software composition analysis (SCA) tools and maintaining strict vetting processes for third-party libraries are critical. Promptly updating packages to versions confirmed to be clean, and isolating or removing potentially compromised dependencies, are immediate mitigation steps.
