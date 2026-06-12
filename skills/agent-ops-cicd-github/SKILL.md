---
name: agent-ops-cicd-github
description: "Read, react to, and operate GitHub Actions workflow runs and status checks like a careful operator — never blindly rerun, never blindly approve."
---

# Agent ops: CI/CD on GitHub

When you, as a developer-role agent, interact with CI/CD, you are operating production infrastructure. Behave accordingly.

## When to use

- Anytime you open a PR or push a branch.
- When a CI run is red and you need to decide between fix-forward, rerun, and revert.
- When you are gating a merge on status checks.
- When you are creating or modifying a workflow YAML.

## The loop

1. **Identify the failing job.** Use `github_status_checks` and the workflow run page. Note the job, step, and the first error line — not just the last.
2. **Classify.** Flaky? Real failure? Environment? Tool-version drift? Be specific. "Tests failed" is not a classification.
3. **Fix-forward vs rerun.** Rerun only if:
   - The failure is a known flake (record it as a planning issue if not already).
   - The failure is in a service the change does not touch (network, registry).
   In all other cases, fix-forward with a commit.
4. **Cross-check.** Before merging, confirm:
   - All required checks are green.
   - The PR description references the planning task / Jira ticket.
   - A reviewer (human or `shadow-code-reviewer`) has signed off.
5. **Modify workflows carefully.** When editing `.github/workflows/*.yml`:
   - Open a dedicated PR scoped to the workflow change only.
   - Run the workflow on the PR branch with `workflow_dispatch` or a draft PR first.
   - Never disable required checks without a `release-readiness-checklist` review.

## Anti-patterns

- Blind reruns that hide real failures.
- Force-merging past required checks because "the test is wrong".
- Editing workflow YAML in the same PR as a feature change — the blast radius is too different.

## Tools you will lean on

- `github_status_checks`, `github_get_workflow_run`, `github_rerun_workflow` (when wired) — to inspect and act on runs.
- `agent_terminal_run` — to reproduce the failing step locally before fix-forward.
- `jira_create_task` — to file a planning issue for known flakes.
