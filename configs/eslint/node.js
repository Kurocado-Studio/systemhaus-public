import { defineBaseNodeEslintConfig } from '@internal/config';

export const createNodeEslintConfig = (cwd = process.cwd()) =>
  defineBaseNodeEslintConfig(cwd);
