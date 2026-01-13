// Trang xem Rule Trace - Lịch sử chạy Rule Engine
import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react'
import { ruleEngineApi, RuleTrace, LoaiRule } from '../services/ruleEngineApi'
import { bangLuongApi, BangLuongChiTiet } from '../services/api'

const LOAI_RULE_LABELS: Record<LoaiRule, string> = {
  CO_DINH: 'Cố định',
  THEO_HE_SO: 'Theo hệ số',
  BAC_THANG: 'Bậc thang',
  THEO_SU_KIEN: 'Theo sự kiện',
  CONG_THUC: 'Công thức',
}

export default function XemRuleTrace() {
  const [searchParams] = useSearchParams()
  const bangLuongId = Number(searchParams.get('bangLuongId')) || 0
  
  const [bangLuong, setBangLuong] = useState<BangLuongChiTiet | null>(null)
  const [traces, setTraces] = useState<RuleTrace[]>([])
  const [loading, setLoading] = useState(true)
  const [searchNV, setSearchNV] = useState('')
  const [expandedNVs, setExpandedNVs] = useState<number[]>([])

  useEffect(() => {
    if (bangLuongId) {
      loadData()
    }
  }, [bangLuongId])

  const loadData = async () => {
    setLoading(true)
    try {
      const [bl, tr] = await Promise.all([
        bangLuongApi.layTheoId(bangLuongId),
        ruleEngineApi.xemTrace(bangLuongId),
      ])
      setBangLuong(bl)
      setTraces(tr)
    } catch (error) {
      console.error('Lỗi load dữ liệu:', error)
    } finally {
      setLoading(false)
    }
  }

  // Group traces by nhanVienId
  const tracesByNhanVien = traces.reduce((acc, trace) => {
    const nvId = trace.nhanVienId
    if (!acc[nvId]) {
      acc[nvId] = {
        nhanVien: trace.nhanVien,
        traces: [],
      }
    }
    acc[nvId].traces.push(trace)
    return acc
  }, {} as Record<number, { nhanVien: RuleTrace['nhanVien']; traces: RuleTrace[] }>)

  // Filter by search
  const filteredNVs = Object.entries(tracesByNhanVien).filter(([_, data]) => {
    if (!searchNV) return true
    const q = searchNV.toLowerCase()
    return (
      data.nhanVien?.hoTen.toLowerCase().includes(q) ||
      data.nhanVien?.maNhanVien.toLowerCase().includes(q)
    )
  })

  const toggleExpand = (nvId: number) => {
    setExpandedNVs((prev) =>
      prev.includes(nvId) ? prev.filter((id) => id !== nvId) : [...prev, nvId]
    )
  }

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('vi-VN').format(amount)

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
      <div className="flex items-center gap-4 mb-6">
        <Link
          to={`/bang-luong/${bangLuongId}`}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Rule Trace - Giải trình tính lương
          </h1>
          {bangLuong && (
            <p className="text-gray-500 mt-1">
              {bangLuong.phongBan.tenPhongBan} - Tháng {bangLuong.thang}/{bangLuong.nam}
            </p>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc mã nhân viên..."
            value={searchNV}
            onChange={(e) => setSearchNV(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-center justify-between">
        <div>
          <span className="text-blue-800">
            Tổng: {Object.keys(tracesByNhanVien).length} nhân viên, {traces.length} dòng trace
          </span>
        </div>
        <button
          onClick={() => {
            if (expandedNVs.length === Object.keys(tracesByNhanVien).length) {
              setExpandedNVs([])
            } else {
              setExpandedNVs(Object.keys(tracesByNhanVien).map(Number))
            }
          }}
          className="text-sm text-blue-600 hover:underline"
        >
          {expandedNVs.length === Object.keys(tracesByNhanVien).length
            ? 'Thu gọn tất cả'
            : 'Mở rộng tất cả'}
        </button>
      </div>

      {/* Trace list grouped by employee */}
      <div className="space-y-4">
        {filteredNVs.map(([nvIdStr, data]) => {
          const nvId = Number(nvIdStr)
          const isExpanded = expandedNVs.includes(nvId)
          const tongTien = data.traces.reduce((sum, t) => sum + t.outputSoTien, 0)

          return (
            <div key={nvId} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Employee header */}
              <button
                onClick={() => toggleExpand(nvId)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown size={18} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={18} className="text-gray-400" />
                  )}
                  <div className="text-left">
                    <div className="font-medium">{data.nhanVien?.hoTen}</div>
                    <div className="text-sm text-gray-500">
                      {data.nhanVien?.maNhanVien}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-blue-600">
                    {formatMoney(tongTien)}đ
                  </div>
                  <div className="text-sm text-gray-500">
                    {data.traces.length} rules
                  </div>
                </div>
              </button>

              {/* Trace details */}
              {isExpanded && (
                <div className="border-t">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Quy chế
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Rule
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Khoản lương
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                          Số tiền
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Giải thích
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.traces.map((trace) => (
                        <tr key={trace.id} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-2">
                            <div className="text-sm">{trace.quyChe?.tenQuyChe}</div>
                            <div className="text-xs text-gray-500">
                              v{trace.quyChe?.phienBan}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            {trace.quyCheRule ? (
                              <>
                                <div className="text-sm">{trace.quyCheRule.tenRule}</div>
                                <div className="text-xs text-gray-500">
                                  {LOAI_RULE_LABELS[trace.quyCheRule.loaiRule]}
                                </div>
                              </>
                            ) : (
                              <span className="text-gray-400 text-sm">-</span>
                            )}
                          </td>
                          <td className="px-4 py-2">
                            <div className="text-sm">{trace.khoanLuong?.tenKhoan}</div>
                            <div className="text-xs text-gray-500">
                              {trace.khoanLuong?.maKhoan}
                            </div>
                          </td>
                          <td className="px-4 py-2 text-right">
                            <span
                              className={`font-mono text-sm ${
                                trace.khoanLuong?.loai === 'KHAU_TRU'
                                  ? 'text-red-600'
                                  : 'text-green-600'
                              }`}
                            >
                              {trace.khoanLuong?.loai === 'KHAU_TRU' ? '-' : '+'}
                              {formatMoney(trace.outputSoTien)}đ
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <div className="text-sm text-gray-600">
                              {trace.messageGiaiThich}
                            </div>
                            {trace.inputJson && (
                              <details className="mt-1">
                                <summary className="text-xs text-blue-600 cursor-pointer">
                                  Xem input
                                </summary>
                                <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                                  {JSON.stringify(JSON.parse(trace.inputJson), null, 2)}
                                </pre>
                              </details>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )
        })}

        {filteredNVs.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            Không có dữ liệu trace
          </div>
        )}
      </div>
    </div>
  )
}
