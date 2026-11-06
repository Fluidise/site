# Homepage critique fixes

## Authorized scope

The maintainer requested implementation of four accepted critique findings and selected collapsible previews beneath each mobile task. The proposed hero orientation cue was explicitly rejected. Preserve the hero except narrow name sizing, the Nocturne world, desktop scenes, task/install anchors, filters and copy actions.

## Implementation ownership

- `ToolCard.tsx` owns independent expansion state and named native button/content pairs. CSS collapses only homepage previews at up to 900px and preserves both desktop scenes. Each scene remains present once in server HTML; no viewport listener or new hydration owner is needed. The homepage's noscript CSS makes all examples available without JavaScript. Dedicated reference scenes remain unchanged.
- `global.css` makes the sticky hero viewport an inline-size container and sizes the title with `clamp(3rem, 26cqi, 38rem)`, following actual available width rather than scrollbar-inclusive viewport width. The existing display token remains the unsupported-unit fallback. The 94% bound and enlarged-text wrapping remain; short-landscape rules remain later in the cascade. No hero asset, renderer, scroll, material or navigation change is made.
- `ToolGrid.tsx` identifies the macOS Homebrew path, links each tool to its installation section and explains that the existing fully qualified install command adds its tap automatically. Commands themselves remain exact.
- `src/content/tools/relay.md` owns the corrected published status/version. No other tool metadata, command, example or Markdown body changes.

## Publication and installation evidence

On 2026-11-07, the owning GitHub API listed Relay [v0.1.0](https://github.com/Fluidise/relay/releases/tag/v0.1.0), published 2026-10-30, with `draft: false` and `prerelease: false`. The [Relay formula](https://github.com/Fluidise/homebrew-tap/blob/main/Formula/fluidise-relay.rb) was inspected through the contents API (blob SHA `859e4f5e64d52d9fb3598ef9302c36fb0e60eb57`): version 0.1.0, macOS dependency, Apple Silicon and Intel release URLs, and a Git dependency. This is publication/formula evidence, not execution of Homebrew or the CLI.

The current Clint formula also requires macOS. The existing site Clint version and broader documentation claims are outside this bounded status correction; they are not newly certified here. Homebrew's [tap installation documentation](https://github.com/Homebrew/brew/blob/main/docs/How-to-Create-and-Maintain-a-Tap.md), fetched through Context7, confirms that `brew install user/repository/formula` adds its tap automatically. React state/disclosure and MDN details documentation were also consulted before selecting the existing React owner's responsive button/content pattern.

## Verification

Automated proof covers server-rendered unique disclosure targets, labels, retained figures, exact installation destinations, noscript fallback presence, verified Relay metadata with all other metadata/body/fences preserved, available-width title CSS and all existing hero, design and navigation invariants. Browser checks exercise independent click/Enter/Space expansion, responsive transitions, no-script rendering and enlarged-text reflow. Detailed final results and limitations are recorded at completion below.

## Limits

No installation of Fluidise tools, production CLI execution, runtime performance claim, physical-device test, actual browser zoom, multi-browser certification or accessibility certification is implied. A sandboxed script-free iframe is a no-JavaScript fixture; 200% root-font sizing is not real browser zoom. No historical SHIP disposition or clean detector scan is reused as proof of this refinement. The hero orientation finding remains intentionally unimplemented.

## Final local results (2026-11-07)

Integrated the current `main` routing correction (`02f63604b661b703685769bf71d3e0a7811b4da6`) before delivery; the new installation links retain canonical trailing slashes. No routing configuration or Nginx change belongs to this task.

The final production build was inspected in the in-app browser at 320×740, 390×844, 600×800, 900×800, 901×800 and 1280×720. `.impeccable/review/homepage-critique-fixes/matrix.json` records actual measurements. All six have equal page scroll/client widths and a single-line loaded Barlow name at standard text size. The hero track remains exactly three viewport heights. Both previews are initially hidden through 900px; both are visible without toggle controls from 901px. Desktop scenes preserve the existing artwork and panel presentation. The sizing repair follows available container width at every size, rather than only masking the phone symptom and leaving intermediate widths broken.

On the final build, click and Enter/Space independently expand/collapse the two mobile previews, keep a 3px focus outline and expose matching accessible expansion state. The development filter now correctly shows zero tools because both collection entries are released; all installation rows remain present, and All tools restores both cards. Relay copy-success feedback appeared; exact clipboard bytes and forced-copy failure were not tested. Installation options reached `/tools/relay/#installation` and exposed the real Installation heading. Sampled ordinary-page warning/error logs were empty.

A final sandboxed no-script iframe exposes both scenes and hides both inert toggle controls. At 320px with a 32px root font, the disclosure opens successfully and page scroll/client widths remain 309px. This is enlarged root text, not actual browser zoom. Browser viewport overrides were reset and the temporary tab closed. Local screenshots were retained in the task's visualization output, not shipped as product assets.

Passing local commands: `bun run check`, `bun run build`, `bun run test` (17 tests), `bun run lint`, `bun run format:check`, and the compiled Design (five groups), Hero (eight groups) and Navbar (eight groups) scripts. Existing source-image and contour invariants remain covered. The automatic design hook found no deterministic issue in the edited components/styles; this is not a visual or accessibility certification.

Dependency bootstrap installed only the project's existing locked development dependencies; no manifest, lockfile or new dependency was introduced. Its Lefthook lifecycle regenerated the existing shared hook wrappers, including the current worktree binary fallback. Hooks remain enabled, and local dependencies are retained. The automatic switch-to-main recovery stash was preserved rather than dropped. Historical sidecar drift remains outside scope. The archived critique remains local; its orientation-cue suggestion was intentionally rejected, not implemented or claimed resolved.
