// Yêu cầu - Employee Portal
// Sprint 5: Xem và tạo yêu cầu OT/Trễ/Sớm/Công tác
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Clock, Check, X, AlertCircle, ChevronRight } from 'lucide-react';
import api from '../../services/api';

interface YeuCau {
  id: string;
  loai: string;
  ngay: string;
  soGio: number;
  lyDo: string;
  trangThai: string;
  createdAt: string;
}

const LOAI_YEU_CAU = [
  { value: 'OT', label: 'Làm thêm giờ (OT)', icon: '⏰' },
  { value: 'DI_TRE', label: 'Đi trễ', icon: '🕐' },
  { value: 'VE_SOM', label: 'Về sớm', icon: '🏃' },
  { value: 'CONG_TAC', label: 'Công tác', icon: '✈️' },
];

export default function PortalRequests() {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<string>('ALL');
  const queryClient = useQueryClient();

  // Form state
  const [formData, setFormData] = useState({
    loai: 'OT',
    ngay: new Date().toISOString().split('T')[0],
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
      const res = await api.post('/yeu-cau', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee-portal', 'yeu-cau'] });
      setShowForm(false);
      setFormData({
        loai: 'OT',
        ngay: new Date().toISOString().split('T')[0],
        soGio: 1,
        lyDo: '',
      });
    },
  });

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
                        {getLoaiLabel(yc.loai)}
                      </h4>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.text}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">
                      {new Date(yc.ngay).toLocaleDateString('vi-VN')} • {yc.soGio} giờ
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {yc.lyDo}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
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
              {/* Loại yêu cầu */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loại yêu cầu
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {LOAI_YEU_CAU.map((loai) => (
                    <button
                      key={loai.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, loai: loai.value })}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-colors ${
                        formData.loai === loai.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <span className="text-xl">{loai.icon}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {loai.label.replace(' (OT)', '')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ngày */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ngày
                </label>
                <input
                  type="date"
                  value={formData.ngay}
                  onChange={(e) => setFormData({ ...formData, ngay: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Số giờ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Số giờ
                </label>
                <input
                  type="number"
                  min="0.5"
                  max="12"
                  step="0.5"
                  value={formData.soGio}
                  onChange={(e) => setFormData({ ...formData, soGio: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

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
