// Sổ lương phòng ban - Thống kê theo phòng ban
import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Building2,
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ChevronDown,
  ChevronUp,
  BarChart3,
} from 'lucide-react'
import { phongBanApi, soLuongApi } from '../services/api'
import { formatTien } from '../utils'
import { VietnameseMonthPicker } from '../components/VietnameseDatePicker'

interface PhongBan {
  id: number
  maPhongBan: string
  tenPhongBan: string
}

interface ThangData {
  thangNam: string
  soNhanVien: number
  tongLuongCoBan: number
  tongPhuCap: number
  tongThuong: number
  tongKhauTru: number
  tongBHXH: number
  tongThue: number
  tongThucLanh: number
}

interface NhanVienData {
  nhanVienId: number
  maNhanVien: string
  hoTen: string
  luongCoBan: number
  phuCapTong: number
  thuongTong: number
  khauTruTong: number
  thucLanh: number
}

interface SoLuongPhongBanData {
  phongBan: PhongBan
  thongKeTheoThang: ThangData[]
  chiTietNhanVien: NhanVienData[]
  tongKet: {
    soNhanVien: number
    tongLuongCoBan: number
    tongPhuCap: number
    tongThuong: number
    tongKhauTru: number
    tongBHXH: number
    tongThue: number
    tongThucLanh: number
  }
}

export default function SoLuongPhongBan() {
  const [selectedPhongBanId, setSelectedPhongBanId] = useState<number | null>(null)
  const [tuThang, setTuThang] = useState(() => {
    const d = new Date()
    d.setMonth(d.getMonth() - 11)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  })
  const [denThang, setDenThang] = useState(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  })
  const [viewMode, setViewMode] = useState<'thang' | 'nhanvien'>('thang')
  const [expandedNV, setExpandedNV] = useState<number | null>(null)

  // Lấy danh sách phòng ban
  const { data: phongBansRaw } = useQuery({
    queryKey: ['phong-ban-list'],
    queryFn: phongBanApi.layTatCa,
  })
  const phongBans = Array.isArray(phongBansRaw) ? phongBansRaw : []

  // Lấy sổ lương phòng ban
  const { data: soLuong, isLoading } = useQuery<SoLuongPhongBanData>({
    queryKey: ['so-luong-pb', selectedPhongBanId, tuThang, denThang],
    queryFn: () =>
      soLuongApi.layPhongBan(selectedPhongBanId!, {
        tuThang: Number(tuThang.split('-')[1]),
        tuNam: Number(tuThang.split('-')[0]),
        denThang: Number(denThang.split('-')[1]),
        denNam: Number(denThang.split('-')[0]),
      }),
    enabled: !!selectedPhongBanId,
  })

  // Tính % thay đổi giữa các tháng
  const trendData = useMemo(() => {
    if (!soLuong?.thongKeTheoThang || soLuong.thongKeTheoThang.length < 2) return null
    
    const months = soLuong.thongKeTheoThang
    const first = months[0]
    const last = months[months.length - 1]
    
    const change = last.tongThucLanh - first.tongThucLanh
    const pct = first.tongThucLanh > 0 ? (change / first.tongThucLanh) * 100 : 0
    
    return { change, pct, isUp: change >= 0 }
  }, [soLuong?.thongKeTheoThang])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sổ lương phòng ban</h1>

      {/* Bộ lọc */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Chọn phòng ban */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phòng ban
            </label>
            <select
              value={selectedPhongBanId || ''}
              onChange={(e) => setSelectedPhongBanId(e.target.value ? Number(e.target.value) : null)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">-- Chọn phòng ban --</option>
              {phongBans.map((pb: PhongBan) => (
                <option key={pb.id} value={pb.id}>
                  {pb.tenPhongBan}
                </option>
              ))}
            </select>
          </div>

          {/* Từ tháng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Từ tháng</label>
            <VietnameseMonthPicker
              value={tuThang}
              onChange={setTuThang}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Đến tháng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Đến tháng</label>
            <VietnameseMonthPicker
              value={denThang}
              onChange={setDenThang}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* View mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chế độ xem</label>
            <div className="flex rounded-lg overflow-hidden border">
              <button
                onClick={() => setViewMode('thang')}
                className={`flex-1 px-4 py-2 ${viewMode === 'thang' ? 'bg-blue-600 text-white' : 'bg-white'}`}
              >
                Theo tháng
              </button>
              <button
                onClick={() => setViewMode('nhanvien')}
                className={`flex-1 px-4 py-2 ${viewMode === 'nhanvien' ? 'bg-blue-600 text-white' : 'bg-white'}`}
              >
                Theo NV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Thông tin phòng ban & Tổng kết */}
      {soLuong && (
        <>
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 size={28} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{soLuong.phongBan.tenPhongBan}</h2>
                  <p className="text-gray-500">Mã: {soLuong.phongBan.maPhongBan}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {trendData && (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    trendData.isUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {trendData.isUp ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    <span className="font-medium">
                      {trendData.isUp ? '+' : ''}{trendData.pct.toFixed(1)}%
                    </span>
                    <span className="text-sm">so với đầu kỳ</span>
                  </div>
                )}
                <button className="btn btn-secondary">
                  <Download size={18} />
                  Xuất Excel
                </button>
              </div>
            </div>

            {/* Tổng kết */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Users size={18} />
                  <span className="text-sm">Số nhân viên</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{soLuong.tongKet.soNhanVien}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <DollarSign size={18} />
                  <span className="text-sm">Tổng lương cơ bản</span>
                </div>
                <p className="text-xl font-bold text-blue-600">{formatTien(soLuong.tongKet.tongLuongCoBan)}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <TrendingUp size={18} />
                  <span className="text-sm">Tổng thưởng</span>
                </div>
                <p className="text-xl font-bold text-green-600">{formatTien(soLuong.tongKet.tongThuong)}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <BarChart3 size={18} />
                  <span className="text-sm">Tổng thực lãnh</span>
                </div>
                <p className="text-xl font-bold text-purple-600">{formatTien(soLuong.tongKet.tongThucLanh)}</p>
              </div>
            </div>
          </div>

          {/* View theo tháng */}
          {viewMode === 'thang' && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Thống kê theo tháng</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Tháng</th>
                      <th className="text-right py-3 px-4 font-medium">Số NV</th>
                      <th className="text-right py-3 px-4 font-medium">Lương cơ bản</th>
                      <th className="text-right py-3 px-4 font-medium">Phụ cấp</th>
                      <th className="text-right py-3 px-4 font-medium">Thưởng</th>
                      <th className="text-right py-3 px-4 font-medium">Khấu trừ</th>
                      <th className="text-right py-3 px-4 font-medium">BHXH</th>
                      <th className="text-right py-3 px-4 font-medium">Thuế TNCN</th>
                      <th className="text-right py-3 px-4 font-medium">Thực lãnh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {soLuong.thongKeTheoThang.map((t, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{t.thangNam}</td>
                        <td className="py-3 px-4 text-right">{t.soNhanVien}</td>
                        <td className="py-3 px-4 text-right">{formatTien(t.tongLuongCoBan)}</td>
                        <td className="py-3 px-4 text-right">{formatTien(t.tongPhuCap)}</td>
                        <td className="py-3 px-4 text-right text-green-600">{formatTien(t.tongThuong)}</td>
                        <td className="py-3 px-4 text-right text-red-600">{formatTien(t.tongKhauTru)}</td>
                        <td className="py-3 px-4 text-right">{formatTien(t.tongBHXH)}</td>
                        <td className="py-3 px-4 text-right">{formatTien(t.tongThue)}</td>
                        <td className="py-3 px-4 text-right font-bold text-blue-600">{formatTien(t.tongThucLanh)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-100 font-semibold">
                    <tr>
                      <td className="py-3 px-4">Tổng cộng</td>
                      <td className="py-3 px-4 text-right">{soLuong.tongKet.soNhanVien}</td>
                      <td className="py-3 px-4 text-right">{formatTien(soLuong.tongKet.tongLuongCoBan)}</td>
                      <td className="py-3 px-4 text-right">{formatTien(soLuong.tongKet.tongPhuCap)}</td>
                      <td className="py-3 px-4 text-right text-green-600">{formatTien(soLuong.tongKet.tongThuong)}</td>
                      <td className="py-3 px-4 text-right text-red-600">{formatTien(soLuong.tongKet.tongKhauTru)}</td>
                      <td className="py-3 px-4 text-right">{formatTien(soLuong.tongKet.tongBHXH)}</td>
                      <td className="py-3 px-4 text-right">{formatTien(soLuong.tongKet.tongThue)}</td>
                      <td className="py-3 px-4 text-right text-blue-600">{formatTien(soLuong.tongKet.tongThucLanh)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* View theo nhân viên */}
          {viewMode === 'nhanvien' && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Chi tiết theo nhân viên</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Mã NV</th>
                      <th className="text-left py-3 px-4 font-medium">Họ tên</th>
                      <th className="text-right py-3 px-4 font-medium">Lương cơ bản</th>
                      <th className="text-right py-3 px-4 font-medium">Phụ cấp</th>
                      <th className="text-right py-3 px-4 font-medium">Thưởng</th>
                      <th className="text-right py-3 px-4 font-medium">Khấu trừ</th>
                      <th className="text-right py-3 px-4 font-medium">Thực lãnh</th>
                      <th className="text-center py-3 px-4 font-medium">Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    {soLuong.chiTietNhanVien.map((nv) => (
                      <>
                        <tr key={nv.nhanVienId} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{nv.maNhanVien}</td>
                          <td className="py-3 px-4">{nv.hoTen}</td>
                          <td className="py-3 px-4 text-right">{formatTien(nv.luongCoBan)}</td>
                          <td className="py-3 px-4 text-right">{formatTien(nv.phuCapTong)}</td>
                          <td className="py-3 px-4 text-right text-green-600">{formatTien(nv.thuongTong)}</td>
                          <td className="py-3 px-4 text-right text-red-600">{formatTien(nv.khauTruTong)}</td>
                          <td className="py-3 px-4 text-right font-bold text-blue-600">{formatTien(nv.thucLanh)}</td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => setExpandedNV(expandedNV === nv.nhanVienId ? null : nv.nhanVienId)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              {expandedNV === nv.nhanVienId ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>
                          </td>
                        </tr>
                        {expandedNV === nv.nhanVienId && (
                          <tr>
                            <td colSpan={8} className="bg-gray-50 p-4">
                              <p className="text-sm text-gray-500 text-center">
                                Xem chi tiết trong{' '}
                                <a
                                  href={`/so-luong/nhan-vien?id=${nv.nhanVienId}`}
                                  className="text-blue-600 hover:underline"
                                >
                                  Sổ lương nhân viên
                                </a>
                              </p>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Empty state */}
      {!selectedPhongBanId && (
        <div className="card text-center py-12">
          <Building2 size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Vui lòng chọn phòng ban để xem sổ lương</p>
        </div>
      )}
    </div>
  )
}
