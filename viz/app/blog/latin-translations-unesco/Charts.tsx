"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, PieChart, Pie } from "recharts";

const TICK_STYLE = { fontSize: 11, fontFamily: 'Inter, sans-serif', fill: '#888' };
const TOOLTIP_STYLE = {
  fontFamily: 'Inter, sans-serif', fontSize: '13px',
  border: '1px solid #e8e4dc', borderRadius: '4px', background: '#fff',
};

const ERA_COLORS: Record<string, string> = {
  classical: '#546b8a', medieval: '#9e4a3a', renaissance: '#c9a86c',
  early_modern: '#8b9a7d', modern: '#7c6f9e',
};

export function CenturyChart({ data }: { data: { century: string; count: number }[] }) {
  const barColors = data.map(d => {
    const c = d.century;
    if (c.includes('BCE') || ['1c CE', '2c CE', '3c CE', '4c CE', '5c CE'].includes(c)) return ERA_COLORS.classical;
    if (['6c CE', '7c CE', '8c CE', '9c CE', '10c CE', '11c CE', '12c CE', '13c CE', '14c CE'].includes(c)) return ERA_COLORS.medieval;
    if (['15c CE', '16c CE'].includes(c)) return ERA_COLORS.renaissance;
    if (['17c CE', '18c CE'].includes(c)) return ERA_COLORS.early_modern;
    return ERA_COLORS.modern;
  });

  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8e4dc" vertical={false} />
          <XAxis dataKey="century" tick={TICK_STYLE} interval={0} angle={-45} textAnchor="end" height={60} />
          <YAxis tick={TICK_STYLE} />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Bar dataKey="count" radius={[2, 2, 0, 0]}>
            {data.map((_, i) => <Cell key={i} fill={barColors[i]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DecadeChart({ data }: { data: { decade: string; count: number; source: string }[] }) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8e4dc" vertical={false} />
          <XAxis dataKey="decade" tick={TICK_STYLE} interval={1} angle={-45} textAnchor="end" height={50} />
          <YAxis tick={TICK_STYLE} />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Bar dataKey="count" radius={[2, 2, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.source === 'historical' ? '#8b9a7d' : entry.source === 'unesco' ? '#9e4a3a' : '#c9a86c'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function YearChart({ data }: { data: { year: string; count: number; source: string }[] }) {
  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8e4dc" vertical={false} />
          <XAxis dataKey="year" tick={TICK_STYLE} interval={3} />
          <YAxis tick={TICK_STYLE} />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Bar dataKey="count" radius={[2, 2, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.source === 'unesco' ? '#9e4a3a' : '#c9a86c'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function EraStackChart() {
  const data = [
    { era: 'Classical', unique: 420, retranslations: 240 },
    { era: 'Medieval', unique: 738, retranslations: 124 },
    { era: 'Renaissance', unique: 307, retranslations: 59 },
    { era: 'Early Modern', unique: 305, retranslations: 55 },
    { era: 'Modern', unique: 267, retranslations: 46 },
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8e4dc" vertical={false} />
          <XAxis dataKey="era" tick={{ ...TICK_STYLE, fontSize: 12 }} />
          <YAxis tick={TICK_STYLE} />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Legend wrapperStyle={{ fontFamily: 'Inter, sans-serif', fontSize: '12px' }} />
          <Bar dataKey="unique" name="Unique works" stackId="a" fill="#9e4a3a" />
          <Bar dataKey="retranslations" name="Re-translations" stackId="a" fill="#d4cfc4" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CountryChart({ data }: { data: { country: string; count: number }[] }) {
  const colors = ['#546b8a', '#9e4a3a', '#c9a86c', '#8b9a7b', '#7c6f9e', '#5a8a7b', '#d4cfc4'];
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data} dataKey="count" nameKey="country"
            cx="50%" cy="50%" outerRadius={110}
            label={({ country, count }) => `${country} (${count})`}
            labelLine={true}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}
          >
            {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
          </Pie>
          <Tooltip contentStyle={TOOLTIP_STYLE} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
