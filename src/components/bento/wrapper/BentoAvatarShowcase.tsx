import type { ImgHTMLAttributes } from 'react'

import { cn } from '@/lib/helpers/cn'

interface BentoAvatarShowcaseProps {
  src: string
  alt: string
  isExpandingAvatar?: boolean
  isExpandingBg?: boolean
  onError?: ImgHTMLAttributes<HTMLImageElement>['onError']
  className?: string
}

/**
 * 统一首页头像展示壳层，负责头像圆形容器与扩散背景的基础结构。
 */
export default function BentoAvatarShowcase({
  src,
  alt,
  isExpandingAvatar = false,
  isExpandingBg = false,
  onError,
  className,
}: BentoAvatarShowcaseProps) {
  return (
    <div className={cn('relative mb-[30px] h-[96px] w-[96px]', className)}>
      <div
        className={cn(
          'avatar-img absolute left-0 top-0 z-20 flex h-[96px] w-[96px] items-center justify-center rounded-full dark:bg-[var(--header-avatar-bg)]',
          isExpandingAvatar && 'expanding-avatar-circle'
        )}
      >
        <img
          className="h-full w-full rounded-full object-cover"
          src={src}
          alt={alt}
          onError={onError}
        />
      </div>
      <div className={cn('avatar-bg', isExpandingBg && 'expanding-bg-circle')} />
    </div>
  )
}
