# Architecture Design: Image & Page Loading Performance Optimization

- **Document Revision**: 1.2.0
- **Status**: Approved by Maintainer & Implemented
- **Target File**: `docs/design/image-page-loading-optimization.md`
- **Owner**: `Fluidise/site` Maintainers
- **Context**: Fluidise Web Hub Performance & Loading Optimization (`fluidise.dev`)

---

## 1. Problem Statement & Strategic Objective

### 1.1 Context

`Fluidise/site` is the official web portal and documentation hub for the Fluidise developer experience suite. Built with Astro 7, React 19, and Tailwind CSS v4, the site features a rich painterly aesthetic ("Mineral Nocturne & Copper Dawn"), including an interactive WebGL & SVG contour hero, tool product scenes, and machine-readable agent documentation endpoints.

### 1.2 Root Bottlenecks Identified

A comprehensive performance and asset audit revealed five primary bottlenecks affecting Core Web Vitals (Largest Contentful Paint, Cumulative Layout Shift, Interaction to Next Paint) and perceived navigation responsiveness:

1. **Inactive Navigation Prefetching & Double-Fetch Hazard**:
   - `astro.config.mjs` configures `prefetch: { prefetchAll: false, defaultStrategy: 'hover' }`.
   - Because `prefetchAll` is `false` and no `<a>` tag across `src/` declares `data-astro-prefetch`, prefetching is completely inactive.
   - Crucially, in `nginx.conf`, all HTML page locations enforce `Cache-Control: public, max-age=0, must-revalidate`. If Astro's client prefetching were simply enabled without adjusting HTML caching, browsers would discard background prefetch responses immediately upon user click, triggering an expensive double-fetch.
2. **Missing Font Caching Directives in Nginx**:
   - In `nginx.conf`, static web fonts (`BarlowCondensed-Bold-latin.woff2`, `InstrumentSans-Variable-latin.woff2`) fall through to `location /` with `Cache-Control: public, max-age=0, must-revalidate`.
   - On every repeat visit or cross-page navigation, clients re-validate over 60 KB of self-hosted WOFF2 font files.
3. **Suboptimal LCP Priority & Lazy-Loading on Tool Pages**:
   - In `src/components/ToolPreview.tsx`, `<img className="tool-banner" loading="lazy" decoding="async" />` is hardcoded.
   - On tool specification pages (`/tools/[id]`), this banner is the dominant above-the-fold visual element (the LCP candidate). Applying `loading="lazy"` to an above-the-fold LCP image delays browser fetch initiation until layout calculation finishes, directly inflating LCP.
   - Furthermore, `fetchpriority` is omitted on tool pages.
4. **Hero Image Compression**:
   - In `src/components/Hero.astro`, both `plate` (1672×941) and `background` (1672×941) are converted via `getImage` at `quality: 90` with format `webp`.
   - WebP visual quality shows negligible human-discernible difference between quality 82 and 90, but yields a ~25-35% byte reduction across the hero plates.
5. **Heavy Social Share Image Asset**:
   - `src/layouts/Layout.astro` references `/brand/banner.png` (3,046,070 bytes, ~3.0 MB) as `og:image` and `twitter:image`.
   - Scraping agents and social preview generators download 3 MB for a single thumbnail preview.

### 1.3 Strategic Objective

Transform `Fluidise/site` loading speed and Core Web Vitals into an instantaneous, resource-efficient experience:

- Achieve near-instantaneous page transitions using Astro's native prefetch engine (`prefetchAll: true` on hover) paired with calibrated short-lived HTML caching (`max-age=60, stale-while-revalidate=300`) to guarantee prefetch reuse on navigation.
- Eliminate unnecessary re-validation of static font assets via dedicated Nginx cache headers (`public, max-age=31536000`).
- Optimize Largest Contentful Paint (LCP < 1.0s on broadband, < 1.8s on 4G) on `/tools/[id]` by eliminating lazy-loading on the doc-feature banner and applying `fetchPriority="high"`.
- Preserve cover-crop visual fidelity on tool banners while tuning hero compression (`quality: 82`).
- Reduce total transferred page weight by 40-60% across all routes.

---

## 2. Invariants & Architectural Constraints

1. **Static Pre-rendering Invariant (Zero Dynamic Runtime)**:
   - All assets, synthesized markdown pages, and HTML must remain statically built at compile time (`bun run build`). The runtime container remains an unprivileged static Nginx Alpine server without Node.js or Bun processes.
2. **Artwork Coordinate & Hash Invariant**:
   - The canonical PNG source images in `assets/plates/` (`suspended-archipelago.png`, `suspended-archipelago-background.png`) must not have their bytes or dimensions altered. Their SHA-256 hashes and dimensions are strictly bound to `assets/plates/suspended-archipelago-contours.json` and validated by `src/components/Hero.test.mjs`.
3. **Cover-Crop Visual Fidelity & Aspect Ratio Invariant**:
   - In `.tool-scene`, the panoramic tool banners (2048×768, ~2.67:1) are cover-cropped inside a container with `min-height: 400px` (rendered height 450px–520px on mobile). Because `object-fit: cover` is constrained by container height, the effective display width is always $\ge 1068\text{px}$. On modern $2\times$ and $3\times$ Retina displays, the browser must have access to high-density source candidates (1280w–2048w) to avoid visible blur or upscaling artifacts.
4. **Deterministic Test & Build Parity**:
   - All existing automated test assertions in `src/components/Design.test.mjs`, `src/components/Hero.test.mjs`, and `src/components/Navbar.test.mjs` must remain satisfied or consciously synchronized. Strict TypeScript checking (`bun run check`) must pass cleanly.
5. **Human UX & Accessibility Non-Degradation**:
   - Zero Cumulative Layout Shift (CLS = 0) by strictly preserving explicit `width` and `height` attributes on all image elements.

---

## 3. Structural Decisions & Implementation Specification

### 3.1 Instant Page Transitions: Astro Native Prefetching & Nginx HTML Cache

To make prefetching functional without triggering the browser's double-fetch penalty, two synchronized changes are required:

#### 3.1.1 Astro Configuration (`astro.config.mjs`)

```javascript
// astro.config.mjs
export default defineConfig({
  // ...
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  // ...
});
```

- **Mechanism**: Setting `prefetchAll: true` automatically attaches prefetch triggers to all internal relative links (`/tools/clint/`, `/tools/relay/`, `/manifesto/`).
- **Strategy**: On hover (typically 100-300ms before click), the browser prefetches the target page.

#### 3.1.2 Nginx HTML Cache Calibration (`nginx.conf`)

For prefetching to succeed, the browser's HTTP cache must be permitted to store the prefetched document long enough to fulfill the navigation click. In `nginx.conf`, adjust HTML cache headers from `max-age=0, must-revalidate` to a calibrated short window with stale-while-revalidate:

```nginx
# Root route with Agent Conneg
location = / {
  if ($wants_markdown = 1) {
    rewrite ^ /llms.txt break;
  }
  add_header Cache-Control "public, max-age=60, stale-while-revalidate=300";
  try_files /index.html =404;
}

# Tool routes with Agent Conneg & Trailing Slash handling
location ~ ^/tools/(?<tool_id>[^/]+)/?$ {
  if ($wants_markdown = 1) {
    rewrite ^ /tools/$tool_id.md break;
  }
  add_header Cache-Control "public, max-age=60, stale-while-revalidate=300";
  try_files $uri $uri/ $uri/index.html /index.html =404;
}

# Manifesto route with Agent Conneg
location ~ ^/manifesto/?$ {
  if ($wants_markdown = 1) {
    rewrite ^ /manifesto.md break;
  }
  add_header Cache-Control "public, max-age=60, stale-while-revalidate=300";
  try_files $uri $uri/ $uri/index.html /index.html =404;
}
```

- **Rationale**:
  - `max-age=60` guarantees that a document prefetched on hover remains completely fresh when the user clicks 150ms–2000ms later, fulfilling navigation from local browser cache in 0ms.
  - `stale-while-revalidate=300` allows edge caches to serve cached copies while revalidating asynchronously.
  - Any new deployment propagated to Nginx becomes active across all clients within 60 seconds.

### 3.2 Nginx Cache Optimization for Web Fonts and Static Assets

In `nginx.conf`, introduce explicit caching for web fonts:

```nginx
# Hashed static assets (Astro output in /_astro/)
location ^~ /_astro/ {
  expires 1y;
  add_header Cache-Control "public, max-age=31536000, immutable";
  try_files $uri =404;
}

# Self-hosted Web Fonts (WOFF2, WOFF) - Unhashed static assets
location ~* \.(?:woff2?|ttf|otf|eot)$ {
  expires 1y;
  add_header Cache-Control "public, max-age=31536000";
  add_header Access-Control-Allow-Origin "*";
  try_files $uri =404;
}

# Brand assets and images
location ~* \.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$ {
  expires 30d;
  add_header Cache-Control "public, max-age=2592000";
  try_files $uri =404;
}
```

- **Important Safeguard**: Unlike hashed files in `/_astro/`, fonts in `public/fonts/` are unhashed. Therefore, `immutable` is explicitly **omitted** from `/fonts/*` to allow browser revalidation if a font file is ever updated, adhering to RFC 8246.

### 3.3 Tool Banner Loading & Prioritization

#### 3.3.1 Component Interface Refinement (`src/components/ToolPreview.tsx`)

`ToolPreview` must distinguish between above-the-fold primary hero usage and below-the-fold catalog usage, adhering to React 19 camelCase typing:

```typescript
export interface ToolPreviewProps {
  toolId: string;
  banner: ToolBanner;
  priority?: 'high' | 'auto';
  loading?: 'eager' | 'lazy';
}

export function ToolPreview({
  toolId,
  banner,
  priority = 'auto',
  loading = 'lazy',
}: ToolPreviewProps) {
  // ...
  return (
    <figure className="tool-scene">
      <img
        className="tool-banner"
        src={banner.src}
        srcSet={banner.srcSet}
        sizes={banner.sizes}
        width={banner.width}
        height={banner.height}
        alt=""
        loading={loading}
        decoding="async"
        fetchPriority={priority === 'high' ? 'high' : undefined}
      />
      {/* ... */}
    </figure>
  );
}
```

#### 3.3.2 Route-Level Priority Assignment

- **Tool Specification Page (`src/pages/tools/[id].astro`)**:
  - The banner is prominently positioned in `.doc-feature` above the fold.
  - Usage: `<ToolPreview toolId={tool.id} banner={banner} loading="eager" priority="high" />`.
  - Eliminates lazy-loading delay and signals the browser preload scanner to immediately fetch the tool banner as the LCP candidate.
- **Catalog Page (`src/components/ToolCard.tsx`)**:
  - The banner is located below the hero fold inside `.task-list`.
  - Usage: Retains `loading="lazy"` and default priority (`priority="auto"`), preventing bandwidth contention with initial hero rendering.

#### 3.3.3 Cover-Crop Responsive `sizes` Calculation (`src/lib/tool-banner.ts`)

In `.tool-scene`, the panoramic banner (2048×768, aspect ratio 2.67:1) covers a container with `min-height: 400px` (rendered height 450px–520px).

- To cover a 400px–450px height, the rendered display width of the image is at least $450\text{px} \times 2.667 = 1200\text{px}$.
- On desktop (> 1024px), the container width is ~500px–600px with height 400px–450px (effective image display width ~1068px–1200px).
- On mobile (≤ 600px), container height remains ~450px, requiring effective image display width ~1200px.
- On $2\times$ Retina displays (standard on modern phones, tablets, and laptops), the required physical pixel width is $1200 \times 2 = 2400\text{px}$.
- **Resolution**:
  Because the height-constrained cover crop universally requires at least 1068px–1200px CSS display width across all breakpoints, setting `sizes="100vw"` on mobile causes severe upscaling blur on Retina screens.
  To balance resolution fidelity with bandwidth:
  ```typescript
  // src/lib/tool-banner.ts
  // Tall cover crops (aspect ratio 2.67:1 covering min-height 400px) require
  // an effective display width of at least 1068px across viewports.
  sizes: '(min-width: 1024px) 1068px, 100vw',
  ```
  Or retain the explicit source-width baseline (`2048px`) which guarantees that Retina screens receive full-fidelity assets without blur, as verified by `Design.test.mjs`.

### 3.4 Hero Image Optimization (`src/components/Hero.astro`)

In `src/components/Hero.astro`:

```astro
const [artwork, sky] = await Promise.all([
  getImage({ src: plate, format: 'webp', quality: 82 }),
  getImage({ src: background, format: 'webp', quality: 82 }),
]);
```

- **Quality Tuning**: Adjust WebP quality from 90 to 82. For painterly cloud landscapes, WebP quality 82 produces an imperceptible difference while reducing plate payload by ~25-35%.
- **Prioritization**:
  - `artwork` (fallback LCP): keeps `fetchpriority="high" loading="eager" decoding="async"`.
  - `sky` (background WebGL/depth plate): retains `loading="eager" decoding="async"` without `fetchpriority`, letting the browser prioritize the primary foreground LCP candidate.

### 3.5 In-Place Social Sharing Image Optimization (`public/brand/banner.png`)

- Compress `public/brand/banner.png` in-place using oxipng/pngquant to reduce its size from 3,046,070 bytes down to < 300 KB.
- Boundary: Confined strictly to `public/brand/banner.png`. `Layout.astro` remains unmodified, preserving existing URL bindings and test expectations.

---

## 4. Change Boundaries

| Action     | Target File                      | Description of Planned Modification                                                          |
| :--------- | :------------------------------- | :------------------------------------------------------------------------------------------- |
| **Modify** | `astro.config.mjs`               | Set `prefetch.prefetchAll: true` and `defaultStrategy: 'hover'`.                             |
| **Modify** | `nginx.conf`                     | Set HTML `max-age=60, stale-while-revalidate=300`; add font caching (1y without immutable).  |
| **Modify** | `src/components/ToolPreview.tsx` | Support `priority` and `loading` props; use React 19 `fetchPriority`.                        |
| **Modify** | `src/pages/tools/[id].astro`     | Pass `loading="eager"` and `priority="high"` to `ToolPreview`.                               |
| **Modify** | `src/components/Hero.astro`      | Adjust WebP quality to 82 for both plates.                                                   |
| **Modify** | `src/components/Design.test.mjs` | Synchronize test assertions to allow `loading="eager"` and `fetchpriority` on `/tools/[id]`. |
| **Modify** | `public/brand/banner.png`        | In-place compression from 3.0 MB down to < 300 KB.                                           |

---

## 5. Verification Plan & Test Matrix

### 5.1 Static Build & Type Safety

- `bun run check`: Ensure strict TypeScript conformance across React 19 JSX attributes (`fetchPriority`) and Astro components.
- `bun run build`: Ensure deterministic static asset output in `dist/`.

### 5.2 Test Suite Parity

- `node src/components/Hero.test.mjs`: Verify that SHA-256 hashes of canonical source plates in `assets/plates/` and WebGL cloud lifecycle remain 100% intact.
- `node src/components/Navbar.test.mjs`: Verify dock lifecycle and SVG parsing.
- `node src/components/Design.test.mjs`: Synchronize banner assertion tests with eager loading on `/tools/[id]`.
- `bun run test`: Vitest suite execution.

### 5.3 Network & Performance Verification

- Inspect built HTML files in `dist/`:
  - `dist/index.html`: Confirm prefetch scripts or attributes are present, `loading="lazy"` on tool cards, and `fetchpriority="high"` on hero artwork.
  - `dist/tools/clint/index.html`: Confirm `fetchpriority="high"` and `loading="eager"` on the doc-feature banner.
- Header verification via Nginx container test:
  - Request `/fonts/InstrumentSans-Variable-latin.woff2` and verify `Cache-Control: public, max-age=31536000` (without `immutable`).
  - Request `/tools/clint/` and verify `Cache-Control: public, max-age=60, stale-while-revalidate=300`.

---

## 6. Risks, Trade-offs & Mitigations

| Risk / Decision                                    | Impact | Trade-off / Mitigation                                                                                                                                                                                           |
| :------------------------------------------------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hover Prefetch Bandwidth Overhead**              | Low    | `prefetchAll: true` fetches HTML on hover. Since Fluidise pages are lean static HTML (~15-25 KB gzipped), background prefetching introduces negligible network cost while delivering instant page transitions.   |
| **60s HTML Cache Delay on Deployment**             | Low    | Setting HTML `max-age=60` allows instant prefetch reuse. In the event of a deployment, existing clients see updates within 60 seconds, which is standard for web documentation portals.                          |
| **Cover-Crop Fidelity vs. Bandwidth**              | Medium | Cover-cropping a 2.67:1 image in a 400px+ height container requires high pixel density. The design balances this by preserving source resolution for Retina displays while optimizing compression.               |
| **Breaking Existing `Design.test.mjs` Assertions** | Medium | `Design.test.mjs` contains explicit assertions (`assert(tag.includes('loading="lazy"'))`). These assertions were written for an earlier milestone and must be updated to allow eager loading on tool spec pages. |
| **Plate Hash Invalidation Risk**                   | High   | Never touch `assets/plates/*.png` source files. Astro's `getImage` operates on output compilation; source files remain identical to ensure `Hero.test.mjs` hash checks pass.                                     |

---

## 7. Review & Approval State

- **Substantive Body Revision Hash**: `9eb99d60743dfdca9805d60a7de7d547a19437c430bcdaf03181f8fffaec22a8`
- **Digest Domain**: Substantive markdown body preceding section 7 (`## 7. Review & Approval State`), UTF-8 encoded, SHA-256.
- **Review Coverage**:
  - `egm-design-critic`: Architectural fit, scope boundaries, contracts, performance and CWV trade-offs.
  - Independent revalidation: **Resolved all findings (BLOCKER-1, BLOCKER-2, MAJOR-1, MAJOR-2, MAJOR-3, NIT-1, NIT-2)**.
- **Resolved Findings**:
  - _Finding 1 (Blocker - Layout Error in `sizes` & Mobile Blur)_: Resolved. Documented container height constraints ($400\text{px}+$), aspect ratio ($2.67:1$), effective display width ($1068\text{px}+$), and Retina DPR multiplier, explaining why Retina screens require full-fidelity source candidates.
  - _Finding 2 (Blocker - Astro Prefetch & Nginx `max-age=0` Double-Fetch)_: Resolved. Reconciled Nginx HTML caching with `max-age=60, stale-while-revalidate=300` to allow browser prefetch cache fulfillment on click.
  - _Finding 3 (Major - React 19 `fetchpriority` vs `fetchPriority`)_: Resolved. Standardized on camelCase `fetchPriority` conforming to React 19 types.
  - _Finding 4 (Major - `immutable` on Unhashed Font URLs)_: Resolved. Omitted `immutable` from `/fonts/*` to prevent irreversible 1-year cache locking.
  - _Finding 5 (Major - Social Image Scope Ambiguity)_: Resolved. Confined scope strictly to in-place compression of `public/brand/banner.png` (< 300 KB), leaving `Layout.astro` unchanged.
  - _Finding 6 (Nit - Phantom `sky` Priority Optimization)_: Resolved. Corrected text to reflect that `sky` already omits high priority.
  - _Finding 7 (Nit - Speculative `avif` Addition)_: Resolved. Clarified current WebP pipeline and rationale.
- **Human Approval**: Explicitly approved by maintainer. Implementation completed and verified across all test suites.
