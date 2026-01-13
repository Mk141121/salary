// Quản lý Người dùng & Vai trò
import { useState, useEffect } from 'react'
import { nguoiDungApi, vaiTroApi, NguoiDung, VaiTro } from '../services/rbacApi'

const TRANG_THAI_LABELS: Record<string, { label: string; color: string }> = {
  HOAT_DONG: { label: 'Hoạt động', color: 'bg-green-100 text-green-700' },
  TAM_KHOA: { label: 'Tạm khóa', color: 'bg-yellow-100 text-yellow-700' },
  NGUNG_HOAT_DONG: { label: 'Ngừng', color: 'bg-red-100 text-red-700' },
}

export default function QuanLyNguoiDung() {
  const [nguoiDungs, setNguoiDungs] = useState<NguoiDung[]>([])
  const [vaiTros, setVaiTros] = useState<VaiTro[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState<'nguoi-dung' | 'vai-tro'>('nguoi-dung')
  
  // Form người dùng
  const [formData, setFormData] = useState({
    tenDangNhap: '',
    matKhau: '',
    hoTen: '',
    email: '',
    soDienThoai: '',
    vaiTroIds: [] as number[],
  })
  
  // Form vai trò
  const [vaiTroForm, setVaiTroForm] = useState({
    maVaiTro: '',
    tenVaiTro: '',
    moTa: '',
    capDo: 50,
  })
  
  useEffect(() => {
    loadData()
  }, [])
  
  const loadData = async () => {
    try {
      const [nguoiDungsData, vaiTrosData] = await Promise.all([
        nguoiDungApi.layTatCa(),
        vaiTroApi.layTatCa(),
      ])
      setNguoiDungs(nguoiDungsData)
      setVaiTros(vaiTrosData)
    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleSubmitNguoiDung = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await nguoiDungApi.taoMoi({
        tenDangNhap: formData.tenDangNhap,
        matKhau: formData.matKhau,
        hoTen: formData.hoTen,
        email: formData.email,
        soDienThoai: formData.soDienThoai || undefined,
        vaiTroIds: formData.vaiTroIds,
      })
      setShowForm(false)
      setFormData({
        tenDangNhap: '',
        matKhau: '',
        hoTen: '',
        email: '',
        soDienThoai: '',
        vaiTroIds: [],
      })
      loadData()
    } catch (error) {
      console.error('Lỗi tạo người dùng:', error)
    }
  }
  
  const handleSubmitVaiTro = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await vaiTroApi.taoMoi({
        maVaiTro: vaiTroForm.maVaiTro,
        tenVaiTro: vaiTroForm.tenVaiTro,
        moTa: vaiTroForm.moTa || undefined,
        capDo: vaiTroForm.capDo,
      })
      setShowForm(false)
      setVaiTroForm({ maVaiTro: '', tenVaiTro: '', moTa: '', capDo: 50 })
      loadData()
    } catch (error) {
      console.error('Lỗi tạo vai trò:', error)
    }
  }
  
  const handleCapNhatTrangThai = async (id: number, trangThai: string) => {
    try {
      await nguoiDungApi.capNhat(id, { trangThai })
      loadData()
    } catch (error) {
      console.error('Lỗi cập nhật:', error)
    }
  }
  
  const handleVaiTroChange = (vaiTroId: number) => {
    setFormData((prev) => ({
      ...prev,
      vaiTroIds: prev.vaiTroIds.includes(vaiTroId)
        ? prev.vaiTroIds.filter((id) => id !== vaiTroId)
        : [...prev.vaiTroIds, vaiTroId],
    }))
  }
  
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleString('vi-VN')
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
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Người dùng & Vai trò</h1>
          <p className="text-gray-500 mt-1">Phân quyền truy cập hệ thống</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {activeTab === 'nguoi-dung' ? 'Thêm Người dùng' : 'Thêm Vai trò'}
        </button>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          <button
            onClick={() => setActiveTab('nguoi-dung')}
            className={`py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'nguoi-dung'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Người dùng ({nguoiDungs.length})
          </button>
          <button
            onClick={() => setActiveTab('vai-tro')}
            className={`py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'vai-tro'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Vai trò ({vaiTros.length})
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'nguoi-dung' ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Người dùng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vai trò</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đăng nhập cuối</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {nguoiDungs.map((nd) => (
                <tr key={nd.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {nd.hoTen.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">{nd.hoTen}</div>
                        <div className="text-sm text-gray-500">@{nd.tenDangNhap}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{nd.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {nd.vaiTros?.map((nvt) => (
                        <span key={nvt.id} className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded">
                          {nvt.vaiTro.tenVaiTro}
                        </span>
                      )) || <span className="text-gray-400 text-sm">Chưa gán</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(nd.lanDangNhapCuoi)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded ${TRANG_THAI_LABELS[nd.trangThai]?.color || 'bg-gray-100'}`}>
                      {TRANG_THAI_LABELS[nd.trangThai]?.label || nd.trangThai}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      {nd.trangThai === 'HOAT_DONG' && (
                        <button
                          onClick={() => handleCapNhatTrangThai(nd.id, 'TAM_KHOA')}
                          className="text-yellow-600 hover:text-yellow-800"
                        >
                          Khóa
                        </button>
                      )}
                      {nd.trangThai === 'TAM_KHOA' && (
                        <button
                          onClick={() => handleCapNhatTrangThai(nd.id, 'HOAT_DONG')}
                          className="text-green-600 hover:text-green-800"
                        >
                          Mở khóa
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vaiTros.map((vt) => (
            <div key={vt.id} className="bg-white rounded-lg shadow p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{vt.tenVaiTro}</h3>
                  <p className="text-sm text-gray-500 font-mono">{vt.maVaiTro}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${vt.trangThai ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {vt.trangThai ? 'Hoạt động' : 'Ngừng'}
                </span>
              </div>
              {vt.moTa && <p className="text-sm text-gray-600 mb-3">{vt.moTa}</p>}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Cấp độ: {vt.capDo}</span>
                <span className="text-indigo-600">{vt._count?.nguoiDungs || 0} người dùng</span>
              </div>
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-gray-500 mb-2">Quyền ({vt.quyens?.length || 0}):</p>
                <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                  {vt.quyens?.slice(0, 8).map((vtq) => (
                    <span key={vtq.id} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      {vtq.quyen.tenQuyen}
                    </span>
                  ))}
                  {(vt.quyens?.length || 0) > 8 && (
                    <span className="px-1.5 py-0.5 bg-gray-200 text-gray-700 text-xs rounded">
                      +{(vt.quyens?.length || 0) - 8} quyền
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {activeTab === 'nguoi-dung' ? 'Thêm Người dùng' : 'Thêm Vai trò'}
            </h3>
            
            {activeTab === 'nguoi-dung' ? (
              <form onSubmit={handleSubmitNguoiDung} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập *</label>
                    <input
                      type="text"
                      value={formData.tenDangNhap}
                      onChange={(e) => setFormData({ ...formData, tenDangNhap: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu *</label>
                    <input
                      type="password"
                      value={formData.matKhau}
                      onChange={(e) => setFormData({ ...formData, matKhau: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên *</label>
                  <input
                    type="text"
                    value={formData.hoTen}
                    onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {vaiTros.map((vt) => (
                      <label key={vt.id} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={formData.vaiTroIds.includes(vt.id)}
                          onChange={() => handleVaiTroChange(vt.id)}
                          className="rounded"
                        />
                        <span className="text-sm">{vt.tenVaiTro}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg">Hủy</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Tạo</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmitVaiTro} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mã vai trò *</label>
                  <input
                    type="text"
                    value={vaiTroForm.maVaiTro}
                    onChange={(e) => setVaiTroForm({ ...vaiTroForm, maVaiTro: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="VD: SUPERVISOR"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên vai trò *</label>
                  <input
                    type="text"
                    value={vaiTroForm.tenVaiTro}
                    onChange={(e) => setVaiTroForm({ ...vaiTroForm, tenVaiTro: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cấp độ</label>
                  <input
                    type="number"
                    value={vaiTroForm.capDo}
                    onChange={(e) => setVaiTroForm({ ...vaiTroForm, capDo: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                    min={1}
                    max={100}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                  <textarea
                    value={vaiTroForm.moTa}
                    onChange={(e) => setVaiTroForm({ ...vaiTroForm, moTa: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    rows={2}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg">Hủy</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Tạo</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
