// Run after the static build: node src/components/Design.test.mjs
// Assert actual route output and the real collection schema without installing test tooling.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
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
assert(home.includes('href="/tools/clint/#example-output"'));
assert.equal((home.match(/<code>brew tap Fluidise\/homebrew-tap<\/code>/g) ?? []).length, 1);
assert(home.includes('Filter task results'));
assert(home.includes('aria-controls="tool-results"'));
assert(home.indexOf('id="install"') > home.indexOf('id="tool-results"'));
for (const name of ['clint', 'relay']) {
  assert(home.includes(`aria-expanded="false" aria-controls="preview-${name}"`));
  assert(home.includes(`id="preview-${name}" class="task-preview-content" data-expanded="false"`));
  assert(home.includes(`href="/tools/${name}/#installation"`));
}
assert(home.includes('<noscript>'));
assert(home.includes('.task-preview-content[data-expanded] { display: block; margin-top: 0; }'));
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
  assert(html.includes(`href="/tools/${name === 'clint' ? 'relay' : 'clint'}/"`));
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
const collectionSchema = new Function('z', 'defineCollection', 'glob', collectionSource)(
  z,
  (value) => value,
  () => ({}),
).tools.schema;
// Exercise the installed image validator with real local files, not a string-schema stand-in.
const { createImage } = await import(
  new URL('../../node_modules/astro/dist/content/runtime-assets.js', import.meta.url)
);
const entryPath = fileURLToPath(new URL('src/content/tools/clint.md', root));
const schema = collectionSchema({
  image: createImage(
    {
      resolve: async (path) => ({ id: fileURLToPath(new URL(path, new URL(entryPath, 'file:'))) }),
    },
    false,
    entryPath,
  ),
});
const valid = {
  name: 'tool',
  taskTitle: 'A task',
  banner: '../../assets/tools/clint-banner.png',
  tagline: 'Purpose',
  summary: 'Summary',
  status: 'scoping',
  color: 'plum',
  icon: 'Icon',
  repoUrl: 'https://example.com',
  keyFeatures: [],
};
assert((await schema.safeParseAsync(valid)).success);
for (const taskTitle of [undefined, '', '   '])
  assert(!(await schema.safeParseAsync({ ...valid, taskTitle })).success);
for (const banner of [undefined, '../../assets/tools/missing-banner.png'])
  assert(!(await schema.safeParseAsync({ ...valid, banner })).success);
for (const banner of ['', '../../assets/tools/README.md'])
  await assert.rejects(
    schema.safeParseAsync({ ...valid, banner }),
    /Could not process image metadata/,
  );
assert(!(await schema.safeParseAsync({ ...valid, repoUrl: 'javascript:alert(1)' })).success);
assert.equal((await schema.parseAsync({ ...valid, taskTitle: '  A task  ' })).taskTitle, 'A task');
for (const name of ['clint', 'relay']) {
  const path = `src/content/tools/${name}.md`;
  const before = execFileSync('git', ['show', `HEAD:${path}`], { cwd: root, encoding: 'utf8' });
  const after = read(path);
  const metadata = (text) =>
    text
      .split('---')[1]
      .replace(/^banner:.*\n/gm, '')
      .trim();
  if (name === 'relay') {
    const withoutRelease = (text) => metadata(text).replace(/^(status|version):.*\n/gm, '');
    assert.equal(
      withoutRelease(after),
      withoutRelease(before),
      'Only verified Relay release metadata changes',
    );
    assert(after.includes("status: 'released'\nversion: 'v0.1.0'"));
  } else {
    assert.equal(metadata(after), metadata(before), 'All prior product metadata is unchanged');
  }
  assert.equal(
    after.slice(after.indexOf('\n---', 4)),
    before.slice(before.indexOf('\n---', 4)),
    'The entire Markdown body remains unchanged',
  );
  const fences = (text) =>
    [...text.matchAll(/^```[^\n]*\n[\s\S]*?^```/gm)].map((match) => match[0]).sort();
  assert.deepEqual(
    fences(after),
    fences(before),
    'Commands/configuration/example fences remain exact',
  );
}
const banners = (html) =>
  [...html.matchAll(/<img\b[^>]*class="tool-banner"[^>]*>/g)].map(([tag]) => tag);
assert.equal(banners(home).length, 2);
assert(!home.includes('ASTRO_ASSET'));
for (const tag of banners(home)) {
  assert(tag.includes('alt=""'));
  assert(tag.includes('loading="lazy"'));
  assert(tag.includes('decoding="async"'));
  assert(tag.includes('width="2048" height="768"'));
  assert(/src[Ss]et="[^"]+320w[^"]+2048w"/.test(tag));
  assert(tag.includes('sizes="2048px"'), 'Cover crops must select the full-height source');
  assert(!tag.toLowerCase().includes('fetchpriority'));
  assert(!tag.includes('.png'));
  assert(!tag.includes('tabindex'));
}
for (const [name, html] of [
  ['clint', clint],
  ['relay', relay],
]) {
  const tags = banners(html);
  assert.equal(tags.length, 1);
  const banner = tags[0];
  assert(banner.includes('alt=""'));
  assert(banner.includes('loading="eager"'), 'Doc feature banner is above-the-fold LCP');
  assert(banner.includes('decoding="async"'));
  assert(banner.includes('width="2048" height="768"'));
  assert(/src[Ss]et="[^"]+320w[^"]+2048w"/.test(banner));
  assert(banner.includes('sizes="2048px"'), 'Cover crops must select the full-height source');
  assert(/fetch[Pp]riority="high"/.test(banner), 'LCP candidate must declare high fetch priority');
  assert(!banner.includes('.png'));
  assert(!banner.includes('tabindex'));
  assert(banner.includes(`/_astro/${name}-banner.`));
  const feature = html.indexOf('class="doc-feature"');
  assert(feature < html.indexOf(banner));
  assert(html.indexOf('<h1') < html.indexOf(banner));
  assert(html.indexOf('id="get-started"') < html.indexOf(banner));
  assert(html.indexOf(banner) < html.indexOf('class="doc-reading"'));
  assert(html.includes('<figcaption>Illustrative example'));
  assert(html.includes(name === 'clint' ? 'JSON excerpt' : 'Plan summary'));
  assert(!html.includes('doc-banner'));
  assert(
    !readdirSync(new URL('dist/_astro/', root)).some(
      (file) => file.startsWith(`${name}-banner.`) && file.endsWith('.png'),
    ),
  );
}
for (const [name, expected] of [
  ['clint', '833dc0e65776ab12a6df6548276f5c0e9f261d29312eecc50717e6b8205d446f'],
  ['relay', 'a35378dcd05159f5139f859db321241df900d812c32a9a9f768458f910556b1b'],
]) {
  const original = readFileSync(new URL(`src/assets/tools/${name}-banner.png`, root));
  assert.equal(createHash('sha256').update(original).digest('hex'), expected);
}
console.log(
  'PASS: real local image validation, optimized SSR scenes, preserved v2 artwork and separate live content',
);
const normal = readFileSync(new URL('public/fonts/InstrumentSans-Variable-latin.woff2', root));
const italic = readFileSync(
  new URL('public/fonts/InstrumentSans-Italic-Variable-latin.woff2', root),
);
assert.equal(normal.subarray(0, 4).toString(), 'wOF2');
assert.equal(italic.subarray(0, 4).toString(), 'wOF2');
assert(normal.length + italic.length <= 100000);
assert(read('public/fonts/InstrumentSans-OFL.txt').includes('SIL OPEN FONT LICENSE'));
console.log(
  'PASS: real schema validation, verified Relay release, preserved other metadata/fences and licensed font budget',
);

for (const [html, frameCount, hatchCount, islands] of [
  [home, 4, 3, ['ToolGrid']],
  [clint, 2, 1, ['CopyCommand', 'InteractiveTerminal']],
  [relay, 2, 1, ['CopyCommand']],
]) {
  const frames = [...html.matchAll(/<[^>]+class="[^"]*\bbackground-frame\b[^"]*"[^>]*>/g)];
  assert.equal(frames.length, frameCount, 'Only the intended non-hero shells receive rails');
  const hatches = [...html.matchAll(/<span class="background-hatch" aria-hidden="true"><\/span>/g)];
  assert.equal(hatches.length, hatchCount, 'Hatches punctuate only major transitions');
  const exports = [...html.matchAll(/<astro-island\b[^>]*component-export="([^"]+)"/g)]
    .map((match) => match[1])
    .sort();
  assert.deepEqual(exports, [...islands].sort(), 'No decoration island or hydration owner');
  assert(
    !frames.some(([tag]) => /archipelago|tool-feature|doc-feature|prose|doc-reading/.test(tag)),
  );
}
assert(/id="tools" class="[^"]*background-frame/.test(home));
assert(/id="install" class="[^"]*background-frame/.test(home));
assert(/class="doc-shell background-frame"/.test(clint));
assert(/class="doc-shell background-frame"/.test(relay));
const grain = readFileSync(new URL('src/assets/background/grain.png', root));
assert(grain.length <= 8192, 'One small static grain tile');
assert.equal(grain.subarray(1, 4).toString(), 'PNG');
assert.equal(grain.readUInt32BE(16), 96);
assert.equal(grain.readUInt32BE(20), 96);
assert(grain.includes(Buffer.from('Origin\0Fluidise procedural matte grain')));
console.log(
  'PASS: bounded nonsemantic background details, static grain and unchanged hydration owners',
);
