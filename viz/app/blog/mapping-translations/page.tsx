import BlogLayout from "../BlogLayout";
import { generateBlogMetadata, generateArticleJsonLd } from "@/lib/blogMetadata";

const postMeta = {
  title: "Mapping the Translation Landscape: A Research Diary",
  description: "How do you count something that's never been counted? Building a comprehensive database of Latin-to-English translations.",
  slug: "mapping-translations",
  date: "2025-11-20",
};

export const metadata = generateBlogMetadata(postMeta);
const jsonLd = generateArticleJsonLd(postMeta);

export default function MappingTranslations() {
  return (
    <BlogLayout
      title="Mapping the Translation Landscape: A Research Diary"
      tag="Methods"
      slug="mapping-translations"
      jsonLd={jsonLd}
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '22px',
        lineHeight: 1.6,
        color: '#444',
        marginBottom: '32px',
      }}>
        How do you count something that&apos;s never been counted? Today we built a comprehensive database of Latin-to-English translations—and discovered how much we don&apos;t know.
      </p>

      <h2>The Problem</h2>

      <p>
        We wanted to answer a simple question: <em>How much Latin has been translated into English?</em>
      </p>

      <p>
        It turns out nobody knows. There&apos;s no master list of Latin translations. Publishers don&apos;t track them. Libraries catalog by title, not by source language. Academics work in silos. The result: a vast body of translation work exists, but it&apos;s scattered across dozens of series, hundreds of publishers, and centuries of scholarship.
      </p>

      <h2>Phase 1: The Major Series</h2>

      <p>
        We started with the obvious: major translation series from academic publishers.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1a1612' }}>
          Commercial Translation Series
        </h3>
        <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <th style={{ textAlign: 'left', padding: '8px 0', color: '#1a1612' }}>Series</th>
              <th style={{ textAlign: 'right', padding: '8px 0', color: '#1a1612' }}>Volumes</th>
              <th style={{ textAlign: 'left', paddingLeft: '16px', padding: '8px 0', color: '#1a1612' }}>Publisher</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f5f0e8' }}>
              <td style={{ padding: '8px 0' }}>Loeb Classical Library</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '8px 0', color: '#546b8a' }}>537-558</td>
              <td style={{ paddingLeft: '16px', padding: '8px 0', color: '#666' }}>Harvard</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f5f0e8' }}>
              <td style={{ padding: '8px 0' }}>Aris & Phillips Classical Texts</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '8px 0', color: '#546b8a' }}>170+</td>
              <td style={{ paddingLeft: '16px', padding: '8px 0', color: '#666' }}>Liverpool</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f5f0e8' }}>
              <td style={{ padding: '8px 0' }}>Fathers of the Church</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '8px 0', color: '#546b8a' }}>147-148</td>
              <td style={{ paddingLeft: '16px', padding: '8px 0', color: '#666' }}>CUA Press</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f5f0e8' }}>
              <td style={{ padding: '8px 0' }}>Oxford Medieval Texts</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '8px 0', color: '#546b8a' }}>~103</td>
              <td style={{ paddingLeft: '16px', padding: '8px 0', color: '#666' }}>OUP</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f5f0e8' }}>
              <td style={{ padding: '8px 0' }}>I Tatti Renaissance Library</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '8px 0', color: '#546b8a' }}>101</td>
              <td style={{ paddingLeft: '16px', padding: '8px 0', color: '#666' }}>Harvard</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f5f0e8' }}>
              <td style={{ padding: '8px 0' }}>Dumbarton Oaks Medieval Library</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '8px 0', color: '#546b8a' }}>91 (34 Latin)</td>
              <td style={{ paddingLeft: '16px', padding: '8px 0', color: '#666' }}>Harvard</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f5f0e8' }}>
              <td style={{ padding: '8px 0' }}>Translated Texts for Historians</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '8px 0', color: '#546b8a' }}>86+</td>
              <td style={{ paddingLeft: '16px', padding: '8px 0', color: '#666' }}>Liverpool</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f5f0e8' }}>
              <td style={{ padding: '8px 0' }}>Collected Works of Erasmus</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '8px 0', color: '#546b8a' }}>86+</td>
              <td style={{ paddingLeft: '16px', padding: '8px 0', color: '#666' }}>Toronto</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}>Ancient Christian Writers</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '8px 0', color: '#546b8a' }}>76</td>
              <td style={{ paddingLeft: '16px', padding: '8px 0', color: '#666' }}>Paulist</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <p>
        Finding: roughly 1,400-1,500 volumes across major commercial series. But volume counts are misleading—one Loeb volume might contain a single short work or a multi-book epic.
      </p>

      <h2>Phase 2: Open Access Resources</h2>

      <p>The real surprise: how much is freely available online.</p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1a1612' }}>
          Open Access Collections
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: '#2ecc71' }}>Loebolus</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', fontSize: '14px' }}>277 PDFs</span>
            </div>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Public domain Loeb volumes (pre-1930)</p>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: '#2ecc71' }}>Internet Archive - Loeb</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', fontSize: '14px' }}>545 volumes</span>
            </div>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Complete Loeb collection, 12.3 GB</p>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: '#2ecc71' }}>Internet Archive - Fathers</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', fontSize: '14px' }}>147 volumes</span>
            </div>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Complete Fathers of the Church series</p>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: '#2ecc71' }}>Philological Museum</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', fontSize: '14px' }}>~200 texts + 79,760 bibliography items</span>
            </div>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Dana Sutton&apos;s Neo-Latin translations</p>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: '#2ecc71' }}>Global Medieval Sourcebook</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', fontSize: '14px' }}>~200 texts</span>
            </div>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Stanford&apos;s multilingual medieval collection</p>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: '#2ecc71' }}>Perseus Digital Library</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', fontSize: '14px' }}>50+ texts</span>
            </div>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Tufts classics collection</p>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: '#2ecc71' }}>17centurymaths.com</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', fontSize: '14px' }}>30+ works</span>
            </div>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Ian Bruce&apos;s scientific Latin translations</p>
          </div>
        </div>
      </figure>

      <p>
        Dana Sutton&apos;s Philological Museum was a revelation: a single scholar has been quietly translating Neo-Latin texts for decades, with an analytic bibliography of nearly 80,000 items.
      </p>

      <h2>Phase 3: The Citation Problem</h2>

      <p>
        Early in our research, we ran into a problem: most statistics about Latin literature were estimates without sources. &ldquo;500,000 Latin works&rdquo; appeared everywhere, but where did it come from?
      </p>

      <p>We rebuilt our database with strict citation requirements:</p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1a1612' }}>
          Verified Statistics
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ color: '#444' }}>Library of Latin Texts (Brepols)</span>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', fontWeight: 600, color: '#546b8a' }}>12,149 works / 167M words</span>
              <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Source: Brepolis.net, 2024</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ color: '#444' }}>Medieval manuscripts produced</span>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', fontWeight: 600, color: '#546b8a' }}>11,000,000</span>
              <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Source: Buringh (2011)</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ color: '#444' }}>Medieval manuscripts surviving</span>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', fontWeight: 600, color: '#546b8a' }}>~2,900,000</span>
              <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Source: Buringh (2011)</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ color: '#444' }}>Loeb volumes in public domain</span>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', fontWeight: 600, color: '#546b8a' }}>429 of 558 (76%)</span>
              <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Source: Wikipedia</p>
            </div>
          </div>
        </div>
      </figure>

      <h2>Phase 4: Direct Database Analysis</h2>

      <p>
        The breakthrough came when we got access to the USTC database itself—not just the web interface, but the raw data. 1.4 GB of Access database containing 1,628,578 editions.
      </p>

      <p>
        Using <code style={{ fontFamily: 'Monaco, Courier, monospace', fontSize: '14px', background: '#f5f0e8', padding: '2px 6px', borderRadius: '4px', color: '#9e4a3a' }}>mdb-tools</code> and Python, we extracted:
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1a1612' }}>
          USTC Database Analysis
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Total editions</span>
            <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#546b8a' }}>1,628,578</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Latin editions</span>
            <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#9e4a3a' }}>503,486 (30.9%)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Peak decade for Latin</span>
            <span style={{ fontFamily: 'Monaco, Courier, monospace' }}>1660s (37,292 editions)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>When German overtook Latin</span>
            <span style={{ fontFamily: 'Monaco, Courier, monospace' }}>1670s</span>
          </div>
        </div>
      </figure>

      <p>We also extracted Latin editions by classification:</p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1a1612' }}>
          Latin Editions by Subject
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>University Publications</span>
            <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#546b8a' }}>147,859</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Religious</span>
            <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#546b8a' }}>118,250</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Jurisprudence</span>
            <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#546b8a' }}>35,243</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Classical Authors</span>
            <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#546b8a' }}>17,221</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Educational Books</span>
            <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#546b8a' }}>14,775</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Poetry</span>
            <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#546b8a' }}>14,022</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Medical Texts</span>
            <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#546b8a' }}>13,357</span>
          </div>
        </div>
      </figure>

      <p>
        <strong style={{ color: '#1a1612' }}>Key finding:</strong> University publications and religious texts account for 52.8% of all Latin editions. These are the least translated categories.
      </p>

      <h2>What We Built</h2>

      <p>The result is a comprehensive database with:</p>

      <ul>
        <li>Verified statistics from 45+ sources</li>
        <li>Complete language breakdown of 1.6M editions</li>
        <li>Decade-by-decade data from 1450 to 1700</li>
        <li>Subject classification of all Latin works</li>
        <li>Inventory of all major translation series</li>
        <li>Catalog of open-access resources</li>
      </ul>

      <h2>What We Still Don&apos;t Know</h2>

      <p>The research revealed as many gaps as facts:</p>

      <ul>
        <li>
          <strong style={{ color: '#1a1612' }}>Loeb Latin/Greek split:</strong> Harvard doesn&apos;t publish the exact breakdown. The commonly cited ~50/50 is an estimate.
        </li>
        <li>
          <strong style={{ color: '#1a1612' }}>Total translations ever made:</strong> No comprehensive count exists. Our estimate of 8,000-15,000 works is rough.
        </li>
        <li>
          <strong style={{ color: '#1a1612' }}>Dissertation translations:</strong> Thousands of Latin works have been translated in PhD dissertations. Most are never published.
        </li>
        <li>
          <strong style={{ color: '#1a1612' }}>Quality assessment:</strong> We can count translations but not evaluate them. Some Victorian translations are unreliable.
        </li>
      </ul>

      <h2>The Takeaway</h2>

      <p>
        The gap between what exists and what&apos;s accessible is larger than we expected. Half a million Latin editions in the USTC alone. Perhaps 2% translated. The infrastructure to fix this—AI translation, digital archives, open access publishing—now exists. What&apos;s missing is the systematic effort to use it.
      </p>

      <p>The data is now published. The question is what to do with it.</p>

      <div style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#1a1612' }}>
          Resources Created Today
        </h3>
        <ul style={{ fontSize: '14px', color: '#444', margin: 0, paddingLeft: '20px' }}>
          <li><code style={{ fontFamily: 'Monaco, Courier, monospace', fontSize: '13px', color: '#9e4a3a' }}>latin_translations_cited.json</code> — All statistics with source citations</li>
          <li><code style={{ fontFamily: 'Monaco, Courier, monospace', fontSize: '13px', color: '#9e4a3a' }}>LATIN_TRANSLATIONS_CITED.md</code> — Human-readable report with methodology</li>
          <li><code style={{ fontFamily: 'Monaco, Courier, monospace', fontSize: '13px', color: '#9e4a3a' }}>ustc_language_chart.html</code> — Interactive visualization of language data</li>
          <li>USTC database analysis scripts</li>
        </ul>
      </div>
    </BlogLayout>
  );
}
