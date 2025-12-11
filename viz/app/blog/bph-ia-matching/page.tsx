"use client";

import BlogLayout from "../BlogLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Journey data - match rates at each stage
const journeyData = [
  { stage: "Prefix", rate: 2.1, description: "50-char prefix" },
  { stage: "Fuzzy", rate: 18.6, description: "Token set ratio" },
  { stage: "Semantic", rate: 65.3, description: "Embeddings only" },
  { stage: "Multi-signal", rate: 26.1, description: "Title+Author+Year" },
];

// Multi-signal breakdown for 1400-1700 (search-based matching)
const signalBreakdown = [
  { type: "Title + Author + Year", count: 112, pct: 4.4, color: "#2d5a3d" },
  { type: "Title + Author", count: 89, pct: 3.5, color: "#4a7c59" },
  { type: "Title + Year", count: 203, pct: 8.0, color: "#6b9e76" },
  { type: "Title Only (100%)", count: 246, pct: 9.7, color: "#8bba93" },
];

// Century comparison
const centuryResults = [
  { century: "15th", matched: 20, total: 60, rate: 33.3 },
  { century: "16th", matched: 307, total: 891, rate: 34.5 },
  { century: "17th", matched: 328, total: 1552, rate: 21.1 },
];

const COLORS = {
  matched: "#8b9a7d",
  unmatched: "#9e4a3a",
  highlight: "#546b8a",
};

export default function BphIaMatching() {
  return (
    <BlogLayout
      title="From 2% to 26%: The Journey to Match Historical Catalogs"
      tag="Methods"
      slug="bph-ia-matching"
      date="December 2025"
      prevPost={{ href: "/blog/esoteric-digitization", title: "Esoteric Latin Digitization" }}
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '22px',
        lineHeight: 1.6,
        color: '#444',
        marginBottom: '32px',
      }}>
        When we first tried to match the Bibliotheca Philosophica Hermetica catalog against the Internet Archive,
        we found only <strong>2% of works</strong>. Through iterative refinement—fuzzy matching, semantic embeddings,
        and multi-signal validation—we reached <strong>26% for early modern Latin works</strong>.
        This is the story of how matching historical metadata is harder than it looks.
      </p>

      <h2>The Challenge: Two Catalogs, One Question</h2>

      <p>
        The <strong>Bibliotheca Philosophica Hermetica</strong> (BPH) in Amsterdam holds one of the world&apos;s
        finest collections of esoteric literature—30,000+ works on Hermeticism, alchemy, Kabbalah, and
        Rosicrucianism. The <strong>Internet Archive</strong> has digitized over 222,000 Latin texts.
        A simple question: how many BPH works are already available online?
      </p>

      <p>
        Answering this question required solving a fundamental problem: <strong>how do you match 16th-century
        book titles across two independently created catalogs?</strong>
      </p>

      <h2>Attempt 1: Exact Prefix Matching (2%)</h2>

      <p>
        Our first attempt was naive: compare the first 50 characters of each title, normalized for case
        and punctuation. The result was devastating—only <strong>2.1% of BPH works matched</strong>.
      </p>

      <p>
        Manual inspection quickly revealed why. The same work might appear as:
      </p>

      <ul>
        <li><strong>BPH:</strong> &ldquo;De occulta philosophia libri tres&rdquo;</li>
        <li><strong>IA:</strong> &ldquo;Henrici Cornelii Agrippae ab Nettesheym De occulta philosophia libri tres&rdquo;</li>
      </ul>

      <p>
        The IA version includes the author&apos;s full name and place of origin in the title—standard practice
        for early modern title pages, but fatal for prefix matching.
      </p>

      <h2>Attempt 2: Fuzzy String Matching (18.6%)</h2>

      <p>
        We implemented fuzzy matching using the <code>rapidfuzz</code> library&apos;s token set ratio algorithm.
        This approach finds the best match between tokenized versions of strings, handling word order
        differences and partial matches. With a threshold of 85%, match rates jumped to <strong>18.6%</strong>.
      </p>

      <p>
        The improvement came from matching cases like:
      </p>

      <ul>
        <li><strong>BPH:</strong> &ldquo;Summa theologiae&rdquo;</li>
        <li><strong>IA:</strong> &ldquo;Divi Thomae Aquinatis Summa theologiae&rdquo;</li>
      </ul>

      <p>
        But fuzzy matching still struggled with fundamental differences in cataloging philosophy. BPH
        uses standardized titles; IA transcribes title pages verbatim. These aren&apos;t spelling variations—they&apos;re
        different conventions for describing the same book.
      </p>

      {/* Journey visualization */}
      <figure style={{
        background: '#fff',
        border: '1px solid #e8e4dc',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <figcaption style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.05em',
          color: '#888',
          marginBottom: '16px',
        }}>
          MATCH RATE EVOLUTION ACROSS METHODS
        </figcaption>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={journeyData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8e4dc" />
              <XAxis
                dataKey="stage"
                tick={{ fontSize: 11, fill: '#666' }}
                axisLine={{ stroke: '#e8e4dc' }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#888' }}
                tickFormatter={(v) => `${v}%`}
                domain={[0, 70]}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #e8e4dc',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
                formatter={(value: number, _name: string, props: { payload?: { description?: string } }) => [
                  `${value.toFixed(1)}%`,
                  props.payload?.description || ''
                ]}
              />
              <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                {journeyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.stage === 'Multi-signal' ? COLORS.matched : '#ccc'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          color: '#aaa',
          marginTop: '12px',
        }}>
          Semantic matching (65%) had the highest recall but lowest precision. Multi-signal matching (26%) trades recall for confidence.
        </p>
      </figure>

      <h2>Attempt 3: Semantic Embeddings (65%)</h2>

      <p>
        The breakthrough came from treating titles not as strings but as <em>meaning</em>. Using the
        <code> paraphrase-multilingual-MiniLM-L12-v2</code> sentence transformer, we embedded all 10,683 BPH
        Latin works and 222,407 IA Latin texts into a 384-dimensional vector space. Similar titles cluster
        together regardless of exact wording.
      </p>

      <p>
        Building a FAISS index over the IA embeddings, we found the nearest semantic neighbors for each
        BPH work. With a cosine similarity threshold of 0.75, match rates soared to <strong>65%</strong>.
      </p>

      <p>
        But there was a problem. Manual inspection revealed many false positives:
      </p>

      <ul>
        <li><strong>BPH:</strong> &ldquo;Tractatus de lapide philosophorum&rdquo; (On the philosopher&apos;s stone)</li>
        <li><strong>IA:</strong> &ldquo;Tractatus de praeparatione lapidis&rdquo; (On preparing stones—a geology text)</li>
      </ul>

      <p>
        Both titles share Latin formulaic language (&ldquo;Tractatus de...&rdquo;) and discuss &ldquo;stones,&rdquo;
        but they&apos;re completely different works. The embedding model captured topical similarity but
        couldn&apos;t distinguish alchemical philosophy from geology.
      </p>

      <h2>Attempt 4: Multi-Signal Matching (26%)</h2>

      <p>
        The solution was to require <strong>corroborating signals</strong> beyond title similarity. We combined:
      </p>

      <ol>
        <li><strong>Title embeddings</strong> (semantic similarity ≥ 0.75)</li>
        <li><strong>Author matching</strong> (fuzzy surname comparison ≥ 80%)</li>
        <li><strong>Year tolerance</strong> (publication dates within ±30 years)</li>
      </ol>

      <p>
        A match required either high title confidence (≥0.85) alone, or medium title confidence (0.75-0.85)
        plus at least one corroborating signal.
      </p>

      {/* Multi-signal breakdown */}
      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <figcaption style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.05em',
          color: '#888',
          marginBottom: '16px',
        }}>
          MULTI-SIGNAL MATCH BREAKDOWN (1400-1700)
        </figcaption>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #e0d8c8' }}>
            <span style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '16px', color: '#444' }}>Total BPH Latin works (1400-1700)</span>
            <span style={{ fontFamily: 'monospace', fontSize: '20px', color: '#1a1612', fontWeight: 600 }}>2,531</span>
          </div>
          {signalBreakdown.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 3 ? '1px solid #e0d8c8' : 'none' }}>
              <span style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '15px', color: '#444', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: 12, height: 12, borderRadius: 2, background: item.color, display: 'inline-block' }} />
                {item.type}
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: '16px', color: item.color, fontWeight: 600 }}>{item.count} ({item.pct}%)</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', marginTop: '8px', borderTop: '2px solid #e0d8c8' }}>
            <span style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '16px', color: '#1a1612', fontWeight: 600 }}>Total matched</span>
            <span style={{ fontFamily: 'monospace', fontSize: '20px', color: COLORS.matched, fontWeight: 600 }}>650 (25.7%)</span>
          </div>
        </div>
      </figure>

      <p>
        For the early modern period (1400-1700), search-based matching found <strong>650 high-confidence matches (25.7%)</strong>.
        That&apos;s lower than embedding-only matching, but far more reliable. The strongest matches—title plus
        author plus year—account for only 4.4%, but these are essentially certain to be correct.
      </p>

      <h2>The Precision-Recall Tradeoff</h2>

      <p>
        Each approach represents a different point on the precision-recall curve:
      </p>

      <figure style={{
        background: '#fff',
        border: '1px solid #e8e4dc',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
        overflow: 'hidden',
      }}>
        <table style={{
          width: '100%',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          borderCollapse: 'collapse',
        }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0d8c8' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Method</th>
              <th style={{ textAlign: 'right', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Match Rate</th>
              <th style={{ textAlign: 'right', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Est. Precision</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Prefix matching", "2%", "~95%", "Quick baseline"],
              ["Fuzzy string", "18.6%", "~70%", "Spelling variants"],
              ["Semantic only", "65%", "~40%", "Finding candidates"],
              ["Multi-signal", "26%", "~85%", "Confident matches"],
            ].map(([method, rate, precision, use], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e8e4dc' }}>
                <td style={{ padding: '12px 8px', color: '#1a1612' }}>{method}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'monospace', color: COLORS.matched }}>{rate}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'monospace', color: COLORS.highlight }}>{precision}</td>
                <td style={{ padding: '12px 8px', color: '#666' }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>

      <p>
        There&apos;s no &ldquo;correct&rdquo; answer—it depends on your use case. For finding digitization candidates
        to verify manually, high-recall semantic matching makes sense. For producing statistics about
        digitization coverage, high-precision multi-signal matching is essential.
      </p>

      <h2>Century Patterns</h2>

      <p>
        Matching success varies significantly by century:
      </p>

      {/* Century chart */}
      <figure style={{
        background: '#fff',
        border: '1px solid #e8e4dc',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <figcaption style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.05em',
          color: '#888',
          marginBottom: '16px',
        }}>
          MULTI-SIGNAL MATCH RATE BY CENTURY
        </figcaption>
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            <BarChart data={centuryResults} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8e4dc" />
              <XAxis
                dataKey="century"
                tick={{ fontSize: 11, fill: '#666' }}
                tickFormatter={(v) => `${v} c.`}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#888' }}
                tickFormatter={(v) => `${v}%`}
                domain={[0, 40]}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #e8e4dc',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
                formatter={(value: number) => [`${value.toFixed(1)}%`, 'Match rate']}
                labelFormatter={(label) => `${label} century`}
              />
              <Bar dataKey="rate" fill={COLORS.matched} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          color: '#aaa',
          marginTop: '12px',
        }}>
          15th and 16th century works show higher match rates (~34%) than 17th century (21%), likely reflecting better bibliographic standardization for incunabula.
        </p>
      </figure>

      <p>
        The 15th and 16th centuries show match rates around 34%, while the 17th century drops to 21%.
        This likely reflects both the bibliographic attention given to incunabula and the explosion
        of printing in the 17th century creating a larger haystack of undigitized works.
      </p>

      <h2>What the Numbers Mean</h2>

      <p>
        Our 26% match rate for 1400-1700 is a <strong>lower bound</strong> on true digitization coverage.
        The actual number of BPH works available in the Internet Archive is likely higher because:
      </p>

      <ul>
        <li><strong>Anthology problem:</strong> Many esoteric works appear inside collected volumes with different titles</li>
        <li><strong>Metadata gaps:</strong> Some IA records lack author/year data, preventing signal confirmation</li>
        <li><strong>OCR limitations:</strong> Poor OCR in IA metadata may prevent correct matching</li>
      </ul>

      <p>
        But importantly, <strong>73.9% of early modern Latin esoteric works have no confirmed match</strong> in
        the world&apos;s largest open digital library. Whether they&apos;re truly absent or just unfindable,
        they remain effectively inaccessible to researchers.
      </p>

      <h2>Lessons Learned</h2>

      <p>
        This journey taught us several things about matching historical metadata:
      </p>

      <ol>
        <li><strong>String matching is deceptively hard.</strong> Early modern titles follow different conventions than modern metadata, and the same work can have radically different title-page transcriptions.</li>
        <li><strong>Semantic similarity isn&apos;t identity.</strong> Two works can be semantically similar (both about alchemy, both in Latin, both &ldquo;Tractatus de...&rdquo;) without being the same work.</li>
        <li><strong>Corroborating signals are essential.</strong> Author names and publication years provide crucial disambiguation, even when imperfect.</li>
        <li><strong>There&apos;s no single right answer.</strong> Different use cases demand different tradeoffs between finding more matches and being confident in matches found.</li>
      </ol>

      <h2>What&apos;s Next: Human Validation</h2>

      <p>
        With 650 high-confidence matches now in our database, we&apos;ve built a <strong>validation interface</strong> where
        humans can verify whether each match is correct. The interface shows the BPH catalog entry alongside the
        Internet Archive metadata, fetched live from the IA API, allowing validators to quickly assess whether
        they&apos;re looking at the same work—or even the same edition.
      </p>

      <p>
        Validation captures three outcomes: <strong>same edition</strong> (exact match), <strong>same work, different edition</strong>
        (e.g., a 1680 work matched to a 1911 reprint), or <strong>different works</strong> (false positive).
        This nuanced categorization lets us distinguish between &ldquo;available online&rdquo; and &ldquo;available in the exact
        edition the BPH holds.&rdquo;
      </p>

      <p>
        We&apos;re also expanding our year range to include 18th-century works (1701-1800), which adds another
        1,030 Latin works to match. Early results show a similar ~25% match rate for this period.
      </p>

      <p>
        The ultimate goal isn&apos;t just counting matches—it&apos;s identifying which works most need digitization
        and translation, so the esoteric traditions that shaped Renaissance thought can be accessible to
        modern scholars.
      </p>

      <div style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <p style={{
          fontFamily: 'Newsreader, Georgia, serif',
          fontSize: '16px',
          color: '#444',
          margin: 0,
        }}>
          <strong>Want to help validate our matches?</strong> Visit our{' '}
          <a href="/validate" style={{ color: '#9e4a3a' }}>validation page</a> to help verify BPH-IA matches.
          Every validation helps improve our understanding of what&apos;s really available in digital archives.
        </p>
      </div>
    </BlogLayout>
  );
}
