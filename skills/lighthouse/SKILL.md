---
name: lighthouse
description: Runs Lighthouse audits for web performance, accessibility, SEO, and best practices. Use when auditing URLs, interpreting Core Web Vitals, or prioritizing front-end fixes from Lighthouse reports.
---

# Lighthouse

## Purpose

Run and interpret Lighthouse audits (performance, accessibility, best practices, SEO) using CLI or browser integrations, returning actionable opportunities—not fabricated scores.

## When to Use

- User requests a Lighthouse audit, Core Web Vitals check, or a11y/SEO score for a URL.
- Comparing mobile vs desktop scores before release.
- Turning audit opportunities into a prioritized fix list for front-end work.
- CI or pre-release quality gates when Lighthouse/chrome-devtools tools are connected.

## When NOT to Use

- Visual regression or Storybook snapshots → **chromatic**.
- General browser E2E testing without audit focus → testing or browser automation skills.
- Backend-only performance (no page load) → APM/observability skills (**datadog**, **grafana**).

## Expected Outcome

- Category scores and key audits (pass/fail) from a real run.
- Top opportunities/diagnostics with estimated savings where reported.
- Environment noted (URL, throttling, mobile/desktop, auth constraints).

## Inputs to Gather

- Target URL(s) and environment (local, staging, production).
- Mobile vs desktop (default mobile if unspecified).
- Auth requirements (login, headers) and whether audit can run headless.
- Budget or thresholds the user cares about (LCP, CLS, TBT, etc.).

## Workflow

1. Confirm Lighthouse or chrome-devtools MCP tools are available.
2. Validate URL reachability and auth approach before auditing production.
3. Run audit with agreed form factor and throttling settings.
4. Extract category scores and highest-impact audits/opportunities.
5. Map findings to likely code areas when stack hints exist (avoid guessing file paths without evidence).
6. Suggest verification re-run after fixes.

## Domain guidance

1. **Categories** — Performance, Accessibility, Best Practices, SEO; report each score and critical audits.
2. **Core Web Vitals** — highlight LCP, INP/TBT, CLS with field/lab context when present.
3. **Opportunities vs diagnostics** — prioritize by estimated savings and user impact.
4. **Environment** — call out if throttling or local-only URL limits generalization.
5. **No fabricated scores** — only report values returned by the audit tool.

### Examples

**User:** "Audit staging homepage performance on mobile."
→ Run mobile audit, return scores, LCP/CLS/TBT, top three opportunities with savings estimates.

**User:** "Why did accessibility score drop?"
→ Compare audits marked fail/regression vs prior run if available; list specific a11y rules and elements when reported.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Run audits and capture reports. |
| Read-only / no runner | Provide exact CLI command and flags for the user to run locally. |
| No integration | Do not invent Lighthouse scores. |

### Related tool sets

- `lighthouse`
- `chrome-devtools`

## Review / Decision / Execution Criteria

- Tie recommendations to specific failing audits from the report.
- Distinguish lab vs field data when both appear.
- Flag auth-blocked or error-page audits as invalid runs.

## Output Format

1. URL, device profile, and run timestamp.
2. Category score table.
3. Top issues (impact-ordered) with audit IDs/names.
4. Blockers (login required, timeout, blocked URL).
5. Suggested fixes and re-audit step.

## Quality Bar

- Actionable for engineers (what to fix, not generic "improve performance").
- Honest about limitations of a single URL snapshot.

## Safety and Boundaries

- Do not audit production URLs that trigger destructive actions without approval.
- Do not log cookies or credentials from authenticated runs.

## Escalation / Dispatch Rules

- Visual/UI component regressions → **chromatic**.
- SEO content strategy beyond technical audits → **optimize-for-seo**.

## References

- `skills/old_skills.json` (`lighthouse`) — legacy catalog (Sheets boilerplate removed).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
