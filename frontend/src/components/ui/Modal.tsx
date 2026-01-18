// Modal Component - Premium Glassmorphism Style
import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'
import { X } from 'lucide-react'
import { Button, IconButton } from './Button'

// ============================================
// MODAL
// ============================================

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
  className?: string
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  closable = true,
  closeOnOverlay = true,
  closeOnEscape = true,
  className,
}: ModalProps) => {
  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeOnEscape, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90vw]',
  }

  const modalContent = (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-black/60 backdrop-blur-md',
          'animate-in fade-in duration-200'
        )}
        onClick={closeOnOverlay ? onClose : undefined}
      />

      {/* Modal Content */}
      <div
        className={cn(
          'relative w-full',
          sizeClasses[size],
          'bg-[var(--panel)]/95 backdrop-blur-xl',
          'border border-[var(--border)]',
          'rounded-2xl shadow-2xl shadow-black/40',
          'animate-in fade-in zoom-in-95 duration-200',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {closable && (
          <IconButton
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-10"
          >
            <X size={18} />
          </IconButton>
        )}
        {children}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

// ============================================
// MODAL HEADER
// ============================================

export interface ModalHeaderProps {
  title: ReactNode
  subtitle?: ReactNode
  icon?: ReactNode
  className?: string
}

export const ModalHeader = ({ title, subtitle, icon, className }: ModalHeaderProps) => {
  return (
    <div className={cn('px-6 pt-6 pb-4', className)}>
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0 pr-8">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-[var(--text-muted)] mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================
// MODAL BODY
// ============================================

export interface ModalBodyProps {
  children: ReactNode
  className?: string
  padding?: boolean
}

export const ModalBody = ({ children, className, padding = true }: ModalBodyProps) => {
  return (
    <div className={cn(
      'max-h-[60vh] overflow-y-auto modal-scroll',
      padding && 'px-6 py-4',
      className
    )}>
      {children}
    </div>
  )
}

// ============================================
// MODAL FOOTER
// ============================================

export interface ModalFooterProps {
  children: ReactNode
  className?: string
}

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return (
    <div className={cn(
      'flex items-center justify-end gap-3',
      'px-6 py-4',
      'border-t border-[var(--border)]',
      'bg-[var(--bg-2)]/50',
      className
    )}>
      {children}
    </div>
  )
}

// ============================================
// CONFIRM MODAL
// ============================================

export interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: ReactNode
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  loading?: boolean
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Huỷ',
  variant = 'danger',
  loading = false,
}: ConfirmModalProps) => {
  const iconColors = {
    danger: 'text-[#FF4D6D] bg-[#FF4D6D]/10',
    warning: 'text-amber-400 bg-amber-500/10',
    info: 'text-[#4FC3FF] bg-[#4FC3FF]/10',
  }

  const confirmVariants = {
    danger: 'danger',
    warning: 'primary',
    info: 'primary',
  } as const

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" closable={false}>
      <div className="p-6 text-center">
        {/* Icon */}
        <div className={cn(
          'w-16 h-16 rounded-2xl mx-auto mb-4',
          'flex items-center justify-center',
          iconColors[variant]
        )}>
          {variant === 'danger' && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          )}
          {variant === 'warning' && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          )}
          {variant === 'info' && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-sm text-[var(--text-muted)] mb-6">
          {message}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant={confirmVariants[variant]}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default Modal
