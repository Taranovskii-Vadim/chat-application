import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// TODO check what vite can offer
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
