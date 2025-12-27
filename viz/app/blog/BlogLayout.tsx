import Link from "next/link";
import Comments from "@/components/Comments";

interface BlogLayoutProps {
  children: React.ReactNode;
  title: string;
  tag: string;
  slug: string;
  date?: string;
  nextPost?: { href: string; title: string };
  prevPost?: { href: string; title: string };
  jsonLd?: string;
}

const tagColors: Record<string, { bg: string; text: string }> = {
  Research: { bg: '#f5f0e8', text: '#9e4a3a' },
  "Research Report": { bg: '#f5f0e8', text: '#9e4a3a' },
  Data: { bg: '#e8f0f5', text: '#546b8a' },
  "Data Visualization": { bg: '#e8f0f5', text: '#546b8a' },
  Methods: { bg: '#f0f5e8', text: '#6b7c5a' },
  Visualization: { bg: '#f5e8f0', text: '#8a5475' },
  Mission: { bg: '#f5f0e8', text: '#9e4a3a' },
  Draft: { bg: '#f5f5f5', text: '#888' },
};

export default function BlogLayout({ children, title, tag, slug, date = "December 2025", nextPost, prevPost, jsonLd }: BlogLayoutProps) {
  const colors = tagColors[tag] || tagColors.Research;

  return (
    <main style={{ background: '#fdfcf9', minHeight: '100vh' }}>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      {/* Navigation */}
      <nav style={{
        borderBottom: '1px solid #e8e4dc',
        padding: '16px 24px',
      }}>
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link href="/blog" style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            color: '#666',
            textDecoration: 'none',
          }}>
            ← RESEARCH ESSAYS
          </Link>
          <a
            href="https://www.ancientwisdomtrust.org/become-a-patron"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              color: '#fff',
              background: '#9e4a3a',
              padding: '8px 16px',
              borderRadius: '4px',
              textDecoration: 'none',
            }}
          >
            Support This Work
          </a>
        </div>
      </nav>

      {/* Article */}
      <article style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: '60px 24px 80px',
      }}>
        {/* Meta */}
        <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            padding: '4px 10px',
            borderRadius: '4px',
            background: colors.bg,
            color: colors.text,
          }}>
            {tag.toUpperCase()}
          </span>
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            color: '#999',
          }}>{date}</span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: '42px',
          fontWeight: 400,
          color: '#1a1612',
          lineHeight: 1.2,
          marginBottom: '48px',
        }}>
          {title}
        </h1>

        {/* Content */}
        <div className="prose">
          {children}
        </div>

        {/* Social Sharing */}
        <div style={{
          marginTop: '48px',
          paddingTop: '32px',
          borderTop: '1px solid #e8e4dc',
        }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            color: '#888',
            marginBottom: '16px',
          }}>
            SHARE THIS ARTICLE
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`https://www.secondrenaissance.ai/blog/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: '#1da1f2',
                color: '#fff',
                borderRadius: '6px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Share on X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.secondrenaissance.ai/blog/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: '#0077b5',
                color: '#fff',
                borderRadius: '6px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: https://www.secondrenaissance.ai/blog/${slug}`)}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: '#f5f0e8',
                color: '#666',
                borderRadius: '6px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                textDecoration: 'none',
                border: '1px solid #e0d8c8',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Email
            </a>
          </div>
        </div>

        {/* Comments */}
        <Comments postSlug={slug} />

        {/* Navigation */}
        {(prevPost || nextPost) && (
          <div style={{
            marginTop: '64px',
            paddingTop: '32px',
            borderTop: '1px solid #e8e4dc',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            {prevPost ? (
              <Link href={prevPost.href} style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#9e4a3a',
                textDecoration: 'none',
              }}>
                ← {prevPost.title}
              </Link>
            ) : <span />}
            {nextPost && (
              <Link href={nextPost.href} style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#9e4a3a',
                textDecoration: 'none',
              }}>
                {nextPost.title} →
              </Link>
            )}
          </div>
        )}
      </article>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #e8e4dc',
        padding: '40px 24px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          color: '#888',
        }}>
          Translations at <a href="https://sourcelibrary.org" style={{ color: '#666' }}>Source Library</a> · Support our work at <a href="https://www.ancientwisdomtrust.org/become-a-patron" style={{ color: '#666' }}>Ancient Wisdom Trust</a>
        </p>
      </footer>
    </main>
  );
}
