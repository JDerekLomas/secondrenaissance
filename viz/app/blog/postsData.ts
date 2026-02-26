// Canonical ordered list of all blog posts (newest first)
// Used by BlogLayout to auto-compute prev/next navigation and related posts

export interface PostData {
  slug: string;
  title: string;
  category: string;
}

// Ordered newest → oldest
export const allPosts: PostData[] = [
  { slug: "vibecoding-renaissance", title: "Vibecoding and the Renaissance", category: "ideas" },
  { slug: "latin-translations-unesco", title: "Latin Translations Census", category: "translations" },
  { slug: "spread-of-printing", title: "How the Printing Press Spread Across Europe", category: "data" },
  { slug: "irish-intellect", title: "Irish Intellectual History", category: "people" },
  { slug: "drebbel-network", title: "The World of Cornelis Drebbel: A Social Network", category: "people" },
  { slug: "ficino-network", title: "Mapping the Transmission: From Ficino to Copernicus", category: "people" },
  { slug: "early-women-authors", title: "A Timeline of Early Women Authors", category: "people" },
  { slug: "women-writers", title: "The Rediscovery of Medieval Women Writers", category: "people" },
  { slug: "incunabula-citations", title: "Which Renaissance Books Are Scholars Actually Reading?", category: "data" },
  { slug: "cornelis-drebbel", title: "Cornelis Drebbel: The Dutch Alchemist Who Invented the Future", category: "people" },
  { slug: "progress-studies", title: "Progress Studies and the Renaissance", category: "ideas" },
  { slug: "pythagoras-sankhya", title: "The Golden Verses of Pythagoras", category: "ideas" },
  { slug: "sanskrit-manuscripts", title: "30 Million Manuscripts: India's NAMAMI Database", category: "ideas" },
  { slug: "printing-revolution", title: "The Printing Revolution: 1.6 Million Books Visualized", category: "data" },
  { slug: "sourcelibrary-vision", title: "SourceLibrary: A Vision for AI-Assisted Translation", category: "tools" },
  { slug: "llm-enrichment", title: "Teaching AI to Read 630,000 Renaissance Book Titles", category: "tools" },
  { slug: "bph-ia-matching", title: "From 2% to 26%: Matching Historical Catalogs", category: "esoterica" },
  { slug: "esoteric-digitization", title: "How Much Esoteric Latin Is Really Missing?", category: "esoterica" },
  { slug: "hidden-hermetic-library", title: "The Hidden Hermetic Library", category: "esoterica" },
  { slug: "death-of-latin", title: "The Death of Latin? What 1.6 Million Books Tell Us", category: "history" },
  { slug: "gaps-of-the-greats", title: "Gaps of the Greats: Major Untranslated Works", category: "authors" },
  { slug: "lost-books", title: "The Dark Matter of Book History", category: "history" },
  { slug: "theology-problem", title: "The Elephant in the Room: Latin Theological Works", category: "history" },
  { slug: "forgotten-1600s", title: "The Forgotten Seicento: Thinkers of the 1600s", category: "authors" },
  { slug: "forgotten-1500s", title: "The Forgotten Cinquecento: Thinkers of the 1500s", category: "authors" },
  { slug: "forgotten-1400s", title: "The Forgotten Quattrocento: Thinkers of the 1400s", category: "authors" },
  { slug: "why-latin-matters", title: "Why Latin Matters: 500,000 Unread Books", category: "translations" },
  { slug: "roadmap", title: "Translation Roadmap: Renaissance Latin Works", category: "translations" },
  { slug: "forgotten-authors", title: "The Forgotten Giants: Prolific Authors You've Never Heard Of", category: "authors" },
  { slug: "famous-humanists", title: "Even Ficino Isn't Fully Translated", category: "authors" },
  { slug: "renaissance-bestsellers", title: "Renaissance Bestsellers Nobody Reads", category: "history" },
  { slug: "translation-gap", title: "The Translation Gap: 95% of Latin Literature is Locked Away", category: "translations" },
  { slug: "hunting-for-translations", title: "Hunting for Translations", category: "translations" },
  { slug: "mapping-translations", title: "Mapping the Translation Landscape", category: "translations" },
  { slug: "rivers-of-esoteric-life", title: "Rivers of Esoteric Life", category: "esoterica" },
  { slug: "methodology", title: "Methodology: How We Estimated Digitization Rates", category: "data" },
  { slug: "digitization-gap", title: "The Digitization Gap: What's Online and What's Not", category: "data" },
  { slug: "esoteric-timeline", title: "Rivers of Esoteric Life: Interactive Timeline", category: "esoterica" },
  { slug: "natural-philosophy-sample", title: "Sample: Natural Philosophy Titles", category: "data" },
  { slug: "philosophy-sample", title: "Sample: Philosophy Titles", category: "data" },
];

export function getPostNav(slug: string) {
  const index = allPosts.findIndex(p => p.slug === slug);
  if (index === -1) return { prevPost: undefined, nextPost: undefined };

  // prevPost = older (higher index), nextPost = newer (lower index)
  const prevPost = index < allPosts.length - 1
    ? { href: `/blog/${allPosts[index + 1].slug}`, title: allPosts[index + 1].title }
    : undefined;
  const nextPost = index > 0
    ? { href: `/blog/${allPosts[index - 1].slug}`, title: allPosts[index - 1].title }
    : undefined;

  return { prevPost, nextPost };
}

export function getRelatedPosts(slug: string, count = 3): PostData[] {
  const index = allPosts.findIndex(p => p.slug === slug);
  if (index === -1) return [];

  const current = allPosts[index];
  const sameCategory = allPosts.filter(p => p.slug !== slug && p.category === current.category);

  if (sameCategory.length >= count) {
    return sameCategory.slice(0, count);
  }

  // Fill with adjacent posts if not enough in same category
  const result = [...sameCategory];
  for (const post of allPosts) {
    if (result.length >= count) break;
    if (post.slug !== slug && !result.find(r => r.slug === post.slug)) {
      result.push(post);
    }
  }
  return result.slice(0, count);
}
