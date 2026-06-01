#!/usr/bin/env python3
"""Sync latin_translations_master.csv to Supabase latin_translations table."""

import csv, os, math
import psycopg2
from supabase import create_client

BASE = '/Users/dereklomas/secondrenaissance/scripts'
MASTER = f'{BASE}/latin_translations_master.csv'

SUPABASE_URL = "https://ykhxaecbbxaaqlujuzde.supabase.co"
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

# Direct Postgres connection for DDL
DB_HOST = "db.ykhxaecbbxaaqlujuzde.supabase.co"
DB_NAME = "postgres"
DB_USER = "postgres"
DB_PASS = os.environ.get("SUPABASE_DB_PASSWORD", "")
DB_PORT = 5432

FIELDS = ['source', 'series', 'author', 'english_title', 'original_title',
          'translator', 'pub_year', 'place', 'publisher', 'country',
          'original_year', 'era', 'canonical_author', 'canonical_work']

CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS latin_translations (
    id SERIAL PRIMARY KEY,
    source TEXT,
    series TEXT,
    author TEXT,
    english_title TEXT,
    original_title TEXT,
    translator TEXT,
    pub_year TEXT,
    place TEXT,
    publisher TEXT,
    country TEXT,
    original_year TEXT,
    era TEXT,
    canonical_author TEXT,
    canonical_work TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE latin_translations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'latin_translations' AND policyname = 'lt_public_read'
    ) THEN
        CREATE POLICY "lt_public_read" ON latin_translations FOR SELECT USING (true);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'latin_translations' AND policyname = 'lt_service_write'
    ) THEN
        CREATE POLICY "lt_service_write" ON latin_translations FOR ALL USING (true);
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_lt_author ON latin_translations(canonical_author);
CREATE INDEX IF NOT EXISTS idx_lt_era ON latin_translations(era);
CREATE INDEX IF NOT EXISTS idx_lt_pub_year ON latin_translations(pub_year);
CREATE INDEX IF NOT EXISTS idx_lt_source ON latin_translations(source);
"""

def create_table_via_postgres(password):
    """Create table via direct Postgres connection."""
    print("Creating table via direct Postgres connection...", flush=True)
    conn = psycopg2.connect(
        host=DB_HOST, dbname=DB_NAME, user=DB_USER,
        password=password, port=DB_PORT, sslmode='require'
    )
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute(CREATE_TABLE_SQL)
    cur.close()
    conn.close()
    print("Table created/verified", flush=True)

def load_csv():
    """Load and clean the master CSV."""
    print("Loading master CSV...", flush=True)
    rows = []
    with open(MASTER, encoding='utf-8') as f:
        for r in csv.DictReader(f):
            cleaned = {}
            for k in FIELDS:
                v = (r.get(k) or '').strip()
                v = v.replace('&amp;', '&')
                cleaned[k] = v if v else None
            rows.append(cleaned)
    print(f"Loaded {len(rows)} records", flush=True)
    return rows

def sync_via_supabase_client(rows):
    """Upload data via Supabase REST API."""
    print("Connecting to Supabase...", flush=True)
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

    # Clear existing data
    print("Clearing existing data...", flush=True)
    try:
        supabase.table('latin_translations').delete().gte('id', 0).execute()
        print("Cleared existing records", flush=True)
    except Exception as e:
        print(f"Clear note: {e}", flush=True)

    # Upload in batches
    batch_size = 500
    total_batches = math.ceil(len(rows) / batch_size)
    uploaded = 0

    print(f"Uploading {len(rows)} records in {total_batches} batches...", flush=True)
    for i in range(0, len(rows), batch_size):
        batch = rows[i:i+batch_size]
        batch_num = i // batch_size + 1
        try:
            supabase.table('latin_translations').insert(batch).execute()
            uploaded += len(batch)
            print(f"  Batch {batch_num}/{total_batches}: {len(batch)} records (total: {uploaded})", flush=True)
        except Exception as e:
            print(f"  Batch {batch_num}/{total_batches} FAILED: {e}", flush=True)

    # Verify
    result = supabase.table('latin_translations').select('id', count='exact').limit(1).execute()
    print(f"\nDone! Total records in Supabase: {result.count}", flush=True)

    # Era breakdown
    for era in ['classical', 'medieval', 'renaissance', 'early_modern', 'modern']:
        r = supabase.table('latin_translations').select('id', count='exact').eq('era', era).limit(1).execute()
        print(f"  {era}: {r.count}", flush=True)

def main():
    rows = load_csv()

    # Step 1: Create table via direct Postgres
    db_pass = os.environ.get("SUPABASE_DB_PASSWORD", "")
    if not db_pass:
        # Try to get from keychain or prompt
        import subprocess
        try:
            result = subprocess.run(
                ['security', 'find-generic-password', '-s', 'supabase-db-password', '-w'],
                capture_output=True, text=True
            )
            if result.returncode == 0:
                db_pass = result.stdout.strip()
        except Exception:
            pass

    if db_pass:
        create_table_via_postgres(db_pass)
    else:
        print("No DB password found. Set SUPABASE_DB_PASSWORD or add to keychain as 'supabase-db-password'", flush=True)
        print("Trying to proceed (table may already exist)...", flush=True)

    # Step 2: Upload data via REST API
    sync_via_supabase_client(rows)

if __name__ == '__main__':
    main()
