import BlogLayout from "../BlogLayout";
import { generateBlogMetadata } from "@/lib/blogMetadata";

const postMeta = {
  title: "The Hidden Hermetic Library: What the Embassy of the Free Mind Reveals About Cataloging Gaps",
  description: "We cross-referenced Amsterdam's esoteric collection with standard bibliographies. 35% of their 15th-century holdings don't appear in ISTC or USTC.",
  slug: "hidden-hermetic-library",
  date: "2025-12-07",
};

export const metadata = generateBlogMetadata(postMeta);

export default function HiddenHermeticLibrary() {
  // Works not in ISTC or USTC with no digital coverage
  const undigitizedWorks = [
    { year: 1490, title: "Poenitas cito", author: "Unknown", keyword: "mysticism" },
    { year: 1500, title: "De laudibus sanctissime matris Anne", author: "Johannes Trithemius", keyword: "mysticism" },
    { year: 1476, title: "Das Buech der zwayer red mit ainander", author: "Gregory the Great", keyword: "mysticism" },
    { year: 1498, title: "Meditationes de vita et beneficiis Jesu Christi", author: "Unknown", keyword: "mysticism" },
    { year: 1495, title: "Libertas ecclesiastica", author: "Hilarius Litomericensis", keyword: "mysticism" },
    { year: 1485, title: "Onus mundi", author: "Birgitta of Sweden", keyword: "mysticism" },
  ];

  // Notable authors found outside standard catalogs
  const notableAuthors = [
    { name: "Hermes Trismegistus", works: 2, description: "The mythical founder of Hermeticism" },
    { name: "Marsilio Ficino", works: 2, description: "Translator of Plato and the Corpus Hermeticum" },
    { name: "Pico della Mirandola", works: 1, description: "Author of the Oration on Human Dignity" },
    { name: "Thomas a Kempis", works: 3, description: "Author of The Imitation of Christ" },
    { name: "Heinrich Seuse", works: 1, description: "Dominican mystic and theologian" },
    { name: "Johannes Trithemius", works: 1, description: "Abbot, cryptographer, and occultist" },
  ];

  return (
    <BlogLayout
      title="The Hidden Hermetic Library: What the Embassy of the Free Mind Reveals About Cataloging Gaps"
      tag="Research"
      slug="hidden-hermetic-library"
      date="December 2025"
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '20px',
        color: '#666',
        lineHeight: 1.6,
        marginBottom: '24px',
      }}>
        We cross-referenced Amsterdam&apos;s esoteric book collection with standard Renaissance bibliographies. 35% of their 15th-century holdings don&apos;t appear in either ISTC or USTC. These aren&apos;t marginal texts.
      </p>

      <div style={{
          fontFamily: 'Newsreader, Georgia, serif',
          fontSize: '18px',
          lineHeight: 1.8,
          color: '#333',
        }}>
          <p style={{ marginBottom: '24px' }}>
            The <strong>Bibliotheca Philosophica Hermetica</strong> (BPH)&mdash;now the Embassy of the Free Mind in Amsterdam&mdash;holds one of the world&apos;s most important collections of esoteric and hermetic texts. Founded by Joost Ritman, it contains nearly 28,000 works spanning five centuries of mystical, alchemical, and philosophical thought.
          </p>

          <p style={{ marginBottom: '24px' }}>
            We loaded their catalog into our database and asked a simple question: <strong>how many of these works appear in standard Renaissance bibliographies?</strong>
          </p>

          <p style={{ marginBottom: '24px' }}>
            The answer reveals something important about what we think we know about Renaissance publishing.
          </p>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            color: '#1a1612',
            marginTop: '48px',
            marginBottom: '24px',
          }}>
            The Experiment
          </h2>

          <p style={{ marginBottom: '24px' }}>
            We sampled 74 BPH works dated 1400-1500 (all available in their 15th-century holdings) and cross-referenced them against:
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}>
              <strong>ISTC</strong> (Incunabula Short Title Catalogue): The definitive catalog of 15th-century printed books
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>USTC</strong> (Universal Short Title Catalogue): 1.6 million editions from 1450-1700
            </li>
          </ul>

          <p style={{ marginBottom: '24px' }}>
            These are the two major bibliographic databases that scholars use to understand Renaissance publishing. If a book isn&apos;t in either, it&apos;s effectively invisible to standard research.
          </p>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            color: '#1a1612',
            marginTop: '48px',
            marginBottom: '24px',
          }}>
            The Results
          </h2>

          {/* Results Box */}
          <div style={{
            background: '#fff',
            border: '1px solid #e8e4dc',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '32px',
          }}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.05em',
              color: '#888',
              marginBottom: '20px',
            }}>
              BPH 15TH CENTURY WORKS (n=74)
            </p>

            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1', minWidth: '140px' }}>
                <p style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '48px',
                  fontWeight: 400,
                  color: '#9e4a3a',
                  lineHeight: 1,
                }}>35%</p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#666',
                  marginTop: '8px',
                }}>Not in ISTC or USTC</p>
              </div>
              <div style={{ flex: '1', minWidth: '140px' }}>
                <p style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '48px',
                  fontWeight: 400,
                  color: '#8b9a7d',
                  lineHeight: 1,
                }}>89%</p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#666',
                  marginTop: '8px',
                }}>In Google Books</p>
              </div>
              <div style={{ flex: '1', minWidth: '140px' }}>
                <p style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '48px',
                  fontWeight: 400,
                  color: '#c9a86c',
                  lineHeight: 1,
                }}>6</p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#666',
                  marginTop: '8px',
                }}>With no digital copy anywhere</p>
              </div>
            </div>
          </div>

          <p style={{ marginBottom: '24px' }}>
            <strong>26 of 74 works</strong> (35%) don&apos;t appear in either ISTC or USTC. These aren&apos;t obscure pamphlets. The missing works include texts by:
          </p>

          {/* Notable Authors */}
          <div style={{
            background: '#fff',
            border: '1px solid #e8e4dc',
            borderRadius: '8px',
            marginBottom: '32px',
            overflow: 'hidden',
          }}>
            {notableAuthors.map((author, i) => (
              <div key={author.name} style={{
                padding: '16px 20px',
                borderBottom: i < notableAuthors.length - 1 ? '1px solid #f0ede8' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#1a1612',
                  }}>{author.name}</p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    color: '#888',
                  }}>{author.description}</p>
                </div>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#9e4a3a',
                  fontWeight: 500,
                }}>{author.works} work{author.works > 1 ? 's' : ''} missing</p>
              </div>
            ))}
          </div>

          <p style={{ marginBottom: '24px' }}>
            Yes, you&apos;re reading that correctly. Editions of Ficino, Pico della Mirandola, and Hermes Trismegistus that don&apos;t appear in the standard catalogs. These are some of the most influential figures in Renaissance intellectual history.
          </p>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            color: '#1a1612',
            marginTop: '48px',
            marginBottom: '24px',
          }}>
            The Keyword Pattern
          </h2>

          <p style={{ marginBottom: '24px' }}>
            The BPH catalogs works by esoteric subject. Looking at the 26 works missing from standard bibliographies:
          </p>

          {/* Keyword breakdown */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '32px',
          }}>
            {[
              { keyword: 'Mysticism', count: 14, color: '#9e4a3a' },
              { keyword: 'Hermetica', count: 8, color: '#8a5475' },
              { keyword: 'Alchemy', count: 2, color: '#c9a86c' },
              { keyword: 'Rosicrucianism', count: 1, color: '#6b7c5a' },
              { keyword: 'Witchcraft', count: 1, color: '#546b8a' },
            ].map((item) => (
              <div key={item.keyword} style={{
                background: '#fff',
                border: '1px solid #e8e4dc',
                borderRadius: '8px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: item.color,
                }}></span>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: '#333',
                }}>{item.keyword}</span>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: item.color,
                }}>{item.count}</span>
              </div>
            ))}
          </div>

          <p style={{ marginBottom: '24px' }}>
            The pattern is clear: <strong>mystical and hermetic texts are underrepresented in standard bibliographies</strong>. This isn&apos;t random. It reflects historical biases in what was considered worth cataloging.
          </p>

          <div style={{
            background: '#1a1612',
            color: '#fff',
            padding: '32px',
            borderRadius: '8px',
            marginTop: '48px',
            marginBottom: '48px',
          }}>
            <p style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '24px',
              fontWeight: 400,
              marginBottom: '16px',
              lineHeight: 1.4,
            }}>
              &quot;The esoteric tradition&mdash;arguably central to Renaissance thought&mdash;is systematically undercounted in our bibliographic databases.&quot;
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.6)',
            }}>
              35% of BPH&apos;s 15th-century holdings missing from ISTC/USTC
            </p>
          </div>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            color: '#1a1612',
            marginTop: '48px',
            marginBottom: '24px',
          }}>
            The Truly Lost: 6 Works With No Digital Presence
          </h2>

          <p style={{ marginBottom: '24px' }}>
            Of the 26 uncataloged works, 6 have no digital copy anywhere&mdash;not in Google Books, not in Internet Archive, nowhere we searched. These are the most urgent candidates for digitization:
          </p>

          {/* Undigitized works table */}
          <div style={{
            background: '#fff',
            border: '1px solid #e8e4dc',
            borderRadius: '8px',
            marginBottom: '32px',
            overflow: 'hidden',
          }}>
            <div style={{
              background: '#f5f0e8',
              padding: '12px 20px',
              borderBottom: '1px solid #e8e4dc',
            }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                color: '#9e4a3a',
              }}>NO DIGITAL COPY FOUND</p>
            </div>
            {undigitizedWorks.map((work, i) => (
              <div key={i} style={{
                padding: '16px 20px',
                borderBottom: i < undigitizedWorks.length - 1 ? '1px solid #f0ede8' : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <p style={{
                    fontFamily: 'Newsreader, Georgia, serif',
                    fontSize: '16px',
                    fontStyle: 'italic',
                    color: '#1a1612',
                  }}>{work.title}</p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    color: '#888',
                  }}>{work.year}</p>
                </div>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#666',
                }}>{work.author}</p>
              </div>
            ))}
          </div>

          <p style={{ marginBottom: '24px' }}>
            Note the authors: <strong>Johannes Trithemius</strong>, the famous Renaissance polymath who wrote on cryptography and the occult; <strong>Birgitta of Sweden</strong>, whose mystical visions shaped medieval spirituality; <strong>Hilarius Litomericensis</strong>, the Bohemian humanist.
          </p>

          <p style={{ marginBottom: '24px' }}>
            These aren&apos;t minor figures. They&apos;re waiting in the BPH vault for someone to digitize and translate them.
          </p>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            color: '#1a1612',
            marginTop: '48px',
            marginBottom: '24px',
          }}>
            What This Means
          </h2>

          <p style={{ marginBottom: '24px' }}>
            The BPH finding suggests our picture of Renaissance publishing is incomplete in systematic ways. Texts that didn&apos;t fit scholarly categories&mdash;the mystical, the alchemical, the hermetic&mdash;were less likely to be cataloged.
          </p>

          <p style={{ marginBottom: '24px' }}>
            This matters for understanding intellectual history. The &quot;esoteric tradition&quot; wasn&apos;t marginal to the Renaissance&mdash;it was central. Ficino translated the Corpus Hermeticum before Plato. Newton spent more time on alchemy than physics. These currents shaped modern science and philosophy.
          </p>

          <p style={{ marginBottom: '24px' }}>
            Yet when we count &quot;how many Renaissance books exist,&quot; we&apos;re systematically undercounting the mystical tradition. The 1.6 million works in USTC may be missing tens of thousands of esoteric texts.
          </p>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            color: '#1a1612',
            marginTop: '48px',
            marginBottom: '24px',
          }}>
            Next Steps
          </h2>

          <p style={{ marginBottom: '24px' }}>
            We&apos;ve added the full BPH catalog (27,879 works) to our Supabase database. This allows us to:
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}>
              <strong>Identify gaps</strong>: Cross-reference BPH against ISTC/USTC to find uncataloged esoteric works
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Track digitization</strong>: Monitor which BPH works become available online
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Prioritize translation</strong>: Focus on influential works that exist only in manuscript or rare print
            </li>
          </ul>

          <p style={{ marginBottom: '24px' }}>
            The Embassy of the Free Mind is already working on digitization. Our role is mapping what exists, what&apos;s accessible, and what needs attention.
          </p>

          <div style={{
            background: '#fdfcf9',
            border: '1px solid #e8e4dc',
            borderRadius: '8px',
            padding: '32px',
            marginTop: '48px',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '24px',
              color: '#1a1612',
              marginBottom: '16px',
            }}>
              The hidden libraries are coming into view. Help us map them.
            </p>
            <a
              href="https://www.ancientwisdomtrust.org/become-a-patron"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#fff',
                background: '#9e4a3a',
                padding: '12px 32px',
                borderRadius: '4px',
                textDecoration: 'none',
              }}
            >
              Support This Research
            </a>
          </div>
        </div>

    </BlogLayout>
  );
}
