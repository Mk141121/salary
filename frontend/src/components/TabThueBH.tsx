import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { VietnameseDatePicker } from './VietnameseDatePicker';

interface ThueBH {
  id: number;
  nhanVienId: number;
  mstCaNhan: string | null;
  soCmndCccd: string | null;
  ngayCap: string | null;
  noiCap: string | null;
  soNguoiPhuThuoc: number;
  ghiChu: string | null;
}

interface Props {
  nhanVienId: number;
}

const TabThueBH: React.FC<Props> = ({ nhanVienId }) => {
  const [thueBH, setThueBH] = useState<ThueBH | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    mstCaNhan: '',
    soCmndCccd: '',
    ngayCap: '',
    noiCap: '',
    soNguoiPhuThuoc: 0,
    ghiChu: '',
  });

  const fetchThueBH = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/nhan-vien/${nhanVienId}/thue-bh`);
      const data = response.data;
      setThueBH(data);
      if (data) {
        setFormData({
          mstCaNhan: data.mstCaNhan || '',
          soCmndCccd: data.soCmndCccd || '',
          ngayCap: data.ngayCap ? data.ngayCap.split('T')[0] : '',
          noiCap: data.noiCap || '',
          soNguoiPhuThuoc: data.soNguoiPhuThuoc || 0,
          ghiChu: data.ghiChu || '',
        });
      }
    } catch (error) {
      console.error('Lỗi khi tải thông tin thuế/BHXH:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThueBH();
  }, [nhanVienId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'soNguoiPhuThuoc' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.post(`/nhan-vien/${nhanVienId}/thue-bh`, formData);
      await fetchThueBH();
      setIsEditing(false);
    } catch (error) {
      console.error('Lỗi khi lưu thông tin thuế/BHXH:', error);
      alert('Có lỗi xảy ra khi lưu thông tin');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (thueBH) {
      setFormData({
        mstCaNhan: thueBH.mstCaNhan || '',
        soCmndCccd: thueBH.soCmndCccd || '',
        ngayCap: thueBH.ngayCap ? thueBH.ngayCap.split('T')[0] : '',
        noiCap: thueBH.noiCap || '',
        soNguoiPhuThuoc: thueBH.soNguoiPhuThuoc || 0,
        ghiChu: thueBH.ghiChu || '',
      });
    } else {
      setFormData({
        mstCaNhan: '',
        soCmndCccd: '',
        ngayCap: '',
        noiCap: '',
        soNguoiPhuThuoc: 0,
        ghiChu: '',
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Thông tin Thuế & BHXH</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {thueBH ? 'Chỉnh sửa' : 'Thêm thông tin'}
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        )}
      </div>

      {/* Form / Display */}
      <div className="bg-white border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CMND/CCCD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số CMND/CCCD
            </label>
            {isEditing ? (
              <input
                type="text"
                name="soCmndCccd"
                value={formData.soCmndCccd}
                onChange={handleInputChange}
                placeholder="Nhập số CMND/CCCD"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-900">{thueBH?.soCmndCccd || '—'}</p>
            )}
          </div>

          {/* Ngày cấp */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày cấp
            </label>
            {isEditing ? (
              <VietnameseDatePicker
                value={formData.ngayCap}
                onChange={(val) => setFormData(prev => ({ ...prev, ngayCap: val }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-900">
                {thueBH?.ngayCap 
                  ? new Date(thueBH.ngayCap).toLocaleDateString('vi-VN')
                  : '—'}
              </p>
            )}
          </div>

          {/* Nơi cấp */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nơi cấp
            </label>
            {isEditing ? (
              <input
                type="text"
                name="noiCap"
                value={formData.noiCap}
                onChange={handleInputChange}
                placeholder="Nhập nơi cấp"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-900">{thueBH?.noiCap || '—'}</p>
            )}
          </div>

          {/* Mã số thuế cá nhân */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mã số thuế cá nhân
            </label>
            {isEditing ? (
              <input
                type="text"
                name="mstCaNhan"
                value={formData.mstCaNhan}
                onChange={handleInputChange}
                placeholder="Nhập mã số thuế"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-900">{thueBH?.mstCaNhan || '—'}</p>
            )}
          </div>

          {/* Số người phụ thuộc */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số người phụ thuộc
            </label>
            {isEditing ? (
              <input
                type="number"
                name="soNguoiPhuThuoc"
                min="0"
                value={formData.soNguoiPhuThuoc}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-900">{thueBH?.soNguoiPhuThuoc ?? 0} người</p>
            )}
          </div>

          {/* Ghi chú */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ghi chú
            </label>
            {isEditing ? (
              <textarea
                name="ghiChu"
                value={formData.ghiChu}
                onChange={handleInputChange}
                rows={3}
                placeholder="Nhập ghi chú (nếu có)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-900">{thueBH?.ghiChu || '—'}</p>
            )}
          </div>
        </div>

        {/* Thông tin tính thuế */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">💡 Thông tin giảm trừ thuế TNCN</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• Giảm trừ bản thân: 11.000.000 đ/tháng</p>
            <p>• Giảm trừ người phụ thuộc: 4.400.000 đ/người/tháng</p>
            <p>
              <strong>
                Tổng giảm trừ: {(11000000 + (formData.soNguoiPhuThuoc || 0) * 4400000).toLocaleString('vi-VN')} đ/tháng
              </strong>
            </p>
          </div>
        </div>
      </div>

      {/* Lịch sử cập nhật */}
      {thueBH && (
        <div className="text-sm text-gray-500">
          Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
        </div>
      )}
    </div>
  );
};

export default TabThueBH;
