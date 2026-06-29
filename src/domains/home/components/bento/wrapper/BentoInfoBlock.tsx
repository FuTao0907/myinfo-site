import type { ReactNode } from 'react'

import { cn } from '~/shared/lib/utils/cn'

interface BentoInfoBlockProps {
  eyebrow?: string
  title: string
  description?: ReactNode
  className?: string
}

/**
 * 统一首页 Bento 卡片中的小标题信息块，适合标题、说明和辅助文案组合展示。
 */
export default function BentoInfoBlock({
  eyebrow,
  title,
  description,
  className,
}: BentoInfoBlockProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{eyebrow}</p>
      ) : null}
      <h3 className="text-lg font-semibold text-[var(--text-color)]">{title}</h3>
      {description ? <div className="text-sm leading-6 text-neutral-500">{description}</div> : null}
    </div>
  )
}
