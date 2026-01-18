// Trang cấu hình Geofence - Sprint 7 Anti-fraud
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Navigation,
  AlertTriangle,
  CheckCircle,
  Search,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { antiFraudApi, Geofence, TaoGeofenceDto, getCurrentPosition } from '../services/antiFraudApi';
import { phongBanApi } from '../services/api';
import { Card, Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter } from '../components/ui';

export default function CauHinhGeofence() {
  const queryClient = useQueryClient();

  // State
  const [showModal, setShowModal] = useState(false);
  const [editingGeofence, setEditingGeofence] = useState<Geofence | null>(null);
  const [filterPhongBan, setFilterPhongBan] = useState<number | undefined>();
  const [searchText, setSearchText] = useState('');

  // Form state
  const [formData, setFormData] = useState<TaoGeofenceDto>({
    tenDiaDiem: '',
    diaChi: '',
    viDo: 0,
    kinhDo: 0,
    banKinhMet: 100,
    phongBanId: undefined,
    apDungTatCa: false,
    batBuocGPS: true,
    chanNgoaiVung: false,
  });

  // Queries
  const { data: geofences, isLoading } = useQuery({
    queryKey: ['geofences', filterPhongBan],
    queryFn: () => antiFraudApi.layDanhSachGeofence({ phongBanId: filterPhongBan }),
  });

  const { data: phongBans } = useQuery({
    queryKey: ['phong-ban'],
    queryFn: phongBanApi.layTatCa,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: antiFraudApi.taoGeofence,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['geofences'] });
      toast.success('Tạo geofence thành công');
      closeModal();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<TaoGeofenceDto> }) =>
      antiFraudApi.capNhatGeofence(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['geofences'] });
      toast.success('Cập nhật thành công');
      closeModal();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: antiFraudApi.xoaGeofence,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['geofences'] });
      toast.success('Xóa thành công');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, trangThai }: { id: number; trangThai: boolean }) =>
      antiFraudApi.capNhatGeofence(id, { trangThai }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['geofences'] });
      toast.success('Cập nhật trạng thái thành công');
    },
  });

  // Handlers
  const openCreateModal = () => {
    setEditingGeofence(null);
    setFormData({
      tenDiaDiem: '',
      diaChi: '',
      viDo: 0,
      kinhDo: 0,
      banKinhMet: 100,
      phongBanId: undefined,
      apDungTatCa: false,
      batBuocGPS: true,
      chanNgoaiVung: false,
    });
    setShowModal(true);
  };

  const openEditModal = (gf: Geofence) => {
    setEditingGeofence(gf);
    setFormData({
      tenDiaDiem: gf.tenDiaDiem,
      diaChi: gf.diaChi || '',
      viDo: gf.viDo,
      kinhDo: gf.kinhDo,
      banKinhMet: gf.banKinhMet,
      phongBanId: gf.phongBanId,
      apDungTatCa: gf.apDungTatCa,
      batBuocGPS: gf.batBuocGPS,
      chanNgoaiVung: gf.chanNgoaiVung,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingGeofence(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.tenDiaDiem.trim()) {
      toast.error('Vui lòng nhập tên địa điểm');
      return;
    }

    if (formData.viDo === 0 && formData.kinhDo === 0) {
      toast.error('Vui lòng nhập tọa độ GPS');
      return;
    }

    if (editingGeofence) {
      updateMutation.mutate({ id: editingGeofence.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (gf: Geofence) => {
    if (confirm(`Bạn có chắc muốn xóa geofence "${gf.tenDiaDiem}"?`)) {
      deleteMutation.mutate(gf.id);
    }
  };

  const handleGetCurrentLocation = async () => {
    try {
      const pos = await getCurrentPosition();
      setFormData({
        ...formData,
        viDo: pos.viDo,
        kinhDo: pos.kinhDo,
      });
      toast.success('Đã lấy vị trí hiện tại');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Filter geofences
  const filteredGeofences = geofences?.filter((gf: Geofence) =>
    gf.tenDiaDiem.toLowerCase().includes(searchText.toLowerCase()) ||
    gf.diaChi?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Cấu hình Geofence
          </h1>
          <p className="text-[var(--text-muted)]">
            Quản lý vùng địa lý cho phép chấm công GPS
          </p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm địa điểm
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm địa điểm..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="sm:w-64">
            <select
              value={filterPhongBan || ''}
              onChange={(e) => setFilterPhongBan(e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Tất cả phòng ban</option>
              {phongBans?.map((pb: any) => (
                <option key={pb.id} value={pb.id}>
                  {pb.tenPhongBan}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Geofence List */}
      <Card>
        {isLoading ? (
          <div className="p-8 text-center text-[var(--text-muted)]">
            Đang tải...
          </div>
        ) : !filteredGeofences?.length ? (
          <div className="p-8 text-center text-[var(--text-muted)]">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Chưa có geofence nào được cấu hình</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--bg-secondary)] border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Địa điểm</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Tọa độ</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Bán kính</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Áp dụng</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Cấu hình</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Trạng thái</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredGeofences.map((gf: Geofence) => (
                  <tr key={gf.id} className="hover:bg-[var(--bg-secondary)]/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium">{gf.tenDiaDiem}</p>
                          {gf.diaChi && (
                            <p className="text-sm text-[var(--text-muted)]">{gf.diaChi}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {gf.viDo.toFixed(6)}, {gf.kinhDo.toFixed(6)}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-medium">{gf.banKinhMet}m</span>
                    </td>
                    <td className="px-4 py-3">
                      {gf.apDungTatCa ? (
                        <Badge variant="info">Toàn công ty</Badge>
                      ) : (
                        <span className="text-sm text-[var(--text-muted)]">
                          Phòng ban #{gf.phongBanId}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        {gf.batBuocGPS && (
                          <Badge variant="warning" className="text-xs">
                            <Navigation className="w-3 h-3 mr-1" />
                            GPS bắt buộc
                          </Badge>
                        )}
                        {gf.chanNgoaiVung && (
                          <Badge variant="danger" className="text-xs">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Chặn ngoài vùng
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleStatusMutation.mutate({ id: gf.id, trangThai: !gf.trangThai })}
                        className="inline-flex items-center gap-1"
                      >
                        {gf.trangThai ? (
                          <>
                            <ToggleRight className="w-6 h-6 text-green-500" />
                            <Badge variant="success">Hoạt động</Badge>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-6 h-6 text-gray-400" />
                            <Badge variant="neutral">Tắt</Badge>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(gf)}
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(gf)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal Tạo/Sửa Geofence */}
      <Modal isOpen={showModal} onClose={closeModal} size="lg">
        <form onSubmit={handleSubmit}>
          <ModalHeader title={editingGeofence ? 'Chỉnh sửa Geofence' : 'Thêm địa điểm mới'} />

          <ModalBody>
            <div className="space-y-4">
              {/* Tên địa điểm */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tên địa điểm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.tenDiaDiem}
                  onChange={(e) => setFormData({ ...formData, tenDiaDiem: e.target.value })}
                  placeholder="VD: Văn phòng chính, Nhà máy ABC..."
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              {/* Địa chỉ */}
              <div>
                <label className="block text-sm font-medium mb-1">Địa chỉ</label>
                <input
                  type="text"
                  value={formData.diaChi}
                  onChange={(e) => setFormData({ ...formData, diaChi: e.target.value })}
                  placeholder="Địa chỉ đầy đủ..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              {/* Tọa độ GPS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Vĩ độ (Latitude) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.viDo}
                    onChange={(e) => setFormData({ ...formData, viDo: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Kinh độ (Longitude) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.kinhDo}
                    onChange={(e) => setFormData({ ...formData, kinhDo: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Button lấy vị trí hiện tại */}
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGetCurrentLocation}
                  className="w-full"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Lấy vị trí hiện tại
                </Button>
              </div>

              {/* Bán kính */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Bán kính cho phép (mét) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="10"
                  max="5000"
                  value={formData.banKinhMet}
                  onChange={(e) => setFormData({ ...formData, banKinhMet: parseInt(e.target.value) || 100 })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Khoảng cách tối đa từ điểm check-in đến tâm geofence
                </p>
              </div>

              {/* Phạm vi áp dụng */}
              <div>
                <label className="block text-sm font-medium mb-2">Phạm vi áp dụng</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.apDungTatCa}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          apDungTatCa: e.target.checked,
                          phongBanId: e.target.checked ? undefined : formData.phongBanId,
                        })
                      }
                      className="rounded"
                    />
                    <span>Áp dụng cho toàn công ty</span>
                  </label>
                </div>
                {!formData.apDungTatCa && (
                  <select
                    value={formData.phongBanId || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phongBanId: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg mt-2"
                  >
                    <option value="">Chọn phòng ban...</option>
                    {phongBans?.map((pb: any) => (
                      <option key={pb.id} value={pb.id}>
                        {pb.tenPhongBan}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Cấu hình */}
              <div className="border-t pt-4">
                <label className="block text-sm font-medium mb-2">Cấu hình bảo mật</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.batBuocGPS}
                      onChange={(e) => setFormData({ ...formData, batBuocGPS: e.target.checked })}
                      className="rounded"
                    />
                    <div>
                      <p className="font-medium">Bắt buộc bật GPS</p>
                      <p className="text-sm text-[var(--text-muted)]">
                        Nhân viên phải bật GPS khi chấm công
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.chanNgoaiVung}
                      onChange={(e) => setFormData({ ...formData, chanNgoaiVung: e.target.checked })}
                      className="rounded"
                    />
                    <div>
                      <p className="font-medium text-red-600">Chặn check-in ngoài vùng</p>
                      <p className="text-sm text-[var(--text-muted)]">
                        Không cho phép chấm công nếu ngoài bán kính cho phép
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button type="button" variant="secondary" onClick={closeModal}>
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending ? (
                'Đang lưu...'
              ) : editingGeofence ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Cập nhật
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo mới
                </>
              )}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
