# PRD-01 — Module XẾP CA (Scheduling) — Payroll Option B HRM-lite
> App 100% tiếng Việt. Chỉ thêm module HRM-lite để bắt kịp Tanca, vẫn giữ thế mạnh Payroll (Rule engine + Snapshot + Adjustment).
> Mục tiêu PRD: mô tả yêu cầu nghiệp vụ + luồng + data model + API + UI + acceptance criteria để dev code end-to-end.

---

## 1) Tổng quan
### 1.1 Định vị module
Xếp ca là “xương sống” để:
- Chuẩn hóa lịch làm việc theo ca
- Là nguồn dữ liệu đầu vào cho **Chấm công**, **Ngày công**, **Chuyên cần**, **Phạt trễ giờ**
- Tăng khả năng cạnh tranh ngang Tanca ở HRM-lite

### 1.2 Phạm vi triển khai (v1)
- Danh mục ca làm việc (CRUD)
- Lịch phân ca theo tháng/tuần
- Calendar view
- Đồng bộ ca → tạo “lịch công dự kiến” (mapping sang Chấm công)

### 1.3 Ngoài phạm vi (future)
- Ca xoay tự động theo quy tắc phức tạp
- Auto-optimization scheduling
- Bidding ca theo app nhân viên

---

## 2) Personas & Quyền
### 2.1 Personas
- **Admin**: full quyền
- **HR**: tạo ca, phân ca, publish
- **Manager**: xem lịch team, đề xuất đổi ca
- **Nhân viên**: xem lịch cá nhân

### 2.2 RBAC permissions (gợi ý)
- `CA_LAM_VIEC_VIEW`, `CA_LAM_VIEC_MANAGE`
- `PHAN_CA_VIEW`, `PHAN_CA_MANAGE`, `PHAN_CA_PUBLISH`
- `PHAN_CA_EXPORT`
- `LICH_LAM_VIEC_MY_VIEW`

---

## 3) Use cases chính
1) HR tạo ca: Ca hành chính 8:00-17:00
2) HR tạo ca: Ca đêm 20:00-5:00 (qua ngày)
3) HR phân ca theo nhóm nhân viên cho cả tháng
4) HR publish lịch phân ca
5) Nhân viên xem lịch làm
6) Manager xem lịch team
7) Payroll dùng lịch để:
   - biết giờ vào/ra chuẩn
   - tính đi trễ/OT theo ca

---

## 4) Nghiệp vụ chi tiết
### 4.1 Ca làm việc
Ca gồm:
- Giờ vào, giờ ra
- Có thể qua ngày (ca đêm)
- Nghỉ giữa ca (phút)
- Cho phép check-in trước/sau bao nhiêu phút (grace period)

Quy tắc:
- Không cho phép trùng `maCa` trong 1 tenant
- Giờ ra < giờ vào => hiểu là qua ngày

### 4.2 Phân ca
Lịch phân ca theo tháng:
- Tạo 1 lịch/tháng cho phòng ban hoặc nhóm
- Có trạng thái:
  - `NHAP` (đang nhập)
  - `DA_CONG_BO` (publish)
  - `HUY` (hủy)

Phân ca batch:
- assign ca theo hàng loạt (nhân viên/nhóm)
- copy tuần trước

### 4.3 Mapping sang Chấm công
Khi publish:
- Tạo record “lịch công dự kiến” cho từng nhân viên theo ngày
- Nếu ngày đã có chấm công thực tế → không overwrite (chỉ gắn ca reference)

---

## 5) Data Model đề xuất
### 5.1 `CaLamViec`
- id
- maCa (unique)
- tenCa
- gioVao (HH:mm)
- gioRa (HH:mm)
- nghiGiuaCaPhut (int)
- graceInPhut (int)
- graceLatePhut (int)
- isCaDem (bool)
- phongBanId? (nullable)
- createdAt/updatedAt

### 5.2 `LichPhanCa`
- id
- thangNam (YYYY-MM)
- phongBanId? / nhomId?
- trangThai: NHAP | DA_CONG_BO | HUY
- ghiChu?
- createdBy
- createdAt/updatedAt

### 5.3 `LichPhanCaChiTiet`
- id
- lichPhanCaId
- nhanVienId
- ngay (YYYY-MM-DD)
- caLamViecId
- ghiChu?
- createdAt/updatedAt
- unique: (nhanVienId, ngay)

### 5.4 Mapping sang chấm công
Nếu dự án đã có `ChiTietChamCong`, bổ sung:
- `caLamViecId`
- `gioVaoDuKien`, `gioRaDuKien`

---

## 6) API Spec (REST)
### 6.1 Ca làm việc
- GET `/api/ca-lam-viec`
- POST `/api/ca-lam-viec`
- PUT `/api/ca-lam-viec/:id`
- DELETE `/api/ca-lam-viec/:id`

### 6.2 Lịch phân ca
- GET `/api/phan-ca?thangNam=2025-06&phongBanId=...`
- POST `/api/phan-ca`
- POST `/api/phan-ca/:id/assign-batch`
- POST `/api/phan-ca/:id/copy-week`
- POST `/api/phan-ca/:id/publish`
- POST `/api/phan-ca/:id/unpublish`
- GET `/api/phan-ca/:id/calendar`
- GET `/api/phan-ca/:id/export`

### 6.3 Personal schedule
- GET `/api/lich-lam-viec/toi?from=...&to=...`

---

## 7) UI/UX Requirements
- Danh mục ca: table + modal create/edit
- Calendar month/week, filter phòng ban/nhóm
- Batch assign ca (drag/fill)
- Publish có confirm + trạng thái banner

---

## 8) Acceptance Criteria
- Phân ca 100 nhân viên/tháng < 10 phút
- Publish mapping sang chấm công thành công, idempotent
- Không overwrite chấm công thực tế
- Audit đầy đủ
