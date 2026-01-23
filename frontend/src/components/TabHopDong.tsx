import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FileText, Image } from 'lucide-react';
import {
  NhanVienHopDong,
  layDanhSachHopDong,
  taoHopDong,
  capNhatHopDong,
  ngungHopDong,
  xoaHopDong,
  loaiHopDongLabel,
  trangThaiHopDongLabel,
  formatCurrency,
} from '../services/nhanVienMoRongApi';
import { VietnameseDatePicker } from './VietnameseDatePicker';
import { LOAI_NHAN_VIEN_MAP } from '../services/api';
import { FileUpload, MultiFileUpload } from './FileUpload';

// Loại nhân viên options
const LOAI_NHAN_VIEN_OPTIONS = [
  { value: 'CHINH_THUC', label: 'Chính thức' },
  { value: 'THU_VIEC', label: 'Thử việc' },
  { value: 'HOC_VIEC', label: 'Học việc' },
  { value: 'THUC_TAP', label: 'Thực tập' },
  { value: 'CONG_TAC_VIEN', label: 'Cộng tác viên' },
  { value: 'THOI_VU', label: 'Thời vụ' },
];

interface Props {
  nhanVienId: number;
}

export default function TabHopDong({ nhanVienId }: Props) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showNgung, setShowNgung] = useState<number | null>(null);

  const [form, setForm] = useState({
    loaiHopDong: 'VO_THOI_HAN',
    tuNgay: new Date().toISOString().split('T')[0],
    denNgay: '',
    luongCoBan: 0,
    luongDongBH: 0,
    heSoLuong: 1,
    loaiNhanVien: 'CHINH_THUC',
    ghiChu: '',
    fileHopDong: '', // URL file chính
    filesHopDong: [] as string[], // Mảng URL nhiều file
  });

  const [ngungForm, setNgungForm] = useState({
    ngayKetThuc: new Date().toISOString().split('T')[0],
    lyDo: '',
  });

  const { data: hopDongs, isLoading } = useQuery({
    queryKey: ['hop-dong', nhanVienId],
    queryFn: () => layDanhSachHopDong(nhanVienId),
  });

  const taoMutation = useMutation({
    mutationFn: (data: typeof form) => taoHopDong(nhanVienId, {
      ...data,
      denNgay: data.denNgay || undefined,
    }),
    onSuccess: () => {
      toast.success('Tạo hợp đồng thành công');
      queryClient.invalidateQueries({ queryKey: ['hop-dong', nhanVienId] });
      setShowForm(false);
      resetForm();
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Lỗi tạo hợp đồng');
    },
  });

  const capNhatMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: typeof form }) =>
      capNhatHopDong(id, data),
    onSuccess: () => {
      toast.success('Cập nhật hợp đồng thành công');
      queryClient.invalidateQueries({ queryKey: ['hop-dong', nhanVienId] });
      setEditingId(null);
      resetForm();
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Lỗi cập nhật');
    },
  });

  const ngungMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: typeof ngungForm }) =>
      ngungHopDong(id, data),
    onSuccess: () => {
      toast.success('Đã ngừng hợp đồng');
      queryClient.invalidateQueries({ queryKey: ['hop-dong', nhanVienId] });
      setShowNgung(null);
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Lỗi ngừng hợp đồng');
    },
  });

  const xoaMutation = useMutation({
    mutationFn: xoaHopDong,
    onSuccess: () => {
      toast.success('Đã xóa hợp đồng');
      queryClient.invalidateQueries({ queryKey: ['hop-dong', nhanVienId] });
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Lỗi xóa');
    },
  });

  const resetForm = () => {
    setForm({
      loaiHopDong: 'VO_THOI_HAN',
      tuNgay: new Date().toISOString().split('T')[0],
      denNgay: '',
      luongCoBan: 0,
      luongDongBH: 0,
      heSoLuong: 1,
      loaiNhanVien: 'CHINH_THUC',
      ghiChu: '',
      fileHopDong: '',
      filesHopDong: [],
    });
  };

  const handleEdit = (hd: NhanVienHopDong) => {
    setForm({
      loaiHopDong: hd.loaiHopDong,
      tuNgay: hd.tuNgay.split('T')[0],
      denNgay: hd.denNgay?.split('T')[0] || '',
      luongCoBan: Number(hd.luongCoBan),
      luongDongBH: Number(hd.luongDongBH || 0),
      heSoLuong: Number(hd.heSoLuong || 1),
      loaiNhanVien: (hd as any).loaiNhanVien || 'CHINH_THUC',
      ghiChu: hd.ghiChu || '',
      fileHopDong: (hd as any).fileHopDong || '',
      filesHopDong: (hd as any).filesHopDong || [],
    });
    setEditingId(hd.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      capNhatMutation.mutate({ id: editingId, data: form });
    } else {
      taoMutation.mutate(form);
    }
  };

  const handleNgung = (e: React.FormEvent) => {
    e.preventDefault();
    if (showNgung) {
      ngungMutation.mutate({ id: showNgung, data: ngungForm });
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Đang tải...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Lịch sử Hợp đồng / Lương</h3>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); resetForm(); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <span>+</span> Thêm hợp đồng
        </button>
      </div>

      {/* Form tạo/sửa */}
      {showForm && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium mb-3">{editingId ? 'Sửa hợp đồng' : 'Tạo hợp đồng mới'}</h4>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Loại hợp đồng</label>
              <select
                value={form.loaiHopDong}
                onChange={(e) => setForm({ ...form, loaiHopDong: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              >
                {Object.entries(loaiHopDongLabel).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Loại nhân viên</label>
              <select
                value={form.loaiNhanVien}
                onChange={(e) => setForm({ ...form, loaiNhanVien: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              >
                {LOAI_NHAN_VIEN_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Lương cơ bản</label>
              <input
                type="number"
                value={form.luongCoBan}
                onChange={(e) => setForm({ ...form, luongCoBan: Number(e.target.value) })}
                className="w-full border rounded-lg px-3 py-2"
                min={0}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ngày vào làm / Từ ngày</label>
              <VietnameseDatePicker
                value={form.tuNgay}
                onChange={(val) => setForm({ ...form, tuNgay: val })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Đến ngày (để trống nếu vô thời hạn)</label>
              <VietnameseDatePicker
                value={form.denNgay}
                onChange={(val) => setForm({ ...form, denNgay: val })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Lương đóng BH</label>
              <input
                type="number"
                value={form.luongDongBH}
                onChange={(e) => setForm({ ...form, luongDongBH: Number(e.target.value) })}
                className="w-full border rounded-lg px-3 py-2"
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hệ số lương</label>
              <input
                type="number"
                step="0.01"
                value={form.heSoLuong}
                onChange={(e) => setForm({ ...form, heSoLuong: Number(e.target.value) })}
                className="w-full border rounded-lg px-3 py-2"
                min={0}
              />
            </div>
            
            {/* Upload file hợp đồng */}
            <div className="col-span-2 border-t pt-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <FileUpload
                  endpoint={`/api/upload/hop-dong/${nhanVienId}`}
                  currentUrl={form.fileHopDong}
                  onUploadSuccess={(url) => setForm({ ...form, fileHopDong: url })}
                  onRemove={() => setForm({ ...form, fileHopDong: '' })}
                  accept="document"
                  label="File hợp đồng chính (ảnh/PDF)"
                />
                <MultiFileUpload
                  endpoint={`/api/upload/hop-dong/${nhanVienId}/multi`}
                  currentUrls={form.filesHopDong}
                  onUploadSuccess={(urls) => setForm({ ...form, filesHopDong: urls })}
                  accept="document"
                  label="File bổ sung (tùy chọn)"
                  maxFiles={10}
                />
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Ghi chú</label>
              <textarea
                value={form.ghiChu}
                onChange={(e) => setForm({ ...form, ghiChu: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                rows={2}
              />
            </div>
            <div className="col-span-2 flex gap-2">
              <button
                type="submit"
                disabled={taoMutation.isPending || capNhatMutation.isPending}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {editingId ? 'Cập nhật' : 'Tạo mới'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingId(null); }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal ngừng */}
      {showNgung && (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-medium mb-3 text-yellow-800">Ngừng hợp đồng sớm</h4>
          <form onSubmit={handleNgung} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Ngày kết thúc</label>
              <VietnameseDatePicker
                value={ngungForm.ngayKetThuc}
                onChange={(val) => setNgungForm({ ...ngungForm, ngayKetThuc: val })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Lý do</label>
              <input
                type="text"
                value={ngungForm.lyDo}
                onChange={(e) => setNgungForm({ ...ngungForm, lyDo: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Nhập lý do..."
              />
            </div>
            <button
              type="submit"
              disabled={ngungMutation.isPending}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
            >
              Xác nhận
            </button>
            <button
              type="button"
              onClick={() => setShowNgung(null)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Hủy
            </button>
          </form>
        </div>
      )}

      {/* Danh sách hợp đồng - Timeline */}
      <div className="relative">
        {hopDongs?.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            Chưa có hợp đồng nào
          </div>
        ) : (
          <div className="space-y-4">
            {hopDongs?.map((hd, idx) => (
              <div
                key={hd.id}
                className={`relative pl-8 pb-4 ${idx < (hopDongs?.length || 0) - 1 ? 'border-l-2 border-gray-200' : ''}`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-[-5px] w-3 h-3 rounded-full ${
                    hd.trangThai === 'HIEU_LUC' ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />

                <div className={`bg-white rounded-lg shadow p-4 ${hd.trangThai === 'HIEU_LUC' ? 'border-l-4 border-green-500' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">{loaiHopDongLabel[hd.loaiHopDong]}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          hd.trangThai === 'HIEU_LUC' ? 'bg-green-100 text-green-800' :
                          hd.trangThai === 'HET_HAN' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {trangThaiHopDongLabel[hd.trangThai]}
                        </span>
                        {/* Loại nhân viên */}
                        {(hd as any).loaiNhanVien && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${LOAI_NHAN_VIEN_MAP[(hd as any).loaiNhanVien as keyof typeof LOAI_NHAN_VIEN_MAP]?.color || 'bg-gray-100'}`}>
                            {LOAI_NHAN_VIEN_MAP[(hd as any).loaiNhanVien as keyof typeof LOAI_NHAN_VIEN_MAP]?.label || (hd as any).loaiNhanVien}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {new Date(hd.tuNgay).toLocaleDateString('vi-VN')} → {hd.denNgay ? new Date(hd.denNgay).toLocaleDateString('vi-VN') : 'Vô thời hạn'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">
                        {formatCurrency(Number(hd.luongCoBan))}
                      </div>
                      {hd.heSoLuong && (
                        <div className="text-xs text-gray-500">Hệ số: {hd.heSoLuong}</div>
                      )}
                    </div>
                  </div>

                  {hd.ghiChu && (
                    <div className="text-sm text-gray-500 mt-2 italic">{hd.ghiChu}</div>
                  )}

                  {/* File hợp đồng */}
                  {((hd as any).fileHopDong || ((hd as any).filesHopDong && (hd as any).filesHopDong.length > 0)) && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                        <FileText size={12} /> File đính kèm:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(hd as any).fileHopDong && (
                          <a
                            href={(hd as any).fileHopDong}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs hover:bg-blue-100"
                          >
                            {(hd as any).fileHopDong.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? <Image size={12} /> : <FileText size={12} />}
                            File chính
                          </a>
                        )}
                        {(hd as any).filesHopDong?.map((url: string, i: number) => (
                          <a
                            key={i}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs hover:bg-gray-100"
                          >
                            {url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? <Image size={12} /> : <FileText size={12} />}
                            File {i + 2}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleEdit(hd)}
                      className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                    >
                      Sửa
                    </button>
                    {hd.trangThai === 'HIEU_LUC' && (
                      <button
                        onClick={() => setShowNgung(hd.id)}
                        className="text-xs px-2 py-1 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100"
                      >
                        Ngừng sớm
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (confirm('Xác nhận xóa hợp đồng này?')) {
                          xoaMutation.mutate(hd.id);
                        }
                      }}
                      className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
