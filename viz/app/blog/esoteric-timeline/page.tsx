"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

interface TimelineData {
  [year: string]: {
    [tradition: string]: number;
  };
}

interface RiverInfo {
  color: string;
  description: string;
}

const rivers: Record<string, RiverInfo> = {
  hermetica: { color: "#9b59b6", description: "Corpus Hermeticum & Egyptian wisdom" },
  alchemy: { color: "#f1c40f", description: "Transmutation & the philosopher's stone" },
  mysticism: { color: "#3498db", description: "Christian contemplative tradition" },
  rosicrucianism: { color: "#e74c3c", description: "The Rosicrucian Brotherhood" },
  kabbalah: { color: "#2ecc71", description: "Jewish mysticism & Tree of Life" },
  neoplatonism: { color: "#1abc9c", description: "Platonic philosophy & theurgy" },
  magic: { color: "#8e44ad", description: "Ceremonial & natural magic" },
  paracelsianism: { color: "#e67e22", description: "Paracelsian medicine & philosophy" },
  theosophy: { color: "#34495e", description: "Jacob Boehme & followers" }
};

// Key milestones in esoteric publishing
const milestones: Record<string, { title: string; description: string; traditions: string[] }> = {
  "1463": {
    title: "Ficino Translates the Corpus Hermeticum",
    description: "Marsilio Ficino completes his Latin translation of the Corpus Hermeticum for Cosimo de' Medici, sparking the Renaissance revival of Hermeticism.",
    traditions: ["hermetica", "neoplatonism"]
  },
  "1486": {
    title: "Pico della Mirandola's 900 Theses",
    description: "Pico publishes his syncretic theses combining Kabbalah, Hermeticism, and Christian theology—the birth of Christian Kabbalah.",
    traditions: ["kabbalah", "hermetica", "neoplatonism"]
  },
  "1510": {
    title: "Reuchlin's De Arte Cabalistica",
    description: "Johannes Reuchlin's systematic introduction of Kabbalah to Christian Europe, defending Jewish books from destruction.",
    traditions: ["kabbalah"]
  },
  "1531": {
    title: "Agrippa's De Occulta Philosophia",
    description: "Heinrich Cornelius Agrippa publishes his encyclopedic synthesis of Renaissance magic, natural philosophy, and Kabbalah.",
    traditions: ["magic", "kabbalah", "hermetica"]
  },
  "1541": {
    title: "Paracelsus Dies",
    description: "The death of Paracelsus triggers decades of posthumous publications. His iatrochemistry challenges Galenic medicine.",
    traditions: ["paracelsianism", "alchemy"]
  },
  "1564": {
    title: "Dee's Monas Hieroglyphica",
    description: "John Dee publishes his cryptic symbol encoding cosmic truths—a touchstone for later alchemists and Rosicrucians.",
    traditions: ["alchemy", "hermetica", "rosicrucianism"]
  },
  "1591": {
    title: "Patrizi's Nova de Universis Philosophia",
    description: "Francesco Patrizi presents his Hermetic cosmology to Pope Gregory XIV, integrating Zoroaster, Orpheus, and Hermes Trismegistus.",
    traditions: ["hermetica", "neoplatonism"]
  },
  "1614": {
    title: "The Fama Fraternitatis",
    description: "The first Rosicrucian manifesto appears, describing a secret brotherhood of Christian adepts. It ignites a publishing frenzy.",
    traditions: ["rosicrucianism"]
  },
  "1617": {
    title: "Peak Rosicrucian Furor",
    description: "The Rosicrucian controversy reaches its height: 28 publications this year debate whether the Brotherhood exists.",
    traditions: ["rosicrucianism", "alchemy"]
  },
  "1618": {
    title: "Fludd's Utriusque Cosmi Historia",
    description: "Robert Fludd begins publishing his massive illustrated cosmological encyclopedia defending the Rosicrucians.",
    traditions: ["rosicrucianism", "hermetica"]
  },
  "1623": {
    title: "The Rosicrucian Scare in Paris",
    description: "Placards announce the Rosicrucians have arrived in Paris. Panic and fascination grip the city.",
    traditions: ["rosicrucianism"]
  },
  "1642": {
    title: "Boehme's Works Spread",
    description: "Jacob Boehme's theosophical works begin circulating widely after his death, influencing mysticism across Europe.",
    traditions: ["theosophy", "mysticism"]
  },
  "1652": {
    title: "Kircher's Oedipus Aegyptiacus",
    description: "Athanasius Kircher publishes his monumental attempt to decode Egyptian hieroglyphics through a Hermetic lens.",
    traditions: ["hermetica"]
  },
  "1682": {
    title: "Boehme's Complete Works Published",
    description: "A major edition of Boehme's works appears, triggering a surge in theosophy and mystical publishing.",
    traditions: ["theosophy", "mysticism"]
  }
};

export default function EsotericTimelinePage() {
  const [timelineData, setTimelineData] = useState<TimelineData>({});
  const [activeYear, setActiveYear] = useState<string>("1469");
  const [isLoaded, setIsLoaded] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/rivers_of_life.json")
      .then(res => res.json())
      .then(data => {
        setTimelineData(data.timeline || {});
        setIsLoaded(true);
      })
      .catch(err => console.error("Failed to load timeline:", err));
  }, []);

  const years = Object.keys(timelineData).sort();
  const startYear = 1469;
  const endYear = 1750;

  // Calculate totals for each year
  const getYearTotal = (year: string) => {
    const yearData = timelineData[year];
    if (!yearData) return 0;
    return Object.values(yearData).reduce((sum, count) => sum + count, 0);
  };

  // Get max total for scaling
  const maxTotal = Math.max(...years.map(y => getYearTotal(y)), 1);

  // Handle scroll to update active year
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const sections = timelineRef.current.querySelectorAll("[data-year]");
      let currentYear = "1469";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          currentYear = section.getAttribute("data-year") || currentYear;
        }
      });

      setActiveYear(currentYear);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-slate-400">Loading timeline...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Fixed sidebar with year indicator */}
      <div className="fixed left-0 top-0 h-full w-24 bg-slate-900/80 backdrop-blur-sm border-r border-slate-800 z-50 hidden lg:flex flex-col items-center justify-center">
        <div className="text-6xl font-bold text-violet-400 writing-mode-vertical" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
          {activeYear}
        </div>
        <div className="mt-4 text-xs text-slate-500 text-center">
          scroll<br />to<br />explore
        </div>
      </div>

      {/* Header */}
      <header className="relative border-b border-slate-800 lg:ml-24">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-8 py-16">
          <Link href="/blog" className="text-violet-400 hover:underline text-sm">
            &larr; Back to articles
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mt-8 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Rivers of Esoteric Life
          </h1>
          <p className="text-xl text-slate-300 mt-4 max-w-2xl">
            A visual journey through 280 years of occult, mystical, and hermetic publishing in early modern Europe (1469–1750)
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {Object.entries(rivers).map(([key, info]) => (
              <div key={key} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: info.color }} />
                <span className="text-slate-400 capitalize">{key}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Timeline */}
      <main ref={timelineRef} className="lg:ml-24">
        {/* Intro section */}
        <section className="max-w-4xl mx-auto px-8 py-16 border-b border-slate-800/50">
          <p className="text-lg text-slate-300 leading-relaxed">
            When Marsilio Ficino translated the <em>Corpus Hermeticum</em> in 1463, he believed he was recovering wisdom older than Moses.
            This sparked a torrent of esoteric publishing that would flow for centuries—books on alchemy, magic, Kabbalah,
            and mysticism that shaped the intellectual underground of early modern Europe.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed mt-4">
            Scroll down to trace these interweaving currents of hidden knowledge, from the Florentine Renaissance
            through the Rosicrucian furor to the theosophical awakening of the late 17th century.
          </p>
        </section>

        {/* Timeline decades */}
        {Array.from({ length: Math.ceil((endYear - startYear) / 10) }, (_, i) => {
          const decadeStart = startYear + i * 10;
          const decadeEnd = Math.min(decadeStart + 9, endYear);
          const decadeYears = years.filter(y => {
            const n = parseInt(y);
            return n >= decadeStart && n <= decadeEnd;
          });

          // Check for milestones in this decade
          const decadeMilestones = Object.entries(milestones).filter(([year]) => {
            const n = parseInt(year);
            return n >= decadeStart && n <= decadeEnd;
          });

          const decadeTotal = decadeYears.reduce((sum, y) => sum + getYearTotal(y), 0);

          return (
            <section
              key={decadeStart}
              data-year={decadeStart.toString()}
              className="border-b border-slate-800/30"
            >
              {/* Decade header */}
              <div className="max-w-4xl mx-auto px-8 pt-16 pb-8">
                <div className="flex items-baseline gap-4">
                  <h2 className="text-4xl font-bold text-white">{decadeStart}s</h2>
                  <span className="text-slate-500">{decadeTotal} publications</span>
                </div>
              </div>

              {/* Milestones */}
              {decadeMilestones.map(([year, milestone]) => (
                <div
                  key={year}
                  data-year={year}
                  className="max-w-4xl mx-auto px-8 py-8"
                >
                  <div className="relative pl-8 border-l-2 border-violet-500">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-violet-500" />
                    <div className="text-violet-400 font-mono text-sm mb-2">{year}</div>
                    <h3 className="text-2xl font-semibold text-white mb-3">{milestone.title}</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">{milestone.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {milestone.traditions.map(t => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full text-xs font-medium text-white/90"
                          style={{ backgroundColor: rivers[t]?.color || "#666" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Year bars visualization */}
              <div className="max-w-4xl mx-auto px-8 py-8">
                <div className="space-y-2">
                  {decadeYears.map(year => {
                    const yearData = timelineData[year];
                    if (!yearData) return null;
                    const total = getYearTotal(year);
                    const hasMilestone = milestones[year];

                    return (
                      <div key={year} className="group relative">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 text-right font-mono text-sm ${hasMilestone ? "text-violet-400 font-bold" : "text-slate-500"}`}>
                            {year}
                          </div>
                          <div className="flex-1 h-8 bg-slate-900 rounded overflow-hidden flex">
                            {Object.entries(rivers).map(([tradition, info]) => {
                              const count = yearData[tradition] || 0;
                              if (count === 0) return null;
                              const width = (count / maxTotal) * 100;
                              return (
                                <div
                                  key={tradition}
                                  className="h-full transition-all duration-300 group-hover:opacity-80"
                                  style={{
                                    width: `${width}%`,
                                    backgroundColor: info.color,
                                    minWidth: count > 0 ? "4px" : "0"
                                  }}
                                  title={`${tradition}: ${count}`}
                                />
                              );
                            })}
                          </div>
                          <div className="w-8 text-right text-sm text-slate-500 font-mono">
                            {total}
                          </div>
                        </div>

                        {/* Hover tooltip */}
                        <div className="absolute left-16 -top-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
                            <div className="text-white font-semibold mb-2">{year}</div>
                            <div className="space-y-1">
                              {Object.entries(yearData)
                                .sort((a, b) => b[1] - a[1])
                                .map(([tradition, count]) => (
                                  <div key={tradition} className="flex items-center gap-2 text-xs">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: rivers[tradition]?.color }} />
                                    <span className="text-slate-300 capitalize">{tradition}</span>
                                    <span className="text-slate-500 ml-auto">{count}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}

        {/* Conclusion */}
        <section className="max-w-4xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-white mb-6">The Hidden Curriculum</h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-4">
            This data reveals what conventional intellectual history often obscures: esoteric publishing was not marginal
            but constituted a significant portion of early modern print culture. The peaks around 1615–1620 (the Rosicrucian
            controversy) and 1680s (the Boehme revival) show how these &ldquo;underground&rdquo; ideas periodically erupted into
            mainstream discourse.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed mb-4">
            The interweaving of traditions is equally significant. Alchemy rarely appears alone—it flows alongside
            Hermeticism, Paracelsianism, and Christian mysticism. The Christian Kabbalists drew on Neoplatonism.
            The Rosicrucians synthesized them all.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed">
            Most of these works remain untranslated. The rivers still flow, waiting to be rediscovered.
          </p>
        </section>

        {/* Stats summary */}
        <section className="border-t border-slate-800 bg-slate-900/50">
          <div className="max-w-4xl mx-auto px-8 py-16">
            <h2 className="text-2xl font-semibold text-white mb-8">By the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {Object.entries(rivers).map(([tradition, info]) => {
                const total = years.reduce((sum, year) => {
                  return sum + (timelineData[year]?.[tradition] || 0);
                }, 0);
                return (
                  <div key={tradition} className="text-center">
                    <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: info.color }}>
                      <span className="text-white font-bold">{Math.round(total / 100) || "<1"}c</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{total}</div>
                    <div className="text-slate-400 capitalize">{tradition}</div>
                    <div className="text-xs text-slate-500 mt-1">{info.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="max-w-4xl mx-auto px-8 py-12 border-t border-slate-800">
          <div className="flex flex-wrap gap-8 justify-between items-center">
            <Link href="/blog" className="text-violet-400 hover:underline">
              &larr; Back to all articles
            </Link>
            <Link href="/roadmap" className="text-violet-400 hover:underline">
              Translation Roadmap &rarr;
            </Link>
          </div>
        </div>
      </main>

      <footer className="lg:ml-24 border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>
          Data from{" "}
          <a href="https://www.ustc.ac.uk/" className="text-violet-400 hover:underline" target="_blank" rel="noopener noreferrer">
            USTC
          </a>
          {" "}| Aligned with{" "}
          <a href="https://embassyofthefreemind.com/" className="text-yellow-400 hover:underline" target="_blank" rel="noopener noreferrer">
            BPH
          </a>
          {" "}collection themes
        </p>
      </footer>
    </div>
  );
}
