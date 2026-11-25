/**
 * One-off migration: extract opt-in skills from master-backend canonical JSON
 * into the public syncolab-skills library. Monorepo / internal use only.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { root as skillsRoot } from './lib/skill-index.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillsJson = path.resolve(
  __dirname,
  '../../../master-backend/src/apps/managents/definitions/agent-studio/skills/skills.json',
);
const outRoot = path.join(skillsRoot, 'skills');

const skills = JSON.parse(fs.readFileSync(skillsJson, 'utf8')).skills;
const ids = [
  'auto-issue-triage',
  'auto-assign-tasks',
  'discover-capability-and-request-access',
];

function stripFence(md) {
  let out = String(md ?? '').trim();
  if (out.startsWith('```markdown')) out = out.slice('```markdown'.length).trimStart();
  else if (out.startsWith('```')) out = out.slice(3).trimStart();
  if (out.endsWith('```')) out = out.slice(0, -3).trimEnd();
  return out;
}

function metaYaml(id, name, description, tags = []) {
  const tagLines = tags.map((t) => `  - ${t}`).join('\n');
  return `name: ${name}
version: 1.0.0
type: procedural
description:
  capability: ${description}
  trigger_conditions: Use when the initiative has opted in to this automated flow.
  scope_boundaries: Follow platform tools only; do not bypass opt-in gates or human approval prompts.
  key_domain_words:
  - ${id}
tags:
${tagLines || `  - ${id}`}
relationships:
  skills: []
  tool_sets: []
`;
}

for (const id of ids) {
  const s = skills.find((x) => x.id === id);
  if (!s) {
    console.error('missing', id);
    process.exitCode = 1;
    continue;
  }
  const dir = path.join(outRoot, id);
  fs.mkdirSync(dir, { recursive: true });
  const body = stripFence(s.content_md);
  fs.writeFileSync(
    path.join(dir, 'SKILL.md'),
    `---\nname: ${id}\ndescription: "${s.description.replace(/"/g, '\\"')}"\n---\n\n${body}\n`,
  );
  fs.writeFileSync(
    path.join(dir, 'meta.yaml'),
    metaYaml(id, s.name, s.description, [id]),
  );
  console.log('wrote', id);
}
