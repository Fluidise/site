# Architecture Design: Codecov Integration for Fluidise Site

- **Document Revision**: 1.2.0-approved
- **Status**: Approved & Implemented
- **Target File**: `docs/design/codecov-integration.md`
- **Owner**: `Fluidise/site` Maintainers
- **Context**: Fluidise Web Hub (`fluidise.dev`) / CI/CD Pipeline
- **Substantive Digest Domain**: Sections 1 through 6 inclusive (excluding Section 7 Review & Approval State)
- **Substantive Digest**: `eb38152844c67f6d6dc307a51654c7b85001ff11f2594c8dfe27014824d395e3`

---

## 1. Problem Statement & Strategic Objective

### 1.1 Context

`Fluidise/site` is the official web portal and documentation hub for the Fluidise developer experience suite. As an "Agent-First" developer suite, Fluidise champions extreme determinism, rigorous validation, and transparency. The repository currently maintains unit and component tests using Vitest (`vitest@^5.0.5`), validated across pull requests and branch updates within the `.github/workflows/deploy.yml` GitHub Actions workflow.

### 1.2 Root Problem

While tests execute during continuous integration (`bun run test` in CI), the repository lacks automated code coverage tracking, regression visibility, and public coverage metrics:

1. **Blind Pull Request Reviews**: Reviewers and autonomous agents cannot determine whether newly submitted pull requests add tests for modified lines (patch coverage) or inadvertently reduce overall test coverage.
2. **Missing Historical Telemetry**: There is no persistent tracking of test coverage trends over time as new components and utility libraries are added.
3. **No Coverage Invariants in CI**: Without automated coverage reporting, regression in core utility or parser testing can easily slip into `main` without warning.
4. **Lack of Transparent Quality Badging**: Outside contributors and users visiting `fluidise.dev` and GitHub cannot verify test coverage health via public status badges.

### 1.3 Strategic Objective

Integrate **Codecov** ([about.codecov.io](https://about.codecov.io/)) into `Fluidise/site` to establish automated, robust, and transparent test coverage reporting:

- Collect high-performance coverage data during the CI `check` workflow using `@vitest/coverage-v8`.
- Upload standard LCOV reports to Codecov via the official `codecov/codecov-action@v5`.
- Provide automated, non-disruptive pull request commentary and status checks detailing patch and project coverage.
- Add an official Codecov status badge to `README.md` styled consistently with existing shields.
- Maintain 100% decoupling from production builds, keeping zero runtime overhead and preserving static pre-rendering invariants.

---

## 2. Invariants & Architectural Constraints

1. **Zero Production Runtime Impact**:
   - Coverage instrumentation and reporting tooling must reside strictly in `devDependencies` and CI workflows. Production site builds (`bun run build`), generated static assets, and Docker containers (`Dockerfile`) must remain completely untouched by coverage harnesses.
2. **Deterministic Parity Across Local & CI Environments**:
   - Running tests locally with coverage (`bun run test:coverage`) must produce identical report structures (LCOV and JSON summary) to those generated in GitHub Actions runners.
3. **Non-Blocking CI Resilience**:
   - Intermittent Codecov SaaS downtime or network flakiness during upload must not block the core CI pipeline (`check` job) or prevent production releases (`fail_ci_if_error: false`).
4. **Preservation of Auto-Merge Invariants**:
   - In `.github/workflows/deploy.yml`, the `auto-merge` job triggers upon successful completion of the `check` job. Initial Codecov integration must report informational commit statuses without deadlocking autonomous PR auto-merge queues or racing against branch deletion.
5. **Security & Public Repository Hygiene**:
   - `Fluidise/site` is a public repository (`github.com/Fluidise/site`). The workflow must support authenticated uploads using the repository's `CODECOV_TOKEN` secret when present, while safely granting `id-token: write` so external fork PR contributions can authenticate tokenlessly via GitHub OIDC without leaking secrets or failing builds.

---

## 3. Structural Decisions & Architecture

### 3.1 End-to-End Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   GitHub Actions Runner                     │
│                (.github/workflows/deploy.yml)               │
│                                                             │
│  Job: check (permissions: contents: read, id-token: write)  │
│  1. bun install --frozen-lockfile                           │
│  2. bun run test:coverage ──┐                               │
│                             ▼                               │
│                 [ Vitest v8 Coverage Engine ]               │
│                             │                               │
│                             ▼                               │
│                   coverage/lcov.info                        │
│                             │                               │
│  3. codecov/codecov-action@v5                               │
│     (token: secrets.CODECOV_TOKEN or ambient OIDC token)    │
│  4. bun run check && bun run build && docker build (1-2min) │
└─────────────────────────────┼───────────────────────────────┘
                              │ HTTPS Upload (Asynchronous)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Codecov SaaS Platform                    │
│                                                             │
│  - Ingests & validates lcov.info                            │
│  - Evaluates rules from codecov.yml                         │
│    (require_ci_to_pass: no, wait_for_ci: no)                │
│  - Posts Commit Status Checks (codecov/project, patch)      │
│  - Posts Interactive PR Comment with Coverage Diff          │
│  - Updates Public SVG Badge for README.md                   │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Coverage Engine Selection: V8 vs. Istanbul

| Dimension              | `@vitest/coverage-v8` (Selected)                        | `@vitest/coverage-istanbul` (Rejected)                     |
| :--------------------- | :------------------------------------------------------ | :--------------------------------------------------------- |
| **Execution Speed**    | Native Node.js/V8 inspector tracing; near-zero overhead | Source-code AST instrumentation via Babel; slower          |
| **Dependencies**       | Minimal native bindings                                 | Heavy Babel transform toolchain                            |
| **TypeScript Parity**  | Uses source maps directly from Vite transform pipeline  | Re-instruments generated code; occasional source-map drift |
| **Ecosystem Standard** | Default recommended engine for Vitest v3+               | Legacy fallback for older environments                     |

**Decision**: Adopt `@vitest/coverage-v8` pinned to version `^5.0.5` in parity with `"vitest": "^5.0.5"`. It matches the existing Vite/Vitest architecture with zero source transformation overhead.

### 3.3 Vitest Coverage Configuration (`vitest.config.ts`)

Configure `test.coverage` within `vitest.config.ts` to output standard formats and target application source code while ignoring boilerplate and configuration assets:

```typescript
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'lcov', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.{test,spec}.{ts,tsx}',
        'src/content.config.ts',
        'src/pages/**', // Astro pages are tested via static build verification
      ],
    },
  },
});
```

### 3.4 Package Scripts & Dependencies (`package.json`)

1. Add `@vitest/coverage-v8` in `devDependencies` matching Vitest:
   - `"@vitest/coverage-v8": "^5.0.5"`
2. Add dedicated coverage execution scripts:
   - `"test": "vitest run"` (Preserved for fast local test cycles without coverage overhead)
   - `"test:coverage": "vitest run --coverage"` (Dedicated command for local inspection and CI pipeline execution)

### 3.5 CI Workflow Integration (`.github/workflows/deploy.yml`)

Within the `check` job in `.github/workflows/deploy.yml`:

1. Add `id-token: write` permission to the `check` job:
   ```yaml
   jobs:
     check:
       name: Validation, tests et build Docker
       if: github.event_name != 'pull_request' || !github.event.pull_request.draft
       runs-on: ubuntu-latest
       timeout-minutes: 15
       permissions:
         contents: read
         id-token: write
   ```
2. Replace `run: bun run test` with `run: bun run test:coverage`.
3. Insert the Codecov upload step immediately following test execution:

```yaml
- name: Run unit tests with Vitest and collect coverage
  run: bun run test:coverage

- name: Upload coverage reports to Codecov
  uses: codecov/codecov-action@v5
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
    files: ./coverage/lcov.info
    fail_ci_if_error: false
    verbose: false
```

_Note on Fork PRs_: When a PR originates from a fork, `${{ secrets.CODECOV_TOKEN }}` is empty. Because `id-token: write` is granted, `codecov-action@v5` automatically mints a short-lived GitHub OIDC token, allowing public fork PRs to upload coverage seamlessly and securely without token disclosure.

### 3.6 Repository Configuration (`codecov.yml`)

Create a root `codecov.yml` to define organizational coverage contracts:

```yaml
codecov:
  require_ci_to_pass: no
  notify:
    wait_for_ci: no

coverage:
  precision: 2
  round: down
  range: '70...100'

  status:
    project:
      default:
        target: auto
        threshold: 1%
        base: auto
        if_ci_failed: error
    patch:
      default:
        target: auto
        threshold: 0%
        base: auto

comment:
  layout: 'diff, flags, files'
  behavior: default
  require_changes: false
  require_base: false
  require_head: true

ignore:
  - 'src/pages/**/*'
  - '**/*.test.*'
  - '**/*.spec.*'
```

### 3.7 Interaction with `auto-merge` & Branch Protection

- **Eliminating the Auto-Merge Race Condition**:
  Setting `require_ci_to_pass: no` and `notify.wait_for_ci: no` ensures Codecov processes uploaded reports immediately upon receipt. Because the upload occurs at step 7 of the `check` job, Codecov posts PR comments and commit status checks in parallel while the remainder of `check` (`bun run check`, `bun run build`, and `docker build`) runs for an additional 1–2 minutes. By the time `check` succeeds and `auto-merge` triggers, Codecov statuses and comments are already delivered, preventing dropped notifications or post-delete race conditions.
- **Preventing Branch Protection Deadlocks**:
  With `wait_for_ci: no`, if maintainers later mandate `codecov/project` or `codecov/patch` in GitHub branch protection, Codecov does not wait for the entire CI run to finish before reporting status, ensuring `auto-merge` never deadlocks.

### 3.8 Visibility & Badging (`README.md`)

Add the Codecov badge to `README.md` in the hero badge row, matching the project's visual identity:

```markdown
  <a href="https://codecov.io/gh/Fluidise/site">
    <img src="https://img.shields.io/codecov/c/github/Fluidise/site?style=flat&labelColor=11243B&color=075CCE&logo=codecov&logoColor=white" alt="Code Coverage"></a>
```

---

## 4. Change Boundaries & Impact Analysis

### 4.1 Approved Write Boundary

| File                           | Change Nature | Purpose                                                                                         |
| :----------------------------- | :------------ | :---------------------------------------------------------------------------------------------- |
| `package.json`                 | **Modify**    | Add `"@vitest/coverage-v8": "^5.0.5"` in `devDependencies`, add `"test:coverage"` script        |
| `bun.lock`                     | **Modify**    | Text lockfile update after dependency addition (`bun install`)                                  |
| `vitest.config.ts`             | **Modify**    | Configure `coverage` provider (`v8`), reporters, and source boundaries                          |
| `.gitignore`                   | **Modify**    | Add `coverage/` artifact directory                                                              |
| `.github/workflows/deploy.yml` | **Modify**    | Add `id-token: write` to `check` job, run `test:coverage`, add `codecov/codecov-action@v5` step |
| `codecov.yml`                  | **Create**    | Configure project/patch coverage targets, `wait_for_ci: no`, and PR comment behavior            |
| `README.md`                    | **Modify**    | Insert styled Codecov status shield                                                             |

### 4.2 Explicitly Out of Bounds

- All runtime Astro components (`src/components/**`), layouts (`src/layouts/**`), and pages (`src/pages/**`).
- Nginx configuration (`nginx.conf`) and container definition (`Dockerfile`).
- Production deployment jobs (`deploy` job in `deploy.yml`).

---

## 5. Verification & Testing Strategy

1. **Local Coverage Generation**:
   - Execute `bun run test:coverage`.
   - Verify that `coverage/` directory is created containing `lcov.info` and human-readable HTML reports.
   - Verify that running `git status` does not show untracked coverage files (confirming `.gitignore` coverage entry).
2. **CI Pipeline Simulation**:
   - Verify `deploy.yml` syntax and step sequence.
   - Confirm `bun run check` and `bun run build` continue to succeed with zero warnings.
3. **Failure Semantics Verification**:
   - Confirm that if `CODECOV_TOKEN` is unset or Codecov endpoint is unreachable, `fail_ci_if_error: false` logs an informative warning but exits with code 0, allowing the CI pipeline to complete smoothly.
   - Confirm fork PR behavior with OIDC minting enabled via `id-token: write`.

---

## 6. Security, Operational & Rollback Considerations

- **Secret Safety & Fork Compatibility**: `CODECOV_TOKEN` is configured in GitHub repository secrets for internal branch pushes. For public pull requests submitted from external forks, GitHub omits secrets; the granted `id-token: write` permission enables `codecov-action@v5` to securely mint a temporary OpenID Connect (OIDC) token to authenticate with Codecov without credential exposure.
- **Dependency Overhead**: `@vitest/coverage-v8` adds zero production dependencies; installation footprint in Bun is minimal (< 5MB) with negligible CI cache overhead.
- **Rollback Procedure**: Reverting the single PR or commit removing `codecov-action@v5`, `codecov.yml`, and the coverage script immediately restores previous CI behavior with zero operational residue.

---

## 7. Review & Approval State

### 7.1 Review Coverage & Dispatch Record

- **Initial Substantive Digest (Round 1)**: `0ecb1884308fe2e0c9bf0bf631458b90e1498ddee286b7882524affd109c98f1`
- **Revalidated Substantive Digest (Round 2)**: `eb38152844c67f6d6dc307a51654c7b85001ff11f2594c8dfe27014824d395e3`
- **Primary Agent**: Elephant Coordinator
- **Assigned Reviewer**: `egm-design-critic` (Goldfish Persona)
- **Applicable Standards**:
  - `resources/document_standards/feature-spec-standard.md`
  - `resources/document_standards/zoom-out-standard.md`
  - `resources/document_standards/implementation-readiness-standard.md`
- **Reviewed Scope**: Full design document (`docs/design/codecov-integration.md`) and affected repository contracts.

### 7.2 Reviewer Findings & Remediation Summary

The Goldfish independent reviewer returned 4 findings on revision `0ecb1884308fe2e0c9bf0bf631458b90e1498ddee286b7882524affd109c98f1`:

1. **Finding 1 [Major - Resolved]**: Missing `id-token: write` permission prevented OIDC token minting on public fork PRs when secrets are withheld.
   - _Remediation_: Added `id-token: write` to job `check` permissions in `.github/workflows/deploy.yml` (Section 3.5, Section 4.1, and Section 6).
2. **Finding 2 [Major - Resolved]**: `wait_for_ci: yes` caused race condition with `auto-merge` in Phase 1 and deadlock in Phase 2 upon branch protection.
   - _Remediation_: Set `require_ci_to_pass: no` and `notify.wait_for_ci: no` in `codecov.yml` (Section 3.6 and Section 3.7), decoupling asynchronous status reporting and allowing parallel evaluation during remaining `check` steps.
3. **Finding 3 [Minor - Resolved]**: Write boundary erroneously listed `bun.lockb` instead of Bun's text lockfile `bun.lock`.
   - _Remediation_: Corrected Table 4.1 to reference `bun.lock`.
4. **Finding 4 [Minor - Resolved]**: Configuration drift with non-existent `.mjs` and `src/env.d.ts`, and unversioned `@vitest/coverage-v8`.
   - _Remediation_: Aligned `include`/`exclude` in `vitest.config.ts` to TypeScript/TSX patterns and pinned `@vitest/coverage-v8: ^5.0.5` in parity with Vitest.

### 7.3 Human Decision Frontier & Recommendations

1. **Upload Reliability & Strictness**:
   - _Option A (Recommended)_: `fail_ci_if_error: false`. Codecov upload failures will not fail the CI build or block deployments.
   - _Option B_: `fail_ci_if_error: true`. CI fails if Codecov upload fails.
   - _Rationale_: For a frontend documentation site, third-party coverage reporting should never block critical production deployments or auto-merges.

2. **Branch Protection Enforcement**:
   - _Recommendation_: Keep Codecov status checks informative initially. Maintainers can add `codecov/project` as a required status check in GitHub repository settings once coverage reaches steady-state targets.

### 7.4 Status & Approval Verdict

- **Current Status**: Implemented & Verified Locally
- **Verdict**: Approved by Human Maintainer (Implementation Authorized)
