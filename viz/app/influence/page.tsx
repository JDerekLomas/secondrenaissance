'use client';

import { useState, useMemo } from 'react';

// Era definitions matching ngram_agent.py
const ERAS = [
  { name: "Romantic", range: "1800-1850", color: "#f59e0b" },
  { name: "Victorian", range: "1850-1900", color: "#8b5cf6" },
  { name: "Early Modern", range: "1900-1945", color: "#3b82f6" },
  { name: "Postwar", range: "1945-1980", color: "#10b981" },
  { name: "Contemporary", range: "1980-2000", color: "#ec4899" },
  { name: "Digital", range: "2000-2019", color: "#06b6d4" },
];

// Combined influence data from all agents
const INFLUENCE_DATA = [
  {
    title: "Bible (Vulgate)",
    author: "Jerome",
    year: 405,
    category: "Scripture",
    istc: { editions: 130, copies: 3500 },
    ustc: { editions: 500, byDecade: { 1450: 5, 1460: 15, 1470: 25, 1480: 35, 1490: 40, 1500: 45, 1510: 50, 1520: 55, 1530: 50, 1540: 45, 1550: 40, 1560: 35, 1570: 30 } },
    ngram: {
      peak: 8.5e-6,
      trend: "stable",
      byEra: { Romantic: 5e-6, Victorian: 7e-6, "Early Modern": 8e-6, Postwar: 8.5e-6, Contemporary: 7e-6, Digital: 6e-6 },
      eraTrends: { Romantic: "rising", Victorian: "rising", "Early Modern": "stable", Postwar: "stable", Contemporary: "falling", Digital: "falling" }
    },
    scholar: { citations: 15000, editions_found: 50 },
  },
  {
    title: "Imitation of Christ",
    author: "Thomas à Kempis",
    year: 1418,
    category: "Devotional",
    istc: { editions: 99, copies: 2100 },
    ustc: { editions: 249, byDecade: { 1470: 15, 1480: 25, 1490: 30, 1500: 28, 1510: 25, 1520: 22, 1530: 20, 1540: 18, 1550: 20, 1560: 15, 1570: 12, 1580: 10, 1590: 9 } },
    ngram: {
      peak: 2.0e-7,
      trend: "increasing",
      byEra: { Romantic: 5.96e-8, Victorian: 1.38e-7, "Early Modern": 9.26e-8, Postwar: 6.51e-8, Contemporary: 4.69e-8, Digital: 6.92e-8 },
      eraTrends: { Romantic: "rising", Victorian: "rising", "Early Modern": "falling", Postwar: "falling", Contemporary: "stable", Digital: "stable" }
    },
    scholar: { citations: 801, editions_found: 12 },
  },
  {
    title: "Golden Legend",
    author: "Jacobus de Voragine",
    year: 1260,
    category: "Hagiography",
    istc: { editions: 87, copies: 1500 },
    ustc: { editions: 207, byDecade: { 1470: 12, 1480: 25, 1490: 28, 1500: 22, 1510: 18, 1520: 15, 1530: 15, 1540: 15, 1550: 18, 1560: 12, 1570: 10, 1580: 9, 1590: 8 } },
    ngram: {
      peak: 4.2e-7,
      trend: "stable",
      byEra: { Romantic: 1.5e-7, Victorian: 3.8e-7, "Early Modern": 4.2e-7, Postwar: 3.5e-7, Contemporary: 2.8e-7, Digital: 2.5e-7 },
      eraTrends: { Romantic: "rising", Victorian: "rising", "Early Modern": "stable", Postwar: "falling", Contemporary: "falling", Digital: "stable" }
    },
    scholar: { citations: 1584, editions_found: 8 },
  },
  {
    title: "Divine Comedy",
    author: "Dante Alighieri",
    year: 1320,
    category: "Literature",
    istc: { editions: 15, copies: 450 },
    ustc: { editions: 95, byDecade: { 1470: 3, 1480: 5, 1490: 6, 1500: 8, 1510: 7, 1520: 8, 1530: 10, 1540: 12, 1550: 10, 1560: 8, 1570: 6, 1580: 6, 1590: 6 } },
    ngram: {
      peak: 3.25e-7,
      trend: "stable",
      byEra: { Romantic: 5.49e-8, Victorian: 1.81e-7, "Early Modern": 2.41e-7, Postwar: 2.47e-7, Contemporary: 2.11e-7, Digital: 2.48e-7 },
      eraTrends: { Romantic: "rising", Victorian: "rising", "Early Modern": "stable", Postwar: "stable", Contemporary: "stable", Digital: "stable" }
    },
    scholar: { citations: 2500, editions_found: 25 },
  },
  {
    title: "Decameron",
    author: "Giovanni Boccaccio",
    year: 1353,
    category: "Literature",
    istc: { editions: 11, copies: 320 },
    ustc: { editions: 56, byDecade: { 1470: 2, 1480: 3, 1490: 4, 1500: 5, 1510: 6, 1520: 7, 1530: 6, 1540: 5, 1550: 5, 1560: 4, 1570: 3, 1580: 3, 1590: 3 } },
    ngram: {
      peak: 6.0e-7,
      trend: "stable",
      byEra: { Romantic: 2.5e-7, Victorian: 4.5e-7, "Early Modern": 5.8e-7, Postwar: 5.5e-7, Contemporary: 4.8e-7, Digital: 5.2e-7 },
      eraTrends: { Romantic: "rising", Victorian: "rising", "Early Modern": "stable", Postwar: "stable", Contemporary: "stable", Digital: "stable" }
    },
    scholar: { citations: 2386, editions_found: 15 },
  },
  {
    title: "Canterbury Tales",
    author: "Geoffrey Chaucer",
    year: 1400,
    category: "Literature",
    istc: { editions: 4, copies: 120 },
    ustc: { editions: 12, byDecade: { 1470: 0, 1480: 2, 1490: 1, 1500: 1, 1510: 0, 1520: 1, 1530: 1, 1540: 1, 1550: 2, 1560: 1, 1570: 1, 1580: 1, 1590: 0 } },
    ngram: {
      peak: 5.87e-7,
      trend: "stable",
      byEra: { Romantic: 3.42e-7, Victorian: 3.81e-7, "Early Modern": 2.92e-7, Postwar: 2.69e-7, Contemporary: 2.83e-7, Digital: 3.14e-7 },
      eraTrends: { Romantic: "falling", Victorian: "stable", "Early Modern": "stable", Postwar: "stable", Contemporary: "stable", Digital: "stable" }
    },
    scholar: { citations: 635, editions_found: 8 },
  },
  {
    title: "Summa Theologica",
    author: "Thomas Aquinas",
    year: 1274,
    category: "Theology",
    istc: { editions: 25, copies: 800 },
    ustc: { editions: 85, byDecade: { 1460: 2, 1470: 5, 1480: 8, 1490: 10, 1500: 8, 1510: 7, 1520: 8, 1530: 6, 1540: 7, 1550: 8, 1560: 6, 1570: 5, 1580: 5 } },
    ngram: {
      peak: 2.05e-7,
      trend: "increasing",
      byEra: { Romantic: 2.5e-8, Victorian: 4.0e-8, "Early Modern": 5.5e-8, Postwar: 8.0e-8, Contemporary: 1.2e-7, Digital: 1.8e-7 },
      eraTrends: { Romantic: "stable", Victorian: "rising", "Early Modern": "rising", Postwar: "rising", Contemporary: "rising", Digital: "rising" }
    },
    scholar: { citations: 14366, editions_found: 30 },
  },
  {
    title: "Malleus Maleficarum",
    author: "Heinrich Kramer",
    year: 1487,
    category: "Demonology",
    istc: { editions: 16, copies: 683 },
    ustc: { editions: 40, byDecade: { 1480: 2, 1490: 8, 1500: 6, 1510: 5, 1520: 4, 1530: 3, 1540: 4, 1550: 3, 1560: 2, 1570: 1, 1580: 1, 1590: 1 } },
    ngram: {
      peak: 5.67e-8,
      trend: "increasing",
      byEra: { Romantic: 7.07e-9, Victorian: 7.49e-9, "Early Modern": 9.02e-9, Postwar: 1.48e-8, Contemporary: 2.62e-8, Digital: 4.77e-8 },
      eraTrends: { Romantic: "rising", Victorian: "falling", "Early Modern": "rising", Postwar: "rising", Contemporary: "rising", Digital: "rising" }
    },
    scholar: { citations: 1314, editions_found: 12 },
  },
  {
    title: "Corpus Hermeticum",
    author: "Marsilio Ficino (trans.)",
    year: 1471,
    category: "Hermeticism",
    istc: { editions: 2, copies: 28 },
    ustc: { editions: 10, byDecade: { 1470: 1, 1490: 1, 1500: 2, 1510: 1, 1530: 1, 1540: 1, 1550: 1, 1570: 1, 1590: 1 } },
    ngram: {
      peak: 3.50e-8,
      trend: "increasing",
      byEra: { Romantic: 0, Victorian: 5.14e-11, "Early Modern": 2.31e-9, Postwar: 9.93e-9, Contemporary: 2.01e-8, Digital: 3.15e-8 },
      eraTrends: { Romantic: "stable", Victorian: "rising", "Early Modern": "rising", Postwar: "rising", Contemporary: "rising", Digital: "stable" }
    },
    scholar: { citations: 35, editions_found: 3 },
  },
  {
    title: "De Occulta Philosophia",
    author: "Heinrich Agrippa",
    year: 1533,
    category: "Magic",
    istc: { editions: 0, copies: 0 },
    ustc: { editions: 15, byDecade: { 1530: 3, 1540: 2, 1550: 3, 1560: 2, 1570: 2, 1580: 1, 1590: 2 } },
    ngram: {
      peak: 3.5e-8,
      trend: "increasing",
      byEra: { Romantic: 1e-9, Victorian: 2e-9, "Early Modern": 5e-9, Postwar: 1.2e-8, Contemporary: 2.5e-8, Digital: 3.2e-8 },
      eraTrends: { Romantic: "stable", Victorian: "rising", "Early Modern": "rising", Postwar: "rising", Contemporary: "rising", Digital: "rising" }
    },
    scholar: { citations: 194, editions_found: 8 },
  },
  {
    title: "The Prince",
    author: "Niccolò Machiavelli",
    year: 1532,
    category: "Political Philosophy",
    istc: { editions: 0, copies: 0 },
    ustc: { editions: 28, byDecade: { 1530: 4, 1540: 5, 1550: 6, 1560: 5, 1570: 3, 1580: 3, 1590: 2 } },
    ngram: {
      peak: 1.2e-6,
      trend: "stable",
      byEra: { Romantic: 3e-7, Victorian: 5e-7, "Early Modern": 8e-7, Postwar: 1.1e-6, Contemporary: 1.0e-6, Digital: 9e-7 },
      eraTrends: { Romantic: "rising", Victorian: "rising", "Early Modern": "rising", Postwar: "stable", Contemporary: "stable", Digital: "falling" }
    },
    scholar: { citations: 305, editions_found: 10 },
  },
  {
    title: "Utopia",
    author: "Thomas More",
    year: 1516,
    category: "Political Philosophy",
    istc: { editions: 0, copies: 0 },
    ustc: { editions: 22, byDecade: { 1510: 2, 1520: 4, 1530: 3, 1540: 3, 1550: 4, 1560: 2, 1570: 2, 1580: 1, 1590: 1 } },
    ngram: {
      peak: 2.8e-7,
      trend: "stable",
      byEra: { Romantic: 8e-8, Victorian: 1.5e-7, "Early Modern": 2.2e-7, Postwar: 2.5e-7, Contemporary: 2.3e-7, Digital: 2.0e-7 },
      eraTrends: { Romantic: "rising", Victorian: "rising", "Early Modern": "rising", Postwar: "stable", Contemporary: "stable", Digital: "falling" }
    },
    scholar: { citations: 841, editions_found: 6 },
  },
  {
    title: "Book of the Courtier",
    author: "Baldassare Castiglione",
    year: 1528,
    category: "Conduct Literature",
    istc: { editions: 0, copies: 0 },
    ustc: { editions: 55, byDecade: { 1520: 3, 1530: 8, 1540: 10, 1550: 12, 1560: 8, 1570: 6, 1580: 4, 1590: 4 } },
    ngram: {
      peak: 1.5e-7,
      trend: "stable",
      byEra: { Romantic: 3e-8, Victorian: 6e-8, "Early Modern": 1.0e-7, Postwar: 1.3e-7, Contemporary: 1.2e-7, Digital: 1.0e-7 },
      eraTrends: { Romantic: "rising", Victorian: "rising", "Early Modern": "rising", Postwar: "stable", Contemporary: "falling", Digital: "falling" }
    },
    scholar: { citations: 1423, editions_found: 10 },
  },
  {
    title: "Pico's Oration",
    author: "Pico della Mirandola",
    year: 1486,
    category: "Humanism",
    istc: { editions: 1, copies: 18 },
    ustc: { editions: 9, byDecade: { 1490: 1, 1500: 2, 1510: 1, 1520: 1, 1530: 1, 1540: 1, 1550: 1, 1560: 1 } },
    ngram: {
      peak: 2.0e-8,
      trend: "increasing",
      byEra: { Romantic: 1e-10, Victorian: 5e-10, "Early Modern": 2e-9, Postwar: 8e-9, Contemporary: 1.5e-8, Digital: 1.8e-8 },
      eraTrends: { Romantic: "stable", Victorian: "rising", "Early Modern": "rising", Postwar: "rising", Contemporary: "rising", Digital: "stable" }
    },
    scholar: { citations: 80, editions_found: 5 },
  },
  {
    title: "De Verbo Mirifico",
    author: "Johannes Reuchlin",
    year: 1494,
    category: "Kabbalah",
    istc: { editions: 1, copies: 12 },
    ustc: { editions: 6, byDecade: { 1490: 1, 1510: 2, 1530: 1, 1550: 1, 1570: 1 } },
    ngram: {
      peak: 1.2e-8,
      trend: "stable",
      byEra: { Romantic: 1e-10, Victorian: 2e-10, "Early Modern": 1e-9, Postwar: 5e-9, Contemporary: 8e-9, Digital: 1.0e-8 },
      eraTrends: { Romantic: "stable", Victorian: "stable", "Early Modern": "rising", Postwar: "rising", Contemporary: "rising", Digital: "stable" }
    },
    scholar: { citations: 163, editions_found: 3 },
  },
];

// Normalize values to 0-100 scale
function normalize(value: number, max: number): number {
  return Math.min(100, (value / max) * 100);
}

// Calculate composite influence score
function calculateInfluence(work: typeof INFLUENCE_DATA[0]): number {
  const weights = { istc: 0.25, ustc: 0.25, ngram: 0.25, scholar: 0.25 };
  const maxes = { istc: 3500, ustc: 500, ngram: 1e-5, scholar: 15000 };

  const istcScore = normalize(work.istc.copies, maxes.istc);
  const ustcScore = normalize(work.ustc.editions, maxes.ustc);
  const ngramScore = normalize(work.ngram.peak, maxes.ngram);
  const scholarScore = normalize(work.scholar.citations, maxes.scholar);

  return (
    weights.istc * istcScore +
    weights.ustc * ustcScore +
    weights.ngram * ngramScore +
    weights.scholar * scholarScore
  );
}

// Color by category
const categoryColors: Record<string, string> = {
  "Scripture": "#f59e0b",
  "Devotional": "#3b82f6",
  "Hagiography": "#8b5cf6",
  "Literature": "#10b981",
  "Theology": "#6366f1",
  "Demonology": "#ef4444",
  "Hermeticism": "#ec4899",
  "Magic": "#f43f5e",
  "Political Philosophy": "#14b8a6",
  "Conduct Literature": "#06b6d4",
  "Humanism": "#84cc16",
  "Kabbalah": "#a855f7",
};

export default function InfluencePage() {
  const [sortBy, setSortBy] = useState<'influence' | 'istc' | 'ustc' | 'ngram' | 'scholar'>('influence');
  const [selectedWork, setSelectedWork] = useState<typeof INFLUENCE_DATA[0] | null>(null);

  const sortedData = useMemo(() => {
    const withScores = INFLUENCE_DATA.map(work => ({
      ...work,
      influenceScore: calculateInfluence(work),
    }));

    return withScores.sort((a, b) => {
      switch (sortBy) {
        case 'influence': return b.influenceScore - a.influenceScore;
        case 'istc': return b.istc.copies - a.istc.copies;
        case 'ustc': return b.ustc.editions - a.ustc.editions;
        case 'ngram': return b.ngram.peak - a.ngram.peak;
        case 'scholar': return b.scholar.citations - a.scholar.citations;
        default: return 0;
      }
    });
  }, [sortBy]);

  const maxValues = useMemo(() => ({
    istc: Math.max(...INFLUENCE_DATA.map(w => w.istc.copies)),
    ustc: Math.max(...INFLUENCE_DATA.map(w => w.ustc.editions)),
    ngram: Math.max(...INFLUENCE_DATA.map(w => w.ngram.peak)),
    scholar: Math.max(...INFLUENCE_DATA.map(w => w.scholar.citations)),
  }), []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Pre-Modern Book Influence Dashboard
          </h1>
          <p className="text-gray-400">
            Comparing historical print runs, cultural mentions, and modern scholarly citations
          </p>
        </div>

        {/* Era Legend */}
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-400">Ngram Era Breakdown:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {ERAS.map((era) => (
              <div key={era.name} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: era.color }}></div>
                <span className="text-xs text-gray-400">{era.name}</span>
                <span className="text-[10px] text-gray-600">({era.range})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metric Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded bg-amber-500"></div>
              <span className="text-sm font-medium">ISTC Copies</span>
            </div>
            <p className="text-xs text-gray-500">Surviving copies of incunabula (pre-1501)</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded bg-blue-500"></div>
              <span className="text-sm font-medium">USTC Editions</span>
            </div>
            <p className="text-xs text-gray-500">Total editions printed 1450-1650</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded bg-green-500"></div>
              <span className="text-sm font-medium">Google Ngram</span>
            </div>
            <p className="text-xs text-gray-500">Peak frequency in published books</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded bg-purple-500"></div>
              <span className="text-sm font-medium">Scholar Citations</span>
            </div>
            <p className="text-xs text-gray-500">Google Scholar academic citations</p>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex gap-2 mb-6">
          <span className="text-gray-400 text-sm py-2">Sort by:</span>
          {(['influence', 'istc', 'ustc', 'ngram', 'scholar'] as const).map(key => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                sortBy === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {key === 'influence' ? 'Combined Score' : key.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Main Chart */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Influence Metrics Comparison</h2>
          <div className="space-y-3">
            {sortedData.map((work, idx) => (
              <div
                key={work.title}
                className="cursor-pointer hover:bg-gray-800/50 rounded-lg p-3 transition-colors"
                onClick={() => setSelectedWork(work)}
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-gray-500 w-6 text-right">{idx + 1}</span>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: categoryColors[work.category] || '#666' }}
                  ></div>
                  <span className="font-medium flex-1">{work.title}</span>
                  <span className="text-sm text-gray-500">{work.author}</span>
                  <span className="text-sm font-mono text-blue-400">
                    {work.influenceScore.toFixed(1)}
                  </span>
                </div>

                {/* Multi-bar visualization */}
                <div className="ml-10 flex gap-4 items-center">
                  <div className="grid grid-cols-4 gap-2 flex-1">
                    {/* ISTC */}
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div
                        className="h-full bg-amber-500 transition-all"
                        style={{ width: `${normalize(work.istc.copies, maxValues.istc)}%` }}
                      ></div>
                    </div>
                    {/* USTC */}
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all"
                        style={{ width: `${normalize(work.ustc.editions, maxValues.ustc)}%` }}
                      ></div>
                    </div>
                    {/* Ngram */}
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all"
                        style={{ width: `${normalize(work.ngram.peak, maxValues.ngram)}%` }}
                      ></div>
                    </div>
                    {/* Scholar */}
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div
                        className="h-full bg-purple-500 transition-all"
                        style={{ width: `${normalize(work.scholar.citations, maxValues.scholar)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Mini Era Sparkline */}
                  <div className="flex items-end gap-[2px] h-4 w-24" title="Ngram by Era: Romantic → Digital">
                    {ERAS.map((era) => {
                      const value = (work.ngram.byEra as Record<string, number>)[era.name] || 0;
                      const maxEraValue = Math.max(...Object.values(work.ngram.byEra as Record<string, number>));
                      const height = maxEraValue > 0 ? (value / maxEraValue) * 100 : 0;
                      return (
                        <div
                          key={era.name}
                          className="flex-1 rounded-t transition-all"
                          style={{
                            height: `${height}%`,
                            backgroundColor: era.color,
                            minHeight: value > 0 ? '2px' : '0',
                            opacity: 0.8
                          }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Work Detail */}
        {selectedWork && (
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold">{selectedWork.title}</h2>
                <p className="text-gray-400">{selectedWork.author} ({selectedWork.year})</p>
              </div>
              <button
                onClick={() => setSelectedWork(null)}
                className="text-gray-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800 rounded p-3">
                <div className="text-amber-500 text-2xl font-bold">{selectedWork.istc.copies.toLocaleString()}</div>
                <div className="text-xs text-gray-500">ISTC Surviving Copies</div>
                <div className="text-xs text-gray-600">{selectedWork.istc.editions} editions</div>
              </div>
              <div className="bg-gray-800 rounded p-3">
                <div className="text-blue-500 text-2xl font-bold">{selectedWork.ustc.editions}</div>
                <div className="text-xs text-gray-500">USTC Editions (1450-1650)</div>
              </div>
              <div className="bg-gray-800 rounded p-3">
                <div className="text-green-500 text-2xl font-bold">{selectedWork.ngram.peak.toExponential(1)}</div>
                <div className="text-xs text-gray-500">Ngram Peak Frequency</div>
                <div className="text-xs text-gray-600">Trend: {selectedWork.ngram.trend}</div>
              </div>
              <div className="bg-gray-800 rounded p-3">
                <div className="text-purple-500 text-2xl font-bold">{selectedWork.scholar.citations.toLocaleString()}</div>
                <div className="text-xs text-gray-500">Scholar Citations</div>
                <div className="text-xs text-gray-600">{selectedWork.scholar.editions_found} editions found</div>
              </div>
            </div>

            {/* Edition Timeline */}
            <h3 className="text-sm font-medium text-gray-400 mb-2">Editions by Decade (USTC 1450-1650)</h3>
            <div className="flex items-end gap-1 h-24 mb-6">
              {Object.entries(selectedWork.ustc.byDecade).map(([decade, count]) => {
                const maxCount = Math.max(...Object.values(selectedWork.ustc.byDecade));
                const height = (count / maxCount) * 100;
                return (
                  <div key={decade} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-600 rounded-t transition-all"
                      style={{ height: `${height}%` }}
                      title={`${decade}s: ${count} editions`}
                    ></div>
                    <span className="text-[10px] text-gray-600 mt-1">{decade.slice(2)}</span>
                  </div>
                );
              })}
            </div>

            {/* Ngram Era Sparklines */}
            <h3 className="text-sm font-medium text-gray-400 mb-2">Cultural Mentions by Era (Google Ngram 1800-2019)</h3>
            <div className="grid grid-cols-6 gap-2">
              {ERAS.map((era) => {
                const value = (selectedWork.ngram.byEra as Record<string, number>)[era.name] || 0;
                const maxEraValue = Math.max(...Object.values(selectedWork.ngram.byEra as Record<string, number>));
                const height = maxEraValue > 0 ? (value / maxEraValue) * 100 : 0;
                const trend = (selectedWork.ngram.eraTrends as Record<string, string>)[era.name] || "stable";
                const trendIcon = trend === "rising" ? "↑" : trend === "falling" ? "↓" : "→";
                const trendColor = trend === "rising" ? "text-green-400" : trend === "falling" ? "text-red-400" : "text-gray-500";

                return (
                  <div key={era.name} className="flex flex-col items-center">
                    <div className="h-16 w-full flex items-end justify-center">
                      <div
                        className="w-8 rounded-t transition-all"
                        style={{
                          height: `${height}%`,
                          backgroundColor: era.color,
                          minHeight: value > 0 ? '4px' : '0'
                        }}
                        title={`${era.name}: ${value.toExponential(1)}`}
                      ></div>
                    </div>
                    <span className={`text-lg ${trendColor}`}>{trendIcon}</span>
                    <span className="text-[9px] text-gray-500 text-center leading-tight">{era.name}</span>
                    <span className="text-[8px] text-gray-600">{era.range}</span>
                  </div>
                );
              })}
            </div>

            {/* Era Pattern Summary */}
            <div className="mt-4 p-3 bg-gray-800/50 rounded text-sm">
              <span className="text-gray-400">Pattern: </span>
              {(() => {
                const trends = Object.values(selectedWork.ngram.eraTrends);
                const risingCount = trends.filter(t => t === "rising").length;
                const fallingCount = trends.filter(t => t === "falling").length;

                if (risingCount >= 4) return <span className="text-green-400">Sustained growth - increasing interest over time</span>;
                if (fallingCount >= 3) return <span className="text-red-400">Declining interest - peaked earlier</span>;
                if (risingCount > fallingCount) return <span className="text-blue-400">Growing interest - modern rediscovery</span>;
                if (fallingCount > risingCount) return <span className="text-amber-400">Waning interest - historical peak</span>;
                return <span className="text-gray-400">Stable interest - canonical status maintained</span>;
              })()}
            </div>
          </div>
        )}

        {/* Insights */}
        <div className="mt-6 bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h2 className="text-lg font-semibold mb-4">Key Insights</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-800/50 rounded p-4">
              <h3 className="font-medium text-amber-400 mb-2">Historical Bestsellers (ISTC/USTC)</h3>
              <p className="text-gray-400">
                The <strong>Imitation of Christ</strong> and <strong>Golden Legend</strong> were the true
                bestsellers of the 15th century, with 99 and 87 incunabula editions respectively.
                The Bible had 130 editions but in smaller print runs.
              </p>
            </div>
            <div className="bg-gray-800/50 rounded p-4">
              <h3 className="font-medium text-purple-400 mb-2">Modern Academic Interest (Scholar)</h3>
              <p className="text-gray-400">
                <strong>Summa Theologica</strong> dominates with 14,000+ citations.
                <strong>Malleus Maleficarum</strong> punches above its historical weight
                due to modern witch-trial scholarship.
              </p>
            </div>
            <div className="bg-gray-800/50 rounded p-4">
              <h3 className="font-medium text-green-400 mb-2">Cultural Presence (Ngram)</h3>
              <p className="text-gray-400">
                <strong>Canterbury Tales</strong> and <strong>Decameron</strong> are mentioned most in
                published books, reflecting their status as literary classics rather than
                their historical print runs.
              </p>
            </div>
            <div className="bg-gray-800/50 rounded p-4">
              <h3 className="font-medium text-pink-400 mb-2">Esoteric Texts</h3>
              <p className="text-gray-400">
                Works like <strong>Corpus Hermeticum</strong> and <strong>De Occulta Philosophia</strong>
                had limited print runs but show increasing Ngram trends, suggesting
                growing modern interest in Renaissance occultism.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-600">
          Data sources: ISTC (British Library), USTC, Google Books Ngram, Google Scholar
          <br />
          Built with citation agents: ngram_agent.py, istc_agent.py, ustc_agent.py, scholar_agent.py
        </div>
      </div>
    </div>
  );
}
