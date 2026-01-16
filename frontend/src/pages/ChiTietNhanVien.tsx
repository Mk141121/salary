// Chi tiết hồ sơ Nhân viên với tab Phụ cấp
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ArrowLeft,
  User,
  Wallet,
  Plus,
  Calendar,
  TrendingUp,
  Pause,
  Play,
  History,
  AlertCircle,
  FileText,
  Building2,
  Users,
  Pencil,
  X,
  Save,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { nhanVienApi, phongBanApi, phuCapNhanVienApi, khoanLuongApi, PhuCapNhanVien, KhoanLuong } from '../services/api'
import { formatTien, formatNgay } from '../utils'
import TabHopDong from '../components/TabHopDong'
import TabNganHang from '../components/TabNganHang'
import TabNhomNhanVien from '../components/TabNhomNhanVien'
import TabThueBH from '../components/TabThueBH'
import TabLichSuPhongBan from '../components/TabLichSuPhongBan'
import { VietnameseDatePicker } from '../components/VietnameseDatePicker'

type TabType = 'thong-tin' | 'hop-dong' | 'phu-cap' | 'lich-su' | 'lich-su-phong-ban'

export default function ChiTietNhanVien() {
  const { id } = useParams<{ id: string }>()
  const nhanVienId = parseInt(id!)
  const queryClient = useQueryClient()

  const [activeTab, setActiveTab] = useState<TabType>('thong-tin')
  const [showThemPhuCap, setShowThemPhuCap] = useState(false)
  const [showTangPhuCap, setShowTangPhuCap] = useState<PhuCapNhanVien | null>(null)
  const [showKetThuc, setShowKetThuc] = useState<PhuCapNhanVien | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Form chỉnh sửa nhân viên
  const [formNhanVien, setFormNhanVien] = useState({
    hoTen: '',
    email: '',
    soDienThoai: '',
    phongBanId: 0,
    chucVu: '',
    gioiTinh: '' as '' | 'NAM' | 'NU' | 'KHAC',
    ngaySinh: '',
    diaChi: '',
    ngayVaoLam: '',
    luongCoBan: 0,
  })

  // Form state
  const [formPhuCap, setFormPhuCap] = useState({
    khoanLuongId: 0,
    soTien: 0,
    tuNgay: new Date().toISOString().split('T')[0],
    denNgay: '',
    ghiChu: '',
  })

  const [formTang, setFormTang] = useState({
    soTienMoi: 0,
    tuNgay: new Date().toISOString().split('T')[0],
    ghiChu: '',
  })

  const [formKetThuc, setFormKetThuc] = useState({
    denNgay: new Date().toISOString().split('T')[0],
  })

  // Queries
  const { data: nhanVien, isLoading: loadingNV } = useQuery({
    queryKey: ['nhan-vien', nhanVienId],
    queryFn: () => nhanVienApi.layTheoId(nhanVienId),
  })

  const { data: phongBans } = useQuery({
    queryKey: ['phong-ban'],
    queryFn: () => phongBanApi.layTatCa(),
  })

  const { data: phuCaps, isLoading: loadingPC } = useQuery({
    queryKey: ['phu-cap', nhanVienId],
    queryFn: () => phuCapNhanVienApi.layTheoNhanVien(nhanVienId),
  })

  const { data: khoanLuongs } = useQuery({
    queryKey: ['khoan-luong', 'THU_NHAP'],
    queryFn: () => khoanLuongApi.layTatCa('THU_NHAP'),
  })

  // Mutations
  const taoPhuCapMutation = useMutation({
    mutationFn: (data: Parameters<typeof phuCapNhanVienApi.taoPhuCap>[0]) =>
      phuCapNhanVienApi.taoPhuCap(data),
    onSuccess: () => {
      toast.success('Thêm phụ cấp thành công')
      queryClient.invalidateQueries({ queryKey: ['phu-cap', nhanVienId] })
      setShowThemPhuCap(false)
      resetFormPhuCap()
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const tangPhuCapMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Parameters<typeof phuCapNhanVienApi.tang>[1] }) =>
      phuCapNhanVienApi.tang(id, data),
    onSuccess: () => {
      toast.success('Điều chỉnh phụ cấp thành công')
      queryClient.invalidateQueries({ queryKey: ['phu-cap', nhanVienId] })
      setShowTangPhuCap(null)
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const ketThucMutation = useMutation({
    mutationFn: ({ id, denNgay }: { id: number; denNgay: string }) =>
      phuCapNhanVienApi.ketThuc(id, denNgay, 'Admin'),
    onSuccess: () => {
      toast.success('Kết thúc phụ cấp thành công')
      queryClient.invalidateQueries({ queryKey: ['phu-cap', nhanVienId] })
      setShowKetThuc(null)
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const tamDungMutation = useMutation({
    mutationFn: (id: number) => phuCapNhanVienApi.tamDung(id),
    onSuccess: () => {
      toast.success('Tạm dừng phụ cấp thành công')
      queryClient.invalidateQueries({ queryKey: ['phu-cap', nhanVienId] })
    },
  })

  const kichHoatMutation = useMutation({
    mutationFn: (id: number) => phuCapNhanVienApi.kichHoat(id),
    onSuccess: () => {
      toast.success('Kích hoạt phụ cấp thành công')
      queryClient.invalidateQueries({ queryKey: ['phu-cap', nhanVienId] })
    },
  })

  // Mutation cập nhật nhân viên
  const capNhatNhanVienMutation = useMutation({
    mutationFn: (data: Parameters<typeof nhanVienApi.capNhat>[1]) =>
      nhanVienApi.capNhat(nhanVienId, data),
    onSuccess: () => {
      toast.success('Cập nhật thông tin nhân viên thành công')
      queryClient.invalidateQueries({ queryKey: ['nhan-vien', nhanVienId] })
      setIsEditing(false)
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật')
    },
  })

  // Effect để cập nhật form khi nhanVien thay đổi
  useEffect(() => {
    if (nhanVien) {
      setFormNhanVien({
        hoTen: nhanVien.hoTen || '',
        email: nhanVien.email || '',
        soDienThoai: nhanVien.soDienThoai || '',
        phongBanId: nhanVien.phongBanId || 0,
        chucVu: nhanVien.chucVu || '',
        gioiTinh: (nhanVien as any).gioiTinh || '',
        ngaySinh: (nhanVien as any).ngaySinh ? new Date((nhanVien as any).ngaySinh).toISOString().split('T')[0] : '',
        diaChi: (nhanVien as any).diaChi || '',
        ngayVaoLam: (nhanVien as any).ngayVaoLam ? new Date((nhanVien as any).ngayVaoLam).toISOString().split('T')[0] : '',
        luongCoBan: nhanVien.luongCoBan || 0,
      })
    }
  }, [nhanVien])

  const resetFormPhuCap = () => {
    setFormPhuCap({
      khoanLuongId: 0,
      soTien: 0,
      tuNgay: new Date().toISOString().split('T')[0],
      denNgay: '',
      ghiChu: '',
    })
  }

  const handleThemPhuCap = () => {
    if (!formPhuCap.khoanLuongId) {
      toast.error('Vui lòng chọn khoản phụ cấp')
      return
    }
    if (formPhuCap.soTien <= 0) {
      toast.error('Số tiền phải > 0')
      return
    }

    taoPhuCapMutation.mutate({
      nhanVienId,
      khoanLuongId: formPhuCap.khoanLuongId,
      soTien: formPhuCap.soTien,
      tuNgay: formPhuCap.tuNgay,
      denNgay: formPhuCap.denNgay || undefined,
      ghiChu: formPhuCap.ghiChu || undefined,
      nguoiTao: 'Admin',
    })
  }

  const handleTangPhuCap = () => {
    if (!showTangPhuCap) return
    if (formTang.soTienMoi <= 0) {
      toast.error('Số tiền mới phải > 0')
      return
    }

    tangPhuCapMutation.mutate({
      id: showTangPhuCap.id,
      data: {
        soTienMoi: formTang.soTienMoi,
        tuNgay: formTang.tuNgay,
        ghiChu: formTang.ghiChu || undefined,
        nguoiTao: 'Admin',
      },
    })
  }

  const handleKetThuc = () => {
    if (!showKetThuc) return
    ketThucMutation.mutate({
      id: showKetThuc.id,
      denNgay: formKetThuc.denNgay,
    })
  }

  // Handle cập nhật nhân viên
  const handleCapNhatNhanVien = () => {
    if (!formNhanVien.hoTen.trim()) {
      toast.error('Vui lòng nhập họ tên')
      return
    }
    if (!formNhanVien.phongBanId) {
      toast.error('Vui lòng chọn phòng ban')
      return
    }

    capNhatNhanVienMutation.mutate({
      hoTen: formNhanVien.hoTen.trim(),
      email: formNhanVien.email?.trim() || null,
      soDienThoai: formNhanVien.soDienThoai?.trim() || null,
      phongBanId: formNhanVien.phongBanId,
      chucVu: formNhanVien.chucVu?.trim() || null,
      gioiTinh: formNhanVien.gioiTinh || null,
      ngaySinh: formNhanVien.ngaySinh || null,
      diaChi: formNhanVien.diaChi?.trim() || null,
      ngayVaoLam: formNhanVien.ngayVaoLam || null,
      luongCoBan: formNhanVien.luongCoBan || 0,
    } as any)
  }

  const handleHuyChinhSua = () => {
    if (nhanVien) {
      setFormNhanVien({
        hoTen: nhanVien.hoTen || '',
        email: nhanVien.email || '',
        soDienThoai: nhanVien.soDienThoai || '',
        phongBanId: nhanVien.phongBanId || 0,
        chucVu: nhanVien.chucVu || '',
        gioiTinh: (nhanVien as any).gioiTinh || '',
        ngaySinh: (nhanVien as any).ngaySinh ? new Date((nhanVien as any).ngaySinh).toISOString().split('T')[0] : '',
        diaChi: (nhanVien as any).diaChi || '',
        ngayVaoLam: (nhanVien as any).ngayVaoLam ? new Date((nhanVien as any).ngayVaoLam).toISOString().split('T')[0] : '',
        luongCoBan: nhanVien.luongCoBan || 0,
      })
    }
    setIsEditing(false)
  }

  // Phân loại phụ cấp
  const phuCapHieuLuc = phuCaps?.filter((pc: PhuCapNhanVien) => pc.trangThai === 'HIEU_LUC') || []
  const phuCapTamDung = phuCaps?.filter((pc: PhuCapNhanVien) => pc.trangThai === 'TAM_DUNG') || []
  const phuCapKetThuc = phuCaps?.filter((pc: PhuCapNhanVien) => pc.trangThai === 'KET_THUC') || []

  // Tính tổng phụ cấp hiệu lực
  const tongPhuCap = phuCapHieuLuc.reduce((sum: number, pc: PhuCapNhanVien) => sum + pc.soTien, 0)

  if (loadingNV) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!nhanVien) {
    return <div className="text-center py-12 text-gray-500">Không tìm thấy nhân viên</div>
  }

  const getTrangThaiColor = (trangThai: string) => {
    switch (trangThai) {
      case 'HIEU_LUC':
        return 'bg-green-100 text-green-800'
      case 'TAM_DUNG':
        return 'bg-yellow-100 text-yellow-800'
      case 'KET_THUC':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrangThaiLabel = (trangThai: string) => {
    switch (trangThai) {
      case 'HIEU_LUC':
        return 'Hiệu lực'
      case 'TAM_DUNG':
        return 'Tạm dừng'
      case 'KET_THUC':
        return 'Kết thúc'
      default:
        return trangThai
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/nhan-vien" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{nhanVien.hoTen}</h1>
          <p className="text-gray-500">
            {nhanVien.maNhanVien} - {nhanVien.chucVu || 'Nhân viên'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('thong-tin')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'thong-tin'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <User size={18} className="inline-block mr-2" />
          Thông tin
        </button>
        <button
          onClick={() => setActiveTab('hop-dong')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'hop-dong'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileText size={18} className="inline-block mr-2" />
          Hợp đồng / Lương
        </button>
        <button
          onClick={() => setActiveTab('phu-cap')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'phu-cap'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Wallet size={18} className="inline-block mr-2" />
          Phụ cấp
          {phuCapHieuLuc.length > 0 && (
            <span className="ml-2 bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full text-xs">
              {phuCapHieuLuc.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('lich-su')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'lich-su'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <History size={18} className="inline-block mr-2" />
          Lịch sử phụ cấp
        </button>
        <button
          onClick={() => setActiveTab('lich-su-phong-ban')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'lich-su-phong-ban'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Building2 size={18} className="inline-block mr-2" />
          Lịch sử phòng ban
        </button>
      </div>

      {/* Tab: Thông tin */}
      {activeTab === 'thong-tin' && (
        <div className="space-y-6">
          {/* Thông tin cơ bản */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <User size={20} />
                Thông tin cơ bản
              </h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-secondary flex items-center gap-2"
                >
                  <Pencil size={16} />
                  Chỉnh sửa
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleHuyChinhSua}
                    className="btn btn-secondary flex items-center gap-2"
                    disabled={capNhatNhanVienMutation.isPending}
                  >
                    <X size={16} />
                    Hủy
                  </button>
                  <button
                    onClick={handleCapNhatNhanVien}
                    className="btn btn-primary flex items-center gap-2"
                    disabled={capNhatNhanVienMutation.isPending}
                  >
                    <Save size={16} />
                    {capNhatNhanVienMutation.isPending ? 'Đang lưu...' : 'Lưu'}
                  </button>
                </div>
              )}
            </div>

            {!isEditing ? (
              /* Chế độ xem */
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-500">Mã nhân viên</label>
                  <p className="font-medium">{nhanVien.maNhanVien}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Họ tên</label>
                  <p className="font-medium">{nhanVien.hoTen}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Phòng ban</label>
                  <p className="font-medium">{nhanVien.phongBan?.tenPhongBan}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Chức vụ</label>
                  <p className="font-medium">{nhanVien.chucVu || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Giới tính</label>
                  <p className="font-medium">{(nhanVien as any).gioiTinh === 'NAM' ? 'Nam' : (nhanVien as any).gioiTinh === 'NU' ? 'Nữ' : (nhanVien as any).gioiTinh === 'KHAC' ? 'Khác' : '-'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Ngày sinh</label>
                  <p className="font-medium">{(nhanVien as any).ngaySinh ? formatNgay((nhanVien as any).ngaySinh) : '-'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Email</label>
                  <p className="font-medium">{nhanVien.email || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Số điện thoại</label>
                  <p className="font-medium">{nhanVien.soDienThoai || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Địa chỉ</label>
                  <p className="font-medium">{(nhanVien as any).diaChi || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Ngày vào làm</label>
                  <p className="font-medium">{(nhanVien as any).ngayVaoLam ? formatNgay((nhanVien as any).ngayVaoLam) : '-'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Lương cơ bản</label>
                  <p className="font-medium text-primary-600">{formatTien(nhanVien.luongCoBan)}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Tổng phụ cấp hiện tại</label>
                  <p className="font-medium text-green-600">{formatTien(tongPhuCap)}</p>
                </div>
              </div>
            ) : (
              /* Chế độ chỉnh sửa */
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-500">Mã nhân viên</label>
                  <p className="font-medium text-gray-400">{nhanVien.maNhanVien}</p>
                  <span className="text-xs text-gray-400">(Không thể sửa)</span>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Họ tên *</label>
                  <input
                    type="text"
                    value={formNhanVien.hoTen}
                    onChange={(e) => setFormNhanVien({ ...formNhanVien, hoTen: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Nhập họ tên"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phòng ban *</label>
                  <select
                    value={formNhanVien.phongBanId}
                    onChange={(e) => setFormNhanVien({ ...formNhanVien, phongBanId: parseInt(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value={0}>-- Chọn phòng ban --</option>
                    {phongBans?.map((pb: any) => (
                      <option key={pb.id} value={pb.id}>{pb.tenPhongBan}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Chức vụ</label>
                  <input
                    type="text"
                    value={formNhanVien.chucVu}
                    onChange={(e) => setFormNhanVien({ ...formNhanVien, chucVu: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Nhập chức vụ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Giới tính</label>
                  <select
                    value={formNhanVien.gioiTinh}
                    onChange={(e) => setFormNhanVien({ ...formNhanVien, gioiTinh: e.target.value as '' | 'NAM' | 'NU' | 'KHAC' })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">-- Chọn giới tính --</option>
                    <option value="NAM">Nam</option>
                    <option value="NU">Nữ</option>
                    <option value="KHAC">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ngày sinh</label>
                  <VietnameseDatePicker
                    value={formNhanVien.ngaySinh}
                    onChange={(val) => setFormNhanVien({ ...formNhanVien, ngaySinh: val })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={formNhanVien.email}
                    onChange={(e) => setFormNhanVien({ ...formNhanVien, email: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Nhập email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    value={formNhanVien.soDienThoai}
                    onChange={(e) => setFormNhanVien({ ...formNhanVien, soDienThoai: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Địa chỉ</label>
                  <input
                    type="text"
                    value={formNhanVien.diaChi}
                    onChange={(e) => setFormNhanVien({ ...formNhanVien, diaChi: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Nhập địa chỉ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ngày vào làm</label>
                  <VietnameseDatePicker
                    value={formNhanVien.ngayVaoLam}
                    onChange={(val) => setFormNhanVien({ ...formNhanVien, ngayVaoLam: val })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Lương cơ bản</label>
                  <input
                    type="number"
                    value={formNhanVien.luongCoBan}
                    onChange={(e) => setFormNhanVien({ ...formNhanVien, luongCoBan: parseFloat(e.target.value) || 0 })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Nhập lương cơ bản"
                    min={0}
                    step={100000}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Tổng phụ cấp hiện tại</label>
                  <p className="font-medium text-green-600">{formatTien(tongPhuCap)}</p>
                  <span className="text-xs text-gray-400">(Tự động tính từ các khoản phụ cấp)</span>
                </div>
              </div>
            )}
          </div>

          {/* Ngân hàng */}
          <div className="card">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Building2 size={20} />
              Tài khoản ngân hàng
            </h3>
            <TabNganHang nhanVienId={nhanVienId} />
          </div>

          {/* Thuế & BHXH */}
          <div className="card">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FileText size={20} />
              Thông tin Thuế & BHXH
            </h3>
            <TabThueBH nhanVienId={nhanVienId} />
          </div>

          {/* Nhóm nhân viên */}
          <div className="card">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Users size={20} />
              Nhóm nhân viên
            </h3>
            <TabNhomNhanVien nhanVienId={nhanVienId} />
          </div>
        </div>
      )}

      {/* Tab: Hợp đồng / Lương */}
      {activeTab === 'hop-dong' && (
        <div className="card">
          <TabHopDong nhanVienId={nhanVienId} />
        </div>
      )}

      {/* Tab: Phụ cấp */}
      {activeTab === 'phu-cap' && (
        <div>
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="card bg-green-50">
              <p className="text-sm text-gray-600">Phụ cấp hiệu lực</p>
              <p className="text-2xl font-bold text-green-600">{phuCapHieuLuc.length}</p>
              <p className="text-sm text-green-600">{formatTien(tongPhuCap)}/tháng</p>
            </div>
            <div className="card bg-yellow-50">
              <p className="text-sm text-gray-600">Tạm dừng</p>
              <p className="text-2xl font-bold text-yellow-600">{phuCapTamDung.length}</p>
            </div>
            <div className="card bg-gray-50">
              <p className="text-sm text-gray-600">Đã kết thúc</p>
              <p className="text-2xl font-bold text-gray-600">{phuCapKetThuc.length}</p>
            </div>
          </div>

          {/* Action */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Danh sách phụ cấp</h3>
            <button onClick={() => setShowThemPhuCap(true)} className="btn btn-primary">
              <Plus size={20} />
              Thêm phụ cấp
            </button>
          </div>

          {/* Phụ cấp hiệu lực */}
          {phuCapHieuLuc.length > 0 && (
            <div className="card mb-4">
              <h4 className="font-medium text-green-700 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Đang hiệu lực ({phuCapHieuLuc.length})
              </h4>
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-2 px-3">Khoản phụ cấp</th>
                    <th className="text-right py-2 px-3">Số tiền</th>
                    <th className="text-left py-2 px-3">Từ ngày</th>
                    <th className="text-left py-2 px-3">Đến ngày</th>
                    <th className="text-left py-2 px-3">Ghi chú</th>
                    <th className="text-center py-2 px-3">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {phuCapHieuLuc.map((pc: PhuCapNhanVien) => (
                    <tr key={pc.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3 font-medium">{pc.khoanLuong.tenKhoan}</td>
                      <td className="py-2 px-3 text-right font-semibold text-primary-600">
                        {formatTien(pc.soTien)}
                      </td>
                      <td className="py-2 px-3">{formatNgay(pc.tuNgay)}</td>
                      <td className="py-2 px-3">{pc.denNgay ? formatNgay(pc.denNgay) : 'Không xác định'}</td>
                      <td className="py-2 px-3 text-gray-500 text-sm">{pc.ghiChu || '-'}</td>
                      <td className="py-2 px-3">
                        <div className="flex justify-center gap-1">
                          <button
                            onClick={() => {
                              setShowTangPhuCap(pc)
                              setFormTang({
                                soTienMoi: pc.soTien,
                                tuNgay: new Date().toISOString().split('T')[0],
                                ghiChu: '',
                              })
                            }}
                            className="p-1 hover:bg-blue-100 rounded text-blue-600"
                            title="Điều chỉnh"
                          >
                            <TrendingUp size={18} />
                          </button>
                          <button
                            onClick={() => tamDungMutation.mutate(pc.id)}
                            className="p-1 hover:bg-yellow-100 rounded text-yellow-600"
                            title="Tạm dừng"
                          >
                            <Pause size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setShowKetThuc(pc)
                              setFormKetThuc({
                                denNgay: new Date().toISOString().split('T')[0],
                              })
                            }}
                            className="p-1 hover:bg-red-100 rounded text-red-600"
                            title="Kết thúc"
                          >
                            <Calendar size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Phụ cấp tạm dừng */}
          {phuCapTamDung.length > 0 && (
            <div className="card mb-4">
              <h4 className="font-medium text-yellow-700 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                Tạm dừng ({phuCapTamDung.length})
              </h4>
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-2 px-3">Khoản phụ cấp</th>
                    <th className="text-right py-2 px-3">Số tiền</th>
                    <th className="text-left py-2 px-3">Trạng thái</th>
                    <th className="text-center py-2 px-3">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {phuCapTamDung.map((pc: PhuCapNhanVien) => (
                    <tr key={pc.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">{pc.khoanLuong.tenKhoan}</td>
                      <td className="py-2 px-3 text-right">{formatTien(pc.soTien)}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getTrangThaiColor(pc.trangThai)}`}>
                          {getTrangThaiLabel(pc.trangThai)}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <button
                          onClick={() => kichHoatMutation.mutate(pc.id)}
                          className="p-1 hover:bg-green-100 rounded text-green-600"
                          title="Kích hoạt lại"
                        >
                          <Play size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty state */}
          {loadingPC ? (
            <div className="text-center py-8">Đang tải...</div>
          ) : phuCaps?.length === 0 ? (
            <div className="card text-center py-8 text-gray-500">
              <AlertCircle size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Nhân viên chưa có phụ cấp nào</p>
              <button onClick={() => setShowThemPhuCap(true)} className="btn btn-primary mt-4">
                <Plus size={20} />
                Thêm phụ cấp đầu tiên
              </button>
            </div>
          ) : null}
        </div>
      )}

      {/* Tab: Lịch sử */}
      {activeTab === 'lich-su' && (
        <div className="card">
          <h3 className="font-semibold mb-4">Lịch sử thay đổi phụ cấp</h3>
          {phuCaps && phuCaps.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-2 px-3">Khoản phụ cấp</th>
                  <th className="text-right py-2 px-3">Số tiền</th>
                  <th className="text-left py-2 px-3">Từ ngày</th>
                  <th className="text-left py-2 px-3">Đến ngày</th>
                  <th className="text-left py-2 px-3">Trạng thái</th>
                  <th className="text-left py-2 px-3">Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {phuCaps.map((pc: PhuCapNhanVien) => (
                  <tr key={pc.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{pc.khoanLuong.tenKhoan}</td>
                    <td className="py-2 px-3 text-right font-medium">{formatTien(pc.soTien)}</td>
                    <td className="py-2 px-3">{formatNgay(pc.tuNgay)}</td>
                    <td className="py-2 px-3">{pc.denNgay ? formatNgay(pc.denNgay) : '-'}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${getTrangThaiColor(pc.trangThai)}`}>
                        {getTrangThaiLabel(pc.trangThai)}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-gray-500 text-sm">{pc.ghiChu || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center py-8">Chưa có dữ liệu lịch sử</p>
          )}
        </div>
      )}

      {/* Tab: Lịch sử phòng ban */}
      {activeTab === 'lich-su-phong-ban' && (
        <TabLichSuPhongBan nhanVienId={nhanVienId} />
      )}

      {/* Modal: Thêm phụ cấp */}
      {showThemPhuCap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Thêm phụ cấp mới</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Khoản phụ cấp *</label>
                <select
                  value={formPhuCap.khoanLuongId}
                  onChange={(e) => setFormPhuCap({ ...formPhuCap, khoanLuongId: Number(e.target.value) })}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value={0}>-- Chọn khoản phụ cấp --</option>
                  {khoanLuongs?.map((kl: KhoanLuong) => (
                    <option key={kl.id} value={kl.id}>
                      {kl.tenKhoan}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Số tiền *</label>
                <input
                  type="number"
                  value={formPhuCap.soTien}
                  onChange={(e) => setFormPhuCap({ ...formPhuCap, soTien: Number(e.target.value) })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="VD: 500000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ngày bắt đầu *</label>
                <VietnameseDatePicker
                  value={formPhuCap.tuNgay}
                  onChange={(val) => setFormPhuCap({ ...formPhuCap, tuNgay: val })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ngày kết thúc (tùy chọn)</label>
                <VietnameseDatePicker
                  value={formPhuCap.denNgay}
                  onChange={(val) => setFormPhuCap({ ...formPhuCap, denNgay: val })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ghi chú</label>
                <textarea
                  value={formPhuCap.ghiChu}
                  onChange={(e) => setFormPhuCap({ ...formPhuCap, ghiChu: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={2}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowThemPhuCap(false)} className="btn btn-secondary">
                Hủy
              </button>
              <button
                onClick={handleThemPhuCap}
                disabled={taoPhuCapMutation.isPending}
                className="btn btn-primary"
              >
                {taoPhuCapMutation.isPending ? 'Đang lưu...' : 'Thêm phụ cấp'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Điều chỉnh phụ cấp */}
      {showTangPhuCap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Điều chỉnh phụ cấp</h3>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-gray-600">Khoản phụ cấp</p>
              <p className="font-medium">{showTangPhuCap.khoanLuong.tenKhoan}</p>
              <p className="text-sm text-gray-500">Hiện tại: {formatTien(showTangPhuCap.soTien)}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Số tiền mới *</label>
                <input
                  type="number"
                  value={formTang.soTienMoi}
                  onChange={(e) => setFormTang({ ...formTang, soTienMoi: Number(e.target.value) })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ngày hiệu lực mới *</label>
                <VietnameseDatePicker
                  value={formTang.tuNgay}
                  onChange={(val) => setFormTang({ ...formTang, tuNgay: val })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Lý do điều chỉnh</label>
                <textarea
                  value={formTang.ghiChu}
                  onChange={(e) => setFormTang({ ...formTang, ghiChu: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={2}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowTangPhuCap(null)} className="btn btn-secondary">
                Hủy
              </button>
              <button
                onClick={handleTangPhuCap}
                disabled={tangPhuCapMutation.isPending}
                className="btn btn-primary"
              >
                {tangPhuCapMutation.isPending ? 'Đang lưu...' : 'Điều chỉnh'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Kết thúc phụ cấp */}
      {showKetThuc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Kết thúc phụ cấp</h3>
            
            <div className="bg-red-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-gray-600">Khoản phụ cấp</p>
              <p className="font-medium">{showKetThuc.khoanLuong.tenKhoan}</p>
              <p className="text-sm text-red-600">Số tiền: {formatTien(showKetThuc.soTien)}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ngày kết thúc *</label>
              <VietnameseDatePicker
                value={formKetThuc.denNgay}
                onChange={(val) => setFormKetThuc({ denNgay: val })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowKetThuc(null)} className="btn btn-secondary">
                Hủy
              </button>
              <button
                onClick={handleKetThuc}
                disabled={ketThucMutation.isPending}
                className="btn btn-danger"
              >
                {ketThucMutation.isPending ? 'Đang lưu...' : 'Kết thúc'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
