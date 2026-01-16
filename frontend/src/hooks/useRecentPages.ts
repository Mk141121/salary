// Hook quản lý recent pages
import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { findRouteMeta } from '../config/routes'

const MAX_RECENT = 10
const STORAGE_KEY_PREFIX = 'payroll_recent_'

export interface RecentPage {
  path: string
  title: string
  time: number // timestamp
}

export function useRecentPages() {
  const { user } = useAuth()
  const location = useLocation()
  const [recentPages, setRecentPages] = useState<RecentPage[]>([])

  const storageKey = user ? `${STORAGE_KEY_PREFIX}${user.id}` : null

  // Load từ localStorage
  useEffect(() => {
    if (storageKey) {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) {
            setRecentPages(parsed)
          }
        } catch {
          // Invalid JSON
        }
      }
    }
  }, [storageKey])

  // Save to localStorage
  const saveRecent = useCallback((items: RecentPage[]) => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(items))
    }
  }, [storageKey])

  // Track page changes
  useEffect(() => {
    if (!storageKey) return

    const routeMeta = findRouteMeta(location.pathname)
    if (!routeMeta) return

    // Không track login page
    if (location.pathname === '/dang-nhap') return

    const newPage: RecentPage = {
      path: location.pathname,
      title: routeMeta.label,
      time: Date.now(),
    }

    setRecentPages(prev => {
      // Loại bỏ nếu đã tồn tại
      const filtered = prev.filter(p => p.path !== newPage.path)
      // Thêm vào đầu
      const next = [newPage, ...filtered].slice(0, MAX_RECENT)
      saveRecent(next)
      return next
    })
  }, [location.pathname, storageKey, saveRecent])

  // Xóa một recent page
  const removeRecent = useCallback((path: string) => {
    setRecentPages(prev => {
      const next = prev.filter(p => p.path !== path)
      saveRecent(next)
      return next
    })
  }, [saveRecent])

  // Xóa tất cả
  const clearRecent = useCallback(() => {
    setRecentPages([])
    if (storageKey) {
      localStorage.removeItem(storageKey)
    }
  }, [storageKey])

  return {
    recentPages,
    removeRecent,
    clearRecent,
  }
}
