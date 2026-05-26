# Syncolab Skills

This repository contains [Agent Skills](https://agentskills.io) for Syncolab products and digital employees.

## Installation

```bash
npx skills add poly-gents/syncolab-skills
```

From the install command, you can select specific skills from this repository to add to your agent environment. To list available skills:

```bash
npx skills add poly-gents/syncolab-skills --list
```

Install options and supported agents are documented in the [skills CLI](https://github.com/vercel-labs/skills) repository.

## Repository layout

Skills live under [`skills/<skill-id>/`](skills/), each with:

- **`SKILL.md`** — agent instructions (YAML frontmatter and markdown body)
- **`meta.yaml`** — Syncolab routing metadata (triggers, tags, relationships)

Authoring conventions are in [`skills/skill.instruction.md`](skills/skill.instruction.md) and [`skills/meta.instructions.md`](skills/meta.instructions.md). A scaffold is available at [`skills/_template/`](skills/_template/).

## Support

If you need help or find an issue with a skill, search for existing issues or open a new one in the [GitHub issue tracker](https://github.com/poly-gents/syncolab-skills/issues).

## Contributing

We welcome contributions to improve these skills. You can help by:

- [Reporting bugs or inaccuracies](https://github.com/poly-gents/syncolab-skills/issues) in skill content.
- Suggesting new or updated skills by opening an issue or pull request with changes under `skills/`.

Pull requests should follow the structure in `skills/_template/` and the instruction files above. The Syncolab team reviews and merges skill changes.

## License

You are free to copy, modify, and distribute these skills under the terms of the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
