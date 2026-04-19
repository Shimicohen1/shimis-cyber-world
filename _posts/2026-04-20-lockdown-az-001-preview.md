---
title: "Enable MFA for all users (preview)"
date: 2026-04-20 09:00:00 +0000
permalink: /lockdown-lab/lockdown-az-001-preview/
layout: lockdown
section: lockdown
channel: "Lockdown Lab"
author: shimi-cohen
lockdown_id: az-001-preview
lockdown_number: 99
platform: "azure"
platform_name: "Azure"
category: "identity"
category_name: "Identity & Access"
severity: "critical"
tags: [lockdown-lab, hardening, azure, identity, mfa, authentication]
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/lockdown/lockdown-cover.png"
summary: "A single stolen password should never be enough to compromise an Azure tenant. Microsoft's own data shows MFA blocks more than 99% of automated account-takeover attempts — yet I still walk into environments where a handful of admin accounts skipped the rollout."
hardening_url: "https://shimiscyberworld.com/hardening/#tip-az-001"
---
A single stolen password should never be enough to compromise an Azure tenant. Microsoft's own data shows MFA blocks more than 99% of automated account-takeover attempts — yet I still walk into environments where a handful of admin accounts skipped the rollout because "they kept getting locked out."

The right way to do this is not the "Per-User MFA" toggle from 2014. It's a **Conditional Access policy** scoped to *all users, all cloud apps, require MFA*. Start in **report-only mode** for 48 hours so you catch service accounts and break-glass users before you flip the switch. Document the break-glass exception, monitor it separately, and rotate its FIDO2 key quarterly.

Once the baseline policy is live, layer **Authentication Strengths** on top: require phishing-resistant MFA (FIDO2 / Windows Hello) for anyone with a privileged role. That single addition shuts down adversary-in-the-middle kits like Evilginx for your most dangerous accounts.

This is the cheapest, highest-impact identity control you will ever ship. If it is not on by Friday, nothing else on your roadmap matters.

## The fix

```
# Azure CLI — check Conditional Access policies
az rest --method get --url "https://graph.microsoft.com/v1.0/identity/conditionalAccess/policies"
# Create via Portal:
# Entra ID → Security → Conditional Access → New Policy
# Target: All users | Conditions: All apps | Grant: Require MFA
```

**Reference:** <https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-policy-all-users-mfa>
