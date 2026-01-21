// Trang chủ - Dashboard Premium Style
import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  FileSpreadsheet,
  Users,
  DollarSign,
  Building2,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  ChevronDown,
} from 'lucide-react'
import { phongBanApi, nhanVienApi, khoanLuongApi, bangLuongApi } from '../services/api'
import { formatTien } from '../utils'
import { StatCard, Card, CardHeader, Badge } from '../components/ui'

export default function TrangChu() {
  // State for month/year filter - default to current month/year
  const currentDate = new Date()
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1) // 1-12
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())

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
  const nhanViens = (Array.isArray(nhanViensData) ? nhanViensData : nhanViensData?.data || []).filter((nv: any) => nv && nv.id)
  const bangLuongs = (Array.isArray(bangLuongsData) ? bangLuongsData : bangLuongsData?.data || []).filter((bl: any) => bl && bl.id)

  // Get available years from bangLuongs data
  const availableYears = useMemo(() => {
    const years = new Set<number>()
    bangLuongs.forEach((bl: any) => {
      if (bl.nam) years.add(bl.nam)
    })
    // Always include current year
    years.add(currentDate.getFullYear())
    return Array.from(years).sort((a, b) => b - a)
  }, [bangLuongs])

  // Tính tổng thực lĩnh theo tháng/năm được chọn
  const tongThucLinhTheoThang = useMemo(() => {
    return bangLuongs
      .filter((bl: any) => bl.thang === selectedMonth && bl.nam === selectedYear)
      .reduce((sum: number, bl: any) => sum + (bl?.thucLinh || 0), 0) || 0
  }, [bangLuongs, selectedMonth, selectedYear])

  const stats = [
    {
      label: 'Phòng ban',
      value: phongBans?.length || 0,
      icon: Building2,
      color: 'cyan' as const,
      link: '/nhan-vien',
    },
    {
      label: 'Nhân viên',
      value: nhanViens?.length || 0,
      icon: Users,
      color: 'green' as const,
      link: '/nhan-vien',
    },
    {
      label: 'Khoản lương',
      value: khoanLuongs?.length || 0,
      icon: DollarSign,
      color: 'purple' as const,
      link: '/khoan-luong',
    },
    {
      label: 'Bảng lương',
      value: bangLuongs?.length || 0,
      icon: FileSpreadsheet,
      color: 'yellow' as const,
      link: '/bang-luong',
    },
  ]

  // Status badge mapping
  const getStatusBadge = (trangThai: string) => {
    switch (trangThai) {
      case 'NHAP':
        return <Badge variant="neutral" dot>Đang nhập</Badge>
      case 'DA_CHOT':
        return <Badge variant="success" dot>Đã chốt</Badge>
      case 'KHOA':
        return <Badge variant="info" dot>Đã khóa</Badge>
      default:
        return <Badge variant="neutral">{trangThai}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header với greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Sparkles size={24} className="text-[var(--accent)]" />
            Tổng quan Hệ thống
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Chào mừng trở lại! Đây là tổng quan hoạt động của bạn.
          </p>
        </div>
        <Link 
          to="/bang-luong" 
          className="
            inline-flex items-center gap-2 px-4 py-2.5 
            bg-[var(--accent)] text-[#0B1220] font-medium
            rounded-xl hover:bg-[var(--accent)]/90 
            shadow-lg shadow-[var(--accent)]/25
            transition-all duration-200
          "
        >
          <FileSpreadsheet size={18} />
          Tạo bảng lương
          <ArrowUpRight size={16} />
        </Link>
      </div>

      {/* Stats Grid - Sử dụng StatCard component */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} to={stat.link}>
              <StatCard
                title={stat.label}
                value={stat.value}
                icon={<Icon size={24} />}
                accentColor={stat.color}
              />
            </Link>
          )
        })}
      </div>

      {/* Tổng quỹ lương - Hero Card */}
      <Card 
        variant="glass" 
        className="
          relative overflow-hidden
          bg-gradient-to-br from-[#53F39A]/5 via-[var(--panel)] to-[#4FC3FF]/5
          border border-[var(--accent)]/20
        "
      >
        {/* Decorative gradient orb */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[var(--accent)]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#4FC3FF]/10 rounded-full blur-3xl" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="
              p-5 rounded-2xl
              bg-gradient-to-br from-[#53F39A] to-[#4FC3FF]
              shadow-lg shadow-[#53F39A]/30
            ">
              <TrendingUp size={32} className="text-[#0B1220]" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider font-medium">
                Tổng quỹ lương
              </p>
              <p className="text-4xl font-bold text-[var(--text-primary)] mt-1 tabular-nums">
                {formatTien(tongThucLinhTheoThang)}
                <span className="text-lg text-[var(--text-muted)] ml-2 font-normal">VNĐ</span>
              </p>
            </div>
          </div>

          {/* Month/Year Filter */}
          <div className="flex items-center gap-3">
            {/* Month Selector */}
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="
                  appearance-none pl-4 pr-10 py-2.5
                  bg-[var(--bg-2)] border border-[var(--border)]
                  rounded-xl text-[var(--text-primary)]
                  text-sm font-medium cursor-pointer
                  hover:border-[var(--accent)]/50
                  focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30
                  transition-all
                "
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    Tháng {month}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
            </div>

            {/* Year Selector */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="
                  appearance-none pl-4 pr-10 py-2.5
                  bg-[var(--bg-2)] border border-[var(--border)]
                  rounded-xl text-[var(--text-primary)]
                  text-sm font-medium cursor-pointer
                  hover:border-[var(--accent)]/50
                  focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30
                  transition-all
                "
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
            </div>
          </div>
        </div>
      </Card>

      {/* Bảng lương gần đây - Premium Table */}
      <Card variant="glass" padding="none">
        <CardHeader
          title={
            <span className="flex items-center gap-2">
              <Calendar size={20} className="text-[var(--accent)]" />
              Bảng lương gần đây
            </span>
          }
          action={
            <Link 
              to="/bang-luong" 
              className="
                flex items-center gap-1 text-sm text-[var(--text-muted)]
                hover:text-[var(--accent)] transition-colors
              "
            >
              Xem tất cả
              <ChevronRight size={16} />
            </Link>
          }
          className="px-5 pt-5"
        />

        {bangLuongs && bangLuongs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Tháng/Năm
                  </th>
                  <th className="text-left py-3 px-5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Phòng ban
                  </th>
                  <th className="text-right py-3 px-5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Số NV
                  </th>
                  <th className="text-right py-3 px-5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Thực lĩnh
                  </th>
                  <th className="text-center py-3 px-5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {bangLuongs.slice(0, 5).map((bl: any) => (
                  <tr 
                    key={bl.id} 
                    className="hover:bg-[var(--bg-2)] transition-colors group"
                  >
                    <td className="py-4 px-5">
                      <Link
                        to={`/bang-luong/${bl.id}`}
                        className="
                          font-medium text-[var(--text-primary)]
                          group-hover:text-[var(--accent)] transition-colors
                        "
                      >
                        Tháng {bl.thang}/{bl.nam}
                      </Link>
                    </td>
                    <td className="py-4 px-5 text-[var(--text-secondary)]">
                      {bl.phongBan?.tenPhongBan || 'Tất cả phòng ban'}
                    </td>
                    <td className="py-4 px-5 text-right text-[var(--text-secondary)] tabular-nums">
                      {bl.soNhanVien || 0}
                    </td>
                    <td className="py-4 px-5 text-right font-semibold text-[var(--accent)] tabular-nums">
                      {formatTien(bl.thucLinh)}
                    </td>
                    <td className="py-4 px-5 text-center">
                      {getStatusBadge(bl.trangThai)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 px-5">
            <div className="
              w-16 h-16 mx-auto mb-4 rounded-2xl
              bg-[var(--bg-2)] flex items-center justify-center
              text-[var(--text-muted)]
            ">
              <FileSpreadsheet size={28} />
            </div>
            <p className="text-[var(--text-muted)]">
              Chưa có bảng lương nào.{' '}
              <Link to="/bang-luong" className="text-[var(--accent)] hover:underline">
                Tạo bảng lương mới
              </Link>
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
