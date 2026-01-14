// PrivateRoute - Component bảo vệ route yêu cầu đăng nhập
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface PrivateRouteProps {
  children: React.ReactNode
  quyen?: string    // Quyền cần thiết (ví dụ: 'BANGLUONG_XEM')
  vaiTro?: string   // Vai trò cần thiết (ví dụ: 'ADMIN')
}

export function PrivateRoute({ children, quyen, vaiTro }: PrivateRouteProps) {
  const { isAuthenticated, isLoading, coQuyen, coVaiTro } = useAuth()
  const location = useLocation()

  // Đang load - hiển thị spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang kiểm tra phiên đăng nhập...</p>
        </div>
      </div>
    )
  }

  // Chưa đăng nhập - redirect về login
  if (!isAuthenticated) {
    // Lưu lại URL hiện tại để sau khi login redirect về
    return <Navigate to="/dang-nhap" state={{ from: location }} replace />
  }

  // Kiểm tra vai trò
  if (vaiTro && !coVaiTro(vaiTro)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Không có quyền truy cập</h2>
          <p className="text-gray-600 mb-4">
            Bạn cần vai trò <strong>{vaiTro}</strong> để truy cập trang này.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Quay lại
          </button>
        </div>
      </div>
    )
  }

  // Kiểm tra quyền
  if (quyen && !coQuyen(quyen)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
          <div className="text-yellow-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Yêu cầu quyền</h2>
          <p className="text-gray-600 mb-4">
            Bạn cần quyền <strong>{quyen}</strong> để thực hiện chức năng này.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Quay lại
          </button>
        </div>
      </div>
    )
  }

  // Có quyền - render children
  return <>{children}</>
}

export default PrivateRoute
