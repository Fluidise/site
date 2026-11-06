# Quiet background implementation evidence

## Implemented boundary

The human-approved design is the first section of `docs/specs/dark-design-system.md`, substantive SHA-256 `9bc486d2e31662e8312a13ef3c92340e95b314f089ae9afc0c66051f9a3048e4`. The later explicit implementation request is recorded in its excluded review metadata. Production changes are scoped presentation hooks in ToolGrid, ManifestoSection, Footer and the shared tool template, CSS in global.css, one procedural grain PNG, and a built-output contract test. There is no new runtime, dependency, hydration owner, route or product copy.

The private working baseline archive and identity manifest were captured before production edits, including the already approved uncommitted design. Installed node_modules was privately copy-on-write copied from an existing checkout with identical package.json and bun.lock; no dependency install or source-checkout mutation occurred. No commit, push, PR or deployment was performed.

## Project checks

After final source/asset changes, all passed: `bun run check`, `bun run build`, `bun run lint`, `bun run test` (10 tests), `bun run format:check`, `node src/components/Design.test.mjs` (five groups), `node src/components/Hero.test.mjs` (eight groups), `node src/components/Navbar.test.mjs` (four groups), and `git diff --check`. The new built-output test failed first against the unmodified baseline (0 decorative frames instead of 4), then passed after implementation. A formatting-only issue in generated evidence JSON was corrected before the final format pass.

The active automatic design hook's observed result is in hook-findings.md. No second manual detector or ignore was added. The new PNG includes exact local procedural origin/algorithm metadata and the tool-recognized embedded provenance; `impeccable embed-prompt --scan src/assets/background` returned one raster, zero missing. No AI image generation or external artwork was used.

## Browser evidence

All 39 named JPEGs in required-screenshots.json were opened in the primary agent's inspection, including gallery inspection plus original-size representative/detail views. Invalid right-cropped wide captures were replaced before independent review. The matrix covers three routes at 1280x720, 390x844, 844x390, 320x720 and 1680x900 actual CSS viewports. Native JPEG output is slightly smaller than the requested CSS viewport; above about 1400px the host crops the right edge. The three final wide JPEGs therefore show a real 1680x900 CSS iframe uniformly scaled to 0.75 within a 1280x720 capture, not a right-cropped page. capture-limits.json records this separately; top-level wide geometry remains in matrix.json.

baseline-metrics.json, matrix.json and geometry-comparison.json show unchanged content/shell/page-height geometry in all 15 matched cases and no horizontal document overflow. Scroll-transformed title/sticky/fixed positions were not compared between different scroll offsets. hero-comparison.json separately verifies matching baseline/current 2160px hero tracks and 720px viewports, identical arrival/departure transforms and title opacity, dock hide/return, and native Home reverse scrolling at 1280x720. This is bounded geometry evidence, not a CLS/Core Web Vitals measurement.

Fixtures are server-side transformations outside the source tree. Capture responses alone disable smooth anchor scrolling for deterministic screenshots. `nojs` removes scripts and unwraps existing noscript fallback styles, `text` doubles the root font to 32px at a real 320px CSS viewport, and `plain` hides only the new decoration. All three routes remain overflow-free in these nine cases. The baseline reproduces the inherited 200% root-font dock wrapping; baseline-text-home.jpg is supplied explicitly, not called a new decoration defect or accessibility pass. A separate loopback server deliberately returns 404 for the grain image; live reference content remains unchanged in blocked-grain.jpg.

interaction.json records actual filter/install isolation, terminal format Home/End selection and invalid sample, visible copy-success UI, direct install-hash reload and Back/Forward context, and an actual 3px keyboard focus outline on Skip to content. The host clipboard bridge returned an empty read despite visible copy-success UI, so exact clipboard contents were not independently verified. Top-level Permissions-Policy did not produce a denied-copy message, and the host could not dispatch a click into a cross-origin denied iframe. The visible failure/manual-copy path is therefore not claimed as rerun; its unchanged owner remains protected. Keyboard evidence is not comprehensive focus/conformance coverage.

## Cost and limits

cost.json records one 5437-byte local PNG, 1826 additional bytes of built CSS, and 174 additional bytes in the existing ToolGrid module from static classes/spans. Hydration owners remain ToolGrid on home, CopyCommand/InteractiveTerminal on Clint, and CopyCommand on Relay. The grain URL is shared across routes; recorded sizes are encoded local delivery assets, not network timing or a performance improvement.

Actual browser zoom shortcuts changed neither viewport nor DPR. No native DPR-2, forced-colors or reduced-motion override was exposed; native preference testing, actual zoom, physical devices, multiple browsers, GPU-loss/restoration, rendered accessibility certification and runtime performance are not claimed. Forced-color suppression is present in source and the unchanged lifecycle suites ran, but source/synthetic checks are not native preference tests. No JavaScript, new animation or page-wide filter was introduced.

The fresh independent finish reviewer returned `ship` with all five required sections and no material fix after inspecting all 39 JPEGs, the grain tile and supplied source/evidence. The shipped documenter then synchronized only affected Layout/Elevation prose, one sidecar narrative-rule leaf and a prepended surface record. Parent verification preserves token frontmatter, sidecar metadata/extensions/previews, the entire historical surface content and all seven reviewed source/asset hashes. Pre-existing metadata drift is not part of the repair.
