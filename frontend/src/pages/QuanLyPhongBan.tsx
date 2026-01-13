// Trang Quản lý Phòng ban
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Building2, Plus, Edit2, Trash2, Search, Users, Clock } from 'lucide-react'
import { phongBanApi, nhanVienApi } from '../services/api'

interface PhongBan {
  id: number
  maPhongBan: string
  tenPhongBan: string
  moTa?: string
  gioVaoChuan?: string
  gioRaChuan?: string
  phutChoPhepTre?: number
  ngayTao?: string
  _count?: {
    nhanViens: number
  }
}

export default function QuanLyPhongBan() {
  const queryClient = useQueryClient()
  const [tuKhoa, setTuKhoa] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<PhongBan | null>(null)
  const [formData, setFormData] = useState({
    maPhongBan: '',
    tenPhongBan: '',
    moTa: '',
    gioVaoChuan: '08:00',
    gioRaChuan: '17:00',
    phutChoPhepTre: 5,
  })

  // Lấy danh sách phòng ban
  const { data: phongBans, isLoading } = useQuery({
    queryKey: ['phong-ban'],
    queryFn: phongBanApi.layTatCa,
  })

  // Lấy số nhân viên mỗi phòng ban
  const { data: nhanViensData } = useQuery({
    queryKey: ['nhan-vien'],
    queryFn: () => nhanVienApi.layTatCa({}),
  })

  // Handle paginated response format { data: [], meta: {} }
  const nhanViens = Array.isArray(nhanViensData) ? nhanViensData : nhanViensData?.data || []

  // Đếm số NV theo phòng ban
  const countNhanVien = (phongBanId: number) => {
    return nhanViens?.filter((nv: { phongBanId: number }) => nv.phongBanId === phongBanId).length || 0
  }

  // Mutations
  const createMutation = useMutation({
    mutationFn: phongBanApi.taoMoi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phong-ban'] })
      handleCloseModal()
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<PhongBan> }) =>
      phongBanApi.capNhat(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phong-ban'] })
      handleCloseModal()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: phongBanApi.xoa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phong-ban'] })
    },
  })

  // Filter theo từ khóa
  const filteredPhongBans = phongBans?.filter((pb: PhongBan) =>
    pb.tenPhongBan.toLowerCase().includes(tuKhoa.toLowerCase()) ||
    pb.maPhongBan.toLowerCase().includes(tuKhoa.toLowerCase())
  )

  const handleOpenCreate = () => {
    setEditing(null)
    setFormData({ 
      maPhongBan: '', 
      tenPhongBan: '', 
      moTa: '',
      gioVaoChuan: '08:00',
      gioRaChuan: '17:00',
      phutChoPhepTre: 5,
    })
    setShowModal(true)
  }

  const handleOpenEdit = (pb: PhongBan) => {
    setEditing(pb)
    setFormData({
      maPhongBan: pb.maPhongBan,
      tenPhongBan: pb.tenPhongBan,
      moTa: pb.moTa || '',
      gioVaoChuan: pb.gioVaoChuan || '08:00',
      gioRaChuan: pb.gioRaChuan || '17:00',
      phutChoPhepTre: pb.phutChoPhepTre ?? 5,
    })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditing(null)
    setFormData({ 
      maPhongBan: '', 
      tenPhongBan: '', 
      moTa: '',
      gioVaoChuan: '08:00',
      gioRaChuan: '17:00',
      phutChoPhepTre: 5,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.maPhongBan.trim() || !formData.tenPhongBan.trim()) {
      alert('Vui lòng nhập mã và tên phòng ban')
      return
    }

    if (editing) {
      updateMutation.mutate({ id: editing.id, data: formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  const handleDelete = (pb: PhongBan) => {
    const soNV = countNhanVien(pb.id)
    if (soNV > 0) {
      alert(`Không thể xóa phòng ban này vì đang có ${soNV} nhân viên. Vui lòng chuyển nhân viên sang phòng ban khác trước.`)
      return
    }
    if (confirm(`Bạn có chắc muốn xóa phòng ban "${pb.tenPhongBan}"?`)) {
      deleteMutation.mutate(pb.id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-primary-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Phòng ban</h1>
            <p className="text-gray-500">Quản lý cơ cấu tổ chức công ty</p>
          </div>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus size={20} />
          Thêm phòng ban
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm phòng ban..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            value={tuKhoa}
            onChange={(e) => setTuKhoa(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Đang tải...</div>
        ) : filteredPhongBans?.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Không có phòng ban nào
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên phòng ban
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-1">
                      <Clock size={14} />
                      Giờ làm việc
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cho phép trễ
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nhân viên
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPhongBans?.map((pb: PhongBan) => (
                  <tr key={pb.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {pb.maPhongBan}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{pb.tenPhongBan}</div>
                      {pb.moTa && <div className="text-xs text-gray-500">{pb.moTa}</div>}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium bg-indigo-50 text-indigo-700">
                        <Clock size={14} />
                        {pb.gioVaoChuan || '08:00'} - {pb.gioRaChuan || '17:00'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-sm text-gray-600">
                        {pb.phutChoPhepTre ?? 5} phút
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Users size={14} />
                        {countNhanVien(pb.id)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(pb)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Sửa"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(pb)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Xóa"
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500">Tổng số phòng ban</div>
          <div className="text-3xl font-bold text-primary-600 mt-1">
            {phongBans?.length || 0}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500">Tổng số nhân viên</div>
          <div className="text-3xl font-bold text-green-600 mt-1">
            {nhanViens?.length || 0}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500">Trung bình NV/Phòng</div>
          <div className="text-3xl font-bold text-blue-600 mt-1">
            {phongBans?.length > 0 
              ? Math.round((nhanViens?.length || 0) / phongBans.length) 
              : 0}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editing ? 'Cập nhật phòng ban' : 'Thêm phòng ban mới'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mã phòng ban <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.maPhongBan}
                    onChange={(e) => setFormData({ ...formData, maPhongBan: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="VD: HR, IT..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên phòng ban <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.tenPhongBan}
                    onChange={(e) => setFormData({ ...formData, tenPhongBan: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="VD: Phòng Nhân sự..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  value={formData.moTa}
                  onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  rows={2}
                  placeholder="Mô tả về phòng ban..."
                />
              </div>

              {/* Cấu hình giờ làm việc */}
              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-medium text-gray-900">Giờ làm việc</h3>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giờ vào
                    </label>
                    <input
                      type="time"
                      value={formData.gioVaoChuan}
                      onChange={(e) => setFormData({ ...formData, gioVaoChuan: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giờ ra
                    </label>
                    <input
                      type="time"
                      value={formData.gioRaChuan}
                      onChange={(e) => setFormData({ ...formData, gioRaChuan: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cho phép trễ
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="60"
                        value={formData.phutChoPhepTre}
                        onChange={(e) => setFormData({ ...formData, phutChoPhepTre: Number(e.target.value) })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">phút</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Nhân viên được phép đến muộn trong khoảng thời gian cho phép mà không bị tính là đi trễ.
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                >
                  {createMutation.isPending || updateMutation.isPending 
                    ? 'Đang lưu...' 
                    : (editing ? 'Cập nhật' : 'Thêm mới')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
