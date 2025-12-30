#!/usr/bin/env python3
"""
Fetch digital links and metadata from ISTC API for all incunabula records.
Saves progress incrementally to avoid losing work.
Uses ThreadPoolExecutor instead of asyncio for compatibility.
"""

import json
import time
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import pandas as pd

# Configuration
ISTC_API_BASE = "https://data.cerl.org/istc"
OUTPUT_FILE = Path(__file__).parent / "istc_digital_links.json"
CHECKPOINT_FILE = Path(__file__).parent / "istc_checkpoint.json"
BATCH_SIZE = 100  # Records per checkpoint save
WORKERS = 8  # Parallel requests

session = requests.Session()

def fetch_record(istc_id):
    """Fetch a single ISTC record."""
    url = f"{ISTC_API_BASE}/{istc_id}?_format=json"
    try:
        response = session.get(url, timeout=30)
        if response.status_code == 200:
            data = response.json()
            return extract_record_data(istc_id, data)
        else:
            return {"id": istc_id, "error": f"HTTP {response.status_code}"}
    except Exception as e:
        return {"id": istc_id, "error": str(e)}

def extract_record_data(istc_id, data):
    """Extract relevant fields from ISTC API response."""
    record_data = data.get("data", {})

    # Extract digital links
    resources = record_data.get("related_resources", [])
    digital_links = []
    for r in resources:
        if r.get("resource_type") == "digital" and r.get("resource_url"):
            digital_links.append({
                "name": r.get("resource_name", "").replace("Electronic facsimile : ", ""),
                "url": r.get("resource_url")
            })

    # Extract holdings
    holdings = record_data.get("holdings", [])
    holding_list = [h.get("holding_institution_name") for h in holdings if h.get("holding_institution_name")]

    # Extract references (for citations)
    references = record_data.get("references", [])
    ref_list = []
    for ref in references[:5]:
        ref_name = ref.get("reference_name", "")
        ref_loc = ref.get("reference_location_in_source", "")
        if ref_name:
            ref_list.append(f"{ref_name} {ref_loc}".strip())

    # Extract imprint info
    imprint = record_data.get("imprint", [{}])[0] if record_data.get("imprint") else {}

    return {
        "id": istc_id,
        "title": record_data.get("title", ""),
        "language": record_data.get("language_of_item", ""),
        "format": record_data.get("dimensions", ""),
        "printer": imprint.get("imprint_name", ""),
        "place": imprint.get("imprint_place", ""),
        "date": imprint.get("imprint_date", ""),
        "notes": record_data.get("notes", []),
        "digital_links": digital_links,
        "holdings_count": len(holdings),
        "holdings": holding_list[:10],
        "references": ref_list,
        "has_woodcuts": record_data.get("woodcut", False),
    }

def load_checkpoint():
    """Load progress from checkpoint file."""
    if CHECKPOINT_FILE.exists():
        with open(CHECKPOINT_FILE, "r") as f:
            return json.load(f)
    return {"processed_ids": [], "records": {}}

def save_checkpoint(checkpoint):
    """Save progress to checkpoint file."""
    with open(CHECKPOINT_FILE, "w") as f:
        json.dump(checkpoint, f)
    # Also save main output
    with open(OUTPUT_FILE, "w") as f:
        json.dump(list(checkpoint["records"].values()), f)

def main():
    # Load ISTC IDs from CSV
    csv_path = Path(__file__).parent / "istc_imprints.csv"
    df = pd.read_csv(csv_path, low_memory=False)
    all_ids = df["Unnamed: 0"].dropna().tolist()

    print(f"Total ISTC records: {len(all_ids)}")

    # Load checkpoint
    checkpoint = load_checkpoint()
    processed = set(checkpoint["processed_ids"])
    records = checkpoint["records"]

    # Filter to unprocessed IDs
    remaining_ids = [id for id in all_ids if id not in processed]
    print(f"Already processed: {len(processed)}")
    print(f"Remaining: {len(remaining_ids)}")

    if not remaining_ids:
        print("All records already processed!")
        return

    start_time = time.time()
    batch_count = 0

    with ThreadPoolExecutor(max_workers=WORKERS) as executor:
        futures = {executor.submit(fetch_record, id): id for id in remaining_ids}

        for future in as_completed(futures):
            result = future.result()
            records[result["id"]] = result
            processed.add(result["id"])
            batch_count += 1

            # Save checkpoint periodically
            if batch_count % BATCH_SIZE == 0:
                checkpoint["processed_ids"] = list(processed)
                checkpoint["records"] = records
                save_checkpoint(checkpoint)

                total_processed = len(processed)
                digital_count = sum(1 for r in records.values() if r.get("digital_links"))
                elapsed = time.time() - start_time
                rate = total_processed / elapsed if elapsed > 0 else 0

                print(f"Progress: {total_processed}/{len(all_ids)} ({100*total_processed/len(all_ids):.1f}%) - "
                      f"{digital_count} with digital links - "
                      f"{rate:.1f} rec/s")

    # Final save
    checkpoint["processed_ids"] = list(processed)
    checkpoint["records"] = records
    save_checkpoint(checkpoint)

    # Summary
    total = len(records)
    with_digital = sum(1 for r in records.values() if r.get("digital_links"))
    print(f"\n=== Complete ===")
    print(f"Total records: {total}")
    print(f"With digital links: {with_digital} ({100*with_digital/total:.1f}%)")
    print(f"Output: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
