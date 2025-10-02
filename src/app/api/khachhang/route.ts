import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search');

  try {
    let query = supabase
      .from('tbl_khachhang')
      .select('*')
      .order('ma_nhacungcap', { ascending: true });

    // Apply search filter if provided
    if (search) {
      query = query.or(`ten_nhacungcap.ilike.%${search}%,dienthoai.ilike.%${search}%,email.ilike.%${search}%,ma_nhacungcap.ilike.%${search}%,diachi_nhacungcap.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching khach hang:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
