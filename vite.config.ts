import { defineConfig } from "@solidjs/start/config";
import UnoCSS from 'unocss/vite'

export default defineConfig({
    plugins: [
        UnoCSS({
            mode: 'per-module'
        }),
    ]
});
