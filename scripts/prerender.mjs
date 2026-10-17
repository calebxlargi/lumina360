import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { seoPages, siteOrigin, structuredDataFor } from '../src/seo.js';
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const template = await readFile('dist/index.html','utf8');
const server = await createServer({server:{middlewareMode:true,hmr:false,ws:false},appType:'custom'});
try {
  const {default:App} = await server.ssrLoadModule('/App.jsx');
  for (const page of seoPages) {
    let body = renderToString(React.createElement(App,{initialRoute:page.route}));
    const metadata = `<meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" /><link rel="canonical" href="${page.url}" /><meta property="og:type" content="${(page.article || page.guide) ? 'article' : 'website'}" /><meta property="og:site_name" content="Lumina 3Sixty" /><meta property="og:locale" content="en_MY" /><meta property="og:title" content="${escape(page.fullTitle)}" /><meta property="og:description" content="${escape(page.description)}" /><meta property="og:url" content="${page.url}" /><meta property="og:image" content="${page.image ? `${siteOrigin}${page.image}` : page.article ? `${siteOrigin}${page.article.infographic}` : `${siteOrigin}/images/lumina-brand.webp`}" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${escape(page.fullTitle)}" /><meta name="twitter:description" content="${escape(page.description)}" /><script id="site-structured-data" type="application/ld+json">${JSON.stringify(structuredDataFor(page)).replaceAll('<','\\u003c')}</script>`;
    // Inline homepage styles to remove its render-blocking CSS round trip.
    // Other pages retain the shared cached stylesheet.
    let pageTemplate = template;
    if (page.route === 'home') {
      for (const match of template.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)) {
        const href = match[0].match(/href="([^"]+)"/)?.[1];
        if (href?.startsWith('/assets/')) {
          const css = await readFile(`dist${href}`, 'utf8');
          pageTemplate = pageTemplate.replace(match[0], `<style>${css.replaceAll('</style', '<\\/style')}</style>`);
        }
      }
    }
    const html = pageTemplate.replace(/<title>.*?<\/title>/,`<title>${escape(page.fullTitle)}</title>`).replace(/<meta name="description"[^>]*>/,`<meta name="description" content="${escape(page.description)}" />`).replace('</head>',`${page.route === 'home' ? '<link rel="preload" as="image" href="/images/orbital-horizon.webp" imagesrcset="/images/orbital-horizon-800.webp 800w, /images/orbital-horizon.webp 1599w" imagesizes="100vw" fetchpriority="high" />' : ''}${metadata}</head>`).replace('<div id="root"></div>',`<div id="root">${body}</div>`);
    if (page.route === '404') await writeFile('dist/404.html',html);
    else {
      const folder = page.route === 'home' ? 'dist' : `dist/${page.route}`;
      await mkdir(folder,{recursive:true});
      await writeFile(`${folder}/index.html`,html);
    }
  }
  await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${seoPages.filter(p=>!p.noindex).map(p=>`<url><loc>${p.url}</loc></url>`).join('')}</urlset>`);
  console.log(`Prerendered ${seoPages.length} pages with metadata, structured data and sitemap.`);
} finally { await server.close(); }
