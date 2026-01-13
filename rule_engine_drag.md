# 🧠🎛️ PROMPT TỔNG HỢP: RULE ENGINE TRÁCH NHIỆM + THƯỞNG/PHẠT & UI CẤU HÌNH RULE KÉO-THẢ + VALIDATE JSON (100% TIẾNG VIỆT)

## 1) VAI TRÒ & MỤC TIÊU
Bạn là **Senior Fullstack Engineer + Business Analyst** chuyên hệ thống lương tại Việt Nam.

Nhiệm vụ:
- Thiết kế & code **RULE ENGINE** để tự động tính:
  - **TIỀN TRÁCH NHIỆM**
  - **THƯỞNG**
  - **PHẠT**
- Theo **QUY CHẾ LƯƠNG** của từng **PHÒNG BAN**
- Rule có **version theo thời gian**
- Có **trace giải trình** (audit/giải thích được)
- Sinh kết quả vào **BẢNG LƯƠNG THÁNG (snapshot)**

Đồng thời xây dựng UI để HR/Kế toán (không rành kỹ thuật) có thể:
- Tạo/Sửa quy chế
- Tạo/Sửa rule bằng **form trực quan**
- **Kéo-thả** sắp xếp ưu tiên rule
- Hệ thống tự sinh JSON rule
- **Validate JSON** realtime (client + server)
- **Preview/Chạy thử** rule trước khi áp dụng

⚠️ BẮT BUỘC:
- Không hard-code theo phòng ban
- Không hard-code theo cột Excel
- Không bắt HR nhập JSON “thuần”
- Có Advanced mode cho kỹ thuật (Monaco JSON Editor)
- 100% tiếng Việt: tên bảng, biến, comment, UI text, API message
- Đây là hệ thống thật, không demo

---

## 2) TỔNG QUAN KIẾN TRÚC
### 2.1. 3 lớp dữ liệu
1) **Danh mục khoản lương**: định nghĩa các loại khoản tiền (TRÁCH_NHIỆM, THƯỞNG, PHẠT…)
2) **Quy chế & rule**: cấu hình theo phòng ban, version theo thời gian
3) **Bảng lương tháng snapshot**: chỉ lưu kết quả, không lưu logic

### 2.2. Pipeline Rule Engine
1) Load quy chế đúng tháng
2) Load dữ liệu nền (lương cơ bản, cấp trách nhiệm, sự kiện thưởng/phạt)
3) Apply rule theo thứ tự ưu tiên
4) Ghi `chi_tiet_bang_luong`
5) Ghi `rule_trace` giải trình

---

## 3) MÔ HÌNH DỮ LIỆU (BẮT BUỘC)

### 3.1. Danh mục khoản lương
```sql
khoan_luong (
  id,
  ma_khoan,
  ten_khoan,
  loai,          -- THU_NHAP / KHAU_TRU
  chiu_thue,
  thu_tu_hien_thi
)
Tối thiểu:

TRACH_NHIEM

THUONG

PHAT

Khuyến nghị tạo rõ:

THUONG_KPI

THUONG_CHUYEN_CAN

PHAT_DI_TRE

PHAT_SAI_QUY_TRINH
(vẫn là khoan_luong để hiển thị minh bạch trên phiếu lương)

3.2. Quy chế lương theo phòng ban
sql
Sao chép mã
quy_che_luong (
  id,
  phong_ban_id,
  ten_quy_che,
  tu_ngay,
  den_ngay,
  phien_ban,
  trang_thai -- HIEU_LUC / NGUNG
)
3.3. Rule cấu hình (CORE)
sql
Sao chép mã
quy_che_rule (
  id,
  quy_che_luong_id,
  khoan_luong_id,
  loai_rule,           -- CO_DINH / THEO_HE_SO / BAC_THANG / THEO_SU_KIEN / CONG_THUC
  dieu_kien_json,      -- JSON điều kiện áp dụng
  cong_thuc_json,      -- JSON mô tả cách tính
  thu_tu_uu_tien,
  che_do_gop,          -- CONG_DON / GHI_DE
  cho_phep_chinh_tay   -- true/false
)
3.4. Dữ liệu nền trách nhiệm (theo NV)
sql
Sao chép mã
nhan_vien_trach_nhiem (
  id,
  nhan_vien_id,
  phong_ban_id,
  cap_trach_nhiem,     -- 1/2/3 hoặc A/B/C
  he_so_trach_nhiem,   -- số thực
  vai_tro,             -- TO_TRUONG, QUAN_LY...
  tu_ngay,
  den_ngay
)
3.5. Sự kiện thưởng/phạt phát sinh
sql
Sao chép mã
su_kien_thuong_phat (
  id,
  nhan_vien_id,
  phong_ban_id,
  ngay,
  loai_su_kien,        -- THUONG / PHAT
  ma_su_kien,          -- DI_TRE, SAI_QT...
  gia_tri,             -- số lần/điểm/số tiền
  ghi_chu,
  trang_thai,          -- NHAP / DA_DUYET
  duyet_boi,
  duyet_luc
)
3.6. Bảng lương tháng (snapshot)
sql
Sao chép mã
bang_luong (
  id,
  thang,
  nam,
  phong_ban_id,
  quy_che_luong_id,
  trang_thai -- NHAP / DA_CHOT / KHOA
)
sql
Sao chép mã
chi_tiet_bang_luong (
  id,
  bang_luong_id,
  nhan_vien_id,
  khoan_luong_id,
  so_tien,
  nguon,              -- RULE / PHAT_SINH / DIEU_CHINH
  tham_chieu_id,      -- id quy_che_rule hoặc su_kien_thuong_phat
  ghi_chu
)
3.7. Trace giải trình (BẮT BUỘC)
sql
Sao chép mã
rule_trace (
  id,
  bang_luong_id,
  nhan_vien_id,
  quy_che_rule_id,
  khoan_luong_id,
  input_json,
  output_so_tien,
  message_giai_thich,
  tao_luc
)
4) CHUẨN JSON RULE (BẮT BUỘC)
4.1. dieu_kien_json (điều kiện)
Ví dụ:

json
Sao chép mã
{
  "ap_dung_cho": {
    "vai_tro": ["TO_TRUONG", "QUAN_LY"],
    "cap_trach_nhiem": [2, 3]
  }
}
4.2. cong_thuc_json (cách tính)
A) CO_DINH
json
Sao chép mã
{ "so_tien": 1000000 }
B) THEO_HE_SO
json
Sao chép mã
{
  "base": "LUONG_CO_BAN",
  "he_so": 0.2,
  "cong_them": 200000
}
C) BAC_THANG
json
Sao chép mã
{
  "field": "cap_trach_nhiem",
  "bac": [
    { "from": 1, "to": 1, "so_tien": 500000 },
    { "from": 2, "to": 2, "so_tien": 1000000 },
    { "from": 3, "to": 99, "so_tien": 1500000 }
  ]
}
D) THEO_SU_KIEN
json
Sao chép mã
{
  "ma_su_kien": "DI_TRE",
  "cach_tinh": "BAC_THANG",
  "bac": [
    { "from": 1, "to": 2, "so_tien_moi_lan": 50000 },
    { "from": 3, "to": 999, "so_tien_moi_lan": 100000 }
  ]
}
E) CONG_THUC (expression)
json
Sao chép mã
{ "bieu_thuc": "LUONG_CO_BAN * HE_SO_TRACH_NHIEM + 200000" }
⚠️ Expression engine phải sandbox:

whitelist biến

whitelist toán tử

cấm eval nguy hiểm

5) THUẬT TOÁN RULE ENGINE (BẮT BUỘC)
5.1. Input
bang_luong_id, thang, nam, phong_ban_id

danh sách nhân viên thuộc phòng ban trong tháng

5.2. Chọn quy chế hiệu lực
tu_ngay <= cuối tháng và (den_ngay is null hoặc den_ngay >= đầu tháng)

Nếu nhiều quy chế trùng: lấy phien_ban cao nhất và HIEU_LUC

5.3. Apply rule theo thu_tu_uu_tien tăng dần
Với mỗi nhân viên:

kiểm tra điều kiện

tính tiền theo loai_rule

ghi chi_tiet_bang_luong

ghi rule_trace

5.4. Tránh ghi trùng khoản lương
Nếu đã có dòng cho cùng khoan_luong_id:

che_do_gop = CONG_DON → cộng dồn

che_do_gop = GHI_DE → ghi đè theo ưu tiên

6) RÀNG BUỘC & AN TOÀN
Nếu bảng lương DA_CHOT hoặc KHOA → không được chạy rule engine

Quy chế đã áp dụng cho bảng lương đã chốt → không sửa trực tiếp, bắt buộc tạo version mới

Ghi audit mọi thao tác cấu hình

7) API BACKEND BẮT BUỘC
7.1. Quy chế & rule
POST /quy-che-luong

PUT /quy-che-luong/:id

POST /quy-che-luong/:id/nhan-ban

POST /quy-che-luong/:id/rule

PUT /quy-che-rule/:id

DELETE /quy-che-rule/:id (soft delete)

7.2. Validate
POST /quy-che-rule/validate
Input:

json
Sao chép mã
{
  "loai_rule": "BAC_THANG",
  "dieu_kien_json": {},
  "cong_thuc_json": {}
}
Output:

json
Sao chép mã
{ "hop_le": true, "danh_sach_loi": [] }
7.3. Preview
POST /quy-che-rule/preview
Input:

json
Sao chép mã
{
  "nhan_vien_id": 123,
  "quy_che_luong_id": 10,
  "du_lieu_gia_lap": {
    "LUONG_CO_BAN": 8000000,
    "CAP_TRACH_NHIEM": 2,
    "HE_SO_TRACH_NHIEM": 1.2,
    "SO_LAN_DI_TRE": 3
  }
}
7.4. Sắp xếp rule (drag-drop)
PUT /quy-che-luong/:id/sap-xep-rule
Input:

json
Sao chép mã
{ "danh_sach_rule_id": [5, 2, 9, 1] }
7.5. Sự kiện thưởng/phạt
POST /su-kien-thuong-phat

PUT /su-kien-thuong-phat/:id

POST /su-kien-thuong-phat/:id/duyet

7.6. Chạy Rule Engine
POST /bang-luong/:id/chay-rule-engine

7.7. Xem trace
GET /bang-luong/:id/rule-trace?nhanVienId=

8) UI/UX CẤU HÌNH RULE (DRAG-DROP + FORM BUILDER)
8.1. Màn hình danh sách quy chế
Chọn phòng ban

Danh sách quy chế theo version

Nút:

Tạo quy chế

Nhân bản quy chế

Ngưng quy chế

8.2. Trình cấu hình rule (2 cột)
Cột trái: danh sách rule dạng card
Hiển thị:

#Ưu tiên

Tên rule

Khoản lương

Loại rule

Trạng thái validate: ✅/⚠️/❌

Kéo-thả reorder (dnd-kit)

Nút thêm rule

Cột phải: form cấu hình rule theo tab
Tabs:

Thông tin rule

Điều kiện áp dụng (builder)

Cách tính (builder theo loại rule)

Kiểm tra & Preview

Nâng cao (JSON editor)

8.3. Form điều kiện áp dụng
“Áp dụng cho tất cả” (default)

Hoặc chọn:

Vai trò

Cấp trách nhiệm

Nhân viên

Nhóm

Auto sinh dieu_kien_json

8.4. Form cách tính (theo loai_rule)
CO_DINH: số tiền

THEO_HE_SO: base + hệ số + cộng thêm

BAC_THANG: bảng bậc thang (validate chồng chéo)

THEO_SU_KIEN: mã sự kiện + bậc thang theo số lần

CONG_THUC: builder + Advanced Monaco

Auto sinh cong_thuc_json

8.5. Validate (2 lớp)
Client (zod): highlight lỗi field

Server validate: toast & hiển thị danh sách lỗi

8.6. Preview
Chọn nhân viên

Nhập dữ liệu giả lập (nếu thiếu)

Bấm “Chạy thử”

Hiển thị:

Tổng tiền

Chi tiết theo khoản

Trace giải thích

8.7. Cảnh báo & an toàn
Nếu quy chế đã áp dụng cho bảng lương đã chốt:

Không cho sửa trực tiếp

Hiển thị banner “Quy chế đã khoá”

Nút “Tạo phiên bản mới”

9) YÊU CẦU UX CHỐT
Format tiền VNĐ (1.000.000)

Tooltip giải thích từng loại rule

Hạn chế nhập sai: dropdown + builder

Có autosave draft (tùy chọn)

Confirm khi rời trang nếu chưa lưu

10) TEST CASE BẮT BUỘC
Engine
Trách nhiệm theo bậc thang (Kho)

Trách nhiệm theo hệ số (Kinh doanh)

Phạt đi trễ theo bậc thang

Rule theo điều kiện vai trò

Sinh trace đầy đủ

UI
Kéo-thả reorder ưu tiên

Validate lỗi bậc thang chồng chéo

Preview chạy thử

Chặn sửa quy chế đã áp dụng (buộc version mới)

11) YÊU CẦU OUTPUT
Claude phải sinh ra:

Backend
Migration schema

Entities/Models

Services:

QuyCheLuongService

QuyCheRuleService

SuKienThuongPhatService

RuleEngineService (quan trọng nhất)

ValidateService

PreviewService

Expression Engine sandbox (whitelist biến)

Controllers + DTO + Validation

Audit log

Frontend
Trang danh sách quy chế

Trang cấu hình rule:

drag-drop

form builder

validate

preview

advanced JSON editor (Monaco)

Components tái sử dụng:

RuleCard

RuleBuilder

DieuKienBuilder

BacThangTableEditor

ExpressionBuilder

TraceViewer

Tài liệu
Cách thêm rule type mới

Danh sách biến whitelist cho expression

Quy ước JSON schema

⚠️ Không mock nghiệp vụ
⚠️ Không bỏ trace
⚠️ Không hard-code phòng ban
⚠️ UI phải dùng được cho HR/Kế toán không biết code

GHI CHÚ CUỐI
Mục tiêu cuối:

Quy chế lương cấu hình được

Tính đúng

Giải trình được

Chạy thật trong doanh nghiệp Việt Nam

Hãy code cẩn thận, ưu tiên đúng nghiệp vụ & an toàn dữ liệu.