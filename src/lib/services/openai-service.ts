import { StoryCard } from './types';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Suggests redirects from an old sitemap.xml to the new site IA using OpenAI.
 * Adds a `redirects` property to each StoryCard (recursively) with suggested old URLs.
 * @param oldSitemapXml The XML string of the old site's sitemap.xml
 * @param newIA The new site's information architecture (StoryCard[])
 * @returns The newIA array, with each StoryCard having a `redirects` property (string[])
 */
export async function suggestRedirectsFromSitemap(oldSitemapXml: string, newIA: StoryCard[]): Promise<StoryCard[]> {
  // Flatten the IA to a list of new URLs and keep a reference to each StoryCard
  const urlToCard: Record<string, StoryCard> = {};
  function flattenIA(cards: StoryCard[], parentPath = ""): string[] {
    return cards.flatMap(card => {
      const path = parentPath + '/' + (card.slug || card.name || '').replace(/^\/+|\/+$/g, '');
      urlToCard[path] = card;
      const children = card.children ? flattenIA(card.children, path) : [];
      return [path, ...children];
    });
  }
  const newUrls = flattenIA(newIA).filter(Boolean);

  const prompt = `You are a migration assistant. Given the old site's sitemap.xml and the new site's URL structure, suggest for each new URL a list of old URLs that should redirect to it. Output as a JSON object where each key is a new URL and the value is an array of old URLs that should redirect to it.\n\nOld sitemap.xml:\n${oldSitemapXml}\n\nNew site URLs:\n${newUrls.join('\n')}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a helpful assistant for website migrations.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 1200,
    temperature: 0.2,
  });

  let redirectMap: Record<string, string[]> = {};
  try {
    // Try to extract JSON from the response
    const match = response.choices[0]?.message?.content?.match(/```json([\s\S]*?)```|({[\s\S]*})/);
    const json = match ? match[1] || match[2] : response.choices[0]?.message?.content;
    if (json) {
      redirectMap = JSON.parse(json);
    }
  } catch {
    // fallback: no redirects
    redirectMap = {};
  }

  // Recursively assign redirects to each StoryCard
  function assignRedirects(cards: StoryCard[], parentPath = "") {
    for (const card of cards) {
      const path = parentPath + '/' + (card.slug || card.name || '').replace(/^\/+|\/+$/g, '');
      card.redirects = redirectMap[path] || [];
      if (card.children && card.children.length > 0) {
        assignRedirects(card.children, path);
      }
    }
  }
  assignRedirects(newIA);
  return newIA;
}
