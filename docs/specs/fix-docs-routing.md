# Design Specification: Documentation Page Routing and Canonical URL Architecture

**Status:** Implemented / Verified  
**Date:** 2026-11-06  
**Authors:** Primary AI Agent  
**Target File:** `docs/specs/fix-docs-routing.md`

---

## 1. Problem Statement & Context

In production on `https://fluidise.acrazie.dev`, clicking on documentation links or directly accessing tool pages (e.g., `https://fluidise.acrazie.dev:8080/tools/clint/` or `https://fluidise.acrazie.dev/tools/clint`) fails completely.

### 1.1 Root Cause Telemetry

1. **Internal Port Leakage via Nginx Redirection:**
   - The web server runs in an unprivileged Docker container (`nginxinc/nginx-unprivileged:alpine`) listening on container port `8080` (`listen 8080;` in `nginx.conf`).
   - Dokploy's Traefik reverse proxy terminates TLS at edge and routes traffic to the container port `8080` via plain HTTP. Cloudflare fronts the service with `Always Use HTTPS`.
   - Astro's Static Site Generation (SSG) compiles pages into directory indexes:
     - `dist/tools/clint/index.html`
     - `dist/tools/relay/index.html`
   - When a client accesses `/tools/clint` (without trailing slash), Nginx's `try_files $uri $uri/ ...` directive detects `/usr/share/nginx/html/tools/clint` is a directory and issues a canonical 301 trailing slash redirect.
   - In Nginx, `port_in_redirect` is `on;` by default, and `absolute_redirect` is `on;` by default. Nginx constructs the `Location` header using the listening port (`8080`) and the scheme of the upstream connection (`http://`):
     ```http
     HTTP/2 301
     location: http://fluidise.acrazie.dev:8080/tools/clint/
     ```
   - Cloudflare edge proxy only supports plain HTTP on port 8080. It does NOT support HTTPS on port 8080. When modern browsers or Cloudflare attempt HTTPS upgrade on port 8080 (`https://fluidise.acrazie.dev:8080/tools/clint/`), the TLS connection fails immediately with `ERR_SSL_PROTOCOL_ERROR` (`tlsv1 alert protocol version`).

2. **Inconsistent Internal Link Paths:**
   - Internal navigation links across components (`Footer.astro`, `ToolCard.tsx`, `ToolGrid.tsx`, `ManifestoSection.astro`, `src/pages/tools/[id].astro`) reference tool paths without trailing slashes (`href="/tools/clint"`, `href="/tools/relay"`, `href={`/tools/${tool.id}`}`).
   - Every internal click currently forces a round-trip 301 redirect cycle.

3. **Domain Discrepancy & Staging Parameterization:**
   - `astro.config.mjs` currently defines `site: 'https://fluidise.dev'`, while the live reachable deployment is hosted on `https://fluidise.acrazie.dev`. Canonical URLs and OpenGraph metadata therefore point to a domain that fails DNS resolution (`NXDOMAIN`).
   - However, hardcoding the staging host directly into the build configuration would create architectural anti-patterns and SEO drift when the apex domain (`fluidise.dev`) goes live.

---

## 2. Objectives & Scope

### 2.1 Objectives

- **Zero Internal Port Leakage:** Completely eliminate exposure of internal container ports (`8080`) or schemes (`http://`) in HTTP responses.
- **Zero-Hop Internal Navigation:** Internal links must directly resolve to canonical static resources with HTTP 200 without intermediate redirects.
- **Deterministic Canonical Redirects:** Any direct entry of slashless URLs (`/tools/clint`) must cleanly redirect using a relative path (`/tools/clint/`).
- **Flexible Domain Alignment:** Production builds default to the reachable domain `https://fluidise.acrazie.dev` via environment configuration (`process.env.SITE_URL`), preventing SEO drift and enabling zero-code apex cutover.
- **Operational Edge Invalidation:** Invalidate cached 301 redirects on Cloudflare upon deployment to prevent stale poisoned redirects.

### 2.2 Scope Boundaries

- **In Scope:**
  - `nginx.conf`: Explicit directive configuration for redirect relativity (`absolute_redirect off;`), port suppression (`port_in_redirect off;`), and dummy host suppression (`server_name_in_redirect off;`).
  - `astro.config.mjs`: `trailingSlash: 'always'` and parameterized `site: process.env.SITE_URL ?? 'https://fluidise.acrazie.dev'`.
  - `src/layouts/Layout.astro`: Update fallback URL to match the parameterized environment default.
  - Component templates and Markdown links: Updating all internal `/tools/<id>` references to `/tools/<id>/`.
  - Automated tests: Updating Vitest and post-build assertions in `src/components/Design.test.mjs` and `src/components/ToolGrid.test.tsx`.
- **Out of Scope:**
  - Infrastructure changes to Dokploy or DNS registrar zone management.
  - Markdown content alterations or tool specification schema changes.
  - Runtime dependency additions.

---

## 3. Structural Decisions & Invariants

### Decision 1: Nginx Relative Redirects & Defense-in-Depth Hardening

- **Choice:** Add the following directives inside the `server` block in `nginx.conf`:
  ```nginx
  absolute_redirect off;
  port_in_redirect off;
  server_name_in_redirect off;
  ```
- **Rationale:**
  - `absolute_redirect off;`: Instructs Nginx to emit relative `Location` headers (e.g. `Location: /tools/clint/`) when executing directory slash redirects or standard rewrites (RFC 7231 / RFC 9110).
  - `port_in_redirect off;`: Enforces that Nginx never appends the container listen port `8080`.
  - `server_name_in_redirect off;`: Prevents Nginx from falling back to the dummy `server_name _;` in any redirection context.
- **Trade-off:** None; fully compliant with modern browser standards.

### Decision 2: Astro Trailing Slash Policy (`trailingSlash: 'always'`)

- **Choice:** Set `trailingSlash: 'always'` in `astro.config.mjs`.
- **Rationale:** Astro generates static files at `dist/tools/<id>/index.html`. Setting `trailingSlash: 'always'` ensures Astro builds internal URLs with trailing slashes and aligns router path helpers with actual directory structures.
- **Trade-off:** Requires updating existing internal links and unit test assertions that check for slashless URLs, but eliminates client-side redirect latency.

### Decision 3: Internal Link Normalization

- **Choice:** Update all UI components generating tool links:
  - `src/components/Footer.astro`: `/tools/clint/` and `/tools/relay/`.
  - `src/components/ToolCard.tsx`: `/tools/${tool.id}/`.
  - `src/components/ToolGrid.tsx`: `/tools/${tool.id}/`.
  - `src/pages/tools/[id].astro`: `/tools/${sibling.id}/`.
  - `src/components/ManifestoSection.astro`: `/tools/clint/#example-output`.
- **Rationale:** Prevents internal navigation from hitting Nginx directory redirect logic.

### Decision 4: Parameterized Site Base URL

- **Choice:** In `astro.config.mjs`:
  ```javascript
  site: process.env.SITE_URL ?? 'https://fluidise.acrazie.dev',
  ```
  And in `src/layouts/Layout.astro`:
  ```typescript
  const canonicalUrl = new URL(Astro.url.pathname, Astro.site ?? 'https://fluidise.acrazie.dev')
    .href;
  const canonicalImageSrc = new URL(
    '/brand/banner.png',
    Astro.site ?? 'https://fluidise.acrazie.dev',
  ).href;
  ```
- **Rationale:** Immediately resolves canonical links and OpenGraph tags to the working production domain (`https://fluidise.acrazie.dev`), while allowing instant cutover to `https://fluidise.dev` via environment variable or default configuration when the apex domain is configured.

---

## 4. Affected Contracts & Invariants

1. **Routing Contract:**
   - Request `GET /tools/clint/` -> HTTP 200 (serves `/usr/share/nginx/html/tools/clint/index.html`).
   - Request `GET /tools/clint` -> HTTP 301 `Location: /tools/clint/` (strictly relative, no scheme, no host, no port).
   - Request `GET /tools/relay/` -> HTTP 200 (serves `/usr/share/nginx/html/tools/relay/index.html`).
   - Request `GET /tools/relay` -> HTTP 301 `Location: /tools/relay/` (strictly relative).
2. **Canonical Link Contract:**
   - Every internal link targeting tool documentation conforms to `/tools/<id>/` (or `/tools/<id>/#<anchor>`).
3. **Security & Protocol Invariant:**
   - Internal container port `8080` is NEVER returned in any client-facing response header.
4. **Edge Invalidation Contract:**
   - Following deployment, Cloudflare edge cache must be cleared for `/tools/*` (or entire domain cache purged) to ensure stale 301 redirects containing `:8080` are removed.

---

## 5. Change Boundaries & Implementation Surface

When authorized to enter implementation, modifications are strictly confined to:

| File                                    | Change Scope                                                                                                           |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `nginx.conf`                            | Add `absolute_redirect off;`, `port_in_redirect off;`, and `server_name_in_redirect off;` in `server` block.           |
| `astro.config.mjs`                      | Add `trailingSlash: 'always'` and parameterized `site: process.env.SITE_URL ?? 'https://fluidise.acrazie.dev'`.        |
| `src/layouts/Layout.astro`              | Update fallback domain from `'https://fluidise.dev'` to `'https://fluidise.acrazie.dev'`.                              |
| `src/components/Footer.astro`           | Update tool links to include trailing slashes (`/tools/clint/`, `/tools/relay/`).                                      |
| `src/components/ToolCard.tsx`           | Update link `href` to `/tools/${tool.id}/`.                                                                            |
| `src/components/ToolGrid.tsx`           | Update link `href` to `/tools/${tool.id}/`.                                                                            |
| `src/components/ManifestoSection.astro` | Update anchor link to `/tools/clint/#example-output`.                                                                  |
| `src/pages/tools/[id].astro`            | Update sibling link `href` to `/tools/${sibling.id}/`.                                                                 |
| `src/components/Design.test.mjs`        | Align line 48 anchor assertion (`/tools/clint/#example-output`) and line 80 sibling link assertion (`/tools/${...}/`). |
| `src/components/ToolGrid.test.tsx`      | Align line 87 test assertion (`/tools/example/`).                                                                      |

---

## 6. Verification & Test Plan

1. **Static Analysis & Type Checking:**

   ```bash
   bun run check
   ```

   Confirm Astro diagnostics pass with 0 errors/warnings.

2. **Unit & Component Testing:**

   ```bash
   bun run test
   ```

   Executes Vitest suite (`ToolGrid.test.tsx`, `ToolPreview.test.tsx`, `utils.test.ts`).

3. **Static Site Build:**

   ```bash
   bun run build
   ```

   Generates static build in `dist/`, including `/tools/clint/index.html` and `/tools/relay/index.html`.

4. **Post-Build Integration & Contract Testing:**

   ```bash
   node src/components/Design.test.mjs
   node src/components/Navbar.test.mjs
   node src/components/Hero.test.mjs
   ```

   Validates rendered HTML artifacts in `dist/` against canonical link and layout contracts.

5. **Containerized Nginx Behavior Test:**

   ```bash
   docker build -t fluidise-test .
   docker run -d -p 8888:8080 --name test-fluidise fluidise-test

   # Verify relative redirect without internal port leak:
   curl -I http://localhost:8888/tools/clint
   # EXPECTED: Location: /tools/clint/ (strictly relative, no :8080, no :8888, no http://)

   # Verify canonical direct entry:
   curl -I http://localhost:8888/tools/clint/
   # EXPECTED: HTTP/1.1 200 OK

   docker rm -f test-fluidise
   ```

6. **Operational Edge Verification:**
   - In Cloudflare Dashboard, trigger "Purge Everything" (or purge `/tools/*`).
   - Verify live URL with cache bypass:
     ```bash
     curl -sI https://fluidise.acrazie.dev/tools/clint
     ```
     Confirm `Location: /tools/clint/` and no `:8080`.

---

## 7. Review & Approval State

<!-- EGM_REVIEW_STATE_START -->

- **Substantive Digest Domain:** Sections 1 through 6 inclusive.
- **Content SHA256:** `55371442501d2be22befb2aa2e38633c4207c31caeaf378516fd4b50e2ac0401`
- **Reviewed Revision:** Current worktree (`fix_docs_pages` @ `165832e`)
- **Review Coverage Completed:**
  - `egm-design-critic`: Architectural fit, invariants, failure cases, and implementation readiness evaluated against `feature-spec-standard.md`, `zoom-out-standard.md`, and `implementation-readiness-standard.md`. Findings on domain parameterization, test execution ordering, and Cloudflare cache purge operational risk addressed and resolved.
  - `egm-codebase-details`: Contract alignment verified against `nginx.conf`, `astro.config.mjs`, `Dockerfile`, `Layout.astro`, components, and test suites. Test runner discrepancies and change boundaries reconciled.
- **Open Material Findings:** None.
- **Settled Decisions:**
  - Strict trailing slash strategy (`trailingSlash: 'always'` + Nginx relative redirects) approved by maintainer.
  - Active production domain default `https://fluidise.acrazie.dev` with environment parameterization `process.env.SITE_URL` approved.
  - Nginx defense-in-depth (`absolute_redirect off;`, `port_in_redirect off;`, `server_name_in_redirect off;`) settled.
  - Verification sequence explicitly separated into pre-build Vitest and post-build Node integration runs settled.
- **Status:** Complete / Ready for Final Approval.

<!-- EGM_REVIEW_STATE_END -->
