---
layout: page
title: SCW Atom Feed — Integration Schema
permalink: /feed-schema/
---

<div style="max-width:860px;margin:0 auto;padding:2rem 1rem;">

## SCW Atom Feed — Integration Schema

This document describes the structure and semantics of the **Shimi's Cyber World** Atom feed, designed for partners, aggregators, and platforms (e.g. Feedly, Inoreader, SIEMs) that want to consume or map SCW content.

---

### Feed Endpoint

| Property | Value |
|----------|-------|
| **URL** | `https://shimiscyberworld.com/feed.xml` |
| **Format** | Atom 1.0 (RFC 4287) |
| **Encoding** | UTF-8 |
| **Max entries** | 200 (most recent) |
| **Update frequency** | Every 15 minutes (automated feed engine) |
| **TLS** | Required (HTTPS only) |

---

### Namespaces

```xml
<feed xmlns="http://www.w3.org/2005/Atom"
      xmlns:scw="https://shimiscyberworld.com/ns/1.0"
      xmlns:media="http://search.yahoo.com/mrss/">
```

| Prefix | URI | Purpose |
|--------|-----|---------|
| *(default)* | `http://www.w3.org/2005/Atom` | Standard Atom elements |
| `media` | `http://search.yahoo.com/mrss/` | Thumbnails and media content |
| `scw` | `https://shimiscyberworld.com/ns/1.0` | SCW custom threat-intel fields |

---

### Feed-Level Elements

```xml
<feed>
  <title type="html">Shimi's Cyber World</title>
  <subtitle>A cyber ecosystem built around a strong community...</subtitle>
  <id>https://shimiscyberworld.com/feed.xml</id>
  <link href="https://shimiscyberworld.com/feed.xml" rel="self" type="application/atom+xml" />
  <link href="https://shimiscyberworld.com" rel="alternate" type="text/html" />
  <link href="https://t.me/Shimiscyberworldbot" rel="related" type="text/html"
        title="SCW Intel Bot — Telegram threat intel bot" />
  <updated>2026-04-14T12:00:00+03:00</updated>
  <generator uri="https://shimiscyberworld.com/" version="2.0">SCW Feed Engine</generator>
</feed>
```

---

### Entry Structure

Every `<entry>` follows this structure. Fields marked **★** are always present; fields marked **◆** are conditional.

#### Standard Atom Fields

| Element | Presence | Type | Description |
|---------|----------|------|-------------|
| `<title type="html">` | ★ | string | Post headline (max ~100 chars, AI-rewritten) |
| `<link rel="alternate">` | ★ | URL | Permalink to post on shimiscyberworld.com |
| `<published>` | ★ | ISO 8601 | Original publication timestamp |
| `<updated>` | ★ | ISO 8601 | Last update timestamp |
| `<id>` | ★ | URL | Unique identifier (same as permalink) |
| `<content type="html">` | ★ | HTML (CDATA) | Full post body in HTML |
| `<author><name>` | ★ | string | Always "Shimi's Cyber World" |
| `<summary type="html">` | ★ | HTML (CDATA) | Excerpt, max 180 chars |
| `<category term="...">` | ★ | string | One per tag — see [Tag Vocabulary](#tag-vocabulary) |

#### Media Elements (MRSS)

| Element | Presence | Type | Description |
|---------|----------|------|-------------|
| `<media:thumbnail>` | ◆ | URL | Post thumbnail image |
| `<media:content medium="image">` | ◆ | URL | Full-size post image |

#### SCW Custom Elements (`scw:` namespace)

| Element | Presence | Type | Values | Description |
|---------|----------|------|--------|-------------|
| `<scw:score>` | ◆ | enum | `LOW`, `MEDIUM`, `HIGH` | Threat relevance score |
| `<scw:event_type>` | ◆ | enum | See [Event Types](#event-types) | Classification of the security event |
| `<scw:tlp>` | ◆ | enum | `TLP:CLEAR`, `TLP:AMBER` | Traffic Light Protocol marking |
| `<scw:source_name>` | ◆ | string | e.g. "Cyber Threat Intelligence" | Original intelligence source |
| `<scw:source_url>` | ◆ | URL | e.g. `https://thehackernews.com/...` | Link to original article |
| `<scw:telegram_url>` | ◆ | URL | e.g. `https://t.me/c/...` | Original Telegram message (legacy posts) |
| `<scw:organization>` | ◆ | element | — | Org mentioned in the post (repeatable) |
| `<scw:threat_actor>` | ◆ | string | e.g. "APT28" | Named threat group (repeatable) |
| `<scw:country>` | ◆ | string | ISO 3166-1 alpha-2 | Targeted country code (repeatable) |
| `<scw:ioc>` | ◆ | element | — | Indicator of Compromise (repeatable) |
| `<scw:mitre>` | ◆ | element | — | MITRE ATT&CK technique (repeatable) |

---

### Element Details

#### `<scw:organization>`

Represents a company, agency, or entity mentioned in the post.

```xml
<scw:organization name="Microsoft" domain="microsoft.com" role="vendor" />
<scw:organization name="Colonial Pipeline" domain="colpipe.com" role="victim" />
```

| Attribute | Required | Values |
|-----------|----------|--------|
| `name` | ★ | Organization name |
| `domain` | ◆ | Primary domain (e.g. `ibm.com`) |
| `role` | ◆ | `victim`, `vendor`, `threat-actor` |

#### `<scw:ioc>`

An Indicator of Compromise extracted from the post.

```xml
<scw:ioc id="CVE-2026-40038" type="XSS" indicator="Pachno stored XSS via POST parameters" />
<scw:ioc id="CVE-2025-1234" type="RCE" indicator="Unauthenticated remote code execution" />
```

| Attribute | Required | Values |
|-----------|----------|--------|
| `id` | ★ | CVE ID or advisory identifier |
| `type` | ★ | Vulnerability type — see [IOC Types](#ioc-types) |
| `indicator` | ◆ | Human-readable description of the indicator |

#### `<scw:mitre>`

MITRE ATT&CK technique mapping for the post.

```xml
<scw:mitre id="T1190" name="Exploit Public-Facing Application" tactic="Initial Access" />
<scw:mitre id="T1059.001" name="PowerShell" tactic="Execution" />
```

| Attribute | Required | Values |
|-----------|----------|--------|
| `id` | ★ | Technique ID (e.g. `T1190`, `T1059.001`) |
| `name` | ★ | Technique name per ATT&CK |
| `tactic` | ★ | ATT&CK tactic phase |

---

### Enumerations

#### Event Types

| Value | Description |
|-------|-------------|
| `data-breach` | Data exposure or leak incident |
| `ransomware` | Ransomware attack or campaign |
| `vulnerability` | Software vulnerability disclosure |
| `espionage` | Nation-state or corporate espionage |
| `fraud` | Phishing, BEC, or financial fraud |
| `supply-chain` | Supply chain compromise |
| `defacement` | Website or service defacement |
| `advisory` | Security advisory or policy update |
| `tool-release` | New security tool or framework |
| `research` | Threat research or analysis |
| `other` | Uncategorized |

#### IOC Types

| Value | Description |
|-------|-------------|
| `RCE` | Remote Code Execution |
| `XSS` | Cross-Site Scripting |
| `SQLi` | SQL Injection |
| `SSRF` | Server-Side Request Forgery |
| `CSRF` | Cross-Site Request Forgery |
| `Auth Bypass` | Authentication Bypass |
| `Privilege Escalation` | Privilege Escalation |
| `Path Traversal` | Directory/Path Traversal |
| `Buffer Overflow` | Memory Corruption / Buffer Overflow |
| `Information Disclosure` | Sensitive Data Exposure |
| `DoS` | Denial of Service |
| `DDoS` | Distributed Denial of Service |
| `DLL Sideloading` | DLL Side-Loading Attack |
| `DLL Hijacking` | DLL Hijacking |
| `IDOR` | Insecure Direct Object Reference |
| `Data Breach` | Data Breach / Data Exposure |
| `Unrestricted File Upload` | File Upload Vulnerability |
| `Code Injection` | Generic Code Injection |

#### Tag Vocabulary

Tags appear as `<category term="...">`. Common values:

| Tag | Meaning |
|-----|---------|
| `vulnerability` | CVE or vulnerability advisory |
| `threat-intel` | Threat intelligence report |
| `data-breach` | Data breach incident |
| `ransomware` | Ransomware-related |
| `phishing` | Phishing campaigns |
| `malware` | Malware analysis |
| `apt` | Advanced Persistent Threat |
| `cisa-kev` | CISA Known Exploited Vulnerability |
| `supply-chain` | Supply chain risk |
| `iot` | Internet of Things |
| `cloud` | Cloud security |
| `zero-day` | Zero-day exploit |
| *organization name* | Slugified org name (e.g. `microsoft`, `ibm`, `fbi`) |

Tags are **not** a closed set — new tags are added automatically as new topics emerge.

---

### Score Mapping for Consumers

If you're building filters, rules, or alerts:

| SCW Score | CVSS Range | Recommended Action |
|-----------|------------|-------------------|
| `HIGH` | 7.0 – 10.0 | Alert / immediate triage |
| `MEDIUM` | 4.0 – 6.9 | Monitor / queue for review |
| `LOW` | 0.0 – 3.9 | Informational awareness |

Vulnerability posts with `cvss_score` in frontmatter include the exact numeric CVSS value in the HTML body. The `<scw:score>` Atom element reflects the tier above.

---

### Post Source Types

Posts originate from multiple intelligence pipelines:

| Source | `<scw:source_name>` examples | Content profile |
|--------|------------------------------|-----------------|
| **Telegram channels** | "Cyber Threat Intelligence", "Cyber War Zone" | Breaking news, threat alerts |
| **RSS feeds** | "The Hacker News", "BleepingComputer" | Vulnerability advisories, analysis |
| **NVD** | "National Vulnerability Database" | CVE details, CVSS scores |
| **CISA KEV** | "CISA KEV" | Known exploited vulnerabilities |

---

### Sample Entry (Full)

```xml
<entry>
  <title type="html">Critical RCE in Apache Struts CVE-2026-50001</title>
  <link href="https://shimiscyberworld.com/posts/critical-rce-in-apache-struts/"
        rel="alternate" type="text/html" />
  <published>2026-04-14T10:30:00+03:00</published>
  <updated>2026-04-14T10:30:00+03:00</updated>
  <id>https://shimiscyberworld.com/posts/critical-rce-in-apache-struts/</id>
  <content type="html" xml:base="..."><![CDATA[<p>Apache has released...</p>]]></content>
  <author><name>Shimi's Cyber World</name></author>
  <category term="vulnerability" />
  <category term="apache" />
  <category term="rce" />
  <summary type="html"><![CDATA[Apache Struts critical RCE allows unauthenticated...]]></summary>
  <media:thumbnail url="https://images.unsplash.com/photo-..." />
  <media:content medium="image" url="https://images.unsplash.com/photo-..." />
  <scw:score>HIGH</scw:score>
  <scw:event_type>vulnerability</scw:event_type>
  <scw:tlp>TLP:CLEAR</scw:tlp>
  <scw:source_name>The Hacker News</scw:source_name>
  <scw:source_url>https://thehackernews.com/2026/04/apache-struts.html</scw:source_url>
  <scw:organization name="Apache Software Foundation" domain="apache.org" role="vendor" />
  <scw:threat_actor>UNC4990</scw:threat_actor>
  <scw:country>US</scw:country>
  <scw:ioc id="CVE-2026-50001" type="RCE"
           indicator="Unauthenticated RCE via OGNL injection in Struts action mapping" />
  <scw:mitre id="T1190" name="Exploit Public-Facing Application" tactic="Initial Access" />
  <scw:mitre id="T1059.004" name="Unix Shell" tactic="Execution" />
</entry>
```

---

### Integration Quick-Start

**1. Basic RSS consumption** — subscribe to `https://shimiscyberworld.com/feed.xml` in any Atom/RSS reader.

**2. Filter by tags** — use `<category term="...">` to route posts. Example: filter `vulnerability` + `HIGH` score for critical vuln alerts.

**3. Map to your taxonomy** — use `<scw:event_type>` to map into your incident classification. Use `<scw:mitre>` for ATT&CK alignment.

**4. Enrich your platform** — extract `<scw:organization>`, `<scw:ioc>`, and `<scw:threat_actor>` for automated enrichment of your SIEM/SOAR/TIP.

**5. Rate limiting** — no rate limits, but please poll no more than once per 5 minutes.

---

### Contact

For integration questions: [shimicyberworld@gmail.com](mailto:shimicyberworld@gmail.com)

</div>
