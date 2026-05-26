# Skills directory

This folder holds **one package per skill**. Each package is a reusable capability for Syncolab agents: operational instructions plus metadata for discovery, routing, and orchestration.

There are many skill folders here (integrations, engineering workflows, planning, governance, shadows, and more). Browse by name or search `meta.yaml` / `SKILL.md` frontmatter for triggers and domain terms.

## Standard layout

Every published skill directory must include:

```text
skills/<skill-label>/
  SKILL.md      # Primary behavioral instructions
  meta.yaml     # Router-facing metadata (validated against meta.schema.json)
```

Optional (when the skill needs them):

```text
  references/   # Specs, checklists, examples, long-form guides
  assets/       # Diagrams, screenshots, branding
  scripts/      # Skill-scoped helpers (validation, parsing, generators)
```

**`<skill-label>`** rules:

- Lowercase kebab-case (for example `code-review`, `google-calendar`).
- Stable over time; used as the skill identifier in relationships and routing.
- Should match the `name` in `SKILL.md` frontmatter.

Scaffold only (not a routed operational skill): [`_template/`](_template/).

## What goes where

| File | Role |
|------|------|
| **`SKILL.md`** | Purpose, when to use / not use, workflow, tool rules, output format, quality bar, safety, escalation. Long procedures belong in `references/`, not here. |
| **`meta.yaml`** | `name`, `version`, `type`, `description` (capability, triggers, scope, key words), `tags`, `relationships` to other skills and tool sets. Keep it concise and searchable. |

`meta.yaml` must follow [`meta.instructions.md`](meta.instructions.md) and validate against [`meta.schema.json`](meta.schema.json).

## Authoring

1. Read [`skill.instruction.md`](skill.instruction.md) for `SKILL.md` structure, philosophy, and required files.
2. Read [`meta.instructions.md`](meta.instructions.md) for `meta.yaml` fields, skill types, tags, and relationships.
3. Copy [`_template/`](_template/) to `skills/<skill-label>/` and replace placeholders.
4. Open a pull request with your changes. The Syncolab team reviews skill content against the schema and instruction files before merge.

If you change allowed fields, types, or relationship enums, update **both** `meta.instructions.md` and `meta.schema.json`.

## Global files (this directory)

| File | Purpose |
|------|---------|
| [`skill.instruction.md`](skill.instruction.md) | Skill creation standards and `SKILL.md` conventions |
| [`meta.instructions.md`](meta.instructions.md) | `meta.yaml` authoring guide |
| [`meta.schema.json`](meta.schema.json) | Source of truth for metadata validation |

Repository overview: [`../README.md`](../README.md).
