import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/helpers/cn'

interface TagChipProps extends ComponentPropsWithoutRef<'span'> {
  compact?: boolean
}

/**
 * 提供统一的标签胶囊样式，用于技能、分类与状态类信息展示。
 */
export default function TagChip({ className, compact = false, ...props }: TagChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--ui-main-border)_72%,transparent)] bg-[color-mix(in_srgb,var(--ui-second-bg)_88%,transparent)] px-3 py-1 text-xs text-[var(--ui-main-text)]/72',
        compact && 'px-2.5 py-0.5 text-[11px]',
        className
      )}
      {...props}
    />
  )
}
