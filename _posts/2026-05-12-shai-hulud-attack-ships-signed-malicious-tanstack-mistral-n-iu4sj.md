---
title: "Shai Hulud Malware Compromises TanStack, Mistral npm Packages in Supply Chain Attack"
date: 2026-05-12 11:29:36 +0000
source: RSS
source_name: "BleepingComputer"
channel: "BleepingComputer"
tags: [threat-intel, data-breach, malware]
excerpt: "A significant software supply-chain attack, leveraging the \"Shai-Hulud\" malware, has compromised hundreds of open-source packages. BleepingComputer reports that this attack specifi"
summary: "A significant software supply-chain attack, leveraging the \"Shai-Hulud\" malware, has compromised hundreds of open-source packages. BleepingComputer reports that this attack specifically targeted and signed malicious versions of popular npm packages, including those from TanStack and Mistral. This is"
layout: post
section: live-feed
score: HIGH
curated: false
featured: false
priority: 75
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-013.png"
author: research
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-013.png"
source_url: "https://www.bleepingcomputer.com/news/security/shai-hulud-attack-ships-signed-malicious-tanstack-mistral-npm-packages/"
tlp: "TLP:CLEAR"
event_type: "supply-chain"
organizations:
  - name: "TanStack"
    domain: "tanstack.com"
    role: "vendor"
  - name: "Mistral AI"
    domain: "mistral.ai"
    role: "vendor"
malware_families:
  - "Shai-Hulud"
link_preview:
  url: "https://www.bleepingcomputer.com/news/security/shai-hulud-attack-ships-signed-malicious-tanstack-mistral-npm-packages/"
  title: "Shai Hulud attack ships signed malicious TanStack, Mistral npm packages"
  domain: "bleepingcomputer.com"
  image: "https://www.bleepstatic.com/content/hl-images/2026/05/05/Hackerbox.jpg"
sigma_rules:
  count: 2
  free_count: 1
  paid_count: 1
  preview_title: "Traffic to Compromised Vendor — TanStack"
  preview_level: "high"
  preview_technique: "supply-chain"
  preview_tactic: "event-type"
  preview_yaml_b64: "dGl0bGU6IFRyYWZmaWMgdG8gQ29tcHJvbWlzZWQgVmVuZG9yIOKAlCBUYW5TdGFjawppZDogc2N3LTIwMjYtMDUtMTItZXZ0LTEKc3RhdHVzOiBleHBlcmltZW50YWwKbGV2ZWw6IGhpZ2gKZGVzY3JpcHRpb246IHwKICBNb25pdG9yIGFsbCB0cmFmZmljIHRvIHRhbnN0YWNrLmNvbSBmb2xsb3dpbmcgdGhlIHN1cHBseSBjaGFpbiBjb21wcm9taXNlLiBSZXZpZXcgZm9yIHVuZXhwZWN0ZWQgZG93bmxvYWRzLCB1cGRhdGVzLCBvciBiZWFjb24gcGF0dGVybnMuCmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChhdXRvLWdlbmVyYXRlZCkKZGF0ZTogMjAyNi0wNS0xMgpyZWZlcmVuY2VzOgogIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNS0xMi1zaGFpLWh1bHVkLWF0dGFjay1zaGlwcy1zaWduZWQtbWFsaWNpb3VzLXRhbnN0YWNrLW1pc3RyYWwtbi1pdTRzagp0YWdzOgogIC0gYXR0YWNrLmdlbmVyYWwKICAtIGF0dGFjay5zdXBwbHktY2hhaW4KbG9nc291cmNlOgogICAgY2F0ZWdvcnk6IHByb3h5CmRldGVjdGlvbjoKICBzZWxlY3Rpb246CiAgICAgIGRzdF9kb21haW58ZW5kc3dpdGg6CiAgICAgICAgLSAndGFuc3RhY2suY29tJwogICAgICBjb25kaXRpb246IHNlbGVjdGlvbgpmYWxzZXBvc2l0aXZlczoKICAtIExlZ2l0aW1hdGUgYWN0aXZpdHkgZnJvbSBUYW5TdGFjaw=="
  all_rules_b64: "W3sidGl0bGUiOiJUcmFmZmljIHRvIENvbXByb21pc2VkIFZlbmRvciDigJQgVGFuU3RhY2siLCJsZXZlbCI6ImhpZ2giLCJ0ZWNobmlxdWUiOiJzdXBwbHktY2hhaW4iLCJ0YWN0aWMiOiJldmVudC10eXBlIiwidGllciI6ImZyZWUiLCJ5YW1sIjoidGl0bGU6IFRyYWZmaWMgdG8gQ29tcHJvbWlzZWQgVmVuZG9yIOKAlCBUYW5TdGFja1xuaWQ6IHNjdy0yMDI2LTA1LTEyLWV2dC0xXG5zdGF0dXM6IGV4cGVyaW1lbnRhbFxubGV2ZWw6IGhpZ2hcbmRlc2NyaXB0aW9uOiB8XG4gIE1vbml0b3IgYWxsIHRyYWZmaWMgdG8gdGFuc3RhY2suY29tIGZvbGxvd2luZyB0aGUgc3VwcGx5IGNoYWluIGNvbXByb21pc2UuIFJldmlldyBmb3IgdW5leHBlY3RlZCBkb3dubG9hZHMsIHVwZGF0ZXMsIG9yIGJlYWNvbiBwYXR0ZXJucy5cbmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChhdXRvLWdlbmVyYXRlZClcbmRhdGU6IDIwMjYtMDUtMTJcbnJlZmVyZW5jZXM6XG4gIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNS0xMi1zaGFpLWh1bHVkLWF0dGFjay1zaGlwcy1zaWduZWQtbWFsaWNpb3VzLXRhbnN0YWNrLW1pc3RyYWwtbi1pdTRzalxudGFnczpcbiAgLSBhdHRhY2suZ2VuZXJhbFxuICAtIGF0dGFjay5zdXBwbHktY2hhaW5cbmxvZ3NvdXJjZTpcbiAgICBjYXRlZ29yeTogcHJveHlcbmRldGVjdGlvbjpcbiAgc2VsZWN0aW9uOlxuICAgICAgZHN0X2RvbWFpbnxlbmRzd2l0aDpcbiAgICAgICAgLSAndGFuc3RhY2suY29tJ1xuICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb25cbmZhbHNlcG9zaXRpdmVzOlxuICAtIExlZ2l0aW1hdGUgYWN0aXZpdHkgZnJvbSBUYW5TdGFjayJ9LHsidGl0bGUiOiJTb2Z0d2FyZSBVcGRhdGUgZnJvbSBUYW5TdGFjayDigJQgSW50ZWdyaXR5IENoZWNrIiwibGV2ZWwiOiJoaWdoIiwidGVjaG5pcXVlIjoic3VwcGx5LWNoYWluIiwidGFjdGljIjoiZXZlbnQtdHlwZSIsInRpZXIiOiJwYWlkIiwieWFtbCI6InRpdGxlOiBTb2Z0d2FyZSBVcGRhdGUgZnJvbSBUYW5TdGFjayDigJQgSW50ZWdyaXR5IENoZWNrXG5pZDogc2N3LTIwMjYtMDUtMTItZXZ0LTJcbnN0YXR1czogZXhwZXJpbWVudGFsXG5sZXZlbDogaGlnaFxuZGVzY3JpcHRpb246IHxcbiAgRGV0ZWN0cyBzb2Z0d2FyZSB1cGRhdGVzIG9yaWdpbmF0aW5nIGZyb20gVGFuU3RhY2suIFZlcmlmeSB1cGRhdGUgaW50ZWdyaXR5IGFuZCBjb25zaWRlciBibG9ja2luZyBhdXRvbWF0aWMgdXBkYXRlcyB1bnRpbCB0aGUgdmVuZG9yIGNvbmZpcm1zIHRoZSBzdXBwbHkgY2hhaW4gaXMgc2VjdXJlZC5cbmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChhdXRvLWdlbmVyYXRlZClcbmRhdGU6IDIwMjYtMDUtMTJcbnJlZmVyZW5jZXM6XG4gIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNS0xMi1zaGFpLWh1bHVkLWF0dGFjay1zaGlwcy1zaWduZWQtbWFsaWNpb3VzLXRhbnN0YWNrLW1pc3RyYWwtbi1pdTRzalxudGFnczpcbiAgLSBhdHRhY2suZ2VuZXJhbFxuICAtIGF0dGFjay5zdXBwbHktY2hhaW5cbmxvZ3NvdXJjZTpcbiAgICBjYXRlZ29yeTogcHJvY2Vzc19jcmVhdGlvblxuZGV0ZWN0aW9uOlxuICBzZWxlY3Rpb246XG4gICAgICBDb21tYW5kTGluZXxjb250YWluczpcbiAgICAgICAgLSAndGFuc3RhY2suY29tJ1xuICAgICAgICAtICd1cGRhdGUnXG4gICAgICAgIC0gJ2luc3RhbGwnXG4gICAgICBQYXJlbnRJbWFnZXxlbmRzd2l0aDpcbiAgICAgICAgLSAnXFxzZXJ2aWNlcy5leGUnXG4gICAgICAgIC0gJ1xcc3ZjaG9zdC5leGUnXG4gICAgICBjb25kaXRpb246IHNlbGVjdGlvblxuZmFsc2Vwb3NpdGl2ZXM6XG4gIC0gTGVnaXRpbWF0ZSBhY3Rpdml0eSBmcm9tIFRhblN0YWNrIn1d"
why_it_matters:
  - "If your development teams use npm, immediately audit your package dependencies for TanStack, Mistral, and any other widely used open-source libraries. Focus on verifying package integrity and signatures. Assume compromise if you're using affected versions and initiate a full review of any code deployed from those packages. This isn't theoretical; it's a direct threat to your application's integrity."
bot_cta_title: "Track Supply Chain Threats"
bot_cta_description: "Use /brief to get an analyst-ready weekly threat summary that includes supply-chain attacks and key IOCs."
---

A significant software supply-chain attack, leveraging the "Shai-Hulud" malware, has compromised hundreds of open-source packages. BleepingComputer reports that this attack specifically targeted and signed malicious versions of popular npm packages, including those from TanStack and Mistral. This isn't just a random malware drop; it's a calculated move to inject persistent backdoors into development ecosystems, hitting foundational libraries that underpin countless applications.

The attacker's calculus here is clear: compromise widely used components to achieve maximum downstream impact. By signing these malicious packages, they're attempting to bypass trust mechanisms, making detection far more challenging for developers and automated security tools alike. This move indicates a sophisticated understanding of modern software development practices and a willingness to invest in stealth over brute force.

For defenders, this means the threat extends beyond just direct dependencies. Any project consuming these compromised packages, even indirectly, is at risk. It’s a stark reminder that the integrity of your software supply chain is only as strong as its weakest link – often a third-party component you didn't even know you were using.
