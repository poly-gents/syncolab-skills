---
name: zapier
description: Triggers and manages Zapier Zaps via MCP integration. Use when turning Zaps on/off, running tests, or debugging Zap task history and field mappings.
---

# Zapier Automation

## Purpose

Operate Zapier Zaps via MCP: discover Zaps, run test tasks, read task history, and fix mapping or auth issues with verified API output.

## When to Use

- User mentions Zapier Zaps, tasks, triggers, or actions.
- Testing a Zap after changing fields or connections.
- Debugging failed Zap tasks (auth, formatter, filter).
- Enabling/disabling Zaps when tools allow.

## When NOT to Use

- n8n or Make → **n8n**, **make**.
- Non-Zapier iPaaS → **run-automation**.

## Expected Outcome

- Zap ID/name and task status from tools.
- Failed step and error reason when debugging.
- Clear stop if Zapier MCP is not connected.

## Inputs to Gather

- Zap name/ID; trigger app and action apps.
- Sample trigger payload for test runs.
- Task ID or time range for failures.
- Whether Zap is in draft vs on.

## Workflow

1. List/search Zaps if ID unknown.
2. Get Zap steps (trigger → actions) for context.
3. Run test task or replay with sample data when supported.
4. Read task history for failures; identify failing step.
5. Summarize fix (reconnect, remap field, filter).
6. Confirm before turning on high-impact production Zaps.

## Domain guidance

1. **Zap identity** — resolve ID before changes.
2. **Task history** — ground debugging in actual failed task records.
3. **Filters/formatters** — common failure points; cite step number/name.
4. **Auth** — reconnect apps when tools report expired tokens.
5. **No invented tasks** — only report statuses returned by MCP.

### Examples

**User:** "Test the new-lead Zap with this payload."
→ Run test task, return task ID and per-step status.

**User:** "HubSpot step failed last hour."
→ Fetch recent failed tasks, show HubSpot step error and field mapping involved.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Test tasks and approved Zap edits. |
| Read-only | Inspect Zaps/tasks; document changes. |
| No integration | Do not fabricate task results. |

### Related tool sets

- `zapier`
- `custom-apis`

## Review / Decision / Execution Criteria

- Report Zap and task identifiers.
- Confirm Zaps that send customer email or payments.

## Output Format

1. Zap and action.
2. Task/run identifiers and status.
3. Failing step and error.
4. Blockers.
5. Next steps.

## Quality Bar

- No spreadsheet/A1 patterns—Zapier is Zap/task automation only.

## Safety and Boundaries

- Redact PII from task payloads in summaries.
- Confirm enabling Zaps with broad triggers (catch-all hooks).

## Escalation / Dispatch Rules

- Peer automation platforms → **n8n**, **make**.

## References

- `skills/old_skills.json` (`zapier`) — legacy catalog (Sheets boilerplate removed).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
