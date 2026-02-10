import BlogLayout from "../BlogLayout";
import { generateBlogMetadata, generateArticleJsonLd } from "@/lib/blogMetadata";

const postMeta = {
  title: "Why Latin Matters: 500,000 Unread Books",
  description: "The Renaissance produced half a million Latin works. 97% have never been translated into English. This isn't a footnote in history—it's a catastrophic loss of human knowledge.",
  slug: "why-latin-matters",
  date: "2025-12-01",
};

export const metadata = generateBlogMetadata(postMeta);
const jsonLd = generateArticleJsonLd(postMeta);

export default function WhyLatinMatters() {
  return (
    <BlogLayout
      title="Why Latin Matters: 500,000 Unread Books"
      tag="Mission"
      slug="why-latin-matters"
      nextPost={{ href: "/blog/forgotten-authors", title: "The Forgotten Giants" }}
      jsonLd={jsonLd}
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '22px',
        lineHeight: 1.6,
        color: '#444',
        marginBottom: '32px',
      }}>
        The Renaissance produced half a million Latin works. 97% have never been translated
        into English. This isn&apos;t a footnote in history—it&apos;s a catastrophic loss of
        human knowledge.
      </p>

      <h2>The Scale of What We&apos;re Missing</h2>

      <p>
        Between 1450 and 1700, European printers produced approximately 1.6 million distinct
        editions. Of these, <strong>533,000 were in Latin</strong>—the
        international language of scholarship, science, law, medicine, and theology.
      </p>

      <p>
        These weren&apos;t obscure pamphlets. They were the operating system of European
        civilization: medical textbooks that trained generations of doctors, legal commentaries
        that shaped modern law, theological treatises that defined religious thought,
        scientific works that laid the groundwork for the Enlightenment.
      </p>

      <p>
        Today, approximately <strong style={{ color: '#9e4a3a' }}>3% of these works have English
        translations</strong>. The rest—nearly half a million books—are effectively invisible
        to modern scholarship and entirely inaccessible to the general public.
      </p>

      <h2>The Accessibility Crisis</h2>

      <p>
        The problem isn&apos;t just translation. It&apos;s a cascading series of barriers:
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
            <span style={{ color: '#666' }}>Total Latin works (1450-1700)</span>
            <span style={{ fontWeight: 600, color: '#1a1612' }}>521,206</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
            <span style={{ color: '#666' }}>Digitized (scan exists)</span>
            <span style={{ fontWeight: 600, color: '#546b8a' }}>~94,000 (18%)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
            <span style={{ color: '#666' }}>Searchable text (OCR/transcribed)</span>
            <span style={{ fontWeight: 600, color: '#c9a86c' }}>~42,000 (8%)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
            <span style={{ color: '#666' }}>Translated to English</span>
            <span style={{ fontWeight: 600, color: '#9e4a3a' }}>~16,000 (3%)</span>
          </div>
        </div>
      </figure>

      <p>
        Even when a scan exists, it&apos;s often a low-quality image of 16th-century typography
        that no OCR software can read. Even when the text is transcribed, it&apos;s in a form
        of Latin that requires specialized training to understand. And even scholars who read
        Latin can only work through a tiny fraction of what exists.
      </p>

      <h2>What Kind of Knowledge?</h2>

      <p>
        This isn&apos;t just &ldquo;old books.&rdquo; The USTC data reveals what subjects dominated
        Latin publishing:
      </p>

      <ul>
        <li><strong>Religious texts</strong> — 185,000 works. The theological
        debates that shaped Protestantism, Catholicism, and Western ethics.</li>
        <li><strong>University publications</strong> — 150,000 works. Dissertations,
        disputations, and lectures that defined academic disciplines.</li>
        <li><strong>Legal texts</strong> — 73,000 works. Commentaries on Roman law
        that still influence legal systems today.</li>
        <li><strong>Medical texts</strong> — 29,000 works. The state of medical
        knowledge for 250 years.</li>
        <li><strong>Philosophy</strong> — 29,000 works. Including most of the
        primary sources on scholasticism, humanism, and early modern thought.</li>
      </ul>

      <p>
        We have fragments. We have the &ldquo;greatest hits&rdquo; of a few famous names—Erasmus,
        More, Bacon. But the vast conversation of which they were part remains inaudible.
      </p>

      <h2>Why This Project Exists</h2>

      <p>
        This project has three goals:
      </p>

      <ol>
        <li>
          <strong>Quantify the gap.</strong> Using data from the Universal
          Short Title Catalogue (USTC), we&apos;re building the first comprehensive picture of
          what exists, what&apos;s digitized, and what&apos;s translated.
        </li>
        <li>
          <strong>Identify priorities.</strong> Not all 500,000 works are
          equally important. By analyzing edition counts, citation patterns, and subject matter,
          we can identify the most valuable untranslated texts.
        </li>
        <li>
          <strong>Enable access.</strong> Modern AI can translate Latin at
          scale. The question is: can we use it responsibly to open up this heritage? That
          requires knowing what exists and what matters.
        </li>
      </ol>

      <h2>The Decline of Latin</h2>

      <p>
        One striking pattern in the data: Latin&apos;s share of publishing collapsed over 250 years.
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#666' }}>1470s:</span>
            <span><span style={{ color: '#9e4a3a', fontWeight: 600 }}>80% Latin</span> / 20% vernacular</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#666' }}>1520s:</span>
            <span><span style={{ color: '#9e4a3a', fontWeight: 600 }}>45% Latin</span> / 55% vernacular</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#666' }}>1600s:</span>
            <span><span style={{ color: '#9e4a3a', fontWeight: 600 }}>47% Latin</span> / 53% vernacular</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#666' }}>1690s:</span>
            <span><span style={{ color: '#9e4a3a', fontWeight: 600 }}>20% Latin</span> / 80% vernacular</span>
          </div>
        </div>
      </figure>

      <p>
        By the time Latin faded from common use, it had accumulated five centuries of
        scholarship. When it stopped being widely read, that scholarship
        didn&apos;t disappear—it became frozen in time, waiting for readers who would never come.
      </p>

      <h2>What You Can Do</h2>

      <p>
        This project is open source. The data is freely available. If you&apos;re a:
      </p>

      <ul>
        <li><strong>Scholar</strong> — Help us identify which untranslated
        works matter most in your field.</li>
        <li><strong>Developer</strong> — Help us build tools to make Latin
        texts more accessible.</li>
        <li><strong>Latinist</strong> — Help us validate AI translations
        and identify errors.</li>
        <li><strong>Curious person</strong> — Spread the word. Most people
        have no idea this heritage exists.</li>
      </ul>

      <p>
        Five hundred thousand books are waiting. Let&apos;s start reading them.
      </p>
    </BlogLayout>
  );
}
