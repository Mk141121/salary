// Utility functions - Các hàm tiện ích

/**
 * Format số tiền VND
 */
export function formatTien(soTien: number | string | undefined): string {
  if (soTien === undefined || soTien === null) return '0'
  const so = typeof soTien === 'string' ? parseFloat(soTien) : soTien
  if (isNaN(so)) return '0'
  return new Intl.NumberFormat('vi-VN').format(so)
}

/**
 * Parse chuỗi tiền về số
 */
export function parseTien(chuoi: string): number {
  if (!chuoi) return 0
  // Loại bỏ tất cả ký tự không phải số
  const cleaned = chuoi.replace(/[^\d]/g, '')
  return parseInt(cleaned, 10) || 0
}

/**
 * Format ngày tháng
 */
export function formatNgay(ngay: string | Date | undefined): string {
  if (!ngay) return ''
  const d = new Date(ngay)
  return d.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

/**
 * Format ngày giờ
 */
export function formatNgayGio(ngay: string | Date | undefined): string {
  if (!ngay) return ''
  const d = new Date(ngay)
  return d.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Lấy tên tháng
 */
export function layTenThang(thang: number): string {
  const tenThang = [
    '', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ]
  return tenThang[thang] || ''
}

/**
 * Lấy class cho badge trạng thái
 */
export function layClassTrangThai(trangThai: string): string {
  switch (trangThai) {
    case 'NHAP':
      return 'badge badge-nhap'
    case 'DA_CHOT':
      return 'badge badge-da-chot'
    case 'KHOA':
      return 'badge badge-khoa'
    default:
      return 'badge'
  }
}

/**
 * Lấy tên hiển thị cho trạng thái
 */
export function layTenTrangThai(trangThai: string): string {
  switch (trangThai) {
    case 'NHAP':
      return 'Đang nhập'
    case 'DA_CHOT':
      return 'Đã chốt'
    case 'KHOA':
      return 'Đã khóa'
    default:
      return trangThai
  }
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * Download file từ blob
 */
export function downloadFile(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}
