import type { ReactNode } from 'react'

import { cn } from '@/lib/helpers/cn'

interface DocHeaderProps {
  eyebrow?: string
  title: string
  description: string
  badges?: ReactNode
  actions?: ReactNode
  className?: string
}

/**
 * 提供文档页头部结构，统一眉标题、主标题、描述和操作区布局。
 */
export default function DocHeader({
  eyebrow,
  title,
  description,
  badges,
  actions,
  className,
}: DocHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-5 md:flex-row md:items-start md:justify-between', className)}>
      <div className="max-w-3xl space-y-4">
        {badges ? <div className="flex flex-wrap gap-2">{badges}</div> : null}
        <div className="space-y-3">
          {eyebrow ? (
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--ui-main-text)]/45">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--ui-main-text)] md:text-4xl">
            {title}
          </h2>
          <p className="max-w-2xl text-base leading-7 text-[var(--ui-main-text)]/68">{description}</p>
        </div>
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </div>
  )
}
