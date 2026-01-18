# ROADMAP HRM-LITE (BẮT KỊP TANCA) — Chi tiết theo Sprint 2 tuần (Task Breakdown)
> Mục tiêu: Bắt kịp Tanca ở HRM-lite (Scheduling + Attendance + Request + Anti-fraud lite + Self-service) nhưng giữ thế mạnh Payroll (Rule engine + Snapshot + Adjustment + Import sản lượng).
> Thời gian: 6 tháng ~ 12 sprint (mỗi sprint 2 tuần).
> App 100% tiếng Việt.

---

## Tổng nguyên tắc triển khai
1) **Incremental refactor**: không đập đi làm lại, ưu tiên thêm module mới độc lập rồi liên thông payroll.
2) **Data-first**: model + migration + seed + API trước, UI sau.
3) **RBAC/Audit bắt buộc**: module nào cũng có quyền + audit.
4) **Idempotent**: mọi publish/mapping/sync phải chạy nhiều lần không lỗi.
5) **Snapshot-safe**: dữ liệu đã snapshot/khoá kỳ lương thì không được làm “trôi” kết quả.

---

## Sprint 0 (Tuần 1-2) — Nền tảng phát triển & chuẩn hoá sản phẩm
### Mục tiêu
- Ổn định nền tảng UI/UX + quyền + seed data để dev/QA test nhanh.

### Deliverables
- UI navigation suite:
  - Sidebar theo luồng + RBAC + search + favorites
  - Breadcrumbs + Quick actions
  - Command Palette Ctrl+K
  - Theme light/dark + design system
- Chuẩn hoá RBAC: naming + mapping quyền
- Seed data full flow 06→12/2025
- CI test pipeline: API smoke + DB migration check

### Tasks
**FE**
- Apply PROMPT-UI-Dribbble-FINAL.md
- Menu IA gọn theo luồng
**BE**
- Permission guard chuẩn hoá
- Audit log wrappers
**QA**
- API smoke test (Postman/Newman)
- Checklist regression payroll

---

## Sprint 1 (Tuần 3-4) — Scheduling v1: Danh mục ca làm việc
### Deliverables
- CRUD `CaLamViec`
- Validate ca đêm, grace time
- UI danh mục ca

### Tasks
**BE**
- Models + migration: `CaLamViec`
- API CRUD + RBAC + audit
**FE**
- Screen: Danh mục ca
- Modal create/edit, validate
**QA**
- Test ca đêm (qua ngày), duplicate maCa

---

## Sprint 2 (Tuần 5-6) — Scheduling v1: Lịch phân ca + Calendar view cơ bản
### Deliverables
- `LichPhanCa`, `LichPhanCaChiTiet`
- Assign batch + copy week
- Calendar month/week view
- Publish/Unpublish

### Tasks
**BE**
- Models + migration
- API create lịch tháng, assign batch, copy week
- Publish tạo mapping sang `ChiTietChamCong` (ca reference)
**FE**
- Calendar screen (filter phòng ban/nhóm)
- Batch assign UI (drag/fill hoặc bulk dialog)
**QA**
- Publish idempotent 2 lần
- Không overwrite chấm công thực tế

---

## Sprint 3 (Tuần 7-8) — Leave v1: Nghỉ phép chuẩn + số dư phép
### Deliverables
- Danh mục loại nghỉ
- Tạo đơn nghỉ (NV)
- Duyệt 1 cấp (manager)
- Mapping nghỉ → ngày công/chấm công
- Số dư phép cơ bản

### Tasks
**BE**
- Models: `DanhMucRequest`, `DonRequest`, `RequestMappingChamCong`
- Logic leave balance
- API my requests + approve/reject
**FE**
- Wizard tạo nghỉ
- My requests list + timeline
- Inbox approve (manager)
**QA**
- Nghỉ nhiều ngày
- Nghỉ không phép ảnh hưởng chuyên cần

---

## Sprint 4 (Tuần 9-10) — Request v1: Trễ/Sớm/OT/Công tác + workflow 2 cấp
### Deliverables
- Request types: TRE_GIO, VE_SOM, OT, CONG_TAC
- Workflow config theo phòng ban/nhóm: 1 cấp/2 cấp
- HR approve level 2 + override

### Tasks
**BE**
- Model: `RequestWorkflowConfig`
- API inbox cấp 2
- Apply mapping tự động
**FE**
- UI tạo request theo loại
- Inbox HR + bulk approve (optional)
**QA**
- OT qua ngày
- Override bắt nhập reason

---

## Sprint 5 (Tuần 11-12) — Employee Self-service v1: Portal nhân viên (PWA style)
### Deliverables
- Portal mobile-first:
  - Trang chủ
  - Lịch làm
  - Yêu cầu
  - Cá nhân (payslip list)
- Login role nhân viên

### Tasks
**FE**
- Shell mobile bottom nav
- Screens + responsive
**BE**
- Endpoint my schedule / my payslip summary
**QA**
- UX test trên iPhone/Android browser

---

## Sprint 6 (Tuần 13-14) — Manager approval mobile + Notification lite
### Deliverables
- Inbox manager mobile-friendly
- Duyệt nhanh (one-tap)
- In-app notification center (lite)

### Tasks
**FE**
- Inbox approvals
- Notification bell + list
**BE**
- Notification model/event hooks
**QA**
- 100 approvals < 2 phút

---

## Sprint 7 (Tuần 15-16) — Anti-fraud Lite v1: GPS + Geofence
### Deliverables
- Geofence config theo địa điểm/phòng ban
- Check-in/out yêu cầu GPS
- Distance check, chặn ngoài vùng
- Proof logs

### Tasks
**BE**
- Models: `CauHinhGeofence`, `BangGhiChamCongGPS`
- API geofence + checkin/out
**FE**
- HR screen cấu hình geofence
- Check-in/out UI hiển thị in/out geofence
**QA**
- GPS denied
- Ngoài geofence

---

## Sprint 8 (Tuần 17-18) — Anti-fraud Lite v2: 1 device binding + Offline sync
### Deliverables
- Bind deviceId khi login
- Block login thiết bị khác
- HR reset device (audit)
- Offline queue sync

### Tasks
**BE**
- Model: `ThietBiNhanVien`
- API bind/reset + guard login
**FE**
- Device status screen
- Offline queue (local storage/indexedDB)
**QA**
- Reset device + audit
- Offline→online sync, no duplicate

---

## Sprint 9 (Tuần 19-20) — Timesheet Management: Bảng công tháng + Sửa công/Giải trình
### Deliverables
- Timesheet month view
- Sửa công workflow + audit
- Mapping sang payroll ngày công

### Tasks
**BE**
- Endpoint update attendance with approval
**FE**
- Timesheet grid + edit modal
- Explanation + approve
**QA**
- Snapshot rồi sửa công => blocked

---

## Sprint 10 (Tuần 21-22) — Payroll Sync: One-click pipeline + Rule trace nguồn dữ liệu
### Deliverables
- Pipeline: Scheduling → Attendance → Timesheet → Payroll
- Hiển thị trace: ca/request/gps/kpi nguồn nào ảnh hưởng

### Tasks
**BE**
- Improve RuleTrace payload
- Locking rules
**FE**
- Trace UI hiển thị nguồn dữ liệu
**QA**
- Regression payroll module

---

## Sprint 11 (Tuần 23-24) — Dashboard HR/Payroll/Manager + KPIs
### Deliverables
- Dashboard theo vai trò
- KPI cards & trend
- Alert: thiếu dữ liệu công/ca/request

### Tasks
**BE**
- Aggregation endpoints
**FE**
- Dashboard cards + table
**QA**
- Data correctness checks

---

## Sprint 12 (Tuần 25-26) — Reports + Hardening + Go-live checklist
### Deliverables
- Reports:
  - đi trễ/OT/nghỉ phép
  - quỹ lương theo phòng ban/khoản
  - headcount
- Performance optimization
- Regression test full suite
- Go-live checklist + training docs

### Tasks
**QA**
- Full newman + e2e manual
**FE/BE**
- Optimize queries + pagination
- Fix edge cases

---

## KPI thành công sau 6 tháng
- 80% request tạo từ self-service
- HR giảm 50–70% thao tác thủ công
- Chấm công có GPS proof + geofence + 1-device (anti-fraud lite)
- Payroll chạy mượt: snapshot/chốt/khoá không lỗi
- Báo cáo đủ cho HR & CFO

---

## Tài liệu liên quan
- PRD-01-Xep-ca.md
- PRD-02-Request-Leave.md
- PRD-03-Employee-Self-Service.md
- PRD-04-Anti-fraud-Lite.md
- PROMPT-UI-Dribbble-FINAL.md
