---
name: chromatic
description: Reviews Chromatic visual tests and Storybook builds for UI regressions. Use when checking build results, accepting or rejecting visual changes, or triaging component snapshot diffs.
---

# Chromatic

## Purpose

Work with Chromatic visual testing and Storybook builds: fetch build results, review changed stories, and guide accept/reject decisions with evidence from the integration—not invented diffs.

## When to Use

- User mentions Chromatic builds, visual snapshots, or UI regressions in Storybook.
- Reviewing PR visual checks or baseline updates.
- Accepting intentional UI changes or rejecting accidental diffs.
- Connecting Storybook publish flow to CI when Chromatic tools exist.

## When NOT to Use

- Lighthouse performance/a11y audits → **lighthouse**.
- Non-visual unit/integration tests → **add-tests**.
- Design critique without snapshots → **shadow-design-critic** or review skills.

## Expected Outcome

- Build ID/URL and change counts from Chromatic.
- List of changed stories/components with pass/fail/changed status.
- Clear recommendation: accept, fix, or re-run with rationale.

## Inputs to Gather

- Project/app ID, branch, and commit or PR link.
- Build number or Chromatic build URL if provided.
- Which stories/components are in scope.
- Whether change is intentional (design token update vs bug).

## Workflow

1. Fetch latest or specified build via Chromatic MCP tools.
2. List changed stories and diff status per component.
3. For each change, note viewport/theme variants affected.
4. Recommend accept vs fix based on user intent and diff scope.
5. If fixing, point to Storybook story/file only when known from repo context.
6. Document follow-up CI command or rebuild step if build failed.

## Domain guidance

1. **Build first** — always anchor on a concrete Chromatic build, not hypothetical diffs.
2. **Story granularity** — report per-story status; batch accepts only when user confirms.
3. **Baselines** — accepting updates baseline for future runs; call that out explicitly.
4. **Flakes** — suggest retry or stabilization if intermittent snapshot noise.
5. **Tool fidelity** — use Chromatic/storybook integration tools only.

### Examples

**User:** "What changed in the latest Chromatic build on this PR?"
→ Return build link, count of changed stories, top components, and whether checks are blocking.

**User:** "Accept snapshot updates for the Button refactor."
→ Confirm stories in scope, perform accept via tools if available, note new baseline for branch.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Fetch builds and apply accept/reject when exposed. |
| Read-only | Report diffs and manual UI steps for accept. |
| No integration | Do not fabricate snapshot diffs. |

### Related tool sets

- `chromatic`
- `storybook`

## Review / Decision / Execution Criteria

- Intentional design changes require explicit user confirmation before accept.
- Flag cross-story widespread diffs (global CSS/token changes).
- Distinguish build failures (Storybook compile) from visual changes.

## Output Format

1. Build identifier and URL.
2. Summary table: story, status, notes.
3. Recommendation (fix / accept / retry).
4. Blockers.
5. Next steps for dev or CI.

## Quality Bar

- No spreadsheet/A1 patterns—Chromatic is visual regression only.
- Link decisions to actual build artifacts.

## Safety and Boundaries

- Do not accept production-blocking regressions without user sign-off.
- Do not expose Chromatic project tokens.

## Escalation / Dispatch Rules

- Component implementation fixes → **build-components**, **react-patterns**.
- Broader QA → **add-tests**.

## References

- `skills/old_skills.json` (`chromatic`) — legacy catalog (Sheets boilerplate removed).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
