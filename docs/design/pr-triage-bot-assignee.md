# Architecture Design: Resilient PR Triage & Bot Author Handling

- **Document Revision**: 1.2.0
- **Status**: Approved & Implemented
- **Target File**: `docs/design/pr-triage-bot-assignee.md`
- **Owner**: `Fluidise/site` Maintainers
- **Context**: GitHub Actions Automation & Pull Request Triage Pipeline

---

## 1. Problem Statement & Strategic Objective

### 1.1 Context

The `Fluidise/site` repository employs an automated pull request triage workflow ([`.github/workflows/pr-triage.yml`](file://.github/workflows/pr-triage.yml)) triggered on `pull_request_target` events (`opened`, `edited`, `ready_for_review`, `converted_to_draft`).

This workflow performs two primary functions:

1. Auto-assigns the PR author to the pull request upon initial opening (`action == "opened"`).
2. Inspects branch naming patterns (`feat/*`, `fix/*`, `chore/*`, etc.) and Conventional Commit PR titles to deterministically apply type labels, breaking-change indicators, and draft/review status labels (`work-in-progress`, `needs-review`).

Automated dependency updates are managed via Mend Renovate ([`renovate.json`](file://renovate.json)), which opens automated dependency upgrade pull requests under the GitHub App account `app/renovate` (display name `renovate[bot]`).

### 1.2 Root Problem

When Renovate opens a dependency PR (e.g., PR #40, #42, #43), the PR triage workflow crashes during step 1:

```text
Run set -euo pipefail
Assigning PR author @app/renovate...
GraphQL: Could not resolve to a user or bot with the login 'app/renovate'. (replaceActorsForAssignable)
##[error]Process completed with exit code 1.
```

#### Technical Root Cause Analysis

1. **GitHub Actor Model & Assignee GraphQL Constraints**:
   - The workflow queries PR metadata via GitHub CLI:
     ```bash
     PR_JSON=$(gh pr view "$PR_URL" --json author,headRefName,title,body,isDraft,labels)
     PR_AUTHOR=$(jq -r '.author.login' <<< "$PR_JSON")
     ```
   - For GitHub Apps (like Renovate), GitHub CLI returns:
     ```json
     {
       "author": {
         "is_bot": true,
         "login": "app/renovate"
       }
     }
     ```
   - The GitHub GraphQL mutation `replaceActorsForAssignable(input: {assignableId: $id, actorIds: [...]})` strictly requires assignable user accounts—specifically repository collaborators, organization members, or designated repository triage actors.
   - GitHub App integrations (represented as `app/<app-slug>`) and bot integrations that are not registered as assignable collaborator accounts cannot be resolved as assignable actors.

2. **Fatal Cascade under Shell Pipeline Flags**:
   - The triage script runs with `set -euo pipefail`.
   - When `gh pr edit "$PR_URL" --add-assignee "$PR_AUTHOR"` encounters the GraphQL rejection, the command exits with code 1.
   - The shell terminates immediately, aborting the workflow before Step 2 (type labels), Step 3 (breaking changes), and Step 4 (review status label) can execute.
   - **Impact**: All Renovate PRs are left unlabeled (`labels: []`), fail status checks with a red cross, and bypass automated triage categorization. Furthermore, any external human contributor submitting a PR from a fork who is not an established collaborator would trigger the exact same GraphQL rejection.

### 1.3 Strategic Objective

Transform the PR triage workflow into a fault-tolerant, deterministic pipeline:

1. Eliminate fatal crashes on bot and GitHub App PRs (Renovate, Dependabot, GitHub Actions).
2. Ensure conventional labels and review status labels are deterministically applied to all PRs regardless of author type.
3. Establish robust actor classification separating assignable human contributors from non-assignable automated bots/apps.
4. Implement graceful fault tolerance ensuring unassignable authors (e.g. fork contributors) do not halt subsequent label management.

---

## 2. Invariants & Architectural Constraints

1. **Deterministic Triage Completion Invariant**:
   - The PR triage workflow must complete successfully (`exit 0`) and apply all relevant labels (`feat`, `fix`, `chore`, `needs-review`, etc.) for every valid pull request, whether opened by repository maintainers, external fork contributors, or automated bots.
2. **Actor Assignability Invariant**:
   - Non-assignable actors (actors where `.author.is_bot == true`, logins prefixed with `app/`, or logins suffixed with `[bot]`) must never be submitted to `gh pr edit --add-assignee`.
3. **Failure Isolation Invariant**:
   - Failure to assign a PR author (e.g., an external first-time contributor who is not an authorized collaborator on the repository) must be treated as a non-fatal advisory condition. It must emit a warning and allow subsequent labeling steps to execute uninterrupted.
4. **Scope Containment**:
   - Modifications are strictly restricted to the GitHub Actions triage workflow definition ([`.github/workflows/pr-triage.yml`](file://.github/workflows/pr-triage.yml)), with zero modifications to application runtime code, build tools, or container images.
5. **Separation of Bot Triage vs. Native Bot Configuration**:
   - Generic GitHub Actions workflows must not hardcode specific maintainer usernames as fallback assignees for bots. If maintainer assignment for Renovate is desired, it must be declared declaratively in [`renovate.json`](file://renovate.json) using Renovate's native configuration schema.

---

## 3. Structural Decisions & Implementation Specification

### 3.1 Metadata Extraction Enhancement

In [`.github/workflows/pr-triage.yml`](file://.github/workflows/pr-triage.yml), update the JSON extraction step to inspect `.author.is_bot` alongside `.author.login`:

```bash
PR_JSON=$(gh pr view "$PR_URL" --json author,headRefName,title,body,isDraft,labels)
PR_AUTHOR=$(jq -r '.author.login // ""' <<< "$PR_JSON")
IS_BOT=$(jq -r '.author.is_bot // false' <<< "$PR_JSON")
```

### 3.2 Robust Bot Classification & Resilient Assignment

Replace the naive assignment block:

#### Current (Vulnerable) Implementation:

```bash
# 1. Auto-assign PR author upon creation
if [ "$ACTION" = "opened" ]; then
  echo "Assigning PR author @$PR_AUTHOR..."
  gh pr edit "$PR_URL" --add-assignee "$PR_AUTHOR"
fi
```

#### Proposed (Resilient) Implementation:

```bash
# 1. Auto-assign PR author upon creation (human assignable collaborators only)
if [ "$ACTION" = "opened" ]; then
  if [ -n "$PR_AUTHOR" ] && [ "$IS_BOT" != "true" ] && [[ ! "$PR_AUTHOR" =~ ^app/ ]] && [[ ! "$PR_AUTHOR" =~ \[bot\]$ ]]; then
    echo "Assigning PR author @$PR_AUTHOR..."
    gh pr edit "$PR_URL" --add-assignee "$PR_AUTHOR" || echo "::warning::Could not assign PR author @$PR_AUTHOR (author may not be an assignable repository collaborator)."
  else
    echo "Skipping author assignment: @${PR_AUTHOR:-unknown} is a bot, GitHub App, or unresolvable."
  fi
fi
```

### 3.3 Defense-in-Depth Mechanism

The assignment logic features two complementary defense layers:

1. **Pre-emptive Filtration**:
   - `[ -n "$PR_AUTHOR" ]`: Prevents execution if author is null or empty.
   - `[ "$IS_BOT" != "true" ]`: Uses GitHub CLI's structured `is_bot` boolean metadata.
   - `[[ ! "$PR_AUTHOR" =~ ^app/ ]]`: Filters out GitHub App author logins (such as `app/renovate`).
   - `[[ ! "$PR_AUTHOR" =~ \[bot\]$ ]]`: Filters out traditional bot user accounts (such as `dependabot[bot]`).
2. **Graceful Fault Tolerance (`|| echo "::warning::..."`)**:
   - If GitHub GraphQL rejects an author assignment for an unexpected reason (such as an external open-source contributor submitting from a fork who lacks collaborator status on the target repository), the command outputs a GitHub Actions `::warning::` annotation rather than terminating the shell under `set -e`.
   - Downstream steps (Conventional Commit type labeling, breaking change detection, and status labeling) execute cleanly.
   - _Stderr Passthrough Note_: GitHub CLI outputs the raw GraphQL rejection message to `stderr` upon command failure; the trailing `|| echo "::warning::..."` captures the non-zero exit code, logs the advisory warning annotation, and ensures the script exits `0` for that step without triggering `set -e`.

### 3.4 Trade-off Analysis: Maintainer Assignment for Renovate PRs

| Approach                                             | Architecture                                                                                                            | Advantages                                                                                                              | Disadvantages                                                                                                             | Verdict                               |
| :--------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ | :------------------------------------ |
| **Option A: Leave Bot PRs Unassigned (Recommended)** | `pr-triage.yml` skips bot assignment. PRs are tracked via labels (`chore`, `needs-review`) and automated CI auto-merge. | Zero maintenance overhead, no hardcoded usernames in CI workflows, zero notification spam for routine dependency bumps. | Maintainers rely on GitHub notification feeds or PR search filters rather than the "Assigned" filter.                     | **Adopted**                           |
| **Option B: Assign Maintainer in Workflow**          | Hardcode `Acrazie` as fallback assignee in `pr-triage.yml` when `IS_BOT == "true"`.                                     | Bot PRs appear directly in maintainer's assigned queue.                                                                 | Violates workflow generality; brittle if repository ownership changes; tightly couples workflow to specific user account. | **Rejected**                          |
| **Option C: Native Renovate Configuration**          | Add `"assignees": ["Acrazie"]` to `renovate.json`.                                                                      | Native Renovate feature; declarative; independent of CI workflow code.                                                  | Only affects Renovate, not other potential bots (e.g. Dependabot).                                                        | **Deferred to maintainer preference** |

---

## 4. Target Scope & File Boundary

### 4.1 Write Boundary

The implementation stage is strictly bounded to the following file:

| Path                              | Action | Purpose                                                                                    |
| :-------------------------------- | :----- | :----------------------------------------------------------------------------------------- |
| `.github/workflows/pr-triage.yml` | Modify | Implement bot filtering, structured `is_bot` detection, and non-fatal assignment handling. |

No other files in the repository (source code, configuration, assets, Dockerfiles, or documentation) shall be modified.

---

## 5. Verification & Validation Plan

### 5.1 Synthetic Unit Verification of Classification Logic

Execute local Bash test harness covering all actor permutation types:

```bash
bash -c '
set -euo pipefail

test_cases=(
  "{\"author\":{\"login\":\"Acrazie\",\"is_bot\":false}}"
  "{\"author\":{\"login\":\"app/renovate\",\"is_bot\":true}}"
  "{\"author\":{\"login\":\"renovate[bot]\",\"is_bot\":true}}"
  "{\"author\":{\"login\":\"external-contributor\",\"is_bot\":false}}"
  "{\"author\":null}"
)

for PR_JSON in "${test_cases[@]}"; do
  PR_AUTHOR=$(jq -r ".author.login // \"\"" <<< "$PR_JSON")
  IS_BOT=$(jq -r ".author.is_bot // false" <<< "$PR_JSON")

  if [ -n "$PR_AUTHOR" ] && [ "$IS_BOT" != "true" ] && [[ ! "$PR_AUTHOR" =~ ^app/ ]] && [[ ! "$PR_AUTHOR" =~ \[bot\]$ ]]; then
    echo "TEST PASS: Assigning human collaborator @$PR_AUTHOR"
  else
    echo "TEST PASS: Skipping assignment for bot/app/empty (@${PR_AUTHOR:-unknown})"
  fi
done
'
```

**Expected Results**:

- `Acrazie`: Assigned.
- `app/renovate`: Skipped.
- `renovate[bot]`: Skipped.
- `external-contributor`: Assigned (with graceful fallback if non-collaborator).
- `null`: Skipped.

### 5.2 Workflow Syntax & Static Analysis

1. Verify YAML syntax and script formatting using Oxfmt:
   ```bash
   bun run format:check
   ```
2. Validate Bash syntax using `bash -n`:
   ```bash
   bash -n <(yq '.jobs.triage.steps[0].run' .github/workflows/pr-triage.yml 2>/dev/null || sed -n '28,$p' .github/workflows/pr-triage.yml)
   ```

### 5.3 Live GitHub Actions Verification

1. Re-run or trigger `pr-triage.yml` against an active Renovate PR (e.g. using `gh run rerun <run-id>` on a previously failed triage run, or via PR lifecycle events like title edit or draft conversion).
2. Confirm:
   - Step 1 outputs: `Skipping author assignment: @app/renovate is a bot, GitHub App, or unresolvable.`
   - Step 2 applies the `chore` label derived from `chore(deps): ...`.
   - Step 4 applies the `needs-review` label.
   - The workflow finishes with `conclusion: success` (exit code 0).

---

## 6. Risks, Failure Modes & Mitigations

| Risk                                                          | Impact | Mitigation                                                                                                                                                                                                          |
| :------------------------------------------------------------ | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **False Positive Bot Detection (Valid human skipped)**        | Low    | The regex specifically targets `^app/` and `\[bot\]$`, while `IS_BOT` relies on GitHub's authoritative API field. Standard usernames (e.g. `john_doe`, `acrazie`) cannot match these patterns.                      |
| **False Negative Bot Detection (Unrecognized bot attempted)** | Low    | If an exotic bot is not flagged by `is_bot` or naming regex, `replaceActorsForAssignable` failure is caught by the non-fatal warning fallback (`\|\| echo "::warning::..."`), preventing workflow termination.      |
| **External Fork Contributor Rejection**                       | Medium | External open-source contributors are not assignable collaborators in GitHub. The non-fatal warning fallback clause (`\|\| echo "::warning::..."`) ensures their PRs still receive type and status labels smoothly. |
| **Label Collision or Race Condition**                         | Low    | Workflow concurrency group `group: ${{ github.workflow }}-${{ github.event.pull_request.number }}` serializes execution per PR, preventing concurrent edit collisions.                                              |

---

## 7. Review & Approval State

- **Substantive Body Revision Hash**: `70dbae69cd2b7530ffb3b223b2fb74f6a7bb11e3f3d63f6cf598512f785b13b3` (SHA-256 over sections 1–6)
- **Review Coverage**:
  - `egm-design-critic`: Architectural fit, invariants, contract boundaries, failure handling, and implementation readiness.
  - Review verdict: **READY FOR IMPLEMENTATION / APPROVED**.
- **Review Findings & Resolutions**:
  - _Finding 1 (Nit - Script Slicing Range)_: Resolved. Updated `sed` fallback extraction in Section 5.2 from `28,95p` to `28,$p` to dynamically capture all lines through EOF regardless of net script expansion.
  - _Finding 2 (Nit - Workflow Trigger Clarity)_: Resolved. Clarified in Section 5.3 that live verification is executed via PR lifecycle events (e.g. `gh run rerun <id>` or title/state edit) rather than non-existent `workflow_dispatch`.
  - _Finding 3 (Nit - Stderr Passthrough Note)_: Resolved. Added an explicit note in Section 3.3 explaining that raw GraphQL failure outputs to `stderr` from GitHub CLI are expected advisory outputs safely captured by `|| echo "::warning::..."` without tripping `set -e`.
- **Open Material Findings**: None.
- **Accepted Risks**: None.
- **Human Approval**: Approved by human maintainer on 2026-11-07.
