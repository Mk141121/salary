// Modal Phiếu Lương - Xem, xuất ảnh, gửi email
import { useState, useRef, useCallback } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { X, Mail, Image, Loader2 } from 'lucide-react'
import { toPng } from 'html-to-image'
import toast from 'react-hot-toast'
import { phieuLuongApi } from '../services/api'
import PhieuLuong from './PhieuLuong'

interface PhieuLuongModalProps {
  isOpen: boolean
  onClose: () => void
  bangLuongId: number
  nhanVienId: number
  hoTen: string
}

export function PhieuLuongModal({
  isOpen,
  onClose,
  bangLuongId,
  nhanVienId,
  hoTen,
}: PhieuLuongModalProps) {
  const phieuLuongRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  // Fetch payslip data
  const { data, isLoading, error } = useQuery({
    queryKey: ['phieu-luong', bangLuongId, nhanVienId],
    queryFn: () => phieuLuongApi.layPhieuLuong(bangLuongId, nhanVienId),
    enabled: isOpen,
  })

  // Send email mutation
  const sendEmailMutation = useMutation({
    mutationFn: () => phieuLuongApi.guiPhieuLuong(bangLuongId, nhanVienId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    },
    onError: () => {
      toast.error('Có lỗi khi gửi email')
    },
  })

  // Export as PNG
  const handleExportPng = useCallback(async () => {
    if (!phieuLuongRef.current || !data) return

    setIsExporting(true)
    try {
      const dataUrl = await toPng(phieuLuongRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      })

      // Download the image
      const link = document.createElement('a')
      link.download = `phieu-luong-${data.maNhanVien}-thang-${data.thang}-${data.nam}.png`
      link.href = dataUrl
      link.click()

      toast.success('Đã xuất phiếu lương thành công!')
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Có lỗi khi xuất ảnh')
    } finally {
      setIsExporting(false)
    }
  }, [data])

  // Handle send email
  const handleSendEmail = useCallback(() => {
    if (!data?.email) {
      toast.error('Nhân viên không có email')
      return
    }
    sendEmailMutation.mutate()
  }, [data?.email, sendEmailMutation])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800">
            Phiếu lương - {hoTen}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPng}
              disabled={isExporting || isLoading}
              className="btn btn-secondary flex items-center gap-2"
            >
              {isExporting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Image size={18} />
              )}
              Xuất ảnh
            </button>
            <button
              onClick={handleSendEmail}
              disabled={sendEmailMutation.isPending || isLoading || !data?.email}
              className="btn btn-primary flex items-center gap-2"
              title={!data?.email ? 'Nhân viên không có email' : 'Gửi phiếu lương qua email'}
            >
              {sendEmailMutation.isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Mail size={18} />
              )}
              Gửi email
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 size={40} className="animate-spin text-blue-500" />
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">Có lỗi khi tải phiếu lương</p>
            </div>
          ) : data ? (
            <PhieuLuong ref={phieuLuongRef} data={data} />
          ) : null}
        </div>

        {/* Footer info */}
        {data && (
          <div className="p-3 bg-gray-50 border-t text-sm text-gray-600 flex items-center justify-between">
            <span>
              Email: {data.email || <span className="italic text-gray-400">Chưa có</span>}
            </span>
            <span>
              Thực lĩnh: <strong className="text-green-600">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.thucLinh)}
              </strong>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default PhieuLuongModal
