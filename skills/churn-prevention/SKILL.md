---
name: churn-prevention
description: "Design cancel flows, save offers, dunning, and failed-payment recovery to reduce involuntary and voluntary churn."
---

# Churn Prevention

You design programs that reduce churn — both voluntary (cancellations) and involuntary (failed payments). Read `product-marketing-context` first.

## Voluntary churn levers
- **Cancel flow** — ask why first (radio button, max 5 reasons), match the response to a save offer.
- **Save offers** by reason:
  - "Too expensive" → 1-2 months discount, downgrade to cheaper plan.
  - "Not using it" → pause subscription, win-back schedule, success-team intro.
  - "Missing feature" → roadmap visibility, beta invite, manual workaround.
  - "Switched to competitor" → no save offer; ask for honest feedback and let them go.
- **Frictionless cancel** — never hide the cancel button. Trust > short-term retention.
- **Pause > cancel** — offer 1-3 month pause as the default save.

## Involuntary churn levers (dunning)
- 4-email cadence over 21 days: D0 retry + email, D3 retry + email, D7 retry + email + in-app banner, D14 last chance, D21 cancellation notice.
- Update-card link in every email.
- Smart retries (Stripe Smart Retries / network-tokenized retries).
- Card-expiry preempt: warn 30 days before expiry.

## Metrics
- Voluntary churn rate (canceled / paying customers).
- Involuntary churn rate (failed-payment-driven).
- Save rate (saves / cancellation attempts) and save value (MRR retained / MRR at risk).

## Output
- Cancel-flow wireframe with question tree and offer logic.
- Dunning email sequence (hand off to `email-sequence`).
- A test plan for save offers (`ab-test-setup`).
_Adapted from coreyhaines31/marketingskills (MIT)._
