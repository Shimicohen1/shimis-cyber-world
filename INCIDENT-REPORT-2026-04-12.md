# Incident Report: Feed Engine Content Loss

**Date:** April 11-12, 2026  
**Severity:** Medium  
**Duration:** ~18 hours (approx. Apr 11 01:00 – Apr 12 06:00 UTC)  
**Engine versions affected:** v110 → v116  
**Status:** Resolved (v124)

---

## Summary

Aggressive content filters introduced in v110-v111 caused the feed engine to silently consume Telegram messages without publishing them. After filter revert in v116, messages remained lost because `lastSeen.json` had already advanced past them.

## Timeline

| Time (approx.) | Event |
|-----------------|-------|
| Apr 10, late | v110-v111 deployed with 3 new filter layers |
| Apr 11, 01:00 | Last post published before filters took effect |
| Apr 11, 01:00–17:00 | Engine polling normally, consuming messages, advancing `lastSeen` — but filters rejecting everything |
| Apr 11, ~17:00 | Problem noticed: 0 posts in 16+ hours |
| Apr 11, ~18:00 | All 3 filter layers reverted (v116) — but `lastSeen` already past lost messages |
| Apr 11, 18:00–22:00 | Diagnostic endpoints added (v117-v122) since Azure logs API broken |
| Apr 11, ~22:00 | Root cause confirmed: `lastSeen` advancement without publishing |
| Apr 11, ~23:00 | First rollback (v123): 3 posts recovered |
| Apr 12, ~05:30 | Second rollback (v124): 3 more posts recovered, dedup caches cleared |
| Apr 12, ~06:00 | Engine fully operational, normal publishing resumed |

## Root Cause

Three filter layers were added simultaneously in v110-v111:

1. **NON_NEWS_PATTERNS** (`filters.js`) — regex patterns rejecting forum-style content
2. **AI Content Gate** (`ai-settings.json`) — Gemini prompt instructing AI to reject non-news
3. **AI Reject Handler** (`rewriter.js`) — code path to skip posts when AI returns "[REJECT]"

These filters acted in cascade: almost every message was rejected by at least one layer. However, the engine still advanced `lastSeen.json` for each consumed message, marking them as "processed" despite never publishing them.

After reverting filters in v116, the engine resumed with `lastSeen` pointing past all lost messages — it never re-read them.

## Impact

| Metric | Value |
|--------|-------|
| Hours without posts | ~18 |
| Normal daily output | ~85-105 posts/day |
| Estimated messages consumed without publishing | ~80-100 |
| Messages successfully recovered via rollback | 6 |
| Messages legitimately filtered (LOW score, duplicates) | 3 |
| CVE Notify messages in gap (all MEDIUM severity) | 32 (correctly filtered by pre-existing CVE-HIGH policy) |

## Recovery Actions

1. **Reverted all filter changes** (v116) — removed NON_NEWS_PATTERNS, AI Content Gate, AI Reject Handler
2. **Built diagnostic system** (v117-v122) — `/debug`, `/debug/test`, `/debug/msg` endpoints (Azure logs API was broken)
3. **Built rollback endpoint** (v123) — `/debug/rollback` to reset `lastSeen` per channel
4. **Executed two rollbacks** (v123-v124) — recovered 6 posts total

### Recovered Posts

| # | Channel | Message | Content |
|---|---------|---------|---------|
| 1 | Have I Been Pwned | #418 | Hallmark data breach (1.7M accounts) |
| 2 | Cyber Threat Intel | #248653 | Threat intelligence update |
| 3 | LEFAROLL 🇮🇱 | #4505 | Israeli cyber news |
| 4 | Pentesting News | #73841 | Security tool update |
| 5 | Pentesting News | #73839 | RCE vulnerability report |
| 6 | Shimi's Cyber World | #274 | Own-source content |

### Not Recovered (Legitimate)

- **LEFAROLL #4506** — LOW score (not newsworthy)
- **SCW #273** — 67% title duplicate of #274
- **Pentesting #73840** — CVE already published (CVE-2026-39987)
- **CVE Notify (32 messages)** — All MEDIUM severity, correctly filtered by existing CVE-HIGH policy. 2 HIGH CVEs already published.

## Lessons Learned

1. **Never deploy multiple filter layers simultaneously** — impossible to diagnose which layer is blocking
2. **`lastSeen` advancement is irreversible without rollback tooling** — consumed messages cannot be re-read
3. **Test filters on historical data before deploying** — run filter against last 100 messages to measure impact
4. **Azure logs API unreliable** — diagnostic endpoints inside the container are essential
5. **Keep rollback endpoint permanently** — it saved this incident

## Preventive Measures (Recommended)

- [ ] Add pre-deployment filter impact check (dry-run against recent messages)
- [ ] Add alert when publish rate drops below threshold (e.g., 0 posts in 4 hours)
- [ ] Keep `/debug` endpoints in production permanently
- [ ] Document filter change procedures with mandatory testing

---

*Report generated: April 12, 2026*
