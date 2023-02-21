import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// TODO check what vite can offer
// TODO we can install vite-tsconfig-paths for use ts.config aliases.
// Instead of it we need change alias in vite config and in ts config

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { src: path.resolve(__dirname, './src') },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
});
