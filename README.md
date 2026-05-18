# Syncolab Skills

Installable Syncolab agent skills package.

## Commands

```bash
npx @syncolab/skills list
npx @syncolab/skills manifest
npx @syncolab/skills validate
npx @syncolab/skills install ./skills --all
npx @syncolab/skills install ./skills --skill syncolab-living-docs
```

The package exposes skills as directories under `skills/<skill-id>/` with `SKILL.md`
and `meta.yaml`. Platform imports should prefer manifest/scanning workflows over
executing arbitrary skill scripts.
# syncolab-skills

Structured skills for Syncolab agents: reusable operational capabilities, routing signals, and quality contracts—not one-off prompts.

Each skill is a small package (instructions plus metadata) that helps agents know **what** to do, **when** to do it, **how** to do it well, and **where** to stop.

## Repository layout

| Path | Purpose |
|------|---------|
| [`skills/`](skills/) | One folder per skill (`<skill-label>/`) |
| [`skills/_template/`](skills/_template/) | Canonical scaffold for new skills |
| [`skills/skill.instruction.md`](skills/skill.instruction.md) | How to author `SKILL.md`, directory layout, and skill design |
| [`skills/meta.instructions.md`](skills/meta.instructions.md) | How to author `meta.yaml` (semantics, examples, relationships) |
| [`skills/meta.schema.json`](skills/meta.schema.json) | JSON Schema for strict `meta.yaml` validation |
| [`scripts/validate_skill.py`](scripts/validate_skill.py) | Validate a skill directory against schema and conventions |

## What is a skill?

A skill directory contains at minimum:

- **`SKILL.md`** — behavioral and operational instructions (workflow, quality bar, boundaries, tool rules).
- **`meta.yaml`** — concise, router-facing metadata (capability, triggers, tags, relationships).

Optional supporting folders: `references/`, `assets/`, `scripts/`.

The folder name is the stable skill identifier: lowercase **kebab-case** (for example `add-tests`, `analyze-engagement`).

## Read next

| Audience | Start here |
|----------|------------|
| **Authors** (new or updated skills) | [`skills/skill.instruction.md`](skills/skill.instruction.md) → copy [`skills/_template/`](skills/_template/) → follow [`skills/meta.instructions.md`](skills/meta.instructions.md) |
| **Metadata / routing** | [`skills/meta.instructions.md`](skills/meta.instructions.md) and [`skills/meta.schema.json`](skills/meta.schema.json) |
| **Browsing skills** | [`skills/README.md`](skills/README.md) and individual `skills/<skill-label>/` folders |

## Validate a skill

From the repository root (requires `pyyaml` and `jsonschema`):

```bash
pip install pyyaml jsonschema
python scripts/validate_skill.py <skill-label>
```

Example:

```bash
python scripts/validate_skill.py analyze-engagement
```

## Conventions

- One skill per directory; keep procedural detail in `SKILL.md`, discovery and routing in `meta.yaml`.
- Prefer small, composable skills over monolithic instruction files; use `references/` for long supporting material.
- When changing metadata rules, keep [`skills/meta.instructions.md`](skills/meta.instructions.md) and [`skills/meta.schema.json`](skills/meta.schema.json) aligned.
