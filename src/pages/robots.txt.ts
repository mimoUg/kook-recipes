import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
    const sitemap = site ? new URL('sitemap-index.xml', site) : null;

    const lines = [
        'User-agent: *',
        'Allow: /',
        'Disallow: /keystatic',
        'Disallow: /api/keystatic',
    ];

    if (sitemap) lines.push('', `Sitemap: ${sitemap.toString()}`);

    return new Response(`${lines.join('\n')}\n`, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
};
