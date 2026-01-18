// Bảng Công Tháng - Sprint 9
// Hiển thị dạng lưới tháng với thông tin chấm công từng ngày
import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  SearchInput,
} from '@/components/ui';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit,
  Check,
  X,
  AlertTriangle,
  FileText,
  Users,
  Timer,
} from 'lucide-react';
import {
  layBangCongThang,
  layDanhSachYeuCauSuaCong,
  taoYeuCauSuaCong,
  duyetYeuCauSuaCong,
  suaCongTrucTiep,
  TimesheetNhanVien,
  TimesheetNgay,
  YeuCauSuaCong,
} from '@/services/timesheetApi';

// ===== HELPER FUNCTIONS =====

const formatTime = (isoString?: string) => {
  if (!isoString) return '-';
  const d = new Date(isoString);
  return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
};

const getTrangThaiLabel = (trangThai: string) => {
  const map: Record<string, { label: string; color: string }> = {
    DI_LAM: { label: 'Đi làm', color: 'success' },
    NGHI_PHEP: { label: 'Nghỉ phép', color: 'info' },
    NGHI_KHONG_LUONG: { label: 'Nghỉ KL', color: 'warning' },
    NGHI_BENH: { label: 'Nghỉ bệnh', color: 'warning' },
    NGHI_LE: { label: 'Nghỉ lễ', color: 'info' },
    CHUA_XAC_DINH: { label: '-', color: 'neutral' },
    VANG_MAT: { label: 'Vắng', color: 'danger' },
  };
  return map[trangThai] || { label: trangThai, color: 'neutral' };
};

const getLoaiNgayClass = (loaiNgay: string, thuTrongTuan: number) => {
  if (loaiNgay === 'NGAY_LE') return 'bg-red-100';
  if (thuTrongTuan === 0) return 'bg-red-50'; // Chủ nhật
  if (thuTrongTuan === 6) return 'bg-yellow-50'; // Thứ 7
  return '';
};

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

const getThuViet = (thu: number) => {
  const thuMap = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  return thuMap[thu];
};

// ===== MAIN COMPONENT =====

export default function BangCongThang() {
  const queryClient = useQueryClient();
  const today = new Date();
  const [thang, setThang] = useState(today.getMonth() + 1);
  const [nam, setNam] = useState(today.getFullYear());
  const [search, setSearch] = useState('');
  const [phongBanId] = useState<number | undefined>();
  const [selectedNhanVien, setSelectedNhanVien] = useState<TimesheetNhanVien | null>(null);
  const [selectedNgay, setSelectedNgay] = useState<TimesheetNgay | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'request'>('view');
  const [suaCongData, setSuaCongData] = useState({
    gioVaoMoi: '',
    gioRaMoi: '',
    trangThaiMoi: '',
    lyDo: '',
  });
  const [showDuyetModal, setShowDuyetModal] = useState(false);

  // Query bảng công
  const { data: bangCong, isLoading } = useQuery({
    queryKey: ['bang-cong', { thang, nam, search, phongBanId }],
    queryFn: () => layBangCongThang({ thang, nam, search, phongBanId }),
  });

  // Query yêu cầu sửa công chờ duyệt
  const { data: yeuCauChoDuyet } = useQuery({
    queryKey: ['yeu-cau-sua-cong', { thang, nam, trangThaiDuyet: 'CHO_DUYET' }],
    queryFn: () => {
      const tuNgay = new Date(nam, thang - 1, 1).toISOString().slice(0, 10);
      const denNgay = new Date(nam, thang, 0).toISOString().slice(0, 10);
      return layDanhSachYeuCauSuaCong({ trangThaiDuyet: 'CHO_DUYET', tuNgay, denNgay });
    },
  });

  // Mutation tạo yêu cầu sửa công
  const taoYeuCauMutation = useMutation({
    mutationFn: taoYeuCauSuaCong,
    onSuccess: () => {
      alert('Đã tạo yêu cầu sửa công');
      queryClient.invalidateQueries({ queryKey: ['bang-cong'] });
      queryClient.invalidateQueries({ queryKey: ['yeu-cau-sua-cong'] });
      closeModal();
    },
    onError: (error: Error) => {
      alert(error.message || 'Có lỗi xảy ra');
    },
  });

  // Mutation sửa công trực tiếp
  const suaCongMutation = useMutation({
    mutationFn: suaCongTrucTiep,
    onSuccess: () => {
      alert('Đã cập nhật chấm công');
      queryClient.invalidateQueries({ queryKey: ['bang-cong'] });
      closeModal();
    },
    onError: (error: Error) => {
      alert(error.message || 'Có lỗi xảy ra');
    },
  });

  // Mutation duyệt yêu cầu
  const duyetMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: { trangThaiDuyet: 'DA_DUYET' | 'TU_CHOI'; lyDoTuChoi?: string } }) =>
      duyetYeuCauSuaCong(id, payload),
    onSuccess: () => {
      alert('Đã xử lý yêu cầu');
      queryClient.invalidateQueries({ queryKey: ['bang-cong'] });
      queryClient.invalidateQueries({ queryKey: ['yeu-cau-sua-cong'] });
    },
    onError: (error: Error) => {
      alert(error.message || 'Có lỗi xảy ra');
    },
  });

  // Tính số ngày trong tháng
  const daysInMonth = useMemo(() => getDaysInMonth(thang, nam), [thang, nam]);

  // Điều hướng tháng
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

  // Mở modal chi tiết ngày
  const openDayModal = (nv: TimesheetNhanVien, ngay: TimesheetNgay, mode: 'view' | 'edit' | 'request') => {
    setSelectedNhanVien(nv);
    setSelectedNgay(ngay);
    setModalMode(mode);
    setSuaCongData({
      gioVaoMoi: ngay.gioVao ? new Date(ngay.gioVao).toTimeString().slice(0, 5) : '',
      gioRaMoi: ngay.gioRa ? new Date(ngay.gioRa).toTimeString().slice(0, 5) : '',
      trangThaiMoi: ngay.trangThai,
      lyDo: '',
    });
  };

  const closeModal = () => {
    setSelectedNhanVien(null);
    setSelectedNgay(null);
    setModalMode('view');
    setSuaCongData({ gioVaoMoi: '', gioRaMoi: '', trangThaiMoi: '', lyDo: '' });
  };

  // Submit sửa công
  const handleSuaCong = () => {
    if (!selectedNhanVien || !selectedNgay) return;

    if (modalMode === 'request') {
      if (!suaCongData.lyDo.trim()) {
        alert('Vui lòng nhập lý do');
        return;
      }
      taoYeuCauMutation.mutate({
        nhanVienId: selectedNhanVien.nhanVienId,
        ngayChamCong: selectedNgay.ngay,
        gioVaoMoi: suaCongData.gioVaoMoi ? `${selectedNgay.ngay}T${suaCongData.gioVaoMoi}:00` : undefined,
        gioRaMoi: suaCongData.gioRaMoi ? `${selectedNgay.ngay}T${suaCongData.gioRaMoi}:00` : undefined,
        trangThaiMoi: suaCongData.trangThaiMoi !== selectedNgay.trangThai ? suaCongData.trangThaiMoi : undefined,
        lyDo: suaCongData.lyDo,
      });
    } else {
      suaCongMutation.mutate({
        nhanVienId: selectedNhanVien.nhanVienId,
        ngayChamCong: selectedNgay.ngay,
        gioVao: suaCongData.gioVaoMoi ? `${selectedNgay.ngay}T${suaCongData.gioVaoMoi}:00` : undefined,
        gioRa: suaCongData.gioRaMoi ? `${selectedNgay.ngay}T${suaCongData.gioRaMoi}:00` : undefined,
        trangThai: suaCongData.trangThaiMoi,
        ghiChu: suaCongData.lyDo,
      });
    }
  };

  const thongKe = bangCong?.thongKe;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Bảng Công Tháng {thang}/{nam}
          </h1>
          <p className="text-gray-500">Theo dõi chấm công và sửa công nhân viên</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowDuyetModal(true)}>
            <FileText className="h-4 w-4 mr-2" />
            Duyệt sửa công ({yeuCauChoDuyet?.data?.length || 0})
          </Button>
        </div>
      </div>

      {/* Thống kê */}
      {thongKe && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Nhân viên</p>
                  <p className="text-xl font-bold">{thongKe.tongNhanVien}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Ngày công</p>
                  <p className="text-xl font-bold">{thongKe.tongNgayCong}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500">Giờ OT</p>
                  <p className="text-xl font-bold">{thongKe.tongGioOT.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Đi trễ</p>
                  <p className="text-xl font-bold">{thongKe.tongLanDiTre}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <X className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-gray-500">Nghỉ</p>
                  <p className="text-xl font-bold">{thongKe.tongNgayNghi}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-cyan-500" />
                <div>
                  <p className="text-sm text-gray-500">Chờ duyệt</p>
                  <p className="text-xl font-bold">{thongKe.yeuCauSuaCong.choDuyet}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Điều khiển */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium text-lg min-w-[120px] text-center">
                Tháng {thang}/{nam}
              </span>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <SearchInput
              placeholder="Tìm nhân viên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Đang tải...</div>
          ) : !bangCong?.data?.length ? (
            <div className="text-center py-8 text-gray-500">Không có dữ liệu</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border px-3 py-2 text-left sticky left-0 bg-gray-50 z-10 min-w-[150px]">
                      Nhân viên
                    </th>
                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const d = new Date(nam, thang - 1, i + 1);
                      const thu = d.getDay();
                      return (
                        <th
                          key={i}
                          className={`border px-1 py-1 text-center min-w-[50px] ${getLoaiNgayClass('', thu)}`}
                        >
                          <div className="text-xs">{getThuViet(thu)}</div>
                          <div>{i + 1}</div>
                        </th>
                      );
                    })}
                    <th className="border px-2 py-2 text-center min-w-[60px] bg-gray-100">Công</th>
                    <th className="border px-2 py-2 text-center min-w-[60px] bg-gray-100">OT</th>
                  </tr>
                </thead>
                <tbody>
                  {bangCong.data.map((nv) => (
                    <tr key={nv.nhanVienId} className="hover:bg-gray-50">
                      <td className="border px-3 py-2 sticky left-0 bg-white z-10">
                        <div className="font-medium">{nv.hoTen}</div>
                        <div className="text-xs text-gray-500">{nv.maNhanVien}</div>
                      </td>
                      {nv.chiTiet.map((ngay) => {
                        const { label, color } = getTrangThaiLabel(ngay.trangThai);
                        return (
                          <td
                            key={ngay.ngay}
                            className={`border px-1 py-1 text-center cursor-pointer hover:bg-blue-50 ${getLoaiNgayClass(
                              ngay.loaiNgay,
                              ngay.thuTrongTuan
                            )}`}
                            onClick={() => openDayModal(nv, ngay, 'view')}
                          >
                            <div className="text-xs">
                              {ngay.trangThai === 'DI_LAM' ? (
                                <>
                                  <div className="text-green-600">{formatTime(ngay.gioVao)}</div>
                                  <div className="text-blue-600">{formatTime(ngay.gioRa)}</div>
                                </>
                              ) : (
                                <Badge variant={color as 'success' | 'warning' | 'danger' | 'default' | 'neutral' | 'info'} className="text-[10px] px-1">
                                  {label}
                                </Badge>
                              )}
                            </div>
                            {ngay.coYeuCauSuaCong && (
                              <Edit className="h-3 w-3 text-orange-500 mx-auto" />
                            )}
                          </td>
                        );
                      })}
                      <td className="border px-2 py-2 text-center font-medium bg-gray-50">
                        {nv.tongKet.soNgayDiLam}
                      </td>
                      <td className="border px-2 py-2 text-center font-medium bg-gray-50">
                        {nv.tongKet.soGioOT.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Chú thích */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-50 border" /> Chủ nhật
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-yellow-50 border" /> Thứ 7
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-100 border" /> Ngày lễ
            </span>
            <span className="flex items-center gap-1">
              <Edit className="h-3 w-3 text-orange-500" /> Có yêu cầu sửa
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Modal chi tiết ngày */}
      <Modal isOpen={!!selectedNgay} onClose={closeModal}>
        <ModalHeader title={
          modalMode === 'view' ? 'Chi tiết chấm công' :
          modalMode === 'edit' ? 'Sửa công trực tiếp' : 'Yêu cầu sửa công'
        } />
        <ModalBody>
          {selectedNgay && selectedNhanVien && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Nhân viên:</span>
                  <span className="ml-2 font-medium">{selectedNhanVien.hoTen}</span>
                </div>
                <div>
                  <span className="text-gray-500">Ngày:</span>
                  <span className="ml-2 font-medium">{selectedNgay.ngay}</span>
                </div>
              </div>

              {modalMode === 'view' ? (
                <>
                  <div className="grid grid-cols-2 gap-4 text-sm border rounded p-3">
                    <div>
                      <span className="text-gray-500">Giờ vào:</span>
                      <span className="ml-2">{formatTime(selectedNgay.gioVao)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Giờ ra:</span>
                      <span className="ml-2">{formatTime(selectedNgay.gioRa)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Trạng thái:</span>
                      <Badge variant={getTrangThaiLabel(selectedNgay.trangThai).color as 'default'} className="ml-2">
                        {getTrangThaiLabel(selectedNgay.trangThai).label}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-gray-500">Giờ làm:</span>
                      <span className="ml-2">{selectedNgay.soGioLam.toFixed(1)}h</span>
                    </div>
                    {selectedNgay.phutDiTre && selectedNgay.phutDiTre > 0 && (
                      <div className="text-orange-600">
                        Đi trễ: {selectedNgay.phutDiTre} phút
                      </div>
                    )}
                    {selectedNgay.phutVeSom && selectedNgay.phutVeSom > 0 && (
                      <div className="text-orange-600">
                        Về sớm: {selectedNgay.phutVeSom} phút
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setModalMode('edit')}>
                      <Edit className="h-4 w-4 mr-2" />
                      Sửa trực tiếp
                    </Button>
                    <Button variant="outline" onClick={() => setModalMode('request')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Tạo yêu cầu sửa
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Giờ vào mới</label>
                      <input
                        type="time"
                        className="w-full border rounded px-3 py-2"
                        value={suaCongData.gioVaoMoi}
                        onChange={(e) => setSuaCongData({ ...suaCongData, gioVaoMoi: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Giờ ra mới</label>
                      <input
                        type="time"
                        className="w-full border rounded px-3 py-2"
                        value={suaCongData.gioRaMoi}
                        onChange={(e) => setSuaCongData({ ...suaCongData, gioRaMoi: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Trạng thái</label>
                    <select
                      className="w-full border rounded px-3 py-2"
                      value={suaCongData.trangThaiMoi}
                      onChange={(e) => setSuaCongData({ ...suaCongData, trangThaiMoi: e.target.value })}
                    >
                      <option value="DI_LAM">Đi làm</option>
                      <option value="NGHI_PHEP">Nghỉ phép</option>
                      <option value="NGHI_KHONG_LUONG">Nghỉ không lương</option>
                      <option value="NGHI_BENH">Nghỉ bệnh</option>
                      <option value="VANG_MAT">Vắng mặt</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {modalMode === 'request' ? 'Lý do sửa (bắt buộc)' : 'Ghi chú'}
                    </label>
                    <Textarea
                      placeholder={modalMode === 'request' ? 'Nhập lý do yêu cầu sửa công...' : 'Ghi chú...'}
                      value={suaCongData.lyDo}
                      onChange={(e) => setSuaCongData({ ...suaCongData, lyDo: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={closeModal}>
            Đóng
          </Button>
          {modalMode !== 'view' && (
            <Button
              onClick={handleSuaCong}
              disabled={taoYeuCauMutation.isPending || suaCongMutation.isPending}
            >
              {taoYeuCauMutation.isPending || suaCongMutation.isPending ? 'Đang xử lý...' : 'Lưu'}
            </Button>
          )}
        </ModalFooter>
      </Modal>

      {/* Modal duyệt yêu cầu sửa công */}
      <DuyetSuaCongModal
        open={showDuyetModal}
        onClose={() => setShowDuyetModal(false)}
        yeuCauList={yeuCauChoDuyet?.data || []}
        onDuyet={(id, approved, lyDo) => {
          duyetMutation.mutate({
            id,
            payload: {
              trangThaiDuyet: approved ? 'DA_DUYET' : 'TU_CHOI',
              lyDoTuChoi: lyDo,
            },
          });
        }}
        isLoading={duyetMutation.isPending}
      />
    </div>
  );
}

// ===== SUB COMPONENT: Modal duyệt sửa công =====

function DuyetSuaCongModal({
  open,
  onClose,
  yeuCauList,
  onDuyet,
  isLoading,
}: {
  open: boolean;
  onClose: () => void;
  yeuCauList: YeuCauSuaCong[];
  onDuyet: (id: number, approved: boolean, lyDo?: string) => void;
  isLoading: boolean;
}) {
  const [lyDoTuChoi, setLyDoTuChoi] = useState<Record<number, string>>({});

  return (
    <Modal isOpen={open} onClose={onClose} size="xl">
      <ModalHeader title="Duyệt yêu cầu sửa công" />
      <ModalBody>
        {yeuCauList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Không có yêu cầu nào đang chờ duyệt
          </div>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {yeuCauList.map((yc) => (
              <Card key={yc.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="font-medium">
                      {yc.nhanVien?.hoTen} - {yc.nhanVien?.maNhanVien}
                    </div>
                    <div className="text-sm text-gray-500">
                      Ngày: {new Date(yc.ngayChamCong).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Thay đổi:</span>
                      {yc.gioVaoMoi && (
                        <span className="ml-2">
                          Giờ vào: {formatTime(yc.gioVaoCu)} → {formatTime(yc.gioVaoMoi)}
                        </span>
                      )}
                      {yc.gioRaMoi && (
                        <span className="ml-2">
                          Giờ ra: {formatTime(yc.gioRaCu)} → {formatTime(yc.gioRaMoi)}
                        </span>
                      )}
                      {yc.trangThaiMoi && (
                        <span className="ml-2">
                          Trạng thái: {yc.trangThaiCu} → {yc.trangThaiMoi}
                        </span>
                      )}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Lý do:</span>
                      <span className="ml-2">{yc.lyDo}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Người tạo: {yc.nguoiTao?.hoTen} - {new Date(yc.ngayTao).toLocaleString('vi-VN')}
                    </div>
                    <Textarea
                      placeholder="Lý do từ chối (nếu từ chối)"
                      value={lyDoTuChoi[yc.id] || ''}
                      onChange={(e) => setLyDoTuChoi({ ...lyDoTuChoi, [yc.id]: e.target.value })}
                      rows={2}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onDuyet(yc.id, true)}
                      disabled={isLoading}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Duyệt
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDuyet(yc.id, false, lyDoTuChoi[yc.id])}
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Từ chối
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Đóng
        </Button>
      </ModalFooter>
    </Modal>
  );
}
