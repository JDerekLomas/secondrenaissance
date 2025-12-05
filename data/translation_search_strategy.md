# Latin-to-English Translation Search Strategy

## Goal
Build a comprehensive database of Latin works (1450-1700) that have English translations available.

## The Problem
No master list exists. Translations are scattered across:
- Named book series (Loeb, I Tatti, etc.) - ~2,000 works
- Academic journals (hundreds of journals, thousands of articles)
- Dissertations (many include first translations)
- Monographs (translations embedded in scholarly books)
- Anthologies and readers
- Open access repositories

## Search Strategy for Agents

### Phase 1: Structured Series Scraping

**Task**: Extract complete catalogues from known translation series.

| Source | Method | Expected Output |
|--------|--------|-----------------|
| Loeb Classical Library | Scrape loebclassics.com catalogue | ~520 titles with authors |
| I Tatti Renaissance Library | Scrape HUP series page | ~100 titles |
| Dumbarton Oaks Medieval Library | Scrape DOML catalogue | ~80 titles |
| Oxford Medieval Texts | Scrape OUP series page | ~103 titles |
| Aris & Phillips | Scrape Liverpool UP | ~170 titles |
| Fathers of the Church | Scrape CUA Press | ~147 titles |
| Ancient Christian Writers | Scrape Paulist Press | ~76 titles |
| Penguin Classics | Filter by Latin language | ~114 titles |
| Toronto Medieval Latin Texts | Scrape PIMS/Brepols | ~37 titles |
| Liverpool TTH | Scrape LUP | ~86 titles |
| Cambridge Medieval Classics | Scrape CUP | ~15 titles |

**Output format**:
```json
{
  "series": "I Tatti Renaissance Library",
  "title": "Dialogues",
  "author": "Pietro Aretino",
  "translator": "Raymond Rosenthal",
  "year_published": 2005,
  "original_latin_title": "Ragionamenti",
  "original_author_dates": "1492-1556",
  "isbn": "978-0674017574"
}
```

### Phase 2: Journal Article Search

**Strategy**: Search academic databases for translation indicators.

**Search queries** (to run against JSTOR, Project MUSE, Google Scholar):
```
"first English translation" Latin
"translated for the first time" Latin
"English translation" "Latin text" medieval
"English translation" "Latin text" Renaissance
"facing-page translation" Latin
"with translation" Latin sixteenth century
"with translation" Latin fifteenth century
intitle:translation Latin medieval
intitle:translated Latin Renaissance
```

**Target journals** (known to publish Latin translations):
- Traditio
- Speculum
- Medieval Studies
- Renaissance Quarterly
- Sixteenth Century Journal
- Journal of Medieval Latin
- Humanistica Lovaniensia
- Medievalia et Humanistica
- Viator
- Classical Quarterly
- Classical Philology
- Harvard Studies in Classical Philology
- American Journal of Philology
- Transactions of the American Philological Association

**For each journal**:
1. Search "translation" within journal archive
2. Filter for articles containing Latin texts
3. Extract: author, title, Latin work translated, date range

### Phase 3: Dissertation Mining

**Strategy**: Search dissertation databases for translation dissertations.

**Sources**:
- ProQuest Dissertations & Theses
- DART-Europe
- EThOS (British Library)
- OpenDOAR repositories

**Search queries**:
```
"critical edition and translation" Latin
"edition with translation" Latin medieval
"Latin text with English translation" dissertation
"first translation" Latin thesis
```

**Many dissertations include first translations** of minor Latin texts. These are often the ONLY translations available.

### Phase 4: Monograph Extraction

**Strategy**: Find scholarly books that include translations.

**Search in WorldCat/library catalogues**:
```
subject:"Latin literature -- Translations into English"
subject:"Medieval Latin literature -- Translations"
subject:"Renaissance Latin literature -- Translations"
```

**Look for patterns in titles**:
- "X: Text and Translation"
- "The Letters of X: A Translation"
- "X's Y: Latin Text with English Translation"
- "Selected Works of X, Translated"

### Phase 5: Open Access Repositories

**Sources to search**:
- Internet Archive (archive.org) - many out-of-copyright translations
- HathiTrust - full-text search for "Latin text" + "translation"
- Google Books - preview/snippet search
- JSTOR Open Access
- Project Gutenberg - classical translations
- Perseus Digital Library - already catalogued
- Latin Library (thelatinlibrary.com) - texts, some with translation links
- Encyclopaedia Britannica 11th edition - contains many translations

### Phase 6: Cross-Reference with USTC

**Final step**: Match found translations against USTC records.

For each translation found:
1. Search USTC for author + title
2. Get USTC record ID(s)
3. Link translation to specific edition(s)
4. Note: one translation may cover many USTC editions

**Output database schema**:
```sql
CREATE TABLE translations (
    id INTEGER PRIMARY KEY,
    ustc_id TEXT,                    -- Link to USTC record
    latin_author TEXT,
    latin_title TEXT,
    original_date_range TEXT,        -- e.g., "1450-1550"
    translator TEXT,
    translation_title TEXT,
    translation_year INTEGER,
    publisher TEXT,
    series TEXT,                     -- e.g., "Loeb Classical Library"
    source_type TEXT,                -- "series", "journal", "dissertation", "monograph"
    source_details TEXT,             -- Journal name, dissertation institution, etc.
    access_type TEXT,                -- "commercial", "open_access", "library_only"
    url TEXT,
    notes TEXT
);
```

## Agent Implementation

### Agent 1: Series Scraper
- Input: List of series URLs
- Action: Scrape catalogue pages, extract structured data
- Output: JSON of all titles in series

### Agent 2: Journal Searcher
- Input: Journal name + search terms
- Action: Search journal archive via API or scraping
- Output: List of articles containing translations

### Agent 3: Dissertation Finder
- Input: Search queries
- Action: Search ProQuest, EThOS, etc.
- Output: List of dissertations with translations

### Agent 4: USTC Matcher
- Input: Author + title from translation
- Action: Search USTC API/interface
- Output: Matched USTC record IDs

### Agent 5: Deduplicator
- Input: All found translations
- Action: Identify duplicates (same work, different editions/translations)
- Output: Canonical list of unique Latin works with translations

## Estimated Coverage

| Source Type | Estimated Works | Confidence |
|-------------|-----------------|------------|
| Named series | 1,500-2,000 | High |
| Journal articles | 2,000-5,000 | Medium |
| Dissertations | 1,000-3,000 | Medium |
| Monographs | 1,000-2,000 | Low |
| Open access | 500-1,000 | Medium |
| **Total unique** | **4,000-8,000** | Low |

This would still be <2% of unique Latin works, but significantly more than our current estimate.

## Priority Order

1. **Series scraping** - Highest yield, most structured
2. **Perseus/open access** - Already digital, easy to verify
3. **Major journals** (Speculum, Renaissance Quarterly) - High-quality translations
4. **Dissertations** - Many first translations, but harder to access
5. **Monographs** - Most labor-intensive, lowest yield per search

## Notes

- Many translations are partial (selections, excerpts)
- Quality varies enormously (19th century vs. modern scholarly)
- Some works have multiple competing translations
- Access restrictions complicate "availability" claims
- Pre-1923 translations may be public domain (US)
