import { defineConfig } from 'tsup';
import type { Options } from 'tsup';

import { createCopyfilesSuccess } from './copyfiles.js';

type ReactLibraryOptions = {
  entry?: string[];
  external?: string[];
  noExternal?: string[];
  inject?: string[];
  define?: Record<string, string>;
  copyGlobs?: string[];
  sourcemap?: boolean;
};

export const createReactLibraryConfig = ({
  entry = ['./src/exports.ts'],
  external = ['react', 'react-dom'],
  noExternal = [],
  inject,
  define,
  copyGlobs = [],
  sourcemap = true,
}: ReactLibraryOptions) => {
  const config = {
    clean: true,
    entry,
    format: ['esm'],
    dts: true,
    splitting: true,
    minify: true,
    target: 'esnext',
    external,
    noExternal,
    sourcemap,
    ...(inject ? { inject } : {}),
    ...(define ? { define } : {}),
    ...(copyGlobs.length
      ? { onSuccess: createCopyfilesSuccess(copyGlobs) }
      : {}),
  } satisfies Options;

  return defineConfig(config);
};
