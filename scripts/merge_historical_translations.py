#!/usr/bin/env python3
"""
Merge pre-1979 historical Latin translation records into the master CSV.

Sources:
1. Loeb Classical Library full catalog (scripts/loeb_classical_library_full.csv)
2. Open Library Latin translations 1800-1978 (scripts/openlibrary_latin_pre1979.csv)
3. Internet Archive / HathiTrust Latin translations 1800-1978 (scripts/hathitrust_latin_pre1979.csv)

Deduplicates against existing master and across sources.
"""

import csv, re, shutil
from collections import Counter

BASE = '/Users/dereklomas/secondrenaissance/scripts'
MASTER = f'{BASE}/latin_translations_master.csv'
LOEB = f'{BASE}/loeb_classical_library_full.csv'
OPENLIBRARY = f'{BASE}/openlibrary_latin_pre1979.csv'
HATHITRUST = f'{BASE}/hathitrust_latin_pre1979.csv'
PUBLIC = '/Users/dereklomas/secondrenaissance/viz/public/latin_translations_master.csv'

MASTER_FIELDS = ['source', 'series', 'author', 'english_title', 'original_title',
                 'translator', 'pub_year', 'place', 'publisher', 'country',
                 'original_year', 'era', 'canonical_author', 'canonical_work']

def normalize_key(author, title):
    """Dedup key: first significant author word + first 40 chars of title."""
    skip = {'saint', 'st', 'pseudo', 'the', 'of', 'von', 'de', 'van', 'du', 'le', 'la'}
    words = re.sub(r'[^a-z\s]', '', (author or '').lower()).split()
    author_key = next((w for w in words if w not in skip and len(w) > 1), '')
    title_key = re.sub(r'[^a-z0-9]', '', (title or '').lower())[:40]
    return f"{author_key}|{title_key}"

def classify_era(year):
    try:
        y = int(year)
    except (ValueError, TypeError):
        return ''
    if y < 500: return 'classical'
    if y < 1400: return 'medieval'
    if y < 1600: return 'renaissance'
    if y < 1800: return 'early_modern'
    return 'modern'

def clean_html(s):
    return (s or '').replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>').strip()

def load_master():
    """Load existing master records and keys."""
    rows = []
    keys = set()
    with open(MASTER, encoding='utf-8') as f:
        for r in csv.DictReader(f):
            rows.append(r)
            key = normalize_key(
                r.get('author', '') or r.get('canonical_author', ''),
                r.get('english_title', '')
            )
            keys.add(key)
    return rows, keys

def load_loeb():
    """Load Loeb Classical Library catalog."""
    entries = []
    try:
        with open(LOEB, encoding='utf-8') as f:
            for r in csv.DictReader(f):
                entries.append({
                    'source': 'Loeb Classical Library',
                    'series': f"Loeb Classical Library ({r.get('lcl_number', '')})",
                    'author': clean_html(r.get('author', '')),
                    'english_title': clean_html(r.get('english_title', '')),
                    'original_title': '',
                    'translator': clean_html(r.get('translator', '')),
                    'pub_year': r.get('pub_year', ''),
                    'place': 'Cambridge, MA',
                    'publisher': 'Harvard University Press',
                    'country': 'United States',
                    'original_year': r.get('original_year', ''),
                    'era': classify_era(r.get('original_year', '')),
                    'canonical_author': clean_html(r.get('author', '')),
                    'canonical_work': clean_html(r.get('english_title', '')),
                })
    except FileNotFoundError:
        print(f"  Loeb file not found: {LOEB}")
    return entries

def extract_author_from_creator(creator):
    """Extract the primary author name from a HathiTrust/IA creator field."""
    if not creator:
        return ''
    # Take the first author (before semicolon)
    parts = creator.split(';')
    author = parts[0].strip()
    # Remove dates like ", 1770-1859" or ", d. 524"
    author = re.sub(r',\s*(d\.\s*)?\d{1,4}(\s*BCE)?(-\d{1,4})?(\s*BCE)?\s*$', '', author)
    author = re.sub(r',\s*(b\.\s*)?\d{1,4}\s*$', '', author)
    author = re.sub(r',\s*\d{1,4}\??-\d{1,4}\??\s*$', '', author)
    # Remove "former owner" etc.
    author = re.sub(r',\s*former owner.*$', '', author)
    return author.strip()

def load_hathitrust():
    """Load HathiTrust/Internet Archive results (high confidence only)."""
    entries = []
    try:
        with open(HATHITRUST, encoding='utf-8') as f:
            for r in csv.DictReader(f):
                # Only include high-confidence translation/bilingual records
                confidence = int(r.get('confidence', '0') or '0')
                record_type = r.get('record_type', '')
                if confidence < 30:
                    continue
                if record_type == 'latin_only':
                    continue

                author = extract_author_from_creator(r.get('creator', ''))
                title = clean_html(r.get('title', ''))
                # Truncate very long IA titles
                if len(title) > 200:
                    title = title[:200] + '...'

                pub_year = r.get('pub_year', '')

                entries.append({
                    'source': 'Internet Archive',
                    'series': '',
                    'author': author,
                    'english_title': title,
                    'original_title': '',
                    'translator': '',
                    'pub_year': pub_year,
                    'place': '',
                    'publisher': clean_html(r.get('publisher', '')),
                    'country': '',
                    'original_year': '',
                    'era': '',
                    'canonical_author': author,
                    'canonical_work': title,
                })
    except FileNotFoundError:
        print(f"  HathiTrust file not found: {HATHITRUST}")
    return entries

def load_openlibrary():
    """Load Open Library pre-1979 results."""
    entries = []
    try:
        with open(OPENLIBRARY, encoding='utf-8') as f:
            for r in csv.DictReader(f):
                pub_year = r.get('pub_year', '')
                # Only pre-1979
                try:
                    if int(pub_year) >= 1979:
                        continue
                except (ValueError, TypeError):
                    continue

                author = clean_html(r.get('author', ''))
                title = clean_html(r.get('english_title', ''))

                entries.append({
                    'source': 'Open Library',
                    'series': '',
                    'author': author,
                    'english_title': title,
                    'original_title': '',
                    'translator': clean_html(r.get('translator', '')),
                    'pub_year': pub_year,
                    'place': '',
                    'publisher': clean_html(r.get('publisher', '')),
                    'country': '',
                    'original_year': '',
                    'era': '',
                    'canonical_author': author,
                    'canonical_work': title,
                })
    except FileNotFoundError:
        print(f"  Open Library file not found: {OPENLIBRARY}")
    return entries


def main():
    print("Loading master CSV...", flush=True)
    master_rows, master_keys = load_master()
    print(f"  Master: {len(master_rows)} records, {len(master_keys)} unique keys", flush=True)

    # Load all sources
    print("\nLoading sources...", flush=True)
    loeb = load_loeb()
    print(f"  Loeb: {len(loeb)} entries", flush=True)

    hathitrust = load_hathitrust()
    print(f"  HathiTrust/IA: {len(hathitrust)} entries (after confidence filter)", flush=True)

    openlibrary = load_openlibrary()
    print(f"  Open Library: {len(openlibrary)} entries (pre-1979 only)", flush=True)

    # Merge in priority order: Loeb first (highest quality), then OL, then IA
    all_new = []
    source_counts = Counter()

    for source_name, entries in [('Loeb', loeb), ('Open Library', openlibrary), ('HathiTrust/IA', hathitrust)]:
        added = 0
        for entry in entries:
            key = normalize_key(entry['author'], entry['english_title'])
            if key in master_keys:
                continue
            if not key or key == '|':
                continue
            master_keys.add(key)
            all_new.append(entry)
            added += 1
        source_counts[source_name] = added
        print(f"  {source_name}: {added} new (after dedup)", flush=True)

    print(f"\n=== MERGE RESULTS ===", flush=True)
    print(f"Total new entries: {len(all_new)}", flush=True)
    for source, count in source_counts.items():
        print(f"  {source}: {count}", flush=True)

    # Add to master
    master_rows.extend(all_new)
    print(f"New master total: {len(master_rows)} records", flush=True)

    # Era breakdown
    era_counts = Counter()
    for r in master_rows:
        era = r.get('era', '') or 'unknown'
        era_counts[era] += 1
    print(f"\nEra breakdown:", flush=True)
    for era in ['classical', 'medieval', 'renaissance', 'early_modern', 'modern', 'unknown', '']:
        if era_counts[era]:
            print(f"  {era or '(empty)'}: {era_counts[era]}", flush=True)

    # Write updated master
    with open(MASTER, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=MASTER_FIELDS)
        writer.writeheader()
        for row in master_rows:
            # Only write known fields
            clean_row = {k: row.get(k, '') for k in MASTER_FIELDS}
            writer.writerow(clean_row)
    print(f"\nMaster CSV updated: {MASTER}", flush=True)

    # Copy to public
    shutil.copy2(MASTER, PUBLIC)
    print(f"Copied to {PUBLIC}", flush=True)

    # Show samples
    print(f"\n--- Sample new entries (first 20) ---", flush=True)
    for r in all_new[:20]:
        print(f"  {r.get('pub_year','?'):>6s} | {r.get('source','')[:15]:15s} | {r.get('author','')[:25]:25s} | {r.get('english_title','')[:50]}", flush=True)

    # Decade breakdown of new entries
    decade_counts = Counter()
    for r in all_new:
        try:
            decade = (int(r['pub_year']) // 10) * 10
            decade_counts[decade] += 1
        except (ValueError, TypeError):
            pass
    print(f"\n--- New entries by decade ---", flush=True)
    for decade in sorted(decade_counts.keys()):
        print(f"  {decade}s: {decade_counts[decade]}", flush=True)


if __name__ == '__main__':
    main()
