import BlogLayout from "../BlogLayout";

export default function ProgressStudies() {
  return (
    <BlogLayout
      title="Progress Studies and the Renaissance: Ten Questions We Can Finally Answer"
      tag="Research"
      slug="progress-studies"
      date="December 2025"
      prevPost={{ href: "/blog/why-latin-matters", title: "Why Latin Matters" }}
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '22px',
        lineHeight: 1.6,
        color: '#444',
        marginBottom: '32px',
      }}>
        In 2019, Patrick Collison and Tyler Cowen called for a new academic discipline:
        &ldquo;Progress Studies.&rdquo; They wanted to understand what conditions enable
        civilizational progress. We have 500,000 data points they haven&apos;t seen.
      </p>

      <h2>What is Progress Studies?</h2>

      <p>
        Progress Studies asks a deceptively simple question: <strong>Why does progress happen,
        and how can we make it happen faster?</strong>
      </p>

      <p>
        The field emerged from a 2019 Atlantic article by Collison (CEO of Stripe) and Cowen
        (economist at George Mason). They observed that despite enormous investment in science
        and technology, the pace of transformative innovation seems to be slowing. Their thesis:
        we don&apos;t systematically study what makes some eras and institutions produce
        breakthroughs while others stagnate.
      </p>

      <p>
        A key inspiration is Joel Mokyr&apos;s book <em>A Culture of Growth</em>, which argues
        that Europe&apos;s Scientific Revolution wasn&apos;t inevitable—it emerged from a specific
        intellectual culture in early modern Europe. The Enlightenment had preconditions. The
        question is: what were they?
      </p>

      <h2>The Renaissance as Case Study</h2>

      <p>
        If you want to understand what creates the conditions for explosive intellectual progress,
        the Renaissance is the obvious place to look. Between 1450 and 1700, Europe went from
        medieval scholasticism to Newton&apos;s <em>Principia</em>. Something happened.
      </p>

      <p>
        But here&apos;s the problem: <strong>we&apos;ve only studied 3% of the evidence</strong>.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
            <span style={{ color: '#666' }}>Latin works published 1450-1700</span>
            <span style={{ fontWeight: 600, color: '#1a1612' }}>533,000</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
            <span style={{ color: '#666' }}>Translated into English</span>
            <span style={{ fontWeight: 600, color: '#9e4a3a' }}>~16,000 (3%)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
            <span style={{ color: '#666' }}>Accessible to non-specialists</span>
            <span style={{ fontWeight: 600, color: '#9e4a3a' }}>~3%</span>
          </div>
        </div>
      </figure>

      <p>
        The Renaissance wrote itself in Latin. Its debates, discoveries, controversies, and
        correspondence are all in Latin. We&apos;ve translated the &ldquo;greatest hits&rdquo;—Erasmus,
        More, Bacon—but 97% of the intellectual output of this transformative era remains locked away.
      </p>

      <p>
        Progress Studies asks what conditions enabled the Scientific Revolution. We have the
        primary sources to answer that question. We just can&apos;t read them.
      </p>

      <h2>What Our Data Can Tell Them</h2>

      <p>
        The Universal Short Title Catalogue (USTC) records every known edition printed in Europe
        from 1450-1700. We&apos;ve extracted and analyzed the Latin subset: 533,000 works with
        metadata on authors, titles, places, dates, printers, subjects, and edition counts.
      </p>

      <p>
        This dataset can answer questions Progress Studies has been asking:
      </p>

      <h2>Ten Research Questions</h2>

      <h3>1. How Did Ideas Actually Spread?</h3>

      <p>
        Our edition data shows <em>where</em> and <em>when</em> works were reprinted across Europe.
        We can map the diffusion of specific ideas from their first printing to their hundredth edition.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
      }}>
        <strong style={{ color: '#1a1612' }}>Research questions:</strong>
        <ul style={{ margin: '12px 0 0 0', paddingLeft: '20px', color: '#555' }}>
          <li>Did ideas spread center→periphery, or through hub cities?</li>
          <li>Which cities were &ldquo;idea importers&rdquo; vs. &ldquo;idea exporters&rdquo;?</li>
          <li>How long did it take for a work published in Venice to appear in Frankfurt?</li>
          <li>Did network structure predict which ideas succeeded?</li>
        </ul>
      </figure>

      <h3>2. The Selection Problem in Intellectual History</h3>

      <p>
        We know what modern scholars have chosen to translate. But what did the Renaissance
        itself consider important? Edition counts tell us what people actually bought and read.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
      }}>
        <strong style={{ color: '#1a1612' }}>The discrepancy is striking:</strong>
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#555' }}>Donatus, <em>Ars Minor</em></span>
            <span style={{ color: '#9e4a3a', fontWeight: 600 }}>364 editions</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#555' }}>Villedieu, <em>Doctrinale</em></span>
            <span style={{ color: '#9e4a3a', fontWeight: 600 }}>139 editions</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#555' }}>Modern English translations of either</span>
            <span style={{ color: '#9e4a3a', fontWeight: 600 }}>0</span>
          </div>
        </div>
      </figure>

      <p>
        These were the most-read books of their era. Today they&apos;re completely unknown.
        <strong>What else have we systematically filtered out?</strong>
      </p>

      <h3>3. The &ldquo;Dark Matter&rdquo; of the Scientific Revolution</h3>

      <p>
        Mokyr argues that Europe&apos;s &ldquo;culture of growth&rdquo; enabled the Scientific Revolution.
        But we&apos;ve only studied a fraction of that culture. The untranslated 97% includes:
      </p>

      <ul>
        <li><strong>170,000 theological works</strong> — Did they develop logical frameworks
        that transferred to natural philosophy?</li>
        <li><strong>150,000 university disputations</strong> — How did academic debate evolve?</li>
        <li><strong>73,000 legal commentaries</strong> — Did legal reasoning influence scientific method?</li>
      </ul>

      <p>
        We can&apos;t answer &ldquo;what enabled the Scientific Revolution&rdquo; while ignoring
        97% of the intellectual context.
      </p>

      <h3>4. Speed of Knowledge vs. Speed of Progress</h3>

      <p>
        Did faster idea diffusion correlate with faster innovation? We can track:
      </p>

      <ul>
        <li>Time from first edition to tenth edition (acceleration of spread)</li>
        <li>Geographic reach within 5, 10, 50 years</li>
        <li>Whether saturation effects emerged (more printing ≠ more progress)</li>
      </ul>

      <p>
        This matters because Progress Studies debates whether information overload can
        actually <em>slow</em> innovation. We have 250 years of data to test this.
      </p>

      <h3>5. Practical Knowledge vs. Theoretical Knowledge</h3>

      <p>
        Did <em>how-to</em> knowledge spread differently than <em>why</em> knowledge?
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
      }}>
        <strong style={{ color: '#1a1612' }}>Compare diffusion patterns of:</strong>
        <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <p style={{ margin: '0 0 8px 0', fontWeight: 500 }}>Practical texts</p>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#555' }}>
              <li>Navigation manuals</li>
              <li>Mining/metallurgy</li>
              <li>Agricultural treatises</li>
              <li>Architectural guides</li>
            </ul>
          </div>
          <div>
            <p style={{ margin: '0 0 8px 0', fontWeight: 500 }}>Theoretical texts</p>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#555' }}>
              <li>Natural philosophy</li>
              <li>Metaphysics</li>
              <li>Theology</li>
              <li>Mathematics</li>
            </ul>
          </div>
        </div>
      </figure>

      <p>
        Joel Mokyr distinguishes between &ldquo;propositional knowledge&rdquo; (what) and
        &ldquo;prescriptive knowledge&rdquo; (how). Our data can test whether they had
        different network structures.
      </p>

      <h3>6. When and Why Did Translation Happen?</h3>

      <p>
        Our data on the 416 Latin-English bilingual editions is a natural experiment.
        What predicted which works got translated in their own era?
      </p>

      <ul>
        <li>Did state or church patronage matter?</li>
        <li>Commercial viability?</li>
        <li>Author networks and reputation?</li>
        <li>Can we identify &ldquo;translation clusters&rdquo;—periods of intense activity?</li>
      </ul>

      <p>
        This directly addresses institutional questions: what makes knowledge accessible?
      </p>

      <h3>7. The Reformation as Natural Experiment</h3>

      <p>
        The Reformation split Europe into competing intellectual zones. We can ask:
      </p>

      <ul>
        <li>Did confessional competition accelerate intellectual output?</li>
        <li>Did Protestant and Catholic regions develop different specializations?</li>
        <li>Did confessional borders become intellectual borders?</li>
        <li>Was competition productive or fragmenting?</li>
      </ul>

      <p>
        This tests a core Progress Studies hypothesis: does competition between institutions
        drive innovation?
      </p>

      <h3>8. Was There a 17th-Century Stagnation?</h3>

      <p>
        Historians debate a &ldquo;crisis of the 17th century.&rdquo; Our publication data spans
        this period. We can ask:
      </p>

      <ul>
        <li>Did output plateau after initial printing explosion?</li>
        <li>Did novelty decline (more reprints, fewer new works)?</li>
        <li>How did the Thirty Years&apos; War affect intellectual production?</li>
      </ul>

      <p>
        This provides historical precedent for the &ldquo;Great Stagnation&rdquo; thesis
        that motivates Progress Studies.
      </p>

      <h3>9. Intellectual Lineages and Mentorship</h3>

      <p>
        Patrick Collison has emphasized how research culture transmits through mentorship—his
        example is the Cori lab, where six Nobel laureates trained under a single mentor.
      </p>

      <p>
        Can we reconstruct early modern intellectual lineages?
      </p>

      <ul>
        <li>Track dedications, shared printers, geographic co-location</li>
        <li>Identify &ldquo;academic genealogies&rdquo; from publication patterns</li>
        <li>Test whether certain cities/universities produced outsized descendants</li>
      </ul>

      <h3>10. What Predicts Long-Term Influence?</h3>

      <p>
        Which early signals predicted a work&apos;s lasting impact? We can build models using:
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
      }}>
        <strong style={{ color: '#1a1612' }}>Potential predictors:</strong>
        <ul style={{ margin: '12px 0 0 0', paddingLeft: '20px', color: '#555' }}>
          <li>Edition count in first 50 years</li>
          <li>Geographic spread (number of cities)</li>
          <li>Subject classification</li>
          <li>Author&apos;s prior reputation</li>
          <li>Printer/publisher network centrality</li>
        </ul>
      </figure>

      <p>
        If we can identify what made Renaissance works influential, we might learn something
        about identifying important work today.
      </p>

      <h2 style={{
        borderTop: '3px solid #9e4a3a',
        paddingTop: '32px',
        marginTop: '48px',
      }}>Research in Progress: The Selection Problem</h2>

      <p>
        We&apos;ve begun investigating these questions. Here&apos;s our first finding.
      </p>

      <h3>Question</h3>

      <p>
        <strong>What did the Renaissance actually read, and how does that compare to what
        we&apos;ve chosen to translate?</strong>
      </p>

      <p>
        If modern scholarship has systematically filtered out certain types of knowledge,
        our understanding of Renaissance intellectual culture—and the conditions that
        enabled progress—may be fundamentally skewed.
      </p>

      <h3>Method</h3>

      <p>
        We analyzed the complete USTC Latin corpus (499,779 editions) to identify the
        most frequently printed works. Edition count serves as a proxy for what people
        actually bought and read. We then cross-referenced the top 500 bestsellers against
        known translation series (Loeb Classical Library, I Tatti Renaissance Library,
        Dumbarton Oaks Medieval Library) and individual translations.
      </p>

      <h3>Results</h3>

      <figure style={{
        background: '#9e4a3a10',
        border: '2px solid #9e4a3a30',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#9e4a3a',
          marginTop: 0,
          marginBottom: '16px',
        }}>KEY FINDING</h4>
        <p style={{
          fontFamily: 'Newsreader, Georgia, serif',
          fontSize: '20px',
          lineHeight: 1.5,
          color: '#1a1612',
          margin: 0,
        }}>
          Of the top 500 Renaissance bestsellers (14,103 total editions),
          <strong> 47.5% have no modern English translation</strong>.
          Five works with over 100 editions each—including the #2 bestseller
          of the entire period—remain completely inaccessible.
        </p>
      </figure>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#1a1612',
          marginTop: 0,
          marginBottom: '16px',
        }}>TOP 5 UNTRANSLATED BESTSELLERS</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
          {[
            { editions: 344, title: 'Ars Minor', author: 'Donatus', note: 'THE Latin grammar textbook for 1,000 years. Printed in 41 cities across 13 countries. Zero English translations.' },
            { editions: 154, title: 'Doctrinale', author: 'Alexander de Villa Dei', note: 'Verse grammar used in every European school. 32 cities. No translation.' },
            { editions: 119, title: 'Manipulus Curatorum', author: 'Guido de Monte Rocherii', note: 'Priests\' manual that shaped pastoral practice across Europe. Never translated.' },
            { editions: 108, title: 'Postilla super epistolas et evangelia', author: 'Guillermus Parisiensis', note: 'Biblical commentary used for Sunday sermons. 20 cities. No translation.' },
            { editions: 106, title: 'Modus Confitendi', author: 'Andrés de Escobar', note: 'Confession manual that defined penitential practice. 17 cities. No translation.' },
          ].map((work, i) => (
            <div key={i} style={{ borderBottom: i < 4 ? '1px solid #e0d8c8' : 'none', paddingBottom: i < 4 ? '16px' : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#1a1612' }}>{work.title}</span>
                <span style={{ color: '#9e4a3a', fontWeight: 600 }}>{work.editions} editions</span>
              </div>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>{work.author}</div>
              <div style={{ fontSize: '13px', color: '#555' }}>{work.note}</div>
            </div>
          ))}
        </div>
      </figure>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#1a1612',
          marginTop: 0,
          marginBottom: '16px',
        }}>UNTRANSLATED EDITIONS BY SUBJECT</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
          {[
            { subject: 'Religious', works: 102, editions: 2368 },
            { subject: 'Educational Books', works: 39, editions: 1117 },
            { subject: 'University Publications', works: 36, editions: 765 },
            { subject: 'Classical Authors', works: 7, editions: 481 },
            { subject: 'Jurisprudence', works: 20, editions: 390 },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>{row.subject}</span>
              <span style={{ color: '#1a1612' }}>{row.works} works, <strong>{row.editions.toLocaleString()}</strong> editions</span>
            </div>
          ))}
        </div>
      </figure>

      <h3>Implications</h3>

      <p>
        The untranslated works aren&apos;t marginal curiosities. They&apos;re the
        <strong> infrastructure of Renaissance intellectual life</strong>:
      </p>

      <ul>
        <li><strong>Grammar textbooks</strong> that trained every educated European</li>
        <li><strong>Priests&apos; manuals</strong> that shaped religious practice for millions</li>
        <li><strong>Confession guides</strong> that defined moral frameworks</li>
        <li><strong>Sermon collections</strong> that ordinary people actually heard</li>
        <li><strong>University curricula</strong> that produced the Scientific Revolution&apos;s practitioners</li>
      </ul>

      <p>
        If we want to understand what conditions enabled Renaissance progress, we need
        to study what people actually read—not just what 19th-century German scholars
        chose to preserve.
      </p>

      <p>
        <strong>We are studying the Renaissance through a 52.5% keyhole.</strong>
      </p>

      <h2 style={{
        borderTop: '3px solid #546b8a',
        paddingTop: '32px',
        marginTop: '48px',
      }}>Research in Progress: Geographic Diffusion</h2>

      <h3>Question</h3>

      <p>
        <strong>How fast did ideas spread across Renaissance Europe, and did diffusion
        accelerate over time?</strong>
      </p>

      <p>
        Progress Studies asks whether faster knowledge diffusion enables faster innovation.
        We have 250 years of data showing exactly where and when bestsellers were reprinted.
      </p>

      <h3>Method</h3>

      <p>
        We selected 50 Latin works with the widest geographic spread (10+ cities, 20+ editions).
        For each, we tracked when it first appeared in each city, measuring time from origin
        to 5, 10, and 20 cities.
      </p>

      <h3>Results</h3>

      <figure style={{
        background: '#546b8a10',
        border: '2px solid #546b8a30',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#546b8a',
          marginTop: 0,
          marginBottom: '16px',
        }}>DIFFUSION SPEED</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#555' }}>Time to reach 5 cities</span>
            <span style={{ fontWeight: 600, color: '#1a1612' }}>12 years (average)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#555' }}>Time to reach 10 cities</span>
            <span style={{ fontWeight: 600, color: '#1a1612' }}>35 years (average)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#555' }}>Time to reach 20 cities</span>
            <span style={{ fontWeight: 600, color: '#1a1612' }}>78 years (average)</span>
          </div>
        </div>
      </figure>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#1a1612',
          marginTop: 0,
          marginBottom: '16px',
        }}>HUB CITIES</h4>
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px' }}>
          These cities appeared earliest in diffusion sequences—ideas passed through here:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
          {[
            { city: 'Venice', score: 200, note: 'Primary gateway for ideas entering/leaving Italy' },
            { city: 'Rome', score: 171, note: 'Papal center, religious publishing hub' },
            { city: 'Strasbourg', score: 163, note: 'Bridge between Romance and Germanic worlds' },
            { city: 'Paris', score: 159, note: 'University center, French market entry' },
            { city: 'Cologne', score: 155, note: 'Gateway to Northern Europe' },
          ].map((hub, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: 600, color: '#1a1612' }}>{i + 1}. {hub.city}</span>
                <span style={{ color: '#666', marginLeft: '8px', fontSize: '13px' }}>— {hub.note}</span>
              </div>
            </div>
          ))}
        </div>
      </figure>

      <figure style={{
        background: '#9e4a3a10',
        border: '2px solid #9e4a3a30',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#9e4a3a',
          marginTop: 0,
          marginBottom: '16px',
        }}>SURPRISING FINDING</h4>
        <p style={{
          fontFamily: 'Newsreader, Georgia, serif',
          fontSize: '20px',
          lineHeight: 1.5,
          color: '#1a1612',
          margin: 0,
        }}>
          <strong>Diffusion slowed down after 1550.</strong> Works published before 1550
          took an average of 32 years to reach 10 cities. Works published after 1550
          took 74 years—more than twice as long.
        </p>
      </figure>

      <h3>Implications</h3>

      <p>
        The slowdown after 1550 is counterintuitive. By then, printing infrastructure was
        mature and widespread. Why would ideas spread <em>slower</em>?
      </p>

      <p>
        Possible explanations:
      </p>

      <ul>
        <li><strong>Market saturation</strong> — By 1550, the &ldquo;low-hanging fruit&rdquo;
        (classical texts, grammar books) had already been printed everywhere. New works
        faced more competition.</li>
        <li><strong>Confessional fragmentation</strong> — The Reformation split Europe
        into Protestant and Catholic markets. A work printed in Wittenberg might not
        spread to Rome, and vice versa.</li>
        <li><strong>Counter-Reformation controls</strong> — The Index of Forbidden Books
        (1559) and tighter censorship may have slowed cross-border diffusion.</li>
        <li><strong>Vernacular competition</strong> — By 1550, vernacular publishing was
        rising. Latin works faced competition from local-language alternatives.</li>
      </ul>

      <p>
        This finding complicates the simple Progress Studies narrative that
        &ldquo;more infrastructure = faster diffusion = more progress.&rdquo; Sometimes
        institutions and market dynamics matter more than raw capacity.
      </p>

      <h2 style={{
        borderTop: '3px solid #6b8a5a',
        paddingTop: '32px',
        marginTop: '48px',
      }}>Research in Progress: The Reformation as Natural Experiment</h2>

      <h3>Question</h3>

      <p>
        <strong>Did confessional competition accelerate or fragment intellectual production?</strong>
      </p>

      <p>
        The Reformation split Europe into Protestant and Catholic zones. Progress Studies
        debates whether competition between institutions drives innovation. We can test this
        directly: did the Reformation speed up or slow down knowledge production and diffusion?
      </p>

      <h3>Method</h3>

      <p>
        We classified 499,779 Latin editions by the confessional affiliation of their printing
        city (Protestant, Catholic, or mixed/unknown) and tracked production and diffusion
        patterns across six eras from 1450 to 1700.
      </p>

      <h3>Results</h3>

      <figure style={{
        background: '#6b8a5a10',
        border: '2px solid #6b8a5a30',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#6b8a5a',
          marginTop: 0,
          marginBottom: '16px',
        }}>PRODUCTION RATES BY ERA</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#555' }}>Pre-Reformation (1450-1516)</span>
            <span style={{ fontWeight: 600, color: '#1a1612' }}>590 editions/year</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#555' }}>Early Reformation (1517-1554)</span>
            <span style={{ fontWeight: 600, color: '#1a1612' }}>1,248 editions/year</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#555' }}>Confessionalization (1564-1617)</span>
            <span style={{ fontWeight: 600, color: '#6b8a5a' }}>2,463 editions/year</span>
          </div>
        </div>
        <p style={{ marginTop: '16px', marginBottom: 0, fontSize: '16px', color: '#1a1612' }}>
          <strong>Output increased 4.2x after the Reformation.</strong>
        </p>
      </figure>

      <figure style={{
        background: '#9e4a3a10',
        border: '2px solid #9e4a3a30',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#9e4a3a',
          marginTop: 0,
          marginBottom: '16px',
        }}>BUT: CROSS-CONFESSIONAL DIFFUSION COLLAPSED</h4>
        <p style={{
          fontFamily: 'Newsreader, Georgia, serif',
          fontSize: '20px',
          lineHeight: 1.5,
          color: '#1a1612',
          margin: 0,
        }}>
          Only <strong>0.6%</strong> of works appeared in both Protestant and Catholic cities.
          Ideas stayed within confessional boundaries.
        </p>
      </figure>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#1a1612',
          marginTop: 0,
          marginBottom: '16px',
        }}>SUBJECT SPECIALIZATION BY CONFESSION</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
          <div>
            <p style={{ margin: '0 0 12px 0', fontWeight: 600, color: '#546b8a' }}>Protestant Regions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>University Publications</span>
                <span style={{ fontWeight: 600 }}>48.8%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Religious</span>
                <span>13.6%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Jurisprudence</span>
                <span>3.8%</span>
              </div>
            </div>
          </div>
          <div>
            <p style={{ margin: '0 0 12px 0', fontWeight: 600, color: '#9e4a3a' }}>Catholic Regions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Religious</span>
                <span style={{ fontWeight: 600 }}>36.2%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Jurisprudence</span>
                <span>10.6%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Classical Authors</span>
                <span>5.6%</span>
              </div>
            </div>
          </div>
        </div>
      </figure>

      <h3>Implications</h3>

      <p>
        The Reformation produced a paradox that complicates simple Progress Studies narratives:
      </p>

      <ul>
        <li><strong>Competition drove production UP</strong> — Protestant and Catholic
        institutions competed to produce scholarship, increasing output 4.2x</li>
        <li><strong>But fragmentation slowed diffusion DOWN</strong> — Ideas stayed
        within confessional boundaries, reducing cross-pollination</li>
        <li><strong>Markets specialized</strong> — Protestant regions focused on
        university disputations; Catholic regions on religious texts and law</li>
      </ul>

      <p>
        This explains our earlier finding that diffusion slowed after 1550 despite
        more printing infrastructure. <strong>It wasn&apos;t a technology problem—it was
        an institutional fragmentation problem.</strong>
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <p style={{
          fontFamily: 'Newsreader, Georgia, serif',
          fontSize: '18px',
          lineHeight: 1.6,
          color: '#333',
          margin: 0,
          fontStyle: 'italic',
        }}>
          &ldquo;More production + less diffusion = fragmented progress.&rdquo;
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          color: '#666',
          marginTop: '12px',
          marginBottom: 0,
        }}>
          The Reformation shows that institutional competition can simultaneously
          accelerate <em>quantity</em> while fragmenting <em>reach</em>. For Progress
          Studies, this suggests that counting output alone misses crucial dynamics.
        </p>
      </figure>

      <h2 style={{
        borderTop: '3px solid #8a6b5a',
        paddingTop: '32px',
        marginTop: '48px',
      }}>Research in Progress: The 17th-Century Stagnation</h2>

      <h3>Question</h3>

      <p>
        <strong>Did the &ldquo;Crisis of the 17th Century&rdquo; create a precedent for
        the modern Great Stagnation?</strong>
      </p>

      <p>
        Tyler Cowen and Patrick Collison have argued that innovation has slowed since
        the 1970s despite rising R&amp;D spending. Is this pattern unprecedented, or has it
        happened before? The Thirty Years&apos; War (1618-1648) devastated Central Europe.
        What did it do to intellectual production?
      </p>

      <h3>Method</h3>

      <p>
        We tracked annual Latin publishing from 1500-1700, measuring total output,
        unique titles (novelty), and reprint ratios (existing works reprinted vs. new works).
      </p>

      <h3>Results</h3>

      <figure style={{
        background: '#8a6b5a10',
        border: '2px solid #8a6b5a30',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#8a6b5a',
          marginTop: 0,
          marginBottom: '16px',
        }}>WAR IMPACT ON PRODUCTION</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#555' }}>Pre-war (1580-1617)</span>
            <span style={{ fontWeight: 600, color: '#1a1612' }}>2,723 editions/year</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#555' }}>War trough (1634)</span>
            <span style={{ fontWeight: 600, color: '#9e4a3a' }}>2,387 editions/year</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#555' }}>Post-war peak (1670)</span>
            <span style={{ fontWeight: 600, color: '#6b8a5a' }}>3,906 editions/year</span>
          </div>
        </div>
        <p style={{ marginTop: '16px', marginBottom: 0, fontSize: '14px', color: '#666' }}>
          Drop from pre-war to trough: <strong>39%</strong>. Recovery time: <strong>22 years</strong> after war ended.
        </p>
      </figure>

      <figure style={{
        background: '#9e4a3a10',
        border: '2px solid #9e4a3a30',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#9e4a3a',
          marginTop: 0,
          marginBottom: '16px',
        }}>THE NOVELTY PROBLEM</h4>
        <p style={{
          fontFamily: 'Newsreader, Georgia, serif',
          fontSize: '20px',
          lineHeight: 1.5,
          color: '#1a1612',
          margin: 0,
        }}>
          Reprint ratio increased from <strong>7%</strong> (1580-1617) to
          <strong> 10%</strong> (1650-1700). Output recovered, but <em>novelty declined</em>.
        </p>
      </figure>

      <h3>Implications</h3>

      <p>
        The 17th-century pattern mirrors the modern &ldquo;Great Stagnation&rdquo; in striking ways:
      </p>

      <ul>
        <li><strong>Quantity recovered faster than quality</strong> — Post-war output
        exceeded pre-war levels, but more of it was reprints of existing works</li>
        <li><strong>Geographic disruption persisted</strong> — German lands (the war zone)
        declined from 802 to 708 editions/year and took decades to recover</li>
        <li><strong>Institutional damage outlasted the war</strong> — Universities,
        printing networks, and patronage systems were disrupted</li>
      </ul>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <p style={{
          fontFamily: 'Newsreader, Georgia, serif',
          fontSize: '18px',
          lineHeight: 1.6,
          color: '#333',
          margin: 0,
          fontStyle: 'italic',
        }}>
          &ldquo;More output, less novelty&rdquo; — the signature of stagnation — is not
          a uniquely modern phenomenon. It happened before, triggered by war and
          institutional disruption.
        </p>
      </figure>

      <p>
        For Progress Studies, this provides a crucial historical precedent: stagnation
        can happen even in periods of apparent growth. <strong>Counting publications (or
        patents, or papers) is not the same as measuring innovation.</strong>
      </p>

      <h2 style={{
        borderTop: '3px solid #5a6b8a',
        paddingTop: '32px',
        marginTop: '48px',
      }}>Research in Progress: AI-Assisted Translation Prioritization</h2>

      <h3>Question</h3>

      <p>
        <strong>If we could only translate 200 works from the Renaissance Latin corpus,
        which ones would matter most?</strong>
      </p>

      <p>
        With 409,685 Latin works in our master bibliography, prioritization is essential.
        We used AI to enrich the top 200 priority works with scholarly metadata, identifying
        which high-impact works remain untranslated.
      </p>

      <h3>Method</h3>

      <p>
        We scored all works by a priority formula combining edition count (popularity),
        geographic spread (influence), and temporal range (durability). The top 200 works
        were then enriched using GPT-4 via the Codex CLI, adding:
      </p>

      <ul>
        <li>English title translations</li>
        <li>Genre classification and brief descriptions</li>
        <li>Scholarly importance ratings (1-10)</li>
        <li>Translation difficulty assessment</li>
        <li>Existing translation status</li>
      </ul>

      <h3>Results</h3>

      <figure style={{
        background: '#5a6b8a10',
        border: '2px solid #5a6b8a30',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#5a6b8a',
          marginTop: 0,
          marginBottom: '16px',
        }}>ENRICHMENT RESULTS</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#555' }}>Works successfully enriched</span>
            <span style={{ fontWeight: 600, color: '#1a1612' }}>195 / 200</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#555' }}>High scholarly importance (8-10)</span>
            <span style={{ fontWeight: 600, color: '#1a1612' }}>92 works</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#555' }}>Already have English translation</span>
            <span style={{ fontWeight: 600, color: '#6b8a5a' }}>92 works</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#555' }}>Need translation</span>
            <span style={{ fontWeight: 600, color: '#9e4a3a' }}>103 works (53%)</span>
          </div>
        </div>
      </figure>

      <figure style={{
        background: '#9e4a3a10',
        border: '2px solid #9e4a3a30',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#9e4a3a',
          marginTop: 0,
          marginBottom: '16px',
        }}>KEY FINDING</h4>
        <p style={{
          fontFamily: 'Newsreader, Georgia, serif',
          fontSize: '20px',
          lineHeight: 1.5,
          color: '#1a1612',
          margin: 0,
        }}>
          <strong>27 works</strong> have both high scholarly importance (8-10 rating)
          <em> and</em> no English translation. These are the highest-priority targets
          for the translation project.
        </p>
      </figure>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#1a1612',
          marginTop: 0,
          marginBottom: '16px',
        }}>TOP UNTRANSLATED HIGH-PRIORITY WORKS</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
          {[
            { title: 'Dictionary (Calepino)', importance: 9, genre: 'Lexicography', note: 'The standard Latin dictionary of Renaissance Europe, used by every scholar' },
            { title: 'Elements of Grammar (Perotti)', importance: 9, genre: 'Grammar', note: 'Humanist grammar textbook that shaped Latin education' },
            { title: 'Index of Prohibited Books', importance: 9, genre: 'Ecclesiastical', note: 'Counter-Reformation censorship list that shaped intellectual boundaries' },
            { title: 'Universal Medicine (Fernel)', importance: 9, genre: 'Medicine', note: 'Foundational medical textbook of early modern Europe' },
            { title: 'Tree of Science (Llull)', importance: 9, genre: 'Philosophy', note: 'Ramon Llull&apos;s encyclopedic system of knowledge classification' },
            { title: 'The Doctrinal (Villa Dei)', importance: 8, genre: 'Grammar', note: 'Medieval verse grammar memorized by generations of students' },
            { title: 'Book of Secrets (Albertus Magnus)', importance: 8, genre: 'Natural Philosophy', note: 'Popular compendium of natural magic and herbalism' },
            { title: 'Hammer of Witches', importance: 9, genre: 'Demonology', note: 'The notorious witch-hunting manual—influential and untranslated in full' },
          ].map((work, i) => (
            <div key={i} style={{ borderBottom: i < 7 ? '1px solid #e0d8c8' : 'none', paddingBottom: i < 7 ? '16px' : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#1a1612' }}>{work.title}</span>
                <span style={{ color: '#9e4a3a', fontWeight: 600 }}>{work.importance}/10</span>
              </div>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>{work.genre}</div>
              <div style={{ fontSize: '13px', color: '#555' }}>{work.note}</div>
            </div>
          ))}
        </div>
      </figure>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <h4 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#1a1612',
          marginTop: 0,
          marginBottom: '16px',
        }}>GENRE DISTRIBUTION (TOP 200)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
          {[
            { genre: 'Treatise', count: 69 },
            { genre: 'Grammar', count: 25 },
            { genre: 'Poetry', count: 15 },
            { genre: 'Commentary', count: 6 },
            { genre: 'History', count: 5 },
            { genre: 'Letters', count: 4 },
            { genre: 'Devotional', count: 4 },
            { genre: 'Sermons', count: 4 },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>{row.genre}</span>
              <span style={{ color: '#1a1612', fontWeight: 500 }}>{row.count} works</span>
            </div>
          ))}
        </div>
      </figure>

      <h3>Implications</h3>

      <p>
        The AI enrichment reveals a clear translation agenda. The highest-priority untranslated
        works fall into three categories:
      </p>

      <ul>
        <li><strong>Reference works</strong> — Dictionaries, grammars, and indices that were
        the infrastructure of Renaissance learning</li>
        <li><strong>Institutional texts</strong> — Church regulations, university curricula,
        and legal commentaries that shaped how institutions functioned</li>
        <li><strong>Popular knowledge</strong> — Medical handbooks, natural philosophy, and
        &ldquo;secrets&rdquo; literature that ordinary people actually read</li>
      </ul>

      <p>
        None of these are the &ldquo;great works&rdquo; that traditional intellectual history
        celebrates. They&apos;re the <strong>operating system</strong> of Renaissance intellectual
        life—the texts that made other texts possible.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <p style={{
          fontFamily: 'Newsreader, Georgia, serif',
          fontSize: '18px',
          lineHeight: 1.6,
          color: '#333',
          margin: 0,
          fontStyle: 'italic',
        }}>
          AI can help us see what human selection has filtered out. The 27 high-priority
          untranslated works aren&apos;t obscure—they&apos;re foundational texts that modern
          scholarship has simply never made accessible.
        </p>
      </figure>

      <h2>Summary: Five Findings for Progress Studies</h2>

      <figure style={{
        background: '#546b8a10',
        border: '2px solid #546b8a30',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
          <div>
            <p style={{ margin: '0 0 4px 0', fontWeight: 600, color: '#9e4a3a' }}>1. THE SELECTION PROBLEM</p>
            <p style={{ margin: 0, color: '#555' }}>47.5% of Renaissance bestsellers have no modern translation. We&apos;re studying progress through a 52.5% keyhole.</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px 0', fontWeight: 600, color: '#546b8a' }}>2. THE DIFFUSION SLOWDOWN</p>
            <p style={{ margin: 0, color: '#555' }}>Ideas spread slower after 1550 (32 → 74 years to reach 10 cities), despite more printing infrastructure.</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px 0', fontWeight: 600, color: '#6b8a5a' }}>3. THE COMPETITION PARADOX</p>
            <p style={{ margin: 0, color: '#555' }}>The Reformation increased output 4.2x but fragmented diffusion. Only 0.6% of works crossed confessional boundaries.</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px 0', fontWeight: 600, color: '#8a6b5a' }}>4. THE STAGNATION PRECEDENT</p>
            <p style={{ margin: 0, color: '#555' }}>The Thirty Years&apos; War caused a 39% production drop. Recovery took 22 years, and novelty never fully returned.</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px 0', fontWeight: 600, color: '#5a6b8a' }}>5. THE INFRASTRUCTURE GAP</p>
            <p style={{ margin: 0, color: '#555' }}>27 high-importance works remain untranslated—not obscure texts, but the reference works and institutional documents that were the operating system of Renaissance learning.</p>
          </div>
        </div>
      </figure>

      <h2>Why This Matters for Progress Studies</h2>

      <p>
        Progress Studies has relied heavily on 20th-century case studies: Bell Labs, Xerox PARC,
        the Manhattan Project, Silicon Valley. These are valuable, but they&apos;re also:
      </p>

      <ul>
        <li><strong>Recent</strong> — hard to distinguish signal from noise</li>
        <li><strong>American</strong> — may reflect specific institutional context</li>
        <li><strong>Technology-focused</strong> — may miss broader intellectual dynamics</li>
      </ul>

      <p>
        The Renaissance offers a different kind of evidence: a 250-year transformation of
        European civilization, documented in 533,000 publications, with complete bibliographic
        metadata.
      </p>

      <figure style={{
        background: '#546b8a15',
        border: '1px solid #546b8a30',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <p style={{
          fontFamily: 'Newsreader, Georgia, serif',
          fontSize: '18px',
          lineHeight: 1.6,
          color: '#333',
          margin: 0,
          fontStyle: 'italic',
        }}>
          &ldquo;The subject of progress can encompass a huge range of topics, from education
          policy, the history of ideas and technological innovation, the scientific process
          and grantmaking, to the study of effective organisations and management, social
          movements, or environmental science.&rdquo;
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          color: '#666',
          marginTop: '12px',
          marginBottom: 0,
        }}>
          — Collison & Cowen, &ldquo;We Need a New Science of Progress&rdquo; (2019)
        </p>
      </figure>

      <p>
        We have the data to study the history of ideas at scale. The question is whether
        anyone will use it.
      </p>

      <h2>Next Steps</h2>

      <p>
        We&apos;re looking for collaborators who want to pursue these questions:
      </p>

      <ul>
        <li><strong>Data scientists</strong> who can build network models of idea diffusion</li>
        <li><strong>Historians</strong> who can contextualize the quantitative patterns</li>
        <li><strong>Progress Studies researchers</strong> who can connect Renaissance findings
        to modern questions</li>
        <li><strong>Translators</strong> who can unlock specific texts that emerge as important</li>
      </ul>

      <p>
        The Renaissance invented the conditions for modern progress. Understanding how that
        happened isn&apos;t just historical curiosity—it&apos;s practical research into how
        civilizations transform themselves.
      </p>

      <p>
        We have 500,000 books waiting. Let&apos;s start reading them.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          color: '#555',
          margin: 0,
        }}>
          <strong>Further reading:</strong>
        </p>
        <ul style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          margin: '12px 0 0 0',
          paddingLeft: '20px',
          color: '#555',
        }}>
          <li>
            <a href="https://www.theatlantic.com/science/archive/2019/07/we-need-new-science-progress/594946/"
               style={{ color: '#9e4a3a' }} target="_blank" rel="noopener noreferrer">
              &ldquo;We Need a New Science of Progress&rdquo;
            </a> — Collison & Cowen, The Atlantic (2019)
          </li>
          <li>
            <a href="https://press.stripe.com/"
               style={{ color: '#9e4a3a' }} target="_blank" rel="noopener noreferrer">
              Stripe Press
            </a> — &ldquo;Ideas for progress&rdquo; book series
          </li>
          <li>
            <a href="https://worksinprogress.co/"
               style={{ color: '#9e4a3a' }} target="_blank" rel="noopener noreferrer">
              Works in Progress
            </a> — Progress Studies magazine
          </li>
          <li>
            <a href="https://patrickcollison.com/progress"
               style={{ color: '#9e4a3a' }} target="_blank" rel="noopener noreferrer">
              patrickcollison.com/progress
            </a> — Collison&apos;s progress resources
          </li>
        </ul>
      </figure>
    </BlogLayout>
  );
}
