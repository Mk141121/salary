// Trang chi tiết Quy chế lương - Cấu hình Rules với Drag-Drop
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  quyCheApi,
  quyCheRuleApi,
  QuyChe,
  QuyCheRule,
  LoaiRule,
  CheDoGop,
  CongThucJson,
  DieuKienJson,
  KetQuaPreview,
} from '../services/ruleEngineApi'
import { khoanLuongApi } from '../services/api'
import TroLyAiDrawer from '../components/TroLyAiDrawer'

// Loại rule labels
const LOAI_RULE_LABELS: Record<LoaiRule, string> = {
  CO_DINH: 'Cố định',
  THEO_HE_SO: 'Theo hệ số',
  BAC_THANG: 'Bậc thang',
  THEO_SU_KIEN: 'Theo sự kiện',
  CONG_THUC: 'Công thức',
}

const LOAI_RULE_COLORS: Record<LoaiRule, string> = {
  CO_DINH: 'bg-blue-100 text-blue-800',
  THEO_HE_SO: 'bg-green-100 text-green-800',
  BAC_THANG: 'bg-purple-100 text-purple-800',
  THEO_SU_KIEN: 'bg-orange-100 text-orange-800',
  CONG_THUC: 'bg-pink-100 text-pink-800',
}

interface KhoanLuong {
  id: number
  maKhoan: string
  tenKhoan: string
  loai: 'THU_NHAP' | 'KHAU_TRU'
}

// RuleCard Component
const RuleCard = ({
  rule,
  index,
  isSelected,
  onSelect,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
}: {
  rule: QuyCheRule
  index: number
  isSelected: boolean
  onSelect: () => void
  onDragStart: () => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: () => void
  isDragging: boolean
}) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onSelect}
      className={`
        p-3 rounded-lg border-2 cursor-pointer transition-all
        ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Drag handle */}
        <div className="cursor-grab text-gray-400 hover:text-gray-600 mt-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
          </svg>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-gray-500">
              #{index + 1}
            </span>
            <span className={`px-2 py-0.5 text-xs rounded ${LOAI_RULE_COLORS[rule.loaiRule]}`}>
              {LOAI_RULE_LABELS[rule.loaiRule]}
            </span>
          </div>
          
          <h4 className="font-medium text-gray-900 truncate">{rule.tenRule}</h4>
          
          <p className="text-sm text-gray-500 truncate mt-1">
            {rule.khoanLuong?.tenKhoan}
          </p>
        </div>
        
        {/* Status indicator */}
        <div className={`w-2 h-2 rounded-full mt-2 ${rule.trangThai ? 'bg-green-500' : 'bg-gray-300'}`} />
      </div>
    </div>
  )
}

// Form Builder Components
const CongThucCoDinhForm = ({
  value,
  onChange,
}: {
  value: { soTien?: number }
  onChange: (v: { soTien: number }) => void
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Số tiền cố định
    </label>
    <input
      type="number"
      value={value.soTien || ''}
      onChange={(e) => onChange({ soTien: Number(e.target.value) })}
      className="w-full border rounded-lg px-3 py-2"
      placeholder="1000000"
    />
    <p className="text-xs text-gray-500 mt-1">
      {value.soTien ? new Intl.NumberFormat('vi-VN').format(value.soTien) + 'đ' : ''}
    </p>
  </div>
)

const CongThucHeSoForm = ({
  value,
  onChange,
}: {
  value: { base?: string; heSo?: number; congThem?: number }
  onChange: (v: { base: string; heSo: number; congThem?: number }) => void
}) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Base (nguồn tính)
      </label>
      <select
        value={value.base || ''}
        onChange={(e) => onChange({ ...value, base: e.target.value, heSo: value.heSo || 1 })}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">-- Chọn --</option>
        <option value="LUONG_CO_BAN">Lương cơ bản</option>
        <option value="HE_SO_TRACH_NHIEM">Hệ số trách nhiệm</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Hệ số
      </label>
      <input
        type="number"
        step="0.01"
        value={value.heSo || ''}
        onChange={(e) => onChange({ ...value, base: value.base || 'LUONG_CO_BAN', heSo: Number(e.target.value) })}
        className="w-full border rounded-lg px-3 py-2"
        placeholder="0.2"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Cộng thêm (tùy chọn)
      </label>
      <input
        type="number"
        value={value.congThem || ''}
        onChange={(e) => onChange({ ...value, base: value.base || 'LUONG_CO_BAN', heSo: value.heSo || 1, congThem: Number(e.target.value) || undefined })}
        className="w-full border rounded-lg px-3 py-2"
        placeholder="200000"
      />
    </div>
  </div>
)

const CongThucBacThangForm = ({
  value,
  onChange,
}: {
  value: { field?: string; bac?: { from: number; to: number; soTien?: number }[] }
  onChange: (v: { field: string; bac: { from: number; to: number; soTien?: number }[] }) => void
}) => {
  const bac = value.bac || [{ from: 1, to: 1, soTien: 0 }]

  const themBac = () => {
    const lastBac = bac[bac.length - 1]
    onChange({
      field: value.field || 'cap_trach_nhiem',
      bac: [...bac, { from: (lastBac?.to || 0) + 1, to: (lastBac?.to || 0) + 1, soTien: 0 }],
    })
  }

  const xoaBac = (index: number) => {
    if (bac.length <= 1) return
    onChange({
      field: value.field || 'cap_trach_nhiem',
      bac: bac.filter((_, i) => i !== index),
    })
  }

  const capNhatBac = (index: number, updates: Partial<{ from: number; to: number; soTien: number }>) => {
    onChange({
      field: value.field || 'cap_trach_nhiem',
      bac: bac.map((b, i) => (i === index ? { ...b, ...updates } : b)),
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Trường dữ liệu
        </label>
        <select
          value={value.field || ''}
          onChange={(e) => onChange({ ...value, field: e.target.value, bac })}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">-- Chọn --</option>
          <option value="cap_trach_nhiem">Cấp trách nhiệm</option>
          <option value="he_so_trach_nhiem">Hệ số trách nhiệm</option>
        </select>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Bậc thang
          </label>
          <button
            type="button"
            onClick={themBac}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            + Thêm bậc
          </button>
        </div>

        <div className="space-y-2">
          {bac.map((b, i) => (
            <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <span className="text-sm text-gray-500 w-16">Bậc {i + 1}</span>
              <input
                type="number"
                value={b.from}
                onChange={(e) => capNhatBac(i, { from: Number(e.target.value) })}
                className="w-20 border rounded px-2 py-1 text-sm"
                placeholder="Từ"
              />
              <span className="text-gray-400">→</span>
              <input
                type="number"
                value={b.to}
                onChange={(e) => capNhatBac(i, { to: Number(e.target.value) })}
                className="w-20 border rounded px-2 py-1 text-sm"
                placeholder="Đến"
              />
              <input
                type="number"
                value={b.soTien || ''}
                onChange={(e) => capNhatBac(i, { soTien: Number(e.target.value) })}
                className="flex-1 border rounded px-2 py-1 text-sm"
                placeholder="Số tiền"
              />
              {bac.length > 1 && (
                <button
                  type="button"
                  onClick={() => xoaBac(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const CongThucBieuThucForm = ({
  value,
  onChange,
}: {
  value: { bieuThuc?: string }
  onChange: (v: { bieuThuc: string }) => void
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Biểu thức công thức
    </label>
    <textarea
      value={value.bieuThuc || ''}
      onChange={(e) => onChange({ bieuThuc: e.target.value })}
      className="w-full border rounded-lg px-3 py-2 font-mono text-sm"
      rows={3}
      placeholder="LUONG_CO_BAN * HE_SO_TRACH_NHIEM + 200000"
    />
    <p className="text-xs text-gray-500 mt-1">
      Biến cho phép: LUONG_CO_BAN, HE_SO_TRACH_NHIEM, CAP_TRACH_NHIEM, CONG_CHUAN, CONG_THUC_TE, ...
    </p>
  </div>
)

export default function ChiTietQuyChe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quyChe, setQuyChe] = useState<QuyChe | null>(null)
  const [rules, setRules] = useState<QuyCheRule[]>([])
  const [khoanLuongs, setKhoanLuongs] = useState<KhoanLuong[]>([])
  const [selectedRule, setSelectedRule] = useState<QuyCheRule | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showTroLyAi, setShowTroLyAi] = useState(false)
  const [previewResult, setPreviewResult] = useState<KetQuaPreview | null>(null)
  const [activeTab, setActiveTab] = useState<'thongtin' | 'dieukien' | 'congthuc' | 'preview'>('thongtin')

  // Form state cho rule đang chọn
  const [ruleForm, setRuleForm] = useState<{
    tenRule: string
    moTa: string
    khoanLuongId: number
    loaiRule: LoaiRule
    congThucJson: CongThucJson
    dieuKienJson: DieuKienJson
    cheDoGop: CheDoGop
    choPhepChinhTay: boolean
  }>({
    tenRule: '',
    moTa: '',
    khoanLuongId: 0,
    loaiRule: 'CO_DINH',
    congThucJson: { soTien: 0 },
    dieuKienJson: {},
    cheDoGop: 'GHI_DE',
    choPhepChinhTay: true,
  })

  // Load data
  useEffect(() => {
    if (id) {
      loadData()
    }
  }, [id])

  const loadData = async () => {
    setLoading(true)
    try {
      const [qc, kl] = await Promise.all([
        quyCheApi.layChiTiet(Number(id)),
        khoanLuongApi.layTatCa(),
      ])
      setQuyChe(qc)
      setRules(qc.rules || [])
      setKhoanLuongs(kl)
      
      if (qc.rules && qc.rules.length > 0) {
        handleSelectRule(qc.rules[0])
      }
    } catch (error) {
      console.error('Lỗi load dữ liệu:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectRule = (rule: QuyCheRule) => {
    setSelectedRule(rule)
    setRuleForm({
      tenRule: rule.tenRule,
      moTa: rule.moTa || '',
      khoanLuongId: rule.khoanLuongId,
      loaiRule: rule.loaiRule,
      congThucJson: JSON.parse(rule.congThucJson) as CongThucJson,
      dieuKienJson: rule.dieuKienJson ? JSON.parse(rule.dieuKienJson) : {},
      cheDoGop: rule.cheDoGop,
      choPhepChinhTay: rule.choPhepChinhTay,
    })
    setActiveTab('thongtin')
    setPreviewResult(null)
  }

  // Drag & Drop handlers
  const handleDragStart = (index: number) => {
    setDragIndex(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (dropIndex: number) => {
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null)
      return
    }

    // Reorder locally
    const newRules = [...rules]
    const [draggedRule] = newRules.splice(dragIndex, 1)
    newRules.splice(dropIndex, 0, draggedRule)
    setRules(newRules)
    setDragIndex(null)

    // Save to server
    try {
      await quyCheApi.sapXepRules(
        Number(id),
        newRules.map((r) => r.id)
      )
    } catch (error) {
      console.error('Lỗi sắp xếp:', error)
      loadData() // Rollback
    }
  }

  // Save rule
  const handleSaveRule = async () => {
    if (!selectedRule) return

    setSaving(true)
    try {
      await quyCheRuleApi.capNhat(selectedRule.id, {
        tenRule: ruleForm.tenRule,
        moTa: ruleForm.moTa,
        loaiRule: ruleForm.loaiRule,
        congThucJson: ruleForm.congThucJson,
        dieuKienJson: ruleForm.dieuKienJson,
        cheDoGop: ruleForm.cheDoGop,
        choPhepChinhTay: ruleForm.choPhepChinhTay,
      })
      
      loadData()
    } catch (error: unknown) {
      console.error('Lỗi lưu rule:', error)
      const err = error as { response?: { data?: { loi?: string[] } } }
      alert(err.response?.data?.loi?.join('\n') || 'Lỗi lưu rule')
    } finally {
      setSaving(false)
    }
  }

  // Delete rule
  const handleDeleteRule = async () => {
    if (!selectedRule) return
    if (!confirm('Xóa rule này?')) return

    try {
      await quyCheRuleApi.xoa(selectedRule.id)
      setSelectedRule(null)
      loadData()
    } catch (error) {
      console.error('Lỗi xóa:', error)
      alert('Không thể xóa rule này')
    }
  }

  // Preview
  const handlePreview = async () => {
    if (!id) return

    try {
      const result = await quyCheRuleApi.preview({
        quyCheId: Number(id),
        duLieuGiaLap: {
          LUONG_CO_BAN: 10000000,
          CAP_TRACH_NHIEM: 2,
          HE_SO_TRACH_NHIEM: 1.2,
        },
      })
      setPreviewResult(result)
      setActiveTab('preview')
    } catch (error) {
      console.error('Lỗi preview:', error)
      alert('Lỗi chạy thử')
    }
  }

  // Add rule
  const handleAddRule = async (data: {
    khoanLuongId: number
    tenRule: string
    loaiRule: LoaiRule
  }) => {
    try {
      let congThucJson: CongThucJson = { soTien: 0 }
      if (data.loaiRule === 'THEO_HE_SO') {
        congThucJson = { base: 'LUONG_CO_BAN', heSo: 0.1 }
      } else if (data.loaiRule === 'BAC_THANG') {
        congThucJson = { field: 'cap_trach_nhiem', bac: [{ from: 1, to: 1, soTien: 500000 }] }
      } else if (data.loaiRule === 'CONG_THUC') {
        congThucJson = { bieuThuc: 'LUONG_CO_BAN * 0.1' }
      }

      await quyCheApi.taoRule(Number(id), {
        khoanLuongId: data.khoanLuongId,
        tenRule: data.tenRule,
        loaiRule: data.loaiRule,
        congThucJson,
      })
      setShowAddModal(false)
      loadData()
    } catch (error) {
      console.error('Lỗi thêm rule:', error)
      alert('Lỗi thêm rule')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!quyChe) {
    return (
      <div className="p-6 text-center text-gray-500">
        Không tìm thấy quy chế
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/quy-che')}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold">{quyChe.tenQuyChe}</h1>
              <p className="text-sm text-gray-500">
                {quyChe.phongBan?.tenPhongBan} • Phiên bản {quyChe.phienBan}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {!quyChe.coDuocSua && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                ⚠️ Quy chế đã khoá
              </span>
            )}
            <button
              onClick={handlePreview}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Chạy thử
            </button>
            <button
              onClick={() => setShowTroLyAi(true)}
              disabled={!quyChe.coDuocSua}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 12 2z" />
                <path d="M9 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                <path d="M15 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
              Trợ lý AI
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              disabled={!quyChe.coDuocSua}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              + Thêm rule
            </button>
          </div>
        </div>
      </div>

      {/* Main content - 2 columns */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Rule list */}
        <div className="w-80 border-r bg-gray-50 flex flex-col">
          <div className="p-4 border-b bg-white">
            <h3 className="font-semibold text-gray-900">
              Danh sách Rule ({rules.length})
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Kéo thả để sắp xếp thứ tự ưu tiên
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {rules.map((rule, index) => (
              <RuleCard
                key={rule.id}
                rule={rule}
                index={index}
                isSelected={selectedRule?.id === rule.id}
                onSelect={() => handleSelectRule(rule)}
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                isDragging={dragIndex === index}
              />
            ))}

            {rules.length === 0 && (
              <div className="text-center text-gray-500 py-10">
                Chưa có rule nào.
                <br />
                <button
                  onClick={() => setShowAddModal(true)}
                  className="text-blue-600 hover:underline mt-2"
                >
                  Thêm rule đầu tiên
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Rule detail form */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          {selectedRule ? (
            <>
              {/* Tabs */}
              <div className="border-b">
                <nav className="flex px-6">
                  {(['thongtin', 'dieukien', 'congthuc', 'preview'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {{
                        thongtin: 'Thông tin',
                        dieukien: 'Điều kiện',
                        congthuc: 'Cách tính',
                        preview: 'Xem thử',
                      }[tab]}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'thongtin' && (
                  <div className="space-y-4 max-w-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tên rule
                      </label>
                      <input
                        type="text"
                        value={ruleForm.tenRule}
                        onChange={(e) => setRuleForm({ ...ruleForm, tenRule: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2"
                        disabled={!quyChe.coDuocSua}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Khoản lương
                      </label>
                      <select
                        value={ruleForm.khoanLuongId}
                        onChange={(e) => setRuleForm({ ...ruleForm, khoanLuongId: Number(e.target.value) })}
                        className="w-full border rounded-lg px-3 py-2"
                        disabled={!quyChe.coDuocSua}
                      >
                        {khoanLuongs.map((kl) => (
                          <option key={kl.id} value={kl.id}>
                            {kl.tenKhoan} ({kl.loai === 'THU_NHAP' ? '+' : '-'})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Loại rule
                      </label>
                      <select
                        value={ruleForm.loaiRule}
                        onChange={(e) => setRuleForm({ ...ruleForm, loaiRule: e.target.value as LoaiRule })}
                        className="w-full border rounded-lg px-3 py-2"
                        disabled={!quyChe.coDuocSua}
                      >
                        {Object.entries(LOAI_RULE_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mô tả
                      </label>
                      <textarea
                        value={ruleForm.moTa}
                        onChange={(e) => setRuleForm({ ...ruleForm, moTa: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2"
                        rows={3}
                        disabled={!quyChe.coDuocSua}
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={ruleForm.choPhepChinhTay}
                          onChange={(e) => setRuleForm({ ...ruleForm, choPhepChinhTay: e.target.checked })}
                          disabled={!quyChe.coDuocSua}
                        />
                        <span className="text-sm">Cho phép chỉnh tay</span>
                      </label>

                      <div className="flex items-center gap-2">
                        <span className="text-sm">Chế độ gộp:</span>
                        <select
                          value={ruleForm.cheDoGop}
                          onChange={(e) => setRuleForm({ ...ruleForm, cheDoGop: e.target.value as CheDoGop })}
                          className="border rounded px-2 py-1 text-sm"
                          disabled={!quyChe.coDuocSua}
                        >
                          <option value="GHI_DE">Ghi đè</option>
                          <option value="CONG_DON">Cộng dồn</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'dieukien' && (
                  <div className="max-w-lg space-y-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Điều kiện áp dụng rule. Để trống = áp dụng cho tất cả nhân viên.
                    </p>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vai trò
                      </label>
                      <input
                        type="text"
                        value={(ruleForm.dieuKienJson?.apDungCho?.vaiTro || []).join(', ')}
                        onChange={(e) => setRuleForm({
                          ...ruleForm,
                          dieuKienJson: {
                            apDungCho: {
                              ...ruleForm.dieuKienJson?.apDungCho,
                              vaiTro: e.target.value ? e.target.value.split(',').map(s => s.trim()) : undefined,
                            },
                          },
                        })}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="TO_TRUONG, QUAN_LY"
                        disabled={!quyChe.coDuocSua}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Phân cách bằng dấu phẩy
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cấp trách nhiệm
                      </label>
                      <input
                        type="text"
                        value={(ruleForm.dieuKienJson?.apDungCho?.capTrachNhiem || []).join(', ')}
                        onChange={(e) => setRuleForm({
                          ...ruleForm,
                          dieuKienJson: {
                            apDungCho: {
                              ...ruleForm.dieuKienJson?.apDungCho,
                              capTrachNhiem: e.target.value ? e.target.value.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n)) : undefined,
                            },
                          },
                        })}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="1, 2, 3"
                        disabled={!quyChe.coDuocSua}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'congthuc' && (
                  <div className="max-w-lg">
                    {ruleForm.loaiRule === 'CO_DINH' && (
                      <CongThucCoDinhForm
                        value={ruleForm.congThucJson as { soTien?: number }}
                        onChange={(v) => setRuleForm({ ...ruleForm, congThucJson: v })}
                      />
                    )}

                    {ruleForm.loaiRule === 'THEO_HE_SO' && (
                      <CongThucHeSoForm
                        value={ruleForm.congThucJson as { base?: string; heSo?: number; congThem?: number }}
                        onChange={(v) => setRuleForm({ ...ruleForm, congThucJson: v })}
                      />
                    )}

                    {ruleForm.loaiRule === 'BAC_THANG' && (
                      <CongThucBacThangForm
                        value={ruleForm.congThucJson as { field?: string; bac?: { from: number; to: number; soTien?: number }[] }}
                        onChange={(v) => setRuleForm({ ...ruleForm, congThucJson: v })}
                      />
                    )}

                    {ruleForm.loaiRule === 'CONG_THUC' && (
                      <CongThucBieuThucForm
                        value={ruleForm.congThucJson as { bieuThuc?: string }}
                        onChange={(v) => setRuleForm({ ...ruleForm, congThucJson: v })}
                      />
                    )}

                    {ruleForm.loaiRule === 'THEO_SU_KIEN' && (
                      <div className="text-gray-500">
                        Form sự kiện sẽ được thêm sau...
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'preview' && previewResult && (
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900">
                        Tổng tiền: {new Intl.NumberFormat('vi-VN').format(previewResult.tongTien)}đ
                      </h4>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Chi tiết</h4>
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-sm">Khoản lương</th>
                            <th className="px-4 py-2 text-right text-sm">Số tiền</th>
                            <th className="px-4 py-2 text-left text-sm">Giải thích</th>
                          </tr>
                        </thead>
                        <tbody>
                          {previewResult.chiTiet.map((ct, i) => (
                            <tr key={i} className="border-t">
                              <td className="px-4 py-2">{ct.khoanLuong}</td>
                              <td className="px-4 py-2 text-right font-mono">
                                {new Intl.NumberFormat('vi-VN').format(ct.soTien)}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-600">
                                {ct.giaiThich}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Trace</h4>
                      <div className="space-y-2">
                        {previewResult.trace.map((t, i) => (
                          <div key={i} className="p-3 bg-gray-50 rounded text-sm">
                            <div className="font-medium">{t.ruleName}</div>
                            <div className="text-gray-600">{t.message}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              Output: {new Intl.NumberFormat('vi-VN').format(t.output)}đ
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer actions */}
              {quyChe.coDuocSua && (
                <div className="border-t px-6 py-4 flex justify-between">
                  <button
                    onClick={handleDeleteRule}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Xóa rule
                  </button>
                  <button
                    onClick={handleSaveRule}
                    disabled={saving}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Chọn một rule để xem chi tiết
            </div>
          )}
        </div>
      </div>

      {/* Add Rule Modal */}
      {showAddModal && (
        <AddRuleModal
          khoanLuongs={khoanLuongs}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddRule}
        />
      )}

      {/* Trợ lý AI Drawer */}
      <TroLyAiDrawer
        isOpen={showTroLyAi}
        onClose={() => setShowTroLyAi(false)}
        phongBanId={quyChe.phongBanId}
        quyCheId={quyChe.id}
        onRuleApplied={loadData}
      />
    </div>
  )
}

// Add Rule Modal Component
function AddRuleModal({
  khoanLuongs,
  onClose,
  onAdd,
}: {
  khoanLuongs: KhoanLuong[]
  onClose: () => void
  onAdd: (data: { khoanLuongId: number; tenRule: string; loaiRule: LoaiRule }) => void
}) {
  const [form, setForm] = useState({
    khoanLuongId: khoanLuongs[0]?.id || 0,
    tenRule: '',
    loaiRule: 'CO_DINH' as LoaiRule,
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Thêm Rule mới</h3>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên rule
            </label>
            <input
              type="text"
              value={form.tenRule}
              onChange={(e) => setForm({ ...form, tenRule: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="VD: Phụ cấp trách nhiệm tổ trưởng"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Khoản lương
            </label>
            <select
              value={form.khoanLuongId}
              onChange={(e) => setForm({ ...form, khoanLuongId: Number(e.target.value) })}
              className="w-full border rounded-lg px-3 py-2"
            >
              {khoanLuongs.map((kl) => (
                <option key={kl.id} value={kl.id}>
                  {kl.tenKhoan} ({kl.loai === 'THU_NHAP' ? '+' : '-'})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại rule
            </label>
            <select
              value={form.loaiRule}
              onChange={(e) => setForm({ ...form, loaiRule: e.target.value as LoaiRule })}
              className="w-full border rounded-lg px-3 py-2"
            >
              {Object.entries(LOAI_RULE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            onClick={() => onAdd(form)}
            disabled={!form.tenRule || !form.khoanLuongId}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Thêm rule
          </button>
        </div>
      </div>
    </div>
  )
}
