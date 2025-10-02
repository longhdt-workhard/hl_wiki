import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Fetch order
    const { data: order, error: orderError } = await supabase
      .from('tbl_xuat_hanghoa')
      .select('*')
      .eq('ma_chungtu', id)
      .single();

    if (orderError) {
      console.error('Error fetching order:', orderError);
      return NextResponse.json({ error: orderError.message }, { status: 500 });
    }

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Fetch order details
    const { data: details, error: detailsError } = await supabase
      .from('tbl_xuat_chitiet_hanghoa')
      .select('*')
      .eq('ma_chungtu', id)
      .order('ma_hanghoa', { ascending: true });

    if (detailsError) {
      console.error('Error fetching order details:', detailsError);
      return NextResponse.json({ error: detailsError.message }, { status: 500 });
    }

    // Fetch customer if available
    let customer = null;
    if (order.ma_phu) {
      const { data: customerData, error: customerError } = await supabase
        .from('tbl_khachhang')
        .select('*')
        .eq('ma_nhacungcap', order.ma_phu)
        .single();

      if (!customerError && customerData) {
        customer = customerData;
      }
    }

    return NextResponse.json({
      order,
      details: details || [],
      customer
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
