import Link from "next/link";

export default function Home() {
  // Language data for the mini chart
  const languages = [
    { name: "Latin", count: 503486, color: "#7c3a2e" },
    { name: "German", count: 340480, color: "#9a7b4f" },
    { name: "French", count: 241569, color: "#6b5f52" },
    { name: "English", count: 164363, color: "#a65846" },
    { name: "Other", count: 378680, color: "#c9bfb0" },
  ];
  const totalEditions = 1628578;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[#e0d8cc]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-[#1a1612]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Ancient Wisdom Research
          </Link>
          <nav className="flex gap-8 text-sm">
            <Link href="/explore" className="text-[#6b5f52] hover:text-[#1a1612] transition-colors">
              Data
            </Link>
            <Link href="/blog" className="text-[#6b5f52] hover:text-[#1a1612] transition-colors">
              Blog
            </Link>
            <Link href="/roadmap" className="text-[#6b5f52] hover:text-[#1a1612] transition-colors">
              Roadmap
            </Link>
            <Link href="/blog/methodology" className="text-[#6b5f52] hover:text-[#1a1612] transition-colors">
              Methods
            </Link>
            <a href="https://github.com/JDerekLomas/ancient-wisdom-research-labs" className="text-[#6b5f52] hover:text-[#1a1612] transition-colors">
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-[#9a7b4f] text-sm uppercase tracking-[0.2em] mb-6">
          Mapping Hidden Libraries
        </p>
        <h1 className="text-5xl md:text-6xl mb-6 leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}>
          500,000 Latin Works<br />
          <span className="text-[#6b5f52]">Remain Untranslated</span>
        </h1>
        <p className="text-xl text-[#3d352d] max-w-2xl mx-auto mb-10 leading-relaxed">
          The Universal Short Title Catalogue documents 1.6 million books printed between 1450 and 1700.
          Nearly a third are in Latin. Less than 2% have English translations.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/explore"
            className="px-6 py-3 bg-[#7c3a2e] text-[#faf7f2] rounded-lg hover:bg-[#a65846] transition-colors text-sm font-medium"
          >
            Explore the Data
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 border border-[#c9bfb0] text-[#3d352d] rounded-lg hover:border-[#7c3a2e] hover:text-[#7c3a2e] transition-colors text-sm font-medium"
          >
            Read Research
          </Link>
        </div>
      </section>

      {/* Data Visualization Section */}
      <section className="bg-[#f0ebe3] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Chart */}
            <div className="bg-[#fffdf9] rounded-xl p-8 border border-[#e0d8cc]">
              <h3 className="text-lg mb-6 text-[#1a1612]" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}>
                Language Distribution, 1450–1700
              </h3>
              <div className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#3d352d]">{lang.name}</span>
                      <span className="text-[#6b5f52] font-mono text-xs">
                        {((lang.count / totalEditions) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-3 bg-[#f0ebe3] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(lang.count / totalEditions) * 100}%`,
                          backgroundColor: lang.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#6b5f52] mt-6 pt-4 border-t border-[#e0d8cc]">
                Source: USTC Database, 1,628,578 editions
              </p>
            </div>

            {/* Stats */}
            <div className="space-y-8">
              <div>
                <div className="text-5xl text-[#7c3a2e] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700 }}>
                  503,486
                </div>
                <div className="text-[#3d352d]">Latin editions in the USTC</div>
                <p className="text-sm text-[#6b5f52] mt-2">
                  Theology, philosophy, law, medicine, poetry—the intellectual foundation of the modern world.
                </p>
              </div>
              <div>
                <div className="text-5xl text-[#9a7b4f] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700 }}>
                  ~2%
                </div>
                <div className="text-[#3d352d]">Have English translations</div>
                <p className="text-sm text-[#6b5f52] mt-2">
                  Most translations cover classical authors. Renaissance and early modern Latin remains inaccessible.
                </p>
              </div>
              <div>
                <div className="text-5xl text-[#6b5f52] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700 }}>
                  1670s
                </div>
                <div className="text-[#3d352d]">When German overtook Latin</div>
                <p className="text-sm text-[#6b5f52] mt-2">
                  Latin dominated European publishing for two centuries before vernaculars took over.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Tracks */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl text-center mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}>
          Current Research
        </h2>
        <p className="text-center text-[#6b5f52] mb-12 max-w-xl mx-auto">
          Investigating the hidden libraries of the Renaissance through data analysis and AI translation
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/blog/death-of-latin" className="group">
            <article className="h-full p-6 bg-[#fffdf9] border border-[#e0d8cc] rounded-xl hover:border-[#7c3a2e] transition-colors">
              <div className="text-xs text-[#9a7b4f] uppercase tracking-wider mb-3">Data Analysis</div>
              <h3 className="text-xl mb-3 group-hover:text-[#7c3a2e] transition-colors" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}>
                The Death of Latin
              </h3>
              <p className="text-[#6b5f52] text-sm leading-relaxed">
                What 1.6 million books tell us about when Latin lost its dominance as Europe&apos;s lingua franca.
              </p>
            </article>
          </Link>

          <Link href="/blog/hunting-for-translations" className="group">
            <article className="h-full p-6 bg-[#fffdf9] border border-[#e0d8cc] rounded-xl hover:border-[#7c3a2e] transition-colors">
              <div className="text-xs text-[#9a7b4f] uppercase tracking-wider mb-3">Research</div>
              <h3 className="text-xl mb-3 group-hover:text-[#7c3a2e] transition-colors" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}>
                Mapping Translations
              </h3>
              <p className="text-[#6b5f52] text-sm leading-relaxed">
                3,232 translation volumes catalogued across 45+ sources. What&apos;s been translated and what hasn&apos;t.
              </p>
            </article>
          </Link>

          <Link href="/blog/esoteric-timeline" className="group">
            <article className="h-full p-6 bg-[#fffdf9] border border-[#e0d8cc] rounded-xl hover:border-[#7c3a2e] transition-colors">
              <div className="text-xs text-[#9a7b4f] uppercase tracking-wider mb-3">Visualization</div>
              <h3 className="text-xl mb-3 group-hover:text-[#7c3a2e] transition-colors" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}>
                Esoteric Timeline
              </h3>
              <p className="text-[#6b5f52] text-sm leading-relaxed">
                280 years of hermetic, alchemical, and occult publishing from Ficino to the Rosicrucians.
              </p>
            </article>
          </Link>
        </div>

        <div className="text-center mt-10">
          <Link href="/blog" className="text-[#7c3a2e] hover:underline text-sm">
            View all research →
          </Link>
        </div>
      </section>

      {/* Translation Gap Visualization */}
      <section className="bg-[#f0ebe3] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl text-center mb-12" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}>
            The Translation Gap by Period
          </h2>

          <div className="space-y-6">
            {[
              { period: "Classical (240 BCE – 600 CE)", translated: 75, label: "~75% translated" },
              { period: "Patristic (100 – 800 CE)", translated: 65, label: "~65% translated" },
              { period: "Medieval (600 – 1450)", translated: 25, label: "~25% translated" },
              { period: "Renaissance (1450 – 1700)", translated: 2, label: "<2% translated" },
              { period: "Scientific (1600 – 1900)", translated: 1, label: "<1% translated" },
            ].map((item) => (
              <div key={item.period} className="bg-[#fffdf9] rounded-lg p-5 border border-[#e0d8cc]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#1a1612] font-medium">{item.period}</span>
                  <span className="text-sm text-[#6b5f52]">{item.label}</span>
                </div>
                <div className="h-4 bg-[#f0ebe3] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.translated}%`,
                      backgroundColor: item.translated > 50 ? '#7c3a2e' : item.translated > 10 ? '#9a7b4f' : '#c9bfb0',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[#6b5f52] text-sm mt-8">
            The vast majority of Latin literature is early modern—and largely untranslated.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}>
          Help Map the Hidden Libraries
        </h2>
        <p className="text-[#6b5f52] mb-8 max-w-xl mx-auto">
          We&apos;re building tools to identify untranslated works and prioritize them for AI-assisted translation.
          The data and code are open source.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/roadmap"
            className="px-6 py-3 bg-[#7c3a2e] text-[#faf7f2] rounded-lg hover:bg-[#a65846] transition-colors text-sm font-medium"
          >
            View Translation Roadmap
          </Link>
          <a
            href="https://github.com/JDerekLomas/ancient-wisdom-research-labs"
            className="px-6 py-3 border border-[#c9bfb0] text-[#3d352d] rounded-lg hover:border-[#7c3a2e] hover:text-[#7c3a2e] transition-colors text-sm font-medium"
          >
            GitHub Repository
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e0d8cc] py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="text-[#1a1612] font-medium" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Ancient Wisdom Research Labs
              </div>
              <div className="text-[#6b5f52] text-sm">
                Data from Universal Short Title Catalogue, University of St Andrews
              </div>
            </div>
            <div className="flex gap-6 text-sm text-[#6b5f52]">
              <Link href="/explore" className="hover:text-[#1a1612] transition-colors">Data</Link>
              <Link href="/blog" className="hover:text-[#1a1612] transition-colors">Research</Link>
              <Link href="/roadmap" className="hover:text-[#1a1612] transition-colors">Roadmap</Link>
              <Link href="/blog/methodology" className="hover:text-[#1a1612] transition-colors">Methods</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
