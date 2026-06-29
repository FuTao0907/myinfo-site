import type { ReactNode } from 'react'

import { cn } from '~/shared/lib/utils/cn'

interface BentoCardHeaderProps {
  eyebrow?: string
  title: string
  action?: ReactNode
  className?: string
}

/**
 * 统一首页卡片或弹层中的头部结构，减少标题区与操作区的重复布局代码。
 */
export default function BentoCardHeader({
  eyebrow,
  title,
  action,
  className,
}: BentoCardHeaderProps) {
  return (
    <div className={cn('mb-3 flex items-center justify-between gap-3 px-1', className)}>
      <div className="min-w-0">
        {eyebrow ? <p className="text-sm text-[var(--text-color)]/70">{eyebrow}</p> : null}
        <h2 className="truncate text-lg font-bold text-[var(--ui-main-text)]">{title}</h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
