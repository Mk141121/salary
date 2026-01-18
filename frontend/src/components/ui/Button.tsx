// Button Component - Premium Pill Style
import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'md' | 'lg' | 'xl' | 'full'
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    rounded = 'xl',
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    disabled,
    children,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading

    const baseClasses = `
      inline-flex items-center justify-center gap-2
      font-medium transition-all duration-200
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]
      disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-[0.98]
    `

    const variantClasses = {
      primary: `
        bg-[var(--accent)] text-[#0B1220]
        hover:bg-[var(--accent)]/90
        shadow-lg shadow-[var(--accent)]/25
      `,
      secondary: `
        bg-[var(--bg-2)] text-[var(--text-primary)]
        border border-[var(--border)]
        hover:bg-[var(--bg-3)] hover:border-[var(--accent)]/30
      `,
      outline: `
        bg-transparent text-[var(--text-primary)]
        border-2 border-[var(--border)]
        hover:bg-[var(--bg-2)] hover:border-[var(--accent)]/50
      `,
      ghost: `
        bg-transparent text-[var(--text-secondary)]
        hover:bg-[var(--bg-2)] hover:text-[var(--text-primary)]
      `,
      danger: `
        bg-[#FF4D6D] text-white
        hover:bg-[#FF4D6D]/90
        shadow-lg shadow-[#FF4D6D]/25
      `,
      success: `
        bg-[#53F39A] text-[#0B1220]
        hover:bg-[#53F39A]/90
        shadow-lg shadow-[#53F39A]/25
      `,
    }

    const sizeClasses = {
      xs: 'text-xs px-2.5 py-1.5 h-7',
      sm: 'text-sm px-3 py-2 h-8',
      md: 'text-sm px-4 py-2.5 h-10',
      lg: 'text-base px-5 py-3 h-11',
      xl: 'text-base px-6 py-3.5 h-12',
    }

    const roundedClasses = {
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          roundedClasses[rounded],
          fullWidth && 'w-full',
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        {children && <span>{children}</span>}
        {!loading && icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

// ============================================
// ICON BUTTON
// ============================================

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  loading?: boolean
  tooltip?: string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({
    className,
    variant = 'ghost',
    size = 'md',
    loading = false,
    tooltip,
    disabled,
    children,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading

    const baseClasses = `
      inline-flex items-center justify-center
      rounded-xl transition-all duration-200
      focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]
      disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-95
    `

    const variantClasses = {
      primary: `
        bg-[var(--accent)] text-[#0B1220]
        hover:bg-[var(--accent)]/80
      `,
      secondary: `
        bg-[var(--bg-2)] text-[var(--text-secondary)]
        hover:bg-[var(--bg-3)] hover:text-[var(--text-primary)]
      `,
      ghost: `
        text-[var(--text-muted)]
        hover:bg-[var(--bg-2)] hover:text-[var(--text-primary)]
      `,
      danger: `
        text-[#FF4D6D]
        hover:bg-[#FF4D6D]/10
      `,
    }

    const sizeClasses = {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={isDisabled}
        title={tooltip}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          children
        )}
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'

// ============================================
// BUTTON GROUP
// ============================================

export interface ButtonGroupProps {
  children: ReactNode
  className?: string
}

export const ButtonGroup = ({ children, className }: ButtonGroupProps) => {
  return (
    <div className={cn('inline-flex items-center', className)}>
      {children}
    </div>
  )
}

export default Button
