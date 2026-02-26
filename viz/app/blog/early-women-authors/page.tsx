import Link from "next/link";
import BlogLayout from "../BlogLayout";
import { generateBlogMetadata } from "@/lib/blogMetadata";

const postMeta = {
  title: "A Timeline of Early Women Authors",
  description: "From Themistoclea (550 BCE) to Mary Astell (1700): 2,200 years of women's writing. The Pythagoreans, the German mystics, the Italian humanists—now recovered from Victorian erasure.",
  slug: "early-women-authors",
  date: "2025-12-25",
};

export const metadata = generateBlogMetadata(postMeta);

export default function EarlyWomenAuthors() {
  return (
    <BlogLayout
      title="A Timeline of Early Women Authors"
      tag="Research"
      slug="early-women-authors"
      date="December 2025"
    >
      <p style={{ color: '#888', fontFamily: 'Inter, sans-serif', fontSize: '14px', marginBottom: '48px' }}>
        From Themistoclea to Mary Astell: 2,200 years of women&apos;s writing
      </p>

      <div style={{ fontFamily: 'Newsreader, serif', fontSize: '18px', lineHeight: 1.8, color: '#333' }}>
          <p>
            When we think of the &ldquo;great books&rdquo; of the Western tradition, we typically imagine a parade of male authors:
            Homer, Plato, Aristotle, Cicero, Augustine, Aquinas, Dante, Shakespeare, Milton. But this is a distorted picture,
            shaped by centuries of selective preservation and Victorian editorial choices.
          </p>

          <p style={{ marginTop: '24px' }}>
            Women have been writing for as long as men. The problem is that their works were less likely to be copied,
            less likely to be printed, and less likely to be assigned in schools. Many were lost. Many others survived
            but were forgotten. The recovery of these voices is one of the great scholarly achievements of the past fifty years.
          </p>

          <h2 style={{ fontSize: '32px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginTop: '48px', marginBottom: '24px', color: '#1a1612' }}>
            The Pythagorean Women
          </h2>

          <p>
            The tradition of women philosophers begins at the very beginning of Western philosophy itself.
            <strong>Themistoclea</strong>, a priestess at Delphi, is said to have taught Pythagoras his moral doctrines.
            His wife <strong>Theano</strong> and daughters <strong>Myia</strong> and <strong>Damo</strong> continued the school after his death.
          </p>

          <p style={{ marginTop: '24px' }}>
            Other Pythagorean women—<strong>Aesara of Lucania</strong>, <strong>Phintys</strong>, <strong>Perictione</strong>—left
            fragments on ethics and the harmony of the soul. These texts survived because later male philosophers quoted them.
            The Victorians knew about them but showed little interest. Today, scholarly attention has increased 10-fold.
          </p>

          <div style={{ background: '#f5f0e8', border: '1px solid #e0d8c8', borderRadius: '8px', padding: '24px', margin: '32px 0' }}>
            <h3 style={{ fontSize: '18px', fontFamily: 'Inter, sans-serif', fontWeight: 600, marginBottom: '16px', color: '#1a1612' }}>
              Ancient Women Philosophers
            </h3>
            <table style={{ width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #e0d8c8' }}>
                  <th style={{ padding: '8px 0' }}>Name</th>
                  <th style={{ padding: '8px 0' }}>Dates</th>
                  <th style={{ padding: '8px 0' }}>Work</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '8px 0' }}>Themistoclea</td><td>c. 550 BCE</td><td>Taught Pythagoras</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Myia</td><td>c. 500 BCE</td><td>Letter to Phyllis</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Damo</td><td>c. 500 BCE</td><td>Preserved father&apos;s writings</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Perictione</td><td>c. 450 BCE</td><td>On Wisdom</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Aspasia</td><td>c. 450 BCE</td><td>Taught Socrates rhetoric</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Aesara of Lucania</td><td>c. 350 BCE</td><td>On Human Nature</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Phintys</td><td>c. 350 BCE</td><td>On the Moderation of Women</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Arete of Cyrene</td><td>c. 350 BCE</td><td>Head of Cyrenaic school</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Hypatia</td><td>c. 400 CE</td><td>Commentaries on astronomy</td></tr>
              </tbody>
            </table>
          </div>

          <h2 style={{ fontSize: '32px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginTop: '48px', marginBottom: '24px', color: '#1a1612' }}>
            The Medieval Mystics
          </h2>

          <p>
            After Hypatia&apos;s murder in 415 CE, we have a gap of several centuries. Then, beginning in the 10th century,
            a remarkable tradition of women&apos;s writing emerged in the convents and courts of medieval Europe.
          </p>

          <p style={{ marginTop: '24px' }}>
            <strong>Hrotsvitha of Gandersheim</strong> (935–1002) was a Saxon canoness who wrote six plays in Latin—the first
            dramas composed in Europe since antiquity. She explicitly modeled them on Terence, but replaced his plots of
            seduction with stories of Christian martyrdom and conversion.
          </p>

          <p style={{ marginTop: '24px' }}>
            Meanwhile in Japan, <strong>Murasaki Shikibu</strong> was composing the <em>Tale of Genji</em> (c. 1010),
            widely considered the world&apos;s first novel. Her contemporary <strong>Sei Shōnagon</strong> wrote
            the <em>Pillow Book</em>, a genre-defining collection of observations and lists.
          </p>

          <p style={{ marginTop: '24px' }}>
            In the West, <strong>Hildegard of Bingen</strong> (1098–1179) stands as the most versatile genius of the medieval period:
            composer, medical writer, theologian, and visionary. Her musical compositions are still performed;
            her herbal remedies are still studied; her visions still inspire.
          </p>

          <h2 style={{ fontSize: '32px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginTop: '48px', marginBottom: '24px', color: '#1a1612' }}>
            The German Mystics: A Lost School
          </h2>

          <p>
            One of the most striking patterns in our data is the German mystic tradition of the 13th century.
            At the convent of Helfta in Saxony, three extraordinary women overlapped:
          </p>

          <ul style={{ marginTop: '16px', paddingLeft: '24px' }}>
            <li><strong>Mechthild of Magdeburg</strong> (1207–1282) — <em>Flowing Light of the Godhead</em></li>
            <li><strong>Gertrude the Great</strong> (1256–1302) — <em>Herald of Divine Love</em></li>
            <li><strong>Mechthild of Hackeborn</strong> (1241–1299) — <em>Book of Special Grace</em></li>
          </ul>

          <p style={{ marginTop: '24px' }}>
            These women developed a distinctive theology of mystical love, often called <em>Brautmystik</em> (bridal mysticism).
            Their influence on later spirituality—including Meister Eckhart—was profound. Yet the Victorians barely knew them.
            Mechthild of Magdeburg shows <strong>100x growth</strong> in citations from Victorian to Digital era;
            Mechthild of Hackeborn shows <strong>41x growth</strong>.
          </p>

          <p style={{ marginTop: '24px' }}>
            <strong>Marguerite d&apos;Oingt</strong> (1240–1310), a Carthusian mystic, shows the most dramatic recovery:
            <strong>278x growth</strong>. She was virtually invisible to Victorian scholarship.
          </p>

          <h2 style={{ fontSize: '32px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginTop: '48px', marginBottom: '24px', color: '#1a1612' }}>
            The Italian Humanists
          </h2>

          <p>
            The 15th century saw a remarkable flowering of women&apos;s learning in the Italian courts.
            These women were trained in the <em>studia humanitatis</em>—Latin, Greek, rhetoric, poetry—and
            demonstrated their skills through public orations.
          </p>

          <div style={{ background: '#f5f0e8', border: '1px solid #e0d8c8', borderRadius: '8px', padding: '24px', margin: '32px 0' }}>
            <h3 style={{ fontSize: '18px', fontFamily: 'Inter, sans-serif', fontWeight: 600, marginBottom: '16px', color: '#1a1612' }}>
              Italian Women Humanists (1430–1500)
            </h3>
            <table style={{ width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #e0d8c8' }}>
                  <th style={{ padding: '8px 0' }}>Name</th>
                  <th style={{ padding: '8px 0' }}>Dates</th>
                  <th style={{ padding: '8px 0' }}>Achievement</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '8px 0' }}>Battista Malatesta</td><td>1383–1450</td><td>Oration to Emperor Sigismund</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Isotta Nogarola</td><td>1418–1466</td><td>Dialogue on Adam & Eve</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Costanza Varano</td><td>1426–1447</td><td>Child prodigy, Latin orations</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Cecilia Gonzaga</td><td>1425–1451</td><td>Student of Vittorino da Feltre</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Ippolita Maria Sforza</td><td>1445–1488</td><td>Oration to Pope Pius II</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Lucrezia Tornabuoni</td><td>1427–1482</td><td>Lorenzo de&apos; Medici&apos;s mother</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Cassandra Fedele</td><td>1465–1558</td><td>Addressed Doge & University</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Laura Cereta</td><td>1469–1499</td><td>Defender of women&apos;s education</td></tr>
              </tbody>
            </table>
          </div>

          <p>
            These women were famous in their own time. <strong>Cassandra Fedele</strong> was invited to address scholars at Padua;
            <strong>Ippolita Maria Sforza</strong> gave a Latin oration to Pope Pius II at age 15. But by the 19th century,
            most had been forgotten. <strong>Laura Cereta</strong> shows <strong>56x growth</strong>;
            <strong>Battista Malatesta</strong> shows <strong>17x growth</strong>.
          </p>

          <h2 style={{ fontSize: '32px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginTop: '48px', marginBottom: '24px', color: '#1a1612' }}>
            The First Feminists
          </h2>

          <p>
            <strong>Christine de Pizan</strong> (1364–1430) is often called the first professional woman writer in European history.
            Her <em>Book of the City of Ladies</em> (1405) is a systematic defense of women&apos;s capabilities,
            written in response to misogynist attacks.
          </p>

          <p style={{ marginTop: '24px' }}>
            This tradition continued with <strong>Moderata Fonte</strong>&apos;s <em>The Worth of Women</em> (1600)
            and <strong>Lucrezia Marinella</strong>&apos;s <em>The Nobility and Excellence of Women</em> (1600)—both
            Venetian responses to a treatise claiming women&apos;s inferiority.
          </p>

          <p style={{ marginTop: '24px' }}>
            By the 17th century, we have <strong>Marie de Gournay</strong>&apos;s <em>Equality of Men and Women</em> (1622)
            and <strong>Mary Astell</strong>&apos;s <em>A Serious Proposal to the Ladies</em> (1694)—the latter
            calling for women&apos;s colleges a century before they existed.
          </p>

          <h2 style={{ fontSize: '32px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginTop: '48px', marginBottom: '24px', color: '#1a1612' }}>
            Women Scientists
          </h2>

          <p>
            Women also participated in the Scientific Revolution, though their contributions were often
            attributed to husbands or fathers.
          </p>

          <p style={{ marginTop: '24px' }}>
            <strong>Sophie Brahe</strong> (1559–1643) assisted her brother Tycho with astronomical observations.
            <strong>Maria Cunitz</strong> (1610–1664) published <em>Urania Propitia</em>, simplifying Kepler&apos;s tables.
            <strong>Maria Margarethe Kirch</strong> (1670–1720) discovered a comet in 1702—but her husband got the credit.
          </p>

          <p style={{ marginTop: '24px' }}>
            <strong>Maria Sibylla Merian</strong> (1647–1717) traveled to Suriname at age 52 to study insect metamorphosis,
            producing illustrations that are still cited in entomology. She shows <strong>14x growth</strong> in citations.
          </p>

          <p style={{ marginTop: '24px' }}>
            And <strong>Margaret Cavendish</strong> (1623–1673) was the first woman to attend a meeting of the Royal Society—and
            was mocked for it. Her science fiction novel <em>The Blazing World</em> (1666) is now considered a foundational
            text of the genre.
          </p>

          <h2 style={{ fontSize: '32px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginTop: '48px', marginBottom: '24px', color: '#1a1612' }}>
            Why Were They Forgotten?
          </h2>

          <p>
            Several factors contributed to the erasure of women&apos;s writing:
          </p>

          <ul style={{ marginTop: '16px', paddingLeft: '24px' }}>
            <li><strong>Manuscript loss</strong>: Women&apos;s writings were less likely to be copied</li>
            <li><strong>Print bias</strong>: Early printers preferred male authors</li>
            <li><strong>Canonization</strong>: School curricula selected male texts</li>
            <li><strong>Victorian editing</strong>: 19th-century editors had strong biases</li>
            <li><strong>Attribution</strong>: Women&apos;s work was often credited to men</li>
          </ul>

          <p style={{ marginTop: '24px' }}>
            The recovery of these voices is ongoing. New translations, critical editions, and scholarly studies
            appear every year. The Ngram data shows this process in action: most of these authors have
            5-100x more citations today than they did in the Victorian era.
          </p>

          <div style={{ background: '#9e4a3a10', border: '1px solid #9e4a3a30', borderRadius: '8px', padding: '24px', margin: '48px 0' }}>
            <h3 style={{ fontSize: '20px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginBottom: '12px', color: '#9e4a3a' }}>
              Explore the Timeline
            </h3>
            <p style={{ fontFamily: 'Newsreader, serif', fontSize: '16px', marginBottom: '16px' }}>
              See these women&apos;s lives in context with their male contemporaries. Filter by &ldquo;Women Authors&rdquo;
              to see the full tradition from Themistoclea to Mary Astell.
            </p>
            <Link
              href="/timelines"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                background: '#9e4a3a',
                color: '#fff',
                borderRadius: '6px',
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
              }}
            >
              View Interactive Timeline &rarr;
            </Link>
          </div>

          <h2 style={{ fontSize: '32px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginTop: '48px', marginBottom: '24px', color: '#1a1612' }}>
            The Biggest Recoveries
          </h2>

          <p>
            Looking at the Google Ngram data, these authors show the most dramatic increases in scholarly attention:
          </p>

          <div style={{ background: '#f5f0e8', border: '1px solid #e0d8c8', borderRadius: '8px', padding: '24px', margin: '32px 0' }}>
            <table style={{ width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #e0d8c8' }}>
                  <th style={{ padding: '8px 0' }}>Author</th>
                  <th style={{ padding: '8px 0' }}>Growth</th>
                  <th style={{ padding: '8px 0' }}>Note</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '8px 0' }}>Aemilia Lanyer</td><td style={{ color: '#9e4a3a', fontWeight: 600 }}>534x</td><td>First English woman to publish poetry</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Bathsua Makin</td><td style={{ color: '#9e4a3a', fontWeight: 600 }}>288x</td><td>Education reformer</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Marguerite d&apos;Oingt</td><td style={{ color: '#9e4a3a', fontWeight: 600 }}>278x</td><td>Carthusian mystic</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Isabel de Villena</td><td style={{ color: '#9e4a3a', fontWeight: 600 }}>164x</td><td>Catalan abbess</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Ada Lovelace</td><td style={{ color: '#9e4a3a', fontWeight: 600 }}>111x</td><td>First programmer</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Mechthild of Magdeburg</td><td style={{ color: '#9e4a3a', fontWeight: 600 }}>100x</td><td>German mystic</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Murasaki Shikibu</td><td style={{ color: '#9e4a3a', fontWeight: 600 }}>95x</td><td>Tale of Genji</td></tr>
                <tr><td style={{ padding: '8px 0' }}>Émilie du Châtelet</td><td style={{ color: '#9e4a3a', fontWeight: 600 }}>78x</td><td>Translated Newton</td></tr>
              </tbody>
            </table>
          </div>

          <p style={{ marginTop: '32px', fontStyle: 'italic', color: '#666' }}>
            For the full dataset of 120+ women authors with Ngram data, see our{' '}
            <Link href="/sparklines" style={{ color: '#9e4a3a' }}>cultural attention tracker</Link>.
          </p>
        </div>
    </BlogLayout>
  );
}
