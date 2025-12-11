'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/translate';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push(redirect);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-serif text-[#1a1612] hover:text-[#9e4a3a]">
            Second Renaissance
          </Link>
          <h1 className="mt-6 text-3xl font-serif text-[#1a1612]">Sign in</h1>
          <p className="mt-2 text-[#5c5c5c]">
            Access your translation projects
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1a1612]">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#d4c4b5] rounded-md shadow-sm focus:outline-none focus:ring-[#9e4a3a] focus:border-[#9e4a3a] bg-white"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#1a1612]">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#d4c4b5] rounded-md shadow-sm focus:outline-none focus:ring-[#9e4a3a] focus:border-[#9e4a3a] bg-white"
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9e4a3a] hover:bg-[#8a4033] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9e4a3a] disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#5c5c5c]">
          Don&apos;t have an account?{' '}
          <Link href={`/signup?redirect=${encodeURIComponent(redirect)}`} className="text-[#9e4a3a] hover:underline">
            Sign up
          </Link>
        </p>

        <p className="mt-4 text-center text-sm text-[#5c5c5c]">
          <Link href="/" className="hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
