"use client";

import { useState } from "react";

interface Printer {
  name: string;
  start: number;
  end: number;
  works: number;
  cities: string;
}

interface Region {
  name: string;
  color: string;
  printers: Printer[];
}

const data: Region[] = [
  {
    name: "Low Countries",
    color: "#e07b39",
    printers: [
      { name: "Officina Plantiniana", start: 1555, end: 1700, works: 4484, cities: "Antwerp (Plantin, then Moretus family)" },
      { name: "Elzevier Press", start: 1580, end: 1712, works: 1456, cities: "Leiden, Amsterdam" },
      { name: "Blaeu Press", start: 1596, end: 1672, works: 892, cities: "Amsterdam (maps, atlases)" },
      { name: "Nisius Press", start: 1652, end: 1694, works: 2303, cities: "Amsterdam, Frankfurt" },
    ]
  },
  {
    name: "German Lands",
    color: "#9e4a3a",
    printers: [
      { name: "Froben Press", start: 1491, end: 1564, works: 986, cities: "Basel (Erasmus's printer)" },
      { name: "Lufft Press", start: 1523, end: 1584, works: 1127, cities: "Wittenberg (Luther's Bible)" },
      { name: "Wechel Press", start: 1526, end: 1627, works: 1156, cities: "Paris → Frankfurt" },
      { name: "Steinmann Press", start: 1584, end: 1646, works: 2090, cities: "Erfurt, Jena, Leipzig" },
      { name: "Röhner Press", start: 1540, end: 1670, works: 1794, cities: "Jena, Wittenberg" },
      { name: "Henckel Press", start: 1610, end: 1698, works: 1743, cities: "Wittenberg" },
    ]
  },
  {
    name: "France",
    color: "#546b8a",
    printers: [
      { name: "Estienne Press", start: 1502, end: 1674, works: 1534, cities: "Paris, Geneva (Greek scholarship)" },
      { name: "Badius Ascensius", start: 1503, end: 1535, works: 1045, cities: "Paris (classical editions)" },
      { name: "Gryphe Press", start: 1524, end: 1556, works: 1289, cities: "Lyon" },
      { name: "Petit Press", start: 1495, end: 1612, works: 2011, cities: "Paris" },
    ]
  },
  {
    name: "Italy",
    color: "#8b9a7d",
    printers: [
      { name: "Aldine Press", start: 1494, end: 1597, works: 876, cities: "Venice (Aldus → Paolo → Aldus Jr.)" },
      { name: "Giunti Press", start: 1489, end: 1657, works: 1345, cities: "Venice, Florence, Lyon" },
      { name: "Ziletti Press", start: 1549, end: 1587, works: 734, cities: "Venice" },
      { name: "Vatican Press", start: 1587, end: 1700, works: 3516, cities: "Rome (Tipografia Vaticana)" },
    ]
  },
  {
    name: "Iberia",
    color: "#8b5cf6",
    printers: [
      { name: "Craesbeeck Press", start: 1597, end: 1700, works: 687, cities: "Lisbon, Coimbra" },
      { name: "Portonariis Press", start: 1551, end: 1617, works: 612, cities: "Salamanca" },
      { name: "Mey Press", start: 1574, end: 1612, works: 534, cities: "Valencia, Tarragona" },
    ]
  },
];

const START_YEAR = 1450;
const END_YEAR = 1720;
const YEAR_RANGE = END_YEAR - START_YEAR;

export default function PrintersTimeline() {
  const [selected, setSelected] = useState<{ region: string; printer: Printer } | null>(null);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const yearToPercent = (year: number) => ((year - START_YEAR) / YEAR_RANGE) * 100;

  const decades = [1450, 1500, 1550, 1600, 1650, 1700];

  return (
    <div style={{ background: '#fdfcf9', padding: '24px 0' }}>
      {/* Year axis */}
      <div style={{
        position: 'relative',
        height: '40px',
        marginBottom: '8px',
        marginLeft: '160px',
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
            {hoveredYear}
          </div>
        )}
      </div>

      {/* Regions and bars */}
      {data.map((region) => (
        <div key={region.name} style={{ marginBottom: '24px' }}>
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
              background: region.color,
              marginRight: '8px',
            }} />
            <span style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '16px',
              fontWeight: 600,
              color: '#1a1612',
            }}>
              {region.name}
            </span>
          </div>

          <div style={{ position: 'relative' }}>
            {region.printers.map((printer) => {
              const left = yearToPercent(printer.start);
              const width = yearToPercent(printer.end) - left;
              const isSelected = selected?.printer.name === printer.name;

              return (
                <div
                  key={printer.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '32px',
                    marginBottom: '4px',
                  }}
                >
                  <div style={{
                    width: '160px',
                    paddingRight: '12px',
                    textAlign: 'right',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: isSelected ? region.color : '#555',
                    fontWeight: isSelected ? 600 : 400,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {printer.name}
                  </div>

                  <div
                    style={{
                      flex: 1,
                      position: 'relative',
                      height: '100%',
                      marginRight: '24px',
                    }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percent = x / rect.width;
                      const year = Math.round(START_YEAR + percent * YEAR_RANGE);
                      setHoveredYear(year);
                    }}
                    onMouseLeave={() => setHoveredYear(null)}
                  >
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

                    <div
                      onClick={() => setSelected(isSelected ? null : { region: region.name, printer })}
                      style={{
                        position: 'absolute',
                        left: `${left}%`,
                        width: `${width}%`,
                        top: '4px',
                        height: '24px',
                        background: isSelected ? region.color : `${region.color}cc`,
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected ? `0 2px 8px ${region.color}66` : 'none',
                        border: isSelected ? '2px solid #1a1612' : '2px solid transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.transform = 'scaleY(1.15)';
                          e.currentTarget.style.background = region.color;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.transform = 'scaleY(1)';
                          e.currentTarget.style.background = `${region.color}cc`;
                        }
                      }}
                    >
                      <span style={{
                        fontSize: '11px',
                        fontFamily: 'Inter, sans-serif',
                        color: '#fff',
                        fontWeight: 600,
                        opacity: width > 10 ? 1 : 0,
                      }}>
                        {printer.works.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Selected printer detail */}
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
          maxWidth: '450px',
          width: 'calc(100% - 48px)',
          zIndex: 100,
          border: `3px solid ${data.find(r => r.name === selected.region)?.color}`,
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
                {selected.printer.name}
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: '#888',
                margin: '4px 0 0 0',
              }}>
                Active {selected.printer.start}–{selected.printer.end} ({selected.printer.end - selected.printer.start} years)
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
          }}>
            <div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '28px',
                fontWeight: 700,
                color: data.find(r => r.name === selected.region)?.color,
                margin: 0,
              }}>
                {selected.printer.works.toLocaleString()}
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                color: '#888',
                margin: '2px 0 0 0',
              }}>
                Latin works
              </p>
            </div>
            <div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#444',
                margin: 0,
              }}>
                <strong>Cities:</strong> {selected.printer.cities}
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#444',
                margin: '4px 0 0 0',
              }}>
                <strong>Region:</strong> {selected.region}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
