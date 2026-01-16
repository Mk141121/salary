// Header Component - Với Breadcrumbs và Quick Actions
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, Search, Command } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import Breadcrumbs from './Breadcrumbs'
import QuickActions from './QuickActions'

interface HeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
  onOpenCommandPalette: () => void
}

export default function Header({ 
  sidebarOpen, 
  onToggleSidebar,
  onOpenCommandPalette,
}: HeaderProps) {
  const navigate = useNavigate()
  const { user, isAuthenticated, dangXuat, vaiTros } = useAuth()

  const handleLogout = async () => {
    await dangXuat()
    navigate('/dang-nhap')
  }

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={sidebarOpen ? 'Thu gọn menu' : 'Mở rộng menu'}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link to="/" className="text-xl font-bold text-primary-600 hidden sm:block">
            💰 Hệ Thống Tính Lương
          </Link>

          {/* Breadcrumbs */}
          <div className="hidden md:block border-l pl-4 ml-2">
            <Breadcrumbs />
          </div>
        </div>

        {/* Center section - Quick search button */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <Search size={16} />
          <span>Tìm nhanh...</span>
          <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-xs bg-white rounded shadow-sm">
            <Command size={10} className="mr-0.5" />K
          </kbd>
        </button>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Quick Actions */}
          <div className="hidden sm:block">
            <QuickActions />
          </div>

          {/* User menu */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-gray-900">{user.hoTen}</div>
                <div className="text-xs text-gray-500">
                  {vaiTros.join(', ') || 'Chưa gán vai trò'}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

      {/* Mobile breadcrumbs */}
      <div className="md:hidden px-4 pb-2 border-t pt-2">
        <Breadcrumbs />
      </div>
    </header>
  )
}
