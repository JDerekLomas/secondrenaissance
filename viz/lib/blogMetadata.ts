import { Metadata } from 'next';

export interface BlogPostMeta {
  title: string;
  description: string;
  slug: string;
  date: string;
  image?: string;
  imageAlt?: string;
}

export function generateBlogMetadata(post: BlogPostMeta): Metadata {
  const url = `https://secondrenaissance.ai/blog/${post.slug}`;
  const image = post.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Vitruvian_macrocosm.jpg/800px-Vitruvian_macrocosm.jpg';

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: ['Second Renaissance Research'],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export function generateArticleJsonLd(post: BlogPostMeta): string {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'Second Renaissance Research',
      url: 'https://secondrenaissance.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Second Renaissance Research',
      url: 'https://secondrenaissance.ai',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://secondrenaissance.ai/blog/${post.slug}`,
    },
    image: post.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Vitruvian_macrocosm.jpg/800px-Vitruvian_macrocosm.jpg',
  };

  return JSON.stringify(jsonLd);
}
