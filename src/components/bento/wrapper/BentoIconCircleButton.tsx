import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/helpers/cn'

interface BentoIconCircleButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode
}

/**
 * 统一首页弹层和卡片中的圆形图标按钮，保证触控热区与交互反馈一致。
 */
export default function BentoIconCircleButton({
  children,
  className,
  type = 'button',
  ...props
}: BentoIconCircleButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--card--bg)] text-[var(--text-color)] transition-opacity hover:opacity-80',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
