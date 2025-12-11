import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getUserFromRequest } from '@/lib/supabase-server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Default prompts
const DEFAULT_PROMPTS = {
  ocr: `You are transcribing a Renaissance Latin facsimile page image.

Instructions:
- Transcribe all Latin text faithfully, including abbreviations
- Preserve paragraph breaks
- Expand common abbreviations in [brackets] where clear (e.g., [que] for ꝗ)
- Note any unclear sections with [?]
- Include page numbers if visible
- Skip decorative elements, focus on the text
- For Greek text, transcribe using Greek letters

Output only the transcription, no commentary.`,

  translation: `Translate the following Latin text to English.

Instructions:
- Provide an accurate, readable English translation
- Preserve paragraph structure
- For technical/philosophical terms, provide the Latin in parentheses on first use
- Maintain the scholarly tone of the original
- If there are unclear passages marked with [?], translate as best you can and note uncertainty

Provide only the English translation, no commentary.`,

  summary: `Summarize the contents of this page for a general, non-specialist reader.

Instructions:
- Write 3-5 sentences
- Mention key people, ideas, and why the content matters
- Use accessible language, explain any jargon
- Optionally use bullet points if helpful

Provide only the summary.`
};

// GET: List user's jobs
export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);

  try {
    let query = supabase
      .from('translation_jobs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Jobs fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
    }

    return NextResponse.json({ jobs: data || [] });
  } catch (err) {
    console.error('Jobs fetch error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST: Create a new job
export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const contentType = request.headers.get('content-type') || '';

    let jobData: {
      ia_identifier?: string;
      title?: string;
      creator?: string;
      year?: number;
      provider?: string;
      prompts?: Record<string, string>;
      preview_pages?: number;
      pdf_path?: string;
      original_filename?: string;
    };

    // Handle multipart form data (PDF upload) or JSON (IA identifier)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('pdf') as File | null;
      const provider = formData.get('provider') as string || 'openai';
      const promptsStr = formData.get('prompts') as string;
      const previewPages = parseInt(formData.get('preview_pages') as string || '30');

      if (!file) {
        return NextResponse.json({ error: 'No PDF file provided' }, { status: 400 });
      }

      // Save PDF to uploads directory
      const uploadsDir = path.join(process.cwd(), 'uploads', 'translations');
      await mkdir(uploadsDir, { recursive: true });

      const timestamp = Date.now();
      const filename = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const filepath = path.join(uploadsDir, filename);

      const bytes = await file.arrayBuffer();
      await writeFile(filepath, Buffer.from(bytes));

      let prompts = DEFAULT_PROMPTS;
      if (promptsStr) {
        try {
          prompts = { ...DEFAULT_PROMPTS, ...JSON.parse(promptsStr) };
        } catch {
          // Use defaults if parse fails
        }
      }

      jobData = {
        pdf_path: filepath,
        original_filename: file.name,
        provider,
        prompts,
        preview_pages: previewPages
      };
    } else {
      // JSON body for IA identifier
      const body = await request.json();
      const { ia_identifier, title, creator, year, provider, prompts, preview_pages } = body;

      if (!ia_identifier) {
        return NextResponse.json({ error: 'ia_identifier is required' }, { status: 400 });
      }

      jobData = {
        ia_identifier,
        title,
        creator,
        year,
        provider: provider || 'openai',
        prompts: { ...DEFAULT_PROMPTS, ...prompts },
        preview_pages: preview_pages || 30
      };
    }

    // Insert job into database
    const { data, error } = await supabase
      .from('translation_jobs')
      .insert({
        user_id: user.id,
        ...jobData,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Job creation error:', error);
      return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
    }

    return NextResponse.json({ job: data }, { status: 201 });
  } catch (err) {
    console.error('Job creation error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
