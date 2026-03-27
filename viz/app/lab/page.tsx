import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lab',
  description: 'Interactive visualizations exploring 500,000 Latin works from 1450-1700.',
};

interface Viz {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD for sorting
  url: string;
  screenshot: string;
  site: 'Source Library' | 'Second Renaissance';
  tech: string;
  status: 'live' | 'beta' | 'prototype';
}

const visualizations: Viz[] = [
  {
    slug: 'image-deep-zoom',
    title: 'Image Deep Zoom',
    description: '39,783 illustrations from pre-modern texts, clustered by visual similarity. Tile-based renderer with quadtree spatial indexing — zoom from 40K dots down to individual thumbnails.',
    date: '2026-03-27',
    url: 'https://sourcelibrary.org/research/image-atlas',
    screenshot: '/lab-screenshots/image-atlas.jpg',
    site: 'Source Library',
    tech: 'Canvas tiles, QuadTree',
    status: 'beta',
  },
  {
    slug: 'book-atlas',
    title: 'Book Atlas',
    description: '3,500+ pre-modern texts as a navigable 3D constellation, clustered by content similarity using AI embeddings and UMAP dimensionality reduction.',
    date: '2026-03-20',
    url: 'https://sourcelibrary.org/research/atlas',
    screenshot: '/lab-screenshots/book-atlas.jpg',
    site: 'Source Library',
    tech: 'Three.js, WebGL',
    status: 'live',
  },
  {
    slug: 'concept-diffusion',
    title: 'Concept Diffusion',
    description: 'How concepts and vocabulary spread across centuries and languages in 2,400+ translated texts. Track individual terms through time.',
    date: '2026-03-18',
    url: 'https://sourcelibrary.org/research/concept-diffusion',
    screenshot: '/lab-screenshots/concept-diffusion.jpg',
    site: 'Source Library',
    tech: 'SVG charts',
    status: 'live',
  },
  {
    slug: 'rivers',
    title: 'Rivers of Tradition',
    description: 'Sankey flow diagram tracking 9 occult and esoteric traditions — Hermetica, Alchemy, Mysticism, Kabbalah, Neoplatonism and more — from 1469 to 1750.',
    date: '2026-03-15',
    url: 'https://secondrenaissance.vercel.app/rivers',
    screenshot: '/lab-screenshots/rivers.jpg',
    site: 'Second Renaissance',
    tech: 'D3 Sankey',
    status: 'live',
  },
  {
    slug: 'printing-map',
    title: 'Printing Centers Map',
    description: 'Animated map of Latin printing spreading across 48 European cities from 1450 to 1700. Watch Gutenberg\'s invention ripple outward.',
    date: '2026-03-12',
    url: 'https://secondrenaissance.vercel.app/map',
    screenshot: '/lab-screenshots/map.jpg',
    site: 'Second Renaissance',
    tech: 'deck.gl, MapLibre',
    status: 'live',
  },
  {
    slug: 'translation-lag',
    title: 'Translation Lag',
    description: 'Scatter plot showing the gap between when works were composed and when they were first translated. Some waited 2,000 years.',
    date: '2026-03-08',
    url: 'https://sourcelibrary.org/research/translation-lag',
    screenshot: '/lab-screenshots/translation-lag.jpg',
    site: 'Source Library',
    tech: 'SVG scatter plot',
    status: 'live',
  },
  {
    slug: 'timelines',
    title: 'Timelines',
    description: 'Three switchable timelines: lives of 47 Renaissance thinkers, 50 most prolific printers, and authors by edition count.',
    date: '2026-03-05',
    url: 'https://secondrenaissance.vercel.app/timelines',
    screenshot: '/lab-screenshots/timelines.jpg',
    site: 'Second Renaissance',
    tech: 'Custom SVG',
    status: 'live',
  },
  {
    slug: 'influence',
    title: 'Influence Analysis',
    description: 'Multi-dimensional influence scoring combining ISTC/USTC edition counts, Google Scholar citations, and Ngram cultural presence.',
    date: '2026-03-01',
    url: 'https://secondrenaissance.vercel.app/influence',
    screenshot: '/lab-screenshots/influence.jpg',
    site: 'Second Renaissance',
    tech: 'Recharts',
    status: 'live',
  },
  {
    slug: 'sparklines',
    title: 'Sparklines',
    description: 'Google Ngram trends for 150+ classical and Renaissance works. Which ancient texts are gaining modern readership?',
    date: '2026-02-25',
    url: 'https://secondrenaissance.vercel.app/sparklines',
    screenshot: '/lab-screenshots/sparklines.jpg',
    site: 'Second Renaissance',
    tech: 'Recharts',
    status: 'live',
  },
  {
    slug: 'explore',
    title: 'USTC Explorer',
    description: 'Dashboard of 556,000 Latin works: language trends, accessibility funnel, printing centers, subject classifications.',
    date: '2026-02-20',
    url: 'https://secondrenaissance.vercel.app/explore',
    screenshot: '/lab-screenshots/explore.jpg',
    site: 'Second Renaissance',
    tech: 'Recharts',
    status: 'live',
  },
  {
    slug: 'de-mysteriis',
    title: 'De Mysteriis',
    description: 'Interactive celestial hierarchy inspired by Iamblichus\' Neoplatonic philosophy. Explore the chain of being from The Good to rational souls.',
    date: '2026-02-15',
    url: 'https://secondrenaissance.vercel.app/de-mysteriis',
    screenshot: '/lab-screenshots/de-mysteriis.jpg',
    site: 'Second Renaissance',
    tech: 'Canvas, particles',
    status: 'prototype',
  },
  {
    slug: 'gallery',
    title: 'Renaissance Gallery',
    description: 'Curated collection of Renaissance esoteric and scientific artwork from Wikimedia Commons. Alchemy, Hermeticism, natural philosophy.',
    date: '2026-02-10',
    url: 'https://secondrenaissance.vercel.app/gallery',
    screenshot: '/lab-screenshots/gallery.jpg',
    site: 'Second Renaissance',
    tech: 'CSS masonry',
    status: 'live',
  },
  {
    slug: 'progress',
    title: 'Development Progress',
    description: 'Live charts tracking Source Library growth: book collection, OCR pages processed, translations completed, commit velocity.',
    date: '2026-02-05',
    url: 'https://sourcelibrary.org/progress',
    screenshot: '/lab-screenshots/progress.jpg',
    site: 'Source Library',
    tech: 'SVG area/bar charts',
    status: 'live',
  },
  {
    slug: 'rithmomachia',
    title: 'Rithmomachia',
    description: 'Playable medieval number game from the 11th century. Challenge AI opponents at the "Philosopher\'s Game" that once rivaled chess.',
    date: '2026-01-20',
    url: 'https://sourcelibrary.org/rithmomachia',
    screenshot: '/lab-screenshots/rithmomachia.jpg',
    site: 'Source Library',
    tech: 'Canvas game engine',
    status: 'live',
  },
];

// Already sorted by date descending in the array above
const sortedViz = visualizations;

function StatusBadge({ status }: { status: Viz['status'] }) {
  const styles = {
    live: 'bg-emerald-100 text-emerald-800',
    beta: 'bg-amber-100 text-amber-800',
    prototype: 'bg-purple-100 text-purple-800',
  };
  return (
    <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
}

function SiteBadge({ site }: { site: Viz['site'] }) {
  return (
    <span className="text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
      {site}
    </span>
  );
}

export default function LabPage() {
  return (
    <main className="min-h-screen" style={{ background: '#fdfcf9' }}>
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <h1
          className="text-4xl md:text-5xl font-normal mb-4"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          Lab
        </h1>
        <p className="text-stone-600 text-lg leading-relaxed max-w-2xl">
          Interactive visualizations exploring 500,000 Latin works printed between 1450 and 1700.
          Each experiment reveals a different facet of early modern knowledge — its geography,
          its intellectual currents, its forgotten authors.
        </p>
        <p className="text-stone-400 text-sm mt-4">
          {sortedViz.length} visualizations across{' '}
          <a href="https://sourcelibrary.org" className="underline hover:text-stone-600">Source Library</a> and{' '}
          <a href="https://secondrenaissance.vercel.app" className="underline hover:text-stone-600">Second Renaissance</a>
        </p>
      </section>

      {/* Visualization list */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="space-y-16">
          {sortedViz.map((viz) => (
            <article key={viz.slug} className="group">
              <a
                href={viz.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {/* Screenshot */}
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-stone-100 border border-stone-200 mb-5
                  group-hover:border-stone-300 group-hover:shadow-lg transition-all duration-300">
                  <Image
                    src={viz.screenshot}
                    alt={viz.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity
                      bg-white/90 backdrop-blur-sm text-stone-800 text-sm font-medium px-4 py-2 rounded-lg shadow">
                      Open visualization
                    </span>
                  </div>
                </div>
              </a>

              {/* Meta */}
              <div className="flex items-center gap-3 mb-2">
                <time className="text-xs text-stone-400 tabular-nums">{viz.date}</time>
                <StatusBadge status={viz.status} />
                <SiteBadge site={viz.site} />
                <span className="text-[10px] text-stone-400">{viz.tech}</span>
              </div>

              {/* Title + description */}
              <a
                href={viz.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <h2
                  className="text-2xl font-normal mb-2 group-hover:text-amber-900 transition-colors"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  {viz.title}
                </h2>
              </a>
              <p className="text-stone-600 text-sm leading-relaxed max-w-xl">
                {viz.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
