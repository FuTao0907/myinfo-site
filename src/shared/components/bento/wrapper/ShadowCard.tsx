'use client'

import type { ReactNode } from 'react'

interface ShadowCardProps {
  className?: string
  children: ReactNode
  footer?: ReactNode
  style?: React.CSSProperties
}

/**
 * 提供 Bento 模块通用的阴影卡片容器。
 */
export function ShadowCard({ className = '', children, footer, style }: ShadowCardProps) {
  return (
    <div className={`card-outer ${className}`} style={style}>
      <div className="card-content">{children}</div>
      {footer ? <div className="card-footer">{footer}</div> : null}
    </div>
  )
}

