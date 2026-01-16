# PROMPT CHO CLAUDE: KIỂM TRA TOÀN BỘ DỰ ÁN PAYROLL OPTION B (QA + TEST WORKFLOW + RULE) → REPORT + HƯỚNG DEBUG
> Yêu cầu: **KHÔNG tự ý sửa code** trong quá trình test. Chỉ kiểm tra, tái hiện lỗi, ghi nhận, phân tích nguyên nhân và đề xuất cách debug/fix theo từng bước.

## 0) Vai trò & mục tiêu
Bạn là **QA Lead + Solution Architect**. Nhiệm vụ:
1) Đọc toàn bộ source code dự án
2) Kiểm tra kiến trúc tổng thể + luồng dữ liệu
3) Test end-to-end tất cả module & workflow
4) Đặc biệt test **Rule Engine + Snapshot + Chốt/Khoá + Adjustment**
5) Tự nghĩ ra các **kịch bản test thực tế** dễ gây lỗi (data edge cases, concurrency, idempotent, sai quyền, thiếu snapshot)
6) Tạo **BÁO CÁO REPORT** gồm:
   - Danh sách lỗi / rủi ro
   - Mức độ ưu tiên (P0/P1/P2)
   - Cách tái hiện (steps)
   - Dấu hiệu/log cần kiểm tra
   - Hướng debug (file nào, function nào)
   - Đề xuất fix (nhưng **không sửa**)

## 1) Nguyên tắc bắt buộc
- **Không sửa code**, không commit, không tự refactor
- Chỉ chạy test, log kết quả, phân tích
- Nếu cần thay đổi để test (seed data/config), chỉ được làm dưới dạng:
  - file test tạm thời
  - script seed tạm thời
  - hoặc hướng dẫn thay đổi (nhưng không apply trực tiếp)
- Khi nghi ngờ lỗi liên quan production: phải đánh dấu rõ “có nguy cơ ảnh hưởng dữ liệu thật”

---

## 2) Phạm vi dự án phải test (BẮT BUỘC)
### 2.1 Module nền tảng
- Phòng ban (flat)
- Nhóm nhân viên
- Nhân viên
- Hợp đồng/lương (hiệu lực theo thời gian)
- Ngân hàng nhân viên
- Danh mục khoản lương
- Phụ cấp nhân viên (tuNgay/denNgay)
- Trách nhiệm nhân viên (vaiTro/heSo/tuNgay/denNgay)
- Thông tin công ty

### 2.2 Module nghiệp vụ
- Chấm công
- KPI
- BHXH/Thuế
- Sự kiện thưởng/phạt
- Import Excel (Chia hàng / Giao hàng)
- Rule Engine + UI kéo-thả + validate JSON + preview
- Snapshot kỳ lương
- Bảng lương (NHAP → DA_CHOT → DA_KHOA)
- Phiếu điều chỉnh (Adjustment Voucher)
- Audit log + Audit sửa dữ liệu
- Ứng lương (Bảng ứng lương + khấu trừ kỳ sau) nếu đã tích hợp
- Nghỉ phép (Lite) nếu đã tích hợp
- Sổ lương / lịch sử lương nếu đã tích hợp

---

## 3) Chuẩn bị môi trường test
Bạn phải:
1) Xác định stack (backend/frontend/db) + cách chạy local
2) Xác định thư mục test/unit test/integration test hiện có
3) Xác định `.env` config bắt buộc
4) Dựng database test riêng (không dùng production)
5) Nếu có docker compose, ưu tiên dùng docker

### 3.1 Tạo dataset test chuẩn
Tạo dữ liệu test có chủ đích:
- 3 phòng ban: CHIA HÀNG, GIAO HÀNG, HR
- 2 nhóm: TO_A, CA_NGAY
- 20 nhân viên:
  - 5 nhân viên hợp đồng mới
  - 5 nhân viên có lịch sử đổi mức lương (hiệu lực)
  - 5 nhân viên có phụ cấp chồng thời gian (để test validate)
  - 5 nhân viên nghỉ nhiều ngày/không phép
- 3 kỳ lương liên tiếp: 01/2026, 02/2026, 03/2026

---

## 4) Chiến lược kiểm thử (BẮT BUỘC)
Bạn phải thực hiện 3 lớp:
1) **Static review**: phân tích code, tìm bug logic
2) **API test**: test endpoint theo workflow
3) **UI E2E test**: test theo hành vi người dùng

### 4.1 Các tiêu chí chất lượng bắt buộc
- Idempotent: import, snapshot, chạy rule, ghi nhận adjustment không tạo trùng
- Transaction: thao tác batch phải rollback đúng
- Locking: DA_CHOT/DA_KHOA không sửa được
- RBAC: đúng quyền mới thao tác được
- Audit: mọi thao tác quan trọng đều ghi log
- Trace: rule chạy có trace đầy đủ

---

## 5) Các workflow bắt buộc test end-to-end
### 5.1 Workflow payroll chuẩn
1) Setup danh mục + nhân viên + hợp đồng
2) Setup phụ cấp + trách nhiệm
3) Setup chấm công
4) Setup KPI
5) Import Chia hàng / Giao hàng
6) Tạo kỳ lương
7) Snapshot kỳ lương
8) Chạy rule engine
9) Kiểm tra trace + bảng lương
10) Chốt kỳ
11) Khoá kỳ
12) Xuất phiếu lương/chuyển khoản
13) Sai lệch sau khoá → tạo phiếu điều chỉnh → áp dụng kỳ sau

### 5.2 Workflow import sản lượng
- Import file ngày 1 → chạy ok
- Import lại file ngày 1 (overwrite) → không tạo trùng
- Import file sai format → validate báo lỗi
- Import trùng nhân viên → xử lý đúng theo spec
- Admin sửa data import sau import → audit đầy đủ

### 5.3 Workflow rule engine
- Validate JSON rule
- Preview rule theo 1 nhân viên
- Run rule toàn bộ phòng ban
- Rule cộng dồn nhiều nguồn
- Rule cho phép âm (Chia hàng trừ lỗi)
- Rule thứ tự ưu tiên
- Rule fail mid-way → rollback

### 5.4 Snapshot + Mapping
- Snapshot chụp đúng “data hiệu lực”
- Sau snapshot:
  - sửa phụ cấp/hợp đồng → snapshot không bị ảnh hưởng
- Snapshot nhiều lần có idempotent/khóa phiên bản

### 5.5 Workflow ứng lương (nếu có)
- tạo bảng ứng lương
- tính eligibility theo ngày công lũy kế
- nghỉ nhiều ngày → không cho ứng
- chốt/khoá bảng ứng
- ghi nhận khấu trừ vào kỳ lương → không tạo trùng

### 5.6 Workflow nghỉ phép (nếu có)
- tạo đơn nghỉ → gửi duyệt → duyệt
- mapping sang ngày công/chấm công
- nghỉ không phép ảnh hưởng chuyên cần + ứng lương

---

## 6) Danh sách kịch bản test lỗi (bạn phải tự nghĩ & chạy)
Tạo ít nhất 30 kịch bản. Dưới đây là gợi ý khung, bạn phải bổ sung thêm.

### A. Data edge cases (10 kịch bản)
- Phụ cấp overlap tuNgay/denNgay
- Hợp đồng lương overlap
- Nhân viên nghỉ 0.5 ngày / giờ
- Import sản lượng có ngày ngoài kỳ
- Sản lượng lỗi lớn hơn sản lượng đạt → kết quả âm
- KPI thiếu dữ liệu
- Chấm công thiếu ngày
- Nhân viên đổi phòng ban giữa tháng (nếu model không có lịch sử thì test rủi ro)
- Rule sử dụng biến chưa tồn tại
- Khoản lương chưa được khai báo nhưng rule tạo dòng

### B. Workflow & trạng thái (10 kịch bản)
- Chạy rule khi chưa snapshot
- Snapshot khi chưa import đủ data
- Khoá kỳ rồi vẫn import được (nếu bug)
- Adjustment áp dụng vào kỳ đã khoá
- Mo-khoa không audit
- Import song song 2 file cùng lúc (race)
- Run rule song song 2 lần (double run)
- Export khi không quyền
- Truy cập phòng ban khác không quyền (nếu có filter)
- Admin sửa data sau import mà không audit

### C. Concurrency/Idempotent (10 kịch bản)
- Call snapshot 2 lần liên tiếp
- Call ghi nhận khấu trừ ứng lương 2 lần
- Import idempotent (upsert theo ngày/nv)
- Rule engine chạy lại → không nhân đôi dòng
- Adjustment voucher tạo lại
- Duplicate click UI tạo kỳ lương
- API retry network dẫn tới duplicate record
- Multi-tab chỉnh bảng lương
- Deadlock transaction
- Long-running rule engine performance

---

## 7) Công cụ test yêu cầu
Bạn phải thực hiện:
- API test bằng Postman/Insomnia hoặc script (nếu repo có)
- Unit test nếu có (jest/vitest/mocha… hoặc backend test framework)
- E2E test UI (Playwright/Cypress nếu có)
- Nếu chưa có, phải đề xuất tạo framework test nhưng **không viết code test mới** trừ khi cần tối thiểu để chạy kiểm thử tự động.

---

## 8) Yêu cầu REPORT đầu ra (RẤT QUAN TRỌNG)
Xuất 1 file report markdown:
`/reports/QA_REPORT_PAYROLL.md`

Report bắt buộc có cấu trúc:

### 8.1. Tóm tắt điều hành
- Tổng số lỗi
- P0/P1/P2
- Module nguy cơ cao
- Quick wins

### 8.2. Danh sách lỗi chi tiết
Mỗi lỗi ghi theo format:

- **ID**: BUG-xxx
- **Mức độ**: P0/P1/P2
- **Module**:
- **Mô tả**:
- **Bước tái hiện**:
- **Kết quả mong đợi**:
- **Kết quả thực tế**:
- **Ảnh hưởng**:
- **Log/Trace cần xem**:
- **Giả thuyết nguyên nhân**:
- **Hướng debug**:
  - file path
  - function/class
  - query/sql
- **Đề xuất fix** (chỉ mô tả, không sửa)

### 8.3. Rủi ro kiến trúc
- Snapshot
- Rule engine
- Workflow locking
- Idempotent
- Data consistency

### 8.4. Checklist Go-live
- các điều kiện bắt buộc trước khi chạy thật
- monitoring/logging cần có

---

## 9) Kết quả cuối cùng bạn phải trả ra
1) QA Report như trên
2) Danh sách test cases đã chạy + pass/fail
3) Danh sách khuyến nghị fix theo thứ tự ưu tiên
4) Không sửa bất kỳ file nào ngoài report (trừ file log tạm)

---

## 10) Hướng dẫn cách làm việc (cụ thể)
Bạn phải làm theo trình tự:
1) Scan codebase: modules, routes, services, DB schema
2) Vẽ sơ đồ dữ liệu chính (bảng lương, snapshot, rule, adjustment)
3) Chạy dự án local + seed dataset test
4) Chạy test API theo workflow
5) Chạy UI test theo workflow
6) Chạy các edge cases + concurrency
7) Tổng hợp report

**Nhắc lại**: không tự ý sửa code trong quá trình test.
