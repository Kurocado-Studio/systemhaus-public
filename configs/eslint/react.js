import { defineReactEslintConfig } from '@kurocado-studio/styleguide';

export const createReactEslintConfig = () => [
  ...defineReactEslintConfig(),
  {
    files: ['**/*.tsx', '**/*.ts'],
    rules: {
      'unicorn/no-null': 'off',
    },
  },
];
