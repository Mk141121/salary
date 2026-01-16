// Hook quản lý favorites menu items
import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'

const MAX_FAVORITES = 8
const STORAGE_KEY_PREFIX = 'payroll_favorites_'

export function useFavorites() {
  const { user, coQuyen, coVaiTro } = useAuth()
  const [favorites, setFavorites] = useState<string[]>([])

  const storageKey = user ? `${STORAGE_KEY_PREFIX}${user.id}` : null

  // Load từ localStorage
  useEffect(() => {
    if (storageKey) {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) {
            setFavorites(parsed)
          }
        } catch {
          // Invalid JSON
        }
      }
    }
  }, [storageKey])

  // Save to localStorage
  const saveFavorites = useCallback((items: string[]) => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(items))
    }
  }, [storageKey])

  // Toggle favorite
  const toggleFavorite = useCallback((itemId: string) => {
    setFavorites(prev => {
      let next: string[]
      if (prev.includes(itemId)) {
        next = prev.filter(id => id !== itemId)
      } else {
        if (prev.length >= MAX_FAVORITES) {
          return prev // Không thêm nếu đã đủ
        }
        next = [...prev, itemId]
      }
      saveFavorites(next)
      return next
    })
  }, [saveFavorites])

  // Kiểm tra có phải favorite không
  const isFavorite = useCallback((itemId: string) => {
    return favorites.includes(itemId)
  }, [favorites])

  // Kiểm tra đã full chưa
  const isFull = favorites.length >= MAX_FAVORITES

  // Filter favorites theo permission (loại bỏ items không còn quyền)
  const filterByPermission = useCallback((
    requiredPermissions?: string[]
  ): boolean => {
    if (!requiredPermissions || requiredPermissions.length === 0) return true
    // ADMIN có full quyền
    if (coVaiTro('ADMIN')) return true
    return requiredPermissions.some(p => coQuyen(p) || coVaiTro(p))
  }, [coQuyen, coVaiTro])

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    isFull,
    maxFavorites: MAX_FAVORITES,
    filterByPermission,
  }
}
