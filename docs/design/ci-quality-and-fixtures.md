# Architecture Design: CI/CD Quality Assurance, Golden Fixtures & Fast Verification

- **Document Revision**: 1.2.0
- **Status**: Approved (Implementation in Progress)
- **Target File**: `docs/design/ci-quality-and-fixtures.md`
- **Owner**: `Fluidise/site` Maintainers
- **Context**: Fluidise Developer Experience Suite (`fluidise.dev`) & Tooling Ecosystem

---

## 1. Problem Statement & Strategic Objective

### 1.1 Context

The official web hub and documentation portal for Fluidise (`Fluidise/site`) is built with Astro 7, React 19, Tailwind CSS v4, and Bun. In addition to serving interactive human interfaces, the site delivers static machine endpoints (`/llms.txt`, `/llms-full.txt`, `/tools.json`, `/tools/[id].md`, and `/manifesto.md`) adhering to strict **Agent-First** architectural invariants.

An inspection of high-assurance open-source developer tooling—specifically the workflow architecture of [`orhun/git-cliff`](https://github.com/orhun/git-cliff)—reveals several industry-leading CI/CD practices:

1. Matrix-driven integration test fixtures ([`test-fixtures.yml`](https://github.com/orhun/git-cliff/blob/main/.github/workflows/test-fixtures.yml)) testing complex CLI outputs against committed golden master references.
2. Automated broken link verification ([`lychee`](https://github.com/lycheeverse/lychee-action)) preventing documentation drift and dead URLs.
3. Sub-second spell and terminology linting ([`typos`](https://github.com/crate-ci/typos)) across code, comments, and Markdown.
4. Automated Pull Request dependency screening ([`dependency-review-action`](https://github.com/actions/dependency-review-action)) preventing supply-chain vulnerability regressions.

### 1.2 Root Problem

While the existing CI pipeline in `Fluidise/site` (`.github/workflows/deploy.yml`) validates standard formatting (`oxfmt`), linting (`oxlint`), TypeScript compilation (`astro check`), unit tests (`vitest`), and container builds (`docker build`), it exhibits critical coverage gaps:

1. **Silent Schema Drift in Agent Endpoints**: While `src/content/tools/*.md` files are validated, the synthesized machine endpoints (`/llms.txt`, `/llms-full.txt`, `/tools.json`) have no automated regression tests verifying that generated outputs match expected schemas, structure, or formatting invariants. A minor template typo could corrupt agent consumption without failing any existing build step.
2. **Undetected Dead Links in Agent & Human Documentation**: Documentation endpoints reference external URLs (GitHub repositories, Homebrew taps, Cargo crates, RFCs) and internal routes. Broken links degrade trust and misdirect autonomous AI agents.
3. **Typos & Terminology Inconsistencies**: Spontaneous typographical errors in tool documentation, CLI flags, or marketing copy are currently caught only via manual visual inspection.
4. **Supply-Chain Dependency Vulnerability Window**: Dependency manifest changes in PRs are not automatically audited against GitHub Advisory Database vulnerabilities prior to merge.

### 1.3 Strategic Objective

Modernize the quality assurance pipeline of `Fluidise/site` by adopting the highest-value mechanisms observed in `git-cliff` with zero runner bloat and zero network flakiness:

1. **Deterministic Schema & Output Verification for Machine Endpoints**: Validate built machine endpoints (`dist/llms.txt`, `dist/llms-full.txt`, `dist/tools.json`, and `dist/manifesto.md`) against strict schema definitions, required sections, and structural invariants post-build, guaranteeing zero runtime virtual-module resolution issues.
2. **Hermetic Internal Link Checking in Gating CI**: Add Lychee link validation in offline/internal mode (`--offline`, `--root-dir dist`) during the gating CI pipeline, validating internal routes, file paths, and machine endpoints without flakiness from third-party networks.
3. **Non-Blocking External Link Health Checks**: Execute full external URL validation on a scheduled basis (weekly cron / manual dispatch) so transient external downtime never blocks PR auto-merge or production deployment.
4. **Hermetic Lockfile Auditing & PR Dependency Review**: Audit `bun.lock` for vulnerabilities natively via `bun audit` within gating CI, complemented by an advisory `dependency-review` workflow on PRs.
5. **High-Speed Spell & Terminology Checking (`typos`)**: Integrate a sub-two-second typos check with a domain-specific dictionary preserving Fluidise terminology.
6. **Cross-Repository Blueprint for `Fluidise/clint`**: Document the exact architectural transposition of `git-cliff`'s `test-fixtures.yml` for the Conventional Commits linter CLI.

---

## 2. Invariants & Architectural Constraints

1. **Deterministic Parity & Schema Stability**:
   - Machine endpoints (`/llms.txt`, `/llms-full.txt`, `/tools.json`, `/tools/[id].md`) must strictly conform to their schema contracts. Structural schema changes must be deliberate and accompanied by updated test assertions.
2. **Hermetic Test & Artifact Execution (Zero External Flakiness)**:
   - Gating CI checks required for `auto-merge` and `deploy` (endpoint validation, unit tests, and Tier 1 internal link checking) must execute completely offline in memory or against built static artifacts. They must never depend on third-party web services or external documentation mirrors. Package dependency security auditing (`bun audit`) queries the authoritative package registry advisory endpoint.
3. **Content Mutability Separation**:
   - Structural invariant tests must validate schemas, required keys, and formatting invariants, rather than freezing markdown prose. Updating tool documentation in `src/content/tools/*.md` must never break endpoint validation tests unless a structural contract is violated.
4. **Dynamic Timestamp Normalization**:
   - Dynamic timestamps (`updatedAt` in `tools.json`, `Generated: ...` in `llms-full.txt`) must be validated using regex pattern matching rather than static string equality.
5. **CI Speed & Resource Efficiency (Bounded Execution)**:
   - The combined duration of typos, link, and audit checks must add fewer than 25 seconds to the pull request validation pipeline.

---

## 3. Structural Decisions & Architecture

```
                       [ Pull Request / Push to Main ]
                                      │
           ┌──────────────────────────┼──────────────────────────┐
           ▼                          ▼                          ▼
    [ Fast Lints ]             [ Security Audit ]        [ Quality & Build ]
    ├── oxfmt (format:check)   └── bun audit             ├── Astro check (sync + tsc)
    ├── oxlint (lint)              (hermetic lockfile)   ├── Vitest (component unit tests)
    └── typos (spell check)                              ├── Astro build (dist/)
                                                         ├── Endpoint Schema Verification
                                                         │   (tests dist/ against contracts)
                                                         ├── Lychee link check (internal)
                                                         │   (offline root-dir validation)
                                                         └── Docker build verification
                                                                 │
                                                                 ▼
                                                        [ Auto-Merge / Deploy ]
```

### 3.1 Decision 1: Post-Build Verification of Static Machine Endpoints

- **Context**: In Astro, route handlers in `src/pages/*.ts` import `getCollection` from the virtual module `'astro:content'`. Attempting to import these route handlers directly into a standalone Vitest process creates module resolution errors unless Astro's Vite container and `astro sync` have executed.
- **Decision**: Test the actual build artifacts generated by Astro in `dist/` post-build via a dedicated script (`src/tests/verify-endpoints.ts` executed as `bun run check:endpoints`).
- **Rationale**:
  - Tests the exact bytes and files that Nginx serves in production (`dist/llms.txt`, `dist/llms-full.txt`, `dist/tools.json`, `dist/manifesto.md`).
  - Zero coupling with Astro's compiler internals or virtual modules.
  - Executes in < 50ms using Node/Bun `node:fs`.
- **Contract Verification Logic**:
  - `/tools.json`: Parsed as JSON, validated against schema properties (`$schema`, `version`, `tools` array with `name`, `status`, `endpoints`, `cli`), and `updatedAt` verified via ISO 8601 regex (`^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}`).
  - `/llms.txt`: Validated for mandatory top-level heading (`# Fluidise`), core sections (`## Core Documentation & Specifications`, `## Standalone Tools Catalog`, `## Key Agent Invariants`), and presence of active tool links.
  - `/llms-full.txt`: Validated for mandatory sections, tool specifications, and regex-matched `Generated: ` timestamp.
  - `/manifesto.md`: Validated for core invariants (Agent-First Invariant, Strict Unix Philosophy, Zero Unannounced Mutation).

### 3.2 Decision 2: Two-Tier Link Validation Strategy with Lychee

- **Context**: Running unrestricted link checkers against third-party URLs during gating CI causes flaky PR failures due to external rate limiting (HTTP 429), server downtime (HTTP 503), or cloud runner IP blocks.
- **Decision**: Decouple link validation into two distinct tiers:
  1. **Tier 1 (Gating CI - Hermetic & Offline)**:
     - Runs on every PR and commit to `main` within the `check` job.
     - Invoked with `--offline --root-dir dist` targeting `dist/**/*.html`, `dist/llms.txt`, `dist/llms-full.txt`, and `dist/tools.json`.
     - Uses `base_url = "https://fluidise.dev"`, `root_dir = "dist"`, and `remap = ["https://fluidise.dev/ dist/"]` in `lychee.toml` so that both root-relative URLs (`/manifesto.md`) and fully-qualified production URLs (`https://fluidise.dev/tools/clint.md`) resolve directly to static files in `dist/` in offline mode.
     - Validates that internal links, fragment anchors, and local asset references resolve with 100% determinism.
  2. **Tier 2 (Advisory Health Check - Scheduled / Non-blocking)**:
     - Runs via a standalone scheduled workflow (`.github/workflows/link-health.yml`) on a weekly cron and `workflow_dispatch`.
     - Checks external URLs (RFCs, GitHub repositories, Homebrew taps) with retries, reporting broken external links via GitHub issues without blocking deployments.

### 3.3 Decision 3: High-Speed Spell & Terminology Checking with `typos`

- **Context**: Typos degrade professional presentation and agent prompt readability.
- **Decision**: Integrate `crate-ci/typos` as a pre-build step in CI and provide a local runner via `bun run lint:spelling`.
- **Configuration (`typos.toml`)**:
  - Project dictionary allowlist: `[default.extend-words]` containing domain terminology (`Fluidise`, `Dokploy`, `Oxlint`, `Oxfmt`, `conneg`, `clint`, `tabler`, `unannounced`, `vite`, `vitest`).
  - Directory exclusions: `.git/`, `.astro/`, `dist/`, `node_modules/`.
  - Local developer workflow: Developers can run `bun run lint:spelling` locally using `npx @crate-ci/typos` (or native binary if installed).

### 3.4 Decision 4: Hermetic Dependency Auditing & PR Review

- **Context**: Pull requests altering dependencies may introduce security vulnerabilities. GitHub's native `dependency-review-action` does not parse Bun's `bun.lock` directly and fails if executed on `push` events.
- **Decision**:
  1. **Primary Audit (Gating CI)**: Add `bun audit` directly to the `check` job in `.github/workflows/deploy.yml`. This audits all direct and transitive dependencies recorded in `bun.lock` offline against the security registry, failing immediately on high/critical advisories.
  2. **Secondary Review (PR Advisory)**: An isolated workflow `.github/workflows/dependency-review.yml` triggering strictly on `pull_request` using `actions/dependency-review-action`, configured with `fail-on-severity: high`.

### 3.5 Cross-Repository Architectural Blueprint: `test-fixtures` for `Fluidise/clint`

_(Advisory specification for `Fluidise/clint`; does not modify files in `Fluidise/site`.)_

1. **Fixture Directory Structure in `Fluidise/clint`**:
   ```
   .github/fixtures/
   ├── valid-feat-scope/
   │   ├── input.msg           # Commit message text
   │   ├── expected.json       # Exact JSON diagnostics payload
   │   └── expected.rc         # 0
   ├── invalid-type/
   │   ├── input.msg
   │   ├── expected.json       # Diagnostic error with byte span
   │   └── expected.rc         # 1
   └── missing-description/
       ├── input.msg
       ├── expected.json
       └── expected.rc         # 1
   ```
2. **Execution Strategy**:
   - A dedicated workflow `.github/workflows/test-fixtures.yml` builds `fluidise-clint` once (`cargo build --release`), then tests each fixture via matrix or bash runner:
     ```bash
     target/release/fluidise-clint --stdin < input.msg > output.json
     echo "$?" > output.rc
     diff -u expected.json output.json
     diff -u expected.rc output.rc
     ```
   - This provides deterministic RFC 2119 compliance verification without relying on external test frameworks.

---

## 4. Change Boundaries & Deliverables in `Fluidise/site`

| Action     | Path                                      | Description                                                                                                                                                                                                                         |
| :--------- | :---------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Create** | `src/tests/verify-endpoints.ts`           | Post-build verification script validating static machine endpoints (`dist/llms.txt`, `dist/llms-full.txt`, `dist/tools.json`, `dist/manifesto.md`) against schema contracts and structural invariants.                              |
| **Create** | `lychee.toml`                             | Configuration for Lychee link checker specifying `root_dir = "dist"`, `base_url = "https://fluidise.dev"`, `remap = ["https://fluidise.dev/ dist/"]`, file types (`.html`, `.txt`, `.json`, `.md`), and offline mode for gating CI. |
| **Create** | `typos.toml`                              | Configuration for Typos spell-checker with repository-specific allowlist.                                                                                                                                                           |
| **Create** | `.github/workflows/dependency-review.yml` | Dedicated PR workflow executing `actions/dependency-review-action` strictly on `pull_request` events.                                                                                                                               |
| **Create** | `.github/workflows/link-health.yml`       | Standalone scheduled workflow checking external documentation URLs weekly without gating deployments.                                                                                                                               |
| **Modify** | `.github/workflows/deploy.yml`            | Add `typos` step, `bun audit` step, `bun run check:endpoints` step post-build, and offline `lychee` verification step.                                                                                                              |
| **Modify** | `package.json`                            | Add `check:endpoints`, `lint:spelling`, and `lint:links` scripts for developer ergonomics.                                                                                                                                          |

---

## 5. Verification Plan & Test Matrix

### 5.1 Local Verification

1. **Endpoint Schema & Invariant Verification**:
   - Run `bun run build`.
   - Run `bun run check:endpoints`.
   - Confirm: All 4 machine endpoints (`tools.json`, `llms.txt`, `llms-full.txt`, `manifesto.md`) pass schema checks in < 50ms.
   - Inject a deliberate syntax corruption into `src/pages/tools.json.ts`, rebuild, and verify that `check:endpoints` halts with an actionable exit code 1.
2. **Offline Link Verification**:
   - Run `bun run lint:links`.
   - Confirm: Lychee verifies internal HTML and Markdown links against `dist/` without network access in < 5 seconds.
3. **Spell Checking**:
   - Run `bun run lint:spelling`.
   - Confirm: Zero false positives across the repository.
4. **Dependency Audit**:
   - Run `bun audit`.
   - Confirm: Clean lockfile status.

### 5.2 CI Pipeline Verification

1. Submit PR with modified content and verify:
   - `typos` step finishes in < 2 seconds.
   - `bun audit` completes cleanly.
   - Vitest component tests execute cleanly.
   - Post-build endpoint verification passes.
   - Offline Lychee link check validates internal routes.
   - Production auto-merge and Dokploy deployment proceed without obstruction.

---

## 6. Risks, Failure Modes & Mitigations

| Risk                                             | Impact   | Mitigation                                                                                                                                                        |
| :----------------------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **External Network Outage Blocking Deployments** | Critical | Eliminated. Gating CI uses `--offline` link validation. External link checking is deferred to scheduled, non-blocking workflows.                                  |
| **Virtual Module Resolution Crashes in Tests**   | High     | Eliminated. Endpoint verification tests operate on built artifacts in `dist/` post-build via `node:fs` instead of importing Astro virtual modules.                |
| **False Positive Spelling Violations**           | Low      | Curate `typos.toml` with strict `[default.extend-words]` containing domain terminology (`Fluidise`, `Oxlint`, `Dokploy`, etc.).                                   |
| **Documentation Updates Breaking Snapshots**     | Medium   | Eliminated. `verify-endpoints.ts` validates structural contracts, schema properties, and regex-matched timestamps, allowing documentation prose to evolve freely. |
| **CI Latency Inflation**                         | Low      | All added gating steps (`typos`, `bun audit`, `check:endpoints`, offline `lychee`) complete in under 15 seconds combined.                                         |

---

## 7. Review & Approval State

- **Substantive Body Revision Hash**: `fef1dc174e4a2ac60f669fb80fd1a6a24de0260548498b1c070bb2a35bde438f`
- **Review Coverage**:
  - `egm-design-critic`: Architectural fit, test determinism, contract boundaries, CI overhead, runner hermeticity.
  - Revalidation verdict: **CLEAN / Implementation-Ready**.
- **Review Findings & Resolutions**:
  - _Finding 1 (Blocker - Virtual Module Resolution)_: Resolved. Shifted endpoint verification to a post-build test (`src/tests/verify-endpoints.ts`) asserting against static files in `dist/`.
  - _Finding 2 (Blocker - Un-hermetic Network Gating)_: Resolved. Decoupled link checking into Tier 1 (hermetic `--offline` in gating CI) and Tier 2 (scheduled non-blocking external link health check).
  - _Finding 3 (Major - Dependency Review Incompatibility)_: Resolved. Added native `bun audit` in gating CI; moved `actions/dependency-review-action` to dedicated PR-only workflow.
  - _Finding 4 (Major - Lychee Omissions & Root-Relative Paths)_: Resolved. Expanded targets to include `dist/llms.txt`, `dist/llms-full.txt`, `dist/tools.json`, and configured `base = "https://fluidise.dev"`, `root_dir = "dist"`, and `remap = ["https://fluidise.dev/ dist/"]`.
  - _Finding 5 (Major - Conflation of Schema vs Content)_: Resolved. Endpoint verification validates structural contracts and regex-matched timestamps, decoupling tests from documentation prose updates.
  - _Finding 6 (Major Revalidation - Bun Audit Subcommand)_: Resolved. Corrected CLI syntax from `bun pm audit` to top-level `bun audit`.
  - _Finding 7 (Minor Revalidation - Offline Lychee Domain Remap)_: Resolved. Added explicit `remap = ["https://fluidise.dev/ dist/"]` in `lychee.toml` so fully-qualified production URLs resolve offline against `dist/`.
  - _Finding 8 (Nit - Script Nomenclature & Distribution)_: Resolved. Standardized on `check:endpoints`, `lint:spelling`, and `lint:links` with npm/bunx distribution options.
  - _Finding 9 (Nit - Cross-Repository Scope)_: Resolved. Clarified that Section 3.5 is an advisory blueprint for `Fluidise/clint` with no files modified in `Fluidise/site`.
- **Open Material Findings**: None.
- **Accepted Risks**: None.
- **Human Approval**: Approved by human maintainer on 2026-11-07.
