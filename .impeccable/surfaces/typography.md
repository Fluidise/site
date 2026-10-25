# Site-wide typography: Expedition Field Guide

Mode: Read (documentation and catalog); the homepage panorama remains its existing visual introduction.
Targets: src/styles/global.css, src/layouts/Layout.astro, all three routes.

## Confirmed mandate

The user rejected a conservative sizing cleanup and explicitly requested a complete typography redesign, including replacing the Goldman FLUIDISE lettering. They delegated the entire typographic direction (carte blanche). Preserve photograph, palette, dock geometry, official SVG logos, product copy, and interactions. This supersedes prior typography authority, not the broader alpine composition.

## Direction contract

THESIS: The confidence of an expedition field-guide masthead meets calm humanist technical reading.
OWN-WORLD: Barlow Condensed 700 carries brand lettering and editorial headings; Source Sans 3 400–700 carries reading and interface roles; native monospace carries commands and data.
FIRST VIEWPORT: Retain the 75svh mountain image and upper-left white FLUIDISE, now taller and condensed with .12em tracking (.1em mobile), not the old extended techno lettering. Catalog title introduces the same condensed family.
STORY: Heading, tagline, body, supporting details, action and status have distinct size, weight and leading; documentation repeats this hierarchy with 18px reading copy at a 68ch maximum.
SIGNATURE: Condensed editorial openings contrast with open humanist paragraphs. No new motion or interaction is required by this typography-only brief.
CONSTRAINTS: rem sizes, no mobile body reduction, wrapping names/controls, locally scrolling code, two self-hosted WOFF2 files with OFL licenses, swap loading and preloads. No factual-copy changes.
BUILD PATH: Code-led; the user delegated typography choices, not a new composition or image.

## Direction exploration

Seven grounded typography sources considered: Swiss standards manuals; scientific atlases; research-journal publishing; rail wayfinding; expedition field guides; industrial specimen catalogs; natural-history exhibition labels. Direction seed 2b7a7c46 assigned candidate 5, expedition field guides.

The dealt challengers were evaluated only within the user's typography-only boundary. Museum-exhibition typography loses product clarity when titles become captions: retain its discipline of a single consistent masthead instead. Labanotation loses document readability: retain precise role spacing, not symbolic reading order. Hand-drawn zine lettering loses technical fit: retain emphatic heading/body contrast without doodles. Cutting-bench single-size grotesk loses hierarchy: retain compact display forms but never condensed running prose. Alphabet-storm transformations lose stable reading: retain the force of a distinctive wordmark without motion. Orizuru step notation loses fit with independent tool discovery: retain calm humanist annotations without numbered steps. None beats the selected direction on both audience fit and comprehension.

The delegated direction is implemented directly rather than reopening an aesthetic interview. The older homepage composition approval remains historical evidence, not approval of this newly replaced lettering. Prior automated redesign workflow gates are outside this bounded typography task and are not certified closed.

## Implemented system and evidence

`src/styles/global.css` defines the implemented role scale and both normal-style, swap-loaded faces. `src/layouts/Layout.astro` preloads the two local WOFF2 files; `public/fonts/` contains their OFL licenses and provenance. `DESIGN.md` owns the exact normative typography roles, with complementary preview snippets in `.impeccable/design.json`. No remote font request or new motion is required.

The display clamp is 3–6rem at 10vw; documentation titles are 2.5–5rem at 6vw; section headings are 2.25–3.25rem at 3.5vw. Package names use 2rem (1.75rem at 600px and below). Body uses 1.0625rem/1.6 and article prose 1.125rem/1.75 with a 68ch maximum; labels use .9375rem/600/1.4 and commands .875rem/1.7. The authoritative per-role weights, leading and tracking remain in DESIGN.md rather than inferred from historic screenshots.

Review artifacts for this replacement are under `.impeccable/review/typeset/`: desktop/mobile captures for home, Clint and Relay, narrow captures, the 1280px user viewport, `metrics.json`, and `stress.json`. Their presence records evidence locations, not an independent claim that every review gate passed. The historical first-viewport composition approval does not approve this new typography, and historical workflow gates are not certified closed by this documentation update.
