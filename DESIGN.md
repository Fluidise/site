---
name: 'Fluidise Nocturne'
description: 'A painterly archipelago above a matte, task-led technical field guide.'
colors:
  canvas: '#151515'
  surface: '#1d1d1d'
  raised: '#272727'
  hover: '#313131'
  line: '#808080'
  control-border: '#898989'
  ink: '#f2f2f2'
  secondary: '#c2c2c2'
  quiet: '#a2a2a2'
  action: '#dedede'
  action-hover: '#ffffff'
  selected: '#353535'
  accent: '#aabad9'
  positive: '#aecbb3'
  negative: '#e7a3ae'
  warning: '#e8c58e'
  code-ground: '#111111'
  code-ink: '#e6e6e6'
  code-comments: '#a3a3a3'
  selection: '#464646'
  hero-fallback: '#697399'
  hero-title-ink: '#f6f0e6'
  hero-title-wash: 'rgb(250 245 234 / 0.78)'
typography:
  display:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif"
    fontSize: 'clamp(3rem, 26vw, 38rem)'
    fontWeight: 700
    lineHeight: 0.82
    letterSpacing: '0.055em'
  doc-title:
    fontFamily: "'Instrument Sans', 'Segoe UI', sans-serif"
    fontSize: 'clamp(2.5rem, 5.2vw, 4.5rem)'
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: '-0.035em'
  headline:
    fontFamily: "'Instrument Sans', 'Segoe UI', sans-serif"
    fontSize: 'clamp(2rem, 3.4vw, 3rem)'
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: '-0.025em'
  package-title:
    fontFamily: "'Instrument Sans', 'Segoe UI', sans-serif"
    fontSize: 'clamp(1.625rem, 2.6vw, 2.25rem)'
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: '-0.02em'
  subheading:
    fontFamily: "'Instrument Sans', 'Segoe UI', sans-serif"
    fontSize: '1.5rem'
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: '-0.015em'
  body:
    fontFamily: "'Instrument Sans', 'Segoe UI', sans-serif"
    fontSize: '1.0625rem'
    fontWeight: 400
    lineHeight: 1.65
  prose:
    fontFamily: "'Instrument Sans', 'Segoe UI', sans-serif"
    fontSize: '1.125rem'
    fontWeight: 400
    lineHeight: 1.75
  lead:
    fontFamily: "'Instrument Sans', 'Segoe UI', sans-serif"
    fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)'
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Instrument Sans', 'Segoe UI', sans-serif"
    fontSize: '0.9375rem'
    fontWeight: 500
    lineHeight: 1.4
  metadata:
    fontFamily: "'Instrument Sans', 'Segoe UI', sans-serif"
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.6
  dock-label:
    fontFamily: "'Instrument Sans', 'Segoe UI', sans-serif"
    fontSize: '0.9375rem'
    fontWeight: 400
    lineHeight: 1.3
  compact-dock-label:
    fontFamily: "'Instrument Sans', 'Segoe UI', sans-serif"
    fontSize: '0.8125rem'
    fontWeight: 400
    lineHeight: 1.3
  terminal-heading:
    fontFamily: "'Instrument Sans', 'Segoe UI', sans-serif"
    fontSize: '1.25rem'
    fontWeight: 500
    lineHeight: 1.35
  code:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.7
rounded:
  square: '0'
  small-control-fallback: '12px'
  control-fallback: '16px'
  dock-fallback: '28px'
  squircle: '40px'
spacing:
  xs: '4px'
  sm: '8px'
  control-gap: '12px'
  md: '16px'
  panel: '24px'
  lg: '32px'
  wide: '48px'
  section-compact: '64px'
  section: '96px'
  page-gutter: 'clamp(20px, 4vw, 64px)'
components:
  primary-link:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.canvas}'
    typography: '{typography.label}'
    rounded: '{rounded.control-fallback}'
    padding: '12px 20px'
  text-link:
    textColor: '{colors.action}'
    typography: '{typography.label}'
  control:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.secondary}'
    typography: '{typography.label}'
    rounded: '{rounded.control-fallback}'
    padding: '11px 20px'
  control-selected:
    backgroundColor: '{colors.selected}'
    textColor: '{colors.action}'
    typography: '{typography.label}'
    rounded: '{rounded.control-fallback}'
    padding: '11px 20px'
  floating-dock:
    backgroundColor: '{colors.raised}'
    textColor: '{colors.secondary}'
    rounded: '{rounded.dock-fallback}'
    padding: '10px 25px'
    width: 'min(532px, calc(100% - 24px))'
  task-entry:
    textColor: '{colors.ink}'
    padding: '40px 48px 0 0'
  copy-command:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.code-ink}'
    rounded: '{rounded.square}'
    padding: '12px'
  copy-button:
    backgroundColor: 'transparent'
    textColor: '{colors.secondary}'
    rounded: '{rounded.small-control-fallback}'
    size: '44px'
  doc-start:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.square}'
    padding: '24px'
  terminal:
    backgroundColor: '{colors.code-ground}'
    textColor: '{colors.code-ink}'
    rounded: '{rounded.square}'
  documentation-code:
    backgroundColor: '{colors.code-ground}'
    textColor: '{colors.code-ink}'
    typography: '{typography.code}'
    rounded: '{rounded.square}'
    padding: '24px'
---

# Design System: Fluidise Nocturne

## Overview

**Creative North Star: "Nocturne"**

A painterly suspended archipelago introduces Fluidise; neutral-charcoal reading surfaces make its independent developer tools clear. The painting is the expressive event and the interface is the calm instrument beneath it. Matte tonal layers, open editorial divisions and restrained mineral-blue priority replace the historical Alpine Glass interface without recoloring or rebuilding the approved hero.

Instrument Sans carries all non-hero headings, reading and interface roles. Barlow Condensed remains isolated to the monumental painted FLUIDISE wordmark; native monospace carries commands and samples. Official black and white SVG assets retain their geometry. The current world implements the human-approved Nocturne specification; historical alpine, typography and first-viewport approvals remain history, not validation of this runtime.

**Key Characteristics:**

- A protected, full-screen painted archipelago with a monumental ivory wordmark and reversible native-scroll depth.
- Achromatic reading and ordinary links on opaque charcoal surfaces; mineral blue only for primary fills, active markers and external focus.
- Open task and reference compositions rather than a generic rounded-card library.
- Quiet construction rails, gutter-only grain and short transition hatches give empty charcoal space structure without texturing reading or artwork.
- A visibly labeled matte squircle dock and square installation, starting, terminal and code surfaces.
- Truthful demonstrations, selectable commands and explicit copy failure feedback.

## Colors

The interface is achromatic charcoal and white/gray, with a scarce mineral-blue priority accent and independent pastel feedback. Frontmatter preserves the actual CSS values; sidecar tonal ramps are synthesized panel-preview metadata, not additional production colors.

### Primary

- **Mineral accent:** filled primary links, selected-state lines and external focus outlines. Primary links use Canvas ink; hover retains that fill/ink and adds an underline.

### Neutral

- **Canvas / Surface / Raised / Hover:** page and footer ground; square command/start groupings; opaque dock; ordinary interactive hover ground respectively.
- **Primary ink / Secondary / Quiet:** strong reading, supporting copy and readable metadata. Quiet is not disabled text.
- **Action / Action hover:** neutral ordinary-link and selected-control ink, becoming white on hover. These are not brand accents.
- **Line / Control border:** visible section or row dividers versus meaningful control boundaries. Keep meaningful dividers and control edges opaque and distinct. The separate empty-space decoration may mix Line at the restrained opacities documented below; it never replaces these semantic boundaries.
- **Selected / Selection:** pressed filters and selected tabs versus native text-selection backing. Selection uses Primary ink.
- **Code ground / Code ink / Code comments:** terminal and documentation code, default tokens and comments.
- **Hero fallback / Hero title ink / Hero title wash:** protected scene backing and painted ivory material only. The uniform wash is not a decorative UI gradient.

Positive identifies existing check/success feedback and string syntax; Negative identifies failed copies, invalid samples and invalid syntax. Warning is declared in the source palette but has no current warning component; its presence is not permission to invent one. Feedback is also conveyed by text, icons or accessible state, never color alone.

**The Mineral Restraint Rule.** Use Mineral accent only for primary-action fills, active-state markers and external keyboard-focus outlines. Keep reading, ordinary links, selected labels, text selection and code syntax neutral or semantic.

## Typography

**Display Font:** self-hosted Barlow Condensed 700, with Arial Narrow and sans-serif fallbacks, only in the hero.
**Heading, Body and Interface Font:** self-hosted Instrument Sans normal/italic variable 400–700, width fixed at 100%, with Segoe UI and sans-serif fallbacks.
**Code Font:** the native monospace stack in frontmatter.

The monumental condensed name contrasts with calm, medium-weight interface headings and open reading copy. Product names retain their actual casing. The active UI no longer uses Source Sans 3; its archived files and historical brief are not active type authority.

### Hierarchy

- **Display:** the protected wordmark uses the display token. Its top offset is 3svh, or 8svh at widths up to 600px. Short landscape uses 2svh and `min(26vw, 38svh)`. A 94% text-width bound allows wider fallbacks or enlarged text to wrap.
- **Documentation title:** the doc-title role is the tool page's single h1. It wraps long tool names rather than forcing page overflow.
- **Headlines:** the headline role serves section headings and prominent task statements. Task headings are bounded to 15ch wide, or 22ch in the stacked layout.
- **Package titles and subheadings:** install identities use package-title; principles and prose h3 use subheading. The square starting panel uses the same 1.5rem size but inherits h2 leading (1.15). The example and guarantees h2 use `clamp(1.75rem, 3vw, 2.25rem)` with the shared heading weight/leading/tracking.
- **Body and prose:** body is the interface baseline; prose is the larger long-form reading role with a 68ch maximum. Supporting introductions reach 65–70ch. Article strong text uses 600 and Primary ink; normal reading remains 400.
- **Leads and labels:** lead serves task taglines and the tool-page task context. Label serves actions and small controls. Dock labels use their own 1.3 leading, with compact-dock-label only at widths up to 600px; body and code do not shrink on mobile.
- **Metadata and terminal heading:** metadata serves status, demonstration and legal copy. The terminal footer uses 1.5 leading and tabular numerals; the shared count also uses tabular numerals. Terminal-heading is the quiet sample-panel title, not another display treatment.
- **Code:** code serves selectable installation commands, samples and fenced blocks. Inline prose code uses .875em/1.7; fenced code adds .01em tracking. Commands and preformatted blocks scroll locally, while inline code wraps.

All faces use `font-display: swap`. The normal Instrument face is preloaded on every route; Barlow is preloaded only on the homepage; genuine Instrument italic loads when used. The two new unmodified official Google Fonts WOFF2 files total 61,692 bytes. Their OFL, checksums, exact source URLs, actual coverage and parsing evidence are recorded in `public/fonts/README.md`. Latin-1 diacritics are covered; other Latin Extended characters and check/cross symbols may use fallback. Native monospace adds no webfont. This documentation does not convert font metadata into full-language coverage or measured loading-performance claims.

**The Hero Family Rule.** Bind Barlow Condensed directly to the hero title. Instrument Sans owns every non-hero heading and interface role; never let a global heading-family change alter the protected wordmark.

## Layout

The full-bleed hero is independent of the centered non-hero shell (1440px maximum). Documentation has an outer 1120px cap and article prose a 68ch measure. The page gutter and repeated spacing steps are normative in frontmatter. Body uses `min-width: 0`, not a forced 320px width; minmax tracks, wrapping and bounded code/table scrolling accommodate a real 320px viewport even when a classic scrollbar reduces client width.

The protected hero has a 100dvh sticky viewport inside a reserved 300dvh native-scroll track, with vh fallbacks. Reduced motion and no JavaScript use an unpinned one-viewport static hero. GPU/decode failure retains the reserved journey geometry and original painting. Its material, numerical phases, source-bound contours and resource contracts remain owned by `docs/specs/alpine-canvas-hero.md`, not redefined by this UI system.

Current route composition is recorded in `.impeccable/surfaces/src-pages-index-astro.md`. Reused spatial patterns are open paired regions, divider-separated installation rows and a reference rail beside prose. Above 900px, task lanes split equally with one vertical divider; installation/start regions use paired minmax columns; principles use three open columns. At 900px and below these regions and terminal command/output stack in DOM order. Footer content stacks at the same breakpoint. At 600px and below panel padding becomes 20px where specified, while reading and code sizes remain unchanged. Different homepage jobs are separated by 96px, reduced to 64px in the stacked layout.

Selected non-hero shells carry segmented construction rails and matte grain only in their empty outer gutters, leaving a 12px clear buffer before the content edge. Rails follow the existing homepage/footer and documentation caps rather than a viewport-fixed grid. Short hatch accents punctuate the existing blank transitions before installation, principles and the footer; documentation uses quieter accents above reference reading and before its footer. Home hatches are 96×12px, documentation hatches 64×8px. At 600px and below, rails and grain disappear and all hatches use 64×8px. These decorations add no spacing or content geometry, accept no pointer input and introduce no ancestor stacking context; all are suppressed in forced colors.

Reference contents uses a 12rem left rail with a 48px gap above 900px. It is sticky only when viewport height exceeds 700px, with a 28px top offset and a dock-aware maximum height; otherwise it remains in flow. At 900px and below contents is a visible wrapping list before the article, not a drawer. It is generated from actual rendered headings rather than a second maintained inventory.

The dock is bottom-centered, with its width/padding in frontmatter. Its bottom offset is `calc(20px + env(safe-area-inset-bottom, 0px))`, or 12px plus safe area at widths up to 600px. Shared anchor/focus/footer clearance is `calc(10rem + env(safe-area-inset-bottom, 0px))`; top scroll spacing is 28px. The gateway heading/filter region retains a `calc(25svh - 32px)` minimum transition. These are implemented clearance rules, not a claim of universal zoom or focus conformance; validate new long labels and resized text against the actual dock.

## Elevation & Depth

The interface is flat by default: opaque tonal layering, generous space and visible 1px boundaries establish grouping. No translucent glass or backdrop blur remains in the current dock. Its restrained neutral shadow provides the only shared floating UI lift. The approved painting keeps its dedicated layered scene and painted-glyph separation; neither becomes a general-purpose card effect.

The quiet background treatment reuses Line locally: 1px rails mix it at 22% opacity and shallow diagonal hatches at 28%, without weakening meaningful dividers or control boundaries. One original static 96×96 indexed grain tile (alpha 8/255; 5437 bytes, within the 8192-byte budget) is shared only by those gutter lanes. Reading, artwork, mastheads, commands, controls and the dock retain their original grounds; no page-wide texture, new animation, filter pass or runtime owner is added. Missing grain leaves the same solid Canvas and useful content.

### Shadow Vocabulary

- **Dock lift:** `0 10px 32px rgb(0 0 0 / 0.24)` on the matte Raised dock.
- **Selected-control marker:** `inset 0 -2px var(--accent)` is a selection line, not ambient elevation.
- **Painted wordmark separation:** `drop-shadow(0 3px 12px rgb(20 30 58 / 0.32))` on the clipped semantic title. Unsupported clipping retains `0 3px 24px rgb(20 30 58 / 0.32)` text-shadow. The coincident decorative face adds neither; forced colors remove the material/filter.

**The Matte Instrument Rule.** Use opaque tonal surfaces and fine borders for the interface. The dock may lift softly; technical panels stay square and flat. Do not extend the painting, glass blur or decorative texture into reading surfaces. Static rails, gutter-only grain and short transition hatches may mark empty shell space; never overlay reading, controls or artwork.

## Shapes

Small controls and the dock use native `corner-shape: squircle` with a 40px radius where supported. The final feature query applies to the dock, dock links, small controls, primary links and copy buttons after responsive styles. Unsupported browsers use the observed fallbacks: dock 28px; filter/format controls and primary links 16px; dock links and copy buttons 12px. These radii do not change official SVG geometry.

Installation bars, getting-started panels, terminal frames, inline code and fenced code stay square. Task lanes and principles are open compositions, not filled rounded cards. Meaningful control edges use Control border; editorial row/section edges use Line.

## Components

### Actions and small controls

Primary links are mineral-filled with dark Canvas ink, a 44px minimum height and the label role; hover adds an underline without changing fill/ink. Neutral text links retain the same minimum height and turn white on hover. Filters and terminal format/sample buttons retain the historical source class `glacial-control`, but now use opaque Nocturne Surface, Secondary ink and Control border; the name is not permission to restore glass. Hover uses Hover/Primary ink. Pressed/selected controls use Selected, neutral Action labels and the inset mineral line. Their .15s ease color/background transition is the only shared control animation. Disabled buttons use .5 opacity and a not-allowed cursor; read-only content does not inherit that treatment.

### Navigation dock

Four stable icon/label pairs read Explore, Install, Principles and GitHub. Explore uses the existing white official mark; the remaining symbols are existing Tabler line SVGs. Icons are 25px under the shared rule, reducing to 22px at widths up to 600px. The homepage dock is hidden from view/focus/assistive navigation while the hero fills the viewport and returns at the task gateway boundary. Tool pages keep it visible without falsely marking a homepage destination as current. Homepage current state uses a neutral label and mineral underline, reconciled with native anchors/history and visible section context. The lifecycle retains cleanup, bounded scheduling and optional-observer fallbacks. Without JavaScript the native dock links remain usable.

### Task gateway and installation desk

Task statements lead open lanes inside square-edged landscape-backed presentations, together with live package identity/status, purpose and actions. Clint uses the supplied text-free plum/lavender woodland; Relay uses the supplied text-free emerald coastal currents. Decorative empty-alt images sit behind the complete live presentation with cover crops; no names, marks or actions are baked into the paintings, and the images add no link or focus target. Local Canvas scrims protect contrast while normal-flow content wraps and grows without fixed-height clipping. A mineral Get started link opens the responsible tool page, while neutral Install command reaches its stable installation row. Quiet opaque pressed-button filters and the announced count affect only task results. The separately titled installation desk always renders the unfiltered ordered collection, exact source commands when present, docs/source links and one Homebrew tap control. There is no exclusive task state, hidden installation prerequisite or generic card library. Installation, principles and footer contain no landscape imagery; only their empty shell gutters and named transitions share the quiet background details.

Both routes use the same required collection banner field and server-only preparation in `src/lib/tool-banner.ts`. It produces local WebP variants at widths 320, 640, 960, 1280, 1600 and 2048 with quality 85; only resolved native image attributes and intrinsic 2048×768 dimensions, not raw source metadata or the optimization result, reach the catalog island. The source-width fallback and `sizes="2048px"` select the full-size candidate because narrow, tall cover boxes need source height, not merely their element width. The current encoded paintings are 76,108 bytes for Clint and 57,736 bytes for Relay, with shared cacheable URLs across home and tool routes. Six candidates remain generated; this is not element-width-based responsive selection. Native lazy loading and asynchronous decoding add no preload, animation, observer or image-fetch runtime. Content determines the painted region's height, and charcoal fallback preserves useful live identity/actions when images fail. The 2048×768 originals are the practical resolution ceiling; enlarged content can exceed their available detail. Exact unmodified PNG source paths and SHA-256 digests are recorded in `src/assets/tools/README.md`; no new artwork or retouching is involved.

### Copy command

A square Surface bar holds locally scrolling, fully selectable Code ink text and a 44px copy button. Hover uses Hover/white; a successful check uses Positive. The real component announces success and leaves literal visible manual-copy instructions on failure. Preview snippets expose appearance and native hover/focus states, not working clipboard behavior or timers.

### Tool-page starting and reading regions

The same template gives both tools home/breadcrumb navigation, one landscape-backed opening containing the live identity/task masthead and square opaque Surface getting-started panel, then generated Reference contents, article, full operational guarantees and collection-derived sibling link. The starting panel preserves source status and command data and links to the existing Installation heading. It stacks below the masthead at 900px within the same painted opening; both remain in normal flow above the decorative cover image and local contrast scrim. Commands and controls retain opaque technical grounds, and installation never depends on imagery. The background adds no heading or contents entry; reference reading stays on untextured charcoal, with grain confined to the outer shell gutters. Breadcrumb, global navigation and contents have distinct accessible names; native anchors preserve the reading model.

### Clint terminal and documentation code

Only Clint mounts the full existing terminal, after reference Markdown and before guarantees, using `client:visible`. Homepage has only an explicit sample-output pointer; Relay has no empty example. The square terminal uses Code ground/ink with a Surface header, true JSON/Text tabs, valid/invalid sample switching, local scrolling, copy feedback and the visible label “Demonstration · Sample output, not live execution”. Samples and timing strings are not native CLI verification.

Documentation uses the single build-time `fluidise-nocturne` Shiki theme configured in `astro.config.mjs`: default/functions/constants use Code ink; comments use Code comments; keywords/storage use Action; strings use Positive; punctuation/operators use Secondary; invalid tokens use Negative, all on Code ground. No mineral syntax and no blanket span override are used. Prose links remain neutral and underlined. Tables scroll locally; inline code wraps. No form input component exists.

Every interactive/focusable element retains a 3px Mineral outline with 4px offset. Reduced motion disables smooth scrolling and suppresses transitions. Forced-color declarations preserve system color behavior and selected-state outlines rather than opting out globally. The interface is one fixed dark appearance from initial HTML (`color-scheme: dark`, matching metadata/theme color), not an OS-switching theme system.

## Do's and Don'ts

### Do:

- **Do** preserve the approved hero, its one semantic h1, painted title material, native-scroll journey, static alternatives and dock-free opening.
- **Do** keep ordinary reading and links neutral, and distinguish selected controls with a visible marker as well as semantic state.
- **Do** retain visible dock labels, safe-area clearance, focus outlines and bounded local scrolling for commands, tables and code.
- **Do** use the existing official white mark on dark surfaces and the official black mark on light-filled contexts without modifying either asset.
- **Do** preserve tool identity, factual data, exact command/sample payloads and visible manual-copy fallback.
- **Do** identify the Clint terminal as sample output, not live execution.
- **Do** confine background detail to empty gutter lanes and major transitions; omit rails/grain on narrow screens and all decoration in forced colors.

### Don't:

- **Don't** tint the charcoal grounds, headings, prose links or syntax with Mineral accent.
- **Don't** turn open task lanes into interchangeable rounded marketing cards or apply glass to technical panels.
- **Don't** replace the approved labeled bottom dock with a top header, icon-only navigation or a hamburger on these routes.
- **Don't** shrink mobile reading/code text, impose a 320px body minimum or hide overflow to conceal a layout defect.
- **Don't** add ambient motion, pointer-required behavior, a theme toggle or a second runtime highlighter.
- **Don't** treat design approval, screenshots, token contrast calculations or sample timing strings as release, performance or accessibility-conformance evidence.
- **Don't** use quiet construction rails as meaningful control boundaries or let grain and hatching cross reading, artwork, controls or focus outlines.

The sidecar contains nine scoped, framework-free HTML/CSS appearance samples. Its task lanes now embed the existing optimized paintings and grain rather than an image-free historical approximation; preview-only container queries apply the source layout thresholds to the panel's available width. The dock appears in flow instead of floating over the panel. Hover and focus styling are native, but filtering, clipboard feedback and terminal sample/format changes remain the responsibility of the live components, not these static previews.

Source evidence: `src/styles/global.css`, current route/component/layout owners and `astro.config.mjs`; provenance in `public/fonts/README.md` and `src/assets/tools/README.md`; product constraints in `PRODUCT.md`; visual/task-led authority and the current refinement in `docs/specs/dark-design-system.md`; protected hero authority in `docs/specs/alpine-canvas-hero.md`. The current surface brief distinguishes historical finish-review dispositions from the current refinement's source/documentation evidence and limits. This installed-system reference is not a deployment, WCAG, OS, physical-device, multi-browser or performance certificate.
