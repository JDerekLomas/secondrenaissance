import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import AdmZip from 'adm-zip';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ykhxaecbbxaaqlujuzde.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlraHhhZWNiYnhhYXFsdWp1emRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjExMDEsImV4cCI6MjA4MDYzNzEwMX0.O2chfnHGQWLOaVSFQ-F6UJMlya9EzPbsUh848SEOPj4';

// Create a supabase client with the user's auth token for RLS
function createSupabaseClient(token: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });
}

// Get token from request
function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.slice(7);
}

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
  const token = getTokenFromRequest(request);

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createSupabaseClient(token);

  // Verify the token and get user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);

  try {
    let query = supabase
      .from('translation_jobs')
      .select('*')
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
  const token = getTokenFromRequest(request);

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createSupabaseClient(token);

  // Verify the token and get user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
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
      max_pages?: number | null;
      pdf_path?: string;
      images_dir?: string;
      original_filename?: string;
      total_pages?: number;
    };

    // Handle multipart form data (PDF or ZIP upload) or JSON (IA identifier)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const pdfFile = formData.get('pdf') as File | null;
      const imagesFile = formData.get('images') as File | null;
      const provider = formData.get('provider') as string || 'openai';
      const promptsStr = formData.get('prompts') as string;
      const previewPages = parseInt(formData.get('preview_pages') as string || '30');
      const maxPagesStr = formData.get('max_pages') as string;
      const maxPages = maxPagesStr ? parseInt(maxPagesStr) : null;

      let prompts = DEFAULT_PROMPTS;
      if (promptsStr) {
        try {
          prompts = { ...DEFAULT_PROMPTS, ...JSON.parse(promptsStr) };
        } catch {
          // Use defaults if parse fails
        }
      }

      if (pdfFile) {
        // Save PDF to uploads directory
        const uploadsDir = path.join(process.cwd(), 'uploads', 'translations');
        await mkdir(uploadsDir, { recursive: true });

        const timestamp = Date.now();
        const filename = `${timestamp}_${pdfFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
        const filepath = path.join(uploadsDir, filename);

        const bytes = await pdfFile.arrayBuffer();
        await writeFile(filepath, Buffer.from(bytes));

        jobData = {
          pdf_path: filepath,
          original_filename: pdfFile.name,
          provider,
          prompts,
          preview_pages: previewPages,
          max_pages: maxPages
        };
      } else if (imagesFile) {
        // Handle ZIP of images
        const timestamp = Date.now();
        const jobDir = path.join(process.cwd(), 'uploads', 'translations', `images_${timestamp}`);
        await mkdir(jobDir, { recursive: true });

        // Save and extract ZIP
        const bytes = await imagesFile.arrayBuffer();
        const zip = new AdmZip(Buffer.from(bytes));
        const zipEntries = zip.getEntries();

        // Extract and sort image files
        const imageFiles: string[] = [];
        for (const entry of zipEntries) {
          if (entry.isDirectory) continue;
          const name = entry.entryName.toLowerCase();
          if (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg')) {
            // Extract to job directory
            const basename = path.basename(entry.entryName);
            zip.extractEntryTo(entry, jobDir, false, true);
            imageFiles.push(basename);
          }
        }

        // Sort files naturally (page_0001.png, page_0002.png, etc.)
        imageFiles.sort((a, b) => {
          const numA = parseInt(a.match(/\d+/)?.[0] || '0');
          const numB = parseInt(b.match(/\d+/)?.[0] || '0');
          return numA - numB;
        });

        if (imageFiles.length === 0) {
          return NextResponse.json({ error: 'No image files found in ZIP' }, { status: 400 });
        }

        jobData = {
          images_dir: jobDir,
          original_filename: imagesFile.name,
          total_pages: imageFiles.length,
          provider,
          prompts,
          preview_pages: Math.min(previewPages, imageFiles.length),
          max_pages: maxPages
        };
      } else {
        return NextResponse.json({ error: 'No PDF or images file provided' }, { status: 400 });
      }
    } else {
      // JSON body for IA identifier
      const body = await request.json();
      const { ia_identifier, title, creator, year, provider, prompts, preview_pages, max_pages } = body;

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
        preview_pages: preview_pages || 30,
        max_pages: max_pages || null
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
