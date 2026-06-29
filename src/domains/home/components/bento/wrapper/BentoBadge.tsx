import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '~/shared/lib/utils/cn'

interface BentoBadgeProps extends ComponentPropsWithoutRef<'span'> {
  solid?: boolean
}

/**
 * 统一首页 Bento 卡片中的角标与快捷键胶囊样式，适合位置标签与短提示展示。
 */
export default function BentoBadge({ className, solid = false, ...props }: BentoBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-1.5 py-0.5 text-xs',
        solid
          ? 'border-transparent bg-[var(--ui-main-bg)] font-bold text-[var(--text-color)] shadow-sm'
          : 'border-[var(--card-border)] bg-transparent text-[var(--text-color)]/78',
        className
      )}
      {...props}
    />
  )
}
