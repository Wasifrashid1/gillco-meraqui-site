import { writeFileSync } from 'node:fs';
import { allPages } from '../client/src/lib/siteData.ts';

const origin = 'https://www.gillcomeraqui-mohali.com';
const urls = ['/', ...allPages.map(page => `/${page.slug}`)];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url=>`  <url><loc>${origin}${url}</loc><changefreq>weekly</changefreq><priority>${url==='/'?'1.0':'0.7'}</priority></url>`).join('\n')}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\nDisallow: /thank-you\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`;
const llms = `# Gillco Meraqui\n\n> Gillco Meraqui is a RERA-approved luxury residential project offering 3+1 and 4 BHK dual-core flats on Airport Road, Sector 126, Mohali.\n\n## Key pages\n\n- [Overview](${origin}/gillco-meraqui-overview): Project scale, planning, and residence overview.\n- [Floor Plans](${origin}/gillco-meraqui-floor-plans): 3+1 and 4 BHK plan library.\n- [Price & Cost Sheet](${origin}/gillco-meraqui-price): Request current commercial information.\n- [Location](${origin}/gillco-meraqui-location): Airport Road and Sector 126 context.\n- [Contact](${origin}/contact-gillco-meraqui): Call, WhatsApp, and project-area map.\n- [FAQ](${origin}/gillco-meraqui-faq): Buyer questions and verification guidance.\n\n## Important information\n\n- RERA registration reference: PBRERA-SAS81-PR1390-062026.\n- Buyers should confirm current specifications, availability, address details, timelines, and commercial terms with official project documentation.\n`;
writeFileSync('/home/ubuntu/gillco-meraqui-site/client/public/sitemap.xml', xml);
writeFileSync('/home/ubuntu/gillco-meraqui-site/client/public/robots.txt', robots);
writeFileSync('/home/ubuntu/gillco-meraqui-site/client/public/llms.txt', llms);
console.log(`Wrote public SEO files for ${urls.length} URLs.`);
