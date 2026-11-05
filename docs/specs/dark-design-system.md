# Fluidise Nocturne — Site Redesign

## Mandate and document ownership

Design a coherent dark interface around the approved painterly suspended-archipelago hero, replacing the current light **Alpine Glass** interface rather than recoloring isolated widgets. The user requested a full design-system reconsideration and a single dark theme, supplied [Entire](https://entire.com/) and [Codex](https://openai.com/fr-FR/codex/) as references, and selected **option 1: preserve the approved hero and its lettering; rebuild the surrounding system**.

On 2026-11-05, the user selected a **new structural design**, not implementation of the previously approved theme alone. The scope is the existing homepage and the Clint/Relay documentation pages: information hierarchy, composition, wayfinding and English editorial copy. The user explicitly chose to **keep and reorganize the bottom dock**, rejecting its replacement with a top header, and authorized reorganizing and clarifying text without changing product promises, commands, statuses or data. After finding the first structural proposal too close to the existing site, the user chose a **task-led portal: start with the need, identify the tool, then installation and reference**. That choice supersedes the first structural proposal, which was reviewed but never human-approved. The approved hero and Nocturne visual system remain binding.

The current mandate authorizes primary-author edits to **this document only**, fresh independent read-only review of the task-led revision covering architecture, comprehension, UX/accessibility contracts and implementation readiness, and targeted independent revalidation of authorized documentary corrections. Unchanged approved visual-system contracts need no new visual-direction tournament. It does **not** authorize production implementation, font acquisition, installation, Git shipping, publication, deployment or edits to another repository. The HTML companion remains the approved **palette specimen**, not a mockup or approval of the new page structures; its historical source hashes are not references to this revised body.

This is the single canonical design. `DESIGN.md` and `.impeccable/design.json` continue to describe the implemented interface. The [hero contract](alpine-canvas-hero.md) remains its behavior/material owner. The prior complete design approval is reconstructable from this file at commit `df5bf7fc60c53760285049ffabce30c93685e8ac`, substantive SHA-256 `5ec04925c72a5911d863844e4b0210d4d0bbd875e5a3051fa7148697648459d0`. Section 4 now owns the task-led composition and navigation. It supersedes previous requirements to keep the homepage's full terminal section, package-first rows, inline row installation, all copy/filter labels, every old dock destination in the dock, the absence of a reading rail and the navbar script byte-for-byte. A single new editorial task label is proposed in the existing content model; existing factual data, command and sample bytes remain unchanged. The palette, typography, hero and interaction safeguards are not reopened. Prior approval/review does not approve or validate this new revision; final human approval is pending.

### Outcome

After implementation, the homepage below the hero and both tool-documentation routes should look like one deliberate product: neutral charcoal surfaces, untinted white/gray reading, a restrained mineral-blue priority/focus accent, discreet pastel semantic feedback, readable technical content, and typography that supports rather than repeats the monumental brand title. Tool discovery, installation, reading and copy feedback must remain easier to recognize than decorative effects.

The reader is a developer or maintainer with a job to perform, not someone who already knows Fluidise's package names. The homepage below the painting is a **Read/discovery** surface; tool pages combine **getting started and reference**. Success means identifying a tool from the need, reaching its existing install command without searching a long article, then reading the relevant operating contract. Existing maintainers can bypass discovery through the installation desk or direct tool/hash URLs. No suite adoption, gated wizard, new routes, docs platform, search, release feed or marketing claims are needed for a two-tool catalog.

**Creative direction: Nocturne.** The painting is the expressive event; the interface is the calm instrument beneath it. Use matte surfaces and generous editorial rhythm, not a terminal wallpaper or a grid of interchangeable marketing cards.

### Palette supersession and approval (2026-11-05)

The user retained Neutral Charcoal foundations, rejected the lavender/indigo UI direction and the Warm Charcoal alternative, accepted achromatic Reading and ordinary Interaction roles, then selected mineral blue `#AABAD9` for primary-action fill, the active marker and keyboard focus only. Pastel semantic colors remain unchanged. The user also accepted the stronger Divider `#808080` and then requested synchronization with the HTML companion. These decisions supersede the earlier color table and its broader accent use, not the approved hero.

The initial visual approval covered the palette and these limited usages as seen in the HTML study; the complete prior specification was subsequently approved as recorded in the historical review state. The companion uses system sans when Instrument Sans is unavailable; it is not evidence of the selected webfont’s appearance, licensing payload or delivery budget. Neither approval establishes runtime/accessibility behavior or approves the new structural proposal.

## Evidence and preserved contracts

### Observed baseline

- `src/pages/index.astro` composes the hero, catalog, labeled terminal demonstration and principles. `src/pages/tools/[id].astro` generates the Clint and Relay documentation. Source content remains English.
- `src/styles/global.css` currently owns light page/control colors and shared Barlow Condensed headings. `src/layouts/Layout.astro` preloads Barlow and Source Sans 3 globally and declares a light browser theme color. Several component colors remain literal values, not root tokens.
- The terminal and copy controls already implement sample/format changes, keyboard tabs, success/check feedback and visible copy failures. These are working interactions to preserve, not redesign into new functionality.
- Historical inspection of built documentation found Shiki `github-dark` blocks with generated inline colors. The current `astro.config.mjs` has no explicit Markdown/Shiki theme declaration; the historical output does not establish an explicit repository setting. No current build was performed in this design phase. Changing root foreground variables alone will not retheme generated spans.
- Both official logo variants already exist: `public/brand/logo.svg` and `public/brand/logo-white.svg`. Current navbar, catalog symbol, footer and documentation home link request the black variant.
- The current dock links to Tools, Philosophy, external core Specifications and GitHub; only the first two are observed local sections. The demo has a heading but no section anchor. On documentation routes the navbar currently marks Tools as current even though its target is on the homepage.
- The catalog contains two entries in content-defined order. Its filters operate on `all`, `released` and `in-progress`; the schema also admits `scoping`, which the existing `in-progress` predicate does not include. This proposal preserves that predicate rather than silently changing the status model.
- Both documentation pages are generated by one Astro template. A duplicated guarantees list precedes their Markdown. Clint already reads Overview, Installation, Quick Start, Configuration; Relay places Installation after Key Capabilities. There is no local contents navigation or sibling-tool link. The shared footer already exposes both tools and the core/source repositories.

### Reference observations, not copied assets

Both references were inspected in the browser on 2026-11-04. Entire's opening uses charcoal surfaces, light text and medium-weight sans-serif headings; its first heading computed at 48px/500. Codex's observed opening uses a lavender-blue atmospheric field, black text, ample space and medium-weight headings; its first heading computed near 59px/500, while the document body background computed black. These observations do not establish that every reference section is dark or describe their rendering engines.

Borrow restraint, spacing and hierarchy, **not** their brand marks, proprietary typefaces, layout inventory, claims, images or implementation. The accepted Fluidise painting remains the source of the mineral-blue accent; it does not impose an indigo cast on reading or page surfaces.

### Invariants

1. Preserve the hero's image bytes, source-bound contours, 300dvh native-scroll track, 100dvh sticky viewport, lettering geometry/font, ivory pigment material, layer ordering, scroll phases, reduced/static/failure states and GPU budgets. Its approved lighter painting is not a second UI theme and must not be darkened to match the page.
2. Preserve one semantic hero h1 and its aria-hidden coincident front face. Preserve the hero script and `ArchipelagoClouds.ts`; this is not another animation task. No overlay, new cloud pass or transition veil is added to the painting.
3. Preserve the labeled bottom dock, its native squircle geometry and homepage visibility lifecycle: hidden while the hero fills the viewport, available again with the task gateway at the existing catalog boundary, visible on tool pages, usable without JavaScript. Its four destinations and route-correct current-section behavior are specified in section 4. No top header or hamburger navigation replaces it.
4. Preserve content-defined tool order, all existing factual data and the filter predicates with `aria-pressed` behavior; terminal samples, true tabs and their arrow/Home/End behavior; exact commands/copy payloads, copy success/failure announcements, preexisting heading anchors and repository links. Features and the full demonstration may move to their responsible tool page rather than being repeated on the homepage. Only the declared editorial label addition, UI labels, organization and hydration relocation change. Do not turn filters into ARIA tabs or task choices into mutually exclusive views.
5. Preserve official SVG geometry. Select the existing white asset on dark surfaces and existing black asset on light-filled surfaces, including a mineral-filled primary context if a mark is needed there; do not invert, trace or recolor a mark. Keep the favicon and social/banner assets unchanged; browser-tab appearance is not equivalent to page theme.
6. English copy may be clarified and moved, but no factual promise, command, version, status value, supported platform or product data may be invented, strengthened or silently corrected. Preserve the explicit demonstration/not-live-execution distinction and all command/sample bytes. Existing release, package-availability and performance statements are not reverified by this redesign.

The current light palette, glacial/translucent dock material and non-hero typography are intentionally superseded upon implementation of the approved visual system. The new composition and navigation changes below still require approval. Native 40px squircle support/fallback geometry and square technical panels remain deliberate continuity, not forgotten decisions.

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

## 4. Task-led architecture and composition

### What changes beyond the theme

The current site introduces package names, repeats long feature lists, then offers a suite-wide Clint terminal before the principles. The superseded structural draft largely retained that model. **The new portal starts with the reader's job, separates choosing from installing, and puts detailed exploration beside the responsible tool.** This is not the old row grid with different headings.

- **Homepage:** approved hero; two task-oriented entry lanes; a separate installation desk; a concise shared-contract region with a pointer to the Clint example; resource footer. No full interactive terminal or repeated per-tool feature lists on the homepage.
- **Tool page:** task context and exact tool identity; immediately visible getting-started panel; reference reading with local contents; tool-specific example when one exists; full guarantees and optional exploration of the other tool.
- **Persistent wayfinding:** bottom dock exposes discovery, installation, principles and source. Tool-specific docs are entered directly from their task or install row, not through another hub page.

Keep `/`, `/tools/clint` and `/tools/relay` and their canonical metadata. Preserve existing `#tools`, `#tools-heading`, `#tool-clint`, `#tool-relay`, `#demo-heading`, `#philosophy`, `#philosophy-heading`, `#main-content` and every existing tool-page heading ID. New sections add anchors without renaming these targets. There is no route migration, redirect, new task route, mandatory quiz or interaction gate. The task-led route wins over a documentation-first directory because first-time readers need not know a package name; it wins over a narrative-first funnel because known tasks should lead directly to action.

### Page composition, not a pixel-approved mockup

These schematics define information and source order. They are not screenshots, font validation or approval of a measured final viewport.

```text
HOME — below the unchanged full-screen hero
Start with the job.                           [quiet status filters]
Validate commit messages     | Manage Git hooks
fluidise-clint + source status| fluidise-relay + source status
short purpose                | short purpose
Get started / Install command| Get started / Install command
------------------------------------------------------------------
Install a tool.              | exact commands, one row per tool
Homebrew tap                 | existing tap-copy control
------------------------------------------------------------------
The contract behind the tools| three concise principles + core docs
Clint output example         | link to the example on its tool page
------------------------------------------------------------------
Tools / Project resources    | compact brand and legal attribution
                 [Explore / Install / Principles / GitHub dock]
```

```text
TOOL PAGE
Fluidise home / Tools / current tool
Task context + exact tool h1 | Get started: status, existing command,
purpose and source link      | install-options link
------------------------------------------------------------------
Reference contents           | Overview
(sticky left rail when safe) | Installation
                             | Quick Start / Configuration (Clint)
                             | Key Capabilities (Relay)
                             | Example output (Clint only)
                             | Operational guarantees
------------------------------------------------------------------
Explore the other tool / return to Tools / shared footer and dock
```

On narrow screens each paired region becomes source-ordered vertical content: task lanes in content-defined order; installation rows; principles; footer. On tool pages, masthead and getting-started panel precede inline reference contents and the article. Do not visually reorder controls against DOM/keyboard order. A mobile reader sees the useful starting action without opening a drawer or completing an onboarding step.

### Visual grammar and layout

The approved painting remains the expressive event. Below it, the portal is a matte technical field guide: large task statements, compact product identity, a distinct square command desk and calm reference reading. This intentionally replaces the current icon-heavy package rows and standalone terminal showcase.

- Full-bleed hero remains unbounded. Keep the 1440px non-hero shell, gutters `clamp(20px, 4vw, 64px)`, 1120px documentation outer cap and 65–70ch reading measure.
- Above 900px, the two task lanes share one open split composition with a single vertical Divider. They are not two rounded card containers. Each lane's task title uses the approved section-heading scale, while the exact package name/status uses a smaller identity role. The meaning of the need, not a large logo, leads the eye. Existing white marks remain small identity aids.
- At 900px and below, task lanes stack with a horizontal Divider. Installation rows and tool-page start panels stack at the same breakpoint. At 600px and below, use compact spacing without shrinking reading/code sizes. The two task choices remain visible in normal flow, never tabs, a carousel or a dropdown.
- Use 4/8/12/16/24/32/48/64/96px spacing; approximately 96px separates different jobs on wide screens and 64px on narrow screens. Use 8–16px inside related identity/action groups. Do not add a second hero or empty transition viewport after the painting. The first task title must be visible on arrival at 1280×720 and 390×844 with default text settings, subject to safe focus/dock clearance.
- Reserve Surface for command/start groupings and Raised surface for the dock. Ordinary text stays neutral on Canvas; no decorative gradients, tinted reading bands, blueprint grids, large background numerals or new textures. Square code/install surfaces contrast with native squircle controls/dock. Targets are at least 44px; code/long URLs use bounded local scrolling or wrapping, not page clipping.
- The dock is opaque matte Raised surface with a visible Control boundary and restrained lift. No backdrop blur, translucent white fill, ambient animation, scroll reveal or new global motion system is introduced. Mineral accent remains limited to primary fills, active markers and external focus; code and prose retain the approved mapping.

### One small content-model addition

The content collection remains the single tool catalog. Propose one **editorial** field, `taskTitle`, required and nonblank, consumed by both task entries and the tool-page context:

| Tool             | Proposed `taskTitle`       |
| ---------------- | -------------------------- |
| `fluidise-clint` | `Validate commit messages` |
| `fluidise-relay` | `Manage Git hooks`         |

These labels restate purposes already present in the existing taglines; they add no product capability or release assertion. This is an explicit proposed schema/content addition, not permission to rewrite existing factual metadata. Keep all existing frontmatter values byte-identical, and preserve content-defined `order`. A missing/blank task title must fail the normal collection validation at build time rather than create an unnamed interactive target. Do not create a second ID-to-label map, category taxonomy, task service or generic workflow engine.

### Homepage: need, action, contract

**Task gateway (`#tools`).** Heading **“Start with the job.”** retains `#tools-heading`. Each task lane retains its `#tool-{id}` target and shows the task title prominently, the exact product name and unchanged source status/version information, and a short purpose derived from existing copy. Do not repeat the full summary plus feature bullets here; every existing feature remains available in its tool's guarantees. The primary mineral-filled **“Get started”** link leads directly to `/tools/{id}`; neutral **“Install command”** leads to `/#install-{id}`. No choice is preselected and neither action requires JavaScript.

Keep existing filter predicates and initial `all` state with pressed-button semantics. Labels become `all` = **“All tools”**, `released` = **“Released”**, `in-progress` = **“In development”**. Place this quiet utility after the section title, not as the headline experience. Its `aria-controls` and announced count refer **only to task results**, not the separate installation desk. Preserve existing empty-result behavior; do not add a `scoping` predicate/category, search or sorting. Reaching a tool route or installation hash is never conditional on this local filter state.

**Installation desk (`#install`, new).** Heading **“Install a tool.”** introduces a square, open command-led region. Render one row from the same **unfiltered** ordered collection for each tool, with stable new `#install-clint`/`#install-relay` targets, exact name, unchanged status/version information, its existing Homebrew copy payload when supplied, **“Read docs”** and GitHub links. All tools remain present here even when a gateway filter hides a task lane; the section's separate identity and the filter's scoped count must make that distinction clear. This avoids broken installation deep links or an invisible tool after filtering.

Move the existing `brew tap Fluidise/homebrew-tap` control from below the terminal into a compact **“Homebrew tap”** note beneath these rows. The installation desk is an optional shortcut, not a prerequisite: task links can go directly to the tool page, and each install row can go directly to full documentation. Do not call tapping mandatory for fully qualified commands, imply an in-progress tool is released, or add a new package-manager selector. Missing source commands omit the copy bar but retain the tool/docs/source row; do not invent a command or availability claim. Preserve full selectable command text, copy feedback and manual fallback.

**Shared contract (`#philosophy`).** Heading **“The contract behind the tools”** retains `#philosophy-heading`. Present the existing three principles as a compact editorial band of short headings and their substantive explanation/highlight, not another set of product cards. Wide screens use three open columns; narrow screens stack them. Clarification may remove redundancy, not qualifications or product substance. A neutral **“Core specifications”** link retains the former dock URL `https://github.com/Fluidise/core/tree/main/docs`.

Inside this region, a short **“Clint output example”** pointer retains the existing `#demo-heading` target; its region may also expose `#demo`. It links to `/tools/clint#example-output` and explicitly identifies sample output, not execution. **The full terminal no longer lives on the homepage.** This gives the demonstration a responsible product context without removing the existing sample, controls or copy capability. No corresponding Relay demo or live-run promise is invented.

**Footer.** Keep a compact brand and two resource groups, **“Tools”** and **“Project”**. Retain both tool pages, Homebrew tap, core repository, core specifications, product contract, brand guide, GitHub organization and site repository. Preserve legal attribution/license content. No second giant wordmark, newsletter, products, customers or metrics are added.

### Dock: discovery and installation, not a showcase shortcut

Keep the same four ordered, visibly labeled links on every route:

| Label      | Destination                   | Role                                                  |
| ---------- | ----------------------------- | ----------------------------------------------------- |
| Explore    | `/#tools`                     | Choose by need or return to the task gateway          |
| Install    | `/#install`                   | Reach existing per-tool command shortcuts             |
| Principles | `/#philosophy`                | Read the shared contract and find core specifications |
| GitHub     | `https://github.com/Fluidise` | Existing organization/source destination              |

The fixed dock's position, bounded width, safe-area treatment, native squircle/fallback geometry and hero hide/reappear boundary remain unchanged. Keep visible labels at 320px, readable neutral icons and the existing white official mark for Explore. No icon-only compact mode, hamburger, overflow menu or contextual label swapping is introduced. Recalculate shared clearance for actual new labels/font/wrapping rather than assuming 116px still suffices. Catalog-arrival space, footer end space, focused controls and anchor targets must clear the dock and its outline, including at 200% text/zoom; failure means implementation is incomplete, not permission to truncate labels or hide content.

On the homepage, observe `tools`, `install` and `philosophy` and mark at most one matching link with `aria-current="location"`, a non-color marker and neutral selected ink. Direct reloads of their hashes must initialize correctly. New `#install-{id}` targets establish Install context. With no hash, Explore is the initial local context; unknown hashes do not fabricate a destination. Scrolling, clicks, native Back/Forward and restored deep links must converge on actual visible section context, including when two sections intersect. Preserve one-owner event/observer cleanup, optional-observer fallbacks and bounded scheduling; no hero renderer or scroll geometry rewrite is authorized.

On tool pages, no global dock link receives `aria-current`: all local dock destinations are on the homepage. The current tool breadcrumb/title supplies orientation. The dock remains visible. No-JavaScript output uses native links and no false current marker; no router or global navigation service is needed.

### Tool pages: start now, read deeply when needed

Both routes share one template; the new task context and optional existing Clint example do not create separate page systems.

1. **Orientation and purpose.** Compact Fluidise home mark and **Tools / current tool** breadcrumb; direct `/#tools` return; task label as context; exact product name as the single page h1; concise existing purpose and repository link. Use the existing source status/version, not a newly certified “Stable” or “verified” badge.
2. **Getting-started panel (`#get-started`, new).** Beside the masthead above 900px and directly after it below 900px, show the existing quick-install copy payload with source status/version context and a neutral **“All installation options”** link to the preserved `#installation`. This relocates the existing header copy bar, not a new command feature. A missing source command leaves the installation-options action without an invented bar. No terminal or long feature list precedes the starting action.
3. **Reference reading.** After the masthead/start region, show **“Reference contents”** and a calm article. Above 900px, contents occupies a roughly 12rem left rail beside 65–70ch prose; it may stick only when viewport height leaves usable space above the dock. In short landscape it stays in flow. At 900px and below it is an ordinary visible list before the article, not a drawer/accordion. Keep Clint's Markdown order **Overview, Installation, Quick Start, Configuration**; move Relay's intact Installation before Key Capabilities, giving **Overview, Installation, Key Capabilities**.
4. **Tool-specific example.** On Clint only, after its Markdown and before guarantees, mount the existing complete `InteractiveTerminal` in a section `#example-output` with a visible sample/not-live label. Keep exact commands/output, timing string as sample data only, JSON/Text true tabs and arrow/Home/End behavior, valid/invalid toggle, exit-code labels and copy success/failure/manual fallback. Retain its square Code ground and Surface header. Relay gets no empty placeholder, invented sample or terminal assets rendered into its page.
5. **Guarantees and onward reading.** Move the existing frontmatter-derived list after Markdown/example, preserving `#guarantees-heading` and every feature. Finish with a quiet link to the other actual tool and back to Tools. Derive the sibling from the ordered collection, not another catalog; this is optional exploration, never required suite adoption.

Reference contents is generated at build time from `render(entry).headings`: h2 entries in rendered order with exact `slug`/`text`, followed by the actual Clint example heading when present and the actual guarantees heading. It covers the reference region, not the separate masthead/start panel. Omit contents when fewer than two reference targets exist. Preserve Markdown heading text, existing h3 targets and fenced blocks during relocation; check duplicate slugs against actual output rather than independently slugifying. Give global navigation, breadcrumb and reference navigation distinct accessible names. Use native anchors, escaped labels and the existing build-time content renderer; no scroll-spy, runtime Markdown parser or maintained second heading inventory.

### Hydration, states and content integrity

- Reuse the catalog's existing `client:visible` island for task filtering and both task/installation regions. The installation desk reads the same source array independently of the gateway's filter. Native discovery/docs/install links and all initial content are server-rendered; no exclusive task selection, loading blank or reveal hides the second tool.
- Remove the terminal's homepage mount. Mount that same component **only on Clint**, using `client:visible` for its below-reference example. This is an explicit hydration relocation from the homepage's `client:idle`, not preservation of the old boundary. The homepage loses terminal content/JavaScript; Clint gains its existing terminal island. Verify actual route output and hydration behavior rather than claiming a measured performance gain. No additional demo owner, router, persistent state or new runtime dependency is added.
- Reuse `CopyCommand` and the terminal's existing handlers, timers/cleanup, announcements, check icons and visible failures. Denied clipboard access leaves full text selectable. Navigation has no promise to persist filter/sample state across ordinary page loads; do not add storage.
- Without JavaScript, both task choices, all installation rows, source/docs links, Markdown, reference contents and Clint's default sample remain readable, with manual copying. Interactive filter/sample changes and clipboard buttons need not become a second no-JavaScript app.
- Existing product fields, version/status values, URLs, sample bytes, command/configuration fences and operational qualifications remain unchanged. Only add the proposed editorial `taskTitle` field and move Relay's intact Installation section. No labels may recertify an existing unverified release, installation, configuration or performance statement. Raise consequential discovered factual conflicts; do not silently correct them during design/implementation of this visual change.
- Prose/code/table/focus/selection colors and syntax stay within the approved roles. Real wide content scrolls locally; sticky contents and the dock cannot trap keyboard navigation or obscure focused targets.

Astro's official [content rendering reference](https://docs.astro.build/en/reference/modules/astro-content/#render), [heading-ID guidance](https://docs.astro.build/en/guides/markdown-content/#heading-ids) and [client directives](https://docs.astro.build/en/reference/directives-reference/#clientvisible), fetched through Context7 on 2026-11-05, document generated heading metadata and server rendering followed by visible hydration. The index did not expose a pinned Astro 7 entry. Verify installed-version output and the conditional Clint mount at implementation; documentation is not runtime proof.

### Code color ownership

Use the existing Astro/Shiki build-time pipeline, not a second runtime highlighter. Configure **one dark theme** through `astro.config.mjs`; no dual light/dark theme or OS detection. Its default foreground/background and generated token colors must be aligned with this design, including comments that a global CSS foreground cannot correct.

The theme mapping is: default/functions and numbers/constants = Code ink, comments = Code comments, keywords/storage = neutral Action, strings = Positive, punctuation/operators = Secondary ink, invalid tokens = Negative; all on Code ground. Mineral accent is not a syntax-token color. Exact grammar scope grouping is an implementation detail. Unknown/uncolored scopes must inherit readable Code ink. Do not flatten all syntax with a blanket `span` color override. The terminal samples remain their existing plain-text rendering and must not be reparsed as HTML.

Astro's existing configuration accepts a custom theme registration for `markdown.shikiConfig.theme`; current official documentation was consulted. Implementation must verify the actual installed Astro/Shiki version and rendered output rather than treating documentation as runtime proof.

## 5. Ownership and future change boundary

This design phase changes **only this Markdown document**. The HTML companion, production sources, installed-design metadata and all assets remain unchanged. The following is the proposed boundary for a separately authorized implementation, not permission to start it:

- Modify `src/styles/global.css`: replace non-hero roles, state colors, typography and responsive rhythm coherently; protect the existing hero block except the effective-no-change family isolation described above. Fix hardcoded light/blue/error/selection values in their owning component rules rather than stacking dark overrides after them.
- Modify `src/layouts/Layout.astro`: early dark scheme/theme metadata and font loading. Keep the semantic shell, skip link, main landmark, SEO and canonical URLs. Do not add a top header or another site-navigation owner.
- Modify `src/pages/index.astro`, `src/components/ToolGrid.tsx` and `src/components/ToolCard.tsx`: replace package-first rows with the task gateway, render the separate unfiltered installation desk from the same source collection, scope filter counts to gateway results and relocate the tap control. Remove the homepage terminal mount. Keep collection sorting/predicates and the catalog owner's `client:visible` hydration; no second tool-data source or generic task engine.
- Modify `src/components/Navbar.astro`: Explore/Install/Principles/GitHub destinations, white mark, route-correct section/history logic including per-tool install hashes. Preserve hero visibility timing and cleanup/optional-observer fallbacks; no hero script/renderer edit. Extend existing navigation tests for the install section, deep links and documentation state rather than deleting lifecycle assertions.
- Modify `src/pages/tools/[id].astro`: shared task masthead/getting-started panel, build-time reference contents, conditional Clint-only terminal mount with `client:visible`, guarantees after reference/example and collection-derived sibling links. Keep static generation and route contracts. Template-local markup suffices; no navigation registry, docs framework or single-use service/interface.
- Modify `src/components/ManifestoSection.astro` and `src/components/Footer.astro`: compact contract band, example pointer retaining `#demo-heading`, concise resource groups, core specifications and every existing outgoing destination. Choose existing white logos in dark consumers; do not regenerate marks.
- Modify `src/components/InteractiveTerminal.tsx` only for its visual layout/editorial shell if needed; preserve sample bytes, format/sample state, tab mechanics, copy payloads and timer cleanup. `src/components/CopyCommand.tsx` is reused unchanged unless an evidenced accessibility defect in the approved composition requires a scoped follow-up; visual styling belongs in the stylesheet.
- Modify `src/content.config.ts`, the `ToolData` type in `src/components/ToolCard.tsx`, and `src/content/tools/clint.md`/`relay.md` only for the declared required nonblank `taskTitle` field. Preserve every existing factual frontmatter value. In Relay's body only, also move the intact Installation section before Key Capabilities. Do not alter heading text, command/configuration fences or claims, and do not broaden the schema/status model beyond this editorial addition.
- Modify `astro.config.mjs` only to configure the existing build-time Shiki pipeline's approved theme; no explicit current theme declaration is assumed. No framework, route, dependency, lockfile or pipeline change. The only hydration relocation is the declared terminal move to Clint; the only schema addition is the editorial task label.
- Create the selected Instrument font/notice files under `public/fonts/` after acquisition approval, and update `public/fonts/README.md`. No image or official logo regeneration and no legacy asset deletion.
- Update `src/components/Navbar.test.mjs` and add focused contract cases under existing `src/components/*.test.mjs` conventions for task metadata validation, separate gateway/install filtering, rendered structure/contents/links, terminal route placement and unchanged command/status/sample data. No test dependency is added. Retain and run `src/components/Hero.test.mjs` unchanged. Actual built-output assertions and browser interaction evidence must supplement source-text checks.
- After the implemented result is verified, update `DESIGN.md`, `.impeccable/design.json` and the affected existing surface briefs to describe **that actual result**, preserving prior hero authority/history. Also update only `PRODUCT.md`'s Operating Context sentence that currently places the interactive terminal on the homepage, recording its verified relocation to the Clint tool page without changing product promises or unrelated product context. Keep this specification's review/approval state accurate; do not create separate draft/final design copies.

No production files are deleted and no new routes are created. Private selector names, exact column proportions, font-loading helper shape and temporary CSS aliases remain implementation decisions. No theme service, token build framework, global animation controller, new dependency or UI abstraction layer is justified.

## 6. Migration, verification and rollback

### Safe realization order, if later authorized

1. Recheck worktree, dirty files, current sources and approval of this exact task-led revision. The source baseline is detached HEAD `df5bf7fc60c53760285049ffabce30c93685e8ac`; only this design has changed during the present session. The earlier visual-study phase used a different dirty checkout. Capture actual **working** hero/UI/content files and assets before implementation. Record routes, heading IDs, outgoing links, existing frontmatter, commands, sample payloads and status/version values; do not substitute a historical HEAD for the working baseline.
2. After separate acquisition approval, prepare the approved font assets/notice manifest; isolate the hero family; replace shared non-hero tokens/fonts and native dark metadata across all three routes. Retheme component literals, white-logo consumers and build-time syntax together. Keep sources buildable and do not release an intermediate dark/light hybrid.
3. Add the editorial `taskTitle` schema/type and both content values coherently so collection validation stays satisfied. Realize the task gateway and unfiltered installation desk with their anchors/dock links together. Move the tap control and Relay section without duplicate IDs or changed payloads. Build the shared tool-page start/reference structure, move the existing terminal mount from home to Clint only, and preserve the homepage example-heading target as a native pointer. Extend related contract/lifecycle tests as owners change. Use native links and build-time data; no new fetch, loading state or service.
4. Verify the cases below, then synchronize current installed-design metadata. A failed check leaves implementation unfinished; font-size or palette budgets do not override content, accessibility or hero preservation. Publication is still a separate request.

Rollback restores only redesign hunks/new font assets from that working baseline as one coherent change: task label schema/type/content together, original terminal mount, Relay section order and old dock links. Never run a blanket reset or restore shared files from a historical HEAD; that could erase unrelated/later accepted work. The content-schema addition is local/static, with no user-data migration, redirect or remote rollback/deployment.

### Acceptance evidence required of implementation

- **Visual consistency:** task-led split gateway, installation desk, contract/footer and both tool pages use the proposed roles and Instrument hierarchy. Clint's full terminal is in its tool page, not the homepage. No light panels, old blue controls, unreadable black logos or native-light fields remain. Blue stays limited to primary fills, active markers and external focus; prose/links stay neutral and code follows its mapping. Dividers meet contrast on actual grounds. Inspect 1280×720, 390×844, 844×390 and the 320px minimum; headings, wrapping and code do not cause page overflow. The two task lanes must not degrade into the old package-row grid or identical rounded cards.
- **Hero preservation:** compare exact image/mask/script/renderer identities and matching-viewport rendered top/scroll/fallback states with the working baseline. Check Barlow remains the computed font on both hero faces after the global heading-family change. Re-run actual browser scroll/reverse, reduced-motion/static paths, GPU loss/failure and the compiled lifecycle tests. A source hash does not prove CSS-inheritance safety.
- **Behavior/states:** keyboard-only catalog filters and terminal tabs, Home/End/arrows, sample toggle, copy success/failure/manual selection, existing empty-result state, in-page anchors/deep-link reload and documentation return links all remain. Tab order never enters the hidden dock; visible focus is not obscured by it. No new loading blank/reveal hides SSR content before hydration.
- **Task and install journey:** first task title appears on arrival at default text settings in 1280×720 and 390×844. Both visible task choices lead to their actual tool page and install row without selection state. Gateway filters/announced count affect only task results; all install targets remain present, including after filtering to an empty task result. Existing install-copy and tap payloads remain reachable on home, with the tap once in the installation desk. Test missing command and missing/blank editorial label separately: the former omits only its bar, the latter fails collection validation. No task label implies suite adoption or verified availability.
- **Tool-page structure:** both mastheads expose the correct task/tool identity and getting-started action before lengthy reading. Installation options and contents reach the preserved `#installation`; every reference target exists uniquely and the rendered contents order matches Markdown/example/guarantees. Only Clint contains the full terminal/default sample and terminal hydration boundary; home and Relay contain no terminal mount. The homepage pointer reaches Clint's example. No empty example placeholder or empty contents shell appears; contents is omitted below two actual reference targets. Guarantees remain complete and sibling links point to the actual other tool. Wide/narrow DOM, visual and keyboard order agree.
- **Navigation/compatibility:** test all dock links, `/#tools`, `/#install`, `/#install-clint`, `/#install-relay`, `/#philosophy`, the retained `/#demo-heading` pointer and `/tools/clint#example-output`, with direct/reloaded entry, Back/Forward and reverse scroll. At most one homepage marker is current; tool pages emit none. Test section-intersection ties, unknown hashes, optional observers, teardown/remount and late callbacks. Compare all preexisting heading IDs and outgoing URLs against baseline. The reference rail is static in short landscape and inline on mobile, with focus/scroll access above the dock.
- **Content integrity:** existing frontmatter values and command/configuration fences remain byte-identical, allowing only the declared `taskTitle` addition. Compare terminal sample/copy payloads, collection order/filter predicates, version/status and source URLs. Editorial shortening/relocation preserves qualifications and sample/not-live labels; every original feature remains in the responsible tool's guarantees. Existing claims are not validated by snapshots; raise consequential discovered factual conflict rather than silently correcting it.
- **Single-dark contract:** inspect initial HTML/native scheme with OS light and dark preferences and with JavaScript unavailable. No toggle, stored theme state, external font request or white flash introduced by theme bootstrapping. Real forced-colors, reduced-transparency and reduced-motion checks are required where a browser supports them; unsupported emulation must be reported, not called a pass.
- **Legibility:** measure rendered text/control/focus and all generated syntax colors, not only this token table. Check normal/hover/selected/disabled/error/focus states and text selection. Test 200% text/zoom and long content, real italic emphasis, blocked/missing fonts and Unicode fallbacks. Do not certify WCAG conformance from screenshots or opaque-token math alone.
- **Cost and project checks:** record actual new compressed font bytes against the 100kB budget, face/request counts and failure behavior. Verify delivered route HTML/modules reflect the terminal relocation and that its visible hydration preserves server-rendered default output and working controls after entry. Do not infer a performance gain from moving a component. No new renderer/ambient loop is allowed. Run `bun run check`, `bun run build`, `bun run lint`, `bun run test`, `bun run format:check`, `node src/components/Hero.test.mjs`, `node src/components/Navbar.test.mjs`, the added built-output contract cases and `git diff --check` with approved installed tooling. Missing tooling is a disclosed blocked check, not permission to install.

## Source and documentation binding

The original visual-system sources were inspected on 2026-11-04 and rechecked for documentary synchronization on 2026-11-05. For this structural redesign, source contracts were inspected again on 2026-11-05 in `/Users/acrazie/.codex/worktrees/35e0/site` at clean detached HEAD `df5bf7fc60c53760285049ffabce30c93685e8ac`; the original 15 identities match. The additional structural owners/content are bound below. These are source contracts, not an implementation verdict:

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
| `src/pages/index.astro`                  | `00540efe72a33fb2c9df83d26f18bb729a6b4ceec51b13013e3d4783e5da95bb` |
| `src/components/ManifestoSection.astro`  | `3db5ab081af23b795569e0ad898f20b4e6fbcb6e1091dd719894fe7e6fd1fcac` |
| `src/components/Footer.astro`            | `8dbd22ac488b1d6db21da494cd55b29c5dfc83873257da6b7040292d6287013d` |
| `src/content.config.ts`                  | `2c0b1f88de1fff3dea65fc169fcfc7ff35cec7aa11824df5b5d33f85a93218ef` |
| `src/content/tools/clint.md`             | `9ba104c6d805402515c20f02ea739eb4a2f5974426aa1750780777a8de568bc0` |
| `src/content/tools/relay.md`             | `0ad3cbd87d69a77a7be97207d890a324b360cb22041f084d869820998e7d12ad` |
| `src/components/Navbar.test.mjs`         | `02db7c17a3d1df22bae8e3f431590dc4464b5ced10478928b2c522f8267c9697` |
| `src/components/Hero.test.mjs`           | `51f0706d75bf12681ff265ec1770927c4d9d856e06570e4024af3e4fe48e31a4` |
| `package.json`                           | `1910c40921736da587c3f56dc7665639cffb82bce6bc47034db646c61035ef01` |

Current browser-native theme guidance was fetched through Context7 from [MDN color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme) and [meta color-scheme](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/color-scheme); build-time highlighting from [Astro syntax highlighting](https://docs.astro.build/en/guides/syntax-highlighting/). These are documentation evidence, not compatibility/performance tests of a changed application. Font sources and visual references are linked at their relevant decisions above.

<!-- egm-review-state:start -->

## Review and human approval

### Current task-led revision — 2026-11-05

- Status: **human-approved task-led design on 2026-11-05**, independently reviewed with no open findings. Approval binds the exact substantive revision identified below.
- Digest domain: SHA-256 of the UTF-8 file bytes after removing exactly the inclusive review-state span, from the opening marker's first `<` through the closing marker's final `>`, retaining the newline after the closing marker. No other normalization. Source identities and all structural/data/interaction contracts remain included.
- Current substantive body SHA-256: `224218d791dff7085754bd2e0c491f39848b2c36f71daec66909fa8acd4ecc68`, a repository-formatter-only successor of approved body `64c1ab204cd351a97272d9b500934f9411fe39cf2a49973a536208c4c9e99079`. Every non-table line and trimmed Markdown table cell remains identical; only table padding/alignment changed. This mechanical equivalence check is not another independent review and changes no design contract.
- Human decisions: keep the approved hero, Nocturne system and bottom dock; allow English editorial clarification without changing product promises/commands/status data; rebuild around the need, relevant tool, installation and reference. The earlier package-first structural proposal was not accepted and is superseded, not silently treated as approved.
- Completed full independent review: fresh-context read-only critic `/root/task_portal_design_review` read its persona, all three standards, the complete target, all supplied full source reads and current hero contract lines 1–85. It covered the new task/installation separation, metadata ownership/validation, content/anchor compatibility, dock lifecycle/current-state, terminal placement/hydration, tool-page start/reference model, accessibility/failure contracts and coherent migration/rollback/verification. It confirmed the structural change is substantive and ready for final human approval with zero Blockers, zero Majors and one Nit. Reviewed body `3da6d675a3aa9a8f9961c903544a15f61c0f776cda0334147f4817710c2d1401`, full file `c85cb6724148acc6b8fa4c5e4be6ae749de3572c386bccda91c37512665104c3`; all 24 source bindings and 89 protected file identities verified before/after. Hero component/renderer/test identities were hashed rather than fully reviewed.
- Finding/resolution: the sole Nit concerned stale future product context: `PRODUCT.md` currently places the terminal on the homepage. The primary author added only a narrow post-implementation Operating Context synchronization to the future write boundary. No production file changed. Fresh-context read-only critic `/root/task_portal_targeted_review` read its persona, all three standards, the complete corrected target, complete `PRODUCT.md`, bindings and original affected statements; it verified the exact single substantive correction, current body `64c1ab204cd351a97272d9b500934f9411fe39cf2a49973a536208c4c9e99079`, full file `f5af1cd3208373bf7f41822588a054767a43acf0597d26f6eb9b112199b09c69`, all 24 source bindings and all 89 protected files before/after. It resolved the Nit with zero new Blockers, Majors or Nits in the affected ownership/verification scope. This was targeted revalidation, not another full review. Combined with the full task-led review, no open finding remains on the current substantive body. This final recording changes only excluded review metadata; no implementation risk is accepted.
- Evidence limits: documentary/source-only work and schematic text wireframes, not pixel-approved mockups. No new browser render, build, compilation, project test suite, font acquisition, runtime accessibility/conformance or deployment. Context7 documents heading metadata and visible hydration, not installed Astro 7 compatibility. Local `node_modules` tooling is absent. The HTML companion is the prior approved palette specimen, not a current structural prototype.
- Isolation limit: native fresh conversation contexts are available; exclusion of host instruction files and effective model identity are not independently verified.
- Human approval recorded on 2026-11-05: after receiving the linked revised design, composition schematics and review closure, the user replied **“ok”** to the explicit request to approve this architecture and these compositions. This approves substantive body `64c1ab204cd351a97272d9b500934f9411fe39cf2a49973a536208c4c9e99079`. The approval supersedes pre-approval lifecycle wording retained in the unchanged body; no design contract or accepted-risk state is altered by recording it. It does not validate a rendered mockup, installed-version compatibility, runtime behavior or accessibility conformance.
- Implementation mandate received on 2026-11-05: the user explicitly said **“go implementer”**, leaving the EGM design-only workflow. In response to the separate acquisition question, the user explicitly approved both official Instrument Sans WOFF2 files and their OFL notice. Implementation is local and in progress; no Git shipping, publication or deployment is authorized. The approved body/source table remains the pre-implementation contract baseline, not a claim that current sources remain unchanged.
- Working baseline: captured the actual tracked working files, including the approved uncommitted specification, in a private scratch ZIP/identity manifest before source edits. Reused a private copy-on-write copy of already installed tooling from a checkout with identical package manifest and lockfile; no dependency installation, hook activation or lockfile edit. Current native/runtime evidence and finish review will be recorded below before delivery.

### Local implementation and delivery evidence — 2026-11-05

- State: **implemented locally; fresh visual/source finish review returned SHIP with no material fix**. The user-approved design contract is unchanged. Implementation is not a deployment, release, independent CLI capability audit or WCAG certification.
- Delivered owners: task-led split gateway with one required nonblank editorial label per existing collection entry; locally scoped filters and a separate unfiltered installation desk; preserved command/tap copying; revised dock/history/current-state logic; shared tool masthead/start/reference model and generated contents; Clint-only visible-hydrated example; complete guarantees, sibling/source links and compact contract/footer. No route, dependency, hook, pipeline or lockfile change.
- Typography/theme: one early dark native scheme, approved neutral roles and build-time Shiki mapping; genuine normal/italic Instrument Sans WOFF2 and OFL acquired after explicit approval. New faces total **61,692 bytes**, below 100,000 bytes; provenance, checksums and cmap/fallback limits are in `public/fonts/README.md`. Existing Barlow and archived faces remain unmodified. Visitors request no third-party font service.
- Baseline preservation: 15 protected source/asset/lock identities were independently compared against the captured working baseline, including hero component/renderer/test, both copy/terminal implementation files, painting/background/contours, official marks/favicon, Barlow, package/lockfile and hero contract. The main hero CSS is byte-identical except the approved effective-no-change Barlow family isolation; existing mobile and short-landscape geometry is retained. This proves source preservation, not browser-inheritance safety by itself.
- Project proof: `bun run check`, `bun run build` (all three routes), `bun run lint`, `bun run test` (8 tests), `node src/components/Hero.test.mjs` (8 compiled-owner scenario groups), `node src/components/Navbar.test.mjs` (4 groups) and `node src/components/Design.test.mjs` (3 built-output/schema/content/font groups) passed after the coherent source corrections. Build used existing Bun 1.4.3/Astro 7.4.2 tooling, privately copied from an installed checkout with identical package/lockfile; no dependency installation. Final `bun run format:check` and `git diff --check` also passed after installed-document synchronization.
- Native responsive evidence: `.impeccable/review/nocturne/metrics.json` records all 12 actual route/viewport cases at 1280×720, 390×844, 844×390 and 320×720 with `scrollWidth == clientWidth`. The first bounded pass found an inherited 320px minimum-body-width overflow with classic scrollbars; correcting its owning rule gives 309px client/scroll width at a 320px viewport. Visible singular count wording and desktop task-title alignment were corrected in the same batch. The second build-thread inspection pass confirmed the matrix; no open-ended polishing followed.
- Native behavior: gateway filters changed task results without removing either installation row; command-copy success and terminal End/Home, format/sample toggling and output-copy success were observed. Native Back/Forward and reload retained the correct install context and 300dvh hero geometry. `behaviour.json` records install deep links, history/reload, both literal clipboard-failure/manual-copy messages in a real `clipboard-write 'none'` Permissions Policy iframe, readable/overflow-free CSP `font-src 'none'` fallback fixture, and a CSS-root 200% text/focus-clearance fixture at 320px. The enlargement fixture is **not actual OS/browser zoom**. Browser fixtures were disposable ignored build files and are absent from the fresh production build.
- Finish review evidence: the first fresh reviewer returned **recapture**, not a clean result, after detecting six malformed JPEGs; it stopped before source/craft review. Those captures were replaced without an immediately preceding full-page capture and reopened/checked. A separate fresh full reviewer `/root/impeccable_finish_review_corrected` inspected all 26 required viewport/full-page/detail JPEGs, all supplied source owners, complete stylesheet, approved specification/current contract, font provenance, detector and final metrics, and returned **SHIP** with no material fix. Native JPEG output is slightly uniformly scaled relative to logical viewport dimensions; the former severely compressed captures were not accepted. Full-home solid slate track is a capture artifact of the protected sticky hero, not a newly empty page region. The reviewer did not independently execute project tests, runtime fixtures or binary-identity checks; those are the primary-agent evidence above.
- Detection/documentation: one hookless detector pass found only the pinned Instrument choice and then-stale installed font/shadow metadata. No ignore or detector rerun was added. The shipped documenter synchronized token-bearing `DESIGN.md`, schemaVersion 2 `.impeccable/design.json` with nine real self-contained component previews, the two existing surface briefs and only `PRODUCT.md`'s terminal-location sentence. Historical surface/hero authority was preserved, not retroactively certified. Parent verification checks metadata references and the exact sentence/history boundary before delivery.
- Documentation verification: parent parsing confirmed canonical YAML/JSON, 23 source color roles, all token references and nine actual script/framework-free previews; a residual SSR-only display-contents helper style was removed from one documentation preview. `PRODUCT.md` differs only by the authorized terminal-location sentence, and both original surface histories remain byte-preserved. This does not change production UI or invalidate its finish review.
- Limits and manual follow-up: no physical touch/device or multi-browser coverage, real OS/browser zoom, OS light/dark switching, forced-colors/reduced-transparency preference switching, WCAG-conformance certification or measured performance/Core Web Vitals claim. Actual browser GPU-loss/restoration and OS-level reduced-motion switching were not rerun here; unchanged hero identity and compiled synthetic lifecycle scenarios provide separate bounded evidence, not those native tests. Existing release/install/configuration/performance copy remains unverified against its owning tool repositories and was not strengthened. No implementation risk is silently marked accepted.
- Delivery scope: working changes remain uncommitted in the current worktree. No commit, push, PR, hook activation, publication or deployment was performed or authorized.

### Superseded first structural proposal — not human-approved

- The first structural body `042637beff39ed3575b1969cc5a8c2936cb2fcef79d676ddb66cca3e50bb3f5e` received a full fresh-context source/document review from `/root/nocturne_design_review`: zero Blockers, zero Majors, one Nit about attributing historical generated `github-dark` output to an explicit configuration absent from `astro.config.mjs`.
- The corrected body `1a08b340ad09b4ea7e5ea362e5d2061bfa93acc7f2bda35379dbb2ff6acfa23f` received fresh targeted revalidation from `/root/nocturne_targeted_review`; the attribution Nit was resolved without another finding. Both reviews verified 24 source identities; targeted revalidation also verified 89 protected files. They did not inspect a browser or run builds/tests/fonts.
- The user subsequently said the structure/design still needed reconsideration and chose a task-led portal. The task gateway, separate installation desk, moved Clint example, editorial schema addition and altered dock invalidate that prior structural coverage. Neither the old clean result nor its approval request applies to the current body. The corrected source attribution and prior approved visual-system intent are retained.

### Historical approved visual-system baseline

- The complete prior design was human-approved on 2026-11-05, following full independent review and targeted resolution of its only wording Nit: ordinary prose/links stay neutral while code follows its declared syntax mapping without Mineral accent. No Blocker or Major remained in that review's scope.
- Full-review substantive body: `e4029c943e3a390ba7686a40adaa30eebc9b5674e700db22737d1195ac358c3d`; full Markdown: `ec7769e741641707deb9cd45d46bcbf5df684173e0be99217b36f1e505f953c4`; companion HTML: `ebccef741f5e0abb7b35e11046f4fcc587fa0f0e4c1f4ec1c87a6488b60b12e5`. The recorded critic read its persona, all three standards, target/companion, selected source contracts and current hero contract; it verified the palette/contrast calculations. This historical record is not a new execution claim.
- Targeted revalidation and human approval bind substantive body `dd8905c0eb06015135ed87d90a458c67aa0d727a48f7d212ef9a8817e5396691`. The delivery-formatted, table-padding-only successor is `5ec04925c72a5911d863844e4b0210d4d0bbd875e5a3051fa7148697648459d0`, reconstructable from this path at commit `df5bf7fc60c53760285049ffabce30c93685e8ac`. That equivalence check was not another independent review.
- The still-earlier body `7f863dcf09c7bb97172054c978d7e38fc58ba5da0635393b205892689d90d761` has historical review coverage only. Full prior review/approval wording remains in the immutable baseline, not a second live design file.
- All historical reviews were documentary/source-only, with no browser, runtime, font-budget or WCAG-conformance proof. Approval did not authorize implementation, acquisition, Git delivery or deployment. The palette, typography and protected hero intent remain settled; affected structural coverage is invalidated by the present revision.

<!-- egm-review-state:end -->
