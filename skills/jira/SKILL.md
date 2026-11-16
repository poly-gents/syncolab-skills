---
name: jira
description: Search and manage Jira issues and workflows, list Jira Software boards, and create project boards with available native tools or schema-discovered Atlassian MCP tools.
---

# Jira

## Purpose

Manage Jira issues and Software boards through available native or Atlassian MCP tools.

## When to Use

Use for Jira issue search, creation, updates, comments, transitions, and Software board setup for an existing project. Use the Linear skill for Linear work; use Archon only when the user requests Archon work or cross-system alignment.

## Tool Availability Rules

Inspect the tools granted in the current run. Native `jira_*` tools are supported when exposed; read their actual schemas. For Atlassian/Rovo MCP, use `list_tools` and `get_tool_schema` to discover exact names and parameters. Do not require MCP discovery for an already exposed native tool, or invent native tools when only MCP is available.

With read-only access, inspect and describe proposed changes. If a required tool or connection is unavailable, report what is missing or dispatch through the available task mechanism; do not claim execution.

## Expected Outcome

Identify the intended Jira records and complete only the authorized issue or board changes, with any partial result made explicit.

## Workflow

### Issues and transitions

1. Resolve the project and issue keys from user context or returned records.
2. Use JQL when the selected search tool supports it. Follow its pagination schema; report incomplete results.
3. Read the issue before updates and change only requested fields. Create subtasks using the supported parent field.
4. List valid transitions before applying a status transition; use the returned transition identifier.
5. Return issue keys, statuses, and links from the tool responses.

## List project boards

Use `jira_list_boards` with optional `projectKey` and `maxResults`. Filter to the intended project when known. It returns `boards` and `total`, and may return `isLast`; the current wrapper does not expose a page cursor or `startAt`. Do not invent pagination arguments or claim that a limited result proves a board does not exist. A project's result count can reflect only the returned boards.

Check the connected Jira site as well as the project key, especially with multiple sites. The list tool can use a Syncolab project's bound Jira site; the creation tool requires a single unambiguous site from the connection and can fail when multiple sites are available. Neither exposes a cloud/site override. If these may differ, resolve the intended site before creating rather than assuming a successful list guarantees the creation destination.

## Create a project board

Use `jira_create_project_board` for an existing Jira Software project. Required fields are `projectKey` and `boardName`; optional fields are `type` (`kanban` or `scrum`, default `kanban`), `jql`, and `filterName`.

1. Establish the existing project, desired board name and type, and authorization to create the board and its backing filter. This tool does not create a Jira project.
2. List boards for that project and reuse a matching board when that satisfies the request. Clarify ambiguous matches rather than creating duplicates.
3. Omit custom JQL unless requested or needed. The default is `project = KEY ORDER BY created DESC`; the default filter name is `<boardName> filter`. A custom query can include other projects, so keep its scope aligned with the request.
4. Call the combined tool once. It creates the saved filter and then the board; separate filter or board creation tools are not prerequisites.
5. Report the returned board ID/name and filter ID. If the call fails or times out, do not blindly retry: a filter or board may already exist. Inspect available records, report possible partial completion, and resolve it with the user or a Jira administrator. Do not claim rollback or delete anything to compensate without authorization.

Example: for an authorized request to create a Scrum board named “KAN delivery” in existing project KAN, inspect with `jira_list_boards({"projectKey":"KAN"})`, then call `jira_create_project_board({"projectKey":"KAN","boardName":"KAN delivery","type":"scrum"})` if no suitable board exists and the site is established.

## Output Format

Return the issues or boards found, confirmed changes, IDs/links supplied by tools, and any truncation, site ambiguity, or partial failure.

## Quality Bar

Do not fabricate URLs or a successful mutation. Respect existing permissions and the requested scope; ask for clarification when a bulk or workflow change is ambiguous.

## References

The live tool schema defines supported parameters. See `skills/skill.instruction.md` and `skills/meta.instructions.md` for package conventions.
