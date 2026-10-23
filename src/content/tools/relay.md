---
name: "fluidise-relay"
tagline: "Agent-first Git hook manager for deterministic orchestration and safe process control"
summary: "High-integrity Git lifecycle orchestrator written in Rust. Enforces deterministic command execution, read-only plan inspection before mutation, and structured diagnostics with bounded resource usage."
status: "in-progress"
version: "v0.1.0-alpha"
color: "emerald"
icon: "IconGitFork"
repoUrl: "https://github.com/Fluidise/relay"
brewCommand: "brew install Fluidise/homebrew-tap/fluidise-relay"
cargoCommand: "cargo install fluidise-relay"
order: 2
keyFeatures:
  - "Read-Only Plan Inspection: Verify exactly what commands will execute before mutating any Git hook file"
  - "Deterministic Orchestration: Manages commit-msg and pre-commit lifecycle with strict process isolation"
  - "Zero Runtime Footprint: Standalone binary with no Node, Python, or Ruby dependencies"
  - "Unified Configuration: Single fluidise.toml declarative format for whole-suite orchestration"
  - "JSON Diagnostics: Machine-readable event telemetry and exit codes for AI agents"
---

## Overview

Traditional Git hook managers often introduce unexpected dependencies (such as node_modules or global python environments), alter repo state without explicit consent, or mask child process failures behind unparseable text.

`fluidise-relay` provides a deterministic, lightweight Git hook manager written in Rust. It treats hook execution as an explicit execution pipeline where commands are isolated, timed, and inspected before installation.

## Key Capabilities

### 1. Read-Only Plan Inspection

Before installing or running hooks, maintainers and AI agents can inspect the execution plan:

```bash
fluidise-relay plan
```

This ensures full auditability without modifying `.git/hooks`.

### 2. Unified Suite Configuration

Hooks and suite tools are declared in a shared `fluidise.toml`:

```toml
[relay]
hooks = ["commit-msg", "pre-commit"]
timeout_ms = 5000

[[relay.hook.commit-msg]]
name = "lint-commit"
command = "fluidise-clint"
args = ["--file", "$1"]
```

### 3. Safe Hook Installation

```bash
fluidise-relay install
```

Installs minimal trampoline shims that delegate deterministic execution directly to `relay`.

## Installation

```bash
brew tap Fluidise/homebrew-tap
brew install fluidise-relay
```
