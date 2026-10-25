# Alpine Banner and Title Depth

## Objective

Use the approved, simplified photographic-style alpine banner (v3). The existing FLUIDISE title is initially visible in the sky and is progressively occluded by the main massif during normal scrolling. No Canvas, procedural clouds, ambient animation, or scroll locking.

## Scope

- Included: integrate `assets/plates/alpine-banner-v3.png`, optimize delivery using the existing Astro image service, retain the semantic title, and add a foreground mountain mask aligned to the same source image/crop.
- Preserve the existing 75svh hero height (75vh fallback), navigation, catalogue, terminal, manifesto, and page flow. No new copy or call to action.
- Retain natural scrolling on mouse, keyboard, and touch. The image remains stationary relative to its section; the title has scroll-relative depth and is hidden by the foreground as the section leaves the viewport.
- Reduced motion and no JavaScript: a normal static, readable title over the approved image. Preference changes must be respected.
- Authorized application paths: `src/components/Hero.astro`, its associated tests, hero-specific rules in `src/styles/global.css`, and generated banner assets/metadata approved in this conversation. The executor-created Canvas component/tests are removed because the user rejected that approach. Original images and generated candidates are retained without overwriting.
- Update this same contract at its approved destination, `docs/specs/alpine-canvas-hero.md`; the historical filename is retained rather than creating another contract.
- Excluded: new dependency installation, external services, unrelated redesign, staging, commits, pushes, PRs, and deployment.

## Success criteria and expected evidence

- C1: V3 appears in the actual homepage with the existing title, hero height, and page content preserved. Evidence: desktop/narrow previews and build output.
- C2: Title is readable at the top, then progressively occluded by the main massif while scrolling; reversing scroll restores it. Foreground and background use the same image and matched cropping. Evidence: browser scroll snapshots and DOM transforms.
- C3: Reduced motion at startup or on preference change keeps the title static; essential semantic text does not depend on JavaScript or a rasterized heading. Evidence: lifecycle tests and source/browser inspection, distinguishing simulated and real-browser scenarios.
- C4: The small scroll enhancement schedules at most one event-driven frame, does not run an ambient loop, suspends offscreen/hidden work, handles resize, and disposes listeners/observers/frames on disconnect. Remount and instances remain independent. Evidence: actual compiled-script tests with synthetic fixtures and relevant browser checks.
- C5: Run build, type check, diff whitespace check, and smallest sufficient targeted tests using installed tooling. Report blocked checks honestly; do not install dependencies or weaken acceptance implicitly.
- Completion still requires the independently requested review; its separate reviewer/model authorization remains pending.

## Decisions and context

- Earlier concepts (illustrated procedural mountains, then mist over the old image) were implemented as prototypes. They are superseded, not acceptance evidence for this variant.
- The user requested a regenerated, more realistic, less crowded banner. V3 was generated with the built-in image tool and accepted with: "Parfait go utiliser ca".
- For title depth, two alternatives were presented: (1) reveal initially hidden text, or (2) initially visible text progressively hidden behind the massif on scroll. The user selected exactly "2". This authorizes the current direction rather than an initial reveal.
- The main massif is clipped in source-image coordinates using SVG; the same optimized image is drawn below the heading and inside the foreground clip. No new raster cutout, generated media, or image-editing service is required.
- A native CSS view-timeline implementation was tried first but did not activate in the current in-app browser (`animationTimeline: auto`). It was replaced, not supplemented, by a small standard custom element with passive scroll input and requestAnimationFrame scheduling. No Canvas, React island, new dependency, or continuous animation remains in the hero.
- Consulted official documentation through Context7 on 2026-10-25: MDN named view timelines and SVG clipPath/preserveAspectRatio; Astro `astro:assets` getImage local-image/WebP delivery. Installed Astro 7.4.2 was observed; documentation is unversioned and does not certify every version-specific behavior.
- Project facts verified from `AGENTS.md`, `DESIGN.md`, `PRODUCT.md`, `package.json`, layout/homepage/hero/global CSS, and local images. Existing dependency installation was copied locally from `/Users/acrazie/Fluidise/site/node_modules` to avoid cache writes outside this checkout. No dependencies were installed or downloaded.

## Approval

Status: approved

The user originally approved the full scoped contract, its exact document destination, paths, checks, and exclusions by selecting option 1 in chat. The canvas specialist was later explicitly activated. Subsequent direct requests replaced the visual direction: generation of a simplified realistic banner, acceptance of v3 with "Parfait go utiliser ca", and choice "2" for title depth. These modify the same scoped hero task; prior Canvas behavior is no longer required.

Independent review was initially skipped, then explicitly requested after realization. After reporting that parallax did not align perfectly with the relief, the user selected option 1 explicitly activating `adversarial-reviewer-acrazie` and authorizing one read-only independent sub-agent in a fresh context with the inherited model. This review must present demonstrated defects before any correction. No correction or re-review budget is approved. The authorized independent reviewer has now returned REJECT on the frozen snapshot recorded below; no corrections are authorized or applied. The installation question was answered by selecting a new visual direction, not approving installation.

## Delivery evidence

### Evidence

- C1: `bun run build` succeeded, producing three static routes. Astro optimized the approved image from 2614kB PNG to 357kB WebP in the observed build log; both layers share the same optimized URL. These are build-reported sizes, not network transfer or Core Web Vitals measurements.
- C1/C2: Integrated previews inspected in the in-app browser at 1280x720 and 390x844. Narrow hero height was 633px and no horizontal overflow was observed. One semantic h1 remains; Canvas and its pause control are absent.
- C2: In desktop browser checks, scroll offsets 0, 37, 69, and 104px corresponded to title translations of 0, 37, 69, and 104px. Initial title was visible; at 69px and 104px the foreground progressively obscured the right-hand letters. This is observed scroll behavior, not just a static mockup. Mobile scroll at 25px also produced a 25px title translation. Returning to top restores zero translation.
- C3/C4: `node src/components/Hero.test.mjs` passed five scenario groups. The dependency-free test executes the actual compiled inline hero script from `dist/index.html` with synthetic DOM/observer/frame fixtures: initial and clamped depth/one pending frame; reduced-motion changes; offscreen/hidden/resize; independent instances/disconnect/remount/late callbacks; approved asset/no Canvas/source-coordinate mask/one h1. Run after `bun run build`. These are simulations, not real-device/browser coverage.
- C5: `git diff --check` passed. `bun run check` failed on four existing missing-development-dependency diagnostics: Vitest, vitest/config, Node path typings, and ImportMeta.dirname. No hero diagnostic appeared. The existing project Vitest suite cannot run without Vitest; no installation was authorized.
- Paths changed for current integration: `src/components/Hero.astro`, `src/components/Hero.test.mjs`, `src/styles/global.css`, approved generated image/metadata, and this document. Executor-created `AlpineScene.tsx` and its untracked tests were removed. Source images and candidate v2 are preserved.
- Live loopback preview: `http://127.0.0.1:4346/`. Supporting partial-scroll screenshot: `/Users/acrazie/.codex/visualizations/2026/10/24/01a17033-efcc-7f31-8f9a-fa036c947aea/alpine-title-depth.png`.

### Limits

- The foreground contour is manually traced; browser previews support its current alignment, not pixel-perfect segmentation across every crop or device.
- Real-device touch, browser preference switching, no-JavaScript/failure injection, actual browser disconnect/remount, and multiple mounted browser heroes were not exercised; source and synthetic checks are distinguished above.
- Type/project-test checks remain blocked by missing development dependencies. No FPS, universal accessibility, Core Web Vitals, or zero-leak claim is made.
- Independent review is authorized read-only and pending its independent verdict; corrections remain unauthorized. No ACCEPT verdict exists; no shipping or deployment occurred.

## Independent review result

- User approval: exact reply "1" to the proposal activating `adversarial-reviewer-acrazie` and one fresh-context, inherited-model, read-only sub-agent. No fix budget was granted.
- Reviewer: `/root/independent_hero_review`, fresh context without inherited author conversation; model inherited as approved, actual model identity not independently reported.
- Verdict: **REJECT**. Frozen base `392432c050d44c22ffee52992728160b1025d493`; review directory `/private/tmp/fluidise-hero-review-elzqbkcr`; manifest SHA-256 `844258291dd908b44c5a828e84984e69157e13a2c0a506a65f7d2fb89369e710`. Reviewer and executor verified source identity before updating this delivery record.
- R1/P1, `src/components/Hero.astro:8-10`: traced foreground includes background at source `(510,411)` while the actual main massif at that x starts near y=495, about 84 source pixels / 59 displayed pixels apart at 1269x540. Browser at scrollY=180 confirmed premature letter clipping outside the massif. Background/foreground crops align; the source contour does not.
- R2/P1, `src/components/Hero.astro:24-30` and `src/styles/global.css:153-174`: at 1280x400, zero scroll, the 300px hero's foreground already overlaps the initial heading; reduced motion/no JavaScript does not remove this overlap.
- R3/P2, `src/components/Hero.astro:47-52,65`: independent compiled-script fixture showed one bounding-rectangle read and one transform write from resize after offscreen and hidden notifications. Resize bypasses scheduler suspension.
- Reviewer ran the existing five test groups successfully, then independently demonstrated missing visual and suspended-resize coverage. No anti-workaround violation reported. Build/type checks were not rerun by the reviewer; reduced motion was source/simulation evidence, not system preference testing.
- No application code, tests, image, or styles were changed during or after review. Only this authorized delivery record was updated after verification. Corrections await a separate explicit implementation request; no ACCEPT verdict or shipment is claimed.

## Corrections after independent rejection

- Authorization: the user requested "Fait les correctif necessaire" after the three demonstrated findings were presented. This authorizes fixing R1–R3 within the existing hero scope, not shipping or an unapproved review loop.
- R1: replaced the coarse inline polygon with an image-bound detailed contour in `assets/plates/alpine-banner-v3-contour.json`. The contour follows pixel-edge measurements near the main massif, simplified at subpixel source tolerance, retaining 662 vertices. The source image SHA-256 binds it to the approved artwork. Source landmark x=510 now intersects near y=492 rather than y=411. The PNG itself is unchanged; only vector clipping geometry was generated, using the installed Sharp 0.35.5 to read raw RGB data for analysis. Its raw/toBuffer API documentation was fetched through Context7. This is not a universal pixel-perfect segmentation claim.
- R2: foreground occlusion is enabled only during actual scroll depth (`data-depth-active`), removed at the top and on teardown, and disabled by CSS under reduced motion. Without JavaScript the foreground remains hidden. Short landscape layouts cap title typography to available viewport height, keeping the title in the sky before occlusion begins.
- R3: every update now checks disconnected/offscreen/hidden eligibility before any bounds read or transform write. This applies to resize and preference events as well as scheduled scroll callbacks. Returning visible triggers a fresh reconciliation.
- Regression evidence: `bun run build` succeeded; `node src/components/Hero.test.mjs` passed five expanded groups. New assertions include the previously rejected source landmark, six independent relief landmarks, source-image checksum, initial/zero-scroll/reduced-motion foreground state, and zero layout reads/style writes during hidden/offscreen resize, scroll, and preference events. Existing cleanup, remount, isolation, scheduling and semantic checks still pass.
- Browser evidence: at 1280x400 and scrollY=0, the complete title measured x=43.14..324.48, y=20..50, font-size 30px; foreground was hidden, and the full wordmark was visibly readable. At 1280x720, scrollY=180 produced translation 180px and observed clipping along the mountain rather than the previously included background. At 390x844, the initial title was readable, no horizontal overflow occurred, foreground started hidden and became visible with depth; normal scrolling remained available.
- `bun run check` still reports the same four pre-existing development-dependency diagnostics (Vitest/config and Node typings); no hero diagnostic. No dependency installation or download occurred. `git diff --check` passed.
- Supporting corrected screenshot: `/Users/acrazie/.codex/visualizations/2026/10/24/01a17033-efcc-7f31-8f9a-fa036c947aea/alpine-depth-corrected.png`. The loopback preview was rebuilt and reloaded.
- Review status: the previous REJECT applies to the old frozen snapshot. No independent ACCEPT exists for these corrections; a fresh-context re-review requires renewed reviewer/delegation authorization. Browser-level reduced-motion preference switching and no-JavaScript injection remain unexecuted; CSS/source/synthetic evidence is distinguished from actual browser checks.

## Independent re-review of corrected snapshot

- Authorization: the user selected exactly "1" to relaunch one independent read-only review in a fresh context with the inherited model. Reviewer skill was reactivated; no correction/deployment loop was authorized.
- Reviewer: `/root/hero_rereview`, fresh context without inherited author conversation. Inherited model was authorized; effective model identity was not independently verified/reported.
- Verdict: **ACCEPT**, limited to the examined snapshot and task scope; zero demonstrated introduced defects and zero anti-workaround violations. This supersedes the earlier REJECT only for the corrected snapshot below.
- Snapshot: `/private/tmp/fluidise-hero-rereview-ykesuqwq`; base `392432c050d44c22ffee52992728160b1025d493`; manifest SHA-256 `0ae81b182c7b81dc41eefbafe8a1d2d3882479733116d42459de96e01ae50e99`. All nine manifested file identities were verified before/after by the reviewer and checked again by the executor before appending this record.
- Independent evidence: source-image/contour alignment examined with no material mismatch found; matching image/crop transformations, progressive occlusion, restoration at top, desktop/mobile (390x844) and short landscape (844x390) inspected. C1-C4 and four review pillars traversed.
- Reviewer independently built three routes in a temporary copy, ran targeted tests on both frozen and independently compiled scripts, and passed diff whitespace checks. No application sources were edited during or after review.
- Limits: global type check still fails with four pre-existing development-dependency/type diagnostics; project test runner remains missing (`vitest: command not found`). No installation occurred. Browser-level reduced-motion and no-JavaScript modes were not emulated; conclusions for those modes rely on source and compiled-script tests. No globally green validation, universal browser guarantee, or deployment is claimed.
- Only this delivery record was appended after snapshot verification; reviewed application code/assets/styles/tests remain unchanged. No commit, push, PR, or deployment occurred.

## Draft PR preparation

- User approval: exact reply "ok" to the consolidated plan creating `feat/alpine-title-depth` from current `main`, restoring frozen dependencies offline, rerunning checks, staging/committing/pushing task-owned files, and creating a Draft PR against `Fluidise/site:main`. Unused v2 candidate assets are explicitly excluded. No merge or deployment is authorized.
- Branch created from observed main `3d53b3c62d49934aba04f670e8565decfded17ee`, incorporating three upstream commits affecting README, package/lockfile and TypeScript configuration; hero application sources were preserved. Source base prior to this step was `392432c050d44c22ffee52992728160b1025d493`.
- `bun install --offline --frozen-lockfile` succeeded without downloads or lockfile changes. Main now uses TypeScript 7.0.2 and `astro sync && tsc --noEmit` for checks. `bun run check`, `bun run build`, `bun run lint`, `bun run test` (five existing unit tests), and `node src/components/Hero.test.mjs` passed on the prepared working tree.
- Initial formatting check identified only this contract and `Hero.test.mjs`; these are being formatted with the repository's installed Oxfmt. Required checks will be repeated on the staged candidate. Source changes are limited to task-owned delivery files.
- Existing GitHub workflow automatically merges non-Draft pull requests and can deploy main. Delivery must remain Draft; no ready-for-review transition is authorized.
- A fresh-context final review after formatting was proposed separately and awaits explicit authorization; no new review agent has been dispatched for that proposal. No commit or push has occurred yet.
