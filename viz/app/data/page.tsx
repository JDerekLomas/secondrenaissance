import Link from "next/link";

const visualizations = [
  {
    slug: "/map",
    title: "The Spread of Latin Printing",
    type: "Animated Map",
    description: "Watch printing spread across Europe from Mainz (1454) to 700+ cities by 1700. Each dot represents a printing center; size shows output volume.",
    insight: "Venice dominated early printing, but by 1600 the industry had spread to Protestant Northern Europe.",
    stats: [
      { label: "Cities", value: "702" },
      { label: "Years", value: "250" },
      { label: "Works mapped", value: "1.6M" },
    ],
  },
  {
    slug: "/timelines",
    title: "Renaissance Timelines",
    type: "Interactive Timeline",
    description: "Explore the lives and output of major printers and prolific authors. See who was publishing when, and how careers overlapped.",
    insight: "The 50 most prolific printers produced over 500 editions each. Names like Plantin, Elzevier, and Gryphe shaped what Europe read.",
    stats: [
      { label: "Printers", value: "50" },
      { label: "Authors", value: "75" },
      { label: "Time span", value: "1450–1700" },
    ],
  },
  {
    slug: "/explore",
    title: "Database Explorer",
    type: "Data Dashboard",
    description: "Dive into the USTC data. Filter by language, year, place, and classification. See how Latin publishing evolved over 250 years.",
    insight: "Latin peaked around 1600, then declined as vernacular languages rose. German overtook Latin in the 1670s.",
    stats: [
      { label: "Total works", value: "1.63M" },
      { label: "Latin works", value: "503K" },
      { label: "Classifications", value: "40+" },
    ],
  },
  {
    slug: "/blog/esoteric-timeline",
    title: "Esoteric Publishing Timeline",
    type: "Visual Essay",
    description: "Scroll through three centuries of hermetic, alchemical, and occult publications. From Ficino's Corpus Hermeticum to the Rosicrucian manifestos.",
    insight: "Esoteric publishing peaked during the early 17th century, coinciding with the Rosicrucian excitement of the 1610s-20s.",
    stats: [
      { label: "Works tracked", value: "500+" },
      { label: "Time span", value: "1469–1750" },
      { label: "Traditions", value: "6" },
    ],
  },
];

export default function DataIndex() {
  return (
    <main style={{ background: '#fdfcf9', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{
        borderBottom: '1px solid #e8e4dc',
        padding: '16px 24px',
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link href="/" style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            color: '#666',
            textDecoration: 'none',
          }}>
            ← SECOND RENAISSANCE
          </Link>
          <a
            href="https://www.ancientwisdomtrust.org/become-a-patron"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              color: '#fff',
              background: '#9e4a3a',
              padding: '8px 16px',
              borderRadius: '4px',
              textDecoration: 'none',
            }}
          >
            Support This Work
          </a>
        </div>
      </nav>

      {/* Header */}
      <header style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '60px 24px 40px',
      }}>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: '42px',
          fontWeight: 400,
          color: '#1a1612',
          marginBottom: '16px',
        }}>
          Data Visualizations
        </h1>
        <p style={{
          fontFamily: 'Newsreader, Georgia, serif',
          fontSize: '19px',
          lineHeight: 1.6,
          color: '#555',
          maxWidth: '700px',
          marginBottom: '24px',
        }}>
          Interactive explorations of 1.6 million early printed books. Maps, timelines, and dashboards
          built from the Universal Short Title Catalogue.
        </p>
        <Link href="/blog" style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          color: '#9e4a3a',
          textDecoration: 'none',
        }}>
          See research essays →
        </Link>
      </header>

      {/* Visualizations Grid */}
      <section style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 24px 80px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px',
        }}>
          {visualizations.map((viz) => (
            <Link key={viz.slug} href={viz.slug} style={{ textDecoration: 'none' }}>
              <article style={{
                background: '#fff',
                border: '1px solid #e8e4dc',
                borderRadius: '12px',
                padding: '32px',
                height: '100%',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}>
                {/* Type badge */}
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  background: '#e8f0f5',
                  color: '#546b8a',
                }}>
                  {viz.type.toUpperCase()}
                </span>

                {/* Title */}
                <h2 style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '28px',
                  fontWeight: 500,
                  color: '#1a1612',
                  marginTop: '16px',
                  marginBottom: '12px',
                  lineHeight: 1.2,
                }}>
                  {viz.title}
                </h2>

                {/* Description */}
                <p style={{
                  fontFamily: 'Newsreader, Georgia, serif',
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: '#666',
                  marginBottom: '20px',
                }}>
                  {viz.description}
                </p>

                {/* Insight box */}
                <div style={{
                  background: '#f5f0e8',
                  borderRadius: '6px',
                  padding: '16px',
                  marginBottom: '20px',
                }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    color: '#9e4a3a',
                    marginBottom: '6px',
                  }}>
                    KEY INSIGHT
                  </p>
                  <p style={{
                    fontFamily: 'Newsreader, Georgia, serif',
                    fontSize: '14px',
                    lineHeight: 1.5,
                    color: '#555',
                    fontStyle: 'italic',
                  }}>
                    {viz.insight}
                  </p>
                </div>

                {/* Stats */}
                <div style={{
                  display: 'flex',
                  gap: '24px',
                  borderTop: '1px solid #e8e4dc',
                  paddingTop: '16px',
                }}>
                  {viz.stats.map((stat) => (
                    <div key={stat.label}>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#1a1612',
                      }}>
                        {stat.value}
                      </p>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '11px',
                        color: '#888',
                      }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Data Source */}
      <section style={{
        background: '#fff',
        borderTop: '1px solid #e8e4dc',
        padding: '60px 24px',
      }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            color: '#1a1612',
            marginBottom: '16px',
          }}>
            About the Data
          </h2>
          <p style={{
            fontFamily: 'Newsreader, Georgia, serif',
            fontSize: '17px',
            lineHeight: 1.7,
            color: '#555',
            marginBottom: '24px',
          }}>
            All visualizations are built from the <a href="https://ustc.ac.uk" style={{ color: '#9e4a3a' }}>Universal Short Title Catalogue</a>,
            a database of all books printed in Europe between the invention of printing and the end of the
            seventeenth century. The USTC is maintained by the University of St Andrews and contains
            records for over 1.6 million editions.
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            color: '#888',
          }}>
            Have ideas for new visualizations? <a href="mailto:research@sourcelibrary.org" style={{ color: '#666' }}>Get in touch</a>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #e8e4dc',
        padding: '40px 24px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          color: '#888',
        }}>
          Data from the <a href="https://ustc.ac.uk" style={{ color: '#666' }}>Universal Short Title Catalogue</a>, University of St Andrews
        </p>
      </footer>
    </main>
  );
}
