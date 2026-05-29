import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/helpers/cn'

/**
 * 统一首页装饰卡片内部的内容版式骨架，适合承载品牌文案与装饰性内容。
 */
export default function BentoDecorativeLayout({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'pointer-events-none h-full w-full text-center font-[fantasy] font-bold',
        className
      )}
      {...props}
    />
  )
}
