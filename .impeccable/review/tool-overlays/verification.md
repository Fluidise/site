# Tool background presentation verification

## Scope and baseline

Local implementation on `feat/tool-banner-overlays` in `/Users/acrazie/.codex/worktrees/tool-banner-overlays/site`, based on `origin/main` at `eecac13a19345e357f3bc39aa213feb9c30744a2`. PR #23 had already merged. The original `/Users/acrazie/.codex/worktrees/70d9/site` remains clean at `a911ae913fe5992ff337400fb81e68c2d8465780` on `feat/tool-banner-presentations`.

Only the supplied text-free tool paintings, their live homepage/tool-opening presentation, directly related tests and design records change. No hero, navigation, clipboard, terminal, collection facts, commands, dependency, source-repository or global-token changes are included. Asset source paths and exact SHA-256 identities are recorded in `src/assets/tools/README.md`. No additional artwork was generated.

## Finish-review correction

The initial fresh reviewer returned `fix`: narrow cover crops selected insufficient image resolution, and the installed-design documents still described the former separate banners. The image helper now selects the original-width 2048×768 WebP using the shared `sizes` hint and fallback source. It intentionally prefers the maximum available painting detail rather than adding runtime box measurement or predicting content height. Measured encoded payloads are 76,108 bytes for Clint and 57,736 bytes for Relay; homepage and tool routes reuse the same URLs. Six existing width candidates remain generated, but this cover presentation selects the full-size candidate. Enlarged content can exceed the original source resolution; no invented detail or unbounded source scaling is claimed.

All 28 capture files were recaptured after that correction, opened and validated again. The final 12-case matrix records actual selected 2048×768 dimensions, box dimensions, source URLs and encoded bytes alongside layout measures. The source/behavior checks passed again. The documenter owns the narrowly affected installed-design descriptions; the final reviewer verdict is recorded separately.

## Render and behavior evidence

- `matrix.json`: 12 route/size cases at 1280×720, 390×844, 844×390 and 320×720. Each actual iframe document has `scrollWidth == clientWidth`; observed layout-shift totals were zero. Twenty regular JPEG captures show the catalog and both opening presentations.
- `behaviour.json`: seven cases covering blocked images, corrupt images, a 1.5-second image delay, script-free HTML, and CSS-root 200% text on all three routes. Live content remains in normal flow with no horizontal page overflow. Native broken-image chrome can remain visible when the decorative resource fails; text and actions do not depend on it.
- `interaction.json`: actual released/development filter results, both retained installation rows, command-copy success feedback and exact clipboard command, plus a focused action's outline and clearance above the dock. `focus-home.jpg` records that focus state.
- The remaining eight JPEGs show the seven edge cases and focus. Every one of the 28 current capture files was opened and inspected before the independent review. Earlier malformed test captures were replaced, not retained as evidence.

The browser's viewport capability did not resize its top-level document. Responsive evidence therefore uses real same-origin iframe CSS viewports, with dimensions verified in the iframe document, not a claim of top-level device emulation. QA responses disable smooth anchor scrolling only to settle capture positioning; production scrolling is unchanged. Script-free HTML removes scripts and unwraps the existing noscript styles. CSS-root enlargement is not browser or OS zoom. No physical-device, multiple-browser, OS preference or complete WCAG certification is claimed. The existing dock wraps strongly at 200% text; it is unchanged by this refinement.

The minimum 78% Canvas scrim was checked against a pure-white image pixel: conservative calculated ratios are Secondary 5.10:1, Action 6.75:1, Mineral 4.64:1 and Primary 8.11:1. These token/scrim calculations do not replace a full accessibility audit.

## Automated checks

Passed on the implemented source: `bun run test` (10 tests), `bun run check`, `bun run build` (three routes), `bun run lint`, `bun run format:check`, `node src/components/Design.test.mjs`, `node src/components/Hero.test.mjs`, `node src/components/Navbar.test.mjs`, and `git diff --check`. The first formatting check identified only the three new evidence JSON files; they were formatted and the check passed. The sandbox-blocked initial test attempt was not a meaningful red-before-green run.

One detector pass over the changed UI owners produced only two existing, user-pinned Instrument Sans warnings (`detector.json`). No ignore, font replacement or second detector pass was added. The first baseline identity comparison found only the ten planned implementation/design files changed, preserving all 149 other tracked baseline identities. The reviewer correction subsequently extends the existing image helper and its homepage call site; final installed-design documentation is also within scope. The protected hero, current-main interaction improvements and dependencies remain unchanged.

No commit, push, PR creation/update, merge, release or deployment was performed. The development preview remains on `http://127.0.0.1:4324/`.

The final reviewer returned `ship`, scoring both named fixes resolved after reopening all 28 final recaptures. This is a verdict on those fixes, not a new whole-surface certification. The final baseline audit found exactly 14 planned tracked files changed and all 145 unrelated tracked files preserved. DESIGN.md token frontmatter is identical; the sidecar differs only in its two affected component descriptions. The original worktree remains clean.
