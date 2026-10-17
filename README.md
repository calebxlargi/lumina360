# lumina360
## Search-ready production build

Run `npm run build` and publish the complete `dist/` folder. The build generates 116 HTML pages, including every programme with an introduction, a custom 404 page and a sitemap with 104 indexable URLs. Serve directory URLs using their `index.html` files. Keep `robots.txt` public. The canonical production origin is `https://www.lumina3sixty.com` (matching the current public redirect).

Course, category and trainer information comes from `src/siteData.js` and `src/programmeIntros.js`; `scripts/prerender.mjs` adds per-page metadata and structured data. Existing `/#/...` bookmarks redirect to the corresponding directory URL. Courses without introductions continue to link to the enquiry form.

After publishing, submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Check the live crawler rules and hosting firewall separately: repository files cannot override a host-level bot block. Verify HRD Corp policy changes against official sources before updating funding guidance.

## Enquiry delivery

The contact form submits to Formspree (`https://formspree.io/f/mqpenjwa`). Its email workflow sends enquiry notifications to `caleb@lumina3sixty.com`; configure recipients in the Formspree dashboard, not in browser-submitted fields. The site preserves the inline sending/success/error states and uses Formspree's `_gotcha` honeypot. The Learning Bites newsletter continues to use its existing Kit subscription form.

## SEO maintenance

`src/seo.js` is the shared source for browser titles, generated metadata, canonical URLs, breadcrumbs and structured data. Run `npm run build` followed by `npm run check:seo` before publication. The check covers every generated page, internal destination, asset and anchor, plus indexing rules and the sitemap.

The homepage targets Kuala Lumpur and the Klang Valley. `/corporate-training-malaysia/` explains the broader training service, while `/hrd-corp-training-malaysia/` covers training selection and eligibility planning. Both pages are linked from the homepage and footer. Course introductions remain unchanged in scope.

The preview route and case study pages remain excluded from indexing; the case studies include editorially drafted approaches and should not be treated as independently verified outcome evidence. The custom 404 page is also excluded. Vercel configuration publishes `dist/` with consistent trailing-slash URLs and no blanket SPA rewrite, allowing missing URLs to return a proper 404 after deployment.

Publishing is still required for Google to see these changes. After deployment, inspect the homepage, both service pages, a category and a course in Google Search Console; submit the sitemap and check indexing, canonical selection and search queries. Confirm the live host serves the new HTML, crawler rules and 404 status. Do not infer rankings or indexing from a successful local build.
