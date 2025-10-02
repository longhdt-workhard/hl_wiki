/**
 * Fetch all products purchased by a specific customer with order details
 */
export async function getProductsByCustomer(ma_khachhang: string) {
  const response = await fetch(`/api/khachhang/${encodeURIComponent(ma_khachhang)}/products`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch products');
  }

  return response.json();
}

/**
 * Fetch order with details and customer info
 */
export async function getOrderWithDetails(ma_chungtu: string) {
  const response = await fetch(`/api/donhang/${encodeURIComponent(ma_chungtu)}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch order');
  }

  return response.json();
}
