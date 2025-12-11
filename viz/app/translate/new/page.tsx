'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

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

const PROMPT_STAGES = [
  {
    id: 'ocr',
    title: 'OCR Prompt',
    description: 'Instructions for transcribing page images into Latin text'
  },
  {
    id: 'translation',
    title: 'Translation Prompt',
    description: 'Guidelines for translating Latin to accessible English'
  },
  {
    id: 'summary',
    title: 'Summary Prompt',
    description: 'Template for generating page summaries (optional)'
  }
];

export default function NewTranslation() {
  const { session } = useAuth();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [provider, setProvider] = useState<'openai' | 'gemini' | 'claude'>('openai');
  const [previewPages, setPreviewPages] = useState(30);
  const [prompts, setPrompts] = useState<Record<string, string>>(DEFAULT_PROMPTS);
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    if (!session?.access_token) {
      setError('You must be logged in');
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('provider', provider);
      formData.append('preview_pages', previewPages.toString());
      formData.append('prompts', JSON.stringify(prompts));

      const response = await fetch('/api/translate/jobs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        },
        body: formData
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create job');
      }

      const data = await response.json();
      router.push(`/translate/${data.job.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload');
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-[#1a1612]">Upload PDF for Translation</h1>
        <p className="mt-2 text-[#5c5c5c]">
          Upload a Renaissance Latin PDF and configure the translation prompts
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* File upload */}
        <div className="bg-white rounded-lg border border-[#d4c4b5] p-6">
          <label className="block text-sm font-medium text-[#1a1612] mb-2">
            PDF File
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full cursor-pointer rounded border border-dashed border-[#c1b09c] bg-[#faf7f2] px-4 py-8 text-sm text-[#6c5b4a]"
          />
          {file && (
            <p className="mt-2 text-sm text-[#5c5c5c]">
              Selected: <strong>{file.name}</strong> ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg border border-[#d4c4b5] p-6">
          <h2 className="text-lg font-medium text-[#1a1612] mb-4">Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#1a1612] mb-1">
                LLM Provider
              </label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as 'openai' | 'gemini' | 'claude')}
                className="w-full px-3 py-2 border border-[#d4c4b5] rounded focus:outline-none focus:ring-1 focus:ring-[#9e4a3a]"
              >
                <option value="openai">OpenAI (GPT-4o) - Recommended</option>
                <option value="gemini">Google Gemini</option>
                <option value="claude">Anthropic Claude</option>
              </select>
              <p className="mt-1 text-xs text-[#5c5c5c]">
                OpenAI is most cost-effective for OCR and translation
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1a1612] mb-1">
                Preview Pages
              </label>
              <input
                type="number"
                value={previewPages}
                onChange={(e) => setPreviewPages(parseInt(e.target.value) || 30)}
                min={5}
                max={100}
                className="w-full px-3 py-2 border border-[#d4c4b5] rounded focus:outline-none focus:ring-1 focus:ring-[#9e4a3a]"
              />
              <p className="mt-1 text-xs text-[#5c5c5c]">
                Process this many pages first, then review before continuing
              </p>
            </div>
          </div>
        </div>

        {/* Prompts */}
        <div className="bg-white rounded-lg border border-[#d4c4b5] p-6">
          <h2 className="text-lg font-medium text-[#1a1612] mb-4">
            Prompts
            <span className="ml-2 text-sm font-normal text-[#5c5c5c]">
              (Click to expand and edit)
            </span>
          </h2>

          <div className="space-y-4">
            {PROMPT_STAGES.map((stage) => (
              <div key={stage.id} className="border border-[#e5ddd3] rounded-lg">
                <button
                  type="button"
                  onClick={() => setExpandedPrompt(
                    expandedPrompt === stage.id ? null : stage.id
                  )}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#faf7f2]"
                >
                  <div>
                    <h3 className="font-medium text-[#1a1612]">{stage.title}</h3>
                    <p className="text-sm text-[#5c5c5c]">{stage.description}</p>
                  </div>
                  <span className="text-[#9e4a3a]">
                    {expandedPrompt === stage.id ? '−' : '+'}
                  </span>
                </button>

                {expandedPrompt === stage.id && (
                  <div className="px-4 pb-4">
                    <textarea
                      value={prompts[stage.id]}
                      onChange={(e) => setPrompts({
                        ...prompts,
                        [stage.id]: e.target.value
                      })}
                      rows={10}
                      className="w-full px-3 py-2 border border-[#d4c4b5] rounded font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[#9e4a3a]"
                    />
                    <button
                      type="button"
                      onClick={() => setPrompts({
                        ...prompts,
                        [stage.id]: DEFAULT_PROMPTS[stage.id as keyof typeof DEFAULT_PROMPTS]
                      })}
                      className="mt-2 text-xs text-[#9e4a3a] hover:underline"
                    >
                      Reset to default
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#5c5c5c]">
            The worker will process the first {previewPages} pages, then pause for your review.
          </p>
          <button
            type="submit"
            disabled={!file || submitting}
            className="px-6 py-2 bg-[#9e4a3a] text-white rounded hover:bg-[#8a4033] disabled:opacity-50"
          >
            {submitting ? 'Uploading...' : 'Start Translation'}
          </button>
        </div>
      </form>
    </div>
  );
}
