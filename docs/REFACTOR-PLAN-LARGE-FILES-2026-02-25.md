# REFACTOR PLAN - LARGE FILES (2026-02-25)

## 1) Mục tiêu
Giảm rủi ro regression, tăng tốc phát triển bằng cách tách các file quá lớn thành cấu trúc dễ test/dễ maintain.

## 2) Ưu tiên 1: `frontend/src/pages/ChiTietNhanVien.tsx`

### Vấn đề hiện tại
- File rất lớn (~1200 dòng), nhiều concern trộn chung: data fetch, form state, modal state, rendering.

### Kế hoạch tách
1. **Container page**: giữ routing + orchestration.
2. **Hooks**:
   - `useNhanVienDetailData` (fetch/query + mutation)
   - `useNhanVienDetailForm` (state + validation)
   - `useNhanVienDetailActions` (handlers submit/update/delete)
3. **UI components**:
   - `NhanVienProfileSection`
   - `NhanVienContractSection`
   - `NhanVienHistorySection`
   - `NhanVienAttachmentsSection`
4. **Types/constants**:
   - tách type local về `types/nhanVienDetail.ts`
   - tách mapping enum/status về constants file.

### Definition of Done
- File page chính < 350 dòng.
- Luồng chính giữ nguyên behavior.
- Có smoke test manual cho update nhân viên.

## 3) Ưu tiên 2: `backend/src/modules/bang-luong/bang-luong.service.ts`

### Vấn đề hiện tại
- Service quá lớn (~1100+ dòng), nghiệp vụ lẫn orchestration DB, khó test đơn vị.

### Kế hoạch tách theo domain service
1. `bang-luong-query.service.ts`
   - đọc dữ liệu, filter, pagination, mapping response.
2. `bang-luong-lifecycle.service.ts`
   - tạo/chốt/khóa/mở khóa/xóa.
3. `bang-luong-calculation.service.ts`
   - phần tính toán + điều phối rule engine.
4. `bang-luong-audit.service.ts`
   - audit/logging helpers.
5. `bang-luong-validation.service.ts`
   - rule validate state transition.

### Nguyên tắc refactor
- Không đổi contract API.
- Không đổi schema DB.
- Bổ sung test cho các state transition quan trọng (NHAP -> DA_CHOT -> DA_KHOA).

### Definition of Done
- `bang-luong.service.ts` còn vai trò facade/orchestrator.
- Mỗi service con <= 300-400 dòng.
- Test lifecycle chính pass.

## 4) Lộ trình thực thi đề xuất

### Sprint N+1
- Refactor `ChiTietNhanVien.tsx` (frontend).
- Thêm smoke/e2e cho flow cập nhật nhân viên.

### Sprint N+2
- Tách `bang-luong.service.ts` thành domain services.
- Bổ sung unit tests cho lifecycle + validate transition.

### Sprint N+3
- Dọn hotspots tiếp theo (`TroLyAiDrawer.tsx`, `QuanLyNguoiDung.tsx`).
- Chuẩn hóa checklist regression bắt buộc trước merge.
