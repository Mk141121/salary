// Chi tiết Bảng ứng lương - Grid nhập liệu
import { useState, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ArrowLeft,
  Save,
  RefreshCcw,
  Check,
  Lock,
  Unlock,
  FileDown,
  Users,
  Percent,
  DollarSign,
  AlertCircle,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { ungLuongApi, bangLuongApi, BangLuong } from '../services/api'
import { formatTien } from '../utils'

interface ChiTietUngLuong {
  id: number
  nhanVienId: number
  phongBanId: number
  tienCongLuyKe: number
  mucToiDaDuocUng: number
  soNgayCong: number
  soNgayNghi: number
  soNgayNghiKhongPhep: number
  laTamTinh?: boolean // True = tạm tính theo lịch (chưa có chấm công thực tế)
  duocPhepUng: boolean
  lyDoKhongDat: string | null
  soTienUngDeXuat: number
  soTienUngDuyet: number
  ghiChu: string | null
  nhanVien?: {
    id: number
    maNhanVien: string
    hoTen: string
  }
  phongBan?: {
    id: number
    tenPhongBan: string
  }
  nhomNhanVien?: {
    id: number
    tenNhom: string
  }
}

const getLyDoLabel = (lyDo: string | null) => {
  switch (lyDo) {
    case 'NGHI_QUA_NHIEU':
      return 'Nghỉ quá nhiều ngày'
    case 'NGHI_KHONG_PHEP':
      return 'Nghỉ không phép'
    case 'KHONG_HOAT_DONG':
      return 'Không hoạt động'
    default:
      return lyDo || ''
  }
}

export default function ChiTietBangUngLuong() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const bangUngLuongId = Number(id)

  const [editedRows, setEditedRows] = useState<Map<number, Partial<ChiTietUngLuong>>>(new Map())
  const [showSetTiLeModal, setShowSetTiLeModal] = useState(false)
  const [showSetSoTienModal, setShowSetSoTienModal] = useState(false)
  const [showGhiNhanModal, setShowGhiNhanModal] = useState(false)
  const [tiLe, setTiLe] = useState(70)
  const [soTienCoDinh, setSoTienCoDinh] = useState(0)
  const [bangLuongApDungId, setBangLuongApDungId] = useState<number | null>(null)

  const { data: bangUngLuong, isLoading, refetch } = useQuery({
    queryKey: ['bang-ung-luong', bangUngLuongId],
    queryFn: () => ungLuongApi.layTheoId(bangUngLuongId),
    enabled: !!bangUngLuongId,
  })

  const { data: bangLuongs } = useQuery({
    queryKey: ['bang-luong-list'],
    queryFn: () => bangLuongApi.layDanhSach({}),
  })

  const isEditable = bangUngLuong?.trangThai === 'NHAP'

  // Sinh danh sách
  const sinhDanhSachMutation = useMutation({
    mutationFn: (data: { phongBanId?: number; nhomNhanVienId?: number }) =>
      ungLuongApi.sinhDanhSach(bangUngLuongId, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['bang-ung-luong', bangUngLuongId] })
      toast.success(`Đã sinh ${result.soNhanVien} nhân viên (${result.soDuocUng} đủ điều kiện)`)
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  // Lưu bulk
  const saveBulkMutation = useMutation({
    mutationFn: (data: { chiTiets: Array<{ id: number; soTienUngDeXuat?: number; soTienUngDuyet?: number; ghiChu?: string }> }) =>
      ungLuongApi.capNhatBulk(bangUngLuongId, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['bang-ung-luong', bangUngLuongId] })
      setEditedRows(new Map())
      if (result.errors && result.errors.length > 0) {
        toast.error(`Cập nhật ${result.soCapNhat} dòng. Lỗi: ${result.errors.length}`)
      } else {
        toast.success(`Cập nhật ${result.soCapNhat} dòng thành công`)
      }
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  // Set theo tỉ lệ
  const setTiLeMutation = useMutation({
    mutationFn: (data: { tiLe: number; lamTron?: number }) =>
      ungLuongApi.setTheoTiLe(bangUngLuongId, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['bang-ung-luong', bangUngLuongId] })
      setShowSetTiLeModal(false)
      toast.success(result.message)
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  // Set số tiền cố định
  const setSoTienMutation = useMutation({
    mutationFn: (data: { soTien: number }) =>
      ungLuongApi.setSoTienCoDinh(bangUngLuongId, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['bang-ung-luong', bangUngLuongId] })
      setShowSetSoTienModal(false)
      toast.success(result.message)
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  // Chốt
  const chotMutation = useMutation({
    mutationFn: () => ungLuongApi.chot(bangUngLuongId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bang-ung-luong', bangUngLuongId] })
      toast.success('Chốt bảng ứng lương thành công!')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  // Khóa
  const khoaMutation = useMutation({
    mutationFn: () => ungLuongApi.khoa(bangUngLuongId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bang-ung-luong', bangUngLuongId] })
      toast.success('Khóa bảng ứng lương thành công!')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  // Mở khóa
  const moKhoaMutation = useMutation({
    mutationFn: (lyDo: string) => ungLuongApi.moKhoa(bangUngLuongId, { lyDo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bang-ung-luong', bangUngLuongId] })
      toast.success('Mở khóa bảng ứng lương thành công!')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  // Ghi nhận khấu trừ
  const ghiNhanMutation = useMutation({
    mutationFn: (data: { bangLuongApDungId: number }) =>
      ungLuongApi.ghiNhanKhauTru(bangUngLuongId, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['bang-ung-luong', bangUngLuongId] })
      setShowGhiNhanModal(false)
      toast.success(result.message)
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  // Handle cell edit
  const handleCellEdit = useCallback((rowId: number, field: string, value: number | string) => {
    setEditedRows((prev) => {
      const newMap = new Map(prev)
      const existing = newMap.get(rowId) || {}
      newMap.set(rowId, { ...existing, [field]: value })
      return newMap
    })
  }, [])

  // Get cell value (edited or original)
  const getCellValue = useCallback((row: ChiTietUngLuong, field: keyof ChiTietUngLuong) => {
    const edited = editedRows.get(row.id)
    if (edited && field in edited) {
      return edited[field as keyof typeof edited]
    }
    return row[field]
  }, [editedRows])

  // Validate cell
  const isCellValid = useCallback((row: ChiTietUngLuong, value: number) => {
    if (!row.duocPhepUng && value > 0) return false
    if (value > Number(row.mucToiDaDuocUng)) return false
    return true
  }, [])

  // Lưu thay đổi
  const handleSave = () => {
    if (editedRows.size === 0) {
      toast('Không có thay đổi để lưu', { icon: 'ℹ️' })
      return
    }

    const chiTiets = Array.from(editedRows.entries()).map(([id, data]) => ({
      id,
      soTienUngDeXuat: data.soTienUngDeXuat,
      soTienUngDuyet: data.soTienUngDuyet,
      ghiChu: data.ghiChu ?? undefined,
    }))

    saveBulkMutation.mutate({ chiTiets })
  }

  // Tính tổng
  const summary = useMemo(() => {
    if (!bangUngLuong?.chiTiets) return { tongNV: 0, tongDuocUng: 0, tongTien: 0 }
    
    const chiTiets = bangUngLuong.chiTiets as ChiTietUngLuong[]
    return {
      tongNV: chiTiets.length,
      tongDuocUng: chiTiets.filter(ct => ct.duocPhepUng).length,
      tongTien: chiTiets.reduce((sum, ct) => {
        const edited = editedRows.get(ct.id)
        const soTien = edited?.soTienUngDuyet ?? ct.soTienUngDuyet
        return sum + Number(soTien)
      }, 0),
    }
  }, [bangUngLuong?.chiTiets, editedRows])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!bangUngLuong) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Không tìm thấy bảng ứng lương</p>
      </div>
    )
  }

  const chiTiets = (bangUngLuong.chiTiets || []) as ChiTietUngLuong[]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/ung-luong')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {bangUngLuong.maBangUngLuong}
            </h1>
            <p className="text-gray-500">
              Kỳ {bangUngLuong.thangNam} | {new Date(bangUngLuong.tuNgay).toLocaleDateString('vi-VN')} -{' '}
              {new Date(bangUngLuong.denNgay).toLocaleDateString('vi-VN')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              bangUngLuong.trangThai === 'NHAP'
                ? 'bg-yellow-100 text-yellow-800'
                : bangUngLuong.trangThai === 'DA_CHOT'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {bangUngLuong.trangThai === 'NHAP'
              ? 'Nháp'
              : bangUngLuong.trangThai === 'DA_CHOT'
              ? 'Đã chốt'
              : 'Đã khóa'}
          </span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="card">
          <p className="text-sm text-gray-500">Tổng nhân viên</p>
          <p className="text-2xl font-bold text-gray-800">{summary.tongNV}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Đủ điều kiện ứng</p>
          <p className="text-2xl font-bold text-green-600">{summary.tongDuocUng}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Không đủ điều kiện</p>
          <p className="text-2xl font-bold text-red-600">{summary.tongNV - summary.tongDuocUng}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Tổng tiền ứng</p>
          <p className="text-2xl font-bold text-blue-600">{formatTien(summary.tongTien)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="card mb-6">
        <div className="flex flex-wrap gap-2">
          {isEditable && (
            <>
              <button
                onClick={() => sinhDanhSachMutation.mutate({})}
                disabled={sinhDanhSachMutation.isPending}
                className="btn btn-secondary"
              >
                <Users size={18} />
                Sinh danh sách NV
              </button>
              <button
                onClick={() => setShowSetTiLeModal(true)}
                className="btn btn-secondary"
              >
                <Percent size={18} />
                Set theo % mức tối đa
              </button>
              <button
                onClick={() => setShowSetSoTienModal(true)}
                className="btn btn-secondary"
              >
                <DollarSign size={18} />
                Set số tiền cố định
              </button>
              <button
                onClick={handleSave}
                disabled={editedRows.size === 0 || saveBulkMutation.isPending}
                className="btn btn-primary"
              >
                <Save size={18} />
                Lưu thay đổi ({editedRows.size})
              </button>
              <button
                onClick={() => {
                  if (confirm('Bạn có chắc muốn chốt bảng ứng lương này?')) {
                    chotMutation.mutate()
                  }
                }}
                disabled={chiTiets.length === 0}
                className="btn bg-green-600 text-white hover:bg-green-700"
              >
                <Check size={18} />
                Chốt
              </button>
            </>
          )}

          {bangUngLuong.trangThai === 'DA_CHOT' && (
            <>
              <button
                onClick={() => {
                  if (confirm('Bạn có chắc muốn khóa bảng ứng lương này?')) {
                    khoaMutation.mutate()
                  }
                }}
                className="btn bg-orange-600 text-white hover:bg-orange-700"
              >
                <Lock size={18} />
                Khóa
              </button>
              <button
                onClick={() => setShowGhiNhanModal(true)}
                disabled={bangUngLuong.daGhiNhanKhauTru}
                className="btn btn-primary"
              >
                <FileDown size={18} />
                {bangUngLuong.daGhiNhanKhauTru ? 'Đã ghi nhận khấu trừ' : 'Ghi nhận khấu trừ'}
              </button>
            </>
          )}

          {bangUngLuong.trangThai === 'DA_KHOA' && (
            <button
              onClick={() => {
                const lyDo = prompt('Nhập lý do mở khóa:')
                if (lyDo) {
                  moKhoaMutation.mutate(lyDo)
                }
              }}
              className="btn bg-gray-600 text-white hover:bg-gray-700"
            >
              <Unlock size={18} />
              Mở khóa
            </button>
          )}

          <button onClick={() => refetch()} className="btn btn-secondary ml-auto">
            <RefreshCcw size={18} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="card overflow-x-auto">
        {chiTiets.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium sticky left-0 bg-gray-50">Mã NV</th>
                <th className="text-left py-3 px-4 font-medium">Họ tên</th>
                <th className="text-left py-3 px-4 font-medium">Phòng ban</th>
                <th className="text-right py-3 px-4 font-medium">Ngày công</th>
                <th className="text-right py-3 px-4 font-medium">Nghỉ</th>
                <th className="text-right py-3 px-4 font-medium">Nghỉ KP</th>
                <th className="text-right py-3 px-4 font-medium">Tiền công lũy kế</th>
                <th className="text-right py-3 px-4 font-medium">Mức tối đa</th>
                <th className="text-center py-3 px-4 font-medium">Eligible</th>
                <th className="text-right py-3 px-4 font-medium bg-blue-50">Số tiền đề xuất</th>
                <th className="text-right py-3 px-4 font-medium bg-green-50">Số tiền duyệt</th>
                <th className="text-left py-3 px-4 font-medium">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {chiTiets.map((ct) => {
                const soTienDuyet = getCellValue(ct, 'soTienUngDuyet') as number
                const isValid = isCellValid(ct, Number(soTienDuyet))
                const isEdited = editedRows.has(ct.id)

                return (
                  <tr
                    key={ct.id}
                    className={`border-b hover:bg-gray-50 ${!ct.duocPhepUng ? 'bg-red-50' : ''} ${isEdited ? 'bg-yellow-50' : ''}`}
                  >
                    <td className="py-2 px-4 font-medium sticky left-0 bg-white">
                      {ct.nhanVien?.maNhanVien}
                    </td>
                    <td className="py-2 px-4">{ct.nhanVien?.hoTen}</td>
                    <td className="py-2 px-4">{ct.phongBan?.tenPhongBan}</td>
                    <td className="py-2 px-4 text-right">
                      {Number(ct.soNgayCong).toFixed(1)}
                      {ct.laTamTinh && (
                        <span className="ml-1 px-1.5 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded" title="Tạm tính theo lịch (chưa có chấm công thực tế)">
                          ~
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-right">{Number(ct.soNgayNghi).toFixed(1)}</td>
                    <td className="py-2 px-4 text-right">
                      {Number(ct.soNgayNghiKhongPhep) > 0 && (
                        <span className="text-red-600 font-medium">
                          {Number(ct.soNgayNghiKhongPhep).toFixed(1)}
                        </span>
                      )}
                      {Number(ct.soNgayNghiKhongPhep) === 0 && '0'}
                    </td>
                    <td className="py-2 px-4 text-right">{formatTien(ct.tienCongLuyKe)}</td>
                    <td className="py-2 px-4 text-right font-medium text-blue-600">
                      {formatTien(ct.mucToiDaDuocUng)}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {ct.duocPhepUng ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full">
                          <Check size={14} />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600" title={getLyDoLabel(ct.lyDoKhongDat)}>
                          <AlertCircle size={14} />
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4 bg-blue-50">
                      <input
                        type="number"
                        min="0"
                        max={ct.mucToiDaDuocUng}
                        value={getCellValue(ct, 'soTienUngDeXuat') as number}
                        onChange={(e) => handleCellEdit(ct.id, 'soTienUngDeXuat', Number(e.target.value))}
                        disabled={!isEditable || !ct.duocPhepUng}
                        className={`w-full px-2 py-1 border rounded text-right ${
                          !isEditable || !ct.duocPhepUng
                            ? 'bg-gray-100 cursor-not-allowed'
                            : 'bg-white'
                        }`}
                      />
                    </td>
                    <td className="py-2 px-4 bg-green-50">
                      <input
                        type="number"
                        min="0"
                        max={ct.mucToiDaDuocUng}
                        value={soTienDuyet}
                        onChange={(e) => handleCellEdit(ct.id, 'soTienUngDuyet', Number(e.target.value))}
                        disabled={!isEditable || !ct.duocPhepUng}
                        className={`w-full px-2 py-1 border rounded text-right ${
                          !isEditable || !ct.duocPhepUng
                            ? 'bg-gray-100 cursor-not-allowed'
                            : !isValid
                            ? 'border-red-500 bg-red-50'
                            : 'bg-white'
                        }`}
                      />
                      {!isValid && (
                        <p className="text-xs text-red-500 mt-1">Vượt mức tối đa</p>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="text"
                        value={(getCellValue(ct, 'ghiChu') as string) || ''}
                        onChange={(e) => handleCellEdit(ct.id, 'ghiChu', e.target.value)}
                        disabled={!isEditable}
                        className={`w-full px-2 py-1 border rounded ${
                          !isEditable ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                        }`}
                        placeholder="Ghi chú..."
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">Chưa có nhân viên nào trong bảng ứng lương</p>
            {isEditable && (
              <button
                onClick={() => sinhDanhSachMutation.mutate({})}
                disabled={sinhDanhSachMutation.isPending}
                className="btn btn-primary"
              >
                <Users size={18} />
                Sinh danh sách nhân viên
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal Set theo tỉ lệ */}
      {showSetTiLeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Set theo % mức tối đa</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tỉ lệ (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={tiLe}
                onChange={(e) => setTiLe(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Áp dụng cho tất cả nhân viên đủ điều kiện ứng lương
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSetTiLeModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={() => setTiLeMutation.mutate({ tiLe, lamTron: 10000 })}
                disabled={setTiLeMutation.isPending}
                className="btn btn-primary"
              >
                {setTiLeMutation.isPending ? 'Đang xử lý...' : 'Áp dụng'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Set số tiền cố định */}
      {showSetSoTienModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Set số tiền cố định</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số tiền (VNĐ)
              </label>
              <input
                type="number"
                min="0"
                step="100000"
                value={soTienCoDinh}
                onChange={(e) => setSoTienCoDinh(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Chỉ áp dụng cho nhân viên có mức tối đa &gt;= số tiền này
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSetSoTienModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={() => setSoTienMutation.mutate({ soTien: soTienCoDinh })}
                disabled={setSoTienMutation.isPending}
                className="btn btn-primary"
              >
                {setSoTienMutation.isPending ? 'Đang xử lý...' : 'Áp dụng'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ghi nhận khấu trừ */}
      {showGhiNhanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Ghi nhận khấu trừ vào bảng lương</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chọn bảng lương áp dụng
              </label>
              <select
                value={bangLuongApDungId || ''}
                onChange={(e) => setBangLuongApDungId(e.target.value ? Number(e.target.value) : null)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">-- Chọn bảng lương --</option>
                {(Array.isArray(bangLuongs) ? bangLuongs : (bangLuongs as { data: BangLuong[] })?.data || []).map((bl) => (
                  <option key={bl.id} value={bl.id}>
                    Tháng {bl.thang}/{bl.nam} - {bl.phongBan?.tenPhongBan || 'Tất cả'}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Hệ thống sẽ tạo phiếu điều chỉnh tự động để khấu trừ số tiền ứng từ bảng lương được chọn.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowGhiNhanModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (!bangLuongApDungId) {
                    toast.error('Vui lòng chọn bảng lương')
                    return
                  }
                  ghiNhanMutation.mutate({ bangLuongApDungId })
                }}
                disabled={ghiNhanMutation.isPending || !bangLuongApDungId}
                className="btn btn-primary"
              >
                {ghiNhanMutation.isPending ? 'Đang xử lý...' : 'Ghi nhận'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
