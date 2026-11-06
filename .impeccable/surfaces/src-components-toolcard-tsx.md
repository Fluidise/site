---
version: 1
slug: 'src-components-toolcard-tsx'
primary_target: 'src/components/ToolCard.tsx'
related_targets:
  [
    'src/pages/tools/[id].astro',
    'src/components/ToolPreview.tsx',
    'src/styles/global.css',
    'src/components/ToolGrid.test.tsx',
    'src/components/Design.test.mjs',
  ]
---

# Floating product scenes

## Scoped homepage mobile disclosure (2026-11-07)

The user selected collapsible previews beneath each mobile task after the homepage critique. At the existing 900px stacking boundary, each card now owns an independent initially collapsed button/content pair with tool-specific accessible naming and expansion state. The unchanged ToolPreview figure remains in server HTML once. CSS keeps it always visible and hides its button above 900px; homepage noscript rules expose the content without inert controls. No new hydration owner, viewport listener, dependency, animation or modification to reference-page scenes is introduced. `docs/specs/homepage-critique-fixes.md` owns current evidence and limits. All earlier composition authority remains except the always-expanded homepage mobile treatment.

Mode: Read/discovery on the catalog; Read/getting started on tool references. This is a local composition replacement inside Nocturne, not a replacement visual world. The user explicitly approved this brief and then requested implementation.

## Direction contract

THESIS: Show what each independent tool does in a landscape-backed product scene, with identity, task, status, explanation and actions kept off the painting.
OWN-WORLD: Keep Nocturne, Instrument Sans, mineral primary actions, the supplied woodland/sea and protected archipelago. Only product-preview panels gain opaque #222 floating grounds, fine restrained edges and soft offset shadows. No transparency, backdrop blur, new artwork or ambient motion.
STORY: Choose the task, understand a concrete illustrated CLI result, then follow existing docs or installation actions. Examples are explicitly illustrative, selectable static HTML, never live execution or a dashboard the tools do not have.
FIRST VIEWPORT: Preserve the compact catalog arrival and two ordered lanes; each has charcoal identity/actions above its separate landscape scene. Tool openings place identity and installation on charcoal at left, with an enlarged shared scene at right; at 900px and below identity/installation precedes the scene in one column. Reference reading follows unchanged.
FORM: User-pinned narrow composition; code-led inside the established Read/discovery surface. No concept roll or new comp is needed. Signature is spatial layering, not animation. This task supersedes only the prior complete-text-over-landscape treatment; source commands/content, filters, installation desk, hero, dock and full Clint sandbox remain preserved.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Content and invariants

- Clint: real commit-file input and a source-verified structured validation excerpt.
- Relay: one configured commit-msg command and inspection/explicit plan approval, without invented pre-commit support, live controls or installation success.
- Keep accessible image-independent names/actions, actual sample text at readable sizes, normal-flow growth, no clipped diagnostics, local code wrapping/scrolling as appropriate, and forced-color fallback.
- Preview data is illustrative and source checked against the owning local CLI sources; it does not establish release/install availability. Existing site/interactive sample drift is out of scope, not a source for new previews.
- Preserve filtering/count semantics, unfiltered installation rows, commands, anchors, terminal behavior, collection order and source Markdown.
- Review all three routes at desktop, mobile, narrow and enlarged text; exercise actual filters, links and copy behavior. Keep examples server rendered without a new hydration owner.

## Implementation and documentation evidence

The implemented composition matches this local contract: `ToolCard.tsx` keeps task, identity, status, purpose and actions on charcoal above a separate `ToolPreview.tsx` figure. The tool-page template keeps identity and the square getting-started panel together at left, with the same figure at right; at 900px and below, identity and installation precede the scene. The earlier complete-text-over-landscape and contrast-scrim treatment is superseded only for these surfaces.

Only the illustrative preview panels use opaque `#222222`, 12px corners, a `1px solid rgb(242 242 242 / 0.18)` edge and `0 12px 32px rgb(0 0 0 / 0.28)` shadow. No transparency, backdrop blur, new raster or motion is introduced. Static selectable samples and opaque illustrative captions remain distinct from the unchanged Clint interactive sandbox and actual installation controls. `DESIGN.md` records this component-local exception without changing its token frontmatter or the incumbent global palette.

`.impeccable/review/tool-scenes/verification.md` records the implementation checks and their limits. The associated source hashes, local CLI source/output records, 15 measured route/fixture states, 27-capture manifest and interaction record support this handoff; they do not establish remote releases, installation availability, actual browser zoom, accessibility certification or deployment. Existing Markdown/sandbox sample drift and design-sidecar previews remain unchanged and are not authority for the new examples or composition.

The documentation pass inspected the current component/template/style owners and the stored evidence, corrected the obsolete installed-system overlay/scrim and homepage sample-pointer descriptions, and retained this approved contract and history. No browser, source test suite or build was rerun during documentation. The finish-review disposition remains pending after this persistence fix; this note does not claim a shipped or approved result.

### Final independent verdict

The fresh finish review found the scoped TYPE/MATERIAL/GROUND/THESIS/STORY/FIRST VIEWPORT and responsive preservation matched, with one material documentation-persistence fix. After the documentation-only correction, the same reviewer reopened all 27 required screenshots, verified all seven unchanged source hashes and scored that fix **resolved**, returning `ship`. This verdict pass closes that listed fix; it is not another whole-site approval or an accessibility, performance, release or deployment certificate. The initial review and final verdict are stored in `.impeccable/review/tool-scenes/initial-review.md` and `finish-review.md`.
