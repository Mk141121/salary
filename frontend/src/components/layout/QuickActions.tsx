// QuickActions Component - Thao tác nhanh theo context
import { useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MoreHorizontal, AlertTriangle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { findRouteMeta, QuickAction } from '../../config/routes'
import { useQuickActionRegistry } from '../../config/quickActionRegistry'

interface ConfirmModalProps {
  isOpen: boolean
  action: QuickAction | null
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmModal({ isOpen, action, onConfirm, onCancel }: ConfirmModalProps) {
  const [inputValue, setInputValue] = useState('')

  if (!isOpen || !action) return null

  const isValid = action.confirmKeyword 
    ? inputValue.toUpperCase() === action.confirmKeyword.toUpperCase()
    : true

  const handleConfirm = () => {
    if (isValid) {
      onConfirm()
      setInputValue('')
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertTriangle size={24} />
          <h3 className="text-lg font-semibold">Xác nhận thao tác</h3>
        </div>
        
        <p className="text-gray-700 mb-4">
          {action.confirmMessage || `Bạn có chắc muốn thực hiện "${action.label}"?`}
        </p>

        {action.confirmKeyword && (
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">
              Gõ <span className="font-mono font-bold text-red-600">{action.confirmKeyword}</span> để xác nhận:
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder={`Gõ ${action.confirmKeyword}...`}
              autoFocus
            />
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Huỷ
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isValid}
            className={`
              px-4 py-2 rounded-lg transition-colors
              ${isValid 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
            `}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  )
}

export default function QuickActions() {
  const location = useLocation()
  const navigate = useNavigate()
  const { coQuyen, coVaiTro } = useAuth()
  const registry = useQuickActionRegistry()
  
  const [showMore, setShowMore] = useState(false)
  const [confirmAction, setConfirmAction] = useState<QuickAction | null>(null)

  // Lấy quick actions cho route hiện tại
  const actions = useMemo(() => {
    const routeMeta = findRouteMeta(location.pathname)
    if (!routeMeta?.quickActions) return []

    // Filter theo permission
    return routeMeta.quickActions.filter(action => {
      if (!action.requiredPermissions) return true
      if (coVaiTro('ADMIN')) return true
      return action.requiredPermissions.some(p => coQuyen(p) || coVaiTro(p))
    })
  }, [location.pathname, coQuyen, coVaiTro])

  // Số actions hiển thị trực tiếp (desktop: 4, còn lại vào dropdown)
  const visibleCount = 4
  const visibleActions = actions.slice(0, visibleCount)
  const moreActions = actions.slice(visibleCount)

  // Handle action click
  const handleActionClick = async (action: QuickAction) => {
    // Đóng dropdown
    setShowMore(false)

    // Nếu là danger action, show confirm
    if (action.danger) {
      setConfirmAction(action)
      return
    }

    await executeAction(action)
  }

  // Execute action
  const executeAction = async (action: QuickAction) => {
    switch (action.type) {
      case 'route':
        if (action.to) {
          navigate(action.to)
        }
        break
      case 'callback':
        if (action.callbackKey) {
          await registry.execute(action.callbackKey)
        }
        break
      case 'modal':
        // TODO: Implement modal actions
        break
    }
  }

  // Handle confirm
  const handleConfirm = async () => {
    if (confirmAction) {
      await executeAction(confirmAction)
      setConfirmAction(null)
    }
  }

  if (actions.length === 0) return null

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Visible actions */}
        {visibleActions.map(action => {
          const Icon = action.icon
          return (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${action.danger 
                  ? 'text-red-600 hover:bg-red-50' 
                  : 'text-gray-700 hover:bg-gray-100'}
              `}
              title={action.label}
            >
              <Icon size={16} />
              <span className="hidden lg:inline">{action.label}</span>
            </button>
          )
        })}

        {/* More dropdown */}
        {moreActions.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center gap-1 px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreHorizontal size={16} />
              <span className="hidden sm:inline text-sm">Thêm</span>
            </button>

            {showMore && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowMore(false)}
                />
                
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border z-50 py-1">
                  {moreActions.map(action => {
                    const Icon = action.icon
                    return (
                      <button
                        key={action.id}
                        onClick={() => handleActionClick(action)}
                        className={`
                          w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors
                          ${action.danger 
                            ? 'text-red-600 hover:bg-red-50' 
                            : 'text-gray-700 hover:bg-gray-100'}
                        `}
                      >
                        <Icon size={16} />
                        <span>{action.label}</span>
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Confirm modal */}
      <ConfirmModal
        isOpen={!!confirmAction}
        action={confirmAction}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmAction(null)}
      />
    </>
  )
}
