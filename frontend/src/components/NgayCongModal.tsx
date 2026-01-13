import { useState } from 'react'
import { X, Calendar, AlertCircle, Save } from 'lucide-react'
import { NgayCongBangLuong } from '../services/api'

interface NgayCongModalProps {
  ngayCong: NgayCongBangLuong | null
  onClose: () => void
  onSave: (ngayCongMoi: number, ghiChu?: string) => Promise<void>
  isLoading?: boolean
}

export default function NgayCongModal({ ngayCong, onClose, onSave, isLoading }: NgayCongModalProps) {
  const [ngayCongDieuChinh, setNgayCongDieuChinh] = useState<string>(
    ngayCong?.ngayCongDieuChinh?.toString() || ''
  )
  const [ghiChu, setGhiChu] = useState<string>(ngayCong?.ghiChu || '')

  if (!ngayCong) return null

  // Tính ngày công hiện tại (có hoặc không điều chỉnh)
  const ngayCongHienTai = ngayCong.ngayCongDieuChinh
    ? Number(ngayCong.ngayCongDieuChinh)
    : Number(ngayCong.soCongThucTe) + Number(ngayCong.soNgayNghiPhep)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ngayCongDieuChinh) return

    const soNgay = parseFloat(ngayCongDieuChinh)
    if (isNaN(soNgay) || soNgay < 0) {
      alert('Số ngày công không hợp lệ')
      return
    }

    await onSave(soNgay, ghiChu || undefined)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Điều chỉnh ngày công</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-4">
            {/* Thông tin nhân viên */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Nhân viên</div>
              <div className="font-semibold text-gray-900">
                {ngayCong.nhanVien?.hoTen || 'N/A'}
              </div>
              <div className="text-sm text-gray-500">
                {ngayCong.nhanVien?.maNhanVien || 'N/A'}
              </div>
            </div>

            {/* Chi tiết ngày công từ chấm công */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Ngày công lý thuyết</div>
                <div className="text-xl font-bold text-blue-700">
                  {Number(ngayCong.ngayCongLyThuyet).toFixed(1)}
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Số công thực tế</div>
                <div className="text-xl font-bold text-green-700">
                  {Number(ngayCong.soCongThucTe).toFixed(1)}
                </div>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Nghỉ có phép</div>
                <div className="text-xl font-bold text-yellow-700">
                  {Number(ngayCong.soNgayNghiPhep).toFixed(1)}
                </div>
              </div>

              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Nghỉ không phép</div>
                <div className="text-xl font-bold text-red-700">
                  {Number(ngayCong.soNgayNghiKhongPhep).toFixed(1)}
                </div>
              </div>
            </div>

            {/* Ngày công hiện tại */}
            <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
              <div className="text-sm text-gray-600 mb-1">Ngày công hiện tại (dùng để tính lương)</div>
              <div className="text-2xl font-bold text-purple-700">
                {ngayCongHienTai.toFixed(1)} ngày
              </div>
              {ngayCong.ngayCongDieuChinh && (
                <div className="text-xs text-purple-600 mt-1">
                  ✓ Đã điều chỉnh thủ công
                </div>
              )}
            </div>

            {/* Form điều chỉnh */}
            <div className="border-t pt-4">
              <label className="label">
                <span className="label-text font-semibold">Điều chỉnh ngày công mới</span>
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max={Number(ngayCong.ngayCongLyThuyet)}
                className="input input-bordered w-full"
                value={ngayCongDieuChinh}
                onChange={(e) => setNgayCongDieuChinh(e.target.value)}
                placeholder="Nhập số ngày công"
                required
              />
              <div className="text-xs text-gray-500 mt-1">
                Nhập số ngày công mới để điều chỉnh thủ công
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Ghi chú</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows={3}
                value={ghiChu}
                onChange={(e) => setGhiChu(e.target.value)}
                placeholder="Lý do điều chỉnh..."
              />
            </div>

            {/* Cảnh báo */}
            <div className="flex items-start gap-2 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <div className="font-semibold mb-1">Lưu ý:</div>
                <ul className="list-disc list-inside space-y-1">
                  <li>Điều chỉnh ngày công sẽ ảnh hưởng đến lương cơ bản</li>
                  <li>Nên có lý do rõ ràng trong phần ghi chú</li>
                  <li>Có thể xóa điều chỉnh để trở về tính tự động</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Hủy
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading || !ngayCongDieuChinh}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Lưu điều chỉnh
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
