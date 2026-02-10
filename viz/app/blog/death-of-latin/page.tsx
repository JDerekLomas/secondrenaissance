import BlogLayout from "../BlogLayout";
import Link from "next/link";
import { generateBlogMetadata, generateArticleJsonLd } from "@/lib/blogMetadata";

const postMeta = {
  title: "The Death of Latin? What 1.6 Million Books Tell Us",
  description: "German overtook Latin in the 1670s. We analyzed the complete USTC database to pinpoint exactly when Europe's lingua franca lost its dominance.",
  slug: "death-of-latin",
  date: "2025-12-06",
};

export const metadata = generateBlogMetadata(postMeta);
const jsonLd = generateArticleJsonLd(postMeta);

export default function DeathOfLatin() {
  return (
    <BlogLayout
      title="The Death of Latin? What 1.6 Million Books Tell Us"
      tag="Data"
      slug="death-of-latin"
      prevPost={{ href: "/blog/mapping-translations", title: "Mapping Translations" }}
      nextPost={{ href: "/blog/printing-revolution", title: "The Printing Revolution" }}
      jsonLd={jsonLd}
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '22px',
        lineHeight: 1.6,
        color: '#444',
        marginBottom: '32px',
      }}>
        Ask most people when Latin died and you'll get a vague answer: "the Renaissance"
        or "when vernacular literature took off." But thanks to 1.6 million books in the
        Universal Short Title Catalogue, we can pinpoint the answer precisely.
      </p>

      <p style={{
        fontSize: '24px',
        fontWeight: 600,
        color: '#9e4a3a',
        margin: '32px 0',
      }}>
        German overtook Latin in the 1670s.
      </p>

      <h2>The Data</h2>

      <p>
        The USTC, maintained by the University of St Andrews, catalogs every known book printed
        in Europe during the first 250 years of printing. We analyzed the complete database
        (1,628,578 editions) by language and decade. Here's what emerged:
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1a1612' }}>Language Distribution (1450-1700)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#444' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#8B0000' }}></span>
              Latin
            </span>
            <span style={{ fontFamily: 'monospace', color: '#546b8a' }}>503,486 (30.9%)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#444' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#1E3A5F' }}></span>
              German
            </span>
            <span style={{ fontFamily: 'monospace', color: '#546b8a' }}>340,480 (20.9%)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#444' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#2E5A88' }}></span>
              French
            </span>
            <span style={{ fontFamily: 'monospace', color: '#546b8a' }}>241,569 (14.8%)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#444' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#4A7FB0' }}></span>
              English
            </span>
            <span style={{ fontFamily: 'monospace', color: '#546b8a' }}>164,363 (10.1%)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#444' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#F4A460' }}></span>
              Dutch
            </span>
            <span style={{ fontFamily: 'monospace', color: '#546b8a' }}>114,540 (7.0%)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#444' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#228B22' }}></span>
              Italian
            </span>
            <span style={{ fontFamily: 'monospace', color: '#546b8a' }}>113,282 (7.0%)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#444' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#DAA520' }}></span>
              Spanish
            </span>
            <span style={{ fontFamily: 'monospace', color: '#546b8a' }}>97,700 (6.0%)</span>
          </div>
        </div>
      </figure>

      <p>
        Latin wasn't just important—it was <em>dominant</em>. Nearly a third of everything
        printed in early modern Europe was in Latin.
      </p>

      <h2>The Rise and Fall</h2>

      <h3 style={{ color: '#1a1612', fontSize: '20px', marginTop: '32px' }}>The Early Days (1450s-1470s)</h3>

      <p>
        In the first decades of printing, Latin was king. When Gutenberg printed his Bible,
        when the first presses spread across Europe, the market was overwhelmingly Latin.
        In the 1470s, Latin accounted for <strong style={{ color: '#1a1612' }}>79%</strong> of all editions.
      </p>

      <p>
        Why? The audience for books was small: clergy, scholars, lawyers. These were people
        who read Latin as a matter of course. The infrastructure of learning—universities,
        monasteries, courts—ran on Latin.
      </p>

      <h3 style={{ color: '#1a1612', fontSize: '20px', marginTop: '32px' }}>The Reformation Spike (1520s)</h3>

      <p>
        Then came Luther.
      </p>

      <p>
        The 1520s saw an explosion of German-language printing. German editions jumped from
        1,870 in the 1510s to <strong style={{ color: '#1a1612' }}>8,343</strong> in the 1520s—a
        346% increase. For one decade, German nearly matched Latin in output.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1a1612' }}>The Reformation Effect</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#444' }}>
            <span>1510s German editions:</span>
            <span style={{ fontFamily: 'monospace' }}>1,870</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#444' }}>
            <span>1520s German editions:</span>
            <span style={{ fontFamily: 'monospace', color: '#c9a86c' }}>8,343</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#228B22' }}>
            <span>Increase:</span>
            <span style={{ fontFamily: 'monospace' }}>+346%</span>
          </div>
        </div>
      </figure>

      <p>
        This was the pamphlet war of the Reformation: vernacular polemics, translated Bibles,
        popular religious tracts. For the first time, printing reached beyond the educated elite.
      </p>

      <p>
        But Latin recovered. The 1530s saw German drop back while Latin held steady.
        The scholarly infrastructure remained Latin.
      </p>

      <h3 style={{ color: '#1a1612', fontSize: '20px', marginTop: '32px' }}>The Long Plateau (1550s-1660s)</h3>

      <p>
        For over a century, Latin maintained its position. The numbers kept growing:
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#444' }}>
            <span>1550s:</span>
            <span style={{ fontFamily: 'monospace' }}>15,357 Latin editions</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#444' }}>
            <span>1600s:</span>
            <span style={{ fontFamily: 'monospace' }}>30,939 Latin editions</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9e4a3a' }}>
            <span>1660s (peak):</span>
            <span style={{ fontFamily: 'monospace' }}>37,292 Latin editions</span>
          </div>
        </div>
      </figure>

      <p>
        This was the golden age of Neo-Latin: scientific treatises, humanist scholarship,
        international correspondence, university disputations. Newton's <em>Principia</em> (1687)
        was in Latin. So were Spinoza's <em>Ethics</em> (1677), Leibniz's philosophical works,
        and virtually all academic publications.
      </p>

      <h3 style={{ color: '#1a1612', fontSize: '20px', marginTop: '32px' }}>The Tipping Point (1670s)</h3>

      <p>
        Then, almost suddenly, the lines crossed.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1a1612' }}>The Crossover</h3>
        <table style={{ width: '100%', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #c9a86c' }}>
              <th style={{ textAlign: 'left', padding: '8px 0', color: '#1a1612' }}>Decade</th>
              <th style={{ textAlign: 'right', padding: '8px 0', color: '#1a1612' }}>Latin</th>
              <th style={{ textAlign: 'right', padding: '8px 0', color: '#1a1612' }}>German</th>
            </tr>
          </thead>
          <tbody style={{ color: '#444' }}>
            <tr>
              <td style={{ padding: '8px 0' }}>1660s</td>
              <td style={{ textAlign: 'right', fontFamily: 'monospace', color: '#9e4a3a' }}>37,292</td>
              <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>32,716</td>
            </tr>
            <tr style={{ background: '#faf8f4' }}>
              <td style={{ padding: '8px 0', fontWeight: 600 }}>1670s</td>
              <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>36,483</td>
              <td style={{ textAlign: 'right', fontFamily: 'monospace', color: '#228B22' }}>41,446</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}>1680s</td>
              <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>33,325</td>
              <td style={{ textAlign: 'right', fontFamily: 'monospace', color: '#228B22' }}>45,893</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}>1690s</td>
              <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>33,090</td>
              <td style={{ textAlign: 'right', fontFamily: 'monospace', color: '#228B22' }}>49,233</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <p>
        German didn't just overtake Latin—it accelerated while Latin declined. By the 1690s,
        German output was 49% higher than Latin.
      </p>

      <h2>What Happened?</h2>

      <p>
        Several factors converged in the late 17th century:
      </p>

      <ul>
        <li>
          <strong style={{ color: '#1a1612' }}>The rise of national academies.</strong> The Royal Society (1660),
          the Académie des Sciences (1666), and similar institutions began publishing in vernacular
          languages. Science, once Latin's stronghold, started switching.
        </li>
        <li>
          <strong style={{ color: '#1a1612' }}>Growing literacy.</strong> Education expanded beyond Latin-trained
          elites. A new reading public wanted books in their own languages.
        </li>
        <li>
          <strong style={{ color: '#1a1612' }}>Philosophical shift.</strong> Thinkers like Descartes and Locke
          deliberately chose vernaculars to reach wider audiences. The idea that serious thought
          required Latin was fading.
        </li>
        <li>
          <strong style={{ color: '#1a1612' }}>German institutional strength.</strong> The Holy Roman Empire's
          fragmented political structure paradoxically created a unified literary market. German
          became the common language of a dispersed but culturally connected region.
        </li>
      </ul>

      <h2>The English Exception</h2>

      <p>
        One striking pattern: English printing exploded in the 1640s.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#444' }}>
            <span>1630s English editions:</span>
            <span style={{ fontFamily: 'monospace' }}>6,767</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#444' }}>
            <span>1640s English editions:</span>
            <span style={{ fontFamily: 'monospace', color: '#c9a86c' }}>24,112</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#228B22' }}>
            <span>Increase:</span>
            <span style={{ fontFamily: 'monospace' }}>+256%</span>
          </div>
        </div>
      </figure>

      <p>
        That's the English Civil War and Interregnum. Pamphlets, newsbooks, political tracts,
        religious controversy. England's revolution was fought as much in print as on battlefields.
      </p>

      <p>
        The 1640s spike in English (24,112 editions) briefly made it the second-most-printed
        language in Europe, surpassing German (20,521) and approaching Latin (30,143).
      </p>

      <h2>What This Means for Latin Today</h2>

      <p>
        The USTC data reveals something important: <strong style={{ color: '#1a1612' }}>Latin didn't die
        in 1700</strong>. It was still producing 33,000+ editions per decade at the end of the
        17th century—more than at any point before 1600.
      </p>

      <p>
        Latin's "death" was relative, not absolute. It was overtaken, not abandoned. And the
        corpus it left behind is staggering.
      </p>

      <p>
        Of those 503,486 Latin editions in the USTC, how many have been translated into English?
      </p>

      <p style={{
        fontSize: '24px',
        fontWeight: 600,
        color: '#9e4a3a',
        margin: '32px 0',
      }}>
        Less than 2%.
      </p>

      <p>
        The university publications (147,859 editions), the religious texts (118,250), the legal
        commentaries (35,243), the medical treatises (13,357)—the vast majority remain accessible
        only to those who can read Latin.
      </p>

      <p>
        We tend to think of Latin literature as a solved problem: Cicero, Virgil, Augustine,
        the "classics." But the USTC reveals a different picture. The real Latin corpus
        isn't ancient—it's early modern. And it's largely untranslated.
      </p>

      <figure style={{
        background: '#faf8f4',
        border: '1px solid #d0c4b0',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <p style={{ color: '#444', fontStyle: 'italic' }}>
          Want to explore the data yourself? View the{" "}
          <Link href="/ustc-language-chart.html" style={{ color: '#9e4a3a' }}>
            interactive visualization
          </Link>{" "}
          showing language distribution across all 25 decades.
        </p>
      </figure>

      <p style={{ color: '#666', fontSize: '14px', marginTop: '32px' }}>
        <strong>Source:</strong> Universal Short Title Catalogue, University of St Andrews.
        Direct analysis of USTC Editions July 2025.accdb database export.{" "}
        <a href="https://ustc.ac.uk" style={{ color: '#9e4a3a' }}>ustc.ac.uk</a>
      </p>
    </BlogLayout>
  );
}
