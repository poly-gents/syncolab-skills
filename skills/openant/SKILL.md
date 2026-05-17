---
name: openant
description: Runs the OpenAnt CLI for development and analysis tasks, captures output, and summarizes actionable findings. Use when the user requests OpenAnt commands or interpretation of OpenAnt results.
---

# OpenAnt

## Purpose

Execute OpenAnt CLI tasks safely, capture stdout/stderr, and return concise actionable findings and suggested follow-up commands.

## When to Use

- User explicitly asks to run OpenAnt or refers to OpenAnt analysis.
- Interpreting OpenAnt output after a local or CI run.
- Exploring repo/analysis workflows documented for OpenAnt.

## When NOT to Use

- Tasks better served by other CLIs or skills without OpenAnt context.
- Destructive operations without explicit user confirmation.
- Skill repo authoring → **create-skill** / **publish-skill**.

## Expected Outcome

- Commands run (or exact commands provided if sandboxed) with captured output.
- Summary of findings, errors, and recommended next commands.
- Clear stop before destructive flags.

## Inputs to Gather

- Requested OpenAnt subcommand or goal.
- Working directory and repo context.
- Flags that may be destructive (`--force`, delete, overwrite).
- Whether network or credentials are required.

## Workflow

1. Confirm `openant` tool or shell access.
2. Construct command from user intent; avoid destructive flags unless approved.
3. Run and capture stdout/stderr with exit code.
4. Summarize actionable findings and anomalies.
5. Suggest next commands; do not chain destructive steps without confirmation.

## Domain guidance

Run OpenAnt for the task the user requested; capture stdout/stderr; summarize actionable findings and next commands. Do not run destructive commands without explicit confirmation.

- Prefer dry-run or read-only subcommands when available.
- Quote paths with spaces; run from repo root unless specified.
- Never fabricate CLI output.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Full tool access | Execute OpenAnt and report results. |
| Read-only | Output exact command for user to run. |
| No shell | Provide command template only; no fabricated output. |

### Related tool sets

- `openant`

## Review / Decision / Execution Criteria

- Include exit code and key log lines in summary.
- Flag destructive operations before execution.

## Output Format

1. Command(s) executed.
2. Exit status.
3. Findings (bullets).
4. Suggested next commands.
5. Warnings or blockers.

## Quality Bar

- Concise operator summary, not full log dump unless requested.

## Safety and Boundaries

- No destructive commands without explicit user approval.
- Do not fabricate OpenAnt output or success.

## Escalation / Dispatch Rules

- Implementation follow-up → **implement-features**, **refactor-code**.

## References

- `skills/old_skills.json` (`openant`).
- `skills/skill.instruction.md`, `skills/meta.instructions.md`
