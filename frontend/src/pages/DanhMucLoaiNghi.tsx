// Quản lý danh mục loại nghỉ
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Calendar, Plus, Edit2, Power } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  nghiPhepApi,
  LoaiNghi,
  TaoLoaiNghiDto,
  NhomLoaiNghi,
  getNhomLoaiLabel,
} from '../services/nghiPhepApi'

export default function DanhMucLoaiNghi() {
  const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<LoaiNghi | null>(null)
  const [showAll, setShowAll] = useState(false)

  const [formData, setFormData] = useState<TaoLoaiNghiDto>({
    maLoaiNghi: '',
    tenLoaiNghi: '',
    nhomLoai: 'CO_PHEP',
    coTinhLuong: true,
    coTinhChuyenCan: false,
    thuTuHienThi: 0,
  })

  const { data: loaiNghis, isLoading } = useQuery({
    queryKey: ['loai-nghi', showAll],
    queryFn: () => nghiPhepApi.layDanhSachLoaiNghi(showAll),
  })

  const taoMoiMutation = useMutation({
    mutationFn: nghiPhepApi.taoLoaiNghi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loai-nghi'] })
      toast.success('Tạo loại nghỉ thành công!')
      resetForm()
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const capNhatMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<TaoLoaiNghiDto> }) =>
      nghiPhepApi.capNhatLoaiNghi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loai-nghi'] })
      toast.success('Cập nhật thành công!')
      resetForm()
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const toggleMutation = useMutation({
    mutationFn: nghiPhepApi.toggleLoaiNghi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['loai-nghi'] })
      toast.success(data.isActive ? 'Đã kích hoạt' : 'Đã vô hiệu hóa')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const resetForm = () => {
    setShowModal(false)
    setEditing(null)
    setFormData({
      maLoaiNghi: '',
      tenLoaiNghi: '',
      nhomLoai: 'CO_PHEP',
      coTinhLuong: true,
      coTinhChuyenCan: false,
      thuTuHienThi: 0,
    })
  }

  const handleEdit = (item: LoaiNghi) => {
    setEditing(item)
    setFormData({
      maLoaiNghi: item.maLoaiNghi,
      tenLoaiNghi: item.tenLoaiNghi,
      nhomLoai: item.nhomLoai,
      coTinhLuong: item.coTinhLuong,
      coTinhChuyenCan: item.coTinhChuyenCan,
      thuTuHienThi: item.thuTuHienThi,
    })
    setShowModal(true)
  }

  const handleSubmit = () => {
    if (!formData.maLoaiNghi || !formData.tenLoaiNghi) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc')
      return
    }

    if (editing) {
      const { maLoaiNghi, ...updateData } = formData
      capNhatMutation.mutate({ id: editing.id, data: updateData })
    } else {
      taoMoiMutation.mutate(formData)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="w-8 h-8 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Danh mục loại nghỉ</h1>
            <p className="text-gray-500">Quản lý các loại nghỉ phép trong hệ thống</p>
          </div>
        </div>
        <div className="flex gap-2">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={showAll}
              onChange={(e) => setShowAll(e.target.checked)}
              className="rounded border-gray-300"
            />
            Hiển thị tất cả
          </label>
          <button
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            Thêm loại nghỉ
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên loại nghỉ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nhóm</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Tính lương</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Tính chuyên cần</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  Đang tải...
                </td>
              </tr>
            ) : loaiNghis?.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  Chưa có loại nghỉ nào
                </td>
              </tr>
            ) : (
              loaiNghis?.map((item) => (
                <tr key={item.id} className={!item.isActive ? 'bg-gray-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">
                    {item.maLoaiNghi}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.tenLoaiNghi}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        item.nhomLoai === 'CO_PHEP'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {getNhomLoaiLabel(item.nhomLoai)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.coTinhLuong ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-400">✗</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.coTinhChuyenCan ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-400">✗</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        item.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {item.isActive ? 'Hoạt động' : 'Vô hiệu'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                      title="Sửa"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleMutation.mutate(item.id)}
                      className={`${
                        item.isActive
                          ? 'text-red-600 hover:text-red-900'
                          : 'text-green-600 hover:text-green-900'
                      }`}
                      title={item.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
                    >
                      <Power className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editing ? 'Sửa loại nghỉ' : 'Thêm loại nghỉ mới'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mã loại nghỉ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.maLoaiNghi}
                  onChange={(e) =>
                    setFormData({ ...formData, maLoaiNghi: e.target.value.toUpperCase() })
                  }
                  disabled={!!editing}
                  className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
                  placeholder="VD: PHEP_NAM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên loại nghỉ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.tenLoaiNghi}
                  onChange={(e) =>
                    setFormData({ ...formData, tenLoaiNghi: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="VD: Phép năm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nhóm loại nghỉ
                </label>
                <select
                  value={formData.nhomLoai}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nhomLoai: e.target.value as NhomLoaiNghi,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="CO_PHEP">Có phép</option>
                  <option value="KHONG_PHEP">Không phép</option>
                </select>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.coTinhLuong}
                    onChange={(e) =>
                      setFormData({ ...formData, coTinhLuong: e.target.checked })
                    }
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Có tính lương</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.coTinhChuyenCan}
                    onChange={(e) =>
                      setFormData({ ...formData, coTinhChuyenCan: e.target.checked })
                    }
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Tính chuyên cần</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thứ tự hiển thị
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.thuTuHienThi}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      thuTuHienThi: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={resetForm}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                disabled={taoMoiMutation.isPending || capNhatMutation.isPending}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {taoMoiMutation.isPending || capNhatMutation.isPending
                  ? 'Đang xử lý...'
                  : editing
                  ? 'Cập nhật'
                  : 'Thêm mới'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
