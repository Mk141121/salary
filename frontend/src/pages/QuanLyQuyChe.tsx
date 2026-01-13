// Trang quản lý Quy chế lương
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  quyCheApi, 
  QuyChe, 
  TrangThaiQuyChe 
} from '../services/ruleEngineApi'
import { phongBanApi } from '../services/api'

// Badge trạng thái
const TrangThaiBadge = ({ trangThai }: { trangThai: TrangThaiQuyChe }) => {
  const config: Record<TrangThaiQuyChe, { bg: string; text: string; label: string }> = {
    NHAP: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Nháp' },
    HIEU_LUC: { bg: 'bg-green-100', text: 'text-green-800', label: 'Hiệu lực' },
    TAM_DUNG: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Tạm dừng' },
    NGUNG: { bg: 'bg-red-100', text: 'text-red-800', label: 'Ngưng' },
  }
  const c = config[trangThai]
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  )
}

interface PhongBan {
  id: number
  maPhongBan: string
  tenPhongBan: string
}

export default function QuanLyQuyChe() {
  const navigate = useNavigate()
  const [quyCheList, setQuyCheList] = useState<QuyChe[]>([])
  const [phongBans, setPhongBans] = useState<PhongBan[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedPhongBan, setSelectedPhongBan] = useState<number | ''>('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    phongBanId: 0,
    tenQuyChe: '',
    moTa: '',
    tuNgay: new Date().toISOString().split('T')[0],
  })

  // Load data
  useEffect(() => {
    loadPhongBans()
    loadQuyChe()
  }, [selectedPhongBan])

  const loadPhongBans = async () => {
    try {
      const data = await phongBanApi.layTatCa()
      setPhongBans(data)
    } catch (error) {
      console.error('Lỗi load phòng ban:', error)
    }
  }

  const loadQuyChe = async () => {
    setLoading(true)
    try {
      const params = selectedPhongBan ? { phongBanId: selectedPhongBan } : {}
      const data = await quyCheApi.layDanhSach(params)
      setQuyCheList(data)
    } catch (error) {
      console.error('Lỗi load quy chế:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTaoQuyChe = async () => {
    if (!form.phongBanId || !form.tenQuyChe || !form.tuNgay) {
      alert('Vui lòng nhập đầy đủ thông tin')
      return
    }

    try {
      await quyCheApi.tao({
        phongBanId: form.phongBanId,
        tenQuyChe: form.tenQuyChe,
        moTa: form.moTa,
        tuNgay: new Date(form.tuNgay),
      })
      setShowModal(false)
      setForm({
        phongBanId: 0,
        tenQuyChe: '',
        moTa: '',
        tuNgay: new Date().toISOString().split('T')[0],
      })
      loadQuyChe()
    } catch (error) {
      console.error('Lỗi tạo quy chế:', error)
      alert('Lỗi tạo quy chế')
    }
  }

  const handleKichHoat = async (id: number) => {
    if (!confirm('Kích hoạt quy chế này? Các quy chế khác cùng phòng ban sẽ bị ngưng.')) {
      return
    }
    try {
      await quyCheApi.kichHoat(id)
      loadQuyChe()
    } catch (error) {
      console.error('Lỗi kích hoạt:', error)
      alert('Lỗi kích hoạt quy chế')
    }
  }

  const handleNgung = async (id: number) => {
    if (!confirm('Ngưng quy chế này?')) {
      return
    }
    try {
      await quyCheApi.ngung(id)
      loadQuyChe()
    } catch (error) {
      console.error('Lỗi ngưng:', error)
      alert('Lỗi ngưng quy chế')
    }
  }

  const handleNhanBan = async (id: number, tenQuyChe: string) => {
    const ten = prompt('Tên quy chế mới:', `${tenQuyChe} (v2)`)
    if (!ten) return

    try {
      const quyChe = await quyCheApi.nhanBan(id, {
        tenQuyChe: ten,
        tuNgay: new Date(),
      })
      navigate(`/quy-che/${quyChe.id}`)
    } catch (error) {
      console.error('Lỗi nhân bản:', error)
      alert('Lỗi nhân bản quy chế')
    }
  }

  const handleXoa = async (id: number) => {
    if (!confirm('Xóa quy chế này? Chỉ có thể xóa quy chế đang ở trạng thái Nháp.')) {
      return
    }
    try {
      await quyCheApi.xoa(id)
      loadQuyChe()
    } catch (error) {
      console.error('Lỗi xóa:', error)
      alert('Không thể xóa quy chế này')
    }
  }

  // Group by phòng ban
  const quyCheByPhongBan = quyCheList.reduce((acc, qc) => {
    const pb = qc.phongBan?.tenPhongBan || 'Khác'
    if (!acc[pb]) acc[pb] = []
    acc[pb].push(qc)
    return acc
  }, {} as Record<string, QuyChe[]>)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Quy chế lương</h1>
          <p className="text-gray-600 mt-1">
            Cấu hình quy chế lương theo phòng ban với các rule tự động
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tạo quy chế mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phòng ban
            </label>
            <select
              value={selectedPhongBan}
              onChange={(e) => setSelectedPhongBan(e.target.value ? Number(e.target.value) : '')}
              className="border rounded-lg px-3 py-2 min-w-[200px]"
            >
              <option value="">Tất cả phòng ban</option>
              {phongBans.map((pb) => (
                <option key={pb.id} value={pb.id}>
                  {pb.tenPhongBan}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      {/* List */}
      {!loading && (
        <div className="space-y-6">
          {Object.entries(quyCheByPhongBan).map(([phongBan, list]) => (
            <div key={phongBan} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h2 className="font-semibold text-gray-900">{phongBan}</h2>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tên quy chế
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Phiên bản
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Số rule
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Từ ngày
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Trạng thái
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {list.map((qc) => (
                    <tr key={qc.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <button
                          onClick={() => navigate(`/quy-che/${qc.id}`)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {qc.tenQuyChe}
                        </button>
                        {qc.moTa && (
                          <p className="text-sm text-gray-500 mt-1">{qc.moTa}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                          v{qc.phienBan}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {qc._count?.rules || 0}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-600">
                        {new Date(qc.tuNgay).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <TrangThaiBadge trangThai={qc.trangThai} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/quy-che/${qc.id}`)}
                            className="p-1 text-gray-400 hover:text-blue-600"
                            title="Cấu hình"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </button>
                          {qc.trangThai === 'NHAP' && (
                            <button
                              onClick={() => handleKichHoat(qc.id)}
                              className="p-1 text-gray-400 hover:text-green-600"
                              title="Kích hoạt"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          )}
                          {qc.trangThai === 'HIEU_LUC' && (
                            <button
                              onClick={() => handleNgung(qc.id)}
                              className="p-1 text-gray-400 hover:text-yellow-600"
                              title="Ngưng"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={() => handleNhanBan(qc.id, qc.tenQuyChe)}
                            className="p-1 text-gray-400 hover:text-purple-600"
                            title="Nhân bản"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                          {qc.trangThai === 'NHAP' && (
                            <button
                              onClick={() => handleXoa(qc.id)}
                              className="p-1 text-gray-400 hover:text-red-600"
                              title="Xóa"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {Object.keys(quyCheByPhongBan).length === 0 && (
            <div className="bg-white rounded-lg shadow p-10 text-center text-gray-500">
              Chưa có quy chế nào. Bấm "Tạo quy chế mới" để bắt đầu.
            </div>
          )}
        </div>
      )}

      {/* Modal tạo quy chế */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Tạo quy chế mới</h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phòng ban <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.phongBanId}
                  onChange={(e) => setForm({ ...form, phongBanId: Number(e.target.value) })}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value={0}>-- Chọn phòng ban --</option>
                  {phongBans.map((pb) => (
                    <option key={pb.id} value={pb.id}>
                      {pb.tenPhongBan}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên quy chế <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.tenQuyChe}
                  onChange={(e) => setForm({ ...form, tenQuyChe: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="VD: Quy chế lương phòng Kho 2026"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  value={form.moTa}
                  onChange={(e) => setForm({ ...form, moTa: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={3}
                  placeholder="Mô tả quy chế..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Áp dụng từ ngày <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={form.tuNgay}
                  onChange={(e) => setForm({ ...form, tuNgay: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleTaoQuyChe}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Tạo quy chế
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
