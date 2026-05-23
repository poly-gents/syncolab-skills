---
name: pulumi
description: Manages Pulumi stacks and deployments via native pulumi_* tools and optional Pulumi MCP. Use for stack inspect, preview, up, refresh, and destroy with confirmed org/project/stack targets.
---

# Pulumi

## Purpose

Operate Pulumi infrastructure: list and inspect stacks, preview changes, run up/refresh/destroy, and use MCP tools when routed—always confirming organization/project/stack and integration token before mutating state.

## When to Use

- List stacks or read stack outputs, resources, history, deployments.
- Preview, update (`up`), refresh, or destroy a named stack.
- Pulumi MCP workflows when MCP is the selected route (`list_tools`).

## When NOT to Use

- Authoring new IaC patterns from scratch → **pulumi-best-practices**, **author-iac**, or migration skills.
- Provider version bumps → **pulumi-upgrade-provider**.
- Unconfirmed destroy on production stacks.

## Expected Outcome

- Target stack triple confirmed before preview/up/destroy.
- Preview summarized from tool output before apply when user asked to preview first.
- Destructive ops only after explicit user confirmation when appropriate.

## Inputs to Gather

- `organization` / `project` / `stack` (or equivalent from tool schema).
- Whether route is native `pulumi_*` or Pulumi MCP (self-hosted default unless configured otherwise).
- Integration token / connection status before writes.

## Workflow

1. Verify Pulumi integration and token when writes are needed.
2. Confirm `organization/project/stack` with the user for mutating commands.
3. **Inspect**: `pulumi_list_stacks`, `pulumi_get_stack`, outputs, resources, history as needed.
4. **Plan**: `pulumi_preview` before `pulumi_up` when the user wants to see changes.
5. **Apply**: `pulumi_up` or `pulumi_refresh`; **destroy** only with confirmation.
6. For MCP route: discover tools via `list_tools`; follow live schemas.

### Domain rules

1. **Native vs MCP**: `pulumi_*` for curated control plane; MCP when platform routes to MCP.
2. **Self-hosted MCP default** unless hosted override is configured.
3. **Token and target checks** before preview, up, refresh, destroy.
4. **Confirm destructive actions** (especially destroy).

### Main tools

- Native: `pulumi_list_stacks`, `pulumi_get_stack`, `pulumi_get_stack_outputs`, `pulumi_get_stack_resources`, `pulumi_get_stack_history`, `pulumi_list_deployments`, `pulumi_get_deployment`, `pulumi_preview`, `pulumi_refresh`, `pulumi_up`, `pulumi_destroy`
- MCP: tools from `list_tools` when MCP is selected

### Examples

**List stacks:** `pulumi_list_stacks` (or MCP equivalent); return names and state.

**Preview dev:** Confirm target stack, run preview, summarize resource changes from response.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Inspect and mutate per user confirmation. |
| Read-only | List/get/preview only. |
| No token/integration | Do not run up/destroy; report blocker. |

### Related tool sets

- `pulumi`

## Review / Decision / Execution Criteria

- Never destroy without clear user intent.
- Summarize preview diffs in plain language.

## Output Format

1. Stack target and command.
2. Preview summary or apply result.
3. Errors.
4. Recommended follow-up (refresh, drift check).

## Quality Bar

- No fabricated resource counts or URNs.
- Distinguish preview vs applied state.

## Safety and Boundaries

- Confirm destroy and production `up` when impact is unclear.
- No secrets in stack config in chat.

## Escalation / Dispatch Rules

- IaC authoring/migrations → related **pulumi-*** skills.
- MCP schema missing → stop and report.

## References

- Legacy: `skills/old_skills.json` (`pulumi`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
