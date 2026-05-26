---
name: create-skill
description: Authors new Syncolab skills in a cloned skills repository using shell, template, and validation. Use when adding or improving a skill under skills/, writing SKILL.md or meta.yaml, or preparing a skill package before publish.
---

# Create Skill

## Purpose

Guides agents through authoring a new Syncolab skill in a cloned skills repository: a reusable operational capability with clear routing, metadata, and validation—not a one-off prompt.

Assume **syncolab-skills** is cloned locally and the agent has shell access to edit files under `skills/`.

## When to Use

- User asks to create, add, scaffold, or improve a Syncolab skill.
- User wants a new directory under `skills/<skill-label>/`.
- User needs help with `SKILL.md`, `meta.yaml`, structure, or validation errors.
- A skill exists locally but fails validation or lacks required sections.

## When NOT to Use

- User only wants to open a GitHub PR or merge to `main` → use **publish-skill**.
- User wants a personal Cursor skill under `~/.cursor/skills/` (different product; not this repo).
- Task is unrelated to skill authoring (general coding, unrelated repo work).

## Expected Outcome

- New or updated `skills/<skill-label>/` with `SKILL.md` and `meta.yaml`.
- `<skill-label>` is lowercase kebab-case and matches `name` in `SKILL.md` frontmatter.
- `SKILL.md` and `meta.yaml` conform to `skills/skill.instruction.md`, `skills/meta.instructions.md`, and `skills/meta.schema.json` (errors fixed; warnings reviewed).
- Metadata aligns with the skill body; procedural detail lives in `SKILL.md`, not duplicated in `meta.yaml`.

## Inputs to Gather

Before writing files, collect:

1. **Skill label** — stable kebab-case id (directory name), e.g. `code-review`.
2. **Purpose** — what operational capability the skill provides.
3. **Triggers** — when routers/agents should select it (synonyms, situations).
4. **Boundaries** — what it must not do.
5. **Type** — one value from `meta.instructions.md` (`methodical`, `operational`, etc.).
6. **Relationships** — related skills or tool sets (`github`, etc.) if any.
7. **Optional assets** — whether `references/`, `assets/`, or `scripts/` are needed.

Read these repo sources (do not guess conventions):

- `skills/skill.instruction.md` — SKILL.md standards and sections.
- `skills/meta.instructions.md` — `meta.yaml` authoring rules.
- `skills/meta.schema.json` — strict metadata validation.
- `skills/_template/` — canonical starter layout.
- Existing skills under `skills/` for naming and relationship patterns.

## Workflow

### 1. Confirm environment

From **syncolab-skills** root:

```bash
test -d skills && echo OK
```

### 2. Choose and validate the label

- Use lowercase kebab-case: `^[a-z][a-z0-9]*(-[a-z0-9]+)*$`.
- Do not use `_template` for real skills (scaffold only).
- List siblings: `ls skills/` — avoid collisions and confusing names (`helper`, `utils`).

### 3. Scaffold the directory

```bash
SKILL_LABEL="your-skill-label"
cp -R skills/_template "skills/${SKILL_LABEL}"
```

Remove HTML comment placeholders as you replace content.

### 4. Author `SKILL.md`

**Frontmatter** (required):

```yaml
---
name: your-skill-label   # must equal directory name
description: ...         # capability + when to use; ≥20 chars; routing-friendly
---
```

**Body** — include the sections that matter for this skill (see `skill.instruction.md`). At minimum aim for:

- Purpose, When to Use, When NOT to Use, Expected Outcome
- Inputs to Gather, Workflow, Tool Availability Rules
- Output Format, Quality Bar, Safety and Boundaries

**Authoring principles:**

- **Concise, high-signal** — the agent is capable; add only non-obvious domain knowledge.
- **Progressive disclosure** — move long checklists, examples, and specs to `references/`; link one level deep from `SKILL.md`.
- **Concrete workflows** — numbered steps the agent can follow; avoid fake precision.
- **Explicit tool behavior** — read-only vs write vs dispatch; never fabricate tool results.
- **Verbatim user text** — if the user supplies exact wording for the skill, preserve it.

### 5. Author `meta.yaml`

Follow `meta.instructions.md`. Required shape:

```yaml
name: Human Readable Name
version: "1.0.0"
type: methodical   # pick one allowed type

description:
  capability: ...
  trigger_conditions: Use when ...
  scope_boundaries: ...
  key_domain_words:
    - ...

tags:
  - your-skill-label   # include the skill label
  - ...

relationships:
  skills: []
  tool_sets: []
```

- Tags: lowercase kebab-case only.
- `description` fields: short, router-facing; no long procedures.
- Relationship `name` values: kebab-case skill ids (not display names).
- Do not invent relationship types outside the schema.

### 6. Add optional directories only when needed

| Directory    | Use for |
|-------------|---------|
| `references/` | Long examples, checklists, specs |
| `assets/`     | Images, audio, PDFs |
| `scripts/`    | Skill-scoped helpers |

No other top-level folders under the skill directory.

### 7. Review and fix

Check the skill against `skills/meta.schema.json` and the required sections in `skills/skill.instruction.md` (frontmatter `name` matches `<skill-label>`, kebab-case id, triggers, boundaries, recommended `SKILL.md` headings).

Fix all structural and schema **errors** before considering the skill done. Review **warnings** (missing recommended sections, size, metadata alignment).

Repeat edit → review until ready for **publish-skill**.

### 8. Hand off to publish (if requested)

If the user wants the skill on `main`, switch to **publish-skill** after validation passes.

## Tool Availability Rules

| Access | Behavior |
|--------|----------|
| Shell + write | Scaffold, edit files, run validation, report command output. |
| Read-only | Produce full file contents and exact shell commands; do not claim files were written. |
| No shell | Output planned paths and draft `SKILL.md` / `meta.yaml`; ask for dispatch or shell access. |

Always run or show real validation output—never invent pass/fail.

## Review / Decision / Execution Criteria

A skill is ready when:

- Label, frontmatter `name`, and directory name match.
- `meta.yaml` validates against `meta.schema.json`.
- Triggers and anti-triggers are explicit enough for routing.
- Workflow is actionable without this chat’s context.
- Safety and tool rules are stated.
- `SKILL.md` stays focused; large content is in `references/`.

**Anti-patterns:** vague descriptions, marketing language, Windows paths, time-sensitive “before date X” rules, mixing terminology, bloated monolithic `SKILL.md`, secrets in examples.

## Output Format

Report to the user:

1. **Skill label** and path `skills/<skill-label>/`.
2. **Files created/updated** (list).
3. **Validation** — command run and result (pass or errors to fix).
4. **Follow-ups** — optional `references/`, relationship updates, or publish-skill next step.

## Quality Bar

- Description states **what** the skill does and **when** to use it (third person, specific trigger terms).
- Purpose explains operational value, not “helps with X.”
- Boundaries prevent misuse and wrong routing.
- Evidence-based: cite repo paths and validation output when relevant.
- Substance over length; target well under 500 lines in `SKILL.md`.

## Safety and Boundaries

- Do not commit secrets, tokens, or internal URLs into skills.
- Do not fabricate validation results or repository state.
- Do not modify unrelated skills or global schema unless the user explicitly requests it.
- State assumptions when requirements are incomplete; ask before large scope expansion.

## Escalation / Dispatch Rules

- **Too broad** — split into multiple focused skills with `relationships.skills` instead of one mega-skill.
- **Publish to GitHub** — use **publish-skill**; do not push or open PRs unless the user asked.
- **Schema/instruction changes** — if conventions must change, update `skill.instruction.md` / `meta.instructions.md` / `meta.schema.json` together per repo rules.

## References

- `skills/skill.instruction.md`
- `skills/meta.instructions.md`
- `skills/meta.schema.json`
- `skills/_template/`
- `skills/meta.schema.json` — metadata validation rules
