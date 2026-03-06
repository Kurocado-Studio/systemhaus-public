import type { StorybookConfig } from '@storybook/vue3-vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import type { UserConfig } from 'vite';

import { baseAddons, baseStories } from '../base';

const withVueJsx: StorybookConfig['viteFinal'] = async (config: UserConfig) => {
  config.plugins ||= [];
  config.plugins.push(vueJsx());
  return config;
};

export const createVueConfig = (
  overrides: Partial<StorybookConfig> = {},
): StorybookConfig => ({
  stories: baseStories,
  addons: baseAddons,
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: 'vue-docgen-api',
    },
  },
  viteFinal: withVueJsx,
  ...overrides,
});

const config: StorybookConfig = createVueConfig();

export default config;
