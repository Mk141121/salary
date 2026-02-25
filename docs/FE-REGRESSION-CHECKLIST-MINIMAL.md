# FE REGRESSION CHECKLIST (MINIMAL)

## A) Manual smoke (bắt buộc trước release)

### 1. Auth
- [ ] Mở `/dang-nhap`, đăng nhập thành công.
- [ ] Refresh trang sau login vẫn giữ session.
- [ ] Logout thành công, quay về màn login.
- [ ] Sau logout, truy cập route protected bị chặn/redirect đúng.

### 2. Import/Export nhân viên
- [ ] Vào trang Import/Export, tải template thành công.
- [ ] Upload template, đọc header thành công.
- [ ] Gợi ý mapping trả dữ liệu hợp lệ.
- [ ] Export file thành công với filter cơ bản.

### 3. Upload file
- [ ] Upload 1 file hợp lệ thành công.
- [ ] Upload file vượt limit hiển thị lỗi đúng.
- [ ] Remove file cập nhật UI/state đúng.

### 4. Chatbot widget
- [ ] Widget mở/đóng ổn định.
- [ ] FAQ tải được.
- [ ] Gửi câu hỏi nhận phản hồi.
- [ ] Không crash khi API trả lỗi (fallback message hiển thị).

### 5. Core navigation
- [ ] Sidebar/menu vẫn hiển thị đúng theo quyền.
- [ ] Chuyển route chính không lỗi console nghiêm trọng.

## B) E2E smoke tối thiểu (đề xuất)

### Spec 01: auth-smoke
- Login -> vào dashboard -> logout -> verify redirect login.

### Spec 02: import-export-smoke
- Login -> mở import/export -> tải template -> upload file mẫu -> verify response success.

### Spec 03: chatbot-smoke
- Login -> mở widget -> gửi câu hỏi -> verify có answer.

### Spec 04: upload-smoke
- Login -> vào màn có `FileUpload` -> upload file hợp lệ -> verify preview/success.

## C) Gate pass/fail
- Pass khi **100%** checklist A pass.
- Nếu bất kỳ mục A fail => không release, mở hotfix.
