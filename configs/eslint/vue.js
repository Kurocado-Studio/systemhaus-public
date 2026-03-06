import { defineReactEslintConfig } from '@kurocado-studio/styleguide';
import tsParser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export const createVueEslintConfig = () => [
  ...defineReactEslintConfig(),
  {
    ignores: ['**/storybook-static/**'],
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      vue: vuePlugin,
    },
    rules: {},
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.d.ts'],
    rules: {
      'import/named': 'off',
    },
  },
  {
    files: ['tsup.config.ts', 'vite.config.ts'],
    rules: {
      'import/default': 'off',
      'import/namespace': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
    },
  },
  {
    files: ['tailwind.config.ts'],
    rules: {
      'import/no-unresolved': 'off',
    },
  },
  {
    settings: {
      'import/ignore': [
        '^@vitejs/plugin-vue$',
        '^unplugin-vue(/|$)',
        '^vue$',
        '^@vue/',
      ],
    },
  },
];
