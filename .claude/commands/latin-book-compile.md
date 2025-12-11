# Latin Book Compile

Generate summaries, glossary, and indices from completed translation: $ARGUMENTS

## Arguments
- `<project-folder>` - Path to project (e.g., `data/translations/ficino_de_mysteriis`)

## Prerequisites
- All pages processed via `/latin-book-run`
- Each page has `summary.json` with key_terms, people, concepts

## Workflow

### 1. Load all page data
- Read all `pages/NNN/summary.json` files
- Read `metadata.json` for book info
- Read `glossary.json` for terminology

### 2. Generate section summaries
Group pages into sections (~25-50 pages each, or by detected chapter breaks):

For each section, create `sections/section_NN.md`:
```markdown
# Section N: [Inferred Title] (Pages X-Y)

## Summary
[2-3 paragraphs synthesizing the page summaries]

## Key Themes
- Theme 1: explanation
- Theme 2: explanation

## Important Terms Introduced
| Latin | English | First appears |
|-------|---------|---------------|
| ... | ... | p. X |

## People Mentioned
- Name (pages X, Y, Z): context

## Notable Passages
- p. X: "quote..." — significance
```

### 3. Generate consolidated glossary
Create `glossary_full.md`:
```markdown
# Glossary

## A
**anima mundi** (world soul) — p. 12, 45, 89
  First used in context of...

**ascensus** (ascent) — p. 23
  The soul's return to...
```

### 4. Generate indices
Create `indices.md`:
```markdown
# Index of Persons
- Hermes Trismegistus: 12, 15, 23, 45-48, 112
- Plato: 8, 34, 56
- Plotinus: 78, 89, 102

# Index of Concepts
- Emanation: 12, 15, 23
- Divine intellect: 45, 67
- World soul: 12, 45, 89

# Index of Places
- Alexandria: 12
- Florence: 156
```

### 5. Generate book summary
Create `book_summary.md`:
```markdown
# [Title] by [Author] ([Year])

## Overview
[3-5 paragraphs summarizing the entire work]

## Structure
- Section 1 (pp. 1-50): [brief description]
- Section 2 (pp. 51-100): [brief description]
- ...

## Major Themes
1. **Theme**: explanation across the work
2. **Theme**: explanation across the work

## Historical Significance
[Why this work matters, its influence]

## Translation Notes
- Total pages: N
- Processing confidence: X%
- Passages flagged for expert review: N (see flags.md)

## How to Cite
[Author], [Title], trans. [Project Name] (2025), p. X.
```

### 6. Generate expert review file
Create `flags.md`:
```markdown
# Passages Requiring Expert Review

## Low Confidence OCR
- p. 42, line 12: "unclear text" — possible readings: A, B, C
- p. 89, line 5: damaged section

## Translation Uncertainties
- p. 23: "term X" — translated as Y, but could mean Z
- p. 67: ambiguous pronoun reference

## Structural Questions
- p. 45-46: chapter break unclear
- p. 112: possible missing page
```

## Final Output Structure
```
{project}/
├── metadata.json
├── project_prompts.md
├── glossary.json
├── glossary_full.md        ← NEW
├── indices.md              ← NEW
├── book_summary.md         ← NEW
├── flags.md                ← NEW
├── sections/
│   ├── section_01.md       ← NEW
│   ├── section_02.md
│   └── ...
└── pages/
    └── ... (unchanged)
```

## After Compilation
Expert reviews:
1. `flags.md` — address uncertainties
2. `book_summary.md` — refine overview
3. `glossary_full.md` — verify terminology
4. Section summaries — check accuracy

Ready for publication or further editing.
