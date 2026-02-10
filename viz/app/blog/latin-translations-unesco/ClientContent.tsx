"use client";

import { useState, useCallback } from "react";
import BlogLayout from "../BlogLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, PieChart, Pie } from "recharts";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ykhxaecbbxaaqlujuzde.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlraHhhZWNiYnhhYXFsdWp1emRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjExMDEsImV4cCI6MjA4MDYzNzEwMX0.O2chfnHGQWLOaVSFQ-F6UJMlya9EzPbsUh848SEOPj4"
);

const centuryData = [
  { century: "5c BCE", count: 4 },
  { century: "4c BCE", count: 5 },
  { century: "3c BCE", count: 15 },
  { century: "2c BCE", count: 17 },
  { century: "1c BCE", count: 209 },
  { century: "1c CE", count: 171 },
  { century: "2c CE", count: 82 },
  { century: "3c CE", count: 17 },
  { century: "4c CE", count: 107 },
  { century: "5c CE", count: 65 },
  { century: "6c CE", count: 58 },
  { century: "7c CE", count: 26 },
  { century: "8c CE", count: 31 },
  { century: "9c CE", count: 30 },
  { century: "10c CE", count: 23 },
  { century: "11c CE", count: 60 },
  { century: "12c CE", count: 187 },
  { century: "13c CE", count: 213 },
  { century: "14c CE", count: 157 },
  { century: "15c CE", count: 161 },
  { century: "16c CE", count: 289 },
  { century: "17c CE", count: 194 },
  { century: "18c CE", count: 106 },
  { century: "19c CE", count: 23 },
  { century: "20c CE", count: 288 },
];

const ERA_COLORS: Record<string, string> = {
  classical: '#546b8a',
  medieval: '#9e4a3a',
  renaissance: '#c9a86c',
  early_modern: '#8b9a7d',
  modern: '#7c6f9e',
};

const centuryBarColors = centuryData.map(d => {
  const c = d.century;
  if (c.includes('BCE') || ['1c CE', '2c CE', '3c CE', '4c CE', '5c CE'].includes(c)) return ERA_COLORS.classical;
  if (['6c CE', '7c CE', '8c CE', '9c CE', '10c CE', '11c CE', '12c CE', '13c CE', '14c CE'].includes(c)) return ERA_COLORS.medieval;
  if (['15c CE', '16c CE'].includes(c)) return ERA_COLORS.renaissance;
  if (['17c CE', '18c CE'].includes(c)) return ERA_COLORS.early_modern;
  return ERA_COLORS.modern;
});

const pubYearData = [
  { year: "1978", count: 73, source: "unesco" }, { year: "1979", count: 112, source: "unesco" }, { year: "1980", count: 79, source: "unesco" },
  { year: "1981", count: 80, source: "unesco" }, { year: "1982", count: 67, source: "unesco" }, { year: "1983", count: 65, source: "unesco" },
  { year: "1984", count: 78, source: "unesco" }, { year: "1985", count: 77, source: "unesco" }, { year: "1986", count: 86, source: "unesco" },
  { year: "1987", count: 91, source: "unesco" }, { year: "1988", count: 79, source: "unesco" }, { year: "1989", count: 89, source: "unesco" },
  { year: "1990", count: 111, source: "unesco" }, { year: "1991", count: 106, source: "unesco" }, { year: "1992", count: 118, source: "unesco" },
  { year: "1993", count: 112, source: "unesco" }, { year: "1994", count: 129, source: "unesco" }, { year: "1995", count: 148, source: "unesco" },
  { year: "1996", count: 134, source: "unesco" }, { year: "1997", count: 120, source: "unesco" }, { year: "1998", count: 117, source: "unesco" },
  { year: "1999", count: 144, source: "unesco" }, { year: "2000", count: 119, source: "unesco" }, { year: "2001", count: 126, source: "unesco" },
  { year: "2002", count: 146, source: "unesco" }, { year: "2003", count: 148, source: "unesco" }, { year: "2004", count: 145, source: "unesco" },
  { year: "2005", count: 162, source: "unesco" }, { year: "2006", count: 172, source: "unesco" }, { year: "2007", count: 139, source: "unesco" },
  { year: "2008", count: 108, source: "unesco" }, { year: "2009", count: 33, source: "scraped" },
  { year: "2010", count: 38, source: "scraped" }, { year: "2011", count: 39, source: "scraped" }, { year: "2012", count: 50, source: "scraped" },
  { year: "2013", count: 26, source: "scraped" }, { year: "2014", count: 30, source: "scraped" }, { year: "2015", count: 31, source: "scraped" },
  { year: "2016", count: 37, source: "scraped" }, { year: "2017", count: 44, source: "scraped" }, { year: "2018", count: 34, source: "scraped" },
  { year: "2019", count: 36, source: "scraped" }, { year: "2020", count: 31, source: "scraped" }, { year: "2021", count: 18, source: "scraped" },
  { year: "2022", count: 24, source: "scraped" }, { year: "2023", count: 20, source: "scraped" }, { year: "2024", count: 27, source: "scraped" },
  { year: "2025", count: 19, source: "scraped" },
];

const decadeData = [
  { decade: "1800s", count: 74, source: "historical" },
  { decade: "1810s", count: 48, source: "historical" },
  { decade: "1820s", count: 57, source: "historical" },
  { decade: "1830s", count: 50, source: "historical" },
  { decade: "1840s", count: 70, source: "historical" },
  { decade: "1850s", count: 95, source: "historical" },
  { decade: "1860s", count: 91, source: "historical" },
  { decade: "1870s", count: 117, source: "historical" },
  { decade: "1880s", count: 183, source: "historical" },
  { decade: "1890s", count: 196, source: "historical" },
  { decade: "1900s", count: 220, source: "historical" },
  { decade: "1910s", count: 238, source: "historical" },
  { decade: "1920s", count: 251, source: "historical" },
  { decade: "1930s", count: 246, source: "historical" },
  { decade: "1940s", count: 156, source: "historical" },
  { decade: "1950s", count: 289, source: "historical" },
  { decade: "1960s", count: 454, source: "historical" },
  { decade: "1970s", count: 479, source: "unesco" },
  { decade: "1980s", count: 797, source: "unesco" },
  { decade: "1990s", count: 1277, source: "unesco" },
  { decade: "2000s", count: 1345, source: "unesco" },
  { decade: "2010s", count: 400, source: "scraped" },
  { decade: "2020s", count: 157, source: "scraped" },
];

const post2009ByPublisher = [
  { publisher: "Other Academic", count: 125, color: "#d4cfc4" },
  { publisher: "CUA / Paulist Press", count: 67, color: "#9e4a3a" },
  { publisher: "De Gruyter / Toronto UP", count: 54, color: "#8b9a7d" },
  { publisher: "I Tatti Renaissance Library", count: 46, color: "#c9a86c" },
  { publisher: "Harvard UP (DOML/Loeb)", count: 34, color: "#546b8a" },
  { publisher: "Cambridge UP", count: 29, color: "#7c6f9e" },
  { publisher: "Cistercian / Liturgical Press", count: 25, color: "#8a7c5a" },
  { publisher: "Chicago / Indiana / Columbia UP", count: 25, color: "#b86b5d" },
  { publisher: "OUP", count: 21, color: "#7c6f9e" },
  { publisher: "Hackett / Focus", count: 21, color: "#5a8a7b" },
  { publisher: "Penguin", count: 19, color: "#b86b5d" },
  { publisher: "Brill", count: 17, color: "#d4a574" },
  { publisher: "Liverpool UP (TTH)", count: 16, color: "#546b8a" },
  { publisher: "Cazimi Press (astrology)", count: 11, color: "#6b546b" },
  { publisher: "New City Press (Augustine)", count: 10, color: "#8b6b5a" },
  { publisher: "Golden Hoard (grimoires)", count: 6, color: "#5a6b8b" },
];

const mostTranslated = [
  { work: "Aeneid", author: "Virgil", editions: 34 },
  { work: "Metamorphoses", author: "Ovid", editions: 24 },
  { work: "Imitatio Christi", author: "Thomas a Kempis", editions: 20 },
  { work: "Confessiones", author: "Augustine", editions: 16 },
  { work: "Utopia", author: "Thomas More", editions: 14 },
  { work: "Odes", author: "Horace", editions: 12 },
  { work: "Comedies", author: "Plautus", editions: 10 },
  { work: "Summa Theologiae", author: "Thomas Aquinas", editions: 9 },
  { work: "Arcana Caelestia", author: "Swedenborg", editions: 9 },
  { work: "Satyricon", author: "Petronius", editions: 8 },
  { work: "De Vita Caesarum", author: "Suetonius", editions: 7 },
  { work: "Eclogues", author: "Virgil", editions: 6 },
  { work: "Ethics", author: "Spinoza", editions: 6 },
  { work: "On the Nature of Things", author: "Lucretius", editions: 6 },
  { work: "Praise of Folly", author: "Erasmus", editions: 5 },
];

const topAuthors = [
  { author: "John Paul II", works: 93, era: "modern" },
  { author: "Thomas Aquinas", works: 47, era: "medieval" },
  { author: "Augustine", works: 34, era: "classical" },
  { author: "Swedenborg", works: 30, era: "early_modern" },
  { author: "Catholic Church", works: 23, era: "modern" },
  { author: "Cicero", works: 19, era: "classical" },
  { author: "Bernard of Clairvaux", works: 17, era: "medieval" },
  { author: "Nicholas of Cusa", works: 17, era: "renaissance" },
  { author: "Hildegard of Bingen", works: 16, era: "medieval" },
  { author: "Seneca", works: 15, era: "classical" },
  { author: "Erasmus", works: 14, era: "renaissance" },
  { author: "Ovid", works: 14, era: "classical" },
  { author: "Virgil", works: 13, era: "classical" },
  { author: "Bonaventure", works: 13, era: "medieval" },
  { author: "John Calvin", works: 13, era: "renaissance" },
  { author: "Horace", works: 12, era: "classical" },
  { author: "Bede", works: 11, era: "medieval" },
  { author: "Petrarch", works: 10, era: "renaissance" },
  { author: "Descartes", works: 9, era: "early_modern" },
  { author: "Tacitus", works: 9, era: "classical" },
];

const countryData = [
  { country: "United States", count: 1697 },
  { country: "United Kingdom", count: 1087 },
  { country: "Canada", count: 139 },
  { country: "Holy See", count: 71 },
  { country: "Germany", count: 58 },
  { country: "Australia", count: 25 },
  { country: "Other", count: 114 },
];

const FIGURE_STYLE = {
  background: '#fff',
  border: '1px solid #e8e4dc',
  borderRadius: '8px',
  padding: '24px',
  margin: '32px 0',
};

const CAPTION_STYLE = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500 as const,
  letterSpacing: '0.05em',
  color: '#888',
  marginBottom: '16px',
};

const TOOLTIP_STYLE = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '13px',
  border: '1px solid #e8e4dc',
  borderRadius: '4px',
  background: '#fff',
};

const TICK_STYLE = { fontSize: 11, fontFamily: 'Inter, sans-serif', fill: '#888' };

function EraLegend() {
  return (
    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '12px', flexWrap: 'wrap' }}>
      {(['Classical', 'Medieval', 'Renaissance', 'Early Modern', 'Modern'] as const).map(label => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: 12, height: 12, borderRadius: 2, background: ERA_COLORS[label.toLowerCase().replace(' ', '_')] }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#888' }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

function HorizontalBar({ items, maxVal, labelWidth = 200 }: {
  items: { label: string; sublabel?: string; value: number; color: string }[];
  maxVal: number;
  labelWidth?: number;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: labelWidth, minWidth: labelWidth, textAlign: 'right',
            fontFamily: 'Newsreader, Georgia, serif', fontSize: '14px', color: '#1a1612',
          }}>
            <span style={{ fontStyle: 'italic' }}>{item.label}</span>
            {item.sublabel && <span style={{ color: '#888', fontSize: '12px' }}> &mdash; {item.sublabel}</span>}
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              height: '20px', width: `${(item.value / maxVal) * 100}%`,
              background: item.color, borderRadius: '2px',
              display: 'flex', alignItems: 'center',
            }}>
              {item.value >= 10 && (
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#fff', paddingLeft: '6px', fontWeight: 600 }}>
                  {item.value}
                </span>
              )}
            </div>
            {item.value < 10 && (
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#888', fontWeight: 600 }}>
                {item.value}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

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

const ERA_OPTIONS = ['all', 'classical', 'medieval', 'renaissance', 'early_modern', 'modern'] as const;
const ERA_LABELS: Record<string, string> = {
  all: 'All Eras', classical: 'Classical', medieval: 'Medieval',
  renaissance: 'Renaissance', early_modern: 'Early Modern', modern: 'Modern',
};

function SearchBox() {
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
            background: '#faf9f6', color: '#1a1612',
            outline: 'none',
          }}
        />
        <select
          value={era}
          onChange={e => { setEra(e.target.value); }}
          style={{
            padding: '10px 14px', border: '1px solid #d4cfc4', borderRadius: '6px',
            fontFamily: 'Inter, sans-serif', fontSize: '14px',
            background: '#faf9f6', color: '#1a1612', cursor: 'pointer',
          }}
        >
          {ERA_OPTIONS.map(e => (
            <option key={e} value={e}>{ERA_LABELS[e]}</option>
          ))}
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
              <table style={{
                width: '100%', borderCollapse: 'collapse',
                fontFamily: 'Inter, sans-serif', fontSize: '13px',
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #d4cfc4', textAlign: 'left' }}>
                    <th style={{ padding: '8px 6px', color: '#888', fontWeight: 600, fontSize: '11px', letterSpacing: '0.05em' }}>YEAR</th>
                    <th style={{ padding: '8px 6px', color: '#888', fontWeight: 600, fontSize: '11px', letterSpacing: '0.05em' }}>AUTHOR</th>
                    <th style={{ padding: '8px 6px', color: '#888', fontWeight: 600, fontSize: '11px', letterSpacing: '0.05em' }}>TITLE</th>
                    <th style={{ padding: '8px 6px', color: '#888', fontWeight: 600, fontSize: '11px', letterSpacing: '0.05em' }}>TRANSLATOR</th>
                    <th style={{ padding: '8px 6px', color: '#888', fontWeight: 600, fontSize: '11px', letterSpacing: '0.05em' }}>PUBLISHER</th>
                    <th style={{ padding: '8px 6px', color: '#888', fontWeight: 600, fontSize: '11px', letterSpacing: '0.05em' }}>ERA</th>
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

interface ClientContentProps { jsonLd: string; }

export default function ClientContent({ jsonLd }: ClientContentProps) {
  return (
    <BlogLayout
      title="What Latin Gets Translated? 9,016 Translations from 1800 to 2025"
      tag="Data"
      slug="latin-translations-unesco"
      prevPost={{ href: "/blog/theology-problem", title: "The Theology Problem" }}
      jsonLd={jsonLd}
    >
      <p style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '22px', lineHeight: 1.6, color: '#444', marginBottom: '32px' }}>
        UNESCO&apos;s <a href="https://www.unesco.org/xtrans/bsform.aspx" style={{ color: '#9e4a3a', textDecoration: 'none' }}>Index Translationum</a> tracked
        every book translation published worldwide from 1979 to 2009&mdash;roughly 2 million records across 800 languages.
        We scraped all <strong>3,191 Latin-to-English translations</strong> from UNESCO, extended the dataset to 2025
        by scraping catalogs from 30+ publishers and series, then reached back to 1800
        using the Open Library and Internet Archive APIs and the full Loeb Classical Library catalog&mdash;reaching <strong>7,542 total records</strong> spanning
        two centuries of Latin translation.
      </p>

      <h2>When Were These Works Originally Written?</h2>
      <p>
        The most striking pattern is the bimodal distribution. Modern translators don&apos;t draw evenly
        from the Latin tradition&mdash;they cluster around two peaks separated by a thousand years.
      </p>

      <figure style={FIGURE_STYLE}>
        <figcaption style={CAPTION_STYLE}>TRANSLATIONS BY CENTURY OF ORIGINAL COMPOSITION</figcaption>
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <BarChart data={centuryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8e4dc" vertical={false} />
              <XAxis dataKey="century" tick={TICK_STYLE} interval={0} angle={-45} textAnchor="end" height={60} />
              <YAxis tick={TICK_STYLE} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                {centuryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={centuryBarColors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <EraLegend />
      </figure>

      <p><strong>Peak 1: The Golden Age</strong> (1st century BCE). Cicero, Virgil, Ovid, Horace, Lucretius, Caesar&mdash;the canon that never stops being retranslated.</p>
      <p><strong>Peak 2: The Scholastic-Renaissance boom</strong> (12th&ndash;16th centuries). Medieval and Renaissance Latin writers&mdash;Aquinas, Hildegard, Erasmus, Copernicus, Calvin&mdash;generate as much translation activity as the classical authors. The 16th century alone accounts for 289 translations.</p>
      <p><strong>The valley</strong> between them (3rd&ndash;10th centuries) is the &ldquo;Dark Ages&rdquo; showing up in the data. Only Augustine and Boethius punch through.</p>
      <p><strong>The 20th century spike</strong> (288) is almost entirely John Paul II&apos;s encyclicals and Vatican II documents&mdash;institutional Latin, not literary.</p>

      <h2>The Most Re-Translated Works</h2>
      <p>
        Of the <strong>2,037 unique works</strong> in the dataset, most appear only once. But some are
        translated again and again. The <em>Aeneid</em> alone has 34 separate English translations in this 30-year window.
      </p>

      <figure style={FIGURE_STYLE}>
        <figcaption style={CAPTION_STYLE}>MOST RE-TRANSLATED LATIN WORKS, 1979&ndash;2009</figcaption>
        <HorizontalBar
          maxVal={34}
          items={mostTranslated.map((item, i) => ({
            label: item.work,
            sublabel: item.author,
            value: item.editions,
            color: i === 0 ? '#9e4a3a' : i < 3 ? '#b86b5d' : i < 6 ? '#c9a86c' : '#d4cfc4',
          }))}
        />
      </figure>

      <h2>Unique vs. Repeated: The Shape of Translation</h2>
      <p>
        Roughly a third of all Latin-to-English translation activity goes toward re-translating works
        that already have an English version. Classical works get re-done constantly; medieval works
        are being <em>discovered</em>, not re-translated.
      </p>

      <figure style={FIGURE_STYLE}>
        <figcaption style={CAPTION_STYLE}>UNIQUE WORKS VS. TOTAL TRANSLATIONS BY ERA</figcaption>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={[
                { era: 'Classical', unique: 420, retranslations: 240 },
                { era: 'Medieval', unique: 738, retranslations: 124 },
                { era: 'Renaissance', unique: 307, retranslations: 59 },
                { era: 'Early Modern', unique: 305, retranslations: 55 },
                { era: 'Modern', unique: 267, retranslations: 46 },
              ]}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e8e4dc" vertical={false} />
              <XAxis dataKey="era" tick={{ ...TICK_STYLE, fontSize: 12 }} />
              <YAxis tick={TICK_STYLE} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontFamily: 'Inter, sans-serif', fontSize: '12px' }} />
              <Bar dataKey="unique" name="Unique works" stackId="a" fill="#9e4a3a" />
              <Bar dataKey="retranslations" name="Re-translations" stackId="a" fill="#d4cfc4" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </figure>

      <h2>Who Gets Translated</h2>

      <figure style={FIGURE_STYLE}>
        <figcaption style={CAPTION_STYLE}>TOP 20 AUTHORS BY UNIQUE WORKS TRANSLATED</figcaption>
        <HorizontalBar
          maxVal={93}
          labelWidth={160}
          items={topAuthors.map(item => ({
            label: item.author,
            value: item.works,
            color: ERA_COLORS[item.era],
          }))}
        />
        <EraLegend />
      </figure>

      <h2>Two Centuries of Latin Translation</h2>
      <p>By extending the dataset back to 1800 using Open Library and Internet Archive records, we can see the
        long arc of Latin translation into English. Translation accelerated throughout the 19th century, dipped
        during both World Wars, then surged in the postwar university expansion of the 1950s&ndash;60s. The UNESCO
        decades (1970s&ndash;2000s) show the highest recorded rates, peaking at over 1,300 translations in the 2000s.
        The 2010s and 2020s bars are undercounts from publisher catalogs only.</p>

      <figure style={FIGURE_STYLE}>
        <figcaption style={CAPTION_STYLE}>LATIN-TO-ENGLISH TRANSLATIONS BY DECADE, 1800&ndash;2025</figcaption>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={decadeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8e4dc" vertical={false} />
              <XAxis dataKey="decade" tick={TICK_STYLE} interval={1} angle={-45} textAnchor="end" height={50} />
              <YAxis tick={TICK_STYLE} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                {decadeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.source === 'historical' ? '#8b9a7d' : entry.source === 'unesco' ? '#9e4a3a' : '#c9a86c'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '8px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: '#8b9a7d' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#888' }}>Open Library / Internet Archive / Loeb</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: '#9e4a3a' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#888' }}>UNESCO (comprehensive)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: '#c9a86c' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#888' }}>Publisher catalogs (partial)</span>
          </div>
        </div>
      </figure>

      <p><strong>Note on historical data:</strong> The pre-1979 records come from library catalog APIs (Open Library, Internet Archive)
        rather than comprehensive surveys like UNESCO. They capture books that were cataloged and digitized, which skews toward
        major publishers and frequently-held works. The true number of Latin-to-English translations published in any given
        decade before 1979 was likely higher than shown.</p>

      <h2>UNESCO Years: Annual Detail (1978&ndash;2025)</h2>
      <p>Zooming into the UNESCO period and beyond, Latin translation accelerated from ~70/year in 1978 to a peak of 172 in 2006.
        The post-2009 bars (lighter) capture academic series and specialist translators but not
        the full publishing landscape that UNESCO tracked.</p>

      <figure style={FIGURE_STYLE}>
        <figcaption style={CAPTION_STYLE}>LATIN-TO-ENGLISH TRANSLATIONS PUBLISHED PER YEAR</figcaption>
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <BarChart data={pubYearData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8e4dc" vertical={false} />
              <XAxis dataKey="year" tick={TICK_STYLE} interval={3} />
              <YAxis tick={TICK_STYLE} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                {pubYearData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.source === 'unesco' ? '#9e4a3a' : '#c9a86c'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: '#9e4a3a' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#888' }}>UNESCO (comprehensive)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: '#c9a86c' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#888' }}>Publisher catalogs (partial)</span>
          </div>
        </div>
      </figure>

      <h2>Where Translations Are Published</h2>

      <figure style={FIGURE_STYLE}>
        <figcaption style={CAPTION_STYLE}>COUNTRY OF PUBLICATION</figcaption>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={countryData} dataKey="count" nameKey="country"
                cx="50%" cy="50%" outerRadius={110}
                label={({ country, count }) => `${country} (${count})`}
                labelLine={true}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}
              >
                {countryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={['#546b8a', '#9e4a3a', '#c9a86c', '#8b9a7b', '#7c6f9e', '#5a8a7b', '#d4cfc4'][index]} />
                ))}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </figure>

      <p>The US and UK account for 87% of all Latin-to-English translation publishing.</p>

      <h2>After UNESCO: Who Keeps Translating?</h2>
      <p>
        UNESCO stopped tracking in 2009. To extend the dataset, we scraped catalogs from 50+ publishers and specialist presses that
        publish Latin-to-English translations. This captured 553 post-2009 entries&mdash;still a fraction of the true total, but
        enough to see who&apos;s doing the work.
      </p>

      <figure style={FIGURE_STYLE}>
        <figcaption style={CAPTION_STYLE}>POST-2009 TRANSLATIONS BY PUBLISHER SERIES (PARTIAL)</figcaption>
        <HorizontalBar
          maxVal={125}
          labelWidth={180}
          items={post2009ByPublisher.map(item => ({
            label: item.publisher,
            value: item.count,
            color: item.color,
          }))}
        />
      </figure>

      <p>
        <strong>CUA Press and Paulist Press</strong> lead with 67 combined post-2009 entries, driven by the
        Fathers of the Church (FOTC) and Ancient Christian Writers (ACW) series. <strong>Harvard</strong> contributes
        80 entries across three series: the I Tatti Renaissance Library (46), Dumbarton Oaks Medieval Library (34),
        and Loeb Classical Library. <strong>De Gruyter/Toronto</strong> volumes
        are almost entirely the Collected Works of Erasmus. Beyond academic presses, we discovered a thriving ecosystem
        of <strong>specialist presses</strong>: <strong>Cazimi Press</strong> (Benjamin Dykes&apos;s medieval astrology translations),
        <strong>Golden Hoard Press</strong> (Stephen Skinner&apos;s grimoire series), <strong>New City Press</strong> (the
        47-volume Works of Saint Augustine), and individual translators like Joseph Peterson (Solomonic grimoires),
        Adam McLean (alchemical texts), and the astrologers of Project Hindsight and the AFA.
      </p>
      <p>
        With 50+ publishers and specialist presses now tracked, the post-2009 rate appears to be 25&ndash;50 translations per year
        from academic and specialist publishers alone. The true rate including trade publishers is likely still 80&ndash;150 per year.
      </p>

      <h2>What This Tells Us</h2>
      <p><strong>1. The medieval surplus.</strong> Medieval Latin is the largest era by unique works translated (738), but most only appear once. Classical works get re-done every few years. There is enormous untapped material in the medieval period.</p>
      <p><strong>2. Translation is accelerating.</strong> The rate roughly doubled from 1978 to 2006. Academic series like I Tatti Renaissance Library and Dumbarton Oaks Medieval Library are systematically working through previously untranslated texts.</p>
      <p><strong>3. The canon is narrow.</strong> Of 2,037 unique works, the top 15 most-retranslated account for a disproportionate share of activity. The long tail of one-time translations is where real discovery happens.</p>

      <h2>Search the Dataset</h2>
      <p>
        Search all 7,542 translations by author, title, translator, or publisher. Filter by era to explore what&apos;s been translated from each period.
      </p>
      <SearchBox />

      <h2>Download the Data</h2>
      <p>
        The full dataset is available as a CSV with 7,542 records including source, series, author, title, translator,
        publication year, publisher, country, estimated original composition date, era, and canonical work identifiers.
      </p>
      <p style={{ margin: '24px 0' }}>
        <a
          href="/latin_translations_master.csv"
          download
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#9e4a3a',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Download CSV (7,542 records)
        </a>
      </p>
      <p style={{ fontSize: '14px', color: '#888' }}>
        <strong>Sources:</strong> <a href="https://www.unesco.org/xtrans/bsform.aspx" style={{ color: '#9e4a3a', textDecoration: 'none' }}>UNESCO Index Translationum</a> (1979&ndash;2009, 3,191 records),
        Open Library API (1800&ndash;1978, 2,524 records),
        Internet Archive API (1800&ndash;1978, 472 records),
        Loeb Classical Library full catalog (89 records),
        Harvard University Press (I Tatti, DOML), Cambridge UP, Routledge, Brill, CUA Press, Paulist Press,
        De Gruyter/Toronto UP, Hackett, Penguin, OUP, Liverpool UP (Translated Texts for Historians),
        Cistercian Publications/Liturgical Press, PIMS (Toronto), Chicago UP, Columbia UP, JHU Press,
        Bolchazy-Carducci, Dover, Notre Dame UP, New City Press (Works of Saint Augustine),
        Cazimi Press, Golden Hoard Press, Ibis Press/Weiser, Magnum Opus Hermetic Sourceworks,
        Renaissance Astrology Press, AFA, Project Hindsight/ARHAT, Shepheard-Walwyn, and other specialist publishers.
        Pre-1979 records sourced from library catalog APIs (not LLM-generated); some noise may remain.
        Original composition dates and canonical work identifiers estimated via LLM classification.
      </p>
    </BlogLayout>
  );
}
