# Kurocado Studio SystemHaus

SystemHaus is a pnpm + Turborepo monorepo for building product UI, motion, and service layers under
a shared set of internal tooling and themes.

## What is in this repo

This repository is organized into a few top-level groups. Each group has its own `package.json` and
build/test configuration.

- apps/ - runnable apps and Storybook hosts for React/Vue packages
- packages/ - framework-specific UI and motion packages
- domains/ - domain-focused libraries and API layers
- shared/ - shared models and utilities used across domains and packages
- themes/ - Tailwind themes and design tokens
- internal/ - internal tooling/config packages used by the workspace
- configs/ - central configs (ESLint, TS, release, etc.) shared across the monorepo
- docs/ and Writerside/ - product and developer documentation
- scripts/ - workspace scripts for automation and maintenance

## Package manager and tooling

- pnpm workspaces are defined in `pnpm-workspace.yaml`
- Turborepo pipelines are defined in `turbo.json`
- Formatting and linting configs live in `prettier.config.mjs` and `configs/`

## Getting started

```sh
pnpm install
pnpm build
```

## Common scripts

```sh
pnpm lint
pnpm test
pnpm storybook
```

## Environment

This repo uses `.env` and `.env.*` files for local configuration. See each app or package for
required variables.

## Template notes

Before using this repo as a template:

- Update the project name and description in `README.md` and the root `package.json`.
- Remove or rename unused apps/packages.
- Confirm the Storybook hosts match your target frameworks.
- Review `configs/` to align lint, format, and release rules with your standards.
