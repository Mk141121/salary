// Mobile Layout - Employee Portal với Bottom Navigation
// Sprint 5: PWA style, mobile-first
// Sprint 6: NotificationBell integration
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Calendar,
  Clock,
  FileText,
  User,
  Menu,
  X,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import NotificationBell from '../NotificationBell';
import { useAuth } from '../../contexts/AuthContext';

interface NavItem {
  id: string;
  label: string;
  icon: typeof Home;
  path: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Trang chủ', icon: Home, path: '/portal' },
  { id: 'schedule', label: 'Lịch làm', icon: Calendar, path: '/portal/lich-lam' },
  { id: 'attendance', label: 'Chấm công', icon: Clock, path: '/portal/cham-cong' },
  { id: 'requests', label: 'Yêu cầu', icon: FileText, path: '/portal/yeu-cau' },
  { id: 'profile', label: 'Cá nhân', icon: User, path: '/portal/ca-nhan' },
];

export default function MobileLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, dangXuat } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const activeTab = navItems.find((item) => location.pathname === item.path)?.id || 'home';

  const getPageTitle = () => {
    const item = navItems.find((n) => location.pathname.startsWith(n.path));
    return item?.label || 'Portal';
  };

  const handleLogout = async () => {
    await dangXuat();
    navigate('/dang-nhap');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {/* Back button or Logo */}
          {location.pathname !== '/portal' ? (
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-9" /> // Placeholder
          )}

          {/* Title */}
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            {getPageTitle()}
          </h1>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <NotificationBell />
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Side Menu Overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowMenu(false)}>
          <div
            className="absolute right-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <span className="font-semibold text-gray-900 dark:text-white">Menu</span>
              <button
                onClick={() => setShowMenu(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User info */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                  {user?.hoTen?.[0] || 'U'}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{user?.hoTen}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <nav className="p-2">
              <button
                onClick={() => navigate('/')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Home className="w-5 h-5" />
                <span>Về trang Admin</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
                <span>Đăng xuất</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-lg mx-auto px-4 py-4">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 safe-area-pb">
        <div className="max-w-lg mx-auto flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'stroke-[2.5]' : ''}`} />
                <span className={`text-xs ${isActive ? 'font-medium' : ''}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
