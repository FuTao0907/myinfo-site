import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '~/shared/lib/utils/cn'

type BentoActionGroupProps = ComponentPropsWithoutRef<'div'>

/**
 * 统一首页卡片底部操作按钮组的对齐方式与间距，避免各卡片重复维护相同布局。
 */
export default function BentoActionGroup({ className, ...props }: BentoActionGroupProps) {
  return (
    <div
      className={cn('mb-4 flex flex-row items-center justify-end gap-4 px-6', className)}
      {...props}
    />
  )
}
