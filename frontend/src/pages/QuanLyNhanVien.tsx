// Quản lý nhân viên
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Users, Plus, Edit2, Trash2, Search, RotateCcw } from 'lucide-react'
import toast from 'react-hot-toast'
import { nhanVienApi, phongBanApi, NhanVien, TrangThaiNhanVien } from '../services/api'
import { VietnameseDatePicker } from '../components/VietnameseDatePicker'

// Map trạng thái sang tiếng Việt
const TRANG_THAI_MAP: Record<TrangThaiNhanVien, { label: string; color: string }> = {
  DANG_LAM: { label: 'Đang làm', color: 'bg-green-100 text-green-700' },
  NGHI_VIEC: { label: 'Đã nghỉ', color: 'bg-red-100 text-red-700' },
  TAM_NGHI: { label: 'Tạm nghỉ', color: 'bg-yellow-100 text-yellow-700' },
}

export default function QuanLyNhanVien() {
  const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(false)
  const [filterPhongBan, setFilterPhongBan] = useState<number | undefined>()
  const [filterTrangThai, setFilterTrangThai] = useState<TrangThaiNhanVien | ''>('')
  const [tuKhoa, setTuKhoa] = useState('')

  const [formData, setFormData] = useState({
    maNhanVien: '',
    hoTen: '',
    email: '',
    soDienThoai: '',
    phongBanId: 0,
    chucVu: '',
    ngayVaoLam: '',
    gioiTinh: '' as 'NAM' | 'NU' | 'KHAC' | '',
    ngaySinh: '',
    diaChi: '',
    trangThai: 'DANG_LAM' as TrangThaiNhanVien,
  })

  const { data: nhanViensData, isLoading } = useQuery({
    queryKey: ['nhan-vien', filterPhongBan, filterTrangThai, tuKhoa],
    queryFn: () => nhanVienApi.layTatCa({ 
      phongBanId: filterPhongBan, 
      tuKhoa,
      trangThai: filterTrangThai || undefined,
    }),
  })

  // Handle paginated response format { data: [], meta: {} }
  const nhanViens = Array.isArray(nhanViensData) ? nhanViensData : nhanViensData?.data || []

  const { data: phongBans } = useQuery({
    queryKey: ['phong-ban'],
    queryFn: phongBanApi.layTatCa,
  })

  const taoMoiMutation = useMutation({
    mutationFn: nhanVienApi.taoMoi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nhan-vien'] })
      toast.success('Tạo nhân viên thành công!')
      resetForm()
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const capNhatMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<NhanVien> }) =>
      nhanVienApi.capNhat(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nhan-vien'] })
      toast.success('Cập nhật thành công!')
      resetForm()
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const xoaMutation = useMutation({
    mutationFn: nhanVienApi.xoa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nhan-vien'] })
      toast.success('Xóa nhân viên thành công!')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const resetForm = () => {
    setShowModal(false)
    setFormData({
      maNhanVien: '',
      hoTen: '',
      email: '',
      soDienThoai: '',
      phongBanId: 0,
      chucVu: '',
      ngayVaoLam: '',
      gioiTinh: '' as 'NAM' | 'NU' | 'KHAC' | '',
      ngaySinh: '',
      diaChi: '',
      trangThai: 'DANG_LAM',
    })
  }

  // Lấy mã NV tự động khi mở modal thêm mới
  const handleOpenModal = async () => {
    try {
      const { maNhanVien } = await nhanVienApi.layMaTuDong()
      setFormData(prev => ({ ...prev, maNhanVien }))
      setShowModal(true)
    } catch {
      setShowModal(true)
    }
  }

  // Khôi phục nhân viên đã nghỉ
  const handleKhoiPhuc = (nv: NhanVien) => {
    if (confirm(`Khôi phục nhân viên "${nv.hoTen}" về trạng thái Đang làm?`)) {
      capNhatMutation.mutate({ id: nv.id, data: { trangThai: 'DANG_LAM' } })
    }
  }

  const handleSubmit = () => {
    if (!formData.maNhanVien || !formData.hoTen || !formData.phongBanId) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc')
      return
    }

    taoMoiMutation.mutate(formData)
  }

  const handleXoa = (nv: NhanVien) => {
    if (confirm(`Bạn có chắc muốn xóa nhân viên "${nv.hoTen}"?`)) {
      xoaMutation.mutate(nv.id)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users size={28} />
          Quản lý Nhân viên
        </h1>
        <button
          onClick={handleOpenModal}
          className="btn btn-primary"
        >
          <Plus size={20} />
          Thêm nhân viên
        </button>
      </div>

      {/* Bộ lọc */}
      <div className="card mb-6">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={tuKhoa}
                onChange={(e) => setTuKhoa(e.target.value)}
                placeholder="Tìm kiếm theo tên, mã NV, email..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div>
            <select
              value={filterPhongBan || ''}
              onChange={(e) => setFilterPhongBan(e.target.value ? Number(e.target.value) : undefined)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="">Tất cả phòng ban</option>
              {phongBans?.map((pb: { id: number; tenPhongBan: string }) => (
                <option key={pb.id} value={pb.id}>{pb.tenPhongBan}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filterTrangThai}
              onChange={(e) => setFilterTrangThai(e.target.value as TrangThaiNhanVien | '')}
              className="border rounded-lg px-3 py-2"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="DANG_LAM">Đang làm</option>
              <option value="NGHI_VIEC">Đã nghỉ</option>
              <option value="TAM_NGHI">Tạm nghỉ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danh sách */}
      <div className="card">
        {isLoading ? (
          <p className="text-center py-8 text-gray-500">Đang tải...</p>
        ) : nhanViens && nhanViens.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Mã NV</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Họ tên</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Phòng ban</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Chức vụ</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Ngày vào làm</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Trạng thái</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {nhanViens.map((nv: NhanVien) => (
                  <tr key={nv.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{nv.maNhanVien}</td>
                    <td className="py-3 px-4">{nv.hoTen}</td>
                    <td className="py-3 px-4">{nv.phongBan?.tenPhongBan}</td>
                    <td className="py-3 px-4">{nv.chucVu || '-'}</td>
                    <td className="py-3 px-4">{nv.email || '-'}</td>
                    <td className="py-3 px-4 text-center">{(nv as any).ngayVaoLam ? new Date((nv as any).ngayVaoLam).toLocaleDateString('vi-VN') : '-'}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${TRANG_THAI_MAP[nv.trangThai]?.color || 'bg-gray-100'}`}>
                        {TRANG_THAI_MAP[nv.trangThai]?.label || nv.trangThai}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/nhan-vien/${nv.id}`}
                          className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 rounded flex items-center gap-1 font-medium"
                          title="Xem & chỉnh sửa thông tin nhân viên"
                        >
                          <Edit2 size={14} />
                          Chi tiết
                        </Link>
                        {nv.trangThai === 'NGHI_VIEC' ? (
                          <button
                            onClick={() => handleKhoiPhuc(nv)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                            title="Khôi phục"
                          >
                            <RotateCcw size={18} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleXoa(nv)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Cho nghỉ việc"
                          >
                            <Trash2 size={18} />
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
            Chưa có nhân viên nào
          </p>
        )}
      </div>

      {/* Modal thêm mới */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              Thêm nhân viên mới
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Mã nhân viên *</label>
                  <input
                    type="text"
                    value={formData.maNhanVien}
                    onChange={(e) => setFormData({ ...formData, maNhanVien: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Họ tên *</label>
                  <input
                    type="text"
                    value={formData.hoTen}
                    onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Phòng ban *</label>
                  <select
                    value={formData.phongBanId}
                    onChange={(e) => setFormData({ ...formData, phongBanId: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value={0}>-- Chọn phòng ban --</option>
                    {phongBans?.map((pb: { id: number; tenPhongBan: string }) => (
                      <option key={pb.id} value={pb.id}>{pb.tenPhongBan}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Chức vụ</label>
                  <input
                    type="text"
                    value={formData.chucVu}
                    onChange={(e) => setFormData({ ...formData, chucVu: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Giới tính</label>
                  <select
                    value={formData.gioiTinh}
                    onChange={(e) => setFormData({ ...formData, gioiTinh: e.target.value as any })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">-- Chọn --</option>
                    <option value="NAM">Nam</option>
                    <option value="NU">Nữ</option>
                    <option value="KHAC">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ngày sinh</label>
                  <VietnameseDatePicker
                    value={formData.ngaySinh}
                    onChange={(val) => setFormData({ ...formData, ngaySinh: val })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                  <input
                    type="text"
                    value={formData.soDienThoai}
                    onChange={(e) => setFormData({ ...formData, soDienThoai: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Địa chỉ</label>
                <input
                  type="text"
                  value={formData.diaChi}
                  onChange={(e) => setFormData({ ...formData, diaChi: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Nhập địa chỉ..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ngày vào làm</label>
                <VietnameseDatePicker
                  value={formData.ngayVaoLam}
                  onChange={(val) => setFormData({ ...formData, ngayVaoLam: val })}
                  className="w-full border rounded-lg px-3 py-2"
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
