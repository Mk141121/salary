# Báo cáo review dự án tinh-luong (21/01/2026)

## 1. Phạm vi & phương pháp
- Phạm vi: toàn bộ workspace tinh-luong (backend, frontend, docs, scripts, reports).
- Nguồn tham chiếu chính: README, PROGRESS, kế hoạch fix, cấu hình hệ thống, cấu trúc module, schema Prisma.
- Mục tiêu: tổng quan kiến trúc, hiện trạng, điểm rủi ro, và hướng xử lý ưu tiên.

## 2. Tổng quan kiến trúc
- Backend: NestJS + Prisma + PostgreSQL, chia module theo nghiệp vụ, global guards (JWT/RBAC/Permissions), rate limit, Swagger.
- Frontend: React + Vite + Tailwind, React Router v6, TanStack Query, PWA cho portal nhân viên.
- Dữ liệu: Prisma schema lớn, tên model/field tiếng Việt không dấu; cấu trúc payroll theo bảng lương/chi tiết.

## 3. Hiện trạng chức năng (tóm tắt)
- Core payroll: quản lý phòng ban, nhân viên, khoản lương, bảng lương; import/export Excel; chốt/khóa.
- Phase 2: xếp ca, nghỉ phép, yêu cầu OT/trễ/sớm/công tác, portal nhân viên, notification, anti-fraud GPS, timesheet, payroll sync pipeline, reports.
- Tài liệu tiến độ: phần lớn Sprint 0-10 đã hoàn thành; Sprint 11-12 còn việc theo lộ trình.

## 4. Kiến trúc backend
- Module chính đã tích hợp: Phòng ban, Nhân viên, Khoản lương, Bảng lương, Import Excel, Quy chế/Rule Engine, RBAC, KPI, Chấm công, Sản lượng, Hợp đồng, Ngân hàng, Nghỉ phép, Xếp ca, Yêu cầu, Thông báo, Anti-fraud, Timesheet, Payroll Sync, Reports, Approval Dashboard.
- Bảo mật & an toàn:
  - Guard toàn cục JWT/Roles/Permissions.
  - Throttler 3 tier.
  - Helmet CSP, CORS theo env, ValidationPipe.
  - Kế hoạch fix đã hoàn thành giai đoạn A/B (auth, bcrypt, safe-eval, audit log, validate Excel).

## 5. Data model (Prisma)
- Core: `PhongBan`, `NhanVien`, `KhoanLuong`, `BangLuong`, `ChiTietBangLuong`, `NgayCongBangLuong`.
- Nghiệp vụ mở rộng: `NghiPhep`, `YeuCau`, `PhanCa`, `ChamCong`, `ThongBao`, `RuleEngine`, `AntiFraud`.
- Quy ước: enum nghiệp vụ rõ ràng, nhiều index + unique; có bảng lịch sử (audit/nhân sự/phân ca).

## 6. Frontend
- React Router v6 + layouts (desktop và portal mobile).
- Trang nghiệp vụ tương ứng đầy đủ cho các module backend.
- TanStack Query chuẩn hóa fetch/caching; dùng toast thông báo.

## 7. Những tồn tại/TODO cụ thể (có link vị trí)
- Chặn điều hướng khi chưa lưu: chưa migrate sang `createBrowserRouter` để dùng `useBlocker`. [frontend/src/pages/ChiTietBangLuong.tsx](frontend/src/pages/ChiTietBangLuong.tsx#L334)
- Cài đặt BHXH/Thuế: handler chưa gọi API. [frontend/src/pages/CaiDatHeThong.tsx](frontend/src/pages/CaiDatHeThong.tsx#L194)
- Quick actions: chưa implement modal actions. [frontend/src/components/layout/QuickActions.tsx](frontend/src/components/layout/QuickActions.tsx#L140)
- Inbox duyệt cấp 1: chưa lọc theo team người duyệt. [backend/src/modules/yeu-cau/yeu-cau.service.ts](backend/src/modules/yeu-cau/yeu-cau.service.ts#L599)
- Lịch làm việc cá nhân: `nhanVienId` chưa lấy chắc chắn từ user đăng nhập. [backend/src/modules/phan-ca/phan-ca.controller.ts](backend/src/modules/phan-ca/phan-ca.controller.ts#L60)
- Rule preview: thiếu logic kiểm tra điều kiện đầy đủ. [backend/src/modules/rule-engine/quy-che-rule.service.ts](backend/src/modules/rule-engine/quy-che-rule.service.ts#L530)
- Trợ lý AI: chưa lấy `nguoiTaoId` từ JWT. [backend/src/modules/rule-engine/tro-ly-ai.controller.ts](backend/src/modules/rule-engine/tro-ly-ai.controller.ts#L32) và [backend/src/modules/rule-engine/tro-ly-ai.controller.ts](backend/src/modules/rule-engine/tro-ly-ai.controller.ts#L68)
- Sổ lương: ngày công đang hardcode 26. [backend/src/modules/so-luong/so-luong.service.ts](backend/src/modules/so-luong/so-luong.service.ts#L220)

## 8. Rủi ro & ảnh hưởng
- **Access control dữ liệu**: inbox duyệt chưa lọc theo phạm vi → rủi ro lộ thông tin/duyệt sai phạm vi.
- **Tính đúng nghiệp vụ**: rule preview bỏ qua điều kiện → kết quả mô phỏng sai.
- **Portal/ca làm việc**: lấy `nhanVienId` không chuẩn → trả rỗng hoặc sai lịch.
- **Báo cáo sổ lương**: ngày công hardcode → sai số liệu tổng hợp.
- **Tính năng treo**: BHXH/Thuế và modal quick actions chưa có API → UX chưa hoàn chỉnh.

## 9. Hướng xử lý đề xuất (ưu tiên)
### P0 – 1-2 tuần
1. Hoàn thiện lọc inbox duyệt theo team/role (backend) + test phân quyền.
2. Chuẩn hóa `nhanVienId` từ JWT cho lịch cá nhân và trợ lý AI.
3. Xử lý hardcode ngày công → lấy từ chấm công/Timesheet.

### P1 – 2-4 tuần
4. Hoàn thiện rule preview điều kiện (dùng cùng logic engine thực thi).
5. Hoàn thiện BHXH/Thuế settings API + UI wiring.
6. Hoàn thiện modal actions và kiểm thử UX.

### P2 – 4-6 tuần
7. Tối ưu hiệu năng: giảm N+1 query, thêm index theo truy vấn thực tế.
8. Chuẩn hóa naming, dọn log/console cho production.
9. Bổ sung test integration cho các module payroll, import, rule engine, anti-fraud.

## 10. Khuyến nghị vận hành
- Thiết lập CI cơ bản: lint, test, prisma generate, build.
- Bổ sung quan sát: request logging chuẩn, error tracking, slow query log.
- Chuẩn hóa môi trường: `.env.example` cho backend + frontend.

## 11. Kết luận
Dự án đã đạt độ hoàn thiện cao về phạm vi tính năng. Những tồn tại còn lại chủ yếu là hoàn thiện nghiệp vụ, phân quyền chi tiết, và tính đúng số liệu ở báo cáo/preview. Ưu tiên xử lý các TODO ở backend liên quan đến phân quyền và tính đúng dữ liệu; sau đó hoàn thiện các điểm UX/UI phía frontend.

## 12. Cập nhật sau xử lý
### P0
- ✅ Lọc inbox duyệt theo phạm vi phòng ban/role. [backend/src/modules/yeu-cau/yeu-cau.service.ts](backend/src/modules/yeu-cau/yeu-cau.service.ts#L76-L665)
- ✅ Chuẩn hóa `nhanVienId` từ JWT cho lịch cá nhân và trợ lý AI. [backend/src/modules/phan-ca/phan-ca.controller.ts](backend/src/modules/phan-ca/phan-ca.controller.ts#L55-L66), [backend/src/modules/rule-engine/tro-ly-ai.controller.ts](backend/src/modules/rule-engine/tro-ly-ai.controller.ts#L33-L77)
- ✅ Ngày công sổ lương lấy từ dữ liệu chấm công/điều chỉnh. [backend/src/modules/so-luong/so-luong.service.ts](backend/src/modules/so-luong/so-luong.service.ts#L167-L243)

### P1
- ✅ Rule preview kiểm tra điều kiện đầy đủ. [backend/src/modules/rule-engine/quy-che-rule.service.ts](backend/src/modules/rule-engine/quy-che-rule.service.ts#L474-L620)
- ✅ BHXH/Thuế settings API + UI wiring. [frontend/src/pages/CaiDatHeThong.tsx](frontend/src/pages/CaiDatHeThong.tsx#L360-L630), [frontend/src/services/api.ts](frontend/src/services/api.ts#L150-L204)
- ✅ Modal actions cho quick actions. [frontend/src/components/layout/QuickActions.tsx](frontend/src/components/layout/QuickActions.tsx#L126-L156)

### P2
- ✅ Giảm N+1 sổ lương (batch snapshot) + index tổng hợp. [backend/src/modules/so-luong/so-luong.service.ts](backend/src/modules/so-luong/so-luong.service.ts#L160-L230), [backend/prisma/schema.prisma](backend/prisma/schema.prisma#L532-L544)
- ✅ Dọn log production cho quick actions. [frontend/src/config/quickActionRegistry.ts](frontend/src/config/quickActionRegistry.ts#L28-L38)
- ✅ Thêm test integration (payroll, import, rule engine, anti-fraud). [backend/src/test/integrationTestUtils.ts](backend/src/test/integrationTestUtils.ts), [backend/src/modules/so-luong/__tests__/so-luong.history.spec.ts](backend/src/modules/so-luong/__tests__/so-luong.history.spec.ts), [backend/src/modules/import-excel/__tests__/import-excel.mapping.spec.ts](backend/src/modules/import-excel/__tests__/import-excel.mapping.spec.ts), [backend/src/modules/rule-engine/__tests__/quy-che-rule.preview.spec.ts](backend/src/modules/rule-engine/__tests__/quy-che-rule.preview.spec.ts), [backend/src/modules/anti-fraud/__tests__/anti-fraud.gps.spec.ts](backend/src/modules/anti-fraud/__tests__/anti-fraud.gps.spec.ts)

### Đồng bộ nguồn bảng lương
- ✅ Đồng bộ ngày công về một nguồn: `BangLuongChiTiet` trả `ngayCong`, UI dùng trực tiếp. [backend/src/modules/bang-luong/tinh-luong.service.ts](backend/src/modules/bang-luong/tinh-luong.service.ts#L20-L210), [frontend/src/pages/ChiTietBangLuong.tsx](frontend/src/pages/ChiTietBangLuong.tsx#L40-L590), [frontend/src/services/api.ts](frontend/src/services/api.ts#L300-L340)
