'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'

import { cn } from '@/lib/helpers/cn'

interface CodeExampleCardProps {
  title: string
  description: string
  code: string
  preview: ReactNode
  className?: string
}

/**
 * 提供带实时预览和一键复制能力的代码示例卡片，用于组件文档页展示。
 */
export default function CodeExampleCard({
  title,
  description,
  code,
  preview,
  className,
}: CodeExampleCardProps) {
  const [copied, setCopied] = useState(false)

  /**
   * 在提示状态结束后自动恢复复制按钮文案。
   */
  useEffect(() => {
    if (!copied) {
      return
    }

    const timer = window.setTimeout(() => {
      setCopied(false)
    }, 1600)

    return () => {
      window.clearTimeout(timer)
    }
  }, [copied])

  /**
   * 将当前示例代码复制到系统剪贴板，便于后续直接复用。
   */
  async function handleCopyCode() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-[24px] border border-[color-mix(in_srgb,var(--ui-main-border)_76%,transparent)] bg-[color-mix(in_srgb,var(--ui-main-bg)_94%,transparent)] shadow-[0_20px_42px_rgba(15,23,42,0.08)]',
        className
      )}
    >
      <div className="flex flex-col gap-4 border-b border-[color-mix(in_srgb,var(--ui-main-border)_68%,transparent)] px-5 py-5 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-semibold tracking-[-0.02em] text-[var(--ui-main-text)]">
            {title}
          </h3>
          <p className="max-w-2xl text-sm leading-6 text-[var(--ui-main-text)]/66">{description}</p>
        </div>
        <button
          type="button"
          onClick={handleCopyCode}
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-[var(--ui-main-border)] bg-[var(--ui-second-bg)] px-3 text-sm text-[var(--ui-main-text)] transition-opacity hover:opacity-80"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? '已复制' : '复制代码'}
        </button>
      </div>

      <div className="border-b border-[color-mix(in_srgb,var(--ui-main-border)_60%,transparent)] bg-[color-mix(in_srgb,var(--ui-second-bg)_58%,transparent)] px-5 py-5">
        {preview}
      </div>

      <pre className="overflow-x-auto bg-[color-mix(in_srgb,var(--ui-main-bg)_92%,black_8%)] px-5 py-5 text-sm leading-6 text-[var(--ui-main-text)]/84">
        <code>{code}</code>
      </pre>
    </div>
  )
}
