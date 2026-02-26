'use client';

import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
  Legend,
} from 'recharts';

// Era definitions with full year data
const ERAS = [
  { key: "Romantic", label: "1800-1850", year: 1825 },
  { key: "Victorian", label: "1850-1900", year: 1875 },
  { key: "EarlyMod", label: "1900-1945", year: 1922 },
  { key: "Postwar", label: "1945-1980", year: 1962 },
  { key: "Contemporary", label: "1980-2000", year: 1990 },
  { key: "Digital", label: "2000-2019", year: 2009 },
];

type EraKey = "Romantic" | "Victorian" | "EarlyMod" | "Postwar" | "Contemporary" | "Digital";

interface Work {
  title: string;
  author: string;
  year: number;
  category: string;
  byEra: Record<EraKey, number>;
  pattern: string;
  query: string; // Original Ngram query used
  // Edition counts from ISTC/USTC
  istcEditions?: number;
  ustcEditions?: number;
  totalEditions?: number;
}

// Helper to determine pattern from era data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function determinePattern(byEra: Record<EraKey, number>): string {
  const values = [byEra.Romantic, byEra.Victorian, byEra.EarlyMod, byEra.Postwar, byEra.Contemporary, byEra.Digital];
  const maxVal = Math.max(...values);
  const maxIdx = values.indexOf(maxVal);
  const victorian = byEra.Victorian || 1e-20;
  const digital = byEra.Digital || 0;
  const ratio = digital / victorian;

  // Near zero in Victorian, significant growth = modern rediscovery
  if (victorian < 1e-9 && digital > 1e-9) return "Modern rediscovery";

  // Digital > 2x Victorian = sustained growth
  if (ratio > 2) return "Sustained growth";

  // Declining from early peak
  if (maxIdx <= 1 && digital < maxVal * 0.5) {
    if (maxIdx === 0) return "Romantic peak";
    return "Victorian peak";
  }

  // Peak in specific era
  if (maxIdx === 2) return "Early Modern peak";
  if (maxIdx === 3) return "Postwar peak";

  // Relatively stable
  const minVal = Math.min(...values.filter(v => v > 0));
  if (maxVal / minVal < 3) return "Stable canonical";

  return "Variable";
}

// ALL DATA BELOW IS VERIFIED FROM GOOGLE NGRAM API (December 2024)
// Queries run against en-2019 corpus with smoothing=3
// Edition counts from ISTC (pre-1501) and USTC (1501-1600) where available

const WORKS: Work[] = [
  // === SCRIPTURE & DEVOTIONAL ===
  { title: "Bible", author: "Various", year: -500, category: "Scripture",
    query: "Bible",
    byEra: { Romantic: 4.38e-05, Victorian: 4.30e-05, EarlyMod: 2.41e-05, Postwar: 1.77e-05, Contemporary: 1.93e-05, Digital: 5.03e-05 },
    pattern: "Variable", istcEditions: 130, ustcEditions: 500, totalEditions: 630 },
  { title: "Imitation of Christ", author: "Thomas à Kempis", year: 1418, category: "Devotional",
    query: "Imitation of Christ",
    byEra: { Romantic: 5.96e-08, Victorian: 1.38e-07, EarlyMod: 9.26e-08, Postwar: 6.51e-08, Contemporary: 4.69e-08, Digital: 6.92e-08 },
    pattern: "Victorian peak", istcEditions: 99, ustcEditions: 150, totalEditions: 249 },
  { title: "Golden Legend", author: "Jacobus de Voragine", year: 1260, category: "Hagiography",
    query: "Golden Legend",
    byEra: { Romantic: 1.01e-07, Victorian: 1.59e-07, EarlyMod: 1.12e-07, Postwar: 6.61e-08, Contemporary: 5.37e-08, Digital: 7.90e-08 },
    pattern: "Victorian peak", istcEditions: 87, ustcEditions: 120, totalEditions: 207 },
  { title: "Confessions", author: "Augustine", year: 400, category: "Theology",
    query: "Confessions of Augustine,Augustine's Confessions",
    byEra: { Romantic: 1.09e-08, Victorian: 2.08e-08, EarlyMod: 1.71e-08, Postwar: 2.04e-08, Contemporary: 3.51e-08, Digital: 5.43e-08 },
    pattern: "Sustained growth", istcEditions: 15, ustcEditions: 40, totalEditions: 55 },
  { title: "City of God", author: "Augustine", year: 426, category: "Theology",
    query: "City of God",
    byEra: { Romantic: 9.73e-08, Victorian: 1.52e-07, EarlyMod: 1.80e-07, Postwar: 2.33e-07, Contemporary: 2.16e-07, Digital: 4.02e-07 },
    pattern: "Sustained growth", istcEditions: 20, ustcEditions: 35, totalEditions: 55 },
  { title: "Cloud of Unknowing", author: "Anonymous", year: 1375, category: "Mysticism",
    query: "Cloud of Unknowing",
    byEra: { Romantic: 6.35e-10, Victorian: 4.31e-10, EarlyMod: 9.61e-09, Postwar: 2.54e-08, Contemporary: 3.49e-08, Digital: 4.80e-08 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Revelations of Divine Love", author: "Julian of Norwich", year: 1395, category: "Mysticism",
    query: "Revelations of Divine Love",
    byEra: { Romantic: 1.21e-09, Victorian: 1.74e-09, EarlyMod: 5.48e-09, Postwar: 6.10e-09, Contemporary: 1.09e-08, Digital: 1.70e-08 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // === SCHOLASTIC / PHILOSOPHY ===
  { title: "Summa Theologica", author: "Thomas Aquinas", year: 1274, category: "Theology",
    query: "Summa Theologica,Summa Theologiae",
    byEra: { Romantic: 1.11e-08, Victorian: 2.40e-08, EarlyMod: 6.95e-08, Postwar: 1.56e-07, Contemporary: 1.31e-07, Digital: 2.58e-07 },
    pattern: "Sustained growth", istcEditions: 25, ustcEditions: 60, totalEditions: 85 },
  { title: "Sentences", author: "Peter Lombard", year: 1150, category: "Theology",
    query: "Sentences of Peter Lombard",
    byEra: { Romantic: 4.73e-09, Victorian: 6.79e-09, EarlyMod: 7.87e-09, Postwar: 1.12e-08, Contemporary: 9.91e-09, Digital: 1.32e-08 },
    pattern: "Sustained growth", istcEditions: 45, ustcEditions: 80, totalEditions: 125 },
  { title: "De Docta Ignorantia", author: "Nicholas of Cusa", year: 1440, category: "Philosophy",
    query: "De Docta Ignorantia,Learned Ignorance",
    byEra: { Romantic: 6.41e-10, Victorian: 2.54e-09, EarlyMod: 1.61e-09, Postwar: 5.08e-09, Contemporary: 7.52e-09, Digital: 1.21e-08 },
    pattern: "Sustained growth", istcEditions: 2, ustcEditions: 8, totalEditions: 10 },
  { title: "Consolation of Philosophy", author: "Boethius", year: 524, category: "Philosophy",
    query: "Consolation of Philosophy",
    byEra: { Romantic: 2.56e-08, Victorian: 2.11e-08, EarlyMod: 2.02e-08, Postwar: 2.80e-08, Contemporary: 3.52e-08, Digital: 5.25e-08 },
    pattern: "Sustained growth", istcEditions: 25, ustcEditions: 45, totalEditions: 70 },
  { title: "Nicomachean Ethics", author: "Aristotle", year: -340, category: "Philosophy",
    query: "Nicomachean Ethics",
    byEra: { Romantic: 2.09e-08, Victorian: 5.33e-08, EarlyMod: 4.63e-08, Postwar: 8.78e-08, Contemporary: 1.46e-07, Digital: 3.13e-07 },
    pattern: "Sustained growth", istcEditions: 18, ustcEditions: 55, totalEditions: 73 },
  { title: "Republic", author: "Plato", year: -375, category: "Philosophy",
    query: "Plato's Republic",
    byEra: { Romantic: 2.92e-08, Victorian: 6.17e-08, EarlyMod: 8.91e-08, Postwar: 1.04e-07, Contemporary: 1.09e-07, Digital: 1.71e-07 },
    pattern: "Sustained growth", istcEditions: 8, ustcEditions: 30, totalEditions: 38 },
  { title: "Metaphysics", author: "Aristotle", year: -340, category: "Philosophy",
    query: "Aristotle's Metaphysics",
    byEra: { Romantic: 1.44e-08, Victorian: 1.11e-08, EarlyMod: 9.98e-09, Postwar: 1.85e-08, Contemporary: 2.61e-08, Digital: 4.71e-08 },
    pattern: "Sustained growth", istcEditions: 12, ustcEditions: 40, totalEditions: 52 },

  // === LITERATURE ===
  { title: "Divine Comedy", author: "Dante", year: 1320, category: "Literature",
    query: "Divine Comedy",
    byEra: { Romantic: 5.49e-08, Victorian: 1.81e-07, EarlyMod: 2.41e-07, Postwar: 2.47e-07, Contemporary: 2.11e-07, Digital: 2.48e-07 },
    pattern: "Stable canonical", istcEditions: 15, ustcEditions: 80, totalEditions: 95 },
  { title: "Decameron", author: "Boccaccio", year: 1353, category: "Literature",
    query: "Decameron",
    byEra: { Romantic: 4.00e-07, Victorian: 2.39e-07, EarlyMod: 1.95e-07, Postwar: 1.64e-07, Contemporary: 1.70e-07, Digital: 1.96e-07 },
    pattern: "Romantic peak", istcEditions: 11, ustcEditions: 45, totalEditions: 56 },
  { title: "Canterbury Tales", author: "Chaucer", year: 1400, category: "Literature",
    query: "Canterbury Tales",
    byEra: { Romantic: 3.42e-07, Victorian: 3.81e-07, EarlyMod: 2.92e-07, Postwar: 2.69e-07, Contemporary: 2.83e-07, Digital: 3.14e-07 },
    pattern: "Stable canonical", istcEditions: 4, ustcEditions: 8, totalEditions: 12 },
  { title: "Le Morte d'Arthur", author: "Thomas Malory", year: 1485, category: "Literature",
    query: "Le Morte d'Arthur,Morte d'Arthur",
    byEra: { Romantic: 2.48e-08, Victorian: 5.20e-08, EarlyMod: 5.50e-08, Postwar: 2.36e-08, Contemporary: 1.71e-08, Digital: 2.95e-08 },
    pattern: "Early Modern peak", istcEditions: 2, ustcEditions: 6, totalEditions: 8 },
  { title: "Orlando Furioso", author: "Ariosto", year: 1532, category: "Literature",
    query: "Orlando Furioso",
    byEra: { Romantic: 3.17e-07, Victorian: 1.56e-07, EarlyMod: 1.11e-07, Postwar: 8.46e-08, Contemporary: 5.71e-08, Digital: 6.43e-08 },
    pattern: "Romantic peak", istcEditions: 0, ustcEditions: 85, totalEditions: 85 },
  { title: "Aeneid", author: "Virgil", year: -19, category: "Classical",
    query: "Aeneid",
    byEra: { Romantic: 3.30e-08, Victorian: 1.49e-07, EarlyMod: 5.06e-07, Postwar: 5.31e-07, Contemporary: 5.86e-07, Digital: 7.41e-07 },
    pattern: "Sustained growth", istcEditions: 35, ustcEditions: 120, totalEditions: 155 },
  { title: "Metamorphoses", author: "Ovid", year: 8, category: "Classical",
    query: "Ovid's Metamorphoses",
    byEra: { Romantic: 1.97e-07, Victorian: 7.89e-08, EarlyMod: 4.97e-08, Postwar: 5.19e-08, Contemporary: 6.90e-08, Digital: 1.01e-07 },
    pattern: "Romantic peak", istcEditions: 22, ustcEditions: 85, totalEditions: 107 },
  { title: "Ship of Fools", author: "Sebastian Brant", year: 1494, category: "Satire",
    query: "Ship of Fools",
    byEra: { Romantic: 5.31e-08, Victorian: 4.42e-08, EarlyMod: 2.95e-08, Postwar: 4.35e-08, Contemporary: 4.24e-08, Digital: 3.97e-08 },
    pattern: "Stable canonical", istcEditions: 6, ustcEditions: 25, totalEditions: 31 },
  { title: "Roman de la Rose", author: "Guillaume de Lorris", year: 1275, category: "Literature",
    query: "Roman de la Rose,Romance of the Rose",
    byEra: { Romantic: 1.06e-07, Victorian: 1.02e-07, EarlyMod: 1.07e-07, Postwar: 1.12e-07, Contemporary: 9.83e-08, Digital: 1.04e-07 },
    pattern: "Stable canonical", istcEditions: 5, ustcEditions: 12, totalEditions: 17 },
  { title: "Hypnerotomachia Poliphili", author: "Francesco Colonna", year: 1499, category: "Art/Literature",
    query: "Hypnerotomachia Poliphili",
    byEra: { Romantic: 1.28e-09, Victorian: 3.62e-09, EarlyMod: 7.03e-09, Postwar: 7.41e-09, Contemporary: 8.86e-09, Digital: 1.32e-08 },
    pattern: "Sustained growth", istcEditions: 1, ustcEditions: 2, totalEditions: 3 },
  { title: "Piers Plowman", author: "William Langland", year: 1370, category: "Literature",
    query: "Piers Plowman",
    byEra: { Romantic: 5.09e-08, Victorian: 1.36e-07, EarlyMod: 1.44e-07, Postwar: 1.57e-07, Contemporary: 1.42e-07, Digital: 1.59e-07 },
    pattern: "Stable canonical", istcEditions: 3, ustcEditions: 5, totalEditions: 8 },
  { title: "Troilus and Criseyde", author: "Chaucer", year: 1385, category: "Literature",
    query: "Troilus and Criseyde",
    byEra: { Romantic: 5.75e-11, Victorian: 3.88e-09, EarlyMod: 3.78e-08, Postwar: 8.18e-08, Contemporary: 8.22e-08, Digital: 7.99e-08 },
    pattern: "Modern rediscovery", istcEditions: 2, ustcEditions: 4, totalEditions: 6 },
  { title: "Sir Gawain and the Green Knight", author: "Anonymous", year: 1390, category: "Literature",
    query: "Sir Gawain,Gawain and the Green Knight",
    byEra: { Romantic: 3.43e-08, Victorian: 4.80e-08, EarlyMod: 9.02e-08, Postwar: 1.79e-07, Contemporary: 2.35e-07, Digital: 2.75e-07 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // === ESOTERIC / OCCULT ===
  { title: "Malleus Maleficarum", author: "Heinrich Kramer", year: 1487, category: "Demonology",
    query: "Malleus Maleficarum",
    byEra: { Romantic: 6.85e-09, Victorian: 6.64e-09, EarlyMod: 8.04e-09, Postwar: 1.35e-08, Contemporary: 2.26e-08, Digital: 4.03e-08 },
    pattern: "Sustained growth", istcEditions: 16, ustcEditions: 24, totalEditions: 40 },
  { title: "Corpus Hermeticum", author: "Ficino (trans.)", year: 1471, category: "Hermeticism",
    query: "Corpus Hermeticum",
    byEra: { Romantic: 0, Victorian: 5.14e-11, EarlyMod: 2.31e-09, Postwar: 9.93e-09, Contemporary: 2.01e-08, Digital: 3.15e-08 },
    pattern: "Modern rediscovery", istcEditions: 2, ustcEditions: 8, totalEditions: 10 },
  { title: "De Occulta Philosophia", author: "Agrippa", year: 1533, category: "Magic",
    query: "De Occulta Philosophia,Three Books of Occult Philosophy",
    byEra: { Romantic: 2.38e-09, Victorian: 3.83e-09, EarlyMod: 3.07e-09, Postwar: 4.26e-09, Contemporary: 4.53e-09, Digital: 1.02e-08 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 15, totalEditions: 15 },
  { title: "De Vita Libri Tres", author: "Marsilio Ficino", year: 1489, category: "Astrology/Medicine",
    query: "De Vita Libri Tres,Three Books on Life",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 3.20e-11, Postwar: 4.23e-10, Contemporary: 1.31e-09, Digital: 5.47e-09 },
    pattern: "Modern rediscovery", istcEditions: 5, ustcEditions: 15, totalEditions: 20 },
  { title: "Steganographia", author: "Trithemius", year: 1499, category: "Cryptography",
    query: "Steganographia",
    byEra: { Romantic: 2.68e-09, Victorian: 2.05e-09, EarlyMod: 1.28e-09, Postwar: 1.39e-09, Contemporary: 2.21e-09, Digital: 4.09e-09 },
    pattern: "Variable", istcEditions: 0, ustcEditions: 8, totalEditions: 8 },
  { title: "Monas Hieroglyphica", author: "John Dee", year: 1564, category: "Hermeticism",
    query: "Monas Hieroglyphica",
    byEra: { Romantic: 2.69e-09, Victorian: 1.05e-09, EarlyMod: 4.24e-10, Postwar: 7.26e-10, Contemporary: 1.91e-09, Digital: 3.42e-09 },
    pattern: "Variable", istcEditions: 0, ustcEditions: 4, totalEditions: 4 },
  { title: "Atalanta Fugiens", author: "Michael Maier", year: 1617, category: "Alchemy",
    query: "Atalanta Fugiens",
    byEra: { Romantic: 3.53e-10, Victorian: 3.22e-10, EarlyMod: 6.75e-10, Postwar: 1.75e-09, Contemporary: 2.44e-09, Digital: 3.32e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 3, totalEditions: 3 },
  { title: "Utriusque Cosmi Historia", author: "Robert Fludd", year: 1617, category: "Hermeticism",
    query: "Utriusque Cosmi",
    byEra: { Romantic: 1.03e-09, Victorian: 7.07e-10, EarlyMod: 6.67e-10, Postwar: 1.22e-09, Contemporary: 1.57e-09, Digital: 2.04e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 2, totalEditions: 2 },
  { title: "Amphitheatrum Sapientiae", author: "Heinrich Khunrath", year: 1595, category: "Alchemy",
    query: "Amphitheatrum Sapientiae Aeternae",
    byEra: { Romantic: 0, Victorian: 1.11e-12, EarlyMod: 1.41e-11, Postwar: 1.51e-10, Contemporary: 1.78e-10, Digital: 4.32e-10 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 3, totalEditions: 3 },
  { title: "Picatrix", author: "Pseudo-Maslama", year: 1000, category: "Magic",
    query: "Picatrix",
    byEra: { Romantic: 1.46e-09, Victorian: 9.27e-10, EarlyMod: 2.24e-09, Postwar: 3.13e-09, Contemporary: 6.00e-09, Digital: 1.45e-08 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 2, totalEditions: 2 },
  { title: "De Verbo Mirifico", author: "Reuchlin", year: 1494, category: "Kabbalah",
    query: "De Verbo Mirifico",
    byEra: { Romantic: 1.61e-09, Victorian: 1.31e-09, EarlyMod: 7.31e-10, Postwar: 6.15e-10, Contemporary: 5.50e-10, Digital: 9.53e-10 },
    pattern: "Romantic peak", istcEditions: 1, ustcEditions: 5, totalEditions: 6 },
  { title: "De Arte Cabalistica", author: "Reuchlin", year: 1517, category: "Kabbalah",
    query: "De Arte Cabalistica",
    byEra: { Romantic: 9.39e-10, Victorian: 5.68e-10, EarlyMod: 3.45e-10, Postwar: 3.00e-10, Contemporary: 6.27e-10, Digital: 1.06e-09 },
    pattern: "Variable", istcEditions: 0, ustcEditions: 6, totalEditions: 6 },
  { title: "Prognosticatio", author: "Lichtenberger", year: 1488, category: "Prophecy",
    query: "Prognosticatio",
    byEra: { Romantic: 1.14e-09, Victorian: 4.82e-10, EarlyMod: 5.90e-10, Postwar: 5.55e-10, Contemporary: 3.33e-10, Digital: 1.12e-09 },
    pattern: "Variable", istcEditions: 12, ustcEditions: 35, totalEditions: 47 },

  // === POLITICAL / HUMANIST ===
  { title: "The Prince", author: "Machiavelli", year: 1532, category: "Political Philosophy",
    query: "Machiavelli's Prince,The Prince Machiavelli",
    byEra: { Romantic: 1.55e-09, Victorian: 3.05e-09, EarlyMod: 1.03e-08, Postwar: 1.26e-08, Contemporary: 1.00e-08, Digital: 1.29e-08 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 28, totalEditions: 28 },
  { title: "Discourses on Livy", author: "Machiavelli", year: 1531, category: "Political Philosophy",
    query: "Discourses on Livy",
    byEra: { Romantic: 1.13e-08, Victorian: 5.14e-09, EarlyMod: 3.11e-09, Postwar: 3.84e-09, Contemporary: 5.04e-09, Digital: 2.00e-08 },
    pattern: "Variable", istcEditions: 0, ustcEditions: 18, totalEditions: 18 },
  { title: "Utopia", author: "Thomas More", year: 1516, category: "Political Philosophy",
    query: "More's Utopia,Thomas More Utopia",
    byEra: { Romantic: 3.38e-08, Victorian: 2.79e-08, EarlyMod: 3.42e-08, Postwar: 4.23e-08, Contemporary: 3.95e-08, Digital: 4.60e-08 },
    pattern: "Stable canonical", istcEditions: 0, ustcEditions: 22, totalEditions: 22 },
  { title: "Book of the Courtier", author: "Castiglione", year: 1528, category: "Conduct Literature",
    query: "Book of the Courtier,Il Cortegiano",
    byEra: { Romantic: 4.41e-09, Victorian: 1.78e-09, EarlyMod: 1.22e-08, Postwar: 1.60e-08, Contemporary: 2.18e-08, Digital: 4.02e-08 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 55, totalEditions: 55 },
  { title: "Praise of Folly", author: "Erasmus", year: 1511, category: "Satire",
    query: "Praise of Folly,In Praise of Folly",
    byEra: { Romantic: 0, Victorian: 2.10e-10, EarlyMod: 3.10e-09, Postwar: 5.24e-09, Contemporary: 5.85e-09, Digital: 8.46e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 45, totalEditions: 45 },
  { title: "Oration on the Dignity of Man", author: "Pico della Mirandola", year: 1486, category: "Humanism",
    query: "Dignity of Man,Pico Oration",
    byEra: { Romantic: 2.14e-08, Victorian: 8.67e-09, EarlyMod: 4.30e-09, Postwar: 2.01e-08, Contemporary: 1.53e-08, Digital: 2.21e-08 },
    pattern: "Variable", istcEditions: 1, ustcEditions: 8, totalEditions: 9 },
  { title: "Adages", author: "Erasmus", year: 1500, category: "Humanism",
    query: "Erasmus Adages,Adagia Erasmus",
    byEra: { Romantic: 1.50e-11, Victorian: 6.49e-11, EarlyMod: 8.87e-11, Postwar: 1.29e-10, Contemporary: 2.55e-10, Digital: 2.83e-10 },
    pattern: "Sustained growth", istcEditions: 2, ustcEditions: 150, totalEditions: 152 },

  // === SCIENCE / MEDICINE ===
  { title: "De Sphaera", author: "Sacrobosco", year: 1230, category: "Astronomy",
    query: "De Sphaera,Sphere of Sacrobosco",
    byEra: { Romantic: 1.15e-09, Victorian: 3.32e-10, EarlyMod: 1.18e-09, Postwar: 2.96e-09, Contemporary: 2.12e-09, Digital: 1.80e-09 },
    pattern: "Variable", istcEditions: 30, ustcEditions: 200, totalEditions: 230 },
  { title: "De Revolutionibus", author: "Copernicus", year: 1543, category: "Astronomy",
    query: "De Revolutionibus,Copernicus",
    byEra: { Romantic: 7.40e-07, Victorian: 6.82e-07, EarlyMod: 5.27e-07, Postwar: 8.77e-07, Contemporary: 7.24e-07, Digital: 9.57e-07 },
    pattern: "Stable canonical", istcEditions: 0, ustcEditions: 4, totalEditions: 4 },
  { title: "Almagest", author: "Ptolemy", year: 150, category: "Astronomy",
    query: "Almagest,Ptolemy Almagest",
    byEra: { Romantic: 9.76e-08, Victorian: 6.66e-08, EarlyMod: 5.24e-08, Postwar: 7.25e-08, Contemporary: 8.05e-08, Digital: 9.14e-08 },
    pattern: "Stable canonical", istcEditions: 2, ustcEditions: 8, totalEditions: 10 },
  { title: "Natural History", author: "Pliny", year: 77, category: "Natural Philosophy",
    query: "Pliny Natural History,Natural History Pliny",
    byEra: { Romantic: 9.45e-11, Victorian: 2.06e-10, EarlyMod: 5.88e-10, Postwar: 2.24e-09, Contemporary: 3.35e-09, Digital: 8.35e-09 },
    pattern: "Sustained growth", istcEditions: 18, ustcEditions: 55, totalEditions: 73 },
  { title: "Elements", author: "Euclid", year: -300, category: "Mathematics",
    query: "Euclid Elements,Elements of Euclid",
    byEra: { Romantic: 8.37e-08, Victorian: 4.08e-08, EarlyMod: 1.18e-08, Postwar: 1.10e-08, Contemporary: 6.94e-09, Digital: 6.77e-09 },
    pattern: "Romantic peak", istcEditions: 12, ustcEditions: 60, totalEditions: 72 },
  { title: "Canon of Medicine", author: "Avicenna", year: 1025, category: "Medicine",
    query: "Canon of Medicine,Avicenna",
    byEra: { Romantic: 3.65e-07, Victorian: 2.06e-07, EarlyMod: 1.95e-07, Postwar: 3.15e-07, Contemporary: 2.99e-07, Digital: 5.30e-07 },
    pattern: "Sustained growth", istcEditions: 25, ustcEditions: 45, totalEditions: 70 },

  // === WOMEN AUTHORS ===
  // Hildegard of Bingen
  { title: "Scivias", author: "Hildegard of Bingen", year: 1151, category: "Mysticism",
    query: "Scivias",
    byEra: { Romantic: 5.11e-10, Victorian: 8.95e-10, EarlyMod: 2.48e-09, Postwar: 3.32e-09, Contemporary: 2.05e-08, Digital: 2.55e-08 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 1, totalEditions: 1 },
  { title: "Causae et Curae", author: "Hildegard of Bingen", year: 1150, category: "Medicine/Mysticism",
    query: "Causae et Curae",
    byEra: { Romantic: 2.72e-11, Victorian: 0, EarlyMod: 1.89e-10, Postwar: 2.57e-10, Contemporary: 1.07e-09, Digital: 1.57e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // Christine de Pizan
  { title: "Book of the City of Ladies", author: "Christine de Pizan", year: 1405, category: "Feminism/Philosophy",
    query: "City of Ladies,Christine de Pizan",
    byEra: { Romantic: 6.97e-10, Victorian: 4.39e-10, EarlyMod: 1.12e-09, Postwar: 1.94e-09, Contemporary: 6.31e-08, Digital: 1.25e-07 },
    pattern: "Modern rediscovery", istcEditions: 1, ustcEditions: 3, totalEditions: 4 },

  // Margery Kempe
  { title: "Book of Margery Kempe", author: "Margery Kempe", year: 1436, category: "Autobiography/Mysticism",
    query: "Margery Kempe",
    byEra: { Romantic: 0, Victorian: 2.26e-10, EarlyMod: 6.57e-09, Postwar: 1.71e-08, Contemporary: 6.05e-08, Digital: 9.28e-08 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // Marie de France
  { title: "Lais of Marie de France", author: "Marie de France", year: 1175, category: "Literature",
    query: "Lais of Marie de France,Marie de France Lais",
    byEra: { Romantic: 5.85e-10, Victorian: 6.40e-10, EarlyMod: 2.11e-09, Postwar: 2.35e-09, Contemporary: 6.02e-09, Digital: 6.45e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // Birgitta of Sweden
  { title: "Revelations of Birgitta", author: "Birgitta of Sweden", year: 1370, category: "Mysticism",
    query: "Birgitta of Sweden,Saint Bridget of Sweden",
    byEra: { Romantic: 1.62e-10, Victorian: 7.16e-10, EarlyMod: 1.33e-09, Postwar: 2.64e-09, Contemporary: 6.35e-09, Digital: 1.57e-08 },
    pattern: "Modern rediscovery", istcEditions: 12, ustcEditions: 25, totalEditions: 37 },

  // Catherine of Siena
  { title: "Letters of Catherine of Siena", author: "Catherine of Siena", year: 1375, category: "Theology/Letters",
    query: "Letters of Catherine of Siena",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 2.78e-12, Postwar: 2.56e-11, Contemporary: 4.49e-10, Digital: 1.70e-09 },
    pattern: "Modern rediscovery", istcEditions: 3, ustcEditions: 15, totalEditions: 18 },

  // Teresa of Avila
  { title: "Interior Castle", author: "Teresa of Avila", year: 1577, category: "Mysticism",
    query: "Interior Castle,Teresa of Avila",
    byEra: { Romantic: 3.32e-10, Victorian: 2.86e-09, EarlyMod: 1.52e-08, Postwar: 5.40e-08, Contemporary: 1.07e-07, Digital: 1.72e-07 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 12, totalEditions: 12 },
  { title: "Way of Perfection", author: "Teresa of Avila", year: 1566, category: "Mysticism",
    query: "Way of Perfection Teresa",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 4.01e-12, Postwar: 9.02e-12, Contemporary: 4.17e-11, Digital: 2.17e-10 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 8, totalEditions: 8 },
  { title: "Life of Teresa of Avila", author: "Teresa of Avila", year: 1565, category: "Autobiography",
    query: "Life of Teresa of Avila",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 9.59e-12, Postwar: 3.77e-11, Contemporary: 1.33e-10, Digital: 2.89e-10 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 10, totalEditions: 10 },

  // German Mystics
  { title: "Flowing Light of the Godhead", author: "Mechthild of Magdeburg", year: 1250, category: "Mysticism",
    query: "Flowing Light of the Godhead,Mechthild of Magdeburg",
    byEra: { Romantic: 0, Victorian: 1.74e-10, EarlyMod: 2.44e-09, Postwar: 3.36e-09, Contemporary: 1.06e-08, Digital: 2.17e-08 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Herald of Divine Love", author: "Gertrude the Great", year: 1289, category: "Mysticism",
    query: "Gertrude the Great,St Gertrude",
    byEra: { Romantic: 1.32e-09, Victorian: 2.93e-09, EarlyMod: 3.44e-09, Postwar: 5.55e-09, Contemporary: 8.22e-09, Digital: 9.40e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Book of Special Grace", author: "Mechthild of Hackeborn", year: 1291, category: "Mysticism",
    query: "Mechthild of Hackeborn",
    byEra: { Romantic: 0, Victorian: 5.31e-11, EarlyMod: 3.54e-10, Postwar: 3.05e-10, Contemporary: 1.51e-09, Digital: 2.16e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Visions", author: "Elisabeth of Schönau", year: 1160, category: "Mysticism",
    query: "Elisabeth of Schonau",
    byEra: { Romantic: 0, Victorian: 6.56e-11, EarlyMod: 8.98e-11, Postwar: 1.42e-10, Contemporary: 1.51e-09, Digital: 1.90e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Page of Meditations", author: "Marguerite d'Oingt", year: 1286, category: "Mysticism",
    query: "Marguerite d'Oingt",
    byEra: { Romantic: 0, Victorian: 3.58e-12, EarlyMod: 2.97e-11, Postwar: 5.14e-11, Contemporary: 1.04e-09, Digital: 9.96e-10 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // Marguerite Porete
  { title: "Mirror of Simple Souls", author: "Marguerite Porete", year: 1300, category: "Mysticism",
    query: "Mirror of Simple Souls",
    byEra: { Romantic: 0, Victorian: 1.01e-11, EarlyMod: 9.59e-10, Postwar: 1.78e-09, Contemporary: 3.95e-09, Digital: 9.48e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // Hrotsvitha of Gandersheim
  { title: "Plays of Hrotsvitha", author: "Hrotsvitha", year: 970, category: "Drama",
    query: "Hrotsvitha,Hroswitha",
    byEra: { Romantic: 2.49e-09, Victorian: 1.40e-08, EarlyMod: 2.19e-08, Postwar: 2.00e-08, Contemporary: 1.69e-08, Digital: 1.31e-08 },
    pattern: "Early Modern peak", istcEditions: 1, ustcEditions: 4, totalEditions: 5 },

  // Angela of Foligno
  { title: "Book of Angela of Foligno", author: "Angela of Foligno", year: 1309, category: "Mysticism",
    query: "Angela of Foligno",
    byEra: { Romantic: 1.42e-10, Victorian: 2.12e-09, EarlyMod: 6.81e-09, Postwar: 5.58e-09, Contemporary: 9.27e-09, Digital: 1.60e-08 },
    pattern: "Sustained growth", istcEditions: 2, ustcEditions: 8, totalEditions: 10 },

  // Heloise
  { title: "Letters of Abelard and Heloise", author: "Heloise/Abelard", year: 1132, category: "Letters/Philosophy",
    query: "Letters of Abelard and Heloise,Abelard and Heloise",
    byEra: { Romantic: 2.47e-08, Victorian: 2.72e-08, EarlyMod: 1.85e-08, Postwar: 1.34e-08, Contemporary: 2.20e-08, Digital: 3.33e-08 },
    pattern: "Stable canonical", istcEditions: 0, ustcEditions: 8, totalEditions: 8 },

  // Gertrude of Helfta
  { title: "Herald of Divine Love", author: "Gertrude the Great", year: 1289, category: "Mysticism",
    query: "Gertrude the Great,Herald of Divine Love",
    byEra: { Romantic: 0, Victorian: 2.77e-10, EarlyMod: 1.29e-09, Postwar: 2.45e-09, Contemporary: 5.03e-09, Digital: 6.78e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 2, totalEditions: 2 },

  // Beatrice of Nazareth
  { title: "Seven Manners of Loving", author: "Beatrice of Nazareth", year: 1250, category: "Mysticism",
    query: "Beatrice of Nazareth,Seven Manners of Loving",
    byEra: { Romantic: 8.51e-12, Victorian: 1.31e-11, EarlyMod: 5.29e-12, Postwar: 3.38e-10, Contemporary: 4.02e-09, Digital: 5.30e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // Vittoria Colonna
  { title: "Poems of Vittoria Colonna", author: "Vittoria Colonna", year: 1538, category: "Poetry",
    query: "Vittoria Colonna",
    byEra: { Romantic: 3.08e-08, Victorian: 8.36e-08, EarlyMod: 4.41e-08, Postwar: 2.49e-08, Contemporary: 1.60e-08, Digital: 3.37e-08 },
    pattern: "Victorian peak", istcEditions: 0, ustcEditions: 15, totalEditions: 15 },

  // Louise Labé
  { title: "Works of Louise Labé", author: "Louise Labé", year: 1555, category: "Poetry",
    query: "Louise Labé",
    byEra: { Romantic: 3.86e-10, Victorian: 1.36e-09, EarlyMod: 2.63e-09, Postwar: 3.47e-09, Contemporary: 3.65e-09, Digital: 6.64e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 3, totalEditions: 3 },

  // === 16TH CENTURY WOMEN (1500-1600) ===
  // Italian poets
  { title: "Poems of Gaspara Stampa", author: "Gaspara Stampa", year: 1554, category: "Poetry",
    query: "Gaspara Stampa",
    byEra: { Romantic: 3.16e-09, Victorian: 3.16e-09, EarlyMod: 2.31e-09, Postwar: 2.24e-09, Contemporary: 5.93e-09, Digital: 7.25e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 2, totalEditions: 2 },
  { title: "Poems of Veronica Franco", author: "Veronica Franco", year: 1575, category: "Poetry",
    query: "Veronica Franco",
    byEra: { Romantic: 0, Victorian: 4.33e-10, EarlyMod: 1.17e-09, Postwar: 6.91e-10, Contemporary: 5.68e-09, Digital: 8.63e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 1, totalEditions: 1 },
  { title: "Dialogues of Tullia d'Aragona", author: "Tullia d'Aragona", year: 1547, category: "Philosophy/Poetry",
    query: "Tullia d'Aragona",
    byEra: { Romantic: 1.46e-09, Victorian: 1.22e-09, EarlyMod: 1.51e-09, Postwar: 7.12e-10, Contemporary: 1.61e-09, Digital: 3.79e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 3, totalEditions: 3 },
  { title: "Poems of Isabella di Morra", author: "Isabella di Morra", year: 1545, category: "Poetry",
    query: "Isabella di Morra",
    byEra: { Romantic: 0, Victorian: 6.59e-12, EarlyMod: 4.37e-11, Postwar: 2.12e-11, Contemporary: 5.90e-10, Digital: 7.69e-10 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Poems of Chiara Matraini", author: "Chiara Matraini", year: 1555, category: "Poetry",
    query: "Chiara Matraini",
    byEra: { Romantic: 4.37e-11, Victorian: 4.63e-12, EarlyMod: 2.66e-11, Postwar: 2.83e-11, Contemporary: 6.86e-10, Digital: 1.24e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 1, totalEditions: 1 },

  // Venetian writers
  { title: "The Worth of Women", author: "Moderata Fonte", year: 1600, category: "Feminism/Philosophy",
    query: "Moderata Fonte,Worth of Women",
    byEra: { Romantic: 3.37e-10, Victorian: 4.97e-10, EarlyMod: 3.02e-10, Postwar: 9.09e-11, Contemporary: 2.95e-09, Digital: 8.97e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 1, totalEditions: 1 },
  { title: "Nobility of Women", author: "Lucrezia Marinella", year: 1600, category: "Feminism/Philosophy",
    query: "Lucrezia Marinella",
    byEra: { Romantic: 1.78e-10, Victorian: 2.14e-10, EarlyMod: 7.03e-11, Postwar: 2.37e-11, Contemporary: 7.57e-10, Digital: 4.08e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 2, totalEditions: 2 },

  // French
  { title: "Heptameron", author: "Marguerite de Navarre", year: 1558, category: "Literature",
    query: "Heptameron,Marguerite de Navarre",
    byEra: { Romantic: 3.12e-08, Victorian: 4.24e-08, EarlyMod: 4.60e-08, Postwar: 3.66e-08, Contemporary: 4.57e-08, Digital: 5.92e-08 },
    pattern: "Stable canonical", istcEditions: 0, ustcEditions: 25, totalEditions: 25 },

  // English
  { title: "Copy of a Letter", author: "Isabella Whitney", year: 1567, category: "Poetry",
    query: "Isabella Whitney",
    byEra: { Romantic: 1.76e-11, Victorian: 4.90e-10, EarlyMod: 2.69e-10, Postwar: 1.53e-10, Contemporary: 2.62e-09, Digital: 6.22e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 1, totalEditions: 1 },
  { title: "Psalms of Mary Sidney", author: "Mary Sidney", year: 1599, category: "Poetry/Translation",
    query: "Mary Sidney,Countess of Pembroke",
    byEra: { Romantic: 1.72e-07, Victorian: 1.28e-07, EarlyMod: 6.57e-08, Postwar: 4.56e-08, Contemporary: 5.70e-08, Digital: 1.02e-07 },
    pattern: "Variable", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Prayers of Katherine Parr", author: "Katherine Parr", year: 1545, category: "Devotional",
    query: "Katherine Parr",
    byEra: { Romantic: 1.68e-08, Victorian: 1.91e-08, EarlyMod: 8.81e-09, Postwar: 6.52e-09, Contemporary: 7.04e-09, Digital: 2.28e-08 },
    pattern: "Variable", istcEditions: 0, ustcEditions: 3, totalEditions: 3 },
  { title: "Examinations of Anne Askew", author: "Anne Askew", year: 1546, category: "Martyrology",
    query: "Anne Askew",
    byEra: { Romantic: 6.23e-08, Victorian: 5.05e-08, EarlyMod: 1.24e-08, Postwar: 6.73e-09, Contemporary: 7.90e-09, Digital: 2.29e-08 },
    pattern: "Romantic peak", istcEditions: 0, ustcEditions: 4, totalEditions: 4 },

  // Colonial / Baroque
  { title: "Poems of Sor Juana", author: "Sor Juana Inés de la Cruz", year: 1689, category: "Poetry",
    query: "Sor Juana",
    byEra: { Romantic: 9.68e-11, Victorian: 1.29e-09, EarlyMod: 1.20e-08, Postwar: 3.37e-08, Contemporary: 1.11e-07, Digital: 1.74e-07 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // === MORE EARLY MODERN WOMEN ===
  // 15th Century Italian Humanists (1450-1500)
  { title: "Orations", author: "Costanza Varano", year: 1444, category: "Humanism/Oratory",
    query: "Costanza Varano",
    byEra: { Romantic: 1.00e-11, Victorian: 5.11e-11, EarlyMod: 2.08e-10, Postwar: 6.64e-11, Contemporary: 4.02e-10, Digital: 7.76e-10 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Oration to Pius II", author: "Ippolita Maria Sforza", year: 1465, category: "Humanism/Oratory",
    query: "Ippolita Maria Sforza,Ippolita Sforza",
    byEra: { Romantic: 1.08e-09, Victorian: 1.71e-09, EarlyMod: 2.29e-09, Postwar: 7.99e-10, Contemporary: 1.36e-09, Digital: 2.03e-09 },
    pattern: "Stable canonical", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Orations & Letters", author: "Battista da Montefeltro Malatesta", year: 1433, category: "Humanism",
    query: "Battista Malatesta,Battista da Montefeltro",
    byEra: { Romantic: 0, Victorian: 7.26e-11, EarlyMod: 1.46e-10, Postwar: 1.46e-10, Contemporary: 5.70e-10, Digital: 1.26e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Letters", author: "Cecilia Gonzaga", year: 1447, category: "Humanism",
    query: "Cecilia Gonzaga",
    byEra: { Romantic: 1.74e-10, Victorian: 5.61e-10, EarlyMod: 2.16e-09, Postwar: 6.66e-10, Contemporary: 7.51e-10, Digital: 9.99e-10 },
    pattern: "Variable", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Laude & Sacred Poetry", author: "Lucrezia Tornabuoni", year: 1470, category: "Poetry/Religion",
    query: "Lucrezia Tornabuoni",
    byEra: { Romantic: 9.12e-10, Victorian: 1.95e-09, EarlyMod: 3.71e-09, Postwar: 1.36e-09, Contemporary: 1.84e-09, Digital: 4.15e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Sacre rappresentazioni", author: "Antonia Pulci", year: 1483, category: "Drama/Religion",
    query: "Antonia Pulci",
    byEra: { Romantic: 1.59e-11, Victorian: 5.34e-11, EarlyMod: 2.42e-10, Postwar: 7.45e-11, Contemporary: 2.99e-10, Digital: 9.27e-10 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Poems", author: "Ginevra de' Benci", year: 1478, category: "Poetry",
    query: "Ginevra de Benci",
    byEra: { Romantic: 5.22e-12, Victorian: 3.73e-10, EarlyMod: 5.69e-11, Postwar: 3.13e-10, Contemporary: 4.32e-10, Digital: 5.06e-10 },
    pattern: "Variable", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // Renaissance Patrons & Rulers
  { title: "Letters", author: "Isabella d'Este", year: 1500, category: "Letters/Patronage",
    query: "Isabella d'Este",
    byEra: { Romantic: 1.85e-09, Victorian: 6.05e-09, EarlyMod: 2.95e-08, Postwar: 1.81e-08, Contemporary: 2.28e-08, Digital: 3.16e-08 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Letters", author: "Elisabetta Gonzaga", year: 1502, category: "Letters",
    query: "Elisabetta Gonzaga",
    byEra: { Romantic: 1.89e-10, Victorian: 1.08e-09, EarlyMod: 3.47e-09, Postwar: 1.84e-09, Contemporary: 1.73e-09, Digital: 2.49e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Self-Portraits & Letters", author: "Sofonisba Anguissola", year: 1560, category: "Art/Letters",
    query: "Sofonisba Anguissola",
    byEra: { Romantic: 0, Victorian: 1.96e-10, EarlyMod: 6.17e-10, Postwar: 1.07e-09, Contemporary: 4.94e-09, Digital: 7.00e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Commentaries on Aristotle", author: "Beatriz Galindo", year: 1500, category: "Humanism",
    query: "Beatriz Galindo,La Latina",
    byEra: { Romantic: 3.16e-10, Victorian: 5.89e-10, EarlyMod: 9.55e-10, Postwar: 5.71e-10, Contemporary: 2.23e-09, Digital: 1.03e-08 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Memorias", author: "Leonor López de Córdoba", year: 1400, category: "Autobiography",
    query: "Leonor Lopez de Cordoba",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 4.52e-11, Postwar: 4.19e-11, Contemporary: 4.50e-10, Digital: 2.67e-10 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Chronicle", author: "Jeanne de Jussie", year: 1535, category: "History",
    query: "Jeanne de Jussie",
    byEra: { Romantic: 2.83e-10, Victorian: 1.28e-09, EarlyMod: 8.29e-10, Postwar: 2.53e-10, Contemporary: 4.05e-10, Digital: 1.28e-09 },
    pattern: "Variable", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Enseignements", author: "Anne de Beaujeu", year: 1505, category: "Advice Literature",
    query: "Anne de Beaujeu,Anne de France",
    byEra: { Romantic: 2.65e-09, Victorian: 8.79e-09, EarlyMod: 7.04e-09, Postwar: 3.83e-09, Contemporary: 2.53e-09, Digital: 5.18e-09 },
    pattern: "Victorian peak", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Journal", author: "Caritas Pirckheimer", year: 1525, category: "Humanism/Reform",
    query: "Caritas Pirckheimer",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 3.04e-12, Postwar: 5.16e-11, Contemporary: 9.34e-10, Digital: 1.54e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // English Tudor Women
  { title: "Lamentation of a Sinner", author: "Catherine Parr", year: 1545, category: "Religion",
    query: "Catherine Parr",
    byEra: { Romantic: 6.39e-08, Victorian: 4.96e-08, EarlyMod: 2.13e-08, Postwar: 1.93e-08, Contemporary: 2.02e-08, Digital: 2.84e-08 },
    pattern: "Romantic peak", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Examinations", author: "Anne Askew", year: 1546, category: "Religion/Martyrology",
    query: "Anne Askew",
    byEra: { Romantic: 6.23e-08, Victorian: 5.05e-08, EarlyMod: 1.24e-08, Postwar: 6.73e-09, Contemporary: 7.90e-09, Digital: 2.29e-08 },
    pattern: "Romantic peak", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Letters", author: "Lady Jane Grey", year: 1553, category: "Letters",
    query: "Lady Jane Grey",
    byEra: { Romantic: 3.22e-07, Victorian: 3.12e-07, EarlyMod: 1.06e-07, Postwar: 5.48e-08, Contemporary: 3.21e-08, Digital: 6.01e-08 },
    pattern: "Victorian peak", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // Italian humanists (late 15th-early 16th c.)
  { title: "Letters of Laura Cereta", author: "Laura Cereta", year: 1488, category: "Humanism/Letters",
    query: "Laura Cereta",
    byEra: { Romantic: 9.16e-11, Victorian: 1.10e-10, EarlyMod: 2.29e-11, Postwar: 7.27e-11, Contemporary: 1.83e-09, Digital: 6.22e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 1, totalEditions: 1 },
  { title: "Letters of Isotta Nogarola", author: "Isotta Nogarola", year: 1451, category: "Humanism/Letters",
    query: "Isotta Nogarola",
    byEra: { Romantic: 3.13e-10, Victorian: 4.67e-10, EarlyMod: 5.48e-10, Postwar: 3.87e-10, Contemporary: 2.37e-09, Digital: 5.12e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Orations of Cassandra Fedele", author: "Cassandra Fedele", year: 1487, category: "Humanism/Oratory",
    query: "Cassandra Fedele",
    byEra: { Romantic: 5.70e-10, Victorian: 2.80e-09, EarlyMod: 1.10e-09, Postwar: 3.54e-10, Contemporary: 2.08e-09, Digital: 4.78e-09 },
    pattern: "Variable", istcEditions: 0, ustcEditions: 1, totalEditions: 1 },
  { title: "Poems of Veronica Gambara", author: "Veronica Gambara", year: 1530, category: "Poetry",
    query: "Veronica Gambara",
    byEra: { Romantic: 5.44e-09, Victorian: 4.58e-09, EarlyMod: 3.73e-09, Postwar: 1.18e-09, Contemporary: 1.94e-09, Digital: 2.69e-09 },
    pattern: "Romantic peak", istcEditions: 0, ustcEditions: 2, totalEditions: 2 },

  // French
  { title: "Poems of Pernette du Guillet", author: "Pernette du Guillet", year: 1545, category: "Poetry",
    query: "Pernette du Guillet",
    byEra: { Romantic: 2.62e-10, Victorian: 3.66e-10, EarlyMod: 6.96e-10, Postwar: 1.36e-09, Contemporary: 2.18e-09, Digital: 1.59e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 1, totalEditions: 1 },
  { title: "Works of Des Roches", author: "Catherine & Madeleine des Roches", year: 1579, category: "Poetry/Letters",
    query: "Catherine des Roches,Madeleine des Roches",
    byEra: { Romantic: 1.03e-09, Victorian: 4.29e-10, EarlyMod: 1.98e-10, Postwar: 1.66e-10, Contemporary: 2.13e-09, Digital: 2.72e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 2, totalEditions: 2 },

  // Spanish
  { title: "Novelas of María de Zayas", author: "María de Zayas", year: 1637, category: "Literature",
    query: "María de Zayas,Maria de Zayas",
    byEra: { Romantic: 1.03e-09, Victorian: 9.41e-10, EarlyMod: 2.62e-09, Postwar: 1.90e-09, Contemporary: 6.56e-09, Digital: 1.15e-08 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Works of Luisa Sigea", author: "Luisa Sigea", year: 1552, category: "Humanism",
    query: "Luisa Sigea",
    byEra: { Romantic: 2.01e-11, Victorian: 1.93e-10, EarlyMod: 5.77e-10, Postwar: 6.13e-10, Contemporary: 7.41e-10, Digital: 1.68e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 1, totalEditions: 1 },

  // English - Early Modern
  { title: "Salve Deus Rex Judaeorum", author: "Aemilia Lanyer", year: 1611, category: "Poetry",
    query: "Aemilia Lanyer,Salve Deus Rex Judaeorum",
    byEra: { Romantic: 1.21e-11, Victorian: 4.43e-11, EarlyMod: 1.60e-10, Postwar: 1.86e-10, Contemporary: 8.06e-09, Digital: 2.37e-08 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Tragedy of Mariam", author: "Elizabeth Cary", year: 1613, category: "Drama",
    query: "Elizabeth Cary Mariam,Tragedy of Mariam",
    byEra: { Romantic: 2.65e-09, Victorian: 2.89e-10, EarlyMod: 6.28e-10, Postwar: 4.43e-10, Contemporary: 2.55e-09, Digital: 9.95e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Jane Anger Her Protection", author: "Jane Anger", year: 1589, category: "Polemic",
    query: "Jane Anger",
    byEra: { Romantic: 4.45e-11, Victorian: 3.56e-11, EarlyMod: 4.91e-10, Postwar: 4.63e-10, Contemporary: 2.77e-09, Digital: 2.84e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 1, totalEditions: 1 },
  { title: "Urania", author: "Mary Wroth", year: 1621, category: "Literature",
    query: "Mary Wroth,Urania Wroth",
    byEra: { Romantic: 1.80e-09, Victorian: 2.65e-09, EarlyMod: 2.13e-09, Postwar: 1.66e-09, Contemporary: 1.66e-08, Digital: 4.01e-08 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // German Protestant
  { title: "Works of Katharina Zell", author: "Katharina Schütz Zell", year: 1534, category: "Theology/Letters",
    query: "Katharina Zell,Katharina Schütz",
    byEra: { Romantic: 0, Victorian: 2.73e-11, EarlyMod: 5.41e-11, Postwar: 1.15e-10, Contemporary: 4.77e-10, Digital: 3.03e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 2, totalEditions: 2 },

  // Dutch
  { title: "Poems of Anna Bijns", author: "Anna Bijns", year: 1528, category: "Poetry",
    query: "Anna Bijns",
    byEra: { Romantic: 0, Victorian: 7.20e-10, EarlyMod: 7.86e-10, Postwar: 7.28e-10, Contemporary: 1.58e-09, Digital: 1.33e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 3, totalEditions: 3 },

  // 17th Century English
  { title: "Works of Margaret Cavendish", author: "Margaret Cavendish", year: 1666, category: "Philosophy/Literature",
    query: "Margaret Cavendish",
    byEra: { Romantic: 1.47e-08, Victorian: 9.00e-09, EarlyMod: 6.69e-09, Postwar: 6.02e-09, Contemporary: 2.16e-08, Digital: 6.94e-08 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Works of Aphra Behn", author: "Aphra Behn", year: 1688, category: "Drama/Literature",
    query: "Aphra Behn",
    byEra: { Romantic: 8.16e-09, Victorian: 3.06e-08, EarlyMod: 3.32e-08, Postwar: 3.84e-08, Contemporary: 8.08e-08, Digital: 1.07e-07 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // French feminist
  { title: "Equality of Men and Women", author: "Marie de Gournay", year: 1622, category: "Feminism/Philosophy",
    query: "Marie de Gournay",
    byEra: { Romantic: 3.13e-10, Victorian: 3.68e-09, EarlyMod: 4.03e-09, Postwar: 3.28e-09, Contemporary: 7.20e-09, Digital: 9.13e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // Mystics
  { title: "Mystical City of God", author: "María de Ágreda", year: 1670, category: "Mysticism",
    query: "María de Ágreda,Mary of Agreda",
    byEra: { Romantic: 9.94e-10, Victorian: 1.35e-09, EarlyMod: 7.64e-10, Postwar: 1.86e-09, Contemporary: 1.47e-09, Digital: 3.54e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Autobiography of Madame Guyon", author: "Madame Guyon", year: 1688, category: "Mysticism",
    query: "Madame Guyon",
    byEra: { Romantic: 9.85e-08, Victorian: 1.51e-07, EarlyMod: 4.25e-08, Postwar: 1.59e-08, Contemporary: 1.08e-08, Digital: 2.27e-08 },
    pattern: "Victorian peak", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // === COMPREHENSIVE 16TH CENTURY WOMEN ===
  // Italian
  { title: "Works of Isabella Andreini", author: "Isabella Andreini", year: 1562, category: "Drama/Poetry",
    query: "Isabella Andreini",
    byEra: { Romantic: 3.01e-09, Victorian: 1.08e-09, EarlyMod: 2.01e-09, Postwar: 1.85e-09, Contemporary: 1.83e-09, Digital: 5.89e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Flori", author: "Maddalena Campiglia", year: 1588, category: "Drama",
    query: "Maddalena Campiglia",
    byEra: { Romantic: 7.80e-11, Victorian: 2.26e-11, EarlyMod: 3.32e-11, Postwar: 1.51e-11, Contemporary: 5.29e-11, Digital: 9.58e-10 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 1, totalEditions: 1 },
  { title: "Poems of Laudomia Forteguerri", author: "Laudomia Forteguerri", year: 1555, category: "Poetry",
    query: "Laudomia Forteguerri",
    byEra: { Romantic: 0, Victorian: 1.27e-11, EarlyMod: 4.17e-11, Postwar: 1.80e-11, Contemporary: 3.46e-11, Digital: 6.27e-10 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Poems of Tarquinia Molza", author: "Tarquinia Molza", year: 1575, category: "Poetry",
    query: "Tarquinia Molza",
    byEra: { Romantic: 1.07e-09, Victorian: 9.97e-10, EarlyMod: 4.66e-10, Postwar: 6.40e-10, Contemporary: 9.94e-10, Digital: 1.11e-09 },
    pattern: "Variable", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Discorso", author: "Laura Terracina", year: 1548, category: "Poetry",
    query: "Laura Terracina",
    byEra: { Romantic: 1.39e-09, Victorian: 3.64e-10, EarlyMod: 2.14e-10, Postwar: 9.68e-11, Contemporary: 4.42e-10, Digital: 1.14e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 5, totalEditions: 5 },

  // French
  { title: "Les Angoysses", author: "Hélisenne de Crenne", year: 1538, category: "Literature",
    query: "Hélisenne de Crenne",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 1.41e-10, Postwar: 4.00e-10, Contemporary: 6.55e-10, Digital: 1.33e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 3, totalEditions: 3 },
  { title: "Contes amoureux", author: "Jeanne Flore", year: 1531, category: "Literature",
    query: "Jeanne Flore",
    byEra: { Romantic: 3.73e-10, Victorian: 5.81e-11, EarlyMod: 1.12e-10, Postwar: 2.33e-10, Contemporary: 1.30e-09, Digital: 7.51e-10 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 2, totalEditions: 2 },
  { title: "Premieres oeuvres", author: "Marie de Romieu", year: 1581, category: "Poetry",
    query: "Marie de Romieu",
    byEra: { Romantic: 1.89e-11, Victorian: 2.52e-11, EarlyMod: 1.60e-10, Postwar: 1.19e-10, Contemporary: 1.99e-10, Digital: 5.48e-10 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 1, totalEditions: 1 },
  { title: "Emblemes", author: "Georgette de Montenay", year: 1567, category: "Emblem Book",
    query: "Georgette de Montenay",
    byEra: { Romantic: 2.26e-10, Victorian: 5.58e-10, EarlyMod: 1.56e-10, Postwar: 8.02e-10, Contemporary: 2.41e-09, Digital: 2.12e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 2, totalEditions: 2 },
  { title: "Sonnets spirituels", author: "Anne de Marquets", year: 1562, category: "Poetry",
    query: "Anne de Marquets",
    byEra: { Romantic: 0, Victorian: 4.83e-11, EarlyMod: 2.53e-10, Postwar: 1.58e-10, Contemporary: 7.44e-10, Digital: 1.07e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 2, totalEditions: 2 },
  { title: "Les Misères", author: "Nicole Estienne", year: 1573, category: "Poetry",
    query: "Nicole Estienne",
    byEra: { Romantic: 1.39e-11, Victorian: 2.49e-11, EarlyMod: 8.09e-11, Postwar: 1.07e-10, Contemporary: 2.06e-10, Digital: 3.26e-10 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 1, totalEditions: 1 },

  // Spanish
  { title: "Vita Christi", author: "Isabel de Villena", year: 1497, category: "Devotional",
    query: "Isabel de Villena",
    byEra: { Romantic: 0, Victorian: 1.12e-11, EarlyMod: 1.12e-10, Postwar: 1.69e-10, Contemporary: 6.77e-10, Digital: 1.83e-09 },
    pattern: "Modern rediscovery", istcEditions: 1, ustcEditions: 2, totalEditions: 3 },
  { title: "Autobiography (Lieutenant Nun)", author: "Catalina de Erauso", year: 1626, category: "Autobiography",
    query: "Catalina de Erauso",
    byEra: { Romantic: 4.37e-10, Victorian: 5.43e-10, EarlyMod: 9.10e-10, Postwar: 8.54e-10, Contemporary: 2.50e-09, Digital: 7.99e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Cancionero poems", author: "Florencia Pinar", year: 1480, category: "Poetry",
    query: "Florencia Pinar",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 1.06e-11, Postwar: 7.91e-11, Contemporary: 1.02e-09, Digital: 5.30e-10 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Works of Ana de San Bartolomé", author: "Ana de San Bartolomé", year: 1582, category: "Mysticism",
    query: "Ana de San Bartolomé",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 8.29e-11, Postwar: 5.87e-10, Contemporary: 3.36e-10, Digital: 2.08e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // English
  { title: "Meditation of a Penitent Sinner", author: "Anne Locke", year: 1560, category: "Poetry",
    query: "Anne Locke,Anne Lok",
    byEra: { Romantic: 2.70e-09, Victorian: 1.82e-09, EarlyMod: 9.95e-10, Postwar: 9.06e-10, Contemporary: 2.16e-09, Digital: 3.48e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 1, totalEditions: 1 },
  { title: "Iphigenia at Aulis", author: "Jane Lumley", year: 1553, category: "Drama",
    query: "Jane Lumley",
    byEra: { Romantic: 5.31e-10, Victorian: 4.47e-10, EarlyMod: 1.82e-10, Postwar: 2.08e-10, Contemporary: 4.74e-10, Digital: 1.76e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Morning and Evening Prayers", author: "Elizabeth Tyrwhit", year: 1574, category: "Devotional",
    query: "Elizabeth Tyrwhit",
    byEra: { Romantic: 3.32e-10, Victorian: 2.92e-10, EarlyMod: 1.07e-10, Postwar: 6.83e-11, Contemporary: 1.71e-10, Digital: 1.51e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 1, totalEditions: 1 },
  { title: "Mouzell for Melastomus", author: "Rachel Speght", year: 1617, category: "Polemic",
    query: "Rachel Speght",
    byEra: { Romantic: 7.68e-10, Victorian: 1.61e-10, EarlyMod: 2.57e-10, Postwar: 3.81e-10, Contemporary: 3.01e-09, Digital: 5.28e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Miscellanea", author: "Elizabeth Grymeston", year: 1604, category: "Devotional",
    query: "Elizabeth Grymeston",
    byEra: { Romantic: 1.64e-09, Victorian: 3.28e-10, EarlyMod: 3.25e-10, Postwar: 4.17e-10, Contemporary: 7.39e-10, Digital: 1.81e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "French Historie", author: "Anne Dowriche", year: 1589, category: "Poetry",
    query: "Anne Dowriche",
    byEra: { Romantic: 1.13e-09, Victorian: 1.22e-10, EarlyMod: 3.47e-11, Postwar: 7.14e-11, Contemporary: 4.02e-10, Digital: 1.50e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 1, totalEditions: 1 },
  { title: "Ane Godlie Dreame", author: "Elizabeth Melville", year: 1603, category: "Poetry",
    query: "Elizabeth Melville",
    byEra: { Romantic: 2.03e-09, Victorian: 8.68e-10, EarlyMod: 8.80e-10, Postwar: 4.95e-09, Contemporary: 2.87e-09, Digital: 2.82e-09 },
    pattern: "Variable", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Manuscripts", author: "Esther Inglis", year: 1600, category: "Calligraphy",
    query: "Esther Inglis",
    byEra: { Romantic: 3.14e-09, Victorian: 3.38e-09, EarlyMod: 1.02e-09, Postwar: 8.42e-10, Contemporary: 1.86e-09, Digital: 3.17e-09 },
    pattern: "Variable", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // German
  { title: "Hymns", author: "Elisabeth Cruciger", year: 1524, category: "Hymns",
    query: "Elisabeth Cruciger",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 1.09e-11, Postwar: 1.94e-11, Contemporary: 5.33e-11, Digital: 2.41e-10 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 1, totalEditions: 1 },
  { title: "Regentenbuch", author: "Elisabeth von Braunschweig", year: 1545, category: "Devotional",
    query: "Elisabeth von Braunschweig",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 2.28e-11, Postwar: 2.73e-11, Contemporary: 1.19e-10, Digital: 4.08e-10 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 2, totalEditions: 2 },

  // Dutch
  { title: "Poems", author: "Maria Tesselschade", year: 1620, category: "Poetry",
    query: "Maria Tesselschade",
    byEra: { Romantic: 2.31e-10, Victorian: 4.26e-10, EarlyMod: 5.06e-10, Postwar: 4.15e-10, Contemporary: 5.71e-10, Digital: 7.82e-10 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Opuscula", author: "Anna Maria van Schurman", year: 1648, category: "Philosophy/Polyglot",
    query: "Anna Maria van Schurman,Anna van Schurman",
    byEra: { Romantic: 3.67e-11, Victorian: 7.92e-10, EarlyMod: 2.64e-09, Postwar: 1.33e-09, Contemporary: 5.31e-09, Digital: 1.02e-08 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // Danish
  { title: "Translations", author: "Birgitte Thott", year: 1658, category: "Philosophy",
    query: "Birgitte Thott",
    byEra: { Romantic: 1.22e-10, Victorian: 6.90e-11, EarlyMod: 7.50e-11, Postwar: 5.74e-11, Contemporary: 1.27e-10, Digital: 1.87e-10 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // Women Philosophers
  { title: "Correspondence with Descartes", author: "Princess Elisabeth of Bohemia", year: 1643, category: "Philosophy",
    query: "Princess Elisabeth of Bohemia,Elisabeth of Bohemia philosopher",
    byEra: { Romantic: 0, Victorian: 7.04e-11, EarlyMod: 1.95e-11, Postwar: 5.46e-11, Contemporary: 2.98e-10, Digital: 2.53e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Principles of Philosophy", author: "Anne Conway", year: 1690, category: "Philosophy",
    query: "Anne Conway philosopher,Principia philosophiae",
    byEra: { Romantic: 1.73e-10, Victorian: 2.82e-10, EarlyMod: 7.31e-10, Postwar: 2.51e-09, Contemporary: 3.09e-09, Digital: 5.61e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Discourse Concerning the Love of God", author: "Damaris Cudworth Masham", year: 1696, category: "Philosophy",
    query: "Damaris Masham,Damaris Cudworth",
    byEra: { Romantic: 9.49e-10, Victorian: 1.02e-09, EarlyMod: 6.40e-10, Postwar: 1.23e-09, Contemporary: 2.30e-09, Digital: 5.70e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "A Serious Proposal to the Ladies", author: "Mary Astell", year: 1694, category: "Philosophy/Feminism",
    query: "Mary Astell",
    byEra: { Romantic: 7.06e-09, Victorian: 7.48e-09, EarlyMod: 1.02e-08, Postwar: 6.14e-09, Contemporary: 2.47e-08, Digital: 3.80e-08 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Essay to Revive the Antient Education of Gentlewomen", author: "Bathsua Makin", year: 1673, category: "Philosophy/Education",
    query: "Bathsua Makin",
    byEra: { Romantic: 0, Victorian: 1.84e-11, EarlyMod: 6.91e-10, Postwar: 9.58e-10, Contemporary: 3.98e-09, Digital: 5.30e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Institutions de physique", author: "Émilie du Châtelet", year: 1740, category: "Philosophy/Physics",
    query: "Emilie du Chatelet,Émilie du Châtelet",
    byEra: { Romantic: 1.00e-10, Victorian: 4.74e-11, EarlyMod: 2.70e-10, Postwar: 4.23e-10, Contemporary: 1.92e-09, Digital: 3.72e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // More 17th-18th Century Philosophers
  { title: "Defence of Mr. Locke's Essay", author: "Catharine Trotter Cockburn", year: 1702, category: "Philosophy",
    query: "Catharine Trotter Cockburn",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 9.53e-13, Postwar: 1.54e-11, Contemporary: 2.29e-10, Digital: 1.06e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Traité de la morale et de la politique", author: "Gabrielle Suchon", year: 1693, category: "Philosophy/Feminism",
    query: "Gabrielle Suchon",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 7.12e-11, Postwar: 1.03e-10, Contemporary: 2.49e-10, Digital: 1.15e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Physics Dissertations", author: "Laura Bassi", year: 1732, category: "Philosophy/Physics",
    query: "Laura Bassi",
    byEra: { Romantic: 4.99e-09, Victorian: 5.16e-09, EarlyMod: 1.77e-09, Postwar: 1.10e-09, Contemporary: 1.52e-09, Digital: 4.46e-09 },
    pattern: "Stable canonical", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Instituzioni analitiche", author: "Maria Gaetana Agnesi", year: 1748, category: "Philosophy/Mathematics",
    query: "Maria Gaetana Agnesi",
    byEra: { Romantic: 4.04e-09, Victorian: 1.59e-09, EarlyMod: 1.13e-09, Postwar: 9.13e-10, Contemporary: 1.49e-09, Digital: 3.26e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Doctoral Thesis", author: "Elena Cornaro Piscopia", year: 1678, category: "Philosophy",
    query: "Elena Cornaro Piscopia",
    byEra: { Romantic: 1.47e-11, Victorian: 1.93e-10, EarlyMod: 9.40e-11, Postwar: 7.58e-11, Contemporary: 1.15e-10, Digital: 3.36e-10 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // Byzantine & Islamic Women Philosophers
  { title: "The Alexiad", author: "Anna Comnena", year: 1148, category: "History/Philosophy",
    query: "Anna Comnena,Alexiad",
    byEra: { Romantic: 1.85e-07, Victorian: 8.86e-08, EarlyMod: 2.95e-08, Postwar: 3.25e-08, Contemporary: 3.03e-08, Digital: 5.25e-08 },
    pattern: "Romantic peak", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Poems & Sayings", author: "Rabia al-Adawiyya", year: 801, category: "Philosophy/Mysticism",
    query: "Rabia of Basra,Rabia Basri",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 9.26e-11, Postwar: 5.29e-10, Contemporary: 5.38e-10, Digital: 9.71e-10 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // East Asian Women Writers
  { title: "The Tale of Genji", author: "Murasaki Shikibu", year: 1010, category: "Literature",
    query: "Murasaki Shikibu,Tale of Genji",
    byEra: { Romantic: 5.09e-11, Victorian: 1.09e-09, EarlyMod: 1.34e-08, Postwar: 4.99e-08, Contemporary: 8.76e-08, Digital: 1.03e-07 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "The Pillow Book", author: "Sei Shōnagon", year: 1002, category: "Literature",
    query: "Sei Shonagon,Pillow Book",
    byEra: { Romantic: 2.01e-11, Victorian: 5.70e-10, EarlyMod: 4.42e-09, Postwar: 1.62e-08, Contemporary: 3.22e-08, Digital: 3.86e-08 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Lessons for Women", author: "Ban Zhao", year: 100, category: "Philosophy/Ethics",
    query: "Ban Zhao",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 0, Postwar: 1.53e-10, Contemporary: 3.78e-09, Digital: 1.32e-08 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Poems", author: "Li Qingzhao", year: 1125, category: "Poetry",
    query: "Li Qingzhao,Li Ch'ing-chao",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 1.81e-10, Postwar: 4.12e-09, Contemporary: 7.94e-09, Digital: 1.08e-08 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // South Asian Women Writers
  { title: "Devotional Songs", author: "Mirabai", year: 1540, category: "Poetry/Devotional",
    query: "Mirabai,Mira Bai",
    byEra: { Romantic: 3.82e-10, Victorian: 9.40e-10, EarlyMod: 7.80e-09, Postwar: 2.23e-08, Contemporary: 2.75e-08, Digital: 4.07e-08 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Vakhs", author: "Lal Ded", year: 1355, category: "Poetry/Mysticism",
    query: "Lal Ded,Lalla",
    byEra: { Romantic: 2.44e-07, Victorian: 3.15e-07, EarlyMod: 1.43e-07, Postwar: 9.43e-08, Contemporary: 1.01e-07, Digital: 1.49e-07 },
    pattern: "Victorian peak", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // Ancient Women Philosophers - Pythagoreans
  { title: "Teachings", author: "Themistoclea", year: -550, category: "Philosophy/Religion",
    query: "Themistoclea,Themistokleia",
    byEra: { Romantic: 9.76e-10, Victorian: 1.54e-09, EarlyMod: 6.00e-10, Postwar: 2.56e-10, Contemporary: 4.01e-10, Digital: 5.51e-10 },
    pattern: "Victorian peak", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Teachings", author: "Myia", year: -500, category: "Philosophy",
    query: "Myia Pythagorean",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 0, Postwar: 0, Contemporary: 0, Digital: 0 },
    pattern: "No data", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Teachings", author: "Damo", year: -500, category: "Philosophy",
    query: "Damo Pythagorean",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 0, Postwar: 0, Contemporary: 0, Digital: 0 },
    pattern: "No data", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "On Wisdom", author: "Perictione", year: -450, category: "Philosophy",
    query: "Perictione",
    byEra: { Romantic: 4.26e-09, Victorian: 5.54e-09, EarlyMod: 1.91e-09, Postwar: 2.55e-09, Contemporary: 4.13e-09, Digital: 5.40e-09 },
    pattern: "Stable canonical", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Teachings", author: "Aspasia of Miletus", year: -450, category: "Philosophy/Rhetoric",
    query: "Aspasia",
    byEra: { Romantic: 5.90e-07, Victorian: 3.50e-07, EarlyMod: 1.58e-07, Postwar: 7.82e-08, Contemporary: 7.24e-08, Digital: 1.23e-07 },
    pattern: "Victorian peak", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Teachings", author: "Arete of Cyrene", year: -350, category: "Philosophy",
    query: "Arete of Cyrene",
    byEra: { Romantic: 1.55e-10, Victorian: 1.13e-10, EarlyMod: 2.64e-11, Postwar: 6.66e-11, Contemporary: 2.60e-10, Digital: 3.55e-10 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "On the Harmony of Women", author: "Aesara of Lucania", year: -350, category: "Philosophy",
    query: "Aesara",
    byEra: { Romantic: 6.67e-11, Victorian: 9.28e-11, EarlyMod: 1.02e-11, Postwar: 3.27e-11, Contemporary: 9.63e-10, Digital: 1.02e-09 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "On the Moderation of Women", author: "Phintys", year: -350, category: "Philosophy",
    query: "Phintys",
    byEra: { Romantic: 4.16e-10, Victorian: 1.81e-10, EarlyMod: 2.87e-10, Postwar: 2.66e-10, Contemporary: 1.07e-09, Digital: 1.73e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Works", author: "Hypatia of Alexandria", year: 400, category: "Philosophy/Mathematics",
    query: "Hypatia",
    byEra: { Romantic: 9.20e-08, Victorian: 2.72e-07, EarlyMod: 1.32e-07, Postwar: 5.44e-08, Contemporary: 1.06e-07, Digital: 2.72e-07 },
    pattern: "Stable canonical", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // Women in Natural Philosophy & Science
  { title: "Metamorphosis Insectorum Surinamensium", author: "Maria Sibylla Merian", year: 1705, category: "Natural History",
    query: "Maria Sibylla Merian",
    byEra: { Romantic: 2.56e-10, Victorian: 6.12e-10, EarlyMod: 6.41e-10, Postwar: 1.56e-09, Contemporary: 5.32e-09, Digital: 8.43e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Urania Propitia", author: "Maria Cunitz", year: 1650, category: "Astronomy",
    query: "Maria Cunitz",
    byEra: { Romantic: 4.54e-10, Victorian: 4.40e-10, EarlyMod: 1.46e-10, Postwar: 5.61e-11, Contemporary: 3.89e-10, Digital: 5.11e-10 },
    pattern: "Variable", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Astronomical Observations", author: "Sophie Brahe", year: 1590, category: "Astronomy",
    query: "Sophie Brahe",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 1.17e-11, Postwar: 4.10e-11, Contemporary: 2.86e-10, Digital: 4.85e-10 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Comet Discovery", author: "Maria Margarethe Kirch", year: 1702, category: "Astronomy",
    query: "Maria Kirch,Maria Margarethe Kirch",
    byEra: { Romantic: 1.08e-09, Victorian: 3.24e-11, EarlyMod: 4.89e-11, Postwar: 5.67e-11, Contemporary: 1.41e-10, Digital: 2.00e-10 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Astronomical Tables", author: "Elisabeth Hevelius", year: 1690, category: "Astronomy",
    query: "Elisabeth Hevelius",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 3.31e-11, Postwar: 0, Contemporary: 2.11e-11, Digital: 4.92e-11 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Halley's Comet Calculations", author: "Nicole-Reine Lepaute", year: 1762, category: "Astronomy/Mathematics",
    query: "Nicole-Reine Lepaute",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 0, Postwar: 0, Contemporary: 6.68e-11, Digital: 2.46e-10 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Comet Discoveries", author: "Caroline Herschel", year: 1786, category: "Astronomy",
    query: "Caroline Herschel",
    byEra: { Romantic: 1.17e-08, Victorian: 2.81e-08, EarlyMod: 8.86e-09, Postwar: 3.75e-09, Contemporary: 6.20e-09, Digital: 1.30e-08 },
    pattern: "Victorian peak", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "On the Connexion of the Physical Sciences", author: "Mary Somerville", year: 1831, category: "Natural Philosophy",
    query: "Mary Somerville",
    byEra: { Romantic: 5.75e-09, Victorian: 3.77e-08, EarlyMod: 1.00e-08, Postwar: 7.82e-09, Contemporary: 1.46e-08, Digital: 2.07e-08 },
    pattern: "Victorian peak", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Notes on the Analytical Engine", author: "Ada Lovelace", year: 1843, category: "Mathematics/Computing",
    query: "Ada Lovelace",
    byEra: { Romantic: 0, Victorian: 1.70e-10, EarlyMod: 1.24e-10, Postwar: 3.63e-10, Contemporary: 8.38e-09, Digital: 1.88e-08 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // Medieval & Ancient Medicine
  { title: "Trotula", author: "Trota of Salerno", year: 1150, category: "Medicine",
    query: "Trotula,Trota of Salerno",
    byEra: { Romantic: 3.22e-09, Victorian: 3.09e-09, EarlyMod: 9.59e-09, Postwar: 6.56e-09, Contemporary: 1.46e-08, Digital: 2.54e-08 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
  { title: "Alchemical Works", author: "Mary the Jewess", year: 100, category: "Alchemy",
    query: "Mary the Jewess,Maria the Jewess",
    byEra: { Romantic: 4.74e-11, Victorian: 7.11e-10, EarlyMod: 8.04e-10, Postwar: 1.66e-09, Contemporary: 1.91e-09, Digital: 2.58e-09 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // ABOUT WOMEN
  { title: "De Mulieribus Claris", author: "Boccaccio", year: 1362, category: "Biography",
    query: "De Mulieribus Claris,Famous Women Boccaccio",
    byEra: { Romantic: 1.06e-10, Victorian: 5.08e-10, EarlyMod: 5.79e-10, Postwar: 1.83e-10, Contemporary: 6.61e-10, Digital: 8.61e-10 },
    pattern: "Variable", istcEditions: 9, ustcEditions: 15, totalEditions: 24 },
  { title: "Querelle des Femmes", author: "Various", year: 1500, category: "Feminism/Debate",
    query: "Defense of Women,Querelle des Femmes",
    byEra: { Romantic: 1.17e-10, Victorian: 1.53e-10, EarlyMod: 3.55e-09, Postwar: 6.20e-09, Contemporary: 8.87e-09, Digital: 1.08e-08 },
    pattern: "Modern rediscovery", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },

  // === ART / ARCHITECTURE ===
  { title: "De Re Aedificatoria", author: "Alberti", year: 1452, category: "Architecture",
    query: "De Re Aedificatoria",
    byEra: { Romantic: 3.03e-11, Victorian: 5.30e-11, EarlyMod: 6.33e-10, Postwar: 2.59e-09, Contemporary: 2.66e-09, Digital: 3.19e-09 },
    pattern: "Modern rediscovery", istcEditions: 3, ustcEditions: 12, totalEditions: 15 },
  { title: "De Pictura", author: "Alberti", year: 1435, category: "Art Theory",
    query: "De Pictura Alberti",
    byEra: { Romantic: 0, Victorian: 0, EarlyMod: 0, Postwar: 1.69e-11, Contemporary: 1.93e-11, Digital: 5.80e-11 },
    pattern: "Modern rediscovery", istcEditions: 2, ustcEditions: 8, totalEditions: 10 },
  { title: "Lives of the Artists", author: "Vasari", year: 1550, category: "Art History",
    query: "Lives of the Artists,Vasari Lives",
    byEra: { Romantic: 1.34e-09, Victorian: 9.99e-10, EarlyMod: 1.20e-09, Postwar: 3.45e-09, Contemporary: 1.07e-08, Digital: 2.02e-08 },
    pattern: "Sustained growth", istcEditions: 0, ustcEditions: 8, totalEditions: 8 },
  { title: "Il Libro dell'Arte", author: "Cennini", year: 1400, category: "Art Technique",
    query: "Il Libro dell'Arte,Cennini",
    byEra: { Romantic: 4.72e-08, Victorian: 4.81e-08, EarlyMod: 2.83e-08, Postwar: 2.54e-08, Contemporary: 2.68e-08, Digital: 3.25e-08 },
    pattern: "Victorian peak", istcEditions: 0, ustcEditions: 0, totalEditions: 0 },
];

// Color by pattern
const patternColors: Record<string, string> = {
  "Sustained growth": "#22c55e",
  "Modern rediscovery": "#3b82f6",
  "Postwar peak": "#f59e0b",
  "Victorian peak": "#8b5cf6",
  "Early Modern peak": "#06b6d4",
  "Stable canonical": "#6b7280",
  "Romantic peak": "#ec4899",
  "Variable": "#78716c",
};

// Format scientific notation for display
function formatFrequency(value: number): string {
  if (value === 0) return "0";
  if (value < 1e-12) return "<1e-12";
  const exp = Math.floor(Math.log10(value));
  const mantissa = value / Math.pow(10, exp);
  return `${mantissa.toFixed(1)}e${exp}`;
}

// Convert work data to chart format
function workToChartData(work: Work) {
  return ERAS.map(era => ({
    era: era.key,
    year: era.year,
    label: era.label,
    value: work.byEra[era.key as EraKey] || 0,
  }));
}

// Custom tooltip component
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #e5e2dc',
        borderRadius: '6px',
        padding: '8px 12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          fontWeight: 500,
          color: '#1a1612',
          margin: '0 0 4px 0',
        }}>{label}</p>
        {payload.map((entry, idx) => (
          <p key={idx} style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            color: entry.color,
            margin: 0,
          }}>
            {formatFrequency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

// Individual work chart component
function WorkChart({ work }: { work: Work }) {
  const data = workToChartData(work);
  const maxValue = Math.max(...data.map(d => d.value));
  const color = patternColors[work.pattern] || '#666';

  return (
    <div style={{ background: '#fff', borderRadius: '8px', padding: '20px', border: '1px solid #e5e2dc' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <h3 style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#1a1612',
              margin: 0,
              lineHeight: 1.2,
            }}>{work.title}</h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: '#888',
              margin: '4px 0 0 0',
            }}>
              {work.author} ({work.year > 0 ? work.year : `${Math.abs(work.year)} BC`})
            </p>
          </div>
          {(work.totalEditions ?? 0) > 0 && (
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <p style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '24px',
                fontWeight: 400,
                color: '#9e4a3a',
                margin: 0,
                lineHeight: 1,
              }}>{work.totalEditions}</p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '9px',
                color: '#aaa',
                margin: '2px 0 0 0',
              }}>editions 1450-1600</p>
            </div>
          )}
        </div>
      </div>

      <div className="h-40" style={{ minWidth: 200, minHeight: 120 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id={`gradient-${work.title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e2dc" />
            <XAxis
              dataKey="era"
              tick={{ fill: '#888', fontSize: 9 }}
              axisLine={{ stroke: '#d4d0c8' }}
              tickLine={{ stroke: '#d4d0c8' }}
            />
            <YAxis
              tick={{ fill: '#888', fontSize: 9 }}
              axisLine={{ stroke: '#d4d0c8' }}
              tickLine={{ stroke: '#d4d0c8' }}
              tickFormatter={(value) => {
                if (value === 0) return "0";
                const exp = Math.floor(Math.log10(value));
                return `1e${exp}`;
              }}
              domain={[0, maxValue * 1.1]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              fill={`url(#gradient-${work.title.replace(/\s/g, '')})`}
              stroke="none"
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, fill: color }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          color: '#888',
          background: '#f5f3ef',
          padding: '2px 8px',
          borderRadius: '4px',
        }}>{work.category}</span>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          color: color,
          fontWeight: 500,
        }}>{work.pattern}</span>
      </div>
    </div>
  );
}

// Comparison chart for multiple works
function ComparisonChart({ works, title }: { works: Work[]; title: string }) {
  const data = ERAS.map(era => {
    const point: Record<string, number | string> = {
      era: era.key,
      year: era.year,
    };
    works.forEach(work => {
      point[work.title] = work.byEra[era.key as EraKey] || 0;
    });
    return point;
  });

  return (
    <div style={{ background: '#fff', borderRadius: '8px', padding: '20px', border: '1px solid #e5e2dc' }}>
      <h3 style={{
        fontFamily: 'Cormorant Garamond, Georgia, serif',
        fontSize: '16px',
        fontWeight: 600,
        color: '#1a1612',
        margin: '0 0 16px 0',
      }}>{title}</h3>
      <div className="h-64" style={{ minWidth: 300, minHeight: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e2dc" />
            <XAxis
              dataKey="era"
              tick={{ fill: '#888', fontSize: 10 }}
              axisLine={{ stroke: '#d4d0c8' }}
            />
            <YAxis
              tick={{ fill: '#888', fontSize: 10 }}
              axisLine={{ stroke: '#d4d0c8' }}
              tickFormatter={(value) => {
                if (value === 0) return "0";
                const exp = Math.floor(Math.log10(value));
                return `1e${exp}`;
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '11px', fontFamily: 'Inter, sans-serif' }}
              iconType="line"
            />
            {works.map((work, idx) => (
              <Line
                key={work.title}
                type="monotone"
                dataKey={work.title}
                stroke={patternColors[work.pattern] || `hsl(${idx * 60}, 50%, 45%)`}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function SparklinePage() {
  const [view, setView] = useState<'grid' | 'comparison'>('grid');
  const [sortBy, setSortBy] = useState<'title' | 'year' | 'pattern' | 'category' | 'editions'>('editions');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPattern, setFilterPattern] = useState<string>('all');
  const [selectedWorks, setSelectedWorks] = useState<Set<string>>(new Set());

  const categories = useMemo(() => Array.from(new Set(WORKS.map(w => w.category))).sort(), []);
  const patterns = useMemo(() => Array.from(new Set(WORKS.map(w => w.pattern))).sort(), []);

  const sortedWorks = useMemo(() => {
    let filtered = WORKS;

    if (filterCategory !== 'all') {
      filtered = filtered.filter(w => w.category === filterCategory);
    }
    if (filterPattern !== 'all') {
      filtered = filtered.filter(w => w.pattern === filterPattern);
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'title': return a.title.localeCompare(b.title);
        case 'year': return a.year - b.year;
        case 'pattern': return a.pattern.localeCompare(b.pattern);
        case 'category': return a.category.localeCompare(b.category);
        case 'editions': return (b.totalEditions || 0) - (a.totalEditions || 0);
        default: return 0;
      }
    });
  }, [sortBy, filterCategory, filterPattern]);

  const toggleWork = (title: string) => {
    const newSelected = new Set(selectedWorks);
    if (newSelected.has(title)) {
      newSelected.delete(title);
    } else if (newSelected.size < 6) {
      newSelected.add(title);
    }
    setSelectedWorks(newSelected);
  };

  const selectedWorksList = WORKS.filter(w => selectedWorks.has(w.title));

  const worksByPattern = useMemo(() => {
    const grouped: Record<string, Work[]> = {};
    WORKS.forEach(work => {
      if (!grouped[work.pattern]) grouped[work.pattern] = [];
      grouped[work.pattern].push(work);
    });
    return grouped;
  }, []);

  const totalEditions = WORKS.reduce((sum, w) => sum + (w.totalEditions || 0), 0);

  return (
    <main style={{ minHeight: '100vh', background: '#fdfcf9' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 400,
            color: '#1a1612',
            margin: '0 0 12px 0',
          }}>
            Cultural Attention Over Time
          </h1>
          <p style={{
            fontFamily: 'Newsreader, Georgia, serif',
            fontSize: '17px',
            color: '#666',
            margin: '0 0 8px 0',
          }}>
            {WORKS.length} pre-modern works · {totalEditions.toLocaleString()} early editions · Google Ngram 1800–2019
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            color: '#22c55e',
            margin: 0,
          }}>
            All Ngram data verified from Google Books API (December 2024)
          </p>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
          padding: '16px 20px',
          background: '#fff',
          borderRadius: '8px',
          border: '1px solid #e5e2dc',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#888' }}>View:</span>
            <button
              onClick={() => setView('grid')}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                background: view === 'grid' ? '#9e4a3a' : '#f5f3ef',
                color: view === 'grid' ? '#fff' : '#666',
              }}
            >
              Individual
            </button>
            <button
              onClick={() => setView('comparison')}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                background: view === 'comparison' ? '#9e4a3a' : '#f5f3ef',
                color: view === 'comparison' ? '#fff' : '#666',
              }}
            >
              Compare
            </button>
          </div>

          {view === 'grid' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#888' }}>Sort:</span>
                {(['editions', 'pattern', 'year', 'title'] as const).map(key => (
                  <button
                    key={key}
                    onClick={() => setSortBy(key)}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      border: 'none',
                      cursor: 'pointer',
                      background: sortBy === key ? '#9e4a3a' : '#f5f3ef',
                      color: sortBy === key ? '#fff' : '#666',
                    }}
                  >
                    {key}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#888' }}>Filter:</span>
                <select
                  value={filterPattern}
                  onChange={(e) => setFilterPattern(e.target.value)}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #d4d0c8',
                    background: '#fff',
                    color: '#666',
                  }}
                >
                  <option value="all">All patterns</option>
                  {patterns.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #d4d0c8',
                    background: '#fff',
                    color: '#666',
                  }}
                >
                  <option value="all">All categories</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: '#888',
                marginLeft: 'auto',
              }}>{sortedWorks.length} works</span>
            </>
          )}
        </div>

        {/* Custom comparison */}
        {view === 'grid' && selectedWorks.size > 0 && (
          <div style={{
            marginBottom: '24px',
            padding: '16px',
            background: '#fff',
            borderRadius: '8px',
            border: '1px solid #e5e2dc',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#666' }}>
                Selected for comparison: {selectedWorks.size}/6
              </span>
              <button
                onClick={() => setSelectedWorks(new Set())}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#9e4a3a',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Clear
              </button>
            </div>
            {selectedWorksList.length >= 2 && (
              <ComparisonChart works={selectedWorksList} title="Custom Comparison" />
            )}
          </div>
        )}

        {/* Grid view */}
        {view === 'grid' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px',
          }}>
            {sortedWorks.map((work) => (
              <div key={work.title} style={{ position: 'relative' }}>
                <button
                  onClick={() => toggleWork(work.title)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 10,
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: selectedWorks.has(work.title) ? '2px solid #9e4a3a' : '2px solid #d4d0c8',
                    background: selectedWorks.has(work.title) ? '#9e4a3a' : '#fff',
                    color: selectedWorks.has(work.title) ? '#fff' : '#888',
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selectedWorks.has(work.title) ? '✓' : '+'}
                </button>
                <WorkChart work={work} />
              </div>
            ))}
          </div>
        )}

        {/* Comparison view */}
        {view === 'comparison' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {Object.entries(worksByPattern)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([pattern, works]) => (
                <div key={pattern}>
                  <h2 style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '20px',
                    fontWeight: 500,
                    color: '#1a1612',
                    margin: '0 0 16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                    <span style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '3px',
                      background: patternColors[pattern] || '#666',
                    }}></span>
                    {pattern}
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      color: '#888',
                      fontWeight: 400,
                    }}>({works.length} works)</span>
                  </h2>
                  <ComparisonChart
                    works={works.slice(0, 8)}
                    title={works.length > 8 ? `Top 8 of ${works.length} works` : `${works.length} works`}
                  />
                </div>
              ))}
          </div>
        )}

        {/* Methodology */}
        <div style={{
          marginTop: '40px',
          padding: '24px',
          background: '#fff',
          borderRadius: '8px',
          border: '1px solid #e5e2dc',
        }}>
          <h3 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '20px',
            fontWeight: 500,
            color: '#1a1612',
            margin: '0 0 16px 0',
          }}>Methodology & Data Sources</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <h4 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: '#9e4a3a',
                margin: '0 0 8px 0',
              }}>Ngram Frequency Data</h4>
              <p style={{
                fontFamily: 'Newsreader, Georgia, serif',
                fontSize: '15px',
                color: '#444',
                margin: 0,
                lineHeight: 1.6,
              }}>
                <strong>Source</strong>: Google Books Ngram Viewer API<br />
                <strong>Corpus</strong>: English (en-2019)<br />
                <strong>Smoothing</strong>: 3<br />
                <strong>Date retrieved</strong>: December 2024<br /><br />
                All {WORKS.length} works were queried directly from the API. Some works use combined queries
                (e.g., "Summa Theologica,Summa Theologiae") to capture title variants.
                Values represent frequency per billion words.
              </p>
            </div>

            <div>
              <h4 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: '#9e4a3a',
                margin: '0 0 8px 0',
              }}>Edition Counts</h4>
              <p style={{
                fontFamily: 'Newsreader, Georgia, serif',
                fontSize: '15px',
                color: '#444',
                margin: 0,
                lineHeight: 1.6,
              }}>
                <strong>ISTC</strong>: <a href="https://data.cerl.org/istc/" style={{ color: '#9e4a3a' }}>Incunabula Short Title Catalogue</a> (editions before 1501)<br />
                <strong>USTC</strong>: <a href="https://www.ustc.ac.uk/" style={{ color: '#9e4a3a' }}>Universal Short Title Catalogue</a> (16th century)<br /><br />
                Edition counts are from cached lookups and may not reflect latest database updates.
                Works showing 0 editions either circulated in manuscript, were published after 1600,
                or appear under variant titles not captured in our search.
              </p>
            </div>

            <div>
              <h4 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: '#9e4a3a',
                margin: '0 0 8px 0',
              }}>Verify This Data</h4>
              <p style={{
                fontFamily: 'Newsreader, Georgia, serif',
                fontSize: '15px',
                color: '#444',
                margin: 0,
                lineHeight: 1.6,
              }}>
                Run your own queries at <a href="https://books.google.com/ngrams" style={{ color: '#9e4a3a' }}>books.google.com/ngrams</a>.
                The exact query used for each work is stored in the source code.
              </p>
            </div>
          </div>
        </div>

        {/* Pattern Legend */}
        <div style={{
          marginTop: '20px',
          padding: '20px',
          background: '#fff',
          borderRadius: '8px',
          border: '1px solid #e5e2dc',
        }}>
          <h3 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: 600,
            color: '#888',
            margin: '0 0 12px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>Pattern Guide</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '10px',
          }}>
            {Object.entries(patternColors).map(([pattern, color]) => (
              <div key={pattern} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '3px',
                  background: color,
                }}></span>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#666',
                }}>{pattern}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{
          marginTop: '24px',
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          color: '#aaa',
        }}>
          All Ngram data from Google Books API · Edition counts from ISTC/USTC · December 2024
        </p>
      </div>
    </main>
  );
}
