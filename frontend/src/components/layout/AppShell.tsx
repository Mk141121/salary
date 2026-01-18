// AppShell - Premium Layout with Dribbble Sidebar
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import SidebarDribbble from './SidebarDribbble'
import HeaderPremium from './HeaderPremium'
import { initTheme } from '../../lib/theme'

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Initialize theme on mount
  useEffect(() => {
    initTheme()
  }, [])

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Get sidebar width for content margin
  const sidebarWidth = sidebarCollapsed ? 72 : 260
  const contentMargin = sidebarWidth + 24 // sidebar + padding

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'var(--bg-app)',
      }}
    >
      {/* Sidebar */}
      <SidebarDribbble
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content area */}
      <div 
        className="min-h-screen transition-all duration-300"
        style={{
          marginLeft: `${contentMargin}px`,
          paddingRight: '24px',
        }}
      >
        {/* Header */}
        <HeaderPremium 
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Page content */}
        <main className="pt-20 pb-8">
          <div className="animate-fadeIn">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
