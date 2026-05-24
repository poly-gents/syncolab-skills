#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
let yaml = null;
try {
  yaml = require('js-yaml');
} catch {
  yaml = null;
}

const root = path.resolve(__dirname, '..');
const skillsRoot = path.join(root, 'skills');

function usage(exitCode = 0) {
  const stream = exitCode === 0 ? process.stdout : process.stderr;
  stream.write(`Usage:
  syncolab-skills list [--json]
  syncolab-skills manifest
  syncolab-skills validate
  syncolab-skills install <targetDir> [--all|--skill <id> ...]
`);
  process.exit(exitCode);
}

function readSkillDirs() {
  return fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => !entry.name.startsWith('_'))
    .map((entry) => path.join(skillsRoot, entry.name))
    .filter((dir) => fs.existsSync(path.join(dir, 'SKILL.md')))
    .sort();
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) return {};
  return loadYaml(match[1]);
}

function readMeta(dir) {
  const metaPath = path.join(dir, 'meta.yaml');
  if (!fs.existsSync(metaPath)) return null;
  return loadYaml(fs.readFileSync(metaPath, 'utf8'));
}

function loadYaml(source) {
  if (yaml) return yaml.load(source) || {};
  const out = {};
  let currentArrayKey = null;
  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+#.*$/, '');
    if (!line.trim()) continue;
    const arrayItem = line.match(/^\s*-\s+(.+?)\s*$/);
    if (arrayItem && currentArrayKey) {
      out[currentArrayKey].push(arrayItem[1].replace(/^['"]|['"]$/g, ''));
      continue;
    }
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, value] = match;
    if (!value.trim()) {
      if (key === 'tags') out[key] = [];
      else out[key] = {};
      currentArrayKey = Array.isArray(out[key]) ? key : null;
      continue;
    }
    currentArrayKey = null;
    out[key] = value.trim().replace(/^['"]|['"]$/g, '');
  }
  return out;
}

function checksum(...parts) {
  const hash = crypto.createHash('sha256');
  for (const part of parts) hash.update(part || '');
  return `sha256:${hash.digest('hex')}`;
}

function skillRecord(dir) {
  const id = path.basename(dir);
  const skillMd = fs.readFileSync(path.join(dir, 'SKILL.md'), 'utf8');
  const frontmatter = parseFrontmatter(skillMd);
  const meta = readMeta(dir);
  const description =
    typeof frontmatter.description === 'string'
      ? frontmatter.description
      : meta && meta.description && typeof meta.description.capability === 'string'
        ? meta.description.capability
        : '';
  return {
    id,
    name:
      (meta && typeof meta.name === 'string' && meta.name) ||
      (typeof frontmatter.name === 'string' && frontmatter.name) ||
      id,
    description,
    version:
      (meta && typeof meta.version === 'string' && meta.version) ||
      require(path.join(root, 'package.json')).version,
    type: meta && typeof meta.type === 'string' ? meta.type : null,
    tags: Array.isArray(meta && meta.tags) ? meta.tags : [],
    path: `skills/${id}`,
    checksum: checksum(skillMd, meta ? JSON.stringify(meta) : ''),
  };
}

function manifest() {
  const pkg = require(path.join(root, 'package.json'));
  return {
    name: pkg.name,
    version: pkg.version,
    generatedAt: new Date().toISOString(),
    skills: readSkillDirs().map(skillRecord),
  };
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else if (entry.isFile()) fs.copyFileSync(from, to);
  }
}

function parseInstallSelection(args) {
  const selected = new Set();
  let all = false;
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--all') all = true;
    else if (args[i] === '--skill') {
      const value = args[i + 1];
      if (!value) usage(1);
      selected.add(value);
      i += 1;
    }
  }
  return { all, selected };
}

function run() {
  const [command, ...args] = process.argv.slice(2);
  if (!command || command === '--help' || command === '-h') usage(0);

  if (command === 'manifest') {
    process.stdout.write(`${JSON.stringify(manifest(), null, 2)}\n`);
    return;
  }

  if (command === 'list') {
    const records = manifest().skills;
    if (args.includes('--json')) {
      process.stdout.write(`${JSON.stringify(records, null, 2)}\n`);
      return;
    }
    for (const skill of records) {
      process.stdout.write(`${skill.id}\t${skill.version}\t${skill.name}\n`);
    }
    return;
  }

  if (command === 'validate') {
    const errors = [];
    for (const dir of readSkillDirs()) {
      const id = path.basename(dir);
      if (!fs.existsSync(path.join(dir, 'meta.yaml'))) {
        errors.push(`${id}: missing meta.yaml`);
      }
      const record = skillRecord(dir);
      if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(record.id)) {
        errors.push(`${id}: invalid skill id`);
      }
    }
    if (errors.length > 0) {
      process.stderr.write(`${errors.join('\n')}\n`);
      process.exit(1);
    }
    process.stdout.write(`Validated ${manifest().skills.length} skills.\n`);
    return;
  }

  if (command === 'install') {
    const target = args[0];
    if (!target || target.startsWith('-')) usage(1);
    const { all, selected } = parseInstallSelection(args.slice(1));
    const records = manifest().skills.filter(
      (skill) => all || selected.has(skill.id),
    );
    if (!all && selected.size === 0) usage(1);
    for (const skill of records) {
      copyDir(path.join(skillsRoot, skill.id), path.join(path.resolve(target), skill.id));
    }
    process.stdout.write(`Installed ${records.length} skills into ${path.resolve(target)}.\n`);
    return;
  }

  usage(1);
}

run();
