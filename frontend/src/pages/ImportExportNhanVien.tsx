// Import/Export nhân viên
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  ArrowLeft, 
  Check, 
  AlertCircle,
  Loader2,
  ChevronRight,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { phongBanApi } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

interface CotMapping {
  soCot: number
  tenCotExcel: string
  truongHeThong: string
}

interface KetQuaImport {
  thanhCong: boolean
  tongDong: number
  dongThanhCong: number
  dongThem: number
  dongCapNhat: number
  dongLoi: number
  chiTietLoi: { dong: number; maNhanVien?: string; lyDo: string }[]
  danhSachThemMoi: string[]
  danhSachCapNhat: string[]
}

interface TruongHeThong {
  ma: string
  ten: string
  batBuoc: boolean
}

export default function ImportExportNhanVien() {
  const { token } = useAuth()
  const [activeTab, setActiveTab] = useState<'import' | 'export'>('import')
  const [step, setStep] = useState(1) // 1: Upload, 2: Mapping, 3: Kết quả
  const [file, setFile] = useState<File | null>(null)
  const [duLieuMau, setDuLieuMau] = useState<string[][]>([])
  const [mappings, setMappings] = useState<CotMapping[]>([])
  const [ketQua, setKetQua] = useState<KetQuaImport | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Export filters
  const [exportPhongBanId, setExportPhongBanId] = useState<string>('')
  const [exportTrangThai, setExportTrangThai] = useState<string>('')
  const [isExporting, setIsExporting] = useState(false)

  // Lấy danh sách trường hệ thống
  const { data: truongHeThong } = useQuery<TruongHeThong[]>({
    queryKey: ['nhan-vien-truong-he-thong'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/nhan-vien/import-export/danh-sach-truong`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Lỗi lấy danh sách trường')
      return res.json()
    },
    enabled: !!token,
  })

  // Lấy danh sách phòng ban
  const { data: phongBans } = useQuery({
    queryKey: ['phong-ban'],
    queryFn: phongBanApi.layTatCa,
  })

  // Upload file và đọc header
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!selectedFile.name.match(/\.(xlsx|xls)$/i)) {
      toast.error('Vui lòng chọn file Excel (.xlsx, .xls)')
      return
    }

    setFile(selectedFile)
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      
      // Đọc header
      const resHeader = await fetch(`${API_URL}/api/nhan-vien/import-export/doc-header`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (!resHeader.ok) {
        const err = await resHeader.json()
        throw new Error(err.message || 'Lỗi đọc file')
      }

      const headerData = await resHeader.json()
      setDuLieuMau(headerData.duLieuMau)

      // Gợi ý mapping
      const formData2 = new FormData()
      formData2.append('file', selectedFile)
      const resMapping = await fetch(`${API_URL}/api/nhan-vien/import-export/goi-y-mapping`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData2,
      })

      if (resMapping.ok) {
        const mappingData = await resMapping.json()
        setMappings(mappingData)
      } else {
        // Fallback nếu gợi ý không được
        setMappings(headerData.headers.map((h: string, i: number) => ({
          soCot: i + 1,
          tenCotExcel: h,
          truongHeThong: '',
        })))
      }

      setStep(2)
      toast.success('Đọc file thành công!')
    } catch (err: any) {
      toast.error(err.message || 'Lỗi đọc file Excel')
    } finally {
      setIsUploading(false)
    }
  }

  // Cập nhật mapping
  const updateMapping = (soCot: number, truongHeThong: string) => {
    setMappings(prev => prev.map(m => 
      m.soCot === soCot ? { ...m, truongHeThong } : m
    ))
  }

  // Import dữ liệu
  const handleImport = async () => {
    if (!file) return

    // Kiểm tra mapping bắt buộc
    const mappedFields = mappings.filter(m => m.truongHeThong).map(m => m.truongHeThong)
    if (!mappedFields.includes('maNhanVien')) {
      toast.error('Vui lòng mapping trường "Mã nhân viên" (bắt buộc)')
      return
    }
    if (!mappedFields.includes('hoTen')) {
      toast.error('Vui lòng mapping trường "Họ tên" (bắt buộc)')
      return
    }

    setIsImporting(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('mappings', JSON.stringify(mappings))

      const res = await fetch(`${API_URL}/api/nhan-vien/import-export/import`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Lỗi import')
      }

      const result = await res.json()
      setKetQua(result)
      setStep(3)

      if (result.dongLoi === 0) {
        toast.success(`Import thành công! Thêm mới: ${result.dongThem}, Cập nhật: ${result.dongCapNhat}`)
      } else {
        toast.error(`Import có lỗi: ${result.dongLoi} dòng`)
      }
    } catch (err: any) {
      toast.error(err.message || 'Lỗi import dữ liệu')
    } finally {
      setIsImporting(false)
    }
  }

  // Export dữ liệu
  const handleExport = async () => {
    setIsExporting(true)
    try {
      const params = new URLSearchParams()
      if (exportPhongBanId) params.append('phongBanId', exportPhongBanId)
      if (exportTrangThai) params.append('trangThai', exportTrangThai)

      const res = await fetch(`${API_URL}/api/nhan-vien/import-export/export?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error('Lỗi export')

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `danh-sach-nhan-vien-${new Date().toISOString().split('T')[0]}.xlsx`
      a.click()
      window.URL.revokeObjectURL(url)

      toast.success('Export thành công!')
    } catch (err: any) {
      toast.error(err.message || 'Lỗi export')
    } finally {
      setIsExporting(false)
    }
  }

  // Download template
  const handleDownloadTemplate = async () => {
    try {
      const res = await fetch(`${API_URL}/api/nhan-vien/import-export/template`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error('Lỗi tải template')

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'template-import-nhan-vien.xlsx'
      a.click()
      window.URL.revokeObjectURL(url)

      toast.success('Tải template thành công!')
    } catch (err: any) {
      toast.error(err.message || 'Lỗi tải template')
    }
  }

  // Reset form
  const handleReset = () => {
    setFile(null)
    setDuLieuMau([])
    setMappings([])
    setKetQua(null)
    setStep(1)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/nhan-vien" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileSpreadsheet size={28} />
            Import/Export Nhân viên
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => { setActiveTab('import'); handleReset(); }}
          className={`px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'import' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Upload size={18} className="inline mr-2" />
          Import
        </button>
        <button
          onClick={() => { setActiveTab('export'); handleReset(); }}
          className={`px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'export' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Download size={18} className="inline mr-2" />
          Export
        </button>
      </div>

      {/* IMPORT TAB */}
      {activeTab === 'import' && (
        <div>
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {['Upload file', 'Mapping cột', 'Kết quả'].map((s, i) => (
              <div key={i} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step > i + 1 ? 'bg-green-500 text-white' :
                  step === i + 1 ? 'bg-blue-500 text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {step > i + 1 ? <Check size={16} /> : i + 1}
                </div>
                <span className={`ml-2 text-sm ${step >= i + 1 ? 'text-gray-800' : 'text-gray-400'}`}>
                  {s}
                </span>
                {i < 2 && <ChevronRight size={20} className="mx-4 text-gray-300" />}
              </div>
            ))}
          </div>

          {/* Step 1: Upload */}
          {step === 1 && (
            <div className="card max-w-2xl mx-auto">
              <div className="text-center py-8">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-10 cursor-pointer hover:border-blue-400 transition-colors"
                >
                  {isUploading ? (
                    <Loader2 size={48} className="mx-auto mb-4 text-blue-500 animate-spin" />
                  ) : (
                    <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                  )}
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    {isUploading ? 'Đang xử lý...' : 'Chọn file Excel để import'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Hỗ trợ file .xlsx, .xls
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleDownloadTemplate}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <Download size={16} className="inline mr-1" />
                    Tải template mẫu
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Mapping */}
          {step === 2 && (
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Mapping cột Excel với hệ thống</h3>
                <div className="flex gap-2">
                  <button onClick={handleReset} className="btn btn-secondary">
                    Chọn file khác
                  </button>
                  <button 
                    onClick={handleImport}
                    disabled={isImporting}
                    className="btn btn-primary"
                  >
                    {isImporting && <Loader2 size={16} className="animate-spin mr-2" />}
                    Import dữ liệu
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                <AlertCircle size={14} className="inline mr-1" />
                Các trường có dấu (*) là bắt buộc: Mã nhân viên, Họ tên
              </p>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4 text-sm font-semibold">Cột Excel</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Dữ liệu mẫu</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Mapping với trường</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mappings.map((m) => (
                      <tr key={m.soCot} className="border-b">
                        <td className="py-3 px-4 font-medium">{m.tenCotExcel}</td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          {duLieuMau.slice(0, 2).map((row, i) => (
                            <div key={i} className="truncate max-w-[200px]">
                              {row[m.soCot - 1] || '-'}
                            </div>
                          ))}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={m.truongHeThong}
                            onChange={(e) => updateMapping(m.soCot, e.target.value)}
                            className={`border rounded px-3 py-1.5 w-full ${
                              m.truongHeThong ? 'border-green-300 bg-green-50' : ''
                            }`}
                          >
                            <option value="">-- Bỏ qua --</option>
                            {truongHeThong?.map((t) => (
                              <option key={t.ma} value={t.ma}>
                                {t.ten} {t.batBuoc ? '(*)' : ''}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Step 3: Kết quả */}
          {step === 3 && ketQua && (
            <div className="card max-w-3xl mx-auto">
              <div className="text-center mb-6">
                {ketQua.dongLoi === 0 ? (
                  <div className="text-green-600">
                    <Check size={64} className="mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">Import thành công!</h3>
                  </div>
                ) : (
                  <div className="text-yellow-600">
                    <AlertCircle size={64} className="mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">Import hoàn tất với lỗi</h3>
                  </div>
                )}
              </div>

              {/* Thống kê */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-800">{ketQua.tongDong}</p>
                  <p className="text-sm text-gray-500">Tổng dòng</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">{ketQua.dongThem}</p>
                  <p className="text-sm text-gray-500">Thêm mới</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{ketQua.dongCapNhat}</p>
                  <p className="text-sm text-gray-500">Cập nhật</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-red-600">{ketQua.dongLoi}</p>
                  <p className="text-sm text-gray-500">Lỗi</p>
                </div>
              </div>

              {/* Chi tiết lỗi */}
              {ketQua.chiTietLoi.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-red-600 mb-2">Chi tiết lỗi:</h4>
                  <div className="max-h-60 overflow-y-auto border rounded">
                    <table className="w-full text-sm">
                      <thead className="bg-red-50 sticky top-0">
                        <tr>
                          <th className="text-left py-2 px-3">Dòng</th>
                          <th className="text-left py-2 px-3">Mã NV</th>
                          <th className="text-left py-2 px-3">Lỗi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ketQua.chiTietLoi.map((loi, i) => (
                          <tr key={i} className="border-t">
                            <td className="py-2 px-3">{loi.dong}</td>
                            <td className="py-2 px-3">{loi.maNhanVien || '-'}</td>
                            <td className="py-2 px-3 text-red-600">{loi.lyDo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-4">
                <button onClick={handleReset} className="btn btn-secondary">
                  Import thêm
                </button>
                <Link to="/nhan-vien" className="btn btn-primary">
                  Về danh sách nhân viên
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* EXPORT TAB */}
      {activeTab === 'export' && (
        <div className="card max-w-2xl mx-auto">
          <h3 className="font-semibold text-lg mb-4">Export danh sách nhân viên</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Phòng ban</label>
              <select
                value={exportPhongBanId}
                onChange={(e) => setExportPhongBanId(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Tất cả phòng ban</option>
                {phongBans?.map((pb: { id: number; tenPhongBan: string }) => (
                  <option key={pb.id} value={pb.id}>{pb.tenPhongBan}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Trạng thái</label>
              <select
                value={exportTrangThai}
                onChange={(e) => setExportTrangThai(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Tất cả</option>
                <option value="DANG_LAM">Đang làm</option>
                <option value="TAM_NGHI">Tạm nghỉ</option>
                <option value="NGHI_VIEC">Nghỉ việc</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="btn btn-primary"
            >
              {isExporting ? (
                <Loader2 size={20} className="animate-spin mr-2" />
              ) : (
                <Download size={20} className="mr-2" />
              )}
              Export Excel
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-700 mb-2">Thông tin export:</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• File Excel sẽ chứa tất cả thông tin nhân viên</li>
              <li>• Bao gồm: Mã NV, Họ tên, SĐT, Email, CCCD, Địa chỉ...</li>
              <li>• Thông tin ngân hàng, lương, phụ cấp</li>
              <li>• Có thể chỉnh sửa và import lại để cập nhật</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
