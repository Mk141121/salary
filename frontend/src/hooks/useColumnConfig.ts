// Hook quản lý cấu hình cột: sắp xếp, ẩn/hiện
// Cấu hình GLOBAL - áp dụng cho tất cả bảng cùng loại
import { useState, useCallback, useEffect, useRef, useMemo } from 'react'

export interface ColumnDef {
  id: string
  label: string
  visible: boolean
  order: number
  sticky?: boolean  // Cột cố định không thể ẩn/sắp xếp
  width?: string
  align?: 'left' | 'center' | 'right'
  bgColor?: string
}

export interface ColumnConfig {
  columns: ColumnDef[]
  version: number
}

const STORAGE_PREFIX = 'column_config_'

export function useColumnConfig(
  tableId: string, 
  defaultColumns: ColumnDef[]
) {
  const storageKey = `${STORAGE_PREFIX}${tableId}`
  const prevDefaultColsRef = useRef<string>('')
  
  // Load từ localStorage hoặc dùng default
  const [columns, setColumns] = useState<ColumnDef[]>([])

  // Merge saved config với default columns hiện tại
  // Điều này đảm bảo cột mới được thêm, cột cũ giữ cấu hình
  const mergedColumns = useMemo(() => {
    if (defaultColumns.length === 0) return []
    
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const config: ColumnConfig = JSON.parse(saved)
        const savedMap = new Map(config.columns.map(c => [c.id, c]))
        
        // Merge: ưu tiên cấu hình saved cho cột cố định
        // Cột động (kl_*) dùng default nếu không có trong saved
        return defaultColumns.map((def, index) => {
          const savedCol = savedMap.get(def.id)
          if (savedCol) {
            // Giữ visible và order từ saved
            return {
              ...def,
              visible: savedCol.visible,
              order: savedCol.order,
            }
          }
          // Cột mới, dùng default
          return { ...def, order: 100 + index } // Đặt cuối
        }).sort((a, b) => a.order - b.order)
      }
    } catch (e) {
      console.warn('Failed to load column config:', e)
    }
    
    // Không có saved, dùng default
    return defaultColumns.map((c, i) => ({ ...c, order: i }))
  }, [defaultColumns, storageKey])

  // Cập nhật columns khi mergedColumns thay đổi
  useEffect(() => {
    // Tính checksum để so sánh
    const currentChecksum = defaultColumns.map(c => c.id).join(',')
    
    if (mergedColumns.length > 0 && currentChecksum !== prevDefaultColsRef.current) {
      setColumns(mergedColumns)
      prevDefaultColsRef.current = currentChecksum
    }
  }, [mergedColumns, defaultColumns])

  // Lưu vào localStorage khi user thay đổi (toggle, move)
  const saveToStorage = useCallback((cols: ColumnDef[]) => {
    if (cols.length === 0) return
    
    // Lưu TẤT CẢ cột - cả cố định và động
    const config: ColumnConfig = {
      columns: cols.map(c => ({
        id: c.id,
        label: c.label,
        visible: c.visible,
        order: c.order,
        sticky: c.sticky,
      })),
      version: 1,
    }
    localStorage.setItem(storageKey, JSON.stringify(config))
  }, [storageKey])

  // Toggle visibility của một cột
  const toggleColumn = useCallback((columnId: string) => {
    setColumns(prev => {
      const newCols = prev.map(col => 
        col.id === columnId && !col.sticky
          ? { ...col, visible: !col.visible }
          : col
      )
      saveToStorage(newCols)
      return newCols
    })
  }, [saveToStorage])

  // Đặt visibility cho nhiều cột
  const setColumnVisibility = useCallback((columnId: string, visible: boolean) => {
    setColumns(prev => {
      const newCols = prev.map(col => 
        col.id === columnId && !col.sticky
          ? { ...col, visible }
          : col
      )
      saveToStorage(newCols)
      return newCols
    })
  }, [saveToStorage])

  // Hiện tất cả cột
  const showAllColumns = useCallback(() => {
    setColumns(prev => {
      const newCols = prev.map(col => ({ ...col, visible: true }))
      saveToStorage(newCols)
      return newCols
    })
  }, [saveToStorage])

  // Ẩn tất cả cột (trừ sticky)
  const hideOptionalColumns = useCallback(() => {
    setColumns(prev => {
      const newCols = prev.map(col => ({ ...col, visible: col.sticky || false }))
      saveToStorage(newCols)
      return newCols
    })
  }, [saveToStorage])

  // Di chuyển cột
  const moveColumn = useCallback((fromIndex: number, toIndex: number) => {
    setColumns(prev => {
      const newCols = [...prev]
      const [moved] = newCols.splice(fromIndex, 1)
      newCols.splice(toIndex, 0, moved)
      // Cập nhật order
      const ordered = newCols.map((col, i) => ({ ...col, order: i }))
      saveToStorage(ordered)
      return ordered
    })
  }, [saveToStorage])

  // Reset về mặc định
  const resetColumns = useCallback(() => {
    const defaultWithOrder = defaultColumns.map((c, i) => ({ ...c, order: i, visible: true }))
    setColumns(defaultWithOrder)
    saveToStorage(defaultWithOrder)
    // Xóa localStorage để về mặc định hoàn toàn
    localStorage.removeItem(storageKey)
  }, [defaultColumns, saveToStorage, storageKey])

  // Lấy danh sách cột hiển thị theo thứ tự
  const visibleColumns = columns
    .filter(col => col.visible)
    .sort((a, b) => a.order - b.order)

  // Export column config cho Excel
  const getExportColumns = useCallback(() => {
    return visibleColumns.map(col => ({
      id: col.id,
      label: col.label,
    }))
  }, [visibleColumns])

  return {
    columns,
    visibleColumns,
    toggleColumn,
    setColumnVisibility,
    showAllColumns,
    hideOptionalColumns,
    moveColumn,
    resetColumns,
    getExportColumns,
  }
}

// Tạo column definitions cho bảng lương
export function createBangLuongColumns(
  khoanLuongList: { id: number; tenKhoan: string; loai: string }[],
  coSanLuong: boolean,
  loaiSanLuong?: string
): ColumnDef[] {
  const columns: ColumnDef[] = [
    { id: 'stt', label: 'STT', visible: true, order: 0, sticky: true, width: '50px', align: 'center' },
    { id: 'maNV', label: 'Mã NV', visible: true, order: 1, sticky: true, width: '80px' },
    { id: 'hoTen', label: 'Họ tên', visible: true, order: 2, sticky: true, width: '180px' },
    { id: 'chucVu', label: 'Chức vụ', visible: true, order: 3, width: '120px' },
    { id: 'ngayCong', label: 'Ngày công', visible: true, order: 4, align: 'center', bgColor: 'bg-orange-100' },
    { id: 'ncDieuChinh', label: 'NC Điều chỉnh', visible: true, order: 5, align: 'center', bgColor: 'bg-orange-100' },
  ]

  let orderIndex = 6

  // Cột sản lượng chia hàng
  if (coSanLuong && (loaiSanLuong === 'CHIA_HANG' || loaiSanLuong === 'CA_HAI')) {
    columns.push(
      { id: 'spDat', label: 'SP đạt', visible: true, order: orderIndex++, align: 'right', bgColor: 'bg-cyan-100' },
      { id: 'spLoi', label: 'SP lỗi', visible: true, order: orderIndex++, align: 'right', bgColor: 'bg-cyan-100' }
    )
  }

  // Cột sản lượng giao hàng
  if (coSanLuong && (loaiSanLuong === 'GIAO_HANG' || loaiSanLuong === 'CA_HAI')) {
    columns.push(
      { id: 'klGiao', label: 'KL giao (kg)', visible: true, order: orderIndex++, align: 'right', bgColor: 'bg-teal-100' },
      { id: 'treGio', label: 'Trễ giờ', visible: true, order: orderIndex++, align: 'right', bgColor: 'bg-teal-100' }
    )
  }

  // Các khoản lương động
  khoanLuongList.forEach((kl) => {
    columns.push({
      id: `kl_${kl.id}`,
      label: kl.tenKhoan,
      visible: true,
      order: orderIndex++,
      align: 'right',
      width: '120px',
    })
  })

  // Cột tổng hợp
  columns.push(
    { id: 'tongThuNhap', label: 'Tổng thu nhập', visible: true, order: orderIndex++, align: 'right', bgColor: 'bg-blue-100' },
    { id: 'khauTru', label: 'Khấu trừ', visible: true, order: orderIndex++, align: 'right', bgColor: 'bg-red-100' },
    { id: 'thucLinh', label: 'Thực lĩnh', visible: true, order: orderIndex++, align: 'right', bgColor: 'bg-green-100' },
    { id: 'phieuLuong', label: 'Phiếu lương', visible: true, order: orderIndex++, align: 'center', bgColor: 'bg-purple-100' }
  )

  return columns
}

// Tạo column definitions cho bảng ứng lương
export function createUngLuongColumns(): ColumnDef[] {
  return [
    { id: 'stt', label: 'STT', visible: true, order: 0, sticky: true, width: '50px', align: 'center' },
    { id: 'maNV', label: 'Mã NV', visible: true, order: 1, sticky: true, width: '80px' },
    { id: 'hoTen', label: 'Họ tên', visible: true, order: 2, sticky: true, width: '180px' },
    { id: 'phongBan', label: 'Phòng ban', visible: true, order: 3, width: '150px' },
    { id: 'soTien', label: 'Số tiền ứng', visible: true, order: 4, align: 'right', width: '130px' },
    { id: 'ngayUng', label: 'Ngày ứng', visible: true, order: 5, align: 'center', width: '120px' },
    { id: 'lyDo', label: 'Lý do', visible: true, order: 6, width: '200px' },
    { id: 'trangThai', label: 'Trạng thái', visible: true, order: 7, align: 'center', width: '120px' },
    { id: 'nguoiDuyet', label: 'Người duyệt', visible: true, order: 8, width: '150px' },
    { id: 'ngayDuyet', label: 'Ngày duyệt', visible: true, order: 9, align: 'center', width: '120px' },
    { id: 'thaoTac', label: 'Thao tác', visible: true, order: 10, align: 'center', width: '100px' },
  ]
}
