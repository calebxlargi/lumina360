import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { seoPages, siteOrigin, breadcrumbsFor } from '../src/seo.js';
const titles = new Set();
const routes = new Set();
const sitemap = await readFile('dist/sitemap.xml','utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
const files = new Map(seoPages.map(p=>[new URL(p.url).pathname,p.route === '404' ? 'dist/404.html' : p.route === 'home' ? 'dist/index.html' : `dist/${p.route}/index.html`]));
const htmlByPath = new Map();
for (const page of seoPages) {
  assert(!routes.has(page.route), `Duplicate route: ${page.route}`); routes.add(page.route);
  assert(!titles.has(page.fullTitle), `Duplicate title: ${page.fullTitle}`); titles.add(page.fullTitle);
  assert(page.description.length > 20 && page.description.length <= 165, `Description length: ${page.route}`);
  const html = await readFile(files.get(new URL(page.url).pathname),'utf8');
  htmlByPath.set(new URL(page.url).pathname,html);
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`H1 count: ${page.route}`);
  assert.equal((html.match(/rel="canonical"/g)||[]).length,1,`Canonical count: ${page.route}`);
  assert(html.includes(`rel="canonical" href="${page.url}"`), `Canonical URL: ${page.route}`);
  assert(html.includes('lang="en-MY"'),`Language: ${page.route}`);
  assert.equal((html.match(/<title>/g)||[]).length,1,`Title count: ${page.route}`);
  assert.equal((html.match(/name="description"/g)||[]).length,1,`Description count: ${page.route}`);
  assert(html.includes(`content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}"`),`Robots: ${page.route}`);
  assert.equal(sitemapUrls.includes(page.url),!page.noindex,`Sitemap indexing: ${page.route}`);
  const scripts=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/g)];
  assert.equal(scripts.length,1,`Structured data count: ${page.route}`);
  const data=JSON.parse(scripts[0][1]);
  assert.equal(data['@context'],'https://schema.org');
  const webPage=data['@graph'].find(n=>n['@type']==='WebPage');assert.equal(webPage.url,page.url);
  assert(!JSON.stringify(data).includes('AggregateRating'),'Do not invent ratings');
  const crumbs=breadcrumbsFor(page);
  if(crumbs.length){const schema=data['@graph'].find(n=>n['@type']==='BreadcrumbList');assert.equal(schema.itemListElement.length,crumbs.length);}
  assert(!html.includes('/src/images/'),`Unbuilt asset URL: ${page.route}`);
}
for (const [path,html] of htmlByPath) {
  for(const match of html.matchAll(/(?:href|src)="([^"\s]+)"/g)) {
    const href=match[1].replaceAll('&amp;','&');
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const url=new URL(href,`${siteOrigin}${path}`);
    if (url.pathname === '/404/') continue;
    if (files.has(url.pathname)) {
      if(url.hash.length>1 && !url.hash.startsWith('#/')) {
        const target=decodeURIComponent(url.hash.slice(1));
        assert(htmlByPath.get(url.pathname).includes(`id="${target}"`),`Broken anchor ${href} on ${path}`);
      }
    } else {
      await access(`dist${url.pathname}`).catch(()=>{throw new Error(`Missing link or asset ${href} on ${path}`);});
    }
  }
}
const robots=await readFile('dist/robots.txt','utf8');assert(robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`));
assert(robots.includes('Allow: /'));assert.equal(new Set(sitemapUrls).size,sitemapUrls.length);
const home=htmlByPath.get('/');for(const phrase of ['corporate training','Kuala Lumpur','Klang Valley','human resources']) assert(home.includes(phrase));
const course=htmlByPath.get('/programme/change-management-the-key-for-staying-ahead/');assert(!course.includes('At a glance'),'Do not restore removed course expansion');
const contact=htmlByPath.get('/contact/');assert(contact.includes('action="https://formspree.io/f/mqpenjwa"'),'Preserve Formspree');
assert.equal((home.match(/action="https:\/\/app.kit.com/g)||[]).length,1,'One newsletter signup');
console.log(`SEO checks passed: ${seoPages.length} HTML pages, ${sitemapUrls.length} indexable URLs, unique titles, descriptions, canonical URLs, H1s, structured data, internal links, assets and anchors.`);
const {trainingArticles}=await import('../src/trainingArticles.js');
const {programmes}=await import('../src/siteData.js');
const {resourceCollection,resourcePageCount,resourcePagePath}=await import('../src/resourceCollection.js');
assert.equal(trainingArticles.length,36);assert.equal(resourceCollection.length,40);assert.equal(resourcePageCount,10);
for(let n=1;n<=resourcePageCount;n++) {
 const html=htmlByPath.get(resourcePagePath(n));
 assert.equal((html.match(/class="resource-card"/g)||[]).length,4,`Four previews on page ${n}`);
 assert(html.includes(`aria-label="Page ${n}" aria-current="page"`) || html.includes(`aria-current="page" aria-label="Page ${n}"`),`Current page ${n}`);
}
const courseNames=programmes.flatMap(p=>p.items);
for(const article of trainingArticles) {
 const words=[article.summary,...article.sections.flat(),article.example.body,...article.checklist].join(' ').split(/\s+/).length;
 assert(words>=300,`Substantive article ${article.slug}`);
 assert(article.relatedCourses.every(c=>courseNames.includes(c)),`Valid related courses ${article.slug}`);
 assert(htmlByPath.get(`/resources/${article.slug}/`).includes('article-lead-image'),`Article image ${article.slug}`);
}
assert(courseNames.every(c=>trainingArticles.some(a=>a.relatedCourses.includes(c))),'Cover every course');
console.log('Article collection passed: 36 articles, all 33 courses covered, images on every article, 4 previews per page across 10 pages.');
const {articleImages}=await import('../src/articleImages.js');
const {createHash}=await import('node:crypto');
const photoHashes=[];
for (const resource of resourceCollection) {
 const photo=articleImages[resource.slug];
 assert(photo?.alt && photo.photographer && photo.source,`Credited photo ${resource.slug}`);
 photoHashes.push(createHash('sha256').update(await readFile(`public${photo.src}`)).digest('hex'));
 await access(`public${photo.small}`);
}
assert.equal(new Set(photoHashes).size,40,'Each of the 40 articles must have a different photograph');
for(const [path,html] of htmlByPath) assert(!html.includes('—'),'No em dashes in website text: '+path);
console.log('Photography and copy checks passed: 40 distinct images with credits and responsive files; no em dashes in rendered website text.');

for(const [path,html] of htmlByPath) assert(!html.includes("blob.vercel-storage.com"),"No Vercel Blob dependency: "+path);
console.log("Image hosting checks passed: all generated pages are independent of Vercel Blob.");
const {learningBites}=await import('../src/learningBites.js');
assert.equal(new Set(learningBites.map(b=>b.pdf)).size,learningBites.length);
for(const bite of learningBites) {
 assert(/^https:\/\/drive\.google\.com\/file\/d\/[^/]+\/view\?usp=sharing$/.test(bite.pdf),'Original PDF must link to Google Drive: '+bite.slug);
 const html=htmlByPath.get(`/resources/${bite.slug}/`);
 assert(html.includes(bite.pdf.replaceAll('&','&amp;')),'Google Drive PDF link rendered: '+bite.slug);
}
console.log(`Learning Bites PDF checks passed: ${learningBites.length} unique Google Drive links.`);
