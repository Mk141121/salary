# 🛠️ PROMPT: KẾ HOẠCH FIX TOÀN DIỆN HỆ THỐNG PAYROLL (TỪNG BƯỚC AN TOÀN) + DỌN CODE/FILE THỪA

## 0) VAI TRÒ
Bạn là **Technical Lead / Principal Engineer** chịu trách nhiệm:
- Khắc phục toàn bộ lỗi trong dự án Payroll
- Đảm bảo hệ thống ổn định trước Go-live
- Dọn code/file thừa an toàn
- Không tạo thêm lỗi mới

Bạn phải làm việc theo quy trình:
✅ phân tích → ✅ kế hoạch → ✅ thay đổi nhỏ có kiểm soát → ✅ test → ✅ xác nhận

---

## 1) INPUT (BẮT BUỘC ĐỌC)
Bạn có báo cáo audit dự án tại: `project-report.md`.

Các lỗi nổi bật cần xử lý theo ưu tiên:
- CRIT-001: API không có Authentication/Authorization
- CRIT-002: Rule Engine dùng new Function() unsafe eval
- CRIT-003: Password hash SHA-256 (không salt) thay vì bcrypt
- CRIT-004: Thiếu transaction khi chạy Rule Engine
- CRIT-005: Upload Excel không validate (mimetype/size/magic bytes/rows)
- High: Token lưu plaintext DB; CORS quá rộng; thiếu rate limit; sửa sau chốt; RequireAuth bypass; token localStorage; thiếu audit log rule engine...
- Medium: N+1 query; thiếu unique constraint; overlap quy chế; import Excel xóa dữ liệu; thiếu soft delete; hardcode ngày công 26; $transaction TS error…
- Low: console.log prod, thiếu test, mix tiếng Anh/Việt…

⚠️ Mục tiêu cuối: Sửa triệt để và xác minh hệ thống hoạt động ổn định.

---

## 2) QUY TẮC LÀM VIỆC (CỰC QUAN TRỌNG – KHÔNG VI PHẠM)
### 2.1. Không phá hệ thống
- Mỗi PR/commit phải nhỏ, có mục tiêu rõ ràng
- Không refactor lớn khi đang fix security
- Không đổi API contract nếu không cần

### 2.2. Không tạo lỗi mới
- Bắt buộc chạy test/build sau mỗi bước
- Thay đổi phải có rollback plan

### 2.3. Không xóa file bừa
- Dọn file thừa chỉ khi:
  - xác định không được import/require ở đâu
  - không nằm trong build output
  - không dùng trong runtime
  - đã có bản thay thế
- Không xóa “tạm thời” — phải có checklist xác nhận

### 2.4. Không sửa logic nghiệp vụ lương ngoài phạm vi lỗi
- Rule engine thay evaluator nhưng kết quả phải giữ đúng logic (trừ khi logic hiện tại nguy hiểm)

---

## 3) CHIẾN LƯỢC FIX TOÀN DIỆN (ROADMAP)
Chia 4 giai đoạn:

### GIAI ĐOẠN A — ĐÓNG LỖ HỔNG (P0 / Critical)
Mục tiêu: đủ an toàn để chạy môi trường staging.

1) Implement AuthGuard + RBAC (CRIT-001)
2) Replace unsafe eval trong Rule Engine (CRIT-002)
3) Đổi SHA-256 → bcrypt + migration strategy (CRIT-003)
4) Wrap Rule Engine trong transaction + idempotent (CRIT-004 + HIGH-003)
5) Validate upload Excel (CRIT-005)

### GIAI ĐOẠN B — HARDEN SECURITY (P1 / High)
6) Session token: không plaintext DB (HIGH-001)
7) CORS config theo env (HIGH-002)
8) Rate limiting (HIGH-005)
9) Frontend auth guard đúng chuẩn + token storage an toàn (HIGH-007, HIGH-008)
10) Không cho sửa sau chốt/khoá; mở khoá phải có quyền đặc biệt + lý do (HIGH-004)
11) Audit log cho các thao tác nhạy cảm (HIGH-006)

### GIAI ĐOẠN C — ỔN ĐỊNH & HIỆU NĂNG (P2 / Medium)
12) Fix N+1 queries + aggregate query (MED-001)
13) Fix $transaction TS error (MED-011)
14) Add unique constraint + indexes
15) Validate overlap quy chế + overlap phụ cấp
16) Import Excel không được “xóa sạch” dữ liệu thiếu kiểm soát
17) Soft delete cho bảng quan trọng
18) Loại bỏ hardcode ngày công 26 → cấu hình

### GIAI ĐOẠN D — DỌN DẸP + QUALITY
19) Xóa console.log prod
20) Chuẩn hóa naming tiếng Việt
21) Thêm test tối thiểu cho module critical
22) Build & performance testing (500+ nhân viên)

---

## 4) KẾ HOẠCH THỰC THI (THEO TỪNG BƯỚC — BẮT BUỘC)
Bạn phải thực hiện lần lượt như sau, không nhảy bước:

---

### BƯỚC 0: TẠO “BASELINE” AN TOÀN (KHÔNG ĐỤNG CODE)
✅ Output cần tạo:
- `docs/fix-plan.md` (kế hoạch)
- `docs/risk-register.md` (rủi ro + mitigation)
- `docs/test-checklist.md` (checklist test)

✅ Tạo các lệnh test chuẩn:
- Backend: `npm run lint`, `npm run test`, `npm run build`
- Frontend: `npm run lint`, `npm run build`

✅ Kết luận baseline:
- Những phần đang fail compile/build phải ghi rõ.

---

### BƯỚC 1: AUTH + RBAC (CRIT-001)
#### Yêu cầu:
- Global `JwtAuthGuard`
- `RolesGuard` / `PermissionsGuard` theo metadata
- Decorators:
  - `@CongKhai()` (public)
  - `@VaiTro(...)`
  - `@Quyen(...)`
- Các route public:
  - đăng nhập
  - tài liệu swagger
  - health check

#### Output:
- Guard + decorator + module auth chuẩn NestJS
- Apply guard toàn bộ controller
- Tất cả API không token → 401
- Token đúng nhưng thiếu quyền → 403

#### Test bắt buộc:
- test 401/403/200 cho 5 endpoint nhạy cảm:
  - chạy rule engine
  - chốt bảng lương
  - import excel
  - tạo/sửa quy chế
  - tạo/sửa khoản lương

---

### BƯỚC 2: PASSWORD SHA-256 → BCRYPT (CRIT-003)
#### Yêu cầu:
- Dùng bcryptjs saltRounds >= 12
- Không break user cũ ngay lập tức:
  - phương án migration:
    - detect hash cũ
    - login ok thì rehash bcrypt
    - hoặc force đổi mật khẩu

#### Output:
- `hashMatKhau()` async bcrypt
- `kiemTraMatKhau()` compare bcrypt
- Data migration strategy document

#### Test:
- user mới hash dạng `$2b$`
- 2 lần hash cùng pass khác nhau
- login pass đúng/sai

---

### BƯỚC 3: SAFE EXPRESSION EVALUATOR (CRIT-002)
#### Yêu cầu:
- XÓA HOÀN TOÀN `new Function()`
- Thay bằng thư viện an toàn (expr-eval hoặc mathjs hardened)
- Whitelist biến:
  - LUONG_CO_BAN
  - HE_SO_TRACH_NHIEM
  - CAP_TRACH_NHIEM
  - ... (liệt kê theo domain)
- Parse expression và reject:
  - function call
  - access property
  - keyword nguy hiểm

#### Output:
- `TinhBieuThucService` (service riêng)
- Unit tests cho:
  - expression hợp lệ
  - expression độc hại bị reject

---

### BƯỚC 4: RULE ENGINE TRANSACTION + IDEMPOTENT (CRIT-004 + HIGH-003)
#### Yêu cầu:
- Wrap toàn bộ chạy rule engine trong `prisma.$transaction`
- Fix compile `$transaction` issue nếu có
- Idempotent:
  - chạy lại không được cộng dồn sai
  - trước khi chạy → delete dữ liệu RULE theo bang_luong_id
  - tạo mới nhất quán
- Locking:
  - optimistic lock (version) hoặc DB lock theo bang_luong_id

#### Output:
- `chayRuleEngine()` đảm bảo:
  - fail giữa chừng → rollback toàn bộ
  - 2 user chạy song song → một user bị block/queue/báo lỗi

#### Test:
- simulate lỗi giữa loop → không có dữ liệu nửa vời
- run 2 lần → kết quả giống nhau

---

### BƯỚC 5: VALIDATE FILE UPLOAD EXCEL (CRIT-005)
#### Yêu cầu:
- Validate:
  - mimetype
  - extension
  - size (<= 10MB)
  - magic bytes zip header PK..
  - giới hạn row count
  - giới hạn sheet/columns
- Không parse nếu fail
- Message lỗi rõ tiếng Việt

#### Output:
- Controller interceptor fileFilter + limits
- Service validate buffer
- Test:
  - file fake .xlsx reject
  - file > size reject
  - file rows > max reject

---

## 5) GIAI ĐOẠN B: SECURITY HARDENING (P1)
### 5.1 Token/session
- Không lưu plaintext token trong DB
- Nếu dùng refresh token:
  - lưu hash(token) + expiresAt
  - revoke token

### 5.2 CORS
- origin đọc từ ENV
- production chỉ allow domain hợp lệ
- không hardcode localhost

### 5.3 Rate limit
- @nestjs/throttler
- stricter cho login

### 5.4 Frontend auth
- Không dùng redirect thô
- Router guard đúng:
  - block render
  - loading state
- Không lưu access token plaintext localStorage:
  - dùng httpOnly cookie (khuyến nghị)
  - hoặc session memory + refresh cookie

### 5.5 Quy trình chốt/khoá
- Bảng lương DA_CHOT/KHOA:
  - cấm sửa
- Mở khoá:
  - chỉ ADMIN
  - bắt buộc lý do
  - ghi audit log

### 5.6 Audit log
- Ghi log các hành động:
  - chạy rule engine
  - chốt/khoá/mở khoá
  - sửa quy chế/rule
  - import excel
  - duyệt thưởng/phạt

---

## 6) GIAI ĐOẠN C: DATA + PERF + STABILITY
### 6.1 Fix N+1
- tổng hợp bằng GROUP BY
- Prisma aggregate

### 6.2 Unique constraints + indexes
- unique snapshot tháng/năm/phòng ban
- indexes cho:
  - chi_tiet_bang_luong(bang_luong_id, nhan_vien_id)
  - rule_trace(bang_luong_id, nhan_vien_id)

### 6.3 Validate overlap
- Quy chế lương: không overlap thời gian trong cùng phòng ban
- Phụ cấp: không overlap thời gian trong cùng nhân viên + khoản

### 6.4 Import Excel an toàn
- Không được “xóa hết rồi insert”
- Dùng cơ chế:
  - import preview
  - confirm
  - upsert theo nhan_vien_id + khoan_luong_id
- Có backup snapshot trước import

### 6.5 Soft delete
- thêm deletedAt
- không xóa thật

### 6.6 Ngày công chuẩn
- đưa vào config (theo phòng ban/tháng)
- không hardcode 26

---

## 7) DỌN FILE/CODE THỪA AN TOÀN (BẮT BUỘC)
Bạn phải làm theo quy trình:

### 7.1 Tạo danh sách “nghi thừa”
- file không import
- component không dùng
- api endpoint không gọi
- env/const không dùng

### 7.2 Kiểm tra reference
- full-text search
- build graph (tsc, eslint no-unused-vars)
- không có reference mới xóa

### 7.3 Xóa theo batch nhỏ
- mỗi batch 1 nhóm file
- sau mỗi batch:
  - build backend
  - build frontend
  - chạy smoke test

### 7.4 Output
- `docs/cleanup-report.md`:
  - danh sách đã xóa
  - lý do xóa
  - xác minh build pass

---

## 8) TEST & QA BẮT BUỘC TRƯỚC KHI KẾT THÚC
### 8.1 Smoke test (must pass)
- login
- tạo quy chế + rule
- validate + preview
- tạo bảng lương
- chạy rule engine
- chốt lương
- khóa lương
- xuất phiếu lương (nếu có)
- import excel (file hợp lệ)

### 8.2 Security test
- API call không token → 401
- token thiếu quyền → 403
- brute force login bị chặn
- expression injection bị reject
- upload file độc hại bị reject

### 8.3 Performance test
- chạy rule engine với 500 nhân viên
- thời gian < 60s (mục tiêu)
- không timeout transaction

---

## 9) ĐẦU RA CUỐI CÙNG (CLAUDE PHẢI XUẤT)
Bạn phải xuất:
1) `docs/fix-report.md` gồm:
   - Danh sách lỗi đã fix (mapping theo ID audit)
   - Thay đổi chính
   - Các risk còn lại
2) `docs/test-results.md`
3) `docs/cleanup-report.md`
4) Checklist go-live

⚠️ Nếu còn lỗi Critical/High chưa fix → phải nêu rõ “BLOCK GO-LIVE” và vì sao.

---

## 10) YÊU CẦU TỐI QUAN TRỌNG
- Làm tuần tự, không vội
- Không sửa bừa
- Không xóa bừa
- Bất kỳ thay đổi nào cũng phải có test
- Sau cùng hệ thống phải:
  - ổn định
  - mượt mà
  - an toàn
  - dễ maintain

BẮT ĐẦU THỰC HIỆN NGAY.
