# ✅ TEST CHECKLIST - HỆ THỐNG PAYROLL

**Ngày tạo:** 14/01/2026

---

## 1. SMOKE TEST (Must Pass)

### Authentication
- [ ] Đăng nhập thành công với credentials đúng
- [ ] Đăng nhập thất bại với credentials sai
- [ ] Đăng xuất xóa session
- [ ] Token hết hạn → redirect đăng nhập

### Quy chế lương
- [ ] Tạo quy chế mới
- [ ] Thêm rule vào quy chế
- [ ] Validate rule expression
- [ ] Preview kết quả tính

### Bảng lương
- [ ] Tạo bảng lương mới
- [ ] Chạy rule engine thành công
- [ ] Sửa chi tiết lương
- [ ] Chốt bảng lương
- [ ] Khóa bảng lương
- [ ] Xuất phiếu lương

### Import Excel
- [ ] Upload file hợp lệ
- [ ] Mapping cột tự động
- [ ] Import thành công

---

## 2. SECURITY TEST

### Authentication / Authorization
- [ ] API không token → 401 Unauthorized
- [ ] API token không hợp lệ → 401
- [ ] API thiếu quyền → 403 Forbidden
- [ ] API có quyền → 200 OK

### Endpoints nhạy cảm (test 401/403/200)
- [ ] POST /api/rule-engine/chay/:bangLuongId
- [ ] POST /api/bang-luong/:id/chot
- [ ] POST /api/import-excel/upload
- [ ] POST /api/quy-che (tạo mới)
- [ ] PUT /api/quy-che/:id (cập nhật)
- [ ] POST /api/khoan-luong (tạo mới)

### Brute Force
- [ ] 10+ login sai liên tiếp → bị block/delay

### Injection Prevention
- [ ] Expression `process.env` → reject
- [ ] Expression `require('fs')` → reject
- [ ] Expression `(() => {})()` → reject
- [ ] Expression hợp lệ `LUONG_CO_BAN * 0.1` → OK

### File Upload
- [ ] File .txt đổi đuôi .xlsx → reject
- [ ] File > 10MB → reject
- [ ] File > 5000 rows → reject
- [ ] File .xlsx hợp lệ → OK

---

## 3. DATA INTEGRITY TEST

### Transaction
- [ ] Rule engine fail giữa chừng → rollback hoàn toàn
- [ ] Không có dữ liệu nửa vời

### Idempotency
- [ ] Chạy rule engine 2 lần → kết quả giống nhau
- [ ] Không duplicate dữ liệu

### Locking
- [ ] 2 user chạy rule engine cùng lúc → 1 thành công, 1 chờ/báo lỗi
- [ ] Bảng lương đã chốt → không cho sửa

---

## 4. PERFORMANCE TEST

### Với 500 nhân viên
- [ ] Chạy rule engine < 60 giây
- [ ] Không timeout
- [ ] Memory usage hợp lý

### Query Performance
- [ ] Không N+1 query
- [ ] Query time < 1s cho list endpoints

---

## 5. REGRESSION TEST

### Sau mỗi fix
- [ ] Backend build success: `npm run build`
- [ ] Frontend build success: `npm run build`
- [ ] Lint pass: `npm run lint`
- [ ] Unit tests pass: `npm run test`

---

## 6. TEST COMMANDS

```bash
# Backend
cd backend
npm run lint
npm run test
npm run build

# Frontend
cd frontend
npm run lint
npm run build
```

---

## 7. KẾT QUẢ TEST

| Test Suite | Pass | Fail | Skip | Ghi chú |
|------------|------|------|------|---------|
| Smoke Test | | | | |
| Security Test | | | | |
| Data Integrity | | | | |
| Performance | | | | |
| Regression | | | | |

---

## 8. SIGN-OFF

- [ ] **QA Lead:** _______________
- [ ] **Dev Lead:** _______________
- [ ] **Security:** _______________
- [ ] **Product Owner:** _______________

**Ngày sign-off:** _______________
