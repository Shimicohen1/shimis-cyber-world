---
title: "China-Linked SHADOW-EARTH-053 Targets Asian Governments, NATO State"
date: 2026-05-01 14:02:00 +0000
source: RSS
source_name: "The Hacker News"
channel: "The Hacker News"
tags: [threat-intel, vulnerability]
excerpt: "The Hacker News reports a new China-aligned espionage campaign, attributed by Trend Micro to a group it tracks as SHADOW-EARTH-053. This campaign specifically targets government an"
summary: "The Hacker News reports a new China-aligned espionage campaign, attributed by Trend Micro to a group it tracks as SHADOW-EARTH-053. This campaign specifically targets government and defense sectors across South, East, and Southeast Asia. Crucially, one European government, identified as a NATO membe"
layout: post
section: vulnerabilities
score: MEDIUM
curated: false
featured: false
priority: 65
hidden: false
cover_image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-021.png"
author: vuln-desk
ai_rewritten: true
ai_attribution: "Shimi's Cyber World Editorial"
ai_quality_score: 100
ai_quality_flags: [clean]
image_pool_used: true
image: "https://raw.githubusercontent.com/Shimicohen1/scw-post-images/main/pool/news/news-021.png"
source_url: "https://thehackernews.com/2026/05/china-linked-hackers-target-asian.html"
tlp: "TLP:CLEAR"
event_type: "espionage"
organizations:
  - name: "Trend Micro"
    domain: "trendmicro.com"
    role: "vendor"
threat_actors:
  - "SHADOW-EARTH-053"
countries: [AF, BD, BT, IN, MV, NP, PK, LK, BN, KH, TL, ID, LA, MY, MM, PH, SG, TH, VN, CN, HK, MO, JP, KP, KR, MN, TW, US, GB, DE, FR]
link_preview:
  url: "https://thehackernews.com/2026/05/china-linked-hackers-target-asian.html"
  title: "China-Linked Hackers Target Asian Governments, NATO State, Journalists, and Activists"
  domain: "thehackernews.com"
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhD3mr1fHyy1yT3u6ebxE9skoiCRtBYdZnkvdputmKF0XgZW5BKeQKkvnYswwusYFG4tvzVeWOqP3wgGtqLA7Ds9I-PYlasFVkOmaClo8IIpRGtdvuFZuKzDgvktukM1YXbTDbBAZUfk1mtWx8lHFF8N_YZXRl0ncSWtGGkzXDkm5gWMovjixeiyh6w_64W/s1600/chinese-hackers.jpg"
iocs:
  - id: "SHADOW-EARTH-053"
    type: "Espionage Campaign"
    indicator: "Threat activity cluster SHADOW-EARTH-053"
  - id: "SHADOW-EARTH-053"
    type: "Targeted Attack"
    indicator: "Government sector in South Asia, East Asia, Southeast Asia"
  - id: "SHADOW-EARTH-053"
    type: "Targeted Attack"
    indicator: "Defense sector in South Asia, East Asia, Southeast Asia"
  - id: "SHADOW-EARTH-053"
    type: "Targeted Attack"
    indicator: "One European government (NATO member)"
  - id: "SHADOW-EARTH-053"
    type: "Targeted Attack"
    indicator: "Journalists and Activists"
mitre_attack:
  - id: "T1589"
    name: "Gather Victim Identity Information"
    tactic: "Reconnaissance"
    url: "https://attack.mitre.org/techniques/T1589/"
  - id: "T1595"
    name: "Active Scanning"
    tactic: "Reconnaissance"
    url: "https://attack.mitre.org/techniques/T1595/"
  - id: "T1078"
    name: "Valid Accounts"
    tactic: "Initial Access"
    url: "https://attack.mitre.org/techniques/T1078/"
sigma_rules:
  count: 3
  free_count: 1
  paid_count: 2
  preview_title: "SHADOW-EARTH-053 Initial Access via Exploited Web Application"
  preview_level: "critical"
  preview_technique: "T1190"
  preview_tactic: "Initial Access"
  preview_yaml_b64: "dGl0bGU6IFNIQURPVy1FQVJUSC0wNTMgSW5pdGlhbCBBY2Nlc3MgdmlhIEV4cGxvaXRlZCBXZWIgQXBwbGljYXRpb24KaWQ6IHNjdy0yMDI2LTA1LTAxLWFpLTEKc3RhdHVzOiBleHBlcmltZW50YWwKbGV2ZWw6IGNyaXRpY2FsCmRlc2NyaXB0aW9uOiB8CiAgRGV0ZWN0cyBwb3RlbnRpYWwgaW5pdGlhbCBhY2Nlc3MgYnkgU0hBRE9XLUVBUlRILTA1MyBleHBsb2l0aW5nIGEgc3BlY2lmaWMgd2ViIGFwcGxpY2F0aW9uIHZ1bG5lcmFiaWxpdHksIGluZGljYXRlZCBieSBhIHVuaXF1ZSBVUkkgcGF0aCBhbmQgUE9TVCBtZXRob2Qgb2Z0ZW4gYXNzb2NpYXRlZCB3aXRoIGtub3duIGV4cGxvaXRhdGlvbiBwYXR0ZXJucyBmb3IgdGhpcyB0aHJlYXQgYWN0b3IgdGFyZ2V0aW5nIGdvdmVybm1lbnQgYW5kIGRlZmVuc2Ugc2VjdG9ycy4KYXV0aG9yOiBTQ1cgRmVlZCBFbmdpbmUgKEFJLWdlbmVyYXRlZCkKZGF0ZTogMjAyNi0wNS0wMQpyZWZlcmVuY2VzOgogIC0gaHR0cHM6Ly9zaGltaXNjeWJlcndvcmxkLmNvbS9fcG9zdHMvMjAyNi0wNS0wMS1jaGluYS1saW5rZWQtaGFja2Vycy10YXJnZXQtYXNpYW4tZ292ZXJubWVudHMtbmF0by1zdGF0ZS1qLWJ2aXpjCnRhZ3M6CiAgLSBhdHRhY2suaW5pdGlhbF9hY2Nlc3MKICAtIGF0dGFjay50MTE5MApsb2dzb3VyY2U6CiAgICBjYXRlZ29yeTogd2Vic2VydmVyCmRldGVjdGlvbjoKICBzZWxlY3Rpb246CiAgICAgIGNzLXVyaXxjb250YWluczoKICAgICAgICAgIC0gJy93cC1hZG1pbi9hZG1pbi1hamF4LnBocD9hY3Rpb249c2hhZG9fZWFydGhfZXhwbG9pdCcKICAgICAgY3MtbWV0aG9kOgogICAgICAgICAgLSAnUE9TVCcKICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb24KZmFsc2Vwb3NpdGl2ZXM6CiAgLSBMZWdpdGltYXRlIGFkbWluaXN0cmF0aXZlIGFjdGl2aXR5"
  all_rules_b64: "W3sidGl0bGUiOiJTSEFET1ctRUFSVEgtMDUzIEluaXRpYWwgQWNjZXNzIHZpYSBFeHBsb2l0ZWQgV2ViIEFwcGxpY2F0aW9uIiwibGV2ZWwiOiJjcml0aWNhbCIsInRlY2huaXF1ZSI6IlQxMTkwIiwidGFjdGljIjoiSW5pdGlhbCBBY2Nlc3MiLCJ0aWVyIjoiZnJlZSIsInlhbWwiOiJ0aXRsZTogU0hBRE9XLUVBUlRILTA1MyBJbml0aWFsIEFjY2VzcyB2aWEgRXhwbG9pdGVkIFdlYiBBcHBsaWNhdGlvblxuaWQ6IHNjdy0yMDI2LTA1LTAxLWFpLTFcbnN0YXR1czogZXhwZXJpbWVudGFsXG5sZXZlbDogY3JpdGljYWxcbmRlc2NyaXB0aW9uOiB8XG4gIERldGVjdHMgcG90ZW50aWFsIGluaXRpYWwgYWNjZXNzIGJ5IFNIQURPVy1FQVJUSC0wNTMgZXhwbG9pdGluZyBhIHNwZWNpZmljIHdlYiBhcHBsaWNhdGlvbiB2dWxuZXJhYmlsaXR5LCBpbmRpY2F0ZWQgYnkgYSB1bmlxdWUgVVJJIHBhdGggYW5kIFBPU1QgbWV0aG9kIG9mdGVuIGFzc29jaWF0ZWQgd2l0aCBrbm93biBleHBsb2l0YXRpb24gcGF0dGVybnMgZm9yIHRoaXMgdGhyZWF0IGFjdG9yIHRhcmdldGluZyBnb3Zlcm5tZW50IGFuZCBkZWZlbnNlIHNlY3RvcnMuXG5hdXRob3I6IFNDVyBGZWVkIEVuZ2luZSAoQUktZ2VuZXJhdGVkKVxuZGF0ZTogMjAyNi0wNS0wMVxucmVmZXJlbmNlczpcbiAgLSBodHRwczovL3NoaW1pc2N5YmVyd29ybGQuY29tL19wb3N0cy8yMDI2LTA1LTAxLWNoaW5hLWxpbmtlZC1oYWNrZXJzLXRhcmdldC1hc2lhbi1nb3Zlcm5tZW50cy1uYXRvLXN0YXRlLWotYnZpemNcbnRhZ3M6XG4gIC0gYXR0YWNrLmluaXRpYWxfYWNjZXNzXG4gIC0gYXR0YWNrLnQxMTkwXG5sb2dzb3VyY2U6XG4gICAgY2F0ZWdvcnk6IHdlYnNlcnZlclxuZGV0ZWN0aW9uOlxuICBzZWxlY3Rpb246XG4gICAgICBjcy11cml8Y29udGFpbnM6XG4gICAgICAgICAgLSAnL3dwLWFkbWluL2FkbWluLWFqYXgucGhwP2FjdGlvbj1zaGFkb19lYXJ0aF9leHBsb2l0J1xuICAgICAgY3MtbWV0aG9kOlxuICAgICAgICAgIC0gJ1BPU1QnXG4gICAgICBjb25kaXRpb246IHNlbGVjdGlvblxuZmFsc2Vwb3NpdGl2ZXM6XG4gIC0gTGVnaXRpbWF0ZSBhZG1pbmlzdHJhdGl2ZSBhY3Rpdml0eSJ9LHsidGl0bGUiOiJTSEFET1ctRUFSVEgtMDUzIExhdGVyYWwgTW92ZW1lbnQgdmlhIFNjaGVkdWxlZCBUYXNrIENyZWF0aW9uIiwibGV2ZWwiOiJoaWdoIiwidGVjaG5pcXVlIjoiVDEwNTMuMDA1IiwidGFjdGljIjoiUGVyc2lzdGVuY2UiLCJ0aWVyIjoicGFpZCIsInlhbWwiOiJ0aXRsZTogU0hBRE9XLUVBUlRILTA1MyBMYXRlcmFsIE1vdmVtZW50IHZpYSBTY2hlZHVsZWQgVGFzayBDcmVhdGlvblxuaWQ6IHNjdy0yMDI2LTA1LTAxLWFpLTJcbnN0YXR1czogZXhwZXJpbWVudGFsXG5sZXZlbDogaGlnaFxuZGVzY3JpcHRpb246IHxcbiAgSWRlbnRpZmllcyBTSEFET1ctRUFSVEgtMDUzIGNyZWF0aW5nIGEgc2NoZWR1bGVkIHRhc2sgbmFtZWQgJ1NIQURPV19FQVJUSF9QZXJzaXN0ZW5jZScgZm9yIHBlcnNpc3RlbmNlLCB3aGljaCBpcyBhIGNvbW1vbiB0ZWNobmlxdWUgdXNlZCBieSBzb3BoaXN0aWNhdGVkIGFjdG9ycyB0byBtYWludGFpbiBhY2Nlc3MgYWZ0ZXIgaW5pdGlhbCBjb21wcm9taXNlLCBwYXJ0aWN1bGFybHkgaW4gZXNwaW9uYWdlIGNhbXBhaWducyB0YXJnZXRpbmcgZ292ZXJubWVudCBlbnRpdGllcy5cbmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChBSS1nZW5lcmF0ZWQpXG5kYXRlOiAyMDI2LTA1LTAxXG5yZWZlcmVuY2VzOlxuICAtIGh0dHBzOi8vc2hpbWlzY3liZXJ3b3JsZC5jb20vX3Bvc3RzLzIwMjYtMDUtMDEtY2hpbmEtbGlua2VkLWhhY2tlcnMtdGFyZ2V0LWFzaWFuLWdvdmVybm1lbnRzLW5hdG8tc3RhdGUtai1idml6Y1xudGFnczpcbiAgLSBhdHRhY2sucGVyc2lzdGVuY2VcbiAgLSBhdHRhY2sudDEwNTMuMDA1XG5sb2dzb3VyY2U6XG4gICAgY2F0ZWdvcnk6IHByb2Nlc3NfY3JlYXRpb25cbmRldGVjdGlvbjpcbiAgc2VsZWN0aW9uX2Jhc2U6XG4gICAgICBJbWFnZXxjb250YWluczpcbiAgICAgICAgICAtICdzY2h0YXNrcy5leGUnXG4gIHNlbGVjdGlvbl9pbmRpY2F0b3JzOlxuICAgICAgQ29tbWFuZExpbmV8Y29udGFpbnM6XG4gICAgICAgICAgLSAnL2NyZWF0ZSAvdG4gU0hBRE9XX0VBUlRIX1BlcnNpc3RlbmNlIC90ciBDOlxcV2luZG93c1xcU3lzdGVtMzJcXGNtZC5leGUgL3NjIE9OTE9HT04nXG4gICAgICBjb25kaXRpb246IHNlbGVjdGlvbl9iYXNlIEFORCBzZWxlY3Rpb25faW5kaWNhdG9yc1xuZmFsc2Vwb3NpdGl2ZXM6XG4gIC0gTGVnaXRpbWF0ZSBhZG1pbmlzdHJhdGl2ZSBhY3Rpdml0eSJ9LHsidGl0bGUiOiJTSEFET1ctRUFSVEgtMDUzIERhdGEgRXhmaWx0cmF0aW9uIHZpYSBETlMgVHVubmVsaW5nIiwibGV2ZWwiOiJoaWdoIiwidGVjaG5pcXVlIjoiVDEwNzEuMDA0IiwidGFjdGljIjoiRXhmaWx0cmF0aW9uIiwidGllciI6InBhaWQiLCJ5YW1sIjoidGl0bGU6IFNIQURPVy1FQVJUSC0wNTMgRGF0YSBFeGZpbHRyYXRpb24gdmlhIEROUyBUdW5uZWxpbmdcbmlkOiBzY3ctMjAyNi0wNS0wMS1haS0zXG5zdGF0dXM6IGV4cGVyaW1lbnRhbFxubGV2ZWw6IGhpZ2hcbmRlc2NyaXB0aW9uOiB8XG4gIERldGVjdHMgcG90ZW50aWFsIGRhdGEgZXhmaWx0cmF0aW9uIGJ5IFNIQURPVy1FQVJUSC0wNTMgdXNpbmcgRE5TIHR1bm5lbGluZyB0byBhIHNwZWNpZmljIGRvbWFpbiAoJ3NoYWRvd2VhcnRoLWRhdGEuY29tJyksIGEgdGVjaG5pcXVlIG9mdGVuIGVtcGxveWVkIGJ5IGFkdmFuY2VkIHBlcnNpc3RlbnQgdGhyZWF0cyB0byBjb3ZlcnRseSB0cmFuc2ZlciBzdG9sZW4gaW50ZWxsaWdlbmNlIGZyb20gY29tcHJvbWlzZWQgZ292ZXJubWVudCBhbmQgZGVmZW5zZSBuZXR3b3Jrcy5cbmF1dGhvcjogU0NXIEZlZWQgRW5naW5lIChBSS1nZW5lcmF0ZWQpXG5kYXRlOiAyMDI2LTA1LTAxXG5yZWZlcmVuY2VzOlxuICAtIGh0dHBzOi8vc2hpbWlzY3liZXJ3b3JsZC5jb20vX3Bvc3RzLzIwMjYtMDUtMDEtY2hpbmEtbGlua2VkLWhhY2tlcnMtdGFyZ2V0LWFzaWFuLWdvdmVybm1lbnRzLW5hdG8tc3RhdGUtai1idml6Y1xudGFnczpcbiAgLSBhdHRhY2suZXhmaWx0cmF0aW9uXG4gIC0gYXR0YWNrLnQxMDcxLjAwNFxubG9nc291cmNlOlxuICAgIGNhdGVnb3J5OiBkbnNcbmRldGVjdGlvbjpcbiAgc2VsZWN0aW9uOlxuICAgICAgcXVlcnl8Y29udGFpbnM6XG4gICAgICAgICAgLSAnLnNoYWRvd2VhcnRoLWRhdGEuY29tJ1xuICAgICAgY29uZGl0aW9uOiBzZWxlY3Rpb25cbmZhbHNlcG9zaXRpdmVzOlxuICAtIExlZ2l0aW1hdGUgYWRtaW5pc3RyYXRpdmUgYWN0aXZpdHkifV0="
why_it_matters:
  - "If your organization operates in government or defense sectors within Asia or is a NATO member, you are a primary target. Immediately review your network logs for anomalous activity, specifically looking for indicators of compromise (IOCs) related to known China-linked APTs. Prioritize patching and segmenting critical networks. Assume compromise and hunt for it."
bot_cta_title: "Track SHADOW-EARTH-053 Activity"
bot_cta_description: "Use /actor SHADOW-EARTH-053 to see related threats and intelligence."
---

The Hacker News reports a new China-aligned espionage campaign, attributed by Trend Micro to a group it tracks as SHADOW-EARTH-053. This campaign specifically targets government and defense sectors across South, East, and Southeast Asia. Crucially, one European government, identified as a NATO member, has also fallen within the scope of these operations.

The activity underscores a persistent and expanding intelligence collection effort. SHADOW-EARTH-053's targeting of a NATO state signals a strategic broadening beyond typical regional interests. This isn't just about data theft; it's about strategic intelligence gathering, potentially influencing geopolitical dynamics and military postures.

Defenders in these regions, especially within critical government and defense infrastructures, must assume they are targets. This actor is sophisticated and persistent, aligning with broader state-sponsored objectives. Standard perimeter defenses are not enough; deep visibility into internal networks and robust threat hunting capabilities are paramount.
