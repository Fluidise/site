// Run after the static build: node src/components/Navbar.test.mjs
// Execute the delivered navigation owner, including homepage-only visibility and disposal.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const dist = new URL('../../dist/', import.meta.url);
const html = readFileSync(new URL('index.html', dist), 'utf8');
const source = [...html.matchAll(/<script type="module"(?: src="([^"]+)")?>([\s\S]*?)<\/script>/g)]
  .map((match) => (match[1] ? readFileSync(new URL(match[1].slice(1), dist), 'utf8') : match[2]))
  .find((script) => script.includes('fluidise-navbar') && script.includes('customElements.define'));
assert(source);
const frames = new Map(),
  observers = [],
  resizes = [],
  registry = new Map();
let serial = 0;
const win = Object.assign(new EventTarget(), { innerHeight: 720 });
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
}
class Host {
  nav = { hidden: false };
  links = [new Link('tools'), new Link('install'), new Link('philosophy')];
  querySelector() {
    return this.nav;
  }
  querySelectorAll() {
    return this.links;
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
assert.equal(frames.size, 0);
assert.equal(nav.links[0].attributes.get('aria-current'), 'location');
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
hero.bottom = -100;
event(win, 'scroll');
flush();
assert(!nav.nav.hidden);
hero.bottom = 1440;
event(win, 'scroll');
flush();
assert(nav.nav.hidden, 'Reverse scroll restores immersion');
console.log('PASS: hidden hero dock, native-scroll boundary/reverse/deep entry, no idle loop');

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
