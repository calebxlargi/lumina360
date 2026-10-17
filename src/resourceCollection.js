import { resources } from './resources.js';
// Fixed editorial sequence mixes topics while keeping pagination stable.
const articleOrder = [
  "emotional-intelligence-workplace-triggers-feedback",
  "automotive-excellence-training-dealership-performance",
  "ai-workplace-practical-starting-points",
  "customer-experience-training-relationships",
  "osh-training-malaysia-practical-hirarc",
  "training-needs-analysis-hr-managers",
  "persuasive-business-presentation-skills",
  "aftersales-workshop-parts-financial-performance",
  "strategic-partnerships-shared-value",
  "first-office-automation-no-code-ai",
  "helping-employees-through-workplace-change",
  "office-ergonomics-workstations-working-habits",
  "automotive-sales-training-consultative-selling",
  "active-listening-customer-service",
  "data-literacy-managers-dashboard-questions",
  "middle-managers-leading-performance",
  "choosing-leadership-training-kuala-lumpur",
  "premium-automotive-service-customer-retention",
  "workplace-mental-health-supportive-manager-conversations",
  "critical-thinking-root-causes-workplace",
  "better-prompts-corporate-workflows",
  "team-building-workplace-application",
  "dealer-principal-business-dashboard-ten-pillars",
  "retaining-high-value-customers",
  "business-documents-ai-assisted-answers",
  "clear-communication-difficult-workplace-conversations",
  "safety-leadership-supervisors-managers",
  "car-dealership-digital-content-sales-consultants",
  "resolving-recurring-workplace-conflict",
  "social-media-marketing-ai-repeatable-system",
  "executive-coaching-or-leadership-training",
  "communication-presentation-training-team-needs",
  "automotive-sales-manager-coaching-performance",
  "workplace-ai-sensitive-information",
  "leading-without-management-title",
  "crisis-readiness-team-decisions-communication"
];
const orderedResources = [
 ...resources.slice(0,2),
 ...articleOrder.map(slug=>resources.find(article=>article.slug===slug))
];
export const resourceCollection = [
 {slug:'corporate-training-malaysia',href:'/corporate-training-malaysia/',category:'Corporate training',title:'Corporate training in Malaysia',summary:'Explore training areas, delivery considerations and learning support for teams in Kuala Lumpur, the Klang Valley and Malaysia.'},
 {slug:'hrd-corp-training-malaysia',href:'/hrd-corp-training-malaysia/',category:'HRD Corp training',title:'HRD Corp training in Malaysia',summary:'Plan a relevant programme and understand the eligibility considerations to check before booking.'},
 ...orderedResources.map(r=>({...r,href:`/resources/${r.slug}/`}))
];
export const resourcePageSize=4;
export const resourcePageCount=Math.ceil(resourceCollection.length/resourcePageSize);
export const resourcePagePath=page=>page===1?'/resources/plan-your-training/':`/resources/plan-your-training/page/${page}/`;
