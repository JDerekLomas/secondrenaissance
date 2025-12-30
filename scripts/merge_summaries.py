#!/usr/bin/env python3
"""
Merge summaries from checkpoint into incunabula_books.json for visualization.
"""

import json
import re
from pathlib import Path

CHECKPOINT_FILE = Path(__file__).parent / "istc_summary_checkpoint.json"
ENRICHED_FILE = Path(__file__).parent / "istc_enriched.json"
OUTPUT_FILE = Path(__file__).parent.parent / "viz/public/incunabula_books.json"

def extract_year(date_str):
    """Extract year from complex date strings like '12 July 1493' or '[after 2 Mar. 1491]'."""
    if not date_str:
        return None
    date_str = str(date_str)
    # Find all 4-digit years in the string
    years = re.findall(r'\b(14\d{2}|150[0-1])\b', date_str)
    if years:
        return int(years[0])
    # Try 2-digit suffix patterns like "1486-]87" -> 1487
    match = re.search(r'(14\d{2})[^\d]*(\d{2})\b', date_str)
    if match:
        return int(f"14{match.group(2)}")
    return None

def main():
    # Load checkpoint with summaries
    print("Loading checkpoint...")
    with open(CHECKPOINT_FILE) as f:
        checkpoint = json.load(f)
    summaries = checkpoint.get("summaries", {})
    print(f"Loaded {len(summaries):,} summaries")

    # Load enriched records
    print("Loading enriched records...")
    with open(ENRICHED_FILE) as f:
        records = json.load(f)
    print(f"Loaded {len(records):,} records")

    # Merge summaries into all records (ISTC is all incunabula by definition)
    print("Merging summaries...")
    output = []
    summary_count = 0

    for record in records:
        # All ISTC records are incunabula (1450-1500), no filtering needed
        year = extract_year(record.get("date"))
        if year:
            record["year"] = year  # Add parsed year

        if record["id"] in summaries:
            record["summary"] = summaries[record["id"]]
            summary_count += 1
        output.append(record)

    print(f"Total records: {len(output):,}")
    print(f"With summaries: {summary_count:,} ({100*summary_count/len(output):.1f}%)")

    # Save output
    print(f"Saving to {OUTPUT_FILE}...")
    with open(OUTPUT_FILE, "w") as f:
        json.dump(output, f)

    print("Done!")

if __name__ == "__main__":
    main()
