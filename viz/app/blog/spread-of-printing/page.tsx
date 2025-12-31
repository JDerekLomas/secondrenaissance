import BlogLayout from "../BlogLayout";
import { generateBlogMetadata, generateArticleJsonLd } from "@/lib/blogMetadata";

const postMeta = {
  title: "How the Printing Press Spread Across Europe: An Interactive Map (1450-1500)",
  description: "Watch Gutenberg's invention spread from Mainz to 250 cities in 50 years. Interactive map of incunabula (early printed books), printer migrations, and the Sack of Mainz.",
  slug: "spread-of-printing",
  date: "2025-12-31",
};

export const metadata = generateBlogMetadata(postMeta);
const jsonLd = generateArticleJsonLd(postMeta);

export default function SpreadOfPrinting() {
  return (
    <BlogLayout
      title="How the Printing Press Spread Across Europe"
      tag="Data Visualization"
      slug="spread-of-printing"
      date="December 2025"
      prevPost={{ href: "/blog/printing-revolution", title: "The Printing Revolution: 1.6 Million Books" }}
      jsonLd={jsonLd}
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '22px',
        lineHeight: 1.6,
        color: '#444',
        marginBottom: '32px',
      }}>
        In 1454, there was one printing press in Europe — Gutenberg&apos;s workshop in Mainz.
        By 1500, over 250 cities had presses, and 20 million books had been printed for a
        population of 70 million. This interactive visualization shows how that happened:
        year by year, city by city, printer by printer.
      </p>

      <figure style={{
        margin: '40px -24px',
        textAlign: 'center',
      }}>
        <a href="/incunabula.html" target="_blank" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f5f0e8 0%, #e8e0d5 100%)',
            borderRadius: '12px',
            padding: '48px 40px',
            border: '1px solid #d8d0c5',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}>
            <p style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '32px',
              color: '#9e4a3a',
              marginBottom: '16px',
              fontWeight: 500,
            }}>
              The Spread of Printing: 1450-1500
            </p>
            <p style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '24px',
            }}>
              Interactive map with 24,000+ incunabula, printer migration routes, and historical events
            </p>
            <span style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#9e4a3a',
              color: '#fff',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
            }}>
              Launch Interactive Map →
            </span>
          </div>
        </a>
      </figure>

      <h2>The Technology That Could Only Spread By Walking</h2>

      <p>
        Gutenberg&apos;s invention was a <em>trade secret</em>. The precise combination of metal alloys
        for casting type, the composition of oil-based ink, the engineering of the press itself —
        none of this was written down. The first printed manual on printing wasn&apos;t published until 1540,
        ninety years after Gutenberg.
      </p>

      <p>
        This meant printing could only spread one way: through the physical movement of trained craftsmen.
        A printer had to learn the craft by working in an established shop, then carry that knowledge
        to a new city. Our visualization tracks these migrations — the arrows show printers moving from
        city to city, carrying the &quot;secret art&quot; with them.
      </p>

      <h2>The Sack of Mainz (1462): Disaster as Catalyst</h2>

      <p>
        The pivotal event that scattered printing across Europe was a local political crisis.
        In 1462, Archbishop Adolf II of Nassau attacked Mainz in a succession dispute.
        The city was looted and 400 citizens killed. Workers from the Fust-Schöffer workshop
        (Gutenberg&apos;s former partners) fled for their lives.
      </p>

      <p>
        They carried printing&apos;s secrets to Cologne, Strasbourg, Basel, Rome, and Venice.
        Disaster became catalyst. Within three years of the sack, printing reached Italy;
        within five years, it was in Paris. By 1480, 110 European cities had presses.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1a1612' }}>
          Key Dates in the Spread of Printing
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ fontFamily: 'monospace', color: '#9e4a3a', fontWeight: 600, minWidth: '50px' }}>1454</span>
            <span style={{ color: '#444' }}>Gutenberg Bible completed in Mainz</span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ fontFamily: 'monospace', color: '#9e4a3a', fontWeight: 600, minWidth: '50px' }}>1462</span>
            <span style={{ color: '#444' }}>Sack of Mainz scatters trained printers</span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ fontFamily: 'monospace', color: '#9e4a3a', fontWeight: 600, minWidth: '50px' }}>1465</span>
            <span style={{ color: '#444' }}>First Italian press at Subiaco monastery</span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ fontFamily: 'monospace', color: '#9e4a3a', fontWeight: 600, minWidth: '50px' }}>1470</span>
            <span style={{ color: '#444' }}>Paris and Venice get presses; Jenson creates Roman type</span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ fontFamily: 'monospace', color: '#9e4a3a', fontWeight: 600, minWidth: '50px' }}>1476</span>
            <span style={{ color: '#444' }}>Caxton brings printing to England</span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ fontFamily: 'monospace', color: '#9e4a3a', fontWeight: 600, minWidth: '50px' }}>1480</span>
            <span style={{ color: '#444' }}>Venice dominates — 13% of all European output</span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ fontFamily: 'monospace', color: '#9e4a3a', fontWeight: 600, minWidth: '50px' }}>1500</span>
            <span style={{ color: '#444' }}>250+ cities have presses; 20 million books printed</span>
          </div>
        </div>
      </figure>

      <h2>Venice: The Silicon Valley of Print</h2>

      <p>
        Watch the visualization and you&apos;ll see Venice&apos;s circle explode in the 1470s and 80s.
        By 1480, Venice was producing more books than any other city — about 13% of all European output.
        By 1500, it had printed over 3,000 editions.
      </p>

      <p>Why Venice?</p>

      <ul style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '18px',
        lineHeight: 1.8,
        color: '#444',
        marginLeft: '24px',
        marginBottom: '24px',
      }}>
        <li style={{ marginBottom: '12px' }}>
          <strong>Largest city in Europe</strong> — a market of 150,000 people
        </li>
        <li style={{ marginBottom: '12px' }}>
          <strong>Major seaport</strong> — easy paper imports from across the Mediterranean
        </li>
        <li style={{ marginBottom: '12px' }}>
          <strong>Merchant capital</strong> — investors looking for new opportunities
        </li>
        <li style={{ marginBottom: '12px' }}>
          <strong>Skilled labor</strong> — dyers, metalworkers, glass-makers who could adapt to printing
        </li>
        <li style={{ marginBottom: '12px' }}>
          <strong>Less censorship</strong> — the Republic kept church and court at arm&apos;s length
        </li>
        <li style={{ marginBottom: '12px' }}>
          <strong>Fortuitous death</strong> — Johann von Speyer&apos;s 5-year monopoly died with him in 1470
        </li>
      </ul>

      <p>
        Venice attracted the greatest printers: Nicolas Jenson, who created the Roman typeface we still use;
        Erhard Ratdolt, who pioneered scientific illustration; and Aldus Manutius, who invented italic type
        and the pocket book. Printers trained in Venice&apos;s competitive market were sought after across Europe.
      </p>

      <h2>The Printers: Following the Arrows</h2>

      <p>
        Hover over the arrows in the visualization to see the individual printers who carried
        the craft to new cities. A few notable journeys:
      </p>

      <h3>William Caxton (Cologne → Westminster, 1476)</h3>
      <p>
        An English merchant who learned printing in Cologne while trading cloth. In 1475 he printed
        the first book in English (in Bruges), then established England&apos;s first press at Westminster
        in 1476. He printed Chaucer&apos;s Canterbury Tales, Malory&apos;s Morte d&apos;Arthur, and nearly 100 other titles.
      </p>

      <h3>Nicolas Jenson (Mainz → Venice, 1470)</h3>
      <p>
        A French engraver sent by King Charles VII to learn printing in Mainz in 1458. By 1470 he was
        in Venice, where he created the Roman typeface that remains the basis of all book typography today.
        At his peak he ran 12 presses simultaneously.
      </p>

      <h3>Aldus Manutius (Ferrara → Venice, 1490)</h3>
      <p>
        A humanist scholar who moved to Venice at age 40 to found the Aldine Press. His innovations
        transformed publishing: italic type (1501), the pocket-sized book format, standardized punctuation.
        His dolphin-and-anchor logo is still used by Doubleday Books.
      </p>

      <h2>The Books: 24,000+ Incunabula</h2>

      <p>
        The right column of the visualization shows every surviving book printed before 1501 —
        the &quot;incunabula&quot; (Latin for &quot;swaddling clothes,&quot; meaning the infancy of printing).
        The data comes from the{" "}
        <a href="https://data.cerl.org/istc/_search" style={{ color: '#9e4a3a' }}>
          Incunabula Short Title Catalogue
        </a>{" "}
        maintained by the British Library.
      </p>

      <p>
        Click on any city to filter books printed there. Click on any book to see:
      </p>

      <ul style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '18px',
        lineHeight: 1.8,
        color: '#444',
        marginLeft: '24px',
        marginBottom: '24px',
      }}>
        <li style={{ marginBottom: '8px' }}>An AI-generated summary of the work</li>
        <li style={{ marginBottom: '8px' }}>Links to digital facsimiles (where available)</li>
        <li style={{ marginBottom: '8px' }}>How many copies survive worldwide</li>
        <li style={{ marginBottom: '8px' }}>The full ISTC catalogue record</li>
      </ul>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1a1612' }}>
          What the Data Shows
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#444' }}>Total incunabula in ISTC</span>
            <span style={{ fontFamily: 'monospace', color: '#9e4a3a', fontWeight: 600 }}>~30,000 editions</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#444' }}>Editions with coordinates</span>
            <span style={{ fontFamily: 'monospace', color: '#9e4a3a', fontWeight: 600 }}>24,290</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#444' }}>Printing cities by 1500</span>
            <span style={{ fontFamily: 'monospace', color: '#9e4a3a', fontWeight: 600 }}>250+</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#444' }}>Documented printer migrations</span>
            <span style={{ fontFamily: 'monospace', color: '#9e4a3a', fontWeight: 600 }}>75+</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#444' }}>Books with digital facsimiles</span>
            <span style={{ fontFamily: 'monospace', color: '#9e4a3a', fontWeight: 600 }}>~40%</span>
          </div>
        </div>
      </figure>

      <h2>More Books Than All Previous History</h2>

      <p>
        By 1500, more books existed in Europe than in all of previous human history.
        The incunabula era — just 50 years — produced an estimated 20 million individual volumes
        for a population of 70 million Europeans. That&apos;s roughly one book for every three or four people,
        up from perhaps one book per thousand before Gutenberg.
      </p>

      <p>
        The effects were profound: standardized texts replaced manuscript variations,
        vernacular languages gained legitimacy alongside Latin, knowledge became reproducible
        rather than unique. Within a generation, Luther would use the press to spark the Reformation.
        Within a century, the Scientific Revolution would be unthinkable without printed books.
      </p>

      <p>
        Press Play and watch it happen.
      </p>

      <figure style={{
        margin: '40px -24px',
        textAlign: 'center',
      }}>
        <a href="/incunabula.html" target="_blank" style={{ textDecoration: 'none' }}>
          <div style={{
            background: '#9e4a3a',
            borderRadius: '8px',
            padding: '20px 40px',
            display: 'inline-block',
          }}>
            <span style={{
              color: '#fff',
              fontSize: '18px',
              fontWeight: 500,
            }}>
              → Launch the Interactive Map
            </span>
          </div>
        </a>
      </figure>

      <h2>Data Sources</h2>

      <p>
        <strong>Book data:</strong> {" "}
        <a href="https://data.cerl.org/istc/_search" style={{ color: '#9e4a3a' }}>
          Incunabula Short Title Catalogue (ISTC)
        </a>, British Library. The ISTC catalogs every known book printed with movable type before 1501.
      </p>

      <p>
        <strong>Printer migrations:</strong> Compiled from Wikipedia, CEPR research,
        the Edward Worth Library, and other scholarly sources. See the{" "}
        <a href="/printing-migrations.md" style={{ color: '#9e4a3a' }}>
          full research notes
        </a>.
      </p>

      <p>
        <strong>Historical events:</strong> Cross-referenced from multiple sources including
        the Renaissance Mathematicus blog, Smithsonian Magazine, and World History Encyclopedia.
      </p>
    </BlogLayout>
  );
}
