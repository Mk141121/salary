// Trang Audit Log - Lịch sử thao tác
import { useState, useEffect } from 'react'
import { auditLogApi, AuditLog } from '../services/rbacApi'

const HANH_DONG_LABELS: Record<string, { label: string; color: string; icon: string }> = {
  TAO: { label: 'Tạo mới', color: 'bg-green-100 text-green-700', icon: '➕' },
  SUA: { label: 'Cập nhật', color: 'bg-blue-100 text-blue-700', icon: '✏️' },
  XOA: { label: 'Xóa', color: 'bg-red-100 text-red-700', icon: '🗑️' },
  XEM: { label: 'Xem', color: 'bg-gray-100 text-gray-700', icon: '👁️' },
  DANG_NHAP: { label: 'Đăng nhập', color: 'bg-indigo-100 text-indigo-700', icon: '🔐' },
  DANG_XUAT: { label: 'Đăng xuất', color: 'bg-purple-100 text-purple-700', icon: '🚪' },
  CHOT: { label: 'Chốt', color: 'bg-yellow-100 text-yellow-700', icon: '🔒' },
  MO_KHOA: { label: 'Mở khóa', color: 'bg-cyan-100 text-cyan-700', icon: '🔓' },
  DUYET: { label: 'Duyệt', color: 'bg-emerald-100 text-emerald-700', icon: '✅' },
  TU_CHOI: { label: 'Từ chối', color: 'bg-orange-100 text-orange-700', icon: '❌' },
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
  
  // Filters
  const [filterHanhDong, setFilterHanhDong] = useState('')
  const [filterBangDuLieu, setFilterBangDuLieu] = useState('')
  const [filterTuNgay, setFilterTuNgay] = useState('')
  const [filterDenNgay, setFilterDenNgay] = useState('')
  
  useEffect(() => {
    loadData()
  }, [filterHanhDong, filterBangDuLieu, filterTuNgay, filterDenNgay])
  
  const loadData = async () => {
    setIsLoading(true)
    try {
      const response = await auditLogApi.layDanhSach({
        hanhDong: filterHanhDong || undefined,
        bangDuLieu: filterBangDuLieu || undefined,
        tuNgay: filterTuNgay || undefined,
        denNgay: filterDenNgay || undefined,
      }) as unknown as AuditLog[] | { items: AuditLog[] }
      // Handle response format: array or { items: [] }
      const data = Array.isArray(response) ? response : (response as { items: AuditLog[] })?.items || []
      setLogs(data)
    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('vi-VN')
  }
  
  const formatJSON = (obj?: object) => {
    if (!obj) return null
    return JSON.stringify(obj, null, 2)
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
        <p className="text-gray-500 mt-1">Lịch sử thao tác trên hệ thống</p>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hành động</label>
            <select
              value={filterHanhDong}
              onChange={(e) => setFilterHanhDong(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Tất cả</option>
              {Object.entries(HANH_DONG_LABELS).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bảng dữ liệu</label>
            <select
              value={filterBangDuLieu}
              onChange={(e) => setFilterBangDuLieu(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Tất cả</option>
              <option value="NhanVien">Nhân viên</option>
              <option value="BangLuong">Bảng lương</option>
              <option value="KhoanLuong">Khoản lương</option>
              <option value="PhongBan">Phòng ban</option>
              <option value="NguoiDung">Người dùng</option>
              <option value="DanhGiaKPI">Đánh giá KPI</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Từ ngày</label>
            <input
              type="date"
              value={filterTuNgay}
              onChange={(e) => setFilterTuNgay(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Đến ngày</label>
            <input
              type="date"
              value={filterDenNgay}
              onChange={(e) => setFilterDenNgay(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>
      
      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            Không có dữ liệu audit log
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thời gian</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Người dùng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bảng dữ liệu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID bản ghi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => {
                const hanhDong = HANH_DONG_LABELS[log.hanhDong] || { label: log.hanhDong, color: 'bg-gray-100', icon: '📝' }
                return (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(log.ngayTao)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {log.nguoiDung ? (
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 text-xs font-medium">
                              {log.nguoiDung.hoTen.charAt(0)}
                            </span>
                          </div>
                          <span className="ml-2 text-sm text-gray-900">{log.nguoiDung.hoTen}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Hệ thống</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded ${hanhDong.color}`}>
                        {hanhDong.icon} {hanhDong.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {log.bangDuLieu || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                      {log.banGhiId || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {(log.duLieuCu || log.duLieuMoi) && (
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Xem chi tiết
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
      
      {/* Modal Chi tiết */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Chi tiết thay đổi</h3>
              <button onClick={() => setSelectedLog(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div><span className="text-gray-500">Thời gian:</span> {formatDate(selectedLog.ngayTao)}</div>
              <div><span className="text-gray-500">Người dùng:</span> {selectedLog.nguoiDung?.hoTen || 'Hệ thống'}</div>
              <div><span className="text-gray-500">Hành động:</span> {HANH_DONG_LABELS[selectedLog.hanhDong]?.label}</div>
              <div><span className="text-gray-500">Bảng:</span> {selectedLog.bangDuLieu} #{selectedLog.banGhiId}</div>
              {selectedLog.ipAddress && <div><span className="text-gray-500">IP:</span> {selectedLog.ipAddress}</div>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {selectedLog.duLieuCu && (
                <div>
                  <h4 className="font-medium text-red-600 mb-2">Dữ liệu cũ</h4>
                  <pre className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs overflow-x-auto">
                    {formatJSON(selectedLog.duLieuCu)}
                  </pre>
                </div>
              )}
              {selectedLog.duLieuMoi && (
                <div>
                  <h4 className="font-medium text-green-600 mb-2">Dữ liệu mới</h4>
                  <pre className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs overflow-x-auto">
                    {formatJSON(selectedLog.duLieuMoi)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
