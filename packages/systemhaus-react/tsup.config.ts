import { defineConfig } from 'tsup';

import { createReactLibraryConfig } from '../../configs/tsup/react-library';

export default defineConfig({
  ...createReactLibraryConfig({
    entry: ['./src/exports.ts'],
    external: [
      'react',
      'react-dom',
      'axios',
      '@kurocado-studio/formkit-ui-models',
    ],
    define: {
      'import.meta.env.VITE_NODE_ENV': JSON.stringify(
        process?.env['VITE_NODE_ENV'] || 'unknown',
      ),
    },
    copyGlobs: ['src/main.css', 'src/fonts/*.woff2'],
  }),
  platform: 'browser',
  tsconfig: 'tsconfig.json',
  loader: { '.css': 'css' },
});
