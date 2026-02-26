import BlogLayout from "../BlogLayout";
import { generateBlogMetadata } from "@/lib/blogMetadata";

const postMeta = {
  title: "The Digitization Gap: What's Online and What's Not",
  description: "Only 18% of Latin works are digitized, 8% have searchable OCR, and less than 3% are translated. The accessibility crisis in Renaissance scholarship.",
  slug: "digitization-gap",
  date: "2025-11-01",
};

export const metadata = generateBlogMetadata(postMeta);

export default function DigitizationGap() {
  return (
    <BlogLayout
      title="The Digitization Gap: How Much Renaissance Latin Is Actually Accessible?"
      tag="Data"
      slug="digitization-gap"
      date="December 2024"
    >
      <p style={{
        fontFamily: 'Newsreader, Georgia, serif',
        fontSize: '20px',
        color: '#666',
        lineHeight: 1.6,
        marginBottom: '24px',
      }}>
        We built a database of 1.6 million early modern books and tested whether you can actually find them online. The results reveal a surprising bottleneck in the translation pipeline.
      </p>

      <div style={{
          fontFamily: 'Newsreader, Georgia, serif',
          fontSize: '18px',
          lineHeight: 1.8,
          color: '#333',
        }}>
          <p style={{ marginBottom: '24px' }}>
            Before you can translate a book, you need to read it. Before you can read it, you need to find a digital copy. This turns out to be harder than you might think.
          </p>

          <p style={{ marginBottom: '24px' }}>
            We set out to answer a basic question: <strong>of the 500,000+ Latin works printed between 1450 and 1700, how many are actually accessible online?</strong>
          </p>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            color: '#1a1612',
            marginTop: '48px',
            marginBottom: '24px',
          }}>
            The Experiment
          </h2>

          <p style={{ marginBottom: '24px' }}>
            We loaded two major bibliographic databases into a queryable system:
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}>
              <strong>ISTC</strong> (Incunabula Short Title Catalogue): 30,087 works from the 15th century, the earliest printed books
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>USTC</strong> (Universal Short Title Catalogue): 1,628,578 editions from 1450-1700, the full early modern period
            </li>
          </ul>

          <p style={{ marginBottom: '24px' }}>
            We then randomly sampled 100 Latin works from each catalogue and searched for them in three major digital repositories: Internet Archive, HathiTrust, and Google Books.
          </p>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            color: '#1a1612',
            marginTop: '48px',
            marginBottom: '24px',
          }}>
            The Results
          </h2>

          {/* Results Table */}
          <div style={{
            background: '#fff',
            border: '1px solid #e8e4dc',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '32px',
          }}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.05em',
              color: '#888',
              marginBottom: '20px',
            }}>
              DIGITIZATION COVERAGE BY SOURCE
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e8e4dc' }}>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: '#666' }}>Source</th>
                  <th style={{ textAlign: 'center', padding: '12px 0', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: '#666' }}>ISTC (15th c.)</th>
                  <th style={{ textAlign: 'center', padding: '12px 0', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: '#666' }}>USTC (1450-1700)</th>
                </tr>
              </thead>
              <tbody style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                <tr style={{ borderBottom: '1px solid #f0ede8' }}>
                  <td style={{ padding: '12px 0' }}>Google Books</td>
                  <td style={{ textAlign: 'center', padding: '12px 0', color: '#1a1612', fontWeight: 500 }}>78%</td>
                  <td style={{ textAlign: 'center', padding: '12px 0', color: '#1a1612', fontWeight: 500 }}>65%</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f0ede8' }}>
                  <td style={{ padding: '12px 0' }}>Internet Archive</td>
                  <td style={{ textAlign: 'center', padding: '12px 0', color: '#666' }}>15%</td>
                  <td style={{ textAlign: 'center', padding: '12px 0', color: '#666' }}>4%</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f0ede8' }}>
                  <td style={{ padding: '12px 0' }}>HathiTrust</td>
                  <td style={{ textAlign: 'center', padding: '12px 0', color: '#999' }}>0%*</td>
                  <td style={{ textAlign: 'center', padding: '12px 0', color: '#999' }}>0%*</td>
                </tr>
                <tr style={{ background: '#fdfcf9' }}>
                  <td style={{ padding: '12px 0', fontWeight: 600 }}>Any Source</td>
                  <td style={{ textAlign: 'center', padding: '12px 0', color: '#9e4a3a', fontWeight: 600, fontSize: '16px' }}>79%</td>
                  <td style={{ textAlign: 'center', padding: '12px 0', color: '#9e4a3a', fontWeight: 600, fontSize: '16px' }}>65%</td>
                </tr>
              </tbody>
            </table>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              color: '#aaa',
              marginTop: '16px',
            }}>
              *HathiTrust&apos;s bibliographic API doesn&apos;t match well on historical Latin titles. Their holdings may be higher.
            </p>
          </div>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            color: '#1a1612',
            marginTop: '48px',
            marginBottom: '24px',
          }}>
            What This Means for Translation
          </h2>

          <p style={{ marginBottom: '24px' }}>
            The good news: <strong>roughly two-thirds of Renaissance Latin works appear to have at least one digital version available.</strong> Google Books, despite its controversial scanning project, has become the de facto repository for early modern books.
          </p>

          <p style={{ marginBottom: '24px' }}>
            The complicating news: &quot;available&quot; doesn&apos;t mean &quot;usable.&quot; A Google Books result might be:
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}>A snippet view with no full access</li>
            <li style={{ marginBottom: '12px' }}>A poorly scanned PDF with unusable OCR</li>
            <li style={{ marginBottom: '12px' }}>A 19th-century reprint rather than the original</li>
            <li style={{ marginBottom: '12px' }}>Metadata that matches but wrong edition</li>
          </ul>

          <p style={{ marginBottom: '24px' }}>
            The clear finding: <strong>15th-century books (incunabula) are better digitized than 16th-17th century works.</strong> This makes sense—incunabula are rare, valuable, and have been the focus of special cataloging and preservation efforts for decades.
          </p>

          <div style={{
            background: '#1a1612',
            color: '#fff',
            padding: '32px',
            borderRadius: '8px',
            marginTop: '48px',
            marginBottom: '48px',
          }}>
            <p style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '24px',
              fontWeight: 400,
              marginBottom: '16px',
              lineHeight: 1.4,
            }}>
              &quot;The 16th century—arguably the intellectual heart of the Renaissance—is less accessible than the 15th.&quot;
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.6)',
            }}>
              65% vs 79% digitization coverage
            </p>
          </div>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            color: '#1a1612',
            marginTop: '48px',
            marginBottom: '24px',
          }}>
            The Translation Pipeline
          </h2>

          <p style={{ marginBottom: '24px' }}>
            To translate Renaissance Latin at scale, you need:
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '32px',
          }}>
            {[
              { step: '1', title: 'Cataloging', desc: 'What exists?', status: 'done', note: '1.6M records in USTC' },
              { step: '2', title: 'Digitization', desc: 'Can you see it?', status: 'partial', note: '~65-79% available' },
              { step: '3', title: 'OCR', desc: 'Can a machine read it?', status: 'weak', note: 'Variable quality' },
              { step: '4', title: 'Translation', desc: 'Into modern languages', status: 'minimal', note: '<3% translated' },
            ].map((item) => (
              <div key={item.step} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 20px',
                background: '#fff',
                border: '1px solid #e8e4dc',
                borderRadius: '8px',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: item.status === 'done' ? '#8b9a7d' : item.status === 'partial' ? '#c9a86c' : '#9e4a3a',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                }}>
                  {item.step}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#1a1612',
                    marginBottom: '2px',
                  }}>{item.title}</p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    color: '#888',
                  }}>{item.desc}</p>
                </div>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#666',
                  textAlign: 'right',
                }}>{item.note}</p>
              </div>
            ))}
          </div>

          <p style={{ marginBottom: '24px' }}>
            The bottleneck isn&apos;t just translation—it&apos;s the entire pipeline. Even if AI translation becomes perfect tomorrow, we still need clean digital texts to feed it.
          </p>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            color: '#1a1612',
            marginTop: '48px',
            marginBottom: '24px',
          }}>
            The 35% Gap
          </h2>

          <p style={{ marginBottom: '24px' }}>
            Our experiment suggests roughly 35% of USTC&apos;s Latin editions have no easily findable digital copy. That&apos;s approximately <strong>175,000 Latin works</strong> that may only exist in physical form in European libraries.
          </p>

          <p style={{ marginBottom: '24px' }}>
            These aren&apos;t necessarily obscure texts. The sampling was random. A 1580 medical treatise, a 1620 philosophical disputation, a 1650 legal commentary—any of these might contain ideas that shaped modern thought, waiting in a library vault.
          </p>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            color: '#1a1612',
            marginTop: '48px',
            marginBottom: '24px',
          }}>
            What We&apos;re Building
          </h2>

          <p style={{ marginBottom: '24px' }}>
            This experiment is part of a larger effort to map the accessibility of Renaissance Latin. We&apos;ve built:
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}>A Supabase database with 1.6M USTC records and 30K ISTC records</li>
            <li style={{ marginBottom: '12px' }}>Scripts to cross-reference against Internet Archive&apos;s 40M+ texts</li>
            <li style={{ marginBottom: '12px' }}>A framework for tracking which works have been digitized, OCR&apos;d, and translated</li>
          </ul>

          <p style={{ marginBottom: '24px' }}>
            The goal: create a systematic map of what&apos;s accessible and what&apos;s not, so translation efforts can be directed where they&apos;re most needed.
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid #e8e4dc', margin: '48px 0 24px' }} />

          <h3 style={{ fontSize: '14px', fontFamily: 'Inter, sans-serif', color: '#888', marginBottom: '16px' }}>Notes on Methodology</h3>

          <div style={{ fontSize: '14px', color: '#666', lineHeight: 1.8 }}>
            <p style={{ marginBottom: '16px' }}>
              <strong>Sample methodology:</strong> We randomly selected 100 Latin works from each catalog (ISTC and USTC)
              using database row sampling. For each work, we searched Google Books, Internet Archive, and HathiTrust
              using title and author fields. A work was counted as &ldquo;digitized&rdquo; if any version (original or later edition)
              appeared with viewable content.
            </p>
            <p style={{ marginBottom: '16px' }}>
              <strong>Limitations:</strong> Sample sizes of 100 yield margins of error around ±10%.
              HathiTrust results may undercount due to API matching issues with historical Latin titles.
              Google Books &ldquo;snippet view&rdquo; was counted as available; full-text access varies by region and copyright status.
            </p>
            <p style={{ marginBottom: '16px' }}>
              <strong>Sources:</strong> ISTC data from <a href="https://data.cerl.org/istc" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>CERL</a> (30,087 records).
              USTC data from <a href="https://ustc.ac.uk" target="_blank" rel="noopener noreferrer" style={{ color: '#9e4a3a' }}>University of St Andrews</a> (1.65M records, queried December 2024).
              See our <a href="/blog/methodology" style={{ color: '#9e4a3a' }}>full methodology page</a> for corpus statistics.
            </p>
          </div>

          <div style={{
            background: '#fdfcf9',
            border: '1px solid #e8e4dc',
            borderRadius: '8px',
            padding: '32px',
            marginTop: '48px',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '24px',
              color: '#1a1612',
              marginBottom: '16px',
            }}>
              The Renaissance is waiting. Let&apos;s find it.
            </p>
            <a
              href="https://www.ancientwisdomtrust.org/become-a-patron"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#fff',
                background: '#9e4a3a',
                padding: '12px 32px',
                borderRadius: '4px',
                textDecoration: 'none',
              }}
            >
              Support This Research
            </a>
          </div>
        </div>

    </BlogLayout>
  );
}
