'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function TranslateLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/translate');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#5c5c5c]">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* Header */}
      <header className="border-b border-[#d4c4b5] bg-white/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-serif text-[#1a1612] hover:text-[#9e4a3a]">
              Second Renaissance
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/translate" className="text-[#5c5c5c] hover:text-[#1a1612]">
                Dashboard
              </Link>
              <Link href="/translate/catalog" className="text-[#5c5c5c] hover:text-[#1a1612]">
                Browse Catalog
              </Link>
              <Link href="/translate/new" className="text-[#5c5c5c] hover:text-[#1a1612]">
                Upload PDF
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-[#5c5c5c]">{user.email}</span>
            <button
              onClick={() => signOut()}
              className="text-[#9e4a3a] hover:underline"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
