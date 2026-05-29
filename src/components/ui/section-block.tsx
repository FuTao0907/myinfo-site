import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/helpers/cn'

interface SectionBlockProps extends ComponentPropsWithoutRef<'section'> {
  title: string
  description?: string
  actions?: ReactNode
  bodyClassName?: string
}

/**
 * 提供带标题区和内容区的通用板块容器，便于页面复用统一结构。
 */
export default function SectionBlock({
  title,
  description,
  actions,
  children,
  className,
  bodyClassName,
  ...props
}: SectionBlockProps) {
  return (
    <section className={cn('space-y-4 print:space-y-3', className)} {...props}>
      <div className="flex items-start justify-between gap-3 border-b border-[color-mix(in_srgb,var(--ui-main-border)_65%,transparent)] pb-3 print:gap-2 print:pb-2">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-[var(--ui-main-text)] print:text-[15px]">
            {title}
          </h2>
          {description ? (
            <p className="text-sm text-[var(--ui-main-text)]/65 print:text-[11px]">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </div>
      <div className={cn('space-y-4 print:space-y-3', bodyClassName)}>{children}</div>
    </section>
  )
}
