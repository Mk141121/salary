// Duyệt yêu cầu - Manager/HR duyệt đơn OT/Trễ/Sớm/Công tác
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CheckCircle,
  XCircle,
  Eye,
  X,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Users,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  yeuCauApi,
  DonYeuCau,
  getTrangThaiLabel,
  getTrangThaiColor,
  getLoaiYeuCauIcon,
} from '../services/yeuCauApi';
import { phongBanApi, PhongBan } from '../services/api';

type TabType = 'cap1' | 'cap2' | 'tat-ca';

export default function DuyetYeuCau() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<TabType>('cap1');
  const [viewDetail, setViewDetail] = useState<DonYeuCau | null>(null);
  const [showTuChoiModal, setShowTuChoiModal] = useState<DonYeuCau | null>(null);
  const [showOverrideModal, setShowOverrideModal] = useState<DonYeuCau | null>(null);
  const [lyDoTuChoi, setLyDoTuChoi] = useState('');
  const [lyDoOverride, setLyDoOverride] = useState('');
  const [overrideDuyet, setOverrideDuyet] = useState(true);

  // Selected for batch
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Filters
  const [filters, setFilters] = useState({
    phongBanId: undefined as number | undefined,
    loaiYeuCauId: undefined as number | undefined,
    tuNgay: '',
    denNgay: '',
    page: 1,
  });

  // Lấy danh sách phòng ban
  const { data: phongBans } = useQuery({
    queryKey: ['phong-ban'],
    queryFn: phongBanApi.layTatCa,
  });

  // Lấy danh sách loại yêu cầu
  const { data: loaiYeuCaus } = useQuery({
    queryKey: ['loai-yeu-cau'],
    queryFn: () => yeuCauApi.layDanhSachLoai(),
  });

  // Lấy danh sách đơn theo tab
  const { data: danhSachDon, isLoading, refetch } = useQuery({
    queryKey: ['don-yeu-cau-duyet', activeTab, filters],
    queryFn: () => {
      if (activeTab === 'cap1') {
        return yeuCauApi.layInboxCap1({
          phongBanId: filters.phongBanId,
          loaiYeuCauId: filters.loaiYeuCauId,
          tuNgay: filters.tuNgay || undefined,
          denNgay: filters.denNgay || undefined,
          page: filters.page,
          limit: 20,
        });
      } else if (activeTab === 'cap2') {
        return yeuCauApi.layInboxCap2({
          phongBanId: filters.phongBanId,
          loaiYeuCauId: filters.loaiYeuCauId,
          tuNgay: filters.tuNgay || undefined,
          denNgay: filters.denNgay || undefined,
          page: filters.page,
          limit: 20,
        });
      } else {
        return yeuCauApi.layDanhSachDon({
          phongBanId: filters.phongBanId,
          loaiYeuCauId: filters.loaiYeuCauId,
          tuNgay: filters.tuNgay || undefined,
          denNgay: filters.denNgay || undefined,
          page: filters.page,
          limit: 20,
        });
      }
    },
  });

  // Mutations
  const duyetCap1Mutation = useMutation({
    mutationFn: (id: number) => yeuCauApi.duyetCap1(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['don-yeu-cau-duyet'] });
      toast.success(`Đã duyệt đơn ${data.maDon}!`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const duyetCap2Mutation = useMutation({
    mutationFn: (id: number) => yeuCauApi.duyetCap2(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['don-yeu-cau-duyet'] });
      toast.success(`Đã duyệt đơn ${data.maDon}!`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const tuChoiCap1Mutation = useMutation({
    mutationFn: ({ id, lyDo }: { id: number; lyDo: string }) => yeuCauApi.tuChoiCap1(id, lyDo),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['don-yeu-cau-duyet'] });
      toast.success(`Đã từ chối đơn ${data.maDon}`);
      setShowTuChoiModal(null);
      setLyDoTuChoi('');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const tuChoiCap2Mutation = useMutation({
    mutationFn: ({ id, lyDo }: { id: number; lyDo: string }) => yeuCauApi.tuChoiCap2(id, lyDo),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['don-yeu-cau-duyet'] });
      toast.success(`Đã từ chối đơn ${data.maDon}`);
      setShowTuChoiModal(null);
      setLyDoTuChoi('');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const overrideMutation = useMutation({
    mutationFn: ({ id, lyDo, duyet }: { id: number; lyDo: string; duyet: boolean }) =>
      yeuCauApi.override(id, lyDo, duyet),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['don-yeu-cau-duyet'] });
      toast.success(`Đã override đơn ${data.maDon}`);
      setShowOverrideModal(null);
      setLyDoOverride('');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const duyetBatchMutation = useMutation({
    mutationFn: ({ ids, cap }: { ids: number[]; cap: 1 | 2 }) => yeuCauApi.duyetBatch(ids, cap),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['don-yeu-cau-duyet'] });
      toast.success(`Đã duyệt ${result.success} đơn thành công!`);
      if (result.failed > 0) {
        toast.error(`${result.failed} đơn thất bại`);
      }
      setSelectedIds(new Set());
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN');
  };

  const handleDuyet = (don: DonYeuCau) => {
    if (don.trangThai === 'CHO_DUYET_1') {
      duyetCap1Mutation.mutate(don.id);
    } else if (don.trangThai === 'CHO_DUYET_2') {
      duyetCap2Mutation.mutate(don.id);
    }
  };

  const handleTuChoi = () => {
    if (!showTuChoiModal || !lyDoTuChoi.trim()) {
      toast.error('Vui lòng nhập lý do từ chối');
      return;
    }
    if (showTuChoiModal.trangThai === 'CHO_DUYET_1') {
      tuChoiCap1Mutation.mutate({ id: showTuChoiModal.id, lyDo: lyDoTuChoi });
    } else {
      tuChoiCap2Mutation.mutate({ id: showTuChoiModal.id, lyDo: lyDoTuChoi });
    }
  };

  const handleOverride = () => {
    if (!showOverrideModal || !lyDoOverride.trim()) {
      toast.error('Vui lòng nhập lý do override');
      return;
    }
    overrideMutation.mutate({ id: showOverrideModal.id, lyDo: lyDoOverride, duyet: overrideDuyet });
  };

  const handleDuyetBatch = () => {
    if (selectedIds.size === 0) {
      toast.error('Chưa chọn đơn nào');
      return;
    }
    const cap = activeTab === 'cap1' ? 1 : 2;
    duyetBatchMutation.mutate({ ids: Array.from(selectedIds), cap });
  };

  const toggleSelect = (id: number) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    const currentList = danhSachDon?.data || [];
    if (selectedIds.size === currentList.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(currentList.map((d) => d.id)));
    }
  };

  const danhSach = danhSachDon?.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Duyệt nghỉ phép</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Duyệt đơn nghỉ phép, OT, Trễ giờ, Về sớm, Công tác của nhân viên
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <RefreshCw className="w-4 h-4" />
          Làm mới
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            setActiveTab('cap1');
            setSelectedIds(new Set());
          }}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'cap1'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Cấp 1 (Manager)
        </button>
        <button
          onClick={() => {
            setActiveTab('cap2');
            setSelectedIds(new Set());
          }}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'cap2'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Cấp 2 (HR)
        </button>
        <button
          onClick={() => {
            setActiveTab('tat-ca');
            setSelectedIds(new Set());
          }}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'tat-ca'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Tất cả
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={filters.phongBanId || ''}
          onChange={(e) =>
            setFilters({ ...filters, phongBanId: e.target.value ? Number(e.target.value) : undefined, page: 1 })
          }
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">Tất cả phòng ban</option>
          {(phongBans as PhongBan[] | undefined)?.map((pb) => (
            <option key={pb.id} value={pb.id}>
              {pb.tenPhongBan}
            </option>
          ))}
        </select>

        <select
          value={filters.loaiYeuCauId || ''}
          onChange={(e) =>
            setFilters({ ...filters, loaiYeuCauId: e.target.value ? Number(e.target.value) : undefined, page: 1 })
          }
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">Tất cả loại</option>
          {loaiYeuCaus?.map((loai) => (
            <option key={loai.id} value={loai.id}>
              {getLoaiYeuCauIcon(loai.maLoai)} {loai.tenLoai}
            </option>
          ))}
        </select>

        {/* Batch actions */}
        {selectedIds.size > 0 && (activeTab === 'cap1' || activeTab === 'cap2') && (
          <button
            onClick={handleDuyetBatch}
            disabled={duyetBatchMutation.isPending}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <CheckCircle className="w-4 h-4" />
            Duyệt {selectedIds.size} đơn
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Đang tải...</div>
        ) : danhSach.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Không có đơn yêu cầu nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {(activeTab === 'cap1' || activeTab === 'cap2') && (
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === danhSach.length && danhSach.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded"
                      />
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Mã đơn
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Nhân viên
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Loại
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Ngày
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Thời gian
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {danhSach.map((don) => (
                  <tr key={don.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    {(activeTab === 'cap1' || activeTab === 'cap2') && (
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(don.id)}
                          onChange={() => toggleSelect(don.id)}
                          className="w-4 h-4 rounded"
                        />
                      </td>
                    )}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900 dark:text-white">{don.maDon}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {don.nhanVien?.hoTen}
                        </p>
                        <p className="text-sm text-gray-500">{don.nhanVien?.maNhanVien}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span>{getLoaiYeuCauIcon(don.loaiYeuCau?.maLoai || '')}</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {don.loaiYeuCau?.tenLoai}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      {formatDate(don.ngayYeuCau)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      {don.gioBatDau && don.gioKetThuc
                        ? `${don.gioBatDau} - ${don.gioKetThuc}`
                        : don.gioBatDau || '-'}
                      {don.soGio && (
                        <span className="ml-2 text-blue-600 dark:text-blue-400">({don.soGio}h)</span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getTrangThaiColor(
                          don.trangThai
                        )}`}
                      >
                        {getTrangThaiLabel(don.trangThai)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setViewDetail(don)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {['CHO_DUYET_1', 'CHO_DUYET_2'].includes(don.trangThai) && (
                          <>
                            <button
                              onClick={() => handleDuyet(don)}
                              className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Duyệt"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setShowTuChoiModal(don)}
                              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Từ chối"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {activeTab === 'tat-ca' && !['HUY'].includes(don.trangThai) && (
                          <button
                            onClick={() => {
                              setShowOverrideModal(don);
                              setOverrideDuyet(don.trangThai === 'TU_CHOI');
                            }}
                            className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                            title="Override"
                          >
                            <AlertTriangle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {danhSachDon?.pagination && danhSachDon.pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Trang {danhSachDon.pagination.page} / {danhSachDon.pagination.totalPages} (
              {danhSachDon.pagination.total} đơn)
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                disabled={filters.page <= 1}
                className="p-2 border rounded-lg disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                disabled={filters.page >= danhSachDon.pagination.totalPages}
                className="p-2 border rounded-lg disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal xem chi tiết */}
      {viewDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Chi tiết đơn {viewDetail.maDon}
              </h2>
              <button
                onClick={() => setViewDetail(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nhân viên</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {viewDetail.nhanVien?.hoTen} ({viewDetail.nhanVien?.maNhanVien})
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phòng ban</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {viewDetail.phongBan?.tenPhongBan}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Loại yêu cầu</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {getLoaiYeuCauIcon(viewDetail.loaiYeuCau?.maLoai || '')}{' '}
                    {viewDetail.loaiYeuCau?.tenLoai}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trạng thái</p>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTrangThaiColor(
                      viewDetail.trangThai
                    )}`}
                  >
                    {getTrangThaiLabel(viewDetail.trangThai)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ngày yêu cầu</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatDate(viewDetail.ngayYeuCau)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Thời gian</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {viewDetail.gioBatDau && viewDetail.gioKetThuc
                      ? `${viewDetail.gioBatDau} - ${viewDetail.gioKetThuc}`
                      : viewDetail.gioBatDau || '-'}
                    {viewDetail.soGio && ` (${viewDetail.soGio}h)`}
                  </p>
                </div>
              </div>

              {viewDetail.diaDiem && (
                <div>
                  <p className="text-sm text-gray-500">Địa điểm</p>
                  <p className="font-medium text-gray-900 dark:text-white">{viewDetail.diaDiem}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500">Lý do</p>
                <p className="font-medium text-gray-900 dark:text-white">{viewDetail.lyDo}</p>
              </div>

              {viewDetail.lyDoTuChoi && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-sm text-red-600 font-medium">Lý do từ chối</p>
                  <p className="text-red-700">{viewDetail.lyDoTuChoi}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            {['CHO_DUYET_1', 'CHO_DUYET_2'].includes(viewDetail.trangThai) && (
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowTuChoiModal(viewDetail);
                    setViewDetail(null);
                  }}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                >
                  Từ chối
                </button>
                <button
                  onClick={() => {
                    handleDuyet(viewDetail);
                    setViewDetail(null);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Duyệt
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal từ chối */}
      {showTuChoiModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Từ chối đơn {showTuChoiModal.maDon}
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Từ chối yêu cầu của <strong>{showTuChoiModal.nhanVien?.hoTen}</strong>?
              </p>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Lý do từ chối <span className="text-red-500">*</span>
              </label>
              <textarea
                value={lyDoTuChoi}
                onChange={(e) => setLyDoTuChoi(e.target.value)}
                placeholder="Nhập lý do từ chối..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              />
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowTuChoiModal(null);
                  setLyDoTuChoi('');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleTuChoi}
                disabled={tuChoiCap1Mutation.isPending || tuChoiCap2Mutation.isPending}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Từ chối
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Override */}
      {showOverrideModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Override đơn {showOverrideModal.maDon}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={overrideDuyet}
                    onChange={() => setOverrideDuyet(true)}
                    className="w-4 h-4"
                  />
                  <span className="text-green-600 font-medium">Override Duyệt</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!overrideDuyet}
                    onChange={() => setOverrideDuyet(false)}
                    className="w-4 h-4"
                  />
                  <span className="text-red-600 font-medium">Override Từ chối</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Lý do override <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={lyDoOverride}
                  onChange={(e) => setLyDoOverride(e.target.value)}
                  placeholder="Nhập lý do override..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowOverrideModal(null);
                  setLyDoOverride('');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleOverride}
                disabled={overrideMutation.isPending}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
              >
                Override
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
