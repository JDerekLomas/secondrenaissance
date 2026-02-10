import BlogLayout from "../BlogLayout";
import { generateBlogMetadata, generateArticleJsonLd } from "@/lib/blogMetadata";

const postMeta = {
  title: "The Rediscovery of Medieval Women Writers",
  description: "Marguerite Porete: 950x growth. Christine de Pizan: 280x. Google Ngram data reveals how feminist scholarship recovered an entire literary tradition.",
  slug: "women-writers",
  date: "2025-12-23",
};

export const metadata = generateBlogMetadata(postMeta);
const jsonLd = generateArticleJsonLd(postMeta);

export default function WomenWriters() {
  return (
    <BlogLayout
      title="The Rediscovery of Medieval Women Writers"
      tag="Research"
      slug="women-writers"
      prevPost={{ href: "/blog/forgotten-authors", title: "The Forgotten Giants" }}
      nextPost={{ href: "/blog/methodology", title: "Methodology" }}
      jsonLd={jsonLd}
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '22px',
        lineHeight: 1.6,
        color: '#444',
        marginBottom: '32px',
      }}>
        In 1934, a manuscript was discovered in a private library. It contained the only surviving
        copy of <em>The Book of Margery Kempe</em>, the first autobiography in English—written
        by a woman around 1436. For 500 years, it had been forgotten. Now it&apos;s taught in
        universities worldwide.<sup>1</sup>
      </p>

      <p>
        Margery Kempe&apos;s story is not unique. When we analyze Google Ngram data for pre-modern
        women writers, a striking pattern emerges: most show &ldquo;modern rediscovery&rdquo; curves.
        Nearly invisible in Victorian scholarship, they exploded into prominence after 1980.
      </p>

      <h2>The Data</h2>

      <p>
        We queried the Google Books Ngram Viewer for 19 medieval and early modern women writers,
        tracking how often their names and works appear in English-language books from 1800 to 2019.
        The pattern is unmistakable:
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
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
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Author</th>
              <th style={{ textAlign: 'right', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Victorian</th>
              <th style={{ textAlign: 'right', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Digital</th>
              <th style={{ textAlign: 'right', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Growth</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Pattern</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Teresa of Avila", "2.9e-9", "1.7e-7", "60x", "Sustained growth"],
              ["Christine de Pizan", "4.4e-10", "1.3e-7", "280x", "Modern rediscovery"],
              ["Margery Kempe", "2.3e-10", "9.3e-8", "400x", "Modern rediscovery"],
              ["Hildegard of Bingen", "8.9e-10", "2.6e-8", "29x", "Sustained growth"],
              ["Heloise", "2.7e-8", "3.3e-8", "1.2x", "Stable canonical"],
              ["Mechthild of Magdeburg", "1.7e-10", "2.2e-8", "125x", "Modern rediscovery"],
              ["Angela of Foligno", "2.1e-9", "1.6e-8", "8x", "Sustained growth"],
              ["Birgitta of Sweden", "7.2e-10", "1.6e-8", "22x", "Modern rediscovery"],
              ["Hrotsvitha", "1.4e-8", "1.3e-8", "0.9x", "Early Modern peak"],
              ["Marguerite Porete", "1.0e-11", "9.5e-9", "950x", "Modern rediscovery"],
              ["Vittoria Colonna", "8.4e-8", "3.4e-8", "0.4x", "Victorian peak"],
              ["Julian of Norwich", "1.7e-9", "1.7e-8", "10x", "Sustained growth"],
              ["Marie de France", "6.4e-10", "6.5e-9", "10x", "Modern rediscovery"],
              ["Louise Labé", "1.4e-9", "6.6e-9", "5x", "Sustained growth"],
              ["Catherine of Siena", "~0", "1.7e-9", "—", "Modern rediscovery"],
              ["Gertrude the Great", "2.8e-10", "6.8e-9", "24x", "Modern rediscovery"],
              ["Beatrice of Nazareth", "1.3e-11", "5.3e-9", "400x", "Modern rediscovery"],
            ].map(([author, victorian, digital, growth, pattern], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e0d8c8' }}>
                <td style={{ padding: '12px 8px', color: '#1a1612' }}>{author}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'monospace', color: '#888' }}>{victorian}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'monospace', color: '#9e4a3a', fontWeight: 600 }}>{digital}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'monospace', color: pattern.includes('rediscovery') ? '#22c55e' : '#666' }}>{growth}</td>
                <td style={{ padding: '12px 8px', color: '#666', fontSize: '12px' }}>{pattern}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <figcaption style={{ marginTop: '16px', fontSize: '12px', color: '#888', fontFamily: 'Inter, sans-serif' }}>
          Ngram frequency (mentions per billion words) from Google Books en-2019 corpus.
          &ldquo;Growth&rdquo; = Digital era frequency / Victorian frequency.
        </figcaption>
      </figure>

      <h2>Three Stories of Rediscovery</h2>

      <h3 style={{ color: '#9e4a3a' }}>Marguerite Porete: From Heretic to Mystic</h3>

      <p>
        Marguerite Porete was burned at the stake in Paris in 1310. Her crime: writing <em>The Mirror
        of Simple Souls</em>, a mystical text about the soul&apos;s union with God. The book was
        condemned and supposedly destroyed.
      </p>

      <p>
        Yet copies survived—anonymously. For centuries, <em>The Mirror</em> circulated attributed
        to other authors. It was only in 1946 that Romana Guarnieri identified it as Porete&apos;s
        work.<sup>2</sup> The Ngram data captures this perfectly: virtually zero mentions before
        1950, then a 950x increase as scholars recognized her as one of the most original
        mystical writers of the medieval period.
      </p>

      <h3 style={{ color: '#9e4a3a' }}>Christine de Pizan: The First Professional Woman Writer</h3>

      <p>
        Christine de Pizan (1364–1430) may have been the first woman in European history to earn
        her living by writing. Widowed at 25 with three children, she turned to her pen. She wrote
        over 40 works: poetry, biography, military strategy, political philosophy. Her <em>Book
        of the City of Ladies</em> (1405) is a systematic defense of women against misogynist
        literature.
      </p>

      <p>
        In the Victorian era, she was barely a footnote. The Ngram frequency: 4.4e-10—essentially
        invisible. By 2019: 1.3e-7, a 280-fold increase. The feminist recovery of Christine
        de Pizan beginning in the 1970s transformed her from obscurity to canonical status.
        Her <em>City of Ladies</em> is now standard reading in medieval literature courses.
      </p>

      <h3 style={{ color: '#9e4a3a' }}>Teresa of Avila: The Mystic Who Never Left</h3>

      <p>
        Not all women writers needed rediscovery. Teresa of Avila (1515–1582) was canonized in
        1622, declared a Doctor of the Church in 1970, and has been continuously read for four
        centuries. Her <em>Interior Castle</em> remains one of the most influential works of
        Christian mysticism ever written.
      </p>

      <p>
        The Ngram data shows not rediscovery but sustained growth: 2.9e-9 in the Victorian era
        to 1.7e-7 today—a 60-fold increase. Teresa wasn&apos;t forgotten; she was amplified.
        As interest in contemplative spirituality grew, so did attention to her work.
      </p>

      <h2>What Changed?</h2>

      <p>
        The explosion of interest in medieval women writers after 1980 wasn&apos;t accidental. Several
        factors converged:
      </p>

      <ul>
        <li>
          <strong>Feminist scholarship</strong> — The women&apos;s movement created demand
          for recovering women&apos;s voices from history. Literary scholars began systematically
          searching archives for women&apos;s writing.
        </li>
        <li>
          <strong>Manuscript discoveries</strong> — The Margery Kempe manuscript (1934),
          the identification of Marguerite Porete (1946), and other finds provided new texts
          to study.
        </li>
        <li>
          <strong>Translation projects</strong> — Series like &ldquo;The Classics of Western
          Spirituality&rdquo; (Paulist Press) and &ldquo;The Other Voice in Early Modern Europe&rdquo;
          (University of Chicago) made texts accessible in English.
        </li>
        <li>
          <strong>Curriculum reform</strong> — Universities expanded medieval syllabi beyond
          the traditional (male) canon, creating pedagogical demand for women&apos;s texts.
        </li>
      </ul>

      <h2>The Mystics Dominate</h2>

      <p>
        A notable pattern: the most prominent medieval women writers are overwhelmingly mystics.
        Hildegard, Julian, Mechthild, Angela, Birgitta, Marguerite, Teresa—all wrote about
        direct experience of the divine.
      </p>

      <p>
        This isn&apos;t because women only wrote about mysticism. Christine de Pizan wrote political
        philosophy. Hrotsvitha wrote plays. Marie de France wrote courtly romances. But mystical
        writing offered women a unique authority: they could claim divine inspiration that
        bypassed institutional hierarchies. A woman couldn&apos;t be a priest, but she could
        be a prophet.<sup>3</sup>
      </p>

      <h2>The One Who Peaked Early: Hrotsvitha</h2>

      <p>
        Hrotsvitha of Gandersheim (c. 935–1002) is the exception that proves the rule. A Saxon
        canoness, she wrote six plays in Latin—the first dramas composed in Western Europe since
        antiquity. Her work was rediscovered in 1494 and caused a sensation among Renaissance
        humanists.
      </p>

      <p>
        The Ngram data shows her &ldquo;Early Modern peak&rdquo;: maximum attention around 1900–1945,
        then gradual decline. Why? Hrotsvitha was claimed by a different scholarly tradition—classical
        philology and theater history—before feminist recovery began. She was already &ldquo;discovered&rdquo;
        by the male academy, which may have paradoxically reduced feminist interest in reclaiming her.
      </p>

      <h2>The Victorian Exception: Vittoria Colonna</h2>

      <p>
        Vittoria Colonna (1490–1547), the Italian poet and friend of Michelangelo, shows the
        opposite pattern: more famous in the Victorian era than today. Her Ngram peaked at
        8.4e-8 in Victorian times but has declined to 3.4e-8.
      </p>

      <p>
        Colonna was celebrated in the 19th century as an exemplar of feminine virtue—pious, devoted
        to her dead husband, friend of great men. As feminist scholars reframed the study of
        women&apos;s writing, this hagiographic framing became less appealing. Colonna&apos;s reputation
        was built on Victorian values that later scholars rejected.
      </p>

      <h2>The Early Print Era: 1450–1550</h2>

      <p>
        The printing press arrived in 1450. By 1550, approximately 200,000 editions had been printed
        across Europe. How many were by women? The data from the Incunabula Short Title Catalogue
        (ISTC) and Universal Short Title Catalogue (USTC) is revealing:
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
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
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Author</th>
              <th style={{ textAlign: 'right', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>ISTC (pre-1501)</th>
              <th style={{ textAlign: 'right', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>USTC (1501–1600)</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Birgitta of Sweden", "12", "25", "Most printed woman"],
              ["Teresa of Avila", "0", "30", "Post-1550 editions"],
              ["Catherine of Siena", "3", "15", "Saints sell"],
              ["Angela of Foligno", "2", "8", "Approved mystic"],
              ["Hrotsvitha", "1", "4", "Humanist discovery"],
              ["Christine de Pizan", "1", "3", "French vernacular"],
              ["Heloise", "0", "8", "With Abelard only"],
              ["Hildegard of Bingen", "0", "1", "Manuscript tradition"],
              ["Margery Kempe", "0", "0", "Lost until 1934"],
              ["Mechthild of Magdeburg", "0", "0", "Manuscript only"],
              ["Marguerite Porete", "0", "0", "Burned as heretic"],
              ["Marie de France", "0", "0", "Manuscript only"],
              ["Beatrice of Nazareth", "0", "0", "Manuscript only"],
            ].map(([author, istc, ustc, status], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e0d8c8' }}>
                <td style={{ padding: '12px 8px', color: '#1a1612' }}>{author}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'monospace', color: istc === "0" ? '#888' : '#9e4a3a', fontWeight: istc === "0" ? 400 : 600 }}>{istc}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'monospace', color: ustc === "0" ? '#888' : '#9e4a3a', fontWeight: ustc === "0" ? 400 : 600 }}>{ustc}</td>
                <td style={{ padding: '12px 8px', color: '#666', fontSize: '12px' }}>{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <figcaption style={{ marginTop: '16px', fontSize: '12px', color: '#888', fontFamily: 'Inter, sans-serif' }}>
          Edition counts from ISTC (Incunabula Short Title Catalogue) and USTC (Universal Short Title Catalogue).
        </figcaption>
      </figure>

      <p>
        The pattern is stark. The women who made it into print shared common traits: they were
        either <strong>canonized saints</strong> (Birgitta, Catherine, Teresa, Angela) or connected
        to <strong>famous men</strong> (Heloise with Abelard, Hrotsvitha discovered by humanists).
        Institutional approval was essential.
      </p>

      <p>
        The mystics who worked outside institutional structures—Marguerite Porete, Mechthild,
        the Beguines—survived only in manuscript. When the manuscripts were lost or
        forgotten, so were they. Margery Kempe&apos;s single surviving manuscript was found in
        a private library 500 years later. How many others weren&apos;t so lucky?
      </p>

      <p>
        This explains the &ldquo;modern rediscovery&rdquo; pattern. The women showing 100x–950x growth
        since Victorian times were never part of the print tradition. They couldn&apos;t be &ldquo;rediscovered&rdquo;
        in the 19th century because their texts weren&apos;t available. It took 20th-century manuscript
        studies, feminist scholarship, and translation projects to bring them back.<sup>5</sup>
      </p>

      <h2>The Sixteenth Century: A Golden Age?</h2>

      <p>
        The picture changes dramatically after 1500. The printing press was established. Humanism
        encouraged women&apos;s education. Italy produced a remarkable generation of women poets;
        England saw its first women in print; Venetian writers began the modern feminist tradition.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
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
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Author</th>
              <th style={{ textAlign: 'right', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Victorian</th>
              <th style={{ textAlign: 'right', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Digital</th>
              <th style={{ textAlign: 'right', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Growth</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Pattern</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Sor Juana Inés de la Cruz", "1.3e-9", "1.7e-7", "134x", "Sustained growth"],
              ["Marguerite de Navarre", "4.2e-8", "5.9e-8", "1.4x", "Stable canonical"],
              ["Mary Sidney", "1.3e-7", "1.0e-7", "0.8x", "Variable"],
              ["Anne Askew", "5.0e-8", "2.3e-8", "0.5x", "Romantic peak"],
              ["Katherine Parr", "1.9e-8", "2.3e-8", "1.2x", "Variable"],
              ["Veronica Franco", "4.3e-10", "8.6e-9", "20x", "Modern rediscovery"],
              ["Moderata Fonte", "5.0e-10", "9.0e-9", "18x", "Modern rediscovery"],
              ["Lucrezia Marinella", "2.1e-10", "4.1e-9", "19x", "Modern rediscovery"],
              ["Gaspara Stampa", "3.2e-9", "7.3e-9", "2.3x", "Sustained growth"],
              ["Isabella Whitney", "4.9e-10", "6.2e-9", "13x", "Modern rediscovery"],
              ["Chiara Matraini", "4.6e-12", "1.2e-9", "268x", "Modern rediscovery"],
            ].map(([author, victorian, digital, growth, pattern], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e0d8c8' }}>
                <td style={{ padding: '12px 8px', color: '#1a1612' }}>{author}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'monospace', color: '#888' }}>{victorian}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'monospace', color: '#9e4a3a', fontWeight: 600 }}>{digital}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'monospace', color: pattern.includes('rediscovery') ? '#22c55e' : '#666' }}>{growth}</td>
                <td style={{ padding: '12px 8px', color: '#666', fontSize: '12px' }}>{pattern}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <figcaption style={{ marginTop: '16px', fontSize: '12px', color: '#888', fontFamily: 'Inter, sans-serif' }}>
          Sixteenth-century women writers. Note the mixed patterns: some were always known, others are being recovered.
        </figcaption>
      </figure>

      <p>
        The data reveals three distinct groups:
      </p>

      <p>
        <strong>The always-known:</strong> Marguerite de Navarre&apos;s <em>Heptameron</em> was never
        forgotten—it&apos;s essentially a female <em>Decameron</em>, and was treated as such. Mary
        Sidney and Anne Askew were famous in their own time and stayed in the historical record,
        though both have declined from Victorian-era peaks.
      </p>

      <p>
        <strong>The Italian poets:</strong> Veronica Franco, Gaspara Stampa, and the other Italian
        <em>poetesse</em> were rediscovered through feminist literary recovery beginning in the 1970s.
        Franco in particular has benefited from popular culture—the 1998 film <em>Dangerous Beauty</em>
        brought the Venetian courtesan-poet to a wide audience.
      </p>

      <p>
        <strong>The proto-feminists:</strong> Moderata Fonte and Lucrezia Marinella wrote explicit
        defenses of women&apos;s intellectual equality in the <em>Querelle des Femmes</em> tradition.
        Their works—<em>The Worth of Women</em> (1600) and <em>The Nobility and Excellence of Women</em>
        (1600)—are now recognized as foundational feminist texts, but were virtually unknown
        before the 1990s.<sup>6</sup>
      </p>

      <h3 style={{ color: '#9e4a3a' }}>The Case of Sor Juana</h3>

      <p>
        The most dramatic recovery is Sor Juana Inés de la Cruz (1648–1695), the Mexican nun
        and polymath. With 134x growth from Victorian to Digital eras, she represents not just
        feminist recovery but postcolonial recovery—the rediscovery of colonial Latin American
        intellectual life. Her <em>Response to Sor Filotea</em> (1691), a defense of women&apos;s
        right to education, is now considered one of the founding documents of Latin American
        feminist thought.
      </p>

      <h2>The Seventeenth Century: English Women in Print</h2>

      <p>
        The 17th century produced the first generation of professional English women writers.
        Aphra Behn (1640–1689) is often called the first professional woman writer in English.
        Margaret Cavendish (1623–1673) published philosophy, science fiction, and natural philosophy.
        Mary Wroth (1587–1651) wrote the first prose romance by an English woman.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
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
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Author</th>
              <th style={{ textAlign: 'right', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Victorian</th>
              <th style={{ textAlign: 'right', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Digital</th>
              <th style={{ textAlign: 'right', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Growth</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Claim to Fame</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Aemilia Lanyer", "4.4e-11", "2.4e-8", "534x", "First book of poetry by woman"],
              ["Katharina Zell", "2.7e-11", "3.0e-9", "111x", "Protestant reformer"],
              ["Jane Anger", "3.6e-11", "2.8e-9", "80x", "First defense of women"],
              ["Laura Cereta", "1.1e-10", "6.2e-9", "57x", "Italian humanist"],
              ["Elizabeth Cary", "2.9e-10", "1.0e-8", "34x", "First English closet drama"],
              ["Mary Wroth", "2.7e-9", "4.0e-8", "15x", "First prose romance"],
              ["Margaret Cavendish", "9.0e-9", "6.9e-8", "7.7x", "Polymath, 'Mad Madge'"],
              ["Aphra Behn", "3.1e-8", "1.1e-7", "3.5x", "First professional writer"],
              ["Madame Guyon", "1.5e-7", "2.3e-8", "0.15x", "Quietist mystic (declining)"],
            ].map(([author, victorian, digital, growth, claim], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e0d8c8' }}>
                <td style={{ padding: '12px 8px', color: '#1a1612' }}>{author}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'monospace', color: '#888' }}>{victorian}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'monospace', color: '#9e4a3a', fontWeight: 600 }}>{digital}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'monospace', color: growth.includes('x') && parseFloat(growth) > 10 ? '#22c55e' : '#666' }}>{growth}</td>
                <td style={{ padding: '12px 8px', color: '#666', fontSize: '12px' }}>{claim}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>

      <h3 style={{ color: '#9e4a3a' }}>Aemilia Lanyer: The Biggest Recovery</h3>

      <p>
        The single largest recovery in our dataset is Aemilia Lanyer (1569–1645). With 534x growth,
        she went from complete obscurity to widespread recognition. Her <em>Salve Deus Rex Judaeorum</em>
        (1611) was the first original book of poetry published by an English woman.
      </p>

      <p>
        Lanyer was rediscovered in 1973 by A.L. Rowse, who controversially argued she was Shakespeare&apos;s
        &ldquo;Dark Lady.&rdquo; While that claim is disputed, it brought attention to her poetry.
        Subsequent feminist scholarship recognized the work on its own merits: a 200-page poem
        that includes the first proto-feminist retelling of Eve&apos;s fall, arguing that Adam
        was equally culpable.<sup>7</sup>
      </p>

      <h2>What&apos;s Still Missing</h2>

      <p>
        Despite the recovery, enormous gaps remain:
      </p>

      <ul>
        <li>
          <strong>Most mystical texts remain in Latin/vernacular only</strong> — Even Hildegard,
          the most famous, has major works untranslated. Her <em>Physica</em> (natural history)
          doesn&apos;t appear in Ngram data at all.
        </li>
        <li>
          <strong>Letters and minor works</strong> — We have Teresa&apos;s major treatises but not
          complete translations of her 400+ letters.
        </li>
        <li>
          <strong>Non-Western women</strong> — This analysis covers only Western European women.
          Byzantine, Islamic, and Asian women writers remain almost entirely inaccessible in English.
        </li>
        <li>
          <strong>Anonymous works</strong> — How many texts by women circulated without attribution?
          We may never know what we&apos;ve lost.
        </li>
      </ul>

      <h2>The Work Continues</h2>

      <p>
        The rediscovery of medieval women writers is one of the great scholarly achievements of
        the late 20th century. The Ngram data quantifies what literary historians have long
        known: we recovered an entire tradition that Victorian scholarship had rendered invisible.
      </p>

      <p>
        But the recovery is incomplete. Every author on this list has untranslated works. Every
        tradition has unexplored archives. The tools that enabled 20th-century recovery—feminist
        theory, manuscript studies, translation—remain essential. AI-assisted translation may
        accelerate the work. The 280-fold increase in attention to Christine de Pizan happened
        because scholars made her texts available. The same could happen for the works still locked
        in Latin and medieval vernaculars.
      </p>

      <p>
        Margery Kempe was silent for 500 years. How many others are still waiting to speak?
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid #e0d8c8', margin: '48px 0 24px' }} />

      <h3 style={{ fontSize: '14px', fontFamily: 'Inter, sans-serif', color: '#888', marginBottom: '16px' }}>Notes & Sources</h3>

      <ol style={{ fontSize: '14px', color: '#666', paddingLeft: '20px', lineHeight: 1.8 }}>
        <li>
          The manuscript was discovered by Hope Emily Allen in the Butler-Bowdon family library.
          See Lynn Staley, ed., <em>The Book of Margery Kempe</em> (Kalamazoo: Medieval Institute
          Publications, 1996), introduction.
        </li>
        <li>
          Romana Guarnieri, &ldquo;Il movimento del Libero Spirito,&rdquo; <em>Archivio italiano per
          la storia della pietà</em> 4 (1965): 351–708. The identification revolutionized the study
          of medieval mysticism.
        </li>
        <li>
          On women&apos;s mystical authority, see Caroline Walker Bynum, <em>Holy Feast and Holy Fast:
          The Religious Significance of Food to Medieval Women</em> (Berkeley: University of
          California Press, 1987).
        </li>
        <li>
          Ngram data queried from Google Books Ngram Viewer, corpus &ldquo;English (2019)&rdquo;,
          smoothing 3, December 2024. Frequency values represent average mentions per billion
          words within each era. See <a href="/sparklines" style={{ color: '#9e4a3a' }}>our
          interactive visualization</a> for full data.
        </li>
        <li>
          Edition counts from ISTC (<a href="https://data.cerl.org/istc" style={{ color: '#9e4a3a' }}>Incunabula
          Short Title Catalogue</a>) for pre-1501 editions, and USTC (<a href="https://www.ustc.ac.uk/"
          style={{ color: '#9e4a3a' }}>Universal Short Title Catalogue</a>) for 1501–1600. Total
          European print output 1450–1550 estimated at 200,000 editions; see Andrew Pettegree,
          <em>The Book in the Renaissance</em> (Yale University Press, 2010).
        </li>
        <li>
          On Venetian women writers, see Virginia Cox, <em>Women&apos;s Writing in Italy 1400–1650</em>
          (Johns Hopkins University Press, 2008). The &ldquo;Other Voice in Early Modern Europe&rdquo;
          series from University of Chicago Press has translated most of these works into English
          for the first time.
        </li>
        <li>
          On Aemilia Lanyer, see Susanne Woods, <em>Lanyer: A Renaissance Woman Poet</em> (Oxford
          University Press, 1999). A.L. Rowse&apos;s &ldquo;Dark Lady&rdquo; theory appears in
          <em>Shakespeare&apos;s Sonnets</em> (1973). For the feminist reading of <em>Salve Deus</em>,
          see Barbara Lewalski, &ldquo;Of God and Good Women,&rdquo; <em>ELH</em> 54.2 (1987).
        </li>
      </ol>
    </BlogLayout>
  );
}
