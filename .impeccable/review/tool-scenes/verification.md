# Floating product scenes: implementation evidence

## Approved scope

The maintainer approved the Entire-inspired separation of identity/actions from landscape-backed product previews on the homepage and both tool-page openings, then explicitly requested implementation. A subsequent correction pins the floating-panel background to opaque `#222222`; translucency and backdrop blur are not part of the brief. The complete contract is `.impeccable/surfaces/src-components-toolcard-tsx.md`.

## Implementation and preservation

`ToolPreview.tsx` is shared static semantic HTML, used inside the existing catalog island and server-rendered without a client directive on tool routes. It adds no new hydration owner, dependency, animation, asset or clipboard control. Tool names/status/task/purpose/actions and the actual getting-started controls remain on charcoal outside the painting. Only preview panels use the local floating ground, 12px corners, fine light edge and soft offset shadow. Their code wraps rather than clipping. Both scenes retain illustrative captions, actual selectable text and opaque/image-independent fallback. The protected hero, navigation dock, filters, unfiltered installation desk, source Markdown, full Clint interactive sandbox, fonts and original artwork are unchanged.

## Sample verification

Both owning local Rust source checkouts were compiled offline into `/tmp/fluidise-preview-proof`, without writing build artifacts into those checkouts. `sample-sources.json` records local HEADs and source hashes; these are local source evidence, not verification of remote releases. In a disposable temporary fixture:

- Clint read `COMMIT_EDITMSG` containing `feat(core): add search` with `--file COMMIT_EDITMSG`; it returned exit 0 and the stored `clint-output.json`. The preview selects only the genuine `schema_version`, `status` and `diagnostics` fields.
- Relay inspected an installation plan using the exact fixture configuration `program = "fluidise-clint"` and `args = ["--file", "{message-file}"]`. The fixture alone enabled Git worktree configuration; no real repository hook was installed or approved. Stored `relay-output.json` confirms read-only inspect, the install operation and the effective command. The approval statement is also checked against Relay's matching-plan/stale-plan dispatch code.

Existing site's Markdown/sandbox examples differ from the owning sources. They remain unchanged by scope and are not the source of the new samples. The preview is an illustrative plan summary, not a new graphical interface, execution result or release/install-availability claim.

## Browser evidence

All final captures and measurements use the static production build at loopback port 8765, not the earlier development server. `required-screenshots.json` names all 27 required JPEGs; each was opened during capture. The desktop and mobile catalog content/scenes have separate views, and both tool openings have top/context and complete-scene views. Native JPEG dimensions are slightly smaller than the CSS viewport because of the browser surface.

`metrics.json` records all three routes at 1280×720, 390×844 and 320×720, plus all three routes at 320×720 with a 200% root-font fixture and all three at 1280×720 with page scripts removed and scene images deliberately broken. Every measured document and preview panel is horizontally overflow-free. Every normal panel is opaque rgb(34,34,34), with opacity 1 and no backdrop filter. The root-font fixtures are not actual browser/OS zoom, and fallback fixtures are not browser-wide JavaScript disablement. The fixtures were temporary and removed from source and final build.

`interactions.json` records pointer status filtering, Tab/Space selection, unchanged two-row installation access under each filter, the Relay install deep link, actual docs navigation, command-copy feedback, a separate-read verification of exact Relay clipboard payload and exact Clint payload, the native 3px/4px keyboard focus outline on the starting action, installation reference navigation, and the preserved Clint format/error-sample controls. The first same-call Relay clipboard comparison was stale; a separate tool call verified the correct payload. No application code was changed for that bridge timing.

The active design hook scanned changed UI targets and reported no deterministic issues. No extra detector pass was run. Primary visual inspection made one batched spacing correction (removing the obsolete two-line heading-height reserve), then recaptured the final source. Browser normal-route warning/error log was empty. No new raster was generated; original-artwork checksums/provenance remain owned by `src/assets/tools/README.md` and are asserted by the built Design suite.

## Limits

No native forced-color/reduced-motion test, screen-reader session, actual browser zoom, physical device, second browser, performance benchmark, release verification, commit, push, pull request or deployment is included. Forced-color behavior is source reviewed, not certified. The existing design sidecar drift and unrelated product-copy drift are not repaired.

## Final primary checks

The final source passed `bun run check`, `bun run test` (15 tests across three files), `bun run build`, `bun run lint`, `bun run format:check`, `node src/components/Design.test.mjs`, `node src/components/Hero.test.mjs`, `node src/components/Navbar.test.mjs` and `git diff --check`. `source-hashes.json` identifies the source reviewed against the captures. These local checks do not establish remote CI, deployment or release state.
