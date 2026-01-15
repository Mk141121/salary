NÂNG CẤP MODULE PHÒNG BAN + CÂY PHÒNG BAN + TỔ/CA + LỊCH SỬ CHUYỂN PHÒNG BAN + PHÂN QUYỀN THEO PHÒNG BAN + SNAPSHOT MAPPING (PAYROLL OPTION B, 100% TIẾNG VIỆT)

## 1) VAI TRÒ
Bạn là **Senior Fullstack Engineer + Technical Lead + Business Analyst** chuyên triển khai Payroll/ERP Việt Nam.

Nhiệm vụ:
- Nâng cấp module **Phòng ban** từ dạng đơn giản → mô hình chuẩn doanh nghiệp:
  1) **Cây phòng ban** (cấp công ty → khối → phòng → tổ)
  2) **Tổ/Nhóm/Ca** thuộc phòng ban (đơn vị con)
  3) **Lịch sử nhân viên chuyển phòng ban / tổ / ca theo thời gian**
  4) **Phân quyền theo phòng ban** (RBAC theo phạm vi)
  5) Cập nhật **Snapshot kỳ lương** chụp đúng phòng ban/tổ/ca tại thời điểm snapshot

⚠️ BẮT BUỘC:
- 100% tiếng Việt: UI text, API message, biến, comment, tên bảng/model
- Thiết kế không hard-code theo Excel
- Không phá kiến trúc payroll Option B: Rule Engine + Snapshot + Workflow chốt/khoá + Import Excel
- Migration dữ liệu phải **an toàn + idempotent + có report**
- Snapshot phải **deterministic** (tái lập được)

---

## 2) LÝ DO NGHIỆP VỤ (BẮT BUỘC HIỂU ĐÚNG)
Hệ thống payroll theo Option B có:
- Import dữ liệu theo bộ phận (Chia hàng / Giao hàng)
- Rule engine áp dụng theo phòng ban/tổ/ca
- Snapshot kỳ lương chụp dữ liệu theo thời điểm

Nếu phòng ban chỉ có id/tên thì sẽ vướng:
- 1 phòng ban có nhiều tổ/ca
- nhân viên chuyển tổ/ca giữa tháng
- phân quyền import theo phòng ban
- báo cáo cost theo cấu trúc tổ chức

→ Vì vậy cần nâng cấp module phòng ban thành chuẩn ERP.

---

## 3) MỤC TIÊU
Sau khi triển khai:
- Có thể quản lý phòng ban theo **cây**
- Có thể quản lý **tổ/ca** dưới phòng ban
- Có thể gán nhân viên vào phòng ban/tổ/ca theo **lịch sử hiệu lực**
- Có thể phân quyền import/payroll theo **từng phòng ban**
- Snapshot kỳ lương lấy đúng phòng ban/tổ/ca theo thời điểm

---

## 4) MÔ HÌNH DỮ LIỆU (BẮT BUỘC)

### 4.1 Bảng phòng ban (hỗ trợ cây)
```sql
phong_ban (
  id,
  ma_phong_ban         varchar unique not null,
  ten_phong_ban        varchar not null,

  phong_ban_cha_id     bigint null,               -- self reference
  cap_do               int not null default 1,     -- level depth

  loai_phong_ban       varchar null,              -- VAN_HANH / KD / VP / ...
  trang_thai           varchar not null default 'HOAT_DONG',

  nguoi_quan_ly_id     bigint null,               -- nhan_vien_id hoặc user_id theo hệ thống
  mo_ta                text null,

  tao_luc              timestamp not null default now(),
  tao_boi              bigint null,
  cap_nhat_luc         timestamp null,
  cap_nhat_boi         bigint null
)
Ràng buộc:

không cho phép vòng lặp cây (cycle)

index: (phong_ban_cha_id, cap_do)

4.2 Đơn vị con (Tổ/Nhóm/Ca)
sql
Sao chép mã
don_vi_con (
  id,
  phong_ban_id         bigint not null,
  ma_don_vi            varchar not null,
  ten_don_vi           varchar not null,

  loai_don_vi          varchar not null,          -- TO / NHOM / CA
  trang_thai           varchar not null default 'HOAT_DONG',

  tao_luc              timestamp not null default now(),
  tao_boi              bigint null
)
Ràng buộc:

unique(phong_ban_id, ma_don_vi)

4.3 Lịch sử nhân viên thuộc phòng ban/tổ/ca theo thời gian (CỰC QUAN TRỌNG)
sql
Sao chép mã
nhan_vien_phong_ban (
  id,
  nhan_vien_id         bigint not null,
  phong_ban_id         bigint not null,
  don_vi_con_id        bigint null,               -- tổ/ca nếu có

  tu_ngay              date not null,
  den_ngay             date null,

  ghi_chu              text null,

  tao_luc              timestamp not null default now(),
  tao_boi              bigint null
)
Ràng buộc:

Không overlap theo nhan_vien_id (tại 1 thời điểm chỉ thuộc 1 phòng ban chính)

Validate:

tu_ngay <= den_ngay (nếu den_ngay có)

don_vi_con_id thuộc đúng phong_ban_id

Index:

(nhan_vien_id, tu_ngay, den_ngay)

(phong_ban_id, don_vi_con_id)

4.4 Phân quyền theo phòng ban (RBAC theo phạm vi)
sql
Sao chép mã
phan_quyen_phong_ban (
  id,
  nguoi_dung_id        bigint not null,
  phong_ban_id         bigint not null,
  quyen                varchar not null,          -- IMPORT / XEM / PAYROLL / QUAN_TRI
  tao_luc              timestamp not null default now(),
  tao_boi              bigint null
)
Ràng buộc:

unique(nguoi_dung_id, phong_ban_id, quyen)

4.5 Cấu hình import theo phòng ban (tuỳ chọn nhưng khuyến nghị)
sql
Sao chép mã
cau_hinh_import_phong_ban (
  id,
  phong_ban_id             bigint not null,
  loai_import              varchar not null,      -- CHIA_HANG / GIAO_HANG
  bat_buoc_don_vi_con       boolean not null default false,
  gioi_han_so_dong          int not null default 5000,
  trang_thai                varchar not null default 'HOAT_DONG',

  tao_luc                   timestamp not null default now()
)
Ràng buộc:

unique(phong_ban_id, loai_import)

5) THAY ĐỔI TRONG MODULE NHÂN VIÊN (TÍCH HỢP)
Trong bảng nhan_vien:

có thể giữ phong_ban_id như “tham chiếu nhanh”

nhưng logic nghiệp vụ snapshot phải ưu tiên nhan_vien_phong_ban

Khuyến nghị:

nhan_vien.phong_ban_id chỉ dùng hiển thị

Mọi tính toán payroll và snapshot phải dùng lịch sử nhan_vien_phong_ban

6) SNAPSHOT MAPPING (BẮT BUỘC)
Khi tạo snapshot kỳ lương tại ngày ngay_chot_snapshot:

Với mỗi nhân viên:

tìm bản ghi nhan_vien_phong_ban hiệu lực:

tu_ngay <= ngay_chot_snapshot

den_ngay is null OR den_ngay >= ngay_chot_snapshot

snapshot:

phong_ban_id

don_vi_con_id

các thuộc tính liên quan

Cập nhật schema snapshot:

snapshot_nhan_vien phải có:

phong_ban_id

don_vi_con_id (nullable)

ten_phong_ban, ten_don_vi_con (tùy)

7) WORKFLOW CHUYỂN PHÒNG BAN
7.1 Khi chuyển phòng ban/tổ/ca
tạo record mới trong nhan_vien_phong_ban

tự động set den_ngay record trước (nếu còn hiệu lực)

validate không overlap

7.2 Ảnh hưởng payroll
Nếu chuyển giữa tháng:

snapshot chụp theo ngày snapshot (ngày cuối tháng hoặc ngày tạo kỳ)

kỳ lương theo phòng ban nào sẽ phụ thuộc quy tắc doanh nghiệp:

Option 1: tính theo phòng ban tại ngày snapshot

Option 2: prorate theo số ngày thuộc từng phòng ban (PHASE 2, không làm trong v1)

Trong v1:
✅ áp dụng Option 1 để đơn giản.

8) PHÂN QUYỀN THEO PHÒNG BAN (RBAC)
8.1 Các quyền (enum)
IMPORT_DU_LIEU_PHONG_BAN

XEM_DU_LIEU_PHONG_BAN

CHAY_BANG_LUONG_PHONG_BAN

QUAN_TRI_PHONG_BAN

8.2 Quy tắc enforcement
User chỉ import dữ liệu cho phòng ban mà họ có quyền IMPORT

User chỉ xem dữ liệu/phòng ban mà có quyền XEM

HR/Kế toán chỉ chạy payroll cho phòng ban có quyền PAYROLL

9) API BẮT BUỘC
9.1 Phòng ban cây
GET /phong-ban/cay

POST /phong-ban

PUT /phong-ban/:id

PUT /phong-ban/:id/doi-phong-ban-cha

POST /phong-ban/:id/ngung-hoat-dong

POST /phong-ban/:id/kich-hoat

Validation:

không tạo vòng lặp cây

cap_do tính đúng

9.2 Đơn vị con (tổ/ca)
GET /phong-ban/:id/don-vi-con

POST /phong-ban/:id/don-vi-con

PUT /don-vi-con/:id

POST /don-vi-con/:id/ngung-hoat-dong

9.3 Lịch sử nhân viên thuộc phòng ban
GET /nhan-vien/:id/lich-su-phong-ban

POST /nhan-vien/:id/chuyen-phong-ban
Body:

json
Sao chép mã
{
  "phong_ban_id": 123,
  "don_vi_con_id": 456,
  "tu_ngay": "2026-01-01",
  "ghi_chu": "Chuyển sang tổ A"
}
9.4 Phân quyền theo phòng ban
GET /phan-quyen-phong-ban?nguoiDungId=

POST /phan-quyen-phong-ban

DELETE /phan-quyen-phong-ban/:id

9.5 Cấu hình import theo phòng ban (optional)
GET /cau-hinh-import-phong-ban?phongBanId=

POST /cau-hinh-import-phong-ban

PUT /cau-hinh-import-phong-ban/:id

10) UI/UX BẮT BUỘC
10.1 Trang phòng ban dạng cây
hiển thị tree view

thêm/sửa phòng ban

kéo thả đổi parent (optional)

hiển thị trưởng phòng

10.2 Trang tổ/ca của phòng ban
danh sách tổ/ca

tạo/sửa/ngưng

10.3 Trang lịch sử phòng ban của nhân viên
timeline/ bảng lịch sử

chuyển phòng ban/tổ/ca

validate overlap

10.4 Trang phân quyền phòng ban
chọn user

chọn phòng ban

gán quyền theo checkbox

11) MIGRATION DỮ LIỆU (BẮT BUỘC)
Mục tiêu migration:

Tất cả nhân viên phải có 1 record trong nhan_vien_phong_ban

Nếu hiện tại nhan_vien.phong_ban_id đang tồn tại:

tạo record:

nhan_vien_id = ...

phong_ban_id = nhan_vien.phong_ban_id

tu_ngay = ngay_vao_lam hoặc fallback date

den_ngay = null

Script migration:

idempotent

có dry-run

export report

12) RÀNG BUỘC TÍCH HỢP VỚI IMPORT EXCEL (CHIA HÀNG / GIAO HÀNG)
Khi import dữ liệu:

bắt buộc xác định phòng ban:

file import thuộc phòng ban nào (CHIA_HANG / GIAO_HANG)

hoặc người import chọn phòng ban trước

validate MA_NV:

nhân viên phải thuộc phòng ban tương ứng tại ngày import (optional strict mode)

enforce quyền:

user chỉ import được phòng ban được cấp quyền

13) TEST CASE BẮT BUỘC
Cây phòng ban
tạo phòng ban con đúng

đổi parent không tạo cycle

Đơn vị con
tạo tổ/ca unique theo phòng ban

Lịch sử nhân viên
chuyển phòng ban tạo record mới, record cũ auto set den_ngay

overlap history → reject

Phân quyền
không có quyền import → 403

có quyền import → ok

Snapshot mapping
snapshot tháng lấy đúng phong ban/don_vi_con theo hiệu lực ngày snapshot

đổi phòng ban sau snapshot → kỳ lương cũ không đổi

14) OUTPUT (CLAUDE PHẢI TẠO)
Backend
Prisma migrations:

phong_ban (cập nhật thêm parent/level)

don_vi_con

nhan_vien_phong_ban

phan_quyen_phong_ban

cau_hinh_import_phong_ban (optional)

Services:

PhongBanService (tree + validation cycle)

DonViConService

LichSuPhongBanService

PhanQuyenPhongBanService

SnapshotMappingService (update snapshot_nhan_vien)

RBAC guards:

check quyền theo phòng ban

Migration scripts
scripts/migrate-lich-su-phong-ban.ts

--dry-run

--apply

export report

Frontend
Tree view phòng ban

CRUD tổ/ca

Timeline lịch sử phòng ban nhân viên

Quản lý phân quyền theo phòng ban

Docs
docs/phong-ban-tree.md

docs/phan-quyen-phong-ban.md

docs/snapshot-phong-ban.md

docs/migration-phong-ban.md

GHI CHÚ CUỐI
Đây là bước nâng cấp bắt buộc để payroll theo bộ phận chạy chuẩn

Snapshot phải chụp đúng phòng ban/tổ/ca theo thời gian

Phân quyền theo phòng ban là nền tảng vận hành an toàn

BẮT ĐẦU IMPLEMENT THEO KIẾN TRÚC NÀY.