// Auth Context - Quản lý đăng nhập/phân quyền
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { authApi, DangNhapResponse } from '../services/rbacApi'

interface AuthUser {
  id: number
  tenDangNhap: string
  hoTen: string
  email: string
}

interface AuthContextType {
  user: AuthUser | null
  token: string | null
  vaiTros: string[]
  quyens: string[]
  isAuthenticated: boolean
  isLoading: boolean
  dangNhap: (tenDangNhap: string, matKhau: string) => Promise<void>
  dangXuat: () => Promise<void>
  coQuyen: (maQuyen: string) => boolean
  coVaiTro: (maVaiTro: string) => boolean
  refreshToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_STORAGE_KEY = 'tinh_luong_auth'
const TOKEN_CHECK_INTERVAL = 60000 // Kiểm tra token mỗi 1 phút

interface StoredAuth {
  token: string
  user: AuthUser
  vaiTros: string[]
  quyens: string[]
  hetHan: string
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [vaiTros, setVaiTros] = useState<string[]>([])
  const [quyens, setQuyens] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Hàm xóa session
  const clearSession = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setToken(null)
    setUser(null)
    setVaiTros([])
    setQuyens([])
  }, [])

  // Kiểm tra token còn hiệu lực
  const checkTokenExpiry = useCallback(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      try {
        const data: StoredAuth = JSON.parse(stored)
        const hetHan = new Date(data.hetHan)
        const now = new Date()
        
        // Token hết hạn
        if (hetHan <= now) {
          clearSession()
          window.location.href = '/dang-nhap?expired=1'
          return false
        }
        
        // Cảnh báo nếu còn dưới 10 phút
        const conLai = hetHan.getTime() - now.getTime()
        if (conLai < 10 * 60 * 1000 && conLai > 0) {
          console.warn('Token sắp hết hạn trong', Math.floor(conLai / 60000), 'phút')
        }
        
        return true
      } catch {
        clearSession()
        return false
      }
    }
    return false
  }, [clearSession])

  // Khôi phục session từ localStorage
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      try {
        const data: StoredAuth = JSON.parse(stored)
        // Kiểm tra hết hạn
        if (new Date(data.hetHan) > new Date()) {
          setToken(data.token)
          setUser(data.user)
          setVaiTros(data.vaiTros)
          setQuyens(data.quyens)
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY)
        }
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  // Kiểm tra token định kỳ
  useEffect(() => {
    if (token) {
      const interval = setInterval(checkTokenExpiry, TOKEN_CHECK_INTERVAL)
      return () => clearInterval(interval)
    }
  }, [token, checkTokenExpiry])

  const dangNhap = async (tenDangNhap: string, matKhau: string) => {
    const response: DangNhapResponse = await authApi.dangNhap(tenDangNhap, matKhau)
    
    const authData: StoredAuth = {
      token: response.token,
      user: response.nguoiDung,
      vaiTros: response.vaiTros,
      quyens: response.quyens,
      hetHan: response.hetHan,
    }
    
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData))
    setToken(response.token)
    setUser(response.nguoiDung)
    setVaiTros(response.vaiTros)
    setQuyens(response.quyens)
  }

  const dangXuat = async () => {
    if (token) {
      try {
        await authApi.dangXuat(token)
      } catch {
        // Ignore logout errors
      }
    }
    
    clearSession()
  }

  // Refresh token nếu cần (tự động đăng nhập lại với token mới)
  const refreshToken = async () => {
    if (!token) return
    
    try {
      const response = await authApi.kiemTraToken(token)
      if (!response.hieu_luc) {
        clearSession()
        window.location.href = '/dang-nhap?expired=1'
      }
    } catch {
      clearSession()
    }
  }

  const coQuyen = (maQuyen: string): boolean => {
    return quyens.includes(maQuyen) || vaiTros.includes('ADMIN')
  }

  const coVaiTro = (maVaiTro: string): boolean => {
    return vaiTros.includes(maVaiTro)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        vaiTros,
        quyens,
        isAuthenticated: !!user,
        isLoading,
        dangNhap,
        dangXuat,
        coQuyen,
        coVaiTro,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// HOC để bảo vệ route
export function RequireAuth({ children, quyen }: { children: ReactNode; quyen?: string }) {
  const { isAuthenticated, isLoading, coQuyen } = useAuth()
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  
  if (!isAuthenticated) {
    window.location.href = '/dang-nhap'
    return null
  }
  
  if (quyen && !coQuyen(quyen)) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium text-red-800">Không có quyền truy cập</h3>
        <p className="text-red-600 mt-2">Bạn không có quyền truy cập trang này.</p>
      </div>
    )
  }
  
  return <>{children}</>
}

export default AuthContext
