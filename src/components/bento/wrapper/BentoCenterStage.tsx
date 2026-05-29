import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/helpers/cn'

type BentoCenterStageProps = ComponentPropsWithoutRef<'div'>

/**
 * 统一首页卡片中“主体居中展示”的基础容器，适合图标、开关或单个主元素的居中布局。
 */
export default function BentoCenterStage({ className, ...props }: BentoCenterStageProps) {
  return <div className={cn('relative grid h-full w-full place-items-center', className)} {...props} />
}
