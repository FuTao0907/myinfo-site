import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '~/shared/lib/utils/cn'

interface SurfaceCardProps extends ComponentPropsWithoutRef<'div'> {
  subtle?: boolean
}

/**
 * 提供统一的卡片表面容器，减少页面内重复的边框和阴影样式。
 */
export default function SurfaceCard({ className, subtle = false, ...props }: SurfaceCardProps) {
  return (
    <div
      className={cn(
        'rounded-[24px] border border-[color-mix(in_srgb,var(--ui-main-border)_82%,transparent)] bg-[color-mix(in_srgb,var(--ui-main-bg)_96%,transparent)] shadow-[0_18px_48px_rgba(15,23,42,0.08)] backdrop-blur-sm',
        subtle &&
          'border-[color-mix(in_srgb,var(--ui-main-border)_62%,transparent)] bg-[color-mix(in_srgb,var(--ui-second-bg)_88%,transparent)] shadow-none',
        className
      )}
      {...props}
    />
  )
}
