import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  NhomNhanVien,
  layDanhSachNhom,
} from '../services/nhanVienMoRongApi';
import api from '../services/api';

interface Props {
  nhanVienId: number;
}

interface NhomThuocVe {
  id: number;
  nhom: NhomNhanVien;
  tuNgay: string;
  denNgay?: string;
}

export default function TabNhomNhanVien({ nhanVienId }: Props) {
  const queryClient = useQueryClient();
  const [selectedNhomId, setSelectedNhomId] = useState<number | null>(null);

  // Lấy danh sách nhóm của nhân viên này
  const { data: nhomsCuaNhanVien, isLoading: loadingNhoms } = useQuery({
    queryKey: ['nhan-vien-nhom', nhanVienId],
    queryFn: async () => {
      const res = await api.get(`/nhan-vien/${nhanVienId}/nhom`);
      return res.data as NhomThuocVe[];
    },
  });

  // Lấy tất cả nhóm để có thể thêm
  const { data: tatCaNhom } = useQuery({
    queryKey: ['nhom-nhan-vien'],
    queryFn: () => layDanhSachNhom(),
  });

  // Nhóm chưa thuộc về
  const nhomChuaThuocVe = tatCaNhom?.filter(
    (n) => !nhomsCuaNhanVien?.some((nv) => nv.nhom.id === n.id)
  );

  const themVaoNhomMutation = useMutation({
    mutationFn: async (nhomId: number) => {
      return api.post(`/nhan-vien/${nhanVienId}/them-vao-nhom`, {
        nhomId,
        tuNgay: new Date().toISOString().split('T')[0],
      });
    },
    onSuccess: () => {
      toast.success('Đã thêm vào nhóm');
      queryClient.invalidateQueries({ queryKey: ['nhan-vien-nhom', nhanVienId] });
      setSelectedNhomId(null);
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Lỗi thêm vào nhóm');
    },
  });

  const goKhoiNhomMutation = useMutation({
    mutationFn: async (nhomId: number) => {
      return api.post(`/nhan-vien/${nhanVienId}/go-khoi-nhom`, {
        nhomId,
        denNgay: new Date().toISOString().split('T')[0],
      });
    },
    onSuccess: () => {
      toast.success('Đã gỡ khỏi nhóm');
      queryClient.invalidateQueries({ queryKey: ['nhan-vien-nhom', nhanVienId] });
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Lỗi gỡ khỏi nhóm');
    },
  });

  const handleThemVaoNhom = () => {
    if (!selectedNhomId) return;
    themVaoNhomMutation.mutate(selectedNhomId);
  };

  const handleGoKhoiNhom = (nhomId: number) => {
    if (!confirm('Xác nhận gỡ khỏi nhóm?')) return;
    goKhoiNhomMutation.mutate(nhomId);
  };

  if (loadingNhoms) {
    return <div className="p-4 text-center">Đang tải...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Nhóm Nhân viên</h3>
      </div>

      {/* Thêm vào nhóm */}
      {nhomChuaThuocVe && nhomChuaThuocVe.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium mb-3">Thêm vào nhóm</h4>
          <div className="flex gap-2 items-center">
            <select
              value={selectedNhomId || ''}
              onChange={(e) => setSelectedNhomId(Number(e.target.value))}
              className="flex-1 border rounded-lg px-3 py-2"
            >
              <option value="">-- Chọn nhóm --</option>
              {nhomChuaThuocVe.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.tenNhom} {n.moTa && `(${n.moTa})`}
                </option>
              ))}
            </select>
            <button
              onClick={handleThemVaoNhom}
              disabled={!selectedNhomId}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              Thêm
            </button>
          </div>
        </div>
      )}

      {/* Danh sách nhóm đã thuộc */}
      <div className="grid gap-3">
        {nhomsCuaNhanVien?.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            Nhân viên chưa thuộc nhóm nào
          </div>
        ) : (
          nhomsCuaNhanVien?.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: item.nhom.mauSac || '#6B7280' }}
                >
                  {item.nhom.tenNhom.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold">{item.nhom.tenNhom}</div>
                  {item.nhom.moTa && (
                    <div className="text-sm text-gray-500">{item.nhom.moTa}</div>
                  )}
                  <div className="text-xs text-gray-400">
                    Từ {new Date(item.tuNgay).toLocaleDateString('vi-VN')}
                    {item.denNgay && ` đến ${new Date(item.denNgay).toLocaleDateString('vi-VN')}`}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleGoKhoiNhom(item.nhom.id)}
                className="text-xs px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
              >
                Gỡ khỏi nhóm
              </button>
            </div>
          ))
        )}
      </div>

      {/* Info */}
      <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
        <strong>Lưu ý:</strong> Nhóm nhân viên được sử dụng trong Rule Engine để áp dụng các quy tắc tính lương
        cho từng nhóm riêng biệt (VD: nhóm Quản lý, nhóm Kỹ thuật, nhóm Sales...).
      </div>
    </div>
  );
}
