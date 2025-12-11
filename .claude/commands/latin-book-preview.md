# Latin Book Preview

Generate a 15-page preview for expert review: $ARGUMENTS

## Arguments
- `<ia-identifier>` - Internet Archive identifier (e.g., `bub_gb_abc123`)
- OR `<author_title>` - Will prompt for IA identifier

## Workflow

1. **Create project folder**: `data/translations/{author}_{short_title}/`

2. **Fetch metadata** from Internet Archive:
   ```
   https://archive.org/metadata/{identifier}
   ```
   Save to `metadata.json` with: title, creator, date, page_count

3. **Create default prompts file**: `project_prompts.md`
   Copy from `.claude/templates/project_prompts.md`

4. **Download first 15 pages**:
   ```
   https://archive.org/download/{identifier}/page/n{0-14}.jpg
   ```
   Save to `pages/001/source.jpg`, `pages/002/source.jpg`, etc.

5. **Process each page** using prompts from `project_prompts.md`:
   - OCR → `pages/NNN/ocr.md`
   - Translation → `pages/NNN/translation.md`
   - Summary + key terms → `pages/NNN/summary.json`

6. **Update glossary**: `glossary.json` with terms from all pages

7. **Generate preview report**: `preview_report.md`
   - Side-by-side snippets from each page
   - Consolidated vocabulary
   - Flags for uncertain passages
   - Instructions for prompt refinement

## Output Structure
```
data/translations/ficino_de_mysteriis/
├── metadata.json
├── project_prompts.md      ← Expert edits this
├── glossary.json
├── preview_report.md       ← Review this
└── pages/
    ├── 001/
    │   ├── source.jpg
    │   ├── ocr.md
    │   ├── translation.md
    │   └── summary.json
    └── ... (001-015)
```

## After Preview
Expert reviews `preview_report.md`, edits `project_prompts.md`, then:
- Test individual pages: `/latin-page pages/005/source.jpg --prompts project_prompts.md`
- When satisfied: `/latin-book-run <project-folder>`
