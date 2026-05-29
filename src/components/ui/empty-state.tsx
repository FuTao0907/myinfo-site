import type { ReactNode } from 'react'

import { cn } from '@/lib/helpers/cn'

interface EmptyStateProps {
  title: string
  description: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
  compact?: boolean
}

/**
 * 提供统一的空状态展示，适合搜索无结果、列表为空和待建设模块提示。
 */
export default function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-[24px] border border-dashed border-[color-mix(in_srgb,var(--ui-main-border)_72%,transparent)] bg-[color-mix(in_srgb,var(--ui-second-bg)_52%,transparent)] px-6 py-10 text-center',
        compact && 'rounded-[18px] px-4 py-8',
        className
      )}
    >
      {icon ? (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--ui-main-bg)_90%,transparent)] text-[var(--ui-main-text)]/58">
          {icon}
        </div>
      ) : null}
      <h3 className="text-base font-semibold tracking-[-0.02em] text-[var(--ui-main-text)]">{title}</h3>
      <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--ui-main-text)]/64">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}
