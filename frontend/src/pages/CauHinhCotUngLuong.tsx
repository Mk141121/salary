// Cấu hình cột Bảng ứng lương - Áp dụng GLOBAL cho tất cả bảng ứng lương
import { useMemo, useState } from 'react'
import { 
  Settings2, 
  Eye, 
  EyeOff, 
  GripVertical, 
  RotateCcw, 
  Save,
  Info,
  CheckCircle
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useColumnConfig, createUngLuongColumns } from '../hooks/useColumnConfig'
import { cn } from '../utils/cn'

export default function CauHinhCotUngLuong() {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  // Tạo danh sách cột mẫu cho ứng lương
  const defaultColumns = useMemo(() => createUngLuongColumns(), [])

  const {
    columns,
    visibleColumns,
    toggleColumn,
    moveColumn,
    resetColumns,
    showAllColumns,
  } = useColumnConfig('global_ung_luong', defaultColumns)

  // Drag handlers
  const handleDragStart = (index: number) => {
    const col = columns[index]
    if (col.sticky) return
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (columns[index].sticky) return
    setDragOverIndex(index)
  }

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      moveColumn(draggedIndex, dragOverIndex)
      toast.success('Đã thay đổi thứ tự cột')
    }
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleToggle = (colId: string) => {
    toggleColumn(colId)
    const col = columns.find(c => c.id === colId)
    if (col) {
      toast.success(col.visible ? `Đã ẩn cột "${col.label}"` : `Đã hiện cột "${col.label}"`)
    }
  }

  const handleReset = () => {
    resetColumns()
    toast.success('Đã khôi phục cấu hình mặc định')
  }

  const handleShowAll = () => {
    showAllColumns()
    toast.success('Đã hiện tất cả các cột')
  }

  // Phân loại cột
  const stickyColumns = columns.filter(c => c.sticky)
  const normalColumns = columns.filter(c => !c.sticky)

  const visibleCount = visibleColumns.length
  const totalCount = columns.length

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <Settings2 className="text-purple-500" />
          Cấu hình cột Bảng ứng lương
        </h1>
        <p className="text-gray-500 mt-1">
          Thiết lập các cột hiển thị và thứ tự sắp xếp cho tất cả bảng ứng lương
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Info className="text-purple-500 flex-shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-purple-800">
          <p className="font-medium mb-1">Cấu hình này áp dụng cho TẤT CẢ bảng ứng lương</p>
          <ul className="list-disc list-inside space-y-1 text-purple-700">
            <li>Các cột cố định (STT, Mã NV, Họ tên) không thể ẩn hoặc di chuyển</li>
            <li>Kéo thả để sắp xếp thứ tự các cột</li>
            <li>Thay đổi được lưu tự động</li>
          </ul>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Đang hiển thị: <strong className="text-purple-600">{visibleCount}</strong> / {totalCount} cột
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleShowAll}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Eye size={16} />
            Hiện tất cả
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={16} />
            Khôi phục mặc định
          </button>
        </div>
      </div>

      {/* Sticky Columns Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="font-medium text-gray-700 flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            Cột cố định (không thể thay đổi)
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {stickyColumns.map((col) => (
            <div
              key={col.id}
              className="flex items-center gap-3 px-4 py-3 bg-gray-50/50"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <GripVertical size={16} className="text-gray-300" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-700">{col.label}</span>
                {col.width && (
                  <span className="ml-2 text-xs text-gray-400">({col.width})</span>
                )}
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <Eye size={16} className="text-green-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Normal Columns Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="font-medium text-gray-700 flex items-center gap-2">
            <GripVertical size={16} className="text-gray-400" />
            Cột có thể tùy chỉnh (kéo thả để sắp xếp)
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {normalColumns.map((col) => {
            const actualIndex = columns.findIndex(c => c.id === col.id)
            const isDragging = draggedIndex === actualIndex
            const isDragOver = dragOverIndex === actualIndex

            return (
              <div
                key={col.id}
                draggable={!col.sticky}
                onDragStart={() => handleDragStart(actualIndex)}
                onDragOver={(e) => handleDragOver(e, actualIndex)}
                onDragEnd={handleDragEnd}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 transition-all',
                  isDragging && 'opacity-50 bg-purple-50',
                  isDragOver && 'bg-purple-100 border-t-2 border-purple-400',
                  !col.visible && 'bg-gray-50'
                )}
              >
                <div className="w-6 h-6 flex items-center justify-center cursor-grab active:cursor-grabbing">
                  <GripVertical size={16} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <span className={cn(
                    'text-sm font-medium',
                    col.visible ? 'text-gray-700' : 'text-gray-400'
                  )}>
                    {col.label}
                  </span>
                </div>
                <button
                  onClick={() => handleToggle(col.id)}
                  className={cn(
                    'w-8 h-8 flex items-center justify-center rounded-lg transition-colors',
                    col.visible 
                      ? 'text-green-500 hover:bg-green-50' 
                      : 'text-gray-400 hover:bg-gray-100'
                  )}
                  title={col.visible ? 'Ẩn cột' : 'Hiện cột'}
                >
                  {col.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Saved Indicator */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600">
        <Save size={16} />
        Thay đổi được lưu tự động
      </div>
    </div>
  )
}
