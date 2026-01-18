// Cá nhân - Employee Portal
// Sprint 5: Hồ sơ, phiếu lương, số dư phép
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User, FileText, Calendar, Mail, Phone, Building, CreditCard, Shield } from 'lucide-react';
import { employeePortalApi, formatCurrency } from '../../services/employeePortalApi';

type TabType = 'ho-so' | 'phieu-luong' | 'so-du-phep';

export default function PortalProfile() {
  const [activeTab, setActiveTab] = useState<TabType>('ho-so');

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-1 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex">
          {[
            { id: 'ho-so' as TabType, label: 'Hồ sơ', icon: User },
            { id: 'phieu-luong' as TabType, label: 'Phiếu lương', icon: FileText },
            { id: 'so-du-phep' as TabType, label: 'Số dư phép', icon: Calendar },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'ho-so' && <HoSoTab />}
      {activeTab === 'phieu-luong' && <PhieuLuongTab />}
      {activeTab === 'so-du-phep' && <SoDuPhepTab />}
    </div>
  );
}

// ===== HoSo Tab =====
function HoSoTab() {
  const { data: hoSo, isLoading } = useQuery({
    queryKey: ['employee-portal', 'ho-so'],
    queryFn: () => employeePortalApi.getHoSo(),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!hoSo) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
        <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">Không tìm thấy thông tin</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Avatar & Name Card */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-2xl font-bold">
            {hoSo.hoTen.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold">{hoSo.hoTen}</h2>
            <p className="text-blue-100">{hoSo.maNhanVien}</p>
            {hoSo.chucVu && (
              <p className="text-sm text-blue-200 mt-1">{hoSo.chucVu}</p>
            )}
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <InfoRow icon={Building} label="Phòng ban" value={typeof hoSo.phongBan === 'object' ? hoSo.phongBan?.tenPhongBan : (hoSo.phongBan || 'Chưa có')} />
        <InfoRow icon={Mail} label="Email" value={hoSo.email || 'Chưa cập nhật'} />
        <InfoRow icon={Phone} label="Điện thoại" value={hoSo.soDienThoai || 'Chưa cập nhật'} />
        <InfoRow icon={Calendar} label="Ngày vào làm" value={hoSo.ngayVaoLam ? new Date(hoSo.ngayVaoLam).toLocaleDateString('vi-VN') : 'Chưa có'} />
        <InfoRow icon={CreditCard} label="STK ngân hàng" value={hoSo.soTaiKhoan || 'Chưa cập nhật'} last />
      </div>

      {/* Ngân hàng Card */}
      {hoSo.nganHang && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Thông tin ngân hàng</h3>
          </div>
          <div className="text-sm">
            <p className="text-gray-500">Ngân hàng</p>
            <p className="font-medium text-gray-900 dark:text-white">{hoSo.nganHang.tenNganHang}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, last = false }: { icon: any; label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 ${!last ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}>
      <Icon className="w-5 h-5 text-gray-400" />
      <div className="flex-1">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

// ===== PhieuLuong Tab =====
function PhieuLuongTab() {
  const { data: phieuLuongRes, isLoading } = useQuery({
    queryKey: ['employee-portal', 'phieu-luong'],
    queryFn: () => employeePortalApi.getPhieuLuong(),
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  const phieuLuong = phieuLuongRes?.data || [];
  
  if (phieuLuong.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">Chưa có phiếu lương</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {phieuLuong.map((pl) => (
        <div
          key={pl.id}
          className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Tháng {pl.thang}/{pl.nam}
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                {pl.kyLuong}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(pl.thucLinh)}
              </p>
              <p className="text-xs text-gray-500">Thực nhận</p>
            </div>
          </div>
          
          {/* Details */}
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-500">Thu nhập</p>
                <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(pl.tongThuNhap)}</p>
              </div>
              <div>
                <p className="text-gray-500">Khấu trừ</p>
                <p className="font-medium text-red-600">{formatCurrency(pl.tongKhauTru)}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ===== SoDuPhep Tab =====
function SoDuPhepTab() {
  const { data: soDuPhep, isLoading } = useQuery({
    queryKey: ['employee-portal', 'so-du-phep'],
    queryFn: () => employeePortalApi.getSoDuPhep(),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!soDuPhep) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">Không có dữ liệu</p>
      </div>
    );
  }

  const phepNam = soDuPhep.phepNam;
  const conLai = phepNam?.conLai || 0;
  const tongSo = phepNam?.tongSo || 12;
  const daSuDung = phepNam?.daSuDung || 0;
  const percentage = tongSo > 0 ? (daSuDung / tongSo) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Main Card */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <p className="text-emerald-100 mb-2">Số ngày phép còn lại</p>
        <div className="flex items-end gap-2">
          <span className="text-5xl font-bold">{conLai}</span>
          <span className="text-emerald-200 mb-1">/ {tongSo} ngày</span>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${100 - percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-1">Đã sử dụng</p>
          <p className="text-2xl font-bold text-blue-600">{daSuDung}</p>
          <p className="text-xs text-gray-400">ngày</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-1">Loại nghỉ khác</p>
          <p className="text-2xl font-bold text-yellow-600">{soDuPhep.danhSachLoaiNghi?.length || 0}</p>
          <p className="text-xs text-gray-400">loại</p>
        </div>
      </div>

      {/* Danh sách loại nghỉ */}
      {soDuPhep.danhSachLoaiNghi && soDuPhep.danhSachLoaiNghi.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Chi tiết các loại nghỉ</h4>
          <div className="space-y-2">
            {soDuPhep.danhSachLoaiNghi.map((loai) => (
              <div key={loai.maLoai} className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">{loai.tenLoai}</span>
                <span className="font-medium text-gray-900 dark:text-white">{loai.soNgayDaSuDung} ngày</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4">
        <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Lưu ý</h4>
        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
          <li>• Số ngày phép được tính theo năm {new Date().getFullYear()}</li>
          <li>• Phép không sử dụng hết sẽ chuyển sang năm sau (tối đa 5 ngày)</li>
          <li>• Liên hệ HR để được hỗ trợ</li>
        </ul>
      </div>
    </div>
  );
}
