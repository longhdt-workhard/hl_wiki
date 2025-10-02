// Database types for Supabase tables
// Auto-generated based on database schema

// ============================================
// PRODUCT MANAGEMENT
// ============================================

export interface NhomHangHoa {
  ma_nhom_hanghoa: string;
  ten_nhom_hanghoa: string;
  ghichu: string | null;
}

export interface HangHoa {
  ma_hanghoa: number;
  ten_bietduoc: string;
  ten_hoaduoc: string;
  donvi_thung: string | null;
  quicach_thung: string | null;
  donvi_banchan: string | null;
  quicach_banchan: string | null;
  donvi_banle: string | null;
  quicach_banle: string | null;
  dongia_bo: number;
  dongia_ban: number;
  chietkhau: number;
  ma_nhomhanghoa: string | null;
  ma_duocchinh: string | null;
  handung: number;
  min_: number;
  max_: number;
  sdk: string | null;
  dkbaoquan: string | null;
}

// ============================================
// CUSTOMER MANAGEMENT
// ============================================

export interface NhomKhachHang {
  ma_nhom_khachhang: string;
  ten_nhom_khachhang: string;
  ghichu: string | null;
}

export interface KhachHang {
  ma_nhacungcap: string;
  ten_nhacungcap: string;
  diachi_nhacungcap: string | null;
  maso_thue: string | null;
  dienthoai: string | null;
  fax: string | null;
  email: string | null;
  so_taikhoan: string | null;
  ma_quocgia: string | null;
  ma_mien: string | null;
  ma_tinh: string | null;
  ma_quan: string | null;
  ma_nganhang: string | null;
  ma_nhom: string | null;
  dsphutrach: string | null;
  giaychungnhan: string | null;
  giayphep: string | null;
  dientich: number;
}

// ============================================
// SUPPLIER MANAGEMENT
// ============================================

export interface NhomNhaCungCap {
  ma_nhom_nhacungcap: string;
  ten_nhom_nhacungcap: string;
  ghichu: string | null;
}

export interface NhaCungCap {
  ma_nhacungcap: string;
  ten_nhacungcap: string;
  diachi_nhacungcap: string | null;
  maso_thue: string | null;
  dienthoai: string | null;
  fax: string | null;
  email: string | null;
  so_taikhoan: string | null;
  ma_quocgia: string | null;
  ma_mien: string | null;
  ma_tinh: string | null;
  ma_quan: string | null;
  ma_nganhang: string | null;
  mucno: number;
  chietkhau: number;
  vanchuyen: number;
  hanno: number;
  ma_nhom: string | null;
}

// ============================================
// INVENTORY IMPORT
// ============================================

export interface NhapHangHoa {
  ma_chungtu: string;
  ngay_chungtu: string;
  so_hoadon: string | null;
  ngay_hoadon: string | null;
  ma_kho: string | null;
  pt_thanhtoan: number;
  ma_nhacungcap: string | null;
  diengiai: string | null;
  ma_taikhoan_no: string | null;
  ma_taikhoan_co: string | null;
  tygia: number;
  tongtien: number;
  ma_truycap: string | null;
  tkvat: string | null;
  kyhieu: string | null;
  chietkhau: number;
  thanhtien: number;
  tienvat: number;
  loainhap: number;
  nam: string | null;
  ma_nvbanhang: string | null;
}

export interface NhapChiTietHangHoa {
  ma_chungtu: string;
  ma_hanghoa: number;
  solo: string | null;
  handung: string | null;
  soluong: number;
  dongia_nhap: number;
  dongia_von: number;
  ma_ke: string | null;
  sophieu_kiemnghiem: string | null;
  ngay_sanxuat: string | null;
  chietkhau: number;
  thanhtien: number;
}

// ============================================
// INVENTORY EXPORT
// ============================================

export interface XuatHangHoa {
  ma_chungtu: string;
  ngay_chungtu: string;
  so_hoadon: string | null;
  ngay_hoadon: string | null;
  ma_kho: string | null;
  pt_thanhtoan: number;
  ma_phu: string | null;
  ma_khachhang: string | null;
  diengiai: string | null;
  ma_taikhoan_no: string | null;
  ma_taikhoan_co: string | null;
  tongtien: number;
  ma_truycap: string | null;
  tkvat: string | null;
  loaixuat: number;
  chietkhau: number;
  thuevat: number;
  thanhtien: number;
  tienvat: number;
  sohoadon_khuyenmai: string | null;
  ma_nvgiaohang: string | null;
  thang: string | null;
  nam: string | null;
  kyhieuct: string | null;
  mucno_tt: number;
  ghichu: string | null;
}

export interface XuatChiTietHangHoa {
  ma_chungtu: string;
  ma_hanghoa: number;
  soluongle: number;
  dongia: number;
  solo: string | null;
  chietkhau: number;
  tinhtrangxuat: number;
  handung: string | null;
  giavon: number;
  thanhtien: number;
  ID: number;
  loaixuat: number;
  k: number;
}

// ============================================
// DATABASE SCHEMA TYPE
// ============================================

export interface Database {
  public: {
    Tables: {
      // Product tables
      tbl_nhom_hanghoa: {
        Row: NhomHangHoa;
        Insert: Omit<NhomHangHoa, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<NhomHangHoa, 'created_at' | 'updated_at'>>;
      };
      tbl_hanghoa: {
        Row: HangHoa;
        Insert: Omit<HangHoa, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<HangHoa, 'created_at' | 'updated_at'>>;
      };
      
      // Customer tables
      tbl_nhom_khachhang: {
        Row: NhomKhachHang;
        Insert: Omit<NhomKhachHang, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<NhomKhachHang, 'created_at' | 'updated_at'>>;
      };
      tbl_khachhang: {
        Row: KhachHang;
        Insert: Omit<KhachHang, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<KhachHang, 'created_at' | 'updated_at'>>;
      };
      
      // Supplier tables
      tbl_nhom_nhacungcap: {
        Row: NhomNhaCungCap;
        Insert: Omit<NhomNhaCungCap, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<NhomNhaCungCap, 'created_at' | 'updated_at'>>;
      };
      tbl_nhacungcap: {
        Row: NhaCungCap;
        Insert: Omit<NhaCungCap, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<NhaCungCap, 'created_at' | 'updated_at'>>;
      };
      
      // Import tables
      tbl_nhap_hanghoa: {
        Row: NhapHangHoa;
        Insert: Omit<NhapHangHoa, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<NhapHangHoa, 'created_at' | 'updated_at'>>;
      };
      tbl_nhap_chitiet_hanghoa: {
        Row: NhapChiTietHangHoa;
        Insert: Omit<NhapChiTietHangHoa, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<NhapChiTietHangHoa, 'created_at' | 'updated_at'>>;
      };
      
      // Export tables
      tbl_xuat_hanghoa: {
        Row: XuatHangHoa;
        Insert: Omit<XuatHangHoa, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<XuatHangHoa, 'created_at' | 'updated_at'>>;
      };
      tbl_xuat_chitiet_hanghoa: {
        Row: XuatChiTietHangHoa;
        Insert: Omit<XuatChiTietHangHoa, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<XuatChiTietHangHoa, 'created_at' | 'updated_at'>>;
      };
    };
  };
}

// ============================================
// HELPER TYPES
// ============================================

// For paginated responses
export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// For API responses
export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  status: number;
}

// For search/filter operations
export interface SearchParams {
  query?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
