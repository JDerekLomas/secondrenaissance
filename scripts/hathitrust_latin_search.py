#!/usr/bin/env python3
"""
Search Internet Archive (which overlaps heavily with HathiTrust) for
Latin-to-English translations published 1800-1978.

Uses the Internet Archive Advanced Search API (Solr-based) with multiple
query strategies to maximize coverage:
  1. Subject heading: "Latin literature -- Translations into English"
  2. Subject heading: "Latin poetry -- Translations into English"
  3. Loeb Classical Library volumes
  4. Heinemann publisher + Latin subject (Loeb editions)
  5. Titles containing "translated from the Latin" / "English translation"
  6. Bohn's Classical Library
  7. Subject: "Latin language -- Readers" with translations
  8. Subject: Latin drama, Latin prose translations
  9. Penguin Classics Latin authors
  10. Harvard University Press Latin texts

Results are deduplicated by Internet Archive identifier and saved to CSV.
"""

import csv
import json
import sys
import time
import urllib.parse
import urllib.request
from collections import OrderedDict

OUTPUT_FILE = "/Users/dereklomas/secondrenaissance/scripts/hathitrust_latin_pre1979.csv"

FIELDS = [
    "identifier", "title", "creator", "date", "publisher",
    "subject", "language", "description", "collection"
]

FIELD_PARAMS = "&".join(f"fl%5B%5D={f}" for f in FIELDS)

BASE_URL = "https://archive.org/advancedsearch.php"

# Multiple search queries to maximize coverage
QUERIES = [
    # 1. Standard subject heading for Latin literature translations
    'subject:"Latin literature -- Translations into English" AND date:[1800 TO 1978]',

    # 2. Latin poetry translations
    'subject:"Latin poetry -- Translations into English" AND date:[1800 TO 1978]',

    # 3. Latin prose/drama translations
    'subject:"Latin drama -- Translations into English" AND date:[1800 TO 1978]',

    # 4. Broader: Latin + translations into English
    '(subject:"Latin literature" OR subject:"Latin poetry" OR subject:"Latin language") AND subject:"Translations into English" AND date:[1800 TO 1978]',

    # 5. Loeb Classical Library
    'subject:"Loeb classical library" AND date:[1900 TO 1978]',

    # 6. Heinemann + Latin (many Loeb volumes)
    'publisher:"Heinemann" AND subject:"Latin" AND date:[1900 TO 1978]',

    # 7. "translated from the Latin" in title
    'title:"translated from the Latin" AND date:[1800 TO 1978]',

    # 8. "with an English translation" + Latin subjects
    'title:"with an English translation" AND (subject:"Latin" OR language:"lat") AND date:[1800 TO 1978]',

    # 9. Bohn's Classical Library
    '(subject:"Bohn\'s classical library" OR publisher:"Bohn") AND (subject:"Latin" OR language:"lat") AND date:[1800 TO 1978]',

    # 10. Penguin Classics Latin authors
    'publisher:"Penguin" AND (subject:"Latin" OR subject:"Latin literature" OR subject:"Latin poetry") AND date:[1800 TO 1978]',

    # 11. Harvard University Press Latin
    'publisher:"Harvard University Press" AND (subject:"Latin" OR language:"lat") AND date:[1900 TO 1978]',

    # 12. "English translation" in title + Latin language
    'title:"English translation" AND language:"lat" AND date:[1800 TO 1978]',

    # 13. Specific classical authors known to be Latin
    '(creator:"Cicero" OR creator:"Virgil" OR creator:"Ovid" OR creator:"Horace" OR creator:"Seneca" OR creator:"Livy" OR creator:"Tacitus" OR creator:"Pliny") AND subject:"Translations into English" AND date:[1800 TO 1978]',

    # 14. More classical authors
    '(creator:"Catullus" OR creator:"Lucretius" OR creator:"Juvenal" OR creator:"Martial" OR creator:"Plautus" OR creator:"Terence" OR creator:"Apuleius" OR creator:"Petronius") AND subject:"Translations into English" AND date:[1800 TO 1978]',

    # 15. Medieval Latin authors
    '(creator:"Augustine" OR creator:"Boethius" OR creator:"Aquinas" OR creator:"Erasmus" OR creator:"Thomas More") AND subject:"Translations into English" AND date:[1800 TO 1978]',

    # 16. Church fathers and religious Latin
    '(subject:"Fathers of the church" OR subject:"Church fathers") AND subject:"Translations into English" AND date:[1800 TO 1978]',

    # 17. "Ante-Nicene" and "Nicene" fathers (major translation series)
    '(title:"Ante-Nicene" OR title:"Nicene fathers" OR title:"Post-Nicene") AND date:[1800 TO 1978]',

    # 18. I Tatti Renaissance Library precursors
    'subject:"Renaissance" AND subject:"Latin" AND subject:"Translations into English" AND date:[1800 TO 1978]',

    # 19. Latin medieval texts
    'subject:"Latin literature, Medieval and modern" AND subject:"Translations into English" AND date:[1800 TO 1978]',

    # 20. Latin hymns and religious poetry
    '(subject:"Latin hymns" OR subject:"Hymns, Latin") AND subject:"Translations into English" AND date:[1800 TO 1978]',

    # 21. "Loeb" in identifier (catches many volumes)
    'identifier:loeb AND (language:"lat" OR subject:"Latin") AND date:[1900 TO 1978]',

    # 22. Cambridge University Press Latin texts
    'publisher:"Cambridge University Press" AND (subject:"Latin" OR language:"lat") AND subject:"Translations" AND date:[1900 TO 1978]',

    # 23. Oxford University Press classical texts
    'publisher:"Oxford" AND (subject:"Latin literature" OR subject:"Latin poetry") AND date:[1800 TO 1978]',

    # 24. Patrologia Latina translations
    '(title:"Patrologia" OR subject:"Patrologia") AND date:[1800 TO 1978]',

    # 25. Caesar specifically (many editions)
    'creator:"Caesar" AND (subject:"Latin" OR language:"lat") AND subject:"Translations" AND date:[1800 TO 1978]',

    # 26. Sallust, Nepos, Curtius
    '(creator:"Sallust" OR creator:"Nepos" OR creator:"Curtius") AND subject:"Translations into English" AND date:[1800 TO 1978]',

    # 27. Latin text and English translation
    'title:"Latin text and English translation" AND date:[1800 TO 1978]',

    # 28. Summa theologiae and other major medieval works
    '(title:"Summa" OR title:"De civitate" OR title:"Confessions") AND (language:"lat" OR subject:"Latin") AND date:[1800 TO 1978]',
]


def search_ia(query, rows=200, page=1):
    """Search Internet Archive advanced search API."""
    params = {
        "q": query,
        "rows": str(rows),
        "page": str(page),
        "output": "json",
    }
    # Add field parameters
    for field in FIELDS:
        params.setdefault(f"fl[]", [])

    # Build URL manually to handle fl[] params
    base = f"{BASE_URL}?q={urllib.parse.quote(query)}"
    for field in FIELDS:
        base += f"&fl%5B%5D={field}"
    base += f"&rows={rows}&page={page}&output=json"

    try:
        req = urllib.request.Request(base, headers={
            "User-Agent": "SecondRenaissance/1.0 (research project; derek@sourcelibrary.org)"
        })
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            response = data.get("response", {})
            num_found = response.get("numFound", 0)
            docs = response.get("docs", [])
            return num_found, docs
    except Exception as e:
        print(f"  ERROR: {e}")
        return 0, []


def normalize_record(doc):
    """Normalize a record from IA search results."""
    record = {}
    for field in FIELDS:
        val = doc.get(field, "")
        if isinstance(val, list):
            val = "; ".join(str(v) for v in val)
        record[field] = str(val).strip()
    return record


def extract_year(date_str):
    """Try to extract a 4-digit year from a date string."""
    import re
    if not date_str:
        return None
    match = re.search(r'(\d{4})', str(date_str))
    if match:
        year = int(match.group(1))
        if 1400 <= year <= 2000:
            return year
    return None


def is_latin_related(record):
    """Check if a record is likely a Latin-to-English translation."""
    text = " ".join([
        record.get("title", ""),
        record.get("subject", ""),
        record.get("language", ""),
        record.get("creator", ""),
        record.get("description", ""),
    ]).lower()

    # Positive signals
    latin_signals = [
        "latin", "loeb", "classical library",
        "cicero", "virgil", "vergil", "ovid", "horace", "seneca",
        "livy", "tacitus", "pliny", "catullus", "lucretius",
        "juvenal", "martial", "plautus", "terence", "apuleius",
        "petronius", "caesar", "sallust", "lucan", "statius",
        "propertius", "tibullus", "varro", "gellius", "suetonius",
        "augustine", "boethius", "aquinas", "erasmus",
        "ammianus", "sidonius", "claudian", "prudentius",
        "ante-nicene", "nicene fathers", "church fathers",
        "patrologia", "vulgate",
        "heinemann", "lat",
        "translated from the latin", "english translation",
        "roman literature", "roman history", "roman poetry",
    ]

    has_latin = any(s in text for s in latin_signals)

    # Negative signals - filter out non-Latin items
    false_positives = [
        "latin america", "latin american", "latino",
        "alfred a. loeb", "loeb stone", "loeb gallery",
        "loeb mantels", "loeb & welch",
        "native plants", "jewish community",
    ]

    is_false_positive = any(s in text for s in false_positives)

    return has_latin and not is_false_positive


def main():
    all_records = OrderedDict()  # keyed by identifier for dedup

    print("=" * 70)
    print("Searching Internet Archive for Latin-to-English translations (1800-1978)")
    print("=" * 70)

    for i, query in enumerate(QUERIES, 1):
        print(f"\n[{i}/{len(QUERIES)}] {query[:80]}...")

        # Get first page
        num_found, docs = search_ia(query, rows=200, page=1)
        print(f"  Found: {num_found} results")

        new_count = 0
        for doc in docs:
            record = normalize_record(doc)
            ident = record["identifier"]
            if ident and ident not in all_records:
                if is_latin_related(record):
                    all_records[ident] = record
                    new_count += 1

        print(f"  New unique Latin records: {new_count}")

        # Get additional pages if needed
        if num_found > 200:
            pages_needed = min((num_found + 199) // 200, 5)  # cap at 5 pages = 1000 results
            for page in range(2, pages_needed + 1):
                time.sleep(1)  # be polite
                _, more_docs = search_ia(query, rows=200, page=page)
                page_new = 0
                for doc in more_docs:
                    record = normalize_record(doc)
                    ident = record["identifier"]
                    if ident and ident not in all_records:
                        if is_latin_related(record):
                            all_records[ident] = record
                            page_new += 1
                print(f"  Page {page}: +{page_new} new")

        # Be polite to the API
        time.sleep(1.5)

    # Post-process: filter by year range and add extracted year
    print(f"\n{'=' * 70}")
    print(f"Total unique records before year filtering: {len(all_records)}")

    final_records = []
    for ident, record in all_records.items():
        year = extract_year(record.get("date", ""))
        record["pub_year"] = str(year) if year else ""

        # Keep records in 1800-1978 range, or if we can't determine year
        if year is None or (1800 <= year <= 1978):
            final_records.append(record)

    print(f"Records in 1800-1978 range: {len(final_records)}")

    # Sort by year
    final_records.sort(key=lambda r: (r.get("pub_year", "9999"), r.get("creator", ""), r.get("title", "")))

    # Write CSV
    output_fields = ["pub_year", "identifier", "title", "creator", "publisher", "subject", "language", "description", "collection"]

    with open(OUTPUT_FILE, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=output_fields, extrasaction="ignore")
        writer.writeheader()
        for record in final_records:
            # Add IA URL
            record["ia_url"] = f"https://archive.org/details/{record['identifier']}"
            writer.writerow(record)

    print(f"\nSaved {len(final_records)} records to {OUTPUT_FILE}")

    # Print summary statistics
    years = [int(r["pub_year"]) for r in final_records if r.get("pub_year")]
    if years:
        print(f"\nYear range: {min(years)} - {max(years)}")

        # Decade breakdown
        decades = {}
        for y in years:
            decade = (y // 10) * 10
            decades[decade] = decades.get(decade, 0) + 1

        print("\nBy decade:")
        for decade in sorted(decades):
            print(f"  {decade}s: {decades[decade]}")

    # Count unique authors
    authors = set()
    for r in final_records:
        creator = r.get("creator", "").strip()
        if creator:
            # Get first author
            first = creator.split(";")[0].strip()
            if first:
                authors.add(first)
    print(f"\nUnique creators: {len(authors)}")

    # Show sample
    print(f"\nSample records:")
    for r in final_records[:10]:
        print(f"  [{r.get('pub_year', '?')}] {r.get('title', 'untitled')[:60]} — {r.get('creator', 'unknown')[:40]}")


if __name__ == "__main__":
    main()
