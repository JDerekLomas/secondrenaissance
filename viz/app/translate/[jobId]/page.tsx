'use client';

import { useState, useEffect, use, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

interface JobPage {
  id: string;
  page_number: number;
  image_url: string | null;
  ocr_text: string | null;
  translation_text: string | null;
  summary_text: string | null;
  status: string;
  processed_at: string | null;
}

interface TranslationJob {
  id: string;
  ia_identifier: string | null;
  pdf_path: string | null;
  original_filename: string | null;
  title: string | null;
  creator: string | null;
  year: number | null;
  status: string;
  provider: string;
  prompts: Record<string, string>;
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

export default function JobDetail({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  const { session } = useAuth();

  const [job, setJob] = useState<TranslationJob | null>(null);
  const [pages, setPages] = useState<JobPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedPage, setSelectedPage] = useState<JobPage | null>(null);
  const [editedPrompts, setEditedPrompts] = useState<Record<string, string>>({});
  const [showPromptEditor, setShowPromptEditor] = useState(false);
  const [continuing, setContinuing] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const fetchJob = useCallback(async () => {
    if (!session?.access_token) return;

    try {
      const response = await fetch(`/api/translate/jobs/${jobId}`, {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Job not found');
        }
        throw new Error('Failed to fetch job');
      }

      const data = await response.json();
      setJob(data.job);
      setPages(data.pages);
      setEditedPrompts(data.job.prompts || {});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load job');
    } finally {
      setLoading(false);
    }
  }, [session?.access_token, jobId]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  useEffect(() => {
    // Poll for updates during processing
    if (!job || !['pending', 'rendering', 'processing_preview', 'processing_full'].includes(job.status)) {
      return;
    }

    const interval = setInterval(fetchJob, 5000);
    return () => clearInterval(interval);
  }, [job, fetchJob]);

  async function continueJob() {
    if (!session?.access_token || !job) return;

    setContinuing(true);

    try {
      const response = await fetch(`/api/translate/jobs/${jobId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'continue',
          prompts: editedPrompts
        })
      });

      if (!response.ok) {
        throw new Error('Failed to continue job');
      }

      await fetchJob();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to continue');
    } finally {
      setContinuing(false);
    }
  }

  async function cancelJob() {
    if (!session?.access_token || !job) return;

    if (!confirm('Are you sure you want to cancel this job?')) return;

    setCancelling(true);

    try {
      const response = await fetch(`/api/translate/jobs/${jobId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'cancel' })
      });

      if (!response.ok) {
        throw new Error('Failed to cancel job');
      }

      await fetchJob();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel');
    } finally {
      setCancelling(false);
    }
  }

  function getProgressPercent(): number {
    if (!job?.total_pages) return 0;
    return Math.round((job.pages_processed / job.total_pages) * 100);
  }

  if (loading) {
    return (
      <div className="text-center py-12 text-[#5c5c5c]">
        Loading job details...
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error || 'Job not found'}</div>
        <Link href="/translate" className="text-[#9e4a3a] hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-serif text-[#1a1612]">
            {job.title || job.original_filename || job.ia_identifier || 'Translation Job'}
          </h1>
          <span className={`px-3 py-1 text-sm rounded-full ${STATUS_COLORS[job.status]}`}>
            {STATUS_LABELS[job.status]}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-[#5c5c5c]">
          {job.creator && <span>{job.creator}</span>}
          {job.year && <span>{job.year}</span>}
          {job.ia_identifier && (
            <a
              href={`https://archive.org/details/${job.ia_identifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9e4a3a] hover:underline"
            >
              View on Internet Archive ↗
            </a>
          )}
        </div>
      </div>

      {/* Progress bar for active jobs */}
      {['rendering', 'processing_preview', 'processing_full'].includes(job.status) && (
        <div className="mb-8 bg-white rounded-lg border border-[#d4c4b5] p-6">
          <div className="flex items-center justify-between text-sm text-[#5c5c5c] mb-2">
            <span>
              Processing page {job.pages_processed} of {job.total_pages || '?'}
            </span>
            <span>{getProgressPercent()}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#9e4a3a] transition-all"
              style={{ width: `${getProgressPercent()}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-[#5c5c5c]">
            {job.status === 'processing_preview'
              ? `Processing first ${job.preview_pages} pages for preview...`
              : 'Processing remaining pages...'}
          </p>
        </div>
      )}

      {/* Awaiting review section */}
      {job.status === 'awaiting_review' && (
        <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-yellow-800 mb-2">
            Preview Complete - Ready for Review
          </h2>
          <p className="text-sm text-yellow-700 mb-4">
            The first {job.preview_pages} pages have been processed. Review the results below,
            edit prompts if needed, then continue to process the remaining pages.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPromptEditor(!showPromptEditor)}
              className="px-4 py-2 border border-yellow-600 text-yellow-700 rounded hover:bg-yellow-100"
            >
              {showPromptEditor ? 'Hide Prompts' : 'Edit Prompts'}
            </button>
            <button
              onClick={continueJob}
              disabled={continuing}
              className="px-4 py-2 bg-[#9e4a3a] text-white rounded hover:bg-[#8a4033] disabled:opacity-50"
            >
              {continuing ? 'Starting...' : 'Continue Processing'}
            </button>
            <button
              onClick={cancelJob}
              disabled={cancelling}
              className="px-4 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-50"
            >
              Cancel Job
            </button>
          </div>

          {/* Prompt editor */}
          {showPromptEditor && (
            <div className="mt-6 space-y-4">
              {['ocr', 'translation', 'summary'].map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-yellow-800 mb-1 capitalize">
                    {key} Prompt
                  </label>
                  <textarea
                    value={editedPrompts[key] || ''}
                    onChange={(e) => setEditedPrompts({
                      ...editedPrompts,
                      [key]: e.target.value
                    })}
                    rows={6}
                    className="w-full px-3 py-2 border border-yellow-300 rounded font-mono text-sm bg-white"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      {job.status === 'failed' && job.error_message && (
        <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-red-800 mb-2">Job Failed</h2>
          <p className="text-sm text-red-700">{job.error_message}</p>
        </div>
      )}

      {/* Pages grid */}
      {pages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-serif text-[#1a1612] mb-4">
            Processed Pages ({pages.filter(p => p.status === 'completed').length} / {pages.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setSelectedPage(page)}
                className={`text-left bg-white rounded-lg border p-4 hover:border-[#9e4a3a] transition-colors ${
                  page.status === 'completed' ? 'border-[#d4c4b5]' : 'border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[#1a1612]">Page {page.page_number}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    page.status === 'completed' ? 'bg-green-100 text-green-700' :
                    page.status === 'failed' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {page.status}
                  </span>
                </div>

                {page.ocr_text && (
                  <p className="text-xs text-[#5c5c5c] line-clamp-3 font-mono">
                    {page.ocr_text.slice(0, 150)}...
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Page detail modal */}
      {selectedPage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-[#d4c4b5] flex items-center justify-between">
              <h3 className="text-lg font-medium text-[#1a1612]">
                Page {selectedPage.page_number}
              </h3>
              <button
                onClick={() => setSelectedPage(null)}
                className="text-[#5c5c5c] hover:text-[#1a1612]"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image */}
                {selectedPage.image_url && (
                  <div>
                    <h4 className="text-sm font-medium text-[#1a1612] mb-2">Source Image</h4>
                    <img
                      src={selectedPage.image_url}
                      alt={`Page ${selectedPage.page_number}`}
                      className="w-full rounded border border-[#d4c4b5]"
                    />
                  </div>
                )}

                {/* OCR */}
                <div>
                  <h4 className="text-sm font-medium text-[#1a1612] mb-2">OCR Text (Latin)</h4>
                  <div className="bg-[#faf7f2] rounded p-4 text-sm font-mono whitespace-pre-wrap max-h-[400px] overflow-auto">
                    {selectedPage.ocr_text || 'No OCR text yet'}
                  </div>
                </div>

                {/* Translation */}
                <div className="lg:col-span-2">
                  <h4 className="text-sm font-medium text-[#1a1612] mb-2">English Translation</h4>
                  <div className="bg-white border border-[#d4c4b5] rounded p-4 text-sm whitespace-pre-wrap">
                    {selectedPage.translation_text || 'No translation yet'}
                  </div>
                </div>

                {/* Summary */}
                {selectedPage.summary_text && (
                  <div className="lg:col-span-2">
                    <h4 className="text-sm font-medium text-[#1a1612] mb-2">Summary</h4>
                    <div className="bg-[#faf7f2] rounded p-4 text-sm">
                      {selectedPage.summary_text}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {pages.length === 0 && !['pending', 'rendering'].includes(job.status) && (
        <div className="text-center py-12 bg-white rounded-lg border border-[#d4c4b5]">
          <p className="text-[#5c5c5c]">No pages processed yet</p>
        </div>
      )}
    </div>
  );
}
