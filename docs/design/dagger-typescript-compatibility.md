# Architecture Design: Dagger TypeScript SDK Compatibility & Renovate Policy

- **Document Revision**: 1.0.0
- **Status**: Approved & Implemented
- **Target File**: `docs/design/dagger-typescript-compatibility.md`
- **Owner**: `Fluidise/site` Maintainers
- **Context**: Resolving CI failure on PR #47 (Run #84) and defining dependency governance for `.dagger/`

---

## 1. Problem Statement & Root Cause Analysis

### 1.1 Context

In PR #44 ([`ci/dagger-pipeline`](file://docs/design/dagger-ci-conflict-resolution.md)), Dagger was integrated into `Fluidise/site` to establish deterministic local and CI pipeline execution. The pipeline is defined as a TypeScript Dagger module under `.dagger/` with:

- [`dagger.json`](file://dagger.json) pinning engine version `v0.21.11` and TypeScript SDK.
- [`.dagger/package.json`](file://.dagger/package.json) declaring `"typescript": "5.9.3"`.
- [`.dagger/src/index.ts`](file://.dagger/src/index.ts) implementing `FluidiseSite` using decorators (`@object()`, `@func()`, `@argument()`).

Concurrently, the root application ([`package.json`](file://package.json)) operates on TypeScript 7 (`"typescript": "^7.0.0"`), leveraging the high-performance native compiler binary for `astro sync && tsc --noEmit`.

Automated dependency maintenance is handled by Mend Renovate ([`renovate.json`](file://renovate.json)), configured with `config:recommended`.

### 1.2 The CI Failure (PR #47 / Run #84)

Renovate detected `typescript: 5.9.3` inside `.dagger/package.json` and opened PR #47 (`renovate/typescript-7.x`, titled `fix(deps): update dependency typescript to v7`), bumping `.dagger/package.json` and `.dagger/yarn.lock` to `typescript@7.0.2`.

Upon triggering GitHub Actions workflow `deploy.yml` (Run #84, database ID `42333715564`), the pipeline crashed during step `fluidiseSite` constructor evaluation:

```text
fluidiseSite(source: Directory!)
/src/.dagger/sdk/core.js:132125
  [ts2.SyntaxKind.ClassDeclaration]: ts2.isClassDeclaration,
                  ^

TypeError: Cannot read properties of undefined (reading 'ClassDeclaration')
    at <anonymous> (/src/.dagger/sdk/core.js:132125:19)
    at ModuleJob.run (node:internal/modules/esm/module_job:430:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:661:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)

Node.js v24.13.1
##[error]Process completed with exit code 1.
```

### 1.3 Technical Root Cause

1. **TypeScript 7 Architecture Shift**:
   - TypeScript 7.0 (`typescript@7.0.2`) is a ground-up native rewrite (typescript-go).
   - Its npm distribution consists of platform-specific precompiled binaries and a minimal ESM/CJS wrapper that exports only metadata:
     ```javascript
     {
       default: { version: "7.0.2", versionMajorMinor: "7.0" },
       version: "7.0.2",
       versionMajorMinor: "7.0"
     }
     ```
   - The JavaScript TypeScript Compiler API (`ts.SyntaxKind`, `ts.isClassDeclaration`, `ts.createSourceFile`, AST nodes and visitors) is **completely absent** from `typescript@7.x`.

2. **Dagger TypeScript SDK Dependency**:
   - Dagger TypeScript SDK (`@dagger.io/dagger` at engine `v0.21.11`) relies on Node.js-based AST introspection (`ts.SyntaxKind.ClassDeclaration`, etc.) to parse module classes, methods, and decorators (`@object()`, `@func()`, `@argument()`) and register the GraphQL schema with the Dagger engine.
   - When `.dagger/package.json` installs `typescript@7.0.2`, `ts2.SyntaxKind` is `undefined`, causing a fatal `TypeError` at startup before any pipeline function can execute.

3. **Architectural Separation**:
   - The root site workspace and the `.dagger/` module have fundamentally different runtime boundaries:
     - Root workspace: Needs native CLI `tsc` for fast static type-checking (`astro sync && tsc --noEmit`). Works seamlessly with TypeScript 7.
     - `.dagger/` module: Needs the JavaScript compiler API (`typescript` 5.x) inside Dagger's containerized module runtime. **Cannot support TypeScript 7** until Dagger upstream adapts its SDK.

---

## 2. Invariants & Architectural Constraints

1. **Root Tooling Modernity Invariant**:
   The root project must remain on TypeScript 7 (`^7.0.0`), preserving the benefits of native compilation speed and current ecosystem dependencies without regressively downgrading the main codebase.
2. **Local and CI Execution Parity Invariant**:
   `dagger call check` must run reproducibly and identically both on developer machines and in GitHub Actions runners.
3. **Automated Maintenance Invariant**:
   Renovate must continue automating routine updates for root application dependencies, GitHub Actions workflows, and tooling, while preventing incompatible major updates to encapsulated sub-systems.
4. **Encapsulation Boundary Invariant**:
   `.dagger/` is a self-contained Dagger module with its own `package.json`, `tsconfig.json`, and lockfile. Its internal runtime requirements must not bleed into the root workspace, nor should root policies break `.dagger/`.

---

## 3. Structural Decisions & Design Options

### 3.1 Option Evaluation

| Dimension                | Option A: Renovate Targeted PackageRule (Recommended)                                        | Option B: Ignore `.dagger/**` in Renovate                         | Option C: Downgrade Root to TypeScript 5                      |
| :----------------------- | :------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- | :------------------------------------------------------------ |
| **Strategy**             | Add `packageRules` in `renovate.json` constraining `typescript` in `.dagger/**` to `<6.0.0`. | Add `.dagger/**` to `ignorePaths` in `renovate.json`.             | Downgrade root `package.json` to `5.9.3` to match `.dagger/`. |
| **Root Modernity**       | Preserved (TS 7.x in root).                                                                  | Preserved (TS 7.x in root).                                       | Regressed (TS 5.x in root).                                   |
| **Dagger Stability**     | Guaranteed (TS 5.x pinned in `.dagger/`).                                                    | Guaranteed (no automated changes to `.dagger/`).                  | Guaranteed, but at cost of root regression.                   |
| **Maintenance Burden**   | Zero maintenance; allows future minor/patch updates within TS 5.x.                           | High: any legitimate Dagger module updates must be done manually. | Re-introduces legacy compiler across entire site.             |
| **Renovate PR Behavior** | PR #47 is automatically closed/withdrawn by Renovate.                                        | PR #47 must be manually closed.                                   | Forces PR #47 to downgrade everything.                        |

**Decision**: **Option A** (Targeted Renovate `packageRules` with version constraint) combined with defense-in-depth documentation in `.dagger/package.json`.

### 3.2 Renovate Governance Specification

Modify [`renovate.json`](file://renovate.json) to declare explicit rules for `.dagger/**`:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:recommended"],
  "semanticCommits": "enabled",
  "semanticCommitType": "chore",
  "semanticCommitScope": "deps",
  "packageRules": [
    {
      "description": "Dagger TypeScript SDK v0.21.11 requires the TypeScript 5 Compiler API (ts.SyntaxKind); restrict typescript upgrades in .dagger to <6.0.0",
      "matchFileNames": [".dagger/**"],
      "matchDepNames": ["typescript"],
      "matchPackageNames": ["typescript"],
      "allowedVersions": "<6.0.0"
    },
    {
      "description": "Prevent major dependency updates inside .dagger to protect Dagger engine runtime compatibility",
      "matchFileNames": [".dagger/**"],
      "matchUpdateTypes": ["major"],
      "enabled": false
    }
  ]
}
```

#### Rule Mechanics:

1. `matchFileNames: [".dagger/**"]` with `matchDepNames: ["typescript"]` / `matchPackageNames: ["typescript"]` and `allowedVersions: "<6.0.0"` prevents Renovate from proposing TypeScript 6 or 7 for the Dagger module.
2. `matchFileNames: [".dagger/**"]` with `matchUpdateTypes: ["major"]` and `enabled: false` acts as a fail-safe: no major dependency upgrades inside `.dagger/` will be proposed without explicit developer intervention.
3. Renovate's bot will detect that PR #47 is no longer eligible under the updated `allowedVersions` constraint and will automatically close PR #47.

### 3.3 Resolution of Open PR #47

1. Merge the Renovate configuration hardening to `main`.
2. Renovate will automatically mark PR #47 as abandoned/closed on its next hourly evaluation.
3. If an immediate clean state is desired before the bot cycle, a maintainer or agent can close PR #47 via:
   ```bash
   gh pr close 47 --delete-branch --comment "Closed in favor of docs/design/dagger-typescript-compatibility.md: .dagger module requires TypeScript 5 compiler API for Dagger SDK v0.21.11 compatibility."
   ```

---

## 4. Target Scope, Contract Specifications & File Diff Preview

### 4.1 Target Scope & File Boundaries

| Action                 | Target Path                                           | Rationale                                                          |
| :--------------------- | :---------------------------------------------------- | :----------------------------------------------------------------- |
| **Modify**             | [`renovate.json`](file://renovate.json)               | Add `packageRules` to constrain `.dagger/**` dependencies.         |
| **Verify / Unchanged** | [`.dagger/package.json`](file://.dagger/package.json) | Ensure `"typescript": "5.9.3"` remains unchanged on `main`.        |
| **Verify / Unchanged** | [`dagger.json`](file://dagger.json)                   | Engine `v0.21.11` and TypeScript SDK declaration remain unchanged. |
| **Verify / Unchanged** | [`package.json`](file://package.json)                 | Root `typescript: "^7.0.0"` remains unchanged.                     |
| **Create / Delete**    | _None_                                                | Zero new production files created or deleted.                      |

### 4.2 Target File: `renovate.json`

```diff
--- a/renovate.json
+++ b/renovate.json
@@ -4,4 +4,19 @@
   "semanticCommits": "enabled",
   "semanticCommitType": "chore",
-  "semanticCommitScope": "deps"
+  "semanticCommitScope": "deps",
+  "packageRules": [
+    {
+      "description": "Dagger TypeScript SDK v0.21.11 requires the TypeScript 5 Compiler API; restrict upgrades in .dagger to <6.0.0",
+      "matchFileNames": [".dagger/**"],
+      "matchDepNames": ["typescript"],
+      "matchPackageNames": ["typescript"],
+      "allowedVersions": "<6.0.0"
+    },
+    {
+      "description": "Prevent major dependency updates inside .dagger to protect Dagger engine runtime compatibility",
+      "matchFileNames": [".dagger/**"],
+      "matchUpdateTypes": ["major"],
+      "enabled": false
+    }
+  ]
 }
```

### 4.3 Target File: `.dagger/package.json`

Verify that `.dagger/package.json` on `main` remains locked to `5.9.3`:

```json
{
  "type": "module",
  "dependencies": {
    "typescript": "5.9.3"
  }
}
```

No modification to `.dagger/package.json` is required on `main`, as `origin/main` already has `"typescript": "5.9.3"`. Only the Renovate governance configuration requires updating.

---

## 5. Verification Plan

### 5.1 Renovate Schema Validation

Validate `renovate.json` syntax and schema conformance using `bun` and `npx --yes renovate-config-validator`:

```bash
bun x --yes --package renovate renovate-config-validator renovate.json
```

**Expected Result**: `INFO: Validating renovate.json ... Config is valid`.

### 5.2 Formatting & Lint Verification

Run the repository verification gates:

```bash
bun run format:check
bun run lint
```

**Expected Result**: Oxfmt and Oxlint pass with zero errors.

### 5.3 Local Dagger Pipeline Execution

Verify that the local Dagger pipeline runs smoothly with `.dagger/package.json` on TypeScript 5.9.3 while root uses TypeScript 7:

```bash
bun run check
bun run ci
```

**Expected Result**:

- `astro sync && tsc --noEmit` succeeds with root `typescript@7.0.2`.
- `dagger call check` passes all 10 validation gates and container builds without `TypeError: Cannot read properties of undefined (reading 'ClassDeclaration')`.

---

## 6. Risks, Failure Modes & Mitigations

| Risk                                             | Impact | Mitigation                                                                                                                                                                                                        |
| :----------------------------------------------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Renovate Ignores `matchFileNames` Pattern**    | Low    | `matchFileNames` supports exact path globs (`.dagger/**`). Verified against Renovate documentation schema. Validated via `renovate-config-validator`.                                                             |
| **Future Dagger Engine Requires TS Update**      | Low    | When Dagger engine is upgraded (e.g., to an engine version supporting TypeScript 7 native AST), the `allowedVersions` constraint in `renovate.json` can be updated alongside the engine version in `dagger.json`. |
| **Root Dependency Contamination into `.dagger`** | Low    | `.dagger` uses its own `yarn.lock` and containerized resolution within Dagger engine. `dagger.json` explicitly designates `.dagger` as the isolated module root.                                                  |
| **PR #47 Left Hanging**                          | Low    | PR #47 can be closed immediately with a descriptive comment linking to this design document.                                                                                                                      |

---

## 7. Review & Approval State

- **Substantive Body Revision Hash**: `109880bece510852a1b7b7a3880504d54d5f4666a01d1a297910847c267e7258` (SHA-256 over sections 1–6)
- **Review Coverage**:
  - `egm-design-critic`: Architectural fit, invariants, contract boundaries, failure handling, and implementation readiness.
  - Review verdict: **READY FOR IMPLEMENTATION**.
- **Review Findings & Resolutions**:
  - _Finding 1 (Nit - Matcher Specification Best Practice in Renovate)_: Resolved. Added `matchDepNames` alongside `matchPackageNames` in Rule 1.
  - _Finding 2 (Nit - Explicit Target Scope & File Boundary Block)_: Resolved. Formalized explicit write/verify boundary in Section 4.1 per `implementation-readiness-standard.md`.
  - _Finding 3 (Nit - Remote Branch Cleanup on PR #47 Closure)_: Resolved. Added `--delete-branch` to `gh pr close 47` command in Section 3.3.
- **Open Material Findings**: None.
- **Accepted Risks**: None.
- **Human Approval**: Approved by human maintainer on 2026-11-08.
