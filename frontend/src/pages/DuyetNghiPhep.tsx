// Duyệt nghỉ phép - Quản lý duyệt/từ chối đơn nghỉ phép
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  CheckCircle,
  XCircle,
  Eye,
  X,
  Filter,
  RefreshCw,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import toast from 'react-hot-toast'
import {
  nghiPhepApi,
  DonNghiPhep,
  TrangThaiDonNghiPhep,
  getTrangThaiLabel,
  getTrangThaiColor,
} from '../services/nghiPhepApi'
import { phongBanApi, PhongBan } from '../services/api'
import { VietnameseDatePicker } from '../components/VietnameseDatePicker'

export default function DuyetNghiPhep() {
  const queryClient = useQueryClient()
  const [viewDetail, setViewDetail] = useState<DonNghiPhep | null>(null)
  const [showTuChoiModal, setShowTuChoiModal] = useState<DonNghiPhep | null>(null)
  const [lyDoTuChoi, setLyDoTuChoi] = useState('')

  // Filters
  const [filters, setFilters] = useState({
    phongBanId: undefined as number | undefined,
    trangThai: 'GUI_DUYET' as TrangThaiDonNghiPhep | '',
    tuNgay: '',
    denNgay: '',
    page: 1,
  })

  // Lấy danh sách phòng ban
  const { data: phongBans } = useQuery({
    queryKey: ['phong-ban'],
    queryFn: phongBanApi.layTatCa,
  })

  // Lấy danh sách đơn nghỉ
  const { data: danhSachDon, isLoading, refetch } = useQuery({
    queryKey: ['don-nghi-phep-duyet', filters],
    queryFn: () =>
      nghiPhepApi.layDanhSachDon({
        phongBanId: filters.phongBanId,
        trangThai: filters.trangThai || undefined,
        tuNgay: filters.tuNgay || undefined,
        denNgay: filters.denNgay || undefined,
        page: filters.page,
        limit: 20,
      }),
  })

  const duyetMutation = useMutation({
    mutationFn: (id: number) => nghiPhepApi.duyetDon(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['don-nghi-phep-duyet'] })
      toast.success(`Đã duyệt đơn ${data.maDon}!`)
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi duyệt')
    },
  })

  const tuChoiMutation = useMutation({
    mutationFn: ({ id, lyDo }: { id: number; lyDo: string }) =>
      nghiPhepApi.tuChoiDon(id, lyDo),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['don-nghi-phep-duyet'] })
      toast.success(`Đã từ chối đơn ${data.maDon}`)
      setShowTuChoiModal(null)
      setLyDoTuChoi('')
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const rebuildMappingMutation = useMutation({
    mutationFn: nghiPhepApi.rebuildMapping,
    onSuccess: (data) => {
      toast.success(`Đã rebuild mapping: ${data.soNgayTao} ngày`)
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
    },
  })

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN')
  }

  const handleTuChoi = () => {
    if (!showTuChoiModal) return
    if (!lyDoTuChoi.trim()) {
      toast.error('Vui lòng nhập lý do từ chối')
      return
    }
    tuChoiMutation.mutate({ id: showTuChoiModal.id, lyDo: lyDoTuChoi })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-green-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Duyệt nghỉ phép</h1>
            <p className="text-gray-500">Xem xét và phê duyệt đơn nghỉ phép của nhân viên</p>
          </div>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          <RefreshCw className="w-4 h-4" />
          Làm mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Filter className="w-4 h-4 inline mr-1" />
              Phòng ban
            </label>
            <select
              value={filters.phongBanId || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  phongBanId: e.target.value ? parseInt(e.target.value) : undefined,
                  page: 1,
                })
              }
              className="border rounded-lg px-3 py-2 min-w-[180px]"
            >
              <option value="">Tất cả phòng ban</option>
              {phongBans?.map((pb: PhongBan) => (
                <option key={pb.id} value={pb.id}>
                  {pb.tenPhongBan}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái
            </label>
            <select
              value={filters.trangThai}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  trangThai: e.target.value as TrangThaiDonNghiPhep | '',
                  page: 1,
                })
              }
              className="border rounded-lg px-3 py-2"
            >
              <option value="">Tất cả</option>
              <option value="GUI_DUYET">Chờ duyệt</option>
              <option value="DA_DUYET">Đã duyệt</option>
              <option value="TU_CHOI">Từ chối</option>
              <option value="NHAP">Nháp</option>
              <option value="HUY">Đã hủy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Từ ngày
            </label>
            <VietnameseDatePicker
              value={filters.tuNgay}
              onChange={(val) =>
                setFilters({ ...filters, tuNgay: val, page: 1 })
              }
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Đến ngày
            </label>
            <VietnameseDatePicker
              value={filters.denNgay}
              onChange={(val) =>
                setFilters({ ...filters, denNgay: val, page: 1 })
              }
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <button
            onClick={() =>
              setFilters({
                phongBanId: undefined,
                trangThai: 'GUI_DUYET',
                tuNgay: '',
                denNgay: '',
                page: 1,
              })
            }
            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Đặt lại
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Mã đơn
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nhân viên
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Phòng ban
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Loại nghỉ
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Thời gian
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Số ngày
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Trạng thái
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                  Đang tải...
                </td>
              </tr>
            ) : danhSachDon?.items?.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                  Không có đơn nghỉ phép nào
                </td>
              </tr>
            ) : (
              danhSachDon?.items?.map((don) => (
                <tr key={don.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap font-mono text-sm text-gray-900">
                    {don.maDon}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {don.nhanVien.hoTen}
                    </div>
                    <div className="text-xs text-gray-500">{don.nhanVien.maNhanVien}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {don.phongBan.tenPhongBan}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {don.loaiNghi.tenLoaiNghi}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(don.tuNgay)} - {formatDate(don.denNgay)}
                  </td>
                  <td className="px-4 py-3 text-center text-sm font-medium text-gray-900">
                    {don.soNgayNghi}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full bg-${getTrangThaiColor(
                        don.trangThai
                      )}-100 text-${getTrangThaiColor(don.trangThai)}-800`}
                    >
                      {getTrangThaiLabel(don.trangThai)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setViewDetail(don)}
                      className="text-gray-600 hover:text-gray-900 mr-2"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {don.trangThai === 'GUI_DUYET' && (
                      <>
                        <button
                          onClick={() => duyetMutation.mutate(don.id)}
                          disabled={duyetMutation.isPending}
                          className="text-green-600 hover:text-green-900 mr-2"
                          title="Duyệt"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowTuChoiModal(don)}
                          className="text-red-600 hover:text-red-900"
                          title="Từ chối"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {don.trangThai === 'DA_DUYET' && (
                      <button
                        onClick={() => rebuildMappingMutation.mutate(don.id)}
                        disabled={rebuildMappingMutation.isPending}
                        className="text-blue-600 hover:text-blue-900"
                        title="Rebuild mapping"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {danhSachDon?.pagination && danhSachDon.pagination.totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Trang {danhSachDon.pagination.page} / {danhSachDon.pagination.totalPages} (
              {danhSachDon.pagination.total} đơn)
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setFilters({ ...filters, page: filters.page - 1 })
                }
                disabled={filters.page <= 1}
                className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setFilters({ ...filters, page: filters.page + 1 })
                }
                disabled={filters.page >= danhSachDon.pagination.totalPages}
                className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

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
                <span className="text-sm text-gray-500">Nhân viên</span>
                <p className="font-medium">
                  {viewDetail.nhanVien.hoTen} ({viewDetail.nhanVien.maNhanVien})
                </p>
              </div>

              <div>
                <span className="text-sm text-gray-500">Phòng ban</span>
                <p className="font-medium">{viewDetail.phongBan.tenPhongBan}</p>
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

            <div className="flex justify-end gap-3 mt-6">
              {viewDetail.trangThai === 'GUI_DUYET' && (
                <>
                  <button
                    onClick={() => {
                      setViewDetail(null)
                      setShowTuChoiModal(viewDetail)
                    }}
                    className="px-4 py-2 text-red-600 hover:text-red-800"
                  >
                    Từ chối
                  </button>
                  <button
                    onClick={() => {
                      duyetMutation.mutate(viewDetail.id)
                      setViewDetail(null)
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Duyệt đơn
                  </button>
                </>
              )}
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

      {/* Modal từ chối */}
      {showTuChoiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-red-600">Từ chối đơn nghỉ</h2>

            <p className="text-gray-600 mb-4">
              Từ chối đơn <strong>{showTuChoiModal.maDon}</strong> của{' '}
              <strong>{showTuChoiModal.nhanVien.hoTen}</strong>?
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lý do từ chối <span className="text-red-500">*</span>
              </label>
              <textarea
                value={lyDoTuChoi}
                onChange={(e) => setLyDoTuChoi(e.target.value)}
                rows={3}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Nhập lý do từ chối..."
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowTuChoiModal(null)
                  setLyDoTuChoi('')
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Hủy
              </button>
              <button
                onClick={handleTuChoi}
                disabled={tuChoiMutation.isPending}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {tuChoiMutation.isPending ? 'Đang xử lý...' : 'Từ chối'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
