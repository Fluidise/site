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
    fontSize: 'clamp(3rem, 26cqi, 38rem)'
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
  dock-tooltip:
    fontFamily: "'Instrument Sans', 'Segoe UI', sans-serif"
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.4
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
  terminal-control:
    backgroundColor: 'transparent'
    textColor: '{colors.secondary}'
    typography: '{typography.label}'
    rounded: '{rounded.square}'
    padding: '12px 0'
  terminal-control-selected:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    typography: '{typography.label}'
    rounded: '{rounded.square}'
    padding: '12px 0'
  catalog-filter:
    backgroundColor: 'transparent'
    textColor: '{colors.secondary}'
    typography: '{typography.label}'
    rounded: '{rounded.square}'
    padding: '12px 0'
  catalog-filter-selected:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    typography: '{typography.label}'
    rounded: '{rounded.square}'
    padding: '12px 0'
  floating-dock:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.secondary}'
    rounded: '{rounded.dock-fallback}'
    padding: '6px'
    width: '202px'
  task-entry:
    textColor: '{colors.ink}'
    padding: '16px 0'
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
- Localized decoration gives empty charcoal space structure: one intersecting hatch field beside homepage installation, with the existing quiet rails, gutter grain and short hatches retained on documentation routes.
- A compact icon-only matte dock with hover/focus labels, and square installation, starting, terminal and code surfaces.
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
- **Selected / Selection:** Selected remains declared in the source palette, but current catalog filters and terminal controls are unfilled text choices and do not use it. Selection is the native text-selection backing and uses Primary ink.
- **Code ground / Code ink / Code comments:** terminal and documentation code, default tokens and comments.
- **Hero fallback / Hero title ink / Hero title wash:** protected scene backing and painted ivory material only. The uniform wash is not a decorative UI gradient.

Positive identifies existing check/success feedback and string syntax; Negative identifies failed copies, invalid samples and invalid syntax. Warning is declared in the source palette but has no current warning component; its presence is not permission to invent one. Feedback is also conveyed by text, icons or accessible state, never color alone.

The shared floating product previews have one local, user-pinned exception: their panels use an opaque charcoal ground (`#222222`). This is a component-specific material, not a new global palette token or permission to change the dock, installation controls or reference reading.

**The Mineral Restraint Rule.** Use Mineral accent only for primary-action fills, active-state markers and external keyboard-focus outlines. Keep reading, ordinary links, selected labels, text selection and code syntax neutral or semantic.

## Typography

**Display Font:** self-hosted Barlow Condensed 700, with Arial Narrow and sans-serif fallbacks, only in the hero.
**Heading, Body and Interface Font:** self-hosted Instrument Sans normal/italic variable 400–700, width fixed at 100%, with Segoe UI and sans-serif fallbacks.
**Code Font:** the native monospace stack in frontmatter.

The monumental condensed name contrasts with calm, medium-weight interface headings and open reading copy. Product names retain their actual casing. The active UI no longer uses Source Sans 3; its archived files and historical brief are not active type authority.

### Hierarchy

- **Display:** the protected wordmark uses the available-width size below, with the historical viewport-based display token as fallback. Its top offset is 3svh, or 8svh at widths up to 600px. Short landscape uses 2svh and `min(26vw, 38svh)`. A 94% text-width bound allows wider fallbacks or enlarged text to wrap.
- **Available-width display correction:** the viewport is an inline-size container and title size is `clamp(3rem, 26cqi, 38rem)`, with the existing display token as the unsupported-unit fallback. This keeps the complete loaded Barlow name on one line at standard 320px and 390px portrait sizes, including classic-scrollbar space. This also prevents the same scrollbar-related wrap at intermediate widths. The width bound and enlarged-text wrapping remain; the subsequent short-landscape rule still wins. No painting, material, scroll phase or hero navigation changes.
- **Documentation title:** the doc-title role is the tool page's single h1. It wraps long tool names rather than forcing page overflow.
- **Headlines:** the headline role serves section headings.
- **Task and installation identities:** homepage task headings use `clamp(1.625rem, 2.3vw, 2.125rem)` at 500 weight, 1.2 leading and -.025em tracking; their 22ch bound applies only at widths up to 900px. Installation resource identities use the body size at 500 weight and 1.4 leading. The installation heading uses `clamp(1.75rem, 2.5vw, 2.5rem)`.
- **Subheadings:** principles and prose h3 use subheading. The square starting panel uses the same 1.5rem size but inherits h2 leading (1.15). The example and guarantees h2 use `clamp(1.75rem, 3vw, 2.25rem)` with the shared heading weight/leading/tracking.
- **Body and prose:** body is the interface baseline; prose is the larger long-form reading role with a 68ch maximum. Supporting introductions reach 65–70ch. Article strong text uses 600 and Primary ink; normal reading remains 400.
- **Leads and labels:** lead serves task taglines and the tool-page task context. Label serves actions and small controls. Dock tooltips use the metadata size with 1.4 leading at every breakpoint; body and code do not shrink on mobile.
- **Metadata and terminal heading:** metadata serves status, demonstration and legal copy. The terminal footer uses 1.5 leading and tabular numerals; the shared count also uses tabular numerals. Terminal-heading is the quiet sample-panel title, not another display treatment.
- **Code:** code serves selectable installation commands, samples and fenced blocks. Inline prose code uses .875em/1.7; fenced code adds .01em tracking. Commands and preformatted blocks scroll locally by default; homepage installation commands and inline code wrap.

All faces use `font-display: swap`. The normal Instrument face is preloaded on every route; Barlow is preloaded only on the homepage; genuine Instrument italic loads when used. The two new unmodified official Google Fonts WOFF2 files total 61,692 bytes. Their OFL, checksums, exact source URLs, actual coverage and parsing evidence are recorded in `public/fonts/README.md`. Latin-1 diacritics are covered; other Latin Extended characters and check/cross symbols may use fallback. Native monospace adds no webfont. This documentation does not convert font metadata into full-language coverage or measured loading-performance claims.

**The Hero Family Rule.** Bind Barlow Condensed directly to the hero title. Instrument Sans owns every non-hero heading and interface role; never let a global heading-family change alter the protected wordmark.

## Layout

The full-bleed hero is independent of the centered non-hero shell (1440px default maximum). Homepage content and its footer override that cap to 1600px; documentation retains its outer 1120px cap and article prose a 68ch measure. The page gutter and repeated spacing steps are normative in frontmatter. Body uses `min-width: 0`, not a forced 320px width; minmax tracks, wrapping and bounded code/table scrolling accommodate a real 320px viewport even when a classic scrollbar reduces client width.

The protected hero has a 100dvh sticky viewport inside a reserved 300dvh native-scroll track, with vh fallbacks. Reduced motion and no JavaScript use an unpinned one-viewport static hero. GPU/decode failure retains the reserved journey geometry and original painting. Its material, numerical phases, source-bound contours and resource contracts remain owned by `docs/specs/alpine-canvas-hero.md`, not redefined by this UI system.

The current route composition is recorded in `.impeccable/surfaces/src-pages-index-astro.md`. Reused spatial patterns are open paired regions, fine editorial dividers and a reference rail beside prose. Above 900px, the homepage workbench places discovery and installation in 1.7:1 minmax columns with a 24px gap. Discovery contains successive single-column task rows; each row pairs live text and its separate scene in 0.95:1 columns with a 24px gap. Rows use 16px vertical padding and horizontal dividers. The installation desk starts 181px below the workbench top, with 40px left padding and one vertical divider; these are local composition values, not a reusable alignment mandate. At 900px and below discovery precedes installation in one column with a 64px gap; task text precedes its independently disclosed example, with 32px row padding, and the desk loses its offset, left padding and divider. Its commands remain unfiltered.

The workbench uses 32px top and 24px bottom padding, with 64px bottom padding in the stacked layout. The catalog introduction and toolbar have a 12px gap, followed by 16px before results; the subtitle starts 8px below the heading. Status choices and the count share a wrapping flex toolbar with 8px row and 24px column gaps. The choices themselves wrap with 4px row and 24px column gaps; the count stays in normal flow. Principles retain three open columns above 900px and stack below; their resources form a paired row, then a single column at the same boundary. Footer content and terminal command/output also stack at 900px. At 600px and below specified technical-panel padding becomes 20px, while reading and code sizes remain unchanged. The homepage footer uses the same 1600px cap as discovery and installation; its brand/resources sit between fine horizontal rules, followed by legal copy and dock clearance.

The shared product-scene baseline is recorded in `.impeccable/surfaces/src-components-toolcard-tsx.md`; the current homepage brief supersedes only its homepage placement and density. Homepage identity/actions remain on charcoal beside, never over, the scene on desktop; at 900px and below they precede its disclosure in a single column with a 20px gap. Homepage scenes have no minimum height. Tool openings remain two equal minmax columns with a 32px gap: identity and the starting panel stay together on charcoal at left, with the shared scene at right. At 900px and below the complete identity/installation region precedes that scene. Tool-page scenes retain the 400px minimum height, not a clipping height. All content grows in normal flow; body and code sizes do not shrink.

Homepage rails, gutter grain and repeated slash strips are absent. One transparent intersecting hatch image occupies otherwise empty installation space, behind opaque Canvas-backed content; it never supplies a meaningful control boundary. At 900px and below the same image is cropped into the 64px gap above installation, bounded to 420px width. This is a local homepage placement, not a site-wide ornament requirement. Documentation shells and their footer retain the previous empty-gutter rails/grain with a 12px content buffer, and quiet 64×8px reading/footer hatch accents. At 600px and below documentation rails/grain disappear. Decoration accepts no pointer input and is hidden in forced colors; the homepage hatch uses an isolated local stacking context to remain behind content.

Reference contents uses a 12rem left rail with a 48px gap above 900px. It is sticky only when viewport height exceeds 700px, with a 28px top offset and a dock-aware maximum height; otherwise it remains in flow. At 900px and below contents is a visible wrapping list before the article, not a drawer. It is generated from actual rendered headings rather than a second maintained inventory.

The dock is bottom-centered, with its width/padding in frontmatter and a 58px height. Four 44px targets are separated by 4px gaps. Its bottom offset is `calc(20px + env(safe-area-inset-bottom, 0px))`, or 12px plus safe area at widths up to 600px. Shared anchor/focus/footer clearance is `calc(7rem + env(safe-area-inset-bottom, 0px))`; top scroll spacing is 28px. These are implemented clearance rules, not a claim of universal zoom or focus conformance; validate new long tooltip labels and resized text against the actual dock.

## Elevation & Depth

The interface is flat by default: opaque tonal layering, generous space and visible 1px boundaries establish grouping. No translucent glass, backdrop blur or shadow remains in the current dock. A fine decorative border uses 50% Line around its opaque Surface ground; the icons, not that container edge, identify its controls. The approved painting keeps its dedicated layered scene and painted-glyph separation; neither becomes a general-purpose card effect.

The retained documentation background treatment reuses Line locally: 1px rails mix it at 22% opacity and shallow diagonal hatches at 28%, without weakening meaningful dividers or control boundaries. One original static 96×96 indexed grain tile (alpha 8/255; 5437 bytes, within the 8192-byte budget) is shared only by those gutter lanes. The homepage instead uses one approved transparent generated hatch at .45 opacity in empty installation space, optimized to static quality-80 WebP at build time. Its approximately 373 KB payload is an added cost, not a performance improvement. Reading, artwork, mastheads, commands, controls and the dock retain opaque grounds; missing decoration leaves useful content unchanged. Neither treatment adds animation or a runtime owner.

### Shadow Vocabulary

- **Dock and tooltips:** no shadow; compact opaque tonal grounds keep them quiet.
- **Text-control selection:** catalog status choices and Clint terminal tabs use a neutral text underline, not a filled or inset-shadow marker. Hover alone does not add the selected underline.
- **Floating product-preview panels only:** `0 12px 32px rgb(0 0 0 / 0.28)` separates the opaque local preview ground from its landscape. The fine edge is `1px solid rgb(242 242 242 / 0.18)`. Neither treatment introduces translucency or backdrop blur; forced colors remove the shadow and use Canvas/CanvasText boundaries.
- **Painted wordmark separation:** `drop-shadow(0 3px 12px rgb(20 30 58 / 0.32))` on the clipped semantic title. Unsupported clipping retains `0 3px 24px rgb(20 30 58 / 0.32)` text-shadow. The coincident decorative face adds neither; forced colors remove the material/filter.

**The Matte Instrument Rule.** Use opaque tonal surfaces and fine borders for the interface. The dock stays compact and unshadowed; installation, starting, terminal and documentation-code panels stay square and flat. Only the shared illustrative product previews use the local floating-panel material described here. Do not extend their shadow, the painting, glass blur or decorative texture into reading surfaces. Confine decoration to empty space: one localized hatch field on the homepage, retained rails, gutter grain and short hatches on documentation routes; never overlay reading, controls or artwork.

## Shapes

The dock, primary links and copy buttons use native `corner-shape: squircle` with a 40px radius where supported. The final feature query applies to those components and dock links after responsive styles. Unsupported browsers use the observed fallbacks: dock 28px; primary links 16px; dock links and copy buttons 12px. Catalog status choices and Clint terminal format/sample controls are square, unboxed text controls and do not join this radius treatment. These radii do not change official SVG geometry.

Installation bars, getting-started panels, terminal frames, inline code and fenced code stay square. Task lanes and principles are open compositions, not filled rounded cards. Within the separate square-edged landscape scenes only, illustrative preview panels have gently curved 12px corners, not the shared squircle treatment. Meaningful control edges use Control border; editorial row/section edges use Line.

## Components

### Actions and small controls

Primary links are mineral-filled with dark Canvas ink, a 44px minimum height and the label role; hover adds an underline without changing fill/ink. Neutral text links retain the same minimum height and turn white on hover. Disabled buttons use .5 opacity and a not-allowed cursor; read-only content does not inherit that treatment.

The catalog's three status choices and Clint terminal format/sample controls use the existing label typography on transparent, borderless, square targets with at least 44px height and width, and 12px vertical padding. Secondary ink becomes Primary ink on hover or selection; only the selected catalog choice or terminal tab has a 1px neutral text underline, offset 8px from the label. Hover adds no fill, box or marker, and there is no transition or animation. Visible keyboard focus is independent of selection: a 3px Primary ink outline with 4px offset, using Highlight in forced colors. Catalog buttons preserve `aria-pressed` and `aria-controls`; the adjacent native output announces the count. Clint retains its true JSON/Text tabs, roving focus, Home/End/arrow navigation and separate sample-toggle action. This terminal-only exception does not change other tool-page controls.

### Navigation dock

Four stable icon links retain the accessible names Explore, Install, Principles and GitHub; the last also announces its new-tab behavior. The maintainer explicitly requested icon-only navigation with macOS-like labels above the hovered icon, superseding the earlier always-visible-label rule for this component. Explore imports the existing white source SVG inline through Astro; the remaining symbols are existing Tabler line SVGs. All icons are 22px within 44×44px targets at every breakpoint. No magnification is added, and the official source/public SVG files remain unchanged.

The maintainer separately approved a small authored eye blink in this dock instance only. Both original eye rectangles compress vertically together around their own centers; the silhouette and smile do not move. A blink closes in 60ms and reopens over 120ms. Each sequence follows a fresh random 8–18-second pause; 20% contain a second blink after a 200ms open-eye gap (560ms total). CSS owns the bounded single/double animation and Navbar owns one pending timeout, using the first eye's animation-end event to schedule the next pause. No new dependency, animation-frame loop or layout-driving property is introduced.

The maintainer separately approved an entrance and exit motion choreography for this dock: a macOS-style vertical slide with a natural overshoot rebound (`cubic-bezier(0.34, 1.28, 0.64, 1)`) and a 25ms icon stagger on reveal, and a faster 180ms ease-in exit downwards when scrolling down or hiding. Auto-hide on scroll hides the dock during downward reading scroll and restores it immediately on upward scroll, keyboard focus, or hover. Reduced motion falls back to an instantaneous and pure opacity fade with zero spatial translation.

Hover anywhere over the dock, focus anywhere inside it, a hidden document, a dock hidden behind the hero, reduced motion and disconnection all cancel pending work and immediately restore open eyes. Resuming starts a full new random pause, never a catch-up blink. Reduced motion has both a runtime media-query listener and a CSS static fallback; without JavaScript the inline logo is the original static face. Other logo instances remain static external images.

The labels appear 12px above their links on hover or visible keyboard focus. They repeat the accessible names visually, so their spans are hidden from assistive technology to avoid duplicate announcements. A transparent bridge keeps each tooltip reachable by pointer; Escape dismisses labels even when keyboard focus is elsewhere. Pointer re-entry or a new focus restores them. Tooltips use Raised/Primary ink, an 8px radius and 6×10px padding. Native links activate directly on touch without requiring a label-reveal tap.

The homepage dock is hidden from view/focus/assistive navigation while the hero fills the viewport and returns at the task gateway boundary. Tool pages keep it visible without falsely marking a homepage destination as current. Homepage current state uses neutral icon ink and a 4px mineral dot, reconciled with native anchors/history and visible section context. The lifecycle retains cleanup, bounded scheduling and optional-observer fallbacks, including disposal of tooltip listeners. Without JavaScript the named native links and CSS hover/focus labels remain usable; Escape dismissal requires JavaScript.

### Task gateway and installation desk

The scoped homepage critique fixes add independently collapsible examples beneath each task at widths up to 900px. The existing React owner keeps one expansion state per task; CSS, not viewport listeners, selects the presentation. Controls expose their tool name, `aria-expanded` and the unique content target, retain native button keyboard behavior and show a 3px focus outline. Mobile examples start collapsed without an expanded-first hydration shift; above 900px both existing scenes remain visible and controls are absent from layout and accessibility navigation. One copy of each unchanged scene stays in server HTML. Without JavaScript, homepage-local noscript CSS exposes both scenes and hides the inert controls. Reference-page scenes are not collapsible. This supersedes only the always-expanded homepage mobile preview treatment below.

The installation desk identifies its macOS Homebrew fast path, links each tool directly to its installation section, and explains that a separate tap step is optional for the fully qualified commands. Both square command bars appear first, followed by shared platform guidance, per-tool identity/status and installation/source links, then the optional tap command. Their ordered collection is independent of the catalog filter, and stable installation-row anchors remain. Homepage command text wraps anywhere instead of requiring horizontal scrolling; other command bars retain local scrolling. Relay's collection status/version match the published non-prerelease v0.1.0 and current formula, rather than the stale development/alpha labels. Publication and formula inspection are not installation or production-safety certification. Owning evidence and verification limits are recorded in `docs/specs/homepage-critique-fixes.md`.

Task statements lead open charcoal rows together with live package identity/status, purpose and actions. A separate landscape-backed product scene sits beside each text region on desktop; neither identity nor installation actions overlay the painting. Clint uses the supplied text-free plum/lavender woodland; Relay uses the supplied text-free emerald coastal currents. Decorative empty-alt images cover only the scene behind opaque illustrative panels; no names, marks or actions are baked into the paintings, and the images add no link or focus target. The opaque panels and caption ground provide contrast without a scene scrim. Normal-flow content wraps and grows without fixed-height clipping. A mineral Get started link opens the responsible tool page, while neutral Install command reaches its stable installation row. The three neutral text status choices and the announced count affect only task results; they do not gate access to tool links or installation. The separately titled installation desk always renders the unfiltered ordered collection, exact source commands when present, docs/source links and one Homebrew tap control. There is no exclusive task state, hidden installation prerequisite or generic card library. Installation, principles and footer contain no landscape imagery; only installation's empty space carries the new hatch.

Both routes use the same required collection banner field and server-only preparation in `src/lib/tool-banner.ts`. It produces local WebP variants at widths 320, 640, 960, 1280, 1600 and 2048 with quality 85; only resolved native image attributes and intrinsic 2048×768 dimensions, not raw source metadata or the optimization result, reach the catalog island. The source-width fallback and `sizes="2048px"` select the full-size candidate because narrow, tall cover boxes need source height, not merely their element width. The current encoded paintings are 76,108 bytes for Clint and 57,736 bytes for Relay, with shared cacheable URLs across home and tool routes. Six candidates remain generated; this is not element-width-based responsive selection. Native lazy loading and asynchronous decoding add no preload, animation, observer or image-fetch runtime. Content determines the painted region's height, and charcoal fallback preserves useful live identity/actions when images fail. The 2048×768 originals are the practical resolution ceiling; enlarged content can exceed their available detail. Exact unmodified PNG source paths and SHA-256 digests are recorded in `src/assets/tools/README.md`; no new artwork or retouching is involved.

### Shared floating product scenes

One shared static semantic figure supplies both homepage previews and both tool-page openings. Two normal-flow panels are staggered horizontally by 24px, reduced to 12px at widths up to 600px. Their opaque local ground, fine edge, soft offset shadow and 12px corners are confined to this component. Panels have 20px padding, reduced to 16px on narrow screens; the surrounding scene uses 40px vertical and 32px horizontal padding, reduced to 32px and 16px respectively. Code remains actual selectable HTML in the existing code role and wraps anywhere rather than clipping. A separate opaque Surface caption identifies each as an “Illustrative example”, qualified as a JSON excerpt or plan summary. There are no preview controls, animation, new assets or new hydration owner; tool routes render the figure without a client directive.

Homepage-only density overrides preserve that content and code size: desktop panel stacks use 12px vertical/48px horizontal scene padding, 8px gaps, 10px/12px panel padding and a 12px stagger. Preview code leading is 1.35 and caption padding is 6px/12px. At 900px and below, disclosed scenes use 24px scene padding, 16px panel padding/gaps, original 1.7 code leading and 12px/16px caption padding; scene padding becomes 20px/16px at 600px. Tool-page scenes retain the shared baseline above.

Clint pairs `COMMIT_EDITMSG` containing `feat(core): add search` with a valid-result JSON excerpt containing only the verified `schema_version`, `status` and `diagnostics` fields, plus Exit 0. Relay pairs the configured `commit-msg` command `fluidise-clint --file {message-file}` with a read-only inspection/install-plan summary and matching `--plan <id>` approval requirement. The records in `.impeccable/review/tool-scenes/` tie these examples to owning local CLI source hashes and disposable-fixture outputs. They do not establish remote release or installation availability, and the panels are not live execution or a graphical product interface. Existing Markdown and sandbox sample drift remains separate and is not authority for these previews. Missing images leave the same useful text and opaque fallback; forced colors hide the paintings and use system-colored panel boundaries without shadows.

### Copy command

A square Surface bar holds fully selectable Code ink text and a 44px copy button. Commands scroll locally by default; the homepage installation desk alone wraps them with overflow-wrap anywhere. Hover uses Hover/white; a successful check uses Positive. The real component announces success and leaves literal visible manual-copy instructions on failure. Preview snippets expose appearance and native hover/focus states, not working clipboard behavior or timers.

### Tool-page starting and reading regions

The same template gives both tools home/breadcrumb navigation, a charcoal identity/task masthead and square opaque Surface getting-started panel at left, and the shared landscape-backed product scene at right. The starting panel follows the masthead in the same left column at every width; at 900px and below this complete identity/installation region precedes the scene. Neither sits over imagery or a contrast scrim. The starting panel preserves source status and command data and links to the existing Installation heading. Commands and controls retain opaque technical grounds, and installation never depends on imagery. Generated Reference contents, article, full operational guarantees and the collection-derived sibling link follow the opening unchanged. The decorative scene adds no heading or contents entry; reference reading stays on untextured charcoal, with grain confined to the outer shell gutters. Breadcrumb, global navigation and contents have distinct accessible names; native anchors preserve the reading model.

### Clint terminal and documentation code

Only Clint mounts the full existing interactive terminal, after reference Markdown and before guarantees, using `client:visible`. The homepage and both tool openings now also show the shared static illustrative product scenes described above; Relay has no empty interactive-terminal section. The square terminal uses Code ground/ink with a Surface header, true JSON/Text tabs, valid/invalid sample switching, local scrolling, copy feedback and the visible label “Demonstration · Sample output, not live execution”. Its historical samples and timing strings are not native CLI verification; verification of the new static preview excerpts does not validate or change the sandbox's separate samples.

Documentation uses the single build-time `fluidise-nocturne` Shiki theme configured in `astro.config.mjs`: default/functions/constants use Code ink; comments use Code comments; keywords/storage use Action; strings use Positive; punctuation/operators use Secondary; invalid tokens use Negative, all on Code ground. No mineral syntax and no blanket span override are used. Prose links remain neutral and underlined. Tables scroll locally; inline code wraps. No form input component exists.

Interactive/focusable elements retain a 3px Mineral outline with 4px offset except catalog status choices and Clint terminal text controls, whose same-sized outline uses Primary ink and becomes Highlight in forced colors. Reduced motion disables smooth scrolling and suppresses transitions. Forced-color declarations preserve system color behavior and visible focus rather than opting out globally. The interface is one fixed dark appearance from initial HTML (`color-scheme: dark`, matching metadata/theme color), not an OS-switching theme system.

## Do's and Don'ts

### Do:

- **Do** preserve the approved hero, its one semantic h1, painted title material, native-scroll journey, static alternatives and dock-free opening.
- **Do** keep ordinary reading and links neutral, and distinguish selected controls with a visible marker as well as semantic state.
- **Do** retain accessible dock names, hover/focus labels, safe-area clearance, focus outlines and bounded local scrolling for commands, tables and code.
- **Do** use the existing official white mark on dark surfaces and the official black mark on light-filled contexts without modifying either asset.
- **Do** preserve tool identity, factual data, exact command/sample payloads and visible manual-copy fallback.
- **Do** identify the Clint terminal as sample output and both static product scenes as illustrative, not live execution.
- **Do** confine background detail to empty space: one localized installation hatch on the homepage, retained gutter lanes and quiet transitions on documentation routes; omit documentation rails/grain on narrow screens and all decoration in forced colors.

### Don't:

- **Don't** tint the charcoal grounds, headings, prose links or syntax with Mineral accent.
- **Don't** turn open task lanes into interchangeable rounded marketing cards or apply glass to technical panels.
- **Don't** replace the compact bottom dock with a top header or hamburger, or remove its accessible names and hover/focus labels.
- **Don't** shrink mobile reading/code text, impose a 320px body minimum or hide overflow to conceal a layout defect.
- **Don't** add ambient motion beyond the explicitly approved dock-eye blinks and dock entrance/exit transitions, pointer-required behavior, a theme toggle or a second runtime highlighter.
- **Don't** treat design approval, screenshots, token contrast calculations or sample timing strings as release, performance or accessibility-conformance evidence.
- **Don't** use quiet construction rails as meaningful control boundaries or let grain and hatching cross reading, artwork, controls or focus outlines.

The sidecar contains nine scoped, framework-free HTML/CSS appearance samples. This refinement updates the Clint terminal's text-control appearance and affected guidance, not unrelated historical previews. Its task-lane examples retain the earlier complete-text-over-landscape composition, rails/grain and transition hatches, not the current workbench or separate identity/actions and floating product scenes. That preserved historical HTML/CSS is not an implementation target. Preview-only container queries apply their layout thresholds to the panel’s available width. The dock appears in flow instead of floating over the panel. Hover and focus styling are native, but filtering, clipboard feedback and terminal sample/format changes remain the responsibility of the live components, not these static previews.

Source evidence: `src/styles/global.css`, current route/component/layout owners including `ToolCard.tsx` and `ToolPreview.tsx`, and `astro.config.mjs`; provenance in `public/fonts/README.md` and `src/assets/tools/README.md`; product constraints in `PRODUCT.md`; visual/task-led authority in `docs/specs/dark-design-system.md`; the local product-scene baseline in `.impeccable/surfaces/src-components-toolcard-tsx.md`; current homepage composition authority in `.impeccable/surfaces/src-pages-index-astro.md` and local evidence in `.impeccable/review/workbench/verification.md`; protected hero authority in `docs/specs/alpine-canvas-hero.md`. Surface briefs distinguish historical finish-review dispositions from current source/documentation evidence and limits. This installed-system reference is not a deployment, WCAG, OS, physical-device, multi-browser or performance certificate.
