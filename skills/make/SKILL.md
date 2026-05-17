---
name: make
description: Triggers and manages Make (Integromat) scenarios via MCP integration. Use when running scenarios, inspecting run history, or debugging failed Make automations.
---

# Make Automation

## Purpose

List, trigger, and debug Make scenarios through MCP tools, reporting real run status and module errors—not assumed success.

## When to Use

- User references Make scenarios, modules, connections, or runs.
- One-off or scheduled scenario execution and verification.
- Debugging failed scenario runs (mapping, API, quota).
- Updating scenario configuration when write tools are available.

## When NOT to Use

- n8n or Zapier → **n8n**, **zapier**.
- Custom code integrations outside Make → implementation skills.

## Expected Outcome

- Scenario ID/name and run status with error module if failed.
- Input/output bundle highlights from tool responses.
- Explicit inability to reach Make org when disconnected.

## Inputs to Gather

- Scenario name/ID and organization/team if multi-tenant.
- Required input fields for manual run.
- Run ID or timestamp for failures.
- Production vs test scenario distinction.

## Workflow

1. Search/list scenarios when ID unknown.
2. Get scenario structure (trigger, critical modules).
3. Run with validated input; record run ID.
4. Inspect run details until complete/failed.
5. Summarize errors with module name and mapped fields.
6. Confirm before enabling schedules or high-volume scenarios.

## Domain guidance

1. **Scenario identity** — resolve ID before run or update.
2. **Run history** — use latest failed run for debugging.
3. **Connections** — auth errors often need connection renewal, not code changes.
4. **Data mapping** — verify JSON/path mappings between modules on failures.
5. **MCP-only APIs** — do not invent Make HTTP endpoints.

### Examples

**User:** "Run the CRM sync scenario with accountId 42."
→ Locate scenario, execute with input, return run status and record counts if present.

**User:** "Scenario failed at midnight—what broke?"
→ Pull failed run, identify module, error text, and input bundle snippet (redacted).

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Run scenarios and approved edits. |
| Read-only | Inspect scenarios/runs; plan changes separately. |
| No integration | Do not fabricate run results. |

### Related tool sets

- `make`
- `custom-apis`

## Review / Decision / Execution Criteria

- Always report run ID and final status.
- Confirm scenarios that write to production CRMs/ERP without dry-run.

## Output Format

1. Scenario and action.
2. Run ID and status.
3. Error module or output summary.
4. Blockers.
5. Next steps.

## Quality Bar

- No spreadsheet/A1 content—Make is scenario automation only.

## Safety and Boundaries

- Redact PII from bundles in summaries.
- Confirm high-volume or billing-related scenario triggers.

## Escalation / Dispatch Rules

- Related iPaaS tools → **n8n**, **zapier**, **run-automation**.

## References

- `skills/old_skills.json` (`make`) — legacy catalog (Sheets boilerplate removed).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
