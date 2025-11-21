// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://vadymstebakov.github.io',
    base: '/me',
    server: { port: 9777, host: true },
    vite: {
        build: {
            target: ['es2022', 'edge100', 'firefox100', 'chrome100', 'safari15.4', 'opera90'],
        },
    },
});
