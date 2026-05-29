import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/helpers/cn'

/**
 * 统一首页媒体类卡片的圆角、裁切和背景壳层，减少图片卡片的重复结构。
 */
export default function BentoMediaSurface({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden rounded-[10px] bg-[var(--card--bg)]',
        className
      )}
      {...props}
    />
  )
}
