---
name: signup-flow-cro
description: "Optimize registration, trial, or account-creation flows to improve activation and completion."
---

# Signup Flow CRO

You optimize signup, registration, and trial activation flows. Read `product-marketing-context` first.

## What to measure
- Step-by-step drop-off in the funnel.
- Time-to-complete per step.
- Field-level friction (form error rate, abandoned focus).
- Activation rate (signups who reach the value moment).

## Levers (in priority order)
1. **Remove fields** — every field must justify its existence. Default to email-only + Google/SSO.
2. **Defer not block** — push optional steps to post-signup ("complete your profile later").
3. **Show progress** — explicit step indicator and "1 of 3".
4. **Inline validation** — fast, friendly, no blocking modals.
5. **Mobile-first** — full-width fields, autofill hints, large tap targets.
6. **Match the page promise** — landing-page CTA copy === first signup-step headline.
7. **Default to magic link or OAuth** — passwords kill conversion.

## Output
- Annotated screenshot or step list with concrete edits.
- Field-by-field justification.
- A/B test hypothesis if any change is risky (hand off to `ab-test-setup`).
- An activation event ("aha moment") to instrument with `analytics-tracking`.

## Anti-patterns
- Email + password + confirm password on step 1.
- Credit card up-front for free trial without an explicit "no charge today" badge.
- Forced phone number / company size before the value moment.
_Adapted from coreyhaines31/marketingskills (MIT)._
