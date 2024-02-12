import { defineConfig } from '@solidjs/start/config';
import UnoCSS from 'unocss/vite';

export default defineConfig({
  start: {
    server: { preset: 'cloudflare-pages' },
    middleware: './src/middleware.ts',
  },
  plugins: [UnoCSS()],
});
