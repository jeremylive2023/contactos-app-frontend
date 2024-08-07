import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import legacy from '@vitejs/plugin-legacy';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    createVuePlugin(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
