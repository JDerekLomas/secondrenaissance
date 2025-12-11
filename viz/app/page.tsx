import Link from "next/link";

// Important untranslated figures
const forgottenAuthors = [
  { name: "Cornelis Drebbel", editions: 12, field: "Inventor of the submarine, perpetual motion", translated: 0 },
  { name: "Isaac Casaubon", editions: 89, field: "Classical philology, exposed Hermetica dating", translated: 0 },
  { name: "Giambattista della Porta", editions: 156, field: "Natural magic, optics, cryptography", translated: 0 },
];

// Subject breakdown - ordered by interest/accessibility, not size
const subjects = [
  { name: "Philosophy", count: 42000, pct: 8.3, translated: "~3%" },
  { name: "Natural Philosophy", count: 31000, pct: 6.2, translated: "~2%" },
  { name: "Medicine", count: 38000, pct: 7.5, translated: "< 1%" },
  { name: "Poetry & Literature", count: 28000, pct: 5.6, translated: "~5%" },
  { name: "Law", count: 68000, pct: 13.5, translated: "< 1%" },
  { name: "History", count: 24000, pct: 4.8, translated: "~4%" },
];

export default function Home() {

  return (
    <main className="min-h-screen" style={{ background: '#fdfcf9' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(253, 252, 249, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e8e4dc',
        zIndex: 100,
        padding: '16px 24px',
      }}>
        <div style={{
          maxWidth: '1200px',
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
            SECOND RENAISSANCE RESEARCH
          </Link>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Link href="/data" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#555', textDecoration: 'none' }}>Data</Link>
            <Link href="/blog" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#555', textDecoration: 'none' }}>Essays</Link>
            <Link href="/about" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#555', textDecoration: 'none' }}>About</Link>
            <Link href="/contribute" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9e4a3a', fontWeight: 500, textDecoration: 'none' }}>Contribute</Link>
            <Link href="/digitizer" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#555', textDecoration: 'none' }}>Digitizer</Link>
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
        </div>
      </nav>

      {/* Hero: The Thesis */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '120px 24px 80px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(32px, 6vw, 56px)',
          fontWeight: 400,
          color: '#1a1612',
          lineHeight: 1.15,
          marginBottom: '32px',
          maxWidth: '900px',
        }}>
          To create a second Renaissance,<br />
          <span style={{ color: '#9e4a3a' }}>translate the first.</span>
        </h1>
        <p style={{
          fontFamily: 'Newsreader, Georgia, serif',
          fontSize: '19px',
          color: '#666',
          marginBottom: '48px',
          maxWidth: '600px',
          lineHeight: 1.6,
        }}>
          The Renaissance itself was written in Latin. We never translated it.
        </p>

        {/* The Numbers */}
        <div style={{
          display: 'flex',
          gap: '48px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '32px',
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(48px, 10vw, 72px)',
              fontWeight: 400,
              color: '#1a1612',
              lineHeight: 1,
            }}>
              503,486
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#888',
              marginTop: '8px',
            }}>
              Latin works, 1450–1700
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(48px, 10vw, 72px)',
              fontWeight: 400,
              color: '#9e4a3a',
              lineHeight: 1,
            }}>
              &lt;3%
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#888',
              marginTop: '8px',
            }}>
              translated into English
            </p>
          </div>
        </div>

        <p style={{
          fontFamily: 'Newsreader, Georgia, serif',
          fontSize: '17px',
          fontStyle: 'italic',
          color: '#888',
          maxWidth: '500px',
        }}>
          The Renaissance is waiting to be discovered.
        </p>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          color: '#999',
          marginTop: '64px',
        }}>
          ↓ Scroll to explore the gap
        </p>
      </section>

      {/* The First Renaissance Story */}
      <section style={{
        padding: '100px 24px',
        background: '#fff',
        borderTop: '1px solid #e8e4dc',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '36px',
            fontWeight: 400,
            color: '#1a1612',
            marginBottom: '24px',
            textAlign: 'center',
          }}>
            The Story of the First Renaissance
          </h2>
          <p style={{
            fontFamily: 'Newsreader, Georgia, serif',
            fontSize: '19px',
            lineHeight: 1.7,
            color: '#444',
            marginBottom: '48px',
            maxWidth: '680px',
            margin: '0 auto 48px',
            textAlign: 'center',
          }}>
            In 1460, a monk brought a manuscript from Macedonia to Florence.
            It changed everything.
          </p>

          {/* First Book: Corpus Hermeticum */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '80px',
          }}>
            <div>
              <figure style={{
                margin: 0,
                position: 'relative',
              }}>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Plut.82.6_C1_The_Dialogues_of_Plato.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://www.meisterdrucke.ie/kunstwerke/1260px/Italian_School_-_Plut_826_C1_The_Dialogues_of_Plato_translated_by_Ficino_and_dedicated_to_Lorenzo_-_%28MeisterDrucke-1523013%29.jpg"
                    alt="Ficino's Plato translations dedicated to Lorenzo de' Medici"
                    style={{
                      width: '100%',
                      maxWidth: '350px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                      borderRadius: '4px',
                    }}
                  />
                </a>
                <figcaption style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  color: '#888',
                  marginTop: '12px',
                  fontStyle: 'italic',
                }}>
                  Ficino&apos;s Latin translations of Plato, dedicated to Lorenzo de&apos; Medici. <br />
                  The book that transmitted Greek philosophy to Renaissance Europe.
                </figcaption>
              </figure>
            </div>
            <div>
              <h3 style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '28px',
                fontWeight: 400,
                color: '#1a1612',
                marginBottom: '16px',
              }}>
                The Rediscovery
              </h3>
              <p style={{
                fontFamily: 'Newsreader, Georgia, serif',
                fontSize: '17px',
                lineHeight: 1.7,
                color: '#444',
                marginBottom: '16px',
              }}>
                When Cosimo de&apos; Medici received a Greek manuscript of the <em>Corpus Hermeticum</em>,
                he ordered Marsilio Ficino to stop translating Plato and translate this first.
              </p>
              <p style={{
                fontFamily: 'Newsreader, Georgia, serif',
                fontSize: '17px',
                lineHeight: 1.7,
                color: '#444',
              }}>
                Ficino&apos;s translations of Hermes, Plato, and Plotinus into Latin sparked the Renaissance.
                Ideas that had been locked away in Greek for a thousand years suddenly flowed across Europe.
              </p>
            </div>
          </div>

          {/* Second Book: della Porta's Natural Magick */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '80px',
          }}>
            <div style={{ order: 2 }}>
              <figure style={{
                margin: 0,
                position: 'relative',
              }}>
                <a
                  href="https://www.abebooks.com/servlet/BookDetailsPL?bi=32181420104"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://pictures.abebooks.com/inventory/32181420104.jpg"
                    alt="Title page of della Porta's Magiae Naturalis"
                    style={{
                      width: '100%',
                      maxWidth: '350px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                      borderRadius: '4px',
                    }}
                  />
                </a>
                <figcaption style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  color: '#888',
                  marginTop: '12px',
                  fontStyle: 'italic',
                }}>
                  Della Porta&apos;s <em>Magia Naturalis</em> (1558). <br />
                  Where Renaissance &quot;natural magic&quot; became experimental science.
                </figcaption>
              </figure>
            </div>
            <div style={{ order: 1 }}>
              <h3 style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '28px',
                fontWeight: 400,
                color: '#1a1612',
                marginBottom: '16px',
              }}>
                The Path to Science
              </h3>
              <p style={{
                fontFamily: 'Newsreader, Georgia, serif',
                fontSize: '17px',
                lineHeight: 1.7,
                color: '#444',
                marginBottom: '16px',
              }}>
                Renaissance &quot;natural magic&quot; was not superstition—it was the study of nature&apos;s hidden forces.
                Della Porta&apos;s work on optics, magnetism, and chemistry laid groundwork for the Scientific Revolution.
              </p>
              <p style={{
                fontFamily: 'Newsreader, Georgia, serif',
                fontSize: '17px',
                lineHeight: 1.7,
                color: '#444',
              }}>
                All of this was written in Latin—the international language of scholarship.
                And almost none of it has been translated into English.
              </p>
            </div>
          </div>

          {/* Gallery of Renaissance Illustrations */}
          <div style={{
            marginBottom: '80px',
          }}>
            <h3 style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '28px',
              fontWeight: 400,
              color: '#1a1612',
              marginBottom: '16px',
              textAlign: 'center',
            }}>
              A Library Waiting to Be Unlocked
            </h3>
            <p style={{
              fontFamily: 'Newsreader, Georgia, serif',
              fontSize: '17px',
              color: '#666',
              textAlign: 'center',
              marginBottom: '32px',
            }}>
              Cosmological diagrams, alchemical emblems, anatomical masterpieces—all written in Latin.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              maxWidth: '900px',
              margin: '0 auto',
            }}>
              {[
                {
                  src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Vitruvian_macrocosm.jpg/500px-Vitruvian_macrocosm.jpg',
                  href: 'https://commons.wikimedia.org/wiki/File:Vitruvian_macrocosm.jpg',
                  title: 'Man as Microcosm',
                  author: 'Robert Fludd, 1617',
                },
                {
                  src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Harley_3469%2C_f.28.jpg/500px-Harley_3469%2C_f.28.jpg',
                  href: 'https://commons.wikimedia.org/wiki/File:Harley_3469,_f.28.jpg',
                  title: 'Splendor Solis',
                  author: 'Alchemical manuscript, 1582',
                },
                {
                  src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Vesalius_Fabrica_p184.jpg/330px-Vesalius_Fabrica_p184.jpg',
                  href: 'https://commons.wikimedia.org/wiki/File:Vesalius_Fabrica_p184.jpg',
                  title: 'The Muscle Men',
                  author: 'Andreas Vesalius, 1543',
                },
                {
                  src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Michael_Maier_Atalanta_Fugiens.jpeg/500px-Michael_Maier_Atalanta_Fugiens.jpeg',
                  href: 'https://commons.wikimedia.org/wiki/File:Michael_Maier_Atalanta_Fugiens.jpeg',
                  title: 'Atalanta Fugiens',
                  author: 'Michael Maier, 1617',
                },
              ].map((img, i) => (
                <a
                  key={i}
                  href={img.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  <figure style={{ margin: 0, textAlign: 'center' }}>
                    <img
                      src={img.src}
                      alt={img.title}
                      style={{
                        width: '100%',
                        height: '220px',
                        objectFit: 'cover',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                        borderRadius: '3px',
                      }}
                    />
                    <figcaption style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      color: '#666',
                      marginTop: '12px',
                      lineHeight: 1.4,
                    }}>
                      <strong style={{ color: '#1a1612', display: 'block' }}>{img.title}</strong>
                      <span style={{ color: '#888' }}>{img.author}</span>
                    </figcaption>
                  </figure>
                </a>
              ))}
            </div>
          </div>

          {/* The Parallel */}
          <div style={{
            background: '#f5f0e8',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center',
          }}>
            <h3 style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '28px',
              fontWeight: 400,
              color: '#1a1612',
              marginBottom: '24px',
            }}>
              The Pattern Repeats
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: '24px',
              alignItems: 'center',
              maxWidth: '700px',
              margin: '0 auto',
            }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  color: '#888',
                  marginBottom: '8px',
                }}>
                  1460
                </p>
                <p style={{
                  fontFamily: 'Newsreader, Georgia, serif',
                  fontSize: '17px',
                  color: '#444',
                }}>
                  Ancient Greek texts<br />
                  locked away for 1,000 years<br />
                  <strong>translated into Latin</strong>
                </p>
              </div>
              <div style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '36px',
                color: '#9e4a3a',
              }}>
                →
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  color: '#888',
                  marginBottom: '8px',
                }}>
                  2025
                </p>
                <p style={{
                  fontFamily: 'Newsreader, Georgia, serif',
                  fontSize: '17px',
                  color: '#444',
                }}>
                  Renaissance Latin texts<br />
                  locked away for 500 years<br />
                  <strong style={{ color: '#9e4a3a' }}>waiting for translation</strong>
                </p>
              </div>
            </div>
            <p style={{
              fontFamily: 'Newsreader, Georgia, serif',
              fontSize: '19px',
              color: '#444',
              marginTop: '32px',
              fontStyle: 'italic',
            }}>
              The Renaissance happened because someone translated old books.<br />
              It can happen again.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: The Language Landscape */}
      <section style={{
        padding: '100px 24px',
        background: '#fff',
        borderTop: '1px solid #e8e4dc',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '36px',
            fontWeight: 400,
            color: '#1a1612',
            marginBottom: '16px',
          }}>
            Latin dominated European printing for two centuries
          </h2>
          <p style={{
            fontFamily: 'Newsreader, Georgia, serif',
            fontSize: '19px',
            lineHeight: 1.7,
            color: '#444',
            marginBottom: '48px',
            maxWidth: '680px',
          }}>
            From Gutenberg to Newton, Latin was the language of international scholarship.
            Nearly a third of all books printed in early modern Europe were in Latin.
          </p>

          {/* Language bars */}
          <figure style={{ marginBottom: '24px' }}>
            <figcaption style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.05em',
              color: '#888',
              marginBottom: '20px',
            }}>
              LANGUAGES OF EUROPEAN PRINTING, 1450–1700
            </figcaption>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { lang: 'Latin', pct: 30.9, n: '503,486', highlight: true },
                { lang: 'German', pct: 20.9, n: '340,521' },
                { lang: 'French', pct: 14.8, n: '241,749' },
                { lang: 'English', pct: 10.1, n: '164,280' },
                { lang: 'Italian', pct: 7.0, n: '113,481' },
                { lang: 'Dutch', pct: 7.0, n: '114,596' },
                { lang: 'Spanish', pct: 6.0, n: '97,854' },
              ].map((d) => (
                <div key={d.lang} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{
                    width: '70px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: d.highlight ? '#1a1612' : '#666',
                    fontWeight: d.highlight ? 500 : 400,
                  }}>{d.lang}</span>
                  <div style={{ flex: 1, height: '28px', background: '#f5f5f3', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${d.pct * 3.2}%`,
                      background: d.highlight ? '#9e4a3a' : '#c5beb2',
                      borderRadius: '2px',
                      transition: 'width 1s ease-out',
                    }} />
                  </div>
                  <span style={{
                    width: '80px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    color: '#888',
                    textAlign: 'right',
                  }}>{d.n}</span>
                </div>
              ))}
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              color: '#aaa',
              marginTop: '16px',
            }}>
              Source: Universal Short Title Catalogue, n=1,628,578
            </p>
          </figure>
        </div>
      </section>

      {/* Section 3: The Comparison */}
      <section style={{
        padding: '100px 24px',
        background: '#fdfcf9',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '36px',
            fontWeight: 400,
            color: '#1a1612',
            marginBottom: '16px',
          }}>
            Classical Latin is well-served. Renaissance Latin is not.
          </h2>
          <p style={{
            fontFamily: 'Newsreader, Georgia, serif',
            fontSize: '19px',
            lineHeight: 1.7,
            color: '#444',
            marginBottom: '48px',
            maxWidth: '680px',
          }}>
            The Loeb Classical Library has 500+ volumes of Cicero, Virgil, and Ovid.
            But the actual bulk of the Latin corpus—Renaissance scholarship—is almost untouched.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {[
              { era: 'Classical', pct: 75, desc: 'Cicero, Virgil, Ovid, Seneca' },
              { era: 'Church Fathers', pct: 65, desc: 'Augustine, Jerome, Ambrose' },
              { era: 'Medieval', pct: 25, desc: 'Aquinas, scholastics' },
              { era: 'Renaissance & Early Modern', pct: 2, desc: '500,000 works' },
            ].map((d) => (
              <div key={d.era} style={{
                background: '#fff',
                border: '1px solid #e8e4dc',
                borderRadius: '8px',
                padding: '24px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                  <span style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '20px',
                    color: '#1a1612',
                  }}>{d.era}</span>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '24px',
                    fontWeight: 600,
                    color: d.pct < 10 ? '#9e4a3a' : '#666',
                  }}>{d.pct}%</span>
                </div>
                <div style={{ height: '8px', background: '#f5f5f3', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
                  <div style={{
                    height: '100%',
                    width: `${d.pct}%`,
                    background: d.pct < 10 ? '#9e4a3a' : d.pct < 50 ? '#c9a86c' : '#8b9a7d',
                    borderRadius: '4px',
                  }} />
                </div>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#888',
                }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: The Map Preview */}
      <section style={{
        padding: '100px 24px',
        background: '#1a1612',
        color: '#fff',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '36px',
            fontWeight: 400,
            color: '#fff',
            marginBottom: '16px',
          }}>
            Printing spread across Europe in 250 years
          </h2>
          <p style={{
            fontFamily: 'Newsreader, Georgia, serif',
            fontSize: '19px',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '48px',
            maxWidth: '680px',
          }}>
            From Mainz in 1454 to 700+ cities by 1700. Each dot represents a printing center.
            Watch the spread of Latin scholarship.
          </p>

          <Link href="/map" style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#2a2622',
              borderRadius: '12px',
              padding: '60px',
              textAlign: 'center',
              border: '1px solid #3a3632',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '16px',
              }}>
                Interactive visualization
              </p>
              <p style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '28px',
                color: '#c9a86c',
                marginBottom: '24px',
              }}>
                Explore the Animated Map →
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '40px',
              }}>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '32px', fontWeight: 600, color: '#fff' }}>702</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Printing centers</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '32px', fontWeight: 600, color: '#fff' }}>250</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Years of data</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Section 5: The Forgotten */}
      <section style={{
        padding: '100px 24px',
        background: '#fff',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '36px',
            fontWeight: 400,
            color: '#1a1612',
            marginBottom: '16px',
          }}>
            Important thinkers you can&apos;t read
          </h2>
          <p style={{
            fontFamily: 'Newsreader, Georgia, serif',
            fontSize: '19px',
            lineHeight: 1.7,
            color: '#444',
            marginBottom: '48px',
            maxWidth: '680px',
          }}>
            These thinkers shaped science, philosophy, and culture. Their Latin works
            influenced generations. Yet most remain untranslated into English.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {forgottenAuthors.map((author) => (
              <div key={author.name} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px 32px',
                background: '#fdfcf9',
                border: '1px solid #e8e4dc',
                borderRadius: '8px',
              }}>
                <div>
                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '24px',
                    fontWeight: 500,
                    color: '#1a1612',
                    marginBottom: '4px',
                  }}>{author.name}</h3>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: '#888',
                  }}>{author.field}</p>
                </div>
                <div style={{
                  background: '#9e4a3a',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                }}>
                  No full translation
                </div>
              </div>
            ))}
          </div>

          <p style={{ marginTop: '32px' }}>
            <Link href="/blog/forgotten-authors" style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#9e4a3a',
            }}>
              See more untranslated thinkers →
            </Link>
          </p>
        </div>
      </section>

      {/* Section 6: What's Lost */}
      <section style={{
        padding: '100px 24px',
        background: '#fdfcf9',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '36px',
            fontWeight: 400,
            color: '#1a1612',
            marginBottom: '16px',
          }}>
            What knowledge is locked away?
          </h2>
          <p style={{
            fontFamily: 'Newsreader, Georgia, serif',
            fontSize: '19px',
            lineHeight: 1.7,
            color: '#444',
            marginBottom: '48px',
            maxWidth: '680px',
          }}>
            The untranslated corpus spans every field of Renaissance thought.
            History of science, religious history, legal history, philosophy—all depend on texts
            most scholars cannot read.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
          }}>
            {subjects.map((subject) => (
              <div key={subject.name} style={{
                background: '#fff',
                border: '1px solid #e8e4dc',
                borderRadius: '8px',
                padding: '20px 24px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <span style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '18px',
                    color: '#1a1612',
                  }}>{subject.name}</span>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    color: '#9e4a3a',
                    fontWeight: 500,
                  }}>{subject.translated} translated</span>
                </div>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: '#888',
                }}>~{subject.count.toLocaleString()} works</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: The Path Forward */}
      <section style={{
        padding: '100px 24px',
        background: '#fff',
        borderTop: '1px solid #e8e4dc',
      }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '36px',
            fontWeight: 400,
            color: '#1a1612',
            marginBottom: '24px',
          }}>
            This is solvable.
          </h2>
          <p style={{
            fontFamily: 'Newsreader, Georgia, serif',
            fontSize: '19px',
            lineHeight: 1.7,
            color: '#444',
            marginBottom: '24px',
          }}>
            Digitization infrastructure exists. AI-assisted translation is advancing rapidly.
            The scholarly apparatus for identifying what matters is in place.
          </p>
          <p style={{
            fontFamily: 'Newsreader, Georgia, serif',
            fontSize: '19px',
            lineHeight: 1.7,
            color: '#444',
            marginBottom: '48px',
          }}>
            What&apos;s missing is coordinated effort and funding. A systematic program could
            transform access to Renaissance thought within a decade.
          </p>

          <Link href="/blog/roadmap" style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            color: '#9e4a3a',
            textDecoration: 'none',
          }}>
            See our translation priorities →
          </Link>
        </div>
      </section>

      {/* Section 8: The Ask */}
      <section style={{
        padding: '100px 24px',
        background: '#1a1612',
        color: '#fff',
      }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '24px',
          }}>
            A PROJECT OF THE EMBASSY OF THE FREE MIND
          </p>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '42px',
            fontWeight: 400,
            color: '#fff',
            marginBottom: '24px',
            lineHeight: 1.2,
          }}>
            Create a second Renaissance by translating the first
          </h2>
          <p style={{
            fontFamily: 'Newsreader, Georgia, serif',
            fontSize: '19px',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '24px',
          }}>
            The original Renaissance was sparked by rediscovering ancient texts.
            Half a million more are waiting. The <a href="https://www.ancientwisdomtrust.org/become-a-patron" target="_blank" rel="noopener noreferrer" style={{ color: '#c9a86c' }}>Ancient Wisdom Trust</a> is working to
            unlock them—through cataloging, digitization, and translation.
          </p>
          <p style={{
            fontFamily: 'Newsreader, Georgia, serif',
            fontSize: '17px',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '48px',
          }}>
            Translations are published freely at <a href="https://sourcelibrary.org" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.7)' }}>Source Library</a>.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            marginBottom: '48px',
          }}>
            <a
              href="https://www.ancientwisdomtrust.org/become-a-patron"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#1a1612',
                background: '#c9a86c',
                padding: '16px 32px',
                borderRadius: '4px',
                textDecoration: 'none',
              }}
            >
              Support This Work
            </a>
            <Link
              href="/contribute"
              style={{
                display: 'inline-block',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#c9a86c',
                background: 'transparent',
                padding: '16px 32px',
                borderRadius: '4px',
                textDecoration: 'none',
                border: '1px solid #c9a86c',
              }}
            >
              Help Verify Data
            </Link>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '48px',
            paddingTop: '48px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}>
            <Link href="/explore" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Explore the Data</Link>
            <Link href="/blog/roadmap" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Translation Roadmap</Link>
            <Link href="/blog" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Research Essays</Link>
            <Link href="/contribute" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Contribute</Link>
            <Link href="/about" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>About</Link>
            <Link href="/translate" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Translation Prototype</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 24px',
        background: '#151311',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.4)',
        }}>
          Data from the <a href="https://ustc.ac.uk" style={{ color: 'rgba(255,255,255,0.5)' }}>Universal Short Title Catalogue</a>, University of St Andrews
        </p>
      </footer>
    </main>
  );
}
