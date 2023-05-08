import path from 'path';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { VitePWA } from 'vite-plugin-pwa';
import { ServerOptions, defineConfig } from 'vite';

const server: ServerOptions = {
  https: true,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
    },
  },
};

export default defineConfig({
  plugins: [
    react(),
    basicSsl(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      devOptions: { enabled: true },
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
