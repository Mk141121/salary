// Trang chủ Employee Portal - Dashboard
// Sprint 5: Mobile-first, PWA style
// Sprint 7: GPS Check-in with Geofence validation
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Clock,
  Calendar,
  FileText,
  ChevronRight,
  LogIn,
  LogOut as LogOutIcon,
  CheckCircle,
  Briefcase,
  Loader2,
  MapPin,
  Navigation,
  AlertTriangle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { employeePortalApi, formatTime } from '../../services/employeePortalApi';
import { antiFraudApi, getCurrentPosition, getDeviceId } from '../../services/antiFraudApi';

export default function PortalHome() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [checkError, setCheckError] = useState<string | null>(null);
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'getting' | 'success' | 'error'>('idle');
  const [lastGpsResult, setLastGpsResult] = useState<{
    trongVung?: boolean;
    khoangCachMet?: number;
    geofenceName?: string;
  } | null>(null);

  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['employee-portal', 'dashboard'],
    queryFn: () => employeePortalApi.getDashboard(),
    refetchInterval: 60000, // Refresh mỗi phút
  });

  // Lấy geofence áp dụng cho nhân viên
  const { data: myGeofences } = useQuery({
    queryKey: ['my-geofences'],
    queryFn: () => antiFraudApi.layGeofenceCuaToi(),
  });

  // GPS Check-in mutation
  const gpsCheckMutation = useMutation({
    mutationFn: async (loaiChamCong: 'CHECK_IN' | 'CHECK_OUT') => {
      setGpsStatus('getting');
      
      let gpsData: { viDo?: number; kinhDo?: number; doChinhXacMet?: number } = {};
      
      // Lấy GPS nếu có geofence yêu cầu
      const requireGPS = myGeofences?.some((gf: { batBuocGPS: boolean }) => gf.batBuocGPS);
      
      if (requireGPS || myGeofences?.length) {
        try {
          gpsData = await getCurrentPosition();
          setGpsStatus('success');
        } catch (err: any) {
          // Nếu bắt buộc GPS mà không lấy được thì báo lỗi
          if (requireGPS) {
            setGpsStatus('error');
            throw new Error(err.message || 'Không thể lấy vị trí GPS');
          }
          // Nếu không bắt buộc thì vẫn cho check-in
          setGpsStatus('idle');
        }
      }

      // Gọi API GPS check-in
      return antiFraudApi.gpsCheckin({
        loaiChamCong,
        viDo: gpsData.viDo,
        kinhDo: gpsData.kinhDo,
        doChinhXacMet: gpsData.doChinhXacMet,
        deviceId: getDeviceId(),
      });
    },
    onSuccess: (result) => {
      setCheckError(null);
      setGpsStatus('idle');
      setLastGpsResult({
        trongVung: result.trongVung,
        khoangCachMet: result.khoangCachMet,
        geofenceName: result.geofence?.tenDiaDiem,
      });
      queryClient.invalidateQueries({ queryKey: ['employee-portal', 'dashboard'] });
    },
    onError: (err: any) => {
      setGpsStatus('error');
      setCheckError(err.response?.data?.message || err.message || 'Lỗi khi chấm công');
    },
  });

  const isProcessing = gpsCheckMutation.isPending;

  const handleCheckAction = () => {
    setCheckError(null);
    setLastGpsResult(null);
    if (dashboard?.chamCongHomNay?.trangThai === 'DA_VAO') {
      gpsCheckMutation.mutate('CHECK_OUT');
    } else {
      gpsCheckMutation.mutate('CHECK_IN');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  const getCheckInStatus = () => {
    const status = dashboard?.chamCongHomNay?.trangThai;
    if (status === 'DA_RA') {
      return { label: 'Đã ra', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' };
    }
    if (status === 'DA_VAO') {
      return { label: 'Đã vào', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' };
    }
    return { label: 'Chưa vào', color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-700' };
  };

  const checkInStatus = getCheckInStatus();

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-blue-100 text-sm">Xin chào,</p>
            <h2 className="text-xl font-bold mt-1">{dashboard?.nhanVien.hoTen}</h2>
            <p className="text-blue-200 text-sm mt-1">
              {dashboard?.nhanVien.chucVu} • {dashboard?.nhanVien.phongBan}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
            {dashboard?.nhanVien.hoTen?.[0] || 'N'}
          </div>
        </div>

        {/* Today's shift */}
        {dashboard?.caHomNay ? (
          <div className="mt-4 bg-white/10 rounded-xl p-3 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: dashboard.caHomNay.mauHienThi || '#3B82F6' }}
            >
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-blue-100">Ca hôm nay</p>
              <p className="font-semibold">
                {dashboard.caHomNay.tenCa} ({dashboard.caHomNay.gioVao} - {dashboard.caHomNay.gioRa})
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 bg-white/10 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-100">Hôm nay</p>
              <p className="font-semibold">Không có ca làm việc</p>
            </div>
          </div>
        )}
      </div>

      {/* Check-in Status Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl ${checkInStatus.bg} flex items-center justify-center`}>
              {dashboard?.chamCongHomNay?.trangThai === 'DA_RA' ? (
                <CheckCircle className={`w-7 h-7 ${checkInStatus.color}`} />
              ) : dashboard?.chamCongHomNay?.trangThai === 'DA_VAO' ? (
                <LogOutIcon className={`w-7 h-7 ${checkInStatus.color}`} />
              ) : (
                <LogIn className={`w-7 h-7 ${checkInStatus.color}`} />
              )}
            </div>
            <div>
              <p className={`text-sm ${checkInStatus.color} font-medium`}>{checkInStatus.label}</p>
              {dashboard?.chamCongHomNay?.gioVao && (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Vào: {formatTime(dashboard.chamCongHomNay.gioVao)}
                  {dashboard.chamCongHomNay.gioRa && ` • Ra: ${formatTime(dashboard.chamCongHomNay.gioRa)}`}
                </p>
              )}
            </div>
          </div>
          {dashboard?.chamCongHomNay?.trangThai !== 'DA_RA' && (
            <button
              onClick={handleCheckAction}
              disabled={isProcessing}
              className={`px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : dashboard?.chamCongHomNay?.trangThai === 'DA_VAO' ? (
                'Check-out'
              ) : (
                'Check-in'
              )}
            </button>
          )}
        </div>
        {checkError && (
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <div className="text-sm text-red-600 dark:text-red-400 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="whitespace-pre-line">{checkError}</div>
            </div>
            {checkError.includes('GPS') && (
              <button 
                onClick={() => window.location.reload()} 
                className="mt-3 w-full py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                🔄 Làm mới trang sau khi cấp quyền
              </button>
            )}
          </div>
        )}
        {lastGpsResult && (
          <div className={`text-sm mt-3 flex items-center gap-2 ${
            lastGpsResult.trongVung ? 'text-green-600' : 'text-yellow-600'
          }`}>
            <MapPin className="w-4 h-4" />
            {lastGpsResult.trongVung ? (
              <span>
                ✓ Trong vùng "{lastGpsResult.geofenceName}" 
                {lastGpsResult.khoangCachMet && ` (cách ${lastGpsResult.khoangCachMet}m)`}
              </span>
            ) : lastGpsResult.khoangCachMet ? (
              <span>
                ⚠ Ngoài vùng cho phép (cách {lastGpsResult.khoangCachMet}m)
              </span>
            ) : null}
          </div>
        )}
        {gpsStatus === 'getting' && (
          <p className="text-sm text-blue-500 mt-3 flex items-center gap-2">
            <Navigation className="w-4 h-4 animate-pulse" />
            Đang lấy vị trí GPS...
          </p>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => navigate('/portal/yeu-cau')}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center"
        >
          <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto">
            <FileText className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {dashboard?.thongKe.soDonChoDuyet || 0}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Đơn chờ duyệt</p>
        </button>

        <button
          onClick={() => navigate('/portal/ca-nhan')}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center"
        >
          <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
            <Calendar className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {dashboard?.thongKe.soNgayPhepConLai || 0}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Phép còn lại</p>
        </button>

        <button
          onClick={() => navigate('/portal/cham-cong')}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto">
            <Briefcase className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {dashboard?.thongKe.soNgayCongThang || 0}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ngày công</p>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Thao tác nhanh</h3>
        </div>
        <div>
          {[
            { label: 'Xem lịch làm việc', icon: Calendar, path: '/portal/lich-lam', color: 'text-blue-600' },
            { label: 'Tạo đơn yêu cầu', icon: FileText, path: '/portal/yeu-cau', color: 'text-orange-600' },
            { label: 'Xem phiếu lương', icon: Briefcase, path: '/portal/ca-nhan', color: 'text-green-600' },
          ].map((action) => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <action.icon className={`w-5 h-5 ${action.color}`} />
                <span className="text-gray-700 dark:text-gray-300">{action.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
