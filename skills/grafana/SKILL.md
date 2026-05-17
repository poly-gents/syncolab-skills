---
name: grafana
description: Queries Grafana dashboards, alerts, and Explore using connected datasources. Use when investigating metrics, firing alerts, building panels, or exploring logs/traces in Grafana.
---

# Grafana

## Purpose

Operate a connected Grafana instance: find dashboards and alert rules, run metric/log queries, interpret panels, and make focused dashboard or alert changes with verified tool output.

## When to Use

- User asks about Grafana dashboards, panels, datasources, or Explore queries.
- Investigating firing alerts, silences, or on-call context in Grafana.
- Adding or updating panels, variables, or alert rules when Grafana MCP tools are available.
- Correlating metrics/logs during incidents (with **lead-incidents** or **monitor-slos** as needed).

## When NOT to Use

- Datadog, CloudWatch, or other vendors without a Grafana connection → use **datadog**, **cloudwatch**, or the vendor skill.
- Designing SLOs or error-budget policy → **error-budget-management**, **monitor-slos**.
- Authoring skills in this repo → **create-skill** / **publish-skill**.

## Expected Outcome

- Queries and resource lookups backed by real tool responses (UIDs, links, sample values).
- Clear incident or investigation summary with time range and datasource noted.
- Explicit blockers when credentials, datasource, or permissions are missing.

## Inputs to Gather

- Grafana base URL or org context if multiple instances exist.
- Time range (`from`/`to` or relative) and timezone for incidents.
- Dashboard UID/title, alert rule name/UID, folder, or datasource name.
- Service, namespace, or label selectors relevant to the question.

## Workflow

1. Confirm Grafana MCP tools are available; read tool schemas before calling.
2. Set or confirm the evaluation time window.
3. List or search dashboards/alerts when IDs are unknown; then get details.
4. Run queries in the correct language (PromQL, LogQL, etc.) for the datasource—do not invent metric names.
5. For changes, prefer preview or non-destructive reads; confirm destructive edits with the user.
6. Summarize findings with UIDs/links and suggested next steps.

## Domain guidance

1. **Time range first** — relative windows (`now-1h`) or absolute UTC for incidents.
2. **Resource identity** — dashboard UID, alert rule UID, folder, datasource; search before guess.
3. **Query language** — match datasource type (Prometheus/Mimir → PromQL, Loki → LogQL).
4. **Alerts vs dashboards** — for pages, check alert state, labels, silences, and notification policy before editing panels.
5. **Tool fidelity** — use only tools exposed by the integration; never fabricate panel JSON or query results.

### Typical tasks

| Task | Approach |
|------|----------|
| Firing alert | Rule status → labels → backing query for window → threshold comparison |
| Dashboard change | Get dashboard → confirm datasource/variables → add/update panel → return link |
| Explore investigation | Pick datasource → run query → narrow labels/time → export key series or log lines |

### Examples

**User:** "Why is `api-latency-p99` alerting?"
→ Locate rule, note state/labels, run backing query for alert window, compare to threshold, list top label contributors.

**User:** "Add a 5xx rate panel to the payments dashboard."
→ Resolve dashboard UID, confirm datasource and labels, add panel with validated query, return dashboard URL/UID.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Execute workflows, verify outputs, report errors. |
| Read-only | Inspect dashboards/alerts/queries; provide exact steps or dispatch for writes. |
| No integration | State limitation; do not fabricate query results or panel data. |

### Related tool sets

- `grafana`
- `custom-apis`

## Review / Decision / Execution Criteria

- Prefer read-only investigation before mutating dashboards or alert rules.
- Cite dashboard UID, rule name, datasource, and time range in conclusions.
- Confirm alert silences and notification changes with the user.

## Output Format

1. Request and time range evaluated.
2. Key metrics/log findings (table or bullets) with datasource and query noted.
3. Resource links/UIDs and alert state if relevant.
4. Errors, blockers, or missing permissions.
5. Suggested next steps.

## Quality Bar

- Grounded in tool output; distinguish observation from hypothesis.
- Actionable for on-call (what to check next, not generic advice).
- Respect pagination and rate limits on list/search calls.

## Safety and Boundaries

- Do not expose secrets, tokens, or PII from queries or annotations.
- Do not fabricate alert firings, query results, or successful writes.
- Confirm production dashboard/alert changes and silences when impact is broad.

## Escalation / Dispatch Rules

- Cross-vendor observability → suggest **datadog** or **cloudwatch** when data lives outside Grafana.
- SLO/error-budget decisions → **error-budget-management** or **monitor-slos**.
- Incident coordination → **lead-incidents**, **postmortem-authoring** after mitigation.

## References

- `skills/old_skills.json` (`grafana`) — legacy catalog (Sheets boilerplate removed).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
