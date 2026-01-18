// Quản lý thiết bị nhân viên - Sprint 8
// CRUD + Reset device binding
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  SearchInput,
} from '@/components/ui';
import {
  Smartphone,
  RefreshCw,
  Lock,
  History,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Monitor,
} from 'lucide-react';
import { antiFraudApi, ThietBiNhanVien, ResetDeviceDto } from '@/services/antiFraudApi';

// Format date helper
const formatDate = (dateStr?: string) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function QuanLyThietBi() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [trangThai, setTrangThai] = useState<string>('');
  const [page, setPage] = useState(1);
  const [resetModal, setResetModal] = useState<{ open: boolean; device?: ThietBiNhanVien }>({
    open: false,
  });
  const [lyDoReset, setLyDoReset] = useState('');
  const [historyModal, setHistoryModal] = useState<{ open: boolean; nhanVienId?: number }>({
    open: false,
  });

  // Query danh sách thiết bị
  const { data: devices, isLoading } = useQuery({
    queryKey: ['devices', { search, trangThai, page }],
    queryFn: () => antiFraudApi.layDanhSachThietBi({ search, trangThai, page, limit: 20 }),
  });

  // Query lịch sử thiết bị
  const { data: history } = useQuery({
    queryKey: ['device-history', historyModal.nhanVienId],
    queryFn: () =>
      historyModal.nhanVienId
        ? antiFraudApi.layLichSuThietBi({ nhanVienId: historyModal.nhanVienId, limit: 50 })
        : null,
    enabled: historyModal.open && !!historyModal.nhanVienId,
  });

  // Mutation reset device
  const resetMutation = useMutation({
    mutationFn: (data: ResetDeviceDto) => antiFraudApi.resetDevice(data),
    onSuccess: () => {
      alert('Đã reset thiết bị thành công');
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      setResetModal({ open: false });
      setLyDoReset('');
    },
    onError: (error: Error) => {
      alert(error.message || 'Có lỗi xảy ra');
    },
  });

  // Mutation block device
  const blockMutation = useMutation({
    mutationFn: ({ nhanVienId, lyDo }: { nhanVienId: number; lyDo: string }) =>
      antiFraudApi.blockDevice(nhanVienId, lyDo),
    onSuccess: () => {
      alert('Đã khóa thiết bị');
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
    onError: (error: Error) => {
      alert(error.message || 'Có lỗi xảy ra');
    },
  });

  const handleReset = () => {
    if (!resetModal.device || !lyDoReset.trim()) {
      alert('Vui lòng nhập lý do reset');
      return;
    }
    resetMutation.mutate({
      nhanVienId: resetModal.device.nhanVienId,
      lyDo: lyDoReset,
    });
  };

  const getTrangThaiInfo = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return { label: 'Hoạt động', variant: 'success' as const, icon: CheckCircle2 };
      case 'BLOCKED':
        return { label: 'Đã khóa', variant: 'danger' as const, icon: Lock };
      case 'PENDING_RESET':
        return { label: 'Chờ reset', variant: 'warning' as const, icon: Clock };
      default:
        return { label: status, variant: 'neutral' as const, icon: AlertTriangle };
    }
  };

  const getPlatformIcon = (platform?: string) => {
    if (!platform) return <Monitor className="h-4 w-4" />;
    const p = platform.toLowerCase();
    if (p.includes('ios') || p.includes('iphone')) return <Smartphone className="h-4 w-4" />;
    if (p.includes('android')) return <Smartphone className="h-4 w-4" />;
    return <Monitor className="h-4 w-4" />;
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý thiết bị</h1>
          <p className="text-gray-500">
            Sprint 8: Device Binding - Mỗi nhân viên chỉ được đăng nhập từ 1 thiết bị
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <span className="text-sm font-medium text-gray-500">Tổng thiết bị</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{devices?.total || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <span className="text-sm font-medium text-gray-500">Hoạt động</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {devices?.data?.filter((d) => d.trangThai === 'ACTIVE').length || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <span className="text-sm font-medium text-gray-500">Chờ reset</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {devices?.data?.filter((d) => d.trangThai === 'PENDING_RESET').length || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <span className="text-sm font-medium text-gray-500">Đã khóa</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {devices?.data?.filter((d) => d.trangThai === 'BLOCKED').length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Danh sách thiết bị</h2>
              <p className="text-sm text-gray-500">Quản lý thiết bị đã đăng ký của nhân viên</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <SearchInput
                placeholder="Tìm theo tên, mã nhân viên..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border rounded-lg bg-white"
              value={trangThai}
              onChange={(e) => setTrangThai(e.target.value)}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="ACTIVE">Hoạt động</option>
              <option value="PENDING_RESET">Chờ reset</option>
              <option value="BLOCKED">Đã khóa</option>
            </select>
          </div>

          {/* Table */}
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>Nhân viên</TableHeadCell>
                <TableHeadCell>Thiết bị</TableHeadCell>
                <TableHeadCell>Trạng thái</TableHeadCell>
                <TableHeadCell>Ngày đăng ký</TableHeadCell>
                <TableHeadCell>Đăng nhập cuối</TableHeadCell>
                <TableHeadCell align="right">Thao tác</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : devices?.data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Chưa có thiết bị nào được đăng ký
                  </TableCell>
                </TableRow>
              ) : (
                devices?.data?.map((device) => {
                  const status = getTrangThaiInfo(device.trangThai);
                  const StatusIcon = status.icon;
                  return (
                    <TableRow key={device.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{device.nhanVien?.hoTen || 'N/A'}</div>
                          <div className="text-sm text-gray-500">
                            {device.nhanVien?.maNhanVien}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getPlatformIcon(device.platform)}
                          <div>
                            <div className="font-medium">{device.tenThietBi || 'Không xác định'}</div>
                            <div className="text-xs text-gray-500 truncate max-w-[200px]">
                              {device.deviceId?.substring(0, 20)}...
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(device.ngayDangKy)}</TableCell>
                      <TableCell>{formatDate(device.lanDangNhapCuoi)}</TableCell>
                      <TableCell align="right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Xem lịch sử"
                            onClick={() =>
                              setHistoryModal({ open: true, nhanVienId: device.nhanVienId })
                            }
                          >
                            <History className="h-4 w-4" />
                          </Button>
                          {device.trangThai !== 'PENDING_RESET' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Reset thiết bị"
                              onClick={() => setResetModal({ open: true, device })}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
                          {device.trangThai === 'ACTIVE' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Khóa thiết bị"
                              onClick={() => {
                                if (confirm('Bạn có chắc muốn khóa thiết bị này?')) {
                                  blockMutation.mutate({
                                    nhanVienId: device.nhanVienId,
                                    lyDo: 'Khóa thủ công bởi HR',
                                  });
                                }
                              }}
                            >
                              <Lock className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {devices && devices.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Trước
              </Button>
              <span className="flex items-center px-4 text-sm">
                Trang {page} / {devices.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page === devices.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Sau
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reset Modal */}
      <Modal isOpen={resetModal.open} onClose={() => setResetModal({ open: false })}>
        <ModalHeader title="Reset thiết bị" />
        <ModalBody>
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <div className="font-medium">{resetModal.device?.nhanVien?.hoTen}</div>
              <div className="text-sm text-gray-500">
                Thiết bị hiện tại: {resetModal.device?.tenThietBi || 'Không xác định'}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Lý do reset *</label>
              <Textarea
                placeholder="Nhập lý do reset thiết bị..."
                value={lyDoReset}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setLyDoReset(e.target.value)}
                rows={3}
              />
            </div>
            <p className="text-sm text-gray-500">
              Reset sẽ cho phép nhân viên đăng nhập từ thiết bị mới
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setResetModal({ open: false })}>
            Hủy
          </Button>
          <Button onClick={handleReset} disabled={resetMutation.isPending}>
            {resetMutation.isPending ? 'Đang xử lý...' : 'Xác nhận reset'}
          </Button>
        </ModalFooter>
      </Modal>

      {/* History Modal */}
      <Modal isOpen={historyModal.open} onClose={() => setHistoryModal({ open: false })} size="lg">
        <ModalHeader title="Lịch sử thiết bị" />
        <ModalBody className="max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {history?.data?.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Chưa có lịch sử</p>
            ) : (
              history?.data?.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-4 p-4 border rounded-lg"
                >
                  <div
                    className={`p-2 rounded-full ${
                      log.hanhDong === 'BIND'
                        ? 'bg-green-100 text-green-600'
                        : log.hanhDong === 'RESET'
                        ? 'bg-yellow-100 text-yellow-600'
                        : log.hanhDong === 'BLOCK'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100'
                    }`}
                  >
                    {log.hanhDong === 'BIND' && <Smartphone className="h-4 w-4" />}
                    {log.hanhDong === 'RESET' && <RefreshCw className="h-4 w-4" />}
                    {log.hanhDong === 'BLOCK' && <Lock className="h-4 w-4" />}
                    {log.hanhDong === 'LOGIN_BLOCKED' && <AlertTriangle className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">
                      {log.hanhDong === 'BIND' && 'Đăng ký thiết bị mới'}
                      {log.hanhDong === 'RESET' && 'Reset thiết bị'}
                      {log.hanhDong === 'BLOCK' && 'Khóa thiết bị'}
                      {log.hanhDong === 'LOGIN_BLOCKED' && 'Chặn đăng nhập từ thiết bị lạ'}
                    </div>
                    {log.lyDo && (
                      <div className="text-sm text-gray-500">Lý do: {log.lyDo}</div>
                    )}
                    {log.nguoiThucHien && (
                      <div className="text-sm text-gray-500">
                        Thực hiện bởi: {log.nguoiThucHien.hoTen}
                      </div>
                    )}
                    <div className="text-xs text-gray-400 mt-1">
                      {formatDate(log.ngayTao)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
