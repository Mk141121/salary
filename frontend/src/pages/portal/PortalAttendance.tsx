// Chấm công - Employee Portal
// Sprint 5: Xem lịch sử chấm công theo tháng + Sản lượng realtime
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Clock, Package, Truck, TrendingUp } from 'lucide-react';
import { employeePortalApi, formatTime } from '../../services/employeePortalApi';
import api from '../../services/api';

export default function PortalAttendance() {
  const now = new Date();
  const [thang, setThang] = useState(now.getMonth() + 1);
  const [nam, setNam] = useState(now.getFullYear());

  // Chấm công
  const { data: chamCong, isLoading } = useQuery({
    queryKey: ['employee-portal', 'cham-cong', thang, nam],
    queryFn: () => employeePortalApi.getChamCong({ thang, nam }),
  });

  // Sản lượng tháng hiện tại (only for current month)
  const isCurrentMonth = thang === now.getMonth() + 1 && nam === now.getFullYear();
  const { data: sanLuong, isLoading: sanLuongLoading } = useQuery({
    queryKey: ['employee-portal', 'san-luong', thang, nam],
    queryFn: async () => {
      try {
        const res = await api.get('/san-luong/my-stats', { params: { thang, nam } });
        return res.data?.data || res.data;
      } catch {
        return null;
      }
    },
    enabled: isCurrentMonth, // Only load for current month
  });

  const prevMonth = () => {
    if (thang === 1) {
      setThang(12);
      setNam(nam - 1);
    } else {
      setThang(thang - 1);
    }
  };

  const nextMonth = () => {
    if (thang === 12) {
      setThang(1);
      setNam(nam + 1);
    } else {
      setThang(thang + 1);
    }
  };

  const getStatusLabel = (trangThai: string) => {
    switch (trangThai) {
      case 'DU_CONG':
        return { text: 'Đủ công', color: 'text-green-600 bg-green-50 dark:bg-green-900/30' };
      case 'DI_TRE':
        return { text: 'Đi trễ', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30' };
      case 'VE_SOM':
        return { text: 'Về sớm', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30' };
      case 'NGHI_KHONG_PHEP':
        return { text: 'Nghỉ K.Phép', color: 'text-red-600 bg-red-50 dark:bg-red-900/30' };
      case 'NGHI_CO_PHEP':
        return { text: 'Nghỉ phép', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' };
      default:
        return { text: trangThai, color: 'text-gray-600 bg-gray-50 dark:bg-gray-700' };
    }
  };

  // Tính thống kê
  const stats = {
    duCong: chamCong?.filter((c) => c.trangThai === 'DU_CONG').length || 0,
    diTre: chamCong?.filter((c) => c.trangThai === 'DI_TRE').length || 0,
    veSom: chamCong?.filter((c) => c.trangThai === 'VE_SOM').length || 0,
    nghiKhongPhep: chamCong?.filter((c) => c.trangThai === 'NGHI_KHONG_PHEP').length || 0,
  };

  const isToday = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
  };

  return (
    <div className="space-y-4">
      {/* Month Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <button
            onClick={prevMonth}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <p className="font-semibold text-gray-900 dark:text-white">Tháng {thang}/{nam}</p>
          </div>
          <button
            onClick={nextMonth}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-green-600">{stats.duCong}</p>
          <p className="text-xs text-green-600">Đủ công</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-yellow-600">{stats.diTre}</p>
          <p className="text-xs text-yellow-600">Đi trễ</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-orange-600">{stats.veSom}</p>
          <p className="text-xs text-orange-600">Về sớm</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-red-600">{stats.nghiKhongPhep}</p>
          <p className="text-xs text-red-600">K.Phép</p>
        </div>
      </div>

      {/* Sản lượng realtime - Only for current month */}
      {isCurrentMonth && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-4 shadow-md text-white">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-semibold">Sản lượng tháng này</h3>
          </div>
          
          {sanLuongLoading ? (
            <div className="h-16 bg-white/20 rounded-xl animate-pulse" />
          ) : sanLuong ? (
            <div className="grid grid-cols-2 gap-3">
              {/* Chia hàng */}
              {(sanLuong.chiaHang?.tongSanPham > 0 || sanLuong.chiaHang) && (
                <div className="bg-white/20 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4" />
                    <span className="text-xs opacity-80">Chia hàng</span>
                  </div>
                  <p className="text-lg font-bold">
                    {(sanLuong.chiaHang?.tongSanPham || 0).toLocaleString('vi-VN')}
                    <span className="text-xs font-normal ml-1">SP</span>
                  </p>
                  {sanLuong.chiaHang?.sanPhamLoi > 0 && (
                    <p className="text-xs opacity-80">
                      Lỗi: {sanLuong.chiaHang.sanPhamLoi.toLocaleString('vi-VN')}
                    </p>
                  )}
                </div>
              )}
              
              {/* Giao hàng */}
              {(sanLuong.giaoHang?.tongKhoiLuong > 0 || sanLuong.giaoHang) && (
                <div className="bg-white/20 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className="w-4 h-4" />
                    <span className="text-xs opacity-80">Giao hàng</span>
                  </div>
                  <p className="text-lg font-bold">
                    {(sanLuong.giaoHang?.tongKhoiLuong || 0).toLocaleString('vi-VN')}
                    <span className="text-xs font-normal ml-1">kg</span>
                  </p>
                  {sanLuong.giaoHang?.soLuotGiao > 0 && (
                    <p className="text-xs opacity-80">
                      {sanLuong.giaoHang.soLuotGiao} lượt giao
                    </p>
                  )}
                </div>
              )}

              {/* Điểm KPI nếu có */}
              {sanLuong.diemKPI > 0 && (
                <div className="bg-white/20 rounded-xl p-3 col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Điểm KPI</span>
                    <span className="text-xl font-bold">{sanLuong.diemKPI.toFixed(1)}</span>
                  </div>
                </div>
              )}

              {/* Không có dữ liệu */}
              {!sanLuong.chiaHang && !sanLuong.giaoHang && !sanLuong.diemKPI && (
                <div className="col-span-2 text-center py-2 text-sm opacity-80">
                  Chưa có dữ liệu sản lượng
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-2 text-sm opacity-80">
              Chưa có dữ liệu sản lượng
            </div>
          )}
        </div>
      )}

      {/* Attendance List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : chamCong && chamCong.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {chamCong.map((item, index) => {
            const status = getStatusLabel(item.trangThai);
            return (
              <div
                key={item.ngay}
                className={`flex items-center gap-4 px-4 py-3 ${
                  index < chamCong.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                } ${isToday(item.ngay) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
              >
                {/* Date */}
                <div className="w-12 text-center">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {new Date(item.ngay).getDate()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][new Date(item.ngay).getDay()]}
                  </p>
                </div>

                {/* Time */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Vào:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatTime(item.gioVaoThucTe)}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">Ra:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatTime(item.gioRaThucTe)}
                    </span>
                  </div>
                  {item.ca && (
                    <p className="text-xs text-gray-500 mt-1">
                      Ca: {item.ca.tenCa}
                    </p>
                  )}
                </div>

                {/* Status */}
                <span className={`px-2 py-1 text-xs font-medium rounded-lg ${status.color}`}>
                  {status.text}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-sm border border-gray-200 dark:border-gray-700">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Chưa có dữ liệu chấm công</p>
        </div>
      )}
    </div>
  );
}
