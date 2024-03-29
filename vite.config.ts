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
          APP_URL: 'https://imbroglio.com.br',
        },
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['*'],
      manifest: {
        lang: 'pt-BR',
        name: 'imbróglio',
        short_name: 'imbróglio',
        description: 'Forme palavras e faça o máximo de pontos que puder!',
        theme_color: '#3177ad',
        background_color: '#F2CD5D',
        start_url: '.',
        scope: '.',
        display: 'standalone',
        orientation: 'portrait',
        categories: ['games'],
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
            src: 'maskable-icon.png',
            sizes: '1024x1024',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
