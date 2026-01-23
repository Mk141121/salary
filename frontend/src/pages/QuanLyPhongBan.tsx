// Trang Quản lý Phòng ban - Giao diện cây phân cấp
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  Building2, Plus, Edit2, Trash2, Search, Users, Clock, Calendar,
  ChevronRight, ChevronDown, FolderTree, Layers, GitBranch
} from 'lucide-react'
import { phongBanApi, PhongBan, DonViCon } from '../services/api'

// Loại phòng ban
const LOAI_PHONG_BAN = [
  { value: 'VAN_HANH', label: 'Vận hành' },
  { value: 'KINH_DOANH', label: 'Kinh doanh' },
  { value: 'VAN_PHONG', label: 'Văn phòng' },
  { value: 'SAN_XUAT', label: 'Sản xuất' },
]

const LOAI_DON_VI_CON = [
  { value: 'TO', label: 'Tổ' },
  { value: 'NHOM', label: 'Nhóm' },
  { value: 'CA', label: 'Ca' },
]

const QUY_TAC_NGAY_CONG = [
  { value: 'SAT_HALF_SUN_OFF', label: 'Thứ 7 nửa ngày, Chủ nhật nghỉ' },
  { value: 'FULL', label: 'Làm cả tháng (không nghỉ T7/CN)' },
]

// Component hiển thị node trong cây
function TreeNode({ 
  node, 
  level = 0, 
  onEdit, 
  onDelete, 
  onAddChild,
  onManageDonViCon,
  expandedNodes,
  toggleExpand 
}: {
  node: PhongBan
  level?: number
  onEdit: (pb: PhongBan) => void
  onDelete: (pb: PhongBan) => void
  onAddChild: (parentId: number) => void
  onManageDonViCon: (pb: PhongBan) => void
  expandedNodes: Set<number>
  toggleExpand: (id: number) => void
}) {
  const hasChildren = node.children && node.children.length > 0
  const isExpanded = expandedNodes.has(node.id)

  return (
    <div>
      <div 
        className={`flex items-center gap-2 py-2 px-3 hover:bg-gray-50 rounded-lg group`}
        style={{ marginLeft: level * 24 }}
      >
        {/* Expand/Collapse button */}
        <button
          onClick={() => toggleExpand(node.id)}
          className={`w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 ${!hasChildren ? 'invisible' : ''}`}
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Icon */}
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          level === 0 ? 'bg-primary-100 text-primary-600' :
          level === 1 ? 'bg-blue-100 text-blue-600' :
          level === 2 ? 'bg-green-100 text-green-600' :
          'bg-orange-100 text-orange-600'
        }`}>
          {level === 0 ? <Building2 size={16} /> : <FolderTree size={16} />}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{node.tenPhongBan}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {node.maPhongBan}
            </span>
            {node.loaiPhongBan && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600">
                {LOAI_PHONG_BAN.find(l => l.value === node.loaiPhongBan)?.label || node.loaiPhongBan}
              </span>
            )}
          </div>
          {node.moTa && (
            <div className="text-xs text-gray-500 truncate">{node.moTa}</div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1 text-gray-500" title="Nhân viên">
            <Users size={14} />
            <span>{node._count?.nhanViens || 0}</span>
          </div>
          {(node._count?.donViCons || 0) > 0 && (
            <div className="flex items-center gap-1 text-gray-500" title="Đơn vị con">
              <Layers size={14} />
              <span>{node._count?.donViCons}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onAddChild(node.id)}
            className="p-1.5 text-green-600 hover:bg-green-50 rounded"
            title="Thêm phòng ban con"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={() => onManageDonViCon(node)}
            className="p-1.5 text-purple-600 hover:bg-purple-50 rounded"
            title="Quản lý Tổ/Ca"
          >
            <Layers size={16} />
          </button>
          <button
            onClick={() => onEdit(node)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
            title="Sửa"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(node)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
            title="Ngừng hoạt động"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
              onManageDonViCon={onManageDonViCon}
              expandedNodes={expandedNodes}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function QuanLyPhongBan() {
  const queryClient = useQueryClient()
  const [tuKhoa, setTuKhoa] = useState('')
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set())
  
  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [showDonViConModal, setShowDonViConModal] = useState(false)
  const [editing, setEditing] = useState<PhongBan | null>(null)
  const [parentId, setParentId] = useState<number | null>(null)
  const [selectedPhongBan, setSelectedPhongBan] = useState<PhongBan | null>(null)
  
  const [formData, setFormData] = useState({
    maPhongBan: '',
    tenPhongBan: '',
    moTa: '',
    loaiPhongBan: '',
    gioVaoChuan: '08:00',
    gioRaChuan: '17:00',
    phutChoPhepTre: 5,
    quyTacNgayCong: 'SAT_HALF_SUN_OFF',
    soNgayCongThang: null as number | null,
  })

  const [donViConForm, setDonViConForm] = useState({
    maDonVi: '',
    tenDonVi: '',
    loaiDonVi: 'TO',
  })

  // Lấy cây phòng ban
  const { data: cayPhongBan, isLoading } = useQuery({
    queryKey: ['phong-ban-cay'],
    queryFn: phongBanApi.layCayPhongBan,
  })

  // Lấy danh sách phòng ban phẳng (cho chọn parent)
  const { data: phongBans } = useQuery({
    queryKey: ['phong-ban'],
    queryFn: phongBanApi.layTatCa,
  })

  // Lấy đơn vị con
  const { data: donViCons, refetch: refetchDonViCon } = useQuery({
    queryKey: ['don-vi-con', selectedPhongBan?.id],
    queryFn: () => selectedPhongBan ? phongBanApi.layDonViCon(selectedPhongBan.id) : Promise.resolve([]),
    enabled: !!selectedPhongBan,
  })

  // Mutations
  const createMutation = useMutation({
    mutationFn: phongBanApi.taoMoi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phong-ban-cay'] })
      queryClient.invalidateQueries({ queryKey: ['phong-ban'] })
      handleCloseModal()
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || 'Có lỗi xảy ra')
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      phongBanApi.capNhat(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phong-ban-cay'] })
      queryClient.invalidateQueries({ queryKey: ['phong-ban'] })
      handleCloseModal()
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || 'Có lỗi xảy ra')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: phongBanApi.ngungHoatDong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['phong-ban-cay'] })
      queryClient.invalidateQueries({ queryKey: ['phong-ban'] })
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || 'Không thể ngừng hoạt động phòng ban')
    }
  })

  const createDonViConMutation = useMutation({
    mutationFn: ({ phongBanId, data }: { phongBanId: number; data: any }) =>
      phongBanApi.taoDonViCon(phongBanId, data),
    onSuccess: () => {
      refetchDonViCon()
      setDonViConForm({ maDonVi: '', tenDonVi: '', loaiDonVi: 'TO' })
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || 'Có lỗi xảy ra')
    }
  })

  const toggleExpand = (id: number) => {
    setExpandedNodes(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const expandAll = () => {
    const allIds = new Set<number>()
    const collectIds = (nodes: PhongBan[]) => {
      nodes.forEach(n => {
        allIds.add(n.id)
        if (n.children) collectIds(n.children)
      })
    }
    if (cayPhongBan) collectIds(cayPhongBan)
    setExpandedNodes(allIds)
  }

  const collapseAll = () => {
    setExpandedNodes(new Set())
  }

  const handleOpenCreate = (parentIdValue?: number) => {
    setEditing(null)
    setParentId(parentIdValue || null)
    setFormData({
      maPhongBan: '',
      tenPhongBan: '',
      moTa: '',
      loaiPhongBan: '',
      gioVaoChuan: '08:00',
      gioRaChuan: '17:00',
      phutChoPhepTre: 5,
      quyTacNgayCong: 'SAT_HALF_SUN_OFF',
      soNgayCongThang: null,
    })
    setShowModal(true)
  }

  const handleOpenEdit = (pb: PhongBan) => {
    setEditing(pb)
    setParentId(pb.phongBanChaId || null)
    setFormData({
      maPhongBan: pb.maPhongBan,
      tenPhongBan: pb.tenPhongBan,
      moTa: pb.moTa || '',
      loaiPhongBan: pb.loaiPhongBan || '',
      gioVaoChuan: pb.gioVaoChuan || '08:00',
      gioRaChuan: pb.gioRaChuan || '17:00',
      phutChoPhepTre: pb.phutChoPhepTre ?? 5,
      quyTacNgayCong: pb.quyTacNgayCong || 'SAT_HALF_SUN_OFF',
      soNgayCongThang: pb.soNgayCongThang ?? null,
    })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditing(null)
    setParentId(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.maPhongBan.trim() || !formData.tenPhongBan.trim()) {
      alert('Vui lòng nhập mã và tên phòng ban')
      return
    }

    const data = {
      ...formData,
      phongBanChaId: parentId || undefined,
      loaiPhongBan: formData.loaiPhongBan || undefined,
    }

    if (editing) {
      updateMutation.mutate({ id: editing.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  const handleDelete = (pb: PhongBan) => {
    if (confirm(`Bạn có chắc muốn ngừng hoạt động phòng ban "${pb.tenPhongBan}"?`)) {
      deleteMutation.mutate(pb.id)
    }
  }

  const handleOpenDonViConModal = (pb: PhongBan) => {
    setSelectedPhongBan(pb)
    setShowDonViConModal(true)
  }

  const handleCreateDonViCon = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPhongBan) return
    if (!donViConForm.maDonVi.trim() || !donViConForm.tenDonVi.trim()) {
      alert('Vui lòng nhập mã và tên đơn vị')
      return
    }
    createDonViConMutation.mutate({
      phongBanId: selectedPhongBan.id,
      data: donViConForm,
    })
  }

  // Tính tổng số phòng ban
  const countNodes = (nodes: PhongBan[]): number => {
    return nodes.reduce((sum, n) => sum + 1 + (n.children ? countNodes(n.children) : 0), 0)
  }
  const tongPhongBan = cayPhongBan ? countNodes(cayPhongBan) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-primary-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Phòng ban</h1>
            <p className="text-gray-500">Cấu trúc tổ chức công ty dạng cây phân cấp</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenCreate()}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus size={20} />
            Thêm phòng ban
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Tổng phòng ban</div>
            <div className="text-2xl font-bold text-gray-900">{tongPhongBan}</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Tổng nhân viên</div>
            <div className="text-2xl font-bold text-gray-900">
              {phongBans?.reduce((sum: number, pb: PhongBan) => sum + (pb._count?.nhanViens || 0), 0) || 0}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <Layers className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Tổng Tổ/Ca</div>
            <div className="text-2xl font-bold text-gray-900">
              {phongBans?.reduce((sum: number, pb: PhongBan) => sum + (pb._count?.donViCons || 0), 0) || 0}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <GitBranch className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Cấp sâu nhất</div>
            <div className="text-2xl font-bold text-gray-900">
              {Math.max(...(phongBans?.map((pb: PhongBan) => pb.capDo) || [0]), 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Tree View */}
      <div className="bg-white rounded-xl shadow-sm">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50"
            >
              Mở tất cả
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50"
            >
              Thu gọn
            </button>
          </div>
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full pl-9 pr-4 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-primary-500"
              value={tuKhoa}
              onChange={(e) => setTuKhoa(e.target.value)}
            />
          </div>
        </div>

        {/* Tree content */}
        <div className="p-4">
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Đang tải...</div>
          ) : !cayPhongBan || cayPhongBan.length === 0 ? (
            <div className="text-center py-8">
              <Building2 className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">Chưa có phòng ban nào</p>
              <button
                onClick={() => handleOpenCreate()}
                className="mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                + Thêm phòng ban đầu tiên
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              {cayPhongBan.map(node => (
                <TreeNode
                  key={node.id}
                  node={node}
                  onEdit={handleOpenEdit}
                  onDelete={handleDelete}
                  onAddChild={handleOpenCreate}
                  onManageDonViCon={handleOpenDonViConModal}
                  expandedNodes={expandedNodes}
                  toggleExpand={toggleExpand}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal Thêm/Sửa Phòng ban */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editing ? 'Cập nhật phòng ban' : 'Thêm phòng ban mới'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Phòng ban cha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phòng ban cha
                </label>
                <select
                  value={parentId || ''}
                  onChange={(e) => setParentId(e.target.value ? Number(e.target.value) : null)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">-- Không có (phòng ban gốc) --</option>
                  {phongBans?.filter((pb: PhongBan) => !editing || pb.id !== editing.id).map((pb: PhongBan) => (
                    <option key={pb.id} value={pb.id}>
                      {'—'.repeat(pb.capDo - 1)} {pb.tenPhongBan}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mã phòng ban <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.maPhongBan}
                    onChange={(e) => setFormData({ ...formData, maPhongBan: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="VD: HR, IT..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên phòng ban <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.tenPhongBan}
                    onChange={(e) => setFormData({ ...formData, tenPhongBan: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="VD: Phòng Nhân sự..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loại phòng ban
                  </label>
                  <select
                    value={formData.loaiPhongBan}
                    onChange={(e) => setFormData({ ...formData, loaiPhongBan: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">-- Chọn loại --</option>
                    {LOAI_PHONG_BAN.map(l => (
                      <option key={l.value} value={l.value}>{l.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả
                  </label>
                  <input
                    type="text"
                    value={formData.moTa}
                    onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Mô tả ngắn..."
                  />
                </div>
              </div>

              {/* Cấu hình giờ làm việc */}
              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-medium text-gray-900">Giờ làm việc</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giờ vào</label>
                    <input
                      type="time"
                      value={formData.gioVaoChuan}
                      onChange={(e) => setFormData({ ...formData, gioVaoChuan: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giờ ra</label>
                    <input
                      type="time"
                      value={formData.gioRaChuan}
                      onChange={(e) => setFormData({ ...formData, gioRaChuan: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cho phép trễ</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="60"
                        value={formData.phutChoPhepTre}
                        onChange={(e) => setFormData({ ...formData, phutChoPhepTre: Number(e.target.value) })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">phút</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cấu hình ngày công */}
              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-medium text-gray-900">Ngày làm việc</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quy tắc ngày công</label>
                    <select
                      value={formData.quyTacNgayCong}
                      onChange={(e) => setFormData({ ...formData, quyTacNgayCong: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      {QUY_TAC_NGAY_CONG.map((rule) => (
                        <option key={rule.value} value={rule.value}>
                          {rule.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số ngày công cố định</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="31"
                        value={formData.soNgayCongThang ?? ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            soNgayCongThang: e.target.value === '' ? null : Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 pr-12"
                        placeholder="VD: 26"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">ngày</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center col-span-2">
                    Nếu nhập số ngày cố định, hệ thống sẽ ưu tiên số này (kể cả làm Chủ nhật).
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                >
                  {createMutation.isPending || updateMutation.isPending ? 'Đang lưu...' : (editing ? 'Cập nhật' : 'Thêm mới')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Quản lý Đơn vị con */}
      {showDonViConModal && selectedPhongBan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Tổ/Ca/Nhóm - {selectedPhongBan.tenPhongBan}
              </h2>
              <button
                onClick={() => setShowDonViConModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Form thêm mới */}
            <form onSubmit={handleCreateDonViCon} className="flex items-end gap-3 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mã</label>
                <input
                  type="text"
                  value={donViConForm.maDonVi}
                  onChange={(e) => setDonViConForm({ ...donViConForm, maDonVi: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="TO_A"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
                <input
                  type="text"
                  value={donViConForm.tenDonVi}
                  onChange={(e) => setDonViConForm({ ...donViConForm, tenDonVi: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="Tổ A"
                />
              </div>
              <div className="w-32">
                <label className="block text-sm font-medium text-gray-700 mb-1">Loại</label>
                <select
                  value={donViConForm.loaiDonVi}
                  onChange={(e) => setDonViConForm({ ...donViConForm, loaiDonVi: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  {LOAI_DON_VI_CON.map(l => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={createDonViConMutation.isPending}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
              >
                <Plus size={18} />
              </button>
            </form>

            {/* Danh sách */}
            {donViCons && donViCons.length > 0 ? (
              <div className="divide-y">
                {donViCons.map((dvc: DonViCon) => (
                  <div key={dvc.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        dvc.loaiDonVi === 'TO' ? 'bg-blue-100 text-blue-600' :
                        dvc.loaiDonVi === 'NHOM' ? 'bg-green-100 text-green-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        <Layers size={16} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{dvc.tenDonVi}</div>
                        <div className="text-xs text-gray-500">
                          {dvc.maDonVi} • {LOAI_DON_VI_CON.find(l => l.value === dvc.loaiDonVi)?.label}
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      dvc.trangThai === 'HOAT_DONG' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {dvc.trangThai === 'HOAT_DONG' ? 'Hoạt động' : 'Ngừng'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Chưa có đơn vị con nào
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
