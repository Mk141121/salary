// Trang chủ - Dashboard
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  FileSpreadsheet,
  Users,
  DollarSign,
  Building2,
  TrendingUp,
  Calendar,
} from 'lucide-react'
import { phongBanApi, nhanVienApi, khoanLuongApi, bangLuongApi } from '../services/api'
import { formatTien } from '../utils'

export default function TrangChu() {
  const { data: phongBans } = useQuery({
    queryKey: ['phong-ban'],
    queryFn: phongBanApi.layTatCa,
  })

  const { data: nhanViensData } = useQuery({
    queryKey: ['nhan-vien'],
    queryFn: () => nhanVienApi.layTatCa(),
  })

  const { data: khoanLuongs } = useQuery({
    queryKey: ['khoan-luong'],
    queryFn: () => khoanLuongApi.layTatCa(),
  })

  const { data: bangLuongsData } = useQuery({
    queryKey: ['bang-luong'],
    queryFn: () => bangLuongApi.layDanhSach(),
  })

  // Handle paginated response format { data: [], meta: {} }
  const nhanViens = Array.isArray(nhanViensData) ? nhanViensData : nhanViensData?.data || []
  const bangLuongs = Array.isArray(bangLuongsData) ? bangLuongsData : bangLuongsData?.data || []

  // Tính tổng thực lĩnh của tất cả bảng lương
  const tongThucLinh = bangLuongs?.reduce((sum: number, bl: any) => sum + (bl.thucLinh || 0), 0) || 0

  const stats = [
    {
      label: 'Phòng ban',
      value: phongBans?.length || 0,
      icon: Building2,
      color: 'bg-blue-500',
      link: '/nhan-vien',
    },
    {
      label: 'Nhân viên',
      value: nhanViens?.length || 0,
      icon: Users,
      color: 'bg-green-500',
      link: '/nhan-vien',
    },
    {
      label: 'Khoản lương',
      value: khoanLuongs?.length || 0,
      icon: DollarSign,
      color: 'bg-purple-500',
      link: '/khoan-luong',
    },
    {
      label: 'Bảng lương',
      value: bangLuongs?.length || 0,
      icon: FileSpreadsheet,
      color: 'bg-orange-500',
      link: '/bang-luong',
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Tổng quan Hệ thống
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              to={stat.link}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Tổng quỹ lương */}
      <div className="card mb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
            <TrendingUp size={32} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Tổng quỹ lương</p>
            <p className="text-3xl font-bold text-gray-800">
              {formatTien(tongThucLinh)} <span className="text-lg text-gray-500">VNĐ</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bảng lương gần đây */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Calendar size={20} />
            Bảng lương gần đây
          </h2>
          <Link to="/bang-luong" className="text-primary-600 hover:underline text-sm">
            Xem tất cả →
          </Link>
        </div>

        {bangLuongs && bangLuongs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 text-sm font-medium text-gray-500">
                    Tháng/Năm
                  </th>
                  <th className="text-left py-2 px-3 text-sm font-medium text-gray-500">
                    Phòng ban
                  </th>
                  <th className="text-right py-2 px-3 text-sm font-medium text-gray-500">
                    Số NV
                  </th>
                  <th className="text-right py-2 px-3 text-sm font-medium text-gray-500">
                    Thực lĩnh
                  </th>
                  <th className="text-center py-2 px-3 text-sm font-medium text-gray-500">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                {bangLuongs.slice(0, 5).map((bl) => (
                  <tr key={bl.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-3">
                      <Link
                        to={`/bang-luong/${bl.id}`}
                        className="text-primary-600 hover:underline font-medium"
                      >
                        Tháng {bl.thang}/{bl.nam}
                      </Link>
                    </td>
                    <td className="py-3 px-3">{bl.phongBan?.tenPhongBan || 'Tất cả phòng ban'}</td>
                    <td className="py-3 px-3 text-right">{bl.soNhanVien || 0}</td>
                    <td className="py-3 px-3 text-right font-medium currency">
                      {formatTien(bl.thucLinh)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`
                          badge
                          ${bl.trangThai === 'NHAP' ? 'badge-nhap' : ''}
                          ${bl.trangThai === 'DA_CHOT' ? 'badge-da-chot' : ''}
                          ${bl.trangThai === 'KHOA' ? 'badge-khoa' : ''}
                        `}
                      >
                        {bl.trangThai === 'NHAP' && 'Đang nhập'}
                        {bl.trangThai === 'DA_CHOT' && 'Đã chốt'}
                        {bl.trangThai === 'KHOA' && 'Đã khóa'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Chưa có bảng lương nào. 
            <Link to="/bang-luong" className="text-primary-600 hover:underline ml-1">
              Tạo bảng lương mới
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
