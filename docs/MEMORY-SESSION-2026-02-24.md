# MEMORY SESSION - 2026-02-24

## 1) Mục tiêu đã làm trong phiên

### Security / Auth / RBAC
- Đã harden RBAC bootstrap endpoint trong `rbac.controller.ts`:
  - Chuyển `khoi-tao/*` sang `@VaiTro('ADMIN')`
  - Thêm chặn production qua env `ALLOW_RBAC_BOOTSTRAP`
- Đã harden Docker/Compose:
  - `JWT_SECRET` fail-fast (`${JWT_SECRET:?JWT_SECRET is required}`)
  - Đồng bộ ở:
    - `docker-compose.yml`
    - `docker-compose.v2.yml`
    - `docker-compose.prod.yml`
    - `production/docker-compose.yml`
- Đã fix Docker backend startup tránh phụ thuộc prisma runtime generate network:
  - `prisma db push --skip-generate --accept-data-loss` trong Dockerfile backend.

### Permission FE/BE
- Đã tạo constants + normalize permission FE:
  - `frontend/src/config/permissions.ts`
- Đã refactor:
  - `frontend/src/contexts/AuthContext.tsx`
  - `frontend/src/config/sidebarMenu.ts`

### Auth migration (P0 theo review)
- Đã implement hướng cookie + CSRF (giữ fallback Bearer để không downtime):
  - Backend:
    - `backend/src/common/utils/http-auth.util.ts`
    - `backend/src/common/guards/jwt-auth.guard.ts`
    - `backend/src/modules/rbac/rbac.controller.ts`
    - `backend/src/main.ts`
  - Frontend:
    - `frontend/src/services/httpAuth.ts`
    - `frontend/src/services/api.ts`
    - `frontend/src/services/rbacApi.ts`

### Scheduling TODO (P1 theo review)
- Đã fix TODO lấy actor từ token ở Scheduling:
  - `backend/src/modules/scheduling/scheduling.controller.ts`
  - `backend/src/common/decorators/nguoi-dung-hien-tai.decorator.ts` (bổ sung `nhanVienId`)
- Đã implement sync expected attendance khi publish lịch:
  - `backend/src/modules/scheduling/scheduling.service.ts`
  - Sync vào `ChiTietChamCong` (`upsert` theo `nhanVienId + ngay`, set `caLamViecId`, `gioVaoDuKien`, `gioRaDuKien`).

### Dynamic Tailwind class (P1 theo review)
- Đã loại bỏ class động dạng `bg-${...}` trong:
  - `frontend/src/pages/reports/ReportsPage.tsx`
  - `frontend/src/pages/DuyetNghiPhep.tsx`
  - `frontend/src/pages/DonNghiCuaToi.tsx`

---

## 2) Build/verify đã chạy
- Backend build: pass (`npm run build` trong `backend`)
- Frontend build: pass (`npm run build` trong `frontend`)
- Có cảnh báo chunk lớn frontend (~1.79MB) và xlsx dynamic import warning (chưa xử lý trong phiên này).

---

## 3) Commit history quan trọng
### Đã có trên remote
- `5b2941f6` chore(security): require JWT_SECRET in all compose variants
- `b34d56a8` refactor(frontend): centralize permission codes and normalize auth checks

### Mới tạo trong phiên này (chưa push)
- `a6d81dc3` feat(security,scheduling,frontend): finalize P1 hardening batch

Branch hiện tại:
- `Salary-dev2` đang **ahead 1** so với `origin/Salary-dev2`.

---

## 4) Trạng thái git hiện tại (cuối phiên)
- `TOTAL 148`
- `STAGED 1`
- `UNSTAGED 148`
- `UNTRACKED 1`
- Untracked report file có tồn tại: `project-review-deep-2026-02-24.html`

Ghi chú:
- Working tree đang nhiễu nhiều file `backend/dist/**`, `frontend/dist/**` và artifacts build.
- Cần dọn trước khi làm tiếp để tránh commit nhầm.

---

## 5) Stash quan trọng
- `stash@{0}: On Salary-dev2: wip: post-push cleanup snapshot 2026-02-24`

Dùng khi cần:
- Xem: `git stash list`
- Khôi phục: `git stash pop stash@{0}`

---

## 6) Việc còn dở / cần verify sáng mai
1. **Push commit mới**
   - `git push origin Salary-dev2`
2. **Xác nhận auth cookie flow thực tế**
   - Dù build pass, smoke curl cookie đã từng trả `401` ở check/logout trong một lần test.
   - Cần test lại sạch với backend chạy bản mới + kiểm tra `Set-Cookie` và header `X-CSRF-Token`.
3. **Dọn working tree artifacts**
   - Quyết định chính sách cho `dist` (track/untrack triệt để) để không nhiễu git status.
4. **Nối migration auth ra các service FE còn dùng localStorage trực tiếp**
   - Một số service/page vẫn tự set `Authorization` thủ công từ localStorage.

---

## 7) Lệnh resume nhanh ngày mai
```bash
cd /Volumes/DATA/VSCODE/tinh-luong

git log --oneline --decorate -n 5
git status -sb
git stash list -n 3

# push commit mới nếu ok
git push origin Salary-dev2

# build verify
cd backend && npm run build
cd ../frontend && npm run build
```

---

## 8) Tài liệu review gốc tham chiếu
- `project-review-deep-2026-02-24.html`
- File này được khôi phục thành công từ stash trong phiên.
