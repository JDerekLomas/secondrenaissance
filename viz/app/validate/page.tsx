'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Supabase client
const supabase = createClient(
  'https://ykhxaecbbxaaqlujuzde.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlraHhhZWNiYnhhYXFsdWp1emRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjExMDEsImV4cCI6MjA4MDYzNzEwMX0.O2chfnHGQWLOaVSFQ-F6UJMlya9EzPbsUh848SEOPj4'
);

interface BPHWorkWithMatch {
  id: string;
  title: string;
  author?: string;
  year?: number;
  publisher?: string;
  place?: string;
  ia_identifier: string;
  ia_url: string;
  ia_match_confidence: string;
  ia_match_method: string;
  ia_title_similarity?: number;
  ia_author_match?: boolean;
  ia_year_match?: boolean;
  // Validation fields
  ia_match_validated?: boolean;
  ia_match_is_same_work?: boolean;
  ia_match_is_same_edition?: boolean;
  ia_match_validated_by?: string;
  ia_match_validation_notes?: string;
}

interface IAMetadata {
  title?: string;
  creator?: string;
  date?: string;
  publisher?: string;
  description?: string;
}

export default function ValidatePage() {
  // State
  const [validatorName, setValidatorName] = useState<string>('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [currentMatch, setCurrentMatch] = useState<BPHWorkWithMatch | null>(null);
  const [iaMetadata, setIaMetadata] = useState<IAMetadata | null>(null);
  const [loadingIA, setLoadingIA] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationCount, setValidationCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalUnvalidated, setTotalUnvalidated] = useState<number | null>(null);

  // Fetch IA metadata
  const fetchIAMetadata = async (identifier: string) => {
    setLoadingIA(true);
    try {
      const response = await fetch(`https://archive.org/metadata/${identifier}`);
      const data = await response.json();
      if (data.metadata) {
        setIaMetadata({
          title: data.metadata.title,
          creator: Array.isArray(data.metadata.creator) ? data.metadata.creator.join(', ') : data.metadata.creator,
          date: data.metadata.date || data.metadata.year,
          publisher: data.metadata.publisher,
          description: data.metadata.description,
        });
      }
    } catch (err) {
      console.error('Error fetching IA metadata:', err);
    } finally {
      setLoadingIA(false);
    }
  };

  // Load a random unvalidated match
  const loadRandomMatch = async () => {
    setLoading(true);
    setSubmitted(false);
    setError(null);
    setIaMetadata(null);

    try {
      // Get count of unvalidated matches (has ia_identifier but not validated)
      // Note: Until validation columns are added, we just count all matches
      const { count } = await supabase
        .from('bph_works')
        .select('*', { count: 'exact', head: true })
        .not('ia_identifier', 'is', null);

      if (!count || count === 0) {
        setError('No matches found to validate.');
        setTotalUnvalidated(0);
        setLoading(false);
        return;
      }

      setTotalUnvalidated(count);

      // Get a random match
      const randomOffset = Math.floor(Math.random() * Math.min(count, 1000));
      const { data, error: fetchError } = await supabase
        .from('bph_works')
        .select('id, title, author, year, publisher, place, ia_identifier, ia_url, ia_match_confidence, ia_match_method, ia_title_similarity, ia_author_match, ia_year_match')
        .not('ia_identifier', 'is', null)
        .range(randomOffset, randomOffset)
        .single();

      if (fetchError) throw fetchError;
      setCurrentMatch(data);

      // Fetch IA metadata
      if (data?.ia_identifier) {
        fetchIAMetadata(data.ia_identifier);
      }
    } catch (err) {
      console.error('Error loading match:', err);
      setError('Failed to load match. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Submit a validation
  const submitValidation = async (isSameWork: boolean | null, isSameEdition?: boolean, notes?: string) => {
    if (!currentMatch) return;

    try {
      // Try to update the bph_works table with validation
      // Note: This will fail gracefully if validation columns don't exist yet
      const { error: updateError } = await supabase
        .from('bph_works')
        .update({
          ia_match_validated: true,
          ia_match_is_same_work: isSameWork,
          ia_match_is_same_edition: isSameEdition ?? null,
          ia_match_validation_notes: notes || null,
          ia_match_validated_by: validatorName || null,
        })
        .eq('id', currentMatch.id);

      if (updateError) {
        // Check if it's a column doesn't exist error
        if (updateError.code === '42703') {
          console.log('Validation columns not yet added to database. Run the SQL migration first.');
        } else {
          console.error('Error updating:', updateError);
        }
      }

      setValidationCount(prev => prev + 1);
      setSubmitted(true);

      // Load next match after a brief delay
      setTimeout(() => {
        loadRandomMatch();
      }, 1500);
    } catch (err) {
      console.error('Error submitting:', err);
      setValidationCount(prev => prev + 1);
      setSubmitted(true);
      setTimeout(() => {
        loadRandomMatch();
      }, 1500);
    }
  };

  useEffect(() => {
    loadRandomMatch();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return '#4a8a4a';
    if (score >= 0.8) return '#8a8a4a';
    return '#8a6a4a';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 0.9) return 'High confidence';
    if (score >= 0.8) return 'Medium confidence';
    return 'Low confidence';
  };

  return (
    <main className="min-h-screen" style={{ background: '#fdfcf9' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(253, 252, 249, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e8e4dc',
        zIndex: 100,
        padding: '16px 24px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link href="/" style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            color: '#666',
            textDecoration: 'none',
          }}>
            SECOND RENAISSANCE RESEARCH
          </Link>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Link href="/data" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#555', textDecoration: 'none' }}>Data</Link>
            <Link href="/blog" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#555', textDecoration: 'none' }}>Essays</Link>
            <Link href="/about" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#555', textDecoration: 'none' }}>About</Link>
            <Link href="/contribute" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#555', textDecoration: 'none' }}>Contribute</Link>
            <Link href="/validate" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9e4a3a', fontWeight: 500, textDecoration: 'none' }}>Validate</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: '120px 24px 40px',
        textAlign: 'center',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(28px, 5vw, 42px)',
          fontWeight: 400,
          color: '#1a1612',
          lineHeight: 1.2,
          marginBottom: '16px',
        }}>
          Validate BPH-Internet Archive Matches
        </h1>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          color: '#666',
          lineHeight: 1.6,
          maxWidth: '700px',
          margin: '0 auto 32px',
        }}>
          Help us verify whether our AI-matched works from the Bibliotheca Philosophica Hermetica
          correctly correspond to digitized texts on the Internet Archive.
        </p>

        {/* Validator Name Input */}
        {showNameInput && (
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '24px',
          }}>
            <label style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#666',
            }}>
              Your name (optional):
            </label>
            <input
              type="text"
              value={validatorName}
              onChange={(e) => setValidatorName(e.target.value)}
              placeholder="Enter your name"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                width: '200px',
              }}
            />
            <button
              onClick={() => setShowNameInput(false)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: '#888',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Hide
            </button>
          </div>
        )}
        {!showNameInput && validatorName && (
          <div style={{
            textAlign: 'center',
            marginBottom: '16px',
          }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#888',
            }}>
              Validating as: <strong style={{ color: '#9e4a3a' }}>{validatorName}</strong>
              {' '}
              <button
                onClick={() => setShowNameInput(true)}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#888',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Change
              </button>
            </span>
          </div>
        )}

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '24px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '40px',
        }}>
          <div style={{
            background: '#f5f2eb',
            padding: '12px 24px',
            borderRadius: '8px',
          }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#666',
            }}>
              Your validations: <strong style={{ color: '#9e4a3a' }}>{validationCount}</strong>
            </span>
          </div>
          {totalUnvalidated !== null && (
            <div style={{
              background: '#f5f2eb',
              padding: '12px 24px',
              borderRadius: '8px',
            }}>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#666',
              }}>
                Remaining: <strong style={{ color: '#666' }}>{totalUnvalidated}</strong>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Match Card */}
      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          padding: '32px',
          marginBottom: '40px',
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', color: '#888' }}>Loading...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', color: error.includes('Thank you') ? '#4a8a4a' : '#c44' }}>{error}</p>
              {!error.includes('Thank you') && (
                <button
                  onClick={loadRandomMatch}
                  style={{
                    marginTop: '16px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    padding: '8px 16px',
                    background: '#9e4a3a',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Try Again
                </button>
              )}
            </div>
          ) : submitted ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '24px',
                color: '#4a8a4a',
              }}>
                Thank you!
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', marginTop: '8px' }}>
                Loading next match...
              </p>
            </div>
          ) : currentMatch ? (
            <>
              {/* Match Score Badge */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
              }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#9e4a3a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Are these the same work?
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  {currentMatch.ia_match_confidence && (
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 500,
                      color: '#666',
                      background: '#f0f0f0',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                    }}>
                      {currentMatch.ia_match_confidence} confidence
                    </span>
                  )}
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    color: '#888',
                  }}>
                    {getScoreLabel((currentMatch.ia_title_similarity || 0) / 100)}
                  </span>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: getScoreColor((currentMatch.ia_title_similarity || 0) / 100),
                    background: `${getScoreColor((currentMatch.ia_title_similarity || 0) / 100)}15`,
                    padding: '4px 12px',
                    borderRadius: '12px',
                  }}>
                    {(currentMatch.ia_title_similarity || 0).toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Side-by-side comparison */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
                marginBottom: '24px',
              }}>
                {/* BPH Work */}
                <div style={{
                  background: '#faf7f2',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #9e4a3a',
                }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#9e4a3a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '12px',
                  }}>
                    BPH Catalog (Bibliotheca Philosophica Hermetica)
                  </p>
                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '18px',
                    fontWeight: 500,
                    color: '#1a1612',
                    lineHeight: 1.4,
                    marginBottom: '12px',
                  }}>
                    {currentMatch.title}
                  </h3>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: '#666',
                    lineHeight: 1.6,
                  }}>
                    {currentMatch.author && (
                      <p style={{ marginBottom: '4px' }}><strong>Author:</strong> {currentMatch.author}</p>
                    )}
                    {currentMatch.year && (
                      <p style={{ marginBottom: '4px' }}>
                        <strong>Year:</strong>{' '}
                        <span style={{
                          background: currentMatch.ia_year_match ? '#d4edda' : '#fff3cd',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 600,
                        }}>
                          {currentMatch.year}
                        </span>
                      </p>
                    )}
                    {currentMatch.publisher && (
                      <p style={{ marginBottom: '4px' }}><strong>Publisher:</strong> {currentMatch.publisher}</p>
                    )}
                    {currentMatch.place && (
                      <p style={{ marginBottom: '4px' }}><strong>Place:</strong> {currentMatch.place}</p>
                    )}
                    <p style={{ marginBottom: '4px', fontSize: '11px', color: '#888' }}>
                      <strong>ID:</strong> {currentMatch.id?.slice(0, 8)}...
                    </p>
                  </div>
                  <div style={{ marginTop: '12px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <a
                      href={`https://embassyofthefreemind.com/en/library/online-catalogue/?mode=gallery&view=table&q=${encodeURIComponent(currentMatch.title.split(' ').slice(0, 4).join(' '))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        color: '#9e4a3a',
                        textDecoration: 'none',
                      }}
                    >
                      Search BPH →
                    </a>
                    {currentMatch.author && (
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(currentMatch.author + ' ' + (currentMatch.title.split(' ').slice(0, 3).join(' ')))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '12px',
                          color: '#666',
                          textDecoration: 'none',
                        }}
                      >
                        Google →
                      </a>
                    )}
                  </div>
                </div>

                {/* Internet Archive */}
                <div style={{
                  background: '#f2f5fa',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #546b8a',
                }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#546b8a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '12px',
                  }}>
                    Internet Archive {loadingIA && <span style={{ color: '#888' }}>(loading...)</span>}
                  </p>
                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '18px',
                    fontWeight: 500,
                    color: '#1a1612',
                    lineHeight: 1.4,
                    marginBottom: '12px',
                  }}>
                    {iaMetadata?.title || currentMatch.ia_identifier}
                  </h3>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: '#666',
                    lineHeight: 1.6,
                  }}>
                    {iaMetadata?.creator && (
                      <p style={{ marginBottom: '4px' }}><strong>Creator:</strong> {iaMetadata.creator}</p>
                    )}
                    {iaMetadata?.date && (
                      <p style={{ marginBottom: '4px' }}>
                        <strong>Year:</strong>{' '}
                        <span style={{
                          background: currentMatch.ia_year_match ? '#d4edda' : '#fff3cd',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 600,
                        }}>
                          {iaMetadata.date}
                        </span>
                        {currentMatch.year && iaMetadata.date && !currentMatch.ia_year_match && (
                          <span style={{ marginLeft: '8px', fontSize: '11px', color: '#c44' }}>
                            (year mismatch)
                          </span>
                        )}
                      </p>
                    )}
                    {iaMetadata?.publisher && (
                      <p style={{ marginBottom: '4px' }}><strong>Publisher:</strong> {iaMetadata.publisher}</p>
                    )}
                    <p style={{ marginBottom: '4px', fontSize: '11px', color: '#888' }}>
                      <strong>ID:</strong> {currentMatch.ia_identifier}
                    </p>
                    {/* Match signals */}
                    <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {currentMatch.ia_author_match && (
                        <span style={{ fontSize: '10px', background: '#d4edda', padding: '2px 6px', borderRadius: '4px' }}>
                          Author match
                        </span>
                      )}
                      {currentMatch.ia_year_match && (
                        <span style={{ fontSize: '10px', background: '#d4edda', padding: '2px 6px', borderRadius: '4px' }}>
                          Year match
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ marginTop: '12px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <a
                      href={`https://archive.org/details/${currentMatch.ia_identifier}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        color: '#546b8a',
                        textDecoration: 'none',
                        fontWeight: 500,
                      }}
                    >
                      View Text →
                    </a>
                    <a
                      href={`https://archive.org/stream/${currentMatch.ia_identifier}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        color: '#546b8a',
                        textDecoration: 'none',
                      }}
                    >
                      Read Online →
                    </a>
                  </div>
                </div>
              </div>

              {/* Answer Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
                <button
                  onClick={() => submitValidation(true, true)}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: '12px 24px',
                    borderRadius: '6px',
                    border: '2px solid #4a8a4a',
                    background: '#fff',
                    color: '#4a8a4a',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#4a8a4a';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.color = '#4a8a4a';
                  }}
                >
                  Same Edition
                </button>
                <button
                  onClick={() => submitValidation(true, false)}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: '12px 24px',
                    borderRadius: '6px',
                    border: '2px solid #6b8a4a',
                    background: '#fff',
                    color: '#6b8a4a',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#6b8a4a';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.color = '#6b8a4a';
                  }}
                >
                  Same Work, Different Edition
                </button>
                <button
                  onClick={() => submitValidation(false)}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: '12px 24px',
                    borderRadius: '6px',
                    border: '2px solid #c44',
                    background: '#fff',
                    color: '#c44',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#c44';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.color = '#c44';
                  }}
                >
                  Different Works
                </button>
                <button
                  onClick={() => submitValidation(null)}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: '12px 24px',
                    borderRadius: '6px',
                    border: '2px solid #888',
                    background: '#fff',
                    color: '#888',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#888';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.color = '#888';
                  }}
                >
                  Uncertain
                </button>
              </div>

              {/* Skip */}
              <button
                onClick={loadRandomMatch}
                style={{
                  display: 'block',
                  margin: '24px auto 0',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: '#888',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Skip this one
              </button>
            </>
          ) : null}
        </div>

        {/* Instructions */}
        <div style={{
          background: '#f5f2eb',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '60px',
        }}>
          <h3 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '18px',
            fontWeight: 500,
            color: '#1a1612',
            marginBottom: '12px',
          }}>
            How to Validate Matches
          </h3>
          <ul style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            color: '#555',
            lineHeight: 1.8,
            paddingLeft: '20px',
          }}>
            <li>Compare the titles, authors, and years on both sides</li>
            <li>Click the Internet Archive link to view the actual digitized text</li>
            <li>Choose <strong>Same Edition</strong> if the IA text is the exact same printing</li>
            <li>Choose <strong>Same Work, Different Edition</strong> if it's the same text but a different printing/year</li>
            <li>Choose <strong>Different Works</strong> if these are completely different texts</li>
            <li>Choose <strong>Uncertain</strong> if you can't determine the match quality</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #e8e4dc',
        padding: '40px 24px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          color: '#888',
        }}>
          Second Renaissance Research • Matching the{' '}
          <a
            href="https://embassyofthefreemind.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#9e4a3a', textDecoration: 'none' }}
          >
            BPH
          </a>
          {' '}against the{' '}
          <a
            href="https://archive.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#546b8a', textDecoration: 'none' }}
          >
            Internet Archive
          </a>
        </p>
      </footer>
    </main>
  );
}
