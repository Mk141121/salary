// Yêu cầu - Employee Portal
// Sprint 5: Xem và tạo yêu cầu OT/Trễ/Sớm/Công tác
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Clock, Check, X, AlertCircle, ChevronRight, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

interface YeuCau {
  id: number;
  loai: string;
  tenLoai: string;
  ngay: string;
  soGio: number | null;
  lyDo: string;
  trangThai: string;
  ngayTao: string;
}

const LOAI_YEU_CAU = [
  // Nghỉ phép
  { value: 'NGHI_PHEP', label: 'Nghỉ phép năm', icon: '🏖️', nhom: 'NGHI_PHEP' },
  { value: 'NGHI_KHONG_LUONG', label: 'Nghỉ không lương', icon: '📝', nhom: 'NGHI_PHEP' },
  { value: 'NGHI_OM', label: 'Nghỉ ốm', icon: '🏥', nhom: 'NGHI_PHEP' },
  { value: 'NGHI_VIEC_RIENG', label: 'Nghỉ việc riêng', icon: '👨‍👩‍👧', nhom: 'NGHI_PHEP' },
  // Thời gian
  { value: 'OT', label: 'Làm thêm giờ', icon: '⏰', nhom: 'THOI_GIAN' },
  { value: 'TRE_GIO', label: 'Đi trễ', icon: '🕐', nhom: 'THOI_GIAN' },
  { value: 'VE_SOM', label: 'Về sớm', icon: '🏃', nhom: 'THOI_GIAN' },
  // Di chuyển
  { value: 'CONG_TAC', label: 'Công tác', icon: '✈️', nhom: 'DI_CHUYEN' },
  { value: 'WFH', label: 'Làm việc từ xa', icon: '🏠', nhom: 'DI_CHUYEN' },
];

export default function PortalRequests() {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<string>('ALL');
  const queryClient = useQueryClient();

  // Form state
  const [formData, setFormData] = useState({
    loai: 'NGHI_PHEP',
    ngay: new Date().toISOString().split('T')[0],
    soNgay: 1,
    soGio: 1,
    lyDo: '',
  });

  // Lấy danh sách yêu cầu của nhân viên hiện tại
  const { data: yeuCauList, isLoading } = useQuery({
    queryKey: ['employee-portal', 'yeu-cau', filter],
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (filter !== 'ALL') {
        params.trangThai = filter;
      }
      const res = await api.get<{ data: YeuCau[] }>('/yeu-cau/my-requests', { params });
      return res.data.data || [];
    },
  });

  // Mutation tạo yêu cầu
  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      // Map loại yêu cầu text sang ID từ danh mục
      // ID từ database danh_muc_loai_yeu_cau
      const loaiMapping: Record<string, number> = {
        'NGHI_PHEP': 6,          // Nghỉ phép năm
        'NGHI_KHONG_LUONG': 11,  // Nghỉ không lương
        'NGHI_OM': 12,           // Nghỉ ốm
        'NGHI_VIEC_RIENG': 13,   // Nghỉ việc riêng
        'OT': 1,                 // Làm thêm giờ
        'TRE_GIO': 2,            // Đi sớm (đi trễ)
        'VE_SOM': 3,             // Về muộn (về sớm)
        'CONG_TAC': 4,           // Công tác
        'WFH': 14,               // Làm việc từ xa
      };
      
      // Tính soGio: nếu là nghỉ phép thì soNgay * 8, nếu là thời gian thì soGio trực tiếp
      const loaiInfo = LOAI_YEU_CAU.find((l) => l.value === data.loai);
      let soGio: number | undefined;
      if (loaiInfo?.nhom === 'NGHI_PHEP') {
        soGio = data.soNgay * 8; // 1 ngày = 8 giờ
      } else if (loaiInfo?.nhom === 'THOI_GIAN') {
        soGio = data.soGio;
      }
      
      const payload = {
        loaiYeuCauId: loaiMapping[data.loai] || 7,
        ngayYeuCau: data.ngay,
        lyDo: data.lyDo,
        soGio,
      };
      
      // Tạo đơn
      const res = await api.post('/yeu-cau/don', payload);
      const donId = res.data.id;
      
      // Tự động gửi duyệt sau khi tạo
      await api.post(`/yeu-cau/don/${donId}/gui-duyet`);
      
      return res.data;
    },
    onSuccess: () => {
      toast.success('Đã gửi yêu cầu thành công!');
      // Invalidate cả danh sách yêu cầu và dashboard để cập nhật số đơn chờ duyệt
      queryClient.invalidateQueries({ queryKey: ['employee-portal', 'yeu-cau'] });
      queryClient.invalidateQueries({ queryKey: ['employee-portal', 'dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['pending-requests-count'] });
      setShowForm(false);
      setFormData({
        loai: 'NGHI_PHEP',
        ngay: new Date().toISOString().split('T')[0],
        soNgay: 1,
        soGio: 1,
        lyDo: '',
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  // Mutation xóa yêu cầu
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/yeu-cau/don/${id}`);
    },
    onSuccess: () => {
      toast.success('Đã xóa yêu cầu');
      queryClient.invalidateQueries({ queryKey: ['employee-portal', 'yeu-cau'] });
      queryClient.invalidateQueries({ queryKey: ['employee-portal', 'dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['pending-requests-count'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Không thể xóa yêu cầu');
    },
  });

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa yêu cầu này?')) {
      deleteMutation.mutate(id);
    }
  };

  const getStatusBadge = (trangThai: string) => {
    switch (trangThai) {
      case 'DA_DUYET':
        return { text: 'Đã duyệt', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: Check };
      case 'TU_CHOI':
        return { text: 'Từ chối', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: X };
      case 'CHO_DUYET':
      default:
        return { text: 'Chờ duyệt', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: Clock };
    }
  };

  const getLoaiLabel = (loai: string) => {
    return LOAI_YEU_CAU.find((l) => l.value === loai)?.label || loai;
  };

  const getLoaiIcon = (loai: string) => {
    return LOAI_YEU_CAU.find((l) => l.value === loai)?.icon || '📋';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.lyDo.trim()) {
      alert('Vui lòng nhập lý do');
      return;
    }
    createMutation.mutate(formData);
  };

  return (
    <div className="space-y-4">
      {/* Create Button */}
      <button
        onClick={() => setShowForm(true)}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-2xl font-medium shadow-md"
      >
        <Plus className="w-5 h-5" />
        Tạo yêu cầu mới
      </button>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { value: 'ALL', label: 'Tất cả' },
          { value: 'CHO_DUYET', label: 'Chờ duyệt' },
          { value: 'DA_DUYET', label: 'Đã duyệt' },
          { value: 'TU_CHOI', label: 'Từ chối' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === tab.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Request List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : yeuCauList && yeuCauList.length > 0 ? (
        <div className="space-y-3">
          {yeuCauList.map((yc) => {
            const status = getStatusBadge(yc.trangThai);
            const StatusIcon = status.icon;
            // Tính số ngày từ soGio (1 ngày = 8 giờ)
            const soNgay = yc.soGio ? Math.round((yc.soGio / 8) * 10) / 10 : null;
            const canEdit = ['CHO_DUYET', 'TU_CHOI'].includes(yc.trangThai);
            return (
              <div
                key={yc.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{getLoaiIcon(yc.loai)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {yc.tenLoai || getLoaiLabel(yc.loai)}
                      </h4>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.text}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">
                      {new Date(yc.ngay).toLocaleDateString('vi-VN')}
                      {soNgay ? ` • ${soNgay} ngày` : ''}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {yc.lyDo}
                    </p>
                  </div>
                  {/* Nút sửa/xóa khi đang chờ duyệt */}
                  {canEdit ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(yc.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa yêu cầu"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-sm border border-gray-200 dark:border-gray-700">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Chưa có yêu cầu nào</p>
        </div>
      )}

      {/* Create Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-t-3xl p-6 pb-10 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Tạo yêu cầu mới
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Loại yêu cầu - Grouped */}
              <div className="max-h-[40vh] overflow-y-auto pr-1">
                {/* Nghỉ phép */}
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                  🏖️ Nghỉ phép
                </label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {LOAI_YEU_CAU.filter((l) => l.nhom === 'NGHI_PHEP').map((loai) => (
                    <button
                      key={loai.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, loai: loai.value })}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-colors text-sm ${
                        formData.loai === loai.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <span className="text-lg">{loai.icon}</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{loai.label}</span>
                    </button>
                  ))}
                </div>

                {/* Thời gian */}
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                  ⏰ Thời gian
                </label>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {LOAI_YEU_CAU.filter((l) => l.nhom === 'THOI_GIAN').map((loai) => (
                    <button
                      key={loai.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, loai: loai.value })}
                      className={`flex items-center gap-1 px-3 py-2.5 rounded-xl border-2 transition-colors text-sm ${
                        formData.loai === loai.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <span className="text-lg">{loai.icon}</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{loai.label}</span>
                    </button>
                  ))}
                </div>

                {/* Di chuyển */}
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                  ✈️ Di chuyển / Làm việc từ xa
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {LOAI_YEU_CAU.filter((l) => l.nhom === 'DI_CHUYEN').map((loai) => (
                    <button
                      key={loai.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, loai: loai.value })}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-colors text-sm ${
                        formData.loai === loai.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <span className="text-lg">{loai.icon}</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{loai.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ngày */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ngày bắt đầu
                </label>
                <input
                  type="date"
                  value={formData.ngay}
                  onChange={(e) => setFormData({ ...formData, ngay: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Số ngày - cho loại nghỉ phép */}
              {LOAI_YEU_CAU.find((l) => l.value === formData.loai)?.nhom === 'NGHI_PHEP' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Số ngày nghỉ
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="0.5"
                      max="30"
                      step="0.5"
                      value={formData.soNgay}
                      onChange={(e) => setFormData({ ...formData, soNgay: parseFloat(e.target.value) })}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <span className="text-sm text-gray-500">ngày</span>
                  </div>
                </div>
              )}

              {/* Số giờ - cho loại thời gian */}
              {LOAI_YEU_CAU.find((l) => l.value === formData.loai)?.nhom === 'THOI_GIAN' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Số giờ
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="0.5"
                      max="12"
                      step="0.5"
                      value={formData.soGio}
                      onChange={(e) => setFormData({ ...formData, soGio: parseFloat(e.target.value) })}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <span className="text-sm text-gray-500">giờ</span>
                  </div>
                </div>
              )}

              {/* Lý do */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Lý do
                </label>
                <textarea
                  value={formData.lyDo}
                  onChange={(e) => setFormData({ ...formData, lyDo: e.target.value })}
                  rows={3}
                  placeholder="Nhập lý do yêu cầu..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={createMutation.isPending}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium disabled:opacity-50"
              >
                {createMutation.isPending ? 'Đang gửi...' : 'Gửi yêu cầu'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
