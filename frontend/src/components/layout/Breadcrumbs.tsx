// Breadcrumbs Component - Hiển thị đường dẫn theo route
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { useMemo } from 'react'
import { findRouteMeta, extractParams } from '../../config/routes'

export default function Breadcrumbs() {
  const location = useLocation()

  const breadcrumbs = useMemo(() => {
    const items: { label: string; path?: string }[] = []
    
    // Luôn có Trang chủ
    if (location.pathname !== '/') {
      items.push({ label: 'Trang chủ', path: '/' })
    }

    const currentRoute = findRouteMeta(location.pathname)
    if (!currentRoute) {
      return items
    }

    // Thêm group nếu có (không link)
    if (currentRoute.group && currentRoute.group !== 'Tổng quan') {
      items.push({ label: currentRoute.group })
    }

    // Thêm parent nếu có
    if (currentRoute.parent) {
      const parentRoute = findRouteMeta(currentRoute.parent)
      if (parentRoute) {
        items.push({ label: parentRoute.label, path: parentRoute.path })
      }
    }

    // Thêm current page (không link vì đang ở trang này)
    let currentLabel = currentRoute.label
    if (currentRoute.dynamicLabel && currentRoute.path.includes(':')) {
      const extractedParams = extractParams(location.pathname, currentRoute.path)
      currentLabel = currentRoute.dynamicLabel(extractedParams)
    }
    items.push({ label: currentLabel })

    return items
  }, [location.pathname])

  // Không hiển thị breadcrumb nếu chỉ có trang chủ hoặc đang ở trang chủ
  if (breadcrumbs.length <= 1 && location.pathname === '/') {
    return null
  }

  return (
    <nav className="flex items-center space-x-1 text-sm">
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1
        const isFirst = index === 0

        return (
          <div key={index} className="flex items-center">
            {/* Separator */}
            {index > 0 && (
              <ChevronRight size={14} className="mx-1 text-gray-400" />
            )}

            {/* Item */}
            {item.path && !isLast ? (
              <Link
                to={item.path}
                className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
              >
                {isFirst && <Home size={14} className="mr-1" />}
                <span className="hover:underline">{item.label}</span>
              </Link>
            ) : (
              <span
                className={`
                  ${isLast ? 'text-gray-900 font-medium' : 'text-gray-500'}
                  max-w-[200px] truncate
                `}
                title={item.label}
              >
                {item.label}
              </span>
            )}
          </div>
        )
      })}
    </nav>
  )
}
