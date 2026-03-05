import type { StorybookConfig } from '@storybook/react-vite';

import { baseAddons, baseStories } from '../base';

export const createReactConfig = (
  overrides: Partial<StorybookConfig> = {},
): StorybookConfig => ({
  stories: baseStories,
  addons: [...baseAddons, 'storybook-addon-react-docgen'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (property) =>
        property.parent ? !/node_modules/.test(property.parent.fileName) : true,
    },
  },
  ...overrides,
});

const config: StorybookConfig = createReactConfig();

export default config;
