import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '~/shared/lib/utils/cn'

/**
 * 统一首页装饰卡片中的展示型文字样式，减少大字号品牌文案的重复类名。
 */
export default function BentoDisplayText({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'font-[fantasy] font-bold leading-normal text-[var(--cover-main-color)]',
        className
      )}
      {...props}
    />
  )
}
