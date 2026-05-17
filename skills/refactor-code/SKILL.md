---
name: refactor-code
description: "Restructure existing code to improve maintainability, readability, and performance without changing its external behavior, using GitHub and Jira."
---

# Refactor Code

## Purpose

Restructure existing code to improve maintainability, readability, and performance without changing its external behavior, using GitHub and Jira.

This skill provides operational guidance for Refactor Code, including tool usage patterns, workflows, and quality expectations aligned with Syncolab skill standards.

## When to Use

- Use when the user needs help with Refactor Code.
- When integrations for this domain are available and the task matches the workflows below.

## When NOT to Use

- When the task is unrelated to Refactor Code or covered by a more specific skill.
- When required integrations or credentials are unavailable.

## Expected Outcome

- Correct use of domain tools with verified results (not fabricated).
- Clear summary of actions taken, data returned, and recommended next steps.
- Errors and missing permissions reported explicitly.

## Inputs to Gather

- User goal, constraints, and any identifiers (URLs, IDs, project keys).
- Available tool sets and connection status.
- Relevant context from related systems before destructive writes.

## Workflow

1. Confirm the request maps to Refactor Code and required tools are available.
2. Gather identifiers and scope (project, channel, repo, date range, etc.).
3. Follow the domain guidance below; prefer list/search before get/update when applicable.
4. Execute tool calls using schemas from the integration; never invent tool output.
5. Summarize results and offer logical follow-ups.

# Skill: Refactor Code

## Description
Restructure existing code to improve maintainability, readability, and performance without changing its external behavior, using GitHub and Jira.

---

## Purpose
This skill ensures that the codebase remains clean, scalable, and efficient over time. It focuses on improving internal structure, reducing technical debt, and optimizing performance while preserving functional correctness.

---

## Responsibilities

- Analyze existing code for maintainability and performance issues
- Refactor code to improve clarity, structure, and efficiency
- Preserve existing behavior and contracts
- Align refactored code with architecture and conventions
- Minimize risk by making safe, incremental improvements
- Clearly document changes and rationale in Jira

---

## Workflow

### 1. Understand the Context (Jira + GitHub)
- Review the Jira ticket for:
  - Refactor goals (e.g., readability, performance, modularity)
  - Constraints and scope
- Identify:
  - Critical paths and impacted areas
  - Existing issues (duplication, complexity, bottlenecks)
- Ensure clarity on what must **not** change (external behavior, APIs, outputs)

---

### 2. Analyze the Codebase (GitHub)
- Read the relevant code thoroughly
- Identify:
  - Code smells (duplication, long methods, unclear naming)
  - Tight coupling and poor separation of concerns
  - Performance inefficiencies
  - Dead or unused code
- Look for existing patterns to align with

---

### 3. Define Refactor Strategy
- Plan changes before coding:
  - Break refactor into small, safe steps
  - Identify dependencies and order of changes
- Decide:
  - What to simplify, extract, rename, or reorganize
  - What to optimize (only if measurable or clearly beneficial)
- Avoid mixing refactor with feature changes

---

### 4. Execute Incremental Refactor
- Apply changes in small, controlled steps:
  - Extract functions or classes where needed
  - Improve naming for clarity and intent
  - Reduce duplication by consolidating logic
  - Simplify complex conditionals or flows
- Maintain:
  - Existing interfaces and contracts
  - Backward compatibility

---

### 5. Improve Structure and Design
- Enforce:
  - Clear separation of concerns
  - Logical module boundaries
  - Consistent abstraction levels
- Ensure:
  - Code is easier to navigate and reason about
  - Dependencies are minimized and explicit

---

### 6. Optimize Performance (When Applicable)
- Focus only on meaningful improvements:
  - Remove redundant computations
  - Improve inefficient loops or queries
  - Reduce unnecessary memory or I/O usage
- Do not sacrifice readability for micro-optimizations

---

### 7. Validate Behavior Preservation
- Ensure that:
  - Existing functionality remains unchanged
  - No regressions are introduced
- If tests exist:
  - Use them as validation signals
- If gaps are found:
  - Note them in Jira (do not silently ignore risk)

---

### 8. Clean Up
- Remove:
  - Dead code
  - Unused imports
  - Obsolete comments
- Ensure formatting and style consistency

---

### 9. Update Jira
- Provide a clear summary including:
  - What was refactored
  - Why it was necessary
  - Key improvements (readability, performance, structure)
  - Any risks or follow-ups
- Mark the task appropriately (e.g., ready for review)

---

## GitHub Usage Guidelines

- Make focused, incremental changes
- Avoid large, sweeping refactors unless explicitly required
- Keep diffs readable and reviewable
- Preserve commit clarity (each change should have a clear purpose)
- Always understand existing code before modifying it

---

## Jira Usage Guidelines

- Document:
  - Refactor intent and scope
  - Key decisions made
  - Any identified risks or technical debt remaining
- Keep Jira aligned with actual changes performed

---

## Best Practices

- Refactor for humans first, machines second
- Prefer simplicity and clarity over cleverness
- Keep functions small and focused
- Use meaningful names that reflect intent
- Make implicit logic explicit
- Align with existing architecture and patterns

---

## Anti-Patterns to Avoid

- Changing functionality during refactor
- Over-refactoring without clear value
- Introducing new patterns unnecessarily
- Optimizing prematurely without evidence
- Making large, risky changes in one step
- Ignoring existing conventions

---

## Output Expectations

- Cleaner, more maintainable code
- Improved structure and readability
- Preserved functionality and behavior
- Reduced technical debt
- Clear Jira summary explaining changes and impact
- Code ready for testing and review

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Execute workflows, verify outputs, report errors. |
| Read-only | Inspect and plan; provide exact commands or dispatch request for writes. |
| No integration | State limitation; do not fabricate API results. |

### Related tool sets

- `vscode`
- `github`



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

- Legacy content migrated from `skills/old_skills.json` (`refactor-code`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
