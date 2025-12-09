'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Supabase client
const supabase = createClient(
  'https://ykhxaecbbxaaqlujuzde.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlraHhhZWNiYnhhYXFsdWp1emRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjExMDEsImV4cCI6MjA4MDYzNzEwMX0.O2chfnHGQWLOaVSFQ-F6UJMlya9EzPbsUh848SEOPj4'
);

interface Work {
  id: string;
  title: string;
  author?: string;
  year?: number;
  publisher?: string;
  city?: string;
  ubn?: string;
  detected_language?: string;
}

interface MatchValidation {
  id: string;
  bph_id: string;
  bph_title: string;
  bph_author?: string;
  bph_year?: number;
  bph_publisher?: string;
  bph_city?: string;
  ia_identifier: string;
  ia_title: string;
  ia_creator?: string;
  ia_year?: number;
  ia_publisher?: string;
  ia_place?: string;
  match_score: number;
  match_type: string;
  is_same_work?: boolean;
  is_same_edition?: boolean;
  notes?: string;
  validated_by?: string;
}

type TaskType = 'language' | 'match';

export default function ContributePage() {
  const [taskType, setTaskType] = useState<TaskType>('language');
  const [currentWork, setCurrentWork] = useState<Work | null>(null);
  const [currentMatch, setCurrentMatch] = useState<MatchValidation | null>(null);
  const [loading, setLoading] = useState(false);
  const [contributionCount, setContributionCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validatorName, setValidatorName] = useState<string>('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [totalUnvalidated, setTotalUnvalidated] = useState<number | null>(null);

  // Load a random work for language verification
  const loadRandomWork = async () => {
    setLoading(true);
    setSubmitted(false);
    setError(null);

    try {
      // Get count of ALL works in 1400-1700 range (not just Latin)
      const { count, error: countError } = await supabase
        .from('bph_works')
        .select('*', { count: 'exact', head: true })
        .gte('year', 1400)
        .lte('year', 1700);

      if (countError) throw countError;

      if (!count || count === 0) {
        setError('No works available');
        setLoading(false);
        return;
      }

      // Get a random work using limit and offset
      const randomOffset = Math.floor(Math.random() * count);
      const { data, error: fetchError } = await supabase
        .from('bph_works')
        .select('id, title, author, year, publisher, city, ubn, detected_language')
        .gte('year', 1400)
        .lte('year', 1700)
        .order('id')
        .range(randomOffset, randomOffset);

      if (fetchError) throw fetchError;
      if (!data || data.length === 0) {
        throw new Error('No work returned');
      }
      setCurrentWork(data[0]);
    } catch (err) {
      console.error('Error loading work:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to load work: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  // Load a random match for validation
  const loadRandomMatch = async () => {
    setLoading(true);
    setSubmitted(false);
    setError(null);

    try {
      // Get count of unvalidated matches
      const { count, error: countError } = await supabase
        .from('match_validations')
        .select('*', { count: 'exact', head: true })
        .is('is_same_work', null);

      if (countError) {
        console.error('Count error:', countError);
        throw countError;
      }

      if (!count || count === 0) {
        setError('All matches have been validated! Thank you!');
        setTotalUnvalidated(0);
        setLoading(false);
        return;
      }

      setTotalUnvalidated(count);

      // Get a random unvalidated match - use limit(1) with offset instead of range
      const randomOffset = Math.floor(Math.random() * count);
      const { data, error: fetchError } = await supabase
        .from('match_validations')
        .select('*')
        .is('is_same_work', null)
        .order('created_at', { ascending: true })
        .range(randomOffset, randomOffset);

      if (fetchError) {
        console.error('Fetch error:', fetchError);
        throw fetchError;
      }
      if (!data || data.length === 0) {
        throw new Error('No match returned');
      }
      setCurrentMatch(data[0]);
    } catch (err) {
      console.error('Error loading match:', err);
      setError('Failed to load match. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Submit a language validation
  const submitLanguageValidation = async (isLatin: boolean | null, notes?: string) => {
    if (!currentWork) return;

    try {
      // Store the contribution
      const { error: insertError } = await supabase
        .from('crowd_validations')
        .insert({
          work_id: currentWork.id,
          validation_type: 'latin_language',
          is_valid: isLatin,
          notes: notes || null,
          validator_name: validatorName || null,
          created_at: new Date().toISOString(),
        });

      if (insertError) {
        // Table might not exist yet - that's ok for demo
        console.log('Note: crowd_validations table may need to be created');
      }

      setContributionCount(prev => prev + 1);
      setSubmitted(true);

      // Load next work after a brief delay
      setTimeout(() => {
        loadRandomWork();
      }, 1500);
    } catch (err) {
      console.error('Error submitting:', err);
      setContributionCount(prev => prev + 1);
      setSubmitted(true);
      setTimeout(() => {
        loadRandomWork();
      }, 1500);
    }
  };

  // Submit a match validation
  const submitMatchValidation = async (isSameWork: boolean | null, isSameEdition?: boolean, notes?: string) => {
    if (!currentMatch) return;

    try {
      // Update the match validation
      const { error: updateError } = await supabase
        .from('match_validations')
        .update({
          is_same_work: isSameWork,
          is_same_edition: isSameEdition ?? null,
          notes: notes || null,
          validated_by: validatorName || null,
        })
        .eq('id', currentMatch.id);

      if (updateError) {
        console.error('Error updating:', updateError);
      }

      setContributionCount(prev => prev + 1);
      setSubmitted(true);

      // Load next match after a brief delay
      setTimeout(() => {
        loadRandomMatch();
      }, 1500);
    } catch (err) {
      console.error('Error submitting:', err);
      setContributionCount(prev => prev + 1);
      setSubmitted(true);
      setTimeout(() => {
        loadRandomMatch();
      }, 1500);
    }
  };

  // Load data when task type changes
  useEffect(() => {
    if (taskType === 'language') {
      loadRandomWork();
    } else {
      loadRandomMatch();
    }
  }, [taskType]);

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
            <Link href="/contribute" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9e4a3a', fontWeight: 500, textDecoration: 'none' }}>Verify</Link>
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
          Verify
        </h1>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          color: '#666',
          lineHeight: 1.6,
          maxWidth: '700px',
          margin: '0 auto 32px',
        }}>
          Help us verify language detection and catalog matching. Each contribution improves our research.
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
              Your contributions: <strong style={{ color: '#9e4a3a' }}>{contributionCount}</strong>
            </span>
          </div>
          {taskType === 'match' && totalUnvalidated !== null && (
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

      {/* Task Selection Tabs */}
      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '32px',
          justifyContent: 'center',
        }}>
          <button
            onClick={() => setTaskType('language')}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: taskType === 'language' ? '#9e4a3a' : '#f5f2eb',
              color: taskType === 'language' ? '#fff' : '#666',
              transition: 'all 0.2s',
            }}
          >
            Language Verification
          </button>
          <button
            onClick={() => setTaskType('match')}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: taskType === 'match' ? '#9e4a3a' : '#f5f2eb',
              color: taskType === 'match' ? '#fff' : '#666',
              transition: 'all 0.2s',
            }}
          >
            Match Validation
          </button>
        </div>

        {/* Task Card */}
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
                  onClick={taskType === 'language' ? loadRandomWork : loadRandomMatch}
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
                Loading next {taskType === 'language' ? 'work' : 'match'}...
              </p>
            </div>
          ) : taskType === 'language' && currentWork ? (
            /* Language Verification UI */
            <>
              {/* Question */}
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#9e4a3a',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}>
                Is this work in Latin?
              </p>

              {/* Work Details */}
              <div style={{
                background: '#faf7f2',
                borderRadius: '8px',
                padding: '24px',
                marginBottom: '24px',
              }}>
                <h2 style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '20px',
                  fontWeight: 500,
                  color: '#1a1612',
                  lineHeight: 1.4,
                  marginBottom: '12px',
                }}>
                  {currentWork.title}
                </h2>

                <div style={{
                  display: 'flex',
                  gap: '24px',
                  flexWrap: 'wrap',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  color: '#666',
                }}>
                  {currentWork.author && (
                    <span><strong>Author:</strong> {currentWork.author}</span>
                  )}
                  {currentWork.year && (
                    <span><strong>Year:</strong> {currentWork.year}</span>
                  )}
                  {currentWork.publisher && (
                    <span><strong>Publisher:</strong> {currentWork.publisher}</span>
                  )}
                  {currentWork.city && (
                    <span><strong>City:</strong> {currentWork.city}</span>
                  )}
                </div>

                {/* Link to catalog */}
                {currentWork.title && (
                  <a
                    href={`https://embassyofthefreemind.com/en/library/online-catalogue/?mode=gallery&view=table&q=${encodeURIComponent(currentWork.title.split(' ').slice(0, 4).join(' '))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      marginTop: '16px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      color: '#9e4a3a',
                      textDecoration: 'none',
                    }}
                  >
                    Search in BPH Catalog →
                  </a>
                )}
              </div>

              {/* Answer Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
              }}>
                <button
                  onClick={() => submitLanguageValidation(true)}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500,
                    padding: '14px 32px',
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
                  Yes, Latin
                </button>
                <button
                  onClick={() => submitLanguageValidation(false)}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500,
                    padding: '14px 32px',
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
                  Not Latin
                </button>
                <button
                  onClick={() => submitLanguageValidation(null)}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500,
                    padding: '14px 32px',
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
                onClick={loadRandomWork}
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
          ) : taskType === 'match' && currentMatch ? (
            /* Match Validation UI */
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
                  {currentMatch.match_type && (
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
                      {currentMatch.match_type.replace(/_/g, ' ')}
                    </span>
                  )}
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    color: '#888',
                  }}>
                    {getScoreLabel(currentMatch.match_score)}
                  </span>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: getScoreColor(currentMatch.match_score),
                    background: `${getScoreColor(currentMatch.match_score)}15`,
                    padding: '4px 12px',
                    borderRadius: '12px',
                  }}>
                    {(currentMatch.match_score * 100).toFixed(0)}%
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
                    BPH Catalog
                  </p>
                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '18px',
                    fontWeight: 500,
                    color: '#1a1612',
                    lineHeight: 1.4,
                    marginBottom: '12px',
                  }}>
                    {currentMatch.bph_title}
                  </h3>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: '#666',
                    lineHeight: 1.6,
                  }}>
                    {currentMatch.bph_author && (
                      <p style={{ marginBottom: '4px' }}><strong>Author:</strong> {currentMatch.bph_author}</p>
                    )}
                    {currentMatch.bph_year && (
                      <p style={{ marginBottom: '4px' }}>
                        <strong>Year:</strong>{' '}
                        <span style={{
                          background: currentMatch.ia_year && Number(currentMatch.bph_year) === Number(currentMatch.ia_year) ? '#d4edda' : '#fff3cd',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 600,
                        }}>
                          {currentMatch.bph_year}
                        </span>
                      </p>
                    )}
                  </div>
                  <a
                    href={`https://embassyofthefreemind.com/en/library/online-catalogue/?mode=gallery&view=table&q=${encodeURIComponent(currentMatch.bph_title.split(' ').slice(0, 4).join(' '))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      marginTop: '12px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      color: '#9e4a3a',
                      textDecoration: 'none',
                    }}
                  >
                    Search BPH →
                  </a>
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
                    Internet Archive
                  </p>
                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '18px',
                    fontWeight: 500,
                    color: '#1a1612',
                    lineHeight: 1.4,
                    marginBottom: '12px',
                  }}>
                    {currentMatch.ia_title}
                  </h3>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: '#666',
                    lineHeight: 1.6,
                  }}>
                    {currentMatch.ia_creator && (
                      <p style={{ marginBottom: '4px' }}><strong>Creator:</strong> {currentMatch.ia_creator}</p>
                    )}
                    {currentMatch.ia_year && (
                      <p style={{ marginBottom: '4px' }}>
                        <strong>Year:</strong>{' '}
                        <span style={{
                          background: currentMatch.bph_year && Number(currentMatch.bph_year) === Number(currentMatch.ia_year) ? '#d4edda' : '#fff3cd',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 600,
                        }}>
                          {currentMatch.ia_year}
                        </span>
                      </p>
                    )}
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
                  onClick={() => submitMatchValidation(true, true)}
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
                  onClick={() => submitMatchValidation(true, false)}
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
                  Same Work, Diff Edition
                </button>
                <button
                  onClick={() => submitMatchValidation(false)}
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
                  onClick={() => submitMatchValidation(null)}
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
            {taskType === 'language' ? 'How to Verify Language' : 'How to Validate Matches'}
          </h3>
          <ul style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            color: '#555',
            lineHeight: 1.8,
            paddingLeft: '20px',
          }}>
            {taskType === 'language' ? (
              <>
                <li>Look at the title and author name for Latin indicators</li>
                <li>Click "Search in BPH Catalog" to see more details if needed</li>
                <li>Choose <strong>Yes, Latin</strong> if the work is in Latin</li>
                <li>Choose <strong>Not Latin</strong> if it's in German, Dutch, French, etc.</li>
                <li>Choose <strong>Uncertain</strong> if the title could be either</li>
              </>
            ) : (
              <>
                <li>Compare the titles, authors, and years on both sides</li>
                <li>Click the Internet Archive link to view the actual digitized text</li>
                <li>Choose <strong>Same Edition</strong> if the IA text is the exact same printing</li>
                <li>Choose <strong>Same Work, Diff Edition</strong> if it's the same text but a different printing/year</li>
                <li>Choose <strong>Different Works</strong> if these are completely different texts</li>
              </>
            )}
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
          Second Renaissance Research • Data from the{' '}
          <a
            href="https://embassyofthefreemind.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#9e4a3a', textDecoration: 'none' }}
          >
            Bibliotheca Philosophica Hermetica
          </a>
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          color: '#aaa',
          marginTop: '12px',
        }}>
          v1.0.4
        </p>
      </footer>
    </main>
  );
}
