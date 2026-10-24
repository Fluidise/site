---
name: 'Fluidise Alpine Glass'
description: 'Snow-white tool discovery, alpine photography, glacial navigation, and square technical surfaces.'
colors:
  snow: '#ffffff'
  ice: '#eff5fa'
  slate: '#11243b'
  muted: '#50627a'
  glacier: '#075cce'
  line: '#d9e3ed'
  control-ground: '#f0f5f9'
  control-border: '#d3e0ee'
  control-hover: '#e3effb'
  control-selected: '#e6f1ff'
  control-selected-border: '#bcd9ff'
  dock-glass: 'rgb(244 250 255 / .92)'
  dock-ink: '#344a64'
  symbol-ground: '#eaf3fc'
  terminal-ground: '#f9fbfd'
  terminal-border: '#cbd9e7'
  terminal-output: '#134b82'
  error: '#a5243b'
  code-ground: '#10283e'
  code-ink: '#edf6ff'
  selection-ground: '#c7e3ff'
  hero-fallback: '#3d8ec7'
  dock-hover: 'rgb(212 232 255 / .55)'
  copy-hover: '#dbeaf9'
  principle-highlight: '#215887'
  inline-code-ink: '#214c78'
typography:
  display:
    fontFamily: 'Goldman, sans-serif'
    fontSize: 'clamp(28px, 5.18vw, 88px)'
    fontWeight: 700
    lineHeight: 1
    letterSpacing: '.5em'
  headline:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: 'clamp(28px, 2.8vw, 44px)'
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: '-.03em'
  doc-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: 'clamp(32px, 5vw, 64px)'
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: '-.035em'
  package-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: '24px'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '-.03em'
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: '16px'
    fontWeight: 400
    lineHeight: 1.6
  prose:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: '16px'
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: '14px'
    fontWeight: 500
  code:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
    fontSize: '13px'
    lineHeight: 1.7
  compact-label:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: '12px'
  catalog-summary:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: '15px'
    fontWeight: 400
    lineHeight: 1.65
  documentation-lead:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: '18px'
    fontWeight: 400
    lineHeight: 1.7
  principle-heading:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: '20px'
  compact-package-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    fontSize: '21px'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '-.03em'
rounded:
  square: '0'
  copy-control: '12px'
  control-fallback: '16px'
  symbol-fallback: '20px'
  dock-fallback: '28px'
  squircle: '40px'
spacing:
  xs: '4px'
  sm: '8px'
  control-gap: '12px'
  md: '16px'
  panel: '24px'
  lg: '32px'
  xl: '40px'
  section: '64px'
  page-gutter: 'clamp(20px, 3.6vw, 64px)'
components:
  glacial-control:
    backgroundColor: '{colors.control-ground}'
    textColor: '{colors.muted}'
    typography: '{typography.label}'
    rounded: '{rounded.control-fallback}'
    padding: '11px 24px'
  glacial-control-selected:
    backgroundColor: '{colors.control-selected}'
    textColor: '{colors.glacier}'
    typography: '{typography.label}'
    rounded: '{rounded.control-fallback}'
    padding: '11px 24px'
  floating-dock:
    backgroundColor: '{colors.dock-glass}'
    textColor: '{colors.dock-ink}'
    rounded: '{rounded.dock-fallback}'
    padding: '10px 25px'
    width: 'min(532px, calc(100% - 24px))'
  catalog-entry:
    backgroundColor: '{colors.snow}'
    textColor: '{colors.slate}'
    padding: '28px 0 34px'
  copy-command:
    backgroundColor: '{colors.ice}'
    textColor: '{colors.slate}'
    rounded: '{rounded.square}'
    padding: '10px 12px'
  copy-button:
    backgroundColor: 'transparent'
    textColor: '{colors.muted}'
    rounded: '{rounded.copy-control}'
    size: '44px'
  terminal:
    backgroundColor: '{colors.terminal-ground}'
    textColor: '{colors.slate}'
    rounded: '{rounded.square}'
  documentation-code:
    backgroundColor: '{colors.code-ground}'
    textColor: '{colors.code-ink}'
    rounded: '{rounded.square}'
    padding: '24px'
---

# Design System: Fluidise Alpine Glass

## Overview

**Creative North Star: "Alpine Glass"**

An alpine panorama establishes the Fluidise identity; snow-white reading surfaces keep its independent developer tools legible. Glacier blue marks actions and selected controls, while slate carries the documentation. Liquid/glacial glass belongs to the labeled navigation dock, not the technical panels.

The wide wordmark is the display voice. Catalog headings and source prose use the system sans stack; commands and structured samples use monospace. Existing black and white official SVG logos remain unmodified. This records the approved implementation, not a completed shipping review: the human first-viewport checkpoint is accepted, while automated workflow closure remains incomplete.

**Key Characteristics:**

- Full-width alpine photography with an uninterrupted sky wordmark.
- Snow-white reading ground, glacier-blue actions, and slate text.
- Fixed labeled glacial-glass dock with progressive squircle corners.
- Square installation, terminal, and documentation code surfaces.
- Preserved source content and explicitly labeled demonstrations.

## Colors

Cool white and glacier blue establish the alpine world; slate provides reading contrast. Frontmatter records source values, including component-specific surfaces rather than pretending every shade is a global custom property.

### Primary

- **Glacier:** links, selected filters, dock interaction, and keyboard focus.

### Neutral

- **Snow / Ice:** page ground and quiet secondary sections or command backgrounds.
- **Slate / Muted:** primary reading and supporting copy; muted is not disabled text.
- **Line:** restrained dividers between entries and technical regions.
- **Control ground / hover / selected:** small interactive surfaces, with their observed border companions.
- **Dock glass / ink:** translucent navigation material and its default label color.
- **Symbol ground:** quiet blue backing for small tool symbols.
- **Terminal ground / border / output:** light demonstration panel with blue structured output.
- **Code ground / ink:** dark documentation blocks, distinct from the light interactive terminal.
- **Selection ground:** pale blue text-selection backing, paired with slate text.
- **Hero fallback:** blue banner backing while the photographic asset loads.
- **Dock hover / Copy hover:** the actual translucent dock-link hover and opaque copy-button hover surfaces; neither is a new brand accent.
- **Principle highlight / Inline code ink:** supporting blue emphasis within principles and pale-backed inline documentation code.

The error token is functional: invalid sample output and visible copy-failure feedback. It is not an additional brand accent. Sidecar tonal ramps are synthesized preview metadata only, not additional normative palette choices.

## Typography

**Display Font:** self-hosted Goldman Bold, with sans-serif fallback; used for the wide white FLUIDISE wordmark only.
**Body Font:** the system sans stack recorded in frontmatter.
**Label/Mono Font:** the system monospace stack recorded in frontmatter.

The technical wordmark contrasts with straightforward catalog and documentation typography. System sans headings are the observed implementation, not a new decorative display face or permission to replace Goldman.

### Hierarchy

- **Display:** responsive wordmark; approximately 78px on the reviewed wide viewport, with the exact clamp in frontmatter. At widths up to 600px, size becomes 5.4vw, tracking .3em, and left position 6%.
- **Headline:** catalog section heading; other demonstration and documentation section headings use 28px.
- **Documentation title:** large tool name, wrapping anywhere when required.
- **Package title:** explicit bold weight (700), 24px desktop and 21px at widths up to 600px.
- **Body:** supporting introductory copy at 16px/1.6; catalog summaries use 15px/1.65 and taglines 16px/1.55. Reading measures are 70ch for supporting catalog copy, 65ch for the documentation lead, and 72ch for article prose.
- **Prose:** 16px/1.8, with bold 28px second-level and 21px third-level headings.
- **Label:** small controls use 14px/500; mobile controls and dock labels use 12px. Dock labels remain visible, using “Docs” in place of the full Specifications label on mobile while preserving its accessible name.
- **Documentation lead:** introductory tool-page paragraph at 18px/1.7.
- **Principle heading:** 20px heading within each principle; no new display family or weight is prescribed.
- **Compact label:** the observed 12px step for mobile dock/control labels and small metadata; the component retains its own weight.
- **Code:** terminal command text uses 13px/1.7; output uses 13px/1.65, becoming 12px on mobile. Installation text uses 12px; article inline code uses .85em/1.7.

**The Brand Asset Rule.** Use the existing official black or white SVG logo unchanged; do not trace, recolor, or replace it with a generated mark.

## Layout

The shared shell is centered, capped at 1600px, with the fluid page gutter in frontmatter. Documentation has its own 1120px maximum shell and a narrower prose measure. The site supports a 320px minimum body width.

The homepage photograph spans the viewport width and occupies exactly 75% of its height, implemented as 75vh followed by 75svh for small-viewport support. The image covers the banner; desktop uses a centered crop and mobile uses 56% center. The wordmark sits in the upper-left sky. Terminal and installation content remain below the photograph.

The catalog follows directly on white. Its heading/filter region reserves a deliberate dock-safe transition with min-height calc(25svh - 30px); the first tool entry starts after that transition, not underneath the dock. The fixed dock is bottom-centered, capped at 532px and bounded by calc(100% - 24px). Desktop bottom offset is calc(20px + env(safe-area-inset-bottom, 0px)); mobile uses 12px plus the safe area. Shared clearance is calc(116px + env(safe-area-inset-bottom, 0px)), used for footer padding, focus scrolling, and scroll padding.

Catalog entries are open rows, not enclosed marketing cards. Their icon/content grid uses 80px plus minmax(0,1fr), with 32px gap. At 900px and below, icon size becomes 64px and gap 24px; at 600px and below, 44px and 16px. Installation stays beneath the content on desktop and spans both grid columns on mobile, capped at 600px. A bounded wrapper and explicit minmax(0,1fr) installation track preserve local command scrolling without page overflow.

The terminal uses paired command/output columns, stacking at 600px and below. The three-column principles region stacks at 900px and below. The footer stacks at the same breakpoint. The observed spacing vocabulary runs from small 4–16px control gaps to 24–40px region spacing and 64px section separation.

## Elevation & Depth

Photography supplies landscape depth. The white catalog and ice-toned reading surfaces remain flat, separated by space and fine borders. The dock alone carries the main floating material: a luminous translucent fill, white edge, 24px backdrop blur with saturation 1.25, diffuse shadow, and an inset white highlight. Reduced-transparency preferences replace this material with an opaque pale-blue surface and no backdrop filter.

### Shadow Vocabulary

- **Dock lift:** `0 10px 32px rgb(26 65 105 / .16), inset 0 1px 1px white`.
- **Wordmark separation:** `0 2px 12px rgb(12 54 83 / .18)` text shadow over the photograph.

**The Material Contrast Rule.** Keep glass on navigation and square corners on technical surfaces; do not turn commands or terminal output into glass cards.

## Shapes

Squircle geometry is limited to the dock and small controls/symbols. Supported browsers use corner-shape: squircle with border-radius: 40px for the dock, dock links, glacial controls, copy buttons, and tool symbols on both desktop and mobile. A final feature query after the responsive styles owns this geometry, so mobile rules cannot restore conventional corners. Unsupported-browser fallbacks remain 28px for the dock, 12px for dock links, 16px for glacial controls, 20px for desktop tool symbols, and 12px for mobile tool symbols and copy buttons. The copy-control radius token records that unsupported-browser fallback, not the native squircle radius. Do not extend this geometry to large technical panels.

Installation bars, the interactive terminal, documentation header, inline code, and code blocks retain square corners. Thin borders define technical containment without extra elevation. Official logo path geometry is asset content, not a shape token to alter.

## Components

### Small controls and filters

Quiet blue-white controls with a 44px minimum height, fine border, muted labels, and selected glacier-blue ink. Hover changes background and text; aria-pressed exposes filter selection; aria-selected and keyboard-navigable tabs expose terminal format selection. The source uses .15s ease color/background transitions, not a banner animation system. Disabled controls reduce opacity to .5 and show a not-allowed cursor.

### Navigation dock

Four vertically paired icons and visible labels form the shared fixed navigation. Default labels are slate-blue; hover adds a translucent blue surface and selected in-page destinations use glacier blue. Desktop icons are 23–25px, mobile 22px. The official black logo remains the Tools symbol. Tabler line SVGs serve the other destinations. Navigation remains usable with forced colors and reduced transparency.

### Catalog entries

Open divider-separated rows hold a small tool symbol, bold package name, original tagline and summary, features, documentation/repository links, status, and installation when present. The Clint symbol uses the official SVG; Relay uses the existing fork icon. Filters retain their existing labels and source behavior.

### Copy command

A square ice-toned bar holds a locally scrolling monospace command and a 44px square-footprint copy button with native squircle corners and a 12px unsupported-browser fallback. Hover uses blue-white fill and glacier ink. The live component changes its icon after successful clipboard copying and announces success; failure remains visible and instructs manual selection. Preview snippets represent appearance and native states, not clipboard functionality.

### Interactive terminal

A square bordered light panel with header controls, command/output split, and metadata footer. The visible “Demonstration · Sample output, not live execution” label is required to preserve product truth. JSON/Text selection, valid/invalid samples, and copy feedback remain implemented behavior, not evidence of executing a native tool. Invalid sample output uses the functional error color.

### Documentation code

Dark square code blocks contrast with the light demonstration terminal. Blocks scroll locally, use 24px padding, and retain syntax-rendered source content. Inline code has a small pale backing and square corners. Documentation links are blue and underlined.

All interactive elements retain a 3px glacier focus outline with 4px offset. Reduced-motion preferences disable smooth scrolling and effectively suppress transitions. Banner animation remains explicitly deferred; do not infer a new motion grammar from existing control transitions. No input-field component exists in the current system.

## Do's and Don'ts

### Do:

- **Do** preserve the 75% viewport homepage banner and the dock-safe transition before the first tool entry.
- **Do** retain visible dock labels, safe-area spacing, keyboard focus, and local command scrolling.
- **Do** use the official black and white SVG assets without modification.
- **Do** preserve original tool names, source copy, filters, links, sample modes, and copy feedback.
- **Do** label terminal samples as demonstrations, not live execution.

### Don't:

- **Don't** add a conventional top navigation bar, homepage marketing headline, or right reading rail to this approved composition.
- **Don't** apply glass or rounded corners to installation bars, terminal panels, or documentation code blocks.
- **Don't** add banner animation in this task; it is deferred to a dedicated skill.
- **Don't** treat existing release, availability, performance, or execution claims as evidence verified by the redesign.

Evidence: current source in `src/styles/global.css`, `src/components/`, `src/pages/index.astro`, `src/pages/tools/[id].astro`, and `src/layouts/Layout.astro`; approved direction in `.impeccable/surfaces/src-pages-index-astro.md`; product constraints in `PRODUCT.md`. The independent review's follow-up verdict records overflow, dock clearance, and package heading fixes as resolved. The human first-viewport checkpoint is accepted; the local engine correction recognizes that approval, but separate automated material gates and workflow/evidence closure remain incomplete. Current task status and diagnostic references are recorded in the surface brief. This document does not certify shipping completion.
