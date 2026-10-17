import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { seoPages, siteOrigin, structuredDataFor } from '../src/seo.js';
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const template = await readFile('dist/index.html','utf8');
const assets = await readdir('dist/assets');
const server = await createServer({server:{middlewareMode:true,hmr:false,ws:false},appType:'custom'});
try {
  const {default:App} = await server.ssrLoadModule('/App.jsx');
  for (const page of seoPages) {
    let body = renderToString(React.createElement(App,{initialRoute:page.route}));
    for (const name of ['tp_hrdc','claimable_hrdc']) {
      const asset = assets.find(asset=>asset.startsWith(`${name}-`));
      if (!asset) throw new Error(`Missing production asset: ${name}`);
      body = body.replaceAll(`/src/images/${name}.png`,`/assets/${asset}`);
    }
    const metadata = `<meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" /><link rel="canonical" href="${page.url}" /><meta property="og:type" content="${(page.article || page.guide) ? 'article' : 'website'}" /><meta property="og:site_name" content="Lumina 3Sixty" /><meta property="og:locale" content="en_MY" /><meta property="og:title" content="${escape(page.fullTitle)}" /><meta property="og:description" content="${escape(page.description)}" /><meta property="og:url" content="${page.url}" /><meta property="og:image" content="${page.image ? `${siteOrigin}${page.image}` : page.article ? `${siteOrigin}${page.article.infographic}` : 'https://a6eosivygk6zayzg.public.blob.vercel-storage.com/lumina_logo_v3.2.png'}" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${escape(page.fullTitle)}" /><meta name="twitter:description" content="${escape(page.description)}" /><script id="site-structured-data" type="application/ld+json">${JSON.stringify(structuredDataFor(page)).replaceAll('<','\\u003c')}</script>`;
    const html = template.replace(/<title>.*?<\/title>/,`<title>${escape(page.fullTitle)}</title>`).replace(/<meta name="description"[^>]*>/,`<meta name="description" content="${escape(page.description)}" />`).replace('</head>',`${metadata}</head>`).replace('<div id="root"></div>',`<div id="root">${body}</div>`);
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
