// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: process.env.SITE_URL || 'https://kookrecipes.com',
    integrations: [react(), keystatic(), sitemap()],
    adapter: vercel(),
    output: 'static',
    // Keystatic's admin UI needs to run its own scripts, so the strict
    // default CSP would block it. The public site has no user-generated HTML.
    security: {
        csp: false,
    },
    markdown: {
        shikiConfig: {
            theme: 'github-light',
        },
    },
});
