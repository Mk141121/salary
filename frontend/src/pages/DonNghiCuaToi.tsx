// Đơn nghỉ của tôi - Nhân viên tạo và quản lý đơn nghỉ phép
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Calendar, Plus, Send, Edit2, X, Eye, FileText } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  nghiPhepApi,
  DonNghiPhep,
  TaoDonNghiPhepDto,
  TrangThaiDonNghiPhep,
  getTrangThaiLabel,
  getTrangThaiColor,
} from '../services/nghiPhepApi'
import { nhanVienApi, NhanVien } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import { VietnameseDatePicker } from '../components/VietnameseDatePicker'

export default function DonNghiCuaToi() {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<DonNghiPhep | null>(null)
  const [viewDetail, setViewDetail] = useState<DonNghiPhep | null>(null)
  const [filterTrangThai, setFilterTrangThai] = useState<TrangThaiDonNghiPhep | ''>('')

  // Tìm nhân viên của user hiện tại
  const [currentNhanVien, setCurrentNhanVien] = useState<NhanVien | null>(null)

  const [formData, setFormData] = useState<{
    nhanVienId: number
    loaiNghiId: number
    tuNgay: string
    denNgay: string
    lyDo: string
  }>({
    nhanVienId: 0,
    loaiNghiId: 0,
    tuNgay: '',
    denNgay: '',
    lyDo: '',
  })

  // Lấy danh sách loại nghỉ
  const { data: loaiNghis } = useQuery({
    queryKey: ['loai-nghi'],
    queryFn: () => nghiPhepApi.layDanhSachLoaiNghi(),
  })

  // Lấy danh sách nhân viên (để admin tạo đơn cho NV khác)
  const { data: nhanViens } = useQuery({
    queryKey: ['nhan-vien-don-gian'],
    queryFn: () => nhanVienApi.layTatCa(),
  })

  // Tìm nhân viên hiện tại từ user
  useEffect(() => {
    if (nhanViens && user) {
      // Xử lý cả trường hợp paginated và array
      const nhanVienList = Array.isArray(nhanViens) 
        ? nhanViens 
        : (nhanViens as any).data || []
      // Tìm theo email hoặc nhanVienId nếu có
      const nv = nhanVienList.find(
        (n: NhanVien) => n.email === user.email || n.id === (user as any).nhanVienId
      )
      if (nv) {
        setCurrentNhanVien(nv)
        setFormData((prev) => ({ ...prev, nhanVienId: nv.id }))
      }
    }
  }, [nhanViens, user])

  // Lấy danh sách đơn nghỉ
  const { data: danhSachDon, isLoading } = useQuery({
    queryKey: ['don-nghi-phep', filterTrangThai, currentNhanVien?.id],
    queryFn: () =>
      nghiPhepApi.layDanhSachDon({
        nhanVienId: currentNhanVien?.id,
        trangThai: filterTrangThai || undefined,
        limit: 50,
      }),
    enabled: !!currentNhanVien,
  })

  const taoDonMutation = useMutation({
    mutationFn: nghiPhepApi.taoDon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['don-nghi-phep'] })
      toast.success('Tạo đơn nghỉ phép thành công!')
      resetForm()
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const capNhatMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<TaoDonNghiPhepDto> }) =>
      nghiPhepApi.capNhatDon(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['don-nghi-phep'] })
      toast.success('Cập nhật đơn thành công!')
      resetForm()
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const guiDuyetMutation = useMutation({
    mutationFn: nghiPhepApi.guiDuyet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['don-nghi-phep'] })
      toast.success('Đã gửi đơn để duyệt!')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const huyDonMutation = useMutation({
    mutationFn: (id: number) => nghiPhepApi.huyDon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['don-nghi-phep'] })
      toast.success('Đã hủy đơn!')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const resetForm = () => {
    setShowModal(false)
    setEditing(null)
    setFormData({
      nhanVienId: currentNhanVien?.id || 0,
      loaiNghiId: 0,
      tuNgay: '',
      denNgay: '',
      lyDo: '',
    })
  }

  const handleEdit = (don: DonNghiPhep) => {
    setEditing(don)
    setFormData({
      nhanVienId: don.nhanVien.id,
      loaiNghiId: don.loaiNghi.id,
      tuNgay: don.tuNgay.split('T')[0],
      denNgay: don.denNgay.split('T')[0],
      lyDo: don.lyDo || '',
    })
    setShowModal(true)
  }

  const handleSubmit = () => {
    if (!formData.loaiNghiId || !formData.tuNgay || !formData.denNgay) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc')
      return
    }

    if (new Date(formData.tuNgay) > new Date(formData.denNgay)) {
      toast.error('Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc')
      return
    }

    if (editing) {
      capNhatMutation.mutate({
        id: editing.id,
        data: {
          loaiNghiId: formData.loaiNghiId,
          tuNgay: formData.tuNgay,
          denNgay: formData.denNgay,
          lyDo: formData.lyDo,
        },
      })
    } else {
      taoDonMutation.mutate(formData as TaoDonNghiPhepDto)
    }
  }

  // Tính số ngày nghỉ preview
  const calculateDays = () => {
    if (!formData.tuNgay || !formData.denNgay) return 0
    const start = new Date(formData.tuNgay)
    const end = new Date(formData.denNgay)
    let count = 0
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++
    }
    return count
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN')
  }

  if (!currentNhanVien) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Đang tải thông tin nhân viên...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Đơn nghỉ của tôi</h1>
            <p className="text-gray-500">
              {currentNhanVien.hoTen} - {currentNhanVien.maNhanVien}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          Tạo đơn nghỉ
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex gap-4 items-center">
          <label className="text-sm font-medium text-gray-700">Lọc theo trạng thái:</label>
          <select
            value={filterTrangThai}
            onChange={(e) => setFilterTrangThai(e.target.value as TrangThaiDonNghiPhep | '')}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Tất cả</option>
            <option value="NHAP">Nháp</option>
            <option value="GUI_DUYET">Chờ duyệt</option>
            <option value="DA_DUYET">Đã duyệt</option>
            <option value="TU_CHOI">Từ chối</option>
            <option value="HUY">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Danh sách đơn */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Mã đơn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Loại nghỉ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Từ ngày
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Đến ngày
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Số ngày
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  Đang tải...
                </td>
              </tr>
            ) : danhSachDon?.items?.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  Chưa có đơn nghỉ nào
                </td>
              </tr>
            ) : (
              danhSachDon?.items?.map((don) => (
                <tr key={don.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">
                    {don.maDon}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {don.loaiNghi.tenLoaiNghi}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(don.tuNgay)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(don.denNgay)}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {don.soNgayNghi}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full bg-${getTrangThaiColor(
                        don.trangThai
                      )}-100 text-${getTrangThaiColor(don.trangThai)}-800`}
                    >
                      {getTrangThaiLabel(don.trangThai)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setViewDetail(don)}
                      className="text-gray-600 hover:text-gray-900 mr-2"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {(don.trangThai === 'NHAP' || don.trangThai === 'TU_CHOI') && (
                      <>
                        <button
                          onClick={() => handleEdit(don)}
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                          title="Sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => guiDuyetMutation.mutate(don.id)}
                          className="text-blue-600 hover:text-blue-900 mr-2"
                          title="Gửi duyệt"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {don.trangThai !== 'HUY' && don.trangThai !== 'DA_DUYET' && (
                      <button
                        onClick={() => {
                          if (confirm('Bạn có chắc muốn hủy đơn này?')) {
                            huyDonMutation.mutate(don.id)
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                        title="Hủy đơn"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal tạo/sửa đơn */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {editing ? 'Sửa đơn nghỉ phép' : 'Tạo đơn nghỉ phép mới'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loại nghỉ <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.loaiNghiId}
                  onChange={(e) =>
                    setFormData({ ...formData, loaiNghiId: parseInt(e.target.value) })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value={0}>-- Chọn loại nghỉ --</option>
                  {loaiNghis?.map((ln) => (
                    <option key={ln.id} value={ln.id}>
                      {ln.tenLoaiNghi} ({ln.coTinhLuong ? 'Có lương' : 'Không lương'})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Từ ngày <span className="text-red-500">*</span>
                  </label>
                  <VietnameseDatePicker
                    value={formData.tuNgay}
                    onChange={(val) =>
                      setFormData({ ...formData, tuNgay: val })
                    }
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Đến ngày <span className="text-red-500">*</span>
                  </label>
                  <VietnameseDatePicker
                    value={formData.denNgay}
                    onChange={(val) =>
                      setFormData({ ...formData, denNgay: val })
                    }
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              {formData.tuNgay && formData.denNgay && (
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <span className="text-blue-700 font-medium">
                    Số ngày nghỉ (không tính T7, CN): {calculateDays()} ngày
                  </span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lý do nghỉ
                </label>
                <textarea
                  value={formData.lyDo}
                  onChange={(e) =>
                    setFormData({ ...formData, lyDo: e.target.value })
                  }
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Nhập lý do nghỉ (tùy chọn)"
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
                disabled={taoDonMutation.isPending || capNhatMutation.isPending}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {taoDonMutation.isPending || capNhatMutation.isPending
                  ? 'Đang xử lý...'
                  : editing
                  ? 'Cập nhật'
                  : 'Tạo đơn'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal xem chi tiết */}
      {viewDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Chi tiết đơn nghỉ</h2>
              <button
                onClick={() => setViewDetail(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Mã đơn</span>
                  <p className="font-mono font-medium">{viewDetail.maDon}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Trạng thái</span>
                  <p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full bg-${getTrangThaiColor(
                        viewDetail.trangThai
                      )}-100 text-${getTrangThaiColor(viewDetail.trangThai)}-800`}
                    >
                      {getTrangThaiLabel(viewDetail.trangThai)}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-500">Loại nghỉ</span>
                <p className="font-medium">{viewDetail.loaiNghi.tenLoaiNghi}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Từ ngày</span>
                  <p className="font-medium">{formatDate(viewDetail.tuNgay)}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Đến ngày</span>
                  <p className="font-medium">{formatDate(viewDetail.denNgay)}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Số ngày</span>
                  <p className="font-medium">{viewDetail.soNgayNghi}</p>
                </div>
              </div>

              {viewDetail.lyDo && (
                <div>
                  <span className="text-sm text-gray-500">Lý do</span>
                  <p className="text-gray-700">{viewDetail.lyDo}</p>
                </div>
              )}

              {viewDetail.nguoiDuyet && (
                <div>
                  <span className="text-sm text-gray-500">Người duyệt</span>
                  <p className="font-medium">{viewDetail.nguoiDuyet.hoTen}</p>
                  {viewDetail.ngayDuyet && (
                    <p className="text-sm text-gray-500">
                      Ngày duyệt: {formatDate(viewDetail.ngayDuyet)}
                    </p>
                  )}
                </div>
              )}

              {viewDetail.lyDoTuChoi && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <span className="text-sm text-red-600 font-medium">Lý do từ chối:</span>
                  <p className="text-red-700">{viewDetail.lyDoTuChoi}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setViewDetail(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
