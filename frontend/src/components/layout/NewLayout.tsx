// Layout Component - Premium Dribbble Style
import { Outlet, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SidebarDribbble from './SidebarDribbble'
import HeaderPremium from './HeaderPremium'
import CommandPalette from '../command-palette/CommandPalette'
import ChatbotWidget from '../chatbot/ChatbotWidget'
import { useCommandPalette } from '../../hooks/useCommandPalette'
import { useRecentPages } from '../../hooks/useRecentPages'
import { initTheme } from '../../lib/theme'
import { useAuth } from '../../contexts/AuthContext'

export default function NewLayout() {
  const { isAuthenticated, vaiTros, isLoading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const commandPalette = useCommandPalette()
  
  // Track recent pages
  useRecentPages()

  // Initialize theme on mount
  useEffect(() => {
    initTheme()
  }, [])

  // Responsive: tự động collapse sidebar trên màn hình nhỏ
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else if (window.innerWidth < 1024) {
        setSidebarOpen(true)
        setSidebarCollapsed(true)
      } else {
        setSidebarOpen(true)
        setSidebarCollapsed(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Listen for command palette events
  useEffect(() => {
    const handleOpenPalette = () => commandPalette.open()
    window.addEventListener('open-command-palette', handleOpenPalette)
    return () => window.removeEventListener('open-command-palette', handleOpenPalette)
  }, [commandPalette])

  // Kiểm tra quyền truy cập - chỉ ADMIN, HR, MANAGER được vào trang admin
  // EMPLOYEE phải redirect sang portal
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-app)' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/dang-nhap" replace />
  }

  // Nếu là EMPLOYEE và không có vai trò quản lý -> redirect sang portal
  const isManager = vaiTros.some(vt => ['ADMIN', 'HR', 'MANAGER'].includes(vt))
  if (!isManager && vaiTros.includes('EMPLOYEE')) {
    return <Navigate to="/portal" replace />
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // Tính toán margin cho main content - Dribbble style với sidebar bo góc
  const sidebarWidth = sidebarCollapsed ? 72 : 260
  const contentMargin = sidebarWidth + 36 // sidebar + margin + padding

  return (
    <div 
      className="min-h-screen"
      style={{ background: 'var(--bg-app)' }}
    >
      {/* Sidebar - Dribbble Style */}
      <SidebarDribbble
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      {/* Main content area */}
      <div 
        className="min-h-screen transition-all duration-300"
        style={{
          marginLeft: sidebarOpen ? `${contentMargin}px` : '24px',
          paddingRight: '24px',
        }}
      >
        {/* Header - Premium Style */}
        <HeaderPremium
          onToggleSidebar={toggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Page content */}
        <main className="pt-20 pb-8">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPalette.isOpen}
        onClose={commandPalette.close}
      />

      {/* Chatbot Widget - HRM Assistant */}
      <ChatbotWidget />

      {/* Mobile overlay khi sidebar mở */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
