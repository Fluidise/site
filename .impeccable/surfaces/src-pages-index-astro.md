---
version: 1
slug: 'src-pages-index-astro'
primary_target: 'src/pages/index.astro'
related_targets: ['src/pages/tools/[id].astro']
---

# Homepage and tool pages

Mode: Persuade on homepage; Read on documentation.
Scope: all routes. Preserve tool content and functionality, filters, sample and format switching, copy actions, documentation and repository links. User explicitly removed the homepage marketing headline and right reading rail. No invented npm commands or Run button.
Previous composition C and v2 are superseded. Approved comp: `.impeccable/mocks/alpine-dock-v3.png`, approved by the user with the exact 75% viewport rule and square terminals. User's exact 75% viewport requirement outranks the generated image's approximate banner height.

## Direction contract

THESIS: An uninterrupted alpine panorama leads directly into the tools, without a marketing pitch or conventional top navbar.
OWN-WORLD: Snow white, glacier blue, slate. Liquid/glacial glass and squircle corners with 40px radius only on the fixed dock and small controls. Terminals and code surfaces have square corners, providing deliberate contrast.
STORY: Recognize Fluidise, reach the catalog immediately below the landscape, filter tools, open documentation, copy installation commands and inspect clearly labeled terminal demonstrations.
FIRST VIEWPORT: Full-width mountain banner occupies exactly 75% of viewport height; white FLUIDISE lettering over sky. Catalog begins in the remaining space. Labeled floating navigation dock stays bottom-center; safe-area and content clearance prevent occlusion. Terminal and installation remain below the banner, never over the photograph.
FORM: User-pinned alpine direction, seed 39a0bd5b, revised in response to explicit composition feedback. Banner animation deferred to a later dedicated-skill task; no speculative motion now.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Implementation evidence: the official black and white logos match Fluidise/core. First viewport reserves a clear catalog transition so the fixed dock does not cover the first entry. Square terminal demonstrates the unchanged samples; banner motion remains deferred.

Latest user correction: retain native corner-shape: squircle, replace the shared 50% border radius with 40px on the dock and small controls/symbols. Technical panels remain square.

## Final verification status

The human first-viewport review is accepted and does not need to reopen. The local engine correction recognizes that approval (`viewportAccepted: true`); its fresh native capture matches the approved reference at 0.9972 (99.72%). This does not close the automated workflow: original-comp region coordinates, the inline Tabler CPU icon classifier, and required PNG versus rendered WebP identity still leave material gates blocked. See `.impeccable/review/gate-diagnostic.md` and `.impeccable/review/entry-relocation-result.json`. Do not alter the approved design to chase those coordinates, bypass checks, or claim pipeline completion.

The final documentation verification confirms the existing 40px native squircle dock and small controls, square technical panels, 75svh banner, unchanged official logo assets and tool-content sources, and intentionally deferred banner animation. No UI changes were made by this verification. Evidence and its limits are recorded in `.impeccable/review/final-documentation.md`.

## Scoped typography replacement (2026-10-25)

The user rejected conservative typography polishing and delegated a full site-wide type redesign, including the FLUIDISE lettering. `.impeccable/surfaces/typography.md` now owns typography authority across these routes; `DESIGN.md` records the implemented role tokens. Barlow Condensed 700 replaces Goldman and the former system-sans headings; Source Sans 3 400–700 replaces the body/interface system stack. Native monospace remains for commands and data.

The historical composition approval and its 99.72% capture comparison above apply to the earlier lettering, not acceptance of the replacement typography. They do not certify current typography review or close the historical automated material gates. The photograph, palette, fixed dock, corner geometry, official SVG marks, content and interactions remain the preserved composition boundary; no banner motion was added.

## Current hero override (2026-11-03)

The user selected and approved a painterly suspended-archipelago diorama, then explicitly required the hero to occupy all available height and space, referencing the full-screen hero at `https://www.kimi.ai/blog/kimi-k3-1-pro`. This supersedes only the historical alpine, 75%-height, remaining-first-viewport catalog, and deferred-banner-motion constraints above. The fixed dock, typography, square technical surfaces, official logos, product content, and all unrelated regions remain preserved.

Current first viewport: full width and `100dvh` height with a `100vh` fallback; no catalog visible before native scrolling. Original-image fallback and source-bound SVG planes share a centered cover crop. The pause/resume control sits above the dock-clearance region. The subsequently approved native WebGL extension adds painted cloud bands and faint near mist over the unchanged image/SVG scene, with silhouette occlusion, eased pointer depth, and a gentle approach on native scroll. Reduced motion and GPU failure retain the original painting. No scenery reconstruction, scroll locking, new dependency, or reference assets/code are required. Current authority, actual checks, and limits live in `docs/specs/alpine-canvas-hero.md`; the old review/approval records above do not certify this implementation. Independent implementation review is not yet authorized or completed.

## Scroll journey supersession (2026-11-04)

The user selected **Traversée cinématique** and then dock option **1**: hidden only during the hero, returning at the catalog. This supersedes the pause control, autonomous cloud/bob/pointer motion, and always-visible homepage dock described above. The painting and typography remain unchanged. The sticky 100dvh viewport occupies a reserved 300dvh native-scroll track; island approach, foreground departure, title fade and painted cloud separation are deterministic scroll states, not autoplay. Reduced motion and no JavaScript use an unpinned static viewport. GPU/decode failure keeps the reserved journey geometry and original-image fallback to avoid moving the reader. The semantic dock remains present on documentation pages and returns to keyboard/assistive navigation with catalog entry. No scroll capture, new copy, asset generation, dependency, shipping or deployment is included.

## Organization title supersession (2026-11-04)

The user selected **Nom dans le paysage** (option 1): an almost full-width, fully readable organization name on arrival, slight growth, recession behind the island and a later progressive disappearance. This supersedes the small upper-left wordmark and its early fade, not the approved painting, 300dvh native-scroll journey, dock behavior or non-hero typography. Barlow Condensed remains the display face. One real h1 is layered behind the authored rock cutouts, with a coincident aria-hidden front face fading away smoothly; no duplicate semantic heading, new asset, image mask, runtime, dependency or animation loop is introduced. Reduced motion, unavailable GPU and no JavaScript preserve the complete readable name.

## Painted title material (2026-11-04)

The user selected **Pigments peints** (option 1): matte ivory lettering with restrained brushwork and lavender nuance from the approved painting. Only the static material changes; the name, font, size, scroll phases, rock occlusion, dock and all other content remain unchanged. Glyph clipping reuses the exact optimized background URL with an opaque ivory ground and constant warm wash, identically aligned on both title faces. Solid-color and forced-color fallbacks keep the name readable. No generated grain, new image, dependency, animation loop or WebGL change is included.
