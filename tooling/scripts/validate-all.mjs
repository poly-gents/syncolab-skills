#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { buildManifest, readSkillDirs, root } from './lib/skill-index.mjs';

if (!fs.existsSync(root)) {
  process.stderr.write(
    `Skills repo not found at ${root}. Set SYNCOLAB_SKILLS_ROOT or clone syncolab-skills as a sibling.\n`,
  );
  process.exit(1);
}

const errors = [];
for (const dir of readSkillDirs()) {
  const id = path.basename(dir);
  if (!fs.existsSync(path.join(dir, 'meta.yaml'))) {
    errors.push(`${id}: missing meta.yaml`);
  }
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(id)) {
    errors.push(`${id}: invalid skill id (kebab-case required)`);
  }
  const fm = fs.readFileSync(path.join(dir, 'SKILL.md'), 'utf8');
  if (!fm.match(/^---\s*\n[\s\S]*?\n---/)) {
    errors.push(`${id}: SKILL.md missing YAML frontmatter`);
  }
}

if (errors.length > 0) {
  process.stderr.write(`${errors.join('\n')}\n`);
  process.exit(1);
}

const manifest = buildManifest();
process.stdout.write(`Validated ${manifest.skills.length} skills under ${root}.\n`);
