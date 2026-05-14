---
title: "NGINX Rewrite Module Flaw (CVE-2026-42945) Enables Unauthenticated RCE"
date: 2026-05-14 06:00:09 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability]
excerpt: "The Hacker News reports a critical vulnerability, CVE-2026-42945, impacting NGINX Plus and NGINX Open, which remained undetected for 18 years. Discovered by depthfirst, this heap b"
summary: "The Hacker News reports a critical vulnerability, CVE-2026-42945, impacting NGINX Plus and NGINX Open, which remained undetected for 18 years. Discovered by depthfirst, this heap buffer overflow in the `ngx_http_rewrite_module` carries a CVSS v4 score of 9.2, indicating severe potential impact. This"
layout: post
section: vulnerabilities
score: HIGH
curated: false
featured: false
priority: 80
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-010.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-010.png"
source_url: "https://thehackernews.com/2026/05/18-year-old-nginx-rewrite-module-flaw.html"
tlp: "TLP:CLEAR"
event_type: "vulnerability"
organizations:
  - name: "NGINX"
    domain: "nginx.com"
    role: "vendor"
link_preview:
  url: "https://thehackernews.com/2026/05/18-year-old-nginx-rewrite-module-flaw.html"
  title: "18-Year-Old NGINX Rewrite Module Flaw Enables Unauthenticated RCE"
  domain: "thehackernews.com"
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhhCvxtNv7UYYMCITB2HLsBgkN83LdRXcw0wmP9gMAfXeNpmJoOJKNIaQb55b-GLDeQHx-dUBkASGDYgstnvYAE5eFuwyzMSxY804fn56OaTsGlESOab9y-kFHJ-iV5iUlWrc5j27WLduUDhW6nRSjkv5tFMKZjDbbmDdk7_NMZ3y7sipHKy7t4XuMQ9YfG/s1600/nn.gif"
iocs:
  - id: "CVE-2026-42945"
    type: "RCE"
    indicator: "NGINX Plus and NGINX Open affected by heap buffer overflow"
  - id: "CVE-2026-42945"
    type: "Buffer Overflow"
    indicator: "ngx_http_rewrite_module vulnerable to heap buffer overflow"
  - id: "CVE-2026-42945"
    type: "RCE"
    indicator: "Unauthenticated Remote Code Execution via ngx_http_rewrite_module"
mitre_attack:
  - id: "T1190"
    name: "Exploit Public-Facing Application"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1190/"
  - id: "T1203"
    name: "Exploitation for Client Execution"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1203/"
sigma_rules:
  count: 1
  free_count: 1
  paid_count: 0
  preview_title: "Exploitation Attempt — NGINX"
  preview_level: "high"
  preview_technique: "vulnerability"
  preview_tactic: "event-type"
  preview_yaml_b64: "dGl0bGU6IEV4cGxvaXRhdGlvbiBBdHRlbXB0IOKAlCBOR0lOWAppZDogc2N3LTIwMjYtMDUtMTQtZXZ0LTEKc3RhdHVzOiBleHBlcmltZW50YWwKbGV2ZWw6IGhpZ2gKZGVzY3JpcHRpb246IHwKICBNb25pdG9yIGZvciBleHBsb2l0YXRpb24gYXR0ZW1wdHMgdGFyZ2V0aW5nIENWRS1YWFhYLVhYWFhYLiBQYXRjaCBpbW1lZGlhdGVseSBpZiBydW5uaW5nIGFmZmVjdGVkIE5HSU5YIHByb2R1Y3RzLgphdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoYXV0by1nZW5lcmF0ZWQpCmRhdGU6IDIwMjYtMDUtMTQKcmVmZXJlbmNlczoKICAtIGh0dHBzOi8vc2hpbWlzY3liZXJ3b3JsZC5jb20vX3Bvc3RzLzIwMjYtMDUtMTQtMTgteWVhci1vbGQtbmdpbngtcmV3cml0ZS1tb2R1bGUtZmxhdy1lbmFibGVzLXVuYXV0aGVudGljYXRlLW1nbGdnCnRhZ3M6CiAgLSBhdHRhY2suZ2VuZXJhbAogIC0gYXR0YWNrLnZ1bG5lcmFiaWxpdHkKbG9nc291cmNlOgogICAgY2F0ZWdvcnk6IHdlYnNlcnZlcgpkZXRlY3Rpb246CiAgc2VsZWN0aW9uOgogICAgICBjcy11cmktcXVlcnl8Y29udGFpbnM6CiAgICAgICAgLSAnJwogICAgICBzYy1zdGF0dXM6CiAgICAgICAgLSAyMDAKICAgICAgICAtIDUwMAogICAgICBjb25kaXRpb246IHNlbGVjdGlvbgpmYWxzZXBvc2l0aXZlczoKICAtIExlZ2l0aW1hdGUgYWN0aXZpdHkgZnJvbSBOR0lOWA=="
  all_rules_b64: "W3sidGl0bGUiOiJFeHBsb2l0YXRpb24gQXR0ZW1wdCDigJQgTkdJTlgiLCJsZXZlbCI6ImhpZ2giLCJ0ZWNobmlxdWUiOiJ2dWxuZXJhYmlsaXR5IiwidGFjdGljIjoiZXZlbnQtdHlwZSIsInRpZXIiOiJmcmVlIiwieWFtbCI6InRpdGxlOiBFeHBsb2l0YXRpb24gQXR0ZW1wdCDigJQgTkdJTlhcbmlkOiBzY3ctMjAyNi0wNS0xNC1ldnQtMVxuc3RhdHVzOiBleHBlcmltZW50YWxcbmxldmVsOiBoaWdoXG5kZXNjcmlwdGlvbjogfFxuICBNb25pdG9yIGZvciBleHBsb2l0YXRpb24gYXR0ZW1wdHMgdGFyZ2V0aW5nIENWRS1YWFhYLVhYWFhYLiBQYXRjaCBpbW1lZGlhdGVseSBpZiBydW5uaW5nIGFmZmVjdGVkIE5HSU5YIHByb2R1Y3RzLlxuYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKGF1dG8tZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNS0xNFxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTE0LTE4LXllYXItb2xkLW5naW54LXJld3JpdGUtbW9kdWxlLWZsYXctZW5hYmxlcy11bmF1dGhlbnRpY2F0ZS1tZ2xnZ1xudGFnczpcbiAgLSBhdHRhY2suZ2VuZXJhbFxuICAtIGF0dGFjay52dWxuZXJhYmlsaXR5XG5sb2dzb3VyY2U6XG4gICAgY2F0ZWdvcnk6IHdlYnNlcnZlclxuZGV0ZWN0aW9uOlxuICBzZWxlY3Rpb246XG4gICAgICBjcy11cmktcXVlcnl8Y29udGFpbnM6XG4gICAgICAgIC0gJydcbiAgICAgIHNjLXN0YXR1czpcbiAgICAgICAgLSAyMDBcbiAgICAgICAgLSA1MDBcbiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uXG5mYWxzZXBvc2l0aXZlczpcbiAgLSBMZWdpdGltYXRlIGFjdGl2aXR5IGZyb20gTkdJTlgifV0="
why_it_matters:
  - "If your organization uses NGINX Plus or NGINX Open, you need to identify all instances running the `ngx_http_rewrite_module`. Prioritize patching immediately. This isn't a theoretical threat; it's a critical RCE that bypasses authentication. Your internet-facing NGINX servers are prime targets. Verify your patching cadence and ensure this update is pushed out with urgency."
bot_cta_title: "Check NGINX Vulnerability Updates"
bot_cta_description: "Use /brief to get analyst-ready summaries of critical vulnerabilities like this NGINX flaw."
---

The Hacker News reports a critical vulnerability, CVE-2026-42945, impacting NGINX Plus and NGINX Open, which remained undetected for 18 years. Discovered by depthfirst, this heap buffer overflow in the `ngx_http_rewrite_module` carries a CVSS v4 score of 9.2, indicating severe potential impact.

This flaw allows unauthenticated attackers to achieve remote code execution (RCE) or trigger a denial-of-service condition. Given NGINX's pervasive use as a web server and reverse proxy, the implications are substantial. An RCE vulnerability of this nature in a widely deployed component like NGINX is a direct pathway into an organization's network perimeter.

Attackers will undoubtedly prioritize exploiting this. The unauthenticated nature of the vulnerability means there is no barrier to entry beyond network reachability. Defenders should assume active exploitation is imminent, if not already underway, especially against internet-facing NGINX instances.
