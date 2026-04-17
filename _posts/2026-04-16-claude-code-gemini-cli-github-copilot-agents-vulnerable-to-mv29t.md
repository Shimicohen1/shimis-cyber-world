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
  count: 4
  free_count: 1
  paid_count: 3
  preview_title: "AI 'Comment and Control' Prompt Injection via Code Comments"
  preview_level: "high"
  preview_technique: "T1539"
  preview_tactic: "Execution"
  preview_yaml_b64: "dGl0bGU6IEFJICdDb21tZW50IGFuZCBDb250cm9sJyBQcm9tcHQgSW5qZWN0aW9uIHZpYSBDb2RlIENvbW1lbnRzCmlkOiBzY3ctMjAyNi0wNC0xNi1haS0xCnN0YXR1czogZXhwZXJpbWVudGFsCmxldmVsOiBoaWdoCmRlc2NyaXB0aW9uOiB8CiAgRGV0ZWN0cyB0aGUgJ0NvbW1lbnQgYW5kIENvbnRyb2wnIHByb21wdCBpbmplY3Rpb24gdGVjaG5pcXVlIHdoZXJlIG1hbGljaW91cyBwcm9tcHRzIGFyZSBlbWJlZGRlZCB3aXRoaW4gY29kZSBjb21tZW50cyBvciBtZXRhZGF0YSBwcm9jZXNzZWQgYnkgQUkgbW9kZWxzLiBUaGlzIHJ1bGUgbG9va3MgZm9yIGNvbW1vbiBwYXR0ZXJucyBvZiBwcm9tcHQgaW5qZWN0aW9uIHdpdGhpbiBjb21tYW5kIGxpbmVzIHRoYXQgbWlnaHQgYmUgZXhlY3V0ZWQgYnkgQUkgYWdlbnRzIG9yIHRvb2xzLgphdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKQpkYXRlOiAyMDI2LTA0LTE2CnJlZmVyZW5jZXM6CiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL3Bvc3RzL2NsYXVkZS1jb2RlLWdlbWluaS1jbGktZ2l0aHViLWNvcGlsb3QtYWdlbnRzLXZ1bG5lcmFibGUtdG8tbXYyOXQvCnRhZ3M6CiAgLSBhdHRhY2suZXhlY3V0aW9uCiAgLSBhdHRhY2sudDE1MzkKbG9nc291cmNlOgogICAgY2F0ZWdvcnk6IHByb2Nlc3NfY3JlYXRpb24KZGV0ZWN0aW9uOgogIHNlbGVjdGlvbjoKICAgICAgQ29tbWFuZExpbmV8Y29udGFpbnM6CiAgICAgICAgICAtICdwcm9tcHQ9IicKICAgICAgICAgIC0gJ2luc3RydWN0aW9uPSInCiAgICAgICAgICAtICdzeXN0ZW09IicKICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb24KZmFsc2Vwb3NpdGl2ZXM6CiAgLSBMZWdpdGltYXRlIGFkbWluaXN0cmF0aXZlIGFjdGl2aXR5"
why_it_matters:
  - "If your development teams are leveraging AI coding assistants like GitHub Copilot, Claude Code, or Gemini CLI, you need to understand this 'Comment and Control' prompt injection vector. Immediately review your policies for AI tool usage, especially concerning external or untrusted code snippets. Ensure your development workflows include robust validation of all AI-generated output and consider sandboxing AI agent environments to mitigate potential misuse."
bot_cta_title: "AI Security Insights & Vulnerabilities"
bot_cta_description: "Use /brief to get an analyst-ready weekly threat summary that includes new research like this."
---

A new AI attack method, dubbed 'Comment and Control,' has been detailed by a researcher, according to SecurityWeek. This technique exploits vulnerabilities in leading AI models and tools, including Claude Code, Gemini CLI, and GitHub Copilot Agents, through the seemingly innocuous medium of comments.

The core of the 'Comment and Control' attack lies in its ability to inject malicious prompts into AI models via code comments or other metadata that these models process during their operations. By manipulating how AI interprets these comments, an attacker can coerce the AI into performing unintended actions, ranging from code generation that introduces backdoors to data exfiltration or even altering the AI's behavior in critical applications. This is a classic prompt injection, just with a new vector.

SecurityWeek's report underscores that this isn't just a theoretical concern. It highlights a significant oversight in how these AI tools parse and sanitize input, especially within development environments where comments are a ubiquitous part of the workflow. The implications for secure software development and AI-powered automation are considerable, as these tools are increasingly integrated into critical infrastructure and enterprise operations.
