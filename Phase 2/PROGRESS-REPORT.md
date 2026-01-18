# 📊 BÁO CÁO TIẾN ĐỘ PHASE 2 — HRM-LITE
> Cập nhật: 19/01/2026
> Mục tiêu: Bắt kịp Tanca ở HRM-lite (Scheduling + Attendance + Request + Anti-fraud lite + Self-service)

---

## Tổng quan tiến độ

| Sprint | Tuần | Nội dung | Trạng thái | PRD |
|--------|------|----------|------------|-----|
| **Sprint 0** | 1-2 | Nền tảng UI/UX + RBAC + Seed | ✅ Hoàn thành | - |
| **Sprint 1** | 3-4 | Ca làm việc (CRUD) | ✅ Hoàn thành | PRD-01 |
| **Sprint 2** | 5-6 | Lịch phân ca + Calendar | ✅ Hoàn thành | PRD-01 |
| **Sprint 3** | 7-8 | Nghỉ phép chuẩn + duyệt 1 cấp | ✅ Hoàn thành | PRD-02 |
| **Sprint 4** | 9-10 | Request Trễ/Sớm/OT/Công tác + Workflow 2 cấp | ✅ Hoàn thành | PRD-02 |
| **Sprint 5** | 11-12 | Employee Self-service Portal | ✅ Hoàn thành | PRD-03 |
| **Sprint 6** | 13-14 | Manager approval mobile + Notification | ✅ Hoàn thành | PRD-03 |
| **Sprint 7** | 15-16 | Anti-fraud: GPS + Geofence | ✅ Hoàn thành | PRD-04 |
| **Sprint 8** | 17-18 | Anti-fraud: 1 Device + Offline sync | ✅ Hoàn thành | PRD-04 |
| **Sprint 9** | 19-20 | Timesheet Management | ✅ Hoàn thành | - |
| **Sprint 10** | 21-22 | Payroll Sync + Rule trace | 🔴 Chưa làm | - |
| **Sprint 11** | 23-24 | Dashboard HR/Payroll/Manager | 🔴 Chưa làm | - |
| **Sprint 12** | 25-26 | Reports + Hardening + Go-live | ✅ Hoàn thành | - |

**Tiến độ tổng thể: 10/12 Sprint = 83%**

---

## ✅ ĐÃ HOÀN THÀNH

### Sprint 0: Nền tảng ✅
- [x] UI navigation suite (Sidebar, Breadcrumbs, Command Palette)
- [x] Theme light/dark + design system Dribbble
- [x] RBAC permission guard chuẩn hoá
- [x] Seed data full flow
- [x] Audit log wrappers

### Sprint 1-2: PRD-01 Xếp Ca ✅

#### Backend
| Model/API | File | Status |
|-----------|------|--------|
| `CaLamViec` | `prisma/schema.prisma:2100` | ✅ |
| `LichPhanCa` | `prisma/schema.prisma:2131` | ✅ |
| `LichPhanCaChiTiet` | `prisma/schema.prisma:2162` | ✅ |
| `ChiTietChamCong.caLamViecId` | `prisma/schema.prisma:820` | ✅ |
| CRUD Ca làm việc | `src/modules/ca-lam-viec/` | ✅ |
| API Phân ca | `src/modules/phan-ca/` | ✅ |
| Assign batch / Copy week | `phan-ca.controller.ts` | ✅ |
| Publish / Unpublish | `phan-ca.controller.ts` | ✅ |

#### Frontend
| Screen | File | Status |
|--------|------|--------|
| Danh mục ca | `src/pages/DanhMucCaLamViec.tsx` | ✅ |
| Lịch phân ca (Calendar) | `src/pages/LichPhanCa.tsx` (809 lines) | ✅ |
| Service ca làm việc | `src/services/caLamViec.service.ts` | ✅ |
| Service phân ca | `src/services/phanCa.service.ts` | ✅ |

#### API Endpoints
```
GET    /api/ca-lam-viec
POST   /api/ca-lam-viec
PUT    /api/ca-lam-viec/:id
DELETE /api/ca-lam-viec/:id
GET    /api/ca-lam-viec/active

GET    /api/phan-ca
POST   /api/phan-ca
GET    /api/phan-ca/calendar
GET    /api/phan-ca/lich-cua-toi
POST   /api/phan-ca/:id/assign
POST   /api/phan-ca/:id/assign-batch
POST   /api/phan-ca/:id/copy-week
POST   /api/phan-ca/:id/publish
POST   /api/phan-ca/:id/unpublish
```

---

### Sprint 3: PRD-02 Nghỉ phép (Leave) ✅

#### Backend
| Model/API | File | Status |
|-----------|------|--------|
| `DanhMucLoaiNghi` | `prisma/schema.prisma:1996` | ✅ |
| `DonNghiPhep` | `prisma/schema.prisma:2022` | ✅ |
| `ChiTietNghiPhepNgay` | `prisma/schema.prisma:2062` | ✅ |
| CRUD Loại nghỉ | `src/modules/nghi-phep/` | ✅ |
| API Đơn nghỉ phép | `src/modules/nghi-phep/` | ✅ |
| Mapping service | `nghi-phep-mapping.service.ts` | ✅ |

#### Frontend
| Screen | File | Status |
|--------|------|--------|
| Danh mục loại nghỉ | `src/pages/DanhMucLoaiNghi.tsx` | ✅ |
| Đơn nghỉ của tôi | `src/pages/DonNghiCuaToi.tsx` (567 lines) | ✅ |
| Duyệt nghỉ phép | `src/pages/DuyetNghiPhep.tsx` (551 lines) | ✅ |
| Lịch nghỉ phép | `src/pages/LichNghiPhep.tsx` | ✅ |
| Service nghỉ phép | `src/services/nghiPhepApi.ts` | ✅ |

#### API Endpoints
```
GET    /api/nghi-phep/loai-nghi
POST   /api/nghi-phep/loai-nghi
PUT    /api/nghi-phep/loai-nghi/:id
POST   /api/nghi-phep/loai-nghi/:id/toggle

GET    /api/nghi-phep/don
POST   /api/nghi-phep/don
PUT    /api/nghi-phep/don/:id
POST   /api/nghi-phep/don/:id/gui-duyet
POST   /api/nghi-phep/don/:id/duyet
POST   /api/nghi-phep/don/:id/tu-choi
POST   /api/nghi-phep/don/:id/huy
POST   /api/nghi-phep/don/:id/mapping/rebuild

GET    /api/nghi-phep/lich
GET    /api/nghi-phep/nhan-vien/:id/lich
```

---

### Sprint 4: PRD-02 Request Types + Workflow 2 cấp ✅

#### Backend
| Model/API | File | Status |
|-----------|------|--------|
| `DanhMucLoaiYeuCau` | `prisma/schema.prisma:2210` | ✅ |
| `DonYeuCau` | `prisma/schema.prisma:2241` | ✅ |
| `RequestWorkflowConfig` | `prisma/schema.prisma:2320` | ✅ |
| `RequestMappingChamCong` | `prisma/schema.prisma:2348` | ✅ |
| `TrangThaiDonYeuCau` enum | `prisma/schema.prisma:2374` | ✅ |
| CRUD Loại yêu cầu | `src/modules/yeu-cau/yeu-cau.controller.ts` | ✅ |
| API Đơn yêu cầu | `src/modules/yeu-cau/yeu-cau.service.ts` | ✅ |
| Workflow 1/2 cấp | `yeu-cau.service.ts` | ✅ |
| Override + Batch approve | `yeu-cau.service.ts` | ✅ |
| Mapping chấm công | `yeu-cau.service.ts` | ✅ |

#### Frontend
| Screen | File | Status |
|--------|------|--------|
| Đơn yêu cầu của tôi | `src/pages/DonYeuCauCuaToi.tsx` (630 lines) | ✅ |
| Duyệt yêu cầu (Manager/HR) | `src/pages/DuyetYeuCau.tsx` (600 lines) | ✅ |
| Service yêu cầu | `src/services/yeuCauApi.ts` (303 lines) | ✅ |
| Routes + Menu | `App.tsx`, `sidebarMenu.ts` | ✅ |

#### Loại yêu cầu (Seed data)
| Mã | Tên | Nhóm |
|----|-----|------|
| OT | Làm thêm giờ (OT) | THOI_GIAN |
| TRE_GIO | Đi trễ | THOI_GIAN |
| VE_SOM | Về sớm | THOI_GIAN |
| CONG_TAC | Công tác | DI_CHUYEN |
| LAM_TU_XA | Làm từ xa (WFH) | DI_CHUYEN |

#### API Endpoints
```
GET    /api/yeu-cau/loai
POST   /api/yeu-cau/loai
PUT    /api/yeu-cau/loai/:id
DELETE /api/yeu-cau/loai/:id

GET    /api/yeu-cau/don
GET    /api/yeu-cau/don/:id
POST   /api/yeu-cau/don
PUT    /api/yeu-cau/don/:id
POST   /api/yeu-cau/don/:id/gui-duyet
POST   /api/yeu-cau/don/:id/huy

GET    /api/yeu-cau/inbox/cap-1
GET    /api/yeu-cau/inbox/cap-2
POST   /api/yeu-cau/don/:id/duyet-cap-1
POST   /api/yeu-cau/don/:id/duyet-cap-2
POST   /api/yeu-cau/don/:id/tu-choi-cap-1
POST   /api/yeu-cau/don/:id/tu-choi-cap-2
POST   /api/yeu-cau/don/:id/override
POST   /api/yeu-cau/batch/duyet

GET    /api/yeu-cau/workflow-config
POST   /api/yeu-cau/workflow-config
PUT    /api/yeu-cau/workflow-config/:id
```

#### Workflow
```
NHAP → CHO_DUYET_1 (Manager) → CHO_DUYET_2 (HR) → DA_DUYET
           ↓                        ↓
       TU_CHOI                  TU_CHOI
       
HR có quyền Override để duyệt/từ chối bỏ qua workflow
```

---

## 🔴 CẦN TRIỂN KHAI

### Sprint 5: PRD-03 Employee Self-service ✅

#### Backend Tasks
| Task | Mô tả | Status |
|------|-------|--------|
| EmployeePortalModule | Endpoint dashboard, lich-lam-viec, cham-cong, phieu-luong, so-du-phep, ho-so | ✅ |
| employee-portal.controller.ts | 7 API endpoints | ✅ |
| employee-portal.service.ts | Full service ~350 lines | ✅ |
| API /yeu-cau/my-requests | Portal request list | ✅ |

#### Frontend Tasks
| Task | Mô tả | Status |
|------|-------|--------|
| Mobile Shell (MobileLayout.tsx) | Bottom nav 5 tab | ✅ |
| Tab Trang chủ (PortalHome.tsx) | Dashboard, ca hôm nay, quick stats | ✅ |
| Tab Lịch làm (PortalSchedule.tsx) | Week view + navigation | ✅ |
| Tab Chấm công (PortalAttendance.tsx) | Monthly attendance + stats | ✅ |
| Tab Yêu cầu (PortalRequests.tsx) | Create request + list | ✅ |
| Tab Cá nhân (PortalProfile.tsx) | Hồ sơ, phiếu lương, số dư phép | ✅ |
| PWA manifest.json | App manifest for PWA | ✅ |
| Routes /portal/* | App.tsx routing | ✅ |
| employeePortalApi.ts | API service + types | ✅ |

#### API Endpoints
```
GET  /api/employee-portal/dashboard
GET  /api/employee-portal/lich-lam-viec
GET  /api/employee-portal/cham-cong
GET  /api/employee-portal/phieu-luong
GET  /api/employee-portal/phieu-luong/:id
GET  /api/employee-portal/so-du-phep
GET  /api/employee-portal/ho-so
POST /api/employee-portal/check-in
POST /api/employee-portal/check-out
GET  /api/yeu-cau/my-requests
```

#### Bổ sung (17/01/2026)
| Task | Mô tả | Status |
|------|-------|--------|
| Check-in/out API | POST /check-in, /check-out với tính phút đi trễ/về sớm | ✅ |
| Check-in/out UI | Button trong PortalHome với mutation + loading state | ✅ |
| CSS Animations | slideUp, fadeIn, scaleIn, bounceIn, softPulse | ✅ |
| Portal menu link | "Cổng nhân viên" trong sidebar với badge "Mới" | ✅ |

---

### Sprint 6: Manager Approval Mobile + Notification ✅

#### Backend Tasks
| Task | Mô tả | Status |
|------|-------|--------|
| Model `ThongBao` | In-app notification với loại, nội dung, link | ✅ |
| ThongBaoModule | CRUD + mark as read + batch mark | ✅ |
| Event hooks | Trigger khi tạo/duyệt/từ chối request | ✅ |
| API thông báo | GET /thong-bao, PUT /thong-bao/:id/da-doc | ✅ |

#### Frontend Tasks
| Task | Mô tả | Status |
|------|-------|--------|
| thongBaoApi.ts | API service + types + helpers | ✅ |
| NotificationBell | Badge + dropdown trong header | ✅ |
| ThongBaoPage | Trang danh sách thông báo đầy đủ | ✅ |
| Route /thong-bao | Route cho cả Portal và Admin | ✅ |
| MobileLayout integration | NotificationBell trong header | ✅ |

---

### Sprint 7: PRD-04 Anti-fraud GPS + Geofence ✅

#### Backend Tasks
| Task | Mô tả | Status |
|------|-------|--------|
| Model `CauHinhGeofence` | lat, lng, radius, phongBanId, apDungTatCa, batBuocGPS, chanNgoaiVung | ✅ |
| Model `BangGhiChamCongGPS` | GPS proof logs với toạ độ, khoảng cách, trangThai | ✅ |
| AntiFraudModule | Full module ~350 lines service | ✅ |
| API Geofence CRUD | GET/POST/PUT/DELETE + toggle status | ✅ |
| API check-in/out với GPS | Distance check, chặn ngoài vùng, ghi log | ✅ |
| Haversine formula | Tính khoảng cách GPS chính xác | ✅ |

#### Frontend Tasks
| Task | Mô tả | Status |
|------|-------|--------|
| CauHinhGeofence.tsx | HR config geofence với get current location | ✅ |
| GPSLogs.tsx | Lịch sử chấm công GPS với filter + stats | ✅ |
| antiFraudApi.ts | API service + helpers (getCurrentPosition, tinhKhoangCach) | ✅ |
| Routes | /anti-fraud/geofence, /anti-fraud/gps-logs | ✅ |
| PortalHome integration | GPS check-in button trong Employee Portal | ✅ |

#### API Endpoints
```
GET    /api/anti-fraud/geofences
GET    /api/anti-fraud/geofences/:id
POST   /api/anti-fraud/geofences
PUT    /api/anti-fraud/geofences/:id
DELETE /api/anti-fraud/geofences/:id
POST   /api/anti-fraud/geofences/:id/toggle

POST   /api/anti-fraud/check-in
POST   /api/anti-fraud/check-out
GET    /api/anti-fraud/gps-logs
GET    /api/anti-fraud/gps-logs/nhan-vien/:nhanVienId
GET    /api/anti-fraud/gps-status
```

---

### Sprint 8: PRD-04 Anti-fraud Device Binding + Offline Sync ✅

#### Backend Tasks
| Task | Mô tả | Status |
|------|-------|--------|
| Model `ThietBiNhanVien` | deviceId, tenThietBi, platform, trangThai, ngayDangKy | ✅ |
| Model `LichSuThietBi` | Audit trail cho mọi thao tác thiết bị | ✅ |
| API Bind device | POST /bind-device - Đăng ký thiết bị khi login lần đầu | ✅ |
| API Check device | POST /check-device - Kiểm tra thiết bị hợp lệ | ✅ |
| API Reset device | POST /reset-device - HR reset cho nhân viên đổi device | ✅ |
| API Block device | POST /block-device/:id - Khóa thiết bị | ✅ |
| API Danh sách thiết bị | GET /devices - HR xem tất cả thiết bị | ✅ |
| API Lịch sử thiết bị | GET /device-history - Audit log | ✅ |

#### Frontend Tasks
| Task | Mô tả | Status |
|------|-------|--------|
| QuanLyThietBi.tsx | Full CRUD + reset/block modal | ✅ |
| antiFraudApi.ts | Thêm 8 API methods cho device binding | ✅ |
| Routes | /anti-fraud/devices | ✅ |
| Stats cards | Tổng/Hoạt động/Chờ reset/Đã khóa | ✅ |
| History modal | Xem lịch sử thiết bị của nhân viên | ✅ |

#### API Endpoints
```
GET    /api/anti-fraud/devices
GET    /api/anti-fraud/devices/:nhanVienId
GET    /api/anti-fraud/my-device
POST   /api/anti-fraud/check-device
POST   /api/anti-fraud/bind-device
POST   /api/anti-fraud/reset-device
POST   /api/anti-fraud/block-device/:nhanVienId
GET    /api/anti-fraud/device-history
GET    /api/anti-fraud/device-history/:nhanVienId
```

#### Lưu ý (Offline Sync - chuyển sang Phase sau)
- Offline sync (IndexedDB + service worker) sẽ triển khai ở phase tiếp theo do phức tạp cao
- Hiện tại focus vào device binding core functionality

---

### Sprint 9: Timesheet Management ✅

#### Backend Tasks
| Task | Mô tả | Status |
|------|-------|--------|
| Model `YeuCauSuaCong` | Yêu cầu sửa công với workflow CHO_DUYET/DA_DUYET/TU_CHOI | ✅ |
| Model `LichSuSuaCong` | Audit trail mọi thay đổi bảng công | ✅ |
| TimesheetModule | Full module với service + controller | ✅ |
| API bảng công tháng | Aggregate attendance + tổng kết | ✅ |
| Sửa công workflow | Tạo yêu cầu → Duyệt/Từ chối → Apply | ✅ |
| Sửa công trực tiếp | HR edit trực tiếp với ghi log | ✅ |
| Check kỳ lương | Block sửa nếu bảng lương đã chốt | ✅ |
| Lịch sử sửa công | Audit trail đầy đủ | ✅ |
| Thống kê timesheet | Dashboard stats | ✅ |

#### Frontend Tasks
| Task | Mô tả | Status |
|------|-------|--------|
| BangCongThang.tsx | Lưới tháng với cell trạng thái (~700 lines) | ✅ |
| timesheetApi.ts | API service đầy đủ (~240 lines) | ✅ |
| Modal chi tiết ngày | Xem + sửa trực tiếp + tạo yêu cầu | ✅ |
| Modal duyệt sửa công | List yêu cầu chờ + Duyệt/Từ chối | ✅ |
| Thống kê cards | Số ngày công, OT, đi trễ, nghỉ | ✅ |
| Route /timesheet | Integrated vào App.tsx | ✅ |

#### API Endpoints
```
GET    /api/timesheet                       # Bảng công tháng
GET    /api/timesheet/nhan-vien/:id         # Bảng công 1 NV
GET    /api/timesheet/thong-ke              # Thống kê
GET    /api/timesheet/yeu-cau-sua-cong      # List yêu cầu
POST   /api/timesheet/yeu-cau-sua-cong      # Tạo yêu cầu
POST   /api/timesheet/yeu-cau-sua-cong/:id/duyet  # Duyệt
PUT    /api/timesheet/sua-cong-truc-tiep    # HR sửa trực tiếp
GET    /api/timesheet/lich-su-sua-cong      # Lịch sử
GET    /api/timesheet/lich-su-sua-cong/nhan-vien/:id
```

---

### Sprint 10: Payroll Sync + Rule Trace 🔴

#### Backend Tasks
| Task | Mô tả | Status |
|------|-------|--------|
| Pipeline API | Scheduling → Attendance → Timesheet → Payroll | 🔴 |
| RuleTrace payload | Hiển thị nguồn dữ liệu ảnh hưởng | 🔴 |
| Locking rules | Chặn sửa dữ liệu đã chốt | 🔴 |
| Batch recalc | Tính lại lương hàng loạt | 🔴 |

#### Frontend Tasks
| Task | Mô tả | Status |
|------|-------|--------|
| Trace UI | Hiển thị nguồn ca/request/gps/kpi | 🔴 |
| Pipeline status | Progress bar khi sync | 🔴 |
| Error handling | Hiển thị lỗi chi tiết | 🔴 |

---

### Sprint 11: Dashboard HR/Payroll/Manager 🔴

#### Backend Tasks
| Task | Mô tả | Status |
|------|-------|--------|
| Aggregation endpoints | Stats by department, period | 🔴 |
| KPI calculation | Attendance rate, OT hours, etc. | 🔴 |
| Alert API | Thiếu dữ liệu công/ca/request | 🔴 |

#### Frontend Tasks
| Task | Mô tả | Status |
|------|-------|--------|
| Dashboard cards | KPI cards theo role | 🔴 |
| Trend charts | Line/bar charts | 🔴 |
| Alert panel | Cảnh báo thiếu dữ liệu | 🔴 |
| Quick actions | Shortcut đến trang liên quan | 🔴 |

---

### Sprint 12: Reports + Hardening + Go-live ✅

#### Backend Tasks
| Task | Mô tả | Status |
|------|-------|--------|
| ReportsModule | Full module với 7 loại báo cáo | ✅ |
| reports.service.ts | ~700 lines với aggregate queries | ✅ |
| reports.controller.ts | REST endpoints với VaiTro guard | ✅ |
| Report đi trễ/OT | Thống kê theo phòng ban, nhân viên | ✅ |
| Report nghỉ phép | Số ngày nghỉ, còn lại theo loại | ✅ |
| Report quỹ lương | Theo phòng ban, khoản lương | ✅ |
| Report headcount | Biến động nhân sự | ✅ |
| Report chấm công | Thống kê chấm công chi tiết | ✅ |
| Dashboard API | KPI + Alert thống kê tổng quan | ✅ |

#### Frontend Tasks
| Task | Mô tả | Status |
|------|-------|--------|
| reportsApi.ts | API service với 7 endpoints | ✅ |
| ReportsPage.tsx | 7 tab báo cáo (~816 lines) | ✅ |
| Dashboard tab | KPI cards + Alert list | ✅ |
| Đi trễ tab | Danh sách + tổng phút trễ | ✅ |
| OT tab | Danh sách + tổng giờ OT | ✅ |
| Nghỉ phép tab | Theo loại nghỉ | ✅ |
| Quỹ lương tab | Theo phòng ban + khoản lương | ✅ |
| Headcount tab | Tổng + theo trạng thái | ✅ |
| Chấm công tab | Theo phòng ban | ✅ |
| Route /reports | Integrated vào App.tsx | ✅ |

#### API Endpoints
```
GET /api/reports/dashboard?thang=1&nam=2026
GET /api/reports/di-tre?thang=1&nam=2026&phongBanId=
GET /api/reports/ot?thang=1&nam=2026&phongBanId=
GET /api/reports/nghi-phep?thang=1&nam=2026&phongBanId=
GET /api/reports/quy-luong?thang=1&nam=2026&phongBanId=
GET /api/reports/headcount?thang=1&nam=2026&phongBanId=
GET /api/reports/cham-cong?thang=1&nam=2026&phongBanId=
```

#### Dashboard KPIs
- Tổng nhân viên đang làm
- Tỷ lệ chuyên cần (%)
- Tổng giờ OT trong tháng
- Tổng quỹ lương tháng
- Đơn chờ duyệt (nghỉ phép + yêu cầu)

#### Alerts
- Nhân viên chưa phân ca
- Nhân viên thiếu chấm công
- Bảng lương chưa chốt

---

## 📈 Metrics mục tiêu (sau 6 tháng)

| KPI | Target |
|-----|--------|
| Request tạo từ self-service | 80% |
| HR giảm thao tác thủ công | 50-70% |
| Chấm công có GPS proof | 100% |
| Geofence + 1-device | Active |
| Payroll chạy mượt | snapshot/chốt/khoá không lỗi |
| Báo cáo đủ cho HR & CFO | ✓ |

---

## 📋 Ghi chú

### Nguyên tắc triển khai
1. **Incremental refactor**: Thêm module mới độc lập, không đập đi làm lại
2. **Data-first**: Model + Migration + Seed + API trước, UI sau
3. **RBAC/Audit bắt buộc**: Module nào cũng có quyền + audit
4. **Idempotent**: Mọi publish/mapping/sync phải chạy nhiều lần không lỗi
5. **Snapshot-safe**: Dữ liệu đã snapshot/khoá kỳ lương thì không được làm "trôi" kết quả

### Tài liệu tham khảo
- [PRD-01-Xep-ca.md](PRD-01-Xep-ca.md)
- [PRD-02-Request-Leave.md](PRD-02-Request-Leave.md)
- [PRD-03-Employee-Self-Service.md](PRD-03-Employee-Self-Service.md)
- [PRD-04-Anti-fraud-Lite.md](PRD-04-Anti-fraud-Lite.md)
- [ROADMAP-HRM-LITE-Sprints-2weeks.md](ROADMAP-HRM-LITE-Sprints-2weeks.md)
