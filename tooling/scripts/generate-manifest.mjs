#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { buildManifest, root } from './lib/skill-index.mjs';

if (!fs.existsSync(root)) {
  process.stderr.write(
    `Skills repo not found at ${root}. Set SYNCOLAB_SKILLS_ROOT or clone syncolab-skills as a sibling.\n`,
  );
  process.exit(1);
}

const write = process.argv.includes('--write');
const manifest = buildManifest();
const outPath = path.join(root, 'manifest.json');
const json = `${JSON.stringify(manifest, null, 2)}\n`;
if (write) {
  fs.writeFileSync(outPath, json, 'utf8');
  process.stdout.write(
    `Wrote ${outPath} (${manifest.skills.length} skills, integrity ${manifest.integrity})\n`,
  );
} else {
  process.stdout.write(json);
}
