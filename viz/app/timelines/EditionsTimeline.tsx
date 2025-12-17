"use client";

import { useState, useEffect, useMemo } from "react";

interface YearData {
  [year: string]: number;
}

interface AuthorData {
  total: number;
  start: number;
  end: number;
  years: YearData;
}

interface AuthorEditions {
  [author: string]: AuthorData;
}

interface CategoryConfig {
  name: string;
  color: string;
  authors: string[];
  type: string;
}

const categories: CategoryConfig[] = [
  {
    name: "Classical Authors",
    color: "#9e4a3a",
    type: "Ancient Roman & Greek",
    authors: ["Cicero", "Aristotle", "Ovid", "Virgil", "Terence", "Horace", "Seneca", "Pliny the Elder"],
  },
  {
    name: "Church Fathers & Medieval",
    color: "#8b5cf6",
    type: "Theological",
    authors: ["Thomas Aquinas", "Augustine", "Bonaventure", "Duns Scotus", "Bartolus"],
  },
  {
    name: "Renaissance Humanists",
    color: "#546b8a",
    type: "Humanist scholars",
    authors: ["Erasmus", "Josse Bade", "Justus Lipsius", "Poliziano"],
  },
  {
    name: "Reformers",
    color: "#c9a86c",
    type: "Protestant thinkers",
    authors: ["Melanchthon", "Luther", "Calvin", "Beza"],
  },
  {
    name: "Scientists & Physicians",
    color: "#8b9a7d",
    type: "Natural philosophy",
    authors: ["Galen", "Hippocrates", "Avicenna", "Euclid"],
  },
];

const START_YEAR = 1450;
const END_YEAR = 1720;
const YEAR_RANGE = END_YEAR - START_YEAR;

export default function EditionsTimeline() {
  const [data, setData] = useState<AuthorEditions | null>(null);
  const [selected, setSelected] = useState<{ category: string; author: string; data: AuthorData } | null>(null);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  useEffect(() => {
    fetch('/author_editions_by_year.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const yearToPercent = (year: number) => ((year - START_YEAR) / YEAR_RANGE) * 100;

  const decades = [1450, 1500, 1550, 1600, 1650, 1700];

  // Aggregate year data into decades for visualization
  const getDecadeData = useMemo(() => {
    if (!data) return () => [];
    return (author: string) => {
      const authorData = data[author];
      if (!authorData) return [];

      const decadeMap: { [decade: number]: number } = {};
      for (let d = 1450; d <= 1700; d += 10) {
        decadeMap[d] = 0;
      }

      Object.entries(authorData.years).forEach(([year, count]) => {
        const decade = Math.floor(parseInt(year) / 10) * 10;
        if (decadeMap[decade] !== undefined) {
          decadeMap[decade] += count;
        }
      });

      return Object.entries(decadeMap)
        .map(([decade, count]) => ({ decade: parseInt(decade), count }))
        .sort((a, b) => a.decade - b.decade);
    };
  }, [data]);

  // Find max editions in any decade for scaling
  const maxDecadeCount = useMemo(() => {
    if (!data) return 100;
    let max = 0;
    categories.forEach(cat => {
      cat.authors.forEach(author => {
        const decadeData = getDecadeData(author);
        decadeData.forEach(d => {
          if (d.count > max) max = d.count;
        });
      });
    });
    return max;
  }, [data, getDecadeData]);

  if (!data) {
    return (
      <div style={{ background: '#fdfcf9', padding: '48px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', color: '#888' }}>Loading edition data...</p>
      </div>
    );
  }

  return (
    <div style={{ background: '#fdfcf9', padding: '24px 0' }}>
      {/* Year axis */}
      <div style={{
        position: 'relative',
        height: '40px',
        marginBottom: '8px',
        marginLeft: '140px',
        marginRight: '24px',
      }}>
        {decades.map(year => (
          <div
            key={year}
            style={{
              position: 'absolute',
              left: `${yearToPercent(year)}%`,
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}
          >
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              color: '#666',
            }}>
              {year}
            </div>
            <div style={{
              width: '1px',
              height: '8px',
              background: '#ccc',
              margin: '4px auto 0',
            }} />
          </div>
        ))}
        {hoveredYear && (
          <div
            style={{
              position: 'absolute',
              left: `${yearToPercent(hoveredYear)}%`,
              top: '0',
              transform: 'translateX(-50%)',
              background: '#1a1612',
              color: '#fff',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            {hoveredYear}s
          </div>
        )}
      </div>

      {/* Note about visualization */}
      <div style={{
        marginLeft: '140px',
        marginRight: '24px',
        marginBottom: '16px',
        padding: '12px 16px',
        background: '#f5f0e8',
        borderRadius: '6px',
        fontSize: '13px',
        fontFamily: 'Inter, sans-serif',
        color: '#666',
      }}>
        <strong>Edition intensity:</strong> Bar height shows editions per decade.
        Classical authors like Cicero were printed continuously; reformers peaked in specific periods.
      </div>

      {/* Categories and bars */}
      {categories.map((category) => (
        <div key={category.name} style={{ marginBottom: '24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            paddingLeft: '12px',
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '3px',
              background: category.color,
              marginRight: '8px',
            }} />
            <span style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '16px',
              fontWeight: 600,
              color: '#1a1612',
            }}>
              {category.name}
            </span>
          </div>

          <div style={{ position: 'relative' }}>
            {category.authors.map((author) => {
              const authorData = data[author];
              if (!authorData) return null;

              const decadeData = getDecadeData(author);
              const isSelected = selected?.author === author;

              return (
                <div
                  key={author}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '48px',
                    marginBottom: '4px',
                  }}
                >
                  <div style={{
                    width: '140px',
                    paddingRight: '12px',
                    textAlign: 'right',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: isSelected ? category.color : '#555',
                    fontWeight: isSelected ? 600 : 400,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {author}
                  </div>

                  <div
                    style={{
                      flex: 1,
                      position: 'relative',
                      height: '100%',
                      marginRight: '24px',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelected(isSelected ? null : { category: category.name, author, data: authorData })}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percent = x / rect.width;
                      const year = Math.floor((START_YEAR + percent * YEAR_RANGE) / 10) * 10;
                      setHoveredYear(year);
                    }}
                    onMouseLeave={() => setHoveredYear(null)}
                  >
                    {/* Grid lines for centuries */}
                    {decades.map(year => (
                      <div
                        key={year}
                        style={{
                          position: 'absolute',
                          left: `${yearToPercent(year)}%`,
                          top: 0,
                          bottom: 0,
                          width: '1px',
                          background: '#e8e4dc',
                        }}
                      />
                    ))}

                    {/* Decade bars (sparkline-style) */}
                    {decadeData.map(({ decade, count }) => {
                      if (count === 0) return null;
                      const left = yearToPercent(decade);
                      const barWidth = (10 / YEAR_RANGE) * 100; // 10 years width
                      const barHeight = Math.max(4, (count / maxDecadeCount) * 40);

                      return (
                        <div
                          key={decade}
                          style={{
                            position: 'absolute',
                            left: `${left}%`,
                            width: `${barWidth}%`,
                            bottom: '4px',
                            height: `${barHeight}px`,
                            background: isSelected ? category.color : `${category.color}bb`,
                            borderRadius: '2px 2px 0 0',
                            transition: 'all 0.15s ease',
                          }}
                        />
                      );
                    })}

                    {/* Total count label */}
                    <span style={{
                      position: 'absolute',
                      right: '4px',
                      top: '4px',
                      fontSize: '11px',
                      fontFamily: 'Inter, sans-serif',
                      color: '#888',
                      fontWeight: 500,
                    }}>
                      {authorData.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Selected author detail */}
      {selected && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          padding: '20px 24px',
          maxWidth: '600px',
          width: 'calc(100% - 48px)',
          zIndex: 100,
          border: `3px solid ${categories.find(c => c.name === selected.category)?.color}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '24px',
                fontWeight: 600,
                color: '#1a1612',
                margin: 0,
              }}>
                {selected.author}
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: '#888',
                margin: '4px 0 0 0',
              }}>
                {categories.find(c => c.name === selected.category)?.type}
              </p>
            </div>
            <button
              onClick={() => setSelected(null)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: '#888',
                cursor: 'pointer',
                padding: '0',
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
          <div style={{
            display: 'flex',
            gap: '24px',
            marginTop: '16px',
            alignItems: 'flex-end',
          }}>
            <div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '32px',
                fontWeight: 700,
                color: categories.find(c => c.name === selected.category)?.color,
                margin: 0,
              }}>
                {selected.data.total.toLocaleString()}
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                color: '#888',
                margin: '2px 0 0 0',
              }}>
                Latin editions
              </p>
            </div>
            <div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#444',
                margin: 0,
              }}>
                Printed {selected.data.start}–{selected.data.end}
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: '#888',
                margin: '4px 0 0 0',
              }}>
                {selected.data.end - selected.data.start} years in print
              </p>
            </div>
          </div>

          {/* Mini sparkline chart */}
          <div style={{
            marginTop: '16px',
            padding: '12px 0',
            borderTop: '1px solid #e8e4dc',
          }}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              color: '#888',
              margin: '0 0 8px 0',
            }}>
              Editions by decade
            </p>
            <div style={{
              display: 'flex',
              gap: '2px',
              alignItems: 'flex-end',
              height: '60px',
            }}>
              {getDecadeData(selected.author).map(({ decade, count }) => {
                const maxInAuthor = Math.max(...getDecadeData(selected.author).map(d => d.count));
                const barHeight = maxInAuthor > 0 ? (count / maxInAuthor) * 56 : 0;

                return (
                  <div
                    key={decade}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: `${Math.max(2, barHeight)}px`,
                        background: categories.find(c => c.name === selected.category)?.color,
                        borderRadius: '2px 2px 0 0',
                      }}
                    />
                    {decade % 50 === 0 && (
                      <span style={{
                        fontSize: '9px',
                        fontFamily: 'Inter, sans-serif',
                        color: '#888',
                        marginTop: '4px',
                      }}>
                        {decade}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
