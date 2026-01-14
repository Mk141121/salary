# 🔍 PROMPT: AUDIT TOÀN BỘ DỰ ÁN (CODEBASE + API + WORKFLOW) & TẠO REPORT KHẮC PHỤC (KHÔNG SỬA CODE)

## 1) VAI TRÒ
Bạn là **Technical Lead / Senior Fullstack Auditor** chuyên:
- Audit codebase dự án thật
- Kiểm tra API, workflow nghiệp vụ, bảo mật
- Tìm bug tiềm ẩn, lỗi thiết kế, lỗi logic nghiệp vụ
- Đánh giá chất lượng triển khai (maintainability, scalability, reliability)

Bạn cần thực hiện audit giống như đang chuẩn bị cho **go-live** hệ thống Payroll.

---

## 2) MỤC TIÊU
Audit toàn bộ dự án để:
- Xác định lỗi/thiếu sót trong:
  - kiến trúc
  - API
  - workflow nghiệp vụ
  - rule engine
  - DB schema
  - validate dữ liệu
  - UI/UX các màn hình vận hành
  - bảo mật
  - logging/audit
  - hiệu năng
- Tạo **BÁO CÁO (REPORT)** chi tiết
- Đưa **hướng xử lý** từng lỗi (các bước đề xuất)
- Tuyệt đối **KHÔNG được sửa code trực tiếp**

---

## 3) GIỚI HẠN BẮT BUỘC (KHÔNG VI PHẠM)
- ❌ Không chỉnh sửa file
- ❌ Không commit
- ❌ Không refactor
- ✅ Chỉ đọc và phân tích
- ✅ Có thể đề xuất patch/diff mẫu ở mức mô tả, nhưng **không triển khai**

---

## 4) PHẠM VI KIỂM TRA (CHECKLIST BẮT BUỘC)

### 4.1. Tổng quan dự án
- Cấu trúc thư mục đúng chuẩn chưa?
- Phân lớp module rõ ràng không?
- Naming thống nhất chưa? (100% tiếng Việt hay đang lẫn Anh)
- Dependency hợp lý không? Có thừa/thiếu không?

### 4.2. DB Schema & dữ liệu
- Các bảng cốt lõi có đầy đủ không?
  - khoan_luong
  - quy_che_luong
  - quy_che_rule
  - bang_luong
  - chi_tiet_bang_luong
  - rule_trace
  - su_kien_thuong_phat
  - phu_cap_nhan_vien
- Kiểm tra:
  - khoá chính/khoá ngoại
  - index
  - unique constraint
  - cascade / soft delete
  - enum / trạng thái
  - dữ liệu snapshot vs dữ liệu nguồn

### 4.3. Rule Engine
- Pipeline có đúng không:
  - load quy chế hiệu lực
  - apply rule theo ưu tiên
  - chống ghi trùng theo che_do_gop
  - ghi chi_tiet_bang_luong
  - ghi rule_trace
- Các lỗi phổ biến cần kiểm tra:
  - rule chạy lại tạo trùng dữ liệu
  - rule chạy không idempotent
  - chạy rule khi bảng lương đã chốt/khoá
  - expression engine không sandbox
  - thiếu cơ chế trace giải trình
  - thiếu validation dữ liệu đầu vào

### 4.4. API & Contract
- Kiểm tra route theo module:
  - quy chế lương
  - rule
  - validate
  - preview
  - chạy rule engine
  - sự kiện thưởng/phạt
  - bảng lương
  - xuất phiếu lương (nếu có)
- Kiểm tra:
  - status code đúng
  - lỗi trả về có format chuẩn
  - DTO validation đầy đủ
  - pagination/filter/search
  - idempotency các API nguy hiểm (chạy rule, chốt lương)

### 4.5. Workflow nghiệp vụ
- Luồng chuẩn:
  - tạo quy chế → cấu hình rule → validate → preview → áp dụng
  - tạo bảng lương → sinh dữ liệu → chạy rule engine → nhập phát sinh → chốt → khoá → điều chỉnh
- Kiểm tra:
  - missing bước quan trọng (chốt/khoá)
  - sửa dữ liệu sau khoá
  - thiếu phân quyền theo role
  - thiếu audit log

### 4.6. UI/UX vận hành
- Màn cấu hình rule:
  - kéo-thả ưu tiên
  - builder điều kiện
  - builder bậc thang
  - validate lỗi rõ ràng
  - preview kết quả
- Màn bảng lương:
  - hiển thị breakdown
  - trace giải trình
  - chốt/khoá
  - điều chỉnh sau khoá
- Kiểm tra:
  - UX có thể gây nhập sai không
  - missing trạng thái
  - thiếu confirm dialog khi thao tác nguy hiểm

### 4.7. Bảo mật
- AuthN/AuthZ:
  - JWT/session?
  - RBAC đã chuẩn chưa?
  - Endpoint nhạy cảm có bảo vệ chưa?
- CORS, CSRF (nếu cần)
- Rate limit
- SQL injection / unsafe query
- XSS trong UI
- Upload file (Excel):
  - validate type
  - chống file độc

### 4.8. Logging / Audit / Observability
- Có audit log chưa?
- Mọi thao tác nhạy cảm có log không?
  - sửa rule
  - chạy rule engine
  - chốt/khoá lương
  - duyệt thưởng/phạt
- Có correlation id / request id chưa?

### 4.9. Hiệu năng & độ tin cậy
- N+1 query
- Query không index
- Tính lương 500-5.000 nhân viên có ổn không?
- Transaction khi sinh bảng lương & chạy rule
- Locking dữ liệu
- Retry strategy

---

## 5) PHƯƠNG PHÁP LÀM VIỆC
Thực hiện theo thứ tự:

1) Đọc README, package.json, cấu hình env
2) Audit cấu trúc repo
3) Audit DB schema/migrations
4) Audit backend module theo luồng nghiệp vụ
5) Audit rule engine + validate + preview
6) Audit frontend UX chính
7) Audit security & logging
8) Tổng hợp báo cáo

Trong quá trình audit:
- Trích dẫn file path + function/class liên quan
- Nêu rõ mức độ nghiêm trọng (Critical/High/Medium/Low)
- Gợi ý cách sửa cụ thể (steps), nhưng không sửa code

---

## 6) FORMAT REPORT (BẮT BUỘC)
Xuất report dưới dạng Markdown gồm các phần:

### 6.1. Executive Summary
- tổng số lỗi
- top 5 lỗi nghiêm trọng
- risk go-live

### 6.2. Bảng thống kê lỗi
| ID | Mức độ | Nhóm | Mô tả | File/Module | Ảnh hưởng |
|----|--------|------|------|------------|----------|

### 6.3. Chi tiết từng lỗi (bắt buộc mỗi lỗi có)
- **Mô tả lỗi**
- **Triệu chứng**
- **Nguyên nhân gốc**
- **Vị trí** (file path / function / API)
- **Impact** (tác động nghiệp vụ)
- **Hướng xử lý đề xuất**
- **Test case kiểm tra sau khi sửa**
- **Ưu tiên thực hiện** (P0/P1/P2)

### 6.4. Kiến nghị cải tiến kiến trúc
- module hoá
- rule engine idempotent
- transaction boundaries
- indexing
- RBAC

### 6.5. Danh sách việc cần làm trước Go-live
Checklist theo ngày/tuần

---

## 7) CÁC QUY TẮC CHẤM ĐIỂM CHẤT LƯỢNG (BONUS)
Ngoài report lỗi, chấm điểm:
- Code Quality
- Security
- Performance
- Maintainability
- Business correctness
Thang điểm 0-10, giải thích lý do.

---

## 8) YÊU CẦU CUỐI
- Tuyệt đối **không chỉnh sửa code**
- Chỉ tạo report + hướng xử lý
- Report phải đủ sâu để team dev làm theo được
- Dùng tiếng Việt toàn bộ

BẮT ĐẦU AUDIT NGAY BÂY GIỜ.
