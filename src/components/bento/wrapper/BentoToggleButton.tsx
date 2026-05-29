import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/helpers/cn'

interface BentoToggleButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: ReactNode
  label: string
  iconClassName?: string
}

/**
 * 统一首页卡片中的切换按钮样式，保证触控热区和图标文案布局一致。
 */
export default function BentoToggleButton({
  icon,
  label,
  className,
  iconClassName,
  type = 'button',
  ...props
}: BentoToggleButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'pointer-events-auto absolute right-4 top-4 inline-flex min-h-11 items-center gap-2 rounded-full border-none bg-transparent px-4 text-[var(--text-color)] shadow-[var(--card-border)_0px_0px_0px_2px] transition-all duration-200 will-change-[box-shadow,transform] hover:cursor-pointer hover:shadow-[var(--card-border)_0px_0px_0px_5px]',
        className
      )}
      {...props}
    >
      <span className={cn('flex items-center justify-center text-[var(--text-color)]', iconClassName)}>
        {icon}
      </span>
      <span className="text-sm font-normal leading-6 tracking-[0.25px] text-[var(--text-color)]">
        {label}
      </span>
    </button>
  )
}
