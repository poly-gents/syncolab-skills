# Syncolab Skill Creation Instructions

This document defines the standards, structure, conventions, and best practices for creating new skills in the Syncolab skills repository.

All agents creating or modifying skills must follow these instructions.

This file must stay aligned with:

* `/skills/meta.instructions.md`
* `/skills/meta.schema.json`
* Future SKILL.md validation schemas and validation scripts.

If structural conventions, required files, metadata fields, or validation expectations change, agents must review and update the relevant related files.

---

# Purpose of the Skills Repository

The Syncolab skills repository is a structured knowledge and behavior system for agents.

A skill is not merely a prompt.

A skill is:

* A reusable operational capability.
* A domain-specific behavioral guide.
* A routing and orchestration unit.
* A reusable reasoning framework.
* A standards and quality contract.
* A persistent knowledge artifact.

Skills should help agents:

* Understand what to do.
* Understand when to do it.
* Understand how to do it.
* Understand quality expectations.
* Understand operational constraints.
* Understand tool behavior.
* Understand escalation and boundaries.

A good skill improves agent consistency, reliability, explainability, and orchestration quality.

---

# Skill Directory Structure

Every skill must exist under its own dedicated directory.

The directory name:

* Must be lowercase.
* Must use kebab-case.
* Must be stable.
* Acts as the internal skill identifier.
* Acts as the skill label.
* Is used for routing and references.

Example:

```text
/skills/code-review/
```

Avoid:

```text
/skills/CodeReview/
/skills/code_review/
/skills/review-skill-v2/
```

---

# Required Files

Every skill directory must contain:

```text
SKILL.md
meta.yaml
```

Example:

```text
/skills/code-review/
  SKILL.md
  meta.yaml
```

---

# Optional Directories

Skills may additionally include supporting directories.

## `references/`

Reference documents, examples, specifications, architecture notes, sample outputs, templates, datasets, or supporting material.

Example:

```text
/skills/code-review/references/
```

Possible contents:

* Review examples.
* Architecture references.
* Framework-specific guidance.
* Security checklists.
* RFCs.
* API specifications.

---

## `assets/`

Images, voice assets, diagrams, screenshots, branding material, UI examples, or multimedia resources.

Example:

```text
/skills/demo-narration/assets/
```

---

## `scripts/`

Helper scripts related to the skill.

May include:

* Python.
* Shell.
* Validation utilities.
* Analysis helpers.
* Parsing tools.
* Generators.

Example:

```text
/skills/repository-analysis/scripts/
```

Scripts should remain focused and scoped to the skill.

---

# `meta.yaml`

Every skill must contain a valid `meta.yaml`.

The metadata file:

* Must follow `/skills/meta.instructions.md`.
* Must validate against `/skills/meta.schema.json`.
* Must remain concise and router-friendly.
* Must not duplicate the full SKILL.md instructions.

Future validation scripts under `/scripts` will validate metadata automatically.

Agents must not invent fields or relationship types that are not defined in the schema.

---

# `SKILL.md`

`SKILL.md` is the primary behavioral and operational instruction file for the skill.

A good skill is:

* Clear.
* Focused.
* Operationally useful.
* Concrete.
* Reusable.
* Stable.
* High-signal.
* Structured.
* Easy for agents to follow.

The goal is not verbosity.

The goal is operational clarity.

---

# SKILL.md Frontmatter

Every `SKILL.md` should begin with frontmatter.

Example:

```md
---
name: code-review
description: Reviews pull requests and code changes for correctness, maintainability, security, test coverage, and architectural fit. Use when the user asks for a PR review, code review, merge readiness assessment, or risk analysis of repository changes.
---
```

Rules:

* `name` should match the skill directory name.
* `description` should be concise and routing-friendly.
* The description should explain both capability and activation.

---

# Recommended SKILL.md Structure

A high-quality `SKILL.md` should usually include the following sections.

Not every skill requires every section, but deviations should be intentional.

```md
# Skill Name

## Purpose

## When to Use

## When NOT to Use

## Expected Outcome

## Inputs to Gather

## Workflow

## Tool Availability Rules

## Review / Decision / Execution Criteria

## Output Format

## Quality Bar

## Safety and Boundaries

## Escalation / Dispatch Rules

## References
```

---

# Purpose

Explain the job in human terms.

Good purpose sections:

* Explain intent.
* Explain operational value.
* Explain desired outcomes.
* Explain the kind of reasoning expected.

Bad:

```md
This skill helps with tests.
```

Good:

```md
This skill guides the agent in designing, writing, and maintaining automated tests that improve confidence in the target system without creating brittle or superficial coverage.
```

---

# When to Use

This section is critical.

Agents need routing clarity.

Include:

* Trigger conditions.
* Common request patterns.
* Synonyms.
* Operational situations.
* Expected repository or workflow conditions.

Good example:

```md
Use when the user asks to add tests, improve coverage, create integration tests, validate a repository, prepare a test plan, or prevent regressions.
```

---

# When NOT to Use

Equally important.

Prevents incorrect routing and shallow misuse.

Example:

```md
Do not use for production debugging unless the task is specifically about converting the bug into a regression test.
```

---

# Expected Outcome

Describe what successful execution should produce.

This may include:

* Files.
* Plans.
* Reports.
* Recommendations.
* Structured outputs.
* Repository changes.
* Tickets.
* Validation summaries.

Good outcomes are:

* Observable.
* Concrete.
* Verifiable.

---

# Inputs to Gather

Agents should know what context to inspect before acting.

Examples:

* Repository structure.
* Existing tests.
* Frameworks.
* CI configuration.
* Failing issues.
* Jira tickets.
* Acceptance criteria.
* Recent commits.
* Production risks.
* Existing architecture.
* Environment constraints.

A good skill reduces shallow work by explicitly defining required context gathering.

---

# Workflow

Provide a repeatable process.

The workflow should:

* Prevent shallow execution.
* Encourage deliberate reasoning.
* Define major stages.
* Avoid unnecessary verbosity.

Example:

```md
## Workflow

1. Understand the requested outcome and acceptance criteria.
2. Inspect the relevant code paths and existing tests.
3. Identify the most important behaviors and failure modes.
4. Decide which tests should be unit, integration, contract, or end-to-end.
5. Implement or propose tests according to available tools.
6. Run or describe validation steps.
7. Report what was covered, what remains risky, and what should be done next.
```

Workflows should be operationally meaningful.

Avoid fake precision or unnecessary micromanagement.

---

# Tool Availability Rules

This section is extremely important in Syncolab.

Some agents may:

* Have read-only tools.
* Have write tools only during dispatched tasks.
* Lack execution permissions.
* Have limited integrations.

Skills must explain expected behavior under different tool conditions.

Example:

```md
If only read tools are available, inspect the repository and produce a detailed plan, findings, and recommended changes.

If write tools are required but unavailable, do not pretend to modify files. Ask to dispatch a task or create a task request with the exact intended changes.

If write tools are available, make focused changes, validate them, and summarize the diff and test results.
```

Agents must never fabricate tool results.

---

# Review / Decision / Execution Criteria

This section defines quality dimensions.

Depending on the skill, this may include:

* Security.
* Reliability.
* Maintainability.
* Architecture fit.
* UX quality.
* Risk assessment.
* Performance.
* Edge cases.
* Failure modes.
* Scalability.
* Clarity.
* Correctness.

This section helps agents reason more deeply.

---

# Output Format

Agents perform much better when the expected output shape is explicit.

Good output contracts:

* Reduce ambiguity.
* Improve consistency.
* Improve orchestration.
* Improve downstream parsing.

Example:

```md
Return:
- Summary verdict.
- Critical issues.
- Important improvements.
- Risks.
- Validation results.
- Suggested next actions.
```

---

# Quality Bar

Define what “done well” means.

This section is extremely important.

Good quality bars:

* Prioritize substance over verbosity.
* Encourage evidence-based reasoning.
* Distinguish critical vs optional findings.
* Encourage operational usefulness.
* Encourage maintainability.

Example:

```md
A good review is specific, evidence-based, and prioritizes real risks. It should cite files or behaviors when possible, avoid nitpicks unless they affect maintainability, and distinguish blocking issues from optional improvements.
```

---

# Safety and Boundaries

Operational skills should define constraints.

Examples:

* Do not expose secrets.
* Do not invent tool results.
* Do not bypass permissions.
* Do not make production changes without authorization.
* Do not fabricate repository state.
* State assumptions clearly.
* Request missing context when necessary.

This section is important for reliable autonomous behavior.

---

# Escalation / Dispatch Rules

In multi-agent systems, skills must define:

* When to dispatch.
* When to ask for approval.
* When to escalate.
* When to hand off.
* When to split work.
* When another specialist is required.

Skills should remain focused.

Do not overload a single skill with unrelated behaviors.

---

# Progressive Disclosure Principle

SKILL.md should remain high-signal and readable.

Very large details should be split into:

* `references/`
* Templates.
* Checklists.
* Examples.
* Architecture notes.
* Framework-specific guides.

SKILL.md should act as:

* The operational overview.
* The reasoning guide.
* The behavioral contract.
* The table of contents.

Avoid giant monolithic instruction files.

---

# Skill Design Philosophy

Good skills are:

* Narrow enough to be reliable.
* Broad enough to be reusable.
* Concrete.
* Observable.
* Operationally meaningful.
* Stable over time.
* Explicit about boundaries.
* Explicit about quality.
* Explicit about assumptions.

Bad skills are:

* Vague.
* Generic.
* Tool-dependent without explanation.
* Extremely broad.
* Procedurally chaotic.
* Filled with marketing language.
* Ambiguous about outcomes.
* Missing operational constraints.

---

# Validation Expectations

Future validation systems may validate:

* Required sections.
* Frontmatter.
* Skill naming.
* Metadata alignment.
* Relationship correctness.
* Directory structure.
* Excessive file size.
* Missing operational guidance.
* Missing workflow definitions.
* Missing safety guidance.

Agents should proactively align to these standards.

---

# Example Skill Structure

```text
/skills/code-review/
  meta.yaml
  SKILL.md
  references/
    review-examples.md
    security-checklist.md
  assets/
    architecture-diagram.png
  scripts/
    summarize_pr.py
```

---

# Final Principle

A skill should meaningfully improve the agent’s ability to perform real work.

The goal is not to create prompts.

The goal is to create:

* Reusable operational intelligence.
* Reliable execution behavior.
* Strong routing signals.
* Clear quality expectations.
* Safe autonomous behavior.
* High-quality orchestration primitives.
