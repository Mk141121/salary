// Cấu hình thưởng KPI theo xếp loại
import { useState, useEffect } from 'react'
import { cauHinhThuongApi, CauHinhThuongKPI, XepLoaiKPI } from '../services/kpiApi'

const XEP_LOAI_LABELS: Record<XepLoaiKPI, { label: string; color: string }> = {
  XUAT_SAC: { label: 'Xuất sắc', color: 'bg-purple-100 text-purple-700' },
  TOT: { label: 'Tốt', color: 'bg-green-100 text-green-700' },
  KHA: { label: 'Khá', color: 'bg-blue-100 text-blue-700' },
  TRUNG_BINH: { label: 'Trung bình', color: 'bg-yellow-100 text-yellow-700' },
  YEU: { label: 'Yếu', color: 'bg-red-100 text-red-700' },
}

export default function CauHinhThuongKPIPage() {
  const [cauHinhs, setCauHinhs] = useState<CauHinhThuongKPI[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedNam, setSelectedNam] = useState(new Date().getFullYear())
  const [showForm, setShowForm] = useState(false)
  
  const [formData, setFormData] = useState({
    xepLoai: 'TOT' as XepLoaiKPI,
    diemToiThieu: 0,
    diemToiDa: 100,
    heSoThuong: 1,
    moTa: '',
  })
  
  useEffect(() => {
    loadData()
  }, [selectedNam])
  
  const loadData = async () => {
    setIsLoading(true)
    try {
      const data = await cauHinhThuongApi.layTheoNam(selectedNam)
      setCauHinhs(data)
    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleKhoiTaoMacDinh = async () => {
    if (!confirm(`Khởi tạo cấu hình thưởng mặc định cho năm ${selectedNam}?`)) return
    try {
      await cauHinhThuongApi.khoiTaoMacDinh(selectedNam)
      loadData()
    } catch (error) {
      console.error('Lỗi khởi tạo:', error)
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await cauHinhThuongApi.taoMoi({
        nam: selectedNam,
        ...formData,
        moTa: formData.moTa || undefined,
      })
      setShowForm(false)
      loadData()
    } catch (error) {
      console.error('Lỗi tạo cấu hình:', error)
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Cấu hình Thưởng KPI</h1>
          <p className="text-gray-500 mt-1">Thiết lập hệ số thưởng theo mức xếp loại</p>
        </div>
        <div className="flex gap-4">
          <select
            value={selectedNam}
            onChange={(e) => setSelectedNam(Number(e.target.value))}
            className="border rounded-lg px-3 py-2"
          >
            {[2024, 2025, 2026, 2027].map((nam) => (
              <option key={nam} value={nam}>Năm {nam}</option>
            ))}
          </select>
          <button
            onClick={handleKhoiTaoMacDinh}
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg"
          >
            Khởi tạo mặc định
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm Cấu hình
          </button>
        </div>
      </div>
      
      {/* Bảng cấu hình */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Xếp loại</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Điểm tối thiểu</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Điểm tối đa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hệ số thưởng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mô tả</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cauHinhs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  <p>Chưa có cấu hình thưởng cho năm {selectedNam}</p>
                  <button
                    onClick={handleKhoiTaoMacDinh}
                    className="mt-4 text-blue-600 hover:text-blue-700 underline"
                  >
                    Khởi tạo cấu hình mặc định
                  </button>
                </td>
              </tr>
            ) : (
              cauHinhs.map((ch) => (
                <tr key={ch.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-sm rounded-full font-medium ${XEP_LOAI_LABELS[ch.xepLoai].color}`}>
                      {XEP_LOAI_LABELS[ch.xepLoai].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900 font-mono">{Number(ch.diemToiThieu).toFixed(1)}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900 font-mono">{Number(ch.diemToiDa).toFixed(2)}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-lg font-semibold text-indigo-600">{Number(ch.heSoThuong)}x</span>
                    <span className="text-gray-500 text-sm ml-1">lương cơ bản</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600 text-sm">{ch.moTa || '-'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded ${ch.trangThai ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {ch.trangThai ? 'Hoạt động' : 'Ngừng'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Thông tin tính thưởng */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 mb-3">📊 Công thức tính thưởng KPI</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <p><strong>Tiền thưởng = Lương cơ bản × Hệ số thưởng</strong></p>
            <p className="mt-2">Ví dụ: Nhân viên lương 15,000,000đ, xếp loại "Tốt" (hệ số 1.5x)</p>
            <p>→ Thưởng = 15,000,000 × 1.5 = <strong>22,500,000đ</strong></p>
          </div>
          <div>
            <p><strong>Điểm KPI được tính từ:</strong></p>
            <ul className="list-disc ml-4 mt-2">
              <li>Tổng điểm = Σ (Điểm chỉ tiêu × Trọng số)</li>
              <li>Điểm chỉ tiêu = (Kết quả / Mục tiêu) × 100</li>
              <li>Tối đa 150% nếu vượt mức</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Modal thêm */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Thêm Cấu hình Thưởng</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Xếp loại *</label>
                <select
                  value={formData.xepLoai}
                  onChange={(e) => setFormData({ ...formData, xepLoai: e.target.value as XepLoaiKPI })}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                >
                  {Object.entries(XEP_LOAI_LABELS).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Điểm tối thiểu *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.diemToiThieu}
                    onChange={(e) => setFormData({ ...formData, diemToiThieu: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Điểm tối đa *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.diemToiDa}
                    onChange={(e) => setFormData({ ...formData, diemToiDa: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hệ số thưởng *</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.heSoThuong}
                  onChange={(e) => setFormData({ ...formData, heSoThuong: Number(e.target.value) })}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <input
                  type="text"
                  value={formData.moTa}
                  onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
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
