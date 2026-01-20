// Đơn giá Sản lượng - Cấu hình đơn giá cho tính lương sản lượng
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DollarSign, Plus, Edit2, Trash2, Wand2, Info, AlertCircle, Package, Truck } from 'lucide-react'
import toast from 'react-hot-toast'
import { cauHinhDonGiaApi, CauHinhDonGia } from '../services/api'
import { formatTien } from '../utils'
import Modal from '../components/ui/Modal'

export default function DonGiaSanLuong() {
  const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<CauHinhDonGia | null>(null)
  const [formData, setFormData] = useState({
    maBien: '',
    tenBien: '',
    moTa: '',
    giaTri: 0,
    donVi: 'VND',
  })

  // Lấy danh sách đơn giá
  const { data: danhSachDonGia, isLoading } = useQuery({
    queryKey: ['cau-hinh-don-gia'],
    queryFn: () => cauHinhDonGiaApi.layTatCa(),
  })

  // Mutation tạo đơn giá
  const taoDonGiaMutation = useMutation({
    mutationFn: cauHinhDonGiaApi.taoMoi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cau-hinh-don-gia'] })
      toast.success('Tạo đơn giá thành công!')
      resetForm()
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  // Mutation cập nhật đơn giá
  const capNhatDonGiaMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CauHinhDonGia> }) =>
      cauHinhDonGiaApi.capNhat(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cau-hinh-don-gia'] })
      toast.success('Cập nhật đơn giá thành công!')
      resetForm()
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  // Mutation xóa đơn giá
  const xoaDonGiaMutation = useMutation({
    mutationFn: cauHinhDonGiaApi.xoa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cau-hinh-don-gia'] })
      toast.success('Xóa đơn giá thành công!')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  // Mutation khởi tạo đơn giá mẫu
  const khoiTaoMauMutation = useMutation({
    mutationFn: cauHinhDonGiaApi.khoiTaoMau,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cau-hinh-don-gia'] })
      toast.success(data.message || 'Khởi tạo đơn giá mẫu thành công!')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const resetForm = () => {
    setShowModal(false)
    setEditing(null)
    setFormData({
      maBien: '',
      tenBien: '',
      moTa: '',
      giaTri: 0,
      donVi: 'VND',
    })
  }

  const handleEdit = (dg: CauHinhDonGia) => {
    setEditing(dg)
    setFormData({
      maBien: dg.maBien,
      tenBien: dg.tenBien,
      moTa: dg.moTa || '',
      giaTri: Number(dg.giaTri),
      donVi: dg.donVi || 'VND',
    })
    setShowModal(true)
  }

  const handleSubmit = () => {
    if (!formData.maBien || !formData.tenBien) {
      toast.error('Vui lòng điền mã và tên đơn giá')
      return
    }

    if (editing) {
      capNhatDonGiaMutation.mutate({
        id: editing.id,
        data: {
          tenBien: formData.tenBien,
          moTa: formData.moTa,
          giaTri: formData.giaTri,
          donVi: formData.donVi,
        },
      })
    } else {
      taoDonGiaMutation.mutate(formData)
    }
  }

  const handleDelete = (dg: CauHinhDonGia) => {
    if (confirm(`Bạn có chắc muốn xóa đơn giá "${dg.tenBien}"?`)) {
      xoaDonGiaMutation.mutate(dg.id)
    }
  }

  // Phân loại đơn giá
  const donGiaChiaHang = danhSachDonGia?.filter((dg: CauHinhDonGia) => 
    dg.maBien.includes('SP') || dg.maBien.includes('LOI')
  ) || []
  const donGiaGiaoHang = danhSachDonGia?.filter((dg: CauHinhDonGia) => 
    dg.maBien.includes('KHOI_LUONG') || dg.maBien.includes('TRE') || dg.maBien.includes('PHIEU')
  ) || []
  const donGiaKhac = danhSachDonGia?.filter((dg: CauHinhDonGia) => 
    !donGiaChiaHang.includes(dg) && !donGiaGiaoHang.includes(dg)
  ) || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DollarSign className="w-8 h-8 text-emerald-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Đơn giá Sản lượng</h1>
            <p className="text-gray-600">Cấu hình đơn giá sử dụng trong tính lương sản lượng</p>
          </div>
        </div>
        <div className="flex gap-2">
          {(!danhSachDonGia || danhSachDonGia.length === 0) && (
            <button
              onClick={() => khoiTaoMauMutation.mutate()}
              disabled={khoiTaoMauMutation.isPending}
              className="btn btn-secondary"
            >
              <Wand2 size={18} />
              Khởi tạo mẫu
            </button>
          )}
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            <Plus size={18} />
            Thêm đơn giá
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">Đơn giá được sử dụng trong Quy chế lương</p>
          <ul className="list-disc list-inside space-y-1 text-blue-700">
            <li><code className="bg-blue-100 px-1 rounded">DON_GIA_SP</code> - Đơn giá sản phẩm chia hàng</li>
            <li><code className="bg-blue-100 px-1 rounded">HE_SO_LOI</code> - Hệ số phạt sản phẩm lỗi</li>
            <li><code className="bg-blue-100 px-1 rounded">DON_GIA_KHOI_LUONG</code> - Đơn giá theo kg giao hàng</li>
            <li><code className="bg-blue-100 px-1 rounded">DON_GIA_PHAT_TRE</code> - Phạt trễ giờ giao hàng</li>
          </ul>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      ) : !danhSachDonGia || danhSachDonGia.length === 0 ? (
        <div className="card p-8 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có đơn giá nào</h3>
          <p className="text-gray-500 mb-4">
            Nhấn "Khởi tạo mẫu" để tạo các đơn giá mặc định hoặc thêm thủ công
          </p>
          <button
            onClick={() => khoiTaoMauMutation.mutate()}
            disabled={khoiTaoMauMutation.isPending}
            className="btn btn-primary"
          >
            <Wand2 size={18} />
            Khởi tạo mẫu
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {/* Chia hàng */}
          {donGiaChiaHang.length > 0 && (
            <div className="card">
              <div className="p-4 border-b bg-cyan-50 flex items-center gap-2">
                <Package className="text-cyan-600" size={20} />
                <h3 className="font-semibold text-cyan-800">Đơn giá Chia hàng</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Mã biến</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tên</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Mô tả</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Giá trị</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Đơn vị</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {donGiaChiaHang.map((dg: CauHinhDonGia) => (
                      <tr key={dg.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">{dg.maBien}</code>
                        </td>
                        <td className="px-4 py-3 font-medium">{dg.tenBien}</td>
                        <td className="px-4 py-3 text-gray-500 text-sm">{dg.moTa}</td>
                        <td className="px-4 py-3 text-right font-semibold text-emerald-600">
                          {dg.donVi === 'VND' ? formatTien(Number(dg.giaTri)) : Number(dg.giaTri).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-gray-500">{dg.donVi}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(dg)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(dg)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Giao hàng */}
          {donGiaGiaoHang.length > 0 && (
            <div className="card">
              <div className="p-4 border-b bg-teal-50 flex items-center gap-2">
                <Truck className="text-teal-600" size={20} />
                <h3 className="font-semibold text-teal-800">Đơn giá Giao hàng</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Mã biến</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tên</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Mô tả</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Giá trị</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Đơn vị</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {donGiaGiaoHang.map((dg: CauHinhDonGia) => (
                      <tr key={dg.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">{dg.maBien}</code>
                        </td>
                        <td className="px-4 py-3 font-medium">{dg.tenBien}</td>
                        <td className="px-4 py-3 text-gray-500 text-sm">{dg.moTa}</td>
                        <td className="px-4 py-3 text-right font-semibold text-emerald-600">
                          {dg.donVi === 'VND' ? formatTien(Number(dg.giaTri)) : Number(dg.giaTri).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-gray-500">{dg.donVi}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(dg)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(dg)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Khác */}
          {donGiaKhac.length > 0 && (
            <div className="card">
              <div className="p-4 border-b bg-gray-50 flex items-center gap-2">
                <DollarSign className="text-gray-600" size={20} />
                <h3 className="font-semibold text-gray-800">Đơn giá khác</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Mã biến</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tên</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Mô tả</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Giá trị</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Đơn vị</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {donGiaKhac.map((dg: CauHinhDonGia) => (
                      <tr key={dg.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">{dg.maBien}</code>
                        </td>
                        <td className="px-4 py-3 font-medium">{dg.tenBien}</td>
                        <td className="px-4 py-3 text-gray-500 text-sm">{dg.moTa}</td>
                        <td className="px-4 py-3 text-right font-semibold text-emerald-600">
                          {dg.donVi === 'VND' ? formatTien(Number(dg.giaTri)) : Number(dg.giaTri).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-gray-500">{dg.donVi}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(dg)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(dg)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal thêm/sửa đơn giá */}
      <Modal
        isOpen={showModal}
        onClose={resetForm}
      >
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {editing ? 'Cập nhật đơn giá' : 'Thêm đơn giá mới'}
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mã biến <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.maBien}
              onChange={(e) => setFormData({ ...formData, maBien: e.target.value.toUpperCase() })}
              disabled={!!editing}
              className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
              placeholder="VD: DON_GIA_SP"
            />
            <p className="text-xs text-gray-500 mt-1">
              Mã biến sẽ được sử dụng trong công thức quy chế lương
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên đơn giá <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.tenBien}
              onChange={(e) => setFormData({ ...formData, tenBien: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="VD: Đơn giá sản phẩm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <textarea
              value={formData.moTa}
              onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
              rows={2}
              placeholder="Mô tả chi tiết..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá trị <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.giaTri}
                onChange={(e) => setFormData({ ...formData, giaTri: Number(e.target.value) })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Đơn vị</label>
              <select
                value={formData.donVi}
                onChange={(e) => setFormData({ ...formData, donVi: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="VND">VND</option>
                <option value="HE_SO">Hệ số</option>
                <option value="PHAN_TRAM">%</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button onClick={resetForm} className="btn btn-secondary">
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={taoDonGiaMutation.isPending || capNhatDonGiaMutation.isPending}
              className="btn btn-primary"
            >
              {editing ? 'Cập nhật' : 'Tạo mới'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
