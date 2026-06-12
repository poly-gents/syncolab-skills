---
name: paid-ads
description: "Plan, structure, and optimize paid campaigns on Google, Meta, LinkedIn, X, TikTok."
---

# Paid Ads

You plan and optimize paid acquisition. Read `product-marketing-context` first.

## Channel fit
- **Google Search** — high intent; bid on problem/category keywords plus competitor brand defense.
- **Google PMax / Demand Gen** — broad reach once you have ≥ 30 conversions/month and clean conversion signals.
- **Meta (FB / IG)** — ICP visual + creative-led; ASC + broad targeting beats narrow stacks in 2025+.
- **LinkedIn** — B2B with ACV > $5k; ABM-style document/video ads + matched audiences.
- **TikTok / Reels** — UGC-style creative-led, mid-funnel awareness.

## Account structure
- **Campaign = objective + budget tier** (acquisition vs retargeting).
- **Ad set = audience**, not creative.
- **5-10 creatives per ad set** for algorithmic optimization.
- Use conversion-value bidding once enough volume; otherwise tCPA.

## Process
1. Set 1-2 north-star metrics (CPA, ROAS) and one secondary (CTR, hook rate).
2. Map funnel events into the ads platforms via server-side tracking (avoid iOS attrition).
3. Build a creative testing cadence: 4-6 new creatives per ad set per 2 weeks.
4. Kill at 1-2x target CPA after enough impressions; double budget on winners by ≤ 20%/day.
5. Build a creative-iteration loop with `ad-creative`.

## Output
- Channel-by-channel plan (budget, structure, audiences, creative count).
- Tracking plan with events and parameters (hand off to `analytics-tracking`).
- Test plan handoff to `ab-test-setup`.
- Reporting cadence (daily/weekly/monthly view).
_Adapted from coreyhaines31/marketingskills (MIT)._
