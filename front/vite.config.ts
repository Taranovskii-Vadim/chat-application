import path from 'path';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { ServerOptions, defineConfig } from 'vite';

const server: ServerOptions = {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
    },
  },
};

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // devOptions: { enabled: true },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'chat application',
        short_name: 'chat',
        description: 'chat application with nestJS and React',
        theme_color: '#ffffff',
        start_url: '/',
        icons: [
          {
            src: '/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: { src: path.resolve(__dirname, './src') },
  },
  server,
});
