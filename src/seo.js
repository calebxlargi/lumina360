import { resourcePageCount } from './resourceCollection.js';
import { articleImages } from './articleImages.js';
import { programmes, trainers } from './siteData.js';
import { programmeIntros } from './programmeIntros.js';
import { resources } from './resources.js';
import { learningBites } from './learningBites.js';
import { caseStudies } from './caseStudies.js';

export const siteOrigin = 'https://www.lumina3sixty.com';
export const programmeSlug = title => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const pageUrl = route => `${siteOrigin}/${route === 'home' ? '' : `${route}/`}`;
const description = text => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= 165) return clean;
  return `${clean.slice(0, 162).replace(/\s+\S*$/, '')}…`;
};
const categoryCopy = {
  leadership: 'Leadership, communication, emotional intelligence and team development training for organisations in Kuala Lumpur, the Klang Valley and Malaysia.',
  customer: 'Customer experience, active listening, conflict resolution and problem-solving training for corporate teams in Kuala Lumpur and Malaysia.',
  automotive: 'Automotive training in Malaysia for dealer principals, sales consultants and aftersales managers, grounded in dealership leadership and operations.',
  digital: 'AI, digital productivity, data literacy and marketing training for corporate teams in Kuala Lumpur, the Klang Valley and Malaysia.',
  safety: 'Workplace safety training in Malaysia covering hazard awareness, safety leadership, ergonomics and workplace wellbeing.'
};
const basePages = [
  ['home', 'Corporate Training Kuala Lumpur & Klang Valley', 'Corporate training in Kuala Lumpur, the Klang Valley and Malaysia. Explore leadership, communication, automotive and digital programmes with Lumina 3Sixty.'],
  ['corporate-training-malaysia', 'Corporate Training Malaysia', 'Corporate training for Malaysian organisations. Develop leadership, communication, customer experience and digital skills with Lumina 3Sixty.'],
  ['hrd-corp-training-malaysia', 'HRD Corp Training Malaysia & Kuala Lumpur', 'Plan HRD Corp claimable training in Kuala Lumpur and Malaysia with Lumina 3Sixty. Explore courses, preparation steps and eligibility considerations.'],
  ['programmes', 'Corporate Training Courses in Malaysia', 'Browse corporate training courses for teams in Kuala Lumpur, the Klang Valley and Malaysia: leadership, communication, automotive, digital skills and safety.'],
  ['about', 'Corporate Trainers & Consultants in Malaysia', 'Meet Lumina 3Sixty’s corporate trainers and consultants, bringing experience in leadership, automotive, communication and digital skills to Malaysian teams.'],
  ['approach', 'Customised Corporate Training & Workbooks', 'Discover our approach to corporate training: consultation, tailored exercises, full-colour participant workbooks and practical workplace application.'],
  ['contact', 'Contact Our Corporate Training Team in Kuala Lumpur', 'Discuss corporate training in Kuala Lumpur, the Klang Valley or elsewhere in Malaysia. Request a course outline or contact Lumina 3Sixty on WhatsApp.'],
  ['resources', 'Corporate Training Resources & Learning Bites', 'Explore corporate training planning guides, programme stories and the Learning Bites archive from Lumina 3Sixty in Malaysia.'],
  ['resources/plan-your-training', 'Training Resources, HRD Corp & Planning Guides', 'Explore corporate training in Malaysia, HRD Corp guidance and planning articles for human resources and learning and development teams.'],
  ['resources/learning-bites', 'Learning Bites Newsletter Archive', 'Browse past editions of Learning Bites: visual frameworks, workplace learning articles and original PDF downloads from Lumina 3Sixty.'],
  ['privacy', 'Privacy Policy', 'Read how Lumina 3Sixty handles website enquiries and personal information, and how to contact us about privacy.'],
  ['preview', 'Website Preview', 'Review website additions.'],
  ['case-studies', 'Corporate Training Case Studies in Malaysia', 'Explore programme approaches across automotive, healthcare, higher education and manufacturing.'],
  ['404', 'Page Not Found', 'This page could not be found. Explore Lumina 3Sixty corporate training courses or contact our team.']
];
export const seoPages = [
  ...basePages.map(([route,title,text]) => ({route,title,description:description(text)})),
  ...programmes.map(p => ({route:`programmes/${p.id}`,title:`${p.title} Training in Malaysia`,description:categoryCopy[p.id]})),
  ...programmes.flatMap(p => p.items.filter(title => programmeIntros[title]).map(title => ({route:`programme/${programmeSlug(title)}`,title,description:description(programmeIntros[title]),course:{title,category:p}}))),
  ...Array.from({length:resourcePageCount-1},(_,i)=>({route:`resources/plan-your-training/page/${i+2}`,title:`Training Resources – Page ${i+2}`,description:`Browse page ${i+2} of our practical training resources, with guidance for Malaysian HR teams and managers developing workplace skills.`})),
  ...resources.map(r => ({guide:r,route:`resources/${r.slug}`,title:r.title,description:description(r.summary)})),
  ...learningBites.map(b => ({route:`resources/${b.slug}`,title:b.title,description:description(b.summary),article:b})),
  ...caseStudies.map(c => ({route:`case-studies/${c.slug}`,title:c.title,description:description(c.challenge)}))
].map(p => ({...p, image:articleImages[p.route.split('/').pop()]?.src, noindex:p.route === 'preview' || p.route === '404' || p.route.startsWith('case-studies'), url:pageUrl(p.route), fullTitle:`${p.title} | Lumina 3Sixty`}));
export function getPageSeo(route) {
  const key = route.split('?')[0].replace(/^\/+|\/+$/g, '') || 'home';
  return seoPages.find(p => p.route === key) || seoPages.find(p => p.route === '404');
}
export function breadcrumbsFor(page) {
  if (page.route === 'home' || page.route === '404') return [];
  const crumbs = [{ name:'Home', url:pageUrl('home') }];
  if (page.course) {
    crumbs.push({name:'Courses',url:pageUrl('programmes')},{name:page.course.category.title,url:pageUrl(`programmes/${page.course.category.id}`)});
  } else if (['corporate-training-malaysia','hrd-corp-training-malaysia'].includes(page.route)) {
    crumbs.push({name:'Resources',url:pageUrl('resources')},{name:'Training resources',url:pageUrl('resources/plan-your-training')});
  } else if (page.route.includes('/')) {
    const parent = page.route.split('/')[0];
    crumbs.push({name:parent === 'resources' ? 'Resources' : parent === 'programmes' ? 'Courses' : 'Case studies',url:pageUrl(parent)});
    if (page.article) crumbs.push({name:'Learning Bites archive',url:pageUrl('resources/learning-bites')});
    else if (resources.some(r=>page.route === `resources/${r.slug}`)) crumbs.push({name:'Training resources',url:pageUrl('resources/plan-your-training')});
  }
  crumbs.push({name:page.title,url:page.url});
  return crumbs;
}
export const organisation = {
  '@type':'EducationalOrganization', '@id':`${siteOrigin}/#organization`, name:'Lumina 3Sixty', legalName:'Lumina 3Sixty PLT', url:`${siteOrigin}/`,
  logo:'https://a6eosivygk6zayzg.public.blob.vercel-storage.com/lumina_logo_v3.2.png',
  description:'Corporate training and consultancy based in Kuala Lumpur, Malaysia, across leadership, communication, customer experience, automotive, digital skills and workplace safety.',
  email:'sales@lumina3sixty.com', telephone:'+60 18-346 6889',
  address:{'@type':'PostalAddress',streetAddress:'Windsor Tower, 2, Jalan Sri Hartamas 17, Taman Sri Hartamas',postalCode:'50480',addressLocality:'Kuala Lumpur',addressCountry:'MY'},
  areaServed:[{'@type':'Country',name:'Malaysia'},{'@type':'City',name:'Kuala Lumpur'},{'@type':'Place',name:'Klang Valley'}],
  sameAs:['https://www.linkedin.com/company/lumina3sixty/','https://www.instagram.com/lumina3sixty','https://www.tiktok.com/@lumina3sixty']
};
export function structuredDataFor(page) {
  const publisher = {'@id':organisation['@id']};
  const graph = [organisation,{'@type':'WebSite','@id':`${siteOrigin}/#website`,url:`${siteOrigin}/`,name:'Lumina 3Sixty',publisher,inLanguage:'en-MY'}, {'@type':'WebPage','@id':page.url,url:page.url,name:page.fullTitle,description:page.description,isPartOf:{'@id':`${siteOrigin}/#website`},publisher,inLanguage:'en-MY'}];
  const crumbs = breadcrumbsFor(page);
  if (crumbs.length) graph.push({'@type':'BreadcrumbList',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,name:c.name,item:c.url}))});
  if (page.route === 'about') graph.push(...trainers.map(t=>({'@type':'Person',name:t.name,jobTitle:t.role,image:t.image,description:t.paragraphs[0],worksFor:publisher})));
  if (page.course) graph.push({'@type':'Course',name:page.course.title,description:page.description,url:page.url,provider:publisher});
  if (['corporate-training-malaysia','hrd-corp-training-malaysia'].includes(page.route)) graph.push({'@type':'Service',name:page.title,url:page.url,description:page.description,provider:publisher,areaServed:organisation.areaServed,serviceType:'Corporate training'});
  if (page.guide) graph.push({'@type':'Article',headline:page.title,description:page.description,mainEntityOfPage:{'@id':page.url},author:{'@type':'Organization',name:'Lumina 3Sixty',url:`${siteOrigin}/`},publisher,image:`${siteOrigin}${page.image}`});
  if (page.article) graph.push({'@type':'Article',headline:page.article.title,description:page.description,mainEntityOfPage:{'@id':page.url},author:{'@type':'Organization',name:'Lumina 3Sixty',url:`${siteOrigin}/`},publisher,image:`${siteOrigin}${page.article.infographic}`});
  return {'@context':'https://schema.org','@graph':graph};
}
