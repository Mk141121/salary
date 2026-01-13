// Phiếu Lương Component - Hiển thị phiếu lương đẹp và xuất ảnh
import { forwardRef } from 'react'
import { PhieuLuongData } from '../services/api'

interface PhieuLuongProps {
  data: PhieuLuongData
}

const formatMoney = (value: number) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value)

export const PhieuLuong = forwardRef<HTMLDivElement, PhieuLuongProps>(
  ({ data }, ref) => {
    const thuNhapItems = data.cacKhoanLuong.filter((k) => k.loai === 'THU_NHAP')
    const khauTruItems = data.cacKhoanLuong.filter((k) => k.loai === 'KHAU_TRU')

    return (
      <div
        ref={ref}
        className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto"
        style={{ width: '700px', fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        {/* Header */}
        <div 
          className="text-white text-center py-8 px-6"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
          <h1 className="text-3xl font-bold mb-1">PHIẾU LƯƠNG</h1>
          <p className="text-lg opacity-90">
            Tháng {data.thang} / {data.nam}
          </p>
        </div>

        {/* Company Info */}
        <div className="text-center py-4 px-6 border-b-2 border-dashed border-gray-200 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">CÔNG TY TNHH ABC</h2>
          <p className="text-sm text-gray-600">123 Đường ABC, Quận 1, TP.HCM</p>
        </div>

        {/* Employee Info */}
        <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 border-b border-gray-200">
          <div>
            <span className="text-xs text-gray-500">Họ và tên</span>
            <p className="font-semibold text-gray-800">{data.hoTen}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Mã nhân viên</span>
            <p className="font-semibold text-gray-800">{data.maNhanVien}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Phòng ban</span>
            <p className="font-semibold text-gray-800">{data.phongBan}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Chức vụ</span>
            <p className="font-semibold text-gray-800">{data.chucVu || 'Nhân viên'}</p>
          </div>
          <div className="col-span-2">
            <span className="text-xs text-gray-500">Ngày công thực tế</span>
            <p className="font-semibold text-gray-800">
              <span className="text-blue-600">{data.ngayCongThucTe}</span> / {data.ngayCongLyThuyet} ngày
            </p>
          </div>
        </div>

        {/* Income Section */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b-2 border-green-500 inline-block">
            THU NHẬP
          </h3>
          <div className="space-y-3">
            {thuNhapItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{item.tenKhoan}</span>
                <span className="font-medium text-green-600">{formatMoney(item.soTien)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deduction Section */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b-2 border-red-500 inline-block">
            KHẤU TRỪ
          </h3>
          <div className="space-y-3">
            {khauTruItems.length > 0 ? (
              khauTruItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{item.tenKhoan}</span>
                  <span className="font-medium text-red-600">-{formatMoney(item.soTien)}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">Không có khoản khấu trừ</p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div 
          className="p-6 text-white"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
          <div className="flex justify-between items-center py-2">
            <span className="opacity-90">Tổng thu nhập:</span>
            <span className="font-semibold">{formatMoney(data.tongThuNhap)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="opacity-90">Tổng khấu trừ:</span>
            <span className="font-semibold">-{formatMoney(data.tongKhauTru)}</span>
          </div>
          <div className="flex justify-between items-center pt-4 mt-4 border-t border-white/30">
            <span className="text-xl font-bold">THỰC LĨNH:</span>
            <span className="text-2xl font-bold">{formatMoney(data.thucLinh)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4 px-6 text-sm text-gray-500 border-t border-gray-100">
          <p>Phiếu lương được tạo tự động bởi hệ thống tính lương.</p>
          <p>Nếu có thắc mắc, vui lòng liên hệ phòng Nhân sự.</p>
        </div>
      </div>
    )
  }
)

PhieuLuong.displayName = 'PhieuLuong'

export default PhieuLuong
