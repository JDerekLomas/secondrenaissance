import BlogLayout from "../BlogLayout";
import { generateBlogMetadata, generateArticleJsonLd } from "@/lib/blogMetadata";

const postMeta = {
  title: "Hunting for Translations: A Day Mapping the Latin-English Landscape",
  description: "How many Latin works have been translated into English? I catalogued 3,232 translation volumes across 45+ sources to find out.",
  slug: "hunting-for-translations",
  date: "2025-11-22",
};

export const metadata = generateBlogMetadata(postMeta);
const jsonLd = generateArticleJsonLd(postMeta);

export default function HuntingForTranslations() {
  return (
    <BlogLayout
      title="Hunting for Translations: A Day Mapping the Latin-English Landscape"
      tag="Research Report"
      slug="hunting-for-translations"
      prevPost={{ href: "/blog/esoteric-timeline", title: "Esoteric Timeline" }}
      jsonLd={jsonLd}
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '22px',
        lineHeight: 1.6,
        color: '#444',
        marginBottom: '32px',
      }}>
        How many Latin works have been translated into English? No one knows. Today I tried to find out by cataloguing every major translation series, open-access repository, and scholarly resource. The results surprised me.
      </p>

      <h2>The Discovery</h2>

      <p>
        I started with a simple question: if someone wanted to read Renaissance Latin literature in English, what would they find? The answer turned out to be: far more than most people realize, yet far less than we need.
      </p>

      <p>
        After combing through dozens of sources—from Harvard&apos;s Loeb Classical Library to obscure academic repositories—I compiled a comprehensive inventory. The final count:
      </p>

      <div style={{
        background: 'linear-gradient(135deg, #f5f0e8 0%, #e0d8c8 100%)',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '48px',
        margin: '32px 0',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '64px', fontWeight: 'bold', color: '#9e4a3a', marginBottom: '8px' }}>3,232</div>
        <div style={{ fontSize: '20px', color: '#444' }}>translation volumes catalogued</div>
        <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>1,679 commercial + 1,553 open access</div>
      </div>

      <h2>The Major Series</h2>

      <p>
        Academic publishers have been building Latin translation libraries for over a century. Here are the major players:
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        overflow: 'hidden',
        margin: '32px 0',
      }}>
        <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#e0d8c8' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Series</th>
              <th style={{ textAlign: 'right', padding: '12px', color: '#1a1612' }}>Volumes</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Period</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Loeb Classical Library</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#546b8a' }}>545</td>
              <td style={{ padding: '12px', color: '#666' }}>~280 Latin</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Aris & Phillips</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#546b8a' }}>170</td>
              <td style={{ padding: '12px', color: '#666' }}>Classical</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Fathers of the Church</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#546b8a' }}>147</td>
              <td style={{ padding: '12px', color: '#666' }}>Patristic</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Penguin Classics (Latin)</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#546b8a' }}>114</td>
              <td style={{ padding: '12px', color: '#666' }}>Various</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Oxford Medieval Texts</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#546b8a' }}>103</td>
              <td style={{ padding: '12px', color: '#666' }}>Medieval</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>I Tatti Renaissance Library</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#546b8a' }}>100</td>
              <td style={{ padding: '12px', color: '#666' }}>Renaissance</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Dumbarton Oaks Medieval</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#546b8a' }}>91</td>
              <td style={{ padding: '12px', color: '#666' }}>Medieval (~45 Latin)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Translated Texts for Historians</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#546b8a' }}>86</td>
              <td style={{ padding: '12px', color: '#666' }}>Late Antique (~50 Latin)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Collected Works of Erasmus</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#546b8a' }}>86+</td>
              <td style={{ padding: '12px', color: '#666' }}>Renaissance</td>
            </tr>
            <tr>
              <td style={{ padding: '12px' }}>Ancient Christian Writers</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#546b8a' }}>76</td>
              <td style={{ padding: '12px', color: '#666' }}>Patristic</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <h2>The Hidden Treasure: Open Access</h2>

      <p>
        The commercial series are impressive, but the real revelation was how much exists in open access—legally free to read online. I found over 1,500 volumes:
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        overflow: 'hidden',
        margin: '32px 0',
      }}>
        <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#e0d8c8' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Resource</th>
              <th style={{ textAlign: 'right', padding: '12px', color: '#1a1612' }}>Content</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Access</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Internet Archive - Loeb</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#2ecc71' }}>545 vols</td>
              <td style={{ padding: '12px', color: '#666' }}>archive.org</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Loebolus (pre-1928)</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#2ecc71' }}>277 vols</td>
              <td style={{ padding: '12px', color: '#666' }}>ryanfb.github.io/loebolus</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Philological Museum</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#2ecc71' }}>200+ texts</td>
              <td style={{ padding: '12px', color: '#666' }}>philological.cal.bham.ac.uk</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Global Medieval Sourcebook</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#2ecc71' }}>200 texts</td>
              <td style={{ padding: '12px', color: '#666' }}>Stanford</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Internet Archive - Fathers</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#2ecc71' }}>147 vols</td>
              <td style={{ padding: '12px', color: '#666' }}>archive.org</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Perseus Digital Library</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#2ecc71' }}>50+ texts</td>
              <td style={{ padding: '12px', color: '#666' }}>perseus.tufts.edu</td>
            </tr>
            <tr>
              <td style={{ padding: '12px' }}>Ian Bruce Scientific</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#2ecc71' }}>30 works</td>
              <td style={{ padding: '12px', color: '#666' }}>17centurymaths.com</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <h2>A Key Find: The Philological Museum</h2>

      <p>
        One resource stood out: Dana F. Sutton&apos;s <strong style={{ color: '#1a1612' }}>Philological Museum</strong> at the University of Birmingham. This is a goldmine that most people don&apos;t know exists.
      </p>

      <div style={{
        background: '#f5f0e8',
        border: '1px solid #c9a86c',
        borderLeft: '4px solid #c9a86c',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#c9a86c' }}>
          The Philological Museum
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#444' }}>
          <li><strong style={{ color: '#1a1612' }}>79,760 items</strong> in the Analytic Bibliography of Neo-Latin Texts</li>
          <li><strong style={{ color: '#1a1612' }}>200+ full texts</strong> with English translations</li>
          <li>Focus: British neo-Latin literature (16th-17th century)</li>
          <li>Includes plays, poems, letters, essays from major humanists</li>
          <li>All freely accessible online</li>
        </ul>
      </div>

      <p>
        I extracted metadata from 89 of their texts, covering 54 unique authors from 1459 to 1808. Authors like George Buchanan, William Camden, Abraham Cowley, John Milton—all with Latin works translated and available for free.
      </p>

      <h2>Translation Coverage by Period</h2>

      <p>Here&apos;s what struck me most: coverage is wildly uneven across historical periods.</p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#444' }}>Classical (240 BCE - 600 CE)</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#2ecc71' }}>70-80% translated</span>
            </div>
            <div style={{ width: '100%', background: '#e0d8c8', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ background: '#2ecc71', height: '12px', width: '75%' }}></div>
            </div>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', margin: 0 }}>362 known authors, 6.3M words in PHI corpus</p>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#444' }}>Patristic (100 - 800 CE)</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#546b8a' }}>60-70% translated</span>
            </div>
            <div style={{ width: '100%', background: '#e0d8c8', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ background: '#546b8a', height: '12px', width: '65%' }}></div>
            </div>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', margin: 0 }}>~150 major Church Fathers</p>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#444' }}>Medieval (600 - 1450 CE)</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#c9a86c' }}>20-30% translated</span>
            </div>
            <div style={{ width: '100%', background: '#e0d8c8', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ background: '#c9a86c', height: '12px', width: '25%' }}></div>
            </div>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', margin: 0 }}>750,000 surviving manuscripts, 10,000+ authors</p>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#444' }}>Renaissance (1450 - 1700)</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#9e4a3a' }}>&lt;2% translated</span>
            </div>
            <div style={{ width: '100%', background: '#e0d8c8', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ background: '#9e4a3a', height: '12px', width: '2%' }}></div>
            </div>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', margin: 0 }}>800,000-1,100,000 Latin editions in USTC</p>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#444' }}>Scientific/Enlightenment (1600 - 1900)</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#9e4a3a' }}>&lt;1% translated</span>
            </div>
            <div style={{ width: '100%', background: '#e0d8c8', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ background: '#9e4a3a', height: '12px', width: '1%' }}></div>
            </div>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', margin: 0 }}>Euler alone wrote 800+ Latin works</p>
          </div>
        </div>
      </figure>

      <h2>The Sobering Math</h2>

      <p>
        The Brepols <em>Library of Latin Texts</em> contains 167 million words across 12,149 works by 1,950 authors. That&apos;s the largest digitized corpus of Latin literature.
      </p>

      <p>
        My estimate of translated words: <strong style={{ color: '#1a1612' }}>5-10 million</strong>. That means only <strong style={{ color: '#9e4a3a' }}>3-6% of Latin literature</strong> has ever been translated into English.
      </p>

      <p>
        For the Renaissance period specifically, the picture is starker. USTC records over 800,000 Latin editions. We have perhaps 15,000-20,000 translations. That&apos;s <strong style={{ color: '#9e4a3a' }}>less than 2%</strong>.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1a1612' }}>
          The Scale at a Glance
        </h3>
        <pre style={{ fontFamily: 'Monaco, Courier, monospace', fontSize: '14px', color: '#444', margin: 0, whiteSpace: 'pre', overflowX: 'auto' }}>
{`LATIN LITERATURE:
├── Library of Latin Texts:     167,000,000 words
├── Classical (pre-200 CE):       6,321,361 words
├── Medieval MSS surviving:         750,000 manuscripts
└── USTC Latin editions:       800,000-1,100,000 editions

TRANSLATED TO ENGLISH:
├── Estimated works:              8,000-15,000
├── Estimated words:              5-10 million
└── Translation series volumes:   3,232

COVERAGE RATE:                    3-6%`}
        </pre>
      </figure>

      <h2>What&apos;s Still Missing</h2>

      <p>The biggest gaps aren&apos;t in the areas you might expect:</p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        overflow: 'hidden',
        margin: '32px 0',
      }}>
        <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#e0d8c8' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Gap Area</th>
              <th style={{ textAlign: 'right', padding: '12px', color: '#1a1612' }}>Estimated Untranslated</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Neo-Latin Poetry (1450-1700)</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#9e4a3a' }}>~100,000+ works</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Humanist Correspondence</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#9e4a3a' }}>500,000+ letters</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Scientific Latin (1500-1800)</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#9e4a3a' }}>Euler: 800+; countless others</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>University Dissertations</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#9e4a3a' }}>Hundreds of thousands</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Legal Commentaries</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#9e4a3a' }}>Foundational texts untranslated</td>
            </tr>
            <tr>
              <td style={{ padding: '12px' }}>Religious Controversy</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', color: '#9e4a3a' }}>Massive corpus, selections only</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <h2>What This Means</h2>

      <p>
        We&apos;re in a strange situation. On one hand, there&apos;s more accessible Latin translation than most people realize—thousands of volumes in open access, free to read online. On the other hand, 94-97% of the Latin corpus remains locked away from anyone who can&apos;t read the original.
      </p>

      <p>
        Traditional scholarly translation adds maybe 50-100 new translations per year. At that rate, we&apos;d need 10,000 years to translate the remaining Renaissance Latin alone.
      </p>

      <p>
        This is where AI translation becomes interesting. Not as a replacement for scholarly translation, but as a way to provide &ldquo;good enough&rdquo; access to the vast majority of texts that will <em>never</em> receive professional attention. The perfect shouldn&apos;t be the enemy of the possible.
      </p>

      <h2>Next Steps</h2>

      <p>I&apos;ve uploaded the full research data to our repository:</p>

      <ul>
        <li><code style={{ fontFamily: 'Monaco, Courier, monospace', fontSize: '13px', background: '#f5f0e8', padding: '2px 6px', borderRadius: '4px', color: '#546b8a' }}>latin_translations_comprehensive.json</code> — 45+ sources catalogued</li>
        <li><code style={{ fontFamily: 'Monaco, Courier, monospace', fontSize: '13px', background: '#f5f0e8', padding: '2px 6px', borderRadius: '4px', color: '#546b8a' }}>philological_museum_texts.json</code> — 89 texts extracted from the Philological Museum</li>
        <li><code style={{ fontFamily: 'Monaco, Courier, monospace', fontSize: '13px', background: '#f5f0e8', padding: '2px 6px', borderRadius: '4px', color: '#546b8a' }}>translation_search_strategy.md</code> — methodology for finding more translations</li>
        <li><code style={{ fontFamily: 'Monaco, Courier, monospace', fontSize: '13px', background: '#f5f0e8', padding: '2px 6px', borderRadius: '4px', color: '#546b8a' }}>LATIN_TRANSLATIONS_REPORT.md</code> — full statistical analysis</li>
      </ul>

      <p>
        The database isn&apos;t complete—translations are scattered across thousands of academic journals and dissertations that no one has systematically catalogued. But it&apos;s a start.
      </p>

      <p>
        The 3,232 volumes we&apos;ve identified represent centuries of scholarly work. They&apos;re the foundation we can build on. The question now is: how do we responsibly use AI to extend that foundation to the other 97%?
      </p>
    </BlogLayout>
  );
}
