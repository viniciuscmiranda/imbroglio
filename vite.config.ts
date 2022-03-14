import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    reactRefresh(),
    tsconfigPaths(),
    createHtmlPlugin({
      inject: {
        data: {
          APP_URL: 'https://imbrogliogame.com.br',
        },
      },
    }),
    VitePWA({
      includeAssets: ['favicon.ico', 'robots.txt', 'banner.png', 'apple-touch-icon.png'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'imbróglio',
        short_name: 'imbróglio',
        description: 'Forme palavras e faça o máximo de pontos que puder!',
        theme_color: '#3B88C3',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
