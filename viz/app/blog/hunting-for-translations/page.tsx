import Link from "next/link";

export default function HuntingForTranslations() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-8 py-6">
          <Link href="/blog" className="text-violet-400 hover:underline text-sm">
            ← Back to Research Notes
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-8 py-12">
        <div className="mb-8">
          <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-300 rounded">
            Research Report
          </span>
          <span className="text-slate-500 text-sm ml-3">December 5, 2024</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Hunting for Translations: A Day Mapping the Latin-English Landscape
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-xl text-slate-300 mb-8">
            How many Latin works have been translated into English? No one knows. Today I tried
            to find out by cataloguing every major translation series, open-access repository,
            and scholarly resource. The results surprised me.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">The Discovery</h2>

          <p className="text-slate-300 mb-4">
            I started with a simple question: if someone wanted to read Renaissance Latin
            literature in English, what would they find? The answer turned out to be: far
            more than most people realize, yet far less than we need.
          </p>

          <p className="text-slate-300 mb-4">
            After combing through dozens of sources&mdash;from Harvard&apos;s Loeb Classical Library
            to obscure academic repositories&mdash;I compiled a comprehensive inventory. The
            final count:
          </p>

          <div className="bg-gradient-to-br from-violet-900/40 to-cyan-900/40 border border-violet-500/30 rounded-lg p-8 my-8 text-center">
            <div className="text-6xl font-bold text-violet-300 mb-2">3,232</div>
            <div className="text-xl text-slate-300">translation volumes catalogued</div>
            <div className="text-sm text-slate-500 mt-2">1,679 commercial + 1,553 open access</div>
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4">The Major Series</h2>

          <p className="text-slate-300 mb-4">
            Academic publishers have been building Latin translation libraries for over a
            century. Here are the major players:
          </p>

          <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden my-8">
            <table className="w-full text-sm">
              <thead className="bg-slate-800">
                <tr>
                  <th className="text-left p-3">Series</th>
                  <th className="text-right p-3">Volumes</th>
                  <th className="text-left p-3">Period</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr><td className="p-3">Loeb Classical Library</td><td className="text-right p-3 font-mono text-cyan-400">545</td><td className="p-3 text-slate-400">~280 Latin</td></tr>
                <tr><td className="p-3">Aris &amp; Phillips</td><td className="text-right p-3 font-mono text-cyan-400">170</td><td className="p-3 text-slate-400">Classical</td></tr>
                <tr><td className="p-3">Fathers of the Church</td><td className="text-right p-3 font-mono text-cyan-400">147</td><td className="p-3 text-slate-400">Patristic</td></tr>
                <tr><td className="p-3">Penguin Classics (Latin)</td><td className="text-right p-3 font-mono text-cyan-400">114</td><td className="p-3 text-slate-400">Various</td></tr>
                <tr><td className="p-3">Oxford Medieval Texts</td><td className="text-right p-3 font-mono text-cyan-400">103</td><td className="p-3 text-slate-400">Medieval</td></tr>
                <tr><td className="p-3">I Tatti Renaissance Library</td><td className="text-right p-3 font-mono text-cyan-400">100</td><td className="p-3 text-slate-400">Renaissance</td></tr>
                <tr><td className="p-3">Dumbarton Oaks Medieval</td><td className="text-right p-3 font-mono text-cyan-400">91</td><td className="p-3 text-slate-400">Medieval (~45 Latin)</td></tr>
                <tr><td className="p-3">Translated Texts for Historians</td><td className="text-right p-3 font-mono text-cyan-400">86</td><td className="p-3 text-slate-400">Late Antique (~50 Latin)</td></tr>
                <tr><td className="p-3">Collected Works of Erasmus</td><td className="text-right p-3 font-mono text-cyan-400">86+</td><td className="p-3 text-slate-400">Renaissance</td></tr>
                <tr><td className="p-3">Ancient Christian Writers</td><td className="text-right p-3 font-mono text-cyan-400">76</td><td className="p-3 text-slate-400">Patristic</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4">The Hidden Treasure: Open Access</h2>

          <p className="text-slate-300 mb-4">
            The commercial series are impressive, but the real revelation was how much exists
            in open access&mdash;legally free to read online. I found over 1,500 volumes:
          </p>

          <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden my-8">
            <table className="w-full text-sm">
              <thead className="bg-slate-800">
                <tr>
                  <th className="text-left p-3">Resource</th>
                  <th className="text-right p-3">Content</th>
                  <th className="text-left p-3">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr><td className="p-3">Internet Archive - Loeb</td><td className="text-right p-3 font-mono text-emerald-400">545 vols</td><td className="p-3 text-slate-400">archive.org</td></tr>
                <tr><td className="p-3">Loebolus (pre-1928)</td><td className="text-right p-3 font-mono text-emerald-400">277 vols</td><td className="p-3 text-slate-400">ryanfb.github.io/loebolus</td></tr>
                <tr><td className="p-3">Philological Museum</td><td className="text-right p-3 font-mono text-emerald-400">200+ texts</td><td className="p-3 text-slate-400">philological.cal.bham.ac.uk</td></tr>
                <tr><td className="p-3">Global Medieval Sourcebook</td><td className="text-right p-3 font-mono text-emerald-400">200 texts</td><td className="p-3 text-slate-400">Stanford</td></tr>
                <tr><td className="p-3">Internet Archive - Fathers</td><td className="text-right p-3 font-mono text-emerald-400">147 vols</td><td className="p-3 text-slate-400">archive.org</td></tr>
                <tr><td className="p-3">Perseus Digital Library</td><td className="text-right p-3 font-mono text-emerald-400">50+ texts</td><td className="p-3 text-slate-400">perseus.tufts.edu</td></tr>
                <tr><td className="p-3">Ian Bruce Scientific</td><td className="text-right p-3 font-mono text-emerald-400">30 works</td><td className="p-3 text-slate-400">17centurymaths.com</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4">A Key Find: The Philological Museum</h2>

          <p className="text-slate-300 mb-4">
            One resource stood out: Dana F. Sutton&apos;s <strong className="text-white">Philological Museum</strong> at
            the University of Birmingham. This is a goldmine that most people don&apos;t know
            exists.
          </p>

          <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-amber-300 mb-3">The Philological Museum</h3>
            <ul className="text-slate-300 space-y-2">
              <li><strong className="text-white">79,760 items</strong> in the Analytic Bibliography of Neo-Latin Texts</li>
              <li><strong className="text-white">200+ full texts</strong> with English translations</li>
              <li>Focus: British neo-Latin literature (16th-17th century)</li>
              <li>Includes plays, poems, letters, essays from major humanists</li>
              <li>All freely accessible online</li>
            </ul>
          </div>

          <p className="text-slate-300 mb-4">
            I extracted metadata from 89 of their texts, covering 54 unique authors from
            1459 to 1808. Authors like George Buchanan, William Camden, Abraham Cowley,
            John Milton&mdash;all with Latin works translated and available for free.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">Translation Coverage by Period</h2>

          <p className="text-slate-300 mb-4">
            Here&apos;s what struck me most: coverage is wildly uneven across historical periods.
          </p>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 my-8 space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-300">Classical (240 BCE - 600 CE)</span>
                <span className="font-mono text-emerald-400">70-80% translated</span>
              </div>
              <div className="w-full bg-slate-700 h-3 rounded overflow-hidden">
                <div className="bg-emerald-500 h-3" style={{width: '75%'}}></div>
              </div>
              <p className="text-slate-500 text-xs mt-1">362 known authors, 6.3M words in PHI corpus</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-300">Patristic (100 - 800 CE)</span>
                <span className="font-mono text-cyan-400">60-70% translated</span>
              </div>
              <div className="w-full bg-slate-700 h-3 rounded overflow-hidden">
                <div className="bg-cyan-500 h-3" style={{width: '65%'}}></div>
              </div>
              <p className="text-slate-500 text-xs mt-1">~150 major Church Fathers</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-300">Medieval (600 - 1450 CE)</span>
                <span className="font-mono text-amber-400">20-30% translated</span>
              </div>
              <div className="w-full bg-slate-700 h-3 rounded overflow-hidden">
                <div className="bg-amber-500 h-3" style={{width: '25%'}}></div>
              </div>
              <p className="text-slate-500 text-xs mt-1">750,000 surviving manuscripts, 10,000+ authors</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-300">Renaissance (1450 - 1700)</span>
                <span className="font-mono text-red-400">&lt;2% translated</span>
              </div>
              <div className="w-full bg-slate-700 h-3 rounded overflow-hidden">
                <div className="bg-red-500 h-3" style={{width: '2%'}}></div>
              </div>
              <p className="text-slate-500 text-xs mt-1">800,000-1,100,000 Latin editions in USTC</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-300">Scientific/Enlightenment (1600 - 1900)</span>
                <span className="font-mono text-red-400">&lt;1% translated</span>
              </div>
              <div className="w-full bg-slate-700 h-3 rounded overflow-hidden">
                <div className="bg-red-500 h-3" style={{width: '1%'}}></div>
              </div>
              <p className="text-slate-500 text-xs mt-1">Euler alone wrote 800+ Latin works</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4">The Sobering Math</h2>

          <p className="text-slate-300 mb-4">
            The Brepols <em>Library of Latin Texts</em> contains 167 million words across
            12,149 works by 1,950 authors. That&apos;s the largest digitized corpus of Latin
            literature.
          </p>

          <p className="text-slate-300 mb-4">
            My estimate of translated words: <strong className="text-white">5-10 million</strong>.
            That means only <strong className="text-red-400">3-6% of Latin literature</strong> has
            ever been translated into English.
          </p>

          <p className="text-slate-300 mb-4">
            For the Renaissance period specifically, the picture is starker. USTC records over
            800,000 Latin editions. We have perhaps 15,000-20,000 translations. That&apos;s
            <strong className="text-red-400"> less than 2%</strong>.
          </p>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold mb-4">The Scale at a Glance</h3>
            <pre className="text-sm text-slate-300 font-mono overflow-x-auto">
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
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4">What&apos;s Still Missing</h2>

          <p className="text-slate-300 mb-4">
            The biggest gaps aren&apos;t in the areas you might expect:
          </p>

          <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden my-8">
            <table className="w-full text-sm">
              <thead className="bg-slate-800">
                <tr>
                  <th className="text-left p-3">Gap Area</th>
                  <th className="text-right p-3">Estimated Untranslated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr><td className="p-3">Neo-Latin Poetry (1450-1700)</td><td className="text-right p-3 font-mono text-red-400">~100,000+ works</td></tr>
                <tr><td className="p-3">Humanist Correspondence</td><td className="text-right p-3 font-mono text-red-400">500,000+ letters</td></tr>
                <tr><td className="p-3">Scientific Latin (1500-1800)</td><td className="text-right p-3 font-mono text-red-400">Euler: 800+; countless others</td></tr>
                <tr><td className="p-3">University Dissertations</td><td className="text-right p-3 font-mono text-red-400">Hundreds of thousands</td></tr>
                <tr><td className="p-3">Legal Commentaries</td><td className="text-right p-3 font-mono text-red-400">Foundational texts untranslated</td></tr>
                <tr><td className="p-3">Religious Controversy</td><td className="text-right p-3 font-mono text-red-400">Massive corpus, selections only</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4">What This Means</h2>

          <p className="text-slate-300 mb-4">
            We&apos;re in a strange situation. On one hand, there&apos;s more accessible Latin
            translation than most people realize&mdash;thousands of volumes in open access,
            free to read online. On the other hand, 94-97% of the Latin corpus remains
            locked away from anyone who can&apos;t read the original.
          </p>

          <p className="text-slate-300 mb-4">
            Traditional scholarly translation adds maybe 50-100 new translations per year.
            At that rate, we&apos;d need 10,000 years to translate the remaining Renaissance
            Latin alone.
          </p>

          <p className="text-slate-300 mb-4">
            This is where AI translation becomes interesting. Not as a replacement for
            scholarly translation, but as a way to provide &ldquo;good enough&rdquo; access to the
            vast majority of texts that will <em>never</em> receive professional attention.
            The perfect shouldn&apos;t be the enemy of the possible.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">Next Steps</h2>

          <p className="text-slate-300 mb-4">
            I&apos;ve uploaded the full research data to our repository:
          </p>

          <ul className="text-slate-300 space-y-2 mb-6">
            <li><code className="text-cyan-400">latin_translations_comprehensive.json</code> &mdash; 45+ sources catalogued</li>
            <li><code className="text-cyan-400">philological_museum_texts.json</code> &mdash; 89 texts extracted from the Philological Museum</li>
            <li><code className="text-cyan-400">translation_search_strategy.md</code> &mdash; methodology for finding more translations</li>
            <li><code className="text-cyan-400">LATIN_TRANSLATIONS_REPORT.md</code> &mdash; full statistical analysis</li>
          </ul>

          <p className="text-slate-300 mb-4">
            The database isn&apos;t complete&mdash;translations are scattered across thousands of
            academic journals and dissertations that no one has systematically catalogued.
            But it&apos;s a start.
          </p>

          <p className="text-slate-300 mb-4">
            The 3,232 volumes we&apos;ve identified represent centuries of scholarly work.
            They&apos;re the foundation we can build on. The question now is: how do we
            responsibly use AI to extend that foundation to the other 97%?
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between">
          <Link
            href="/blog/esoteric-timeline"
            className="text-violet-400 hover:underline"
          >
            ← Esoteric Timeline
          </Link>
          <Link
            href="/blog"
            className="text-violet-400 hover:underline"
          >
            All Posts →
          </Link>
        </div>
      </article>

      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>
          <a href="https://github.com/JDerekLomas/latinclaude" className="text-violet-400 hover:underline">
            View project on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
