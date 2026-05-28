import type { ReactNode } from 'react'

interface MessageProps {
  children: ReactNode
  type?: 'info' | 'warning' | 'error' | 'success'
}

/**
 * 渲染 Markdown 中的提示消息块。
 */
export function Message({ children, type = 'info' }: MessageProps) {
  const typeStyles = {
    info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    warning:
      'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
    error: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
    success:
      'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
  } as const

  return <div className={`my-4 rounded-md border p-4 ${typeStyles[type]}`}>{children}</div>
}
