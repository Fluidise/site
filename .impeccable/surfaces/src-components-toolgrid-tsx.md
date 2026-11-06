---
version: 1
slug: 'src-components-toolgrid-tsx'
primary_target: 'src/components/ToolGrid.tsx'
related_targets: ['src/styles/global.css', 'src/components/ToolGrid.test.tsx']
---

# Catalog arrival

Mode: Read/discovery (catalog). This is a surface mode, not a replacement for the site's other modes.

## Direction contract (2026-11-06)

THESIS: Give immediate access to the catalog through a compact introduction and restrained text controls.
OWN-WORLD: Preserve established Nocturne charcoal, Instrument Sans, existing neutral tokens and the existing painted tool presentations. This is an ordinary local extension, not a new visual world or global system replacement.
STORY: Read the concise introduction, optionally filter by status and follow the existing native tool links. Installation remains independently available.
FIRST VIEWPORT: This contract concerns catalog arrival, not the protected hero. Keep “Start with the job.” and “Independent tools. Choose the one your workflow needs.”, then a compact filter/count toolbar and the existing painted presentations.
FORM: User-pinned, code-led narrow refinement, exempt from concept-seed exploration under the local-extension rules. The maintainer approved the shape and explicitly requested implementation. No new imagery, animation, dependency or global token is required.
FINISH: A fresh independent visual/source finish review returned `SHIP` for this narrow scope after inspecting all 12 captures; no material fix was requested. This is not a new approval of the whole site.

## Installed treatment and preservation

The catalog header has no viewport-bound minimum height. Its two groups have a 24px grid gap and 24px bottom margin; the retained subtitle has an 8px top margin. The status fieldset and native count output share a wrapping flex toolbar with 8px row and 24px column gaps. The fieldset wraps its choices with 4px row and 24px column gaps, allowing the count to follow naturally on narrow viewports.

Only All tools, Released and In development change treatment. They are transparent, borderless, square text buttons with the existing label typography, 12px vertical padding and minimum 44px height/width. Secondary ink becomes Primary ink on hover or selection. Only the selected label has a 1px neutral underline with an 8px underline offset; there is no rounded box, fill, blue marker, shadow or new transition. Focus remains independent of selection: a 3px neutral Primary ink outline with 4px offset, switching to system Highlight under the source forced-color rule.

The named fieldset, native buttons, `aria-pressed`, `aria-controls="tool-results"` and native output announcement remain intact. Filtering changes only the task results/count. The unfiltered installation collection retains both rows and its commands/actions. The existing shared `glacial-control` block remains byte-identical; terminal format/sample controls and other buttons do not inherit this catalog exception. Hero, tool cards and paintings, dock blinking, installation content and all other content remain unchanged by this task. Pending Navbar work belongs to its own surface record and is preserved.

## Evidence and limits

Native evidence is recorded in `/Users/acrazie/.codex/visualizations/2026/11/06/01a1b1fd-3431-7f03-abe8-5e9e266cdb67/catalog-entry/`: 12 PNG captures and `metrics.json` with 13 state records. The matrix includes desktop 1280×720, mobile 390×844, narrow 320×720, wide 1527×900 and intermediate/default 666×1193 views, filtered states, selected and unselected focused choices, and 200%-root-font fixtures. The fixtures were removed; root-font enlargement is not actual browser zoom.

The primary implementation reports no page-level horizontal overflow, transparent/shadow-free choices, only the selected label underlined, normal-text targets measuring 45px high, a visible neutral 3px/4px focus outline, exact task/count updates and both installation rows retained. Recorded native interactions include Space, Enter, Tab and pointer click. No console warnings or errors were observed. Captures are evidence only, not new production raster assets.

The independent finish reviewer inspected all 12 captures and the scoped source, returned `SHIP` and independently reran all six targeted ToolGrid tests successfully. The primary implementation reports the full 11-test suite, check/build/lint/format checks, built Design/Navbar/Hero suites and whitespace checks passing. This documentation pass inspected source, system/product documents and supplied evidence records; it did not rerun browsers, builds or tests.

Native forced colors, actual browser zoom, physical devices, multiple browsers and screen-reader behavior were not certified. Visual/source review is not WCAG, performance, release or deployment evidence. No Git shipping is included. DESIGN.md receives only the affected local prose updates; its frontmatter and the existing `.impeccable/design.json` remain unchanged. The sidecar's historical catalog filter previews are known drift and are not repaired or canonized by this ordinary extension.
