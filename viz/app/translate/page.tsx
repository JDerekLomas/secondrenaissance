'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

interface TranslationJob {
  id: string;
  ia_identifier: string | null;
  original_filename: string | null;
  title: string | null;
  creator: string | null;
  year: number | null;
  status: string;
  provider: string;
  total_pages: number | null;
  preview_pages: number;
  pages_processed: number;
  created_at: string;
  preview_completed_at: string | null;
  completed_at: string | null;
  error_message: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-700',
  rendering: 'bg-blue-100 text-blue-700',
  processing_preview: 'bg-blue-100 text-blue-700',
  awaiting_review: 'bg-yellow-100 text-yellow-700',
  processing_full: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  cancelled: 'bg-gray-100 text-gray-500'
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  rendering: 'Rendering PDF',
  processing_preview: 'Processing Preview',
  awaiting_review: 'Awaiting Review',
  processing_full: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled'
};

export default function TranslateDashboard() {
  const { session } = useAuth();
  const [jobs, setJobs] = useState<TranslationJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    if (!session?.access_token) return;

    try {
      const response = await fetch('/api/translate/jobs', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();
      setJobs(data.jobs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, [session?.access_token]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    // Poll for updates every 10 seconds if there are active jobs
    const hasActiveJobs = jobs.some(j =>
      ['pending', 'rendering', 'processing_preview', 'processing_full'].includes(j.status)
    );

    if (!hasActiveJobs) return;

    const interval = setInterval(fetchJobs, 10000);
    return () => clearInterval(interval);
  }, [jobs, fetchJobs]);

  function getProgressPercent(job: TranslationJob): number {
    if (!job.total_pages) return 0;
    return Math.round((job.pages_processed / job.total_pages) * 100);
  }

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  if (loading) {
    return (
      <div className="text-center py-12 text-[#5c5c5c]">
        Loading your translation jobs...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#1a1612]">Translation Dashboard</h1>
          <p className="mt-2 text-[#5c5c5c]">
            Manage your Latin text translation projects
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/translate/catalog"
            className="px-4 py-2 border border-[#9e4a3a] text-[#9e4a3a] rounded hover:bg-[#9e4a3a]/5"
          >
            Browse IA Catalog
          </Link>
          <Link
            href="/translate/new"
            className="px-4 py-2 bg-[#9e4a3a] text-white rounded hover:bg-[#8a4033]"
          >
            Upload PDF
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {jobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-[#d4c4b5]">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-xl font-serif text-[#1a1612] mb-2">No translations yet</h2>
          <p className="text-[#5c5c5c] mb-6">
            Start by browsing the Internet Archive catalog or uploading a PDF
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/translate/catalog"
              className="px-4 py-2 border border-[#9e4a3a] text-[#9e4a3a] rounded hover:bg-[#9e4a3a]/5"
            >
              Browse Catalog
            </Link>
            <Link
              href="/translate/new"
              className="px-4 py-2 bg-[#9e4a3a] text-white rounded hover:bg-[#8a4033]"
            >
              Upload PDF
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => (
            <Link
              key={job.id}
              href={`/translate/${job.id}`}
              className="block bg-white rounded-lg border border-[#d4c4b5] p-6 hover:border-[#9e4a3a] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-[#1a1612]">
                      {job.title || job.original_filename || job.ia_identifier || 'Untitled'}
                    </h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${STATUS_COLORS[job.status]}`}>
                      {STATUS_LABELS[job.status]}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-[#5c5c5c]">
                    {job.creator && <span>{job.creator}</span>}
                    {job.year && <span>{job.year}</span>}
                    {job.ia_identifier && (
                      <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                        {job.ia_identifier}
                      </span>
                    )}
                    <span>Created {formatDate(job.created_at)}</span>
                  </div>

                  {/* Progress bar for active jobs */}
                  {['rendering', 'processing_preview', 'processing_full'].includes(job.status) && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-[#5c5c5c] mb-1">
                        <span>
                          {job.pages_processed} / {job.total_pages || '?'} pages
                        </span>
                        <span>{getProgressPercent(job)}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#9e4a3a] transition-all"
                          style={{ width: `${getProgressPercent(job)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Error message */}
                  {job.status === 'failed' && job.error_message && (
                    <div className="mt-3 text-sm text-red-600">
                      Error: {job.error_message}
                    </div>
                  )}
                </div>

                {/* Action hint */}
                <div className="ml-4">
                  {job.status === 'awaiting_review' && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                      Review & Continue →
                    </span>
                  )}
                  {job.status === 'completed' && (
                    <span className="text-[#5c5c5c] text-sm">
                      View results →
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
