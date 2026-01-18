// Reports Page - Sprint 12 (Compatible with existing components)
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  reportsApi,
  ReportFilter,
  DiTreVeSomReport,
  OTReport,
  NghiPhepReport,
  QuyLuongReport,
  HeadcountReport,
  ChamCongReport,
  DashboardReport,
} from '../../services/reportsApi';
import { Card, CardHeader, CardContent, Badge, Button } from '../../components/ui';
import {
  Clock,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Info,
  XCircle,
  FileDown,
  RefreshCw,
  ChevronDown,
} from 'lucide-react';

type LoaiBaoCao = 'dashboard' | 'di-tre' | 'ot' | 'nghi-phep' | 'quy-luong' | 'headcount' | 'cham-cong';

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

// Helper functions
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('vi-VN');
};

export default function ReportsPage() {
  const [loaiBaoCao, setLoaiBaoCao] = useState<LoaiBaoCao>('dashboard');
  const [filter, setFilter] = useState<ReportFilter>({
    thang: currentMonth,
    nam: currentYear,
  });

  // Queries
  const dashboardQuery = useQuery({
    queryKey: ['reports', 'dashboard', filter.thang, filter.nam],
    queryFn: () => reportsApi.getDashboard(filter.thang, filter.nam),
    enabled: loaiBaoCao === 'dashboard',
  });

  const diTreQuery = useQuery({
    queryKey: ['reports', 'di-tre', filter],
    queryFn: () => reportsApi.getDiTreVeSom(filter),
    enabled: loaiBaoCao === 'di-tre',
  });

  const otQuery = useQuery({
    queryKey: ['reports', 'ot', filter],
    queryFn: () => reportsApi.getOT(filter),
    enabled: loaiBaoCao === 'ot',
  });

  const nghiPhepQuery = useQuery({
    queryKey: ['reports', 'nghi-phep', filter],
    queryFn: () => reportsApi.getNghiPhep(filter),
    enabled: loaiBaoCao === 'nghi-phep',
  });

  const quyLuongQuery = useQuery({
    queryKey: ['reports', 'quy-luong', filter],
    queryFn: () => reportsApi.getQuyLuong(filter),
    enabled: loaiBaoCao === 'quy-luong',
  });

  const headcountQuery = useQuery({
    queryKey: ['reports', 'headcount', filter],
    queryFn: () => reportsApi.getHeadcount(filter),
    enabled: loaiBaoCao === 'headcount',
  });

  const chamCongQuery = useQuery({
    queryKey: ['reports', 'cham-cong', filter],
    queryFn: () => reportsApi.getChamCong(filter),
    enabled: loaiBaoCao === 'cham-cong',
  });

  const isLoading =
    dashboardQuery.isLoading ||
    diTreQuery.isLoading ||
    otQuery.isLoading ||
    nghiPhepQuery.isLoading ||
    quyLuongQuery.isLoading ||
    headcountQuery.isLoading ||
    chamCongQuery.isLoading;

  const refetchCurrent = () => {
    switch (loaiBaoCao) {
      case 'dashboard': dashboardQuery.refetch(); break;
      case 'di-tre': diTreQuery.refetch(); break;
      case 'ot': otQuery.refetch(); break;
      case 'nghi-phep': nghiPhepQuery.refetch(); break;
      case 'quy-luong': quyLuongQuery.refetch(); break;
      case 'headcount': headcountQuery.refetch(); break;
      case 'cham-cong': chamCongQuery.refetch(); break;
    }
  };

  const tabs: { key: LoaiBaoCao; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'di-tre', label: 'Đi trễ/Về sớm' },
    { key: 'ot', label: 'Tăng ca (OT)' },
    { key: 'nghi-phep', label: 'Nghỉ phép' },
    { key: 'quy-luong', label: 'Quỹ lương' },
    { key: 'headcount', label: 'Nhân sự' },
    { key: 'cham-cong', label: 'Chấm công' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Báo cáo & Thống kê</h1>
          <p className="text-slate-500">Xem tổng hợp và chi tiết các báo cáo nhân sự</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refetchCurrent} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
          <Button variant="primary">
            <FileDown className="h-4 w-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Tháng</label>
              <div className="relative">
                <select
                  value={filter.thang}
                  onChange={(e) => setFilter({ ...filter, thang: Number(e.target.value) })}
                  className="w-32 px-3 py-2 border border-slate-200 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                    <option key={m} value={m}>Tháng {m}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Năm</label>
              <div className="relative">
                <select
                  value={filter.nam}
                  onChange={(e) => setFilter({ ...filter, nam: Number(e.target.value) })}
                  className="w-28 px-3 py-2 border border-slate-200 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {[2023, 2024, 2025, 2026].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex flex-wrap gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setLoaiBaoCao(tab.key)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                loaiBaoCao === tab.key
                  ? 'text-blue-600 border-b-2 border-blue-600 -mb-[1px]'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {loaiBaoCao === 'dashboard' && (
          <DashboardTab data={dashboardQuery.data?.data} isLoading={dashboardQuery.isLoading} />
        )}
        {loaiBaoCao === 'di-tre' && (
          <DiTreTab data={diTreQuery.data?.data} isLoading={diTreQuery.isLoading} />
        )}
        {loaiBaoCao === 'ot' && (
          <OTTab data={otQuery.data?.data} isLoading={otQuery.isLoading} />
        )}
        {loaiBaoCao === 'nghi-phep' && (
          <NghiPhepTab data={nghiPhepQuery.data?.data} isLoading={nghiPhepQuery.isLoading} />
        )}
        {loaiBaoCao === 'quy-luong' && (
          <QuyLuongTab data={quyLuongQuery.data?.data} isLoading={quyLuongQuery.isLoading} />
        )}
        {loaiBaoCao === 'headcount' && (
          <HeadcountTab data={headcountQuery.data?.data} isLoading={headcountQuery.isLoading} />
        )}
        {loaiBaoCao === 'cham-cong' && (
          <ChamCongTab data={chamCongQuery.data?.data} isLoading={chamCongQuery.isLoading} />
        )}
      </div>
    </div>
  );
}

// Dashboard Tab
function DashboardTab({ data, isLoading }: { data?: DashboardReport; isLoading: boolean }) {
  if (isLoading) return <LoadingSkeleton />;
  if (!data) return <EmptyState message="Không có dữ liệu dashboard" />;

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.kpis.map((kpi, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{kpi.ten}</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {kpi.donVi === 'VND' ? formatCurrency(kpi.giaTri) : kpi.giaTri.toLocaleString()}
                    {kpi.donVi !== 'VND' && <span className="text-sm ml-1">{kpi.donVi}</span>}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-${kpi.mau}-100`}>
                  {kpi.icon === 'users' && <Users className="h-6 w-6 text-blue-600" />}
                  {kpi.icon === 'dollar' && <DollarSign className="h-6 w-6 text-green-600" />}
                  {kpi.icon === 'clock' && <Clock className="h-6 w-6 text-amber-600" />}
                  {kpi.icon === 'calendar' && <Calendar className="h-6 w-6 text-purple-600" />}
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                {kpi.soSanhThangTruoc >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={kpi.soSanhThangTruoc >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {Math.abs(kpi.soSanhThangTruoc).toFixed(1)}%
                </span>
                <span className="text-slate-500 ml-1">so với tháng trước</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      {data.alerts.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h3 className="font-semibold text-lg">Cảnh báo & Thông báo</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.alerts.map((alert, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    alert.loai === 'ERROR' ? 'bg-red-50 border border-red-200' :
                    alert.loai === 'WARNING' ? 'bg-amber-50 border border-amber-200' :
                    'bg-blue-50 border border-blue-200'
                  }`}
                >
                  {alert.loai === 'ERROR' && <XCircle className="h-5 w-5 text-red-500 mt-0.5" />}
                  {alert.loai === 'WARNING' && <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />}
                  {alert.loai === 'INFO' && <Info className="h-5 w-5 text-blue-500 mt-0.5" />}
                  <div className="flex-1">
                    <p className="font-medium">{alert.tieuDe}</p>
                    <p className="text-sm text-slate-600">{alert.moTa}</p>
                  </div>
                  <Badge variant="neutral">{alert.soLuong}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Simple Charts using progress bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biến động nhân sự */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Biến động nhân sự 6 tháng</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.bienDongNhanSu.map((item, i) => {
                const maxVal = Math.max(...data.bienDongNhanSu.map((x) => x.moiTuyen + x.nghiViec), 1);
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Tháng {item.thang}</span>
                      <span className="text-green-600">+{item.moiTuyen}</span>
                      <span className="text-red-600">-{item.nghiViec}</span>
                    </div>
                    <div className="flex gap-1 h-2">
                      <div
                        className="bg-green-500 rounded"
                        style={{ width: `${(item.moiTuyen / maxVal) * 100}%` }}
                      />
                      <div
                        className="bg-red-500 rounded"
                        style={{ width: `${(item.nghiViec / maxVal) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Phân bổ lương */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Phân bổ quỹ lương theo phòng ban</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.phanBoLuongTheoPB.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.tenPhongBan}</span>
                    <span className="text-slate-600">{item.tyLe.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.tyLe}%`,
                        backgroundColor: `hsl(${210 + i * 30}, 70%, 50%)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Di trễ Tab
function DiTreTab({ data, isLoading }: { data?: DiTreVeSomReport; isLoading: boolean }) {
  if (isLoading) return <LoadingSkeleton />;
  if (!data) return <EmptyState message="Không có dữ liệu đi trễ/về sớm" />;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <SummaryCard title="Nhân viên vi phạm" value={data.summary.tongNhanVien} icon={<Users className="h-5 w-5" />} />
        <SummaryCard title="Lượt đi trễ" value={data.summary.tongLuotDiTre} icon={<Clock className="h-5 w-5" />} color="red" />
        <SummaryCard title="Lượt về sớm" value={data.summary.tongLuotVeSom} icon={<Clock className="h-5 w-5" />} color="amber" />
        <SummaryCard title="Tổng phút trễ" value={data.summary.tongPhutTre} unit="phút" icon={<Clock className="h-5 w-5" />} />
        <SummaryCard title="Tổng phút về sớm" value={data.summary.tongPhutVeSom} unit="phút" icon={<Clock className="h-5 w-5" />} />
      </div>

      {/* Top đi trễ */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Top nhân viên đi trễ nhiều nhất</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.summary.topDiTre.map((nv, i) => (
              <div key={nv.nhanVienId} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                    {i + 1}
                  </div>
                  <span className="font-medium">{nv.hoTen}</span>
                </div>
                <Badge variant="danger">{nv.soLan} lần</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Chi tiết ({data.chiTiet.length} bản ghi)</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 font-medium text-slate-600">Mã NV</th>
                  <th className="text-left p-3 font-medium text-slate-600">Họ tên</th>
                  <th className="text-left p-3 font-medium text-slate-600">Phòng ban</th>
                  <th className="text-left p-3 font-medium text-slate-600">Ngày</th>
                  <th className="text-center p-3 font-medium text-slate-600">Giờ vào</th>
                  <th className="text-center p-3 font-medium text-slate-600">Giờ ra</th>
                  <th className="text-right p-3 font-medium text-slate-600">Phút trễ</th>
                  <th className="text-right p-3 font-medium text-slate-600">Phút về sớm</th>
                </tr>
              </thead>
              <tbody>
                {data.chiTiet.slice(0, 50).map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-3">{row.maNhanVien}</td>
                    <td className="p-3">{row.hoTen}</td>
                    <td className="p-3">{row.phongBan}</td>
                    <td className="p-3">{formatDate(row.ngay)}</td>
                    <td className="text-center p-3">{row.gioVao || '-'}</td>
                    <td className="text-center p-3">{row.gioRa || '-'}</td>
                    <td className="text-right p-3">
                      {row.soPhutTre > 0 && <span className="text-red-600 font-medium">{row.soPhutTre}</span>}
                    </td>
                    <td className="text-right p-3">
                      {row.soPhutVeSom > 0 && <span className="text-amber-600 font-medium">{row.soPhutVeSom}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// OT Tab
function OTTab({ data, isLoading }: { data?: OTReport; isLoading: boolean }) {
  if (isLoading) return <LoadingSkeleton />;
  if (!data) return <EmptyState message="Không có dữ liệu tăng ca" />;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard title="Nhân viên OT" value={data.summary.tongNhanVien} icon={<Users className="h-5 w-5" />} />
        <SummaryCard title="Tổng giờ OT" value={data.summary.tongGioOT.toFixed(1)} unit="giờ" icon={<Clock className="h-5 w-5" />} color="blue" />
        <SummaryCard title="Tổng tiền OT" value={formatCurrency(data.summary.tongTienOT)} icon={<DollarSign className="h-5 w-5" />} color="green" />
        <SummaryCard title="TB giờ OT/ngày" value={data.summary.trungBinhGioOTNgay.toFixed(2)} unit="giờ" icon={<Clock className="h-5 w-5" />} />
      </div>

      {/* OT by PB */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Top phòng ban OT nhiều nhất</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.summary.phongBanNhieuOTNhat.map((pb, i) => {
              const maxGio = Math.max(...data.summary.phongBanNhieuOTNhat.map((x) => x.tongGio), 1);
              return (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{pb.phongBan}</span>
                    <span className="font-medium">{pb.tongGio.toFixed(1)} giờ</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(pb.tongGio / maxGio) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Nghỉ phép Tab
function NghiPhepTab({ data, isLoading }: { data?: NghiPhepReport; isLoading: boolean }) {
  if (isLoading) return <LoadingSkeleton />;
  if (!data) return <EmptyState message="Không có dữ liệu nghỉ phép" />;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <SummaryCard title="Tổng đơn" value={data.summary.tongDon} icon={<Calendar className="h-5 w-5" />} />
        <SummaryCard title="Tổng ngày nghỉ" value={data.summary.tongNgayNghi} unit="ngày" icon={<Calendar className="h-5 w-5" />} color="blue" />
        <SummaryCard title="Đã duyệt" value={data.summary.daDuyet} icon={<Calendar className="h-5 w-5" />} color="green" />
        <SummaryCard title="Chờ duyệt" value={data.summary.choDuyet} icon={<Clock className="h-5 w-5" />} color="amber" />
        <SummaryCard title="Từ chối" value={data.summary.tuChoi} icon={<XCircle className="h-5 w-5" />} color="red" />
      </div>

      {/* Theo loại */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Thống kê theo loại nghỉ</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.summary.theoLoai.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span>{item.loai || 'Chưa phân loại'}</span>
                <div className="flex gap-4">
                  <Badge variant="info">{item.soDon} đơn</Badge>
                  <Badge variant="warning">{item.soNgay} ngày</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Quỹ lương Tab
function QuyLuongTab({ data, isLoading }: { data?: QuyLuongReport; isLoading: boolean }) {
  if (isLoading) return <LoadingSkeleton />;
  if (!data) return <EmptyState message="Không có dữ liệu quỹ lương" />;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard title="Tổng quỹ lương" value={formatCurrency(data.summary.tongQuyLuong)} icon={<DollarSign className="h-5 w-5" />} color="green" />
        <SummaryCard title="Tổng nhân viên" value={data.summary.tongNhanVien} icon={<Users className="h-5 w-5" />} />
        <SummaryCard title="Lương trung bình" value={formatCurrency(data.summary.luongTrungBinh)} icon={<DollarSign className="h-5 w-5" />} color="blue" />
        <SummaryCard title="Tổng thuế TNCN" value={formatCurrency(data.summary.tongThueTNCN)} icon={<DollarSign className="h-5 w-5" />} color="red" />
      </div>

      {/* Theo phòng ban */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Quỹ lương theo phòng ban</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 font-medium text-slate-600">Phòng ban</th>
                  <th className="text-right p-3 font-medium text-slate-600">Nhân viên</th>
                  <th className="text-right p-3 font-medium text-slate-600">Lương cơ bản</th>
                  <th className="text-right p-3 font-medium text-slate-600">Phụ cấp</th>
                  <th className="text-right p-3 font-medium text-slate-600">Thưởng</th>
                  <th className="text-right p-3 font-medium text-slate-600">Khấu trừ</th>
                  <th className="text-right p-3 font-medium text-slate-600">Thực lĩnh</th>
                  <th className="text-right p-3 font-medium text-slate-600">Tỷ lệ</th>
                </tr>
              </thead>
              <tbody>
                {data.theoPhongBan.map((pb, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-3 font-medium">{pb.tenPhongBan}</td>
                    <td className="text-right p-3">{pb.tongNhanVien}</td>
                    <td className="text-right p-3">{formatCurrency(pb.tongLuongCoBan)}</td>
                    <td className="text-right p-3">{formatCurrency(pb.tongPhuCap)}</td>
                    <td className="text-right p-3">{formatCurrency(pb.tongThuong)}</td>
                    <td className="text-right p-3 text-red-600">{formatCurrency(pb.tongKhauTru)}</td>
                    <td className="text-right p-3 font-medium text-green-600">{formatCurrency(pb.tongThucLinh)}</td>
                    <td className="text-right p-3">{pb.tyLeQuyLuong.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Headcount Tab
function HeadcountTab({ data, isLoading }: { data?: HeadcountReport; isLoading: boolean }) {
  if (isLoading) return <LoadingSkeleton />;
  if (!data) return <EmptyState message="Không có dữ liệu nhân sự" />;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <SummaryCard title="Tổng nhân sự" value={data.summary.tongNhanVien} icon={<Users className="h-5 w-5" />} />
        <SummaryCard title="Đang làm" value={data.summary.dangLam} icon={<Users className="h-5 w-5" />} color="green" />
        <SummaryCard title="Mới tuyển" value={data.summary.moiTuyenThang} icon={<TrendingUp className="h-5 w-5" />} color="blue" />
        <SummaryCard title="Nghỉ việc" value={data.summary.nghiViecThang} icon={<TrendingDown className="h-5 w-5" />} color="red" />
        <SummaryCard title="Tỷ lệ nghỉ việc" value={`${data.summary.tyLeNghiViec.toFixed(1)}%`} icon={<TrendingDown className="h-5 w-5" />} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Giới tính */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Phân bổ theo giới tính</h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-blue-600">{data.summary.theoGioiTinh.nam}</span>
                </div>
                <span className="text-slate-600">Nam</span>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-pink-600">{data.summary.theoGioiTinh.nu}</span>
                </div>
                <span className="text-slate-600">Nữ</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Độ tuổi */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Phân bổ theo độ tuổi</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Dưới 25', value: data.summary.theoDoTuoi.duoi25 },
                { label: '25-35', value: data.summary.theoDoTuoi.tu25den35 },
                { label: '35-45', value: data.summary.theoDoTuoi.tu35den45 },
                { label: 'Trên 45', value: data.summary.theoDoTuoi.tren45 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span className="font-medium">{item.value} người</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{
                        width: `${data.summary.tongNhanVien > 0 ? (item.value / data.summary.tongNhanVien) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Chấm công Tab
function ChamCongTab({ data, isLoading }: { data?: ChamCongReport; isLoading: boolean }) {
  if (isLoading) return <LoadingSkeleton />;
  if (!data) return <EmptyState message="Không có dữ liệu chấm công" />;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <SummaryCard title="Ngày công chuẩn" value={data.summary.ngayCongChuan} unit="ngày" icon={<Calendar className="h-5 w-5" />} />
        <SummaryCard title="Tổng nhân viên" value={data.summary.tongNhanVien} icon={<Users className="h-5 w-5" />} />
        <SummaryCard title="TB ngày công" value={data.summary.trungBinhNgayCong.toFixed(1)} unit="ngày" icon={<Calendar className="h-5 w-5" />} color="blue" />
        <SummaryCard title="Tỷ lệ đi làm" value={`${data.summary.tyLeDiLamTrungBinh.toFixed(1)}%`} icon={<TrendingUp className="h-5 w-5" />} color="green" />
        <SummaryCard title="Tổng giờ OT" value={data.summary.tongGioOT.toFixed(1)} unit="giờ" icon={<Clock className="h-5 w-5" />} color="amber" />
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Chi tiết chấm công ({data.chiTiet.length} nhân viên)</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 font-medium text-slate-600">Mã NV</th>
                  <th className="text-left p-3 font-medium text-slate-600">Họ tên</th>
                  <th className="text-left p-3 font-medium text-slate-600">Phòng ban</th>
                  <th className="text-right p-3 font-medium text-slate-600">Công chuẩn</th>
                  <th className="text-right p-3 font-medium text-slate-600">Công thực</th>
                  <th className="text-right p-3 font-medium text-slate-600">Ngày nghỉ</th>
                  <th className="text-right p-3 font-medium text-slate-600">Đi trễ</th>
                  <th className="text-right p-3 font-medium text-slate-600">Về sớm</th>
                  <th className="text-right p-3 font-medium text-slate-600">Giờ OT</th>
                  <th className="text-right p-3 font-medium text-slate-600">Tỷ lệ</th>
                </tr>
              </thead>
              <tbody>
                {data.chiTiet.slice(0, 50).map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-3">{row.maNhanVien}</td>
                    <td className="p-3">{row.hoTen}</td>
                    <td className="p-3">{row.phongBan}</td>
                    <td className="text-right p-3">{row.ngayCongChuan}</td>
                    <td className="text-right p-3 font-medium">{row.ngayCongThuc}</td>
                    <td className="text-right p-3">{row.ngayNghi + row.ngayPhep}</td>
                    <td className="text-right p-3">{row.soLanDiTre > 0 && <span className="text-red-600">{row.soLanDiTre}</span>}</td>
                    <td className="text-right p-3">{row.soLanVeSom > 0 && <span className="text-amber-600">{row.soLanVeSom}</span>}</td>
                    <td className="text-right p-3">{row.tongGioOT > 0 && <span className="text-blue-600">{row.tongGioOT.toFixed(1)}</span>}</td>
                    <td className="text-right p-3">
                      <Badge variant={row.tyLeDiLam >= 90 ? 'success' : row.tyLeDiLam >= 80 ? 'warning' : 'danger'}>
                        {row.tyLeDiLam.toFixed(1)}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper Components
function SummaryCard({
  title,
  value,
  unit,
  icon,
  color = 'gray',
}: {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  color?: string;
}) {
  const bgColors: Record<string, string> = {
    gray: 'bg-slate-100',
    red: 'bg-red-100',
    amber: 'bg-amber-100',
    green: 'bg-green-100',
    blue: 'bg-blue-100',
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="text-2xl font-bold text-slate-900">
              {value}
              {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
            </p>
          </div>
          <div className={`p-3 rounded-full ${bgColors[color] || bgColors.gray}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="h-16 bg-slate-200 animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="h-64 bg-slate-200 animate-pulse rounded" />
        </CardContent>
      </Card>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center py-12 text-slate-500">
          <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
