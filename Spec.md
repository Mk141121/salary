# 🎯 PROMPT: XÂY DỰNG APP TÍNH LƯƠNG TỪ EXCEL (100% TIẾNG VIỆT)

## 1. VAI TRÒ & TƯ DUY
Bạn là:
- Senior Fullstack Engineer
- Business Analyst chuyên mảng LƯƠNG – NHÂN SỰ tại Việt Nam
- Có kinh nghiệm xây dựng Payroll System thực tế cho doanh nghiệp

Nhiệm vụ của bạn là **thiết kế và code một ỨNG DỤNG TÍNH LƯƠNG** dựa trên **bảng Excel hiện đang sử dụng**, với các yêu cầu:

- Kết quả tính lương **PHẢI KHỚP 100% với Excel**
- Thiết kế **chuẩn hoá – mở rộng – audit được**
- Không hard-code theo cột Excel
- Toàn bộ **giao diện, dữ liệu, comment, biến, text đều dùng TIẾNG VIỆT**
- Đây là **hệ thống thật**, không phải demo

⚠️ TUYỆT ĐỐI:
- Không tự ý đơn giản nghiệp vụ
- Không xoá trường dữ liệu nếu chưa có chỉ đạo
- Ưu tiên đúng số liệu > đẹp code

---

## 2. NGỮ CẢNH NGHIỆP VỤ (THỰC TẾ)

Hiện tại công ty đang tính lương bằng **Excel**, với đặc điểm:

- Có **nhiều bộ phận**:
  - Kế toán
  - Kinh doanh & Marketing
  - Đơn hàng
  - Kho vận
  - Chia hàng
- Mỗi bộ phận có **cơ cấu lương khác nhau**
- Lương = tổng nhiều khoản:
  - Lương cơ bản
  - Thưởng
  - Phụ cấp
  - Hỗ trợ
- Hiện tại **chưa tính khấu trừ** (BHXH, thuế)  
→ Bảng lương hiện tại là **TỔNG THU NHẬP (Gross)**

Excel chỉ đóng vai trò:
> **Nơi nhập số & cộng tổng, KHÔNG phải nơi xử lý logic**

---

## 3. NGUYÊN TẮC THIẾT KẾ CỐT LÕI

### 3.1. Không thiết kế theo cột Excel
❌ Không tạo bảng có các cột:
- lương_cơ_bản
- phụ_cấp_xăng_xe
- phụ_cấp_điện_thoại
- ...

✅ Thay vào đó:
- Mỗi khoản tiền = **1 dòng dữ liệu**
- Gọi là **KHOẢN LƯƠNG**

---

### 3.2. Chuẩn hoá KHOẢN LƯƠNG
Mọi khoản trong Excel phải được chuẩn hoá thành danh mục:

- LƯƠNG CƠ BẢN
- THƯỞNG HIỆU SUẤT
- PHỤ CẤP XĂNG XE
- PHỤ CẤP ĐIỆN THOẠI
- HỖ TRỢ CHUYÊN CẦN
- HỖ TRỢ ĂN CA
- THƯỞNG KINH DOANH
- PHỤ CẤP KHÁC

---

### 3.3. Tổng lương
- KHÔNG lưu tổng lương trong DB
- Tổng lương luôn được tính:
```text
TỔNG_LƯƠNG = TỔNG CÁC KHOẢN_LƯƠNG
4. MÔ HÌNH DỮ LIỆU BẮT BUỘC
4.1. BỘ PHẬN
sql
Copy code
phong_ban (
  id,
  ma_phong_ban,
  ten_phong_ban
)
4.2. NHÂN VIÊN
sql
Copy code
nhan_vien (
  id,
  ho_ten,
  phong_ban_id,
  luong_co_ban,
  trang_thai
)
4.3. DANH MỤC KHOẢN LƯƠNG (CỰC KỲ QUAN TRỌNG)
Thay thế toàn bộ các cột trong Excel.

sql
Copy code
khoan_luong (
  id,
  ma_khoan,
  ten_khoan,
  loai,          -- thu_nhap / khau_tru
  chiu_thue,     -- true / false
  pham_vi_ap_dung -- null = toàn công ty
)
Danh mục khởi tạo bắt buộc:

LUONG_CO_BAN

THUONG_HIEU_SUAT

PHU_CAP_XANG_XE

PHU_CAP_DIEN_THOAI

HO_TRO_CHUYEN_CAN

HO_TRO_AN_CA

THUONG_KINH_DOANH

PHU_CAP_KHAC

4.4. CƠ CẤU LƯƠNG THEO PHÒNG BAN
sql
Copy code
co_cau_luong (
  id,
  phong_ban_id,
  ten_co_cau
)
sql
Copy code
co_cau_luong_chi_tiet (
  co_cau_luong_id,
  khoan_luong_id,
  bat_buoc,
  gia_tri_mac_dinh
)
4.5. BẢNG LƯƠNG THÁNG
sql
Copy code
bang_luong (
  id,
  thang,
  nam,
  phong_ban_id,
  trang_thai -- nhap / da_chot / khoa
)
4.6. CHI TIẾT BẢNG LƯƠNG (LINH HỒN HỆ THỐNG)
sql
Copy code
chi_tiet_bang_luong (
  bang_luong_id,
  nhan_vien_id,
  khoan_luong_id,
  so_tien
)
👉 Mỗi ô trong Excel = 1 dòng ở bảng này

5. CHỨC NĂNG BẮT BUỘC
5.1. Nhập dữ liệu từ Excel
Upload file Excel

Mapping từng cột → khoan_luong

Tạo chi_tiet_bang_luong

Đối chiếu:

Tổng lương App = Tổng lương Excel (100%)

5.2. Xem & chỉnh sửa bảng lương
Giao diện giống Excel

Nhóm theo:

Phòng ban

Nhân viên

Cho phép chỉnh từng khoản lương

Tự động cập nhật tổng

5.3. Phân quyền
Nhân sự: cấu hình danh mục, cơ cấu

Kế toán: nhập & chốt lương

Nhân viên: xem phiếu lương cá nhân

6. CÔNG NGHỆ ĐỀ XUẤT
Backend
Node.js + NestJS

PostgreSQL

Prisma hoặc TypeORM

Frontend
React

Bảng editable

Hiển thị tiếng Việt hoàn toàn

7. YÊU CẦU PHI CHỨC NĂNG
Lưu lịch sử chỉnh sửa từng khoản lương

Không mất dữ liệu khi thay đổi cơ cấu

Dễ mở rộng thêm:

KPI

Chấm công

BHXH & Thuế VN

8. THỨ TỰ TRIỂN KHAI (BẮT BUỘC)
Thiết kế DB schema

Tạo danh mục khoản lương

Import Excel

Service tính tổng lương

UI bảng lương

Chốt & khoá bảng lương

9. KẾT QUẢ MONG MUỐN
Claude phải sinh ra:

SQL schema hoàn chỉnh

Backend CRUD & service tính lương

Logic import Excel

UI bảng lương giống Excel

Dữ liệu mẫu khớp Excel

⚠️ Không bỏ qua bước
⚠️ Không mock nghiệp vụ
⚠️ Chỉ hỏi lại nếu dữ liệu mơ hồ

10. GHI CHÚ CUỐI
Đây là hệ thống lương thật dùng cho doanh nghiệp Việt Nam.

Hãy code cẩn thận.
Ưu tiên đúng nghiệp vụ.
Viết code dễ đọc, dễ audit.