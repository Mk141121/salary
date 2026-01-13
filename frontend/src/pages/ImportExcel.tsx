// Import từ Excel
import { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { importExcelApi, phongBanApi, khoanLuongApi, KhoanLuong } from '../services/api'
import { formatTien } from '../utils'

interface CotExcel {
  soCot: number
  tenCot: string
  loaiMapping: 'thong_tin' | 'khoan_luong'
  truongHeThong?: string
  khoanLuongId?: number
}

interface KetQuaImport {
  thanhCong: boolean
  tongDong: number
  dongThanhCong: number
  dongLoi: number
  chiTietLoi: { dong: number; lyDo: string }[]
  tongTienImport: number
  bangLuongId: number
}

export default function ImportExcel() {
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // State
  const [step, setStep] = useState<'upload' | 'mapping' | 'result'>('upload')
  const [file, setFile] = useState<File | null>(null)
  const [headers, setHeaders] = useState<string[]>([])
  const [sampleData, setSampleData] = useState<string[][]>([])
  const [mappings, setMappings] = useState<CotExcel[]>([])
  const [thang, setThang] = useState(new Date().getMonth() + 1)
  const [nam, setNam] = useState(new Date().getFullYear())
  const [phongBanId, setPhongBanId] = useState<number>(0)
  const [ketQua, setKetQua] = useState<KetQuaImport | null>(null)

  const { data: phongBans } = useQuery({
    queryKey: ['phong-ban'],
    queryFn: phongBanApi.layTatCa,
  })

  const { data: khoanLuongs } = useQuery({
    queryKey: ['khoan-luong'],
    queryFn: () => khoanLuongApi.layTatCa(),
  })

  // Mutation đọc header
  const docHeaderMutation = useMutation({
    mutationFn: (file: File) => importExcelApi.docHeader(file),
    onSuccess: (data: { headers: string[]; duLieuMau: string[][] }) => {
      setHeaders(data.headers)
      setSampleData(data.duLieuMau)
      // Gợi ý mapping
      goiYMappingMutation.mutate(file!)
    },
    onError: () => {
      toast.error('Không thể đọc file Excel')
    },
  })

  // Mutation gợi ý mapping
  const goiYMappingMutation = useMutation({
    mutationFn: (file: File) => importExcelApi.goiYMapping(file),
    onSuccess: (data: CotExcel[]) => {
      setMappings(data)
      setStep('mapping')
    },
  })

  // Mutation import
  const importMutation = useMutation({
    mutationFn: () => importExcelApi.import(file!, thang, nam, phongBanId, mappings),
    onSuccess: (data: KetQuaImport) => {
      setKetQua(data)
      setStep('result')
      queryClient.invalidateQueries({ queryKey: ['bang-luong'] })
      if (data.thanhCong) {
        toast.success('Import thành công!')
      } else {
        toast.error(`Import có ${data.dongLoi} dòng lỗi`)
      }
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi khi import')
    },
  })

  // Handle file select
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!selectedFile.name.endsWith('.xlsx') && !selectedFile.name.endsWith('.xls')) {
      toast.error('Vui lòng chọn file Excel (.xlsx hoặc .xls)')
      return
    }

    setFile(selectedFile)
    docHeaderMutation.mutate(selectedFile)
  }

  // Update mapping
  const updateMapping = (index: number, field: keyof CotExcel, value: unknown) => {
    const newMappings = [...mappings]
    newMappings[index] = { ...newMappings[index], [field]: value }
    setMappings(newMappings)
  }

  // Handle import
  const handleImport = () => {
    if (!phongBanId) {
      toast.error('Vui lòng chọn phòng ban')
      return
    }

    // Kiểm tra có mapping mã NV không
    const hasMaNhanVien = mappings.some(
      (m) => m.loaiMapping === 'thong_tin' && m.truongHeThong === 'ma_nhan_vien'
    )
    if (!hasMaNhanVien) {
      toast.error('Cần mapping cột Mã nhân viên')
      return
    }

    importMutation.mutate()
  }

  // Reset
  const handleReset = () => {
    setStep('upload')
    setFile(null)
    setHeaders([])
    setSampleData([])
    setMappings([])
    setKetQua(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
        <Upload size={28} />
        Import từ Excel
      </h1>

      {/* Steps indicator */}
      <div className="flex items-center gap-4 mb-8">
        {['Upload file', 'Mapping cột', 'Kết quả'].map((s, i) => {
          const stepNames = ['upload', 'mapping', 'result']
          const isActive = step === stepNames[i]
          const isPast = stepNames.indexOf(step) > i

          return (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${isActive ? 'bg-primary-600 text-white' : ''}
                  ${isPast ? 'bg-green-500 text-white' : ''}
                  ${!isActive && !isPast ? 'bg-gray-200 text-gray-500' : ''}
                `}
              >
                {isPast ? '✓' : i + 1}
              </div>
              <span className={isActive ? 'font-semibold' : 'text-gray-500'}>{s}</span>
              {i < 2 && <ArrowRight size={16} className="text-gray-400 ml-2" />}
            </div>
          )
        })}
      </div>

      {/* Step 1: Upload */}
      {step === 'upload' && (
        <div className="card">
          <div className="text-center py-12">
            <FileSpreadsheet size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Chọn file Excel để import</h2>
            <p className="text-gray-500 mb-6">
              Hỗ trợ định dạng .xlsx và .xls
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={docHeaderMutation.isPending}
              className="btn btn-primary"
            >
              <Upload size={20} />
              {docHeaderMutation.isPending ? 'Đang đọc file...' : 'Chọn file Excel'}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Mapping */}
      {step === 'mapping' && (
        <div>
          {/* Thông tin import */}
          <div className="card mb-6">
            <h3 className="font-semibold mb-4">Thông tin import</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">File</label>
                <p className="font-medium">{file?.name}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Tháng</label>
                <select
                  value={thang}
                  onChange={(e) => setThang(Number(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>Tháng {m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Năm</label>
                <select
                  value={nam}
                  onChange={(e) => setNam(Number(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  {[2024, 2025, 2026, 2027].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phòng ban *</label>
                <select
                  value={phongBanId}
                  onChange={(e) => setPhongBanId(Number(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value={0}>-- Chọn --</option>
                  {phongBans?.map((pb: { id: number; tenPhongBan: string }) => (
                    <option key={pb.id} value={pb.id}>{pb.tenPhongBan}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mapping table */}
          <div className="card mb-6">
            <h3 className="font-semibold mb-4">Mapping cột Excel → Khoản lương</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-2 px-3">Cột</th>
                    <th className="text-left py-2 px-3">Tên cột Excel</th>
                    <th className="text-left py-2 px-3">Dữ liệu mẫu</th>
                    <th className="text-left py-2 px-3">Loại</th>
                    <th className="text-left py-2 px-3">Mapping</th>
                  </tr>
                </thead>
                <tbody>
                  {mappings.map((m, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-3">{m.soCot}</td>
                      <td className="py-2 px-3 font-medium">{m.tenCot}</td>
                      <td className="py-2 px-3 text-gray-500">
                        {sampleData[0]?.[index] || '-'}
                      </td>
                      <td className="py-2 px-3">
                        <select
                          value={m.loaiMapping}
                          onChange={(e) => updateMapping(index, 'loaiMapping', e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option value="thong_tin">Thông tin</option>
                          <option value="khoan_luong">Khoản lương</option>
                        </select>
                      </td>
                      <td className="py-2 px-3">
                        {m.loaiMapping === 'thong_tin' ? (
                          <select
                            value={m.truongHeThong || ''}
                            onChange={(e) => updateMapping(index, 'truongHeThong', e.target.value)}
                            className="border rounded px-2 py-1 text-sm w-full"
                          >
                            <option value="">-- Bỏ qua --</option>
                            <option value="ma_nhan_vien">Mã nhân viên</option>
                            <option value="ho_ten">Họ tên</option>
                            <option value="phong_ban">Phòng ban</option>
                            <option value="tong_luong_bo_qua">Tổng (bỏ qua)</option>
                          </select>
                        ) : (
                          <select
                            value={m.khoanLuongId || ''}
                            onChange={(e) =>
                              updateMapping(index, 'khoanLuongId', Number(e.target.value) || undefined)
                            }
                            className="border rounded px-2 py-1 text-sm w-full"
                          >
                            <option value="">-- Bỏ qua --</option>
                            {khoanLuongs?.map((kl: KhoanLuong) => (
                              <option key={kl.id} value={kl.id}>
                                {kl.tenKhoan}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <button onClick={handleReset} className="btn btn-secondary">
              Quay lại
            </button>
            <button
              onClick={handleImport}
              disabled={importMutation.isPending}
              className="btn btn-primary"
            >
              {importMutation.isPending ? 'Đang import...' : 'Bắt đầu Import'}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Result */}
      {step === 'result' && ketQua && (
        <div>
          <div className={`card mb-6 ${ketQua.thanhCong ? 'bg-green-50' : 'bg-yellow-50'}`}>
            <div className="flex items-center gap-4">
              {ketQua.thanhCong ? (
                <CheckCircle size={48} className="text-green-500" />
              ) : (
                <AlertCircle size={48} className="text-yellow-500" />
              )}
              <div>
                <h2 className="text-xl font-bold">
                  {ketQua.thanhCong ? 'Import thành công!' : 'Import hoàn tất (có lỗi)'}
                </h2>
                <p className="text-gray-600">
                  Đã import {ketQua.dongThanhCong}/{ketQua.tongDong} dòng
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="card text-center">
              <p className="text-3xl font-bold text-green-600">{ketQua.dongThanhCong}</p>
              <p className="text-gray-500">Dòng thành công</p>
            </div>
            <div className="card text-center">
              <p className="text-3xl font-bold text-red-600">{ketQua.dongLoi}</p>
              <p className="text-gray-500">Dòng lỗi</p>
            </div>
            <div className="card text-center">
              <p className="text-3xl font-bold text-primary-600">{formatTien(ketQua.tongTienImport)}</p>
              <p className="text-gray-500">Tổng tiền import</p>
            </div>
          </div>

          {ketQua.chiTietLoi.length > 0 && (
            <div className="card mb-6">
              <h3 className="font-semibold text-red-600 mb-3">Chi tiết lỗi</h3>
              <div className="max-h-48 overflow-y-auto">
                {ketQua.chiTietLoi.map((loi, i) => (
                  <div key={i} className="flex items-center gap-2 py-2 border-b">
                    <XCircle size={16} className="text-red-500" />
                    <span className="font-medium">Dòng {loi.dong}:</span>
                    <span className="text-gray-600">{loi.lyDo}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button onClick={handleReset} className="btn btn-secondary">
              Import file khác
            </button>
            <a href={`/bang-luong/${ketQua.bangLuongId}`} className="btn btn-primary">
              Xem bảng lương
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
