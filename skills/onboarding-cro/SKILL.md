---
name: onboarding-cro
description: "Design first-run experiences and post-signup onboarding for activation and time-to-value."
---

# Onboarding CRO

You optimize post-signup activation so new users reach the value moment as fast as possible. Read `product-marketing-context` first.

## Frame
- Define the **aha moment**: one observable event that correlates with retention (e.g. "first message sent", "first report generated").
- Define **time-to-value (TTV)**: minutes from signup to aha moment.
- Define **activation rate**: % of signups that hit the aha moment in their first session / first 7 days.

## Workflow
1. Map current onboarding step-by-step (signup → first session → aha).
2. Mark each step as "value", "setup", or "friction".
3. Apply these rules:
   - Cut every step that is not "value" or "unavoidable setup".
   - Replace setup-heavy steps with sensible defaults + sample data.
   - Use checklists, not tutorials. Show progress.
   - Personalize the path by use case (ask one question early, branch the rest).
   - Celebrate the aha moment (toast, confetti, share button).
4. Instrument the activation event and an "activation funnel" dashboard.

## Output
- Before/after step map.
- Specific copy and UI changes.
- Activation metric definition with event name and properties.
- Hand off to `email-sequence` for lifecycle emails that nudge stalled users.

## Anti-patterns
- A 7-step modal tour before the user has touched the product.
- "Watch this 4-minute video" gate.
- Setup-heavy first session that delays the aha moment.
_Adapted from coreyhaines31/marketingskills (MIT)._
