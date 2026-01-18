// Card Component - Premium Glassmorphism Style
import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

// ============================================
// CARD BASE
// ============================================

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'bordered' | 'gradient'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  clickable?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'md',
    hover = false,
    clickable = false,
    children, 
    ...props 
  }, ref) => {
    const baseClasses = 'rounded-2xl transition-all duration-200'
    
    const variantClasses = {
      default: 'bg-[var(--panel)] border border-[var(--border)]',
      glass: `
        bg-[var(--panel)]/80 backdrop-blur-xl 
        border border-white/10 
        shadow-lg shadow-black/5
      `,
      elevated: `
        bg-[var(--panel)] 
        border border-[var(--border)]
        shadow-xl shadow-black/10
      `,
      bordered: 'bg-transparent border-2 border-[var(--border)]',
      gradient: `
        bg-gradient-to-br from-[var(--panel)] to-[var(--bg-2)]
        border border-[var(--border)]
      `,
    }

    const paddingClasses = {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-6',
      xl: 'p-8',
    }

    const hoverClasses = hover ? 'hover:shadow-xl hover:border-[var(--accent)]/30 hover:-translate-y-0.5' : ''
    const clickableClasses = clickable ? 'cursor-pointer active:scale-[0.99]' : ''

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          paddingClasses[padding],
          hoverClasses,
          clickableClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// ============================================
// CARD HEADER
// ============================================

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode
  subtitle?: ReactNode
  action?: ReactNode
  icon?: ReactNode
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, action, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start justify-between gap-4 mb-4',
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {icon && (
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            {title && (
              <h3 className="text-lg font-semibold text-[var(--text-primary)] truncate">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-[var(--text-muted)] mt-0.5">
                {subtitle}
              </p>
            )}
            {children}
          </div>
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

// ============================================
// CARD CONTENT
// ============================================

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('', className)}
    {...props}
  />
))

CardContent.displayName = 'CardContent'

// ============================================
// CARD FOOTER
// ============================================

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  separator?: boolean
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, separator = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between gap-4 mt-4 pt-4',
        separator && 'border-t border-[var(--border)]',
        className
      )}
      {...props}
    />
  )
)

CardFooter.displayName = 'CardFooter'

// ============================================
// STAT CARD - For Dashboard
// ============================================

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  subtitle?: string
  icon?: ReactNode
  trend?: {
    value: number
    direction: 'up' | 'down' | 'neutral'
  }
  accentColor?: 'green' | 'cyan' | 'yellow' | 'red' | 'purple'
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ 
    className, 
    title, 
    value, 
    subtitle, 
    icon, 
    trend,
    accentColor = 'green',
    ...props 
  }, ref) => {
    const accentColors = {
      green: {
        bg: 'bg-[#53F39A]/10',
        text: 'text-[#53F39A]',
        glow: 'shadow-[#53F39A]/20',
      },
      cyan: {
        bg: 'bg-[#4FC3FF]/10',
        text: 'text-[#4FC3FF]',
        glow: 'shadow-[#4FC3FF]/20',
      },
      yellow: {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        glow: 'shadow-amber-500/20',
      },
      red: {
        bg: 'bg-[#FF4D6D]/10',
        text: 'text-[#FF4D6D]',
        glow: 'shadow-[#FF4D6D]/20',
      },
      purple: {
        bg: 'bg-purple-500/10',
        text: 'text-purple-400',
        glow: 'shadow-purple-500/20',
      },
    }

    const colors = accentColors[accentColor]

    const trendColors = {
      up: 'text-[#53F39A]',
      down: 'text-[#FF4D6D]',
      neutral: 'text-[var(--text-muted)]',
    }

    const trendIcons = {
      up: '↑',
      down: '↓',
      neutral: '→',
    }

    return (
      <Card
        ref={ref}
        variant="glass"
        className={cn(
          'group hover:shadow-lg',
          colors.glow,
          className
        )}
        hover
        {...props}
      >
        <div className="flex items-start justify-between">
          {/* Icon */}
          {icon && (
            <div className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110',
              colors.bg,
              colors.text
            )}>
              {icon}
            </div>
          )}

          {/* Trend */}
          {trend && (
            <div className={cn(
              'flex items-center gap-1 text-sm font-medium',
              trendColors[trend.direction]
            )}>
              <span>{trendIcons[trend.direction]}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mt-4">
          <p className="text-3xl font-bold text-[var(--text-primary)] tabular-nums">
            {typeof value === 'number' ? value.toLocaleString('vi-VN') : value}
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-1">{title}</p>
          {subtitle && (
            <p className="text-xs text-[var(--text-disabled)] mt-0.5">{subtitle}</p>
          )}
        </div>
      </Card>
    )
  }
)

StatCard.displayName = 'StatCard'

export default Card
