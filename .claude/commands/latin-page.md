# Full Page Processing

OCR and translate the Latin page image: $ARGUMENTS

## Arguments
- `<image-path>` - Path to the page image
- `--prompts <file>` - Custom prompts file (default: use built-in prompts)
- `--context <folder>` - Project folder to read previous page context from
- `--page <N>` - Page number (auto-detected from filename if possible)

## Context & Continuity

When processing pages sequentially, maintain context from prior pages:
- If `--context` provided, look for previous page's OCR/translation
- Reference the previous page's content for sentence continuations
- Track recurring names, themes, and terminology via glossary.json
- Note running headers or page numbering patterns

## Instructions

### 1. Load prompts
- If `--prompts` specified, read OCR/translation/summary prompts from that file
- Otherwise use default prompts below

### 2. Load context (if available)
- Find previous page's `ocr.md` and `translation.md`
- Load `glossary.json` for consistent terminology
- Note any `[[continues to next page]]` flags

### 3. OCR the image
- Start with `[[notes: page condition, layout, damage, continuation from prior page]]`
- Include `[[page: N]]` if visible
- Preserve original formatting, capitalization, line breaks
- Use Markdown tables for tabular content (indices, columns, lists)
- Mark uncertain readings: `[[?reading]]` or `[[alt: option1 / option2]]`
- Note abbreviations: expand if certain, otherwise `[[abbrev: ã = an? am?]]`
- Flag continuations: `[[continues from previous page]]` / `[[continues to next page]]`

### 4. Translate to English
- Start with `[[notes: context from prior page, tricky passages, historical refs]]`
- Mirror source layout exactly—preserve Markdown tables, headings, centered text
- Use inline `[[notes]]` for alternate readings or explanations
- Style: warm, accessible—explain jargon and references for general readers
- Use consistent terminology (reference glossary if available)
- Connect to themes from prior pages when relevant

### 5. Generate summary
- 2-3 sentences for a non-specialist
- Extract: key_terms (Latin→English), people, concepts
- Note confidence level and any flags
- Connection to previous pages

### 6. Output format

```markdown
## OCR
[transcription with tables preserved]

## Translation
[english text with same table structure]

## Summary
[2-3 sentences]

## Extracted Data
- **Key Terms**: term1 (translation), term2 (translation)
- **People**: Name1, Name2
- **Concepts**: concept1, concept2
- **Confidence**: 0.X
- **Flags**: [any issues for expert review]
```

## When part of a book project

If running within a project folder (e.g., `data/translations/ficino_de_mysteriis/`):
- Save OCR to `pages/NNN/ocr.md`
- Save translation to `pages/NNN/translation.md`
- Save extracted data to `pages/NNN/summary.json`
- Update `glossary.json` with new terms
