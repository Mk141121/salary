// Đơn yêu cầu của tôi - Nhân viên tạo và quản lý đơn OT/Trễ/Sớm/Công tác
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Plus,
  Send,
  Edit2,
  X,
  Eye,
  FileText,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  yeuCauApi,
  DonYeuCau,
  TaoDonYeuCauPayload,
  TrangThaiDonYeuCau,
  getTrangThaiLabel,
  getTrangThaiColor,
  getLoaiYeuCauIcon,
} from '../services/yeuCauApi';
import { nhanVienApi, NhanVien } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { VietnameseDatePicker } from '../components/VietnameseDatePicker';

export default function DonYeuCauCuaToi() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<DonYeuCau | null>(null);
  const [viewDetail, setViewDetail] = useState<DonYeuCau | null>(null);
  const [filterTrangThai, setFilterTrangThai] = useState<TrangThaiDonYeuCau | ''>('');
  const [filterLoai, setFilterLoai] = useState<number | ''>('');

  // Tìm nhân viên của user hiện tại
  const [currentNhanVien, setCurrentNhanVien] = useState<NhanVien | null>(null);

  const [formData, setFormData] = useState<TaoDonYeuCauPayload>({
    nhanVienId: 0,
    loaiYeuCauId: 0,
    ngayYeuCau: new Date().toISOString().split('T')[0],
    gioBatDau: '',
    gioKetThuc: '',
    diaDiem: '',
    lyDo: '',
  });

  // Lấy danh sách loại yêu cầu
  const { data: loaiYeuCaus } = useQuery({
    queryKey: ['loai-yeu-cau'],
    queryFn: () => yeuCauApi.layDanhSachLoai(),
  });

  // Lấy danh sách nhân viên
  const { data: nhanViens } = useQuery({
    queryKey: ['nhan-vien-don-gian'],
    queryFn: () => nhanVienApi.layTatCa(),
  });

  // Tìm nhân viên hiện tại từ user
  useEffect(() => {
    if (nhanViens && user) {
      const nhanVienList = Array.isArray(nhanViens) ? nhanViens : (nhanViens as any).data || [];
      const nv = nhanVienList.find(
        (n: NhanVien) => n.email === user.email || n.id === (user as any).nhanVienId
      );
      if (nv) {
        setCurrentNhanVien(nv);
        setFormData((prev) => ({ ...prev, nhanVienId: nv.id }));
      }
    }
  }, [nhanViens, user]);

  // Lấy danh sách đơn yêu cầu của tôi
  const { data: danhSachDon, isLoading } = useQuery({
    queryKey: ['don-yeu-cau-cua-toi', filterTrangThai, filterLoai],
    queryFn: () =>
      yeuCauApi.layDonCuaToi({
        trangThai: filterTrangThai || undefined,
        loaiYeuCauId: filterLoai || undefined,
        limit: 50,
      }),
    enabled: true,
  });

  // Lấy loại yêu cầu đã chọn
  const selectedLoai = loaiYeuCaus?.find((l) => l.id === formData.loaiYeuCauId);

  const taoDonMutation = useMutation({
    mutationFn: yeuCauApi.taoDon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['don-yeu-cau-cua-toi'] });
      toast.success('Tạo đơn yêu cầu thành công!');
      resetForm();
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const capNhatMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<TaoDonYeuCauPayload> }) =>
      yeuCauApi.capNhatDon(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['don-yeu-cau-cua-toi'] });
      toast.success('Cập nhật đơn thành công!');
      resetForm();
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const guiDuyetMutation = useMutation({
    mutationFn: yeuCauApi.guiDuyet,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['don-yeu-cau-cua-toi'] });
      toast.success(`Đã gửi đơn ${data.maDon} để duyệt!`);
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const huyDonMutation = useMutation({
    mutationFn: yeuCauApi.huyDon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['don-yeu-cau-cua-toi'] });
      toast.success('Đã hủy đơn!');
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const resetForm = () => {
    setFormData({
      nhanVienId: currentNhanVien?.id || 0,
      loaiYeuCauId: 0,
      ngayYeuCau: new Date().toISOString().split('T')[0],
      gioBatDau: '',
      gioKetThuc: '',
      diaDiem: '',
      lyDo: '',
    });
    setEditing(null);
    setShowModal(false);
  };

  const openEditModal = (don: DonYeuCau) => {
    setEditing(don);
    setFormData({
      nhanVienId: don.nhanVienId,
      loaiYeuCauId: don.loaiYeuCauId,
      ngayYeuCau: don.ngayYeuCau.split('T')[0],
      gioBatDau: don.gioBatDau || '',
      gioKetThuc: don.gioKetThuc || '',
      diaDiem: don.diaDiem || '',
      lyDo: don.lyDo,
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!formData.loaiYeuCauId) {
      toast.error('Vui lòng chọn loại yêu cầu');
      return;
    }
    if (!formData.lyDo.trim()) {
      toast.error('Vui lòng nhập lý do');
      return;
    }

    // Validate theo loại
    if (selectedLoai?.yeuCauGioBatDau && !formData.gioBatDau) {
      toast.error('Vui lòng nhập giờ bắt đầu');
      return;
    }
    if (selectedLoai?.yeuCauGioKetThuc && !formData.gioKetThuc) {
      toast.error('Vui lòng nhập giờ kết thúc');
      return;
    }
    if (selectedLoai?.yeuCauDiaDiem && !formData.diaDiem?.trim()) {
      toast.error('Vui lòng nhập địa điểm');
      return;
    }

    if (editing) {
      capNhatMutation.mutate({ id: editing.id, data: formData });
    } else {
      taoDonMutation.mutate(formData);
    }
  };

  const handleGuiDuyet = (don: DonYeuCau) => {
    if (confirm(`Gửi đơn ${don.maDon} để duyệt?`)) {
      guiDuyetMutation.mutate(don.id);
    }
  };

  const handleHuy = (don: DonYeuCau) => {
    if (confirm(`Hủy đơn ${don.maDon}?`)) {
      huyDonMutation.mutate(don.id);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN');
  };

  const danhSach = danhSachDon?.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Đơn yêu cầu của tôi
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Tạo và quản lý đơn OT, Trễ giờ, Về sớm, Công tác, Làm từ xa
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Tạo đơn mới
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={filterLoai}
          onChange={(e) => setFilterLoai(e.target.value ? Number(e.target.value) : '')}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">Tất cả loại</option>
          {loaiYeuCaus?.map((loai) => (
            <option key={loai.id} value={loai.id}>
              {getLoaiYeuCauIcon(loai.maLoai)} {loai.tenLoai}
            </option>
          ))}
        </select>

        <select
          value={filterTrangThai}
          onChange={(e) => setFilterTrangThai(e.target.value as TrangThaiDonYeuCau | '')}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="NHAP">Nháp</option>
          <option value="CHO_DUYET_1">Chờ duyệt (Cấp 1)</option>
          <option value="CHO_DUYET_2">Chờ duyệt (Cấp 2)</option>
          <option value="DA_DUYET">Đã duyệt</option>
          <option value="TU_CHOI">Từ chối</option>
          <option value="HUY">Đã hủy</option>
        </select>
      </div>

      {/* Danh sách đơn */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Đang tải...</div>
        ) : danhSach.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Chưa có đơn yêu cầu nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Mã đơn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Loại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Ngày
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Thời gian
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {danhSach.map((don) => (
                  <tr key={don.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900 dark:text-white">{don.maDon}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span>{getLoaiYeuCauIcon(don.loaiYeuCau?.maLoai || '')}</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {don.loaiYeuCau?.tenLoai}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      {formatDate(don.ngayYeuCau)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      {don.gioBatDau && don.gioKetThuc
                        ? `${don.gioBatDau} - ${don.gioKetThuc}`
                        : don.gioBatDau || '-'}
                      {don.soGio && (
                        <span className="ml-2 text-blue-600 dark:text-blue-400">
                          ({don.soGio}h)
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getTrangThaiColor(
                          don.trangThai
                        )}`}
                      >
                        {getTrangThaiLabel(don.trangThai)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setViewDetail(don)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {['NHAP', 'TU_CHOI'].includes(don.trangThai) && (
                          <>
                            <button
                              onClick={() => openEditModal(don)}
                              className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                              title="Sửa"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleGuiDuyet(don)}
                              className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Gửi duyệt"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {['NHAP', 'CHO_DUYET_1', 'CHO_DUYET_2', 'TU_CHOI'].includes(
                          don.trangThai
                        ) && (
                          <button
                            onClick={() => handleHuy(don)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hủy đơn"
                          >
                            <X className="w-4 h-4" />
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
      </div>

      {/* Modal tạo/sửa đơn */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editing ? 'Sửa đơn yêu cầu' : 'Tạo đơn yêu cầu mới'}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Loại yêu cầu */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Loại yêu cầu <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.loaiYeuCauId}
                  onChange={(e) =>
                    setFormData({ ...formData, loaiYeuCauId: Number(e.target.value) })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={!!editing}
                >
                  <option value={0}>-- Chọn loại yêu cầu --</option>
                  {loaiYeuCaus?.map((loai) => (
                    <option key={loai.id} value={loai.id}>
                      {getLoaiYeuCauIcon(loai.maLoai)} {loai.tenLoai}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ngày yêu cầu */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ngày <span className="text-red-500">*</span>
                </label>
                <VietnameseDatePicker
                  value={formData.ngayYeuCau}
                  onChange={(date) => setFormData({ ...formData, ngayYeuCau: date })}
                />
              </div>

              {/* Giờ bắt đầu */}
              {(selectedLoai?.yeuCauGioBatDau || formData.gioBatDau) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Giờ bắt đầu {selectedLoai?.yeuCauGioBatDau && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="time"
                    value={formData.gioBatDau}
                    onChange={(e) => setFormData({ ...formData, gioBatDau: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              )}

              {/* Giờ kết thúc */}
              {(selectedLoai?.yeuCauGioKetThuc || formData.gioKetThuc) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Giờ kết thúc {selectedLoai?.yeuCauGioKetThuc && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="time"
                    value={formData.gioKetThuc}
                    onChange={(e) => setFormData({ ...formData, gioKetThuc: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              )}

              {/* Địa điểm */}
              {(selectedLoai?.yeuCauDiaDiem || formData.diaDiem) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Địa điểm {selectedLoai?.yeuCauDiaDiem && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    value={formData.diaDiem}
                    onChange={(e) => setFormData({ ...formData, diaDiem: e.target.value })}
                    placeholder="Nhập địa điểm..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              )}

              {/* Lý do */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Lý do <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.lyDo}
                  onChange={(e) => setFormData({ ...formData, lyDo: e.target.value })}
                  placeholder="Nhập lý do yêu cầu..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                disabled={taoDonMutation.isPending || capNhatMutation.isPending}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {taoDonMutation.isPending || capNhatMutation.isPending
                  ? 'Đang lưu...'
                  : editing
                  ? 'Cập nhật'
                  : 'Tạo đơn'}
              </button>
            </div>
          </div>
        </div>
      )}

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
                  <p className="text-sm text-gray-500 dark:text-gray-400">Loại yêu cầu</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {getLoaiYeuCauIcon(viewDetail.loaiYeuCau?.maLoai || '')}{' '}
                    {viewDetail.loaiYeuCau?.tenLoai}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Trạng thái</p>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTrangThaiColor(
                      viewDetail.trangThai
                    )}`}
                  >
                    {getTrangThaiLabel(viewDetail.trangThai)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Ngày yêu cầu</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatDate(viewDetail.ngayYeuCau)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Thời gian</p>
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">Địa điểm</p>
                  <p className="font-medium text-gray-900 dark:text-white">{viewDetail.diaDiem}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Lý do</p>
                <p className="font-medium text-gray-900 dark:text-white">{viewDetail.lyDo}</p>
              </div>

              {/* Thông tin duyệt */}
              {viewDetail.nguoiDuyet1 && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Duyệt cấp 1</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {viewDetail.nguoiDuyet1.hoTen} -{' '}
                    {viewDetail.ngayDuyet1 && formatDate(viewDetail.ngayDuyet1)}
                  </p>
                  {viewDetail.ghiChuDuyet1 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {viewDetail.ghiChuDuyet1}
                    </p>
                  )}
                </div>
              )}

              {viewDetail.nguoiDuyet2 && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Duyệt cấp 2</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {viewDetail.nguoiDuyet2.hoTen} -{' '}
                    {viewDetail.ngayDuyet2 && formatDate(viewDetail.ngayDuyet2)}
                  </p>
                  {viewDetail.ghiChuDuyet2 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {viewDetail.ghiChuDuyet2}
                    </p>
                  )}
                </div>
              )}

              {viewDetail.lyDoTuChoi && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">Lý do từ chối</p>
                  <p className="text-red-700 dark:text-red-300">{viewDetail.lyDoTuChoi}</p>
                </div>
              )}

              {viewDetail.isOverride && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> Override
                  </p>
                  <p className="text-yellow-700 dark:text-yellow-300">{viewDetail.lyDoOverride}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
