Module “BẢNG ỨNG LƯƠNG + KHẤU TRỪ + SỔ LƯƠNG” (Option B – 100% tiếng Việt)

## 0) Bối cảnh dự án (ràng buộc bắt buộc)
Bạn đang làm trên dự án Payroll Option B hiện có với các module/model đã tồn tại:
- Nhân viên: `NhanVien`, hợp đồng/lương hiệu lực: `NhanVienHopDong`
- Phụ cấp: `PhuCapNhanVien` (tuNgay/denNgay)
- Trách nhiệm: `NhanVienTrachNhiem`
- Quy chế: `QuyChe`, `QuyCheRule`, Rule engine + rule trace: `RuleTrace`
- Import sản lượng: `SanLuongChiaHang`, `GiaoHang`, `LichSuImport`
- Snapshot kỳ lương: `SnapshotBangLuong`, `SnapshotSanLuongChiaHang`, `SnapshotGiaoHang`
- Bảng lương: `BangLuong` trạng thái `NHAP/DA_CHOT/DA_KHOA`
- Phiếu điều chỉnh: `PhieuDieuChinh`, `ChiTietPhieuDieuChinh`
- Audit: `AuditLog`, `AuditSuaDuLieu`
- RBAC: `NguoiDung`, `VaiTro`, `Quyen`, `VaiTroQuyen`
- KPI, Chấm công, BHXH/Thuế có sẵn
- Phòng ban flat, nhân viên có `phongBanId` trực tiếp
- Nhóm nhân viên: `NhomNhanVien`, `NhanVienThuocNhom`

**Quan trọng:**
- App 100% tiếng Việt
- Không được thay đổi kiến trúc cốt lõi Option B
- Ưu tiên tái sử dụng module `PhieuDieuChinh` để ghi nhận ứng lương thành khoản khấu trừ (không sửa trực tiếp kỳ đã khoá)
- Có workflow `NHAP → DA_CHOT → DA_KHOA` + snapshot để giải trình

---

## 1) Mục tiêu tính năng mới
### 1.1. Bảng Ứng Lương (giữa tháng)
Do số lượng nhân viên ứng lương lớn, cần UI dạng bảng giống bảng lương để:
- Tạo “kỳ ứng lương” theo khoảng ngày giữa tháng
- Tự tính điều kiện ứng lương theo dữ liệu phát sinh tới thời điểm hiện tại
- Nhập số tiền ứng hàng loạt (grid/paste/import excel)
- Chốt/Khoá bảng ứng lương
- Sau khi chi trả: tự động ghi nhận khoản ứng vào lịch sử lương nhân viên để khấu trừ kỳ lương chính

### 1.2. Điều kiện ứng lương (business rule)
Nhân viên được ứng nếu:
- Tiền công lũy kế tới thời điểm hiện tại **>=** số tiền ứng đề xuất
- Không vi phạm chuyên cần (nghỉ nhiều ngày / nghỉ không phép)
- Nhân viên active
- Có thể cấu hình rule theo công ty

Nhân viên vi phạm chuyên cần sẽ **không được ứng**.

### 1.3. Sổ lương / Lịch sử lương (nhân viên + phòng ban)
Cần tính năng xem lịch sử chi tiết lương theo khoảng ngày:
- Theo nhân viên (timeline các nghiệp vụ lương)
- Theo phòng ban (tổng hợp + drilldown)
Nguồn dữ liệu: Bảng lương, Phiếu điều chỉnh, Ứng lương, Thưởng phạt, KPI…

---

## 2) Phạm vi triển khai (bắt buộc)
Bạn phải code end-to-end:
1) Backend: Model + migration + service + API
2) Frontend: UI danh sách/chi tiết + Grid nhập hàng loạt + validate
3) Snapshot + workflow trạng thái
4) Ghi nhận ứng lương thành khấu trừ bằng Phiếu điều chỉnh
5) Sổ lương: API + UI + lọc theo khoảng ngày + drilldown + export

---

## 3) Thiết kế dữ liệu (Model mới)
### 3.1. `BangUngLuong`
Fields:
- `id`
- `maBangUngLuong` (format: UL-YYYYMM-XX)
- `thangNam` (YYYY-MM)
- `tuNgay`, `denNgay`
- `ngayChiTra`
- `phongBanId` (nullable, nếu tạo theo phòng ban)
- `trangThai`: `NHAP | DA_CHOT | DA_KHOA`
- `cauHinhJson` (json: rule chuyên cần, rule tính mức tối đa, …)
- `createdBy`, `createdAt`, `updatedAt`

Indexes:
- unique (`thangNam`, `tuNgay`, `denNgay`, `phongBanId`)

### 3.2. `ChiTietBangUngLuong`
Fields:
- `id`
- `bangUngLuongId`
- `nhanVienId`
- `phongBanId` (denormalize)
- `nhomNhanVienId` (nullable, denormalize nếu có)
- `tienCongLuyKe` (computed snapshot)
- `mucToiDaDuocUng` (computed)
- `soNgayNghi`, `soNgayNghiKhongPhep` (computed)
- `duocPhepUng` boolean
- `lyDoKhongDat` (enum/text)
- `soTienUngDeXuat`
- `soTienUngDuyet`
- `ghiChu`
- `lockedBySnapshot` boolean default false
- audit fields

Unique:
- (`bangUngLuongId`, `nhanVienId`)

### 3.3. Snapshot
Tạo:
- `SnapshotBangUngLuong`
- `SnapshotChiTietBangUngLuong`
Mục tiêu: “ảnh chụp dữ liệu xét điều kiện” để giải trình khi chốt/khoá.

`SnapshotChiTietBangUngLuong` phải lưu:
- dữ liệu đầu vào tính lũy kế (tổng ngày công, tổng sản lượng, tổng phạt, KPI nếu tính)
- kết quả điều kiện + trace

---

## 4) Logic nghiệp vụ: tính “Tiền công lũy kế”
### 4.1. Nguyên tắc
Tính từ đầu tháng tới `denNgay` của kỳ ứng lương.

Tối thiểu hỗ trợ:
- Lương cơ bản theo ngày công (pro-rate)
- Chuyên cần (nếu dùng)
- Sản lượng chia hàng lũy kế
- Giao hàng lũy kế
- Phạt chấm công lũy kế
- Thưởng/phạt sự kiện (nếu có)
- Có thể mở rộng thêm BHXH/Thuế (không bắt buộc trong eligibility)

### 4.2. Service tính toán
Tạo service:
- `UngLuongCalculatorService`
Functions:
- `tinhTienCongLuyKe(nhanVienId, tuNgay, denNgay)`
- `tinhChuyenCan(nhanVienId, tuNgay, denNgay)`
- `tinhSanLuongChiaHang(nhanVienId, tuNgay, denNgay)`
- `tinhGiaoHang(nhanVienId, tuNgay, denNgay)`
- `tinhPhatChamCong(nhanVienId, tuNgay, denNgay)`
- `kiemTraChuyenCan(nhanVienId, tuNgay, denNgay, cauHinhJson)`

Output:
- tiền công lũy kế
- số ngày nghỉ / nghỉ không phép
- eligible true/false + reason

---

## 5) Điều kiện ứng lương (rule)
Trong `cauHinhJson` của `BangUngLuong`, hỗ trợ:
```json
{
  "chuyen_can": {
    "so_ngay_nghi_toi_da": 2,
    "cam_neu_nghi_khong_phep": true
  },
  "ung_luong": {
    "ti_le_toi_da": 0.7,
    "lam_tron": 10000
  }
}
Rules:

duocPhepUng = false nếu vượt ngưỡng nghỉ hoặc có nghỉ không phép

mucToiDaDuocUng = min(tienCongLuyKe * ti_le_toi_da, tienCongLuyKe)

Validation khi nhập:

soTienUngDuyet <= mucToiDaDuocUng

Nếu duocPhepUng = false thì không cho nhập / auto set 0

6) Workflow trạng thái & quyền
6.1. Trạng thái
NHAP: được sửa chi tiết, import/paste

DA_CHOT: tạo snapshot, không sửa số tiền, chỉ xem

DA_KHOA: cấm sửa + cấm xoá, chỉ admin có quyền thao tác đặc biệt (mở khoá theo audit)

6.2. Quyền (RBAC)
Tạo các quyền:

UNG_LUONG_VIEW

UNG_LUONG_CREATE

UNG_LUONG_EDIT

UNG_LUONG_CHOT

UNG_LUONG_KHOA

UNG_LUONG_IMPORT

UNG_LUONG_EXPORT

SO_LUONG_VIEW (sổ lương)

Không cần scope phòng ban (vì dự án chưa có) nhưng code phải sẵn sàng hỗ trợ filter theo phòng ban.

7) API Backend (REST)
7.1. Bảng ứng lương
POST /api/ung-luong/bang tạo bảng ứng lương

GET /api/ung-luong/bang list + filter tháng/phòng ban/trạng thái

GET /api/ung-luong/bang/:id detail + rows

PUT /api/ung-luong/bang/:id edit header (NHAP)

POST /api/ung-luong/bang/:id/generate-danh-sach sinh dòng nhân viên theo filter phòng ban/nhóm

PUT /api/ung-luong/bang/:id/rows/bulk update bulk (paste)

POST /api/ung-luong/bang/:id/import-excel import template

GET /api/ung-luong/bang/:id/export-excel export

7.2. Chốt/khoá + snapshot
POST /api/ung-luong/bang/:id/chot => tạo snapshot + set DA_CHOT

POST /api/ung-luong/bang/:id/khoa => DA_KHOA

POST /api/ung-luong/bang/:id/mo-khoa (admin only) => audit bắt buộc lý do

7.3. Ghi nhận khấu trừ vào kỳ lương
Sau khi bảng ứng lương DA_CHOT hoặc DA_KHOA, cho phép action:

POST /api/ung-luong/bang/:id/ghi-nhan-khau-tru
Logic:

Tạo PhieuDieuChinh tự động cho từng kỳ lương áp dụng

Tạo ChiTietPhieuDieuChinh với khoản: KHAU_TRU_UNG_LUONG số tiền âm

Link back: lưu refType="BANG_UNG_LUONG", refId=<id>

Idempotent: gọi lại không tạo trùng (detect by refId)

8) UI Frontend (bắt buộc)
8.1. Menu
Thêm menu:

“Ứng lương”

“Bảng ứng lương”

“Sổ lương”

8.2. List Bảng ứng lương
Table cột:

Mã, Tháng, Từ ngày-Đến ngày, Ngày chi trả, Phòng ban, Trạng thái

Actions:

Tạo mới

Mở

Chốt/Khoá

Export/Import

8.3. Chi tiết Bảng ứng lương (Grid)
Grid giống Bảng lương:

Cột read-only:

Mã NV, Họ tên, Phòng ban, Nhóm

Tiền công lũy kế

Mức tối đa được ứng

Số ngày nghỉ / nghỉ KP

Eligible

Cột nhập:

Số tiền ứng đề xuất

Số tiền ứng duyệt

Ghi chú

Features:

Paste từ Excel

Import Excel template

Validate realtime:

vượt mức tối đa => đỏ + tooltip

không eligible => disable input

Bulk actions:

“Set theo % mức tối đa”

“Set số tiền cố định”

Xem trace (modal):

hiển thị snapshot input + lý do

Buttons:

“Sinh danh sách NV”

“Chốt”

“Khoá”

“Ghi nhận khấu trừ vào kỳ lương”

9) Sổ lương / Lịch sử lương (theo khoảng ngày)
9.1. Mục tiêu
Cho phép xem lịch sử lương chi tiết:

Theo nhân viên

Theo phòng ban
Theo khoảng ngày (from-to)

9.2. API
GET /api/so-luong/nhan-vien/:id?tuNgay=&denNgay=

GET /api/so-luong/phong-ban/:id?tuNgay=&denNgay=

GET /api/so-luong/search?keyword=&tuNgay=&denNgay=

9.3. Data source
Tổng hợp thành “entry” timeline:

Bảng lương: các khoản thu nhập/khấu trừ

Phiếu điều chỉnh: dòng +/- (bao gồm khấu trừ ứng lương)

Sự kiện thưởng phạt

KPI thưởng

Ứng lương: thể hiện như “Tạm ứng/Khấu trừ”

Output entry format:

ngayHachToan

loaiNguon (BANG_LUONG, DIEU_CHINH, UNG_LUONG, KPI, THUONG_PHAT)

khoanLuong

soTien

moTa

refId/refType để mở detail

9.4. UI Sổ lương
A) Sổ lương nhân viên:

chọn NV + từ ngày + đến ngày

timeline/bảng:

ngày, nguồn, khoản, số tiền, mô tả, link xem chi tiết

B) Sổ lương phòng ban:

chọn phòng ban + date range

summary:

tổng chi, tổng ứng, tổng khấu trừ ứng, tổng điều chỉnh

drilldown vào NV

Export Excel/PDF (optional).

10) Audit & an toàn dữ liệu
Mọi thao tác import/bulk update/chốt/khoá/mở khoá phải ghi AuditLog

mo-khoa bắt buộc nhập lý do + người thực hiện

Action “ghi nhận khấu trừ” phải idempotent & transaction

11) Checklist hoàn thành (bắt buộc)
 Migration DB OK

 API CRUD + bulk + import/export OK

 Grid UI paste + validate OK

 Snapshot tạo đúng và trace xem được

 Chốt/Khoá hoạt động đúng

 Ghi nhận khấu trừ bằng Phiếu điều chỉnh OK + không tạo trùng

 Sổ lương theo NV/phòng ban OK

 100% text tiếng Việt

12) Output yêu cầu
Code hoàn chỉnh backend + frontend

Không viết mock

Có seed demo tối thiểu:

1 kỳ ứng lương

10 nhân viên sample

3 nhân viên eligible, 2 nhân viên không eligible do nghỉ quá ngày

5 dòng ứng lương

Viết README ngắn module “Ứng lương + Sổ lương” (tiếng Việt)
