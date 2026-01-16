# PROMPT CHO CLAUDE: TẠO SEED DATA TOÀN BỘ FLOW PAYROLL (GIỮ NGUYÊN PHÒNG BAN + NHÂN VIÊN HIỆN CÓ) + 6 THÁNG KỲ LƯƠNG 2025 (06→12)
> Mục tiêu: dựng đầy đủ dữ liệu cho toàn app để demo/test end-to-end theo đúng workflow Option B.  
> Ràng buộc quan trọng: **GIỮ NGUYÊN data Phòng ban + Nhân viên đang có** (không xóa/không sửa).  
> Phạm vi seed: tạo dữ liệu cho 6 tháng kỳ lương: **06/2025 → 12/2025**.  
> Seed phải tương thích Rule Engine, Snapshot, Chốt/Khoá, Adjustment…  
> Không sửa business logic. Có thể thêm file seed/script mới.

---

## 0) Vai trò
Bạn là **Data Engineer + QA Automation** cho hệ thống Payroll Option B.
Nhiệm vụ:
1) Đọc cấu trúc DB/model/service hiện có
2) Kiểm tra data Phòng ban & Nhân viên đang tồn tại
3) Viết script seed dựng **đầy đủ data cho tất cả module** để chạy demo thật
4) Tạo dữ liệu theo đúng **flow vận hành payroll**
5) Tạo 6 kỳ lương 2025: `2025-06..2025-12` và dựng dữ liệu đầu vào tương ứng
6) Đảm bảo seed **idempotent** (chạy nhiều lần không tạo trùng, không phá data cũ)

---

## 1) Ràng buộc bắt buộc
- **KHÔNG tạo mới phòng ban**, KHÔNG xoá/sửa phòng ban hiện có
- **KHÔNG tạo mới nhân viên**, KHÔNG xoá/sửa nhân viên hiện có  
  - Chỉ được tạo dữ liệu liên quan (hợp đồng, phụ cấp, chấm công, KPI, sản lượng, bảng lương…)
- Nếu thiếu thông tin để seed (vd nhân viên thiếu phongBanId) thì:
  - tạo log cảnh báo
  - seed phần tối thiểu
- Seed phải chạy được local và staging
- Seed không phụ thuộc UI
- **Không thay đổi code nghiệp vụ**, chỉ thêm seed script + (nếu cần) helper query

---

## 2) Output bắt buộc
Tạo thư mục và file:

- `/qa/seed/seed_payroll_full_2025.ts` (hoặc `.js`)
- `/qa/seed/README_SEED_2025.md`
- `/qa/seed/seed_report_2025.md` (report thống kê sau khi seed)
- (tuỳ dự án) `/qa/seed/templates/*.xlsx` nếu cần import template

Nếu dự án dùng SQL seed tốt hơn:
- `/qa/seed/seed_payroll_full_2025.sql`

**Yêu cầu seed_report_2025.md** phải thống kê:
- Số NV được seed
- Số NV bị skip + lý do
- Số kỳ lương tạo
- Số record theo module: chấm công, KPI, sản lượng, snapshot, adjustment…

---

## 3) Các module bắt buộc phải seed
### 3.1 Dữ liệu nền tảng
- `ThongTinCongTy` (nếu chưa có)
- `KhoanLuong` (đảm bảo đủ khoản cần tính)
- `QuyChe` + `QuyCheRule` (rule engine) theo phòng ban/nhóm nếu hệ thống cần
- `CongThucLuong`, `BienSoCongThuc` (nếu đã dùng trong rule)

### 3.2 Dữ liệu theo nhân viên (hiệu lực theo thời gian)
- `NhanVienHopDong` cho từng nhân viên (hiệu lực cover 06→12/2025)
- `PhuCapNhanVien` (mỗi NV ít nhất 1-2 phụ cấp mẫu)
- `NhanVienTrachNhiem` (một số NV có trách nhiệm/vai trò)

### 3.3 Dữ liệu đầu vào theo tháng
- Chấm công: `ChamCong`, `ChiTietChamCong`
- KPI: `TemplateKPI`, `ChiTieuKPI`, `KyDanhGiaKPI`, `CauHinhThuongKPI`
- Sản lượng:
  - `SanLuongChiaHang` (nếu NV thuộc bộ phận chia hàng)
  - `GiaoHang` (nếu NV thuộc bộ phận giao hàng)

### 3.4 Payroll core theo tháng
- `BangLuong` cho 6 kỳ 2025-06..2025-12
- `SnapshotBangLuong` + snapshots liên quan:
  - `SnapshotSanLuongChiaHang`
  - `SnapshotGiaoHang`
- `RuleTrace` (nếu engine tạo trace khi chạy rule qua API, seed chỉ tạo điều kiện để chạy)
- `PhieuDieuChinh` + `ChiTietPhieuDieuChinh` (mỗi tháng 1-3 phiếu mẫu)
- Audit: `AuditLog`, `AuditSuaDuLieu` (nếu hệ thống auto, không bắt buộc seed bằng tay)

---

## 4) Phân loại nhân viên theo phòng ban (không sửa data)
Vì không được sửa phòng ban/NV có sẵn, hãy phân loại bằng rule:
- Nhân viên nào có `phongBan.ten` chứa “CHIA” hoặc mã phòng ban tương đương → thuộc flow CHIA HÀNG
- Nhân viên nào có `phongBan.ten` chứa “GIAO” → thuộc flow GIAO HÀNG
- Nhân viên phòng ban khác → seed theo flow chung (lương cơ bản + chuyên cần + phụ cấp)

Nếu không match được phòng ban:
- seed tối thiểu: hợp đồng + chấm công + bảng lương cơ bản

---

## 5) Chi tiết dữ liệu cần seed theo từng flow
## 5.1 Chấm công (06→12/2025)
- Tạo chấm công cho mỗi NV theo ngày trong tháng:
  - 70% NV đủ công (26 ngày)
  - 20% NV thiếu 1-2 ngày (nghỉ có phép)
  - 10% NV nghỉ nhiều hoặc có nghỉ không phép (để test mất chuyên cần)
- Sinh tình huống thực tế:
  - đi trễ 1-3 lần/tháng
  - 1-2 tháng có tăng ca (nếu hệ thống support)

## 5.2 KPI (06→12/2025)
- Với nhân viên thuộc phòng ban có KPI:
  - KPI điểm theo tháng
  - Phân phối:
    - 25% điểm 90-100
    - 50% điểm 80-89
    - 20% điểm 70-79
    - 5% thiếu KPI (để test lỗi thiếu dữ liệu)
- Có `CauHinhThuongKPI` mapping điểm → tiền thưởng

## 5.3 Sản lượng chia hàng
Cho nhân viên chia hàng:
- Mỗi ngày tạo số lượng sản phẩm
- Tạo thêm số sản phẩm lỗi:
  - có ngày lỗi > sản lượng (để test phép âm)
- Rule: 320đ/sp, lỗi trừ 5 sp

## 5.4 Giao hàng
Cho nhân viên giao hàng:
- Mỗi ngày tạo tổng khối lượng giao thành công
- Có phạt:
  - phạt trễ giờ (random 0-3 lần/tháng)
  - phạt không lấy phiếu (random 0-2 lần/tháng)

---

## 6) Seed bảng lương 6 kỳ (06→12/2025)
### 6.1 Tạo kỳ lương
Tạo `BangLuong`:
- `thangNam`: 2025-06, 2025-07, ..., 2025-12
- `trangThai`:
  - 2025-06..2025-10: `DA_KHOA` (để test dữ liệu lịch sử)
  - 2025-11: `DA_CHOT`
  - 2025-12: `NHAP` (để test kỳ đang làm)

### 6.2 Snapshot
Tạo snapshot dữ liệu cho các kỳ đã chốt/khoá:
- `SnapshotBangLuong`
- `SnapshotSanLuongChiaHang` / `SnapshotGiaoHang`
Nguyên tắc:
- Snapshot phải “đóng băng” dữ liệu hiệu lực theo thời gian:
  - hợp đồng lương tại kỳ đó
  - phụ cấp/trách nhiệm tại kỳ đó
  - tổng hợp ngày công/kpi/sản lượng

### 6.3 Rule engine
Nếu dự án đã có API chạy rule:
- seed script phải gọi service/endpoint nội bộ để:
  - chạy tính lương
  - sinh `RuleTrace`
  - sinh chi tiết khoản lương
Nếu không có runnable service:
- seed ít nhất phải tạo đầy đủ điều kiện dữ liệu để user vào UI bấm “Chạy rule” là ra kết quả

---

## 7) Seed Adjustment Voucher (Phiếu điều chỉnh)
Mỗi tháng tạo 1-3 phiếu:
- thưởng nóng
- phạt vi phạm
- điều chỉnh truy thu/hoàn trả
Đảm bảo:
- phiếu có trạng thái hợp lệ theo dự án
- áp dụng vào kỳ lương tương ứng hoặc kỳ sau
- liên kết nhân viên

---

## 8) Idempotent & An toàn dữ liệu (BẮT BUỘC)
Seed script phải:
- Detect record đã tồn tại theo key:
  - `thangNam`
  - `bangLuongId + nhanVienId`
  - `nhanVienId + ngay` (chấm công)
  - `nhanVienId + ngay` (sản lượng)
- Dùng upsert hoặc check-before-insert
- Không delete data cũ
- Có log rõ:
  - created
  - updated
  - skipped

---

## 9) Kiểm tra tính đúng sau seed (post-check)
Sau seed xong, tự động chạy các kiểm tra:
- Có đủ 7 kỳ lương (06→12)
- Có chi tiết chấm công cho ít nhất 80% NV
- Có KPI cho ít nhất 60% NV
- Có sản lượng cho NV chia/giao đúng phòng ban
- Kỳ đã khoá không bị thiếu snapshot
- Có ít nhất 10 phiếu điều chỉnh toàn kỳ

Xuất kết quả vào:
`/qa/seed/seed_report_2025.md`

---

## 10) Hướng dẫn chạy (README)
Tạo `/qa/seed/README_SEED_2025.md` gồm:
- cấu hình env cần thiết
- lệnh chạy seed
- cách reset db test (nếu cần)
- lưu ý “không chạy production”
- cách verify UI: vào Bảng lương tháng 10/2025 xem kết quả

---

## 11) Trình tự thực hiện (BẮT BUỘC)
1) Scan DB schema & models
2) Load danh sách phòng ban + nhân viên hiện có
3) Ensure danh mục nền tảng đủ
4) Seed hợp đồng/phụ cấp/trách nhiệm theo hiệu lực
5) Seed chấm công/KPI/sản lượng theo tháng 06→12
6) Tạo kỳ lương + snapshot (kỳ cần)
7) (Nếu có) chạy rule engine tính lương tạo trace
8) Seed adjustment vouchers
9) Post-check + report

---

## 12) Yêu cầu cuối
- Không sửa backend/business logic
- Seed chạy ổn định 2-3 lần liên tiếp không tạo trùng
- Tạo data thật giống vận hành doanh nghiệp
- App sau seed có thể demo đầy đủ workflow
