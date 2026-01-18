// Badge Component - Premium Style
import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  size?: 'xs' | 'sm' | 'md'
  dot?: boolean
  icon?: ReactNode
  removable?: boolean
  onRemove?: () => void
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    className,
    variant = 'default',
    size = 'sm',
    dot = false,
    icon,
    removable = false,
    onRemove,
    children,
    ...props
  }, ref) => {
    const baseClasses = `
      inline-flex items-center gap-1.5
      font-medium rounded-full
      transition-colors duration-150
    `

    const variantClasses = {
      default: 'bg-[var(--accent)]/15 text-[var(--accent)]',
      success: 'bg-[#53F39A]/15 text-[#53F39A]',
      warning: 'bg-amber-500/15 text-amber-400',
      danger: 'bg-[#FF4D6D]/15 text-[#FF4D6D]',
      info: 'bg-[#4FC3FF]/15 text-[#4FC3FF]',
      neutral: 'bg-[var(--bg-3)] text-[var(--text-muted)]',
    }

    const sizeClasses = {
      xs: 'text-[10px] px-1.5 py-0.5',
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-2.5 py-1',
    }

    const dotColors = {
      default: 'bg-[var(--accent)]',
      success: 'bg-[#53F39A]',
      warning: 'bg-amber-400',
      danger: 'bg-[#FF4D6D]',
      info: 'bg-[#4FC3FF]',
      neutral: 'bg-[var(--text-muted)]',
    }

    return (
      <span
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span className={cn(
            'w-1.5 h-1.5 rounded-full animate-pulse',
            dotColors[variant]
          )} />
        )}
        {icon && (
          <span className="flex-shrink-0 w-3 h-3">{icon}</span>
        )}
        {children}
        {removable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.()
            }}
            className="ml-0.5 -mr-0.5 p-0.5 rounded-full hover:bg-white/20 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              className="w-3 h-3"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

// ============================================
// STATUS BADGE - For specific statuses
// ============================================

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'draft' | 'completed'
}

const statusConfig = {
  active: { label: 'Hoạt động', variant: 'success' as const },
  inactive: { label: 'Ngừng', variant: 'neutral' as const },
  pending: { label: 'Chờ duyệt', variant: 'warning' as const },
  approved: { label: 'Đã duyệt', variant: 'success' as const },
  rejected: { label: 'Từ chối', variant: 'danger' as const },
  draft: { label: 'Nháp', variant: 'neutral' as const },
  completed: { label: 'Hoàn thành', variant: 'info' as const },
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, className, ...props }, ref) => {
    const config = statusConfig[status]
    return (
      <Badge
        ref={ref}
        variant={config.variant}
        dot
        className={className}
        {...props}
      >
        {config.label}
      </Badge>
    )
  }
)

StatusBadge.displayName = 'StatusBadge'

// ============================================
// COUNTER BADGE - For notifications
// ============================================

export interface CounterBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  count: number
  max?: number
  variant?: 'default' | 'danger'
}

export const CounterBadge = forwardRef<HTMLSpanElement, CounterBadgeProps>(
  ({ count, max = 99, variant = 'danger', className, ...props }, ref) => {
    const displayCount = count > max ? `${max}+` : count

    const baseClasses = `
      inline-flex items-center justify-center
      min-w-[18px] h-[18px] px-1.5
      text-[10px] font-bold rounded-full
    `

    const variantClasses = {
      default: 'bg-[var(--accent)] text-[#0B1220]',
      danger: 'bg-[#FF4D6D] text-white',
    }

    if (count <= 0) return null

    return (
      <span
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], className)}
        {...props}
      >
        {displayCount}
      </span>
    )
  }
)

CounterBadge.displayName = 'CounterBadge'

export default Badge
