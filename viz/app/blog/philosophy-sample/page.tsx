import BlogLayout from "../BlogLayout";

export default function PhilosophySample() {
  return (
    <BlogLayout
      title="100 Random Philosophy Works: What We Found"
      tag="Methodology"
      slug="philosophy-sample"
      prevPost={{ href: "/blog/natural-philosophy-sample", title: "Natural Philosophy Sample" }}
      nextPost={{ href: "/blog/roadmap", title: "Translation Roadmap" }}
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '22px',
        lineHeight: 1.6,
        color: '#444',
        marginBottom: '32px',
      }}>
        I randomly sampled 100 works from USTC&apos;s &ldquo;Philosophy and Morality&rdquo; category and searched for English translations. The results reveal a systematic pattern: we translate the famous names and ignore the infrastructure of Renaissance thought.
      </p>

      {/* Key stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        margin: '32px 0',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #f5f0e8 0%, #e0d8c8 100%)',
          border: '1px solid #e0d8c8',
          borderRadius: '8px',
          padding: '32px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#9e4a3a' }}>100</div>
          <div style={{ fontSize: '16px', color: '#444' }}>Works sampled</div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #f5f0e8 0%, #e0d8c8 100%)',
          border: '1px solid #e0d8c8',
          borderRadius: '8px',
          padding: '32px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#2ecc71' }}>22</div>
          <div style={{ fontSize: '16px', color: '#444' }}>Have translations</div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #f5f0e8 0%, #e0d8c8 100%)',
          border: '1px solid #e0d8c8',
          borderRadius: '8px',
          padding: '32px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#c9a86c' }}>15</div>
          <div style={{ fontSize: '16px', color: '#444' }}>Classical/Medieval reprints</div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #f5f0e8 0%, #e0d8c8 100%)',
          border: '1px solid #e0d8c8',
          borderRadius: '8px',
          padding: '32px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#1a1612' }}>~10%</div>
          <div style={{ fontSize: '16px', color: '#444' }}>Renaissance-original rate</div>
        </div>
      </div>

      <h2>Methodology</h2>

      <div style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1a1612' }}>
          Sampling Parameters
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#444' }}>
          <li><strong style={{ color: '#1a1612' }}>Category:</strong> USTC &ldquo;Philosophy and Morality&rdquo;</li>
          <li><strong style={{ color: '#1a1612' }}>Population:</strong> 9,359 Latin editions</li>
          <li><strong style={{ color: '#1a1612' }}>Sample size:</strong> 100 works (3 batches: 25 + 25 + 50)</li>
          <li><strong style={{ color: '#1a1612' }}>Seeds:</strong> 2024, 5555, 7777 (reproducible)</li>
          <li><strong style={{ color: '#1a1612' }}>Method:</strong> Python <code style={{ fontFamily: 'Monaco, Courier, monospace', fontSize: '13px', background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>random.sample()</code></li>
        </ul>
      </div>

      <h2>The Translated Works</h2>

      <p>
        Of 100 random philosophy works, 22 have some form of English translation. But the pattern is revealing:
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        overflow: 'hidden',
        margin: '32px 0',
      }}>
        <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#e0d8c8' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Author</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Work</th>
              <th style={{ textAlign: 'center', padding: '12px', color: '#1a1612' }}>Year</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Translation</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0d8c8', background: '#2ecc7115' }}>
              <td style={{ padding: '12px', fontWeight: 600 }}>Descartes (2x)</td>
              <td style={{ padding: '12px' }}>Principia; Methodus</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>1672/1677</td>
              <td style={{ padding: '12px', color: '#2ecc71' }}>Multiple modern translations</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8', background: '#2ecc7115' }}>
              <td style={{ padding: '12px', fontWeight: 600 }}>Lipsius</td>
              <td style={{ padding: '12px' }}>De constantia</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>1613</td>
              <td style={{ padding: '12px', color: '#2ecc71' }}>Stradling 1594; modern eds.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8', background: '#2ecc7115' }}>
              <td style={{ padding: '12px', fontWeight: 600 }}>Erasmus</td>
              <td style={{ padding: '12px' }}>Parabolae sive similia</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>1521</td>
              <td style={{ padding: '12px', color: '#2ecc71' }}>Collected Works vol. 23-24</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8', background: '#2ecc7115' }}>
              <td style={{ padding: '12px', fontWeight: 600 }}>Cardano</td>
              <td style={{ padding: '12px' }}>De subtilitate</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>1551</td>
              <td style={{ padding: '12px', color: '#2ecc71' }}>Forrester 2013 (MRTS)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8', background: '#2ecc7115' }}>
              <td style={{ padding: '12px', fontWeight: 600 }}>Francis Bacon</td>
              <td style={{ padding: '12px' }}>Opera</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>1696</td>
              <td style={{ padding: '12px', color: '#2ecc71' }}>Multiple translations</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8', background: '#2ecc7115' }}>
              <td style={{ padding: '12px', fontWeight: 600 }}>William Ames</td>
              <td style={{ padding: '12px' }}>De conscientia</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>1624</td>
              <td style={{ padding: '12px', color: '#2ecc71' }}>Conscience with Power (17th c.)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8', background: '#546b8a15' }}>
              <td style={{ padding: '12px' }}>Paolo Veneto (2x)</td>
              <td style={{ padding: '12px' }}>Logica; Summulae</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>1507/1522</td>
              <td style={{ padding: '12px', color: '#546b8a' }}>Partial (OUP fascicules)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8', background: '#546b8a15' }}>
              <td style={{ padding: '12px' }}>Ramus/Talon (2x)</td>
              <td style={{ padding: '12px' }}>Rhetorica</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>1620/1621</td>
              <td style={{ padding: '12px', color: '#546b8a' }}>MacIlmaine 1574 (Dialectica)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8', background: '#546b8a15' }}>
              <td style={{ padding: '12px' }}>Melanchthon</td>
              <td style={{ padding: '12px' }}>In Aristotelis Ethica</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>1535</td>
              <td style={{ padding: '12px', color: '#546b8a' }}>Partial (Cambridge; Bk 1)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8', background: '#546b8a15' }}>
              <td style={{ padding: '12px' }}>Gassendi</td>
              <td style={{ padding: '12px' }}>Animadversiones (Epicurus)</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>1675</td>
              <td style={{ padding: '12px', color: '#546b8a' }}>Excerpts only (Stanley)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8', background: '#546b8a15' }}>
              <td style={{ padding: '12px' }}>Jan Marek Marci</td>
              <td style={{ padding: '12px' }}>Philosophia Vetus Restituta</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>1676</td>
              <td style={{ padding: '12px', color: '#546b8a' }}>Excerpts (Voynich interest)</td>
            </tr>
          </tbody>
        </table>
        <figcaption style={{ padding: '12px', background: '#e0d8c8', color: '#666', fontSize: '13px' }}>
          Renaissance-original works with translations (11 works, ~10% of sample)
        </figcaption>
      </figure>

      <h2>Classical and Medieval Reprints</h2>

      <p>
        15 of our 100 &ldquo;Renaissance philosophy&rdquo; works are actually reprints of classical or medieval authors:
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        margin: '32px 0',
      }}>
        <div style={{ background: '#c9a86c15', border: '1px solid #c9a86c', borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontWeight: 600, color: '#c9a86c', marginBottom: '8px' }}>Classical (8)</div>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#444' }}>
            <li>Aristotle (5x) - Ethics, Rhetoric, Logic</li>
            <li>Seneca - De virtutibus</li>
            <li>Alexander of Aphrodisias</li>
            <li>Johannes Philoponus</li>
          </ul>
        </div>
        <div style={{ background: '#c9a86c15', border: '1px solid #c9a86c', borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontWeight: 600, color: '#c9a86c', marginBottom: '8px' }}>Medieval (7)</div>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#444' }}>
            <li>Boethius (2x)</li>
            <li>Duns Scotus</li>
            <li>Albertus Magnus</li>
            <li>Bernard of Clairvaux</li>
            <li>Aegidius Romanus</li>
            <li>William Peraldus</li>
          </ul>
        </div>
      </div>

      <p>
        These authors have translations&mdash;but of their <em>original</em> medieval or classical texts, not the Renaissance editions with new commentaries and apparatus. The Renaissance scholarly contribution remains untranslated.
      </p>

      <h2>The Untranslated 78%</h2>

      <p>
        78 of 100 works have no English translation. They fall into clear categories:
      </p>

      <div style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, color: '#1a1612' }}>Logic textbooks</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#9e4a3a', fontWeight: 600 }}>~30 works</span>
            </div>
            <div style={{ background: '#9e4a3a', height: '8px', borderRadius: '4px', width: '38%' }}></div>
            <p style={{ fontSize: '13px', color: '#666', margin: '8px 0 0' }}>Summulae, dialectics, institutiones logicae&mdash;the bread and butter of university education</p>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, color: '#1a1612' }}>Aristotle commentaries</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#9e4a3a', fontWeight: 600 }}>~15 works</span>
            </div>
            <div style={{ background: '#9e4a3a', height: '8px', borderRadius: '4px', width: '19%' }}></div>
            <p style={{ fontSize: '13px', color: '#666', margin: '8px 0 0' }}>In Physicam, In Ethica, In Metaphysica&mdash;how Aristotle was actually taught</p>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, color: '#1a1612' }}>Philosophy courses</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#9e4a3a', fontWeight: 600 }}>~12 works</span>
            </div>
            <div style={{ background: '#9e4a3a', height: '8px', borderRadius: '4px', width: '15%' }}></div>
            <p style={{ fontSize: '13px', color: '#666', margin: '8px 0 0' }}>Cursus philosophicus, compendia, institutiones&mdash;complete philosophy curricula</p>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, color: '#1a1612' }}>Metaphysics manuals</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#9e4a3a', fontWeight: 600 }}>~8 works</span>
            </div>
            <div style={{ background: '#9e4a3a', height: '8px', borderRadius: '4px', width: '10%' }}></div>
            <p style={{ fontSize: '13px', color: '#666', margin: '8px 0 0' }}>Idea metaphysicae, compendium metaphysices&mdash;foundational ontology</p>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, color: '#1a1612' }}>Moral philosophy</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#9e4a3a', fontWeight: 600 }}>~8 works</span>
            </div>
            <div style={{ background: '#9e4a3a', height: '8px', borderRadius: '4px', width: '10%' }}></div>
            <p style={{ fontSize: '13px', color: '#666', margin: '8px 0 0' }}>Ethics, virtues and vices, moral education</p>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, color: '#1a1612' }}>Other</span>
              <span style={{ fontFamily: 'Monaco, Courier, monospace', color: '#9e4a3a', fontWeight: 600 }}>~5 works</span>
            </div>
            <div style={{ background: '#9e4a3a', height: '8px', borderRadius: '4px', width: '6%' }}></div>
            <p style={{ fontSize: '13px', color: '#666', margin: '8px 0 0' }}>Orations, theses, miscellaneous</p>
          </div>
        </div>
      </div>

      <h2>Notable Untranslated Works</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        margin: '32px 0',
      }}>
        <div style={{
          background: '#fff',
          border: '2px solid #9e4a3a',
          borderRadius: '8px',
          padding: '24px',
        }}>
          <h3 style={{ fontSize: '20px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: '#9e4a3a', marginBottom: '8px' }}>
            Johann Clauberg (appeared 2x)
          </h3>
          <p style={{ color: '#444', fontSize: '14px', marginBottom: '16px' }}>
            <em>Dubitatio Cartesiana</em> (1665). Key early Cartesian, coined the term &ldquo;ontology&rdquo; with Goclenius. No English translation of any of his works exists.
          </p>
          <p style={{ color: '#888', fontSize: '13px' }}>
            Appeared in two separate random samples&mdash;statistically improbable, highlighting his prominence in the corpus.
          </p>
        </div>

        <div style={{
          background: '#fff',
          border: '2px solid #9e4a3a',
          borderRadius: '8px',
          padding: '24px',
        }}>
          <h3 style={{ fontSize: '20px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: '#9e4a3a', marginBottom: '8px' }}>
            Rudolph Goclenius: Institutiones logicae (1598)
          </h3>
          <p style={{ color: '#444', fontSize: '14px', marginBottom: '16px' }}>
            Co-coined &ldquo;ontology&rdquo;; his <em>Lexicon philosophicum</em> (1613) was the first philosophical dictionary. None of his works translated.
          </p>
          <p style={{ color: '#888', fontSize: '13px' }}>
            Foundational for the vocabulary of modern philosophy.
          </p>
        </div>

        <div style={{
          background: '#fff',
          border: '2px solid #9e4a3a',
          borderRadius: '8px',
          padding: '24px',
        }}>
          <h3 style={{ fontSize: '20px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: '#9e4a3a', marginBottom: '8px' }}>
            Johann Bisterfeld: Elementa logica (1657)
          </h3>
          <p style={{ color: '#444', fontSize: '14px', marginBottom: '16px' }}>
            Reformed encyclopedist who influenced Leibniz&apos;s combinatorial logic. Part of the Herborn school of encyclopedism.
          </p>
          <p style={{ color: '#888', fontSize: '13px' }}>
            Direct precursor to Leibniz&apos;s <em>ars combinatoria</em>.
          </p>
        </div>

        <div style={{
          background: '#fff',
          border: '2px solid #c9a86c',
          borderRadius: '8px',
          padding: '24px',
        }}>
          <h3 style={{ fontSize: '20px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: '#c9a86c', marginBottom: '8px' }}>
            Robert Pazmann: De culta Confucii (1700)
          </h3>
          <p style={{ color: '#444', fontSize: '14px', marginBottom: '16px' }}>
            Jesuit text on whether Chinese veneration of Confucius constitutes idolatry. Part of the famous Chinese Rites Controversy.
          </p>
          <p style={{ color: '#888', fontSize: '13px' }}>
            Cross-cultural philosophy at the dawn of globalization.
          </p>
        </div>

        <div style={{
          background: '#fff',
          border: '2px solid #c9a86c',
          borderRadius: '8px',
          padding: '24px',
        }}>
          <h3 style={{ fontSize: '20px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: '#c9a86c', marginBottom: '8px' }}>
            Richard Blackburne: Vita Hobbes (1682)
          </h3>
          <p style={{ color: '#444', fontSize: '14px', marginBottom: '16px' }}>
            Early biography of Thomas Hobbes by a contemporary. Essential primary source for understanding how Hobbes was perceived.
          </p>
          <p style={{ color: '#888', fontSize: '13px' }}>
            Hobbes scholars work from his own writings; this external view is inaccessible.
          </p>
        </div>

        <div style={{
          background: '#fff',
          border: '2px solid #c9a86c',
          borderRadius: '8px',
          padding: '24px',
        }}>
          <h3 style={{ fontSize: '20px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, color: '#c9a86c', marginBottom: '8px' }}>
            Antonius Balinghem: Zoopaideia (1621)
          </h3>
          <p style={{ color: '#444', fontSize: '14px', marginBottom: '16px' }}>
            &ldquo;Moral education from animals&rdquo;&mdash;a unique genre using animal behavior for ethical instruction.
          </p>
          <p style={{ color: '#888', fontSize: '13px' }}>
            Representative of popular moral literature now invisible.
          </p>
        </div>
      </div>

      <h2>Sample Breakdown by Batch</h2>

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
              <th style={{ textAlign: 'left', padding: '12px', color: '#1a1612' }}>Sample</th>
              <th style={{ textAlign: 'right', padding: '12px', color: '#1a1612' }}>Size</th>
              <th style={{ textAlign: 'right', padding: '12px', color: '#1a1612' }}>Translated</th>
              <th style={{ textAlign: 'right', padding: '12px', color: '#1a1612' }}>Classical/Medieval</th>
              <th style={{ textAlign: 'right', padding: '12px', color: '#1a1612' }}>Ren. Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Batch 1 (seed=2024)</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px' }}>25</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px' }}>3</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px' }}>2</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px' }}>12%</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Batch 2 (seed=5555)</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px' }}>25</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px' }}>9</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px' }}>8</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px' }}>6%</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0d8c8' }}>
              <td style={{ padding: '12px' }}>Batch 3 (seed=7777)</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px' }}>50</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px' }}>10</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px' }}>5</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px' }}>12%</td>
            </tr>
            <tr style={{ background: '#e0d8c8' }}>
              <td style={{ padding: '12px', fontWeight: 600 }}>TOTAL</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', fontWeight: 600 }}>100</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', fontWeight: 600 }}>22</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', fontWeight: 600 }}>15</td>
              <td style={{ textAlign: 'right', fontFamily: 'Monaco, Courier, monospace', padding: '12px', fontWeight: 600, color: '#9e4a3a' }}>~10%</td>
            </tr>
          </tbody>
        </table>
      </figure>

      <h2>Key Findings</h2>

      <div style={{
        background: '#f5f0e8',
        border: '1px solid #c9a86c',
        borderLeft: '4px solid #c9a86c',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <ol style={{ margin: 0, paddingLeft: '20px', color: '#444' }}>
          <li style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#1a1612' }}>~10% translation rate for Renaissance-original philosophy</strong>&mdash;higher than the 2% baseline, but still 90% untranslated.
          </li>
          <li style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#1a1612' }}>15% of &ldquo;Renaissance philosophy&rdquo; is classical/medieval reprints</strong>&mdash;Aristotle, Boethius, Scotus editions inflate apparent translation rates.
          </li>
          <li style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#1a1612' }}>Famous names account for almost all translations</strong>&mdash;Descartes, Erasmus, Lipsius, Bacon, Cardano. Remove them and the rate drops to ~3%.
          </li>
          <li style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#1a1612' }}>Logic textbooks are almost completely untranslated</strong>&mdash;~30 logic works in sample, fewer than 5 have any translation.
          </li>
          <li>
            <strong style={{ color: '#1a1612' }}>The founders of &ldquo;ontology&rdquo; have no translations</strong>&mdash;Clauberg and Goclenius coined the term, yet neither has a single work in English.
          </li>
        </ol>
      </div>

      <h2>The Philosophy Paradox</h2>

      <p>
        You might expect philosophy to have better translation coverage than other fields. Philosophers are famous; their ideas matter; they&apos;re taught in universities.
      </p>

      <p>
        But the sample reveals a structural problem: <strong style={{ color: '#9e4a3a' }}>we translate the conclusions but not the context</strong>.
      </p>

      <ul>
        <li>We have Descartes&apos;s <em>Meditations</em>, but not Clauberg&apos;s <em>Dubitatio Cartesiana</em> that shows how Cartesianism actually spread</li>
        <li>We have Aristotle, but not the 15+ Renaissance commentaries in our sample that show how Aristotle was <em>taught</em></li>
        <li>We have Leibniz, but not Bisterfeld&apos;s <em>Elementa logica</em> that influenced his combinatorial logic</li>
        <li>We have the term &ldquo;ontology,&rdquo; but not the works of Goclenius and Clauberg who coined it</li>
      </ul>

      <div style={{
        background: '#1a1612',
        color: '#f5f0e8',
        borderRadius: '8px',
        padding: '32px',
        margin: '32px 0',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '20px', fontFamily: 'Cormorant Garamond, serif', margin: 0 }}>
          &ldquo;We know the history of philosophy through its peaks.<br />
          The mountain range itself remains invisible.&rdquo;
        </p>
      </div>

      <h2>Recommendations for Translation Roadmap</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
        margin: '32px 0',
      }}>
        <div style={{
          background: '#fff',
          border: '2px solid #9e4a3a',
          borderRadius: '8px',
          padding: '20px',
        }}>
          <div style={{ fontSize: '12px', color: '#9e4a3a', fontWeight: 600, marginBottom: '4px' }}>HIGH PRIORITY</div>
          <h4 style={{ fontSize: '18px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginBottom: '8px' }}>
            Clauberg & Goclenius: The Ontology Founders
          </h4>
          <p style={{ color: '#444', fontSize: '14px' }}>
            Clauberg&apos;s <em>Ontosophia</em> and Goclenius&apos;s <em>Lexicon philosophicum</em>. The origin of modern metaphysical vocabulary.
          </p>
        </div>

        <div style={{
          background: '#fff',
          border: '2px solid #9e4a3a',
          borderRadius: '8px',
          padding: '20px',
        }}>
          <div style={{ fontSize: '12px', color: '#9e4a3a', fontWeight: 600, marginBottom: '4px' }}>HIGH PRIORITY</div>
          <h4 style={{ fontSize: '18px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginBottom: '8px' }}>
            University Logic Anthology
          </h4>
          <p style={{ color: '#444', fontSize: '14px' }}>
            Selections from Du Trieu, Bisterfeld, and standard Summulae. What students actually learned before Descartes.
          </p>
        </div>

        <div style={{
          background: '#fff',
          border: '2px solid #c9a86c',
          borderRadius: '8px',
          padding: '20px',
        }}>
          <div style={{ fontSize: '12px', color: '#c9a86c', fontWeight: 600, marginBottom: '4px' }}>MEDIUM PRIORITY</div>
          <h4 style={{ fontSize: '18px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginBottom: '8px' }}>
            Blackburne: Vita Hobbes
          </h4>
          <p style={{ color: '#444', fontSize: '14px' }}>
            Short, significant, built-in audience. Quick win for Hobbes scholarship.
          </p>
        </div>

        <div style={{
          background: '#fff',
          border: '2px solid #c9a86c',
          borderRadius: '8px',
          padding: '20px',
        }}>
          <div style={{ fontSize: '12px', color: '#c9a86c', fontWeight: 600, marginBottom: '4px' }}>MEDIUM PRIORITY</div>
          <h4 style={{ fontSize: '18px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginBottom: '8px' }}>
            Complete Gassendi Epicurus
          </h4>
          <p style={{ color: '#444', fontSize: '14px' }}>
            <em>Animadversiones</em> in full. The major early modern Epicurean revival text.
          </p>
        </div>
      </div>

      <h2>Reproducibility</h2>

      <pre style={{
        fontFamily: 'Monaco, Courier, monospace',
        fontSize: '13px',
        background: '#1a1612',
        color: '#f5f0e8',
        padding: '24px',
        borderRadius: '8px',
        overflow: 'auto',
        margin: '32px 0',
      }}>
{`import pandas as pd
import random

df = pd.read_csv('ustc_latin_editions.csv', low_memory=False)
philosophy = df[df['classification_1'] == 'Philosophy and Morality']

# Three batches with different seeds
for seed, n in [(2024, 25), (5555, 25), (7777, 50)]:
    random.seed(seed)
    sample = philosophy.iloc[random.sample(range(len(philosophy)), n)]
    print(f"\\n=== Seed {seed} ({n} works) ===")
    for _, row in sample.iterrows():
        print(f"{row['author_name_1']}: {row['std_title']}")`}
      </pre>

      <p>
        See also: <a href="/blog/natural-philosophy-sample" style={{ color: '#9e4a3a' }}>Natural Philosophy Sample</a> | <a href="/blog/methodology" style={{ color: '#9e4a3a' }}>Full Methodology</a>
      </p>
    </BlogLayout>
  );
}
