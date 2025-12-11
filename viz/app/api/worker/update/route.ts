import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

interface PageResult {
  page_number: number;
  image_url?: string;
  ocr_text?: string;
  translation_text?: string;
  summary_text?: string;
  status: string;
  processing_time_ms?: number;
  error_message?: string;
}

interface UpdatePayload {
  jobId: string;
  status?: string;
  total_pages?: number;
  pages_processed?: number;
  current_page?: number;
  error_message?: string;
  preview_completed_at?: string;
  completed_at?: string;
  page_result?: PageResult;
}

// POST: Worker reports progress/results
export async function POST(request: NextRequest) {
  // Validate worker API key
  const workerKey = request.headers.get('X-Worker-Key');
  const expectedKey = process.env.WORKER_API_KEY;

  if (!expectedKey || workerKey !== expectedKey) {
    return NextResponse.json({ error: 'Invalid worker key' }, { status: 401 });
  }

  try {
    const body: UpdatePayload = await request.json();
    const {
      jobId,
      status,
      total_pages,
      pages_processed,
      current_page,
      error_message,
      preview_completed_at,
      completed_at,
      page_result
    } = body;

    if (!jobId) {
      return NextResponse.json({ error: 'jobId is required' }, { status: 400 });
    }

    const supabase = createServerClient();

    // Update job fields
    const jobUpdates: Record<string, unknown> = {};

    if (status) jobUpdates.status = status;
    if (total_pages !== undefined) jobUpdates.total_pages = total_pages;
    if (pages_processed !== undefined) jobUpdates.pages_processed = pages_processed;
    if (current_page !== undefined) jobUpdates.current_page = current_page;
    if (error_message !== undefined) jobUpdates.error_message = error_message;
    if (preview_completed_at) jobUpdates.preview_completed_at = preview_completed_at;
    if (completed_at) jobUpdates.completed_at = completed_at;

    if (Object.keys(jobUpdates).length > 0) {
      const { error: jobError } = await supabase
        .from('translation_jobs')
        .update(jobUpdates)
        .eq('id', jobId);

      if (jobError) {
        console.error('Job update error:', jobError);
        return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
      }
    }

    // Insert/update page result if provided
    if (page_result) {
      const { error: pageError } = await supabase
        .from('job_pages')
        .upsert(
          {
            job_id: jobId,
            page_number: page_result.page_number,
            image_url: page_result.image_url,
            ocr_text: page_result.ocr_text,
            translation_text: page_result.translation_text,
            summary_text: page_result.summary_text,
            status: page_result.status,
            processing_time_ms: page_result.processing_time_ms,
            error_message: page_result.error_message,
            processed_at: page_result.status === 'completed' ? new Date().toISOString() : null
          },
          {
            onConflict: 'job_id,page_number'
          }
        );

      if (pageError) {
        console.error('Page upsert error:', pageError);
        return NextResponse.json({ error: 'Failed to save page result' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Worker update error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
