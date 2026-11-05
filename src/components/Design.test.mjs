// Run after the static build: node src/components/Design.test.mjs
// Assert actual route output and the real collection schema without installing test tooling.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { z } from 'astro/zod';

const root = new URL('../../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const home = read('dist/index.html');
const clint = read('dist/tools/clint/index.html');
const relay = read('dist/tools/relay/index.html');
const ids = (html) => [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const contents = (html) =>
  html.match(/<nav class="doc-contents"[^>]*>([\s\S]*?)<\/nav>/)?.[1] ?? '';
for (const html of [home, clint, relay]) {
  assert.equal(new Set(ids(html)).size, ids(html).length, 'Every rendered id is unique');
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert(html.includes('name="color-scheme" content="dark"'));
  assert(html.includes('name="theme-color" content="#151515"'));
  assert(!html.includes('fonts.googleapis.com'));
  assert(!html.includes('SourceSans3-Variable-latin.woff2'));
  assert(!html.includes('src="/brand/logo.svg"'));
  for (const target of ['tools', 'install', 'philosophy'])
    assert(html.includes(`href="/#${target}"`));
}
for (const id of [
  'tools',
  'tools-heading',
  'tool-clint',
  'tool-relay',
  'install',
  'install-clint',
  'install-relay',
  'demo-heading',
  'philosophy',
  'philosophy-heading',
])
  assert(ids(home).includes(id), id);
assert(home.includes('Validate commit messages'));
assert(home.includes('Manage Git hooks'));
assert(!home.includes('fluidise-clint interactive sandbox'));
assert(!relay.includes('fluidise-clint interactive sandbox'));
assert(clint.includes('fluidise-clint interactive sandbox'));
assert(clint.includes('client="visible"'));
assert(home.includes('href="/tools/clint#example-output"'));
assert.equal((home.match(/<code>brew tap Fluidise\/homebrew-tap<\/code>/g) ?? []).length, 1);
assert(home.includes('Filter task results'));
assert(home.includes('aria-controls="tool-results"'));
assert(home.indexOf('id="install"') > home.indexOf('id="tool-results"'));
console.log(
  'PASS: task/install landmarks, compatibility anchors, dark shell and Clint-only example',
);

for (const [name, html] of [
  ['clint', clint],
  ['relay', relay],
]) {
  assert(html.includes('aria-label="Breadcrumb"'));
  assert(html.includes('aria-current="page"'));
  assert(ids(html).includes('get-started'));
  assert(ids(html).includes('installation'));
  const toc = contents(html);
  assert(toc, name);
  const targets = [...toc.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  assert(targets.includes('installation'));
  assert(targets.includes('guarantees-heading'));
  assert.equal(targets.includes('example-output'), name === 'clint');
  const offsets = targets.map((target) => {
    assert(ids(html).includes(target), target);
    return html.indexOf(`id="${target}"`);
  });
  assert.deepEqual(
    offsets,
    [...offsets].sort((a, b) => a - b),
    'Contents follows actual reference order',
  );
  assert(html.includes(`href="/tools/${name === 'clint' ? 'relay' : 'clint'}"`));
  const allowed = new Set(['#e6e6e6', '#a3a3a3', '#dedede', '#aecbb3', '#c2c2c2', '#e7a3ae']);
  for (const [, color] of html.matchAll(/style="color:(#[0-9a-fA-F]+)/g))
    assert(allowed.has(color.toLowerCase()), color);
  assert(html.includes('background-color:#111111'));
}
assert(relay.indexOf('id="installation"') < relay.indexOf('id="key-capabilities"'));
assert(clint.indexOf('id="example-output"') < clint.indexOf('id="guarantees-heading"'));
console.log(
  'PASS: actual contents targets/order, installation, sibling links and generated syntax palette',
);

const collectionSource = read('src/content.config.ts')
  .replace(/^import .*;\n/gm, '')
  .replace('export const collections =', 'return');
const schema = new Function('z', 'defineCollection', 'glob', collectionSource)(
  z,
  (value) => value,
  () => ({}),
).tools.schema;
const valid = {
  name: 'tool',
  taskTitle: 'A task',
  tagline: 'Purpose',
  summary: 'Summary',
  status: 'scoping',
  color: 'plum',
  icon: 'Icon',
  repoUrl: 'https://example.com',
  keyFeatures: [],
};
assert(schema.safeParse(valid).success);
for (const taskTitle of [undefined, '', '   '])
  assert(!schema.safeParse({ ...valid, taskTitle }).success);
assert(!schema.safeParse({ ...valid, repoUrl: 'javascript:alert(1)' }).success);
assert.equal(schema.parse({ ...valid, taskTitle: '  A task  ' }).taskTitle, 'A task');
for (const name of ['clint', 'relay']) {
  const path = `src/content/tools/${name}.md`;
  const before = execFileSync('git', ['show', `HEAD:${path}`], { cwd: root, encoding: 'utf8' });
  const after = read(path);
  const metadata = (text) =>
    text
      .split('---')[1]
      .replace(/^taskTitle:.*\n/gm, '')
      .trim();
  assert.equal(metadata(after), metadata(before), 'All prior product metadata is unchanged');
  const fences = (text) =>
    [...text.matchAll(/^```[^\n]*\n[\s\S]*?^```/gm)].map((match) => match[0]).sort();
  assert.deepEqual(
    fences(after),
    fences(before),
    'Commands/configuration/example fences remain exact',
  );
}
const normal = readFileSync(new URL('public/fonts/InstrumentSans-Variable-latin.woff2', root));
const italic = readFileSync(
  new URL('public/fonts/InstrumentSans-Italic-Variable-latin.woff2', root),
);
assert.equal(normal.subarray(0, 4).toString(), 'wOF2');
assert.equal(italic.subarray(0, 4).toString(), 'wOF2');
assert(normal.length + italic.length <= 100000);
assert(read('public/fonts/InstrumentSans-OFL.txt').includes('SIL OPEN FONT LICENSE'));
console.log(
  'PASS: real schema validation, unchanged factual metadata/fences and licensed two-face font budget',
);
