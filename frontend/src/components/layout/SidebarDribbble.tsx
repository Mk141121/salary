// Sidebar Dribbble Style - Premium Dark Navy
// Based on Thor Wallet UI reference
import { useState, useMemo, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Star,
  X,
  Settings,
  LogOut,
  Zap,
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useFavorites } from '../../hooks/useFavorites'
import { sidebarMenuGroups, MenuItem, MenuGroup, flattenMenuItems } from '../../config/sidebarMenu'
import toast from 'react-hot-toast'

interface SidebarProps {
  isOpen: boolean
  isCollapsed: boolean
  onToggleCollapse?: () => void
}

export default function SidebarDribbble({ isOpen, isCollapsed, onToggleCollapse }: SidebarProps) {
  const location = useLocation()
  const { coQuyen, coVaiTro, user, dangXuat } = useAuth()
  const { favorites, toggleFavorite, isFavorite, isFull } = useFavorites()
  
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['trang-chu', 'ky-luong', 'ung-luong'])
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  // Kiểm tra quyền
  const hasPermission = useCallback((permissions?: string[]): boolean => {
    if (!permissions || permissions.length === 0) return true
    if (coVaiTro('ADMIN')) return true
    return permissions.some(p => coQuyen(p) || coVaiTro(p))
  }, [coQuyen, coVaiTro])

  // Filter menu theo permission
  const filterItemsByPermission = useCallback((items: MenuItem[]): MenuItem[] => {
    return items
      .filter(item => hasPermission(item.requiredPermissions))
      .map(item => ({
        ...item,
        children: item.children ? filterItemsByPermission(item.children) : undefined,
      }))
      .filter(item => !item.children || item.children.length > 0)
  }, [hasPermission])

  // Filter menu theo search query
  const filterItemsBySearch = useCallback((items: MenuItem[], query: string): MenuItem[] => {
    const lowerQuery = query.toLowerCase()
    const result: MenuItem[] = []
    
    for (const item of items) {
      const labelMatch = item.label.toLowerCase().includes(lowerQuery)
      const tagMatch = item.tags?.some(t => t.toLowerCase().includes(lowerQuery))
      const childMatches = item.children 
        ? filterItemsBySearch(item.children, query)
        : []

      if (labelMatch || tagMatch || childMatches.length > 0) {
        result.push({
          ...item,
          children: childMatches.length > 0 ? childMatches : item.children,
        })
      }
    }
    
    return result
  }, [])

  // Processed menu groups
  const processedGroups = useMemo((): MenuGroup[] => {
    let groups = sidebarMenuGroups.map(group => ({
      ...group,
      items: filterItemsByPermission(group.items),
    })).filter(group => group.items.length > 0)

    if (searchQuery) {
      groups = groups.map(group => ({
        ...group,
        items: filterItemsBySearch(group.items, searchQuery),
      })).filter(group => group.items.length > 0)
    }

    return groups
  }, [filterItemsByPermission, filterItemsBySearch, searchQuery])

  // Favorites group
  const favoritesGroup = useMemo((): MenuGroup | null => {
    if (favorites.length === 0) return null
    
    const allItems = flattenMenuItems(sidebarMenuGroups)
    const favItems = favorites
      .map(id => allItems.find(item => item.id === id))
      .filter((item): item is MenuItem => !!item && hasPermission(item.requiredPermissions))

    if (favItems.length === 0) return null

    return {
      id: 'favorites',
      title: 'Yêu thích',
      items: favItems,
    }
  }, [favorites, hasPermission])

  // Toggle group expand
  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    )
  }

  // Toggle submenu expand
  const toggleSubmenu = (itemId: string) => {
    setExpandedMenus(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    )
  }

  // Handle favorite click
  const handleFavoriteClick = (e: React.MouseEvent, item: MenuItem) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isFavorite(item.id)) {
      toggleFavorite(item.id)
      toast.success(`Đã bỏ "${item.label}" khỏi yêu thích`)
    } else if (isFull) {
      toast.error(`Chỉ có thể ghim tối đa 8 mục yêu thích`)
    } else {
      toggleFavorite(item.id)
      toast.success(`Đã thêm "${item.label}" vào yêu thích`)
    }
  }

  // Check if item is active
  const isActive = (item: MenuItem) => {
    if (item.path === '/') {
      return location.pathname === '/'
    }
    return item.path && location.pathname.startsWith(item.path)
  }

  // Render menu item
  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const Icon = item.icon
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedMenus.includes(item.id)
    const active = isActive(item)
    const isFav = isFavorite(item.id)

    const content = (
      <>
        <div className={`
          flex items-center justify-center w-9 h-9 rounded-xl transition-all
          ${active ? 'bg-accent/20' : 'bg-transparent'}
        `}>
          <Icon 
            size={level > 0 ? 16 : 18} 
            className={active ? 'text-accent' : 'text-sidebar-muted'} 
            strokeWidth={active ? 2.5 : 2}
          />
        </div>
        {!isCollapsed && (
          <>
            <span className={`
              flex-1 truncate text-sm transition-colors
              ${active ? 'text-white font-medium' : 'text-sidebar-muted'}
            `}>
              {item.label}
            </span>
            {/* Favorite star */}
            {item.path && (
              <button
                onClick={(e) => handleFavoriteClick(e, item)}
                className={`
                  p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all
                  ${isFav ? 'opacity-100 text-yellow-400' : 'text-sidebar-muted hover:text-yellow-400'}
                  hover:bg-white/5
                `}
                title={isFav ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
              >
                <Star size={14} fill={isFav ? 'currentColor' : 'none'} />
              </button>
            )}
            {hasChildren && (
              <ChevronDown
                size={16}
                className={`text-sidebar-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              />
            )}
          </>
        )}
      </>
    )

    const itemClasses = `
      group flex items-center gap-3 px-2 py-1.5 mx-2 rounded-xl transition-all duration-200
      ${active 
        ? 'bg-white/5 border border-accent/50 text-white' 
        : 'hover:bg-white/5 border border-transparent'}
      ${level > 0 ? 'ml-4' : ''}
    `

    if (hasChildren) {
      return (
        <div key={item.id}>
          <button
            onClick={() => toggleSubmenu(item.id)}
            className={itemClasses}
            style={{ width: 'calc(100% - 16px)' }}
            title={isCollapsed ? item.label : undefined}
          >
            {content}
          </button>
          {isExpanded && !isCollapsed && (
            <div className="mt-1 space-y-0.5 ml-4 border-l border-white/10 pl-2">
              {item.children?.map(child => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        key={item.id}
        to={item.path || '#'}
        className={itemClasses}
        title={isCollapsed ? item.label : undefined}
      >
        {content}
      </Link>
    )
  }

  // Render group
  const renderGroup = (group: MenuGroup, showFavoriteIcon?: boolean) => {
    const isExpanded = expandedGroups.includes(group.id)

    return (
      <div key={group.id} className="mb-2">
        {/* Group title */}
        {!isCollapsed && (
          <button
            onClick={() => toggleGroup(group.id)}
            className="
              w-full flex items-center justify-between px-4 py-2 
              text-[11px] font-semibold uppercase tracking-wider text-sidebar-muted
              hover:text-white/80 transition-colors
            "
          >
            <span className="flex items-center gap-2">
              {showFavoriteIcon && <Star size={12} className="text-yellow-400" fill="currentColor" />}
              {group.title}
            </span>
            <ChevronRight
              size={12}
              className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            />
          </button>
        )}

        {/* Group items */}
        {(isExpanded || isCollapsed) && (
          <div className="space-y-0.5">
            {group.items.map(item => renderMenuItem(item, 0))}
          </div>
        )}
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <aside
      className={`
        fixed left-0 top-0 bottom-0 z-50
        flex flex-col
        transition-all duration-300 ease-out
        ${isCollapsed ? 'w-[72px]' : 'w-[260px]'}
      `}
      style={{
        background: 'linear-gradient(180deg, #0B1220 0%, #0F1B2E 100%)',
        borderRadius: '0 32px 32px 0',
        margin: '12px 0 12px 12px',
        height: 'calc(100vh - 24px)',
        boxShadow: '0 0 40px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Logo */}
      <div className={`
        flex items-center gap-3 px-5 py-6 border-b border-white/5
        ${isCollapsed ? 'justify-center' : ''}
      `}>
        <div className="
          w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent2 
          flex items-center justify-center shadow-glow-accent
        ">
          <Zap size={22} className="text-sidebar-solid" strokeWidth={2.5} />
        </div>
        {!isCollapsed && (
          <div>
            <h1 className="text-white font-bold text-lg tracking-tight">HRM</h1>
            <p className="text-sidebar-muted text-xs">Quản lý NS & Tính lương</p>
          </div>
        )}
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="px-4 py-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sidebar-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm nhanh… (Ctrl+K)"
              className="
                w-full pl-9 pr-8 py-2.5 text-sm rounded-xl
                bg-white/5 border border-white/10
                text-white placeholder:text-sidebar-muted
                focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50
                transition-all
              "
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sidebar-muted hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Menu items */}
      <nav className="flex-1 py-2 overflow-y-auto overflow-x-hidden scrollbar-thin">
        {/* Favorites group */}
        {favoritesGroup && !searchQuery && renderGroup(favoritesGroup, true)}
        
        {/* Divider after favorites */}
        {favoritesGroup && !searchQuery && (
          <div className="my-3 mx-4 border-t border-white/5" />
        )}

        {/* Regular groups */}
        {processedGroups.map(group => renderGroup(group))}

        {/* Empty search state */}
        {searchQuery && processedGroups.length === 0 && (
          <div className="px-4 py-8 text-center text-sidebar-muted text-sm">
            Không tìm thấy "{searchQuery}"
          </div>
        )}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-white/5 p-3">
        {/* User & Actions */}
        <div className={`flex items-center gap-2 ${isCollapsed ? 'flex-col' : ''}`}>
          {/* User avatar */}
          <Link 
            to="/ho-so"
            className="
              flex items-center gap-3 flex-1 p-2 rounded-xl
              hover:bg-white/5 transition-all group
            "
            title={isCollapsed ? user?.hoTen || 'Hồ sơ' : undefined}
          >
            <div className="
              w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500
              flex items-center justify-center text-white font-semibold text-sm
            ">
              {user?.hoTen?.charAt(0) || 'U'}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {user?.hoTen || 'Người dùng'}
                </p>
                <p className="text-sidebar-muted text-xs truncate">
                  {user?.email || user?.tenDangNhap}
                </p>
              </div>
            )}
          </Link>

          {/* Settings & Logout */}
          <div className={`flex gap-1 ${isCollapsed ? 'flex-col' : ''}`}>
            <Link
              to="/cai-dat"
              className="
                p-2.5 rounded-xl text-sidebar-muted hover:text-white hover:bg-white/5
                transition-all
              "
              title="Cài đặt"
            >
              <Settings size={18} />
            </Link>
            <button
              onClick={dangXuat}
              className="
                p-2.5 rounded-xl text-sidebar-muted hover:text-red-400 hover:bg-red-500/10
                transition-all
              "
              title="Đăng xuất"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="
            w-full mt-3 flex items-center justify-center gap-2 py-2.5 rounded-xl
            text-sidebar-muted hover:text-white hover:bg-white/5
            transition-all text-sm
          "
        >
          {isCollapsed ? (
            <ChevronRight size={18} />
          ) : (
            <>
              <ChevronLeft size={18} />
              <span>Thu gọn</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
