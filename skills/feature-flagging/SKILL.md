---
name: feature-flagging
description: Designs safe feature rollouts with flags, cohort targeting, kill switches, and cleanup plans. Use when launching, gating, or retiring feature flags.
---

# Feature flagging

## Purpose

Guide safe progressive delivery using feature flags: cohort sizing, success/rollback criteria, kill switches, and flag lifecycle hygiene.

## When to Use

- User asks about feature flags, gradual rollout, kill switch, or flag cleanup.
- Planning canary/percentage rollouts with observability guardrails.
- Separating release flags from entitlements/permissions.

## When NOT to Use

- A/B experiment design and statistics → **ab-experimentation**.
- Infrastructure feature stores you do not have context for—gather vendor/docs first.
- Code implementation without flag context → **implement-features**.

## Expected Outcome

- Rollout plan with cohort, metrics, rollback/kill steps, and flag lifecycle (owner, expiry).
- Clear distinction between release toggles and permission flags.

## Inputs to Gather

- Flag name/key, default state, and targeting rules.
- Success metrics and alert thresholds.
- Owner, expiry/removal ticket, and environments.
- On-call kill-switch procedure.

## Workflow

1. Classify flag type (release vs permission vs experiment).
2. Define default-off/on rationale and smallest first cohort.
3. Set success metrics and rollback triggers before expanding.
4. Document kill-switch steps for on-call.
5. Plan removal ticket to avoid long-lived debt.
6. Pair with **monitor-slos** / observability for guardrails during rollout.

## Domain guidance

- Prefer **small cohorts** first; define success and rollback criteria before expanding.
- Separate **release** flags from **permission** or entitlements.
- Every flag needs: owner, expiry or removal ticket, default-off or default-on rationale.
- Document kill-switch steps for on-call.

Avoid long-lived flags without cleanup plans.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Update flag config via integrated tools when approved. |
| Read-only | Produce rollout plan and ticket text. |
| No flag platform | Architectural guidance only; no fabricated flag state. |

### Related tool sets

- `github`
- `jira`

## Review / Decision / Execution Criteria

- Rollback path tested or documented before wide rollout.
- No permission checks hidden behind release flags without review.
- Expiry or removal ticket required for new flags.

## Output Format

1. Flag inventory (in scope).
2. Rollout phases and cohorts.
3. Metrics and rollback/kill triggers.
4. Lifecycle (owner, expiry).
5. Risks and open questions.

## Quality Bar

- On-call can execute kill switch from your doc alone.

## Safety and Boundaries

- Confirm production flag changes affecting all users.
- Do not fabricate current flag targeting state.

## Escalation / Dispatch Rules

- Experiment analysis → **ab-experimentation**.
- Incident during rollout → **lead-incidents**.

## References

- `skills/old_skills.json` (`feature-flagging`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
