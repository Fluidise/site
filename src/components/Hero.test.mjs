// Run after the static build: node src/components/Hero.test.mjs
// Actual compiled owner and renderer, with synthetic DOM and GPU calls (not shader execution).
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
const dist = new URL('../../dist/', import.meta.url);
const html = readFileSync(new URL('index.html', dist), 'utf8');
const source = [...html.matchAll(/<script type="module"(?: src="([^"]+)")?>([\s\S]*?)<\/script>/g)]
  .map((match) => (match[1] ? readFileSync(new URL(match[1].slice(1), dist), 'utf8') : match[2]))
  .find((script) => script.includes('--island-scale') && script.includes('customElements.define'));
assert(source, 'Build must include the real archipelago enhancement');
const frames = new Map();
const observers = [];
const resizes = [];
const registry = new Map();
let nextFrame = 0;
let clock = 0;
const reduced = Object.assign(new EventTarget(), { matches: false });
const win = Object.assign(new EventTarget(), {
  matchMedia: () => reduced,
});
const raster = { fillRect() {}, scale() {}, fill() {}, drawImage() {} };
const doc = Object.assign(new EventTarget(), {
  hidden: false,
  createElement: () => ({ width: 0, height: 0, getContext: () => raster }),
});
class ImageFixture {
  naturalWidth = 1672;
  naturalHeight = 941;
  constructor() {
    this.decoded = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
  decode() {
    return this.decoded;
  }
}
class GPU {
  mode = '';
  live = new Set();
  draws = 0;
  uploads = [];
  uniforms = new Map();
  shaderSources = [];
  NO_ERROR = 0;
  VERTEX_SHADER = 1;
  FRAGMENT_SHADER = 2;
  MAX_TEXTURE_SIZE = 3;
  allocate() {
    const object = {};
    this.live.add(object);
    return object;
  }
  createShader() {
    return this.allocate();
  }
  createProgram() {
    return this.allocate();
  }
  createBuffer() {
    return this.allocate();
  }
  createTexture() {
    return this.allocate();
  }
  deleteShader(object) {
    this.live.delete(object);
  }
  deleteProgram(object) {
    this.live.delete(object);
  }
  deleteBuffer(object) {
    this.live.delete(object);
  }
  deleteTexture(object) {
    this.live.delete(object);
  }
  shaderSource(_shader, source) {
    this.shaderSources.push(source);
  }
  compileShader() {}
  getShaderParameter() {
    return this.mode !== 'compile';
  }
  attachShader() {}
  linkProgram() {}
  getProgramParameter() {
    return this.mode !== 'link';
  }
  useProgram() {}
  bindBuffer() {}
  bufferData() {}
  getAttribLocation() {
    return 0;
  }
  enableVertexAttribArray() {}
  vertexAttribPointer() {}
  getUniformLocation(_program, name) {
    return name;
  }
  getParameter() {
    return 1024;
  }
  pixelStorei() {}
  activeTexture() {}
  bindTexture() {}
  texParameteri() {}
  texImage2D(...args) {
    if (this.mode === 'upload-throw') throw new Error('fixture: upload denied');
    this.uploads.push(args.at(-1));
  }
  uniform1i() {}
  uniform1f(name, value) {
    this.uniforms.set(name, value);
  }
  uniform2f(name, ...values) {
    this.uniforms.set(name, values);
  }
  uniform3f(name, ...values) {
    this.uniforms.set(name, values);
  }
  getError() {
    return this.mode === 'upload-error' ? 1 : 0;
  }
  isContextLost() {
    return false;
  }
  viewport(...values) {
    this.viewportSize = values;
  }
  drawArrays() {
    if (this.mode === 'draw') throw new Error('fixture: draw failure');
    this.draws++;
  }
}
class Host extends EventTarget {
  bounds = { top: 0, left: 0, width: 1280, height: 720 };
  attributes = new Set();
  values = new Map();
  layoutReads = 0;
  styleWrites = 0;
  mutations = 0;
  original = new ImageFixture();
  background = new ImageFixture();
  gl = new GPU();
  canvas = Object.assign(new EventTarget(), {
    width: 0,
    height: 0,
    getContext: () => (this.gl.mode === 'null' ? null : this.gl),
  });
  viewport = {
    getBoundingClientRect: () => {
      this.layoutReads++;
      return { ...this.bounds };
    },
  };
  style = {
    setProperty: (key, value) => {
      this.styleWrites++;
      this.values.set(key, value);
    },
    removeProperty: (key) => {
      this.styleWrites++;
      this.values.delete(key);
    },
  };
  querySelector(selector) {
    if (selector.endsWith('__fallback')) return this.original;
    if (selector.endsWith('__background')) return this.background;
    if (selector.endsWith('__clouds')) return this.canvas;
    if (selector.endsWith('__viewport')) return this.viewport;
    if (selector.includes('mask')) return { getAttribute: () => 'M0 0 L1 0 L1 1 Z' };
    return null;
  }
  getBoundingClientRect() {
    this.layoutReads++;
    return {
      ...this.bounds,
      height: this.bounds.height * (this.attributes.has('data-scroll') ? 3 : 1),
    };
  }
  hasAttribute(name) {
    return this.attributes.has(name);
  }
  setAttribute(name) {
    this.mutations++;
    this.attributes.add(name);
  }
  toggleAttribute(name, enabled) {
    this.mutations++;
    if (enabled) this.attributes.add(name);
    else this.attributes.delete(name);
  }
  removeAttribute(name) {
    this.mutations++;
    this.attributes.delete(name);
  }
}
class Intersection {
  constructor(callback) {
    this.callback = callback;
    observers.push(this);
  }
  observe(host) {
    this.host = host;
  }
  disconnect() {
    this.disconnected = true;
  }
}
class Resize {
  constructor(callback) {
    this.callback = callback;
    resizes.push(this);
  }
  observe(host) {
    if (host instanceof Host) this.host = host;
  }
  disconnect() {
    this.disconnected = true;
  }
}
Object.assign(win, { IntersectionObserver: Intersection, ResizeObserver: Resize });
Object.assign(globalThis, {
  HTMLElement: Host,
  window: win,
  document: doc,
  IntersectionObserver: Intersection,
  ResizeObserver: Resize,
  Path2D: class {
    constructor(path) {
      this.path = path;
    }
  },
  customElements: {
    get: (key) => registry.get(key),
    define: (key, value) => registry.set(key, value),
  },
  requestAnimationFrame: (callback) => {
    frames.set(++nextFrame, callback);
    return nextFrame;
  },
  cancelAnimationFrame: (id) => frames.delete(id),
});
new Function(source)();
const Hero = registry.get('archipelago-hero');
const settle = () => new Promise((resolve) => setImmediate(resolve));
const flush = (delta = 16) => {
  clock += delta;
  const pending = [...frames.values()];
  frames.clear();
  pending.forEach((callback) => callback(clock));
};
const event = (target, name) => target.dispatchEvent(new Event(name, { cancelable: true }));
const pointer = (hero, x, y, type = 'mouse') =>
  hero.dispatchEvent(
    Object.assign(new Event('pointermove'), { clientX: x, clientY: y, pointerType: type }),
  );
const has = (hero, name) => hero.attributes.has(name);
const observe = (hero, visible) =>
  observers.findLast((item) => item.host === hero).callback([{ isIntersecting: visible }]);
const resize = (hero) => resizes.findLast((item) => item.host === hero).callback([]);
const value = (hero, key) => Number.parseFloat(hero.values.get(key));
async function ready(hero) {
  hero.original.resolve();
  hero.background.resolve();
  await settle();
}
const hero = new Hero();
hero.connectedCallback();
assert(!has(hero, 'data-ready'));
assert(has(hero, 'data-scroll'), 'Track exists before decoding or intersection');
assert.equal(frames.size, 0);
hero.original.resolve();
await settle();
assert(!has(hero, 'data-ready'));
hero.background.resolve();
await settle();
assert.equal(frames.size, 1);
assert(!has(hero, 'data-ready'));
flush();
assert(has(hero, 'data-ready'));
assert(has(hero, 'data-scroll'));
assert.equal(frames.size, 0);
assert.equal(hero.gl.uploads.length, 2);
assert(hero.gl.uploads.every((image) => Math.max(image.width, image.height) <= 1024));
const still = [hero.layoutReads, hero.styleWrites, hero.gl.draws];
for (let i = 0; i < 50; i++) flush(1000);
assert.deepEqual(
  [hero.layoutReads, hero.styleWrites, hero.gl.draws],
  still,
  'No idle scheduler or drawing',
);
pointer(hero, 900, 300);
event(hero, 'pointerleave');
event(hero, 'pointercancel');
assert.equal(frames.size, 0, 'Pointer cannot animate the scroll-only scene');
console.log(
  'PASS: decode/GPU-gated enhancement, reserved track, bounded uploads, no idle/pointer motion',
);

assert.equal(value(hero, '--title-opacity'), 1);
assert.equal(value(hero, '--title-scale'), 1);
assert.equal(value(hero, '--title-front'), 1, 'Initial wordmark is never occluded');
const start = [...hero.values];
hero.bounds.top = -90;
event(win, 'scroll');
flush();
assert(
  value(hero, '--title-front') > 0 && value(hero, '--title-front') < 1,
  'Depth handoff fades instead of switching z-index',
);
assert.equal(value(hero, '--title-opacity'), 1);
hero.bounds.top = -720;
const reads = hero.layoutReads;
event(win, 'scroll');
event(win, 'scroll');
event(win, 'scroll');
assert.equal(hero.layoutReads, reads, 'Input only queues work');
assert.equal(frames.size, 1);
flush();
assert.equal(frames.size, 0);
assert.equal(hero.gl.uniforms.get('journey'), 0.5);
assert.equal(value(hero, '--island-scale'), 1.3);
assert(value(hero, '--title-opacity') > 0 && value(hero, '--title-opacity') < 0.5);
assert.equal(value(hero, '--title-scale'), 1.08);
assert.equal(value(hero, '--title-front'), 0);
assert(value(hero, '--foreground-x') < 0 && value(hero, '--foreground-y') > 0);
assert(value(hero, '--foreground-scale') > value(hero, '--island-scale'));
const [ix, iy, scale] = hero.gl.uniforms.get('island');
assert.equal(ix, value(hero, '--island-x') / 1280);
assert.equal(iy, value(hero, '--island-y') / 720);
assert.equal(scale, value(hero, '--island-scale'));
assert(Math.abs(hero.gl.uniforms.get('cover')[0] - 1) < 1e-8);
const halfway = [...hero.values],
  drift = [...hero.gl.uniforms.get('drift')];
hero.bounds.top = -1440;
event(win, 'scroll');
flush();
assert.equal(hero.gl.uniforms.get('journey'), 1);
assert.equal(value(hero, '--island-scale'), 1.6);
assert.equal(value(hero, '--foreground-scale'), 1.85);
assert.equal(value(hero, '--title-opacity'), 0);
hero.bounds.top = -720;
event(win, 'scroll');
flush();
assert.deepEqual([...hero.values], halfway);
assert.deepEqual(hero.gl.uniforms.get('drift'), drift, 'Reverse scroll restores exact clouds');
hero.bounds.top = 0;
event(win, 'scroll');
flush();
assert.deepEqual([...hero.values], start);
assert.equal(value(hero, '--title-front'), 1, 'Reverse scroll restores fully visible wordmark');
hero.bounds.top = -99999;
event(win, 'scroll');
flush();
assert.equal(hero.gl.uniforms.get('journey'), 1);
hero.bounds.top = 50;
event(win, 'scroll');
flush();
assert.equal(hero.gl.uniforms.get('journey'), 0);
console.log(
  'PASS: two-screen progress, strong approach, foreground departure, exact inverse scroll, matched poses',
);

hero.bounds = { top: -844, left: 0, width: 390, height: 844 };
resize(hero);
flush();
assert.equal(value(hero, '--island-scale'), 1.175);
assert(hero.canvas.width * hero.canvas.height <= 400000);
assert.equal(hero.gl.uniforms.get('cover')[1], 1);
const narrowPose = [...hero.values],
  narrowDrift = [...hero.gl.uniforms.get('drift')];
resize(hero);
flush();
assert.deepEqual([...hero.values], narrowPose);
assert.deepEqual(hero.gl.uniforms.get('drift'), narrowDrift);
assert.equal(frames.size, 0);
function suspended() {
  const before = [hero.layoutReads, hero.styleWrites, hero.gl.draws];
  event(win, 'scroll');
  event(win, 'resize');
  pointer(hero, 400, 200);
  resize(hero);
  flush();
  assert.deepEqual([hero.layoutReads, hero.styleWrites, hero.gl.draws], before);
  assert.equal(frames.size, 0);
}
observe(hero, false);
suspended();
doc.hidden = true;
event(doc, 'visibilitychange');
observe(hero, true);
suspended();
doc.hidden = false;
event(doc, 'visibilitychange');
flush();
assert.deepEqual(hero.gl.uniforms.get('drift'), narrowDrift);
reduced.matches = true;
event(reduced, 'change');
flush();
assert(!has(hero, 'data-ready'));
assert(!has(hero, 'data-scroll'));
assert.equal(hero.values.size, 0);
const reducedDraws = hero.gl.draws;
event(win, 'scroll');
flush();
assert.equal(hero.gl.draws, reducedDraws);
reduced.matches = false;
event(reduced, 'change');
flush();
assert(has(hero, 'data-ready'));
assert(has(hero, 'data-scroll'));
hero.bounds.width = 0;
resize(hero);
flush();
assert.equal(frames.size, 0);
hero.bounds.width = 390;
resize(hero);
flush();
assert(has(hero, 'data-ready'));
console.log(
  'PASS: narrow budget/approach, stable resize, reduced-motion unpinning, hidden/offscreen/zero-size suspension',
);

const restoredPose = [...hero.values];
assert.equal(event(hero.canvas, 'webglcontextlost'), false);
assert.equal(frames.size, 0);
assert.equal(hero.gl.live.size, 0);
assert(!has(hero, 'data-ready'));
assert(has(hero, 'data-scroll'), 'Loss does not collapse the active scroll track');
event(hero.canvas, 'webglcontextrestored');
flush();
assert(has(hero, 'data-ready'));
assert.deepEqual([...hero.values], restoredPose);
assert.equal(frames.size, 0);
assert.equal(hero.gl.live.size, 6);
const second = new Hero();
second.connectedCallback();
await ready(second);
flush();
hero.bounds.top = 0;
event(win, 'scroll');
assert.equal(frames.size, 2);
hero.disconnectedCallback();
assert.equal(frames.size, 1);
assert.equal(hero.gl.live.size, 0);
const removed = [hero.layoutReads, hero.styleWrites, hero.mutations];
pointer(hero, 0, 0);
observe(hero, true);
resize(hero);
event(hero.canvas, 'webglcontextrestored');
assert.deepEqual([hero.layoutReads, hero.styleWrites, hero.mutations], removed);
second.disconnectedCallback();
assert.equal(frames.size, 0);
assert.equal(second.gl.live.size, 0);
hero.connectedCallback();
await settle();
flush();
assert(has(hero, 'data-ready'));
hero.disconnectedCallback();
const pending = new Hero();
pending.connectedCallback();
pending.disconnectedCallback();
const late = pending.mutations;
await ready(pending);
assert.equal(pending.mutations, late);
assert.equal(frames.size, 0);
assert(observers.every((item) => item.disconnected));
assert(resizes.every((item) => item.disconnected));
console.log(
  'PASS: stable context loss/restoration, GPU cleanup, independent instances/remount/late decode',
);

for (const mode of ['null', 'compile', 'link', 'upload-throw', 'upload-error', 'draw']) {
  const failed = new Hero();
  failed.gl.mode = mode;
  failed.connectedCallback();
  await ready(failed);
  flush();
  assert(!has(failed, 'data-ready'), mode);
  assert.equal(frames.size, 0, mode);
  assert.equal(failed.gl.live.size, 0, mode);
  if (mode !== 'draw')
    assert(has(failed, 'data-scroll'), 'GPU failure preserves reserved deep-link geometry');
  event(win, 'resize');
  flush();
  assert.equal(frames.size, 0);
  failed.disconnectedCallback();
}
const broken = new Hero();
broken.connectedCallback();
broken.background.reject(new Error('fixture: failed decode'));
await settle();
flush();
assert(!has(broken, 'data-ready'));
assert(has(broken, 'data-scroll'));
assert.equal(broken.gl.live.size, 0);
broken.disconnectedCallback();
const resource = new Hero();
resource.connectedCallback();
await ready(resource);
flush();
event(resource, 'error');
assert(!has(resource, 'data-ready'));
assert.equal(resource.gl.live.size, 0);
assert.equal(resource.values.size, 0);
resource.disconnectedCallback();
reduced.matches = true;
const calm = new Hero();
calm.connectedCallback();
await ready(calm);
flush();
assert.equal(calm.gl.live.size, 0);
assert(!has(calm, 'data-scroll'));
assert.equal(frames.size, 0);
reduced.matches = false;
event(reduced, 'change');
flush();
assert(has(calm, 'data-ready'));
calm.disconnectedCallback();
const deep = new Hero();
deep.bounds.top = -2132;
deep.connectedCallback();
observe(deep, false);
await ready(deep);
flush();
assert.equal(
  deep.getBoundingClientRect().height,
  2160,
  'Deep links reserve full geometry before decoding',
);
assert.equal(deep.gl.live.size, 0, 'Offscreen deep link does not allocate GPU work');
assert(has(deep, 'data-scroll'));
deep.disconnectedCallback();
delete win.IntersectionObserver;
delete win.ResizeObserver;
const noObservers = new Hero();
noObservers.connectedCallback();
await ready(noObservers);
flush();
assert(has(noObservers, 'data-ready'));
noObservers.disconnectedCallback();
console.log('PASS: GPU/decode/resource errors, static reduced startup, observer-free fallback');

const contours = JSON.parse(
  readFileSync(
    new URL('../../assets/plates/suspended-archipelago-contours.json', import.meta.url),
    'utf8',
  ),
);
for (const [file, key] of [
  ['suspended-archipelago.png', 'sourceSha256'],
  ['suspended-archipelago-background.png', 'backgroundSha256'],
]) {
  const bytes = readFileSync(new URL(`../../assets/plates/${file}`, import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), contours[key]);
  assert.equal(bytes.readUInt32BE(16), contours.width);
  assert.equal(bytes.readUInt32BE(20), contours.height);
}
assert(contours.island.startsWith('M'));
assert(contours.foreground.endsWith('Z'));
function inside(path, x, y) {
  const points = [...path.matchAll(/[ML](\d+) (\d+)/g)].map((match) => [
    Number(match[1]),
    Number(match[2]),
  ]);
  let contained = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [ax, ay] = points[i];
    const [bx, by] = points[j];
    if (ay > y !== by > y && x < ((bx - ax) * (y - ay)) / (by - ay) + ax) contained = !contained;
  }
  return contained;
}
// Source-pixel landmarks distinguish actual rock from adjacent sky/clouds.
for (const [x, y, rock] of [
  [700, 600, true],
  [700, 620, false],
  [1000, 350, false],
  [1000, 380, true],
  [1450, 500, true],
  [1450, 530, false],
]) {
  assert.equal(inside(contours.island, x, y), rock, `Island source landmark ${x},${y}`);
}
for (const [x, y, rock] of [
  [100, 730, false],
  [100, 740, true],
  [400, 810, false],
  [400, 830, true],
  [500, 900, true],
]) {
  assert.equal(inside(contours.foreground, x, y), rock, `Foreground source landmark ${x},${y}`);
}
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert(html.includes('Agent-first developer experience suite'));
assert(html.includes('clipPathUnits="userSpaceOnUse"'));
assert.equal((html.match(/preserveAspectRatio="xMidYMid slice"/g) || []).length, 2);
assert(!html.includes('alpine-hero'));
assert(!html.includes('alpine-banner'));
assert(html.includes('<canvas class="archipelago-hero__clouds" aria-hidden="true"'));
const css = readFileSync(new URL('../styles/global.css', import.meta.url), 'utf8');
const heroRules = css.match(/\.archipelago-hero\s*\{([^}]+)\}/)[1];
assert(heroRules.includes('width: 100%'));
assert(heroRules.includes('height: 100vh'));
assert(heroRules.includes('height: 100dvh'));
assert(css.includes('height: 300dvh'));
assert(css.includes('.archipelago-hero__viewport {'));
assert(css.includes('position: sticky'));
assert(css.includes('overflow: clip'));
assert(html.includes('<archipelago-hero data-scroll'));
assert(/<noscript>\s*<style>/.test(html), 'Static no-JS sizing stays inside noscript');
assert(!html.includes('Pause motion'));
assert(!html.includes('Resume motion'));
assert(!css.includes('archipelago-float'));
assert(!source.includes('pointermove'));
assert(css.includes('.archipelago-hero__fallback {\n    visibility: visible !important;'));
assert(css.includes('.floating-dock[hidden]'));
console.log(
  'PASS: unchanged art/contours/crops, semantic/static/reduced shell, no autoplay or pause control',
);

assert(html.includes('archipelago-hero__title-front" aria-hidden="true"'));
assert(css.includes('opacity: calc(var(--title-opacity, 1) * var(--title-front, 1))'));
assert.equal((html.match(/archipelago-hero__wordmark/g) || []).length, 2);
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Front face adds no semantic heading');
assert(css.includes('--type-display: clamp(3rem, 26vw, 38rem)'));
assert(css.includes('max-width: 94%'));
assert(css.includes('overflow-wrap: anywhere'));
console.log(
  'PASS: monumental semantic wordmark, scroll-only growth/depth/fade, safe initial/reduced/failure state',
);

const paintBinding = html.match(/<archipelago-hero\b[^>]*style="([^"]*)"/);
assert(
  paintBinding && paintBinding[1].includes('--title-paint:'),
  'Paint URL is supplied by the owning hero',
);
const skyUrl = html.match(/class="archipelago-hero__background" src="([^"]+)"/)[1];
assert(paintBinding[1].includes(skyUrl), 'Glyphs reuse the exact optimized background URL');
assert(css.includes('background-color: var(--title-ink)'));
assert(css.includes('var(--title-paint, none)'));
assert(css.includes('background-clip: text'));
assert(css.includes('@supports ((background-clip: text) or (-webkit-background-clip: text))'));
assert(css.includes('color: CanvasText'));
assert(!css.includes('feTurbulence'));
const ownerSource = readFileSync(new URL('./Hero.astro', import.meta.url), 'utf8');
assert(
  !ownerSource.slice(ownerSource.indexOf('<script>')).includes('--title-paint'),
  'Material adds no runtime animation/state',
);
console.log(
  'PASS: approved shared paint URL, opaque/unsupported/forced-color fallbacks, no texture runtime',
);
