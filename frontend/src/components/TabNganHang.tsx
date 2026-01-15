import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  NhanVienNganHang,
  layDanhSachNganHang,
  taoNganHang,
  capNhatNganHang,
  xoaNganHang,
  datNganHangMacDinh,
} from '../services/nhanVienMoRongApi';

interface Props {
  nhanVienId: number;
}

const NGAN_HANG_OPTIONS = [
  { code: 'VCB', name: 'Vietcombank' },
  { code: 'TCB', name: 'Techcombank' },
  { code: 'BIDV', name: 'BIDV' },
  { code: 'VTB', name: 'Vietinbank' },
  { code: 'ACB', name: 'ACB' },
  { code: 'MBB', name: 'MB Bank' },
  { code: 'VPB', name: 'VPBank' },
  { code: 'TPB', name: 'TPBank' },
  { code: 'STB', name: 'Sacombank' },
  { code: 'SHB', name: 'SHB' },
  { code: 'MSB', name: 'MSB' },
  { code: 'OCB', name: 'OCB' },
  { code: 'HDB', name: 'HDBank' },
  { code: 'SCB', name: 'SCB' },
  { code: 'EIB', name: 'Eximbank' },
  { code: 'AGRI', name: 'Agribank' },
  { code: 'KHAC', name: 'Khác' },
];

export default function TabNganHang({ nhanVienId }: Props) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    tenNganHang: 'VCB',
    chiNhanh: '',
    soTaiKhoan: '',
    chuTaiKhoan: '',
    laMacDinh: false,
    tuNgay: new Date().toISOString().split('T')[0],
    denNgay: '',
    ghiChu: '',
  });

  const { data: nganHangs, isLoading } = useQuery({
    queryKey: ['ngan-hang', nhanVienId],
    queryFn: () => layDanhSachNganHang(nhanVienId),
  });

  const taoMutation = useMutation({
    mutationFn: (data: typeof form) => taoNganHang(nhanVienId, {
      ...data,
      denNgay: data.denNgay || undefined,
    }),
    onSuccess: () => {
      toast.success('Thêm tài khoản ngân hàng thành công');
      queryClient.invalidateQueries({ queryKey: ['ngan-hang', nhanVienId] });
      setShowForm(false);
      resetForm();
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Lỗi thêm tài khoản');
    },
  });

  const capNhatMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: typeof form }) =>
      capNhatNganHang(id, data),
    onSuccess: () => {
      toast.success('Cập nhật tài khoản thành công');
      queryClient.invalidateQueries({ queryKey: ['ngan-hang', nhanVienId] });
      setEditingId(null);
      setShowForm(false);
      resetForm();
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Lỗi cập nhật');
    },
  });

  const xoaMutation = useMutation({
    mutationFn: xoaNganHang,
    onSuccess: () => {
      toast.success('Đã xóa tài khoản');
      queryClient.invalidateQueries({ queryKey: ['ngan-hang', nhanVienId] });
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Lỗi xóa');
    },
  });

  const datMacDinhMutation = useMutation({
    mutationFn: datNganHangMacDinh,
    onSuccess: () => {
      toast.success('Đã đặt làm mặc định');
      queryClient.invalidateQueries({ queryKey: ['ngan-hang', nhanVienId] });
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Lỗi');
    },
  });

  const resetForm = () => {
    setForm({
      tenNganHang: 'VCB',
      chiNhanh: '',
      soTaiKhoan: '',
      chuTaiKhoan: '',
      laMacDinh: false,
      tuNgay: new Date().toISOString().split('T')[0],
      denNgay: '',
      ghiChu: '',
    });
  };

  const handleEdit = (nh: NhanVienNganHang) => {
    setForm({
      tenNganHang: nh.tenNganHang,
      chiNhanh: nh.chiNhanh || '',
      soTaiKhoan: nh.soTaiKhoan,
      chuTaiKhoan: nh.chuTaiKhoan,
      laMacDinh: nh.laMacDinh,
      tuNgay: nh.tuNgay?.split('T')[0] || '',
      denNgay: nh.denNgay?.split('T')[0] || '',
      ghiChu: nh.ghiChu || '',
    });
    setEditingId(nh.id);
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

  const getNganHangName = (code: string) => {
    const found = NGAN_HANG_OPTIONS.find((n) => n.code === code);
    return found ? found.name : code;
  };

  if (isLoading) {
    return <div className="p-4 text-center">Đang tải...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Tài khoản Ngân hàng</h3>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); resetForm(); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <span>+</span> Thêm tài khoản
        </button>
      </div>

      {/* Form tạo/sửa */}
      {showForm && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium mb-3">{editingId ? 'Sửa tài khoản' : 'Thêm tài khoản mới'}</h4>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ngân hàng</label>
              <select
                value={form.tenNganHang}
                onChange={(e) => setForm({ ...form, tenNganHang: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              >
                {NGAN_HANG_OPTIONS.map((nh) => (
                  <option key={nh.code} value={nh.code}>{nh.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Chi nhánh</label>
              <input
                type="text"
                value={form.chiNhanh}
                onChange={(e) => setForm({ ...form, chiNhanh: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="VD: Hà Nội, TP.HCM..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Số tài khoản *</label>
              <input
                type="text"
                value={form.soTaiKhoan}
                onChange={(e) => setForm({ ...form, soTaiKhoan: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Nhập số tài khoản"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Chủ tài khoản *</label>
              <input
                type="text"
                value={form.chuTaiKhoan}
                onChange={(e) => setForm({ ...form, chuTaiKhoan: e.target.value.toUpperCase() })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="NGUYEN VAN A"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hiệu lực từ</label>
              <input
                type="date"
                value={form.tuNgay}
                onChange={(e) => setForm({ ...form, tuNgay: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hiệu lực đến</label>
              <input
                type="date"
                value={form.denNgay}
                onChange={(e) => setForm({ ...form, denNgay: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Ghi chú</label>
              <input
                type="text"
                value={form.ghiChu}
                onChange={(e) => setForm({ ...form, ghiChu: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="VD: Tài khoản nhận lương, tài khoản phụ..."
              />
            </div>
            <div className="col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.laMacDinh}
                  onChange={(e) => setForm({ ...form, laMacDinh: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">Đặt làm tài khoản mặc định</span>
              </label>
            </div>
            <div className="col-span-2 flex gap-2">
              <button
                type="submit"
                disabled={taoMutation.isPending || capNhatMutation.isPending}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {editingId ? 'Cập nhật' : 'Thêm'}
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

      {/* Danh sách tài khoản */}
      <div className="grid gap-4">
        {nganHangs?.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            Chưa có tài khoản ngân hàng nào
          </div>
        ) : (
          nganHangs?.map((nh) => (
            <div
              key={nh.id}
              className={`bg-white rounded-lg shadow p-4 ${nh.laMacDinh ? 'border-l-4 border-green-500' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                    {nh.tenNganHang.slice(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{getNganHangName(nh.tenNganHang)}</span>
                      {nh.chiNhanh && <span className="text-sm text-gray-500">- {nh.chiNhanh}</span>}
                      {nh.laMacDinh && (
                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                          Mặc định
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-mono text-gray-800">{nh.soTaiKhoan}</div>
                    <div className="text-sm text-gray-500">{nh.chuTaiKhoan}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {nh.tuNgay && (
                    <div className="text-xs text-gray-400">
                      {new Date(nh.tuNgay).toLocaleDateString('vi-VN')}
                      {nh.denNgay && ` → ${new Date(nh.denNgay).toLocaleDateString('vi-VN')}`}
                    </div>
                  )}
                  <div className="flex gap-2">
                    {!nh.laMacDinh && (
                      <button
                        onClick={() => datMacDinhMutation.mutate(nh.id)}
                        className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100"
                      >
                        Đặt mặc định
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(nh)}
                      className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Xác nhận xóa tài khoản này?')) {
                          xoaMutation.mutate(nh.id);
                        }
                      }}
                      className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
              {nh.ghiChu && (
                <div className="text-sm text-gray-500 mt-2 italic">{nh.ghiChu}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
