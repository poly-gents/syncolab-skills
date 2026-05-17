---
name: datadog
description: Queries Datadog monitors, metrics, logs, and dashboards via connected integration. Use when investigating alerts, APM traces, log patterns, or security signals in Datadog.
---

# Datadog

## Purpose

Use connected Datadog tooling to investigate monitors, metrics, logs, dashboards, and security signals—with correct time ranges, scopes, and tags—without inventing API results.

## When to Use

- User mentions Datadog monitors, metrics, logs, APM, RUM, or security signals.
- Triage firing or muted monitors and correlate metric/log evidence.
- Build or refine monitor queries, dashboards, or notebooks when write tools exist.
- Incident investigation when Datadog is the observability source of truth.

## When NOT to Use

- Grafana-only or CloudWatch-only environments → **grafana**, **cloudwatch**.
- SLO/error-budget policy design without Datadog data → **error-budget-management**, **monitor-slos**.
- Skill authoring in this repo → **create-skill** / **publish-skill**.

## Expected Outcome

- Evidence from monitors, timeseries, or log queries with timeframe and scope documented.
- Monitor IDs, tags, and links included when the API returns them.
- Clear statement when org/site or API keys are unavailable.

## Inputs to Gather

- Datadog site (e.g. `datadoghq.com` region) if not implicit in tools.
- Time window and timezone for the investigation.
- Service, env, host, or tag filters (`service:`, `env:`, etc.).
- Monitor ID/name, dashboard URL, or log query context from the user.

## Workflow

1. Confirm Datadog MCP tools; read schemas for metric, log, and monitor operations.
2. Establish timeframe and tag scope before querying.
3. For alerts: get monitor status → event timeline → metric/log proof → threshold comparison.
4. For exploration: start broad, narrow by tags; avoid inventing metric names.
5. For writes (monitors/dashboards): confirm scope and notify user on production-impacting changes.
6. Summarize with monitor IDs, queries used, and recommended follow-ups.

## Domain guidance

1. **Scope tags early** — `service`, `env`, `host`, `version` reduce noise.
2. **Monitor vs metric** — distinguish monitor evaluation from ad-hoc metric queries.
3. **Logs + metrics** — correlate trace/log IDs with metric spikes when debugging errors.
4. **Security signals** — treat as read-first; escalate per org process; do not auto-mute without approval.
5. **Tool fidelity** — only call tools defined by the integration; never fabricate timeseries points.

### Typical tasks

| Task | Approach |
|------|----------|
| Firing monitor | Status → message/tags → metric query for window → recent events |
| Log investigation | Query with timeframe → pattern count → exemplar lines (redact PII) |
| Dashboard/monitor edit | Fetch existing definition → minimal change → validate query |

### Examples

**User:** "Why did the checkout error monitor fire?"
→ Load monitor, pull evaluation window metric/log evidence, list top `service`/`version` tags, compare to threshold.

**User:** "Show error rate for `payments` in prod last hour."
→ Metric query with `service:payments` and `env:prod`, return series summary and spike timestamps.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Run queries and approved writes; verify responses. |
| Read-only | Investigate and recommend monitor/query changes without applying. |
| No integration | Stop; do not fabricate Datadog data. |

### Related tool sets

- `datadog`
- `custom-apis`

## Review / Decision / Execution Criteria

- Every conclusion ties to a query result or monitor state from tools.
- Use RFC3339/Unix times consistently in summaries.
- Distinguish muted, no-data, and alert states explicitly.

## Output Format

1. Question and evaluated window.
2. Monitor/log/metric findings (with query snippets or IDs).
3. Tags or services implicated.
4. Blockers or permission gaps.
5. Next steps (fix, mute with approval, dashboard link).

## Quality Bar

- On-call ready: what fired, why (evidence), what to check next.
- No spreadsheet or A1-style patterns—Datadog is metrics/logs/monitors only.

## Safety and Boundaries

- Redact secrets and PII from log excerpts.
- Do not auto-mute or delete monitors in production without explicit approval.
- Do not fabricate monitor states or metric values.

## Escalation / Dispatch Rules

- Grafana correlation → **grafana** when dual-stacked.
- Reliability policy → **error-budget-management** when discussing release freezes.
- Post-incident docs → **postmortem-authoring**.

## References

- `skills/old_skills.json` (`datadog`) — legacy catalog (Sheets boilerplate removed).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
