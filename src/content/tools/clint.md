---
name: 'fluidise-clint'
taskTitle: 'Validate commit messages'
banner: '../../assets/tools/clint-banner.png'
tagline: 'Deterministic Conventional Commits validator designed for AI agents and automated workflows'
summary: 'High-performance commit message linter that emits structured, versioned JSON diagnostics by default with exact byte-range spans, guaranteed bounded execution, and zero filesystem side effects.'
status: 'released'
version: 'v1.0.0'
color: 'plum'
icon: 'IconChecklist'
repoUrl: 'https://github.com/Fluidise/clint'
brewCommand: 'brew install Fluidise/homebrew-tap/fluidise-clint'
cargoCommand: 'cargo install fluidise-clint'
order: 1
keyFeatures:
  - 'Default Machine-Readable JSON: Emits versioned diagnostics with byte spans on stdout for agent consumption'
  - 'Zero Side-Effects Guarantee: Never mutates repositories, installs unannounced hooks, or makes network calls'
  - 'Strict Operational Determinism: Exact RFC 2119 linting with stable exit codes (0 = valid, 1 = violation, 2 = usage)'
  - 'Human Ergonomics: Switch instantly to formatted visual terminal reports with --format text'
  - 'Standalone Native Binary: Built with Rust 1.85+, sub-millisecond execution with zero runtime dependencies'
cli:
  binary: 'fluidise-clint'
  args: ['<commit-message>']
  flags:
    - flag: '--format <json|text>'
      description: 'Output format: structured JSON (default) or formatted human-readable terminal text'
    - flag: '--version'
      description: 'Print version'
    - flag: '--help'
      description: 'Print help information'
  exitCodes:
    '0': 'Conventional commit convention verified successfully'
    '1': 'Conventional commit convention violation detected'
    '2': 'Command-line syntax or invocation error'
---

## Overview

Modern developer workflows increasingly rely on autonomous AI coding agents, continuous integration pipelines, and automated bots. Conventional commit linters designed strictly for human terminals often produce unstructured logs, spawn shell subprocesses, or require heavy runtime environments like Node or Python.

`fluidise-clint` is built from scratch with an **Agent-First** invariant: interfaces, outputs, and exit codes are deterministic, predictable, and immediately actionable for automated agents and developers alike.

## Installation

### Via Homebrew (macOS & Linux)

```bash
brew tap Fluidise/homebrew-tap
brew install fluidise-clint
```

### Via Cargo (Rust)

```bash
cargo install fluidise-clint
```

### Precompiled Standalone Binaries

Download self-contained binaries for Apple Silicon (`aarch64-apple-darwin`), Intel macOS (`x86_64-apple-darwin`), and Linux (`x86_64-unknown-linux-gnu`) directly from the [GitHub Releases](https://github.com/Fluidise/clint/releases).

## Quick Start

### Machine-Readable JSON (Default)

By default, `fluidise-clint` outputs structured JSON (`schema_version: 1`), enabling coding agents to parse errors with byte-level precision:

```bash
fluidise-clint "feat: add user authentication"
```

Output:

```json
{
  "schema_version": 1,
  "status": "valid",
  "diagnostics": []
}
```

When a violation occurs:

```bash
fluidise-clint "bad commit message"
```

Output:

```json
{
  "schema_version": 1,
  "status": "invalid",
  "diagnostics": [
    {
      "code": "missing_type",
      "message": "Commit message must start with a valid type (e.g., feat, fix, chore)",
      "span": {
        "start": 0,
        "end": 3
      }
    }
  ]
}
```

### Human-Readable Terminal Reports

Pass `--format text` to switch to formatted terminal diagnostics:

```bash
fluidise-clint "bad commit message" --format text
```

## Exit Codes

| Code | Meaning                                                     |
| :--- | :---------------------------------------------------------- |
| `0`  | Commit message satisfies Conventional Commits specification |
| `1`  | One or more linting errors detected                         |
| `2`  | Runtime or CLI configuration error                          |
