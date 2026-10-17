import { programmes } from '../siteData.js';
export const course = (area,index) => programmes.find(p=>p.id===area).items[index];
export function article(slug,title,category,summary,relatedCourses,sections,example,checklist,sources=[]) {
 return {slug,title,category,summary,relatedCourses,sections,example,checklist,sources,trainingArticle:true};
}
