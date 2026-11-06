---
version: 1
slug: 'src-components-navbar-astro'
primary_target: 'src/components/Navbar.astro'
related_targets: ['src/styles/global.css', 'src/layouts/Layout.astro']
---

# Shared navigation dock

Mode: Operate.

## Current refinement (2026-11-06)

The maintainer requested a smaller, quieter, minimalist dock, then explicitly selected icons only with macOS-like labels above hovered icons. This supersedes the previous always-visible-label rule only for the shared dock. Preserve Nocturne, the official mark and existing Tabler icons, all four destinations, native links/history, homepage section state, hero hide/return, documentation behavior and safe-area clearance. No magnification, new navigation destination, dependency or animation is required.

The existing component and global stylesheet remain the owners. The opaque Surface dock is 202×58px at all tested sizes, with four 44×44px links, 4px gaps, 6px padding and a fine decorative border instead of the old large Raised frame and shadow. Icons are 22px. A 4px Mineral dot replaces the old active-label underline. Shared bottom clearance is 7rem plus the safe-area inset; existing bottom offsets remain unchanged.

Each link has an explicit accessible name. Visual labels repeat those names above the icon on hover or visible keyboard focus, without duplicate screen-reader announcements. A transparent bridge makes the label hoverable. Escape dismisses labels even when focus is elsewhere; pointer re-entry or a new focus restores them. Tooltip events use the component's existing abortable lifecycle. Native touch activation remains direct; no reveal-first tap is introduced. Without JavaScript, native links, accessible names and CSS labels work, but Escape dismissal is unavailable.

## Verification and limits

Local check/build, lint, formatting and the existing 10-test suite pass, as do the built Navbar, Hero and Design scripts. Navbar assertions now cover accessible names, identical dock output on both documentation routes, Escape/re-entry/focus and listener disposal, alongside existing visibility/history/section-state tests.

The built site was inspected in the in-app browser on home, Clint and Relay at 1280×720, 390×844 and 320×720. All nine measured cases have a 202×58px dock, 44×44px targets and no page-level horizontal overflow. Additional visual checks cover 900×700 hover/focus, 844×390 landscape and a 320×720 fixture with 200% root text (not actual browser zoom). The enlarged Principles tooltip remains within the viewport. Observed interactions include native anchor arrival, correct settled Install state, dock-free hero and dock return, pointer access to the tooltip, keyboard labels/focus, and Escape while focus is outside the dock. No claim of physical-device, multi-browser, native forced-color, actual browser-zoom or WCAG certification is made.

The scoped in-thread polish pass found no remaining material issue. DESIGN.md records this refinement; the already-stale design sidecar is deliberately not regenerated. No commit, push, pull request or deployment is included.

## Approved motion extension: blinking eyes (2026-11-06)

The maintainer approved and requested implementation of synchronized eye blinks in the dock logo only: a 180ms close/open, independent random 8–18-second pauses between sequences, and a 20% chance of two blinks separated by a 200ms open-eye pause. The silhouette, smile, 22px geometry, navigation, tooltips and all other logo instances remain unchanged.

Motion thesis: the official face supplies one small authored moment of personality, not a navigation cue. There is no new continuity animation or interaction delay. Only the two existing eye rectangles transform, using the existing source SVG imported inline through Astro. The shared Navbar owns one pending timeout and abortable lifecycle; CSS owns the bounded single/double sequence. No perpetual frame loop, dependency, layout-driving animation, shared-asset edit or magnification is needed. Pause with open eyes while the dock is hovered, contains keyboard focus, is hidden behind the hero, or the document is inactive. Resume after a fresh random pause, never catching up. Reduced motion and no JavaScript retain the static original face.

### Motion implementation evidence

The implementation reuses `src/assets/brand/logo-white.svg` as an Astro SVG component; no duplicate geometry or edits to the canonical source/public SVGs are introduced. Built-output assertions compare every official path/rectangle attribute and require both eye rectangles. Existing navigation/history/hero tests remain intact. New deterministic scheduler tests cover the 8–18-second delay bounds, the exact 20% selection boundary, no timeout during a CSS sequence, cancellation and fresh-delay resume on hover/focus/visibility/reduced-motion, stale callbacks, remount and independent-instance disposal. Check, build, lint, format, the 10-test suite and all Navbar/Hero/Design script groups pass.

The native browser rendered the built CSS and actual Navbar in a temporary diagnostic fixture with only `Math.random` fixed to zero, selecting the minimum pause and double-blink branch. Its first sequence started at 8039ms, sampled identical eye scales of 0.0859505 near the first closure and 0.0804081 near the second closure, then restored untransformed eyes at 8597ms. This verifies rendered synchronization/timing with frame scheduling, not a performance benchmark or statistical randomness claim. Pointer hover kept the sequence-start count unchanged at nine; native keyboard focus restored open eyes and retained the Install tooltip. Diagnostic files are generated-only and are removed from the preview output after inspection.

The built home, Clint and Relay routes were remeasured at 1280×720, 390×844 and 320×720: every dock remains 202×58px, its inline logo 22×22px with two eyes, and all nine cases remain free of page-level horizontal overflow. The in-thread source/visual polish pass found no remaining material issue. Runtime media-query changes and document hiding are deterministic test coverage, not a new physical-device, native OS preference, multi-browser, WCAG or performance certification. No Git shipping or deployment is included.

## Approved motion extension: dock entrance, exit, and scroll auto-hide (2026-11-06)

The maintainer approved and requested implementation of animated entrance and exit for the compact dock:

- A macOS-style vertical slide with a natural spring-like rebound overshoot (`cubic-bezier(0.34, 1.28, 0.64, 1)`) over 320ms and an icon entrance stagger of 25ms (0ms, 25ms, 50ms, 75ms).
- A faster, crisp 180ms ease-in exit downwards when scrolling down or hiding (`cubic-bezier(0.4, 0, 0.2, 1)`).
- Directional scroll auto-hide on the catalog: scrolling down hides the dock; scrolling up immediately restores it.
- Immediate reveal on keyboard focus (`focusin`) or hover (`pointerenter`), keeping the dock visible while interactive.
- Top of page keeps the dock visible; homepage hero immersion hides the dock until crossing the task gateway.
- `prefers-reduced-motion` provides an instantaneous opacity-only transition without spatial movement or rebound.
