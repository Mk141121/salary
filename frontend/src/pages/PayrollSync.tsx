// Pipeline Sync + Rule Trace - Sprint 10
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  RefreshCw,
  AlertCircle,
  Clock,
  Database,
  Users,
  Calendar,
  FileText,
  Award,
  Loader2,
  ChevronDown,
  ChevronUp,
  Eye,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { phongBanApi } from '../services/api'
import {
  payrollSyncApi,
  SyncProgress,
  EnhancedRuleTrace,
  NguonDuLieu,
} from '../services/payrollSyncApi'
import { Card, Badge, Button } from '../components/ui'
import { formatTien } from '../utils'

// Constants for nguồn dữ liệu config
const NGUON_DU_LIEU_CONFIG: Record<NguonDuLieu, { label: string; color: string; icon: React.ElementType }> = {
  CHAM_CONG: { label: 'Chấm công', color: 'bg-blue-100 text-blue-700', icon: Clock },
  YEU_CAU: { label: 'Đơn yêu cầu', color: 'bg-purple-100 text-purple-700', icon: FileText },
  NGHI_PHEP: { label: 'Nghỉ phép', color: 'bg-green-100 text-green-700', icon: Calendar },
  PHAN_CA: { label: 'Phân ca', color: 'bg-yellow-100 text-yellow-700', icon: Users },
  GPS: { label: 'GPS', color: 'bg-orange-100 text-orange-700', icon: Database },
  KPI: { label: 'KPI', color: 'bg-pink-100 text-pink-700', icon: Award },
  MANUAL: { label: 'Thủ công', color: 'bg-gray-100 text-gray-700', icon: FileText },
  RULE_ENGINE: { label: 'Rule Engine', color: 'bg-indigo-100 text-indigo-700', icon: Database },
}

export default function PayrollSync() {
  const queryClient = useQueryClient()
  const [filterThang, setFilterThang] = useState(new Date().getMonth() + 1)
  const [filterNam, setFilterNam] = useState(new Date().getFullYear())
  const [selectedPhongBan, setSelectedPhongBan] = useState<number>()
  const [expandedRules, setExpandedRules] = useState<Set<number>>(new Set())
  const [syncingBangLuongId, setSyncingBangLuongId] = useState<number | null>(null)

  // Queries
  const { data: phongBans } = useQuery({
    queryKey: ['phong-ban'],
    queryFn: phongBanApi.layTatCa,
  })

  const { data: pipelineStatus, isLoading: statusLoading } = useQuery({
    queryKey: ['pipeline-status', filterThang, filterNam],
    queryFn: () => payrollSyncApi.getStatus(filterThang, filterNam),
  })

  const { data: ruleTraces, isLoading: traceLoading } = useQuery({
    queryKey: ['rule-trace', filterThang, filterNam, selectedPhongBan],
    queryFn: () =>
      payrollSyncApi.getRuleTrace({
        thang: filterThang,
        nam: filterNam,
        phongBanId: selectedPhongBan,
      }),
  })

  // Sync mutation
  const syncMutation = useMutation({
    mutationFn: (bangLuongId: number) => payrollSyncApi.sync({ bangLuongId }),
    onMutate: (bangLuongId) => {
      setSyncingBangLuongId(bangLuongId)
    },
    onSuccess: (data: SyncProgress) => {
      queryClient.invalidateQueries({ queryKey: ['pipeline-status'] })
      queryClient.invalidateQueries({ queryKey: ['rule-trace'] })
      queryClient.invalidateQueries({ queryKey: ['bang-luong'] })
      
      if (data.currentStep === 'HOAN_THANH') {
        toast.success(`Đồng bộ hoàn thành: ${data.summary?.tongThayDoi || 0} thay đổi`)
      } else if (data.currentStep === 'LOI') {
        toast.error(`Đồng bộ thất bại: ${data.errors[0] || 'Có lỗi xảy ra'}`)
      }
    },
    onError: (error: Error) => {
      toast.error(`Lỗi đồng bộ: ${error.message}`)
    },
    onSettled: () => {
      setSyncingBangLuongId(null)
    },
  })

  const toggleRuleExpand = (ruleId: number) => {
    const next = new Set(expandedRules)
    if (next.has(ruleId)) {
      next.delete(ruleId)
    } else {
      next.add(ruleId)
    }
    setExpandedRules(next)
  }

  const getStatusBadge = (status: string) => {
    const config: Record<string, { color: string; label: string }> = {
      CHUA_TAO: { color: 'gray', label: 'Chưa tạo' },
      NHAP: { color: 'yellow', label: 'Nháp' },
      DA_TINH: { color: 'blue', label: 'Đã tính' },
      DA_KHOA: { color: 'purple', label: 'Đã khóa' },
      DA_DUYET: { color: 'green', label: 'Đã duyệt' },
    }
    const cfg = config[status] || { color: 'gray', label: status }
    return <Badge variant={cfg.color as any}>{cfg.label}</Badge>
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pipeline Đồng Bộ Lương</h1>
          <p className="text-gray-500">Đồng bộ dữ liệu chấm công, nghỉ phép, yêu cầu vào bảng lương</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tháng</label>
            <select
              value={filterThang}
              onChange={(e) => setFilterThang(Number(e.target.value))}
              className="input"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Tháng {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Năm</label>
            <select
              value={filterNam}
              onChange={(e) => setFilterNam(Number(e.target.value))}
              className="input"
            >
              {[2024, 2025, 2026].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phòng ban</label>
            <select
              value={selectedPhongBan || ''}
              onChange={(e) => setSelectedPhongBan(e.target.value ? Number(e.target.value) : undefined)}
              className="input"
            >
              <option value="">Tất cả</option>
              {phongBans?.map((pb: any) => (
                <option key={pb.id} value={pb.id}>
                  {pb.tenPhongBan}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Pipeline Status */}
      <Card>
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Database className="w-5 h-5" />
            Trạng thái Pipeline
          </h2>
        </div>

        {statusLoading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
          </div>
        ) : (
          <div className="p-4">
            {/* Summary */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-blue-600">Tổng nhân viên</div>
                <div className="text-2xl font-bold text-blue-700">
                  {pipelineStatus?.tongNhanVien || 0}
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-green-600">Đã sync hoàn thành</div>
                <div className="text-2xl font-bold text-green-700">
                  {pipelineStatus?.tongDaSyncHoanThanh || 0}
                </div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="text-sm text-yellow-600">Cảnh báo</div>
                <div className="text-2xl font-bold text-yellow-700">
                  {pipelineStatus?.warnings?.length || 0}
                </div>
              </div>
            </div>

            {/* Warnings */}
            {pipelineStatus?.warnings && pipelineStatus.warnings.length > 0 && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-medium text-yellow-800 flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  Cảnh báo
                </h3>
                <ul className="space-y-1">
                  {pipelineStatus.warnings.slice(0, 5).map((w, i) => (
                    <li key={i} className="text-sm text-yellow-700">
                      • {w.moTa}
                    </li>
                  ))}
                  {pipelineStatus.warnings.length > 5 && (
                    <li className="text-sm text-yellow-600 italic">
                      ... và {pipelineStatus.warnings.length - 5} cảnh báo khác
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* PhongBan List */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Phòng ban
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Trạng thái
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Nhân viên
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Tổng lương
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pipelineStatus?.phongBans?.map((pb) => (
                    <tr key={pb.phongBanId} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{pb.tenPhongBan}</td>
                      <td className="px-4 py-3 text-center">{getStatusBadge(pb.trangThai)}</td>
                      <td className="px-4 py-3 text-right">{pb.tongNhanVien}</td>
                      <td className="px-4 py-3 text-right">{formatTien(pb.tongLuong)}</td>
                      <td className="px-4 py-3 text-center">
                        {pb.bangLuongId && pb.trangThai !== 'DA_KHOA' && pb.trangThai !== 'DA_DUYET' ? (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => syncMutation.mutate(pb.bangLuongId!)}
                            disabled={syncingBangLuongId === pb.bangLuongId}
                          >
                            {syncingBangLuongId === pb.bangLuongId ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <RefreshCw className="w-4 h-4" />
                            )}
                            <span className="ml-1">Sync</span>
                          </Button>
                        ) : pb.trangThai === 'CHUA_TAO' ? (
                          <span className="text-sm text-gray-400">Chưa tạo BL</span>
                        ) : (
                          <span className="text-sm text-gray-400">Đã khóa</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Card>

      {/* Rule Trace với nguồn dữ liệu */}
      <Card>
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Rule Trace - Nguồn Dữ Liệu
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Xem chi tiết dữ liệu được sử dụng để tính lương từ các nguồn khác nhau
          </p>
        </div>

        {traceLoading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
          </div>
        ) : ruleTraces && ruleTraces.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {ruleTraces.map((trace: EnhancedRuleTrace) => (
              <div key={`${trace.ruleId}-${trace.nhanVienId}`} className="p-4">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleRuleExpand(trace.ruleId * 1000 + trace.nhanVienId)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-medium">{trace.ruleName}</div>
                      <div className="text-sm text-gray-500">{trace.hoTen}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600">
                        {formatTien(trace.ketQua)}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(trace.ngayChay).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                    {expandedRules.has(trace.ruleId * 1000 + trace.nhanVienId) ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expanded detail */}
                {expandedRules.has(trace.ruleId * 1000 + trace.nhanVienId) && (
                  <div className="mt-4 pl-14 space-y-3">
                    {/* Chi tiết */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-2">Chi tiết tính toán:</div>
                      <div className="text-sm font-mono bg-white p-2 rounded border">
                        {trace.chiTiet}
                      </div>
                    </div>

                    {/* Nguồn dữ liệu */}
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Nguồn dữ liệu:</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {trace.nguonDuLieu?.map((nguon, i) => {
                          const config = NGUON_DU_LIEU_CONFIG[nguon.type]
                          const Icon = config.icon
                          return (
                            <div
                              key={i}
                              className={`flex items-center gap-2 p-2 rounded-lg ${config.color}`}
                            >
                              <Icon className="w-4 h-4" />
                              <div className="flex-1">
                                <div className="text-sm font-medium">{config.label}</div>
                                <div className="text-xs opacity-75">
                                  {nguon.sourceId} = {String(nguon.value)}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <Database className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Chưa có dữ liệu rule trace cho tháng {filterThang}/{filterNam}</p>
          </div>
        )}
      </Card>
    </div>
  )
}
