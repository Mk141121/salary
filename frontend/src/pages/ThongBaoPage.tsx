// Trang Thông Báo - Sprint 6
// Danh sách đầy đủ thông báo với phân trang
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bell, CheckCheck, RefreshCw } from 'lucide-react';
import { thongBaoApi, formatTimeAgo, getThongBaoIcon, ThongBao } from '../services/thongBaoApi';
import { useNavigate } from 'react-router-dom';

export default function ThongBaoPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<'tat-ca' | 'chua-doc' | 'da-doc'>('tat-ca');
  const [page, setPage] = useState(1);
  const limit = 20;

  // Query: Danh sách thông báo
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['thong-bao', 'list', { page, limit, filter }],
    queryFn: () =>
      thongBaoApi.layDanhSach({
        page,
        limit,
        daDoc: filter === 'chua-doc' ? false : filter === 'da-doc' ? true : undefined,
      }),
  });

  // Query: Đếm chưa đọc
  const { data: countData } = useQuery({
    queryKey: ['thong-bao', 'chua-doc'],
    queryFn: () => thongBaoApi.demChuaDoc(),
  });

  // Mutation: Đánh dấu đã đọc
  const markReadMutation = useMutation({
    mutationFn: (id: number) => thongBaoApi.danhDauDaDoc(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['thong-bao'] });
    },
  });

  // Mutation: Đánh dấu tất cả đã đọc
  const markAllReadMutation = useMutation({
    mutationFn: () => thongBaoApi.danhDauTatCaDaDoc(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['thong-bao'] });
    },
  });

  const handleNotificationClick = (thongBao: ThongBao) => {
    if (!thongBao.daDoc) {
      markReadMutation.mutate(thongBao.id);
    }
    if (thongBao.link) {
      navigate(thongBao.link);
    }
  };

  const totalPages = data ? Math.ceil(data.total / limit) : 1;
  const chuaDoc = countData?.chuaDoc || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Thông báo
              {chuaDoc > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {chuaDoc} chưa đọc
                </span>
              )}
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50"
                title="Làm mới"
              >
                <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
              </button>
              {chuaDoc > 0 && (
                <button
                  onClick={() => markAllReadMutation.mutate()}
                  disabled={markAllReadMutation.isPending}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg disabled:opacity-50"
                >
                  <CheckCheck className="w-4 h-4" />
                  Đọc tất cả
                </button>
              )}
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {[
              { id: 'tat-ca', label: 'Tất cả' },
              { id: 'chua-doc', label: 'Chưa đọc' },
              { id: 'da-doc', label: 'Đã đọc' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilter(tab.id as typeof filter);
                  setPage(1);
                }}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  filter === tab.id
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
                {tab.id === 'chua-doc' && chuaDoc > 0 && (
                  <span className="ml-1 text-xs text-red-500">({chuaDoc})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !data?.data?.length ? (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400">
              {filter === 'chua-doc'
                ? 'Không có thông báo chưa đọc'
                : filter === 'da-doc'
                ? 'Không có thông báo đã đọc'
                : 'Chưa có thông báo nào'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {data.data.map((thongBao) => {
              const { icon, color } = getThongBaoIcon(thongBao.loaiThongBao);
              return (
                <button
                  key={thongBao.id}
                  onClick={() => handleNotificationClick(thongBao)}
                  className={`w-full text-left bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 ${
                    !thongBao.daDoc ? 'ring-2 ring-blue-500/20' : ''
                  }`}
                >
                  <div className="flex gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                        !thongBao.daDoc
                          ? 'bg-blue-100 dark:bg-blue-900/30'
                          : 'bg-gray-100 dark:bg-gray-700'
                      } ${color}`}
                    >
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <h3
                          className={`font-medium ${
                            !thongBao.daDoc
                              ? 'text-gray-900 dark:text-white'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {thongBao.tieuDe}
                        </h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!thongBao.daDoc && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                          <span className="text-xs text-gray-400">{formatTimeAgo(thongBao.ngayTao)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {thongBao.noiDung}
                      </p>
                      {thongBao.link && (
                        <p className="text-xs text-blue-500 mt-2">Nhấn để xem chi tiết →</p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {data && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Trước
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Trang {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
