# Floating product scenes: documentation handoff

## Changes and boundary

- `DESIGN.md` now describes separate charcoal identity/actions, the shared static landscape scenes, mobile identity/installation-first order, opaque `#222222` preview panels, their local shadow/edge/corner exception, and illustrative/source-verified sample limits. It no longer authorizes complete identity/action overlays or contrast scrims on these surfaces, and no longer says the homepage has only a sample-output pointer.
- `.impeccable/surfaces/src-components-toolcard-tsx.md` retains the approved six-block contract and invariants, with an appended implementation/evidence note.
- This report records the documentation-only handoff. No implementation, test, product, token-frontmatter, artwork, older surface record or sidecar change is included.

## Evidence inspected

The pass read `PRODUCT.md`, the approved surface contract, the existing `DESIGN.md`, `src/components/ToolCard.tsx`, `src/components/ToolPreview.tsx`, `src/pages/tools/[id].astro`, and the relevant scene, opening, responsive and forced-color declarations in `src/styles/global.css`. It inspected `verification.md`, `source-hashes.json`, `sample-sources.json`, `clint-output.json`, `relay-output.json`, `metrics.json`, `required-screenshots.json` and `interactions.json` in this evidence directory. The capture manifest and stored measurements were checked as records; this pass did not independently reopen the images or repeat browser interactions.

No source tests, browser session or build were rerun. Formatting is limited to the three changed Markdown files; their formatter check and scoped `git diff --check` passed. A read-only consistency check confirmed unchanged token frontmatter and sidecar bytes, all seven recorded implementation-source hashes, 15 stored measurement states and all 27 files named by the capture manifest. Existing source-check and browser evidence remains attributed to the implementation verification record, not to this documentation pass.

## Preserved limits

The local preview material is not a new global visual world or palette. Existing filter/task-lane sidecar-preview drift and unrelated Markdown/sandbox sample drift are acknowledged, not repaired or canonized. The approved artwork and its provenance remain untouched. Stored local CLI fixture outputs do not prove remote publication or installation availability, and stored root-font/fallback fixtures do not prove actual browser zoom or browser-wide JavaScript disablement. Final finish-review disposition remains pending after the documentation persistence correction; no commit, push, pull request, deployment or shipped-state claim is made.

## PR #30 integration note

The implementation and documentation pass above describes its original base. During subsequent delivery, the then-current PR head added updated catalog-filter and dock sidecar previews and new catalog-filter token entries. The isolated integration retained those changes while documenting that the sidecar's tool-presentation previews still show the earlier overlay composition. No UI source or captured evidence was altered by the documentation merge.
