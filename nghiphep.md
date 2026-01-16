Module “NGHỈ PHÉP (LITE) + DUYỆT + MAPPING CHẤM CÔNG/NGÀY CÔNG + RULE CHUYÊN CẦN/ỨNG LƯƠNG”
> App 100% tiếng Việt | Payroll Option B | Không refactor phá kiến trúc

## 0) Bối cảnh & ràng buộc dự án (BẮT BUỘC)
Dự án Payroll Option B đã có:
- Nhân viên: `NhanVien`, hợp đồng/lương hiệu lực: `NhanVienHopDong`
- Phòng ban: flat, NV có `phongBanId` trực tiếp
- Nhóm NV: `NhomNhanVien`, `NhanVienThuocNhom`
- Chấm công: `ChamCong`, `ChiTietChamCong`, phạt chấm công: `CauHinhPhatChamCong`
- Ngày công bảng lương: `NgayCongBangLuong`
- Rule engine: `QuyChe`, `QuyCheRule`, trace: `RuleTrace`
- Ứng lương: có module `BangUngLuong/ChiTietBangUngLuong` hoặc đang triển khai
- Phiếu điều chỉnh: `PhieuDieuChinh`, `ChiTietPhieuDieuChinh`
- Audit: `AuditLog`, `AuditSuaDuLieu`
- RBAC: `NguoiDung`, `VaiTro`, `Quyen`, `VaiTroQuyen`

**Ràng buộc quan trọng:**
- App 100% tiếng Việt
- Không làm HRM phức tạp, chỉ làm “Nghỉ phép Lite” phục vụ payroll
- Nghỉ phép phải có duyệt + audit
- Nghỉ phép phải mapping ra dữ liệu dùng cho payroll: `NgayCongBangLuong`
- Rule chuyên cần & ứng lương phải dùng dữ liệu nghỉ có phép/không phép

---

## 1) Mục tiêu module
### 1.1. Quản lý nghỉ phép (Lite)
Cho phép:
- Nhân viên tạo “Đơn nghỉ”
- Duyệt theo cấp quản lý/HR
- Phân loại nghỉ: có phép / không phép / không lương / có lương
- Có lý do, file đính kèm (optional)
- Tính số ngày nghỉ theo khoảng ngày hoặc theo giờ (tối thiểu hỗ trợ theo ngày)

### 1.2. Mapping sang chấm công / ngày công
Sau khi duyệt:
- Tự động đổ trạng thái nghỉ vào **Chấm công** (hoặc ít nhất là dữ liệu tổng hợp `NgayCongBangLuong`)
- Dữ liệu tổng hợp cần phục vụ:
  - `soNgayNghiCoPhep`
  - `soNgayNghiKhongPhep`
  - `soNgayNghiKhongLuong`
  - `soNgayNghiCoLuong`

### 1.3. Rule chuyên cần & Rule ứng lương
- Rule chuyên cần có thể: đủ ngày công + không nghỉ quá ngưỡng → thưởng chuyên cần
- Rule ứng lương: nếu nghỉ quá ngày hoặc có nghỉ không phép → **cấm ứng**

---

## 2) Phạm vi triển khai (BẮT BUỘC CODE END-TO-END)
1) Backend: model + migration + service + API
2) Frontend: UI đơn nghỉ + duyệt + calendar/list + filter
3) Đồng bộ/mapping nghỉ → chấm công/ngày công
4) Cập nhật rule/biến số trong rule engine để dùng dữ liệu nghỉ
5) Audit đầy đủ

---

## 3) Thiết kế Model (MỚI)
### 3.1. Danh mục loại nghỉ: `DanhMucLoaiNghi`
Fields:
- `id`
- `maLoaiNghi` (VD: PHEP_NAM, OM, KHONG_LUONG, KHONG_PHEP)
- `tenLoaiNghi`
- `nhomLoai`: `CO_PHEP | KHONG_PHEP`
- `coTinhLuong` boolean
- `coTinhChuyenCan` boolean (nghỉ loại này có làm mất chuyên cần không)
- `thuTuHienThi`
- `isActive`

### 3.2. Đơn nghỉ: `DonNghiPhep`
Fields:
- `id`
- `maDon` (format: NP-YYYYMM-XXXXX)
- `nhanVienId`
- `phongBanId` (denormalize)
- `tuNgay`, `denNgay`
- `soNgayNghi` (computed)
- `loaiNghiId`
- `lyDo`
- `tepDinhKemUrl` (optional)
- `trangThai`: `NHAP | GUI_DUYET | DA_DUYET | TU_CHOI | HUY`
- `nguoiDuyetId` (nullable)
- `ngayDuyet` (nullable)
- `lyDoTuChoi` (nullable)
- audit fields: createdBy, createdAt, updatedAt

Unique:
- (`nhanVienId`, `tuNgay`, `denNgay`, `loaiNghiId`) (để hạn chế spam trùng)

### 3.3. Chi tiết ngày nghỉ: `ChiTietNghiPhepNgay`
Mục tiêu: phục vụ mapping từng ngày.
Fields:
- `id`
- `donNghiPhepId`
- `nhanVienId`
- `ngay` (date)
- `soGioNghi` (optional, default 8)
- `loaiNghiId`
- `coTinhLuong` boolean
- `coTinhChuyenCan` boolean

Index:
- (`nhanVienId`, `ngay`)

---

## 4) Workflow duyệt nghỉ & phân quyền
### 4.1. Quyền RBAC (BẮT BUỘC)
Tạo quyền:
- `NGHI_PHEP_VIEW`
- `NGHI_PHEP_TAO_DON`
- `NGHI_PHEP_SUA_DON` (chỉ khi NHAP)
- `NGHI_PHEP_GUI_DUYET`
- `NGHI_PHEP_DUYET`
- `NGHI_PHEP_HUY_DON`
- `NGHI_PHEP_ADMIN` (HR/Admin)

### 4.2. Trạng thái
- `NHAP`: nhân viên sửa/xoá được
- `GUI_DUYET`: khoá chỉnh sửa, chờ duyệt
- `DA_DUYET`: tạo mapping chi tiết ngày nghỉ + cập nhật chấm công/ngày công
- `TU_CHOI`: cho phép nhân viên sửa lại và gửi lại
- `HUY`: dừng hiệu lực

### 4.3. Audit
Mọi hành động:
- tạo/sửa/gửi duyệt/duyệt/từ chối/huỷ
đều phải ghi `AuditLog`.

---

## 5) Mapping nghỉ phép sang Chấm công / Ngày công
### 5.1. Nguyên tắc ưu tiên dữ liệu
Khi tổng hợp ngày công:
- Nếu có bản ghi nghỉ phép `DA_DUYET` tại ngày X ⇒ override trạng thái “vắng”
- Nếu vừa có chấm công vừa có nghỉ:
  - vẫn đánh dấu `NGHI_CO_PHEP` nhưng có thể giữ log xung đột (optional)

### 5.2. Cách mapping (BẮT BUỘC)
Tạo service:
- `NghiPhepMappingService`

Functions:
1) `taoChiTietNgayNghi(donNghiPhepId)`:
   - explode tuNgay..denNgay thành `ChiTietNghiPhepNgay`
   - gắn flags coTinhLuong/coTinhChuyenCan theo `DanhMucLoaiNghi`

2) `dongBoChamCong(donNghiPhepId)`:
   - update/insert `ChiTietChamCong` cho các ngày nghỉ:
     - status: `NGHI_CO_PHEP` / `NGHI_KHONG_PHEP`
     - store `refType="DON_NGHI_PHEP"`, `refId`
   - chỉ cho phép chỉnh nếu bảng lương kỳ đó chưa khoá (nếu có logic lock theo tháng)

3) `capNhatNgayCongBangLuong(thangNam, nhanVienId)`:
   - tổng hợp:
     - `soNgayNghiCoPhep`
     - `soNgayNghiKhongPhep`
     - `soNgayNghiKhongLuong`
     - `soNgayNghiCoLuong`
   - lưu vào `NgayCongBangLuong`

**Idempotent**: chạy lại mapping không tạo trùng.

---

## 6) API Backend (REST)
### 6.1. Danh mục loại nghỉ
- `GET /api/nghi-phep/loai-nghi`
- `POST /api/nghi-phep/loai-nghi`
- `PUT /api/nghi-phep/loai-nghi/:id`
- `POST /api/nghi-phep/loai-nghi/:id/toggle`

### 6.2. Đơn nghỉ
- `POST /api/nghi-phep/don` tạo đơn
- `GET /api/nghi-phep/don` list (filter: trạng thái, phòng ban, ngày)
- `GET /api/nghi-phep/don/:id` detail
- `PUT /api/nghi-phep/don/:id` sửa (NHAP/TU_CHOI)
- `POST /api/nghi-phep/don/:id/gui-duyet`
- `POST /api/nghi-phep/don/:id/duyet`
- `POST /api/nghi-phep/don/:id/tu-choi`
- `POST /api/nghi-phep/don/:id/huy`

### 6.3. Mapping
- `POST /api/nghi-phep/don/:id/mapping/rebuild` (admin only)
- `GET /api/nghi-phep/nhan-vien/:id/lich` calendar view (from-to)

---

## 7) UI Frontend (100% tiếng Việt)
### 7.1. Menu mới
- “Nghỉ phép”
  - “Đơn nghỉ của tôi”
  - “Duyệt nghỉ phép” (quản lý/HR)
  - “Danh mục loại nghỉ” (admin)

### 7.2. Đơn nghỉ của tôi
- Tạo đơn nghỉ:
  - chọn loại nghỉ
  - chọn từ ngày/đến ngày
  - tự tính số ngày nghỉ
  - lý do + file đính kèm (optional)
- Nút:
  - Lưu nháp
  - Gửi duyệt
  - Huỷ

### 7.3. Duyệt nghỉ phép
- Danh sách filter:
  - phòng ban, nhân viên, trạng thái, khoảng ngày
- Action:
  - Duyệt / Từ chối (nhập lý do)
- Khi duyệt:
  - gọi mapping service
  - hiển thị kết quả mapping (số ngày ghi nhận)

### 7.4. UI Calendar
- Calendar tháng:
  - highlight ngày nghỉ
  - tooltip loại nghỉ + trạng thái

---

## 8) Tích hợp Rule chuyên cần & Ứng lương
### 8.1. Biến số chuẩn hoá để rule engine dùng
Trong pipeline tổng hợp `NgayCongBangLuong`, đảm bảo có field:
- `soNgayNghiCoPhep`
- `soNgayNghiKhongPhep`
- `soNgayNghiKhongLuong`
- `soNgayNghiCoLuong`
- `soNgayCongThucTe`

Expose ra rule engine dưới dạng biến:
- `NGHI_CO_PHEP`
- `NGHI_KHONG_PHEP`
- `NGHI_KHONG_LUONG`
- `NGAY_CONG_THUC_TE`

### 8.2. Rule Chuyên cần
Ví dụ rule JSON:
```json
{
  "ten_rule":"Thưởng chuyên cần",
  "khoan_luong":"CHUYEN_CAN",
  "loai_rule":"IF_THEN",
  "dieu_kien_json":{
    "and":[
      {"var":"NGHI_KHONG_PHEP","op":"==","value":0},
      {"var":"NGHI_CO_PHEP","op":"<=","value":2},
      {"var":"NGAY_CONG_THUC_TE","op":">=","value":26}
    ]
  },
  "then_json":{"set":300000},
  "else_json":{"set":0},
  "thu_tu_uu_tien":10
}
8.3. Rule Ứng lương (eligibility)
Rule:

nếu NGHI_KHONG_PHEP > 0 ⇒ KHONG_DU_DIEU_KIEN_UNG

nếu NGHI_CO_PHEP > cấu_hình ⇒ KHONG_DU_DIEU_KIEN_UNG

Trong bảng ứng lương:

compute duocPhepUng dựa trên các biến ngày nghỉ

9) Seed dữ liệu demo (BẮT BUỘC)
Danh mục nghỉ:

PHEP_NAM (có phép, có tính lương, có tính chuyên cần = false hoặc tuỳ)

OM (có phép, có tính lương)

KHONG_LUONG

KHONG_PHEP

10 nhân viên

5 đơn nghỉ:

2 đơn DA_DUYET

1 đơn TU_CHOI

1 đơn GUI_DUYET

1 đơn KHONG_PHEP

10) Checklist nghiệm thu (BẮT BUỘC)
 CRUD loại nghỉ OK

 Tạo/gửi duyệt/duyệt/từ chối/huỷ đơn nghỉ OK

 Mapping tạo ChiTietNghiPhepNgay đúng số ngày

 Đồng bộ ChiTietChamCong và/hoặc tổng hợp NgayCongBangLuong đúng

 Rule chuyên cần & ứng lương dùng đúng biến ngày nghỉ

 Audit đầy đủ

 UI 100% tiếng Việt, dễ dùng

11) Yêu cầu output
Code backend + frontend hoàn chỉnh

Không mock data trong logic chính

Tài liệu README ngắn (tiếng Việt) hướng dẫn vận hành module nghỉ phép