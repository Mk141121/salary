// Input Component - Premium Style
import { forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react'
import { cn } from '../../utils/cn'
import { Eye, EyeOff, Search, X } from 'lucide-react'

// ============================================
// INPUT BASE
// ============================================

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'ghost'
  error?: boolean
  success?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  clearable?: boolean
  onClear?: () => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = 'text',
    size = 'md',
    variant = 'default',
    error = false,
    success = false,
    icon,
    iconPosition = 'left',
    clearable = false,
    onClear,
    value,
    ...props
  }, ref) => {
    const baseClasses = `
      w-full transition-all duration-200
      placeholder:text-[var(--text-disabled)]
      focus:outline-none
      disabled:opacity-50 disabled:cursor-not-allowed
    `

    const variantClasses = {
      default: `
        bg-[var(--bg-1)] 
        border border-[var(--border)]
        focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20
      `,
      filled: `
        bg-[var(--bg-2)] 
        border border-transparent
        focus:bg-[var(--bg-1)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20
      `,
      ghost: `
        bg-transparent 
        border border-transparent
        hover:bg-[var(--bg-2)]
        focus:bg-[var(--bg-2)] focus:border-[var(--border)]
      `,
    }

    const sizeClasses = {
      sm: 'h-8 px-3 text-sm rounded-lg',
      md: 'h-10 px-4 text-sm rounded-xl',
      lg: 'h-12 px-4 text-base rounded-xl',
    }

    const stateClasses = error
      ? 'border-[#FF4D6D] focus:border-[#FF4D6D] focus:ring-[#FF4D6D]/20'
      : success
        ? 'border-[#53F39A] focus:border-[#53F39A] focus:ring-[#53F39A]/20'
        : ''

    const hasIcon = !!icon
    const hasClear = clearable && value
    const paddingLeft = hasIcon && iconPosition === 'left' ? 'pl-10' : ''
    const paddingRight = (hasIcon && iconPosition === 'right') || hasClear ? 'pr-10' : ''

    return (
      <div className="relative">
        {/* Left Icon */}
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
            {icon}
          </div>
        )}

        <input
          ref={ref}
          type={type}
          value={value}
          className={cn(
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            stateClasses,
            paddingLeft,
            paddingRight,
            'text-[var(--text-primary)]',
            className
          )}
          {...props}
        />

        {/* Right Icon or Clear */}
        {(icon && iconPosition === 'right' && !hasClear) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
            {icon}
          </div>
        )}

        {hasClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-3)] transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// ============================================
// SEARCH INPUT
// ============================================

export interface SearchInputProps extends Omit<InputProps, 'icon' | 'iconPosition' | 'type'> {
  onSearch?: (value: string) => void
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="search"
        icon={<Search size={18} />}
        iconPosition="left"
        clearable
        placeholder="Tìm kiếm..."
        className={className}
        {...props}
      />
    )
  }
)

SearchInput.displayName = 'SearchInput'

// ============================================
// PASSWORD INPUT
// ============================================

export const PasswordInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-10', className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-3)] transition-colors"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

// ============================================
// TEXTAREA
// ============================================

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'filled'
  error?: boolean
  success?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', error, success, ...props }, ref) => {
    const baseClasses = `
      w-full min-h-[100px] px-4 py-3
      text-sm text-[var(--text-primary)]
      rounded-xl resize-y
      transition-all duration-200
      placeholder:text-[var(--text-disabled)]
      focus:outline-none
      disabled:opacity-50 disabled:cursor-not-allowed
    `

    const variantClasses = {
      default: `
        bg-[var(--bg-1)] 
        border border-[var(--border)]
        focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20
      `,
      filled: `
        bg-[var(--bg-2)] 
        border border-transparent
        focus:bg-[var(--bg-1)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20
      `,
    }

    const stateClasses = error
      ? 'border-[#FF4D6D] focus:border-[#FF4D6D] focus:ring-[#FF4D6D]/20'
      : success
        ? 'border-[#53F39A] focus:border-[#53F39A] focus:ring-[#53F39A]/20'
        : ''

    return (
      <textarea
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          stateClasses,
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

// ============================================
// FORM FIELD WRAPPER
// ============================================

export interface FormFieldProps {
  label?: string
  required?: boolean
  error?: string
  hint?: string
  children: ReactNode
  className?: string
}

export const FormField = ({
  label,
  required = false,
  error,
  hint,
  children,
  className,
}: FormFieldProps) => {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          {label}
          {required && <span className="text-[#FF4D6D] ml-0.5">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs text-[#FF4D6D] flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-[#FF4D6D]" />
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-[var(--text-muted)]">{hint}</p>
      )}
    </div>
  )
}

export default Input
