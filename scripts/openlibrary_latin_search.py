#!/usr/bin/env python3
"""
Search Open Library systematically for Latin-to-English translations
published between 1800 and 1978 (pre-UNESCO Index Translationum).

Uses Open Library Search API: https://openlibrary.org/search.json
"""

import csv
import json
import time
import sys
import urllib.parse
import urllib.request
from collections import OrderedDict
from pathlib import Path

OUTPUT_PATH = Path(__file__).parent / "openlibrary_latin_pre1979.csv"
RATE_LIMIT = 0.6  # seconds between requests
API_BASE = "https://openlibrary.org/search.json"
RESULTS_PER_PAGE = 100
MIN_YEAR = 1800
MAX_YEAR = 1978

# Track unique works by (title_lower, author_lower) to deduplicate
seen_keys = set()
all_results = []


def fetch_page(params: dict, page: int = 1) -> dict:
    """Fetch a single page from the Open Library Search API."""
    params_copy = dict(params)
    params_copy["limit"] = RESULTS_PER_PAGE
    params_copy["offset"] = (page - 1) * RESULTS_PER_PAGE
    # Request all useful fields explicitly
    params_copy["fields"] = "key,title,first_publish_year,publish_year,author_name,publisher,subject,contributor,person,language,edition_count"
    url = f"{API_BASE}?{urllib.parse.urlencode(params_copy)}"

    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "SecondRenaissance/1.0 (research; contact@sourcelibrary.org)"
            })
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            return data
        except Exception as e:
            print(f"  [attempt {attempt+1}] Error fetching {url[:120]}...: {e}")
            time.sleep(2 * (attempt + 1))
    return {"docs": [], "numFound": 0}


def extract_record(doc: dict) -> dict | None:
    """Extract a normalized record from an Open Library doc, or None if not relevant."""
    title = doc.get("title", "").strip()
    if not title:
        return None

    # Get first publish year
    pub_year = doc.get("first_publish_year")
    if pub_year is None:
        # Try to find a year in publish_year list
        years = doc.get("publish_year", [])
        years_in_range = [int(y) for y in years if str(y).isdigit() and MIN_YEAR <= int(y) <= MAX_YEAR]
        if years_in_range:
            pub_year = min(years_in_range)
        else:
            return None

    if not (MIN_YEAR <= pub_year <= MAX_YEAR):
        # Check if any edition was published in range
        years = doc.get("publish_year", [])
        years_in_range = [int(y) for y in years if str(y).isdigit() and MIN_YEAR <= int(y) <= MAX_YEAR]
        if years_in_range:
            pub_year = min(years_in_range)
        else:
            return None

    authors = doc.get("author_name", [])
    author = "; ".join(authors[:3]) if authors else ""

    publishers = doc.get("publisher", [])
    publisher = publishers[0] if publishers else ""

    # Try to extract translator from contributor field
    contributors = doc.get("contributor", [])
    translator = ""
    for c in contributors:
        c_lower = c.lower()
        if "translator" in c_lower or "trans." in c_lower or "tr." in c_lower:
            translator = c
            break

    # Also check person field
    if not translator:
        persons = doc.get("person", [])
        for p in persons:
            p_lower = p.lower()
            if "translator" in p_lower:
                translator = p
                break

    subjects = doc.get("subject", [])

    # Get Open Library key for dedup and reference
    ol_key = doc.get("key", "")

    return {
        "ol_key": ol_key,
        "pub_year": pub_year,
        "author": author,
        "english_title": title,
        "translator": translator,
        "publisher": publisher,
        "subjects": "; ".join(subjects[:10]),
        "edition_count": doc.get("edition_count", 1),
        "language": "; ".join(doc.get("language", [])),
    }


def dedup_key(rec: dict) -> str:
    """Create a deduplication key from title and author."""
    t = rec["english_title"].lower().strip()
    # Remove common prefixes
    for prefix in ["the ", "a ", "an "]:
        if t.startswith(prefix):
            t = t[len(prefix):]
    a = rec["author"].lower().strip()
    return f"{t[:80]}||{a[:60]}"


def run_search(label: str, params: dict, max_pages: int = 20):
    """Run a paginated search and collect results."""
    print(f"\n{'='*70}")
    print(f"SEARCH: {label}")
    print(f"Params: {params}")
    print(f"{'='*70}")

    page = 1
    total_found = None
    new_count = 0

    while page <= max_pages:
        time.sleep(RATE_LIMIT)
        data = fetch_page(params, page)

        if total_found is None:
            total_found = data.get("numFound", 0)
            print(f"  Total found: {total_found}")

        docs = data.get("docs", [])
        if not docs:
            break

        for doc in docs:
            rec = extract_record(doc)
            if rec is None:
                continue
            key = dedup_key(rec)
            if key not in seen_keys:
                seen_keys.add(key)
                all_results.append(rec)
                new_count += 1

        print(f"  Page {page}: {len(docs)} docs, {new_count} new unique (total: {len(all_results)})")

        if page * RESULTS_PER_PAGE >= total_found:
            break
        page += 1

    print(f"  => Added {new_count} new records from this search")


def is_latin_translation(rec: dict) -> bool:
    """Heuristic check if a record is likely a Latin-to-English translation."""
    subjects_lower = rec["subjects"].lower()
    title_lower = rec["english_title"].lower()

    # Strong positive signals
    latin_signals = [
        "latin literature",
        "latin poetry",
        "latin prose",
        "translations into english",
        "latin language",
        "classical literature",
        "latin authors",
    ]

    has_latin_signal = any(s in subjects_lower for s in latin_signals)

    # Title-based signals
    title_signals = [
        "translated from the latin",
        "translated from latin",
        "translation from latin",
        "english translation",
        "with an english translation",
        "latin text",
        "latin and english",
    ]
    has_title_signal = any(s in title_lower for s in title_signals)

    return has_latin_signal or has_title_signal


def main():
    print("=" * 70)
    print("Open Library Latin-to-English Translation Search")
    print(f"Date range: {MIN_YEAR}-{MAX_YEAR}")
    print("=" * 70)

    # =========================================================================
    # STRATEGY 1: Subject searches for Latin literature + translations
    # =========================================================================

    subject_queries = [
        ("Latin literature -- Translations into English", {
            "subject": "Latin literature, Translations into English",
        }),
        ("Latin poetry -- Translations into English", {
            "subject": "Latin poetry, Translations into English",
        }),
        ("Latin prose -- Translations into English", {
            "subject": "Latin prose, Translations into English",
        }),
        ("Latin literature translations", {
            "q": "subject:\"Latin literature\" \"Translations into English\"",
        }),
        ("Latin poetry translations", {
            "q": "subject:\"Latin poetry\" \"Translations into English\"",
        }),
        ("Latin language translations English", {
            "q": "subject:\"Latin language\" \"Translations into English\"",
        }),
        ("Classical literature translations English", {
            "q": "subject:\"classical literature\" \"translations into English\"",
        }),
        ("Latin authors translations", {
            "q": "\"Latin\" \"translated into English\"",
        }),
        ("Latin text with English translation", {
            "q": "\"Latin text\" \"English translation\"",
        }),
        ("Latin and English bilingual", {
            "q": "\"Latin and English\"",
            "subject": "Latin literature",
        }),
    ]

    for label, params in subject_queries:
        run_search(label, params, max_pages=20)

    # =========================================================================
    # STRATEGY 2: Known translator names (Loeb Classical Library translators)
    # =========================================================================

    translators = [
        "H. Rushton Fairclough",
        "W.H.D. Rouse",
        "Frank Justus Miller",
        "J.C. Rolfe",
        "C.H. Moore",
        "B.O. Foster",
        "E.T. Sage",
        "A.C. Schlesinger",
        "F.G. Moore",
        "E.H. Warmington",
        "H. Rackham",
        "W.A. Falconer",
        "C.L. Sherman",
        "E.S. Forster",
        "D.W. Thompson",
        "G.P. Goold",
        "J.H. Mozley",
        "A.L. Wheeler",
        "C. Keyes",
        "W. Heinemann",  # publisher but sometimes listed as author
        "J.D. Duff",
        "F.C. Babcock",
        "W.C.A. Ker",
        "Walter C.A. Ker",
        "A.S. Way",
        "G.G. Ramsay",
        "C.E. Bennett",
        "J.S. Watson",
        "John Selby Watson",
        "H.E. Butler",
        "G. Showerman",
        "E. Capps",
        "W.B. Anderson",
        "J.E. King",
        "J.W. Mackail",
        "R.C. Jebb",
        "Thomas Taylor",
        "E.V. Rieu",
    ]

    for translator in translators:
        run_search(
            f"Translator: {translator}",
            {"author": translator, "q": "Latin OR Loeb OR classical"},
            max_pages=5,
        )

    # =========================================================================
    # STRATEGY 3: Known series
    # =========================================================================

    series_queries = [
        ("Loeb Classical Library", {
            "q": "\"Loeb Classical Library\"",
        }),
        ("Bohn's Classical Library", {
            "q": "\"Bohn's Classical Library\" OR \"Bohn Classical Library\"",
        }),
        ("Bohn's Ecclesiastical Library", {
            "q": "\"Bohn's Ecclesiastical Library\" OR \"Bohn Ecclesiastical Library\"",
        }),
        ("Ante-Nicene Fathers", {
            "q": "\"Ante-Nicene Fathers\"",
        }),
        ("Nicene and Post-Nicene Fathers", {
            "q": "\"Nicene and Post-Nicene Fathers\"",
        }),
        ("Penguin Classics Latin", {
            "q": "\"Penguin Classics\" Latin",
            "subject": "Latin literature",
        }),
        ("Oxford Classical Texts translation", {
            "q": "\"Oxford Classical\" translation Latin",
        }),
        ("Temple Classics Latin", {
            "q": "\"Temple Classics\" Latin",
        }),
        ("Everyman's Library Latin classics", {
            "q": "\"Everyman's Library\" Latin classical",
        }),
    ]

    for label, params in series_queries:
        run_search(label, params, max_pages=15)

    # =========================================================================
    # STRATEGY 4: Specific classical Latin authors
    # =========================================================================

    latin_authors = [
        "Virgil", "Vergil", "Cicero", "Ovid", "Horace", "Livy",
        "Tacitus", "Seneca", "Pliny", "Juvenal", "Martial",
        "Lucretius", "Catullus", "Sallust", "Caesar",
        "Quintilian", "Petronius", "Apuleius", "Statius",
        "Lucan", "Persius", "Terence", "Plautus",
        "Suetonius", "Vitruvius", "Columella", "Varro",
        "Aulus Gellius", "Boethius", "Augustine",
        "Thomas Aquinas", "Erasmus", "Thomas More",
        "Lactantius", "Tertullian", "Jerome",
        "Ambrose", "Gregory the Great",
        "Bede", "Roger Bacon", "Albertus Magnus",
        "Marsilio Ficino", "Pico della Mirandola",
        "Francis Bacon", "Giordano Bruno",
        "Cornelius Agrippa", "Paracelsus",
    ]

    for author in latin_authors:
        run_search(
            f"Author: {author} (English translation)",
            {
                "author": author,
                "q": "translation OR translated OR English",
                "language": "eng",
            },
            max_pages=5,
        )

    # =========================================================================
    # STRATEGY 5: Additional broad subject searches
    # =========================================================================

    broad_queries = [
        ("Medieval Latin translations", {
            "q": "\"medieval Latin\" translation English",
        }),
        ("Church Fathers English translation", {
            "q": "\"Church Fathers\" translation English",
        }),
        ("Patristic translations", {
            "q": "\"patristic\" translation English Latin",
        }),
        ("Scholastic philosophy translations", {
            "q": "\"scholastic\" Latin English translation",
        }),
        ("Renaissance Latin translations", {
            "q": "\"Renaissance\" Latin translation English",
            "subject": "Latin",
        }),
        ("Neo-Latin translations", {
            "q": "\"Neo-Latin\" OR \"neo-Latin\" translation English",
        }),
    ]

    for label, params in broad_queries:
        run_search(label, params, max_pages=10)

    # =========================================================================
    # POST-PROCESSING: Filter and sort
    # =========================================================================

    print(f"\n{'='*70}")
    print(f"POST-PROCESSING")
    print(f"{'='*70}")
    print(f"Total raw unique records: {len(all_results)}")

    # Sort by year
    all_results.sort(key=lambda r: (r["pub_year"], r["author"], r["english_title"]))

    # Write to CSV
    fieldnames = [
        "ol_key", "pub_year", "author", "english_title", "translator",
        "publisher", "subjects", "edition_count", "language",
    ]

    with open(OUTPUT_PATH, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for rec in all_results:
            writer.writerow(rec)

    print(f"\nWrote {len(all_results)} records to {OUTPUT_PATH}")

    # Print summary statistics
    decade_counts = {}
    for rec in all_results:
        decade = (rec["pub_year"] // 10) * 10
        decade_counts[decade] = decade_counts.get(decade, 0) + 1

    print(f"\nRecords by decade:")
    for decade in sorted(decade_counts):
        count = decade_counts[decade]
        bar = "#" * (count // 5)
        print(f"  {decade}s: {count:5d} {bar}")

    # Top authors
    author_counts = {}
    for rec in all_results:
        a = rec["author"].split(";")[0].strip()
        if a:
            author_counts[a] = author_counts.get(a, 0) + 1

    print(f"\nTop 25 authors:")
    for author, count in sorted(author_counts.items(), key=lambda x: -x[1])[:25]:
        print(f"  {count:4d}  {author}")

    print(f"\nDone! Total records: {len(all_results)}")


if __name__ == "__main__":
    main()
