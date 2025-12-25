"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";

interface Work {
  id: number;
  author: string | null;
  title: string;
  year: number | null;
  category: string | null;
  ustc_editions: number;
  istc_id: string | null;
  istc_holdings: number;
  istc_digital_url: string | null;
  bph_holdings: number;
  modern_citations_est: string | null;
  key_modern_edition: string | null;
  key_modern_study: string | null;
  notes: string | null;
}

interface Holding {
  id: number;
  istc_id: string;
  institution: string;
  bib_author: string | null;
  bib_title: string | null;
  bib_year: number | null;
}

// Real Google Scholar citation counts (fetched via scholarly Python package, Dec 2024)
const GOOGLE_SCHOLAR_CITATIONS: Record<string, number> = {
  // Incunabula (pre-1501)
  "De vita libri tres": 24,
  "Corpus Hermeticum (Latin translation)": 35,
  "De Verbo Mirifico": 163,
  "Malleus Maleficarum": 1314,
  "De docta ignorantia": 20,
  "De magnis coniunctionibus": 0,
  "Ars Magna": 81,
  "Prognosticatio": 13,
  "Opera (Ficino translation)": 579,
  "Horologium sapientiae": 15,
  "Ordinall of Alchimy": 63,
  "Chiromantia": 13,
  "Flores astrologiae": 22,
  // Major Renaissance works
  "De Occulta Philosophia": 194,
  "De umbris idearum": 2,
  "La cena de le ceneri": 137,
  "Steganographia": 73,
  "Monas Hieroglyphica": 105,
  "Utriusque Cosmi Historia": 97,
  "Amphitheatrum Sapientiae Aeternae": 4,
  "Atalanta Fugiens": 171,
  "De sensu rerum et magia": 42,
  "De Subtilitate": 153,
  "Magia Naturalis": 67,
  "De Praestigiis Daemonum": 13,
  "Les Propheties": 47,
  "Astronomia nova": 183,
  "Sidereus Nuncius": 567,
  "De humani corporis fabrica": 1433,
  "Novum Organum": 3437,
  "Aurora": 23,
  "Oratio de hominis dignitate": 80,
  "Emblemata": 117,
  "Iconologia": 1159,
};

function getGoogleScholarCitations(title: string): number {
  return GOOGLE_SCHOLAR_CITATIONS[title] || 0;
}

function parseCitations(est: string | null): number {
  if (!est) return 0;
  const match = est.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

export default function BibliographyPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [view, setView] = useState<"incunabula" | "all">("incunabula");

  useEffect(() => {
    async function fetchData() {
      const [worksRes, holdingsRes] = await Promise.all([
        supabase.from("esoteric_bibliography").select("*").order("istc_holdings", { ascending: false }),
        supabase.from("istc_holdings").select("*"),
      ]);

      if (worksRes.data) setWorks(worksRes.data);
      if (holdingsRes.data) setHoldings(holdingsRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const incunabula = useMemo(() => {
    return works.filter((w) => w.istc_holdings > 0).sort((a, b) => b.istc_holdings - a.istc_holdings);
  }, [works]);

  const maxCopies = useMemo(() => Math.max(...incunabula.map((w) => w.istc_holdings)), [incunabula]);
  const maxCitations = useMemo(() => Math.max(...incunabula.map((w) => getGoogleScholarCitations(w.title) || parseCitations(w.modern_citations_est))), [incunabula]);

  const getHoldingsForWork = (istcId: string | null) => {
    if (!istcId) return [];
    return holdings.filter((h) => h.istc_id === istcId);
  };

  const institutionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    holdings.forEach((h) => {
      counts[h.institution] = (counts[h.institution] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
  }, [holdings]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0d1117", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#8b949e", fontFamily: "monospace" }}>Loading incunabula data...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0d1117", color: "#c9d1d9" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #30363d", padding: "24px 32px" }}>
        <h1 style={{ fontFamily: "system-ui", fontSize: "24px", fontWeight: 600, color: "#f0f6fc", marginBottom: "8px" }}>
          Incunabula Citation Analysis
        </h1>
        <p style={{ fontFamily: "system-ui", fontSize: "14px", color: "#8b949e" }}>
          {incunabula.length} pre-1501 esoteric works with {holdings.length} surviving library copies tracked
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "0", minHeight: "calc(100vh - 100px)" }}>
        {/* Main Content */}
        <main style={{ padding: "24px 32px", borderRight: "1px solid #30363d" }}>
          {/* Summary Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
            <StatCard label="Incunabula Tracked" value={incunabula.length} />
            <StatCard label="Surviving Copies" value={holdings.length} />
            <StatCard label="With Digital Scans" value={incunabula.filter((w) => w.istc_digital_url).length} />
            <StatCard label="Total Modern Citations" value={`${Math.round(incunabula.reduce((sum, w) => sum + parseCitations(w.modern_citations_est), 0) / 1000)}k+`} />
          </div>

          {/* Chart: Copies vs Citations */}
          <div style={{ background: "#161b22", borderRadius: "8px", border: "1px solid #30363d", padding: "20px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#f0f6fc", marginBottom: "16px" }}>
              Surviving Copies vs Modern Citations
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {incunabula.map((work) => {
                const gsCitations = getGoogleScholarCitations(work.title);
                const citations = gsCitations || parseCitations(work.modern_citations_est);
                const copiesWidth = (work.istc_holdings / maxCopies) * 100;
                const citationsWidth = (citations / maxCitations) * 100;
                const isRealData = gsCitations > 0;

                return (
                  <div
                    key={work.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedWork(work)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                      <span style={{
                        fontFamily: "system-ui",
                        fontSize: "12px",
                        color: "#f0f6fc",
                        width: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}>
                        {work.author?.split(" ").pop() || "Anon"}: {work.title.slice(0, 25)}
                      </span>
                      <div style={{ flex: 1, display: "flex", gap: "4px", alignItems: "center" }}>
                        {/* Copies bar */}
                        <div style={{ flex: 1, height: "16px", background: "#21262d", borderRadius: "2px", overflow: "hidden", position: "relative" }}>
                          <div style={{
                            width: `${copiesWidth}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, #238636, #2ea043)",
                            borderRadius: "2px"
                          }} />
                          <span style={{ position: "absolute", right: "6px", top: "1px", fontSize: "10px", color: "#f0f6fc", fontWeight: 500 }}>
                            {work.istc_holdings}
                          </span>
                        </div>
                        {/* Citations bar */}
                        <div style={{ flex: 1, height: "16px", background: "#21262d", borderRadius: "2px", overflow: "hidden", position: "relative" }}>
                          <div style={{
                            width: `${citationsWidth}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, #1f6feb, #58a6ff)",
                            borderRadius: "2px"
                          }} />
                          <span style={{ position: "absolute", right: "6px", top: "1px", fontSize: "10px", color: "#f0f6fc", fontWeight: 500 }}>
                            {citations}{isRealData ? "" : "~"}
                          </span>
                        </div>
                      </div>
                      {work.istc_digital_url && (
                        <a
                          href={work.istc_digital_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{ fontSize: "11px", color: "#58a6ff", textDecoration: "none" }}
                        >
                          [scan]
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: "24px", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #30363d" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "12px", height: "12px", background: "#2ea043", borderRadius: "2px" }} />
                <span style={{ fontSize: "11px", color: "#8b949e" }}>Surviving Copies (ISTC)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "12px", height: "12px", background: "#58a6ff", borderRadius: "2px" }} />
                <span style={{ fontSize: "11px", color: "#8b949e" }}>Google Scholar Citations</span>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div style={{ background: "#161b22", borderRadius: "8px", border: "1px solid #30363d", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "system-ui", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#21262d" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#8b949e", fontWeight: 500, borderBottom: "1px solid #30363d" }}>Work</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#8b949e", fontWeight: 500, borderBottom: "1px solid #30363d" }}>Author</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", color: "#8b949e", fontWeight: 500, borderBottom: "1px solid #30363d" }}>ISTC Copies</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", color: "#8b949e", fontWeight: 500, borderBottom: "1px solid #30363d" }}>USTC Editions</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", color: "#8b949e", fontWeight: 500, borderBottom: "1px solid #30363d" }}>GS Citations</th>
                  <th style={{ padding: "12px 16px", textAlign: "center", color: "#8b949e", fontWeight: 500, borderBottom: "1px solid #30363d" }}>Digital</th>
                </tr>
              </thead>
              <tbody>
                {incunabula.map((work) => (
                  <tr
                    key={work.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedWork(work)}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#21262d"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #21262d", color: "#f0f6fc" }}>
                      {work.title.length > 35 ? work.title.slice(0, 35) + "..." : work.title}
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #21262d", color: "#8b949e" }}>
                      {work.author || "Anonymous"}
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #21262d", textAlign: "right", color: "#2ea043", fontWeight: 600 }}>
                      {work.istc_holdings}
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #21262d", textAlign: "right", color: "#8b949e" }}>
                      {work.ustc_editions || "—"}
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #21262d", textAlign: "right", color: "#58a6ff", fontWeight: 500 }}>
                      {getGoogleScholarCitations(work.title) || "—"}
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #21262d", textAlign: "center" }}>
                      {work.istc_digital_url ? (
                        <a
                          href={work.istc_digital_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{ color: "#58a6ff", textDecoration: "none" }}
                        >
                          View
                        </a>
                      ) : (
                        <span style={{ color: "#484f58" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Sidebar */}
        <aside style={{ padding: "24px", background: "#161b22", overflowY: "auto" }}>
          {selectedWork ? (
            <WorkDetail work={selectedWork} holdings={getHoldingsForWork(selectedWork.istc_id)} onClose={() => setSelectedWork(null)} />
          ) : (
            <>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#f0f6fc", marginBottom: "16px" }}>
                Top Holding Institutions
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {institutionCounts.map(([inst, count]) => (
                  <div key={inst} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", color: "#8b949e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "260px" }}>
                      {inst}
                    </span>
                    <span style={{ fontSize: "12px", color: "#2ea043", fontWeight: 500 }}>{count}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "32px", padding: "16px", background: "#21262d", borderRadius: "8px", border: "1px solid #30363d" }}>
                <h4 style={{ fontSize: "12px", fontWeight: 600, color: "#f0f6fc", marginBottom: "8px" }}>Data Sources</h4>
                <ul style={{ fontSize: "11px", color: "#8b949e", lineHeight: 1.6, paddingLeft: "16px", margin: 0 }}>
                  <li><a href="https://data.cerl.org/istc/" target="_blank" rel="noopener noreferrer" style={{ color: "#58a6ff" }}>ISTC</a> - Incunabula Short Title Catalogue</li>
                  <li><a href="https://www.ustc.ac.uk/" target="_blank" rel="noopener noreferrer" style={{ color: "#58a6ff" }}>USTC</a> - Universal Short Title Catalogue</li>
                  <li><a href="https://embassyofthefreemind.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#58a6ff" }}>BPH</a> - Bibliotheca Philosophica Hermetica</li>
                </ul>
              </div>

              <div style={{ marginTop: "16px", padding: "16px", background: "#21262d", borderRadius: "8px", border: "1px solid #30363d" }}>
                <h4 style={{ fontSize: "12px", fontWeight: 600, color: "#f0f6fc", marginBottom: "8px" }}>Google Scholar Data</h4>
                <p style={{ fontSize: "11px", color: "#8b949e", lineHeight: 1.6, margin: 0 }}>
                  Citation counts are from Google Scholar, fetched via the <code style={{ background: "#30363d", padding: "1px 4px", borderRadius: "3px" }}>scholarly</code> Python library.
                  Shows highest-cited edition for each work. Actual scholarly engagement may be higher due to variant titles and translations.
                </p>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ background: "#161b22", borderRadius: "8px", border: "1px solid #30363d", padding: "16px" }}>
      <div style={{ fontSize: "24px", fontWeight: 600, color: "#f0f6fc", marginBottom: "4px" }}>{value}</div>
      <div style={{ fontSize: "12px", color: "#8b949e" }}>{label}</div>
    </div>
  );
}

function WorkDetail({ work, holdings, onClose }: { work: Work; holdings: Holding[]; onClose: () => void }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#f0f6fc", lineHeight: 1.3, paddingRight: "16px" }}>
          {work.title}
        </h3>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", color: "#8b949e", cursor: "pointer", fontSize: "18px", padding: "0" }}
        >
          ×
        </button>
      </div>

      <div style={{ fontSize: "13px", color: "#8b949e", marginBottom: "20px" }}>
        {work.author || "Anonymous"} {work.year && `· ${work.year}`}
      </div>

      {/* Key Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
        <div style={{ background: "#21262d", borderRadius: "6px", padding: "12px" }}>
          <div style={{ fontSize: "20px", fontWeight: 600, color: "#2ea043" }}>{work.istc_holdings}</div>
          <div style={{ fontSize: "11px", color: "#8b949e" }}>ISTC Copies</div>
        </div>
        <div style={{ background: "#21262d", borderRadius: "6px", padding: "12px" }}>
          <div style={{ fontSize: "20px", fontWeight: 600, color: "#58a6ff" }}>{getGoogleScholarCitations(work.title) || "—"}</div>
          <div style={{ fontSize: "11px", color: "#8b949e" }}>GS Citations</div>
        </div>
        <div style={{ background: "#21262d", borderRadius: "6px", padding: "12px" }}>
          <div style={{ fontSize: "20px", fontWeight: 600, color: "#f0f6fc" }}>{work.ustc_editions || 0}</div>
          <div style={{ fontSize: "11px", color: "#8b949e" }}>USTC Editions</div>
        </div>
        <div style={{ background: "#21262d", borderRadius: "6px", padding: "12px" }}>
          <div style={{ fontSize: "20px", fontWeight: 600, color: "#f0f6fc" }}>{work.bph_holdings || 0}</div>
          <div style={{ fontSize: "11px", color: "#8b949e" }}>BPH Holdings</div>
        </div>
      </div>

      {/* Links */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
        {work.istc_digital_url && (
          <a
            href={work.istc_digital_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              padding: "10px 12px",
              background: "#238636",
              color: "#fff",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 500,
              textAlign: "center"
            }}
          >
            View Digital Facsimile
          </a>
        )}
        {work.istc_id && (
          <a
            href={`https://data.cerl.org/istc/${work.istc_id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              padding: "10px 12px",
              background: "#21262d",
              color: "#58a6ff",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "13px",
              textAlign: "center",
              border: "1px solid #30363d"
            }}
          >
            ISTC Record: {work.istc_id}
          </a>
        )}
      </div>

      {/* Modern Scholarship */}
      {(work.key_modern_edition || work.key_modern_study) && (
        <div style={{ marginBottom: "20px" }}>
          <h4 style={{ fontSize: "12px", fontWeight: 600, color: "#f0f6fc", marginBottom: "8px" }}>Modern Scholarship</h4>
          {work.key_modern_edition && (
            <p style={{ fontSize: "12px", color: "#8b949e", marginBottom: "6px", fontStyle: "italic" }}>
              Edition: {work.key_modern_edition}
            </p>
          )}
          {work.key_modern_study && (
            <p style={{ fontSize: "12px", color: "#8b949e", fontStyle: "italic" }}>
              Study: {work.key_modern_study}
            </p>
          )}
        </div>
      )}

      {/* Holdings by Institution */}
      {holdings.length > 0 && (
        <div>
          <h4 style={{ fontSize: "12px", fontWeight: 600, color: "#f0f6fc", marginBottom: "8px" }}>
            Library Holdings ({holdings.length})
          </h4>
          <div style={{ maxHeight: "200px", overflowY: "auto", fontSize: "11px" }}>
            {holdings.map((h, i) => (
              <div key={i} style={{ padding: "6px 0", borderBottom: "1px solid #21262d", color: "#8b949e" }}>
                {h.institution}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {work.notes && (
        <div style={{ marginTop: "16px", padding: "12px", background: "#21262d", borderRadius: "6px" }}>
          <p style={{ fontSize: "12px", color: "#8b949e", lineHeight: 1.5, margin: 0 }}>{work.notes}</p>
        </div>
      )}
    </div>
  );
}
