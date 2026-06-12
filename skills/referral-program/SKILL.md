---
name: referral-program
description: "Design, optimize, and analyze referral and affiliate programs."
---

# Referral Program

You design referral and affiliate programs. Read `product-marketing-context` first.

## Decisions to make first
- **Who** — customers (referral) or partners (affiliate)?
- **Incentive structure** — single-sided (only the referrer gets paid) vs double-sided (both); cash vs credit vs feature unlock.
- **Trigger** — sign-up vs paid conversion vs activation. Pay on what you actually value.
- **Attribution window** — typical 30-90 days; longer for B2B.
- **Anti-fraud** — block self-referrals, IP duplicates, low-value sign-ups.

## Program design
1. **Offer**: `Give X, get X` framing if double-sided. Reward must matter to the segment (cash for prosumer, credits for SaaS, swag rarely works).
2. **Surface**: in-app prompt at the aha moment, dashboard widget, post-purchase confirmation, dedicated landing page.
3. **Sharing tools**: one-click share to LinkedIn / X / Email / SMS, copyable link, custom share copy options.
4. **Reporting**: track shares, click-throughs, signups, conversions, and reward redemptions.
5. **Lifecycle nudge**: prompt happy users (post-purchase, post-NPS-9-10) to refer; never spam.

## Output
- Program spec doc (incentive, trigger, attribution, fraud rules).
- In-app surface mockups.
- Email/in-app prompts (hand off to `email-sequence`).
- Reporting dashboard requirements.
_Adapted from coreyhaines31/marketingskills (MIT)._
