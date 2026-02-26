import { MetadataRoute } from 'next'

// Blog posts with their dates for sitemap
const blogPosts = [
  { slug: "vibecoding-renaissance", date: "2026-02-08" },
  { slug: "latin-translations-unesco", date: "2025-02-09" },
  { slug: "spread-of-printing", date: "2025-12-31" },
  { slug: "irish-intellect", date: "2025-12-27" },
  { slug: "drebbel-network", date: "2025-12-26" },
  { slug: "ficino-network", date: "2025-12-25" },
  { slug: "early-women-authors", date: "2025-12-25" },
  { slug: "women-writers", date: "2025-12-23" },
  { slug: "incunabula-citations", date: "2025-12-22" },
  { slug: "cornelis-drebbel", date: "2025-12-21" },
  { slug: "progress-studies", date: "2025-12-20" },
  { slug: "pythagoras-sankhya", date: "2025-12-18" },
  { slug: "sanskrit-manuscripts", date: "2025-12-18" },
  { slug: "printing-revolution", date: "2025-12-17" },
  { slug: "sourcelibrary-vision", date: "2025-12-12" },
  { slug: "bph-ia-matching", date: "2025-12-10" },
  { slug: "esoteric-digitization", date: "2025-12-08" },
  { slug: "hidden-hermetic-library", date: "2025-12-07" },
  { slug: "death-of-latin", date: "2025-12-06" },
  { slug: "gaps-of-the-greats", date: "2025-12-06" },
  { slug: "lost-books", date: "2025-12-05" },
  { slug: "theology-problem", date: "2025-12-04" },
  { slug: "forgotten-1600s", date: "2025-12-03" },
  { slug: "forgotten-1500s", date: "2025-12-02" },
  { slug: "forgotten-1400s", date: "2025-12-01" },
  { slug: "roadmap", date: "2025-12-01" },
  { slug: "why-latin-matters", date: "2025-12-01" },
  { slug: "forgotten-authors", date: "2025-11-30" },
  { slug: "famous-humanists", date: "2025-11-28" },
  { slug: "renaissance-bestsellers", date: "2025-11-26" },
  { slug: "translation-gap", date: "2025-11-24" },
  { slug: "hunting-for-translations", date: "2025-11-22" },
  { slug: "mapping-translations", date: "2025-11-20" },
  { slug: "rivers-of-esoteric-life", date: "2025-11-15" },
  { slug: "methodology", date: "2025-11-10" },
  { slug: "digitization-gap", date: "2025-11-01" },
  { slug: "esoteric-timeline", date: "2025-11-01" },
  { slug: "natural-philosophy-sample", date: "2025-11-01" },
  { slug: "philosophy-sample", date: "2025-11-01" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.secondrenaissance.ai';

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bph`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/data`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contribute`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/de-mysteriis`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...mainPages, ...blogPages];
}
