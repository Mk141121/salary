// Trang Quản lý Chấm công
import { useState, useEffect, useRef } from 'react'
import { Clock, Calendar, AlertTriangle, Users, Settings, RefreshCw, Save, Upload, FileText, CheckCircle, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { chamCongApi, cauHinhPhatApi, dongBoApi, ChamCong, CauHinhPhatChamCong, TinhPhatResult, DongBoCSVResult } from '../services/chamCongApi'
import api from '../services/api'

interface PhongBan {
  id: number
  maPhongBan: string
  tenPhongBan: string
}

export default function QuanLyChamCong() {
  const [activeTab, setActiveTab] = useState<'cham-cong' | 'dong-bo' | 'cau-hinh'>('cham-cong')
  const [thang, setThang] = useState(new Date().getMonth() + 1)
  const [nam, setNam] = useState(new Date().getFullYear())
  const [phongBanId, setPhongBanId] = useState<number | undefined>()
  const [phongBans, setPhongBans] = useState<PhongBan[]>([])
  const [chamCongs, setChamCongs] = useState<ChamCong[]>([])
  const [cauHinh, setCauHinh] = useState<CauHinhPhatChamCong | null>(null)
  const [phatDetails, setPhatDetails] = useState<Record<number, TinhPhatResult>>({})
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Partial<ChamCong>>({})
  
  // Đồng bộ CSV
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [dongBoResult, setDongBoResult] = useState<DongBoCSVResult | null>(null)
  const [dongBoLoading, setDongBoLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load phòng ban
  useEffect(() => {
    api.get<PhongBan[]>('/phong-ban').then(res => setPhongBans(res.data))
  }, [])

  // Load chấm công
  useEffect(() => {
    loadChamCong()
  }, [thang, nam, phongBanId])

  // Load cấu hình phạt
  useEffect(() => {
    if (activeTab === 'cau-hinh') {
      loadCauHinh()
    }
  }, [activeTab, nam])

  const loadChamCong = async () => {
    setLoading(true)
    try {
      const res = await chamCongApi.layDanhSach(thang, nam, phongBanId)
      setChamCongs(res.data)
      
      // Tính phạt cho từng nhân viên
      const phatMap: Record<number, TinhPhatResult> = {}
      for (const cc of res.data) {
        if (cc.soLanDiMuon > 0 || cc.soLanVeSom > 0 || Number(cc.soNgayNghiKhongLuong) > 0) {
          try {
            const phatRes = await cauHinhPhatApi.tinhPhat(cc.nhanVienId, thang, nam)
            phatMap[cc.nhanVienId] = phatRes.data
          } catch (e) {
            // Ignore
          }
        }
      }
      setPhatDetails(phatMap)
    } catch (err) {
      toast.error('Lỗi tải dữ liệu chấm công')
    }
    setLoading(false)
  }

  const loadCauHinh = async () => {
    try {
      const res = await cauHinhPhatApi.lay(nam)
      setCauHinh(res.data)
    } catch (err) {
      toast.error('Lỗi tải cấu hình phạt')
    }
  }

  const handleKhoiTao = async () => {
    if (!confirm(`Khởi tạo chấm công tháng ${thang}/${nam} cho tất cả nhân viên?`)) return
    
    try {
      const res = await chamCongApi.khoiTao(thang, nam, 26)
      toast.success(`${res.data.message} - Đã tạo: ${res.data.created}, Bỏ qua: ${res.data.skipped}`)
      loadChamCong()
    } catch (err) {
      toast.error('Lỗi khởi tạo chấm công')
    }
  }

  const handleEdit = (cc: ChamCong) => {
    setEditingId(cc.id)
    setEditData({
      nhanVienId: cc.nhanVienId,
      thang: cc.thang,
      nam: cc.nam,
      soCongChuan: Number(cc.soCongChuan),
      soCongThucTe: Number(cc.soCongThucTe),
      soNgayNghiPhep: Number(cc.soNgayNghiPhep),
      soNgayNghiKhongLuong: Number(cc.soNgayNghiKhongLuong),
      soGioOT: Number(cc.soGioOT),
      soLanDiMuon: cc.soLanDiMuon,
      soLanVeSom: cc.soLanVeSom,
    })
  }

  const handleSave = async () => {
    if (!editData.nhanVienId) return
    
    try {
      await chamCongApi.luu(editData)
      toast.success('Đã lưu chấm công')
      setEditingId(null)
      setEditData({})
      loadChamCong()
    } catch (err) {
      toast.error('Lỗi lưu chấm công')
    }
  }

  const handleSaveCauHinh = async () => {
    if (!cauHinh) return
    
    try {
      await cauHinhPhatApi.capNhat(nam, cauHinh)
      toast.success('Đã lưu cấu hình phạt')
    } catch (err) {
      toast.error('Lỗi lưu cấu hình')
    }
  }

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ'
  }

  // Xử lý file CSV
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCsvFile(file)
      setDongBoResult(null)
    }
  }

  const handleDongBo = async () => {
    if (!csvFile) {
      toast.error('Vui lòng chọn file CSV')
      return
    }

    setDongBoLoading(true)
    try {
      const csvContent = await csvFile.text()
      const res = await dongBoApi.dongBoCSV(csvContent)
      setDongBoResult(res.data)
      toast.success(`Đã đồng bộ ${res.data.luuThanhCong} nhân viên thành công`)
      // Reload chấm công
      loadChamCong()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Lỗi đồng bộ file')
    }
    setDongBoLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Clock className="text-primary-600" />
            Quản lý Chấm công
          </h1>
          <p className="text-gray-500 mt-1">Theo dõi chấm công, đi muộn, nghỉ không phép</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab('cham-cong')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'cham-cong'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users size={18} className="inline mr-2" />
            Chấm công tháng
          </button>
          <button
            onClick={() => setActiveTab('dong-bo')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'dong-bo'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Upload size={18} className="inline mr-2" />
            Đồng bộ máy chấm công
          </button>
          <button
            onClick={() => setActiveTab('cau-hinh')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'cau-hinh'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Settings size={18} className="inline mr-2" />
            Cấu hình phạt
          </button>
        </nav>
      </div>

      {/* Tab: Chấm công tháng */}
      {activeTab === 'cham-cong' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tháng</label>
              <select
                value={thang}
                onChange={e => setThang(Number(e.target.value))}
                className="border rounded-lg px-3 py-2"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Năm</label>
              <select
                value={nam}
                onChange={e => setNam(Number(e.target.value))}
                className="border rounded-lg px-3 py-2"
              >
                {[2024, 2025, 2026, 2027].map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phòng ban</label>
              <select
                value={phongBanId || ''}
                onChange={e => setPhongBanId(e.target.value ? Number(e.target.value) : undefined)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="">Tất cả</option>
                {phongBans.map(pb => (
                  <option key={pb.id} value={pb.id}>{pb.tenPhongBan}</option>
                ))}
              </select>
            </div>
            <button
              onClick={loadChamCong}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              <RefreshCw size={18} />
              Làm mới
            </button>
            <button
              onClick={handleKhoiTao}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg"
            >
              <Calendar size={18} />
              Khởi tạo tháng
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nhân viên</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phòng ban</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Công chuẩn</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Công thực</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Nghỉ phép</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Nghỉ KL</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Đi muộn</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Về sớm</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">OT (giờ)</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Tiền phạt</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={11} className="px-4 py-8 text-center text-gray-500">
                        Đang tải...
                      </td>
                    </tr>
                  ) : chamCongs.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="px-4 py-8 text-center text-gray-500">
                        Chưa có dữ liệu chấm công. Nhấn "Khởi tạo tháng" để bắt đầu.
                      </td>
                    </tr>
                  ) : chamCongs.map(cc => {
                    const isEditing = editingId === cc.id
                    const phat = phatDetails[cc.nhanVienId]
                    const hasViolation = cc.soLanDiMuon > 0 || cc.soLanVeSom > 0 || Number(cc.soNgayNghiKhongLuong) > 0

                    return (
                      <tr key={cc.id} className={hasViolation ? 'bg-red-50' : ''}>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{cc.nhanVien?.hoTen}</div>
                          <div className="text-sm text-gray-500">{cc.nhanVien?.maNhanVien}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{cc.nhanVien?.phongBan?.tenPhongBan}</td>
                        <td className="px-4 py-3 text-center">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editData.soCongChuan || 0}
                              onChange={e => setEditData({ ...editData, soCongChuan: Number(e.target.value) })}
                              className="w-16 border rounded px-2 py-1 text-center"
                            />
                          ) : (
                            Number(cc.soCongChuan)
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editData.soCongThucTe || 0}
                              onChange={e => setEditData({ ...editData, soCongThucTe: Number(e.target.value) })}
                              className="w-16 border rounded px-2 py-1 text-center"
                            />
                          ) : (
                            Number(cc.soCongThucTe)
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editData.soNgayNghiPhep || 0}
                              onChange={e => setEditData({ ...editData, soNgayNghiPhep: Number(e.target.value) })}
                              className="w-16 border rounded px-2 py-1 text-center"
                            />
                          ) : (
                            Number(cc.soNgayNghiPhep)
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editData.soNgayNghiKhongLuong || 0}
                              onChange={e => setEditData({ ...editData, soNgayNghiKhongLuong: Number(e.target.value) })}
                              className="w-16 border rounded px-2 py-1 text-center"
                            />
                          ) : (
                            <span className={Number(cc.soNgayNghiKhongLuong) > 0 ? 'text-red-600 font-semibold' : ''}>
                              {Number(cc.soNgayNghiKhongLuong)}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editData.soLanDiMuon || 0}
                              onChange={e => setEditData({ ...editData, soLanDiMuon: Number(e.target.value) })}
                              className="w-16 border rounded px-2 py-1 text-center"
                            />
                          ) : (
                            <span className={cc.soLanDiMuon > 0 ? 'text-orange-600 font-semibold' : ''}>
                              {cc.soLanDiMuon}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editData.soLanVeSom || 0}
                              onChange={e => setEditData({ ...editData, soLanVeSom: Number(e.target.value) })}
                              className="w-16 border rounded px-2 py-1 text-center"
                            />
                          ) : (
                            <span className={cc.soLanVeSom > 0 ? 'text-orange-600 font-semibold' : ''}>
                              {cc.soLanVeSom}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center text-blue-600">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editData.soGioOT || 0}
                              onChange={e => setEditData({ ...editData, soGioOT: Number(e.target.value) })}
                              className="w-16 border rounded px-2 py-1 text-center"
                            />
                          ) : (
                            Number(cc.soGioOT)
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {phat && phat.tongPhat > 0 && (
                            <div className="text-red-600 font-semibold" title={
                              `Phạt đi muộn: ${formatMoney(phat.tienPhatDiMuon)}\n` +
                              `Phạt về sớm: ${formatMoney(phat.tienPhatVeSom)}\n` +
                              `Phạt nghỉ KP: ${formatMoney(phat.tienPhatNghiKhongPhep)}\n` +
                              `Trừ lương: ${formatMoney(phat.truLuongNgayCong)}`
                            }>
                              {formatMoney(phat.tongPhat)}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {isEditing ? (
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={handleSave}
                                className="p-1 text-green-600 hover:bg-green-50 rounded"
                              >
                                <Save size={18} />
                              </button>
                              <button
                                onClick={() => { setEditingId(null); setEditData({}) }}
                                className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEdit(cc)}
                              className="p-1 text-primary-600 hover:bg-primary-50 rounded"
                            >
                              Sửa
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          {chamCongs.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Tổng nhân viên</div>
                <div className="text-2xl font-bold text-gray-800">{chamCongs.length}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Đi muộn</div>
                <div className="text-2xl font-bold text-orange-600">
                  {chamCongs.filter(cc => cc.soLanDiMuon > 0).length} NV
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Nghỉ không phép</div>
                <div className="text-2xl font-bold text-red-600">
                  {chamCongs.filter(cc => Number(cc.soNgayNghiKhongLuong) > 0).length} NV
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Tổng tiền phạt</div>
                <div className="text-2xl font-bold text-red-600">
                  {formatMoney(Object.values(phatDetails).reduce((sum, p) => sum + p.tongPhat, 0))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Đồng bộ máy chấm công */}
      {activeTab === 'dong-bo' && (
        <div className="space-y-6">
          {/* Upload area */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Upload className="text-primary-600" size={20} />
              Upload file CSV từ máy chấm công
            </h3>
            
            <div className="space-y-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-400 transition-colors"
              >
                <FileText className="mx-auto text-gray-400 mb-3" size={48} />
                {csvFile ? (
                  <div>
                    <p className="font-medium text-gray-800">{csvFile.name}</p>
                    <p className="text-sm text-gray-500">{(csvFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium text-gray-600">Nhấp để chọn file CSV</p>
                    <p className="text-sm text-gray-400">Hỗ trợ file từ máy chấm công (Access Controller)</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleDongBo}
                  disabled={!csvFile || dongBoLoading}
                  className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {dongBoLoading ? (
                    <RefreshCw size={18} className="animate-spin" />
                  ) : (
                    <Upload size={18} />
                  )}
                  {dongBoLoading ? 'Đang xử lý...' : 'Đồng bộ dữ liệu'}
                </button>
                {csvFile && (
                  <button
                    onClick={() => { setCsvFile(null); setDongBoResult(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Xóa file
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Kết quả đồng bộ */}
          {dongBoResult && (
            <div className="space-y-4">
              {/* Summary */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500">Tổng bản ghi</div>
                  <div className="text-2xl font-bold text-gray-800">{dongBoResult.tongBanGhi}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500">Số ngày công</div>
                  <div className="text-2xl font-bold text-blue-600">{dongBoResult.tongNgay}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500">Lưu thành công</div>
                  <div className="text-2xl font-bold text-green-600 flex items-center gap-2">
                    <CheckCircle size={24} /> {dongBoResult.luuThanhCong}
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500">Lỗi</div>
                  <div className="text-2xl font-bold text-red-600 flex items-center gap-2">
                    <XCircle size={24} /> {dongBoResult.luuThatBai}
                  </div>
                </div>
              </div>

              {/* Thống kê theo NV */}
              {dongBoResult.thongKe.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b">
                    <h4 className="font-semibold">Thống kê theo nhân viên</h4>
                  </div>
                  <div className="overflow-x-auto max-h-64">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Mã NV</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Tháng/Năm</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Số công</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Đi muộn</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Về sớm</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {dongBoResult.thongKe.map((tk, i) => (
                          <tr key={i} className={tk.soLanDiMuon > 0 || tk.soLanVeSom > 0 ? 'bg-orange-50' : ''}>
                            <td className="px-4 py-2 font-medium">{tk.maNhanVien}</td>
                            <td className="px-4 py-2 text-center">{tk.thang}/{tk.nam}</td>
                            <td className="px-4 py-2 text-center text-blue-600 font-semibold">{tk.soCongThucTe}</td>
                            <td className="px-4 py-2 text-center">
                              <span className={tk.soLanDiMuon > 0 ? 'text-orange-600 font-semibold' : ''}>
                                {tk.soLanDiMuon}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-center">
                              <span className={tk.soLanVeSom > 0 ? 'text-orange-600 font-semibold' : ''}>
                                {tk.soLanVeSom}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Chi tiết từng ngày */}
              {dongBoResult.chiTiet.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b">
                    <h4 className="font-semibold">Chi tiết chấm công ({dongBoResult.chiTiet.length} ngày)</h4>
                  </div>
                  <div className="overflow-x-auto max-h-96">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Mã NV</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ngày</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Giờ vào</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Giờ ra</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {dongBoResult.chiTiet.slice(0, 100).map((ct, i) => (
                          <tr key={i} className={ct.diMuon || ct.veSom ? 'bg-orange-50' : ''}>
                            <td className="px-4 py-2 font-medium">{ct.maNhanVien}</td>
                            <td className="px-4 py-2">{ct.ngay}</td>
                            <td className="px-4 py-2 text-center">
                              <span className={ct.diMuon ? 'text-orange-600 font-semibold' : ''}>
                                {ct.gioVao || '-'}
                              </span>
                              {ct.diMuon && <span className="text-xs text-orange-500 ml-1">(+{ct.phutMuon}p)</span>}
                            </td>
                            <td className="px-4 py-2 text-center">
                              <span className={ct.veSom ? 'text-orange-600 font-semibold' : ''}>
                                {ct.gioRa || '-'}
                              </span>
                              {ct.veSom && <span className="text-xs text-orange-500 ml-1">(-{ct.phutSom}p)</span>}
                            </td>
                            <td className="px-4 py-2 text-center">
                              {ct.diMuon && <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded mr-1">Muộn</span>}
                              {ct.veSom && <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">Sớm</span>}
                              {!ct.diMuon && !ct.veSom && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">OK</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {dongBoResult.chiTiet.length > 100 && (
                      <div className="px-4 py-2 bg-gray-50 text-center text-sm text-gray-500">
                        Hiển thị 100/{dongBoResult.chiTiet.length} bản ghi
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Lỗi */}
              {dongBoResult.loi.length > 0 && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">⚠️ Lỗi ({dongBoResult.loi.length})</h4>
                  <ul className="text-sm text-red-700 space-y-1 list-disc ml-5">
                    {dongBoResult.loi.map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Hướng dẫn */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">📌 Hướng dẫn:</h4>
            <ul className="text-sm text-blue-700 space-y-1 list-disc ml-5">
              <li>Upload file CSV xuất từ máy chấm công (Access Controller)</li>
              <li>Format: Tên riêng, Họ, <strong>ID (mã NV)</strong>, Bộ phận, <strong>Ngày</strong>, <strong>Thời gian</strong>, ...</li>
              <li>Hệ thống tự động nhận diện giờ vào (quẹt đầu buổi sáng) và giờ ra (quẹt cuối buổi chiều)</li>
              <li>So sánh với giờ chuẩn (cấu hình trong tab Cấu hình phạt) để xác định đi muộn/về sớm</li>
              <li>Dữ liệu sẽ được tổng hợp theo tháng và lưu vào hệ thống</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab: Cấu hình phạt */}
      {activeTab === 'cau-hinh' && cauHinh && (
        <div className="space-y-6">
          <div className="flex gap-4 items-center">
            <label className="font-medium">Năm áp dụng:</label>
            <select
              value={nam}
              onChange={e => setNam(Number(e.target.value))}
              className="border rounded-lg px-3 py-2"
            >
              {[2024, 2025, 2026, 2027].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Phạt đi muộn */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-orange-500" size={20} />
                Phạt đi muộn (theo tháng)
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Đi muộn 1-3 lần</label>
                  <input
                    type="number"
                    value={Number(cauHinh.phatDiMuon1_3Lan)}
                    onChange={e => setCauHinh({ ...cauHinh, phatDiMuon1_3Lan: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Đi muộn 4-6 lần</label>
                  <input
                    type="number"
                    value={Number(cauHinh.phatDiMuon4_6Lan)}
                    onChange={e => setCauHinh({ ...cauHinh, phatDiMuon4_6Lan: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Đi muộn trên 6 lần</label>
                  <input
                    type="number"
                    value={Number(cauHinh.phatDiMuonTren6Lan)}
                    onChange={e => setCauHinh({ ...cauHinh, phatDiMuonTren6Lan: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Phạt về sớm */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-orange-500" size={20} />
                Phạt về sớm (theo tháng)
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Về sớm 1-3 lần</label>
                  <input
                    type="number"
                    value={Number(cauHinh.phatVeSom1_3Lan)}
                    onChange={e => setCauHinh({ ...cauHinh, phatVeSom1_3Lan: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Về sớm 4-6 lần</label>
                  <input
                    type="number"
                    value={Number(cauHinh.phatVeSom4_6Lan)}
                    onChange={e => setCauHinh({ ...cauHinh, phatVeSom4_6Lan: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Về sớm trên 6 lần</label>
                  <input
                    type="number"
                    value={Number(cauHinh.phatVeSomTren6Lan)}
                    onChange={e => setCauHinh({ ...cauHinh, phatVeSomTren6Lan: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Phạt nghỉ không phép */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-red-500" size={20} />
                Nghỉ không phép
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Tiền phạt mỗi ngày (VNĐ)</label>
                  <input
                    type="number"
                    value={Number(cauHinh.phatNghiKhongPhep)}
                    onChange={e => setCauHinh({ ...cauHinh, phatNghiKhongPhep: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="truLuong"
                    checked={cauHinh.truLuongNghiKhongPhep}
                    onChange={e => setCauHinh({ ...cauHinh, truLuongNghiKhongPhep: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="truLuong" className="text-sm text-gray-700">
                    Trừ thêm lương theo ngày công (Lương / Công chuẩn × Số ngày nghỉ)
                  </label>
                </div>
              </div>
            </div>

            {/* Giờ làm việc */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="text-blue-500" size={20} />
                Giờ làm việc chuẩn
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Giờ vào</label>
                    <input
                      type="time"
                      value={cauHinh.gioVaoChuan}
                      onChange={e => setCauHinh({ ...cauHinh, gioVaoChuan: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Giờ ra</label>
                    <input
                      type="time"
                      value={cauHinh.gioRaChuan}
                      onChange={e => setCauHinh({ ...cauHinh, gioRaChuan: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Số phút được phép trễ</label>
                  <input
                    type="number"
                    value={cauHinh.phutChoPhepTre}
                    onChange={e => setCauHinh({ ...cauHinh, phutChoPhepTre: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Nhân viên đến trễ trong khoảng thời gian này không bị tính đi muộn
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveCauHinh}
              className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg"
            >
              <Save size={18} />
              Lưu cấu hình
            </button>
          </div>

          {/* Bảng tham khảo */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">📌 Cách tính tiền phạt:</h4>
            <ul className="text-sm text-blue-700 space-y-1 list-disc ml-5">
              <li>Phạt đi muộn: Tính theo số lần đi muộn trong tháng (1-3, 4-6, hoặc &gt;6 lần)</li>
              <li>Phạt về sớm: Tính theo số lần về sớm trong tháng</li>
              <li>Phạt nghỉ không phép: Tiền phạt × Số ngày nghỉ</li>
              <li>Trừ lương: (Lương cơ bản ÷ Công chuẩn) × Số ngày nghỉ không phép</li>
              <li>Tổng phạt = Phạt đi muộn + Phạt về sớm + Phạt nghỉ KP + Trừ lương</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
