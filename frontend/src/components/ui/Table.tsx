// Table Component - Premium Style
import { forwardRef, HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'

// ============================================
// TABLE CONTAINER
// ============================================

export interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
  loading?: boolean
  empty?: boolean
  emptyMessage?: string
  emptyIcon?: ReactNode
}

export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  ({ className, loading, empty, emptyMessage = 'Không có dữ liệu', emptyIcon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-2xl',
          'bg-[var(--panel)] border border-[var(--border)]',
          className
        )}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 bg-[var(--panel)]/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-[var(--text-muted)]">Đang tải...</span>
            </div>
          </div>
        )}
        
        {empty ? (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            {emptyIcon && (
              <div className="w-16 h-16 rounded-2xl bg-[var(--bg-2)] flex items-center justify-center text-[var(--text-muted)] mb-4">
                {emptyIcon}
              </div>
            )}
            <p className="text-[var(--text-muted)]">{emptyMessage}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {children}
          </div>
        )}
      </div>
    )
  }
)

TableContainer.displayName = 'TableContainer'

// ============================================
// TABLE
// ============================================

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  compact?: boolean
  striped?: boolean
  hoverable?: boolean
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, compact, striped, hoverable = true, ...props }, ref) => {
    return (
      <table
        ref={ref}
        className={cn(
          'w-full text-sm',
          compact ? 'table-compact' : '',
          striped ? 'table-striped' : '',
          hoverable ? 'table-hoverable' : '',
          className
        )}
        {...props}
      />
    )
  }
)

Table.displayName = 'Table'

// ============================================
// TABLE HEAD
// ============================================

export const TableHead = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      'bg-[var(--bg-2)] border-b border-[var(--border)]',
      className
    )}
    {...props}
  />
))

TableHead.displayName = 'TableHead'

// ============================================
// TABLE BODY
// ============================================

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('divide-y divide-[var(--border)]', className)}
    {...props}
  />
))

TableBody.displayName = 'TableBody'

// ============================================
// TABLE ROW
// ============================================

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean
  clickable?: boolean
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, clickable, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'transition-colors',
        'hover:bg-[var(--bg-2)]',
        selected && 'bg-[var(--accent)]/5',
        clickable && 'cursor-pointer',
        className
      )}
      {...props}
    />
  )
)

TableRow.displayName = 'TableRow'

// ============================================
// TABLE HEADER CELL
// ============================================

export type SortDirection = 'asc' | 'desc' | null

export interface TableHeadCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  sortDirection?: SortDirection
  onSort?: () => void
  align?: 'left' | 'center' | 'right'
}

export const TableHeadCell = forwardRef<HTMLTableCellElement, TableHeadCellProps>(
  ({ className, children, sortable, sortDirection, onSort, align = 'left', ...props }, ref) => {
    const alignClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }

    return (
      <th
        ref={ref}
        className={cn(
          'px-4 py-3 font-semibold text-xs uppercase tracking-wider',
          'text-[var(--text-muted)]',
          alignClasses[align],
          sortable && 'cursor-pointer select-none hover:text-[var(--text-primary)] group',
          className
        )}
        onClick={sortable ? onSort : undefined}
        {...props}
      >
        <div className={cn(
          'inline-flex items-center gap-1.5',
          align === 'right' && 'flex-row-reverse',
          align === 'center' && 'justify-center'
        )}>
          {children}
          {sortable && (
            <span className={cn(
              'transition-colors',
              sortDirection ? 'text-[var(--accent)]' : 'text-[var(--text-disabled)] group-hover:text-[var(--text-muted)]'
            )}>
              {sortDirection === 'asc' ? (
                <ChevronUp size={14} />
              ) : sortDirection === 'desc' ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronsUpDown size={14} />
              )}
            </span>
          )}
        </div>
      </th>
    )
  }
)

TableHeadCell.displayName = 'TableHeadCell'

// ============================================
// TABLE CELL
// ============================================

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right'
  numeric?: boolean
  truncate?: boolean
  maxWidth?: number
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = 'left', numeric, truncate, maxWidth, style, ...props }, ref) => {
    const alignClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }

    return (
      <td
        ref={ref}
        className={cn(
          'px-4 py-3',
          'text-[var(--text-primary)]',
          alignClasses[align],
          numeric && 'tabular-nums font-medium',
          truncate && 'truncate',
          className
        )}
        style={{ maxWidth: maxWidth ? `${maxWidth}px` : undefined, ...style }}
        {...props}
      />
    )
  }
)

TableCell.displayName = 'TableCell'

// ============================================
// TABLE FOOTER
// ============================================

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'bg-[var(--bg-2)] border-t border-[var(--border)]',
      className
    )}
    {...props}
  />
))

TableFooter.displayName = 'TableFooter'

// ============================================
// TABLE ACTIONS (For row actions dropdown)
// ============================================

export interface TableActionsProps {
  children: ReactNode
  className?: string
}

export const TableActions = ({ children, className }: TableActionsProps) => {
  return (
    <div className={cn('flex items-center justify-end gap-1', className)}>
      {children}
    </div>
  )
}

// ============================================
// HELPER: Skeleton Row
// ============================================

export interface TableSkeletonProps {
  columns: number
  rows?: number
}

export const TableSkeleton = ({ columns, rows = 5 }: TableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <div className="h-4 bg-[var(--bg-3)] rounded animate-pulse" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export { TableContainer as default }
