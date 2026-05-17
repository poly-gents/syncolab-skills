# Syncolab Skill Metadata Instructions

This file explains how to author `meta.yaml` files for Syncolab skills.

It must stay aligned with `meta.schema.json`.

If an agent changes field names, required fields, allowed values, relationship types, validation constraints, or examples in either `meta.instructions.md` or `meta.schema.json`, it must review the other file and update it when relevant.

## Source of Truth

* `meta.schema.json` is the source of truth for strict validation.
* `meta.instructions.md` is the source of truth for authoring guidance, semantics, examples, and best practices.
* Skill-specific `meta.yaml` files are the actual metadata instances.

## Expected Location

Global skill metadata files:

```text
/skills/meta.schema.json
/skills/meta.instructions.md
```

Each skill should have its own metadata file:

```text
/skills/<skill-name>/meta.yaml
/skills/<skill-name>/SKILL.md
```

## Purpose of `meta.yaml`

A skill `meta.yaml` helps humans, agents, routers, and platform tooling understand:

* What the skill does.
* When the skill should be selected.
* What the skill does not cover.
* Which domain terms are useful for discovery.
* Which other skills or tool sets it depends on or relates to.
* What type of skill it is.

The metadata should be concise and searchable. Long procedural instructions belong in `SKILL.md`, not in `meta.yaml`.

## Required Fields

Every `meta.yaml` must include:

```yaml
name: ...
version: ...
type: ...
description: ...
tags: ...
relationships: ...
```

## Field Guidance

### `name`

Human-readable display name for the skill.

Use a clear name that would make sense in a skill catalog.

Good examples:

```yaml
name: PR Review
```

```yaml
name: Add Tests
```

```yaml
name: Gmail Search
```

Avoid:

```yaml
name: PR Review v2 for GitHub Agent
```

Do not encode version, owner, or implementation details in the name.

---

### `version`

Semantic version for this skill metadata.

Use:

```yaml
version: "1.0.0"
```

The version must follow semver:

```text
MAJOR.MINOR.PATCH
```

Increment the version when metadata changes affect routing, dependencies, scope, discovery, or behavior.

Examples:

```yaml
version: "0.1.0"
version: "1.0.0"
version: "1.2.3"
```

---

### `type`

The primary category describing the nature of the skill.

Choose exactly one type.

The type should describe the dominant behavior of the skill, not every possible thing the skill might do.

Allowed values:

```yaml
type: conversational
type: operational
type: methodical
type: environmental
type: instrumental
type: analytical
type: planning
type: diagnostic
type: creative
type: governance
type: integrative
type: educational
type: supervisory
```

#### Type Meanings

##### `conversational`

Use for skills that help the agent communicate, ask, respond, summarize, clarify, or manage dialogue.

Examples:

* Customer support reply.
* Interviewing a user.
* Writing follow-up messages.
* Explaining status in natural language.

##### `operational`

Use for skills that execute or coordinate real work across systems, workflows, tools, or tasks.

Examples:

* Process onboarding data.
* Create Jira tickets.
* Dispatch work to another agent.
* Move work through a business workflow.

##### `methodical`

Use for skills that provide a structured method, procedure, framework, or repeatable reasoning process.

Examples:

* Code review methodology.
* Root-cause analysis process.
* Test planning method.
* Refactoring methodology.

##### `environmental`

Use for skills that help the agent understand, monitor, or react to its surrounding workspace, project, runtime, or context.

Examples:

* Understand repository structure.
* Interpret workspace state.
* React to project environment changes.
* Understand available files, tasks, or teammates.

##### `instrumental`

Use for skills that teach the agent how to use a tool, integration, capability, or interface.

Examples:

* GitHub usage.
* Google Drive usage.
* Calendar operations.
* Jira workflow usage.

##### `analytical`

Use for skills that interpret information, evaluate evidence, compare options, or produce reasoned conclusions.

Examples:

* Analyze logs.
* Evaluate proposal risks.
* Compare implementation approaches.
* Review telemetry.

##### `planning`

Use for skills that create plans, roadmaps, task breakdowns, milestones, or execution strategies.

Examples:

* Sprint planning.
* Implementation planning.
* Migration planning.
* Test-bed planning.

##### `diagnostic`

Use for skills that investigate failures, bugs, inconsistencies, regressions, or unclear system behavior.

Examples:

* Debug production issue.
* Diagnose failing tests.
* Analyze error reports.
* Investigate unexpected agent behavior.

##### `creative`

Use for skills that produce creative, narrative, marketing, design, branding, or ideation outputs.

Examples:

* Write campaign copy.
* Generate product messaging.
* Brainstorm brand directions.
* Produce demo narration.

##### `governance`

Use for skills that define rules, standards, compliance expectations, review criteria, or decision constraints.

Examples:

* Security policy.
* Coding standards.
* Approval rules.
* Architecture constraints.

##### `integrative`

Use for skills that connect multiple domains, tools, agents, systems, or sources into one coordinated workflow.

Examples:

* Cross-tool automation.
* Multi-agent orchestration.
* Syncing GitHub, Jira, and Drive work.
* Combining repository analysis with planning and documentation.

##### `educational`

Use for skills that teach concepts, explain processes, or help a user or agent learn.

Examples:

* Explain architecture.
* Teach development practices.
* Onboard a new agent.
* Explain how to use a system.

##### `supervisory`

Use for skills that oversee, review, coordinate, delegate, or validate the work of other agents or processes.

Examples:

* Review agent output.
* Monitor task progress.
* Decide whether work is complete.
* Coordinate subtasks between agents.

---

### `description`

The `description` object is compact router-facing and agent-facing metadata.

It must include:

```yaml
description:
  capability: ...
  trigger_conditions: ...
  scope_boundaries: ...
  key_domain_words:
    - ...
```

The description should help an agent or router understand whether this skill is relevant.

Do not put long procedural instructions here. Put them in `SKILL.md`.

#### `description.capability`

What the skill enables.

Start with the outcome.

Good example:

```yaml
capability: Reviews pull requests for correctness, maintainability, security, and test coverage.
```

Avoid vague wording:

```yaml
capability: Helps with code.
```

#### `description.trigger_conditions`

When the skill should be selected.

Prefer wording that starts with “Use when...”.

Good example:

```yaml
trigger_conditions: Use when the user asks for a PR review, code review, merge readiness check, or risk assessment.
```

#### `description.scope_boundaries`

What the skill does and does not cover.

State exclusions and limitations clearly.

Good example:

```yaml
scope_boundaries: Focuses on review and recommendations; does not modify code unless write tools are explicitly available or a task is dispatched.
```

#### `description.key_domain_words`

Router and search matching terms.

Use an array of meaningful terms.

Terms do not need to be snake_case.

Good example:

```yaml
key_domain_words:
  - GitHub
  - pull request
  - diff
  - repository
  - tests
  - regression
  - architecture
  - security
```

---

### `tags`

Discovery, filtering, routing, and catalog labels.

Tags must be lowercase `kebab-case`.

Good example:

```yaml
tags:
  - code-review
  - github
  - pull-request
  - security
  - merge-readiness
```

Avoid:

```yaml
tags:
  - CodeReview
  - pull_request
  - GitHub
```

Use stable conceptual labels, not temporary project names.

---

### `relationships`

Relationships declare outgoing graph edges to related skills and tool sets.

Always include both `skills` and `tool_sets`, even when empty.

```yaml
relationships:
  skills: []
  tool_sets: []
```

#### `relationships.skills`

Related skill packages.

Allowed relationship types:

```yaml
references
must-use
can-use
overrides
conflicts-with
extends
```

Meanings:

* `references`: Target skill is relevant background or optional guidance.
* `must-use`: Target skill should always be loaded with this skill.
* `can-use`: Target skill may be useful depending on the task.
* `overrides`: This skill supersedes the target skill for overlapping behavior.
* `conflicts-with`: These skills should not be active together without resolution.
* `extends`: This skill builds on top of the target skill.

Example:

```yaml
relationships:
  skills:
    - name: split-to-prs
      type: references
    - name: babysit-pr
      type: can-use
  tool_sets: []
```

#### `relationships.tool_sets`

Related tool families or integration groups.

Allowed relationship types:

```yaml
must-have
can-have
assume-having
prefers
documents
```

Meanings:

* `must-have`: The skill cannot succeed without this tool set.
* `can-have`: The tool set improves results but is optional.
* `assume-having`: Skill instructions assume this tool set exists.
* `prefers`: Prefer this tool set over alternatives.
* `documents`: Describes integration expectations without requiring runtime access.

Example:

```yaml
relationships:
  skills: []
  tool_sets:
    - name: github
      type: must-have
```

## Quality Rules

Good skill metadata should be:

* Concise.
* Searchable.
* Router-friendly.
* Stable.
* Clear about boundaries.
* Aligned with `SKILL.md`.
* Valid against `meta.schema.json`.

Avoid:

* Long procedural guidance.
* Marketing language.
* Vague capability descriptions.
* Temporary project-specific tags.
* Invented relationship types.
* Tool-specific assumptions unless declared in `relationships.tool_sets`.

## Example `meta.yaml`

```yaml
name: PR Review
version: "1.0.0"
type: methodical

description:
  capability: Reviews pull requests for correctness, maintainability, security, and test coverage.
  trigger_conditions: Use when the user asks for a PR review, code review, merge readiness check, or risk assessment.
  scope_boundaries: Focuses on review and recommendations; does not modify code unless write tools are explicitly available or a task is dispatched.
  key_domain_words:
    - GitHub
    - pull request
    - diff
    - repository
    - tests
    - regression
    - architecture
    - security

tags:
  - code_review
  - github
  - pull_request
  - security
  - merge_readiness

relationships:
  skills:
    - name: split-to-prs
      type: references
    - name: babysit-pr
      type: can-use
  tool_sets:
    - name: github
      type: must-have
```

## Agent Editing Rule

When editing this file, agents must check whether the same change affects `meta.schema.json`.

Examples:

* Adding a new skill `type` requires updating `meta.schema.json`.
* Removing a relationship type requires updating `meta.schema.json`.
* Changing field names requires updating `meta.schema.json`.
* Changing examples may require updating examples in existing skill folders.
* Changing guidance without changing validation may not require schema changes.

When editing `meta.schema.json`, agents must check whether `meta.instructions.md` should also be updated.
