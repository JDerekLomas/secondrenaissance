import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const yearMin = parseInt(searchParams.get('yearMin') || '1450');
  const yearMax = parseInt(searchParams.get('yearMax') || '1700');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
  const offset = (page - 1) * limit;

  try {
    let dbQuery = supabase
      .from('ia_latin_texts')
      .select('identifier, title, creator, year, subject, downloads', { count: 'exact' });

    // Filter by year range
    if (yearMin) {
      dbQuery = dbQuery.gte('year', yearMin);
    }
    if (yearMax) {
      dbQuery = dbQuery.lte('year', yearMax);
    }

    // Search in title or creator if query provided
    if (query) {
      // Use Postgres full-text search or ilike for simple matching
      dbQuery = dbQuery.or(`title.ilike.%${query}%,creator.ilike.%${query}%`);
    }

    // Order by downloads (popularity) and paginate
    dbQuery = dbQuery
      .order('downloads', { ascending: false, nullsFirst: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await dbQuery;

    if (error) {
      console.error('Catalog search error:', error);
      return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }

    return NextResponse.json({
      items: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit)
    });
  } catch (err) {
    console.error('Catalog search error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
