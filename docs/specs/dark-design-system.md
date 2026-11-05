# Fluidise Nocturne — Single-Dark Design System

## Mandate and document ownership

Design a coherent dark interface around the approved painterly suspended-archipelago hero, replacing the current light **Alpine Glass** interface rather than recoloring isolated widgets. The user requested a full design-system reconsideration and a single dark theme, supplied [Entire](https://entire.com/) and [Codex](https://openai.com/fr-FR/codex/) as references, and selected **option 1: preserve the approved hero and its lettering; rebuild the surrounding system**.

The initial mandate covered this design document, primary-author documentary corrections, one fresh-context inherited-model read-only review and one fresh targeted revalidation; both review passes are complete for their historical revision. Subsequent user requests authorized an HTML color study and its visual iterations. The current request synchronizes the accepted palette here and refreshes only the companion’s approval/source-reference text. It does **not** authorize production implementation, font acquisition, installation, further delegation, Git operations, publication, deployment or edits to another repository. Current application work is uncommitted and must not be reset.

This is the single canonical **proposed** design. `DESIGN.md` and `.impeccable/design.json` continue to describe the implemented interface; they are not changed to future values during this design-only phase. The existing [hero contract](alpine-canvas-hero.md) remains its behavior/material owner. Visual approval of the palette is recorded below; it does not approve every remaining design decision or authorize implementation.

### Outcome

After implementation, the homepage below the hero and both tool-documentation routes should look like one deliberate product: neutral charcoal surfaces, untinted white/gray reading, a restrained mineral-blue priority/focus accent, discreet pastel semantic feedback, readable technical content, and typography that supports rather than repeats the monumental brand title. Tool discovery, installation, reading and copy feedback must remain easier to recognize than decorative effects.

**Creative direction: Nocturne.** The painting is the expressive event; the interface is the calm instrument beneath it. Use matte surfaces and generous editorial rhythm, not a terminal wallpaper or a grid of interchangeable marketing cards.

### Palette supersession and approval (2026-11-05)

The user retained Neutral Charcoal foundations, rejected the lavender/indigo UI direction and the Warm Charcoal alternative, accepted achromatic Reading and ordinary Interaction roles, then selected mineral blue `#AABAD9` for primary-action fill, the active marker and keyboard focus only. Pastel semantic colors remain unchanged. The user also accepted the stronger Divider `#808080` and then requested synchronization with the HTML companion. These decisions supersede the earlier color table and its broader accent use, not the approved hero.

Approval covers the palette and these limited usages as seen in the HTML study. The companion uses system sans when Instrument Sans is unavailable; it is not evidence of the selected webfont’s appearance, licensing payload or delivery budget. Typography, the complete production layout, runtime/accessibility behavior and final approval of the whole specification remain outside that visual palette acceptance.

## Evidence and preserved contracts

### Observed baseline

- `src/pages/index.astro` composes the hero, catalog, labeled terminal demonstration and principles. `src/pages/tools/[id].astro` generates the Clint and Relay documentation. Source content remains English.
- `src/styles/global.css` currently owns light page/control colors and shared Barlow Condensed headings. `src/layouts/Layout.astro` preloads Barlow and Source Sans 3 globally and declares a light browser theme color. Several component colors remain literal values, not root tokens.
- The terminal and copy controls already implement sample/format changes, keyboard tabs, success/check feedback and visible copy failures. These are working interactions to preserve, not redesign into new functionality.
- The latest existing built documentation contains Shiki `github-dark` blocks with generated inline colors. This is inspection of an existing artifact, **not a build performed by this design phase**. Changing root foreground variables alone will not retheme those spans.
- Both official logo variants already exist: `public/brand/logo.svg` and `public/brand/logo-white.svg`. Current navbar, catalog symbol, footer and documentation home link request the black variant.

### Reference observations, not copied assets

Both references were inspected in the browser on 2026-11-04. Entire's opening uses charcoal surfaces, light text and medium-weight sans-serif headings; its first heading computed at 48px/500. Codex's observed opening uses a lavender-blue atmospheric field, black text, ample space and medium-weight headings; its first heading computed near 59px/500, while the document body background computed black. These observations do not establish that every reference section is dark or describe their rendering engines.

Borrow restraint, spacing and hierarchy, **not** their brand marks, proprietary typefaces, layout inventory, claims, images or implementation. The accepted Fluidise painting remains the source of the mineral-blue accent; it does not impose an indigo cast on reading or page surfaces.

### Invariants

1. Preserve the hero's image bytes, source-bound contours, 300dvh native-scroll track, 100dvh sticky viewport, lettering geometry/font, ivory pigment material, layer ordering, scroll phases, reduced/static/failure states and GPU budgets. Its approved lighter painting is not a second UI theme and must not be darkened to match the page.
2. Preserve one semantic hero h1 and its aria-hidden coincident front face. Preserve the hero script and `ArchipelagoClouds.ts`; this is not another animation task. No overlay, new cloud pass or transition veil is added to the painting.
3. Preserve the labeled bottom dock, its native squircle geometry, destinations, current-section semantics and lifecycle: hidden while the hero fills the viewport, available again with catalog entry, normal on documentation pages, usable without JavaScript. Restyle its material, not its timing or position.
4. Preserve catalog order/data, filter labels and `aria-pressed` behavior; terminal labels/samples, true tabs and their arrow/Home/End behavior; exact commands/copy payloads, copy success/failure announcements, documentation anchors and repository links. Do not turn filter buttons into ARIA tabs merely for appearance.
5. Preserve official SVG geometry. Select the existing white asset on dark surfaces and existing black asset on light-filled surfaces, including a mineral-filled primary context if a mark is needed there; do not invert, trace or recolor a mark. Keep the favicon and social/banner assets unchanged; browser-tab appearance is not equivalent to page theme.
6. Preserve product copy and the explicit demonstration/not-live-execution distinction. Existing release, package-availability and performance statements are not reverified or strengthened by this redesign.

The current light palette, glacial/translucent dock material and non-hero typography are intentionally superseded **if this proposal is approved and implemented**. Existing navigation behavior, native 40px squircle support/fallback geometry and square technical panels remain deliberate continuity, not forgotten decisions.

## 1. One dark appearance, from the first response

Use fixed dark CSS values and `color-scheme: dark`; emit a matching early `<meta name="color-scheme" content="dark">` and browser `theme-color` matching the page ground. Do not use the invalid meta value `only dark`. There is no theme toggle, light stylesheet branch, theme preference storage, theme-hydration script or OS-based palette switch. The complete route must render dark before React hydrates.

`prefers-reduced-motion`, forced colors and reduced-transparency preferences remain accessibility accommodations, not additional brand themes. Never apply `forced-color-adjust: none` across the site. Existing hero forced-color and static fallbacks must remain effective.

The image-to-interface transition is a direct release from the existing painting into the charcoal catalog. Eliminate the current white seam by changing the surrounding surface, not by adding an animation or tinting the approved hero. Do not extend painted texture, fog, glass blur or decorative gradients into reading surfaces.

## 2. Approved palette and color roles

The user visually approved the palette in [the HTML companion](dark-design-system.html) and requested this synchronization on 2026-11-05. These exact colors and their limited uses replace the earlier indigo/lavender proposal; they are **not applied to the production site**. Role names are contracts; private CSS variable names and temporary migration aliases remain implementation choices. Do not maintain a parallel theme engine.

| Role             | Value     | Use                                                                                                               |
| ---------------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| Canvas           | `#151515` | Page, catalog, documentation reading ground and footer                                                            |
| Surface          | `#1D1D1D` | Installation bars, technical headers and quiet grouped controls                                                   |
| Raised surface   | `#272727` | Dock and restrained selected/hover-adjacent surfaces                                                              |
| Hover surface    | `#313131` | Lightest permitted ordinary-text ground for contrast checks                                                       |
| Divider          | `#808080` | Visible section/row separation; at least 3:1 against Canvas through Hover surface; not text or a control boundary |
| Control boundary | `#898989` | Meaningful input/button boundary; do not substitute Divider                                                       |
| Primary ink      | `#F2F2F2` | Text and strong labels; primary-action fill is a separate role                                                    |
| Secondary ink    | `#C2C2C2` | Descriptions, secondary links and supporting copy                                                                 |
| Quiet ink        | `#A2A2A2` | Small metadata that is still readable text                                                                        |
| Action           | `#DEDEDE` | Ordinary text links and selected-control labels; neutral, not the brand accent                                    |
| Action hover     | `#FFFFFF` | Ordinary text-link hover ink                                                                                      |
| Selected ground  | `#353535` | Pressed filters and selected tabs, with a visible selection marker                                                |
| Mineral accent   | `#AABAD9` | Primary-action fill, active marker and external keyboard-focus outline only                                       |
| Positive         | `#AECBB3` | Existing success/check feedback and status when its text already identifies success                               |
| Negative         | `#E7A3AE` | Copy failure and invalid sample output                                                                            |
| Warning          | `#E8C58E` | Existing warning semantics, if encountered; not a reason to add a new warning UI                                  |
| Code ground      | `#111111` | Terminal output and documentation code                                                                            |
| Code ink         | `#E6E6E6` | Plain commands, JSON samples and default code tokens                                                              |
| Code comments    | `#A3A3A3` | Comments, not faint body text                                                                                     |
| Selection ground | `#464646` | Text selection with Primary ink                                                                                   |

Keep all reading roles achromatic. Mineral accent is inspired by the approved hero’s sky and stone, not an exact-pixel extraction claim. Use it only for the filled primary action, the active-state marker and the external keyboard-focus outline. It must not tint page grounds, headings, ordinary links, selected-control labels, text selection or code syntax. Pastel Positive, Negative and Warning remain independent semantic colors, not alternate brand accents. The separately approved hero pigments and fallback colors remain unchanged.

Use Canvas ink inside the mineral-filled primary action. On hover, retain that fill and dark ink and add an underline, as in the accepted specimen; do not inherit ordinary-link hover ink or introduce another accent family. Pressed filters, selected tabs and current navigation keep neutral labels and grounds; their visible marker uses Mineral accent. Ordinary links use Action, with Action hover for hover ink.

### Contrast evidence and application constraints

The following ratios were recalculated from the synchronized opaque values using standard relative sRGB luminance and `(Llighter + .05) / (Ldarker + .05)`. They match the HTML companion’s reference table.

| Pair                             | Calculated ratio | Intended threshold |
| -------------------------------- | ---------------: | -----------------: |
| Primary ink / Hover surface      |          11.62:1 |              4.5:1 |
| Secondary ink / Hover surface    |           7.30:1 |              4.5:1 |
| Quiet ink / Hover surface        |           5.10:1 |              4.5:1 |
| Action / Hover surface           |           9.67:1 |              4.5:1 |
| Control boundary / Hover surface |           3.72:1 |                3:1 |
| Action / Selected ground         |           9.12:1 |              4.5:1 |
| Canvas / Mineral accent          |           9.33:1 |              4.5:1 |
| Primary ink / Selection ground   |           8.43:1 |              4.5:1 |
| Code ink / Code ground           |          15.13:1 |              4.5:1 |
| Code comments / Code ground      |           7.49:1 |              4.5:1 |
| Mineral accent / Selected ground |           6.27:1 |                3:1 |
| Mineral accent / Hover surface   |           6.65:1 |                3:1 |
| Positive / Hover surface         |           7.43:1 |              4.5:1 |
| Negative / Hover surface         |           6.35:1 |              4.5:1 |
| Divider / Hover surface          |           3.29:1 |                3:1 |

Divider additionally measures **4.62:1 on Canvas, 4.27:1 on Surface and 3.78:1 on Raised surface**; its minimum across these four specified grounds is **3.29:1 on Hover surface**. Keep it opaque and 1px in the section/row specimens. It remains a separator, not a text color or a replacement for Control boundary.

These are token-pair calculations, **not rendered accessibility certification**. All ordinary/secondary/quiet text is at least 4.5:1 on its specified ground; meaningful boundaries, active indicators and focus indicators need at least 3:1 against their actual adjacent surfaces. Do not dilute text or dividers with parent opacity or place Quiet ink on an unlisted lighter ground. Disabled controls may use inactive styling, but that exception must never leak into read-only content or metadata.

Use the existing 3px focus outline and 4px offset, now Mineral accent against the dark surrounding surface, including filled primary actions. Retain a non-color selected marker (for example an underline/inset line) for pressed filters, selected tabs and current navigation. Documentation prose links remain underlined and neutral; keyboard focus supplies the blue outline, not a blue reading color. Preserve copy check icons, literal error messages and accessible state/announcement semantics.

## 3. Typography: an expressive name, a quiet interface

### Selected families

- **Hero only:** retain the existing Barlow Condensed 700 file, fallback family, numeric title geometry and material exactly. It must not inherit the new UI heading family through `--font-heading`. Separate the hero's family binding in its CSS scope while retaining its effective current value; no hero script or markup rewrite is necessary.
- **All non-hero headings, prose and UI:** **Instrument Sans**, normal variable 400–700, width axis fixed at 100. Use 400 for reading, 500 for headings/controls and 600 for strong emphasis. Supply a real italic face for prose emphasis rather than synthesizing one. Do not use condensed width variants, all-caps headings or monospace as a general interface style.
- **Commands and code:** retain the current native monospace stack. A second new code webfont adds loading and licensing work without solving the observed continuity problem. The considered IBM Plex Mono family is not selected; typography reconsideration does not require replacing a functioning code medium.

Instrument Sans's [official source](https://github.com/Instrument/instrument-sans), [Google Fonts metadata](https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentsans/METADATA.pb) and [OFL 1.1 license](https://raw.githubusercontent.com/Instrument/instrument-sans/master/OFL.txt) were checked on 2026-11-04. Metadata declares normal/italic sources, weight 400–700, width 75–100 and Latin/Latin-extended coverage. This establishes a licensed source, **not downloaded/validated webfont binaries**. Never copy Entire Headline or OpenAI Sans.

### Role scale

The root remains 16px at the browser default; sizes are rem-based/fluid and respect user text settings. The hero display role is excluded from this replacement.

| Role                         | Proposed size                      | Weight / leading / tracking |
| ---------------------------- | ---------------------------------- | --------------------------- |
| Documentation page h1        | `clamp(2.5rem, 5.2vw, 4.5rem)`     | 500 / 1.08 / -.035em        |
| Section h2                   | `clamp(2rem, 3.4vw, 3rem)`         | 500 / 1.15 / -.025em        |
| Catalog tool h3              | `clamp(1.625rem, 2.6vw, 2.25rem)`  | 500 / 1.2 / -.02em          |
| Principle/prose h3           | 1.5rem                             | 500 / 1.3 / -.015em         |
| Reading prose                | 1.125rem                           | 400 / 1.75 / normal         |
| Interface/body copy          | 1.0625rem                          | 400 / 1.65 / normal         |
| Tool tagline / document lead | `clamp(1.125rem, 1.6vw, 1.375rem)` | 400 / 1.55 / normal         |
| Controls and labeled actions | .9375rem                           | 500 / 1.4 / normal          |
| Metadata/legal               | .875rem                            | 400 / 1.6 / normal          |
| Code                         | .875rem                            | native mono / 1.7 / normal  |

Retain actual product-name casing. Footer/home-link lettering can use Instrument Sans 500 as a small brand label; it must not reproduce the giant hero treatment. Use balanced wrapping for short headings, normal wrapping for reading, and `overflow-wrap` for long tool names/URLs. Do not shrink mobile reading text to fit. Commands and preformatted output scroll within their own bounded containers; normal prose never forces page-wide scrolling.

### Font delivery contract

In a later authorized implementation, obtain self-hosted WOFF2 normal/italic assets from the verified project/Google Fonts distribution, retain OFL and copyright notices, and record exact URLs, weights/axes, coverage, byte sizes and checksums in `public/fonts/README.md`. Proposed new names are `InstrumentSans-Variable-latin.woff2`, `InstrumentSans-Italic-Variable-latin.woff2` and `InstrumentSans-OFL.txt`. Validate coverage for actual English content, European names/diacritics and fallback behavior for the existing Unicode check/cross symbols.

Target at most **100kB combined compressed bytes for the two new faces**; this is a configured delivery budget, not a measured file-size claim. If verified files cannot meet it without losing required coverage, stop font delivery and surface the trade-off rather than installing a subsetting tool, dropping coverage or silently changing the selected family. Font acquisition and any conversion/tool installation remain implementation-stage permissions, not permissions granted here.

Use `font-display: swap` and a system sans fallback. Preload only the normal UI face and retain the hero's critical Barlow loading on the homepage; load italic when used. Remove obsolete Source Sans 3 preload/active family references only after checking all rendered owners and design sidecars. Existing font/license files may remain archived; deleting old assets is not required. No visitor request to a third-party font provider, npm font package or new JavaScript font loader is allowed.

## 4. Space, surfaces and component composition

Preserve page structure and navigation placement. The following is a proposed visual rhythm, not a new product information architecture:

- Full-bleed hero remains unbounded. The shared non-hero shell is capped at 1440px (currently 1600px), with gutters `clamp(20px, 4vw, 64px)`. Keep the documentation outer cap at 1120px and prose at 65–70ch; no new right reading rail or top navbar.
- Use a coherent 4/8/12/16/24/32/48/64/96px spacing vocabulary. Main non-hero sections receive approximately 96px vertical separation on desktop and 64px on narrow layouts; tightly related labels/actions stay within 8–16px.
- Keep catalog entries open, separated by fine dividers, not enclosed in identical cards. Retain the icon/content grid and installation beneath content, not a new right column. Keep `minmax(0,1fr)`, local command scrolling and the existing 900px/600px responsive structure. Let typography and whitespace establish hierarchy.
- Preserve the dock-safe catalog transition and shared safe-area/focus clearance; do not remove it because the former 75%-height composition is obsolete. Recheck its dimensions with the new font and wrapped controls. Fixed navigation can overlap moving page content during normal scrolling; it must not obscure the focused control or prevent reaching any content. Do not claim one spacer guarantees non-overlap at every scroll offset.
- The dock becomes **opaque matte Raised surface**, with a fine visible edge and the existing bounded width/placement and native squircle/fallback geometry. Remove its glacial backdrop blur and translucent white fill; use only its restrained offset lift shadow. Preserve labels and section markers. Reduced transparency remains safe because the normal material is already opaque.
- Controls keep their native squircle/fallback treatment and at least 44px target height; technical panels retain square corners. This material contrast links navigation affordances to the scene without inventing sculpted UI, texture on every surface or neon outlines.

| Owner/surface                   | Proposed treatment and preserved state behavior                                                                                                                                                                                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Catalog heading/filters         | Canvas, Primary ink heading; Surface controls with Control boundary, neutral Selected ground and labels, plus a visible Mineral accent marker. Keep original filter labels, result count and empty message.                                                                              |
| Tool row                        | Primary ink name, Secondary tagline/summary/features, Quiet status with literal status text. Ordinary documentation/repository links remain neutral Action; only an explicitly primary filled action uses Mineral accent with Canvas ink. No added availability claims.                  |
| Tool symbols and official marks | Existing white SVG on dark symbol/dock/footer/doc-home grounds. Tabler line icons inherit readable neutral ink rather than the blue accent by default. Existing black SVG is available for a light-filled primary context, without path changes.                                         |
| Installation/copy bar           | Surface ground, Code ink command, square containment; 44px copy affordance, readable hover/focus state, existing check/success announcement and visible Negative copy failure. No truncating or rewriting commands.                                                                      |
| Interactive terminal            | Surface header, Code ground command/output, Code ink text and Negative invalid sample. Preserve the visible demonstration label, existing JSON/Text tabs, keyboard behavior, sample toggle, exit-code label and copy payloads. No live-run feature or syntax-rendering library is added. |
| Documentation header            | Canvas-led header with spacing and fine section separation rather than a pale filled card. Existing status, tagline, repository action and install bar remain.                                                                                                                           |
| Documentation prose             | Primary/Secondary ink with 65–70ch measure, neutral underlined Action links and white hover ink, readable lists/quotes/tables/inline code, and local horizontal scrolling for code and wide tables. Mineral blue is reserved for the external focus outline, not reading text.           |
| Principles/footer               | Same Canvas family, not alternating bright bands; open columns/rows retained, fine dividers and readable small print. No marketing metrics, testimonials or extra page regions.                                                                                                          |

### Code color ownership

Use the existing Astro/Shiki build-time pipeline, not a second runtime highlighter. Configure **one dark theme** through `astro.config.mjs`; no dual light/dark theme or OS detection. Its default foreground/background and generated token colors must be aligned with this design, including comments that a global CSS foreground cannot correct.

The theme mapping is: default/functions and numbers/constants = Code ink, comments = Code comments, keywords/storage = neutral Action, strings = Positive, punctuation/operators = Secondary ink, invalid tokens = Negative; all on Code ground. Mineral accent is not a syntax-token color. Exact grammar scope grouping is an implementation detail. Unknown/uncolored scopes must inherit readable Code ink. Do not flatten all syntax with a blanket `span` color override. The terminal samples remain their existing plain-text rendering and must not be reparsed as HTML.

Astro's existing configuration accepts a custom theme registration for `markdown.shikiConfig.theme`; current official documentation was consulted. Implementation must verify the actual installed Astro/Shiki version and rendered output rather than treating documentation as runtime proof.

## 5. Ownership and future change boundary

The current synchronization changes **this document** and only approval/source-reference text in its existing HTML companion. The companion’s palette, CSS, scripts, controls and rendered component states remain unchanged. The following is a proposed boundary for a separately authorized implementation, not permission to start it:

- Modify `src/styles/global.css`: replace non-hero roles, state colors, typography and responsive rhythm coherently; protect the existing hero block except the effective-no-change family isolation described above. Fix hardcoded light/blue/error/selection values in their owning component rules rather than stacking dark overrides after them.
- Modify `src/layouts/Layout.astro`: early dark scheme/theme metadata and font loading. Keep semantic shell, SEO, canonical URLs and public links unchanged.
- Modify existing logo consumers only as needed to choose the white asset: `src/components/Navbar.astro`, `ToolCard.tsx`, `Footer.astro` and `src/pages/tools/[id].astro`. Navbar's lifecycle/visibility script is preserved byte-for-byte. Other component markup may change only for the declared visual state/structure needs; keep React state, semantics and payloads in `ToolGrid.tsx`, `CopyCommand.tsx` and `InteractiveTerminal.tsx` unchanged.
- Modify `astro.config.mjs` only for the existing build-time Shiki theme. No framework, routing, dependency, lockfile, hydration, content-schema or pipeline change.
- Create the selected Instrument font/notice files under `public/fonts/` after acquisition approval, and update `public/fonts/README.md`. No image or official logo regeneration and no legacy asset deletion.
- Update or add focused visual/semantic contract tests under the existing component test conventions; retain and run the current hero/navbar lifecycle suites rather than deleting assertions to make a redesign pass.
- After the implemented result is verified, update `DESIGN.md`, `.impeccable/design.json` and the affected existing surface briefs to describe **that actual result**, preserving prior hero authority/history. Keep this specification's review/approval state accurate; do not create separate draft/final design copies.

Private selector names, font-loading helper shape and temporary CSS aliases remain implementation decisions. No theme service, token build framework, global animation controller, new dependency or UI abstraction layer is justified.

## 6. Migration, verification and rollback

### Safe realization order, if later authorized

1. Recheck the actual worktree, dirty files, current sources and approvals. Capture the current **working** hero/UI files and licensed assets, not just HEAD. This task started from detached HEAD `8705578efb69318d0b7dccab6097f84f3554c85b` with substantial approved, uncommitted hero work; HEAD is not a safe rollback image for it.
2. Prepare the approved font assets/notice manifest; isolate the hero family; replace shared non-hero tokens/fonts and native dark metadata together across all three routes. Then retheme component-specific literals, white-logo consumers and build-time code highlighting. Avoid a releasable intermediate hybrid of dark grounds and old blue/light foregrounds. Keep existing sources buildable; run targeted checks between coherent changes.
3. Verify the cases below, then synchronize current design metadata. A failed check leaves implementation unfinished; font-size or palette budgets do not override content, accessibility or hero preservation. Publication is still a separate request.

Rollback restores only the new design-system hunks/new assets from that captured working baseline. Never run a blanket reset or restore the shared stylesheet/components from HEAD: that would erase the uncommitted hero and other accepted work. No remote rollback/deployment is part of this plan.

### Acceptance evidence required of implementation

- **Visual consistency:** homepage catalog, terminal, principles/footer and both documentation pages use the same proposed roles and Instrument hierarchy. No light panels, old glacial-blue controls, unreadable black logos or unintentional native-light fields remain. Verify the blue accent is limited to primary fills, active markers and external focus; ordinary reading and links stay neutral, while code follows the declared syntax mapping without Mineral accent. Divider must meet its documented contrast on each actual ground. Inspect 1280x720, 390x844, 844x390 and the 320px minimum; headings, filter wrapping and code must not cause page overflow.
- **Hero preservation:** compare exact image/mask/script/renderer identities and matching-viewport rendered top/scroll/fallback states with the working baseline. Check Barlow remains the computed font on both hero faces after the global heading-family change. Re-run actual browser scroll/reverse, reduced-motion/static paths, GPU loss/failure and the compiled lifecycle tests. A source hash does not prove CSS-inheritance safety.
- **Behavior/states:** keyboard-only catalog filters and terminal tabs, Home/End/arrows, sample toggle, copy success/failure/manual selection, existing empty-result state, in-page anchors/deep-link reload and documentation return links all remain. Tab order never enters the hidden dock; visible focus is not obscured by it. No new loading blank/reveal hides SSR content before hydration.
- **Single-dark contract:** inspect initial HTML/native scheme with OS light and dark preferences and with JavaScript unavailable. No toggle, stored theme state, external font request or white flash introduced by theme bootstrapping. Real forced-colors, reduced-transparency and reduced-motion checks are required where a browser supports them; unsupported emulation must be reported, not called a pass.
- **Legibility:** measure rendered text/control/focus and all generated syntax colors, not only this token table. Check normal/hover/selected/disabled/error/focus states and text selection. Test 200% text/zoom and long content, real italic emphasis, blocked/missing fonts and Unicode fallbacks. Do not certify WCAG conformance from screenshots or opaque-token math alone.
- **Cost and project checks:** record actual new compressed font bytes against the 100kB budget, loaded face/request counts and font failure behavior. No additional JavaScript renderer or ambient loop is allowed; no measured FPS/Core Web Vitals claim is required. Run `bun run check`, `bun run build`, `bun run lint`, `bun run test`, `bun run format:check`, `node src/components/Hero.test.mjs`, `node src/components/Navbar.test.mjs` and `git diff --check` using approved installed tooling. Inspect commands before any dependency acquisition; missing tooling is a disclosed blocked check, not permission to install.

## Source and documentation binding

The selected sources were inspected on 2026-11-04 in `/Users/acrazie/.codex/worktrees/08d0/site`; all 15 SHA-256 identities were rechecked unchanged during the documentary synchronization on 2026-11-05. These identities bind source contracts, not an implementation verdict:

| Source                                   | SHA-256                                                            |
| ---------------------------------------- | ------------------------------------------------------------------ |
| `PRODUCT.md`                             | `908d76a2ef73a9c13586c70d36dec523b943ea4ea79e01ea053a344169efc243` |
| `DESIGN.md`                              | `b92f816217ed1bcfdca034c3598382ae85958f31c4c3797452fa234d848ca498` |
| `docs/specs/alpine-canvas-hero.md`       | `45a5f3de9be1b5c89b8a326df75e4517446e777cc22aa0ada595296c4630e4ee` |
| `src/styles/global.css`                  | `518df85dbd1790445a2c0efdbbfe9ac3848906548b0a4ecb91a7aaa18f07177d` |
| `src/components/Hero.astro`              | `98f63654c15cf5de95560b7cce39862038b69723557d0c03072b1757cfa9a058` |
| `src/components/ArchipelagoClouds.ts`    | `5330f8994401f76f8ee653144c3861b6f2a68ccccdc168ea17e02b55116552f1` |
| `src/components/Navbar.astro`            | `70e68869e1630cfa14c91e74e7c16d25413ffb4b1ffdafb59454c024fb0d3d5d` |
| `src/layouts/Layout.astro`               | `bad70f4ffbd56932725b828fe45ccb6b8732be525f1b3e5df2d63b7f60378cb6` |
| `src/pages/tools/[id].astro`             | `66c53d626ea1ea9e9cc0393bc9cb508d1e3ac2925686db3b6b63a83a829b53a1` |
| `src/components/ToolGrid.tsx`            | `276558315c9102cb874383462b121885a670d1b81117a1ba700154d56ae9f09a` |
| `src/components/ToolCard.tsx`            | `ae9f0374982c919b78b3943146785401134e5ae0986a329ed87ddab1244a5847` |
| `src/components/InteractiveTerminal.tsx` | `3aa0e44d831ef4522945ad389803f2eef36eb6e074981acdfa1f33a94ba3165f` |
| `src/components/CopyCommand.tsx`         | `e8839be8bcdef7b000c3a166b276fe3b94835ace6ab75ca35241f447d6725218` |
| `astro.config.mjs`                       | `a5863697d7cc2f640e37a9cf38d53257e83c133003ba18c1d7ac4c1a9e758357` |
| `public/fonts/README.md`                 | `e3e82c441ebc05f4c7a125bbe900fd6d365064c97936ef6cc20c1cc8b5e702f3` |

Current browser-native theme guidance was fetched through Context7 from [MDN color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme) and [meta color-scheme](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/color-scheme); build-time highlighting from [Astro syntax highlighting](https://docs.astro.build/en/guides/syntax-highlighting/). These are documentation evidence, not compatibility/performance tests of a changed application. Font sources and visual references are linked at their relevant decisions above.

<!-- egm-review-state:start -->

## Review and human approval

- Status: **human-approved design on 2026-11-05**. Full independent design review is complete and its single wording Nit is independently resolved for the pre-format body identified below. The current formatting-only successor is tracked separately in this section; no production implementation is authorized.
- Digest domain: SHA-256 of the UTF-8 file bytes after removing exactly the inclusive review-state span. Locate the unique standalone opening and closing HTML comment marker lines around this section; remove bytes from the opening line's first `<` through the closing line's final `>`, retaining the newline after the closing marker. Perform no other whitespace/content normalization. Source identities above remain part of the digest.
- Current substantive body SHA-256: `5ec04925c72a5911d863844e4b0210d4d0bbd875e5a3051fa7148697648459d0`.
- Full review, 2026-11-05: a fresh-context read-only design critic reviewed substantive body `e4029c943e3a390ba7686a40adaa30eebc9b5674e700db22737d1195ac358c3d`, full Markdown `ec7769e741641707deb9cd45d46bcbf5df684173e0be99217b36f1e505f953c4` and companion HTML `ebccef741f5e0abb7b35e11046f4fcc587fa0f0e4c1f4ec1c87a6488b60b12e5`. It read the persona, all three supplied standards, the entire target/companion, all 19 selected source files and the current hero contract at lines 1–85. It verified the 17-entry temporary source manifest before and after review, all 15 declared source identities, all 20 colors and all 15 contrast ratios.
- Full-review result: zero Blockers, zero Majors, one Nit; architecture and contracts were considered sufficiently defined for final human design approval. The Nit concerned the visual-acceptance wording about neutral code, which could be misread as forbidding the separately specified colored string tokens. It did not require a new palette decision.
- Authorized correction: the user accepted correction of that phrase and recording of the verdict. The only substantive change after full review clarifies that ordinary reading/links remain neutral while code follows its declared syntax mapping without Mineral accent. No palette, mapping, implementation boundary or production file changed.
- Targeted revalidation, 2026-11-05: a separate fresh-context read-only critic confirmed current body `dd8905c0eb06015135ed87d90a458c67aa0d727a48f7d212ef9a8817e5396691`, read the persona, three standards and entire target, and inspected the relevant companion CSS/JSON and source-reference text. It independently verified exactly the authorized wording replacement outside review metadata, consistency with the unchanged mapping/specimen, only two Markdown-reference hashes changed in the companion, 15/15 declared source matches and 21/21 protected-file matches. It scored the Nit resolved with no new issue in the affected regression scope. This is not another full review; no further review or retry is authorized without a new mandate.
- Historical final recording, before delivery formatting: only this excluded review-state section and the companion's approval/source-reference text changed after targeted completion. The reviewed substantive body and companion palette, CSS, scripts and controls remain unchanged. No open Blocker, Major or Nit remains from the full review and this targeted resolution; this is a design-review result, not production validation.
- Historical coverage: the initial design review and revision-binding revalidation concerned earlier body `7f863dcf09c7bb97172054c978d7e38fc58ba5da0635393b205892689d90d761`; they are historical, not the verdict recorded above. Reviews requested the inherited model in fresh conversation contexts; effective model identity and host-instruction exclusion were not independently verified.
- Evidence limits: the full review was documentary/source-only. It inspected no browser or screenshot, ran no build, compilation or test, acquired no fonts and performed no runtime, WCAG-conformance, Shiki-output, physical/OS, browser-compatibility or measured font-budget validation. Context7 confirmed documented mechanisms, not this application's runtime behavior. The companion still uses a system fallback when Instrument Sans is absent.
- Human approval recorded: after accepting the palette, authorizing the wording correction and receiving the independent-review closure, the user explicitly approved the **complete design** on 2026-11-05. Approval binds substantive body `dd8905c0eb06015135ed87d90a458c67aa0d727a48f7d212ef9a8817e5396691` and its documented design contracts. It is not runtime validation or permission to acquire fonts, implement, ship or deploy.
- Approval precedence: this explicit full approval supersedes the earlier palette-only, proposed and pending lifecycle descriptions retained in the frozen substantive body. Recording it does not change any reviewed design contract.
- Authorized delivery formatting, 2026-11-05: the user approved repository-required formatting and source-reference resynchronization without changing the design. The pre-format approved substantive body is `dd8905c0eb06015135ed87d90a458c67aa0d727a48f7d212ef9a8817e5396691`; its current formatting-only successor is `5ec04925c72a5911d863844e4b0210d4d0bbd875e5a3051fa7148697648459d0`. Outside this excluded review-state section, every non-table line and every trimmed Markdown table cell is unchanged; only table padding/alignment changed. All 15 bound source files remain unchanged. The companion retains the same palette and behavior; formatting equivalence is checked separately. The recorded independent verdicts remain bound to their historical byte identities. This mechanical equivalence check is not a new independent review and does not authorize implementation or Git delivery.
- Remaining authorization: no design-approval decision remains for this exact body. Production implementation, font acquisition, Git shipping and deployment still require separate authorization. No implementation risk is accepted on the user's behalf.

<!-- egm-review-state:end -->
