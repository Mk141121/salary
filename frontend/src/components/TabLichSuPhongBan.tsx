// Tab Lịch sử Phòng ban của nhân viên
import { useQuery } from '@tanstack/react-query'
import { Building2, Calendar, Clock, MapPin, Users } from 'lucide-react'
import { nhanVienApi, NhanVienPhongBan } from '../services/api'
import { formatNgay } from '../utils'

interface TabLichSuPhongBanProps {
  nhanVienId: number
}

export default function TabLichSuPhongBan({ nhanVienId }: TabLichSuPhongBanProps) {
  const { data: lichSu, isLoading } = useQuery({
    queryKey: ['lich-su-phong-ban', nhanVienId],
    queryFn: () => nhanVienApi.layLichSuPhongBan(nhanVienId),
  })

  if (isLoading) {
    return (
      <div className="card animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  // Tìm phòng ban hiện tại (denNgay = null)
  const phongBanHienTai = lichSu?.find((ls: NhanVienPhongBan) => !ls.denNgay)
  const lichSuCu = lichSu?.filter((ls: NhanVienPhongBan) => ls.denNgay) || []

  return (
    <div className="space-y-6">
      {/* Phòng ban hiện tại */}
      <div className="card border-l-4 border-l-green-500">
        <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg">
          <Building2 className="text-green-600" size={20} />
          Phòng ban hiện tại
        </h3>
        
        {phongBanHienTai ? (
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Building2 className="text-green-600" size={24} />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 text-lg">
                {phongBanHienTai.phongBan?.tenPhongBan || 'N/A'}
              </div>
              {phongBanHienTai.donViCon && (
                <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <Users size={14} />
                  {phongBanHienTai.donViCon.loaiDonVi}: {phongBanHienTai.donViCon.tenDonVi}
                </div>
              )}
              <div className="text-sm text-gray-500 flex items-center gap-1 mt-2">
                <Calendar size={14} />
                Từ: {formatNgay(phongBanHienTai.tuNgay)}
              </div>
              {phongBanHienTai.ghiChu && (
                <div className="text-sm text-gray-500 mt-2 italic">
                  {phongBanHienTai.ghiChu}
                </div>
              )}
            </div>
            <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              Đang làm việc
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-4">
            <MapPin size={40} className="mx-auto text-gray-300 mb-2" />
            <p>Chưa có thông tin phòng ban</p>
          </div>
        )}
      </div>

      {/* Lịch sử chuyển phòng ban */}
      <div className="card">
        <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg">
          <Clock className="text-gray-600" size={20} />
          Lịch sử chuyển phòng ban
          {lichSuCu.length > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
              {lichSuCu.length} lần
            </span>
          )}
        </h3>

        {lichSuCu.length > 0 ? (
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-4">
              {lichSuCu.map((ls: NhanVienPhongBan) => (
                <div key={ls.id} className="relative flex items-start gap-4 pl-2">
                  {/* Timeline dot */}
                  <div className="absolute left-4 w-4 h-4 bg-gray-300 rounded-full border-2 border-white z-10"></div>
                  
                  {/* Content */}
                  <div className="ml-10 flex-1 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium text-gray-900">
                          {ls.phongBan?.tenPhongBan || 'N/A'}
                        </div>
                        {ls.donViCon && (
                          <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <Users size={12} />
                            {ls.donViCon.loaiDonVi}: {ls.donViCon.tenDonVi}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 text-right">
                        <div>{formatNgay(ls.tuNgay)}</div>
                        <div>→ {formatNgay(ls.denNgay!)}</div>
                      </div>
                    </div>
                    {ls.ghiChu && (
                      <div className="text-sm text-gray-500 mt-2 italic">
                        {ls.ghiChu}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <Clock size={40} className="mx-auto text-gray-300 mb-2" />
            <p>Chưa có lịch sử chuyển phòng ban</p>
            <p className="text-sm">Nhân viên chưa từng chuyển phòng ban</p>
          </div>
        )}
      </div>
    </div>
  )
}
