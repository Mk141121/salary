// Component NotificationBell - Sprint 6
// Badge thông báo với dropdown danh sách
import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bell, CheckCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { thongBaoApi, formatTimeAgo, getThongBaoIcon, ThongBao } from '../services/thongBaoApi';

interface NotificationBellProps {
  className?: string;
}

export default function NotificationBell({ className = '' }: NotificationBellProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Query: Đếm chưa đọc
  const { data: countData } = useQuery({
    queryKey: ['thong-bao', 'chua-doc'],
    queryFn: () => thongBaoApi.demChuaDoc(),
    refetchInterval: 30000, // Refresh mỗi 30s
  });

  // Query: Danh sách khi mở dropdown
  const { data: listData, isLoading } = useQuery({
    queryKey: ['thong-bao', 'list', { limit: 10 }],
    queryFn: () => thongBaoApi.layDanhSach({ limit: 10 }),
    enabled: isOpen,
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

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (thongBao: ThongBao) => {
    // Mark as read
    if (!thongBao.daDoc) {
      markReadMutation.mutate(thongBao.id);
    }
    // Navigate if has link
    if (thongBao.link) {
      navigate(thongBao.link);
      setIsOpen(false);
    }
  };

  const chuaDoc = countData?.chuaDoc || 0;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Thông báo"
      >
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        {chuaDoc > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full px-1">
            {chuaDoc > 99 ? '99+' : chuaDoc}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 max-h-[70vh] bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Thông báo</h3>
            <div className="flex items-center gap-2">
              {chuaDoc > 0 && (
                <button
                  onClick={() => markAllReadMutation.mutate()}
                  className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  disabled={markAllReadMutation.isPending}
                >
                  <CheckCheck className="w-3 h-3" />
                  Đọc tất cả
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Đang tải...</div>
            ) : !listData?.data?.length ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Không có thông báo</p>
              </div>
            ) : (
              listData.data.map((thongBao) => {
                const { icon, color } = getThongBaoIcon(thongBao.loaiThongBao);
                return (
                  <button
                    key={thongBao.id}
                    onClick={() => handleNotificationClick(thongBao)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0 ${
                      !thongBao.daDoc ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <span className={`text-xl ${color}`}>{icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm font-medium truncate ${
                            !thongBao.daDoc 
                              ? 'text-gray-900 dark:text-white' 
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {thongBao.tieuDe}
                          </p>
                          {!thongBao.daDoc && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                          {thongBao.noiDung}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {formatTimeAgo(thongBao.ngayTao)}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          {listData && listData.total > 10 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-2">
              <button
                onClick={() => {
                  navigate('/thong-bao');
                  setIsOpen(false);
                }}
                className="w-full text-center text-sm text-blue-600 hover:text-blue-700 py-2"
              >
                Xem tất cả ({listData.total})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
