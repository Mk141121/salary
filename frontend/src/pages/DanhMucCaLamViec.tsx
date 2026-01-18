// Danh mục Ca làm việc - Phase 2 Scheduling
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Plus,
  Edit2,
  Trash2,
  Clock,
  Moon,
  Sun,
  ToggleLeft,
  ToggleRight,
  Search,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { caLamViecService, CaLamViec, TaoCaLamViecPayload } from '../services/caLamViec.service';
import { phongBanApi } from '../services/api';
import { Card, Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter } from '../components/ui';

// Màu mặc định cho ca
const DEFAULT_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#84CC16', // Lime
];

export default function DanhMucCaLamViec() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editingCa, setEditingCa] = useState<CaLamViec | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterPhongBan, setFilterPhongBan] = useState<number | undefined>();
  const [filterTrangThai, setFilterTrangThai] = useState<boolean | undefined>();

  // Form data
  const [formData, setFormData] = useState<TaoCaLamViecPayload>({
    maCa: '',
    tenCa: '',
    gioVao: '08:00',
    gioRa: '17:00',
    nghiGiuaCaPhut: 60,
    graceInPhut: 5,
    graceLatePhut: 5,
    isCaDem: false,
    phongBanId: undefined,
    moTa: '',
    mauHienThi: DEFAULT_COLORS[0],
  });

  // Query data
  const { data: caLamViecs, isLoading } = useQuery({
    queryKey: ['ca-lam-viec', filterPhongBan, filterTrangThai, searchText],
    queryFn: () =>
      caLamViecService.layDanhSach({
        phongBanId: filterPhongBan,
        trangThai: filterTrangThai,
        tuKhoa: searchText || undefined,
      }),
  });

  const { data: phongBans } = useQuery({
    queryKey: ['phong-ban'],
    queryFn: phongBanApi.layTatCa,
  });

  // Mutations
  const taoMoiMutation = useMutation({
    mutationFn: caLamViecService.tao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ca-lam-viec'] });
      toast.success('Tạo ca làm việc thành công');
      closeModal();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const capNhatMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => caLamViecService.capNhat(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ca-lam-viec'] });
      toast.success('Cập nhật thành công');
      closeModal();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const xoaMutation = useMutation({
    mutationFn: caLamViecService.xoa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ca-lam-viec'] });
      toast.success('Đã xóa ca làm việc');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const toggleMutation = useMutation({
    mutationFn: caLamViecService.toggleTrangThai,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ca-lam-viec'] });
      toast.success(data.trangThai ? 'Đã kích hoạt ca' : 'Đã vô hiệu hóa ca');
    },
  });

  // Handlers
  const openCreateModal = () => {
    setEditingCa(null);
    setFormData({
      maCa: '',
      tenCa: '',
      gioVao: '08:00',
      gioRa: '17:00',
      nghiGiuaCaPhut: 60,
      graceInPhut: 5,
      graceLatePhut: 5,
      isCaDem: false,
      phongBanId: undefined,
      moTa: '',
      mauHienThi: DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)],
    });
    setShowModal(true);
  };

  const openEditModal = (ca: CaLamViec) => {
    setEditingCa(ca);
    setFormData({
      maCa: ca.maCa,
      tenCa: ca.tenCa,
      gioVao: ca.gioVao,
      gioRa: ca.gioRa,
      nghiGiuaCaPhut: ca.nghiGiuaCaPhut,
      graceInPhut: ca.graceInPhut,
      graceLatePhut: ca.graceLatePhut,
      isCaDem: ca.isCaDem,
      phongBanId: ca.phongBanId || undefined,
      moTa: ca.moTa || '',
      mauHienThi: ca.mauHienThi || DEFAULT_COLORS[0],
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCa(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.maCa || !formData.tenCa || !formData.gioVao || !formData.gioRa) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (editingCa) {
      capNhatMutation.mutate({
        id: editingCa.id,
        data: {
          tenCa: formData.tenCa,
          gioVao: formData.gioVao,
          gioRa: formData.gioRa,
          nghiGiuaCaPhut: formData.nghiGiuaCaPhut,
          graceInPhut: formData.graceInPhut,
          graceLatePhut: formData.graceLatePhut,
          isCaDem: formData.isCaDem,
          phongBanId: formData.phongBanId,
          moTa: formData.moTa,
          mauHienThi: formData.mauHienThi,
        },
      });
    } else {
      taoMoiMutation.mutate(formData);
    }
  };

  const handleDelete = (ca: CaLamViec) => {
    if (confirm(`Bạn có chắc muốn xóa ca "${ca.tenCa}"?`)) {
      xoaMutation.mutate(ca.id);
    }
  };

  // Tính số giờ làm
  const tinhSoGioLam = (gioVao: string, gioRa: string, nghiGiuaCa: number, isCaDem: boolean) => {
    const [vaoH, vaoM] = gioVao.split(':').map(Number);
    const [raH, raM] = gioRa.split(':').map(Number);

    let phutVao = vaoH * 60 + vaoM;
    let phutRa = raH * 60 + raM;

    if (isCaDem && phutRa < phutVao) {
      phutRa += 24 * 60;
    }

    const tongPhut = phutRa - phutVao - nghiGiuaCa;
    const gio = Math.floor(tongPhut / 60);
    const phut = tongPhut % 60;
    return `${gio}h${phut > 0 ? phut + 'p' : ''}`;
  };

  const danhSachCa = caLamViecs?.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Danh mục Ca làm việc</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Quản lý các ca làm việc trong công ty
          </p>
        </div>
        <Button onClick={openCreateModal} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Thêm ca mới
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo mã hoặc tên ca..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Filter phòng ban */}
          <select
            value={filterPhongBan || ''}
            onChange={(e) => setFilterPhongBan(e.target.value ? Number(e.target.value) : undefined)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          >
            <option value="">Tất cả phòng ban</option>
            {phongBans?.map((pb: any) => (
              <option key={pb.id} value={pb.id}>
                {pb.tenPhongBan}
              </option>
            ))}
          </select>

          {/* Filter trạng thái */}
          <select
            value={filterTrangThai === undefined ? '' : filterTrangThai ? 'active' : 'inactive'}
            onChange={(e) => {
              if (e.target.value === '') setFilterTrangThai(undefined);
              else setFilterTrangThai(e.target.value === 'active');
            }}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Ngừng hoạt động</option>
          </select>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  Màu
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  Mã ca
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  Tên ca
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  Giờ làm
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  Thời lượng
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  Phòng ban
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    Đang tải...
                  </td>
                </tr>
              ) : danhSachCa.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    Chưa có ca làm việc nào
                  </td>
                </tr>
              ) : (
                danhSachCa.map((ca: CaLamViec) => (
                  <tr
                    key={ca.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {/* Màu */}
                    <td className="px-4 py-3">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow"
                        style={{ backgroundColor: ca.mauHienThi || '#3B82F6' }}
                      />
                    </td>

                    {/* Mã ca */}
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                        {ca.maCa}
                      </span>
                    </td>

                    {/* Tên ca */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {ca.isCaDem ? (
                          <Moon className="w-4 h-4 text-indigo-500" />
                        ) : (
                          <Sun className="w-4 h-4 text-amber-500" />
                        )}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {ca.tenCa}
                        </span>
                      </div>
                    </td>

                    {/* Giờ làm */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">
                          {ca.gioVao} - {ca.gioRa}
                        </span>
                      </div>
                    </td>

                    {/* Thời lượng */}
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {tinhSoGioLam(ca.gioVao, ca.gioRa, ca.nghiGiuaCaPhut, ca.isCaDem)}
                      </span>
                    </td>

                    {/* Phòng ban */}
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {ca.phongBanId
                          ? phongBans?.find((pb: any) => pb.id === ca.phongBanId)?.tenPhongBan
                          : 'Toàn công ty'}
                      </span>
                    </td>

                    {/* Trạng thái */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleMutation.mutate(ca.id)}
                        className="inline-flex items-center gap-1"
                        title={ca.trangThai ? 'Click để vô hiệu hóa' : 'Click để kích hoạt'}
                      >
                        {ca.trangThai ? (
                          <>
                            <ToggleRight className="w-6 h-6 text-green-500" />
                            <Badge variant="success">Hoạt động</Badge>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-6 h-6 text-gray-400" />
                            <Badge variant="neutral">Ngừng</Badge>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Thao tác */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(ca)}
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(ca)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal Tạo/Sửa Ca */}
      <Modal isOpen={showModal} onClose={closeModal} size="lg">
        <form onSubmit={handleSubmit}>
          <ModalHeader title={editingCa ? 'Chỉnh sửa ca làm việc' : 'Thêm ca làm việc mới'} />

          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mã ca */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mã ca <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.maCa}
                  onChange={(e) =>
                    setFormData({ ...formData, maCa: e.target.value.toUpperCase() })
                  }
                  disabled={!!editingCa}
                  placeholder="VD: CA_HANH_CHINH"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 disabled:bg-gray-100"
                />
              </div>

              {/* Tên ca */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tên ca <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.tenCa}
                  onChange={(e) => setFormData({ ...formData, tenCa: e.target.value })}
                  placeholder="VD: Ca hành chính"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>

              {/* Giờ vào */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Giờ vào <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={formData.gioVao}
                  onChange={(e) => setFormData({ ...formData, gioVao: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>

              {/* Giờ ra */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Giờ ra <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={formData.gioRa}
                  onChange={(e) => setFormData({ ...formData, gioRa: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>

              {/* Nghỉ giữa ca */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nghỉ giữa ca (phút)
                </label>
                <input
                  type="number"
                  min={0}
                  max={120}
                  value={formData.nghiGiuaCaPhut}
                  onChange={(e) =>
                    setFormData({ ...formData, nghiGiuaCaPhut: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>

              {/* Phút cho phép trễ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phút được phép trễ
                </label>
                <input
                  type="number"
                  min={0}
                  max={60}
                  value={formData.graceLatePhut}
                  onChange={(e) =>
                    setFormData({ ...formData, graceLatePhut: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>

              {/* Phòng ban */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Áp dụng cho phòng ban
                </label>
                <select
                  value={formData.phongBanId || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phongBanId: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                >
                  <option value="">Toàn công ty</option>
                  {phongBans?.map((pb: any) => (
                    <option key={pb.id} value={pb.id}>
                      {pb.tenPhongBan}
                    </option>
                  ))}
                </select>
              </div>

              {/* Màu hiển thị */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Màu hiển thị
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.mauHienThi}
                    onChange={(e) => setFormData({ ...formData, mauHienThi: e.target.value })}
                    className="w-10 h-10 border-0 rounded cursor-pointer"
                  />
                  <div className="flex gap-1">
                    {DEFAULT_COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, mauHienThi: color })}
                        className={`w-6 h-6 rounded-full border-2 ${
                          formData.mauHienThi === color
                            ? 'border-gray-800 dark:border-white'
                            : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Ca đêm */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isCaDem}
                    onChange={(e) => setFormData({ ...formData, isCaDem: e.target.checked })}
                    className="w-4 h-4 text-primary-600 rounded"
                  />
                  <Moon className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Ca đêm (qua ngày, VD: 22:00 - 06:00)
                  </span>
                </label>
              </div>

              {/* Mô tả */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mô tả
                </label>
                <textarea
                  value={formData.moTa}
                  onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                  rows={2}
                  placeholder="Ghi chú về ca làm việc..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button variant="secondary" onClick={closeModal} type="button">
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={taoMoiMutation.isPending || capNhatMutation.isPending}
            >
              {taoMoiMutation.isPending || capNhatMutation.isPending
                ? 'Đang xử lý...'
                : editingCa
                  ? 'Cập nhật'
                  : 'Tạo mới'}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
