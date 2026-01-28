// Quản lý KPI Rule Engine - Admin có thể đặt và điều chỉnh rules KPI
import { useState, useEffect } from 'react'
import { 
  kpiRuleEngineApi, 
  NhomQuyTacKPI, 
  QuyTacKPI, 
  BienSoKPI,
  LoaiQuyTacKPI,
  NguonDuLieuKPI,
  ToanTuSoSanh,
  LoaiTinhDiemKPI
} from '../services/kpiApi'

const LOAI_QUY_TAC_LABELS: Record<LoaiQuyTacKPI, { label: string; color: string }> = {
  THUONG: { label: 'Thưởng', color: 'bg-green-100 text-green-700' },
  PHAT: { label: 'Phạt', color: 'bg-red-100 text-red-700' },
  TRUNG_BINH: { label: 'Trung bình', color: 'bg-blue-100 text-blue-700' },
}

const NGUON_DU_LIEU_LABELS: Record<NguonDuLieuKPI, string> = {
  CHAM_CONG: 'Chấm công',
  DOANH_SO: 'Doanh số',
  BANG_LUONG: 'Bảng lương',
  HOP_DONG: 'Hợp đồng',
  NHAP_TAY: 'Nhập tay',
}

const TOAN_TU_LABELS: Record<ToanTuSoSanh, string> = {
  BANG: '=',
  KHAC: '≠',
  LON_HON: '>',
  NHO_HON: '<',
  LON_HON_BANG: '≥',
  NHO_HON_BANG: '≤',
  BETWEEN: 'Từ...đến',
}

const LOAI_TINH_DIEM_LABELS: Record<LoaiTinhDiemKPI, string> = {
  CO_DINH: 'Điểm cố định',
  CONG_THUC: 'Công thức',
  TY_LE: 'Theo tỷ lệ %',
}

export default function KPIRuleEnginePage() {
  const [nhomQuyTacs, setNhomQuyTacs] = useState<NhomQuyTacKPI[]>([])
  const [quyTacs, setQuyTacs] = useState<QuyTacKPI[]>([])
  const [bienSos, setBienSos] = useState<BienSoKPI[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'variables' | 'settings'>('overview')
  const [selectedNhom, setSelectedNhom] = useState<number | null>(null)
  const [selectedQuyTac, setSelectedQuyTac] = useState<QuyTacKPI | null>(null)
  
  // Form states
  const [showNhomForm, setShowNhomForm] = useState(false)
  const [showQuyTacForm, setShowQuyTacForm] = useState(false)
  const [showDieuKienForm, setShowDieuKienForm] = useState(false)
  const [showBienSoForm, setShowBienSoForm] = useState(false)
  
  const [nhomFormData, setNhomFormData] = useState({ maNhom: '', tenNhom: '', moTa: '', thuTu: 0 })
  const [quyTacFormData, setQuyTacFormData] = useState({
    maQuyTac: '',
    tenQuyTac: '',
    moTa: '',
    nhomId: 0,
    loaiQuyTac: 'THUONG' as LoaiQuyTacKPI,
    nguonDuLieu: 'NHAP_TAY' as NguonDuLieuKPI,
    diemToiDa: 100,
    diemMacDinh: 0,
    trongSoMacDinh: 10,
    apDungToanCongTy: true,
  })
  const [dieuKienFormData, setDieuKienFormData] = useState({
    quyTacId: 0,
    thuTu: 1,
    moTaDieuKien: '',
    bienSo: '',
    toanTu: 'BANG' as ToanTuSoSanh,
    giaTriMin: 0,
    giaTriMax: 0,
    loaiTinhDiem: 'CO_DINH' as LoaiTinhDiemKPI,
    diemCoDinh: 0,
    congThuc: '',
  })
  const [bienSoFormData, setBienSoFormData] = useState({
    maBienSo: '',
    tenBienSo: '',
    moTa: '',
    nguonDuLieu: 'NHAP_TAY' as NguonDuLieuKPI,
    donViTinh: '',
  })

  // Statistics
  const [thongKe, setThongKe] = useState({ tongNhom: 0, tongQuyTac: 0, tongBienSo: 0, chiTiet: [] as { nhom: string; soQuyTac: number }[] })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [nhomData, quyTacData, bienSoData, thongKeData] = await Promise.all([
        kpiRuleEngineApi.layDanhSachNhom(),
        kpiRuleEngineApi.layDanhSachQuyTac(),
        kpiRuleEngineApi.layDanhSachBienSo(),
        kpiRuleEngineApi.thongKeQuyTac(),
      ])
      setNhomQuyTacs(nhomData)
      setQuyTacs(quyTacData)
      setBienSos(bienSoData)
      setThongKe(thongKeData)
    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKhoiTaoMau = async () => {
    if (!confirm('Khởi tạo dữ liệu mẫu cho KPI Rule Engine? Hành động này sẽ tạo các nhóm quy tắc, biến số và quy tắc mẫu.')) return
    try {
      await kpiRuleEngineApi.khoiTaoDuLieuMau()
      loadData()
      alert('Đã khởi tạo dữ liệu mẫu thành công!')
    } catch (error) {
      console.error('Lỗi khởi tạo:', error)
      alert('Lỗi khởi tạo dữ liệu mẫu')
    }
  }

  // ============================================
  // HANDLERS
  // ============================================

  const handleSubmitNhom = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await kpiRuleEngineApi.taoNhomQuyTac(nhomFormData)
      setShowNhomForm(false)
      setNhomFormData({ maNhom: '', tenNhom: '', moTa: '', thuTu: 0 })
      loadData()
    } catch (error) {
      console.error('Lỗi tạo nhóm:', error)
      alert('Lỗi tạo nhóm quy tắc')
    }
  }

  const handleSubmitQuyTac = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await kpiRuleEngineApi.taoQuyTac(quyTacFormData)
      setShowQuyTacForm(false)
      setQuyTacFormData({
        maQuyTac: '',
        tenQuyTac: '',
        moTa: '',
        nhomId: 0,
        loaiQuyTac: 'THUONG',
        nguonDuLieu: 'NHAP_TAY',
        diemToiDa: 100,
        diemMacDinh: 0,
        trongSoMacDinh: 10,
        apDungToanCongTy: true,
      })
      loadData()
    } catch (error) {
      console.error('Lỗi tạo quy tắc:', error)
      alert('Lỗi tạo quy tắc KPI')
    }
  }

  const handleSubmitDieuKien = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await kpiRuleEngineApi.themDieuKien(dieuKienFormData)
      setShowDieuKienForm(false)
      setDieuKienFormData({
        quyTacId: 0,
        thuTu: 1,
        moTaDieuKien: '',
        bienSo: '',
        toanTu: 'BANG',
        giaTriMin: 0,
        giaTriMax: 0,
        loaiTinhDiem: 'CO_DINH',
        diemCoDinh: 0,
        congThuc: '',
      })
      loadData()
      // Refresh selected rule
      if (selectedQuyTac) {
        const updated = await kpiRuleEngineApi.layQuyTacTheoId(selectedQuyTac.id)
        setSelectedQuyTac(updated)
      }
    } catch (error) {
      console.error('Lỗi thêm điều kiện:', error)
      alert('Lỗi thêm điều kiện')
    }
  }

  const handleSubmitBienSo = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await kpiRuleEngineApi.taoBienSo(bienSoFormData)
      setShowBienSoForm(false)
      setBienSoFormData({
        maBienSo: '',
        tenBienSo: '',
        moTa: '',
        nguonDuLieu: 'NHAP_TAY',
        donViTinh: '',
      })
      loadData()
    } catch (error) {
      console.error('Lỗi tạo biến số:', error)
      alert('Lỗi tạo biến số')
    }
  }

  const handleDeleteQuyTac = async (id: number) => {
    if (!confirm('Xác nhận xóa quy tắc này?')) return
    try {
      await kpiRuleEngineApi.xoaQuyTac(id)
      loadData()
      if (selectedQuyTac?.id === id) {
        setSelectedQuyTac(null)
      }
    } catch (error) {
      console.error('Lỗi xóa quy tắc:', error)
    }
  }

  const handleDeleteDieuKien = async (id: number) => {
    if (!confirm('Xác nhận xóa điều kiện này?')) return
    try {
      await kpiRuleEngineApi.xoaDieuKien(id)
      if (selectedQuyTac) {
        const updated = await kpiRuleEngineApi.layQuyTacTheoId(selectedQuyTac.id)
        setSelectedQuyTac(updated)
      }
    } catch (error) {
      console.error('Lỗi xóa điều kiện:', error)
    }
  }

  // ============================================
  // RENDER
  // ============================================

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">KPI Rule Engine</h1>
          <p className="text-gray-500 mt-1">Quản lý quy tắc đánh giá KPI linh hoạt</p>
        </div>
        <button
          onClick={handleKhoiTaoMau}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Khởi tạo mẫu
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Nhóm quy tắc</p>
          <p className="text-3xl font-bold text-purple-600">{thongKe.tongNhom}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Quy tắc KPI</p>
          <p className="text-3xl font-bold text-blue-600">{thongKe.tongQuyTac}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Biến số</p>
          <p className="text-3xl font-bold text-green-600">{thongKe.tongBienSo}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Điều kiện</p>
          <p className="text-3xl font-bold text-amber-600">
            {quyTacs.reduce((sum, qt) => sum + (qt.dieuKienQuyTacs?.length || 0), 0)}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'overview', label: 'Tổng quan' },
            { key: 'rules', label: 'Quy tắc KPI' },
            { key: 'variables', label: 'Biến số' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Nhóm quy tắc */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Nhóm quy tắc</h2>
              <button
                onClick={() => setShowNhomForm(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Thêm nhóm
              </button>
            </div>
            <div className="divide-y">
              {nhomQuyTacs.map((nhom) => (
                <div
                  key={nhom.id}
                  className={`px-6 py-4 cursor-pointer hover:bg-gray-50 ${selectedNhom === nhom.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedNhom(selectedNhom === nhom.id ? null : nhom.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{nhom.tenNhom}</p>
                      <p className="text-sm text-gray-500">{nhom.maNhom}</p>
                    </div>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {nhom.quyTacKPIs?.length || 0} quy tắc
                    </span>
                  </div>
                  {nhom.moTa && (
                    <p className="text-sm text-gray-500 mt-2">{nhom.moTa}</p>
                  )}
                </div>
              ))}
              {nhomQuyTacs.length === 0 && (
                <div className="px-6 py-8 text-center text-gray-500">
                  Chưa có nhóm quy tắc nào. Hãy thêm mới hoặc khởi tạo mẫu.
                </div>
              )}
            </div>
          </div>

          {/* Thống kê theo nhóm */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Phân bố quy tắc</h2>
            </div>
            <div className="p-6">
              {thongKe.chiTiet.map((item, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{item.nhom}</span>
                    <span className="text-gray-500">{item.soQuyTac} quy tắc</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min(100, (item.soQuyTac / Math.max(1, thongKe.tongQuyTac)) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              {thongKe.chiTiet.length === 0 && (
                <p className="text-center text-gray-500">Chưa có dữ liệu</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Danh sách quy tắc */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Quy tắc KPI</h2>
              <button
                onClick={() => {
                  setQuyTacFormData({
                    ...quyTacFormData,
                    nhomId: nhomQuyTacs[0]?.id || 0,
                  })
                  setShowQuyTacForm(true)
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
              >
                + Thêm
              </button>
            </div>
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {quyTacs.map((qt) => (
                <div
                  key={qt.id}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${selectedQuyTac?.id === qt.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                  onClick={() => setSelectedQuyTac(qt)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{qt.tenQuyTac}</p>
                      <p className="text-xs text-gray-500 mt-1">{qt.maQuyTac}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${LOAI_QUY_TAC_LABELS[qt.loaiQuyTac].color}`}>
                      {LOAI_QUY_TAC_LABELS[qt.loaiQuyTac].label}
                    </span>
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>Trọng số: {Number(qt.trongSoMacDinh)}%</span>
                    <span>Điểm tối đa: {Number(qt.diemToiDa)}</span>
                  </div>
                </div>
              ))}
              {quyTacs.length === 0 && (
                <div className="px-6 py-8 text-center text-gray-500">
                  Chưa có quy tắc nào
                </div>
              )}
            </div>
          </div>

          {/* Chi tiết quy tắc */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            {selectedQuyTac ? (
              <>
                <div className="px-6 py-4 border-b flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold">{selectedQuyTac.tenQuyTac}</h2>
                    <p className="text-sm text-gray-500">{selectedQuyTac.maQuyTac}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteQuyTac(selectedQuyTac.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Xóa
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Thông tin cơ bản */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">Loại quy tắc</p>
                      <p className={`font-medium ${LOAI_QUY_TAC_LABELS[selectedQuyTac.loaiQuyTac].color.replace('bg-', 'text-').replace('-100', '-700')}`}>
                        {LOAI_QUY_TAC_LABELS[selectedQuyTac.loaiQuyTac].label}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">Nguồn dữ liệu</p>
                      <p className="font-medium">{NGUON_DU_LIEU_LABELS[selectedQuyTac.nguonDuLieu]}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">Điểm tối đa</p>
                      <p className="font-medium">{Number(selectedQuyTac.diemToiDa)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">Trọng số</p>
                      <p className="font-medium">{Number(selectedQuyTac.trongSoMacDinh)}%</p>
                    </div>
                  </div>

                  {selectedQuyTac.moTa && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-blue-800">{selectedQuyTac.moTa}</p>
                    </div>
                  )}

                  {/* Điều kiện */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-gray-900">Điều kiện tính điểm</h3>
                      <button
                        onClick={() => {
                          setDieuKienFormData({
                            ...dieuKienFormData,
                            quyTacId: selectedQuyTac.id,
                            thuTu: (selectedQuyTac.dieuKienQuyTacs?.length || 0) + 1,
                          })
                          setShowDieuKienForm(true)
                        }}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        + Thêm điều kiện
                      </button>
                    </div>

                    <div className="space-y-3">
                      {selectedQuyTac.dieuKienQuyTacs?.map((dk, idx) => (
                        <div key={dk.id} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                                {idx + 1}
                              </span>
                              <div>
                                <p className="font-medium text-gray-900">{dk.moTaDieuKien}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                  {dk.bienSo} {TOAN_TU_LABELS[dk.toanTu]} {dk.giaTriMin}
                                  {dk.toanTu === 'BETWEEN' && ` - ${dk.giaTriMax}`}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">{LOAI_TINH_DIEM_LABELS[dk.loaiTinhDiem]}</p>
                              <p className="font-bold text-lg text-blue-600">
                                {dk.loaiTinhDiem === 'CO_DINH' ? `${dk.diemCoDinh} điểm` : 
                                 dk.loaiTinhDiem === 'TY_LE' ? 'Theo %' : 
                                 dk.congThuc}
                              </p>
                              <button
                                onClick={() => handleDeleteDieuKien(dk.id)}
                                className="text-red-500 hover:text-red-600 text-xs mt-1"
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {(!selectedQuyTac.dieuKienQuyTacs || selectedQuyTac.dieuKienQuyTacs.length === 0) && (
                        <p className="text-center text-gray-500 py-4">Chưa có điều kiện nào</p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-96 text-gray-500">
                Chọn một quy tắc để xem chi tiết
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'variables' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Biến số KPI</h2>
            <button
              onClick={() => setShowBienSoForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              + Thêm biến số
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã biến số</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên biến số</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nguồn dữ liệu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đơn vị</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mô tả</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bienSos.map((bs) => (
                  <tr key={bs.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">{bs.maBienSo}</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{bs.tenBienSo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        bs.nguonDuLieu === 'CHAM_CONG' ? 'bg-blue-100 text-blue-700' :
                        bs.nguonDuLieu === 'DOANH_SO' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {NGUON_DU_LIEU_LABELS[bs.nguonDuLieu]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{bs.donViTinh || '-'}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{bs.moTa || '-'}</td>
                  </tr>
                ))}
                {bienSos.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      Chưa có biến số nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* MODALS */}
      {/* ============================================ */}

      {/* Modal Nhóm quy tắc */}
      {showNhomForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Thêm nhóm quy tắc</h3>
            <form onSubmit={handleSubmitNhom} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mã nhóm</label>
                <input
                  type="text"
                  value={nhomFormData.maNhom}
                  onChange={(e) => setNhomFormData({ ...nhomFormData, maNhom: e.target.value.toUpperCase() })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="VD: CHAM_CONG"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên nhóm</label>
                <input
                  type="text"
                  value={nhomFormData.tenNhom}
                  onChange={(e) => setNhomFormData({ ...nhomFormData, tenNhom: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="VD: Chấm công & Kỷ luật"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  value={nhomFormData.moTa}
                  onChange={(e) => setNhomFormData({ ...nhomFormData, moTa: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={2}
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNhomForm(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Tạo nhóm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Quy tắc */}
      {showQuyTacForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Thêm quy tắc KPI</h3>
            <form onSubmit={handleSubmitQuyTac} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mã quy tắc</label>
                  <input
                    type="text"
                    value={quyTacFormData.maQuyTac}
                    onChange={(e) => setQuyTacFormData({ ...quyTacFormData, maQuyTac: e.target.value.toUpperCase() })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="VD: DI_MUON"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nhóm quy tắc</label>
                  <select
                    value={quyTacFormData.nhomId}
                    onChange={(e) => setQuyTacFormData({ ...quyTacFormData, nhomId: parseInt(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  >
                    <option value="">-- Chọn nhóm --</option>
                    {nhomQuyTacs.map((nhom) => (
                      <option key={nhom.id} value={nhom.id}>{nhom.tenNhom}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên quy tắc</label>
                <input
                  type="text"
                  value={quyTacFormData.tenQuyTac}
                  onChange={(e) => setQuyTacFormData({ ...quyTacFormData, tenQuyTac: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="VD: Đi làm đúng giờ"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  value={quyTacFormData.moTa}
                  onChange={(e) => setQuyTacFormData({ ...quyTacFormData, moTa: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại quy tắc</label>
                  <select
                    value={quyTacFormData.loaiQuyTac}
                    onChange={(e) => setQuyTacFormData({ ...quyTacFormData, loaiQuyTac: e.target.value as LoaiQuyTacKPI })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    {Object.entries(LOAI_QUY_TAC_LABELS).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nguồn dữ liệu</label>
                  <select
                    value={quyTacFormData.nguonDuLieu}
                    onChange={(e) => setQuyTacFormData({ ...quyTacFormData, nguonDuLieu: e.target.value as NguonDuLieuKPI })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    {Object.entries(NGUON_DU_LIEU_LABELS).map(([key, val]) => (
                      <option key={key} value={key}>{val}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Điểm tối đa</label>
                  <input
                    type="number"
                    value={quyTacFormData.diemToiDa}
                    onChange={(e) => setQuyTacFormData({ ...quyTacFormData, diemToiDa: parseFloat(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                    min={0}
                    max={100}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Điểm mặc định</label>
                  <input
                    type="number"
                    value={quyTacFormData.diemMacDinh}
                    onChange={(e) => setQuyTacFormData({ ...quyTacFormData, diemMacDinh: parseFloat(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                    min={0}
                    max={100}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trọng số (%)</label>
                  <input
                    type="number"
                    value={quyTacFormData.trongSoMacDinh}
                    onChange={(e) => setQuyTacFormData({ ...quyTacFormData, trongSoMacDinh: parseFloat(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                    min={0}
                    max={100}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowQuyTacForm(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Tạo quy tắc
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Điều kiện */}
      {showDieuKienForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Thêm điều kiện tính điểm</h3>
            <form onSubmit={handleSubmitDieuKien} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả điều kiện</label>
                <input
                  type="text"
                  value={dieuKienFormData.moTaDieuKien}
                  onChange={(e) => setDieuKienFormData({ ...dieuKienFormData, moTaDieuKien: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="VD: Đi muộn 1-3 lần"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Biến số</label>
                  <select
                    value={dieuKienFormData.bienSo}
                    onChange={(e) => setDieuKienFormData({ ...dieuKienFormData, bienSo: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  >
                    <option value="">-- Chọn biến số --</option>
                    {bienSos.map((bs) => (
                      <option key={bs.id} value={bs.maBienSo}>{bs.tenBienSo} ({bs.maBienSo})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Toán tử</label>
                  <select
                    value={dieuKienFormData.toanTu}
                    onChange={(e) => setDieuKienFormData({ ...dieuKienFormData, toanTu: e.target.value as ToanTuSoSanh })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    {Object.entries(TOAN_TU_LABELS).map(([key, val]) => (
                      <option key={key} value={key}>{val}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá trị min</label>
                  <input
                    type="number"
                    value={dieuKienFormData.giaTriMin}
                    onChange={(e) => setDieuKienFormData({ ...dieuKienFormData, giaTriMin: parseFloat(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                {dieuKienFormData.toanTu === 'BETWEEN' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá trị max</label>
                    <input
                      type="number"
                      value={dieuKienFormData.giaTriMax}
                      onChange={(e) => setDieuKienFormData({ ...dieuKienFormData, giaTriMax: parseFloat(e.target.value) })}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại tính điểm</label>
                  <select
                    value={dieuKienFormData.loaiTinhDiem}
                    onChange={(e) => setDieuKienFormData({ ...dieuKienFormData, loaiTinhDiem: e.target.value as LoaiTinhDiemKPI })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    {Object.entries(LOAI_TINH_DIEM_LABELS).map(([key, val]) => (
                      <option key={key} value={key}>{val}</option>
                    ))}
                  </select>
                </div>
                {dieuKienFormData.loaiTinhDiem === 'CO_DINH' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Điểm cố định</label>
                    <input
                      type="number"
                      value={dieuKienFormData.diemCoDinh}
                      onChange={(e) => setDieuKienFormData({ ...dieuKienFormData, diemCoDinh: parseFloat(e.target.value) })}
                      className="w-full border rounded-lg px-3 py-2"
                      min={0}
                      max={100}
                    />
                  </div>
                )}
                {dieuKienFormData.loaiTinhDiem === 'CONG_THUC' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Công thức</label>
                    <input
                      type="text"
                      value={dieuKienFormData.congThuc}
                      onChange={(e) => setDieuKienFormData({ ...dieuKienFormData, congThuc: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="100 - (x * 5)"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowDieuKienForm(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Thêm điều kiện
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Biến số */}
      {showBienSoForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Thêm biến số KPI</h3>
            <form onSubmit={handleSubmitBienSo} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mã biến số</label>
                <input
                  type="text"
                  value={bienSoFormData.maBienSo}
                  onChange={(e) => setBienSoFormData({ ...bienSoFormData, maBienSo: e.target.value.toUpperCase() })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="VD: SO_LAN_DI_MUON"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên biến số</label>
                <input
                  type="text"
                  value={bienSoFormData.tenBienSo}
                  onChange={(e) => setBienSoFormData({ ...bienSoFormData, tenBienSo: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="VD: Số lần đi muộn"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nguồn dữ liệu</label>
                  <select
                    value={bienSoFormData.nguonDuLieu}
                    onChange={(e) => setBienSoFormData({ ...bienSoFormData, nguonDuLieu: e.target.value as NguonDuLieuKPI })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    {Object.entries(NGUON_DU_LIEU_LABELS).map(([key, val]) => (
                      <option key={key} value={key}>{val}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Đơn vị</label>
                  <input
                    type="text"
                    value={bienSoFormData.donViTinh}
                    onChange={(e) => setBienSoFormData({ ...bienSoFormData, donViTinh: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="VD: lần, %, VNĐ"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  value={bienSoFormData.moTa}
                  onChange={(e) => setBienSoFormData({ ...bienSoFormData, moTa: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={2}
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBienSoForm(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Tạo biến số
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
