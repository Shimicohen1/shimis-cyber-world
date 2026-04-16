---
title: "AI Agents Vulnerable to 'Comment and Control' Prompt Injection"
date: 2026-04-16 08:33:54 +0000
source: RSS
source_name: "SecurityWeek"
channel: "SecurityWeek"
tags: [threat-intel, vulnerability, ai-security, tools]
excerpt: "A new AI attack method, dubbed 'Comment and Control,' has been detailed by a researcher, according to SecurityWeek. This technique exploits vulnerabilities in leading AI models and"
summary: "A new AI attack method, dubbed 'Comment and Control,' has been detailed by a researcher, according to SecurityWeek. This technique exploits vulnerabilities in leading AI models and tools, including Claude Code, Gemini CLI, and GitHub Copilot Agents, through the seemingly innocuous medium of comments"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://images.unsplash.com/photo-1753998941540-081eed4f6397?w=800&h=400&fit=crop&auto=format&q=80"
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://images.unsplash.com/photo-1753998941540-081eed4f6397?w=800&h=400&fit=crop&auto=format&q=80"
source_url: "https://www.securityweek.com/claude-code-gemini-cli-github-copilot-agents-vulnerable-to-prompt-injection-via-comments/"
tlp: "TLP:CLEAR"
event_type: "vulnerability"
organizations:
  - name: "Claude Code"
    domain: "anthropic.com"
    role: "vendor"
  - name: "Gemini CLI"
    domain: "google.com"
    role: "vendor"
  - name: "GitHub Copilot Agents"
    domain: "github.com"
    role: "vendor"
iocs:
  - id: "SecurityWeek-Prompt-Injection"
    type: "Prompt Injection"
    indicator: "Claude Code"
  - id: "SecurityWeek-Prompt-Injection"
    type: "Prompt Injection"
    indicator: "Gemini CLI"
  - id: "SecurityWeek-Prompt-Injection"
    type: "Prompt Injection"
    indicator: "GitHub Copilot Agents"
  - id: "SecurityWeek-Prompt-Injection"
    type: "Prompt Injection"
    indicator: "Attack method: 'Comment and Control'"
mitre_attack:
  - id: "T1539"
    name: "Steal or Modify Tool Output"
    tactic: "Defense Evasion"
    url: "https://attack.mitre.org/techniques/T1539/"
  - id: "T1059.001"
    name: "PowerShell"
    tactic: "Execution"
    url: "https://attack.mitre.org/techniques/T1059/001/"
  - id: "T1566.002"
    name: "Spearphishing Attachment"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1566/002/"
sigma_rules:
  count: 1
  free_count: 1
  paid_count: 0
  preview_title: "Exploitation Attempt — Claude Code"
  preview_level: "high"
  preview_technique: "vulnerability"
  preview_tactic: "event-type"
  preview_yaml_b64: "dGl0bGU6IEV4cGxvaXRhdGlvbiBBdHRlbXB0IOKAlCBDbGF1ZGUgQ29kZQppZDogc2N3LTIwMjYtMDQtMTYtZXZ0LTEKc3RhdHVzOiBleHBlcmltZW50YWwKbGV2ZWw6IGhpZ2gKZGVzY3JpcHRpb246IHwKICBNb25pdG9yIGZvciBleHBsb2l0YXRpb24gYXR0ZW1wdHMgdGFyZ2V0aW5nIENWRS1YWFhYLVhYWFhYLiBQYXRjaCBpbW1lZGlhdGVseSBpZiBydW5uaW5nIGFmZmVjdGVkIENsYXVkZSBDb2RlIHByb2R1Y3RzLgphdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoYXV0by1nZW5lcmF0ZWQpCmRhdGU6IDIwMjYtMDQtMTYKcmVmZXJlbmNlczoKICAtIGh0dHBzOi8vc2hpbWlzY3liZXJ3b3JsZC5jb20vX3Bvc3RzLzIwMjYtMDQtMTYtY2xhdWRlLWNvZGUtZ2VtaW5pLWNsaS1naXRodWItY29waWxvdC1hZ2VudHMtdnVsbmVyYWJsZS10by1tdjI5dAp0YWdzOgogIC0gYXR0YWNrLmdlbmVyYWwKICAtIGF0dGFjay52dWxuZXJhYmlsaXR5CmxvZ3NvdXJjZToKICAgIGNhdGVnb3J5OiB3ZWJzZXJ2ZXIKZGV0ZWN0aW9uOgogIHNlbGVjdGlvbjoKICAgICAgY3MtdXJpLXF1ZXJ5fGNvbnRhaW5zOgogICAgICAgIC0gJycKICAgICAgc2Mtc3RhdHVzOgogICAgICAgIC0gMjAwCiAgICAgICAgLSA1MDAKICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb24KZmFsc2Vwb3NpdGl2ZXM6CiAgLSBMZWdpdGltYXRlIGFjdGl2aXR5IGZyb20gQ2xhdWRlIENvZGU="
why_it_matters:
  - "If your development teams are leveraging AI coding assistants like GitHub Copilot, Claude Code, or Gemini CLI, you need to understand this 'Comment and Control' prompt injection vector. Immediately review your policies for AI tool usage, especially concerning external or untrusted code snippets. Ensure your development workflows include robust validation of all AI-generated output and consider sandboxing AI agent environments to mitigate potential misuse."
bot_cta_title: "AI Security Insights & Vulnerabilities"
bot_cta_description: "Use /brief to get an analyst-ready weekly threat summary that includes new research like this."
---

A new AI attack method, dubbed 'Comment and Control,' has been detailed by a researcher, according to SecurityWeek. This technique exploits vulnerabilities in leading AI models and tools, including Claude Code, Gemini CLI, and GitHub Copilot Agents, through the seemingly innocuous medium of comments.

The core of the 'Comment and Control' attack lies in its ability to inject malicious prompts into AI models via code comments or other metadata that these models process during their operations. By manipulating how AI interprets these comments, an attacker can coerce the AI into performing unintended actions, ranging from code generation that introduces backdoors to data exfiltration or even altering the AI's behavior in critical applications. This is a classic prompt injection, just with a new vector.

SecurityWeek's report underscores that this isn't just a theoretical concern. It highlights a significant oversight in how these AI tools parse and sanitize input, especially within development environments where comments are a ubiquitous part of the workflow. The implications for secure software development and AI-powered automation are considerable, as these tools are increasingly integrated into critical infrastructure and enterprise operations.
