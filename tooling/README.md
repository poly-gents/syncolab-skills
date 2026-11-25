# Syncolab Skills Tooling

Maintainer package for the public [`poly-gents/syncolab-skills`](https://github.com/poly-gents/syncolab-skills) library, kept under this repository's `tooling/` directory.

The package is marked private so it cannot be published to npm. It is included in this public GitHub repository.

## Monorepo layout

```text
syncolab-skills/
  tooling/                  # this package and CI
  skills/                   # public library
  manifest.json
```

Default `SYNCOLAB_SKILLS_ROOT` resolves to the parent `syncolab-skills` repository.

## Setup

```bash
cd syncolab-skills/tooling
npm install
pip install pyyaml jsonschema
```

## Commands

| Command | Purpose |
|---------|---------|
| `npm run validate` | Check all skills (frontmatter, meta.yaml, kebab-case ids) |
| `npm run manifest` | Print manifest JSON to stdout |
| `npm run manifest:write` | Write `../manifest.json` |
| `python scripts/validate_skill.py <skill-id>` | Schema + structure check for one skill |

Override library path:

```bash
export SYNCOLAB_SKILLS_ROOT=/path/to/syncolab-skills
```

## Release workflow

1. Change skills under `syncolab-skills/skills/`.
2. `npm run validate`
3. `python scripts/validate_skill.py <skill-id>` for each changed skill.
4. `npm run manifest:write` and commit `manifest.json` in **syncolab-skills**.
5. Bump `integrity` in `master-backend/.../skill-registry/registry.json` for the `syncolab` provider to match the new manifest.

## GitHub Actions

CI runs in this repository via [`.github/workflows/skills-ci.yml`](../.github/workflows/skills-ci.yml). See [`docs/github-actions.md`](docs/github-actions.md).

## Clone and run

```bash
git clone https://github.com/poly-gents/syncolab-skills.git
cd syncolab-skills/tooling && npm install && npm run validate
```

## Internal scripts

- `scripts/extract-opt-in-skills.mjs` — one-off migration from `master-backend` canonical `skills.json` (monorepo only).
