// Trang Lịch sử GPS Logs - Sprint 7 Anti-fraud
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Navigation,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Download,
} from 'lucide-react';
import { antiFraudApi, GPSLog } from '../services/antiFraudApi';
import { nhanVienApi, phongBanApi } from '../services/api';
import { Card, Badge, Button } from '../components/ui';

export default function GPSLogs() {
  // State
  const [filterNhanVien, setFilterNhanVien] = useState<number | undefined>();
  const [filterPhongBan, setFilterPhongBan] = useState<number | undefined>();
  const [filterTrangThai, setFilterTrangThai] = useState<string | undefined>();
  const [tuNgay, setTuNgay] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [denNgay, setDenNgay] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [page, setPage] = useState(1);
  const limit = 20;

  // Queries
  const { data: logsData, isLoading } = useQuery({
    queryKey: ['gps-logs', filterNhanVien, filterTrangThai, tuNgay, denNgay, page],
    queryFn: () =>
      antiFraudApi.layLichSuGPS({
        nhanVienId: filterNhanVien,
        tuNgay,
        denNgay,
        trangThai: filterTrangThai,
        page,
        limit,
      }),
  });

  const { data: thongKe } = useQuery({
    queryKey: ['gps-thong-ke', tuNgay, denNgay, filterPhongBan],
    queryFn: () => antiFraudApi.thongKeGPS(tuNgay, denNgay, filterPhongBan),
    enabled: !!tuNgay && !!denNgay,
  });

  const { data: phongBans } = useQuery({
    queryKey: ['phong-ban'],
    queryFn: phongBanApi.layTatCa,
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

  // Helpers
  const getTrangThaiIcon = (trangThai: string) => {
    switch (trangThai) {
      case 'HOP_LE':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'NGOAI_VUNG':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'CANH_BAO':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'KHONG_CO_GPS':
        return <Navigation className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getTrangThaiLabel = (trangThai: string) => {
    switch (trangThai) {
      case 'HOP_LE':
        return <Badge variant="success">Hợp lệ</Badge>;
      case 'NGOAI_VUNG':
        return <Badge variant="danger">Ngoài vùng</Badge>;
      case 'CANH_BAO':
        return <Badge variant="warning">Cảnh báo</Badge>;
      case 'KHONG_CO_GPS':
        return <Badge variant="neutral">Không GPS</Badge>;
      default:
        return <Badge variant="neutral">{trangThai}</Badge>;
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const nhanVienList = Array.isArray(nhanViens) ? nhanViens : nhanViens?.data || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Lịch sử GPS Chấm công
          </h1>
          <p className="text-[var(--text-muted)]">
            Theo dõi và kiểm tra vị trí chấm công của nhân viên
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Xuất Excel
        </Button>
      </div>

      {/* Thống kê */}
      {thongKe && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold">{thongKe.thongKe.tongBanGhi}</p>
            <p className="text-sm text-[var(--text-muted)]">Tổng bản ghi</p>
          </Card>
          <Card className="p-4 text-center bg-green-50">
            <p className="text-2xl font-bold text-green-600">{thongKe.thongKe.hopLe}</p>
            <p className="text-sm text-green-600">Hợp lệ ({thongKe.thongKe.tyLeHopLe}%)</p>
          </Card>
          <Card className="p-4 text-center bg-red-50">
            <p className="text-2xl font-bold text-red-600">{thongKe.thongKe.ngoaiVung}</p>
            <p className="text-sm text-red-600">Ngoài vùng</p>
          </Card>
          <Card className="p-4 text-center bg-yellow-50">
            <p className="text-2xl font-bold text-yellow-600">{thongKe.thongKe.canhBao}</p>
            <p className="text-sm text-yellow-600">Cảnh báo</p>
          </Card>
          <Card className="p-4 text-center bg-gray-50">
            <p className="text-2xl font-bold text-gray-600">{thongKe.thongKe.khongGPS}</p>
            <p className="text-sm text-gray-600">Không GPS</p>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Từ ngày</label>
            <input
              type="date"
              value={tuNgay}
              onChange={(e) => {
                setTuNgay(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Đến ngày</label>
            <input
              type="date"
              value={denNgay}
              onChange={(e) => {
                setDenNgay(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phòng ban</label>
            <select
              value={filterPhongBan || ''}
              onChange={(e) => {
                setFilterPhongBan(e.target.value ? Number(e.target.value) : undefined);
                setFilterNhanVien(undefined);
                setPage(1);
              }}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Tất cả</option>
              {phongBans?.map((pb: any) => (
                <option key={pb.id} value={pb.id}>
                  {pb.tenPhongBan}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nhân viên</label>
            <select
              value={filterNhanVien || ''}
              onChange={(e) => {
                setFilterNhanVien(e.target.value ? Number(e.target.value) : undefined);
                setPage(1);
              }}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Tất cả</option>
              {nhanVienList.map((nv: any) => (
                <option key={nv.id} value={nv.id}>
                  {nv.hoTen} ({nv.maNhanVien})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <select
              value={filterTrangThai || ''}
              onChange={(e) => {
                setFilterTrangThai(e.target.value || undefined);
                setPage(1);
              }}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Tất cả</option>
              <option value="HOP_LE">Hợp lệ</option>
              <option value="NGOAI_VUNG">Ngoài vùng</option>
              <option value="CANH_BAO">Cảnh báo</option>
              <option value="KHONG_CO_GPS">Không GPS</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Logs Table */}
      <Card>
        {isLoading ? (
          <div className="p-8 text-center text-[var(--text-muted)]">Đang tải...</div>
        ) : !logsData?.data?.length ? (
          <div className="p-8 text-center text-[var(--text-muted)]">
            <Navigation className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Không có dữ liệu GPS trong khoảng thời gian này</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--bg-secondary)] border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Thời gian</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Nhân viên</th>
                    <th className="px-4 py-3 text-center text-sm font-medium">Loại</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Tọa độ</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Geofence</th>
                    <th className="px-4 py-3 text-center text-sm font-medium">Khoảng cách</th>
                    <th className="px-4 py-3 text-center text-sm font-medium">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {logsData.data.map((log: GPSLog) => (
                    <tr key={log.id} className="hover:bg-[var(--bg-secondary)]/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{formatTime(log.thoiGian)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium">NV #{log.nhanVienId}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant={log.loaiChamCong === 'CHECK_IN' ? 'success' : 'info'}>
                          {log.loaiChamCong === 'CHECK_IN' ? 'Vào' : 'Ra'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        {log.viDo && log.kinhDo ? (
                          <a
                            href={`https://maps.google.com/?q=${log.viDo},${log.kinhDo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:underline text-sm"
                          >
                            <MapPin className="w-3 h-3 inline mr-1" />
                            {log.viDo.toFixed(5)}, {log.kinhDo.toFixed(5)}
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">Không có</span>
                        )}
                        {log.doChinhXacMet && (
                          <span className="text-xs text-gray-400 ml-2">
                            (±{log.doChinhXacMet}m)
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {log.geofence ? (
                          <span className="text-sm">{log.geofence.tenDiaDiem}</span>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {log.khoangCachMet !== undefined && log.khoangCachMet !== null ? (
                          <span
                            className={`font-medium ${
                              log.trongVung ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {log.khoangCachMet}m
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {getTrangThaiIcon(log.trangThai)}
                          {getTrangThaiLabel(log.trangThai)}
                        </div>
                        {log.ghiChu && (
                          <p className="text-xs text-gray-500 mt-1">{log.ghiChu}</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <p className="text-sm text-[var(--text-muted)]">
                Hiển thị {(page - 1) * limit + 1}-{Math.min(page * limit, logsData.total)} /{' '}
                {logsData.total} bản ghi
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="px-3 py-1 bg-[var(--bg-secondary)] rounded">
                  {page} / {logsData.totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= (logsData.totalPages || 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
