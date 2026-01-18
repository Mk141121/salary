// Command Palette Component - Ctrl+K/⌘K
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Navigation,
  Star,
  Clock,
  Zap,
  Settings,
  AlertTriangle,
  X,
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useFavorites } from '../../hooks/useFavorites'
import { useRecentPages } from '../../hooks/useRecentPages'
import { sidebarMenuGroups, flattenMenuItems, MenuItem } from '../../config/sidebarMenu'
import { routesMeta, QuickAction } from '../../config/routes'
import { useQuickActionRegistry } from '../../config/quickActionRegistry'

interface CommandItem {
  id: string
  type: 'route' | 'action' | 'favorite' | 'recent'
  label: string
  description?: string
  icon: React.ReactNode
  path?: string
  action?: QuickAction
  danger?: boolean
}

interface CommandGroup {
  id: string
  title: string
  icon: React.ReactNode
  items: CommandItem[]
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const navigate = useNavigate()
  const { coQuyen, coVaiTro } = useAuth()
  const { favorites } = useFavorites()
  const { recentPages } = useRecentPages()
  const registry = useQuickActionRegistry()
  
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [confirmAction, setConfirmAction] = useState<QuickAction | null>(null)
  const [confirmInput, setConfirmInput] = useState('')
  
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Focus input khi mở
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setConfirmAction(null)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Kiểm tra quyền
  const hasPermission = useCallback((permissions?: string[]): boolean => {
    if (!permissions || permissions.length === 0) return true
    if (coVaiTro('ADMIN')) return true
    return permissions.some(p => coQuyen(p) || coVaiTro(p))
  }, [coQuyen, coVaiTro])

  // Build command groups
  const commandGroups = useMemo((): CommandGroup[] => {
    const groups: CommandGroup[] = []
    const allMenuItems = flattenMenuItems(sidebarMenuGroups)
    const lowerQuery = query.toLowerCase()

    // 1. Favorites (chỉ khi không search)
    if (!query && favorites.length > 0) {
      const favItems: CommandItem[] = favorites
        .map(id => allMenuItems.find(m => m.id === id))
        .filter((item): item is MenuItem => !!item && hasPermission(item.requiredPermissions))
        .map(item => ({
          id: `fav-${item.id}`,
          type: 'favorite' as const,
          label: item.label,
          icon: <item.icon size={16} />,
          path: item.path,
        }))

      if (favItems.length > 0) {
        groups.push({
          id: 'favorites',
          title: 'Yêu thích',
          icon: <Star size={14} />,
          items: favItems,
        })
      }
    }

    // 2. Recent (chỉ khi không search)
    if (!query && recentPages.length > 0) {
      const recentItems: CommandItem[] = recentPages
        .slice(0, 5)
        .map(page => ({
          id: `recent-${page.path}`,
          type: 'recent' as const,
          label: page.title,
          description: page.path,
          icon: <Clock size={16} />,
          path: page.path,
        }))

      if (recentItems.length > 0) {
        groups.push({
          id: 'recent',
          title: 'Gần đây',
          icon: <Clock size={14} />,
          items: recentItems,
        })
      }
    }

    // 3. Routes (Đi tới)
    const routeItems: CommandItem[] = allMenuItems
      .filter(item => {
        if (!item.path) return false
        if (!hasPermission(item.requiredPermissions)) return false
        if (!query) return true
        return item.label.toLowerCase().includes(lowerQuery) ||
               item.tags?.some(t => t.toLowerCase().includes(lowerQuery))
      })
      .map(item => ({
        id: `route-${item.id}`,
        type: 'route' as const,
        label: item.label,
        icon: <item.icon size={16} />,
        path: item.path,
      }))

    if (routeItems.length > 0) {
      groups.push({
        id: 'routes',
        title: 'Đi tới',
        icon: <Navigation size={14} />,
        items: query ? routeItems.slice(0, 8) : routeItems.slice(0, 5),
      })
    }

    // 4. Quick Actions (Thao tác nhanh)
    const allActions: CommandItem[] = []
    for (const route of routesMeta) {
      if (!route.quickActions) continue
      for (const action of route.quickActions) {
        if (!hasPermission(action.requiredPermissions)) continue
        
        const matchesQuery = !query ||
          action.label.toLowerCase().includes(lowerQuery) ||
          route.label.toLowerCase().includes(lowerQuery)
        
        if (matchesQuery) {
          allActions.push({
            id: `action-${route.path}-${action.id}`,
            type: 'action' as const,
            label: action.label,
            description: `trong ${route.label}`,
            icon: <action.icon size={16} />,
            action,
            danger: action.danger,
          })
        }
      }
    }

    if (allActions.length > 0) {
      groups.push({
        id: 'actions',
        title: 'Thao tác nhanh',
        icon: <Zap size={14} />,
        items: query ? allActions.slice(0, 8) : allActions.slice(0, 5),
      })
    }

    // 5. Admin (chỉ cho ADMIN)
    if (coVaiTro('ADMIN') && !query) {
      groups.push({
        id: 'admin',
        title: 'Quản trị',
        icon: <Settings size={14} />,
        items: [
          {
            id: 'admin-users',
            type: 'route',
            label: 'Quản lý người dùng',
            icon: <Settings size={16} />,
            path: '/quan-tri/nguoi-dung',
          },
          {
            id: 'admin-audit',
            type: 'route',
            label: 'Audit Log',
            icon: <Settings size={16} />,
            path: '/quan-tri/audit-log',
          },
        ],
      })
    }

    return groups
  }, [query, favorites, recentPages, hasPermission, coVaiTro])

  // Flatten all items for navigation
  const allItems = useMemo(() => {
    return commandGroups.flatMap(g => g.items)
  }, [commandGroups])

  // Scroll to selected item
  useEffect(() => {
    const element = document.querySelector(`[data-index="${selectedIndex}"]`)
    element?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (confirmAction) {
      if (e.key === 'Escape') {
        setConfirmAction(null)
        setConfirmInput('')
      } else if (e.key === 'Enter') {
        if (!confirmAction.confirmKeyword || 
            confirmInput.toUpperCase() === confirmAction.confirmKeyword.toUpperCase()) {
          executeAction(confirmAction)
          setConfirmAction(null)
          setConfirmInput('')
        }
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, allItems.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (allItems[selectedIndex]) {
          handleItemSelect(allItems[selectedIndex])
        }
        break
      case 'Escape':
        onClose()
        break
    }
  }

  // Execute action
  const executeAction = async (action: QuickAction) => {
    onClose()
    if (action.type === 'route' && action.to) {
      navigate(action.to)
    } else if (action.type === 'callback' && action.callbackKey) {
      await registry.execute(action.callbackKey)
    }
  }

  // Handle item select
  const handleItemSelect = (item: CommandItem) => {
    if (item.type === 'action' && item.action) {
      if (item.danger && item.action.confirmKeyword) {
        setConfirmAction(item.action)
        return
      }
      executeAction(item.action)
    } else if (item.path) {
      onClose()
      navigate(item.path)
    }
  }

  // Highlight search text
  const highlightText = (text: string) => {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <mark key={i} className="bg-[#53F39A]/30 text-[#53F39A] px-0.5 rounded">{part}</mark>
        : part
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh]">
      {/* Backdrop - Glassmorphism */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Palette - Premium Dark Style */}
      <div
        className="
          relative w-full max-w-2xl overflow-hidden
          rounded-2xl border border-white/10
          bg-[#0B1220]/95 backdrop-blur-xl
          shadow-2xl shadow-black/40
          animate-fade-in
        "
        onKeyDown={handleKeyDown}
      >
        {/* Confirm mode */}
        {confirmAction ? (
          <div className="p-6">
            <div className="flex items-center gap-3 text-[#FF4D6D] mb-4">
              <AlertTriangle size={24} />
              <h3 className="text-lg font-semibold">Xác nhận thao tác</h3>
            </div>
            
            <p className="text-slate-300 mb-4">
              {confirmAction.confirmMessage || `Bạn có chắc muốn "${confirmAction.label}"?`}
            </p>

            <div className="mb-4">
              <label className="block text-sm text-slate-400 mb-2">
                Gõ <span className="font-mono font-bold text-[#FF4D6D]">{confirmAction.confirmKeyword}</span> để xác nhận:
              </label>
              <input
                type="text"
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-white/5 border border-white/10
                  text-white placeholder-slate-500
                  focus:outline-none focus:ring-2 focus:ring-[#FF4D6D]/50 focus:border-[#FF4D6D]/50
                "
                placeholder={`Gõ ${confirmAction.confirmKeyword}...`}
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setConfirmAction(null); setConfirmInput('') }}
                className="px-4 py-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                Huỷ
              </button>
              <button
                onClick={() => {
                  if (!confirmAction.confirmKeyword || 
                      confirmInput.toUpperCase() === confirmAction.confirmKeyword.toUpperCase()) {
                    executeAction(confirmAction)
                    setConfirmAction(null)
                    setConfirmInput('')
                  }
                }}
                disabled={!!(confirmAction.confirmKeyword &&
                  confirmInput.toUpperCase() !== confirmAction.confirmKeyword.toUpperCase())}
                className="px-4 py-2 bg-[#FF4D6D] text-white rounded-xl hover:bg-[#FF4D6D]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Xác nhận
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Search input - Premium Style */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <Search size={20} className="text-slate-500" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                placeholder="Tìm trang, thao tác..."
                className="
                  flex-1 text-lg bg-transparent text-white
                  outline-none placeholder:text-slate-500
                "
              />
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-slate-500 bg-white/5 border border-white/10 rounded-lg">
                ESC
              </kbd>
              <button
                onClick={onClose}
                className="p-1 text-slate-500 hover:text-white sm:hidden transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[55vh] overflow-y-auto">
              {commandGroups.length === 0 ? (
                <div className="px-5 py-10 text-center text-slate-500">
                  Không tìm thấy kết quả cho "{query}"
                </div>
              ) : (
                commandGroups.map((group, groupIndex) => {
                  const startIndex = commandGroups
                    .slice(0, groupIndex)
                    .reduce((acc, g) => acc + g.items.length, 0)

                  return (
                    <div key={group.id} className="py-2">
                      {/* Group header */}
                      <div className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {group.icon}
                        {group.title}
                      </div>

                      {/* Group items */}
                      {group.items.map((item, itemIndex) => {
                        const globalIndex = startIndex + itemIndex
                        const isSelected = globalIndex === selectedIndex

                        return (
                          <button
                            key={item.id}
                            data-index={globalIndex}
                            onClick={() => handleItemSelect(item)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`
                              w-full flex items-center gap-3 px-5 py-3 text-left transition-all duration-150
                              ${isSelected 
                                ? 'bg-[#53F39A]/10 border-l-2 border-l-[#53F39A]' 
                                : 'border-l-2 border-l-transparent hover:bg-white/5'
                              }
                              ${item.danger ? 'text-[#FF4D6D]' : 'text-slate-300'}
                            `}
                          >
                            <span className={`
                              flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                              ${isSelected 
                                ? 'bg-[#53F39A]/20 text-[#53F39A]' 
                                : item.danger 
                                  ? 'bg-[#FF4D6D]/10 text-[#FF4D6D]' 
                                  : 'bg-white/5 text-slate-400'
                              }
                            `}>
                              {item.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className={`font-medium ${isSelected ? 'text-white' : ''}`}>
                                {highlightText(item.label)}
                              </div>
                              {item.description && (
                                <div className="text-xs text-slate-500 truncate">
                                  {item.description}
                                </div>
                              )}
                            </div>
                            {item.type === 'favorite' && (
                              <Star size={14} className="text-amber-400" fill="currentColor" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )
                })
              )}
            </div>

            {/* Footer - Premium Style */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 bg-white/[0.02] text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↑↓</kbd>
                  <span className="hidden sm:inline">di chuyển</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↵</kbd>
                  <span className="hidden sm:inline">chọn</span>
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">esc</kbd>
                <span className="hidden sm:inline">đóng</span>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
