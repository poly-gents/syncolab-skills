import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Public skills library root (skills content + manifest.json). */
export const root = process.env.SYNCOLAB_SKILLS_ROOT
  ? path.resolve(process.env.SYNCOLAB_SKILLS_ROOT)
  : path.resolve(__dirname, '../../../');

export const skillsRoot = path.join(root, 'skills');

export const REPO_VERSION = process.env.SYNCOLAB_SKILLS_VERSION || '0.2.0';
export const REPOSITORY =
  process.env.SYNCOLAB_SKILLS_REPOSITORY ||
  'https://github.com/poly-gents/syncolab-skills';

let yaml = null;
try {
  yaml = (await import('js-yaml')).default;
} catch {
  yaml = null;
}

export function checksum(...parts) {
  const hash = crypto.createHash('sha256');
  for (const part of parts) hash.update(part || '');
  return `sha256:${hash.digest('hex')}`;
}

export function readSkillDirs() {
  if (!fs.existsSync(skillsRoot)) return [];
  return fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => !entry.name.startsWith('_'))
    .map((entry) => path.join(skillsRoot, entry.name))
    .filter((dir) => fs.existsSync(path.join(dir, 'SKILL.md')))
    .sort();
}

function loadYaml(source) {
  if (!yaml) return {};
  try {
    const parsed = yaml.load(source);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
}

function readMeta(dir) {
  const metaPath = path.join(dir, 'meta.yaml');
  if (!fs.existsSync(metaPath)) return null;
  const parsed = loadYaml(fs.readFileSync(metaPath, 'utf8'));
  return Object.keys(parsed).length > 0 ? parsed : null;
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) return {};
  const parsed = loadYaml(match[1]);
  return parsed && typeof parsed === 'object' ? parsed : {};
}

export function skillRecord(dir) {
  const id = path.basename(dir);
  const skillMd = fs.readFileSync(path.join(dir, 'SKILL.md'), 'utf8');
  const frontmatter = parseFrontmatter(skillMd);
  const meta = readMeta(dir);
  const description =
    typeof frontmatter.description === 'string'
      ? frontmatter.description
      : meta &&
          meta.description &&
          typeof meta.description.capability === 'string'
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
      (meta && typeof meta.version === 'string' && meta.version) || REPO_VERSION,
    type: meta && typeof meta.type === 'string' ? meta.type : null,
    tags: Array.isArray(meta?.tags) ? meta.tags : [],
    path: `skills/${id}`,
    checksum: checksum(skillMd, meta ? JSON.stringify(meta) : ''),
  };
}

export function buildManifest() {
  const skills = readSkillDirs().map(skillRecord);
  const body = {
    name: 'syncolab-skills',
    version: REPO_VERSION,
    generatedAt: new Date().toISOString(),
    repository: REPOSITORY,
    skills,
  };
  const canonical = JSON.stringify({
    name: body.name,
    version: body.version,
    skills: body.skills,
  });
  body.integrity = checksum(canonical);
  return body;
}
