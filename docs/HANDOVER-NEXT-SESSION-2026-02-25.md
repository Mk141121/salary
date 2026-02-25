# HANDOVER NOTE - 2026-02-25

## 1) Trạng thái hiện tại
- Branch: `Salary-dev2`
- Remote: `origin/Salary-dev2`
- Git state: **clean** (không còn staged/unstaged/untracked)
- Local đã đồng bộ remote.

## 2) Các commit đã chốt trong phiên
- `92867a9d` — `refactor(frontend): complete auth header migration and stabilize build warnings`
- `5b599559` — `docs(review): add deep review report and session memory 2026-02-24`

## 3) Kết quả kỹ thuật đã xác nhận
- Backend + Frontend build pass.
- Auth cookie/CSRF flow đã smoke test pass sau khi rebuild backend container:
  - Login: `201`
  - Check token bằng cookie: `200`
  - Logout thiếu CSRF: `401`
  - Logout có CSRF hợp lệ: `201`
- FE auth migration đã hoàn tất cho các service/page còn gắn `Authorization` thủ công.
- Đã xử lý warning `xlsx` trùng static/dynamic import.
- Bundle warning đã giảm, cấu hình tách chunk đã áp dụng trong `frontend/vite.config.ts`.

## 4) File tài liệu mới đã thêm
- `docs/MEMORY-SESSION-2026-02-24.md`
- `project-review-deep-2026-02-24.html`

## 5) Việc ưu tiên cho phiên kế tiếp
Đã hoàn thành trong phiên hiện tại:
1. Smoke test UI + API-backed cho 4 luồng chính.
2. Tạo checklist regression FE tối thiểu.
3. Lập kế hoạch refactor file lớn.

Tài liệu kết quả:
- `docs/SMOKE-UI-REPORT-2026-02-25.md`
- `docs/FE-REGRESSION-CHECKLIST-MINIMAL.md`
- `docs/REFACTOR-PLAN-LARGE-FILES-2026-02-25.md`

## 6) Lệnh resume nhanh
```bash
cd /Volumes/DATA/VSCODE/tinh-luong

git log --oneline --decorate -n 6
git status -sb

cd backend && npm run build
cd ../frontend && npm run build
```

## 7) Ghi chú vận hành
- Nếu chạy/rebuild bằng compose local, cần set `JWT_SECRET` (fail-fast đã bật).
- Cổng backend local: `http://localhost:3001`.
