// Sổ lương nhân viên - Xem toàn bộ lịch sử lương của 1 NV
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Search,
  User,
  Calendar,
  TrendingUp,
  Download,
  FileSpreadsheet,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { nhanVienApi, soLuongApi, SoLuongNhanVienData, NhanVien, PaginatedResult } from '../services/api'
import { formatTien } from '../utils'
import { VietnameseMonthPicker } from '../components/VietnameseDatePicker'

export default function SoLuongNhanVien() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedNVId, setSelectedNVId] = useState<number | null>(null)
  const [tuThang, setTuThang] = useState(() => {
    const d = new Date()
    d.setMonth(d.getMonth() - 11)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  })
  const [denThang, setDenThang] = useState(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  })
  const [expandedSection, setExpandedSection] = useState<string | null>('bangLuongs')

  // Tìm kiếm nhân viên
  const { data: nhanViensRaw } = useQuery({
    queryKey: ['nhan-vien-search', searchTerm],
    queryFn: () => nhanVienApi.layTatCa({ tuKhoa: searchTerm, soLuong: 20 }),
    enabled: searchTerm.length >= 2,
  })
  const nhanViens = nhanViensRaw ? { data: Array.isArray(nhanViensRaw) ? nhanViensRaw : (nhanViensRaw as PaginatedResult<NhanVien>).data } : undefined

  // Lấy sổ lương
  const { data: soLuong, isLoading } = useQuery<SoLuongNhanVienData>({
    queryKey: ['so-luong-nv', selectedNVId, tuThang, denThang],
    queryFn: () =>
      soLuongApi.layNhanVien(selectedNVId!, {
        tuThang: Number(tuThang.split('-')[1]),
        tuNam: Number(tuThang.split('-')[0]),
        denThang: Number(denThang.split('-')[1]),
        denNam: Number(denThang.split('-')[0]),
      }),
    enabled: !!selectedNVId,
  })

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sổ lương nhân viên</h1>

      {/* Bộ lọc */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Tìm nhân viên */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tìm nhân viên
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nhập mã hoặc tên nhân viên..."
                className="w-full border rounded-lg px-3 py-2 pl-10"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              {nhanViens?.data && nhanViens.data.length > 0 && searchTerm.length >= 2 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {nhanViens.data.map((nv: NhanVien) => (
                    <button
                      key={nv.id}
                      onClick={() => {
                        setSelectedNVId(nv.id)
                        setSearchTerm(`${nv.maNhanVien} - ${nv.hoTen}`)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50"
                    >
                      <span className="font-medium">{nv.maNhanVien}</span> - {nv.hoTen}
                      <span className="text-gray-500 text-sm block">{nv.phongBan?.tenPhongBan}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
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

      {/* Thông tin NV & Tổng kết */}
      {soLuong && (
        <>
          <div className="card mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={32} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{soLuong.nhanVien.hoTen}</h2>
                <p className="text-gray-500">
                  {soLuong.nhanVien.maNhanVien} | {soLuong.nhanVien.phongBan?.tenPhongBan}
                </p>
              </div>
              <button className="btn btn-secondary ml-auto">
                <Download size={18} />
                Xuất Excel
              </button>
            </div>

            {/* Tổng kết */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Tổng lương</p>
                <p className="text-lg font-bold text-gray-800">{formatTien(soLuong.tongKet?.tongLuong ?? 0)}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Tổng thưởng</p>
                <p className="text-lg font-bold text-green-600">{formatTien(soLuong.tongKet?.tongThuong ?? 0)}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Tổng phạt</p>
                <p className="text-lg font-bold text-red-600">{formatTien(soLuong.tongKet?.tongPhat ?? 0)}</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Tổng khấu trừ</p>
                <p className="text-lg font-bold text-orange-600">{formatTien(soLuong.tongKet?.tongKhauTru ?? 0)}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Tổng ứng</p>
                <p className="text-lg font-bold text-purple-600">{formatTien(soLuong.tongKet?.tongUng ?? 0)}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Thực nhận</p>
                <p className="text-lg font-bold text-blue-600">{formatTien(soLuong.tongKet?.tongThucNhan ?? 0)}</p>
              </div>
            </div>
          </div>

          {/* Bảng lương */}
          <div className="card mb-4">
            <button
              onClick={() => toggleSection('bangLuongs')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileSpreadsheet size={20} />
                Lịch sử bảng lương ({soLuong.bangLuongs?.length ?? 0})
              </h3>
              {expandedSection === 'bangLuongs' ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSection === 'bangLuongs' && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-2 px-3">Tháng</th>
                      <th className="text-right py-2 px-3">Ngày công</th>
                      <th className="text-right py-2 px-3">Lương cơ bản</th>
                      <th className="text-right py-2 px-3">Phụ cấp</th>
                      <th className="text-right py-2 px-3">Thưởng</th>
                      <th className="text-right py-2 px-3">Khấu trừ</th>
                      <th className="text-right py-2 px-3">BHXH</th>
                      <th className="text-right py-2 px-3">Thuế TNCN</th>
                      <th className="text-right py-2 px-3">Thực lãnh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {soLuong.bangLuongs?.map((bl) => (
                      <tr key={bl.bangLuongId} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 font-medium">{bl.thangNam}</td>
                        <td className="py-2 px-3 text-right">{bl.ngayCong}</td>
                        <td className="py-2 px-3 text-right">{formatTien(bl.luongCoBan)}</td>
                        <td className="py-2 px-3 text-right">{formatTien(bl.phuCapTong)}</td>
                        <td className="py-2 px-3 text-right text-green-600">{formatTien(bl.thuongKPI + bl.thuongThuNhap)}</td>
                        <td className="py-2 px-3 text-right text-red-600">{formatTien(bl.khauTruTong + bl.ungLuong)}</td>
                        <td className="py-2 px-3 text-right">{formatTien(bl.bhxh + bl.bhyt + bl.bhtn)}</td>
                        <td className="py-2 px-3 text-right">{formatTien(bl.thueTNCN)}</td>
                        <td className="py-2 px-3 text-right font-bold text-blue-600">{formatTien(bl.thucLanh)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Phiếu điều chỉnh */}
          <div className="card mb-4">
            <button
              onClick={() => toggleSection('dieuChinhs')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar size={20} />
                Phiếu điều chỉnh ({soLuong.dieuChinhs?.length ?? 0})
              </h3>
              {expandedSection === 'dieuChinhs' ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSection === 'dieuChinhs' && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-2 px-3">Ngày</th>
                      <th className="text-left py-2 px-3">Loại phiếu</th>
                      <th className="text-left py-2 px-3">Khoản</th>
                      <th className="text-left py-2 px-3">Loại khoản</th>
                      <th className="text-right py-2 px-3">Số tiền</th>
                      <th className="text-left py-2 px-3">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    {soLuong.dieuChinhs?.map((dc, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">{new Date(dc.ngayTao).toLocaleDateString('vi-VN')}</td>
                        <td className="py-2 px-3">{dc.loaiPhieu}</td>
                        <td className="py-2 px-3">{dc.tenKhoanLuong}</td>
                        <td className="py-2 px-3">
                          <span className={dc.loaiKhoan === 'CONG_THEM' ? 'text-green-600' : 'text-red-600'}>
                            {dc.loaiKhoan === 'CONG_THEM' ? 'Cộng thêm' : 'Trừ bớt'}
                          </span>
                        </td>
                        <td className={`py-2 px-3 text-right ${dc.loaiKhoan === 'CONG_THEM' ? 'text-green-600' : 'text-red-600'}`}>
                          {dc.loaiKhoan === 'CONG_THEM' ? '+' : '-'}{formatTien(dc.soTien)}
                        </td>
                        <td className="py-2 px-3 text-gray-500">{dc.ghiChu}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Ứng lương */}
          <div className="card mb-4">
            <button
              onClick={() => toggleSection('ungLuongs')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp size={20} />
                Ứng lương ({soLuong.ungLuongs?.length ?? 0})
              </h3>
              {expandedSection === 'ungLuongs' ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSection === 'ungLuongs' && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-2 px-3">Mã bảng</th>
                      <th className="text-left py-2 px-3">Kỳ</th>
                      <th className="text-right py-2 px-3">Số tiền duyệt</th>
                      <th className="text-center py-2 px-3">Trạng thái</th>
                      <th className="text-left py-2 px-3">Ngày chốt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {soLuong.ungLuongs?.map((ul) => (
                      <tr key={ul.bangUngLuongId} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 font-medium">{ul.maBang}</td>
                        <td className="py-2 px-3">{ul.thangNam}</td>
                        <td className="py-2 px-3 text-right font-bold text-purple-600">{formatTien(ul.soTienDuyet)}</td>
                        <td className="py-2 px-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            ul.trangThai === 'DA_KHOA' ? 'bg-green-100 text-green-800' :
                            ul.trangThai === 'DA_CHOT' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {ul.trangThai === 'DA_KHOA' ? 'Đã khóa' : ul.trangThai === 'DA_CHOT' ? 'Đã chốt' : 'Nháp'}
                          </span>
                        </td>
                        <td className="py-2 px-3">{ul.ngayChot ? new Date(ul.ngayChot).toLocaleDateString('vi-VN') : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* KPI */}
          {soLuong.kpis && soLuong.kpis.length > 0 && (
            <div className="card mb-4">
              <button
                onClick={() => toggleSection('kpis')}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp size={20} />
                  Đánh giá KPI ({soLuong.kpis.length})
                </h3>
                {expandedSection === 'kpis' ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSection === 'kpis' && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-2 px-3">Tháng</th>
                        <th className="text-right py-2 px-3">Tổng điểm</th>
                        <th className="text-center py-2 px-3">Xếp loại</th>
                        <th className="text-right py-2 px-3">Tiền thưởng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {soLuong.kpis.map((kpi) => (
                        <tr key={kpi.kyDanhGiaId} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-3">{kpi.thang}/{kpi.nam}</td>
                          <td className="py-2 px-3 text-right">{kpi.tongDiem}</td>
                          <td className="py-2 px-3 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              kpi.xepLoai === 'A' ? 'bg-green-100 text-green-800' :
                              kpi.xepLoai === 'B' ? 'bg-blue-100 text-blue-800' :
                              kpi.xepLoai === 'C' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {kpi.xepLoai}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right text-green-600">{formatTien(kpi.tienThuong)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Thưởng/Phạt */}
          {soLuong.thuongPhats && soLuong.thuongPhats.length > 0 && (
            <div className="card">
              <button
                onClick={() => toggleSection('thuongPhats')}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar size={20} />
                  Thưởng/Phạt ({soLuong.thuongPhats.length})
                </h3>
                {expandedSection === 'thuongPhats' ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSection === 'thuongPhats' && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-2 px-3">Ngày</th>
                        <th className="text-center py-2 px-3">Loại</th>
                        <th className="text-left py-2 px-3">Tên</th>
                        <th className="text-right py-2 px-3">Số tiền</th>
                        <th className="text-left py-2 px-3">Lý do</th>
                      </tr>
                    </thead>
                    <tbody>
                      {soLuong.thuongPhats.map((tp) => (
                        <tr key={tp.suKienId} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-3">{new Date(tp.ngay).toLocaleDateString('vi-VN')}</td>
                          <td className="py-2 px-3 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              tp.loai === 'THUONG' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {tp.loai === 'THUONG' ? 'Thưởng' : 'Phạt'}
                            </span>
                          </td>
                          <td className="py-2 px-3">{tp.ten}</td>
                          <td className={`py-2 px-3 text-right ${tp.loai === 'THUONG' ? 'text-green-600' : 'text-red-600'}`}>
                            {tp.loai === 'THUONG' ? '+' : '-'}{formatTien(tp.soTien)}
                          </td>
                          <td className="py-2 px-3 text-gray-500">{tp.lyDo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Empty state */}
      {!selectedNVId && (
        <div className="card text-center py-12">
          <User size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Vui lòng chọn nhân viên để xem sổ lương</p>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  )
}
