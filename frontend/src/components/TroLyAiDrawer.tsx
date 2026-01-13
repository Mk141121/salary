// Component Drawer Trợ lý AI gợi ý Rule
// HR nhập tiếng Việt → AI đề xuất rule JSON
import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Bot,
  X,
  Send,
  Loader2,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Eye,
  Edit3,
  Check,
  RefreshCw,
  History,
  Lightbulb,
  Copy,
  Settings,
  RotateCcw,
  Trash2,
} from 'lucide-react'
import {
  troLyAiApi,
  quyCheRuleApi,
  GoiYRuleResponse,
  RuleDeXuat,
  AiContext,
  LoaiRule,
  CheDoGop,
} from '../services/ruleEngineApi'

interface TroLyAiDrawerProps {
  isOpen: boolean
  onClose: () => void
  phongBanId: number
  quyCheId: number
  onRuleApplied: () => void
}

// Các mẫu gợi ý
const MAU_GOI_Y = [
  'Phạt đi trễ: 1-2 lần 50k/lần, từ lần 3 trở lên 100k/lần',
  'Trách nhiệm kho: cấp 1 500k, cấp 2 1tr, cấp 3 1.5tr',
  'Tiền trách nhiệm = lương cơ bản * 0.15',
  'Thưởng chuyên cần: 200k/tháng nếu không nghỉ',
  'Phụ cấp trách nhiệm cố định 500k/tháng',
]

// Mapping loại rule sang tiếng Việt
const LOAI_RULE_TEXT: Record<LoaiRule, string> = {
  CO_DINH: 'Cố định',
  THEO_HE_SO: 'Theo hệ số',
  BAC_THANG: 'Bậc thang',
  THEO_SU_KIEN: 'Theo sự kiện',
  CONG_THUC: 'Công thức',
}

const CHE_DO_GOP_TEXT: Record<CheDoGop, string> = {
  CONG_DON: 'Cộng dồn',
  GHI_DE: 'Ghi đè',
}

export default function TroLyAiDrawer({
  isOpen,
  onClose,
  phongBanId,
  quyCheId,
  onRuleApplied,
}: TroLyAiDrawerProps) {
  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  // States
  const [noiDung, setNoiDung] = useState('')
  const [dangXuLy, setDangXuLy] = useState(false)
  const [ketQua, setKetQua] = useState<GoiYRuleResponse | null>(null)
  const [context, setContext] = useState<AiContext | null>(null)
  const [dangApDung, setDangApDung] = useState(false)
  const [dangValidate, setDangValidate] = useState(false)
  const [ketQuaValidate, setKetQuaValidate] = useState<{ hopLe: boolean; loi: string[] } | null>(null)
  const [dangPreview, setDangPreview] = useState(false)
  const [ketQuaPreview, setKetQuaPreview] = useState<{ soTien: number; trace: string } | null>(null)
  const [xemJson, setXemJson] = useState(false)
  const [ruleChinhSua, setRuleChinhSua] = useState<RuleDeXuat | null>(null)
  const [tab, setTab] = useState<'goi-y' | 'lich-su'>('goi-y')
  const [showFormChinhSua, setShowFormChinhSua] = useState(false)
  const [showDuLieuGiaLap, setShowDuLieuGiaLap] = useState(false)
  const [daCopy, setDaCopy] = useState(false)
  const [duLieuGiaLap, setDuLieuGiaLap] = useState({
    luongCoBan: 10000000,
    capTrachNhiem: 2,
    heSoTrachNhiem: 1.2,
    soLanDiTre: 3,
    soLanNghiKhongPhep: 0,
  })

  // Load context khi mở drawer
  useEffect(() => {
    if (isOpen && phongBanId && quyCheId) {
      troLyAiApi.layContext(phongBanId, quyCheId).then(setContext).catch(console.error)
      // Focus vào textarea khi mở
      setTimeout(() => textareaRef.current?.focus(), 100)
    }
  }, [isOpen, phongBanId, quyCheId])

  // Reset khi đóng
  useEffect(() => {
    if (!isOpen) {
      setNoiDung('')
      setKetQua(null)
      setKetQuaValidate(null)
      setKetQuaPreview(null)
      setRuleChinhSua(null)
      setXemJson(false)
      setShowFormChinhSua(false)
      setShowDuLieuGiaLap(false)
      setDaCopy(false)
    }
  }, [isOpen])

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      
      // Escape để đóng
      if (e.key === 'Escape') {
        onClose()
      }
      
      // Ctrl/Cmd + Enter để gửi
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (noiDung.trim() && !dangXuLy) {
          e.preventDefault()
        }
      }
    },
    [isOpen, noiDung, dangXuLy, onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Gửi yêu cầu gợi ý
  const handleGoiY = async () => {
    if (!noiDung.trim()) return

    setDangXuLy(true)
    setKetQua(null)
    setKetQuaValidate(null)
    setKetQuaPreview(null)

    try {
      const result = await troLyAiApi.goiYRule(phongBanId, quyCheId, noiDung)
      setKetQua(result)
      if (result.ruleDeXuat) {
        setRuleChinhSua({ ...result.ruleDeXuat })
      }
    } catch (error) {
      console.error('Lỗi gợi ý rule:', error)
      setKetQua({
        hopLeSoBo: false,
        canLamRo: ['Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại.'],
      })
    } finally {
      setDangXuLy(false)
    }
  }

  // Validate rule
  const handleValidate = async () => {
    if (!ruleChinhSua) return

    // Validate client-side trước
    const loiClientSide = validateClientSide()
    if (loiClientSide.length > 0) {
      setKetQuaValidate({
        hopLe: false,
        loi: ['[Client] ' + loiClientSide.join(', [Client] ')],
      })
      return
    }

    setDangValidate(true)
    try {
      const result = await quyCheRuleApi.validate({
        loaiRule: ruleChinhSua.loaiRule,
        dieuKienJson: ruleChinhSua.dieuKienJson,
        congThucJson: ruleChinhSua.congThucJson,
      })
      setKetQuaValidate({
        hopLe: result.hopLe,
        loi: result.danhSachLoi || [],
      })
    } catch (error) {
      console.error('Lỗi validate:', error)
      setKetQuaValidate({
        hopLe: false,
        loi: ['Có lỗi xảy ra khi validate server'],
      })
    } finally {
      setDangValidate(false)
    }
  }

  // Preview rule
  const handlePreview = async () => {
    if (!ruleChinhSua) return

    setDangPreview(true)
    try {
      const result = await quyCheRuleApi.preview({
        quyCheId,
        duLieuGiaLap: duLieuGiaLap,
      })
      setKetQuaPreview({
        soTien: result.tongTien,
        trace: result.trace.map(t => `${t.ruleName}: ${t.message} → ${t.output.toLocaleString('vi-VN')}đ`).join('\n'),
      })
    } catch (error) {
      console.error('Lỗi preview:', error)
    } finally {
      setDangPreview(false)
    }
  }

  // Copy JSON
  const handleCopyJson = async () => {
    if (!ruleChinhSua) return
    try {
      await navigator.clipboard.writeText(JSON.stringify(ruleChinhSua, null, 2))
      setDaCopy(true)
      setTimeout(() => setDaCopy(false), 2000)
    } catch (error) {
      console.error('Lỗi copy:', error)
    }
  }

  // Reset form
  const handleResetForm = () => {
    if (ketQua?.ruleDeXuat) {
      setRuleChinhSua({ ...ketQua.ruleDeXuat })
    }
  }

  // Validate client-side
  const validateClientSide = (): string[] => {
    const loi: string[] = []
    if (!ruleChinhSua) return ['Không có rule để validate']

    // Validate tên rule
    if (!ruleChinhSua.tenRule || ruleChinhSua.tenRule.trim().length < 3) {
      loi.push('Tên rule phải có ít nhất 3 ký tự')
    }

    // Validate khoản lương
    if (!ruleChinhSua.khoanLuongMa) {
      loi.push('Chưa chọn khoản lương')
    }

    // Validate theo loại rule - sử dụng type assertion an toàn
    const congThuc = ruleChinhSua.congThucJson as unknown as Record<string, unknown>
    switch (ruleChinhSua.loaiRule) {
      case 'CO_DINH':
        if (!congThuc.soTien || (congThuc.soTien as number) <= 0) {
          loi.push('Số tiền cố định phải lớn hơn 0')
        }
        break
      case 'THEO_HE_SO':
        if (!congThuc.base) {
          loi.push('Chưa chọn nguồn tính (base)')
        }
        if (!congThuc.heSo || (congThuc.heSo as number) <= 0) {
          loi.push('Hệ số phải lớn hơn 0')
        }
        break
      case 'BAC_THANG':
        {
          const bac = congThuc.bac as Array<{ from?: number; to?: number; soTien?: number; soTienMoiLan?: number }> | undefined
          if (!bac || bac.length === 0) {
            loi.push('Phải có ít nhất 1 bậc thang')
          } else {
            bac.forEach((b, i) => {
              if (b.from === undefined || b.to === undefined) {
                loi.push(`Bậc ${i + 1}: Chưa định nghĩa khoảng from-to`)
              }
              if (!b.soTien && !b.soTienMoiLan) {
                loi.push(`Bậc ${i + 1}: Chưa định nghĩa số tiền`)
              }
            })
          }
        }
        break
      case 'CONG_THUC':
        if (!congThuc.bieuThuc || (congThuc.bieuThuc as string).trim().length === 0) {
          loi.push('Chưa nhập biểu thức công thức')
        }
        break
      case 'THEO_SU_KIEN':
        if (!congThuc.maSuKien) {
          loi.push('Chưa chọn mã sự kiện')
        }
        break
    }

    return loi
  }

  // Áp dụng rule
  const handleApDung = async () => {
    if (!ketQua?.auditId || !ruleChinhSua) return

    // Validate client-side trước
    const loiClientSide = validateClientSide()
    if (loiClientSide.length > 0) {
      setKetQuaValidate({
        hopLe: false,
        loi: loiClientSide,
      })
      alert('Vui lòng sửa các lỗi trước khi áp dụng:\n\n' + loiClientSide.join('\n'))
      return
    }

    // Xác nhận trước khi áp dụng
    const confirmed = confirm(
      `Xác nhận áp dụng rule "${ruleChinhSua.tenRule}"?\n\n` +
      `Loại: ${LOAI_RULE_TEXT[ruleChinhSua.loaiRule]}\n` +
      `Khoản lương: ${ruleChinhSua.khoanLuongMa}`
    )
    if (!confirmed) return

    setDangApDung(true)
    try {
      await troLyAiApi.apDungRule(quyCheId, ketQua.auditId, ruleChinhSua)
      alert('✅ Đã áp dụng rule thành công!')
      onRuleApplied()
      onClose()
    } catch (error: unknown) {
      console.error('Lỗi áp dụng rule:', error)
      const errorMessage = error instanceof Error ? error.message : 'Lỗi không xác định'
      alert(`❌ Có lỗi khi áp dụng rule: ${errorMessage}`)
    } finally {
      setDangApDung(false)
    }
  }

  // Chọn mẫu gợi ý
  const handleChonMau = (mau: string) => {
    setNoiDung(mau)
  }

  // Format số tiền
  const formatTien = (soTien: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(soTien)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden">
      {/* Overlay với animation */}
      <div 
        className="flex-1 bg-black/50 backdrop-blur-sm animate-fadeIn" 
        onClick={onClose} 
      />

      {/* Drawer với animation slide */}
      <div 
        ref={drawerRef}
        className="w-[600px] max-w-full bg-white shadow-2xl flex flex-col h-full animate-slideInRight"
      >
        {/* Header với gradient và shadow */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Trợ lý AI gợi ý Rule</h2>
              <p className="text-sm text-white/80">Nhập tiếng Việt → Tạo rule tự động</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-white/20 rounded-lg transition-all hover:rotate-90"
            title="Đóng (Escape)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-gray-50">
          <button
            onClick={() => setTab('goi-y')}
            className={`flex-1 py-3 text-sm font-medium transition-all ${
              tab === 'goi-y'
                ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Lightbulb className="h-4 w-4 inline mr-2" />
            Gợi ý Rule
          </button>
          <button
            onClick={() => setTab('lich-su')}
            className={`flex-1 py-3 text-sm font-medium transition-all ${
              tab === 'lich-su'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <History className="h-4 w-4 inline mr-2" />
            Lịch sử
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {tab === 'goi-y' && (
            <>
              {/* Context hiện tại */}
              {context && (
                <div className="bg-gray-50 rounded-lg p-3 text-sm">
                  <div className="font-medium text-gray-700 mb-2">Ngữ cảnh hiện tại:</div>
                  <div className="grid grid-cols-2 gap-2 text-gray-600">
                    <div>
                      <span className="text-gray-500">Phòng ban:</span>{' '}
                      <span className="font-medium">{context.phongBan.tenPhongBan}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Quy chế:</span>{' '}
                      <span className="font-medium">v{context.quyChe.phienBan}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Khoản lương:</span>{' '}
                      <span className="font-medium">{context.khoanLuongs.length} khoản</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Sự kiện:</span>{' '}
                      <span className="font-medium">{context.danhMucSuKien.length} mục</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mẫu gợi ý */}
              <div className="animate-slideInUp">
                <div className="text-sm font-medium text-gray-700 mb-2">💡 Mẫu gợi ý:</div>
                <div className="flex flex-wrap gap-2">
                  {MAU_GOI_Y.map((mau, index) => (
                    <button
                      key={index}
                      onClick={() => handleChonMau(mau)}
                      className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 hover:scale-105 transition-all"
                    >
                      {mau.length > 40 ? mau.substring(0, 37) + '...' : mau}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="animate-slideInUp" style={{ animationDelay: '0.1s' }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ✍️ Mô tả bằng tiếng Việt:
                </label>
                <textarea
                  ref={textareaRef}
                  value={noiDung}
                  onChange={(e) => setNoiDung(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                      e.preventDefault()
                      if (noiDung.trim() && !dangXuLy) {
                        handleGoiY()
                      }
                    }
                  }}
                  placeholder="Ví dụ: Phạt đi trễ 1-2 lần 50k/lần, từ lần 3 trở lên 100k/lần"
                  className="w-full h-28 px-3 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  disabled={dangXuLy}
                />
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-400">
                    ⌘/Ctrl + Enter để gửi
                  </span>
                  <span className="text-xs text-gray-400">
                    {noiDung.length} ký tự
                  </span>
                </div>
                <button
                  onClick={handleGoiY}
                  disabled={!noiDung.trim() || dangXuLy}
                  className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                >
                  {dangXuLy ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Tạo đề xuất
                    </>
                  )}
                </button>
              </div>

              {/* Kết quả */}
              {ketQua && (
                <div className="border rounded-lg overflow-hidden">
                  {/* Header kết quả */}
                  <div
                    className={`p-3 flex items-center gap-2 ${
                      ketQua.hopLeSoBo ? 'bg-green-50' : 'bg-yellow-50'
                    }`}
                  >
                    {ketQua.hopLeSoBo ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <HelpCircle className="h-5 w-5 text-yellow-600" />
                    )}
                    <span
                      className={`font-medium ${
                        ketQua.hopLeSoBo ? 'text-green-700' : 'text-yellow-700'
                      }`}
                    >
                      {ketQua.hopLeSoBo ? 'Đã tạo đề xuất thành công' : 'Cần làm rõ thêm'}
                    </span>
                  </div>

                  {/* Cần làm rõ */}
                  {ketQua.canLamRo.length > 0 && (
                    <div className="p-3 bg-yellow-50 border-t">
                      <div className="text-sm font-medium text-yellow-800 mb-2">Câu hỏi:</div>
                      <ul className="space-y-1">
                        {ketQua.canLamRo.map((cauHoi, idx) => (
                          <li key={idx} className="text-sm text-yellow-700 flex items-start gap-2">
                            <span>•</span>
                            <span>{cauHoi}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Rule đề xuất */}
                  {ketQua.ruleDeXuat && ruleChinhSua && (
                    <div className="p-3 space-y-3">
                      {/* Tóm tắt */}
                      {ketQua.tomTatRule && (
                        <div className="text-sm">
                          <span className="text-gray-500">Tóm tắt:</span>{' '}
                          <span className="font-medium">{ketQua.tomTatRule}</span>
                        </div>
                      )}

                      {/* Chi tiết rule */}
                      <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-gray-500">Loại rule:</span>{' '}
                            <span className="font-medium text-blue-600">
                              {LOAI_RULE_TEXT[ruleChinhSua.loaiRule]}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Chế độ gộp:</span>{' '}
                            <span className="font-medium">
                              {CHE_DO_GOP_TEXT[ruleChinhSua.cheDoGop]}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Khoản lương:</span>{' '}
                            <span className="font-medium">{ruleChinhSua.khoanLuongMa}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Ưu tiên:</span>{' '}
                            <span className="font-medium">{ruleChinhSua.thuTuUuTien}</span>
                          </div>
                        </div>

                        {/* Toggle xem JSON */}
                        <div className="pt-2 border-t flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => setXemJson(!xemJson)}
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                          >
                            {xemJson ? <Eye className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                            {xemJson ? 'Ẩn JSON' : 'Xem JSON'}
                          </button>
                          <button
                            onClick={handleCopyJson}
                            className="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1"
                          >
                            <Copy className="h-4 w-4" />
                            {daCopy ? 'Đã copy!' : 'Copy JSON'}
                          </button>
                          <button
                            onClick={() => setShowFormChinhSua(!showFormChinhSua)}
                            className="text-purple-600 hover:text-purple-800 text-sm flex items-center gap-1"
                          >
                            <Settings className="h-4 w-4" />
                            {showFormChinhSua ? 'Ẩn form' : 'Chỉnh sửa'}
                          </button>
                          <button
                            onClick={handleResetForm}
                            className="text-orange-600 hover:text-orange-800 text-sm flex items-center gap-1"
                          >
                            <RotateCcw className="h-4 w-4" />
                            Reset
                          </button>
                        </div>

                        {xemJson && (
                          <pre className="mt-2 p-2 bg-gray-800 text-green-400 rounded text-xs overflow-x-auto max-h-48">
                            {JSON.stringify(ruleChinhSua, null, 2)}
                          </pre>
                        )}

                        {/* Form chỉnh sửa rule */}
                        {showFormChinhSua && (
                          <div className="mt-2 p-3 bg-white border rounded-lg space-y-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Tên rule
                              </label>
                              <input
                                type="text"
                                value={ruleChinhSua.tenRule}
                                onChange={(e) =>
                                  setRuleChinhSua({ ...ruleChinhSua, tenRule: e.target.value })
                                }
                                className="w-full px-2 py-1.5 border rounded text-sm"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Loại rule
                                </label>
                                <select
                                  value={ruleChinhSua.loaiRule}
                                  onChange={(e) =>
                                    setRuleChinhSua({
                                      ...ruleChinhSua,
                                      loaiRule: e.target.value as LoaiRule,
                                    })
                                  }
                                  className="w-full px-2 py-1.5 border rounded text-sm"
                                >
                                  {Object.entries(LOAI_RULE_TEXT).map(([value, label]) => (
                                    <option key={value} value={value}>
                                      {label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Chế độ gộp
                                </label>
                                <select
                                  value={ruleChinhSua.cheDoGop}
                                  onChange={(e) =>
                                    setRuleChinhSua({
                                      ...ruleChinhSua,
                                      cheDoGop: e.target.value as CheDoGop,
                                    })
                                  }
                                  className="w-full px-2 py-1.5 border rounded text-sm"
                                >
                                  {Object.entries(CHE_DO_GOP_TEXT).map(([value, label]) => (
                                    <option key={value} value={value}>
                                      {label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Thứ tự ưu tiên
                              </label>
                              <input
                                type="number"
                                value={ruleChinhSua.thuTuUuTien}
                                onChange={(e) =>
                                  setRuleChinhSua({
                                    ...ruleChinhSua,
                                    thuTuUuTien: Number(e.target.value),
                                  })
                                }
                                className="w-24 px-2 py-1.5 border rounded text-sm"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id="choPhepChinhTay"
                                checked={ruleChinhSua.choPhepChinhTay}
                                onChange={(e) =>
                                  setRuleChinhSua({
                                    ...ruleChinhSua,
                                    choPhepChinhTay: e.target.checked,
                                  })
                                }
                              />
                              <label htmlFor="choPhepChinhTay" className="text-sm text-gray-700">
                                Cho phép chỉnh tay
                              </label>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Giải thích */}
                      {ketQua.giaiThich && ketQua.giaiThich.length > 0 && (
                        <div className="bg-blue-50 rounded-lg p-3">
                          <div className="text-sm font-medium text-blue-800 mb-1">Giải thích:</div>
                          <ul className="space-y-1">
                            {ketQua.giaiThich.map((gt, idx) => (
                              <li key={idx} className="text-sm text-blue-700 flex items-start gap-2">
                                <span>•</span>
                                <span>{gt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Cảnh báo */}
                      {ketQua.canhBao && ketQua.canhBao.length > 0 && (
                        <div className="bg-orange-50 rounded-lg p-3">
                          <div className="text-sm font-medium text-orange-800 mb-1 flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4" />
                            Cảnh báo:
                          </div>
                          <ul className="space-y-1">
                            {ketQua.canhBao.map((cb, idx) => (
                              <li key={idx} className="text-sm text-orange-700 flex items-start gap-2">
                                <span>•</span>
                                <span>{cb}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Kết quả validate */}
                      {ketQuaValidate && (
                        <div
                          className={`rounded-lg p-3 ${
                            ketQuaValidate.hopLe ? 'bg-green-50' : 'bg-red-50'
                          }`}
                        >
                          <div
                            className={`text-sm font-medium mb-1 flex items-center gap-1 ${
                              ketQuaValidate.hopLe ? 'text-green-800' : 'text-red-800'
                            }`}
                          >
                            {ketQuaValidate.hopLe ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <AlertTriangle className="h-4 w-4" />
                            )}
                            {ketQuaValidate.hopLe ? 'Validate thành công' : 'Validate thất bại'}
                          </div>
                          {ketQuaValidate.loi.length > 0 && (
                            <ul className="space-y-1">
                              {ketQuaValidate.loi.map((loi, idx) => (
                                <li
                                  key={idx}
                                  className="text-sm text-red-700 flex items-start gap-2"
                                >
                                  <span>•</span>
                                  <span>{loi}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}

                      {/* Kết quả preview */}
                      {ketQuaPreview && (
                        <div className="bg-purple-50 rounded-lg p-3">
                          <div className="text-sm font-medium text-purple-800 mb-1">
                            Preview (dữ liệu giả lập):
                          </div>
                          <div className="text-lg font-bold text-purple-600">
                            {formatTien(ketQuaPreview.soTien)}
                          </div>
                          <div className="text-xs text-purple-600 mt-1">{ketQuaPreview.trace}</div>
                        </div>
                      )}

                      {/* Cài đặt dữ liệu giả lập */}
                      <div className="border rounded-lg">
                        <button
                          onClick={() => setShowDuLieuGiaLap(!showDuLieuGiaLap)}
                          className="w-full px-3 py-2 flex items-center justify-between text-sm text-gray-600 hover:bg-gray-50"
                        >
                          <span className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Cài đặt dữ liệu giả lập
                          </span>
                          <span>{showDuLieuGiaLap ? '▲' : '▼'}</span>
                        </button>
                        {showDuLieuGiaLap && (
                          <div className="p-3 border-t space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                  Lương cơ bản
                                </label>
                                <input
                                  type="number"
                                  value={duLieuGiaLap.luongCoBan}
                                  onChange={(e) =>
                                    setDuLieuGiaLap({
                                      ...duLieuGiaLap,
                                      luongCoBan: Number(e.target.value),
                                    })
                                  }
                                  className="w-full px-2 py-1 border rounded text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                  Hệ số trách nhiệm
                                </label>
                                <input
                                  type="number"
                                  step="0.1"
                                  value={duLieuGiaLap.heSoTrachNhiem}
                                  onChange={(e) =>
                                    setDuLieuGiaLap({
                                      ...duLieuGiaLap,
                                      heSoTrachNhiem: Number(e.target.value),
                                    })
                                  }
                                  className="w-full px-2 py-1 border rounded text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                  Cấp trách nhiệm
                                </label>
                                <input
                                  type="number"
                                  value={duLieuGiaLap.capTrachNhiem}
                                  onChange={(e) =>
                                    setDuLieuGiaLap({
                                      ...duLieuGiaLap,
                                      capTrachNhiem: Number(e.target.value),
                                    })
                                  }
                                  className="w-full px-2 py-1 border rounded text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                  Số lần đi trễ
                                </label>
                                <input
                                  type="number"
                                  value={duLieuGiaLap.soLanDiTre}
                                  onChange={(e) =>
                                    setDuLieuGiaLap({
                                      ...duLieuGiaLap,
                                      soLanDiTre: Number(e.target.value),
                                    })
                                  }
                                  className="w-full px-2 py-1 border rounded text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={handleValidate}
                          disabled={dangValidate}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50 transition"
                        >
                          {dangValidate ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <RefreshCw className="h-4 w-4" />
                          )}
                          Validate
                        </button>
                        <button
                          onClick={handlePreview}
                          disabled={dangPreview}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 disabled:opacity-50 transition"
                        >
                          {dangPreview ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          Preview
                        </button>
                        <button
                          onClick={handleApDung}
                          disabled={dangApDung}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
                        >
                          {dangApDung ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                          Áp dụng
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {tab === 'lich-su' && (
            <LichSuDeXuat 
              quyCheId={quyCheId} 
              onTaiSuDung={(prompt) => {
                setNoiDung(prompt)
                setTab('goi-y')
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// Component lịch sử đề xuất
function LichSuDeXuat({ 
  quyCheId,
  onTaiSuDung,
}: { 
  quyCheId: number
  onTaiSuDung?: (prompt: string) => void
}) {
  const [lichSu, setLichSu] = useState<Array<{
    id: number
    promptGoc: string
    trangThai: string
    taoLuc: string
    nguoiTao?: { hoTen: string }
    rule?: { tenRule: string }
  }>>([])
  const [dangTai, setDangTai] = useState(true)

  useEffect(() => {
    troLyAiApi
      .lichSuDeXuat(quyCheId)
      .then(setLichSu)
      .catch(console.error)
      .finally(() => setDangTai(false))
  }, [quyCheId])

  const handleHuyDeXuat = async (auditId: number) => {
    if (!confirm('Hủy đề xuất này?')) return
    try {
      await troLyAiApi.huyDeXuat(auditId)
      setLichSu((prev) =>
        prev.map((item) =>
          item.id === auditId ? { ...item, trangThai: 'HUY' } : item
        )
      )
    } catch (error) {
      console.error('Lỗi hủy:', error)
    }
  }

  if (dangTai) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    )
  }

  if (lichSu.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Chưa có lịch sử đề xuất nào
      </div>
    )
  }

  const TRANG_THAI_TEXT: Record<string, { text: string; color: string }> = {
    DE_XUAT: { text: 'Đề xuất', color: 'bg-yellow-100 text-yellow-800' },
    DA_AP_DUNG: { text: 'Đã áp dụng', color: 'bg-green-100 text-green-800' },
    HUY: { text: 'Đã hủy', color: 'bg-gray-100 text-gray-800' },
  }

  return (
    <div className="space-y-3">
      {lichSu.map((item) => (
        <div key={item.id} className="border rounded-lg p-3 hover:border-gray-300 transition">
          <div className="flex items-start justify-between mb-2">
            <div className="text-sm text-gray-500">
              {new Date(item.taoLuc).toLocaleString('vi-VN')}
              {item.nguoiTao && ` • ${item.nguoiTao.hoTen}`}
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                TRANG_THAI_TEXT[item.trangThai]?.color || 'bg-gray-100'
              }`}
            >
              {TRANG_THAI_TEXT[item.trangThai]?.text || item.trangThai}
            </span>
          </div>
          <div className="text-sm text-gray-700 line-clamp-2">{item.promptGoc}</div>
          {item.rule && (
            <div className="mt-2 text-xs text-blue-600">
              → Rule: {item.rule.tenRule}
            </div>
          )}
          {/* Actions */}
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => onTaiSuDung?.(item.promptGoc)}
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Tái sử dụng
            </button>
            {item.trangThai === 'DE_XUAT' && (
              <button
                onClick={() => handleHuyDeXuat(item.id)}
                className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" />
                Hủy
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
