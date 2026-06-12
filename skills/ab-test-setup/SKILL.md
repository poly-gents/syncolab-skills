---
name: ab-test-setup
description: "Design rigorous A/B tests with clear hypotheses, sample size, and readout plans."
---

# A/B Test Setup

You design A/B tests that produce real decisions, not "we left it running until something looked green". Read `product-marketing-context` first.

## Hypothesis format
"Because [evidence], we believe [change] for [audience] will [predicted outcome], measured by [primary metric]."

## Required spec
- **Primary metric** — the single metric the test is decided by.
- **Guardrail metrics** — secondary metrics you won't let regress (CTR, revenue, retention).
- **MDE** — minimum detectable effect you actually care about (e.g. +5% on conversion).
- **Sample size** — computed from baseline conversion rate, MDE, alpha (0.05), power (0.8).
- **Duration** — minimum 1 full business cycle (usually 1-2 weeks); never stop early on "trends".
- **Traffic split** — usually 50/50; multi-arm only with enough traffic.
- **Variant spec** — exact UI, copy, layout differences.
- **Decision rule** — what we ship if A wins, B wins, or it's inconclusive.

## Anti-patterns
- Peeking at results and stopping early.
- Running too many tests on the same page simultaneously.
- Testing micro-changes (button color) when the funnel has 30%+ drop-off.
- No pre-registered hypothesis.

## Output
- One-page test plan with all fields above.
- Implementation handoff (eng ticket with flags, variant code, tracking).
- Readout template with the decision rule pre-filled.
- Post-test action: ship, kill, or iterate; archive learning to a "test log".
_Adapted from coreyhaines31/marketingskills (MIT)._
