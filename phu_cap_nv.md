## 1. MỤC TIÊU MODULE
Xây dựng module **PHỤ CẤP NHÂN VIÊN** với yêu cầu:

- Mỗi nhân viên có **danh sách phụ cấp RIÊNG**
- Mỗi phụ cấp có **số tiền KHÁC NHAU theo từng nhân viên**
- Phụ cấp mang tính **CỐ ĐỊNH**, không nhập lại mỗi tháng
- Phụ cấp được **tự động áp vào bảng lương hàng tháng**
- Có hiệu lực theo thời gian, audit được lịch sử thay đổi

⚠️ Đây là module **cốt lõi**, ảnh hưởng trực tiếp tới tính đúng lương.
KHÔNG được đơn giản hoá.

---

## 2. NGUYÊN TẮC NGHIỆP VỤ (BẮT BUỘC TUÂN THỦ)

### 2.1. Phụ cấp KHÔNG thuộc bảng lương
- Không lưu phụ cấp cố định trực tiếp trong bảng lương
- Bảng lương chỉ là nơi **tổng hợp kết quả theo tháng**

### 2.2. Phụ cấp gắn với NHÂN VIÊN
- Không gắn với phòng ban
- Không gắn với tháng
- Không gắn với cơ cấu lương

### 2.3. Phụ cấp có hiệu lực thời gian
- Có ngày bắt đầu
- Có thể có ngày kết thúc
- Phải truy vết được lịch sử tăng/giảm

---

## 3. MÔ HÌNH DỮ LIỆU BẮT BUỘC

### 3.1. Danh mục khoản lương (đã tồn tại)
```sql
khoan_luong (
  id,
  ma_khoan,
  ten_khoan,
  loai,        -- THU_NHAP / KHAU_TRU
  chiu_thue
)
Chỉ các khoan_luong.loai = THU_NHAP mới được dùng làm phụ cấp.

3.2. BẢNG PHỤ CẤP NHÂN VIÊN (CORE TABLE)
sql
Copy code
phu_cap_nhan_vien (
  id,
  nhan_vien_id,
  khoan_luong_id,
  so_tien,
  tu_ngay,
  den_ngay,
  ghi_chu,
  trang_thai      -- HIEU_LUC / TAM_DUNG
)
Ý nghĩa nghiệp vụ:
Mỗi dòng = 1 phụ cấp của 1 nhân viên

so_tien là cố định cho NV đó

Cho phép:

tăng phụ cấp (tạo dòng mới)

dừng phụ cấp (set den_ngay)

đổi số tiền theo thời gian

⚠️ Không được update đè số tiền cũ → phải tạo bản ghi mới.

4. LOGIC NGHIỆP VỤ BẮT BUỘC
4.1. Lấy phụ cấp hợp lệ cho 1 tháng lương
Khi tính lương tháng M (ví dụ 01/2026):

sql
Copy code
SELECT *
FROM phu_cap_nhan_vien
WHERE nhan_vien_id = :id
  AND trang_thai = 'HIEU_LUC'
  AND tu_ngay <= '2026-01-31'
  AND (den_ngay IS NULL OR den_ngay >= '2026-01-01')
4.2. Sinh dữ liệu sang bảng lương
Khi tạo bảng lương tháng:

Với mỗi phụ cấp hợp lệ

Tạo 1 dòng trong chi_tiet_bang_luong

sql
Copy code
chi_tiet_bang_luong (
  bang_luong_id,
  nhan_vien_id,
  khoan_luong_id,
  so_tien,
  nguon = 'CO_DINH'
)
⚠️ Không cho phép sửa số tiền CO_DINH trong bảng lương
(nếu cần điều chỉnh → sửa ở hồ sơ nhân viên + hiệu lực tháng sau)

5. CHỨC NĂNG UI BẮT BUỘC
5.1. Màn hình Hồ sơ Nhân viên
Tab: PHỤ CẤP

Hiển thị dạng bảng:

Khoản phụ cấp	Số tiền	Từ ngày	Đến ngày	Trạng thái

Chức năng:

Thêm phụ cấp mới

Kết thúc phụ cấp

Xem lịch sử thay đổi

5.2. Màn hình Bảng lương
Tự động hiển thị phụ cấp cố định

Không cho sửa trực tiếp

Có icon/info: “Lấy từ phụ cấp nhân viên”

6. RÀNG BUỘC & VALIDATION
1 nhân viên + 1 khoản lương
→ Không được trùng thời gian hiệu lực

so_tien >= 0

tu_ngay <= den_ngay (nếu có)

7. AUDIT & AN TOÀN DỮ LIỆU
Lưu:

người tạo

thời gian tạo

Không hard delete

Không cho sửa lịch sử đã áp vào bảng lương đã chốt

8. KỊCH BẢN THỰC TẾ (BẮT BUỘC TEST)
Case 1: NV có 2 phụ cấp
Xăng xe: 600.000

Điện thoại: 500.000
→ Tháng nào cũng tự động cộng

Case 2: Tăng phụ cấp
01/01: PC điện thoại 500.000

01/04: tăng lên 700.000
→ Tháng 3: 500.000
→ Tháng 4: 700.000

Case 3: Dừng phụ cấp
PC xăng xe đến 30/06
→ Tháng 7 không còn

9. YÊU CẦU CODE
Tên bảng, biến, API, UI: TIẾNG VIỆT

Không hard-code phụ cấp

Code dễ đọc, dễ audit

Ưu tiên đúng nghiệp vụ hơn tối ưu sớm

10. TIÊU CHÍ HOÀN THÀNH
✅ Phụ cấp set 1 lần, dùng nhiều tháng
✅ Số tiền khác nhau cho từng nhân viên
✅ Không nhập lại mỗi tháng
✅ Đúng số 100% so với Excel
✅ Sẵn sàng mở rộng sang BHXH / Thuế

GHI CHÚ CUỐI

Đây là module ảnh hưởng trực tiếp tới lương nhân viên.

Hãy code như đang làm cho doanh nghiệp thật.
Không làm demo.