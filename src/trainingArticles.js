import { planningArticles } from './articles/planning.js';
import { leadershipArticles } from './articles/leadership.js';
import { customerArticles } from './articles/customer.js';
import { automotiveArticles } from './articles/automotive.js';
import { digitalArticles } from './articles/digital.js';
import { safetyArticles } from './articles/safety.js';
export const trainingArticles = [...planningArticles,...leadershipArticles,...customerArticles,...automotiveArticles,...digitalArticles,...safetyArticles];
