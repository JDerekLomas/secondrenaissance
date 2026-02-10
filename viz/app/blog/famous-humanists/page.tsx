import BlogLayout from "../BlogLayout";
import { generateBlogMetadata, generateArticleJsonLd } from "@/lib/blogMetadata";

const postMeta = {
  title: "Even Ficino Isn't Fully Translated",
  description: "You'd think the famous Renaissance humanists would be fully available. They're not. Ficino, Pico, Valla—vast bodies of work remain untranslated.",
  slug: "famous-humanists",
  date: "2025-11-28",
};

export const metadata = generateBlogMetadata(postMeta);
const jsonLd = generateArticleJsonLd(postMeta);

export default function FamousHumanists() {
  return (
    <BlogLayout
      title="Even Ficino Isn't Fully Translated"
      tag="Research"
      slug="famous-humanists"
      prevPost={{ href: "/blog/translation-gap", title: "The Translation Gap" }}
      jsonLd={jsonLd}
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '22px',
        lineHeight: 1.6,
        color: '#444',
        marginBottom: '32px',
      }}>
        You'd think the famous Renaissance humanists would be fully available in English.
        They're not. Even the names you recognize—Ficino, Pico, Valla—have vast bodies of
        work that have never been translated.
      </p>

      <h2>The Illusion of Accessibility</h2>

      <p>
        When we think of Renaissance philosophy, certain names come to mind: Marsilio Ficino,
        Giovanni Pico della Mirandola, Lorenzo Valla, Angelo Poliziano. These are the "canonical"
        figures. They appear in every textbook. They're the humanists we <em>have</em> translated—right?
      </p>

      <p>
        Not quite. We've translated their <em>greatest hits</em>. The famous works, the quotable
        passages, the texts that made it into anthologies. But their full output? Mostly unavailable.
      </p>

      <h2>Marsilio Ficino (45 editions in USTC)</h2>

      <p>
        Ficino is the founder of Renaissance Neoplatonism. He translated Plato into Latin for
        the first time since antiquity. He wrote the <em>Platonic Theology</em>, a massive work
        on the immortality of the soul. He was the center of the Florentine Academy.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#228B22' }}>What IS translated:</h3>
        <ul style={{ color: '#444', marginBottom: '16px', lineHeight: 1.8 }}>
          <li>Platonic Theology (complete, 6 volumes, Harvard I Tatti)</li>
          <li>Commentary on Plato's Symposium</li>
          <li>Three Books on Life</li>
          <li>Selected letters (partial)</li>
        </ul>

        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#9e4a3a' }}>What is NOT translated:</h3>
        <ul style={{ color: '#444', lineHeight: 1.8 }}>
          <li>Most of his commentaries on Plato's dialogues</li>
          <li>Commentary on Plotinus (his other major project)</li>
          <li>Medical and astrological works</li>
          <li>The bulk of his correspondence (over 1,000 letters)</li>
          <li>Many shorter philosophical treatises</li>
        </ul>
      </figure>

      <p>
        Ficino's influence was enormous—he shaped how Europe understood Plato for centuries.
        But to actually <em>study</em> Ficino in depth, you still need Latin.
      </p>

      <h2>Lorenzo Valla (255 editions in USTC)</h2>

      <p>
        Valla is famous for two things: proving the Donation of Constantine was a forgery,
        and writing <em>De Elegantia Linguae Latinae</em>—the most influential Latin style
        guide of the Renaissance. The first has been translated. The second has not.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#228B22' }}>What IS translated:</h3>
        <ul style={{ color: '#444', marginBottom: '16px', lineHeight: 1.8 }}>
          <li>On the Donation of Constantine</li>
          <li>De Voluptate / On Pleasure (his philosophical dialogue)</li>
          <li>On Free Will</li>
          <li>Some letters and shorter works</li>
        </ul>

        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#9e4a3a' }}>What is NOT translated:</h3>
        <ul style={{ color: '#444', lineHeight: 1.8 }}>
          <li><strong>De Elegantia Linguae Latinae</strong> — 255 editions, no complete English translation</li>
          <li>Dialectical Disputations (Repastinatio Dialectice)</li>
          <li>Most of his polemical works and invectives</li>
          <li>Historical works (Gesta Ferdinandi Regis)</li>
        </ul>
      </figure>

      <p>
        The <em>Elegantiae</em> went through <strong>255 editions</strong>. It was one of the most
        widely-read books of the Renaissance—a bestseller that shaped Latin style for two
        centuries. And there's no complete English translation.
      </p>

      <h2>Giovanni Pico della Mirandola (72 editions)</h2>

      <p>
        Everyone knows the "Oration on the Dignity of Man"—it's in every Renaissance anthology.
        But Pico wrote far more than that one speech.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#228B22' }}>What IS translated:</h3>
        <ul style={{ color: '#444', marginBottom: '16px', lineHeight: 1.8 }}>
          <li>Oration on the Dignity of Man</li>
          <li>Heptaplus (commentary on Genesis)</li>
          <li>On Being and the One</li>
        </ul>

        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#9e4a3a' }}>What is NOT translated:</h3>
        <ul style={{ color: '#444', lineHeight: 1.8 }}>
          <li>The 900 Theses (what the Oration was supposed to introduce!)</li>
          <li>Disputationes adversus astrologiam</li>
          <li>Most of his philosophical correspondence</li>
          <li>Commentary on Benivieni's love poetry</li>
        </ul>
      </figure>

      <p>
        The famous Oration was written as a preface to 900 theses Pico wanted to debate
        publicly. We've translated the preface. The actual theses—the substance of what
        he wanted to argue—remain mostly inaccessible in English.
      </p>

      <h2>The Pattern</h2>

      <p>
        The same pattern repeats across Renaissance humanism:
      </p>

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
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Author</th>
              <th style={{ textAlign: 'right', padding: '12px', color: '#1a1612' }}>Editions</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Translation Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#444' }}>Justus Lipsius</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>558</td>
              <td style={{ padding: '12px', color: '#c9a86c' }}>~5% translated</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#444' }}>Lorenzo Valla</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>255</td>
              <td style={{ padding: '12px', color: '#c9a86c' }}>~10% translated</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#444' }}>Girolamo Cardano</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>109</td>
              <td style={{ padding: '12px', color: '#c9a86c' }}>~15% translated</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#444' }}>Angelo Poliziano</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>105</td>
              <td style={{ padding: '12px', color: '#9e4a3a' }}>~5% translated</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#444' }}>Leonardo Bruni</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>79</td>
              <td style={{ padding: '12px', color: '#c9a86c' }}>~20% translated</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#444' }}>Pico della Mirandola</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>72</td>
              <td style={{ padding: '12px', color: '#c9a86c' }}>~15% translated</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#444' }}>Giacomo Zabarella</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>67</td>
              <td style={{ padding: '12px', color: '#9e4a3a' }}>&lt;5% translated</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px', color: '#444' }}>Giovanni Pontano</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>47</td>
              <td style={{ padding: '12px', color: '#9e4a3a' }}>&lt;5% translated</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', color: '#444' }}>Marsilio Ficino</td>
              <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'monospace', color: '#444' }}>45</td>
              <td style={{ padding: '12px', color: '#c9a86c' }}>~25% translated</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <h2>Why This Matters</h2>

      <p>
        If even <em>Ficino</em> isn't fully translated—one of the most important philosophers
        of the Renaissance, someone with a dedicated scholarly following—what hope is there for
        the thousands of less famous writers?
      </p>

      <p>
        Our understanding of Renaissance thought is based on:
      </p>

      <ul>
        <li>A handful of famous works from a handful of famous authors</li>
        <li>Selected excerpts in anthologies</li>
        <li>Secondary scholarship (often based on the same limited sources)</li>
      </ul>

      <p>
        We've built an entire field—Renaissance Studies—on what amounts to a greatest-hits
        compilation. The deep albums, the B-sides, the full discography? Still in Latin.
      </p>

      <h2>The I Tatti Renaissance Library</h2>

      <p>
        There is good news: Harvard's I Tatti Renaissance Library has been steadily translating
        neo-Latin texts since 2001. They've published over 90 volumes of Latin-English facing
        pages—Ficino, Bruni, Pontano, Poliziano, and many others.
      </p>

      <p>
        But 90 volumes over 23 years, covering perhaps a few hundred works total, against a
        corpus of 500,000+ Latin texts from this period? The math doesn't work. At current
        rates, it would take tens of thousands of years to translate everything.
      </p>

      <p>
        The I Tatti library is heroic work. But it's a teaspoon against an ocean.
      </p>

      <h2>What Would Full Access Look Like?</h2>

      <p>
        Imagine if you could:
      </p>

      <ul>
        <li>Read Ficino's complete correspondence—1,000+ letters documenting Renaissance intellectual networks</li>
        <li>Access Valla's <em>Elegantiae</em>—the style guide that shaped how Europe wrote Latin</li>
        <li>Study Zabarella's logical works—hugely influential on early modern philosophy</li>
        <li>Explore Lipsius's philological scholarship—558 editions worth of humanist learning</li>
      </ul>

      <p>
        That's not a hypothetical future. Those texts exist. They're sitting in libraries
        and digital archives right now. What's missing is the bridge—the translation that
        makes them accessible.
      </p>

      <p>
        The question is whether we wait another few centuries for traditional scholarship to
        catch up, or whether we find new ways to open these texts to readers.
      </p>
    </BlogLayout>
  );
}
