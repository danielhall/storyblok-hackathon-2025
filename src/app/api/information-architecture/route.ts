import { NextRequest } from 'next/server';
import { computeSpaceIA } from '@/lib/services/ia-orchestration-service';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const draft = searchParams.get('draft') === 'true';
    const ia = await computeSpaceIA(draft);
    return new Response(JSON.stringify(ia), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Internal server error';
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}
