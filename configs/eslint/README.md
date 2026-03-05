Eslint shared configs

Usage

- React packages/apps: import { createReactEslintConfig } from "../configs/eslint/react.js"
- Vue packages/apps: import { createVueEslintConfig } from "../configs/eslint/vue.js"
- Node apps/domains: import { createNodeEslintConfig } from "../configs/eslint/node.js"
- Internal styleguide package: import { createNodeEslintConfig } from
  "../configs/eslint/node-styleguide.js"

Notes

- Each package/app can append its own overrides after the shared base.
