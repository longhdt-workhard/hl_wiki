import { supabase } from '../supabase';
import type { NhomHangHoa } from '@/types/database.types';

/**
 * Fetch all product groups (nhom hang hoa)
 */
export async function getNhomHangHoa() {
  const { data, error } = await supabase
    .from('tbl_nhom_hanghoa')
    .select('*')
    .order('ma_nhom_hanghoa', { ascending: true });

  if (error) {
    console.error('Error fetching nhom hang hoa:', error);
    throw error;
  }

  return data as NhomHangHoa[];
}

/**
 * Fetch a single product group by ID
 */
export async function getNhomHangHoaById(ma_nhom_hanghoa: string) {
  const { data, error } = await supabase
    .from('tbl_nhom_hanghoa')
    .select('*')
    .eq('ma_nhom_hanghoa', ma_nhom_hanghoa)
    .single();

  if (error) {
    console.error('Error fetching nhom hang hoa by ID:', error);
    throw error;
  }

  return data as NhomHangHoa;
}

/**
 * Create a new product group
 */
export async function createNhomHangHoa(nhomHangHoa: NhomHangHoa) {
  const { data, error } = await supabase
    .from('tbl_nhom_hanghoa')
    .insert(nhomHangHoa)
    .select()
    .single();

  if (error) {
    console.error('Error creating nhom hang hoa:', error);
    throw error;
  }

  return data as NhomHangHoa;
}

/**
 * Update an existing product group
 */
export async function updateNhomHangHoa(
  ma_nhom_hanghoa: string,
  updates: Partial<NhomHangHoa>
) {
  const { data, error } = await supabase
    .from('tbl_nhom_hanghoa')
    .update(updates)
    .eq('ma_nhom_hanghoa', ma_nhom_hanghoa)
    .select()
    .single();

  if (error) {
    console.error('Error updating nhom hang hoa:', error);
    throw error;
  }

  return data as NhomHangHoa;
}

/**
 * Delete a product group
 */
export async function deleteNhomHangHoa(ma_nhom_hanghoa: string) {
  const { error } = await supabase
    .from('tbl_nhom_hanghoa')
    .delete()
    .eq('ma_nhom_hanghoa', ma_nhom_hanghoa);

  if (error) {
    console.error('Error deleting nhom hang hoa:', error);
    throw error;
  }

  return true;
}
