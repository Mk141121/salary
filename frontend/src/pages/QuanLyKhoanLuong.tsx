// Quản lý khoản lương
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DollarSign, Plus, Edit2, Trash2, GripVertical } from 'lucide-react'
import toast from 'react-hot-toast'
import { khoanLuongApi, KhoanLuong } from '../services/api'

export default function QuanLyKhoanLuong() {
  const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(false)
  const [editingKhoan, setEditingKhoan] = useState<KhoanLuong | null>(null)

  const [formData, setFormData] = useState({
    maKhoan: '',
    tenKhoan: '',
    loai: 'THU_NHAP' as 'THU_NHAP' | 'KHAU_TRU',
    chiuThue: false,
    moTa: '',
  })

  const { data: khoanLuongs, isLoading } = useQuery({
    queryKey: ['khoan-luong'],
    queryFn: () => khoanLuongApi.layTatCa(),
  })

  const taoMoiMutation = useMutation({
    mutationFn: khoanLuongApi.taoMoi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['khoan-luong'] })
      toast.success('Tạo khoản lương thành công!')
      resetForm()
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const capNhatMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<KhoanLuong> }) =>
      khoanLuongApi.capNhat(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['khoan-luong'] })
      toast.success('Cập nhật thành công!')
      resetForm()
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const xoaMutation = useMutation({
    mutationFn: khoanLuongApi.xoa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['khoan-luong'] })
      toast.success('Xóa khoản lương thành công!')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const resetForm = () => {
    setShowModal(false)
    setEditingKhoan(null)
    setFormData({
      maKhoan: '',
      tenKhoan: '',
      loai: 'THU_NHAP',
      chiuThue: false,
      moTa: '',
    })
  }

  const handleEdit = (kl: KhoanLuong) => {
    setEditingKhoan(kl)
    setFormData({
      maKhoan: kl.maKhoan,
      tenKhoan: kl.tenKhoan,
      loai: kl.loai,
      chiuThue: kl.chiuThue,
      moTa: kl.moTa || '',
    })
    setShowModal(true)
  }

  const handleSubmit = () => {
    if (!formData.maKhoan || !formData.tenKhoan) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc')
      return
    }

    if (editingKhoan) {
      capNhatMutation.mutate({ id: editingKhoan.id, data: formData })
    } else {
      taoMoiMutation.mutate(formData)
    }
  }

  const handleXoa = (kl: KhoanLuong) => {
    if (confirm(`Bạn có chắc muốn xóa khoản lương "${kl.tenKhoan}"?`)) {
      xoaMutation.mutate(kl.id)
    }
  }

  // Phân loại khoản lương
  const thuNhap = khoanLuongs?.filter((kl: KhoanLuong) => kl.loai === 'THU_NHAP') || []
  const khauTru = khoanLuongs?.filter((kl: KhoanLuong) => kl.loai === 'KHAU_TRU') || []

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <DollarSign size={28} />
          Quản lý Khoản lương
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary"
        >
          <Plus size={20} />
          Thêm khoản lương
        </button>
      </div>

      {isLoading ? (
        <p className="text-center py-8 text-gray-500">Đang tải...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Thu nhập */}
          <div className="card">
            <h2 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Các khoản Thu nhập ({thuNhap.length})
            </h2>
            <div className="space-y-2">
              {thuNhap.map((kl: KhoanLuong) => (
                <div
                  key={kl.id}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical size={16} className="text-gray-400 cursor-grab" />
                    <div>
                      <p className="font-medium">{kl.tenKhoan}</p>
                      <p className="text-xs text-gray-500">
                        {kl.maKhoan}
                        {kl.chiuThue && (
                          <span className="ml-2 px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded">
                            Chịu thuế
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(kl)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleXoa(kl)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {thuNhap.length === 0 && (
                <p className="text-gray-500 text-center py-4">Chưa có khoản thu nhập</p>
              )}
            </div>
          </div>

          {/* Khấu trừ */}
          <div className="card">
            <h2 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              Các khoản Khấu trừ ({khauTru.length})
            </h2>
            <div className="space-y-2">
              {khauTru.map((kl: KhoanLuong) => (
                <div
                  key={kl.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical size={16} className="text-gray-400 cursor-grab" />
                    <div>
                      <p className="font-medium">{kl.tenKhoan}</p>
                      <p className="text-xs text-gray-500">{kl.maKhoan}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(kl)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleXoa(kl)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {khauTru.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Chưa có khoản khấu trừ (BHXH, thuế sẽ thêm ở đây)
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal thêm/sửa */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingKhoan ? 'Sửa khoản lương' : 'Thêm khoản lương mới'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Mã khoản *</label>
                <input
                  type="text"
                  value={formData.maKhoan}
                  onChange={(e) => setFormData({ ...formData, maKhoan: e.target.value.toUpperCase() })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="VD: PHU_CAP_XE"
                  disabled={!!editingKhoan}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tên khoản *</label>
                <input
                  type="text"
                  value={formData.tenKhoan}
                  onChange={(e) => setFormData({ ...formData, tenKhoan: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="VD: Phụ cấp xe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Loại</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="loai"
                      checked={formData.loai === 'THU_NHAP'}
                      onChange={() => setFormData({ ...formData, loai: 'THU_NHAP' })}
                    />
                    <span className="text-green-700">Thu nhập (+)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="loai"
                      checked={formData.loai === 'KHAU_TRU'}
                      onChange={() => setFormData({ ...formData, loai: 'KHAU_TRU' })}
                    />
                    <span className="text-red-700">Khấu trừ (-)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.chiuThue}
                    onChange={(e) => setFormData({ ...formData, chiuThue: e.target.checked })}
                  />
                  <span className="text-sm">Khoản này chịu thuế TNCN</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Mô tả</label>
                <textarea
                  value={formData.moTa}
                  onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={2}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={resetForm} className="btn btn-secondary">
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                disabled={taoMoiMutation.isPending || capNhatMutation.isPending}
                className="btn btn-primary"
              >
                {taoMoiMutation.isPending || capNhatMutation.isPending ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
