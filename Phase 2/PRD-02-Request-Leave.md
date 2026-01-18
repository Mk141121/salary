# PRD-02 — Module REQUEST / NGHỈ PHÉP + Workflow Duyệt + Mapping Chấm công/Ngày công
> Module liên thông: Scheduling → Chấm công → Ngày công → Chuyên cần/Ứng lương → Payroll.

---

## 1) Mục tiêu
- Nhân viên tự tạo request (nghỉ/trễ/OT/công tác)
- Manager/HR duyệt theo workflow 1-2 cấp
- Mapping tự động vào chấm công/ngày công/payroll rules

---

## 2) Personas & Quyền
Permissions:
- `REQUEST_CREATE_MY`, `REQUEST_VIEW_MY`
- `REQUEST_APPROVE_LEVEL1`, `REQUEST_APPROVE_LEVEL2`
- `REQUEST_OVERRIDE`, `REQUEST_CONFIG_MANAGE`

---

## 3) Workflow
Trạng thái:
- `NHAP`, `CHO_DUYET_1`, `CHO_DUYET_2`, `DA_DUYET`, `TU_CHOI`, `DA_HUY`

Luồng:
- 1 cấp: NV → Manager → Apply mapping
- 2 cấp: NV → Manager → HR → Apply mapping

---

## 4) Nghiệp vụ
### 4.1 Leave types
- PHEP_NAM, PHEP_BENH, KHONG_LUONG, KHONG_PHEP

### 4.2 Request types
- TRE_GIO, VE_SOM, OT, CONG_TAC

### 4.3 Mapping
- Leave approved => tạo nghỉ vào ngày công
- OT => tạo giờ OT
- Trễ/sớm => hợp thức hoá
- Kỳ đã snapshot/khóa => SKIPPED + cảnh báo

---

## 5) Data Model
- `DanhMucRequest`
- `DonRequest`
- `RequestWorkflowConfig`
- `RequestMappingChamCong`

(chi tiết fields theo bản đầy đủ trong tài liệu Sprint)

---

## 6) API
- CRUD danh mục
- my requests
- inbox approve
- approve/reject/cancel
- apply-mapping
- config workflow

---

## 7) UI
- NV: wizard tạo request + list + timeline
- Manager/HR: inbox + approve/reject + bulk approve (optional)

---

## 8) Acceptance
- Mapping tự động < 1 phút
- Override bắt buộc log reason
- Audit đầy đủ
