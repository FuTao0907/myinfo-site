import type { ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'

import { cn } from '~/shared/lib/utils/cn'

interface BentoActionButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode
  href?: string
  className?: string
}

/**
 * 统一首页 Bento 卡片中的圆形图标操作按钮，兼容链接和按钮两种触发方式。
 */
export default function BentoActionButton({
  children,
  href,
  className,
  type = 'button',
  ...props
}: BentoActionButtonProps) {
  const sharedClassName = cn('detail-arrow', className)

  if (href) {
    return (
      <Link
        href={href}
        className={sharedClassName}
        title={props.title}
        aria-label={props['aria-label']}
      >
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={sharedClassName} {...props}>
      {children}
    </button>
  )
}
