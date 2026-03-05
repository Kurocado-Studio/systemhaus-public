import { defineConfig } from 'tsup';
import type { Options } from 'tsup';

import { createCopyfilesSuccess } from './copyfiles.js';

type DomainConfigOptions = {
  entry: string[];
  copyGlobs?: string[];
  esbuildOptions?: Options['esbuildOptions'];
};

const domainBase = {
  format: ['esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  minify: true,
  target: 'esnext',
  clean: true,
} satisfies Omit<Options, 'entry'>;

export const createDomainConfig = ({
  entry,
  copyGlobs = [],
  esbuildOptions,
}: DomainConfigOptions) =>
  defineConfig({
    ...domainBase,
    entry,
    ...(esbuildOptions ? { esbuildOptions } : {}),
    ...(copyGlobs.length
      ? { onSuccess: createCopyfilesSuccess(copyGlobs) }
      : {}),
  });

export const createDomainPackageConfig = ({
  entry,
  copyGlobs = [],
  esbuildOptions,
}: DomainConfigOptions) =>
  defineConfig((options) => ({
    entry,
    ...domainBase,
    treeshake: true,
    ...options,
    ...(esbuildOptions ? { esbuildOptions } : {}),
    ...(copyGlobs.length
      ? { onSuccess: createCopyfilesSuccess(copyGlobs) }
      : {}),
  }));
