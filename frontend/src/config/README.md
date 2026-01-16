# Hướng dẫn Hệ thống Điều hướng (Navigation System)

Tài liệu hướng dẫn developer thêm/sửa menu, breadcrumbs, quick actions và command palette.

## 📁 Cấu trúc thư mục

```
frontend/src/
├── config/
│   ├── sidebarMenu.ts      # Cấu hình menu sidebar
│   ├── routes.ts           # Cấu hình route meta (breadcrumbs, quick actions)
│   └── quickActionRegistry.ts # Registry cho quick action callbacks
├── components/
│   ├── layout/
│   │   ├── NewLayout.tsx   # Layout chính (tích hợp tất cả)
│   │   ├── Header.tsx      # Header với breadcrumbs + quick actions
│   │   ├── Sidebar.tsx     # Sidebar menu
│   │   ├── Breadcrumbs.tsx # Component breadcrumbs
│   │   └── QuickActions.tsx # Component quick actions
│   └── command-palette/
│       └── CommandPalette.tsx # Command palette (Ctrl+K)
└── hooks/
    ├── useFavorites.ts     # Hook quản lý favorites
    ├── useRecentPages.ts   # Hook quản lý recent pages
    └── useCommandPalette.ts # Hook quản lý command palette
```

---

## 1. Thêm Menu Item mới

### 1.1 Thêm vào group có sẵn

Mở file `src/config/sidebarMenu.ts`:

```typescript
// Tìm group muốn thêm, ví dụ 'du-lieu-dau-vao'
{
  id: 'du-lieu-dau-vao',
  title: 'Dữ liệu đầu vào',
  items: [
    // ... các items hiện có
    
    // Thêm item mới
    {
      id: 'muc-moi',           // ID unique
      label: 'Mục mới',        // Tên hiển thị
      icon: FileText,          // Icon từ lucide-react
      path: '/muc-moi',        // Path route
      requiredPermissions: ['MUC_MOI_VIEW'], // Quyền (optional)
      tags: ['new', 'mới'],    // Tags để search (optional)
    },
  ],
}
```

### 1.2 Thêm menu con (submenu)

```typescript
{
  id: 'menu-cha',
  label: 'Menu cha',
  icon: Folder,
  requiredPermissions: ['MENU_CHA_VIEW'],
  children: [
    {
      id: 'menu-con-1',
      label: 'Menu con 1',
      icon: File,
      path: '/menu-cha/con-1',
    },
    {
      id: 'menu-con-2',
      label: 'Menu con 2',
      icon: File,
      path: '/menu-cha/con-2',
    },
  ],
}
```

### 1.3 Thêm group mới

```typescript
// Thêm vào mảng sidebarMenuGroups
{
  id: 'group-moi',
  title: 'Group Mới',
  collapsible: true, // Có thể collapse/expand
  items: [
    // ... menu items
  ],
}
```

---

## 2. Thêm Route Meta (Breadcrumbs + Quick Actions)

Mở file `src/config/routes.ts`:

### 2.1 Route đơn giản

```typescript
{
  path: '/muc-moi',
  label: 'Mục mới',
  group: 'Dữ liệu đầu vào', // Hiển thị trong breadcrumb
  requiredPermissions: ['MUC_MOI_VIEW'],
}
```

### 2.2 Route có dynamic params

```typescript
{
  path: '/muc-moi/:id',
  label: 'Chi tiết mục',
  parent: '/muc-moi',  // Route cha (cho breadcrumb)
  dynamicLabel: (params) => `Mục #${params.id}`,
}
```

### 2.3 Route có Quick Actions

```typescript
{
  path: '/muc-moi',
  label: 'Mục mới',
  group: 'Dữ liệu đầu vào',
  quickActions: [
    {
      id: 'them-muc',
      label: 'Thêm mới',
      icon: Plus,
      type: 'callback',
      callbackKey: 'OPEN_ADD_MUC_MODAL', // Key trong registry
      requiredPermissions: ['MUC_MOI_CREATE'],
    },
    {
      id: 'xuat-excel',
      label: 'Xuất Excel',
      icon: Download,
      type: 'callback',
      callbackKey: 'EXPORT_MUC_EXCEL',
    },
    {
      id: 'xoa-tat-ca',
      label: 'Xóa tất cả',
      icon: Trash,
      type: 'callback',
      callbackKey: 'XOA_TAT_CA_MUC',
      danger: true, // Cần confirm
      confirmMessage: 'Bạn có chắc muốn xóa tất cả?',
      confirmKeyword: 'XOA', // Phải gõ để confirm
      requiredPermissions: ['MUC_MOI_DELETE'],
    },
  ],
}
```

---

## 3. Đăng ký Quick Action Handler

Trong page component, sử dụng hook `useRegisterQuickAction`:

```typescript
import { useRegisterQuickAction } from '../config/quickActionRegistry'

export default function QuanLyMucMoi() {
  const [showModal, setShowModal] = useState(false)

  // Đăng ký handler cho quick action
  useRegisterQuickAction('OPEN_ADD_MUC_MODAL', () => {
    setShowModal(true)
  }, [])

  useRegisterQuickAction('EXPORT_MUC_EXCEL', async () => {
    // Logic xuất excel
    const data = await api.exportExcel()
    downloadFile(data)
  }, [])

  return (
    <div>
      {/* ... */}
      {showModal && <AddModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
```

---

## 4. Phân quyền (Permission)

### 4.1 Cấu hình quyền trong menu

```typescript
{
  id: 'admin-menu',
  label: 'Quản trị',
  requiredPermissions: ['ADMIN'], // Chỉ ADMIN mới thấy
}
```

### 4.2 Danh sách quyền thường dùng

| Permission | Mô tả |
|------------|-------|
| `ADMIN` | Super admin, thấy tất cả |
| `NHAN_VIEN_VIEW` | Xem nhân viên |
| `NHAN_VIEN_CREATE` | Thêm nhân viên |
| `BANG_LUONG_VIEW` | Xem bảng lương |
| `BANG_LUONG_CHOT` | Chốt bảng lương |
| `BANG_LUONG_KHOA` | Khóa bảng lương |
| `IMPORT_EXCEL` | Import dữ liệu |

### 4.3 Logic kiểm tra quyền

- Nếu không có `requiredPermissions` → hiển thị cho tất cả
- Nếu có `requiredPermissions` → user phải có ÍT NHẤT 1 quyền trong danh sách
- User có vai trò `ADMIN` → luôn thấy tất cả

---

## 5. Favorites & Recent Pages

### 5.1 Favorites

- User click icon ⭐ cạnh menu item để ghim
- Tối đa 8 mục
- Lưu vào localStorage với key: `payroll_favorites_{userId}`
- Tự động ẩn nếu mất quyền

### 5.2 Recent Pages

- Tự động track khi chuyển trang
- Lưu tối đa 10 trang gần nhất
- Key: `payroll_recent_{userId}`

---

## 6. Command Palette (Ctrl+K)

### 6.1 Sử dụng

- Nhấn `Ctrl+K` (Windows/Linux) hoặc `⌘K` (Mac)
- Gõ để tìm kiếm trang hoặc thao tác
- Dùng ↑↓ để chọn, Enter để thực hiện
- Escape để đóng

### 6.2 Các nhóm hiển thị

1. **Yêu thích** - Các mục đã ghim
2. **Gần đây** - Các trang vừa truy cập
3. **Đi tới** - Tất cả routes có thể đi
4. **Thao tác nhanh** - Quick actions
5. **Quản trị** - Chỉ cho ADMIN

---

## 7. Test Checklist

- [ ] Menu hiển thị đúng theo nhóm
- [ ] Tìm kiếm menu hoạt động (sidebar + Ctrl+K)
- [ ] Favorites: ghim/bỏ ghim + persist reload
- [ ] Recent pages tự động update
- [ ] Breadcrumbs hiển thị đúng đường dẫn
- [ ] Quick actions hiển thị theo route
- [ ] Permission ẩn đúng menu/actions
- [ ] Danger action yêu cầu confirm
- [ ] Responsive: sidebar collapse trên mobile

---

## 8. Troubleshooting

### Menu item không hiển thị

1. Kiểm tra `requiredPermissions` - user có quyền không?
2. Kiểm tra `path` có đúng format không (bắt đầu bằng `/`)
3. Kiểm tra ID có bị trùng không

### Quick action không chạy

1. Đảm bảo đã đăng ký handler bằng `useRegisterQuickAction`
2. Kiểm tra `callbackKey` khớp với key đăng ký
3. Đảm bảo component được mount khi action được gọi

### Breadcrumb không hiển thị

1. Kiểm tra route đã được thêm vào `routesMeta`
2. Kiểm tra `path` pattern khớp với actual URL
3. Nếu có dynamic params, kiểm tra `dynamicLabel` function

---

## 9. Best Practices

1. **ID unique**: Mỗi menu item phải có ID duy nhất
2. **Tags đa dạng**: Thêm tags tiếng Anh + tiếng Việt cho search tốt hơn
3. **Permission granular**: Phân quyền chi tiết (VIEW, CREATE, DELETE)
4. **Danger explicit**: Đánh dấu rõ các action nguy hiểm
5. **Confirm keyword ngắn**: Dùng keyword ngắn gọn (VD: "XOA", "KHOA")
