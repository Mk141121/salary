// HeaderPremium - Minimal header with breadcrumbs and actions
import { useState, useRef, useEffect } from 'react'
import {
  Search,
  Bell,
  Command,
  X,
  Check,
  Info,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'
import Breadcrumbs from './Breadcrumbs'

interface Notification {
  id: number
  type: 'info' | 'success' | 'warning'
  title: string
  message: string
  time: string
  read: boolean
}

// Demo notifications - có thể thay bằng API thực tế
const demoNotifications: Notification[] = [
  {
    id: 1,
    type: 'success',
    title: 'Bảng lương đã tính xong',
    message: 'Bảng lương tháng 01/2026 đã được tính toán thành công',
    time: '5 phút trước',
    read: false,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Cần duyệt ứng lương',
    message: 'Có 3 yêu cầu ứng lương chờ duyệt',
    time: '1 giờ trước',
    read: false,
  },
  {
    id: 3,
    type: 'info',
    title: 'Import sản lượng',
    message: 'File chia hàng tháng 01 đã được import',
    time: '2 giờ trước',
    read: true,
  },
]

interface HeaderPremiumProps {
  onToggleSidebar?: () => void
  sidebarCollapsed?: boolean
}

export default function HeaderPremium({ sidebarCollapsed }: HeaderPremiumProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => !n.read).length

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={16} className="text-green-500" />
      case 'warning': return <AlertTriangle size={16} className="text-amber-500" />
      default: return <Info size={16} className="text-blue-500" />
    }
  }

  // Handle Ctrl+K for command palette
  const handleOpenCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'))
  }

  return (
    <header 
      className="
        fixed top-0 right-0 z-40
        h-16 flex items-center justify-between gap-4
        px-6 transition-all duration-300
        bg-bg-main/80 backdrop-blur-md
      "
      style={{
        left: sidebarCollapsed ? '96px' : '284px',
      }}
    >
      {/* Left side - Breadcrumbs */}
      <div className="flex items-center gap-4">
        <Breadcrumbs />
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        {/* Command palette trigger */}
        <button
          onClick={handleOpenCommandPalette}
          className="
            flex items-center gap-2 px-3 py-2 rounded-xl
            bg-panel border border-border
            text-text-secondary text-sm
            hover:bg-panel-hover hover:border-border-hover
            transition-all
            backdrop-blur-xl
          "
          title="Tìm kiếm nhanh (Ctrl+K)"
        >
          <Search size={16} />
          <span className="hidden md:inline">Tìm kiếm...</span>
          <kbd className="
            hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded
            bg-bg-2 text-text-muted text-xs font-mono
          ">
            <Command size={10} />K
          </kbd>
        </button>

        {/* Notifications */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="
              relative p-2.5 rounded-xl
              bg-panel border border-border
              text-text-secondary
              hover:bg-panel-hover hover:text-text
              transition-all
              backdrop-blur-xl
            "
            title="Thông báo"
          >
            <Bell size={18} />
            {/* Notification badge */}
            {unreadCount > 0 && (
              <span className="
                absolute -top-1 -right-1 min-w-[18px] h-[18px] 
                flex items-center justify-center
                bg-accent text-white text-xs font-medium
                rounded-full px-1
              ">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification dropdown */}
          {showNotifications && (
            <div className="
              absolute top-full right-0 mt-2 w-80
              bg-panel border border-border rounded-xl
              shadow-xl overflow-hidden
              animate-in fade-in slide-in-from-top-2 duration-200
            ">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-text">Thông báo</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-accent hover:text-accent/80 transition-colors"
                      title="Đánh dấu tất cả đã đọc"
                    >
                      <Check size={14} />
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="text-xs text-text-muted hover:text-text transition-colors"
                      title="Xóa tất cả"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Notification list */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-text-muted">
                    <Bell size={32} className="mx-auto mb-2 opacity-50" />
                    <p>Không có thông báo</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={`
                        px-4 py-3 border-b border-border/50 last:border-0
                        hover:bg-panel-hover cursor-pointer transition-colors
                        ${!notification.read ? 'bg-accent/5' : ''}
                      `}
                    >
                      <div className="flex gap-3">
                        <div className="mt-0.5">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-sm font-medium ${!notification.read ? 'text-text' : 'text-text-secondary'}`}>
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-1.5" />
                            )}
                          </div>
                          <p className="text-xs text-text-muted mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-text-muted/70 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="px-4 py-2 border-t border-border bg-bg-2/50">
                  <button className="w-full text-center text-xs text-accent hover:text-accent/80 py-1">
                    Xem tất cả thông báo
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
