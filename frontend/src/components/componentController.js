import { faqHtml } from './faq/faq.template.js';
import { globalSearchHtml } from './global_search/global_search.template.js';
import { homeHtml } from './home/home.template.js';
import { redirectHtml } from './redirect/redirect.template.js';
import { specifyCategoryTransitHtml } from './specify_category/transit/transit.template.js';
import { historyHtml } from './history/history.template.js';
import { specifyCategoryGovDocHtml } from './specify_category/doc/doc.template.js';
import { specifyCategoryHealthHtml } from './specify_category/health/health.template.js';
import { specifyCategoryBenefitsHtml } from './specify_category/benefits/benefits.template.js';
import { welcomeHtml } from './welcome/welcome.template.js';

export const mapsPages = {
  faq: {
    html: faqHtml,
    js: "./faq/faq.js"
  },
  global_search: {
    html: globalSearchHtml,
    js: "./global_search/global_search.js"
  },
  home: {
    html: homeHtml,
    js: "./home/home.js"
  },
  redirect: {
    html: redirectHtml,
    js: "./redirect/redirect.js"
  },
  transit: {
    html: specifyCategoryTransitHtml,
    js: "./specify_category/transit/transit.js"
  },
  history: {
    html: historyHtml,
    js: "./history/history.js"
  },
  doc: {
    html: specifyCategoryGovDocHtml,
    js: "./specify_category/doc/doc.js"
  },
  health: {
    html: specifyCategoryHealthHtml,
    js: "./specify_category/health/health.js"
  },
  benefits: {
    html: specifyCategoryBenefitsHtml,
    js: "./specify_category/benefits/benefits.js"
  },
  welcome: {
    html: welcomeHtml,
    js: "./welcome/welcome.js"
  }
};
