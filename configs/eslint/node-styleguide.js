import { defineBaseNodeEslintConfig } from '@kurocado-studio/styleguide';

export const createNodeEslintConfig = (cwd = process.cwd()) =>
  defineBaseNodeEslintConfig(cwd);
