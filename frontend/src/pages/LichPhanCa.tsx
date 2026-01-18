// Lịch Phân Ca - Calendar View Phase 2 Scheduling
import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Copy,
  Upload,
  CheckCircle,
  Users,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { phanCaService } from '../services/phanCa.service';
import { caLamViecService } from '../services/caLamViec.service';
import { phongBanApi, nhanVienApi } from '../services/api';
import { Card, Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter } from '../components/ui';

// Tên thứ trong tuần
const DAYS_OF_WEEK = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

export default function LichPhanCa() {
  const queryClient = useQueryClient();

  // State
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [filterPhongBan, setFilterPhongBan] = useState<number | undefined>();
  const [selectedLichId, setSelectedLichId] = useState<number | null>(null);
  const [showCreateLichModal, setShowCreateLichModal] = useState(false);
  const [showAssignBatchModal, setShowAssignBatchModal] = useState(false);
  const [showCopyWeekModal, setShowCopyWeekModal] = useState(false);

  // Form states
  const [assignBatchForm, setAssignBatchForm] = useState({
    nhanVienIds: [] as number[],
    caLamViecId: 0,
    tuNgay: '',
    denNgay: '',
    ngoaiTruThu: [] as number[],
  });

  const [copyWeekForm, setCopyWeekForm] = useState({
    tuanNguon: '',
    tuanDich: '',
  });

  // Queries
  const { data: phongBans } = useQuery({
    queryKey: ['phong-ban'],
    queryFn: phongBanApi.layTatCa,
  });

  const { data: danhSachCa } = useQuery({
    queryKey: ['ca-lam-viec-active', filterPhongBan],
    queryFn: () => caLamViecService.layDanhSachActive(filterPhongBan),
  });

  const { data: lichPhanCas } = useQuery({
    queryKey: ['phan-ca', currentMonth, filterPhongBan],
    queryFn: () =>
      phanCaService.layDanhSach({
        thangNam: currentMonth,
        phongBanId: filterPhongBan,
      }),
  });

  const { data: calendarData, isLoading: isLoadingCalendar } = useQuery({
    queryKey: ['phan-ca-calendar', currentMonth, filterPhongBan],
    queryFn: () =>
      phanCaService.layCalendarView({
        thangNam: currentMonth,
        phongBanId: filterPhongBan,
      }),
    enabled: !!currentMonth,
  });

  const { data: nhanViens } = useQuery({
    queryKey: ['nhan-vien', filterPhongBan],
    queryFn: () =>
      nhanVienApi.layTatCa({
        phongBanId: filterPhongBan,
        trangThai: 'DANG_LAM',
        soLuong: 500,
      }),
  });

  // Mutations
  const taoLichMutation = useMutation({
    mutationFn: phanCaService.tao,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['phan-ca'] });
      toast.success('Tạo lịch phân ca thành công');
      setSelectedLichId(data.id);
      setShowCreateLichModal(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const assignBatchMutation = useMutation({
    mutationFn: ({ lichId, payload }: { lichId: number; payload: any }) =>
      phanCaService.assignBatch(lichId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['phan-ca-calendar'] });
      toast.success(`${data.message} (${data.created} mới, ${data.updated} cập nhật)`);
      setShowAssignBatchModal(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const copyWeekMutation = useMutation({
    mutationFn: ({ lichId, payload }: { lichId: number; payload: any }) =>
      phanCaService.copyTuan(lichId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['phan-ca-calendar'] });
      toast.success(`${data.message}`);
      setShowCopyWeekModal(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const publishMutation = useMutation({
    mutationFn: phanCaService.publish,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['phan-ca'] });
      queryClient.invalidateQueries({ queryKey: ['phan-ca-calendar'] });
      toast.success(`${data.message} (${data.mapped} đã mapping)`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  const assignNgayMutation = useMutation({
    mutationFn: ({
      lichId,
      payload,
    }: {
      lichId: number;
      payload: { nhanVienId: number; ngay: string; caLamViecId: number };
    }) => phanCaService.assignNgay(lichId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phan-ca-calendar'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    },
  });

  // Computed values
  const currentLich = useMemo(() => {
    if (!lichPhanCas?.data) return null;
    if (selectedLichId) {
      return lichPhanCas.data.find((l: any) => l.id === selectedLichId);
    }
    // Auto select first non-HUY lich
    return lichPhanCas.data.find((l: any) => l.trangThai !== 'HUY');
  }, [lichPhanCas, selectedLichId]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const [year, month] = currentMonth.split('-').map(Number);
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const days: { date: Date; dateStr: string; isCurrentMonth: boolean }[] = [];

    // Add days from previous month
    const startDayOfWeek = firstDay.getDay();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, -i);
      days.push({
        date,
        dateStr: date.toISOString().split('T')[0],
        isCurrentMonth: false,
      });
    }

    // Add days of current month
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(year, month - 1, d);
      days.push({
        date,
        dateStr: date.toISOString().split('T')[0],
        isCurrentMonth: true,
      });
    }

    // Add days from next month to complete the grid
    const remainingDays = 42 - days.length; // 6 rows x 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        dateStr: date.toISOString().split('T')[0],
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentMonth]);

  // Navigation
  const goToPrevMonth = () => {
    const [year, month] = currentMonth.split('-').map(Number);
    const newDate = new Date(year, month - 2, 1);
    setCurrentMonth(
      `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}`,
    );
  };

  const goToNextMonth = () => {
    const [year, month] = currentMonth.split('-').map(Number);
    const newDate = new Date(year, month, 1);
    setCurrentMonth(
      `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}`,
    );
  };

  // Handlers
  const handleCreateLich = () => {
    taoLichMutation.mutate({
      thangNam: currentMonth,
      phongBanId: filterPhongBan,
      tenLich: `Lịch phân ca ${currentMonth}${filterPhongBan ? ` - PB${filterPhongBan}` : ''}`,
    });
  };

  const handleCellClick = (nhanVienId: number, ngay: string, caHienTai?: any) => {
    if (!currentLich || currentLich.trangThai === 'DA_CONG_BO') return;

    // Quick assign: show dropdown or cycle through shifts
    const caId = caHienTai?.caLamViecId;
    const nextCa = getNextCa(caId);

    if (nextCa) {
      assignNgayMutation.mutate({
        lichId: currentLich.id,
        payload: {
          nhanVienId,
          ngay,
          caLamViecId: nextCa.id,
        },
      });
    }
  };

  const getNextCa = (currentCaId?: number) => {
    if (!danhSachCa || danhSachCa.length === 0) return null;

    if (!currentCaId) {
      return danhSachCa[0];
    }

    const currentIndex = danhSachCa.findIndex((ca: any) => ca.id === currentCaId);
    const nextIndex = (currentIndex + 1) % (danhSachCa.length + 1);

    return nextIndex === danhSachCa.length ? null : danhSachCa[nextIndex];
  };

  const handleAssignBatch = () => {
    if (!currentLich) return;

    if (
      !assignBatchForm.nhanVienIds.length ||
      !assignBatchForm.caLamViecId ||
      !assignBatchForm.tuNgay ||
      !assignBatchForm.denNgay
    ) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    assignBatchMutation.mutate({
      lichId: currentLich.id,
      payload: assignBatchForm,
    });
  };

  const handleCopyWeek = () => {
    if (!currentLich) return;

    if (!copyWeekForm.tuanNguon || !copyWeekForm.tuanDich) {
      toast.error('Vui lòng chọn tuần nguồn và tuần đích');
      return;
    }

    copyWeekMutation.mutate({
      lichId: currentLich.id,
      payload: copyWeekForm,
    });
  };

  const handlePublish = () => {
    if (!currentLich) return;

    if (confirm('Bạn có chắc muốn công bố lịch? Sau khi công bố sẽ không thể chỉnh sửa.')) {
      publishMutation.mutate(currentLich.id);
    }
  };

  // Format month display
  const [displayYear, displayMonth] = currentMonth.split('-').map(Number);
  const monthDisplay = `Tháng ${displayMonth}/${displayYear}`;

  // Get list of employees from calendar data
  const employeeList = calendarData?.nhanViens || [];
  const danhSachNV = Array.isArray(nhanViens) ? nhanViens : nhanViens?.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary-500" />
            Lịch Phân Ca
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Phân ca làm việc cho nhân viên theo tháng
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {!currentLich && (
            <Button onClick={() => setShowCreateLichModal(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Tạo lịch mới
            </Button>
          )}
          {currentLich && currentLich.trangThai === 'NHAP' && (
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  setAssignBatchForm({
                    nhanVienIds: [],
                    caLamViecId: danhSachCa?.[0]?.id || 0,
                    tuNgay: `${currentMonth}-01`,
                    denNgay: `${currentMonth}-${calendarData?.soNgayTrongThang || 28}`,
                    ngoaiTruThu: [0, 6], // Loại trừ CN, T7
                  });
                  setShowAssignBatchModal(true);
                }}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Phân ca hàng loạt
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowCopyWeekModal(true)}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy tuần
              </Button>
              <Button onClick={handlePublish} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                <Upload className="w-4 h-4" />
                Công bố lịch
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Filters & Navigation */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Month Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={goToPrevMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white min-w-[150px] text-center">
              {monthDisplay}
            </h2>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
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

            {lichPhanCas?.data && lichPhanCas.data.length > 0 && (
              <select
                value={selectedLichId || currentLich?.id || ''}
                onChange={(e) => setSelectedLichId(Number(e.target.value))}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              >
                {lichPhanCas.data.map((lich: any) => (
                  <option key={lich.id} value={lich.id}>
                    {lich.tenLich} ({lich.trangThai})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Lich status */}
          {currentLich && (
            <div className="flex items-center gap-2">
              {currentLich.trangThai === 'DA_CONG_BO' ? (
                <Badge variant="success" className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Đã công bố
                </Badge>
              ) : currentLich.trangThai === 'NHAP' ? (
                <Badge variant="warning" className="flex items-center gap-1">
                  Đang soạn thảo
                </Badge>
              ) : (
                <Badge variant="neutral">Đã hủy</Badge>
              )}
              <span className="text-sm text-gray-500">
                {currentLich._count?.chiTiets || 0} phân ca
              </span>
            </div>
          )}
        </div>
      </Card>

      {/* Legend - Ca làm việc */}
      {danhSachCa && danhSachCa.length > 0 && (
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Chú thích:</span>
            {danhSachCa.map((ca: any) => (
              <div key={ca.id} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: ca.mauHienThi || '#3B82F6' }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {ca.tenCa} ({ca.gioVao}-{ca.gioRa})
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-700" />
              <span className="text-sm text-gray-500">Chưa phân ca</span>
            </div>
          </div>
        </Card>
      )}

      {/* Calendar Grid */}
      <Card className="overflow-hidden">
        {isLoadingCalendar ? (
          <div className="p-8 text-center text-gray-500">Đang tải lịch...</div>
        ) : employeeList.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Chưa có nhân viên nào. Hãy chọn phòng ban hoặc tạo lịch phân ca mới.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="sticky left-0 z-10 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 border-b border-r min-w-[180px]">
                    Nhân viên
                  </th>
                  {calendarDays
                    .filter((d) => d.isCurrentMonth)
                    .map((day) => {
                      const dayOfWeek = day.date.getDay();
                      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                      return (
                        <th
                          key={day.dateStr}
                          className={`px-1 py-2 text-center text-xs font-semibold border-b min-w-[60px] ${
                            isWeekend
                              ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                              : 'text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          <div>{DAYS_OF_WEEK[dayOfWeek]}</div>
                          <div className="text-lg font-bold">{day.date.getDate()}</div>
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                {employeeList.map((nv: any) => (
                  <tr key={nv.nhanVienId} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="sticky left-0 z-10 bg-white dark:bg-gray-900 px-4 py-2 border-b border-r">
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {nv.hoTen}
                      </div>
                      <div className="text-xs text-gray-500">{nv.maNhanVien}</div>
                    </td>
                    {calendarDays
                      .filter((d) => d.isCurrentMonth)
                      .map((day) => {
                        const caInfo = nv.ngays[day.dateStr];
                        const dayOfWeek = day.date.getDay();
                        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                        const canEdit =
                          currentLich && currentLich.trangThai === 'NHAP';

                        return (
                          <td
                            key={day.dateStr}
                            onClick={() =>
                              canEdit && handleCellClick(nv.nhanVienId, day.dateStr, caInfo)
                            }
                            className={`px-1 py-1 border-b text-center cursor-pointer transition-colors ${
                              isWeekend ? 'bg-red-50/50 dark:bg-red-900/10' : ''
                            } ${canEdit ? 'hover:bg-primary-50 dark:hover:bg-primary-900/20' : ''}`}
                          >
                            {caInfo ? (
                              <div
                                className="px-1 py-1 rounded text-xs font-medium text-white truncate"
                                style={{ backgroundColor: caInfo.mauHienThi || '#3B82F6' }}
                                title={`${caInfo.tenCa} (${caInfo.gioVao}-${caInfo.gioRa})`}
                              >
                                {caInfo.maCa}
                              </div>
                            ) : (
                              <div className="px-1 py-1 rounded text-xs text-gray-400">-</div>
                            )}
                          </td>
                        );
                      })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal Tạo Lịch */}
      <Modal isOpen={showCreateLichModal} onClose={() => setShowCreateLichModal(false)}>
        <ModalHeader title="Tạo lịch phân ca mới" />
        <ModalBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tháng</label>
              <input
                type="month"
                value={currentMonth}
                onChange={(e) => setCurrentMonth(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phòng ban</label>
              <select
                value={filterPhongBan || ''}
                onChange={(e) =>
                  setFilterPhongBan(e.target.value ? Number(e.target.value) : undefined)
                }
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Toàn công ty</option>
                {phongBans?.map((pb: any) => (
                  <option key={pb.id} value={pb.id}>
                    {pb.tenPhongBan}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowCreateLichModal(false)}>
            Hủy
          </Button>
          <Button onClick={handleCreateLich} disabled={taoLichMutation.isPending}>
            {taoLichMutation.isPending ? 'Đang tạo...' : 'Tạo lịch'}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal Phân Ca Hàng Loạt */}
      <Modal
        isOpen={showAssignBatchModal}
        onClose={() => setShowAssignBatchModal(false)}
        size="lg"
      >
        <ModalHeader title="Phân ca hàng loạt" />
        <ModalBody>
          <div className="space-y-4">
            {/* Chọn nhân viên */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Chọn nhân viên <span className="text-red-500">*</span>
              </label>
              <div className="border rounded-lg p-2 max-h-48 overflow-y-auto">
                <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={assignBatchForm.nhanVienIds.length === danhSachNV.length}
                    onChange={(e) => {
                      setAssignBatchForm({
                        ...assignBatchForm,
                        nhanVienIds: e.target.checked
                          ? danhSachNV.map((nv: any) => nv.id)
                          : [],
                      });
                    }}
                    className="w-4 h-4"
                  />
                  <span className="font-medium">Chọn tất cả</span>
                </label>
                <hr className="my-2" />
                {danhSachNV.map((nv: any) => (
                  <label
                    key={nv.id}
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={assignBatchForm.nhanVienIds.includes(nv.id)}
                      onChange={(e) => {
                        const ids = e.target.checked
                          ? [...assignBatchForm.nhanVienIds, nv.id]
                          : assignBatchForm.nhanVienIds.filter((id) => id !== nv.id);
                        setAssignBatchForm({ ...assignBatchForm, nhanVienIds: ids });
                      }}
                      className="w-4 h-4"
                    />
                    <span>
                      {nv.hoTen} ({nv.maNhanVien})
                    </span>
                  </label>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Đã chọn: {assignBatchForm.nhanVienIds.length} nhân viên
              </p>
            </div>

            {/* Chọn ca */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Ca làm việc <span className="text-red-500">*</span>
              </label>
              <select
                value={assignBatchForm.caLamViecId}
                onChange={(e) =>
                  setAssignBatchForm({ ...assignBatchForm, caLamViecId: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">-- Chọn ca --</option>
                {danhSachCa?.map((ca: any) => (
                  <option key={ca.id} value={ca.id}>
                    {ca.tenCa} ({ca.gioVao} - {ca.gioRa})
                  </option>
                ))}
              </select>
            </div>

            {/* Khoảng ngày */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Từ ngày</label>
                <input
                  type="date"
                  value={assignBatchForm.tuNgay}
                  onChange={(e) =>
                    setAssignBatchForm({ ...assignBatchForm, tuNgay: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Đến ngày</label>
                <input
                  type="date"
                  value={assignBatchForm.denNgay}
                  onChange={(e) =>
                    setAssignBatchForm({ ...assignBatchForm, denNgay: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            {/* Loại trừ thứ */}
            <div>
              <label className="block text-sm font-medium mb-1">Loại trừ các ngày</label>
              <div className="flex flex-wrap gap-2">
                {DAYS_OF_WEEK.map((day, index) => (
                  <label
                    key={index}
                    className={`px-3 py-1 rounded-full cursor-pointer border ${
                      assignBatchForm.ngoaiTruThu.includes(index)
                        ? 'bg-red-100 border-red-300 text-red-700'
                        : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={assignBatchForm.ngoaiTruThu.includes(index)}
                      onChange={(e) => {
                        const thu = e.target.checked
                          ? [...assignBatchForm.ngoaiTruThu, index]
                          : assignBatchForm.ngoaiTruThu.filter((t) => t !== index);
                        setAssignBatchForm({ ...assignBatchForm, ngoaiTruThu: thu });
                      }}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowAssignBatchModal(false)}>
            Hủy
          </Button>
          <Button onClick={handleAssignBatch} disabled={assignBatchMutation.isPending}>
            {assignBatchMutation.isPending ? 'Đang xử lý...' : 'Phân ca'}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal Copy Tuần */}
      <Modal isOpen={showCopyWeekModal} onClose={() => setShowCopyWeekModal(false)}>
        <ModalHeader title="Copy tuần" />
        <ModalBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Tuần nguồn (chọn ngày bất kỳ trong tuần)
              </label>
              <input
                type="date"
                value={copyWeekForm.tuanNguon}
                onChange={(e) =>
                  setCopyWeekForm({ ...copyWeekForm, tuanNguon: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Tuần đích (chọn ngày bất kỳ trong tuần)
              </label>
              <input
                type="date"
                value={copyWeekForm.tuanDich}
                onChange={(e) =>
                  setCopyWeekForm({ ...copyWeekForm, tuanDich: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowCopyWeekModal(false)}>
            Hủy
          </Button>
          <Button onClick={handleCopyWeek} disabled={copyWeekMutation.isPending}>
            {copyWeekMutation.isPending ? 'Đang copy...' : 'Copy tuần'}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
