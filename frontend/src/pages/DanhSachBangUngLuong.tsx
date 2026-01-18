// Danh sách Bảng ứng lương
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Plus, Wallet, Trash2, Lock, Check, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'
import { ungLuongApi, phongBanApi } from '../services/api'
import { formatTien, formatNgay } from '../utils'
import { VietnameseMonthPicker, VietnameseDatePicker } from '../components/VietnameseDatePicker'
import { useAuth } from '../contexts/AuthContext'

const getTrangThaiClass = (trangThai: string) => {
  switch (trangThai) {
    case 'NHAP':
      return 'bg-yellow-100 text-yellow-800'
    case 'DA_CHOT':
      return 'bg-blue-100 text-blue-800'
    case 'DA_KHOA':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getTrangThaiLabel = (trangThai: string) => {
  switch (trangThai) {
    case 'NHAP':
      return 'Nháp'
    case 'DA_CHOT':
      return 'Đã chốt'
    case 'DA_KHOA':
      return 'Đã khóa'
    default:
      return trangThai
  }
}

export default function DanhSachBangUngLuong() {
  const queryClient = useQueryClient()
  const { coVaiTro } = useAuth()
  const isAdmin = coVaiTro('ADMIN')
  const [showModal, setShowModal] = useState(false)
  const [filterThangNam, setFilterThangNam] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  })
  const [filterPhongBan, setFilterPhongBan] = useState<number | undefined>()

  const [formData, setFormData] = useState({
    thangNam: filterThangNam,
    tuNgay: '',
    denNgay: '',
    ngayChiTra: '',
    phongBanId: undefined as number | undefined,
    ghiChu: '',
  })

  // Tự động tính ngày khi thay đổi tháng
  const handleThangNamChange = (value: string) => {
    // Giữa tháng: từ ngày 1 đến 15
    const tuNgay = `${value}-01`
    const denNgay = `${value}-15`
    setFormData({
      ...formData,
      thangNam: value,
      tuNgay,
      denNgay,
    })
  }

  const { data: bangUngLuongsData, isLoading } = useQuery({
    queryKey: ['bang-ung-luong', filterThangNam, filterPhongBan],
    queryFn: () => ungLuongApi.layDanhSach({ thangNam: filterThangNam, phongBanId: filterPhongBan }),
  })

  const bangUngLuongs = bangUngLuongsData?.data || []

  const { data: phongBans } = useQuery({
    queryKey: ['phong-ban'],
    queryFn: phongBanApi.layTatCa,
  })

  const taoMoiMutation = useMutation({
    mutationFn: ungLuongApi.taoMoi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bang-ung-luong'] })
      toast.success('Tạo bảng ứng lương thành công!')
      setShowModal(false)
      setFormData({
        thangNam: filterThangNam,
        tuNgay: '',
        denNgay: '',
        ngayChiTra: '',
        phongBanId: undefined,
        ghiChu: '',
      })
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const xoaMutation = useMutation({
    mutationFn: ({ id, force }: { id: number; force?: boolean }) => ungLuongApi.xoa(id, force),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bang-ung-luong'] })
      toast.success('Xóa bảng ứng lương thành công!')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const chotMutation = useMutation({
    mutationFn: ungLuongApi.chot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bang-ung-luong'] })
      toast.success('Chốt bảng ứng lương thành công!')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const khoaMutation = useMutation({
    mutationFn: ungLuongApi.khoa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bang-ung-luong'] })
      toast.success('Khóa bảng ứng lương thành công!')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const handleTaoMoi = () => {
    if (!formData.tuNgay || !formData.denNgay) {
      toast.error('Vui lòng nhập đầy đủ thông tin')
      return
    }
    taoMoiMutation.mutate(formData)
  }

  const handleXoa = (id: number, trangThai: string, force = false) => {
    if (trangThai !== 'NHAP' && !force) {
      toast.error('Chỉ có thể xóa bảng ứng lương đang ở trạng thái Nháp')
      return
    }
    const confirmMsg = force
      ? '⚠️ CẢNH BÁO: Bạn đang xóa cưỡng chế bảng ứng lương đã khóa. Thao tác này sẽ được ghi lại. Tiếp tục?'
      : 'Bạn có chắc muốn xóa bảng ứng lương này?'
    if (confirm(confirmMsg)) {
      xoaMutation.mutate({ id, force })
    }
  }

  const handleChot = (id: number, trangThai: string) => {
    if (trangThai !== 'NHAP') {
      toast.error('Chỉ có thể chốt bảng ứng lương đang ở trạng thái Nháp')
      return
    }
    if (confirm('Bạn có chắc muốn chốt bảng ứng lương này?')) {
      chotMutation.mutate(id)
    }
  }

  const handleKhoa = (id: number, trangThai: string) => {
    if (trangThai !== 'DA_CHOT') {
      toast.error('Chỉ có thể khóa bảng ứng lương đã chốt')
      return
    }
    if (confirm('Bạn có chắc muốn khóa bảng ứng lương này?')) {
      khoaMutation.mutate(id)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Wallet size={28} />
          Quản lý Bảng ứng lương
        </h1>
        <button
          onClick={() => {
            handleThangNamChange(filterThangNam)
            setShowModal(true)
          }}
          className="btn btn-primary"
        >
          <Plus size={20} />
          Tạo bảng ứng lương
        </button>
      </div>

      {/* Bộ lọc */}
      <div className="card mb-6">
        <div className="flex gap-4 items-center">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tháng/Năm</label>
            <VietnameseMonthPicker
              value={filterThangNam}
              onChange={setFilterThangNam}
              className="border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phòng ban</label>
            <select
              value={filterPhongBan || ''}
              onChange={(e) => setFilterPhongBan(e.target.value ? Number(e.target.value) : undefined)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="">Tất cả</option>
              {phongBans?.map((pb: { id: number; tenPhongBan: string }) => (
                <option key={pb.id} value={pb.id}>{pb.tenPhongBan}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Danh sách */}
      <div className="card">
        {isLoading ? (
          <p className="text-center py-8 text-gray-500">Đang tải...</p>
        ) : bangUngLuongs && bangUngLuongs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Phòng ban</th>
                  <th className="text-left py-3 px-4">Tháng/Năm</th>
                  <th className="text-left py-3 px-4">Ngày chi trả</th>
                  <th className="text-right py-3 px-4">Số NV</th>
                  <th className="text-right py-3 px-4">Tổng tiền ứng</th>
                  <th className="text-center py-3 px-4">Trạng thái</th>
                  <th className="text-center py-3 px-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {bangUngLuongs.map((bul: {
                  id: number
                  maBangUngLuong: string
                  thangNam: string
                  tuNgay: string
                  denNgay: string
                  ngayChiTra: string | null
                  soNhanVienUng: number
                  tongSoTienUng: number
                  trangThai: string
                  phongBan?: { id: number; tenPhongBan: string } | null
                  _count?: { chiTiets: number }
                }) => (
                  <tr key={bul.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">
                      <Link
                        to={`/ung-luong/${bul.id}`}
                        className="text-primary-600 hover:underline"
                      >
                        {bul.phongBan?.tenPhongBan || 'Tất cả phòng ban'}
                      </Link>
                    </td>
                    <td className="py-3 px-4">{bul.thangNam}</td>
                    <td className="py-3 px-4">
                      {bul.ngayChiTra ? formatNgay(bul.ngayChiTra) : '-'}
                    </td>
                    <td className="py-3 px-4 text-right">{bul.soNhanVienUng}/{bul._count?.chiTiets || 0}</td>
                    <td className="py-3 px-4 text-right font-medium text-blue-600">
                      {formatTien(bul.tongSoTienUng)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded text-sm ${getTrangThaiClass(bul.trangThai)}`}>
                        {getTrangThaiLabel(bul.trangThai)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        {bul.trangThai === 'NHAP' && (
                          <>
                            <button
                              onClick={() => handleChot(bul.id, bul.trangThai)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded"
                              title="Chốt"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={() => handleXoa(bul.id, bul.trangThai)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                              title="Xóa"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                        {bul.trangThai === 'DA_CHOT' && (
                          <button
                            onClick={() => handleKhoa(bul.id, bul.trangThai)}
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded"
                            title="Khóa"
                          >
                            <Lock size={18} />
                          </button>
                        )}
                        {bul.trangThai === 'DA_KHOA' && isAdmin && (
                          <button
                            onClick={() => handleXoa(bul.id, bul.trangThai, true)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                            title="[Admin] Xóa cưỡng chế"
                          >
                            <AlertTriangle size={18} />
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
          <p className="text-center py-8 text-gray-500">
            Chưa có bảng ứng lương nào. Nhấn "Tạo bảng ứng lương" để bắt đầu.
          </p>
        )}
      </div>

      {/* Modal tạo mới */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Tạo bảng ứng lương mới</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tháng/Năm <span className="text-red-500">*</span>
                </label>
                <VietnameseMonthPicker
                  value={formData.thangNam}
                  onChange={handleThangNamChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Từ ngày <span className="text-red-500">*</span>
                  </label>
                  <VietnameseDatePicker
                    value={formData.tuNgay}
                    onChange={(val) => setFormData({ ...formData, tuNgay: val })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Đến ngày <span className="text-red-500">*</span>
                  </label>
                  <VietnameseDatePicker
                    value={formData.denNgay}
                    onChange={(val) => setFormData({ ...formData, denNgay: val })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày chi trả
                </label>
                <VietnameseDatePicker
                  value={formData.ngayChiTra}
                  onChange={(val) => setFormData({ ...formData, ngayChiTra: val })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phòng ban
                </label>
                <select
                  value={formData.phongBanId || ''}
                  onChange={(e) => setFormData({ ...formData, phongBanId: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="">Tất cả phòng ban</option>
                  {phongBans?.map((pb: { id: number; tenPhongBan: string }) => (
                    <option key={pb.id} value={pb.id}>{pb.tenPhongBan}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ghi chú
                </label>
                <textarea
                  value={formData.ghiChu}
                  onChange={(e) => setFormData({ ...formData, ghiChu: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={2}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleTaoMoi}
                disabled={taoMoiMutation.isPending}
                className="btn btn-primary"
              >
                {taoMoiMutation.isPending ? 'Đang tạo...' : 'Tạo bảng ứng lương'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
