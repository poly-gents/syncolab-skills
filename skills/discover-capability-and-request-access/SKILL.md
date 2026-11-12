---
name: discover-capability-and-request-access
description: "Request a known missing tool or skill through the human-approved support flow."
---

# Request access to a missing capability

## Purpose

Request a known tool or skill when it is needed to complete a task and is unavailable to the current agent.

## When to Use

Use this skill when the task needs a capability you do not have and you know the name of the capability to request.

## Expected Outcome

The user understands the blocker and, if a request is approved, receives the resulting support ticket number.

## Workflow

1. Check the tools and instructions already available in the current run. If they suffice, use them.
2. If the missing capability's name is unknown, explain the blocker and ask the user or an administrator for direction. Do not invent a catalog name.
3. If `request_tool_or_skill_access` is available and a request is appropriate, provide `kind` (`tool` or `skill`), the known `name`, a specific `justification`, and the optional `category` and `context_snippet`. Keep sensitive data out of the context.
4. The request requires human approval before a support ticket is created. If approved, tell the user the returned ticket number. Matching recent requests are deduplicated; do not submit them repeatedly.
5. Continue any independent work possible with the tools you have.

## Tool Availability Rules

Use only tools available in the current run. If the request tool is unavailable, tell the user what capability is needed and ask an administrator for help.

## Output Format

Briefly explain the missing capability, the work affected, and any approved ticket number.

## Quality Bar

Do not use a capability request for outages, unrelated incidents, or access to another customer's data. Provide a concrete justification and never bypass the approval flow.
