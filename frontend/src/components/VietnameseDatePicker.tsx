// Vietnamese Date Picker Component
// Thay thế native date input với picker 100% tiếng Việt

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

const THANG_VIET = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
  'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
  'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
]

const THANG_NGAN = [
  'Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6',
  'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'
]

const NGAY_TRONG_TUAN = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

interface VietnameseDatePickerProps {
  value: string // YYYY-MM-DD format
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  min?: string
  max?: string
  disabled?: boolean
}

export function VietnameseDatePicker({
  value,
  onChange,
  className = '',
  placeholder = 'Chọn ngày',
  min,
  max,
  disabled = false,
}: VietnameseDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => {
    if (value) return new Date(value)
    return new Date()
  })
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedDate = value ? new Date(value) : null

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`
  }

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonth = () => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const handleDateSelect = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
    const formatted = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    onChange(formatted)
    setIsOpen(false)
  }

  const isDateDisabled = (day: number) => {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
    if (min && date < new Date(min)) return true
    if (max && date > new Date(max)) return true
    return false
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      viewDate.getFullYear() === today.getFullYear() &&
      viewDate.getMonth() === today.getMonth() &&
      day === today.getDate()
    )
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return (
      viewDate.getFullYear() === selectedDate.getFullYear() &&
      viewDate.getMonth() === selectedDate.getMonth() &&
      day === selectedDate.getDate()
    )
  }

  const renderCalendar = () => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const days: (number | null)[] = []
    
    // Empty cells for days before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    
    // Days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Header */}
        {NGAY_TRONG_TUAN.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
        
        {/* Days */}
        {days.map((day, idx) => (
          <div key={idx} className="aspect-square">
            {day !== null && (
              <button
                type="button"
                disabled={isDateDisabled(day)}
                onClick={() => handleDateSelect(day)}
                className={`
                  w-full h-full rounded-lg text-sm transition-colors
                  ${isSelected(day) 
                    ? 'bg-primary-600 text-white' 
                    : isToday(day)
                      ? 'bg-primary-100 text-primary-700'
                      : 'hover:bg-gray-100'
                  }
                  ${isDateDisabled(day) ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={formatDisplayDate(value)}
          readOnly
          onClick={() => !disabled && setIsOpen(!isOpen)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-3 py-2 pr-10 border rounded-lg cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            ${className}
          `}
        />
        <Calendar 
          size={18} 
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 p-3 bg-white rounded-xl shadow-lg border min-w-[280px]">
          {/* Month/Year navigation */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-medium">
              {THANG_VIET[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {renderCalendar()}

          {/* Quick actions */}
          <div className="flex justify-between mt-3 pt-3 border-t">
            <button
              type="button"
              onClick={() => {
                onChange('')
                setIsOpen(false)
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Xóa
            </button>
            <button
              type="button"
              onClick={() => {
                const today = new Date()
                const formatted = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`
                onChange(formatted)
                setIsOpen(false)
              }}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Hôm nay
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Vietnamese Month Picker
interface VietnameseMonthPickerProps {
  value: string // YYYY-MM format
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  disabled?: boolean
}

export function VietnameseMonthPicker({
  value,
  onChange,
  className = '',
  placeholder = 'Chọn tháng',
  disabled = false,
}: VietnameseMonthPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewYear, setViewYear] = useState(() => {
    if (value) return parseInt(value.split('-')[0])
    return new Date().getFullYear()
  })
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const formatDisplayMonth = (monthStr: string) => {
    if (!monthStr) return ''
    const [year, month] = monthStr.split('-')
    return `${THANG_VIET[parseInt(month) - 1]} ${year}`
  }

  const handleMonthSelect = (monthIndex: number) => {
    const formatted = `${viewYear}-${(monthIndex + 1).toString().padStart(2, '0')}`
    onChange(formatted)
    setIsOpen(false)
  }

  const isSelected = (monthIndex: number) => {
    if (!value) return false
    const [year, month] = value.split('-')
    return parseInt(year) === viewYear && parseInt(month) === monthIndex + 1
  }

  const isCurrentMonth = (monthIndex: number) => {
    const now = new Date()
    return viewYear === now.getFullYear() && monthIndex === now.getMonth()
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={formatDisplayMonth(value)}
          readOnly
          onClick={() => !disabled && setIsOpen(!isOpen)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-3 py-2 pr-10 border rounded-lg cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            ${className}
          `}
        />
        <Calendar 
          size={18} 
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 p-3 bg-white rounded-xl shadow-lg border min-w-[280px]">
          {/* Year navigation */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => setViewYear(prev => prev - 1)}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-medium text-lg">{viewYear}</span>
            <button
              type="button"
              onClick={() => setViewYear(prev => prev + 1)}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Months grid */}
          <div className="grid grid-cols-4 gap-2">
            {THANG_NGAN.map((month, idx) => (
              <button
                key={month}
                type="button"
                onClick={() => handleMonthSelect(idx)}
                className={`
                  py-2 px-1 rounded-lg text-sm transition-colors
                  ${isSelected(idx)
                    ? 'bg-primary-600 text-white'
                    : isCurrentMonth(idx)
                      ? 'bg-primary-100 text-primary-700'
                      : 'hover:bg-gray-100'
                  }
                `}
              >
                {month}
              </button>
            ))}
          </div>

          {/* Quick actions */}
          <div className="flex justify-between mt-3 pt-3 border-t">
            <button
              type="button"
              onClick={() => {
                onChange('')
                setIsOpen(false)
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Xóa
            </button>
            <button
              type="button"
              onClick={() => {
                const now = new Date()
                const formatted = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`
                onChange(formatted)
                setIsOpen(false)
              }}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Tháng này
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Export helper để format ngày theo tiếng Việt
export function formatNgayViet(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`
}

export function formatThangViet(monthStr: string): string {
  if (!monthStr) return ''
  const [year, month] = monthStr.split('-')
  return `Tháng ${parseInt(month)}/${year}`
}
