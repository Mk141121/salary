import { Routes, Route, Navigate } from 'react-router-dom'
import NewLayout from './components/layout/NewLayout'
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
import QuanLyNhomNhanVien from './pages/QuanLyNhomNhanVien'
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
// San Luong pages
import ImportChiaHang from './pages/ImportChiaHang'
import ImportGiaoHang from './pages/ImportGiaoHang'
import LichSuImport from './pages/LichSuImport'
import TraCuuSanLuong from './pages/TraCuuSanLuong'
import DonGiaSanLuong from './pages/DonGiaSanLuong'
// Ứng lương & Sổ lương pages
import DanhSachBangUngLuong from './pages/DanhSachBangUngLuong'
import ChiTietBangUngLuong from './pages/ChiTietBangUngLuong'
import SoLuongNhanVien from './pages/SoLuongNhanVien'
import SoLuongPhongBan from './pages/SoLuongPhongBan'
// Cấu hình cột pages
import CauHinhCotBangLuong from './pages/CauHinhCotBangLuong'
import CauHinhCotUngLuong from './pages/CauHinhCotUngLuong'
// Nghỉ phép pages
import DanhMucLoaiNghi from './pages/DanhMucLoaiNghi'
import DonNghiCuaToi from './pages/DonNghiCuaToi'
import DuyetNghiPhep from './pages/DuyetNghiPhep'
import LichNghiPhep from './pages/LichNghiPhep'
// Phase 2: Xếp Ca (Scheduling) pages
import DanhMucCaLamViec from './pages/DanhMucCaLamViec'
import LichPhanCa from './pages/LichPhanCa'
// Phase 2: Yêu cầu (Request) pages
import DonYeuCauCuaToi from './pages/DonYeuCauCuaToi'
import DuyetYeuCau from './pages/DuyetYeuCau'
// Sprint 5: Employee Portal pages
import MobileLayout from './components/layout/MobileLayout'
import PortalHome from './pages/portal/PortalHome'
import PortalSchedule from './pages/portal/PortalSchedule'
import PortalAttendance from './pages/portal/PortalAttendance'
import PortalRequests from './pages/portal/PortalRequests'
import PortalProfile from './pages/portal/PortalProfile'
// Sprint 6: Thông báo
import ThongBaoPage from './pages/ThongBaoPage'
// Sprint 7: Anti-fraud GPS + Geofence
import CauHinhGeofence from './pages/CauHinhGeofence'
import GPSLogs from './pages/GPSLogs'
// Sprint 8: Device Binding
import QuanLyThietBi from './pages/QuanLyThietBi'
// Sprint 9: Timesheet Management
import BangCongThang from './pages/BangCongThang'
// Sprint 10: Payroll Sync Pipeline
import PayrollSync from './pages/PayrollSync'
// Sprint 12: Reports
import { ReportsPage } from './pages/reports'
import { RequireAuth } from './contexts/AuthContext'

function App() {
  return (
    <Routes>
      {/* Login route - no layout */}
      <Route path="/dang-nhap" element={<DangNhap />} />
      
      {/* Main app with layout */}
      <Route path="/" element={<NewLayout />}>
        <Route index element={<TrangChu />} />
        <Route path="bang-luong" element={<DanhSachBangLuong />} />
        <Route path="bang-luong/:id" element={<ChiTietBangLuong />} />
        <Route path="nhan-vien" element={<QuanLyNhanVien />} />
        <Route path="nhan-vien/:id" element={<ChiTietNhanVien />} />
        <Route path="nhom-nhan-vien" element={<QuanLyNhomNhanVien />} />
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
        
        {/* San Luong routes */}
        <Route path="san-luong" element={<RequireAuth><TraCuuSanLuong /></RequireAuth>} />
        <Route path="san-luong/don-gia" element={<RequireAuth><DonGiaSanLuong /></RequireAuth>} />
        <Route path="import-chia-hang" element={<RequireAuth><ImportChiaHang /></RequireAuth>} />
        <Route path="import-giao-hang" element={<RequireAuth><ImportGiaoHang /></RequireAuth>} />
        <Route path="lich-su-import" element={<RequireAuth><LichSuImport /></RequireAuth>} />
        
        {/* Ứng lương routes */}
        <Route path="ung-luong" element={<RequireAuth><DanhSachBangUngLuong /></RequireAuth>} />
        <Route path="ung-luong/:id" element={<RequireAuth><ChiTietBangUngLuong /></RequireAuth>} />
        
        {/* Cấu hình cột routes */}
        <Route path="cau-hinh/bang-luong" element={<RequireAuth><CauHinhCotBangLuong /></RequireAuth>} />
        <Route path="cau-hinh/ung-luong" element={<RequireAuth><CauHinhCotUngLuong /></RequireAuth>} />
        
        {/* Sổ lương routes */}
        <Route path="so-luong/nhan-vien" element={<RequireAuth><SoLuongNhanVien /></RequireAuth>} />
        <Route path="so-luong/phong-ban" element={<RequireAuth><SoLuongPhongBan /></RequireAuth>} />
        
        {/* Nghỉ phép routes */}
        <Route path="nghi-phep/loai-nghi" element={<RequireAuth><DanhMucLoaiNghi /></RequireAuth>} />
        <Route path="nghi-phep/don-cua-toi" element={<RequireAuth><DonNghiCuaToi /></RequireAuth>} />
        <Route path="nghi-phep/duyet" element={<RequireAuth><DuyetNghiPhep /></RequireAuth>} />
        <Route path="nghi-phep/lich" element={<RequireAuth><LichNghiPhep /></RequireAuth>} />
        
        {/* Phase 2: Xếp Ca (Scheduling) routes */}
        <Route path="xep-ca/danh-muc-ca" element={<RequireAuth><DanhMucCaLamViec /></RequireAuth>} />
        <Route path="xep-ca/lich-phan-ca" element={<RequireAuth><LichPhanCa /></RequireAuth>} />
        
        {/* Phase 2: Yêu cầu (Request) routes */}
        <Route path="yeu-cau/don-cua-toi" element={<RequireAuth><DonYeuCauCuaToi /></RequireAuth>} />
        <Route path="yeu-cau/duyet" element={<RequireAuth><DuyetYeuCau /></RequireAuth>} />
        
        {/* Admin routes */}
        <Route path="quan-tri/nguoi-dung" element={<RequireAuth><QuanLyNguoiDung /></RequireAuth>} />
        <Route path="quan-tri/audit-log" element={<RequireAuth><AuditLog /></RequireAuth>} />
        
        {/* Sprint 7: Anti-fraud GPS + Geofence routes */}
        <Route path="anti-fraud/geofence" element={<RequireAuth><CauHinhGeofence /></RequireAuth>} />
        <Route path="anti-fraud/gps-logs" element={<RequireAuth><GPSLogs /></RequireAuth>} />
        {/* Sprint 8: Device Binding routes */}
        <Route path="anti-fraud/devices" element={<RequireAuth><QuanLyThietBi /></RequireAuth>} />
        
        {/* Sprint 9: Timesheet Management routes */}
        <Route path="timesheet" element={<RequireAuth><BangCongThang /></RequireAuth>} />
        
        {/* Sprint 10: Payroll Sync Pipeline routes */}
        <Route path="payroll-sync" element={<RequireAuth><PayrollSync /></RequireAuth>} />
        
        {/* Sprint 12: Reports routes */}
        <Route path="reports" element={<RequireAuth><ReportsPage /></RequireAuth>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      
      {/* Sprint 5: Employee Portal (Mobile-first) */}
      <Route path="/portal" element={<RequireAuth><MobileLayout /></RequireAuth>}>
        <Route index element={<PortalHome />} />
        <Route path="lich-lam" element={<PortalSchedule />} />
        <Route path="cham-cong" element={<PortalAttendance />} />
        <Route path="yeu-cau" element={<PortalRequests />} />
        <Route path="ca-nhan" element={<PortalProfile />} />
        <Route path="thong-bao" element={<ThongBaoPage />} />
      </Route>
      
      {/* Sprint 6: Thông báo (Standalone for Admin) */}
      <Route path="/thong-bao" element={<RequireAuth><ThongBaoPage /></RequireAuth>} />
    </Routes>
  )
}

export default App
