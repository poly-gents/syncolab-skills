---
name: n8n
description: Triggers and manages n8n workflows via MCP integration. Use when listing workflows, running executions, inspecting failures, or updating automation definitions in n8n.
---

# n8n Automation

## Purpose

Operate n8n workflows through connected MCP tools: discover workflows, trigger runs with payloads, inspect executions, and apply focused definition changes safely.

## When to Use

- User mentions n8n workflows, nodes, executions, or webhooks.
- Triggering or debugging an automation run.
- Finding why a workflow failed (node error, credentials, payload).
- Enabling/disabling or updating a workflow when write tools exist.

## When NOT to Use

- Make or Zapier automations → **make**, **zapier**.
- General scripting outside n8n → implementation skills.
- Skill repo authoring → **create-skill** / **publish-skill**.

## Expected Outcome

- Workflow ID/name and execution status from tool output.
- Error node, message, and I/O snippets when debugging failures.
- Clear boundary when MCP cannot reach the n8n instance.

## Inputs to Gather

- Workflow name or ID; environment (prod vs test).
- Trigger payload fields and required credentials.
- Execution ID for failed runs.
- Whether the user wants a one-off test vs production trigger.

## Workflow

1. List or search workflows if ID unknown.
2. Get workflow definition for context (trigger type, key nodes).
3. Trigger with validated payload; capture execution ID.
4. Poll or fetch execution until terminal state.
5. Summarize output data and errors; suggest node-level fixes.
6. For edits, confirm impact on scheduled/webhook triggers.

## Domain guidance

1. **Resolve workflow first** — name-to-ID lookup before trigger or update.
2. **Executions are source of truth** — never assume success without status from tools.
3. **Credentials** — failures often credential or expression related; cite node name from execution.
4. **Idempotency** — warn on duplicate triggers for billing/side-effect workflows.
5. **Tool schemas** — use only MCP-exposed operations; do not invent REST paths.

### Examples

**User:** "Run the Slack digest workflow for team=platform."
→ Find workflow, trigger with `{ "team": "platform" }`, return execution ID and final status.

**User:** "Why did last night's sync fail?"
→ Fetch latest failed execution, identify failing node and error message, suggest credential or mapping fix.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Trigger, inspect, and apply approved workflow changes. |
| Read-only | List/get workflows and executions; document change plan for writes. |
| No integration | Do not fabricate execution results. |

### Related tool sets

- `n8n`
- `task-manager`

## Review / Decision / Execution Criteria

- Cite execution ID and terminal status in every trigger summary.
- Confirm production triggers that send email, charge, or mutate external systems.

## Output Format

1. Workflow and action taken.
2. Execution ID, status, duration.
3. Output summary or error node details.
4. Blockers.
5. Next steps.

## Quality Bar

- No spreadsheet/A1 patterns—n8n is workflow automation only.

## Safety and Boundaries

- Do not log secrets from credentials or webhook URLs.
- Confirm destructive or high-volume triggers with the user.

## Escalation / Dispatch Rules

- Cross-platform automation comparison → **make**, **zapier**, **run-automation**.

## References

- `skills/old_skills.json` (`n8n`) — legacy catalog (Sheets boilerplate removed).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
