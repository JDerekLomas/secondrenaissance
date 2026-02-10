import BlogLayout from "../BlogLayout";
import { generateBlogMetadata, generateArticleJsonLd } from "@/lib/blogMetadata";

const postMeta = {
  title: "SourceLibrary: A Vision for AI-Assisted Translation",
  description: "Half a million Renaissance Latin texts await translation. We're building tools to make that possible—empowering scholars with AI-assisted workflows.",
  slug: "sourcelibrary-vision",
  date: "2025-12-12",
};

export const metadata = generateBlogMetadata(postMeta);
const jsonLd = generateArticleJsonLd(postMeta);

export default function SourceLibraryVision() {
  return (
    <BlogLayout
      title="SourceLibrary: A Vision for AI-Assisted Translation"
      tag="Vision"
      slug="sourcelibrary-vision"
      prevPost={{ href: "/blog/why-latin-matters", title: "Why Latin Matters" }}
      jsonLd={jsonLd}
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '22px',
        lineHeight: 1.6,
        color: '#444',
        marginBottom: '32px',
      }}>
        Half a million Renaissance Latin texts await translation. We&apos;re building
        the tools to make that possible—not by replacing scholars, but by empowering them.
      </p>

      <h2>The Problem We&apos;re Solving</h2>

      <p>
        The Universal Short Title Catalogue records 533,000 Latin works printed between
        1450 and 1700. Only about 3% have English translations. At the current rate of
        academic translation—perhaps a few dozen significant works per year—it would take
        millennia to translate even a fraction of what exists.
      </p>

      <p>
        But translation isn&apos;t the only barrier. Most of these texts aren&apos;t even
        <em>readable</em> in any practical sense:
      </p>

      <ul>
        <li>~18% have been digitized (scans exist)</li>
        <li>~8% have searchable text (OCR or transcription)</li>
        <li>~3% have any English translation at all</li>
      </ul>

      <p>
        Even scholars who read Latin can only access a tiny slice of this heritage.
        The rest is locked away in rare book rooms, or buried in unreadable image scans.
      </p>

      <h2>Our Approach: Expert-Driven, AI-Assisted</h2>

      <p>
        We&apos;re not building a &ldquo;push button, get translation&rdquo; system. That would
        produce garbage at scale. Instead, we&apos;re building tools that put
        <strong> subject matter experts in control</strong> while handling the mechanical
        work that currently makes translation so slow.
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <figcaption style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          color: '#666',
          marginBottom: '16px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          The Expert-Driven Workflow
        </figcaption>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{
              background: '#9e4a3a',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: '12px',
            }}>1</span>
            <div>
              <strong>Preview</strong> — Generate a 15-page sample with default prompts
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{
              background: '#9e4a3a',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: '12px',
            }}>2</span>
            <div>
              <strong>Review</strong> — Expert evaluates OCR accuracy and translation quality
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{
              background: '#9e4a3a',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: '12px',
            }}>3</span>
            <div>
              <strong>Refine</strong> — Adjust prompts for this specific text: terminology, audience, tone
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{
              background: '#9e4a3a',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: '12px',
            }}>4</span>
            <div>
              <strong>Produce</strong> — Process the full book with expert-refined prompts
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{
              background: '#9e4a3a',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: '12px',
            }}>5</span>
            <div>
              <strong>Compile</strong> — Generate glossary, indices, and summaries
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{
              background: '#9e4a3a',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: '12px',
            }}>6</span>
            <div>
              <strong>Publish</strong> — Export for distribution, with proper scholarly apparatus
            </div>
          </div>
        </div>
      </figure>

      <p>
        The key insight: <strong>prompt refinement is where expertise lives</strong>.
        A scholar who understands Ficino&apos;s Neoplatonism can tune the translation prompts
        to use the correct philosophical terminology, to explain obscure references,
        to maintain consistency across 300 pages.
      </p>

      <h2>The Three-Stage Pipeline</h2>

      <p>
        Each page passes through three stages, each with customizable prompts:
      </p>

      <h3>Stage 1: OCR</h3>

      <p>
        Renaissance typography is challenging. Ligatures, abbreviations, the long &lsquo;s&rsquo;,
        mixed Latin and Greek—traditional OCR fails on most of it. Vision-language models
        (GPT-4o, Claude) can read these texts, but they need guidance.
      </p>

      <p>
        Our OCR prompts tell the model:
      </p>

      <ul>
        <li>What typeface to expect (Roman, Gothic, mixed)</li>
        <li>How to handle abbreviations (expand? mark uncertain?)</li>
        <li>What to do with marginalia and annotations</li>
        <li>How to preserve structure (tables, headings, verse)</li>
      </ul>

      <h3>Stage 2: Translation</h3>

      <p>
        Translation is where domain expertise matters most. The default prompts produce
        readable English, but &ldquo;readable&rdquo; isn&apos;t &ldquo;accurate.&rdquo; An expert
        refines the prompts to specify:
      </p>

      <ul>
        <li><strong>Terminology</strong> — <em>anima mundi</em> should be &ldquo;world soul,&rdquo;
        not &ldquo;soul of the world&rdquo;</li>
        <li><strong>Audience</strong> — Graduate students? General readers? Specialists?</li>
        <li><strong>Tone</strong> — Preserve archaic flavor, or modernize freely?</li>
        <li><strong>Context</strong> — What references need explanation?</li>
      </ul>

      <h3>Stage 3: Extraction</h3>

      <p>
        Every page generates structured metadata: key terms (Latin→English), people mentioned,
        concepts introduced, connections to previous pages. This enables:
      </p>

      <ul>
        <li>Automatic glossary generation</li>
        <li>Indices of persons and concepts</li>
        <li>Section-by-section summaries</li>
        <li>Cross-references between pages</li>
      </ul>

      <h2>Context Continuity</h2>

      <p>
        Books aren&apos;t isolated pages. Arguments span chapters, terminology must remain
        consistent, sentences break across pages. Our system maintains context:
      </p>

      <ul>
        <li>Each page receives the previous page&apos;s OCR and translation</li>
        <li>A running glossary tracks every translated term</li>
        <li>Continuations are flagged: &ldquo;[[continues from previous page]]&rdquo;</li>
        <li>Book-level metadata informs every page</li>
      </ul>

      <p>
        This means page 300 knows what happened on page 1. The translation of <em>spiritus</em>
        stays consistent throughout. A sentence that starts on page 45 and ends on page 46
        gets translated correctly.
      </p>

      <h2>Why This Matters</h2>

      <p>
        Consider what becomes possible:
      </p>

      <figure style={{
        background: '#f5f0e8',
        border: '1px solid #e0d8c8',
        borderRadius: '8px',
        padding: '24px',
        margin: '32px 0',
      }}>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <div>
            <strong style={{ color: '#9e4a3a' }}>A scholar of Renaissance medicine</strong> could
            translate 50 medical treatises in a year—with careful review—instead of spending
            a career on one.
          </div>
          <div>
            <strong style={{ color: '#9e4a3a' }}>A graduate student</strong> could access
            primary sources that were previously impossible to read, even with Latin training.
          </div>
          <div>
            <strong style={{ color: '#9e4a3a' }}>The general public</strong> could finally
            explore the intellectual heritage of the Renaissance, not just the famous names.
          </div>
          <div>
            <strong style={{ color: '#9e4a3a' }}>The Internet Archive&apos;s 200,000+ Latin scans</strong> could
            become searchable, readable, accessible.
          </div>
        </div>
      </figure>

      <h2>What We&apos;ve Built</h2>

      <p>
        The system currently includes:
      </p>

      <ul>
        <li><strong>Web interface</strong> — Browse the Internet Archive&apos;s Latin collection,
        upload PDFs, manage translation projects</li>
        <li><strong>Claude Code commands</strong> — CLI tools for power users:
        <code>/latin-book-preview</code>, <code>/latin-book-run</code>, <code>/latin-book-compile</code></li>
        <li><strong>Customizable prompts</strong> — Templates for OCR, translation, and extraction,
        with guidance on refinement</li>
        <li><strong>Structured output</strong> — Markdown for readability, JSON for processing,
        export to PDF/EPUB</li>
      </ul>

      <h2>What&apos;s Next</h2>

      <p>
        We&apos;re actively developing:
      </p>

      <ul>
        <li><strong>Background processing</strong> — Queue large jobs that run while you sleep</li>
        <li><strong>Collaborative review</strong> — Multiple experts contributing to a single project</li>
        <li><strong>Quality metrics</strong> — Automated confidence scoring and human validation</li>
        <li><strong>Scholarly apparatus</strong> — Footnotes, critical apparatus, variant readings</li>
      </ul>

      <h2>Get Involved</h2>

      <p>
        This is an open project. The code is on GitHub. The data is freely available.
        We need:
      </p>

      <ul>
        <li><strong>Domain experts</strong> — Scholars who can test and refine prompts for their fields</li>
        <li><strong>Latinists</strong> — To validate translations and catch errors</li>
        <li><strong>Developers</strong> — To improve the pipeline and interface</li>
        <li><strong>Early users</strong> — To try translating texts and report what works</li>
      </ul>

      <p>
        Half a million books are waiting. The technology exists. The question is whether
        we can organize the expertise to use it responsibly.
      </p>

      <p>
        <a href="/translate" style={{ color: '#9e4a3a' }}>Try the translation dashboard →</a>
      </p>

      <p>
        <a href="https://github.com/JDerekLomas/secondrenaissance" style={{ color: '#9e4a3a' }}>
          View the source on GitHub →
        </a>
      </p>
    </BlogLayout>
  );
}
