# Architecture Design: Agent & LLM-Friendly Web Hub for Fluidise

- **Document Revision**: 1.1.0-draft
- **Status**: Reviewed & Implementation-Ready (Awaiting Human Approval)
- **Target File**: `docs/design/llm-agent-friendly.md`
- **Owner**: `Fluidise/site` Maintainers
- **Context**: Fluidise Developer Experience Suite (`fluidise.dev`)

---

## 1. Problem Statement & Strategic Objective

### 1.1 Context

Fluidise is an "Agent-First" developer experience suite providing deterministic, standalone Unix-style CLI tools (such as `fluidise-clint` and `fluidise-relay`). The official site (`fluidise.dev`) currently serves human developers through an Astro 7 + React 19 + Tailwind CSS v4 stack with an atmospheric dark theme ("Mineral Nocturne & Copper Dawn").

### 1.2 Root Problem

Modern documentation websites are engineered almost exclusively for human visual consumption via DOM trees, heavy CSS styling, JavaScript hydration islands, and client-side layout mechanics. When an autonomous AI coding agent (e.g., Antigravity, Claude Code, Cursor, Cline, Codex) or a CLI agent (`curl`, `wget`) inspects `https://fluidise.dev` or a dedicated tool page like `https://fluidise.dev/tools/clint`:

1. **Markup Bloat & Token Waste**: Parsing raw HTML and bundled script tags incurs unnecessary token expenditure and context window pollution.
2. **Missing Discovery Standards**: Lack of standardized machine entry points (`/llms.txt`, `/llms-full.txt`, `/tools.json`) requires multi-step recursive crawling and heuristic link scraping.
3. **Absence of Content Negotiation**: CLI tools requesting documentation with `Accept: text/markdown` receive the full HTML document rather than raw, prompt-ready markdown.
4. **Disjointed Agent Tooling Metadata**: Agents cannot natively extract verified CLI execution flags, deterministic tool schemas, or verification guarantees in machine-parseable JSON or clean structured markdown.

### 1.3 Strategic Objective

Transform `Fluidise/site` into the gold standard of **Agent-First & LLM-Friendly** documentation hubs:

- Provide instantaneous, token-efficient, and deterministic access to all documentation, tool specifications, and installation commands for autonomous agents.
- Support industry standards (`llms.txt`, `llms-full.txt`, JSON-LD `SoftwareApplication`, OpenAPI/JSON catalogs).
- Implement HTTP Content Negotiation via Nginx so both humans and agents querying the same URL receive their optimal payload format.
- Preserve 100% of human UX, visual fidelity, and static site performance with zero server-side runtime overhead.

---

## 2. Invariants & Architectural Constraints

1. **Static Pre-rendering Invariant (Zero Dynamic Runtime)**:
   - All assets (HTML, synthesized Markdown, JSON catalogs, `llms.txt`) must be deterministically generated at build time (`bun run build`).
   - The production container must remain an unprivileged, static Nginx server (`nginx:alpine-slim` on port 8080) with no Node.js/Bun runtime process.
2. **Deterministic Parity Invariant**:
   - The markdown served to agents via `/tools/[id].md` or content negotiation must originate from the exact same single source of truth files (`src/content/tools/[id].md`, `src/content/manifesto.md`) rendered into HTML for human browsers. No separate, drifting copies.
3. **Human UX Non-Degradation Invariant**:
   - Zero regression in Core Web Vitals (LCP, CLS, INP), accessibility (a11y), responsive layouts, or visual aesthetics.
4. **Security & Data Isolation**:
   - No sensitive workspace paths, private repository endpoints, or unverified script executions are exposed in agent feeds. All published commands must adhere strictly to official distribution channels (Homebrew tap, Cargo registry).
5. **Accurate Protocol & Contract Representation**:
   - Do not advertise non-existent protocol implementations (such as JSON-RPC MCP servers for native CLI binaries). Tools are accurately represented as deterministic CLI binaries with standard POSIX arguments, flags, and exit codes.

---

## 3. Structural Decisions & Architecture

```
                                  [ Incoming Request ]
                                           │
                                           ▼
                                 [ Nginx Edge Router ]
                                 (Port 8080 / Alpine)
                                           │
                     ┌─────────────────────┴─────────────────────┐
                     │                                           │
           Accept: text/markdown                               Default
           (Strict Header Check)                           (Human Browser)
                     │                                           │
                     ▼                                           ▼
          [ Serve Static .md / .txt ]                   [ Serve Static HTML / JS ]
          ├── /llms.txt                                 ├── /index.html
          ├── /llms-full.txt                            ├── /tools/clint/index.html
          ├── /tools.json                               └── /tools/relay/index.html
          └── /tools/:id.md
```

### Decision 3.1: Dual Static Generation (Astro Endpoints)

- **Choice**: Implement Astro static endpoint routes (`src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `src/pages/tools.json.ts`, `src/pages/tools/[id].md.ts`, and `src/pages/manifesto.md.ts`).
- **Rationale**: Astro's Content Layer API (`astro:content`) allows programmatic access to all tool collections during build time. Emitting `.md` and `.txt` files directly into `dist/` preserves the SSG paradigm with no extra build tooling.
- **Alternatives Rejected**:
  - _Dynamic SSR with on-the-fly markdown transformation_: Rejected due to operational complexity, container resource requirements, and latency.
  - _Monolithic manual `public/llms.txt`_: Rejected because manual files drift from content changes in `src/content/tools/*.md`.

### Decision 3.2: Content Negotiation & MIME Configuration in Nginx

- **Choice**:
  1. Define explicit Markdown MIME type and UTF-8 charset in `nginx.conf`:
     ```nginx
     types {
       text/markdown md;
     }
     charset utf-8;
     charset_types text/markdown text/plain text/css application/json application/javascript;
     ```
  2. Add `text/markdown` to `gzip_types`:
     ```nginx
     gzip_types text/plain text/markdown text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;
     ```
  3. Strict Content Negotiation Mapping:
     - Only clients explicitly advertising `text/markdown` in their `Accept` header trigger Markdown routing.
     - Clients requesting standard browser types (`text/html`, `*/*`, or fallback `text/plain;q=...`) receive HTML.
     ```nginx
     map $http_accept $wants_markdown {
       default 0;
       ~*text/markdown 1;
     }
     ```
  4. Trailing Slash Normalization & Clean Routing:
     - For requests matching `/tools/(.*)` where `$wants_markdown = 1`, Nginx checks `/tools/$1.md` before directory redirects:
     ```nginx
     location ~ ^/tools/(?<tool_id>[^/]+)/?$ {
       if ($wants_markdown = 1) {
         add_header Content-Type "text/markdown; charset=utf-8";
         rewrite ^ /tools/$tool_id.md break;
       }
       add_header Cache-Control "public, max-age=0, must-revalidate";
       try_files $uri $uri/ $uri/index.html /index.html =404;
     }
     ```

### Decision 3.3: Synthesized Payload Contract for `/tools/[id].md.ts`

- **Choice**: The endpoint does NOT dump raw unparsed YAML frontmatter. Instead, it extracts the structured Content Layer collection schema and synthesizes a prompt-ready, token-efficient Markdown document:

  ````markdown
  # {name}

  > **Status**: {status} ({version})
  > **Distribution**: Standalone Native Binary
  > **Repository**: {repoUrl}

  ## Tagline & Overview

  {tagline}

  {summary}

  ## Quick Installation

  ```bash
  # Homebrew
  {brewCommand}

  # Cargo
  {cargoCommand}
  ```
  ````

  ## Operational Guarantees
  - {keyFeature[0]}
  - {keyFeature[1]}
    ...

  ## Usage & Specification

  {body}

  ## Agent & Automation Guidance

  This binary is deterministic and intended for zero-prompt-overhead CI/CD and local agent runs.
  Output format: JSON via `--format=json` (or stderr on validation error).
  Exit codes: 0 = valid, 1 = verification failed.

  ```

  ```

### Decision 3.4: Single Source of Truth for Manifesto

- **Choice**: Extract the architectural principles currently in `src/components/ManifestoSection.astro` into a dedicated Content Layer markdown file: `src/content/manifesto.md`.
- **Contract**:
  - `src/components/ManifestoSection.astro` reads from `src/content/manifesto.md` via `astro:content`.
  - `src/pages/manifesto.md.ts` serves the identical markdown at `/manifesto.md`.
  - `/llms.txt` and `/llms-full.txt` incorporate the manifesto principles from the same content item.

### Decision 3.5: Machine-Readable Tool Catalog (`/tools.json`)

- **Choice**: Emit `/tools.json` at root, validated against a published JSON schema.
- **Accurate CLI Representation (No Speculative MCP RPC)**:
  ```json
  {
    "$schema": "https://fluidise.dev/schemas/tools.schema.json",
    "version": "1.0.0",
    "name": "Fluidise Developer Experience Suite",
    "updatedAt": "2026-11-06T00:00:00Z",
    "tools": [
      {
        "id": "clint",
        "name": "fluidise-clint",
        "tagline": "Deterministic, zero-config Conventional Commits linter.",
        "summary": "High-performance commit message linter enforcing Conventional Commits v1.0.0.",
        "status": "released",
        "version": "1.0.0",
        "repoUrl": "https://github.com/Fluidise/clint",
        "endpoints": {
          "html": "https://fluidise.dev/tools/clint",
          "markdown": "https://fluidise.dev/tools/clint.md"
        },
        "install": {
          "brew": "brew install Fluidise/tap/fluidise-clint",
          "cargo": "cargo install fluidise-clint"
        },
        "keyFeatures": [
          "Sub-millisecond verification (<1ms)",
          "Zero configuration required by default",
          "Strict Conventional Commits v1.0.0 validation",
          "Machine-readable JSON error output for CI/CD"
        ],
        "cli": {
          "binary": "fluidise-clint",
          "args": ["<commit-message>"],
          "flags": [
            { "flag": "--version", "description": "Print version" },
            { "flag": "--help", "description": "Print help information" }
          ],
          "exitCodes": {
            "0": "Verification passed",
            "1": "Conventional commit convention violated"
          }
        }
      }
    ]
  }
  ```

### Decision 3.6: Standardized Agent Discovery (`/llms.txt` and `/llms-full.txt`)

- **Choice**: Comply with the Answer.AI `/llms.txt` specification:
  - `/llms.txt`: Curated index containing project overview, architectural manifesto summary, index table of tools with direct links to `.md` endpoints, and agent rule snippets.
  - `/llms-full.txt`: Consolidated single-file prompt context containing the entire Fluidise documentation corpus (manifesto, specifications, CLI usage, and agent rules) for direct ingestion by context-rich LLMs.

### Decision 3.7: Semantic Agent Discovery in HTML (`Layout.astro`)

- **Choice**:
  1. Extend `Props` in `src/layouts/Layout.astro`:
     ```typescript
     interface Props {
       title?: string;
       description?: string;
       markdownUrl?: string;
       jsonLd?: Record<string, unknown>;
     }
     ```
  2. Inject `<link rel="alternate" type="text/markdown" href={markdownUrl} title="Raw Markdown specification" />` in `<head>` when `markdownUrl` is present.
  3. Embed Schema.org JSON-LD graph:
     - On homepage: `WebSite` and `Organization`.
     - On tool pages: `SoftwareApplication` with `applicationCategory: "DeveloperApplication"`, `operatingSystem: "POSIX, Linux, macOS, Windows"`, and download/install links.
  4. Ensure `<article>` and key landmarks include semantic attributes (`data-agent-section="key-guarantees"`, `data-agent-section="install"`).

### Decision 3.8: Agent Rules & Automation Guidance (Not Speculative MCP Servers)

- **Choice**:
  - Rather than configuring non-existent JSON-RPC MCP servers, provide ready-to-copy Agent Rules snippets:
    - Antigravity rule (`.agy/rules/clint.md`): Instruction for coding agents to verify git commit messages before committing.
    - Claude Code / Cursor instruction (`.cursorrules` / `CLAUDE.md` snippet): "Always run `fluidise-clint \"<msg>\"` prior to creating git commits."
    - CI/CD snippet: GitHub Actions step with deterministic exit code verification.

### Decision 3.9: Agent Bot Policy & Sitemap Integration

- **Choice**:
  - Add `@astrojs/sitemap` to dependencies.
  - Configure `astro.config.mjs` with `customPages` to index both HTML and Markdown endpoints:
    ```javascript
    sitemap({
      customPages: [
        'https://fluidise.dev/llms.txt',
        'https://fluidise.dev/llms-full.txt',
        'https://fluidise.dev/tools.json',
        'https://fluidise.dev/tools/clint.md',
        'https://fluidise.dev/tools/relay.md',
        'https://fluidise.dev/manifesto.md',
      ],
    });
    ```
  - Standard RFC 9309 `public/robots.txt`:
    ```txt
    # Fluidise Agent-First Documentation Hub
    # LLM & Agent Index: https://fluidise.dev/llms.txt
    User-agent: *
    Allow: /

    Sitemap: https://fluidise.dev/sitemap.xml
    ```

---

## 4. Change Boundaries & Target Files

| Operation  | Target Path                             | Responsibility                                                                           |
| :--------- | :-------------------------------------- | :--------------------------------------------------------------------------------------- |
| **Create** | `src/content/manifesto.md`              | Single source of truth for Fluidise Architectural Manifesto.                             |
| **Create** | `src/pages/llms.txt.ts`                 | Astro static endpoint generating the standard `/llms.txt` index.                         |
| **Create** | `src/pages/llms-full.txt.ts`            | Astro static endpoint generating the comprehensive `/llms-full.txt`.                     |
| **Create** | `src/pages/tools.json.ts`               | Astro static endpoint generating the structured `/tools.json` catalog.                   |
| **Create** | `src/pages/tools/[id].md.ts`            | Astro dynamic static endpoint emitting synthesized markdown for each tool.               |
| **Create** | `src/pages/manifesto.md.ts`             | Astro endpoint emitting raw markdown for the architectural manifesto.                    |
| **Create** | `public/robots.txt`                     | Standard RFC 9309 robot policy with agent index pointer.                                 |
| **Modify** | `package.json`                          | Add `@astrojs/sitemap` dependency for build-time sitemap generation.                     |
| **Modify** | `src/content.config.ts`                 | Register `manifesto` collection and enrich `tools` schema with CLI execution contracts.  |
| **Modify** | `src/components/ManifestoSection.astro` | Read manifesto content dynamically from `src/content/manifesto.md`.                      |
| **Modify** | `src/layouts/Layout.astro`              | Extend `Props`, inject `<link rel="alternate">`, and JSON-LD structured data.            |
| **Modify** | `src/pages/tools/[id].astro`            | Pass `markdownUrl` and `jsonLd` props to `Layout.astro`.                                 |
| **Modify** | `nginx.conf`                            | Add Markdown MIME type, UTF-8 charset, gzip compression, and conneg routing.             |
| **Modify** | `astro.config.mjs`                      | Register `sitemap()` integration with `customPages` covering `.md` and `.txt` endpoints. |
| **Modify** | `README.md`                             | Document agent endpoints, curl instructions, and machine discovery links.                |
| **Modify** | `AGENTS.md`                             | Document architectural invariants for future agentic development.                        |

---

## 5. Verification Plan & Test Matrix

### 5.1 Build Verification

- Run `bun run check`: Ensure all TypeScript endpoints compile cleanly with strict types.
- Run `bun run build`: Validate that `dist/` contains:
  - `dist/llms.txt`
  - `dist/llms-full.txt`
  - `dist/tools.json`
  - `dist/tools/clint.md`
  - `dist/tools/relay.md`
  - `dist/manifesto.md`
  - `dist/sitemap.xml`
  - Standard HTML bundles.

### 5.2 Content Negotiation Tests (CLI & Curl)

- `curl -s -o /dev/null -w "%{http_code} %{content_type}\n" -H "Accept: text/markdown" http://localhost:8080/tools/clint`
  - Expect: `200 text/markdown; charset=utf-8`
- `curl -s -o /dev/null -w "%{http_code} %{content_type}\n" http://localhost:8080/tools/clint`
  - Expect: `200 text/html; charset=utf-8`
- `curl -s http://localhost:8080/llms.txt`
  - Expect: Valid markdown conforming to Answer.AI standard, with active links to `/tools/*.md`.
- `curl -s http://localhost:8080/tools.json | jq .`
  - Expect: Valid JSON conforming to the tool catalog schema, containing accurate `cli` execution fields.

### 5.3 Agent Retrieval Validation

- Launch an isolated subagent with the prompt: "Fetch https://fluidise.dev/llms.txt and describe how to install and execute fluidise-clint".
- Confirm:
  - The subagent extracts the exact brew command and cli syntax without scraping HTML.
  - Zero token waste or HTML stripping parsing errors.

### 5.4 Human UX & Performance Checks

- Run Lighthouse / DevTools audit: Ensure LCP <= 1.2s, 100/100 Best Practices, 100/100 SEO, 100/100 Accessibility.

---

## 6. Risks, Failure Modes & Mitigations

| Risk                                                | Impact | Mitigation                                                                                                                                                                                                          |
| :-------------------------------------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Content Drift between HTML & Markdown**           | High   | Both outputs are generated from the identical Content Layer files (`src/content/tools/*.md`, `src/content/manifesto.md`). Parity is guaranteed by build-time Astro queries.                                         |
| **Nginx Content Negotiation Misrouting**            | Medium | Use strict mapping: `$http_accept ~* "text/markdown"`. If not explicitly requested, default to standard HTML `try_files` path without breaking direct link navigation.                                              |
| **Token Bloat in `llms-full.txt`**                  | Medium | Keep `llms-full.txt` focused strictly on specifications, excluding large binary dumps or redundant web layouts. Estimated corpus: ~12-18k tokens, well within modern context windows.                               |
| **Search Engine SEO Confusion (Duplicate Content)** | Low    | Each `.md` endpoint includes standard headers, and `<link rel="alternate" type="text/markdown" href="...">` in HTML `<head>` explicitly marks it as an alternative format, while canonical points to the HTML page. |

---

## 7. Review & Approval State

- **Substantive Body Revision Hash**: `3b07729060f51041033b3c33632775311510bafd30d34670ac072c7089a903ce`
- **Review Coverage**:
  - `egm-design-critic`: Architectural fit, scope boundaries, contracts, simplicity, failure scenarios.
  - Independent revalidation completed: **CLEAN (Approved for Implementation Readiness)**.
- **Resolved Findings**:
  - _Finding 1 (Blocker - Speculative MCP)_: Resolved. Replaced invalid JSON-RPC MCP server stanzas with accurate POSIX CLI execution definitions and agent rule instructions.
  - _Finding 2 (Major - Nginx MIME & Conneg)_: Resolved. Added explicit `types { text/markdown md; }`, UTF-8 charset directives, gzip types, strict `$wants_markdown` map, and trailing slash normalization.
  - _Finding 3 (Major - Manifesto Single Source)_: Resolved. Extracted manifesto to `src/content/manifesto.md`, consumed by both Astro UI and markdown endpoints.
  - _Finding 4 (Major - Missing Sitemap Dependency & Scope)_: Resolved. Added `package.json` to change boundary and specified `@astrojs/sitemap` with `customPages`.
  - _Finding 5 (Major - Undefined Tool MD Payload Contract)_: Resolved. Specified detailed synthesized Markdown template preserving titles, installation commands, and operational guarantees.
  - _Finding 6 (Nit - Layout Props Contract)_: Resolved. Defined updated `Props` with `markdownUrl` and `jsonLd`.
  - _Finding 7 (Nit - Non-Standard robots.txt)_: Resolved. Standardized RFC 9309 format.
  - _Finding 8 (Nit - Revision Hash)_: Resolved. Substantive SHA256 digest bound.
- **Open Material Findings**: None.
- **Accepted Risks**: None.
- **Human Approval**: Pending human authorization.
