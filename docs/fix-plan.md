# 🛠️ KẾ HOẠCH FIX TOÀN DIỆN HỆ THỐNG PAYROLL

**Ngày tạo:** 14/01/2026  
**Cập nhật:** 14/01/2026 09:35  
**Trạng thái:** ✅ HOÀN THÀNH GIAI ĐOẠN A + B

---

## 📋 TỔNG QUAN

Kế hoạch này khắc phục 32 lỗi được phát hiện trong audit, chia thành 4 giai đoạn:

| Giai đoạn | Mục tiêu | Số lỗi | Ưu tiên | Trạng thái |
|-----------|----------|--------|---------|------------|
| A | Đóng lỗ hổng Critical | 5 | P0 | ✅ Hoàn thành |
| B | Harden Security | 8 | P1 | ✅ Hoàn thành |
| C | Ổn định & Hiệu năng | 12 | P2 | 🔄 Một phần |
| D | Dọn dẹp & Quality | 7 | P3 | ⬜ Chưa bắt đầu |

---

## GIAI ĐOẠN A: ĐÓNG LỖ HỔNG (P0 / Critical) ✅

### 1. CRIT-001: Auth + RBAC ✅
- [x] Tạo `JwtAuthGuard` → `backend/src/common/guards/jwt-auth.guard.ts`
- [x] Tạo `RolesGuard` → `backend/src/common/guards/roles.guard.ts`
- [x] Tạo `PermissionsGuard` → `backend/src/common/guards/permissions.guard.ts`
- [x] Tạo decorators: `@CongKhai()`, `@VaiTro()`, `@Quyen()`
- [x] Apply global guard → `app.module.ts` providers
- [x] Đánh dấu public routes

### 2. CRIT-003: Password bcrypt ✅
- [x] Cài bcrypt → `package.json`
- [x] Thay hashPassword() → async bcrypt → `rbac.service.ts`
- [x] Migration strategy cho user cũ (hỗ trợ SHA-256 legacy)

### 3. CRIT-002: Safe Expression Evaluator ✅
- [x] Cài expr-eval → `package.json`
- [x] Tạo safe-eval utility → `backend/src/common/utils/safe-eval.ts`
- [x] Xóa new Function() → thay bằng expr-eval parser
- [x] Whitelist biến cho phép + dangerous patterns check

### 4. CRIT-004: Rule Engine Transaction ✅
- [x] Wrap trong $transaction → `rule-engine-executor.service.ts`
- [x] Fix TypeScript error
- [x] Thêm locking mechanism (`FOR UPDATE NOWAIT`)
- [x] Đảm bảo idempotent

### 5. CRIT-005: Validate Excel Upload ✅
- [x] Validate mimetype → `ExcelFileValidationPipe`
- [x] Validate file size (≤10MB)
- [x] Check magic bytes (XLSX/XLS signatures)
- [x] Giới hạn row count

---

## GIAI ĐOẠN B: SECURITY HARDENING (P1 / High) ✅

### 6. HIGH-001: Token không plaintext ✅
- [x] Hash token trước khi lưu DB → `hashToken()` in `rbac.service.ts`

### 7. HIGH-002: CORS từ ENV ✅
- [x] Đọc origin từ environment variable → `main.ts`

### 8. HIGH-005: Rate Limiting ✅
- [x] Cài @nestjs/throttler
- [x] Config 3 tiers (short/medium/long) → `app.module.ts`

### 9. HIGH-007 + HIGH-008: Frontend Auth ✅
- [x] Fix RequireAuth → `PrivateRoute.tsx`
- [x] Secure token storage

### 10. HIGH-004: Chốt/Khóa lương ✅
- [x] Cấm sửa sau chốt
- [x] Mở khóa cần ADMIN + lý do (≥10 ký tự)

### 11. HIGH-006: Audit Log ✅
- [x] Ghi log rule engine → `AuditLogService.ghiLogRuleEngine()`
- [x] Ghi log chốt/khóa → `ghiLogChotBangLuong()`, `ghiLogMoKhoaBangLuong()`

---

## GIAI ĐOẠN C: ỔN ĐỊNH & HIỆU NĂNG (P2 / Medium) 🔄

- [x] Fix $transaction TypeScript error
- [x] Config ngày công chuẩn → `NGAY_CONG_CHUAN_MAC_DINH` constant
- [ ] Fix N+1 queries
- [ ] Thêm database indexes
- [ ] Validate overlap quy chế/phụ cấp
- [ ] Import Excel an toàn hơn
- [ ] Soft delete

---

## GIAI ĐOẠN D: DỌN DẸP & QUALITY (P3 / Low)

- [ ] Xóa console.log production
- [ ] Chuẩn hóa naming
- [ ] Thêm unit tests
- [ ] Performance testing

---

## TIẾN ĐỘ THỰC HIỆN

| Bước | Mô tả | Trạng thái | Ghi chú |
|------|-------|------------|---------|
| 0 | Baseline + Docs | ✅ Hoàn thành | |
| 1 | Auth + RBAC | ✅ Hoàn thành | JwtAuthGuard, RolesGuard, PermissionsGuard |
| 2 | Bcrypt | ✅ Hoàn thành | + hỗ trợ migrate SHA-256 |
| 3 | Safe Eval | ✅ Hoàn thành | expr-eval với whitelist |
| 4 | Transaction | ✅ Hoàn thành | + FOR UPDATE NOWAIT locking |
| 5 | Validate Excel | ✅ Hoàn thành | ExcelFileValidationPipe |
| 6 | Token Hash | ✅ Hoàn thành | SHA-256 hash |
| 7 | Rate Limiting | ✅ Hoàn thành | 3 tiers throttling |
| 8 | Audit Log | ✅ Hoàn thành | Rule Engine + Chốt/Khóa |
| 9 | Frontend Auth | ✅ Hoàn thành | PrivateRoute component |
| 10 | Database Sync | ✅ Hoàn thành | prisma db push |
| 11 | Build + Test | ✅ Hoàn thành | Server running @ :3001 |
