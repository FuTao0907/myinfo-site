'use client'

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface ToastItem {
  id: number
  message: string
}

interface ToastContextValue {
  showToast: (message: string) => void
}

const TOAST_DURATION = 2400
const ToastContext = createContext<ToastContextValue | null>(null)

interface ToastProviderProps {
  children: ReactNode
}

/**
 * 为前台组件提供轻量级提示能力。
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const idRef = useRef(0)

  /**
   * 将提示加入队列，并在超时后自动移除。
   */
  const showToast = useCallback((message: string) => {
    idRef.current += 1
    const toastId = idRef.current

    setToasts((previous) => [...previous, { id: toastId, message }])

    window.setTimeout(() => {
      setToasts((previous) => previous.filter((item) => item.id !== toastId))
    }, TOAST_DURATION)
  }, [])

  const contextValue = useMemo(
    () => ({
      showToast,
    }),
    [showToast]
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[120] flex -translate-x-1/2 flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="min-w-[220px] rounded-xl border border-white/10 bg-black/85 px-4 py-3 text-center text-sm text-white shadow-lg backdrop-blur-sm"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

/**
 * 读取当前的提示上下文。
 */
export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return context
}
