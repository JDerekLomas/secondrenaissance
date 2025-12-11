import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getUserFromRequest } from '@/lib/supabase-server';

// GET: Get job details including pages
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    // Get job
    const { data: job, error: jobError } = await supabase
      .from('translation_jobs')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (jobError || !job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Get pages
    const { data: pages, error: pagesError } = await supabase
      .from('job_pages')
      .select('*')
      .eq('job_id', id)
      .order('page_number', { ascending: true });

    if (pagesError) {
      console.error('Pages fetch error:', pagesError);
    }

    return NextResponse.json({
      job,
      pages: pages || []
    });
  } catch (err) {
    console.error('Job fetch error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH: Update job (prompts, continue after review, cancel)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { prompts, status, action } = body;

    // Verify ownership
    const { data: existingJob, error: fetchError } = await supabase
      .from('translation_jobs')
      .select('id, status, user_id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingJob) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const updates: Record<string, unknown> = {};

    // Update prompts
    if (prompts) {
      updates.prompts = prompts;
    }

    // Handle actions
    if (action === 'continue') {
      // Continue after review - set status to processing_full
      if (existingJob.status !== 'awaiting_review') {
        return NextResponse.json(
          { error: 'Job is not awaiting review' },
          { status: 400 }
        );
      }
      updates.status = 'processing_full';
    } else if (action === 'cancel') {
      updates.status = 'cancelled';
    } else if (status) {
      // Direct status update (be careful with this)
      updates.status = status;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('translation_jobs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Job update error:', error);
      return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
    }

    return NextResponse.json({ job: data });
  } catch (err) {
    console.error('Job update error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE: Delete a job
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const { error } = await supabase
      .from('translation_jobs')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Job delete error:', error);
      return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Job delete error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
