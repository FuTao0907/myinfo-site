import type { ComponentPropsWithoutRef, ReactNode, SyntheticEvent } from 'react'

import { cn } from '~/shared/lib/utils/cn'

interface BentoOverlayPanelProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  panelClassName?: string
  overlayClassName?: string
}

/**
 * 统一首页弹层的遮罩与面板容器结构，避免每个预览弹层重复处理关闭和事件隔离。
 */
export default function BentoOverlayPanel({
  isOpen,
  onClose,
  children,
  className,
  panelClassName,
  overlayClassName,
  ...props
}: BentoOverlayPanelProps) {
  /**
   * 阻止事件继续冒泡到外层拖拽布局或页面根节点。
   */
  function stopPanelPropagation(event: SyntheticEvent) {
    event.stopPropagation()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[120] flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]',
        overlayClassName
      )}
      onClick={onClose}
      onMouseDown={stopPanelPropagation}
      onPointerDown={stopPanelPropagation}
      onTouchStart={stopPanelPropagation}
    >
      <div
        className={cn(
          'relative w-full max-w-[860px] overflow-hidden rounded-2xl border-4 border-[var(--card-border)] bg-[var(--ui-main-bg)] p-2 text-[var(--ui-main-text)] shadow-2xl',
          panelClassName,
          className
        )}
        onClick={stopPanelPropagation}
        onMouseDown={stopPanelPropagation}
        onPointerDown={stopPanelPropagation}
        onTouchStart={stopPanelPropagation}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}
