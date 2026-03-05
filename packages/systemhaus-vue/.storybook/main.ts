import type { StorybookConfig } from '@storybook/vue3-vite';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import path from 'path';

import { createVueConfig } from '../../../internal/storybook-config/dist/vue/main';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

const baseConfig = createVueConfig();

const config: StorybookConfig = {
  ...baseConfig,
  viteFinal: async (viteConfig, options) => {
    const configured =
      typeof baseConfig.viteFinal === 'function'
        ? await baseConfig.viteFinal(viteConfig, options)
        : viteConfig;

    configured.plugins ||= [];
    configured.plugins.push(tailwindcss());

    configured.resolve ||= {};
    configured.resolve.alias = {
      ...(configured.resolve.alias || {}),
      '@': path.resolve(dirname, '../src'),
    };

    return configured;
  },
};

export default config;
