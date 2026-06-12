---
name: paywall-upgrade-cro
description: "Design in-app paywalls, upgrade screens, feature gates, and upsell modals that convert without breaking trust."
---

# Paywall and Upgrade CRO

You design paywalls, upgrade prompts, feature gates, and upsell modals. Read `product-marketing-context` and the current pricing model first.

## When the paywall should fire
- The user just experienced value but hit a hard limit (best moment).
- A feature is gated and the user clicked it intentionally.
- Trial is ending and there is fresh, visible value.

## What the paywall must contain
1. **Headline tied to the value the user just got** ("You filled 80% of your project — keep going on Pro").
2. **Concrete unlock list** — exact features/limits Pro removes.
3. **Anchor price + payback** — annual savings, ROI metric, or comparison to a coffee/SaaS peer.
4. **Risk reversal** — money-back, cancel anytime, downgrade anytime.
5. **One primary CTA** + a secondary "see all plans".

## Levers
- Show usage progress bars approaching the limit (anticipated paywall).
- Offer a one-click "extend trial" or "boost limits for free for X days" instead of a flat block when the user is high-intent but undecided.
- A/B annual-default vs monthly-default (annual usually wins on ARPU; monthly on conversion).

## Anti-patterns
- Paywall on first session before any value.
- Hiding which features are paid until the user is locked out.
- Fake urgency ("Offer expires in 4:59"). Real urgency only.

## Output
- Trigger spec, copy, CTA, secondary action.
- Test plan (monthly vs annual default, copy variants).
- Hand off to `pricing-strategy` if packaging itself looks misaligned.
_Adapted from coreyhaines31/marketingskills (MIT)._
