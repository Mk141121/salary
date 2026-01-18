// Lịch làm việc - Employee Portal
// Sprint 5: Week view với swipe navigation
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Calendar, Coffee, Briefcase } from 'lucide-react';
import { employeePortalApi, getThuLabel, getThuFullLabel } from '../../services/employeePortalApi';

export default function PortalSchedule() {
  const [weekOffset, setWeekOffset] = useState(0);

  // Tính ngày đầu tuần
  const getWeekDates = (offset: number) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + offset * 7);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return { monday, sunday };
  };

  const { monday, sunday } = getWeekDates(weekOffset);

  const { data: lichLamViec, isLoading } = useQuery({
    queryKey: ['employee-portal', 'lich-lam-viec', monday.toISOString()],
    queryFn: () =>
      employeePortalApi.getLichLamViec({
        tuNgay: monday.toISOString().split('T')[0],
        denNgay: sunday.toISOString().split('T')[0],
      }),
  });

  const formatWeekRange = () => {
    const formatDate = (d: Date) => `${d.getDate()}/${d.getMonth() + 1}`;
    return `${formatDate(monday)} - ${formatDate(sunday)}`;
  };

  const isToday = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
  };

  const isPast = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dateStr) < today;
  };

  return (
    <div className="space-y-4">
      {/* Week Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setWeekOffset(weekOffset - 1)}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <p className="font-semibold text-gray-900 dark:text-white">{formatWeekRange()}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {weekOffset === 0 ? 'Tuần này' : weekOffset > 0 ? `+${weekOffset} tuần` : `${weekOffset} tuần`}
            </p>
          </div>
          <button
            onClick={() => setWeekOffset(weekOffset + 1)}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Quick jump */}
        {weekOffset !== 0 && (
          <button
            onClick={() => setWeekOffset(0)}
            className="w-full mt-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium"
          >
            Về tuần hiện tại
          </button>
        )}
      </div>

      {/* Schedule List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {lichLamViec?.map((item) => (
            <div
              key={item.ngay}
              className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border transition-all ${
                isToday(item.ngay)
                  ? 'border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900/50'
                  : 'border-gray-200 dark:border-gray-700'
              } ${isPast(item.ngay) && !isToday(item.ngay) ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start gap-4">
                {/* Date */}
                <div
                  className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center ${
                    isToday(item.ngay)
                      ? 'bg-blue-600 text-white'
                      : item.thuTrongTuan === 0 || item.thuTrongTuan === 6
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                      : 'bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-xs font-medium">{getThuLabel(item.thuTrongTuan)}</span>
                  <span className="text-lg font-bold">{new Date(item.ngay).getDate()}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getThuFullLabel(item.thuTrongTuan)}, {new Date(item.ngay).toLocaleDateString('vi-VN')}
                  </p>

                  {item.nghiPhep ? (
                    // Nghỉ phép
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Coffee className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-green-600">{item.nghiPhep.loaiNghi}</p>
                        <p className="text-xs text-gray-500">{item.nghiPhep.trangThai}</p>
                      </div>
                    </div>
                  ) : item.ca ? (
                    // Có ca làm việc
                    <div className="mt-2 flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: item.ca.mauHienThi || '#3B82F6' }}
                      >
                        <Briefcase className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.ca.tenCa}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.ca.gioVao} - {item.ca.gioRa}
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Không có ca
                    <div className="mt-2 flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Không có ca làm việc</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
