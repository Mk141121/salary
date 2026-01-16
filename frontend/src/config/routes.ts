// Cấu hình route meta cho breadcrumbs và quick actions
import {
  Plus,
  Upload,
  Download,
  Play,
  Lock,
  Unlock,
  Camera,
  RefreshCw,
  Send,
  Calculator,
  CheckCircle,
  LucideIcon,
} from 'lucide-react'

export interface QuickAction {
  id: string
  label: string
  icon: LucideIcon
  requiredPermissions?: string[]
  type: 'route' | 'modal' | 'callback'
  to?: string // Nếu type = 'route'
  callbackKey?: string // Nếu type = 'callback', dùng key để lookup trong registry
  danger?: boolean // Cần confirm
  confirmMessage?: string // Message xác nhận
  confirmKeyword?: string // Keyword phải gõ để xác nhận (vd: "KHOA")
}

export interface RouteMeta {
  path: string
  label: string
  group?: string // Nhóm cha (cho breadcrumb)
  parent?: string // Route cha
  requiredPermissions?: string[]
  dynamicLabel?: (params: Record<string, string>) => string
  quickActions?: QuickAction[]
}

// Danh sách route meta
export const routesMeta: RouteMeta[] = [
  // Trang chủ
  {
    path: '/',
    label: 'Trang chủ',
    group: 'Tổng quan',
    quickActions: [
      {
        id: 'tao-ky-luong',
        label: 'Tạo kỳ lương',
        icon: Plus,
        type: 'route',
        to: '/bang-luong?action=create',
        requiredPermissions: ['BANG_LUONG_CREATE'],
      },
      {
        id: 'import-excel',
        label: 'Import Excel',
        icon: Upload,
        type: 'route',
        to: '/import-excel',
        requiredPermissions: ['IMPORT_EXCEL'],
      },
    ],
  },

  // Nhân viên
  {
    path: '/nhan-vien',
    label: 'Nhân viên',
    group: 'Dữ liệu đầu vào',
    quickActions: [
      {
        id: 'them-nhan-vien',
        label: 'Thêm nhân viên',
        icon: Plus,
        type: 'callback',
        callbackKey: 'OPEN_ADD_NHAN_VIEN_MODAL',
        requiredPermissions: ['NHAN_VIEN_CREATE'],
      },
      {
        id: 'xuat-excel-nv',
        label: 'Xuất Excel',
        icon: Download,
        type: 'callback',
        callbackKey: 'EXPORT_NHAN_VIEN_EXCEL',
      },
    ],
  },
  {
    path: '/nhan-vien/:id',
    label: 'Chi tiết nhân viên',
    parent: '/nhan-vien',
    dynamicLabel: (params) => `Nhân viên #${params.id}`,
  },

  // Phòng ban
  {
    path: '/phong-ban',
    label: 'Phòng ban',
    group: 'Dữ liệu đầu vào',
    quickActions: [
      {
        id: 'them-phong-ban',
        label: 'Thêm phòng ban',
        icon: Plus,
        type: 'callback',
        callbackKey: 'OPEN_ADD_PHONG_BAN_MODAL',
        requiredPermissions: ['PHONG_BAN_CREATE'],
      },
    ],
  },

  // Nhóm nhân viên
  {
    path: '/nhom-nhan-vien',
    label: 'Nhóm nhân viên',
    group: 'Dữ liệu đầu vào',
  },

  // Chấm công
  {
    path: '/cham-cong',
    label: 'Chấm công',
    group: 'Dữ liệu đầu vào',
    quickActions: [
      {
        id: 'import-cham-cong',
        label: 'Import chấm công',
        icon: Upload,
        type: 'callback',
        callbackKey: 'IMPORT_CHAM_CONG',
        requiredPermissions: ['CHAM_CONG_IMPORT'],
      },
      {
        id: 'tong-hop-ngay-cong',
        label: 'Tổng hợp ngày công',
        icon: Calculator,
        type: 'callback',
        callbackKey: 'TONG_HOP_NGAY_CONG',
      },
    ],
  },

  // Nghỉ phép
  {
    path: '/nghi-phep/don-cua-toi',
    label: 'Đơn nghỉ của tôi',
    group: 'Nghỉ phép',
    quickActions: [
      {
        id: 'tao-don-nghi',
        label: 'Tạo đơn nghỉ',
        icon: Plus,
        type: 'callback',
        callbackKey: 'OPEN_TAO_DON_NGHI_MODAL',
      },
    ],
  },
  {
    path: '/nghi-phep/duyet',
    label: 'Duyệt nghỉ phép',
    group: 'Nghỉ phép',
    requiredPermissions: ['NGHI_PHEP_DUYET'],
  },
  {
    path: '/nghi-phep/lich',
    label: 'Lịch nghỉ phép',
    group: 'Nghỉ phép',
  },
  {
    path: '/nghi-phep/loai-nghi',
    label: 'Danh mục loại nghỉ',
    group: 'Nghỉ phép',
    requiredPermissions: ['ADMIN'],
    quickActions: [
      {
        id: 'them-loai-nghi',
        label: 'Thêm loại nghỉ',
        icon: Plus,
        type: 'callback',
        callbackKey: 'OPEN_ADD_LOAI_NGHI_MODAL',
        requiredPermissions: ['ADMIN'],
      },
    ],
  },

  // KPI
  {
    path: '/kpi/template',
    label: 'Template KPI',
    group: 'KPI',
  },
  {
    path: '/kpi/ky-danh-gia',
    label: 'Kỳ đánh giá',
    group: 'KPI',
  },
  {
    path: '/kpi/cau-hinh-thuong',
    label: 'Cấu hình thưởng',
    group: 'KPI',
  },

  // Sản lượng
  {
    path: '/import-chia-hang',
    label: 'Chia hàng',
    group: 'Sản lượng',
    quickActions: [
      {
        id: 'import-chia-hang',
        label: 'Import file',
        icon: Upload,
        type: 'callback',
        callbackKey: 'IMPORT_CHIA_HANG',
      },
    ],
  },
  {
    path: '/import-giao-hang',
    label: 'Giao hàng',
    group: 'Sản lượng',
    quickActions: [
      {
        id: 'import-giao-hang',
        label: 'Import file',
        icon: Upload,
        type: 'callback',
        callbackKey: 'IMPORT_GIAO_HANG',
      },
    ],
  },
  {
    path: '/lich-su-import',
    label: 'Lịch sử Import',
    group: 'Sản lượng',
  },

  // Import Excel
  {
    path: '/import-excel',
    label: 'Import Excel',
    group: 'Dữ liệu đầu vào',
  },

  // Quy chế lương
  {
    path: '/quy-che',
    label: 'Quy chế lương',
    group: 'Tính lương',
    quickActions: [
      {
        id: 'tao-rule',
        label: 'Tạo rule mới',
        icon: Plus,
        type: 'callback',
        callbackKey: 'OPEN_TAO_RULE_MODAL',
        requiredPermissions: ['QUY_CHE_CREATE'],
      },
      {
        id: 'preview-rule',
        label: 'Preview',
        icon: Play,
        type: 'route',
        to: '/rule-trace',
      },
    ],
  },
  {
    path: '/quy-che/:id',
    label: 'Chi tiết quy chế',
    parent: '/quy-che',
    dynamicLabel: (params) => `Quy chế #${params.id}`,
  },

  // Khoản lương
  {
    path: '/khoan-luong',
    label: 'Khoản lương',
    group: 'Tính lương',
    quickActions: [
      {
        id: 'them-khoan-luong',
        label: 'Thêm khoản lương',
        icon: Plus,
        type: 'callback',
        callbackKey: 'OPEN_ADD_KHOAN_LUONG_MODAL',
        requiredPermissions: ['KHOAN_LUONG_CREATE'],
      },
    ],
  },

  // Sự kiện thưởng/phạt
  {
    path: '/su-kien',
    label: 'Sự kiện thưởng/phạt',
    group: 'Tính lương',
  },

  // Bảng lương
  {
    path: '/bang-luong',
    label: 'Bảng lương',
    group: 'Kỳ lương',
    quickActions: [
      {
        id: 'tao-bang-luong',
        label: 'Tạo bảng lương',
        icon: Plus,
        type: 'callback',
        callbackKey: 'OPEN_TAO_BANG_LUONG_MODAL',
        requiredPermissions: ['BANG_LUONG_CREATE'],
      },
    ],
  },
  {
    path: '/bang-luong/:id',
    label: 'Chi tiết bảng lương',
    parent: '/bang-luong',
    dynamicLabel: (params) => `Bảng lương #${params.id}`,
    quickActions: [
      {
        id: 'snapshot',
        label: 'Snapshot',
        icon: Camera,
        type: 'callback',
        callbackKey: 'SNAPSHOT_BANG_LUONG',
      },
      {
        id: 'chay-rule',
        label: 'Chạy Rule',
        icon: Play,
        type: 'callback',
        callbackKey: 'RUN_RULE_ENGINE',
        requiredPermissions: ['BANG_LUONG_TINH'],
      },
      {
        id: 'tinh-lai',
        label: 'Tính lại',
        icon: RefreshCw,
        type: 'callback',
        callbackKey: 'TINH_LAI_LUONG',
      },
      {
        id: 'chot-ky',
        label: 'Chốt kỳ',
        icon: CheckCircle,
        type: 'callback',
        callbackKey: 'CHOT_KY_LUONG',
        requiredPermissions: ['BANG_LUONG_CHOT'],
      },
      {
        id: 'khoa-ky',
        label: 'Khoá kỳ',
        icon: Lock,
        type: 'callback',
        callbackKey: 'KHOA_KY_LUONG',
        danger: true,
        confirmMessage: 'Khoá vĩnh viễn kỳ lương này? Sau khi khoá sẽ không thể mở lại.',
        confirmKeyword: 'KHOA',
        requiredPermissions: ['BANG_LUONG_KHOA'],
      },
      {
        id: 'mo-khoa',
        label: 'Mở khoá',
        icon: Unlock,
        type: 'callback',
        callbackKey: 'MO_KHOA_BANG_LUONG',
        requiredPermissions: ['BANG_LUONG_KHOA'],
      },
      {
        id: 'xuat-excel',
        label: 'Xuất Excel',
        icon: Download,
        type: 'callback',
        callbackKey: 'EXPORT_BANG_LUONG_EXCEL',
      },
      {
        id: 'gui-phieu-luong',
        label: 'Gửi phiếu lương',
        icon: Send,
        type: 'callback',
        callbackKey: 'GUI_PHIEU_LUONG_TAT_CA',
      },
    ],
  },

  // Ứng lương
  {
    path: '/ung-luong',
    label: 'Bảng ứng lương',
    group: 'Ứng lương',
    quickActions: [
      {
        id: 'tao-bang-ung',
        label: 'Tạo bảng ứng',
        icon: Plus,
        type: 'callback',
        callbackKey: 'OPEN_TAO_BANG_UNG_MODAL',
        requiredPermissions: ['UNG_LUONG_CREATE'],
      },
    ],
  },
  {
    path: '/ung-luong/:id',
    label: 'Chi tiết bảng ứng lương',
    parent: '/ung-luong',
    dynamicLabel: (params) => `Bảng ứng #${params.id}`,
    quickActions: [
      {
        id: 'tinh-eligibility',
        label: 'Tính eligibility',
        icon: Calculator,
        type: 'callback',
        callbackKey: 'TINH_ELIGIBILITY_UNG_LUONG',
      },
      {
        id: 'chot-bang-ung',
        label: 'Chốt',
        icon: CheckCircle,
        type: 'callback',
        callbackKey: 'CHOT_BANG_UNG_LUONG',
        requiredPermissions: ['UNG_LUONG_CHOT'],
      },
      {
        id: 'xuat-excel-ung',
        label: 'Xuất Excel',
        icon: Download,
        type: 'callback',
        callbackKey: 'EXPORT_UNG_LUONG_EXCEL',
      },
    ],
  },

  // Sổ lương
  {
    path: '/so-luong/nhan-vien',
    label: 'Sổ lương nhân viên',
    group: 'Báo cáo',
    quickActions: [
      {
        id: 'xuat-so-luong-nv',
        label: 'Xuất Excel',
        icon: Download,
        type: 'callback',
        callbackKey: 'EXPORT_SO_LUONG_NV',
      },
    ],
  },
  {
    path: '/so-luong/phong-ban',
    label: 'Sổ lương phòng ban',
    group: 'Báo cáo',
    quickActions: [
      {
        id: 'xuat-so-luong-pb',
        label: 'Xuất Excel',
        icon: Download,
        type: 'callback',
        callbackKey: 'EXPORT_SO_LUONG_PB',
      },
    ],
  },

  // Cài đặt
  {
    path: '/cai-dat',
    label: 'Cài đặt hệ thống',
    group: 'Thiết lập',
    requiredPermissions: ['ADMIN'],
  },

  // Quản trị
  {
    path: '/quan-tri/nguoi-dung',
    label: 'Người dùng',
    group: 'Quản trị',
    requiredPermissions: ['ADMIN'],
    quickActions: [
      {
        id: 'them-nguoi-dung',
        label: 'Thêm người dùng',
        icon: Plus,
        type: 'callback',
        callbackKey: 'OPEN_ADD_NGUOI_DUNG_MODAL',
        requiredPermissions: ['ADMIN'],
      },
    ],
  },
  {
    path: '/quan-tri/audit-log',
    label: 'Audit Log',
    group: 'Quản trị',
    requiredPermissions: ['ADMIN'],
  },

  // Rule trace
  {
    path: '/rule-trace',
    label: 'Rule Trace',
    group: 'Tính lương',
  },
]

// Tìm route meta theo path (hỗ trợ dynamic params)
export function findRouteMeta(pathname: string): RouteMeta | undefined {
  // Exact match first
  const exact = routesMeta.find(r => r.path === pathname)
  if (exact) return exact

  // Dynamic match (vd: /bang-luong/123 -> /bang-luong/:id)
  for (const route of routesMeta) {
    if (route.path.includes(':')) {
      const pattern = route.path.replace(/:[^/]+/g, '[^/]+')
      const regex = new RegExp(`^${pattern}$`)
      if (regex.test(pathname)) {
        return route
      }
    }
  }

  return undefined
}

// Build breadcrumbs từ path
export function buildBreadcrumbs(pathname: string): { label: string; path?: string }[] {
  const breadcrumbs: { label: string; path?: string }[] = []
  const currentRoute = findRouteMeta(pathname)
  
  if (!currentRoute) {
    return [{ label: 'Trang chủ', path: '/' }]
  }

  // Thêm group nếu có
  if (currentRoute.group) {
    breadcrumbs.push({ label: currentRoute.group })
  }

  // Thêm parent nếu có
  if (currentRoute.parent) {
    const parentRoute = findRouteMeta(currentRoute.parent)
    if (parentRoute) {
      breadcrumbs.push({ label: parentRoute.label, path: parentRoute.path })
    }
  }

  // Thêm current
  breadcrumbs.push({ label: currentRoute.label })

  return breadcrumbs
}

// Extract params từ pathname so với route pattern
export function extractParams(pathname: string, pattern: string): Record<string, string> {
  const params: Record<string, string> = {}
  const patternParts = pattern.split('/')
  const pathParts = pathname.split('/')

  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      const key = patternParts[i].slice(1)
      params[key] = pathParts[i]
    }
  }

  return params
}
