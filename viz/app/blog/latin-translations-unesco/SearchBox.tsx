"use client";

import { useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ykhxaecbbxaaqlujuzde.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlraHhhZWNiYnhhYXFsdWp1emRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjExMDEsImV4cCI6MjA4MDYzNzEwMX0.O2chfnHGQWLOaVSFQ-F6UJMlya9EzPbsUh848SEOPj4"
);

const ERA_COLORS: Record<string, string> = {
  classical: '#546b8a', medieval: '#9e4a3a', renaissance: '#c9a86c',
  early_modern: '#8b9a7d', modern: '#7c6f9e',
};
const ERA_OPTIONS = ['all', 'classical', 'medieval', 'renaissance', 'early_modern', 'modern'] as const;
const ERA_LABELS: Record<string, string> = {
  all: 'All Eras', classical: 'Classical', medieval: 'Medieval',
  renaissance: 'Renaissance', early_modern: 'Early Modern', modern: 'Modern',
};

type TranslationRow = {
  id: number;
  author: string | null;
  english_title: string | null;
  translator: string | null;
  pub_year: string | null;
  publisher: string | null;
  era: string | null;
  original_year: string | null;
  canonical_author: string | null;
  canonical_work: string | null;
  source: string | null;
  series: string | null;
};

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [era, setEra] = useState<string>('all');
  const [results, setResults] = useState<TranslationRow[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 25;

  const doSearch = useCallback(async (pageNum: number) => {
    setLoading(true);
    setSearched(true);
    setPage(pageNum);

    let q = supabase
      .from('latin_translations')
      .select('id,author,english_title,translator,pub_year,publisher,era,original_year,canonical_author,canonical_work,source,series', { count: 'exact' });

    if (query.trim()) {
      const term = `%${query.trim()}%`;
      q = q.or(`author.ilike.${term},english_title.ilike.${term},translator.ilike.${term},canonical_author.ilike.${term},canonical_work.ilike.${term},publisher.ilike.${term}`);
    }
    if (era !== 'all') {
      q = q.eq('era', era);
    }

    q = q.order('pub_year', { ascending: false })
      .range(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE - 1);

    const { data, count, error } = await q;
    if (error) {
      console.error('Search error:', error);
      setResults([]);
      setTotal(0);
    } else {
      setResults(data || []);
      setTotal(count);
    }
    setLoading(false);
  }, [query, era]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(0);
  };

  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 0;

  return (
    <div style={{ margin: '32px 0' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by author, title, translator, publisher..."
          style={{
            flex: 1, minWidth: '200px', padding: '10px 14px',
            border: '1px solid #d4cfc4', borderRadius: '6px',
            fontFamily: 'Inter, sans-serif', fontSize: '14px',
            background: '#faf9f6', color: '#1a1612', outline: 'none',
          }}
        />
        <select
          value={era}
          onChange={e => setEra(e.target.value)}
          style={{
            padding: '10px 14px', border: '1px solid #d4cfc4', borderRadius: '6px',
            fontFamily: 'Inter, sans-serif', fontSize: '14px',
            background: '#faf9f6', color: '#1a1612', cursor: 'pointer',
          }}
        >
          {ERA_OPTIONS.map(e => <option key={e} value={e}>{ERA_LABELS[e]}</option>)}
        </select>
        <button
          type="submit"
          style={{
            padding: '10px 20px', background: '#9e4a3a', color: '#fff',
            border: 'none', borderRadius: '6px', cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600,
          }}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {searched && (
        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#888', marginBottom: '12px' }}>
            {total !== null ? `${total.toLocaleString()} result${total !== 1 ? 's' : ''}` : ''}
            {total !== null && total > PAGE_SIZE ? ` (showing ${page * PAGE_SIZE + 1}\u2013${Math.min((page + 1) * PAGE_SIZE, total)})` : ''}
          </p>

          {results.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #d4cfc4', textAlign: 'left' }}>
                    {['YEAR', 'AUTHOR', 'TITLE', 'TRANSLATOR', 'PUBLISHER', 'ERA'].map(h => (
                      <th key={h} style={{ padding: '8px 6px', color: '#888', fontWeight: 600, fontSize: '11px', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map(r => (
                    <tr key={r.id} style={{ borderBottom: '1px solid #ece8e0' }}>
                      <td style={{ padding: '8px 6px', whiteSpace: 'nowrap' }}>{r.pub_year || '\u2014'}</td>
                      <td style={{ padding: '8px 6px' }}>{r.canonical_author || r.author || '\u2014'}</td>
                      <td style={{ padding: '8px 6px', fontStyle: 'italic', maxWidth: '300px' }}>{r.english_title || '\u2014'}</td>
                      <td style={{ padding: '8px 6px' }}>{r.translator || '\u2014'}</td>
                      <td style={{ padding: '8px 6px', fontSize: '12px', color: '#666' }}>{r.publisher || '\u2014'}</td>
                      <td style={{ padding: '8px 6px' }}>
                        {r.era && (
                          <span style={{
                            display: 'inline-block', padding: '2px 8px', borderRadius: '10px',
                            fontSize: '10px', fontWeight: 600, letterSpacing: '0.03em',
                            background: ERA_COLORS[r.era] || '#d4cfc4', color: '#fff',
                          }}>
                            {ERA_LABELS[r.era] || r.era}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !loading && <p style={{ color: '#888', fontStyle: 'italic' }}>No results found.</p>
          )}

          {totalPages > 1 && (
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px', alignItems: 'center' }}>
              <button
                onClick={() => doSearch(page - 1)}
                disabled={page === 0}
                style={{
                  padding: '6px 14px', border: '1px solid #d4cfc4', borderRadius: '4px',
                  background: page === 0 ? '#f5f3ef' : '#fff', cursor: page === 0 ? 'default' : 'pointer',
                  fontFamily: 'Inter, sans-serif', fontSize: '12px', color: page === 0 ? '#ccc' : '#1a1612',
                }}
              >
                Previous
              </button>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#888' }}>
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => doSearch(page + 1)}
                disabled={page >= totalPages - 1}
                style={{
                  padding: '6px 14px', border: '1px solid #d4cfc4', borderRadius: '4px',
                  background: page >= totalPages - 1 ? '#f5f3ef' : '#fff', cursor: page >= totalPages - 1 ? 'default' : 'pointer',
                  fontFamily: 'Inter, sans-serif', fontSize: '12px', color: page >= totalPages - 1 ? '#ccc' : '#1a1612',
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
