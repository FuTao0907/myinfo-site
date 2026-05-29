import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/helpers/cn'

type BentoContentStackProps = ComponentPropsWithoutRef<'div'>

/**
 * 统一首页卡片中的纵向内容堆叠结构，方便在不同卡片间复用对齐、间距和高度约束。
 */
export default function BentoContentStack({ className, ...props }: BentoContentStackProps) {
  return <div className={cn('flex h-full w-full flex-col items-center justify-center', className)} {...props} />
}
