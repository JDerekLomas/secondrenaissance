import BlogLayout from "../BlogLayout";

export default function LostBooks() {
  return (
    <BlogLayout
      title="The Dark Matter of Book History: How Many Latin Works Are Lost Forever?"
      tag="Research"
      prevPost={{ href: "/blog/theology-problem", title: "The Theology Problem" }}
      nextPost={{ href: "/blog/methodology", title: "Methodology" }}
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '22px',
        lineHeight: 1.6,
        color: '#444',
        marginBottom: '32px',
      }}>
        We talk about 500,000 Latin works surviving from 1450–1700. But what about the ones that
        didn&apos;t survive? The real number of Latin works ever printed may be far higher—and
        we&apos;ll never know exactly how much has been lost.
      </p>

      <h2>The Known Universe</h2>

      <p>
        The Universal Short Title Catalogue records around 1.6 million editions printed in Europe
        between 1450 and 1700, including roughly 503,000 Latin works. These are books that survive
        in at least one copy, somewhere in the world&apos;s libraries.
      </p>

      <p>
        But book historians have long known this is an undercount. Many early printed works have
        vanished entirely—not a single copy remains. Others survive in just one or two copies,
        often discovered by chance in obscure collections.
      </p>

      <h2>Statistical Estimates of Loss</h2>

      <p>
        Scholars have developed statistical methods to estimate how many editions were printed but
        no longer survive. The results are sobering:
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <table style={{
          width: '100%',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          borderCollapse: 'collapse',
        }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0d8c8' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Format</th>
              <th style={{ textAlign: 'right', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Estimated Loss Rate</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Broadsheets (single sheets)", "~60%"],
              ["Quartos (small format)", "~30%"],
              ["Folios (large format)", "~15%"],
              ["Incunabula (pre-1501)", "~40% (20,000+ lost editions)"],
            ].map(([format, rate], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e0d8c8' }}>
                <td style={{ padding: '12px 8px', color: '#1a1612' }}>{format}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', color: '#9e4a3a', fontFamily: 'monospace' }}>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          color: '#888',
          marginTop: '16px',
        }}>
          Based on research from the USTC project and bibliographic studies. Loss rates vary by format, subject, and region.
        </p>
      </figure>

      <p>
        The pattern is clear: the more ephemeral the format, the greater the loss. Large, expensive
        books printed on quality paper were kept, bound, and shelved. Cheap pamphlets, broadsides,
        and single sheets were used, discarded, and forgotten.
      </p>

      <h2>The Dutch Case Study</h2>

      <p>
        Andrew Pettegree and Arthur der Weduwen conducted a remarkable study of the Dutch Republic&apos;s
        seventeenth-century book trade. By examining auction catalogues, publishers&apos; stock lists,
        newspaper advertisements, and archival records, they found evidence of books that were
        definitely printed but no longer survive anywhere.
      </p>

      <p>
        Their conclusion? <strong>At a conservative estimate, Dutch printing houses published at
        least 357,500 editions—over five times the number recorded in the Short Title Catalogue
        Netherlands.</strong>
      </p>

      <p>
        And this calculation didn&apos;t even include truly ephemeral forms like handbills and posters,
        whose survival rate is &ldquo;microscopically small.&rdquo;
      </p>

      <h2>What Gets Lost</h2>

      <p>
        The books that survive are not a random sample. Certain categories were far more likely
        to vanish:
      </p>

      <ul>
        <li><strong>Pamphlets and polemics</strong> — Timely controversies that seemed urgent
        when printed but disposable afterward</li>
        <li><strong>Popular literature</strong> — Ballads, romances, and chapbooks read to
        pieces by their audiences</li>
        <li><strong>Practical manuals</strong> — Almanacs, handbooks, and guides used until
        they fell apart</li>
        <li><strong>Educational texts</strong> — Primers, grammars, and schoolbooks worn out
        by students</li>
        <li><strong>Official documents</strong> — Government ordinances, proclamations, and
        legal forms considered outdated once superseded</li>
      </ul>

      <p>
        Meanwhile, large theological folios, legal commentaries, and scientific treatises—the
        kinds of books libraries kept—survive in multiple copies.
      </p>

      <h2>The Unique Copy Problem</h2>

      <p>
        Even among surviving editions, many are precarious. The USTC project found that in
        their study of French sixteenth-century books, <strong>almost half of the 52,000
        editions catalogued survive in only a single copy</strong>.
      </p>

      <p>
        These unique survivors exist by chance. Had one library fire occurred differently,
        had one collector made different choices, these books would be entirely unknown to us.
        They remind us that the border between &ldquo;surviving&rdquo; and &ldquo;lost&rdquo; is
        often just luck.
      </p>

      <h2>Before Print: The Medieval Losses</h2>

      <p>
        If printed books have suffered such attrition, manuscripts fared even worse. A recent
        study in <em>Science</em> applied ecological modeling techniques (originally developed
        to estimate wildlife populations) to medieval literature:
      </p>

      <ul>
        <li><strong>90% of medieval manuscripts are lost</strong> — Only about 3,648 of an
        estimated 40,614 manuscripts survive</li>
        <li><strong>32% of literary works are entirely lost</strong> — We only have 799 of
        an estimated 1,170 medieval tales</li>
        <li>For English medieval fiction specifically, survival rates are even lower—possibly
        due to the dissolution of monasteries under Henry VIII</li>
      </ul>

      <h2>What This Means for Latin Literature</h2>

      <p>
        If we apply conservative loss estimates to the Latin corpus:
      </p>

      <figure style={{
        background: '#fff',
        border: '1px solid #e8e4dc',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #e8e4dc' }}>
            <span style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '16px', color: '#444' }}>Surviving Latin editions (USTC)</span>
            <span style={{ fontFamily: 'monospace', fontSize: '20px', color: '#1a1612', fontWeight: 600 }}>~503,000</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #e8e4dc' }}>
            <span style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '16px', color: '#444' }}>Conservatively estimated lost (~25%)</span>
            <span style={{ fontFamily: 'monospace', fontSize: '20px', color: '#9e4a3a', fontWeight: 600 }}>~170,000</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
            <span style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '16px', color: '#444', fontWeight: 600 }}>Total Latin editions ever printed (estimate)</span>
            <span style={{ fontFamily: 'monospace', fontSize: '24px', color: '#1a1612', fontWeight: 600 }}>~670,000+</span>
          </div>
        </div>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          color: '#888',
          marginTop: '16px',
        }}>
          Using conservative 25% loss rate. If Dutch Republic patterns apply more broadly (80%+ loss for ephemera), the true total could be far higher.
        </p>
      </figure>

      <h2>The Iceberg Analogy</h2>

      <p>
        What we can see—the 503,000 surviving Latin works—is the tip of an iceberg. Below the
        surface lies an unknown mass of lost editions:
      </p>

      <ul>
        <li>Pamphlets that circulated during the Reformation, read and discarded</li>
        <li>University disputations printed for a single occasion</li>
        <li>Scientific instruments and tables used until worn out</li>
        <li>Government proclamations in Latin, superseded and pulped</li>
        <li>Popular medical remedies printed on cheap paper</li>
      </ul>

      <p>
        We know these existed because contemporary sources mention them, reference them, quote
        them—but no copy survives.
      </p>

      <h2>Implications</h2>

      <p>
        This &ldquo;dark matter&rdquo; of book history has several implications for our project:
      </p>

      <p>
        <strong>The 3% translation rate is an overestimate.</strong> We calculate that less than
        3% of surviving Latin works have been translated. But if the true corpus was 670,000+
        editions, the translation rate for all Latin works ever printed drops below 2.5%.
      </p>

      <p>
        <strong>We&apos;re missing entire genres.</strong> The loss rates for ephemeral printing
        mean we have a biased view of what Latin was used for. The dry theological folios that
        survive may not represent the full range of Latin literary production.
      </p>

      <p>
        <strong>Every surviving work is precious.</strong> The books that made it to the present
        day survived against the odds. Each one represents not just itself but the many similar
        works that perished.
      </p>

      <h2>A Note on Sources</h2>

      <p>
        The research cited here comes from the pioneering work of the USTC team at St Andrews,
        particularly Andrew Pettegree&apos;s <em>Lost Books: Reconstructing the Print World of
        Pre-Industrial Europe</em> (Brill, 2016) and subsequent studies. For medieval manuscript
        losses, see Kestemont et al., &ldquo;Forgotten books: The application of unseen species
        models to the survival of culture&rdquo; (<em>Science</em>, 2022).
      </p>

      <p>
        Understanding what we&apos;ve lost helps us appreciate what survives—and motivates the
        urgency of making it accessible before more is forgotten.
      </p>
    </BlogLayout>
  );
}
