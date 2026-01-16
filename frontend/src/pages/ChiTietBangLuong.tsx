// Chi tiết bảng lương - Giao diện giống Excel
import { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ArrowLeft,
  Save,
  Lock,
  Unlock,
  Download,
  History,
  Check,
  X,
  FileText,
  Mail,
  Loader2,
  Edit3,
  RefreshCw,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { bangLuongApi, importExcelApi, phieuLuongApi, ngayCongApi, BangLuongChiTiet, NgayCongBangLuong } from '../services/api'
import { formatTien, parseTien, downloadFile } from '../utils'
import PhieuLuongModal from '../components/PhieuLuongModal'
import NgayCongModal from '../components/NgayCongModal'

export default function ChiTietBangLuong() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // State cho editing
  const [editingCell, setEditingCell] = useState<{
    nhanVienId: number
    khoanLuongId: number
    value: string
  } | null>(null)
  const [pendingChanges, setPendingChanges] = useState<
    Map<string, { nhanVienId: number; khoanLuongId: number; soTien: number }>
  >(new Map())
  const [showLichSu, setShowLichSu] = useState(false)
  const [showChotModal, setShowChotModal] = useState(false)
  const [nguoiChot, setNguoiChot] = useState('')
  const [selectedNhanVien, setSelectedNhanVien] = useState<{ id: number; hoTen: string } | null>(null)
  const [editingNgayCong, setEditingNgayCong] = useState<NgayCongBangLuong | null>(null)

  const { data: bangLuong, isLoading } = useQuery({
    queryKey: ['bang-luong', id],
    queryFn: () => bangLuongApi.layTheoId(Number(id)),
    enabled: !!id,
  })

  // Lấy dữ liệu ngày công
  const { data: danhSachNgayCong } = useQuery({
    queryKey: ['ngay-cong', id],
    queryFn: () => ngayCongApi.layTatCa(Number(id)),
    enabled: !!id,
  })

  const { data: lichSu } = useQuery({
    queryKey: ['bang-luong-lich-su', id],
    queryFn: () => bangLuongApi.layLichSu(Number(id)),
    enabled: !!id && showLichSu,
  })

  const capNhatMutation = useMutation({
    mutationFn: bangLuongApi.capNhatNhieuChiTiet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bang-luong', id] })
      setPendingChanges(new Map())
      toast.success('Lưu thay đổi thành công!')
    },
    onError: () => {
      toast.error('Có lỗi khi lưu')
    },
  })

  const chotMutation = useMutation({
    mutationFn: ({ nguoiChot }: { nguoiChot: string }) =>
      bangLuongApi.chotBangLuong(Number(id), { nguoiChot }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bang-luong', id] })
      toast.success('Chốt bảng lương thành công!')
      setShowChotModal(false)
    },
    onError: () => {
      toast.error('Có lỗi khi chốt')
    },
  })

  const moKhoaMutation = useMutation({
    mutationFn: () => bangLuongApi.moKhoa(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bang-luong', id] })
      toast.success('Mở khóa thành công!')
    },
  })

  // Gửi phiếu lương cho tất cả
  const guiTatCaMutation = useMutation({
    mutationFn: () => phieuLuongApi.guiTatCa(Number(id)),
    onSuccess: (result) => {
      if (result.success > 0) {
        toast.success(`Đã gửi ${result.success} phiếu lương thành công!`)
      }
      if (result.failed > 0) {
        toast.error(`${result.failed} phiếu lương gửi thất bại`)
      }
    },
    onError: () => {
      toast.error('Có lỗi khi gửi phiếu lương')
    },
  })

  // Cập nhật ngày công
  const capNhatNgayCongMutation = useMutation({
    mutationFn: ({ nhanVienId, ngayCongMoi, ghiChu }: { nhanVienId: number; ngayCongMoi: number; ghiChu?: string }) =>
      ngayCongApi.dieuChinh(Number(id), nhanVienId, { ngayCongMoi, ghiChu }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ngay-cong', id] })
      queryClient.invalidateQueries({ queryKey: ['bang-luong', id] })
      toast.success('Cập nhật ngày công thành công!')
      setEditingNgayCong(null)
    },
    onError: () => {
      toast.error('Có lỗi khi cập nhật ngày công')
    },
  })

  // Tính lại lương theo ngày công
  const tinhLaiLuongMutation = useMutation({
    mutationFn: () => bangLuongApi.tinhLaiLuong(Number(id)),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['bang-luong', id] })
      toast.success(result.message)
    },
    onError: () => {
      toast.error('Có lỗi khi tính lại lương')
    },
  })

  // Handler cho modal ngày công
  const handleOpenNgayCongModal = (nhanVienId: number) => {
    const ngayCong = danhSachNgayCong?.find((nc) => nc.nhanVienId === nhanVienId)
    if (ngayCong) {
      setEditingNgayCong(ngayCong)
    } else {
      // Tạo object tạm từ dữ liệu bảng lương để cho phép điều chỉnh
      const nhanVien = bangLuong?.danhSachNhanVien.find((nv) => nv.nhanVienId === nhanVienId)
      if (nhanVien && bangLuong) {
        const tempNgayCong: NgayCongBangLuong = {
          id: 0,
          bangLuongId: bangLuong.id,
          nhanVienId: nhanVienId,
          ngayCongLyThuyet: bangLuong.ngayCongLyThuyet,
          soCongThucTe: nhanVien.ngayCongThucTe,
          soNgayNghiPhep: 0,
          soNgayNghiKhongPhep: 0,
          ngayCongDieuChinh: null,
          ghiChu: null,
          nhanVien: {
            id: nhanVienId,
            maNhanVien: nhanVien.maNhanVien,
            hoTen: nhanVien.hoTen,
          },
        }
        setEditingNgayCong(tempNgayCong)
      } else {
        toast.error('Không tìm thấy thông tin nhân viên')
      }
    }
  }

  const handleSaveNgayCong = async (ngayCongMoi: number, ghiChu?: string) => {
    if (!editingNgayCong) return
    await capNhatNgayCongMutation.mutateAsync({
      nhanVienId: editingNgayCong.nhanVienId,
      ngayCongMoi,
      ghiChu,
    })
  }

  // Xử lý edit cell
  const handleCellClick = (nhanVienId: number, khoanLuongId: number, currentValue: number) => {
    if (bangLuong?.trangThai !== 'NHAP') return

    setEditingCell({
      nhanVienId,
      khoanLuongId,
      value: currentValue.toString(),
    })
  }

  const handleCellChange = (value: string) => {
    if (!editingCell) return
    setEditingCell({ ...editingCell, value })
  }

  const handleCellBlur = () => {
    if (!editingCell || !bangLuong) return

    const soTien = parseTien(editingCell.value)
    const key = `${editingCell.nhanVienId}-${editingCell.khoanLuongId}`

    // Tìm giá trị hiện tại
    const nhanVien = bangLuong.danhSachNhanVien.find(
      (nv) => nv.nhanVienId === editingCell.nhanVienId
    )
    const currentValue = nhanVien?.cacKhoanLuong.find(
      (kl) => kl.khoanLuongId === editingCell.khoanLuongId
    )?.soTien || 0

    // Chỉ thêm vào pending nếu có thay đổi
    if (soTien !== currentValue) {
      const newChanges = new Map(pendingChanges)
      newChanges.set(key, {
        nhanVienId: editingCell.nhanVienId,
        khoanLuongId: editingCell.khoanLuongId,
        soTien,
      })
      setPendingChanges(newChanges)
    }

    setEditingCell(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCellBlur()
    } else if (e.key === 'Escape') {
      setEditingCell(null)
    }
  }

  // Lưu tất cả thay đổi
  const handleSave = () => {
    if (pendingChanges.size === 0) {
      toast('Không có thay đổi để lưu')
      return
    }

    const danhSach = Array.from(pendingChanges.values()).map((change) => ({
      bangLuongId: Number(id),
      ...change,
    }))

    capNhatMutation.mutate(danhSach)
  }

  // Export Excel
  const handleExport = async () => {
    try {
      const response = await importExcelApi.export(Number(id))
      downloadFile(response.data, `bang-luong-${id}.xlsx`)
      toast.success('Xuất file thành công!')
    } catch {
      toast.error('Có lỗi khi xuất file')
    }
  }

  // Lấy giá trị cell (ưu tiên pending changes)
  const getCellValue = useCallback(
    (nhanVienId: number, khoanLuongId: number, originalValue: number) => {
      const key = `${nhanVienId}-${khoanLuongId}`
      const pending = pendingChanges.get(key)
      return pending ? pending.soTien : originalValue
    },
    [pendingChanges]
  )

  // Tính lại tổng với pending changes
  const calculateTotals = useCallback(
    (nhanVien: BangLuongChiTiet['danhSachNhanVien'][0]) => {
      let tongThuNhap = 0
      let tongKhauTru = 0

      for (const kl of nhanVien.cacKhoanLuong) {
        const value = getCellValue(nhanVien.nhanVienId, kl.khoanLuongId, kl.soTien)
        if (kl.loai === 'THU_NHAP') {
          tongThuNhap += value
        } else {
          tongKhauTru += value
        }
      }

      // Thêm pending changes cho khoản chưa có
      pendingChanges.forEach((change) => {
        if (change.nhanVienId === nhanVien.nhanVienId) {
          const existing = nhanVien.cacKhoanLuong.find(
            (kl) => kl.khoanLuongId === change.khoanLuongId
          )
          if (!existing) {
            // Tìm loại khoản lương
            const khoanLuong = bangLuong?.danhSachKhoanLuong.find(
              (kl) => kl.id === change.khoanLuongId
            )
            if (khoanLuong?.loai === 'THU_NHAP') {
              tongThuNhap += change.soTien
            } else {
              tongKhauTru += change.soTien
            }
          }
        }
      })

      return { tongThuNhap, tongKhauTru, thucLinh: tongThuNhap - tongKhauTru }
    },
    [getCellValue, pendingChanges, bangLuong?.danhSachKhoanLuong]
  )

  // BUG-002 P0: Warning khi có unsaved changes
  const hasUnsavedChanges = pendingChanges.size > 0

  // Block navigation khi có unsaved changes (useBlocker không hoạt động với BrowserRouter)
  // TODO: Migrate sang createBrowserRouter để sử dụng useBlocker

  // Xử lý beforeunload (đóng tab/refresh)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = 'Bạn có thay đổi chưa lưu. Bạn có chắc muốn rời đi?'
        return e.returnValue
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    )
  }

  if (!bangLuong) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Không tìm thấy bảng lương</p>
        <button onClick={() => navigate('/bang-luong')} className="btn btn-primary mt-4">
          Quay lại
        </button>
      </div>
    )
  }

  const isEditable = bangLuong.trangThai === 'NHAP'

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/bang-luong')}
            className="p-2 hover:bg-gray-200 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Bảng lương {bangLuong.phongBan.tenPhongBan}
            </h1>
            <p className="text-sm text-gray-500">
              Tháng {bangLuong.thang}/{bangLuong.nam}
            </p>
          </div>
          <span
            className={`badge ${
              bangLuong.trangThai === 'NHAP'
                ? 'badge-nhap'
                : bangLuong.trangThai === 'DA_CHOT'
                ? 'badge-da-chot'
                : 'badge-khoa'
            }`}
          >
            {bangLuong.trangThai === 'NHAP' && 'Đang nhập'}
            {bangLuong.trangThai === 'DA_CHOT' && 'Đã chốt'}
            {bangLuong.trangThai === 'KHOA' && 'Đã khóa'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {pendingChanges.size > 0 && (
            <span className="text-sm text-orange-600 mr-2">
              {pendingChanges.size} thay đổi chưa lưu
            </span>
          )}

          {isEditable && pendingChanges.size > 0 && (
            <button
              onClick={handleSave}
              disabled={capNhatMutation.isPending}
              className="btn btn-success"
            >
              <Save size={18} />
              Lưu ({pendingChanges.size})
            </button>
          )}

          <button onClick={handleExport} className="btn btn-secondary">
            <Download size={18} />
            Xuất Excel
          </button>

          <button
            onClick={() => setShowLichSu(!showLichSu)}
            className="btn btn-secondary"
          >
            <History size={18} />
            Lịch sử
          </button>

          <button
            onClick={() => guiTatCaMutation.mutate()}
            disabled={guiTatCaMutation.isPending}
            className="btn btn-secondary"
            title="Gửi phiếu lương cho tất cả nhân viên qua email"
          >
            {guiTatCaMutation.isPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Mail size={18} />
            )}
            Gửi tất cả
          </button>

          {isEditable && (
            <button
              onClick={() => tinhLaiLuongMutation.mutate()}
              disabled={tinhLaiLuongMutation.isPending}
              className="btn btn-secondary"
              title="Tính lại lương theo ngày công"
            >
              {tinhLaiLuongMutation.isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <RefreshCw size={18} />
              )}
              Tính lại lương
            </button>
          )}

          {isEditable && (
            <button onClick={() => setShowChotModal(true)} className="btn btn-primary">
              <Lock size={18} />
              Chốt
            </button>
          )}

          {bangLuong.trangThai === 'DA_CHOT' && (
            <button
              onClick={() => moKhoaMutation.mutate()}
              className="btn btn-secondary"
            >
              <Unlock size={18} />
              Mở khóa
            </button>
          )}
        </div>
      </div>

      {/* Bảng lương */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="excel-table w-full">
            <thead>
              <tr>
                <th className="sticky left-0 z-20 bg-gray-200">STT</th>
                <th className="sticky left-10 z-20 bg-gray-200 min-w-[80px]">Mã NV</th>
                <th className="sticky left-[120px] z-20 bg-gray-200 min-w-[180px]">Họ tên</th>
                <th className="min-w-[120px]">Chức vụ</th>
                <th className="min-w-[80px] text-center bg-orange-100">Ngày công</th>
                <th className="min-w-[100px] text-center bg-orange-100">NC Điều chỉnh</th>
                {bangLuong.danhSachKhoanLuong.map((kl) => (
                  <th key={kl.id} className="min-w-[120px] text-right">
                    {kl.tenKhoan}
                  </th>
                ))}
                <th className="min-w-[130px] text-right bg-blue-100">Tổng thu nhập</th>
                <th className="min-w-[100px] text-right bg-red-100">Khấu trừ</th>
                <th className="min-w-[130px] text-right bg-green-100">Thực lĩnh</th>
                <th className="min-w-[80px] text-center bg-purple-100">Phiếu lương</th>
              </tr>
            </thead>
            <tbody>
              {bangLuong.danhSachNhanVien.map((nv, index) => {
                const totals = calculateTotals(nv)
                const ngayCong = danhSachNgayCong?.find((nc) => nc.nhanVienId === nv.nhanVienId)
                const ngayCongThucTe = ngayCong?.ngayCongDieuChinh
                  ? Number(ngayCong.ngayCongDieuChinh)
                  : ngayCong
                  ? Number(ngayCong.soCongThucTe) + Number(ngayCong.soNgayNghiPhep)
                  : nv.ngayCongThucTe
                
                return (
                  <tr key={nv.nhanVienId}>
                    <td className="sticky left-0 bg-white">{index + 1}</td>
                    <td className="sticky left-10 bg-white font-medium">{nv.maNhanVien}</td>
                    <td className="sticky left-[120px] bg-white">{nv.hoTen}</td>
                    <td>{nv.chucVu || '-'}</td>
                    <td className="text-center bg-orange-50 relative group">
                      <div className="flex items-center justify-center gap-1">
                        <span className={`font-medium ${ngayCong?.ngayCongDieuChinh ? 'text-orange-600' : ''}`}>
                          {ngayCongThucTe.toFixed(1)}/{bangLuong.ngayCongLyThuyet}
                        </span>
                        {isEditable && (
                          <button
                            onClick={() => handleOpenNgayCongModal(nv.nhanVienId)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-orange-200 rounded"
                            title="Chi tiết và điều chỉnh"
                          >
                            <Edit3 className="w-3 h-3 text-orange-600" />
                          </button>
                        )}
                        {ngayCong?.ngayCongDieuChinh && (
                          <span className="text-xs text-orange-600" title="Đã điều chỉnh thủ công">
                            ✓
                          </span>
                        )}
                      </div>
                      {ngayCong && (
                        <div className="text-xs text-gray-500 mt-0.5">
                          <span className="text-green-600">{Number(ngayCong.soNgayNghiPhep).toFixed(1)}P</span>
                          {Number(ngayCong.soNgayNghiKhongPhep) > 0 && (
                            <span className="text-red-600 ml-1">
                              {Number(ngayCong.soNgayNghiKhongPhep).toFixed(1)}KP
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td 
                      className={`text-center bg-orange-50 ${isEditable ? 'cursor-pointer hover:bg-orange-100' : ''}`}
                      onClick={() => isEditable && handleOpenNgayCongModal(nv.nhanVienId)}
                      title={isEditable ? 'Click để điều chỉnh ngày công' : ''}
                    >
                      {ngayCong?.ngayCongDieuChinh ? (
                        <span className="font-medium text-orange-600">
                          {Number(ngayCong.ngayCongDieuChinh).toFixed(1)}
                        </span>
                      ) : (
                        <span className={isEditable ? 'text-blue-500 hover:underline' : 'text-gray-400'}>
                          {isEditable ? 'Nhập' : '-'}
                        </span>
                      )}
                    </td>
                    {bangLuong.danhSachKhoanLuong.map((kl) => {
                      const khoan = nv.cacKhoanLuong.find((k) => k.khoanLuongId === kl.id)
                      const originalValue = khoan?.soTien || 0
                      const displayValue = getCellValue(nv.nhanVienId, kl.id, originalValue)
                      const isEditing =
                        editingCell?.nhanVienId === nv.nhanVienId &&
                        editingCell?.khoanLuongId === kl.id
                      const hasChange = pendingChanges.has(`${nv.nhanVienId}-${kl.id}`)

                      return (
                        <td
                          key={kl.id}
                          className={`number ${isEditable ? 'editable' : ''} ${
                            hasChange ? 'bg-yellow-100' : ''
                          }`}
                          onClick={() => handleCellClick(nv.nhanVienId, kl.id, displayValue)}
                        >
                          {isEditing ? (
                            <input
                              type="text"
                              value={editingCell.value}
                              onChange={(e) => handleCellChange(e.target.value)}
                              onBlur={handleCellBlur}
                              onKeyDown={handleKeyDown}
                              className="cell-input"
                              autoFocus
                            />
                          ) : (
                            formatTien(displayValue)
                          )}
                        </td>
                      )
                    })}
                    <td className="number font-semibold bg-blue-50">
                      {formatTien(totals.tongThuNhap)}
                    </td>
                    <td className="number text-red-600 bg-red-50">
                      {formatTien(totals.tongKhauTru)}
                    </td>
                    <td className="number font-bold text-green-600 bg-green-50">
                      {formatTien(totals.thucLinh)}
                    </td>
                    <td className="text-center bg-purple-50">
                      <button
                        onClick={() => setSelectedNhanVien({ id: nv.nhanVienId, hoTen: nv.hoTen })}
                        className="p-1.5 hover:bg-purple-200 rounded-lg text-purple-600 transition-colors"
                        title="Xem phiếu lương"
                      >
                        <FileText size={18} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="total-row">
                <td colSpan={4} className="text-right font-bold">
                  TỔNG CỘNG
                </td>
                <td className="bg-orange-100"></td>
                <td className="bg-orange-100"></td>
                {bangLuong.danhSachKhoanLuong.map((kl) => {
                  const total = bangLuong.danhSachNhanVien.reduce((sum, nv) => {
                    const khoan = nv.cacKhoanLuong.find((k) => k.khoanLuongId === kl.id)
                    return sum + getCellValue(nv.nhanVienId, kl.id, khoan?.soTien || 0)
                  }, 0)
                  return (
                    <td key={kl.id} className="number font-bold">
                      {formatTien(total)}
                    </td>
                  )
                })}
                <td className="number font-bold bg-blue-100">
                  {formatTien(
                    bangLuong.danhSachNhanVien.reduce(
                      (sum, nv) => sum + calculateTotals(nv).tongThuNhap,
                      0
                    )
                  )}
                </td>
                <td className="number font-bold text-red-600 bg-red-100">
                  {formatTien(
                    bangLuong.danhSachNhanVien.reduce(
                      (sum, nv) => sum + calculateTotals(nv).tongKhauTru,
                      0
                    )
                  )}
                </td>
                <td className="number font-bold text-green-600 bg-green-100">
                  {formatTien(
                    bangLuong.danhSachNhanVien.reduce(
                      (sum, nv) => sum + calculateTotals(nv).thucLinh,
                      0
                    )
                  )}
                </td>
                <td className="bg-purple-100"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Lịch sử chỉnh sửa */}
      {showLichSu && (
        <div className="card mt-4">
          <h3 className="font-semibold mb-3">Lịch sử chỉnh sửa</h3>
          {lichSu && lichSu.length > 0 ? (
            <div className="max-h-64 overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Thời gian</th>
                    <th className="text-left py-2">Nhân viên</th>
                    <th className="text-left py-2">Khoản</th>
                    <th className="text-right py-2">Cũ</th>
                    <th className="text-right py-2">Mới</th>
                    <th className="text-left py-2">Người sửa</th>
                  </tr>
                </thead>
                <tbody>
                  {lichSu.map((ls: {
                    id: number
                    ngayThayDoi: string
                    nhanVien?: { hoTen: string }
                    khoanLuong?: { tenKhoan: string }
                    giaTriCu: number
                    giaTriMoi: number
                    nguoiThayDoi: string
                  }) => (
                    <tr key={ls.id} className="border-b">
                      <td className="py-2">{new Date(ls.ngayThayDoi).toLocaleString('vi-VN')}</td>
                      <td className="py-2">{ls.nhanVien?.hoTen}</td>
                      <td className="py-2">{ls.khoanLuong?.tenKhoan}</td>
                      <td className="py-2 text-right">{formatTien(ls.giaTriCu)}</td>
                      <td className="py-2 text-right font-medium">{formatTien(ls.giaTriMoi)}</td>
                      <td className="py-2">{ls.nguoiThayDoi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">Chưa có lịch sử chỉnh sửa</p>
          )}
        </div>
      )}

      {/* Modal chốt bảng lương */}
      {showChotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Chốt bảng lương</h2>
            <p className="text-gray-600 mb-4">
              Sau khi chốt, bảng lương sẽ không thể chỉnh sửa. Bạn có chắc chắn?
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Người chốt *</label>
              <input
                type="text"
                value={nguoiChot}
                onChange={(e) => setNguoiChot(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Nhập tên người chốt"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowChotModal(false)} className="btn btn-secondary">
                <X size={18} />
                Hủy
              </button>
              <button
                onClick={() => chotMutation.mutate({ nguoiChot })}
                disabled={!nguoiChot || chotMutation.isPending}
                className="btn btn-primary"
              >
                <Check size={18} />
                Xác nhận chốt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Phiếu lương */}
      {selectedNhanVien && (
        <PhieuLuongModal
          isOpen={!!selectedNhanVien}
          onClose={() => setSelectedNhanVien(null)}
          bangLuongId={Number(id)}
          nhanVienId={selectedNhanVien.id}
          hoTen={selectedNhanVien.hoTen}
        />
      )}

      {/* Modal điều chỉnh ngày công */}
      {editingNgayCong && (
        <NgayCongModal
          ngayCong={editingNgayCong}
          onClose={() => setEditingNgayCong(null)}
          onSave={handleSaveNgayCong}
          isLoading={capNhatNgayCongMutation.isPending}
        />
      )}
    </div>
  )
}
