---
name: rollback-runbook
description: "Plan and execute a safe rollback (or roll-forward) when a release misbehaves, with a documented sequence and an explicit decision point on rollback vs fix-forward."
---

# Rollback runbook

A rollback is a live operation, not a vibe. Run it from a runbook, in this order, with a single named owner.

## When to use

- A release is causing customer-visible incorrect behaviour.
- A release is causing observability red (error rate spike, latency spike).
- A release reveals a security issue that can't be hotfixed in minutes.

## The decision (rollback vs fix-forward)

- **Rollback** when:
  - The bug is broad (affects > 1% of users or any paying customer).
  - The fix is non-trivial (> 30 minutes to write).
  - The change has a clean revert (no destructive migration).
- **Fix-forward** when:
  - The bug is narrow (a single feature flag can dark-launch it off).
  - The fix is a one-line change with low risk.
  - Rollback would itself break something (migration ran, data shape changed, external state mutated).

## Rollback sequence

1. **Declare.** Open the rollback in the incident thread; name the owner.
2. **Freeze.** Stop additional deploys to the same service.
3. **Verify the rollback target.** What commit are you reverting to? Has it itself been verified?
4. **Execute.** Use the deploy tool's revert path (`github-actions` rerun, kubectl rollout undo, blue/green flip).
5. **Watch.** For 15 minutes after the rollback, monitor `datadog` / `grafana` for the same SLIs that triggered the rollback.
6. **Confirm.** When SLIs return to baseline, post a confirmation in the thread.
7. **Hand off to postmortem.** Run `incident-postmortem-loop`.

## Special cases

- **DB migration ran.** Rollback the code, leave the schema, file an urgent task for a fix-forward migration. Never run a destructive down migration on production data without a backup verified within the last 24 hours.
- **Third-party config flipped.** The revert is in the third-party UI; do that step first, then the code revert.
- **Feature flag exists.** Flip the flag off before considering the full rollback; that's usually enough.

## Anti-patterns

- Rolling back to "the last known good commit" without checking which commit that actually is.
- Skipping the 15-minute watch.
- Doing the rollback alone without naming an owner in the thread.
