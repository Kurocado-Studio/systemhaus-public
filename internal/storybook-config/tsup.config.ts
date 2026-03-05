import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    base: 'src/base.ts',
    manager: 'src/manager.ts',
    'vitest-setup': 'src/vitestSetup.ts',
    'react/index': 'src/react/index.ts',
    'react/main': 'src/react/main.ts',
    'react/preview': 'src/react/preview.ts',
    'vue/index': 'src/vue/index.ts',
    'vue/main': 'src/vue/main.ts',
    'vue/preview': 'src/vue/preview.ts',
  },
  external: [
    '@storybook/addon-a11y/preview',
    '@storybook/react-vite',
    '@storybook/vue3-vite',
    '@vitejs/plugin-vue-jsx',
    '@vue/compiler-sfc',
    'lightningcss',
    'storybook',
  ],
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'es2020',
});
