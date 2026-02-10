import BlogLayout from "../BlogLayout";
import { generateBlogMetadata, generateArticleJsonLd } from "@/lib/blogMetadata";

const postMeta = {
  title: "The Forgotten Seicento: Thinkers of the 1600s You Can't Read",
  description: "Kircher, Sennert, Weyer, Liceti. 324,690 Latin works from the Scientific Revolution—and the scholars behind them who remain untranslated.",
  slug: "forgotten-1600s",
  date: "2025-12-03",
};

export const metadata = generateBlogMetadata(postMeta);
const jsonLd = generateArticleJsonLd(postMeta);

export default function Forgotten1600s() {
  return (
    <BlogLayout
      title="The Forgotten Seicento: Thinkers of the 1600s You Can't Read"
      tag="Research"
      slug="forgotten-1600s"
      prevPost={{ href: "/blog/forgotten-1500s", title: "Forgotten Authors of the 1500s" }}
      nextPost={{ href: "/blog/renaissance-bestsellers", title: "Renaissance Bestsellers" }}
      jsonLd={jsonLd}
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '22px',
        lineHeight: 1.6,
        color: '#444',
        marginBottom: '32px',
      }}>
        The seventeenth century was the age of the Scientific Revolution. Descartes, Kepler,
        Harvey, Boyle—names we know. But behind them stood hundreds of Latin scholars whose
        works shaped the new science—and remain untranslated.
      </p>

      <h2>The Century in Numbers</h2>

      <p>
        The USTC records <strong>1.18 million</strong> works printed in the 1600s. Of these,
        <strong>324,690</strong> were in Latin—still the language of science, medicine, and
        philosophy across Europe. Even as vernacular publishing grew, Latin remained the
        international medium for serious scholarly work.
      </p>

      <p>
        We analyzed 12,000+ Latin works in philosophy, science, mathematics, and medicine
        from this period. The results reveal a rich intellectual landscape largely invisible
        to modern readers.
      </p>

      <h2>The Untranslated Seicento</h2>

      <p>Here are 20 important 17th-century thinkers whose Latin work remains largely inaccessible:</p>

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
              <th style={{ textAlign: 'right', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Works</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#1a1612', fontWeight: 600 }}>Field</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Athanasius Kircher", "113", "Polymath: magnetism, Egyptology, music, geology"],
              ["Daniel Sennert", "101", "Medicine, atomism, chemistry"],
              ["Caspar Bartholin", "99", "Anatomy, ethics, meteorology"],
              ["Johann Weyer", "137", "Demonology, psychiatry, medicine"],
              ["Fortunio Liceti", "27", "Natural philosophy, embryology, phosphorescence"],
              ["Kaspar Schott", "32", "Mathematics, natural magic, mechanics"],
              ["Johann Glauber", "51", "Chemistry, alchemy, pharmacology"],
              ["Franco Burgersdijk", "53", "Aristotelian philosophy, logic"],
              ["Rudolph Goclenius", "70", "Philosophy, coined 'psychology'"],
              ["Erhard Weigel", "28", "Mathematics, astronomy, philosophy"],
              ["Johann Clauberg", "31", "Cartesian philosophy, ontology"],
              ["Antonius Deusingius", "39", "Natural philosophy, cosmology"],
              ["Johann Sperling", "34", "Physics, astrology, medicine"],
              ["Georg Wolfgang Wedel", "35", "Medicine, chemistry, pharmacology"],
              ["Pierre Gassendi", "30", "Atomism, astronomy, philosophy"],
              ["Robert Fludd", "20", "Hermeticism, cosmology, medicine"],
              ["Johannes Hevelius", "32", "Astronomy, selenography"],
              ["Marcello Malpighi", "35", "Microscopy, anatomy, embryology"],
              ["Adrianus Heereboord", "25", "Cartesian philosophy, logic"],
              ["Jacob Thomasius", "25", "Philosophy, logic (Leibniz's teacher)"],
            ].map(([author, works, field], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e0d8c8' }}>
                <td style={{ padding: '12px 8px', color: '#1a1612' }}>{author}</td>
                <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'monospace', color: '#9e4a3a', fontWeight: 600 }}>{works}</td>
                <td style={{ padding: '12px 8px', color: '#666' }}>{field}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>

      <h2>Key Figures in Detail</h2>

      <h3 style={{ color: '#9e4a3a' }}>Athanasius Kircher (1602-1680)</h3>
      <p>
        The &ldquo;last man who knew everything.&rdquo; Kircher was a Jesuit polymath whose 40+ books
        covered magnetism, geology, Egyptology (he attempted to decipher hieroglyphics), music
        theory, optics, Chinese studies, and the underground world. His <em>Mundus Subterraneus</em>
        (1665) was a landmark in geology. His <em>Musurgia Universalis</em> (1650) theorized
        the physics of sound. His <em>Oedipus Aegyptiacus</em> (1652-54) was the first major
        European study of hieroglyphics (largely wrong, but foundational). 113 editions in the
        USTC; almost nothing translated into English.
      </p>

      <h3 style={{ color: '#9e4a3a' }}>Daniel Sennert (1572-1637)</h3>
      <p>
        Professor of medicine at Wittenberg who pioneered the atomic theory of matter in chemistry.
        His <em>De chymicorum cum Aristotelicis et Galenicis consensu ac dissensu</em> (1619)
        attempted to reconcile Paracelsian chemistry with Aristotelian natural philosophy.
        Robert Boyle read and cited him extensively. 101 Latin works on medicine, chemistry,
        and natural philosophy—fundamental to understanding the transition from alchemy to
        chemistry. No modern translations.
      </p>

      <h3 style={{ color: '#9e4a3a' }}>Johann Weyer (1515-1588)</h3>
      <p>
        Court physician who wrote the first major critique of the witch trials. His
        <em>De praestigiis daemonum</em> (1563) argued that accused witches were mentally ill,
        not possessed—an early work of psychiatric thinking. He catalogued demons not to
        encourage belief but to show the absurdity of demonological claims. 137 editions across
        Latin, German, and French. The Latin originals remain untranslated, though they&apos;re
        crucial for understanding early modern attitudes toward mental illness and witch persecution.
      </p>

      <h3 style={{ color: '#9e4a3a' }}>Fortunio Liceti (1577-1657)</h3>
      <p>
        Paduan philosopher who wrote on everything from the origin of the soul to phosphorescent
        stones. His <em>Litheosphorus</em> (1640) was the first scientific study of the
        Bologna Stone—a phosphorescent mineral that fascinated 17th-century natural philosophers.
        His <em>De monstris</em> (1616) was a foundational work in teratology (the study of
        abnormalities). A key figure in late Aristotelianism who engaged with Galileo. 27 Latin
        works in philosophy and science; almost entirely untranslated.
      </p>

      <h3 style={{ color: '#9e4a3a' }}>Kaspar Schott (1608-1666)</h3>
      <p>
        Kircher&apos;s student and intellectual heir, who systematized and extended his teacher&apos;s
        work. His <em>Magia Universalis Naturae et Artis</em> (1657-59) was an encyclopedia
        of natural wonders and mechanical devices. His <em>Mechanica Hydraulico-Pneumatica</em>
        (1657) documented Otto von Guericke&apos;s air pump experiments—crucial for the history
        of experimental physics. 32 works on mathematics, mechanics, and natural philosophy.
        Virtually nothing in English.
      </p>

      <h3 style={{ color: '#9e4a3a' }}>Rudolph Goclenius (1547-1628)</h3>
      <p>
        The man who coined the word &ldquo;psychology&rdquo; (<em>Psychologia</em>, 1590). Professor
        at Marburg who wrote on logic, medicine, ethics, and natural philosophy. His philosophical
        lexicons and textbooks were used across Protestant Germany. 70 Latin works spanning
        philosophy, medicine, and what we&apos;d now call psychology. The originator of a discipline&apos;s
        name—yet his works remain untranslated.
      </p>

      <h2>The Scientific Revolution&apos;s Latin Infrastructure</h2>

      <p>
        We know the Scientific Revolution through its translated heroes: Galileo, Descartes,
        Newton. But the revolution was conducted largely in Latin, through networks of
        correspondence and publication that we&apos;ve barely begun to explore:
      </p>

      <ul>
        <li><strong>University disputations</strong> — Thousands of Latin theses debating
        the new natural philosophy against Aristotelianism</li>
        <li><strong>Scientific correspondence</strong> — Scholars communicated in Latin
        across linguistic boundaries</li>
        <li><strong>Textbooks and compendia</strong> — Works like Burgersdijk&apos;s that taught
        the next generation</li>
        <li><strong>Medical literature</strong> — Case studies, anatomical observations,
        pharmaceutical recipes</li>
        <li><strong>Natural history</strong> — Descriptions of specimens, travel accounts,
        botanical observations</li>
      </ul>

      <p>
        Even famous figures have large untranslated corpora. Descartes wrote 107 Latin works
        (many are translations of French originals, but many aren&apos;t). Kepler wrote 55.
        Robert Boyle wrote 96 Latin works—many distinct from his English publications.
      </p>

      <h2>The Problem of &ldquo;Secondary&rdquo; Figures</h2>

      <p>
        The history of science often focuses on revolutionary moments—Copernicus, Galileo,
        Newton. But science is also made by normal science: the textbooks that train students,
        the compendia that organize knowledge, the disputations that test ideas.
      </p>

      <p>
        Figures like Franco Burgersdijk (53 works) wrote the logic textbooks used across
        Protestant Europe. Johann Magirus (30 works) wrote the physics textbooks. Christoph
        Scheibler (29 works) wrote the metaphysics. These weren&apos;t original geniuses—they
        were systematizers and educators. But they shaped how an entire generation understood
        natural philosophy.
      </p>

      <p>
        Without their works, we see the Scientific Revolution as a series of isolated
        breakthroughs rather than what it was: a gradual transformation of how Europeans
        thought about nature, conducted through Latin texts we&apos;ve never read.
      </p>

      <h2>Medicine in Latin</h2>

      <p>
        Medical literature was overwhelmingly Latin in the 1600s. The USTC records thousands
        of Latin medical texts from this period:
      </p>

      <ul>
        <li><strong>Thomas Willis</strong> (82 works) — Foundational neuroanatomy, coined
        &ldquo;neurology&rdquo;</li>
        <li><strong>Lazare Rivière</strong> (48 works) — Clinical observations and treatments</li>
        <li><strong>Jean Fernel</strong> (48 works) — &ldquo;Father of physiology,&rdquo; continued
        influence</li>
        <li><strong>Girolamo Mercuriale</strong> (37 works) — Sports medicine, dermatology</li>
        <li><strong>Pieter van Foreest</strong> (50 works) — &ldquo;Dutch Hippocrates,&rdquo; case studies</li>
      </ul>

      <p>
        William Harvey&apos;s <em>De motu cordis</em> (1628) is famous and translated. But
        Harvey wrote 24 Latin works. The medical context in which he worked—the texts he
        cited, the authorities he challenged, the responses he provoked—remains largely
        inaccessible.
      </p>

      <h2>The Esoteric Tradition</h2>

      <p>
        The 17th century saw a flourishing of Hermetic, alchemical, and Rosicrucian literature
        in Latin:
      </p>

      <ul>
        <li><strong>Robert Fludd</strong> (20 works) — Rosicrucian cosmology, music of the spheres</li>
        <li><strong>Johann Glauber</strong> (51 works) — Practical alchemy, pharmaceutical chemistry</li>
        <li><strong>Oswald Croll</strong> (18 works) — Paracelsian medicine and alchemy</li>
        <li><strong>Michael Maier</strong> — Alchemical emblems and philosophy</li>
      </ul>

      <p>
        This literature wasn&apos;t &ldquo;pseudoscience&rdquo; separate from real science—it was part of
        the same conversation. Newton read alchemical texts. Boyle practiced alchemy. The
        boundary between chemistry and alchemy, between natural philosophy and natural magic,
        was not yet drawn. Understanding the Scientific Revolution requires reading texts
        we&apos;ve dismissed as merely esoteric.
      </p>

      <h2>What&apos;s at Stake</h2>

      <p>
        The 17th century created modern science. But we&apos;ve read only fragments of its
        literature—the famous names, the revolutionary texts, the works that happened to
        be translated.
      </p>

      <p>
        The Latin infrastructure of the Scientific Revolution—the textbooks, disputations,
        encyclopedias, medical observations, and philosophical debates—remains locked away.
        324,690 Latin works from this century alone. How many have been translated? A tiny
        fraction.
      </p>

      <p>
        The 1600s are not ancient history. They&apos;re the foundation of our world. And that
        foundation is written in a language most can no longer read.
      </p>
    </BlogLayout>
  );
}
