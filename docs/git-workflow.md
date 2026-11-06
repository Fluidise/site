# Git Workflow & Shipping Cadence for `Fluidise/site`

This document defines the authoritative Git workflow, branching model, commit conventions, and shipping cadence for contributors and automated agents working on `Fluidise/site`.

---

## 1. Core Principles: Fast Shipping & Task Cadence

To accelerate delivery, minimize integration drift, and maintain continuous reviewability, development follows **Trunk-Based Development** paired with **rapid task-level shipping**:

1. **Task-Level Atomicity**:
   - Break larger epics or themes into small, cohesive, and independently reviewable task units.
   - Each task unit must focus on a single capability, fix, documentation update, or visual enhancement within that theme.
2. **Frequent Commits**:
   - Commit immediately upon completing each cohesive task unit.
   - Never accumulate disparate or unrelated changes across multiple domains into a single monolithic commit or PR.
3. **Immediate Pull Requests**:
   - As soon as a task unit is completed and verified, push the branch and open a dedicated Pull Request targeting `main`.
   - Do not defer PR creation until an entire multi-task milestone is finished. Smaller, task-focused PRs ship faster, are easier to review, and avoid merge conflicts.

---

## 2. Branching Strategy

- **Base Branch**: `main` is the single source of truth for production.
- **Short-Lived Branches**: Branches should live for hours to a couple of days at most.
- **Branch Naming Conventions**:
  - `feat/<short-name>`: New user-facing features, components, or UI capabilities (e.g., `feat/hero-terminal`).
  - `fix/<short-name>`: Bug fixes, layout corrections, and patch releases (e.g., `fix/navbar-mobile-toggle`).
  - `docs/<short-name>`: Documentation, guides, or workflow updates (e.g., `docs/git-workflow`).
  - `chore/<short-name>`: Dependency bumps, tooling setup, or repository housekeeping (e.g., `chore/align-bun-version`).
  - `ci/<short-name>`: CI/CD workflows, build configurations, or deployment pipelines.

---

## 3. Commit Standards

### 3.1 Conventional Commits

All commit messages must adhere to the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```text
<type>(<optional scope>): <imperative summary>

[optional body]

[optional footer(s)]
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.

### 3.2 Commit Language

All commit messages must be written in **English** (imperative mood, e.g., `add interactive terminal component`, not `added` or `adds`).

### 3.3 Strict Co-Authorship Ban

**Never** append co-author trailers such as `Co-authored-by: Claude`, `Co-Authored-By: ...`, or any automated assistant attribution in commit messages.

### 3.4 Atomic Content

Each commit should represent a single cohesive change. Keep code changes, associated styling, tests, and documentation synchronized within the same atomic commit.

---

## 4. Verification Gates Before Shipping

Before committing, pushing, or opening a Pull Request, verify that all validation gates pass locally:

1. **Type & Component Check**:
   ```bash
   bun run check
   ```
2. **Production Build**:
   ```bash
   bun run build
   ```
3. **Clean Working Tree**: Ensure no accidental artifacts, temporary scratch files, or unwanted untracked files are staged.

---

## 5. Pull Request Protocol

1. **Branch Up-to-Date**: Ensure your branch is rebased or merged cleanly against the latest `origin/main`.
2. **PR Title**: Follow Conventional Commits format matching the primary task unit (e.g., `docs(workflow): formalize frequent commit and PR cadence`).
3. **PR Description**:
   - Provide a clear summary of the task completed.
   - Detail the motivation, affected components/files, and evidence of local verification (`bun run check`, `bun run build`).
4. **Review & Merge**: Prefer squash-and-merge or linear rebase into `main` to preserve a clean, traceable history.
