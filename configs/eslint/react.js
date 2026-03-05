import { defineReactEslintConfig } from '@internal/config';

export const createReactEslintConfig = () => [
  ...defineReactEslintConfig(),
  {
    files: ['**/*.tsx', '**/*.ts'],
    rules: {
      'unicorn/no-null': 'off',
    },
  },
];
