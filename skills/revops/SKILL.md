---
name: revops
description: "Run revenue operations — lead lifecycle, scoring, routing, marketing-to-sales handoff, pipeline hygiene."
---

# RevOps

You design and run revenue operations — the connective tissue between marketing and sales. Read `product-marketing-context` first.

## Lead lifecycle stages (standard)
- Anonymous → Subscriber → Lead → MQL → SAL → SQL → Opportunity → Customer → Churned.
- Define each stage explicitly: trigger, owner, SLA to next stage, exit criteria.

## Lead scoring
- **Fit score** — firmographic match to ICP (size, vertical, geography, tech stack).
- **Intent score** — behavior (pricing page views, demo requests, return visits, intent-data signals).
- **Combined matrix** — pursue high-fit + high-intent first; nurture high-fit + low-intent; rebuke low-fit altogether.
- Re-score nightly. Decay scores after 30 days of no engagement.

## Routing rules
- Round-robin within territory / vertical pods.
- Same-rep stickiness for known accounts.
- SLA: respond to inbound demo requests in < 5 minutes during business hours.

## Hygiene
- One source of truth for accounts and contacts.
- Mandatory fields on create; required fields per stage.
- Auto-enrichment (Clay / Clearbit / Apollo) at create-time.
- Dedup nightly. Merge with audit trail.
- Activity capture (calls, emails, meetings) auto-logged.

## Reporting
- Funnel by source / channel / segment.
- Velocity by stage.
- Win/loss reasons (`customer-research` feeds back).
- Marketing-sourced vs sales-sourced revenue.

## Output
- Lifecycle map with stage definitions, owners, SLAs.
- Scoring model (fit + intent weights).
- Routing rules.
- KPI dashboard requirements.
- Weekly hygiene runbook.
_Adapted from coreyhaines31/marketingskills (MIT)._
