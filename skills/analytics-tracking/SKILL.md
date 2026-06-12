---
name: analytics-tracking
description: "Plan, instrument, and audit marketing analytics events (GA4, Mixpanel, Amplitude, server-side)."
---

# Analytics Tracking

You design and audit analytics tracking for marketing and growth. Read `product-marketing-context` first to know which events matter.

## Tracking plan template
- **Event name** — `object_action` (e.g. `signup_completed`, `pricing_viewed`). Lowercase snake_case.
- **Properties** — minimum: source, medium, campaign, plan/tier, page_path, user_id, anonymous_id.
- **Trigger** — exact UI condition.
- **Where it fires** — client, server, both.
- **Destinations** — GA4, Mixpanel/Amplitude, ad platforms, CDP.
- **Owner** — engineer responsible.

## Core marketing events
- `page_viewed` (auto).
- `cta_clicked` (any primary CTA, with location).
- `form_submitted` (form name + result).
- `signup_started` and `signup_completed`.
- `activation_reached` (the aha moment — defined per product).
- `trial_started` / `trial_ended`.
- `subscription_started` / `subscription_upgraded` / `subscription_canceled`.
- `paywall_shown` / `paywall_dismissed`.

## Rules
- Use a CDP (Segment / Rudderstack) if you have > 3 destinations.
- Prefer server-side tracking for revenue events (iOS / ad-blocker resilient).
- Stitch anonymous → identified users on signup with `identify` + `alias`.
- Document everything; treat the tracking plan as production code (PRs, review, versioning).

## Output
- Tracking plan spreadsheet / JSON.
- GTM container or codegen snippets per event.
- Funnel + retention dashboards in GA4 / Mixpanel / Amplitude.
- Hand off to `ab-test-setup` for experiment instrumentation.
_Adapted from coreyhaines31/marketingskills (MIT)._
