// Danh sách bảng lương - Premium Style
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Plus, FileSpreadsheet, Trash2, Eye, Lock, Check, Calendar, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'
import { bangLuongApi, phongBanApi } from '../services/api'
import { formatTien, layTenTrangThai } from '../utils'
import { Card, Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter } from '../components/ui'
import { useAuth } from '../contexts/AuthContext'

export default function DanhSachBangLuong() {
  const { coVaiTro } = useAuth()
  const isAdmin = coVaiTro('ADMIN')
  const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(false)
  const [filterNam, setFilterNam] = useState(new Date().getFullYear())
  const [filterPhongBan, setFilterPhongBan] = useState<number | undefined>()

  // Form tạo mới - hỗ trợ nhiều phòng ban
  const [formData, setFormData] = useState({
    thang: new Date().getMonth() + 1,
    nam: new Date().getFullYear(),
    phongBanIds: [] as number[],
    tenBangLuong: '',
  })

  const { data: bangLuongsData, isLoading } = useQuery({
    queryKey: ['bang-luong', filterNam, filterPhongBan],
    queryFn: () => bangLuongApi.layDanhSach({ nam: filterNam, phongBanId: filterPhongBan }),
  })

  // Handle paginated response format { data: [], meta: {} }
  const bangLuongs = (Array.isArray(bangLuongsData) ? bangLuongsData : bangLuongsData?.data || []).filter((bl: any) => bl && bl.id)

  const { data: phongBans } = useQuery({
    queryKey: ['phong-ban'],
    queryFn: phongBanApi.layTatCa,
  })

  const taoMoiMutation = useMutation({
    mutationFn: async (data: { thang: number; nam: number; phongBanIds: number[]; tenBangLuong: string }) => {
      // BUG-003 P0: Sử dụng Promise.allSettled để handle partial failures
      const results = await Promise.allSettled(
        data.phongBanIds.map(phongBanId => 
          bangLuongApi.taoMoi({
            thang: data.thang,
            nam: data.nam,
            phongBanId,
            tenBangLuong: data.phongBanIds.length > 1 ? '' : data.tenBangLuong,
          })
        )
      )
      
      const successful = results.filter(r => r.status === 'fulfilled')
      const failed = results.filter(r => r.status === 'rejected')
      
      return { successful, failed, total: results.length }
    },
    onSuccess: ({ successful, failed, total }) => {
      queryClient.invalidateQueries({ queryKey: ['bang-luong'] })
      
      if (successful.length > 0 && failed.length === 0) {
        toast.success(`Tạo ${successful.length} bảng lương thành công!`)
      } else if (successful.length > 0 && failed.length > 0) {
        toast.success(`Tạo ${successful.length}/${total} bảng lương thành công!`)
        toast.error(`${failed.length} bảng lương tạo thất bại`)
      } else if (failed.length > 0) {
        const firstError = failed[0] as PromiseRejectedResult
        const errorMessage = (firstError.reason as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Có lỗi xảy ra'
        toast.error(errorMessage)
      }
      
      if (successful.length > 0) {
        setShowModal(false)
        setFormData({
          thang: new Date().getMonth() + 1,
          nam: new Date().getFullYear(),
          phongBanIds: [],
          tenBangLuong: '',
        })
      }
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const xoaMutation = useMutation({
    mutationFn: ({ id, force }: { id: number; force?: boolean }) => bangLuongApi.xoa(id, force),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bang-luong'] })
      toast.success('Xóa bảng lương thành công!')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const handleTaoMoi = () => {
    if (formData.phongBanIds.length === 0) {
      toast.error('Vui lòng chọn ít nhất một phòng ban')
      return
    }
    taoMoiMutation.mutate(formData)
  }

  const handleXoa = (id: number, trangThai: string, forceDelete = false) => {
    if (!forceDelete && trangThai !== 'NHAP') {
      toast.error('Chỉ có thể xóa bảng lương đang ở trạng thái Nhập. ADMIN có thể xóa bảng đã khóa.')
      return
    }
    const confirmMsg = forceDelete 
      ? '⚠️ BẠN ĐANG XÓA BẢNG LƯƠNG ĐÃ KHÓA! Hành động này không thể hoàn tác. Bạn có chắc chắn?'
      : 'Bạn có chắc muốn xóa bảng lương này?'
    if (confirm(confirmMsg)) {
      xoaMutation.mutate({ id, force: forceDelete })
    }
  }

  // Status badge mapping
  const getStatusBadge = (trangThai: string) => {
    switch (trangThai) {
      case 'NHAP':
        return <Badge variant="neutral" dot>Đang nhập</Badge>
      case 'DA_CHOT':
        return <Badge variant="success" dot>Đã chốt</Badge>
      case 'KHOA':
        return <Badge variant="info" dot>Đã khóa</Badge>
      default:
        return <Badge variant="neutral">{layTenTrangThai(trangThai)}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
              <FileSpreadsheet size={22} className="text-[var(--accent)]" />
            </div>
            Quản lý Bảng lương
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 ml-13">
            Tạo và quản lý bảng lương hàng tháng
          </p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          icon={<Plus size={18} />}
        >
          Tạo bảng lương mới
        </Button>
      </div>

      {/* Filters */}
      <Card variant="glass" padding="md">
        <div className="flex gap-4 items-end flex-wrap">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">
              Năm
            </label>
            <select
              value={filterNam}
              onChange={(e) => setFilterNam(Number(e.target.value))}
              className="
                h-10 px-4 rounded-xl
                bg-[var(--bg-1)] border border-[var(--border)]
                text-[var(--text-primary)]
                focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20
                transition-all
              "
            >
              {[2024, 2025, 2026, 2027].map((nam) => (
                <option key={nam} value={nam}>{nam}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">
              Phòng ban
            </label>
            <select
              value={filterPhongBan || ''}
              onChange={(e) => setFilterPhongBan(e.target.value ? Number(e.target.value) : undefined)}
              className="
                h-10 px-4 rounded-xl min-w-[200px]
                bg-[var(--bg-1)] border border-[var(--border)]
                text-[var(--text-primary)]
                focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20
                transition-all
              "
            >
              <option value="">Tất cả phòng ban</option>
              {phongBans?.map((pb: { id: number; tenPhongBan: string }) => (
                <option key={pb.id} value={pb.id}>{pb.tenPhongBan}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card variant="glass" padding="none">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : bangLuongs && bangLuongs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg-2)]">
                  <th className="text-left py-4 px-5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Tên bảng lương
                  </th>
                  <th className="text-center py-4 px-5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Kỳ lương
                  </th>
                  <th className="text-left py-4 px-5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Phòng ban
                  </th>
                  <th className="text-right py-4 px-5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Số NV
                  </th>
                  <th className="text-right py-4 px-5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Tổng thu nhập
                  </th>
                  <th className="text-right py-4 px-5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Thực lĩnh
                  </th>
                  <th className="text-center py-4 px-5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="text-center py-4 px-5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {bangLuongs.map((bl: any) => (
                  <tr key={bl.id} className="hover:bg-[var(--bg-2)] transition-colors group">
                    <td className="py-4 px-5">
                      <Link
                        to={`/bang-luong/${bl.id}`}
                        className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors"
                      >
                        {bl.tenBangLuong || `Bảng lương T${bl.thang}/${bl.nam}`}
                      </Link>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className="inline-flex items-center gap-1.5 text-[var(--text-secondary)]">
                        <Calendar size={14} className="text-[var(--text-muted)]" />
                        T{bl.thang}/{bl.nam}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-[var(--text-secondary)]">
                      {bl.phongBan?.tenPhongBan || '—'}
                    </td>
                    <td className="py-4 px-5 text-right text-[var(--text-secondary)] tabular-nums">
                      {bl.soNhanVien || 0}
                    </td>
                    <td className="py-4 px-5 text-right text-[var(--text-secondary)] tabular-nums">
                      {formatTien(bl.tongThuNhap)}
                    </td>
                    <td className="py-4 px-5 text-right font-semibold text-[var(--accent)] tabular-nums">
                      {formatTien(bl.thucLinh)}
                    </td>
                    <td className="py-4 px-5 text-center">
                      {getStatusBadge(bl.trangThai)}
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          to={`/bang-luong/${bl.id}`}
                          className="p-2 text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye size={18} />
                        </Link>
                        {bl.trangThai === 'NHAP' && (
                          <button
                            onClick={() => handleXoa(bl.id, bl.trangThai)}
                            className="p-2 text-[var(--text-muted)] hover:text-[#FF4D6D] hover:bg-[#FF4D6D]/10 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                        {bl.trangThai === 'DA_CHOT' && (
                          <span className="p-2 text-[var(--text-disabled)]" title="Đã chốt">
                            <Lock size={18} />
                          </span>
                        )}
                        {bl.trangThai === 'KHOA' && (
                          <>
                            <span className="p-2 text-[var(--text-disabled)]" title="Đã khóa">
                              <Lock size={18} />
                            </span>
                            {isAdmin && (
                              <button
                                onClick={() => handleXoa(bl.id, bl.trangThai, true)}
                                className="p-2 text-[#FF4D6D] hover:text-white hover:bg-[#FF4D6D] rounded-lg transition-colors"
                                title="ADMIN: Xóa bảng đã khóa"
                              >
                                <AlertTriangle size={18} />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--bg-2)] flex items-center justify-center text-[var(--text-muted)]">
              <FileSpreadsheet size={28} />
            </div>
            <p className="text-[var(--text-muted)]">
              Chưa có bảng lương nào
            </p>
            <Button onClick={() => setShowModal(true)} variant="secondary" size="sm" className="mt-4">
              <Plus size={16} />
              Tạo bảng lương đầu tiên
            </Button>
          </div>
        )}
      </Card>

      {/* Modal tạo mới - Premium Style */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
        <ModalHeader 
          title="Tạo bảng lương mới"
          subtitle="Chọn kỳ lương và phòng ban để tạo bảng lương"
          icon={<FileSpreadsheet size={24} />}
        />
        
        <ModalBody>
          <div className="space-y-5">
            {/* Kỳ lương */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Tháng</label>
                <select
                  value={formData.thang}
                  onChange={(e) => setFormData({ ...formData, thang: Number(e.target.value) })}
                  className="
                    w-full h-10 px-4 rounded-xl
                    bg-[var(--bg-1)] border border-[var(--border)]
                    text-[var(--text-primary)]
                    focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20
                  "
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>Tháng {m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Năm</label>
                <select
                  value={formData.nam}
                  onChange={(e) => setFormData({ ...formData, nam: Number(e.target.value) })}
                  className="
                    w-full h-10 px-4 rounded-xl
                    bg-[var(--bg-1)] border border-[var(--border)]
                    text-[var(--text-primary)]
                    focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20
                  "
                >
                  {[2024, 2025, 2026, 2027].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phòng ban */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                Phòng ban <span className="text-[#FF4D6D]">*</span>
                <span className="text-[var(--text-muted)] font-normal ml-1">(chọn nhiều)</span>
              </label>
              <div className="border border-[var(--border)] rounded-xl max-h-48 overflow-y-auto bg-[var(--bg-1)] modal-scroll">
                {/* Select All */}
                <label className="flex items-center gap-3 p-3 hover:bg-[var(--accent-light)] cursor-pointer border-b border-[var(--border)] transition-colors">
                  <input
                    type="checkbox"
                    checked={phongBans && formData.phongBanIds.length === phongBans.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, phongBanIds: phongBans?.map((pb: { id: number }) => pb.id) || [] })
                      } else {
                        setFormData({ ...formData, phongBanIds: [] })
                      }
                    }}
                    className="flex-shrink-0"
                  />
                  <span className="font-medium text-[var(--accent)]">Chọn tất cả ({phongBans?.length || 0} phòng ban)</span>
                </label>
                {/* Departments */}
                {phongBans?.map((pb: { id: number; tenPhongBan: string }) => (
                  <label key={pb.id} className="flex items-center gap-3 p-3 hover:bg-[var(--accent-light)] cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.phongBanIds.includes(pb.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, phongBanIds: [...formData.phongBanIds, pb.id] })
                        } else {
                          setFormData({ ...formData, phongBanIds: formData.phongBanIds.filter(id => id !== pb.id) })
                        }
                      }}
                      className="flex-shrink-0"
                    />
                    <span className="text-[var(--text-primary)] flex-1">{pb.tenPhongBan}</span>
                    {formData.phongBanIds.includes(pb.id) && (
                      <Check className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                    )}
                  </label>
                ))}
              </div>
              {formData.phongBanIds.length > 0 && (
                <p className="text-xs text-[var(--accent)] mt-1.5 font-medium">
                  ✓ Đã chọn: {formData.phongBanIds.length} phòng ban
                </p>
              )}
            </div>

            {/* Tên bảng lương */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                Tên bảng lương 
                <span className="text-[var(--text-muted)] font-normal ml-1">(tuỳ chọn)</span>
              </label>
              <input
                type="text"
                value={formData.tenBangLuong}
                onChange={(e) => setFormData({ ...formData, tenBangLuong: e.target.value })}
                className="
                  w-full h-10 px-4 rounded-xl
                  bg-[var(--bg-1)] border border-[var(--border)]
                  text-[var(--text-primary)] placeholder:text-[var(--text-disabled)]
                  focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20
                "
                placeholder="Tự động tạo nếu để trống"
              />
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Huỷ
          </Button>
          <Button
            onClick={handleTaoMoi}
            loading={taoMoiMutation.isPending}
            icon={<Plus size={16} />}
          >
            Tạo bảng lương
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
