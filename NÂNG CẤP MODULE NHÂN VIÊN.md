# 👤 PROMPT: NÂNG CẤP MODULE NHÂN VIÊN + MIGRATION DỮ LIỆU + SNAPSHOT MAPPING (PAYROLL OPTION B, 100% TIẾNG VIỆT)

## 1) VAI TRÒ
Bạn là **Senior Fullstack Engineer + Technical Lead + Business Analyst** chuyên triển khai Payroll Việt Nam.

Nhiệm vụ:
- Nâng cấp module **Nhân viên** từ dạng đơn giản → **mô hình chuẩn vận hành Payroll**
- Thêm các bảng vệ tinh cần thiết (hợp đồng/lương, ngân hàng, nhóm/tag, thuế/BHXH placeholder)
- Xây dựng **migration dữ liệu** an toàn từ bảng hiện tại sang mô hình mới
- Cập nhật logic **Snapshot kỳ lương** để chụp đúng dữ liệu nhân sự theo thời gian
- Đảm bảo **không phá vỡ** các module đang có (Rule Engine, Quy chế, Import Excel, Kỳ lương, Adjustment)

⚠️ BẮT BUỘC:
- 100% tiếng Việt: UI text, API message, biến, comment, tên bảng/model
- Không sửa dữ liệu trực tiếp trên prod theo kiểu thủ công
- Migration phải có backup/rollback plan
- Snapshot phải chạy ổn định và tái lập được (deterministic)
- Không hard-code Excel

---

## 2) MỤC TIÊU NGHIỆP VỤ
Vì payroll có snapshot & workflow chốt/khoá:
- Mọi thay đổi lương/hợp đồng/phụ cấp theo thời gian không được làm sai bảng lương kỳ cũ
- Do đó cần:
  - Lưu lịch sử hợp đồng/lương theo hiệu lực ngày
  - Snapshot khi tạo kỳ lương phải lấy đúng “bản ghi hiệu lực” tại thời điểm đó

---

## 3) HIỆN TRẠNG & GIẢ ĐỊNH
Hiện hệ thống đang có bảng `nhan_vien` đơn giản (ví dụ):
- ma_nv
- ho_ten
- phong_ban_id
- luong_co_ban
- trang_thai

Bạn phải:
- Tách `luong_co_ban` ra khỏi bảng master `nhan_vien`
- Đưa vào `nhan_vien_hop_dong` để quản lý lịch sử lương

---

## 4) MÔ HÌNH DỮ LIỆU MỚI (BẮT BUỘC)

### 4.1 Bảng master Nhân viên (ít thay đổi)
```sql
nhan_vien (
  id,
  ma_nv                varchar unique not null,
  ho_ten               varchar not null,
  gioi_tinh            varchar null,         -- NAM/NU/KHAC
  ngay_sinh            date null,
  so_dien_thoai        varchar null,
  email                varchar null,
  dia_chi              text null,

  phong_ban_id         bigint not null,
  chuc_danh_id         bigint null,
  trang_thai           varchar not null,     -- DANG_LAM / TAM_NGHI / NGHI_VIEC

  ngay_vao_lam         date null,
  ngay_nghi_viec       date null,

  tao_luc              timestamp not null default now(),
  tao_boi              bigint null,
  cap_nhat_luc         timestamp null,
  cap_nhat_boi         bigint null
)
4.2 Bảng hợp đồng/lương theo thời gian (CỰC QUAN TRỌNG)
sql
Sao chép mã
nhan_vien_hop_dong (
  id,
  nhan_vien_id         bigint not null,

  loai_hop_dong        varchar not null,     -- THU_VIEC/1_NAM/3_NAM/VO_THOI_HAN
  tu_ngay              date not null,
  den_ngay             date null,

  luong_co_ban         bigint not null,
  luong_dong_bh        bigint null,
  he_so_luong          numeric null,

  trang_thai           varchar not null default 'HIEU_LUC', -- HIEU_LUC/HET_HAN
  ghi_chu              text null,

  tao_luc              timestamp not null default now(),
  tao_boi              bigint null
)
Ràng buộc:

Không cho phép overlap hợp đồng theo cùng nhan_vien_id (theo thời gian)

Index: (nhan_vien_id, tu_ngay, den_ngay)

4.3 Ngân hàng (để xuất chuyển khoản)
sql
Sao chép mã
nhan_vien_ngan_hang (
  id,
  nhan_vien_id         bigint not null,
  ten_ngan_hang        varchar not null,
  so_tai_khoan         varchar not null,
  chu_tai_khoan        varchar not null,
  chi_nhanh            varchar null,
  la_mac_dinh          boolean not null default true,
  tu_ngay              date null,
  den_ngay             date null,

  tao_luc              timestamp not null default now()
)
Ràng buộc:

1 nhân viên chỉ có 1 ngân hàng mặc định tại 1 thời điểm

Index: (nhan_vien_id, la_mac_dinh)

4.4 Thuế/BHXH placeholder (để mở rộng)
sql
Sao chép mã
nhan_vien_thue_bh (
  id,
  nhan_vien_id         bigint not null,
  mst_ca_nhan          varchar null,
  so_cmnd_cccd         varchar null,
  ngay_cap             date null,
  noi_cap              varchar null,
  so_nguoi_phu_thuoc   int not null default 0,
  ghi_chu              text null
)
4.5 Nhóm/Tag nhân viên (rule điều kiện theo nhóm)
sql
Sao chép mã
nhom_nhan_vien (
  id,
  ma_nhom              varchar unique not null,
  ten_nhom             varchar not null
)

nhan_vien_thuoc_nhom (
  id,
  nhan_vien_id         bigint not null,
  nhom_id              bigint not null,
  tu_ngay              date null,
  den_ngay             date null
)
Ràng buộc:

Không overlap membership theo cùng nhan_vien + nhom

5) CẬP NHẬT / CHUẨN HOÁ BẢNG CŨ (NẾU CÓ)
Nếu nhan_vien hiện tại đang có cột luong_co_ban:

Không xoá ngay lập tức

Đổi thành:

luong_co_ban_cu (nullable) hoặc giữ lại 1 thời gian để migration

Sau khi migration ok → deprecate

6) MIGRATION DỮ LIỆU (BẮT BUỘC AN TOÀN)
6.1 Mục tiêu migration
Tất cả nhân viên hiện tại phải có ít nhất 1 bản ghi nhan_vien_hop_dong

Lương cơ bản hiện tại chuyển sang hợp đồng có hiệu lực từ ngày:

nếu có ngay_vao_lam → dùng ngày đó

nếu null → dùng ngày mặc định (vd: 2000-01-01) và ghi chú

6.2 Các bước migration (không làm liều)
Tạo tables mới + constraints + indexes

Viết script migration:

duyệt tất cả nhan_vien

tạo nhan_vien_hop_dong nếu chưa có

set tu_ngay hợp lý

Ghi log migration:

bao nhiêu nhân viên migrated

bao nhiêu record thiếu dữ liệu

Không xoá dữ liệu cũ ngay

Update code đọc lương cơ bản từ nhan_vien_hop_dong

6.3 Script migration yêu cầu
idempotent: chạy 2 lần không tạo duplicate

có dry-run mode

có report kết quả ra file md/csv

7) SNAPSHOT MAPPING (CỰC QUAN TRỌNG)
Khi tạo snapshot kỳ lương, hệ thống phải chụp:

7.1 Snapshot nhân viên
Bắt buộc có:

nhan_vien_id

ma_nv

ho_ten

phong_ban_id

trang_thai_nv

vai_tro/cap_trach_nhiem/he_so_trach_nhiem (từ bảng trách nhiệm hiệu lực)

luong_co_ban (lấy từ hợp đồng hiệu lực)

Khuyến nghị:

ngân hàng mặc định (để export chuyển khoản)

7.2 Quy tắc chọn “bản ghi hiệu lực”
Tại ngày ngay_chot_snapshot (ví dụ: ngày cuối tháng hoặc ngày tạo kỳ):

Hợp đồng hiệu lực:

tu_ngay <= ngay_chot_snapshot

den_ngay null OR den_ngay >= ngay_chot_snapshot

Nhân viên thuộc nhóm:

tương tự theo tu/den

Trách nhiệm:

tương tự theo tu/den

Phụ cấp nhân viên:

tương tự theo tu/den

7.3 Bảng snapshot liên quan
Các bảng snapshot đã có:

snapshot_ky_luong

snapshot_nhan_vien

snapshot_phu_cap

snapshot_rule

Cập nhật thêm vào snapshot_nhan_vien:

ma_nv

luong_co_ban

thong_tin_ngan_hang_mac_dinh (tối thiểu: so_tai_khoan masked, ten_ngan_hang)

tag/nhóm (tuỳ)

8) CẬP NHẬT BACKEND MODULE NHÂN VIÊN
8.1 API mới cho Nhân viên
GET /nhan-vien

POST /nhan-vien

PUT /nhan-vien/:id

GET /nhan-vien/:id

8.2 API cho Hợp đồng/Lương
GET /nhan-vien/:id/hop-dong

POST /nhan-vien/:id/hop-dong

PUT /nhan-vien/hop-dong/:hopDongId

POST /nhan-vien/hop-dong/:hopDongId/ngung (optional)

Bắt buộc validate:

không overlap thời gian hợp đồng

lương >= 0

8.3 API Ngân hàng
GET /nhan-vien/:id/ngan-hang

POST /nhan-vien/:id/ngan-hang

PUT /nhan-vien/ngan-hang/:id

POST /nhan-vien/ngan-hang/:id/dat-mac-dinh

8.4 API Nhóm nhân viên
GET /nhom-nhan-vien

POST /nhom-nhan-vien

PUT /nhom-nhan-vien/:id

POST /nhan-vien/:id/them-vao-nhom

POST /nhan-vien/:id/go-khoi-nhom

9) CẬP NHẬT FRONTEND (UI/UX)
9.1 Trang Nhân viên
Danh sách nhân viên: ma_nv, họ tên, phòng ban, trạng thái

CRUD nhân viên

9.2 Tab “Hợp đồng/Lương”
Hiển thị lịch sử hợp đồng theo timeline

Nút tạo hợp đồng mới

Validate overlap

Warning nếu chưa có hợp đồng hiệu lực

9.3 Tab “Phụ cấp cố định”
mapping với phu_cap_nhan_vien

9.4 Tab “Trách nhiệm/Vai trò”
mapping với nhan_vien_trach_nhiem

9.5 Tab “Ngân hàng”
CRUD ngân hàng

đặt mặc định

9.6 Tab “Nhóm/Tag”
thêm/bớt nhóm

10) TÍCH HỢP VỚI PAYROLL (KHÔNG ĐƯỢC LỆCH)
10.1 Rule engine
Khi lấy LUONG_CO_BAN:

lấy từ snapshot_nhan_vien.luong_co_ban

Không bao giờ đọc nhan_vien.luong_co_ban trực tiếp nữa

10.2 Snapshot
SnapshotService phải gọi:

HopDongService để lấy hợp đồng hiệu lực

NganHangService lấy mặc định

NhomService (optional)

TrachNhiemService

PhuCapService

10.3 Chốt/Khoá
Dữ liệu nhân viên thay đổi sau khi kỳ lương đã snapshot
→ không ảnh hưởng kỳ cũ

11) TEST CASE BẮT BUỘC
Migration
nhân viên có luong_co_ban → tạo hợp đồng đúng

chạy script migration 2 lần không duplicate

report migration đầy đủ

Hợp đồng
tạo hợp đồng overlap → reject

hợp đồng hiệu lực đúng theo ngày snapshot

Snapshot
thay đổi hợp đồng sau snapshot → kỳ lương cũ không đổi

thay đổi ngân hàng sau snapshot → kỳ lương cũ không đổi

12) OUTPUT (CLAUDE PHẢI TẠO)
Backend
Prisma migrations cho:

nhan_vien_hop_dong

nhan_vien_ngan_hang

nhan_vien_thue_bh

nhom_nhan_vien

nhan_vien_thuoc_nhom

Controllers + DTO validate

Services:

NhanVienService

HopDongService

NganHangService

NhomNhanVienService

MigrationService

SnapshotMappingService (update snapshot)

Script migration
scripts/migrate-hop-dong.ts

hỗ trợ:

--dry-run

--apply

export report

Frontend
Trang nhân viên + tabs

UI hợp đồng dạng timeline

Validate overlap

Docs
docs/nhan-vien-model.md

docs/migration-guide.md

docs/snapshot-mapping.md

GHI CHÚ CUỐI
Đây là bước nâng cấp “xương sống” giúp payroll vận hành thật

Snapshot phải lấy đúng bản ghi hiệu lực theo thời gian

Migration phải an toàn, có report, idempotent

BẮT ĐẦU IMPLEMENT THEO KIẾN TRÚC NÀY.