import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://vadymstebakov.github.io',
    base: '/me',
    server: { port: 3000, host: true },
});
