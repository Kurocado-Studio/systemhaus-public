import { defineConfig } from 'tsup';
import Vue from 'unplugin-vue/esbuild';

import { createVueLibraryConfig } from '../../configs/tsup/vue-library';

export default defineConfig({
  ...createVueLibraryConfig({
    entry: ['./src/exports.ts'],
    dts: false,
    copyGlobs: ['src/main.css'],
    esbuildPlugins: [Vue()],
  }),
  platform: 'browser',
  tsconfig: 'tsconfig.json',
});
