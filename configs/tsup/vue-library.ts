import { defineConfig } from 'tsup';
import type { Options } from 'tsup';

import { createCopyfilesSuccess } from './copyfiles.js';

type VueLibraryOptions = {
  entry?: string[];
  noExternal?: string[];
  external?: string[];
  dts?: boolean;
  sourcemap?: boolean;
  minify?: boolean;
  target?: string;
  clean?: boolean;
  esbuildPlugins?: unknown[];
  copyGlobs?: string[];
};

export const createVueLibraryConfig = ({
  entry = ['./src/exports.ts'],
  noExternal = [],
  external = [
    'axios',
    'vue',
    '@vue/runtime-dom',
    '@vue/runtime-core',
    '@vue/shared',
    '@vue/compiler-dom',
    '@vue/compiler-core',
  ],
  dts = false,
  sourcemap = true,
  minify = true,
  target = 'esnext',
  clean = true,
  esbuildPlugins = [],
  copyGlobs = [],
}: VueLibraryOptions) => {
  const config = {
    entry,
    format: ['esm'],
    dts,
    splitting: true,
    sourcemap,
    minify,
    target,
    noExternal,
    external,
    clean,
    esbuildPlugins,
    ...(copyGlobs.length
      ? { onSuccess: createCopyfilesSuccess(copyGlobs) }
      : {}),
  } satisfies Options;

  return defineConfig(config);
};
