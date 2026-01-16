// Layout Component mới - Tích hợp Sidebar, Header, Breadcrumbs, Quick Actions, Command Palette
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import CommandPalette from '../command-palette/CommandPalette'
import { useCommandPalette } from '../../hooks/useCommandPalette'
import { useRecentPages } from '../../hooks/useRecentPages'

export default function NewLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const commandPalette = useCommandPalette()
  
  // Track recent pages
  useRecentPages()

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

  const toggleSidebar = () => {
    if (sidebarOpen && !sidebarCollapsed) {
      setSidebarCollapsed(true)
    } else if (sidebarOpen && sidebarCollapsed) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
      setSidebarCollapsed(false)
    }
  }

  // Tính toán margin cho main content
  const getMainMargin = () => {
    if (!sidebarOpen) return 'ml-0'
    if (sidebarCollapsed) return 'ml-16'
    return 'ml-64'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
        onOpenCommandPalette={commandPalette.open}
      />

      <div className="flex pt-14">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
        />

        {/* Main content */}
        <main
          className={`
            flex-1 p-6 transition-all duration-300 min-h-[calc(100vh-3.5rem)]
            ${getMainMargin()}
          `}
        >
          <Outlet />
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPalette.isOpen}
        onClose={commandPalette.close}
      />

      {/* Mobile overlay khi sidebar mở */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
