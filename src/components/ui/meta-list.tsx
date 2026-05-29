import type { ReactNode } from 'react'

import { cn } from '@/lib/helpers/cn'

export interface MetaListItem {
  id: string
  label: string
  value: ReactNode
  icon?: ReactNode
  href?: string
  external?: boolean
  truncate?: boolean
}

interface MetaListProps {
  items: MetaListItem[]
  className?: string
  itemClassName?: string
  textClassName?: string
  showLabel?: boolean
}

/**
 * 提供统一的图标元信息列表，适合联系方式、属性摘要与说明信息展示。
 */
export default function MetaList({
  items,
  className,
  itemClassName,
  textClassName,
  showLabel = false,
}: MetaListProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {items.map((item) => {
        const content = (
          <>
            {item.icon ? <span className="shrink-0">{item.icon}</span> : null}
            {showLabel ? (
              <span className="min-w-0 space-y-0.5">
                <span className="block text-[11px] uppercase tracking-[0.18em] text-[var(--ui-main-text)]/42">
                  {item.label}
                </span>
                <span className={cn('block', item.truncate && 'truncate', textClassName)}>
                  {item.value}
                </span>
              </span>
            ) : (
              <>
                <span className="sr-only">{item.label}</span>
                <span className={cn(item.truncate && 'truncate', textClassName)}>{item.value}</span>
              </>
            )}
          </>
        )

        if (item.href) {
          return (
            <a
              key={item.id}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
              className={cn(
                'flex items-center gap-2 transition-opacity hover:opacity-80',
                itemClassName
              )}
            >
              {content}
            </a>
          )
        }

        return (
          <div key={item.id} className={cn('flex items-center gap-2', itemClassName)}>
            {content}
          </div>
        )
      })}
    </div>
  )
}
