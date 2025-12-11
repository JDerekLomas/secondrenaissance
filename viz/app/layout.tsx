import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import Navigation from "@/components/Navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Second Renaissance Research",
  description: "500,000 Latin works from 1450-1700. Less than 2% translated. The first Renaissance was sparked by rediscovering ancient texts—we're working to unlock the half million that came next.",
  openGraph: {
    title: "Second Renaissance Research",
    description: "500,000 Latin works from 1450-1700. Less than 2% translated. Unlocking the lost knowledge of the Renaissance.",
    url: "https://secondrenaissance.vercel.app",
    siteName: "Second Renaissance Research",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Vitruvian_macrocosm.jpg/800px-Vitruvian_macrocosm.jpg",
        width: 800,
        height: 986,
        alt: "Renaissance Man as Microcosm - Robert Fludd, 1617",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Second Renaissance Research",
    description: "500,000 Latin works from 1450-1700. Less than 2% translated.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Vitruvian_macrocosm.jpg/800px-Vitruvian_macrocosm.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#faf7f2] text-[#1a1612]`}
      >
        <AuthProvider>
          <Navigation />
          <div style={{ paddingTop: '64px' }}>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
