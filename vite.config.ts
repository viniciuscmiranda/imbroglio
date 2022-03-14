import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    tsconfigPaths(),
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
