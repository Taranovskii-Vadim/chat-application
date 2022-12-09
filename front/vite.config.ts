import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// TODO check what vite can offer
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
});
