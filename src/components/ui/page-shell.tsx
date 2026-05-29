import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/helpers/cn'

interface PageShellProps extends ComponentPropsWithoutRef<'div'> {
  sidebar?: ReactNode
  mainClassName?: string
  sidebarClassName?: string
  containerClassName?: string
}

/**
 * 提供带可选侧边栏的页面外壳，统一文档页和后台类页面的整体布局结构。
 */
export default function PageShell({
  sidebar,
  children,
  className,
  containerClassName,
  sidebarClassName,
  mainClassName,
  ...props
}: PageShellProps) {
  return (
    <div
      className={cn('min-h-screen bg-[var(--bg-main-color)] text-[var(--text-color)]', className)}
      {...props}
    >
      <div className={cn('mx-auto flex w-full max-w-7xl gap-8 px-4 py-8 md:px-6 md:py-10', containerClassName)}>
        {sidebar ? <aside className={cn('hidden lg:block', sidebarClassName)}>{sidebar}</aside> : null}
        <main className={cn('min-w-0 flex-1', mainClassName)}>{children}</main>
      </div>
    </div>
  )
}
