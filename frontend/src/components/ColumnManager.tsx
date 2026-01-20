// Component quản lý cột: sắp xếp drag-drop và toggle visibility
import { useState, useRef } from 'react'
import { Settings2, Eye, EyeOff, GripVertical, RotateCcw, ChevronDown } from 'lucide-react'
import { ColumnDef } from '../hooks/useColumnConfig'
import { cn } from '../utils/cn'

interface ColumnManagerProps {
  columns: ColumnDef[]
  onToggleColumn: (columnId: string) => void
  onMoveColumn: (fromIndex: number, toIndex: number) => void
  onReset: () => void
  onShowAll: () => void
}

export function ColumnManager({
  columns,
  onToggleColumn,
  onMoveColumn,
  onReset,
  onShowAll,
}: ColumnManagerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  // Setup click outside listener
  useState(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })

  const handleDragStart = (index: number) => {
    if (columns[index].sticky) return
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (columns[index].sticky) return
    setDragOverIndex(index)
  }

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      onMoveColumn(draggedIndex, dragOverIndex)
    }
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const visibleCount = columns.filter(c => c.visible).length
  const totalCount = columns.length

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all',
          'bg-[var(--bg-2)] hover:bg-[var(--bg-3)] border border-[var(--border)]',
          'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
          isOpen && 'bg-[var(--accent-light)] text-[var(--accent)] border-[var(--accent)]'
        )}
      >
        <Settings2 size={16} />
        Cột ({visibleCount}/{totalCount})
        <ChevronDown size={14} className={cn('transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 w-80 bg-white rounded-xl shadow-xl border border-[var(--border)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="p-3 bg-[var(--bg-2)] border-b border-[var(--border)] flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--text-primary)]">
              Quản lý cột hiển thị
            </span>
            <div className="flex gap-1">
              <button
                onClick={onShowAll}
                className="p-1.5 rounded-lg hover:bg-[var(--bg-3)] text-[var(--text-muted)] hover:text-[var(--accent)]"
                title="Hiện tất cả"
              >
                <Eye size={14} />
              </button>
              <button
                onClick={onReset}
                className="p-1.5 rounded-lg hover:bg-[var(--bg-3)] text-[var(--text-muted)] hover:text-[var(--accent)]"
                title="Khôi phục mặc định"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Column list */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {columns.map((col, index) => (
              <div
                key={col.id}
                draggable={!col.sticky}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={cn(
                  'flex items-center gap-2 p-2 rounded-lg transition-all',
                  'hover:bg-[var(--bg-2)]',
                  col.sticky && 'opacity-60',
                  draggedIndex === index && 'opacity-50 bg-[var(--accent-light)]',
                  dragOverIndex === index && draggedIndex !== null && 'border-t-2 border-[var(--accent)]'
                )}
              >
                {/* Drag handle */}
                <div
                  className={cn(
                    'cursor-grab active:cursor-grabbing text-[var(--text-disabled)]',
                    col.sticky && 'invisible'
                  )}
                >
                  <GripVertical size={14} />
                </div>

                {/* Visibility toggle */}
                <button
                  onClick={() => !col.sticky && onToggleColumn(col.id)}
                  disabled={col.sticky}
                  className={cn(
                    'p-1 rounded transition-colors',
                    col.visible 
                      ? 'text-[var(--accent)] hover:bg-[var(--accent-light)]' 
                      : 'text-[var(--text-disabled)] hover:bg-[var(--bg-3)]',
                    col.sticky && 'cursor-not-allowed'
                  )}
                >
                  {col.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>

                {/* Label */}
                <span className={cn(
                  'flex-1 text-sm',
                  col.visible ? 'text-[var(--text-primary)]' : 'text-[var(--text-disabled)]'
                )}>
                  {col.label}
                </span>

                {/* Sticky indicator */}
                {col.sticky && (
                  <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-2)] px-1.5 py-0.5 rounded">
                    Cố định
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Footer hint */}
          <div className="p-2 bg-[var(--bg-2)] border-t border-[var(--border)]">
            <p className="text-[10px] text-[var(--text-muted)] text-center">
              Kéo thả để sắp xếp • Click biểu tượng mắt để ẩn/hiện
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ColumnManager
