import BlogLayout from "../BlogLayout";
import { generateBlogMetadata, generateArticleJsonLd } from "@/lib/blogMetadata";

const postMeta = {
  title: "Methodology: How We Estimated Digitization Rates",
  description: "Documenting the sources and methods behind our accessibility estimates. How we derived the 18% digitized, 8% OCR, and 3% translated figures.",
  slug: "methodology",
  date: "2025-11-10",
};

export const metadata = generateBlogMetadata(postMeta);
const jsonLd = generateArticleJsonLd(postMeta);

export default function Methodology() {
  return (
    <BlogLayout
      title="Methodology"
      tag="Methods"
      slug="methodology"
      prevPost={{ href: "/blog/gaps-of-the-greats", title: "Gaps of the Greats" }}
      jsonLd={jsonLd}
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '22px',
        lineHeight: 1.6,
        color: '#444',
        marginBottom: '32px',
      }}>
        Data sources and research methods behind our analysis of Latin publishing,
        digitization, and translation.
      </p>

      <h2>Primary Data Source</h2>

      <h3 style={{ color: '#9e4a3a', fontSize: '20px', marginTop: '24px' }}>Universal Short Title Catalogue (USTC)</h3>
      <p>
        All bibliographic data comes from the{" "}
        <a href="https://www.ustc.ac.uk/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
          Universal Short Title Catalogue
        </a>
        , maintained by the University of St Andrews. The USTC is the most comprehensive database of early European printing (1450–1700).
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{ fontWeight: 600, marginBottom: '12px', color: '#1a1612' }}>USTC Statistics (as of 2025)</h4>
        <ul style={{ color: '#444', fontSize: '14px', lineHeight: 1.8 }}>
          <li><strong style={{ color: '#1a1612' }}>1.65 million</strong> editions catalogued</li>
          <li><strong style={{ color: '#1a1612' }}>7 million</strong> surviving copies located</li>
          <li><strong style={{ color: '#1a1612' }}>10,000+</strong> libraries, archives, and museums worldwide</li>
          <li><strong style={{ color: '#1a1612' }}>500,000+</strong> digital links to scanned copies</li>
        </ul>
        <p style={{ color: '#666', fontSize: '12px', marginTop: '12px' }}>
          Source:{" "}
          <a href="https://www.ustc.ac.uk/about" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            USTC About Page
          </a>
        </p>
      </figure>

      <p>
        We queried the USTC for records where the language field contains "Latin," yielding <strong style={{ color: '#1a1612' }}>533,320 Latin-language edition records</strong> (32.7% of the total catalogue).
      </p>

      <figure style={{
        background: '#fff9f0',
        border: '1px solid #c9a86c',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{ color: '#c9a86c', fontWeight: 600, marginBottom: '12px' }}>Editions vs. Works: Our Analysis</h4>
        <p style={{ color: '#444', fontSize: '14px', marginBottom: '16px' }}>
          The USTC counts <em>editions</em> (individual printings), not unique works. A popular text like Cicero's <em>De Officiis</em> might appear in 500+ editions. To estimate unique works, we analyzed the USTC Latin dataset:
        </p>
        <div style={{
          background: '#f5f0e8',
          borderRadius: '6px',
          padding: '16px',
          margin: '16px 0',
        }}>
          <table style={{ width: '100%', fontSize: '14px' }}>
            <tbody style={{ color: '#444' }}>
              <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
                <td style={{ padding: '8px 0' }}>Total Latin editions</td>
                <td style={{ padding: '8px 0', fontFamily: 'monospace', textAlign: 'right' }}>533,307</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
                <td style={{ padding: '8px 0' }}>Unique author+title combinations</td>
                <td style={{ padding: '8px 0', fontFamily: 'monospace', textAlign: 'right' }}>~150,000</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
                <td style={{ padding: '8px 0' }}>Unique author names</td>
                <td style={{ padding: '8px 0', fontFamily: 'monospace', textAlign: 'right' }}>~52,000</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0' }}>Unique title strings</td>
                <td style={{ padding: '8px 0', fontFamily: 'monospace', textAlign: 'right' }}>~99,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ color: '#444', fontSize: '14px', marginBottom: '8px' }}>
          The <strong style={{ color: '#1a1612' }}>~150,000 unique author+title pairs</strong> is our best proxy for "works," though this still overcounts because:
        </p>
        <ul style={{ color: '#666', fontSize: '12px', marginBottom: '16px' }}>
          <li>Same work with variant titles counts multiple times</li>
          <li>Spelling/abbreviation differences across editions</li>
          <li>Anonymous works harder to deduplicate</li>
        </ul>
        <p style={{ color: '#444', fontSize: '14px' }}>
          <strong style={{ color: '#1a1612' }}>Conservative estimate: 80,000–120,000 unique Latin works</strong> in USTC. This means the average work was reprinted ~5 times, though the distribution is highly skewed—canonical authors have hundreds of editions while most works have just 1–2.
        </p>
        <p style={{ color: '#666', fontSize: '12px', marginTop: '12px' }}>
          Analysis: Computed from USTC Latin export (December 2025) using author_name + std_title deduplication.
        </p>
      </figure>

      <h2>Digitization Data</h2>

      <h3 style={{ color: '#9e4a3a', fontSize: '20px', marginTop: '24px' }}>USTC Digital Links (~27% of all editions)</h3>
      <p>
        The USTC itself provides the most reliable digitization data. According to their website:
      </p>
      <blockquote style={{ borderLeft: '4px solid #9e4a3a', paddingLeft: '16px', margin: '24px 0', fontStyle: 'italic', color: '#666' }}>
        "The USTC hosts links to more than half a million digital scans, currently tagged to some 450,000 editions."
      </blockquote>
      <p>
        This means <strong style={{ color: '#1a1612' }}>~27% of all catalogued editions</strong> (450,000 / 1,650,000) have at least one digital scan available through USTC links. These links point to major digitization projects including:
      </p>
      <ul>
        <li>
          <a href="https://www.google.com/books" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>Google Books</a>
          {" "}— 40+ million books scanned as of 2019
        </li>
        <li>
          <a href="https://www.hathitrust.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>HathiTrust</a>
          {" "}— 19+ million digitized items from 219 research libraries
        </li>
        <li>
          <a href="https://www.digitale-sammlungen.de/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>Bavarian State Library (MDZ)</a>
          {" "}— 10,000+ incunabula, ~300,000 16th–17th century books
        </li>
        <li>
          <a href="https://archive.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>Internet Archive</a>
          {" "}— 3.8+ million scanned books
        </li>
      </ul>

      <h2>English Translation Data</h2>

      <p>
        We compiled counts from major Latin-English scholarly translation series and digital libraries:
      </p>

      <h3 style={{ color: '#9e4a3a', fontSize: '20px', marginTop: '24px' }}>Digital Libraries</h3>
      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <table style={{ width: '100%', fontSize: '14px' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: '#666', borderBottom: '1px solid #e0d8c8' }}>
              <th style={{ paddingBottom: '8px' }}>Source</th>
              <th style={{ paddingBottom: '8px' }}>Texts</th>
              <th style={{ paddingBottom: '8px' }}>Notes</th>
            </tr>
          </thead>
          <tbody style={{ color: '#444' }}>
            <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
              <td style={{ padding: '8px 0' }}>
                <a href="https://www.perseus.tufts.edu/hopper/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
                  Perseus Digital Library
                </a>
              </td>
              <td style={{ fontFamily: 'monospace' }}>631</td>
              <td style={{ color: '#666' }}>Latin works with translations (Scaife Viewer)</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}>
                <a href="https://philological.cal.bham.ac.uk/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
                  The Philological Museum
                </a>
              </td>
              <td style={{ fontFamily: 'monospace' }}>~200</td>
              <td style={{ color: '#666' }}>British neo-Latin with translations (Dana Sutton)</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <figure style={{
        background: '#f0f8f0',
        border: '1px solid #90c090',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{ color: '#228B22', fontWeight: 600, marginBottom: '12px' }}>The Philological Museum</h4>
        <p style={{ color: '#444', fontSize: '14px' }}>
          Dana Sutton's{" "}
          <a href="https://philological.cal.bham.ac.uk/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Philological Museum
          </a>
          {" "}at the University of Birmingham is a major open-access resource. It contains critical editions of ~200 British neo-Latin texts (plays, poems, letters, essays) from the 16th–17th centuries, most with facing-page English translations. The associated{" "}
          <a href="https://philological.cal.bham.ac.uk/bibliography/index.htm" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Analytic Bibliography
          </a>
          {" "}indexes <strong>79,760 neo-Latin texts</strong> freely available online (though most are Latin-only scans without translations).
        </p>
      </figure>

      <h3 style={{ color: '#9e4a3a', fontSize: '20px', marginTop: '24px' }}>Renaissance &amp; Neo-Latin</h3>
      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <table style={{ width: '100%', fontSize: '14px' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: '#666', borderBottom: '1px solid #e0d8c8' }}>
              <th style={{ paddingBottom: '8px' }}>Series</th>
              <th style={{ paddingBottom: '8px' }}>Vols</th>
              <th style={{ paddingBottom: '8px' }}>Notes</th>
            </tr>
          </thead>
          <tbody style={{ color: '#444' }}>
            <tr>
              <td style={{ padding: '8px 0' }}>
                <a href="https://www.hup.harvard.edu/series/the-i-tatti-renaissance-library" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
                  I Tatti Renaissance Library
                </a>
              </td>
              <td style={{ fontFamily: 'monospace' }}>100</td>
              <td style={{ color: '#666' }}>Italian Renaissance Latin (2001–)</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <h3 style={{ color: '#9e4a3a', fontSize: '20px', marginTop: '24px' }}>Classical Latin</h3>
      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <table style={{ width: '100%', fontSize: '14px' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: '#666', borderBottom: '1px solid #e0d8c8' }}>
              <th style={{ paddingBottom: '8px' }}>Series</th>
              <th style={{ paddingBottom: '8px' }}>Vols</th>
              <th style={{ paddingBottom: '8px' }}>Notes</th>
            </tr>
          </thead>
          <tbody style={{ color: '#444' }}>
            <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
              <td style={{ padding: '8px 0' }}>
                <a href="https://www.loebclassics.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
                  Loeb Classical Library (Latin)
                </a>
              </td>
              <td style={{ fontFamily: 'monospace' }}>~158</td>
              <td style={{ color: '#666' }}>520+ total (Greek &amp; Latin), 1912–</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
              <td style={{ padding: '8px 0' }}>
                <a href="https://www.liverpooluniversitypress.co.uk/topic/book-series/aris-and-phillips-classical-texts" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
                  Aris &amp; Phillips Classical Texts
                </a>
              </td>
              <td style={{ fontFamily: 'monospace' }}>170+</td>
              <td style={{ color: '#666' }}>Greek &amp; Latin, 1979– (~80 Latin)</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}>
                <a href="https://www.penguin.co.uk/penguin-classics/classics-list" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
                  Penguin Classics (Latin)
                </a>
              </td>
              <td style={{ fontFamily: 'monospace' }}>114</td>
              <td style={{ color: '#666' }}>Latin language filter</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <h3 style={{ color: '#9e4a3a', fontSize: '20px', marginTop: '24px' }}>Medieval Latin</h3>
      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <table style={{ width: '100%', fontSize: '14px' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: '#666', borderBottom: '1px solid #e0d8c8' }}>
              <th style={{ paddingBottom: '8px' }}>Series</th>
              <th style={{ paddingBottom: '8px' }}>Vols</th>
              <th style={{ paddingBottom: '8px' }}>Notes</th>
            </tr>
          </thead>
          <tbody style={{ color: '#444' }}>
            <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
              <td style={{ padding: '8px 0' }}>
                <a href="https://global.oup.com/academic/content/series/o/oxford-medieval-texts-omt/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
                  Oxford Medieval Texts
                </a>
              </td>
              <td style={{ fontFamily: 'monospace' }}>103</td>
              <td style={{ color: '#666' }}>Facing-page translations, 1967–</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
              <td style={{ padding: '8px 0' }}>
                <a href="https://domedieval.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
                  Dumbarton Oaks Medieval Library
                </a>
              </td>
              <td style={{ fontFamily: 'monospace' }}>~50</td>
              <td style={{ color: '#666' }}>Latin subseries, 2010–</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
              <td style={{ padding: '8px 0' }}>
                <a href="https://www.medieval.utoronto.ca/research/research-cms/publication-series/toronto-medieval-latin-texts" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
                  Toronto Medieval Latin Texts
                </a>
              </td>
              <td style={{ fontFamily: 'monospace' }}>37</td>
              <td style={{ color: '#666' }}>Pedagogical editions, 1972–</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}>
                <a href="https://www.liverpooluniversitypress.co.uk/topic/book-series/translated-texts-for-historians" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
                  Liverpool Translated Texts for Historians
                </a>
              </td>
              <td style={{ fontFamily: 'monospace' }}>86</td>
              <td style={{ color: '#666' }}>Late Antique/Medieval, includes Greek (~50 Latin)</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <h3 style={{ color: '#9e4a3a', fontSize: '20px', marginTop: '24px' }}>Patristic &amp; Church Fathers</h3>
      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <table style={{ width: '100%', fontSize: '14px' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: '#666', borderBottom: '1px solid #e0d8c8' }}>
              <th style={{ paddingBottom: '8px' }}>Series</th>
              <th style={{ paddingBottom: '8px' }}>Vols</th>
              <th style={{ paddingBottom: '8px' }}>Notes</th>
            </tr>
          </thead>
          <tbody style={{ color: '#444' }}>
            <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
              <td style={{ padding: '8px 0' }}>
                <a href="https://www.cuapress.org/series/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
                  Fathers of the Church (CUA)
                </a>
              </td>
              <td style={{ fontFamily: 'monospace' }}>147</td>
              <td style={{ color: '#666' }}>Latin &amp; Greek, 1947– (~80 Latin)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
              <td style={{ padding: '8px 0' }}>
                <a href="https://www.paulistpress.com/Products/CategoryCenter/PTRL!ACHW/ancient-christian-writers-series.aspx" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
                  Ancient Christian Writers (Paulist)
                </a>
              </td>
              <td style={{ fontFamily: 'monospace' }}>76</td>
              <td style={{ color: '#666' }}>Latin &amp; Greek, 1946– (~40 Latin)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
              <td style={{ padding: '8px 0' }}>
                <a href="https://ccel.org/fathers" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
                  Ante-Nicene/Nicene Post-Nicene Fathers
                </a>
              </td>
              <td style={{ fontFamily: 'monospace' }}>38</td>
              <td style={{ color: '#666' }}>Public domain, 1885–1900</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}>
                <a href="https://www.paulistpress.com/Products/CategoryCenter/COWS/all-titles.aspx" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
                  Classics of Western Spirituality
                </a>
              </td>
              <td style={{ fontFamily: 'monospace' }}>130+</td>
              <td style={{ color: '#666' }}>Mixed languages, 1978– (~40 Latin)</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <h3 style={{ color: '#9e4a3a', fontSize: '20px', marginTop: '24px' }}>The Missing Database</h3>

      <figure style={{
        background: '#fff0f0',
        border: '1px solid #e0a0a0',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{ color: '#9e4a3a', fontWeight: 600, marginBottom: '12px' }}>A Gap in Research Infrastructure</h4>
        <p style={{ color: '#444', fontSize: '14px', marginBottom: '16px' }}>
          <strong>No comprehensive database exists</strong> of which Latin works have been translated into English. The series counts above are our best effort to estimate coverage, but they represent a patchwork, not a systematic catalogue.
        </p>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
          Existing resources fall short:
        </p>
        <ul style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
          <li>
            <a href="https://catalogustranslationum.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>Catalogus Translationum et Commentariorum</a>
            {" "}— tracks Latin translations of Greek classics, not translations <em>from</em> Latin
          </li>
          <li>
            <a href="https://www.unesco.org/xtrans/bsform.aspx" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>UNESCO Index Translationum</a>
            {" "}— only covers 1979–present, not historical translations
          </li>
          <li>
            Publisher series catalogues — scattered across dozens of presses with no aggregation
          </li>
        </ul>
        <p style={{ color: '#444', fontSize: '14px' }}>
          <strong>Building this database is a potential output of this project.</strong> Cross-referencing USTC records with translation series catalogues would produce the first comprehensive map of what's accessible.
        </p>
      </figure>

      <h3 style={{ color: '#9e4a3a', fontSize: '20px', marginTop: '24px' }}>Our Estimate (Rough)</h3>
      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <table style={{ width: '100%', fontSize: '14px' }}>
          <tbody style={{ color: '#444' }}>
            <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
              <td style={{ padding: '8px 0' }}>Named series above (Latin-specific)</td>
              <td style={{ padding: '8px 0', fontFamily: 'monospace', textAlign: 'right' }}>~1,000</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
              <td style={{ padding: '8px 0' }}>Perseus Digital Library (unique works)</td>
              <td style={{ padding: '8px 0', fontFamily: 'monospace', textAlign: 'right' }}>~400</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '8px 0' }}>Other academic presses, dissertations, journals</td>
              <td style={{ padding: '8px 0', fontFamily: 'monospace', textAlign: 'right' }}>~500</td>
            </tr>
            <tr style={{ borderTop: '2px solid #c9a86c' }}>
              <td style={{ padding: '12px 0', fontWeight: 600, color: '#1a1612' }}>Very Rough Total</td>
              <td style={{ padding: '12px 0', fontFamily: 'monospace', fontWeight: 600, color: '#1a1612', textAlign: 'right' }}>~1,500–2,000</td>
            </tr>
          </tbody>
        </table>
        <p style={{ color: '#666', fontSize: '12px', marginTop: '12px' }}>
          This estimate has significant uncertainty. Without a systematic catalogue, we cannot know the true number.
        </p>
      </figure>

      <figure style={{
        background: '#fff9f0',
        border: '1px solid #c9a86c',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{ color: '#c9a86c', fontWeight: 600, marginBottom: '12px' }}>Translation Coverage of Unique Works</h4>
        <p style={{ color: '#444', fontSize: '14px' }}>
          Given our estimate of <strong style={{ color: '#1a1612' }}>~100,000 unique Latin works</strong> in USTC and <strong style={{ color: '#1a1612' }}>~1,500–2,000 translated works</strong>, translation coverage is approximately <strong style={{ color: '#1a1612' }}>1.5–2%</strong> of unique works. The vast majority of Renaissance Latin literature remains untranslated.
        </p>
      </figure>

      <h2>Translation Coverage by Period</h2>

      <p>
        Estimating translation coverage requires defining both the corpus size (denominator) and the number of available translations (numerator) for each historical period. This is complicated by the lack of any systematic scholarly survey. The estimates below synthesize available data from standard reference catalogues and translation series counts.
      </p>

      <h3 style={{ color: '#9e4a3a', fontSize: '20px', marginTop: '24px' }}>Classical Latin (~80% of major literary works)</h3>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{ fontWeight: 600, marginBottom: '12px', color: '#1a1612' }}>Corpus Size</h4>
        <p style={{ color: '#444', fontSize: '14px', marginBottom: '16px' }}>
          The{" "}
          <a href="https://latin.packhum.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Packard Humanities Institute (PHI) Latin Texts
          </a>
          {" "}database contains <strong>362 authors</strong> and claims to include "essentially all Latin literary texts written before A.D. 200"—approximately 7.5 million words. This represents the "canon" of Classical Latin literature.
        </p>
        <h4 style={{ fontWeight: 600, marginBottom: '12px', color: '#1a1612' }}>Translation Coverage</h4>
        <p style={{ color: '#444', fontSize: '14px', marginBottom: '16px' }}>
          For this canonical subset, translation coverage is genuinely high. The Loeb Classical Library provides <strong>200–250 Latin volumes</strong>, Aris &amp; Phillips has published <strong>160+ volumes</strong>, and major authors (Cicero, Virgil, Ovid, Livy) exist in multiple competing translations.
        </p>
        <h4 style={{ fontWeight: 600, marginBottom: '12px', color: '#1a1612' }}>Important Caveat</h4>
        <p style={{ color: '#666', fontSize: '14px' }}>
          The ~80% figure applies only to <em>major literary works</em>. The full Classical Latin corpus is far larger: the{" "}
          <a href="https://cil.bbaw.de/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Corpus Inscriptionum Latinarum
          </a>
          {" "}catalogs <strong>180,000+ inscriptions</strong>, with fewer than 500 translated online (&lt;1%). Including inscriptions, fragments, technical literature, and documentary papyri, coverage of the <em>complete</em> Classical Latin corpus is perhaps 15–25%.
        </p>
      </figure>

      <h3 style={{ color: '#9e4a3a', fontSize: '20px', marginTop: '24px' }}>Patristic Latin / Church Fathers (~35%)</h3>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{ fontWeight: 600, marginBottom: '12px', color: '#1a1612' }}>Corpus Size</h4>
        <p style={{ color: '#444', fontSize: '14px', marginBottom: '16px' }}>
          The{" "}
          <a href="https://about.brepolis.net/clavis-patrum-latinorum/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Clavis Patrum Latinorum (CPL)
          </a>
          {" "}lists <strong>2,348 entries</strong> for Latin Christian texts from Tertullian to Bede, with each entry often subdividing into dozens of individual sermons, letters, or treatises. The Patrologia Latina comprises <strong>221 volumes</strong> totaling over 177,000 pages.
        </p>
        <h4 style={{ fontWeight: 600, marginBottom: '12px', color: '#1a1612' }}>Translation Coverage</h4>
        <p style={{ color: '#444', fontSize: '14px', marginBottom: '16px' }}>
          Major English translation series have produced approximately <strong>350–400 volumes combined</strong>: Fathers of the Church (147), Ancient Christian Writers (~72), Ante-Nicene/Nicene-Post-Nicene Fathers (38), Popular Patristics Series (63), and Corpus Christianorum in Translation (49).
        </p>
        <h4 style={{ fontWeight: 600, marginBottom: '12px', color: '#1a1612' }}>Scholarly Estimate</h4>
        <p style={{ color: '#666', fontSize: '14px' }}>
          One scholarly assessment states: "I would venture to guess—but a studied guess—that <strong>60–70% of the extant patristic literature has never been translated into English</strong>." Even Augustine—with 132 works totaling 5 million surviving words—achieved his first complete English translation only through the ongoing New City Press project (44–45 of 49 planned volumes as of 2024).
        </p>
      </figure>

      <h3 style={{ color: '#9e4a3a', fontSize: '20px', marginTop: '24px' }}>Medieval Latin (~10%)</h3>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{ fontWeight: 600, marginBottom: '12px', color: '#1a1612' }}>Corpus Size</h4>
        <p style={{ color: '#444', fontSize: '14px', marginBottom: '16px' }}>
          The scale of Medieval Latin defies easy quantification.{" "}
          <a href="https://global.oup.com/academic/product/a-handlist-of-the-latin-writers-of-great-britain-and-ireland-before-1540-9780888441065" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Sharpe's <em>Handlist of Latin Writers of Great Britain and Ireland</em>
          </a>
          {" "}alone identifies <strong>5,200+ Latin works</strong>—and covers only the British Isles. A 2009 study by Buringh and van Zanden estimated that <strong>2.9 million medieval manuscripts</strong> survive globally.
        </p>
        <h4 style={{ fontWeight: 600, marginBottom: '12px', color: '#1a1612' }}>Translation Coverage</h4>
        <p style={{ color: '#444', fontSize: '14px', marginBottom: '16px' }}>
          Major translation series have produced perhaps <strong>250–350 Medieval Latin volumes</strong> over six decades: Oxford Medieval Texts (100+), Dumbarton Oaks Medieval Library (~41 Latin volumes), Toronto Medieval Latin Texts (37).
        </p>
        <h4 style={{ fontWeight: 600, marginBottom: '12px', color: '#1a1612' }}>Scholarly Estimate</h4>
        <p style={{ color: '#666', fontSize: '14px' }}>
          A 2023 scholarly assessment from{" "}
          <a href="https://foundinantiquity.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Found in Antiquity
          </a>
          {" "}states: "I have heard it estimated that over <strong>90–95% of our surviving Latin texts remain untranslated</strong>... The percentage of literary texts from Antiquity and even more so from the Middle Ages that have never been translated into any modern language is overwhelming." Even Thomas Aquinas—arguably the best-translated medieval author—has "a substantial amount" of writings still untranslated per the <em>Oxford Handbook of Aquinas</em>.
        </p>
      </figure>

      <h3 style={{ color: '#9e4a3a', fontSize: '20px', marginTop: '24px' }}>Renaissance &amp; Early Modern Latin (~2%)</h3>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{ fontWeight: 600, marginBottom: '12px', color: '#1a1612' }}>Corpus Size</h4>
        <p style={{ color: '#444', fontSize: '14px', marginBottom: '16px' }}>
          The{" "}
          <a href="https://www.ustc.ac.uk/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Universal Short Title Catalogue
          </a>
          {" "}now contains <strong>1.65 million editions</strong> for 1450–1700. Our analysis identifies ~533,000 Latin editions, representing approximately <strong>80,000–120,000 unique works</strong> after deduplication. The{" "}
          <a href="https://global.oup.com/academic/product/the-oxford-handbook-of-neo-latin-9780190857820" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Oxford Handbook of Neo-Latin
          </a>
          {" "}notes that the Neo-Latin corpus "is currently simply unquantifiable" but "dwarfs that of Latin in all other periods combined"—approximately <strong>95% of all extant Latin texts</strong> date from the Renaissance onward.
        </p>
        <h4 style={{ fontWeight: 600, marginBottom: '12px', color: '#1a1612' }}>Translation Coverage</h4>
        <p style={{ color: '#444', fontSize: '14px', marginBottom: '16px' }}>
          Translation resources remain modest: the{" "}
          <a href="https://www.hup.harvard.edu/series/the-i-tatti-renaissance-library" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            I Tatti Renaissance Library
          </a>
          {" "}reached its <strong>100th volume</strong> in March 2025; the Collected Works of Erasmus has published 66 of 89 planned volumes for <em>one author's output alone</em>. A realistic count of English translations yields <strong>1,500–3,000 works</strong>.
        </p>
        <h4 style={{ fontWeight: 600, marginBottom: '12px', color: '#1a1612' }}>Calculation</h4>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Applying our methodology: 2,000 translations ÷ 100,000 unique works = <strong>~2%</strong>. If using the full USTC scale (650,000+ Latin editions), the figure drops to <strong>~0.3%</strong>. The 2% estimate is conservative.
        </p>
      </figure>

      <figure style={{
        background: '#fff9f0',
        border: '1px solid #c9a86c',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{ color: '#c9a86c', fontWeight: 600, marginBottom: '12px' }}>The Translation Decay Curve</h4>
        <p style={{ color: '#444', fontSize: '14px', marginBottom: '16px' }}>
          As the volume of Latin texts increases exponentially through history, the percentage of available translations drops precipitously:
        </p>
        <div style={{
          background: '#f5f0e8',
          borderRadius: '6px',
          padding: '16px',
          margin: '16px 0',
        }}>
          <table style={{ width: '100%', fontSize: '14px' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#666', borderBottom: '1px solid #e0d8c8' }}>
                <th style={{ paddingBottom: '8px' }}>Period</th>
                <th style={{ paddingBottom: '8px' }}>Estimated Coverage</th>
                <th style={{ paddingBottom: '8px' }}>Corpus Source</th>
              </tr>
            </thead>
            <tbody style={{ color: '#444' }}>
              <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
                <td style={{ padding: '8px 0' }}>Classical</td>
                <td style={{ padding: '8px 0' }}>~80% (literary canon)</td>
                <td style={{ padding: '8px 0', color: '#666' }}>PHI Latin Texts</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
                <td style={{ padding: '8px 0' }}>Patristic</td>
                <td style={{ padding: '8px 0' }}>~35%</td>
                <td style={{ padding: '8px 0', color: '#666' }}>Clavis Patrum Latinorum</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
                <td style={{ padding: '8px 0' }}>Medieval</td>
                <td style={{ padding: '8px 0' }}>~10%</td>
                <td style={{ padding: '8px 0', color: '#666' }}>Sharpe's Handlist + ms. surveys</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0' }}>Renaissance</td>
                <td style={{ padding: '8px 0' }}>~2%</td>
                <td style={{ padding: '8px 0', color: '#666' }}>USTC</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ color: '#666', fontSize: '12px', marginTop: '12px' }}>
          All figures are order-of-magnitude estimates with substantial uncertainty (±50%). No systematic scholarly survey of translation coverage exists for any period.
        </p>
      </figure>

      <h2>OCR and Searchability</h2>

      <p>
        Having a digital scan does not mean the text is searchable. OCR (Optical Character Recognition) quality varies dramatically for early printed books.
      </p>

      <h3 style={{ color: '#9e4a3a', fontSize: '20px', marginTop: '24px' }}>OCR Accuracy Research</h3>
      <p>
        Academic studies on OCR accuracy for historical prints show:
      </p>
      <ul>
        <li>
          <strong style={{ color: '#1a1612' }}>Modern documents</strong>: 99%+ character accuracy
        </li>
        <li>
          <strong style={{ color: '#1a1612' }}>19th century prints</strong>: 98%+ with general OCR models
        </li>
        <li>
          <strong style={{ color: '#1a1612' }}>Early modern prints (pre-1800)</strong>: 40%+ error rates with untrained models due to blackletter fonts, abbreviations, and regional type variations
        </li>
        <li>
          <strong style={{ color: '#1a1612' }}>With specialized training</strong>: 94–98% accuracy achievable on individual books
        </li>
      </ul>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
        Sources:{" "}
        <a href="https://www.digitalhumanities.org/dhq/vol/11/2/000288/000288.html" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
          Springmann &amp; Lüdeling (2017)
        </a>
        ,{" "}
        <a href="https://arxiv.org/abs/1711.09670" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
          Reul et al. (2017)
        </a>
      </p>

      <h3 style={{ color: '#9e4a3a', fontSize: '20px', marginTop: '24px' }}>Text Creation Partnership (TCP)</h3>
      <p>
        The{" "}
        <a href="https://textcreationpartnership.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
          Text Creation Partnership
        </a>
        {" "}has produced the gold standard for early modern text transcription:
      </p>
      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <ul style={{ color: '#444', fontSize: '14px', lineHeight: 1.8 }}>
          <li><strong style={{ color: '#1a1612' }}>70,000+</strong> transcribed and encoded texts</li>
          <li><strong style={{ color: '#1a1612' }}>1 billion+</strong> searchable words</li>
          <li><strong style={{ color: '#1a1612' }}>99.995%</strong> accuracy (double-keyed transcription)</li>
          <li><strong style={{ color: '#1a1612' }}>~60,000</strong> texts from EEBO-TCP specifically</li>
        </ul>
        <p style={{ color: '#666', fontSize: '12px', marginTop: '12px' }}>
          Source:{" "}
          <a href="https://textcreationpartnership.org/tcp-texts/eebo-tcp-early-english-books-online/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            TCP Website
          </a>
        </p>
      </figure>

      <figure style={{
        background: '#fff9f0',
        border: '1px solid #c9a86c',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{ color: '#c9a86c', fontWeight: 600, marginBottom: '12px' }}>Critical Limitation</h4>
        <p style={{ color: '#444', fontSize: '14px' }}>
          EEBO-TCP focuses on <strong>English-language</strong> books from the British Isles. Latin works from continental Europe—the vast majority of Latin printing—are not covered by TCP transcription efforts.
        </p>
      </figure>

      <h2>Confidence Levels</h2>

      <p>
        Not all claims on this site carry equal certainty. We assign explicit confidence levels to help readers assess our estimates:
      </p>

      <figure style={{
        background: '#fff9f0',
        border: '1px solid #c9a86c',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0d8c8' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Claim</th>
              <th style={{ textAlign: 'center', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Confidence</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Basis</th>
            </tr>
          </thead>
          <tbody style={{ color: '#444' }}>
            <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
              <td style={{ padding: '12px 8px' }}>533,307 Latin editions in USTC</td>
              <td style={{ padding: '12px 8px', textAlign: 'center' }}><span style={{ background: '#2ecc71', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>HIGH</span></td>
              <td style={{ padding: '12px 8px', color: '#666' }}>Direct USTC database query</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
              <td style={{ padding: '12px 8px' }}>80,000–120,000 unique works</td>
              <td style={{ padding: '12px 8px', textAlign: 'center' }}><span style={{ background: '#f39c12', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>MEDIUM</span></td>
              <td style={{ padding: '12px 8px', color: '#666' }}>Author+title deduplication estimate</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
              <td style={{ padding: '12px 8px' }}>1,500–2,000 English translations exist</td>
              <td style={{ padding: '12px 8px', textAlign: 'center' }}><span style={{ background: '#f39c12', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>MEDIUM</span></td>
              <td style={{ padding: '12px 8px', color: '#666' }}>Aggregated series counts</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
              <td style={{ padding: '12px 8px' }}>~2% overall translation rate</td>
              <td style={{ padding: '12px 8px', textAlign: 'center' }}><span style={{ background: '#f39c12', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>MEDIUM</span></td>
              <td style={{ padding: '12px 8px', color: '#666' }}>Derived from above estimates</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
              <td style={{ padding: '12px 8px' }}>Field-by-field translation rates</td>
              <td style={{ padding: '12px 8px', textAlign: 'center' }}><span style={{ background: '#e67e22', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>LOW-MED</span></td>
              <td style={{ padding: '12px 8px', color: '#666' }}>Extrapolated from series focus areas</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 8px' }}>Specific work counts by field</td>
              <td style={{ padding: '12px 8px', textAlign: 'center' }}><span style={{ background: '#e74c3c', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>LOW</span></td>
              <td style={{ padding: '12px 8px', color: '#666' }}>No systematic catalog exists</td>
            </tr>
          </tbody>
        </table>
        <p style={{ color: '#666', fontSize: '12px', marginTop: '16px' }}>
          We report translation rates rather than work counts on the homepage because the numerator (translated works) is more tractable than the denominator (total works by field).
        </p>
      </figure>

      <h2>Summary of Key Findings</h2>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '0',
        margin: '32px 0',
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#e0d8c8' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Metric</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Value</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Source</th>
            </tr>
          </thead>
          <tbody style={{ color: '#444' }}>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Total USTC editions (all languages)</td>
              <td style={{ padding: '12px', fontFamily: 'monospace' }}>1.65 million</td>
              <td style={{ padding: '12px', color: '#666' }}>USTC website (2025)</td>
            </tr>
            <tr style={{ background: '#faf8f4', borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Latin editions (USTC)</td>
              <td style={{ padding: '12px', fontFamily: 'monospace' }}>533,307</td>
              <td style={{ padding: '12px', color: '#666' }}>USTC query (Dec 2025)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Unique author+title pairs (Latin)</td>
              <td style={{ padding: '12px', fontFamily: 'monospace' }}>~150,000</td>
              <td style={{ padding: '12px', color: '#666' }}>Our deduplication analysis</td>
            </tr>
            <tr style={{ background: '#faf8f4', borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Estimated unique Latin works</td>
              <td style={{ padding: '12px', fontFamily: 'monospace' }}>80,000–120,000</td>
              <td style={{ padding: '12px', color: '#666' }}>Conservative estimate after variant titles</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Editions with digital scans (all languages)</td>
              <td style={{ padding: '12px', fontFamily: 'monospace' }}>~450,000 (27%)</td>
              <td style={{ padding: '12px', color: '#666' }}>USTC digital links</td>
            </tr>
            <tr style={{ background: '#faf8f4', borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>High-quality transcriptions (English texts only)</td>
              <td style={{ padding: '12px', fontFamily: 'monospace' }}>~60,000</td>
              <td style={{ padding: '12px', color: '#666' }}>EEBO-TCP</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Latin works with English translations</td>
              <td style={{ padding: '12px', fontFamily: 'monospace' }}>1,500–2,000</td>
              <td style={{ padding: '12px', color: '#666' }}>Aggregated series counts</td>
            </tr>
            <tr style={{ background: '#faf8f4' }}>
              <td style={{ padding: '12px' }}>Translation coverage (of unique works)</td>
              <td style={{ padding: '12px', fontFamily: 'monospace' }}>~1.5–2%</td>
              <td style={{ padding: '12px', color: '#666' }}>Derived (translations ÷ unique works)</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <h2 style={{ borderTop: '1px solid #e0d8c8', paddingTop: '32px', marginTop: '48px' }}>References</h2>

      <ul style={{ color: '#666', fontSize: '14px', lineHeight: 2 }}>
        <li>
          Universal Short Title Catalogue.{" "}
          <a href="https://www.ustc.ac.uk/about" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            About Page
          </a>
          . University of St Andrews.
        </li>
        <li>
          "Celebrating 30 years of USTC."{" "}
          <a href="https://staffnews.wp.st-andrews.ac.uk/2025/10/29/30-years-of-universal-short-title-catalogue/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            St Andrews Staff News
          </a>
          . October 2025. (1.65 million editions, 7 million copies, 10,000+ institutions)
        </li>
        <li>
          Perseus Digital Library.{" "}
          <a href="https://scaife.perseus.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Scaife Viewer
          </a>
          . Tufts University. 631 Latin works.
        </li>
        <li>
          Text Creation Partnership.{" "}
          <a href="https://textcreationpartnership.org/tcp-texts/eebo-tcp-early-english-books-online/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            EEBO-TCP
          </a>
          . University of Michigan / ProQuest.
        </li>
        <li>
          Springmann, U. &amp; Lüdeling, A. (2017). "OCR of historical printings with an application to building diachronic corpora."{" "}
          <a href="https://www.digitalhumanities.org/dhq/vol/11/2/000288/000288.html" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Digital Humanities Quarterly 11(2)
          </a>
          .
        </li>
        <li>
          I Tatti Renaissance Library.{" "}
          <a href="https://www.hup.harvard.edu/series/the-i-tatti-renaissance-library" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Harvard University Press
          </a>
          . 100 volumes as of March 2025.
        </li>
        <li>
          Loeb Classical Library.{" "}
          <a href="https://www.loebclassics.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Harvard University Press
          </a>
          . ~520 volumes total (Greek and Latin).
        </li>
        <li>
          Oxford Medieval Texts.{" "}
          <a href="https://global.oup.com/academic/content/series/o/oxford-medieval-texts-omt/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Oxford University Press
          </a>
          . 103 volumes.
        </li>
        <li>
          Fathers of the Church.{" "}
          <a href="https://www.cuapress.org/series/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Catholic University of America Press
          </a>
          . 147 volumes.
        </li>
        <li>
          Aris &amp; Phillips Classical Texts.{" "}
          <a href="https://www.liverpooluniversitypress.co.uk/topic/book-series/aris-and-phillips-classical-texts" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Liverpool University Press
          </a>
          . 170+ volumes.
        </li>
        <li>
          Sutton, Dana F. (ed.). The Philological Museum.{" "}
          <a href="https://philological.cal.bham.ac.uk/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            University of Birmingham
          </a>
          . ~200 British neo-Latin texts with translations.
        </li>
      </ul>

      <h3 style={{ color: '#9e4a3a', fontSize: '18px', marginTop: '32px' }}>Corpus Catalogues</h3>
      <ul style={{ color: '#666', fontSize: '14px', lineHeight: 2 }}>
        <li>
          Packard Humanities Institute.{" "}
          <a href="https://latin.packhum.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            PHI Latin Texts
          </a>
          . 362 authors, ~7.5 million words of Classical Latin.
        </li>
        <li>
          Dekkers, E. &amp; Gaar, A. (eds.).{" "}
          <a href="https://about.brepolis.net/clavis-patrum-latinorum/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Clavis Patrum Latinorum
          </a>
          . Brepols. 2,348 entries for Latin Christian texts (Tertullian to Bede).
        </li>
        <li>
          <a href="https://cil.bbaw.de/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            Corpus Inscriptionum Latinarum
          </a>
          . Berlin-Brandenburgische Akademie der Wissenschaften. 180,000+ Latin inscriptions.
        </li>
        <li>
          Sharpe, R. (1997).{" "}
          <a href="https://global.oup.com/academic/product/a-handlist-of-the-latin-writers-of-great-britain-and-ireland-before-1540-9780888441065" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            <em>A Handlist of the Latin Writers of Great Britain and Ireland before 1540</em>
          </a>
          . Pontifical Institute of Mediaeval Studies. 5,200+ works (British Isles only).
        </li>
        <li>
          Ford, P., Bloemendal, J. &amp; Fantazzi, C. (eds.). (2014).{" "}
          <a href="https://global.oup.com/academic/product/the-oxford-handbook-of-neo-latin-9780190857820" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            <em>The Oxford Handbook of Neo-Latin</em>
          </a>
          . Oxford University Press.
        </li>
        <li>
          Buringh, E. &amp; van Zanden, J.L. (2009). "Charting the 'Rise of the West': Manuscripts and Printed Books in Europe, A Long-Term Perspective."{" "}
          <em>Journal of Economic History</em> 69(2), 409–445. (2.9 million surviving medieval manuscripts estimated)
        </li>
      </ul>

      <h3 style={{ color: '#9e4a3a', fontSize: '18px', marginTop: '32px' }}>Scholarly Estimates on Translation Coverage</h3>
      <ul style={{ color: '#666', fontSize: '14px', lineHeight: 2 }}>
        <li>
          Found in Antiquity. (2023).{" "}
          <a href="https://foundinantiquity.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>
            "On Translation Coverage of Latin Texts"
          </a>
          . (Estimate: 90–95% of surviving Latin texts remain untranslated)
        </li>
        <li>
          Patristics scholars estimate 60–70% of extant patristic literature has never been translated into English. (Scholarly consensus cited in multiple sources)
        </li>
        <li>
          Stump, E. &amp; Kretzmann, N. (eds.). (2005).{" "}
          <em>The Cambridge Companion to Augustine</em>. Cambridge University Press. (Notes on Augustine's 132 works, 5 million words)
        </li>
        <li>
          Davies, B. &amp; Stump, E. (eds.). (2012).{" "}
          <em>The Oxford Handbook of Aquinas</em>. Oxford University Press. (Notes on untranslated Aquinas writings)
        </li>
      </ul>
    </BlogLayout>
  );
}
