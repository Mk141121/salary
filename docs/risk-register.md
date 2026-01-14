# ⚠️ RISK REGISTER - HỆ THỐNG PAYROLL

**Ngày tạo:** 14/01/2026

---

## ĐÁNH GIÁ RỦI RO

| ID | Rủi ro | Xác suất | Tác động | Mức độ | Mitigation |
|----|--------|----------|----------|--------|------------|
| R1 | API bị truy cập trái phép | Cao | Nghiêm trọng | 🔴 Critical | Implement AuthGuard ngay |
| R2 | Password bị crack | Cao | Nghiêm trọng | 🔴 Critical | Đổi sang bcrypt |
| R3 | Code injection qua Rule Engine | Trung bình | Nghiêm trọng | 🔴 Critical | Dùng safe evaluator |
| R4 | Data inconsistency | Trung bình | Cao | 🟠 High | Transaction + locking |
| R5 | Malicious file upload | Trung bình | Cao | 🟠 High | Validate file |
| R6 | Brute force login | Cao | Trung bình | 🟠 High | Rate limiting |
| R7 | Session hijacking | Trung bình | Cao | 🟠 High | Hash token |
| R8 | XSS steal token | Trung bình | Trung bình | 🟡 Medium | httpOnly cookie |
| R9 | Performance bottleneck | Thấp | Trung bình | 🟡 Medium | Optimize queries |

---

## KẾ HOẠCH MITIGATION

### R1: Truy cập trái phép
- **Giải pháp:** JwtAuthGuard global + RBAC
- **Rollback:** Disable guard nếu có issue
- **Timeline:** Bước 1

### R2: Password weak
- **Giải pháp:** bcrypt với salt rounds 12
- **Migration:** Detect old hash → rehash on login
- **Rollback:** Keep both hash methods temporarily
- **Timeline:** Bước 2

### R3: Code injection
- **Giải pháp:** expr-eval library (whitelist)
- **Testing:** Unit tests cho malicious input
- **Rollback:** Feature flag để switch evaluator
- **Timeline:** Bước 3

### R4: Data inconsistency
- **Giải pháp:** prisma.$transaction()
- **Timeout:** 60 seconds max
- **Rollback:** Automatic by Prisma
- **Timeline:** Bước 4

### R5: Malicious file
- **Giải pháp:** Multi-layer validation
- **Limits:** 10MB, 5000 rows
- **Timeline:** Bước 5

---

## ROLLBACK PLAN

Mỗi bước fix đều có:
1. **Git branch riêng:** `fix/crit-xxx`
2. **Backup point:** Tag trước khi merge
3. **Feature flag:** Có thể disable nếu cần
4. **Test suite:** Must pass trước merge

---

## REMAINING RISKS SAU KHI FIX

| Risk | Mô tả | Mitigation |
|------|-------|------------|
| Insider threat | User có quyền vẫn có thể lạm dụng | Audit log + monitoring |
| Zero-day in deps | Thư viện có lỗ hổng chưa biết | Regular updates |
| Social engineering | Người dùng bị lừa | Training |
