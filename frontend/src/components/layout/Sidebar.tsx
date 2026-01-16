// Sidebar Component - Menu theo luồng vận hành
import { useState, useMemo, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ChevronDown,
  ChevronRight,
  Search,
  Star,
  X,
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useFavorites } from '../../hooks/useFavorites'
import { sidebarMenuGroups, MenuItem, MenuGroup, flattenMenuItems, getGroupColorClasses } from '../../config/sidebarMenu'
import toast from 'react-hot-toast'

interface SidebarProps {
  isOpen: boolean
  isCollapsed: boolean // Icon-only mode
}

export default function Sidebar({ isOpen, isCollapsed }: SidebarProps) {
  const location = useLocation()
  const { coQuyen, coVaiTro } = useAuth()
  const { favorites, toggleFavorite, isFavorite, isFull } = useFavorites()
  
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['du-lieu-dau-vao', 'ky-luong'])
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

  // Highlight search text
  const highlightText = (text: string, query: string) => {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={i} className="bg-yellow-200 px-0.5 rounded">{part}</mark>
        : part
    )
  }

  // Check if item is active
  const isActive = (item: MenuItem) => {
    if (item.path === '/') {
      return location.pathname === '/'
    }
    return item.path && location.pathname.startsWith(item.path)
  }

  // Render menu item with group color context
  const renderMenuItem = (item: MenuItem, level: number = 0, groupColor?: string) => {
    const Icon = item.icon
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedMenus.includes(item.id)
    const active = isActive(item)
    const isFav = isFavorite(item.id)
    const colorClasses = getGroupColorClasses(groupColor)

    const baseClasses = `
      group flex items-center gap-3 px-3 py-2 mx-2 rounded-lg transition-all duration-150
      ${active 
        ? `${colorClasses.bg} ${colorClasses.text} font-medium border-l-3 ${colorClasses.border}` 
        : `text-gray-600 hover:bg-gray-100`}
      ${level > 0 ? 'ml-6 text-sm border-l-2 border-gray-200 pl-4' : ''}
    `

    const content = (
      <>
        <div className={`p-1 rounded ${active ? colorClasses.iconBg : ''}`}>
          <Icon size={level > 0 ? 14 : 18} className={active ? colorClasses.text : 'text-gray-500'} />
        </div>
        {!isCollapsed && (
          <>
            <span className="flex-1 truncate">
              {highlightText(item.label, searchQuery)}
            </span>
            {/* Favorite star */}
            {item.path && (
              <button
                onClick={(e) => handleFavoriteClick(e, item)}
                className={`
                  p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity
                  ${isFav ? 'opacity-100 text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}
                `}
                title={isFav ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
              >
                <Star size={14} fill={isFav ? 'currentColor' : 'none'} />
              </button>
            )}
            {hasChildren && (
              <ChevronDown
                size={16}
                className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              />
            )}
          </>
        )}
      </>
    )

    if (hasChildren) {
      return (
        <div key={item.id}>
          <button
            onClick={() => toggleSubmenu(item.id)}
            className={baseClasses}
            style={{ width: 'calc(100% - 16px)' }}
            title={isCollapsed ? item.label : undefined}
          >
            {content}
          </button>
          {isExpanded && !isCollapsed && (
            <div className="mt-1 space-y-0.5 bg-gray-50/50 rounded-lg py-1 mx-2">
              {item.children?.map(child => renderMenuItem(child, level + 1, groupColor))}
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        key={item.id}
        to={item.path || '#'}
        className={baseClasses}
        title={isCollapsed ? item.label : undefined}
      >
        {content}
      </Link>
    )
  }

  // Render group
  const renderGroup = (group: MenuGroup) => {
    const isExpanded = expandedGroups.includes(group.id) || !group.collapsible
    const colorClasses = getGroupColorClasses(group.color)

    return (
      <div key={group.id} className="mb-1">
        {/* Group title */}
        {group.collapsible ? (
          <button
            onClick={() => toggleGroup(group.id)}
            className={`
              w-full flex items-center justify-between px-4 py-2 text-xs font-semibold uppercase tracking-wider
              ${isExpanded ? colorClasses.text : 'text-gray-500'}
              hover:text-gray-700 transition-colors
            `}
          >
            {!isCollapsed && (
              <span className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${isExpanded ? colorClasses.bg.replace('bg-', 'bg-').replace('-50', '-500') : 'bg-gray-300'}`} 
                      style={{ backgroundColor: isExpanded ? (group.color === 'blue' ? '#3b82f6' : group.color === 'purple' ? '#a855f7' : group.color === 'green' ? '#22c55e' : group.color === 'orange' ? '#f97316' : group.color === 'cyan' ? '#06b6d4' : group.color === 'red' ? '#ef4444' : '#64748b') : undefined }} />
                {group.title}
              </span>
            )}
            {!isCollapsed && (
              <ChevronRight
                size={14}
                className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              />
            )}
          </button>
        ) : (
          !isCollapsed && (
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {group.title}
            </div>
          )
        )}

        {/* Group items */}
        {(isExpanded || isCollapsed) && (
          <div className="space-y-0.5">
            {group.items.map(item => renderMenuItem(item, 0, group.color))}
          </div>
        )}
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <aside
      className={`
        fixed left-0 top-14 bottom-0 bg-white shadow-lg transition-all duration-300 z-40
        ${isCollapsed ? 'w-16' : 'w-64'}
        overflow-hidden
      `}
    >
      {/* Search */}
      {!isCollapsed && (
        <div className="p-3 border-b">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm nhanh…"
              className="w-full pl-9 pr-8 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Menu items */}
      <nav className="py-2 overflow-y-auto h-[calc(100%-60px)]">
        {/* Favorites group */}
        {favoritesGroup && !searchQuery && renderGroup(favoritesGroup)}
        
        {/* Divider after favorites */}
        {favoritesGroup && !searchQuery && (
          <div className="my-2 mx-4 border-t border-gray-200" />
        )}

        {/* Regular groups */}
        {processedGroups.map(group => renderGroup(group))}

        {/* Empty search state */}
        {searchQuery && processedGroups.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-500 text-sm">
            Không tìm thấy "{searchQuery}"
          </div>
        )}
      </nav>
    </aside>
  )
}
