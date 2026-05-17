---
name: jira
description: Lists, searches, creates, updates, and transitions Jira issues via Atlassian MCP tools discovered at runtime. Use JQL when supported; always load tool schemas before execution.
---

# Jira

## Purpose

Work with Jira issues through the Atlassian MCP surface: discover tools, obey live schemas, search with JQL when available, and transition issues only after listing valid transitions.

## When to Use

- Search or list issues (including JQL filters).
- Get, create, or update issues and subtasks.
- Add comments or change status via transitions.

## When NOT to Use

- Archon-native task board → **archon** (may combine with Jira for sync).
- Linear → **linear**.
- Assuming local `jira_*` wrapper names—use MCP tool names from `list_tools` / `get_tool_schema`.

## Expected Outcome

- Calls use MCP tool names and parameters from `get_tool_schema`.
- Transitions applied only after listing allowed transitions.
- Issue keys and links from tool responses, not invented.

## Inputs to Gather

- Project key, issue key, or JQL query.
- Fields required by the specific MCP create/update tool schema.
- Target status name before calling a transition tool.

## Workflow

1. Call `list_tools` (Rovo/Atlassian MCP) to find Jira tools.
2. For each action, call `get_tool_schema` and use exact parameter names.
3. **Search**: use the MCP search tool’s JQL parameter when the schema exposes it.
4. **Transition**: list transitions first, then call the transition tool with a valid id/name.
5. Summarize issues (key, summary, status, assignee) from responses.

### Domain rules

1. **MCP-first**: No assumed `jira_*` locals; schemas come from the server.
2. **Schema-exact parameters** on every call.
3. **JQL** when supported for filtered searches (e.g. `project = KAN AND assignee = currentUser()`).
4. **Transitions**: list before apply.

### Main tools

- Atlassian MCP tools from `tools/list` (names vary by deployment).

### Examples

**Subtask under KAN-7:** Discover create-issue tool via `list_tools`, read schema, create with parent/summary per required fields.

**Open issues in KAN:** Search tool with JQL `project = KAN AND status != Done` per schema; return issue list from response.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full MCP access | Discover, schema-read, execute. |
| Read-only | Search/get only; draft mutations. |
| No Atlassian MCP | State limitation; do not fabricate issues. |

### Related tool sets

- `jira`

## Review / Decision / Execution Criteria

- JQL and field names must match project configuration.
- Confirm bulk updates or status changes when impact is broad.

## Output Format

1. Tools used (MCP names).
2. Issue list or mutation result.
3. Errors.
4. Archon sync note if user asked for cross-system alignment.

## Quality Bar

- Never cite wrapper names that are not in the live schema.
- Paginate large JQL result sets.

## Safety and Boundaries

- Confirm destructive or workflow-changing actions when unclear.
- No credentials in comments or skill text.

## Escalation / Dispatch Rules

- Archon + Jira alignment → **archon** alongside this skill.
- Schema missing → report and stop; do not guess parameters.

## References

- Legacy: `skills/old_skills.json` (`jira`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
