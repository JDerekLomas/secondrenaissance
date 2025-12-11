import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Embassy of the Free Mind Catalog | Second Renaissance',
  description: 'Browse 28,000 works on esotericism, hermetica, alchemy, and mysticism from the Bibliotheca Philosophica Hermetica. Find digitized versions on Internet Archive.',
  openGraph: {
    title: 'Embassy of the Free Mind — Hermetic Library Catalog',
    description: 'Browse 28,000 works on esotericism, hermetica, alchemy, and mysticism. Find digitized versions on Internet Archive.',
    url: 'https://secondrenaissance.vercel.app/bph',
    siteName: 'Second Renaissance Research',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Michael_Maier_Atalanta_Fugiens.jpeg/800px-Michael_Maier_Atalanta_Fugiens.jpeg',
        width: 800,
        height: 627,
        alt: 'Atalanta Fugiens - Michael Maier, 1617 - Alchemical emblem',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Embassy of the Free Mind — Hermetic Library',
    description: 'Browse 28,000 works on esotericism, hermetica, alchemy, and mysticism.',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Michael_Maier_Atalanta_Fugiens.jpeg/800px-Michael_Maier_Atalanta_Fugiens.jpeg'],
  },
};

export default function BPHLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
