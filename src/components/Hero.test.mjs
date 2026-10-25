// Run after the static build: node src/components/Hero.test.mjs
// Synthetic DOM tests exercise the actual compiled hero script without test dependencies.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../../dist/index.html', import.meta.url), 'utf8');
const source = [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)]
  .map((match) => match[1])
  .find((script) => script.includes('customElements.define(`alpine-hero`'));
assert(source);
const frames = new Map();
let next = 0;
const callbacks = [];
let disconnected = 0;
const motion = Object.assign(new EventTarget(), { matches: false });
const win = Object.assign(new EventTarget(), { matchMedia: () => motion });
const doc = Object.assign(new EventTarget(), { hidden: false });
const registry = new Map();

class Host extends EventTarget {
  bounds = { top: 0, height: 540 };
  attributes = new Set();
  layoutReads = 0;
  styleWrites = 0;

  constructor() {
    super();
    const host = this;
    let transform;
    this.title = {
      style: {
        get transform() {
          return transform;
        },
        set transform(value) {
          host.styleWrites++;
          transform = value;
        },
        removeProperty() {
          host.styleWrites++;
          transform = undefined;
        },
      },
    };
  }

  querySelector() {
    return this.title;
  }
  getBoundingClientRect() {
    this.layoutReads++;
    return this.bounds;
  }
  toggleAttribute(name, enabled) {
    if (enabled) this.attributes.add(name);
    else this.attributes.delete(name);
  }
  removeAttribute(name) {
    this.attributes.delete(name);
  }
}
class Intersection {
  constructor(callback) {
    callbacks.push(callback);
  }
  observe() {}
  disconnect() {
    disconnected++;
  }
}
Object.assign(win, { IntersectionObserver: Intersection });
Object.assign(globalThis, {
  HTMLElement: Host,
  window: win,
  document: doc,
  IntersectionObserver: Intersection,
  customElements: {
    get: (name) => registry.get(name),
    define: (name, value) => registry.set(name, value),
  },
  requestAnimationFrame: (callback) => {
    frames.set(++next, callback);
    return next;
  },
  cancelAnimationFrame: (id) => frames.delete(id),
});
new Function(source)();
const Hero = registry.get('alpine-hero');
const hero = new Hero();
hero.connectedCallback();
const flush = () => {
  const list = [...frames.values()];
  frames.clear();
  list.forEach((callback) => callback());
};
const scroll = () => win.dispatchEvent(new Event('scroll'));
const resize = () => win.dispatchEvent(new Event('resize'));
const preference = () => motion.dispatchEvent(new Event('change'));
const visibility = () => doc.dispatchEvent(new Event('visibilitychange'));

assert.equal(hero.title.style.transform, 'translate3d(0, 0px, 0)');
assert(!hero.attributes.has('data-depth-active'));
hero.bounds.top = -170;
scroll();
scroll();
assert.equal(frames.size, 1);
flush();
assert.equal(hero.title.style.transform, 'translate3d(0, 170px, 0)');
assert(hero.attributes.has('data-depth-active'));
hero.bounds.top = -999;
scroll();
flush();
assert.equal(hero.title.style.transform, 'translate3d(0, 540px, 0)');
hero.bounds.top = 30;
scroll();
flush();
assert.equal(hero.title.style.transform, 'translate3d(0, 0px, 0)');
assert(!hero.attributes.has('data-depth-active'));
console.log('PASS: initial/unclipped state, clamped depth, one pending frame, reverse scroll');

motion.matches = true;
preference();
hero.bounds.top = -200;
scroll();
assert.equal(frames.size, 0);
assert.equal(hero.title.style.transform, 'translate3d(0, 0px, 0)');
assert(!hero.attributes.has('data-depth-active'));
motion.matches = false;
preference();
assert.equal(hero.title.style.transform, 'translate3d(0, 200px, 0)');
console.log('PASS: reduced motion removes both depth and foreground occlusion');

function assertSuspended() {
  const before = [hero.layoutReads, hero.styleWrites];
  resize();
  scroll();
  preference();
  flush();
  assert.deepEqual([hero.layoutReads, hero.styleWrites], before);
  assert.equal(frames.size, 0);
}
callbacks[0]([{ isIntersecting: false }]);
assertSuspended();
doc.hidden = true;
visibility();
assertSuspended();
callbacks[0]([{ isIntersecting: true }]);
assertSuspended();
doc.hidden = false;
visibility();
flush();
hero.bounds = { top: -240, height: 600 };
resize();
assert.equal(hero.title.style.transform, 'translate3d(0, 240px, 0)');
console.log('PASS: no layout reads/style writes on offscreen/hidden resize, scroll or preference');

const second = new Hero();
second.connectedCallback();
scroll();
assert.equal(frames.size, 2);
hero.disconnectedCallback();
assert.equal(frames.size, 1);
second.disconnectedCallback();
assert.equal(frames.size, 0);
assert.equal(hero.title.style.transform, undefined);
assert(!hero.attributes.has('data-depth-active'));
callbacks[0]([{ isIntersecting: true }]);
scroll();
assert.equal(frames.size, 0);
hero.connectedCallback();
scroll();
assert.equal(frames.size, 1);
hero.disconnectedCallback();
assert.equal(frames.size, 0);
assert.equal(disconnected, 3);
console.log('PASS: independent instances, disconnect cleanup, remount, late callbacks');

const contour = JSON.parse(
  readFileSync(
    new URL('../../assets/plates/alpine-banner-v3-contour.json', import.meta.url),
    'utf8',
  ),
);
const image = readFileSync(new URL('../../assets/plates/alpine-banner-v3.png', import.meta.url));
assert.equal(createHash('sha256').update(image).digest('hex'), contour.sourceSha256);
assert.equal(contour.width, 1808);
assert.equal(contour.height, 870);
const outline = contour.outline.split(' L1808 870')[0];
const points = [...outline.matchAll(/[ML](\d+) (\d+)/g)].map((match) => [
  Number(match[1]),
  Number(match[2]),
]);
function contourAt(x) {
  const index = points.findIndex((point) => point[0] >= x);
  const b = points[index];
  if (b[0] === x) return b[1];
  const a = points[index - 1];
  return a[1] + ((b[1] - a[1]) * (x - a[0])) / (b[0] - a[0]);
}
// Independent source-image landmarks include the previously rejected cloud/background point.
for (const [x, edgeY] of [
  [510, 494],
  [550, 431],
  [650, 336],
  [750, 351],
  [900, 324],
  [1300, 297],
]) {
  assert(Math.abs(contourAt(x) - edgeY) <= 4, `Contour misses the actual relief at x=${x}`);
}
assert(contourAt(510) > 480, 'Do not mask the cloud/background near source (510,411)');
assert(!html.includes('alpine-scene'));
assert(html.includes('alpine-banner-v3'));
assert(html.includes('clipPathUnits="userSpaceOnUse"'));
assert.equal((html.match(/<h1\b/g) || []).length, 1);
console.log('PASS: image-bound contour, real relief landmarks, no Canvas, one semantic h1');
