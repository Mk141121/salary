// Danh sách bảng lương
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Plus, FileSpreadsheet, Trash2, Eye, Lock, Unlock, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { bangLuongApi, phongBanApi } from '../services/api'
import { formatTien, layTenTrangThai, layClassTrangThai } from '../utils'

export default function DanhSachBangLuong() {
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
  const bangLuongs = Array.isArray(bangLuongsData) ? bangLuongsData : bangLuongsData?.data || []

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
    mutationFn: bangLuongApi.xoa,
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

  const handleXoa = (id: number, trangThai: string) => {
    if (trangThai !== 'NHAP') {
      toast.error('Chỉ có thể xóa bảng lương đang ở trạng thái Nhập')
      return
    }
    if (confirm('Bạn có chắc muốn xóa bảng lương này?')) {
      xoaMutation.mutate(id)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FileSpreadsheet size={28} />
          Quản lý Bảng lương
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary"
        >
          <Plus size={20} />
          Tạo bảng lương mới
        </button>
      </div>

      {/* Bộ lọc */}
      <div className="card mb-6">
        <div className="flex gap-4 items-center">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Năm</label>
            <select
              value={filterNam}
              onChange={(e) => setFilterNam(Number(e.target.value))}
              className="border rounded-lg px-3 py-2"
            >
              {[2024, 2025, 2026, 2027].map((nam) => (
                <option key={nam} value={nam}>{nam}</option>
              ))}
            </select>
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
        ) : bangLuongs && bangLuongs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Tên bảng lương
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Tháng/Năm
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Phòng ban
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                    Số NV
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                    Tổng thu nhập
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                    Thực lĩnh
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Trạng thái
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {bangLuongs.map((bl) => (
                  <tr key={bl.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Link
                        to={`/bang-luong/${bl.id}`}
                        className="text-primary-600 hover:underline font-medium"
                      >
                        {bl.tenBangLuong || `Bảng lương T${bl.thang}/${bl.nam}`}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {bl.thang}/{bl.nam}
                    </td>
                    <td className="py-3 px-4">{bl.phongBan.tenPhongBan}</td>
                    <td className="py-3 px-4 text-right">{bl.soNhanVien || 0}</td>
                    <td className="py-3 px-4 text-right currency">
                      {formatTien(bl.tongThuNhap)}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold currency text-green-600">
                      {formatTien(bl.thucLinh)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={layClassTrangThai(bl.trangThai)}>
                        {layTenTrangThai(bl.trangThai)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/bang-luong/${bl.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Xem chi tiết"
                        >
                          <Eye size={18} />
                        </Link>
                        {bl.trangThai === 'NHAP' && (
                          <button
                            onClick={() => handleXoa(bl.id, bl.trangThai)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Xóa"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                        {bl.trangThai === 'DA_CHOT' && (
                          <span title="Đã chốt">
                            <Lock size={18} className="text-gray-400" />
                          </span>
                        )}
                        {bl.trangThai === 'KHOA' && (
                          <span title="Đã khóa">
                            <Unlock size={18} className="text-gray-400" />
                          </span>
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
            Chưa có bảng lương nào
          </p>
        )}
      </div>

      {/* Modal tạo mới */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Tạo bảng lương mới</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tháng</label>
                  <select
                    value={formData.thang}
                    onChange={(e) => setFormData({ ...formData, thang: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={m}>Tháng {m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Năm</label>
                  <select
                    value={formData.nam}
                    onChange={(e) => setFormData({ ...formData, nam: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    {[2024, 2025, 2026, 2027].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phòng ban * (chọn nhiều)</label>
                <div className="border rounded-lg p-3 max-h-48 overflow-y-auto space-y-2">
                  <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer border-b pb-2 mb-2">
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
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="font-medium text-blue-600">Chọn tất cả ({phongBans?.length || 0} phòng ban)</span>
                  </label>
                  {phongBans?.map((pb: { id: number; tenPhongBan: string }) => (
                    <label key={pb.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
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
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span>{pb.tenPhongBan}</span>
                      {formData.phongBanIds.includes(pb.id) && (
                        <Check className="w-4 h-4 text-green-500 ml-auto" />
                      )}
                    </label>
                  ))}
                </div>
                {formData.phongBanIds.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    Đã chọn: {formData.phongBanIds.length} phòng ban
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tên bảng lương (tuỳ chọn)</label>
                <input
                  type="text"
                  value={formData.tenBangLuong}
                  onChange={(e) => setFormData({ ...formData, tenBangLuong: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Tự động tạo nếu để trống"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-secondary"
              >
                Hủy
              </button>
              <button
                onClick={handleTaoMoi}
                disabled={taoMoiMutation.isPending}
                className="btn btn-primary"
              >
                {taoMoiMutation.isPending ? 'Đang tạo...' : 'Tạo mới'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
