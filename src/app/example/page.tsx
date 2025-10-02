'use client';

import { useEffect, useState } from 'react';
import { getNhomHangHoa } from '@/lib/api/nhom-hanghoa';
import type { NhomHangHoa } from '@/types/database.types';

export default function ExamplePage() {
  const [data, setData] = useState<NhomHangHoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const nhomHangHoa = await getNhomHangHoa();
        setData(nhomHangHoa);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Nhóm Hàng Hóa</h1>
      
      <div className="grid gap-4">
        {data.map((item) => (
          <div
            key={item.ma_nhom_hanghoa}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-blue-600">
                  {item.ma_nhom_hanghoa}
                </h2>
                <p className="text-gray-700 mt-2">{item.ten_nhom_hanghoa}</p>
                {item.ghichu && (
                  <p className="text-sm text-gray-500 mt-1">{item.ghichu}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-sm text-gray-600">
        Total records: {data.length}
      </div>
    </div>
  );
}
