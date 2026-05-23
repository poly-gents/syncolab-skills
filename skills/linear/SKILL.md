---
name: linear
description: Automates Linear issues, projects, cycles, teams, and labels via Rube MCP (Composio). Use after RUBE_SEARCH_TOOLS and an ACTIVE Linear connection; resolve team and state IDs before creates.
---

# Linear

## Purpose

Operate Linear through Composio’s Linear toolkit on Rube MCP: discover current tool schemas, ensure an ACTIVE OAuth connection, resolve team/state IDs, then create, search, update issues, projects, cycles, labels, and comments.

## When to Use

- Create, search, update, or list Linear issues, projects, or cycles.
- Resolve team names to IDs or workflow states before mutations.
- Custom GraphQL when standard tools are insufficient.

## When NOT to Use

- Jira/Atlassian work → **jira**.
- Archon task board → **archon**.
- Without Rube MCP or before `RUBE_MANAGE_CONNECTIONS` shows ACTIVE Linear.

## Expected Outcome

- `RUBE_SEARCH_TOOLS` used before each workflow for live slugs and parameters.
- Issues created with valid `team_id` and integer priority 0–4.
- Results from Composio tool responses only.

## Inputs to Gather

- Team name or `team_id`; state name or `state_id` for the team.
- Issue title, description (Markdown), assignee, labels, priority.
- Pagination cursors when listing large sets.

## Workflow

1. Confirm `RUBE_SEARCH_TOOLS` responds (Rube MCP at `https://rube.app/mcp`).
2. `RUBE_MANAGE_CONNECTIONS` with toolkit `linear`; complete OAuth if not ACTIVE.
3. `RUBE_SEARCH_TOOLS` for the Linear action; call tools with schema-exact parameters.
4. Resolve IDs (teams, states) before create/update per patterns below.
5. Summarize issue keys, URLs, and state from tool output.

## Rube MCP and Linear toolkit

Automate Linear operations through Composio's Linear toolkit via Rube MCP.

## Prerequisites

- Rube MCP must be connected (RUBE_SEARCH_TOOLS available)
- Active Linear connection via `RUBE_MANAGE_CONNECTIONS` with toolkit `linear`
- Always call `RUBE_SEARCH_TOOLS` first to get current tool schemas

## Setup

**Get Rube MCP**: Add `https://rube.app/mcp` as an MCP server in your client configuration. No API keys needed — just add the endpoint and it works.


1. Verify Rube MCP is available by confirming `RUBE_SEARCH_TOOLS` responds
2. Call `RUBE_MANAGE_CONNECTIONS` with toolkit `linear`
3. If connection is not ACTIVE, follow the returned auth link to complete Linear OAuth
4. Confirm connection status shows ACTIVE before running any workflows

## Core Workflows

### 1. Manage Issues

**When to use**: User wants to create, search, update, or list Linear issues

**Tool sequence**:
1. `LINEAR_GET_ALL_LINEAR_TEAMS` - Get team IDs [Prerequisite]
2. `LINEAR_LIST_LINEAR_STATES` - Get workflow states for a team [Prerequisite]
3. `LINEAR_CREATE_LINEAR_ISSUE` - Create a new issue [Optional]
4. `LINEAR_SEARCH_ISSUES` / `LINEAR_LIST_LINEAR_ISSUES` - Find issues [Optional]
5. `LINEAR_GET_LINEAR_ISSUE` - Get issue details [Optional]
6. `LINEAR_UPDATE_ISSUE` - Update issue properties [Optional]

**Key parameters**:
- `team_id`: Team ID (required for creation)
- `title`: Issue title
- `description`: Issue description (Markdown supported)
- `state_id`: Workflow state ID
- `assignee_id`: Assignee user ID
- `priority`: 0 (none), 1 (urgent), 2 (high), 3 (medium), 4 (low)
- `label_ids`: Array of label IDs

**Pitfalls**:
- Team ID is required when creating issues; use GET_ALL_LINEAR_TEAMS first
- State IDs are team-specific; use LIST_LINEAR_STATES with the correct team
- Priority uses integer values 0-4, not string names

### 2. Manage Projects

**When to use**: User wants to create or update Linear projects

**Tool sequence**:
1. `LINEAR_LIST_LINEAR_PROJECTS` - List existing projects [Optional]
2. `LINEAR_CREATE_LINEAR_PROJECT` - Create a new project [Optional]
3. `LINEAR_UPDATE_LINEAR_PROJECT` - Update project details [Optional]

**Key parameters**:
- `name`: Project name
- `description`: Project description
- `team_ids`: Array of team IDs associated with the project
- `state`: Project state (e.g., 'planned', 'started', 'completed')

**Pitfalls**:
- Projects span teams; they can be associated with multiple teams

### 3. Manage Cycles

**When to use**: User wants to work with Linear cycles (sprints)

**Tool sequence**:
1. `LINEAR_GET_ALL_LINEAR_TEAMS` - Get team ID [Prerequisite]
2. `LINEAR_GET_CYCLES_BY_TEAM_ID` / `LINEAR_LIST_LINEAR_CYCLES` - List cycles [Required]

**Key parameters**:
- `team_id`: Team ID for cycle operations
- `number`: Cycle number

**Pitfalls**:
- Cycles are team-specific; always scope by team_id

### 4. Manage Labels and Comments

**When to use**: User wants to create labels or comment on issues

**Tool sequence**:
1. `LINEAR_CREATE_LINEAR_LABEL` - Create a new label [Optional]
2. `LINEAR_CREATE_LINEAR_COMMENT` - Comment on an issue [Optional]
3. `LINEAR_UPDATE_LINEAR_COMMENT` - Edit a comment [Optional]

**Key parameters**:
- `name`: Label name
- `color`: Label color (hex)
- `issue_id`: Issue ID for comments
- `body`: Comment body (Markdown)

**Pitfalls**:
- Labels can be team-scoped or workspace-scoped
- Comment body supports Markdown formatting

### 5. Custom GraphQL Queries

**When to use**: User needs advanced queries not covered by standard tools

**Tool sequence**:
1. `LINEAR_RUN_QUERY_OR_MUTATION` - Execute custom GraphQL [Required]

**Key parameters**:
- `query`: GraphQL query or mutation string
- `variables`: Variables for the query

**Pitfalls**:
- Requires knowledge of Linear's GraphQL schema
- Rate limits apply to GraphQL queries

## Common Patterns

### ID Resolution

**Team name -> Team ID**:
```
1. Call LINEAR_GET_ALL_LINEAR_TEAMS
2. Find team by name in response
3. Extract id field
```

**State name -> State ID**:
```
1. Call LINEAR_LIST_LINEAR_STATES with team_id
2. Find state by name
3. Extract id field
```

### Pagination

- Linear tools return paginated results
- Check for pagination cursors in responses
- Pass cursor to next request for additional pages

## Known Pitfalls

**Team Scoping**:
- Issues, states, and cycles are team-specific
- Always resolve team_id before creating issues

**Priority Values**:
- 0 = No priority, 1 = Urgent, 2 = High, 3 = Medium, 4 = Low
- Use integer values, not string names

## Quick Reference

| Task | Tool Slug | Key Params |
|------|-----------|------------|
| List teams | LINEAR_GET_ALL_LINEAR_TEAMS | (none) |
| Create issue | LINEAR_CREATE_LINEAR_ISSUE | team_id, title, description |
| Search issues | LINEAR_SEARCH_ISSUES | query |
| List issues | LINEAR_LIST_LINEAR_ISSUES | team_id, filters |
| Get issue | LINEAR_GET_LINEAR_ISSUE | issue_id |
| Update issue | LINEAR_UPDATE_ISSUE | issue_id, fields |
| List states | LINEAR_LIST_LINEAR_STATES | team_id |
| List projects | LINEAR_LIST_LINEAR_PROJECTS | (none) |
| Create project | LINEAR_CREATE_LINEAR_PROJECT | name, team_ids |
| Update project | LINEAR_UPDATE_LINEAR_PROJECT | project_id, fields |
| List cycles | LINEAR_LIST_LINEAR_CYCLES | team_id |
| Get cycles | LINEAR_GET_CYCLES_BY_TEAM_ID | team_id |
| Create label | LINEAR_CREATE_LINEAR_LABEL | name, color |
| Create comment | LINEAR_CREATE_LINEAR_COMMENT | issue_id, body |
| Update comment | LINEAR_UPDATE_LINEAR_COMMENT | comment_id, body |
| List users | LINEAR_LIST_LINEAR_USERS | (none) |
| Current user | LINEAR_GET_CURRENT_USER | (none) |
| Run GraphQL | LINEAR_RUN_QUERY_OR_MUTATION | query, variables |

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Execute workflows, verify outputs, report errors. |
| Read-only | Inspect and plan; provide exact commands or dispatch request for writes. |
| No integration | State limitation; do not fabricate API results. |

### Related tool sets

- `linear`
- Rube MCP endpoint: `https://rube.app/mcp`

## Review / Decision / Execution Criteria

- Prefer smallest safe change; confirm destructive actions with the user.
- Use evidence from tool responses; cite IDs and links when present.
- Match integration-specific conventions (JQL, RFC3339, A1 notation, etc.).

## Output Format

Report:

1. What was requested and what was done.
2. Key results (tables or bullets).
3. Errors, blockers, or missing permissions.
4. Suggested next steps.

## Quality Bar

- Specific, actionable, and grounded in tool output.
- Concise unless the user asked for detail.
- Respect rate limits, pagination, and API semantics.

## Safety and Boundaries

- Do not commit secrets, tokens, or PII into skills or user-visible logs.
- Do not fabricate validation, send, or write confirmations.
- Confirm destructive operations (delete, destroy, mass update) when appropriate.

## Escalation / Dispatch Rules

- If the task spans multiple domains, use or suggest related skills via `relationships.skills`.
- If write access is required but unavailable, dispatch or ask the user to enable tools.

## References

- Legacy content migrated from `skills/old_skills.json` (`linear`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
