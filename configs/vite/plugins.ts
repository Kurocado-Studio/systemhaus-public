import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export const createReactPlugins = () => [react(), tailwindcss()];

export const createVuePlugins = () => [vue(), vueJsx(), tailwindcss()];
