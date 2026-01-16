// Quản lý Kỳ đánh giá KPI
import { useState, useEffect } from 'react'
import { kyDanhGiaApi, KyDanhGiaKPI, LoaiKyDanhGia, TrangThaiKyDanhGia } from '../services/kpiApi'
import { VietnameseDatePicker } from '../components/VietnameseDatePicker'

const LOAI_KY_LABELS: Record<LoaiKyDanhGia, string> = {
  THANG: 'Tháng',
  QUY: 'Quý',
  NAM: 'Năm',
}

const TRANG_THAI_LABELS: Record<TrangThaiKyDanhGia, { label: string; color: string }> = {
  CHUA_BAT_DAU: { label: 'Chưa bắt đầu', color: 'bg-gray-100 text-gray-600' },
  DANG_DIEN_RA: { label: 'Đang diễn ra', color: 'bg-green-100 text-green-700' },
  DA_KET_THUC: { label: 'Đã kết thúc', color: 'bg-blue-100 text-blue-700' },
  DA_DONG: { label: 'Đã đóng', color: 'bg-red-100 text-red-700' },
}

export default function KyDanhGiaKPIPage() {
  const [kyDanhGias, setKyDanhGias] = useState<KyDanhGiaKPI[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [filterNam, setFilterNam] = useState(new Date().getFullYear())
  
  const [formData, setFormData] = useState({
    maKy: '',
    tenKy: '',
    loaiKy: 'THANG' as LoaiKyDanhGia,
    tuNgay: '',
    denNgay: '',
    moTa: '',
  })
  
  useEffect(() => {
    loadData()
  }, [filterNam])
  
  const loadData = async () => {
    setIsLoading(true)
    try {
      const data = await kyDanhGiaApi.layTatCa({ nam: filterNam })
      setKyDanhGias(data)
    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await kyDanhGiaApi.taoMoi({
        ...formData,
        moTa: formData.moTa || undefined,
      })
      setShowForm(false)
      setFormData({
        maKy: '',
        tenKy: '',
        loaiKy: 'THANG',
        tuNgay: '',
        denNgay: '',
        moTa: '',
      })
      loadData()
    } catch (error) {
      console.error('Lỗi tạo kỳ đánh giá:', error)
    }
  }
  
  const handleCapNhatTrangThai = async (id: number, trangThai: TrangThaiKyDanhGia) => {
    try {
      await kyDanhGiaApi.capNhatTrangThai(id, trangThai)
      loadData()
    } catch (error) {
      console.error('Lỗi cập nhật trạng thái:', error)
    }
  }
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN')
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kỳ Đánh Giá KPI</h1>
          <p className="text-gray-500 mt-1">Quản lý các kỳ đánh giá hiệu suất</p>
        </div>
        <div className="flex gap-4">
          <select
            value={filterNam}
            onChange={(e) => setFilterNam(Number(e.target.value))}
            className="border rounded-lg px-3 py-2"
          >
            {[2024, 2025, 2026, 2027].map((nam) => (
              <option key={nam} value={nam}>Năm {nam}</option>
            ))}
          </select>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm Kỳ Đánh Giá
          </button>
        </div>
      </div>
      
      {/* Danh sách */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã kỳ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên kỳ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thời gian</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số đánh giá</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {kyDanhGias.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  Chưa có kỳ đánh giá nào trong năm {filterNam}
                </td>
              </tr>
            ) : (
              kyDanhGias.map((ky) => (
                <tr key={ky.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm text-gray-900">{ky.maKy}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{ky.tenKy}</div>
                    {ky.moTa && (
                      <div className="text-xs text-gray-500">{ky.moTa}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                      {LOAI_KY_LABELS[ky.loaiKy]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(ky.tuNgay)} - {formatDate(ky.denNgay)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded ${TRANG_THAI_LABELS[ky.trangThai].color}`}>
                      {TRANG_THAI_LABELS[ky.trangThai].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {ky._count?.danhGias || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      {ky.trangThai === 'CHUA_BAT_DAU' && (
                        <button
                          onClick={() => handleCapNhatTrangThai(ky.id, 'DANG_DIEN_RA')}
                          className="text-green-600 hover:text-green-800"
                        >
                          Bắt đầu
                        </button>
                      )}
                      {ky.trangThai === 'DANG_DIEN_RA' && (
                        <button
                          onClick={() => handleCapNhatTrangThai(ky.id, 'DA_KET_THUC')}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Kết thúc
                        </button>
                      )}
                      {ky.trangThai === 'DA_KET_THUC' && (
                        <button
                          onClick={() => handleCapNhatTrangThai(ky.id, 'DA_DONG')}
                          className="text-red-600 hover:text-red-800"
                        >
                          Đóng
                        </button>
                      )}
                      <a
                        href={`/kpi/ky-danh-gia/${ky.id}`}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Chi tiết
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Modal thêm */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Thêm Kỳ Đánh Giá</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mã kỳ *</label>
                  <input
                    type="text"
                    value={formData.maKy}
                    onChange={(e) => setFormData({ ...formData, maKy: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="VD: KPI-2026-Q1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại kỳ *</label>
                  <select
                    value={formData.loaiKy}
                    onChange={(e) => setFormData({ ...formData, loaiKy: e.target.value as LoaiKyDanhGia })}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  >
                    <option value="THANG">Tháng</option>
                    <option value="QUY">Quý</option>
                    <option value="NAM">Năm</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên kỳ *</label>
                <input
                  type="text"
                  value={formData.tenKy}
                  onChange={(e) => setFormData({ ...formData, tenKy: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="VD: Đánh giá KPI Quý 1/2026"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Từ ngày *</label>
                  <VietnameseDatePicker
                    value={formData.tuNgay}
                    onChange={(val) => setFormData({ ...formData, tuNgay: val })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Đến ngày *</label>
                  <VietnameseDatePicker
                    value={formData.denNgay}
                    onChange={(val) => setFormData({ ...formData, denNgay: val })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  value={formData.moTa}
                  onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={2}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Tạo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
