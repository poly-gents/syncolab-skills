---
name: cloudwatch
description: Queries AWS CloudWatch metrics, alarms, logs, and dashboards via connected credentials. Use when investigating AWS alarms, metric graphs, Logs Insights, or CloudWatch dashboards.
---

# Amazon CloudWatch

## Purpose

Investigate and operate AWS CloudWatch metrics, alarms, log groups, and dashboards through connected tools—using correct regions, dimensions, and time ranges.

## When to Use

- User asks about CloudWatch alarms, metrics, dashboards, or Logs Insights.
- AWS incident triage where signals live in CloudWatch (EC2, Lambda, ECS, RDS, etc.).
- Creating or tuning alarms and metric filters when write access exists.
- Correlating AWS resource metrics with application logs in CloudWatch Logs.

## When NOT to Use

- Non-AWS observability (Datadog, Grafana only) → **datadog**, **grafana**.
- Infrastructure provisioning → **author-iac**, **aws-serverless**.
- Skill repo authoring → **create-skill** / **publish-skill**.

## Expected Outcome

- Alarm state, metric datapoints, or log query results from real API/tool output.
- Region, namespace, dimensions, and log group documented in the summary.
- Explicit gaps when credentials, region, or log group access is missing.

## Inputs to Gather

- AWS region(s) and account context.
- Alarm name/ARN, metric namespace, dimensions, statistic, period.
- Log group(s) and Logs Insights time range.
- Resource identifiers (Lambda name, ASG, RDS instance, etc.).

## Workflow

1. Confirm CloudWatch tools and allowed regions.
2. Pin timeframe (UTC) and region before any query.
3. For alarms: describe alarm → history → underlying metric for window.
4. For logs: Logs Insights query with narrow timebox; paginate as tools allow.
5. For dashboard edits: fetch definition first; confirm with user on shared ops dashboards.
6. Report alarm ARN, metric query, and log group in the summary.

## Domain guidance

1. **Region and namespace** — metrics are regional; namespace must match service (`AWS/Lambda`, custom, etc.).
2. **Dimensions** — include full dimension set (`FunctionName`, `ClusterName`, …) or queries aggregate incorrectly.
3. **Alarm types** — metric vs composite; check `InsufficientData` vs `ALARM` vs `OK`.
4. **Logs Insights** — start with fields/filters; bound time; watch scanned volume/cost.
5. **Tool fidelity** — use integration tool names only; never fabricate datapoints or log events.

### Typical tasks

| Task | Approach |
|------|----------|
| Alarm triage | Describe alarm → recent state changes → metric for evaluation periods |
| Metric graph | List metrics/dimensions → get metric data → highlight anomaly window |
| Log search | Select log group(s) → Insights query → top patterns + sample lines (redacted) |

### Examples

**User:** "Why is the Lambda errors alarm in us-east-1 firing?"
→ Describe alarm, pull `Errors` metric for `FunctionName`, compare threshold across evaluation periods, note concurrent `Throttles` if relevant.

**User:** "Find 5xx lines in `/aws/lambda/checkout` last 30 minutes."
→ Logs Insights on group with time bound, aggregate by `@message` pattern, return count + sanitized samples.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Query and apply approved alarm/dashboard changes. |
| Read-only | Investigate; output exact CLI/API steps for writes. |
| No integration | Do not fabricate AWS metrics or log events. |

### Related tool sets

- `cloudwatch`
- `custom-apis`

## Review / Decision / Execution Criteria

- Always state region and namespace in conclusions.
- Treat `InsufficientData` as first-class—not equivalent to healthy.
- Confirm alarm threshold or actions changes that page on-call.

## Output Format

1. Question, region, and time window.
2. Alarm/metric/log findings with ARNs or log group names.
3. Dimensions and statistics used.
4. Blockers (permissions, wrong region).
5. Next steps.

## Quality Bar

- Evidence-based; suitable for AWS on-call handoff.
- No spreadsheet/A1 patterns—CloudWatch is metrics, alarms, and logs only.

## Safety and Boundaries

- Do not expose access keys or sensitive log payloads.
- Confirm destructive alarm actions or dashboard deletes.
- Do not fabricate alarm transitions or metric values.

## Escalation / Dispatch Rules

- Broader AWS architecture → **aws-serverless**, **author-iac**.
- Multi-vendor dashboards → **grafana** if CloudWatch is datasource there.
- Post-incident → **postmortem-authoring**.

## References

- `skills/old_skills.json` (`cloudwatch`) — legacy catalog (Sheets boilerplate removed).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
