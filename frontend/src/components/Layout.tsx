// Layout Component - Khung giao diện chính
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Home,
  FileSpreadsheet,
  Users,
  DollarSign,
  Upload,
  Menu,
  X,
  Target,
  Shield,
  ClipboardList,
  Award,
  Settings,
  LogOut,
  ChevronDown,
  LucideIcon,
  Building2,
  Cog,
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface MenuItem {
  path: string
  label: string
  icon: LucideIcon
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  { path: '/', label: 'Trang chủ', icon: Home },
  { path: '/bang-luong', label: 'Bảng lương', icon: FileSpreadsheet },
  { path: '/phong-ban', label: 'Phòng ban', icon: Building2 },
  { path: '/nhan-vien', label: 'Nhân viên', icon: Users },
  { path: '/khoan-luong', label: 'Khoản lương', icon: DollarSign },
  { path: '/cham-cong', label: 'Chấm công', icon: ClipboardList },
  { path: '/quy-che', label: 'Quy chế lương', icon: Cog },
  { path: '/su-kien', label: 'Sự kiện thưởng/phạt', icon: Award },
  { path: '/import-excel', label: 'Import Excel', icon: Upload },
  { path: '/cai-dat', label: 'Cài đặt', icon: Settings },
  { 
    path: '/kpi', 
    label: 'Quản lý KPI', 
    icon: Target,
    children: [
      { path: '/kpi/template', label: 'Template KPI', icon: ClipboardList },
      { path: '/kpi/ky-danh-gia', label: 'Kỳ đánh giá', icon: Award },
      { path: '/kpi/cau-hinh-thuong', label: 'Cấu hình thưởng', icon: DollarSign },
    ]
  },
  { 
    path: '/quan-tri', 
    label: 'Quản trị', 
    icon: Shield,
    children: [
      { path: '/quan-tri/nguoi-dung', label: 'Người dùng', icon: Users },
      { path: '/quan-tri/audit-log', label: 'Audit Log', icon: Settings },
    ]
  },
]

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, dangXuat, vaiTros } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const toggleSubmenu = (path: string) => {
    setExpandedMenus(prev => 
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    )
  }

  const handleLogout = async () => {
    await dangXuat()
    navigate('/dang-nhap')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-bold text-primary-600">
              💰 Hệ Thống Tính Lương
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{user.hoTen}</div>
                  <div className="text-xs text-gray-500">
                    {vaiTros.join(', ') || 'Chưa gán vai trò'}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  title="Đăng xuất"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/dang-nhap"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside
          className={`
            fixed left-0 top-14 bottom-0 bg-white shadow-lg transition-all duration-300 z-40
            ${sidebarOpen ? 'w-56' : 'w-0 overflow-hidden'}
          `}
        >
          <nav className="py-4 overflow-y-auto h-full">
            {menuItems.map((item) => {
              const Icon = item.icon
              const hasChildren = item.children && item.children.length > 0
              const isExpanded = expandedMenus.includes(item.path)
              const isActive = location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path))

              return (
                <div key={item.path}>
                  {hasChildren ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.path)}
                        className={`
                          w-full flex items-center justify-between gap-3 px-4 py-3 mx-2 rounded-lg transition-colors
                          ${isActive
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-100'
                          }
                        `}
                        style={{ width: 'calc(100% - 16px)' }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={20} />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <ChevronDown size={16} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      {isExpanded && (
                        <div className="ml-6 mt-1 space-y-1">
                          {item.children?.map((child) => {
                            const ChildIcon = child.icon
                            const isChildActive = location.pathname === child.path
                            return (
                              <Link
                                key={child.path}
                                to={child.path}
                                className={`
                                  flex items-center gap-3 px-4 py-2 mx-2 rounded-lg transition-colors text-sm
                                  ${isChildActive
                                    ? 'bg-primary-100 text-primary-700'
                                    : 'text-gray-500 hover:bg-gray-100'
                                  }
                                `}
                              >
                                <ChildIcon size={16} />
                                <span>{child.label}</span>
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`
                        flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors
                        ${isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                        }
                      `}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main
          className={`
            flex-1 p-6 transition-all duration-300
            ${sidebarOpen ? 'ml-56' : 'ml-0'}
          `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
