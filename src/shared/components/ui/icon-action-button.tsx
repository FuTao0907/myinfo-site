import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '~/shared/lib/utils/cn'

interface IconActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  label: string
}

/**
 * 提供统一的图标操作按钮，兼顾鼠标提示与无障碍文本。
 */
export default function IconActionButton({
  icon,
  label,
  className,
  type = 'button',
  ...props
}: IconActionButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--ui-main-border)] bg-[var(--ui-second-bg)] text-[var(--ui-main-text)] transition-all hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--ui-main-brand)_50%,transparent)]',
        className
      )}
      {...props}
    >
      {icon}
    </button>
  )
}
