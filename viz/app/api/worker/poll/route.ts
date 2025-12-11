import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

// GET: Worker polls for next available job
export async function GET(request: NextRequest) {
  // Validate worker API key
  const workerKey = request.headers.get('X-Worker-Key');
  const expectedKey = process.env.WORKER_API_KEY;

  if (!expectedKey || workerKey !== expectedKey) {
    return NextResponse.json({ error: 'Invalid worker key' }, { status: 401 });
  }

  try {
    const supabase = createServerClient();

    // Find next job to process
    // Priority: processing_preview/processing_full (resume) > pending (new)
    const { data: job, error } = await supabase
      .from('translation_jobs')
      .select('*')
      .in('status', ['pending', 'processing_preview', 'processing_full'])
      .order('status', { ascending: true }) // pending comes after processing_*
      .order('created_at', { ascending: true })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned, which is fine
      console.error('Job poll error:', error);
      return NextResponse.json({ error: 'Failed to poll for jobs' }, { status: 500 });
    }

    if (!job) {
      return NextResponse.json({ job: null });
    }

    // Claim the job by updating its status
    let newStatus = job.status;
    if (job.status === 'pending') {
      newStatus = job.ia_identifier ? 'processing_preview' : 'rendering';
    }

    const { error: updateError } = await supabase
      .from('translation_jobs')
      .update({
        status: newStatus,
        started_at: job.started_at || new Date().toISOString()
      })
      .eq('id', job.id);

    if (updateError) {
      console.error('Job claim error:', updateError);
      return NextResponse.json({ error: 'Failed to claim job' }, { status: 500 });
    }

    return NextResponse.json({
      job: {
        ...job,
        status: newStatus
      }
    });
  } catch (err) {
    console.error('Job poll error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
