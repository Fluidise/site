---
title: 'The Product Contract: Fluidise Architectural Manifesto'
tagline: 'Core invariants and design philosophy governing every package in the Fluidise developer experience suite.'
principles:
  - number: '01'
    title: 'Agent-First Invariant'
    description: 'Outputs and telemetry are structured as versioned, machine-readable JSON by default. AI agents parse precise byte-range diagnostic spans without error-prone regex or unstructured stdout scraping.'
    highlight: 'JSON by default, text on request'
    icon: 'IconCpu'
  - number: '02'
    title: 'Strict Unix Philosophy'
    description: 'Each tool serves a precise, singular purpose. Packages remain independently usable and composable without requiring the adoption of the entire suite or heavy runtime environments.'
    highlight: 'Single responsibility, standalone binaries'
    icon: 'IconLayersSubtract'
  - number: '03'
    title: 'Zero Unannounced Mutation'
    description: 'Tools never silently rewrite repository configurations, install unannounced background hooks, or trigger unexpected network requests. Every lifecycle mutation requires explicit user or agent confirmation.'
    highlight: 'Read-only plan inspection, bounded execution'
    icon: 'IconShieldCheck'
---

# The Fluidise Architectural Manifesto

Every package published under the Fluidise developer experience suite conforms to foundational invariants established in our core specifications.

## Principle 01: Agent-First Invariant

Outputs and telemetry are structured as versioned, machine-readable JSON by default. AI coding agents parse precise byte-range diagnostic spans without error-prone regex or unstructured stdout scraping. When a human inspects terminal output, human ergonomics remain available via `--format text` or interactive flags, but the foundational protocol is machine-deterministic.

## Principle 02: Strict Unix Philosophy

Each tool serves a precise, singular purpose. Packages remain independently installable, usable, and composable without requiring the adoption of the entire suite or heavy runtime environments (such as Node.js, Python, or Ruby). Everything is distributed as standalone, high-performance native binaries.

## Principle 03: Zero Unannounced Mutation

Tools never silently rewrite repository configurations, install unannounced background hooks, or trigger unexpected network requests. Every lifecycle mutation requires explicit user or agent confirmation. Maintainers and agents can always inspect a read-only plan (`plan` command) before any state changes on disk.
