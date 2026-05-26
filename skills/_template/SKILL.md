---
name: _template
description: Canonical scaffold for new Syncolab skills. Use when bootstrapping a skill directory, copying structure and conventions, or checking required sections and metadata before publishing a real skill.
---

# Skill Template

Copy this directory to `/skills/<skill-label>/`, rename placeholders, and replace every section below. Read `/skills/skill.instruction.md` and `/skills/meta.instructions.md`, then check the result against `/skills/meta.schema.json`.

## Purpose

<!-- Replace: explain intent, operational value, and the reasoning this skill should apply. -->

This scaffold provides the canonical directory layout, SKILL.md structure, and meta.yaml fields for authoring new Syncolab skills. A real skill should state what operational capability it provides and what “done well” looks like.

## When to Use

<!-- Replace: triggers, synonyms, and situations that should route to this skill. -->

- Use when creating a new skill from this repository template.
- Use when reviewing whether an in-progress skill has the required files and sections.

## When NOT to Use

<!-- Replace: exclusions that prevent incorrect routing. -->

- Do not treat this directory as a published operational skill.
- Do not route user tasks here except skill authoring or repository maintenance.

## Expected Outcome

<!-- Replace: observable, verifiable artifacts. -->

After copying and editing, the new skill directory should contain valid `SKILL.md` and `meta.yaml` that conform to the repository instruction files and schema.

## Inputs to Gather

<!-- Replace: context the agent must inspect before acting. -->

- `/skills/skill.instruction.md` for SKILL.md conventions.
- `/skills/meta.instructions.md` and `/skills/meta.schema.json` for metadata.
- Existing related skills under `/skills/` for naming and relationship consistency.

## Workflow

<!-- Replace: a repeatable, operationally meaningful process (typically 5–10 steps). -->

1. Copy `/skills/_template/` to `/skills/<skill-label>/` using lowercase kebab-case for `<skill-label>`.
2. Update `SKILL.md` frontmatter: `name` must equal `<skill-label>`; write a routing-friendly `description`.
3. Replace every section in `SKILL.md` with skill-specific guidance; keep the file high-signal.
4. Author `meta.yaml` per `/skills/meta.instructions.md`; ensure `type`, `description`, `tags`, and `relationships` validate.
5. Add optional `references/`, `assets/`, or `scripts/` only when needed; move large detail out of `SKILL.md`.
6. Review against the schema and instruction files, then use **publish-skill** to open a PR.

## Tool Availability Rules

<!-- Replace: behavior under read-only, write, or dispatch-only tool access. -->

- If only read tools are available, produce a plan and exact file contents for the user or a dispatched task.
- If write tools are available, create the skill directory, edit files, and run validation.
- Never fabricate validation results or repository state.

## Review / Decision / Execution Criteria

<!-- Replace: quality dimensions for this skill (security, correctness, UX, etc.). -->

- Directory name matches `name` in `SKILL.md` frontmatter.
- Metadata is concise, router-friendly, and consistent with `SKILL.md`.
- Boundaries and triggers are explicit enough for reliable routing.

## Output Format

<!-- Replace: expected shape of agent responses. -->

When authoring from this template, deliver:

- The target `<skill-label>` and file list.
- Completed `SKILL.md` and `meta.yaml` (or a clear diff).
- Validation command output or remaining fixes.

## Quality Bar

<!-- Replace: what “done well” means for this skill. -->

- High-signal instructions; no marketing filler.
- Evidence-based, concrete workflows and outcomes.
- Safety and tool rules stated explicitly.
- Large reference material lives under `references/`, not in `SKILL.md`.

## Safety and Boundaries

<!-- Replace: constraints for autonomous behavior. -->

- Do not expose secrets in skills or examples.
- Do not invent tool results or validation outcomes.
- State assumptions when context is missing; ask before destructive changes.

## Escalation / Dispatch Rules

<!-- Replace: when to dispatch, approve, or hand off to another skill. -->

- If the task spans multiple domains, split work or add `relationships.skills` entries instead of bloating one skill.
- Dispatch implementation when write tools are unavailable but changes are required.

## References

<!-- Optional: link or point to files under references/ once added. -->

- `/skills/skill.instruction.md`
- `/skills/meta.instructions.md`
- `/skills/meta.schema.json`
