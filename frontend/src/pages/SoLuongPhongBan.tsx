// Sổ lương phòng ban - Thống kê theo phòng ban
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Building2,
  Download,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
} from 'lucide-react'
import { phongBanApi, soLuongApi, SoLuongPhongBanData } from '../services/api'
import { formatTien } from '../utils'
import { VietnameseMonthPicker } from '../components/VietnameseDatePicker'

interface PhongBan {
  id: number
  maPhongBan: string
  tenPhongBan: string
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
                  <h2 className="text-xl font-bold">{soLuong.phongBan?.tenPhongBan}</h2>
                  <p className="text-gray-500">Mã: {soLuong.phongBan?.maPhongBan}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
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
                <p className="text-2xl font-bold text-gray-800">{soLuong.theoNhanVien?.length ?? 0}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <DollarSign size={18} />
                  <span className="text-sm">Tổng thu nhập</span>
                </div>
                <p className="text-xl font-bold text-blue-600">{formatTien(soLuong.tongHop?.tongThuNhap ?? 0)}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <TrendingUp size={18} />
                  <span className="text-sm">Tổng thưởng</span>
                </div>
                <p className="text-xl font-bold text-green-600">{formatTien(soLuong.tongHop?.tongThuong ?? 0)}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <BarChart3 size={18} />
                  <span className="text-sm">Thực lĩnh</span>
                </div>
                <p className="text-xl font-bold text-purple-600">{formatTien(soLuong.tongHop?.thucLinh ?? 0)}</p>
              </div>
            </div>
          </div>

          {/* Chi tiết theo nhân viên */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Chi tiết theo nhân viên ({soLuong.theoNhanVien?.length ?? 0})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">Mã NV</th>
                    <th className="text-left py-3 px-4 font-medium">Họ tên</th>
                    <th className="text-right py-3 px-4 font-medium">Thu nhập</th>
                    <th className="text-right py-3 px-4 font-medium">Khấu trừ</th>
                    <th className="text-right py-3 px-4 font-medium">Thưởng</th>
                    <th className="text-right py-3 px-4 font-medium">Phạt</th>
                    <th className="text-right py-3 px-4 font-medium">Thực lĩnh</th>
                  </tr>
                </thead>
                <tbody>
                  {soLuong.theoNhanVien?.map((item) => (
                    <tr key={item.nhanVien?.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{item.nhanVien?.maNhanVien}</td>
                      <td className="py-3 px-4">{item.nhanVien?.hoTen}</td>
                      <td className="py-3 px-4 text-right">{formatTien(item.tongHop?.tongThuNhap ?? 0)}</td>
                      <td className="py-3 px-4 text-right text-red-600">{formatTien(item.tongHop?.tongKhauTru ?? 0)}</td>
                      <td className="py-3 px-4 text-right text-green-600">{formatTien(item.tongHop?.tongThuong ?? 0)}</td>
                      <td className="py-3 px-4 text-right text-orange-600">{formatTien(item.tongHop?.tongPhat ?? 0)}</td>
                      <td className="py-3 px-4 text-right font-bold text-blue-600">{formatTien(item.tongHop?.thucLinh ?? 0)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-100 font-semibold">
                  <tr>
                    <td colSpan={2} className="py-3 px-4">Tổng cộng</td>
                    <td className="py-3 px-4 text-right">{formatTien(soLuong.tongHop?.tongThuNhap ?? 0)}</td>
                    <td className="py-3 px-4 text-right text-red-600">{formatTien(soLuong.tongHop?.tongKhauTru ?? 0)}</td>
                    <td className="py-3 px-4 text-right text-green-600">{formatTien(soLuong.tongHop?.tongThuong ?? 0)}</td>
                    <td className="py-3 px-4 text-right text-orange-600">{formatTien(soLuong.tongHop?.tongPhat ?? 0)}</td>
                    <td className="py-3 px-4 text-right text-blue-600">{formatTien(soLuong.tongHop?.thucLinh ?? 0)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
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
