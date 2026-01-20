// Trang tra cứu Sản lượng Chia hàng & Giao hàng
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../services/api'
import { 
  Package, Truck, Calendar, Search, Download,
  ChevronLeft, ChevronRight, AlertCircle, CheckCircle
} from 'lucide-react'

interface SanLuongChiaHang {
  id: number
  ngay: string
  nhanVienId: number
  soLuongSpDat: number
  soLuongSpLoi: number
  ghiChu: string | null
  nguonDuLieu: string
  nhanVien?: {
    maNhanVien: string
    hoTen: string
  }
}

interface GiaoHang {
  id: number
  ngay: string
  nhanVienId: number
  khoiLuongThanhCong: number
  soLanTreGio: number
  soLanKhongLayPhieu: number
  ghiChu: string | null
  nguonDuLieu: string
  nhanVien?: {
    maNhanVien: string
    hoTen: string
  }
}

export default function TraCuuSanLuong() {
  const [loai, setLoai] = useState<'chia-hang' | 'giao-hang'>('chia-hang')
  const [thang, setThang] = useState(new Date().getMonth() + 1)
  const [nam, setNam] = useState(new Date().getFullYear())
  const [page, setPage] = useState(1)
  const [tuKhoa, setTuKhoa] = useState('')
  const limit = 20

  // Query chia hàng
  const { data: chiaHangData, isLoading: loadingChiaHang } = useQuery({
    queryKey: ['san-luong', 'chia-hang', thang, nam, page, tuKhoa],
    queryFn: async () => {
      const res = await api.get('/san-luong/chia-hang', {
        params: { thang, nam, page, limit, tuKhoa }
      })
      return res.data
    },
    enabled: loai === 'chia-hang'
  })

  // Query giao hàng
  const { data: giaoHangData, isLoading: loadingGiaoHang } = useQuery({
    queryKey: ['san-luong', 'giao-hang', thang, nam, page, tuKhoa],
    queryFn: async () => {
      const res = await api.get('/san-luong/giao-hang', {
        params: { thang, nam, page, limit, tuKhoa }
      })
      return res.data
    },
    enabled: loai === 'giao-hang'
  })

  // Thống kê tổng hợp
  const { data: thongKe } = useQuery({
    queryKey: ['san-luong', 'thong-ke', loai, thang, nam],
    queryFn: async () => {
      const res = await api.get(`/san-luong/${loai}/thong-ke`, {
        params: { thang, nam }
      })
      return res.data
    }
  })

  const data = loai === 'chia-hang' ? chiaHangData : giaoHangData
  const isLoading = loai === 'chia-hang' ? loadingChiaHang : loadingGiaoHang
  const items = Array.isArray(data) ? data : (data?.data || [])
  const total = data?.pagination?.total || items.length
  const totalPages = Math.ceil(total / limit)

  const handleExport = async () => {
    try {
      const res = await api.get(`/san-luong/${loai}/export`, {
        params: { thang, nam },
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `san-luong-${loai}-${thang}-${nam}.xlsx`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Export error:', error)
    }
  }

  const formatNumber = (num: number) => num?.toLocaleString('vi-VN') || '0'

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tra cứu Sản lượng</h1>
          <p className="text-gray-500 mt-1">
            Xem chi tiết sản lượng Chia hàng và Giao hàng theo tháng
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Download size={18} />
          Xuất Excel
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => { setLoai('chia-hang'); setPage(1) }}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
            loai === 'chia-hang' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Package size={20} />
          Chia hàng
        </button>
        <button
          onClick={() => { setLoai('giao-hang'); setPage(1) }}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
            loai === 'giao-hang'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Truck size={20} />
          Giao hàng
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-400" />
          <select
            value={thang}
            onChange={(e) => { setThang(Number(e.target.value)); setPage(1) }}
            className="border rounded-lg px-3 py-2"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
            ))}
          </select>
          <select
            value={nam}
            onChange={(e) => { setNam(Number(e.target.value)); setPage(1) }}
            className="border rounded-lg px-3 py-2"
          >
            {[2024, 2025, 2026].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo mã NV, tên..."
              value={tuKhoa}
              onChange={(e) => { setTuKhoa(e.target.value); setPage(1) }}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Tổng: <span className="font-semibold">{formatNumber(total)}</span> bản ghi
        </div>
      </div>

      {/* Stats Cards */}
      {thongKe && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {loai === 'chia-hang' ? (
            <>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600">Tổng SP đạt</div>
                <div className="text-2xl font-bold text-blue-700">
                  {formatNumber(thongKe.tongSpDat)}
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-sm text-red-600">Tổng SP lỗi</div>
                <div className="text-2xl font-bold text-red-700">
                  {formatNumber(thongKe.tongSpLoi)}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-green-600">Tỷ lệ đạt</div>
                <div className="text-2xl font-bold text-green-700">
                  {thongKe.tyLeDat?.toFixed(1) || '0'}%
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-purple-600">Số NV</div>
                <div className="text-2xl font-bold text-purple-700">
                  {formatNumber(thongKe.soNhanVien)}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600">Tổng KL (kg)</div>
                <div className="text-2xl font-bold text-blue-700">
                  {formatNumber(thongKe.tongKhoiLuong)}
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-sm text-orange-600">Tổng trễ giờ</div>
                <div className="text-2xl font-bold text-orange-700">
                  {formatNumber(thongKe.tongTreGio)}
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-sm text-red-600">Không lấy phiếu</div>
                <div className="text-2xl font-bold text-red-700">
                  {formatNumber(thongKe.tongKhongLayPhieu)}
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-purple-600">Số NV</div>
                <div className="text-2xl font-bold text-purple-700">
                  {formatNumber(thongKe.soNhanVien)}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Ngày</th>
                <th className="px-4 py-3 text-left">Mã NV</th>
                <th className="px-4 py-3 text-left">Họ tên</th>
                {loai === 'chia-hang' ? (
                  <>
                    <th className="px-4 py-3 text-right">SP đạt</th>
                    <th className="px-4 py-3 text-right">SP lỗi</th>
                    <th className="px-4 py-3 text-right">Tỷ lệ lỗi</th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-3 text-right">KL (kg)</th>
                    <th className="px-4 py-3 text-right">Trễ giờ</th>
                    <th className="px-4 py-3 text-right">Không phiếu</th>
                  </>
                )}
                <th className="px-4 py-3 text-center">Nguồn</th>
                <th className="px-4 py-3 text-left">Ghi chú</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    Đang tải...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : loai === 'chia-hang' ? (
                items.map((item: SanLuongChiaHang) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {new Date(item.ngay).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {item.nhanVien?.maNhanVien || `NV${item.nhanVienId}`}
                    </td>
                    <td className="px-4 py-3">
                      {item.nhanVien?.hoTen || '-'}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-blue-600">
                      {formatNumber(item.soLuongSpDat)}
                    </td>
                    <td className="px-4 py-3 text-right text-red-600">
                      {formatNumber(item.soLuongSpLoi)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {item.soLuongSpDat > 0 
                        ? ((item.soLuongSpLoi / item.soLuongSpDat) * 100).toFixed(1) + '%'
                        : '-'
                      }
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                        item.nguonDuLieu === 'IMPORT_EXCEL' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {item.nguonDuLieu === 'IMPORT_EXCEL' ? (
                          <><CheckCircle size={12} /> Import</>
                        ) : (
                          'Nhập tay'
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate">
                      {item.ghiChu || '-'}
                    </td>
                  </tr>
                ))
              ) : (
                items.map((item: GiaoHang) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {new Date(item.ngay).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {item.nhanVien?.maNhanVien || `NV${item.nhanVienId}`}
                    </td>
                    <td className="px-4 py-3">
                      {item.nhanVien?.hoTen || '-'}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-blue-600">
                      {formatNumber(Number(item.khoiLuongThanhCong))}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {item.soLanTreGio > 0 ? (
                        <span className="text-orange-600 flex items-center justify-end gap-1">
                          <AlertCircle size={14} /> {item.soLanTreGio}
                        </span>
                      ) : (
                        <span className="text-green-600">0</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {item.soLanKhongLayPhieu > 0 ? (
                        <span className="text-red-600">{item.soLanKhongLayPhieu}</span>
                      ) : (
                        <span className="text-green-600">0</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                        item.nguonDuLieu === 'IMPORT_EXCEL'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {item.nguonDuLieu === 'IMPORT_EXCEL' ? (
                          <><CheckCircle size={12} /> Import</>
                        ) : (
                          'Nhập tay'
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate">
                      {item.ghiChu || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
            <div className="text-sm text-gray-600">
              Trang {page} / {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded border hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="p-2 rounded border hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
