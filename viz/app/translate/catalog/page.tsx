'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

interface IAItem {
  identifier: string;
  title: string | null;
  creator: string | null;
  year: number | null;
  subject: string[] | null;
  downloads: number | null;
}

export default function CatalogBrowser() {
  const { session } = useAuth();
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [yearMin, setYearMin] = useState(1450);
  const [yearMax, setYearMax] = useState(1700);
  const [items, setItems] = useState<IAItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState<string | null>(null);

  // Modal state for configuring translation
  const [selectedItem, setSelectedItem] = useState<IAItem | null>(null);
  const [previewPages, setPreviewPages] = useState(30);
  const [totalPagesToProcess, setTotalPagesToProcess] = useState<number | null>(null); // null = all pages

  const limit = 20;

  useEffect(() => {
    search();
  }, [page]);

  async function search(resetPage = false) {
    if (resetPage) setPage(1);
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        q: query,
        yearMin: yearMin.toString(),
        yearMax: yearMax.toString(),
        page: (resetPage ? 1 : page).toString(),
        limit: limit.toString()
      });

      const response = await fetch(`/api/translate/catalog?${params}`);
      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      setItems(data.items);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }

  function openConfigModal(item: IAItem) {
    setSelectedItem(item);
    setPreviewPages(30);
    setTotalPagesToProcess(null);
  }

  function closeConfigModal() {
    setSelectedItem(null);
  }

  async function startTranslation() {
    if (!session?.access_token || !selectedItem) return;

    setCreating(selectedItem.identifier);

    try {
      const response = await fetch('/api/translate/jobs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ia_identifier: selectedItem.identifier,
          title: selectedItem.title,
          creator: selectedItem.creator,
          year: selectedItem.year,
          preview_pages: previewPages,
          max_pages: totalPagesToProcess // null means all pages
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create translation job');
      }

      const data = await response.json();
      router.push(`/translate/${data.job.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start translation');
      setCreating(null);
      closeConfigModal();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    search(true);
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-[#1a1612]">Internet Archive Latin Catalog</h1>
        <p className="mt-2 text-[#5c5c5c]">
          Browse {total.toLocaleString()} Latin texts from the Internet Archive
        </p>
      </div>

      {/* Search form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white rounded-lg border border-[#d4c4b5] p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#1a1612] mb-1">
              Search title or author
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Ficino, De mysteriis, Hermes..."
              className="w-full px-3 py-2 border border-[#d4c4b5] rounded focus:outline-none focus:ring-1 focus:ring-[#9e4a3a]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1612] mb-1">
              Year from
            </label>
            <input
              type="number"
              value={yearMin}
              onChange={(e) => setYearMin(parseInt(e.target.value) || 1450)}
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
        </div>

        <div className="mt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#9e4a3a] text-white rounded hover:bg-[#8a4033] disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Results */}
      {items.length > 0 ? (
        <>
          <div className="space-y-4">
            {items.map(item => (
              <div
                key={item.identifier}
                className="bg-white rounded-lg border border-[#d4c4b5] p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-[#1a1612] mb-1">
                      {item.title || item.identifier}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-[#5c5c5c] mb-2">
                      {item.creator && <span>{item.creator}</span>}
                      {item.year && <span>{item.year}</span>}
                      {item.downloads && (
                        <span>{item.downloads.toLocaleString()} downloads</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                        {item.identifier}
                      </span>
                      <a
                        href={`https://archive.org/details/${item.identifier}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#9e4a3a] hover:underline"
                      >
                        View on IA ↗
                      </a>
                    </div>
                    {item.subject && item.subject.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.subject.slice(0, 5).map((subj, i) => (
                          <span
                            key={i}
                            className="text-xs bg-[#faf7f2] px-2 py-0.5 rounded text-[#5c5c5c]"
                          >
                            {subj}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => openConfigModal(item)}
                    disabled={creating === item.identifier}
                    className="ml-4 px-4 py-2 bg-[#9e4a3a] text-white text-sm rounded hover:bg-[#8a4033] disabled:opacity-50"
                  >
                    {creating === item.identifier ? 'Starting...' : 'Translate'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
                className="px-3 py-1 border border-[#d4c4b5] rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 text-sm text-[#5c5c5c]">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || loading}
                className="px-3 py-1 border border-[#d4c4b5] rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : !loading ? (
        <div className="text-center py-12 text-[#5c5c5c]">
          No results found. Try adjusting your search.
        </div>
      ) : null}

      {/* Configuration Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h2 className="text-xl font-serif text-[#1a1612] mb-2">
              Configure Translation
            </h2>
            <p className="text-sm text-[#5c5c5c] mb-6">
              {selectedItem.title || selectedItem.identifier}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1a1612] mb-1">
                  Preview Pages
                </label>
                <input
                  type="number"
                  value={previewPages}
                  onChange={(e) => setPreviewPages(Math.max(1, parseInt(e.target.value) || 30))}
                  min={1}
                  max={100}
                  className="w-full px-3 py-2 border border-[#d4c4b5] rounded focus:outline-none focus:ring-1 focus:ring-[#9e4a3a]"
                />
                <p className="mt-1 text-xs text-[#5c5c5c]">
                  Process this many pages first, then pause for review
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1a1612] mb-1">
                  Total Pages to Process
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="pageLimit"
                      checked={totalPagesToProcess === null}
                      onChange={() => setTotalPagesToProcess(null)}
                      className="text-[#9e4a3a]"
                    />
                    <span className="text-sm">All pages</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="pageLimit"
                      checked={totalPagesToProcess !== null}
                      onChange={() => setTotalPagesToProcess(50)}
                      className="text-[#9e4a3a]"
                    />
                    <span className="text-sm">Custom limit</span>
                  </label>
                </div>
                {totalPagesToProcess !== null && (
                  <input
                    type="number"
                    value={totalPagesToProcess}
                    onChange={(e) => setTotalPagesToProcess(Math.max(1, parseInt(e.target.value) || 50))}
                    min={1}
                    className="mt-2 w-full px-3 py-2 border border-[#d4c4b5] rounded focus:outline-none focus:ring-1 focus:ring-[#9e4a3a]"
                    placeholder="e.g., 50"
                  />
                )}
                <p className="mt-1 text-xs text-[#5c5c5c]">
                  {totalPagesToProcess === null
                    ? 'Will process all available pages after review'
                    : `Will stop after ${totalPagesToProcess} pages total`}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={closeConfigModal}
                className="px-4 py-2 text-[#5c5c5c] hover:text-[#1a1612]"
              >
                Cancel
              </button>
              <button
                onClick={startTranslation}
                disabled={creating === selectedItem.identifier}
                className="px-6 py-2 bg-[#9e4a3a] text-white rounded hover:bg-[#8a4033] disabled:opacity-50"
              >
                {creating === selectedItem.identifier ? 'Starting...' : 'Start Translation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
