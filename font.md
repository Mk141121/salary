Áp dụng Font + Typography System chuẩn SaaS (Payroll) — hiện đại, sạch, dễ đọc
> Mục tiêu: UI nhìn hiện đại – dễ nhìn – sạch, tối ưu cho bảng lương nhiều số liệu.  
> Phạm vi: **Frontend/UI only**, không đụng backend. App 100% tiếng Việt.

---

## 0) Vai trò
Bạn là Senior Frontend Engineer + UI System Designer.
Nhiệm vụ:
- Chọn & áp dụng **font system chuẩn** cho toàn app Payroll
- Thiết kế **typography scale** (font-size/line-height/weight)
- Tối ưu hiển thị bảng số: **tabular numbers**
- Áp dụng đồng nhất cho: layout, form, table, modal, toast, chart labels
- Đảm bảo hỗ trợ **tiếng Việt** tốt
- Hỗ trợ Light/Dark mode (nếu app có)

---

## 1) Font đề xuất (bắt buộc triển khai)
### Option A (Khuyến nghị – an toàn nhất)
- Font chính: **Inter**
- Số liệu/bảng: **Inter** + bật `tabular-nums`

### Option B (Premium)
- Font chính: **Plus Jakarta Sans** (text)
- Font số liệu: **Inter** (table/number-heavy)
> Nếu chọn Option B: phải implement font fallback rõ ràng.

**Yêu cầu**: Mặc định triển khai Option A (Inter). Nếu app đã có font sẵn, thay thế toàn cục.

---

## 2) Cách import font
### Nếu dùng Next.js
- Dùng `next/font/google` để load Inter (và Plus Jakarta nếu có)
- Có fallback fonts system:
  `system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial`

### Nếu dùng Vite/React thường
- Import qua `<link>` Google Fonts trong `index.html`
- Hoặc @import trong `global.css`

---

## 3) Global Font Rules (BẮT BUỘC)
- Apply font toàn cục cho `html, body`
- Apply smoothing:
  - `-webkit-font-smoothing: antialiased;`
  - `-moz-osx-font-smoothing: grayscale;`

- Áp dụng số dạng tabular:
  - Mặc định **tất cả table/cột số liệu** dùng:
    `font-variant-numeric: tabular-nums;`
  - Các chỗ giá trị tiền/đếm số: `tabular-nums`

---

## 4) Typography Scale chuẩn SaaS (khuyến nghị)
Thiết kế token cho typography:

### 4.1 Font size
- `text-xs`: 12px
- `text-sm`: 13px
- `text-base`: 14px (body default)
- `text-md`: 16px
- `text-lg`: 18px
- `text-xl`: 20px
- `text-2xl`: 24px
- `text-3xl`: 30px (ít dùng)

### 4.2 Line height
- xs/sm: 1.35–1.45
- base: 1.55–1.65
- heading: 1.2–1.3

### 4.3 Font weight
- `400` regular: body
- `500` medium: label/table header
- `600` semibold: button, section title
- `700` bold: page heading (h1)

---

## 5) Quy chuẩn UI theo component (BẮT BUỘC)
### 5.1 Body text
- 14px / 400 / line-height 1.6

### 5.2 Label form
- 13px / 500

### 5.3 Input text
- 14px / 400
- Placeholder: 13px / 400 / opacity 0.65

### 5.4 Button
- 14px / 600

### 5.5 Table (cực quan trọng cho Payroll)
- Table text: 13px hoặc 14px
- Header: 13px / 600
- Number columns:
  - bật `tabular-nums`
  - canh phải
- Currency format consistent: `1.234.567` (VN)
- Negative number: highlight (không đổi màu nếu spec chưa muốn)

### 5.6 Badge / Chip
- 12px / 600

### 5.7 Modal
- Title: 18px / 700
- Content: 14px / 400

---

## 6) Token hóa (Design Tokens)
Tạo file token typography để dễ maintain.

### Tailwind (nếu có)
- Cấu hình `tailwind.config`:
  - `fontFamily.sans`
  - `fontSize` custom
- Tạo utility:
  - `.tabular-nums { font-variant-numeric: tabular-nums; }`

### CSS Variables (nếu không tailwind)
Tạo trong `:root`
```css
:root{
  --font-sans: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  --text-xs: 12px;
  --text-sm: 13px;
  --text-base: 14px;
  --text-md: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
}
7) Áp dụng thực tế trong dự án
Bạn phải:

Tìm file global style:

src/styles/global.css hoặc app/globals.css

Tìm component layout:

Layout, AppShell, Sidebar, Header

Apply typography classes cho:

Sidebar items

Breadcrumbs

Quick Actions buttons

Command Palette UI

Table payroll

Forms setup payroll (quy chế/rule)

Đảm bảo không bị “nhảy chữ” do font loading:

nếu Next: dùng display: swap

set fallback gần giống

8) Dark Mode Readability (nếu có)
Không dùng font quá mảnh

Body text tối thiểu 14px

Table border & text đủ contrast

Placeholder không quá mờ

9) Test checklist
Bảng lương (nhiều số) nhìn thẳng hàng (tabular)

Không bị lỗi dấu tiếng Việt

Trình duyệt: Chrome/Edge/Safari

Responsive: desktop + tablet

10) Output yêu cầu
Bạn phải bàn giao:

Code áp dụng Inter toàn app

Token typography (tailwind hoặc css vars)

Update component table để số canh đẹp + tabular

Short doc: docs/ui-typography.md (tiếng Việt) nêu:

font dùng

lý do chọn

cách apply cho component mới

11) Lưu ý quan trọng
Không thay đổi business logic

Không thay đổi API

Chỉ sửa UI style/typography

Không xóa style cũ bừa bãi: thay đổi có kiểm soát

12) Bonus (nếu làm được)
Tạo helper formatVND() cho UI hiển thị tiền nhất quán

Tạo NumberCell component:

right align

tabular-nums

optional negative style

Nếu dự án đã có helper format tiền thì tái sử dụng, không tạo trùng.