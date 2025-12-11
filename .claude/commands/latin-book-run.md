# Latin Book Run

Process the full book with expert-refined prompts: $ARGUMENTS

## Arguments
- `<project-folder>` - Path to project (e.g., `data/translations/ficino_de_mysteriis`)
- `--start N` - Start from page N (default: continue from last processed)
- `--end N` - Stop at page N (default: all pages)

## Prerequisites
- Project created via `/latin-book-preview`
- Expert has reviewed and edited `project_prompts.md`
- `metadata.json` exists with `ia_identifier` and `page_count`

## Workflow

1. **Load project config**:
   - Read `metadata.json` for IA identifier, total pages
   - Read `project_prompts.md` for OCR, translation, summary prompts
   - Read `glossary.json` for existing terminology

2. **Determine page range**:
   - Find last processed page in `pages/` directory
   - Start from next unprocessed page (or `--start`)
   - Process through `page_count` (or `--end`)

3. **For each page**:

   a. **Download** (if not exists):
      ```
      https://archive.org/download/{identifier}/page/n{N}.jpg
      ```

   b. **Load context**:
      - Previous page's OCR and translation
      - Running glossary terms
      - Any continuation flags

   c. **OCR** with context:
      - Use prompt from `project_prompts.md`
      - Include previous page context
      - Save to `pages/NNN/ocr.md`

   d. **Translate** with context:
      - Use prompt from `project_prompts.md`
      - Reference glossary for consistent terminology
      - Preserve tables and structure
      - Save to `pages/NNN/translation.md`

   e. **Extract summary**:
      - Key terms (Latin → English)
      - People mentioned
      - Concepts introduced
      - Confidence score
      - Save to `pages/NNN/summary.json`

   f. **Update glossary**:
      - Add new terms to `glossary.json`
      - Note page of first occurrence

   g. **Report progress**:
      - Log page number and any flags
      - Note low-confidence passages

4. **Checkpoint every 25 pages**:
   - Save progress state
   - Generate interim section summary

## Output per page
```
pages/042/
├── source.jpg
├── ocr.md
├── translation.md
└── summary.json
```

## summary.json format
```json
{
  "page": 42,
  "key_terms": [
    {"latin": "anima mundi", "english": "world soul", "context": "..."}
  ],
  "people": ["Hermes Trismegistus", "Plato"],
  "concepts": ["emanation", "divine intellect"],
  "summary": "This page continues the discussion of...",
  "confidence": 0.85,
  "flags": ["uncertain reading line 12", "continues to next page"]
}
```

## Resume after interruption
Run the same command again - it will detect last processed page and continue.

## After completion
Run `/latin-book-compile <project-folder>` to generate summaries and indices.
