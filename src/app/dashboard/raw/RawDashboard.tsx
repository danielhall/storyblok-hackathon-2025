'use client';

import { useState } from 'react';
import type { StoryCard } from '@/lib/services/types';

interface RawDashboardProps {
  isDraftMode: boolean;
}

export default function RawDashboard({ isDraftMode }: RawDashboardProps) {
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
      {dashboardData && (
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-xs">
          {JSON.stringify(dashboardData, null, 2)}
        </pre>
      )}
    </div>
  );
}
