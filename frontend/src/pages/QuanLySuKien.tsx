// Trang Quản lý Sự kiện Thưởng/Phạt
import { useState, useEffect } from 'react'
import { Plus, Check, X, Filter } from 'lucide-react'
import {
  suKienApi,
  SuKienThuongPhat,
  DanhMucSuKien,
  LoaiSuKien,
  TrangThaiSuKien,
} from '../services/ruleEngineApi'
import { phongBanApi, nhanVienApi } from '../services/api'
import { VietnameseDatePicker } from '../components/VietnameseDatePicker'

interface PhongBan {
  id: number
  maPhongBan: string
  tenPhongBan: string
}

interface NhanVien {
  id: number
  maNhanVien: string
  hoTen: string
  phongBanId?: number
}

const TRANG_THAI_LABELS: Record<TrangThaiSuKien, { label: string; color: string }> = {
  NHAP: { label: 'Nháp', color: 'bg-gray-100 text-gray-800' },
  DA_DUYET: { label: 'Đã duyệt', color: 'bg-green-100 text-green-800' },
  TU_CHOI: { label: 'Từ chối', color: 'bg-red-100 text-red-800' },
  HUY: { label: 'Huỷ', color: 'bg-gray-400 text-white' },
}

const LOAI_SU_KIEN_LABELS: Record<LoaiSuKien, { label: string; color: string; icon: string }> = {
  THUONG: { label: 'Thưởng', color: 'bg-green-100 text-green-800', icon: '🎁' },
  PHAT: { label: 'Phạt', color: 'bg-red-100 text-red-800', icon: '⚠️' },
}

export default function QuanLySuKien() {
  const [suKiens, setSuKiens] = useState<SuKienThuongPhat[]>([])
  const [danhMucSuKiens, setDanhMucSuKiens] = useState<DanhMucSuKien[]>([])
  const [phongBans, setPhongBans] = useState<PhongBan[]>([])
  const [nhanViens, setNhanViens] = useState<NhanVien[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showDanhMucModal, setShowDanhMucModal] = useState(false)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  // Filter state
  const [filters, setFilters] = useState<{
    phongBanId?: number
    loaiSuKien?: LoaiSuKien
    trangThai?: TrangThaiSuKien
    tuNgay?: string
    denNgay?: string
  }>({})

  // Form state
  const [form, setForm] = useState({
    nhanVienId: 0,
    phongBanId: 0,
    ngay: new Date().toISOString().split('T')[0],
    loaiSuKien: 'THUONG' as LoaiSuKien,
    maSuKien: '',
    giaTri: 1,
    soTien: 0,
    ghiChu: '',
  })

  // Danh mục form
  const [danhMucForm, setDanhMucForm] = useState({
    maSuKien: '',
    tenSuKien: '',
    loai: 'THUONG' as LoaiSuKien,
    moTa: '',
    soTienMacDinh: 0,
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const filterParams = {
        ...filters,
        tuNgay: filters.tuNgay ? new Date(filters.tuNgay) : undefined,
        denNgay: filters.denNgay ? new Date(filters.denNgay) : undefined,
      }
      const [sk, dm, pb, nv] = await Promise.all([
        suKienApi.layDanhSach(filterParams),
        suKienApi.layDanhMucSuKien(),
        phongBanApi.layTatCa(),
        nhanVienApi.layTatCa(),
      ])
      setSuKiens(Array.isArray(sk) ? sk : [])
      setDanhMucSuKiens(dm)
      setPhongBans(pb)
      const nvData = 'data' in nv ? nv.data : nv
      setNhanViens(Array.isArray(nvData) ? nvData : [])
    } catch (error) {
      console.error('Lỗi load dữ liệu:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = () => {
    loadData()
  }

  const handleTaoSuKien = async () => {
    try {
      await suKienApi.tao({
        ...form,
        ngay: new Date(form.ngay),
      })
      setShowModal(false)
      loadData()
      resetForm()
    } catch (error) {
      console.error('Lỗi tạo sự kiện:', error)
      alert('Lỗi tạo sự kiện')
    }
  }

  const handleDuyet = async (id: number) => {
    try {
      await suKienApi.duyet(id, { trangThai: 'DA_DUYET' })
      loadData()
    } catch (error) {
      console.error('Lỗi duyệt:', error)
      alert('Lỗi duyệt sự kiện')
    }
  }

  const handleTuChoi = async (id: number) => {
    const lyDo = prompt('Lý do từ chối:')
    if (!lyDo) return

    try {
      await suKienApi.duyet(id, { trangThai: 'TU_CHOI', lyDo })
      loadData()
    } catch (error) {
      console.error('Lỗi từ chối:', error)
    }
  }

  const handleDuyetNhieu = async () => {
    if (selectedIds.length === 0) return
    if (!confirm(`Duyệt ${selectedIds.length} sự kiện?`)) return

    try {
      await suKienApi.duyetNhieu({ danhSachId: selectedIds, trangThai: 'DA_DUYET' })
      setSelectedIds([])
      loadData()
    } catch (error) {
      console.error('Lỗi duyệt nhiều:', error)
    }
  }

  const handleTaoDanhMuc = async () => {
    try {
      await suKienApi.taoDanhMucSuKien(danhMucForm)
      setShowDanhMucModal(false)
      loadData()
      setDanhMucForm({
        maSuKien: '',
        tenSuKien: '',
        loai: 'THUONG',
        moTa: '',
        soTienMacDinh: 0,
      })
    } catch (error) {
      console.error('Lỗi tạo danh mục:', error)
      alert('Lỗi tạo danh mục')
    }
  }

  const resetForm = () => {
    setForm({
      nhanVienId: 0,
      phongBanId: 0,
      ngay: new Date().toISOString().split('T')[0],
      loaiSuKien: 'THUONG',
      maSuKien: '',
      giaTri: 1,
      soTien: 0,
      ghiChu: '',
    })
  }

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    const draftIds = suKiens.filter((s) => s.trangThai === 'NHAP').map((s) => s.id)
    if (selectedIds.length === draftIds.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(draftIds)
    }
  }

  // When selecting danh mục, auto-fill soTien
  const handleSelectDanhMuc = (maSuKien: string) => {
    const dm = danhMucSuKiens.find((d) => d.maSuKien === maSuKien)
    setForm({
      ...form,
      maSuKien,
      loaiSuKien: dm?.loai || 'THUONG',
      soTien: dm?.soTienMacDinh || 0,
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Sự kiện Thưởng/Phạt
          </h1>
          <p className="text-gray-500 mt-1">
            Quản lý các sự kiện thưởng, phạt cho nhân viên
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowDanhMucModal(true)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Danh mục sự kiện
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={18} />
            Thêm sự kiện
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phòng ban</label>
            <select
              value={filters.phongBanId || ''}
              onChange={(e) =>
                setFilters({ ...filters, phongBanId: Number(e.target.value) || undefined })
              }
              className="border rounded-lg px-3 py-2 w-48"
            >
              <option value="">Tất cả</option>
              {phongBans.map((pb) => (
                <option key={pb.id} value={pb.id}>
                  {pb.tenPhongBan}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Loại</label>
            <select
              value={filters.loaiSuKien || ''}
              onChange={(e) =>
                setFilters({ ...filters, loaiSuKien: e.target.value as LoaiSuKien || undefined })
              }
              className="border rounded-lg px-3 py-2 w-32"
            >
              <option value="">Tất cả</option>
              <option value="THUONG">Thưởng</option>
              <option value="PHAT">Phạt</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Trạng thái</label>
            <select
              value={filters.trangThai || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  trangThai: e.target.value as TrangThaiSuKien || undefined,
                })
              }
              className="border rounded-lg px-3 py-2 w-32"
            >
              <option value="">Tất cả</option>
              {Object.entries(TRANG_THAI_LABELS).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Từ ngày</label>
            <VietnameseDatePicker
              value={filters.tuNgay || ''}
              onChange={(val) => setFilters({ ...filters, tuNgay: val })}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Đến ngày</label>
            <VietnameseDatePicker
              value={filters.denNgay || ''}
              onChange={(val) => setFilters({ ...filters, denNgay: val })}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2"
          >
            <Filter size={16} />
            Lọc
          </button>
        </div>
      </div>

      {/* Bulk actions */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-3 mb-4 flex items-center justify-between">
          <span className="text-blue-800">
            Đã chọn {selectedIds.length} sự kiện
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleDuyetNhieu}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              Duyệt tất cả
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Bỏ chọn
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left w-10">
                <input
                  type="checkbox"
                  checked={
                    suKiens.filter((s) => s.trangThai === 'NHAP').length > 0 &&
                    selectedIds.length ===
                      suKiens.filter((s) => s.trangThai === 'NHAP').length
                  }
                  onChange={selectAll}
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Ngày
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Nhân viên
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Phòng ban
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Loại
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Mã sự kiện
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                Giá trị
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                Số tiền
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                Trạng thái
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {suKiens.map((sk) => (
              <tr key={sk.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  {sk.trangThai === 'NHAP' && (
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(sk.id)}
                      onChange={() => toggleSelect(sk.id)}
                    />
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  {new Date(sk.ngay).toLocaleDateString('vi-VN')}
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm font-medium">{sk.nhanVien?.hoTen}</div>
                  <div className="text-xs text-gray-500">
                    {sk.nhanVien?.maNhanVien}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  {sk.phongBan?.tenPhongBan}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      LOAI_SU_KIEN_LABELS[sk.loaiSuKien].color
                    }`}
                  >
                    {LOAI_SU_KIEN_LABELS[sk.loaiSuKien].icon}{' '}
                    {LOAI_SU_KIEN_LABELS[sk.loaiSuKien].label}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-mono">{sk.maSuKien}</td>
                <td className="px-4 py-3 text-sm text-right">{sk.giaTri}</td>
                <td className="px-4 py-3 text-sm text-right font-mono">
                  {new Intl.NumberFormat('vi-VN').format(sk.soTien)}đ
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      TRANG_THAI_LABELS[sk.trangThai].color
                    }`}
                  >
                    {TRANG_THAI_LABELS[sk.trangThai].label}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {sk.trangThai === 'NHAP' && (
                    <div className="flex justify-center gap-1">
                      <button
                        onClick={() => handleDuyet(sk.id)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                        title="Duyệt"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => handleTuChoi(sk.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Từ chối"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {suKiens.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-10 text-center text-gray-500">
                  Không có sự kiện nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Thêm sự kiện Thưởng/Phạt</h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nhân viên
                  </label>
                  <select
                    value={form.nhanVienId}
                    onChange={(e) => {
                      const nv = nhanViens.find((n) => n.id === Number(e.target.value))
                      setForm({
                        ...form,
                        nhanVienId: Number(e.target.value),
                        phongBanId: nv?.phongBanId || form.phongBanId,
                      })
                    }}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">-- Chọn --</option>
                    {nhanViens.map((nv) => (
                      <option key={nv.id} value={nv.id}>
                        {nv.hoTen} ({nv.maNhanVien})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày
                  </label>
                  <VietnameseDatePicker
                    value={form.ngay}
                    onChange={(val) => setForm({ ...form, ngay: val })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loại sự kiện
                </label>
                <select
                  value={form.maSuKien}
                  onChange={(e) => handleSelectDanhMuc(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="">-- Chọn sự kiện --</option>
                  <optgroup label="Thưởng">
                    {danhMucSuKiens
                      .filter((d) => d.loai === 'THUONG')
                      .map((d) => (
                        <option key={d.maSuKien} value={d.maSuKien}>
                          {d.tenSuKien} ({d.maSuKien})
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Phạt">
                    {danhMucSuKiens
                      .filter((d) => d.loai === 'PHAT')
                      .map((d) => (
                        <option key={d.maSuKien} value={d.maSuKien}>
                          {d.tenSuKien} ({d.maSuKien})
                        </option>
                      ))}
                  </optgroup>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giá trị (lần/ngày/...)
                  </label>
                  <input
                    type="number"
                    value={form.giaTri}
                    onChange={(e) => setForm({ ...form, giaTri: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                    min={1}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số tiền
                  </label>
                  <input
                    type="number"
                    value={form.soTien}
                    onChange={(e) => setForm({ ...form, soTien: Number(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {new Intl.NumberFormat('vi-VN').format(form.soTien)}đ
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ghi chú
                </label>
                <textarea
                  value={form.ghiChu}
                  onChange={(e) => setForm({ ...form, ghiChu: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={2}
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false)
                  resetForm()
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleTaoSuKien}
                disabled={!form.nhanVienId || !form.maSuKien}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Thêm sự kiện
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Danh mục Modal */}
      {showDanhMucModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Danh mục Sự kiện</h3>
              <button
                onClick={() => setShowDanhMucModal(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {/* Form thêm danh mục */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium mb-3">Thêm danh mục mới</h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Mã sự kiện"
                    value={danhMucForm.maSuKien}
                    onChange={(e) =>
                      setDanhMucForm({ ...danhMucForm, maSuKien: e.target.value })
                    }
                    className="border rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Tên sự kiện"
                    value={danhMucForm.tenSuKien}
                    onChange={(e) =>
                      setDanhMucForm({ ...danhMucForm, tenSuKien: e.target.value })
                    }
                    className="border rounded px-3 py-2"
                  />
                  <select
                    value={danhMucForm.loai}
                    onChange={(e) =>
                      setDanhMucForm({ ...danhMucForm, loai: e.target.value as LoaiSuKien })
                    }
                    className="border rounded px-3 py-2"
                  >
                    <option value="THUONG">Thưởng</option>
                    <option value="PHAT">Phạt</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Số tiền mặc định"
                    value={danhMucForm.soTienMacDinh || ''}
                    onChange={(e) =>
                      setDanhMucForm({
                        ...danhMucForm,
                        soTienMacDinh: Number(e.target.value),
                      })
                    }
                    className="border rounded px-3 py-2"
                  />
                </div>
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={handleTaoDanhMuc}
                    disabled={!danhMucForm.maSuKien || !danhMucForm.tenSuKien}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    Thêm
                  </button>
                </div>
              </div>

              {/* Danh sách danh mục */}
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left text-sm">Mã</th>
                    <th className="px-3 py-2 text-left text-sm">Tên</th>
                    <th className="px-3 py-2 text-left text-sm">Loại</th>
                    <th className="px-3 py-2 text-right text-sm">Số tiền mặc định</th>
                  </tr>
                </thead>
                <tbody>
                  {danhMucSuKiens.map((dm) => (
                    <tr key={dm.id} className="border-t">
                      <td className="px-3 py-2 font-mono text-sm">{dm.maSuKien}</td>
                      <td className="px-3 py-2">{dm.tenSuKien}</td>
                      <td className="px-3 py-2">
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${
                            LOAI_SU_KIEN_LABELS[dm.loai].color
                          }`}
                        >
                          {LOAI_SU_KIEN_LABELS[dm.loai].label}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right font-mono">
                        {dm.soTienMacDinh
                          ? new Intl.NumberFormat('vi-VN').format(dm.soTienMacDinh) + 'đ'
                          : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
