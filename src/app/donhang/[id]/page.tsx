'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getOrderWithDetails } from '@/lib/api/xuat-hanghoa';
import type { XuatHangHoa, XuatChiTietHangHoa, KhachHang } from '@/types/database.types';

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [mounted, setMounted] = useState(false);
  const [order, setOrder] = useState<XuatHangHoa | null>(null);
  const [orderDetails, setOrderDetails] = useState<XuatChiTietHangHoa[]>([]);
  const [customer, setCustomer] = useState<KhachHang | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getOrderWithDetails(orderId);
        
        setOrder(data.order);
        setOrderDetails(data.details);
        setCustomer(data.customer);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (mounted) {
      fetchData();
    }
  }, [orderId, mounted]);

  const formatCurrency = (amount: number) => {
    if (!mounted) return amount.toString();
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!mounted) return dateString;
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatNumber = (num: number) => {
    if (!mounted) return num.toString();
    return num.toLocaleString('vi-VN');
  };

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <div className="text-lg text-gray-600">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-800">Lỗi</h3>
          </div>
          <p className="text-red-600">{error || 'Không tìm thấy đơn hàng'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 lg:p-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại
        </button>

        {/* Order Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Đơn hàng #{order.ma_chungtu}
              </h1>
              <p className="text-gray-600">
                Ngày: {formatDate(order.ngay_chungtu)}
              </p>
            </div>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Hoàn thành
            </span>
          </div>

          {/* Order Info Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customer && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Khách hàng</div>
                <div className="font-medium text-gray-900">{customer.ten_nhacungcap}</div>
                <div className="text-sm text-gray-600">{customer.ma_nhacungcap}</div>
              </div>
            )}

            {order.so_hoadon && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Số hóa đơn</div>
                <div className="font-medium text-gray-900">{order.so_hoadon}</div>
              </div>
            )}

            {order.ma_kho && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Kho</div>
                <div className="font-medium text-gray-900">{order.ma_kho}</div>
              </div>
            )}

            {order.ma_nvgiaohang && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Nhân viên giao hàng</div>
                <div className="font-medium text-gray-900">{order.ma_nvgiaohang}</div>
              </div>
            )}

            {order.diengiai && (
              <div className="md:col-span-2">
                <div className="text-xs text-gray-500 mb-1">Diễn giải</div>
                <div className="font-medium text-gray-900">{order.diengiai}</div>
              </div>
            )}
          </div>
        </div>

        {/* Order Items Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Chi tiết đơn hàng ({orderDetails.length} sản phẩm)
            </h2>
          </div>

          {orderDetails.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-600">Không có sản phẩm nào</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      STT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mã hàng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số lô
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hạn dùng
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Đơn giá
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chiết khấu (%)
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá vốn
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderDetails.map((item, index) => (
                    <tr key={item.ID} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-blue-600">
                          {item.ma_hanghoa}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {item.solo || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {item.handung ? formatDate(item.handung) : '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-sm font-medium text-gray-900">
                          {formatNumber(item.soluongle)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-sm text-gray-900">
                          {formatCurrency(item.dongia)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-sm text-gray-600">
                          {item.chietkhau}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-sm text-gray-600">
                          {formatCurrency(item.giavon)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-sm font-semibold text-green-600">
                          {formatCurrency(item.thanhtien)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-right font-semibold text-gray-900">
                      Tổng cộng:
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">
                      {formatNumber(orderDetails.reduce((sum, item) => sum + item.soluongle, 0))}
                    </td>
                    <td colSpan={3}></td>
                    <td className="px-6 py-4 text-right font-bold text-green-600 text-lg">
                      {formatCurrency(orderDetails.reduce((sum, item) => sum + item.thanhtien, 0))}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-1">Tổng tiền</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(order.tongtien)}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-1">Chiết khấu</div>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(order.chietkhau)}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 mb-1">Thành tiền</div>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(order.thanhtien)}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {order.ghichu && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="text-sm font-medium text-yellow-800 mb-1">Ghi chú</div>
                <div className="text-sm text-yellow-700">{order.ghichu}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
