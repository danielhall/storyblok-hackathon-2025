import { NextRequest } from 'next/server';
import { suggestRedirectsFromSitemap } from '@/lib/services/openai-service';
import { StoryCard } from '@/lib/services/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { sitemap, ia } = await req.json();
    if (!sitemap || !ia) {
      return new Response(JSON.stringify({ error: 'Missing sitemap or IA' }), { status: 400 });
    }
    const result: StoryCard[] = await suggestRedirectsFromSitemap(sitemap, ia);
    return new Response(JSON.stringify(result), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Internal server error';
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}
