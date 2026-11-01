// Checks that the editor config matches the JSON files, so saving in /admin cannot silently drop data.
// Run from the project root:  node cms/check-config.mjs
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

let config;
globalThis.window = { initCMS: (opts) => { config = opts.config; }, CMS_MANUAL_INIT: true };
await import(pathToFileURL(path.resolve('cms/config.js')).href);

let problems = 0;
const report = (msg) => { problems++; console.log('  ' + msg); };

function checkFields(fields, value, where) {
  if (value === null || value === undefined) return;
  const byName = new Map(fields.map((f) => [f.name, f]));
  if (typeof value !== 'object' || Array.isArray(value)) { report(`${where}: expected an object`); return; }
  for (const key of Object.keys(value)) {
    if (!byName.has(key)) report(`${where}.${key}: in the JSON but not in the editor (it would be at risk on save)`);
  }
  for (const f of fields) {
    const v = value[f.name];
    if (v === undefined && f.required !== false && f.widget !== 'hidden' && f.widget !== 'boolean') report(`${where}.${f.name}: required in the editor but missing in the JSON`);
    if (f.widget === 'object' && v) checkFields(f.fields, v, `${where}.${f.name}`);
    if (f.widget === 'list' && Array.isArray(v) && f.fields) v.forEach((item, i) => checkFields(f.fields, item, `${where}.${f.name}[${i}]`));
    if (f.widget === 'list' && v !== undefined && !Array.isArray(v)) report(`${where}.${f.name}: expected a list`);
  }
}

for (const col of config.collections) {
  for (const f of col.files) {
    process.stdout.write(`${f.file}\n`);
    let json;
    try { json = JSON.parse(readFileSync(f.file, 'utf8')); } catch (e) { report(`cannot read: ${e.message}`); continue; }
    checkFields(f.fields, json, 'root');
  }
}
console.log(problems ? `\n${problems} problem(s) found.` : '\nThe editor config matches every JSON file.');
