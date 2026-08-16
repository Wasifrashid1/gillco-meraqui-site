import { writeFileSync } from 'node:fs';
import { allPages } from '../client/src/lib/siteData.ts';

const home = { slug: '/', title: 'Gillco Meraqui | RERA Luxury Flats Mohali', description: 'Gillco Meraqui offers RERA-approved 3+1 and 4 BHK dual-core luxury flats on Airport Road, Sector 126, Mohali. Enquire for a site visit.', primary: 'Gillco Meraqui luxury flats', h1: 'Gillco Meraqui — Live The Legacy of Luxury', h2: 'About Gillco Meraqui; Why Sector 126, Airport Road, Mohali; Signature Amenities; Configurations and Sizes; RERA Approval; Frequently Asked Questions', h3: 'Dual-Core Design Philosophy; Infinity Pool; Clubhouse; Sports and Recreation', keywords: 'Gillco Meraqui, luxury flats Mohali, Sector 126 flats, Airport Road residences, RERA flats Mohali' };
const rows = [home, ...allPages.map((p, i) => {
  const primary = p.journalArticle?.primaryKeyword || p.title.replace(/[—“”'’]/g, '').split(/[:|]/)[0].trim().toLowerCase();
  const keywords = p.keywords?.join(', ') || `${primary}, Gillco Meraqui, Sector 126 Mohali, Airport Road flats, luxury residences, RERA approved homes, ${p.eyebrow.toLowerCase().replace(/\//g,'')}`;
  const h2 = p.journalArticle ? p.journalArticle.outline.filter(item=>item.level===2).map(item=>item.heading).join('; ') : p.sections.join('; ');
  const h3 = p.journalArticle ? p.journalArticle.outline.filter(item=>item.level===3).map(item=>item.heading).join('; ') : 'Overview details; Key considerations; Next steps';
  return { slug: `/${p.slug}`, title: p.metaTitle || (p.title.length > 60 ? `${p.title.slice(0,56)} | Meraqui` : p.title), description: p.metaDescription || `${p.intro} Explore Gillco Meraqui in Sector 126, Mohali and enquire for current details.`, primary, h1: p.title, h2, h3, keywords };
})];
const header = '# Gillco Meraqui — SEO Audit Table\n\nGenerated from the supplied project and journal briefs. Article metadata is retained from the approved 20-article content plan; factual figures remain subject to current official verification.\n\n| # | URL slug | Title | Meta description | Meta keywords | Primary keyword | H1 | H2 list | H3 list |\n|---:|---|---|---|---|---|---|---|---|\n';
const esc = s => String(s).replaceAll('|','\\|').replaceAll('\n',' ');
const body = rows.map((r,i)=>`| ${i+1} | ${esc(r.slug)} | ${esc(r.title)} | ${esc(r.description)} | ${esc(r.keywords)} | ${esc(r.primary)} | ${esc(r.h1)} | ${esc(r.h2)} | ${esc(r.h3)} |`).join('\n');
writeFileSync('/home/ubuntu/gillco-meraqui-site/seo-audit.md', `${header}${body}\n\n## Coverage\n\nThe audit contains ${rows.length} rows: one homepage row and ${allPages.length} internal page rows. The site is designed to keep H1 content unique per route and to expose structured H2/H3 content within each page template.`);
console.log(`Generated SEO audit for ${rows.length} pages.`);
