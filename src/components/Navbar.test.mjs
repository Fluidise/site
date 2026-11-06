// Run after the static build: node src/components/Navbar.test.mjs
// Execute the delivered navigation owner, including homepage-only visibility and disposal.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const dist = new URL('../../dist/', import.meta.url);
const html = readFileSync(new URL('index.html', dist), 'utf8');
const dockMarkup = html.match(/<nav class="floating-dock"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
assert(dockMarkup);
assert.equal((dockMarkup.match(/class="dock-link"/g) ?? []).length, 4);
for (const label of ['Explore', 'Install', 'Principles', 'GitHub']) {
  const accessibleLabel = label === 'GitHub' ? 'GitHub (opens in new tab)' : label;
  assert(dockMarkup.includes(`aria-label="${accessibleLabel}"`));
  assert(dockMarkup.includes(`<span class="dock-tooltip" aria-hidden="true">${label}</span>`));
}
console.log('PASS: four icon links retain accessible names and visual tooltip labels');
const logoMarkup = dockMarkup.match(/<svg\b[^>]*class="dock-logo"[^>]*>([\s\S]*?)<\/svg>/)?.[1];
assert(logoMarkup, 'The existing logo is inlined for eye-only animation');
const originalLogo = readFileSync(
  new URL('../../src/assets/brand/logo-white.svg', import.meta.url),
  'utf8',
);
assert.equal(
  originalLogo,
  readFileSync(new URL('../../public/brand/logo-white.svg', import.meta.url), 'utf8'),
);
const geometry = (svg) =>
  [...svg.matchAll(/<(path|rect)\b([^>]*)>/g)].map(([, tag, attributes]) => ({
    tag,
    attributes: Object.fromEntries(
      [...attributes.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]),
    ),
  }));
assert.deepEqual(
  geometry(logoMarkup),
  geometry(originalLogo),
  'Every official path/eye attribute is preserved',
);
assert.equal(geometry(logoMarkup).filter(({ tag }) => tag === 'rect').length, 2);
const source = [...html.matchAll(/<script type="module"(?: src="([^"]+)")?>([\s\S]*?)<\/script>/g)]
  .map((match) => (match[1] ? readFileSync(new URL(match[1].slice(1), dist), 'utf8') : match[2]))
  .find((script) => script.includes('fluidise-navbar') && script.includes('customElements.define'));
assert(source);
const frames = new Map(),
  timers = new Map(),
  observers = [],
  resizes = [],
  registry = new Map();
let serial = 0;
const win = Object.assign(new EventTarget(), { innerHeight: 720 });
const reduced = Object.assign(new EventTarget(), { matches: false });
win.matchMedia = (query) => {
  assert.equal(query, '(prefers-reduced-motion: reduce)');
  return reduced;
};
win.setTimeout = (callback, delay) => {
  timers.set(++serial, { callback, delay });
  return serial;
};
win.clearTimeout = (id) => timers.delete(id);
const hero = {
  isConnected: true,
  bottom: 2160,
  reads: 0,
  getBoundingClientRect() {
    this.reads++;
    return { bottom: this.bottom };
  },
};
const sections = ['tools', 'install', 'philosophy'].map((id, index) => ({
  id,
  top: index * 900,
  getBoundingClientRect() {
    return { top: this.top };
  },
}));
let selectedHero = hero;
const doc = Object.assign(new EventTarget(), {
  hidden: false,
  activeElement: null,
  querySelector: () => selectedHero,
  getElementById: (id) => sections.find((section) => section.id === id),
});
class Link extends EventTarget {
  attributes = new Map();
  constructor(id) {
    super();
    this.dataset = { section: id };
  }
  setAttribute(key, value) {
    this.attributes.set(key, value);
  }
  removeAttribute(key) {
    this.attributes.delete(key);
  }
  hasAttribute(key) {
    return this.attributes.has(key);
  }
}
class Logo extends Link {
  eye = new EventTarget();
  querySelector() {
    return this.eye;
  }
}
class Nav extends Link {
  hidden = false;
  hovered = false;
  constructor() {
    super();
  }
  matches(selector) {
    assert.equal(selector, ':hover');
    return this.hovered;
  }
  contains(target) {
    return target === this || target?.parent === this;
  }
}
class Host {
  nav = new Nav();
  logo = new Logo();
  links = [new Link('tools'), new Link('install'), new Link('philosophy')];
  github = new Link();
  constructor() {
    for (const link of [...this.links, this.github]) link.parent = this.nav;
  }
  querySelector(selector) {
    return selector === 'nav' ? this.nav : this.logo;
  }
  querySelectorAll(selector) {
    return selector === '.dock-link' ? [...this.links, this.github] : this.links;
  }
}
class Intersection {
  constructor(callback) {
    this.callback = callback;
    observers.push(this);
  }
  observe() {}
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
    this.host = host;
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
  location: { hash: '' },
  IntersectionObserver: Intersection,
  ResizeObserver: Resize,
  customElements: {
    get: (key) => registry.get(key),
    define: (key, value) => registry.set(key, value),
  },
  requestAnimationFrame: (callback) => {
    frames.set(++serial, callback);
    return serial;
  },
  cancelAnimationFrame: (id) => frames.delete(id),
});
new Function(source)();
const Navbar = registry.get('fluidise-navbar');
const flush = () => {
  const pending = [...frames.values()];
  frames.clear();
  pending.forEach((callback) => callback());
};
const event = (target, name) => target.dispatchEvent(new Event(name));
const nav = new Navbar();
nav.connectedCallback();
assert(nav.nav.hidden);
assert.equal(timers.size, 0, 'The hidden hero dock has no blink timer');
assert.equal(frames.size, 0);
assert.equal(nav.links[0].attributes.get('aria-current'), 'location');
const escape = () => {
  const event = new Event('keydown');
  Object.defineProperty(event, 'key', { value: 'Escape' });
  doc.dispatchEvent(event);
};
for (const link of [...nav.links, nav.github]) {
  escape();
  assert(link.attributes.has('data-tooltip-dismissed'));
  event(link, 'pointerenter');
  assert(!link.attributes.has('data-tooltip-dismissed'));
  escape();
  event(link, 'focus');
  assert(!link.attributes.has('data-tooltip-dismissed'));
}
console.log('PASS: Escape dismisses every tooltip; pointer re-entry and focus restore labels');
const reads = hero.reads;
event(win, 'scroll');
event(win, 'scroll');
assert.equal(frames.size, 1);
assert.equal(hero.reads, reads);
flush();
assert(nav.nav.hidden);
assert.equal(frames.size, 0);
hero.bottom = 720;
event(win, 'scroll');
flush();
assert(nav.nav.hidden, 'Still hidden at the full-frame boundary');
hero.bottom = 719;
event(win, 'scroll');
flush();
assert(!nav.nav.hidden, 'Catalog entry reveals dock');
assert.equal(timers.size, 1, 'Visible dock schedules only one future sequence');
hero.bottom = -100;
event(win, 'scroll');
flush();
assert(!nav.nav.hidden);
hero.bottom = 1440;
event(win, 'scroll');
flush();
assert(nav.nav.hidden, 'Reverse scroll restores immersion');
assert.equal(timers.size, 0, 'Reverse scroll cancels the blink timer');
console.log('PASS: hidden hero dock, native-scroll boundary/reverse/deep entry, no idle loop');

// Auto-hide on downward scroll, reveal on upward scroll, focus and hover
win.scrollY = 0;
hero.bottom = 500;
event(win, 'scroll');
flush();
assert(!nav.nav.hidden);
assert(!nav.nav.hasAttribute('data-scrolled-hidden'));

win.scrollY = 100;
event(win, 'scroll');
flush();
assert(nav.nav.hasAttribute('data-scrolled-hidden'), 'Scrolling down auto-hides the dock');
assert.equal(timers.size, 0, 'Auto-hidden dock cancels the blink timer');

event(nav.nav, 'focusin');
flush();
assert(!nav.nav.hasAttribute('data-scrolled-hidden'), 'Keyboard focus immediately reveals dock');
assert.equal(timers.size, 0, 'Focused dock stays open without blinking');

event(nav.nav, 'focusout');
flush();
assert.equal(timers.size, 1, 'Revealed dock reschedules blink timer once focus leaves');

win.scrollY = 200;
event(win, 'scroll');
flush();
assert(nav.nav.hasAttribute('data-scrolled-hidden'));

event(nav.nav, 'pointerenter');
flush();
assert(!nav.nav.hasAttribute('data-scrolled-hidden'), 'Hover restores dock');
assert.equal(timers.size, 0, 'Hovered dock does not blink');

event(nav.nav, 'pointerleave');
flush();
assert.equal(timers.size, 1, 'Unhovered visible dock reschedules blink timer');

win.scrollY = 180;
event(win, 'scroll');
flush();
assert(!nav.nav.hasAttribute('data-scrolled-hidden'), 'Scrolling up restores dock');

win.scrollY = 0;
event(win, 'scroll');
flush();
assert(!nav.nav.hasAttribute('data-scrolled-hidden'), 'Top of page keeps dock visible');
console.log('PASS: auto-hide on downward scroll, reveal on upward scroll, focus and hover');

hero.bottom = 500;
resizes.at(-1).callback([]);
flush();
assert(!nav.nav.hidden, 'Viewport/hero height changes reconcile visibility');
hero.bottom = 2160;
event(win, 'scroll');
doc.hidden = true;
event(doc, 'visibilitychange');
const hiddenReads = hero.reads;
event(win, 'resize');
event(win, 'scroll');
flush();
assert.equal(hero.reads, hiddenReads);
assert.equal(frames.size, 0);
doc.hidden = false;
event(doc, 'visibilitychange');
flush();
assert(nav.nav.hidden);
event(nav.links[2], 'click');
assert.equal(nav.links[2].attributes.get('aria-current'), 'location');
hero.bottom = 500;
observers.at(-1).callback([{ isIntersecting: true, target: sections[0] }]);
flush();
assert.equal(nav.links[0].attributes.get('aria-current'), 'location');
hero.bottom = 2160;
hero.isConnected = false;
resizes.at(-1).callback([]);
flush();
assert(!nav.nav.hidden);
hero.isConnected = true;
console.log('PASS: layout/visibility/hero removal, existing section markers and links');

const second = new Navbar();
second.connectedCallback();
event(win, 'scroll');
assert.equal(frames.size, 2);
nav.disconnectedCallback();
assert.equal(frames.size, 1);
assert(!nav.nav.hidden);
escape();
assert(!nav.github.attributes.has('data-tooltip-dismissed'), 'Tooltip listeners are disposed');
const after = hero.reads;
resizes[0].callback([]);
observers[0].callback([{ isIntersecting: true, target: sections[1] }]);
flush();
assert.equal(hero.reads, after + 1, 'Only the remaining instance runs');
second.disconnectedCallback();
assert.equal(frames.size, 0);
nav.connectedCallback();
assert(nav.nav.hidden);
nav.disconnectedCallback();
assert(observers.every((item) => item.disconnected));
assert(resizes.every((item) => item.disconnected));
selectedHero = null;
const docs = new Navbar();
docs.connectedCallback();
assert(!docs.nav.hidden);
assert(
  docs.links.every((link) => !link.attributes.has('aria-current')),
  'Docs have no false homepage marker',
);
event(docs.links[0], 'click');
assert(docs.links.every((link) => !link.attributes.has('aria-current')));
event(win, 'scroll');
assert.equal(frames.size, 0);
docs.disconnectedCallback();
selectedHero = hero;
delete win.IntersectionObserver;
delete win.ResizeObserver;
const legacy = new Navbar();
legacy.connectedCallback();
hero.bottom = 500;
event(win, 'scroll');
flush();
assert(!legacy.nav.hidden);
legacy.disconnectedCallback();
const page = readFileSync(new URL('tools/clint/index.html', dist), 'utf8');
assert(page.includes('fluidise-navbar'));
assert(!page.includes('<archipelago-hero'));
for (const path of ['tools/clint/index.html', 'tools/relay/index.html']) {
  const page = readFileSync(new URL(path, dist), 'utf8');
  assert.equal(page.match(/<nav class="floating-dock"[^>]*>([\s\S]*?)<\/nav>/)?.[1], dockMarkup);
}
console.log(
  'PASS: independent lifecycle/remount, cleanup, unchanged documentation navigation, optional observers',
);

// Per-tool install anchors, history and deterministic intersecting-section ties.
hero.bottom = -100;
sections[0].top = -900;
sections[1].top = 28;
sections[2].top = 900;
location.hash = '#install-clint';
const deep = new Navbar();
deep.connectedCallback();
assert.equal(deep.links[1].attributes.get('aria-current'), 'location');
location.hash = '#philosophy';
sections[2].top = 28;
event(win, 'hashchange');
flush();
assert.equal(deep.links[2].attributes.get('aria-current'), 'location');
location.hash = '#install-relay';
sections[2].top = 900;
sections[1].top = 100;
event(win, 'popstate');
flush();
assert.equal(deep.links[1].attributes.get('aria-current'), 'location');
assert.equal(deep.links.filter((link) => link.attributes.has('aria-current')).length, 1);
location.hash = '#unknown';
sections.forEach((section) => {
  section.top = 1000;
});
event(win, 'hashchange');
flush();
assert(deep.links.every((link) => !link.attributes.has('aria-current')));
deep.disconnectedCallback();
event(win, 'hashchange');
event(win, 'popstate');
assert.equal(frames.size, 0);
console.log(
  'PASS: install deep links, history, section ties, unknown hashes and current-state cleanup',
);
assert.equal(timers.size, 0, 'All prior navigation instances disposed their timers');

// Drive the delivered blink scheduler without wall-clock sleeps or probabilistic tests.
selectedHero = null;
const originalRandom = Math.random;
const randomValues = [];
Math.random = () => randomValues.shift() ?? 0.5;
const nextBlink = () => {
  assert.equal(timers.size, 1);
  const [id, timer] = [...timers][0];
  timers.delete(id);
  timer.callback();
  return timer;
};
const assertOpenAndIdle = (instance) => {
  assert(!instance.logo.hasAttribute('data-blink'));
  assert.equal(timers.size, 0);
};
try {
  randomValues.push(0);
  const blinking = new Navbar();
  blinking.connectedCallback();
  assert.equal([...timers.values()][0].delay, 8000);
  randomValues.push(0.2);
  nextBlink();
  assert.equal(
    blinking.logo.attributes.get('data-blink'),
    'single',
    'The 20% boundary is a single blink',
  );
  assert.equal(timers.size, 0, 'CSS owns the bounded sequence, not a frame/timer loop');
  randomValues.push(0.999999);
  event(blinking.logo.eye, 'animationend');
  assert(!blinking.logo.hasAttribute('data-blink'));
  assert([...timers.values()][0].delay < 18000);
  assert([...timers.values()][0].delay > 17999);
  randomValues.push(0.199999);
  nextBlink();
  assert.equal(blinking.logo.attributes.get('data-blink'), 'double');

  event(blinking.nav, 'pointerenter');
  assertOpenAndIdle(blinking);
  event(blinking.logo.eye, 'animationend');
  assertOpenAndIdle(blinking);
  event(blinking.nav, 'pointerleave');
  assert.equal(timers.size, 1);
  event(blinking.nav, 'focusin');
  assertOpenAndIdle(blinking);
  const internalFocus = new Event('focusout');
  Object.defineProperty(internalFocus, 'relatedTarget', { value: blinking.github });
  blinking.nav.dispatchEvent(internalFocus);
  assertOpenAndIdle(blinking);
  event(blinking.nav, 'focusout');
  assert.equal(timers.size, 1);

  const staleTimer = [...timers.values()][0].callback;
  doc.hidden = true;
  event(doc, 'visibilitychange');
  assertOpenAndIdle(blinking);
  staleTimer();
  assertOpenAndIdle(blinking);
  doc.hidden = false;
  event(doc, 'visibilitychange');
  assert.equal([...timers.values()][0].delay, 13000, 'Resume starts a full new random pause');
  nextBlink();
  reduced.matches = true;
  event(reduced, 'change');
  assertOpenAndIdle(blinking);
  reduced.matches = false;
  event(reduced, 'change');
  assert.equal(timers.size, 1);
  const disposedTimer = [...timers.values()][0].callback;
  blinking.disconnectedCallback();
  assertOpenAndIdle(blinking);
  disposedTimer();
  event(blinking.logo.eye, 'animationend');
  event(blinking.nav, 'pointerleave');
  event(reduced, 'change');
  assertOpenAndIdle(blinking);

  reduced.matches = true;
  blinking.connectedCallback();
  assertOpenAndIdle(blinking);
  reduced.matches = false;
  event(reduced, 'change');
  assert.equal(timers.size, 1);
  blinking.connectedCallback();
  assert.equal(timers.size, 1, 'Remount replaces, rather than duplicates, the scheduler');
  const other = new Navbar();
  other.connectedCallback();
  assert.equal(timers.size, 2);
  blinking.disconnectedCallback();
  assert.equal(timers.size, 1, 'Independent instance keeps its own timer');
  other.disconnectedCallback();
  assert.equal(timers.size, 0);
} finally {
  Math.random = originalRandom;
}
console.log(
  'PASS: preserved SVG geometry, bounded random/double blinks, hover/focus/visibility/reduced-motion cancellation and independent cleanup',
);
