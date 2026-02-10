#!/usr/bin/env python3
"""
Post-process the raw Internet Archive search results to:
1. Add ia_url column
2. Classify each record as 'translation', 'bilingual', 'secondary', or 'latin_only'
3. Add a confidence score for whether it's actually a Latin-to-English translation
4. Remove clear non-translations
5. Save cleaned version

Input:  scripts/hathitrust_latin_pre1979.csv (raw)
Output: scripts/hathitrust_latin_pre1979.csv (cleaned, same file)
"""

import csv
import re

INPUT_FILE = "/Users/dereklomas/secondrenaissance/scripts/hathitrust_latin_pre1979.csv"
OUTPUT_FILE = "/Users/dereklomas/secondrenaissance/scripts/hathitrust_latin_pre1979.csv"

# Known Latin authors (for identifying translations of their works)
LATIN_AUTHORS = {
    "cicero", "virgil", "vergil", "ovid", "horace", "seneca", "livy",
    "tacitus", "pliny", "catullus", "lucretius", "juvenal", "martial",
    "plautus", "terence", "apuleius", "petronius", "caesar", "sallust",
    "lucan", "statius", "propertius", "tibullus", "varro", "gellius",
    "suetonius", "augustine", "boethius", "aquinas", "erasmus",
    "ammianus", "sidonius", "claudian", "prudentius", "lactantius",
    "quintilian", "vitruvius", "columella", "celsus", "frontinus",
    "aulus gellius", "macrobius", "servius", "donatus", "priscian",
    "valerius flaccus", "valerius maximus", "curtius", "nepos",
    "justinus", "eutropius", "vegetius", "tertullian", "cyprian",
    "ambrose", "jerome", "gregory", "benedict", "bede", "anselm",
    "abelard", "thomas aquinas", "thomas more", "petrarch", "dante",
    "boccaccio", "ficino", "pico", "albertus magnus",
}


def classify_record(record):
    """
    Classify a record and return (record_type, confidence, keep).

    record_type: 'translation', 'bilingual_edition', 'anthology', 'secondary', 'latin_only', 'patristic'
    confidence: 0-100
    keep: True/False
    """
    title = record.get("title", "").lower()
    subject = record.get("subject", "").lower()
    lang = record.get("language", "").lower()
    creator = record.get("creator", "").lower()
    desc = record.get("description", "").lower()
    publisher = record.get("publisher", "").lower()
    all_text = f"{title} {subject} {desc} {creator} {publisher}"

    confidence = 0
    record_type = "unknown"
    keep = True

    # === STRONG POSITIVE SIGNALS ===

    # Explicit "translations into English" in subject
    if "translations into english" in subject:
        confidence += 40
        record_type = "translation"

    # "translated from the latin" in title
    if "translated from the latin" in title or "translated from latin" in title:
        confidence += 45
        record_type = "translation"

    # "with an english translation" in title (bilingual editions like Loeb)
    if "with an english translation" in title or "english translation" in title:
        confidence += 40
        record_type = "bilingual_edition"

    # "latin text and english" in title or description
    if "latin text and english" in all_text or "latin and english" in all_text:
        confidence += 35
        record_type = "bilingual_edition"

    # Loeb Classical Library
    if "loeb" in subject or "loeb classical" in all_text:
        confidence += 35
        record_type = "bilingual_edition"

    # Known translation series publishers
    if "heinemann" in publisher and ("lat" in lang or "latin" in subject):
        confidence += 25
        if record_type == "unknown":
            record_type = "bilingual_edition"

    if "bohn" in publisher:
        confidence += 20
        if record_type == "unknown":
            record_type = "translation"

    # Both English and Latin in language field
    if "eng" in lang and "lat" in lang:
        confidence += 20
        if record_type == "unknown":
            record_type = "bilingual_edition"

    # Has English in language field (at least the translation exists)
    if "eng" in lang:
        confidence += 10

    # Nicene/Ante-Nicene Fathers (major patristic translation series)
    if "nicene" in title or "ante-nicene" in title:
        confidence += 35
        record_type = "patristic"

    # Church fathers translations
    if "fathers of the church" in subject or "church fathers" in subject:
        confidence += 25
        record_type = "patristic"

    # Known Latin author as creator
    creator_first = creator.split(";")[0].split(",")[0].strip()
    if any(auth in creator_first for auth in LATIN_AUTHORS):
        confidence += 15

    # Specific translation indicators in description
    if "opposite pages" in desc or "parallel" in desc or "facing pages" in desc:
        confidence += 20
        if record_type == "unknown":
            record_type = "bilingual_edition"

    # === NEGATIVE SIGNALS ===

    # Latin-only text (no English)
    if "lat" in lang and "eng" not in lang and "english" not in lang:
        confidence -= 30
        if record_type == "unknown":
            record_type = "latin_only"

    # Pure secondary literature (about Latin literature, not translation)
    secondary_indicators = [
        "history and criticism", "bibliography", "history of",
        "lectures and essays", "literary criticism",
        "latin philology", "classical education",
    ]
    if any(ind in all_text for ind in secondary_indicators) and "translation" not in all_text:
        confidence -= 20
        if record_type == "unknown":
            record_type = "secondary"

    # Medical/scientific Latin texts (not literary translations)
    if any(term in subject for term in ["anatomy", "medicine", "surgery", "botany", "zoology"]):
        if "translation" not in all_text:
            confidence -= 25
            record_type = "latin_only"

    # Patrologia volumes in Latin only (not English translations)
    if "patrologia" in title and "lat" in lang and "eng" not in lang:
        confidence -= 15
        record_type = "latin_only"

    # Summa volumes that are Latin-only editions
    if "summa" in title and "lat" in lang and "eng" not in lang and "translation" not in all_text:
        confidence -= 20
        record_type = "latin_only"

    # Cap confidence
    confidence = max(0, min(100, confidence))

    # Decide whether to keep
    # Keep: translations, bilingual editions, patristic series, and anything with confidence >= 20
    # Remove: latin-only with low confidence, pure secondary literature
    if record_type == "latin_only" and confidence < 15:
        keep = False
    elif record_type == "secondary" and confidence < 20:
        keep = False
    elif confidence < 5:
        keep = False

    return record_type, confidence, keep


def main():
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        records = list(reader)

    print(f"Input records: {len(records)}")

    # Classify each record
    classified = []
    type_counts = {}
    removed = 0

    for record in records:
        record_type, confidence, keep = classify_record(record)

        if keep:
            record["record_type"] = record_type
            record["confidence"] = str(confidence)
            record["ia_url"] = f"https://archive.org/details/{record['identifier']}"
            classified.append(record)
            type_counts[record_type] = type_counts.get(record_type, 0) + 1
        else:
            removed += 1

    print(f"Removed: {removed}")
    print(f"Kept: {len(classified)}")
    print(f"\nBy type:")
    for t, c in sorted(type_counts.items(), key=lambda x: -x[1]):
        print(f"  {t}: {c}")

    # Sort by confidence desc, then year
    classified.sort(key=lambda r: (-int(r.get("confidence", 0)), r.get("pub_year", "9999")))

    # Write output
    output_fields = [
        "pub_year", "record_type", "confidence", "identifier", "title",
        "creator", "publisher", "subject", "language", "ia_url",
        "description", "collection"
    ]

    with open(OUTPUT_FILE, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=output_fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(classified)

    print(f"\nSaved {len(classified)} records to {OUTPUT_FILE}")

    # Summary stats
    high_conf = [r for r in classified if int(r["confidence"]) >= 40]
    med_conf = [r for r in classified if 20 <= int(r["confidence"]) < 40]
    low_conf = [r for r in classified if int(r["confidence"]) < 20]

    print(f"\nConfidence distribution:")
    print(f"  High (>=40): {len(high_conf)}")
    print(f"  Medium (20-39): {len(med_conf)}")
    print(f"  Low (<20): {len(low_conf)}")

    # Show some high-confidence examples
    print(f"\nTop 15 highest-confidence records:")
    for r in classified[:15]:
        print(f"  [{r['pub_year']}] conf={r['confidence']} type={r['record_type']}")
        print(f"    {r['title'][:80]}")
        print(f"    {r['creator'][:50]}")
        print()


if __name__ == "__main__":
    main()
