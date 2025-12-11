'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/translate';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-serif text-[#1a1612] hover:text-[#9e4a3a]">
              Second Renaissance
            </Link>
          </div>

          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-8 rounded-lg">
            <h2 className="text-xl font-serif mb-2">Check your email</h2>
            <p className="text-sm">
              We&apos;ve sent a confirmation link to <strong>{email}</strong>.
              Click the link to activate your account.
            </p>
          </div>

          <p className="mt-6 text-sm text-[#5c5c5c]">
            <Link href="/login" className="text-[#9e4a3a] hover:underline">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-serif text-[#1a1612] hover:text-[#9e4a3a]">
            Second Renaissance
          </Link>
          <h1 className="mt-6 text-3xl font-serif text-[#1a1612]">Create an account</h1>
          <p className="mt-2 text-[#5c5c5c]">
            Start translating Renaissance Latin texts
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
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1a1612]">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#d4c4b5] rounded-md shadow-sm focus:outline-none focus:ring-[#9e4a3a] focus:border-[#9e4a3a] bg-white"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9e4a3a] hover:bg-[#8a4033] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9e4a3a] disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#5c5c5c]">
          Already have an account?{' '}
          <Link href={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-[#9e4a3a] hover:underline">
            Sign in
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

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
