import { User, Pencil, X, Save, Building2, FileText, Users } from 'lucide-react'
import { formatTien, formatNgay } from '../../utils'
import TabNganHang from '../TabNganHang'
import TabThueBH from '../TabThueBH'
import TabNhomNhanVien from '../TabNhomNhanVien'
import { FileUpload } from '../FileUpload'
import { VietnameseDatePicker } from '../VietnameseDatePicker'
import { NhanVienDetailForm } from '../../types/nhanVienDetail'

interface NhanVienThongTinTabProps {
  nhanVien: any
  nhanVienId: number
  routeId: string
  isEditing: boolean
  setIsEditing: (value: boolean) => void
  formNhanVien: NhanVienDetailForm
  setFormNhanVien: (updater: NhanVienDetailForm) => void
  phongBans?: any[]
  tongPhuCap: number
  onSave: () => void
  onCancel: () => void
  isSaving: boolean
}

export default function NhanVienThongTinTab({
  nhanVien,
  nhanVienId,
  routeId,
  isEditing,
  setIsEditing,
  formNhanVien,
  setFormNhanVien,
  phongBans,
  tongPhuCap,
  onSave,
  onCancel,
  isSaving,
}: NhanVienThongTinTabProps) {
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <User size={20} />
            Thông tin cơ bản
          </h3>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-secondary flex items-center gap-2"
            >
              <Pencil size={16} />
              Chỉnh sửa
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={onCancel}
                className="btn btn-secondary flex items-center gap-2"
                disabled={isSaving}
              >
                <X size={16} />
                Hủy
              </button>
              <button
                onClick={onSave}
                className="btn btn-primary flex items-center gap-2"
                disabled={isSaving}
              >
                <Save size={16} />
                {isSaving ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          )}
        </div>

        {!isEditing ? (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500">Mã nhân viên</label>
              <p className="font-medium">{nhanVien.maNhanVien}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Họ tên</label>
              <p className="font-medium">{nhanVien.hoTen}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Phòng ban</label>
              <p className="font-medium">{nhanVien.phongBan?.tenPhongBan}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Chức vụ</label>
              <p className="font-medium">{nhanVien.chucVu || '-'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Giới tính</label>
              <p className="font-medium">{(nhanVien as any).gioiTinh === 'NAM' ? 'Nam' : (nhanVien as any).gioiTinh === 'NU' ? 'Nữ' : (nhanVien as any).gioiTinh === 'KHAC' ? 'Khác' : '-'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Ngày sinh</label>
              <p className="font-medium">{(nhanVien as any).ngaySinh ? formatNgay((nhanVien as any).ngaySinh) : '-'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Email</label>
              <p className="font-medium">{nhanVien.email || '-'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Số điện thoại</label>
              <p className="font-medium">{nhanVien.soDienThoai || '-'}</p>
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-500">Địa chỉ</label>
              <p className="font-medium">{(nhanVien as any).diaChi || '-'}</p>
            </div>

            <div className="col-span-2 border-t pt-4 mt-2">
              <h4 className="font-medium text-gray-700 mb-3">Căn cước công dân</h4>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-500">Số CCCD/CMND</label>
                  <p className="font-medium">{(nhanVien as any).soCCCD || '-'}</p>
                </div>
                <div className="flex gap-4">
                  {(nhanVien as any).hinhCCCDTruoc && (
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Mặt trước</label>
                      <img src={(nhanVien as any).hinhCCCDTruoc} alt="CCCD mặt trước" className="w-32 h-20 object-cover rounded border" />
                    </div>
                  )}
                  {(nhanVien as any).hinhCCCDSau && (
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Mặt sau</label>
                      <img src={(nhanVien as any).hinhCCCDSau} alt="CCCD mặt sau" className="w-32 h-20 object-cover rounded border" />
                    </div>
                  )}
                  {!(nhanVien as any).hinhCCCDTruoc && !(nhanVien as any).hinhCCCDSau && (
                    <p className="text-gray-400 text-sm">Chưa có hình CCCD</p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-2 border-t pt-4 mt-2">
              <h4 className="font-medium text-gray-700 mb-3">Liên hệ khẩn cấp (người thân)</h4>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm text-gray-500">Người liên hệ</label>
                  <p className="font-medium">{(nhanVien as any).nguoiLienHeKhanCap || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Quan hệ</label>
                  <p className="font-medium">{(nhanVien as any).quanHeKhanCap || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Số điện thoại</label>
                  <p className="font-medium">{(nhanVien as any).soDienThoaiKhanCap || '-'}</p>
                </div>
              </div>
            </div>

            <div className="col-span-2 border-t pt-4 mt-2">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-500">Đóng BHXH</label>
                  {(nhanVien as any).dongBHXH !== false ? (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Có đóng</span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Không đóng</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Tổng phụ cấp hiện tại</label>
                  <p className="font-medium text-green-600">{formatTien(tongPhuCap)}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500">Mã nhân viên</label>
              <p className="font-medium text-gray-400">{nhanVien.maNhanVien}</p>
              <span className="text-xs text-gray-400">(Không thể sửa)</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Họ tên *</label>
              <input
                type="text"
                value={formNhanVien.hoTen}
                onChange={(e) => setFormNhanVien({ ...formNhanVien, hoTen: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Nhập họ tên"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phòng ban *</label>
              <select
                value={formNhanVien.phongBanId}
                onChange={(e) => setFormNhanVien({ ...formNhanVien, phongBanId: parseInt(e.target.value) })}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value={0}>-- Chọn phòng ban --</option>
                {phongBans?.map((pb: any) => (
                  <option key={pb.id} value={pb.id}>{pb.tenPhongBan}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Chức vụ</label>
              <input
                type="text"
                value={formNhanVien.chucVu}
                onChange={(e) => setFormNhanVien({ ...formNhanVien, chucVu: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Nhập chức vụ"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Giới tính</label>
              <select
                value={formNhanVien.gioiTinh}
                onChange={(e) => setFormNhanVien({ ...formNhanVien, gioiTinh: e.target.value as '' | 'NAM' | 'NU' | 'KHAC' })}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="NAM">Nam</option>
                <option value="NU">Nữ</option>
                <option value="KHAC">Khác</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ngày sinh</label>
              <VietnameseDatePicker
                value={formNhanVien.ngaySinh}
                onChange={(val) => setFormNhanVien({ ...formNhanVien, ngaySinh: val })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formNhanVien.email}
                onChange={(e) => setFormNhanVien({ ...formNhanVien, email: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Nhập email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Số điện thoại</label>
              <input
                type="tel"
                value={formNhanVien.soDienThoai}
                onChange={(e) => setFormNhanVien({ ...formNhanVien, soDienThoai: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Địa chỉ</label>
              <input
                type="text"
                value={formNhanVien.diaChi}
                onChange={(e) => setFormNhanVien({ ...formNhanVien, diaChi: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Nhập địa chỉ"
              />
            </div>

            <div className="col-span-2 border-t pt-4 mt-2">
              <h4 className="font-medium text-gray-700 mb-3">Căn cước công dân</h4>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Số CCCD/CMND</label>
                  <input
                    type="text"
                    value={formNhanVien.soCCCD}
                    onChange={(e) => setFormNhanVien({ ...formNhanVien, soCCCD: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Nhập số CCCD"
                  />
                </div>
                <FileUpload
                  endpoint={`/api/upload/cccd/${routeId}/truoc`}
                  currentUrl={formNhanVien.hinhCCCDTruoc}
                  onUploadSuccess={(url) => setFormNhanVien({ ...formNhanVien, hinhCCCDTruoc: url })}
                  onRemove={() => setFormNhanVien({ ...formNhanVien, hinhCCCDTruoc: '' })}
                  accept="image"
                  label="Hình CCCD mặt trước"
                />
                <FileUpload
                  endpoint={`/api/upload/cccd/${routeId}/sau`}
                  currentUrl={formNhanVien.hinhCCCDSau}
                  onUploadSuccess={(url) => setFormNhanVien({ ...formNhanVien, hinhCCCDSau: url })}
                  onRemove={() => setFormNhanVien({ ...formNhanVien, hinhCCCDSau: '' })}
                  accept="image"
                  label="Hình CCCD mặt sau"
                />
              </div>
            </div>

            <div className="col-span-2 border-t pt-4 mt-2">
              <h4 className="font-medium text-gray-700 mb-3">Liên hệ khẩn cấp (người thân)</h4>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Người liên hệ</label>
                  <input
                    type="text"
                    value={formNhanVien.nguoiLienHeKhanCap}
                    onChange={(e) => setFormNhanVien({ ...formNhanVien, nguoiLienHeKhanCap: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Tên người thân"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Quan hệ</label>
                  <select
                    value={formNhanVien.quanHeKhanCap}
                    onChange={(e) => setFormNhanVien({ ...formNhanVien, quanHeKhanCap: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">-- Chọn --</option>
                    <option value="Cha">Cha</option>
                    <option value="Mẹ">Mẹ</option>
                    <option value="Vợ">Vợ</option>
                    <option value="Chồng">Chồng</option>
                    <option value="Anh/Chị/Em">Anh/Chị/Em</option>
                    <option value="Con">Con</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    value={formNhanVien.soDienThoaiKhanCap}
                    onChange={(e) => setFormNhanVien({ ...formNhanVien, soDienThoaiKhanCap: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="SĐT khẩn cấp"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-2 border-t pt-4 mt-2">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Đóng BHXH</label>
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="editDongBHXH"
                        checked={formNhanVien.dongBHXH === true}
                        onChange={() => setFormNhanVien({ ...formNhanVien, dongBHXH: true })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>Có đóng</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="editDongBHXH"
                        checked={formNhanVien.dongBHXH === false}
                        onChange={() => setFormNhanVien({ ...formNhanVien, dongBHXH: false })}
                        className="w-4 h-4 text-red-600"
                      />
                      <span>Không đóng</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Tổng phụ cấp hiện tại</label>
                  <p className="font-medium text-green-600">{formatTien(tongPhuCap)}</p>
                  <span className="text-xs text-gray-400">(Tự động tính từ các khoản phụ cấp)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Building2 size={20} />
          Tài khoản ngân hàng
        </h3>
        <TabNganHang nhanVienId={nhanVienId} />
      </div>

      <div className="card">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <FileText size={20} />
          Thông tin Thuế & BHXH
        </h3>
        <TabThueBH nhanVienId={nhanVienId} />
      </div>

      <div className="card">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Users size={20} />
          Nhóm nhân viên
        </h3>
        <TabNhomNhanVien nhanVienId={nhanVienId} />
      </div>
    </div>
  )
}
