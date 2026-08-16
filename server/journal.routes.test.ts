import { describe, expect, it } from 'vitest';
import { journalArticles } from '../client/src/lib/journalData';

describe('Gillco Meraqui journal route data', () => {
  it('contains the complete 20-article brief with unique journal routes', () => {
    expect(journalArticles).toHaveLength(20);
    expect(new Set(journalArticles.map(article => article.slug)).size).toBe(20);
    expect(journalArticles.every(article => article.slug.startsWith('journal/'))).toBe(true);
  });

  it('retains supplied metadata and an H2-led outline for every article', () => {
    expect(journalArticles.every(article => article.metaTitle.length > 0 && article.metaDescription.length > 0 && article.primaryKeyword.length > 0 && article.h1.length > 0 && article.faqs.length === 3)).toBe(true);
    expect(journalArticles.every(article => article.outline.some(item => item.level === 2))).toBe(true);
  });
});
