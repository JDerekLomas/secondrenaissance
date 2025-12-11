import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const q = searchParams.get('q') || '';
  const keyword = searchParams.get('keyword') || '';
  const yearMin = parseInt(searchParams.get('yearMin') || '1400');
  const yearMax = parseInt(searchParams.get('yearMax') || '1700');
  const hasIaMatch = searchParams.get('hasIaMatch'); // 'true', 'false', or null for all
  const language = searchParams.get('language') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '25'), 100);
  const offset = (page - 1) * limit;

  try {
    let query = supabase
      .from('bph_works')
      .select('id, ubn, title, author, place, year, keywords, language, ia_identifier, ia_url, ia_match_confidence, ia_match_method', { count: 'exact' });

    // Text search on title and author
    if (q) {
      query = query.or(`title.ilike.%${q}%,author.ilike.%${q}%`);
    }

    // Keyword filter (e.g., 'hermetica', 'alchemy')
    if (keyword) {
      query = query.ilike('keywords', `%${keyword}%`);
    }

    // Year range
    query = query.gte('year', yearMin).lte('year', yearMax);

    // IA match filter
    if (hasIaMatch === 'true') {
      query = query.not('ia_identifier', 'is', null);
    } else if (hasIaMatch === 'false') {
      query = query.is('ia_identifier', null);
    }

    // Language filter
    if (language) {
      query = query.ilike('language', `%${language}%`);
    }

    // Order and paginate
    query = query
      .order('year', { ascending: true })
      .order('title', { ascending: true })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('BPH catalog search error:', error);
      return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }

    return NextResponse.json({
      items: data || [],
      total: count || 0,
      page,
      limit
    });
  } catch (err) {
    console.error('BPH catalog error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
