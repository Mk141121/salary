// Lịch nghỉ phép - Xem lịch nghỉ dạng calendar
import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Calendar, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import {
  nghiPhepApi,
} from '../services/nghiPhepApi'
import { phongBanApi, PhongBan } from '../services/api'

export default function LichNghiPhep() {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  })
  const [filterPhongBan, setFilterPhongBan] = useState<number | undefined>()

  // Tính khoảng ngày từ tháng được chọn
  const { tuNgay, denNgay } = useMemo(() => {
    const [year, month] = selectedMonth.split('-').map(Number)
    const firstDay = new Date(year, month - 1, 1)
    const lastDay = new Date(year, month, 0)
    return {
      tuNgay: firstDay.toISOString().split('T')[0],
      denNgay: lastDay.toISOString().split('T')[0],
    }
  }, [selectedMonth])

  // Lấy danh sách phòng ban
  const { data: phongBans } = useQuery({
    queryKey: ['phong-ban'],
    queryFn: phongBanApi.layTatCa,
  })

  // Lấy lịch nghỉ
  const { data: lichNghi, isLoading } = useQuery({
    queryKey: ['lich-nghi', tuNgay, denNgay, filterPhongBan],
    queryFn: () =>
      nghiPhepApi.layLichNghi({
        phongBanId: filterPhongBan,
        tuNgay,
        denNgay,
      }),
  })

  // Tạo các ngày trong tháng
  const daysInMonth = useMemo(() => {
    const [year, month] = selectedMonth.split('-').map(Number)
    const firstDay = new Date(year, month - 1, 1)
    const lastDay = new Date(year, month, 0)
    const days: Date[] = []

    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d))
    }

    return days
  }, [selectedMonth])

  // Group lịch nghỉ theo nhân viên và ngày
  const lichNghiMap = useMemo(() => {
    const map = new Map<string, { loaiNghi: string; nhomLoai: string }>()
    lichNghi?.forEach((nv) => {
      nv.chiTietNgays.forEach((ct) => {
        const key = `${nv.nhanVien.id}-${ct.ngay.split('T')[0]}`
        map.set(key, {
          loaiNghi: ct.loaiNghi.tenLoaiNghi,
          nhomLoai: ct.loaiNghi.nhomLoai,
        })
      })
    })
    return map
  }, [lichNghi])

  const changeMonth = (delta: number) => {
    const [year, month] = selectedMonth.split('-').map(Number)
    const newDate = new Date(year, month - 1 + delta, 1)
    setSelectedMonth(
      `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}`
    )
  }

  const formatMonthYear = () => {
    const [year, month] = selectedMonth.split('-').map(Number)
    return `Tháng ${month}/${year}`
  }

  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="w-8 h-8 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Lịch nghỉ phép</h1>
            <p className="text-gray-500">Xem tổng quan lịch nghỉ phép của nhân viên</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold min-w-[140px] text-center">
              {formatMonthYear()}
            </h2>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterPhongBan || ''}
              onChange={(e) =>
                setFilterPhongBan(e.target.value ? parseInt(e.target.value) : undefined)
              }
              className="border rounded-lg px-3 py-2"
            >
              <option value="">Tất cả phòng ban</option>
              {phongBans?.map((pb: PhongBan) => (
                <option key={pb.id} value={pb.id}>
                  {pb.tenPhongBan}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-200 rounded"></span>
          <span>Nghỉ có phép</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-200 rounded"></span>
          <span>Nghỉ không phép</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-gray-200 rounded"></span>
          <span>Cuối tuần</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Đang tải...</div>
        ) : !lichNghi?.length ? (
          <div className="p-8 text-center text-gray-500">
            Không có lịch nghỉ phép trong tháng này
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="sticky left-0 bg-gray-50 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase min-w-[200px] border-r">
                    Nhân viên
                  </th>
                  {daysInMonth.map((day) => (
                    <th
                      key={day.toISOString()}
                      className={`px-2 py-3 text-center text-xs font-medium uppercase min-w-[36px] ${
                        isWeekend(day) ? 'bg-gray-100 text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      <div>{day.getDate()}</div>
                      <div className="text-[10px] font-normal">
                        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][day.getDay()]}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lichNghi.map((nv) => (
                  <tr key={nv.nhanVien.id} className="hover:bg-gray-50">
                    <td className="sticky left-0 bg-white px-4 py-2 border-r">
                      <div className="text-sm font-medium text-gray-900">
                        {nv.nhanVien.hoTen}
                      </div>
                      <div className="text-xs text-gray-500">{nv.nhanVien.maNhanVien}</div>
                    </td>
                    {daysInMonth.map((day) => {
                      const dateStr = day.toISOString().split('T')[0]
                      const key = `${nv.nhanVien.id}-${dateStr}`
                      const nghi = lichNghiMap.get(key)

                      return (
                        <td
                          key={day.toISOString()}
                          className={`px-1 py-2 text-center ${
                            isWeekend(day) ? 'bg-gray-50' : ''
                          }`}
                        >
                          {nghi && (
                            <div
                              className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-xs font-medium cursor-pointer ${
                                nghi.nhomLoai === 'CO_PHEP'
                                  ? 'bg-green-200 text-green-800'
                                  : 'bg-red-200 text-red-800'
                              }`}
                              title={nghi.loaiNghi}
                            >
                              {nghi.nhomLoai === 'CO_PHEP' ? 'P' : 'K'}
                            </div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      {lichNghi && lichNghi.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium text-gray-700 mb-3">Thống kê tháng {formatMonthYear()}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">
                {lichNghi.length}
              </div>
              <div className="text-sm text-gray-500">Nhân viên có nghỉ</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {lichNghi.reduce(
                  (sum, nv) =>
                    sum +
                    nv.chiTietNgays.filter((ct) => ct.loaiNghi.nhomLoai === 'CO_PHEP')
                      .length,
                  0
                )}
              </div>
              <div className="text-sm text-gray-500">Ngày nghỉ có phép</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {lichNghi.reduce(
                  (sum, nv) =>
                    sum +
                    nv.chiTietNgays.filter((ct) => ct.loaiNghi.nhomLoai === 'KHONG_PHEP')
                      .length,
                  0
                )}
              </div>
              <div className="text-sm text-gray-500">Ngày nghỉ không phép</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {lichNghi.reduce((sum, nv) => sum + nv.chiTietNgays.length, 0)}
              </div>
              <div className="text-sm text-gray-500">Tổng ngày nghỉ</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
