import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Settings, Building2, FileText, Save, Loader2, Gift, Plus, Edit2, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { thongTinCongTyApi, ThongTinCongTy, khoanLuongApi, KhoanLuong, CachTinhLuong, bhxhThueApi, CauHinhBHXH } from '../services/api'

// Map cách tính lương sang tiếng Việt
const CACH_TINH_MAP: Record<CachTinhLuong, { label: string; desc: string }> = {
  LUONG_THANG_CO_DINH: { 
    label: 'Cố định theo tháng', 
    desc: 'Nhận đủ số tiền mỗi tháng, không phụ thuộc ngày công' 
  },
  THEO_NGAY_CONG: { 
    label: 'Theo ngày công', 
    desc: 'Tính theo công thức: Số tiền × (Ngày công thực tế / Ngày công lý thuyết)' 
  },
  CHUYEN_CAN_DIEU_KIEN: { 
    label: 'Chuyên cần có điều kiện', 
    desc: 'Nhận đủ nếu nghỉ không phép ≤ 2 ngày, mất hết nếu > 2 ngày' 
  },
}

export default function CaiDatHeThong() {
  const [activeTab, setActiveTab] = useState<'bhxh' | 'congty' | 'phucap'>('phucap')
  const queryClient = useQueryClient()

  // ==================== PHỤ CẤP ====================
  const [showPhuCapModal, setShowPhuCapModal] = useState(false)
  const [editingPhuCap, setEditingPhuCap] = useState<KhoanLuong | null>(null)
  const [filterLoai, setFilterLoai] = useState<'THU_NHAP' | 'KHAU_TRU' | ''>('')
  
  const [phuCapFormData, setPhuCapFormData] = useState({
    maKhoan: '',
    tenKhoan: '',
    loai: 'THU_NHAP' as 'THU_NHAP' | 'KHAU_TRU',
    cachTinh: 'LUONG_THANG_CO_DINH' as CachTinhLuong,
    chiuThue: false,
    moTa: '',
    thuTu: 0,
  })

  // Lấy danh sách khoản lương (phụ cấp)
  const { data: khoanLuongs, isLoading: loadingKhoanLuong } = useQuery({
    queryKey: ['khoan-luong'],
    queryFn: () => khoanLuongApi.layTatCa(),
  })

  // Lọc theo loại
  const filteredKhoanLuongs = khoanLuongs?.filter((kl: KhoanLuong) => 
    filterLoai === '' || kl.loai === filterLoai
  ) || []

  // Mutation tạo mới
  const taoMoiPhuCapMutation = useMutation({
    mutationFn: khoanLuongApi.taoMoi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['khoan-luong'] })
      toast.success('Tạo phụ cấp thành công!')
      resetPhuCapForm()
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  // Mutation cập nhật
  const capNhatPhuCapMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<KhoanLuong> }) =>
      khoanLuongApi.capNhat(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['khoan-luong'] })
      toast.success('Cập nhật phụ cấp thành công!')
      resetPhuCapForm()
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  // Mutation xóa
  const xoaPhuCapMutation = useMutation({
    mutationFn: khoanLuongApi.xoa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['khoan-luong'] })
      toast.success('Xóa phụ cấp thành công!')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const resetPhuCapForm = () => {
    setShowPhuCapModal(false)
    setEditingPhuCap(null)
    setPhuCapFormData({
      maKhoan: '',
      tenKhoan: '',
      loai: 'THU_NHAP',
      cachTinh: 'LUONG_THANG_CO_DINH',
      chiuThue: false,
      moTa: '',
      thuTu: 0,
    })
  }

  const handleEditPhuCap = (kl: KhoanLuong) => {
    setEditingPhuCap(kl)
    setPhuCapFormData({
      maKhoan: kl.maKhoan,
      tenKhoan: kl.tenKhoan,
      loai: kl.loai,
      cachTinh: kl.cachTinh || 'LUONG_THANG_CO_DINH',
      chiuThue: kl.chiuThue,
      moTa: kl.moTa || '',
      thuTu: kl.thuTu,
    })
    setShowPhuCapModal(true)
  }

  const handleSubmitPhuCap = () => {
    if (!phuCapFormData.maKhoan || !phuCapFormData.tenKhoan) {
      toast.error('Vui lòng điền mã và tên phụ cấp')
      return
    }

    if (editingPhuCap) {
      capNhatPhuCapMutation.mutate({ id: editingPhuCap.id, data: phuCapFormData })
    } else {
      taoMoiPhuCapMutation.mutate(phuCapFormData)
    }
  }

  const handleDeletePhuCap = (kl: KhoanLuong) => {
    if (confirm(`Bạn có chắc muốn xóa phụ cấp "${kl.tenKhoan}"?`)) {
      xoaPhuCapMutation.mutate(kl.id)
    }
  }

  // ==================== BHXH ====================
  // Form data cho BHXH
  const [bhxhData, setBhxhData] = useState<CauHinhBHXH>({
    nam: new Date().getFullYear(),
    tyLeBHXH_NV: 8.0,
    tyLeBHYT_NV: 1.5,
    tyLeBHTN_NV: 1.0,
    tyLeBHXH_DN: 17.5,
    tyLeBHYT_DN: 3.0,
    tyLeBHTN_DN: 1.0,
    luongCoSo: 1800000,
    luongCoBanToiThieu: 4960000,
    tranDongBHXH: 0,
  })

  // Lấy thông tin công ty
  const { data: thongTinCongTy, isLoading: loadingCongTy } = useQuery({
    queryKey: ['thong-tin-cong-ty'],
    queryFn: thongTinCongTyApi.lay,
  })

  const { data: cauHinhBHXH, isLoading: loadingBHXH } = useQuery({
    queryKey: ['cau-hinh-bhxh', bhxhData.nam],
    queryFn: () => bhxhThueApi.layCauHinhBHXH(bhxhData.nam),
    retry: false,
  })

  // Form data cho thông tin công ty
  const [congTyData, setCongTyData] = useState<Partial<ThongTinCongTy>>({
    tenCongTy: '',
    maSoThue: '',
    diaChi: '',
    dienThoai: '',
    email: '',
    website: '',
    nguoiDaiDien: '',
    chucVuDaiDien: '',
  })

  // Update form khi data load xong
  useEffect(() => {
    if (thongTinCongTy) {
      setCongTyData(thongTinCongTy)
    }
  }, [thongTinCongTy])

  useEffect(() => {
    if (cauHinhBHXH) {
      setBhxhData((prev) => ({
        ...prev,
        ...cauHinhBHXH,
        nam: prev.nam,
      }))
    }
  }, [cauHinhBHXH])

  // Mutation cập nhật thông tin công ty
  const capNhatCongTyMutation = useMutation({
    mutationFn: thongTinCongTyApi.capNhat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['thong-tin-cong-ty'] })
      toast.success('Cập nhật thông tin công ty thành công!')
    },
    onError: () => {
      toast.error('Có lỗi khi cập nhật thông tin công ty')
    },
  })

  const capNhatBHXHMutation = useMutation({
    mutationFn: bhxhThueApi.luuCauHinhBHXH,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cau-hinh-bhxh', bhxhData.nam] })
      toast.success('Lưu cấu hình BHXH/Thuế thành công!')
    },
    onError: () => {
      toast.error('Có lỗi khi lưu cấu hình BHXH/Thuế')
    },
  })

  const handleSaveBHXH = async (e: React.FormEvent) => {
    e.preventDefault()
    await capNhatBHXHMutation.mutateAsync(bhxhData)
  }

  const handleSaveCongTy = async (e: React.FormEvent) => {
    e.preventDefault()
    await capNhatCongTyMutation.mutateAsync(congTyData)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Settings className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cài đặt hệ thống</h1>
          <p className="text-gray-600">Quản lý cấu hình BHXH, thuế và thông tin công ty</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="border-b">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('phucap')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'phucap'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                Phụ cấp & Khoản lương
              </div>
            </button>
            <button
              onClick={() => setActiveTab('bhxh')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'bhxh'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                BHXH / Thuế
              </div>
            </button>
            <button
              onClick={() => setActiveTab('congty')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'congty'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Thông tin công ty
              </div>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* ==================== TAB PHỤ CẤP ==================== */}
          {activeTab === 'phucap' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Danh sách Phụ cấp & Khoản lương</h3>
                  <p className="text-sm text-gray-500">Cấu hình các khoản phụ cấp, thu nhập, khấu trừ áp dụng cho nhân viên</p>
                </div>
                <button
                  onClick={() => setShowPhuCapModal(true)}
                  className="btn btn-primary"
                >
                  <Plus size={18} />
                  Thêm mới
                </button>
              </div>

              {/* Filter */}
              <div className="flex gap-4 items-center">
                <select
                  value={filterLoai}
                  onChange={(e) => setFilterLoai(e.target.value as 'THU_NHAP' | 'KHAU_TRU' | '')}
                  className="border rounded-lg px-3 py-2"
                >
                  <option value="">Tất cả loại</option>
                  <option value="THU_NHAP">Thu nhập</option>
                  <option value="KHAU_TRU">Khấu trừ</option>
                </select>
                <span className="text-sm text-gray-500">
                  Tổng: {filteredKhoanLuongs.length} khoản
                </span>
              </div>

              {/* Table */}
              {loadingKhoanLuong ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
                </div>
              ) : (
                <div className="overflow-x-auto border rounded-lg">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Mã</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Tên khoản</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Loại</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Cách tính</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Chịu thuế</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Thứ tự</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredKhoanLuongs.map((kl: KhoanLuong) => (
                        <tr key={kl.id} className="border-t hover:bg-gray-50">
                          <td className="py-3 px-4 font-mono text-sm">{kl.maKhoan}</td>
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium">{kl.tenKhoan}</div>
                              {kl.moTa && <div className="text-xs text-gray-500">{kl.moTa}</div>}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              kl.loai === 'THU_NHAP' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {kl.loai === 'THU_NHAP' ? 'Thu nhập' : 'Khấu trừ'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm">
                              {CACH_TINH_MAP[kl.cachTinh]?.label || kl.cachTinh}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            {kl.chiuThue ? (
                              <span className="text-green-600">✓</span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-500">{kl.thuTu}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEditPhuCap(kl)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                title="Sửa"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeletePhuCap(kl)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                title="Xóa"
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
              )}

              {/* Info box */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Hướng dẫn cách tính lương</h4>
                <div className="space-y-2 text-sm text-blue-800">
                  {Object.entries(CACH_TINH_MAP).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                      <span className="font-medium min-w-[180px]">{value.label}:</span>
                      <span>{value.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB BHXH ==================== */}
          {activeTab === 'bhxh' && (
            <form onSubmit={handleSaveBHXH} className="space-y-6 max-w-3xl">
              {loadingBHXH && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold mb-4">Cấu hình BHXH/BHYT/BHTN</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block mb-1">
                      <span className="text-sm font-semibold text-gray-700">Năm áp dụng</span>
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      value={bhxhData.nam}
                      onChange={(e) => setBhxhData({ ...bhxhData, nam: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="block mb-1">
                      <span className="text-sm font-semibold text-gray-700">Trần đóng BHXH (VNĐ)</span>
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      value={bhxhData.tranDongBHXH}
                      onChange={(e) => setBhxhData({ ...bhxhData, tranDongBHXH: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-900 mb-3">Tỷ lệ đóng Nhân viên (%)</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-1">
                        <span className="text-sm text-gray-700">BHXH</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                        value={bhxhData.tyLeBHXH_NV}
                        onChange={(e) => setBhxhData({ ...bhxhData, tyLeBHXH_NV: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block mb-1">
                        <span className="text-sm text-gray-700">BHYT</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                        value={bhxhData.tyLeBHYT_NV}
                        onChange={(e) => setBhxhData({ ...bhxhData, tyLeBHYT_NV: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block mb-1">
                        <span className="text-sm text-gray-700">BHTN</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                        value={bhxhData.tyLeBHTN_NV}
                        onChange={(e) => setBhxhData({ ...bhxhData, tyLeBHTN_NV: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-green-900 mb-3">Tỷ lệ đóng Doanh nghiệp (%)</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-1">
                        <span className="text-sm text-gray-700">BHXH</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                        value={bhxhData.tyLeBHXH_DN}
                        onChange={(e) => setBhxhData({ ...bhxhData, tyLeBHXH_DN: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block mb-1">
                        <span className="text-sm text-gray-700">BHYT</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                        value={bhxhData.tyLeBHYT_DN}
                        onChange={(e) => setBhxhData({ ...bhxhData, tyLeBHYT_DN: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block mb-1">
                        <span className="text-sm text-gray-700">BHTN</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                        value={bhxhData.tyLeBHTN_DN}
                        onChange={(e) => setBhxhData({ ...bhxhData, tyLeBHTN_DN: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1">
                      <span className="text-sm font-semibold text-gray-700">Mức lương cơ sở (VNĐ)</span>
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      value={bhxhData.luongCoSo}
                      onChange={(e) => setBhxhData({ ...bhxhData, luongCoSo: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="block mb-1">
                      <span className="text-sm font-semibold text-gray-700">Mức lương tối thiểu vùng (VNĐ)</span>
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      value={bhxhData.luongCoBanToiThieu}
                      onChange={(e) => setBhxhData({ ...bhxhData, luongCoBanToiThieu: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm text-yellow-800">
                  <strong>Lưu ý:</strong> Các tỷ lệ này sẽ được áp dụng cho tất cả nhân viên khi tính lương.
                  Vui lòng kiểm tra kỹ trước khi lưu.
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button type="submit" className="btn btn-primary">
                  <Save className="w-4 h-4" />
                  Lưu cấu hình
                </button>
              </div>
            </form>
          )}

          {activeTab === 'congty' && (
            <form onSubmit={handleSaveCongTy} className="space-y-6 max-w-3xl">
              {loadingCongTy ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Thông tin công ty</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block mb-1">
                          <span className="text-sm font-semibold text-gray-700">Tên công ty *</span>
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                          value={congTyData.tenCongTy || ''}
                          onChange={(e) => setCongTyData({ ...congTyData, tenCongTy: e.target.value })}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1">
                            <span className="text-sm text-gray-700">Mã số thuế</span>
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                            value={congTyData.maSoThue || ''}
                            onChange={(e) => setCongTyData({ ...congTyData, maSoThue: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block mb-1">
                            <span className="text-sm text-gray-700">Điện thoại</span>
                          </label>
                          <input
                            type="tel"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                            value={congTyData.dienThoai || ''}
                            onChange={(e) => setCongTyData({ ...congTyData, dienThoai: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block mb-1">
                          <span className="text-sm text-gray-700">Địa chỉ</span>
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                          rows={2}
                          value={congTyData.diaChi || ''}
                          onChange={(e) => setCongTyData({ ...congTyData, diaChi: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1">
                            <span className="text-sm text-gray-700">Email</span>
                          </label>
                          <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                            value={congTyData.email || ''}
                            onChange={(e) => setCongTyData({ ...congTyData, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block mb-1">
                            <span className="text-sm text-gray-700">Website</span>
                          </label>
                          <input
                            type="url"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                            value={congTyData.website || ''}
                            onChange={(e) => setCongTyData({ ...congTyData, website: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1">
                            <span className="text-sm text-gray-700">Người đại diện</span>
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                            value={congTyData.nguoiDaiDien || ''}
                            onChange={(e) => setCongTyData({ ...congTyData, nguoiDaiDien: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block mb-1">
                            <span className="text-sm text-gray-700">Chức vụ người đại diện</span>
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                            value={congTyData.chucVuDaiDien || ''}
                            onChange={(e) => setCongTyData({ ...congTyData, chucVuDaiDien: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block mb-1">
                          <span className="text-sm text-gray-700">Logo (URL)</span>
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                          value={congTyData.logo || ''}
                          onChange={(e) => setCongTyData({ ...congTyData, logo: e.target.value })}
                          placeholder="https://example.com/logo.png"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          Nhập URL của logo công ty (hiển thị trên phiếu lương)
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm text-blue-800 mt-4">
                      <strong>Lưu ý:</strong> Thông tin này sẽ được hiển thị trên các phiếu lương khi xuất.
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={capNhatCongTyMutation.isPending}
                    >
                      {capNhatCongTyMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Đang lưu...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Lưu thông tin
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Modal Thêm/Sửa Phụ cấp */}
      {showPhuCapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingPhuCap ? 'Sửa khoản phụ cấp' : 'Thêm khoản phụ cấp mới'}
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Mã khoản *</label>
                  <input
                    type="text"
                    value={phuCapFormData.maKhoan}
                    onChange={(e) => setPhuCapFormData({ ...phuCapFormData, maKhoan: e.target.value.toUpperCase() })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="VD: PHU_CAP_AN_TRUA"
                    disabled={!!editingPhuCap}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Thứ tự hiển thị</label>
                  <input
                    type="number"
                    value={phuCapFormData.thuTu}
                    onChange={(e) => setPhuCapFormData({ ...phuCapFormData, thuTu: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tên khoản *</label>
                <input
                  type="text"
                  value={phuCapFormData.tenKhoan}
                  onChange={(e) => setPhuCapFormData({ ...phuCapFormData, tenKhoan: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="VD: Phụ cấp ăn trưa"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Loại khoản</label>
                  <select
                    value={phuCapFormData.loai}
                    onChange={(e) => setPhuCapFormData({ ...phuCapFormData, loai: e.target.value as 'THU_NHAP' | 'KHAU_TRU' })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="THU_NHAP">Thu nhập (cộng vào lương)</option>
                    <option value="KHAU_TRU">Khấu trừ (trừ khỏi lương)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Chịu thuế TNCN</label>
                  <select
                    value={phuCapFormData.chiuThue ? 'true' : 'false'}
                    onChange={(e) => setPhuCapFormData({ ...phuCapFormData, chiuThue: e.target.value === 'true' })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="false">Không chịu thuế</option>
                    <option value="true">Có chịu thuế</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Cách tính lương</label>
                <select
                  value={phuCapFormData.cachTinh}
                  onChange={(e) => setPhuCapFormData({ ...phuCapFormData, cachTinh: e.target.value as CachTinhLuong })}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  {Object.entries(CACH_TINH_MAP).map(([key, value]) => (
                    <option key={key} value={key}>{value.label}</option>
                  ))}
                </select>
                <div className="text-xs text-gray-500 mt-1">
                  {CACH_TINH_MAP[phuCapFormData.cachTinh]?.desc}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Mô tả</label>
                <textarea
                  value={phuCapFormData.moTa}
                  onChange={(e) => setPhuCapFormData({ ...phuCapFormData, moTa: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={2}
                  placeholder="Ghi chú về khoản phụ cấp này..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={resetPhuCapForm} className="btn btn-secondary">
                Hủy
              </button>
              <button
                onClick={handleSubmitPhuCap}
                disabled={taoMoiPhuCapMutation.isPending || capNhatPhuCapMutation.isPending}
                className="btn btn-primary"
              >
                {taoMoiPhuCapMutation.isPending || capNhatPhuCapMutation.isPending ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
