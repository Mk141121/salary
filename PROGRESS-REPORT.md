# PROGRESS REPORT - HRM-LITE Phase 2

> Cập nhật lần cuối: Tháng 1/2025

## Tổng quan

Đây là báo cáo tiến độ triển khai Phase 2 theo ROADMAP-HRM-LITE-Sprints-2weeks.md

---

## ✅ SPRINT 0 - Nền tảng phát triển & chuẩn hoá sản phẩm (HOÀN THÀNH)

### Đã hoàn thành:
- ✅ UI navigation suite (Sidebar, Breadcrumbs, Command Palette Ctrl+K)
- ✅ Theme light/dark + design system
- ✅ Chuẩn hoá RBAC: naming + mapping quyền
- ✅ Seed data full flow
- ✅ API smoke test

---

## ✅ SPRINT 1 - Scheduling v1: Danh mục ca làm việc (HOÀN THÀNH)

### Đã hoàn thành:
- ✅ CRUD `CaLamViec` - Model + API + UI
- ✅ Validate ca đêm, grace time
- ✅ UI danh mục ca tại `/ca-lam-viec`
- ✅ Modal create/edit với validation

---

## ✅ SPRINT 2 - Scheduling v1: Lịch phân ca + Calendar view (HOÀN THÀNH)

### Đã hoàn thành:
- ✅ Models: `LichPhanCa`, `LichPhanCaChiTiet`
- ✅ API assign batch + copy week
- ✅ Calendar month/week view tại `/phan-ca`
- ✅ Publish/Unpublish lịch phân ca
- ✅ Mapping sang `ChiTietChamCong`

---

## ✅ SPRINT 3 - Leave v1: Nghỉ phép chuẩn + số dư phép (HOÀN THÀNH)

### Đã hoàn thành:
- ✅ Danh mục loại nghỉ (`LoaiNghiPhep`)
- ✅ Tạo đơn nghỉ phép (`DonNghiPhep`)
- ✅ Duyệt 1 cấp (manager)
- ✅ Mapping nghỉ → chấm công
- ✅ UI tại `/nghi-phep`, `/danh-muc-nghi-phep`

---

## ✅ SPRINT 4 - Request v1: Trễ/Sớm/OT/Công tác + workflow 2 cấp (HOÀN THÀNH)

### Đã hoàn thành:
- ✅ Model `DonYeuCau` với các loại: DANG_KY_OT, DANG_KY_TRE, DANG_KY_VE_SOM, DANG_KY_CONG_TAC
- ✅ Workflow duyệt 2 cấp (CHO_DUYET_1 → CHO_DUYET_2 → DA_DUYET)
- ✅ Backend: yeu-cau.module với CRUD + approve/reject APIs
- ✅ Frontend: `/yeu-cau` với form tạo đơn, danh sách + filter, actions duyệt

**Files đã tạo:**
- `backend/src/modules/yeu-cau/` (module, controller, service, dto)
- `frontend/src/pages/YeuCauPage.tsx`
- `frontend/src/services/yeuCauApi.ts`

---

## ✅ SPRINT 5 - Employee Self-service v1: Portal nhân viên (HOÀN THÀNH)

### Đã hoàn thành:

#### Backend:
- ✅ Module `employee-portal` với các endpoints:
  - `GET /employee-portal/dashboard` - Dashboard tổng quan
  - `GET /employee-portal/lich-lam-viec` - Lịch làm việc tuần/tháng
  - `GET /employee-portal/cham-cong` - Chấm công tháng
  - `GET /employee-portal/phieu-luong` - Danh sách phiếu lương
  - `GET /employee-portal/so-du-phep` - Số dư phép
  - `GET /employee-portal/ho-so` - Hồ sơ nhân viên
  - `POST /employee-portal/check-in` - Check-in
  - `POST /employee-portal/check-out` - Check-out
- ✅ `GET /yeu-cau/my-requests` - Đơn yêu cầu của nhân viên

#### Frontend:
- ✅ **MobileLayout.tsx** - Bottom navigation 5 tabs, sticky header, side menu
- ✅ **PortalHome.tsx** - Dashboard: welcome card, ca hôm nay, check-in/out button, quick stats
- ✅ **PortalSchedule.tsx** - Week view lịch làm việc với navigation
- ✅ **PortalAttendance.tsx** - Monthly view chấm công với thống kê (đủ công, đi trễ, về sớm)
- ✅ **PortalRequests.tsx** - Tạo đơn yêu cầu, filter, danh sách đơn
- ✅ **PortalProfile.tsx** - 3 sub-tabs: Hồ sơ, Phiếu lương, Số dư phép

#### PWA & UX:
- ✅ `manifest.json` - PWA manifest với icons
- ✅ Routes: `/portal`, `/portal/lich-lam`, `/portal/cham-cong`, `/portal/yeu-cau`, `/portal/ca-nhan`
- ✅ CSS animations: slideUp, slideDown, fadeIn, scaleIn, bounceIn, softPulse
- ✅ Check-in/out với mutation, loading state, error handling
- ✅ Link "Cổng nhân viên" trong sidebar menu (badge "Mới")

**Files đã tạo:**
- `backend/src/modules/employee-portal/` (module, controller, service, dto)
- `frontend/src/pages/portal/` (MobileLayout, PortalHome, PortalSchedule, PortalAttendance, PortalRequests, PortalProfile)
- `frontend/src/services/employeePortalApi.ts`
- `frontend/public/manifest.json`

---

## ✅ SPRINT 6 - Manager approval mobile + Notification lite (HOÀN THÀNH)

### Đã hoàn thành:

#### Backend:
- ✅ Model `ThongBao` với các loại: YEU_CAU_MOI, YEU_CAU_DA_DUYET, YEU_CAU_TU_CHOI, NGHI_PHEP_MOI, NGHI_PHEP_DA_DUYET, NGHI_PHEP_TU_CHOI, PHIEU_LUONG, HE_THONG
- ✅ Module `thong-bao` với đầy đủ APIs:
  - `GET /thong-bao` - Danh sách thông báo (phân trang, filter)
  - `GET /thong-bao/chua-doc` - Đếm số chưa đọc
  - `PUT /thong-bao/:id/da-doc` - Đánh dấu đã đọc
  - `POST /thong-bao/da-doc-tat-ca` - Đánh dấu tất cả đã đọc
- ✅ Event hooks tự động gửi thông báo khi:
  - Yêu cầu được duyệt/từ chối
  - Nghỉ phép được duyệt/từ chối
  - Phiếu lương sẵn sàng

#### Frontend:
- ✅ Notification bell component với badge đếm chưa đọc
- ✅ Dropdown/Panel danh sách thông báo
- ✅ Click thông báo → navigate đến link liên quan
- ✅ Manager inbox mobile-friendly với one-tap approve

**Files đã tạo:**
- `backend/src/modules/thong-bao/` (module, controller, service, dto)
- Prisma schema: model `ThongBao`, enum `LoaiThongBao`

---

## ✅ SPRINT 7 - Anti-fraud Lite v1: GPS + Geofence (HOÀN THÀNH)

### Đã hoàn thành:

#### Backend:
- ✅ Models Prisma:
  - `CauHinhGeofence`: Cấu hình vùng địa lý (tên, địa chỉ, tọa độ, bán kính, phòng ban áp dụng)
  - `BangGhiChamCongGPS`: Lưu trữ log GPS mỗi lần check-in/out
- ✅ Module `anti-fraud` với đầy đủ APIs:
  - `GET /anti-fraud/geofence` - Danh sách geofence
  - `GET /anti-fraud/geofence/:id` - Chi tiết geofence
  - `POST /anti-fraud/geofence` - Tạo geofence mới
  - `PUT /anti-fraud/geofence/:id` - Cập nhật geofence
  - `DELETE /anti-fraud/geofence/:id` - Xóa geofence
  - `GET /anti-fraud/my-geofence` - Geofence áp dụng cho nhân viên
  - `POST /anti-fraud/gps-checkin` - GPS Check-in/out với geofence validation
  - `GET /anti-fraud/gps-logs` - Lịch sử GPS logs (HR/Admin)
  - `GET /anti-fraud/my-gps-logs` - Lịch sử GPS của nhân viên
  - `GET /anti-fraud/thong-ke` - Thống kê GPS
- ✅ Haversine formula để tính khoảng cách giữa 2 điểm GPS
- ✅ Logic validation: trong vùng/ngoài vùng, chặn hoặc chỉ cảnh báo

#### Frontend:
- ✅ **CauHinhGeofence.tsx** - Trang quản lý geofence (CRUD)
  - Table hiển thị danh sách địa điểm
  - Modal tạo/sửa với form đầy đủ
  - Button "Lấy vị trí hiện tại" dùng navigator.geolocation
  - Toggle trạng thái hoạt động
- ✅ **GPSLogs.tsx** - Trang xem lịch sử GPS logs
  - Filter theo ngày, phòng ban, nhân viên, trạng thái
  - Thống kê: tổng bản ghi, hợp lệ, ngoài vùng, cảnh báo, không GPS
  - Link mở Google Maps cho từng tọa độ
  - Phân trang
- ✅ **PortalHome.tsx** - Cập nhật check-in với GPS
  - Tự động lấy GPS khi check-in nếu có geofence yêu cầu
  - Hiển thị trạng thái GPS: đang lấy, thành công, lỗi
  - Hiển thị kết quả: trong vùng/ngoài vùng + khoảng cách
- ✅ **antiFraudApi.ts** - Service với helpers:
  - `getCurrentPosition()` - Lấy vị trí GPS với error handling
  - `tinhKhoangCach()` - Haversine formula
  - `getDeviceId()` - Generate/persist device ID

#### Routes mới:
- `/anti-fraud/geofence` - Cấu hình geofence
- `/anti-fraud/gps-logs` - Lịch sử GPS logs

**Files đã tạo:**
- `backend/src/modules/anti-fraud/` (module, controller, service, dto, index)
- `backend/prisma/schema.prisma` (thêm CauHinhGeofence, BangGhiChamCongGPS)
- `frontend/src/pages/CauHinhGeofence.tsx`
- `frontend/src/pages/GPSLogs.tsx`
- `frontend/src/services/antiFraudApi.ts`

---

## ✅ SPRINT 8 - Device Binding + Offline Sync (HOÀN THÀNH)

### Đã hoàn thành:

#### Backend:
- ✅ Model `DanhSachThietBi` - Lưu thông tin thiết bị đã bind
- ✅ API binding/unbind device
- ✅ Validation 1 device per employee
- ✅ Force unbind cho HR

#### Frontend:
- ✅ **QuanLyThietBi.tsx** - Quản lý thiết bị
- ✅ Route `/anti-fraud/devices`

---

## ✅ SPRINT 9 - Timesheet Management (HOÀN THÀNH)

### Đã hoàn thành:

#### Backend:
- ✅ Model `YeuCauSuaCong`, `LichSuSuaCong` 
- ✅ Module `timesheet` với CRUD + approve/reject
- ✅ Auto-compute tổng ngày công

#### Frontend:
- ✅ **BangCongThang.tsx** - Bảng công tháng với view, filters
- ✅ Route `/timesheet`

---

## ✅ SPRINT 10 - Payroll Sync Pipeline + Rule Trace (HOÀN THÀNH)

### Đã hoàn thành:

#### Backend:
- ✅ Module `payroll-sync` với:
  - `POST /payroll-sync/sync` - Sync payroll data
  - `GET /payroll-sync/progress/:bangLuongId` - Get sync progress
  - `GET /payroll-sync/status` - Pipeline status by month/year
  - `GET /payroll-sync/rule-trace` - Enhanced rule trace với nguồn dữ liệu
  - `GET /payroll-sync/rule-trace/nhan-vien/:id` - Rule trace theo nhân viên
- ✅ DTOs: SyncPayrollDto, SyncProgress, EnhancedRuleTrace, PipelineStatus
- ✅ Enums: SyncStep, NguonDuLieu (CHAM_CONG, YEU_CAU, NGHI_PHEP, PHAN_CA, GPS, KPI, MANUAL, RULE_ENGINE)
- ✅ Pipeline steps: syncNgayCong, syncNghiPhep, syncOT, syncYeuCau, syncKPI
- ✅ Warnings: thiếu chấm công, yêu cầu chưa duyệt

#### Frontend:
- ✅ **PayrollSync.tsx** - Pipeline dashboard với:
  - Filter tháng/năm/phòng ban
  - Pipeline status summary (tổng NV, đã sync, cảnh báo)
  - Bảng phòng ban với trạng thái + nút Sync
  - Rule Trace với nguồn dữ liệu expandable
- ✅ **payrollSyncApi.ts** - API service
- ✅ Route `/payroll-sync`

**Files đã tạo:**
- `backend/src/modules/payroll-sync/` (module, controller, service, dto)
- `frontend/src/pages/PayrollSync.tsx`
- `frontend/src/services/payrollSyncApi.ts`

---

## 📋 SPRINT 11-12 - Các Sprint tiếp theo

Xem chi tiết trong file `Phase 2/ROADMAP-HRM-LITE-Sprints-2weeks.md`

---

## Tiến độ tổng thể

| Sprint | Mô tả | Trạng thái |
|--------|-------|------------|
| Sprint 0 | Nền tảng phát triển | ✅ Hoàn thành |
| Sprint 1 | Danh mục ca làm việc | ✅ Hoàn thành |
| Sprint 2 | Lịch phân ca + Calendar | ✅ Hoàn thành |
| Sprint 3 | Nghỉ phép + số dư phép | ✅ Hoàn thành |
| Sprint 4 | Request OT/Trễ/Sớm/Công tác | ✅ Hoàn thành |
| Sprint 5 | Employee Portal PWA | ✅ Hoàn thành |
| Sprint 6 | Manager approval + Notification | ✅ Hoàn thành |
| Sprint 7 | Anti-fraud GPS + Geofence | ✅ Hoàn thành |
| Sprint 8 | Device binding + Offline sync | ✅ Hoàn thành |
| Sprint 9 | Timesheet Management | ✅ Hoàn thành |
| Sprint 10 | Payroll Sync Pipeline + Rule Trace | ✅ Hoàn thành |
| Sprint 11 | Report suite | 📋 Chưa triển khai |
| Sprint 12 | Polish + Production | 📋 Chưa triển khai |

**Tiến độ: 11/12 Sprints = 92% Phase 2**
