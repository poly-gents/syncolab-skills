---
name: archon
description: Lists, creates, and updates Archon tasks with statuses todo, doing, review, and done via archon_* tools. Use for Archon workboards and optional alignment with Jira.
---

# Archon

## Purpose

Manage Archon tasks in a project: list with filters, create with required fields, update by `taskId`, and use status values `todo`, `doing`, `review`, `done` exactly—coordinating with **jira** when the user wants cross-system sync.

## When to Use

- List or search tasks by `projectId`, `status`, or `q`.
- Create tasks with title (and optional description/status).
- Update task fields or status.
- Check Archon service health.

## When NOT to Use

- Jira-only workflows without Archon → **jira**.
- Generic project planning → **maintain-project-plan** when that fits better.

## Expected Outcome

- Task lists with id, title, status, projectId from `archon_list_tasks`.
- Creates/updates confirmed from API responses.
- Jira changes only via **jira** when user asked to sync both systems.

## Inputs to Gather

- `projectId` for list/create.
- `taskId` for updates.
- Status one of: `todo`, `doing`, `review`, `done`.

## Workflow

1. **List first** when scope is unclear: `archon_list_tasks` (`projectId`, `status`, `q`, pagination).
2. **Create**: `archon_create_task` with `projectId`, `title`, optional `description`, `status`.
3. **Update**: `archon_update_task` with `taskId` and changed fields.
4. **Health** (optional): `archon_health`.
5. For Jira alignment, use **jira** with MCP schemas after Archon changes or in parallel per user request.

### Domain rules

1. **List before create/update** when task set is unknown.
2. **Status values** exactly: todo, doing, review, done.
3. **Sync with Jira** only when explicitly requested—use both tool sets.

### Main tools

- `archon_list_tasks` (`projectId`, `status`, `q`, `includeClosed`, `page`, `perPage`)
- `archon_create_task`, `archon_update_task`, `archon_health`

### Examples

**In-progress tasks:** `archon_list_tasks` with `status: "doing"`.

**Create Review PR:** `archon_create_task` with `projectId`, `title`, `status: "todo"`.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | List, create, update. |
| Read-only | List/get only. |
| No integration | Do not fabricate task ids. |

### Related tool sets

- `task-manager`

## Review / Decision / Execution Criteria

- Keep status vocabulary strict.
- Cross-system sync: report Archon and Jira outcomes separately.

## Output Format

1. Project/task scope.
2. Task table or mutation confirmation.
3. Errors.
4. Jira follow-up if sync requested.

## Quality Bar

- IDs from tool output only.
- Pagination for large boards.

## Safety and Boundaries

- Confirm bulk status changes.

## Escalation / Dispatch Rules

- Jira-only → **jira**.
- Missing projectId → ask user before create.

## References

- Legacy: `skills/old_skills.json` (`archon`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
