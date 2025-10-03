'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <div className="text-lg text-gray-600">Đang tải...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 lg:p-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Chào mừng đến với Hệ thống Quản lý Hàng hóa
          </h1>
          <p className="text-gray-600">
            Xin chào, <span className="font-medium text-blue-600">{user?.email}</span>
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Customers Card */}
          <Link href="/khachhang">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-blue-200">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Quản lý Khách hàng</h2>
                  <p className="text-gray-600 mb-4">
                    Xem danh sách khách hàng, thông tin chi tiết và lịch sử mua hàng
                  </p>
                  <div className="flex items-center text-blue-600 font-medium">
                    Xem danh sách
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Products Card */}
          <Link href="/hanghoa">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-green-200">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-lg p-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Quản lý Hàng hóa</h2>
                  <p className="text-gray-600 mb-4">
                    Quản lý danh mục sản phẩm, giá cả và thông tin chi tiết
                  </p>
                  <div className="flex items-center text-green-600 font-medium">
                    Xem danh sách
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Info Section */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Hướng dẫn sử dụng</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Chọn <strong>Khách hàng</strong> để xem danh sách và chi tiết khách hàng</li>
                <li>• Chọn <strong>Hàng hóa</strong> để quản lý sản phẩm</li>
                <li>• Sử dụng thanh tìm kiếm để tìm kiếm nhanh</li>
                <li>• Nhấn vào tên khách hàng để xem lịch sử mua hàng chi tiết</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
