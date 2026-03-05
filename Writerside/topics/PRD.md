# PRD-lite

## Overview

SystemHaus addresses the gap between design systems as defined in design tools and design systems as
implemented in production code, for teams building and maintaining multiple frontend applications.

## Problem Statement

**Primary user:** Design-system-owning frontend engineers working closely with product designers on
multi-app or white-label products.

**Today**, these teams try to keep design tokens, themes, and component styling aligned between
design tools and codebases across multiple products.

**But they can’t**, because design variables live in one place, implementation details live in
another, and there is no shared source of truth that works across tools, frameworks, and runtime
environments.

**So they** rely on manual handoffs, duplicated token files, custom scripts, or informal conventions
to translate design decisions into code and keep them in sync.

**This leads to** inconsistent UI across products, slow iteration when design changes, higher risk
of regressions, and increasing maintenance cost as the number of themes, brands, or apps grows.

**We believe solving this matters now because** modern teams ship faster, across more surfaces, with
fewer people — making the cost of design-to-code drift compound rapidly over time.

## Goals

This product must:

- Create a **single source of truth for design tokens and themes** that can be consumed consistently
  across multiple frontend applications.
- **Reduce design-to-code drift** by making design changes propagate predictably and intentionally
  into production environments.
- **Lower the maintenance cost of multi-theme and white-label products**, especially as product
  count grows.
- **Enable incremental adoption**, allowing teams to integrate without rewriting existing design
  systems.
- **Support real-world shipping constraints**, including runtime theming, versioning, and controlled
  rollout of visual changes.

## Non-Goals

This product is explicitly **not** trying to:

- Be a full design tool or replace design authoring workflows.
- Generate or own component libraries for every framework.
- Provide a no-code page or layout builder.
- Solve enterprise-grade governance, approvals, or compliance out of the box.
- Abstract away frontend engineering decisions entirely.

## Users & Use Cases

### Primary User

**Design-system-owning frontend engineer**

Responsible for maintaining consistency across products, translating design decisions into code,
debugging visual regressions, and supporting multiple brands or themes.

They are accountable for both **quality and velocity**.

### Secondary Users

- **Product designers** — define visual decisions and expect them to appear accurately in
  production.
- **Product engineers** — consume tokens and components but do not manage the system itself.

These users influence adoption but do not own the system.

### Core Use Cases (Must Work on Day One)

1. **Define and manage design tokens and themes in a single place** Tokens and themes can be
   created, updated, and organized centrally.

2. **Propagate design changes predictably to consuming applications** Updates can be applied
   intentionally, without manual duplication or fragile sync steps.

3. **Support multiple products and brands without duplication** Shared foundations with controlled
   overrides are possible across products.

4. **Integrate into existing codebases incrementally** Teams can adopt the system without rewriting
   their design system or components.

### Important Edge Cases (Acknowledged, Not Overbuilt)

- Temporary divergence between design and code during active development
- Partial adoption (only some tokens managed centrally)
- Teams without a formal design tool workflow

The system should tolerate these cases, not fully solve them initially.

## Current State & Alternatives

### How Teams Handle This Today

- Design tools used as the informal source of truth
- Static token files duplicated across repositories
- Custom scripts to export or sync variables
- Manual coordination through pull requests and Slack

This works at small scale and breaks quietly as systems grow.

### Why Existing Approaches Fall Short

- Design and code drift accumulates over time
- Multi-theme setups multiply complexity
- Runtime updates are difficult or impossible
- Ownership of design decisions is unclear

### Common Alternatives and Tradeoffs

- **Shared token repos** Simple, but still manual and brittle.

- **Direct design tool exports** Design-led, but fragile and hard to integrate.

- **Full design system frameworks** Powerful, but heavyweight and difficult to adopt incrementally.

None treat design tokens as a **living, runtime-consumable system**.

## Requirements (Lean)

### Functional Requirements

The system must:

1. Provide a centralized, authoritative source for tokens and themes.
2. Allow multiple products to consume shared foundations with scoped overrides.
3. Support predictable propagation of changes.
4. Enable runtime consumption, not build-time only usage.
5. Allow incremental adoption.
6. Expose tokens in a framework-agnostic format.

### Non-Functional Requirements

The system must:

- Be deterministic and stable.
- Be safe by default, with intentional update paths.
- Be observable, allowing consumers to know which version they use.
- Scale linearly as products and themes increase.
- Remain tool-agnostic.

### Explicitly Out of Scope (This Phase)

- Enterprise governance workflows
- Automatic resolution of breaking design changes
- Component library generation
- Mandatory bidirectional design-tool syncing
- Optimization for non-technical users

## Success Metrics & Validation

### Early Success Signals

- At least one real product (SystemHaus itself) fully consumes tokens from the system.
- A second consumer integrates without custom glue code.
- Token changes propagate without manual duplication.
- Local token complexity is reduced in consuming apps.
- Time from design decision change to production update is meaningfully reduced.
- Adding new themes or products feels safe and predictable.

### Validation Plan

**Phase 1 — Internal dogfooding**

- Use SystemHaus to power its own UI and at least one other project.
- Track friction points explicitly.

**Phase 2 — External signal**

- Share with a trusted external engineer or open-source consumer.
- Observe integration friction, not praise.

### What Success Is Not

- Number of endpoints
- Feature completeness
- Code size
- “Feels powerful”
- Potential future scale

## Risks, Assumptions, & Open Questions

### Key Assumptions

- Teams are willing to centralize token ownership.
- Runtime token consumption is acceptable when safety is explicit.
- Incremental adoption is preferred over full rewrites.
- The primary user values control over automation.

### Product Risks

- Adoption friction if setup feels heavy
- Fear of centralized fragility
- Perception as unnecessary internal tooling
- Scope creep into governance or UI builders

### Technical Risks

- Runtime theming complexity
- Versioning and rollback semantics
- Framework abstraction leakage
- Performance overhead

### Open Questions

- What is the smallest viable token model?
- How explicit should breaking changes be?
- What level of version pinning is required for safety?
- How much UI is needed without a design tool?
- Where should responsibility clearly end between system and product code?

## Status

**PRD-lite (Lean, WIP)** This document defines intent, scope, and success criteria and will evolve
as learning occurs.
