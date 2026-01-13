
Dưới đây là PROMPT .md “TRỢ LÝ AI GỢI Ý RULE” đúng yêu cầu:
HR/Kế toán chỉ cần gõ tiếng Việt kiểu tự nhiên → hệ thống tự đề xuất rule, tự chuẩn hoá JSON, tự validate, preview, và cho phép áp dụng vào Quy chế.

✅ 100% tiếng Việt (UI text, biến, comment, message).
✅ Thiết kế theo hướng Option B chuẩn hoá nhanh.
✅ Có cơ chế an toàn – kiểm soát – audit (AI chỉ gợi ý, người dùng phải xác nhận).

# 🤖 PROMPT: MODULE “TRỢ LÝ AI GỢI Ý RULE” (HR NHẬP TIẾNG VIỆT → TẠO RULE JSON + VALIDATE + PREVIEW)

## 1) MỤC TIÊU MODULE
Xây dựng module **Trợ lý AI gợi ý Rule** giúp HR/Kế toán vận hành nhanh:

- Người dùng nhập yêu cầu bằng tiếng Việt, ví dụ:
  - “Phạt đi trễ: 1-2 lần 50k/lần, từ lần 3 trở lên 100k/lần”
  - “Trách nhiệm kho: cấp 1 500k, cấp 2 1tr, cấp 3 1.5tr”
  - “Trách nhiệm kinh doanh = lương cơ bản * hệ số trách nhiệm”
- AI chuyển thành:
  - `loai_rule`
  - `dieu_kien_json`
  - `cong_thuc_json`
  - `che_do_gop`, `thu_tu_uu_tien`
  - `ten_rule`, `khoan_luong_id`
- Tự chạy:
  - Validate client + server
  - Preview chạy thử trên nhân viên/dữ liệu giả lập
- Cho phép người dùng:
  - chỉnh sửa lại bằng form builder
  - hoặc mở Advanced JSON Editor
- Khi user xác nhận → lưu rule vào DB

⚠️ BẮT BUỘC:
- AI chỉ “gợi ý” → **không auto áp dụng**
- Mọi thay đổi phải có:
  - người tạo
  - thời gian
  - trace prompt
  - version quy chế
- 100% tiếng Việt

---

## 2) NGUYÊN TẮC AN TOÀN & KIỂM SOÁT
### 2.1. AI không được ghi trực tiếp DB
- AI chỉ trả về “đề xuất rule”
- Backend chỉ lưu khi user bấm “Áp dụng”

### 2.2. “Chế độ nháp”
- Rule AI tạo luôn ở trạng thái `NHAP`
- Muốn hiệu lực phải:
  - validate pass
  - preview pass
  - user xác nhận

### 2.3. Giới hạn hành vi AI
- Không suy đoán tùy tiện
- Thiếu dữ liệu phải hỏi lại hoặc đưa ra lựa chọn (options)
- Không invent tên phòng ban/khoản lương không tồn tại
- Nếu prompt mơ hồ → trả về danh sách câu hỏi làm rõ

---

## 3) TRẢI NGHIỆM UI (UX) BẮT BUỘC

### 3.1. Nút trong UI cấu hình quy chế
Trong màn hình cấu hình rule, thêm nút nổi:
✅ **“Trợ lý AI gợi ý rule”**

### 3.2. Popup/Drawer “Trợ lý AI”
Layout:

**A. Ô nhập mô tả (text area)**
- placeholder ví dụ
- gợi ý mẫu (chips)

**B. Thông tin ngữ cảnh**
- Phòng ban đang chọn
- Quy chế đang chọn (version)
- Danh mục khoản lương (để AI map)
- Danh sách mã sự kiện thưởng/phạt

**C. Nút**
- “Tạo đề xuất”
- “Validate”
- “Preview”
- “Áp dụng vào quy chế”

**D. Kết quả đề xuất**
- Hiển thị rule ở dạng:
  - “Bản đọc được” (human-readable)
  - “JSON rule”
  - “Form builder” (auto-fill)

---

## 4) INPUT AI: CONTEXT BẮT BUỘC PHẢI GỬI CHO AI
AI phải nhận đủ context để tránh bịa.

### 4.1. Context gửi AI gồm:
- Phòng ban hiện tại:
  - id, tên
- Quy chế hiện tại:
  - id, version, hiệu lực
- Danh mục khoản lương:
  - id, ma_khoan, ten_khoan
- Danh mục sự kiện thưởng/phạt:
  - ma_su_kien, ten_su_kien
- Danh sách vai trò & cấp trách nhiệm hiện có
- JSON schema rule hợp lệ (template)

---

## 5) OUTPUT AI: ĐỊNH DẠNG CHUẨN (BẮT BUỘC)
AI phải trả về JSON theo format:

```json
{
  "hop_le_so_bo": true,
  "can_lam_ro": [],
  "tom_tat_rule": "Phạt đi trễ: 1-2 lần 50k/lần, từ lần 3 100k/lần",
  "rule_de_xuat": {
    "ten_rule": "PHẠT ĐI TRỄ THEO BẬC",
    "khoan_luong_ma": "PHAT_DI_TRE",
    "loai_rule": "THEO_SU_KIEN",
    "thu_tu_uu_tien": 10,
    "che_do_gop": "CONG_DON",
    "cho_phep_chinh_tay": false,
    "dieu_kien_json": {
      "ap_dung_cho": { "tat_ca": true }
    },
    "cong_thuc_json": {
      "ma_su_kien": "DI_TRE",
      "cach_tinh": "BAC_THANG",
      "bac": [
        { "from": 1, "to": 2, "so_tien_moi_lan": 50000 },
        { "from": 3, "to": 999, "so_tien_moi_lan": 100000 }
      ]
    }
  },
  "giai_thich": [
    "AI nhận diện đây là rule thưởng/phạt theo sự kiện DI_TRE",
    "Áp dụng cho tất cả nhân viên phòng ban"
  ],
  "canh_bao": []
}


Nếu prompt mơ hồ:

{
  "hop_le_so_bo": false,
  "can_lam_ro": [
    "Bạn muốn áp dụng cho phòng ban nào hay tất cả?",
    "Phạt đi trễ tính theo số lần trong tháng hay theo ngày?"
  ],
  "rule_de_xuat": null
}

6) CHUẨN HOÁ NGÔN NGỮ (NLP) CẦN LÀM
6.1. Từ điển mapping bắt buộc

Hệ thống phải có từ điển alias:

“trách nhiệm”, “tn”, “phụ cấp trách nhiệm” → TRACH_NHIEM

“phạt”, “trừ” → PHAT_*

“thưởng”, “bonus” → THUONG_*

“đi trễ”, “muộn”, “trễ giờ” → DI_TRE

“sai quy trình”, “vi phạm quy trình” → SAI_QUY_TRINH

Nếu không map được → hỏi lại user, không bịa.

6.2. Chuẩn hoá tiền

“50k” = 50000

“1tr” = 1000000

“1.5tr” = 1500000

Có format VNĐ tự động

6.3. Nhận diện mẫu rule

AI phải phân loại được rule thuộc nhóm:

CỐ ĐỊNH

THEO HỆ SỐ

BẬC THANG

THEO SỰ KIỆN

CÔNG THỨC

7) PIPELINE XỬ LÝ: AI → VALIDATE → PREVIEW → APPLY
BƯỚC 1: Tạo đề xuất (AI)

API:

POST /tro-ly-ai/goi-y-rule
Input:

{
  "phong_ban_id": 1,
  "quy_che_luong_id": 10,
  "noi_dung_tieng_viet": "Phạt đi trễ 1-2 lần 50k/lần, từ lần 3 100k/lần"
}


Output: theo format ở mục 5

BƯỚC 2: Validate server

API:

POST /quy-che-rule/validate
Input: loai_rule + dieu_kien_json + cong_thuc_json

Nếu fail → hiển thị lỗi + gợi ý sửa.

BƯỚC 3: Preview chạy thử

API:

POST /quy-che-rule/preview

Cho chọn 1 nhân viên hoặc dữ liệu giả lập

Preview phải hiển thị:

tổng tiền

chi tiết

trace giải trình

BƯỚC 4: Áp dụng (Apply)

Chỉ thực hiện khi:

validate pass

preview pass (khuyến nghị)

user bấm xác nhận

API:

POST /quy-che-luong/:id/rule
Body: rule_de_xuat

8) AUDIT LOG (BẮT BUỘC)

Tạo bảng lưu lịch sử AI:

ai_rule_audit (
  id,
  nguoi_tao_id,
  phong_ban_id,
  quy_che_luong_id,
  prompt_goc,
  response_json,
  trang_thai,      -- DE_XUAT / DA_AP_DUNG / HUY
  tao_luc
)

9) CÁC TRƯỜNG HỢP PHẢI HỎI LẠI (KHÔNG ĐƯỢC ĐOÁN)

AI phải trả can_lam_ro nếu thiếu:

Không rõ áp dụng cho ai (tất cả hay vai trò/cấp?)

Không rõ tính theo tháng hay theo ngày

Không rõ bậc thang áp dụng theo số lần hay theo mức độ

Không rõ khoản lương map vào mã nào (khoan_luong_ma)

10) UI CHỈNH SỬA SAU KHI AI GỢI Ý (BẮT BUỘC)

Sau khi AI tạo rule:

Auto fill vào Form Builder

User có thể chỉnh:

điều kiện

bậc thang

hệ số

chế độ gộp

Có toggle:

“Xem JSON nâng cao”

“Quay lại form”

11) TIÊU CHÍ HOÀN THÀNH

✅ HR gõ tiếng Việt → tạo ra rule hợp lệ
✅ Không cần biết JSON
✅ Validate và Preview trước khi lưu
✅ Có audit prompt + response
✅ Không tự động áp dụng, luôn cần xác nhận
✅ Không bịa khoản lương/sự kiện không tồn tại

12) YÊU CẦU OUTPUT CODE (FULLSTACK)

Claude phải cung cấp:

Backend

API /tro-ly-ai/goi-y-rule

Service:

TroLyAiService

RuleDeXuatParserService (chuẩn hoá tiền, mapping alias)

ValidateService (server)

PreviewService

Schema audit AI

Cơ chế guard:

rule thiếu dữ liệu → trả can_lam_ro

không cho “apply” nếu validate fail

Frontend

Drawer/Modal trợ lý AI

Màn hình:

nhập text

xem kết quả

validate + preview

apply

Hiển thị giải thích và cảnh báo

Tài liệu

Prompt system cho AI (instruction)

Từ điển mapping alias

Quy ước tiền VNĐ

GHI CHÚ CUỐI

Trợ lý AI phải “hỗ trợ” chứ không được làm loạn quy chế.
Ưu tiên tính đúng, an toàn, giải trình được.
Toàn bộ UI và message phải dùng tiếng Việt.