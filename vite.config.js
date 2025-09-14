import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import favicon from 'vite-plugin-favicon2';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    // Generate legacy favicons and apple-touch icons from public/logo.svg
    favicon({
      logo: 'public/logo.svg',
      inject: true,
      favicons: {
        appName: 'Tanner Galambas',
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          favicons: true,
          windows: false,
          yandex: false,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
