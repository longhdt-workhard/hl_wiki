import type { KhachHang } from '@/types/database.types';

/**
 * Fetch all customers (khach hang)
 */
export async function getKhachHang() {
  const response = await fetch('/api/khachhang');
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch customers');
  }

  return response.json() as Promise<KhachHang[]>;
}

/**
 * Search customers by name, phone, email, or code
 */
export async function searchKhachHang(searchTerm: string) {
  const response = await fetch(`/api/khachhang?search=${encodeURIComponent(searchTerm)}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to search customers');
  }

  return response.json() as Promise<KhachHang[]>;
}

/**
 * Fetch a single customer by ID
 */
export async function getKhachHangById(ma_nhacungcap: string) {
  const response = await fetch(`/api/khachhang/${encodeURIComponent(ma_nhacungcap)}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch customer');
  }

  return response.json() as Promise<KhachHang>;
}

