# SMOKE UI REPORT - 2026-02-25

## 1) Mục tiêu
Kiểm tra nhanh 4 luồng FE trọng yếu sau đợt migrate auth cookie + CSRF:
1. Đăng nhập/đăng xuất
2. Import/Export nhân viên
3. Upload file
4. Chatbot widget

## 2) Môi trường test
- Frontend dev server: `http://localhost:3000`
- Backend API: `http://localhost:3001`
- Auth: cookie `TL_AUTH_TOKEN` + `TL_CSRF_TOKEN`

## 3) Kết quả smoke

### A. Browser load check (UI routes)
- `GET /dang-nhap` mở được trên browser.
- `GET /` mở được trên browser.
- `GET /nhan-vien` mở được trên browser (route protected).
- `GET /nhan-vien/import-export` mở được trên browser (route protected).

### B. API-backed flow check (tương ứng UI)

#### 1) Đăng nhập/đăng xuất
- Login: `201`
- Check token (cookie): `200`
- Logout (CSRF hợp lệ): `201`

#### 2) Import/Export nhân viên
- Danh sách trường: `200`
- Download template: `200`
- Upload đọc header (POST multipart + CSRF): `201`
- Upload gợi ý mapping (POST multipart + CSRF): `201`

#### 3) Upload file (hành vi CSRF)
- POST multipart **không có** `X-CSRF-Token`: `401` (đúng kỳ vọng bảo mật)
- POST multipart **có** `X-CSRF-Token`: `201`

#### 4) Chatbot widget
- FAQs endpoint: `200`
- Ask endpoint: `200`
- Response có payload `success=true` và `data.answer`.

## 4) Kết luận
- Các luồng chính đã ổn định sau migration auth.
- CSRF protection hoạt động đúng (chặn request thiếu token).
- Không phát hiện lỗi chặn luồng ở mức smoke test.

## 5) Ghi chú
- Đây là smoke test nhanh ở mức route + API-backed flow.
- Nên bổ sung e2e UI interaction đầy đủ (nhập form/click/validation) trong sprint kế tiếp.
