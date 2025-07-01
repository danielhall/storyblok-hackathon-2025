'use client';

import { useState } from 'react';
import type { StoryCard } from '@/lib/services/types';
import Tag from '@/components/tag';

interface RawDashboardProps {
  isDraftMode: boolean;
}

export default function SitemapVisualiser({ isDraftMode }: RawDashboardProps) {
  const [sitemap, setSitemap] = useState('');
  const [dashboardData, setDashboardData] = useState<StoryCard[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const iaRes = await fetch(`/api/information-architecture?draft=${isDraftMode}`);
      if (!iaRes.ok) throw new Error((await iaRes.json()).error || 'IA API error');
      const ia: StoryCard[] = await iaRes.json();
      if (sitemap.trim()) {
        const res = await fetch('/api/suggest-redirects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sitemap, ia }),
        });
        if (!res.ok) throw new Error((await res.json()).error || 'OpenAI API error');
        const withRedirects = await res.json();
        setDashboardData(withRedirects);
      } else {
        setDashboardData(ia);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  }

  function StoryCardList({ cards }: { cards: StoryCard[] }) {
    if (!cards || cards.length === 0) return null;
    return (
      <ul className="space-y-4">
        {cards.map(card => (
          <li key={card.id} className="border rounded p-4 bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-lg">{card.name}</span>
              <Tag tag={card.storyType} pastel={false} />
            </div>
            {card.allowedBlocks && card.allowedBlocks.length > 0 && (
                <>
                    <span className="font-bold text-md">Allowed Blocks</span>
                    <div className="mb-2 flex flex-wrap gap-1">
                        {card.allowedBlocks.map(block => (
                            <Tag key={block} tag={block} pastel={true} />
                        ))}
                    </div>
                </>
            )}
            {card.redirects && card.redirects.length > 0 && (
              <div className="mb-2">
                <span className="font-semibold">Redirects:</span>
                <ul className="list-disc list-inside text-md my-5">
                  {card.redirects.map(url => (
                    <li key={url} className="break-all">{url}</li>
                  ))}
                </ul>
              </div>
            )}
            {card.children && card.children.length > 0 && (
              <div className="ml-4 border-l-2 border-gray-200 pl-4 mt-2">
                <StoryCardList cards={card.children} />
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="page max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard – Raw Data</h1>
      <label className="block mb-2 font-semibold">Paste old sitemap.xml (optional for redirect suggestions):</label>
      <textarea
        className="w-full border rounded p-2 mb-4 min-h-[120px] font-mono"
        value={sitemap}
        onChange={e => setSitemap(e.target.value)}
        placeholder="&lt;urlset&gt;...&lt;/urlset&gt;"
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-4"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate IA & Suggest Redirects'}
      </button>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {dashboardData && <StoryCardList cards={dashboardData} />}
    </div>
  );
}
