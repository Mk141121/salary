# Hướng Dẫn Sử Dụng HRM Lite
> Hướng dẫn chi tiết theo menu thực tế của hệ thống
> Cập nhật: 2026-01-23

---

## Menu Chính

Hệ thống HRM Lite có các menu chính sau:

| Menu | Đường dẫn | Mô tả |
|------|-----------|-------|
| Trang chủ | `/` | Dashboard tổng quan |
| Bảng Lương | `/bang-luong` | Quản lý bảng lương theo kỳ |
| Nhân Viên | `/nhan-vien` | Quản lý thông tin nhân viên |
| Phòng Ban | `/phong-ban` | Cơ cấu tổ chức |
| Khoản Lương | `/khoan-luong` | Danh mục các khoản lương |
| Chấm Công | `/cham-cong` | Quản lý chấm công |
| Ứng Lương | `/ung-luong` | Quản lý tạm ứng lương |
| Quy Chế | `/quy-che` | Rule Engine - Quy chế tính lương |
| Nghỉ Phép | `/nghi-phep/don-cua-toi` | Đơn nghỉ của tôi |
| Duyệt Nghỉ | `/nghi-phep/duyet` | Duyệt đơn nghỉ phép |
| Xếp Ca | `/phan-ca` | Lịch phân ca |
| Ca Làm Việc | `/ca-lam-viec` | Danh mục ca |
| Yêu Cầu | `/yeu-cau/don-cua-toi` | Đơn yêu cầu OT/Trễ/Sớm |
| Duyệt Yêu Cầu | `/yeu-cau/duyet` | Duyệt đơn yêu cầu |

---

# 📋 BẢNG LƯƠNG

## Làm sao tạo bảng lương mới?

**Đường dẫn:** `/bang-luong`

**Điều kiện:**
- Có quyền `PAYROLL_CREATE` hoặc `ADMIN`
- Kỳ lương chưa tồn tại bảng lương

**Các bước:**

1. Truy cập menu **Bảng Lương**
2. Click nút **+ Tạo Bảng Lương**
3. Điền thông tin:
   - **Kỳ lương**: Chọn tháng/năm (VD: 01/2026)
   - **Phòng ban**: Chọn phòng ban hoặc "Tất cả"
   - **Quy chế lương**: Chọn quy chế áp dụng
4. Click **Tạo**
5. Hệ thống tạo bảng lương với trạng thái **NHÁP**

**Kết quả:** Bảng lương mới xuất hiện trong danh sách

**Tags:** `payroll`, `bang-luong`, `tao-moi`

---

## Các bước tính lương đầy đủ

**Quy trình chuẩn:** Tạo → Sinh DS → Đồng bộ → Kiểm tra → Snapshot → Chốt

### Bước 1: Sinh danh sách nhân viên

1. Mở bảng lương vừa tạo
2. Click **Sinh Danh Sách**
3. Chọn phòng ban cần sinh (hoặc tất cả)
4. Click **Sinh**
5. Hệ thống lấy nhân viên có:
   - Trạng thái = "Đang làm việc"
   - Có hợp đồng còn hiệu lực trong kỳ
   - Thuộc phòng ban được chọn

### Bước 2: Đồng bộ dữ liệu

1. Click nút **Đồng Bộ** (hoặc icon 🔄)
2. Hệ thống tự động lấy:
   - Dữ liệu chấm công → Ngày công thực tế
   - Nghỉ phép đã duyệt → Ngày phép
   - Sản lượng (giao hàng, chia hàng)
   - Điểm KPI
   - Tạm ứng đã chốt
3. Chờ kết quả đồng bộ

**Lưu ý:** Nên đồng bộ sau khi đã hoàn tất nhập chấm công, duyệt nghỉ phép

### Bước 3: Kiểm tra và điều chỉnh

1. Click vào từng nhân viên để xem chi tiết
2. Kiểm tra các cột:
   - Ngày công: Có đủ không?
   - OT: Đã tính đúng?
   - Phụ cấp: Đã áp dụng?
   - Khấu trừ: BHXH, thuế đúng?
3. Nếu cần điều chỉnh:
   - Click **Sửa** trên dòng nhân viên
   - Thay đổi giá trị
   - **Lưu** và ghi chú lý do

### Bước 4: Tạo Snapshot (khuyến nghị)

1. Click **Tạo Snapshot**
2. Nhập ghi chú: "Phiên bản trước khi duyệt"
3. Xác nhận
4. Snapshot được lưu để so sánh sau này

### Bước 5: Chốt bảng lương

Xem hướng dẫn chi tiết bên dưới

**Tags:** `payroll`, `tinh-luong`, `dong-bo`, `workflow`

---

## Làm sao chốt bảng lương?

**Đường dẫn:** `/bang-luong/:id`

**Điều kiện chốt:**
- Bảng lương ở trạng thái **NHÁP**
- Đã đồng bộ dữ liệu
- User có quyền `PAYROLL_APPROVE` hoặc `ADMIN`

**Các bước chốt:**

1. Mở chi tiết bảng lương
2. Kiểm tra lại tổng hợp:
   - Tổng lương NET
   - Tổng BHXH
   - Tổng thuế TNCN
3. Click nút **🔒 Chốt Bảng Lương**
4. Đọc cảnh báo: "Sau khi chốt không thể sửa đổi"
5. Click **Xác Nhận Chốt**
6. Trạng thái chuyển: **NHÁP** → **ĐÃ CHỐT**

**Sau khi chốt:**
- ❌ Không thể sửa số liệu
- ✅ Có thể tạo Adjustment (điều chỉnh)
- ✅ Có thể xuất Excel/PDF
- ✅ Có thể tạo phiếu lương

**Mở lại bảng lương (Admin):**
1. Click **Mở Lại**
2. Nhập lý do bắt buộc
3. Xác nhận
4. Hệ thống ghi log audit

**Tags:** `chot`, `lock`, `bang-luong`, `approve`, `finalize`

---

## Làm sao tạo phiếu lương?

**Đường dẫn:** `/bang-luong/:id/phieu-luong`

**Điều kiện:**
- Bảng lương đã **CHỐT**
- Có quyền xem bảng lương

**Các bước:**

1. Mở chi tiết bảng lương đã chốt
2. Click tab **Phiếu Lương** hoặc nút **📄 Tạo Phiếu Lương**
3. Chọn template phiếu lương:
   - **Mẫu chuẩn**: Đầy đủ các khoản
   - **Mẫu rút gọn**: Chỉ hiện tổng
   - **Mẫu công ty**: Theo logo công ty
4. Chọn nhân viên:
   - Tất cả nhân viên
   - Chọn từng người
   - Theo phòng ban
5. Click **Tạo Phiếu**
6. Xem preview
7. **In** hoặc **Xuất PDF**

**Nội dung phiếu lương:**
- Thông tin nhân viên (mã, tên, phòng ban)
- Kỳ lương
- Chi tiết thu nhập (lương CB, phụ cấp, OT...)
- Chi tiết khấu trừ (BHXH, thuế, tạm ứng...)
- Lương NET thực nhận

**Gửi phiếu lương qua email:**
1. Click **📧 Gửi Email**
2. Chọn nhân viên
3. Xác nhận gửi

**Tags:** `payslip`, `phieu-luong`, `in-phieu`, `pdf`, `email`

---

## Làm sao ghi nhận khấu trừ?

**Đường dẫn:** `/bang-luong/:id` hoặc `/khoan-luong`

**Các loại khấu trừ:**

| Loại | Tự động | Thủ công |
|------|---------|----------|
| BHXH (8%) | ✅ | |
| BHYT (1.5%) | ✅ | |
| BHTN (1%) | ✅ | |
| Thuế TNCN | ✅ | |
| Tạm ứng | ✅ (từ bảng ứng lương) | |
| Khấu trừ khác | | ✅ |

### Ghi nhận khấu trừ tự động

Hệ thống tự động tính khi đồng bộ:
- BHXH/BHYT/BHTN: Theo lương đóng BH
- Thuế TNCN: Theo biểu thuế lũy tiến
- Tạm ứng: Từ bảng ứng lương đã chốt

### Ghi nhận khấu trừ thủ công

**Cách 1: Trực tiếp trên bảng lương**
1. Mở chi tiết bảng lương
2. Click vào nhân viên
3. Tìm dòng "Khấu trừ khác" hoặc **+ Thêm khoản**
4. Nhập:
   - Loại khấu trừ: VD "Trừ tiền điện thoại"
   - Số tiền: VD 200,000
   - Ghi chú: VD "Vượt mức cho phép"
5. **Lưu**

**Cách 2: Qua Khoản Lương**
1. Truy cập **Khoản Lương** (`/khoan-luong`)
2. Tạo khoản lương mới với loại = **KHẤU TRỪ**
3. Cấu hình công thức hoặc số cố định
4. Áp dụng cho nhân viên/phòng ban

**Cách 3: Qua Rule Engine**
1. Truy cập **Quy Chế** (`/quy-che`)
2. Tạo rule với action = trừ lương
3. Đặt điều kiện áp dụng

**Tags:** `deduction`, `khau-tru`, `tru-luong`, `bhxh`, `thue`

---

# 💰 ỨNG LƯƠNG

## Làm sao tạo bảng ứng lương?

**Đường dẫn:** `/ung-luong`

**Các bước:**

1. Truy cập menu **Ứng Lương**
2. Click nút **+ Tạo Bảng Ứng Lương**
3. Điền thông tin:
   - **Kỳ ứng lương**: Tháng/năm
   - **Phòng ban**: Chọn hoặc tất cả
   - **Ngày chi**: Dự kiến ngày chi tiền
4. Click **Tạo**
5. Click **Sinh Danh Sách** để lấy nhân viên
6. Nhập số tiền ứng cho từng người

**Nhập nhanh theo tỷ lệ:**
1. Click **Áp Dụng Theo Tỷ Lệ**
2. Chọn tỷ lệ: VD 40% lương cơ bản
3. Chọn nhân viên áp dụng
4. Click **Áp Dụng**
5. Hệ thống tự tính: `Tiền ứng = Lương CB × 40%`

**Tags:** `advance`, `ung-luong`, `tam-ung`, `tao-moi`

---

## Làm sao chốt bảng ứng lương?

**Đường dẫn:** `/ung-luong/:id`

**Điều kiện chốt:**
- Bảng ứng lương ở trạng thái **NHÁP**
- Đã nhập số tiền ứng
- User có quyền `ADVANCE_APPROVE` hoặc `ADMIN`

**Các bước chốt:**

1. Mở chi tiết bảng ứng lương
2. Kiểm tra danh sách:
   - Số nhân viên: Đúng chưa?
   - Tổng tiền ứng: Hợp lý?
3. Click nút **🔒 Chốt Bảng Ứng Lương**
4. Đọc cảnh báo
5. Click **Xác Nhận Chốt**
6. Trạng thái: **NHÁP** → **ĐÃ CHỐT**

**Sau khi chốt:**
- ❌ Không thể sửa số tiền
- ✅ Xuất danh sách chi tiền (Excel/PDF)
- ✅ Tự động trừ vào bảng lương khi đồng bộ

**Mở lại (Admin):**
1. Click **Mở Lại**
2. Nhập lý do
3. Xác nhận

**Tags:** `chot`, `lock`, `ung-luong`, `finalize`, `approve`

---

# 📅 XẾP CA (SCHEDULING)

## Danh mục ca làm việc

**Đường dẫn:** `/ca-lam-viec`

### Làm sao tạo ca làm việc mới?

1. Truy cập **Ca Làm Việc**
2. Click **+ Thêm Ca**
3. Điền thông tin:
   - **Mã ca**: VD "CA_SANG", "CA_CHIEU"
   - **Tên ca**: VD "Ca sáng 8h-17h"
   - **Giờ vào**: 08:00
   - **Giờ ra**: 17:00
   - **Nghỉ giữa ca**: 60 phút
   - **Grace In**: 15 phút (cho phép vào muộn)
   - **Grace Late**: 15 phút (tính đi trễ sau)
   - **Ca đêm**: ✅ nếu giờ ra qua ngày
4. Click **Lưu**

**Các ca phổ biến:**

| Mã | Tên | Giờ vào | Giờ ra | Ca đêm |
|----|-----|---------|--------|--------|
| CA_SANG | Ca sáng | 08:00 | 17:00 | ❌ |
| CA_CHIEU | Ca chiều | 14:00 | 22:00 | ❌ |
| CA_DEM | Ca đêm | 22:00 | 06:00 | ✅ |
| CA_HANH_CHINH | Hành chính | 08:30 | 17:30 | ❌ |

**Tags:** `shift`, `ca-lam-viec`, `danh-muc-ca`

---

## Lịch phân ca

**Đường dẫn:** `/phan-ca`

### Làm sao tạo lịch phân ca?

1. Truy cập **Xếp Ca** (`/phan-ca`)
2. Click **+ Tạo Lịch Phân Ca**
3. Điền thông tin:
   - **Tên lịch**: VD "Lịch tháng 01/2026 - Kho vận"
   - **Tháng/Năm**: 01/2026
   - **Phòng ban**: Chọn phòng ban
4. Click **Tạo**
5. Lịch được tạo với trạng thái **NHÁP**

### Làm sao xếp ca cho nhân viên?

**Cách 1: Xếp từng ô trên Calendar**
1. Mở lịch phân ca
2. Click vào ô (giao điểm nhân viên + ngày)
3. Chọn ca từ dropdown
4. Ca được gán ngay lập tức

**Cách 2: Xếp hàng loạt (Batch Assign)**
1. Click **Xếp Hàng Loạt**
2. Chọn:
   - **Nhân viên**: Multi-select
   - **Ca làm việc**: Chọn ca
   - **Từ ngày - Đến ngày**: Khoảng thời gian
   - **Ngoại trừ**: ✅ Thứ 7, ✅ Chủ nhật
3. Click **Xếp Ca**
4. Hệ thống tự động xếp cho tất cả ngày phù hợp

**Cách 3: Copy tuần**
1. Đã xếp xong 1 tuần mẫu
2. Click **Copy Tuần**
3. Chọn:
   - **Tuần nguồn**: VD 06/01 - 12/01
   - **Tuần đích**: VD 13/01 - 19/01
4. Click **Copy**
5. Tất cả ca được copy sang tuần đích

### Làm sao công bố lịch phân ca?

1. Hoàn tất xếp ca
2. Click **📢 Công Bố**
3. Xác nhận
4. Trạng thái: **NHÁP** → **ĐÃ CÔNG BỐ**
5. Nhân viên có thể xem lịch trên Employee Portal

**Sau khi công bố:**
- ❌ Không thể sửa ca (trừ Admin)
- ✅ Nhân viên thấy lịch của mình
- ✅ Hệ thống dùng để tính chấm công

**Tags:** `schedule`, `phan-ca`, `xep-ca`, `lich`, `calendar`

---

# 🏖️ NGHỈ PHÉP

## Làm sao tạo đơn nghỉ phép?

**Đường dẫn:** `/nghi-phep/don-cua-toi`

**Các bước:**

1. Truy cập **Nghỉ Phép > Đơn Của Tôi**
2. Click **+ Tạo Đơn Nghỉ**
3. Điền thông tin:
   - **Loại nghỉ**: Chọn từ danh sách
     - Phép năm (có lương)
     - Nghỉ ốm (có lương)
     - Việc riêng (không lương)
     - Nghỉ cưới (có lương)
     - Nghỉ tang (có lương)
   - **Từ ngày**: Ngày bắt đầu nghỉ
   - **Đến ngày**: Ngày kết thúc
   - **Buổi**: Cả ngày / Sáng / Chiều
   - **Lý do**: Nhập chi tiết
   - **File đính kèm**: Nếu cần (VD giấy khám bệnh)
4. Click **Lưu Nháp** hoặc **Gửi Duyệt**

**Trạng thái đơn:**
- **NHÁP**: Chưa gửi, có thể sửa/xóa
- **CHỜ DUYỆT**: Đã gửi, chờ quản lý duyệt
- **ĐÃ DUYỆT**: Quản lý đã duyệt
- **TỪ CHỐI**: Quản lý từ chối
- **HỦY**: Nhân viên hủy đơn

**Kiểm tra số ngày phép còn:**
- Xem ở góc phải màn hình
- Hoặc vào **Nghỉ Phép > Số Dư**

**Tags:** `leave`, `nghi-phep`, `don-nghi`, `request`

---

## Làm sao duyệt đơn nghỉ phép?

**Đường dẫn:** `/nghi-phep/duyet`

**Ai có thể duyệt:**
- Quản lý trực tiếp của nhân viên
- HR có quyền `LEAVE_APPROVE`
- Admin

**Các bước duyệt:**

1. Truy cập **Nghỉ Phép > Duyệt**
2. Xem danh sách đơn **CHỜ DUYỆT**
3. Click vào đơn để xem chi tiết:
   - Thông tin nhân viên
   - Loại nghỉ, số ngày
   - Lý do nghỉ
   - Số phép còn lại
4. Chọn action:
   - **✅ Duyệt**: Đồng ý cho nghỉ
   - **❌ Từ chối**: Không đồng ý
5. Nhập ghi chú (bắt buộc khi từ chối)
6. Xác nhận

**Duyệt hàng loạt:**
1. Tick chọn nhiều đơn
2. Click **Duyệt Tất Cả** hoặc **Từ Chối Tất Cả**
3. Xác nhận

**Sau khi duyệt:**
- Nhân viên nhận thông báo
- Đơn được mapping vào ngày công
- Hiển thị trên bảng chấm công

**Tags:** `approve`, `duyet`, `nghi-phep`, `manager`

---

## Xem lịch nghỉ phép toàn team

**Đường dẫn:** `/nghi-phep/lich`

1. Truy cập **Nghỉ Phép > Lịch**
2. Xem calendar với các đơn nghỉ đã duyệt
3. Filter theo phòng ban
4. Màu sắc theo loại nghỉ:
   - 🟢 Xanh: Phép năm
   - 🟡 Vàng: Việc riêng
   - 🔴 Đỏ: Nghỉ ốm

**Tags:** `calendar`, `lich-nghi`, `team`

---

# 📝 YÊU CẦU (OT/TRỄ/SỚM/CÔNG TÁC)

## Làm sao tạo đơn yêu cầu?

**Đường dẫn:** `/yeu-cau/don-cua-toi`

**Các loại yêu cầu:**
- **OT**: Làm thêm giờ
- **TRỄ GIỜ**: Hợp thức hóa đi muộn
- **VỀ SỚM**: Hợp thức hóa về sớm
- **CÔNG TÁC**: Đi công tác
- **LÀM TỪ XA**: Work from home

**Các bước:**

1. Truy cập **Yêu Cầu > Đơn Của Tôi**
2. Click **+ Tạo Đơn Yêu Cầu**
3. Chọn loại yêu cầu
4. Điền thông tin:
   - **Ngày**: Ngày áp dụng
   - **Giờ bắt đầu - Giờ kết thúc**: Khoảng thời gian
   - **Địa điểm**: (cho công tác)
   - **Lý do**: Chi tiết
5. Click **Gửi Duyệt**

**Workflow duyệt:**
- **1 cấp**: NV → Manager → Duyệt
- **2 cấp**: NV → Manager → HR → Duyệt

**Tags:** `request`, `yeu-cau`, `ot`, `overtime`, `tre-gio`

---

## Làm sao duyệt đơn yêu cầu?

**Đường dẫn:** `/yeu-cau/duyet`

**Các bước:**

1. Truy cập **Yêu Cầu > Duyệt**
2. Xem inbox theo tab:
   - **Cấp 1**: Đơn chờ duyệt cấp Manager
   - **Cấp 2**: Đơn chờ duyệt cấp HR
   - **Tất cả**: Toàn bộ đơn
3. Click vào đơn xem chi tiết
4. Chọn:
   - **✅ Duyệt**: Đồng ý
   - **❌ Từ chối**: Không đồng ý (nhập lý do)
   - **🔄 Override**: HR ghi đè quyết định
5. Xác nhận

**Sau khi duyệt:**
- OT → Mapping vào giờ OT trong bảng lương
- Trễ/Sớm → Hợp thức hóa, không bị trừ chuyên cần
- Công tác → Tính ngày công đầy đủ

**Tags:** `approve`, `duyet`, `yeu-cau`, `inbox`

---

## Quản Lý Nhân Viên

### Làm sao thêm nhân viên mới?

1. Truy cập menu **Nhân Viên** (`/nhan-vien`)
2. Click **Thêm Nhân Viên**
3. Điền thông tin:
   - Mã nhân viên (tự động hoặc nhập)
   - Họ tên
   - Phòng ban
   - Chức vụ
   - Lương cơ bản
4. Click **Lưu**

### Import nhân viên từ Excel?

1. Truy cập **Nhân Viên > Import/Export** (`/nhan-vien/import-export`)
2. Tải file mẫu Excel
3. Điền thông tin theo mẫu
4. Upload file
5. Xem preview và xác nhận

**Tags:** `employees`, `nhan-vien`, `import`

---

## Chấm Công

### Làm sao xem chấm công?

1. Truy cập menu **Chấm Công** (`/cham-cong`)
2. Chọn kỳ (tháng/năm)
3. Chọn phòng ban (tùy chọn)
4. Xem bảng chấm công

### Import chấm công từ máy chấm công?

1. Truy cập **Import Excel** (`/import-excel`)
2. Chọn loại: Chấm công
3. Upload file Excel từ máy chấm công
4. Mapping cột dữ liệu
5. Xác nhận import

**Tags:** `attendance`, `cham-cong`, `timesheet`

---

## Quy Chế Lương (Rule Engine)

### Quy chế lương là gì?

Quy chế lương là bộ quy tắc định nghĩa cách tính lương, bao gồm:
- Công thức tính các khoản thu nhập
- Cách tính khấu trừ (BHXH, thuế...)
- Điều kiện áp dụng

### Làm sao tạo quy chế lương?

1. Truy cập **Quy Chế** (`/quy-che`)
2. Click **Tạo Quy Chế**
3. Nhập tên và mô tả
4. Thêm các quy tắc (rules)
5. Kích hoạt quy chế

**Tags:** `rule-engine`, `quy-che`, `formula`

---

## Nghỉ Phép

### Làm sao tạo đơn nghỉ phép?

1. Truy cập **Nghỉ Phép > Đơn Của Tôi** (`/nghi-phep/don-cua-toi`)
2. Click **Tạo Đơn**
3. Chọn loại nghỉ (phép năm, ốm, việc riêng...)
4. Chọn ngày bắt đầu - kết thúc
5. Nhập lý do
6. Gửi đơn

### Làm sao duyệt đơn nghỉ phép?

1. Truy cập **Nghỉ Phép > Duyệt** (`/nghi-phep/duyet`)
2. Xem danh sách đơn chờ duyệt
3. Click vào đơn để xem chi tiết
4. Chọn **Duyệt** hoặc **Từ chối**
5. Nhập ghi chú (nếu cần)

**Tags:** `leave`, `nghi-phep`, `don-xin-nghi`

---

## Khoản Lương

### Làm sao tạo khoản lương mới?

1. Truy cập **Khoản Lương** (`/khoan-luong`)
2. Click **Thêm Khoản Lương**
3. Nhập:
   - Mã khoản lương
   - Tên khoản lương
   - Loại (thu nhập/khấu trừ)
   - Công thức tính (nếu có)
4. Click **Lưu**

### Các khoản lương phổ biến:

**Thu nhập:**
- Lương cơ bản
- Phụ cấp ăn trưa
- Phụ cấp đi lại
- Thưởng KPI
- Lương OT

**Khấu trừ:**
- BHXH (8%)
- BHYT (1.5%)
- BHTN (1%)
- Thuế TNCN
- Tạm ứng

**Tags:** `payroll-items`, `khoan-luong`, `income`, `deduction`

---

## Sản Lượng (Giao Hàng/Chia Hàng)

### Import sản lượng giao hàng?

1. Truy cập **Import Giao Hàng** (`/import-giao-hang`)
2. Tải file mẫu
3. Điền dữ liệu giao hàng
4. Upload và xác nhận

### Xem tra cứu sản lượng?

1. Truy cập **Sản Lượng** (`/san-luong`)
2. Chọn kỳ và phòng ban
3. Xem bảng sản lượng

**Tags:** `production`, `san-luong`, `giao-hang`

---

## Cài Đặt Hệ Thống

### Cấu hình cột bảng lương?

1. Truy cập **Cấu Hình > Bảng Lương** (`/cau-hinh/bang-luong`)
2. Chọn các cột hiển thị
3. Kéo thả sắp xếp thứ tự
4. Lưu cấu hình

### Cấu hình cột ứng lương?

1. Truy cập **Cấu Hình > Ứng Lương** (`/cau-hinh/ung-luong`)
2. Tương tự cấu hình bảng lương

**Tags:** `settings`, `cai-dat`, `cau-hinh`

---

## Báo Cáo

### Xem báo cáo quỹ lương?

1. Truy cập **Báo Cáo** hoặc **Dashboard**
2. Chọn loại báo cáo:
   - Quỹ lương theo tháng
   - Chi phí theo phòng ban
   - Thống kê OT
   - Báo cáo chuyên cần
3. Chọn kỳ và bộ lọc
4. Xem hoặc xuất Excel

**Tags:** `reports`, `bao-cao`, `thong-ke`

---

## Snapshot & Chốt Lương

### Snapshot là gì?

**Snapshot** là bản chụp trạng thái bảng lương tại một thời điểm. Dùng để:
- Lưu giữ lịch sử tính lương
- So sánh các phiên bản
- Audit trail

### Làm sao tạo Snapshot?

1. Mở chi tiết bảng lương (`/bang-luong/:id`)
2. Click **Tạo Snapshot**
3. Nhập ghi chú (tùy chọn)
4. Xác nhận

### Chốt khác Khóa thế nào?

| | Chốt (Lock) | Khóa kỳ |
|---|---|---|
| Mục đích | Ngăn chỉnh sửa bảng lương | Đóng kỳ kế toán |
| Phạm vi | 1 bảng lương | Toàn bộ kỳ |
| Có thể mở lại | Có (Admin) | Không |

**Tags:** `snapshot`, `lock`, `chot-luong`, `audit`

---

## Rule Engine

### Rule Engine là gì?

Rule Engine cho phép định nghĩa quy tắc tính lương linh hoạt:
- Điều kiện áp dụng (phòng ban, chức vụ, loại hợp đồng...)
- Công thức tính (cố định, %, theo bảng)
- Thứ tự ưu tiên

### Tạo quy tắc tính phụ cấp?

1. Truy cập **Quy Chế** (`/quy-che`)
2. Chọn quy chế đang active
3. Click **Thêm Rule**
4. Cấu hình:
   - Tên rule: "Phụ cấp ăn trưa"
   - Điều kiện: `loaiHopDong = 'CHINH_THUC'`
   - Giá trị: `730000`
5. Lưu và test

### Xem Rule Trace?

1. Truy cập **Rule Trace** (`/rule-trace`)
2. Chọn bảng lương
3. Chọn nhân viên
4. Xem chi tiết từng rule được áp dụng

**Tags:** `rule-engine`, `quy-che`, `formula`, `trace`

---

## Import/Export Dữ Liệu

### Import chấm công từ máy chấm công?

1. Xuất file từ máy chấm công (Excel/CSV)
2. Truy cập **Import Excel** (`/import-excel`)
3. Chọn loại: Chấm công
4. Upload file
5. Mapping cột: Mã NV, Ngày, Giờ vào, Giờ ra
6. Preview và xác nhận

### Import sản lượng giao hàng?

1. Truy cập **Import Giao Hàng** (`/import-giao-hang`)
2. Tải file mẫu
3. Điền dữ liệu: Mã NV, Ngày, Số đơn, Khối lượng...
4. Upload và xác nhận
5. Xem kết quả tại **Sản Lượng** (`/san-luong`)

### Export bảng lương ra Excel?

1. Mở chi tiết bảng lương
2. Click **Xuất Excel**
3. Chọn các cột cần xuất
4. Download file

**Tags:** `import`, `export`, `excel`, `data`

---

## Lỗi Thường Gặp

### Lương tính sai, kiểm tra ở đâu?

1. Vào **Rule Trace** (`/rule-trace`)
2. Chọn nhân viên bị sai
3. Xem chi tiết từng khoản lương
4. Kiểm tra:
   - Ngày công tính đúng chưa?
   - Rule có áp dụng đúng không?
   - Dữ liệu đầu vào (chấm công, KPI...) chính xác?

### Import lỗi "Mã NV không tồn tại"?

1. Kiểm tra mã nhân viên trong file Excel
2. Đảm bảo nhân viên đã được tạo trong hệ thống
3. Mã NV phải khớp chính xác (phân biệt hoa/thường)
4. Kiểm tra trạng thái nhân viên (còn làm việc)

### Không thấy nhân viên trong bảng lương?

Kiểm tra:
1. Nhân viên có hợp đồng valid trong kỳ?
2. Nhân viên có thuộc phòng ban được chọn?
3. Trạng thái nhân viên = "Đang làm việc"
4. Đã click "Đồng bộ" sau khi thêm nhân viên mới?

**Tags:** `troubleshooting`, `error`, `debug`, `loi`

---

## Thuế & Bảo Hiểm

### BHXH tính thế nào?

Theo quy định:
- **BHXH**: 8% lương đóng BH (người lao động)
- **BHYT**: 1.5% lương đóng BH
- **BHTN**: 1% lương đóng BH

Công ty đóng thêm: BHXH 17.5%, BHYT 3%, BHTN 1%

### Thuế TNCN tính thế nào?

1. Tính thu nhập chịu thuế = Tổng thu nhập - Các khoản miễn thuế - Giảm trừ
2. Giảm trừ bản thân: 11,000,000 VNĐ/tháng
3. Giảm trừ người phụ thuộc: 4,400,000 VNĐ/người/tháng
4. Áp dụng biểu thuế lũy tiến 7 bậc

**Tags:** `tax`, `bhxh`, `thue`, `insurance`

---

## KPI & Thưởng

### Cấu hình thưởng KPI?

1. Truy cập **KPI > Cấu hình thưởng** (`/kpi/cau-hinh-thuong`)
2. Tạo bảng mapping:
   - Điểm KPI 90-100 → Thưởng 100%
   - Điểm KPI 80-89 → Thưởng 80%
   - Điểm KPI < 80 → Thưởng 50%
3. Liên kết với kỳ đánh giá
4. Lưu cấu hình

### Import điểm KPI?

1. Truy cập **KPI > Kỳ đánh giá** (`/kpi/ky-danh-gia`)
2. Chọn kỳ
3. Click **Import điểm**
4. Upload file Excel với cột: Mã NV, Điểm KPI
5. Xác nhận

**Tags:** `kpi`, `bonus`, `thuong`, `danh-gia`
