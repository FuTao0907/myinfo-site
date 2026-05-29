import type { ReactNode } from 'react'

import SurfaceCard from '@/components/ui/surface-card'
import { cn } from '@/lib/helpers/cn'

interface StatCardProps {
  label: string
  value: ReactNode
  description?: string
  subtle?: boolean
  className?: string
}

/**
 * 提供统一的指标卡片结构，适合概览页中的数量统计和状态摘要。
 */
export default function StatCard({
  label,
  value,
  description,
  subtle = true,
  className,
}: StatCardProps) {
  return (
    <SurfaceCard subtle={subtle} className={cn('p-4', className)}>
      <p className="text-sm text-[var(--ui-main-text)]/60">{label}</p>
      <div className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--ui-main-text)]">
        {value}
      </div>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-[var(--ui-main-text)]/62">{description}</p>
      ) : null}
    </SurfaceCard>
  )
}
