import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import TrangChu from './pages/TrangChu'
import DanhSachBangLuong from './pages/DanhSachBangLuong'
import ChiTietBangLuong from './pages/ChiTietBangLuong'
import QuanLyNhanVien from './pages/QuanLyNhanVien'
import ChiTietNhanVien from './pages/ChiTietNhanVien'
import QuanLyKhoanLuong from './pages/QuanLyKhoanLuong'
import ImportExcel from './pages/ImportExcel'
import QuanLyChamCong from './pages/QuanLyChamCong'
import QuanLyPhongBan from './pages/QuanLyPhongBan'
import CaiDatHeThong from './pages/CaiDatHeThong'
// Phase 3: KPI & RBAC pages
import DangNhap from './pages/DangNhap'
import QuanLyKPI from './pages/QuanLyKPI'
import KyDanhGiaKPI from './pages/KyDanhGiaKPI'
import CauHinhThuongKPI from './pages/CauHinhThuongKPI'
import QuanLyNguoiDung from './pages/QuanLyNguoiDung'
import AuditLog from './pages/AuditLog'
// Rule Engine pages
import QuanLyQuyChe from './pages/QuanLyQuyChe'
import ChiTietQuyChe from './pages/ChiTietQuyChe'
import QuanLySuKien from './pages/QuanLySuKien'
import XemRuleTrace from './pages/XemRuleTrace'
import { RequireAuth } from './contexts/AuthContext'

function App() {
  return (
    <Routes>
      {/* Login route - no layout */}
      <Route path="/dang-nhap" element={<DangNhap />} />
      
      {/* Main app with layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<TrangChu />} />
        <Route path="bang-luong" element={<DanhSachBangLuong />} />
        <Route path="bang-luong/:id" element={<ChiTietBangLuong />} />
        <Route path="nhan-vien" element={<QuanLyNhanVien />} />
        <Route path="nhan-vien/:id" element={<ChiTietNhanVien />} />
        <Route path="phong-ban" element={<QuanLyPhongBan />} />
        <Route path="khoan-luong" element={<QuanLyKhoanLuong />} />
        <Route path="cham-cong" element={<QuanLyChamCong />} />
        <Route path="import-excel" element={<ImportExcel />} />
        <Route path="cai-dat" element={<CaiDatHeThong />} />
        
        {/* Rule Engine routes */}
        <Route path="quy-che" element={<RequireAuth><QuanLyQuyChe /></RequireAuth>} />
        <Route path="quy-che/:id" element={<RequireAuth><ChiTietQuyChe /></RequireAuth>} />
        <Route path="su-kien" element={<RequireAuth><QuanLySuKien /></RequireAuth>} />
        <Route path="rule-trace" element={<RequireAuth><XemRuleTrace /></RequireAuth>} />
        
        {/* KPI routes */}
        <Route path="kpi/template" element={<RequireAuth><QuanLyKPI /></RequireAuth>} />
        <Route path="kpi/ky-danh-gia" element={<RequireAuth><KyDanhGiaKPI /></RequireAuth>} />
        <Route path="kpi/cau-hinh-thuong" element={<RequireAuth><CauHinhThuongKPI /></RequireAuth>} />
        
        {/* Admin routes */}
        <Route path="quan-tri/nguoi-dung" element={<RequireAuth><QuanLyNguoiDung /></RequireAuth>} />
        <Route path="quan-tri/audit-log" element={<RequireAuth><AuditLog /></RequireAuth>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
