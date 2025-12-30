#!/usr/bin/env python3
"""
Generate 100-word summaries for ISTC books using Claude Haiku.
Processes in batches with incremental saves.
"""

import json
import time
import os
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
import anthropic

# Configuration
INPUT_FILE = Path(__file__).parent / "istc_enriched.json"
OUTPUT_FILE = Path(__file__).parent / "istc_with_summaries.json"
CHECKPOINT_FILE = Path(__file__).parent / "istc_summary_checkpoint.json"
BATCH_SIZE = 100
WORKERS = 8  # Haiku handles concurrent requests well

# Initialize Anthropic client
client = anthropic.Anthropic()

def generate_summary(record):
    """Generate a 100-word summary for a book."""
    title = record.get("title", "Unknown")
    place = record.get("place", "Unknown")
    date = record.get("date", "Unknown")
    printer = record.get("printer", "Unknown")
    language = record.get("language", "Unknown")
    holdings_count = record.get("holdings_count", 0)

    prompt = f"""Write a concise 80-100 word summary of this 15th-century printed book (incunabulum).
Focus on: what the book is about, its significance, and historical context.
If you recognize the work, include information about its content and importance.
If you don't know the work, describe what can be inferred from the title.

Title: {title}
Place of printing: {place}
Date: {date}
Printer: {printer}
Language: {language}
Surviving copies: {holdings_count} institutions

Write only the summary, no introduction or labels."""

    try:
        response = client.messages.create(
            model="claude-3-5-haiku-20241022",
            max_tokens=200,
            messages=[{"role": "user", "content": prompt}]
        )
        return record.get("id"), response.content[0].text.strip()
    except Exception as e:
        return record.get("id"), None

def load_checkpoint():
    """Load progress from checkpoint file."""
    if CHECKPOINT_FILE.exists():
        with open(CHECKPOINT_FILE, "r") as f:
            return json.load(f)
    return {"summaries": {}}

def save_checkpoint(checkpoint, records):
    """Save progress to checkpoint file."""
    with open(CHECKPOINT_FILE, "w") as f:
        json.dump(checkpoint, f)

    # Merge summaries into records and save
    output = []
    for record in records:
        record_copy = record.copy()
        summary = checkpoint["summaries"].get(record["id"])
        if summary:
            record_copy["summary"] = summary
        output.append(record_copy)

    with open(OUTPUT_FILE, "w") as f:
        json.dump(output, f)

def main():
    # Load records
    with open(INPUT_FILE, "r") as f:
        records = json.load(f)

    print(f"Total records: {len(records)}")

    # Load checkpoint
    checkpoint = load_checkpoint()
    summaries = checkpoint["summaries"]

    # Filter to records needing summaries
    remaining = [r for r in records if r["id"] not in summaries]
    print(f"Already summarized: {len(summaries)}")
    print(f"Remaining: {len(remaining)}")

    if not remaining:
        print("All records already summarized!")
        return

    start_time = time.time()
    batch_count = 0
    errors = 0

    with ThreadPoolExecutor(max_workers=WORKERS) as executor:
        futures = {executor.submit(generate_summary, r): r["id"] for r in remaining}

        for future in as_completed(futures):
            record_id, summary = future.result()
            if summary:
                summaries[record_id] = summary
            else:
                errors += 1
            batch_count += 1

            # Save checkpoint periodically
            if batch_count % BATCH_SIZE == 0:
                checkpoint["summaries"] = summaries
                save_checkpoint(checkpoint, records)

                elapsed = time.time() - start_time
                rate = batch_count / elapsed if elapsed > 0 else 0
                print(f"Progress: {len(summaries)}/{len(records)} "
                      f"({100*len(summaries)/len(records):.1f}%) - "
                      f"{rate:.1f} rec/s - {errors} errors")

    # Final save
    checkpoint["summaries"] = summaries
    save_checkpoint(checkpoint, records)

    print(f"\n=== Complete ===")
    print(f"Total summaries: {len(summaries)}")
    print(f"Errors: {errors}")
    print(f"Output: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
