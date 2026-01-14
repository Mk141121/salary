# PRD — MODULE NHẬP LIỆU & TÍNH LƯƠNG THEO SẢN LƯỢNG: CHIA HÀNG & GIAO HÀNG (IMPORT EXCEL HÀNG NGÀY, KHÔNG DUYỆT)

**Phiên bản:** v1.0  
**Người soạn:** (Bạn điền)  
**Ngày:** (Bạn điền)  
**Phạm vi:** Hệ thống Payroll Option B (No-Excel)

---

## 1. Mục tiêu sản phẩm
Xây dựng module dành cho 2 bộ phận **CHIA HÀNG** và **GIAO HÀNG** cho phép:
- Ghi nhận sản lượng hằng ngày bằng **upload file Excel theo template**
- **Không cần duyệt** dữ liệu
- Hệ thống tự tổng hợp theo tháng (snapshot), chạy Rule Engine tính lương, và tạo trace giải trình
- **Chỉ Admin** được phép chỉnh sửa số liệu sau khi import (bắt buộc lý do + audit)

Mục tiêu cuối:
- Vận hành nhanh — 1 file/ngày
- Chính xác — validate mạnh
- Truy vết được — audit/trace đầy đủ
- Không làm lệch kiến trúc Payroll Option B

---

## 2. Bối cảnh & vấn đề cần giải quyết
### 2.1 Hiện trạng
- Dữ liệu sản lượng và giao hàng được ghi nhận thủ công (Excel) → khó tổng hợp, sai số, thiếu truy vết
- Lương cần tính theo **sản lượng SP** (Chia hàng) và **khối lượng giao thành công** (Giao hàng), kèm phạt

### 2.2 Vấn đề
- Nhập dữ liệu thủ công → sai
- Không có lịch sử import → không biết ai upload, upload sai ở đâu
- Khi sai số sau kỳ lương → khó giải thích

### 2.3 Giải pháp
- Nhập liệu bằng template Excel bắt buộc
- Import có preview + validate theo dòng/cột
- Upsert dữ liệu theo ngày
- Khoá dữ liệu sau import, chỉ Admin sửa có lý do
- Snapshot theo kỳ lương giúp không bị thay đổi theo thời gian

---

## 3. Scope (Phạm vi)
### 3.1 In-scope
- Template Excel + download template
- Upload + preview + validate
- Confirm import → ghi DB
- Upsert theo (ngày, nhân viên)
- Lịch sử import
- Khoá sửa sau import, Admin sửa có audit
- Snapshot tháng theo kỳ lương
- Rule tính lương cho 2 bộ phận + trace

### 3.2 Out-of-scope (v1)
- OCR, scan giấy
- Đồng bộ máy chấm công
- KPI/CRM integration
- Tự động phát hiện bất thường bằng AI

---

## 4. Định nghĩa nghiệp vụ & công thức tính lương
### 4.1 Bộ phận CHIA HÀNG
**Lương tháng =**  
**Lương cơ bản + Chuyên cần + Tiền sản lượng**

Trong đó:
- Đơn giá: **320đ/SP**
- Quy đổi sản lượng:
  - `Quy đổi SP = SP đạt - (SP lỗi * 5)`
- Tiền sản lượng:
  - `Tiền sản lượng = Quy đổi SP * 320`
- Cho phép âm:
  - Quy đổi SP có thể âm → tiền sản lượng âm hợp lệ

### 4.2 Bộ phận GIAO HÀNG
**Lương tháng =**  
**Lương cơ bản + Chuyên cần + Lương theo khối lượng - Phạt trễ giờ - Phạt không lấy phiếu**

Trong đó:
- Lương theo khối lượng:
  - `Khối lượng giao thành công * đơn giá`
- Phạt:
  - `phạt trễ giờ = số lần trễ * đơn giá phạt trễ`
  - `phạt không lấy phiếu = số lần vi phạm * đơn giá phạt phiếu`

⚠️ Đơn giá khối lượng & đơn giá phạt phải cấu hình trong **Rule Engine / Quy chế**, không hard-code.

---

## 5. Personas & phân quyền
### 5.1 Vai trò
1) **Người nhập dữ liệu Chia hàng** (Role: IMPORT_CHIA_HANG)
2) **Người nhập dữ liệu Giao hàng** (Role: IMPORT_GIAO_HANG)
3) **HR/Kế toán** (Role: PAYROLL_OPERATOR)
4) **Admin** (Role: ADMIN)

### 5.2 Quyền hạn
- Người nhập dữ liệu:
  - upload template
  - preview, confirm import
  - xem dữ liệu import
  - **không được sửa dữ liệu sau import**
- HR/Kế toán:
  - xem dữ liệu import
  - chạy snapshot kỳ lương
  - chạy rule engine
- Admin:
  - sửa dữ liệu sau import
  - mở khoá kỳ lương (nếu hệ thống hỗ trợ)

---

## 6. Luồng nghiệp vụ (Workflow)
### 6.1 Luồng hằng ngày
1) Người phụ trách tải template Excel
2) Điền dữ liệu đúng cột
3) Upload → Preview
4) Fix lỗi (nếu có) → Upload lại
5) Confirm Import
6) Dữ liệu ghi vào DB, khoá sửa

### 6.2 Luồng kỳ lương (tháng)
1) Tạo kỳ lương tháng (BangLuong trạng thái NHAP)
2) Tạo snapshot (chụp dữ liệu nhân viên + rule + tổng dữ liệu import trong tháng)
3) Chạy Rule Engine để sinh dòng lương
4) Chốt (DA_CHOT) → Khoá (KHOA)
5) Nếu phát sinh sai sau khoá:
   - Admin sửa dữ liệu import (bắt buộc lý do) **hoặc**
   - tạo phiếu điều chỉnh (ở module adjustment)

### 6.3 Ràng buộc workflow
- Nếu kỳ lương tháng đã **DA_CHOT hoặc KHOA**:
  - **cấm import** dữ liệu trong tháng đó
  - chỉ admin được mở khoá (nếu hệ thống hỗ trợ)

---

## 7. Yêu cầu Template Excel
### 7.1 Template CHIA HÀNG
- File: `.xlsx`
- Sheet name: `CHIA_HANG`
- Cột bắt buộc:
  - `NGAY` (YYYY-MM-DD)
  - `MA_NV`
  - `SO_LUONG_SP_DAT`
  - `SO_LUONG_SP_LOI`
- Cột optional:
  - `HO_TEN`
  - `GHI_CHU`

Ràng buộc:
- số lượng >= 0
- SP lỗi có thể > SP đạt

### 7.2 Template GIAO HÀNG
- Sheet: `GIAO_HANG`
- Cột bắt buộc:
  - `NGAY`
  - `MA_NV`
  - `KHOI_LUONG_THANH_CONG`
  - `SO_LAN_TRE_GIO`
  - `SO_LAN_KHONG_LAY_PHIEU`
- Optional:
  - `HO_TEN`
  - `GHI_CHU`

Ràng buộc:
- số >= 0

---

## 8. Import Excel — yêu cầu hệ thống
### 8.1 Bảo mật & validate file
- Validate:
  - mimetype / extension
  - magic bytes (xlsx zip header)
  - size <= 10MB
  - số dòng <= 5.000
  - đúng sheet name
- Lỗi trả về dạng:
  - dòng, cột, message tiếng Việt

### 8.2 2 bước import
**Bước 1: Preview**
- parse file
- validate schema + validate data
- trả về danh sách:
  - dòng hợp lệ
  - dòng lỗi

**Bước 2: Confirm**
- ghi DB trong transaction
- upsert theo unique (ngày, nhân viên)
- lưu lịch sử import

### 8.3 Idempotent
- Import lại ngày X:
  - overwrite theo MA_NV
  - không tạo trùng
- Không được xóa dữ liệu tháng

---

## 9. Chỉnh sửa sau import
### 9.1 Quy tắc
- Người thường không được sửa bản ghi sau import
- Chỉ Admin có thể sửa
- Admin bắt buộc nhập **lý do**
- Hệ thống lưu audit:
  - trước/sau

---

## 10. Snapshot & tính lương
### 10.1 Snapshot dữ liệu import theo tháng
Khi tạo snapshot kỳ lương:
- Chia hàng: SUM SP đạt, SUM SP lỗi theo nhân viên
- Giao hàng:
  - SUM khối lượng giao thành công
  - SUM số lần trễ
  - SUM số lần không lấy phiếu

### 10.2 Rule Engine input variables
Chia hàng:
- `TONG_SP_DAT`, `TONG_SP_LOI`

Giao hàng:
- `TONG_KHOI_LUONG_THANH_CONG`
- `TONG_SO_LAN_TRE_GIO`
- `TONG_SO_LAN_KHONG_LAY_PHIEU`

Đơn giá:
- cấu hình trong quy chế/rule (không hard-code)

### 10.3 Trace giải trình
Trace hiển thị:
- tổng số liệu input
- công thức áp dụng
- output tiền

---

## 11. Giao diện (UI/UX)
### 11.1 Màn Import Chia hàng
- Download template
- Upload file
- Preview bảng hợp lệ + bảng lỗi
- Confirm import
- Thông báo kết quả

### 11.2 Màn Import Giao hàng
- Download template
- Upload file
- Preview bảng hợp lệ + bảng lỗi
- Confirm import
- Thông báo kết quả

### 11.3 Màn lịch sử import
- Filter theo ngày, loại import
- Hiển thị:
  - ai import
  - file
  - số dòng
  - số lỗi
  - trạng thái

### 11.4 Màn xem dữ liệu import
- Filter theo ngày, nhân viên
- Không có nút sửa (trừ admin)

### 11.5 Admin sửa dữ liệu
- Nút “Sửa” chỉ hiện cho Admin
- Bắt nhập lý do
- Hiển thị diff trước/sau

---

## 12. Dữ liệu & bảng cần tạo (Data Model)
### 12.1 Lịch sử import
```sql
lich_su_import (
  id,
  loai_import,         -- CHIA_HANG / GIAO_HANG
  ngay_du_lieu,
  ten_file,
  file_hash,
  so_dong,
  so_dong_hop_le,
  so_dong_loi,
  trang_thai,          -- THANH_CONG / THAT_BAI
  nguoi_import,
  import_luc,
  noi_dung_loi_json
)
12.2 Chia hàng
san_luong_chia_hang (
  id,
  ngay,
  nhan_vien_id,
  so_luong_sp_dat,
  so_luong_sp_loi,
  ghi_chu,
  nguon_du_lieu,       -- IMPORT_EXCEL / ADMIN_SUA
  import_id,
  khoa_sua,
  tao_boi,
  tao_luc,
  cap_nhat_boi,
  cap_nhat_luc
)


Unique: (ngay, nhan_vien_id)

12.3 Giao hàng
giao_hang (
  id,
  ngay,
  nhan_vien_id,
  khoi_luong_thanh_cong,
  so_lan_tre_gio,
  so_lan_khong_lay_phieu,
  ghi_chu,
  nguon_du_lieu,       -- IMPORT_EXCEL / ADMIN_SUA
  import_id,
  khoa_sua,
  tao_boi,
  tao_luc,
  cap_nhat_boi,
  cap_nhat_luc
)


Unique: (ngay, nhan_vien_id)

12.4 Audit sửa dữ liệu
audit_sua_du_lieu (
  id,
  loai_du_lieu,        -- CHIA_HANG / GIAO_HANG
  ban_ghi_id,
  du_lieu_truoc_json,
  du_lieu_sau_json,
  ly_do,
  sua_boi,
  sua_luc
)

12.5 Snapshot tháng
snapshot_san_luong_chia_hang (
  id,
  snapshot_id,
  nhan_vien_id,
  tong_sp_dat,
  tong_sp_loi
)

snapshot_giao_hang (
  id,
  snapshot_id,
  nhan_vien_id,
  tong_khoi_luong_thanh_cong,
  tong_so_lan_tre_gio,
  tong_so_lan_khong_lay_phieu
)

13. API yêu cầu (tối thiểu)
13.1 Import

POST /import/chia-hang/preview

POST /import/chia-hang/confirm

POST /import/giao-hang/preview

POST /import/giao-hang/confirm

13.2 Dữ liệu import

GET /san-luong-chia-hang?tuNgay=&denNgay=&nhanVienId=

GET /giao-hang?tuNgay=&denNgay=&nhanVienId=

13.3 Admin sửa

PUT /admin/san-luong-chia-hang/:id

PUT /admin/giao-hang/:id
Body:

{
  "du_lieu_moi": { ... },
  "ly_do": "..."
}

13.4 Lịch sử import

GET /lich-su-import?loaiImport=&tuNgay=&denNgay=

GET /lich-su-import/:id

13.5 Snapshot + payroll

POST /bang-luong/:id/snapshot-du-lieu-phat-sinh

POST /bang-luong/:id/chay-rule-engine

GET /bang-luong/:id/rule-trace?nhanVienId=

14. Yêu cầu phi chức năng

Import phải chạy ổn với 1.000–5.000 dòng/ngày

Không timeout

Transaction đảm bảo data consistency

Lưu log lỗi rõ ràng

UI dễ dùng, lỗi hiển thị theo dòng/cột

15. Tiêu chí nghiệm thu (Acceptance Criteria)
Import

Upload file đúng template → preview OK → confirm → dữ liệu upsert

Upload sai sheet/cột → báo lỗi đúng

MA_NV sai → lỗi theo dòng

Import lại cùng ngày → ghi đè, không trùng

Quyền sửa

User thường sửa → 403

Admin sửa → bắt buộc lý do + audit

Snapshot & lương

Snapshot tháng tổng hợp đúng

Chia hàng cho phép tiền âm khi lỗi nhiều

Trace hiển thị đúng input/công thức/output

16. Rủi ro & lưu ý

Không duyệt → rủi ro upload nhầm cao
Giảm rủi ro bằng:

preview bắt buộc + validate mạnh

lịch sử import rõ ràng

admin sửa có audit

17. Deliverables (Claude phải tạo)

Migrations DB (tất cả bảng trên)

Backend:

import preview/confirm

upsert logic

RBAC + audit

Frontend:

trang import + preview + confirm

lịch sử import

admin edit + reason

Docs:

template excel

quy tắc validate

RBAC permission list

18. Ghi chú cuối

PRD này phải được triển khai đúng theo kiến trúc Payroll Option B:

dữ liệu import → snapshot kỳ → rule engine → bảng lương → trace giải trình

không sửa kỳ khoá, chỉ điều chỉnh theo phiếu (nếu cần)