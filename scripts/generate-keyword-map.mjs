import { writeFileSync } from 'node:fs';
import { pages } from '../client/src/lib/siteData.ts';

const intentFor = (page) => page.kind === 'blog' ? 'Informational' : ['form','plan','plans'].includes(page.kind) ? 'Transactional' : 'Informational / Navigational';
const clean = (s) => s.toLowerCase().replace(/[—“”'’]/g, '').replace(/[^a-z0-9+ ]+/g, ' ').replace(/\s+/g, ' ').trim();
const homepage = {
  slug: '/', title: 'Gillco Meraqui | RERA Luxury Flats Mohali', primary: 'Gillco Meraqui luxury flats', secondary: 'luxury flats Mohali; Airport Road Mohali flats; RERA approved flats Sector 126', intent: 'Transactional'
};
const current = [homepage, ...pages.map((page) => ({
  slug: `/${page.slug}`,
  title: page.title,
  primary: `${clean(page.title)} Mohali`,
  secondary: `Gillco Meraqui; Sector 126 Mohali; ${clean(page.eyebrow)}; Airport Road residences`,
  intent: intentFor(page)
}))];
const proposed = [
  ['gillco-meraqui-plc','Gillco Meraqui PLC Guide','preferential location charges Gillco Meraqui','Gillco Meraqui PLC; floor preference charges Mohali; Sector 126 apartment costs','Informational / Transactional'],
  ['gillco-meraqui-possession-timeline','Gillco Meraqui Possession & Timeline','Gillco Meraqui possession date and timeline','Gillco Meraqui construction update; possession 2030 Mohali; project timeline','Informational'],
  ['emi-calculator-mohali','EMI Calculator for Mohali Luxury Flats','EMI for 4 BHK flat in Mohali Airport Road','home loan EMI calculator Mohali; luxury flat loan planning; 4 BHK EMI','Transactional'],
  ['nri-investment-mohali','NRI Investment Guide for Mohali Real Estate','NRI investment in Mohali real estate 2026','NRI property purchase Punjab; remote flat booking Mohali; Airport Road investment','Informational'],
  ['gillco-meraqui-reviews','Gillco Meraqui Reviews & Buyer Information','Gillco Meraqui buyer information','Gillco Meraqui reviews; project questions Mohali; verified buyer feedback','Informational'],
  ['gillco-meraqui-awards-media','Gillco Meraqui Awards & Media','Gillco Meraqui media coverage','Gillco Group news; Meraqui project updates; Mohali real estate media','Informational'],
  ['gillco-meraqui-gymnasium','Gymnasium at Gillco Meraqui','gymnasium in luxury flats Mohali','fitness amenities Sector 126; Gillco Meraqui gym; Airport Road residences','Informational'],
  ['gillco-meraqui-senior-citizen-zone','Senior Citizen Zone at Gillco Meraqui','senior citizen zone luxury apartments Mohali','family-friendly amenities Mohali; Gillco Meraqui senior zone; landscaped residences','Informational'],
  ['sector-126-mohali-area-guide','Sector 126 Mohali Area Guide','Sector 126 Mohali area guide','Sector 126 schools hospitals malls; Airport Road neighbourhood guide; Mohali living','Informational'],
  ['airport-road-connectivity-infrastructure','Airport Road Mohali Connectivity & Infrastructure','Airport Road Mohali connectivity infrastructure','PR7 corridor Mohali; Chandigarh Airport distance; Mohali road connectivity','Informational'],
  ['nearby-landmarks-gillco-meraqui','Nearby Landmarks to Gillco Meraqui','landmarks near Gillco Meraqui Mohali','schools near Sector 126; hospitals Airport Road Mohali; Mohali malls','Informational'],
  ['gillco-group-story','Gillco Group Story & Timeline','Gillco Group history Punjab','Gillco Group timeline; Mohali developer story; Punjab real estate legacy','Navigational'],
  ['gillco-group-ongoing-projects','Gillco Group Ongoing Projects','Gillco Group ongoing projects','Gillco Group Mohali projects; Punjab development pipeline; Gillco portfolio','Navigational'],
  ['gillco-group-leadership','Gillco Group Leadership Team','Gillco Group leadership','Gillco Group management team; Mohali developer leadership; Gillco founders','Navigational'],
  ['gillco-group-community','Gillco Group Community Initiatives','Gillco Group community initiatives','Gillco Group CSR; Punjab community initiatives; responsible developer Mohali','Informational'],
  ['privacy-policy','Gillco Meraqui Privacy Policy','Gillco Meraqui privacy policy','property website privacy; Gillco contact data; Mohali real estate privacy','Navigational'],
  ['terms-and-conditions','Gillco Meraqui Terms & Conditions','Gillco Meraqui terms and conditions','property website terms; Gillco Meraqui user terms; Mohali real estate terms','Navigational'],
  ['rera-disclaimer','Gillco Meraqui RERA Disclaimer','Gillco Meraqui RERA disclaimer','PBRERA SAS81 PR1390 062026; real estate disclaimer Punjab; buyer verification','Navigational'],
  ['sitemap','Gillco Meraqui HTML Sitemap','Gillco Meraqui sitemap','Gillco Meraqui pages; Mohali project site map; Airport Road website sitemap','Navigational'],
  ['blog/sector-126-mohali-real-estate-hub','Sector 126 Mohali Real Estate Hub','Sector 126 Mohali next real estate hub','Airport Road growth Mohali; Sector 126 property guide; Mohali investment context','Informational'],
  ['blog/3-plus-1-bhk-vs-4-bhk','3+1 BHK vs 4 BHK Mohali Guide','3+1 BHK vs 4 BHK Mohali which is better for family','3+1 BHK floor plan Mohali; 4 BHK family homes; Mohali apartment comparison','Informational'],
  ['blog/rera-in-punjab-homebuyer-guide','RERA in Punjab Homebuyer Guide','RERA in Punjab what homebuyers should check','PBRERA buyer guide; RERA approved projects Mohali; Punjab property due diligence','Informational'],
  ['blog/home-loan-payment-plan-guide','Home Loan & Payment Plan Guide Mohali','home loan and payment plan luxury flat Mohali','Mohali home loan planning; payment plan guide; luxury flat affordability','Informational'],
  ['blog/living-near-chandigarh-airport','Living Near Chandigarh Airport Guide','living near Chandigarh Airport luxury flats','flats near Chandigarh International Airport; Airport Road lifestyle; Mohali connectivity','Informational']
].map(([slug,title,primary,secondary,intent])=>({slug:`/${slug}`,title,primary,secondary,intent}));

const table = (name, rows) => [`## ${name}`, '', '| # | URL slug | Page title | Primary keyword | Secondary keywords | Search intent |', '|---:|---|---|---|---|---|', ...rows.map((row,index)=>`| ${index+1} | ${row.slug} | ${row.title} | ${row.primary} | ${row.secondary} | ${row.intent} |`), ''].join('\n');
writeFileSync('/home/ubuntu/gillco-meraqui-site/keyword-map-for-approval.md', `# Gillco Meraqui Keyword Map — Approval Draft\n\nThis is a **keyword planning draft** for approval before final long-form copy is written. Each primary target is deliberately unique. Proposed pages require confirmed source facts and approved images before implementation.\n\n${table('Current 50-page route set', current)}\n${table('Proposed expansion routes', proposed)}\n## Constraints requiring approval\n\nThe supplied image library contains a limited number of confirmed, real project photos. The proposed pages will reuse approved real assets only until additional page-specific images are supplied. Testimonials, awards, leadership, CSR, exact locations, construction specifications, project timelines, and commercial details require client-approved source material; no unverified reviews, awards, or factual claims will be invented.\n`);
console.log(`Wrote ${current.length} current and ${proposed.length} proposed keyword rows.`);
