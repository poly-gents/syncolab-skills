---
name: release-readiness-checklist
description: "Run a pre-release checklist before any non-trivial deploy: code, observability, rollback, comms. Block the release if any item is red."
---

# Release readiness checklist

A release that is not ready is a release that does not ship. Use this checklist to make that call explicit instead of vibes-based.

## When to run

- Any tagged release.
- Any deploy that touches paid traffic, customer data, or authentication.
- Any deploy where the rollback is non-trivial (DB migration, third-party config change).

## The checklist

Each item is `pass` / `fail` / `n/a`. Any `fail` blocks the release.

### Code
- [ ] All PRs in the release are reviewed and approved.
- [ ] CI green on the release commit (`agent-ops-cicd-github`).
- [ ] No `TODO` / `FIXME` comments introduced in customer-facing paths.

### Observability
- [ ] Dashboards exist for the new code paths.
- [ ] Alerts exist for the failure modes you can predict.
- [ ] A baseline of the key SLIs has been captured in the 15 minutes pre-release.

### Rollback
- [ ] A rollback plan exists (`rollback-runbook`).
- [ ] If the change has a DB migration, the migration is backwards compatible OR there is a documented forward-only plan with timing.
- [ ] The rollback has been mentally simulated by at least one human + one agent.

### Comms
- [ ] Customers / internal users have been notified for visible changes.
- [ ] Support has a one-pager on what changed.
- [ ] On-call knows the release window.

### Final gate
- [ ] One named human is the release owner during the deploy window.

## Decision

Pass all items → ship.
One or more fail → file a planning task per failure, postpone the release until they're green.

## Anti-patterns

- Letting "we'll do that after the release" green-light an item.
- Skipping the rollback simulation because the change "is small".
- No named human owner — releases without an owner never get reverted in time.
