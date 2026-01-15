// Trang quản lý Nhóm nhân viên
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';
import {
  NhomNhanVien,
  layDanhSachNhom,
  taoNhom,
  capNhatNhom,
  xoaNhom,
} from '../services/nhanVienMoRongApi';

export default function QuanLyNhomNhanVien() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    maNhom: '',
    tenNhom: '',
    moTa: '',
    mauSac: '#3B82F6',
    trangThai: true,
  });

  const { data: nhoms, isLoading } = useQuery({
    queryKey: ['nhom-nhan-vien'],
    queryFn: layDanhSachNhom,
  });

  const taoMutation = useMutation({
    mutationFn: taoNhom,
    onSuccess: () => {
      toast.success('Tạo nhóm thành công');
      queryClient.invalidateQueries({ queryKey: ['nhom-nhan-vien'] });
      setShowForm(false);
      resetForm();
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Lỗi tạo nhóm');
    },
  });

  const capNhatMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: typeof form }) =>
      capNhatNhom(id, data),
    onSuccess: () => {
      toast.success('Cập nhật nhóm thành công');
      queryClient.invalidateQueries({ queryKey: ['nhom-nhan-vien'] });
      setEditingId(null);
      setShowForm(false);
      resetForm();
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Lỗi cập nhật');
    },
  });

  const xoaMutation = useMutation({
    mutationFn: xoaNhom,
    onSuccess: () => {
      toast.success('Đã xóa nhóm');
      queryClient.invalidateQueries({ queryKey: ['nhom-nhan-vien'] });
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Lỗi xóa nhóm');
    },
  });

  const resetForm = () => {
    setForm({
      maNhom: '',
      tenNhom: '',
      moTa: '',
      mauSac: '#3B82F6',
      trangThai: true,
    });
  };

  const handleEdit = (nhom: NhomNhanVien) => {
    setForm({
      maNhom: nhom.maNhom,
      tenNhom: nhom.tenNhom,
      moTa: nhom.moTa || '',
      mauSac: nhom.mauSac || '#3B82F6',
      trangThai: nhom.trangThai,
    });
    setEditingId(nhom.id);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Nhóm Nhân viên</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            resetForm();
          }}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Thêm nhóm
        </button>
      </div>

      {/* Form tạo/sửa */}
      {showForm && (
        <div className="card mb-6 bg-blue-50 border border-blue-200">
          <h3 className="font-semibold mb-4">
            {editingId ? 'Sửa nhóm' : 'Tạo nhóm mới'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Mã nhóm *</label>
              <input
                type="text"
                value={form.maNhom}
                onChange={(e) => setForm({ ...form, maNhom: e.target.value.toUpperCase() })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="VD: NHOM_KT, NHOM_HR..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tên nhóm *</label>
              <input
                type="text"
                value={form.tenNhom}
                onChange={(e) => setForm({ ...form, tenNhom: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="VD: Nhóm Kế toán, Nhóm HR..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mô tả</label>
              <input
                type="text"
                value={form.moTa}
                onChange={(e) => setForm({ ...form, moTa: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Mô tả ngắn về nhóm..."
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Màu sắc</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.mauSac}
                    onChange={(e) => setForm({ ...form, mauSac: e.target.value })}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <span className="text-sm text-gray-500">{form.mauSac}</span>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Trạng thái</label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.trangThai}
                    onChange={(e) => setForm({ ...form, trangThai: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Đang hoạt động</span>
                </label>
              </div>
            </div>
            <div className="col-span-2 flex gap-2">
              <button
                type="submit"
                disabled={taoMutation.isPending || capNhatMutation.isPending}
                className="btn btn-primary"
              >
                {editingId ? 'Cập nhật' : 'Tạo mới'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="btn btn-secondary"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Danh sách nhóm */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nhoms?.map((nhom) => (
          <div
            key={nhom.id}
            className={`card ${!nhom.trangThai ? 'opacity-60' : ''}`}
            style={{ borderLeftWidth: '4px', borderLeftColor: nhom.mauSac || '#6B7280' }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: nhom.mauSac || '#6B7280' }}
                >
                  {nhom.tenNhom.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold">{nhom.tenNhom}</div>
                  <div className="text-xs text-gray-500">{nhom.maNhom}</div>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(nhom)}
                  className="p-1.5 hover:bg-blue-100 rounded text-blue-600"
                  title="Sửa"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Xác nhận xóa nhóm "${nhom.tenNhom}"?`)) {
                      xoaMutation.mutate(nhom.id);
                    }
                  }}
                  className="p-1.5 hover:bg-red-100 rounded text-red-600"
                  title="Xóa"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            {nhom.moTa && (
              <div className="text-sm text-gray-600 mt-2">{nhom.moTa}</div>
            )}
            <div className="flex items-center justify-between mt-3 pt-3 border-t">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Users size={16} />
                <span>{nhom._count?.thanhViens || 0} thành viên</span>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  nhom.trangThai
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {nhom.trangThai ? 'Hoạt động' : 'Tạm dừng'}
              </span>
            </div>
          </div>
        ))}

        {nhoms?.length === 0 && (
          <div className="col-span-3 text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
            <Users size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Chưa có nhóm nào</p>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingId(null);
                resetForm();
              }}
              className="btn btn-primary mt-4"
            >
              <Plus size={20} />
              Tạo nhóm đầu tiên
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
        <strong>💡 Hướng dẫn:</strong> Nhóm nhân viên được sử dụng trong Rule Engine để áp dụng
        các quy tắc tính lương khác nhau cho từng nhóm. Ví dụ: nhóm Quản lý có phụ cấp chức vụ,
        nhóm Kỹ thuật có phụ cấp độc hại...
      </div>
    </div>
  );
}
