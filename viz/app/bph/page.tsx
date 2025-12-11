'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface BPHWork {
  id: string;
  ubn: string;
  title: string | null;
  author: string | null;
  place: string | null;
  year: number | null;
  keywords: string | null;
  language: string | null;
  ia_identifier: string | null;
  ia_url: string | null;
  ia_match_confidence: string | null;
  ia_match_method: string | null;
}

const KEYWORDS = [
  { value: '', label: 'All Subjects' },
  { value: 'hermetica', label: 'Hermetica' },
  { value: 'alchemy', label: 'Alchemy' },
  { value: 'mysticism', label: 'Mysticism' },
  { value: 'rosicrucianism', label: 'Rosicrucianism' },
  { value: 'kabbalah', label: 'Kabbalah' },
  { value: 'neoplatonism', label: 'Neoplatonism' },
  { value: 'magic', label: 'Magic' },
  { value: 'paracelsianism', label: 'Paracelsianism' },
  { value: 'theosophy', label: 'Theosophy' },
  { value: 'astrology', label: 'Astrology' },
  { value: 'occult', label: 'Occult Sciences' },
];

const IA_FILTERS = [
  { value: '', label: 'All Works' },
  { value: 'true', label: 'With IA Link' },
  { value: 'false', label: 'No IA Link' },
];

export default function BPHCatalog() {
  const [query, setQuery] = useState('');
  const [keyword, setKeyword] = useState('');
  const [yearMin, setYearMin] = useState(1400);
  const [yearMax, setYearMax] = useState(1700);
  const [hasIaMatch, setHasIaMatch] = useState('');
  const [language, setLanguage] = useState('');
  const [items, setItems] = useState<BPHWork[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const limit = 25;

  const search = useCallback(async (resetPage = false) => {
    if (resetPage) setPage(1);
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        q: query,
        keyword,
        yearMin: yearMin.toString(),
        yearMax: yearMax.toString(),
        page: (resetPage ? 1 : page).toString(),
        limit: limit.toString(),
      });

      if (hasIaMatch) params.set('hasIaMatch', hasIaMatch);
      if (language) params.set('language', language);

      const response = await fetch(`/api/bph/catalog?${params}`);
      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      setItems(data.items);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }, [query, keyword, yearMin, yearMax, hasIaMatch, language, page]);

  useEffect(() => {
    search();
  }, [page, search]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    search(true);
  }

  const totalPages = Math.ceil(total / limit);
  const matchedCount = items.filter(i => i.ia_identifier).length;

  return (
    <main className="min-h-screen bg-[#faf7f2]">
      {/* Header */}
      <div className="bg-[#1a1612] text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-serif mb-2">
            Embassy of the Free Mind
          </h1>
          <p className="text-lg text-gray-300 mb-4">
            Bibliotheca Philosophica Hermetica — The Hermetic Library
          </p>
          <p className="text-gray-400 max-w-2xl">
            Browse the catalog of ~28,000 works on esotericism, hermetica, alchemy, mysticism,
            and the Western esoteric tradition. Works with Internet Archive links can be read online.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-[#d4c4b5] p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-[#1a1612] mb-1">
                Search title or author
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., Ficino, Hermes, Paracelsus..."
                className="w-full px-3 py-2 border border-[#d4c4b5] rounded focus:outline-none focus:ring-1 focus:ring-[#9e4a3a]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1a1612] mb-1">
                Subject
              </label>
              <select
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full px-3 py-2 border border-[#d4c4b5] rounded focus:outline-none focus:ring-1 focus:ring-[#9e4a3a]"
              >
                {KEYWORDS.map(k => (
                  <option key={k.value} value={k.value}>{k.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1a1612] mb-1">
                IA Availability
              </label>
              <select
                value={hasIaMatch}
                onChange={(e) => setHasIaMatch(e.target.value)}
                className="w-full px-3 py-2 border border-[#d4c4b5] rounded focus:outline-none focus:ring-1 focus:ring-[#9e4a3a]"
              >
                {IA_FILTERS.map(f => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#1a1612] mb-1">
                Year from
              </label>
              <input
                type="number"
                value={yearMin}
                onChange={(e) => setYearMin(parseInt(e.target.value) || 1400)}
                min={1000}
                max={2000}
                className="w-full px-3 py-2 border border-[#d4c4b5] rounded focus:outline-none focus:ring-1 focus:ring-[#9e4a3a]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1a1612] mb-1">
                Year to
              </label>
              <input
                type="number"
                value={yearMax}
                onChange={(e) => setYearMax(parseInt(e.target.value) || 1700)}
                min={1000}
                max={2000}
                className="w-full px-3 py-2 border border-[#d4c4b5] rounded focus:outline-none focus:ring-1 focus:ring-[#9e4a3a]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1a1612] mb-1">
                Language
              </label>
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="e.g., Latin, German..."
                className="w-full px-3 py-2 border border-[#d4c4b5] rounded focus:outline-none focus:ring-1 focus:ring-[#9e4a3a]"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-2 bg-[#9e4a3a] text-white rounded hover:bg-[#8a4033] disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </form>

        {/* Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-[#5c5c5c]">
            {total.toLocaleString()} works found
            {matchedCount > 0 && items.length > 0 && (
              <span className="ml-2 text-[#9e4a3a]">
                ({matchedCount} with IA links on this page)
              </span>
            )}
          </div>
          <div className="text-sm text-[#5c5c5c]">
            Page {page} of {totalPages || 1}
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Results */}
        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map(item => (
              <div
                key={item.id}
                className={`bg-white rounded-lg border p-5 ${
                  item.ia_identifier
                    ? 'border-[#c9a86c] border-l-4'
                    : 'border-[#d4c4b5]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-[#1a1612] mb-1 leading-tight">
                      {item.title || 'Untitled'}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#5c5c5c] mb-2">
                      {item.author && <span>{item.author}</span>}
                      {item.place && <span>{item.place}</span>}
                      {item.year && <span className="font-medium">{item.year}</span>}
                      {item.language && (
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                          {item.language}
                        </span>
                      )}
                    </div>

                    {item.keywords && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.keywords.split(/[,;]/).slice(0, 5).map((kw, i) => (
                          <span
                            key={i}
                            className="text-xs bg-[#f5f0e8] px-2 py-0.5 rounded text-[#6c5b4a]"
                          >
                            {kw.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      {item.ubn && (
                        <span className="font-mono text-[#888]">UBN: {item.ubn}</span>
                      )}
                      <a
                        href={`https://embassyofthefreemind.com/en/library/online-catalogue/?q=${encodeURIComponent(item.title || '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9e4a3a] hover:underline"
                      >
                        Search EFM Catalog ↗
                      </a>
                    </div>
                  </div>

                  {/* IA Link */}
                  <div className="flex-shrink-0 text-right">
                    {item.ia_identifier ? (
                      <div>
                        <a
                          href={`https://archive.org/details/${item.ia_identifier}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-[#c9a86c] text-white text-sm rounded hover:bg-[#b8975b]"
                        >
                          Read on IA ↗
                        </a>
                        <div className="mt-2 text-xs text-[#888]">
                          {item.ia_match_confidence && (
                            <span className={`inline-block px-2 py-0.5 rounded ${
                              item.ia_match_confidence === 'high'
                                ? 'bg-green-100 text-green-700'
                                : item.ia_match_confidence === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {item.ia_match_confidence} confidence
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-xs font-mono text-[#aaa]">
                          {item.ia_identifier}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-[#999] italic">
                        No IA link yet
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !loading ? (
          <div className="text-center py-12 text-[#5c5c5c]">
            No works found. Try adjusting your search.
          </div>
        ) : (
          <div className="text-center py-12 text-[#5c5c5c]">
            Loading...
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="px-4 py-2 border border-[#d4c4b5] rounded disabled:opacity-50 hover:bg-[#f5f0e8]"
            >
              ← Previous
            </button>
            <span className="px-4 text-sm text-[#5c5c5c]">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
              className="px-4 py-2 border border-[#d4c4b5] rounded disabled:opacity-50 hover:bg-[#f5f0e8]"
            >
              Next →
            </button>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-12 pt-8 border-t border-[#e5ddd3] text-center text-sm text-[#888]">
          <p>
            Data from the{' '}
            <a
              href="https://embassyofthefreemind.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9e4a3a] hover:underline"
            >
              Embassy of the Free Mind
            </a>
            {' '}(Amsterdam). Internet Archive links identified through automated matching.
          </p>
          <p className="mt-2">
            <Link href="/validate" className="text-[#9e4a3a] hover:underline">
              Help validate IA matches →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
