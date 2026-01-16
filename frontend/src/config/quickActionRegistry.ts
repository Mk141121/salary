// Registry cho các quick action callbacks
// Các page components sẽ đăng ký handlers vào đây

type ActionCallback = () => void | Promise<void>

class QuickActionRegistry {
  private handlers: Map<string, ActionCallback> = new Map()
  private listeners: Set<() => void> = new Set()

  // Đăng ký handler cho một action
  register(key: string, callback: ActionCallback) {
    this.handlers.set(key, callback)
    this.notifyListeners()
    return () => this.unregister(key)
  }

  // Hủy đăng ký
  unregister(key: string) {
    this.handlers.delete(key)
    this.notifyListeners()
  }

  // Kiểm tra action có sẵn không
  has(key: string): boolean {
    return this.handlers.has(key)
  }

  // Thực thi action
  async execute(key: string): Promise<boolean> {
    const handler = this.handlers.get(key)
    if (handler) {
      await handler()
      return true
    }
    console.warn(`Quick action "${key}" không có handler đăng ký`)
    return false
  }

  // Lấy danh sách các action đã đăng ký
  getRegisteredKeys(): string[] {
    return Array.from(this.handlers.keys())
  }

  // Subscribe để biết khi registry thay đổi
  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notifyListeners() {
    this.listeners.forEach(fn => fn())
  }
}

// Singleton instance
export const quickActionRegistry = new QuickActionRegistry()

// Hook để đăng ký quick actions từ component
import { useEffect, useState } from 'react'

export function useRegisterQuickAction(key: string, callback: ActionCallback, deps: unknown[] = []) {
  useEffect(() => {
    const unregister = quickActionRegistry.register(key, callback)
    return unregister
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, ...deps])
}

// Hook để lắng nghe thay đổi registry
export function useQuickActionRegistry() {
  const [, setTick] = useState(0)

  useEffect(() => {
    const unsubscribe = quickActionRegistry.subscribe(() => {
      setTick(t => t + 1)
    })
    return () => { unsubscribe() }
  }, [])

  return {
    has: (key: string) => quickActionRegistry.has(key),
    execute: (key: string) => quickActionRegistry.execute(key),
    keys: quickActionRegistry.getRegisteredKeys(),
  }
}
