import { readFileSync, writeFileSync } from 'node:fs';

const brief = readFileSync('/home/ubuntu/upload/pasted_content_6.txt', 'utf8');
const entries = brief.split(/\r?\n---\r?\n/).filter(block => /^## \d+\./m.test(block));
const covers = [
  ['/manus-storage/meraqui-editorial_6d04c439.jpg', 'Gillco Meraqui editorial project visual'],
  ['/manus-storage/meraqui-architecture_2a0a8e4c.jpg', 'Gillco Meraqui architectural exterior'],
  ['/manus-storage/meraqui-garden_2b491524.png', 'Gillco Meraqui landscaped garden walk'],
  ['/manus-storage/meraqui-yoga-lawn_2983fb32.png', 'Gillco Meraqui yoga lawn and outdoor wellbeing setting'],
  ['/manus-storage/meraqui-pool_e560bf19.png', 'Gillco Meraqui pool and private cabanas'],
];

const field = (block, label) => {
  const line = block.split(/\r?\n/).find(value => value.startsWith(`**${label}`));
  return (line?.match(/^\*\*.*:\*\*\s*(.+)$/)?.[1] || '').trim();
};
const article = (block, index) => {
  const title = block.match(/^## \d+\. (.+)$/m)?.[1].trim() || '';
  const metaTitle = field(block, 'Meta Title');
  const metaDescription = field(block, 'Meta Description');
  const slug = field(block, 'URL Slug').replace(/^\//, '');
  const primaryKeyword = field(block, 'Primary Keyword');
  const keywords = field(block, 'Meta Keywords').split(',').map(value => value.trim()).filter(Boolean);
  const h1 = field(block, 'H1');
  const outline = block.split(/\r?\n/).flatMap(line => { const value=line.trim().replace(/^-\s*/,'').replaceAll('**',''); const match=value.match(/^(H[234]):\s*(.+)$/); return match ? [{ level: Number(match[1].slice(1)), heading: match[2].replace(/\s*\*\(CTA\)\*\s*$/,'').trim() }] : []; });
  const h2s = outline.filter(item => item.level === 2).map(item => item.heading);
  const faqs = [
    { question: `What should I check about ${h2s[0] || primaryKeyword}?`, answer: `Use the latest official project information to review ${h2s[0]?.toLowerCase() || primaryKeyword}. Keep the source date and any open questions in writing before you make a decision.` },
    { question: `How should I evaluate ${h2s[1] || primaryKeyword}?`, answer: `Compare the relevant current documents, ask for clarification from the authorised project team, and assess the point against your household’s priorities, budget, and timing.` },
    { question: `What is the next step after researching ${primaryKeyword}?`, answer: `Arrange a private discussion or site visit, request the latest relevant documents, and seek independent professional advice where a commercial, legal, or financial decision is consequential.` },
  ];
  const [cover, alt] = covers[index % covers.length];
  return { slug, title, metaTitle, metaDescription, primaryKeyword, keywords, h1, outline, faqs, cta: outline.at(-1)?.heading || 'Arrange a private conversation', cover, alt, lastUpdated: /price|rera|possession/i.test(`${slug} ${h1}`) };
};

const articles = entries.map(article);
const output = `/* Generated from pasted_content_6.txt. All commercial, legal, and delivery claims remain subject to current official documentation. */\nexport type JournalOutlineItem={level:2|3|4;heading:string};\nexport type JournalFAQ={question:string;answer:string};\nexport type JournalArticle={slug:string;title:string;metaTitle:string;metaDescription:string;primaryKeyword:string;keywords:string[];h1:string;outline:JournalOutlineItem[];faqs:JournalFAQ[];cta:string;cover:string;alt:string;lastUpdated:boolean};\n\nexport const journalArticles:JournalArticle[]=${JSON.stringify(articles,null,2)} as JournalArticle[];\nexport const journalArticleBySlug=Object.fromEntries(journalArticles.map(article=>[article.slug,article])) as Record<string,JournalArticle>;\n`;
writeFileSync('/home/ubuntu/gillco-meraqui-site/client/src/lib/journalData.ts', output);
console.log(`Generated ${articles.length} journal articles.`);
