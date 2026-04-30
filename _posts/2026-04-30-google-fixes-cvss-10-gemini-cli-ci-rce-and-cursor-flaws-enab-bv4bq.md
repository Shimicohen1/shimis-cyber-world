---
title: "Google Gemini CLI RCE: CVSS 10 Flaw Exposes CI/CD to Attack"
date: 2026-04-30 07:07:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, cloud, tools]
excerpt: "Google has patched a critical remote code execution (RCE) vulnerability in its Gemini CLI, specifically impacting the `@google/gemini-cli` npm package and the `google-github-action"
summary: "Google has patched a critical remote code execution (RCE) vulnerability in its Gemini CLI, specifically impacting the `@google/gemini-cli` npm package and the `google-github-actions/run-gemini-cli` GitHub Actions workflow. The Hacker News reports this flaw, rated CVSS 10.0, could allow an unprivileg"
layout: post
section: vulnerabilities
score: HIGH
curated: false
featured: false
priority: 80
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-044.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/threats/threats-044.png"
source_url: "https://thehackernews.com/2026/04/google-fixes-cvss-10-gemini-cli-ci-rce.html"
tlp: "TLP:CLEAR"
event_type: "vulnerability"
organizations:
  - name: "Google"
    domain: "google.com"
    role: "vendor"
iocs:
  - id: "Gemini-CLI-RCE"
    type: "RCE"
    indicator: "npm package @google/gemini-cli"
  - id: "Gemini-CLI-RCE"
    type: "RCE"
    indicator: "GitHub Actions workflow google-github-actions/run-gemini-cli"
  - id: "Gemini-CLI-RCE"
    type: "Code Injection"
    indicator: "Malicious content loading as Gemini configuration"
mitre_attack:
  - id: "T1078.004"
    name: "Abuse Cloud Accounts"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1078/004/"
  - id: "T1505.003"
    name: "Exploit via Software Supply Chain"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1505/003/"
  - id: "T1059.004"
    name: "Command and Scripting Interpreter: Unix Shell"
    tactic: "Execution"
    url: "https://attack.mitre.org/techniques/T1059/004/"
sigma_rules:
  count: 1
  free_count: 1
  paid_count: 0
  preview_title: "Exploitation Attempt — Google"
  preview_level: "high"
  preview_technique: "vulnerability"
  preview_tactic: "event-type"
  preview_yaml_b64: "dGl0bGU6IEV4cGxvaXRhdGlvbiBBdHRlbXB0IOKAlCBHb29nbGUKaWQ6IHNjdy0yMDI2LTA0LTMwLWV2dC0xCnN0YXR1czogZXhwZXJpbWVudGFsCmxldmVsOiBoaWdoCmRlc2NyaXB0aW9uOiB8CiAgTW9uaXRvciBmb3IgZXhwbG9pdGF0aW9uIGF0dGVtcHRzIHRhcmdldGluZyBDVkUtWFhYWC1YWFhYWC4gUGF0Y2ggaW1tZWRpYXRlbHkgaWYgcnVubmluZyBhZmZlY3RlZCBHb29nbGUgcHJvZHVjdHMuCmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChhdXRvLWdlbmVyYXRlZCkKZGF0ZTogMjAyNi0wNC0zMApyZWZlcmVuY2VzOgogIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNC0zMC1nb29nbGUtZml4ZXMtY3Zzcy0xMC1nZW1pbmktY2xpLWNpLXJjZS1hbmQtY3Vyc29yLWZsYXdzLWVuYWItYnY0YnEKdGFnczoKICAtIGF0dGFjay5nZW5lcmFsCiAgLSBhdHRhY2sudnVsbmVyYWJpbGl0eQpsb2dzb3VyY2U6CiAgICBjYXRlZ29yeTogd2Vic2VydmVyCmRldGVjdGlvbjoKICBzZWxlY3Rpb246CiAgICAgIGNzLXVyaS1xdWVyeXxjb250YWluczoKICAgICAgICAtICcnCiAgICAgIHNjLXN0YXR1czoKICAgICAgICAtIDIwMAogICAgICAgIC0gNTAwCiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uCmZhbHNlcG9zaXRpdmVzOgogIC0gTGVnaXRpbWF0ZSBhY3Rpdml0eSBmcm9tIEdvb2dsZQ=="
  all_rules_b64: "W3sidGl0bGUiOiJFeHBsb2l0YXRpb24gQXR0ZW1wdCDigJQgR29vZ2xlIiwibGV2ZWwiOiJoaWdoIiwidGVjaG5pcXVlIjoidnVsbmVyYWJpbGl0eSIsInRhY3RpYyI6ImV2ZW50LXR5cGUiLCJ0aWVyIjoiZnJlZSIsInlhbWwiOiJ0aXRsZTogRXhwbG9pdGF0aW9uIEF0dGVtcHQg4oCUIEdvb2dsZVxuaWQ6IHNjdy0yMDI2LTA0LTMwLWV2dC0xXG5zdGF0dXM6IGV4cGVyaW1lbnRhbFxubGV2ZWw6IGhpZ2hcbmRlc2NyaXB0aW9uOiB8XG4gIE1vbml0b3IgZm9yIGV4cGxvaXRhdGlvbiBhdHRlbXB0cyB0YXJnZXRpbmcgQ1ZFLVhYWFgtWFhYWFguIFBhdGNoIGltbWVkaWF0ZWx5IGlmIHJ1bm5pbmcgYWZmZWN0ZWQgR29vZ2xlIHByb2R1Y3RzLlxuYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKGF1dG8tZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNC0zMFxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA0LTMwLWdvb2dsZS1maXhlcy1jdnNzLTEwLWdlbWluaS1jbGktY2ktcmNlLWFuZC1jdXJzb3ItZmxhd3MtZW5hYi1idjRicVxudGFnczpcbiAgLSBhdHRhY2suZ2VuZXJhbFxuICAtIGF0dGFjay52dWxuZXJhYmlsaXR5XG5sb2dzb3VyY2U6XG4gICAgY2F0ZWdvcnk6IHdlYnNlcnZlclxuZGV0ZWN0aW9uOlxuICBzZWxlY3Rpb246XG4gICAgICBjcy11cmktcXVlcnl8Y29udGFpbnM6XG4gICAgICAgIC0gJydcbiAgICAgIHNjLXN0YXR1czpcbiAgICAgICAgLSAyMDBcbiAgICAgICAgLSA1MDBcbiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uXG5mYWxzZXBvc2l0aXZlczpcbiAgLSBMZWdpdGltYXRlIGFjdGl2aXR5IGZyb20gR29vZ2xlIn1d"
why_it_matters:
  - "If your organization uses the `@google/gemini-cli` npm package or the `google-github-actions/run-gemini-cli` GitHub Action, patch immediately. Prioritize a review of all CI/CD pipelines where Gemini CLI is integrated. Look for any anomalous build activity or unauthorized code changes that might indicate a prior compromise."
bot_cta_title: "Check for Vulnerability Insights"
bot_cta_description: "Use /brief to get an analyst-ready summary of the latest critical vulnerabilities and their defensive implications."
---

Google has patched a critical remote code execution (RCE) vulnerability in its Gemini CLI, specifically impacting the `@google/gemini-cli` npm package and the `google-github-actions/run-gemini-cli` GitHub Actions workflow. The Hacker News reports this flaw, rated CVSS 10.0, could allow an unprivileged external attacker to inject malicious content as Gemini configuration, leading to arbitrary command execution on host systems.

This isn't just another bug; it's a supply chain risk targeting CI/CD pipelines. An attacker exploiting this could compromise build environments, inject backdoors into deployed applications, or exfiltrate sensitive source code and credentials. The implications extend far beyond a single compromised CLI session, potentially affecting entire development and deployment lifecycles.

For defenders, this highlights the persistent challenge of securing developer tooling and CI/CD infrastructure. Even seemingly minor CLI utilities, when integrated into automated workflows, can become high-severity attack vectors if not rigorously secured. The attacker's calculus here is clear: target the weakest link in the build chain for maximum impact.
