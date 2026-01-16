Tái cấu trúc Menu Sidebar + Breadcrumbs + Quick Actions + Command Palette (Ctrl+K)
> Mục tiêu: làm UI điều hướng cực dễ dùng cho HR/Kế toán theo luồng vận hành. **CHỈ SỬA FRONTEND/UI**, không đụng backend/API/DB. App 100% tiếng Việt.

---

## 0) Vai trò
Bạn là **Senior Frontend Engineer + UX Engineer**.
Nhiệm vụ: Refactor hệ thống điều hướng toàn app gồm:
1) **Sidebar Menu**: gom nhóm theo luồng + permission-based + search + pin favorites  
2) **Header Breadcrumbs**: hiển thị đường dẫn theo route/module  
3) **Header Quick Actions**: nút thao tác nhanh theo module đang mở  
4) **Command Palette (Ctrl+K/⌘K)**: tìm nhanh chức năng + chuyển route + chạy quick action + favorites + recent  
=> Mục tiêu cuối: HR/Kế toán thao tác nhanh, không rối menu, giảm click.

---

## 1) Ràng buộc bắt buộc
- App 100% tiếng Việt (label, tooltip, placeholder)
- **Không sửa backend**, không đổi API/DB
- Không phá routing hiện tại  
  - Không xóa route cũ  
  - Nếu đổi label thì chỉ đổi label, path giữ nguyên  
  - Nếu buộc đổi path phải tạo alias redirect (ưu tiên KHÔNG đổi)
- Không thay đổi business logic payroll/rule
- Tôn trọng RBAC: ẩn/hiện menu & actions theo permission
- Code sạch: tách config, tránh hardcode

---

## 2) Kết quả mong muốn (Deliverables)
Bạn phải bàn giao:
- Menu sidebar mới theo nhóm luồng vận hành
- Permission-based menu (ẩn/hiện theo quyền)
- Search menu trong sidebar + highlight kết quả
- Pin favorites (ghim mục yêu thích) persist localStorage theo user
- Breadcrumbs ở header (dynamic theo route/param)
- Quick Actions ở header (theo module, permission-based)
- Command Palette Ctrl+K:
  - tìm route/function
  - chuyển trang
  - chạy quick action
  - hiển thị favorites + recent pages
  - confirm cho action nguy hiểm (danger)
- README/hướng dẫn dev thêm menu/breadcrumb/action/command

---

## 3) Thiết kế cấu trúc điều hướng chuẩn (Menu theo luồng)
Sidebar menu phải được gom nhóm theo thứ tự:

### (1) Tổng quan
- Trang chủ (Dashboard)

### (2) Dữ liệu đầu vào
- Nhân viên
- Phòng ban
- Nhóm nhân viên
- Chấm công
- Nghỉ phép
- KPI
- Sản lượng
  - Chia hàng
  - Giao hàng
- Import Excel

### (3) Tính lương
- Quy chế lương (Rule Engine)
- Khoản lương
- Công thức lương / Biến số (nếu có)
- Trace / Preview Rule (nếu có)

### (4) Kỳ lương
- Bảng lương
- Snapshot kỳ lương (nếu là trang riêng; nếu là button trong bảng lương thì vẫn có entry)
- Phiếu điều chỉnh (Adjustment)

### (5) Ứng lương
- Bảng ứng lương
- Ghi nhận khấu trừ
- Lịch sử ứng lương (nếu có)

### (6) Báo cáo & Sổ lương
- Sổ lương (Nhân viên)
- Sổ lương (Phòng ban)
- Báo cáo tổng quỹ lương
- Báo cáo theo khoản/phòng ban (nếu có)

### (7) Thiết lập hệ thống
- Thông tin công ty
- Cấu hình BHXH/Thuế
- Cấu hình phạt chấm công
- Cấu hình kỳ lương/kỳ ứng lương
- Mẫu import/template

### (8) Quản trị
- Người dùng
- Vai trò & Quyền
- Audit log
- Lịch sử import / sửa dữ liệu

> Nếu dự án thiếu route/module: item ẩn hoặc show “Đang phát triển” theo flag.

---

## 4) Permission-based Menu (RBAC)
Frontend đang có cơ chế lấy permission user (ví dụ `currentUser.permissions` hoặc `auth.me`).
Bạn phải:
- Mỗi menu item có `requiredPermissions?: string[]`
- Nếu user không có quyền => ẩn item
- Group rỗng => ẩn group
- Super admin (`ADMIN_ALL`) => thấy tất cả

Gợi ý quyền (tùy dự án mapping lại đúng):
- `NHAN_VIEN_VIEW`, `PHONG_BAN_VIEW`, `NHOM_NV_VIEW`
- `CHAM_CONG_VIEW`, `NGHI_PHEP_VIEW`, `KPI_VIEW`
- `IMPORT_EXCEL`, `SAN_LUONG_VIEW`
- `QUY_CHE_VIEW`, `KHOAN_LUONG_VIEW`
- `BANG_LUONG_VIEW`, `SNAPSHOT_VIEW`, `DIEU_CHINH_VIEW`
- `UNG_LUONG_VIEW`, `SO_LUONG_VIEW`
- `ADMIN` / `QUAN_TRI_VIEW`

---

## 5) Search menu + Highlight (Sidebar)
- Thêm input search trong sidebar: placeholder “Tìm nhanh…”
- Debounce 150ms
- Filter item theo `label` + `tags/keywords`
- Group chỉ hiển thị phần có match
- Highlight đoạn match trong label
- Enter:
  - nếu 1 kết quả => navigate

---

## 6) Pin Favorites (Sidebar)
- Mỗi item có ⭐ (hover mới hiện)
- Click ⭐ => toggle
- Favorites group “Yêu thích” hiển thị trên cùng
- Tối đa 8 mục
- Persist localStorage key:
  - `payroll_favorites_<userId>`
- Permission-safe:
  - mất quyền => item tự biến mất

---

## 7) Breadcrumbs (Header)
- Hiển thị theo route meta (KHÔNG hardcode)
- Format:
  - `Tổng quan / Kỳ lương / Bảng lương / Tháng 01/2026`
- Click được (trừ item cuối)
- Hỗ trợ param dynamic label:
  - `/bang-luong/ky/2026-01` => “Tháng 01/2026”
- Nếu quá dài => truncate + tooltip

---

## 8) Quick Actions (Header)
- Theo module/route đang mở
- Permission-based
- Desktop: 2-4 nút
- Mobile: gộp dropdown “Thao tác”

Ví dụ actions:
- Dashboard: “+ Tạo kỳ lương”, “+ Import Excel”
- Bảng lương: “Snapshot”, “Chạy rule”, “Chốt”, “Khoá”, “Xuất Excel”
- Ứng lương: “Tạo bảng ứng”, “Tính eligibility”, “Chốt”, “Ghi nhận khấu trừ”
- Quy chế: “Tạo rule”, “Validate JSON”, “Preview”
- Nhân viên: “+ Thêm”, “Xuất Excel”
- Chấm công: “Import”, “Tổng hợp ngày công”

Action nguy hiểm (danger): “Khoá kỳ lương” phải confirm.

---

## 9) Command Palette (Ctrl+K / ⌘K)
### 9.1 Mục tiêu
- Tìm nhanh chức năng
- Chuyển route tức thì
- Chạy quick actions ngay trong palette
- Hiện favorites + recent pages

### 9.2 UX
- Ctrl+K/⌘K mở palette
- Gõ tìm kiếm → kết quả realtime + highlight
- ↑↓ để chọn
- Enter:
  - route => navigate
  - action => run
- Escape đóng
- Danger action => confirm step 2:
  - yêu cầu gõ “KHOA” hoặc “XÁC NHẬN”

### 9.3 Các nhóm hiển thị
1) Đi tới (Routes)
2) Thao tác nhanh (Quick Actions)
3) Yêu thích
4) Gần đây (Recent pages)
5) Hệ thống/Quản trị (nếu đủ quyền)

### 9.4 Recent pages
- Lưu mỗi route change `{path,title,time}`
- max 10
- key: `payroll_recent_<userId>`

### 9.5 Permission-based
- item không quyền => ẩn hoặc disabled
- favorites/recent tự drop nếu mất quyền

---

## 10) Thiết kế kỹ thuật (BẮT BUỘC sạch)
### 10.1 Tách config tập trung
Tạo các file:

#### A) Sidebar menu config
`src/config/sidebarMenu.ts`
```ts
export type MenuItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  path?: string;
  children?: MenuItem[];
  requiredPermissions?: string[];
  tags?: string[];
};

export type MenuGroup = {
  id: string;
  title: string;
  items: MenuItem[];
};
B) Route meta config
src/config/routes.ts

ts
Sao chép mã
export type RouteMeta = {
  path: string;
  label: string;
  group?: string;
  parent?: string;
  requiredPermissions?: string[];
  dynamicLabel?: (params: any) => string;
  quickActions?: QuickAction[];
};

export type QuickAction = {
  id: string;
  label: string;
  icon?: ReactNode;
  requiredPermissions?: string[];
  type: "route" | "modal" | "callback";
  to?: string;
  onClickKey?: string;
  danger?: boolean;
};
C) Quick action registry
src/config/quickActionRegistry.ts

ts
Sao chép mã
export const quickActionRegistry = {
  SNAPSHOT_BANG_LUONG: () => {/* call UI handler */},
  RUN_RULE_ENGINE: () => {},
  CHOT_KY: () => {},
  KHOA_KY: () => {},
  EXPORT_EXCEL: () => {},
};
10.2 Component layout
src/components/layout/Sidebar.tsx

src/components/layout/Header.tsx

src/components/layout/Breadcrumbs.tsx

src/components/layout/QuickActions.tsx

10.3 Command palette components
src/components/command-palette/CommandPalette.tsx

src/components/command-palette/useCommandPalette.ts

src/components/command-palette/commandPaletteData.ts

src/components/command-palette/commandPaletteStore.ts

10.4 Không phá routing
Không đổi path

Nếu cần alias redirect: làm ở FE router layer

11) UI/UX yêu cầu
Sidebar:

group title rõ ràng

active item highlight

collapse/expand groups

collapse sidebar icon-only + tooltip

Search menu:

highlight match

empty state

Favorites:

⭐ hover

toast khi quá 8

Header:

breadcrumbs rõ ràng

quick actions đẹp

Command Palette:

modal overlay + trap focus

list groups + highlight

danger confirm

12) Test cases bắt buộc (manual)
HR login:

chỉ thấy menu hợp lệ

ctrl+k tìm “bảng lương” ra đúng

Import user:

chỉ thấy import + sản lượng

Admin:

full menu

Favorites:

ghim 5 mục

reload vẫn còn

Recent:

vào 3 trang khác nhau

palette có nhóm “Gần đây”

Danger action:

khoá kỳ → confirm mới chạy

Không regression:

click menu điều hướng đúng route

13) Output bắt buộc
Code refactor xong, chạy ổn

Không thay đổi backend

README tiếng Việt:

thêm menu item mới ở đâu

add permission thế nào

add breadcrumb route meta

add quick action + registry

add command item

14) Checklist nghiệm thu
 Sidebar theo luồng + permission-based

 Search menu OK

 Favorites OK (persist)

 Breadcrumbs OK

 Quick Actions OK

 Command Palette Ctrl+K OK

 Danger confirm OK

 100% tiếng Việt

 Không phá route/API