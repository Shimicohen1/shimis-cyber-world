---
title: "GitHub Actions Supply Chain Attack Hijacks Tags to Steal CI/CD Credentials"
date: 2026-05-19 05:28:06 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability, identity, tools]
excerpt: "Threat actors have compromised the popular GitHub Actions workflow, `actions-cool/issues-helper`, to execute malicious code designed to harvest sensitive credentials. The Hacker Ne"
summary: "Threat actors have compromised the popular GitHub Actions workflow, `actions-cool/issues-helper`, to execute malicious code designed to harvest sensitive credentials. The Hacker News reports that this supply chain attack achieves its objective by exfiltrating stolen credentials to an attacker-contro"
layout: post
section: vulnerabilities
score: HIGH
curated: false
featured: false
priority: 75
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-022.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/tools/tools-022.png"
source_url: "https://thehackernews.com/2026/05/github-actions-supply-chain-attack.html"
tlp: "TLP:CLEAR"
event_type: "supply-chain"
organizations:
  - name: "GitHub"
    domain: "github.com"
    role: "vendor"
link_preview:
  url: "https://thehackernews.com/2026/05/github-actions-supply-chain-attack.html"
  title: "GitHub Actions Supply Chain Attack Redirects Tags to Steal CI/CD Credentials"
  domain: "thehackernews.com"
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgc7jpVO6HhBuEBTjkwmNjYhKlFmhhmytOqNZHYuGP-dNWrf3AoyE68yoKj77elddOX4Ps2x9jSuwhi5sE-QjK_oEjLXgQW9e6EHx6W0G7qTqYTM3fZh1AQTyrgm2o-PFBeD9ryHnC6fDmK5MYKUzBjU_pJibTilnm1d99WSQkJux6PXXRydkYW5d15Ada-/s1600/step.jpg"
iocs:
  - id: "GitHub-Actions-Supply-Chain-Attack"
    type: "Supply Chain Attack"
    indicator: "Compromised GitHub Actions workflow: actions-cool/issues-helper"
  - id: "GitHub-Actions-Supply-Chain-Attack"
    type: "Information Disclosure"
    indicator: "Harvesting of sensitive CI/CD credentials"
  - id: "GitHub-Actions-Supply-Chain-Attack"
    type: "Code Injection"
    indicator: "Malicious code execution within GitHub Actions workflow"
  - id: "GitHub-Actions-Supply-Chain-Attack"
    type: "Misconfiguration"
    indicator: "Repository tags redirected to imposter commits"
mitre_attack:
  - id: "T1195.002"
    name: "Compromise Software Supply Chain"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1195/002/"
  - id: "T1071.004"
    name: "Web Protocols"
    tactic: "Command and Control"
    url: "https://attack.mitre.org/techniques/T1071/004/"
  - id: "T1552.004"
    name: "Credentials In Files"
    tactic: "Credential Access"
    url: "https://attack.mitre.org/techniques/T1552/004/"
sigma_rules:
  count: 3
  free_count: 1
  paid_count: 2
  preview_title: "GitHub Actions Supply Chain Compromise - actions-cool/issues-helper Tag Manipulation"
  preview_level: "critical"
  preview_technique: "T1190"
  preview_tactic: "Initial Access"
  preview_yaml_b64: "dGl0bGU6IEdpdEh1YiBBY3Rpb25zIFN1cHBseSBDaGFpbiBDb21wcm9taXNlIC0gYWN0aW9ucy1jb29sL2lzc3Vlcy1oZWxwZXIgVGFnIE1hbmlwdWxhdGlvbgppZDogc2N3LTIwMjYtMDUtMTktYWktMQpzdGF0dXM6IGV4cGVyaW1lbnRhbApsZXZlbDogY3JpdGljYWwKZGVzY3JpcHRpb246IHwKICBEZXRlY3RzIHRoZSB1c2Ugb2YgdGhlIGNvbXByb21pc2VkIEdpdEh1YiBBY3Rpb25zIHdvcmtmbG93ICdhY3Rpb25zLWNvb2wvaXNzdWVzLWhlbHBlcicuIFRoaXMgcnVsZSBzcGVjaWZpY2FsbHkgdGFyZ2V0cyB0aGUga25vd24gY29tcHJvbWlzZWQgY29tcG9uZW50IHVzZWQgaW4gdGhlIHN1cHBseSBjaGFpbiBhdHRhY2sgdG8gaW5qZWN0IG1hbGljaW91cyBjb2RlIGJ5IG1hbmlwdWxhdGluZyByZXBvc2l0b3J5IHRhZ3MuCmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChBSS1nZW5lcmF0ZWQpCmRhdGU6IDIwMjYtMDUtMTkKcmVmZXJlbmNlczoKICAtIGh0dHBzOi8vc2hpbWlzY3liZXJ3b3JsZC5jb20vX3Bvc3RzLzIwMjYtMDUtMTktZ2l0aHViLWFjdGlvbnMtc3VwcGx5LWNoYWluLWF0dGFjay1yZWRpcmVjdHMtdGFncy10by1zdGVhbC1jLWNsajVzCnRhZ3M6CiAgLSBhdHRhY2suaW5pdGlhbF9hY2Nlc3MKICAtIGF0dGFjay50MTE5MApsb2dzb3VyY2U6CiAgICBjYXRlZ29yeTogcHJvY2Vzc19jcmVhdGlvbgpkZXRlY3Rpb246CiAgc2VsZWN0aW9uOgogICAgICBDb21tYW5kTGluZXxjb250YWluczoKICAgICAgICAgIC0gJ2FjdGlvbnMtY29vbC9pc3N1ZXMtaGVscGVyJwogICAgICBjb25kaXRpb246IHNlbGVjdGlvbgpmYWxzZXBvc2l0aXZlczoKICAtIExlZ2l0aW1hdGUgYWRtaW5pc3RyYXRpdmUgYWN0aXZpdHk="
  all_rules_b64: "W3sidGl0bGUiOiJHaXRIdWIgQWN0aW9ucyBTdXBwbHkgQ2hhaW4gQ29tcHJvbWlzZSAtIGFjdGlvbnMtY29vbC9pc3N1ZXMtaGVscGVyIFRhZyBNYW5pcHVsYXRpb24iLCJsZXZlbCI6ImNyaXRpY2FsIiwidGVjaG5pcXVlIjoiVDExOTAiLCJ0YWN0aWMiOiJJbml0aWFsIEFjY2VzcyIsInRpZXIiOiJmcmVlIiwieWFtbCI6InRpdGxlOiBHaXRIdWIgQWN0aW9ucyBTdXBwbHkgQ2hhaW4gQ29tcHJvbWlzZSAtIGFjdGlvbnMtY29vbC9pc3N1ZXMtaGVscGVyIFRhZyBNYW5pcHVsYXRpb25cbmlkOiBzY3ctMjAyNi0wNS0xOS1haS0xXG5zdGF0dXM6IGV4cGVyaW1lbnRhbFxubGV2ZWw6IGNyaXRpY2FsXG5kZXNjcmlwdGlvbjogfFxuICBEZXRlY3RzIHRoZSB1c2Ugb2YgdGhlIGNvbXByb21pc2VkIEdpdEh1YiBBY3Rpb25zIHdvcmtmbG93ICdhY3Rpb25zLWNvb2wvaXNzdWVzLWhlbHBlcicuIFRoaXMgcnVsZSBzcGVjaWZpY2FsbHkgdGFyZ2V0cyB0aGUga25vd24gY29tcHJvbWlzZWQgY29tcG9uZW50IHVzZWQgaW4gdGhlIHN1cHBseSBjaGFpbiBhdHRhY2sgdG8gaW5qZWN0IG1hbGljaW91cyBjb2RlIGJ5IG1hbmlwdWxhdGluZyByZXBvc2l0b3J5IHRhZ3MuXG5hdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNS0xOVxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTE5LWdpdGh1Yi1hY3Rpb25zLXN1cHBseS1jaGFpbi1hdHRhY2stcmVkaXJlY3RzLXRhZ3MtdG8tc3RlYWwtYy1jbGo1c1xudGFnczpcbiAgLSBhdHRhY2suaW5pdGlhbF9hY2Nlc3NcbiAgLSBhdHRhY2sudDExOTBcbmxvZ3NvdXJjZTpcbiAgICBjYXRlZ29yeTogcHJvY2Vzc19jcmVhdGlvblxuZGV0ZWN0aW9uOlxuICBzZWxlY3Rpb246XG4gICAgICBDb21tYW5kTGluZXxjb250YWluczpcbiAgICAgICAgICAtICdhY3Rpb25zLWNvb2wvaXNzdWVzLWhlbHBlcidcbiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uXG5mYWxzZXBvc2l0aXZlczpcbiAgLSBMZWdpdGltYXRlIGFkbWluaXN0cmF0aXZlIGFjdGl2aXR5In0seyJ0aXRsZSI6IkdpdEh1YiBBY3Rpb25zIFN1cHBseSBDaGFpbiBBdHRhY2sgLSBFeGZpbHRyYXRpb24gdG8gQXR0YWNrZXIgQ29udHJvbGxlZCBTZXJ2ZXIiLCJsZXZlbCI6ImhpZ2giLCJ0ZWNobmlxdWUiOiJUMTA0MSIsInRhY3RpYyI6IkV4ZmlsdHJhdGlvbiIsInRpZXIiOiJwYWlkIiwieWFtbCI6InRpdGxlOiBHaXRIdWIgQWN0aW9ucyBTdXBwbHkgQ2hhaW4gQXR0YWNrIC0gRXhmaWx0cmF0aW9uIHRvIEF0dGFja2VyIENvbnRyb2xsZWQgU2VydmVyXG5pZDogc2N3LTIwMjYtMDUtMTktYWktMlxuc3RhdHVzOiBleHBlcmltZW50YWxcbmxldmVsOiBoaWdoXG5kZXNjcmlwdGlvbjogfFxuICBNb25pdG9ycyBmb3Igc3VjY2Vzc2Z1bCBIVFRQIFBPU1QgcmVxdWVzdHMgKHN0YXR1cyAyMDAgb3IgMjA0KSB0byBrbm93biBvciBzdXNwZWN0ZWQgYXR0YWNrZXItY29udHJvbGxlZCBkb21haW5zLiBUaGlzIGlzIGluZGljYXRpdmUgb2YgZXhmaWx0cmF0aW9uIG9mIHN0b2xlbiBDSS9DRCBjcmVkZW50aWFscywgYSBrZXkgb2JqZWN0aXZlIG9mIHRoZSBhY3Rpb25zLWNvb2wvaXNzdWVzLWhlbHBlciBzdXBwbHkgY2hhaW4gYXR0YWNrLlxuYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKEFJLWdlbmVyYXRlZClcbmRhdGU6IDIwMjYtMDUtMTlcbnJlZmVyZW5jZXM6XG4gIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNS0xOS1naXRodWItYWN0aW9ucy1zdXBwbHktY2hhaW4tYXR0YWNrLXJlZGlyZWN0cy10YWdzLXRvLXN0ZWFsLWMtY2xqNXNcbnRhZ3M6XG4gIC0gYXR0YWNrLmV4ZmlsdHJhdGlvblxuICAtIGF0dGFjay50MTA0MVxubG9nc291cmNlOlxuICAgIGNhdGVnb3J5OiB3ZWJzZXJ2ZXJcbmRldGVjdGlvbjpcbiAgc2VsZWN0aW9uX2Jhc2U6XG4gICAgICBzYy1zdGF0dXM6XG4gICAgICAgICAgLSAnMjAwJ1xuICAgICAgICAgIC0gJzIwNCdcbiAgc2VsZWN0aW9uX2luZGljYXRvcnM6XG4gICAgICBkc3RfZG9tYWlufGNvbnRhaW5zOlxuICAgICAgICAgIC0gJ2F0dGFja2VyLWNvbnRyb2xsZWQtZG9tYWluLmNvbSdcbiAgICAgIGNvbmRpdGlvbjogc2VsZWN0aW9uX2Jhc2UgQU5EIHNlbGVjdGlvbl9pbmRpY2F0b3JzXG5mYWxzZXBvc2l0aXZlczpcbiAgLSBMZWdpdGltYXRlIGFkbWluaXN0cmF0aXZlIGFjdGl2aXR5In0seyJ0aXRsZSI6IkdpdEh1YiBBY3Rpb25zIFN1cHBseSBDaGFpbiBBdHRhY2sgLSBNYWxpY2lvdXMgQ29tbWl0IFNIQSBVc2FnZSIsImxldmVsIjoiY3JpdGljYWwiLCJ0ZWNobmlxdWUiOiJUMTE5MCIsInRhY3RpYyI6IkluaXRpYWwgQWNjZXNzIiwidGllciI6InBhaWQiLCJ5YW1sIjoidGl0bGU6IEdpdEh1YiBBY3Rpb25zIFN1cHBseSBDaGFpbiBBdHRhY2sgLSBNYWxpY2lvdXMgQ29tbWl0IFNIQSBVc2FnZVxuaWQ6IHNjdy0yMDI2LTA1LTE5LWFpLTNcbnN0YXR1czogZXhwZXJpbWVudGFsXG5sZXZlbDogY3JpdGljYWxcbmRlc2NyaXB0aW9uOiB8XG4gIERldGVjdHMgdGhlIHVzYWdlIG9mIHRoZSAnYWN0aW9ucy9jaGVja291dCcgYWN0aW9uLCB3aGljaCBpcyBvZnRlbiB0aGUgZW50cnkgcG9pbnQgZm9yIGZldGNoaW5nIGNvZGUgaW4gR2l0SHViIEFjdGlvbnMuIFRoaXMgcnVsZSBhaW1zIHRvIGZsYWcgd29ya2Zsb3dzIHRoYXQgbWlnaHQgYmUgcHVsbGluZyBjb2RlIGZyb20gYSBjb21wcm9taXNlZCB0YWcgb3IgY29tbWl0LCBlc3BlY2lhbGx5IHdoZW4gY29tYmluZWQgd2l0aCBvdGhlciBpbmRpY2F0b3JzIG9mIGNvbXByb21pc2UgcmVsYXRlZCB0byB0aGUgYWN0aW9ucy1jb29sL2lzc3Vlcy1oZWxwZXIgYXR0YWNrLlxuYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKEFJLWdlbmVyYXRlZClcbmRhdGU6IDIwMjYtMDUtMTlcbnJlZmVyZW5jZXM6XG4gIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNS0xOS1naXRodWItYWN0aW9ucy1zdXBwbHktY2hhaW4tYXR0YWNrLXJlZGlyZWN0cy10YWdzLXRvLXN0ZWFsLWMtY2xqNXNcbnRhZ3M6XG4gIC0gYXR0YWNrLmluaXRpYWxfYWNjZXNzXG4gIC0gYXR0YWNrLnQxMTkwXG5sb2dzb3VyY2U6XG4gICAgY2F0ZWdvcnk6IHByb2Nlc3NfY3JlYXRpb25cbmRldGVjdGlvbjpcbiAgc2VsZWN0aW9uOlxuICAgICAgQ29tbWFuZExpbmV8Y29udGFpbnM6XG4gICAgICAgICAgLSAnYWN0aW9ucy9jaGVja291dEAnXG4gICAgICBjb25kaXRpb246IHNlbGVjdGlvblxuZmFsc2Vwb3NpdGl2ZXM6XG4gIC0gTGVnaXRpbWF0ZSBhZG1pbmlzdHJhdGl2ZSBhY3Rpdml0eSJ9XQ=="
why_it_matters:
  - "If your organization uses GitHub Actions, especially `actions-cool/issues-helper`, you need to immediately audit your workflows. Crucially, shift away from referencing actions by mutable tags (e.g., `v1`, `main`) and instead pin them to immutable full-length commit SHAs. Review all logs for `actions-cool/issues-helper` for any unusual activity or outbound connections to unfamiliar domains. Assume compromise and rotate any credentials or tokens that could have been exposed through affected workflows."
bot_cta_title: "Identify Supply Chain Exposure"
bot_cta_description: "Use /brief to get an analyst-ready summary of recent supply chain attacks and their indicators."
---

Threat actors have compromised the popular GitHub Actions workflow, `actions-cool/issues-helper`, to execute malicious code designed to harvest sensitive credentials. The Hacker News reports that this supply chain attack achieves its objective by exfiltrating stolen credentials to an attacker-controlled server. This isn't a new tactic, but it highlights the persistent risk within CI/CD pipelines.

According to The Hacker News, the attackers manipulated repository tags, redirecting every existing tag to point to an imposter commit. This malicious commit was not part of the action's legitimate commit history, making detection harder. This technique allows attackers to inject their code into workflows that depend on specific tags, effectively poisoning the build process.

This incident underscores a critical vulnerability in how many organizations consume third-party GitHub Actions. Relying on mutable tags, rather than immutable commit SHAs, opens a direct path for supply chain compromise. Attackers are constantly looking for the weakest link, and CI/CD pipelines, with their elevated permissions and access to secrets, are prime targets.
