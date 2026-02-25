# AUDIT `@CongKhai` ENDPOINTS - 2026-02-25

## Phạm vi
- Quét toàn bộ backend để tìm endpoint đang gắn `@CongKhai`.
- Mục tiêu: phân loại endpoint nào hợp lý giữ public, endpoint nào nên khóa.

## Kết quả quét
Các controller có `@CongKhai` thực tế:
1. `backend/src/health.controller.ts`
2. `backend/src/modules/rbac/rbac.controller.ts`
3. `backend/src/modules/chatbot/chatbot.controller.ts`

> Scheduling đã được khóa auth trong commit trước, không còn `@CongKhai`.

---

## Phân loại đề xuất

### A) NÊN GIỮ PUBLIC (hợp lý)
1. `GET /api/health`
   - File: `backend/src/health.controller.ts`
   - Lý do: phục vụ healthcheck (k8s/docker/monitoring).
   - Khuyến nghị: giữ response tối giản, không lộ chi tiết nội bộ.

2. `POST /api/rbac/dang-nhap`
   - File: `backend/src/modules/rbac/rbac.controller.ts`
   - Lý do: endpoint đăng nhập bắt buộc public.
   - Khuyến nghị: giữ throttle, cân nhắc lockout theo IP/user khi fail nhiều lần.

### B) NÊN CHUYỂN SANG AUTH (không nên public)
1. `GET /api/chatbot/history/:sessionId`
2. `GET /api/chatbot/analytics`
3. `GET /api/chatbot/analytics/top-queries`
4. `GET /api/chatbot/stats`
   - File: `backend/src/modules/chatbot/chatbot.controller.ts`
   - Lý do:
     - Có thể lộ dữ liệu hội thoại và thống kê sử dụng.
     - Dễ bị scrape/crawl nếu public.
   - Mức ưu tiên: **P1**.

### C) CÂN NHẮC THEO NGỮ CẢNH SẢN PHẨM
1. `POST /api/chatbot/ask`
   - File: `backend/src/modules/chatbot/chatbot.controller.ts`
   - Nếu chatbot là nội bộ cho nhân sự: nên yêu cầu auth.
   - Nếu chatbot public-facing: có thể giữ public nhưng phải có rate-limit chặt + anti-abuse.

2. `GET /api/chatbot/faqs`, `GET /api/chatbot/glossary`
   - File: `backend/src/modules/chatbot/chatbot.controller.ts`
   - Có thể giữ public nếu chỉ chứa nội dung tài liệu không nhạy cảm.
   - Nếu chỉ dùng trong app đã đăng nhập: chuyển về auth để đồng nhất.

---

## Kế hoạch hardening an toàn (đề xuất)

### Bước 1 (an toàn cao, ít rủi ro)
- Gỡ `@CongKhai` khỏi:
  - `GET /chatbot/history/:sessionId`
  - `GET /chatbot/analytics`
  - `GET /chatbot/analytics/top-queries`
  - `GET /chatbot/stats`
- Build backend + smoke test chatbot FE.

### Bước 2 (cần quyết định sản phẩm)
- Quyết định policy cho `POST /chatbot/ask`, `GET /chatbot/faqs`, `GET /chatbot/glossary`:
  - **Mode Internal**: yêu cầu auth toàn bộ chatbot.
  - **Mode Public**: giữ public nhưng thêm rate-limit riêng + giám sát abuse.

---

## Kết luận ngắn
- Trạng thái hiện tại đã tốt hơn sau khi khóa scheduling.
- Cụm cần ưu tiên tiếp theo là nhóm analytics/history của chatbot.
- Có thể triển khai ngay Bước 1 mà gần như không ảnh hưởng luồng nghiệp vụ cốt lõi.
