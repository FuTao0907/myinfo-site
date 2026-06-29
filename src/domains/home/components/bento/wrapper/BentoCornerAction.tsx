import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '~/shared/lib/utils/cn'

interface BentoCornerActionProps extends ComponentPropsWithoutRef<'div'> {
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
}

const POSITION_CLASS_MAP: Record<NonNullable<BentoCornerActionProps['position']>, string> = {
  'bottom-left': 'bottom-[10px] left-[12px]',
  'bottom-right': 'bottom-[10px] right-[12px]',
  'top-left': 'left-[12px] top-[12px]',
  'top-right': 'right-[12px] top-[12px]',
}

/**
 * 统一首页卡片角落操作按钮的定位偏移，保证不同卡片的边距和层级一致。
 */
export default function BentoCornerAction({
  className,
  position = 'bottom-right',
  ...props
}: BentoCornerActionProps) {
  return <div className={cn('absolute z-10', POSITION_CLASS_MAP[position], className)} {...props} />
}
