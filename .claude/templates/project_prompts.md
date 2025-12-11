# Project Prompts

Edit these prompts to customize translation for this specific book.
Run `/latin-page <image> --prompts project_prompts.md` to test changes.

---

## OCR Prompt

You are transcribing a Renaissance Latin facsimile.

**Input**: A page image and the previous page's OCR (for context/continuity).

**Instructions**:
- Start with `[[notes: describe page condition, layout, typeface, damage, any continuation from previous page]]`
- Include `[[page: N]]` if a page number is visible
- Preserve original capitalization, spelling, and line breaks
- Use Markdown to mirror the source layout:
  - `#` headings for chapter titles
  - `>` for centered mottos or dedications
  - `*italics*` for italic text
  - Markdown tables for indices, columns, or tabular content
- Mark uncertain characters: `[[?reading]]` or `[[alt: optionA / optionB]]`
- Note abbreviations: expand only if certain, otherwise `[[abbrev: ã = an? am?]]`
- Flag continuations: `[[continues from previous page]]` or `[[continues to next page]]`

**Book-specific notes** (edit this section):
- Typeface: [e.g., Roman, Gothic, mixed]
- Common abbreviations in this text: [list any patterns you notice]
- Recurring structural elements: [e.g., marginal notes, running headers]

---

## Translation Prompt

You are translating Renaissance Latin into accessible English.

**Input**: The OCR text and the previous page's translation (for context/continuity).

**Instructions**:
- Start with `[[notes: context from prior page, tricky phrases, historical references, terminology choices]]`
- Mirror the source layout exactly:
  - Preserve headings, centered text, paragraph breaks
  - Keep Markdown tables in the same structure
  - Maintain line breaks where meaningful
- Use inline `[[notes]]` for:
  - Alternate translation possibilities
  - Historical context a general reader needs
  - Technical terms that require explanation
- Style: warm and accessible, like a museum label—explain references rather than leaving jargon
- Preserve proper names; add context in notes on first occurrence
- Use consistent terminology throughout (reference the glossary)

**Book-specific notes** (edit this section):
- Target audience: [e.g., general readers, scholars, students]
- Tone: [e.g., formal, accessible, preserve archaic flavor]
- Key terminology decisions:
  - [Latin term] → [English translation] — [reasoning]
  - [Latin term] → [English translation] — [reasoning]

---

## Summary Prompt

Extract key information from each page for indexing and synthesis.

**Instructions**:
- Write a 2-3 sentence summary for a non-specialist reader
- Extract:
  - **Key terms**: Latin word/phrase → English translation (with brief context)
  - **People**: Names mentioned with their role/significance
  - **Concepts**: Ideas introduced or developed on this page
- Note connections to previous pages
- Flag any uncertainties or passages needing expert review
- Rate confidence (0.0-1.0) based on OCR clarity and translation certainty

**Book-specific notes** (edit this section):
- Important recurring figures to track: [list names]
- Core concepts in this work: [list themes]
- What to emphasize in summaries: [e.g., philosophical arguments, historical references, practical instructions]

---

## Expert Notes

Use this section for your own notes as you refine the prompts:

- [ ] Preview reviewed on: [date]
- [ ] Prompt adjustments made: [describe changes]
- [ ] Known issues: [list any systematic problems]
- [ ] Ready for full run: [ ] Yes / [ ] No
