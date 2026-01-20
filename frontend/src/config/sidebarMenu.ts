// Cấu hình menu sidebar theo luồng vận hành
import {
  Home,
  ClipboardList,
  CalendarDays,
  Target,
  Package,
  Truck,
  DollarSign,
  FileSpreadsheet,
  History,
  Wallet,
  BookOpen,
  Settings,
  FileText,
  CheckCircle,
  CalendarRange,
  ListTodo,
  Award,
  BarChart3,
  Receipt,
  Briefcase,
  UserCog,
  Scale,
  Zap,
  ScrollText,
  UserPlus,
  FolderTree,
  Clock,
  FileDown,
  Boxes,
  LucideIcon,
  Calendar,
  Sun,
  ClipboardCheck,
  Send,
  Smartphone,
  Search,
} from 'lucide-react'

export interface MenuItem {
  id: string
  label: string
  icon: LucideIcon
  path?: string
  children?: MenuItem[]
  requiredPermissions?: string[]
  tags?: string[] // Dùng cho search
  badge?: string // Badge hiển thị (vd: "Mới", số lượng)
  disabled?: boolean // Đang phát triển
}

export interface MenuGroup {
  id: string
  title: string
  items: MenuItem[]
  collapsible?: boolean
  color?: string // Màu nhấn cho group
}

// Danh sách menu theo nhóm luồng vận hành
// Thứ tự: Trang Chủ → Kỳ lương → Ứng lương → Sổ lương → Tính lương → Dữ liệu đầu vào → Thiết lập hệ thống → Quản trị
export const sidebarMenuGroups: MenuGroup[] = [
  // (1) Tổng quan
  {
    id: 'tong-quan',
    title: 'Tổng quan',
    collapsible: false,
    items: [
      {
        id: 'trang-chu',
        label: 'Trang chủ',
        icon: Home,
        path: '/',
        tags: ['dashboard', 'home', 'tổng quan'],
      },
      {
        id: 'cong-nhan-vien',
        label: 'Cổng nhân viên',
        icon: Smartphone,
        path: '/portal',
        tags: ['portal', 'employee', 'self-service', 'mobile', 'pwa'],
        badge: 'Mới',
      },
    ],
  },

  // (2) Kỳ lương - Màu xanh dương (primary workflow)
  {
    id: 'ky-luong',
    title: 'Kỳ lương',
    collapsible: true,
    color: 'blue',
    items: [
      {
        id: 'bang-luong',
        label: 'Bảng lương',
        icon: FileSpreadsheet,
        path: '/bang-luong',
        requiredPermissions: ['BANG_LUONG_VIEW'],
        tags: ['payroll', 'salary sheet', 'bảng tính'],
      },
      {
        id: 'cau-hinh-cot-bang-luong',
        label: 'Cấu hình cột',
        icon: Settings,
        path: '/cau-hinh/bang-luong',
        requiredPermissions: ['BANG_LUONG_VIEW'],
        tags: ['column', 'config', 'cấu hình', 'cột'],
      },
    ],
  },

  // (3) Ứng lương - Màu tím
  {
    id: 'ung-luong',
    title: 'Ứng lương',
    collapsible: true,
    color: 'purple',
    items: [
      {
        id: 'bang-ung-luong',
        label: 'Bảng ứng lương',
        icon: Wallet,
        path: '/ung-luong',
        requiredPermissions: ['UNG_LUONG_VIEW'],
        tags: ['advance', 'tạm ứng'],
      },
      {
        id: 'cau-hinh-cot-ung-luong',
        label: 'Cấu hình cột',
        icon: Settings,
        path: '/cau-hinh/ung-luong',
        requiredPermissions: ['UNG_LUONG_VIEW'],
        tags: ['column', 'config', 'cấu hình', 'cột'],
      },
    ],
  },

  // (4) Báo cáo & Sổ lương - Màu xanh lá
  {
    id: 'bao-cao',
    title: 'Báo cáo & Sổ lương',
    collapsible: true,
    color: 'green',
    items: [
      {
        id: 'so-luong-nhan-vien',
        label: 'Sổ lương nhân viên',
        icon: BookOpen,
        path: '/so-luong/nhan-vien',
        requiredPermissions: ['SO_LUONG_VIEW'],
        tags: ['employee salary book', 'sổ lương'],
      },
      {
        id: 'so-luong-phong-ban',
        label: 'Sổ lương phòng ban',
        icon: BarChart3,
        path: '/so-luong/phong-ban',
        requiredPermissions: ['SO_LUONG_VIEW'],
        tags: ['department salary', 'báo cáo phòng ban'],
      },
    ],
  },

  // (5) Tính lương - Màu cam
  {
    id: 'tinh-luong',
    title: 'Tính lương',
    collapsible: true,
    color: 'orange',
    items: [
      {
        id: 'khoan-luong',
        label: 'Khoản lương',
        icon: Receipt,
        path: '/khoan-luong',
        requiredPermissions: ['KHOAN_LUONG_VIEW'],
        tags: ['salary component', 'thành phần lương'],
      },
      {
        id: 'quy-che',
        label: 'Quy chế lương',
        icon: Scale,
        path: '/quy-che',
        requiredPermissions: ['QUY_CHE_VIEW'],
        tags: ['rule', 'engine', 'công thức', 'quy tắc'],
      },
      {
        id: 'su-kien',
        label: 'Sự kiện thưởng/phạt',
        icon: Zap,
        path: '/su-kien',
        requiredPermissions: ['SU_KIEN_VIEW'],
        tags: ['bonus', 'penalty', 'thưởng', 'phạt'],
      },
    ],
  },

  // (6) Dữ liệu đầu vào - Màu slate (neutral)
  {
    id: 'du-lieu-dau-vao',
    title: 'Dữ liệu đầu vào',
    collapsible: true,
    color: 'slate',
    items: [
      {
        id: 'nhan-vien',
        label: 'Nhân viên',
        icon: UserPlus,
        path: '/nhan-vien',
        requiredPermissions: ['NHAN_VIEN_VIEW'],
        tags: ['employee', 'staff', 'nhân sự'],
      },
      {
        id: 'phong-ban',
        label: 'Phòng ban',
        icon: FolderTree,
        path: '/phong-ban',
        requiredPermissions: ['PHONG_BAN_VIEW'],
        tags: ['department', 'tổ chức'],
      },
      {
        id: 'nhom-nhan-vien',
        label: 'Nhóm nhân viên',
        icon: Briefcase,
        path: '/nhom-nhan-vien',
        requiredPermissions: ['NHOM_NV_VIEW'],
        tags: ['group', 'team'],
      },
      {
        id: 'cham-cong',
        label: 'Chấm công',
        icon: Clock,
        path: '/cham-cong',
        requiredPermissions: ['CHAM_CONG_VIEW'],
        tags: ['attendance', 'timesheet', 'giờ làm'],
      },
      {
        id: 'xep-ca',
        label: 'Xếp ca',
        icon: Calendar,
        requiredPermissions: ['PHAN_CA_VIEW'],
        tags: ['scheduling', 'shift', 'ca làm việc'],
        badge: 'Mới',
        children: [
          {
            id: 'danh-muc-ca',
            label: 'Danh mục ca',
            icon: Sun,
            path: '/xep-ca/danh-muc-ca',
            tags: ['shift', 'ca'],
          },
          {
            id: 'lich-phan-ca',
            label: 'Lịch phân ca',
            icon: CalendarRange,
            path: '/xep-ca/lich-phan-ca',
            tags: ['schedule', 'calendar', 'lịch'],
          },
        ],
      },
      {
        id: 'nghi-phep',
        label: 'Nghỉ phép',
        icon: CalendarDays,
        requiredPermissions: ['NGHI_PHEP_VIEW'],
        tags: ['leave', 'off', 'nghỉ'],
        children: [
          {
            id: 'don-cua-toi',
            label: 'Đơn nghỉ của tôi',
            icon: FileText,
            path: '/nghi-phep/don-cua-toi',
            tags: ['my leave', 'đơn của tôi'],
          },
          {
            id: 'duyet-nghi-phep',
            label: 'Duyệt nghỉ phép',
            icon: CheckCircle,
            path: '/nghi-phep/duyet',
            requiredPermissions: ['NGHI_PHEP_DUYET'],
            tags: ['approve', 'duyệt'],
          },
          {
            id: 'lich-nghi',
            label: 'Lịch nghỉ phép',
            icon: CalendarRange,
            path: '/nghi-phep/lich',
            tags: ['calendar', 'lịch'],
          },
          {
            id: 'loai-nghi',
            label: 'Danh mục loại nghỉ',
            icon: ListTodo,
            path: '/nghi-phep/loai-nghi',
            requiredPermissions: ['ADMIN'],
            tags: ['category', 'loại'],
          },
        ],
      },
      {
        id: 'yeu-cau',
        label: 'Yêu cầu',
        icon: ClipboardCheck,
        requiredPermissions: ['YEU_CAU_VIEW'],
        tags: ['request', 'OT', 'trễ giờ', 'về sớm', 'công tác'],
        badge: 'Mới',
        children: [
          {
            id: 'don-yeu-cau-cua-toi',
            label: 'Đơn của tôi',
            icon: Send,
            path: '/yeu-cau/don-cua-toi',
            tags: ['my request', 'đơn của tôi'],
          },
          {
            id: 'duyet-yeu-cau',
            label: 'Duyệt yêu cầu',
            icon: CheckCircle,
            path: '/yeu-cau/duyet',
            requiredPermissions: ['YEU_CAU_DUYET_CAP_1', 'YEU_CAU_DUYET_CAP_2'],
            tags: ['approve', 'duyệt'],
          },
        ],
      },
      {
        id: 'kpi',
        label: 'KPI',
        icon: Target,
        requiredPermissions: ['KPI_VIEW'],
        tags: ['performance', 'đánh giá', 'hiệu suất'],
        children: [
          {
            id: 'kpi-template',
            label: 'Template KPI',
            icon: ClipboardList,
            path: '/kpi/template',
            tags: ['template', 'mẫu'],
          },
          {
            id: 'kpi-ky-danh-gia',
            label: 'Kỳ đánh giá',
            icon: Award,
            path: '/kpi/ky-danh-gia',
            tags: ['period', 'kỳ'],
          },
          {
            id: 'kpi-cau-hinh-thuong',
            label: 'Cấu hình thưởng',
            icon: DollarSign,
            path: '/kpi/cau-hinh-thuong',
            tags: ['bonus', 'thưởng'],
          },
        ],
      },
      {
        id: 'san-luong',
        label: 'Sản lượng',
        icon: Boxes,
        requiredPermissions: ['SAN_LUONG_VIEW'],
        tags: ['output', 'production'],
        children: [
          {
            id: 'tra-cuu-san-luong',
            label: 'Tra cứu sản lượng',
            icon: Search,
            path: '/san-luong',
            tags: ['tra cứu', 'search', 'xem'],
          },
          {
            id: 'import-chia-hang',
            label: 'Chia hàng',
            icon: Package,
            path: '/import-chia-hang',
            tags: ['sorting', 'phân loại'],
          },
          {
            id: 'import-giao-hang',
            label: 'Giao hàng',
            icon: Truck,
            path: '/import-giao-hang',
            tags: ['delivery', 'vận chuyển'],
          },
          {
            id: 'lich-su-import',
            label: 'Lịch sử Import',
            icon: History,
            path: '/lich-su-import',
            tags: ['history', 'lịch sử'],
          },
        ],
      },
      {
        id: 'import-excel',
        label: 'Import Excel',
        icon: FileDown,
        path: '/import-excel',
        requiredPermissions: ['IMPORT_EXCEL'],
        tags: ['import', 'upload', 'excel'],
      },
    ],
  },

  // (7) Thiết lập hệ thống - Màu cyan
  {
    id: 'thiet-lap',
    title: 'Thiết lập hệ thống',
    collapsible: true,
    color: 'cyan',
    items: [
      {
        id: 'cai-dat',
        label: 'Cài đặt hệ thống',
        icon: Settings,
        path: '/cai-dat',
        requiredPermissions: ['ADMIN'],
        tags: ['settings', 'configuration', 'cấu hình'],
      },
    ],
  },

  // (8) Quản trị - Màu đỏ (admin only)
  {
    id: 'quan-tri',
    title: 'Quản trị',
    collapsible: true,
    color: 'red',
    items: [
      {
        id: 'nguoi-dung',
        label: 'Người dùng',
        icon: UserCog,
        path: '/quan-tri/nguoi-dung',
        requiredPermissions: ['ADMIN'],
        tags: ['user', 'account', 'tài khoản'],
      },
      {
        id: 'audit-log',
        label: 'Nhật ký hệ thống',
        icon: ScrollText,
        path: '/quan-tri/audit-log',
        requiredPermissions: ['ADMIN'],
        tags: ['log', 'history', 'nhật ký'],
      },
    ],
  },
]

// Flatten tất cả menu items để search
export function flattenMenuItems(groups: MenuGroup[]): MenuItem[] {
  const result: MenuItem[] = []
  
  for (const group of groups) {
    for (const item of group.items) {
      result.push(item)
      if (item.children) {
        result.push(...item.children)
      }
    }
  }
  
  return result
}

// Tìm menu item theo path
export function findMenuItemByPath(path: string): MenuItem | undefined {
  const allItems = flattenMenuItems(sidebarMenuGroups)
  return allItems.find(item => item.path === path)
}

// Tìm parent group của menu item
export function findMenuGroupByItemId(itemId: string): MenuGroup | undefined {
  return sidebarMenuGroups.find(group => 
    group.items.some(item => 
      item.id === itemId || item.children?.some(child => child.id === itemId)
    )
  )
}

// Get color classes for group
export function getGroupColorClasses(color?: string): {
  text: string
  bg: string
  border: string
  hover: string
  iconBg: string
} {
  switch (color) {
    case 'blue':
      return { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-l-blue-500', hover: 'hover:bg-blue-50', iconBg: 'bg-blue-100' }
    case 'purple':
      return { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-l-purple-500', hover: 'hover:bg-purple-50', iconBg: 'bg-purple-100' }
    case 'green':
      return { text: 'text-green-600', bg: 'bg-green-50', border: 'border-l-green-500', hover: 'hover:bg-green-50', iconBg: 'bg-green-100' }
    case 'orange':
      return { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-l-orange-500', hover: 'hover:bg-orange-50', iconBg: 'bg-orange-100' }
    case 'cyan':
      return { text: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-l-cyan-500', hover: 'hover:bg-cyan-50', iconBg: 'bg-cyan-100' }
    case 'red':
      return { text: 'text-red-600', bg: 'bg-red-50', border: 'border-l-red-500', hover: 'hover:bg-red-50', iconBg: 'bg-red-100' }
    case 'slate':
    default:
      return { text: 'text-slate-600', bg: 'bg-slate-50', border: 'border-l-slate-400', hover: 'hover:bg-slate-50', iconBg: 'bg-slate-100' }
  }
}
