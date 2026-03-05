import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import path from 'path';

import { createReactConfig } from '../../../internal/storybook-config/dist/react/main';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = createReactConfig({
  viteFinal: async (viteConfig) => {
    viteConfig.plugins ||= [];
    viteConfig.plugins.push(tailwindcss());

    viteConfig.resolve ||= {};
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias || {}),
      '@': path.resolve(dirname, '../src'),
    };

    return viteConfig;
  },
});

export default config;
